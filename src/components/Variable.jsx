// Variable 元件 - 可點擊的變數詞
import React, { useState, useEffect } from 'react';
import { Check, Plus, X } from 'lucide-react';
import { CATEGORY_STYLES, PREMIUM_STYLES } from '../constants/styles';
import { getLocalized } from '../utils/helpers';

export const Variable = ({ 
  id, 
  index, 
  config, 
  currentVal, 
  isOpen, 
  onToggle, 
  onSelect, 
  onAddCustom, 
  popoverRef, 
  categories, 
  t,
  language
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [customVal, setCustomVal] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  // Determine styles based on category
  const categoryId = config?.category || 'other';
  const colorKey = categories[categoryId]?.color || 'slate';
  const style = CATEGORY_STYLES[colorKey] || CATEGORY_STYLES.slate;
  const premium = PREMIUM_STYLES[colorKey] || PREMIUM_STYLES.slate;

  // Reset state when popover closes
  useEffect(() => {
    if (!isOpen) {
      setIsAdding(false);
      setCustomVal("");
    }
  }, [isOpen]);

  if (!config) {
    return (
      <span 
        data-export-pill="true"
        className="text-gray-400 bg-gray-50 px-1 rounded border border-gray-200 text-xs" 
        title={`${t('undefined_var')}: ${id}`}
      >
        [{id}?]
      </span>
    );
  }

  const handleAddSubmit = () => {
    if (customVal.trim()) {
      onAddCustom(customVal.trim());
      setCustomVal("");
      setIsAdding(false);
    }
  };

  const isSelected = (opt) => {
    if (!currentVal) return false;
    if (typeof currentVal === 'string' && typeof opt === 'string') {
      return currentVal === opt;
    }
    if (typeof currentVal === 'object' && typeof opt === 'object') {
      return currentVal['zh-tw'] === opt['zh-tw'] && currentVal.en === opt.en;
    }
    // Fallback for mixed types
    const valStr = typeof currentVal === 'object' ? currentVal['zh-tw'] : currentVal;
    const optStr = typeof opt === 'object' ? opt['zh-tw'] : opt;
    return valStr === optStr;
  };

  return (
    <div className="relative inline-block mx-1.5 align-baseline group text-base">
      <span 
        data-export-pill="true"
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          cursor-pointer px-3 py-1 rounded-full transition-all duration-300 select-none font-medium text-white
          ${isOpen ? `ring-2 ring-offset-2 ${style.ring}` : ''}
          hover:scale-105 active:scale-95
        `}
        style={{
          background: `linear-gradient(135deg, ${premium.from} 0%, ${premium.to} 100%)`,
          boxShadow: isHovered 
            ? `inset 0px 2px 4px 0px rgba(255, 255, 255, 0.2), 0 4px 12px ${premium.glowColor}`
            : `inset 0px 2px 4px 0px rgba(0, 0, 0, 0.1), 0 2px 5px ${premium.shadowColor}`,
          border: '1px solid rgba(255, 255, 255, 0.3)',
          textShadow: '0 1px 2px rgba(0,0,0,0.1)'
        }}
      >
        {getLocalized(currentVal, language) || <span className="opacity-70 italic">{t('please_select')}</span>}
      </span>
      
      {/* Popover - 詞庫選擇器 */}
      {isOpen && (
        <div 
          ref={popoverRef}
          className="absolute left-0 top-full mt-2 w-72 rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col text-left animate-in fade-in zoom-in-95 duration-200 origin-top-left"
          style={{ 
            minWidth: '280px',
            backdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow: `0 10px 40px -10px ${premium.shadowColor}, 0 0 0 1px rgba(0,0,0,0.05)`
          }}
        >
          <div className="px-4 py-3 border-b border-gray-100/50 flex justify-between items-center bg-white/50 backdrop-blur-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              {t('select')} {getLocalized(config.label, language)}
            </span>
            <span 
              className="text-[10px] px-2 py-0.5 rounded-full font-bold text-white shadow-sm"
              style={{ background: `linear-gradient(135deg, ${premium.from}, ${premium.to})` }}
            >
              {getLocalized(categories[categoryId]?.label, language) || categoryId}
            </span>
          </div>
          
          <div className="max-h-64 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            {config.options.length > 0 ? config.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => onSelect(opt)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group flex items-center justify-between
                  ${isSelected(opt) 
                    ? 'bg-white shadow-md ring-1 ring-black/5 font-bold' 
                    : 'hover:bg-white/60 hover:shadow-sm text-gray-600 hover:text-gray-900'}`}
                style={isSelected(opt) ? { color: premium.to } : {}}
              >
                <span>{getLocalized(opt, language)}</span>
                {isSelected(opt) && <Check size={14} style={{ color: premium.to }} />}
              </button>
            )) : (
              <div className="px-3 py-8 text-center text-gray-400 text-sm italic">
                {t('no_options')}
              </div>
            )}
          </div>
          
          {/* Add Custom Option Footer */}
          <div className="p-2 border-t border-gray-100/50 bg-white/50 backdrop-blur-sm">
            {isAdding ? (
              <div className="flex gap-2">
                <input 
                  autoFocus
                  type="text"
                  value={customVal}
                  onChange={(e) => setCustomVal(e.target.value)}
                  placeholder={t('add_option_placeholder')}
                  className="flex-1 min-w-0 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white/80"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSubmit()}
                />
                <button 
                  onClick={handleAddSubmit}
                  disabled={!customVal.trim()}
                  className="px-3 py-1.5 bg-gray-900 text-white rounded-lg text-xs font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors shadow-sm"
                >
                  {t('confirm')}
                </button>
              </div>
            ) : (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAdding(true);
                }}
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs text-gray-500 hover:text-orange-600 hover:bg-orange-50/50 rounded-lg border border-dashed border-gray-300 hover:border-orange-300 transition-all font-medium"
              >
                <Plus size={12} /> {t('add_custom_option')}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
