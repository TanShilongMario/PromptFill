import React, { useState } from 'react';
import { Settings, List, Check, ChevronRight, ChevronDown, Plus, Trash2, X, ChevronUp, Pencil, Search } from 'lucide-react';
import { CATEGORY_STYLES, PREMIUM_STYLES } from '../constants/styles';
import { getLocalized } from '../utils/helpers';

import { PremiumButton } from './PremiumButton';

/**
 * 组件：词库分类块
 */
const CategorySection = ({ catId, categories, banks, onInsert, onDeleteOption, onAddOption, onDeleteBank, onUpdateBankCategory, onStartAddBank, t, language, onTouchDragStart, isDarkMode, bankSearchQuery }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const category = categories[catId];
  
  if (!category) return null;

  const catBanks = Object.entries(banks).filter(([key, bank]) => {
    const isInCategory = (bank.category || 'other') === catId;
    if (!isInCategory) return false;
    
    if (!bankSearchQuery) return true;
    
    const query = bankSearchQuery.toLowerCase();
    const bankLabel = getLocalized(bank.label, language).toLowerCase();
    const matchesBankName = bankLabel.includes(query) || key.toLowerCase().includes(query);
    const matchesOptions = bank.options.some(opt => 
      getLocalized(opt, language).toLowerCase().includes(query)
    );
    
    return matchesBankName || matchesOptions;
  });
  
  // 如果该分类下没有词库，不显示
  if (catBanks.length === 0) return null;

  const style = CATEGORY_STYLES[category.color] || CATEGORY_STYLES.slate;

  return (
    <div className="break-inside-avoid transition-all duration-300">
        <div 
            className={`flex items-center gap-2 mb-4 cursor-pointer group select-none py-2 px-3 rounded-xl transition-all duration-300 ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-white/20'}`}
            onClick={() => setIsCollapsed(!isCollapsed)}
        >
            <div className={`${isDarkMode ? 'text-gray-600 group-hover:text-gray-400' : 'text-gray-400 group-hover:text-gray-600'} transition-colors`}>
                {isCollapsed ? <ChevronRight size={16} strokeWidth={2.5} /> : <ChevronDown size={16} strokeWidth={2.5} />}
            </div>
            <h3 className={`text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3 flex-1 transition-colors ${isDarkMode ? 'text-gray-600 group-hover:text-gray-400' : 'text-gray-400 group-hover:text-gray-600'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${style.dotBg} opacity-60`}></span>
                {getLocalized(category.label, language)}
                <span className="ml-auto tabular-nums opacity-40 font-bold">
                    {catBanks.length}
                </span>
            </h3>
        </div>
        
        {!isCollapsed && (
            <div className="space-y-3 pl-1 animate-in slide-in-from-top-2 duration-300">
                {catBanks.map(([key, bank]) => (
                    <BankGroup 
                        key={key}
                        bankKey={key} 
                        bank={bank} 
                        onInsert={onInsert}
                        onDeleteOption={onDeleteOption}
                        onAddOption={onAddOption}
                        onDeleteBank={onDeleteBank}
                        onUpdateBankCategory={onUpdateBankCategory}
                        categories={categories}
                        t={t}
                        language={language}
                        onTouchDragStart={onTouchDragStart}
                        isDarkMode={isDarkMode}
                        bankSearchQuery={bankSearchQuery}
                    />
                ))}
                
                {/* 新建词组按钮 */}
                {!bankSearchQuery && (
                    <button
                        onClick={() => onStartAddBank(catId)}
                        className={`w-full py-2.5 border-2 border-dashed rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group/add mb-4 ${isDarkMode ? 'border-white/5 text-gray-600 hover:text-orange-400 hover:border-orange-500/30 hover:bg-orange-500/5' : 'border-gray-200/60 text-gray-400 hover:text-orange-600 hover:border-orange-300/50 hover:bg-orange-50/30'}`}
                        title={t('add_bank_group')}
                    >
                        <Plus size={16} className={`transition-colors ${isDarkMode ? 'text-gray-700 group-hover/add:text-orange-500' : 'text-gray-300 group-hover/add:text-orange-500'}`} />
                        <span className="text-[11px] font-black uppercase tracking-widest">{t('add_bank_group')}</span>
                    </button>
                )}
            </div>
        )}
    </div>
  );
};

