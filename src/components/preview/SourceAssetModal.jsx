import React from 'react';
import { X } from 'lucide-react';
import { getLocalized, getVideoEmbedInfo } from '../../utils/helpers';
import { OptimizedImage } from '../OptimizedImage';
import { useResolvedFolderMediaSrc } from '../../context/FolderStorageContext';

function ModalDirectVideo({ src, className }) {
  const { displaySrc, failed } = useResolvedFolderMediaSrc(src || '');
  if (failed || !displaySrc) {
    return <div className={`${className} flex items-center justify-center text-white/40 text-sm`}>—</div>;
  }
  return <video src={displaySrc} controls autoPlay loop className={className} />;
}

/**
 * 全局素材大图预览模态框
 * 
 * @param {Object} props
 * @param {Object} props.item - 素材对象 {type, url, label}
 * @param {Function} props.onClose - 关闭回调
 * @param {string} props.language - 当前语言
 */
const SourceAssetModal = ({ item, onClose, language }) => {
  if (!item) return null;

  const embedInfo = item.type === 'video' ? getVideoEmbedInfo(item.url) : null;

  return (
    <div 
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <button 
        className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all z-[2100]"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <X size={28} />
      </button>
      
      <div 
        className="relative max-w-[95vw] max-h-[90vh] flex flex-col items-center justify-center p-4 w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative group overflow-hidden rounded-2xl shadow-2xl border border-white/10 bg-black/20 w-full flex items-center justify-center">
          {item.type === 'video' ? (
            embedInfo?.isEmbed ? (
              <div className="w-full aspect-video max-h-[80vh]">
                <iframe
                  src={embedInfo.embedUrl}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  title="Video Preview"
                />
              </div>
            ) : (
              <ModalDirectVideo src={item.url} className="max-w-full max-h-[80vh] block" />
            )
          ) : (
            <OptimizedImage
              src={item.url}
              alt="Source Zoom"
              className="max-w-full max-h-[80vh] object-contain block"
              priority={0}
            />
          )}
        </div>
        
        {item.label && (
          <div className="mt-6 text-center animate-in slide-in-from-bottom-2 duration-500">
            <p className="text-white font-bold text-lg tracking-wider drop-shadow-lg">
              {getLocalized(item.label, language)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SourceAssetModal;
