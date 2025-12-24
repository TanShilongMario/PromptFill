/**
 * @typedef {Object} TemplateConfig
 * @property {string} id - 唯一識別符，建議使用 'tpl_' 前綴
 * @property {string|Object} name - 模板顯示名稱，支援雙語物件 {'zh-tw': string, en: string} 或單語言字串
 * @property {string|Object} content - 模板內容，支援 markdown 與 {{variable}} 變數，支援雙語物件 {'zh-tw': string, en: string} 或單語言字串
 * @property {string} imageUrl - 預覽縮圖 URL
 * @property {string[]} [imageUrls] - 多圖預覽陣列
 * @property {Object.<string, string|Object>} selections - 預設選中的變數值 map，支援雙語物件或字串
 * @property {string[]} tags - 模板標籤陣列，可選值：建築、人物、攝影、產品、圖表、卡通、寵物、遊戲、創意
 * @property {string|string[]} language - 模板語言，可選值：
 *   - 'zh-tw' - 僅支援中文
 *   - 'en' - 僅支援英文
 *   - ['zh-tw', 'en'] - 支援雙語（預設值）
 * 
 * @example 雙語模板
 * {
 *   id: "tpl_example",
 *   name: { 'zh-tw': "示例模板", en: "Example Template" },
 *   content: { 'zh-tw': "中文內容...", en: "English content..." },
 *   language: ["zh-tw", "en"]
 * }
 * 
 * @example 單語言模板（僅中文）
 * {
 *   id: "tpl_cn_only",
 *   name: "僅中文模板",
 *   content: "中文內容...",
 *   language: "zh-tw"  // 或 ["zh-tw"]
 * }
 */

/**
 * 模板系統版本號，每次更新 templates.js 或 banks.js 時請更新此版本號
 */
export const SYSTEM_DATA_VERSION = "0.7.1";

export const DEFAULT_TEMPLATE_CONTENT = {
  'zh-tw': `### Role (角色設定)
你是一位頂尖的 {{role}}，擅長製作詳盡的角色設定圖（Character Sheet）。你具備「像素級拆解」的能力，能夠透視角色的穿著層級、捕捉微表情變化，並將相關物品具象化還原。你特別擅長透過 {{subject}} 的私密物品、隨身物件和生活細節來側面豐富人物性格與背景故事。

### Task (任務目標)
根據使用者上傳或描述的主體形象，生成一張**「全景式角色深度概念分解圖」**。該圖片必須包含 {{layout_focus}}，並在其周圍環繞展示該人物的服裝分層、不同表情、核心道具、材質特寫，以及極具生活氣息的私密與隨身物品展示。

### Visual Guidelines (視覺規範)
**1. 構圖佈局 (Layout):**
- **中心位 (Center):** 放置角色的 {{layout_focus}}，作為視覺錨點。
- **環繞位 (Surroundings):** 在中心人物四周的留白處，有序排列拆解後的元素。
- **視覺引導 (Connectors):** 使用{{connectors}}，將周邊的拆解物品與中心人物的對應部位或區域連結。

**2. 拆解內容 (Deconstruction Details):**
- **服裝分層 (Clothing Layers):** 將角色的服裝拆分為單品展示。
- **私密內著拆解：** 獨立展示角色的內層衣物，重點突顯設計感與材質。例如： {{underwear_style}}（呈現細節與剪裁）。
- **表情集 (Expression Sheet):** 在角落繪製 3-4 個不同的頭部特寫，呈現不同情緒，如： {{expressions}} 。
- **材質特寫 (Texture & Zoom):** 擷取關鍵部位進行放大特寫，例如： {{texture_zoom}}，增加對小物件材質的描繪。
- **動作：** 繪製特殊動作與表情，例如：{{action_detail}}，增加動態刻畫深度。
- **特殊視角：** 繪製特定場景下的特殊視角，例如：{{special_view}}

- **關聯物品 (Related Items):**
 - **隨身包袋與內容物：** 繪製 {{bag_content}}，並將其「打開」，展示散落在旁的物品。
 - **美妝與護理：** 展示 {{cosmetics}}。
 - **私密生活物件：** 具象化角色隱藏面的物品，依性格可能包含： {{private_items}}，需以設計圖的客觀視角呈現。

**3. 風格與註釋 (Style & Annotations):**
- **畫風：** {{art_style}}，線條乾淨俐落。
- **背景：** {{background_style}}，營造設計手稿氛圍。
- **文字說明：** 在每個拆解元素旁模擬手寫註釋，簡要說明材質或品牌／型號暗示。

### Workflow (執行邏輯)
1. 分析主體的核心特徵、穿著風格與潛在性格。
2. 提取可拆解的一級元素（外套、鞋子、主要表情）。
3. 腦補並設計二級深度元素（內衣風格？包裡裝什麼？獨處時用什麼？）。
4. 生成一張包含所有元素的組合圖，確保透視精準、光影一致、註釋清晰。
5. 使用中文，高清輸出。`,
  en: `### Role
You are a top-tier {{role}}, specializing in creating detailed Character Sheets. You possess the ability of "pixel-level deconstruction," capable of seeing through the layering of characters' outfits, capturing subtle facial expressions, and restoring related items into concrete visuals. You particularly excel at enriching character personalities and background stories through {{subject}}'s private items, personal belongings, and daily life details.

### Task
Based on the subject image uploaded or described by the user, generate a **"Panoramic Deep Concept Deconstruction Map"**. This image must include the character's {{layout_focus}}, surrounded by displays of their clothing layers, different expressions, core props, material close-ups, and intimate and everyday items that evoke a sense of life.

### Visual Guidelines
**1. Layout:**
- **Center:** Place the character's {{layout_focus}} as the visual anchor.
- **Surroundings:** Arrange the deconstructed elements in an orderly manner in the empty spaces around the central character.
- **Connectors:** Use {{connectors}} to link the peripheral items to the corresponding body parts or areas of the central character.

**2. Deconstruction Details:**
- **Clothing Layers:** Break down the character's clothing into individual items for display.
- **Intimate Underwear Deconstruction:** Independently display the character's inner layers, highlighting design sense and materials. For example: {{underwear_style}} (showcasing details and tailoring).
- **Expression Sheet:** Draw 3-4 different head close-ups in the corner, showing different emotions like: {{expressions}}.
- **Texture & Zoom:** Select key parts for enlarged close-ups. For example: {{texture_zoom}}, adding more depiction of the materials of small items.
- **Action:** Draw special movements and expressions, such as: {{action_detail}}, increasing depth in action portrayal.
- **Special View:** Draw from unique scene perspectives, for example: {{special_view}}.

- **Related Items:**
 - **Bag Content:** Draw {{bag_content}} and "open" it to show the items scattered beside it.
 - **Cosmetics & Care:** Show {{cosmetics}}.
 - **Private Life Items:** Concretize the character's hidden-side items. Depending on the personality, these could include: {{private_items}}, presented from an objective design-sheet perspective.

**3. Style & Annotations:**
- **Art Style:** {{art_style}}, with clean and crisp lines.
- **Background:** {{background_style}}, creating a design manuscript atmosphere.
- **Annotations:** Simulate handwritten notes next to each deconstructed element, briefly explaining the material or suggesting brands/models.

### Workflow
1. Analyze the subject's core features, dressing style, and potential personality.
2. Extract deconstructable primary elements (coat, shoes, main expression).
3. Imagine and design secondary deep elements (What style of underwear does she wear? What's in her bag? What does she use when alone?).
4. Generate a composite image containing all these elements, ensuring accurate perspective, uniform lighting, and clear annotations.
5. Use English, high-definition output.`
};