/**
 * 组件：可折叠的词库组
 */
const BankGroup = ({ bankKey, bank, onInsert, onDeleteOption, onAddOption, onDeleteBank, onUpdateBankCategory, categories, t, language, onTouchDragStart, isDarkMode, bankSearchQuery }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isEditingCategory, setIsEditingCategory] = useState(false);
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    // 如果有搜索词，且搜索词匹配到了词库名称或选项，则默认展开
    React.useEffect(() => {
        if (bankSearchQuery) {
            setIsCollapsed(false);
        }
    }, [bankSearchQuery]);

    const categoryId = bank.category || 'other';
    const colorKey = categories[categoryId]?.color || 'slate';
    const premium = PREMIUM_STYLES[colorKey] || PREMIUM_STYLES.slate;

    const handleDragStart = (e) => {
        e.dataTransfer.setData('text/plain', ` {{${bankKey}}} `);
        e.dataTransfer.effectAllowed = 'copy';
    };

    const handleTouchStart = (e) => {
        // 移动端拖拽过于敏感，根据用户反馈，禁用移动端拖拽插入功能
        return;
    };

    // 过滤选项
    const filteredOptions = bank.options.filter(opt => {
        if (!bankSearchQuery) return true;
        const query = bankSearchQuery.toLowerCase();
        // 如果词库名称已经匹配，则显示所有选项；否则只显示匹配的选项
        const bankLabel = getLocalized(bank.label, language).toLowerCase();
        if (bankLabel.includes(query) || bankKey.toLowerCase().includes(query)) return true;
        return getLocalized(opt, language).toLowerCase().includes(query);
    });

    return (
        <div 
            draggable="true"
            onDragStart={handleDragStart}
            onTouchStart={handleTouchStart}
            className="relative group/card mb-3 ml-3 cursor-grab active:cursor-grabbing transition-all duration-300 hover:translate-y-[-1px]"
        >
            {/* Tag - Growing left outside the card */}
            <div 
                className={`absolute top-[13px] transition-all duration-300 rounded-l-[4px] z-10 ${
                    !isCollapsed ? 'w-[12px] -left-[12px]' : 'w-[6px] -left-[6px] group-hover/card:w-[12px] group-hover/card:-left-[12px]'
                }`}
                style={{ 
                    backgroundColor: premium.from,
                    height: '16px'
                }}
            />

            <div 
                className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '11px 12px',
                    gap: '10px',
                    background: `${
                        isDarkMode 
                            ? 'linear-gradient(180deg, #393939 9%, #242220 99%)' 
                            : 'linear-gradient(180deg, #F0EAE5 9%, #DEDCDC 96%)'
                    } padding-box, ${
                        isDarkMode 
                            ? 'linear-gradient(0deg, #1A1A1A 0%, #494949 96%)' 
                            : 'linear-gradient(0deg, #BFBFBF 0%, #FFFFFF 100%)'
                    } border-box`,
                    border: '2px solid transparent',
                    boxSizing: 'border-box',
                }}
            >
                <div 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    <div className="flex items-center gap-[10px] overflow-hidden flex-1">
                        <div className={`flex-shrink-0 transition-transform duration-300 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                            {isCollapsed ? <ChevronDown size={18} strokeWidth={2.5} /> : <ChevronUp size={18} strokeWidth={2.5} />}
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className={`text-[14px] font-bold truncate tracking-tight leading-tight transition-colors ${isDarkMode ? 'text-gray-300 group-hover/card:text-white' : 'text-gray-800 group-hover/card:text-gray-900'}`}>
                                {getLocalized(bank.label, language)}
                            </span>
                            <code className="text-[11px] font-black tracking-wider mt-0.5 opacity-60" style={{ color: premium.to }}>{`{{${bankKey}}}`}</code>
                        </div>
                    </div>
                    <div className="flex gap-1.5 items-center">
                        <button 
                            onClick={(e) => { e.stopPropagation(); onInsert(bankKey); }}
                            title={t('insert')}
                            className={`p-2 rounded-xl transition-all duration-200 shadow-sm flex items-center gap-1.5 group/insert ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-orange-400' : 'bg-white/40 hover:bg-white text-gray-600 hover:text-orange-600'}`}
                        >
                            <Plus size={16} className="group-hover/insert:scale-110 transition-transform" /> 
                            {!isCollapsed && <span className="text-[11px] font-black uppercase tracking-widest">{t('insert')}</span>}
                        </button>
                        
                        {!isCollapsed && (
                            <>
                                <button 
                                    onClick={(e) => { 
                                        e.stopPropagation(); 
                                        setIsEditingCategory(!isEditingCategory); 
                                    }}
                                    title={t('category_label')}
                                    className={`p-2 rounded-xl transition-all duration-200 ${isDarkMode ? 'text-gray-500 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-900 hover:bg-white/40'}`}
                                >
                                    <Settings size={16} />
                                </button>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); onDeleteBank(bankKey); }}
                                    className={`p-2 rounded-xl transition-all duration-200 ${isDarkMode ? 'text-gray-500 hover:text-red-400 hover:bg-red-500/10' : 'text-gray-500 hover:text-red-600 hover:bg-red-50/50'}`}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </>
                        )}
                    </div>
                </div>
                
                {/* Expanded Content */}
                {!isCollapsed && (
                    <div className="animate-in slide-in-from-top-2 duration-300">
                        <div className={`h-px mb-4 ${isDarkMode ? 'bg-white/5' : 'bg-white/20'}`}></div>
                        
                        {/* Category Edit Mode */}
                        {isEditingCategory && (
                            <div className={`mb-4 pb-4 border-b ${isDarkMode ? 'border-white/5' : 'border-white/20'}`}>
                                <label className={`block text-[10px] uppercase font-black mb-2 px-1 tracking-widest ${isDarkMode ? 'text-gray-600' : 'text-gray-500'}`}>{t('category_label')}</label>
                                <select 
                                    value={categoryId}
                                    onChange={(e) => {
                                        onUpdateBankCategory(bankKey, e.target.value);
                                        setIsEditingCategory(false);
                                    }}
                                    className={`w-full text-xs font-bold border-none rounded-xl px-3 py-2.5 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all appearance-none ${isDarkMode ? 'bg-black/20 text-gray-300' : 'bg-white/50 text-gray-700'}`}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {Object.values(categories).map(cat => (
                                        <option key={cat.id} value={cat.id}>{getLocalized(cat.label, language)}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="flex flex-col gap-1.5 mb-4">
                            {filteredOptions.map((opt, idx) => (
                                <div key={idx} className={`group/opt flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl text-[14px] font-semibold transition-all duration-200 ${isDarkMode ? 'bg-transparent hover:bg-white/5 text-gray-400 hover:text-gray-200' : 'bg-transparent hover:bg-white/60 text-gray-700 hover:text-gray-900'}`}>
                                    <span className="truncate select-text" title={getLocalized(opt, language)}>{getLocalized(opt, language)}</span>
                                    <button 
                                        onClick={() => onDeleteOption(bankKey, opt)}
                                        className="opacity-0 group-hover/opt:opacity-100 text-gray-400 hover:text-red-500 p-1 rounded-lg transition-all flex-shrink-0"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder={t('add_option_placeholder')}
                                className={`flex-1 px-4 py-2.5 text-[14px] font-medium border-none rounded-xl focus:ring-4 focus:ring-orange-500/10 transition-all outline-none ${isDarkMode ? 'bg-white/5 text-gray-200 placeholder:text-gray-500' : 'bg-white/50 text-gray-700 placeholder:text-gray-400'}`}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        onAddOption(bankKey, e.target.value);
                                        e.target.value = '';
                                    }
                                }}
                            />
                            <button 
                                className={`p-2.5 rounded-xl transition-all active:scale-95 group/addbtn ${isDarkMode ? 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-orange-400' : 'bg-white/50 text-gray-500 hover:bg-white hover:text-orange-600'}`}
                                onClick={(e) => {
                                    const input = e.currentTarget.previousSibling;
                                    onAddOption(bankKey, input.value);
                                    input.value = '';
                                }}
                            >
                                <Plus size={18} className="group-hover/addbtn:scale-110 transition-transform" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

/**
 * 核心组件：分类管理器
 */
export const CategoryManager = ({ isOpen, onClose, categories, setCategories, banks, setBanks, t, language, isDarkMode }) => {
  const [newCatName, setNewCatName] = useState("");
  const [newCatColor, setNewCatColor] = useState("slate");
  const [editingCatId, setEditingCatId] = useState(null);
  const [tempCatName, setTempCatName] = useState("");
  
  const availableColors = Object.keys(CATEGORY_STYLES);

  if (!isOpen) return null;

  const handleAddCategory = () => {
    if (!newCatName.trim()) return;
    const newId = `cat_${Date.now()}`;
    
    setCategories(prev => ({
      ...prev,
      [newId]: { id: newId, label: newCatName, color: newCatColor }
    }));
    setNewCatName("");
    setNewCatColor("slate");
  };

  const handleDeleteCategory = (catId) => {
    if (catId === 'other') return; // Cannot delete default
    
    const catName = getLocalized(categories[catId].label, language);
    if (window.confirm(t('delete_category_confirm', { name: catName }))) {
       // 1. Update banks to use 'other'
       const updatedBanks = { ...banks };
       Object.keys(updatedBanks).forEach(key => {
           if (updatedBanks[key].category === catId) {
               updatedBanks[key].category = 'other';
           }
       });
       setBanks(updatedBanks);

       // 2. Remove category
       const updatedCats = { ...categories };
       delete updatedCats[catId];
       setCategories(updatedCats);
    }
  };

  const startEditing = (cat) => {
      setEditingCatId(cat.id);
      setTempCatName(getLocalized(cat.label, language));
  };

  const saveEditing = () => {
      if (!tempCatName.trim()) return;
      setCategories(prev => {
          const cat = prev[editingCatId];
          const newLabel = typeof cat.label === 'object' ? { ...cat.label, [language]: tempCatName } : tempCatName;
          return {
            ...prev,
            [editingCatId]: { ...cat, label: newLabel }
          };
      });
      setEditingCatId(null);
  };

  const changeColor = (catId, color) => {
      setCategories(prev => ({
          ...prev,
          [catId]: { ...prev[catId], color }
      }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div className={`rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[80vh] ${isDarkMode ? 'bg-[#242120] border border-white/5' : 'bg-white'}`}>
        <div className={`p-4 border-b flex justify-between items-center ${isDarkMode ? 'border-white/5 bg-black/20' : 'border-gray-100 bg-gray-50'}`}>
          <h3 className={`font-bold flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
            <List size={18} /> {t('manage_categories')}
          </h3>
          <button onClick={onClose} className={`p-1 rounded transition-colors ${isDarkMode ? 'hover:bg-white/10 text-gray-500' : 'hover:bg-gray-200 text-gray-500'}`}><X size={18}/></button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
           {/* Add New */}
           <div className={`flex gap-2 items-center mb-4 p-3 rounded-lg border ${isDarkMode ? 'bg-black/20 border-white/5' : 'bg-gray-50 border-gray-200'}`}>
              <input 
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder={t('category_name_placeholder')}
                className={`flex-1 text-sm rounded px-2 py-1.5 focus:outline-none focus:border-orange-500 ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-200' : 'border-gray-300'}`}
              />
              <select 
                value={newCatColor}
                onChange={(e) => setNewCatColor(e.target.value)}
                className={`text-sm border rounded px-2 py-1.5 ${isDarkMode ? 'bg-[#2A2726] border-white/10 text-gray-300' : 'border-gray-300 bg-white'}`}
              >
                {availableColors.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <button 
                onClick={handleAddCategory}
                disabled={!newCatName.trim()}
                className="p-1.5 bg-orange-600 text-white rounded disabled:opacity-50 hover:bg-orange-700"
              >
                <Plus size={16} />
              </button>
           </div>

           {/* List */}
           <div className="space-y-2">
             {Object.values(categories).map(cat => (
               <div key={cat.id} className={`flex items-center gap-2 p-2 border rounded transition-colors ${isDarkMode ? 'border-white/5 bg-white/5 hover:border-white/10' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
                  <div className={`w-3 h-3 rounded-full ${CATEGORY_STYLES[cat.color].dotBg}`}></div>
                  
                  {editingCatId === cat.id ? (
                      <input 
                        autoFocus
                        value={tempCatName}
                        onChange={(e) => setTempCatName(e.target.value)}
                        onBlur={saveEditing}
                        onKeyDown={(e) => e.key === 'Enter' && saveEditing()}
                        className={`flex-1 text-sm border rounded px-1 py-0.5 outline-none ${isDarkMode ? 'bg-black/40 border-orange-500 text-white' : 'border-orange-300'}`}
                      />
                  ) : (
                      <span className={`flex-1 text-sm font-medium truncate ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{getLocalized(cat.label, language)}</span>
                  )}

                  <div className="flex items-center gap-1">
                      {/* Color Picker */}
                      <div className="relative group/color">
                          <div className={`w-5 h-5 rounded cursor-pointer border ${isDarkMode ? 'border-white/10' : 'border-gray-200'} ${CATEGORY_STYLES[cat.color].bg}`}></div>
                          <div className={`absolute right-0 top-full mt-1 hidden group-hover/color:grid grid-cols-5 gap-1 p-2 border shadow-lg rounded z-10 w-32 ${isDarkMode ? 'bg-[#2A2726] border-white/10 shadow-black/40' : 'bg-white border-gray-200 shadow-lg'}`}>
                              {availableColors.map(c => (
                                  <div 
                                    key={c} 
                                    onClick={() => changeColor(cat.id, c)}
                                    className={`w-4 h-4 rounded-full cursor-pointer hover:scale-110 transition-transform ${CATEGORY_STYLES[c].dotBg}`}
                                    title={c}
                                  />
                              ))}
                          </div>
                      </div>

                      <button onClick={() => startEditing(cat)} className="p-1 text-gray-400 hover:text-orange-600 rounded"><Pencil size={14}/></button>
                      {cat.id !== 'other' && (
                          <button onClick={() => handleDeleteCategory(cat.id)} className="p-1 text-gray-400 hover:text-red-500 rounded"><Trash2 size={14}/></button>
                      )}
                  </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 核心组件：变量插入选择器
 */
export const InsertVariableModal = ({ isOpen, onClose, categories, banks, onSelect, t, language, isDarkMode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className={`rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[80vh] animate-slide-up ${isDarkMode ? 'bg-[#242120] border border-white/5' : 'bg-white'}`}>
        <div className={`p-4 border-b flex justify-between items-center ${isDarkMode ? 'border-white/5 bg-black/20' : 'border-gray-100 bg-gray-50'}`}>
          <h3 className={`font-bold flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
            <List size={18} className="text-orange-600" /> {t('insert')}
          </h3>
          <button onClick={onClose} className={`p-1 rounded transition-colors ${isDarkMode ? 'hover:bg-white/10 text-gray-500' : 'hover:bg-gray-200 text-gray-500'}`}><X size={18}/></button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
           {Object.keys(categories).map(catId => {
               const catBanks = Object.entries(banks).filter(([_, bank]) => (bank.category || 'other') === catId);
               if (catBanks.length === 0) return null;
               
               const category = categories[catId];
               const style = CATEGORY_STYLES[category.color] || CATEGORY_STYLES.slate;

               return (
                   <div key={catId}>
                       <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 sticky top-0 py-1 z-10 ${style.text} ${isDarkMode ? 'bg-[#242120]' : 'bg-white'}`}>
                           <span className={`w-1.5 h-1.5 rounded-full ${style.dotBg}`}></span>
                           {getLocalized(category.label, language)}
                       </h4>
                       <div className="grid grid-cols-1 gap-2">
                           {catBanks.map(([key, bank]) => (
                               <button
                                   key={key}
                                   onClick={() => onSelect(key)}
                                   className={`
                                     flex items-center justify-between p-3 rounded-lg border text-left transition-all group
                                     ${isDarkMode ? 'bg-white/5 border-white/5 hover:border-orange-500/50 hover:bg-orange-500/5 hover:shadow-lg hover:shadow-orange-500/5' : 'bg-white border-gray-100 hover:border-orange-200 hover:bg-orange-50/50 hover:shadow-sm'}
                                   `}
                               >
                                   <div>
                                       <span className={`block text-sm font-medium transition-colors ${isDarkMode ? 'text-gray-300 group-hover:text-orange-400' : 'text-gray-700 group-hover:text-orange-700'}`}>{getLocalized(bank.label, language)}</span>
                                       <code className={`text-[10px] font-mono transition-colors ${isDarkMode ? 'text-gray-600 group-hover:text-orange-400/60' : 'text-gray-400 group-hover:text-orange-400'}`}>{`{{${key}}}`}</code>
                                   </div>
                                   <Plus size={16} className={`transition-colors ${isDarkMode ? 'text-gray-700 group-hover:text-orange-500' : 'text-gray-300 group-hover:text-orange-500'}`} />
                               </button>
                           ))}
                       </div>
                   </div>
               );
           })}
        </div>
      </div>
    </div>
  );
};

/**
 * 核心组件：添加词库模态框
 */
export const AddBankModal = ({ isOpen, onClose, t, categories, newBankLabel, setNewBankLabel, newBankKey, setNewBankKey, newBankCategory, setNewBankCategory, onConfirm, language, isDarkMode }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-[120] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
        >
            <div 
                className={`w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border animate-scale-up ${isDarkMode ? 'bg-[#242120] border-white/5' : 'bg-white border-gray-100'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={`p-4 border-b flex justify-between items-center ${isDarkMode ? 'bg-black/20 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                    <h3 className={`font-bold flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                        <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                        {t('add_bank_title')}
                    </h3>
                    <button onClick={onClose} className={`p-1 rounded transition-colors ${isDarkMode ? 'hover:bg-white/10 text-gray-500' : 'hover:bg-gray-200 text-gray-500'}`}>
                        <X size={18}/>
                    </button>
                </div>
                
                <div className="p-6 space-y-4">
                    <div>
                        <label className={`block text-xs mb-1.5 font-bold uppercase tracking-wide ${isDarkMode ? 'text-gray-600' : 'text-gray-500'}`}>{t('label_name')}</label>
                        <input 
                            autoFocus
                            type="text" 
                            className={`w-full text-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none transition-all ${isDarkMode ? 'bg-white/5 border border-white/10 text-gray-200' : 'border border-gray-200 bg-gray-50/50 text-gray-700'}`}
                            placeholder={t('label_placeholder')}
                            value={newBankLabel}
                            onChange={e => setNewBankLabel(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className={`block text-xs mb-1.5 font-bold uppercase tracking-wide ${isDarkMode ? 'text-gray-600' : 'text-gray-500'}`}>{t('id_name')}</label>
                        <input 
                            type="text" 
                            className={`w-full text-sm rounded-xl px-4 py-3 font-mono focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none transition-all ${isDarkMode ? 'bg-white/5 border border-white/10 text-gray-200' : 'border border-gray-200 bg-gray-50/50 text-gray-700'}`}
                            placeholder={t('id_placeholder')}
                            value={newBankKey}
                            onChange={e => setNewBankKey(e.target.value)} 
                        />
                    </div>
                    <div>
                        <label className={`block text-xs mb-1.5 font-bold uppercase tracking-wide ${isDarkMode ? 'text-gray-600' : 'text-gray-500'}`}>{t('category_label')}</label>
                        <select 
                            value={newBankCategory}
                            onChange={e => setNewBankCategory(e.target.value)}
                            className={`w-full text-sm border rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none transition-all appearance-none ${isDarkMode ? 'bg-[#2A2726] border-white/10 text-gray-300' : 'border-gray-200 bg-gray-50/50 text-gray-700'}`}
                        >
                            {Object.values(categories).map(cat => (
                                <option key={cat.id} value={cat.id}>{getLocalized(cat.label, language)}</option>
                            ))}
                        </select>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button 
                            onClick={onClose}
                            className={`flex-1 px-4 py-3 border text-sm font-medium rounded-xl transition-all ${isDarkMode ? 'border-white/5 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white' : 'border-gray-200 text-gray-600 bg-white hover:bg-gray-50'}`}
                        >
                            {t('cancel')}
                        </button>
                        <button 
                            onClick={onConfirm}
                            disabled={!newBankLabel.trim() || !newBankKey.trim()}
                            className="flex-1 px-4 py-3 bg-orange-600 text-white text-sm font-medium rounded-xl hover:bg-orange-700 shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
                        >
                            {t('confirm_add')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * BanksSidebar 组件 - 负责展示右侧词库配置
 */
export const BanksSidebar = React.memo(({ 
  mobileTab, 
  isBanksDrawerOpen,
  setIsBanksDrawerOpen,
  bankSidebarWidth, 
  sidebarRef, 
  startResizing, 
  setIsCategoryManagerOpen, 
  categories, 
  banks, 
  insertVariableToTemplate, 
  handleDeleteOption, 
  handleAddOption, 
  handleDeleteBank, 
  handleUpdateBankCategory, 
  handleStartAddBank, 
  t,
  language,
  isDarkMode,
  // 移动端模拟拖拽 props
  onTouchDragStart,
  globalContainerStyle
}) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const [bankSearchQuery, setBankSearchQuery] = useState("");

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isBanksDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-[290] animate-in fade-in duration-300"
          onClick={() => setIsBanksDrawerOpen(false)}
        />
      )}

      <div 
        ref={sidebarRef}
        style={!isMobile ? { ...globalContainerStyle, width: `${bankSidebarWidth}px` } : {}}
        className={`
            ${isMobile 
              ? `fixed inset-y-0 right-0 z-[300] w-[85%] max-w-[360px] transform transition-transform duration-500 ease-out shadow-2xl ${isBanksDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`
              : 'relative md:flex flex-col h-full shrink-[10] overflow-hidden min-w-[240px]'
            } 
            flex flex-col overflow-hidden
            ${!isMobile ? 'bg-transparent' : (isDarkMode ? 'bg-[#242120]/95' : 'bg-white/95')}
            ${!isMobile && mobileTab !== 'editor' && mobileTab !== 'banks' ? 'hidden md:flex' : ''}
        `}
      >
        <div className={`flex flex-col w-full h-full backdrop-blur-sm rounded-2xl ${isMobile ? (isDarkMode ? 'bg-[#242120]/95' : 'bg-white/95') : (isDarkMode ? 'bg-black/20' : 'bg-white/30')}`}>
          <div 
              className="hidden md:flex absolute -left-2 top-0 bottom-0 w-4 cursor-col-resize z-40 group items-center justify-center"
              onMouseDown={startResizing}
          >
              <div className={`h-12 w-1.5 rounded-full transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-orange-400/30 ${isDarkMode ? 'bg-white/5 group-hover:bg-gradient-to-b group-hover:from-orange-400 group-hover:to-orange-500' : 'bg-gray-300/60 group-hover:bg-gradient-to-b group-hover:from-orange-400 group-hover:to-orange-500'}`}></div>
          </div>

      <div className={`px-6 pt-4 pb-4 sticky top-0 z-30 border-b ${isDarkMode ? 'border-white/5' : 'border-white/30'}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col items-start gap-1">
              <h1 className="font-black tracking-tight text-[22px] text-orange-500 flex items-baseline gap-2">
                  {t('bank_config')}
                  <span className={`text-xs font-bold tracking-widest uppercase ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>Library</span>
              </h1>
          </div>
          <PremiumButton 
              onClick={() => setIsCategoryManagerOpen(true)}
              title={t('manage_categories')}
              icon={Settings}
              isDarkMode={isDarkMode}
          >
              {t('manage_categories')}
          </PremiumButton>
        </div>
        <div className="flex flex-col gap-4">
            {/* 搜索框 */}
            <div className={`premium-search-container group ${isDarkMode ? 'dark' : 'light'}`}>
                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors pointer-events-none z-10 ${isDarkMode ? 'text-gray-600 group-focus-within:text-orange-500' : 'text-gray-400 group-focus-within:text-orange-500'}`} size={16} />
                <input 
                  type="text" 
                  placeholder={t('search_banks') || "搜索词条..."} 
                  value={bankSearchQuery} 
                  onChange={(e) => setBankSearchQuery(e.target.value)} 
                  className={`premium-search-input ${isDarkMode ? 'dark' : 'light'}`} 
                />
            </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 pb-24 md:pb-20 custom-scrollbar">
        {bankSidebarWidth >= 520 || window.innerWidth < 768 ? (
           <div className="flex flex-col md:flex-row gap-4 items-start">
             <div className="flex-1 flex flex-col gap-4 min-w-0 w-full">
                {Object.keys(categories).filter((_, i) => i % 2 === 0).map(catId => (
                    <CategorySection 
                        key={catId}
                        catId={catId}
                        categories={categories}
                        banks={banks}
                        onInsert={insertVariableToTemplate}
                        onDeleteOption={handleDeleteOption}
                        onAddOption={handleAddOption}
                        onDeleteBank={handleDeleteBank}
                        onUpdateBankCategory={handleUpdateBankCategory}
                        onStartAddBank={handleStartAddBank}
                        t={t}
                        language={language}
                        onTouchDragStart={onTouchDragStart}
                        isDarkMode={isDarkMode}
                        bankSearchQuery={bankSearchQuery}
                    />
                ))}
             </div>
             <div className="flex-1 flex flex-col gap-4 min-w-0 w-full">
                {Object.keys(categories).filter((_, i) => i % 2 === 1).map(catId => (
                    <CategorySection 
                        key={catId}
                        catId={catId}
                        categories={categories}
                        banks={banks}
                        onInsert={insertVariableToTemplate}
                        onDeleteOption={handleDeleteOption}
                        onAddOption={handleAddOption}
                        onDeleteBank={handleDeleteBank}
                        onUpdateBankCategory={handleUpdateBankCategory}
                        onStartAddBank={handleStartAddBank}
                        t={t}
                        language={language}
                        onTouchDragStart={onTouchDragStart}
                        isDarkMode={isDarkMode}
                        bankSearchQuery={bankSearchQuery}
                    />
                ))}
             </div>
           </div>
        ) : (
          <div className="flex flex-col gap-4">
              {Object.keys(categories).map(catId => (
                  <CategorySection 
                      key={catId}
                      catId={catId}
                      categories={categories}
                      banks={banks}
                      onInsert={insertVariableToTemplate}
                      onDeleteOption={handleDeleteOption}
                      onAddOption={handleAddOption}
                      onDeleteBank={handleDeleteBank}
                      onUpdateBankCategory={handleUpdateBankCategory}
                      onStartAddBank={handleStartAddBank}
                      t={t}
                      language={language}
                      onTouchDragStart={onTouchDragStart}
                      isDarkMode={isDarkMode}
                      bankSearchQuery={bankSearchQuery}
                  />
              ))}
          </div>
        )}
      </div>
    </div>
  </div>
  </>
  );
});

BanksSidebar.displayName = 'BanksSidebar';
