import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  // 防止 Vite 預設清除控制台，方便調試
  clearScreen: false,
  // 讓 Tauri 能夠監聽特定的連接埠
  server: {
    port: 1420,
    strictPort: true,
    host: true, // 保持原本的 --host 功能
  },
  // 設置環境變數的前綴，這樣在 Tauri 中可以存取它們
  envPrefix: ['VITE_', 'TAURI_'],
  build: {
    // 只有在 Tauri 建構時才應用特殊的 target
    target: process.env.TAURI_PLATFORM 
      ? (process.env.TAURI_PLATFORM == 'windows' ? 'chrome105' : 'safari13')
      : 'modules', // 網頁版使用標準的現代化模組 target
    // 在非調試建構中不縮小代碼，方便報錯定位（可選）
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    // 為調試建構生成源代碼映射
    sourcemap: !!process.env.TAURI_DEBUG,
  },
})
