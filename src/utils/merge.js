// 合併策略函數
import { INITIAL_TEMPLATES_CONFIG } from '../data/templates';
import { INITIAL_BANKS, INITIAL_DEFAULTS } from '../data/banks';
import { deepClone, makeUniqueKey } from './helpers';

// 合併系統模板，系統模板強制更新，用戶改動備份
export const mergeTemplatesWithSystem = (currentTemplates, { backupSuffix }) => {
  const systemMap = new Map(INITIAL_TEMPLATES_CONFIG.map(t => [t.id, deepClone(t)]));
  const merged = INITIAL_TEMPLATES_CONFIG.map(t => deepClone(t));
  const notes = [];
  const existingIds = new Set(merged.map(t => t.id));

  currentTemplates.forEach(t => {
    if (systemMap.has(t.id)) {
      const sys = systemMap.get(t.id);
      
      // 比較名稱和內容（忽略 selections 等互動狀態）
      const isDifferent = JSON.stringify(t.name) !== JSON.stringify(sys.name) || 
                          JSON.stringify(t.content) !== JSON.stringify(sys.content);
      
      // 在 merged 列表中找到對應的系統模板進行狀態合併
      const targetInMerged = merged.find(m => m.id === t.id);
      if (targetInMerged && t.selections) {
        // 遷移用戶的填空選擇 (selections)，保留用戶已填的內容
        targetInMerged.selections = { 
          ...(targetInMerged.selections || {}), 
          ...t.selections 
        };
      }

      if (isDifferent) {
        const backupId = makeUniqueKey(t.id, existingIds, "user");
        existingIds.add(backupId);
        
        const duplicateName = (name) => {
          if (typeof name === 'string') return `${name}${backupSuffix || ""}`;
          const newName = { ...name };
          Object.keys(newName).forEach(lang => {
            newName[lang] = `${newName[lang]}${backupSuffix || ""}`;
          });
          return newName;
        };

        merged.push({ ...deepClone(t), id: backupId, name: duplicateName(t.name) });
        notes.push(`模板 ${t.id} 已更新，舊版備份為 ${backupId}`);
      }
    } else {
      let newId = t.id;
      if (existingIds.has(newId)) {
        newId = makeUniqueKey(newId, existingIds, "custom");
        notes.push(`自訂義模板 ${t.id} 與系統衝突，已重命名為 ${newId}`);
      }
      existingIds.add(newId);
      merged.push({ ...deepClone(t), id: newId });
    }
  });

  return { templates: merged, notes };
};

// 合併系統詞庫與默認值，系統詞庫強制更新，用戶改動內容合併
export const mergeBanksWithSystem = (currentBanks, currentDefaults, { backupSuffix }) => {
  const mergedBanks = deepClone(INITIAL_BANKS);
  const mergedDefaults = { ...INITIAL_DEFAULTS };
  const notes = [];
  const existingKeys = new Set(Object.keys(mergedBanks));

  Object.entries(currentBanks || {}).forEach(([key, bank]) => {
    if (INITIAL_BANKS[key]) {
      const sysBank = INITIAL_BANKS[key];
      
      // 檢查是否有自訂義選項（即不在系統預設中的選項）
      const sysOptionsSet = new Set(sysBank.options.map(opt => 
        typeof opt === 'string' ? opt : JSON.stringify(opt)
      ));
      
      const customOptions = (bank.options || []).filter(opt => {
        const optKey = typeof opt === 'string' ? opt : JSON.stringify(opt);
        return !sysOptionsSet.has(optKey);
      });

      // 如果有自訂義選項，合併到系統詞庫中，而不是觸發整體備份
      if (customOptions.length > 0) {
        mergedBanks[key].options = [...mergedBanks[key].options, ...customOptions];
        notes.push(`詞庫 ${key} 已同步系統更新，並保留了您的自訂義選項`);
      }
      
      // 如果詞庫的其他屬性（如分類）發生變化，仍可考慮是否備份，但通常以系統為準
    } else {
      let newKey = key;
      if (existingKeys.has(newKey)) {
        newKey = makeUniqueKey(newKey, existingKeys, "custom");
        notes.push(`自訂義詞庫 ${key} 與系統衝突，已重命名為 ${newKey}`);
      }
      existingKeys.add(newKey);
      mergedBanks[newKey] = deepClone(bank);
      if (currentDefaults && key in currentDefaults) mergedDefaults[newKey] = currentDefaults[key];
    }
  });

  Object.entries(currentDefaults || {}).forEach(([key, val]) => {
    if (!(key in mergedDefaults) && mergedBanks[key]) {
      mergedDefaults[key] = val;
    }
  });

  return { banks: mergedBanks, defaults: mergedDefaults, notes };
};

