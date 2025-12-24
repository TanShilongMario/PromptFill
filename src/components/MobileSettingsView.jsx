import React from 'react';
import { 
  Settings, Globe, Database, Download, Upload, 
  RotateCcw, Trash2, Mail, MessageCircle, Github, 
  ChevronRight, RefreshCw, FileText, Info
} from 'lucide-react';

export const MobileSettingsView = ({ 
  language, setLanguage, 
  storageMode, setStorageMode,
  handleImportTemplate, handleExportAllTemplates,
  handleCompleteBackup, handleImportAllData,
  handleResetSystemData, handleClearAllData,
  SYSTEM_DATA_VERSION, t 
}) => {
  
  // 精簡後的更新說明 (Localization supported via content structure if needed, but here we use current lang)
  const updateLogs = language === 'zh-tw' ? [
    { version: 'V0.5.1', date: '2025-12-22', content: '全新行動端互動架構，引入側滑抽屜與沉浸式圖片預覽；首頁引入 Mesh Gradient 徹底根治閃爍。' },
    { version: 'V0.5.0', date: '2025-12-20', content: '深度架構重構，引入發現頁瀑布流；匯出功能增強，效能大幅提升。' },
    { version: 'V0.4.1', date: '2025-12-12', content: '匯出格式優化為 JPG；新增自動提取氛圍色背景；行動端匯入體驗優化。' },
  ] : [
    { version: 'V0.5.1', date: '2025-12-22', content: 'New mobile architecture with drawers and immersive preview; Mesh Gradient for smooth UI.' },
    { version: 'V0.5.0', date: '2025-12-20', content: 'Major refactor with discovery view masonry; improved export and performance.' },
    { version: 'V0.4.1', date: '2025-12-12', content: 'JPG export support; auto atmosphere background; mobile import UX improvements.' },
  ];

  const SettingSection = ({ title, icon: Icon, children }) => (
    <div className="mb-8 px-6">
      <div className="flex items-center gap-2 mb-4 opacity-40">
        <Icon size={14} strokeWidth={2.5} />
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">{title}</h3>
      </div>
      <div className="bg-white/50 backdrop-blur-md rounded-3xl border border-white/60 overflow-hidden shadow-sm">
        {children}
      </div>
    </div>
  );

  const SettingItem = ({ icon: Icon, label, value, onClick, disabled = false, danger = false }) => (
    <button 
      disabled={disabled}
      onClick={onClick}
      className={`w-full flex items-center justify-between px-5 py-4 transition-all border-b border-gray-100/50 last:border-0 ${disabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/50 active:bg-white/80'}`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-xl ${danger ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-600'}`}>
          <Icon size={18} />
        </div>
        <span className={`text-sm font-bold ${danger ? 'text-red-500' : 'text-gray-700'}`}>{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className="text-xs font-medium text-gray-400">{value}</span>}
        {!disabled && <ChevronRight size={14} className="text-gray-300" />}
      </div>
    </button>
  );

  return (
    <div className="flex-1 overflow-y-auto pb-32 bg-white">
      <div className="pt-12 pb-8 px-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">{t('settings')}</h1>
        <p className="text-xs text-gray-400 font-medium mt-1 uppercase tracking-widest">{t('template_subtitle')}</p>
      </div>

      {/* 1. 系統設定 */}
      <SettingSection title={t('general_settings')} icon={Settings}>
        <SettingItem 
          icon={Globe} 
          label={t('language')} 
          value={language === 'zh-tw' ? '繁體中文' : 'English'} 
          onClick={() => setLanguage(language === 'zh-tw' ? 'en' : 'zh-tw')}
        />
        <SettingItem 
          icon={Database} 
          label={t('storage_mode')} 
          value={t('use_browser_storage')} 
          disabled={true} // 行動端暫不支援本機資料夾
        />
      </SettingSection>

      {/* 2. 資料管理 */}
      <SettingSection title={t('data_management')} icon={RefreshCw}>
        <div className="w-full">
          <label className="block cursor-pointer">
            <input type="file" accept=".json" onChange={handleImportTemplate} className="hidden" />
            <div className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/50 active:bg-white/80 transition-all border-b border-gray-100/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gray-50 text-gray-600">
                  <Download size={18} />
                </div>
                <span className="text-sm font-bold text-gray-700">{t('import_template')}</span>
              </div>
              <ChevronRight size={14} className="text-gray-300" />
            </div>
          </label>
          <SettingItem icon={Upload} label={t('export_all_templates')} onClick={handleExportAllTemplates} />
          <SettingItem icon={RefreshCw} label={t('refresh_system')} onClick={handleResetSystemData} />
          <SettingItem icon={Trash2} label={t('clear_all_data')} onClick={handleClearAllData} danger={true} />
        </div>
      </SettingSection>

      {/* 3. 更新日誌 */}
      <SettingSection title={t('what_is_new')} icon={FileText}>
        <div className="p-5 space-y-6">
          {updateLogs.map((log, idx) => (
            <div key={idx} className="relative pl-4 border-l-2 border-orange-100">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black text-orange-500">{log.version}</span>
                <span className="text-[10px] font-medium text-gray-300 tabular-nums">{log.date}</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">{log.content}</p>
            </div>
          ))}
        </div>
      </SettingSection>

      {/* 4. 關於與聯絡 */}
      <SettingSection title={t('connect_author')} icon={Info}>
        <SettingItem 
          icon={Github} 
          label={t('github_link')} 
          onClick={() => window.open('https://github.com/doggy8088/PromptFill', '_blank')}
        />
      </SettingSection>

      <div className="text-center pb-8 opacity-20">
        <p className="text-[10px] font-black tracking-[0.3em] uppercase">Prompt Fill V0.5.1</p>
        <a 
          className="text-[9px] font-bold mt-1 inline-flex items-center gap-1 text-gray-600 hover:text-orange-500 transition-colors"
          href="https://github.com/doggy8088/PromptFill"
          target="_blank"
          rel="noopener noreferrer"
          title={t('github_link')}
        >
        </a>
      </div>
    </div>
  );
};
