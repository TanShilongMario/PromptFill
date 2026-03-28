import React, { useState, useEffect, useLayoutEffect, useRef, useCallback, memo } from 'react';
import { loadImage } from '../utils/imageLoader';
import { useResolvedFolderMediaSrc } from '../context/FolderStorageContext';

/**
 * OptimizedImage - 优化的图片加载组件
 *
 * 注意：不在此组件上使用原生 loading="lazy"。
 * 在瀑布流 / columns 等布局中，未加载完成的 img 高度常为 0，
 * 浏览器会认为懒加载目标不可见从而永不请求，导致一直 opacity-0（白屏）。
 * 并发由 imageLoader 预取队列控制；首屏外图片仍可由父级布局预留 min-height 辅助可见性。
 */
const OptimizedImage = memo(({
  src,
  alt = '',
  className = '',
  style = {},
  priority = 10,
  rootMargin = '200px',
  onLoad,
  onError,
  referrerPolicy = 'no-referrer',
  isDarkMode = false,
  /** 显式开启原生懒加载（仅当父级已保证占位高度时使用，如固定高度容器） */
  nativeLazy = false,
  ...props
}) => {
  const { displaySrc, failed: folderFailed, loading: folderLoading } = useResolvedFolderMediaSrc(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const hasTriggeredLoad = useRef(false);
  const imgRef = useRef(null);

  const effectiveSrc = displaySrc;

  // src 变化时重置；并在布局阶段检测「缓存已瞬时解码」避免错过 onLoad（普通刷新常见）
  useLayoutEffect(() => {
    hasTriggeredLoad.current = false;
    setHasError(false);
    if (!effectiveSrc || folderFailed || folderLoading) {
      setIsLoaded(false);
      return;
    }
    const el = imgRef.current;
    if (el?.complete && el.naturalWidth > 0) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [effectiveSrc, folderFailed, folderLoading]);

  // 使用 IntersectionObserver 触发队列加载（预热缓存）
  useEffect(() => {
    if (!effectiveSrc || folderFailed || folderLoading || hasTriggeredLoad.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTriggeredLoad.current) {
          hasTriggeredLoad.current = true;
          loadImage(effectiveSrc, priority).catch(() => {});
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [effectiveSrc, priority, rootMargin, folderFailed, folderLoading]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.(new Error('Image load failed'));
  }, [onError]);

  if (folderFailed || (hasError && effectiveSrc)) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-gray-200 text-gray-400 text-[10px] select-none`}
        style={style}
        role="img"
        aria-label={alt || 'Image unavailable'}
        {...props}
      >
        {isDarkMode ? '—' : '—'}
      </div>
    );
  }

  if (folderLoading && !effectiveSrc) {
    return (
      <div
        ref={imgRef}
        className={`${className} bg-gray-200 dark:bg-gray-700 animate-pulse`}
        style={style}
        aria-hidden
        {...props}
      />
    );
  }

  if (!effectiveSrc) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-gray-100 text-gray-300`}
        style={style}
        {...props}
      />
    );
  }

  return (
    <img
      ref={imgRef}
      src={effectiveSrc}
      alt={alt}
      className={`${className} transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        ...style,
        backgroundColor: !isLoaded && !hasError 
          ? (isDarkMode ? '#374151' : '#e5e7eb') 
          : undefined,
      }}
      onLoad={handleLoad}
      onError={handleError}
      referrerPolicy={referrerPolicy}
      loading={nativeLazy ? 'lazy' : 'eager'}
      decoding="async"
      {...props}
    />
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export { OptimizedImage };
export default OptimizedImage;