export const TEMPLATE_PHOTO_GRID = {
  'zh-tw': `### Photo Grid Composition（九宮格攝影）

**編輯場景：** 3x3 網格佈局，採用冷灰色無縫背景。人物（面部特徵與上傳圖片完全一致）身穿 {{clothing}}，確保每張照片中的人物形象保持一致。

**燈光設定：** {{lighting}}，營造統一且富有層次的光影效果。

**照片細節包括 (Grid Details)：**
1. {{grid_pose}}，畫面風格統一，鏡頭參數為 {{lens_param}}；
2. {{grid_pose}}，鏡頭參數為 {{lens_param}}，展現不同的拍攝角度與表情；
3. {{grid_pose}}，鏡頭參數為 {{lens_param}}，捕捉細膩的情感表達；
4. {{grid_pose}}，鏡頭參數為 {{lens_param}}，運用景深營造層次感；
5. {{grid_pose}}，鏡頭參數為 {{lens_param}}，突顯動態瞬間的生動性；
6. {{grid_pose}}，鏡頭參數為 {{lens_param}}，透過前景虛化增強視覺焦點；
7. {{grid_pose}}，鏡頭參數為 {{lens_param}}，展現優雅姿態與放鬆狀態；
8. {{grid_pose}}，鏡頭參數為 {{lens_param}}，捕捉自然光線下的表情變化；
9. {{grid_pose}}，鏡頭參數為 {{lens_param}}，微距特寫展現面部細節與質感。

**後製處理：** 保持原始素材的真實感，平滑對比度，適度應用柔化效果，確保整體色調統一且具質感。`,
  en: `### Photo Grid Composition

**Scene:** 3x3 grid layout, using a seamless cool grey background. The character (facial features exactly as in the uploaded image) is wearing {{clothing}}, ensuring character consistency across all photos.

**Lighting:** {{lighting}}, creating a unified and layered lighting effect.

**Grid Details:**
1. {{grid_pose}}, unified style, lens parameter: {{lens_param}};
2. {{grid_pose}}, lens parameter: {{lens_param}}, showing different angles and expressions;
3. {{grid_pose}}, lens parameter: {{lens_param}}, capturing subtle emotional expressions;
4. {{grid_pose}}, lens parameter: {{lens_param}}, using depth of field to create layers;
5. {{grid_pose}}, lens parameter: {{lens_param}}, highlighting the vividness of dynamic moments;
6. {{grid_pose}}, lens parameter: {{lens_param}}, enhancing visual focus through foreground blur;
7. {{grid_pose}}, lens parameter: {{lens_param}}, showing elegant posture and relaxed state;
8. {{grid_pose}}, lens parameter: {{lens_param}}, capturing facial changes under natural light;
9. {{grid_pose}}, lens parameter: {{lens_param}}, macro close-up showing facial details and texture.

**Post-processing:** Maintain the realism of the original material, smooth contrast, apply moderate softening effects, ensuring uniform overall tone and high-quality texture.`
};

export const TEMPLATE_PHOTO_GRID_V2 = {
  'zh-tw': `### Photo Grid Composition（九宮格攝影出格版）

**編輯場景：** 3x3 網格佈局，採用冷灰色無縫背景。人物（面部特徵與上傳圖片完全一致）身穿 {{clothing}}，確保每張照片中的人物形象保持一致。

**燈光設定：** {{lighting}}，營造統一且富有層次的光影效果。

**照片細節包括 (Grid Details)：**
1. {{grid_pose}}，畫面風格統一，鏡頭參數為 {{lens_param}}；
2. {{grid_pose}}，鏡頭參數為 {{lens_param}}，展現不同的拍攝角度與表情；
3. {{grid_pose}}，鏡頭參數為 {{lens_param}}，捕捉細膩的情感表達；
4. {{grid_pose}}，鏡頭參數為 {{lens_param}}，運用景深營造層次感；
5. {{grid_pose}}，鏡頭參數為 {{lens_param}}，突顯動態瞬間的生動性；
6. {{grid_pose}}，鏡頭參數為 {{lens_param}}，透過前景虛化增強視覺焦點；
7. {{grid_pose}}，鏡頭參數為 {{lens_param}}，展現優雅姿態與放鬆狀態；
8. {{grid_pose}}，鏡頭參數為 {{lens_param}}，捕捉自然光線下的表情變化；
9. {{grid_pose}}，鏡頭參數為 {{lens_param}}，微距特寫展現面部細節與質感。

**後製處理：** 保持原始素材的真實感，平滑對比度，適度應用柔化效果，確保整體色調統一且具質感。

**需要單獨處理：** 中央宮格的圖片不侷限在自己的宮格內，形成從中央宮格躍出畫面的 3D 立體視覺。中央宮格人物佔據較大面積且全身出鏡，會覆蓋其他宮格，並對其他宮格形成陰影效果，營造裸眼 3D 的視覺張力。`,
  en: `### Photo Grid Composition (Out-of-Box Version)

**Scene:** 3x3 grid layout, using a seamless cool grey background. The character (facial features exactly as in the uploaded image) is wearing {{clothing}}, ensuring character consistency across all photos.

**Lighting:** {{lighting}}, creating a unified and layered lighting effect.

**Grid Details:**
1. {{grid_pose}}, unified style, lens parameter: {{lens_param}};
2. {{grid_pose}}, lens parameter: {{lens_param}}, showing different angles and expressions;
3. {{grid_pose}}, lens parameter: {{lens_param}}, capturing subtle emotional expressions;
4. {{grid_pose}}, lens parameter: {{lens_param}}, using depth of field to create layers;
5. {{grid_pose}}, lens parameter: {{lens_param}}, highlighting the vividness of dynamic moments;
6. {{grid_pose}}, lens parameter: {{lens_param}}, enhancing visual focus through foreground blur;
7. {{grid_pose}}, lens parameter: {{lens_param}}, showing elegant posture and relaxed state;
8. {{grid_pose}}, lens parameter: {{lens_param}}, capturing facial changes under natural light;
9. {{grid_pose}}, lens parameter: {{lens_param}}, macro close-up showing facial details and texture.

**Post-processing:** Maintain the realism of the original material, smooth contrast, apply moderate softening effects, ensuring uniform overall tone and high-quality texture.

**Special Instructions:** The central grid image is not confined to its own square, creating a 3D visual effect as if jumping out of the frame. The central character occupies a larger area and is shown in full-body, overlapping other squares and casting shadows on them, creating a naked-eye 3D visual tension.`
};

