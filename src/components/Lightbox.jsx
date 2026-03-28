// Lightbox 组件 - 图片预览灯箱
import React from 'react';
import { X } from 'lucide-react';
import { useResolvedFolderMediaSrc } from '../context/FolderStorageContext';

export const Lightbox = ({ isOpen, onClose, src }) => {
  const { displaySrc, failed, loading } = useResolvedFolderMediaSrc(src || '');
  if (!isOpen || !src) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-start justify-center p-4"
      onClick={onClose}
    >
      <button
        className="absolute right-4 p-3 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors z-50"
        style={{ top: 'calc(6rem + env(safe-area-inset-top))' }}
        onClick={onClose}
      >
        <X size={32} />
      </button>
      <div
        className="relative max-w-7xl w-full h-full flex items-center justify-center p-4"
        style={{ marginTop: 'calc(6rem + env(safe-area-inset-top))' }}
        onClick={(e) => e.stopPropagation()}
      >
        {failed || (loading && !displaySrc) ? (
          <div className="text-white/60 text-sm px-6 py-12 rounded-lg bg-white/5">
            {failed ? '图片不可用' : '加载中…'}
          </div>
        ) : (
          <img
            src={displaySrc}
            alt="Preview"
            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300 select-none"
          />
        )}
      </div>
    </div>
  );
};
