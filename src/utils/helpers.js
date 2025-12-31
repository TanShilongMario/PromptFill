import pako from 'pako';

// 通用工具函数

// ... (existing code)

// 复制文本到剪贴板 (带手机端兼容性 fallback)
export const copyToClipboard = async (text) => {
  if (typeof window === 'undefined') return false;

  // 1. 优先尝试现代 API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn('navigator.clipboard 复制失败，尝试 fallback:', err);
    }
  }

  // 2. Fallback: 使用隐藏 textarea + document.execCommand('copy')
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // 确保在可视区域外
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    textArea.style.opacity = "0";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    // 兼容 iOS
    const range = document.createRange();
    range.selectNodeContents(textArea);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    textArea.setSelectionRange(0, 999999);

    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Fallback 复制也失败了:', err);
    return false;
  }
};

// 压缩模板数据
export const compressTemplate = (data) => {
  try {
    if (!data) return null;

    // 1. 提取核心数据，过滤掉巨大的 Base64 图像
    const simplifiedData = (data.n && data.c) ? data : {
      n: data.name || "",
      c: data.content || "",
      t: data.tags || [],
      a: data.author || 'User',
      l: data.language || ['cn', 'en'],
      i: (typeof data.imageUrl === 'string' && data.imageUrl.startsWith('http')) ? data.imageUrl : ""
    };

    const jsonStr = JSON.stringify(simplifiedData);
    const uint8Array = new TextEncoder().encode(jsonStr);
    
    // 压缩
    const compressed = pako.deflate(uint8Array, { level: 9 });
    
    // 将 Uint8Array 转换为 "binary string"
    let binary = '';
    const len = compressed.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(compressed[i]);
    }
    
    // 转为 URL 安全的 Base64
    const base64 = btoa(binary)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
      
    return base64;
  } catch (error) {
    console.error('Compression error details:', error);
    return null;
  }
};

// 解压缩模板数据
export const decompressTemplate = (compressedBase64) => {
  try {
    if (!compressedBase64) return null;
    
    // 还原 Base64 字符
    let base64 = compressedBase64.replace(/-/g, '+').replace(/_/g, '/');
    
    // 补齐 Base64 填充字符 =
    const pad = base64.length % 4;
    if (pad) {
      if (pad === 1) return null; // 无效的 base64
      base64 += new Array(5 - pad).join('=');
    }
    
    const binary = atob(base64);
    const uint8Array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      uint8Array[i] = binary.charCodeAt(i);
    }
    const decompressed = pako.inflate(uint8Array);
    const jsonStr = new TextDecoder().decode(decompressed);
    const data = JSON.parse(jsonStr);

    // 统一映射回原始键名，兼容精简版和超精简版
    return {
      name: data.n || data.name,
      content: data.c || data.content,
      tags: data.t || [],
      author: data.a || 'User',
      language: data.l || ['cn', 'en'],
      imageUrl: data.i || "",
      selections: {}
    };
  } catch (error) {
    console.error('Decompression error:', error);
    return null;
  }
};


// 深拷贝对象
export const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

// 生成唯一键名
export const makeUniqueKey = (base, existingKeys, suffix = "custom") => {
  let candidate = `${base}_${suffix}`;
  let counter = 1;
  while (existingKeys.has(candidate)) {
    candidate = `${base}_${suffix}${counter}`;
    counter += 1;
  }
  return candidate;
};

// 获取本地化文本
export const getLocalized = (obj, language) => {
  if (!obj) return "";
  if (typeof obj === 'string') return obj;
  return obj[language] || obj.cn || obj.en || "";
};

// 获取系统语言 (非中文环境默认返回 en)
export const getSystemLanguage = () => {
  if (typeof window === 'undefined') return 'cn';
  const lang = (navigator.language || navigator.languages?.[0] || 'zh-CN').toLowerCase();
  return lang.startsWith('zh') ? 'cn' : 'en';
};

// 等待图片加载完成，避免导出时空白
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
    const onError = () => { clear(); resolve(); }; // 失败也放行，避免阻塞
    const timer = setTimeout(() => { clear(); resolve(); }, timeout);
    img.addEventListener('load', onLoad);
    img.addEventListener('error', onError);
  });
};
