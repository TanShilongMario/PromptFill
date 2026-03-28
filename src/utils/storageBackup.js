/**
 * 浏览器 IndexedDB 紧急快照：在存储方案切换 / 文件夹合并前保留完整副本，避免误覆盖。
 * Key 前缀：pf_emergency_<timestamp>
 */

import { dbSet, dbGet, dbListAppDataKeys, dbDeleteAppDataKey } from './db';
import { INITIAL_TEMPLATES_CONFIG } from '../data/templates';

const PREFIX = 'pf_emergency_';
const KEEP_LAST = 14;

const systemTemplateIds = new Set(INITIAL_TEMPLATES_CONFIG.map((t) => t.id));

/** 非内置 id 的模板数量（用于判断「浏览器里是否更可能有你的创作」） */
export function countUserTemplates(templates) {
  if (!Array.isArray(templates)) return 0;
  return templates.filter((t) => t && t.id && !systemTemplateIds.has(t.id)).length;
}

/**
 * 启动时：若 IndexedDB 里已加载的数据比文件夹 JSON 更「丰富」，则不要用磁盘覆盖内存。
 * 随后自动保存会把当前（更完整）数据写回文件夹，修复陈旧 prompt_fill_data.json。
 */
export function shouldPreferBrowserStateOverDisk({ memoryTemplates, diskTemplates }) {
  const memUser = countUserTemplates(memoryTemplates);
  const diskUser = countUserTemplates(diskTemplates);
  const memTotal = memoryTemplates?.length || 0;
  const diskTotal = diskTemplates?.length || 0;

  if (memUser > diskUser) {
    return { prefer: true, reason: 'more_user_templates' };
  }
  if (memUser === diskUser && memTotal > diskTotal) {
    return { prefer: true, reason: 'more_total_templates' };
  }
  return { prefer: false, reason: 'use_disk' };
}

function cloneData(obj) {
  try {
    return structuredClone(obj);
  } catch {
    return JSON.parse(JSON.stringify(obj));
  }
}

/**
 * 合并磁盘 JSON 与当前内存态（不整表替换）。
 *
 * @param {boolean} [folderModeStartupMerge=false]
 *   为 true 时：用于「本地文件夹模式 + 冷启动」——IndexedDB 在文件夹模式下往往未更新，
 *   此时同名【自定义】模版 id 以磁盘为准（否则刷新后会用陈旧 IDB 盖住 autosave 里的 1.1）。
 *   内置系统模版 id 仍以内存为准（保留你对官方模版的本地编辑）。
 *   banks/categories/defaults 同名字段也以磁盘为准（与 autosave 一致）。
 *
 *   为 false 时：用于浏览器内合并、手动选文件夹等——同名自定义 id 以内存为准，
 *   仅追加「仅磁盘有」的自定义模版；词库等同名以内存为准。避免旧存档覆盖你刚改的内容。
 */
export function mergeFolderDiskIntoMemoryState({
  memoryTemplates,
  diskTemplates,
  memoryBanks,
  diskBanks,
  memoryCategories,
  diskCategories,
  memoryDefaults,
  diskDefaults,
  folderModeStartupMerge = false,
}) {
  const mem = Array.isArray(memoryTemplates) ? memoryTemplates : [];
  const disk = Array.isArray(diskTemplates) ? diskTemplates : [];

  const diskUserById = new Map();
  for (const t of disk) {
    if (!t?.id || systemTemplateIds.has(t.id)) continue;
    diskUserById.set(t.id, t);
  }

  const seen = new Set();
  const templates = [];

  if (folderModeStartupMerge) {
    for (const t of mem) {
      if (!t?.id) continue;
      if (systemTemplateIds.has(t.id)) {
        templates.push(cloneData(t));
        seen.add(t.id);
        continue;
      }
      const fromDisk = diskUserById.get(t.id);
      if (fromDisk) {
        templates.push(cloneData(fromDisk));
      } else {
        templates.push(cloneData(t));
      }
      seen.add(t.id);
    }
    for (const t of disk) {
      if (!t?.id || systemTemplateIds.has(t.id)) continue;
      if (seen.has(t.id)) continue;
      templates.push(cloneData(t));
      seen.add(t.id);
    }
  } else {
    const memIds = new Set(mem.map((t) => t?.id).filter(Boolean));
    templates.push(...mem.map((t) => cloneData(t)));
    for (const t of disk) {
      if (!t?.id) continue;
      if (systemTemplateIds.has(t.id)) continue;
      if (memIds.has(t.id)) continue;
      templates.push(cloneData(t));
      memIds.add(t.id);
    }
  }

  let banks;
  let categories;
  let defaults;
  if (folderModeStartupMerge) {
    banks = {
      ...(memoryBanks && typeof memoryBanks === 'object' ? memoryBanks : {}),
      ...(diskBanks && typeof diskBanks === 'object' ? diskBanks : {}),
    };
    categories = {
      ...(memoryCategories && typeof memoryCategories === 'object' ? memoryCategories : {}),
      ...(diskCategories && typeof diskCategories === 'object' ? diskCategories : {}),
    };
    defaults = {
      ...(memoryDefaults && typeof memoryDefaults === 'object' ? memoryDefaults : {}),
      ...(diskDefaults && typeof diskDefaults === 'object' ? diskDefaults : {}),
    };
  } else {
    banks = {
      ...(diskBanks && typeof diskBanks === 'object' ? diskBanks : {}),
      ...(memoryBanks && typeof memoryBanks === 'object' ? memoryBanks : {}),
    };
    categories = {
      ...(diskCategories && typeof diskCategories === 'object' ? diskCategories : {}),
      ...(memoryCategories && typeof memoryCategories === 'object' ? memoryCategories : {}),
    };
    defaults = {
      ...(diskDefaults && typeof diskDefaults === 'object' ? diskDefaults : {}),
      ...(memoryDefaults && typeof memoryDefaults === 'object' ? memoryDefaults : {}),
    };
  }

  return { templates, banks, categories, defaults };
}

