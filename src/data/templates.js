/**
 * @typedef {Object} TemplateConfig
 * @property {string} id - 唯一識別符，建議使用 'tpl_' 前綴
 * @property {string} name - 模板顯示名稱
 * @property {string} content - 模板內容，支援 markdown 和 {{variable}} 變數
 * @property {string} imageUrl - 預覽縮略圖 URL
 * @property {Object.<string, string>} selections - 預設選中的變數值 map (key: variable_id, value: option_value)
 * @property {string[]} tags - 模板標籤陣列，可選值：建築、人物、攝影、產品、圖表、卡通、寵物、遊戲、創意
 */

/**
 * 模板系統版本號，每次更新 templates.js 或 banks.js 時請更新此版本號
 */
export const SYSTEM_DATA_VERSION = "0.5.0";

export const DEFAULT_TEMPLATE_CONTENT = `### Role (角色設定)
你是一位頂尖的 {{role}}，擅長製作詳盡的角色設定圖（Character Sheet）。你具備「像素級拆解」的能力，能透視角色的穿著層級、捕捉微表情變化，並將與其相關的物品進行具象化還原。你特別擅長透過 {{subject}} 的私密物品、隨身物件和生活細節來側面豐滿人物性格與背景故事。

### Task (任務目標)
根據使用者上傳或描述的主體形象，生成一張**「全景式角色深度概念分解圖」**。該圖片必須包含 {{layout_focus}}，並在其周圍環繞展示該人物的服裝分層、不同表情、核心道具、材質特寫，以及極具生活氣息的私密與隨身物品展示。

### Visual Guidelines (視覺規範)
**1. 構圖佈局 (Layout):**
- **中心位 (Center):** 放置角色的 {{layout_focus}}，作為視覺錨點。
- **環繞位 (Surroundings):** 在中心人物四周空白處，有序排列拆解後的元素。
- **視覺引導 (Connectors):** 使用{{connectors}}，將周邊的拆解物品與中心人物的對應部位或所屬區域連接起來。

**2. 拆解內容 (Deconstruction Details):**
- **服裝分層 (Clothing Layers):** 將角色的服裝拆分為單品展示
- **私密內著拆解：** 獨立展示角色的內層衣物，重點突出設計感與材質。例如： {{underwear_style}} （展示細節與剪裁）。
- **表情集 (Expression Sheet):** 在角落繪製 3-4 個不同的頭部特寫，展示不同的情緒，如： {{expressions}} 。
- **材質特寫 (Texture & Zoom):** 選取關鍵部位進行放大特寫。例如： {{texture_zoom}} ，增加對小物件材質的描繪。
- **動作：** 繪製特殊的動作和表情，例如：{{action_detail}}，增加動作的深度刻畫。
- **特殊視角：** 繪製從某種特殊場景下拍攝的特殊視角，例如：{{special_view}}

- **關聯物品 (Related Items):**
 - **隨身包袋與內容物：** 繪製 {{bag_content}}，並將其「打開」，展示散落在旁的物品。
 - **美妝與護理：** 展示 {{cosmetics}}。
 - **私密生活物件：** 具象化角色隱藏面的物品。根據角色性格可能包括： {{private_items}}，需以一種設計圖的客觀視角呈現。

**3. 風格與註釋 (Style & Annotations):**
- **畫風：** {{art_style}}，線條乾淨俐落。
- **背景：** {{background_style}}，營造設計手稿的氛圍。
- **文字說明：** 在每個拆解元素旁模擬手寫註釋，簡要說明材質或品牌/型號暗示。

### Workflow (執行邏輯)
1. 分析主體的核心特徵、穿著風格及潛在性格。
2. 提取可拆解的一级元素（外套、鞋子、大表情）。
3. 腦補並設計二級深度元素（她內衣穿什麼風格？包裡裝什麼？獨處時用什麼？）。
4. 生成一張包含所有這些元素的組合圖，確保透視準確，光影統一，註釋清晰。
5. 使用中文，高清輸出。`;

