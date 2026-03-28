import React, { useState, useEffect, useCallback } from 'react';
import { Archive, RotateCcw } from 'lucide-react';
import { listEmergencySnapshots } from '../utils/storageBackup';

/**
 * 设置页：列出 IndexedDB 中的紧急快照并支持一键恢复
 */
export function EmergencyBackupPanel({ language, isDarkMode, onRestore }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const list = await listEmergencySnapshots();
      setItems(list);
    } catch (e) {
      console.error(e);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const title = language === 'cn' ? '紧急备份（IndexedDB）' : 'Emergency backups (IndexedDB)';
  const desc =
    language === 'cn'
      ? '切换本地文件夹、合并存档前会自动快照。若模版消失，可尝试从下列时间点恢复。'
      : 'Snapshots are saved before folder merge/switch. Restore if templates went missing.';
  const empty = language === 'cn' ? '暂无自动备份记录' : 'No automatic backups yet';
  const restoreLabel = language === 'cn' ? '恢复此备份' : 'Restore';

  return (
    <div
      className={`rounded-xl border p-3 mb-2 ${
        isDarkMode ? 'border-white/10 bg-white/[0.03]' : 'border-gray-200 bg-gray-50/80'
      }`}
    >
      <div className="flex items-start gap-2 mb-2">
        <Archive size={16} className={`flex-shrink-0 mt-0.5 ${isDarkMode ? 'text-orange-400' : 'text-orange-500'}`} />
        <div className="min-w-0">
          <p className={`text-[11px] font-black uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {title}
          </p>
          <p className={`text-[10px] mt-0.5 leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{desc}</p>
        </div>
      </div>

      {loading ? (
        <p className={`text-[10px] py-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>…</p>
      ) : items.length === 0 ? (
        <p className={`text-[10px] py-1 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>{empty}</p>
      ) : (
        <ul className="space-y-1.5 max-h-48 overflow-y-auto custom-scrollbar">
          {items.map((row) => (
            <li
              key={row.key}
              className={`flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 ${
                isDarkMode ? 'bg-black/20' : 'bg-white/90'
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className={`text-[10px] font-bold truncate ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {new Date(row.savedAt).toLocaleString()}
                </div>
                <div className={`text-[9px] truncate ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  {row.reason || '—'} · {row.templateCount} tpl
                  {row.userTemplateCount > 0 ? ` · ${row.userTemplateCount} custom` : ''}
                </div>
              </div>
              <button
                type="button"
                onClick={async () => {
                  await onRestore(row.key);
                  await refresh();
                }}
                className={`flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-bold transition-colors ${
                  isDarkMode
                    ? 'bg-orange-500/20 text-orange-300 hover:bg-orange-500/30'
                    : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                }`}
              >
                <RotateCcw size={10} />
                {restoreLabel}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
