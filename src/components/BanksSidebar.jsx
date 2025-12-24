import React, { useState } from 'react';
import { Settings, List, Check, ChevronRight, ChevronDown, Plus, Trash2, X, ChevronUp, Pencil } from 'lucide-react';
import { CATEGORY_STYLES, PREMIUM_STYLES } from '../constants/styles';
import { getLocalized } from '../utils/helpers';

/**
 * 元件：詞庫分類塊
 */
const CategorySection = ({ catId, categories, banks, onInsert, onDeleteOption, onAddOption, onDeleteBank, onUpdateBankCategory, onStartAddBank, t, language, onTouchDragStart }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const category = categories[catId];
  
  if (!category) return null;

  const catBanks = Object.entries(banks).filter(([_, bank]) => (bank.category || 'other') === catId);
  
  // 如果該分類下沒有詞庫，不顯示
  if (catBanks.length === 0) return null;

  const style = CATEGORY_STYLES[category.color] || CATEGORY_STYLES.slate;

  return (
    <div className="break-inside-avoid transition-all duration-300">
        <div 
            className="flex items-center gap-1 mb-3 cursor-pointer group select-none py-2 px-3 -ml-1 rounded-xl hover:bg-gradient-to-r hover:from-white/80 hover:to-white/50 hover:shadow-sm hover:border hover:border-white/60 transition-all duration-300"
            onClick={() => setIsCollapsed(!isCollapsed)}
        >
            <div className="text-gray-400 group-hover:text-gray-600 transition-colors mt-0.5">
                {isCollapsed ? <ChevronRight size={15} /> : <ChevronDown size={15} />}
            </div>
            <h3 className={`text-xs font-bold uppercase tracking-wider ${style.text} flex items-center gap-2 flex-1`}>
                <span className={`w-2 h-2 rounded-full ${style.dotBg} shadow-sm`}></span>
                {getLocalized(category.label, language)}
                <span className="text-gray-400 font-medium ml-auto text-[10px] tabular-nums bg-white/80 px-2 py-0.5 rounded-full">
                    {catBanks.length}
                </span>
            </h3>
            {/* 摺疊時的裝飾線 */}
            {isCollapsed && <div className="h-px bg-gradient-to-r from-gray-200 via-gray-100 to-transparent flex-1 ml-2"></div>}
        </div>
        
        {!isCollapsed && (
            <div className="space-y-3 pl-2 animate-in">
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
                    />
                ))}
                
                {/* 新建詞組按鈕 */}
                <button
                    onClick={() => onStartAddBank(catId)}
                    className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:text-orange-600 hover:border-orange-300 hover:bg-gradient-to-br hover:from-orange-50/80 hover:to-orange-50/40 transition-all duration-300 flex items-center justify-center gap-2 group/add hover:shadow-sm"
                    title={t('add_bank_group')}
                >
                    <Plus size={15} className="text-gray-300 group-hover/add:text-orange-500 transition-colors" />
                    <span className="text-xs font-semibold">{t('add_bank_group')}</span>
                </button>
            </div>
        )}
    </div>
  );
};

/**
 * 元件：可折疊的詞庫組
 */
