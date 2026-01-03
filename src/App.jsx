import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Copy, Plus, X, Settings, Check, Edit3, Eye, Trash2, FileText, Pencil, Copy as CopyIcon, Globe, ChevronDown, ChevronUp, ChevronRight, ChevronLeft, GripVertical, Download, Upload, Image as ImageIcon, List, Undo, Redo, Maximize2, RotateCcw, LayoutGrid, Search, ArrowRight, ArrowUpRight, ArrowUpDown, RefreshCw, Sparkles, Sun, Moon, Share2, ExternalLink } from 'lucide-react';
import html2canvas from 'html2canvas';

// ====== 导入数据配置 ======
import { INITIAL_TEMPLATES_CONFIG, TEMPLATE_TAGS, SYSTEM_DATA_VERSION, PUBLIC_SHARE_URL } from './data/templates';
import { INITIAL_BANKS, INITIAL_DEFAULTS, INITIAL_CATEGORIES } from './data/banks';

// ====== 导入常量配置 ======
import { TRANSLATIONS } from './constants/translations';
import { PREMIUM_STYLES, CATEGORY_STYLES, TAG_STYLES, TAG_LABELS } from './constants/styles';
import { MASONRY_STYLES } from './constants/masonryStyles';

// ====== 导入工具函数 ======
import { deepClone, makeUniqueKey, waitForImageLoad, getLocalized, getSystemLanguage, compressTemplate, decompressTemplate, copyToClipboard } from './utils/helpers';
import { mergeTemplatesWithSystem, mergeBanksWithSystem } from './utils/merge';

// ====== 导入自定义 Hooks ======
import { useStickyState, useEditorHistory, useLinkageGroups, useShareFunctions, useTemplateManagement } from './hooks';

// ====== 导入 UI 组件 ======
import { Variable, VisualEditor, PremiumButton, EditorToolbar, Lightbox, TemplatePreview, TemplatesSidebar, BanksSidebar, CategoryManager, InsertVariableModal, AddBankModal, DiscoveryView, MobileSettingsView, SettingsView, Sidebar } from './components';
import { ImagePreviewModal, AnimatedSlogan, MobileAnimatedSlogan } from './components/preview';
import { MobileBottomNav } from './components/mobile';
import { ShareOptionsModal, ImportTokenModal, ShareImportModal } from './components/modals';
import { DataUpdateNotice, AppUpdateNotice } from './components/notifications';


// ====== 以下组件保留在此文件中 ======
// CategorySection, BankGroup, CategoryManager, InsertVariableModal, App

// --- 组件：可折叠的分类区块 (New Component) ---
// ====== 核心组件区 (已提取至独立文件) ======

// Poster View Animated Slogan Constants - 已移至 constants/slogan.js

