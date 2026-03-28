import React, { createContext, useContext, useMemo, useState, useEffect, useRef } from 'react';
import { isFolderMediaPath, readMediaBlobFromFolder } from '../utils/folderImages';

const FolderStorageContext = createContext({
  directoryHandle: null,
  enabled: false,
  /** 用户是否选择了「本地文件夹」存储模式（与 enabled 分离：句柄恢复前 enabled 可能仍为 false） */
  folderMode: false,
});

export function FolderStorageProvider({ children, directoryHandle, enabled, folderMode = false }) {
  const value = useMemo(
    () => ({
      directoryHandle: enabled ? directoryHandle : null,
      enabled: !!enabled && !!directoryHandle,
      folderMode: !!folderMode,
    }),
    [directoryHandle, enabled, folderMode]
  );

  return <FolderStorageContext.Provider value={value}>{children}</FolderStorageContext.Provider>;
}

export function useFolderStorage() {
  return useContext(FolderStorageContext);
}

/**
 * 将模板中的 images/... 解析为可展示的 blob URL；其它 URL 原样返回。
 * 加载失败时 displaySrc 为空串，failed 为 true（用于占位 UI）。
 */
export function useResolvedFolderMediaSrc(rawSrc) {
  const { directoryHandle, enabled, folderMode } = useFolderStorage();
  const [blobUrl, setBlobUrl] = useState(null);
  const [failed, setFailed] = useState(false);
  const objectUrlRef = useRef(null);

  const isPath = !!(rawSrc && isFolderMediaPath(rawSrc));
  const folderPathPending = isPath && folderMode && (!enabled || !directoryHandle);
  const folderPathUnsupported = isPath && !folderMode;

  const needsResolve = !!(enabled && directoryHandle && rawSrc && isPath);

  useEffect(() => {
    if (!needsResolve) {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
      setBlobUrl(null);
      setFailed(false);
      return;
    }

    let cancelled = false;

    (async () => {
      setFailed(false);
      setBlobUrl(null);
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
      const blob = await readMediaBlobFromFolder(directoryHandle, rawSrc);
      if (cancelled) return;
      if (!blob) {
        setFailed(true);
        return;
      }
      const u = URL.createObjectURL(blob);
      objectUrlRef.current = u;
      setBlobUrl(u);
    })();

    return () => {
      cancelled = true;
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, [rawSrc, needsResolve, directoryHandle]);

  if (!rawSrc) {
    return { displaySrc: '', failed: false, loading: false };
  }
  if (folderPathUnsupported) {
    return { displaySrc: '', failed: true, loading: false };
  }
  if (folderPathPending) {
    return { displaySrc: '', failed: false, loading: true };
  }
  if (!needsResolve) {
    return { displaySrc: rawSrc, failed: false, loading: false };
  }
  if (failed) {
    return { displaySrc: '', failed: true, loading: false };
  }
  if (!blobUrl) {
    return { displaySrc: '', failed: false, loading: true };
  }
  return { displaySrc: blobUrl, failed: false, loading: false };
}