export const TEMPLATE_FASHION_MOODBOARD = {
  'zh-tw': `### Fashion Illustration Moodboard（時尚插畫情緒板）
一張 9:16 直式的高級時尚插畫情緒板，模擬平板掃描效果。

**背景：** 純手繪的奶油色水彩暈染紙張，帶有淡淡的粉色網格。
**視覺核心：** 數張具有明顯白色模切寬邊與柔和投影的亮面乙烯基貼紙。

**貼紙內容：**
- **中央：** {{sticker_core}}，光線明亮。
- **左側：** {{fashion_deconstruct}}。
- **右下角：** 關鍵的隱藏層貼紙：一套摺疊整齊的內衣，展現細膩紋理。
- **互動元素：** 一隻穿著粉色系、與使用者服裝呼應的 {{toy_companion}} 正趴在一個手繪對話框上。

**裝飾細節：** 周圍裝飾著蠟筆質感的 {{sticker_decor}}，以及潦草的中文書法標註 OOTD。
**注意：** 畫面中絕無任何人手、筆或物理桌面背景，純粹的平面藝術插畫。`,
  en: `### Fashion Illustration Moodboard
A high-end 9:16 vertical fashion illustration moodboard, simulating a tablet scan effect.

**Background:** Hand-painted cream-colored watercolor stained paper with a faint pink grid.
**Visual Core:** Several glossy vinyl stickers with distinct white die-cut borders and soft shadows.

**Sticker Contents:**
- **Center:** {{sticker_core}}, with bright lighting.
- **Left Side:** {{fashion_deconstruct}}.
- **Bottom Right:** Key hidden layer sticker: a set of neatly folded underwear, showing fine texture.
- **Interactive Element:** A {{toy_companion}} wearing pink tones that match the user's outfit is leaning on a hand-drawn speech bubble.

**Decorative Details:** Surrounded by crayon-textured {{sticker_decor}} and scribbled calligraphy OOTD annotations.
**Note:** Absolutely no hands, pens, or physical desk backgrounds in the frame; pure flat art illustration.`
};

export const TEMPLATE_CHARACTER_SELFIE = {
  'zh-tw': `### Character Selfie（人物趣味合影）
讓 {{character_companion}} 站在男人旁邊，{{action_pose}}，同時對著鏡頭露出調皮的表情。

**背景：** 以 {{background_scene}} 為背景。

**要求：** 保持自拍構圖不變，讓兩個角色自然融入畫面，光影一致、互動自然。`,
  en: `### Character Selfie
Have {{character_companion}} stand next to the man, {{action_pose}}, while making a playful expression at the camera.

**Background:** Set against the backdrop of {{background_scene}}.

**Requirements:** Maintain the selfie composition, integrating both characters naturally into the frame with unified lighting and natural interaction.`
};

export const TEMPLATE_CLASSIC_SCENE = {
  'zh-tw': `### 經典場景微縮復刻

展示一個精緻的、微縮 3D 卡通風格的 {{classic_scene}} 場景，採用清晰的 45° 俯視等軸側視角（Isometric view）。

**核心構圖：** 將主體最經典的形象突出地置於中央。自動搭配比例適宜的關鍵元素圖示、象徵性物品、迷人的小角色以及能詮釋主體故事的道具。整體佈局應該充滿趣味且緊湊聚集，宛如一套高階的玩具盲盒組合。

**渲染與材質：** 採用 {{render_style}} 風格渲染。建模必須精細、圓潤流暢且質感豐富。使用逼真的 PBR 材質：混合用於有機形態的柔和霧面黏土、用於水體／玻璃元素的光澤樹脂，以及用於結構元件的光滑 PVC 材質。著重呈現具觸感的「看起來手感很好」的紋理細節。

**燈光與氛圍：** 使用柔和、逼真的攝影棚布光搭配全域光照（Global Illumination）。利用柔和的陰影營造溫暖、舒適且充滿魔力的氛圍。

**版面：** 保持乾淨、極簡的佈局，使用與主體配色相協調的純色背景。

**文字：** 在 {{position}} 醒目地展示主體名稱，採用巨大、圓潤的 3D 字體，使其微微懸浮於場景上方。`,
  en: `### Classic Scene Miniature Restoration
Showcase an exquisite, miniature 3D cartoon-style {{classic_scene}} scene, using a clear 45° isometric view.

**Core Composition:** Place the most classic image of the subject prominently in the center. Automatically pair it with appropriately scaled key element icons, symbolic items, charming little characters, and props that interpret the subject's story. The overall layout should be playful and tightly clustered, like a high-end toy blind box set.

**Rendering & Materials:** Render in {{render_style}} style. Modeling must be fine, rounded, smooth, and rich in texture. Use realistic PBR materials: a mix of soft matte clay for organic forms, glossy resin for water/glass elements, and smooth PVC for structural components. Focus on tactile, "looks good to touch" texture details.

**Lighting & Atmosphere:** Use soft, realistic studio lighting with Global Illumination. Utilize soft shadows to create a warm, cozy, and magical atmosphere.

**Layout:** Maintain a clean, minimalist layout with a solid color background that coordinates with the subject's color scheme.

**Text:** At {{position}}, prominently display the subject's name in giant, rounded 3D font, making it slightly float above the scene.`
};

