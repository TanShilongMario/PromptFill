import React, { useState, useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';

/**
 * 模板轮播图组件
 * 随机选取模板的3张图片进行轮播展示
 * 支持自动轮播和左右滑动切换
 */
export const TemplateCarousel = ({ templates, language, isDarkMode, setZoomedImage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselImages, setCarouselImages] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  // 触摸滑动相关
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const minSwipeDistance = 50; // 最小滑动距离

  // 从模板中随机选择3张有图片的模板
  useEffect(() => {
    const templatesWithImages = templates.filter(t => t.imageUrl && t.imageUrl.trim() !== '');

    if (templatesWithImages.length === 0) {
      setCarouselImages([]);
      return;
    }

    // 随机打乱数组
    const shuffled = [...templatesWithImages].sort(() => Math.random() - 0.5);

    // 取前3张（如果不足3张则取全部）
    const selected = shuffled.slice(0, 3);

    setCarouselImages(selected);
  }, [templates]);

  // 自动轮播
  useEffect(() => {
    if (carouselImages.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000); // 每4秒切换一次

    return () => clearInterval(timer);
  }, [carouselImages.length, isPaused]);

  // 触摸事件处理
  const onTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
    setHasMoved(false);
    setIsPaused(true); // 触摸时暂停自动轮播
  };

  const onTouchMove = (e) => {
    // 检测是否有明显的移动
    const moveX = Math.abs(e.targetTouches[0].clientX - touchStartX.current);
    const moveY = Math.abs(e.targetTouches[0].clientY - touchStartY.current);
    if (moveX > 5 || moveY > 5) {
      setHasMoved(true);
    }
  };

  const onTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const deltaX = Math.abs(touchEndX - touchStartX.current);
    const deltaY = Math.abs(touchEndY - touchStartY.current);

    // 只有当水平滑动距离大于垂直滑动距离时，才认为是滑动切换图片
    if (deltaX > deltaY && deltaX > minSwipeDistance) {
      // 向左滑动，切换到下一张
      if (touchStartX.current - touchEndX > 0) {
        goToNext();
      }
      // 向右滑动，切换到上一张
      else {
        goToPrevious();
      }
    }
    // 如果是垂直滑动或点击，不阻止默认行为，允许页面滚动

    // 恢复自动轮播
    setTimeout(() => setIsPaused(false), 2000);
  };

  // 点击处理：视频模板传 videoUrl 以便大图预览播视频，否则传 imageUrl
  const handleClick = () => {
    if (!hasMoved && setZoomedImage) {
      const url = currentImage.type === 'video' && currentImage.videoUrl
        ? currentImage.videoUrl
        : currentImage.imageUrl;
      setZoomedImage(url);
    }
  };

  // 如果没有图片，不显示轮播图
  if (carouselImages.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const currentImage = carouselImages[currentIndex];

  return (
    <div className="relative w-full h-[60vh] overflow-hidden">
      {/* 轮播图片 - 支持触摸滑动和点击展开 */}
      <div
        className="relative w-full h-full cursor-pointer"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onClick={handleClick}
      >
        <OptimizedImage
          src={currentImage.imageUrl}
          alt={currentImage.name?.[language] || currentImage.name?.cn || 'Template'}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          draggable={false}
          isDarkMode={isDarkMode}
          priority={5}
        />

        {/* Video Indicator for Carousel */}
        {currentImage.type === 'video' && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/20 backdrop-blur-md rounded-full p-6 text-white border border-white/20 pointer-events-none">
            <Play size={48} fill="currentColor" />
          </div>
        )}

        {/* 渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* 模板标题 - 下移 */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-12 pointer-events-none">
          <h2 className={`text-white text-xl font-bold mb-1 drop-shadow-lg`}>
            {currentImage.name?.[language] || currentImage.name?.cn || 'Template'}
          </h2>
          {currentImage.author && (
            <p className="text-white/80 text-xs drop-shadow-md">
              By {currentImage.author}
            </p>
          )}
        </div>
      </div>

      {/* 顶部 Safe Area 纯色渐变遮罩 - 不受下方图片影响 */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/30 via-black/15 to-transparent pointer-events-none z-10" />

      {/* 指示器圆点 - 右下角 */}
      {carouselImages.length > 1 && (
        <div className="absolute bottom-6 right-6 flex gap-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`transition-all duration-300 ${
                index === currentIndex
                  ? 'w-6 h-2 bg-orange-500 rounded-full'
                  : 'w-2 h-2 bg-white/50 rounded-full hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
