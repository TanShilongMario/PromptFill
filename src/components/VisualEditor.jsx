// VisualEditor 组件 - ContentEditable 可视化编辑器
import React, { useRef, useEffect, useCallback, useImperativeHandle, useState } from 'react';
import { CATEGORY_STYLES } from '../constants/styles';
import { AutoCompletePanel } from './AutoCompletePanel';

// ============================================================
// 核心工具函数：纯文本 ↔ DOM 双向转换 & 光标偏移映射
// ============================================================

const PILL_ATTR = 'data-pill-var';
const PILL_REGEX = /(\{\{[^{}\n]+\}\})/g;

function domToText(element) {
  if (!element) return '';
  let text = '';
  for (const node of element.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.hasAttribute(PILL_ATTR)) {
        text += node.getAttribute(PILL_ATTR);
      } else if (node.tagName === 'BR') {
        text += '\n';
      } else {
        text += domToText(node);
      }
    }
  }
  return text;
}

function getTextOffset(element) {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0 || !element) return null;
  const range = sel.getRangeAt(0);
  if (!element.contains(range.startContainer) && element !== range.startContainer) return null;

  const calcOffset = (container, offset) => {
    let pos = 0;
    const walk = (node) => {
      if (node === container) {
        if (node.nodeType === Node.TEXT_NODE) { pos += offset; return true; }
        let childIdx = 0;
        for (const child of node.childNodes) {
          if (childIdx === offset) return true;
          if (walk(child)) return true;
          childIdx++;
        }
        return true;
      }
      if (node.nodeType === Node.TEXT_NODE) {
        pos += node.textContent.length;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.hasAttribute(PILL_ATTR)) { pos += node.getAttribute(PILL_ATTR).length; }
        else if (node.tagName === 'BR') { pos += 1; }
        else { for (const child of node.childNodes) { if (walk(child)) return true; } }
      }
      return false;
    };
    walk(element);
    return pos;
  };

  return {
    start: calcOffset(range.startContainer, range.startOffset),
    end: calcOffset(range.endContainer, range.endOffset),
  };
}

function setTextOffset(element, start, end) {
  if (!element) return;
  if (end === undefined) end = start;

  const findPosition = (targetOffset) => {
    let pos = 0;
    const walk = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const len = node.textContent.length;
        if (pos + len >= targetOffset) return { node, offset: targetOffset - pos };
        pos += len;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.hasAttribute(PILL_ATTR)) {
          const pillLen = node.getAttribute(PILL_ATTR).length;
          if (pos + pillLen >= targetOffset) {
            const parent = node.parentNode;
            const idx = Array.from(parent.childNodes).indexOf(node);
            return targetOffset <= pos ? { node: parent, offset: idx } : { node: parent, offset: idx + 1 };
          }
          pos += pillLen;
        } else if (node.tagName === 'BR') {
          if (pos + 1 >= targetOffset) {
            const parent = node.parentNode;
            const idx = Array.from(parent.childNodes).indexOf(node);
            return targetOffset <= pos ? { node: parent, offset: idx } : { node: parent, offset: idx + 1 };
          }
          pos += 1;
        } else {
          for (const child of node.childNodes) { const r = walk(child); if (r) return r; }
        }
      }
      return null;
    };
    return walk(element) || { node: element, offset: element.childNodes.length };
  };

  const startPos = findPosition(start);
  const endPos = start === end ? startPos : findPosition(end);
  const sel = window.getSelection();
  const range = document.createRange();
  range.setStart(startPos.node, startPos.offset);
  range.setEnd(endPos.node, endPos.offset);
  sel.removeAllRanges();
  sel.addRange(range);
}

// ============================================================
// 解析工具
// ============================================================

function parseVariableName(varName) {
  const match = varName.match(/^(.+?)(?:_(\d+))?$/);
  if (match) return { baseKey: match[1], groupId: match[2] || null };
  return { baseKey: varName, groupId: null };
}

function parseInlineSyntax(raw) {
  const colonIdx = raw.indexOf(':');
  if (colonIdx === -1) return { varPart: raw.trim(), inlineVal: null };
  return { varPart: raw.slice(0, colonIdx).trim(), inlineVal: raw.slice(colonIdx + 1).trim() };
}