export const TEMPLATE_CORPORATE_GROWTH = {
  'zh-tw': `### 可視化企業成長之路

**角色定義**
你是一位企業演變建築師（Corporate Evolution Architect）。你的目標是創建一張超高密度、垂直堆疊的等距軸測（Isometric）3D 渲染可視化圖像，展示 {{company}} 公司的技術與產品歷史。透過圖像呈現企業的時間線：底部是簡陋的創業故事，透過產品迭代垂直升起，直到現代或未來的巔峰。

**核心能力 | 關鍵視覺策略（rameless Tech-Lapse）：**
- **根除容器：** 嚴禁使用底板、邊框或橫截面視圖。底部邊緣是創業基地（車庫／實驗室／小辦公室），無限延伸。
- **垂直時間線：** 「之字形上升（Zig-Zag Ascent）」穿越創新歷程。
  - 底部（前景）：創業階段歲月 + 第一個原型機
  - 中部（上升中）：快速成長／全球擴張／標誌性的中期產品
  - 頂部（背景）：當前總部／生態系統／未來研發
- **整合 3D 標題：** 企業 Logo 必須渲染為巨大的、電影感的 3D 字體，矗立在前景，使用公司標誌性的字體／材質。

**檢索與梳理：**
- 提取企業歷史的幾個階段。
- 列出定義每個時代的「經典產品」。
- 勞動力演變：可視化員工與設備的變化。

**構圖與光影：**
無框架、無邊界、無橫截面。垂直之字形時間線，將產品世代從底部的創業階段堆疊到頂端的未來。燈光從近現代的暖光（創業初期）過渡到乾淨的白／藍 LED 光（現代科技）。環境與公司經典產品隨高度演變。公司的多款經典產品以「巨物化」呈現。
移軸攝影（Tilt-shift）與 {{render_style}}，畫幅 {{ratio}}。`,
  en: `### Visualized Corporate Growth Path
**Role Definition**
You are a Corporate Evolution Architect. Your goal is to create an ultra-high-density, vertically stacked isometric 3D rendered visualization showing the technological and product history of {{company}}. Showcase a corporate timeline: the base is the humble startup story, rising vertically through product iterations to the modern or future peak.

**Core Competency | Key Visual Strategy (Frameless Tech-Lapse):**
- **Eradicate Containers:** Strictly forbid base plates, borders, or cross-section views. The bottom edge is the startup base (garage/lab/small office), extending infinitely.
- **Vertical Timeline:** A "Zig-Zag Ascent" through the innovation journey.
  - Bottom (Foreground): Startup years + the first prototype.
  - Middle (Ascending): Rapid growth / global expansion / iconic mid-term products.
  - Top (Background): Current headquarters / ecosystem / future R&D.
- **Integrated 3D Title:** The corporate logo must be rendered as a giant, cinematic 3D font, standing in the foreground, using the company's signature font/material.

**Retrieval & Organization:**
- Extract several stages of corporate history.
- List "classic products" defining each era.
- Workforce Evolution: Visualize changes in employees and equipment.

**Composition & Lighting:**
Frameless, borderless, no cross-sections. A vertical zig-zag timeline stacking product generations from the startup phase at the bottom to the future at the top. Lighting transitions from warm near-modern light (early startup) to clean white/blue LED light (modern tech). The environment and company's classic products evolve with height. Multiple classic products are presented as "megaliths."
Tilt-shift photography with {{render_style}}, aspect ratio {{ratio}}.`
};

export const TEMPLATE_DETECTIVE_SOCIAL = {
  'zh-tw': `發揮你的創意一起腦洞，假設 {{character_groups}} 使用 {{social_media}}，包括回覆、評論、按讚，設計一些有趣、有反差的人物在社群媒體互動朋友圈的場景，結合符合人物的大事件，有趣有梗有反差，製作一張 {{social_media}} 的截圖，使用中文，{{ratio}}。`,
  en: `Use your creativity to brainstorm with me. Imagine {{character_groups}} using {{social_media}}, including replying, commenting, and liking. Design some fun, high-contrast scenarios of characters interacting on social media feeds, combining big events that fit the characters with humor, memes, and contrast. Create a screenshot of {{social_media}}, in English, with aspect ratio {{ratio}}.`
};

export const TEMPLATE_MAGAZINE_COVER = {
  'zh-tw': `### PROJECT GOAL | 專案目標
生成一張 9:16 旅遊雜誌封面級照片，以我上傳的真人照片為基準，實現 100% 五官還原，呈現專業、精緻、具有真實雜誌質感的封面畫面。

### SUBJECT | 人物設定
依據我上傳人物的五官特徵完整還原；人物置身於 {{travel_location}}，請依該地即時的天氣、溫度與季節穿著邏輯為人物搭配服裝；整體風格自然、優雅、有現場氛圍。

### POSE & EXPRESSION | 姿態與表情
人物以雜誌封面標準姿態入鏡，略帶從容質感；面部表情自然放鬆但具吸引力；
身體姿勢依場景與天氣自由調整，呈現「在當地旅行的真實狀態」。

### ENVIRONMENT | 場景要求
背景呈現使用者輸入地名的代表性視覺線索，請依該地即時的天氣、溫度與季節場景邏輯呈現；保持高級寫實風格，不誇張、不超現實；
光線以真實自然光為主，具有現場環境的時間感。

### CAMERA & AESTHETICS | 拍攝規格
畫幅比例：{{ratio}}
構圖：充分利用直幅空間，打造「封面級」視覺中心；鏡頭語言：專業攝影棚等級的清晰度與景深；膚質細節可見毛孔與自然紋理（非磨皮）；整體氛圍具備高級旅遊雜誌的真實感與美感。

### MAGAZINE DESIGN | 封面設計
版面風格現代、乾淨，具國際旅遊雜誌氛圍；
主標、副標、雜誌圖形元素可自動生成但需與人物與地點匹配；
色彩搭配高級、協調；
最終呈現接近《Vogue》《National Geographic Traveler》級的封面氣質。`,
  en: `### PROJECT GOAL
Generate a 9:16 travel magazine cover-quality photo based on the uploaded real-life photo, achieving 100% facial feature restoration, presenting a professional, exquisite, and authentic magazine-textured cover.

### SUBJECT
Fully restore based on the uploaded person's facial features; the person is located in {{travel_location}}. Please dress the character according to the real-time weather, temperature, and seasonal clothing logic of that location; the overall style should be natural, elegant, and atmospheric.

### POSE & EXPRESSION
The person enters the frame in a standard magazine cover pose, with a touch of composed quality; natural and relaxed facial expressions but with attractiveness.
Body posture adapts freely according to the scene and weather, presenting a "real state of traveling locally."

### ENVIRONMENT
The background shows representative visual cues of the location input by the user. Please present scene logic consistent with the local real-time weather, temperature, and season; maintain a high-end realistic style, not exaggerated or surreal.
Lighting is mainly natural, with a sense of time of the site environment.

### CAMERA & AESTHETICS
Aspect Ratio: {{ratio}}
Composition: Make full use of vertical space to create a "cover-level" visual center. Lens language: Professional studio-level clarity and depth of field; skin texture shows pores and natural grain (no smoothing); overall atmosphere has the realism and beauty of a high-end travel magazine.

### MAGAZINE DESIGN
Modern, clean layout with an international travel magazine vibe.
Main title, subtitle, and magazine graphic elements can be automatically generated but must match the person and location.
High-end, coordinated color palette.
The final result should approach the cover temperament of "Vogue" or "National Geographic Traveler."`
};