export const TEMPLATE_PHOTO_GRID = `### Photo Grid Composition (九宮格攝影)

**編輯場景：** 3x3網格佈局，採用冷灰色無縫背景。人物（面部特徵與上傳圖片完全一致）身穿 {{clothing}}，確保每張照片中人物形象保持一致。

**燈光設定：** {{lighting}}，營造統一而富有層次的光影效果。

**照片細節包括 (Grid Details)：**
1. {{grid_pose}}，畫面風格統一，鏡頭參數為 {{lens_param}}；
2. {{grid_pose}}，鏡頭參數為 {{lens_param}}，展現不同的拍攝角度和表情；
3. {{grid_pose}}，鏡頭參數為 {{lens_param}}，捕捉細膩的情感表達；
4. {{grid_pose}}，鏡頭參數為 {{lens_param}}，利用景深營造層次感；
5. {{grid_pose}}，鏡頭參數為 {{lens_param}}，突出動態瞬間的生動性；
6. {{grid_pose}}，鏡頭參數為 {{lens_param}}，透過前景虛化增強視覺焦點；
7. {{grid_pose}}，鏡頭參數為 {{lens_param}}，展現優雅的姿態和放鬆的狀態；
8. {{grid_pose}}，鏡頭參數為 {{lens_param}}，捕捉自然光線下的表情變化；
9. {{grid_pose}}，鏡頭參數為 {{lens_param}}，微距特寫展現面部細節和質感。

**後期處理：** 保持原始素材的真實感，平滑對比度，適度應用柔化效果，確保整體色調統一且富有質感。`;

export const TEMPLATE_PHOTO_GRID_V2 = `### Photo Grid Composition (九宮格攝影出格版)

**編輯場景：** 3x3網格佈局，採用冷灰色無縫背景。人物（面部特徵與上傳圖片完全一致）身穿 {{clothing}}，確保每張照片中人物形象保持一致。

**燈光設定：** {{lighting}}，營造統一而富有層次的光影效果。

**照片細節包括 (Grid Details)：**
1. {{grid_pose}}，畫面風格統一，鏡頭參數為 {{lens_param}}；
2. {{grid_pose}}，鏡頭參數為 {{lens_param}}，展現不同的拍攝角度和表情；
3. {{grid_pose}}，鏡頭參數為 {{lens_param}}，捕捉細膩的情感表達；
4. {{grid_pose}}，鏡頭參數為 {{lens_param}}，利用景深營造層次感；
5. {{grid_pose}}，鏡頭參數為 {{lens_param}}，突出動態瞬間的生動性；
6. {{grid_pose}}，鏡頭參數為 {{lens_param}}，透過前景虛化增強視覺焦點；
7. {{grid_pose}}，鏡頭參數為 {{lens_param}}，展現優雅的姿態和放鬆的狀態；
8. {{grid_pose}}，鏡頭參數為 {{lens_param}}，捕捉自然光線下的表情變化；
9. {{grid_pose}}，鏡頭參數為 {{lens_param}}，微距特寫展現面部細節和質感。

**後期處理：** 保持原始素材的真實感，平滑對比度，適度應用柔化效果，確保整體色調統一且富有質感。

**需要單獨處理：**中央宮格的圖片不侷限在自己的宮格內，形成一種從中央宮格躍出畫面的3D立體視覺，中央宮格人物佔據圖片較大面積且全身出鏡，會覆蓋到其他宮格，並對其他宮格形成陰影效果，營造一種裸眼3D的視覺張力`;

export const TEMPLATE_FASHION_MOODBOARD = `### Fashion Illustration Moodboard (時尚插畫情緒板)
一張9:16直立螢幕的高級時尚插畫情緒板，模擬平板掃描效果。

**背景：** 純手繪的奶油色水彩暈染紙張，帶有淡淡的粉色網格。
**視覺核心：** 數張具有明顯白色模切寬邊和柔和投影的亮面乙烯基貼紙。

**貼紙內容：**
- **中央：** {{sticker_core}}，光線明亮。
- **左側：** {{fashion_deconstruct}}。
- **右下角：** 關鍵的隱藏層貼紙：一套折疊整齊的內衣，展現細膩紋理。
- **互動元素：** 一隻穿著粉色系、與使用者服裝呼應的 {{toy_companion}} 正趴在一個手繪對話框上。

**裝飾細節：** 周圍裝飾著蠟筆質感的 {{sticker_decor}} 和潦草的中文書法標註 OOTD。
**注意：** 畫面中絕無任何人手、筆或物理桌面背景，純粹的平面藝術插畫。`;

