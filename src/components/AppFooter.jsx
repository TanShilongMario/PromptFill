import React from 'react';
import { PanelLeft, PanelRight } from 'lucide-react';
import { openExternalLink } from '../utils/platform';
import { useRootContext } from '../context/RootContext';
import { Tooltip } from './Tooltip';

/**
 * PanelLeftRightDashed - 中间面板图标（Lucide 暂无此 icon，用自定义 SVG 替代）
 */
const PanelCenterIcon = ({ size = 24, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="9" y1="3" x2="9" y2="21" strokeDasharray="3 2" />
    <line x1="15" y1="3" x2="15" y2="21" strokeDasharray="3 2" />
  </svg>
);

/**
 * PanelToggleButton - 单个面板切换按钮
 */
const PanelToggleButton = ({ isVisible, onClick, icon: Icon, tooltip, isDarkMode }) => (
  <Tooltip content={tooltip} isDarkMode={isDarkMode}>
    <button
      onClick={onClick}
      className={`
        relative flex items-center justify-center w-7 h-7 rounded-lg
        transition-all duration-200 ease-out
        ${isVisible
          ? isDarkMode
            ? 'text-orange-400 bg-orange-500/15 hover:bg-orange-500/25 active:scale-95 active:bg-orange-500/30'
            : 'text-orange-600 bg-orange-500/12 hover:bg-orange-500/20 active:scale-95 active:bg-orange-500/25'
          : isDarkMode
            ? 'text-gray-500 hover:text-gray-300 hover:bg-white/8 active:scale-95 active:bg-white/12'
            : 'text-gray-400 hover:text-gray-600 hover:bg-black/6 active:scale-95 active:bg-black/10'
        }
      `}
    >
      <Icon size={15} strokeWidth={1.8} />
    </button>
  </Tooltip>
);

/**
 * AppFooter - 全局底部栏
 * 高度固定 42px，无描边与填充色
 * 左侧为面板控制按钮，右侧为作者信息
 */
export const AppFooter = ({ appVersion, isDarkMode: isDarkModeProp }) => {
  const {
    isDarkMode: isDarkModeCtx,
    isTagSidebarVisible,
    setIsTagSidebarVisible,
    isTemplatesSidebarVisible,
    setIsTemplatesSidebarVisible,
    isBanksSidebarVisible,
    setIsBanksSidebarVisible,
  } = useRootContext();

  const isDarkMode = isDarkModeProp ?? isDarkModeCtx;

  return (
    <footer
      className="flex-shrink-0 flex items-center justify-between px-4 relative z-20"
      style={{ height: '42px' }}
    >
      {/* 左侧：面板显隐控制按钮 */}
      <div className="flex items-center gap-1">
        <PanelToggleButton
          isVisible={isTagSidebarVisible}
          onClick={() => setIsTagSidebarVisible(v => !v)}
          icon={PanelLeft}
          tooltip={isTagSidebarVisible ? '隐藏分类栏' : '显示分类栏'}
          isDarkMode={isDarkMode}
        />
        <PanelToggleButton
          isVisible={isTemplatesSidebarVisible}
          onClick={() => setIsTemplatesSidebarVisible(v => !v)}
          icon={PanelCenterIcon}
          tooltip={isTemplatesSidebarVisible ? '隐藏模版列表' : '显示模版列表'}
          isDarkMode={isDarkMode}
        />
        <PanelToggleButton
          isVisible={isBanksSidebarVisible}
          onClick={() => setIsBanksSidebarVisible(v => !v)}
          icon={PanelRight}
          tooltip={isBanksSidebarVisible ? '隐藏词库栏' : '显示词库栏'}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* 右侧：作者信息 */}
      <div
        className={`flex items-center gap-2.5 text-[11px] font-medium opacity-50 hover:opacity-90 transition-opacity ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}
      >
        {appVersion && (
          <>
            <span className={`font-mono ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              v{appVersion}
            </span>
            <span className={`w-1 h-1 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-400'}`} />
          </>
        )}
        <span>Made by CornerStudio</span>
        <span className={`w-1 h-1 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-400'}`} />
        <span>公众号：角落工作室</span>
        <span className={`w-1 h-1 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-400'}`} />
        <span>Wechat: tanshilongmario</span>
        {/* App Store */}
        <button
          onClick={() => openExternalLink('https://apps.apple.com/cn/app/%E6%8F%90%E7%A4%BA%E8%AF%8D%E5%A1%AB%E7%A9%BA%E5%99%A8/id6758574801')}
          className={`ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full text-white transition-all duration-300 hover:scale-110 shadow-md ${
            isDarkMode ? 'bg-gray-700 hover:bg-orange-500' : 'bg-gray-700 hover:bg-orange-500'
          }`}
          title="App Store"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
        </button>
        {/* GitHub */}
        <button
          onClick={() => openExternalLink('https://github.com/TanShilongMario/PromptFill/')}
          className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-white transition-all duration-300 hover:scale-110 shadow-md ${
            isDarkMode ? 'bg-gray-700 hover:bg-orange-500' : 'bg-gray-700 hover:bg-orange-500'
          }`}
          title="GitHub"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </footer>
  );
};