export const TEMPLATE_MANGA_TO_REALITY = {
  'zh-tw': `### SUBJECT | 人物主體
{{character_originality}}，從漫畫分鏡邊框中跨步走出並打破界線。真實版本與漫畫版本之間充滿動態且無縫的互動。

### SETTING | 場景設定
地點：{{comic_scene}}
地板上攤開一本巨大的漫畫書。

### MANGA DETAILS | 漫畫細節
- **風格：** 超現實風格的黑白四格漫畫
- **技法：** 正宗日式排版，網點紙效果，粗黑墨線，線條清晰俐落
- **內容：** 同一個人的漫畫版本被困在漫畫書裡
- **對比：** 單色漫畫世界與鮮豔現實世界的強烈視覺對比

### REAL LIFE VERSION | 真實版本
- **視覺質感：** 生動、色彩豐富、照片級真實感、超逼真 8K 畫質
- **互動方式：** 動態地浮現在漫畫表面，直接與漫畫版本互動
- **情緒氛圍：** 元風格（Meta），幽默的相遇

### TECHNICAL SPECS | 技術規格
- **畫質：** 超逼真，8K 解析度，高度細節化
- **融合效果：** 漫畫線條藝術與現實攝影的無縫融合
- **畫幅比例：** {{ratio}}`,
  en: `### SUBJECT
{{character_originality}}, stepping out from the manga panel borders and breaking boundaries. A dynamic and seamless interaction between the real-life version and the manga version.

### SETTING
Location: {{comic_scene}}
A giant manga book is spread open on the floor.

### MANGA DETAILS
- **Style:** Surreal black and white four-panel manga.
- **Technique:** Authentic Japanese layout, screentone effects, thick black ink lines, clean and sharp linework.
- **Content:** The manga version of the same person is trapped inside the manga book.
- **Contrast:** Strong visual contrast between the monochromatic manga world and the vibrant real world.

### REAL LIFE VERSION
- **Visual Texture:** Vivid, colorful, photo-realistic, ultra-realistic 8K quality.
- **Interaction:** Dynamically emerging from the manga surface, interacting directly with the manga version.
- **Atmosphere:** Meta-style, a humorous encounter.

### TECHNICAL SPECS
- **Image Quality:** Ultra-realistic, 8K resolution, highly detailed.
- **Blending:** Seamless fusion of manga line art and real-life photography.
- **Aspect Ratio:** {{ratio}}`
};

export const TEMPLATE_FISHEYE_URBAN = {
  'zh-tw': `### 極端魚眼都市奇觀

{{character_originality}}，用 {{lens_type}} 拍攝的照片，主體是一位穿著 {{school_uniform}} 的 {{subject}}，在 {{urban_location}} 興奮地跳起，{{dynamic_action}}。

**視覺焦點：**
- **前景細節：** {{fingernail_detail}}
- **背景景觀：** {{building_cluster}}，街道上擠滿行人與車輛
- **超現實元素：** {{monster_element}} 漂浮在城市上空，{{monster_feature}} 環繞扭曲的城市景觀

**整體基調：**
打造一個融合現實與奇幻的都市奇觀，魚眼鏡頭的畸變效果與卡通怪獸的出現形成強烈對比，營造夢幻且充滿活力的視覺衝擊。`,
  en: `### Extreme Fisheye Urban Spectacle
{{character_originality}}, a photo taken with {{lens_type}}, the subject is a {{subject}} wearing {{school_uniform}}, jumping excitedly in {{urban_location}}, {{dynamic_action}}.

**Visual Focus:**
- **Foreground Detail:** {{fingernail_detail}}.
- **Background Landscape:** {{building_cluster}}, streets packed with pedestrians and vehicles.
- **Surreal Elements:** {{monster_element}} floating above the city, with {{monster_feature}} surrounding the distorted urban landscape.

**Overall Tone:**
Create an urban spectacle blending reality and fantasy. The distortion of the fisheye lens contrasted with the appearance of cartoon monsters creates a dreamy and vibrant visual impact.`
};

export const TEMPLATE_INDUSTRIAL_DESIGN = {
  'zh-tw': `### 目標
設計一個頂級的工業設計產品介紹頁，使用極簡的宣傳頁風格；需要深刻理解該設計師的設計理念、設計風格，並將這種理解完全融入產品的工業設計與展示頁面。

### 內容
- **設計師：** {{designer}}
- **產品：** {{design_item}}

### 畫面
- **設計師介紹：**
占整個畫面極少的部分，包括設計師介紹（極具氛圍感的頭像）與設計師對此產品的設計思路與理解，以及設計師簽名。
- **畫面核心內容：**
占整體 80% 以上，用於呈現產品本身；一張完全符合設計師風格與方法的頂級產品設計圖（單張完整效果）。基於工業成品設計成果使用不同構圖。整體配色需與設計師風格與產品內容完全相符。
- **構圖：**
最終構圖：{{ratio}}
整體排版主次分明、規整，極具格調與設計特色。`,
  en: `### Goal
Design a top-tier industrial design product introduction page using a minimalist promotional layout. Deeply understand the designer's philosophy and style, and fully integrate this design understanding into the product's industrial design and presentation page.

### Content
- **Designer:** {{designer}}
- **Product:** {{design_item}}

### Visuals
- **Designer Intro:**
Occupies a very small part of the frame, including a bio (with an atmospheric portrait), the designer's thoughts and design philosophy for this product, and their signature.
- **Core Content:**
80% or more of the frame is used to present the product itself—a top-tier product design illustration fully consistent with the designer's own style and methods (a complete single product effect presentation). Use different compositions based on the industrial design results. The overall color scheme must match the designer's style and product content.
- **Composition:**
Final Composition: {{ratio}}.
The overall layout is clear in hierarchy, organized, and highly stylish and characteristic.`
};

export const TEMPLATE_RAINDROP_ART = {
  'zh-tw': `### Raindrop Art（雨滴定格藝術）

**核心表現：**
捕捉雨滴落入水面的瞬間，雨滴打落在水面上，飛濺的水珠在空中形成抽象的 {{rain_shape}}。

**藝術視覺：**
水滴構成的結果相對概念化，更遵循水滴濺落的動態感，但能從動作或神態中感受到其傳達的藝術視覺。畫面將雨水與自然互動的微妙之美定格，動感與優雅交融，呈現詩意的視覺表達。

**環境背景：**
背景是朦朧的雨景。

**規格：**
{{ratio}}`,
  en: `### Raindrop Art
**Core Performance:**
Capture the moment a raindrop falls into the water surface, with the splashing droplets forming an abstract {{rain_shape}} in the air.

**Artistic Vision:**
The resulting water droplet form is relatively conceptual, following the dynamic feel of the splash, yet the artistic vision can be felt through the movement or pose. The image is a frozen-in-time artwork of the subtle beauty of rain interacting with nature, blending dynamism and elegance to present a poetic visual expression.

**Environment/Background:**
The background is a hazy rainy scene.

**Specifications:**
{{ratio}}`
};

