import React, { useState, useRef, useEffect, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles, ImageIcon } from 'lucide-react';
import { getLocalized, getVideoEmbedInfo } from '../../utils/helpers';
import { PremiumButton } from '../PremiumButton';
import { OptimizedImage } from '../OptimizedImage';
import { useResolvedFolderMediaSrc } from '../../context/FolderStorageContext';

/** 发现页大图：直连视频 + poster 均支持 images/ 相对路径 */
function ModalInlineVideo({ src, poster, className, onClick, unavailableCn, unavailableEn }) {
  const { displaySrc: vSrc, failed: vFail } = useResolvedFolderMediaSrc(src || '');
  const { displaySrc: pSrc } = useResolvedFolderMediaSrc(poster || '');
  if (vFail || !vSrc) {
    return (
      <div className={`max-w-full max-h-full flex items-center justify-center rounded-2xl text-xs px-4 py-8 ${className?.includes('border') ? '' : 'border border-white/10'} text-white/50`}>
        {unavailableCn && unavailableEn ? `${unavailableCn} / ${unavailableEn}` : unavailableCn || unavailableEn || 'Unavailable'}
      </div>
    );
  }
  return (
    <video
      src={vSrc}
      {...(pSrc ? { poster: pSrc } : {})}
      controls
      playsInline
      preload="metadata"
      className={className}
      onClick={onClick}
    />
  );
}

/**
 * 图片 3D 预览弹窗组件
 * 支持桌面端和移动端的 3D 效果、陀螺仪控制、手势操作
 *
 * @param {Object} props
 * @param {string} props.zoomedImage - 当前预览的图片 URL
 * @param {Array} props.templates - 所有模板列表
 * @param {string} props.language - 语言设置
 * @param {Function} props.setLanguage - 设置语言
 * @param {Function} props.t - 翻译函数
 * @param {Object} props.TAG_STYLES - 标签样式
 * @param {Function} props.displayTag - 显示标签
 * @param {Function} props.setActiveTemplateId - 设置激活模版
 * @param {Function} props.setDiscoveryView - 设置发现页视图
 * @param {Function} props.setZoomedImage - 设置预览图片
 * @param {Function} props.setMobileTab - 设置移动端标签
 * @param {Function} props.handleRefreshSystemData - 刷新系统数据
 * @param {Function} props.setIsSettingsOpen - 设置设置面板打开状态
 * @param {boolean} props.isDarkMode - 是否暗色模式
 */
