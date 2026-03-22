// EditorToolbar 组件 - 编辑器工具栏
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Plus, Undo, Redo, Link, Unlink, ChevronDown, ChevronUp, Bug, X, Key, ChevronRight, RotateCcw } from 'lucide-react';
import { PremiumButton } from './PremiumButton';
import { AI_SMART_SPLIT_ENABLED } from '../constants/aiConfig';

// 调试模式标志：读取 Vite 编译期环境变量
// 本地开发时在 .env.local 中设置 VITE_DEBUG_SPLIT=true 即可开启
// Vercel 生产环境不设此变量，构建时自动为 false，调试代码被 tree-shake 剔除
const DEBUG_MODE_ENABLED = import.meta.env.VITE_DEBUG_SPLIT === 'true';

// 调试面板弹窗组件
const DebugPanel = ({ isDarkMode, language, defaultSystemPrompt, defaultSystemPromptLite, onRun, onClose }) => {
  const [splitMode, setSplitMode] = useState(() => localStorage.getItem('debug_split_mode') || 'classic');
  const [systemPrompt, setSystemPrompt] = useState(() => {
    const savedMode = localStorage.getItem('debug_split_mode') || 'classic';
    return savedMode === 'lite' ? (defaultSystemPromptLite || '') : (defaultSystemPrompt || '');
  });
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('debug_zhipu_api_key') || '');
  const [model, setModel] = useState(() => localStorage.getItem('debug_split_model') || 'glm-4.5-air');
  const [termsDebugEnabled, setTermsDebugEnabled] = useState(() => !!localStorage.getItem('debug_terms_model'));
  const [termsModel, setTermsModel] = useState(() => localStorage.getItem('debug_terms_model') || 'glm-4.7-flash');
  const [isRunning, setIsRunning] = useState(false);
  const textareaRef = useRef(null);

  // 词条调试开关变化时同步到 localStorage
  const handleTermsDebugToggle = (enabled) => {
    setTermsDebugEnabled(enabled);
    if (enabled) {
      localStorage.setItem('debug_terms_model', termsModel);
    } else {
      localStorage.removeItem('debug_terms_model');
    }
  };

  const handleTermsModelChange = (newModel) => {
    setTermsModel(newModel);
    if (termsDebugEnabled) {
      localStorage.setItem('debug_terms_model', newModel);
    }
  };

  // 自动调整文本框高度
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 400) + 'px';
    }
  }, [systemPrompt]);

  const handleSaveKey = () => {
    localStorage.setItem('debug_zhipu_api_key', apiKey);
  };

  const handleRun = async () => {
    if (!apiKey.trim()) {
      alert(language === 'cn' ? '请先输入 API Key' : 'Please enter API Key first');
      return;
    }
    localStorage.setItem('debug_zhipu_api_key', apiKey);
    setIsRunning(true);
    try {
      await onRun({ systemPrompt, apiKey, model, splitMode });
    } finally {
      setIsRunning(false);
    }
  };

  // 切换方案时自动切换对应的系统提示词，并持久化
  const handleSplitModeChange = (mode) => {
    setSplitMode(mode);
    localStorage.setItem('debug_split_mode', mode);
    if (mode === 'lite' && defaultSystemPromptLite) {
      setSystemPrompt(defaultSystemPromptLite);
    } else if (mode === 'classic' && defaultSystemPrompt) {
      setSystemPrompt(defaultSystemPrompt);
    }
  };

  const panelBg = isDarkMode ? 'bg-[#1C1917] border-white/10' : 'bg-white border-gray-200';
  const inputBg = isDarkMode ? 'bg-[#0D0C0B] border-white/10 text-gray-200 placeholder:text-gray-600' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400';
  const labelColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const badgeBg = isDarkMode ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 'bg-orange-50 text-orange-600 border-orange-200';

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
      <div
        className={`w-full sm:max-w-2xl rounded-t-3xl sm:rounded-3xl border shadow-2xl animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0 duration-300 flex flex-col max-h-[92vh] ${panelBg}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b flex-shrink-0 ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
          <div className="flex items-center gap-3">
            <Bug size={18} className="text-orange-500" />
            <span className={`font-black text-base tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {language === 'cn' ? '智能拆分调试面板' : 'Smart Split Debug Panel'}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeBg}`}>DEV ONLY</span>
          </div>
          <button onClick={onClose} className={`p-2 rounded-xl transition-all ${isDarkMode ? 'hover:bg-white/10 text-gray-500' : 'hover:bg-gray-100 text-gray-400'}`}>
            <X size={18} />
          </button>
        </div>

        {/* Body - scrollable */}
        <div className="overflow-y-auto flex-1 p-6 space-y-5">
          {/* API Key + Model */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`text-[10px] font-black uppercase tracking-widest mb-1.5 flex items-center gap-1.5 ${labelColor}`}>
                <Key size={11} /> API Key（智谱）
              </label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={apiKey}
                  onChange={e => setApiKey(e.target.value)}
                  placeholder="zhipu-api-key..."
                  className={`flex-1 text-xs px-3 py-2 rounded-xl border outline-none font-mono min-w-0 ${inputBg}`}
                />
                <button
                  onClick={handleSaveKey}
                  className={`text-[10px] font-bold px-3 py-2 rounded-xl border transition-all flex-shrink-0 ${isDarkMode ? 'border-white/10 text-gray-400 hover:bg-white/5' : 'border-gray-200 text-gray-500 hover:bg-gray-100'}`}
                >
                  {language === 'cn' ? '保存' : 'Save'}
                </button>
              </div>
            </div>
            <div>
              <label className={`text-[10px] font-black uppercase tracking-widest mb-1.5 block ${labelColor}`}>模型</label>
              <select
                value={model}
                onChange={e => { setModel(e.target.value); localStorage.setItem('debug_split_model', e.target.value); }}
                className={`w-full text-xs px-3 py-2 rounded-xl border outline-none ${inputBg}`}
              >
                <option value="glm-5">glm-5（最新旗舰）</option>
                <option value="glm-4.7">glm-4.7（思考版）</option>
                <option value="glm-4.7-standard">glm-4.7（普通版）</option>
                <option value="glm-4.7-flash">glm-4.7-flash</option>
                <option value="glm-4.7-flashx">glm-4.7-flashx</option>
                <option value="glm-4-plus">glm-4-plus（推荐）</option>
                <option value="glm-4.5-air">glm-4.5-air（较快）</option>
                <option value="glm-4-flash">glm-4-flash（最快）</option>
                <option value="glm-z1-plus">glm-z1-plus（推理）</option>
              </select>
            </div>
          </div>

          {/* 拆分方案选择 */}
          <div>
            <label className={`text-[10px] font-black uppercase tracking-widest mb-1.5 block ${labelColor}`}>拆分方案</label>
            <div className={`premium-toggle-container ${isDarkMode ? 'dark' : 'light'} !w-full`}>
              <button
                onClick={() => handleSplitModeChange('classic')}
                className={`premium-toggle-item ${isDarkMode ? 'dark' : 'light'} flex-1 !py-2 ${splitMode === 'classic' ? 'is-active' : ''}`}
              >
                <span className="text-xs font-bold">经典 JSON</span>
              </button>
              <button
                onClick={() => handleSplitModeChange('lite')}
                className={`premium-toggle-item ${isDarkMode ? 'dark' : 'light'} flex-1 !py-2 ${splitMode === 'lite' ? 'is-active' : ''}`}
              >
                <span className="text-xs font-bold">轻量标注</span>
              </button>
            </div>
            <p className={`text-[10px] mt-1.5 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
              {splitMode === 'classic'
                ? '经典模式：AI 返回完整 JSON（含变量名、选项、双语内容），提示词较长'
                : '轻量模式：AI 只标注原文中的变量位置，自动匹配已有词库，速度极快'}
            </p>
          </div>

          {/* 智能词条调试区块 */}
          <div className={`rounded-2xl border p-4 space-y-3 ${isDarkMode ? 'border-white/5 bg-white/2' : 'border-gray-100 bg-gray-50/50'}`}>
            <div className="flex items-center justify-between">
              <label className={`text-[10px] font-black uppercase tracking-widest ${labelColor}`}>
                智能词条调试
              </label>
              <button
                onClick={() => handleTermsDebugToggle(!termsDebugEnabled)}
                className={`relative w-10 h-5 rounded-full transition-colors flex-shrink-0 ${termsDebugEnabled ? 'bg-orange-500' : (isDarkMode ? 'bg-white/10' : 'bg-gray-300')}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${termsDebugEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
            {termsDebugEnabled && (
              <div>
                <label className={`text-[10px] font-bold mb-1 block ${labelColor}`}>词条生成模型（前端直调）</label>
                <select
                  value={termsModel}
                  onChange={e => handleTermsModelChange(e.target.value)}
                  className={`w-full text-xs px-3 py-2 rounded-xl border outline-none ${inputBg}`}
                >
                  <option value="glm-4.7-flash">glm-4.7-flash</option>
                  <option value="glm-4.7-flashx">glm-4.7-flashx</option>
                  <option value="glm-4.7">glm-4.7（思考版）</option>
                  <option value="glm-4.7-standard">glm-4.7（普通版）</option>
                  <option value="glm-4.5-air">glm-4.5-air</option>
                  <option value="glm-4-flash">glm-4-flash</option>
                </select>
                <p className={`text-[10px] mt-1.5 ${isDarkMode ? 'text-orange-500/60' : 'text-orange-500/70'}`}>
                  ⚠️ 开启后点击变量「智能词条」将直接调用 GLM，不走后端
                </p>
              </div>
            )}
          </div>

          {/* System Prompt Editor */}
          <div>
            <div className={`rounded-2xl border p-3.5 mb-4 space-y-2 ${isDarkMode ? 'border-white/5 bg-white/2' : 'border-gray-100 bg-gray-50/50'}`}>
              <p className={`text-[10px] font-black uppercase tracking-widest ${labelColor}`}>V1.1 语法速查</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className={`rounded-xl px-3 py-2 font-mono text-[11px] ${isDarkMode ? 'bg-white/5 text-gray-300' : 'bg-white text-gray-700 border border-gray-100'}`}>
                  <span className={`${isDarkMode ? 'text-orange-400' : 'text-orange-500'}`}>{`{{key}}`}</span>
                  <span className={`ml-2 text-[10px] ${labelColor}`}>占位符，预览时选词</span>
                </div>
                <div className={`rounded-xl px-3 py-2 font-mono text-[11px] ${isDarkMode ? 'bg-white/5 text-gray-300' : 'bg-white text-gray-700 border border-gray-100'}`}>
                  <span className={`${isDarkMode ? 'text-orange-400' : 'text-orange-500'}`}>{`{{key: 选项}}`}</span>
                  <span className={`ml-2 text-[10px] ${labelColor}`}>内联写死当前值</span>
                </div>
              </div>
              <p className={`text-[10px] ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                标注拆分输出 <span className="font-mono">{`{{key::原词}}`}</span>，系统自动转为 <span className="font-mono">{`{{key}}`}</span>；
                词条生成结果将被用户以 <span className="font-mono">{`{{key: 词条}}`}</span> 写入模版。
              </p>
            </div>
            <label className={`text-[10px] font-black uppercase tracking-widest mb-1.5 block ${labelColor}`}>
              {language === 'cn' ? '系统提示词（可直接编辑调试）' : 'System Prompt (Edit & Debug)'}
            </label>
            <textarea
              ref={textareaRef}
              value={systemPrompt}
              onChange={e => setSystemPrompt(e.target.value)}
              spellCheck={false}
              className={`w-full text-xs px-4 py-3 rounded-2xl border outline-none font-mono resize-none leading-relaxed min-h-[180px] ${inputBg}`}
              placeholder={language === 'cn' ? '在这里编辑系统提示词...' : 'Edit system prompt here...'}
            />
            <p className={`text-[10px] mt-1.5 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
              {`${systemPrompt.length} 字符 · `}
              {splitMode === 'lite'
                ? '步骤①标注拆分 → 步骤②自动翻译生成双语（两次请求，均使用上方模型）'
                : '当前模板文本将追加在系统提示词之后发送给 AI'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className={`flex items-center justify-between gap-3 px-6 py-4 border-t flex-shrink-0 ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
          <p className={`text-[10px] ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
            {splitMode === 'lite'
              ? '⚠️ 轻量模式：①标注拆分 ②自动翻译双语（2次 API 调用）'
              : '⚠️ 直接调用 GLM API，不经过后端'}
          </p>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className={`text-xs font-bold px-4 py-2 rounded-xl border transition-all ${isDarkMode ? 'border-white/10 text-gray-400 hover:bg-white/5' : 'border-gray-200 text-gray-500 hover:bg-gray-100'}`}
            >
              {language === 'cn' ? '取消' : 'Cancel'}
            </button>
            <button
              onClick={handleRun}
              disabled={isRunning || !systemPrompt.trim()}
              className={`text-xs font-black px-5 py-2 rounded-xl transition-all flex items-center gap-2 ${
                isRunning || !systemPrompt.trim()
                  ? 'opacity-50 cursor-not-allowed bg-orange-500/30 text-orange-300'
                  : 'bg-orange-500 hover:bg-orange-400 text-white shadow-lg shadow-orange-500/20'
              }`}
            >
              {isRunning ? (
                <><span className="animate-spin">⟳</span> {language === 'cn' ? '执行中...' : 'Running...'}</>
              ) : (
                <><ChevronRight size={14} /> {language === 'cn' ? '执行拆分' : 'Run Split'}</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export const EditorToolbar = ({ 
  onInsertClick, 
  onSmartSplitClick,
  onDebugSplitRun,       // 调试模式：传入 { systemPrompt, apiKey, model, splitMode }
  getDebugSystemPrompt,  // 调试模式：获取当前默认系统提示词的回调（经典模式）
  getDebugSystemPromptLite, // 调试模式：获取轻量模式的系统提示词
  isSmartSplitLoading = false,
  hasSplitSnapshot = false, // 是否有拆分快照（拆分后为 true，显示重置按钮）
  splitDurationMs = null,   // 上次拆分耗时（毫秒）
  onResetClick,          // 点击「重置」按钮回调（打开对比弹窗）
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
  onRemoveGroup,
  language = 'cn'
}) => {
  const [isGroupsExpanded, setIsGroupsExpanded] = useState(false);
  const [isDebugPanelOpen, setIsDebugPanelOpen] = useState(false);
  const [debugSystemPrompt, setDebugSystemPrompt] = useState('');
  const [debugSystemPromptLiteCache, setDebugSystemPromptLiteCache] = useState('');
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const handleOpenDebug = () => {
    const prompt = getDebugSystemPrompt ? getDebugSystemPrompt() : '';
    const promptLite = getDebugSystemPromptLite ? getDebugSystemPromptLite() : '';
    setDebugSystemPrompt(prompt);
    setDebugSystemPromptLiteCache(promptLite);
    setIsDebugPanelOpen(true);
  };

  return (
    <>
    {/* 调试面板弹窗 */}
    {DEBUG_MODE_ENABLED && isDebugPanelOpen && (
      <DebugPanel
        isDarkMode={isDarkMode}
        language={language}
        defaultSystemPrompt={debugSystemPrompt}
        defaultSystemPromptLite={debugSystemPromptLiteCache}
        onRun={async (params) => {
          setIsDebugPanelOpen(false);
          if (onDebugSplitRun) await onDebugSplitRun(params);
        }}
        onClose={() => setIsDebugPanelOpen(false)}
      />
    )}
    <div className={`flex flex-col border-b backdrop-blur-md flex-shrink-0 z-20 ${isDarkMode ? 'border-white/5 bg-white/5 text-gray-300' : 'border-[#D8C8B8]/60 bg-[#F0E4D8]/70'}`}>
      {/* 第一行：撤销/重做 & 插入按钮 */}
      <div className="h-14 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          {/* Undo/Redo */}
          <div className="flex items-center gap-2">
            <PremiumButton 
              onClick={onUndo} 
              disabled={!canUndo || isSmartSplitLoading} 
              title={t('undo') || "撤消"} 
              icon={Undo} 
              isDarkMode={isDarkMode}
              className="!p-1" 
            />
            <PremiumButton 
              onClick={onRedo} 
              disabled={!canRedo || isSmartSplitLoading} 
              title={t('redo') || "重做"} 
              icon={Redo} 
              isDarkMode={isDarkMode}
              className="!p-1" 
            />
          </div>

          <div className={`h-6 w-px ${isDarkMode ? 'bg-white/10' : 'bg-gray-300'}`} />

          {/* 移动端折叠触发器 */}
          {isMobile && (
            <button 
              onClick={() => setIsGroupsExpanded(!isGroupsExpanded)}
              className={`flex items-center gap-1.5 px-2 py-1 rounded-lg transition-all ${isDarkMode ? 'hover:bg-white/5 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
            >
              <Link size={14} className={currentGroupId ? 'text-orange-500' : ''} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                {currentGroupId ? `${t('link_group') || '联动组'} ${currentGroupId}` : (t('link_group') || '联动组')}
              </span>
              {isGroupsExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          )}

          {/* 桌面端显示联动组标签 */}
          {!isMobile && (
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
                
                {currentGroupId && <div className={`w-px h-4 self-center mx-1 ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`} />}

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
          )}
        </div>

        {/* Right: AI Smart Split & Insert */}
        <div className="flex items-center gap-2">
          {AI_SMART_SPLIT_ENABLED && (
            <div className="flex items-center gap-1">
              {/* 智能拆分按钮（始终显示） */}
              <PremiumButton
                onClick={onSmartSplitClick}
                disabled={isSmartSplitLoading}
                isDarkMode={isDarkMode}
                className={`rainbow ${isSmartSplitLoading ? 'opacity-80' : ''}`}
                title={language === 'cn' ? '一键润色与智能拆分' : 'Smart Polish & Split'}
              >
                <span className={`flex items-center gap-1.5 ${isSmartSplitLoading ? 'animate-pulse' : ''}`}>
                  {isSmartSplitLoading
                    ? (language === 'cn' ? '正在智能拆分...' : 'Splitting...')
                    : (language === 'cn' ? '智能拆分' : 'Smart Split')}
                  <span className="text-[9px] font-medium text-orange-500/80">Beta</span>
                </span>
              </PremiumButton>

              {/* 重置按钮：仅在拆分后有快照时显示 */}
              {hasSplitSnapshot && !isSmartSplitLoading && (
                <div className="flex items-center gap-1.5">
                  <PremiumButton
                    onClick={onResetClick}
                    isDarkMode={isDarkMode}
                    className="!h-[34px] !rounded-xl"
                    title={language === 'cn' ? '查看拆分前后对比，可选择还原' : 'Compare before/after split and optionally restore'}
                  >
                    <span className="flex items-center gap-1.5 px-0.5">
                      <RotateCcw size={12} strokeWidth={2.5} />
                      {language === 'cn' ? '重置' : 'Reset'}
                    </span>
                  </PremiumButton>
                  {splitDurationMs != null && (
                    <span
                      className={`text-[10px] font-mono tabular-nums ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}
                      title={language === 'cn' ? '上次拆分耗时' : 'Last split duration'}
                    >
                      {splitDurationMs >= 1000
                        ? `${(splitDurationMs / 1000).toFixed(1)}s`
                        : `${splitDurationMs}ms`}
                    </span>
                  )}
                </div>
              )}

              {/* 调试按钮 - 仅开发环境可见，正式发版前移除 */}
              {DEBUG_MODE_ENABLED && (
                <button
                  onClick={handleOpenDebug}
                  disabled={isSmartSplitLoading}
                  title={language === 'cn' ? '调试：在前端直接编辑系统提示词并测试' : 'Debug: Edit system prompt directly in frontend'}
                  className={`
                    p-1.5 rounded-lg border transition-all
                    ${isSmartSplitLoading ? 'opacity-30 cursor-not-allowed' : ''}
                    ${isDarkMode
                      ? 'border-orange-500/20 text-orange-500/60 hover:text-orange-400 hover:bg-orange-500/10 hover:border-orange-500/40'
                      : 'border-orange-300/50 text-orange-400/70 hover:text-orange-500 hover:bg-orange-50 hover:border-orange-300'}
                  `}
                >
                  <Bug size={13} />
                </button>
              )}
            </div>
          )}

          <PremiumButton 
            onClick={onInsertClick} 
            icon={Plus} 
            isDarkMode={isDarkMode}
            disabled={isSmartSplitLoading}
          >
            {t('insert')}
          </PremiumButton>
        </div>
      </div>

      {/* 移动端折叠面板：联动组选择 */}
      {isMobile && isGroupsExpanded && (
        <div className={`px-4 py-4 border-t animate-in slide-in-from-top-1 duration-200 ${isDarkMode ? 'border-white/5 bg-black/20' : 'border-[#D8C8B8]/60 bg-[#F0E4D8]/60'}`}>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-black uppercase tracking-widest px-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {t('link_group_desc') || '设置选中变量的联动编号'}
              </span>
              {currentGroupId && (
                <button
                  onClick={onRemoveGroup}
                  disabled={!cursorInVariable}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-red-500 text-[10px] font-bold uppercase tracking-wider hover:bg-red-500/10 rounded-xl transition-all border border-red-500/20"
                >
                  <Unlink size={12} /> {t('remove_group') || "解除关联"}
                </button>
              )}
            </div>
            <div className={`premium-toggle-container ${isDarkMode ? 'dark' : 'light'} !w-full !justify-around !p-1.5`}>
              {[1, 2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  onClick={() => onSetGroup(num)}
                  disabled={!cursorInVariable}
                  className={`
                    premium-toggle-item ${isDarkMode ? 'dark' : 'light'}
                    flex-1 !py-2.5 !text-sm
                    ${currentGroupId === num.toString() ? 'is-active' : ''}
                    ${!cursorInVariable ? 'opacity-30 cursor-not-allowed' : ''}
                  `}
                >
                  {num}
                </button>
              ))}
            </div>
            {!cursorInVariable && (
              <p className="text-[11px] text-orange-500/80 font-bold italic px-1 text-center">
                {t('place_cursor_in_variable') || '请先将光标置于编辑器中的变量内'}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
    </>
  );
};
