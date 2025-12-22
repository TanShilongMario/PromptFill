import React, { useState, useEffect } from 'react';
import {
  ImageIcon, ArrowUpRight, LayoutGrid, RotateCcw,
  Globe, Settings, ArrowUpDown, Github
} from 'lucide-react';

/**
 * DiscoveryView 元件 - 瀑布流展示所有模板
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
  t,
  TAG_STYLES,
  displayTag,
  // Tools props
  handleRefreshSystemData,
  language,
  setLanguage,
  setIsSettingsOpen,
  isSortMenuOpen,
  setIsSortMenuOpen,
  sortOrder,
  setSortOrder,
  setRandomSeed
}) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  if (isMobile) {
    return (
      <div
        className="fixed inset-0 z-[100] flex flex-col overflow-y-auto pb-20"
        style={{
          backgroundImage: 'url(/background1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="flex flex-col w-full min-h-full px-5 py-8 gap-6">
          {/* 1. 頂部 SVG 標題區域 */}
          <div className="w-full flex justify-center px-4">
            <img
              src="/Title.svg"
              alt="Prompt Fill Logo"
              className="w-full max-w-[280px] h-auto"
            />
          </div>

          {/* 2. 動態文字區 */}
          <div className="w-full">
            <AnimatedSlogan isActive={true} />
          </div>

          {/* 3. 功能按鈕區域 */}
          <div className="flex items-center justify-center gap-4 py-2">
            <button
              onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 group-hover:bg-orange-50 transition-all">
                <ArrowUpDown size={20} className="text-gray-600 group-hover:text-orange-600" />
              </div>
              <span className="text-[10px] font-bold text-gray-500">排序</span>

              {isSortMenuOpen && (
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/60 py-2 min-w-[140px] z-[110] animate-in slide-in-from-top-2 duration-200">
                  {[
                    { value: 'newest', label: '最新優先' },
                    { value: 'oldest', label: '最舊優先' },
                    { value: 'a-z', label: 'A-Z' },
                    { value: 'z-a', label: 'Z-A' },
                    { value: 'random', label: '🎲 隨機排序' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSortOrder(option.value);
                        if (option.value === 'random') setRandomSeed(Date.now());
                        setIsSortMenuOpen(false);
                      }}
                      className={`w-full text-center px-4 py-2.5 text-xs hover:bg-orange-50 transition-colors ${sortOrder === option.value ? 'text-orange-600 font-bold' : 'text-gray-700'}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </button>

            <button
              onClick={() => setLanguage(language === 'zh-tw' ? 'en' : 'zh-tw')}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 group-hover:bg-orange-50 transition-all">
                <Globe size={20} className="text-gray-600 group-hover:text-orange-600" />
              </div>
              <span className="text-[10px] font-bold text-gray-500">{language === 'zh-tw' ? '中文' : 'English'}</span>
            </button>

            <button
              onClick={() => setIsSettingsOpen(true)}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 group-hover:bg-orange-50 transition-all">
                <Settings size={20} className="text-gray-600 group-hover:text-orange-600" />
              </div>
              <span className="text-[10px] font-bold text-gray-500">設定</span>
            </button>

            <button
              onClick={handleRefreshSystemData}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 group-hover:bg-orange-50 transition-all">
                <RotateCcw size={20} className="text-gray-600 group-hover:text-orange-600" />
              </div>
              <span className="text-[10px] font-bold text-gray-500">同步</span>
            </button>

            <a
              href="https://github.com/doggy8088/PromptFill"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 group"
            >
              <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 group-hover:bg-orange-50 transition-all">
                <Github size={20} className="text-gray-600 group-hover:text-gray-900" />
              </div>
              <span className="text-[10px] font-bold text-gray-500">GitHub</span>
            </a>
          </div>

          {/* 4. 圖像展示（單列） */}
          <div className="flex flex-col gap-6 mt-2">
            {filteredTemplates.map(t_item => (
              <div
                key={t_item.id}
                onClick={() => {
                  setActiveTemplateId(t_item.id);
                  setDiscoveryView(false);
                }}
                className="w-full bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 active:scale-[0.98] transition-all"
              >
                <div className="relative w-full bg-gray-50">
                  {t_item.imageUrl ? (
                    <img
                      src={t_item.imageUrl}
                      alt={t_item.name}
                      className="w-full h-auto block"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full aspect-[4/3] flex items-center justify-center text-gray-300">
                      <ImageIcon size={48} strokeWidth={1} />
                    </div>
                  )}
                  {/* Title Overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 pt-10">
                    <h3 className="text-white font-bold text-lg">{t_item.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#F3F4F6]"
      style={{
        backgroundImage: 'url(/background1.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Poster Content Container */}
      <div
        className="flex flex-col w-full h-full bg-white/40 border-2 border-white/60 shadow-[0_4px_10px_0_rgba(0,0,0,0.3)] backdrop-blur-[80px] overflow-hidden relative z-10 p-4 md:p-6 lg:p-9"
      >
          <div className="flex-1 flex flex-col lg:flex-row gap-8 lg:gap-20 overflow-hidden py-6 lg:py-10 px-4 lg:px-8">
              {/* Left Side: Logo & Slogan */}
              <div className="flex flex-col justify-center items-center lg:items-start lg:w-[380px] xl:w-[460px] flex-shrink-0 px-4 lg:pl-8 lg:pr-6 gap-8">
                  <div className="w-full max-w-[400px] scale-75 sm:scale-90 lg:scale-100 origin-center lg:origin-left">
                      <img
                          src="/Title.svg"
                          alt="Prompt Fill Logo"
                          className="w-full h-auto"
                      />
                  </div>
                  <AnimatedSlogan isActive={true} />
              </div>

              {/* Right Side: Waterfall Grid */}
              <div
                  ref={posterScrollRef}
                  className="flex-1 overflow-y-auto overflow-x-visible pr-4 lg:pr-8 scroll-smooth poster-scrollbar"
                  onMouseEnter={() => setIsPosterAutoScrollPaused(true)}
                  onMouseLeave={() => setIsPosterAutoScrollPaused(false)}
              >
                  <div className="h-full w-full py-8 lg:py-12 px-6 lg:px-12">
                      <div className={currentMasonryStyle.container}>
                          {filteredTemplates.map(t_item => (
                              <div
                                  key={t_item.id}
                                  onClick={() => {
                                      setActiveTemplateId(t_item.id);
                                      setDiscoveryView(false);
                                  }}
                                  className="break-inside-avoid cursor-pointer group mb-5 transition-all duration-500 relative overflow-hidden rounded-2xl isolate border-2 border-white hover:shadow-[0_0_25px_rgba(251,146,60,0.6)]"
                              >
                                  <div className="relative w-full overflow-hidden rounded-xl bg-gray-100">
                                      {t_item.imageUrl ? (
                                          <img
                                              src={t_item.imageUrl}
                                              alt={t_item.name}
                                              className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                              referrerPolicy="no-referrer"
                                              loading="lazy"
                                          />
                                      ) : (
                                          <div className="w-full aspect-[3/4] bg-gray-100 flex items-center justify-center text-gray-300">
                                              <ImageIcon size={32} />
                                          </div>
                                      )}

                                      {/* Hover Overlay: Bottom Glass Mask */}
                                      <div className="absolute inset-x-0 bottom-0 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-[opacity,transform] duration-500 ease-out z-20">
                                          <div className="backdrop-blur-md bg-white/40 border-t border-white/40 py-4 px-6 shadow-2xl">
                                              <p className="font-bold text-base leading-snug text-center text-gray-800">
                                                  {t_item.name}
                                              </p>
                                          </div>
                                      </div>

                                      {/* Floating Actions */}
                                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 flex gap-2 z-30 translate-y-[-10px] group-hover:translate-y-0">
                                          <button
                                              onClick={(e) => {
                                                  e.stopPropagation();
                                                  setZoomedImage(t_item.imageUrl);
                                              }}
                                              className="p-3 bg-white/20 text-white rounded-full hover:bg-white hover:text-gray-900 backdrop-blur-md transition-all duration-300 border border-white/30 shadow-lg"
                                              title="查看大圖"
                                          >
                                              <ArrowUpRight size={20} />
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          </div>

          {/* Bottom Bar: Tools & Author Info */}
          <div className="mt-auto flex items-center justify-between px-8 py-6 relative z-20">
              {/* Left: Tools */}
              <div className="flex items-center gap-3 p-2">

                  {/* Discovery View Toggle (Back to Editor) */}
                  <button
                      onClick={() => setDiscoveryView(false)}
                      className="p-2.5 rounded-xl transition-all text-gray-500 hover:text-orange-600 hover:bg-white/50 shadow-sm"
                      title="返回編輯器"
                  >
                      <LayoutGrid size={20} />
                  </button>

                  <div className="w-px h-6 bg-white/30" />

                  {/* Sort Menu Button */}
                  <div className="relative">
                      <button
                          onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
                          className="p-2.5 rounded-xl transition-all text-gray-500 hover:text-orange-600 hover:bg-white/50 shadow-sm"
                          title="排序"
                      >
                          <ArrowUpDown size={20} />
                      </button>
                      {isSortMenuOpen && (
                          <div className="absolute bottom-full mb-3 left-0 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/60 py-2 min-w-[160px] z-[100] animate-in slide-in-from-bottom-2 duration-200">
                              {[
                                  { value: 'newest', label: '最新優先' },
                                  { value: 'oldest', label: '最舊優先' },
                                  { value: 'a-z', label: 'A-Z' },
                                  { value: 'z-a', label: 'Z-A' },
                                  { value: 'random', label: '🎲 隨機排序' }
                              ].map(option => (
                                  <button
                                      key={option.value}
                                      onClick={() => {
                                          setSortOrder(option.value);
                                          if (option.value === 'random') setRandomSeed(Date.now());
                                          setIsSortMenuOpen(false);
                                      }}
                                      className={`w-full text-left px-5 py-2.5 text-sm hover:bg-orange-50 transition-colors ${sortOrder === option.value ? 'text-orange-600 font-semibold' : 'text-gray-700'}`}
                                  >
                                      {option.label}
                                  </button>
                              ))}
                          </div>
                      )}
                  </div>

                  <button
              onClick={() => setLanguage(language === 'zh-tw' ? 'en' : 'zh-tw')}
                      className="p-2.5 rounded-xl transition-all text-gray-500 hover:text-orange-600 hover:bg-white/50 shadow-sm flex items-center gap-1.5"
                  >
                      <Globe size={20} />
                      <span className="text-xs font-bold">{language.toUpperCase()}</span>
                  </button>

                  <button
                      onClick={() => setIsSettingsOpen(true)}
                      className="p-2.5 rounded-xl transition-all text-gray-500 hover:text-orange-600 hover:bg-white/50 shadow-sm"
                      title={t('settings')}
                  >
                      <Settings size={20} />
                  </button>

                  <button
                      onClick={handleRefreshSystemData}
                      className="p-2.5 rounded-xl transition-all text-gray-500 hover:text-orange-600 hover:bg-white/50 shadow-sm"
                      title={t('refresh_desc')}
                  >
                      <RotateCcw size={20} />
                  </button>
              </div>

              {/* Right: GitHub Link */}
              <div className="flex flex-col items-end gap-1.5 transition-opacity px-4 py-2">
                  <a
                      href="https://github.com/doggy8088/PromptFill"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl transition-all text-gray-500 hover:text-gray-900 hover:bg-white/50 shadow-sm flex items-center gap-2"
                      title="GitHub Repository"
                  >
                      <Github size={20} />
                  </a>
              </div>
          </div>
      </div>
    </div>
  );
});

DiscoveryView.displayName = 'DiscoveryView';
