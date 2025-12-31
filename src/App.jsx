import React, { useState, useRef, useEffect, useMemo } from 'react';
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
import { SCENE_WORDS, STYLE_WORDS } from './constants/slogan';

// ====== 导入自定义 Hooks ======
import { useStickyState } from './hooks/useStickyState';

// ====== 导入 UI 组件 ======
import { Variable, VisualEditor, PremiumButton, EditorToolbar, Lightbox, TemplatePreview, TemplatesSidebar, BanksSidebar, CategoryManager, InsertVariableModal, AddBankModal, DiscoveryView, MobileSettingsView, SettingsView, Sidebar } from './components';
import MobileTabBar from './components/MobileTabBar';

// --- 组件：图片 3D 预览弹窗 (优化性能，状态局部化) ---
const ImagePreviewModal = React.memo(({ 
  zoomedImage, 
  template, 
  language, 
  setLanguage,
  t, 
  TAG_STYLES, 
  displayTag, 
  setActiveTemplateId, 
  setDiscoveryView, 
  setZoomedImage, 
  setMobileTab,
  handleRefreshSystemData,
  setIsSettingsOpen,
  isDarkMode
}) => {
  const [modalMousePos, setModalMousePos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const touchStartY = useRef(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // 陀螺仪支持
  useEffect(() => {
    if (!isMobile) return;

    const handleOrientation = (e) => {
      // 当卡片展开时，暂停陀螺仪 3D 效果更新，优先保证文字滚动
      if (isTextExpanded) return;

      const { beta, gamma } = e;
      if (beta !== null && gamma !== null) {
        // 映射到类似鼠标坐标的值
        const x = (window.innerWidth / 2) + (gamma / 20) * (window.innerWidth / 2);
        const y = (window.innerHeight / 2) + (beta / 20) * (window.innerHeight / 2);
        setModalMousePos({ x, y });
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [isMobile, isTextExpanded]);

  // 获取所有图片列表
  const allImages = useMemo(() => {
    if (template?.imageUrls && Array.isArray(template.imageUrls) && template.imageUrls.length > 0) {
      return template.imageUrls;
    }
    return template?.imageUrl ? [template.imageUrl] : [zoomedImage];
  }, [template, zoomedImage]);

  const [currentIndex, setCurrentIndex] = useState(() => {
    const idx = allImages.indexOf(zoomedImage);
    return idx >= 0 ? idx : 0;
  });

  const currentImageUrl = allImages[currentIndex];

  // 锁定/解锁背景滚动
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // 计算 3D 旋转角度
  const rotateY = (modalMousePos.x - window.innerWidth / 2) / (window.innerWidth / 2) * 15;
  const rotateX = (modalMousePos.y - window.innerHeight / 2) / (window.innerHeight / 2) * -15;

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex(prev => (prev - 1 + allImages.length) % allImages.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex(prev => (prev + 1) % allImages.length);
  };

  // 移动端手势处理
  const handleCardTouchStart = (e) => {
    // 如果触摸开始于内容区域，不记录起始位置
    if (e.target.closest('.content-scroll-area')) {
      return;
    }
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    // 当卡片展开时，内容区域的滑动完全用于文字滚动，不更新3D效果
    if (isTextExpanded && e.target.closest('.content-scroll-area')) {
      return;
    }
    
    // 实时更新 3D 效果
    const touch = e.touches[0];
    setModalMousePos({ x: touch.clientX, y: touch.clientY });
  };

  const handleCardTouchEnd = (e) => {
    // 如果触摸结束于内容区域，不处理展开/收起逻辑
    if (e.target.closest('.content-scroll-area') || touchStartY.current === 0) {
      touchStartY.current = 0;
      return;
    }
    
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;

    // 向上滑动超过 50px 则展开
    if (deltaY > 50 && !isTextExpanded) {
      setIsTextExpanded(true);
    }
    // 向下滑动超过 50px 则收起
    else if (deltaY < -50 && isTextExpanded) {
      setIsTextExpanded(false);
    }
    
    touchStartY.current = 0;
  };

  if (isMobile) {
    return (
      <div 
          className="fixed inset-0 z-[200] flex flex-col animate-in fade-in duration-500 overflow-hidden"
          onClick={() => setZoomedImage(null)}
      >
          {/* Background Layer - Light Version */}
          <div 
            className="absolute inset-0 z-[-1] bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/background1.png)' }}
          >
            <div className="absolute inset-0 bg-white/60 backdrop-blur-2xl"></div>
          </div>

          <button 
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-black/5 z-[150]"
              onClick={() => setZoomedImage(null)}
          >
              <X size={24} />
          </button>

          <div 
            className="flex-1 flex flex-col relative overflow-hidden" 
            onClick={(e) => e.stopPropagation()}
          >
              {/* Image Section */}
              <div 
                className={`transition-all duration-500 ease-in-out flex flex-col justify-center items-center perspective-[1000px] relative px-6 flex-shrink-0 ${isTextExpanded ? 'h-[30vh] pt-10' : 'h-[60vh]'}`}
                style={{ perspective: '1200px' }}
                onTouchMove={handleTouchMove}
              >
                  <div 
                    className="relative transition-transform duration-200 ease-out flex items-center justify-center w-full h-full"
                    style={{ 
                      transform: isTextExpanded ? 'none' : `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Image Shadow */}
                    <div 
                      className="absolute inset-6 bg-orange-500/10 blur-3xl rounded-3xl -z-10 transition-opacity duration-500"
                      style={{ transform: 'translateZ(-50px)' }}
                    />
                    <img 
                        key={currentImageUrl}
                        src={currentImageUrl} 
                        alt="Zoomed Preview" 
                        className="max-w-full max-h-full object-contain rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/50 animate-in fade-in duration-300"
                        style={{ transform: isTextExpanded ? 'none' : 'translateZ(20px)' }}
                    />
                  </div>

                  {/* Mobile Navigation */}
                  {allImages.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30">
                      <button onClick={handlePrev} className="p-1.5 rounded-full bg-white/50 text-gray-400 border border-white shadow-sm"><ChevronLeft size={14} /></button>
                      <div className="flex gap-1.5">
                        {allImages.map((_, idx) => (
                          <div key={idx} className={`w-1 h-1 rounded-full transition-all ${idx === currentIndex ? 'bg-orange-500 w-3' : 'bg-gray-300'}`} />
                        ))}
                      </div>
                      <button onClick={handleNext} className="p-1.5 rounded-full bg-white/50 text-gray-400 border border-white shadow-sm"><ChevronRight size={14} /></button>
                    </div>
                  )}
              </div>

              {/* Bottom Card Section - Light Glassmorphism */}
              <div 
                className={`
                  flex-1 bg-white/70 backdrop-blur-2xl border-t border-white/60 
                  transition-all duration-500 ease-in-out flex flex-col overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.05)]
                  ${isTextExpanded ? 'rounded-t-[2.5rem] mt-0' : 'rounded-t-[2rem] mt-4'}
                `}
                onTouchStart={handleCardTouchStart}
                onTouchEnd={handleCardTouchEnd}
                onClick={(e) => {
                  if (e.target.closest('.header-trigger') || e.target.closest('.handle-trigger')) {
                    setIsTextExpanded(!isTextExpanded);
                  }
                }}
              >
                  {/* Pull Handle */}
                  <div className="w-full flex justify-center py-3 handle-trigger flex-shrink-0">
                    <div className="w-10 h-1 rounded-full bg-gray-200"></div>
                  </div>

                  {/* Header Row */}
                  <div className="px-6 flex items-center justify-between gap-4 mb-2 header-trigger flex-shrink-0">
                      <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-bold text-gray-900 truncate mb-0.5">
                          {getLocalized(template?.name, language)}
                        </h2>
                        {template?.author && (
                          <div className="mb-1.5 opacity-60">
                            <span className="text-[10px] font-medium text-gray-600 truncate">{template.author}</span>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-1.5">
                          {(template?.tags || []).slice(0, 2).map(tag => (
                            <span key={tag} className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${TAG_STYLES[tag] || TAG_STYLES["default"]}`}>
                              {displayTag(tag)}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (template) {
                            setActiveTemplateId(template.id);
                            setDiscoveryView(false);
                            if (setMobileTab) setMobileTab('editor'); 
                            setZoomedImage(null);
                          }
                        }}
                        className="px-5 py-2.5 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-xl font-bold text-sm shadow-[0_4px_15px_rgba(249,115,22,0.3)] active:scale-95 transition-all flex items-center gap-2 flex-shrink-0 border border-orange-400/20"
                      >
                        <Sparkles size={16} />
                        {t('use_template')}
                      </button>
                  </div>

                  {/* Content Area */}
                  <div 
                    className={`px-6 flex-1 overflow-hidden flex flex-col transition-all duration-500 content-scroll-area ${isTextExpanded ? 'opacity-100 mt-4' : 'opacity-0 h-0 pointer-events-none'}`}
                  >
                      <div className="flex items-center gap-3 mb-3 flex-shrink-0">
                        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Prompt Content</h3>
                        <div className="h-px flex-1 bg-gray-100"></div>
                      </div>
                      <div 
                        className="flex-1 overflow-y-auto custom-scrollbar text-gray-600 text-sm leading-relaxed whitespace-pre-wrap pb-32 overscroll-contain touch-pan-y"
                        onTouchStart={(e) => e.stopPropagation()}
                        onTouchMove={(e) => e.stopPropagation()}
                      >
                        {getLocalized(template?.content, language)}
                      </div>
                  </div>
                  
                  {/* Hint for non-expanded state */}
                  {!isTextExpanded && (
                    <div className="px-6 pb-24 text-[10px] font-medium text-gray-400 animate-pulse text-center flex-shrink-0">
                      点击卡片或向上滑动查看详细内容
                    </div>
                  )}
              </div>
          </div>
      </div>
    );
  }

  return (
    <div 
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-500 overflow-hidden"
        onMouseMove={(e) => !isMobile && setModalMousePos({ x: e.clientX, y: e.clientY })}
        onClick={() => setZoomedImage(null)}
    >
        {/* Background Layer - Static image + deep mask to prevent flickering from discovery view */}
        <div 
          className="absolute inset-0 z-[-1] bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/background1.png)',
          }}
        >
          <div className="absolute inset-0 bg-black/85 backdrop-blur-3xl"></div>
        </div>

        <button 
            className="absolute top-6 right-6 md:top-8 md:right-8 text-white/40 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 z-[120]"
            onClick={() => setZoomedImage(null)}
        >
            <X size={isMobile ? 24 : 32} />
        </button>
        
        <div 
            className="max-w-7xl w-full h-full md:h-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-20 z-[110]"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Left: Image Section with 3D Effect */}
            <div 
              className={`flex-shrink-0 flex justify-center items-center perspective-[1000px] relative group/modal-img flex-1`}
              style={{ perspective: '1200px' }}
            >
                <div 
                  className="relative transition-transform duration-200 ease-out h-full flex items-center justify-center"
                  style={{ 
                    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div 
                    className="absolute inset-4 bg-black/40 blur-3xl rounded-3xl -z-10 transition-opacity duration-500"
                    style={{ transform: 'translateZ(-50px)' }}
                  />
                  
                  <img 
                      key={currentImageUrl}
                      src={currentImageUrl} 
                      alt="Zoomed Preview" 
                      className={`max-w-full rounded-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/20 animate-in fade-in duration-300 max-h-[75vh] object-contain`}
                      style={{ transform: 'translateZ(20px)' }}
                  />
                </div>

                {/* Navigation & Indicator */}
                {allImages.length > 1 && (
                  <div className={`absolute left-1/2 -translate-x-1/2 flex items-center gap-6 z-30 -bottom-12`}>
                    <button 
                      onClick={handlePrev}
                      className="p-1.5 rounded-full bg-white/5 hover:bg-white/20 text-white/50 hover:text-white transition-all backdrop-blur-md border border-white/10"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex gap-2">
                      {allImages.map((_, idx) => (
                        <div 
                          key={idx}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-orange-500 w-3' : 'bg-white/20'}`}
                        />
                      ))}
                    </div>

                    <button 
                      onClick={handleNext}
                      className="p-1.5 rounded-full bg-white/5 hover:bg-white/20 text-white/50 hover:text-white transition-all backdrop-blur-md border border-white/10"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
            </div>
            
            {/* Right: Info & Prompt Section */}
            <div className={`flex flex-col items-start animate-in slide-in-from-right-10 duration-700 delay-150 overflow-hidden w-full md:w-[450px] mt-auto`}>
                {template ? (
                    <>
                        <div className={`mb-4 md:mb-8`}>
                            <h2 className={`font-bold text-white mb-2 md:mb-3 tracking-tight leading-tight text-4xl md:text-5xl`}>
                                {getLocalized(template.name, language)}
                            </h2>
                            {template.author && (
                              <div className="mb-4 opacity-70">
                                <span className="text-sm font-bold text-white/90 tracking-wide">{template.author}</span>
                              </div>
                            )}
                            <div className="flex flex-wrap gap-2 opacity-80">
                                {(template.tags || []).map(tag => (
                                    <span key={tag} className={`px-2 py-0.5 md:px-3 md:py-1 rounded-lg text-[10px] md:text-[11px] font-bold tracking-wider uppercase ${TAG_STYLES[tag] || TAG_STYLES["default"]}`}>
                                        {displayTag(tag)}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className={`w-full mb-6 md:mb-10 flex-1 overflow-hidden flex flex-col`}>
                            <div className="flex items-center gap-4 mb-3">
                                <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">Content</h3>
                                <div className="h-px flex-1 bg-white/5"></div>
                            </div>
                            <div className={`text-white/80 leading-relaxed whitespace-pre-wrap font-medium overflow-y-auto custom-scrollbar-white pr-4 text-base md:text-lg max-h-[40vh]`}>
                                {getLocalized(template.content, language)}
                            </div>
                        </div>

                        <div className={`w-full flex flex-col gap-4 mt-auto`}>
                            <PremiumButton
                                onClick={() => {
                                    setActiveTemplateId(template.id);
                                    setDiscoveryView(false);
                                    setZoomedImage(null);
                                }}
                                icon={Sparkles}
                                active={true}
                                isDarkMode={true}
                                className="w-full !min-h-[56px] !rounded-2xl"
                            >
                                <span className="text-lg">{t('use_template') || '使用此模板'}</span>
                            </PremiumButton>
                            
                            <div className="flex items-center justify-between px-2">
                              <p className="text-[10px] text-white/30 font-bold tracking-widest uppercase">
                                  Prompt Fill Original
                              </p>
                              <div className="flex gap-4">
                                  <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                                  <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                                  <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                              </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-white/20 gap-4 w-full">
                        <ImageIcon size={64} strokeWidth={1} />
                        <p className="text-lg font-bold tracking-widest uppercase">No Data Found</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
});

// --- 组件：动态 Slogan (PC端) ---
const AnimatedSlogan = React.memo(({ isActive, language, isDarkMode }) => {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [styleIndex, setStyleIndex] = useState(0);

  const currentScenes = SCENE_WORDS[language] || SCENE_WORDS.cn;
  const currentStyles = STYLE_WORDS[language] || STYLE_WORDS.cn;

  useEffect(() => {
    if (!isActive) return;
    
    const sceneTimer = setInterval(() => {
      setSceneIndex(prev => (prev + 1) % currentScenes.length);
    }, 2000);
    const styleTimer = setInterval(() => {
      setStyleIndex(prev => (prev + 1) % currentStyles.length);
    }, 2500);
    return () => {
      clearInterval(sceneTimer);
      clearInterval(styleTimer);
    };
  }, [isActive, currentScenes.length, currentStyles.length]);

  return (
    <div className={`flex flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-3 text-sm md:text-base lg:text-lg font-medium font-['MiSans',system-ui,sans-serif] px-2 leading-relaxed min-h-[50px] ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
      <span className="whitespace-nowrap">"{language === 'en' ? 'Show a detailed, miniature' : '展示一个精致的、微缩'}</span>
      <div className="inline-flex items-center justify-center min-w-[100px]">
        <span 
          key={`style-${styleIndex}-${language}`}
          className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full transition-all duration-500 select-none font-bold text-white whitespace-nowrap pill-animate"
          style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
            boxShadow: isDarkMode 
              ? 'inset 0px 2px 4px 0px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(96, 165, 250, 0.2)'
              : 'inset 0px 2px 4px 0px rgba(255, 255, 255, 0.2), 0 4px 12px rgba(96, 165, 250, 0.4)',
            border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.3)',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }}
        >
          {currentStyles[styleIndex]}
                </span>
        </div>
      <span className="whitespace-nowrap">{language === 'en' ? 'of' : '的'}</span>
      <div className="inline-flex items-center justify-center min-w-[100px]">
        <span 
          key={`scene-${sceneIndex}-${language}`}
          className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full transition-all duration-500 select-none font-bold text-white whitespace-nowrap pill-animate"
          style={{
            background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
            boxShadow: isDarkMode 
              ? 'inset 0px 2px 4px 0px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(251, 146, 60, 0.2)'
              : 'inset 0px 2px 4px 0px rgba(255, 255, 255, 0.2), 0 4px 12px rgba(251, 146, 60, 0.4)',
            border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.3)',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }}
        >
          {currentScenes[sceneIndex]}
        </span>
            </div>
      <span className="whitespace-nowrap">{language === 'en' ? 'scene"' : '场景"'}</span>
    </div>
  );
});

// --- 组件：动态 Slogan (移动端) ---
const MobileAnimatedSlogan = React.memo(({ isActive, language, isDarkMode }) => {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [styleIndex, setStyleIndex] = useState(0);

  const currentScenes = SCENE_WORDS[language] || SCENE_WORDS.cn;
  const currentStyles = STYLE_WORDS[language] || STYLE_WORDS.cn;

  useEffect(() => {
    if (!isActive) return;

    const sceneTimer = setInterval(() => {
      setSceneIndex(prev => (prev + 1) % currentScenes.length);
    }, 2000);
    const styleTimer = setInterval(() => {
      setStyleIndex(prev => (prev + 1) % currentStyles.length);
    }, 2500);
    return () => {
      clearInterval(sceneTimer);
      clearInterval(styleTimer);
    };
  }, [isActive, currentScenes.length, currentStyles.length]);

    return (
    <div className={`flex flex-wrap items-center justify-center gap-1 text-[11px] md:text-xs font-medium mb-3 min-h-[28px] ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
      <span className="whitespace-nowrap">"{language === 'en' ? 'Show' : '展示'}</span>
      <div className="inline-flex items-center justify-center min-w-[70px]">
        <span 
          key={`style-m-${styleIndex}-${language}`}
          className="inline-block px-2 py-0.5 rounded-full font-bold text-white text-[10px] whitespace-nowrap pill-animate"
          style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
            boxShadow: isDarkMode 
              ? 'inset 0px 2px 4px 0px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(96, 165, 250, 0.2)'
              : '0 2px 8px rgba(96, 165, 250, 0.3)'
          }}
        >
          {currentStyles[styleIndex]}
        </span>
                    </div>
      <span className="whitespace-nowrap">{language === 'en' ? 'of' : '的'}</span>
      <div className="inline-flex items-center justify-center min-w-[70px]">
        <span 
          key={`scene-m-${sceneIndex}-${language}`}
          className="inline-block px-2 py-0.5 rounded-full font-bold text-white text-[10px] whitespace-nowrap pill-animate"
          style={{
            background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
            boxShadow: isDarkMode 
              ? 'inset 0px 2px 4px 0px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(251, 146, 60, 0.2)'
              : '0 2px 8px rgba(251, 146, 60, 0.3)'
          }}
        >
          {currentScenes[sceneIndex]}
        </span>
                            </div>
      <span className="whitespace-nowrap">{language === 'en' ? 'scene"' : '场景"'}</span>
        </div>
    );
});

// ====== 以下组件保留在此文件中 ======
// CategorySection, BankGroup, CategoryManager, InsertVariableModal, App

// --- 组件：可折叠的分类区块 (New Component) ---
// ====== 核心组件区 (已提取至独立文件) ======

// Poster View Animated Slogan Constants - 已移至 constants/slogan.js

const App = () => {
  // 当前应用代码版本 (必须与 package.json 和 version.json 一致)
  const APP_VERSION = "0.6.3";

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

  // History State for Undo/Redo
  const [historyPast, setHistoryPast] = useState([]);
  const [historyFuture, setHistoryFuture] = useState([]);
  const historyLastSaveTime = useRef(0);

  // Cursor State for Grouping
  const [cursorInVariable, setCursorInVariable] = useState(false);
  const [currentVariableName, setCurrentVariableName] = useState(null);
  const [currentGroupId, setCurrentGroupId] = useState(null);

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

  // Derived State: Current Active Template
  const activeTemplate = templates.find(t => t.id === activeTemplateId) || templates[0];

  // 分享功能相关状态
  const [sharedTemplateData, setSharedTemplateData] = useState(null);
  const [showShareImportModal, setShowShareImportModal] = useState(false);
  const [showShareOptionsModal, setShowShareOptionsModal] = useState(false);

  // 计算分享 URL（带长度检查）
  const shareUrlMemo = useMemo(() => {
    if (!activeTemplate) return "";
    
    const compressed = compressTemplate(activeTemplate);
    const base = PUBLIC_SHARE_URL || (window.location.origin + window.location.pathname);
    
    if (!compressed) return base;

    const fullUrl = `${base}${base.endsWith('/') ? '' : '/'}#/share?share=${compressed}`;
    return fullUrl;
  }, [activeTemplate]);

  // 检查分享参数
  useEffect(() => {
    const handleCheckShare = () => {
      // 兼容查询参数和哈希参数
      const hashStr = window.location.hash.split('?')[1] || "";
      const urlParams = new URLSearchParams(window.location.search || hashStr);
      let shareData = urlParams.get('share');
      
      // 如果没有直接获取到 share 参数，尝试从整个 hash 字符串中解析（防止某些粘贴格式错误）
      if (!shareData && window.location.hash.includes('share=')) {
        const match = window.location.hash.match(/share=([^&?]+)/);
        if (match) shareData = match[1];
      }

      if (shareData) {
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

        const decoded = decompressTemplate(shareData);
        if (decoded && decoded.name && decoded.content) {
          setSharedTemplateData(decoded);
          setShowShareImportModal(true);
          
          // 清理 URL，避免刷新时重复触发
          const newUrl = window.location.origin + window.location.pathname + window.location.hash.split('?')[0];
          window.history.replaceState({}, document.title, newUrl);
        }
      }
    };

    handleCheckShare();
    window.addEventListener('hashchange', handleCheckShare);
    return () => window.removeEventListener('hashchange', handleCheckShare);
  }, []);

  // 手动口令导入处理函数
  const handleManualTokenImport = (token) => {
    if (!token) return;
    
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

    const decoded = decompressTemplate(shareData);
    if (decoded && decoded.name && decoded.content) {
      setSharedTemplateData(decoded);
      setShowShareImportModal(true);
    } else {
      alert(language === 'cn' ? '无效的分享口令或链接' : 'Invalid share token or link');
    }
  };

  const handleImportSharedTemplate = () => {
    if (!sharedTemplateData) return;
    
    const newTpl = {
      ...sharedTemplateData,
      id: `tpl_shared_${Date.now()}`,
      selections: sharedTemplateData.selections || {},
      author: sharedTemplateData.author || t('official')
    };

    setTemplates(prev => [...prev, newTpl]);
    setActiveTemplateId(newTpl.id);
    setShowShareImportModal(false);
    setSharedTemplateData(null);
    setDiscoveryView(false);
    
    if (isMobileDevice) {
      setMobileTab('editor');
    }
  };

    const handleShareLink = () => {
      setShowShareOptionsModal(true);
    };

    // 实际执行复制分享链接
    const doCopyShareLink = async () => {
      if (shareUrlMemo) {
        const success = await copyToClipboard(shareUrlMemo);
        if (success) {
          alert(t('share_success'));
          setShowShareOptionsModal(false);
        } else {
          alert(language === 'cn' ? '复制失败，请手动长按复制' : 'Copy failed, please copy manually');
        }
      }
    };

    // 复制分享口令 (WeChat 友好)
    const handleShareToken = async () => {
      if (!activeTemplate) return;
      const compressed = compressTemplate(activeTemplate);
      if (!compressed) return;

      const templateName = getLocalized(activeTemplate.name, language);
      const tokenText = `「Prompt分享」我的新模版：${templateName}\n复制整段文字，打开【提示词填空器】即可导入：\n#pf$${compressed}$`;
      
      const success = await copyToClipboard(tokenText);
      if (success) {
        alert(language === 'cn' ? '分享口令已复制，快去发给好友吧！' : 'Share token copied!');
        setShowShareOptionsModal(false);
      } else {
        alert(language === 'cn' ? '复制失败，请尝试链接分享' : 'Copy failed, please try Link Share');
      }
    };

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

  const handleAddTemplate = () => {
    const newId = `tpl_${Date.now()}`;
    const newName = t('new_template_name');
    const newAuthor = "PromptFill User";
    const newTemplate = {
      id: newId,
      name: newName,
      author: newAuthor,
      content: t('new_template_content'),
      selections: {},
      tags: []
    };
    setTemplates(prev => [...prev, newTemplate]);
    setActiveTemplateId(newId);
    setIsEditing(true);
    
    // 初始化标题和作者编辑状态
    setEditingTemplateNameId(newId);
    setTempTemplateName(newName);
    setTempTemplateAuthor(newAuthor);
    
    // 在移动端自动切换到编辑Tab
    if (isMobileDevice) {
      setMobileTab('editor');
    }
  };

  const handleDuplicateTemplate = (t_item, e) => {
      e.stopPropagation();
      const newId = `tpl_${Date.now()}`;
      
      const duplicateName = (name) => {
        if (typeof name === 'string') return `${name}${t('copy_suffix')}`;
        const newName = { ...name };
        Object.keys(newName).forEach(lang => {
          const suffix = TRANSLATIONS[lang]?.copy_suffix || ' (Copy)';
          newName[lang] = `${newName[lang]}${suffix}`;
        });
        return newName;
      };

      const isSystemTemplate = INITIAL_TEMPLATES_CONFIG.some(cfg => cfg.id === t_item.id);
      const newTemplate = {
          ...t_item,
          id: newId,
          name: duplicateName(t_item.name),
          author: isSystemTemplate ? "PromptFill User" : (t_item.author || "PromptFill User"),
          selections: { ...t_item.selections }
      };
      setTemplates(prev => [...prev, newTemplate]);
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

  const startRenamingTemplate = (t_item, e) => {
    if (e) e.stopPropagation();
    setIsEditing(true);
    setEditingTemplateNameId(t_item.id);
    setTempTemplateName(getLocalized(t_item.name, language));
    setTempTemplateAuthor(t_item.author || "");
  };

  const handleStartEditing = () => {
    setIsEditing(true);
    if (activeTemplate) {
      startRenamingTemplate(activeTemplate);
    }
  };

  const handleStopEditing = () => {
    setIsEditing(false);
    setEditingTemplateNameId(null);
  };

  const saveTemplateName = () => {
    if (tempTemplateName.trim()) {
      setTemplates(prev => prev.map(t_item => {
        if (t_item.id === editingTemplateNameId) {
          const newName = typeof t_item.name === 'object' 
            ? { ...t_item.name, [language]: tempTemplateName }
            : tempTemplateName;
          return { ...t_item, name: newName, author: tempTemplateAuthor };
        }
        return t_item;
      }));
    }
    setEditingTemplateNameId(null);
  };

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

  // 变量解析工具函数：从变量名中提取 baseKey 和 groupId
  // 例如: "fruit_1" -> { baseKey: "fruit", groupId: "1" }
  //      "fruit" -> { baseKey: "fruit", groupId: null }
  const parseVariableName = React.useCallback((varName) => {
    const match = varName.match(/^(.+?)(?:_(\d+))?$/);
    if (match) {
      return {
        baseKey: match[1],
        groupId: match[2] || null
      };
    }
    return { baseKey: varName, groupId: null };
  }, []);

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
  }, [isEditing, parseVariableName]);

  // 监听光标位置变化
  React.useEffect(() => {
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

  // 查找模板中所有需要联动的变量
  // 规则：如果变量有 groupId，找到所有相同 baseKey 且有相同 groupId 的变量
  // 例如：{{fruit}}_1 和 {{fruit}}_2 如果 groupId 都是 "1"，则联动
  // 但更常见的用法是：{{fruit}}_1 和 {{fruit}}_2 应该联动（因为它们都是同一组）
  // 我们使用一个更简单的规则：所有相同 baseKey 且有 groupId 的变量都联动（无论 groupId 是否相同）
  // 或者更精确：相同 baseKey 且 groupId 相同的变量联动
  // 为了灵活性，我们采用：相同 baseKey 且都有 groupId 的变量都联动（简化版）
  // 但用户可能想要：{{fruit}}_1 和 {{fruit}}_2 联动，{{fruit}}_3 和 {{fruit}}_4 联动
  // 这意味着我们需要一个更智能的规则
  // 
  // 重新理解需求：用户说 "_1的成组联动，_2的成组联动"
  // 这意味着：所有带 _1 后缀的变量联动，所有带 _2 后缀的变量联动
  // 所以规则应该是：相同 baseKey 且相同 groupId 的变量联动
  const findLinkedVariables = React.useCallback((template, baseKey, groupId) => {
    if (!groupId) return []; // 没有 groupId 的变量不联动
    
    const linkedKeys = [];
    const content = typeof template.content === 'object' 
      ? Object.values(template.content).join('\n')
      : template.content || '';
    
    // 找到所有 {{baseKey_groupId}} 格式的变量
    const allMatches = content.matchAll(/\{\{([^}]+)\}\}/g);
    const counters = {};
    
    for (const match of allMatches) {
      const fullKey = match[1].trim();
      const parsed = parseVariableName(fullKey);
      
      // 匹配相同 baseKey 且相同 groupId 的变量
      // 例如：{{fruit}}_1 和 {{fruit}}_1 会联动，但 {{fruit}}_1 和 {{fruit}}_2 不会
      if (parsed.baseKey === baseKey && parsed.groupId === groupId) {
        const idx = counters[fullKey] || 0;
        counters[fullKey] = idx + 1;
        linkedKeys.push(`${fullKey}-${idx}`);
      }
    }
    
    return linkedKeys;
  }, [parseVariableName]);

  const updateActiveTemplateSelection = React.useCallback((uniqueKey, value, linkedKeys = []) => {
    setTemplates(prev => prev.map(t => {
      if (t.id === activeTemplateId) {
        const newSelections = { ...t.selections, [uniqueKey]: value };
        
        // 同步更新所有联动的变量
        linkedKeys.forEach(linkedKey => {
          if (linkedKey !== uniqueKey) {
            newSelections[linkedKey] = value;
          }
        });
        
        return {
          ...t,
          selections: newSelections
        };
      }
      return t;
    }));
  }, [activeTemplateId, setTemplates]);

  // --- Bank Actions ---

  const handleSelect = React.useCallback((key, index, value) => {
    const uniqueKey = `${key}-${index}`;
    
    // 解析变量名，检查是否有联动组
    const parsed = parseVariableName(key);
    
    // 如果有关联组，找到所有需要联动的变量
    let linkedKeys = [];
    if (parsed.groupId) {
      const activeTemplate = templates.find(t => t.id === activeTemplateId);
      if (activeTemplate) {
        linkedKeys = findLinkedVariables(activeTemplate, parsed.baseKey, parsed.groupId);
      }
    }
    
    updateActiveTemplateSelection(uniqueKey, value, linkedKeys);
    setActivePopover(null);
  }, [parseVariableName, findLinkedVariables, updateActiveTemplateSelection, templates, activeTemplateId]);

  const handleAddCustomAndSelect = React.useCallback((key, index, newValue) => {
    if (!newValue || !newValue.trim()) return;
    
    // 解析变量名，获取 baseKey（词库的 key）
    const parsed = parseVariableName(key);
    const baseKey = parsed.baseKey;
    
    // 1. Add to bank if not exists (使用 baseKey)
    if (banks[baseKey] && !banks[baseKey].options.includes(newValue)) {
        handleAddOption(baseKey, newValue);
    }
    
    // 2. Select it (使用完整的 key，可能包含 groupId)
    handleSelect(key, index, newValue);
  }, [banks, handleSelect, parseVariableName]);

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
            console.warn("图片 Base64 转换失败，尝试直接导出", e);
            // 如果 fetch 失败（比如彻底的 CORS 封锁），我们只能尝试允许 canvas 污染
            // 但通常 fetch 失败意味着 canvas 也会失败
        }
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
                           <div style="font-size: 11px; color: #3b82f6; font-weight: 500; background: #eff6ff; padding: 4px 8px; border-radius: 4px; display: inline-block; letter-spacing: 0.3px;">
                               ${window.location.origin}${window.location.pathname}
                           </div>
                       </div>
                       <div style="display: flex; align-items: center;">
                           <div style="text-align: center;">
                               <img src="/QRCode.png" 
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

  return (
    <div 
      className={`flex h-screen w-screen overflow-hidden ${isDarkMode ? 'dark-mode' : 'mesh-gradient-bg md:p-4'}`}
      style={isDarkMode ? { 
        background: 'linear-gradient(180deg, #323131 0%, #181716 100%)',
        padding: isMobileDevice ? '0' : '16px'
      } : {}}
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
                md:flex flex-1 shrink-[1] min-w-[400px] flex-col h-full overflow-hidden relative
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
                  <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-2 md:gap-3 shrink-0 mt-2 md:mt-0">
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

                    <div className="flex-1 md:flex-none flex items-center justify-between md:justify-end gap-2">
                      <PremiumButton 
                          onClick={handleShareLink} 
                          title={t('share_link')} 
                          icon={Share2} 
                          isDarkMode={isDarkMode}
                          className="flex-1 md:flex-none"
                      >
                          <span className="text-[11px] md:text-sm">{t('share')}</span>
                      </PremiumButton>

                      <PremiumButton 
                          onClick={handleExportImage} 
                          disabled={isEditing || isExporting} 
                          title={isExporting ? t('exporting') : t('export_image')} 
                          icon={ImageIcon} 
                          isDarkMode={isDarkMode}
                          className="flex-1 md:flex-none"
                      >
                          <span className="text-[11px] md:text-sm">{isExporting ? t('exporting') : t('export_image')}</span>
                      </PremiumButton>
                      <PremiumButton 
                          onClick={handleCopy} 
                          title={copied ? t('copied') : t('copy_result')} 
                          icon={copied ? Check : CopyIcon} 
                          active={true}
                          isDarkMode={isDarkMode}
                          className="flex-1 md:flex-none"
                      >
                           <span className="text-[11px] md:text-sm ml-1">{copied ? t('copied') : t('copy_result')}</span>
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
      {/* --- Share Import Modal --- */}
      {showShareImportModal && sharedTemplateData && (
        <div 
          className="fixed inset-0 z-[1000] bg-black/40 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setShowShareImportModal(false)}
        >
          <div 
            className={`w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden border animate-scale-up ${isDarkMode ? 'bg-[#242120] border-white/5 shadow-black/50' : 'bg-white border-gray-100'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`p-6 border-b flex justify-between items-center ${isDarkMode ? 'bg-black/20 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
              <h3 className={`text-xl font-black flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <div className="p-2 bg-orange-500 rounded-xl text-white">
                  <Share2 size={20} />
                </div>
                {t('import_shared_template')}
              </h3>
              <button 
                onClick={() => setShowShareImportModal(false)}
                className={`p-2 rounded-xl transition-all ${isDarkMode ? 'hover:bg-white/10 text-gray-500' : 'hover:bg-gray-200 text-gray-500'}`}
              >
                <X size={20}/>
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="flex items-start gap-6">
                <div className={`w-24 h-24 shrink-0 rounded-3xl overflow-hidden shadow-lg border-4 ${isDarkMode ? 'border-white/10' : 'border-white'}`}>
                  {sharedTemplateData.imageUrl ? (
                    <img src={sharedTemplateData.imageUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                      <ImageIcon size={32} className="text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className={`text-2xl font-black tracking-tight truncate ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {getLocalized(sharedTemplateData.name, language)}
                  </h4>
                  <p className="text-sm font-bold text-orange-500 uppercase tracking-widest mt-1">
                    {sharedTemplateData.author ? `${t('shared_by')} ${sharedTemplateData.author}` : t('official')}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {sharedTemplateData.tags?.map(tag => (
                      <span key={tag} className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${TAG_STYLES[tag] || TAG_STYLES["default"]}`}>
                        {displayTag(tag)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-2xl border text-sm leading-relaxed max-h-[300px] overflow-y-auto custom-scrollbar transition-all ${isDarkMode ? 'bg-black/40 border-white/5 text-gray-400 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]' : 'bg-gray-100/50 border-gray-200 text-gray-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]'}`}>
                <div className="whitespace-pre-wrap font-mono">
                  {getLocalized(sharedTemplateData.content, language)}
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <PremiumButton
                  onClick={() => setShowShareImportModal(false)}
                  isDarkMode={isDarkMode}
                  className="flex-1 size-lg"
                  icon={X}
                >
                  {t('cancel')}
                </PremiumButton>
                <PremiumButton
                  onClick={handleImportSharedTemplate}
                  active={true}
                  isDarkMode={isDarkMode}
                  className="flex-1 size-lg"
                  icon={Download}
                >
                  {t('import_now')}
                </PremiumButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Share Options Modal --- */}
      {showShareOptionsModal && activeTemplate && (
        <div 
          className="fixed inset-0 z-[1000] bg-black/40 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setShowShareOptionsModal(false)}
        >
          <div 
            className={`w-full max-w-sm rounded-[32px] shadow-2xl overflow-hidden border animate-scale-up ${isDarkMode ? 'bg-[#242120] border-white/5' : 'bg-white border-gray-100'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 relative">
              <button 
                onClick={() => setShowShareOptionsModal(false)}
                className={`absolute top-6 right-6 p-2 rounded-full transition-all ${isDarkMode ? 'text-gray-500 hover:text-white hover:bg-white/5' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                <X size={20} />
              </button>
              <h3 className={`text-xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {language === 'cn' ? '分享模版' : 'Share Template'}
              </h3>
              <p className={`text-xs font-bold mb-8 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {language === 'cn' ? '选择您喜欢的分享方式' : 'Choose your preferred sharing method'}
              </p>

              <div className="space-y-4">
                <PremiumButton 
                  onClick={doCopyShareLink}
                  isDarkMode={isDarkMode}
                  className="w-full size-lg"
                  icon={CopyIcon}
                  justify="start"
                >
                  <div className="flex flex-col items-start ml-2 text-left">
                    <span className="text-sm font-black">
                      {language === 'cn' ? '链接分享' : 'Share via Link'}
                    </span>
                    <span className={`text-[10px] font-bold opacity-50`}>
                      {language === 'cn' ? '复制完整 URL 链接' : 'Copy the full URL link'}
                    </span>
                  </div>
                </PremiumButton>

                <PremiumButton 
                  onClick={handleShareToken}
                  isDarkMode={isDarkMode}
                  className="w-full size-lg"
                  icon={Share2}
                  justify="start"
                >
                  <div className="flex flex-col items-start ml-2 text-left">
                    <span className="text-sm font-black">
                      {language === 'cn' ? '口令分享 (推荐)' : 'Share via Token'}
                    </span>
                    <span className={`text-[10px] font-bold opacity-70`}>
                      {language === 'cn' ? '适合微信分享，不易被拦截' : 'Best for WeChat, anti-blocking'}
                    </span>
                  </div>
                </PremiumButton>
              </div>
            </div>
          </div>
        </div>
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
        isDarkMode={isDarkMode}
      />

      {/* 隐藏的图片选择器 */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleUploadImage}
      />

      {/* 隐藏的图片选择器 */}

      {/* --- Settings Modal - Enhanced UI (Legacy/Mobile) --- */}
      {isSettingsOpen && isMobileDevice && (
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
                      <Download size={18} />
                      <span>{t('import_template')}</span>
                    </div>
                  </label>
                  <button
                    onClick={handleExportAllTemplates}
                    className="w-full text-center px-5 py-4 text-sm font-semibold bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl transition-all duration-300 border-2 border-orange-500 hover:border-orange-600 flex items-center justify-center gap-2.5 shadow-md shadow-orange-500/30 hover:shadow-lg hover:shadow-orange-500/40 hover:scale-[1.02]"
                  >
                    <Upload size={18} />
                    <span>{t('export_all_templates')}</span>
                  </button>
                </div>
              </div>

              {/* Data Refresh */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full"></div>
                  <p className="text-sm font-bold tracking-tight text-gray-700">{t('refresh_system')}</p>
                </div>
                <button
                  onClick={handleRefreshSystemData}
                  className="w-full text-center px-5 py-4 text-sm font-semibold bg-white hover:bg-orange-50 text-orange-600 rounded-2xl transition-all duration-300 border-2 border-orange-100 hover:border-orange-200 flex items-center justify-center gap-2.5 shadow-sm"
                >
                  <RefreshCw size={18} />
                  <span>{t('refresh_system')}</span>
                </button>
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
                    disabled={!isFileSystemSupported || isMobileDevice}
                    className={`relative w-full px-5 py-4 text-sm font-semibold rounded-2xl transition-all duration-300 border-2 flex items-center justify-between overflow-hidden group ${
                      storageMode === 'folder' 
                        ? 'bg-gradient-to-br from-green-500 to-green-600 text-white border-green-500 shadow-lg shadow-green-500/30' 
                        : `bg-gradient-to-br from-white to-gray-50 text-gray-700 border-gray-200 ${(!isFileSystemSupported || isMobileDevice) ? 'opacity-50 cursor-not-allowed' : 'hover:border-green-300 hover:shadow-md hover:scale-[1.02]'}`
                    }`}
                    title={isMobileDevice ? t('use_browser_storage') : (!isFileSystemSupported ? t('browser_not_supported') : '')}
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
        <ImagePreviewModal 
          zoomedImage={zoomedImage}
          template={INITIAL_TEMPLATES_CONFIG.find(t => t.imageUrl === zoomedImage || t.imageUrls?.includes(zoomedImage)) || 
                   templates.find(t => t.imageUrl === zoomedImage || t.imageUrls?.includes(zoomedImage)) ||
                   (activeTemplate.imageUrl === zoomedImage || activeTemplate.imageUrls?.includes(zoomedImage) ? activeTemplate : null)}
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
      )}

      {/* --- Mobile Bottom Navigation - 4 Tabs --- */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 backdrop-blur-2xl border-t flex justify-around items-center z-[250] h-16 pb-safe shadow-[0_-8px_30px_rgba(0,0,0,0.05)] transition-colors duration-300 ${isDarkMode ? 'bg-[#181716]/25 border-white/5' : 'bg-white/25 border-white/30'}`}>
          {/* 主页 */}
          <button 
             onClick={() => {
               setMobileTab('home');
               setDiscoveryView(true);
               setZoomedImage(null);
               setIsTemplatesDrawerOpen(false);
               setIsBanksDrawerOpen(false);
             }}
             className="flex flex-col items-center justify-center w-full h-full transition-all active:scale-90 group"
          >
             <div className={`p-2 rounded-xl transition-all ${mobileTab === 'home' ? (isDarkMode ? 'bg-white/5' : 'bg-orange-50/50') : ''}`}>
                <div 
                  style={{ 
                    width: '24px', 
                    height: '24px', 
                    backgroundColor: mobileTab === 'home' ? '#EA580C' : (isDarkMode ? '#8E9196' : '#6B7280'),
                    WebkitMaskImage: 'url(/home.svg)',
                    maskImage: 'url(/home.svg)',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    filter: isDarkMode ? 'none' : 'drop-shadow(1px 1px 0px rgba(255,255,255,0.3))'
                  }}
                />
             </div>
          </button>
          
          {/* 模版详情 (编辑器) */}
          <button 
             onClick={() => {
               setDiscoveryView(false);
               setZoomedImage(null);
               setIsTemplatesDrawerOpen(false);
               setIsBanksDrawerOpen(false);
               // 强制确保有模板被选中
               if (templates.length > 0 && !activeTemplateId) {
                 const firstId = templates[0].id;
                 setActiveTemplateId(firstId);
               }
               setMobileTab('editor');
             }}
             className="flex flex-col items-center justify-center w-full h-full transition-all active:scale-90 group"
          >
             <div className={`p-2 rounded-xl transition-all ${mobileTab === 'editor' ? (isDarkMode ? 'bg-white/5' : 'bg-orange-50/50') : ''}`}>
                <div 
                  style={{ 
                    width: '24px', 
                    height: '24px', 
                    backgroundColor: mobileTab === 'editor' ? '#EA580C' : (isDarkMode ? '#8E9196' : '#6B7280'),
                    WebkitMaskImage: 'url(/list.svg)',
                    maskImage: 'url(/list.svg)',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    filter: isDarkMode ? 'none' : 'drop-shadow(1px 1px 0px rgba(255,255,255,0.3))'
                  }}
                />
             </div>
          </button>
          
          {/* 设置 */}
          <button 
             onClick={() => {
               setMobileTab('settings');
               setDiscoveryView(false);
               setZoomedImage(null);
               setIsTemplatesDrawerOpen(false);
               setIsBanksDrawerOpen(false);
             }}
             className="flex flex-col items-center justify-center w-full h-full transition-all active:scale-90 group"
          >
             <div className={`p-2 rounded-xl transition-all ${mobileTab === 'settings' ? (isDarkMode ? 'bg-white/5' : 'bg-orange-50/50') : ''}`}>
                <div 
                  style={{ 
                    width: '24px', 
                    height: '24px', 
                    backgroundColor: mobileTab === 'settings' ? '#EA580C' : (isDarkMode ? '#8E9196' : '#6B7280'),
                    WebkitMaskImage: 'url(/setting.svg)',
                    maskImage: 'url(/setting.svg)',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    filter: isDarkMode ? 'none' : 'drop-shadow(1px 1px 0px rgba(255,255,255,0.3))'
                  }}
                />
             </div>
          </button>

          {/* 暗色模式切换 (循环：Light -> Dark -> System) */}
          <button 
             onClick={() => {
               if (themeMode === 'light') setThemeMode('dark');
               else if (themeMode === 'dark') setThemeMode('system');
               else setThemeMode('light');
             }}
             className="flex flex-col items-center justify-center w-full h-full transition-all active:scale-90 group relative"
             title={themeMode === 'system' ? 'Follow System' : (themeMode === 'dark' ? 'Dark Mode' : 'Light Mode')}
          >
             <div className="p-2 rounded-xl transition-all">
                <div className={`${isDarkMode ? 'text-[#8E9196]' : 'text-[#6B7280]'} transition-colors`}>
                   {themeMode === 'system' ? (
                     <div className="relative">
                       <Sun size={24} className="opacity-50" />
                       <Moon size={14} className="absolute -bottom-1 -right-1" />
                     </div>
                   ) : (themeMode === 'dark' ? <Moon size={24} /> : <Sun size={24} />)}
                </div>
             </div>
             {themeMode === 'system' && (
               <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
             )}
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
        isDarkMode={isDarkMode}
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
        isDarkMode={isDarkMode}
      />

      {/* --- 数据更新提示 (模板和词库) --- */}
      {showDataUpdateNotice && (
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
                  setLastAppliedDataVersion(SYSTEM_DATA_VERSION);
                  setShowDataUpdateNotice(false);
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

      {/* --- 应用刷新提示 (应用版本更新) --- */}
      {showAppUpdateNotice && (
        <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-[150]">
          <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 max-w-md ml-auto border border-blue-400">
            <div className="p-2 bg-white/20 rounded-xl">
              <Sparkles size={24} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium leading-snug">
                {updateNoticeType === 'app' ? t('app_update_available_msg') : t('data_update_available_msg')}
              </p>
            </div>
            <button
              onClick={() => {
                window.location.reload();
              }}
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