function escapeHTML(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function findVariableAtCursor(text, cursorPos) {
  if (!text || cursorPos == null) return null;
  const regex = /\{\{[^{}\n]+\}\}/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (cursorPos > match.index && cursorPos < match.index + match[0].length) {
      return { start: match.index, end: match.index + match[0].length };
    }
  }
  return null;
}

/**
 * 检测光标前是否处于补全触发状态
 * 返回 { triggerPos, triggerChar, rawQuery } 或 null
 */
function detectAutoComplete(text, cursorPos, disableSlash = false) {
  if (!text || cursorPos == null || cursorPos === 0) return null;
  const before = text.substring(0, cursorPos);

  // 向前扫描找最近的 { 或 /（不跨行、不跨 }）
  for (let i = before.length - 1; i >= 0; i--) {
    const ch = before[i];
    if (ch === '\n' || ch === '}') return null;
    if (ch === '{' || ch === '/') {
      // 移动端禁用 / 触发（软键盘输入 / 体验差）
      if (ch === '/' && disableSlash) return null;
      // 确保 { 前面不是另一个 {（避免在 {{ 内部重复触发）
      if (ch === '{' && i > 0 && before[i - 1] === '{') return null;
      const rawQuery = before.substring(i + 1);
      return { triggerPos: i, triggerChar: ch, rawQuery };
    }
  }
  return null;
}

function getCursorPixelPosition() {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return null;
  const range = sel.getRangeAt(0).cloneRange();
  range.collapse(true);
  const rect = range.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0 && rect.top === 0) return null;
  return { top: rect.bottom + 4, left: rect.left };
}

// ============================================================
// ContentEditable 核心编辑器
// ============================================================

