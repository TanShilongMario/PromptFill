# Prompt Fill (提示词填空器)

[English](#english) | [中文](#chinese)

---

<a id="english"></a>

# Prompt Fill

A **structured prompt generation tool** designed specifically for AI painting (GPT, Midjourney, Nano Banana, etc.). Help users quickly build, manage, and iterate complex prompts through a visual "fill-in-the-blank" interaction.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/Version-1.1.2-orange.svg)
![Data](https://img.shields.io/badge/Data-1.1.2-green.svg)
![React](https://img.shields.io/badge/React-18.x-61DAFB.svg)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)

<img width="1343" height="612" alt="image@1x-2" src="https://github.com/user-attachments/assets/7c3d969b-7f63-46fc-a16a-e3074da6c692" />
<img width="1343" height="620" alt="1231333" src="https://github.com/user-attachments/assets/08c90a9f-7b1e-4b3d-84fc-650bccfd1d2b" />

## 📝 Foreword

Prompt Fill has officially reached **v1.1.2**. The original intention of this project is to solve the problem of hard-to-remember, hard-to-manage, and tedious modification of prompts in the AI painting process. By structuring prompts, creation becomes as simple as "filling in the blanks".

### 🌟 Progress & Core Features

*   **✅ Variable Autocomplete**: Type `/` or `{` to open a dual-column autocomplete panel — select variables on the left, options on the right, with full keyboard navigation.
*   **✅ Inline Variable Syntax**: `{{key: value}}` lets you write and preview a variable's value directly in the template, with real-time highlighting.
*   **✅ Smart Split**: One-click prompt splitting with automatic variable annotation and bilingual template generation.
*   **✅ Video Template Support**: Full support for video previews and cover management.
*   **✅ Official AI Support**: AI-powered prompt expansion feature is now live.
*   **✅ Full Dark Mode Support**: One-click theme switching for desktop and mobile.
*   **✅ Reliable Storage**: Supports both browser (IndexedDB) and local folder storage — switching modes never loses your templates.
*   **✅ Linkage Groups**: Sync modifications globally within groups (e.g., `{{color}}_1`).
*   **✅ Structured Prompt Engine**: Automatic interactive form conversion via `{{variable}}`.
*   **✅ Dynamic Bank System**: Preset art tags with category management and batch import.
*   **✅ HD Social Sharing**: Export beautiful JPG long images with auto-extracted colors.
*   **✅ Cloud Awareness**: Real-time sync for official templates and features.
*   **✅ Local Storage**: Private data stored in browser LocalStorage.

---

## ✨ Core Features

### 🧩 Intelligent Bank Management
*   **Category Management**: Color-coded categories (e.g., characters, actions) for visual clarity.
*   **Bidirectional Sync**: Directly add custom options in preview to sync back to the bank.
*   **Category Editor**: Manage categories and 12 preset colors.
*   **Responsive Layout**: Efficient masonry multi-column layout.

### 📝 Multi-Template System
*   **Independent Templates**: Create separate prompt templates for different use cases.
*   **Isolated State**: Variable selections are independent per template.
*   **Clone/Copy**: One-click duplication for A/B testing.

### 🖱️ Visual Interaction
*   **WYSIWYG Editing**: Highlighting variables by category color during editing.
*   **Linkage Groups**: Sync same variables in designated groups.
*   **Drag & Drop**: Insert variables by dragging bank cards.
*   **Preview Mode**: Templates render variables as clickable dropdowns.
*   **Multi-Instance**: Multiple occurrences of the same variable work independently.

### 💾 Auto Persistence
*   Changes are automatically saved to LocalStorage.
*   No data loss on refresh or browser close.

### 🖼️ Image Management
*   **Preview Images**: Templates support associated preview images.
*   **Custom Upload**: Replace default previews with your own images.
*   **Image Actions**: Hover for large view, upload, or reset.
*   **Ambient Background**: Blurry background effect at the top.

### 📋 Export & Share
*   **One-click Copy**: Copy clean generated prompt text.
*   **Save Long Image**: Export HD JPGs for archiving and sharing.
*   **Private Short-link Sharing**: Share templates via professional short links (Self-hostable).

---

## 🛠️ Tech Stack

*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Frontend**: [React](https://react.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Export**: [html2canvas](https://html2canvas.hertzen.com/)

---

## 🚀 Quick Start

### Prerequisites
Node.js v18+ is recommended.

### Private Share Server (Optional)
This project supports short-link sharing via a private backend.
1. **Host the API**: Backend code is available for private deployment (Node.js + SQLite).
2. **Configure Frontend**: Create a `.env` file in the root and add your API URL:
   ```bash
   VITE_SHARE_API_URL=https://your-api.com/api/share
   ```
3. **Fallback**: If no API is configured, the app automatically falls back to long URL sharing, which works offline and requires no server.

### Installation & Run

1.  **Clone**
    ```bash
    git clone https://github.com/TanShilongMario/PromptFill.git
    cd PromptFill
    ```
2.  **Install**
    ```bash
    npm install
    ```
3.  **Dev**
    ```bash
    npm run dev
    ```
4.  **Build**
    ```bash
    npm run build
    ```

### Shortcut Scripts
*   **macOS**: `start.command`
*   **Windows**: `start.bat`

### Developer Tools

**Import Template to Official Library**

Convert a user-created template into an official (built-in) template:

1.  Export the template JSON from the App (click the download icon on a template).
2.  Run the import script with the file path:
    ```bash
    npm run import -- ~/Downloads/xxx_template.json
    ```
3.  The script auto-writes into `src/data/templates.js` and `src/data/banks.js`.
4.  After batch importing, manually update `SYSTEM_DATA_VERSION` in `templates.js`.

> **Tip**: In local dev mode (`localhost`), the Share modal has a "Copy Full Data" button that copies the raw JSON to clipboard — you can also pipe that into the import script interactively via `npm run import`.

---

## 📖 Usage Guide

### 1. Manage Categories
Manage categories and colors at the top of the left panel. Each category has a unique color for quick identification.

### 2. Create Banks
Create "Variable Groups" and add options (single or batch). Cards can be dragged into the editor.

### 3. Edit Templates
Use "Edit Template" to enter visual mode. Type `{` to open variable autocomplete, or manually input `{{variable}}`. Supports drag-and-drop insertion and Undo/Redo.

### 4. Preview & Generate
Switch to "Preview Interaction". Select options from dropdowns. Use "+ Add Custom Option" to save new values directly.

### 5. Manage Images
Hover over preview images to view large versions, upload custom images, or reset to default.

### 6. Export & Share
Copy the final prompt or save as a long image. JSON Import/Export is available for backup.

---

## 💡 Tips

1.  **Batch Creation**: Input multiple lines to add multiple options at once.
2.  **Clone Templates**: Duplicate templates for A/B testing.
3.  **Color Coding**: Use distinct colors for complex template structures.
4.  **Multi-Instance**: Multiple same variables are assigned unique indices (e.g., `color-0`).
5.  **Custom Previews**: Uploading representative images helps identification.
6.  **Image Specs**: Square or vertical images around 300px are recommended.
7.  **Data Safety**: Regularly export JSON as data is local to the browser.
8.  **Tags & Search**: Use tags to filter and locate templates quickly.
9.  **Masonry View**: Efficiently browse covers in the template list.
10. **Import/Export (Beta)**: Backup or share via one-click JSON export.
11. **Multi-source Upload**: Supports local files and URLs for images.
12. **Local Focus**: Sync across devices manually using JSON files.

---

## 🗺️ Roadmap

*   **🚀 Application**: Native iOS app & Desktop version (Electron/Tauri).
*   **🤝 Ecosystem**: One-click sharing and online community.
*   **🤖 AI Empowerment**: AI bank expansion & AI prompt reorganization.
*   **✨ Deep UX**: More built-in templates & infinite hierarchy.

---

## 📝 Change Log

### Version 1.1.2 (2026-03-28)
- Storage Fix: Writing a full IndexedDB snapshot before switching to folder mode. No templates are lost regardless of which storage mode they were created in.

### Version 1.1.0 (2026-03-21)
- Variable Autocomplete: Type `/` or `{` in the editor to open a dual-column panel — pick a variable on the left and an option on the right, with full keyboard navigation (↑↓ / → / Enter / Esc).
- Inline Variable Syntax: `{{key: value}}` writes the current value directly into the template for instant preview without switching modes.
- New Image Template Default: Built-in usage tips and real bank variable examples so new templates are ready to use out of the box.
- Mobile Fixes: `isMobileDevice` now uses userAgent + viewport width and responds to resize events, fixing `/explore` occasionally using the desktop layout. The `/` trigger is disabled on mobile to prevent soft-keyboard interference.

### Version 1.0.0 (2026-03-15)
- Smart Split: One-click prompt splitting with automatic variable annotation and bilingual template generation.
- Variable Auto-Detection: Content wrapped in `[]`, `「」`, or `{}` is prioritized as replaceable variables.
- Split Snapshot: View before/after comparison and restore with one click after splitting.
- UX Improvements: Fixed broken image on first upload; long data update notice modal is now scrollable.

### Version 0.9.2 (2026-02-10)
- Material Enhancement: Supported using template materials in assets.

### Version 0.9.1 (2026-02-08)
- Mobile UX: Optimized mobile interaction and small screen adaptation.
- Editor Layout: Refined template editor layout and alignment for better usability.

### Version 0.9.0 (2026-02-08)
- Video Support: Full support for video previews and cover management.
- Mobile Refactor: New mobile editor layout with 60% text width and horizontal scrolling previews.
- Smart Interaction: Auto-collapsing info section when editing on mobile.
- UI Refinement: Optimized upload control sizes and label visibility.

### Version 0.8.2 (2026-01-31)
- Header Refactor: Progressive blur top bar with horizontal tag navigation for mobile.
- Layout Redesign: Integrated drawer toggles in editor header for better spacing on mobile.
- Copy Enhancement: Automatically include recommended platform when copying results.
- UI Refinement: Removed icon backgrounds in settings for a cleaner look.
- Credits Update: Fully updated the list of prompt inspiration contributors.

### Data Version 0.8.7 (2026-01-24)
*   **🛠️ Data Correction**: Updated authors for specific prompt templates.

### Version 0.8.1 (2026-01-22)
*   **✨ Bilingual Custom Terms**: Support for separate CN and EN content in custom options.

### Version 0.8.0 (2026-01-17)
*   **✨ Official AI Features**: AI-powered prompt generation is now available.
*   **📚 Library Expansion**: Significant expansion of the template library with high-quality artistic styles.
*   **🚀 Performance**: Enhanced masonry layout performance and smoother UI transitions.

### Version 0.7.2 (2026-01-13)
*   **🚀 System Upgrade**: Synchronized to V0.7.2 with core performance optimizations.
*   **📊 Data Update**: Data version upgraded to V0.8.4 with new bank expansions and template refinements.
*   **📝 Documentation**: Comprehensive updates to README and release checklists for better workflow.

### Version 0.7.1 (2026-01-07)
*   **💾 Storage Upgrade**: Migrated core data (templates, banks) to **IndexedDB**, overcoming the 5MB limit of LocalStorage.
*   **🛠️ Maintenance**: Temporary disabled AI Terms feature and optimized internal storage architecture.

### Version 0.7.0 (2026-01-03)
*   **📊 Analytics**: Integrated Vercel Analytics for real-time traffic monitoring.
*   **🚀 Export V2**: Support for dynamic short-link QR codes and smart proxy fallback.
*   **🌙 Immersive UI**: Full Dark Mode support for mobile image preview.

### Version 0.6.5 (2025-12-31)
*   **🔗 Link Sharing**: Added support for sharing templates via public URLs.
*   **📊 Data Milestone**: Data version upgraded to V0.7.6 with a comprehensive update to preset banks and templates.
*   **⚡ Optimization**: Improved persistence logic and cross-device data validation.
*   **🎨 UI Refinement**: Fixed minor rendering issues in Dark Mode.

### Version 0.6.1 (2025-12-26)
*   **🔗 Linkage Group Bug Fix**: Fixed loose matching bug in linkage groups.
*   **🆙 Version Alignment**: Synchronized version identifiers site-wide.
*   **🎨 UI Refinement**: Optimized contrast and feedback in dark mode.

### Version 0.6.0 (2025-12-25)
*   **🎨 UI Upgrade & Dark Mode**: Full dark theme support for desktop/mobile and Xmas theme.
*   **🔗 Linkage Groups**: Synchronized variable modifications within groups.
*   **📱 Mobile Depth Optimization**: Better dark mode adaptation and icon contrast.
*   **🐞 Bug Fixes**: Improved export stability and storage reliability.

### Version 0.5.1 (2025-12-22)
*   **📱 Mobile Interaction**: Immersive details, drawer menus, and 3D gyroscope effects.
*   **⚡ Performance**: High-performance Mesh Gradient background and 60FPS scrolling.
*   **🛠️ Data Merging**: Smooth upgrade mechanism for user data migration.

### Version 0.5.0 (2025-12-20)
*   **🏗️ Architecture**: Decoupled components and significant performance improvements.
*   **🎨 New UX**: New Discovery View with masonry layout and floating toolbar.
*   **📸 Enhanced Export**: Wider long images (860px) and improved variable styles.
*   **🔔 Sync Awareness**: App/Template version checking and cloud sync notifications.

### Version 0.4.1 (2025-12-12)
*   **Export Optimization**: JPG format (smaller size), blurry background, and cleaner layout.
*   **Mobile Experience**: Toast notifications instead of alerts and detailed backup info.

---

## 贡献
Issues and Pull Requests are welcome!

## 📦 Third-Party / 第三方

*   **Icons**: [Lucide React](https://lucide.dev/) — [ISC License](https://github.com/lucide-icons/lucide/blob/main/LICENSE). Copyright (c) Lucide Contributors.

## 📄 License
MIT License / [MIT 许可证](LICENSE).

---

<a id="chinese"></a>

# Prompt Fill (提示词填空器)

一个专为 AI 绘画（GPT、Nano Banana 等）设计的**结构化提示词生成工具**。通过可视化的"填空"交互方式，帮助用户快速构建、管理和迭代复杂的 Prompt。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/Version-1.1.2-orange.svg)
![Data](https://img.shields.io/badge/Data-1.1.2-green.svg)
![React](https://img.shields.io/badge/React-18.x-61DAFB.svg)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)

<img width="1343" height="612" alt="image@1x-2" src="https://github.com/user-attachments/assets/7c3d969b-7f63-46fc-a16a-e3074da6c692" />
<img width="1343" height="620" alt="1231333" src="https://github.com/user-attachments/assets/08c90a9f-7b1e-4b3d-84fc-650bccfd1d2b" />

## 📝 写在前面

Prompt Fill 正式发布 **v1.1.2** 版本。本项目初衷是解决 AI 绘画过程中提示词难记忆、难管理、修改繁琐的问题。通过将 Prompt 结构化，让创作变得像"填空"一样简单。

### 🌟 目前进度与核心功能

*   **✅ 变量智能补全**：编辑时输入 `/` 或 `{` 即可弹出双栏补全面板，左选变量、右选选项，支持键盘全程导航。
*   **✅ 内联变量语法**：支持 `{{key: value}}` 直接在模版中写入当前值，实时高亮展示。
*   **✅ 智能拆分**：一键拆分提示词，自动标注变量并生成双语模板。
*   **✅ 视频模版深度支持**：支持视频预览、封面管理及参考素材多源上传。
*   **✅ 正式 AI 赋能**：智能词条扩充功能正式上线。
*   **✅ 全面暗色模式支持**：支持桌面端与移动端的一键主题切换。
*   **✅ 可靠的存储保障**：同时支持浏览器（IndexedDB）与本地文件夹两种存储模式，任意切换均不会丢失模版。
*   **✅ 词组联动系统**：支持变量成组联动，修改一处，全局同步。
*   **✅ 结构化 Prompt 引擎**：支持 `{{variable}}` 语法，自动转化为交互式表单。
*   **✅ 动态词库系统**：预置数百个常用标签，支持分类管理与批量导入。
*   **✅ 高清社交分享**：内置模版封面渲染，支持一键导出精美 JPG 长图。
*   **✅ 模版/版本感知**：官方模版云端同步感知，无需手动刷新。
*   **✅ 纯本地存储**：基于浏览器 LocalStorage，数据完全掌握在自己手中。

---

## ✨ 核心特性

### 🧩 智能词库管理
*   **分类管理**：支持自定义分类并通过颜色区分，视觉更清晰。
*   **双向同步**：预览填空时可直接添加"自定义选项"，自动同步到词库。
*   **分类编辑器**：内置分类管理器，支持颜色配置。
*   **响应式布局**：词库列表支持瀑布流式多列布局。

### 📝 多模版系统
*   **独立模版**：支持创建多个独立的 Prompt 模版。
*   **独立状态**：每个模版的变量选择互不干扰。
*   **副本克隆**：支持一键创建模版副本，方便进行 A/B 测试。

### 🖱️ 可视化交互
*   **所见即所得编辑**：编辑模式下变量根据分类颜色高亮显示。
*   **成组联动 (Linkage Groups)**：设置联动组，具有相同组号的变量自动保持同步。
*   **拖拽插入**：直接将词库卡片拖入编辑区域即可快速插入。
*   **预览模式**：模版中的变量自动渲染为可点击的下拉菜单。
*   **独立实例**：同一变量在模版中出现多次时可分别选择不同值。

### 💾 自动持久化
*   利用 LocalStorage 自动保存所有修改。
*   刷新页面或关闭浏览器后数据不会丢失。

### 🖼️ 图像管理
*   **预览图展示**：每个模版支持关联预览图。
*   **自定义上传**：支持上传自定义图片替换默认预览图。
*   **图片操作**：悬停显示操作按钮：查看大图、上传、重置。
*   **装饰背景**：预览图作为模糊背景显示在模版顶部。

### 📋 导出与分享
*   **一键复制**：复制最终生成的纯净 Prompt 文本。
*   **保存长图**：将填好的模版导出为高清图片，方便分享。
*   **私有短链分享**：支持通过私有服务器生成整洁的短链接（可自建）。

---

## 🛠️ 技术栈

*   **构建工具**: [Vite](https://vitejs.dev/)
*   **前端框架**: [React](https://react.dev/)
*   **样式库**: [Tailwind CSS](https://tailwindcss.com/)
*   **图标库**: [Lucide React](https://lucide.dev/)
*   **导出工具**: [html2canvas](https://html2canvas.hertzen.com/)

---

## 🚀 快速开始

### 前置要求
推荐使用 Node.js v18+。

### 私有分享服务器 (可选)
本项目支持通过私有后端实现短链接分享。
1. **部署后端**：后端代码（Node.js + SQLite）可独立部署。
2. **配置前端**：在根目录创建 `.env` 文件，填入你的 API 地址：
   ```bash
   VITE_SHARE_API_URL=https://your-api.com/api/share
   ```
3. **自动降级**：如果不配置 API，系统会自动降级为“超长链接分享”，无需服务器即可离线使用。

### 安装与运行

1.  **克隆项目**
    ```bash
    git clone https://github.com/TanShilongMario/PromptFill.git
    cd PromptFill
    ```
2.  **安装依赖**
    ```bash
    npm install
    ```
3.  **启动开发服务器**
    ```bash
    npm run dev
    ```
4.  **构建生产版本**
    ```bash
    npm run build
    ```

### 快捷启动脚本
*   **macOS**: `start.command`
*   **Windows**: `start.bat`

### 开发者工具

**导入模板到官方库**

将手动创建的模板转换为内置官方模板：

1.  在 App 中点击模板的"导出模板"按钮，下载 JSON 文件。
2.  运行导入脚本，指定文件路径：
    ```bash
    npm run import -- ~/Downloads/xxx_template.json
    ```
3.  脚本会自动写入 `src/data/templates.js` 和 `src/data/banks.js`。
4.  批量导入完成后，手动更新 `templates.js` 中的 `SYSTEM_DATA_VERSION`。

> **提示**：在本地开发环境（`localhost`）下，分享弹窗中有一个"复制完整数据"按钮，可以直接复制 JSON 数据，然后通过 `npm run import` 交互式粘贴导入。

---

## 📖 使用指南

### 1. 管理分类
点击左侧面板顶部的"管理分类"，添加或修改分类及其颜色。

### 2. 创建词库
点击"创建新变量组"添加词库，支持单条或批量添加选项。

### 3. 编辑模版
点击"编辑模版"进入可视化编辑模式，输入 `{` 即可弹出变量智能补全，也支持手动输入 `{{variable}}` 和拖拽插入。

### 4. 预览与生成
切换回"预览交互"模式，点击变量选择选项，支持直接添加新选项到词库。

### 5. 管理模版图片
悬停在预览图上可查看大图、上传自定义图或重置默认图。

### 6. 导出与分享
复制生成的结果或保存为长图。支持 JSON 导入/导出。

---

## 💡 使用技巧

1.  **批量创建**：添加选项时可一次输入多行。
2.  **模版副本**：使用副本功能进行对比测试。
3.  **颜色编码**：为不同变量设色使结构清晰。
4.  **多实例**：同名变量会自动分配独立索引。
5.  **自定义预览**：上传参考图有助于快速识别。
6.  **图片建议**：推荐 300px 左右的正方形或竖图。
7.  **数据安全**：所有数据存储在本地，建议定期导出备份。
8.  **标签化检索**：通过标签快速定位模版。
9.  **瀑布流浏览**：多张封面浏览更高效。
10. **导入/导出**：一键备份或共享 JSON。
11. **多源上传**：支持本地文件与图片 URL。
12. **本地化存储**：跨设备同步请配合导入/导出。

---

## 🗺️ 路线图

*   **🚀 产品应用化**: iOS 原生应用与桌面端软件。
*   **🤝 模版生态**: 模版一键分享与在线社区。
*   **🤖 AI 智能**: AI 词库扩充与 AI 提示词重组优化。
*   **✨ 深度优化**: 更多高质量模版与无限层级组织。

---

## 📝 更新日志

### Version 1.1.2 (2026-03-28)
- 存储修复：切换到本地文件夹模式前，先将完整数据写入 IndexedDB 快照。无论在哪种存储模式下制作的模版，切换模式后均不会丢失。

### Version 1.1.0 (2026-03-21)
- 变量智能补全：编辑时输入 `/` 或 `{` 弹出双栏补全面板，左选变量、右选选项，支持键盘全程导航（↑↓ / → / Enter / Esc）。
- 内联变量语法：`{{key: value}}` 可直接在模版中写入当前值，实时高亮。
- 新建图像模版默认内容升级：内置使用说明与真实词库示例，开箱即用。
- 移动端修复：设备检测改为 userAgent + 视口双重判断并响应 resize，修复 `/explore` 偶尔显示桌面端样式的问题；移动端禁用 `/` 触发补全，避免软键盘干扰。

### Version 1.0.0 (2026-03-15)
- 智能拆分：一键拆分提示词，自动标注变量并生成双语模板。
- 变量自动识别：支持 `[]`、`「」`、`{}` 括号标记的内容优先识别为可替换变量。
- 拆分快照：拆分后支持查看前后对比并一键还原。
- 体验优化：修复首次上传图片时出现破碎图片的问题；刷新模板弹窗内容过长时支持滚动。

### Version 0.9.2 (2026-02-10)
- 素材功能增强：支持素材使用模版素材。

### Version 0.9.1 (2026-02-08)
- 手机端优化：优化了手机端的交互体验与小屏适配。
- 布局优化：微调了模版编辑面板的布局与对齐方式，提升操作便捷性。

### Version 0.9.0 (2026-02-08)
- 视频模版深度支持：支持视频预览、封面管理及参考素材多源上传。
- 移动端编辑重构：采用“上二下一”新布局，文字区域宽度提升至 60%，预览支持横向滑动。
- 交互优化：手机端编辑或滑动正文时，信息区域支持自动折叠。
- 视觉微调：优化了上传控件尺寸与标签显示逻辑。

### Version 0.8.2 (2026-01-31)
- 首页重构：引入渐进式毛玻璃顶部栏与无滚动条横向标签导航。
- 布局重组：详情页集成模版与词库抽屉开关至顶栏，优化屏幕利用率。
- 复制增强：复制提示词结果时，自动附带推荐的出图平台信息。
- 视觉微调：去除设置界面图标底色，提升整体视觉通透感。
- 鸣谢更新：完整补充了所有提示词灵感贡献作者。

### Data Version 0.8.7 (2026-01-24)
*   **🛠️ 数据修正**：更新了部分提示词模板的作者信息。

### Version 0.8.1 (2026-01-22)
*   **✨ 自定义词条双语支持**：支持在自定义词条时分别输入中文和英文内容。

### Version 0.8.0 (2026-01-17)
*   **✨ 智能词条正式上线**：支持 AI 驱动的词条自动生成与扩展。
*   **📚 模版库大扩充**：新增多款精选高质量 AI 艺术模版。
*   **🚀 极致性能优化**：优化大数据量下的发现页浏览体验。

### Version 0.7.2 (2026-01-13)
*   **🚀 全站版本对齐**：全端同步升级至 V0.7.2 版本，优化系统运行效率。
*   **📊 数据持续更新**：数据版本 0.8.4，包含最新的预置词库扩充与模版优化。
*   **📝 文档同步更新**：全面更新项目 Readme 与发版维护指南。

### Version 0.7.1 (2026-01-07)
*   **💾 存储架构升级**：核心数据（模板、词库）迁移至 **IndexedDB**，彻底解决 LocalStorage 5MB 限制。
*   **🛠️ 系统维护**：暂时下线“智能词条”功能，优化内部存储架构。

### Version 0.7.0 (2026-01-03)
*   **📊 统计集成**：集成 Vercel Analytics，实时掌握应用访问动态。
*   **🚀 导出增强**：支持动态短链接二维码生成，引入图片预缓存与智能代理。
*   **🌙 沉浸体验**：移动端图片预览全面适配暗色模式。

### Version 0.6.5 (2025-12-31)
*   **🔗 链接分享**：新增支持通过公开链接分享模版功能。
*   **📊 数据里程碑**：数据版本升级至 V0.7.6，全面更新预置词库与模版。
*   **⚡ 系统优化**：优化数据持久化逻辑，增强多端同步校验稳定性。
*   **🎨 UI 微调**：修复了暗色模式下的部分细节显示问题。

### Version 0.6.1 (2025-12-26)
*   **🔗 联动组逻辑修复**：修复了联动组匹配过于宽松的 Bug。
*   **🆙 全站版本号对齐**：同步升级了各处的版本号标识。
*   **🎨 UI 细节微调**：优化了暗色模式下的 UI 交互。

### Version 0.6.0 (2025-12-25)
*   **🎨 UI 全面升级与暗色模式**：支持全站暗色模式及圣诞限定彩蛋。
*   **🔗 词组联动功能上线**：支持在同一组内的变量同步更新。
*   **📱 移动端深度优化**：设置页适配及图标美化。
*   **🐞 Bug 修复与体验提升**：导出稳定性与存储写入优化。

### Version 0.5.1 (2025-12-22)
*   **📱 移动端交互大革新**：沉浸式详情页、侧滑抽屉及陀螺仪 3D 效果。
*   **⚡ 性能与稳定性优化**：Mesh Gradient 背景与平滑滚动逻辑。
*   **🛠️ 智能数据合并**：优化了数据迁移逻辑，支持平滑升级。

---

## 贡献
Issues and Pull Requests are welcome!

## 📦 第三方组件

*   **图标**: [Lucide React](https://lucide.dev/) — [ISC 许可证](https://github.com/lucide-icons/lucide/blob/main/LICENSE)。Copyright (c) Lucide Contributors。

## 📄 许可证
MIT License / [MIT 许可证](LICENSE).

---
**Made with ❤️ by 角落工作室**
