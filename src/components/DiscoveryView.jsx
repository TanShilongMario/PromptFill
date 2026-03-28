import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ImageIcon, ArrowUpRight, Search, Plus, Play, ChevronDown, ChevronUp
} from 'lucide-react';
import { getLocalized } from '../utils/helpers';
import { PremiumButton } from './PremiumButton';
import { Sidebar } from './Sidebar';
import { TagSidebar } from './TagSidebar';
import { useRootContext } from '../context/RootContext';
import { TemplateCarousel } from './TemplateCarousel';
import { MobileVideoFirstFrame } from './mobile';
import { OptimizedImage } from './OptimizedImage';
import { useResolvedFolderMediaSrc } from '../context/FolderStorageContext';
import { TAG_LABELS } from '../constants/styles';
import { openExternalLink } from '../utils/platform';

/**
 * FuCharacter 组件 - 可交互的福字
 * hover 时轻微晃动，点击旋转180度并显示祝福语
 */

/**
 * VideoCard 组件 - 瀑布流中的视频卡片
 * 默认显示封面图（或视频首帧），hover 时自动播放视频
 */
const VideoCard = React.memo(({ videoUrl, imageUrl, alt }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);
  const { displaySrc: resolvedVideo, failed: videoBroken } = useResolvedFolderMediaSrc(videoUrl || '');
  const videoPlaySrc = videoBroken ? '' : resolvedVideo;

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    const vid = videoRef.current;
    if (vid) {
      vid.currentTime = 0;
      vid.play().catch(() => {});
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    const vid = videoRef.current;
    if (vid) {
      vid.pause();
      vid.currentTime = 0;
    }
  }, []);

  return (
    <div
      className="relative w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 封面图层 - hover 时淡出 */}
      {imageUrl && (
        <OptimizedImage
          src={imageUrl}
          alt={alt}
          className={`w-full h-auto object-cover transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
          referrerPolicy="no-referrer"
          priority={5}
        />
      )}
      {/* 视频层 - 始终存在，hover 时显示 */}
      <video
        ref={videoRef}
        src={videoPlaySrc || ''}
        className={`w-full h-auto object-cover ${imageUrl ? 'absolute inset-0 w-full h-full' : ''} transition-opacity duration-300 ${imageUrl && !isHovered ? 'opacity-0' : 'opacity-100'}`}
        muted
        playsInline
        preload="metadata"
        loop
      />
    </div>
  );
});
VideoCard.displayName = 'VideoCard';

/**
 * DiscoveryView 组件 - 瀑布流展示所有模板
 */
export const DiscoveryView = React.memo(({ 
  filteredTemplates,
  setActiveTemplateId,
  setDiscoveryView,
  setZoomedImage,
  posterScrollRef,
  setIsPosterAutoScrollPaused,
  currentMasonryStyle,
  AnimatedSlogan,
  isSloganActive = true,
  t,
  TAG_STYLES,
  displayTag,
  // Tools props
  handleRefreshSystemData,
  language,
  setLanguage,
  setIsSettingsOpen,
  isDarkMode,
  isSortMenuOpen,
  setIsSortMenuOpen,
  sortOrder,
  setSortOrder,
    setRandomSeed,
    searchQuery,
    setSearchQuery,
    globalContainerStyle,
    masonryStyleKey,
    themeMode,
    setThemeMode,
    templates,
    selectedTags,
    setSelectedTags,
    selectedLibrary,
    setSelectedLibrary,
    selectedType,
    setSelectedType,
    handleAddTemplate,
    TEMPLATE_TAGS,
    availableTags,
  }) => {
    const { isTagSidebarVisible } = useRootContext();
    const [columnCount, setColumnCount] = useState(1);
    const [columnGap, setColumnGap] = useState(20); // Default to gap-5 (20px)
    const [isMobileTagsExpanded, setIsMobileTagsExpanded] = useState(false); // 手机端顶栏标签行默认折叠
  
    useEffect(() => {
      const getColumnInfo = () => {
        const width = window.innerWidth;
        const isVideoType = selectedType === 'video';
        
        if (masonryStyleKey === 'poster') {
          // 视频类型下桌面端改为 2 列，避免横屏视频太小
          const count = width >= 1280 ? (isVideoType ? 2 : 3) : (width >= 640 ? 2 : 1);
          return { count, gap: 12 };
        } else if (masonryStyleKey === 'classic' || masonryStyleKey === 'minimal') {
          // 视频类型下桌面端也限制在 2 列
          const count = width >= 1280 ? (isVideoType ? 2 : 4) : (width >= 1024 ? (isVideoType ? 2 : 3) : (width >= 640 ? 2 : 1));
          return { count, gap: 16 };
        } else if (masonryStyleKey === 'compact') {
          // 视频类型下桌面端也限制在 2 列
          const count = width >= 1280 ? (isVideoType ? 2 : 5) : (width >= 1024 ? (isVideoType ? 2 : 4) : (width >= 640 ? (isVideoType ? 2 : 3) : 2));
          return { count, gap: 8 };
        } else if (masonryStyleKey === 'list') {
          return { count: 1, gap: 12 };
        }
        return { count: 1, gap: 12 };
      };
  
      const handleResize = () => {
        const info = getColumnInfo();
        setColumnCount(info.count);
        setColumnGap(info.gap);
      };
  
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [masonryStyleKey, selectedType]);
  
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  if (isMobile) {
    // ... 保持移动端逻辑不变
    return (
      <main
        className={`fixed inset-0 z-10 flex flex-col overflow-y-auto overflow-x-hidden pb-32 md:pb-20 ${isDarkMode ? 'dark-gradient-bg' : 'mesh-gradient-bg'}`}
      >
        {/* 顶部固定毛玻璃导航栏 - 全局最上层 */}
        <div className={`fixed top-0 left-0 right-0 z-[100] pointer-events-none transition-[height] duration-200 ${isMobileTagsExpanded ? 'h-40' : 'h-24'}`}>
          {/* 渐进式背景模糊层 */}
          <div 
            className="absolute inset-0"
            style={{
              background: isDarkMode 
                ? 'linear-gradient(180deg, rgba(24, 23, 22, 0.9) 0%, rgba(24, 23, 22, 0.5) 50%, rgba(24, 23, 22, 0) 100%)'
                : 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%)',
              backdropFilter: 'blur(30px) saturate(180%)',
              WebkitBackdropFilter: 'blur(30px) saturate(180%)',
              maskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)'
            }}
          />
          {/* 内容区域 - 类型行 + 可折叠标签行 */}
          <div className="relative pt-safe pointer-events-auto overflow-hidden">
            {/* 最上层级：全部/图片/视频（无底色，选中底部小圆点）+ 右侧折叠按钮 */}
            <div className="flex px-4 sm:px-6 gap-4 h-12 items-center justify-between">
              <div className="flex gap-6 items-center">
                {[
                  { id: 'all', cn: '全部', en: 'All' },
                  { id: 'image', cn: '图片', en: 'Image' },
                  { id: 'video', cn: '视频', en: 'Video' }
                ].map(type => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`flex-shrink-0 text-[15px] font-bold transition-all duration-300 relative ${
                      selectedType === type.id
                        ? 'text-orange-500 scale-105'
                        : (isDarkMode ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black')
                    }`}
                  >
                    {language === 'cn' ? type.cn : type.en}
                    {selectedType === type.id && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full" />
                    )}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setIsMobileTagsExpanded(prev => !prev)}
                className={`flex-shrink-0 p-2 -mr-2 rounded-full transition-colors ${isDarkMode ? 'text-white/60 hover:text-white/90' : 'text-black/50 hover:text-black/80'}`}
                aria-label={isMobileTagsExpanded ? (language === 'cn' ? '收起标签' : 'Collapse tags') : (language === 'cn' ? '展开标签' : 'Expand tags')}
              >
                {isMobileTagsExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>
            {/* 标签选项行 - 可折叠 */}
            {isMobileTagsExpanded && (
              <div className="flex overflow-x-auto no-scrollbar px-4 sm:px-6 gap-6 scroll-smooth h-12 items-center">
                <button
                  onClick={() => setSelectedTags("")}
                  className={`flex-shrink-0 text-[15px] font-bold transition-all duration-300 relative ${
                    selectedTags === ""
                      ? 'text-orange-500 scale-105'
                      : (isDarkMode ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black')
                  }`}
                >
                  {language === 'cn' ? '全部' : 'All'}
                  {selectedTags === "" && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full" />
                  )}
                </button>
                {(availableTags || TEMPLATE_TAGS).map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTags(tag)}
                    className={`flex-shrink-0 text-[15px] font-bold transition-all duration-300 relative ${
                      selectedTags === tag
                        ? 'text-orange-500 scale-105'
                        : (isDarkMode ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black')
                    }`}
                  >
                    {TAG_LABELS[language]?.[tag] || tag}
                    {selectedTags === tag && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 轮播图区域 - 只从下方有效结果中取（与瀑布流一致：全部/图片/视频+标签） */}
        <div className="w-full">
          <TemplateCarousel
            templates={filteredTemplates}
            language={language}
            isDarkMode={isDarkMode}
            setZoomedImage={setZoomedImage}
          />
        </div>

        {/* 图像展示区域（两列瀑布流） */}
        <div className="flex flex-col w-full px-2 py-4 gap-4">
          <section className="columns-2 gap-1">
            {filteredTemplates.map(t_item => (
              <article
                key={t_item.id}
                onClick={() => {
                  if (t_item.imageUrl) {
                    setZoomedImage(t_item.imageUrl);
                  } else if (t_item.type === 'video' && t_item.videoUrl) {
                    setZoomedImage(t_item.videoUrl);
                  } else {
                    setActiveTemplateId(t_item.id);
                    setDiscoveryView(false);
                  }
                }}
                className={`break-inside-avoid mb-1 w-full rounded-lg overflow-hidden shadow-sm border active:scale-[0.98] transition-all ${isDarkMode ? 'bg-[#2A2726] border-white/5' : 'bg-white border-gray-100'}`}
              >
                {/* min-h-px：避免 img 未解码前高度为 0 时与懒加载/Intersection 叠加导致永不拉取 */}
                <div className="relative w-full min-h-px bg-gray-50/5">
                  {t_item.imageUrl ? (
                    <OptimizedImage
                      src={t_item.imageUrl}
                      alt={getLocalized(t_item.name, language)}
                      className="w-full h-auto block"
                      referrerPolicy="no-referrer"
                      priority={10}
                      isDarkMode={isDarkMode}
                    />
                  ) : t_item.type === 'video' && t_item.videoUrl ? (
                    <MobileVideoFirstFrame
                      videoUrl={t_item.videoUrl}
                      alt={getLocalized(t_item.name, language)}
                      className="w-full h-auto block"
                    />
                  ) : (
                    <div className="w-full aspect-[4/3] flex items-center justify-center text-gray-300">
                      <ImageIcon size={48} strokeWidth={1} />
                    </div>
                  )}

                  {/* Video Indicator */}
                  {t_item.type === 'video' && (
                    <div className="absolute top-2 right-2 z-10 bg-black/50 backdrop-blur-md rounded-full p-1.5 text-white shadow-lg border border-white/10">
                      <Play size={12} fill="currentColor" />
                    </div>
                  )}

                  {/* Title Overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 pt-6 rounded-b-lg">
                    <h3 className="text-white font-bold text-[10px] truncate">{getLocalized(t_item.name, language)}</h3>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>
    );
  }

  return (
    <main
      className="flex-1 flex items-stretch gap-4 overflow-hidden"
    >
      {/* Middle Side: Categories Sidebar (Desktop Only, 受面板显隐控制) */}
      {isTagSidebarVisible && (
        <TagSidebar
          TEMPLATE_TAGS={TEMPLATE_TAGS}
          availableTags={availableTags}
          selectedTags={selectedTags}
          selectedLibrary={selectedLibrary}
          selectedType={selectedType}
          setSelectedTags={setSelectedTags}
          setSelectedLibrary={setSelectedLibrary}
          setSelectedType={setSelectedType}
          isDarkMode={isDarkMode}
          language={language}
        />
      )}

      {/* Poster Content Container */}
      <div 
        style={globalContainerStyle}
        className="flex-1 flex flex-col overflow-hidden relative z-10 p-4 md:p-5 lg:pt-12 lg:pb-7 lg:px-7"
      >
          <div className="flex-1 flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-12 overflow-hidden pb-4 lg:pb-8 pt-0 px-2 lg:px-6">
              {/* Left Side: Logo & Slogan & Create Button */}
              <header className="flex flex-col justify-between items-center lg:items-start lg:w-[280px] xl:w-[320px] flex-shrink-0 px-4 lg:pl-6 lg:pr-2 lg:py-6">
                  {/* 区块1: Logo + 描述 + Slogan */}
                  <div className="flex flex-col items-center lg:items-start gap-6 w-full">
                      <div className="w-full max-w-[320px] scale-75 sm:scale-85 lg:scale-90 xl:scale-100 origin-center lg:origin-left flex flex-col gap-3">
                          <h1 className="sr-only">提示词填空器 (Prompt Fill) - 专业的 AI 提示词管理与优化工具</h1>
                          <img
                              src={isDarkMode ? "/icons/Title_Dark.svg" : "/icons/Title.svg"}
                              alt="提示词填空器 (Prompt Fill) - 专业的 AI 提示词管理与优化工具"
                              className="w-full h-auto"
                          />
                          <p className={`text-xs lg:text-sm font-medium leading-relaxed opacity-80 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            提示词填空器 (Prompt Fill) 是一款专业的 AI 提示词管理工具，支持模版化、变量填充及一键优化。
                          </p>
                      </div>
                      <div className="w-full scale-90 lg:scale-95 xl:scale-100 origin-center lg:origin-left min-h-[80px]">
                        <AnimatedSlogan isActive={isSloganActive} language={language} isDarkMode={isDarkMode} />
                      </div>
                  </div>
                  {/* 新建模版按钮 - 贴底，与瀑布流底部对齐 */}
                  <div className="w-full flex-shrink-0 translate-y-6">
                      <PremiumButton
                          onClick={handleAddTemplate}
                          icon={Plus}
                          active={true}
                          isDarkMode={isDarkMode}
                          className="w-full size-lg"
                      >
                          {t('new_template')}
                      </PremiumButton>
                  </div>
              </header>

              {/* Right Side: Waterfall Grid */}
              <section 
                  ref={posterScrollRef}
                  className="flex-1 overflow-y-auto overflow-x-visible pr-2 lg:pr-4 scroll-smooth poster-scrollbar will-change-scroll"
                  onMouseEnter={() => setIsPosterAutoScrollPaused(true)}
                  onMouseLeave={() => setIsPosterAutoScrollPaused(false)}
              >
                  <div className="h-full w-full py-4 lg:py-6 px-2 lg:px-4">
                      <div className={`flex w-full ${masonryStyleKey === 'list' ? 'flex-col' : ''}`} style={{ gap: `${columnGap}px` }}>
                          {Array.from({ length: columnCount }).map((_, colIndex) => (
                              <div key={colIndex} className="flex-1 flex flex-col" style={{ gap: `${columnGap}px` }}>
                                  {filteredTemplates
                                      .filter((_, index) => index % columnCount === colIndex)
                                      .map(t_item => (
                                          <article 
                                              key={t_item.id}
                                              onClick={() => {
                                                  if (t_item.imageUrl) {
                                                      setZoomedImage(t_item.imageUrl);
                                                  } else if (t_item.type === 'video' && t_item.videoUrl) {
                                                      setZoomedImage(t_item.videoUrl);
                                                  } else {
                                                      setActiveTemplateId(t_item.id);
                                                      setDiscoveryView(false);
                                                  }
                                              }}
                                              className={`cursor-pointer group transition-shadow duration-300 relative overflow-hidden rounded-xl isolate border-2 hover:shadow-[0_0_15px_rgba(251,146,60,0.35)] will-change-transform ${isDarkMode ? 'border-white/10' : 'border-white'}`}
                                          >
                                              <div className={`relative w-full min-h-px overflow-hidden rounded-lg ${isDarkMode ? 'bg-[#2A2726]' : 'bg-gray-100'}`} style={{ transform: 'translateZ(0)' }}>
                                                  {t_item.type === 'video' && t_item.videoUrl ? (
                                                      <VideoCard
                                                          videoUrl={t_item.videoUrl}
                                                          imageUrl={t_item.imageUrl}
                                                          alt={getLocalized(t_item.name, language)}
                                                      />
                                                  ) : t_item.imageUrl ? (
                                                      <OptimizedImage
                                                          src={t_item.imageUrl} 
                                                          alt={getLocalized(t_item.name, language)} 
                                                          className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                                                          referrerPolicy="no-referrer"
                                                          priority={15}
                                                          isDarkMode={isDarkMode}
                                                      />
                                                  ) : (
                                                  <div className="w-full aspect-[3/4] bg-gray-100/5 flex items-center justify-center text-gray-300">
                                                      <ImageIcon size={32} />
                                                  </div>
                                              )}
                                              
                                              {/* Video Indicator - Desktop */}
                                              {t_item.type === 'video' && (
                                                <div className="absolute top-3 right-3 z-10 bg-black/40 backdrop-blur-md rounded-full p-2 text-white shadow-xl border border-white/10 opacity-80 group-hover:opacity-100 transition-opacity">
                                                  <Play size={14} fill="currentColor" />
                                                </div>
                                              )}
                                              
                                              {/* Hover Overlay: Bottom Glass Mask */}
                                              <div className="absolute inset-x-0 bottom-0 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-[opacity,transform] duration-500 ease-out z-20 rounded-b-xl overflow-hidden">
                                                  <div className={`backdrop-blur-md border-t py-4 px-6 shadow-2xl rounded-b-xl ${isDarkMode ? 'bg-black/60 border-white/10' : 'bg-white/40 border-white/40'}`}>
                                                      <h3 className={`font-bold text-base leading-snug text-center ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                                          {getLocalized(t_item.name, language)}
                                                      </h3>
                                                  </div>
                                              </div>
                                          </div>
                                      </article>
                                  ))}
                              </div>
                          ))}
                      </div>
                  </div>
              </section>
          </div>

      </div>
    </main>
  );
});

DiscoveryView.displayName = 'DiscoveryView';