export const TEMPLATE_CHARACTER_SELFIE = `### Character Selfie (人物趣味合影)
讓 {{character_companion}} 站在男人旁邊，{{action_pose}}，同時對著鏡頭露出調皮的表情。

**背景：** 以 {{background_scene}} 為背景。

**要求：** 保持自拍構圖不變，讓兩個角色自然地融入畫面，光影統一，互動自然。`;

export const TEMPLATE_CLASSIC_SCENE = `### 經典場景微縮復刻

展示一個精緻的、微縮 3D 卡通風格的{{classic_scene}}場景，採用清晰的 45° 俯視等軸側視角（Isometric view）。

**核心構圖：** 將主體最經典的形象突出地置於中心。自動搭配比例適宜的關鍵元素圖示、象徵性物品、迷人的小角色以及能詮釋主體故事的道具。整體佈局應當充滿趣味且緊湊聚集，宛如一套高端的玩具盲盒套裝。

**渲染與材質：** 採用{{render_style}}風格進行渲染。建模必須精細、圓潤流暢且質感豐富。使用逼真的 PBR 材質：混合用於有機形態的柔和啞光黏土、用於水體/玻璃元素的光澤樹脂，以及用於結構元件的光滑 PVC 材質。著重表現具有觸感、「看起來手感很好」的紋理細節。

**燈光與氛圍：** 採用柔和、逼真的攝影棚佈光配合全局光照（Global Illumination）。利用柔和的陰影營造出溫暖、舒適且充滿魔力的氛圍。

**佈局：** 保持乾淨、極簡的佈局，使用與主體配色相協調的純色背景。

**文字：** 在{{position}}，使用巨大的、圓潤的 3D 字體醒目地展示主體名稱，使其輕微懸浮於場景上方。`;

export const TEMPLATE_CORPORATE_GROWTH = `### 可視化企業成長之路

**角色定義**
你是一位企業演變建築師 (Corporate Evolution Architect)。你的目標是創建一個超高密度、垂直堆疊的等距軸測（Isometric）3D 渲染可視化圖像，展示 {{company}} 公司的技術和產品歷史。透過圖像展示一個企業的時間線：底部是簡陋的創業故事，透過產品迭代垂直向上升起，直到現代或未來的巔峰。

**核心能力 | 關鍵視覺策略（rameless Tech-Lapse）：**
- **根除容器：** 嚴禁使用底板、邊框或橫截面視圖。底部邊緣是創業基地（車庫/實驗室/小辦公室），無限延伸。
- **垂直時間線：** 「之字形上升（Zig-Zag Ascent）」穿越創新歷程。
  - 底部（前景）：創業階段歲月 + 第一個原型機
  - 中部（上升中）：快速增長 / 全球擴張 / 標誌性的中期產品
  - 頂部（背景）：當前總部 / 生態系統 / 未來研發
- **整合 3D 標題：** 企業 Logo 必須渲染為巨大的、電影般的 3D 字體，矗立在前景，使用公司標誌性字體/材質。

**檢索與梳理：**
- 提取企業歷史的幾個階段。
- 列出定義每個時代的「經典產品」。
- 勞動力演變：可視化員工與設備的變化。

**構圖與光影：**
無框架、無邊界、無橫截面。垂直之字形時間線，將產品代際從底部的創業階段堆疊到未來的頂部。燈光從近現代的暖光（創業初期）過渡到乾淨的白/藍 LED 光（現代科技）。環境與公司經典產品隨高度演變。公司的多款經典產品以「巨物化」呈現。
移軸攝影（Tilt-shift）與 {{render_style}}，畫幅 {{ratio}}。`;

export const TEMPLATE_DETECTIVE_SOCIAL = `發揮你的創意幫我一起腦洞，假設{{character_groups}}使用{{social_media}}，包括回覆評論按讚，設計一些有趣、有反差的人物使用社交媒體互動朋友圈的場景，結合一些符合人物的大事件，有趣有梗有反差，製作一張{{social_media}}的截圖，使用中文，{{ratio}}。
`;