const ContentEditableEditor = React.forwardRef(({
  value,
  onChange,
  banks,
  categories,
  language,
  isDarkMode,
  onInteraction,
  onFocus,
  onUndo,
  onRedo,
  className,
  style,
  disableSlashTrigger = false,
}, forwardedRef) => {
  const editableRef = useRef(null);
  const isComposingRef = useRef(false);
  const lastValueRef = useRef(value);
  const suppressSyncRef = useRef(false);
  const editingVarRef = useRef(null);
  const panelRef = useRef(null);

  // Autocomplete state
  const [acVisible, setAcVisible] = useState(false);
  const [acPosition, setAcPosition] = useState(null);
  const [acQuery, setAcQuery] = useState('');
  const [acColonMode, setAcColonMode] = useState(false);
  const [acActiveVarKey, setAcActiveVarKey] = useState(null);
  const [acOptionQuery, setAcOptionQuery] = useState('');
  const acTriggerRef = useRef(null); // { triggerPos, triggerChar }

  const closeAutoComplete = useCallback(() => {
    setAcVisible(false);
    acTriggerRef.current = null;
  }, []);

  const buildPillHTML = useCallback((fullMatch, rawInner, banks_, categories_, isDark) => {
    const { varPart } = parseInlineSyntax(rawInner);
    const parsed = parseVariableName(varPart);
    const baseKey = parsed.baseKey;
    const bank = banks_[baseKey] || banks_[varPart];
    const categoryId = bank?.category || 'other';
    const colorKey = categories_[categoryId]?.color || 'slate';
    const catStyle = CATEGORY_STYLES[colorKey];

    const escapedFullMatch = escapeAttr(fullMatch);
    const pillClasses = isDark
      ? `${catStyle.text} rounded-md px-1 py-[1px] mx-[1px] border border-white/[0.08]`
      : `${catStyle.bg} ${catStyle.text} rounded-md px-1 py-[1px] mx-[1px] border ${catStyle.border}`;
    const pillStyle = isDark ? `background:rgba(255,255,255,0.06);` : ``;
    const bracketStyle = isDark ? `opacity:0.3;` : `opacity:0.35;`;

    return `<span ${PILL_ATTR}="${escapedFullMatch}" data-export-pill="true" contenteditable="false" class="${pillClasses}" style="${pillStyle}display:inline;white-space:nowrap;font-size:inherit;line-height:inherit;vertical-align:baseline;cursor:default;"><span style="${bracketStyle}">{{</span>${escapeHTML(rawInner)}<span style="${bracketStyle}">}}</span></span>`;
  }, []);

  const textToHTML = useCallback((text, banks_, categories_, isDark, editingRange) => {
    if (!text) return '';
    const lines = text.split('\n');
    let charPos = 0;
    return lines.map((line, lineIdx) => {
      if (!line) { charPos += 1; return lineIdx < lines.length - 1 ? '<br>' : ''; }
      const parts = line.split(PILL_REGEX);
      let inLinePos = charPos;
      const html = parts.map(part => {
        const partStart = inLinePos;
        const partEnd = inLinePos + part.length;
        inLinePos = partEnd;
        if (part.startsWith('{{') && part.endsWith('}}')) {
          const rawInner = part.slice(2, -2);
          if (editingRange && partStart === editingRange.start && partEnd === editingRange.end) {
            const { varPart } = parseInlineSyntax(rawInner);
            const parsed = parseVariableName(varPart);
            const baseKey = parsed.baseKey;
            const bank = banks_[baseKey] || banks_[varPart];
            const categoryId = bank?.category || 'other';
            const colorKey = categories_[categoryId]?.color || 'slate';
            const catStyle = CATEGORY_STYLES[colorKey];
            return `<span class="${catStyle.text}" data-editing-var="true">${escapeHTML(part)}</span>`;
          }
          return buildPillHTML(part, rawInner, banks_, categories_, isDark);
        }
        return escapeHTML(part);
      }).join('');
      charPos += line.length + (lineIdx < lines.length - 1 ? 1 : 0);
      return html + (lineIdx < lines.length - 1 ? '<br>' : '');
    }).join('');
  }, [buildPillHTML]);

  const syncEditingState = useCallback((text, cursorPos) => {
    const newRange = findVariableAtCursor(text, cursorPos);
    const oldRange = editingVarRef.current;
    const rangeChanged = (newRange == null) !== (oldRange == null) ||
      (newRange && oldRange && (newRange.start !== oldRange.start || newRange.end !== oldRange.end));
    if (rangeChanged) {
      editingVarRef.current = newRange;
      if (editableRef.current) {
        const html = textToHTML(text, banks, categories, isDarkMode, newRange);
        editableRef.current.innerHTML = html || '<br>';
        if (cursorPos != null) {
          try { setTextOffset(editableRef.current, cursorPos); } catch (_) {}
        }
      }
    }
  }, [banks, categories, isDarkMode, textToHTML]);

  // Sync DOM when value prop changes from outside
  useEffect(() => {
    if (!editableRef.current) return;
    if (isComposingRef.current) return;
    if (suppressSyncRef.current) { suppressSyncRef.current = false; return; }
    const currentText = domToText(editableRef.current);
    if (currentText === value) { lastValueRef.current = value; return; }
    const offsetInfo = getTextOffset(editableRef.current);
    editingVarRef.current = null;
    const html = textToHTML(value, banks, categories, isDarkMode, null);
    editableRef.current.innerHTML = html || '<br>';
    lastValueRef.current = value;
    if (offsetInfo && document.activeElement === editableRef.current) {
      try {
        setTextOffset(editableRef.current,
          Math.min(offsetInfo.start, (value || '').length),
          Math.min(offsetInfo.end, (value || '').length));
      } catch (_) {}
    }
  }, [value, banks, categories, isDarkMode, textToHTML]);

  const emitChange = useCallback((newText) => {
    lastValueRef.current = newText;
    suppressSyncRef.current = true;
    onChange({ target: { value: newText } });
  }, [onChange]);

  /**
   * 更新补全面板状态
   */
  const updateAutoComplete = useCallback((text, cursorPos) => {
    const ac = detectAutoComplete(text, cursorPos, disableSlashTrigger);
    if (!ac) {
      if (acVisible) closeAutoComplete();
      return;
    }

    const pos = getCursorPixelPosition();
    if (!pos) { closeAutoComplete(); return; }

    acTriggerRef.current = { triggerPos: ac.triggerPos, triggerChar: ac.triggerChar };

    const colonIdx = ac.rawQuery.indexOf(':');
    if (colonIdx !== -1) {
      const varKey = ac.rawQuery.substring(0, colonIdx).trim();
      const optQuery = ac.rawQuery.substring(colonIdx + 1).trim();
      if (banks[varKey]) {
        setAcColonMode(true);
        setAcActiveVarKey(varKey);
        setAcOptionQuery(optQuery);
        setAcQuery(varKey);
      } else {
        setAcColonMode(false);
        setAcActiveVarKey(null);
        setAcOptionQuery('');
        setAcQuery(ac.rawQuery);
      }
    } else {
      setAcColonMode(false);
      setAcActiveVarKey(null);
      setAcOptionQuery('');
      setAcQuery(ac.rawQuery);
    }

    setAcPosition(pos);
    setAcVisible(true);
  }, [acVisible, banks, closeAutoComplete]);

  // Input handler
  const handleInput = useCallback(() => {
    if (isComposingRef.current) return;
    if (!editableRef.current) return;

    const newText = domToText(editableRef.current);
    if (newText === lastValueRef.current) return;

    const offset = getTextOffset(editableRef.current);
    const cursorPos = offset ? offset.start : null;
    const cursorRange = findVariableAtCursor(newText, cursorPos);
    editingVarRef.current = cursorRange;

    const html = textToHTML(newText, banks, categories, isDarkMode, cursorRange);
    editableRef.current.innerHTML = html || '<br>';
    if (offset) {
      try { setTextOffset(editableRef.current, offset.start, offset.end); } catch (_) {}
    }

    emitChange(newText);

    // Update autocomplete after emitting change
    if (cursorPos != null) {
      updateAutoComplete(newText, cursorPos);
    }
  }, [emitChange, banks, categories, isDarkMode, textToHTML, updateAutoComplete]);

  const handleCompositionStart = useCallback(() => { isComposingRef.current = true; }, []);
  const handleCompositionEnd = useCallback(() => { isComposingRef.current = false; handleInput(); }, [handleInput]);

  const handlePaste = useCallback((e) => {
    e.preventDefault();
    document.execCommand('insertText', false, e.clipboardData.getData('text/plain'));
  }, []);

  // ---- Autocomplete insertion ----

  const performInsert = useCallback((insertText) => {
    if (!editableRef.current || !acTriggerRef.current) return;
    const { triggerPos } = acTriggerRef.current;
    const text = domToText(editableRef.current);
    const offset = getTextOffset(editableRef.current);
    const cursorPos = offset ? offset.start : text.length;

    const before = text.substring(0, triggerPos);
    const after = text.substring(cursorPos);
    const newText = before + insertText + after;
    const newCursorPos = before.length + insertText.length;

    editingVarRef.current = null;
    const html = textToHTML(newText, banks, categories, isDarkMode, null);
    editableRef.current.innerHTML = html || '<br>';
    try { setTextOffset(editableRef.current, newCursorPos); } catch (_) {}

    emitChange(newText);
    closeAutoComplete();
    editableRef.current.focus();
  }, [banks, categories, isDarkMode, textToHTML, emitChange, closeAutoComplete]);

  const handleSelectVar = useCallback((varKey) => {
    const triggerChar = acTriggerRef.current?.triggerChar;
    if (triggerChar === '/') {
      performInsert(`{{${varKey}}} `);
    } else {
      // { triggered — the { is part of the trigger, we need {{
      performInsert(`{{${varKey}}} `);
    }
  }, [performInsert]);

  const handleSelectOption = useCallback((varKey, optionValue) => {
    if (acColonMode) {
      // In colon mode: we already have {varKey: , replace everything from trigger
      performInsert(`{{${varKey}: ${optionValue}}} `);
    } else {
      performInsert(`{{${varKey}: ${optionValue}}} `);
    }
  }, [acColonMode, performInsert]);

  // ---- Click ----

  const handleClick = useCallback((e) => {
    if (onInteraction) onInteraction();

    const pillNode = e.target.closest?.(`[${PILL_ATTR}]`);
    if (pillNode && editableRef.current?.contains(pillNode)) {
      e.preventDefault();
      const text = lastValueRef.current || '';
      let pos = 0;
      const walk = (node) => {
        if (node === pillNode) return true;
        if (node.nodeType === Node.TEXT_NODE) { pos += node.textContent.length; }
        else if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.hasAttribute(PILL_ATTR)) { pos += node.getAttribute(PILL_ATTR).length; }
          else if (node.tagName === 'BR') { pos += 1; }
          else { for (const child of node.childNodes) { if (walk(child)) return true; } }
        }
        return false;
      };
      walk(editableRef.current);
      const pillText = pillNode.getAttribute(PILL_ATTR);
      const varRange = { start: pos, end: pos + pillText.length };
      const cursorTarget = pos + pillText.length - 2;
      editingVarRef.current = varRange;
      const html = textToHTML(text, banks, categories, isDarkMode, varRange);
      editableRef.current.innerHTML = html || '<br>';
      try { setTextOffset(editableRef.current, cursorTarget); } catch (_) {}
      closeAutoComplete();
      return;
    }

    requestAnimationFrame(() => {
      if (!editableRef.current) return;
      const text = domToText(editableRef.current);
      const off = getTextOffset(editableRef.current);
      if (!off) return;
      syncEditingState(text, off.start);
      // Close autocomplete if clicking elsewhere
      if (acVisible) {
        const ac = detectAutoComplete(text, off.start);
        if (!ac) closeAutoComplete();
      }
    });
  }, [onInteraction, banks, categories, isDarkMode, textToHTML, syncEditingState, acVisible, closeAutoComplete]);

  const handleKeyUp = useCallback((e) => {
    if (acVisible) return; // panel handles navigation
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key)) {
      if (!editableRef.current) return;
      const text = domToText(editableRef.current);
      const off = getTextOffset(editableRef.current);
      if (!off) return;
      syncEditingState(text, off.start);
    }
  }, [syncEditingState, acVisible]);

  const handleKeyDown = useCallback((e) => {
    // Autocomplete panel navigation
    if (acVisible && panelRef.current) {
      if (['ArrowDown', 'ArrowUp', 'Tab', 'ArrowRight', 'ArrowLeft', 'Enter', 'Escape'].includes(e.key)) {
        panelRef.current.handleNavigate(e.key, e);
        return;
      }
    }

    // Undo / Redo
    if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
      e.preventDefault(); editingVarRef.current = null; closeAutoComplete();
      if (onUndo) onUndo(); return;
    }
    if ((e.metaKey || e.ctrlKey) && e.key === 'z' && e.shiftKey) {
      e.preventDefault(); editingVarRef.current = null; closeAutoComplete();
      if (onRedo) onRedo(); return;
    }
    if ((e.metaKey || e.ctrlKey) && e.key === 'y') {
      e.preventDefault(); editingVarRef.current = null; closeAutoComplete();
      if (onRedo) onRedo(); return;
    }

    if (e.key === 'Escape' && acVisible) {
      e.preventDefault(); closeAutoComplete(); return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      document.execCommand('insertLineBreak');
    }
  }, [acVisible, onUndo, onRedo, closeAutoComplete]);

  const handleFocusEvent = useCallback(() => {
    if (onFocus) onFocus();
    if (onInteraction) onInteraction();
  }, [onFocus, onInteraction]);

  const handleBlur = useCallback(() => {
    // Delay to allow panel click to fire first
    setTimeout(() => {
      if (document.activeElement === editableRef.current) return;
      // If autocomplete panel is focused, keep it open
      const acPanelEl = document.querySelector('[data-autocomplete-panel]');
      if (acPanelEl && acPanelEl.contains(document.activeElement)) return;

      if (editingVarRef.current && editableRef.current) {
        editingVarRef.current = null;
        const text = domToText(editableRef.current);
        const html = textToHTML(text, banks, categories, isDarkMode, null);
        editableRef.current.innerHTML = html || '<br>';
        lastValueRef.current = text;
      }
      closeAutoComplete();
    }, 100);
  }, [banks, categories, isDarkMode, textToHTML, closeAutoComplete]);

  useImperativeHandle(forwardedRef, () => ({
    get value() { return domToText(editableRef.current); },
    get selectionStart() { const off = getTextOffset(editableRef.current); return off ? off.start : 0; },
    get selectionEnd() { const off = getTextOffset(editableRef.current); return off ? off.end : 0; },
    setSelectionRange(start, end) { setTextOffset(editableRef.current, start, end); },
    focus() { editableRef.current?.focus(); },
    get scrollTop() { return editableRef.current?.scrollTop || 0; },
    set scrollTop(v) { if (editableRef.current) editableRef.current.scrollTop = v; },
    get scrollHeight() { return editableRef.current?.scrollHeight || 0; },
    addEventListener(...args) { editableRef.current?.addEventListener(...args); },
    removeEventListener(...args) { editableRef.current?.removeEventListener(...args); },
    get _el() { return editableRef.current; },
  }), []);

  return (
    <>
      <div
        ref={editableRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onFocus={handleFocusEvent}
        onBlur={handleBlur}
        onClick={handleClick}
        spellCheck={false}
        className={className}
        style={style}
        role="textbox"
        aria-multiline="true"
      />
      <AutoCompletePanel
        ref={panelRef}
        banks={banks}
        categories={categories}
        language={language}
        isDarkMode={isDarkMode}
        query={acQuery}
        colonMode={acColonMode}
        activeVarKey={acActiveVarKey}
        optionQuery={acOptionQuery}
        position={acPosition}
        onSelectVar={handleSelectVar}
        onSelectOption={handleSelectOption}
        onClose={closeAutoComplete}
        visible={acVisible}
      />
    </>
  );
});