const ImagePreviewModal = React.memo(({
  zoomedImage,
  templates,
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
  // 早期返回：如果没有图片预览，不渲染组件
  if (!zoomedImage) return null;

  // 根据 zoomedImage 找到对应的模板（支持 imageUrl、imageUrls、videoUrl 匹配）
  const template = React.useMemo(() => {
    if (!templates || templates.length === 0) return null;
    return templates.find(t =>
      t.imageUrl === zoomedImage ||
      (t.imageUrls && t.imageUrls.includes(zoomedImage)) ||
      t.videoUrl === zoomedImage
    ) || templates[templates.length - 1]; // 回退到最新的模板
  }, [zoomedImage, templates]);

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
  const isVideo = template?.type === 'video';
  // poster 只在有真实图片 URL 时使用，避免传入 videoUrl 或空字符串导致第一帧不显示
  const videoPoster = template?.imageUrl || undefined;

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
          className="fixed inset-0 z-[200] flex flex-col overflow-hidden"
          onClick={() => setZoomedImage(null)}
      >
          {/* Background Layer */}
          <div
            className="absolute inset-0 z-[-1] bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/background1.png)' }}
          >
            <div className={`absolute inset-0 backdrop-blur-2xl ${isDarkMode ? 'bg-black/95' : 'bg-white/90'}`}></div>
          </div>

          <button
              className={`absolute right-6 transition-colors p-2 rounded-full z-[150] ${isDarkMode ? 'text-white/40 hover:text-white hover:bg-white/10' : 'text-gray-400 hover:text-gray-900 hover:bg-black/5'}`}
              style={{ top: 'calc(1rem + env(safe-area-inset-top))' }}
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
                className={`transition-all duration-500 ease-in-out flex flex-col justify-center items-center relative px-6 flex-shrink-0 ${isVideo ? 'perspective-none' : 'perspective-[1000px]'} ${isTextExpanded ? 'h-[30vh] pt-10' : 'h-[60vh]'}`}
                style={{ perspective: isVideo ? 'none' : '1200px' }}
                onTouchMove={handleTouchMove}
              >
                  <div
                    className="relative transition-transform duration-200 ease-out flex items-center justify-center w-full h-full"
                    style={{
                      transform: (isTextExpanded || isVideo) ? 'none' : `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Image Shadow */}
                    <div
                      className={`absolute inset-6 blur-3xl rounded-3xl -z-10 transition-opacity duration-500 ${isDarkMode ? 'bg-orange-500/5' : 'bg-orange-500/10'}`}
                      style={{ transform: 'translateZ(-50px)' }}
                    />
                    {isVideo && template?.videoUrl ? (
                        getVideoEmbedInfo(template.videoUrl)?.isEmbed ? (
                          <div className="w-full aspect-video">
                            <iframe
                              src={getVideoEmbedInfo(template.videoUrl).embedUrl}
                              className="w-full h-full border-0 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              title="Video Preview"
                            />
                          </div>
                        ) : (
                          <ModalInlineVideo
                            src={template.videoUrl}
                            poster={videoPoster}
                            unavailableCn="视频不可用"
                            unavailableEn="Video unavailable"
                            className={`max-w-full max-h-full object-contain rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] animate-in fade-in duration-300 ${isDarkMode ? 'border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)]' : 'border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.15)]'}`}
                            onClick={(e) => e.stopPropagation()}
                          />
                        )
                    ) : (
                        <OptimizedImage
                            key={currentImageUrl}
                            src={currentImageUrl}
                            alt="Zoomed Preview"
                            className={`max-w-full max-h-full object-contain rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] animate-in fade-in duration-300 ${isDarkMode ? 'border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)]' : 'border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.15)]'}`}
                            style={{ transform: (isTextExpanded || isVideo) ? 'none' : 'translateZ(20px)' }}
                            isDarkMode={isDarkMode}
                            priority={0}
                        />
                    )}
                  </div>

                  {/* Mobile Navigation */}
                  {allImages.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30">
                      <button onClick={handlePrev} className={`p-1.5 rounded-full backdrop-blur-md shadow-sm border transition-all ${isDarkMode ? 'bg-black/40 text-white/50 border-white/5' : 'bg-white/50 text-gray-400 border-white'}`}><ChevronLeft size={14} /></button>
                      <div className="flex gap-1.5">
                        {allImages.map((_, idx) => (
                          <div key={idx} className={`w-1 h-1 rounded-full transition-all ${idx === currentIndex ? 'bg-orange-500 w-3' : (isDarkMode ? 'bg-white/20' : 'bg-gray-300')}`} />
                        ))}
                      </div>
                      <button onClick={handleNext} className={`p-1.5 rounded-full backdrop-blur-md shadow-sm border transition-all ${isDarkMode ? 'bg-black/40 text-white/50 border-white/5' : 'bg-white/50 text-gray-400 border-white'}`}><ChevronRight size={14} /></button>
                    </div>
                  )}
              </div>

              {/* Bottom Card Section */}
              <div
                className={`
                  flex-1 backdrop-blur-2xl transition-all duration-500 ease-in-out flex flex-col overflow-hidden
                  ${isDarkMode ? 'bg-[#1c1c1e]/80 border-t border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]' : 'bg-white/70 border-t border-white/60 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]'}
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
                    <div className={`w-10 h-1 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`}></div>
                  </div>

                  {/* Header Row */}
                  <div className="px-6 flex items-center justify-between gap-4 mb-2 header-trigger flex-shrink-0">
                      <div className="flex-1 min-w-0">
                        <h2 className={`text-xl font-bold truncate mb-0.5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {getLocalized(template?.name, language)}
                        </h2>
                        {template?.author && (
                          <div className="mb-1.5 opacity-90">
                            <span className={`text-[10px] font-bold truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-600/90'}`}>{template.author}</span>
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
                      <PremiumButton
                        active={true}
                        isDarkMode={isDarkMode}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (template) {
                            setActiveTemplateId(template.id);
                            setDiscoveryView(false);
                            if (setMobileTab) setMobileTab('editor');
                            setZoomedImage(null);
                          }
                        }}
                        className="!h-auto !min-h-[42px] !rounded-xl shadow-[0_4px_15px_rgba(249,115,22,0.3)] active:scale-95 transition-all flex-shrink-0"
                      >
                        <span className="font-bold text-sm px-2">{t('use_template')}</span>
                      </PremiumButton>
                  </div>

                  {/* Content Area */}
                  <div
                    className={`px-6 flex-1 overflow-hidden flex flex-col transition-all duration-500 content-scroll-area ${isTextExpanded ? 'opacity-100 mt-4' : 'opacity-0 h-0 pointer-events-none'}`}
                  >
                      <div className="flex items-center gap-3 mb-3 flex-shrink-0">
                        <h3 className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isDarkMode ? 'text-white/20' : 'text-gray-400'}`}>Prompt Content</h3>
                        <div className={`h-px flex-1 ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}></div>
                      </div>
                      <div
                        className={`flex-1 overflow-y-auto custom-scrollbar text-sm leading-relaxed whitespace-pre-wrap pb-32 overscroll-contain touch-pan-y ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}
                        onTouchStart={(e) => e.stopPropagation()}
                        onTouchMove={(e) => e.stopPropagation()}
                      >
                        {getLocalized(template?.content, language)}
                      </div>
                  </div>

                  {/* Hint for non-expanded state */}
                  {!isTextExpanded && (
                    <div className={`px-6 pb-24 text-[10px] font-medium animate-pulse text-center flex-shrink-0 ${isDarkMode ? 'text-white/20' : 'text-gray-400'}`}>
                      {language === 'cn' ? '点击卡片或向上滑动查看详细内容' : 'Tap or swipe up to view details'}
                    </div>
                  )}
              </div>
          </div>
      </div>
    );
  }

  return (
    <div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 overflow-hidden"
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
          <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl"></div>
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
              className={`flex-1 min-w-0 flex justify-center items-center relative group/modal-img ${isVideo ? 'w-full' : 'perspective-[1000px]'}`}
              style={{ perspective: isVideo ? 'none' : '1200px' }}
            >
                <div
                  className={`relative transition-transform duration-200 ease-out flex items-center justify-center ${isVideo ? 'w-full h-full' : 'h-full'}`}
                  style={{
                    transform: isVideo ? 'none' : `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div
                    className="absolute inset-4 bg-black/40 blur-3xl rounded-3xl -z-10 transition-opacity duration-500"
                    style={{ transform: 'translateZ(-50px)' }}
                  />

                  {isVideo && template?.videoUrl ? (
                    <div className="w-full">
                      {getVideoEmbedInfo(template.videoUrl)?.isEmbed ? (
                        <div className="w-full aspect-video">
                          <iframe
                            src={getVideoEmbedInfo(template.videoUrl).embedUrl}
                            className="w-full h-full border-0 rounded-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            title="Video Preview"
                          />
                        </div>
                      ) : (
                        <ModalInlineVideo
                          src={template.videoUrl}
                          poster={videoPoster}
                          unavailableCn="视频不可用"
                          unavailableEn="Video unavailable"
                          className="w-full h-auto rounded-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/20 animate-in fade-in duration-300 max-h-[70vh] object-contain"
                          onClick={(e) => e.stopPropagation()}
                        />
                      )}
                    </div>
                  ) : (
                    <OptimizedImage
                        key={currentImageUrl}
                        src={currentImageUrl}
                        alt="Zoomed Preview"
                        className="max-w-full rounded-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/20 animate-in fade-in duration-300 max-h-[75vh] object-contain"
                        style={{ transform: isVideo ? 'none' : 'translateZ(20px)' }}
                        isDarkMode={true}
                        priority={0}
                    />
                  )}
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
                              <div className="mb-4 opacity-90">
                                <span className="text-sm font-bold text-white tracking-wide">{template.author}</span>
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
                                active={true}
                                isDarkMode={true}
                                className="w-full !h-auto !min-h-[56px] !rounded-2xl"
                            >
                                <span className="text-lg px-4">{t('use_template') || '使用此模板'}</span>
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

ImagePreviewModal.displayName = 'ImagePreviewModal';

export default ImagePreviewModal;
