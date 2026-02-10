import { useState, useMemo, useEffect, useCallback } from 'react';
import { compressTemplate, decompressTemplate, copyToClipboard, getLocalized } from '../utils/helpers';
import { PUBLIC_SHARE_URL } from '../data/templates';

// ====== 私有后端配置 ======
const API_BASE_URL = 
  import.meta.env.VITE_SHARE_API_URL || 
  'https://data.tanshilong.com/api/share';

const isTauriEnv = () => !!(window.__TAURI_INTERNALS__ || window.__TAURI_IPC__ || window.location.protocol === 'tauri:');

const fetchJson = async (url, options = {}) => {
  const method = options.method || 'GET';
  if (isTauriEnv()) {
    try {
      const { fetch } = await import('@tauri-apps/plugin-http');
      const res = await fetch(url, { ...options, method });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status} ${text ? `- ${text.slice(0, 120)}` : ''}`.trim());
      }
      return await res.json();
    } catch (error) {
      console.error('[Tauri Fetch Error]', error);
      throw error;
    }
  }

  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${text ? `- ${text.slice(0, 120)}` : ''}`.trim());
  }
  return await res.json();
};

const fetchShareByCode = async (code) => {
  const encoded = encodeURIComponent(code);
  const directUrl = `${API_BASE_URL}/${encoded}`;
  const proxyUrls = [
    `https://r.jina.ai/http://${directUrl.replace(/^https?:\/\//, '')}`
  ];

  try {
    const result = await fetchJson(directUrl);
    if (!result?.data) throw new Error('missing data');
    return result.data;
  } catch (error) {
    // 浏览器可能被 CORS 阻断，尝试文本代理
    let lastError = `${error.message || error} (${directUrl})`;
    for (const url of proxyUrls) {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        const jsonStart = text.indexOf('{');
        if (jsonStart === -1) throw new Error('missing JSON body');
        const parsed = JSON.parse(text.slice(jsonStart));
        if (!parsed?.data) throw new Error('missing data');
        return parsed.data;
      } catch (proxyError) {
        lastError = `${proxyError.message || proxyError} (${url})`;
      }
    }
    throw new Error(lastError || 'request failed');
  }
};

/**
 * 分享功能 Hook
 * 提供模版分享、导入相关的功能
 * 支持链接分享和口令分享两种方式
 * 已升级支持私有短链服务器与自定义词库分享
 *
 * @param {Object} activeTemplate - 当前激活的模版
 * @param {Function} setTemplates - 更新模版的函数
 * @param {Function} setActiveTemplateId - 设置激活模版的函数
 * @param {Function} setDiscoveryView - 设置发现页视图的函数
 * @param {boolean} isMobileDevice - 是否为移动设备
 * @param {Function} setMobileTab - 设置移动端标签的函数
 * @param {string} language - 当前语言
 * @param {Function} t - 翻译函数
 * @param {Object} banks - 词库数据
 * @param {Function} setBanks - 更新词库的函数
 * @param {Object} categories - 分类数据
 * @param {Function} setCategories - 更新分类的函数
 * @param {Array} templates - 所有模版数据（用于打包关联模版）
 * @returns {Object} 分享相关的状态和函数
 */