const App = () => {
  // 当前应用代码版本 (必须与 package.json 和 version.json 一致)
  const APP_VERSION = "0.7.0";

  // 临时功能：瀑布流样式管理
  const [masonryStyleKey, setMasonryStyleKey] = useState('poster');
  const [isStyleMenuOpen, setIsStyleMenuOpen] = useState(false);
  const currentMasonryStyle = MASONRY_STYLES[masonryStyleKey] || MASONRY_STYLES.default;

  // Global State with Persistence
  // bump version keys to强制刷新新增词库与默认值
  const [banks, setBanks] = useStickyState(INITIAL_BANKS, "app_banks_v9");
  const [defaults, setDefaults] = useStickyState(INITIAL_DEFAULTS, "app_defaults_v9");
  const [language, setLanguage] = useStickyState(getSystemLanguage(), "app_language_v1"); // 全局UI语言
  const [templateLanguage, setTemplateLanguage] = useStickyState(getSystemLanguage(), "app_template_language_v1"); // 模板内容语言
  const [categories, setCategories] = useStickyState(INITIAL_CATEGORIES, "app_categories_v1"); // New state
  
  const [templates, setTemplates] = useStickyState(INITIAL_TEMPLATES_CONFIG, "app_templates_v10");
  const [activeTemplateId, setActiveTemplateId] = useStickyState("tpl_default", "app_active_template_id_v4");
  
  const [lastAppliedDataVersion, setLastAppliedDataVersion] = useStickyState("", "app_data_version_v1");
  const [themeMode, setThemeMode] = useStickyState("system", "app_theme_mode_v1");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (themeMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => setIsDarkMode(e.matches);
      setIsDarkMode(mediaQuery.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      setIsDarkMode(themeMode === 'dark');
    }
  }, [themeMode]);

  const [showDataUpdateNotice, setShowDataUpdateNotice] = useState(false);
  const [showAppUpdateNotice, setShowAppUpdateNotice] = useState(false);
  
  // UI State
  const [bankSidebarWidth, setBankSidebarWidth] = useStickyState(420, "app_bank_sidebar_width_v1"); // Default width increased to 420px for 2-column layout
  const [isResizing, setIsResizing] = useState(false);
  
  // 检测是否为移动设备
  const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;
  const [mobileTab, setMobileTab] = useState(isMobileDevice ? "home" : "editor"); // 'home', 'editor', 'settings'
  const [isTemplatesDrawerOpen, setIsTemplatesDrawerOpen] = useState(false);
  const [isBanksDrawerOpen, setIsBanksDrawerOpen] = useState(false);
  const [touchDraggingVar, setTouchDraggingVar] = useState(null); // { key, x, y } 用于移动端模拟拖拽
  const touchDragRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [activePopover, setActivePopover] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false); // New UI state
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false); // New UI state for Insert Picker
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false); // New UI state for Lightbox
  
  // 新增：图片 Base64 缓存，用于解决导出时的跨域和稳定性问题
  const imageBase64Cache = useRef({});

  // Add Bank State
  const [isAddingBank, setIsAddingBank] = useState(false);
  const [newBankLabel, setNewBankLabel] = useState("");
  const [newBankKey, setNewBankKey] = useState("");
  const [newBankCategory, setNewBankCategory] = useState("other");

  // Template Management UI State
  const [editingTemplateNameId, setEditingTemplateNameId] = useState(null);
  const [tempTemplateName, setTempTemplateName] = useState("");
  const [tempTemplateAuthor, setTempTemplateAuthor] = useState("");
  const [zoomedImage, setZoomedImage] = useState(null);
  // 移除这一行，将状态移入独立的 Modal 组件
  // const [modalMousePos, setModalMousePos] = useState({ x: 0, y: 0 });
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [imageUpdateMode, setImageUpdateMode] = useState('replace'); // 'replace' or 'add'
  const [currentImageEditIndex, setCurrentImageEditIndex] = useState(0);
  const [showImageUrlInput, setShowImageUrlInput] = useState(false);
  const [showImageActionMenu, setShowImageActionMenu] = useState(false);
  
  // File System Access API State
  const [storageMode, setStorageMode] = useState(() => {
    return localStorage.getItem('app_storage_mode') || 'browser';
  });
  const [directoryHandle, setDirectoryHandle] = useState(null);
  const [isFileSystemSupported, setIsFileSystemSupported] = useState(false);
  
  // Template Tag Management State
  const [selectedTags, setSelectedTags] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingTemplateTags, setEditingTemplateTags] = useState(null); // {id, tags}
  const [isDiscoveryView, setDiscoveryView] = useState(true); // 首次加载默认显示发现（海报）视图
  
  // 统一的发现页切换处理器
  const handleSetDiscoveryView = React.useCallback((val) => {
    setDiscoveryView(val);
    // 移动端：侧边栏里的“回到发现页”按钮需要同步切回 mobileTab
    if (isMobileDevice && val) {
      setMobileTab('home');
    } else if (isMobileDevice && !val && mobileTab === 'home') {
      setMobileTab('editor');
    }
  }, [isMobileDevice, mobileTab]);
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // 移动端：首页是否展示完全由 mobileTab 控制，避免 isDiscoveryView 残留导致其它 Tab 白屏
  // 桌面端：保持现有 isDiscoveryView 行为（不影响已正常的桌面端）
  const showDiscoveryOverlay = isMobileDevice ? mobileTab === "home" : isDiscoveryView;
  
  // Template Sort State
  const [sortOrder, setSortOrder] = useState("newest"); // newest, oldest, a-z, z-a, random
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [randomSeed, setRandomSeed] = useState(Date.now()); // 用于随机排序的种子
  
  // 趣味设计：灯具摆动状态
  const [lampRotation, setLampRotation] = useState(0);
  const [isLampHovered, setIsLampHovered] = useState(false);
  const [isLampOn, setIsLampOn] = useState(true); // 暗色模式下灯是否开启 (强度控制)
  
  // 当暗夜模式关闭时，重置灯的状态为开启
  useEffect(() => {
    if (!isDarkMode) {
      setIsLampOn(true);
    }
  }, [isDarkMode]);

  const handleLampMouseMove = (e) => {
    if (!isDarkMode) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const mouseX = e.clientX;
    const diffX = mouseX - centerX;
    // 灵敏度提升：由于感应区缩小到 32px，调整系数以保持摆动幅度
    const rotation = Math.max(-12, Math.min(12, -diffX / 1.5));
    setLampRotation(rotation);
    setIsLampHovered(true);
  };
  
  const [updateNoticeType, setUpdateNoticeType] = useState(null); // 'app' | 'data' | null
  
  // 检查系统模版更新
  // 检测数据版本更新 (模板与词库)
  useEffect(() => {
    if (SYSTEM_DATA_VERSION && lastAppliedDataVersion !== SYSTEM_DATA_VERSION) {
      // 检查是否有存储的数据。如果是第一次使用（无数据），直接静默更新版本号
      const hasTemplates = localStorage.getItem("app_templates_v10");
      const hasBanks = localStorage.getItem("app_banks_v9");
      
      if (hasTemplates || hasBanks) {
        setShowDataUpdateNotice(true);
      } else {
        setLastAppliedDataVersion(SYSTEM_DATA_VERSION);
      }
    }
  }, [lastAppliedDataVersion]);

  // 检查应用代码版本更新与数据版本更新
  useEffect(() => {
    const checkUpdates = async () => {
      try {
        const response = await fetch('/version.json?t=' + Date.now());
        if (response.ok) {
          const data = await response.json();
          
          // 检查应用版本更新
          if (data.appVersion && data.appVersion !== APP_VERSION) {
            setUpdateNoticeType('app');
            setShowAppUpdateNotice(true);
            return; // 优先提示程序更新
          }
          
          // 检查数据定义更新 (存在于代码中，但服务器上更新了)
          if (data.dataVersion && data.dataVersion !== SYSTEM_DATA_VERSION) {
            setUpdateNoticeType('data');
            setShowAppUpdateNotice(true);
          }
        }
      } catch (e) {
        // 静默失败
      }
    };
    
    checkUpdates();
    const timer = setInterval(checkUpdates, 5 * 60 * 1000); // 5分钟检查一次
    
    return () => clearInterval(timer);
  }, [lastAppliedDataVersion]); // 移除 lastAppliedAppVersion 依赖

  // 当在编辑模式下切换模板或语言时，同步更新标题和作者的临时状态
  useEffect(() => {
    if (isEditing && activeTemplate) {
      setTempTemplateName(getLocalized(activeTemplate.name, language));
      setTempTemplateAuthor(activeTemplate.author || "");
      setEditingTemplateNameId(activeTemplate.id);
    }
  }, [activeTemplateId, isEditing, language]);

  // Cursor State for Grouping（将由 useLinkageGroups Hook 管理）

  const popoverRef = useRef(null);
  const textareaRef = useRef(null);
  const sidebarRef = useRef(null);
  const posterScrollRef = useRef(null);
  
  // Poster Mode Auto Scroll State
  const [isPosterAutoScrollPaused, setIsPosterAutoScrollPaused] = useState(false);

  // Helper: Translate
  const t = (key, params = {}) => {
    let str = TRANSLATIONS[language][key] || key;
    Object.keys(params).forEach(k => {
        str = str.replace(`{{${k}}}`, params[k]);
    });
    return str;
  };

  const displayTag = React.useCallback((tag) => {
    return TAG_LABELS[language]?.[tag] || tag;
  }, [language]);

  // 确保有一个有效的 activeTemplateId - 自动选择第一个模板
  useEffect(() => {
      if (templates.length > 0) {
          // 检查当前 activeTemplateId 是否有效
          const currentTemplateExists = templates.some(t => t.id === activeTemplateId);
          if (!currentTemplateExists || !activeTemplateId) {
              // 如果当前选中的模板不存在或为空，选择第一个模板
              console.log('[自动选择] 选择第一个模板:', templates[0].id);
              setActiveTemplateId(templates[0].id);
          }
      }
  }, [templates, activeTemplateId]);  // 依赖 templates 和 activeTemplateId

  // 移动端：切换 Tab 时的状态保障
  useEffect(() => {
      // 模版 Tab：强制收起模式 + 列表视图
      if (mobileTab === 'templates') {
          setMasonryStyleKey('list');
      }

      // 编辑 / 词库 Tab：确保有选中的模板
      if ((mobileTab === 'editor' || mobileTab === 'banks') && templates.length > 0 && !activeTemplateId) {
          console.log('[tab切换] 自动选择第一个模板:', templates[0].id);
          setActiveTemplateId(templates[0].id);
      }
  }, [mobileTab, templates, activeTemplateId]);

  // Check File System Access API support and restore directory handle
  useEffect(() => {
      const checkSupport = async () => {
          const supported = 'showDirectoryPicker' in window;
          setIsFileSystemSupported(supported);
          
          // Try to restore directory handle from IndexedDB
          if (supported && storageMode === 'folder') {
              try {
                  const db = await openDB();
                  const handle = await getDirectoryHandle(db);
                  if (handle) {
                      // Verify permission
                      const permission = await handle.queryPermission({ mode: 'readwrite' });
                      if (permission === 'granted') {
                          setDirectoryHandle(handle);
                          // Load data from file system
                          await loadFromFileSystem(handle);
                      } else {
                          // Permission not granted, switch back to browser storage
                          setStorageMode('browser');
                          localStorage.setItem('app_storage_mode', 'browser');
                      }
                  }
              } catch (error) {
                  console.error('恢复文件夹句柄失败:', error);
              }
          }
      };
      
      checkSupport();
  }, []);

  // IndexedDB helper functions for storing directory handle
  const openDB = () => {
      return new Promise((resolve, reject) => {
          const request = indexedDB.open('PromptFillDB', 1);
          request.onerror = () => reject(request.error);
          request.onsuccess = () => resolve(request.result);
          request.onupgradeneeded = (event) => {
              const db = event.target.result;
              if (!db.objectStoreNames.contains('handles')) {
                  db.createObjectStore('handles');
              }
          };
      });
  };

  const saveDirectoryHandle = async (handle) => {
      try {
          const db = await openDB();
          const transaction = db.transaction(['handles'], 'readwrite');
          const store = transaction.objectStore('handles');
          await store.put(handle, 'directory');
      } catch (error) {
          console.error('保存文件夹句柄失败:', error);
      }
  };

  const getDirectoryHandle = async (db) => {
      try {
          const transaction = db.transaction(['handles'], 'readonly');
          const store = transaction.objectStore('handles');
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

  // Fix initial categories if empty (migration safety)
  useEffect(() => {
      if (!categories || Object.keys(categories).length === 0) {
          setCategories(INITIAL_CATEGORIES);
      }
  }, []);

  // Ensure all templates have tags field and sync default templates' tags (migration safety)
  useEffect(() => {
    let needsUpdate = false;
    const updatedTemplates = templates.map(t => {
      // Find if this is a default template
      const defaultTemplate = INITIAL_TEMPLATES_CONFIG.find(dt => dt.id === t.id);
      
      if (defaultTemplate) {
        // Sync tags from default template if it's a built-in one
        if (JSON.stringify(t.tags) !== JSON.stringify(defaultTemplate.tags)) {
          needsUpdate = true;
          return { ...t, tags: defaultTemplate.tags || [] };
        }
      } else if (!t.tags) {
        // User-created template without tags
        needsUpdate = true;
        return { ...t, tags: [] };
      }
      
      return t;
    });
    
    if (needsUpdate) {
      setTemplates(updatedTemplates);
    }
  }, []);


  // ====== Bank 相关函数（需要在 Hook 之前定义）======
  const handleAddOption = React.useCallback((key, newOption) => {
    if (!newOption.trim()) return;
    setBanks(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        options: [...prev[key].options, newOption]
      }
    }));
  }, [setBanks]);

  // Derived State: Current Active Template (必须在 hooks 之前计算)
  const activeTemplate = templates.find(t => t.id === activeTemplateId) || templates[0];

  // 新增：静默预缓存当前模板图片，提升导出体验
  useEffect(() => {
    if (!activeTemplate || !activeTemplate.imageUrl || !activeTemplate.imageUrl.startsWith('http')) return;
    
    const url = activeTemplate.imageUrl;
    if (imageBase64Cache.current[url]) return;

    const preCache = async () => {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const blob = await response.blob();
                const base64 = await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(blob);
                });
                imageBase64Cache.current[url] = base64;
            }
        } catch (e) {
            // 静默失败，导出时会尝试代理
        }
    };
    
    // 稍微延迟，避免抢占初始渲染资源
    const timer = setTimeout(preCache, 2000);
    return () => clearTimeout(timer);
  }, [activeTemplate?.imageUrl]);

  const handleDeleteOption = React.useCallback((key, optionToDelete) => {
    setBanks(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        options: prev[key].options.filter(opt => opt !== optionToDelete)
      }
    }));
  }, [setBanks]);

  // ====== 使用自定义 Hooks ======

  // 1. 编辑器历史记录 Hook
  const {
    historyPast,
    historyFuture,
    updateActiveTemplateContent,
    handleUndo,
    handleRedo,
    resetHistory,
    canUndo,
    canRedo,
  } = useEditorHistory(activeTemplateId, activeTemplate, setTemplates);

  // 2. 联动组管理 Hook
  const linkageGroups = useLinkageGroups(
    activeTemplateId,
    templates,
    setTemplates,
    banks,
    handleAddOption
  );

  const {
    parseVariableName,
    cursorInVariable,
    setCursorInVariable,
    currentVariableName,
    setCurrentVariableName,
    currentGroupId,
    setCurrentGroupId,
    findLinkedVariables,
    updateActiveTemplateSelection,
    handleSelect: handleSelectFromHook,
    handleAddCustomAndSelect: handleAddCustomAndSelectFromHook,
  } = linkageGroups;

  // 3. 分享功能 Hook
  const {
    sharedTemplateData,
    showShareImportModal,
    showShareOptionsModal,
    showImportTokenModal,
    importTokenValue,
    shareUrlMemo,
    isGenerating,
    setSharedTemplateData,
    setShowShareImportModal,
    setShowShareOptionsModal,
    setShowImportTokenModal,
    setImportTokenValue,
    handleManualTokenImport,
    handleImportSharedTemplate,
    handleShareLink,
    doCopyShareLink,
    handleShareToken,
    getShortCodeFromServer,
  } = useShareFunctions(
    activeTemplate,
    setTemplates,
    setActiveTemplateId,
    setDiscoveryView,
    isMobileDevice,
    setMobileTab,
    language,
    t
  );

  // Template Management
  const templateManagement = useTemplateManagement(
    templates,
    setTemplates,
    activeTemplateId,
    activeTemplate,
    setActiveTemplateId,
    setIsEditing,
    setEditingTemplateNameId,
    setTempTemplateName,
    setTempTemplateAuthor,
    language,
    isMobileDevice,
    setMobileTab,
    INITIAL_TEMPLATES_CONFIG,
    t
  );
  const {
    handleAddTemplate,
    handleDuplicateTemplate,
    handleDeleteTemplate,
    handleResetTemplate,
    startRenamingTemplate,
    handleStartEditing,
    handleStopEditing
  } = templateManagement;

  // 包装 saveTemplateName，传入状态值
  const saveTemplateName = () => {
    if (editingTemplateNameId && tempTemplateName && tempTemplateName.trim()) {
      templateManagement.saveTemplateName(editingTemplateNameId, tempTemplateName, tempTemplateAuthor);
    }
  };

  // 包装 handleSelect，使其兼容原有调用方式
  const handleSelect = React.useCallback((key, index, value) => {
    handleSelectFromHook(key, index, value, setActivePopover);
  }, [handleSelectFromHook]);

  // 包装 handleAddCustomAndSelect，使其兼容原有调用方式
  const handleAddCustomAndSelect = React.useCallback((key, index, newValue) => {
    handleAddCustomAndSelectFromHook(key, index, newValue, setActivePopover);
  }, [handleAddCustomAndSelectFromHook]);

  // 分享相关函数已移至 useShareFunctions Hook

  // --- Effects ---

  // Reset history when template changes
  useEffect(() => {
    resetHistory();
  }, [activeTemplateId, resetHistory]);

  // 检测光标是否在变量内，并提取当前变量信息
  const detectCursorInVariable = React.useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea || !isEditing) {
      setCursorInVariable(false);
      setCurrentVariableName(null);
      setCurrentGroupId(null);
      return;
    }

    const text = textarea.value;
    const cursorPos = textarea.selectionStart;

    // 向前查找最近的 {{
    let startPos = cursorPos;
    while (startPos > 0 && text.substring(startPos - 2, startPos) !== '{{') {
      startPos--;
    }

    // 向后查找最近的 }}
    let endPos = cursorPos;
    while (endPos < text.length && text.substring(endPos, endPos + 2) !== '}}') {
      endPos++;
    }

    // 检查光标是否在 {{...}} 之间
    if (startPos >= 0 && endPos < text.length &&
        text.substring(startPos - 2, startPos) === '{{' &&
        text.substring(endPos, endPos + 2) === '}}') {
      // 光标在变量内
      const variableName = text.substring(startPos, endPos).trim();
      const parsed = parseVariableName(variableName);

      setCursorInVariable(true);
      setCurrentVariableName(variableName);
      setCurrentGroupId(parsed.groupId);
    } else {
      setCursorInVariable(false);
      setCurrentVariableName(null);
      setCurrentGroupId(null);
    }
  }, [isEditing, parseVariableName, setCursorInVariable, setCurrentVariableName, setCurrentGroupId]);

  // 监听光标位置变化
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea || !isEditing) return;

    const handleSelectionChange = () => {
      detectCursorInVariable();
    };

    textarea.addEventListener('keyup', handleSelectionChange);
    textarea.addEventListener('click', handleSelectionChange);
    textarea.addEventListener('select', handleSelectionChange);

    return () => {
      textarea.removeEventListener('keyup', handleSelectionChange);
      textarea.removeEventListener('click', handleSelectionChange);
      textarea.removeEventListener('select', handleSelectionChange);
    };
  }, [isEditing, detectCursorInVariable]);

  // 设置分组：为当前变量添加或修改分组后缀
  const handleSetGroup = React.useCallback((groupNum) => {
    if (!cursorInVariable || !currentVariableName) return;

    const textarea = textareaRef.current;
    if (!textarea) return;

    const text = textarea.value;
    const cursorPos = textarea.selectionStart;

    // 向前查找最近的 {{
    let startPos = cursorPos;
    while (startPos > 0 && text.substring(startPos - 2, startPos) !== '{{') {
      startPos--;
    }

    // 向后查找最近的 }}
    let endPos = cursorPos;
    while (endPos < text.length && text.substring(endPos, endPos + 2) !== '}}') {
      endPos++;
    }

    if (startPos >= 0 && endPos < text.length) {
      const variableName = text.substring(startPos, endPos).trim();
      const parsed = parseVariableName(variableName);
      const baseKey = parsed.baseKey;

      // 构建新的变量名：baseKey_groupNum
      const newVariableName = `${baseKey}_${groupNum}`;

      // 替换文本：只替换 {{ 和 }} 之间的内容
      const before = text.substring(0, startPos);
      const after = text.substring(endPos);
      const newText = `${before}${newVariableName}${after}`;

      // 更新内容
      const currentContent = activeTemplate.content;
      const isMultilingual = typeof currentContent === 'object';
      if (isMultilingual) {
        updateActiveTemplateContent({
          ...currentContent,
          [templateLanguage]: newText
        }, true);
      } else {
        updateActiveTemplateContent(newText, true);
      }

      // 恢复光标位置（调整偏移）
      setTimeout(() => {
        const offset = newVariableName.length - variableName.length;
        const newCursorPos = cursorPos + offset;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
        textarea.focus();
        detectCursorInVariable();
      }, 0);
    }
  }, [cursorInVariable, currentVariableName, parseVariableName, activeTemplate.content, templateLanguage, updateActiveTemplateContent, detectCursorInVariable]);

  // 移除分组：移除当前变量的分组后缀
  const handleRemoveGroup = React.useCallback(() => {
    if (!cursorInVariable || !currentVariableName || !currentGroupId) return;

    const textarea = textareaRef.current;
    if (!textarea) return;

    const text = textarea.value;
    const cursorPos = textarea.selectionStart;

    // 向前查找最近的 {{
    let startPos = cursorPos;
    while (startPos > 0 && text.substring(startPos - 2, startPos) !== '{{') {
      startPos--;
    }

    // 向后查找最近的 }}
    let endPos = cursorPos;
    while (endPos < text.length && text.substring(endPos, endPos + 2) !== '}}') {
      endPos++;
    }

    if (startPos >= 0 && endPos < text.length) {
      const variableName = text.substring(startPos, endPos).trim();
      const parsed = parseVariableName(variableName);
      const baseKey = parsed.baseKey;

      // 新的变量名：只保留 baseKey，移除后缀
      const newVariableName = baseKey;

      // 替换文本：只替换 {{ 和 }} 之间的内容
      const before = text.substring(0, startPos);
      const after = text.substring(endPos);
      const newText = `${before}${newVariableName}${after}`;

      // 更新内容
      const currentContent = activeTemplate.content;
      const isMultilingual = typeof currentContent === 'object';
      if (isMultilingual) {
        updateActiveTemplateContent({
          ...currentContent,
          [templateLanguage]: newText
        }, true);
      } else {
        updateActiveTemplateContent(newText, true);
      }

      // 恢复光标位置（调整偏移）
      setTimeout(() => {
        const offset = newVariableName.length - variableName.length;
        const newCursorPos = cursorPos + offset;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
        textarea.focus();
        detectCursorInVariable();
      }, 0);
    }
  }, [cursorInVariable, currentVariableName, currentGroupId, parseVariableName, activeTemplate.content, templateLanguage, updateActiveTemplateContent, detectCursorInVariable]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setActivePopover(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Poster Mode Auto Scroll Animation with Ping-Pong Effect
  // Poster Mode Auto Scroll - Optimized with requestAnimationFrame
  useEffect(() => {
    if (masonryStyleKey !== 'poster' || !posterScrollRef.current || isPosterAutoScrollPaused || !isDiscoveryView) {
      return;
    }

    const scrollContainer = posterScrollRef.current;
    let scrollDirection = 1; // 1 = down, -1 = up
    const scrollSpeed = 0.5; // 每次滚动的像素数
    let animationFrameId;

    const performScroll = () => {
      if (!scrollContainer) return;

      const currentScroll = scrollContainer.scrollTop;
      const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;

      // 到达底部，改变方向向上
      if (scrollDirection === 1 && currentScroll >= maxScroll - 1) {
        scrollDirection = -1;
      }
      // 到达顶部，改变方向向下
      else if (scrollDirection === -1 && currentScroll <= 1) {
        scrollDirection = 1;
      }

      // 执行滚动
      scrollContainer.scrollTop += scrollSpeed * scrollDirection;
      animationFrameId = requestAnimationFrame(performScroll);
    };

    animationFrameId = requestAnimationFrame(performScroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [masonryStyleKey, isPosterAutoScrollPaused, isDiscoveryView]);

  // Resizing Logic
  useEffect(() => {
      const handleMouseMove = (e) => {
          if (!isResizing) return;
          // New Layout: Bank Sidebar is on the Right.
          // Width = Window Width - Mouse X
          const newWidth = window.innerWidth - e.clientX;
          
          if (newWidth > 280 && newWidth < 800) { // Min/Max constraints
              setBankSidebarWidth(newWidth);
          }
      };

      const handleMouseUp = () => {
          setIsResizing(false);
          document.body.style.cursor = 'default';
          document.body.style.userSelect = 'auto';
      };

      if (isResizing) {
          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
          document.body.style.cursor = 'col-resize';
          document.body.style.userSelect = 'none'; // Prevent text selection while resizing
      }

      return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
      };
  }, [isResizing, setBankSidebarWidth]);

  const startResizing = () => {
      setIsResizing(true);
  };

  // --- Template Actions ---

  // 刷新系统模板与词库，保留用户数据
  const handleRefreshSystemData = React.useCallback(() => {
    const backupSuffix = t('refreshed_backup_suffix') || '';
    
    // 迁移旧格式的 selections：将字符串值转换为对象格式
    const migratedTemplates = templates.map(tpl => {
      const newSelections = {};
      Object.entries(tpl.selections || {}).forEach(([key, value]) => {
        if (typeof value === 'string' && banks[key.split('-')[0]]) {
          // 查找对应的词库选项
          const bankKey = key.split('-')[0];
          const bank = banks[bankKey];
          if (bank && bank.options) {
            const matchedOption = bank.options.find(opt => 
              (typeof opt === 'string' && opt === value) ||
              (typeof opt === 'object' && (opt.cn === value || opt.en === value))
            );
            newSelections[key] = matchedOption || value;
          } else {
            newSelections[key] = value;
          }
        } else {
          newSelections[key] = value;
        }
      });
      return { ...tpl, selections: newSelections };
    });
    
    const templateResult = mergeTemplatesWithSystem(migratedTemplates, { backupSuffix });
    const bankResult = mergeBanksWithSystem(banks, defaults, { backupSuffix });

    setTemplates(templateResult.templates);
    setBanks(bankResult.banks);
    setDefaults(bankResult.defaults);
    setActiveTemplateId(prev => templateResult.templates.some(t => t.id === prev) ? prev : "tpl_default");
    
    // 更新版本号，避免再次提示更新
    setLastAppliedDataVersion(SYSTEM_DATA_VERSION);

    const notes = [...templateResult.notes, ...bankResult.notes];
    if (notes.length > 0) {
      alert(`${t('refresh_done_with_conflicts')}\n- ${notes.join('\n- ')}`);
    } else {
      alert(t('refresh_done_no_conflict'));
    }
  }, [banks, defaults, templates, t]);

  const handleAutoUpdate = () => {
    handleRefreshSystemData();
    setLastAppliedDataVersion(SYSTEM_DATA_VERSION);
    setShowDataUpdateNotice(false);
  };

  // Template Tags Management
  const handleUpdateTemplateTags = (templateId, newTags) => {
    setTemplates(prev => prev.map(t => 
      t.id === templateId ? { ...t, tags: newTags } : t
    ));
  };

  const toggleTag = (tag) => {
    setSelectedTags(prevTag => prevTag === tag ? "" : tag);
  };

  // Base filtered templates (by search and language)
  const baseFilteredTemplates = React.useMemo(() => {
    return templates.filter(t => {
      // Search filter
      const templateName = getLocalized(t.name, language);
      const matchesSearch = !searchQuery || 
        templateName.toLowerCase().includes(searchQuery.toLowerCase());
      
      // 语言过滤：如果模板指定了语言，且不包含当前语言，则隐藏
      const templateLangs = t.language ? (Array.isArray(t.language) ? t.language : [t.language]) : ['cn', 'en'];
      const matchesLanguage = templateLangs.includes(language);
      
      return matchesSearch && matchesLanguage;
    });
  }, [templates, searchQuery, language]);

  // Discovery View templates (ignore tags, but respect search, language and sort)
  const discoveryTemplates = React.useMemo(() => {
    return [...baseFilteredTemplates].sort((a, b) => {
      const nameA = getLocalized(a.name, language);
      const nameB = getLocalized(b.name, language);
      switch(sortOrder) {
        case 'newest':
          return templates.indexOf(b) - templates.indexOf(a);
        case 'oldest':
          return templates.indexOf(a) - templates.indexOf(b);
        case 'a-z':
          return nameA.localeCompare(nameB, language === 'cn' ? 'zh-CN' : 'en');
        case 'z-a':
          return nameB.localeCompare(nameA, language === 'cn' ? 'zh-CN' : 'en');
        case 'random':
          const hashA = (a.id + randomSeed).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
          const hashB = (b.id + randomSeed).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
          return hashA - hashB;
        default:
          return 0;
      }
    });
  }, [baseFilteredTemplates, sortOrder, randomSeed, language, templates]);

  // Filter templates based on tags for sidebar
  const filteredTemplates = React.useMemo(() => {
    return discoveryTemplates.filter(t => {
      // Tag filter
      const matchesTags = selectedTags === "" || 
        (t.tags && t.tags.includes(selectedTags));
      return matchesTags;
    });
  }, [discoveryTemplates, selectedTags]);

  const fileInputRef = useRef(null);
  
  const handleUploadImage = (e) => {
      try {
          const file = e.target.files?.[0];
          if (!file) return;
          
          // 验证文件类型
          if (!file.type.startsWith('image/')) {
              if (storageMode === 'browser') {
                  alert('请选择图片文件');
              }
              return;
          }
          
          // 移除文件大小限制，让用户自由上传
          // 如果超出localStorage限制，会在useStickyState中捕获并提示
          
          const reader = new FileReader();
          
          reader.onloadend = () => {
              try {
                  setTemplates(prev => prev.map(t => {
                      if (t.id !== activeTemplateId) return t;
                      
                      if (imageUpdateMode === 'add') {
                        const newUrls = [...(t.imageUrls || [t.imageUrl]), reader.result];
                        return { ...t, imageUrls: newUrls, imageUrl: newUrls[0] };
                      } else {
                        // Replace current index
                        if (t.imageUrls && Array.isArray(t.imageUrls)) {
                          const newUrls = [...t.imageUrls];
                          newUrls[currentImageEditIndex] = reader.result;
                          return { ...t, imageUrls: newUrls, imageUrl: newUrls[0] };
                        }
                        return { ...t, imageUrl: reader.result };
                      }
                  }));
              } catch (error) {
                  console.error('图片上传失败:', error);
                  if (error.name === 'QuotaExceededError') {
                      console.error('存储空间不足！图片过大。建议使用图片链接方式或切换到本地文件夹模式。');
                  } else {
                      alert('图片上传失败，请重试');
                  }
              }
          };
          
          reader.onerror = () => {
              console.error('文件读取失败');
              if (storageMode === 'browser') {
                  alert('文件读取失败，请重试');
              }
          };
          
          reader.readAsDataURL(file);
      } catch (error) {
          console.error('上传图片出错:', error);
          if (storageMode === 'browser') {
              alert('上传图片出错，请重试');
          }
      } finally {
          // 重置input，允许重复选择同一文件
          if (e.target) {
              e.target.value = '';
          }
      }
  };

  const handleResetImage = () => {
      const defaultUrl = INITIAL_TEMPLATES_CONFIG.find(t => t.id === activeTemplateId)?.imageUrl;
      const defaultUrls = INITIAL_TEMPLATES_CONFIG.find(t => t.id === activeTemplateId)?.imageUrls;
      
      setTemplates(prev => prev.map(t => 
          t.id === activeTemplateId ? { ...t, imageUrl: defaultUrl, imageUrls: defaultUrls } : t
      ));
  };

  const handleDeleteImage = () => {
      setTemplates(prev => prev.map(t => {
          if (t.id !== activeTemplateId) return t;
          
          if (t.imageUrls && Array.isArray(t.imageUrls) && t.imageUrls.length > 1) {
              const newUrls = t.imageUrls.filter((_, idx) => idx !== currentImageEditIndex);
              return { 
                  ...t, 
                  imageUrls: newUrls, 
                  imageUrl: newUrls[0] // 默认切回第一张
              };
          } else {
              // 只有一张图时，清除图片
              return { ...t, imageUrl: "", imageUrls: [] };
          }
      }));
      setCurrentImageEditIndex(0);
  };

  const handleSetImageUrl = () => {
      if (!imageUrlInput.trim()) return;
      
      setTemplates(prev => prev.map(t => {
          if (t.id !== activeTemplateId) return t;
          
          if (imageUpdateMode === 'add') {
            const newUrls = [...(t.imageUrls || [t.imageUrl]), imageUrlInput];
            return { ...t, imageUrls: newUrls, imageUrl: newUrls[0] };
          } else {
            // Replace current index
            if (t.imageUrls && Array.isArray(t.imageUrls)) {
              const newUrls = [...t.imageUrls];
              newUrls[currentImageEditIndex] = imageUrlInput;
              return { ...t, imageUrls: newUrls, imageUrl: newUrls[0] };
            }
            return { ...t, imageUrl: imageUrlInput };
          }
      }));
      setImageUrlInput("");
      setShowImageUrlInput(false);
  };

  // --- 导出/导入功能 ---
  const handleExportTemplate = async (template) => {
      try {
          const templateName = getLocalized(template.name, language);
          const dataStr = JSON.stringify(template, null, 2);
          const dataBlob = new Blob([dataStr], { type: 'application/json' });
          const filename = `${templateName.replace(/\s+/g, '_')}_template.json`;
          
          // 检测是否为移动设备（尤其是iOS）
          const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
          const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
          
          if (isMobileDevice && navigator.share) {
              // 移动端：使用 Web Share API
              try {
                  const file = new File([dataBlob], filename, { type: 'application/json' });
                  if (navigator.canShare && navigator.canShare({ files: [file] })) {
                      await navigator.share({
                          files: [file],
                          title: templateName,
                          text: '导出的提示词模板'
                      });
                      showToastMessage('✅ 模板已分享/保存');
                      return;
                  }
              } catch (shareError) {
                  console.log('Web Share API 失败，使用降级方案', shareError);
              }
          }
          
          // 桌面端或降级方案：使用传统下载方式
          const url = URL.createObjectURL(dataBlob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          
          // iOS Safari 特殊处理
          if (isIOS) {
              link.target = '_blank';
          }
          
          document.body.appendChild(link);
          link.click();
          
          // 延迟清理，确保iOS有足够时间处理
          setTimeout(() => {
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
          }, 100);
          
          showToastMessage('✅ 模板已导出');
      } catch (error) {
          console.error('导出失败:', error);
          alert('导出失败，请重试');
      }
  };

  const handleExportAllTemplates = async () => {
      try {
          const exportData = {
              templates,
              banks,
              categories,
              version: 'v9',
              exportDate: new Date().toISOString()
          };
          const dataStr = JSON.stringify(exportData, null, 2);
          const dataBlob = new Blob([dataStr], { type: 'application/json' });
          const filename = `prompt_fill_backup_${Date.now()}.json`;
          
          // 检测是否为移动设备（尤其是iOS）
          const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
          const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
          
          if (isMobileDevice && navigator.share) {
              // 移动端：使用 Web Share API
              try {
                  const file = new File([dataBlob], filename, { type: 'application/json' });
                  if (navigator.canShare && navigator.canShare({ files: [file] })) {
                      await navigator.share({
                          files: [file],
                          title: '提示词填空器备份',
                          text: '所有模板和词库的完整备份'
                      });
                      showToastMessage('✅ 备份已分享/保存');
                      return;
                  }
              } catch (shareError) {
                  console.log('Web Share API 失败，使用降级方案', shareError);
              }
          }
          
          // 桌面端或降级方案：使用传统下载方式
          const url = URL.createObjectURL(dataBlob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          
          // iOS Safari 特殊处理
          if (isIOS) {
              link.target = '_blank';
          }
          
          document.body.appendChild(link);
          link.click();
          
          // 延迟清理，确保iOS有足够时间处理
          setTimeout(() => {
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
          }, 100);
          
          showToastMessage('✅ 备份已导出');
      } catch (error) {
          console.error('导出失败:', error);
          alert('导出失败，请重试');
      }
  };

  const handleImportTemplate = (event) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
          try {
              const data = JSON.parse(e.target.result);
              
              // 检查是单个模板还是完整备份
              if (data.templates && Array.isArray(data.templates)) {
                  // 完整备份
                  if (window.confirm('检测到完整备份文件。是否要覆盖当前所有数据？')) {
                      setTemplates(data.templates);
                      if (data.banks) setBanks(data.banks);
                      if (data.categories) setCategories(data.categories);
                      alert('导入成功！');
                  }
              } else if (data.id && data.name) {
                  // 单个模板
                  const newId = `tpl_${Date.now()}`;
                  const newTemplate = { ...data, id: newId };
                  setTemplates(prev => [...prev, newTemplate]);
                  setActiveTemplateId(newId);
                  alert('模板导入成功！');
              } else {
                  alert('文件格式不正确');
              }
          } catch (error) {
              console.error('导入失败:', error);
              alert('导入失败，请检查文件格式');
          }
      };
      reader.readAsText(file);
      
      // 重置input
      event.target.value = '';
  };

  // --- File System Access API Functions ---
  const handleSelectDirectory = async () => {
      try {
          if (!isFileSystemSupported) {
              alert(t('browser_not_supported'));
              return;
          }

          const handle = await window.showDirectoryPicker({
              mode: 'readwrite',
              startIn: 'documents'
          });
          
          setDirectoryHandle(handle);
          setStorageMode('folder');
          localStorage.setItem('app_storage_mode', 'folder');
          
          // Save handle to IndexedDB for future use
          await saveDirectoryHandle(handle);
          
          // 尝试保存当前数据到文件夹
          await saveToFileSystem(handle);
          alert(t('auto_save_enabled'));
      } catch (error) {
          console.error('选择文件夹失败:', error);
          if (error.name !== 'AbortError') {
              alert(t('folder_access_denied'));
          }
      }
  };

  const saveToFileSystem = async (handle) => {
      if (!handle) return;
      
      try {
          const data = {
              templates,
              banks,
              categories,
              defaults,
              version: 'v9',
              lastSaved: new Date().toISOString()
          };
          
          const fileHandle = await handle.getFileHandle('prompt_fill_data.json', { create: true });
          const writable = await fileHandle.createWritable();
          await writable.write(JSON.stringify(data, null, 2));
          await writable.close();
          
          console.log('数据已保存到本地文件夹');
      } catch (error) {
          console.error('保存到文件系统失败:', error);
      }
  };

  const loadFromFileSystem = async (handle) => {
      if (!handle) return;
      
      try {
          const fileHandle = await handle.getFileHandle('prompt_fill_data.json');
          const file = await fileHandle.getFile();
          const text = await file.text();
          const data = JSON.parse(text);
          
          if (data.templates) setTemplates(data.templates);
          if (data.banks) setBanks(data.banks);
          if (data.categories) setCategories(data.categories);
          if (data.defaults) setDefaults(data.defaults);
          
          console.log('从本地文件夹加载数据成功');
      } catch (error) {
          console.error('从文件系统读取失败:', error);
      }
  };

  // Auto-save to file system when data changes
  useEffect(() => {
      if (storageMode === 'folder' && directoryHandle) {
          const timeoutId = setTimeout(() => {
              saveToFileSystem(directoryHandle);
          }, 1000); // Debounce 1 second
          
          return () => clearTimeout(timeoutId);
      }
  }, [templates, banks, categories, defaults, storageMode, directoryHandle]);

  // 存储空间管理
  const getStorageSize = () => {
      try {
          let total = 0;
          for (let key in localStorage) {
              if (localStorage.hasOwnProperty(key)) {
                  total += localStorage[key].length + key.length;
              }
          }
          return (total / 1024).toFixed(2); // KB
      } catch (error) {
          return '0';
      }
  };

  function handleClearAllData() {
      if (window.confirm(t('confirm_clear_all'))) {
          try {
              // 只清除应用相关的数据
              const keysToRemove = Object.keys(localStorage).filter(key => 
                  key.startsWith('app_')
              );
              keysToRemove.forEach(key => localStorage.removeItem(key));
              
              // 刷新页面
              window.location.reload();
          } catch (error) {
              console.error('清除数据失败:', error);
              alert('清除数据失败');
          }
      }
  }

  function handleCompleteBackup() {
    handleExportAllTemplates();
  }

  function handleImportAllData(event) {
    handleImportTemplate(event);
  }

  function handleResetSystemData() {
    if (window.confirm('确定要重置系统数据吗？这将清除所有本地修改并重新从系统加载初始模板。')) {
        localStorage.removeItem('app_templates');
        localStorage.removeItem('app_banks');
        localStorage.removeItem('app_categories');
        window.location.reload();
    }
  }
  
  const handleSwitchToLocalStorage = async () => {
      setStorageMode('browser');
      setDirectoryHandle(null);
      localStorage.setItem('app_storage_mode', 'browser');
      
      // Clear directory handle from IndexedDB
      try {
          const db = await openDB();
          const transaction = db.transaction(['handles'], 'readwrite');
          const store = transaction.objectStore('handles');
          await store.delete('directory');
      } catch (error) {
          console.error('清除文件夹句柄失败:', error);
      }
  };
  
  const handleManualLoadFromFolder = async () => {
      if (directoryHandle) {
          try {
              await loadFromFileSystem(directoryHandle);
              alert('从文件夹加载成功！');
          } catch (error) {
              alert('从文件夹加载失败，请检查文件是否存在');
          }
      }
  };

  // 以下函数已移至自定义 Hooks:
  // - updateActiveTemplateContent -> useEditorHistory
  // - handleUndo, handleRedo -> useEditorHistory
  // - parseVariableName -> useLinkageGroups
  // - detectCursorInVariable -> 需要在组件中重新实现（使用 Hook 返回的状态设置器）
  // - handleSetGroup, handleRemoveGroup -> 需要在组件中重新实现
  // - findLinkedVariables -> useLinkageGroups
  // - updateActiveTemplateSelection -> useLinkageGroups
  // - handleSelect -> useLinkageGroups
  // - handleAddCustomAndSelect -> useLinkageGroups

  // handleAddOption 和 handleDeleteOption 已移至 Hook 调用之前（第 943 行）

  const handleStartAddBank = (catId) => {
    setNewBankCategory(catId);
    setIsAddingBank(true);
  };

  const handleAddBank = () => {
    if (!newBankLabel.trim() || !newBankKey.trim()) return;
    const safeKey = newBankKey.trim().replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase();
    
    if (banks[safeKey]) {
      alert(t('alert_id_exists'));
      return;
    }

    setBanks(prev => ({
      ...prev,
      [safeKey]: {
        label: newBankLabel,
        category: newBankCategory,
        options: []
      }
    }));
    setDefaults(prev => ({ ...prev, [safeKey]: "" }));
    setNewBankLabel("");
    setNewBankKey("");
    setNewBankCategory("other");
    setIsAddingBank(false);
  };

  const handleDeleteBank = (key) => {
    const bankLabel = getLocalized(banks[key].label, language);
    if (window.confirm(t('confirm_delete_bank', { name: bankLabel }))) {
      const newBanks = { ...banks };
      delete newBanks[key];
      setBanks(newBanks);
    }
  };

  const handleUpdateBankCategory = (key, newCategory) => {
      setBanks(prev => ({
          ...prev,
          [key]: {
              ...prev[key],
              category: newCategory
          }
      }));
  };

  // --- Editor Actions ---

  const insertVariableToTemplate = (key, dropPoint = null) => {
    const textToInsert = ` {{${key}}} `;
    const currentContent = activeTemplate.content || "";
    const isMultilingual = typeof currentContent === 'object';
    const text = isMultilingual ? (currentContent[templateLanguage] || "") : currentContent;

    if (!isEditing) {
      handleStartEditing();
      setTimeout(() => {
        const updatedText = text + textToInsert;
        if (isMultilingual) {
          updateActiveTemplateContent({ ...currentContent, [templateLanguage]: updatedText }, true);
        } else {
          updateActiveTemplateContent(updatedText, true);
        }
        if(textareaRef.current) textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
      }, 50);
      return;
    };

    const textarea = textareaRef.current;
    if (!textarea) return;

    let start = textarea.selectionStart;
    let end = textarea.selectionEnd;

    // 移动端模拟拖拽的特殊处理：计算落点位置
    if (dropPoint) {
      const { x, y } = dropPoint;
      let range;
      if (document.caretRangeFromPoint) {
        range = document.caretRangeFromPoint(x, y);
      } else if (document.caretPositionFromPoint) {
        const pos = document.caretPositionFromPoint(x, y);
        if (pos) {
          range = document.createRange();
          range.setStart(pos.offsetNode, pos.offset);
          range.collapse(true);
        }
      }
      
      if (range && range.startContainer) {
        // 对于 textarea，我们需要手动计算偏移，这很困难
        // 简化方案：如果在 textarea 区域内释放，则插入到最后或保持当前光标
        // 但如果是在编辑器内，我们通常已经聚焦了
      }
    }

    const safeText = String(text);
    const before = safeText.substring(0, start);
    const after = safeText.substring(end, safeText.length);
    const updatedText = `${before}${textToInsert}${after}`;
    
    if (isMultilingual) {
      updateActiveTemplateContent({ ...currentContent, [templateLanguage]: updatedText }, true);
    } else {
      updateActiveTemplateContent(updatedText, true);
    }
    
    setTimeout(() => {
      textarea.focus();
      const newPos = start + textToInsert.length;
      textarea.setSelectionRange(newPos, newPos);
    }, 0);
  };

  const handleCopy = () => {
    // 获取当前模板语言的内容
    let finalString = getLocalized(activeTemplate.content, templateLanguage);
    const counters = {};

    finalString = finalString.replace(/{{(.*?)}}/g, (match, key) => {
        const fullKey = key.trim();
        const parsed = parseVariableName(fullKey);
        const baseKey = parsed.baseKey;
        
        // 使用完整的 fullKey 作为计数器的 key
        const idx = counters[fullKey] || 0;
        counters[fullKey] = idx + 1;

        const uniqueKey = `${fullKey}-${idx}`;
        // Prioritize selection, then default (use baseKey for defaults), and get localized value
        const value = activeTemplate.selections[uniqueKey] || defaults[baseKey];
        return getLocalized(value, templateLanguage) || match;
    });

    const cleanText = finalString
        .replace(/###\s/g, '')
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\n\s*\n/g, '\n\n');

    copyToClipboard(cleanText).then((success) => {
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    });
  };

  const handleExportImage = async () => {
    const element = document.getElementById('preview-card');
    if (!element) return;

    setIsExporting(true);
    
    // --- 新增：尝试获取短链接并预处理二维码 ---
    let displayUrl = window.location.origin + window.location.pathname;
    // 确保 displayUrl 不会以双斜杠结尾，且至少有一个基础值
    if (!displayUrl || displayUrl === 'null' || displayUrl === 'undefined') {
        displayUrl = "https://www.aipromptfill.com";
    }
    
    let qrContentUrl = "https://www.aipromptfill.com"; // 默认官网地址
    let qrBase64 = "/QRCode.png";
    
    try {
        const compressed = compressTemplate(activeTemplate);
        // 尝试向服务器换取短码
        const shortCode = await getShortCodeFromServer(compressed);
        const base = PUBLIC_SHARE_URL || displayUrl;
        const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
        
        if (shortCode) {
            // 成功获取短码，二维码和文字都指向短链接
            const shortUrl = `${normalizedBase}/#/share?share=${shortCode}`;
            displayUrl = shortUrl;
            qrContentUrl = shortUrl;
        } else if (compressed) {
            // 未获取到短码（长链接情况），文字显示长链接，但二维码指向官网
            displayUrl = `${normalizedBase}/#/share?share=${compressed}`;
            qrContentUrl = "https://www.aipromptfill.com";
        }
        
        // 生成二维码 Base64 (避免跨域问题)
        const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=10&data=${encodeURIComponent(qrContentUrl)}`;
        const qrResponse = await fetch(qrApiUrl);
        if (qrResponse.ok) {
            const qrBlob = await qrResponse.blob();
            qrBase64 = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(qrBlob);
            });
        }
    } catch (e) {
        console.warn("获取短链接或二维码失败:", e);
    }
    
    // 如果是极长的链接（超过 150 字符），进行截断显示，防止撑破布局
    // 但在导出 DOM 中我们要确保它能换行
    const displayUrlText = displayUrl.length > 150 
        ? displayUrl.substring(0, 140) + '...' 
        : displayUrl;
    
    // --- 关键修复：预处理图片为 Base64 ---
    // 这能彻底解决 html2canvas 的跨域 (CORS) 和图片加载不全问题
    const templateDefault = INITIAL_TEMPLATES_CONFIG.find(t => t.id === activeTemplateId);
    const originalImageSrc = activeTemplate.imageUrl || templateDefault?.imageUrl || "";
    let tempBase64Src = imageBase64Cache.current[originalImageSrc] || null;
    const imgElement = element.querySelector('img');

    if (imgElement && originalImageSrc) {
        // 如果当前 img 没有正确的 src，先补上默认 src
        if (!imgElement.src || imgElement.src.trim() === "" || imgElement.src.includes("data:image") === false) {
          imgElement.src = originalImageSrc;
        }
    }

    // 如果没缓存，尝试获取
    if (!tempBase64Src && imgElement && originalImageSrc && originalImageSrc.startsWith('http')) {
        const fetchWithRetry = async (url) => {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Fetch failed');
                const blob = await response.blob();
                return await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(blob);
                });
            } catch (e) {
                return null;
            }
        };

        try {
            // 1. 尝试直接获取
            tempBase64Src = await fetchWithRetry(originalImageSrc);
            
            // 2. 如果失败，尝试使用 weserv.nl 作为 CORS 代理
            if (!tempBase64Src) {
                console.log("直接获取图片失败，尝试使用代理...");
                const proxyUrl = `https://images.weserv.nl/?url=${encodeURIComponent(originalImageSrc)}`;
                tempBase64Src = await fetchWithRetry(proxyUrl);
            }

            if (tempBase64Src) {
                // 存入缓存
                imageBase64Cache.current[originalImageSrc] = tempBase64Src;
            }
        } catch (e) {
            console.warn("图片 Base64 转换失败", e);
        }
    }

    if (tempBase64Src && imgElement) {
        // 临时替换为 Base64
        imgElement.src = tempBase64Src;
        await waitForImageLoad(imgElement);
    } else if (imgElement) {
        // 即便没转 base64，也要确保当前展示图已加载完成
        await waitForImageLoad(imgElement);
    }

    // --- 关键修复：预处理图片为 Base64 ---



    try {
        // 创建一个临时的导出容器
        const exportContainer = document.createElement('div');
        exportContainer.id = 'export-container-temp';
        exportContainer.style.position = 'fixed';
        exportContainer.style.left = '-99999px';
        exportContainer.style.top = '0';
        exportContainer.style.width = '900px'; // 修改宽度：860px卡片 + 20px*2边距
        exportContainer.style.minHeight = '800px';
        exportContainer.style.padding = '20px'; // 橙色背景距离卡片四周各20px
        exportContainer.style.background = '#fafafa';
        exportContainer.style.display = 'flex';
        exportContainer.style.alignItems = 'center';
        exportContainer.style.justifyContent = 'center';
        document.body.appendChild(exportContainer);
        
        // 创建橙色渐变背景层
        const bgLayer = document.createElement('div');
        bgLayer.style.position = 'absolute';
        bgLayer.style.inset = '0';
        bgLayer.style.background = 'linear-gradient(180deg, #F08F62 0%, #EB7A54 100%)';
        bgLayer.style.zIndex = '0';
        exportContainer.appendChild(bgLayer);
        
        // 克隆 preview-card
        const clonedCard = element.cloneNode(true);
        clonedCard.style.position = 'relative';
        clonedCard.style.zIndex = '10';
        clonedCard.style.background = 'rgba(255, 255, 255, 0.98)';
        clonedCard.style.borderRadius = '24px';
        clonedCard.style.boxShadow = '0 8px 32px -4px rgba(0, 0, 0, 0.12), 0 4px 16px -2px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.05)'; // 更细腻的多层阴影
        clonedCard.style.border = '1px solid rgba(255, 255, 255, 0.8)';
        clonedCard.style.padding = '40px 45px';
        clonedCard.style.margin = '0 auto';
        clonedCard.style.width = '860px'; // 修改宽度：固定卡片宽度为860px
        clonedCard.style.boxSizing = 'border-box';
        clonedCard.style.fontFamily = '"PingFang SC", "Microsoft YaHei", sans-serif';
        clonedCard.style.webkitFontSmoothing = 'antialiased';
        exportContainer.appendChild(clonedCard);
        
        const canvas = await html2canvas(exportContainer, {
            scale: 2.0, // 适中的分辨率，640px容器输出1280px宽度
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            logging: false,
            onclone: (clonedDoc) => {
                const clonedElement = clonedDoc.getElementById('export-container-temp');
                if (clonedElement) {
                   const card = clonedElement.querySelector('#preview-card');
                   if (!card) return;

                   // 获取原始数据
                   const originalImg = card.querySelector('img');
                   const imgSrc = tempBase64Src || (originalImg ? originalImg.src : '');
                   const titleElement = card.querySelector('h2');
                   const titleText = titleElement ? titleElement.textContent.trim() : getLocalized(activeTemplate.name, language);
                   const contentElement = card.querySelector('#final-prompt-content');
                   const contentHTML = contentElement ? contentElement.innerHTML : '';
                   
                   console.log('正文内容获取:', contentHTML ? '成功' : '失败', contentHTML.length);
                   
                   // 获取版本号（动态从原始DOM）
                   const metaContainer = card.querySelector('.flex.flex-wrap.gap-2');
                   const versionElement = metaContainer ? metaContainer.querySelector('.bg-orange-50') : null;
                   const versionText = versionElement ? versionElement.textContent.trim() : '';
                   
                   // 清空卡片内容
                   card.innerHTML = '';
                   
                   // --- 1. 图片区域（顶部，保持原始宽高比不裁切）---
                   if (imgSrc) {
                       const imgContainer = clonedDoc.createElement('div');
                       imgContainer.style.width = '100%';
                       imgContainer.style.marginBottom = '30px';
                       imgContainer.style.display = 'flex';
                       imgContainer.style.justifyContent = 'center';
                       imgContainer.style.alignItems = 'center';
                       
                       const img = clonedDoc.createElement('img');
                       img.src = imgSrc;
                       img.style.width = '100%'; // 充分利用卡片宽度
                       img.style.height = 'auto'; // 高度自动，保持原始宽高比
                       img.style.objectFit = 'contain'; // 包含模式，不裁切图片
                       img.style.borderRadius = '12px'; // 加入圆角
                       img.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                       img.style.boxSizing = 'border-box';
                       
                       imgContainer.appendChild(img);
                       card.appendChild(imgContainer);
                   }
                   
                   // --- 2. 标题区域（无版本号、无标签）---
                   const titleContainer = clonedDoc.createElement('div');
                   titleContainer.style.marginBottom = '25px';
                   
                   const title = clonedDoc.createElement('h2');
                   title.textContent = titleText;
                   title.style.fontSize = '32px'; // 恢复原状
                   title.style.fontWeight = '700';
                   title.style.color = '#1f2937';
                   title.style.margin = '0';
                   title.style.lineHeight = '1.2';
                   
                   titleContainer.appendChild(title);
                   card.appendChild(titleContainer);
                   
                   // --- 3. 正文区域（不重复标题）---
                   if (contentHTML) {
                       const contentContainer = clonedDoc.createElement('div');
                       contentContainer.innerHTML = contentHTML;
                       contentContainer.style.fontSize = '18px'; // 恢复原状
                       contentContainer.style.lineHeight = '1.8';
                       contentContainer.style.color = '#374151'; // 默认正文颜色
                       contentContainer.style.marginBottom = '40px';
                       
                       // 强制修复所有子元素的颜色（防止 DarkMode 下的类名干扰）
                       // 1. 修复标题颜色
                       const headers = contentContainer.querySelectorAll('h3');
                       headers.forEach(h => {
                           h.style.color = '#111827'; // 对应 Lightmode 的 text-gray-900
                           h.style.borderBottom = '1px solid #f3f4f6'; // 对应 border-gray-100
                       });

                       // 2. 修复普通文本和列表项颜色
                       const divs = contentContainer.querySelectorAll('div, p, span');
                       divs.forEach(d => {
                           // 排除胶囊组件，胶囊有自己的处理逻辑
                           if (!d.hasAttribute('data-export-pill')) {
                               d.style.color = '#374151'; // 对应 text-gray-700
                           }
                       });

                       // 3. 修复加粗文本颜色
                       const strongs = contentContainer.querySelectorAll('strong');
                       strongs.forEach(s => {
                           s.style.color = '#111827';
                       });

                       // 4. 修复列表打点和数字颜色
                       const secondaryTexts = contentContainer.querySelectorAll('.mt-2\\.5, .font-mono');
                       secondaryTexts.forEach(st => {
                           st.style.color = '#9ca3af'; // 对应 Lightmode 的 text-gray-400
                       });
                       
                       // 修复胶囊样式 - 使用更精确的属性选择器
                       const variables = contentContainer.querySelectorAll('[data-export-pill="true"]');
                       variables.forEach(v => {
                           // 优化父级容器（如果是 Variable 组件的 wrapper）
                           if (v.parentElement && v.parentElement.classList.contains('inline-block')) {
                               v.parentElement.style.display = 'inline';
                               v.parentElement.style.margin = '0';
                           }

                           // 保留原有的背景色和文字颜色，只优化布局
                           v.style.display = 'inline-flex';
                           v.style.alignItems = 'center';
                           v.style.justifyContent = 'center';
                           v.style.padding = '4px 12px'; // 恢复原状
                           v.style.margin = '2px 4px';
                           v.style.borderRadius = '6px'; // 恢复原状
                           v.style.fontSize = '17px'; // 恢复原状
                           v.style.fontWeight = '600';
                           v.style.lineHeight = '1.5';
                           v.style.verticalAlign = 'middle';
                           v.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                           v.style.color = '#ffffff'; // 确保彩色胶囊文字是白色
                           v.style.border = 'none'; // 导出时去掉半透明边框，减少干扰
                           
                           // 如果是未定义变量的占位符（背景较浅），恢复其深色文字
                           if (v.textContent.includes('[') && v.textContent.includes('?]')) {
                               v.style.color = '#9ca3af'; 
                               v.style.background = '#f8fafc';
                               v.style.border = '1px solid #e2e8f0';
                           }
                       });
                       
                       card.appendChild(contentContainer);
                   }
                   
                   // --- 4. 底部水印区域 ---
                   const footer = clonedDoc.createElement('div');
                   footer.style.marginTop = '40px';
                   footer.style.paddingTop = '25px';
                   footer.style.paddingBottom = '15px';
                   footer.style.borderTop = '2px solid #e2e8f0';
                   footer.style.display = 'flex';
                   footer.style.justifyContent = 'space-between';
                   footer.style.alignItems = 'center';
                   footer.style.fontFamily = 'sans-serif';
                   
                   footer.innerHTML = `
                       <div style="flex: 1; padding-right: 20px;">
                           <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; flex-wrap: wrap;">
                               <div style="font-size: 15px; font-weight: 600; color: #1f2937;">
                                   Generated by <span style="color: #6366f1; font-weight: 700;">Prompt Fill</span>
                               </div>
                               ${versionText ? `<span style="font-size: 11px; padding: 3px 10px; background: #fff7ed; color: #f97316; border-radius: 5px; font-weight: 600; border: 1px solid #fed7aa;">${versionText}</span>` : ''}
                           </div>
                           <div style="font-size: 12px; color: #6b7280; margin-bottom: 6px; font-weight: 500;">提示词填空器 - 让分享更简单</div>
                           <div style="font-size: 11px; color: #3b82f6; font-weight: 500; background: #eff6ff; padding: 4px 10px; border-radius: 6px; display: block; letter-spacing: 0.3px; word-break: break-all; max-width: 100%; min-height: 14px; line-height: 1.4;">
                               ${displayUrlText}
                           </div>
                       </div>
                       <div style="display: flex; align-items: center;">
                           <div style="text-align: center;">
                               <img src="${qrBase64}" 
                                    style="width: 85px; height: 85px; border: 3px solid #e2e8f0; border-radius: 8px; display: block; background: white;" 
                                    alt="QR Code" />
                               <div style="font-size: 9px; color: #94a3b8; margin-top: 4px; font-weight: 500;">扫码体验</div>
                           </div>
                       </div>
                   `;
                   
                   card.appendChild(footer);
                   console.log('新布局已应用');
                }
            }
        });

        // 使用 JPG 格式，质量 0.92（高质量同时节省空间）
        const image = canvas.toDataURL('image/jpeg', 0.92);
        const activeTemplateName = getLocalized(activeTemplate.name, language);
        const filename = `${activeTemplateName.replace(/\s+/g, '_')}_prompt.jpg`;
        
        // 检测是否为移动设备和iOS
        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
        const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
        
        if (isMobileDevice) {
            // 移动端：尝试使用 Web Share API 保存到相册
            try {
                // 将 base64 转换为 blob
                const base64Response = await fetch(image);
                const blob = await base64Response.blob();
                const file = new File([blob], filename, { type: 'image/jpeg' });
                
                // 检查是否支持 Web Share API（iOS 13+支持）
                if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                    await navigator.share({
                        files: [file],
                        title: activeTemplateName,
                        text: '导出的提示词模板'
                    });
                    showToastMessage('✅ 图片已分享，请选择"存储图像"保存到相册');
                } else {
                    // 降级方案：对于iOS，打开新标签页显示图片
                    if (isIOS) {
                        // iOS特殊处理：在新窗口打开图片，用户可以长按保存
                        const newWindow = window.open();
                        if (newWindow) {
                            newWindow.document.write(`
                                <html>
                                <head>
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                    <title>${activeTemplateName}</title>
                                    <style>
                                        body { margin: 0; padding: 20px; background: #000; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
                                        img { max-width: 100%; height: auto; }
                                        .tip { position: fixed; top: 10px; left: 50%; transform: translateX(-50%); background: rgba(255,255,255,0.95); padding: 12px 20px; border-radius: 8px; color: #333; font-size: 14px; box-shadow: 0 2px 10px rgba(0,0,0,0.2); z-index: 1000; }
                                    </style>
                                </head>
                                <body>
                                    <div class="tip">长按图片保存到相册 📱</div>
                                    <img src="${image}" alt="${activeTemplateName}" />
                                </body>
                                </html>
                            `);
                            showToastMessage('✅ 请在新页面长按图片保存');
                        } else {
                            // 如果无法打开新窗口，尝试下载
                            const link = document.createElement('a');
                            link.href = image;
                            link.download = filename;
                            link.target = '_blank';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            showToastMessage('✅ 图片已导出，请在新页面保存');
                        }
                    } else {
                        // 安卓等其他移动设备：触发下载
                        const link = document.createElement('a');
                        link.href = image;
                        link.download = filename;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        showToastMessage('✅ 图片已保存到下载文件夹');
                    }
                }
            } catch (shareError) {
                console.log('Share failed:', shareError);
                // 最终降级方案
                if (isIOS) {
                    // iOS最终方案：打开新标签页
                    const newWindow = window.open();
                    if (newWindow) {
                        newWindow.document.write(`
                            <html>
                            <head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${activeTemplateName}</title></head>
                            <body style="margin:0;padding:20px;background:#000;text-align:center;">
                                <p style="color:#fff;margin-bottom:20px;">长按图片保存到相册 📱</p>
                                <img src="${image}" style="max-width:100%;height:auto;" />
                            </body>
                            </html>
                        `);
                    }
                    showToastMessage('⚠️ 请在新页面长按图片保存');
                } else {
                    const link = document.createElement('a');
                    link.href = image;
                    link.download = filename;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    showToastMessage('✅ 图片已保存');
                }
            }
        } else {
            // 桌面端：直接下载
            const link = document.createElement('a');
            link.href = image;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showToastMessage('✅ 图片导出成功！');
        }
    } catch (err) {
        console.error("Export failed:", err);
        showToastMessage('❌ 导出失败，请重试');
    } finally {
        // 清理临时容器
        const tempContainer = document.getElementById('export-container-temp');
        if (tempContainer) {
            document.body.removeChild(tempContainer);
        }
        
        // 恢复原始图片 src
        if (imgElement && originalImageSrc) {
            imgElement.src = originalImageSrc;
        }
        setIsExporting(false);
    }
  };

  // 移动端模拟拖拽处理器
  const onTouchDragStart = (key, x, y) => {
    setTouchDraggingVar({ key, x, y });
    setIsBanksDrawerOpen(false); // 开始拖拽立刻收起抽屉
  };

  const onTouchDragMove = (x, y) => {
    if (touchDraggingVar) {
      setTouchDraggingVar(prev => ({ ...prev, x, y }));
    }
  };

  const onTouchDragEnd = (x, y) => {
    if (touchDraggingVar) {
      insertVariableToTemplate(touchDraggingVar.key, { x, y });
      setTouchDraggingVar(null);
    }
  };

  // --- Renderers ---

  const globalContainerStyle = isDarkMode ? {
    borderRadius: '16px',
    border: '1px solid transparent',
    backgroundImage: 'linear-gradient(180deg, #3B3B3B, #242120), linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)',
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
  } : {
    borderRadius: '16px',
    border: '1px solid transparent',
    backgroundImage: 'linear-gradient(180deg, #FAF5F1, #F6EBE6), linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)',
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
  };

  return (
    <div
      className={`flex h-screen w-screen overflow-hidden p-0 md:p-4 ${isDarkMode ? 'dark-mode dark-gradient-bg' : 'mesh-gradient-bg'}`}
      onTouchMove={(e) => touchDraggingVar && onTouchDragMove(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={(e) => touchDraggingVar && onTouchDragEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY)}
    >
      {/* 桌面端全局侧边栏 - 位置固定不动 */}
      {!isMobileDevice && (
        <>
          <Sidebar 
            activeTab={isSettingsOpen ? 'settings' : (showDiscoveryOverlay ? 'home' : 'details')}
            onHome={() => {
              setIsSettingsOpen(false);
              handleSetDiscoveryView(true);
            }}
            onDetail={() => {
              setIsSettingsOpen(false);
              handleSetDiscoveryView(false);
            }}
            isSortMenuOpen={isSortMenuOpen}
            setIsSortMenuOpen={setIsSortMenuOpen}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            setRandomSeed={setRandomSeed}
            onRefresh={handleRefreshSystemData}
            onSettings={() => setIsSettingsOpen(true)}
            language={language}
            setLanguage={setLanguage}
            isDarkMode={isDarkMode}
            themeMode={themeMode}
            setThemeMode={setThemeMode}
            t={t}
          />
          
          {/* 趣味设计：暗号模式下拉灯效果 */}
          <div 
            className={`hidden md:block fixed top-0 left-[-24px] z-[500] pointer-events-none transition-all duration-700 ease-in-out ${
              isDarkMode ? 'translate-y-0 opacity-100 delay-0' : '-translate-y-full opacity-0 delay-[300ms]'
            }`}
            style={{ width: '220px' }}
          >
            {/* 精准感应区：仅 32px 宽，处于灯体中心 */}
            <div 
              className="absolute left-[94px] top-0 h-full w-[32px] cursor-pointer pointer-events-auto z-10"
              onClick={() => setIsLampOn(!isLampOn)}
              onMouseMove={handleLampMouseMove}
              onMouseLeave={() => {
                setLampRotation(0);
                setIsLampHovered(false);
              }}
            />
            
            <div 
              style={{ 
                transformOrigin: '50% 0',
                transform: `rotate(${lampRotation}deg)`,
                transition: isLampHovered ? 'transform 0.1s ease-out' : 'transform 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}
            >
              <img src="/lamp.png" alt="Dark Mode Lamp" className={`w-full h-auto drop-shadow-2xl transition-all duration-500 ${!isLampOn ? 'brightness-50' : 'brightness-100'}`} />
            </div>
          </div>

          {/* 趣味设计：光照效果 */}
          <div 
            className={`hidden md:block fixed pointer-events-none transition-opacity ease-in-out ${
              isDarkMode 
                ? (isLampOn ? 'opacity-[0.28] duration-500 delay-[900ms]' : 'opacity-[0.05] duration-500 delay-0') 
                : 'opacity-0 duration-300 delay-0'
            }`}
            style={{
              left: '-286px',
              top: '58px',
              width: '815px',
              height: '731px',
              background: 'linear-gradient(180deg, #FFD09D 5%, rgba(216, 216, 216, 0) 100%)',
              filter: 'blur(286px)',
              mixBlendMode: 'lighten',
              zIndex: 499
            }}
          />
        </>
      )}

      {/* 移动端拖拽浮层 */}
      {touchDraggingVar && (
        <div 
          className="fixed z-[9999] pointer-events-none px-3 py-1.5 bg-orange-500 text-white rounded-lg shadow-2xl text-xs font-bold font-mono animate-in zoom-in-50 duration-200"
          style={{ 
            left: touchDraggingVar.x, 
            top: touchDraggingVar.y, 
            transform: 'translate(-50%, -150%)',
            boxShadow: '0 0 20px rgba(249,115,22,0.4)'
          }}
        >
          {` {{${touchDraggingVar.key}}} `}
        </div>
      )}
      
      {/* 主视图区域 */}
      <div className="flex-1 relative flex overflow-hidden">
        {isSettingsOpen && !isMobileDevice ? (
          <SettingsView
            language={language}
            setLanguage={setLanguage}
            storageMode={storageMode}
            setStorageMode={setStorageMode}
            handleImportTemplate={handleImportTemplate}
            handleExportAllTemplates={handleExportAllTemplates}
            handleResetSystemData={handleRefreshSystemData}
            handleClearAllData={handleClearAllData}
            handleSelectDirectory={handleSelectDirectory}
            handleSwitchToLocalStorage={handleSwitchToLocalStorage}
            SYSTEM_DATA_VERSION={SYSTEM_DATA_VERSION}
            t={t}
            globalContainerStyle={globalContainerStyle}
            isDarkMode={isDarkMode}
            themeMode={themeMode}
            setThemeMode={setThemeMode}
          />
        ) : showDiscoveryOverlay ? (
          <DiscoveryView
            filteredTemplates={discoveryTemplates}
            setActiveTemplateId={setActiveTemplateId}
            setDiscoveryView={handleSetDiscoveryView}
            setZoomedImage={setZoomedImage}
            posterScrollRef={posterScrollRef}
            setIsPosterAutoScrollPaused={setIsPosterAutoScrollPaused}
            currentMasonryStyle={MASONRY_STYLES[masonryStyleKey]}
            masonryStyleKey={masonryStyleKey}
            AnimatedSlogan={isMobileDevice ? MobileAnimatedSlogan : AnimatedSlogan}
            isSloganActive={!zoomedImage}
            t={t}
            TAG_STYLES={TAG_STYLES}
            displayTag={displayTag}
            handleRefreshSystemData={handleRefreshSystemData}
            language={language}
            setLanguage={setLanguage}
            setIsSettingsOpen={setIsSettingsOpen}
            isDarkMode={isDarkMode}
            isSortMenuOpen={isSortMenuOpen}
            setIsSortMenuOpen={setIsSortMenuOpen}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            setRandomSeed={setRandomSeed}
            globalContainerStyle={globalContainerStyle}
            themeMode={themeMode}
            setThemeMode={setThemeMode}
            templates={templates}
          />
        ) : (
          <div className="flex-1 flex gap-2 lg:gap-4 overflow-hidden">
            <TemplatesSidebar 
              mobileTab={mobileTab}
              isTemplatesDrawerOpen={isTemplatesDrawerOpen}
              setIsTemplatesDrawerOpen={setIsTemplatesDrawerOpen}
              setDiscoveryView={handleSetDiscoveryView}
              activeTemplateId={activeTemplateId}
              setActiveTemplateId={setActiveTemplateId} 
              filteredTemplates={filteredTemplates}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              TEMPLATE_TAGS={TEMPLATE_TAGS}
              displayTag={displayTag}
              handleRefreshSystemData={handleRefreshSystemData}
              language={language}
              setLanguage={setLanguage}
              isDarkMode={isDarkMode}
              setIsSettingsOpen={setIsSettingsOpen}
              t={t}
              isSortMenuOpen={isSortMenuOpen}
              setIsSortMenuOpen={setIsSortMenuOpen}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              setRandomSeed={setRandomSeed}
              handleResetTemplate={handleResetTemplate}
              startRenamingTemplate={startRenamingTemplate}
              handleDuplicateTemplate={handleDuplicateTemplate}
              handleExportTemplate={handleExportTemplate}
            handleDeleteTemplate={handleDeleteTemplate}
            handleAddTemplate={handleAddTemplate}
            handleManualTokenImport={handleManualTokenImport}
            setShowImportTokenModal={setShowImportTokenModal}
            INITIAL_TEMPLATES_CONFIG={INITIAL_TEMPLATES_CONFIG}
              editingTemplateNameId={editingTemplateNameId}
              tempTemplateName={tempTemplateName}
              setTempTemplateName={setTempTemplateName}
              tempTemplateAuthor={tempTemplateAuthor}
              setTempTemplateAuthor={setTempTemplateAuthor}
              saveTemplateName={saveTemplateName}
              setEditingTemplateNameId={setEditingTemplateNameId}
              globalContainerStyle={globalContainerStyle}
            />

            {/* --- 2. Main Editor (Middle) --- */}
            <div 
              style={!isMobileDevice ? globalContainerStyle : {}}
              className={`
                ${(mobileTab === 'editor' || mobileTab === 'settings') ? 'flex fixed inset-0 z-50 md:static md:bg-transparent' : 'hidden'} 
                ${(mobileTab === 'editor' || mobileTab === 'settings') && isMobileDevice ? (isDarkMode ? 'bg-[#242120]' : 'bg-white') : ''}
                md:flex flex-1 shrink-[1] md:min-w-[400px] flex-col h-full overflow-hidden relative
                md:rounded-2xl origin-left
              `}
            >
                <div className={`flex flex-col w-full h-full ${!isMobileDevice ? (isDarkMode ? 'bg-black/20 backdrop-blur-sm rounded-2xl' : 'bg-white/30 backdrop-blur-sm rounded-2xl') : ''}`}>
                {/* Mobile Side Drawer Triggers */}
                {isMobileDevice && (
                  <>
                    <div className={`md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ${mobileTab === 'editor' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                      <button 
                        onClick={() => setIsTemplatesDrawerOpen(true)}
                        className={`p-3 backdrop-blur-md rounded-r-2xl shadow-lg border border-l-0 active:scale-95 transition-all ${isDarkMode ? 'bg-black/40 border-white/5 text-gray-600' : 'bg-white/60 border-white/40 text-gray-400'}`}
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                    <div className={`md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ${mobileTab === 'editor' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                      <button 
                        onClick={() => setIsBanksDrawerOpen(true)}
                        className={`p-3 backdrop-blur-md rounded-l-2xl shadow-lg border border-r-0 active:scale-95 transition-all ${isDarkMode ? 'bg-black/40 border-white/5 text-gray-600' : 'bg-white/60 border-white/40 text-gray-400'}`}
                      >
                        <ChevronLeft size={20} />
                      </button>
                    </div>
                  </>
                )}
              
              {/* 顶部工具栏 */}
              {(!isMobileDevice || mobileTab !== 'settings') && (
                <div className={`px-4 md:px-8 py-3 md:py-4 border-b flex flex-col md:flex-row md:justify-between md:items-center z-20 h-auto ${isDarkMode ? 'border-white/5' : 'border-gray-100/50'}`}>
                  {/* 第一行：语言切换与模式切换 (Mobile) / 标题与语言 (Desktop) */}
                  <div className="w-full md:w-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      {/* Language Toggle - Mobile: Left of Title */}
                      {isMobileDevice && activeTemplate && (() => {
                        const templateLangs = activeTemplate.language ? (Array.isArray(activeTemplate.language) ? activeTemplate.language : [activeTemplate.language]) : ['cn', 'en'];
                        if (templateLangs.length <= 1) return null;
                        const supportsChinese = templateLangs.includes('cn');
                        const supportsEnglish = templateLangs.includes('en');
                        return (
                          <div className={`premium-toggle-container ${isDarkMode ? 'dark' : 'light'} scale-90 origin-left shrink-0`}>
                              <button 
                                  onClick={() => supportsChinese && setTemplateLanguage('cn')}
                                  className={`premium-toggle-item ${isDarkMode ? 'dark' : 'light'} ${templateLanguage === 'cn' ? 'is-active' : ''} !px-2`}
                              >
                                  CN
                              </button>
                              <button 
                                  onClick={() => supportsEnglish && setTemplateLanguage('en')}
                                  className={`premium-toggle-item ${isDarkMode ? 'dark' : 'light'} ${templateLanguage === 'en' ? 'is-active' : ''} !px-2`}
                              >
                                  EN
                              </button>
                          </div>
                        );
                      })()}

                      {!isMobileDevice && (
                        <h1 className={`text-xl md:text-2xl font-black truncate tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{getLocalized(activeTemplate.name, language)}</h1>
                      )}
                      
                      {/* Language Toggle - Desktop: Right of Title */}
                      {!isMobileDevice && activeTemplate && (() => {
                        const templateLangs = activeTemplate.language ? (Array.isArray(activeTemplate.language) ? activeTemplate.language : [activeTemplate.language]) : ['cn', 'en'];
                        const showLanguageToggle = templateLangs.length > 1;
                        const supportsChinese = templateLangs.includes('cn');
                        const supportsEnglish = templateLangs.includes('en');
                        
                        if (!showLanguageToggle) return null;

                        return (
                          <div className={`premium-toggle-container ${isDarkMode ? 'dark' : 'light'} shrink-0`}>
                              <button 
                                  onClick={() => supportsChinese && setTemplateLanguage('cn')}
                                  disabled={!supportsChinese}
                                  className={`
                                      premium-toggle-item ${isDarkMode ? 'dark' : 'light'}
                                      ${!supportsChinese 
                                          ? 'opacity-30 cursor-not-allowed' 
                                          : templateLanguage === 'cn' 
                                              ? 'is-active' 
                                              : ''}
                                  `}
                              >
                                  CN
                              </button>
                              <button 
                                  onClick={() => supportsEnglish && setTemplateLanguage('en')}
                                  disabled={!supportsEnglish}
                                  className={`
                                      premium-toggle-item ${isDarkMode ? 'dark' : 'light'}
                                      ${!supportsEnglish 
                                          ? 'opacity-30 cursor-not-allowed' 
                                          : templateLanguage === 'en' 
                                              ? 'is-active' 
                                              : ''}
                                  `}
                              >
                                  EN
                              </button>
                          </div>
                        );
                      })()}
                    </div>

                    {/* 模式切换 (Mobile Only) */}
                    <div className="md:hidden">
                      <div className={`premium-toggle-container ${isDarkMode ? 'dark' : 'light'}`}>
                          <button
                              onClick={handleStopEditing}
                              className={`premium-toggle-item ${isDarkMode ? 'dark' : 'light'} ${!isEditing ? 'is-active' : ''}`}
                              title={t('preview_mode')}
                          >
                              <Eye size={14} /> <span className="text-[11px] ml-1">{t('preview_mode')}</span>
                          </button>
                          <button
                              onClick={handleStartEditing}
                              className={`premium-toggle-item ${isDarkMode ? 'dark' : 'light'} ${isEditing ? 'is-active' : ''}`}
                              title={t('edit_mode')}
                          >
                              <Edit3 size={14} /> <span className="text-[11px] ml-1">{t('edit_mode')}</span>
                          </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* 第二行：分享、保存、复制 (Mobile) / 模式切换与按钮 (Desktop) */}
                  <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-2 shrink-0 mt-2 md:mt-0">
                     {/* 模式切换 (Desktop Only) */}
                     {!isMobileDevice && (
                        <>
                          <div className={`premium-toggle-container ${isDarkMode ? 'dark' : 'light'}`}>
                              <button
                                  onClick={handleStopEditing}
                                  className={`premium-toggle-item ${isDarkMode ? 'dark' : 'light'} ${!isEditing ? 'is-active' : ''}`}
                                  title={t('preview_mode')}
                              >
                                  <Eye size={14} /> <span className="hidden md:inline">{t('preview_mode')}</span>
                              </button>
                              <button
                                  onClick={handleStartEditing}
                                  className={`premium-toggle-item ${isDarkMode ? 'dark' : 'light'} ${isEditing ? 'is-active' : ''}`}
                                  title={t('edit_mode')}
                              >
                                  <Edit3 size={14} /> <span className="hidden md:inline">{t('edit_mode')}</span>
                              </button>
                          </div>
                          <div className={`h-6 w-px mx-1 hidden md:block ${isDarkMode ? 'bg-white/5' : 'bg-gray-200'}`}></div>
                        </>
                     )}

                    <div className="flex-1 md:flex-none flex items-center justify-end gap-1.5 md:gap-3">
                      <PremiumButton 
                          onClick={handleShareLink} 
                          title={language === 'cn' ? '分享模版' : t('share_link')} 
                          icon={Share2} 
                          isDarkMode={isDarkMode}
                          className="flex-1 md:flex-none"
                      >
                          <span className="hidden md:inline ml-1.5">{language === 'cn' ? '分享模版' : t('share')}</span>
                      </PremiumButton>

                      <PremiumButton 
                          onClick={handleExportImage} 
                          disabled={isEditing || isExporting} 
                          title={isExporting ? t('exporting') : (language === 'cn' ? '导出长图' : t('export_image'))} 
                          icon={ImageIcon} 
                          isDarkMode={isDarkMode}
                          className="flex-1 md:flex-none"
                      >
                          <span className="hidden md:inline ml-1.5 truncate">{isExporting ? (language === 'cn' ? '导出中...' : 'Exp...') : (language === 'cn' ? '导出长图' : 'Img')}</span>
                      </PremiumButton>
                      <PremiumButton 
                          onClick={handleCopy} 
                          title={copied ? t('copied') : (language === 'cn' ? '复制结果' : t('copy_result'))} 
                          icon={copied ? Check : CopyIcon} 
                          active={true}
                          isDarkMode={isDarkMode}
                          className="flex-1 md:flex-none"
                      >
                           <span className="hidden md:inline ml-1.5 truncate">{copied ? t('copied') : (language === 'cn' ? '复制结果' : 'Copy')}</span>
                      </PremiumButton>
                    </div>
                  </div>
                </div>
              )}

              {/* 核心内容区 */}
              <div className={`flex-1 overflow-hidden relative pb-24 md:pb-0 flex flex-col ${mobileTab === 'settings' ? 'pt-0' : ''}`}>
                  {mobileTab === 'settings' ? (
                      <div className={`flex-1 flex flex-col overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-[#181716]' : 'bg-white'}`}>
                          <MobileSettingsView 
                              language={language}
                              setLanguage={setLanguage}
                              storageMode={storageMode}
                              setStorageMode={setStorageMode}
                              handleImportTemplate={handleImportTemplate}
                              handleExportAllTemplates={handleExportAllTemplates}
                              handleCompleteBackup={handleCompleteBackup}
                              handleImportAllData={handleImportAllData}
                              handleResetSystemData={handleRefreshSystemData}
                              handleClearAllData={handleClearAllData}
                              SYSTEM_DATA_VERSION={SYSTEM_DATA_VERSION}
                              t={t}
                              isDarkMode={isDarkMode}
                              themeMode={themeMode}
                              setThemeMode={setThemeMode}
                          />
                      </div>
                  ) : (
                    <>
                      {isEditing && (
                          <div className={`backdrop-blur-sm ${isDarkMode ? 'bg-black/20' : 'bg-white/30'}`}>
                            <EditorToolbar 
                                onInsertClick={() => setIsInsertModalOpen(true)}
                                canUndo={historyPast.length > 0}
                                canRedo={historyFuture.length > 0}
                                onUndo={handleUndo}
                                onRedo={handleRedo}
                                t={t}
                                isDarkMode={isDarkMode}
                                cursorInVariable={cursorInVariable}
                                currentGroupId={currentGroupId}
                                onSetGroup={handleSetGroup}
                                onRemoveGroup={handleRemoveGroup}
                            />
                          </div>
                      )}
                      
                      {isEditing ? (
                          <div className="flex-1 relative overflow-hidden flex flex-col">
                              {/* Edit Mode: Title & Author Inputs */}
                              <div className={`px-8 pt-6 pb-4 flex flex-col gap-4 border-b ${isDarkMode ? 'bg-black/20 border-white/5' : 'bg-gray-50 border-gray-200'}`}>
                                  <div className="flex flex-col gap-1.5">
                                      <label className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                                          {language === 'cn' ? '模版标题 (Title)' : 'Template Title'}
                                      </label>
                                      <input 
                                          type="text" 
                                          value={tempTemplateName}
                                          onChange={(e) => setTempTemplateName(e.target.value)}
                                          onBlur={saveTemplateName}
                                          className={`text-xl font-bold bg-transparent border-b-2 border-orange-500/20 focus:border-orange-500 focus:outline-none w-full pb-1 transition-all ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                                          placeholder={t('label_placeholder')}
                                      />
                                  </div>
                                  <div className="flex flex-col gap-1.5">
                                      <label className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                                          {language === 'cn' ? '作者 (Author)' : 'Author'}
                                      </label>
                                      <div className="relative">
                                          <input 
                                              type="text" 
                                              value={tempTemplateAuthor}
                                              onChange={(e) => setTempTemplateAuthor(e.target.value)}
                                              onBlur={saveTemplateName}
                                              disabled={INITIAL_TEMPLATES_CONFIG.some(cfg => cfg.id === activeTemplate.id)}
                                              className={`text-sm font-bold bg-transparent border-b border-dashed focus:border-solid border-orange-500/30 focus:border-orange-500 focus:outline-none w-full pb-1 transition-all ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                                              placeholder={language === 'cn' ? '作者名称...' : 'Author name...'}
                                          />
                                          {INITIAL_TEMPLATES_CONFIG.some(cfg => cfg.id === activeTemplate.id) && (
                                              <p className="text-[10px] text-orange-500/50 font-bold italic mt-1">
                                                  {language === 'cn' ? '* 系统模版作者不可修改' : '* System template author is read-only'}
                                              </p>
                                          )}
                                      </div>
                                  </div>
                              </div>
                              <VisualEditor
                                  ref={textareaRef}
                                  value={getLocalized(activeTemplate.content, templateLanguage)}
                                  onChange={(e) => {
                                      const newText = e.target.value;
                                      if (typeof activeTemplate.content === 'object') {
                                          updateActiveTemplateContent({
                                              ...activeTemplate.content,
                                              [templateLanguage]: newText
                                          });
                                      } else {
                                          updateActiveTemplateContent(newText);
                                      }
                                  }}
                                  banks={banks}
                                  categories={categories}
                                  isDarkMode={isDarkMode}
                                  activeTemplate={activeTemplate}
                                  language={language}
                                  t={t}
                              />
                          </div>
                      ) : (
                          <TemplatePreview 
                              activeTemplate={activeTemplate}
                              banks={banks}
                              defaults={defaults}
                              categories={categories}
                              activePopover={activePopover}
                              setActivePopover={setActivePopover}
                              handleSelect={handleSelect}
                              handleAddCustomAndSelect={handleAddCustomAndSelect}
                              popoverRef={popoverRef}
                              t={t}
                              displayTag={displayTag}
                              TAG_STYLES={TAG_STYLES}
                              setZoomedImage={setZoomedImage}
                              fileInputRef={fileInputRef}
                              setShowImageUrlInput={setShowImageUrlInput}
                              handleResetImage={handleResetImage}
                              handleDeleteImage={handleDeleteImage}
                              language={templateLanguage}
                              setLanguage={setTemplateLanguage}
                              // 标签编辑相关
                              TEMPLATE_TAGS={TEMPLATE_TAGS}
                              handleUpdateTemplateTags={handleUpdateTemplateTags}
                              editingTemplateTags={editingTemplateTags}
                              setEditingTemplateTags={setEditingTemplateTags}
                              // 多图编辑相关
                              setImageUpdateMode={setImageUpdateMode}
                              setCurrentImageEditIndex={setCurrentImageEditIndex}
                              // 标题编辑相关
                              editingTemplateNameId={editingTemplateNameId}
                              tempTemplateName={tempTemplateName}
                              setTempTemplateName={setTempTemplateName}
                              saveTemplateName={saveTemplateName}
                              startRenamingTemplate={startRenamingTemplate}
                              setEditingTemplateNameId={setEditingTemplateNameId}
                              tempTemplateAuthor={tempTemplateAuthor}
                              setTempTemplateAuthor={setTempTemplateAuthor}
                              INITIAL_TEMPLATES_CONFIG={INITIAL_TEMPLATES_CONFIG}
                              globalContainerStyle={globalContainerStyle}
                              isDarkMode={isDarkMode}
                          />
                      )}
                    </>
                  )}
                           
                           {/* Image URL Input Modal */}
                           {showImageUrlInput && (
                               <div 
                                   className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
                                   onClick={() => { setShowImageUrlInput(false); setImageUrlInput(""); }}
                               >
                                   <div 
                                       className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full"
                                       onClick={(e) => e.stopPropagation()}
                                   >
                                       <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                           <Globe size={20} className="text-blue-500" />
                                           {t('image_url')}
                                       </h3>
                                       <input
                                           autoFocus
                                           type="text"
                                           value={imageUrlInput}
                                           onChange={(e) => setImageUrlInput(e.target.value)}
                                           placeholder={t('image_url_placeholder')}
                                           className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                           onKeyDown={(e) => e.key === 'Enter' && handleSetImageUrl()}
                                       />
                                       <div className="flex gap-3">
                                           <button
                                               onClick={handleSetImageUrl}
                                               disabled={!imageUrlInput.trim()}
                                               className="flex-1 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                                           >
                                               {t('use_url')}
                                           </button>
                                           <button
                                               onClick={() => { setShowImageUrlInput(false); setImageUrlInput(""); }}
                                               className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-all"
                                           >
                                               {t('cancel')}
                                           </button>
                                       </div>
                                   </div>
                               </div>
                           )}
              </div>
            </div>
          </div>

            <BanksSidebar 
              mobileTab={mobileTab}
              isBanksDrawerOpen={isBanksDrawerOpen}
              setIsBanksDrawerOpen={setIsBanksDrawerOpen}
              bankSidebarWidth={bankSidebarWidth}
              sidebarRef={sidebarRef}
              startResizing={startResizing}
              setIsCategoryManagerOpen={setIsCategoryManagerOpen}
              categories={categories}
              banks={banks}
              insertVariableToTemplate={insertVariableToTemplate}
              handleDeleteOption={handleDeleteOption}
              handleAddOption={handleAddOption}
              handleDeleteBank={handleDeleteBank}
              handleUpdateBankCategory={handleUpdateBankCategory}
              handleStartAddBank={handleStartAddBank}
              t={t}
              language={templateLanguage}
              isDarkMode={isDarkMode}
              onTouchDragStart={onTouchDragStart}
              globalContainerStyle={globalContainerStyle}
            />
          </div>
        )}
      </div>
      <ShareImportModal
        isOpen={showShareImportModal}
        templateData={sharedTemplateData}
        onClose={() => setShowShareImportModal(false)}
        onImport={handleImportSharedTemplate}
        t={t}
        TAG_STYLES={TAG_STYLES}
        displayTag={displayTag}
        isDarkMode={isDarkMode}
        language={language}
      />
      <ShareOptionsModal
        isOpen={showShareOptionsModal && !!activeTemplate}
        onClose={() => setShowShareOptionsModal(false)}
        onCopyLink={doCopyShareLink}
        onCopyToken={handleShareToken}
        isGenerating={isGenerating}
        isDarkMode={isDarkMode}
        language={language}
      />
      <ImportTokenModal
        isOpen={showImportTokenModal}
        onClose={() => {
          setShowImportTokenModal(false);
          setImportTokenValue("");
        }}
        tokenValue={importTokenValue}
        onTokenChange={(value) => setImportTokenValue(value)}
        onConfirm={() => {
          handleManualTokenImport(importTokenValue);
          setShowImportTokenModal(false);
          setImportTokenValue("");
        }}
        isDarkMode={isDarkMode}
        language={language}
        confirmText={t("confirm")}
      />

      {/* --- Add Bank Modal --- */}
      <AddBankModal
        isOpen={isAddingBank}
        onClose={() => setIsAddingBank(false)}
        t={t}
        categories={categories}
        newBankLabel={newBankLabel}
        setNewBankLabel={setNewBankLabel}
        newBankKey={newBankKey}
        setNewBankKey={setNewBankKey}
        newBankCategory={newBankCategory}
        setNewBankCategory={setNewBankCategory}
        onConfirm={handleAddBank}
        isDarkMode={isDarkMode}
      />

      {/* --- Image Preview Modal --- */}
      <ImagePreviewModal
        zoomedImage={zoomedImage}
        templates={templates}
        language={language}
        setLanguage={setLanguage}
        t={t}
        TAG_STYLES={TAG_STYLES}
        displayTag={displayTag}
        setActiveTemplateId={setActiveTemplateId}
        setDiscoveryView={setDiscoveryView}
        setZoomedImage={setZoomedImage}
        setMobileTab={setMobileTab}
        handleRefreshSystemData={handleRefreshSystemData}
        setIsSettingsOpen={setIsSettingsOpen}
        isDarkMode={isDarkMode}
      />

      {/* --- 更新通知组件 --- */}
      <DataUpdateNotice
        isOpen={showDataUpdateNotice}
        onLater={() => {
          setLastAppliedDataVersion(SYSTEM_DATA_VERSION);
          setShowDataUpdateNotice(false);
        }}
        onUpdate={handleAutoUpdate}
        t={t}
      />

      <AppUpdateNotice
        isOpen={showAppUpdateNotice}
        noticeType={updateNoticeType}
        onRefresh={() => {
          // 如果是数据更新，也可以尝试直接触发更新逻辑
          if (updateNoticeType === 'data') {
            handleAutoUpdate();
            setShowAppUpdateNotice(false);
          } else {
            window.location.reload();
          }
        }}
        onClose={() => setShowAppUpdateNotice(false)}
        t={t}
      />

      {/* 移动端底部导航栏 */}
      {isMobileDevice && (
        <MobileBottomNav
          mobileTab={mobileTab}
          setMobileTab={setMobileTab}
          setDiscoveryView={handleSetDiscoveryView}
          setZoomedImage={setZoomedImage}
          setIsTemplatesDrawerOpen={setIsTemplatesDrawerOpen}
          setIsBanksDrawerOpen={setIsBanksDrawerOpen}
          isDarkMode={isDarkMode}
          themeMode={themeMode}
          setThemeMode={setThemeMode}
          templates={templates}
          activeTemplateId={activeTemplateId}
          setActiveTemplateId={setActiveTemplateId}
        />
      )}
      <Analytics />
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleUploadImage} 
        className="hidden" 
        accept="image/*" 
      />
    </div>
  );
};

export default App;