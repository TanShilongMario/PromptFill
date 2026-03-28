import React, { useRef, useCallback } from 'react';
import { Eye, Edit3, Copy, Check, X, ImageIcon, Pencil, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Plus, Trash2, LayoutGrid, Book, Play, Globe, Upload, Info, Film, FolderOpen, FileText, Link } from 'lucide-react';
import { WaypointsIcon } from './icons/WaypointsIcon';
import { getLocalized, getVideoEmbedInfo } from '../utils/helpers';
import { TemplatePreview } from './TemplatePreview';
import { VisualEditor } from './VisualEditor';
import { EditorToolbar } from './EditorToolbar';
import { PremiumButton } from './PremiumButton';
import { LinkTemplateModal } from './modals/LinkTemplateModal';
import { ScanningAnimation } from './ScanningAnimation';
import { OptimizedImage } from './OptimizedImage';
import { useResolvedFolderMediaSrc } from '../context/FolderStorageContext';
import { isFolderMediaPath } from '../utils/folderImages';

/** 编辑区素材条：解析 images/ 路径后播放短视频 */
function EditorSourceThumbVideo({ src, className, onMouseEnter, onMouseLeave, playIconSize = 24 }) {
  const { displaySrc, failed } = useResolvedFolderMediaSrc(src || '');
  if (failed || !displaySrc) {
    return (
      <div className={`${className} bg-black/20 flex items-center justify-center`}>
        <Play size={playIconSize} className="text-white/60" fill="currentColor" />
      </div>
    );
  }
  return (
    <video
      src={displaySrc}
      className={className}
      muted
      playsInline
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
}

/**
 * HScrollArea — 支持鼠标滚轮横向滑动 + 左右翻页按钮
 */
const HScrollArea = ({ children, className = '', isDarkMode }) => {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = React.useState(false);
  const [showRight, setShowRight] = React.useState(false);

  const checkArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 4);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  React.useEffect(() => {
    checkArrows();
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(checkArrows);
    ro.observe(el);
    return () => ro.disconnect();
  }, [checkArrows]);

  const handleWheel = useCallback((e) => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollWidth <= el.clientWidth) return; // no overflow
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // native horizontal
    e.preventDefault();
    el.scrollBy({ left: e.deltaY, behavior: 'auto' });
  }, []);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  const scroll = useCallback((dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: 'smooth' });
  }, []);

  return (
    <div className={`relative group/hscroll ${className}`}>
      <div ref={scrollRef} onScroll={checkArrows}
        className="flex overflow-x-auto gap-3 pb-1 scrollbar-hide scroll-smooth">
        {children}
      </div>
      {showLeft && (
        <button onClick={() => scroll(-1)}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/hscroll:opacity-90 transition-opacity ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>
          <ChevronLeft size={16} />
        </button>
      )}
      {showRight && (
        <button onClick={() => scroll(1)}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/hscroll:opacity-90 transition-opacity ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
};

/**
 * TemplateEditor 组件 - 整合模板编辑的所有UI元素
 * 包括：顶部工具栏、编辑模式、预览模式
 */
export const TemplateEditor = React.memo(({
  // ===== 模板数据 =====
  activeTemplate,
  templates,
  setActiveTemplateId,
  setSourceZoomedItem,
  banks,
  defaults,
  categories,
  INITIAL_TEMPLATES_CONFIG,
  TEMPLATE_TAGS,
  TAG_STYLES,

  // ===== 语言相关 =====
  language,
  templateLanguage,
  setTemplateLanguage,

  // ===== 编辑模式状态 =====
  isEditing,
  setIsEditing,
  handleStartEditing,
  handleStopEditing,

  // ===== 历史记录 =====
  historyPast,
  historyFuture,
  handleUndo,
  handleRedo,

  // ===== 联动组 =====
  cursorInVariable,
  currentGroupId,
  handleSetGroup,
  handleRemoveGroup,

  // ===== 变量交互 =====
  activePopover,
  setActivePopover,
  handleSelect,
  handleAddCustomAndSelect,
  popoverRef,

  // ===== 标题编辑 =====
  editingTemplateNameId,
  tempTemplateName,
  setTempTemplateName,
  saveTemplateName,
  startRenamingTemplate,
  setEditingTemplateNameId,
  tempTemplateAuthor,
  setTempTemplateAuthor,
  tempTemplateBestModel,
  setTempTemplateBestModel,
  tempTemplateBaseImage,
  setTempTemplateBaseImage,
  tempVideoUrl,
  setTempVideoUrl,

  // ===== 标签编辑 =====
  handleUpdateTemplateTags,
  editingTemplateTags,
  setEditingTemplateTags,

  // ===== 图片管理 =====
  fileInputRef,
  setShowImageUrlInput,
  handleResetImage,
  requestDeleteImage,
  setImageUpdateMode,
  setCurrentImageEditIndex,

  // ===== 分享/导出/复制 =====
  handleShareLink,
  handleExportImage,
  isExporting,
  handleCopy,
  copied,

  // ===== 模态框 =====
  setIsInsertModalOpen,

  // ===== 其他 =====
  updateActiveTemplateContent,
  setZoomedImage,
  t,
  isDarkMode,
  isMobileDevice,
  mobileTab,
  textareaRef,
  // AI 相关（预留接口）
  onGenerateAITerms = null,  // AI 生成词条的回调函数
  onSmartSplitClick = null,  // 智能拆分的回调函数
  onDebugSplitRun = null,    // 调试模式：前端直调GLM
  getDebugSystemPrompt = null, // 调试模式：获取默认系统提示词
  getDebugSystemPromptLite = null, // 调试模式：获取轻量模式系统提示词
  isSmartSplitLoading = false, // 智能拆分加载状态
  splitSnapshot = null,      // 拆分快照（有值时显示重置按钮）
  onResetClick = null,       // 点击「重置」按钮（打开对比弹窗）
  splitDurationMs = null,    // 上次拆分耗时（毫秒）
  updateTemplateProperty, // 新增：立即更新属性的函数
  setIsTemplatesDrawerOpen,
  setIsBanksDrawerOpen,
}) => {
  const [activeSelect, setActiveSelect] = React.useState(null); // 'bestModel' | 'baseImage' | null
  const [isLinkModalOpen, setIsLinkModalOpen] = React.useState(false);

  // 手机端手风琴: 'info' | 'preview' | 'source' | 'content' | null
  const [mobileAccordion, setMobileAccordion] = React.useState('content');
  const toggleAccordion = React.useCallback((section) => {
    setMobileAccordion(prev => prev === section ? null : section);
  }, []);
  const [desktopAccordion, setDesktopAccordion] = React.useState(new Set(['content']));
  const toggleDesktopAccordion = React.useCallback((section) => {
    setDesktopAccordion(prev => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section); else next.add(section);
      return next;
    });
  }, []);
  const selectRef = useRef(null);

  // 点击外部关闭下拉菜单
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setActiveSelect(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 统一的容器样式
  const containerStyle = !isMobileDevice ? (isDarkMode ? {
    borderRadius: '24px',
    border: '1px solid transparent',
    backgroundImage: 'linear-gradient(180deg, #3B3B3B 0%, #242120 100%), linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)',
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
  } : {
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.50)',
    background: 'linear-gradient(180deg, rgba(255, 250, 245, 0.58) 0%, rgba(248, 232, 215, 0.50) 100%)',
    backdropFilter: 'blur(32px)',
    WebkitBackdropFilter: 'blur(32px)',
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.55), 0 2px 24px rgba(180, 120, 80, 0.08)',
  }) : {};

  const innerBoxStyle = !isMobileDevice ? {
    background: isDarkMode 
      ? 'linear-gradient(#252525, #252525) padding-box, linear-gradient(0deg, #646464 0%, rgba(0, 0, 0, 0) 100%) border-box'
      : 'linear-gradient(rgba(240, 228, 215, 0.55), rgba(240, 228, 215, 0.55)) padding-box, linear-gradient(0deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 100%) border-box',
    boxShadow: 'inset 0px 2px 4px 0px rgba(0, 0, 0, 0.12)',
    border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.04)',
  } : {};

  // 模板支持的语言
  const templateLangs = activeTemplate?.language
    ? (Array.isArray(activeTemplate.language) ? activeTemplate.language : [activeTemplate.language])
    : ['cn', 'en'];

  const supportsChinese = templateLangs.includes('cn');
    const supportsEnglish = templateLangs.includes('en');
    const showLanguageToggle = templateLangs.length > 1;

    // 辅助组件：渲染参考素材区域
    const renderSourceAssets = () => (
      <div className="flex flex-col gap-1">
        <label className={`text-[10px] font-black uppercase tracking-widest opacity-40 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          {language === 'cn' ? '参考素材' : 'Sources'}
        </label>
        <HScrollArea isDarkMode={isDarkMode}>
          {(activeTemplate.source || []).map((src, sIdx) => (
            <div key={sIdx}
              className={`flex-shrink-0 relative group/source rounded-lg border-2 transition-all cursor-zoom-in hover:scale-[1.03] ${isDarkMode ? 'border-white/5 bg-white/5' : 'border-gray-100 bg-gray-50'}`}
              onClick={() => {
                if (src.templateId) {
                  // 关联模式：跳转到模版
                  if (templates && templates.some(t => t.id === src.templateId)) {
                    setActiveTemplateId(src.templateId);
                  } else {
                    alert(language === 'cn' ? `关联的模版「${src.templateName || '未知'}」已不存在` : `Linked template "${src.templateName || 'Unknown'}" no longer exists`);
                  }
                } else {
                  setSourceZoomedItem(src);
                }
              }}>
              <div className={`${isMobileDevice ? 'w-[140px] h-[140px]' : 'w-[210px] h-[210px]'} overflow-hidden rounded-lg flex items-center justify-center`}>
                {src.type === 'video' ? (
                  getVideoEmbedInfo(src.url)?.platform === 'video' || isFolderMediaPath(src.url) ? (
                    <EditorSourceThumbVideo
                      src={src.url}
                      className="w-full h-full object-cover"
                      playIconSize={isMobileDevice ? 18 : 24}
                      onMouseEnter={(e) => e.target.play()}
                      onMouseLeave={(e) => {
                        e.target.pause();
                        e.target.currentTime = 0;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-black/20">
                      <Play size={isMobileDevice ? 18 : 24} className="text-white/60" fill="currentColor" />
                    </div>
                  )
                ) : (
                  <OptimizedImage
                    src={src.url}
                    alt={`Source ${src.id || sIdx + 1}`}
                    className="w-full h-full object-cover"
                    isDarkMode={isDarkMode}
                    priority={10}
                  />
                )}
              </div>

              {/* 关联角标 */}
              {src.templateId && (
                <div className="absolute top-1.5 left-1.5 z-10 bg-orange-500 text-white rounded-md px-1 py-0.5 flex items-center gap-1 shadow-lg">
                  <Link size={10} />
                  <span className="text-[9px] font-black">{language === 'cn' ? '关联' : 'LINK'}</span>
                </div>
              )}

              <button onClick={(e) => { e.stopPropagation(); const s = [...(activeTemplate.source || [])]; s.splice(sIdx, 1); updateTemplateProperty('source', s); }}
                className={`absolute top-1 right-1 bg-red-500 text-white rounded-full shadow-lg opacity-0 group-hover/source:opacity-100 transition-opacity z-[20] ${isMobileDevice ? 'p-0.5' : 'p-1.5'}`}><X size={isMobileDevice ? 10 : 14} /></button>
            </div>
          ))}
          <div className={`flex-shrink-0 ${isMobileDevice ? 'w-[140px] h-[140px]' : 'w-[210px] h-[210px]'} rounded-lg border-2 border-dashed flex items-center justify-center gap-0.5 md:gap-1 ${isDarkMode ? 'border-white/10 text-gray-600' : 'border-gray-200 text-gray-400'}`}>
            <button onClick={() => { setImageUpdateMode('add_source'); fileInputRef.current?.click(); }}
              className={`flex flex-col items-center gap-1.5 p-1 md:p-2 rounded transition-all ${isDarkMode ? 'hover:bg-white/10 hover:text-orange-400' : 'hover:bg-orange-50 hover:text-orange-500'}`}>
              <Upload size={isMobileDevice ? 18 : 24} /><span className={`${isMobileDevice ? 'text-[8px]' : 'text-[10px]'} font-bold`}>{language === 'cn' ? '本地' : 'Local'}</span>
            </button>
            <div className={`w-px ${isMobileDevice ? 'h-6' : 'h-8'} ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'} opacity-50`} />
            <button onClick={() => { setImageUpdateMode('add_source'); setShowImageUrlInput(true); }}
              className={`flex flex-col items-center gap-1.5 p-1 md:p-2 rounded transition-all ${isDarkMode ? 'hover:bg-white/10 hover:text-orange-400' : 'hover:bg-orange-50 hover:text-orange-500'}`}>
              <Globe size={isMobileDevice ? 18 : 24} /><span className={`${isMobileDevice ? 'text-[8px]' : 'text-[10px]'} font-bold`}>{language === 'cn' ? '链接' : 'URL'}</span>
            </button>
            <div className={`w-px ${isMobileDevice ? 'h-6' : 'h-8'} ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'} opacity-50`} />
            <button onClick={() => setIsLinkModalOpen(true)}
              className={`flex flex-col items-center gap-1.5 p-1 md:p-2 rounded transition-all ${isDarkMode ? 'hover:bg-white/10 hover:text-orange-400' : 'hover:bg-orange-50 hover:text-orange-500'}`}>
              <Link size={isMobileDevice ? 18 : 24} /><span className={`${isMobileDevice ? 'text-[8px]' : 'text-[10px]'} font-bold`}>{language === 'cn' ? '关联' : 'Link'}</span>
            </button>
          </div>
        </HScrollArea>
      </div>
    );

    return (
    <div
      className={`
        ${(mobileTab === 'editor') ? 'flex fixed inset-0 z-30 md:static md:bg-transparent' : 'hidden'}
        ${(mobileTab === 'editor') && isMobileDevice ? (isDarkMode ? 'bg-[#2A2928]' : 'bg-white') : ''}
        md:flex flex-1 shrink-[1] md:min-w-[400px] flex-col h-full overflow-hidden relative
        md:rounded-3xl origin-left
      `}
    >
      <div 
        style={containerStyle}
        className="flex flex-col w-full h-full"
      >

        {/* ===== 顶部工具栏 ===== */}
        {(!isMobileDevice || mobileTab !== 'settings') && (
          <div className="px-6 pb-4 z-30 h-auto flex-shrink-0" style={{ paddingTop: 'calc(1.5rem + env(safe-area-inset-top, 0px))' }}>
            {/* 第一行：模版开关、标题、词库开关 (Mobile) / 标题、语言 (Desktop)，标题行高度与其他面板一致 */}
            <div className="w-full flex items-center justify-between gap-2 shrink-0 min-h-10 mb-[14px]">
              {isMobileDevice && (
                <button 
                  onClick={() => setIsTemplatesDrawerOpen(true)}
                  className={`p-2 transition-all active:scale-95 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                >
                  <LayoutGrid size={22} />
                </button>
              )}

              <div className="flex-1 flex items-center justify-center md:justify-start gap-3 overflow-hidden">
                <h1 className={`text-[20px] font-bold tracking-tight flex items-baseline gap-2 ${isDarkMode ? 'text-[#CDCDCD]' : 'text-[#5D5D5D]'}`}>
                  {language === 'cn' ? '模版详情' : 'Template Detail'}
                </h1>
                
                {/* 语言切换 - 桌面端显示在标题旁 */}
                {!isMobileDevice && showLanguageToggle && (
                  <div className={`premium-toggle-container ${isDarkMode ? 'dark' : 'light'} shrink-0 scale-90`}>
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
                )}
              </div>

              {isMobileDevice && (
                <button 
                  onClick={() => setIsBanksDrawerOpen(true)}
                  className={`p-2 transition-all active:scale-95 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                >
                  <Book size={22} />
                </button>
              )}
            </div>

            {/* 第二行：模式切换 (左侧)、操作按钮 (右侧) */}
            <div className="w-full flex items-center justify-between gap-1.5 md:gap-3 shrink-0 h-[42px]">
              {/* 模式切换 (预览/编辑) */}
              <div className={`premium-toggle-container ${isDarkMode ? 'dark' : 'light'} shrink-0 scale-90 md:scale-100 origin-left`}>
                <button
                  onClick={handleStopEditing}
                  className={`premium-toggle-item ${isDarkMode ? 'dark' : 'light'} ${!isEditing ? 'is-active' : ''}`}
                  title={t('preview_mode')}
                >
                  <Eye size={14} /> <span className="hidden md:inline ml-1.5">{t('preview_mode')}</span>
                </button>
                <button
                  onClick={handleStartEditing}
                  className={`premium-toggle-item ${isDarkMode ? 'dark' : 'light'} ${isEditing ? 'is-active' : ''}`}
                  title={t('edit_mode')}
                >
                  <Edit3 size={14} /> <span className="hidden md:inline ml-1.5">{t('edit_mode')}</span>
                </button>
              </div>

              {/* 右侧操作按钮组 */}
              <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
                <PremiumButton
                  onClick={handleShareLink}
                  title={language === 'cn' ? '分享' : t('share_link')}
                  icon={WaypointsIcon}
                  isDarkMode={isDarkMode}
                  className="scale-90 md:scale-100 origin-right"
                >
                  <span className="hidden md:inline ml-1.5">{language === 'cn' ? '分享' : t('share')}</span>
                </PremiumButton>

                <PremiumButton
                  onClick={handleExportImage}
                  disabled={isEditing || isExporting}
                  title={isExporting ? t('exporting') : (language === 'cn' ? '导出' : t('export_image'))}
                  icon={ImageIcon}
                  isDarkMode={isDarkMode}
                  className="scale-90 md:scale-100 origin-right"
                >
                  <span className="hidden md:inline ml-1.5 truncate">
                    {isExporting ? (language === 'cn' ? '导出中...' : 'Exp...') : (language === 'cn' ? '导出长图' : 'Img')}
                  </span>
                </PremiumButton>

                <PremiumButton
                  onClick={handleCopy}
                  title={copied ? t('copied') : (language === 'cn' ? '复制' : t('copy_result'))}
                  icon={copied ? Check : Copy}
                  active={true}
                  isDarkMode={isDarkMode}
                  className="scale-90 md:scale-100 origin-right"
                >
                  <span className="hidden md:inline ml-1.5 truncate">
                    {copied ? t('copied') : (language === 'cn' ? '复制结果' : 'Copy')}
                  </span>
                </PremiumButton>
              </div>
            </div>
          </div>
        )}

        {/* ===== 核心内容区 ===== */}
        <div className={`flex-1 overflow-hidden relative flex flex-col ${mobileTab === 'settings' ? 'pt-0' : (!isMobileDevice ? 'p-2' : 'pb-24')}`}>
          <div 
            style={innerBoxStyle}
            className={`flex-1 overflow-hidden relative flex flex-col ${!isMobileDevice ? 'rounded-xl' : ''}`}
          >
            {/* 编辑模式 */}
            {isEditing ? (
              isMobileDevice ? (
              /* ==================== MOBILE: 四段手风琴 ==================== */
              <div className="flex-1 relative overflow-y-auto overflow-x-hidden flex flex-col custom-scrollbar">
                {/* 编辑工具栏 */}
                <div className={`backdrop-blur-sm ${isDarkMode ? 'bg-white/5' : 'bg-[#F0E4D8]/50'}`}>
                  <EditorToolbar
                    onInsertClick={() => setIsInsertModalOpen(true)}
                    onSmartSplitClick={onSmartSplitClick}
                    onDebugSplitRun={onDebugSplitRun}
                    getDebugSystemPrompt={getDebugSystemPrompt}
                    getDebugSystemPromptLite={getDebugSystemPromptLite}
                    isSmartSplitLoading={isSmartSplitLoading}
                    hasSplitSnapshot={!!splitSnapshot}
                    splitDurationMs={splitSnapshot?.splitDurationMs ?? null}
                    onResetClick={onResetClick}
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
                    language={language}
                  />
                </div>

                {/* 语言切换 - 单独一行 */}
                {showLanguageToggle && (
                  <div className={`flex items-center justify-center py-1 border-b ${isDarkMode ? 'border-white/5' : 'border-gray-200/60'}`}>
                    <div className={`premium-toggle-container ${isDarkMode ? 'dark' : 'light'} shrink-0 scale-75`}>
                      <button onClick={() => supportsChinese && setTemplateLanguage('cn')}
                        className={`premium-toggle-item ${isDarkMode ? 'dark' : 'light'} ${templateLanguage === 'cn' ? 'is-active' : ''} !px-2`}>CN</button>
                      <button onClick={() => supportsEnglish && setTemplateLanguage('en')}
                        className={`premium-toggle-item ${isDarkMode ? 'dark' : 'light'} ${templateLanguage === 'en' ? 'is-active' : ''} !px-2`}>EN</button>
                    </div>
                  </div>
                )}

                {/* ---- Section 1: 基础信息 ---- */}
                <div className={`border-b ${isDarkMode ? 'border-white/5' : 'border-gray-200/60'}`}>
                  <button
                    onClick={() => toggleAccordion('info')}
                    className={`w-full flex items-center gap-2.5 px-4 h-11 select-none active:opacity-70 transition-opacity ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                  >
                    <Info size={14} className={`flex-shrink-0 ${mobileAccordion === 'info' ? 'text-orange-500' : 'opacity-40'}`} />
                    <span className="text-[13px] font-bold">{language === 'cn' ? '基础信息' : 'Basic Info'}</span>
                    {mobileAccordion === 'info' ? <ChevronUp size={14} className="text-orange-500 flex-shrink-0" /> : <ChevronDown size={14} className="opacity-40 flex-shrink-0" />}
                    {mobileAccordion !== 'info' && (
                      <span className={`text-[10px] truncate opacity-50 flex-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {tempTemplateName || '—'} · {tempTemplateAuthor || '—'} · {tempTemplateBestModel || '—'}
                      </span>
                    )}
                  </button>
                  {mobileAccordion === 'info' && (
                    <div className={`px-4 pb-4 pt-4 flex flex-col gap-2 ${isDarkMode ? 'bg-white/[0.02]' : 'bg-[#F5EAE0]/40'}`}>
                      <div className="flex flex-col gap-0.5">
                        <label className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{language === 'cn' ? '标题' : 'Title'}</label>
                        <input type="text" value={tempTemplateName} onChange={(e) => setTempTemplateName(e.target.value)} onBlur={saveTemplateName}
                          className={`text-sm font-bold bg-transparent border-b-2 border-orange-500/20 focus:border-orange-500 focus:outline-none w-full pb-0.5 transition-all ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                          placeholder={t('label_placeholder')} />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <label className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{language === 'cn' ? '作者' : 'Author'}</label>
                        <input type="text" value={tempTemplateAuthor} onChange={(e) => setTempTemplateAuthor(e.target.value)} onBlur={saveTemplateName}
                          disabled={INITIAL_TEMPLATES_CONFIG.some(cfg => cfg.id === activeTemplate.id)}
                          className={`text-sm font-bold bg-transparent border-b border-dashed focus:border-solid border-orange-500/30 focus:border-orange-500 focus:outline-none w-full pb-0.5 transition-all ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                          placeholder={language === 'cn' ? '作者...' : 'Author...'} />
                        {INITIAL_TEMPLATES_CONFIG.some(cfg => cfg.id === activeTemplate.id) && (
                          <p className="text-[9px] text-orange-500/50 font-bold italic">{language === 'cn' ? '* 系统模版作者不可修改' : '* Read-only'}</p>
                        )}
                      </div>
                      <div className="flex gap-3" ref={selectRef}>
                        <div className="flex-1 flex flex-col gap-0.5 relative">
                          <label className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{t('best_model')}</label>
                          <button onClick={() => setActiveSelect(activeSelect === 'bestModel' ? null : 'bestModel')}
                            className={`text-xs font-bold bg-transparent border-b border-dashed border-orange-500/30 hover:border-orange-500 transition-all w-full pb-0.5 text-left flex items-center justify-between ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                            <span className="truncate">{tempTemplateBestModel || t('please_select')}</span>
                            <ChevronRight size={10} className={`flex-shrink-0 transition-transform duration-200 ${activeSelect === 'bestModel' ? 'rotate-90' : ''}`} />
                          </button>
                          {activeSelect === 'bestModel' && (
                            <div className={`absolute top-full left-0 right-0 mt-1 z-50 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border ${isDarkMode ? 'bg-[#2A2928] border-white/10' : 'bg-white border-gray-100'}`} style={{ backdropFilter: 'blur(20px)' }}>
                              {(activeTemplate.type === 'video' ? ['Seedance 2.0', 'Veo 3.1', 'Kling 3.0'] : ['Nano Banana Pro', 'Midjourney V7', 'Zimage']).map((opt) => (
                                <button key={opt} onClick={() => { updateTemplateProperty('bestModel', opt); setActiveSelect(null); }}
                                  className={`w-full text-left px-3 py-1.5 text-xs transition-all flex items-center justify-between ${tempTemplateBestModel === opt ? 'bg-orange-500/10 text-orange-500 font-bold' : (isDarkMode ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-50')}`}>
                                  {opt}{tempTemplateBestModel === opt && <Check size={10} />}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 flex flex-col gap-0.5 relative">
                          <label className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{t('base_image')}</label>
                          <button onClick={() => setActiveSelect(activeSelect === 'baseImage' ? null : 'baseImage')}
                            className={`text-xs font-bold bg-transparent border-b border-dashed border-orange-500/30 hover:border-orange-500 transition-all w-full pb-0.5 text-left flex items-center justify-between ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                            <span className="truncate">{tempTemplateBaseImage ? t(tempTemplateBaseImage) : t('please_select')}</span>
                            <ChevronRight size={10} className={`flex-shrink-0 transition-transform duration-200 ${activeSelect === 'baseImage' ? 'rotate-90' : ''}`} />
                          </button>
                          {activeSelect === 'baseImage' && (
                            <div className={`absolute top-full left-0 right-0 mt-1 z-50 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border ${isDarkMode ? 'bg-[#2A2928] border-white/10' : 'bg-white border-gray-100'}`} style={{ backdropFilter: 'blur(20px)' }}>
                              {['no_base_image', 'recommend_base_image', 'optional_base_image'].map((opt) => (
                                <button key={opt} onClick={() => { updateTemplateProperty('baseImage', opt); setActiveSelect(null); }}
                                  className={`w-full text-left px-3 py-1.5 text-xs transition-all flex items-center justify-between ${tempTemplateBaseImage === opt ? 'bg-orange-500/10 text-orange-500 font-bold' : (isDarkMode ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-50')}`}>
                                  {t(opt)}{tempTemplateBaseImage === opt && <Check size={10} />}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* ---- Section 2: 成果预览 ---- */}
                <div className={`border-b ${isDarkMode ? 'border-white/5' : 'border-gray-200/60'}`}>
                  <button
                    onClick={() => toggleAccordion('preview')}
                    className={`w-full flex items-center gap-2.5 px-4 h-11 select-none active:opacity-70 transition-opacity ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                  >
                    <Film size={14} className={`flex-shrink-0 ${mobileAccordion === 'preview' ? 'text-orange-500' : 'opacity-40'}`} />
                    <span className="text-[13px] font-bold">{language === 'cn' ? '成果预览' : 'Results'}</span>
                    {mobileAccordion === 'preview' ? <ChevronUp size={14} className="text-orange-500 flex-shrink-0" /> : <ChevronDown size={14} className="opacity-40 flex-shrink-0" />}
                    {mobileAccordion !== 'preview' && (
                      <span className={`text-[10px] truncate opacity-50 flex-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {activeTemplate.type === 'video'
                          ? `${tempVideoUrl ? '1' : '0'} ${language === 'cn' ? '视频' : 'Video'}${activeTemplate.imageUrl ? ` + ${language === 'cn' ? '封面' : 'Cover'}` : ''}`
                          : `${(activeTemplate.imageUrls?.length || (activeTemplate.imageUrl ? 1 : 0))} ${language === 'cn' ? '张图' : 'images'}`
                        }
                      </span>
                    )}
                  </button>
                  {mobileAccordion === 'preview' && (
                    <div className={`px-4 pb-4 pt-4 ${isDarkMode ? 'bg-white/[0.02]' : 'bg-[#F5EAE0]/40'}`}>
                      <HScrollArea isDarkMode={isDarkMode}>
                        {activeTemplate.type === 'video' ? (
                          <>
                            {/* Video result */}
                            <div className="flex-shrink-0 flex flex-col gap-1">
                              <label className={`text-[10px] font-black uppercase tracking-widest opacity-40 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{language === 'cn' ? '成果视频' : 'Video'}</label>
                              {tempVideoUrl ? (
                                <div className={`relative group/v-result rounded-lg border-2 transition-all cursor-zoom-in hover:scale-[1.02] ${isDarkMode ? 'border-white/5 bg-white/5' : 'border-gray-100 bg-gray-50'}`}
                                  onClick={() => setSourceZoomedItem({ url: tempVideoUrl, type: 'video' })}>
                                  <div className="w-[140px] h-[140px] overflow-hidden rounded-lg flex items-center justify-center">
                                    {getVideoEmbedInfo(tempVideoUrl)?.platform === 'video' ? (
                                      <video src={tempVideoUrl} className="w-full h-full object-cover" muted playsInline
                                        onMouseEnter={e => e.target.play()} onMouseLeave={e => { e.target.pause(); e.target.currentTime = 0; }} />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center bg-black/20"><Play size={24} className="text-white/60" fill="currentColor" /></div>
                                    )}
                                  </div>
                                  <div className={`absolute bottom-0 inset-x-0 text-center py-0.5 text-[8px] font-bold rounded-b-lg ${isDarkMode ? 'bg-black/50 text-white/50' : 'bg-black/30 text-white/80'}`}>{language === 'cn' ? '视频' : 'Video'}</div>
                                  <button onClick={(e) => { e.stopPropagation(); setImageUpdateMode('replace_video_url'); fileInputRef.current?.click(); }}
                                    className="absolute top-2 left-2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-1.5 shadow-lg opacity-0 group-hover/v-result:opacity-100 transition-opacity z-[20]"><Upload size={12} /></button>
                                  <button onClick={(e) => { e.stopPropagation(); setTempVideoUrl(''); updateTemplateProperty('videoUrl', ''); }}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 shadow-lg opacity-0 group-hover/v-result:opacity-100 transition-opacity z-[20]"><X size={12} /></button>
                                </div>
                              ) : (
                                <div className="w-[140px] h-[140px] rounded-lg border-2 border-dashed flex items-center justify-center gap-3 ${isDarkMode ? 'border-white/10 text-gray-600' : 'border-gray-200 text-gray-400'}">
                                  <button onClick={() => { setImageUpdateMode('replace_video_url'); fileInputRef.current?.click(); }}
                                    className={`flex flex-col items-center gap-1.5 p-2 rounded transition-all ${isDarkMode ? 'hover:bg-white/10 hover:text-orange-400' : 'hover:bg-orange-50 hover:text-orange-500'}`}>
                                    <Upload size={18} /><span className="text-[10px] font-bold">{language === 'cn' ? '本地' : 'Local'}</span>
                                  </button>
                                  <div className={`w-px h-6 ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
                                  <button onClick={() => { setImageUpdateMode('replace_video_url'); setShowImageUrlInput(true); }}
                                    className={`flex flex-col items-center gap-1.5 p-2 rounded transition-all ${isDarkMode ? 'hover:bg-white/10 hover:text-orange-400' : 'hover:bg-orange-50 hover:text-orange-500'}`}>
                                    <Globe size={18} /><span className="text-[10px] font-bold">{language === 'cn' ? '链接' : 'URL'}</span>
                                  </button>
                                </div>
                              )}
                            </div>
                            {/* Cover image */}
                            <div className="flex-shrink-0 flex flex-col gap-1">
                              <label className={`text-[10px] font-black uppercase tracking-widest opacity-40 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{language === 'cn' ? '封面' : 'Cover'}</label>
                              {activeTemplate.imageUrl ? (
                                <div className={`relative group/cover rounded-lg border-2 transition-all cursor-zoom-in hover:scale-[1.02] ${isDarkMode ? 'border-white/5 bg-white/5' : 'border-gray-100 bg-gray-50'}`}
                                  onClick={() => setSourceZoomedItem({ url: activeTemplate.imageUrl, type: 'image' })}>
                                  <div className="w-[140px] h-[140px] overflow-hidden rounded-lg">
                                    <OptimizedImage src={activeTemplate.imageUrl} alt="Cover" className="w-full h-full object-cover" isDarkMode={isDarkMode} priority={8} />
                                  </div>
                                  <button onClick={(e) => { e.stopPropagation(); setImageUpdateMode('replace_cover'); fileInputRef.current?.click(); }}
                                    className="absolute top-2 left-2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-1.5 shadow-lg opacity-0 group-hover/cover:opacity-100 transition-opacity z-[20]"><Upload size={12} /></button>
                                  <button onClick={(e) => { e.stopPropagation(); updateTemplateProperty('imageUrl', ''); }}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 shadow-lg opacity-0 group-hover/cover:opacity-100 transition-opacity z-[20]"><X size={12} /></button>
                                </div>
                              ) : (
                                <div className={`w-[140px] h-[140px] rounded-lg border-2 border-dashed flex items-center justify-center gap-3 ${isDarkMode ? 'border-white/10 text-gray-600' : 'border-gray-200 text-gray-400'}`}>
                                  <button onClick={() => { setImageUpdateMode('replace_cover'); fileInputRef.current?.click(); }}
                                    className={`flex flex-col items-center gap-1.5 p-2 rounded transition-all ${isDarkMode ? 'hover:bg-white/10 hover:text-orange-400' : 'hover:bg-orange-50 hover:text-orange-500'}`}>
                                    <Upload size={18} /><span className="text-[10px] font-bold">{language === 'cn' ? '本地' : 'Local'}</span>
                                  </button>
                                  <div className={`w-px h-6 ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
                                  <button onClick={() => { setImageUpdateMode('replace_cover'); setShowImageUrlInput(true); }}
                                    className={`flex flex-col items-center gap-1.5 p-2 rounded transition-all ${isDarkMode ? 'hover:bg-white/10 hover:text-orange-400' : 'hover:bg-orange-50 hover:text-orange-500'}`}>
                                    <Globe size={18} /><span className="text-[10px] font-bold">{language === 'cn' ? '链接' : 'URL'}</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            {(activeTemplate.imageUrls && activeTemplate.imageUrls.length > 0 ? activeTemplate.imageUrls : (activeTemplate.imageUrl ? [activeTemplate.imageUrl] : [])).map((url, idx) => (
                              <div key={idx}
                                className={`flex-shrink-0 relative group/result rounded-lg border-2 transition-all cursor-zoom-in hover:scale-[1.02] ${isDarkMode ? 'border-white/5 bg-white/5' : 'border-gray-100 bg-gray-50'}`}
                                onClick={() => setSourceZoomedItem({ url, type: 'image' })}>
                                <div className="w-[140px] h-[140px] overflow-hidden rounded-lg">
                                  <OptimizedImage src={url} alt={`Result ${idx + 1}`} className="w-full h-full object-cover" isDarkMode={isDarkMode} priority={8} />
                                </div>
                                <button onClick={(e) => { e.stopPropagation(); setImageUpdateMode('replace'); setCurrentImageEditIndex(idx); fileInputRef.current?.click(); }}
                                  className="absolute top-2 left-2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-1.5 shadow-lg opacity-0 group-hover/result:opacity-100 transition-opacity z-[20]"><Upload size={12} /></button>
                                <button onClick={(e) => { e.stopPropagation(); requestDeleteImage(e, idx); }}
                                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 shadow-lg opacity-0 group-hover/result:opacity-100 transition-opacity z-[20]"><X size={12} /></button>
                              </div>
                            ))}
                            <div className={`flex-shrink-0 w-[140px] h-[140px] rounded-lg border-2 border-dashed flex items-center justify-center gap-3 ${isDarkMode ? 'border-white/10 text-gray-600' : 'border-gray-200 text-gray-400'}`}>
                              <button onClick={() => { setImageUpdateMode('add'); fileInputRef.current?.click(); }}
                                className={`flex flex-col items-center gap-1.5 p-2 rounded transition-all ${isDarkMode ? 'hover:bg-white/10 hover:text-orange-400' : 'hover:bg-orange-50 hover:text-orange-500'}`}>
                                <Upload size={18} /><span className="text-[10px] font-bold">{language === 'cn' ? '本地' : 'Local'}</span>
                              </button>
                              <div className={`w-px h-6 ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
                              <button onClick={() => { setImageUpdateMode('add'); setShowImageUrlInput(true); }}
                                className={`flex flex-col items-center gap-1.5 p-2 rounded transition-all ${isDarkMode ? 'hover:bg-white/10 hover:text-orange-400' : 'hover:bg-orange-50 hover:text-orange-500'}`}>
                                <Globe size={18} /><span className="text-[10px] font-bold">{language === 'cn' ? '链接' : 'URL'}</span>
                              </button>
                            </div>
                          </>
                        )}
                      </HScrollArea>
                    </div>
                  )}
                </div>

                {/* ---- Section 3: 素材准备 ---- */}
                <div className={`border-b ${isDarkMode ? 'border-white/5' : 'border-gray-200/60'}`}>
                  <button
                    onClick={() => toggleAccordion('source')}
                    className={`w-full flex items-center gap-2.5 px-4 h-11 select-none active:opacity-70 transition-opacity ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                  >
                    <FolderOpen size={14} className={`flex-shrink-0 ${mobileAccordion === 'source' ? 'text-orange-500' : 'opacity-40'}`} />
                    <span className="text-[13px] font-bold">{language === 'cn' ? '素材' : 'Source'}</span>
                    {mobileAccordion === 'source' ? <ChevronUp size={14} className="text-orange-500 flex-shrink-0" /> : <ChevronDown size={14} className="opacity-40 flex-shrink-0" />}
                    {mobileAccordion !== 'source' && (
                      <span className={`text-[10px] truncate opacity-50 flex-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {(activeTemplate.source || []).length} {language === 'cn' ? '个素材' : 'assets'}
                      </span>
                    )}
                  </button>
                  {mobileAccordion === 'source' && (
                    <div className={`px-4 pb-4 pt-4 ${isDarkMode ? 'bg-white/[0.02]' : 'bg-[#F5EAE0]/40'}`}>
                      {renderSourceAssets()}
                    </div>
                  )}
                </div>

                {/* ---- Section 4: 内容呈现 ---- */}
                <div className={`border-b ${isDarkMode ? 'border-white/5' : 'border-gray-200/60'}`}>
                  <button
                    onClick={() => toggleAccordion('content')}
                    className={`w-full flex items-center gap-2.5 px-4 h-11 select-none active:opacity-70 transition-opacity ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                  >
                    <FileText size={14} className={`flex-shrink-0 ${mobileAccordion === 'content' ? 'text-orange-500' : 'opacity-40'}`} />
                    <span className="text-[13px] font-bold">{language === 'cn' ? '内容呈现' : 'Content'}</span>
                    {mobileAccordion === 'content' ? <ChevronUp size={14} className="text-orange-500 flex-shrink-0" /> : <ChevronDown size={14} className="opacity-40 flex-shrink-0" />}
                  </button>
                  {mobileAccordion === 'content' && (
                    <div className="relative overflow-hidden" style={{ minHeight: 'calc(100vh - 280px)' }}>
                      <div className={`w-full h-full ${isSmartSplitLoading ? 'text-processing-mask' : ''}`} style={{ minHeight: 'calc(100vh - 280px)' }}>
                        <VisualEditor
                          ref={textareaRef}
                          value={getLocalized(activeTemplate?.content, templateLanguage)}
                          onChange={(e) => {
                            const newText = e.target.value;
                            if (typeof activeTemplate.content === 'object') {
                              updateActiveTemplateContent({ ...activeTemplate.content, [templateLanguage]: newText });
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
                          onInteraction={() => {}}
                          onUndo={handleUndo}
                          onRedo={handleRedo}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              ) : (
              /* ==================== DESKTOP: 四段手风琴 ==================== */
              <div className="flex-1 relative overflow-y-auto overflow-x-hidden flex flex-col custom-scrollbar">
                {/* 编辑工具栏 */}
                <div className={`backdrop-blur-sm ${isDarkMode ? 'bg-white/5' : 'bg-[#F0E4D8]/50'}`}>
                  <EditorToolbar
                    onInsertClick={() => setIsInsertModalOpen(true)}
                    onSmartSplitClick={onSmartSplitClick}
                    onDebugSplitRun={onDebugSplitRun}
                    getDebugSystemPrompt={getDebugSystemPrompt}
                    getDebugSystemPromptLite={getDebugSystemPromptLite}
                    isSmartSplitLoading={isSmartSplitLoading}
                    hasSplitSnapshot={!!splitSnapshot}
                    splitDurationMs={splitSnapshot?.splitDurationMs ?? null}
                    onResetClick={onResetClick}
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
                    language={language}
                  />
                </div>

                {/* ---- Desktop Section 1: 基础信息 ---- */}
                <div className={`border-b ${isDarkMode ? 'border-white/5' : 'border-gray-200/60'}`}>
                  <button
                    onClick={() => toggleDesktopAccordion('info')}
                    className={`w-full flex items-center gap-3 px-6 h-11 select-none hover:opacity-80 transition-opacity ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                  >
                    <Info size={15} className={`flex-shrink-0 ${desktopAccordion.has('info') ? 'text-orange-500' : 'opacity-40'}`} />
                    <span className="text-sm font-bold">{language === 'cn' ? '基础信息' : 'Basic Info'}</span>
                    {desktopAccordion.has('info') ? <ChevronUp size={15} className="text-orange-500 flex-shrink-0" /> : <ChevronDown size={15} className="opacity-40 flex-shrink-0" />}
                    {!desktopAccordion.has('info') && (
                      <span className={`text-[11px] truncate opacity-50 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {tempTemplateName || '—'} · {tempTemplateAuthor || '—'} · {tempTemplateBestModel || '—'}
                      </span>
                    )}
                  </button>
                  {desktopAccordion.has('info') && (
                    <div className={`px-6 pb-4 pt-4 ${isDarkMode ? 'bg-white/[0.02]' : 'bg-[#F5EAE0]/40'}`}>
                      <div className="grid grid-cols-4 gap-3" ref={selectRef}>
                        <div className="flex flex-col gap-0.5">
                          <label className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{language === 'cn' ? '标题' : 'Title'}</label>
                          <input type="text" value={tempTemplateName} onChange={(e) => setTempTemplateName(e.target.value)} onBlur={saveTemplateName}
                            className={`text-sm font-bold bg-transparent border-b-2 border-orange-500/20 focus:border-orange-500 focus:outline-none w-full pb-0.5 transition-all ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                            placeholder={t('label_placeholder')} />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <label className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{language === 'cn' ? '作者' : 'Author'}</label>
                          <input type="text" value={tempTemplateAuthor} onChange={(e) => setTempTemplateAuthor(e.target.value)} onBlur={saveTemplateName}
                            disabled={INITIAL_TEMPLATES_CONFIG.some(cfg => cfg.id === activeTemplate.id)}
                            className={`text-sm font-bold bg-transparent border-b border-dashed focus:border-solid border-orange-500/30 focus:border-orange-500 focus:outline-none w-full pb-0.5 transition-all ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                            placeholder={language === 'cn' ? '作者...' : 'Author...'} />
                          {INITIAL_TEMPLATES_CONFIG.some(cfg => cfg.id === activeTemplate.id) && (
                            <p className="text-[9px] text-orange-500/50 font-bold italic mt-1">{language === 'cn' ? '* 系统模版作者不可修改' : '* Read-only'}</p>
                          )}
                        </div>
                        <div className="flex flex-col gap-0.5 relative">
                          <label className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{t('best_model')}</label>
                          <button onClick={() => setActiveSelect(activeSelect === 'bestModel' ? null : 'bestModel')}
                            className={`text-xs font-bold bg-transparent border-b border-dashed border-orange-500/30 hover:border-orange-500 transition-all w-full pb-0.5 text-left flex items-center justify-between ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                            <span className="truncate">{tempTemplateBestModel || t('please_select')}</span>
                            <ChevronRight size={10} className={`flex-shrink-0 transition-transform duration-200 ${activeSelect === 'bestModel' ? 'rotate-90' : ''}`} />
                          </button>
                          {activeSelect === 'bestModel' && (
                            <div className={`absolute top-full left-0 right-0 mt-1 z-50 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border ${isDarkMode ? 'bg-[#2A2928] border-white/10' : 'bg-white border-gray-100'}`} style={{ backdropFilter: 'blur(20px)' }}>
                              {(activeTemplate.type === 'video' ? ['Seedance 2.0', 'Veo 3.1', 'Kling 3.0'] : ['Nano Banana Pro', 'Midjourney V7', 'Zimage']).map((opt) => (
                                <button key={opt} onClick={() => { updateTemplateProperty('bestModel', opt); setActiveSelect(null); }}
                                  className={`w-full text-left px-3 py-1.5 text-xs transition-all flex items-center justify-between ${tempTemplateBestModel === opt ? 'bg-orange-500/10 text-orange-500 font-bold' : (isDarkMode ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-50')}`}>
                                  {opt}{tempTemplateBestModel === opt && <Check size={10} />}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-0.5 relative">
                          <label className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{t('base_image')}</label>
                          <button onClick={() => setActiveSelect(activeSelect === 'baseImage' ? null : 'baseImage')}
                            className={`text-xs font-bold bg-transparent border-b border-dashed border-orange-500/30 hover:border-orange-500 transition-all w-full pb-0.5 text-left flex items-center justify-between ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                            <span className="truncate">{tempTemplateBaseImage ? t(tempTemplateBaseImage) : t('please_select')}</span>
                            <ChevronRight size={10} className={`flex-shrink-0 transition-transform duration-200 ${activeSelect === 'baseImage' ? 'rotate-90' : ''}`} />
                          </button>
                          {activeSelect === 'baseImage' && (
                            <div className={`absolute top-full left-0 right-0 mt-1 z-50 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border ${isDarkMode ? 'bg-[#2A2928] border-white/10' : 'bg-white border-gray-100'}`} style={{ backdropFilter: 'blur(20px)' }}>
                              {['no_base_image', 'recommend_base_image', 'optional_base_image'].map((opt) => (
                                <button key={opt} onClick={() => { updateTemplateProperty('baseImage', opt); setActiveSelect(null); }}
                                  className={`w-full text-left px-3 py-1.5 text-xs transition-all flex items-center justify-between ${tempTemplateBaseImage === opt ? 'bg-orange-500/10 text-orange-500 font-bold' : (isDarkMode ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-50')}`}>
                                  {t(opt)}{tempTemplateBaseImage === opt && <Check size={10} />}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* ---- Desktop Section 2: 成果预览 ---- */}
                <div className={`border-b ${isDarkMode ? 'border-white/5' : 'border-gray-200/60'}`}>
                  <button
                    onClick={() => toggleDesktopAccordion('preview')}
                    className={`w-full flex items-center gap-3 px-6 h-11 select-none hover:opacity-80 transition-opacity ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                  >
                    <Film size={15} className={`flex-shrink-0 ${desktopAccordion.has('preview') ? 'text-orange-500' : 'opacity-40'}`} />
                    <span className="text-sm font-bold">{language === 'cn' ? '成果预览' : 'Results'}</span>
                    {desktopAccordion.has('preview') ? <ChevronUp size={15} className="text-orange-500 flex-shrink-0" /> : <ChevronDown size={15} className="opacity-40 flex-shrink-0" />}
                    {!desktopAccordion.has('preview') && (
                      <span className={`text-[11px] truncate opacity-50 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {activeTemplate.type === 'video'
                          ? `${tempVideoUrl ? '1' : '0'} ${language === 'cn' ? '视频' : 'Video'}${activeTemplate.imageUrl ? ` + ${language === 'cn' ? '封面' : 'Cover'}` : ''}`
                          : `${(activeTemplate.imageUrls?.length || (activeTemplate.imageUrl ? 1 : 0))} ${language === 'cn' ? '张图' : 'images'}`
                        }
                      </span>
                    )}
                  </button>
                  {desktopAccordion.has('preview') && (
                    <div className={`px-6 pb-4 pt-4 ${isDarkMode ? 'bg-white/[0.02]' : 'bg-[#F5EAE0]/40'}`}>
                      <HScrollArea isDarkMode={isDarkMode}>
                        {activeTemplate.type === 'video' ? (
                          <>
                            {/* Video result */}
                            <div className="flex-shrink-0 flex flex-col gap-1">
                              <label className={`text-[10px] font-black uppercase tracking-widest opacity-40 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{language === 'cn' ? '成果视频' : 'Video'}</label>
                              {tempVideoUrl ? (
                                <div className={`relative group/v-result rounded-lg border-2 transition-all cursor-zoom-in hover:scale-[1.02] ${isDarkMode ? 'border-white/5 bg-white/5' : 'border-gray-100 bg-gray-50'}`}
                                  onClick={() => setSourceZoomedItem({ url: tempVideoUrl, type: 'video' })}>
                                  <div className="w-[210px] h-[210px] overflow-hidden rounded-lg flex items-center justify-center">
                                    {getVideoEmbedInfo(tempVideoUrl)?.platform === 'video' ? (
                                      <video src={tempVideoUrl} className="w-full h-full object-cover" muted playsInline
                                        onMouseEnter={e => e.target.play()} onMouseLeave={e => { e.target.pause(); e.target.currentTime = 0; }} />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center bg-black/20"><Play size={32} className="text-white/60" fill="currentColor" /></div>
                                    )}
                                  </div>
                                  <div className={`absolute bottom-0 inset-x-0 text-center py-1 text-[9px] font-bold rounded-b-lg ${isDarkMode ? 'bg-black/50 text-white/50' : 'bg-black/30 text-white/80'}`}>{language === 'cn' ? '视频' : 'Video'}</div>
                                  <button onClick={(e) => { e.stopPropagation(); setImageUpdateMode('replace_video_url'); fileInputRef.current?.click(); }}
                                    className="absolute top-2 left-2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg opacity-0 group-hover/v-result:opacity-100 transition-opacity z-[20]"><Upload size={16} /></button>
                                  <button onClick={(e) => { e.stopPropagation(); setTempVideoUrl(''); updateTemplateProperty('videoUrl', ''); }}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 shadow-lg opacity-0 group-hover/v-result:opacity-100 transition-opacity z-[20]"><X size={16} /></button>
                                </div>
                              ) : (
                                <div className={`w-[210px] h-[210px] rounded-lg border-2 border-dashed flex items-center justify-center gap-4 ${isDarkMode ? 'border-white/10 text-gray-600' : 'border-gray-200 text-gray-400'}`}>
                                  <button onClick={() => { setImageUpdateMode('replace_video_url'); fileInputRef.current?.click(); }}
                                    className={`flex flex-col items-center gap-2 p-3 rounded transition-all ${isDarkMode ? 'hover:bg-white/10 hover:text-orange-400' : 'hover:bg-orange-50 hover:text-orange-500'}`}>
                                    <Upload size={24} /><span className="text-[10px] font-bold">{language === 'cn' ? '本地' : 'Local'}</span>
                                  </button>
                                  <div className={`w-px h-8 ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
                                  <button onClick={() => { setImageUpdateMode('replace_video_url'); setShowImageUrlInput(true); }}
                                    className={`flex flex-col items-center gap-2 p-3 rounded transition-all ${isDarkMode ? 'hover:bg-white/10 hover:text-orange-400' : 'hover:bg-orange-50 hover:text-orange-500'}`}>
                                    <Globe size={24} /><span className="text-[10px] font-bold">{language === 'cn' ? '链接' : 'URL'}</span>
                                  </button>
                                </div>
                              )}
                            </div>
                            {/* Cover image */}
                            <div className="flex-shrink-0 flex flex-col gap-1">
                              <label className={`text-[10px] font-black uppercase tracking-widest opacity-40 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{language === 'cn' ? '封面' : 'Cover'}</label>
                              {activeTemplate.imageUrl ? (
                                <div className={`relative group/cover rounded-lg border-2 transition-all cursor-zoom-in hover:scale-[1.02] ${isDarkMode ? 'border-white/5 bg-white/5' : 'border-gray-100 bg-gray-50'}`}
                                  onClick={() => setSourceZoomedItem({ url: activeTemplate.imageUrl, type: 'image' })}>
                                  <div className="w-[210px] h-[210px] overflow-hidden rounded-lg">
                                    <OptimizedImage src={activeTemplate.imageUrl} alt="Cover" className="w-full h-full object-cover" isDarkMode={isDarkMode} priority={8} />
                                  </div>
                                  <button onClick={(e) => { e.stopPropagation(); setImageUpdateMode('replace_cover'); fileInputRef.current?.click(); }}
                                    className="absolute top-2 left-2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg opacity-0 group-hover/cover:opacity-100 transition-opacity z-[20]"><Upload size={16} /></button>
                                  <button onClick={(e) => { e.stopPropagation(); updateTemplateProperty('imageUrl', ''); }}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 shadow-lg opacity-0 group-hover/cover:opacity-100 transition-opacity z-[20]"><X size={16} /></button>
                                </div>
                              ) : (
                                <div className={`w-[210px] h-[210px] rounded-lg border-2 border-dashed flex items-center justify-center gap-4 ${isDarkMode ? 'border-white/10 text-gray-600' : 'border-gray-200 text-gray-400'}`}>
                                  <button onClick={() => { setImageUpdateMode('replace_cover'); fileInputRef.current?.click(); }}
                                    className={`flex flex-col items-center gap-2 p-3 rounded transition-all ${isDarkMode ? 'hover:bg-white/10 hover:text-orange-400' : 'hover:bg-orange-50 hover:text-orange-500'}`}>
                                    <Upload size={24} /><span className="text-[10px] font-bold">{language === 'cn' ? '本地' : 'Local'}</span>
                                  </button>
                                  <div className={`w-px h-8 ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
                                  <button onClick={() => { setImageUpdateMode('replace_cover'); setShowImageUrlInput(true); }}
                                    className={`flex flex-col items-center gap-2 p-3 rounded transition-all ${isDarkMode ? 'hover:bg-white/10 hover:text-orange-400' : 'hover:bg-orange-50 hover:text-orange-500'}`}>
                                    <Globe size={24} /><span className="text-[10px] font-bold">{language === 'cn' ? '链接' : 'URL'}</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            {(activeTemplate.imageUrls && activeTemplate.imageUrls.length > 0 ? activeTemplate.imageUrls : (activeTemplate.imageUrl ? [activeTemplate.imageUrl] : [])).map((url, idx) => (
                              <div key={idx}
                                className={`flex-shrink-0 relative group/result rounded-lg border-2 transition-all cursor-zoom-in hover:scale-[1.02] ${isDarkMode ? 'border-white/5 bg-white/5' : 'border-gray-100 bg-gray-50'}`}
                                onClick={() => setSourceZoomedItem({ url, type: 'image' })}>
                                <div className="w-[210px] h-[210px] overflow-hidden rounded-lg">
                                  <OptimizedImage src={url} alt={`Result ${idx + 1}`} className="w-full h-full object-cover" isDarkMode={isDarkMode} priority={8} />
                                </div>
                                <button onClick={(e) => { e.stopPropagation(); setImageUpdateMode('replace'); setCurrentImageEditIndex(idx); fileInputRef.current?.click(); }}
                                  className="absolute top-2 left-2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg opacity-0 group-hover/result:opacity-100 transition-opacity z-[20]"><Upload size={16} /></button>
                                <button onClick={(e) => { e.stopPropagation(); requestDeleteImage(e, idx); }}
                                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 shadow-lg opacity-0 group-hover/result:opacity-100 transition-opacity z-[20]"><X size={16} /></button>
                              </div>
                            ))}
                            <div className={`flex-shrink-0 w-[210px] h-[210px] rounded-lg border-2 border-dashed flex items-center justify-center gap-4 ${isDarkMode ? 'border-white/10 text-gray-600' : 'border-gray-200 text-gray-400'}`}>
                              <button onClick={() => { setImageUpdateMode('add'); fileInputRef.current?.click(); }}
                                className={`flex flex-col items-center gap-2 p-3 rounded transition-all ${isDarkMode ? 'hover:bg-white/10 hover:text-orange-400' : 'hover:bg-orange-50 hover:text-orange-500'}`}>
                                <Upload size={24} /><span className="text-[10px] font-bold">{language === 'cn' ? '本地' : 'Local'}</span>
                              </button>
                              <div className={`w-px h-8 ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
                              <button onClick={() => { setImageUpdateMode('add'); setShowImageUrlInput(true); }}
                                className={`flex flex-col items-center gap-2 p-3 rounded transition-all ${isDarkMode ? 'hover:bg-white/10 hover:text-orange-400' : 'hover:bg-orange-50 hover:text-orange-500'}`}>
                                <Globe size={24} /><span className="text-[10px] font-bold">{language === 'cn' ? '链接' : 'URL'}</span>
                              </button>
                            </div>
                          </>
                        )}
                      </HScrollArea>
                    </div>
                  )}
                </div>

                {/* ---- Desktop Section 3: 素材准备 ---- */}
                <div className={`border-b ${isDarkMode ? 'border-white/5' : 'border-gray-200/60'}`}>
                  <button
                    onClick={() => toggleDesktopAccordion('source')}
                    className={`w-full flex items-center gap-3 px-6 h-11 select-none hover:opacity-80 transition-opacity ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                  >
                    <FolderOpen size={15} className={`flex-shrink-0 ${desktopAccordion.has('source') ? 'text-orange-500' : 'opacity-40'}`} />
                    <span className="text-sm font-bold">{language === 'cn' ? '素材准备' : 'Source Assets'}</span>
                    {desktopAccordion.has('source') ? <ChevronUp size={15} className="text-orange-500 flex-shrink-0" /> : <ChevronDown size={15} className="opacity-40 flex-shrink-0" />}
                    {!desktopAccordion.has('source') && (
                      <span className={`text-[11px] truncate opacity-50 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {(activeTemplate.source || []).length} {language === 'cn' ? '个素材' : 'assets'}
                      </span>
                    )}
                  </button>
                  {desktopAccordion.has('source') && (
                    <div className={`px-6 pb-4 pt-4 ${isDarkMode ? 'bg-white/[0.02]' : 'bg-[#F5EAE0]/40'}`}>
                      {renderSourceAssets()}
                    </div>
                  )}
                </div>

                {/* ---- Desktop Section 4: 内容呈现 ---- */}
                <div className={`border-b ${isDarkMode ? 'border-white/5' : 'border-gray-200/60'}`}>
                  <button
                    onClick={() => toggleDesktopAccordion('content')}
                    className={`w-full flex items-center gap-3 px-6 h-11 select-none hover:opacity-80 transition-opacity ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                  >
                    <FileText size={15} className={`flex-shrink-0 ${desktopAccordion.has('content') ? 'text-orange-500' : 'opacity-40'}`} />
                    <span className="text-sm font-bold">{language === 'cn' ? '内容呈现' : 'Content'}</span>
                    {desktopAccordion.has('content') ? <ChevronUp size={15} className="text-orange-500 flex-shrink-0" /> : <ChevronDown size={15} className="opacity-40 flex-shrink-0" />}
                  </button>
                  {desktopAccordion.has('content') && (
                    <div className="relative overflow-hidden" style={{ height: 'calc(100vh - 320px)' }}>
                      <div className={`w-full h-full ${isSmartSplitLoading ? 'text-processing-mask' : ''}`}>
                        <VisualEditor
                          ref={textareaRef}
                          value={getLocalized(activeTemplate?.content, templateLanguage)}
                          onChange={(e) => {
                            const newText = e.target.value;
                            if (typeof activeTemplate.content === 'object') {
                              updateActiveTemplateContent({ ...activeTemplate.content, [templateLanguage]: newText });
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
                          onInteraction={() => {
                            if (desktopAccordion.has('info') || desktopAccordion.has('preview') || desktopAccordion.has('source')) {
                              setDesktopAccordion(new Set(['content']));
                            }
                          }}
                          onUndo={handleUndo}
                          onRedo={handleRedo}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>              )
            ) : (
              /* 预览模式 */
              <div className="flex-1 relative overflow-hidden flex flex-col">
                {/* Content Area with Shimmer Effect */}
                <div className={`flex-1 overflow-hidden flex flex-col ${isSmartSplitLoading ? 'text-processing-mask' : ''}`}>
                  <TemplatePreview
                    key={activeTemplate.id}
                    activeTemplate={activeTemplate}
                    setSourceZoomedItem={setSourceZoomedItem}
                    banks={banks}
                    defaults={defaults}
                    categories={categories}
                    activePopover={activePopover}
                    setActivePopover={setActivePopover}
                    handleSelect={handleSelect}
                    handleAddCustomAndSelect={handleAddCustomAndSelect}
                    popoverRef={popoverRef}
                    t={t}
                    displayTag={(tag) => {
                      const tagLabels = {
                        '创意': { cn: '创意', en: 'Creative' },
                        '人物': { cn: '人物', en: 'Character' },
                        '场景': { cn: '场景', en: 'Scene' },
                        '风格': { cn: '风格', en: 'Style' },
                        '物品': { cn: '物品', en: 'Object' },
                      };
                      return getLocalized(tagLabels[tag] || tag, language);
                    }}
                    TAG_STYLES={TAG_STYLES}
                    setZoomedImage={setZoomedImage}
                    fileInputRef={fileInputRef}
                    setShowImageUrlInput={setShowImageUrlInput}
                    handleResetImage={handleResetImage}
                    requestDeleteImage={requestDeleteImage}
                    language={templateLanguage}
                    setLanguage={setTemplateLanguage}
                    TEMPLATE_TAGS={TEMPLATE_TAGS}
                    handleUpdateTemplateTags={handleUpdateTemplateTags}
                    editingTemplateTags={editingTemplateTags}
                    setEditingTemplateTags={setEditingTemplateTags}
                    setImageUpdateMode={setImageUpdateMode}
                    setCurrentImageEditIndex={setCurrentImageEditIndex}
                    editingTemplateNameId={editingTemplateNameId}
                    tempTemplateName={tempTemplateName}
                    setTempTemplateName={setTempTemplateName}
                    saveTemplateName={saveTemplateName}
                    startRenamingTemplate={startRenamingTemplate}
                    setEditingTemplateNameId={setEditingTemplateNameId}
                    tempTemplateAuthor={tempTemplateAuthor}
                    setTempTemplateAuthor={setTempTemplateAuthor}
                    tempTemplateBestModel={tempTemplateBestModel}
                    setTempTemplateBestModel={setTempTemplateBestModel}
                    tempTemplateBaseImage={tempTemplateBaseImage}
                    setTempTemplateBaseImage={setTempTemplateBaseImage}
                    INITIAL_TEMPLATES_CONFIG={INITIAL_TEMPLATES_CONFIG}
                    isDarkMode={isDarkMode}
                    isEditing={isEditing}
                    setIsInsertModalOpen={setIsInsertModalOpen}
                    historyPast={historyPast}
                    historyFuture={historyFuture}
                    handleUndo={handleUndo}
                    handleRedo={handleRedo}
                    cursorInVariable={cursorInVariable}
                    currentGroupId={currentGroupId}
                    handleSetGroup={handleSetGroup}
                    handleRemoveGroup={handleRemoveGroup}
                    updateActiveTemplateContent={updateActiveTemplateContent}
                    textareaRef={textareaRef}
                    templateLanguage={templateLanguage}
                    onGenerateAITerms={onGenerateAITerms}  // 传递 AI 生成回调
                    handleShareLink={handleShareLink} // 传递分享回调
                    updateTemplateProperty={updateTemplateProperty}
                    templates={templates}
                    setActiveTemplateId={setActiveTemplateId}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== 智能拆分全局加载弹窗 ===== */}
      {isSmartSplitLoading && (
        <div className="absolute inset-0 z-[70] flex flex-col items-center justify-center pointer-events-none smart-split-loading-overlay">
          <ScanningAnimation isDarkMode={isDarkMode} language={language} />
        </div>
      )}

      {/* 关联模版选择弹窗 */}
      <LinkTemplateModal
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
        templates={templates}
        currentTemplateId={activeTemplate.id}
        language={language}
        isDarkMode={isDarkMode}
        onSelect={(template, selectedUrl) => {
          const url = selectedUrl || (template.imageUrls && template.imageUrls[0]) || template.imageUrl || '';
          const name = getLocalized(template.name, language);
          const nextSources = [...(activeTemplate.source || []), {
            type: 'image',
            url,
            templateId: template.id,
            templateName: name,
          }];
          updateTemplateProperty('source', nextSources);
        }}
      />

    </div>
  );
});

TemplateEditor.displayName = 'TemplateEditor';
