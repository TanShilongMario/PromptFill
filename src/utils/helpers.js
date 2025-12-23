// 通用工具函數

// 深拷貝物件
export const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

// 生成唯一鍵名
export const makeUniqueKey = (base, existingKeys, suffix = "custom") => {
  let candidate = `${base}_${suffix}`;
  let counter = 1;
  while (existingKeys.has(candidate)) {
    candidate = `${base}_${suffix}${counter}`;
    counter += 1;
  }
  return candidate;
};

// 取得本地化文字
export const getLocalized = (obj, language) => {
  if (!obj) return "";
  if (typeof obj === 'string') return obj;
  return obj[language] || obj['zh-tw'] || obj.en || "";
};

// 等待圖片載入完成，避免匯出時空白
export const waitForImageLoad = (img, timeout = 6000) => {
  if (!img) return Promise.resolve();
  if (img.complete && img.naturalWidth > 0) return Promise.resolve();
  return new Promise((resolve) => {
    const clear = () => {
      img.removeEventListener('load', onLoad);
      img.removeEventListener('error', onError);
      clearTimeout(timer);
    };
    const onLoad = () => { clear(); resolve(); };
    const onError = () => { clear(); resolve(); }; // 失敗也放行，避免阻塞
    const timer = setTimeout(() => { clear(); resolve(); }, timeout);
    img.addEventListener('load', onLoad);
    img.addEventListener('error', onError);
  });
};