export const useShareFunctions = (
  activeTemplate,
  setTemplates,
  setActiveTemplateId,
  setDiscoveryView,
  isMobileDevice,
  setMobileTab,
  language,
  t,
  banks,
  setBanks,
  categories,
  setCategories,
  templates
) => {
  // 分享功能相关状态
  const [sharedTemplateData, setSharedTemplateData] = useState(null);
  const [showShareImportModal, setShowShareImportModal] = useState(false);
  const [showShareOptionsModal, setShowShareOptionsModal] = useState(false);
  const [showImportTokenModal, setShowImportTokenModal] = useState(false);
  const [importTokenValue, setImportTokenValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false); // 新增：网络请求状态
  const [prefetchedShortCode, setPrefetchedShortCode] = useState(null); // 新增：预取的短码
  const [isPrefetching, setIsPrefetching] = useState(false); // 新增：是否正在后台取码
  const [shareImportError, setShareImportError] = useState(null);
  const [isImportingShare, setIsImportingShare] = useState(false);
  const [shortCodeError, setShortCodeError] = useState(null);

  // 当模板改变时重置预取码
  useEffect(() => {
    setPrefetchedShortCode(null);
    setIsPrefetching(false);
    setShortCodeError(null);
  }, [activeTemplate]);

  // 计算分享 URL（保留作为兜底的长链接预览，但在实际分享时会尝试生成短链）
  const shareUrlMemo = useMemo(() => {
    if (!activeTemplate) return "";

    const compressed = compressTemplate(activeTemplate, banks, categories, templates);
    // 修正：在 Tauri 环境下强制使用官网域名作为分享基准
    // 使用更健壮的检测方式
    const isTauri = !!(window.__TAURI_INTERNALS__ || window.__TAURI_IPC__ || window.location.protocol === 'tauri:');
    const base = PUBLIC_SHARE_URL || (isTauri ? 'https://aipromptfill.com' : (window.location.origin + window.location.pathname));

    if (!compressed) return base;

    const fullUrl = `${base}${base.endsWith('/') ? '' : '/'}#/share?share=${compressed}`;
    return fullUrl;
  }, [activeTemplate, banks, categories]);

  // 检查分享参数（在 URL 中检测分享链接）
  useEffect(() => {
    const handleCheckShare = async () => {
      // 兼容查询参数和哈希参数
      const hashStr = window.location.hash.split('?')[1] || "";
      const urlParams = new URLSearchParams(window.location.search || hashStr);
      let shareData = urlParams.get('share');

      // 如果没有直接获取到 share 参数，尝试从整个 hash 字符串中解析
      if (!shareData && window.location.hash.includes('share=')) {
        const match = window.location.hash.match(/share=([^&?]+)/);
        if (match) shareData = match[1];
      }

      if (shareData) {
        setIsImportingShare(true);
        // 如果输入的是完整的 URL，提取 share 参数部分
        if (shareData.includes('share=')) {
          try {
            const innerUrl = new URL(shareData.startsWith('http') ? shareData : 'http://x.com/' + shareData);
            const innerParams = new URLSearchParams(innerUrl.search || innerUrl.hash.split('?')[1]);
            shareData = innerParams.get('share') || shareData;
          } catch (e) {
            // 如果解析失败，保持原样
          }
        }

        // --- 核心改动：支持短码解析 ---
        // 如果 shareData 长度较短（比如 8 位），说明是短码，需要去后端请求
        if (shareData.length <= 15) {
          try {
            const payload = await fetchShareByCode(shareData);
            const decoded = decompressTemplate(payload);
            if (decoded) {
              setSharedTemplateData(decoded);
              setShowShareImportModal(true);
            } else {
              throw new Error('decode failed');
            }
          } catch (e) {
            console.warn("Short code fetch failed, might be legacy link:", e);
            setShareImportError(
              language === 'cn'
                ? `短码解析失败：${e.message || e}`
                : `Short code import failed: ${e.message || e}`
            );
          }
        } else {
          // --- 原有长链解析逻辑 ---
          const decoded = decompressTemplate(shareData);
          if (decoded && decoded.name && decoded.content) {
            setSharedTemplateData(decoded);
            setShowShareImportModal(true);
          } else {
            setShareImportError(
              language === 'cn'
                ? '分享链接解析失败'
                : 'Failed to parse share link'
            );
          }
        }

        // 清理 URL，避免刷新时重复触发
        const newUrl = window.location.origin + window.location.pathname + window.location.hash.split('?')[0];
        window.history.replaceState({}, document.title, newUrl);
        setIsImportingShare(false);
      }
    };

    handleCheckShare();
    window.addEventListener('hashchange', handleCheckShare);
    return () => window.removeEventListener('hashchange', handleCheckShare);
  }, []);

  /**
   * 辅助函数：向后端换取短码
   */
  const getShortCodeFromServer = useCallback(async (compressedData) => {
    // 如果没有配置特殊的 API，或者在开发环境，可以跳过
    if (!API_BASE_URL || API_BASE_URL.includes('example.com')) return null;

    try {
      const result = await fetchJson(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: compressedData }),
      });
      
      return result?.code;
    } catch (e) {
      console.warn("Failed to get short code (falling back to long link):", e.message);
      setShortCodeError(e?.message || String(e));
      return null;
    }
  }, []);

  /**
   * 手动口令导入处理函数 (支持短码)
   * 支持多种格式：完整 URL、口令格式、原始分享码
   *
   * @param {string} token - 分享口令或链接
   */
  const handleManualTokenImport = useCallback(async (token) => {
    if (!token) return;

    setIsImportingShare(true);
    let shareData = token.trim();

    // 识别是否是特殊的口令格式 #pf$token$
    if (shareData.includes('#pf$') && shareData.includes('$')) {
      const match = shareData.match(/#pf\$([^$]+)\$/);
      if (match) shareData = match[1];
    }

    // 识别是否是完整的 URL 链接
    if (shareData.includes('http://') || shareData.includes('https://') || shareData.includes('share=')) {
      try {
        // 尝试解析 URL
        const urlObj = new URL(shareData.startsWith('http') ? shareData : 'http://temp.com/' + shareData);
        const params = new URLSearchParams(urlObj.search || urlObj.hash.split('?')[1]);
        const extracted = params.get('share');
        if (extracted) shareData = extracted;
      } catch (e) {
        // 解析失败则按原样尝试
      }
    }

    // 如果是短码，去服务器换取完整数据
    if (shareData.length <= 15) {
      try {
        shareData = await fetchShareByCode(shareData);
      } catch (e) {
        console.error("Short code import fetch failed:", e);
        setShareImportError(
          language === 'cn'
            ? `短码解析失败：${e.message || e}`
            : `Short code import failed: ${e.message || e}`
        );
        setIsImportingShare(false);
        return;
      }
    }

    const decoded = decompressTemplate(shareData);
    if (decoded && decoded.name && decoded.content) {
      setSharedTemplateData(decoded);
      setShowShareImportModal(true);
    } else {
      setShareImportError(
        language === 'cn'
          ? '无效的分享口令或链接'
          : 'Invalid share token or link'
      );
    }
    setIsImportingShare(false);
  }, [language]);

  /**
   * 导入分享的模版
   * 将分享的模版数据添加到用户的模版列表中
   * 同时也导入相关的词库和分类，并处理键名冲突
   */
  const handleImportSharedTemplate = useCallback(() => {
    if (!sharedTemplateData) return;

    // --- 0. 先处理关联模版（linkedTemplates），建立 oldId -> newId 映射 ---
    const linkedTemplateIdMap = {}; // { originalId: newId }
    const linkedTemplatesToAdd = [];

    if (sharedTemplateData.linkedTemplates && Array.isArray(sharedTemplateData.linkedTemplates)) {
      sharedTemplateData.linkedTemplates.forEach((lt) => {
        const originalId = lt.originalId;
        if (!originalId) return;

        // 检查本地是否已存在相同 ID 的模版（跳过导入，直接复用）
        const existsLocally = templates && templates.some(t => t.id === originalId);
        if (existsLocally) {
          linkedTemplateIdMap[originalId] = originalId; // 直接复用本地 ID
          return;
        }

        // 生成新 ID 并建立映射
        const newId = `tpl_shared_${Date.now()}_lt_${Math.random().toString(36).substr(2, 4)}`;
        linkedTemplateIdMap[originalId] = newId;

        linkedTemplatesToAdd.push({
          ...lt,
          id: newId,
          selections: lt.selections || {},
          author: lt.author || t('official')
        });
      });
    }

    let templateToImport = {
      ...sharedTemplateData,
      id: `tpl_shared_${Date.now()}`,
      selections: sharedTemplateData.selections || {},
      author: sharedTemplateData.author || t('official')
    };

    // 清除 linkedTemplates 字段（不需要存储到本地模版中）
    delete templateToImport.linkedTemplates;

    // --- 0.5 更新主模版 source 中的 templateId 为新 ID ---
    if (templateToImport.source && Array.isArray(templateToImport.source) && Object.keys(linkedTemplateIdMap).length > 0) {
      templateToImport.source = templateToImport.source.map(s => {
        if (s.templateId && linkedTemplateIdMap[s.templateId]) {
          return { ...s, templateId: linkedTemplateIdMap[s.templateId] };
        }
        return s;
      });
    }

    const keyMap = {};
    const banksToImport = sharedTemplateData.banks || {};
    const categoriesToImport = sharedTemplateData.categories || {};

    // 1. 预扫描冲突的词库键名并建立映射
    // 按键名长度降序排序，避免替换时前缀冲突（如 bank 和 bank_extra）
    const sortedOldKeys = Object.keys(banksToImport).sort((a, b) => b.length - a.length);

    sortedOldKeys.forEach(oldKey => {
      const bank = banksToImport[oldKey];
      if (banks[oldKey]) {
        // 如果本地已存在同名键，且内容不完全一致，则需要重命名导入的词库
        const existingBank = banks[oldKey];
        const isSame = JSON.stringify(existingBank.options) === JSON.stringify(bank.options);
        
        if (!isSame) {
          let newKey = oldKey;
          let charCode = 65; // 'A' 的 ASCII 码
          
          // 辅助函数：根据数字生成字母后缀 (0 -> A, 1 -> B, 26 -> AA ...)
          const getLetterSuffix = (num) => {
            let suffix = '';
            let n = num;
            while (n >= 0) {
              suffix = String.fromCharCode((n % 26) + 65) + suffix;
              n = Math.floor(n / 26) - 1;
            }
            return suffix;
          };

          let index = 0;
          // 确保新生成的键名在本地和本次导入中都是唯一的
          while (banks[newKey] || banksToImport[newKey] || Object.values(keyMap).includes(newKey)) {
             newKey = `${oldKey}_${getLetterSuffix(index)}`;
             index++;
          }
          keyMap[oldKey] = newKey;
        }
      }
    });

    // 2. 如果有重命名，同步更新模板内容和已选状态
    if (Object.keys(keyMap).length > 0) {
      const updateContentText = (text) => {
        if (typeof text !== 'string') return text;
        let newText = text;
        // 按照排序后的键名依次替换，确保逻辑正确
        sortedOldKeys.forEach(oldKey => {
          if (keyMap[oldKey]) {
            const newKey = keyMap[oldKey];
            // 匹配 {{oldKey}} 或 {{oldKey_xxx}} 或 {{ oldKey }}
            // 这里的正则要足够精确，只替换变量名部分
            const regex = new RegExp(`({{\\s*)${oldKey}((?=[_\\s}])|(?=}))`, 'g');
            newText = newText.replace(regex, `$1${newKey}`);
          }
        });
        return newText;
      };

      const updateContent = (content) => {
        if (!content) return content;
        if (typeof content === 'string') {
          return updateContentText(content);
        } else if (typeof content === 'object') {
          const newContent = {};
          Object.keys(content).forEach(lang => {
            newContent[lang] = updateContentText(content[lang]);
          });
          return newContent;
        }
        return content;
      };

      templateToImport.content = updateContent(templateToImport.content);
      
      // 更新 selections 中的键名 (格式为 key-idx 或 key_groupId-idx)
      const newSelections = {};
      Object.entries(templateToImport.selections).forEach(([selKey, val]) => {
        let currentSelKey = selKey;
        sortedOldKeys.forEach(oldKey => {
          if (keyMap[oldKey]) {
            const newKey = keyMap[oldKey];
            // 匹配开头是 oldKey，后面跟着 - (普通变量) 或 _ (联动组)
            const regex = new RegExp(`^${oldKey}(?=[-_])`);
            if (regex.test(currentSelKey)) {
              currentSelKey = currentSelKey.replace(regex, newKey);
            }
          }
        });
        newSelections[currentSelKey] = val;
      });
      templateToImport.selections = newSelections;
    }

    // 3. 执行词库导入（合并到本地词库，使用处理冲突后的键名）
    setBanks(prevBanks => {
      const newBanks = { ...prevBanks };
      let hasChange = false;
      Object.entries(banksToImport).forEach(([oldKey, bank]) => {
        const finalKey = keyMap[oldKey] || oldKey;
        if (!newBanks[finalKey]) {
          newBanks[finalKey] = bank;
          hasChange = true;
        }
      });
      return hasChange ? newBanks : prevBanks;
    });

    // 4. 执行分类导入
    if (Object.keys(categoriesToImport).length > 0) {
      setCategories(prevCats => {
        const newCats = { ...prevCats };
        let hasChange = false;
        Object.entries(categoriesToImport).forEach(([id, cat]) => {
          if (!newCats[id]) {
            newCats[id] = cat;
            hasChange = true;
          }
        });
        return hasChange ? newCats : prevCats;
      });
    }

    // 5. 先导入关联模版，再导入主模版
    setTemplates(prev => [...prev, ...linkedTemplatesToAdd, templateToImport]);
    setActiveTemplateId(templateToImport.id);
    setShowShareImportModal(false);
    setSharedTemplateData(null);
    setDiscoveryView(false);

    if (isMobileDevice) {
      setMobileTab('editor');
    }
  }, [sharedTemplateData, setTemplates, setActiveTemplateId, setDiscoveryView, isMobileDevice, setMobileTab, t, setBanks, setCategories, banks, templates]);

  /**
   * 打开分享选项弹窗
   */
  const handleShareLink = useCallback(() => {
    setShowShareOptionsModal(true);
    // 开始预取短码，避免在点击复制时才请求导致剪贴板权限丢失
    if (activeTemplate && !prefetchedShortCode && !isPrefetching) {
      setIsPrefetching(true);
      setShortCodeError(null);
      const compressed = compressTemplate(activeTemplate, banks, categories, templates);
      getShortCodeFromServer(compressed).then(code => {
        if (code) setPrefetchedShortCode(code);
        if (!code) setShortCodeError(language === 'cn' ? '短链接生成失败，已回退为长链接' : 'Short link generation failed; using long link');
      }).catch(() => {
        setShortCodeError(language === 'cn' ? '短链接生成失败，已回退为长链接' : 'Short link generation failed; using long link');
      }).finally(() => {
        setIsPrefetching(false);
      });
    }
  }, [activeTemplate, banks, categories, templates, getShortCodeFromServer, prefetchedShortCode, isPrefetching]);

  /**
   * 复制分享链接到剪贴板 (优先尝试短链接)
   */
  const doCopyShareLink = useCallback(async () => {
    if (!activeTemplate) return;

    setIsGenerating(true);
    try {
      const compressed = compressTemplate(activeTemplate, banks, categories, templates);
      let finalShareData = prefetchedShortCode;

      if (!finalShareData) {
        try {
          const shortCode = await Promise.race([
            getShortCodeFromServer(compressed),
            new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 1000))
          ]);
          if (shortCode) finalShareData = shortCode;
        } catch (e) {
          finalShareData = compressed;
          if (!shortCodeError) {
            setShortCodeError(language === 'cn' ? '短链接生成失败，已回退为长链接' : 'Short link generation failed; using long link');
          }
        }
      }

      const isTauri = !!(window.__TAURI_INTERNALS__ || window.__TAURI_IPC__ || window.location.protocol === 'tauri:');
      const base = PUBLIC_SHARE_URL || (isTauri ? 'https://aipromptfill.com' : (window.location.origin + window.location.pathname));
      const fullUrl = `${base}${base.endsWith('/') ? '' : '/'}#/share?share=${finalShareData || compressed}`;

      // --- 直接复制到剪贴板 ---
      const success = await copyToClipboard(fullUrl);
      if (success) {
        alert(t('share_success'));
        setShowShareOptionsModal(false);
      } else {
        alert(language === 'cn' ? '复制失败，请手动复制下方链接' : 'Copy failed, please manually copy the link below');
      }
    } catch (err) {
      console.error("Share failed:", err);
      alert(`Error: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  }, [activeTemplate, getShortCodeFromServer, t, language, banks, categories, templates, prefetchedShortCode, shortCodeError]);

  /**
   * 复制分享口令 (支持短码)
   */
  const handleShareToken = useCallback(async () => {
    if (!activeTemplate) return;

    setIsGenerating(true);
    try {
      const compressed = compressTemplate(activeTemplate, banks, categories, templates);
      
      let finalToken = prefetchedShortCode || compressed;
      if (!prefetchedShortCode) {
        try {
          const shortCode = await Promise.race([
            getShortCodeFromServer(compressed),
            new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 800))
          ]);
          if (shortCode) finalToken = shortCode;
        } catch (e) {}
      }

      const templateName = getLocalized(activeTemplate.name, language);
      const tokenText = `「Prompt分享」我的新模版：${templateName}\n复制整段文字，打开【提示词填空器】即可导入：\n#pf$${finalToken}$`;

      const success = await copyToClipboard(tokenText);
      if (success) {
        alert(language === 'cn' ? '分享口令已复制，快去发给好友吧！' : 'Share token copied!');
        setShowShareOptionsModal(false);
      }
    } finally {
      setIsGenerating(false);
    }
  }, [activeTemplate, language, getShortCodeFromServer, banks, categories, templates, prefetchedShortCode]);

  // 计算分享 URL（优先显示短码链接，失败则显示长链接作为兜底）
  const currentShareUrl = useMemo(() => {
    if (!activeTemplate) return null;
    
    // 如果短码获取成功，拼装短链
    if (prefetchedShortCode) {
      const isTauri = !!(window.__TAURI_INTERNALS__ || window.__TAURI_IPC__ || window.location.protocol === 'tauri:');
      const base = PUBLIC_SHARE_URL || (isTauri ? 'https://aipromptfill.com' : (window.location.origin + window.location.pathname));
      return `${base}${base.endsWith('/') ? '' : '/'}#/share?share=${prefetchedShortCode}`;
    }
    
    // 如果不在加载中，说明获取可能失败了，返回长链接
    if (!isPrefetching) {
      return shareUrlMemo;
    }
    
    return null;
  }, [activeTemplate, prefetchedShortCode, isPrefetching, shareUrlMemo]);

  return {
    // 状态
    sharedTemplateData,
    showShareImportModal,
    showShareOptionsModal,
    showImportTokenModal,
    importTokenValue,
    shareUrlMemo,
    currentShareUrl, // 新增：当前生成的分享链接
    isGenerating,
    isPrefetching, // 新增：暴露预取状态
    prefetchedShortCode, // 新增：暴露预取结果

    // 设置状态的函数
    setSharedTemplateData,
    setShowShareImportModal,
    setShowShareOptionsModal,
    setShowImportTokenModal,
    setImportTokenValue,

    // 功能函数
    handleManualTokenImport,
    handleImportSharedTemplate,
    handleShareLink,
    doCopyShareLink,
    handleShareToken,
    getShortCodeFromServer,
    shareImportError,
    setShareImportError,
    isImportingShare,
    shortCodeError,
    setShortCodeError,
  };
};
