import React from 'react';

const VIDEO_FEATURE_ENABLED = import.meta.env.VITE_VIDEO_ENABLED === 'true';
import { Link, useLocation } from 'react-router-dom';
import { AppStoreIcon } from './icons/AppStoreIcon';
import { FlaskIcon } from './icons/FlaskIcon';
import { GithubIcon } from './icons/GithubIcon';
import { HomeIcon } from './icons/HomeIcon';
import { ListIcon } from './icons/ListIcon';
import { VideoIcon } from './icons/VideoIcon';
import { OrderIcon } from './icons/OrderIcon';
import { RefreshIcon } from './icons/RefreshIcon';
import { TranslateIcon } from './icons/TranslateIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import { SunDimIcon } from './icons/SunDimIcon';
import { SunMoonIcon } from './icons/SunMoonIcon';
import { MoonIcon } from './icons/MoonIcon';
// import { CoffeeIcon } from './icons/CoffeeIcon';
import { Tooltip } from './Tooltip';
import { openExternalLink } from '../utils/platform';
// import SponsorModal from './modals/SponsorModal';

/**
 * Sidebar 组件 - 通用侧边导航栏
 */
export const Sidebar = ({
  activeTab = 'home', // 'home' | 'detail' | 'settings'
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
  const location = useLocation();
  // const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  // 统一的容器样式
  // TODO: 渐变填充和描边暂时设为透明，保留结构以便后续调整
  const containerStyle = isDarkMode ? {
    width: '62px',
    height: '100%',
    borderRadius: '16px',
    border: '1px solid transparent',
    background: 'transparent',
    // 原渐变样式 (暂时禁用)
    // backgroundImage: 'linear-gradient(180deg, #3B3B3B 0%, #242120 100%), linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)',
    // backgroundOrigin: 'border-box',
    // backgroundClip: 'padding-box, border-box',
  } : {
    width: '62px',
    height: '100%',
    borderRadius: '16px',
    border: '1px solid transparent',
    background: 'transparent',
  };

  return (
    <aside 
      style={containerStyle}
      className="relative flex flex-col justify-between items-center py-1 mr-4 flex-shrink-0"
    >
      {/* 上部分：Logo + 导航按钮 */}
      <div className="flex flex-col items-center gap-5 w-full">
        {/* Logo */}
        <div>
          <img src="/Logo_icon.svg" alt="提示词填空器 (Prompt Fill) - AI 提示词管理工具" className="w-9 h-9" />
        </div>

        {/* 导航按钮组 */}
        <div className="flex flex-col items-center gap-4">
          <Tooltip content="主页" isDarkMode={isDarkMode}>
            <Link
              to="/explore"
              className={`p-2 group transition-colors block ${activeTab === 'home' ? (isDarkMode ? 'text-[#FB923C]' : 'text-[#EA580C]') : (isDarkMode ? 'text-[#8E9196]' : 'text-[#6B7280]')} hover:text-[#F97316]`}
            >
              <HomeIcon size={24} />
            </Link>
          </Tooltip>

          <Tooltip content="详情页" isDarkMode={isDarkMode}>
            <Link
              to="/detail"
              className={`p-2 group transition-colors block ${activeTab === 'detail' ? (isDarkMode ? 'text-[#FB923C]' : 'text-[#EA580C]') : (isDarkMode ? 'text-[#8E9196]' : 'text-[#6B7280]')} hover:text-[#F97316]`}
            >
              <ListIcon size={24} />
            </Link>
          </Tooltip>

          {VIDEO_FEATURE_ENABLED && (
            <Tooltip content="视频编辑" isDarkMode={isDarkMode}>
              <Link
                to="/video"
                className={`p-2 group transition-colors block ${location?.pathname?.startsWith('/video') ? (isDarkMode ? 'text-[#FB923C]' : 'text-[#EA580C]') : (isDarkMode ? 'text-[#8E9196]' : 'text-[#6B7280]')} hover:text-[#F97316]`}
              >
                <VideoIcon size={24} />
              </Link>
            </Tooltip>
          )}

          {import.meta.env.DEV && (
            <Tooltip content="UI Test" isDarkMode={isDarkMode}>
              <Link
                to="/ui-test"
                className={`p-2 group transition-colors block ${location?.pathname === '/ui-test' ? (isDarkMode ? 'text-[#FB923C]' : 'text-[#EA580C]') : (isDarkMode ? 'text-[#8E9196]' : 'text-[#6B7280]')} hover:text-[#F97316]`}
              >
                <FlaskIcon size={24} />
              </Link>
            </Tooltip>
          )}
          
          <div className="relative">
            <Tooltip content={t('sort')} isDarkMode={isDarkMode}>
              <button 
                onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
                className={`p-2 group transition-colors ${isSortMenuOpen ? (isDarkMode ? 'text-[#FB923C]' : 'text-[#EA580C]') : (isDarkMode ? 'text-[#8E9196]' : 'text-[#6B7280]')} hover:text-[#F97316]`}
              >
                <OrderIcon size={24} />
              </button>
            </Tooltip>
            
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

          <Tooltip content={t('refresh_desc')} isDarkMode={isDarkMode}>
            <button 
              onClick={onRefresh}
              className={`p-2 group transition-colors ${isDarkMode ? 'text-[#8E9196]' : 'text-[#6B7280]'} hover:text-[#F97316]`}
            >
              <RefreshIcon size={24} />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* 下部分：设置组 */}
      <div className="flex flex-col items-center gap-4 w-full">
        <Tooltip content={t('language')} isDarkMode={isDarkMode}>
          <button 
            onClick={() => setLanguage(language === 'cn' ? 'en' : 'cn')}
            className={`p-2 group transition-colors ${isDarkMode ? 'text-[#8E9196]' : 'text-[#6B7280]'} hover:text-[#F97316]`}
          >
            <TranslateIcon size={24} />
          </button>
        </Tooltip>

        <Tooltip content={themeMode === 'system' ? 'Follow System' : (themeMode === 'dark' ? 'Dark Mode' : 'Light Mode')} isDarkMode={isDarkMode}>
          <button 
            onClick={() => {
              if (themeMode === 'light') setThemeMode('dark');
              else if (themeMode === 'dark') setThemeMode('system');
              else setThemeMode('light');
            }}
            className={`p-2 group relative transition-colors ${isDarkMode ? 'text-[#8E9196]' : 'text-[#6B7280]'} hover:text-[#F97316]`}
          >
            {themeMode === 'system' ? (
              <SunMoonIcon size={24} />
            ) : (themeMode === 'dark' ? <MoonIcon size={24} /> : <SunDimIcon size={24} />)}
            
            {themeMode === 'system' && (
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
            )}
          </button>
        </Tooltip>

        <Tooltip content={t('settings')} isDarkMode={isDarkMode}>
          <Link
            to="/setting"
            className={`p-2 group transition-colors block ${activeTab === 'settings' ? (isDarkMode ? 'text-[#FB923C]' : 'text-[#EA580C]') : (isDarkMode ? 'text-[#8E9196]' : 'text-[#6B7280]')} hover:text-[#F97316]`}
          >
            <SettingsIcon size={24} />
          </Link>
        </Tooltip>

        <Tooltip content="App Store" isDarkMode={isDarkMode}>
          <button
            onClick={() => openExternalLink('https://apps.apple.com/cn/app/%E6%8F%90%E7%A4%BA%E8%AF%8D%E5%A1%AB%E7%A9%BA%E5%99%A8/id6758574801')}
            className={`p-2 transition-colors ${isDarkMode ? 'text-[#8E9196]' : 'text-[#6B7280]'} hover:text-[#F97316]`}
          >
            <AppStoreIcon size={24} />
          </button>
        </Tooltip>

        <Tooltip content="Github" isDarkMode={isDarkMode}>
          <button
            onClick={() => openExternalLink('https://github.com/TanShilongMario/PromptFill/')}
            className={`p-2 transition-colors ${isDarkMode ? 'text-[#8E9196]' : 'text-[#6B7280]'} hover:text-[#F97316]`}
          >
            <GithubIcon size={24} />
          </button>
        </Tooltip>

        {/* 捐赠按钮 - 暂时隐藏
        <Tooltip content={language === 'cn' ? '请我喝杯奶茶' : 'Buy me a bubble tea'} isDarkMode={isDarkMode}>
          <button
            onClick={() => setIsSponsorModalOpen(true)}
            className={`p-2 transition-colors ${isDarkMode ? 'text-[#8E9196]' : 'text-[#6B7280]'} hover:text-orange-500`}
          >
            <CoffeeIcon size={24} />
          </button>
        </Tooltip>
        */}
      </div>

      {/* 打赏弹窗 - 暂时隐藏
      <SponsorModal
        isOpen={isSponsorModalOpen}
        onClose={() => setIsSponsorModalOpen(false)}
        isDarkMode={isDarkMode}
        language={language}
      />
      */}
    </aside>
  );
};

