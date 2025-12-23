// VisualEditor 元件 - 可視化編輯器
import React, { useRef } from 'react';
import { CATEGORY_STYLES } from '../constants/styles';

export const VisualEditor = React.forwardRef(({ value, onChange, banks, categories }, ref) => {
  const preRef = useRef(null);

  const handleScroll = (e) => {
    if (preRef.current) {
      preRef.current.scrollTop = e.target.scrollTop;
    }
  };

  const renderHighlights = (text) => {
    if (!text || typeof text !== 'string') return null;
    // Split by {{...}}
    const parts = text.split(/(\{\{[^{}\n]+\}\})/g);
    return parts.map((part, i) => {
      if (part.startsWith('{{') && part.endsWith('}}')) {
        const key = part.slice(2, -2).trim();
        const bank = banks[key];
        const categoryId = bank?.category || 'other';
        const colorKey = categories[categoryId]?.color || 'slate';
        const style = CATEGORY_STYLES[colorKey];
        
        // Style needs to match font metrics exactly, so avoid padding/border that adds width
        return (
          <span key={i} className={`${style.bg} ${style.text} font-bold rounded-sm`}>
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-50">
      {/* Backdrop */}
      <pre
        ref={preRef}
        className="absolute inset-0 p-8 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words pointer-events-none text-gray-800 overflow-hidden m-0"
        style={{ fontFamily: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }} 
        aria-hidden="true"
      >
        {renderHighlights(value)}
        <br />
      </pre>

      {/* Textarea */}
      <textarea
        ref={ref}
        value={value}
        onChange={onChange}
        onScroll={handleScroll}
        className="absolute inset-0 w-full h-full p-8 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words bg-transparent text-transparent caret-gray-800 resize-none focus:outline-none overflow-auto z-10 m-0 selection:bg-orange-200 selection:text-orange-900"
        style={{ fontFamily: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}
        spellCheck={false}
      />
    </div>
  );
});

VisualEditor.displayName = 'VisualEditor';
