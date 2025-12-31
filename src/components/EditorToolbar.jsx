// EditorToolbar 组件 - 编辑器工具栏
import React from 'react';
import { Plus, Undo, Redo, Link, Unlink } from 'lucide-react';
import { PremiumButton } from './PremiumButton';

export const EditorToolbar = ({ 
  onInsertClick, 
  canUndo, 
  canRedo, 
  onUndo, 
  onRedo, 
  t, 
  isDarkMode,
  // 分组功能相关
  cursorInVariable = false,
  currentGroupId = null,
  onSetGroup,
  onRemoveGroup
}) => {
  return (
    <div className={`h-14 border-b backdrop-blur-sm flex items-center justify-between px-4 flex-shrink-0 z-20 ${isDarkMode ? 'border-white/5 bg-white/5 text-gray-300' : 'border-gray-200 bg-white/80'}`}>
      {/* Left: Undo/Redo & Grouping */}
      <div className="flex items-center gap-3">
        {/* Undo/Redo */}
        <div className="flex items-center gap-2">
          <PremiumButton 
            onClick={onUndo} 
            disabled={!canUndo} 
            title={t('undo') || "撤消"} 
            icon={Undo} 
            isDarkMode={isDarkMode}
            className="!p-1" 
          />
          <PremiumButton 
            onClick={onRedo} 
            disabled={!canRedo} 
            title={t('redo') || "重做"} 
            icon={Redo} 
            isDarkMode={isDarkMode}
            className="!p-1" 
          />
        </div>

        {/* Divider */}
        <div className={`h-6 w-px ${isDarkMode ? 'bg-white/10' : 'bg-gray-300'}`} />

        {/* Grouping Buttons */}
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
            {t('link_group') || '联动组'}:
          </span>
          <div className={`premium-toggle-container ${isDarkMode ? 'dark' : 'light'}`}>
            {[1, 2, 3, 4, 5].map(num => (
              <button
                key={num}
                onClick={() => onSetGroup(num)}
                disabled={!cursorInVariable}
                className={`
                  premium-toggle-item ${isDarkMode ? 'dark' : 'light'}
                  !px-3 !py-1 min-w-[32px]
                  ${currentGroupId === num.toString() ? 'is-active' : ''}
                  ${!cursorInVariable ? 'opacity-30 cursor-not-allowed' : ''}
                `}
                title={cursorInVariable ? `${t('set_group') || '设置为联动组'} ${num}` : t('place_cursor_in_variable') || '请将光标置于变量内'}
              >
                {num}
              </button>
            ))}
            
            {/* Divider */}
            {currentGroupId && <div className={`w-px h-4 self-center mx-1 ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`} />}

            {/* Remove Group Button - Integrated into the same container */}
            {currentGroupId && (
              <button
                onClick={onRemoveGroup}
                disabled={!cursorInVariable}
                className={`
                  premium-toggle-item ${isDarkMode ? 'dark' : 'light'}
                  !px-3 !py-1 text-red-500 hover:text-red-600 hover:bg-red-500/10
                  ${!cursorInVariable ? 'opacity-30 cursor-not-allowed' : ''}
                `}
                title={t('remove_group') || "解除关联"}
              >
                <Unlink size={14} strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right: Insert & Tools */}
      <div className="flex items-center gap-2">
        <PremiumButton 
          onClick={onInsertClick} 
          icon={Plus} 
          isDarkMode={isDarkMode}
        >
          {t('insert')}
        </PremiumButton>
      </div>
    </div>
  );
};
