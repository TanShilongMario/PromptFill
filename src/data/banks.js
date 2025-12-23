// 詞庫與分類設定，供 App 按需引入

export const INITIAL_CATEGORIES = {
  character: { id: "character", label: { 'zh-tw': "人物", en: "CHARACTER" }, color: "blue" },
  item: { id: "item", label: { 'zh-tw': "物品", en: "ITEM" }, color: "amber" },
  action: { id: "action", label: { 'zh-tw': "動作", en: "ACTION" }, color: "rose" },
  location: { id: "location", label: { 'zh-tw': "地點", en: "LOCATION" }, color: "emerald" },
  visual: { id: "visual", label: { 'zh-tw': "畫面", en: "VISUALS" }, color: "violet" },
  other: { id: "other", label: { 'zh-tw': "其他", en: "OTHER" }, color: "slate" }
};

// --- 初始資料設定（含示例詞庫） ---
export const INITIAL_BANKS = {
  role: {
    label: { 'zh-tw': "角色身份", en: "Role" },
    category: "character",
    options: [
      { 'zh-tw': "遊戲與動漫概念美術設計大師", en: "Master of Game and Anime Concept Art" },
      { 'zh-tw': "資深影視角色原畫師", en: "Senior Film Character Concept Artist" },
      { 'zh-tw': "賽博龐克風格設計師", en: "Cyberpunk Style Designer" },
      { 'zh-tw': "暗黑奇幻風格插畫師", en: "Dark Fantasy Style Illustrator" }
    ]
  },
  subject: {
    label: { 'zh-tw': "主體對象", en: "Subject" },
    category: "character",
    options: [
      { 'zh-tw': "女性角色", en: "Female Character" },
      { 'zh-tw': "男性角色", en: "Male Character" },
      { 'zh-tw': "機甲少女", en: "Mecha Girl" },
      { 'zh-tw': "怪物擬人化", en: "Monster Anthropomorphism" },
      { 'zh-tw': "奇幻種族（精靈／惡魔）", en: "Fantasy Race (Elf/Demon)" }
    ]
  },
  character_companion: {
    label: { 'zh-tw': "合影角色", en: "Companion" },
    category: "character",
    options: [
      { 'zh-tw': "死侍 (Deadpool)", en: "Deadpool" },
      { 'zh-tw': "超人 (Superman)", en: "Superman" },
      { 'zh-tw': "愛因斯坦 (Einstein)", en: "Einstein" },
      { 'zh-tw': "神奇女俠 (Wonder Woman)", en: "Wonder Woman" },
      { 'zh-tw': "鋼鐵人 (Iron Man)", en: "Iron Man" },
      { 'zh-tw': "皮卡丘 (Pikachu)", en: "Pikachu" },
      { 'zh-tw': "哥斯拉 (Godzilla)", en: "Godzilla" },
      { 'zh-tw': "初音未來 (Hatsune Miku)", en: "Hatsune Miku" }
    ]
  },
  layout_focus: {
    label: { 'zh-tw': "構圖重心", en: "Layout Focus" },
    category: "visual",
    options: [
      { 'zh-tw': "全身立繪", en: "Full-body Portrait" },
      { 'zh-tw': "半身肖像", en: "Half-body Portrait" },
      { 'zh-tw': "動態戰鬥姿勢", en: "Dynamic Action Pose" },
      { 'zh-tw': "背影回眸", en: "Back View Looking Back" }
    ]
  },
  grid_pose: { 
    label: { 'zh-tw': "九宮格動作", en: "Grid Pose" },
    category: "action",
    options: [
      { 'zh-tw': "前景手指虛化", en: "Out-of-focus fingers in foreground" },
      { 'zh-tw': "目光鎖定鏡頭", en: "Eyes locked on camera" },
      { 'zh-tw': "單色下巴托手", en: "Monochrome hand on chin" },
      { 'zh-tw': "透過模糊肩帶拍攝", en: "Shooting through blurred shoulder straps" },
      { 'zh-tw': "正面特寫陰影", en: "Frontal close-up with shadows" },
      { 'zh-tw': "斜角拍攝", en: "Angled shot" },
      { 'zh-tw': "雙手置於鎖骨", en: "Hands on collarbones" },
      { 'zh-tw': "坐姿半身側面", en: "Seated half-body profile" },
      { 'zh-tw': "側面微距水滴", en: "Side macro with water drops" },
      { 'zh-tw': "閉眼仰頭享受", en: "Eyes closed looking up in enjoyment" },
      { 'zh-tw': "用手遮擋陽光", en: "Shading eyes from sun with hand" },
      { 'zh-tw': "回眸一笑", en: "Looking back with a smile" },
      { 'zh-tw': "吹泡泡糖特寫", en: "Close-up blowing bubble gum" },
      { 'zh-tw': "正面直視鏡頭，表情平靜，眼神清澈", en: "Staring straight at the camera, calm expression, clear eyes" },
      { 'zh-tw': "凝視鏡頭，嘴角微微上揚，展現自信", en: "Staring at the camera, slight smile, showing confidence" },
      { 'zh-tw': "專注地看著鏡頭，表情柔和，眼神溫和", en: "Looking intently at the camera, soft expression, gentle eyes" },
      { 'zh-tw': "側身回望，眼神溫柔，嘴角上揚", en: "Side view looking back, gentle eyes, smiling" },
      { 'zh-tw': "轉身回眸，長髮飄逸，笑容自然", en: "Turning back, flowing hair, natural smile" },
      { 'zh-tw': "手輕撫下巴，表情優雅，眼神柔和", en: "Hand gently on chin, elegant expression, soft eyes" },
      { 'zh-tw': "單手支撐下巴，表情自然，眼神專注", en: "Supporting chin with one hand, natural expression, focused eyes" },
      { 'zh-tw': "利用肩帶營造景深，焦點清晰在眼睛", en: "Using shoulder straps for depth of field, focus on eyes" },
      { 'zh-tw': "正在吹泡泡糖，表情可愛，眼神專注", en: "Blowing bubble gum, cute expression, focused eyes" },
      { 'zh-tw': "側面微距特寫，突出面部輪廓和細節", en: "Side macro close-up, highlighting facial contours and details" }
    ]
  },

  camera_angle: {
    label: { 'zh-tw': "拍攝角度", en: "Camera Angle" },
    category: "visual",
    options: [
      { 'zh-tw': "臉頰和頸部特寫", en: "Cheek and neck close-up" },
      { 'zh-tw': "目光鎖定鏡頭", en: "Eyes locked on camera" },
      { 'zh-tw': "單色下巴托手肖像", en: "Monochrome hand on chin portrait" },
      { 'zh-tw': "透過模糊的肩帶拍攝", en: "Shooting through blurred shoulder straps" },
      { 'zh-tw': "正面特寫，面部陰影交錯", en: "Frontal close-up, interlocking facial shadows" },
      { 'zh-tw': "斜角拍攝的原始人像", en: "Raw portrait from an angle" },
      { 'zh-tw': "雙手置於鎖骨附近的特寫", en: "Close-up with hands near collarbones" },
      { 'zh-tw': "坐姿半身側面照", en: "Seated half-body profile shot" },
      { 'zh-tw': "側面微距照", en: "Side macro shot" }
    ]
  },
  connectors: {
    label: { 'zh-tw': "視覺引導", en: "Connectors" },
    category: "visual",
    options: [
      { 'zh-tw': "手繪箭頭或引導線", en: "Hand-drawn arrows or guide lines" },
      { 'zh-tw': "虛線連接", en: "Dashed line connections" },
      { 'zh-tw': "彩色光束", en: "Colored light beams" },
      { 'zh-tw': "半透明數據線", en: "Translucent data cables" }
    ]
  },
  underwear_style: {
    label: { 'zh-tw': "私密內著拆解", en: "Underwear Style" },
    category: "item",
    options: [
      { 'zh-tw': "成套的蕾絲內衣褲", en: "Matching lace lingerie set" },
      { 'zh-tw': "運動風格純棉內衣", en: "Athletic style cotton underwear" },
      { 'zh-tw': "極簡主義絲綢內衣", en: "Minimalist silk lingerie" },
      { 'zh-tw': "哥德風格綁帶內衣", en: "Gothic style strappy lingerie" }
    ]
  },
  clothing: {
    label: { 'zh-tw': "人物服飾", en: "Clothing" },
    category: "item",
    options: [
      { 'zh-tw': "炭灰色無袖連衣裙", en: "Charcoal grey sleeveless dress" },
      { 'zh-tw': "白色絲綢襯衫", en: "White silk shirt" },
      { 'zh-tw': "黑色修身西裝", en: "Black slim-fit suit" },
      { 'zh-tw': "戰術機能風外套", en: "Tactical techwear jacket" },
      { 'zh-tw': "復古碎花連衣裙", en: "Vintage floral print dress" }
    ]
  },
  clothing_male: {
    label: { 'zh-tw': "男性服飾", en: "Male Clothing" },
    category: "item",
    options: [
      { 'zh-tw': "剪裁合身的深藍西裝", en: "Tailored deep blue suit" },
      { 'zh-tw': "復古棕色皮夾克", en: "Vintage brown leather jacket" },
      { 'zh-tw': "戰術背心與工裝褲", en: "Tactical vest and cargo pants" },
      { 'zh-tw': "寬鬆的灰色連帽衫", en: "Loose grey hoodie" },
      { 'zh-tw': "白色亞麻襯衫", en: "White linen shirt" },
      { 'zh-tw': "黑色高領毛衣", en: "Black turtleneck sweater" }
    ]
  },
  clothing_female: {
    label: { 'zh-tw': "女性服飾", en: "Female Clothing" },
    category: "item",
    options: [
      { 'zh-tw': "炭灰色無袖連衣裙", en: "Charcoal grey sleeveless dress" },
      { 'zh-tw': "絲綢吊帶晚禮服", en: "Silk slip evening gown" },
      { 'zh-tw': "機車皮衣與短裙", en: "Biker leather jacket and short skirt" },
      { 'zh-tw': "白色蕾絲襯衫", en: "White lace blouse" },
      { 'zh-tw': "黑色緊身連體衣", en: "Black tight bodysuit" },
      { 'zh-tw': "優雅的香奈兒風套裝", en: "Elegant Chanel-style suit" }
    ]
  },
  expressions: {
    label: { 'zh-tw': "表情集", en: "Expressions" },
    category: "character",
    options: [
      { 'zh-tw': "瘋狂、病嬌、狂喜", en: "Crazy, Yandere, Ecstatic" },
      { 'zh-tw': "羞澀、閃躲、臉紅", en: "Shy, Evasive, Blushing" },
      { 'zh-tw': "冷漠、鄙視、高傲", en: "Indifferent, Contemptuous, Proud" },
      { 'zh-tw': "痛苦、忍耐、咬唇", en: "Painful, Enduring, Biting lip" }
    ]
  },
  character_originality: {
    label: { 'zh-tw': "人物原創性", en: "Character Originality" },
    category: "character",
    options: [
      { 'zh-tw': "創作一個原創人物", en: "Create an original character" },
      { 'zh-tw': "使用附圖中的人物，確保結果與人物一致性", en: "Use character in attachment, ensure consistency" },
      { 'zh-tw': "對知名角色再創作", en: "Re-create a well-known character" }
    ]
  },
  character_groups: {
    label: { 'zh-tw': "人物組合", en: "Character Groups" },
    category: "character",
    options: [
      { 'zh-tw': "中國古代開國皇帝", en: "Ancient Chinese Founding Emperors" },
      { 'zh-tw': "漫威人物", en: "Marvel Characters" },
      { 'zh-tw': "金庸古龍武俠人物", en: "Jin Yong & Gu Long Wuxia Characters" },
      { 'zh-tw': "三國知名人物", en: "Famous Three Kingdoms Figures" },
      { 'zh-tw': "知名軍事家（拿破崙、凱撒、曹操等）", en: "Famous Military Strategists (Napoleon, Caesar, Cao Cao, etc.)" },
      { 'zh-tw': "全球知名運動員", en: "World-famous Athletes" },
      { 'zh-tw': "中外知名偵探（包青天、狄仁傑、福爾摩斯、柯南等）", en: "Famous Detectives (Bao Zheng, Di Renjie, Sherlock Holmes, Conan, etc.)" },
      { 'zh-tw': "動漫遊戲角色", en: "Anime & Game Characters" },
      { 'zh-tw': "歷史名人", en: "Historical Celebrities" },
      { 'zh-tw': "明星藝人", en: "Stars & Celebrities" }
    ]
  },
  social_media: {
    label: { 'zh-tw': "社群媒體", en: "Social Media" },
    category: "location",
    options: [
      { 'zh-tw': "微信朋友圈", en: "WeChat Moments" },
      { 'zh-tw': "微博", en: "Weibo" },
      { 'zh-tw': "Twitter(X)", en: "Twitter(X)" },
      { 'zh-tw': "小紅書", en: "Little Red Book (Xiaohongshu)" },
      { 'zh-tw': "Instagram", en: "Instagram" },
      { 'zh-tw': "Facebook", en: "Facebook" },
      { 'zh-tw': "抖音", en: "Douyin" },
      { 'zh-tw': "TikTok", en: "TikTok" }
    ]
  },
  texture_zoom: {
    label: { 'zh-tw': "材質特寫", en: "Texture Zoom" },
    category: "visual",
    options: [
      { 'zh-tw': "凌亂感與私處汗漬", en: "Messiness and sweat stains in private areas" },
      { 'zh-tw': "皮膚上的勒痕與紅印", en: "Strangulation marks and red imprints on skin" },
      { 'zh-tw': "絲襪的抽絲細節", en: "Snagged details on silk stockings" },
      { 'zh-tw': "皮革的光澤與磨損", en: "Luster and wear on leather" }
    ]
  },
  action_detail: {
    label: { 'zh-tw': "動作細節", en: "Action Detail" },
    category: "action",
    options: [
      { 'zh-tw': "帶著項圈的爬行", en: "Crawling with a collar" },
      { 'zh-tw': "雙手被縛在身後的掙扎", en: "Struggling with hands bound behind back" },
      { 'zh-tw': "跪姿並展示鞋底", en: "Kneeling and showing soles" },
      { 'zh-tw': "拉扯領口的誘惑", en: "Temptation of pulling at the neckline" }
    ]
  },
  special_view: {
    label: { 'zh-tw': "特殊視角", en: "Special View" },
    category: "visual",
    options: [
      { 'zh-tw': "被踩在腳下的仰視視角", en: "Low-angle view from being stepped on" },
      { 'zh-tw': "從門縫中偷窺的視角", en: "Perspective of peeking through a door crack" },
      { 'zh-tw': "鏡子反射的背影", en: "Back view reflected in a mirror" },
      { 'zh-tw': "監視攝影機的俯視視角", en: "Top-down view from a security camera" }
    ]
  },
  bag_content: {
    label: { 'zh-tw': "隨身包袋", en: "Bag Content" },
    category: "item",
    options: [
      { 'zh-tw': "日常通勤包或手拿包", en: "Daily commuter bag or clutch" },
      { 'zh-tw': "戰術腿包", en: "Tactical leg bag" },
      { 'zh-tw': "可愛的絨毛背包", en: "Cute plush backpack" },
      { 'zh-tw': "透明材質的痛包", en: "Ita-bag made of transparent material" }
    ]
  },
  cosmetics: {
    label: { 'zh-tw': "美妝與護理", en: "Cosmetics" },
    category: "item",
    options: [
      { 'zh-tw': "常用的化妝品組合", en: "Commonly used cosmetics combo" },
      { 'zh-tw': "散落的口紅與粉餅", en: "Scattered lipsticks and compact powder" },
      { 'zh-tw': "便攜式補妝鏡", en: "Portable makeup mirror" },
      { 'zh-tw': "香水小樣與護手霜", en: "Perfume samples and hand cream" }
    ]
  },
  private_items: {
    label: { 'zh-tw': "私密生活物件", en: "Private Items" },
    category: "item",
    options: [
      { 'zh-tw': "震動棒與項圈", en: "Vibrator and collar" },
      { 'zh-tw': "手銬與眼罩", en: "Handcuffs and eye mask" },
      { 'zh-tw': "鞭子與蠟燭", en: "Whip and candle" },
      { 'zh-tw': "潤滑液與保險套", en: "Lubricant and condom" }
    ]
  },
  art_style: {
    label: { 'zh-tw': "畫風", en: "Art Style" },
    category: "visual",
    options: [
      { 'zh-tw': "高品質的 2D 插畫風格", en: "High-quality 2D illustration style" },
      { 'zh-tw': "寫實厚塗風格", en: "Realistic impasto style" },
      { 'zh-tw': "賽博龐克霓虹風格", en: "Cyberpunk neon style" },
      { 'zh-tw': "水彩手繪風格", en: "Watercolor hand-drawn style" }
    ]
  },
  background_style: {
    label: { 'zh-tw': "背景風格", en: "Background Style" },
    category: "visual",
    options: [
      { 'zh-tw': "漫畫網格筆記本", en: "Manga grid notebook" },
      { 'zh-tw': "藍圖設計稿紙", en: "Blueprint design paper" },
      { 'zh-tw': "工業風金屬背景", en: "Industrial metal background" },
      { 'zh-tw': "極簡純色背景", en: "Minimalist solid color background" }
    ]
  },
  classic_scene: {
    label: { 'zh-tw': "經典場景", en: "Classic Scene" },
    category: "location",
    options: [
      { 'zh-tw': "駭客任務", en: "The Matrix" },
      { 'zh-tw': "千與千尋", en: "Spirited Away" },
      { 'zh-tw': "瘋狂動物城（Zootopia）", en: "Zootopia" },
      { 'zh-tw': "生活大爆炸", en: "The Big Bang Theory" },
      { 'zh-tw': "霍格華茲魔法學院", en: "Hogwarts School of Witchcraft and Wizardry" },
      { 'zh-tw': "侏羅紀公園叢林入口", en: "Jurassic Park Jungle Entrance" },
      { 'zh-tw': "星際大戰塔圖因市集", en: "Star Wars Tatooine Market" },
      { 'zh-tw': "魔戒夏爾", en: "The Lord of the Rings - The Shire" },
      { 'zh-tw': "冰與火之歌君臨城城牆", en: "Game of Thrones - King's Landing Walls" },
      { 'zh-tw': "全面啟動折疊城市", en: "Inception - Folding City" },
      { 'zh-tw': "賽博龐克霓虹夜市", en: "Cyberpunk Neon Night Market" },
      { 'zh-tw': "未來城市空港樞紐", en: "Future City Spaceport Hub" }
    ]
  },
  position: {
    label: { 'zh-tw': "文字位置", en: "Text Position" },
    category: "location",
    options: [
      { 'zh-tw': "頂部中央", en: "Top Center" },
      { 'zh-tw': "底部中央", en: "Bottom Center" },
      { 'zh-tw': "左上角偏中", en: "Top Left biased center" },
      { 'zh-tw': "右上角偏中", en: "Top Right biased center" },
      { 'zh-tw': "畫面中上方懸浮", en: "Floating in top middle" }
    ]
  },
  render_style: {
    label: { 'zh-tw': "渲染風格", en: "Render Style" },
    category: "visual",
    options: [
      { 'zh-tw': "Octane Render 和 Cinema 4D", en: "Octane Render and Cinema 4D" },
      { 'zh-tw': "樂高積木風格", en: "LEGO Block Style" },
      { 'zh-tw': "Unreal Engine 5 寫實光追", en: "Unreal Engine 5 Realistic Ray Tracing" },
      { 'zh-tw': "Pixar 卡通渲染", en: "Pixar Cartoon Rendering" },
      { 'zh-tw': "黏土動畫質感", en: "Claymation Texture" },
      { 'zh-tw': "手辦級實體渲染", en: "Figurine-level Physical Rendering" },
      { 'zh-tw': "3D 像素風格", en: "3D Pixel Art Style" },
      { 'zh-tw': "手工毛線針織風格", en: "Hand-knitted Yarn Style" },
      { 'zh-tw': "毛線針織", en: "Knitted Yarn" },
      { 'zh-tw': "毛氈與黏土", en: "Felt and Clay" },
      { 'zh-tw': "紙殼紙板", en: "Cardboard" }
    ]
  },
  show_name: {
    label: { 'zh-tw': "劇名", en: "Show Name" },
    category: "other",
    options: [
      { 'zh-tw': "鐵達尼號", en: "Titanic" },
      { 'zh-tw': "龍貓", en: "My Neighbor Totoro" },
      { 'zh-tw': "哈利波特", en: "Harry Potter" },
      { 'zh-tw': "星際效應", en: "Interstellar" },
      { 'zh-tw': "千與千尋", en: "Spirited Away" },
      { 'zh-tw': "復仇者聯盟", en: "The Avengers" }
    ]
  },
  character_name: {
    label: { 'zh-tw': "角色", en: "Character Name" },
    category: "character",
    options: [
      { 'zh-tw': "Jack and Rose", en: "Jack and Rose" },
      { 'zh-tw': "龍貓", en: "Totoro" },
      { 'zh-tw': "哈利波特", en: "Harry Potter" },
      { 'zh-tw': "庫柏", en: "Cooper" },
      { 'zh-tw': "千尋", en: "Chihiro" },
      { 'zh-tw': "綠巨人", en: "Hulk" },
      { 'zh-tw': "薩諾斯", en: "Thanos" },
      { 'zh-tw': "鋼鐵人", en: "Iron Man" }
    ]
  },
  art_type: {
    label: { 'zh-tw': "藝術門類", en: "Art Type" },
    category: "other",
    options: [
      { 'zh-tw': "美術學", en: "Fine Arts" },
      { 'zh-tw': "時尚學", en: "Fashion Studies" },
      { 'zh-tw': "建築學", en: "Architecture" },
      { 'zh-tw': "攝影學", en: "Photography" },
      { 'zh-tw': "雕塑藝術", en: "Sculpture Art" },
      { 'zh-tw': "工業設計", en: "Industrial Design" }
    ]
  },
  company: {
    label: { 'zh-tw': "公司", en: "Company" },
    category: "location",
    options: [
      { 'zh-tw': "Apple", en: "Apple" },
      { 'zh-tw': "任天堂（Nintendo）", en: "Nintendo" },
      { 'zh-tw': "SONY", en: "SONY" },
      { 'zh-tw': "宜家（IKEA）", en: "IKEA" }
    ]
  },
  ratio: {
    label: { 'zh-tw': "畫幅比例", en: "Aspect Ratio" },
    category: "visual",
    options: [
      { 'zh-tw': "3:4 直式構圖", en: "3:4 Vertical" },
      { 'zh-tw': "9:16 直式構圖", en: "9:16 Vertical" },
      { 'zh-tw': "1:1 方形", en: "1:1 Square" },
      { 'zh-tw': "4:3 橫向構圖", en: "4:3 Horizontal" },
      { 'zh-tw': "16:9 橫向構圖", en: "16:9 Horizontal" },
      { 'zh-tw': "圓形畫幅", en: "Circular Aspect Ratio" }
    ]
  },
  // Fashion Template additions
  fashion_deconstruct: {
    label: { 'zh-tw': "穿搭解構", en: "Fashion Deconstruct" },
    category: "item",
    options: [
      { 'zh-tw': "整齊摺疊的外套和精緻的高跟鞋", en: "Neatly folded coat and exquisite high heels" },
      { 'zh-tw': "散落的配飾與包包", en: "Scattered accessories and bags" },
      { 'zh-tw': "懸掛的襯衫與百褶裙", en: "Hanging shirt and pleated skirt" },
      { 'zh-tw': "堆疊的金屬配飾與皮帶", en: "Stacked metal accessories and belts" }
    ]
  },
  toy_companion: {
    label: { 'zh-tw': "互動公仔", en: "Toy Companion" },
    category: "item",
    options: [
      { 'zh-tw': "Labubu 藝術公仔", en: "Labubu Art Toy" },
      { 'zh-tw': "暴力熊積木熊", en: "Bearbrick" },
      { 'zh-tw': "泡泡瑪特 Molly", en: "Pop Mart Molly" },
      { 'zh-tw': "復古泰迪熊", en: "Vintage Teddy Bear" },
      { 'zh-tw': "賽博龐克機械狗", en: "Cyberpunk Robo-Dog" }
    ]
  },

  // Old ones preserved for compatibility or other templates
  lens_param: {
    label: { 'zh-tw': "九宮格鏡頭", en: "Lens Parameter" },
    category: "visual",
    options: [
      { 'zh-tw': "85mm, f/1.8", en: "85mm, f/1.8" },
      { 'zh-tw': "85mm, f/2.0", en: "85mm, f/2.0" },
      { 'zh-tw': "50mm, f/2.2", en: "50mm, f/2.2" },
      { 'zh-tw': "50mm, f/2.5", en: "50mm, f/2.5" },
      { 'zh-tw': "50mm, f/3.2", en: "50mm, f/3.2" },
      { 'zh-tw': "35mm, f/4.5", en: "35mm, f/4.5" },
      { 'zh-tw': "85mm, f/1.9", en: "85mm, f/1.9" },
      { 'zh-tw': "50mm, f/1.8", en: "50mm, f/1.8" },
      { 'zh-tw': "85mm, f/2.2", en: "85mm, f/2.2" },
      { 'zh-tw': "50mm, f/2.0", en: "50mm, f/2.0" }
    ]
  },
  lighting: {
    label: { 'zh-tw': "燈光佈置", en: "Lighting" },
    category: "visual",
    options: [
      { 'zh-tw': "大型頂置柔光箱，輕微側向反射光", en: "Large overhead softbox, slight side reflection" },
      { 'zh-tw': "自然窗光", en: "Natural window light" },
      { 'zh-tw': "倫勃朗光", en: "Rembrandt lighting" },
      { 'zh-tw': "賽博龐克霓虹光", en: "Cyberpunk neon lighting" },
      { 'zh-tw': "影棚硬光", en: "Studio hard light" }
    ]
  },
  sticker_core: {
    label: { 'zh-tw': "核心貼紙", en: "Sticker Core" },
    category: "item",
    options: [
      { 'zh-tw': "使用者穿著甜美約會裝的照片", en: "Photo of user in a sweet date outfit" },
      { 'zh-tw': "復古搖滾樂隊 T 恤穿搭", en: "Vintage rock band T-shirt outfit" },
      { 'zh-tw': "日系 JK 制服穿搭", en: "Japanese JK uniform outfit" },
      { 'zh-tw': "極簡職場通勤裝", en: "Minimalist office commuter outfit" }
    ]
  },
  sticker_decor: {
    label: { 'zh-tw': "裝飾元素", en: "Sticker Decor" },
    category: "item",
    options: [
      { 'zh-tw': "手繪愛心、閃光符號", en: "Hand-drawn hearts, sparkle symbols" },
      { 'zh-tw': "星星、月亮貼紙", en: "Star and moon stickers" },
      { 'zh-tw': "復古郵票與票據", en: "Vintage stamps and bills" },
      { 'zh-tw': "賽博故障風 Glitch 元素", en: "Cyberpunk glitch elements" }
    ]
  },
  action_pose: {
    label: { 'zh-tw': "互動姿勢", en: "Action Pose" },
    category: "action",
    options: [
      { 'zh-tw': "用手指在男人腦後比劃「兔耳朵」", en: "Using fingers to make 'bunny ears' behind the man's head" },
      { 'zh-tw': "勾肩搭背比 V 字手勢", en: "Arm around shoulder making V sign" },
      { 'zh-tw': "互相指著對方大笑", en: "Pointing at each other and laughing" },
      { 'zh-tw': "背靠背酷炫站姿", en: "Cool back-to-back standing pose" }
    ]
  },
  background_scene: {
    label: { 'zh-tw': "背景場景", en: "Background Scene" },
    category: "location",
    options: [
      { 'zh-tw': "俯瞰紐約市的復仇者大廈樓頂", en: "Rooftop of Avengers Tower overlooking New York City" },
      { 'zh-tw': "廢棄的工業倉庫", en: "Abandoned industrial warehouse" },
      { 'zh-tw': "熙熙攘攘的時代廣場", en: "Bustling Times Square" },
      { 'zh-tw': "外太空飛船內部", en: "Inside a space-age spaceship" }
    ]
  },

  // Fish Eye Urban Template additions
  lens_type: {
    label: { 'zh-tw': "鏡頭類型", en: "Lens Type" },
    category: "visual",
    options: [
      { 'zh-tw': "標準鏡頭", en: "Standard Lens" },
      { 'zh-tw': "廣角鏡頭", en: "Wide-angle Lens" },
      { 'zh-tw': "長焦鏡頭", en: "Telephoto Lens" },
      { 'zh-tw': "極端魚眼鏡頭", en: "Extreme Fisheye Lens" },
      { 'zh-tw': "移軸鏡頭", en: "Tilt-shift Lens" },
      { 'zh-tw': "微距鏡頭", en: "Macro Lens" }
    ]
  },
  school_uniform: {
    label: { 'zh-tw': "校服樣式", en: "School Uniform" },
    category: "item",
    options: [
      { 'zh-tw': "傳統水手服校服", en: "Traditional Sailor Uniform" },
      { 'zh-tw': "灰色開襟衫和格子裙校服", en: "Grey cardigan and plaid skirt uniform" },
      { 'zh-tw': "英倫風百褶裙校服", en: "British style pleated skirt uniform" },
      { 'zh-tw': "日系 JK 制服", en: "Japanese JK Uniform" },
      { 'zh-tw': "運動校服", en: "Tracksuit School Uniform" },
      { 'zh-tw': "冬季大衣校服", en: "Winter coat school uniform" }
    ]
  },
  urban_location: {
    label: { 'zh-tw': "城市地點", en: "Urban Location" },
    category: "location",
    options: [
      { 'zh-tw': "澀谷十字路口", en: "Shibuya Crossing" },
      { 'zh-tw': "東京塔下", en: "Under Tokyo Tower" },
      { 'zh-tw': "時代廣場", en: "Times Square" },
      { 'zh-tw': "艾菲爾鐵塔旁", en: "By the Eiffel Tower" },
      { 'zh-tw': "中央公園", en: "Central Park" },
      { 'zh-tw': "北京王府井", en: "Beijing Wangfujing" },
      { 'zh-tw': "上海外灘", en: "Shanghai Bund" },
      { 'zh-tw': "香港維多利亞港", en: "Hong Kong Victoria Harbour" }
    ]
  },
  dynamic_action: {
    label: { 'zh-tw': "動態動作", en: "Dynamic Action" },
    category: "action",
    options: [
      { 'zh-tw': "一隻手誇張地伸向鏡頭前景", en: "One hand exaggeratedly reaching towards the foreground" },
      { 'zh-tw': "雙臂張開擁抱天空", en: "Arms open wide embracing the sky" },
      { 'zh-tw': "旋轉跳躍", en: "Spinning and jumping" },
      { 'zh-tw': "奔跑前進", en: "Running forward" },
      { 'zh-tw': "蹲下撿拾", en: "Squatting down to pick up" },
      { 'zh-tw': "揮手致意", en: "Waving greeting" },
      { 'zh-tw': "舞蹈姿勢", en: "Dance pose" },
      { 'zh-tw': "比心手勢", en: "Heart gesture" }
    ]
  },
  fingernail_detail: {
    label: { 'zh-tw': "手指甲細節", en: "Fingernail Detail" },
    category: "visual",
    options: [
      { 'zh-tw': "手指甲清晰可見", en: "Fingernails clearly visible" },
      { 'zh-tw': "塗有鮮豔指甲油", en: "Coated with bright nail polish" },
      { 'zh-tw': "自然裸色指甲", en: "Natural nude nails" },
      { 'zh-tw': "裝飾有鑽石指甲", en: "Decorated with diamond nails" },
      { 'zh-tw': "漸變色指甲", en: "Gradient nails" },
      { 'zh-tw': "藝術圖案指甲", en: "Artistic pattern nails" }
    ]
  },
  building_cluster: {
    label: { 'zh-tw': "建築群", en: "Building Cluster" },
    category: "location",
    options: [
      { 'zh-tw': "扭曲的澀谷 109 大樓和其他建築林立", en: "Distorted Shibuya 109 building and other forest of buildings" },
      { 'zh-tw': "紐約摩天大樓群", en: "New York skyscraper cluster" },
      { 'zh-tw': "巴黎古典建築", en: "Parisian classical architecture" },
      { 'zh-tw': "上海現代高層建築", en: "Shanghai modern high-rise buildings" },
      { 'zh-tw': "東京傳統寺廟與現代建築混合", en: "Mix of traditional Tokyo temples and modern architecture" },
      { 'zh-tw': "倫敦金融城高樓", en: "City of London high-rises" }
    ]
  },
  monster_element: {
    label: { 'zh-tw': "怪獸元素", en: "Monster Element" },
    category: "character",
    options: [
      { 'zh-tw': "巨大的粉色和藍色漸變卡通怪獸", en: "Giant pink and blue gradient cartoon monster" },
      { 'zh-tw': "機械機器人怪獸", en: "Mecha robot monster" },
      { 'zh-tw': "神話傳說中的龍", en: "Legendary dragon" },
      { 'zh-tw': "外星生物", en: "Alien creature" },
      { 'zh-tw': "海洋深淵巨獸", en: "Deep sea behemoth" },
      { 'zh-tw': "森林精靈", en: "Forest elf" }
    ]
  },
  monster_feature: {
    label: { 'zh-tw': "怪獸特徵", en: "Monster Feature" },
    category: "character",
    options: [
      { 'zh-tw': "巨大的觸手和角", en: "Giant tentacles and horns" },
      { 'zh-tw': "鋒利的爪子和牙齒", en: "Sharp claws and teeth" },
      { 'zh-tw': "多彩的翅膀", en: "Colorful wings" },
      { 'zh-tw': "發光的眼睛", en: "Glowing eyes" },
      { 'zh-tw': "金屬外殼", en: "Metal shell" },
      { 'zh-tw': "藤蔓植物", en: "Vining plants" }
    ]
  },
  distorted_city: {
    label: { 'zh-tw': "扭曲城市", en: "Distorted City" },
    category: "location",
    options: [
      { 'zh-tw': "扭曲的城市景觀", en: "Distorted urban landscape" },
      { 'zh-tw': "鏡面反射的城市", en: "Specularly reflected city" },
      { 'zh-tw': "夢幻泡泡中的城市", en: "City inside dream bubbles" },
      { 'zh-tw': "像素化的城市", en: "Pixelated city" },
      { 'zh-tw': "水墨畫風格的城市", en: "Ink-wash style city" },
      { 'zh-tw': "未來科幻城市", en: "Future sci-fi city" }
    ]
  },
  lighting_atmosphere: {
    label: { 'zh-tw': "燈光氛圍", en: "Lighting Atmosphere" },
    category: "visual",
    options: [
      { 'zh-tw': "陽光明媚", en: "Sunny" },
      { 'zh-tw': "月光皎潔", en: "Bright moonlight" },
      { 'zh-tw': "霓虹燈閃爍", en: "Flickering neon lights" },
      { 'zh-tw': "燭光搖曳", en: "Flickering candlelight" },
      { 'zh-tw': "舞台聚光燈", en: "Stage spotlights" },
      { 'zh-tw': "自然晨光", en: "Natural morning light" },
      { 'zh-tw': "夕陽餘暉", en: "Sunset afterglow" },
      { 'zh-tw': "室內暖光", en: "Indoor warm light" }
    ]
  },
  shadow_contrast: {
    label: { 'zh-tw': "陰影對比", en: "Shadow Contrast" },
    category: "visual",
    options: [
      { 'zh-tw': "光影對比強烈", en: "Strong light-shadow contrast" },
      { 'zh-tw': "柔和的陰影", en: "Soft shadows" },
      { 'zh-tw': "戲劇性陰影", en: "Dramatic shadows" },
      { 'zh-tw': "無陰影平光", en: "No-shadow flat lighting" },
      { 'zh-tw': "輪廓光", en: "Rim lighting" },
      { 'zh-tw': "背光剪影", en: "Backlit silhouette" }
    ]
  },
  travel_location: {
    label: { 'zh-tw': "旅遊地點", en: "Travel Location" },
    category: "location",
    options: [
      { 'zh-tw': "西藏拉薩布達拉宮", en: "Potala Palace, Lhasa, Tibet" },
      { 'zh-tw': "湖南林中小寨", en: "Forest Village in Hunan" },
      { 'zh-tw': "東北雪鄉", en: "Snow Village in Northeast China" },
      { 'zh-tw': "老北京胡同", en: "Old Beijing Hutongs" },
      { 'zh-tw': "雲南大理洱海", en: "Erhai Lake, Dali, Yunnan" },
      { 'zh-tw': "新疆喀納斯湖", en: "Kanas Lake, Xinjiang" },
      { 'zh-tw': "四川九寨溝", en: "Jiuzhaigou, Sichuan" },
      { 'zh-tw': "桂林漓江", en: "Li River, Guilin" },
      { 'zh-tw': "張家界天門山", en: "Tianmen Mountain, Zhangjiajie" },
      { 'zh-tw': "敦煌莫高窟", en: "Mogao Grottoes, Dunhuang" },
      { 'zh-tw': "內蒙古呼倫貝爾草原", en: "Hulunbuir Grassland, Inner Mongolia" },
      { 'zh-tw': "台灣日月潭", en: "Sun Moon Lake, Taiwan" }
    ]
  },
  comic_scene: {
    label: { 'zh-tw': "漫畫場景", en: "Comic Scene" },
    category: "location",
    options: [
      { 'zh-tw': "唯美的臥室", en: "Beautiful bedroom" },
      { 'zh-tw': "繁華的街頭", en: "Busy street" },
      { 'zh-tw': "溫馨的教室", en: "Cozy classroom" },
      { 'zh-tw': "現代咖啡廳", en: "Modern cafe" },
      { 'zh-tw': "公園長椅", en: "Park bench" },
      { 'zh-tw': "圖書館角落", en: "Library corner" },
      { 'zh-tw': "藝術工作室", en: "Art studio" },
      { 'zh-tw': "屋頂天台", en: "Rooftop" },
      { 'zh-tw': "火車站月台", en: "Railway platform" },
      { 'zh-tw': "書店一角", en: "Bookstore corner" }
    ]
  },
  designer: {
    label: { 'zh-tw': "設計師", en: "Designer" },
    category: "character",
    options: [
      { 'zh-tw': "安東尼·高第 (Antoni Gaudí)", en: "Antoni Gaudí" },
      { 'zh-tw': "Jonathan Ive (Jony Ive)", en: "Jonathan Ive" },
      { 'zh-tw': "Gio Ponti", en: "Gio Ponti" },
      { 'zh-tw': "迪特·拉姆斯 (Dieter Rams)", en: "Dieter Rams" },
      { 'zh-tw': "菲利普·史塔克 (Philippe Starck)", en: "Philippe Starck" },
      { 'zh-tw': "原研哉 (Kenya Hara)", en: "Kenya Hara" },
      { 'zh-tw': "深澤直人 (Naoto Fukasawa)", en: "Naoto Fukasawa" },
      { 'zh-tw': "薩哈·哈蒂 (Zaha Hadid)", en: "Zaha Hadid" },
      { 'zh-tw': "馬克·紐森 (Marc Newson)", en: "Marc Newson" },
      { 'zh-tw': "湯姆·迪克森 (Tom Dixon)", en: "Tom Dixon" },
      { 'zh-tw': "賈斯珀·莫里森 (Jasper Morrison)", en: "Jasper Morrison" },
      { 'zh-tw': "康斯坦丁·葛切奇 (Konstantin Grcic)", en: "Konstantin Grcic" }
    ]
  },
  design_item: {
    label: { 'zh-tw': "設計物品", en: "Design Item" },
    category: "item",
    options: [
      { 'zh-tw': "無人機", en: "Drone" },
      { 'zh-tw': "撞球桌", en: "Pool table" },
      { 'zh-tw': "拖拉機", en: "Tractor" },
      { 'zh-tw': "機械鍵盤", en: "Mechanical keyboard" },
      { 'zh-tw': "復古打字機", en: "Vintage typewriter" },
      { 'zh-tw': "單眼相機", en: "DSLR camera" },
      { 'zh-tw': "掃地機器人", en: "Robot vacuum" },
      { 'zh-tw': "咖啡機", en: "Coffee machine" },
      { 'zh-tw': "檯燈", en: "Desk lamp" },
      { 'zh-tw': "椅子", en: "Chair" },
      { 'zh-tw': "音響系統", en: "Sound system" },
      { 'zh-tw': "手錶", en: "Watch" },
      { 'zh-tw': "自行車", en: "Bicycle" },
      { 'zh-tw': "電動滑板車", en: "Electric scooter" },
      { 'zh-tw': "藍牙耳機", en: "Bluetooth headphones" },
      { 'zh-tw': "智慧音箱", en: "Smart speaker" },
      { 'zh-tw': "刮鬍刀", en: "Razor" },
      { 'zh-tw': "電風扇", en: "Electric fan" },
      { 'zh-tw': "水壺", en: "Kettle" }
    ]
  },
  rain_shape: {
    label: { 'zh-tw': "雨水形象", en: "Rain Shape" },
    category: "visual",
    options: [
      { 'zh-tw': "芭蕾舞者", en: "Ballerina" },
      { 'zh-tw': "飛舞的蝴蝶", en: "Flying butterfly" },
      { 'zh-tw': "奔跑的駿馬", en: "Running steed" },
      { 'zh-tw': "綻放的蓮花", en: "Blooming lotus" },
      { 'zh-tw': "輕盈的羽毛", en: "Light feather" },
      { 'zh-tw': "靈動的音符", en: "Lively musical note" }
    ]
  }
};