export const TEMPLATE_MAGAZINE_COVER = `### PROJECT GOAL | 專案目標
生成一張 9:16 旅遊雜誌封面級照片，以我上傳的真人照片為基準，實現 100% 五官還原，呈現專業、精緻、具有真實雜誌質感的封面畫面。

### SUBJECT | 人物設定
根據我上傳人物的五官特徵進行完整還原；人物置身於 {{travel_location}}，請依據這個地理位置給人物穿著符合當地此刻的即時天氣、溫度與季節服裝邏輯；整體風格自然、優雅、有現場氛圍。

### POSE & EXPRESSION | 姿態與表情
人物以雜誌封面標準姿態入鏡，略帶從容質感；面部表情自然放鬆但具吸引力；
身體姿勢根據場景與天氣自由適配，呈現「在當地旅行中的真實狀態」。

### ENVIRONMENT | 場景要求
背景呈現使用者輸入的地名代表性視覺線索，請依據使用者輸入的地理位置呈現符合當地此刻的即時天氣、溫度與季節場景邏輯；保持高級寫實風格，不誇張、不超現實；
光線以真實自然光為主，具有現場環境的時間感。

### CAMERA & AESTHETICS | 拍攝規格
畫幅比例: {{ratio}}
構圖: 充分利用豎幅空間，打造「封面級」視覺中心；鏡頭語言: 專業攝影棚級別的清晰度與景深；膚質感可見毛孔與自然紋理（非磨皮）；整體氛圍具有高級旅行雜誌的真實感與美感。

### MAGAZINE DESIGN | 封面設計
版面風格現代、乾淨、具有國際旅行雜誌氛圍；
主標題、副標題、雜誌圖形元素可自動生成但需與人物與地點匹配；
色彩搭配高級、協調；
最終呈現接近《Vogue》《National Geographic Traveler》級別的封面氣質。`;

export const TEMPLATE_MANGA_TO_REALITY = `### SUBJECT | 人物主體
{{character_originality}}，從漫畫分鏡邊框中跨步走出並打破界線。真實版本與漫畫版本之間充滿動態且無縫的互動。

### SETTING | 場景設定
地點：{{comic_scene}}
地板上攤開一本巨大的漫畫書。

### MANGA DETAILS | 漫畫細節
- **風格：** 超現實風格的黑白四格漫畫
- **技法：** 正宗日式排版，網點紙效果，粗黑墨線，線條清晰俐落
- **內容：** 同一個人的漫畫版本被困在漫畫書裡面
- **對比：** 單色漫畫世界與鮮豔現實世界的強烈視覺對比

### REAL LIFE VERSION | 真實版本
- **視覺質感：** 生動、色彩豐富、照片級真實感、超逼真 8K 畫質
- **互動方式：** 動態地浮現於漫畫表面，直接與漫畫版本互動
- **情緒氛圍：** 元風格 (Meta)，幽默的相遇

### TECHNICAL SPECS | 技術規格
- **畫質：** 超逼真，8K 解析度，高度細節化
- **融合效果：** 漫畫線條藝術與現實攝影的無縫融合
- **畫幅比例：** {{ratio}}`;

export const TEMPLATE_FISHEYE_URBAN = `### 極端魚眼都市奇觀

{{character_originality}}，用{{lens_type}}拍攝的照片，主體是一位穿著{{school_uniform}}的{{subject}}，在{{urban_location}}興奮地跳起，{{dynamic_action}}。

**視覺焦點：**
- **前景細節：** {{fingernail_detail}}
- **背景景觀：** {{building_cluster}}，街道上擠滿行人和車輛
- **超現實元素：** {{monster_element}}漂浮在城市上空，{{monster_feature}}環繞著扭曲的城市景觀

**整體基調：**
創造一個融合現實與奇幻的都市奇觀，魚眼鏡頭的畸變效果與卡通怪獸的出現形成強烈對比，營造出夢幻而充滿活力的視覺衝擊。`;