/**
 * 将磁盘读出的 payload 合并进当前内存态并写入 React setters（不整表覆盖）。
 * diskData 须含 templates；banks/categories/defaults 可选。
 */
export function applyMergedFolderPayloadToState(diskData, memoryState, setters, options = {}) {
  const {
    templates: memoryTemplates,
    banks: memoryBanks,
    categories: memoryCategories,
    defaults: memoryDefaults,
  } = memoryState;
  const {
    setTemplates,
    setBanks,
    setCategories,
    setDefaults,
  } = setters;

  const folderModeStartupMerge = options.folderModeStartupMerge === true;

  if (!diskData || !Array.isArray(diskData.templates)) {
    return { addedFromDisk: 0 };
  }

  const merged = mergeFolderDiskIntoMemoryState({
    memoryTemplates,
    diskTemplates: diskData.templates,
    memoryBanks,
    diskBanks: diskData.banks,
    memoryCategories,
    diskCategories: diskData.categories,
    memoryDefaults,
    diskDefaults: diskData.defaults,
    folderModeStartupMerge,
  });

  setTemplates(merged.templates);
  setBanks(merged.banks);
  setCategories(merged.categories);
  setDefaults(merged.defaults);

  const addedFromDisk = countDiskOnlyUserTemplates(memoryTemplates, diskData.templates);
  return { addedFromDisk };
}

/** 磁盘上存在、内存里没有的自定义模版数量（用于提示） */
export function countDiskOnlyUserTemplates(memoryTemplates, diskTemplates) {
  const mem = Array.isArray(memoryTemplates) ? memoryTemplates : [];
  const disk = Array.isArray(diskTemplates) ? diskTemplates : [];
  const memIds = new Set(mem.map((t) => t?.id).filter(Boolean));
  let n = 0;
  for (const t of disk) {
    if (!t?.id || systemTemplateIds.has(t.id)) continue;
    if (!memIds.has(t.id)) n += 1;
  }
  return n;
}

/**
 * 写入一条完整快照（templates / banks / categories / defaults + 元数据）
 * @param {object} payload — 需含 reason；其余与 prompt_fill_data 结构一致
 * @returns {Promise<string>} 新 key
 */
export async function saveEmergencySnapshot(payload) {
  const key = `${PREFIX}${Date.now()}`;
  const record = {
    savedAt: new Date().toISOString(),
    version: 'v1',
    ...payload,
  };
  await dbSet(key, record);
  await pruneEmergencySnapshots();
  return key;
}

async function pruneEmergencySnapshots() {
  let keys;
  try {
    keys = await dbListAppDataKeys();
  } catch {
    return;
  }
  const ours = keys.filter((k) => typeof k === 'string' && k.startsWith(PREFIX));
  ours.sort((a, b) => {
    const ta = parseInt(a.slice(PREFIX.length), 10) || 0;
    const tb = parseInt(b.slice(PREFIX.length), 10) || 0;
    return tb - ta;
  });
  const stale = ours.slice(KEEP_LAST);
  await Promise.all(stale.map((k) => dbDeleteAppDataKey(k)));
}

/** 列表（新→旧），仅元信息，不含大对象二次加载时可再 get */
export async function listEmergencySnapshots() {
  const keys = (await dbListAppDataKeys()).filter((k) => typeof k === 'string' && k.startsWith(PREFIX));
  keys.sort((a, b) => parseInt(b.slice(PREFIX.length), 10) - parseInt(a.slice(PREFIX.length), 10));

  const out = [];
  for (const key of keys) {
    const rec = await dbGet(key, null);
    if (!rec || !rec.savedAt) continue;
    out.push({
      key,
      savedAt: rec.savedAt,
      reason: rec.reason || '',
      note: rec.note || '',
      templateCount: Array.isArray(rec.templates) ? rec.templates.length : 0,
      userTemplateCount: countUserTemplates(rec.templates),
    });
  }
  return out;
}

export async function getEmergencySnapshotByKey(key) {
  if (!key || typeof key !== 'string' || !key.startsWith(PREFIX)) return null;
  return dbGet(key, null);
}