ContentEditableEditor.displayName = 'ContentEditableEditor';

// ============================================================
// VisualEditor 主组件
// ============================================================

export const VisualEditor = React.forwardRef(({ 
  value, onChange, banks, categories, isDarkMode,
  activeTemplate, language, t, onInteraction, onUndo, onRedo,
}, ref) => {
  const containerRef = useRef(null);
  const isMobile = typeof window !== 'undefined' &&
    (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth < 768);

  const editorBaseClass = `w-full h-full font-mono text-sm leading-relaxed whitespace-pre-wrap break-words focus:outline-none m-0 transition-colors duration-300 selection:bg-orange-500/30 ${isDarkMode ? 'text-gray-300 caret-white selection:text-white' : 'text-gray-800 caret-gray-800 selection:bg-orange-200 selection:text-orange-900'}`;
  const editorStyle = { 
    fontFamily: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
  };

  const editorProps = {
    value, onChange, banks, categories, language, isDarkMode,
    onInteraction, onUndo, onRedo,
  };

  if (isMobile) {
    const title = activeTemplate ? (typeof activeTemplate.name === 'object' ? (activeTemplate.name[language] || activeTemplate.name.cn || activeTemplate.name.en) : activeTemplate.name) : '';
    const author = activeTemplate ? activeTemplate.author : '';

    return (
      <div 
        ref={containerRef}
        onScroll={() => { if (onInteraction) onInteraction(); }}
        onClick={() => { if (onInteraction) onInteraction(); }}
        className={`w-full h-full overflow-y-auto overflow-x-hidden flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-[#2A2928]' : 'bg-[#FBF5EE]/80'}`}
      >
        <div className="px-6 pt-10 pb-6 shrink-0">
          <h1 className={`text-2xl font-black tracking-tight mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h1>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
              {language === 'cn' ? '作者' : 'Author'}:
            </span>
            <span className="text-sm font-bold text-orange-500">
              {author === '官方' ? (t ? t('official') : '官方') : (author || (t ? t('official') : '官方'))}
            </span>
          </div>
        </div>
        <div className="flex-1 px-6 pb-20">
          <ContentEditableEditor
            ref={ref} {...editorProps}
            disableSlashTrigger
            className={editorBaseClass}
            style={{ ...editorStyle, minHeight: '200px' }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden transition-colors duration-300 bg-transparent">
      <ContentEditableEditor
        ref={ref} {...editorProps}
        className={`${editorBaseClass} p-8 overflow-y-auto`}
        style={{ ...editorStyle, height: '100%' }}
      />
    </div>
  );
});

VisualEditor.displayName = 'VisualEditor';