export const TEMPLATE_INDUSTRIAL_DESIGN = `### 目標
設計一個頂級的工業設計產品介紹頁，使用極簡的宣傳頁風格；需要深刻理解該設計師的設計理念、設計風格，並將這種設計理解完全融入到設計產品的工業設計與展示頁面中

### 內容
- **設計師：** {{designer}}
- **產品：** {{design_item}}

### 畫面
- **設計師介紹：**
約占整個畫面非常少的部分，包括設計師的介紹（極具氛圍感的頭像）與設計師對於這個產品的設計思路與設計理解，以及設計師的簽名。
- **畫面核心內容：**
占整個畫面的80%或更多用於呈現產品本身，一個完全符合設計師自己設計風格與設計方法的頂級產品設計圖（一个完整的單張產品效果的呈現），基於工業成品設計成果使用不同的構圖。整體配色需要與設計師的風格與產品內容完全相符
- **構圖：**
最終構圖：{{ratio}}
整體排版主次分明，規整，極具格調與設計特色`;

export const TEMPLATE_RAINDROP_ART = `### Raindrop Art (雨滴定格藝術)

**核心表現:**
捕捉雨滴落入水面的瞬間，雨滴打落在水面上，飛濺的水珠在空中形成一個抽象的 {{rain_shape}}。

**藝術視覺:**
水滴構成的結果相對比較概念化，更遵從水滴濺落形成的動態感，但能從動作或神態中感受到其表達的藝術視覺。畫面呈現雨水與自然交互的微妙之美，動感與優雅交融，展現詩意的視覺表達。

**環境背景:**
背景是朦朧的雨景。

**規格:**
{{ratio}}`;

export const TEMPLATE_ART_GROWTH = `### 可視化藝術成長之路

**角色定義**
你是一位歷史演變建築師 (History Evolution Architect)。你的目標是創建一個超高密度、垂直堆疊的等距軸測（Isometric）3D 展廳渲染可視化圖像，展示 {{art_type}} 的發展歷史。透過展廳來展示一條里程發展的時間線：底部是簡陋的發展初期，透過歷史更迭垂直向上升起，直到現代或未來的巔峰。

**核心能力 | 關鍵視覺策略（rameless Tech-Lapse）：**
- **展廳模擬：** 使用一個多層的藝術展廳承載所要表達的事物發展，層級代表時間維度的推進，每層可能存在不同的「房間」用於展示同一時代不同風格的作品
- **根除容器：** 嚴禁使用底板、邊框或橫截面視圖。底部邊緣是歷史起源（原始社會或古代社會）
- **垂直時間線：** 「之字形上升（Zig-Zag Ascent）」穿越創新歷程。
  - 底部（前景）：起源與原型
  - 中部（上升中）：古代到現代的輝煌發展
  - 頂部（背景）：當前的發展狀態與未來的可能性
- **整合 3D 標題：** 明確且與主題相符合的標題

**檢索與梳理：**
- 提取重要發展歷史中的幾個階段。
- 列出定義每個時代的「經典」。
- 工具與媒介的變化

**構圖與光影：**
等距視角的展廳視角。垂直之字形時間線，將事物發展從底部的創業階段堆疊到未來的頂部，環境與劃時代的經典作品隨高度演變。多款經典作品以「巨物化」呈現。
移軸攝影（Tilt-shift）與 {{render_style}}，畫幅 {{ratio}}。`;

export const TEMPLATE_MINIATURE_DESK = `### 窗邊書桌微縮場景

展示一個在窗邊書桌上的場景。

**核心內容：**
《{{show_name}}》的經典鏡頭微縮場景展示，採用了{{render_style}}風格，充分體現了微縮攝影的藝術表達。

**環境背景：**
背景是真實的書桌，有一些製作工具，散亂的書本，營造一種剛剛加工完這個場景的凌亂感。書桌上還有編制的圖紙和原型手稿。

**窗外互動：**
窗外，真實的{{character_name}}正好奇地向內觀察這個桌上的作品。

**畫面規格：**
{{ratio}}`;

/**
 * 可用的模板标签
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
  "創意"
];

/**
 * 系統內建模板列表
 *
 * 如何新增模板：
 * 1. 在上方定義模板內容常量 (可選，但推薦)
 * 2. 在陣列中新增一個新的配置物件
 * 3. 確保 id 唯一
 * 4. imageUrl 可以是外部連結，也可以是專案內的 import 資源
 * 5. tags 可以從 TEMPLATE_TAGS 中選擇
 */
