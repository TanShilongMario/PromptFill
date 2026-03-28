/**
 * 本地文件夹模式：将内联图片落盘到 images/，JSON 仅存相对路径。
 * 仅处理 data: / blob: 与 http(s) 无关；已是 images/ 的路径跳过。
 */

export const FOLDER_IMAGES_DIR = 'images';

/** 是否为应用约定的本地相对路径（禁止 ..） */
export function isFolderMediaPath(str) {
  if (!str || typeof str !== 'string') return false;
  const t = str.trim();
  if (!t.startsWith(`${FOLDER_IMAGES_DIR}/`)) return false;
  if (t.includes('..') || t.includes('\\')) return false;
  return true;
}

const MIME_EXT = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
  'image/avif': 'avif',
};

function extFromMime(mime) {
  if (!mime) return 'png';
  const m = mime.split(';')[0].trim().toLowerCase();
  return MIME_EXT[m] || 'png';
}

function extFromDataUrl(dataUrl) {
  const m = /^data:([^;,]+)/i.exec(dataUrl);
  return extFromMime(m ? m[1] : '');
}

function sanitizeTemplateId(id) {
  return String(id || 'tpl').replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 48);
}

async function getImagesDirectory(rootHandle) {
  return rootHandle.getDirectoryHandle(FOLDER_IMAGES_DIR, { create: true });
}

/**
 * 从数据目录读取 images/ 下文件为 Blob（支持 images/a.png 或单层路径）
 */
export async function readMediaBlobFromFolder(rootHandle, relativePath) {
  if (!rootHandle || !isFolderMediaPath(relativePath)) return null;
  const parts = relativePath.replace(/^\/+/, '').split('/').filter(Boolean);
  if (parts.length < 2 || parts[0] !== FOLDER_IMAGES_DIR) return null;
  try {
    const imagesDir = await rootHandle.getDirectoryHandle(FOLDER_IMAGES_DIR);
    const fileName = parts.slice(1).join('/'); // 仅支持一层文件名，防止子目录遍历
    if (fileName.includes('/') || fileName.includes('..')) return null;
    const fh = await imagesDir.getFileHandle(fileName);
    const file = await fh.getFile();
    return file;
  } catch {
    return null;
  }
}

async function writeBlobToImages(imagesDir, fileName, blob) {
  const fh = await imagesDir.getFileHandle(fileName, { create: true });
  const w = await fh.createWritable();
  await w.write(blob);
  await w.close();
}

async function blobFromSrc(url) {
  if (!url || typeof url !== 'string') return null;
  if (url.startsWith('data:image/')) {
    const res = await fetch(url);
    return res.blob();
  }
  if (url.startsWith('blob:')) {
    const res = await fetch(url);
    return res.blob();
  }
  return null;
}

/**
 * 将单条 URL 若为内联图片则写入 images/，返回新路径或原 URL
 */
async function persistOneImageUrl(imagesDir, templateId, part, index, url) {
  if (!url || typeof url !== 'string') return url;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (isFolderMediaPath(url)) return url;

  const blob = await blobFromSrc(url);
  if (!blob || !blob.type.startsWith('image/')) return url;

  const safeId = sanitizeTemplateId(templateId);
  const ext = extFromMime(blob.type);
  const fileName = `${safeId}_${part}_${index}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`;
  await writeBlobToImages(imagesDir, fileName, blob);
  return `${FOLDER_IMAGES_DIR}/${fileName}`;
}

function cloneTemplate(tpl) {
  try {
    return structuredClone(tpl);
  } catch {
    return JSON.parse(JSON.stringify(tpl));
  }
}

/**
 * 遍历模板，将 data:/blob: 图片写入 images/，替换为相对路径。
 * @returns {{ templates: Array, changed: boolean }}
 */
export async function persistTemplateImagesToFolder(templates, rootDirectoryHandle) {
  if (!rootDirectoryHandle || !Array.isArray(templates)) {
    return { templates, changed: false };
  }

  const imagesDir = await getImagesDirectory(rootDirectoryHandle);
  const next = [];
  let changed = false;

  for (const tpl of templates) {
    const copy = cloneTemplate(tpl);

    if (copy.imageUrl) {
      const n = await persistOneImageUrl(imagesDir, copy.id, 'cover', 0, copy.imageUrl);
      if (n !== copy.imageUrl) {
        copy.imageUrl = n;
        changed = true;
      }
    }

    if (Array.isArray(copy.imageUrls)) {
      for (let i = 0; i < copy.imageUrls.length; i++) {
        const n = await persistOneImageUrl(imagesDir, copy.id, 'img', i, copy.imageUrls[i]);
        if (n !== copy.imageUrls[i]) {
          copy.imageUrls[i] = n;
          changed = true;
        }
      }
    }

    if (Array.isArray(copy.source)) {
      for (let i = 0; i < copy.source.length; i++) {
        const s = copy.source[i];
        if (!s || s.type !== 'image' || !s.url) continue;
        const n = await persistOneImageUrl(imagesDir, copy.id, 'src', i, s.url);
        if (n !== s.url) {
          copy.source[i] = { ...s, url: n };
          changed = true;
        }
      }
    }

    next.push(copy);
  }

  return { templates: next, changed };
}