export const INITIAL_DEFAULTS = {
  role: { 'zh-tw': "遊戲與動漫概念美術設計大師", en: "Master of Game and Anime Concept Art" },
  subject: { 'zh-tw': "女性角色", en: "Female Character" },
  character_companion: { 'zh-tw': "死侍 (Deadpool)", en: "Deadpool" },
  layout_focus: { 'zh-tw': "全身立繪", en: "Full-body Portrait" },
  camera_angle: { 'zh-tw': "臉頰和頸部特寫", en: "Cheek and neck close-up" },
  connectors: { 'zh-tw': "手繪箭頭或引導線", en: "Hand-drawn arrows or guide lines" },
  underwear_style: { 'zh-tw': "成套的蕾絲內衣褲", en: "Matching lace lingerie set" },
  clothing: { 'zh-tw': "炭灰色無袖連衣裙", en: "Charcoal grey sleeveless dress" },
  clothing_male: { 'zh-tw': "剪裁合身的深藍西裝", en: "Tailored deep blue suit" },
  clothing_female: { 'zh-tw': "炭灰色無袖連衣裙", en: "Charcoal grey sleeveless dress" },
  expressions: { 'zh-tw': "瘋狂、病嬌、狂喜", en: "Crazy, Yandere, Ecstatic" },
  character_originality: { 'zh-tw': "創作一個原創人物", en: "Create an original character" },
  character_groups: { 'zh-tw': "中外知名偵探（包青天、狄仁傑、福爾摩斯、柯南等）", en: "Famous Detectives (Bao Zheng, Di Renjie, Sherlock Holmes, Conan, etc.)" },
  social_media: { 'zh-tw': "臉書塗鴉牆", en: "Facebook Wall" },
  texture_zoom: { 'zh-tw': "凌亂感與私處汗漬", en: "Messiness and sweat stains in private areas" },
  action_detail: { 'zh-tw': "帶著項圈的爬行", en: "Crawling with a collar" },
  special_view: { 'zh-tw': "被踩在腳下的仰視視角", en: "Low-angle view from being stepped on" },
  bag_content: { 'zh-tw': "日常通勤包或手拿包", en: "Daily commuter bag or clutch" },
  cosmetics: { 'zh-tw': "常用的化妝品組合", en: "Commonly used cosmetics combo" },
  private_items: { 'zh-tw': "震動棒與項圈", en: "Vibrator and collar" },
  art_style: { 'zh-tw': "高品質的 2D 插畫風格", en: "High-quality 2D illustration style" },
  background_style: { 'zh-tw': "漫畫網格筆記本", en: "Manga grid notebook" },
  fashion_deconstruct: { 'zh-tw': "整齊摺疊的外套和精緻的高跟鞋", en: "Neatly folded coat and exquisite high heels" },
  toy_companion: { 'zh-tw': "Labubu 藝術公仔", en: "Labubu Art Toy" },
  classic_scene: { 'zh-tw': "駭客任務", en: "The Matrix" },
  render_style: { 'zh-tw': "Octane Render 和 Cinema 4D", en: "Octane Render and Cinema 4D" },
  position: { 'zh-tw': "頂部中央", en: "Top Center" },
  company: { 'zh-tw': "任天堂（Nintendo）", en: "Nintendo" },
  ratio: { 'zh-tw': "3:4 直式構圖", en: "3:4 Vertical" },

  // Grid defaults
  grid_pose: { 'zh-tw': "前景手指虛化", en: "Out-of-focus fingers in foreground" },

  // Legacy defaults
  lens_param: { 'zh-tw': "85mm, f/1.8", en: "85mm, f/1.8" },
  lighting: { 'zh-tw': "大型頂置柔光箱，輕微側向反射光", en: "Large overhead softbox, slight side reflection" },
  sticker_core: { 'zh-tw': "使用者穿著甜美約會裝的照片", en: "Photo of user in a sweet date outfit" },
  sticker_decor: { 'zh-tw': "手繪愛心、閃光符號", en: "Hand-drawn hearts, sparkle symbols" },
  action_pose: { 'zh-tw': "用手指在男人腦後比劃「兔耳朵」", en: "Using fingers to make 'bunny ears' behind the man's head" },
  background_scene: { 'zh-tw': "俯瞰紐約市的復仇者大廈樓頂", en: "Rooftop of Avengers Tower overlooking New York City" },

  // Fish Eye Urban defaults
  lens_type: { 'zh-tw': "極端魚眼鏡頭", en: "Extreme Fisheye Lens" },
  school_uniform: { 'zh-tw': "灰色開襟衫和格子裙校服", en: "Grey cardigan and plaid skirt uniform" },
  urban_location: { 'zh-tw': "澀谷十字路口", en: "Shibuya Crossing" },
  dynamic_action: { 'zh-tw': "一隻手誇張地伸向鏡頭前景", en: "One hand exaggeratedly reaching towards the foreground" },
  fingernail_detail: { 'zh-tw': "手指甲清晰可見", en: "Fingernails clearly visible" },
  building_cluster: { 'zh-tw': "扭曲的澀谷 109 大樓和其他建築林立", en: "Distorted Shibuya 109 building and other forest of buildings" },
  crowd_traffic: { 'zh-tw': "擠滿行人和車輛", en: "Bustling traffic" },
  monster_element: { 'zh-tw': "巨大的粉色和藍色漸變卡通怪獸", en: "Giant pink and blue gradient cartoon monster" },
  monster_feature: { 'zh-tw': "巨大的觸手和角", en: "Giant tentacles and horns" },
  distorted_city: { 'zh-tw': "扭曲的城市景觀", en: "Distorted urban landscape" },
  lighting_atmosphere: { 'zh-tw': "陽光明媚", en: "Sunny" },
  shadow_contrast: { 'zh-tw': "光影對比強烈", en: "Strong light-shadow contrast" },
  travel_location: { 'zh-tw': "西藏拉薩布達拉宮", en: "Potala Palace, Lhasa, Tibet" },
  comic_scene: { 'zh-tw': "唯美的臥室", en: "Beautiful bedroom" },
  designer: { 'zh-tw': "Jonathan Ive (Jony Ive)", en: "Jonathan Ive" },
  design_item: { 'zh-tw': "無人機", en: "Drone" },
  rain_shape: { 'zh-tw': "芭蕾舞者", en: "Ballerina" },
  art_type: { 'zh-tw': "美術學", en: "Fine Arts" },
  show_name: { 'zh-tw': "龍貓", en: "My Neighbor Totoro" },
  character_name: { 'zh-tw': "龍貓", en: "Totoro" }
};

