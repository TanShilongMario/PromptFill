import React, { useMemo } from 'react';
import { Variable } from './Variable';
import { VisualEditor } from './VisualEditor';
import { EditorToolbar } from './EditorToolbar';
import { ImageIcon, ArrowUpRight, Upload, Globe, RotateCcw, Pencil, Check, X, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { getLocalized } from '../utils/helpers';

/**
 * TemplatePreview 组件 - 负责渲染模版的预览内容，包括变量交互
 */
export const TemplatePreview = React.memo(({ 
  activeTemplate, 
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
}) => {
  const [editImageIndex, setEditImageIndex] = React.useState(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // 统一的底层容器样式
  const unifiedStyle = isDarkMode ? {
    background: 'linear-gradient(180deg, #3B3B3B 0%, #242120 100%)',
    borderRadius: '16px',
    border: '1px solid transparent',
    backgroundImage: 'linear-gradient(180deg, #3B3B3B, #242120), linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)',
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
  } : {
    background: 'linear-gradient(180deg, #FAF5F1 0%, #F6EBE6 100%)',
    borderRadius: '16px',
    border: '1px solid transparent',
    backgroundImage: 'linear-gradient(180deg, #FAF5F1, #F6EBE6), linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)',
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
  };

  const allImages = React.useMemo(() => {
    if (activeTemplate?.imageUrls && Array.isArray(activeTemplate.imageUrls) && activeTemplate.imageUrls.length > 0) {
      return activeTemplate.imageUrls;
    }
    return activeTemplate?.imageUrl ? [activeTemplate.imageUrl] : [];
  }, [activeTemplate.imageUrls, activeTemplate.imageUrl]);

  const currentImageUrl = allImages[editImageIndex] || activeTemplate?.imageUrl;

  // 当模板切换或图片索引切换时，同步编辑索引给父组件
  React.useEffect(() => {
    setCurrentImageEditIndex(editImageIndex);
  }, [editImageIndex, setCurrentImageEditIndex]);

  React.useEffect(() => {
    setEditImageIndex(0);
  }, [activeTemplate.id]);

  const templateLangs = activeTemplate.language ? (Array.isArray(activeTemplate.language) ? activeTemplate.language : [activeTemplate.language]) : ['cn', 'en'];
  
  // 自动切换到模板支持的语言
  React.useEffect(() => {
    if (!templateLangs.includes(language)) {
      // 如果当前语言不支持，切换到模板支持的第一个语言
      setLanguage(templateLangs[0]);
    }
  }, [activeTemplate.id, templateLangs, language]);

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

  const parseLineWithVariables = (text, lineKeyPrefix, counters) => {
    const parts = text.split(/({{[^}]+}})/g);
    return parts.map((part, idx) => {
      if (part.startsWith('{{') && part.endsWith('}}')) {
        const fullKey = part.slice(2, -2).trim();
        const parsed = parseVariableName(fullKey);
        const baseKey = parsed.baseKey;
        
        // 使用完整的 fullKey 作为计数器的 key，以区分不同组的同名变量
        const varIndex = counters[fullKey] || 0;
        counters[fullKey] = varIndex + 1;
        
        const uniqueKey = `${fullKey}-${varIndex}`;
        // 获取值：优先从 selections 中获取，否则从 defaults 中获取（使用 baseKey）
        let currentValue = activeTemplate.selections[uniqueKey];
        
        // 如果存储的值是字符串且等于变量名（如 "fruit_1"），说明是错误存储，使用默认值
        if (typeof currentValue === 'string' && currentValue === fullKey) {
          currentValue = defaults[baseKey];
        } else if (!currentValue) {
          // 如果没有选择值，使用默认值
          currentValue = defaults[baseKey];
        }
        
        // 如果 currentValue 是字符串且包含变量名后缀（如 "柠檬_1"），需要清理
        // 这种情况不应该发生，但为了安全起见，我们检查一下
        if (typeof currentValue === 'string' && currentValue.endsWith(`_${parsed.groupId}`) && parsed.groupId) {
          // 如果值以 groupId 结尾，可能是错误拼接，尝试从词库中查找正确的值
          const bank = banks[baseKey];
          if (bank && bank.options) {
            // 尝试找到匹配的选项（去掉后缀后匹配）
            const valueWithoutSuffix = currentValue.replace(`_${parsed.groupId}`, '');
            const matchedOption = bank.options.find(opt => {
              const optStr = typeof opt === 'string' ? opt : (opt[language] || opt.cn || opt.en || '');
              return optStr === valueWithoutSuffix;
            });
            if (matchedOption) {
              currentValue = matchedOption;
            }
          }
        }

        // 获取词库配置：使用 baseKey 查找，确保即使变量名是 fruit_1 也能找到 fruit 词库
        // 例如：fruit_1 -> baseKey: "fruit" -> banks["fruit"]
        const bankConfig = banks[baseKey];
        
        // 如果找不到词库，尝试使用 fullKey 作为后备（向后兼容）
        // 但这种情况不应该发生，因为所有词库都应该使用 baseKey
        const config = bankConfig || banks[fullKey];
        
        // 调试：如果找不到词库，输出警告（开发环境）
        if (!config && process.env.NODE_ENV === 'development') {
          console.warn(`[Variable] 找不到词库配置: baseKey="${baseKey}", fullKey="${fullKey}", available keys:`, Object.keys(banks).slice(0, 10));
        }
        
        // 确保 config 存在且包含 category，否则使用默认值
        if (config && !config.category) {
          console.warn(`[Variable] 词库配置缺少 category: baseKey="${baseKey}", config:`, config);
        }

        return (
          <Variable 
            key={`${lineKeyPrefix}-${idx}`}
            id={fullKey}
            index={varIndex}
            config={config}  // 使用 baseKey 获取的词库配置，确保颜色正确
            currentVal={currentValue}
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
            groupId={parsed.groupId}  // 传递 groupId 用于显示分组标识
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
    
    const lines = contentToRender.split('\n');
    const counters = {}; 
    
    return lines.map((line, lineIdx) => {
      if (!line.trim()) return <div key={lineIdx} className="h-6"></div>;

      let content = line;
      let Type = 'div';
      let className = `${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-3 leading-10`;

      if (line.startsWith('### ')) {
        Type = 'h3';
        className = `text-lg font-bold mt-6 mb-3 border-b pb-2 ${isDarkMode ? 'text-white border-white/10' : 'text-gray-900 border-gray-100'}`;
        content = line.replace('### ', '');
      } else if (line.trim().startsWith('- ')) {
        className = `ml-4 flex items-start gap-2 mb-2 leading-10 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`;
        content = (
          <React.Fragment key={lineIdx}>
            <span className={`${isDarkMode ? 'text-gray-600' : 'text-gray-400'} mt-2.5`}>•</span>
            <span className="flex-1">{parseLineWithVariables(line.replace('- ', '').trim(), lineIdx, counters)}</span>
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
              <span className="flex-1">{parseLineWithVariables(text, lineIdx, counters)}</span>
            </React.Fragment>
        );
        return <div key={lineIdx} className={className}>{content}</div>;
      }

      if (typeof content === 'string') {
          return <Type key={lineIdx} className={className}>{parseLineWithVariables(content, lineIdx, counters)}</Type>;
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
                backgroundImage: activeTemplate.imageUrl ? `url(${activeTemplate.imageUrl})` : 'none',
            }}
        ></div>
        <div className={`absolute inset-0 pointer-events-none ${isDarkMode ? 'bg-black/30' : 'bg-white/5'}`}></div>

        <div className="w-full h-full overflow-y-auto px-3 py-4 md:px-4 lg:p-8 custom-scrollbar relative z-10">
            <div 
                id="preview-card"
                className={`max-w-4xl mx-auto p-4 sm:p-6 md:p-8 lg:p-12 min-h-[500px] md:min-h-[600px] transition-all duration-500 relative ${isMobile ? (isDarkMode ? 'bg-[#242120]/90 border border-white/5 rounded-2xl shadow-2xl' : 'bg-white/90 border border-white/60 rounded-2xl shadow-xl') : (isDarkMode ? 'bg-black/20 backdrop-blur-md rounded-2xl border border-white/5 shadow-2xl' : 'bg-white/40 backdrop-blur-sm rounded-2xl border border-white/40 shadow-sm')}`}
            >
                {/* --- Top Section: Title & Image --- */}
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
                                <div className="flex gap-2 mt-2">
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
                                <h2 className={`text-3xl md:text-4xl font-bold tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
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
                            </div>
                        )}

                        {/* Author Info Display (when not editing) */}
                        {!isEditing && (
                            <div className="flex flex-col gap-1 mt-1 mb-3">
                                <p className={`text-sm font-black flex items-center gap-2 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                                    <span className="uppercase tracking-widest text-[10px] opacity-50">{language === 'cn' ? '作者' : 'Author'}:</span>
                                    <span className={activeTemplate.author === '官方' || !activeTemplate.author ? 'text-orange-500' : 'text-orange-500/80'}>
                                        {activeTemplate.author === '官方' ? t('official') : (activeTemplate.author || t('official'))}
                                    </span>
                                </p>
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
                                            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                                                (editingTemplateTags.tags || []).includes(tag)
                                                    ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-200 scale-105'
                                                    : (isDarkMode ? 'bg-white/5 text-gray-500 border-white/5 hover:border-orange-500/50 hover:text-orange-400' : 'bg-white text-gray-500 border-gray-100 hover:border-orange-200 hover:text-orange-500')
                                            }`}
                                        >
                                            {displayTag(tag)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Image (Overhanging) */}
                    <div 
                        className="w-full md:w-auto mt-4 md:mt-0 relative md:-mr-[80px] md:-mt-[50px] z-20 flex-shrink-0"
                    >
                        <div 
                            className={`p-1.5 md:p-2 rounded-lg md:rounded-xl shadow-md md:shadow-lg transform md:rotate-2 border transition-all duration-300 hover:rotate-0 hover:scale-105 group/image w-full md:w-auto ${isDarkMode ? 'bg-[#2A2726] border-white/5' : 'bg-white border-gray-100/50'}`}
                        >
                            <div className={`relative overflow-hidden rounded-md md:rounded-lg flex items-center justify-center min-w-[150px] min-h-[150px] ${!currentImageUrl ? 'w-full md:w-[400px] h-[400px]' : ''} ${isDarkMode ? 'bg-black/20' : 'bg-gray-50'}`}>
                                {currentImageUrl ? (
                                    <img 
                                        key={currentImageUrl}
                                        src={currentImageUrl} 
                                        referrerPolicy="no-referrer"
                                        alt="Template Preview" 
                                        className="w-full md:w-auto md:max-w-[400px] md:max-h-[400px] h-auto object-contain block animate-in fade-in duration-300" 
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.style.backgroundColor = isDarkMode ? '#1a1a1a' : '#f1f5f9';
                                            const span = document.createElement('span');
                                            span.innerText = 'Image Failed';
                                            span.style.color = isDarkMode ? '#333' : '#cbd5e1';
                                            span.style.fontSize = '12px';
                                            e.target.parentElement.appendChild(span);
                                        }}
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
                                </div>

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
                            
                            {/* Add Image Button below the image box */}
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
                            </div>
                        </div>
                    </div>
                </div>

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

