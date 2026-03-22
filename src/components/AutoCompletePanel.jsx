import React, { useMemo, useEffect, useRef, useCallback, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import { CATEGORY_STYLES } from '../constants/styles';
import { getLocalized } from '../utils/helpers';

function normalizeOption(opt, language) {
  if (typeof opt === 'string') return opt;
  return getLocalized(opt, language) || opt?.cn || opt?.en || '';
}

export const AutoCompletePanel = React.forwardRef(({
  banks,
  categories,
  language,
  isDarkMode,
  query,
  colonMode,
  activeVarKey,
  optionQuery,
  position,
  onSelectVar,
  onSelectOption,
  onClose,
  visible,
}, ref) => {
  const panelRef = useRef(null);
  const leftListRef = useRef(null);
  const rightListRef = useRef(null);

  const [highlightedVarIdx, setHighlightedVarIdx] = React.useState(0);
  const [highlightedOptIdx, setHighlightedOptIdx] = React.useState(0);
  const [activeColumn, setActiveColumn] = React.useState('left');

  const filteredVars = useMemo(() => {
    if (!banks) return [];
    const q = (query || '').toLowerCase();
    return Object.entries(banks)
      .filter(([key, bank]) => {
        if (!q) return true;
        const label = getLocalized(bank.label, language) || '';
        if (key.toLowerCase().includes(q) || label.toLowerCase().includes(q)) return true;
        // 双层搜索：options 中包含关键词的变量也命中
        const opts = bank.options || [];
        return opts.some(opt => normalizeOption(opt, language).toLowerCase().includes(q));
      })
      .map(([key, bank]) => ({
        key,
        bank,
        categoryId: bank.category || 'other',
      }));
  }, [banks, query, language]);

  const selectedVarKey = useMemo(() => {
    if (colonMode && activeVarKey) return activeVarKey;
    if (filteredVars.length > 0 && highlightedVarIdx < filteredVars.length) {
      return filteredVars[highlightedVarIdx].key;
    }
    return null;
  }, [colonMode, activeVarKey, filteredVars, highlightedVarIdx]);

  const filteredOptions = useMemo(() => {
    if (!selectedVarKey || !banks[selectedVarKey]) return [];
    const opts = banks[selectedVarKey].options || [];
    const oq = colonMode ? (optionQuery || '').toLowerCase() : (query || '').toLowerCase();
    const allNormalized = opts.map(o => normalizeOption(o, language));
    if (!oq) return allNormalized;
    const matched = allNormalized.filter(text => text.toLowerCase().includes(oq));
    // 非冒号模式下如果 query 匹配的是变量名/label 而非 option，展示全部 options
    if (!colonMode && matched.length === 0) return allNormalized;
    return matched.length > 0 ? matched : allNormalized;
  }, [selectedVarKey, banks, colonMode, optionQuery, query, language]);

  useEffect(() => { setHighlightedVarIdx(0); }, [query]);
  useEffect(() => { setHighlightedOptIdx(0); }, [selectedVarKey, optionQuery]);
  useEffect(() => { if (colonMode) setActiveColumn('right'); }, [colonMode]);
  useEffect(() => {
    if (!visible) {
      setHighlightedVarIdx(0);
      setHighlightedOptIdx(0);
      setActiveColumn('left');
    }
  }, [visible]);

  useEffect(() => {
    if (activeColumn === 'left' && leftListRef.current) {
      const el = leftListRef.current.children[highlightedVarIdx];
      el?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedVarIdx, activeColumn]);

  useEffect(() => {
    if (activeColumn === 'right' && rightListRef.current) {
      const el = rightListRef.current.children[highlightedOptIdx];
      el?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedOptIdx, activeColumn]);

  const handleNavigate = useCallback((key, e) => {
    if (key === 'ArrowDown') {
      e?.preventDefault();
      if (activeColumn === 'left') {
        setHighlightedVarIdx(i => Math.min(i + 1, filteredVars.length - 1));
      } else {
        setHighlightedOptIdx(i => Math.min(i + 1, filteredOptions.length - 1));
      }
    } else if (key === 'ArrowUp') {
      e?.preventDefault();
      if (activeColumn === 'left') {
        setHighlightedVarIdx(i => Math.max(i - 1, 0));
      } else {
        setHighlightedOptIdx(i => Math.max(i - 1, 0));
      }
    } else if ((key === 'Tab' && !e?.shiftKey) || (key === 'ArrowRight' && activeColumn === 'left')) {
      e?.preventDefault();
      if (!colonMode && activeColumn === 'left' && filteredOptions.length > 0) {
        setActiveColumn('right');
        setHighlightedOptIdx(0);
      }
    } else if ((key === 'Tab' && e?.shiftKey) || (key === 'ArrowLeft' && activeColumn === 'right')) {
      if (!colonMode && activeColumn === 'right') {
        e?.preventDefault();
        setActiveColumn('left');
      }
    } else if (key === 'Enter') {
      e?.preventDefault();
      if (activeColumn === 'left' && filteredVars.length > 0) {
        onSelectVar(filteredVars[highlightedVarIdx].key);
      } else if (activeColumn === 'right' && filteredOptions.length > 0) {
        onSelectOption(selectedVarKey, filteredOptions[highlightedOptIdx]);
      }
    } else if (key === 'Escape') {
      e?.preventDefault();
      onClose();
    }
  }, [activeColumn, colonMode, filteredVars, filteredOptions, highlightedVarIdx, highlightedOptIdx, selectedVarKey, onSelectVar, onSelectOption, onClose]);

  useImperativeHandle(ref, () => ({
    handleNavigate,
  }), [handleNavigate]);

  useEffect(() => {
    if (!visible) return;
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside, true);
    return () => document.removeEventListener('mousedown', handleClickOutside, true);
  }, [visible, onClose]);

  if (!visible || !position) return null;

  const panelWidth = colonMode ? 260 : Math.min(480, window.innerWidth - 24);
  const panelHeight = 340;
  const viewH = window.innerHeight;
  const viewW = window.innerWidth;

  const showAbove = position.top + panelHeight > viewH && position.top - panelHeight - 8 > 0;
  const finalTop = showAbove ? position.top - panelHeight - 8 : position.top;
  const finalLeft = Math.max(8, Math.min(position.left, viewW - panelWidth - 8));

  const getVarItemClass = (idx) => {
    const isActive = activeColumn === 'left' && highlightedVarIdx === idx;
    if (isActive) return isDarkMode
      ? 'bg-orange-500/15 text-orange-300 font-semibold shadow-sm'
      : 'bg-white shadow-sm text-orange-700 font-semibold';
    return isDarkMode
      ? 'text-gray-400 hover:bg-white/5'
      : 'text-gray-600 hover:bg-white/60';
  };

  const getOptItemClass = (idx) => {
    const isActive = activeColumn === 'right' && highlightedOptIdx === idx;
    if (isActive) return isDarkMode
      ? 'bg-orange-500/15 text-orange-300 font-semibold shadow-sm'
      : 'bg-white shadow-sm text-orange-700 font-semibold';
    return isDarkMode
      ? 'text-gray-400 hover:bg-white/5'
      : 'text-gray-600 hover:bg-white/60';
  };

  const scrollAreaStyle = {
    background: isDarkMode
      ? 'linear-gradient(#252525, #252525) padding-box, linear-gradient(0deg, #646464 0%, rgba(0, 0, 0, 0) 20%) border-box'
      : 'linear-gradient(#E8E3DD, #E8E3DD) padding-box, linear-gradient(0deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%) border-box',
    border: '1px solid transparent',
    boxShadow: 'inset 0px 2px 4px 0px rgba(0, 0, 0, 0.15)',
  };

  const content = (
    <div
      ref={panelRef}
      data-autocomplete-panel
      className={`fixed z-[9999] overflow-hidden flex flex-col ${showAbove ? 'animate-autocomplete-in-up' : 'animate-autocomplete-in'}`}
      style={{
        top: finalTop,
        left: finalLeft,
        width: panelWidth,
        maxHeight: panelHeight,
        borderRadius: '24px',
        backdropFilter: 'blur(40px) saturate(180%)',
        backgroundColor: isDarkMode ? 'rgba(36, 33, 32, 0.98)' : 'rgba(255, 255, 255, 0.95)',
        border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
        boxShadow: isDarkMode
          ? '0 20px 50px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08)'
          : '0 20px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.02)',
      }}
    >
      {/* Header */}
      <div className={`px-5 pt-4 pb-2 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        <span className="text-[15px] font-bold tracking-tight">
          {colonMode && activeVarKey
            ? (getLocalized(banks[activeVarKey]?.label, language) || activeVarKey)
            : (language === 'cn' ? '插入变量' : 'Insert Variable')
          }
        </span>
        {query && !colonMode && (
          <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${isDarkMode ? 'bg-white/10 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
            {query}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="px-3 pb-3 flex-1 min-h-0">
        <div
          className="flex overflow-hidden rounded-2xl custom-scrollbar"
          style={{ ...scrollAreaStyle, maxHeight: panelHeight - 60 }}
        >
          {/* Left column: Variable list */}
          {!colonMode && (
            <div
              className="flex-shrink-0 overflow-y-auto custom-scrollbar"
              style={{ width: '45%', maxHeight: panelHeight - 60, borderRight: isDarkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.04)' }}
            >
              <div className={`px-3 py-2 text-[10px] font-black uppercase tracking-widest sticky top-0 z-10 ${isDarkMode ? 'text-gray-600 bg-[#252525]' : 'text-gray-400 bg-[#E8E3DD]'}`}>
                {language === 'cn' ? '变量' : 'Variables'}
              </div>
              <div ref={leftListRef} className="px-1.5 pb-2 space-y-0.5">
                {filteredVars.length === 0 ? (
                  <div className={`px-3 py-6 text-xs text-center ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                    {language === 'cn' ? '无匹配变量' : 'No match'}
                  </div>
                ) : (
                  filteredVars.map((item, idx) => {
                    const cat = categories[item.categoryId];
                    const colorKey = cat?.color || 'slate';
                    const catStyle = CATEGORY_STYLES[colorKey];
                    return (
                      <div
                        key={item.key}
                        className={`px-3 py-2 cursor-pointer flex items-center gap-2 text-sm transition-all duration-150 rounded-xl ${getVarItemClass(idx)}`}
                        onMouseEnter={() => {
                          setHighlightedVarIdx(idx);
                          if (activeColumn !== 'left') setActiveColumn('left');
                        }}
                        onClick={() => onSelectVar(item.key)}
                      >
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${catStyle.dotBg}`} />
                        <span className="flex flex-col min-w-0 gap-0.5">
                          <span className="truncate leading-tight">{getLocalized(item.bank.label, language)}</span>
                          <code className={`text-[10px] font-mono truncate leading-tight ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>{item.key}</code>
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* Right column: Options */}
          <div className="flex-1 overflow-y-auto custom-scrollbar" style={{ maxHeight: panelHeight - 60 }}>
            <div className={`px-3 py-2 text-[10px] font-black uppercase tracking-widest sticky top-0 z-10 ${isDarkMode ? 'text-gray-600 bg-[#252525]' : 'text-gray-400 bg-[#E8E3DD]'}`}>
              {selectedVarKey
                ? (getLocalized(banks[selectedVarKey]?.label, language) || selectedVarKey)
                : (language === 'cn' ? '选项' : 'Options')
              }
            </div>
            <div ref={rightListRef} className="px-1.5 pb-2 space-y-0.5">
              {!selectedVarKey ? (
                <div className={`px-3 py-8 text-xs text-center ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                  {language === 'cn' ? '← 选择变量查看选项' : '← Select a variable'}
                </div>
              ) : filteredOptions.length === 0 ? (
                <div className={`px-3 py-6 text-xs text-center ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                  {language === 'cn' ? '无匹配选项' : 'No match'}
                </div>
              ) : (
                filteredOptions.map((text, idx) => (
                  <div
                    key={`${selectedVarKey}-${idx}`}
                    className={`px-3 py-2 cursor-pointer text-sm transition-all duration-150 rounded-xl truncate ${getOptItemClass(idx)}`}
                    onMouseEnter={() => {
                      setHighlightedOptIdx(idx);
                      if (activeColumn !== 'right') setActiveColumn('right');
                    }}
                    onClick={() => onSelectOption(selectedVarKey, text)}
                  >
                    {text}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
});

AutoCompletePanel.displayName = 'AutoCompletePanel';
