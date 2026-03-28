import React, { useMemo, useRef } from 'react';
import { Variable } from './Variable';
import { VisualEditor } from './VisualEditor';
import { EditorToolbar } from './EditorToolbar';
import { ImageIcon, ArrowUpRight, Upload, Globe, RotateCcw, Pencil, Check, X, ChevronLeft, ChevronRight, Plus, Trash2, Play, Link } from 'lucide-react';
import { WaypointsIcon } from './icons/WaypointsIcon';
import { getLocalized, getVideoEmbedInfo } from '../utils/helpers';
import { OptimizedImage } from './OptimizedImage';
import { useResolvedFolderMediaSrc } from '../context/FolderStorageContext';
import { isFolderMediaPath } from '../utils/folderImages';

/** 本地文件夹下 images/ 路径的视频 + poster */
function PreviewInlineVideo({ videoSrc, posterSrc, videoKey, isDarkMode, onLoaded, onClick, language }) {
  const { displaySrc: vSrc, failed: vFail } = useResolvedFolderMediaSrc(videoSrc || '');
  const { displaySrc: pSrc } = useResolvedFolderMediaSrc(posterSrc || '');
  if (vFail || !vSrc) {
    return (
      <div className={`w-full min-h-[200px] flex items-center justify-center rounded-md text-xs ${isDarkMode ? 'bg-black/40 text-gray-500' : 'bg-gray-100 text-gray-400'}`}>
        {language === 'cn' ? '视频不可用' : 'Video unavailable'}
      </div>
    );
  }
  return (
    <video
      key={videoKey}
      src={vSrc}
      poster={pSrc || undefined}
      controls
      playsInline
      className="w-full h-auto block rounded-md"
      onClick={onClick}
      onLoadedData={onLoaded}
      onCanPlay={onLoaded}
    />
  );
}