export const INITIAL_TEMPLATES_CONFIG = [
  {
    id: "tpl_default",
    name: "角色概念分解圖",
    content: DEFAULT_TEMPLATE_CONTENT,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/08/ec433cf214faf102.jpg",
    author: "官方",
    selections: {},
    tags: ["人物", "創意", "圖表"]
  },
  {
    id: "tpl_photo_grid",
    name: "3x3 攝影網格",
    content: TEMPLATE_PHOTO_GRID,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/08/5302794e63fa130b.jpg",
    author: "官方",
    selections: {
      "clothing": "炭灰色無袖連衣裙",
      "grid_pose-0": "前景手指虛化",
      "grid_pose-1": "目光鎖定鏡頭",
      "grid_pose-2": "單色下巴托手",
      "grid_pose-3": "正面特寫陰影",
      "grid_pose-4": "斜角拍攝",
      "grid_pose-5": "雙手置於鎖骨",
      "grid_pose-6": "坐姿半身側面",
      "grid_pose-7": "側面微距水滴",
      "grid_pose-8": "回眸一笑",
      "lens_param-0": "85mm, f/1.8",
      "lens_param-1": "85mm, f/2.0",
      "lens_param-2": "50mm, f/2.2",
      "lens_param-3": "50mm, f/2.5",
      "lens_param-4": "50mm, f/3.2",
      "lens_param-5": "35mm, f/4.5",
      "lens_param-6": "85mm, f/1.9",
      "lens_param-7": "50mm, f/1.8",
      "lens_param-8": "85mm, f/2.2"
    },
    tags: ["人物", "攝影"]
  },
  {
    id: "tpl_fashion",
    name: "時尚情緒板插畫",
    content: TEMPLATE_FASHION_MOODBOARD,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/08/4d9f92ccb4113fdd.jpg",
    author: "官方",
    selections: {},
    tags: ["人物", "創意", "卡通"]
  },
  {
    id: "tpl_character_selfie",
    name: "人物趣味合影",
    content: TEMPLATE_CHARACTER_SELFIE,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/08/c2312d24d0f2c38e.jpeg",
    author: "官方",
    selections: {},
    tags: ["人物", "創意"]
  },
  {
    id: "tpl_classic_scene",
    name: "經典場景微縮復刻",
    content: TEMPLATE_CLASSIC_SCENE,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/10/1eac697f5a438542.jpg",
    author: "官方",
    selections: {
      "classic_scene": "神隱少女",
      "render_style": "Octane Render 和 Cinema 4D",
      "position": "頂部中央"
    },
    tags: ["卡通", "創意", "遊戲"]
  },
  {
    id: "tpl_corporate_growth",
    name: "可視化企業成長之路",
    content: TEMPLATE_CORPORATE_GROWTH,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/10/a7e87e49c6144fdc.jpg",
    author: "官方",
    selections: {
      "company": "任天堂（Nintendo）",
      "render_style": "3D像素風格",
      "ratio": "3:4直式構圖"
    },
    tags: ["建築", "創意", "圖表"]
  },
  {
    id: "tpl_fisheye_urban",
    name: "極端魚眼都市奇觀",
    content: TEMPLATE_FISHEYE_URBAN,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/14/b21165a2afefaf4d.jpg",
    author: "官方",
    selections: {
      "lens_type": "極端魚眼鏡頭",
      "role": "年輕女性",
      "character_originality": "使用附圖中的人物，確保結果與人物一致性",
      "school_uniform": "灰色開衫和格子裙校服",
      "urban_location": "澀谷十字路口",
      "dynamic_action": "一隻手誇張地伸向鏡頭前景",
      "fingernail_detail": "手指甲清晰可見",
      "building_cluster": "扭曲的澀谷109大樓和其他建築林立",
      "crowd_traffic": "擠滿行人和車輛",
      "monster_element": "巨大的粉色和藍色漸變卡通怪獸",
      "monster_feature": "巨大的觸手和角",
      "distorted_city": "扭曲的城市景觀",
      "lighting_atmosphere": "陽光明媚",
      "shadow_contrast": "光影對比強烈",
      "ratio": "圓形畫幅",
      "render_style": "高品質的 2D 插畫風格",
    },
    tags: ["攝影", "創意", "人物"]
  },
  {
    id: "tpl_detective_social",
    name: "歷史名人的朋友圈",
    content: TEMPLATE_DETECTIVE_SOCIAL,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/14/6ff892060de55ea9.jpg",
    author: "@dotey(宝玉)",
    selections: {
      "character_groups": "中國古代開國皇帝",
      "social_media": "臉書塗鴉牆",
      "ratio": "9:16直式構圖"
    },
    tags: ["創意", "人物", "攝影"]
  },
  {
    id: "tpl_magazine_cover",
    name: "雜誌大片",
    content: TEMPLATE_MAGAZINE_COVER,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/16/a6106f5cc6e92a74.jpg",
    author: "官方",
    selections: {
      "travel_location": "東北雪鄉",
      "ratio": "9:16直式構圖"
    },
    tags: ["人物", "攝影", "創意"]
  },
  {
    id: "tpl_manga_reality",
    name: "漫畫人物成真",
    content: TEMPLATE_MANGA_TO_REALITY,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/16/f5291c56ece88cd9.jpg",
    author: "官方",
    selections: {
      "character_originality": "使用附圖中的人物，確保結果與人物一致性",
      "comic_scene": "唯美的臥室",
      "ratio": "9:16直式構圖"
    },
    tags: ["人物", "創意", "卡通"]
  },
  {
    id: "tpl_industrial_design",
    name: "設計大師的產品設計",
    content: TEMPLATE_INDUSTRIAL_DESIGN,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/17/7dbe43ae66b1a78c.jpg",
    author: "官方",
    selections: {
      "designer": "Jonathan Ive (Jony Ive)",
      "design_item": "無人機",
      "ratio": "3:4直式構圖"
    },
    tags: ["產品", "創意", "圖表"]
  },
  {
    id: "tpl_photo_grid_v2",
    name: "3x3 攝影網格出格版",
    content: TEMPLATE_PHOTO_GRID_V2,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/17/77bfd2bf7abc3eac.png",
    author: "官方",
    selections: {
      "clothing": "炭灰色無袖連衣裙",
      "grid_pose-0": "前景手指虛化",
      "grid_pose-1": "目光鎖定鏡頭",
      "grid_pose-2": "單色下巴托手",
      "grid_pose-3": "正面特寫陰影",
      "grid_pose-4": "斜角拍攝",
      "grid_pose-5": "雙手置於鎖骨",
      "grid_pose-6": "坐姿半身側面",
      "grid_pose-7": "側面微距水滴",
      "grid_pose-8": "回眸一笑",
      "lens_param-0": "85mm, f/1.8",
      "lens_param-1": "85mm, f/2.0",
      "lens_param-2": "50mm, f/2.2",
      "lens_param-3": "50mm, f/2.5",
      "lens_param-4": "50mm, f/3.2",
      "lens_param-5": "35mm, f/4.5",
      "lens_param-6": "85mm, f/1.9",
      "lens_param-7": "50mm, f/1.8",
      "lens_param-8": "85mm, f/2.2"
    },
    tags: ["人物", "攝影"]
  },
  {
    id: "tpl_raindrop_art",
    name: "雨滴定格藝術",
    content: TEMPLATE_RAINDROP_ART,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/19/6b6e14845635b168.jpg",
    author: "@tanshilong",
    selections: {
      "rain_shape": "芭蕾舞者",
      "ratio": "3:4直式構圖"
    },
    tags: ["攝影", "創意"]
  },
  {
    id: "tpl_art_growth",
    name: "可視化藝術成長之路",
    content: TEMPLATE_ART_GROWTH,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/19/47a2cbfec635a29a.jpg",
    author: "@sundyme",
    selections: {
      "art_type": "美術學",
      "render_style": "3D像素風格",
      "ratio": "3:4直式構圖"
    },
    tags: ["建築", "創意", "圖表"]
  },
  {
    id: "tpl_miniature_desk",
    name: "窗邊書桌微縮場景",
    content: TEMPLATE_MINIATURE_DESK,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/20/8e9c9c28b3d2cf1b.jpg",
    author: "@tanshilong",
    selections: {
      "show_name": "龍貓",
      "character_name": "龍貓",
      "render_style": "毛氈與黏土",
      "ratio": "4:3構圖"
    },
    tags: ["攝影", "創意", "卡通"]
  }
];
