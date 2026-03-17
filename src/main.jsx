import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App.jsx'
import { RootLayout } from './components'
import { RootProvider } from './context/RootContext'
import PrivacyPage from './pages/PrivacyPage.jsx'
import UITestPage from './pages/UITestPage.jsx'
import './index.css'

// 视频模块懒加载
const VideoApp = lazy(() => import('./video/VideoApp.jsx'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootProvider>
      <BrowserRouter>
        <RootLayout>
          <Routes>
            {/* 视频模块 */}
            <Route path="/video/*" element={
              <Suspense fallback={<div className="flex h-screen w-full items-center justify-center text-zinc-500">Loading Video Editor...</div>}>
                <VideoApp />
              </Suspense>
            } />

            {/* 根路径重定向到主页 */}
            <Route path="/" element={<Navigate to="/explore" replace />} />

            {/* 主页（发现页） */}
            <Route path="/explore" element={<App />} />

            {/* 详情页（编辑器） */}
            <Route path="/detail" element={<App />} />

            {/* 设置页 */}
            <Route path="/setting" element={<App />} />

            {/* UI 测试页（仅开发用） */}
            <Route path="/ui-test" element={<UITestPage isDarkMode={false} />} />

            <Route path="/privacy" element={<PrivacyPage />} />

            {/* 404 重定向到主页 */}
            <Route path="*" element={<Navigate to="/explore" replace />} />
          </Routes>
        </RootLayout>
      </BrowserRouter>
    </RootProvider>
  </React.StrictMode>,
)