function SourceThumbVideo({ src, className, onMouseEnter, onMouseLeave }) {
  const { displaySrc, failed } = useResolvedFolderMediaSrc(src || '');
  if (failed || !displaySrc) {
    return (
      <div className={`${className} bg-black/20 flex items-center justify-center`}>
        <Play size={24} className="text-white/60" fill="currentColor" />
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
 * TemplatePreview 组件 - 负责渲染模版的预览内容，包括变量交互
 */
export const TemplatePreview = React.memo(({
  activeTemplate,
  templates,
  setActiveTemplateId,
  setSourceZoomedItem,
  banks,
  defaults,
  categories,
  activePopover,
  setActivePopover,
  handleSelect,
  handleAddCustomAndSelect,
  popoverRef,
  t,
  displayTag,
  TAG_STYLES,
  setZoomedImage,
  fileInputRef,
  setShowImageUrlInput,
  handleResetImage,
  requestDeleteImage,
  language,
  setLanguage,
  // 标签编辑相关
  TEMPLATE_TAGS,
  handleUpdateTemplateTags,
  editingTemplateTags,
  setEditingTemplateTags,
  // 多图相关
  setImageUpdateMode,
  setCurrentImageEditIndex,
  // 标题编辑相关
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
  INITIAL_TEMPLATES_CONFIG,
  isDarkMode,
  // 编辑模式相关
  isEditing,
  setIsInsertModalOpen,
  historyPast,
  historyFuture,
  handleUndo,
  handleRedo,
  cursorInVariable,
  currentGroupId,
  handleSetGroup,
  handleRemoveGroup,
  updateActiveTemplateContent,
  textareaRef,
  templateLanguage,
  handleShareLink, // 新增：分享处理函数
  // AI 相关（预留接口）
  onGenerateAITerms = null,  // AI 生成词条的回调函数
  updateTemplateProperty, // 新增：立即更新属性的函数
}) => {
  const [activeSelect, setActiveSelect] = React.useState(null); // 'bestModel' | 'baseImage' | null
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

  const [editImageIndex, setEditImageIndex] = React.useState(0);
  const [videoLoading, setVideoLoading] = React.useState(!!activeTemplate.videoUrl);
  const previewShareIconRef = React.useRef(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // 颜色映射配置 - 参考词库 (CATEGORY_STYLES) 的专业配色，弃用灰色系
  const MODEL_COLORS = {
    'Nano Banana Pro': 'text-blue-600/90 dark:text-blue-400/90',
    'Midjourney V7': 'text-violet-600/90 dark:text-violet-400/90',
    'Zimage': 'text-emerald-600/90 dark:text-emerald-400/90',
    'Seedance 2.0': 'text-orange-600/90 dark:text-orange-400/90',
    'Veo 3.1': 'text-rose-600/90 dark:text-rose-400/90',
    'Kling 3.0': 'text-cyan-600/90 dark:text-cyan-400/90',
  };

  const BASE_IMAGE_COLORS = {
    'no_base_image': 'text-teal-600/90 dark:text-teal-400/90',
    'recommend_base_image': 'text-rose-600/90 dark:text-rose-400/90',
    'optional_base_image': 'text-amber-600/90 dark:text-amber-400/90',
  };

  const AUTHOR_COLOR = activeTemplate.author === '官方' || !activeTemplate.author 
    ? 'text-orange-600/90' 
    : 'text-indigo-600/90 dark:text-indigo-400/90';


  const allImages = React.useMemo(() => {
    if (activeTemplate?.imageUrls && Array.isArray(activeTemplate.imageUrls) && activeTemplate.imageUrls.length > 0) {
      return activeTemplate.imageUrls;
    }
    return activeTemplate?.imageUrl ? [activeTemplate.imageUrl] : [];
  }, [activeTemplate.imageUrls, activeTemplate.imageUrl]);

  const currentImageUrl = allImages[editImageIndex] || activeTemplate?.imageUrl;

  // 当多图数组长度增加时（即添加了新图），自动切换到最后一张
  const lastImageCount = React.useRef(allImages.length);
  React.useEffect(() => {
    if (allImages.length > lastImageCount.current) {
      setEditImageIndex(allImages.length - 1);
    }
    lastImageCount.current = allImages.length;
  }, [allImages.length]);

  // 当模板切换或图片索引切换时，同步编辑索引给父组件
  React.useEffect(() => {
    setCurrentImageEditIndex(editImageIndex);
  }, [editImageIndex, setCurrentImageEditIndex]);

  React.useEffect(() => {
    setEditImageIndex(0);
    if (activeTemplate.videoUrl) setVideoLoading(true);
  }, [activeTemplate.id]);

  const templateLangs = activeTemplate.language ? (Array.isArray(activeTemplate.language) ? activeTemplate.language : [activeTemplate.language]) : ['cn', 'en'];
  
  // 自动切换到模板支持的语言
  React.useEffect(() => {
    if (!templateLangs.includes(language)) {
      // 如果当前语言不支持，切换到模板支持的第一个语言
      setLanguage(templateLangs[0]);
    }
  }, [activeTemplate.id, templateLangs, language]);

  const supportsChinese = templateLangs.includes('cn');
  const supportsEnglish = templateLangs.includes('en');
  const showLanguageToggle = templateLangs.length > 1;
  const isVideo = activeTemplate.type === 'video';
  const sources = activeTemplate.source || [];

  // 变量解析工具函数：从变量名中提取 baseKey 和 groupId
  const parseVariableName = (varName) => {
    const match = varName.match(/^(.+?)(?:_(\d+))?$/);
    if (match) {
      return {
        baseKey: match[1],
        groupId: match[2] || null
      };
    }
    return { baseKey: varName, groupId: null };
  };

  // 解析 {{A: val}} 或 {{A}} 语法
  const parseInlineSyntax = (raw) => {
    const colonIdx = raw.indexOf(':');
    if (colonIdx === -1) return { varPart: raw.trim(), inlineVal: null };
    return {
      varPart: raw.slice(0, colonIdx).trim(),
      inlineVal: raw.slice(colonIdx + 1).trim() || null,
    };
  };

  // 组件顶层派生 localOptions，供 parseLineWithVariables 直接访问（闭包）
  const localOptions = activeTemplate.localOptions || {};

  const parseLineWithVariables = (text, lineKeyPrefix, counters, fullContext = "") => {
    const parts = text.split(/({{[^}]+}})/g);
    return parts.map((part, idx) => {
      if (part.startsWith('{{') && part.endsWith('}}')) {
        const rawInner = part.slice(2, -2);
        const { varPart: fullKey, inlineVal } = parseInlineSyntax(rawInner);

        const parsed = parseVariableName(fullKey);
        const baseKey = parsed.baseKey;
        
        // 使用完整的 fullKey 作为计数器的 key，以区分不同组的同名变量
        const varIndex = counters[fullKey] || 0;
        counters[fullKey] = varIndex + 1;
        
        const uniqueKey = `${fullKey}-${varIndex}`;

        // 当前值优先级：selections > 内联值 > defaults
        let currentValue = activeTemplate.selections[uniqueKey];
        
        // 如果存储的值是字符串且等于变量名（错误存储），跳过
        if (typeof currentValue === 'string' && currentValue === fullKey) {
          currentValue = null;
        }

        if (!currentValue) {
          // 有内联值则用内联值，否则 fallback 到 defaults
          currentValue = inlineVal ? inlineVal : defaults[baseKey];
        }
        
        // 清理带 groupId 后缀的错误值
        if (typeof currentValue === 'string' && currentValue.endsWith(`_${parsed.groupId}`) && parsed.groupId) {
          const bank = banks[baseKey];
          if (bank && bank.options) {
            const valueWithoutSuffix = currentValue.replace(`_${parsed.groupId}`, '');
            const matchedOption = bank.options.find(opt => {
              const optStr = typeof opt === 'string' ? opt : (opt[language] || opt.cn || opt.en || '');
              return optStr === valueWithoutSuffix;
            });
            if (matchedOption) currentValue = matchedOption;
          }
        }

        // 获取词库配置；若不在词库中但有内联值或临时词条，则用合成 config 以便正常显示和选择
        const bankConfig = banks[baseKey];
        let config = bankConfig || banks[fullKey];
        const tempVal = localOptions[baseKey];
        const temporaryInlineVals = tempVal ? [tempVal] : [];
        if (!config && (inlineVal || temporaryInlineVals.length > 0)) {
          config = { category: 'other', label: baseKey, options: [] };
        }

        if (!config && process.env.NODE_ENV === 'development') {
          console.warn(`[Variable] 找不到词库配置: baseKey="${baseKey}", fullKey="${fullKey}", available keys:`, Object.keys(banks).slice(0, 10));
        }
        if (config && !config.category) {
          console.warn(`[Variable] 词库配置缺少 category: baseKey="${baseKey}", config:`, config);
        }

        return (
          <Variable
            key={`${lineKeyPrefix}-${idx}`}
            id={fullKey}
            index={varIndex}
            config={config}
            currentVal={currentValue}
            inlineDefault={inlineVal}
            temporaryInlineVals={temporaryInlineVals}
            isOpen={activePopover === uniqueKey}
            onToggle={(e) => {
              e.stopPropagation();
              setActivePopover(activePopover === uniqueKey ? null : uniqueKey);
            }}
            onSelect={(opt) => handleSelect(fullKey, varIndex, opt)}
            onAddCustom={(val) => handleAddCustomAndSelect(fullKey, varIndex, val)}
            popoverRef={popoverRef}
            categories={categories}
            t={t}
            language={language}
            isDarkMode={isDarkMode}
            groupId={parsed.groupId}
            onGenerateAITerms={onGenerateAITerms}
            templateContext={fullContext}
          />
        );
      }
      
      const boldParts = part.split(/(\*\*.*?\*\*)/g);
      return boldParts.map((bp, bIdx) => {
        if (bp.startsWith('**') && bp.endsWith('**')) {
          return <strong key={`${lineKeyPrefix}-${idx}-${bIdx}`} className={isDarkMode ? 'text-white' : 'text-gray-900'}>{bp.slice(2, -2)}</strong>;
        }
        return <span key={`${lineKeyPrefix}-${idx}-${bIdx}`}>{bp}</span>;
      });
    });
  };

  const renderedContent = useMemo(() => {
    const contentToRender = getLocalized(activeTemplate?.content, language);
    if (!contentToRender) return null;

    // 类型检查：确保 contentToRender 是字符串
    if (typeof contentToRender !== 'string') {
      console.error('TemplatePreview: content is not a string:', contentToRender);
      return null;
    }

    // 临时词条直接从模版的 localOptions 字段读取（由编辑/选词时自动维护，组件顶层已派生）

    const lines = contentToRender.split('\n');
    const counters = {}; 
    
    return lines.map((line, lineIdx) => {
      if (!line.trim()) return <div key={lineIdx} className="h-6"></div>;

      let content = line;
      let Type = 'div';
      let className = `${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-3 leading-10`;

      if (line.startsWith('# ')) {
        Type = 'h1';
        className = `text-2xl md:text-3xl font-black mt-8 mb-4 border-b-2 pb-3 ${isDarkMode ? 'text-white border-white/10' : 'text-gray-900 border-gray-200'}`;
        content = line.replace('# ', '');
      } else if (line.startsWith('## ')) {
        Type = 'h2';
        className = `text-xl md:text-2xl font-bold mt-7 mb-3 border-b pb-2 ${isDarkMode ? 'text-white border-white/10' : 'text-gray-900 border-gray-100'}`;
        content = line.replace('## ', '');
      } else if (line.startsWith('### ')) {
        Type = 'h3';
        className = `text-lg font-bold mt-6 mb-3 border-b pb-2 ${isDarkMode ? 'text-white border-white/10' : 'text-gray-900 border-gray-100'}`;
        content = line.replace('### ', '');
      } else if (line.trim().startsWith('- ')) {
        className = `ml-4 flex items-start gap-2 mb-2 leading-10 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`;
        content = (
          <React.Fragment key={lineIdx}>
            <span className={`${isDarkMode ? 'text-gray-600' : 'text-gray-400'} mt-2.5`}>•</span>
            <span className="flex-1">{parseLineWithVariables(line.replace('- ', '').trim(), lineIdx, counters, contentToRender)}</span>
          </React.Fragment>
        );
        return <div key={lineIdx} className={className}>{content}</div>;
      } else if (/^\d+\.\s/.test(line.trim())) {
         className = `ml-4 flex items-start gap-2 mb-2 leading-10 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`;
         const number = line.trim().match(/^\d+\./)[0];
         const text = line.trim().replace(/^\d+\.\s/, '');
         content = (
            <React.Fragment key={lineIdx}>
              <span className={`font-mono mt-1 min-w-[20px] ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>{number}</span>
              <span className="flex-1">{parseLineWithVariables(text, lineIdx, counters, contentToRender)}</span>
            </React.Fragment>
        );
        return <div key={lineIdx} className={className}>{content}</div>;
      }

      if (typeof content === 'string') {
          return <Type key={lineIdx} className={className}>{parseLineWithVariables(content, lineIdx, counters, contentToRender)}</Type>;
      }
      return <Type key={lineIdx} className={className}>{content}</Type>;
    });
  }, [activeTemplate.content, activeTemplate.selections, banks, defaults, activePopover, categories, t, language]);

  return (
    <div className="w-full h-full relative overflow-hidden group">
        {/* Background Image Layer - Blurry Ambient Background */}
        <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 opacity-30 blur-[60px] scale-110 pointer-events-none"
            style={{ 
                backgroundImage: currentImageUrl ? `url(${currentImageUrl})` : 'none',
            }}
        ></div>
        <div className={`absolute inset-0 pointer-events-none ${isDarkMode ? 'bg-black/30' : 'bg-white/5'}`}></div>

        <div className="w-full h-full overflow-y-auto px-3 py-4 md:px-4 lg:p-8 custom-scrollbar relative z-10">
            <div 
                id="preview-card"
                className={`${isVideo && !isEditing ? 'max-w-none w-full' : 'max-w-4xl'} mx-auto p-4 sm:p-6 md:p-8 lg:p-12 min-h-[500px] md:min-h-[600px] transition-all duration-500 relative ${isMobile ? (isDarkMode ? 'bg-[#242120]/90 border border-white/5 rounded-2xl shadow-2xl overflow-visible' : 'bg-white/90 border border-white/60 rounded-2xl shadow-xl overflow-visible') : (isDarkMode ? 'bg-black/20 backdrop-blur-md rounded-2xl border border-white/5 shadow-2xl' : 'bg-white/40 backdrop-blur-sm rounded-2xl border border-white/40 shadow-sm')}`}
            >
                {/* 移动端模版内语言切换 - 单独一行 */}
                {isMobile && showLanguageToggle && (
                  <div className={`flex items-center justify-center py-1 mb-3 border-b ${isDarkMode ? 'border-white/5' : 'border-gray-200/60'}`}>
                    <div className={`premium-toggle-container ${isDarkMode ? 'dark' : 'light'} shrink-0 scale-75`}>
                      <button onClick={() => supportsChinese && setLanguage('cn')}
                        className={`premium-toggle-item ${isDarkMode ? 'dark' : 'light'} ${language === 'cn' ? 'is-active' : ''} !px-2`}>CN</button>
                      <button onClick={() => supportsEnglish && setLanguage('en')}
                        className={`premium-toggle-item ${isDarkMode ? 'dark' : 'light'} ${language === 'en' ? 'is-active' : ''} !px-2`}>EN</button>
                    </div>
                  </div>
                )}

                {/* --- Top Section: Title & Image --- */}
                {isEditing && (
                    <div className={`backdrop-blur-sm mb-6 rounded-xl overflow-hidden border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white/30 border-gray-100'}`}>
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
                {isVideo && !isEditing ? (
                  /* ========== VIDEO TEMPLATE LAYOUT (match image preview style) ========== */
                  <div className="flex flex-col lg:flex-row gap-10 mb-10 items-start">
                    {/* Left: Big Video Player & Source Assets */}
                    <div className="flex-1 w-full min-w-0">
                      <div className={`p-1.5 md:p-2 rounded-lg md:rounded-xl shadow-md md:shadow-lg border transition-all duration-300 ${isDarkMode ? 'bg-[#2A2726] border-white/5' : 'bg-white border-gray-100/50'}`}>
                        <div className={`relative overflow-hidden rounded-md md:rounded-lg w-full ${isDarkMode ? 'bg-black/20' : 'bg-gray-50'}`}>
                          {videoLoading && activeTemplate.videoUrl && (
                            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-md">
                              <div className="flex flex-col items-center gap-3">
                                <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                                <span className="text-xs font-bold text-white/70">{language === 'cn' ? '视频加载中...' : 'Loading video...'}</span>
                              </div>
                            </div>
                          )}
                          {activeTemplate.videoUrl ? (
                            getVideoEmbedInfo(activeTemplate.videoUrl)?.isEmbed ? (
                              <div className="w-full aspect-video">
                                <iframe
                                  key={activeTemplate.id + '_embed'}
                                  src={getVideoEmbedInfo(activeTemplate.videoUrl).embedUrl}
                                  className="w-full h-full border-0 rounded-md shadow-lg"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  allowFullScreen
                                  title="Video Preview"
                                  onLoad={() => setVideoLoading(false)}
                                />
                              </div>
                            ) : (
                              <video 
                                key={activeTemplate.id + '_video'}
                                src={activeTemplate.videoUrl}
                                poster={currentImageUrl}
                                controls
                                playsInline
                                className="w-full h-auto block rounded-md max-h-[50vh] object-contain mx-auto"
                                onClick={(e) => e.stopPropagation()}
                                onLoadedData={() => setVideoLoading(false)}
                                onCanPlay={() => setVideoLoading(false)}
                              />
                            )
                          ) : (
                            <div className={`w-full aspect-video flex flex-col items-center justify-center ${isDarkMode ? 'text-gray-700' : 'text-gray-300'}`}>
                              <Play size={48} strokeWidth={1.5} />
                            </div>
                          )}
                        </div>

                        {/* Source Assets below video */}
                        {sources.length > 0 && (
                          <div className="mt-4 px-1">
                            <label className={`text-[10px] font-black uppercase tracking-widest mb-3 block opacity-40 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {language === 'cn' ? '参考素材 (SOURCE ASSETS)' : 'Source Assets'}
                            </label>
                            <div className="overflow-x-auto custom-scrollbar pb-2" style={{ scrollbarWidth: 'thin' }}>
                              <div className="flex gap-3 w-max">
                                {sources.map((src, sIdx) => (
                                  <div 
                                    key={sIdx}
                                    className={`relative group/source rounded-lg overflow-hidden border-2 transition-all hover:scale-105 hover:shadow-lg flex-shrink-0 ${isDarkMode ? 'border-white/5 bg-white/5' : 'border-white bg-gray-50'}`}
                                    onClick={() => {
                                      if (src.templateId) {
                                        if (templates && templates.some(t => t.id === src.templateId)) {
                                          setActiveTemplateId(src.templateId);
                                        } else {
                                          alert(language === 'cn' ? `关联的模版「${src.templateName || '未知'}」已不存在` : `Linked template "${src.templateName || 'Unknown'}" no longer exists`);
                                        }
                                      } else if (src.url) {
                                        setSourceZoomedItem(src);
                                      }
                                    }}
                                  >
                                    <div className="w-24 h-24 md:w-32 md:h-32 overflow-hidden flex items-center justify-center cursor-zoom-in">
                                      {src.type === 'video' ? (
                                        <div className="relative w-full h-full flex items-center justify-center bg-black/20">
                                          <Play size={24} className="text-white/60" fill="currentColor" />
                                        </div>
                                      ) : (
                                        <OptimizedImage
                                          src={src.url}
                                          alt={getLocalized(src.label, language) || `Source ${sIdx + 1}`}
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
                                    {src.label && (
                                      <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-sm py-1.5 px-2 opacity-0 group-hover/source:opacity-100 transition-opacity">
                                        <p className="text-[10px] text-white font-bold truncate text-center">
                                          {getLocalized(src.label, language)}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Meta Info & Actions */}
                    <div className="w-full lg:w-[360px] flex-shrink-0 flex flex-col gap-6 pt-2">
                      <div className="flex flex-col gap-3 group/title-edit">
                        <h2 className={`text-3xl md:text-4xl font-black tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {getLocalized(activeTemplate.name, language) || "Untitled Template"}
                        </h2>
                        {activeTemplate.author && (
                          <div className="mb-1.5 opacity-90">
                            <span className={`text-sm font-bold tracking-wide ${AUTHOR_COLOR}`}>
                              {activeTemplate.author === '官方' ? t('official') : activeTemplate.author}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 opacity-80">
                        {(activeTemplate.tags || []).map(tag => (
                          <span key={tag} className={`px-2 py-0.5 md:px-3 md:py-1 rounded-lg text-[10px] md:text-[11px] font-bold tracking-wider uppercase ${TAG_STYLES[tag] || TAG_STYLES["default"]}`}>
                            {displayTag(tag)}
                          </span>
                        ))}
                      </div>

                      {/* Best Model & Base Image (no card background) */}
                      <div className="flex flex-col gap-4">
                        {activeTemplate.bestModel && (
                          <div className="flex flex-col gap-1.5">
                            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isDarkMode ? 'text-white/20' : 'text-gray-400'}`}>
                              {t('best_model')}
                            </span>
                            <span className={`text-xs font-bold ${MODEL_COLORS[activeTemplate.bestModel] || 'text-gray-500'}`}>
                              {activeTemplate.bestModel}
                            </span>
                          </div>
                        )}
                        {activeTemplate.baseImage && (
                          <div className="flex flex-col gap-1.5">
                            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isDarkMode ? 'text-white/20' : 'text-gray-400'}`}>
                              {t('base_image')}
                            </span>
                            <span className={`text-xs font-bold ${BASE_IMAGE_COLORS[activeTemplate.baseImage] || 'text-gray-500'}`}>
                              {t(activeTemplate.baseImage)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                /* ========== IMAGE / EDITING TEMPLATE LAYOUT (original) ========== */
                <div className={`flex flex-col md:flex-row justify-between items-start mb-6 md:mb-10 relative ${isEditing ? 'border-b pb-8' : ''} ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
                    {/* Left: Title & Meta Info */}
                    <div className="flex-1 min-w-0 pr-4 z-10 pt-2">
                        {isEditing ? (
                            <div className="mb-4 flex flex-col gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
                                <div className="flex flex-col gap-1.5">
                                    <label className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                                        {language === 'cn' ? '模版标题 (TITLE)' : 'Template Title'}
                                    </label>
                                    <input 
                                        autoFocus
                                        type="text" 
                                        value={tempTemplateName}
                                        onChange={(e) => setTempTemplateName(e.target.value)}
                                        className={`text-2xl md:text-3xl font-bold bg-transparent border-b-2 border-orange-500 focus:outline-none w-full pb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                                        placeholder={t('label_placeholder')}
                                        onKeyDown={(e) => e.key === 'Enter' && saveTemplateName()}
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5 mt-2">
                                    <label className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                                        {language === 'cn' ? '作者 (AUTHOR)' : 'Author'}
                                    </label>
                                    <input 
                                        type="text" 
                                        value={tempTemplateAuthor}
                                        onChange={(e) => setTempTemplateAuthor(e.target.value)}
                                        className={`text-sm font-bold bg-transparent border-b border-dashed focus:border-solid border-orange-500/30 focus:border-orange-500 focus:outline-none w-full pb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
                                        placeholder={language === 'cn' ? '作者名称...' : 'Author name...'}
                                        disabled={INITIAL_TEMPLATES_CONFIG.some(cfg => cfg.id === activeTemplate.id)}
                                    />
                                    {INITIAL_TEMPLATES_CONFIG.some(cfg => cfg.id === activeTemplate.id) && (
                                        <p className="text-[10px] text-orange-500/50 font-bold italic">
                                            {language === 'cn' ? '* 系统模版作者不可修改' : '* System template author is read-only'}
                                        </p>
                                    )}
                                </div>
                      <div className="flex gap-4 mt-1" ref={selectRef}>
                        <div className="flex-1 flex flex-col gap-1.5 relative">
                          <label className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                            {t('best_model')}
                          </label>
                          <button
                            onClick={() => setActiveSelect(activeSelect === 'bestModel' ? null : 'bestModel')}
                            className={`text-sm font-bold bg-transparent border-b border-dashed border-orange-500/30 hover:border-orange-500 transition-all w-full pb-1 text-left flex items-center justify-between ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
                          >
                            <span>{tempTemplateBestModel || t('please_select')}</span>
                            <ChevronRight size={14} className={`transition-transform duration-200 ${activeSelect === 'bestModel' ? 'rotate-90' : ''}`} />
                          </button>
                          
                          {activeSelect === 'bestModel' && (
                            <div 
                              className={`absolute top-full left-0 right-0 mt-2 z-[100] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border ${isDarkMode ? 'bg-[#2A2928] border-white/10' : 'bg-white border-gray-100'}`}
                              style={{ backdropFilter: 'blur(20px)' }}
                            >
                              {['Nano Banana Pro', 'Midjourney V7', 'Zimage', 'Seedance 2.0', 'Veo 3.1', 'Kling 3.0'].map((opt) => (
                                <button
                                  key={opt}
                                  onClick={() => {
                                    updateTemplateProperty('bestModel', opt);
                                    setActiveSelect(null);
                                  }}
                                  className={`w-full text-left px-4 py-2.5 text-sm transition-all flex items-center justify-between ${tempTemplateBestModel === opt ? 'bg-orange-500/10 text-orange-500 font-bold' : (isDarkMode ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-50')}`}
                                >
                                  {opt}
                                  {tempTemplateBestModel === opt && <Check size={14} />}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 flex flex-col gap-1.5 relative">
                          <label className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                            {t('base_image')}
                          </label>
                          <button
                            onClick={() => setActiveSelect(activeSelect === 'baseImage' ? null : 'baseImage')}
                            className={`text-sm font-bold bg-transparent border-b border-dashed border-orange-500/30 hover:border-orange-500 transition-all w-full pb-1 text-left flex items-center justify-between ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
                          >
                            <span>{tempTemplateBaseImage ? t(tempTemplateBaseImage) : t('please_select')}</span>
                            <ChevronRight size={14} className={`transition-transform duration-200 ${activeSelect === 'baseImage' ? 'rotate-90' : ''}`} />
                          </button>

                          {activeSelect === 'baseImage' && (
                            <div 
                              className={`absolute top-full left-0 right-0 mt-2 z-[100] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border ${isDarkMode ? 'bg-[#2A2928] border-white/10' : 'bg-white border-gray-100'}`}
                              style={{ backdropFilter: 'blur(20px)' }}
                            >
                              {['no_base_image', 'recommend_base_image', 'optional_base_image'].map((opt) => (
                                <button
                                  key={opt}
                                  onClick={() => {
                                    updateTemplateProperty('baseImage', opt);
                                    setActiveSelect(null);
                                  }}
                                  className={`w-full text-left px-4 py-2.5 text-sm transition-all flex items-center justify-between ${tempTemplateBaseImage === opt ? 'bg-orange-500/10 text-orange-500 font-bold' : (isDarkMode ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-50')}`}
                                >
                                  {t(opt)}
                                  {tempTemplateBaseImage === opt && <Check size={14} />}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                                    <button 
                                        onClick={saveTemplateName}
                                        className="px-4 py-2 bg-orange-500 text-white text-xs font-bold rounded-xl hover:bg-orange-600 transition-all flex items-center gap-2 shadow-lg shadow-orange-500/20"
                                    >
                                        <Check size={14} />
                                        {t('confirm')}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3 mb-3 group/title-edit">
                                <h2 className={`text-3xl md:text-4xl font-black tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {getLocalized(activeTemplate.name, language)}
                                </h2>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        startRenamingTemplate(activeTemplate, e);
                                    }}
                                    className={`p-2 rounded-xl transition-all duration-200 opacity-0 group-hover/title-edit:opacity-100 ${isDarkMode ? 'text-gray-600 hover:text-orange-400 hover:bg-white/5' : 'text-gray-300 hover:text-orange-500 hover:bg-orange-50'}`}
                                    title={t('rename')}
                                >
                                    <Pencil size={18} />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleShareLink && handleShareLink();
                                    }}
                                    onMouseEnter={() => previewShareIconRef.current?.startAnimation()}
                                    onMouseLeave={() => previewShareIconRef.current?.stopAnimation()}
                                    className="p-2 rounded-xl transition-all duration-200 opacity-0 group-hover/title-edit:opacity-100 dark:text-gray-600 dark:hover:text-orange-400 dark:hover:bg-white/5 text-gray-300 hover:text-orange-500 hover:bg-orange-50"
                                    title={language === 'cn' ? '分享模版' : t('share_link')}
                                >
                                    <WaypointsIcon ref={previewShareIconRef} size={18} />
                                </button>
                            </div>
                        )}

                        {/* Meta Info: Author, Model, Base Image */}
                        {!isEditing && (
                            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 mt-1">
                                {/* Author */}
                                <div className="flex items-center gap-2">
                                    <span className={`uppercase tracking-widest text-[10px] font-black opacity-60 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {language === 'cn' ? '作者' : 'Author'}:
                                    </span>
                                    <span className={`text-xs font-black ${AUTHOR_COLOR}`}>
                                        {activeTemplate.author === '官方' ? t('official') : (activeTemplate.author || t('official'))}
                                    </span>
                                </div>

                                {/* Model */}
                                {activeTemplate.bestModel && (
                                    <div className="flex items-center gap-2">
                                        <span className={`uppercase tracking-widest text-[10px] font-black opacity-40 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {t('best_model')}:
                                        </span>
                                        <span className={`text-xs font-black ${MODEL_COLORS[activeTemplate.bestModel] || 'text-gray-500'}`}>
                                            {activeTemplate.bestModel}
                                        </span>
                                    </div>
                                )}

                                {/* Base Image */}
                                {activeTemplate.baseImage && (
                                    <div className="flex items-center gap-2">
                                        <span className={`uppercase tracking-widest text-[10px] font-black opacity-40 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {t('base_image')}:
                                        </span>
                                        <span className={`text-xs font-black ${BASE_IMAGE_COLORS[activeTemplate.baseImage] || 'text-gray-500'}`}>
                                            {t(activeTemplate.baseImage)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Tags / Meta */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            {(activeTemplate.tags || []).map(tag => (
                                <span 
                                    key={tag} 
                                    className={`px-2.5 py-1 rounded-md text-xs font-bold tracking-wide ${TAG_STYLES[tag] || TAG_STYLES["default"]}`}
                                >
                                    {displayTag(tag)}
                                </span>
                            ))}
                            
                            {/* Edit Tags Button */}
                            {editingTemplateTags?.id !== activeTemplate.id && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingTemplateTags({ id: activeTemplate.id, tags: activeTemplate.tags || [] });
                                    }}
                                    className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all duration-200 group/edit-tag ${isDarkMode ? 'text-gray-600 hover:text-orange-400 hover:bg-white/5' : 'text-gray-400 hover:text-orange-500 hover:bg-orange-50'}`}
                                    title={t('edit_tags')}
                                >
                                    <Pencil size={12} className="transition-transform group-hover/edit-tag:scale-110" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-0 group-hover/edit-tag:opacity-100 transition-opacity">{t('edit_tags')}</span>
                                </button>
                            )}
                        </div>

                        {/* Source Assets Section (hidden for video templates - shown below video instead) */}
                        {!isVideo && sources.length > 0 && (
                            <div className="mb-6 animate-in fade-in slide-in-from-left-2 duration-500">
                                <label className={`text-[10px] font-black uppercase tracking-widest mb-3 block opacity-40 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {language === 'cn' ? '参考素材 (SOURCE ASSETS)' : 'Source Assets'}
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {sources.map((src, sIdx) => (
                                        <div 
                                            key={sIdx}
                                            className={`relative group/source rounded-xl overflow-hidden border-2 transition-all hover:scale-105 hover:shadow-lg ${isDarkMode ? 'border-white/5 bg-white/5' : 'border-white bg-gray-50'}`}
                                            onClick={() => {
                                              if (src.templateId) {
                                                if (templates && templates.some(t => t.id === src.templateId)) {
                                                  setActiveTemplateId(src.templateId);
                                                } else {
                                                  alert(language === 'cn' ? `关联的模版「${src.templateName || '未知'}」已不存在` : `Linked template "${src.templateName || 'Unknown'}" no longer exists`);
                                                }
                                              } else if (src.url) {
                                                setSourceZoomedItem(src);
                                              }
                                            }}
                                        >
                                            <div className="w-28 h-28 md:w-36 md:h-36 overflow-hidden flex items-center justify-center cursor-zoom-in">
                                                {src.type === 'video' ? (
                                                    getVideoEmbedInfo(src.url)?.platform === 'video' || isFolderMediaPath(src.url) ? (
                                                        <SourceThumbVideo
                                                            src={src.url}
                                                            className="w-full h-full object-cover"
                                                            onMouseEnter={(e) => e.target.play()}
                                                            onMouseLeave={(e) => {
                                                                e.target.pause();
                                                                e.target.currentTime = 0;
                                                            }}
                                                        />
                                                    ) : (
                                                        <div className="relative w-full h-full flex items-center justify-center bg-black/20">
                                                            <Play size={24} className="text-white/60" fill="currentColor" />
                                                        </div>
                                                    )
                                                ) : (
                                                    <OptimizedImage
                                                        src={src.url}
                                                        alt={getLocalized(src.label, language) || `Source ${sIdx + 1}`}
                                                        className="w-full h-full object-cover"
                                                        isDarkMode={isDarkMode}
                                                        priority={10}
                                                    />
                                                )}
                                            </div>
                                            {/* 关联角标 */}
                                            {src.templateId && (
                                              <div className="absolute top-2 left-2 z-10 bg-orange-500 text-white rounded-md px-1.5 py-0.5 flex items-center gap-1 shadow-lg">
                                                <Link size={12} />
                                                <span className="text-[10px] font-black">{language === 'cn' ? '关联' : 'LINK'}</span>
                                              </div>
                                            )}
                                            {src.label && (
                                                <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-sm py-1.5 px-2 opacity-0 group-hover/source:opacity-100 transition-opacity">
                                                    <p className="text-[10px] text-white font-bold truncate text-center">
                                                        {getLocalized(src.label, language)}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Editing Tags UI */}
                        {editingTemplateTags?.id === activeTemplate.id && (
                            <div className={`mb-6 p-4 backdrop-blur-sm rounded-2xl border shadow-sm flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${isDarkMode ? 'bg-black/20 border-white/10' : 'bg-white/50 border-orange-100'}`}>
                                <div className={`flex items-center justify-between border-b pb-2 mb-1 ${isDarkMode ? 'border-white/5' : 'border-orange-50'}`}>
                                    <span className="text-xs font-bold text-gray-500 flex items-center gap-2">
                                        <Pencil size={12} className="text-orange-500" />
                                        {t('edit_tags')}
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleUpdateTemplateTags(activeTemplate.id, editingTemplateTags.tags);
                                                setEditingTemplateTags(null);
                                            }}
                                            className="p-1.5 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-all shadow-sm hover:shadow-orange-200 flex items-center gap-1.5 px-3"
                                        >
                                            <Check size={14} />
                                            <span className="text-xs font-bold">{t('confirm')}</span>
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setEditingTemplateTags(null);
                                            }}
                                            className={`p-1.5 rounded-lg transition-all flex items-center gap-1.5 px-3 ${isDarkMode ? 'bg-white/10 text-gray-400 hover:bg-white/20' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                                        >
                                            <X size={14} />
                                            <span className="text-xs font-bold">{t('cancel')}</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {TEMPLATE_TAGS.map(tag => (
                                        <button
                                            key={tag}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const currentTags = editingTemplateTags.tags || [];
                                                const newTags = currentTags.includes(tag)
                                                    ? currentTags.filter(t => t !== tag)
                                                    : [...currentTags, tag];
                                                setEditingTemplateTags({ id: activeTemplate.id, tags: newTags });
                                            }}
                                            className={`px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-300 group ${
                                                (editingTemplateTags.tags || []).includes(tag)
                                                    ? (isDarkMode ? 'bg-[#F48B42]/10 text-[#FB923C]' : 'bg-[#F9BC8F]/20 text-[#EA580C]')
                                                    : (isDarkMode ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-orange-600 hover:bg-orange-50/50')
                                            }`}
                                        >
                                            <span className={`inline-block ${ (editingTemplateTags.tags || []).includes(tag) ? 'translate-x-1' : 'group-hover:translate-x-1'} transition-transform`}>
                                                {displayTag(tag)}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Image (Overhanging for images, full-width for video) */}
                    <div 
                        className={`w-full mt-4 md:mt-0 relative z-20 ${isVideo ? 'md:flex-1 md:min-w-0' : 'md:w-auto flex-shrink-0 md:-mr-[80px] md:-mt-[50px]'}`}
                    >
                        <div 
                            className={`p-1.5 md:p-2 rounded-lg md:rounded-xl shadow-md md:shadow-lg border transition-all duration-300 group/image w-full ${isVideo ? '' : 'md:w-auto transform md:rotate-2 hover:rotate-0 hover:scale-105'} ${isDarkMode ? 'bg-[#2A2726] border-white/5' : 'bg-white border-gray-100/50'}`}
                        >
                            <div className={`relative overflow-hidden rounded-md md:rounded-lg flex items-center justify-center ${isVideo ? 'w-full' : `min-w-[150px] min-h-[150px] ${!currentImageUrl && !activeTemplate.videoUrl ? 'w-full md:w-[400px] h-[400px]' : ''}`} ${isDarkMode ? 'bg-black/20' : 'bg-gray-50'}`}>
                                {isVideo && videoLoading && activeTemplate.videoUrl && (
                                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-md">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                                            <span className="text-xs font-bold text-white/70">{language === 'cn' ? '视频加载中...' : 'Loading video...'}</span>
                                        </div>
                                    </div>
                                )}
                                {isVideo && activeTemplate.videoUrl ? (
                                    getVideoEmbedInfo(activeTemplate.videoUrl)?.isEmbed ? (
                                        <div className="w-full aspect-video">
                                            <iframe
                                                key={activeTemplate.id + '_embed_edit'}
                                                src={getVideoEmbedInfo(activeTemplate.videoUrl).embedUrl}
                                                className="w-full h-full border-0 rounded-md shadow-lg"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen
                                                title="Video Preview"
                                                onLoad={() => setVideoLoading(false)}
                                            />
                                        </div>
                                    ) : (
                                        <PreviewInlineVideo
                                            videoKey={activeTemplate.id + '_video_edit'}
                                            videoSrc={activeTemplate.videoUrl}
                                            posterSrc={currentImageUrl}
                                            isDarkMode={isDarkMode}
                                            language={language}
                                            onLoaded={() => setVideoLoading(false)}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    )
                                ) : currentImageUrl ? (
                                    <OptimizedImage
                                        key={currentImageUrl}
                                        src={currentImageUrl}
                                        referrerPolicy="no-referrer"
                                        alt={getLocalized(activeTemplate.name, language) || 'Template Preview'}
                                        className="w-full md:w-auto md:max-w-[400px] md:max-h-[400px] h-auto object-contain block animate-in fade-in duration-300"
                                        isDarkMode={isDarkMode}
                                        priority={0}
                                    />
                                ) : (
                                    <div 
                                        className={`flex flex-col items-center justify-center p-4 text-center w-full h-full relative group/empty ${isDarkMode ? 'text-gray-700' : 'text-gray-300'}`}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <ImageIcon size={48} strokeWidth={1.5} className={isDarkMode ? 'text-gray-700' : 'text-gray-300'} />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none group-hover/empty:opacity-100 group-hover/empty:pointer-events-auto transition-opacity">
                                            <div className={`border rounded-lg shadow-lg p-3 flex flex-col gap-2 min-w-[180px] ${isDarkMode ? 'bg-[#1a1a1a]/95 border-white/10' : 'bg-white/95 border border-gray-200'}`}>
                                                <button
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="w-full px-3 py-2 text-sm text-left bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all flex items-center gap-2 justify-center"
                                                >
                                                    <ImageIcon size={16} />
                                                    {t('upload_image')}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                {!isVideo && (
                                    <div className={`absolute inset-0 bg-black/0 ${currentImageUrl ? 'group-hover/image:bg-black/20' : 'group-hover/image:bg-black/5'} transition-colors duration-300 flex items-center justify-center gap-2 opacity-0 group-hover/image:opacity-100`}>
                                        {currentImageUrl && (
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); setZoomedImage(currentImageUrl); }}
                                                className={`p-2.5 rounded-full transition-all shadow-lg ${isDarkMode ? 'bg-black/60 text-gray-300 hover:bg-black hover:text-orange-400' : 'bg-white/90 text-gray-700 hover:bg-white hover:text-orange-600'}`}
                                                title="查看大图"
                                            >
                                                <ArrowUpRight size={18} />
                                            </button>
                                        )}
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); setImageUpdateMode('replace'); fileInputRef.current?.click(); }}
                                            className={`p-2.5 rounded-full transition-all shadow-lg ${isDarkMode ? 'bg-black/60 text-gray-300 hover:bg-black hover:text-orange-400' : 'bg-white/90 text-gray-700 hover:bg-white hover:text-orange-600'}`}
                                            title="更换当前图片(本地)"
                                        >
                                            <Upload size={18} />
                                        </button>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); setImageUpdateMode('replace'); setShowImageUrlInput(true); }}
                                            className={`p-2.5 rounded-full transition-all shadow-lg ${isDarkMode ? 'bg-black/60 text-gray-300 hover:bg-black hover:text-orange-400' : 'bg-white/90 text-gray-700 hover:bg-white hover:text-orange-600'}`}
                                            title="更换当前图片(URL)"
                                        >
                                            <Globe size={18} />
                                        </button>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); handleResetImage(); }}
                                            className={`p-2.5 rounded-full transition-all shadow-lg ${isDarkMode ? 'bg-black/60 text-gray-300 hover:bg-black hover:text-orange-400' : 'bg-white/90 text-gray-700 hover:bg-white hover:text-orange-600'}`}
                                            title="恢复默认图片"
                                        >
                                            <RotateCcw size={18} />
                                        </button>
                                        {currentImageUrl && (
                                            <button 
                                                onClick={(e) => requestDeleteImage(e)}
                                                className={`p-2.5 rounded-full transition-all shadow-lg ${isDarkMode ? 'bg-black/60 text-red-400 hover:bg-red-500 hover:text-white' : 'bg-white/90 text-red-500 hover:bg-red-500 hover:text-white'}`}
                                                title="删除当前图片"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </div>
                                )}

                                {/* Navigation & Indicator for Edit Mode */}
                                {allImages.length > 1 && (
                                    <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30 backdrop-blur-md px-2 py-1 rounded-full border ${isDarkMode ? 'bg-black/40 border-white/5' : 'bg-black/20 border-white/10'}`}>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); setEditImageIndex((editImageIndex - 1 + allImages.length) % allImages.length); }}
                                            className="text-white/60 hover:text-white transition-all"
                                        >
                                            <ChevronLeft size={12} />
                                        </button>
                                        
                                        {/* Dots Indicator */}
                                        <div className="flex gap-1">
                                            {allImages.map((_, idx) => (
                                                <div 
                                                    key={idx}
                                                    className={`w-1 h-1 rounded-full transition-all ${idx === editImageIndex ? 'bg-orange-500 w-2' : 'bg-white/40'}`}
                                                />
                                            ))}
                                        </div>

                                        <button 
                                            onClick={(e) => { e.stopPropagation(); setEditImageIndex((editImageIndex + 1) % allImages.length); }}
                                            className="text-white/60 hover:text-white transition-all"
                                        >
                                            <ChevronRight size={12} />
                                        </button>
                                    </div>
                                )}
                            </div>
                            
                            {/* Add Image Button below the image box (only when image exists, hidden for video templates) */}
                            {!isVideo && currentImageUrl && (
                                <div className="mt-2 flex gap-2 justify-center">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setImageUpdateMode('add');
                                            fileInputRef.current?.click();
                                        }}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-gray-500 hover:text-orange-400 border-white/5' : 'bg-gray-50 hover:bg-orange-50 text-gray-500 hover:text-orange-600 border-gray-100'}`}
                                    >
                                        <Plus size={14} />
                                        本地图片
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setImageUpdateMode('add');
                                            setShowImageUrlInput(true);
                                        }}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-gray-500 hover:text-orange-400 border-white/5' : 'bg-gray-50 hover:bg-orange-50 text-gray-500 hover:text-orange-600 border-gray-100'}`}
                                    >
                                        <Globe size={14} />
                                        网络链接
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            requestDeleteImage(e);
                                        }}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${isDarkMode ? 'bg-white/5 hover:bg-red-500/20 text-red-400 hover:text-red-500 border-white/5' : 'bg-red-50 hover:bg-red-100 text-red-500 border-red-100'}`}
                                    >
                                        <Trash2 size={14} />
                                        删除图片
                                    </button>
                                </div>
                            )}

                            {/* Video Template: Source Assets displayed horizontally below video */}
                            {isVideo && sources.length > 0 && (
                                <div className="mt-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <label className={`text-[10px] font-black uppercase tracking-widest mb-2 block opacity-40 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {language === 'cn' ? '参考素材 (SOURCE ASSETS)' : 'Source Assets'}
                                    </label>
                                    <div className="overflow-x-auto custom-scrollbar pb-2" style={{ scrollbarWidth: 'thin' }}>
                                        <div className="flex gap-2 w-max">
                                            {sources.map((src, sIdx) => (
                                                <div 
                                                    key={sIdx}
                                                    className={`relative group/source rounded-lg overflow-hidden border-2 transition-all hover:scale-105 hover:shadow-lg flex-shrink-0 ${isDarkMode ? 'border-white/5 bg-white/5' : 'border-white bg-gray-50'}`}
                                                    onClick={() => {
                                                      if (src.templateId) {
                                                        if (templates && templates.some(t => t.id === src.templateId)) {
                                                          setActiveTemplateId(src.templateId);
                                                        } else {
                                                          alert(language === 'cn' ? `关联的模版「${src.templateName || '未知'}」已不存在` : `Linked template "${src.templateName || 'Unknown'}" no longer exists`);
                                                        }
                                                      } else if (src.url) {
                                                        setSourceZoomedItem(src);
                                                      }
                                                    }}
                                                >
                                                    <div className="w-24 h-24 md:w-28 md:h-28 overflow-hidden flex items-center justify-center cursor-zoom-in">
                                                        {src.type === 'video' ? (
                                                            getVideoEmbedInfo(src.url)?.platform === 'video' || isFolderMediaPath(src.url) ? (
                                                                <SourceThumbVideo
                                                                    src={src.url}
                                                                    className="w-full h-full object-cover"
                                                                    onMouseEnter={(e) => e.target.play()}
                                                                    onMouseLeave={(e) => {
                                                                        e.target.pause();
                                                                        e.target.currentTime = 0;
                                                                    }}
                                                                />
                                                            ) : (
                                                                <div className="relative w-full h-full flex items-center justify-center bg-black/20">
                                                                    <Play size={20} className="text-white/60" fill="currentColor" />
                                                                </div>
                                                            )
                                                        ) : (
                                                            <OptimizedImage
                                                                src={src.url}
                                                                alt={getLocalized(src.label, language) || `Source ${sIdx + 1}`}
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
                                                    {src.label && (
                                                        <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-sm py-1 px-1.5 opacity-0 group-hover/source:opacity-100 transition-opacity">
                                                            <p className="text-[9px] text-white font-bold truncate text-center">
                                                                {getLocalized(src.label, language)}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                )}

                {/* --- Rendered Content --- */}
                <div id="final-prompt-content" className="md:px-4">
                    {renderedContent}
                </div>
            </div>
        </div>
    </div>
  );
});

TemplatePreview.displayName = 'TemplatePreview';

