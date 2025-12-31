import React from 'react';
import { Github, Moon, Sun } from 'lucide-react';

/**
 * Sidebar 组件 - 通用侧边导航栏
 */
export const Sidebar = ({
  activeTab = 'home', // 'home' | 'details' | 'settings'
  onHome,
  onDetail,
  onSettings,
  // Sort props
  isSortMenuOpen,
  setIsSortMenuOpen,
  sortOrder,
  setSortOrder,
  setRandomSeed,
  // Actions
  onRefresh,
  // I18n
  language,
  setLanguage,
  // Theme
  isDarkMode,
  themeMode,
  setThemeMode,
  t
}) => {
  // 定义三种状态的颜色
  const COLORS = isDarkMode ? {
    NORMAL: '#8E9196',    // gray-400 equivalent but slightly adjusted
    HOVER: '#F97316',     // orange-500
    SELECTED: '#FB923C'   // orange-400
  } : {
    NORMAL: '#6B7280',    // gray-500
    HOVER: '#F97316',     // orange-500
    SELECTED: '#EA580C'   // orange-600
  };

  // 获取图标样式的辅助函数
  const getIconStyle = () => ({
    width: '24px',
    height: '24px',
    WebkitMaskImage: `var(--mask-url)`,
    maskImage: `var(--mask-url)`,
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
    filter: isDarkMode ? 'none' : 'drop-shadow(0px 2px 0px rgba(255, 255, 255, 0.5))',
    transition: 'all 0.3s ease'
  });

  // 统一的容器样式
  const containerStyle = isDarkMode ? {
    width: '62px',
    height: '100%',
    borderRadius: '16px',
    border: '1px solid transparent',
    backgroundImage: 'linear-gradient(180deg, #3B3B3B 0%, #242120 100%), linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)',
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
  } : {
    width: '62px',
    height: '100%',
    borderRadius: '16px',
    // 使用渐变背景 + 渐变描边技巧 (解决 border-radius 与 border-image 冲突)
    border: '1px solid transparent',
    backgroundImage: 'linear-gradient(180deg, #FAF5F1 0%, #F6EBE6 100%), linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)',
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
  };

  return (
    <aside 
      style={containerStyle}
      className="relative flex flex-col justify-between items-center py-8 mr-4 flex-shrink-0"
    >
      {/* 圣诞帽 - 仅限桌面端显示 */}
      <img 
        src="/XmasHat.png" 
        alt="Christmas Hat"
        className="hidden lg:block pointer-events-none z-[100]"
        style={{
          position: 'absolute',
          left: '-24px',
          top: '-28px',
          width: '60px',
          height: '45px',
          transform: 'rotate(-27.44deg)',
          opacity: 1,
        }}
      />
      
      {/* 上部分：Logo + 导航按钮 */}
      <div className="flex flex-col items-center gap-8 w-full">
        {/* Logo */}
        <div className="mt-4 mb-2">
          <img src="/Logo_icon.svg" alt="Logo" className="w-9 h-9" />
        </div>

        {/* 导航按钮组 */}
        <div className="flex flex-col items-center gap-6">
          <button 
            onClick={onHome}
            className="p-2 group"
            title="主页"
          >
            <div 
              style={{ '--mask-url': 'url(/home.svg)', ...getIconStyle() }}
              className={`group-hover:bg-[#F97316] ${activeTab === 'home' ? (isDarkMode ? 'bg-[#FB923C]' : 'bg-[#EA580C]') : (isDarkMode ? 'bg-[#8E9196]' : 'bg-[#6B7280]')}`}
            />
          </button>
          
          <button 
            onClick={onDetail}
            className="p-2 group"
            title="详情页"
          >
            <div 
              style={{ '--mask-url': 'url(/list.svg)', ...getIconStyle() }}
              className={`group-hover:bg-[#F97316] ${activeTab === 'details' ? (isDarkMode ? 'bg-[#FB923C]' : 'bg-[#EA580C]') : (isDarkMode ? 'bg-[#8E9196]' : 'bg-[#6B7280]')}`}
            />
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
              className="p-2 group"
              title={t('sort')}
            >
              <div 
                style={{ '--mask-url': 'url(/order.svg)', ...getIconStyle() }}
                className={`group-hover:bg-[#F97316] ${isSortMenuOpen ? (isDarkMode ? 'bg-[#FB923C]' : 'bg-[#EA580C]') : (isDarkMode ? 'bg-[#8E9196]' : 'bg-[#6B7280]')}`}
              />
            </button>
            
            {isSortMenuOpen && (
              <div className={`absolute left-full ml-4 bottom-0 backdrop-blur-xl rounded-2xl shadow-2xl border py-2 min-w-[160px] z-[110] animate-in slide-in-from-left-2 duration-200 ${isDarkMode ? 'bg-black/80 border-white/10' : 'bg-white/95 border-white/60'}`}>
                {[
                  { value: 'newest', label: t('sort_newest') },
                  { value: 'oldest', label: t('sort_oldest') },
                  { value: 'a-z', label: t('sort_az') },
                  { value: 'z-a', label: t('sort_za') },
                  { value: 'random', label: t('sort_random') }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortOrder(option.value);
                      if (option.value === 'random') setRandomSeed(Date.now());
                      setIsSortMenuOpen(false);
                    }}
                    className={`w-full text-left px-5 py-2.5 text-sm transition-colors ${sortOrder === option.value ? 'text-orange-600 font-semibold' : (isDarkMode ? 'text-gray-400 hover:bg-white/10' : 'text-gray-700 hover:bg-orange-50')}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={onRefresh}
            className="p-2 group"
            title={t('refresh_desc')}
          >
            <div 
              style={{ '--mask-url': 'url(/refresh.svg)', ...getIconStyle() }}
              className={`${isDarkMode ? 'bg-[#8E9196]' : 'bg-[#6B7280]'} group-hover:bg-[#F97316]`}
            />
          </button>
        </div>
      </div>

      {/* 下部分：设置组 */}
      <div className="flex flex-col items-center gap-6 w-full">
        <button 
          onClick={() => setLanguage(language === 'cn' ? 'en' : 'cn')}
          className="p-2 group"
          title={t('language')}
        >
          <div 
            style={{ '--mask-url': 'url(/translate.svg)', ...getIconStyle() }}
            className={`${isDarkMode ? 'bg-[#8E9196]' : 'bg-[#6B7280]'} group-hover:bg-[#F97316]`}
          />
        </button>

        <button 
          onClick={() => {
            if (themeMode === 'light') setThemeMode('dark');
            else if (themeMode === 'dark') setThemeMode('system');
            else setThemeMode('light');
          }}
          className="p-2 group relative"
          title={themeMode === 'system' ? 'Follow System' : (themeMode === 'dark' ? 'Dark Mode' : 'Light Mode')}
        >
          <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-400'} group-hover:text-[#F97316] transition-colors`}>
            {themeMode === 'system' ? (
              <div className="relative">
                <Sun size={24} className="opacity-50" />
                <Moon size={14} className="absolute -bottom-1 -right-1" />
              </div>
            ) : (themeMode === 'dark' ? <Moon size={24} /> : <Sun size={24} />)}
          </div>
          {themeMode === 'system' && (
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
          )}
        </button>
        
        <button 
          onClick={onSettings}
          className="p-2 group"
          title={t('settings')}
        >
          <div 
            style={{ '--mask-url': 'url(/setting.svg)', ...getIconStyle() }}
            className={`group-hover:bg-[#F97316] ${activeTab === 'settings' ? (isDarkMode ? 'bg-[#FB923C]' : 'bg-[#EA580C]') : (isDarkMode ? 'bg-[#8E9196]' : 'bg-[#6B7280]')}`}
          />
        </button>
        
        <a 
          href="https://github.com/TanShilongMario/PromptFill/" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`p-2 ${isDarkMode ? 'text-gray-500 hover:text-orange-400' : 'text-gray-400 hover:text-orange-600'} transition-colors`}
          title="Github"
        >
          <Github size={24} style={{ filter: isDarkMode ? 'none' : 'drop-shadow(0px 2px 0px rgba(255, 255, 255, 0.5))' }} />
        </a>
      </div>
    </aside>
  );
};

