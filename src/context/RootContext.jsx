import React, { createContext, useContext, useState, useEffect } from 'react';
import { useStickyState } from '../hooks';
import { getSystemLanguage } from '../utils';
import { TRANSLATIONS } from '../constants/translations';

const RootContext = createContext();

const APP_VERSION = "1.1.2";

export const RootProvider = ({ children }) => {
  const [language, setLanguage] = useStickyState(getSystemLanguage(), "app_language_v1");
  const [themeMode, setThemeMode] = useStickyState("system", "app_theme_mode_v1");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 面板显隐状态，持久化
  const [isTagSidebarVisible, setIsTagSidebarVisible] = useStickyState(true, "panel_tag_sidebar_v1");
  const [isTemplatesSidebarVisible, setIsTemplatesSidebarVisible] = useStickyState(true, "panel_templates_sidebar_v1");
  const [isBanksSidebarVisible, setIsBanksSidebarVisible] = useStickyState(true, "panel_banks_sidebar_v1");

  const t = (key, params = {}) => {
    let str = TRANSLATIONS[language]?.[key] || key;
    Object.keys(params).forEach(k => {
        str = str.replace(`{{${k}}}`, params[k]);
    });
    return str;
  };

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

  return (
    <RootContext.Provider value={{ 
      language, setLanguage, 
      themeMode, setThemeMode, 
      isDarkMode, t,
      appVersion: APP_VERSION,
      isTagSidebarVisible, setIsTagSidebarVisible,
      isTemplatesSidebarVisible, setIsTemplatesSidebarVisible,
      isBanksSidebarVisible, setIsBanksSidebarVisible,
    }}>
      {children}
    </RootContext.Provider>
  );
};

export const useRootContext = () => useContext(RootContext);