export const TEMPLATE_ART_GROWTH = {
  'zh-tw': `### 可視化藝術成長之路

**角色定義**
你是一位歷史演變建築師（History Evolution Architect）。你的目標是創建一張超高密度、垂直堆疊的等距軸測（Isometric）3D 展廳渲染可視化圖像，展示 {{art_type}} 的發展歷史。透過展廳呈現里程碑的時間線：底部是簡陋的初期，隨歷史更迭垂直上升，直到現代或未來的巔峰。

**核心能力 | 關鍵視覺策略（rameless Tech-Lapse）：**
- **展廳模擬：** 使用多層藝術展廳承載要表達的發展，樓層代表時間維度，每層可有不同「房間」展示同一時代不同風格作品。
- **根除容器：** 嚴禁使用底板、邊框或橫截面視圖。底部邊緣是歷史起源（原始社會或古代社會）。
- **垂直時間線：** 「之字形上升（Zig-Zag Ascent）」穿越創新歷程。
  - 底部（前景）：起源與原型
  - 中部（上升中）：古代到現代的輝煌發展
  - 頂部（背景）：當前發展狀態與未來可能性
- **整合 3D 標題：** 明確且符合主題的標題

**檢索與梳理：**
- 提取重要發展歷史中的幾個階段。
- 列出定義每個時代的「經典」。
- 工具與媒介的變化。

**構圖與光影：**
等距視角的展廳視角。垂直之字形時間線，將發展從底部的起點堆疊到頂端的未來，環境與劃時代的經典作品隨高度演變。多款經典產品以「巨物化」呈現。  
移軸攝影（Tilt-shift）與 {{render_style}}，畫幅 {{ratio}}。`,
  en: `### Visualized Artistic Growth Path
**Role Definition**
You are a History Evolution Architect. Your goal is to create an ultra-high-density, vertically stacked isometric 3D gallery render showing the development history of {{art_type}}. Use a gallery to showcase a milestone timeline: the base is the humble early stages, rising vertically through historical changes to the modern or future peak.

**Core Competency | Key Visual Strategy (Frameless Tech-Lapse):**
- **Gallery Simulation:** Use a multi-level art gallery to host the development. Levels represent temporal progression, with different "rooms" potentially showing different styles from the same era.
- **Eradicate Containers:** Strictly forbid base plates, borders, or cross-section views. The bottom edge is the historical origin (primitive or ancient society).
- **Vertical Timeline:** A "Zig-Zag Ascent" through the innovation journey.
  - Bottom (Foreground): Origins and prototypes.
  - Middle (Ascending): Brilliant development from ancient to modern times.
  - Top (Background): Current development status and future possibilities.
- **Integrated 3D Title:** A clear title consistent with the theme.

**Retrieval & Organization:**
- Extract several important historical development stages.
- List "classics" defining each era.
- Changes in tools and media.

**Composition & Lighting:**
Isometric gallery view. A vertical zig-zag timeline stacking development from the base to the future at the top. The environment and era-defining classics evolve with height. Multiple classic products are presented as "megaliths."
Tilt-shift photography with {{render_style}}, aspect ratio {{ratio}}.`
};

export const TEMPLATE_MINIATURE_DESK = {
  'zh-tw': `### 窗邊書桌微縮場景

展示一個在窗邊書桌上的場景。

**核心內容：**
《{{show_name}}》的經典鏡頭微縮場景展示，採用 {{render_style}} 風格，充分體現微縮攝影的藝術表達。

**環境背景：**
背景是真實的書桌，有一些製作工具、散亂的書本，營造剛加工完這個場景的凌亂感。書桌上還有編製的圖紙與原型手稿。

**窗外互動：**
窗外，真實的 {{character_name}} 正好奇地向內觀看桌上的作品。

**畫面規格：**
{{ratio}}`,
  en: `### Window-side Desk Miniature Scene
Displays a scene on a desk by a window.

**Core Content:**
A miniature restoration of a classic scene from "{{show_name}}", using the {{render_style}} style, fully embodying the artistic expression of miniature photography.

**Environment/Background:**
The background is a real desk, with some crafting tools and scattered books, creating a sense of messiness as if the scene was just finished. There are also woven plans and prototype manuscripts on the desk.

**Window Interaction:**
Outside the window, a real {{character_name}} is curiously looking inside at the work on the desk.

**Image Specs:**
{{ratio}}`
};

/**
 * 可用的模板標籤
 */
export const TEMPLATE_TAGS = [
  "建築",
  "人物",
  "攝影",
  "產品",
  "圖表",
  "卡通",
  "寵物",
  "遊戲",
  "創意",
  "多奇教育訓練"
];

/**
 * 系統內建模板清單
 *
 * 如何新增模板：
 * 1. 在上方定義模板內容常數（可選，但推薦）
 * 2. 在陣列中加入新的配置物件
 * 3. 確保 id 唯一
 * 4. imageUrl 可以是外部連結，也可以是專案內的 import 資源
 * 5. tags 可從 TEMPLATE_TAGS 中選擇
 */
