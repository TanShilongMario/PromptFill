import React from 'react';
import {
  LayoutGrid,
  FileText,
  Search,
  RotateCcw,
  Globe,
  Settings,
  ChevronRight,
  ChevronDown,
  ImageIcon,
  ArrowUpRight,
  Plus,
  Pencil,
  Copy as CopyIcon,
  Download,
  Trash2,
  ArrowUpDown,
  Home,
  Github,
  Toolbox,
  Banana,
} from 'lucide-react';
import { PremiumButton } from './PremiumButton';
import { getLocalized } from '../utils/helpers';

/**
 * TemplatesSidebar 元件 - 負責展示左側模板清單
 */
export const TemplatesSidebar = React.memo(
  ({
    mobileTab,
    isTemplatesDrawerOpen,
    setIsTemplatesDrawerOpen,
    setDiscoveryView,
    activeTemplateId,
    setActiveTemplateId,
    filteredTemplates,
    searchQuery,
    setSearchQuery,
    selectedTags,
    setSelectedTags,
    TEMPLATE_TAGS,
    displayTag,
    handleRefreshSystemData,
    language,
    setLanguage,
    setIsSettingsOpen,
    t,
    isSortMenuOpen,
    setIsSortMenuOpen,
    sortOrder,
    setSortOrder,
    setRandomSeed,
    handleResetTemplate,
    startRenamingTemplate,
    handleDuplicateTemplate,
    handleExportTemplate,
    handleDeleteTemplate,
    handleAddTemplate,
    INITIAL_TEMPLATES_CONFIG,
    editingTemplateNameId,
    tempTemplateName,
    setTempTemplateName,
    tempTemplateAuthor,
    setTempTemplateAuthor,
    saveTemplateName,
    setEditingTemplateNameId,
  }) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    return (
      <>
        {/* Mobile Overlay */}
        {isMobile && isTemplatesDrawerOpen && (
          <div
            className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-[290] animate-in fade-in duration-300"
            onClick={() => setIsTemplatesDrawerOpen(false)}
          />
        )}

        <div
          className={`
        ${
          isMobile
            ? `fixed inset-y-0 left-0 z-[300] w-[75%] max-w-[320px] transform transition-transform duration-500 ease-out shadow-2xl ${isTemplatesDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`
            : 'relative md:flex flex-col flex-shrink-0 h-full w-[380px] border-r border-gray-200'
        }
        flex bg-white overflow-hidden
        ${!isMobile && mobileTab !== 'editor' && mobileTab !== 'banks' ? 'hidden md:flex' : ''}
      `}
        >
          <div className="flex flex-col w-full h-full">
            {/* --- Sidebar Header with Tools --- */}
            <div className="flex-shrink-0 p-5 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between mb-3">
                <div className="flex flex-row items-baseline gap-2">
                  <h1 className="font-bold tracking-tight text-sm text-orange-500">
                    提示詞填空器
                    <span className="text-gray-400 text-xs font-normal ml-1">V0.5.1</span>
                  </h1>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Discovery View Toggle (Home button) */}
                  <button
                    onClick={() => setDiscoveryView(true)}
                    className="p-1.5 rounded-lg transition-all text-orange-500 bg-orange-50/50 hover:text-orange-600 hover:bg-orange-100 shadow-sm"
                    title={t('back_to_discovery')}
                  >
                    <Home size={18} />
                  </button>

                  <button
                    onClick={handleRefreshSystemData}
                    className="p-1.5 rounded-lg transition-colors text-gray-400 hover:text-orange-600 hover:bg-orange-50"
                    title={t('refresh_desc')}
                  >
                    <RotateCcw size={16} />
                  </button>

                  {/* Sort Menu Button */}
                  <div className="relative">
                    <button
                      onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
                      className="p-1.5 rounded-lg transition-colors text-gray-400 hover:text-orange-600 hover:bg-orange-50"
                      title={t('sort')}
                    >
                      <ArrowUpDown size={16} />
                    </button>
                    {isSortMenuOpen && (
                      <div className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[140px] z-[100]">
                        {[
                          { value: 'newest', label: t('sort_newest') },
                          { value: 'oldest', label: t('sort_oldest') },
                          { value: 'a-z', label: t('sort_az') },
                          { value: 'z-a', label: t('sort_za') },
                          { value: 'random', label: t('sort_random') },
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setSortOrder(option.value);
                              if (option.value === 'random') setRandomSeed(Date.now());
                              setIsSortMenuOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-orange-50 transition-colors ${sortOrder === option.value ? 'text-orange-600 font-semibold' : 'text-gray-700'}`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setLanguage(language === 'zh-tw' ? 'en' : 'zh-tw')}
                    className="text-[10px] px-2 py-1 rounded-full border transition-colors flex items-center gap-1 shadow-sm bg-transparent text-gray-400 border-gray-200 hover:text-orange-600 hover:bg-orange-50"
                  >
                    <Globe size={10} />
                    {language.toUpperCase() === 'ZH-TW' ? '中' : 'EN'}
                  </button>
                  <button
                    onClick={() => setIsSettingsOpen(true)}
                    className="p-1.5 rounded-lg transition-colors text-gray-400 hover:text-orange-600 hover:bg-orange-50"
                    title={t('settings')}
                  >
                    <Settings size={16} />
                  </button>
                  <a
                    href="https://github.com/doggy8088/PromptFill"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg transition-colors text-gray-400 hover:text-gray-900 hover:bg-gray-50"
                    title={t('github_link')}
                  >
                    <Github size={16} />
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="relative group">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors"
                    size={14}
                  />
                  <input
                    type="text"
                    placeholder={t('search_templates')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-gray-100 border-none rounded-xl text-xs focus:ring-2 focus:ring-orange-500/20 transition-all outline-none"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2 pb-1">
                  <button
                    onClick={() => setSelectedTags('')}
                    className={`flex-shrink-0 px-3 py-1 rounded-full text-[10px] font-bold transition-all border ${selectedTags === '' ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20' : 'bg-white text-gray-500 border-gray-200 hover:border-orange-200 hover:text-orange-500'}`}
                  >
                    {t('all_templates')}
                  </button>
                  {TEMPLATE_TAGS.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTags(selectedTags === tag ? '' : tag)}
                      className={`flex-shrink-0 px-3 py-1 rounded-full text-[10px] font-bold transition-all border ${selectedTags === tag ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20' : 'bg-white text-gray-500 border-gray-200 hover:border-orange-200 hover:text-orange-500'}`}
                    >
                      {displayTag(tag)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* --- Template List --- */}
            <div className="flex-1 overflow-y-auto px-4 py-4 custom-scrollbar">
              <div className="grid grid-cols-1 gap-2.5">
                {filteredTemplates.map((t_item) => (
                  <div
                    key={t_item.id}
                    onClick={() => {
                      setActiveTemplateId(t_item.id);
                      if (isMobile) setIsTemplatesDrawerOpen(false);
                    }}
                    className={`group flex flex-col p-4 rounded-2xl border transition-all duration-300 relative text-left cursor-pointer ${t_item.id === activeTemplateId ? 'bg-orange-50 border-orange-200 shadow-sm' : 'bg-white border-transparent hover:border-orange-100 hover:bg-orange-50/30'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5 overflow-hidden flex-1">
                        {activeTemplateId === t_item.id && !editingTemplateNameId && (
                          <div className="relative flex-shrink-0">
                            <div className="w-1.5 h-5 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full shadow-md shadow-orange-400/50 animate-in fade-in zoom-in duration-300"></div>
                            <div className="absolute inset-0 w-1.5 h-5 bg-orange-50 rounded-full animate-pulse"></div>
                          </div>
                        )}

                        {editingTemplateNameId === t_item.id ? (
                          <div
                            className="flex-1 flex flex-col gap-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <input
                              autoFocus
                              type="text"
                              value={tempTemplateName}
                              onChange={(e) => setTempTemplateName(e.target.value)}
                              className="w-full px-2 py-1 text-sm font-bold border-b-2 border-orange-500 bg-transparent focus:outline-none"
                              placeholder={t('label_placeholder')}
                              onKeyDown={(e) => e.key === 'Enter' && saveTemplateName()}
                            />
                            <div className="flex items-center gap-2">
                              <button
                                onClick={saveTemplateName}
                                className="px-2 py-0.5 bg-orange-500 text-white text-[10px] font-bold rounded hover:bg-orange-600 transition-colors"
                              >
                                {t('confirm')}
                              </button>
                              <button
                                onClick={() => setEditingTemplateNameId(null)}
                                className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-bold rounded hover:bg-gray-200 transition-colors"
                              >
                                {t('cancel')}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <span
                            className={`truncate text-sm transition-all ${activeTemplateId === t_item.id ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}
                          >
                            {getLocalized(t_item.name, language)}
                          </span>
                        )}
                      </div>

                      {!editingTemplateNameId && (
                        <div
                          className={`flex items-center gap-1.5 ${activeTemplateId === t_item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-all duration-300`}
                        >
                          {INITIAL_TEMPLATES_CONFIG.some((cfg) => cfg.id === t_item.id) && (
                            <button
                              title={t('reset_template')}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleResetTemplate(t_item.id, e);
                              }}
                              className="p-1.5 hover:bg-orange-100 rounded-lg text-gray-400 hover:text-orange-500 transition-all duration-200 hover:scale-110"
                            >
                              <RotateCcw size={13} />
                            </button>
                          )}
                          <button
                            title={t('rename')}
                            onClick={(e) => {
                              e.stopPropagation();
                              startRenamingTemplate(t_item, e);
                            }}
                            className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-orange-600 transition-all duration-200 hover:scale-110"
                          >
                            <Pencil size={13} />
                          </button>
                          <button
                            title={t('duplicate')}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDuplicateTemplate(t_item, e);
                            }}
                            className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-orange-600 transition-all duration-200 hover:scale-110"
                          >
                            <CopyIcon size={13} />
                          </button>
                          <button
                            title={t('export_template')}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleExportTemplate(t_item);
                            }}
                            className="p-1.5 hover:bg-blue-50 rounded-lg text-gray-400 hover:text-blue-600 transition-all duration-200 hover:scale-110"
                          >
                            <Download size={13} />
                          </button>
                          <button
                            title={t('delete')}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteTemplate(t_item.id, e);
                            }}
                            className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-all duration-200 hover:scale-110"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* --- Footer & Create Button --- */}
            <div className="flex-shrink-0">
              <div className="p-4 border-t border-gray-200/50 bg-white pb-20 md:pb-4 space-y-3">
                <PremiumButton
                  onClick={handleAddTemplate}
                  icon={Plus}
                  color="orange"
                  active={true}
                  className="w-full !py-2.5 text-sm transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  {t('new_template')}
                </PremiumButton>
              </div>

              <div
                className="hidden md:block p-4 pt-0 border-t border-transparent text-[10px] leading-relaxed text-center opacity-60 hover:opacity-100 transition-opacity"
                style={{ color: '#545454' }}
              >
                <div className="flex items-center justify-center gap-2">
                   <a
                    href="https://github.com/doggy8088/PromptFill"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg transition-colors text-gray-400 hover:text-gray-900 hover:bg-gray-50"
                    title={t('github_link')}
                  >
                    <Github size={16} />
                  </a>
                   <a
                    href="https://chromewebstore.google.com/detail/chatgpt-%E8%90%AC%E8%83%BD%E5%B7%A5%E5%85%B7%E7%AE%B1/fmijcafgekkphdijpclfgnjhchmiokgp?authuser=0&hl=zh-TW&pli=1"
                    target="_blank"
                    rel="ChatGPT 萬能工具箱"
                    className="p-1.5 rounded-lg transition-colors text-gray-400 hover:text-gray-900 hover:bg-gray-50"
                    title={t('toolbox_chatgpt')}
                  >
                    <Toolbox size={16} />
                  </a>
                   <a
                    href="https://gwr.gh.miniasp.com/"
                    target="_blank"
                    rel="Gemini 🍌 無印良品"
                    className="p-1.5 rounded-lg transition-colors text-gray-400 hover:text-yellow-500 hover:bg-yellow-50"
                    title={t('gemini_muji')}
                  >
                    <Banana size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);

TemplatesSidebar.displayName = 'TemplatesSidebar';