const BankGroup = ({ bankKey, bank, onInsert, onDeleteOption, onAddOption, onDeleteBank, onUpdateBankCategory, categories, t, language, onTouchDragStart }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isEditingCategory, setIsEditingCategory] = useState(false);
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const categoryId = bank.category || 'other';
    const colorKey = categories[categoryId]?.color || 'slate';
    const premium = PREMIUM_STYLES[colorKey] || PREMIUM_STYLES.slate;

    const handleDragStart = (e) => {
        e.dataTransfer.setData('text/plain', ` {{${bankKey}}} `);
        e.dataTransfer.effectAllowed = 'copy';
    };

    const handleTouchStart = (e) => {
        if (!isMobile) return;
        // 记录起始位置
        const touch = e.touches[0];
        // 这里的逻辑：如果用户触摸并保持一会儿，或者触摸并移动，则触发拖拽
        // 我们通过传递回调给父组件 App.jsx 来处理全局浮层
        if (onTouchDragStart) {
            onTouchDragStart(bankKey, touch.clientX, touch.clientY);
        }
    };

    return (
        <div 
            draggable="true"
            onDragStart={handleDragStart}
            onTouchStart={handleTouchStart}
            className="relative group/card mb-3 cursor-grab active:cursor-grabbing transition-all duration-300 hover:translate-y-[-2px]"
        >
            {/* Gradient Border Glow with Enhanced Shadow */}
            <div 
                className="absolute -inset-[1.5px] rounded-xl opacity-60 group-hover/card:opacity-100 transition-all duration-300 blur-[0.5px] group-hover/card:blur-0"
                style={{ background: `linear-gradient(135deg, ${premium.from}, ${premium.to})` }}
            />

            {/* Main Card Content */}
            <div className="relative bg-white rounded-[11px] m-[1.5px] overflow-hidden shadow-sm group-hover/card:shadow-md transition-shadow duration-300">
                {/* Header / Collapsed View */}
                <div 
                    className="flex justify-between items-start p-3.5 cursor-pointer hover:bg-gradient-to-br hover:from-gray-50/80 hover:to-white transition-all duration-200"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    <div className="flex items-start gap-2.5 overflow-hidden flex-1 pr-2">
                        <div className="mt-0.5 flex-shrink-0 text-gray-400 group-hover/card:text-gray-600 transition-all duration-200 group-hover/card:scale-110">
                            {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-bold text-gray-700 truncate leading-tight group-hover/card:text-gray-900 transition-colors">{getLocalized(bank.label, language)}</span>
                            <code className="text-[10px] text-gray-400 truncate font-mono mt-1 bg-gray-50 px-1.5 py-0.5 rounded" style={{ color: premium.to }}>{`{{${bankKey}}}`}</code>
                        </div>
                    </div>
                    <div className="flex gap-1.5 items-center">
                        <button 
                            onClick={(e) => { e.stopPropagation(); onInsert(bankKey); }}
                            title={t('insert')}
                            className="p-2 bg-white rounded-lg border border-gray-100 hover:border-orange-300 text-gray-400 hover:text-orange-600 hover:bg-gradient-to-br hover:from-orange-50 hover:to-orange-100/50 transition-all duration-200 shadow-sm hover:shadow flex items-center gap-1.5 group/insert"
                        >
                            <Plus size={14} className="group-hover/insert:scale-110 transition-transform" /> 
                            {!isCollapsed && <span className="text-xs font-semibold">{t('insert')}</span>}
                        </button>
                        
                        {!isCollapsed && (
                            <>
                                <button 
                                    onClick={(e) => { 
                                        e.stopPropagation(); 
                                        setIsEditingCategory(!isEditingCategory); 
                                    }}
                                    title={t('category_label')}
                                    className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 shadow-sm hover:shadow"
                                >
                                    <Settings size={14} />
                                </button>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); onDeleteBank(bankKey); }}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 shadow-sm hover:shadow"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </>
                        )}
                    </div>
                </div>
                
                {/* Expanded Content */}
                {!isCollapsed && (
                    <div className="p-3 pt-0">
                        <div className="h-px bg-gray-100 mb-3 -mx-3"></div>
                        
                        {/* Category Edit Mode */}
                        {isEditingCategory && (
                            <div className="mb-3 pb-3 border-b border-gray-100">
                                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">{t('category_label')}</label>
                                <select 
                                    value={categoryId}
                                    onChange={(e) => {
                                        onUpdateBankCategory(bankKey, e.target.value);
                                        setIsEditingCategory(false);
                                    }}
                                    className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-gray-50"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {Object.values(categories).map(cat => (
                                        <option key={cat.id} value={cat.id}>{getLocalized(cat.label, language)}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="flex flex-col gap-2.5 mb-3">
                            {bank.options.map((opt, idx) => (
                                <div key={idx} className="group/opt flex items-center justify-between gap-2 bg-gradient-to-br from-gray-50 to-gray-50/50 hover:from-white hover:to-gray-50/30 border border-gray-100/50 hover:border-gray-300 px-3 py-2 rounded-lg text-xs text-gray-700 shadow-sm hover:shadow transition-all duration-200">
                                    <span className="truncate select-text font-medium" title={getLocalized(opt, language)}>{getLocalized(opt, language)}</span>
                                    <button 
                                        onClick={() => onDeleteOption(bankKey, opt)}
                                        className="opacity-0 group-hover/opt:opacity-100 text-gray-300 hover:text-red-500 hover:bg-red-50 p-1 rounded transition-all flex-shrink-0"
                                    >
                                        <X size={13} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder={t('add_option_placeholder')}
                                className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 transition-all bg-white shadow-sm focus:shadow placeholder:text-gray-400"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        onAddOption(bankKey, e.target.value);
                                        e.target.value = '';
                                    }
                                }}
                            />
                            <button 
                                className="p-2 bg-gradient-to-br from-gray-50 to-white border border-gray-200 text-gray-400 rounded-lg hover:border-orange-300 hover:text-orange-600 hover:from-orange-50 hover:to-orange-100/50 transition-all shadow-sm hover:shadow group/addbtn"
                                onClick={(e) => {
                                    const input = e.currentTarget.previousSibling;
                                    onAddOption(bankKey, input.value);
                                    input.value = '';
                                }}
                            >
                                <Plus size={14} className="group-hover/addbtn:scale-110 transition-transform" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

/**
 * 核心元件：分類管理器
 */
export const CategoryManager = ({ isOpen, onClose, categories, setCategories, banks, setBanks, t, language }) => {
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
    
    // 新增分類時同時建立一個預設詞庫
    const newBankKey = `bank_${Date.now()}`;
    setBanks(prev => ({
      ...prev,
      [newBankKey]: { 
        label: newCatName, 
        category: newId,
        options: []
      }
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
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[80vh]">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <List size={18} /> {t('manage_categories')}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded text-gray-500"><X size={18}/></button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-20">
           {/* Add New */}
           <div className="flex gap-2 items-center mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <input 
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder={t('category_name_placeholder')}
                className="flex-1 text-sm border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:border-orange-500"
              />
              <select 
                value={newCatColor}
                onChange={(e) => setNewCatColor(e.target.value)}
                className="text-sm border border-gray-300 rounded px-2 py-1.5 bg-white"
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
               <div key={cat.id} className="flex items-center gap-2 p-2 border border-gray-100 rounded bg-white hover:border-gray-200 transition-colors">
                  <div className={`w-3 h-3 rounded-full ${CATEGORY_STYLES[cat.color].dotBg}`}></div>
                  
                  {editingCatId === cat.id ? (
                      <input 
                        autoFocus
                        value={tempCatName}
                        onChange={(e) => setTempCatName(e.target.value)}
                        onBlur={saveEditing}
                        onKeyDown={(e) => e.key === 'Enter' && saveEditing()}
                        className="flex-1 text-sm border border-orange-300 rounded px-1 py-0.5 outline-none"
                      />
                  ) : (
                      <span className="flex-1 text-sm font-medium text-gray-700 truncate">{getLocalized(cat.label, language)}</span>
                  )}

                  <div className="flex items-center gap-1">
                      {/* Color Picker */}
                      <div className="relative group/color">
                          <div className={`w-5 h-5 rounded cursor-pointer border border-gray-200 ${CATEGORY_STYLES[cat.color].bg}`}></div>
                          <div className="absolute right-0 top-full mt-1 hidden group-hover/color:grid grid-cols-5 gap-1 p-2 bg-white border border-gray-200 shadow-lg rounded z-10 w-32">
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
 * 核心元件：變數插入選擇器
 */
export const InsertVariableModal = ({ isOpen, onClose, categories, banks, onSelect, t, language }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[80vh] animate-slide-up">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <List size={18} className="text-orange-600" /> {t('insert')}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded text-gray-500"><X size={18}/></button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
           {Object.keys(categories).map(catId => {
               const catBanks = Object.entries(banks).filter(([_, bank]) => (bank.category || 'other') === catId);
               if (catBanks.length === 0) return null;
               
               const category = categories[catId];
               const style = CATEGORY_STYLES[category.color] || CATEGORY_STYLES.slate;

               return (
                   <div key={catId}>
                       <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${style.text} flex items-center gap-1.5 sticky top-0 bg-white py-1 z-10`}>
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
                                     bg-white border-gray-100 hover:border-orange-200 hover:bg-orange-50/50 hover:shadow-sm
                                   `}
                               >
                                   <div>
                                       <span className="block text-sm font-medium text-gray-700 group-hover:text-orange-700">{getLocalized(bank.label, language)}</span>
                                       <code className="text-[10px] text-gray-400 font-mono group-hover:text-orange-400">{`{{${key}}}`}</code>
                                   </div>
                                   <Plus size={16} className="text-gray-300 group-hover:text-orange-500" />
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
 * 核心元件：新增詞庫模態框
 */
export const AddBankModal = ({ isOpen, onClose, t, categories, newBankLabel, setNewBankLabel, newBankKey, setNewBankKey, newBankCategory, setNewBankCategory, onConfirm, language }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-[120] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100 animate-scale-up"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                        {t('add_bank_title')}
                    </h3>
                    <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded text-gray-500 transition-colors">
                        <X size={18}/>
                    </button>
                </div>
                
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1.5 font-bold uppercase tracking-wide">{t('label_name')}</label>
                        <input 
                            autoFocus
                            type="text" 
                            className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none bg-gray-50/50 transition-all"
                            placeholder={t('label_placeholder')}
                            value={newBankLabel}
                            onChange={e => setNewBankLabel(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1.5 font-bold uppercase tracking-wide">{t('id_name')}</label>
                        <input 
                            type="text" 
                            className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 font-mono focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none bg-gray-50/50 transition-all"
                            placeholder={t('id_placeholder')}
                            value={newBankKey}
                            onChange={e => setNewBankKey(e.target.value)} 
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1.5 font-bold uppercase tracking-wide">{t('category_label')}</label>
                        <select 
                            value={newBankCategory}
                            onChange={e => setNewBankCategory(e.target.value)}
                            className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none bg-gray-50/50 transition-all appearance-none"
                        >
                            {Object.values(categories).map(cat => (
                                <option key={cat.id} value={cat.id}>{getLocalized(cat.label, language)}</option>
                            ))}
                        </select>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button 
                            onClick={onClose}
                            className="flex-1 px-4 py-3 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-all"
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
 * BanksSidebar 元件 - 負責展示右側詞庫配置
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
  // 移动端模拟拖拽 props
  onTouchDragStart
}) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

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
        className={`
            ${isMobile 
              ? `fixed inset-y-0 right-0 z-[300] w-[85%] max-w-[360px] transform transition-transform duration-500 ease-out shadow-2xl ${isBanksDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`
              : 'relative md:flex flex-col h-full flex-shrink-0 rounded-3xl overflow-hidden border border-white/50 shadow-xl'
            } 
            flex flex-col bg-white overflow-hidden
            ${!isMobile && mobileTab !== 'editor' && mobileTab !== 'banks' ? 'hidden md:flex' : ''}
        `}
        style={{ width: (window.innerWidth >= 768 ? `${bankSidebarWidth}px` : '') }}
      >
        <div className="flex flex-col w-full h-full">
          <div 
              className="hidden md:flex absolute -left-2 top-0 bottom-0 w-4 cursor-col-resize z-40 group items-center justify-center"
              onMouseDown={startResizing}
          >
              <div className="h-12 w-1.5 rounded-full bg-gray-300/60 group-hover:bg-gradient-to-b group-hover:from-orange-400 group-hover:to-orange-500 transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-orange-400/30"></div>
          </div>

      <div className="p-5 border-b border-white/30 bg-white sticky top-0 z-30 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5 text-gray-800">
              <div className="p-2 bg-gradient-to-br from-white to-gray-50 rounded-xl text-gray-600 shadow-md border border-white">
                  <Settings size={17} />
              </div>
              <h2 className="text-base font-bold tracking-tight">{t('bank_config')}</h2>
          </div>
          <button 
              onClick={() => setIsCategoryManagerOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-br from-white/80 to-white/60 hover:from-white hover:to-white text-gray-600 hover:text-gray-800 rounded-xl transition-all duration-300 text-xs font-semibold shadow-sm hover:shadow border border-white/60 hover:border-gray-200"
              title={t('manage_categories')}
          >
              <List size={14} />
              {t('manage_categories')}
          </button>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">{t('bank_subtitle')}</p>
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

