import React, { useMemo } from 'react';
import { Variable } from './Variable';
import {
  ImageIcon,
  ArrowUpRight,
  Upload,
  Globe,
  RotateCcw,
  Pencil,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Plus,
} from 'lucide-react';
import { getLocalized } from '../utils/helpers';

/**
 * TemplatePreview 元件 - 負責渲染模板的預覽內容，包含變數互動
 */
export const TemplatePreview = React.memo(
  ({
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
    // 標籤編輯相關
    TEMPLATE_TAGS,
    handleUpdateTemplateTags,
    editingTemplateTags,
    setEditingTemplateTags,
    // 多圖相關
    setImageUpdateMode,
    setCurrentImageEditIndex,
    // 標題編輯相關
    editingTemplateNameId,
    tempTemplateName,
    setTempTemplateName,
    saveTemplateName,
    startRenamingTemplate,
    setEditingTemplateNameId,
  }) => {
    const [editImageIndex, setEditImageIndex] = React.useState(0);

    const allImages = React.useMemo(() => {
      if (
        activeTemplate?.imageUrls &&
        Array.isArray(activeTemplate.imageUrls) &&
        activeTemplate.imageUrls.length > 0
      ) {
        return activeTemplate.imageUrls;
      }
      return activeTemplate?.imageUrl ? [activeTemplate.imageUrl] : [];
    }, [activeTemplate.imageUrls, activeTemplate.imageUrl]);

    const currentImageUrl = allImages[editImageIndex] || activeTemplate?.imageUrl;

    // 當模板切換或圖片索引切換時，同步編輯索引給父層元件
    React.useEffect(() => {
      setCurrentImageEditIndex(editImageIndex);
    }, [editImageIndex, setCurrentImageEditIndex]);

    React.useEffect(() => {
      setEditImageIndex(0);
    }, [activeTemplate.id]);

    const templateLangs = activeTemplate.language
      ? Array.isArray(activeTemplate.language)
        ? activeTemplate.language
        : [activeTemplate.language]
      : ['zh-tw', 'en'];
    const showLanguageToggle = templateLangs.length > 0;
    const supportsChinese = templateLangs.includes('zh-tw');
    const supportsEnglish = templateLangs.includes('en');

    // 自動切換到模板支援的語言
    React.useEffect(() => {
      if (!templateLangs.includes(language)) {
        // 若當前語言不支援，切換到模板支援的第一個語言
        setLanguage(templateLangs[0]);
      }
    }, [activeTemplate.id, templateLangs, language]);

    const parseLineWithVariables = (text, lineKeyPrefix, counters) => {
      const parts = text.split(/({{[^}]+}})/g);
      return parts.map((part, idx) => {
        if (part.startsWith('{{') && part.endsWith('}}')) {
          const key = part.slice(2, -2).trim();
          const varIndex = counters[key] || 0;
          counters[key] = varIndex + 1;

          const uniqueKey = `${key}-${varIndex}`;
          const currentValue = activeTemplate.selections[uniqueKey] || defaults[key];

          return (
            <Variable
              key={`${lineKeyPrefix}-${idx}`}
              id={key}
              index={varIndex}
              config={banks[key]}
              currentVal={currentValue}
              isOpen={activePopover === uniqueKey}
              onToggle={(e) => {
                e.stopPropagation();
                setActivePopover(activePopover === uniqueKey ? null : uniqueKey);
              }}
              onSelect={(opt) => handleSelect(key, varIndex, opt)}
              onAddCustom={(val) => handleAddCustomAndSelect(key, varIndex, val)}
              popoverRef={popoverRef}
              categories={categories}
              t={t}
              language={language}
            />
          );
        }

        const boldParts = part.split(/(\*\*.*?\*\*)/g);
        return boldParts.map((bp, bIdx) => {
          if (bp.startsWith('**') && bp.endsWith('**')) {
            return (
              <strong key={`${lineKeyPrefix}-${idx}-${bIdx}`} className="text-gray-900">
                {bp.slice(2, -2)}
              </strong>
            );
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
        let className = 'text-gray-700 mb-3 leading-10';

        if (line.startsWith('### ')) {
          Type = 'h3';
          className = 'text-lg font-bold text-gray-900 mt-6 mb-3 border-b border-gray-100 pb-2';
          content = line.replace('### ', '');
        } else if (line.trim().startsWith('- ')) {
          className = 'ml-4 flex items-start gap-2 text-gray-700 mb-2 leading-10';
          content = (
            <React.Fragment key={lineIdx}>
              <span className="text-gray-400 mt-2.5">•</span>
              <span className="flex-1">
                {parseLineWithVariables(line.replace('- ', '').trim(), lineIdx, counters)}
              </span>
            </React.Fragment>
          );
          return (
            <div key={lineIdx} className={className}>
              {content}
            </div>
          );
        } else if (/^\d+\.\s/.test(line.trim())) {
          className = 'ml-4 flex items-start gap-2 text-gray-700 mb-2 leading-10';
          const number = line.trim().match(/^\d+\./)[0];
          const text = line.trim().replace(/^\d+\.\s/, '');
          content = (
            <React.Fragment key={lineIdx}>
              <span className="font-mono text-gray-400 mt-1 min-w-[20px]">{number}</span>
              <span className="flex-1">{parseLineWithVariables(text, lineIdx, counters)}</span>
            </React.Fragment>
          );
          return (
            <div key={lineIdx} className={className}>
              {content}
            </div>
          );
        }

        if (typeof content === 'string') {
          return (
            <Type key={lineIdx} className={className}>
              {parseLineWithVariables(content, lineIdx, counters)}
            </Type>
          );
        }
        return (
          <Type key={lineIdx} className={className}>
            {content}
          </Type>
        );
      });
    }, [
      activeTemplate.content,
      activeTemplate.selections,
      banks,
      defaults,
      activePopover,
      categories,
      t,
      language,
    ]);

    return (
      <div className="w-full h-full relative overflow-hidden group">
        {/* Background Image Layer - Blurry Ambient Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 opacity-30 blur-[60px] scale-110 pointer-events-none"
          style={{
            backgroundImage: activeTemplate.imageUrl ? `url(${activeTemplate.imageUrl})` : 'none',
          }}
        ></div>
        <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>

        <div className="w-full h-full overflow-y-auto px-3 py-4 md:p-8 custom-scrollbar relative z-10">
          <div
            id="preview-card"
            className="max-w-4xl mx-auto bg-white/90 rounded-2xl md:rounded-[2rem] shadow-xl md:shadow-2xl shadow-orange-900/10 border border-white/60 p-4 sm:p-6 md:p-12 min-h-[500px] md:min-h-[600px] transition-all duration-500 relative"
          >
            {/* --- Top Section: Title & Image --- */}
            <div className="flex flex-col md:flex-row justify-between items-start mb-6 md:mb-10 relative">
              {/* Left: Title & Meta Info */}
              <div className="flex-1 min-w-0 pr-4 z-10 pt-2">
                {/* Language Toggle */}
                {showLanguageToggle && (
                  <div className="flex items-center gap-3 mb-4 p-2 bg-gray-50 rounded-lg border border-gray-200 inline-flex">
                    <span className="text-xs text-gray-500 font-medium">模板語言：</span>
                    <button
                      onClick={() => supportsChinese && setLanguage('zh-tw')}
                      disabled={!supportsChinese}
                      className={`text-sm font-bold transition-all relative py-1 px-2 rounded ${
                        !supportsChinese
                          ? 'text-gray-300 cursor-not-allowed'
                          : language === 'zh-tw'
                            ? 'text-orange-600 bg-white shadow-sm'
                            : 'text-gray-400 hover:text-gray-600 hover:bg-white/50'
                      }`}
                      title={!supportsChinese ? '此模板不支援中文' : ''}
                    >
                      中文
                    </button>
                    <button
                      onClick={() => supportsEnglish && setLanguage('en')}
                      disabled={!supportsEnglish}
                      className={`text-sm font-bold transition-all relative py-1 px-2 rounded ${
                        !supportsEnglish
                          ? 'text-gray-300 cursor-not-allowed'
                          : language === 'en'
                            ? 'text-orange-600 bg-white shadow-sm'
                            : 'text-gray-400 hover:text-gray-600 hover:bg-white/50'
                      }`}
                      title={!supportsEnglish ? 'This template does not support English' : ''}
                    >
                      EN
                    </button>
                  </div>
                )}
                {editingTemplateNameId === activeTemplate.id ? (
                  <div className="mb-4 flex flex-col gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
                    <input
                      autoFocus
                      type="text"
                      value={tempTemplateName}
                      onChange={(e) => setTempTemplateName(e.target.value)}
                      className="text-2xl md:text-3xl font-bold text-gray-800 bg-transparent border-b-2 border-orange-500 focus:outline-none w-full pb-1"
                      placeholder={t('label_placeholder')}
                      onKeyDown={(e) => e.key === 'Enter' && saveTemplateName()}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={saveTemplateName}
                        className="px-3 py-1.5 bg-orange-500 text-white text-xs font-bold rounded-lg hover:bg-orange-600 transition-all flex items-center gap-1.5 shadow-sm"
                      >
                        <Check size={14} />
                        {t('confirm')}
                      </button>
                      <button
                        onClick={() => setEditingTemplateNameId(null)}
                        className="px-3 py-1.5 bg-gray-100 text-gray-500 text-xs font-bold rounded-lg hover:bg-gray-200 transition-all flex items-center gap-1.5"
                      >
                        <X size={14} />
                        {t('cancel')}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 mb-3 group/title-edit">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight leading-tight">
                      {getLocalized(activeTemplate.name, language)}
                    </h2>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startRenamingTemplate(activeTemplate, e);
                      }}
                      className="p-2 rounded-xl text-gray-300 hover:text-orange-500 hover:bg-orange-50 transition-all duration-200 opacity-0 group-hover/title-edit:opacity-100"
                      title={t('rename')}
                    >
                      <Pencil size={18} />
                    </button>
                  </div>
                )}
                {/* Tags / Meta */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-md bg-orange-50 text-orange-600 text-xs font-bold tracking-wide border border-orange-100/50">
                    V0.5.1
                  </span>
                  {(activeTemplate.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className={`px-2.5 py-1 rounded-md text-xs font-bold tracking-wide border ${TAG_STYLES[tag] || TAG_STYLES['default']}`}
                    >
                      {displayTag(tag)}
                    </span>
                  ))}

                  {/* Edit Tags Button */}
                  {editingTemplateTags?.id !== activeTemplate.id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingTemplateTags({
                          id: activeTemplate.id,
                          tags: activeTemplate.tags || [],
                        });
                      }}
                      className="flex items-center gap-1 px-2 py-1 rounded-md text-gray-400 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 group/edit-tag"
                      title={t('edit_tags')}
                    >
                      <Pencil
                        size={12}
                        className="transition-transform group-hover/edit-tag:scale-110"
                      />
                      <span className="text-[10px] font-bold uppercase tracking-wider opacity-0 group-hover/edit-tag:opacity-100 transition-opacity">
                        {t('edit_tags')}
                      </span>
                    </button>
                  )}
                </div>

                {/* Editing Tags UI */}
                {editingTemplateTags?.id === activeTemplate.id && (
                  <div className="mb-6 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-orange-100 shadow-sm flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center justify-between border-b border-orange-50 pb-2 mb-1">
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
                          className="p-1.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all flex items-center gap-1.5 px-3"
                        >
                          <X size={14} />
                          <span className="text-xs font-bold">{t('cancel')}</span>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {TEMPLATE_TAGS.map((tag) => (
                        <button
                          key={tag}
                          onClick={(e) => {
                            e.stopPropagation();
                            const currentTags = editingTemplateTags.tags || [];
                            const newTags = currentTags.includes(tag)
                              ? currentTags.filter((t) => t !== tag)
                              : [...currentTags, tag];
                            setEditingTemplateTags({ id: activeTemplate.id, tags: newTags });
                          }}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                            (editingTemplateTags.tags || []).includes(tag)
                              ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-200 scale-105'
                              : 'bg-white text-gray-500 border-gray-100 hover:border-orange-200 hover:text-orange-500'
                          }`}
                        >
                          {displayTag(tag)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <p className="text-gray-400 text-sm font-medium mt-2">
                  {t('source_and_contribution')}：
                  {activeTemplate.author === '官方'
                    ? t('official')
                    : activeTemplate.author || t('official')}
                </p>
                <p className="text-gray-400 text-sm font-medium mt-1">{t('made_by')}</p>
              </div>

              {/* Right: Image (Overhanging) */}
              <div className="w-full md:w-auto mt-4 md:mt-0 relative md:-mr-[80px] md:-mt-[50px] z-20 flex-shrink-0">
                <div className="bg-white p-1.5 md:p-2 rounded-lg md:rounded-xl shadow-lg md:shadow-xl transform md:rotate-2 border border-gray-100/50 transition-all duration-300 hover:rotate-0 hover:scale-105 hover:shadow-2xl group/image w-full md:w-auto">
                  <div
                    className={`relative overflow-hidden rounded-md md:rounded-lg bg-gray-50 flex items-center justify-center min-w-[150px] min-h-[150px] ${!currentImageUrl ? 'w-full md:w-[400px] h-[400px]' : ''}`}
                  >
                    {currentImageUrl ? (
                      <img
                        key={currentImageUrl}
                        src={currentImageUrl}
                        referrerPolicy="no-referrer"
                        alt="Template Preview"
                        className="w-full md:w-auto md:max-w-[400px] md:max-h-[400px] h-auto object-contain block animate-in fade-in duration-300 cursor-zoom-in"
                        onClick={(e) => {
                          e.stopPropagation();
                          setZoomedImage(currentImageUrl);
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.style.backgroundColor = '#f1f5f9';
                          const span = document.createElement('span');
                          span.innerText = 'Image Failed';
                          span.style.color = '#cbd5e1';
                          span.style.fontSize = '12px';
                          e.target.parentElement.appendChild(span);
                        }}
                      />
                    ) : (
                      <div
                        className="flex flex-col items-center justify-center text-gray-300 p-4 text-center w-full h-full relative group/empty"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ImageIcon size={48} strokeWidth={1.5} className="text-gray-300" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none group-hover/empty:opacity-100 group-hover/empty:pointer-events-auto transition-opacity">
                          <div className="bg-white/95 border border-gray-200 rounded-lg shadow-lg p-3 flex flex-col gap-2 min-w-[180px]">
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

                    <div
                      className={`absolute inset-0 bg-black/0 ${currentImageUrl ? 'group-hover/image:bg-black/20' : 'group-hover/image:bg-black/5'} transition-colors duration-300 flex items-center justify-center gap-2 opacity-0 group-hover/image:opacity-100 pointer-events-none`}
                    >
                      {currentImageUrl && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setZoomedImage(currentImageUrl);
                          }}
                          className="pointer-events-auto p-2.5 bg-white/90 text-gray-700 rounded-full hover:bg-white hover:text-orange-600 transition-all shadow-lg"
                          title="查看大圖"
                        >
                          <ArrowUpRight size={18} />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setImageUpdateMode('replace');
                          fileInputRef.current?.click();
                        }}
                        className="pointer-events-auto p-2.5 bg-white/90 text-gray-700 rounded-full hover:bg-white hover:text-orange-600 transition-all shadow-lg"
                        title="更換當前圖片（本機）"
                      >
                        <Upload size={18} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setImageUpdateMode('replace');
                          setShowImageUrlInput(true);
                        }}
                        className="pointer-events-auto p-2.5 bg-white/90 text-gray-700 rounded-full hover:bg-white hover:text-orange-600 transition-all shadow-lg"
                        title="更換當前圖片（URL）"
                      >
                        <Globe size={18} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleResetImage();
                        }}
                        className="pointer-events-auto p-2.5 rounded-full bg-white/90 text-gray-700 hover:bg-white hover:text-orange-600 transition-all shadow-lg"
                        title="恢復預設圖片"
                      >
                        <RotateCcw size={18} />
                      </button>
                    </div>

                    {/* Navigation & Indicator for Edit Mode */}
                    {allImages.length > 1 && (
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30 bg-black/20 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditImageIndex(
                              (editImageIndex - 1 + allImages.length) % allImages.length
                            );
                          }}
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
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditImageIndex((editImageIndex + 1) % allImages.length);
                          }}
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
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-orange-50 text-gray-500 hover:text-orange-600 rounded-lg text-xs font-bold transition-all border border-gray-100"
                    >
                      <Plus size={14} />
                      本機圖片
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setImageUpdateMode('add');
                        setShowImageUrlInput(true);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-orange-50 text-gray-500 hover:text-orange-600 rounded-lg text-xs font-bold transition-all border border-gray-100"
                    >
                      <Globe size={14} />
                      網路連結
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
  }
);

TemplatePreview.displayName = 'TemplatePreview';

