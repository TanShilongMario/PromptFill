import React from 'react';
import { Home, List, Edit3, Database } from 'lucide-react';

const MobileTabBar = ({ activeTab, onTabChange, t }) => {
  const tabs = [
    { id: 'home', icon: Home, label: t('home') || '首頁' },
    { id: 'templates', icon: List, label: t('templates') || '模板列表' },
    { id: 'editor', icon: Edit3, label: t('editor') || '模板編輯' },
    { id: 'banks', icon: Database, label: t('banks') || '詞庫' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 px-2 pb-safe z-[90] md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all duration-300 ${
                isActive ? 'text-orange-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className={`relative p-1.5 rounded-xl transition-all duration-300 ${
                isActive ? 'bg-orange-50 transform -translate-y-1' : ''
              }`}>
                <Icon size={isActive ? 22 : 20} strokeWidth={isActive ? 2.5 : 2} />
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-600 rounded-full animate-in zoom-in duration-300"></div>
                )}
              </div>
              <span className={`text-[10px] font-bold tracking-wide transition-all duration-300 ${
                isActive ? 'opacity-100 transform translate-y-0' : 'opacity-80'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileTabBar;
