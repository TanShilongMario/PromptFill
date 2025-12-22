import React, { useState, useRef, useEffect } from 'react';
import { Copy, Plus, X, Settings, Check, Edit3, Eye, Trash2, FileText, Pencil, Copy as CopyIcon, Globe, ChevronDown, ChevronUp, ChevronRight, GripVertical, Download, Image as ImageIcon, List, Undo, Redo, Maximize2, RotateCcw, LayoutGrid, Sidebar, Search, ArrowRight, User, ArrowUpRight, ArrowUpDown, RefreshCw, Sparkles } from 'lucide-react';
import html2canvas from 'html2canvas';

// ====== 导入数据配置 ======
import { INITIAL_TEMPLATES_CONFIG, TEMPLATE_TAGS, SYSTEM_DATA_VERSION } from './data/templates';
import { INITIAL_BANKS, INITIAL_DEFAULTS, INITIAL_CATEGORIES } from './data/banks';

// ====== 导入常量配置 ======
import { TRANSLATIONS } from './constants/translations';
import { PREMIUM_STYLES, CATEGORY_STYLES, TAG_STYLES, TAG_LABELS } from './constants/styles';
import { MASONRY_STYLES } from './constants/masonryStyles';

// ====== 导入工具函数 ======
import { deepClone, makeUniqueKey, waitForImageLoad } from './utils/helpers';
import { mergeTemplatesWithSystem, mergeBanksWithSystem } from './utils/merge';
import { SCENE_WORDS, STYLE_WORDS } from './constants/slogan';

// ====== 导入自定义 Hooks ======
import { useStickyState } from './hooks/useStickyState';

// ====== 导入 UI 组件 ======
import { Variable, VisualEditor, PremiumButton, EditorToolbar, Lightbox, TemplatePreview, TemplatesSidebar, BanksSidebar, CategoryManager, InsertVariableModal, AddBankModal, DiscoveryView } from './components';

// --- 组件：动态 Slogan (PC端) ---
const AnimatedSlogan = React.memo(({ isActive }) => {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [styleIndex, setStyleIndex] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const sceneTimer = setInterval(() => {
      setSceneIndex(prev => (prev + 1) % SCENE_WORDS.length);
    }, 2000);
    const styleTimer = setInterval(() => {
      setStyleIndex(prev => (prev + 1) % STYLE_WORDS.length);
    }, 2500);
    return () => {
      clearInterval(sceneTimer);
      clearInterval(styleTimer);
    };
  }, [isActive]);

  return (
    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-3 text-base md:text-lg lg:text-xl text-gray-700 font-medium font-['MiSans',system-ui,sans-serif] px-2 leading-relaxed min-h-[60px]">
      <span className="whitespace-nowrap">"展示一個精緻的、微縮</span>
      <div className="inline-flex items-center justify-center min-w-[120px]">
        <span
          key={`style-${styleIndex}`}
          className="inline-block px-4 py-1.5 md:px-5 md:py-2 rounded-full transition-all duration-500 select-none font-bold text-white whitespace-nowrap"
          style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
            boxShadow: 'inset 0px 2px 4px 0px rgba(255, 255, 255, 0.2), 0 4px 12px rgba(96, 165, 250, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)',
            animation: 'fadeIn 0.5s ease-out'
          }}
        >
          {STYLE_WORDS[styleIndex]}
                </span>
        </div>
      <span className="whitespace-nowrap">的</span>
      <div className="inline-flex items-center justify-center min-w-[120px]">
        <span
          key={`scene-${sceneIndex}`}
          className="inline-block px-4 py-1.5 md:px-5 md:py-2 rounded-full transition-all duration-500 select-none font-bold text-white whitespace-nowrap"
          style={{
            background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
            boxShadow: 'inset 0px 2px 4px 0px rgba(255, 255, 255, 0.2), 0 4px 12px rgba(251, 146, 60, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)',
            animation: 'fadeIn 0.5s ease-out'
          }}
        >
          {SCENE_WORDS[sceneIndex]}
        </span>
            </div>
      <span className="whitespace-nowrap">場景"</span>
    </div>
  );
});

// --- 组件：动态 Slogan (移动端) ---
const MobileAnimatedSlogan = React.memo(({ isActive }) => {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [styleIndex, setStyleIndex] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const sceneTimer = setInterval(() => {
      setSceneIndex(prev => (prev + 1) % SCENE_WORDS.length);
    }, 2000);
    const styleTimer = setInterval(() => {
      setStyleIndex(prev => (prev + 1) % STYLE_WORDS.length);
    }, 2500);
    return () => {
      clearInterval(sceneTimer);
      clearInterval(styleTimer);
    };
  }, [isActive]);

    return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 text-sm text-gray-700 font-medium mb-3 min-h-[32px]">
      <span className="whitespace-nowrap">"展示</span>
      <div className="inline-flex items-center justify-center min-w-[80px]">
        <span
          key={`style-m-${styleIndex}`}
          className="inline-block px-2.5 py-0.5 rounded-full font-bold text-white text-xs whitespace-nowrap"
          style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
            boxShadow: '0 2px 8px rgba(96, 165, 250, 0.3)',
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          {STYLE_WORDS[styleIndex]}
        </span>
                    </div>
      <span className="whitespace-nowrap">的</span>
      <div className="inline-flex items-center justify-center min-w-[80px]">
        <span
          key={`scene-m-${sceneIndex}`}
          className="inline-block px-2.5 py-0.5 rounded-full font-bold text-white text-xs whitespace-nowrap"
          style={{
            background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
            boxShadow: '0 2px 8px rgba(251, 146, 60, 0.3)',
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          {SCENE_WORDS[sceneIndex]}
        </span>
                            </div>
      <span className="whitespace-nowrap">場景"</span>
        </div>
    );
});

// ====== 以下元件保留在此檔案中 ======
// CategorySection, BankGroup, CategoryManager, InsertVariableModal, App

// --- 元件：可折疊的分類區塊 (New Component) ---
// ====== 核心元件區 (已提取至獨立檔案) ======
// Poster View Animated Slogan Constants - 已移至 constants/slogan.js

