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
    "id": "tpl_default",
    "name": {
      "zh-tw": "角色概念分解圖",
      "en": "Character Concept Sheet"
    },
    "content": {
      "zh-tw": "### Role (角色設定)\n你是一位頂尖的 {{role}}，擅長製作詳盡的角色設定圖（Character Sheet）。你具備「像素級拆解」的能力，能夠透視角色的穿著層級、捕捉微表情變化，並將相關物品具象化還原。你特別擅長透過 {{subject}} 的私密物品、隨身物件和生活細節來側面豐富人物性格與背景故事。\n\n### Task (任務目標)\n根據使用者上傳或描述的主體形象，生成一張**「全景式角色深度概念分解圖」**。該圖片必須包含 {{layout_focus}}，並在其周圍環繞展示該人物的服裝分層、不同表情、核心道具、材質特寫，以及極具生活氣息的私密與隨身物品展示。\n\n### Visual Guidelines (視覺規範)\n**1. 構圖佈局 (Layout):**\n- **中心位 (Center):** 放置角色的 {{layout_focus}}，作為視覺錨點。\n- **環繞位 (Surroundings):** 在中心人物四周的留白處，有序排列拆解後的元素。\n- **視覺引導 (Connectors):** 使用{{connectors}}，將周邊的拆解物品與中心人物的對應部位或區域連結。\n\n**2. 拆解內容 (Deconstruction Details):**\n- **服裝分層 (Clothing Layers):** 將角色的服裝拆分為單品展示。\n- **私密內著拆解：** 獨立展示角色的內層衣物，重點突顯設計感與材質。例如： {{underwear_style}}（呈現細節與剪裁）。\n- **表情集 (Expression Sheet):** 在角落繪製 3-4 個不同的頭部特寫，呈現不同情緒，如： {{expressions}} 。\n- **材質特寫 (Texture & Zoom):** 擷取關鍵部位進行放大特寫，例如： {{texture_zoom}}，增加對小物件材質的描繪。\n- **動作：** 繪製特殊動作與表情，例如：{{action_detail}}，增加動態刻畫深度。\n- **特殊視角：** 繪製特定場景下的特殊視角，例如：{{special_view}}\n\n- **關聯物品 (Related Items):**\n - **隨身包袋與內容物：** 繪製 {{bag_content}}，並將其「打開」，展示散落在旁的物品。\n - **美妝與護理：** 展示 {{cosmetics}}。\n - **私密生活物件：** 具象化角色隱藏面的物品，依性格可能包含： {{private_items}}，需以設計圖的客觀視角呈現。\n\n**3. 風格與註釋 (Style & Annotations):**\n- **畫風：** {{art_style}}，線條乾淨俐落。\n- **背景：** {{background_style}}，營造設計手稿氛圍。\n- **文字說明：** 在每個拆解元素旁模擬手寫註釋，簡要說明材質或品牌／型號暗示。\n\n### Workflow (執行邏輯)\n1. 分析主體的核心特徵、穿著風格與潛在性格。\n2. 提取可拆解的一級元素（外套、鞋子、主要表情）。\n3. 腦補並設計二級深度元素（內衣風格？包裡裝什麼？獨處時用什麼？）。\n4. 生成一張包含所有元素的組合圖，確保透視精準、光影一致、註釋清晰。\n5. 使用中文，高清輸出。",
      "en": "### Role\nYou are a top-tier {{role}}, specializing in creating detailed Character Sheets. You possess the ability of \"pixel-level deconstruction,\" capable of seeing through the layering of characters' outfits, capturing subtle facial expressions, and restoring related items into concrete visuals. You particularly excel at enriching character personalities and background stories through {{subject}}'s private items, personal belongings, and daily life details.\n\n### Task\nBased on the subject image uploaded or described by the user, generate a **\"Panoramic Deep Concept Deconstruction Map\"**. This image must include the character's {{layout_focus}}, surrounded by displays of their clothing layers, different expressions, core props, material close-ups, and intimate and everyday items that evoke a sense of life.\n\n### Visual Guidelines\n**1. Layout:**\n- **Center:** Place the character's {{layout_focus}} as the visual anchor.\n- **Surroundings:** Arrange the deconstructed elements in an orderly manner in the empty spaces around the central character.\n- **Connectors:** Use {{connectors}} to link the peripheral items to the corresponding body parts or areas of the central character.\n\n**2. Deconstruction Details:**\n- **Clothing Layers:** Break down the character's clothing into individual items for display.\n- **Intimate Underwear Deconstruction:** Independently display the character's inner layers, highlighting design sense and materials. For example: {{underwear_style}} (showcasing details and tailoring).\n- **Expression Sheet:** Draw 3-4 different head close-ups in the corner, showing different emotions like: {{expressions}}.\n- **Texture & Zoom:** Select key parts for enlarged close-ups. For example: {{texture_zoom}}, adding more depiction of the materials of small items.\n- **Action:** Draw special movements and expressions, such as: {{action_detail}}, increasing depth in action portrayal.\n- **Special View:** Draw from unique scene perspectives, for example: {{special_view}}.\n\n- **Related Items:**\n - **Bag Content:** Draw {{bag_content}} and \"open\" it to show the items scattered beside it.\n - **Cosmetics & Care:** Show {{cosmetics}}.\n - **Private Life Items:** Concretize the character's hidden-side items. Depending on the personality, these could include: {{private_items}}, presented from an objective design-sheet perspective.\n\n**3. Style & Annotations:**\n- **Art Style:** {{art_style}}, with clean and crisp lines.\n- **Background:** {{background_style}}, creating a design manuscript atmosphere.\n- **Annotations:** Simulate handwritten notes next to each deconstructed element, briefly explaining the material or suggesting brands/models.\n\n### Workflow\n1. Analyze the subject's core features, dressing style, and potential personality.\n2. Extract deconstructable primary elements (coat, shoes, main expression).\n3. Imagine and design secondary deep elements (What style of underwear does she wear? What's in her bag? What does she use when alone?).\n4. Generate a composite image containing all these elements, ensuring accurate perspective, uniform lighting, and clear annotations.\n5. Use English, high-definition output."
    },
    "imageUrl": "https://s3.bmp.ovh/imgs/2025/12/08/ec433cf214faf102.jpg",
    "author": "官方",
    "selections": {},
    "tags": [
      "人物",
      "創意",
      "圖表"
    ],
    "language": [
      "zh-tw",
      "en"
    ]
  },
  {
    "id": "tpl_photo_grid",
    "name": {
      "zh-tw": "3x3 攝影網格",
      "en": "3x3 Photo Grid"
    },
    "content": {
      "zh-tw": "### Photo Grid Composition（九宮格攝影）\n\n**編輯場景：** 3x3 網格佈局，採用冷灰色無縫背景。人物（面部特徵與上傳圖片完全一致）身穿 {{clothing}}，確保每張照片中的人物形象保持一致。\n\n**燈光設定：** {{lighting}}，營造統一且富有層次的光影效果。\n\n**照片細節包括 (Grid Details)：**\n1. {{grid_pose}}，畫面風格統一，鏡頭參數為 {{lens_param}}；\n2. {{grid_pose}}，鏡頭參數為 {{lens_param}}，展現不同的拍攝角度與表情；\n3. {{grid_pose}}，鏡頭參數為 {{lens_param}}，捕捉細膩的情感表達；\n4. {{grid_pose}}，鏡頭參數為 {{lens_param}}，運用景深營造層次感；\n5. {{grid_pose}}，鏡頭參數為 {{lens_param}}，突顯動態瞬間的生動性；\n6. {{grid_pose}}，鏡頭參數為 {{lens_param}}，透過前景虛化增強視覺焦點；\n7. {{grid_pose}}，鏡頭參數為 {{lens_param}}，展現優雅姿態與放鬆狀態；\n8. {{grid_pose}}，鏡頭參數為 {{lens_param}}，捕捉自然光線下的表情變化；\n9. {{grid_pose}}，鏡頭參數為 {{lens_param}}，微距特寫展現面部細節與質感。\n\n**後製處理：** 保持原始素材的真實感，平滑對比度，適度應用柔化效果，確保整體色調統一且具質感。",
      "en": "### Photo Grid Composition\n\n**Scene:** 3x3 grid layout, using a seamless cool grey background. The character (facial features exactly as in the uploaded image) is wearing {{clothing}}, ensuring character consistency across all photos.\n\n**Lighting:** {{lighting}}, creating a unified and layered lighting effect.\n\n**Grid Details:**\n1. {{grid_pose}}, unified style, lens parameter: {{lens_param}};\n2. {{grid_pose}}, lens parameter: {{lens_param}}, showing different angles and expressions;\n3. {{grid_pose}}, lens parameter: {{lens_param}}, capturing subtle emotional expressions;\n4. {{grid_pose}}, lens parameter: {{lens_param}}, using depth of field to create layers;\n5. {{grid_pose}}, lens parameter: {{lens_param}}, highlighting the vividness of dynamic moments;\n6. {{grid_pose}}, lens parameter: {{lens_param}}, enhancing visual focus through foreground blur;\n7. {{grid_pose}}, lens parameter: {{lens_param}}, showing elegant posture and relaxed state;\n8. {{grid_pose}}, lens parameter: {{lens_param}}, capturing facial changes under natural light;\n9. {{grid_pose}}, lens parameter: {{lens_param}}, macro close-up showing facial details and texture.\n\n**Post-processing:** Maintain the realism of the original material, smooth contrast, apply moderate softening effects, ensuring uniform overall tone and high-quality texture."
    },
    "imageUrl": "https://s3.bmp.ovh/imgs/2025/12/08/5302794e63fa130b.jpg",
    "author": "官方",
    "selections": {
      "clothing": {
        "zh-tw": "炭灰色無袖連衣裙",
        "en": "Charcoal grey sleeveless dress"
      },
      "grid_pose-0": {
        "zh-tw": "前景手指虛化",
        "en": "Out-of-focus fingers in foreground"
      },
      "grid_pose-1": {
        "zh-tw": "目光鎖定鏡頭",
        "en": "Eyes locked on camera"
      },
      "grid_pose-2": {
        "zh-tw": "單色下巴托手",
        "en": "Monochrome hand on chin"
      },
      "grid_pose-3": {
        "zh-tw": "正面特寫陰影",
        "en": "Frontal close-up with shadows"
      },
      "grid_pose-4": {
        "zh-tw": "斜角拍攝",
        "en": "Angled shot"
      },
      "grid_pose-5": {
        "zh-tw": "雙手置於鎖骨",
        "en": "Hands on collarbones"
      },
      "grid_pose-6": {
        "zh-tw": "坐姿半身側面",
        "en": "Seated half-body profile"
      },
      "grid_pose-7": {
        "zh-tw": "側面微距水滴",
        "en": "Side macro with water drops"
      },
      "grid_pose-8": {
        "zh-tw": "回眸一笑",
        "en": "Looking back with a smile"
      },
      "lens_param-0": {
        "zh-tw": "85mm, f/1.8",
        "en": "85mm, f/1.8"
      },
      "lens_param-1": {
        "zh-tw": "85mm, f/2.0",
        "en": "85mm, f/2.0"
      },
      "lens_param-2": {
        "zh-tw": "50mm, f/2.2",
        "en": "50mm, f/2.2"
      },
      "lens_param-3": {
        "zh-tw": "50mm, f/2.5",
        "en": "50mm, f/2.5"
      },
      "lens_param-4": {
        "zh-tw": "50mm, f/3.2",
        "en": "50mm, f/3.2"
      },
      "lens_param-5": {
        "zh-tw": "35mm, f/4.5",
        "en": "35mm, f/4.5"
      },
      "lens_param-6": {
        "zh-tw": "85mm, f/1.9",
        "en": "85mm, f/1.9"
      },
      "lens_param-7": {
        "zh-tw": "50mm, f/1.8",
        "en": "50mm, f/1.8"
      },
      "lens_param-8": {
        "zh-tw": "85mm, f/2.2",
        "en": "85mm, f/2.2"
      }
    },
    "tags": [
      "人物",
      "攝影"
    ],
    "language": [
      "zh-tw",
      "en"
    ]
  },
  {
    "id": "tpl_fashion",
    "name": {
      "zh-tw": "時尚情緒板插畫",
      "en": "Fashion Moodboard"
    },
    "content": {
      "zh-tw": "### Fashion Illustration Moodboard（時尚插畫情緒板）\n一張 9:16 直式的高級時尚插畫情緒板，模擬平板掃描效果。\n\n**背景：** 純手繪的奶油色水彩暈染紙張，帶有淡淡的粉色網格。\n**視覺核心：** 數張具有明顯白色模切寬邊與柔和投影的亮面乙烯基貼紙。\n\n**貼紙內容：**\n- **中央：** {{sticker_core}}，光線明亮。\n- **左側：** {{fashion_deconstruct}}。\n- **右下角：** 關鍵的隱藏層貼紙：一套摺疊整齊的內衣，展現細膩紋理。\n- **互動元素：** 一隻穿著粉色系、與使用者服裝呼應的 {{toy_companion}} 正趴在一個手繪對話框上。\n\n**裝飾細節：** 周圍裝飾著蠟筆質感的 {{sticker_decor}}，以及潦草的中文書法標註 OOTD。\n**注意：** 畫面中絕無任何人手、筆或物理桌面背景，純粹的平面藝術插畫。",
      "en": "### Fashion Illustration Moodboard\nA high-end 9:16 vertical fashion illustration moodboard, simulating a tablet scan effect.\n\n**Background:** Hand-painted cream-colored watercolor stained paper with a faint pink grid.\n**Visual Core:** Several glossy vinyl stickers with distinct white die-cut borders and soft shadows.\n\n**Sticker Contents:**\n- **Center:** {{sticker_core}}, with bright lighting.\n- **Left Side:** {{fashion_deconstruct}}.\n- **Bottom Right:** Key hidden layer sticker: a set of neatly folded underwear, showing fine texture.\n- **Interactive Element:** A {{toy_companion}} wearing pink tones that match the user's outfit is leaning on a hand-drawn speech bubble.\n\n**Decorative Details:** Surrounded by crayon-textured {{sticker_decor}} and scribbled calligraphy OOTD annotations.\n**Note:** Absolutely no hands, pens, or physical desk backgrounds in the frame; pure flat art illustration."
    },
    "imageUrl": "https://s3.bmp.ovh/imgs/2025/12/08/4d9f92ccb4113fdd.jpg",
    "author": "官方",
    "selections": {},
    "tags": [
      "人物",
      "創意",
      "卡通"
    ],
    "language": [
      "zh-tw",
      "en"
    ]
  },
  {
    "id": "tpl_character_selfie",
    "name": {
      "zh-tw": "人物趣味合影",
      "en": "Character Selfie"
    },
    "content": {
      "zh-tw": "### Character Selfie（人物趣味合影）\n讓 {{character_companion}} 站在男人旁邊，{{action_pose}}，同時對著鏡頭露出調皮的表情。\n\n**背景：** 以 {{background_scene}} 為背景。\n\n**要求：** 保持自拍構圖不變，讓兩個角色自然融入畫面，光影一致、互動自然。 {{role}} ",
      "en": "### Character Selfie\nHave {{character_companion}} stand next to the man, {{action_pose}}, while making a playful expression at the camera.\n\n**Background:** Set against the backdrop of {{background_scene}}.\n\n**Requirements:** Maintain the selfie composition, integrating both characters naturally into the frame with unified lighting and natural interaction."
    },
    "imageUrl": "https://s3.bmp.ovh/imgs/2025/12/08/c2312d24d0f2c38e.jpeg",
    "author": "官方",
    "selections": {
      "character_companion-0": {
        "zh-tw": "神奇女俠 (Wonder Woman)",
        "en": "Wonder Woman"
      },
      "action_pose-0": {
        "zh-tw": "互相指著對方大笑",
        "en": "Pointing at each other and laughing"
      },
      "background_scene-0": {
        "zh-tw": "廢棄的工業倉庫",
        "en": "Abandoned industrial warehouse"
      }
    },
    "tags": [
      "人物",
      "創意"
    ],
    "language": [
      "zh-tw",
      "en"
    ]
  },
  {
    "id": "tpl_classic_scene",
    "name": {
      "zh-tw": "經典場景微縮復刻",
      "en": "Classic Scene Miniature"
    },
    "content": {
      "zh-tw": "### 經典場景微縮復刻\n\n展示一個精緻的、微縮 3D 卡通風格的 {{classic_scene}} 場景，採用清晰的 45° 俯視等軸側視角（Isometric view）。\n\n**核心構圖：** 將主體最經典的形象突出地置於中央。自動搭配比例適宜的關鍵元素圖示、象徵性物品、迷人的小角色以及能詮釋主體故事的道具。整體佈局應該充滿趣味且緊湊聚集，宛如一套高階的玩具盲盒組合。\n\n**渲染與材質：** 採用 {{render_style}} 風格渲染。建模必須精細、圓潤流暢且質感豐富。使用逼真的 PBR 材質：混合用於有機形態的柔和霧面黏土、用於水體／玻璃元素的光澤樹脂，以及用於結構元件的光滑 PVC 材質。著重呈現具觸感的「看起來手感很好」的紋理細節。\n\n**燈光與氛圍：** 使用柔和、逼真的攝影棚布光搭配全域光照（Global Illumination）。利用柔和的陰影營造溫暖、舒適且充滿魔力的氛圍。\n\n**版面：** 保持乾淨、極簡的佈局，使用與主體配色相協調的純色背景。\n\n**文字：** 在 {{position}} 醒目地展示主體名稱，採用巨大、圓潤的 3D 字體，使其微微懸浮於場景上方。",
      "en": "### Classic Scene Miniature Restoration\nShowcase an exquisite, miniature 3D cartoon-style {{classic_scene}} scene, using a clear 45° isometric view.\n\n**Core Composition:** Place the most classic image of the subject prominently in the center. Automatically pair it with appropriately scaled key element icons, symbolic items, charming little characters, and props that interpret the subject's story. The overall layout should be playful and tightly clustered, like a high-end toy blind box set.\n\n**Rendering & Materials:** Render in {{render_style}} style. Modeling must be fine, rounded, smooth, and rich in texture. Use realistic PBR materials: a mix of soft matte clay for organic forms, glossy resin for water/glass elements, and smooth PVC for structural components. Focus on tactile, \"looks good to touch\" texture details.\n\n**Lighting & Atmosphere:** Use soft, realistic studio lighting with Global Illumination. Utilize soft shadows to create a warm, cozy, and magical atmosphere.\n\n**Layout:** Maintain a clean, minimalist layout with a solid color background that coordinates with the subject's color scheme.\n\n**Text:** At {{position}}, prominently display the subject's name in giant, rounded 3D font, making it slightly float above the scene."
    },
    "imageUrl": "https://s3.bmp.ovh/imgs/2025/12/10/1eac697f5a438542.jpg",
    "author": "官方",
    "selections": {
      "classic_scene": {
        "zh-tw": "千與千尋",
        "en": "Spirited Away"
      },
      "render_style": {
        "zh-tw": "Octane Render 和 Cinema 4D",
        "en": "Octane Render and Cinema 4D"
      },
      "position": {
        "zh-tw": "頂部中央",
        "en": "Top Center"
      }
    },
    "tags": [
      "卡通",
      "創意",
      "遊戲"
    ],
    "language": [
      "zh-tw",
      "en"
    ]
  },
  {
    "id": "tpl_corporate_growth",
    "name": {
      "zh-tw": "可視化企業成長之路",
      "en": "Corporate Evolution Path"
    },
    "content": {
      "zh-tw": "### 可視化企業成長之路\n\n**角色定義**\n你是一位企業演變建築師（Corporate Evolution Architect）。你的目標是創建一張超高密度、垂直堆疊的等距軸測（Isometric）3D 渲染可視化圖像，展示 {{company}} 公司的技術與產品歷史。透過圖像呈現企業的時間線：底部是簡陋的創業故事，透過產品迭代垂直升起，直到現代或未來的巔峰。\n\n**核心能力 | 關鍵視覺策略（rameless Tech-Lapse）：**\n- **根除容器：** 嚴禁使用底板、邊框或橫截面視圖。底部邊緣是創業基地（車庫／實驗室／小辦公室），無限延伸。\n- **垂直時間線：** 「之字形上升（Zig-Zag Ascent）」穿越創新歷程。\n  - 底部（前景）：創業階段歲月 + 第一個原型機\n  - 中部（上升中）：快速成長／全球擴張／標誌性的中期產品\n  - 頂部（背景）：當前總部／生態系統／未來研發\n- **整合 3D 標題：** 企業 Logo 必須渲染為巨大的、電影感的 3D 字體，矗立在前景，使用公司標誌性的字體／材質。\n\n**檢索與梳理：**\n- 提取企業歷史的幾個階段。\n- 列出定義每個時代的「經典產品」。\n- 勞動力演變：可視化員工與設備的變化。\n\n**構圖與光影：**\n無框架、無邊界、無橫截面。垂直之字形時間線，將產品世代從底部的創業階段堆疊到頂端的未來。燈光從近現代的暖光（創業初期）過渡到乾淨的白／藍 LED 光（現代科技）。環境與公司經典產品隨高度演變。公司的多款經典產品以「巨物化」呈現。\n移軸攝影（Tilt-shift）與 {{render_style}}，畫幅 {{ratio}}。",
      "en": "### Visualized Corporate Growth Path\n**Role Definition**\nYou are a Corporate Evolution Architect. Your goal is to create an ultra-high-density, vertically stacked isometric 3D rendered visualization showing the technological and product history of {{company}}. Showcase a corporate timeline: the base is the humble startup story, rising vertically through product iterations to the modern or future peak.\n\n**Core Competency | Key Visual Strategy (Frameless Tech-Lapse):**\n- **Eradicate Containers:** Strictly forbid base plates, borders, or cross-section views. The bottom edge is the startup base (garage/lab/small office), extending infinitely.\n- **Vertical Timeline:** A \"Zig-Zag Ascent\" through the innovation journey.\n  - Bottom (Foreground): Startup years + the first prototype.\n  - Middle (Ascending): Rapid growth / global expansion / iconic mid-term products.\n  - Top (Background): Current headquarters / ecosystem / future R&D.\n- **Integrated 3D Title:** The corporate logo must be rendered as a giant, cinematic 3D font, standing in the foreground, using the company's signature font/material.\n\n**Retrieval & Organization:**\n- Extract several stages of corporate history.\n- List \"classic products\" defining each era.\n- Workforce Evolution: Visualize changes in employees and equipment.\n\n**Composition & Lighting:**\nFrameless, borderless, no cross-sections. A vertical zig-zag timeline stacking product generations from the startup phase at the bottom to the future at the top. Lighting transitions from warm near-modern light (early startup) to clean white/blue LED light (modern tech). The environment and company's classic products evolve with height. Multiple classic products are presented as \"megaliths.\"\nTilt-shift photography with {{render_style}}, aspect ratio {{ratio}}."
    },
    "imageUrl": "https://s3.bmp.ovh/imgs/2025/12/10/a7e87e49c6144fdc.jpg",
    "author": "官方",
    "selections": {
      "company": {
        "zh-tw": "任天堂（Nintendo）",
        "en": "Nintendo"
      },
      "render_style": {
        "zh-tw": "3D 像素風格",
        "en": "3D Pixel Art Style"
      },
      "ratio": {
        "zh-tw": "3:4 直式構圖",
        "en": "3:4 Vertical"
      }
    },
    "tags": [
      "建築",
      "創意",
      "圖表"
    ],
    "language": [
      "zh-tw",
      "en"
    ]
  },
  {
    "id": "tpl_fisheye_urban",
    "name": {
      "zh-tw": "極端魚眼都市奇觀",
      "en": "Fisheye Urban Wonder"
    },
    "content": {
      "zh-tw": "### 極端魚眼都市奇觀\n\n{{character_originality}}，用 {{lens_type}} 拍攝的照片，主體是一位穿著 {{school_uniform}} 的 {{subject}}，在 {{urban_location}} 興奮地跳起，{{dynamic_action}}。\n\n**視覺焦點：**\n- **前景細節：** {{fingernail_detail}}\n- **背景景觀：** {{building_cluster}}，街道上擠滿行人與車輛\n- **超現實元素：** {{monster_element}} 漂浮在城市上空，{{monster_feature}} 環繞扭曲的城市景觀\n\n**整體基調：**\n打造一個融合現實與奇幻的都市奇觀，魚眼鏡頭的畸變效果與卡通怪獸的出現形成強烈對比，營造夢幻且充滿活力的視覺衝擊。",
      "en": "### Extreme Fisheye Urban Spectacle\n{{character_originality}}, a photo taken with {{lens_type}}, the subject is a {{subject}} wearing {{school_uniform}}, jumping excitedly in {{urban_location}}, {{dynamic_action}}.\n\n**Visual Focus:**\n- **Foreground Detail:** {{fingernail_detail}}.\n- **Background Landscape:** {{building_cluster}}, streets packed with pedestrians and vehicles.\n- **Surreal Elements:** {{monster_element}} floating above the city, with {{monster_feature}} surrounding the distorted urban landscape.\n\n**Overall Tone:**\nCreate an urban spectacle blending reality and fantasy. The distortion of the fisheye lens contrasted with the appearance of cartoon monsters creates a dreamy and vibrant visual impact."
    },
    "imageUrl": "https://s3.bmp.ovh/imgs/2025/12/14/b21165a2afefaf4d.jpg",
    "author": "官方",
    "selections": {
      "lens_type": {
        "zh-tw": "極端魚眼鏡頭",
        "en": "Extreme Fisheye Lens"
      },
      "role": {
        "zh-tw": "年輕女性",
        "en": "Young woman"
      },
      "character_originality": {
        "zh-tw": "使用附圖中的人物，確保結果與人物一致性",
        "en": "Use character in attachment, ensure consistency"
      },
      "school_uniform": {
        "zh-tw": "灰色開襟衫和格子裙校服",
        "en": "Grey cardigan and plaid skirt uniform"
      },
      "urban_location": {
        "zh-tw": "澀谷十字路口",
        "en": "Shibuya Crossing"
      },
      "dynamic_action": {
        "zh-tw": "一隻手誇張地伸向鏡頭前景",
        "en": "One hand exaggeratedly reaching towards the foreground"
      },
      "fingernail_detail": {
        "zh-tw": "手指甲清晰可見",
        "en": "Fingernails clearly visible"
      },
      "building_cluster": {
        "zh-tw": "扭曲的澀谷 109 大樓與林立建築",
        "en": "Distorted Shibuya 109 building and other forest of buildings"
      },
      "crowd_traffic": {
        "zh-tw": "擠滿行人與車輛",
        "en": "Bustling traffic"
      },
      "monster_element": {
        "zh-tw": "巨大的粉藍漸層卡通怪獸",
        "en": "Giant pink and blue gradient cartoon monster"
      },
      "monster_feature": {
        "zh-tw": "巨大的觸手與角",
        "en": "Giant tentacles and horns"
      },
      "distorted_city": {
        "zh-tw": "扭曲的城市景觀",
        "en": "Distorted urban landscape"
      },
      "lighting_atmosphere": {
        "zh-tw": "陽光明媚",
        "en": "Sunny"
      },
      "shadow_contrast": {
        "zh-tw": "光影對比強烈",
        "en": "Strong light-shadow contrast"
      },
      "ratio": {
        "zh-tw": "圓形畫幅",
        "en": "Circular Aspect Ratio"
      },
      "render_style": {
        "zh-tw": "高品質 2D 插畫風格",
        "en": "High-quality 2D illustration style"
      }
    },
    "tags": [
      "攝影",
      "創意",
      "人物"
    ],
    "language": [
      "zh-tw",
      "en"
    ]
  },
  {
    "id": "tpl_detective_social",
    "name": {
      "zh-tw": "歷史名人的朋友圈",
      "en": "Historical Figure's Moments"
    },
    "content": {
      "zh-tw": "發揮你的創意一起腦洞，假設 {{character_groups}} 使用 {{social_media}}，包括回覆、評論、按讚，設計一些有趣、有反差的人物在社群媒體互動朋友圈的場景，結合符合人物的大事件，有趣有梗有反差，製作一張 {{social_media}} 的截圖，使用中文，{{ratio}}。",
      "en": "Use your creativity to brainstorm with me. Imagine {{character_groups}} using {{social_media}}, including replying, commenting, and liking. Design some fun, high-contrast scenarios of characters interacting on social media feeds, combining big events that fit the characters with humor, memes, and contrast. Create a screenshot of {{social_media}}, in English, with aspect ratio {{ratio}}."
    },
    "imageUrl": "https://s3.bmp.ovh/imgs/2025/12/14/6ff892060de55ea9.jpg",
    "author": "@dotey(寶玉)",
    "selections": {
      "character_groups": {
        "zh-tw": "中國古代開國皇帝",
        "en": "Ancient Chinese Founding Emperors"
      },
      "social_media": {
        "zh-tw": "臉書塗鴉牆",
        "en": "WeChat Moments"
      },
      "ratio": {
        "zh-tw": "9:16 直式構圖",
        "en": "9:16 Vertical"
      }
    },
    "tags": [
      "創意",
      "人物",
      "攝影"
    ],
    "language": [
      "zh-tw",
      "en"
    ]
  },
  {
    "id": "tpl_magazine_cover",
    "name": {
      "zh-tw": "雜誌大片",
      "en": "Magazine Cover"
    },
    "content": {
      "zh-tw": "### PROJECT GOAL | 專案目標\n生成一張 9:16 旅遊雜誌封面級照片，以我上傳的真人照片為基準，實現 100% 五官還原，呈現專業、精緻、具有真實雜誌質感的封面畫面。\n\n### SUBJECT | 人物設定\n依據我上傳人物的五官特徵完整還原；人物置身於 {{travel_location}}，請依該地即時的天氣、溫度與季節穿著邏輯為人物搭配服裝；整體風格自然、優雅、有現場氛圍。\n\n### POSE & EXPRESSION | 姿態與表情\n人物以雜誌封面標準姿態入鏡，略帶從容質感；面部表情自然放鬆但具吸引力；\n身體姿勢依場景與天氣自由調整，呈現「在當地旅行的真實狀態」。\n\n### ENVIRONMENT | 場景要求\n背景呈現使用者輸入地名的代表性視覺線索，請依該地即時的天氣、溫度與季節場景邏輯呈現；保持高級寫實風格，不誇張、不超現實；\n光線以真實自然光為主，具有現場環境的時間感。\n\n### CAMERA & AESTHETICS | 拍攝規格\n畫幅比例：{{ratio}}\n構圖：充分利用直幅空間，打造「封面級」視覺中心；鏡頭語言：專業攝影棚等級的清晰度與景深；膚質細節可見毛孔與自然紋理（非磨皮）；整體氛圍具備高級旅遊雜誌的真實感與美感。\n\n### MAGAZINE DESIGN | 封面設計\n版面風格現代、乾淨，具國際旅遊雜誌氛圍；\n主標、副標、雜誌圖形元素可自動生成但需與人物與地點匹配；\n色彩搭配高級、協調；\n最終呈現接近《Vogue》《National Geographic Traveler》級的封面氣質。",
      "en": "### PROJECT GOAL\nGenerate a 9:16 travel magazine cover-quality photo based on the uploaded real-life photo, achieving 100% facial feature restoration, presenting a professional, exquisite, and authentic magazine-textured cover.\n\n### SUBJECT\nFully restore based on the uploaded person's facial features; the person is located in {{travel_location}}. Please dress the character according to the real-time weather, temperature, and seasonal clothing logic of that location; the overall style should be natural, elegant, and atmospheric.\n\n### POSE & EXPRESSION\nThe person enters the frame in a standard magazine cover pose, with a touch of composed quality; natural and relaxed facial expressions but with attractiveness.\nBody posture adapts freely according to the scene and weather, presenting a \"real state of traveling locally.\"\n\n### ENVIRONMENT\nThe background shows representative visual cues of the location input by the user. Please present scene logic consistent with the local real-time weather, temperature, and season; maintain a high-end realistic style, not exaggerated or surreal.\nLighting is mainly natural, with a sense of time of the site environment.\n\n### CAMERA & AESTHETICS\nAspect Ratio: {{ratio}}\nComposition: Make full use of vertical space to create a \"cover-level\" visual center. Lens language: Professional studio-level clarity and depth of field; skin texture shows pores and natural grain (no smoothing); overall atmosphere has the realism and beauty of a high-end travel magazine.\n\n### MAGAZINE DESIGN\nModern, clean layout with an international travel magazine vibe.\nMain title, subtitle, and magazine graphic elements can be automatically generated but must match the person and location.\nHigh-end, coordinated color palette.\nThe final result should approach the cover temperament of \"Vogue\" or \"National Geographic Traveler.\""
    },
    "imageUrl": "https://s3.bmp.ovh/imgs/2025/12/16/a6106f5cc6e92a74.jpg",
    "imageUrls": [
      "https://s3.bmp.ovh/imgs/2025/12/16/a6106f5cc6e92a74.jpg",
      "https://s3.bmp.ovh/imgs/2025/12/16/cf8edb6f54db15bf.jpg"
    ],
    "author": "官方",
    "selections": {
      "travel_location": {
        "zh-tw": "東北雪鄉",
        "en": "Snow Village in Northeast China"
      },
      "ratio": {
        "zh-tw": "9:16 直式構圖",
        "en": "9:16 Vertical"
      }
    },
    "tags": [
      "人物",
      "攝影",
      "創意"
    ],
    "language": [
      "zh-tw",
      "en"
    ]
  },
  {
    "id": "tpl_manga_reality",
    "name": {
      "zh-tw": "漫畫人物成真",
      "en": "Manga to Reality"
    },
    "content": {
      "zh-tw": "### SUBJECT | 人物主體\n{{character_originality}}，從漫畫分鏡邊框中跨步走出並打破界線。真實版本與漫畫版本之間充滿動態且無縫的互動。\n\n### SETTING | 場景設定\n地點：{{comic_scene}}\n地板上攤開一本巨大的漫畫書。\n\n### MANGA DETAILS | 漫畫細節\n- **風格：** 超現實風格的黑白四格漫畫\n- **技法：** 正宗日式排版，網點紙效果，粗黑墨線，線條清晰俐落\n- **內容：** 同一個人的漫畫版本被困在漫畫書裡\n- **對比：** 單色漫畫世界與鮮豔現實世界的強烈視覺對比\n\n### REAL LIFE VERSION | 真實版本\n- **視覺質感：** 生動、色彩豐富、照片級真實感、超逼真 8K 畫質\n- **互動方式：** 動態地浮現在漫畫表面，直接與漫畫版本互動\n- **情緒氛圍：** 元風格（Meta），幽默的相遇\n\n### TECHNICAL SPECS | 技術規格\n- **畫質：** 超逼真，8K 解析度，高度細節化\n- **融合效果：** 漫畫線條藝術與現實攝影的無縫融合\n- **畫幅比例：** {{ratio}}",
      "en": "### SUBJECT\n{{character_originality}}, stepping out from the manga panel borders and breaking boundaries. A dynamic and seamless interaction between the real-life version and the manga version.\n\n### SETTING\nLocation: {{comic_scene}}\nA giant manga book is spread open on the floor.\n\n### MANGA DETAILS\n- **Style:** Surreal black and white four-panel manga.\n- **Technique:** Authentic Japanese layout, screentone effects, thick black ink lines, clean and sharp linework.\n- **Content:** The manga version of the same person is trapped inside the manga book.\n- **Contrast:** Strong visual contrast between the monochromatic manga world and the vibrant real world.\n\n### REAL LIFE VERSION\n- **Visual Texture:** Vivid, colorful, photo-realistic, ultra-realistic 8K quality.\n- **Interaction:** Dynamically emerging from the manga surface, interacting directly with the manga version.\n- **Atmosphere:** Meta-style, a humorous encounter.\n\n### TECHNICAL SPECS\n- **Image Quality:** Ultra-realistic, 8K resolution, highly detailed.\n- **Blending:** Seamless fusion of manga line art and real-life photography.\n- **Aspect Ratio:** {{ratio}}"
    },
    "imageUrl": "https://s3.bmp.ovh/imgs/2025/12/16/f5291c56ece88cd9.jpg",
    "author": "官方",
    "selections": {
      "character_originality": {
        "zh-tw": "使用附圖中的人物，確保結果與人物一致性",
        "en": "Use character in attachment, ensure consistency"
      },
      "comic_scene": {
        "zh-tw": "唯美的臥室",
        "en": "Beautiful bedroom"
      },
      "ratio": {
        "zh-tw": "9:16 直式構圖",
        "en": "9:16 Vertical"
      }
    },
    "tags": [
      "人物",
      "創意",
      "卡通"
    ],
    "language": [
      "zh-tw",
      "en"
    ]
  },
  {
    "id": "tpl_industrial_design",
    "name": {
      "zh-tw": "設計大師的產品設計",
      "en": "Industrial Design Masterpiece"
    },
    "content": {
      "zh-tw": "### 目標\n設計一個頂級的工業設計產品介紹頁，使用極簡的宣傳頁風格；需要深刻理解該設計師的設計理念、設計風格，並將這種理解完全融入產品的工業設計與展示頁面。\n\n### 內容\n- **設計師：** {{designer}}\n- **產品：** {{design_item}}\n\n### 畫面\n- **設計師介紹：**\n占整個畫面極少的部分，包括設計師介紹（極具氛圍感的頭像）與設計師對此產品的設計思路與理解，以及設計師簽名。\n- **畫面核心內容：**\n占整體 80% 以上，用於呈現產品本身；一張完全符合設計師風格與方法的頂級產品設計圖（單張完整效果）。基於工業成品設計成果使用不同構圖。整體配色需與設計師風格與產品內容完全相符。\n- **構圖：**\n最終構圖：{{ratio}}\n整體排版主次分明、規整，極具格調與設計特色。",
      "en": "### Goal\nDesign a top-tier industrial design product introduction page using a minimalist promotional layout. Deeply understand the designer's philosophy and style, and fully integrate this design understanding into the product's industrial design and presentation page.\n\n### Content\n- **Designer:** {{designer}}\n- **Product:** {{design_item}}\n\n### Visuals\n- **Designer Intro:**\nOccupies a very small part of the frame, including a bio (with an atmospheric portrait), the designer's thoughts and design philosophy for this product, and their signature.\n- **Core Content:**\n80% or more of the frame is used to present the product itself—a top-tier product design illustration fully consistent with the designer's own style and methods (a complete single product effect presentation). Use different compositions based on the industrial design results. The overall color scheme must match the designer's style and product content.\n- **Composition:**\nFinal Composition: {{ratio}}.\nThe overall layout is clear in hierarchy, organized, and highly stylish and characteristic."
    },
    "imageUrl": "https://s3.bmp.ovh/imgs/2025/12/17/7dbe43ae66b1a78c.jpg",
    "author": "官方",
    "selections": {
      "designer": {
        "zh-tw": "Jonathan Ive (Jony Ive)",
        "en": "Jonathan Ive"
      },
      "design_item": {
        "zh-tw": "無人機",
        "en": "Drone"
      },
      "ratio": {
        "zh-tw": "3:4 直式構圖",
        "en": "3:4 Vertical"
      }
    },
    "tags": [
      "產品",
      "創意",
      "圖表"
    ],
    "language": [
      "zh-tw",
      "en"
    ]
  },
  {
    "id": "tpl_photo_grid_v2",
    "name": {
      "zh-tw": "3x3 攝影網格出格版",
      "en": "3x3 Photo Grid (Out of Box)"
    },
    "content": {
      "zh-tw": "### Photo Grid Composition（九宮格攝影出格版）\n\n**編輯場景：** 3x3 網格佈局，採用冷灰色無縫背景。人物（面部特徵與上傳圖片完全一致）身穿 {{clothing}}，確保每張照片中的人物形象保持一致。\n\n**燈光設定：** {{lighting}}，營造統一且富有層次的光影效果。\n\n**照片細節包括 (Grid Details)：**\n1. {{grid_pose}}，畫面風格統一，鏡頭參數為 {{lens_param}}；\n2. {{grid_pose}}，鏡頭參數為 {{lens_param}}，展現不同的拍攝角度與表情；\n3. {{grid_pose}}，鏡頭參數為 {{lens_param}}，捕捉細膩的情感表達；\n4. {{grid_pose}}，鏡頭參數為 {{lens_param}}，運用景深營造層次感；\n5. {{grid_pose}}，鏡頭參數為 {{lens_param}}，突顯動態瞬間的生動性；\n6. {{grid_pose}}，鏡頭參數為 {{lens_param}}，透過前景虛化增強視覺焦點；\n7. {{grid_pose}}，鏡頭參數為 {{lens_param}}，展現優雅姿態與放鬆狀態；\n8. {{grid_pose}}，鏡頭參數為 {{lens_param}}，捕捉自然光線下的表情變化；\n9. {{grid_pose}}，鏡頭參數為 {{lens_param}}，微距特寫展現面部細節與質感。\n\n**後製處理：** 保持原始素材的真實感，平滑對比度，適度應用柔化效果，確保整體色調統一且具質感。\n\n**需要單獨處理：** 中央宮格的圖片不侷限在自己的宮格內，形成從中央宮格躍出畫面的 3D 立體視覺。中央宮格人物佔據較大面積且全身出鏡，會覆蓋其他宮格，並對其他宮格形成陰影效果，營造裸眼 3D 的視覺張力。",
      "en": "### Photo Grid Composition (Out-of-Box Version)\n\n**Scene:** 3x3 grid layout, using a seamless cool grey background. The character (facial features exactly as in the uploaded image) is wearing {{clothing}}, ensuring character consistency across all photos.\n\n**Lighting:** {{lighting}}, creating a unified and layered lighting effect.\n\n**Grid Details:**\n1. {{grid_pose}}, unified style, lens parameter: {{lens_param}};\n2. {{grid_pose}}, lens parameter: {{lens_param}}, showing different angles and expressions;\n3. {{grid_pose}}, lens parameter: {{lens_param}}, capturing subtle emotional expressions;\n4. {{grid_pose}}, lens parameter: {{lens_param}}, using depth of field to create layers;\n5. {{grid_pose}}, lens parameter: {{lens_param}}, highlighting the vividness of dynamic moments;\n6. {{grid_pose}}, lens parameter: {{lens_param}}, enhancing visual focus through foreground blur;\n7. {{grid_pose}}, lens parameter: {{lens_param}}, showing elegant posture and relaxed state;\n8. {{grid_pose}}, lens parameter: {{lens_param}}, capturing facial changes under natural light;\n9. {{grid_pose}}, lens parameter: {{lens_param}}, macro close-up showing facial details and texture.\n\n**Post-processing:** Maintain the realism of the original material, smooth contrast, apply moderate softening effects, ensuring uniform overall tone and high-quality texture.\n\n**Special Instructions:** The central grid image is not confined to its own square, creating a 3D visual effect as if jumping out of the frame. The central character occupies a larger area and is shown in full-body, overlapping other squares and casting shadows on them, creating a naked-eye 3D visual tension."
    },
    "imageUrl": "https://s3.bmp.ovh/imgs/2025/12/17/77bfd2bf7abc3eac.png",
    "author": "官方",
    "selections": {
      "clothing": {
        "zh-tw": "炭灰色無袖連衣裙",
        "en": "Charcoal grey sleeveless dress"
      },
      "grid_pose-0": {
        "zh-tw": "前景手指虛化",
        "en": "Out-of-focus fingers in foreground"
      },
      "grid_pose-1": {
        "zh-tw": "目光鎖定鏡頭",
        "en": "Eyes locked on camera"
      },
      "grid_pose-2": {
        "zh-tw": "單色下巴托手",
        "en": "Monochrome hand on chin"
      },
      "grid_pose-3": {
        "zh-tw": "正面特寫陰影",
        "en": "Frontal close-up with shadows"
      },
      "grid_pose-4": {
        "zh-tw": "斜角拍攝",
        "en": "Angled shot"
      },
      "grid_pose-5": {
        "zh-tw": "雙手置於鎖骨",
        "en": "Hands on collarbones"
      },
      "grid_pose-6": {
        "zh-tw": "坐姿半身側面",
        "en": "Seated half-body profile"
      },
      "grid_pose-7": {
        "zh-tw": "側面微距水滴",
        "en": "Side macro with water drops"
      },
      "grid_pose-8": {
        "zh-tw": "回眸一笑",
        "en": "Looking back with a smile"
      },
      "lens_param-0": {
        "zh-tw": "85mm, f/1.8",
        "en": "85mm, f/1.8"
      },
      "lens_param-1": {
        "zh-tw": "85mm, f/2.0",
        "en": "85mm, f/2.0"
      },
      "lens_param-2": {
        "zh-tw": "50mm, f/2.2",
        "en": "50mm, f/2.2"
      },
      "lens_param-3": {
        "zh-tw": "50mm, f/2.5",
        "en": "50mm, f/2.5"
      },
      "lens_param-4": {
        "zh-tw": "50mm, f/3.2",
        "en": "50mm, f/3.2"
      },
      "lens_param-5": {
        "zh-tw": "35mm, f/4.5",
        "en": "35mm, f/4.5"
      },
      "lens_param-6": {
        "zh-tw": "85mm, f/1.9",
        "en": "85mm, f/1.9"
      },
      "lens_param-7": {
        "zh-tw": "50mm, f/1.8",
        "en": "50mm, f/1.8"
      },
      "lens_param-8": {
        "zh-tw": "85mm, f/2.2",
        "en": "85mm, f/2.2"
      }
    },
    "tags": [
      "人物",
      "攝影"
    ],
    "language": [
      "zh-tw",
      "en"
    ]
  },
  {
    "id": "tpl_raindrop_art",
    "name": {
      "zh-tw": "雨滴定格藝術",
      "en": "Raindrop Art"
    },
    "content": {
      "zh-tw": "### Raindrop Art（雨滴定格藝術）\n\n**核心表現：**\n捕捉雨滴落入水面的瞬間，雨滴打落在水面上，飛濺的水珠在空中形成抽象的 {{rain_shape}}。\n\n**藝術視覺：**\n水滴構成的結果相對概念化，更遵循水滴濺落的動態感，但能從動作或神態中感受到其傳達的藝術視覺。畫面將雨水與自然互動的微妙之美定格，動感與優雅交融，呈現詩意的視覺表達。\n\n**環境背景：**\n背景是朦朧的雨景。\n\n**規格：**\n{{ratio}}",
      "en": "### Raindrop Art\n**Core Performance:**\nCapture the moment a raindrop falls into the water surface, with the splashing droplets forming an abstract {{rain_shape}} in the air.\n\n**Artistic Vision:**\nThe resulting water droplet form is relatively conceptual, following the dynamic feel of the splash, yet the artistic vision can be felt through the movement or pose. The image is a frozen-in-time artwork of the subtle beauty of rain interacting with nature, blending dynamism and elegance to present a poetic visual expression.\n\n**Environment/Background:**\nThe background is a hazy rainy scene.\n\n**Specifications:**\n{{ratio}}"
    },
    "imageUrl": "https://s3.bmp.ovh/imgs/2025/12/19/6b6e14845635b168.jpg",
    "author": "@tanshilong",
    "selections": {
      "rain_shape": {
        "zh-tw": "芭蕾舞者",
        "en": "Ballerina"
      },
      "ratio": {
        "zh-tw": "3:4 直式構圖",
        "en": "3:4 Vertical"
      }
    },
    "tags": [
      "攝影",
      "創意"
    ],
    "language": [
      "zh-tw",
      "en"
    ]
  },
  {
    "id": "tpl_art_growth",
    "name": {
      "zh-tw": "可視化藝術成長之路",
      "en": "Artistic Evolution Path"
    },
    "content": {
      "zh-tw": "### 可視化藝術成長之路\n\n**角色定義**\n你是一位歷史演變建築師（History Evolution Architect）。你的目標是創建一張超高密度、垂直堆疊的等距軸測（Isometric）3D 展廳渲染可視化圖像，展示 {{art_type}} 的發展歷史。透過展廳呈現里程碑的時間線：底部是簡陋的初期，隨歷史更迭垂直上升，直到現代或未來的巔峰。\n\n**核心能力 | 關鍵視覺策略（rameless Tech-Lapse）：**\n- **展廳模擬：** 使用多層藝術展廳承載要表達的發展，樓層代表時間維度，每層可有不同「房間」展示同一時代不同風格作品。\n- **根除容器：** 嚴禁使用底板、邊框或橫截面視圖。底部邊緣是歷史起源（原始社會或古代社會）。\n- **垂直時間線：** 「之字形上升（Zig-Zag Ascent）」穿越創新歷程。\n  - 底部（前景）：起源與原型\n  - 中部（上升中）：古代到現代的輝煌發展\n  - 頂部（背景）：當前發展狀態與未來可能性\n- **整合 3D 標題：** 明確且符合主題的標題\n\n**檢索與梳理：**\n- 提取重要發展歷史中的幾個階段。\n- 列出定義每個時代的「經典」。\n- 工具與媒介的變化。\n\n**構圖與光影：**\n等距視角的展廳視角。垂直之字形時間線，將發展從底部的起點堆疊到頂端的未來，環境與劃時代的經典作品隨高度演變。多款經典產品以「巨物化」呈現。  \n移軸攝影（Tilt-shift）與 {{render_style}}，畫幅 {{ratio}}。",
      "en": "### Visualized Artistic Growth Path\n**Role Definition**\nYou are a History Evolution Architect. Your goal is to create an ultra-high-density, vertically stacked isometric 3D gallery render showing the development history of {{art_type}}. Use a gallery to showcase a milestone timeline: the base is the humble early stages, rising vertically through historical changes to the modern or future peak.\n\n**Core Competency | Key Visual Strategy (Frameless Tech-Lapse):**\n- **Gallery Simulation:** Use a multi-level art gallery to host the development. Levels represent temporal progression, with different \"rooms\" potentially showing different styles from the same era.\n- **Eradicate Containers:** Strictly forbid base plates, borders, or cross-section views. The bottom edge is the historical origin (primitive or ancient society).\n- **Vertical Timeline:** A \"Zig-Zag Ascent\" through the innovation journey.\n  - Bottom (Foreground): Origins and prototypes.\n  - Middle (Ascending): Brilliant development from ancient to modern times.\n  - Top (Background): Current development status and future possibilities.\n- **Integrated 3D Title:** A clear title consistent with the theme.\n\n**Retrieval & Organization:**\n- Extract several important historical development stages.\n- List \"classics\" defining each era.\n- Changes in tools and media.\n\n**Composition & Lighting:**\nIsometric gallery view. A vertical zig-zag timeline stacking development from the base to the future at the top. The environment and era-defining classics evolve with height. Multiple classic products are presented as \"megaliths.\"\nTilt-shift photography with {{render_style}}, aspect ratio {{ratio}}."
    },
    "imageUrl": "https://s3.bmp.ovh/imgs/2025/12/19/47a2cbfec635a29a.jpg",
    "author": "@sundyme",
    "selections": {
      "art_type": {
        "zh-tw": "美術學",
        "en": "Fine Arts"
      },
      "render_style": {
        "zh-tw": "3D 像素風格",
        "en": "3D Pixel Art Style"
      },
      "ratio": {
        "zh-tw": "3:4 直式構圖",
        "en": "3:4 Vertical"
      }
    },
    "tags": [
      "建築",
      "創意",
      "圖表"
    ],
    "language": [
      "zh-tw",
      "en"
    ]
  },
  {
    "id": "tpl_miniature_desk",
    "name": {
      "zh-tw": "窗邊書桌微縮場景",
      "en": "Window Desk Miniature"
    },
    "content": {
      "zh-tw": "### 窗邊書桌微縮場景\n\n展示一個在窗邊書桌上的場景。\n\n**核心內容：**\n《{{show_name}}》的經典鏡頭微縮場景展示，採用 {{render_style}} 風格，充分體現微縮攝影的藝術表達。\n\n**環境背景：**\n背景是真實的書桌，有一些製作工具、散亂的書本，營造剛加工完這個場景的凌亂感。書桌上還有編製的圖紙與原型手稿。\n\n**窗外互動：**\n窗外，真實的 {{character_name}} 正好奇地向內觀看桌上的作品。\n\n**畫面規格：**\n{{ratio}}",
      "en": "### Window-side Desk Miniature Scene\nDisplays a scene on a desk by a window.\n\n**Core Content:**\nA miniature restoration of a classic scene from \"{{show_name}}\", using the {{render_style}} style, fully embodying the artistic expression of miniature photography.\n\n**Environment/Background:**\nThe background is a real desk, with some crafting tools and scattered books, creating a sense of messiness as if the scene was just finished. There are also woven plans and prototype manuscripts on the desk.\n\n**Window Interaction:**\nOutside the window, a real {{character_name}} is curiously looking inside at the work on the desk.\n\n**Image Specs:**\n{{ratio}}"
    },
    "imageUrl": "https://s3.bmp.ovh/imgs/2025/12/20/8e9c9c28b3d2cf1b.jpg",
    "author": "@tanshilong",
    "selections": {
      "show_name": {
        "zh-tw": "龍貓",
        "en": "My Neighbor Totoro"
      },
      "character_name": {
        "zh-tw": "龍貓",
        "en": "Totoro"
      },
      "render_style": {
        "zh-tw": "毛氈與黏土",
        "en": "Felt and Clay"
      },
      "ratio": {
        "zh-tw": "4:3 橫向構圖",
        "en": "4:3 Horizontal"
      },
      "show_name-0": {
        "zh-tw": "鐵達尼號",
        "en": "Titanic"
      }
    },
    "tags": [
      "攝影",
      "創意",
      "卡通"
    ],
    "language": [
      "zh-tw",
      "en"
    ]
  },
  {
    "id": "tpl_1766541256671",
    "name": "多奇通用資訊圖表_1",
    "author": "",
    "content": "Infographic, {{country}} kawaii style, {{language}} language on text, {{chart_style}}, clean lines, simple shapes, 16:9 aspect ratio, professional, easy to understand, detailed, high resolution, soft lighting, (best quality, masterpiece)\n\nNegative prompt: ugly, deformed, noisy, blurry, low quality, bad anatomy, bad proportions, out of frame, text, watermark, signature\n\nContent:",
    "selections": {
      "country-0": "Japanese",
      "language-0": "zh-tw",
      "chart_style-0": "Corporate Memphis"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrls": [
      "https://msformuploads.blob.core.windows.net/nbp/20251224_f8b29b67_clipboard-1766541578033.png",
      "https://msformuploads.blob.core.windows.net/nbp/20251224_f8b29b67_clipboard-1766541578033.png",
      "https://msformuploads.blob.core.windows.net/nbp/20251224_f8b29b67_clipboard-1766541578033.png"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_f8b29b67_clipboard-1766541578033.png"
  },
  {
    "id": "tpl_1766542543338",
    "name": "多奇通用資訊圖表_2",
    "author": "",
    "content": "Create a  {{chart_style}} technical diagram illustrating [SYSTEM/PROCESS]. Use clean, modern styling with appropriate icons and labeled components. Include [KEY ELEMENTS] and show the relationships between them with directional arrows. Use a color scheme that distinguishes between [DIFFERENT SYSTEM PARTS]. Make the diagram clear enough for technical documentation but visually appealing enough for presentations.",
    "selections": {
      "chart_style-0": "2D Flat vector"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251223_8c145a04_G7TxlOpb0AAMyQf"
  },
  {
    "id": "tpl_1766544077183",
    "name": "多奇通用資訊圖表_3",
    "author": "",
    "content": "A complex, futuristic medical infographic poster about Cancer Pathology. The central image is a glowing, translucent X-ray visualization of a human torso, highlighting a localized cluster of hyperactive cells in neon red against the cool blue healthy anatomy. The background is a deep cyber-blue with a holographic user interface (HUD). Surrounding the center are detailed data clusters: 1. Magnifying glass circular inserts showing rapid, jagged cell division (mitosis). 2. Floating 3D DNA double-helix strands. 3. Biochemical molecules and T-cells attack the target. 4. Digital text blocks with connecting leader lines.\n\n### Design Specifications:\n- Language context: {{language}}\n- Dashboard Interface Style: {{data_viz___dashboard}}\n- Structural Detail: {{tech___architecture}}\n- Overall Art Style: {{chart_style}} {{hand_drawn___conceptual}}\n- Aesthetic: High-tech oncology research, bioluminescence, neon orange and electric blue lighting, hyper-detailed 8k.",
    "selections": {
      "language-0": "zh-tw",
      "data_viz___dashboard-0": "Infographic elements (資訊圖表元素)",
      "tech___architecture-0": "Technical illustration (技術插圖)",
      "chart_style-0": "Corporate Memphis (企業插畫風)",
      "hand_drawn___conceptual-0": "Marker drawing (麥克筆筆觸)"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_5e9bd631_%E6%9C%AA%E5%91%BD%E5%90%8D%20LiveDoc%20(16).jpeg"
  },
  {
    "id": "tpl_1766544211215",
    "name": "多奇通用資訊圖表_4",
    "author": "",
    "content": "style chest panels with warm glow\nChunky chrome toggles and rotary dials on the cockpit hatch\nRetro starship-style backpack thrusters, with magenta and teal plasma vents\nArm-mounted “Funk Cannons” (Captain HaHaa signature)\nLegs with mirrored chrome panels reflecting cosmic colours\nFoot stabilizers shaped like mini hover-skids\n\n10 labels describing each unique feature in {{language}}:\n\nHaHaa-Crest Antenna (boomerang-shape)\nCRT Chest Display Plates\nCore-Funk Block Unit\nShoulder Groove Armor\nBeam Saber Rack (retro-orange sheath)\nCosmic Funk Cannons\nStar-Thruster Backpack\nHip Skirt – “CAN YOU DIG IT?” Plate\nKnee Glide Assembly\nHover-Skid Foot Stabilizers\n\nStyle: blueprint line work on navy, cyan glow outlines, technical call outs, incorporating {{tech___architecture}} details and {{hand_drawn___conceptual}} sketch elements.\nVisual flair: {{chart_style}} or {{data_viz___dashboard}} aesthetics.\nCamera:  {{lens_type}} ,  {{lighting}} .",
    "selections": {
      "lens_type-0": {
        "zh-tw": "長焦鏡頭",
        "en": "Telephoto Lens"
      },
      "lighting-0": {
        "zh-tw": "倫勃朗光",
        "en": "Rembrandt lighting"
      },
      "language-0": "zh-tw",
      "tech___architecture-0": "Technical illustration (技術插圖)",
      "hand_drawn___conceptual-0": "Hand-drawn sketch (手繪素描)",
      "chart_style-0": "Sans-serif typography labels (無襯線文字標籤)",
      "data_viz___dashboard-0": "Infographic elements (資訊圖表元素)"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_f6d93aad_%E6%9C%AA%E5%91%BD%E5%90%8D%20LiveDoc%20(12).jpeg"
  },
  {
    "id": "tpl_1766544666209",
    "name": "多奇通用資訊圖表_5",
    "author": "",
    "content": "創作一張 {{chart_style}} 的資訊圖卡片，比例為 {{ratio}} 。卡片主題鮮明，背景為 {{background_style}} ，整體設計體現 {{hand_drawn___conceptual}} 。\n\n卡片上方以紅黑相間、對比鮮明的大號毛筆草書字體突出標題，吸引視覺焦點。文字內容均採用中文草書，整體佈局分為 2 至 4 個清晰的小節，每節以簡短、精煉的中文短語表達核心要點。字體保持草書流暢的韻律感，既清晰可讀又富有藝術氣息。\n\n卡片中點綴簡單、有趣的手繪插畫或圖標，例如人物或象徵符號，以增強視覺吸引力，引發讀者思考與共鳴。整體佈局注意視覺平衡，預留足夠的留白空間，確保畫面簡潔明瞭，易於閱讀和理解。\n\n主題是：「做 IP 是長期複利，堅持每日出攤，持續做，肯定會有結果，因為 99% 都堅持不住的。」",
    "selections": {
      "chart_style-0": "Clean lines (俐落線條)",
      "ratio-0": {
        "zh-tw": "9:16 直式構圖",
        "en": "9:16 Vertical"
      },
      "background_style-0": {
        "zh-tw": "漫畫網格筆記本",
        "en": "Manga grid notebook"
      },
      "hand_drawn___conceptual-0": "Doodle style (塗鴉風)"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_dab5868a_%E6%9C%AA%E5%91%BD%E5%90%8D%20LiveDoc%20(14).jpeg"
  },
  {
    "id": "tpl_1766544883888",
    "name": "多奇通用資訊圖表_6",
    "author": "",
    "content": "Make me a detailed diagram showing how mitosis  works.\n\nFormat: {{chart_style}} using {{hand_drawn___conceptual}} elements suitable for a high school audience.\nStructure: Organize the layout like a {{data_viz___dashboard}} for clarity.\nLanguage: Annotations in {{language}}.",
    "selections": {
      "chart_style-0": "cute, cheerful, pastel colors",
      "hand_drawn___conceptual-0": "Crayon texture (蠟筆質感)",
      "data_viz___dashboard-0": "Data visualization UI (數據視覺化介面)",
      "language-0": "zh-tw"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_62e5c21d_%E6%9C%AA%E5%91%BD%E5%90%8D%20LiveDoc%20(13).jpeg"
  },
  {
    "id": "tpl_1766545065159",
    "name": "多奇通用資訊圖表_7",
    "author": "",
    "content": "Create a fashion product collage on a {{background_style}} . \n\nEach product and the central model image should be presented as individual photos with distinct white borders, arranged in a Scattered style with small descriptive labels in {{language}}.\n\nArtistic Style reference: {{hand_drawn___conceptual}} {{chart_style}}.",
    "selections": {
      "background_style-0": "Cork Board Background (軟木板背景)",
      "language-0": "zh-tw",
      "hand_drawn___conceptual-0": "Paper background (紙張背景)",
      "chart_style-0": "cute, cheerful, pastel colors"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_d664bd1a_%E6%9C%AA%E5%91%BD%E5%90%8D%20LiveDoc%20(11).jpeg"
  },
  {
    "id": "tpl_1766545248083",
    "name": "多奇通用資訊圖表_8",
    "author": "",
    "content": "# 主要設定\n\n設計一個  流程圖 (Flowchart) 資訊圖表，帶有 icons\n畫風： {{chart_style}} \n視覺引導： {{connectors}} \n背景風格： {{background_style}} \n畫面比例： {{ratio}} \n輸出語言： {{language}} \n\n# 內容:\n\n這是一份專為「資訊圖表（Infographic）」設計的 規格驅動開發 (Spec-Driven Development, SDD) 流程大綱。\n這份內容參考了 GitHub Spec Kit 的核心精神：「在寫程式碼之前，先寫好規格；規格即是真理 (Source of Truth)。」\n為了方便你製作圖表，我將流程簡化為 5 個核心步驟，並附上設計建議與文案。\n\n🎨 資訊圖表設計架構：規格驅動開發 (SDD)\n標題建議：\n主標題： 規格驅動開發流程 (Spec-Driven Development)\n副標題： Build the Right Thing. Build the Thing Right. (做對的事，把事做對)\n\n🔄 流程五大階段 (由左至右或順時針排列)\n為了讓資訊圖表更直觀，每個階段都包含了「圖示建議」、「核心動作」與「簡短說明」。\n\n1. Define (定義問題)\n目標： 釐清「為什麼要做」以及「要做什麼」。\n圖示建議： 💡 燈泡 或 🎯 靶心\n關鍵動作：\nOne-pager： 撰寫一頁式摘要。\nUser Story： 定義使用者是誰、遇到什麼問題。\nOut of Scope： 明確界定「不做什麼」。\n\n2. Draft (撰寫規格)\n目標： 使用 Markdown 撰寫詳細技術規格 (Spec)。\n圖示建議： 📝 文件 或 📐 藍圖\n關鍵動作：\nTechnical Design： 定義 API、資料結構、UI 流程。\nMarkdown First： 使用 Spec Kit 模板，像寫程式一樣寫文件。\nMockups： 附上草圖或流程圖。\n\n3. Review (審閱與討論)\n目標： 在寫任何程式碼之前，先達成共識。\n圖示建議： 👥 多人對話框 或 🔍 放大鏡\n關鍵動作：\nAsync Feedback： 利用 Pull Request 評論功能進行非同步討論。\nIterate： 根據回饋修改規格，直到定案。\nApproval： 團隊確認無誤，規格鎖定 (Sign-off)。\n\n4. Build (開發實作)\n目標： 依照規格書進行編碼，減少猜測。\n圖示建議： 💻 筆電 與 程式碼符號 (</>)\n關鍵動作：\nCode to Spec： 嚴格按照規格書的定義開發。\nTDD： 根據規格撰寫測試案例 (Test Cases)。\nParallel Work： 前後端可依據同一份規格同時開工。\n\n5. Evolve (同步與演進)\n目標： 確保規格與程式碼永遠一致 (Living Document)。\n圖示建議： 🔄 循環箭頭 或 📚 活頁書\n關鍵動作：\nUpdate Sync： 若開發中發現需更改邏輯，先改規格，再改程式。\nSource of Truth： 規格書即是最終的文件，而非過期的廢紙。",
    "selections": {
      "chart_style-0": "2D Flat vector",
      "language-0": "zh-tw"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_11373a9a_%E6%9C%AA%E5%91%BD%E5%90%8D%20LiveDoc%20(4).jpeg"
  },
  {
    "id": "tpl_1766545354351",
    "name": "多奇通用資訊圖表_9",
    "author": "",
    "content": "# 主要設定\n\n設計一個 甘特圖 (Gantt) 資訊圖表\n畫風： {{chart_style}} \n視覺引導： {{connectors}} \n背景風格： {{background_style}} \n畫面比例： {{ratio}} \n輸出語言： {{language}} \n\n# 內容：\n\n軌道 1 (Track 1): 產品與設計 (Product & Design)\n\n[1月-2月中] 探索期 (Discovery): 需求釐清、競品分析、架構確認。\n\n[2月中-4月中] P1 設計衝刺 (Design Sprints): UX Wireframe 定稿、UI Design System 建立、高保真頁面設計。\n\n[7月中-8月底] P2 迭代規劃: P1 上線後使用者數據分析、第二階段功能優先級排序、新功能設計。\n\n軌道 2 (Track 2): 前端工程 (Frontend Engineering)\n\n[1月中-2月中] 基礎建設: 專案環境搭建、技術選型確認。\n\n[4月中-6月中] P1 組件開發與切版: 根據設計稿進行 React/Vue 組件開發、RWD 實作。\n\n[6月中-7月中] P1 串接整合: 與後端 API 進行資料串接。\n\n[8月中-11月中] P2 功能開發: 第二階段新功能模組實作、效能優化。\n\n軌道 3 (Track 3): 後端與基礎設施 (Backend & Infra)\n\n[2月中-4月中] API 定義與資料庫設計: Swagger 文件撰寫、DB Schema 設計。\n\n[4月中-6月底] P1 核心功能開發: 會員系統、主要業務邏輯 API 開發。\n\n[8月中-11月中] P2 進階功能開發: 報表系統、後台管理功能擴充。\n\n軌道 4 (Track 4): 測試與發布 (QA & Release)\n\n[7月中-8月初] P1 QA & UAT: 密集的 Bug Bash、使用者驗收測試。\n\n[◆ 8月15日 里程碑] Phase 1 Launch (V1.0 上線)\n\n[11月中-12月中] P2 回歸測試: 確保新舊功能穩定。\n\n[12月底] 最終部署與移交: V2.0 上線、維運文件移交。",
    "selections": {
      "chart_style-0": "Clean lines (俐落線條)",
      "connectors-0": {
        "zh-tw": "手繪箭頭或引導線",
        "en": "Hand-drawn arrows or guide lines"
      },
      "background_style-0": {
        "zh-tw": "極簡純色背景",
        "en": "Minimalist solid color background"
      },
      "ratio-0": {
        "zh-tw": "16:9 橫向構圖",
        "en": "16:9 Horizontal"
      },
      "language-0": "zh-tw"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_deeedcc9_%E6%9C%AA%E5%91%BD%E5%90%8D%20LiveDoc%20(9).jpeg"
  },
  {
    "id": "tpl_1766545437622",
    "name": "多奇通用資訊圖表_10",
    "author": "",
    "content": "# 主要設定\n\n設計一個 用戶旅程 (User Journey) 資訊圖表\n畫風： {{chart_style}} \n視覺架構： {{tech___architecture}} \n視覺引導： {{connectors}} \n背景風格： {{background_style}} \n畫面比例： {{ratio}} \n輸出語言： {{language}} \n\n# 內容：\n\n👤 使用者畫像 (Persona)\n角色： 小陳 (30歲，上班族)\n情境： 週五晚上，與一位朋友聚餐，心情放鬆但有點飢餓。\n目標： 享受美食、順暢的服務體驗，不想被過度打擾但需要時能找到人。\n\n🗺️ 顧客用餐完整旅程地圖\n\n第一階段：進店與入座 (Arrival & Seating)\n目標：快速被接待並找到舒適的位置。\n\n抵達店面：\n動作： 小陳推開餐廳大門，聞到食物香氣。門口稍微有人排隊，他走向櫃檯。\n接觸點： 餐廳門面設計、接待櫃檯、空氣中的味道、背景音樂。\n心理活動： 「好香喔，還好我有先訂位，不然看起來要排很久。」\n接待確認：\n動作： 服務生微笑迎接，詢問訂位大名。確認後，服務生拿起菜單引導帶位。\n接觸點： 服務生的儀態、訂位系統平板。\n\n入座與環境感知：\n動作： 小陳被帶到靠窗的雙人桌。服務生拉開椅子，並遞上置物籃讓小陳放包包。\n接觸點： 座椅舒適度、桌面的整潔度、置物籃、燈光氛圍。\n心理活動： 「這裡燈光蠻好的，而且有置物籃很貼心。」\n\n第二階段：瀏覽與點餐 (Consideration & Ordering)\n目標：從菜單中做出選擇，並順利完成下單。\n\n數位引導：\n動作： 服務生倒水，並指著桌上的 QR Code 說：「我們採掃碼點餐，有需要介紹隨時叫我。」\n接觸點： 檸檬水、桌牌 QR Code、手機網路訊號。\n\n瀏覽菜單 (數位體驗)：\n動作： 小陳拿出手機掃描，介面跳出。他滑動查看「人氣推薦」。圖片看起來很誘人，但字體稍微有點小。\n接觸點： 手機點餐介面 (UI/UX)、餐點高清照片、讀取速度。\n心理活動： 「這個松露義大利麵看起來不錯，但不知道會不會太奶？我要不要加套餐？」\n\n決策與客製化：\n動作： 朋友不吃辣，小陳在系統中尋找「去辣」選項。系統設計清楚，他在備註欄勾選了客製化需求。\n接觸點： 客製化選項按鈕、購物車確認頁面。\n送出訂單：\n動作： 確認金額後按下「送出」。手機畫面顯示「訂單已接收，製作中」。\n心理活動： 「點好了，希望上菜不要太慢。」\n\n第三階段：等待與期待 (Waiting & Anticipation)\n目標：在等待食物的空檔不感到無聊或焦慮。\n\n餐前互動：\n動作： 剛點完沒多久，服務生端上了套餐的飲料和沙拉。\n接觸點： 實體餐具、餐前飲品。\n心理感受： (正向)「飲料上得很快，剛好口渴了。」\n觀察與社交：\n動作： 小陳一邊喝飲料一邊和朋友聊天，偶爾看向開放式廚房的忙碌景象。\n接觸點： 開放式廚房的聲音與視覺、餐廳內的交談聲浪。\n\n第四階段：用餐體驗 (Consumption / Dining)\n目標：享受食物的美味與良好的用餐氛圍。\n\n主餐上桌：\n動作： 服務生端上熱騰騰的義大利麵，並提醒：「盤子很燙請小心。」\n接觸點： 餐點的擺盤、溫度、香氣、服務生的貼心提醒。\n心理活動： 「哇，實體跟照片長得一樣！看起來很好吃。」(此時可能會拿出手機拍照)\n品嚐與反饋：\n動作： 開始用餐。麵條硬度適中，味道符合預期。吃到一半，服務生過來巡桌幫忙加水，順便問：「口味還習慣嗎？」\n接觸點： 食物口感、服務生的巡桌頻率、水杯的水量。\n心理感受： 「服務蠻勤快的，不會讓水杯空著。」\n用餐結尾：\n動作： 吃完了，盤子空了。服務生看到後，適時上前詢問是否可以收盤，並詢問是否要上甜點。\n接觸點： 桌面清潔速度。\n\n第五階段：結帳與離店 (Payment & Checkout)\n目標：快速、無痛的付款流程。\n\n查看帳單：\n動作： 小陳再次打開手機查看剛剛的訂單金額，確認是否有服務費。他向服務生示意買單。\n接觸點： 手機帳單頁面、服務鈴或眼神交流。\n支付流程：\n動作： 小陳走向櫃檯（或直接在桌邊支付）。櫃檯人員確認桌號，詢問：「有會員嗎？要刷卡還是載具？」\n接觸點： POS 機客顯螢幕、信用卡刷卡機/行動支付掃描槍。\n心理活動： 「希望能用 Apple Pay，不想掏錢包。」(成功使用感應支付)\n\n離開與道別：\n動作： 拿著發票（或存入載具），走出店門。全體員工喊：「謝謝光臨！」\n接觸點： 離店時的送客聲、門把的觸感。\n心理感受： 「吃得好飽，下次可以帶家人來。」\n\n第六階段：售後與回訪 (Post-Experience)\n目標：留下深刻印象，促成下一次消費。\n\n數位回饋：\n動作： 離開後約一小時，小陳的手機收到 LINE 通知（如果有點餐綁定），邀請填寫滿意度問卷送優惠券。\n接觸點： LINE 推播訊息、Google Maps 評論提示。\n忠誠度建立：\n動作： 小陳覺得體驗不錯，給了 5 星好評，並領取了下次使用的「薯條兌換券」。",
    "selections": {
      "chart_style-0": "2D Flat vector (2D 扁平向量)",
      "tech___architecture-0": "Monochromatic (單色調)",
      "background_style-0": {
        "zh-tw": "極簡純色背景",
        "en": "Minimalist solid color background"
      },
      "ratio-0": {
        "zh-tw": "16:9 橫向構圖",
        "en": "16:9 Horizontal"
      },
      "language-0": "zh-tw"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_d99f4d58_%E6%9C%AA%E5%91%BD%E5%90%8D%20LiveDoc%20(8).jpeg"
  },
  {
    "id": "tpl_1766545765394",
    "name": "多奇通用資訊圖表_11",
    "author": "",
    "content": "A 16-bit pixel art poster showcasing all the black and white animals of nature. The composition uses a neat grid layout, reminiscent of a retro video game character selection screen or an encyclopedia page. Each animal is labeled with its  {{language}}  name in clear retro pixel font. The background is  {{background_style}} , with vivid pixel details, exuding a retro aesthetic and high-quality production. --ar  {{ratio}} ",
    "selections": {
      "language-0": "zh-tw",
      "ratio-0": {
        "zh-tw": "16:9 橫向構圖",
        "en": "16:9 Horizontal"
      }
    },
    "tags": [],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_153be325_%E6%9C%AA%E5%91%BD%E5%90%8D%20LiveDoc%20(7).jpeg"
  },
  {
    "id": "tpl_1766554434177",
    "name": "多奇通用資訊圖表_12",
    "author": "",
    "content": "Look up the 5 best vacuum cleaners under $300 and create an infographic with pros and cons for each. \n\nPlease visualize it using {{chart_style}} and {{data_viz___dashboard}} styles, incorporating {{hand_drawn___conceptual}} elements or {{tech___architecture}} structures where appropriate. \n\nOutput language: {{language}}.",
    "selections": {
      "chart_style-0": "2D Flat vector (2D 扁平向量)",
      "data_viz___dashboard-0": "Data visualization UI (數據視覺化介面)",
      "hand_drawn___conceptual-0": "Paper background (紙張背景)",
      "tech___architecture-0": "Monochromatic (單色調)",
      "language-0": "zh-tw"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_9af2394e_%E6%9C%AA%E5%91%BD%E5%90%8D%20LiveDoc%20(5).jpeg"
  },
  {
    "id": "tpl_1766554574254",
    "name": "多奇通用資訊圖表_13",
    "author": "",
    "content": "Show me a very detailed situation  of the Battle of Stalingrad at the end of December 1943, with annotations indicating the positions of army corps, divisions, main strategies.\n\nRender style: {{chart_style}} {{hand_drawn___conceptual}} Topographic Map.\nStructure reference: {{tech___architecture}}.\n\nUsing colors to clearly explain everything.\nLanguage: {{language}}.",
    "selections": {
      "chart_style-0": "Sans-serif typography labels (無襯線文字標籤)",
      "hand_drawn___conceptual-0": "Hand-drawn sketch (手繪素描)",
      "tech___architecture-0": "Technical illustration (技術插圖)",
      "language-0": "zh-tw"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_1c56b0e7_%E6%9C%AA%E5%91%BD%E5%90%8D%20LiveDoc%20(6).jpeg"
  },
  {
    "id": "tpl_1766546528200",
    "name": "多奇通用資訊圖表_14",
    "author": "",
    "content": "請幫我生成一張 {{language}} 維京時代的詳細歷史資訊圖，詳細資料中請包括重要戰役及重要里程碑，以及重要人士的出生與死亡，用 {{data_viz___dashboard}} 的方式呈現，圖片背景用 {{background_style}} ，風格要為 {{hand_drawn___conceptual}} ，視覺元素包含： {{art_style}} 的維京長船、戰斧、圓盾以及海岸線地圖。色調為懷舊的 {{color}}  {{color}}  {{color}} ，精緻的 {{background_style}} 。",
    "selections": {
      "language-0": "zh-tw",
      "chart-0": "時間軸",
      "background_style-0": "羊毛紙材質背景",
      "art_style-0": {
        "zh-tw": "水彩手繪風格",
        "en": "Watercolor hand-drawn style"
      },
      "background_style-1": "羊毛紙材質背景",
      "hand_drawn___conceptual-0": "復古風",
      "color-0": "棕色",
      "color-1": "黑",
      "color-2": "深紅色 ",
      "data_viz___dashboard-0": "樹狀圖"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_44935569_clipboard-1766562032536.png"
  },
  {
    "id": "tpl_1766548065110",
    "name": "多奇通用資訊圖表_15",
    "author": "",
    "content": "請幫我用  {{data_viz___dashboard}} 的方式介紹近代英國皇室家族（從喬治六世到查爾斯三世家族），風格強調歷史感、尊貴感，人物請用 {{art_style}} 的肖像，重要人物請加上皇冠，畫面角落包含皇家徽章和獅子圖騰元素。色調為 {{color}}  {{color}}  {{color}} ，請具有歷史感與奢華感。",
    "selections": {
      "chart-0": "樹狀圖",
      "color-2": "金",
      "color-1": "藍",
      "color-0": "深紅色 ",
      "art_style-0": {
        "zh-tw": "高品質的 2D 插畫風格",
        "en": "High-quality 2D illustration style"
      },
      "data_viz___dashboard-0": "樹狀圖"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_0872a916_clipboard-1766562167759.png"
  },
  {
    "id": "tpl_1766549303397",
    "name": "多奇通用資訊圖表_16",
    "author": "",
    "content": "https://165dashboard.tw/ 請幫我依據 165 dashboard 生成一份台灣人最常被詐騙的原因及比例 {{data_viz___dashboard}} ，且用 {{language}} 方式呈現，內容包含一點可愛插圖",
    "selections": {
      "chart-0": "圓餅圖",
      "language-0": "zh-tw",
      "data_viz___dashboard-0": "Pie charts and bar graphs (圓餅圖與長條圖)"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_33b31a0a_clipboard-1766562582676.png"
  },
  {
    "id": "tpl_1766554853309",
    "name": "多奇通用資訊圖表_17",
    "author": "",
    "content": "Make a {{ratio}} starting with the 1880s. In each section, I should appear styled according to that decade (clothing, hairstyle, facial hair, accessories). Use colors, background, & film style accordingly.",
    "selections": {
      "ratio-0": "4*4網格"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_f8d8ef9d_clipboard-1766562776484.png"
  },
  {
    "id": "tpl_1766555374395",
    "name": "多奇通用資訊圖表_18",
    "author": "",
    "content": "浮世絵師・葛飾北斎が描いたような和風インフォグラフィックにして。 {{sticker_decor}}、文字は江戸文字（勘亭流）で。カラーパレットは {{color}}  {{color}}  {{color}}  {{color}} のみ。現代のデータを侍や町娘が解説している構図で。\n",
    "selections": {
      "color-0": "黑",
      "color-1": "深紅色 ",
      "color-2": "藍",
      "color-3": "黃",
      "sticker_decor-0": "波浪與雲朵"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_ac5ce5c6_clipboard-1766562896339.png"
  },
  {
    "id": "tpl_1766555814606",
    "name": "多奇通用資訊圖表_19",
    "author": "",
    "content": "Generate an ultra-detailed, hyperrealistic exploded technical view of Kaneda’s iconic red motorcycle from Akira. The image should show every component separated in {{render_style}} , floating in a clean engineering layout, with perfect alignment and labeled layers. Keep the perspective dynamic but readable, like a premium industrial design schematic.\n",
    "selections": {
      "render_style-0": {
        "zh-tw": "3D 像素風格",
        "en": "3D Pixel Art Style"
      }
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_d3163c7f_clipboard-1766563134247.png"
  },
  {
    "id": "tpl_1766556327619",
    "name": "多奇通用資訊圖表_20",
    "author": "",
    "content": "Role & Subject: A massive, encyclopedic {{ratio}}  {{render_style}}  poster titled \"THE EVOLUTION OF STARK INDUSTRIES IRON MAN SUITS\". The visual style is a high-end fusion of museum-grade product photography and  {{art_style}} \nThe Hero Lineup (Chronological Core): A complete, linear chronological lineup of 10 historical versions of Iron Man Armors, ranging from the crude, bulky Mark I prototype forged in a cave to the sleek, bleeding-edge Mark LXXXV nanotechnology model. They are arranged with precision on a glowing holographic measurement scale/ruler base running horizontally across the center. Rendering: Hyper-realistic 3D, 8k resolution. Emphasis on the evolution of textures: showing the aging of early crude welded scrap metal, heavy iron, and exposed wiring of the Mk I vs. the pristine, highly-polished hot-rod red and gold plating, and fluid nanotech finish of modern versions like the Mk 50 and Mk 85.\n\nBrand Atmosphere (The Canvas): Background: A deep, rich Hot Rod Red and metallic Gold textured background, resembling an armored plating surface. It is heavily layered with low-opacity watermarks of vintage Stark Industries patent drawings, handwritten engineering notes by Tony Stark (with coffee stains), and newspaper clippings related to the Avengers' history. Header: A prominent, high-contrast STARK INDUSTRIES logo displayed at the top center, with a bold typography title.\n\nThe \"Hyper-Dense\" Information Layer (The PUNCH Style): The layout is overwhelmed with organized information (creating a \"Data aesthetics\" look):\n\nDense Annotation Network: Hundreds of fine white and cyan hairlines connecting specific components (e.g., Arc Reactors, Repulsor Transmitters in palms, Articulated Helmet Faceplates, Micro-missile Compartments, Flight Stabilizers) to compact text blocks, energy output charts, and data tables floating in the volumetric space.\n\nContextual Zones: \"Era Modules\" floating above the suits, representing different phases (e.g., \"AFGHANISTAN ESCAPE,\" \"THE AVENGERS INITIATIVE,\" \"ULTRON OFFENSIVE,\" \"INFINITY WAR NANO-TECH\") with iconographic markers.\n\nMagnifying Inserts: Circular \"Zoom-in\" lenses scattered in empty spaces, showing extreme macro close-ups of texture details like the crude welding on Mark I, the mechanical joint articulation of Mark III, and the fluid nano-particle assembly of Mark LXXXV.\n\nTech Specs Strip: A structured data bar at the very bottom listing precise specifications (Model Number, Weight in tons/kg, Power Source Type, Year of Creation, Primary Material Code).\n\nTechnical Specs: Octane render, Unreal Engine 5 aesthetic, editorial layout, information design masterpiece, cinematic volumetric lighting, sharp focus, professional color grading, blockbuster movie poster vibe. --ar 16:9 --v 6.0 --stylize 350",
    "selections": {
      "ratio-0": {
        "zh-tw": "16:9 橫向構圖",
        "en": "16:9 Horizontal"
      },
      "render_style-0": "3D Render (3D 渲染)",
      "art_style-0": "複雜技術工程藍圖"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_5509c2aa_%E6%9C%AA%E5%91%BD%E5%90%8D%20LiveDoc.png"
  },
  {
    "id": "tpl_1766557518058",
    "name": "多奇通用資訊圖表_21",
    "author": "",
    "content": "### Role\nYou are an elite {{role}} , specializing in creating exhaustive  {{background_style}} . You possess the ability to perform pixel-level deconstruction, visually analyzing clothing hierarchies, capturing subtle micro-expressions, and realistically rendering character-specific items. You excel at environmental storytelling,fleshing out {{subject}}  personalities and backstories through their  {{fashion_deconstruct}} \n\n### Task\nBased on the subject image uploaded or described by the user, generate a Panoramic Character Depth Deconstruction Sheet. This image must feature a  {{layout_focus}}  surrounded by a detailed breakdown of the character, including clothing layers, varying expressions, core props, material close-ups, and a highly immersive display of private and daily carry items.\n\n### Visual Guidelines\n\n1. Layout & Composition\nCenter Anchor: Place the character's  {{layout_focus}} Portrait in the center to serve as the visual anchor.\nSurrounding Elements: In the negative space surrounding the central figure, arrange the deconstructed elements in an organized, schematic fashion.\nVisual Connectors: Use hand-drawn arrows or guide lines to connect the surrounding items to their corresponding location or body part on the central figure.\n\n2. Deconstruction Detail\nClothing Layering:Deconstruct the outfit into individual pieces (e.g., outerwear, main dress, accessories).\nIntimate Apparel Breakdown:Independently showcase the character's inner layers, highlighting design and fabric. (Example: {{underwear_style}} , focusing on cut and transparency).\nExpression Sheet: In the corners, draw 3-4 distinct headshotsshowcasing intense or specific emotions (Example {{expressions}} ).\nTexture & Zoom:detailed close-ups of critical areas. (Example: Disheveled fabric textures, sweat stains on skin, or material wear-and-tear).\nDynamic Actions:Sketch specific poses or actions that add depth. (Example: {{action_detail}} , or  {{action_pose}} ).\nCinematic Perspectives:Include a sketch from a unique camera angle. (Example:  {{special_view}} ).\n\n3. Inventory & Belongings\nBag Contents: {{bag_content}}  \"exploded\" or open, showing the items scattered around it.\nBeauty & Care:Display the specific  {{cosmetics}}  the character uses.\nPrivate Life Objects:Visualize items representing the character's hidden private life. Depending on the personality, this may include specific tools or toys  {{private_items}} , presented with an  {{art_type}} \n\n### Style & Aesthetic\nArt Style: {{art_style}} , with clean, sharp line work.\nBackground: {{background_style}} /Graph Paper texture to evoke the feeling of a designer's sketchbook or technical draft.\nAnnotations:Simulate handwritten notes next to each element, briefly explaining materials, brands, or model numbers.\n\n### Workflow\n1.  Analyze the subject's core visual features, fashion style, and implied personality.\n2. Extract primary elements for deconstruction (Outerwear, Shoes, Key Expressions).\n3.  Ideate secondary depth elements (Underwear style, bag contents, private habits).\n4.  Generate a composite image containing all elements with accurate perspective, unified lighting, and clear annotations.\n5.  Output: High Definition. Text annotations should be in English.",
    "selections": {
      "role-0": {
        "zh-tw": "遊戲與動漫概念美術設計大師",
        "en": "Master of Game and Anime Concept Art"
      },
      "background_style-0": "角色設定圖",
      "subject-0": {
        "zh-tw": "女性角色",
        "en": "Female Character"
      },
      "fashion_deconstruct-0": "私密所有物、隨身物品和生活細節",
      "layout_focus-0": {
        "zh-tw": "全身立繪",
        "en": "Full-body Portrait"
      },
      "layout_focus-1": {
        "zh-tw": "全身立繪",
        "en": "Full-body Portrait"
      },
      "underwear_style-0": {
        "zh-tw": "成套的蕾絲內衣褲",
        "en": "Matching lace lingerie set"
      },
      "expressions-0": {
        "zh-tw": "瘋狂、病嬌、狂喜",
        "en": "Crazy, Yandere, Ecstatic"
      },
      "action_detail-0": {
        "zh-tw": "帶著項圈的爬行",
        "en": "Crawling with a collar"
      },
      "action_pose-1": "其他順從/支配的姿勢",
      "action_pose-0": "其他順從/支配的姿勢",
      "art_type-0": {
        "zh-tw": "工業設計",
        "en": "Industrial Design"
      },
      "background_style-1": {
        "zh-tw": "漫畫網格筆記本",
        "en": "Manga grid notebook"
      }
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_9e9b18d8_clipboard-1766563404920.png"
  },
  {
    "id": "tpl_1766543814560",
    "name": "多奇通用資訊圖表_22",
    "author": "",
    "content": "{{language}} version. Generate an infographic comparing and contrasting the mycobacterial cell envelope with E. Coli, Staphylococcus aureus, and Methanobacteriati. Also include as many details about cell envelope biogenesis across the types of organisms.\n\nVisual Styles & Requirements:\n\nChart Style: {{chart_style}}\n\nTechnical & Architectural Focus: {{tech___architecture}}\n\nData Visualization & Dashboard Style: {{data_viz___dashboard}}\n\nCreative Concept: {{hand_drawn___conceptual}}",
    "selections": {
      "language-0": "zh-tw",
      "chart_style-0": "Corporate Memphis (企業插畫風)",
      "tech___architecture-0": "Technical illustration (技術插圖)",
      "data_viz___dashboard-0": "Pie charts and bar graphs (圓餅圖與長條圖)",
      "hand_drawn___conceptual-0": "Hand-drawn sketch (手繪素描)"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_b12350e7_generate.jpg"
  },
  {
    "id": "tpl_1766544642760",
    "name": "多奇通用資訊圖表_23",
    "author": "",
    "content": "Language: {{language}}\n\nTask: Generate an infographic diagram on how the X “For You” algorithm works, how it selects which posts to show, and what goes into a post reaching a large audience. Be extremely detailed and accurate.\n\nDesign Specifications:\n\nOverall Layout: {{chart_style}}\n\nTechnical Detail Level: {{tech___architecture}}\n\nData Representation: {{data_viz___dashboard}}\n\nVisual Concept: {{hand_drawn___conceptual}}",
    "selections": {
      "language-0": "zh-tw",
      "chart_style-0": "Clean lines (俐落線條)",
      "tech___architecture-0": "Technical illustration (技術插圖)",
      "data_viz___dashboard-0": "Infographic elements (資訊圖表元素)",
      "hand_drawn___conceptual-0": "Paper background (紙張背景)"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_b229d7a4_generate.jpg"
  },
  {
    "id": "tpl_1766544838654",
    "name": "多奇通用資訊圖表_23",
    "author": "",
    "content": "針對這份高度專業且具備特定美學（LCARS 介面）的提示詞，我們需要確保填空變數不會破壞原本精確的指令描述，而是作為「增強效果」或「微調細節」使用。\n\n以下是建議的嵌入方式，我將變數放置在能發揮最大影響力的地方：\n\n建議的 Prompt 嵌入方案\n{{language}} version. Generate an image of a {{chart_style}} LCARS-style starship status display.\n\nOn the left side, show a horizontal bar chart titled 'DECK POWER ALLOCATION' with 8 decks (Deck 1 through Deck 8) on the y-axis, each bar showing unique power percentage values ranging from 45% to 98% (labeled at the end of each bar), using the signature orange and purple LCARS color scheme. This section should reflect a {{data_viz___dashboard}} aesthetic.\n\nIn the upper right, display a pie chart labeled 'CREW COMPLEMENT BY DEPARTMENT' with: Command 12% (red), Engineering 28% (gold), Science 22% (blue), Medical 15% (teal), Security 18% (yellow), and Operations 5% (orange).\n\nIn the lower right corner, include a {{tech___architecture}} mini technical schematic of the USS Enterprise-D with labeled callouts pointing to: Main Bridge, Saucer Section, Engineering Hull, Warp Nacelles, Main Deflector, and Shuttle Bay.\n\nOverall Artistic Touch: > The entire display should have the curved rectangular frames and black background characteristic of 24th-century Starfleet computer interfaces, incorporating a {{hand_drawn___conceptual}} feel where appropriate.",
    "selections": {
      "language-0": "zh-tw",
      "chart_style-0": "Corporate Memphis (企業插畫風)",
      "data_viz___dashboard-0": "Pie charts and bar graphs (圓餅圖與長條圖)",
      "tech___architecture-0": "Cylindrical icons (圓柱體圖示)",
      "hand_drawn___conceptual-0": "Paper background (紙張背景)"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_f9e847ba_generate.jpg"
  },
  {
    "id": "tpl_1766544898037",
    "name": "多奇通用資訊圖表_24",
    "author": "",
    "content": "{{language}} version.\n\nTask Description: Generate an image of a bar chart with 10 items (labeled with the last 10 letters of the alphabet) on the x axis, each with unique values ranging from 1 to 100 (also labeled on top of the bars). On the right side should be a pie chart with 60 for A (red), 25 for B (blue), and 15 for C (green). On the bottom right, show me a mini infographic with labeled major components of a car.\n\nVisual & Style Constraints:\n\nOverall Style: {{chart_style}}\n\nTechnical Detail & Structure: {{tech___architecture}}\n\nData Layout & Dashboard Feel: {{data_viz___dashboard}}\n\nArtistic Direction: {{hand_drawn___conceptual}}",
    "selections": {
      "language-0": "zh-tw",
      "chart_style-0": "Bold outlines (粗輪廓線)",
      "tech___architecture-0": "Blueprint style (藍圖感)",
      "data_viz___dashboard-0": "Data visualization UI (數據視覺化介面)",
      "hand_drawn___conceptual-0": "Paper background (紙張背景)"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251222_b4823fbc_G8WRkt3a4AEtrd0"
  },
  {
    "id": "tpl_1766545024792",
    "name": "多奇通用資訊圖表_25",
    "author": "",
    "content": "{\n  \"promptDetails\": {\n    \"description\": \"Ultra-detailed exploded technical infographic of {OBJECT_NAME}, shown in a 3/4 front isometric view. The object is partially transparent and opened, with its key internal and external components separated and floating around the main body in a clean exploded-view layout. Show all major parts typical for {OBJECT_NAME}: outer shell/panels, structural frame, primary electronics/boards, power system/battery or PSU, ports/connectors, display or interface elements if present, input controls/buttons, mechanical modules (motors/gears/fans/hinges) if applicable, speakers/microphones if applicable, cables/flex ribbons, screws/brackets, and EMI/thermal shielding. Use thin white callout leader lines and numbered labels in a minimalist sans-serif font. Background: smooth dark gray studio backdrop. Lighting: soft, even, high-end product render lighting with subtle reflections. Style: photoreal 3D CAD render, industrial design presentation, high contrast, razor-sharp, 8K, clean composition, no clutter. [Language]: {{language}}. [Chart Style]: {{chart_style}}. [Architecture Style]: {{tech___architecture}}. [Data Visualization Style]: {{data_viz___dashboard}}. [Hand-drawn/Conceptual Influence]: {{hand_drawn___conceptual}}.\",\n    \"styleTags\": [\n      \"Exploded View\",\n      \"Technical Infographic\",\n      \"{{chart_style}}\",\n      \"{{tech___architecture}}\",\n      \"{{hand_drawn___conceptual}}\"\n    ]\n  },\n  \"negativePrompt\": \"no people, no messy layout, no extra components, no brand logos, no text blur, no cartoon, no low-poly, no watermark, no distorted perspective, no heavy noise\",\n  \"generationHints\": {\n    \"aspectRatio\": \"2:3\",\n    \"detailLevel\": \"ultra\",\n    \"stylization\": \"low-medium\",\n    \"language_setting\": \"{{language}}\",\n    \"viz_logic\": \"{{data_viz___dashboard}}\",\n    \"camera\": {\n      \"angle\": \"3/4 front isometric\",\n      \"lens\": \"product render perspective\"\n    },\n    \"lighting\": \"soft even studio lighting, subtle reflections\",\n    \"background\": \"smooth dark gray seamless backdrop\"\n  }\n}",
    "selections": {
      "language-0": "zh-tw",
      "chart_style-0": "Clean lines (俐落線條)",
      "tech___architecture-0": "Technical illustration (技術插圖)",
      "data_viz___dashboard-0": "Data visualization UI (數據視覺化介面)",
      "hand_drawn___conceptual-0": "Organic shapes (有機形狀)",
      "language-1": "zh-tw",
      "data_viz___dashboard-1": "Infographic elements (資訊圖表元素)",
      "hand_drawn___conceptual-1": "Hand-drawn sketch (手繪素描)",
      "tech___architecture-1": "Isometric (等距視角)",
      "chart_style-1": "2D Flat vector (2D 扁平向量)"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_75bde86b_generate.jpg"
  },
  {
    "id": "tpl_1766545114483",
    "name": "多奇通用資訊圖表_26",
    "author": "",
    "content": "{{language}} version.\n\nCore Content: Generate a detailed infographic diagram on how the S.O.L.I.D. coding principles help create good quality, modular code. Include the philosophy behind the principles as well.\n\nApplication Context & Styles:\n\nTechnical Architecture: {{tech___architecture}}\n\nVisual Style: {{chart_style}}\n\nData & Structure Layout: {{data_viz___dashboard}}\n\nConceptual Touch: {{hand_drawn___conceptual}}",
    "selections": {
      "language-0": "zh-tw",
      "tech___architecture-0": "Object-Oriented Design Patterns (物件導向設計模式)",
      "chart_style-0": "Corporate Memphis (企業插畫風)",
      "data_viz___dashboard-0": "Data visualization UI (數據視覺化介面)",
      "hand_drawn___conceptual-0": "Paper background (紙張背景)"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_0cad378d_generate.jpg"
  },
  {
    "id": "tpl_1766545218314",
    "name": "多奇通用資訊圖表_27",
    "author": "",
    "content": "{{language}} version.\n\nCore Instruction: Make an infographic of the top 5 longevity research programs, their main approaches, and their most interesting findings.\n\nVisual & Design Parameters:\n\nChart Style: {{chart_style}}\n\nTechnical & Logical Framework: {{tech___architecture}}\n\nData Visualization Layout: {{data_viz___dashboard}}\n\nCreative Conceptual Touch: {{hand_drawn___conceptual}}",
    "selections": {
      "chart_style-0": "Sans-serif typography labels (無襯線文字標籤)",
      "tech___architecture-0": "Isometric (等距視角)",
      "data_viz___dashboard-0": "Process flow nodes (程序流節點)",
      "hand_drawn___conceptual-0": "Marker drawing (麥克筆筆觸)"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_1e403568_generate.jpg"
  },
  {
    "id": "tpl_1766545309684",
    "name": "多奇通用資訊圖表_28",
    "author": "",
    "content": "{{language}} version.\n\nCore Technical Instruction: Generate a detailed infographic diagram on how distributed LLM training works across many networked GPUs. Be extremely detailed and correct.\n\nVisual & Technical Constraints:\n\nArchitectural Framework: {{tech___architecture}}\n\nDesign Aesthetic: {{chart_style}}\n\nLayout & Interface Style: {{data_viz___dashboard}}\n\nConceptual Abstraction: {{hand_drawn___conceptual}}",
    "selections": {
      "language-0": "zh-tw",
      "tech___architecture-0": "Blueprint style (藍圖感)",
      "chart_style-0": "Clean lines (俐落線條)",
      "data_viz___dashboard-0": "Data visualization UI (數據視覺化介面)",
      "hand_drawn___conceptual-0": "Hand-drawn sketch (手繪素描)"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_df99c240_generate.jpg"
  },
  {
    "id": "tpl_1766545490064",
    "name": "多奇通用資訊圖表_29",
    "author": "",
    "content": "{{language}} version.\n\nCore Instruction: Create a clean, modern vertical infographic titled 'How AI Changed Tech in 2025'. Use four equal rectangular sections. Each section has: an icon, bold title, and 2-3 bullet points.\n\nVisual & Style Settings:\n\nOverall Style: {{chart_style}} (Primary: Pastel color palette with muted blues, greens, and soft corals).\n\nTechnical Influence: {{tech___architecture}}\n\nDashboard Logic: {{data_viz___dashboard}}\n\nCreative Elements: {{hand_drawn___conceptual}}\n\nLayout Requirements: Minimize sans-serif typography. Ensure even spacing and a centered layout with a gradient header.",
    "selections": {
      "language-0": "zh-tw",
      "chart_style-0": "Sans-serif typography labels (無襯線文字標籤)",
      "tech___architecture-0": "UML Class Diagram structures (UML 類別圖結構)",
      "data_viz___dashboard-0": "Pie charts and bar graphs (圓餅圖與長條圖)",
      "hand_drawn___conceptual-0": "Marker drawing (麥克筆筆觸)"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_9483b0b7_generate.jpg"
  },
  {
    "id": "tpl_1766545706461",
    "name": "多奇通用資訊圖表_30",
    "author": "",
    "content": "{{language}} version.\n\nCore Instruction: Transform this data chart into a modern infographic showing global AI adoption rates 2020-2025. Use vibrant gradients and include labels in English, Hindi, Spanish, Chinese, Arabic, and Japanese.\n\nDesign Specifications:\n\nOverall Style: {{chart_style}}\n\nVisual Perspective & Elements: {{tech___architecture}}\n\nDashboard Configuration: {{data_viz___dashboard}}\n\nArtistic Direction: {{hand_drawn___conceptual}}\n\nTechnical Requirements: 4K resolution, professional presentation quality.",
    "selections": {
      "language-0": "zh-tw",
      "chart_style-0": "Corporate Memphis (企業插畫風)",
      "tech___architecture-0": "Layered System Architecture (分層系統架構)",
      "data_viz___dashboard-0": "Data visualization UI (數據視覺化介面)",
      "hand_drawn___conceptual-0": "Organic shapes (有機形狀)"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_13be993e_generate.jpg"
  },
  {
    "id": "tpl_1766545768828",
    "name": "多奇通用資訊圖表_31",
    "author": "",
    "content": "{{language}} version.\n\nCore Instruction: Design an infographic timeline of major space exploration milestones from 1957 to 2025 with icons and dates.\n\nVisual & Style Parameters:\n\nChart Framework: {{chart_style}}\n\nTechnical Detail Level: {{tech___architecture}}\n\nTimeline Visualization: {{data_viz___dashboard}}\n\nArtistic Direction: {{hand_drawn___conceptual}}",
    "selections": {
      "language-0": "zh-tw",
      "chart_style-0": "Corporate Memphis (企業插畫風)",
      "tech___architecture-0": "Character-led Storytelling (角色引導敘事)",
      "data_viz___dashboard-0": "Data visualization UI (數據視覺化介面)",
      "hand_drawn___conceptual-0": "Hand-drawn sketch (手繪素描)"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_b0a8eafa_generate.jpg"
  },
  {
    "id": "tpl_1766545824886",
    "name": "多奇通用資訊圖表_32",
    "author": "",
    "content": "{{language}} version.\n\nCore Instruction: Create a fun, but deep and informative infographic about \"{YOUR_SEARCH_KEYWORDS}\", based on his digital footprint.\n\nStylistic Integration:\n\nOverall Tone & Style: {{chart_style}}\n\nInformation Architecture: {{tech___architecture}}\n\nData Visualization Layout: {{data_viz___dashboard}}\n\nCreative Concept & Flair: {{hand_drawn___conceptual}}",
    "selections": {
      "language-0": "zh-tw",
      "chart_style-0": "Sans-serif typography labels (無襯線文字標籤)",
      "tech___architecture-0": "Character-led Storytelling (角色引導敘事)",
      "data_viz___dashboard-0": "Pie charts and bar graphs (圓餅圖與長條圖)",
      "hand_drawn___conceptual-0": "Hand-drawn sketch (手繪素描)"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_4d3c3b0a_generate.jpg"
  },
  {
    "id": "tpl_1766546465241",
    "name": "多奇通用資訊圖表_33",
    "author": "",
    "content": "{{language}} version. Generate a detailed infographic on how photosynthesis works.\n\nStyle & Concept Requirements:\n\nOverall Concept: {{hand_drawn___conceptual}}\n\nVisual Style: {{chart_style}}\n\nTechnical Structure: {{tech___architecture}}\n\nData Layout: {{data_viz___dashboard}}",
    "selections": {
      "language-0": "zh-tw",
      "hand_drawn___conceptual-0": "Crayon texture (蠟筆質感)",
      "chart_style-0": "White background (純白背景)",
      "tech___architecture-0": "Technical illustration (技術插圖)",
      "data_viz___dashboard-0": "HUD elements (抬頭顯示器元素)"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_36c1fb9f_generate.jpg"
  },
  {
    "id": "tpl_1766546493619",
    "name": "多奇通用資訊圖表_34",
    "author": "",
    "content": "{{language}} version.\n\nCore Subject: An infographic describing the [ALGORITHM] and how it works.\n\nVisual & Technical Framework:\n\nCreative Concept & Media: {{hand_drawn___conceptual}}\n\nVisual Style & Aesthetic: {{chart_style}}\n\nTechnical Architecture: {{tech___architecture}}\n\nInformation Layout: {{data_viz___dashboard}}",
    "selections": {
      "language-0": "zh-tw",
      "hand_drawn___conceptual-0": "Crayon texture (蠟筆質感)",
      "chart_style-0": "Clean lines (俐落線條)",
      "tech___architecture-0": "Layered System Architecture (分層系統架構)",
      "data_viz___dashboard-0": "Process flow nodes (程序流節點)"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_b7fe3d58_generate.jpg"
  },
  {
    "id": "tpl_1766546567857",
    "name": "多奇通用資訊圖表_35",
    "author": "",
    "content": "{{language}} version.\n\nCore Instruction: Create a visual explanation of how this [ALGORITHM/CODE BLOCK] works. Use a step-by-step flowchart with clear annotations explaining each operation. Include small code snippets where relevant, but focus on making the logic visually intuitive.\n\nVisual & Technical Implementation:\n\nDesign Language: {{chart_style}}\n\nArchitectural Framework: {{tech___architecture}}\n\nLayout & UI Style: {{data_viz___dashboard}}\n\nConceptual Theme: {{hand_drawn___conceptual}}\n\nFinal Requirement: Use color coding to distinguish between [DIFFERENT OPERATIONS/PHASES]. Make the visualization detailed enough for engineers but clear enough for non-technical stakeholders.",
    "selections": {
      "language-0": "zh-tw",
      "chart_style-0": "White background (純白背景)",
      "tech___architecture-0": "Character-led Storytelling (角色引導敘事)",
      "data_viz___dashboard-0": "Data visualization UI (數據視覺化介面)",
      "hand_drawn___conceptual-0": "Paper background (紙張背景)"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_87b2479f_20251224_87b2479f_generate.jpg"
  },
  {
    "id": "tpl_1766546607292",
    "name": "多奇通用資訊圖表_36",
    "author": "",
    "content": "{{language}} version.\n\nCore Objective: Create an advanced data visualization highlighting the patterns and anomalies in this [DATASET/METRICS]. Use visualization techniques that reveal [SPECIFIC RELATIONSHIP] while making [KEY ANOMALY TYPE] immediately apparent. Incorporate small multiples or comparative elements to show changes over [TIME PERIOD].\n\nRefined Specification:\n\nData Visualization & Dashboard Style: {{data_viz___dashboard}}\n\nTechnical & Architecture Logic: {{tech___architecture}}\n\nChart Aesthetic: {{chart_style}}\n\nConceptual Overlay: {{hand_drawn___conceptual}}\n\nFinal Requirements: Use a color scheme that emphasizes statistical significance, with attention to accessibility. Include annotations pointing out the three most important insights.",
    "selections": {
      "language-0": "zh-tw",
      "data_viz___dashboard-0": "Data visualization UI (數據視覺化介面)",
      "tech___architecture-0": "Monochromatic (單色調)",
      "chart_style-0": "Corporate Memphis (企業插畫風)",
      "hand_drawn___conceptual-0": "Hand-drawn sketch (手繪素描)"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_4449f3eb_%E6%88%AA%E5%9C%96%202025-12-24%20%E4%B8%8A%E5%8D%8811.29.50.png"
  },
  {
    "id": "tpl_1766547085139",
    "name": "多奇通用資訊圖表_37",
    "author": "",
    "content": "{{language}} version.\n\nCore Objective: Create a professional technical diagram illustrating [SYSTEM/PROCESS]. Include [KEY ELEMENTS] and show the relationships between them with directional arrows.\n\nRefined Specifications:\n\nTechnical & Architectural Logic: {{tech___architecture}}\n\nOverall Visual Style: {{chart_style}}\n\nData Visualization & Layout: {{data_viz___dashboard}}\n\nCreative Concept & Details: {{hand_drawn___conceptual}}\n\nRequirements: Use appropriate icons and labeled components. Use a color scheme that distinguishes between different system parts. Make the diagram clear enough for technical documentation but visually appealing enough for presentations.",
    "selections": {
      "language-0": "zh-tw",
      "tech___architecture-0": "Technical illustration (技術插圖)",
      "chart_style-0": "Corporate Memphis (企業插畫風)",
      "data_viz___dashboard-0": "Process flow nodes (程序流節點)",
      "hand_drawn___conceptual-0": "Paper background (紙張背景)"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_17840bc3_%E6%88%AA%E5%9C%96%202025-12-24%20%E4%B8%8A%E5%8D%8811.30.55.png"
  },
  {
    "id": "tpl_1766547145131",
    "name": "多奇通用資訊圖表_38",
    "author": "",
    "content": "{{language}} version.\n\nCore Content: Generate a detailed SWOT analysis infographic for: [ANYTHING_GOES_HERE]. The layout must be divided into four clear quadrants: Strengths, Weaknesses, Opportunities, and Threats.\n\nAnalysis Requirements: For each quadrant, provide 1-2 lines of specific, insightful analysis including causes, consequences, stakeholders, and future scenarios. Use arrows to link related points to suggest deep, organized thinking.\n\nVisual Styles (Applied via App Categories):\n\nTechnical & Architecture: {{tech___architecture}}\n\nChart Style: {{chart_style}}\n\nData Visualization & Dashboard Style: {{data_viz___dashboard}}\n\nHand-Drawn & Creative Concept: {{hand_drawn___conceptual}}",
    "selections": {
      "language-0": "zh-tw",
      "tech___architecture-0": "Isometric (等距視角)",
      "chart_style-0": "Corporate Memphis (企業插畫風)",
      "data_viz___dashboard-0": "Data visualization UI (數據視覺化介面)",
      "hand_drawn___conceptual-0": "Paper background (紙張背景)"
    },
    "tags": [
      "多奇教育訓練"
    ],
    "imageUrl": "https://msformuploads.blob.core.windows.net/nbp/20251224_0b36d6e6_generate.jpg"
  }
];
