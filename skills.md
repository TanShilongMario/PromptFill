# 模版创作技能指南 (Skills.md)

本指南旨在规范 Prompt Fill 项目中模版的创作流程，确保模版的高质量、可维护性以及多语言支持。

---

## 1. 书写规则 (Writing Rules)

### 1.1 双语模式 (Bilingual Support)
模版必须支持中英双语。所有用户可见的文本（包括模版名称、模版内容、变量标签、选项等）都应遵循以下结构：
- **对象形式**: `{ cn: "中文内容", en: "English Content" }`
- **模版内容**: 在 `src/data/templates.js` 中定义常量时，使用双语对象包裹 Markdown 字符串。

### 1.2 变量语法 (Variable Syntax)
- 使用双大括号包裹变量名：`{{variable_name}}`。
- 变量名应具有描述性，建议使用小写字母和下划线（如 `{{art_style}}`, `{{subject_pose}}`）。

### 1.3 ID 命名规范
- **模版 ID**: 必须以 `tpl_` 开头（如 `tpl_character_sheet`）。
- **词库变量名**: 尽量简洁且具有通用性。

---

## 2. 书写逻辑 (Writing Logic)

### 2.1 模块化创作
1. **定义内容常量**: 在 `src/data/templates.js` 顶部定义模版内容的 `cn` 和 `en` 字符串。
2. **配置模版对象**: 在 `INITIAL_TEMPLATES_CONFIG` 数组中添加配置，关联内容常量。
3. **设置默认值**: 在 `selections` 中为每个变量指定合理的初始值。

### 2.2 词库引用逻辑 (Bank Reference Logic)
- **优先复用**: 在引入新变量前，务必检查 `src/data/banks.js` 中是否已有类似的词库。
- **变量控制**: 
    - 每个模版引入的变量不宜过多，保持核心提示词的精简。
    - 除非是“多人多动作”等需要极高细节描述的场景，否则应尽量复用现有词库。
- **一致性**: 确保变量在 `banks.js` 中的 `label` 和 `options` 与模版的视觉需求匹配。

---

## 3. 注意事项 (Precautions)

### 3.1 版本号更新策略
- **普通更新**: 在日常修改或本地测试模版时，**不需要**更新 `src/data/templates.js` 中的 `SYSTEM_DATA_VERSION`。
- **最终发布**: 仅在准备将代码最终上传至 Git 仓库时，才需要统一更新版本号（如从 `0.7.5` 升级到 `0.7.6`）。

### 3.2 提示词质量
- **结构化**: 使用 Markdown 的标题（#）、列表（-）和粗体（**）来增强提示词对 AI 的可读性。
- **细节描写**: 模版中应包含关于摄影参数（Lens, Lighting）、材质（Texture）、构图（Composition）的专业描述。

### 3.3 图片预览
- 确保 `imageUrl` 指向清晰、具有代表性的预览图。
- 如果支持多图展示，请使用 `imageUrls` 数组。

---

## 4. 示例代码参考

### 词库定义 (`src/data/banks.js`)
```javascript
export const INITIAL_BANKS = {
  my_variable: {
    label: { cn: "变量标签", en: "Variable Label" },
    category: "visual",
    options: [
      { cn: "选项一", en: "Option One" },
      { cn: "选项二", en: "Option Two" }
    ]
  }
};
```

### 模版配置 (`src/data/templates.js`)
```javascript
export const TEMPLATE_EXAMPLE = {
  cn: `### 示例标题\n这是一个使用了 {{my_variable}} 的模版。`,
  en: `### Example Title\nThis is a template using {{my_variable}}.`
};

// 在 INITIAL_TEMPLATES_CONFIG 中
{
  id: "tpl_example",
  name: { cn: "示例模版", en: "Example Template" },
  content: TEMPLATE_EXAMPLE,
  tags: ["创意"],
  language: ["cn", "en"]
}
```
