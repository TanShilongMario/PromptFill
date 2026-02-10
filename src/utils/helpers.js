import pako from 'pako';

// 通用工具函数

// ... (existing code)

// 复制文本到剪贴板 (带手机端兼容性 fallback + Tauri 支持)
export const copyToClipboard = async (text) => {
  if (typeof window === 'undefined') return false;

  // --- 新增：Tauri 原生剪贴板支持 ---
  try {
    // Tauri v2 插件通常挂载在 window.__TAURI_API__ 或通过直接调用
    if (window.__TAURI_INTERNALS__ || window.__TAURI_IPC__) {
      // 尝试调用 Tauri 的 clipboard-manager 插件
      // 注意：这里需要配合我们之前在 Rust 里开通的权限
      const { invoke } = window.__TAURI_INTERNALS__ || {};
      if (invoke) {
        try {
          // 这里的具体指令取决于 Tauri 插件的内部实现，
          // 但最稳妥的方法是使用 navigator.clipboard 并在下方做强力 fallback
          console.log('Tauri environment detected for clipboard');
        } catch (e) {}
      }
    }
  } catch (e) {}

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
  // 这是最兼容的方式，在 App 内也通常有效
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // 确保在可视区域外且在文档中可见
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    textArea.style.width = "2em";
    textArea.style.height = "2em";
    textArea.style.padding = "0";
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";
    textArea.style.background = "transparent";
    
    document.body.appendChild(textArea);
    textArea.contentEditable = true; // 兼容 iOS
    textArea.readOnly = false;      // 确保可选中
    textArea.focus();
    textArea.setSelectionRange(0, 999999); // 兼容 iOS
    textArea.select();
    
    // 兼容 iOS 和某些 App WebView
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    if (successful) return true;
  } catch (err) {
    console.error('Fallback 复制也失败了:', err);
  }

  return false;
};