export const INITIAL_TEMPLATES_CONFIG = [
  {
    id: "tpl_default",
    name: { 'zh-tw': "角色概念分解圖", en: "Character Concept Sheet" },
    content: DEFAULT_TEMPLATE_CONTENT,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/08/ec433cf214faf102.jpg",
    author: "官方",
    selections: {},
    tags: ["人物", "創意", "圖表"],
    language: ["zh-tw", "en"]
  },
  {
    id: "tpl_photo_grid",
    name: { 'zh-tw': "3x3 攝影網格", en: "3x3 Photo Grid" },
    content: TEMPLATE_PHOTO_GRID,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/08/5302794e63fa130b.jpg",
    author: "官方",
    selections: {
      "clothing": { 'zh-tw': "炭灰色無袖連衣裙", en: "Charcoal grey sleeveless dress" },
      "grid_pose-0": { 'zh-tw': "前景手指虛化", en: "Out-of-focus fingers in foreground" },
      "grid_pose-1": { 'zh-tw': "目光鎖定鏡頭", en: "Eyes locked on camera" },
      "grid_pose-2": { 'zh-tw': "單色下巴托手", en: "Monochrome hand on chin" },
      "grid_pose-3": { 'zh-tw': "正面特寫陰影", en: "Frontal close-up with shadows" },
      "grid_pose-4": { 'zh-tw': "斜角拍攝", en: "Angled shot" },
      "grid_pose-5": { 'zh-tw': "雙手置於鎖骨", en: "Hands on collarbones" },
      "grid_pose-6": { 'zh-tw': "坐姿半身側面", en: "Seated half-body profile" },
      "grid_pose-7": { 'zh-tw': "側面微距水滴", en: "Side macro with water drops" },
      "grid_pose-8": { 'zh-tw': "回眸一笑", en: "Looking back with a smile" },
      "lens_param-0": { 'zh-tw': "85mm, f/1.8", en: "85mm, f/1.8" },
      "lens_param-1": { 'zh-tw': "85mm, f/2.0", en: "85mm, f/2.0" },
      "lens_param-2": { 'zh-tw': "50mm, f/2.2", en: "50mm, f/2.2" },
      "lens_param-3": { 'zh-tw': "50mm, f/2.5", en: "50mm, f/2.5" },
      "lens_param-4": { 'zh-tw': "50mm, f/3.2", en: "50mm, f/3.2" },
      "lens_param-5": { 'zh-tw': "35mm, f/4.5", en: "35mm, f/4.5" },
      "lens_param-6": { 'zh-tw': "85mm, f/1.9", en: "85mm, f/1.9" },
      "lens_param-7": { 'zh-tw': "50mm, f/1.8", en: "50mm, f/1.8" },
      "lens_param-8": { 'zh-tw': "85mm, f/2.2", en: "85mm, f/2.2" }
    },
    tags: ["人物", "攝影"],
    language: ["zh-tw", "en"]
  },
  {
    id: "tpl_fashion",
    name: { 'zh-tw': "時尚情緒板插畫", en: "Fashion Moodboard" },
    content: TEMPLATE_FASHION_MOODBOARD,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/08/4d9f92ccb4113fdd.jpg",
    author: "官方",
    selections: {},
    tags: ["人物", "創意", "卡通"],
    language: ["zh-tw", "en"]
  },
  {
    id: "tpl_character_selfie",
    name: { 'zh-tw': "人物趣味合影", en: "Character Selfie" },
    content: TEMPLATE_CHARACTER_SELFIE,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/08/c2312d24d0f2c38e.jpeg",
    author: "官方",
    selections: {},
    tags: ["人物", "創意"],
    language: ["zh-tw", "en"]
  },
  {
    id: "tpl_classic_scene",
    name: { 'zh-tw': "經典場景微縮復刻", en: "Classic Scene Miniature" },
    content: TEMPLATE_CLASSIC_SCENE,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/10/1eac697f5a438542.jpg",
    author: "官方",
    selections: {
      "classic_scene": { 'zh-tw': "千與千尋", en: "Spirited Away" },
      "render_style": { 'zh-tw': "Octane Render 和 Cinema 4D", en: "Octane Render and Cinema 4D" },
      "position": { 'zh-tw': "頂部中央", en: "Top Center" }
    },
    tags: ["卡通", "創意", "遊戲"],
    language: ["zh-tw", "en"]
  },
  {
    id: "tpl_corporate_growth",
    name: { 'zh-tw': "可視化企業成長之路", en: "Corporate Evolution Path" },
    content: TEMPLATE_CORPORATE_GROWTH,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/10/a7e87e49c6144fdc.jpg",
    author: "官方",
    selections: {
      "company": { 'zh-tw': "任天堂（Nintendo）", en: "Nintendo" },
      "render_style": { 'zh-tw': "3D 像素風格", en: "3D Pixel Art Style" },
      "ratio": { 'zh-tw': "3:4 直式構圖", en: "3:4 Vertical" }
    },
    tags: ["建築", "創意", "圖表"],
    language: ["zh-tw", "en"]
  },
  {
    id: "tpl_fisheye_urban",
    name: { 'zh-tw': "極端魚眼都市奇觀", en: "Fisheye Urban Wonder" },
    content: TEMPLATE_FISHEYE_URBAN,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/14/b21165a2afefaf4d.jpg",
    author: "官方",
    selections: {
      "lens_type": { 'zh-tw': "極端魚眼鏡頭", en: "Extreme Fisheye Lens" },
      "role": { 'zh-tw': "年輕女性", en: "Young woman" },
      "character_originality": { 'zh-tw': "使用附圖中的人物，確保結果與人物一致性", en: "Use character in attachment, ensure consistency" },
      "school_uniform": { 'zh-tw': "灰色開襟衫和格子裙校服", en: "Grey cardigan and plaid skirt uniform" },
      "urban_location": { 'zh-tw': "澀谷十字路口", en: "Shibuya Crossing" },
      "dynamic_action": { 'zh-tw': "一隻手誇張地伸向鏡頭前景", en: "One hand exaggeratedly reaching towards the foreground" },
      "fingernail_detail": { 'zh-tw': "手指甲清晰可見", en: "Fingernails clearly visible" },
      "building_cluster": { 'zh-tw': "扭曲的澀谷 109 大樓與林立建築", en: "Distorted Shibuya 109 building and other forest of buildings" },
      "crowd_traffic": { 'zh-tw': "擠滿行人與車輛", en: "Bustling traffic" },
      "monster_element": { 'zh-tw': "巨大的粉藍漸層卡通怪獸", en: "Giant pink and blue gradient cartoon monster" },
      "monster_feature": { 'zh-tw': "巨大的觸手與角", en: "Giant tentacles and horns" },
      "distorted_city": { 'zh-tw': "扭曲的城市景觀", en: "Distorted urban landscape" },
      "lighting_atmosphere": { 'zh-tw': "陽光明媚", en: "Sunny" },
      "shadow_contrast": { 'zh-tw': "光影對比強烈", en: "Strong light-shadow contrast" },
      "ratio": { 'zh-tw': "圓形畫幅", en: "Circular Aspect Ratio" },
      "render_style": { 'zh-tw': "高品質 2D 插畫風格", en: "High-quality 2D illustration style" }
    },
    tags: ["攝影", "創意", "人物"],
    language: ["zh-tw", "en"]
  },
  {
    id: "tpl_detective_social",
    name: { 'zh-tw': "歷史名人的朋友圈", en: "Historical Figure's Moments" },
    content: TEMPLATE_DETECTIVE_SOCIAL,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/14/6ff892060de55ea9.jpg",
    author: "@dotey(寶玉)",
    selections: {
      "character_groups": { 'zh-tw': "中國古代開國皇帝", en: "Ancient Chinese Founding Emperors" },
      "social_media": { 'zh-tw': "臉書塗鴉牆", en: "WeChat Moments" },
      "ratio": { 'zh-tw': "9:16 直式構圖", en: "9:16 Vertical" }
    },
    tags: ["創意", "人物", "攝影"],
    language: ["zh-tw", "en"]
  },
  {
    id: "tpl_magazine_cover",
    name: { 'zh-tw': "雜誌大片", en: "Magazine Cover" },
    content: TEMPLATE_MAGAZINE_COVER,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/16/a6106f5cc6e92a74.jpg",
    imageUrls: [
      "https://s3.bmp.ovh/imgs/2025/12/16/a6106f5cc6e92a74.jpg",
      "https://s3.bmp.ovh/imgs/2025/12/16/cf8edb6f54db15bf.jpg"
    ],
    author: "官方",
    selections: {
      "travel_location": { 'zh-tw': "東北雪鄉", en: "Snow Village in Northeast China" },
      "ratio": { 'zh-tw': "9:16 直式構圖", en: "9:16 Vertical" }
    },
    tags: ["人物", "攝影", "創意"],
    language: ["zh-tw", "en"]
  },
  {
    id: "tpl_manga_reality",
    name: { 'zh-tw': "漫畫人物成真", en: "Manga to Reality" },
    content: TEMPLATE_MANGA_TO_REALITY,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/16/f5291c56ece88cd9.jpg",
    author: "官方",
    selections: {
      "character_originality": { 'zh-tw': "使用附圖中的人物，確保結果與人物一致性", en: "Use character in attachment, ensure consistency" },
      "comic_scene": { 'zh-tw': "唯美的臥室", en: "Beautiful bedroom" },
      "ratio": { 'zh-tw': "9:16 直式構圖", en: "9:16 Vertical" }
    },
    tags: ["人物", "創意", "卡通"],
    language: ["zh-tw", "en"]
  },
  {
    id: "tpl_industrial_design",
    name: { 'zh-tw': "設計大師的產品設計", en: "Industrial Design Masterpiece" },
    content: TEMPLATE_INDUSTRIAL_DESIGN,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/17/7dbe43ae66b1a78c.jpg",
    author: "官方",
    selections: {
      "designer": { 'zh-tw': "Jonathan Ive (Jony Ive)", en: "Jonathan Ive" },
      "design_item": { 'zh-tw': "無人機", en: "Drone" },
      "ratio": { 'zh-tw': "3:4 直式構圖", en: "3:4 Vertical" }
    },
    tags: ["產品", "創意", "圖表"],
    language: ["zh-tw", "en"]
  },
  {
    id: "tpl_photo_grid_v2",
    name: { 'zh-tw': "3x3 攝影網格出格版", en: "3x3 Photo Grid (Out of Box)" },
    content: TEMPLATE_PHOTO_GRID_V2,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/17/77bfd2bf7abc3eac.png",
    author: "官方",
    selections: {
      "clothing": { 'zh-tw': "炭灰色無袖連衣裙", en: "Charcoal grey sleeveless dress" },
      "grid_pose-0": { 'zh-tw': "前景手指虛化", en: "Out-of-focus fingers in foreground" },
      "grid_pose-1": { 'zh-tw': "目光鎖定鏡頭", en: "Eyes locked on camera" },
      "grid_pose-2": { 'zh-tw': "單色下巴托手", en: "Monochrome hand on chin" },
      "grid_pose-3": { 'zh-tw': "正面特寫陰影", en: "Frontal close-up with shadows" },
      "grid_pose-4": { 'zh-tw': "斜角拍攝", en: "Angled shot" },
      "grid_pose-5": { 'zh-tw': "雙手置於鎖骨", en: "Hands on collarbones" },
      "grid_pose-6": { 'zh-tw': "坐姿半身側面", en: "Seated half-body profile" },
      "grid_pose-7": { 'zh-tw': "側面微距水滴", en: "Side macro with water drops" },
      "grid_pose-8": { 'zh-tw': "回眸一笑", en: "Looking back with a smile" },
      "lens_param-0": { 'zh-tw': "85mm, f/1.8", en: "85mm, f/1.8" },
      "lens_param-1": { 'zh-tw': "85mm, f/2.0", en: "85mm, f/2.0" },
      "lens_param-2": { 'zh-tw': "50mm, f/2.2", en: "50mm, f/2.2" },
      "lens_param-3": { 'zh-tw': "50mm, f/2.5", en: "50mm, f/2.5" },
      "lens_param-4": { 'zh-tw': "50mm, f/3.2", en: "50mm, f/3.2" },
      "lens_param-5": { 'zh-tw': "35mm, f/4.5", en: "35mm, f/4.5" },
      "lens_param-6": { 'zh-tw': "85mm, f/1.9", en: "85mm, f/1.9" },
      "lens_param-7": { 'zh-tw': "50mm, f/1.8", en: "50mm, f/1.8" },
      "lens_param-8": { 'zh-tw': "85mm, f/2.2", en: "85mm, f/2.2" }
    },
    tags: ["人物", "攝影"],
    language: ["zh-tw", "en"]
  },
  {
    id: "tpl_raindrop_art",
    name: { 'zh-tw': "雨滴定格藝術", en: "Raindrop Art" },
    content: TEMPLATE_RAINDROP_ART,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/19/6b6e14845635b168.jpg",
    author: "@tanshilong",
    selections: {
      "rain_shape": { 'zh-tw': "芭蕾舞者", en: "Ballerina" },
      "ratio": { 'zh-tw': "3:4 直式構圖", en: "3:4 Vertical" }
    },
    tags: ["攝影", "創意"],
    language: ["zh-tw", "en"]
  },
  {
    id: "tpl_art_growth",
    name: { 'zh-tw': "可視化藝術成長之路", en: "Artistic Evolution Path" },
    content: TEMPLATE_ART_GROWTH,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/19/47a2cbfec635a29a.jpg", 
    author: "@sundyme",
    selections: {
      "art_type": { 'zh-tw': "美術學", en: "Fine Arts" },
      "render_style": { 'zh-tw': "3D 像素風格", en: "3D Pixel Art Style" },
      "ratio": { 'zh-tw': "3:4 直式構圖", en: "3:4 Vertical" }
    },
    tags: ["建築", "創意", "圖表"],
    language: ["zh-tw", "en"]
  },
  {
    id: "tpl_miniature_desk",
    name: { 'zh-tw': "窗邊書桌微縮場景", en: "Window Desk Miniature" },
    content: TEMPLATE_MINIATURE_DESK,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/20/8e9c9c28b3d2cf1b.jpg",
    author: "@tanshilong",
    selections: {
      "show_name": { 'zh-tw': "龍貓", en: "My Neighbor Totoro" },
      "character_name": { 'zh-tw': "龍貓", en: "Totoro" },
      "render_style": { 'zh-tw': "毛氈與黏土", en: "Felt and Clay" },
      "ratio": { 'zh-tw': "4:3 橫向構圖", en: "4:3 Horizontal" }
    },
    tags: ["攝影", "創意", "卡通"],
    language: ["zh-tw", "en"]
  }
];