const App = () => {
  // 临时功能：瀑布流样式管理
  const [masonryStyleKey, setMasonryStyleKey] = useState('poster');
  const [isStyleMenuOpen, setIsStyleMenuOpen] = useState(false);
  const currentMasonryStyle = MASONRY_STYLES[masonryStyleKey] || MASONRY_STYLES.default;

  // Global State with Persistence
  // bump version keys to強制重新整理新增詞庫與預設值
  const [banks, setBanks] = useStickyState(INITIAL_BANKS, "app_banks_v9");
  const [defaults, setDefaults] = useStickyState(INITIAL_DEFAULTS, "app_defaults_v9");
  const [language, setLanguage] = useStickyState("zh-tw", "app_language_v1");
  const [categories, setCategories] = useStickyState(INITIAL_CATEGORIES, "app_categories_v1"); // New state

  const [templates, setTemplates] = useStickyState(INITIAL_TEMPLATES_CONFIG, "app_templates_v10");
  const [activeTemplateId, setActiveTemplateId] = useStickyState("tpl_default", "app_active_template_id_v4");

  // 更新检测状态
  const [lastAppliedVersion, setLastAppliedVersion] = useStickyState("", "app_system_version_v1");
  const [showUpdateNotice, setShowUpdateNotice] = useState(false);
  const [showAppUpdateNotice, setShowAppUpdateNotice] = useState(false);

  // UI State
  const [bankSidebarWidth, setBankSidebarWidth] = useStickyState(420, "app_bank_sidebar_width_v1"); // Default width increased to 420px for 2-column layout
  const [isResizing, setIsResizing] = useState(false);

  // 检测是否为移动设备
  const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;
  const [mobileTab, setMobileTab] = useState(isMobileDevice ? "home" : "editor"); // 'home', 'templates', 'editor', 'banks'

  const [isEditing, setIsEditing] = useState(false);
  const [activePopover, setActivePopover] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false); // New UI state
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false); // New UI state for Insert Picker
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false); // New UI state for Lightbox

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
  const [imageUrlInput, setImageUrlInput] = useState("");
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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // 移动端：首页是否展示完全由 mobileTab 控制，避免 isDiscoveryView 残留导致其它 Tab 白屏
  // 桌面端：保持现有 isDiscoveryView 行为（不影响已正常的桌面端）
  const showDiscoveryOverlay = isMobileDevice ? mobileTab === "home" : isDiscoveryView;

  // Template Sort State
  const [sortOrder, setSortOrder] = useState("newest"); // newest, oldest, a-z, z-a, random
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [randomSeed, setRandomSeed] = useState(Date.now()); // 用于随机排序的种子

  // 检查系统模板更新
  useEffect(() => {
    if (SYSTEM_DATA_VERSION && lastAppliedVersion !== SYSTEM_DATA_VERSION) {
      // 检查是否有存储的数据。如果是第一次使用（无数据），直接静默更新版本号
      const hasTemplates = localStorage.getItem("app_templates_v10");
      const hasBanks = localStorage.getItem("app_banks_v9");

      if (hasTemplates || hasBanks) {
        setShowUpdateNotice(true);
      } else {
        setLastAppliedVersion(SYSTEM_DATA_VERSION);
      }
    }
  }, [lastAppliedVersion]);

  // 检查应用代码版本更新
  useEffect(() => {
    const checkAppUpdate = async () => {
      try {
        const response = await fetch('/version.json?t=' + Date.now());
        if (response.ok) {
          const data = await response.json();
          // 如果远程版本号大于当前代码版本号，说明有新部署
          if (data.version && data.version !== SYSTEM_DATA_VERSION) {
            setShowAppUpdateNotice(true);
          }
        }
      } catch (e) {
        // 静默失敗
      }
    };

    checkAppUpdate();
    const timer = setInterval(checkAppUpdate, 5 * 60 * 1000); // 5分钟检查一次

    return () => clearInterval(timer);
  }, []);

  // History State for Undo/Redo
  const [historyPast, setHistoryPast] = useState([]);
  const [historyFuture, setHistoryFuture] = useState([]);
  const historyLastSaveTime = useRef(0);

  const popoverRef = useRef(null);
  const textareaRef = useRef(null);
  const sidebarRef = useRef(null);
  const posterScrollRef = useRef(null);

  // Poster Mode Auto Scroll State
  const [isPosterAutoScrollPaused, setIsPosterAutoScrollPaused] = useState(false);

  // Helper: Translate
  const t = (key, params = {}) => {
    let str = TRANSLATIONS[language]?.[key] || key;
    Object.keys(params).forEach(k => {
        str = str.replace(`{{${k}}}`, params[k]);
    });
    return str;
  };

  const displayTag = (tag) => {
    return TAG_LABELS[language]?.[tag] || tag;
  };

  // 确保有一个有效的 activeTemplateId - 自动选择第一个模板
  useEffect(() => {
      if (templates.length > 0) {
          // 检查当前 activeTemplateId 是否有效
          const currentTemplateExists = templates.some(t => t.id === activeTemplateId);
          if (!currentTemplateExists || !activeTemplateId) {
              // 如果当前选中的模板不存在或为空，选择第一个模板
              console.log('[自動選擇] 選擇第一個模板:', templates[0].id);
              setActiveTemplateId(templates[0].id);
          }
      }
  }, [templates, activeTemplateId]);  // 依赖 templates 和 activeTemplateId

  // 移动端：切换 Tab 时的状态保障
  useEffect(() => {
      // 模板 Tab：强制收起模式 + 列表视图
      if (mobileTab === 'templates') {
          setMasonryStyleKey('list');
      }

      // 编辑 / 詞庫 Tab：确保有选中的模板
      if ((mobileTab === 'editor' || mobileTab === 'banks') && templates.length > 0 && !activeTemplateId) {
          console.log('[tab切換] 自動選擇第一個模板:', templates[0].id);
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
                  console.error('恢復資料夾句柄失敗:', error);
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
          console.error('儲存資料夾句柄失敗:', error);
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
          console.error('取得資料夾句柄失敗:', error);
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

  // Derived State: Current Active Template
  const activeTemplate = templates.find(t => t.id === activeTemplateId) || templates[0];

  // --- Effects ---
  // Reset history when template changes
  useEffect(() => {
      setHistoryPast([]);
      setHistoryFuture([]);
      historyLastSaveTime.current = 0;
  }, [activeTemplateId]);

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
  // Poster Mode Auto Scroll
  useEffect(() => {
    if (masonryStyleKey !== 'poster' || !posterScrollRef.current || isPosterAutoScrollPaused || !isDiscoveryView) {
      return;
    }

    const scrollContainer = posterScrollRef.current;
    let scrollDirection = 1; // 1 = down, -1 = up
    const scrollSpeed = 0.5; // 每次滚动的像素数
    const scrollInterval = 30; // 毫秒

    const autoScroll = setInterval(() => {
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
    }, scrollInterval);

    return () => clearInterval(autoScroll);
  }, [masonryStyleKey, isPosterAutoScrollPaused]);

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

  const handleAddTemplate = () => {
    const newId = `tpl_${Date.now()}`;
    const newTemplate = {
      id: newId,
      name: t('new_template_name'),
      author: "",
      content: t('new_template_content'),
      selections: {},
      tags: []
    };
    setTemplates([...templates, newTemplate]);
    setActiveTemplateId(newId);
    setIsEditing(true);
    // 在移动端自动切换到编辑Tab
    if (isMobileDevice) {
      setMobileTab('editor');
    }
  };

  const handleDuplicateTemplate = (t_item, e) => {
      e.stopPropagation();
      const newId = `tpl_${Date.now()}`;
      const newTemplate = {
          ...t_item,
          id: newId,
          name: `${t_item.name}${t('copy_suffix')}`,
          author: t_item.author || "",
          selections: { ...t_item.selections }
      };
      setTemplates([...templates, newTemplate]);
      setActiveTemplateId(newId);
      // 在移动端自动切换到编辑Tab
      if (isMobileDevice) {
        setMobileTab('editor');
      }
  };

  const handleDeleteTemplate = (id, e) => {
    e.stopPropagation();
    if (templates.length <= 1) {
      alert(t('alert_keep_one'));
      return;
    }
    if (window.confirm(t('confirm_delete_template'))) {
      const newTemplates = templates.filter(t => t.id !== id);
      setTemplates(newTemplates);
      if (activeTemplateId === id) {
        setActiveTemplateId(newTemplates[0].id);
      }
    }
  };

  const handleResetTemplate = (id, e) => {
    e.stopPropagation();
    if (!window.confirm(t('confirm_reset_template'))) return;

    const original = INITIAL_TEMPLATES_CONFIG.find(t => t.id === id);
    if (!original) return;

    setTemplates(prev => prev.map(t =>
      t.id === id ? JSON.parse(JSON.stringify(original)) : t
    ));
  };

  const startRenamingTemplate = (t, e) => {
    e.stopPropagation();
    setEditingTemplateNameId(t.id);
    setTempTemplateName(t.name);
    setTempTemplateAuthor(t.author || "");
  };

  const saveTemplateName = () => {
    if (tempTemplateName.trim()) {
      setTemplates(prev => prev.map(t =>
        t.id === editingTemplateNameId ? { ...t, name: tempTemplateName, author: tempTemplateAuthor } : t
      ));
    }
    setEditingTemplateNameId(null);
  };

  // 重新整理系统模板与詞庫，保留用户数据
  const handleRefreshSystemData = () => {
    const backupSuffix = t('refreshed_backup_suffix') || '';
    const templateResult = mergeTemplatesWithSystem(templates, { backupSuffix });
    const bankResult = mergeBanksWithSystem(banks, defaults, { backupSuffix });

    setTemplates(templateResult.templates);
    setBanks(bankResult.banks);
    setDefaults(bankResult.defaults);
    setActiveTemplateId(prev => templateResult.templates.some(t => t.id === prev) ? prev : "tpl_default");

    const notes = [...templateResult.notes, ...bankResult.notes];
    if (notes.length > 0) {
      alert(`${t('refresh_done_with_conflicts')}\n- ${notes.join('\n- ')}`);
    } else {
      alert(t('refresh_done_no_conflict'));
    }
  };

  const handleAutoUpdate = () => {
    handleRefreshSystemData();
    setLastAppliedVersion(SYSTEM_DATA_VERSION);
    setShowUpdateNotice(false);
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

  // Filter templates based on search and tags
  const filteredTemplates = React.useMemo(() => {
    return templates.filter(t => {
    // Search filter
    const matchesSearch = !searchQuery ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase());

    // Tag filter
    const matchesTags = selectedTags === "" ||
      (t.tags && t.tags.includes(selectedTags));

    return matchesSearch && matchesTags;
  }).sort((a, b) => {
    // Sort templates based on sortOrder
    switch(sortOrder) {
      case 'newest':
        // Assuming templates array index as chronological order (newer = later in array)
        return templates.indexOf(b) - templates.indexOf(a);
      case 'oldest':
        return templates.indexOf(a) - templates.indexOf(b);
      case 'a-z':
        return a.name.localeCompare(b.name, 'zh-CN');
      case 'z-a':
        return b.name.localeCompare(a.name, 'zh-CN');
      case 'random':
        // 使用模板ID和随机种子生成伪随机数进行排序
        const hashA = (a.id + randomSeed).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const hashB = (b.id + randomSeed).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return hashA - hashB;
      default:
        return 0;
    }
  });
  }, [templates, searchQuery, selectedTags, sortOrder, randomSeed]);

  const fileInputRef = useRef(null);

  const handleUploadImage = (e) => {
      try {
          const file = e.target.files?.[0];
          if (!file) return;

          // 验证文件类型
          if (!file.type.startsWith('image/')) {
              if (storageMode === 'browser') {
                  alert('請選擇圖片檔案');
              }
              return;
          }

          // 移除文件大小限制，让用户自由上传
          // 如果超出localStorage限制，会在useStickyState中捕获并提示

          const reader = new FileReader();

          reader.onloadend = () => {
              try {
                  setTemplates(prev => prev.map(t =>
                      t.id === activeTemplateId ? { ...t, imageUrl: reader.result } : t
                  ));
              } catch (error) {
                  console.error('圖片上傳失敗:', error);
                  if (storageMode === 'browser' && error.name === 'QuotaExceededError') {
                      alert('儲存空間不足！圖片過大。\n建議：\n1. 使用圖片連結（URL）方式\n2. 壓縮圖片（tinypng.com）\n3. 匯出備份後清空資料');
                  } else {
                      if (storageMode === 'browser') {
                          alert('圖片上傳失敗，請重試');
                      }
                  }
              }
          };

          reader.onerror = () => {
              console.error('檔案讀取失敗');
              if (storageMode === 'browser') {
                  alert('檔案讀取失敗，請重試');
              }
          };

          reader.readAsDataURL(file);
      } catch (error) {
          console.error('上傳圖片出錯:', error);
          if (storageMode === 'browser') {
              alert('上傳圖片出錯，請重試');
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
      if (defaultUrl) {
          setTemplates(prev => prev.map(t =>
              t.id === activeTemplateId ? { ...t, imageUrl: defaultUrl } : t
          ));
      }
  };

  const handleSetImageUrl = () => {
      if (!imageUrlInput.trim()) return;

      setTemplates(prev => prev.map(t =>
          t.id === activeTemplateId ? { ...t, imageUrl: imageUrlInput } : t
      ));
      setImageUrlInput("");
      setShowImageUrlInput(false);
  };

  // --- 导出/导入功能 ---
  const handleExportTemplate = async (template) => {
      try {
          const dataStr = JSON.stringify(template, null, 2);
          const dataBlob = new Blob([dataStr], { type: 'application/json' });
          const filename = `${template.name.replace(/\s+/g, '_')}_template.json`;

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
                          title: template.name,
                          text: '匯出的提示詞模板'
                      });
                      showToastMessage('✅ 模板已分享/儲存');
                      return;
                  }
              } catch (shareError) {
                  console.log('Web Share API 失敗，使用降級方案', shareError);
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

          showToastMessage('✅ 模板已匯出');
      } catch (error) {
          console.error('匯出失敗:', error);
          alert('匯出失敗，請重試');
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
                          title: '提示詞填空器備份',
                          text: '所有模板和詞庫的完整備份'
                      });
                      showToastMessage('✅ 備份已分享/儲存');
                      return;
                  }
              } catch (shareError) {
                  console.log('Web Share API 失敗，使用降級方案', shareError);
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

          showToastMessage('✅ 備份已匯出');
      } catch (error) {
          console.error('匯出失敗:', error);
          alert('匯出失敗，請重試');
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
                  if (window.confirm('檢測到完整備份檔案。是否要覆蓋當前所有資料？')) {
                      setTemplates(data.templates);
                      if (data.banks) setBanks(data.banks);
                      if (data.categories) setCategories(data.categories);
                      alert('匯入成功！');
                  }
              } else if (data.id && data.name) {
                  // 单个模板
                  const newId = `tpl_${Date.now()}`;
                  const newTemplate = { ...data, id: newId };
                  setTemplates(prev => [...prev, newTemplate]);
                  setActiveTemplateId(newId);
                  alert('模板匯入成功！');
              } else {
                  alert('檔案格式不正確');
              }
          } catch (error) {
              console.error('匯入失敗:', error);
              alert('匯入失敗，請檢查檔案格式');
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
          console.error('選擇資料夾失敗:', error);
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

          console.log('資料已儲存到本地資料夾');
      } catch (error) {
          console.error('儲存到檔案系統失敗:', error);
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

          console.log('從本地資料夾載入資料成功');
      } catch (error) {
          console.error('從檔案系統讀取失敗:', error);
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

  const handleClearAllData = () => {
      if (window.confirm(t('confirm_clear_all'))) {
          try {
              // 只清除应用相关的数据
              const keysToRemove = Object.keys(localStorage).filter(key =>
                  key.startsWith('app_')
              );
              keysToRemove.forEach(key => localStorage.removeItem(key));

              // 重新整理页面
              window.location.reload();
          } catch (error) {
              console.error('清除資料失敗:', error);
              alert('清除資料失敗');
          }
      }
  };

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
          console.error('清除資料夾句柄失敗:', error);
      }
  };

  const handleManualLoadFromFolder = async () => {
      if (directoryHandle) {
          try {
              await loadFromFileSystem(directoryHandle);
              alert('從資料夾載入成功！');
          } catch (error) {
              alert('從資料夾載入失敗，請檢查檔案是否存在');
          }
      }
  };

  const updateActiveTemplateContent = React.useCallback((newContent, forceSaveHistory = false) => {
    // History Management
    const now = Date.now();
    const shouldSave = forceSaveHistory || (now - historyLastSaveTime.current > 1000);

    if (shouldSave) {
        setHistoryPast(prev => [...prev, activeTemplate.content]);
        setHistoryFuture([]); // Clear redo stack on new change
        historyLastSaveTime.current = now;
    }

    setTemplates(prev => prev.map(t =>
      t.id === activeTemplateId ? { ...t, content: newContent } : t
    ));
  }, [activeTemplate.content, activeTemplateId, setTemplates]);

  const handleUndo = React.useCallback(() => {
      if (historyPast.length === 0) return;

      const previous = historyPast[historyPast.length - 1];
      const newPast = historyPast.slice(0, -1);

      setHistoryFuture(prev => [activeTemplate.content, ...prev]);
      setHistoryPast(newPast);

      // Direct update without saving history again
      setTemplates(prev => prev.map(t =>
        t.id === activeTemplateId ? { ...t, content: previous } : t
      ));
  }, [activeTemplate.content, activeTemplateId, historyPast, setTemplates]);

  const handleRedo = React.useCallback(() => {
      if (historyFuture.length === 0) return;

      const next = historyFuture[0];
      const newFuture = historyFuture.slice(1);

      setHistoryPast(prev => [...prev, activeTemplate.content]);
      setHistoryFuture(newFuture);

      // Direct update without saving history again
      setTemplates(prev => prev.map(t =>
        t.id === activeTemplateId ? { ...t, content: next } : t
      ));
  }, [activeTemplate.content, activeTemplateId, historyFuture, setTemplates]);

  const updateActiveTemplateSelection = React.useCallback((uniqueKey, value) => {
    setTemplates(prev => prev.map(t => {
      if (t.id === activeTemplateId) {
        return {
          ...t,
          selections: { ...t.selections, [uniqueKey]: value }
        };
      }
      return t;
    }));
  }, [activeTemplateId, setTemplates]);

  // --- Bank Actions ---

  const handleSelect = React.useCallback((key, index, value) => {
    const uniqueKey = `${key}-${index}`;
    updateActiveTemplateSelection(uniqueKey, value);
    setActivePopover(null);
  }, [updateActiveTemplateSelection]);

  const handleAddCustomAndSelect = React.useCallback((key, index, newValue) => {
    if (!newValue || !newValue.trim()) return;

    // 1. Add to bank if not exists
    if (!banks[key].options.includes(newValue)) {
        handleAddOption(key, newValue);
    }

    // 2. Select it
    handleSelect(key, index, newValue);
  }, [banks, handleSelect]);

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

  const handleDeleteOption = React.useCallback((key, optionToDelete) => {
    setBanks(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        options: prev[key].options.filter(opt => opt !== optionToDelete)
      }
    }));
  }, [setBanks]);

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
    if (window.confirm(t('confirm_delete_bank', { name: banks[key].label }))) {
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

  const insertVariableToTemplate = (key) => {
    const textToInsert = ` {{${key}}} `;

    if (!isEditing) {
      setIsEditing(true);
      setTimeout(() => {
        updateActiveTemplateContent(activeTemplate.content + textToInsert, true);
        // Simple scroll to bottom hack
        if(textareaRef.current) textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
      }, 50);
      return;
    };

    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = activeTemplate.content;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);

    updateActiveTemplateContent(`${before}${textToInsert}${after}`, true);

    setTimeout(() => {
      textarea.focus();
      const newPos = start + textToInsert.length;
      textarea.setSelectionRange(newPos, newPos);
    }, 0);
  };

  const handleCopy = () => {
    let finalString = activeTemplate.content;
    const counters = {};

    finalString = finalString.replace(/{{(.*?)}}/g, (match, key) => {
        const k = key.trim();
        const idx = counters[k] || 0;
        counters[k] = idx + 1;

        const uniqueKey = `${k}-${idx}`;
        // Prioritize selection, then default
        return activeTemplate.selections[uniqueKey] || defaults[k] || match;
    });

    const cleanText = finalString
        .replace(/###\s/g, '')
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\n\s*\n/g, '\n\n');

    navigator.clipboard.writeText(cleanText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  const handleExportImage = async () => {
    const element = document.getElementById('preview-card');
    if (!element) return;

    setIsExporting(true);

    // --- 关键修复：预处理图片为 Base64 ---
    // 这能彻底解决 html2canvas 的跨域 (CORS) 和图片加载不全问题
    // 我们手动 fetch 图片 blob 并转为 base64，绕过 canvas 的跨域限制
    const templateDefault = INITIAL_TEMPLATES_CONFIG.find(t => t.id === activeTemplateId);
    const originalImageSrc = activeTemplate.imageUrl || templateDefault?.imageUrl || "";
    let tempBase64Src = null;
    const imgElement = element.querySelector('img');

    if (imgElement && originalImageSrc) {
        // 如果当前 img 没有正确的 src，先补上默认 src
        if (!imgElement.src || imgElement.src.trim() === "" || imgElement.src.includes("data:image") === false) {
          imgElement.src = originalImageSrc;
        }
    }

    if (imgElement && originalImageSrc && originalImageSrc.startsWith('http')) {
        try {
            // 尝试通过 fetch 获取图片数据
            const response = await fetch(originalImageSrc);
            const blob = await response.blob();
            tempBase64Src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            });

            // 临时替换为 Base64
            imgElement.src = tempBase64Src;
            await waitForImageLoad(imgElement);
        } catch (e) {
            console.warn("圖片 Base64 轉換失敗，嘗試直接匯出", e);
            // 如果 fetch 失敗（比如彻底的 CORS 封锁），我们只能尝试允许 canvas 污染
            // 但通常 fetch 失敗意味着 canvas 也会失敗
        }
    } else if (imgElement) {
        // 即便没转 base64，也要确保当前展示图已加载完成
        await waitForImageLoad(imgElement);
    }

    // 预加载二维码（使用本地文件并转换为 base64）
    const websiteUrl = 'https://promptfill.tanshilong.com/';
    const localQrCodePath = '/QRCode.png';
    let qrCodeBase64 = null;

    try {
        console.log('正在載入本地二維碼...', localQrCodePath);
        const qrResponse = await fetch(localQrCodePath);
        if (!qrResponse.ok) throw new Error('本地二維碼載入失敗');
        const qrBlob = await qrResponse.blob();
        qrCodeBase64 = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log('本地二維碼載入成功');
                resolve(reader.result);
            };
            reader.readAsDataURL(qrBlob);
        });
    } catch (e) {
        console.error("本地二維碼載入失敗", e);
        // 即使失敗也继续，会显示占位符
    }

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
                   const titleText = titleElement ? titleElement.textContent.trim() : activeTemplate.name;
                   const contentElement = card.querySelector('#final-prompt-content');
                   const contentHTML = contentElement ? contentElement.innerHTML : '';

                   console.log('正文內容取得:', contentHTML ? '成功' : '失敗', contentHTML.length);

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
                       contentContainer.style.color = '#374151';
                       contentContainer.style.marginBottom = '40px';

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
                           v.style.color = '#ffffff'; // 确保文字是白色
                           v.style.border = 'none'; // 导出时去掉半透明边框，减少干扰
                       });

                       card.appendChild(contentContainer);
                   }

                   // --- 4. 底部水印区域（增加版本号）---
                   const footer = clonedDoc.createElement('div');
                   footer.style.marginTop = '40px';
                   footer.style.paddingTop = '25px';
                   footer.style.paddingBottom = '15px';
                   footer.style.borderTop = '2px solid #e2e8f0';
                   footer.style.display = 'flex';
                   footer.style.justifyContent = 'space-between';
                   footer.style.alignItems = 'center';
                   footer.style.fontFamily = 'sans-serif';

                   const qrCodeHtml = qrCodeBase64
                       ? `<img src="${qrCodeBase64}"
                               style="width: 80px; height: 80px; border: 3px solid #e2e8f0; border-radius: 8px; display: block; background: white;"
                               alt="QR Code" />`
                       : `<div style="width: 80px; height: 80px; border: 3px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #f8fafc; font-size: 10px; color: #94a3b8; font-weight: 500;">QR Code</div>`;

                   footer.innerHTML = `
                       <div style="flex: 1; padding-right: 20px;">
                           <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; flex-wrap: wrap;">
                               <div style="font-size: 15px; font-weight: 600; color: #1f2937;">
                                   Generated by <span style="color: #6366f1; font-weight: 700;">Prompt Fill</span>
                               </div>
                               ${versionText ? `<span style="font-size: 11px; padding: 3px 10px; background: #fff7ed; color: #f97316; border-radius: 5px; font-weight: 600; border: 1px solid #fed7aa;">${versionText}</span>` : ''}
                           </div>
                           <div style="font-size: 12px; color: #6b7280; margin-bottom: 6px; font-weight: 500;">提示词填空器</div>
                           <div style="font-size: 11px; color: #3b82f6; font-weight: 500; background: #eff6ff; padding: 4px 8px; border-radius: 4px; display: inline-block; letter-spacing: 0.3px;">
                               ${websiteUrl}
                           </div>
                       </div>
                       <div style="display: flex; align-items: center;">
                           <div style="text-align: center;">
                               ${qrCodeHtml}
                               <div style="font-size: 9px; color: #94a3b8; margin-top: 4px; font-weight: 500;">扫码访问</div>
                           </div>
                       </div>
                   `;

                   card.appendChild(footer);
                   console.log('新佈局已應用');
                }
            }
        });

        // 使用 JPG 格式，质量 0.92（高质量同时节省空间）
        const image = canvas.toDataURL('image/jpeg', 0.92);
        const filename = `${activeTemplate.name.replace(/\s+/g, '_')}_prompt.jpg`;

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
                        title: activeTemplate.name,
                        text: '匯出的提示詞模板'
                    });
                    showToastMessage('✅ 圖片已分享，請選擇"儲存圖像"存到相簿');
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
                                    <title>${activeTemplate.name}</title>
                                    <style>
                                        body { margin: 0; padding: 20px; background: #000; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
                                        img { max-width: 100%; height: auto; }
                                        .tip { position: fixed; top: 10px; left: 50%; transform: translateX(-50%); background: rgba(255,255,255,0.95); padding: 12px 20px; border-radius: 8px; color: #333; font-size: 14px; box-shadow: 0 2px 10px rgba(0,0,0,0.2); z-index: 1000; }
                                    </style>
                                </head>
                                <body>
                                    <div class="tip">长按图片保存到相册 📱</div>
                                    <img src="${image}" alt="${activeTemplate.name}" />
                                </body>
                                </html>
                            `);
                            showToastMessage('✅ 請在新頁面長按圖片保存');
                        } else {
                            // 如果无法打开新窗口，尝试下载
                            const link = document.createElement('a');
                            link.href = image;
                            link.download = filename;
                            link.target = '_blank';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            showToastMessage('✅ 圖片已匯出，請在新頁面保存');
                        }
                    } else {
                        // 安卓等其他移动设备：触发下载
                        const link = document.createElement('a');
                        link.href = image;
                        link.download = filename;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        showToastMessage('✅ 圖片已儲存到下載資料夾');
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
                            <head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${activeTemplate.name}</title></head>
                            <body style="margin:0;padding:20px;background:#000;text-align:center;">
                                <p style="color:#fff;margin-bottom:20px;">长按图片保存到相册 📱</p>
                                <img src="${image}" style="max-width:100%;height:auto;" />
                            </body>
                            </html>
                        `);
                    }
                    showToastMessage('⚠️ 請在新頁面長按圖片保存');
                } else {
                    const link = document.createElement('a');
                    link.href = image;
                    link.download = filename;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    showToastMessage('✅ 圖片已儲存');
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
            showToastMessage('✅ 圖片匯出成功！');
        }
    } catch (err) {
        console.error("Export failed:", err);
        showToastMessage('❌ 匯出失敗，請重試');
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

  // --- Renderers ---

        return (
    <div className="flex flex-col md:flex-row h-screen w-screen bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] font-sans text-slate-800 overflow-hidden md:p-4 md:gap-4 relative">

      {/* Discovery View (Full Screen Overlay) */}
      {showDiscoveryOverlay ? (
        <DiscoveryView
          filteredTemplates={filteredTemplates}
          setActiveTemplateId={setActiveTemplateId}
          setDiscoveryView={(val) => {
            setDiscoveryView(val);
            if (!val && mobileTab === 'home') setMobileTab('editor');
          }}
          setZoomedImage={setZoomedImage}
          posterScrollRef={posterScrollRef}
          setIsPosterAutoScrollPaused={setIsPosterAutoScrollPaused}
          currentMasonryStyle={MASONRY_STYLES[masonryStyleKey]}
          AnimatedSlogan={isMobileDevice ? MobileAnimatedSlogan : AnimatedSlogan}
          t={t}
          TAG_STYLES={TAG_STYLES}
          displayTag={displayTag}
          handleRefreshSystemData={handleRefreshSystemData}
          language={language}
          setLanguage={setLanguage}
          setIsSettingsOpen={setIsSettingsOpen}
          isSortMenuOpen={isSortMenuOpen}
          setIsSortMenuOpen={setIsSortMenuOpen}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          setRandomSeed={setRandomSeed}
        />
      ) : (
        <>
          <TemplatesSidebar
            mobileTab={mobileTab}
            setDiscoveryView={(val) => {
              setDiscoveryView(val);
              // 移动端：侧边栏里的“回到发现页”按钮需要同步切回 mobileTab
              if (isMobileDevice && val) setMobileTab('home');
            }}
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
            handleUpdateTemplateTags={handleUpdateTemplateTags}
            editingTemplateTags={editingTemplateTags}
            setEditingTemplateTags={setEditingTemplateTags}
            INITIAL_TEMPLATES_CONFIG={INITIAL_TEMPLATES_CONFIG}
            TAG_STYLES={TAG_STYLES}
          />

      {/* --- 2. Main Editor (Middle) --- */}
      <div className={`
          ${mobileTab === 'editor' ? 'flex fixed inset-0 z-50 bg-white md:static md:bg-white/80' : 'hidden'}
          md:flex flex-1 flex-col h-full overflow-hidden relative
          md:rounded-3xl border border-white/40 shadow-xl
          origin-left
      `}>

        {/* 顶部工具栏 */}
        <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-100/50 flex justify-between items-center z-20 h-auto min-h-[60px] md:min-h-[72px] bg-white/50 backdrop-blur-sm">
          <div className="min-w-0 flex-1 mr-2 flex flex-col justify-center">
            <h1 className="text-base md:text-lg font-bold text-gray-800 truncate">{activeTemplate.name}</h1>

            {/* 标签和状态栏 */}
            <div className="flex flex-wrap items-center gap-2 mt-1">
                {/* 状态指示器 */}
                <div className="hidden md:flex items-center gap-1.5 border-r border-gray-200 pr-2 mr-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${isEditing ? 'bg-amber-400 animate-pulse' : 'bg-green-400'}`}></span>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">
                        {isEditing ? t('editing_status') : t('preview_status')}
                    </p>
                </div>

                {/* Tags */}
                {(activeTemplate.tags || []).map(tag => (
                    <span
                        key={tag}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${TAG_STYLES[tag] || TAG_STYLES["default"]}`}
                    >
                        {displayTag(tag)}
                    </span>
                ))}
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3 self-start md:self-center">

             <div className="flex bg-gray-100/80 p-1 rounded-xl border border-gray-200 shadow-inner">
                <button
                    onClick={() => setIsEditing(false)}
                    className={`
                        p-1.5 md:px-3 md:py-1.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1.5
                        ${!isEditing
                            ? 'bg-white text-orange-600 shadow-sm ring-1 ring-black/5'
                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}
                    `}
                    title={t('preview_mode')}
                >
                    <Eye size={16} /> <span className="hidden md:inline">{t('preview_mode')}</span>
                </button>
                <button
                    onClick={() => setIsEditing(true)}
                    className={`
                        p-1.5 md:px-3 md:py-1.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1.5
                        ${isEditing
                            ? 'bg-white text-orange-600 shadow-sm ring-1 ring-black/5'
                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}
                    `}
                    title={t('edit_mode')}
                >
                    <Edit3 size={16} /> <span className="hidden md:inline">{t('edit_mode')}</span>
                </button>
             </div>

            <div className="h-6 w-px bg-gray-200 mx-1 hidden md:block"></div>

            <PremiumButton
                onClick={handleExportImage}
                disabled={isEditing || isExporting}
                title={isExporting ? t('exporting') : t('export_image')}
                icon={ImageIcon}
                color="orange"
            >
                <span className="hidden sm:inline">{isExporting ? t('exporting') : t('export_image')}</span>
            </PremiumButton>
            <PremiumButton
                onClick={handleCopy}
                title={copied ? t('copied') : t('copy_result')}
                icon={copied ? Check : CopyIcon}
                color={copied ? "emerald" : "orange"}
                active={true} // Always active look for CTA
                className="transition-all duration-300 transform hover:-translate-y-0.5"
            >
                 <span className="hidden md:inline ml-1">{copied ? t('copied') : t('copy_result')}</span>
            </PremiumButton>
          </div>
        </div>

        {/* 核心内容区 */}
        <div className="flex-1 overflow-hidden relative pb-24 md:pb-0 flex flex-col bg-gradient-to-br from-white/60 to-gray-50/60">
            {isEditing && (
                <EditorToolbar
                    onInsertClick={() => setIsInsertModalOpen(true)}
                    canUndo={historyPast.length > 0}
                    canRedo={historyFuture.length > 0}
                    onUndo={handleUndo}
                    onRedo={handleRedo}
                    t={t}
                />
            )}

            {isEditing ? (
                <div className="flex-1 relative overflow-hidden">
                    <VisualEditor
                        ref={textareaRef}
                        value={activeTemplate.content}
                        onChange={(e) => updateActiveTemplateContent(e.target.value)}
                        banks={banks}
                        categories={categories}
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
                />
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

          <BanksSidebar
            mobileTab={mobileTab}
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
          />
        </>
      )}

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
      />

      {/* 隐藏的图片选择器 */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleUploadImage}
      />

      {/* --- Settings Modal - Enhanced UI --- */}
      {isSettingsOpen && (
        <div
          className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200"
          onClick={() => setIsSettingsOpen(false)}
        >
          <div
            className="bg-gradient-to-br from-white via-white to-gray-50/30 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border-2 border-white/60 animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with gradient background */}
            <div className="relative flex items-center justify-between px-6 py-5 border-b border-gray-100/80 bg-gradient-to-r from-orange-50/50 via-white to-blue-50/30 backdrop-blur">
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-blue-500/5"></div>

              <div className="relative flex items-center gap-3 text-gray-800">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-500/30">
                  <Settings size={20} />
                </div>
                <div>
                  <p className="text-base font-bold tracking-tight">{t('settings')}</p>
                  <p className="text-xs text-gray-500 font-medium">{t('app_title')}</p>
                </div>
              </div>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="relative p-2.5 text-gray-400 hover:text-gray-700 hover:bg-white/80 rounded-xl transition-all duration-200 hover:shadow-md hover:scale-110"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-8 max-h-[75vh] overflow-y-auto">

              {/* Import / Export - Enhanced */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full"></div>
                  <p className="text-sm font-bold tracking-tight text-gray-700">{t('import_template')} / {t('export_all_templates')}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="block">
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportTemplate}
                      className="hidden"
                      id="import-template-input-modal"
                    />
                    <div
                      onClick={() => document.getElementById('import-template-input-modal').click()}
                      className="cursor-pointer w-full text-center px-5 py-4 text-sm font-semibold bg-gradient-to-br from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 text-gray-700 rounded-2xl transition-all duration-300 border-2 border-gray-200 hover:border-gray-300 flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg hover:scale-[1.02]"
                    >
                      <Download size={18} className="rotate-180" />
                      <span>{t('import_template')}</span>
                    </div>
                  </label>
                  <button
                    onClick={handleExportAllTemplates}
                    className="w-full text-center px-5 py-4 text-sm font-semibold bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl transition-all duration-300 border-2 border-orange-500 hover:border-orange-600 flex items-center justify-center gap-2.5 shadow-md shadow-orange-500/30 hover:shadow-lg hover:shadow-orange-500/40 hover:scale-[1.02]"
                  >
                    <Download size={18} />
                    <span>{t('export_all_templates')}</span>
                  </button>
                </div>
              </div>

              {/* Storage - Enhanced */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
                  <p className="text-sm font-bold tracking-tight text-gray-700">{t('storage_mode')}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={handleSwitchToLocalStorage}
                    className={`relative w-full px-5 py-4 text-sm font-semibold rounded-2xl transition-all duration-300 border-2 flex items-center justify-between overflow-hidden group ${
                      storageMode === 'browser'
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/30'
                        : 'bg-gradient-to-br from-white to-gray-50 text-gray-700 border-gray-200 hover:border-blue-300 hover:shadow-md hover:scale-[1.02]'
                    }`}
                  >
                    <div className="flex items-center gap-3 relative z-10">
                      <Globe size={18} />
                      <span>{t('use_browser_storage')}</span>
                    </div>
                    {storageMode === 'browser' && (
                      <div className="relative z-10">
                        <Check size={18} className="animate-in zoom-in duration-300" />
                      </div>
                    )}
                    {storageMode === 'browser' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent"></div>
                    )}
                  </button>
                  <button
                    onClick={handleSelectDirectory}
                    disabled={!isFileSystemSupported}
                    className={`relative w-full px-5 py-4 text-sm font-semibold rounded-2xl transition-all duration-300 border-2 flex items-center justify-between overflow-hidden group ${
                      storageMode === 'folder'
                        ? 'bg-gradient-to-br from-green-500 to-green-600 text-white border-green-500 shadow-lg shadow-green-500/30'
                        : 'bg-gradient-to-br from-white to-gray-50 text-gray-700 border-gray-200 hover:border-green-300 hover:shadow-md hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
                    }`}
                    title={!isFileSystemSupported ? t('browser_not_supported') : ''}
                  >
                    <div className="flex items-center gap-3 relative z-10">
                      <Download size={18} />
                      <span>{t('use_local_folder')}</span>
                    </div>
                    {storageMode === 'folder' && (
                      <div className="relative z-10">
                        <Check size={18} className="animate-in zoom-in duration-300" />
                      </div>
                    )}
                    {storageMode === 'folder' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-transparent"></div>
                    )}
                  </button>
                </div>

                {storageMode === 'folder' && directoryHandle && (
                  <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200/60 rounded-xl text-sm text-green-700 flex items-center justify-between gap-3 shadow-sm animate-in slide-in-from-top duration-300">
                    <div className="flex items-center gap-2.5 font-medium">
                      <div className="p-1 bg-green-500 rounded-lg text-white">
                        <Check size={14} />
                      </div>
                      <span>{t('auto_save_enabled')}</span>
                    </div>
                    <button
                      onClick={handleManualLoadFromFolder}
                      className="px-4 py-1.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg text-xs font-semibold transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
                    >
                      {t('load_from_folder')}
                    </button>
                  </div>
                )}

                {storageMode === 'browser' && (
                  <div className="px-4 py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl">
                    <p className="text-xs text-blue-700 font-medium">
                      {t('storage_used')}: <span className="font-bold">{getStorageSize()} KB</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Danger Zone - Enhanced */}
              <div className="space-y-4 pt-4 border-t-2 border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 bg-gradient-to-b from-red-400 to-red-600 rounded-full"></div>
                  <p className="text-sm font-bold tracking-tight text-red-600">{t('clear_all_data')}</p>
                </div>
                <button
                  onClick={handleClearAllData}
                  className="w-full text-center px-5 py-4 text-sm font-semibold bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 text-red-600 hover:text-red-700 rounded-2xl transition-all duration-300 border-2 border-red-200 hover:border-red-300 flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg hover:scale-[1.02] group"
                >
                  <Trash2 size={18} className="group-hover:animate-pulse" />
                  <span>{t('clear_all_data')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Image Action Menu (Portal) --- */}
      {showImageActionMenu && (() => {
        const buttonEl = window.__imageMenuButtonRef;
        if (!buttonEl) return null;
        const rect = buttonEl.getBoundingClientRect();
        return (
          <>
            {/* 背景遮罩层 - 点击关闭菜单 */}
            <div
              className="fixed inset-0 z-[9998]"
              onClick={() => setShowImageActionMenu(false)}
            />
            {/* 菜单内容 */}
            <div
              style={{
                position: 'fixed',
                top: `${rect.bottom + 8}px`,
                left: `${rect.left}px`,
                zIndex: 9999,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden min-w-[140px] animate-in fade-in slide-in-from-top-2 duration-200">
                <button
                  onClick={() => {
                    fileInputRef.current?.click();
                    setShowImageActionMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-orange-50 transition-colors flex items-center gap-2 text-gray-700"
                >
                  <ImageIcon size={16} />
                  {t('upload_image')}
                </button>
                <div className="h-px bg-gray-100"></div>
                <button
                  onClick={() => {
                    setShowImageUrlInput(true);
                    setShowImageActionMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-blue-50 transition-colors flex items-center gap-2 text-gray-700"
                >
                  <Globe size={16} />
                  {t('image_url')}
                </button>
              </div>
            </div>
          </>
        );
      })()}

      {/* --- Image Lightbox --- */}
      {/* --- Image View Modal --- */}
      {zoomedImage && (
        <div
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300"
            onClick={() => setZoomedImage(null)}
        >
            <button
                className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md"
                onClick={() => setZoomedImage(null)}
            >
                <X size={24} />
            </button>

            <div className="relative max-w-full max-h-full flex flex-col items-center">
                <img
                    src={zoomedImage}
                    alt="Zoomed Preview"
                    className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
                    onClick={(e) => e.stopPropagation()}
                />

                {/* View Template Button */}
                <div className="mt-6 flex gap-4" onClick={(e) => e.stopPropagation()}>
                    <button
                        onClick={() => {
                            const template = INITIAL_TEMPLATES_CONFIG.find(t => t.imageUrl === zoomedImage) ||
                                           templates.find(t => t.imageUrl === zoomedImage);

                            if (template) {
                                setActiveTemplateId(template.id);
                                setDiscoveryView(false);
                            } else if (activeTemplate.imageUrl === zoomedImage) {
                                setDiscoveryView(false);
                            }
                            setZoomedImage(null);
                        }}
                        className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium shadow-lg shadow-orange-500/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                    >
                        <LayoutGrid size={18} />
                        查看模板
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* --- Mobile Bottom Navigation - 4 Tabs --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200 flex justify-around items-center z-50 h-16 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          {/* 主頁 */}
          <button
             onClick={() => {
               setMobileTab('home');
               setDiscoveryView(true);
             }}
             className={`flex flex-col items-center justify-center w-full h-full gap-0.5 ${mobileTab === 'home' ? 'text-orange-600' : 'text-gray-400'}`}
          >
             <LayoutGrid size={20} />
             <span className="text-[10px] font-medium">主頁</span>
          </button>

          {/* 模板列表 */}
          <button
             onClick={() => {
               setMobileTab('templates');
               setDiscoveryView(false);
             }}
             className={`flex flex-col items-center justify-center w-full h-full gap-0.5 ${mobileTab === 'templates' ? 'text-orange-600' : 'text-gray-400'}`}
          >
             <FileText size={20} />
             <span className="text-[10px] font-medium">模板列表</span>
          </button>

          {/* 模板詳情 */}
          <button
             onClick={() => {
               setDiscoveryView(false);
               // 强制确保有模板被选中，确保状态生效后再切换
               if (templates.length > 0 && !activeTemplateId) {
                 console.log('[編輯按鈕] 強制選擇第一個模板:', templates[0].id);
                 const firstId = templates[0].id;
                 setActiveTemplateId(firstId);
                 setTimeout(() => setMobileTab('editor'), 0);
               } else {
                 setMobileTab('editor');
               }
             }}
             className={`flex flex-col items-center justify-center w-full h-full gap-0.5 ${mobileTab === 'editor' ? 'text-orange-600' : 'text-gray-400'}`}
          >
             <Edit3 size={20} />
             <span className="text-[10px] font-medium">模板詳情</span>
          </button>

          {/* 詞庫配置 */}
          <button
             onClick={() => {
               setDiscoveryView(false);
               // 强制确保有模板被选中，确保状态生效后再切换
               if (templates.length > 0 && !activeTemplateId) {
                 console.log('[詞庫按鈕] 強制選擇第一個模板:', templates[0].id);
                 const firstId = templates[0].id;
                 setActiveTemplateId(firstId);
                 setTimeout(() => setMobileTab('banks'), 0);
               } else {
                 setMobileTab('banks');
               }
             }}
             className={`flex flex-col items-center justify-center w-full h-full gap-0.5 ${mobileTab === 'banks' ? 'text-orange-600' : 'text-gray-400'}`}
          >
             <Settings size={20} />
             <span className="text-[10px] font-medium">詞庫配置</span>
          </button>
      </div>

      {/* --- Category Manager Modal (Moved to bottom) --- */}
      <CategoryManager
        isOpen={isCategoryManagerOpen}
        onClose={() => setIsCategoryManagerOpen(false)}
        categories={categories}
        setCategories={setCategories}
        banks={banks}
        setBanks={setBanks}
        t={t}
      />

      {/* --- Insert Variable Modal (Moved to bottom) --- */}
      <InsertVariableModal
        isOpen={isInsertModalOpen}
        onClose={() => setIsInsertModalOpen(false)}
        categories={categories}
        banks={banks}
        onSelect={(key) => {
            insertVariableToTemplate(key);
            setIsInsertModalOpen(false);
        }}
        t={t}
      />

      {/* --- 更新提示弹窗 (模板更新) --- */}
      {showUpdateNotice && (
        <div className="fixed inset-0 z-[200] bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 transition-all">
            <div className="flex items-center gap-3 mb-4 text-orange-600">
              <div className="p-2 bg-orange-100 rounded-lg">
                <RefreshCw size={24} />
              </div>
              <h3 className="text-xl font-bold">{t('update_available_title')}</h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t('update_available_msg')}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setLastAppliedVersion(SYSTEM_DATA_VERSION);
                  setShowUpdateNotice(false);
                }}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-500 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                {t('later')}
              </button>
              <button
                onClick={handleAutoUpdate}
                className="flex-1 px-4 py-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 font-bold"
              >
                {t('update_now')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- 應用程式碼版本更新，需要重新整理 --- */}
      {showAppUpdateNotice && (
        <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-[150]">
          <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 max-w-md ml-auto border border-blue-400">
            <div className="p-2 bg-white/20 rounded-xl">
              <Sparkles size={24} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium leading-snug">
                {t('app_update_available_msg')}
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-white text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-50 transition-colors shadow-lg shadow-black/10 whitespace-nowrap"
            >
              {t('refresh_now')}
            </button>
            <button
              onClick={() => setShowAppUpdateNotice(false)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;