// 压缩模板数据
export const compressTemplate = (data, banks = null, categories = null, templates = null) => {
  try {
    if (!data) return null;

    // 1. 提取核心数据，过滤掉巨大的 Base64 图像
    const simplifiedData = (data.n && data.c) ? {
      ...data,
      s: data.s || data.selections || {} // 确保 selections 被包含 (s 为精简键名)
    } : {
      n: data.name || "",
      c: data.content || "",
      t: data.tags || [],
      a: data.author || 'User',
      l: data.language || ['cn', 'en'],
      i: (typeof data.imageUrl === 'string' && data.imageUrl.startsWith('http')) ? data.imageUrl : "",
      s: data.selections || {}, // s for selections
      // --- 新增视频模板相关字段 ---
      ty: data.type || 'image',    // ty for type
      vu: data.videoUrl || "",     // vu for videoUrl
      src: data.source || []       // src for source
    };

    // 1.5 如果提供了 templates，打包 source 中关联的模版（一层，不递归）
    if (templates) {
      const sourceArr = data.source || [];
      const linkedTemplateIds = [...new Set(
        sourceArr.filter(s => s.templateId).map(s => s.templateId)
      )];

      if (linkedTemplateIds.length > 0) {
        const linkedTemplates = [];
        linkedTemplateIds.forEach(tid => {
          const linkedTpl = templates.find(t => t.id === tid);
          if (linkedTpl) {
            // 精简关联模版数据（不传 templates 参数，避免递归）
            const ltData = {
              oid: tid, // oid = original id，用于导入时建立映射
              n: linkedTpl.name || "",
              c: linkedTpl.content || "",
              t: linkedTpl.tags || [],
              a: linkedTpl.author || 'User',
              l: linkedTpl.language || ['cn', 'en'],
              i: (typeof linkedTpl.imageUrl === 'string' && linkedTpl.imageUrl.startsWith('http')) ? linkedTpl.imageUrl : "",
              s: linkedTpl.selections || {},
              ty: linkedTpl.type || 'image',
              vu: linkedTpl.videoUrl || "",
              // 关联模版的 source：降级处理，移除其中的 templateId 避免嵌套
              src: (linkedTpl.source || []).map(s => {
                if (s.templateId) {
                  const { templateId, ...rest } = s;
                  return rest;
                }
                return s;
              })
            };
            linkedTemplates.push(ltData);
          }
        });

        if (linkedTemplates.length > 0) {
          simplifiedData.lt = linkedTemplates; // lt = linkedTemplates
        }
      }
    }

    // 2. 如果提供了 banks，提取模板中使用的自定义词库
    if (banks) {
      const contentStr = typeof simplifiedData.c === 'object' 
        ? Object.values(simplifiedData.c).join(' ') 
        : simplifiedData.c;
      
      const varRegex = /{{(.*?)}}/g;
      const matches = [...contentStr.matchAll(varRegex)];
      
      // 使用更精确的解析逻辑提取 baseKey，支持带下划线的词库名
      const baseKeys = [...new Set(matches.map(m => {
        const fullKey = m[1].trim();
        // 匹配逻辑：提取末尾如果是 _数字 的部分之前的全部内容
        const match = fullKey.match(/^(.+?)(?:_(\d+))?$/);
        return match ? match[1] : fullKey;
      }))];
      
      const relevantBanks = {};
      const relevantCategories = {};
      
      baseKeys.forEach(key => {
        if (banks[key]) {
          relevantBanks[key] = banks[key];
          const catId = banks[key].category;
          if (categories && categories[catId]) {
            relevantCategories[catId] = categories[catId];
          }
        }
      });
      
      if (Object.keys(relevantBanks).length > 0) {
        simplifiedData.b = relevantBanks; // b for banks
        simplifiedData.cg = relevantCategories; // cg for categories
      }
    }

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
    const result = {
      name: data.n || data.name,
      content: data.c || data.content,
      tags: data.t || [],
      author: data.a || 'User',
      language: data.l || ['cn', 'en'],
      imageUrl: data.i || "",
      banks: data.b || null,
      categories: data.cg || null,
      selections: data.s || data.selections || {},
      // --- 新增视频模板相关字段恢复 ---
      type: data.ty || data.type || 'image',
      videoUrl: data.vu || data.videoUrl || "",
      source: data.src || data.source || []
    };

    // --- 还原关联模版数据 ---
    if (data.lt && Array.isArray(data.lt) && data.lt.length > 0) {
      result.linkedTemplates = data.lt.map(lt => ({
        originalId: lt.oid || '',
        name: lt.n || '',
        content: lt.c || '',
        tags: lt.t || [],
        author: lt.a || 'User',
        language: lt.l || ['cn', 'en'],
        imageUrl: lt.i || '',
        selections: lt.s || {},
        type: lt.ty || 'image',
        videoUrl: lt.vu || '',
        source: lt.src || []
      }));
    }

    return result;
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

  // 处理对象格式
  const localized = obj[language] || obj.cn || obj.en;

  // 如果获取到的值不是字符串，转换为字符串
  if (localized === null || localized === undefined) return "";
  if (typeof localized !== 'string') {
    console.warn('getLocalized: localized value is not a string, converting:', localized);
    return String(localized);
  }

  return localized;
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

/**
 * 自动识别并转换视频链接为嵌入地址 (B站, YouTube, X等)
 * @param {string} url 原始链接
 * @returns {Object|null} { embedUrl, platform, isEmbed: true } 或 null
 */
export const getVideoEmbedInfo = (url) => {
  if (!url || typeof url !== 'string') return null;

  // 1. YouTube
  // https://www.youtube.com/watch?v=dQw4w9WgXcQ
  // https://youtu.be/dQw4w9WgXcQ
  const ytRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/;
  const ytMatch = url.match(ytRegex);
  if (ytMatch) {
    return {
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}`,
      platform: 'youtube',
      isEmbed: true
    };
  }

  // 2. Bilibili
  // https://www.bilibili.com/video/BV1GJ411x7h7
  // http://player.bilibili.com/player.html?bvid=BV1GJ411x7h7
  const biliRegex = /(?:bilibili\.com\/video\/|player\.bilibili\.com\/player\.html\?bvid=)(BV[a-zA-Z0-9]+)/;
  const biliMatch = url.match(biliRegex);
  if (biliMatch) {
    return {
      // 增加 high_quality=1&danmaku=0 等参数优化预览体验
      embedUrl: `//player.bilibili.com/player.html?bvid=${biliMatch[1]}&page=1&high_quality=1&danmaku=0`,
      platform: 'bilibili',
      isEmbed: true
    };
  }

  // 3. X (Twitter)
  // X 的嵌入比较特殊，通常是嵌入整个 Tweet
  // https://x.com/username/status/123456789
  // https://twitter.com/username/status/123456789
  const xRegex = /(?:x\.com|twitter\.com)\/[a-zA-Z0-9_]+\/status\/(\d+)/;
  const xMatch = url.match(xRegex);
  if (xMatch) {
    return {
      // 使用 Twitter 官方的嵌入部件 URL (这种方式在 iframe 中可能受限，取决于平台策略)
      // 备选方案是返回原始链接但在预览中提示使用 X 的嵌入
      embedUrl: `https://platform.twitter.com/embed/Tweet.html?id=${xMatch[1]}`,
      platform: 'x',
      isEmbed: true
    };
  }

  // 4. Direct Video Link (mp4, webm, ogg, etc.)
  const videoExtRegex = /\.(mp4|webm|ogg|mov|m4v)(?:\?.*)?$/i;
  if (videoExtRegex.test(url)) {
    return {
      embedUrl: url,
      platform: 'video',
      isEmbed: false // Direct video tag, not iframe
    };
  }

  // 如果不是已知平台，返回 null
  return null;
};
