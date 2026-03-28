/**
 * 图片加载队列管理器
 * 控制并发请求数量，避免瞬间大量请求导致 CDN 限流
 */

const MAX_CONCURRENT = 4; // 最大并发数
const MAX_RETRIES = 3;    // 最大重试次数
const RETRY_DELAY = 1000; // 基础重试延迟（ms）

class ImageLoaderQueue {
  constructor() {
    this.queue = [];
    this.activeCount = 0;
    this.loadedUrls = new Set();
    this.failedUrls = new Map(); // url -> retry count
  }

  /**
   * 将图片加入加载队列
   * @param {string} url - 图片 URL
   * @param {number} priority - 优先级（数值越小越优先）
   * @returns {Promise<string>} - 加载成功的 URL
   */
  enqueue(url, priority = 10) {
    // 已加载过的直接返回
    if (this.loadedUrls.has(url)) {
      return Promise.resolve(url);
    }

    // 检查是否已在队列中
    const existing = this.queue.find(item => item.url === url);
    if (existing) {
      return existing.promise;
    }

    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });

    this.queue.push({ url, priority, resolve, reject, promise });
    
    // 按优先级排序
    this.queue.sort((a, b) => a.priority - b.priority);
    
    this.processQueue();
    
    return promise;
  }

  /**
   * 处理队列
   */
  processQueue() {
    while (this.activeCount < MAX_CONCURRENT && this.queue.length > 0) {
      const item = this.queue.shift();
      this.activeCount++;
      this.loadImage(item);
    }
  }

  /**
   * 加载单张图片
   */
  async loadImage(item) {
    const { url, resolve, reject } = item;
    const retryCount = this.failedUrls.get(url) || 0;

    try {
      await this.fetchImage(url);
      this.loadedUrls.add(url);
      this.failedUrls.delete(url);
      resolve(url);
    } catch (error) {
      if (retryCount < MAX_RETRIES) {
        // 指数退避重试
        const delay = RETRY_DELAY * Math.pow(2, retryCount);
        this.failedUrls.set(url, retryCount + 1);
        
        setTimeout(() => {
          this.queue.unshift({ ...item, priority: 0 }); // 重试时提高优先级
          this.processQueue();
        }, delay);
      } else {
        this.failedUrls.delete(url);
        reject(error);
      }
    } finally {
      this.activeCount--;
      this.processQueue();
    }
  }

  /**
   * 实际获取图片
   */
  fetchImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      // 不设 crossOrigin：大量外链图未返回 CORS，anonymous 会导致预加载失败（不影响页面展示但失去暖缓存意义）

      const timeout = setTimeout(() => {
        reject(new Error('Image load timeout'));
      }, 15000); // 15 秒超时

      img.onload = () => {
        clearTimeout(timeout);
        resolve(url);
      };

      img.onerror = () => {
        clearTimeout(timeout);
        reject(new Error(`Failed to load image: ${url}`));
      };

      img.src = url;
    });
  }

  /**
   * 预加载一批图片
   * @param {string[]} urls - 图片 URL 数组
   * @param {number} basePriority - 基础优先级
   */
  preloadBatch(urls, basePriority = 10) {
    return Promise.allSettled(
      urls.map((url, index) => this.enqueue(url, basePriority + index))
    );
  }

  /**
   * 检查图片是否已加载
   */
  isLoaded(url) {
    return this.loadedUrls.has(url);
  }

  /**
   * 清理队列
   */
  clear() {
    this.queue.forEach(item => item.reject(new Error('Queue cleared')));
    this.queue = [];
  }

  /**
   * 获取队列状态
   */
  getStatus() {
    return {
      queueLength: this.queue.length,
      activeCount: this.activeCount,
      loadedCount: this.loadedUrls.size,
      failedCount: this.failedUrls.size
    };
  }
}

// 导出单例
export const imageLoader = new ImageLoaderQueue();

// 便捷方法
export const loadImage = (url, priority) => imageLoader.enqueue(url, priority);
export const preloadImages = (urls, priority) => imageLoader.preloadBatch(urls, priority);
export const isImageLoaded = (url) => imageLoader.isLoaded(url);
export const getLoaderStatus = () => imageLoader.getStatus();
