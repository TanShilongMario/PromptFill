/**
 * IndexedDB 存储中心
 * 用于突破 LocalStorage 的 5MB 限制，提供更强大的本地存储能力
 */

const DB_NAME = 'PromptFillDB';
const DB_VERSION = 2; // 升级版本以包含新的存储对象
const STORES = {
  HANDLES: 'handles', // 存储文件系统句柄
  APP_DATA: 'app_data' // 存储模板、词库等应用数据
};

/**
 * 打开数据库
 */
export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // 存储文件系统句柄
      if (!db.objectStoreNames.contains(STORES.HANDLES)) {
        db.createObjectStore(STORES.HANDLES);
      }
      
      // 存储应用核心数据 (templates, banks, settings, etc.)
      if (!db.objectStoreNames.contains(STORES.APP_DATA)) {
        db.createObjectStore(STORES.APP_DATA);
      }
    };
  });
};

/**
 * 通用的设置数据方法
 */
export const dbSet = async (key, value) => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORES.APP_DATA], 'readwrite');
      const store = transaction.objectStore(STORES.APP_DATA);
      const request = store.put(value, key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error(`IndexedDB Set Error (${key}):`, error);
    // 降级处理：如果 IDB 失败，暂时写入内存（不写 LS，避免溢出）
  }
};

/**
 * 通用的获取数据方法
 */
export const dbGet = async (key, defaultValue = null) => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORES.APP_DATA], 'readonly');
      const store = transaction.objectStore(STORES.APP_DATA);
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result !== undefined ? request.result : defaultValue);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error(`IndexedDB Get Error (${key}):`, error);
    return defaultValue;
  }
};

/**
 * 特殊：获取文件夹句柄
 */
export const getDirectoryHandle = async () => {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORES.HANDLES], 'readonly');
    const store = transaction.objectStore(STORES.HANDLES);
    return new Promise((resolve, reject) => {
      const request = store.get('directory');
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('获取文件夹句柄失败:', error);
    return null;
  }
};

/**
 * 特殊：保存文件夹句柄
 */
export const saveDirectoryHandle = async (handle) => {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORES.HANDLES], 'readwrite');
    const store = transaction.objectStore(STORES.HANDLES);
    await store.put(handle, 'directory');
  } catch (error) {
    console.error('保存文件夹句柄失败:', error);
  }
};

/**
 * 检查是否已经迁移过数据
 */
export const isMigrated = () => {
  return localStorage.getItem('app_storage_migrated') === 'true';
};

/**
 * 标记迁移完成
 */
export const markMigrated = () => {
  localStorage.setItem('app_storage_migrated', 'true');
  localStorage.setItem('app_storage_mode', 'browser_indexeddb');
};

/**
 * 列出 app_data 对象仓库中的全部 key（用于紧急备份条目管理与清理）
 */
export const dbListAppDataKeys = () => {
  return new Promise((resolve, reject) => {
    openDB().then((db) => {
      try {
        const transaction = db.transaction([STORES.APP_DATA], 'readonly');
        const store = transaction.objectStore(STORES.APP_DATA);
        const request = store.getAllKeys();
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
      } catch (e) {
        reject(e);
      }
    }).catch(reject);
  });
};

/** 删除 app_data 中指定 key */
export const dbDeleteAppDataKey = (key) => {
  return new Promise((resolve, reject) => {
    openDB().then((db) => {
      try {
        const transaction = db.transaction([STORES.APP_DATA], 'readwrite');
        const store = transaction.objectStore(STORES.APP_DATA);
        const request = store.delete(key);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      } catch (e) {
        reject(e);
      }
    }).catch(reject);
  });
};

/**
 * 将当前内存中的主数据立即写入 IndexedDB（与 useAsyncStickyState 的 key 一致）。
 * 用于从「本地文件夹」切回「浏览器存储」时：避免仅改 localStorage 而 IDB 仍是旧快照，刷新后误丢模版。
 */
export async function writeFullAppStateToIndexedDB({ templates, banks, categories, defaults }) {
  await dbSet('app_templates_v10', templates);
  await dbSet('app_banks_v9', banks);
  await dbSet('app_categories_v1', categories);
  await dbSet('app_defaults_v9', defaults);
}
