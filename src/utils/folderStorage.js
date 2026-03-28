/**
 * 本地文件夹模式（File System Access API）
 *
 * 设计取舍（含大图 / Base64 进 JSON 的场景）：
 * - 安全写入：先写 .tmp → 读回校验 → 再写主文件，避免半截 JSON 毁掉存档。
 * - 仅保留 **一份** 上一代副本：`prompt_fill_data.bak.json`（提交前把当前主文件拷入）。
 *   不再使用 .bak2 / 周期性副本，避免模板里嵌图片时磁盘上出现 3～4 份完整巨型 JSON。
 * - 稳态体积约 = 主文件 + 1 份备份 + 写入瞬间的 .tmp（写完即删）。
 * - 默认紧凑 JSON；可选 pretty 导出（体积更大）。
 */

export const FOLDER_DATA_FILE = 'prompt_fill_data.json';
export const FOLDER_DATA_TEMP = 'prompt_fill_data.json.tmp';
export const FOLDER_DATA_BAK = 'prompt_fill_data.bak.json';

/** 旧版多备份文件名，成功写入后会尝试删除以释放空间 */
const LEGACY_BAK2 = 'prompt_fill_data.bak2.json';
const LEGACY_PERIODIC = 'prompt_fill_data.periodic.bak.json';

function buildPayload(snapshot) {
  return {
    templates: snapshot.templates,
    banks: snapshot.banks,
    categories: snapshot.categories,
    defaults: snapshot.defaults,
    version: snapshot.version || 'v9',
    lastSaved: new Date().toISOString(),
    saveSeq: Date.now(),
  };
}

/** 校验是否为可加载的存档结构（避免空数组或半截数据误提交） */
export function validatePromptFillPayload(data) {
  if (!data || typeof data !== 'object') return false;
  if (!Array.isArray(data.templates) || data.templates.length === 0) return false;
  return data.templates.every((t) => t && typeof t === 'object' && typeof t.id === 'string' && t.id.length > 0);
}

async function readFileText(directoryHandle, name) {
  const fh = await directoryHandle.getFileHandle(name);
  const file = await fh.getFile();
  return file.text();
}

async function writeRawFile(directoryHandle, name, text, { create = true } = {}) {
  const fh = await directoryHandle.getFileHandle(name, { create });
  const writable = await fh.createWritable();
  await writable.write(text);
  await writable.close();
}

async function removeEntrySafe(directoryHandle, name) {
  try {
    await directoryHandle.removeEntry(name);
  } catch {
    /* ignore */
  }
}

/** 删除旧版多余备份文件（升级后自动瘦身） */
async function removeLegacyExtraBackupFiles(directoryHandle) {
  await removeEntrySafe(directoryHandle, LEGACY_BAK2);
  await removeEntrySafe(directoryHandle, LEGACY_PERIODIC);
}

/**
 * 提交新主文件前：将当前主文件整份写入 .bak（仅保留上一代，不链式复制）
 */
async function backupCurrentMainToBak(directoryHandle) {
  let mainText = null;
  try {
    mainText = await readFileText(directoryHandle, FOLDER_DATA_FILE);
  } catch (e) {
    if (e?.name === 'NotFoundError') return;
    throw e;
  }
  if (!mainText || !mainText.trim()) return;
  await writeRawFile(directoryHandle, FOLDER_DATA_BAK, mainText, { create: true });
}

function tryParseAndValidate(text, label) {
  if (!text || !text.trim()) return { ok: false, reason: 'empty' };
  try {
    const data = JSON.parse(text);
    if (!validatePromptFillPayload(data)) {
      console.warn(`[folderStorage] ${label} 校验未通过（结构不完整）`);
      return { ok: false, reason: 'invalid_shape' };
    }
    return { ok: true, data };
  } catch (e) {
    if (e instanceof SyntaxError) return { ok: false, reason: 'parse', error: e };
    return { ok: false, reason: 'unknown', error: e };
  }
}

/**
 * 从目录读取：主文件 → 仅一份 .bak
 */
export async function readPromptFillDataFile(directoryHandle) {
  if (!directoryHandle) return { ok: false, reason: 'no_handle' };

  const candidates = [
    { name: FOLDER_DATA_FILE, label: 'main' },
    { name: FOLDER_DATA_BAK, label: 'bak' },
  ];

  let lastError = null;
  for (const { name, label } of candidates) {
    try {
      const text = await readFileText(directoryHandle, name);
      const parsed = tryParseAndValidate(text, label);
      if (parsed.ok) {
        if (label !== 'main') {
          console.warn(`[folderStorage] 已使用 ${name} 恢复数据（主文件不可用）`);
        }
        return { ok: true, data: parsed.data, source: name };
      }
      lastError = parsed;
    } catch (e) {
      if (e?.name === 'NotFoundError') continue;
      lastError = { ok: false, reason: 'unknown', error: e };
    }
  }

  if (lastError?.reason === 'empty' || lastError?.reason === 'parse' || lastError?.reason === 'invalid_shape') {
    return { ok: false, reason: lastError.reason, error: lastError.error };
  }
  return { ok: false, reason: 'not_found' };
}

export function applyPromptFillDataPayload(data, { setTemplates, setBanks, setCategories, setDefaults }) {
  if (!data || typeof data !== 'object') return;
  if (data.templates) setTemplates(data.templates);
  if (data.banks) setBanks(data.banks);
  if (data.categories) setCategories(data.categories);
  if (data.defaults) setDefaults(data.defaults);
}

/**
 * 安全写入：tmp 校验 → 当前主文件 → .bak → 写主文件 → 删 tmp → 删旧版多余备份
 */
export async function writePromptFillDataFile(directoryHandle, snapshot, options = {}) {
  if (!directoryHandle) return;

  const { pretty = false } = options;
  const data = buildPayload(snapshot);
  const text = pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);

  const parsedProbe = tryParseAndValidate(text, 'probe');
  if (!parsedProbe.ok) {
    throw new Error('[folderStorage] 序列化结果自检失败');
  }

  await removeEntrySafe(directoryHandle, FOLDER_DATA_TEMP);
  await writeRawFile(directoryHandle, FOLDER_DATA_TEMP, text, { create: true });

  const tmpText = await readFileText(directoryHandle, FOLDER_DATA_TEMP);
  const tmpParsed = tryParseAndValidate(tmpText, 'tmp');
  if (!tmpParsed.ok) {
    await removeEntrySafe(directoryHandle, FOLDER_DATA_TEMP);
    throw new Error('[folderStorage] 临时文件校验失败，已中止写入以避免损坏主存档');
  }

  await backupCurrentMainToBak(directoryHandle);

  await writeRawFile(directoryHandle, FOLDER_DATA_FILE, text, { create: true });
  await removeEntrySafe(directoryHandle, FOLDER_DATA_TEMP);

  await removeLegacyExtraBackupFiles(directoryHandle);

  console.log('[folderStorage] 已安全写入', FOLDER_DATA_FILE, pretty ? '(pretty)' : '(compact)');
}

export async function writePromptFillDataFilePretty(directoryHandle, snapshot) {
  return writePromptFillDataFile(directoryHandle, snapshot, { pretty: true });
}
