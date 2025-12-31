// 词库与分类配置，供 App 按需引入

export const INITIAL_CATEGORIES = {
  character: { id: "character", label: { cn: "人物", en: "CHARACTER" }, color: "blue" },
  item: { id: "item", label: { cn: "物品", en: "ITEM" }, color: "amber" },
  action: { id: "action", label: { cn: "动作", en: "ACTION" }, color: "rose" },
  location: { id: "location", label: { cn: "地点", en: "LOCATION" }, color: "emerald" },
  visual: { id: "visual", label: { cn: "画面", en: "VISUALS" }, color: "violet" },
  other: { id: "other", label: { cn: "其他", en: "OTHER" }, color: "slate" }
};

// --- 初始数据配置 (Updated with new banks for examples) ---
export const INITIAL_BANKS = {
  role: {
    label: { cn: "角色身份", en: "Role" },
    category: "character",
    options: [
      { cn: "游戏与动漫概念美术设计大师", en: "Master of Game and Anime Concept Art" },
      { cn: "资深影视角色原画师", en: "Senior Film Character Concept Artist" },
      { cn: "赛博朋克风格设计师", en: "Cyberpunk Style Designer" },
      { cn: "暗黑幻想风格插画师", en: "Dark Fantasy Style Illustrator" }
    ]
  },
  subject: {
    label: { cn: "主体对象", en: "Subject" },
    category: "character",
    options: [
      { cn: "女性角色", en: "Female Character" },
      { cn: "男性角色", en: "Male Character" },
      { cn: "机甲少女", en: "Mecha Girl" },
      { cn: "怪物拟人化", en: "Monster Anthropomorphism" },
      { cn: "奇幻种族(精灵/恶魔)", en: "Fantasy Race (Elf/Demon)" }
    ]
  },
  character_companion: {
    label: { cn: "合影角色", en: "Companion" },
    category: "character",
    options: [
      { cn: "死侍 (Deadpool)", en: "Deadpool" },
      { cn: "超人 (Superman)", en: "Superman" },
      { cn: "爱因斯坦 (Einstein)", en: "Einstein" },
      { cn: "神奇女侠 (Wonder Woman)", en: "Wonder Woman" },
      { cn: "钢铁侠 (Iron Man)", en: "Iron Man" },
      { cn: "皮卡丘 (Pikachu)", en: "Pikachu" },
      { cn: "哥斯拉 (Godzilla)", en: "Godzilla" },
      { cn: "初音未来 (Hatsune Miku)", en: "Hatsune Miku" }
    ]
  },
  layout_focus: {
    label: { cn: "构图重心", en: "Layout Focus" },
    category: "visual",
    options: [
      { cn: "全身立绘", en: "Full-body Portrait" },
      { cn: "半身肖像", en: "Half-body Portrait" },
      { cn: "动态战斗姿势", en: "Dynamic Action Pose" },
      { cn: "背影回眸", en: "Back View Looking Back" }
    ]
  },
  grid_pose: { 
    label: { cn: "九宫格动作", en: "Grid Pose" }, 
    category: "action", 
    options: [
      { cn: "前景手指虚化", en: "Out-of-focus fingers in foreground" },
      { cn: "目光锁定镜头", en: "Eyes locked on camera" },
      { cn: "单色下巴托手", en: "Monochrome hand on chin" },
      { cn: "透过模糊肩带拍摄", en: "Shooting through blurred shoulder straps" },
      { cn: "正面特写阴影", en: "Frontal close-up with shadows" },
      { cn: "斜角拍摄", en: "Angled shot" },
      { cn: "双手置于锁骨", en: "Hands on collarbones" },
      { cn: "坐姿半身侧面", en: "Seated half-body profile" },
      { cn: "侧面微距水滴", en: "Side macro with water drops" },
      { cn: "闭眼仰头享受", en: "Eyes closed looking up in enjoyment" },
      { cn: "用手遮挡阳光", en: "Shading eyes from sun with hand" },
      { cn: "回眸一笑", en: "Looking back with a smile" },
      { cn: "吹泡泡糖特写", en: "Close-up blowing bubble gum" },
      { cn: "正面直视镜头，表情平静，眼神清澈", en: "Staring straight at the camera, calm expression, clear eyes" },
      { cn: "凝视镜头，嘴角微微上扬，展现自信", en: "Staring at the camera, slight smile, showing confidence" },
      { cn: "专注地看着镜头，表情柔和，眼神温和", en: "Looking intently at the camera, soft expression, gentle eyes" },
      { cn: "侧身回望，眼神温柔，嘴角上扬", en: "Side view looking back, gentle eyes, smiling" },
      { cn: "转身回眸，长发飘逸，笑容自然", en: "Turning back, flowing hair, natural smile" },
      { cn: "手轻抚下巴，表情优雅，眼神柔和", en: "Hand gently on chin, elegant expression, soft eyes" },
      { cn: "单手支撑下巴，表情自然，眼神专注", en: "Supporting chin with one hand, natural expression, focused eyes" },
      { cn: "利用肩带营造景深，焦点清晰在眼睛", en: "Using shoulder straps for depth of field, focus on eyes" },
      { cn: "正在吹泡泡糖，表情可爱，眼神专注", en: "Blowing bubble gum, cute expression, focused eyes" },
      { cn: "侧面微距特写，突出面部轮廓和细节", en: "Side macro close-up, highlighting facial contours and details" }
    ] 
  },
  
  camera_angle: {
    label: { cn: "拍摄角度", en: "Camera Angle" },
    category: "visual",
    options: [
      { cn: "脸颊和颈部特写", en: "Cheek and neck close-up" },
      { cn: "目光锁定镜头", en: "Eyes locked on camera" },
      { cn: "单色下巴托手肖像", en: "Monochrome hand on chin portrait" },
      { cn: "透过模糊的肩带拍摄", en: "Shooting through blurred shoulder straps" },
      { cn: "正面特写，面部阴影交错", en: "Frontal close-up, interlocking facial shadows" },
      { cn: "斜角拍摄的原始人像", en: "Raw portrait from an angle" },
      { cn: "双手置于锁骨附近的特写", en: "Close-up with hands near collarbones" },
      { cn: "坐姿半身侧面照", en: "Seated half-body profile shot" },
      { cn: "侧面微距照", en: "Side macro shot" }
    ]
  },
  connectors: {
    label: { cn: "视觉引导", en: "Connectors" },
    category: "visual",
    options: [
      { cn: "手绘箭头或引导线", en: "Hand-drawn arrows or guide lines" },
      { cn: "虚线连接", en: "Dashed line connections" },
      { cn: "彩色光束", en: "Colored light beams" },
      { cn: "半透明数据线", en: "Translucent data cables" }
    ]
  },
  underwear_style: {
    label: { cn: "私密内着拆解", en: "Underwear Style" },
    category: "item",
    options: [
      { cn: "成套的蕾丝内衣裤", en: "Matching lace lingerie set" },
      { cn: "运动风格纯棉内衣", en: "Athletic style cotton underwear" },
      { cn: "极简主义丝绸内衣", en: "Minimalist silk lingerie" },
      { cn: "哥特风格绑带内衣", en: "Gothic style strappy lingerie" }
    ]
  },
  clothing: {
    label: { cn: "人物服饰", en: "Clothing" },
    category: "item",
    options: [
      { cn: "炭灰色无袖连衣裙", en: "Charcoal grey sleeveless dress" },
      { cn: "白色丝绸衬衫", en: "White silk shirt" },
      { cn: "黑色修身西装", en: "Black slim-fit suit" },
      { cn: "战术机能风外套", en: "Tactical techwear jacket" },
      { cn: "复古碎花连衣裙", en: "Vintage floral print dress" }
    ]
  },
  clothing_male: {
    label: { cn: "男性服饰", en: "Male Clothing" },
    category: "item",
    options: [
      { cn: "剪裁合体的深蓝西装", en: "Tailored deep blue suit" },
      { cn: "复古棕色皮夹克", en: "Vintage brown leather jacket" },
      { cn: "战术背心与工装裤", en: "Tactical vest and cargo pants" },
      { cn: "宽松的灰色卫衣", en: "Loose grey hoodie" },
      { cn: "白色亚麻衬衫", en: "White linen shirt" },
      { cn: "黑色高领毛衣", en: "Black turtleneck sweater" }
    ]
  },
  clothing_female: {
    label: { cn: "女性服饰", en: "Female Clothing" },
    category: "item",
    options: [
      { cn: "炭灰色无袖连衣裙", en: "Charcoal grey sleeveless dress" },
      { cn: "丝绸吊带晚礼服", en: "Silk slip evening gown" },
      { cn: "机车皮衣与短裙", en: "Biker leather jacket and short skirt" },
      { cn: "白色蕾丝衬衫", en: "White lace blouse" },
      { cn: "黑色紧身连体衣", en: "Black tight bodysuit" },
      { cn: "优雅的香奈儿风套装", en: "Elegant Chanel-style suit" }
    ]
  },
  expressions: {
    label: { cn: "表情集", en: "Expressions" },
    category: "character",
    options: [
      { cn: "疯狂、病娇、狂喜", en: "Crazy, Yandere, Ecstatic" },
      { cn: "羞涩、躲闪、红晕", en: "Shy, Evasive, Blushing" },
      { cn: "冷漠、鄙视、高傲", en: "Indifferent, Contemptuous, Proud" },
      { cn: "痛苦、忍耐、咬唇", en: "Painful, Enduring, Biting lip" }
    ]
  },
  character_originality: {
    label: { cn: "人物原创性", en: "Character Originality" },
    category: "character",
    options: [
      { cn: "创作一个原创人物", en: "Create an original character" },
      { cn: "使用附图中的人物，确保结果与人物一致性", en: "Use character in attachment, ensure consistency" },
      { cn: "对知名角色再创作", en: "Re-create a well-known character" }
    ]
  },
  character_groups: {
    label: { cn: "人物组合", en: "Character Groups" },
    category: "character",
    options: [
      { cn: "中国古代开国皇帝", en: "Ancient Chinese Founding Emperors" },
      { cn: "漫威人物", en: "Marvel Characters" },
      { cn: "金庸古龙武侠人物", en: "Jin Yong & Gu Long Wuxia Characters" },
      { cn: "三国知名人物", en: "Famous Three Kingdoms Figures" },
      { cn: "知名军事家（拿破仑、凯撒、曹操等）", en: "Famous Military Strategists (Napoleon, Caesar, Cao Cao, etc.)" },
      { cn: "全球知名运动员", en: "World-famous Athletes" },
      { cn: "中外知名侦探（包青天、狄仁杰、福尔摩斯、柯南等）", en: "Famous Detectives (Bao Zheng, Di Renjie, Sherlock Holmes, Conan, etc.)" },
      { cn: "动漫游戏角色", en: "Anime & Game Characters" },
      { cn: "历史名人", en: "Historical Celebrities" },
      { cn: "明星艺人", en: "Stars & Celebrities" }
    ]
  },
  social_media: {
    label: { cn: "社交媒体", en: "Social Media" },
    category: "location",
    options: [
      { cn: "微信朋友圈", en: "WeChat Moments" },
      { cn: "微博", en: "Weibo" },
      { cn: "Twitter(X)", en: "Twitter(X)" },
      { cn: "小红书", en: "Little Red Book (Xiaohongshu)" },
      { cn: "Instagram", en: "Instagram" },
      { cn: "Facebook", en: "Facebook" },
      { cn: "抖音", en: "Douyin" },
      { cn: "TikTok", en: "TikTok" }
    ]
  },
  texture_zoom: {
    label: { cn: "材质特写", en: "Texture Zoom" },
    category: "visual",
    options: [
      { cn: "凌乱感与私处汗渍", en: "Messiness and sweat stains in private areas" },
      { cn: "皮肤上的勒痕与红印", en: "Strangulation marks and red imprints on skin" },
      { cn: "丝袜的抽丝细节", en: "Snagged details on silk stockings" },
      { cn: "皮革的光泽与磨损", en: "Luster and wear on leather" }
    ]
  },
  action_detail: {
    label: { cn: "动作细节", en: "Action Detail" },
    category: "action",
    options: [
      { cn: "带着项圈的爬行", en: "Crawling with a collar" },
      { cn: "双手被缚在身后的挣扎", en: "Struggling with hands bound behind back" },
      { cn: "跪姿并展示鞋底", en: "Kneeling and showing soles" },
      { cn: "拉扯领口的诱惑", en: "Temptation of pulling at the neckline" }
    ]
  },
  special_view: {
    label: { cn: "特殊视角", en: "Special View" },
    category: "visual",
    options: [
      { cn: "被踩在脚下的仰视视角", en: "Low-angle view from being stepped on" },
      { cn: "从门缝中偷窥的视角", en: "Perspective of peeking through a door crack" },
      { cn: "镜子反射的背影", en: "Back view reflected in a mirror" },
      { cn: "监控摄像头的俯视视角", en: "Top-down view from a security camera" }
    ]
  },
  bag_content: {
    label: { cn: "随身包袋", en: "Bag Content" },
    category: "item",
    options: [
      { cn: "日常通勤包或手拿包", en: "Daily commuter bag or clutch" },
      { cn: "战术腿包", en: "Tactical leg bag" },
      { cn: "可爱的毛绒背包", en: "Cute plush backpack" },
      { cn: "透明材质的痛包", en: "Ita-bag made of transparent material" }
    ]
  },
  cosmetics: {
    label: { cn: "美妆与护理", en: "Cosmetics" },
    category: "item",
    options: [
      { cn: "常用的化妆品组合", en: "Commonly used cosmetics combo" },
      { cn: "散落的口红与粉饼", en: "Scattered lipsticks and compact powder" },
      { cn: "便携式补妆镜", en: "Portable makeup mirror" },
      { cn: "香水小样与护手霜", en: "Perfume samples and hand cream" }
    ]
  },
  private_items: {
    label: { cn: "私密生活物件", en: "Private Items" },
    category: "item",
    options: [
      { cn: "震动棒与项圈", en: "Vibrator and collar" },
      { cn: "手铐与眼罩", en: "Handcuffs and eye mask" },
      { cn: "鞭子与蜡烛", en: "Whip and candle" },
      { cn: "润滑液与安全套", en: "Lubricant and condom" }
    ]
  },
  city_name: {
    label: { cn: "城市/国家", en: "City/Country" },
    category: "location",
    options: [
      { cn: "京都", en: "Kyoto" },
      { cn: "巴塞罗那", en: "Barcelona" },
      { cn: "墨西哥城", en: "Mexico City" },
      { cn: "圣彼得堡", en: "St. Petersburg" },
      { cn: "巴黎", en: "Paris" },
      { cn: "伦敦", en: "London" },
      { cn: "纽约", en: "New York" },
      { cn: "东京", en: "Tokyo" }
    ]
  },
  art_tool: {
    label: { cn: "绘画工具", en: "Art Tool" },
    category: "item",
    options: [
      { cn: "毛笔", en: "Ink Brush" },
      { cn: "画笔", en: "Paintbrush" },
      { cn: "调色刀", en: "Palette Knife" },
      { cn: "触控笔", en: "Stylus" },
      { cn: "传统和纸画笔", en: "Traditional Washi Brush" }
    ]
  },
  art_style: {
    label: { cn: "画风", en: "Art Style" },
    category: "visual",
    options: [
      { cn: "浮世绘 (Ukiyo-e)", en: "Ukiyo-e" },
      { cn: "毕加索立体主义 (Cubism)", en: "Cubism" },
      { cn: "弗里达超现实主义 (Surrealism)", en: "Surrealism" },
      { cn: "列宾现实主义 (Realism)", en: "Realism" },
      { cn: "高质量的 2D 插画风格", en: "High-quality 2D illustration style" },
      { cn: "写实厚涂风格", en: "Realistic impasto style" },
      { cn: "赛博朋克霓虹风格", en: "Cyberpunk neon style" },
      { cn: "水彩手绘风格", en: "Watercolor hand-drawn style" }
    ]
  },
  background_style: {
    label: { cn: "背景风格", en: "Background Style" },
    category: "visual",
    options: [
      { cn: "漫画网格笔记本", en: "Manga grid notebook" },
      { cn: "蓝图设计稿纸", en: "Blueprint design paper" },
      { cn: "工业风金属背景", en: "Industrial metal background" },
      { cn: "极简纯色背景", en: "Minimalist solid color background" }
    ]
  },
  classic_scene: {
    label: { cn: "经典场景", en: "Classic Scene" },
    category: "location",
    options: [
      { cn: "黑客帝国", en: "The Matrix" },
      { cn: "千与千寻", en: "Spirited Away" },
      { cn: "疯狂动物城（Zootopia）", en: "Zootopia" },
      { cn: "生活大爆炸", en: "The Big Bang Theory" },
      { cn: "霍格沃茨魔法学院", en: "Hogwarts School of Witchcraft and Wizardry" },
      { cn: "侏罗纪公园丛林入口", en: "Jurassic Park Jungle Entrance" },
      { cn: "星球大战塔图因集市", en: "Star Wars Tatooine Market" },
      { cn: "指环王夏尔", en: "The Lord of the Rings - The Shire" },
      { cn: "权力的游戏君临城城墙", en: "Game of Thrones - King's Landing Walls" },
      { cn: "盗梦空间折叠城市", en: "Inception - Folding City" },
      { cn: "赛博朋克霓虹夜市", en: "Cyberpunk Neon Night Market" },
      { cn: "未来城市空港枢纽", en: "Future City Spaceport Hub" }
    ]
  },
  position: {
    label: { cn: "文字位置", en: "Text Position" },
    category: "location",
    options: [
      { cn: "顶部中央", en: "Top Center" },
      { cn: "底部中央", en: "Bottom Center" },
      { cn: "左上角偏中", en: "Top Left biased center" },
      { cn: "右上角偏中", en: "Top Right biased center" },
      { cn: "画面中上方悬浮", en: "Floating in top middle" }
    ]
  },
  render_style: {
    label: { cn: "渲染风格", en: "Render Style" },
    category: "visual",
    options: [
      { cn: "Octane Render 和 Cinema 4D", en: "Octane Render and Cinema 4D" },
      { cn: "乐高积木风格", en: "LEGO Block Style" },
      { cn: "Unreal Engine 5 写实光追", en: "Unreal Engine 5 Realistic Ray Tracing" },
      { cn: "Pixar 卡通渲染", en: "Pixar Cartoon Rendering" },
      { cn: "黏土动画质感", en: "Claymation Texture" },
      { cn: "手办级实体渲染", en: "Figurine-level Physical Rendering" },
      { cn: "3D像素风格", en: "3D Pixel Art Style" },
      { cn: "手工毛线针织风格", en: "Hand-knitted Yarn Style" },
      { cn: "毛线针织", en: "Knitted Yarn" },
      { cn: "毛毡与粘土", en: "Felt and Clay" },
      { cn: "纸壳纸板", en: "Cardboard" }
    ]
  },
  show_name: {
    label: { cn: "剧名", en: "Show Name" },
    category: "other",
    options: [
      { cn: "泰坦尼克号", en: "Titanic" },
      { cn: "龙猫", en: "My Neighbor Totoro" },
      { cn: "哈利·波特", en: "Harry Potter" },
      { cn: "星际穿越", en: "Interstellar" },
      { cn: "千与千寻", en: "Spirited Away" },
      { cn: "复仇者联盟", en: "The Avengers" }
    ]
  },
  character_name: {
    label: { cn: "角色", en: "Character Name" },
    category: "character",
    options: [
      { cn: "Jack and Rose", en: "Jack and Rose" },
      { cn: "龙猫", en: "Totoro" },
      { cn: "哈利·波特", en: "Harry Potter" },
      { cn: "库珀", en: "Cooper" },
      { cn: "千寻", en: "Chihiro" },
      { cn: "绿巨人", en: "Hulk" },
      { cn: "萨诺斯", en: "Thanos" },
      { cn: "钢铁侠", en: "Iron Man" }
    ]
  },
  art_type: {
    label: { cn: "艺术门类", en: "Art Type" },
    category: "other",
    options: [
      { cn: "美术学", en: "Fine Arts" },
      { cn: "时尚学", en: "Fashion Studies" },
      { cn: "建筑学", en: "Architecture" },
      { cn: "摄影学", en: "Photography" },
      { cn: "雕塑艺术", en: "Sculpture Art" },
      { cn: "工业设计", en: "Industrial Design" }
    ]
  },
  company: {
    label: { cn: "公司", en: "Company" },
    category: "location",
    options: [
      { cn: "Apple", en: "Apple" },
      { cn: "任天堂（Nintendo）", en: "Nintendo" },
      { cn: "SONY", en: "SONY" },
      { cn: "宜家（IKEA）", en: "IKEA" }
    ]
  },
  dominant_colors: {
    label: { cn: "主色调", en: "Dominant Colors" },
    category: "visual",
    options: [
      { cn: "传统的京都红与古朴的墨黑色", en: "Traditional Kyoto red and antique ink black" },
      { cn: "地中海蓝与阳光金", en: "Mediterranean blue and sunny gold" },
      { cn: "鲜艳的仙人掌绿与深红色", en: "Vibrant cactus green and deep red" },
      { cn: "冷峻的极光蓝与雪白色", en: "Cool aurora blue and snow white" },
      { cn: "莫兰迪色系", en: "Morandi tones" },
      { cn: "高级灰与极简白", en: "High-end gray and minimalist white" }
    ]
  },
  background_color_clean: {
    label: { cn: "背景色", en: "Background Color" },
    category: "visual",
    options: [
      { cn: "纯白", en: "Pure White" },
      { cn: "明亮的天空蓝", en: "Bright Sky Blue" },
      { cn: "阳光般的浅黄色", en: "Sunny Light Yellow" },
      { cn: "清爽的薄荷绿", en: "Refreshing Mint Green" },
      { cn: "奶油色", en: "Cream Color" }
    ]
  },
  city_glimpse_subtitle: {
    label: { cn: "副标题内容", en: "Subtitle Content" },
    category: "other",
    options: [
      { cn: "古韵悠长的千年古都", en: "The thousand-year-old ancient capital" },
      { cn: "高迪的奇幻建筑之城", en: "Gaudí's city of fantastic architecture" },
      { cn: "色彩斑斓的艺术灵魂", en: "Vibrant soul of art" },
      { cn: "北方的威尼斯，艺术的殿堂", en: "Venice of the North, the temple of art" }
    ]
  },
  ratio: {
    label: { cn: "画幅比例", en: "Aspect Ratio" },
    category: "visual",
    options: [
      { cn: "3:4竖构图", en: "3:4 Vertical" },
      { cn: "9:16竖构图", en: "9:16 Vertical" },
      { cn: "1:1", en: "1:1 Square" },
      { cn: "4:3横构图", en: "4:3 Horizontal" },
      { cn: "16:9横构图", en: "16:9 Horizontal" },
      { cn: "圆形画幅", en: "Circular Aspect Ratio" }
    ]
  },
  // Fashion Template additions
  fashion_deconstruct: {
    label: { cn: "穿搭解构", en: "Fashion Deconstruct" },
    category: "item",
    options: [
      { cn: "整齐折叠的外套和精致的高跟鞋", en: "Neatly folded coat and exquisite high heels" },
      { cn: "散落的配饰与包包", en: "Scattered accessories and bags" },
      { cn: "悬挂的衬衫与百褶裙", en: "Hanging shirt and pleated skirt" },
      { cn: "堆叠的金属配饰与皮带", en: "Stacked metal accessories and belts" }
    ]
  },
  toy_companion: {
    label: { cn: "互动公仔", en: "Toy Companion" },
    category: "item",
    options: [
      { cn: "Labubu艺术公仔", en: "Labubu Art Toy" },
      { cn: "暴力熊积木熊", en: "Bearbrick" },
      { cn: "泡泡玛特Molly", en: "Pop Mart Molly" },
      { cn: "复古泰迪熊", en: "Vintage Teddy Bear" },
      { cn: "赛博朋克机械狗", en: "Cyberpunk Robo-Dog" }
    ]
  },
  
  // Old ones preserved for compatibility or other templates
  lens_param: {
    label: { cn: "九宫格镜头", en: "Lens Parameter" },
    category: "visual",
    options: [
      { cn: "85mm, f/1.8", en: "85mm, f/1.8" },
      { cn: "85mm, f/2.0", en: "85mm, f/2.0" },
      { cn: "50mm, f/2.2", en: "50mm, f/2.2" },
      { cn: "50mm, f/2.5", en: "50mm, f/2.5" },
      { cn: "50mm, f/3.2", en: "50mm, f/3.2" },
      { cn: "35mm, f/4.5", en: "35mm, f/4.5" },
      { cn: "85mm, f/1.9", en: "85mm, f/1.9" },
      { cn: "50mm, f/1.8", en: "50mm, f/1.8" },
      { cn: "85mm, f/2.2", en: "85mm, f/2.2" },
      { cn: "50mm, f/2.0", en: "50mm, f/2.0" }
    ]
  },
  lighting: {
    label: { cn: "灯光布置", en: "Lighting" },
    category: "visual",
    options: [
      { cn: "大型顶置柔光箱，轻微侧向反射光", en: "Large overhead softbox, slight side reflection" },
      { cn: "自然窗光", en: "Natural window light" },
      { cn: "伦勃朗光", en: "Rembrandt lighting" },
      { cn: "赛博朋克霓虹光", en: "Cyberpunk neon lighting" },
      { cn: "影棚硬光", en: "Studio hard light" }
    ]
  },
  sticker_core: {
    label: { cn: "核心贴纸", en: "Sticker Core" },
    category: "item",
    options: [
      { cn: "用户穿着甜美约会装的照片", en: "Photo of user in a sweet date outfit" },
      { cn: "复古摇滚乐队T恤穿搭", en: "Vintage rock band T-shirt outfit" },
      { cn: "日系JK制服穿搭", en: "Japanese JK uniform outfit" },
      { cn: "极简职场通勤装", en: "Minimalist office commuter outfit" }
    ]
  },
  sticker_decor: {
    label: { cn: "装饰元素", en: "Sticker Decor" },
    category: "item",
    options: [
      { cn: "手绘爱心、闪光符号", en: "Hand-drawn hearts, sparkle symbols" },
      { cn: "星星、月亮贴纸", en: "Star and moon stickers" },
      { cn: "复古邮票与票据", en: "Vintage stamps and bills" },
      { cn: "赛博故障风Glitch元素", en: "Cyberpunk glitch elements" }
    ]
  },
  action_pose: {
    label: { cn: "互动姿势", en: "Action Pose" },
    category: "action",
    options: [
      { cn: "用手指在男人脑后比划'兔耳朵'", en: "Using fingers to make 'bunny ears' behind the man's head" },
      { cn: "勾肩搭背比V字手势", en: "Arm around shoulder making V sign" },
      { cn: "互相指着对方大笑", en: "Pointing at each other and laughing" },
      { cn: "背靠背酷炫站姿", en: "Cool back-to-back standing pose" }
    ]
  },
  background_scene: {
    label: { cn: "背景场景", en: "Background Scene" },
    category: "location",
    options: [
      { cn: "俯瞰纽约市的复仇者大厦楼顶", en: "Rooftop of Avengers Tower overlooking New York City" },
      { cn: "废弃的工业仓库", en: "Abandoned industrial warehouse" },
      { cn: "熙熙攘攘的时代广场", en: "Bustling Times Square" },
      { cn: "外太空飞船内部", en: "Inside a space-age spaceship" }
    ]
  },

  // Fish Eye Urban Template additions
  lens_type: {
    label: { cn: "镜头类型", en: "Lens Type" },
    category: "visual",
    options: [
      { cn: "标准镜头", en: "Standard Lens" },
      { cn: "广角镜头", en: "Wide-angle Lens" },
      { cn: "长焦镜头", en: "Telephoto Lens" },
      { cn: "极端鱼眼镜头", en: "Extreme Fisheye Lens" },
      { cn: "移轴镜头", en: "Tilt-shift Lens" },
      { cn: "微距镜头", en: "Macro Lens" }
    ]
  },
  school_uniform: {
    label: { cn: "校服样式", en: "School Uniform" },
    category: "item",
    options: [
      { cn: "传统水手服校服", en: "Traditional Sailor Uniform" },
      { cn: "灰色开衫和格子裙校服", en: "Grey cardigan and plaid skirt uniform" },
      { cn: "英伦风百褶裙校服", en: "British style pleated skirt uniform" },
      { cn: "日系JK制服", en: "Japanese JK Uniform" },
      { cn: "运动校服", en: "Tracksuit School Uniform" },
      { cn: "冬季大衣校服", en: "Winter coat school uniform" }
    ]
  },
  urban_location: {
    label: { cn: "城市地点", en: "Urban Location" },
    category: "location",
    options: [
      { cn: "涩谷十字路口", en: "Shibuya Crossing" },
      { cn: "东京塔下", en: "Under Tokyo Tower" },
      { cn: "时代广场", en: "Times Square" },
      { cn: "埃菲尔铁塔旁", en: "By the Eiffel Tower" },
      { cn: "中央公园", en: "Central Park" },
      { cn: "北京王府井", en: "Beijing Wangfujing" },
      { cn: "上海外滩", en: "Shanghai Bund" },
      { cn: "香港维多利亚港", en: "Hong Kong Victoria Harbour" }
    ]
  },
  dynamic_action: {
    label: { cn: "动态动作", en: "Dynamic Action" },
    category: "action",
    options: [
      { cn: "一只手夸张地伸向镜头前景", en: "One hand exaggeratedly reaching towards the foreground" },
      { cn: "双臂张开拥抱天空", en: "Arms open wide embracing the sky" },
      { cn: "旋转跳跃", en: "Spinning and jumping" },
      { cn: "奔跑前进", en: "Running forward" },
      { cn: "蹲下捡拾", en: "Squatting down to pick up" },
      { cn: "挥手致意", en: "Waving greeting" },
      { cn: "舞蹈姿势", en: "Dance pose" },
      { cn: "比心手势", en: "Heart gesture" }
    ]
  },
  action_status: {
    label: { cn: "行为状态", en: "Action Status" },
    category: "action",
    options: [
      { cn: "玩PS5", en: "playing PS5" },
      { cn: "弹吉他", en: "playing the guitar" },
      { cn: "在电脑前写代码", en: "coding in front of a computer" },
      { cn: "拿着香蕉在画画", en: "painting with a banana" },
      { cn: "穿潜水脚蹼", en: "putting on diving fins" },
      { cn: "正在调酒", en: "mixing a cocktail" },
      { cn: "在看一本厚厚的旧书", en: "reading a thick old book" },
      { cn: "在修剪巨大的室内绿植", en: "trimming a giant indoor plant" }
    ]
  },
  fingernail_detail: {
    label: { cn: "手指甲细节", en: "Fingernail Detail" },
    category: "visual",
    options: [
      { cn: "手指甲清晰可见", en: "Fingernails clearly visible" },
      { cn: "涂有鲜艳指甲油", en: "Coated with bright nail polish" },
      { cn: "自然裸色指甲", en: "Natural nude nails" },
      { cn: "装饰有钻石指甲", en: "Decorated with diamond nails" },
      { cn: "渐变色指甲", en: "Gradient nails" },
      { cn: "艺术图案指甲", en: "Artistic pattern nails" }
    ]
  },
  building_cluster: {
    label: { cn: "建筑群", en: "Building Cluster" },
    category: "location",
    options: [
      { cn: "扭曲的涩谷109大楼和其他建筑林立", en: "Distorted Shibuya 109 building and other forest of buildings" },
      { cn: "纽约摩天大楼群", en: "New York skyscraper cluster" },
      { cn: "巴黎古典建筑", en: "Parisian classical architecture" },
      { cn: "上海现代高层建筑", en: "Shanghai modern high-rise buildings" },
      { cn: "东京传统寺庙与现代建筑混合", en: "Mix of traditional Tokyo temples and modern architecture" },
      { cn: "伦敦金融城高楼", en: "City of London high-rises" }
    ]
  },
  monster_element: {
    label: { cn: "怪兽元素", en: "Monster Element" },
    category: "character",
    options: [
      { cn: "巨大的粉色和蓝色渐变卡通怪兽", en: "Giant pink and blue gradient cartoon monster" },
      { cn: "机械机器人怪兽", en: "Mecha robot monster" },
      { cn: "神话传说中的龙", en: "Legendary dragon" },
      { cn: "外星生物", en: "Alien creature" },
      { cn: "海洋深渊巨兽", en: "Deep sea behemoth" },
      { cn: "森林精灵", en: "Forest elf" }
    ]
  },
  monster_feature: {
    label: { cn: "怪兽特征", en: "Monster Feature" },
    category: "character",
    options: [
      { cn: "巨大的触手和角", en: "Giant tentacles and horns" },
      { cn: "锋利的爪子和牙齿", en: "Sharp claws and teeth" },
      { cn: "多彩的翅膀", en: "Colorful wings" },
      { cn: "发光的眼睛", en: "Glowing eyes" },
      { cn: "金属外壳", en: "Metal shell" },
      { cn: "藤蔓植物", en: "Vining plants" }
    ]
  },
  distorted_city: {
    label: { cn: "扭曲城市", en: "Distorted City" },
    category: "location",
    options: [
      { cn: "扭曲的城市景观", en: "Distorted urban landscape" },
      { cn: "镜面反射的城市", en: "Specularly reflected city" },
      { cn: "梦幻泡泡中的城市", en: "City inside dream bubbles" },
      { cn: "像素化的城市", en: "Pixelated city" },
      { cn: "水墨画风格的城市", en: "Ink-wash style city" },
      { cn: "未来科幻城市", en: "Future sci-fi city" }
    ]
  },
  lighting_atmosphere: {
    label: { cn: "灯光氛围", en: "Lighting Atmosphere" },
    category: "visual",
    options: [
      { cn: "阳光明媚", en: "Sunny" },
      { cn: "月光皎洁", en: "Bright moonlight" },
      { cn: "霓虹灯闪烁", en: "Flickering neon lights" },
      { cn: "烛光摇曳", en: "Flickering candlelight" },
      { cn: "舞台聚光灯", en: "Stage spotlights" },
      { cn: "自然晨光", en: "Natural morning light" },
      { cn: "夕阳余晖", en: "Sunset afterglow" },
      { cn: "室内暖光", en: "Indoor warm light" }
    ]
  },
  shadow_contrast: {
    label: { cn: "阴影对比", en: "Shadow Contrast" },
    category: "visual",
    options: [
      { cn: "光影对比强烈", en: "Strong light-shadow contrast" },
      { cn: "柔和的阴影", en: "Soft shadows" },
      { cn: "戏剧性阴影", en: "Dramatic shadows" },
      { cn: "无阴影平光", en: "No-shadow flat lighting" },
      { cn: "轮廓光", en: "Rim lighting" },
      { cn: "背光剪影", en: "Backlit silhouette" }
    ]
  },
  travel_location: {
    label: { cn: "旅游地点", en: "Travel Location" },
    category: "location",
    options: [
      { cn: "西藏拉萨布达拉宫", en: "Potala Palace, Lhasa, Tibet" },
      { cn: "湖南林中小寨", en: "Forest Village in Hunan" },
      { cn: "东北雪乡", en: "Snow Village in Northeast China" },
      { cn: "老北京胡同", en: "Old Beijing Hutongs" },
      { cn: "云南大理洱海", en: "Erhai Lake, Dali, Yunnan" },
      { cn: "新疆喀纳斯湖", en: "Kanas Lake, Xinjiang" },
      { cn: "四川九寨沟", en: "Jiuzhaigou, Sichuan" },
      { cn: "桂林漓江", en: "Li River, Guilin" },
      { cn: "张家界天门山", en: "Tianmen Mountain, Zhangjiajie" },
      { cn: "敦煌莫高窟", en: "Mogao Grottoes, Dunhuang" },
      { cn: "内蒙古呼伦贝尔草原", en: "Hulunbuir Grassland, Inner Mongolia" },
      { cn: "台湾日月潭", en: "Sun Moon Lake, Taiwan" }
    ]
  },
  comic_scene: {
    label: { cn: "漫画场景", en: "Comic Scene" },
    category: "location",
    options: [
      { cn: "唯美的卧室", en: "Beautiful bedroom" },
      { cn: "繁华的街头", en: "Busy street" },
      { cn: "温馨的教室", en: "Cozy classroom" },
      { cn: "现代咖啡厅", en: "Modern cafe" },
      { cn: "公园长椅", en: "Park bench" },
      { cn: "图书馆角落", en: "Library corner" },
      { cn: "艺术工作室", en: "Art studio" },
      { cn: "屋顶天台", en: "Rooftop" },
      { cn: "火车站月台", en: "Railway platform" },
      { cn: "书店一角", en: "Bookstore corner" }
    ]
  },
  designer: {
    label: { cn: "设计师", en: "Designer" },
    category: "character",
    options: [
      { cn: "安东尼·高迪 (Antoni Gaudí)", en: "Antoni Gaudí" },
      { cn: "Jonathan Ive (Jony Ive)", en: "Jonathan Ive" },
      { cn: "Gio Ponti", en: "Gio Ponti" },
      { cn: "迪特·拉姆斯 (Dieter Rams)", en: "Dieter Rams" },
      { cn: "菲利普·斯塔克 (Philippe Starck)", en: "Philippe Starck" },
      { cn: "原研哉 (Kenya Hara)", en: "Kenya Hara" },
      { cn: "深泽直人 (Naoto Fukasawa)", en: "Naoto Fukasawa" },
      { cn: "扎哈·哈迪德 (Zaha Hadid)", en: "Zaha Hadid" },
      { cn: "马克·纽森 (Marc Newson)", en: "Marc Newson" },
      { cn: "汤姆·迪克森 (Tom Dixon)", en: "Tom Dixon" },
      { cn: "贾斯珀·莫里森 (Jasper Morrison)", en: "Jasper Morrison" },
      { cn: "康斯坦丁·葛切奇 (Konstantin Grcic)", en: "Konstantin Grcic" }
    ]
  },
  design_item: {
    label: { cn: "设计物品", en: "Design Item" },
    category: "item",
    options: [
      { cn: "无人机", en: "Drone" },
      { cn: "台球桌", en: "Pool table" },
      { cn: "拖拉机", en: "Tractor" },
      { cn: "机械键盘", en: "Mechanical keyboard" },
      { cn: "复古打字机", en: "Vintage typewriter" },
      { cn: "单反相机", en: "DSLR camera" },
      { cn: "扫地机器人", en: "Robot vacuum" },
      { cn: "咖啡机", en: "Coffee machine" },
      { cn: "台灯", en: "Desk lamp" },
      { cn: "椅子", en: "Chair" },
      { cn: "音响系统", en: "Sound system" },
      { cn: "手表", en: "Watch" },
      { cn: "自行车", en: "Bicycle" },
      { cn: "电动滑板车", en: "Electric scooter" },
      { cn: "蓝牙耳机", en: "Bluetooth headphones" },
      { cn: "智能音箱", en: "Smart speaker" },
      { cn: "剃须刀", en: "Razor" },
      { cn: "电风扇", en: "Electric fan" },
      { cn: "水壶", en: "Kettle" }
    ]
  },
  rain_shape: {
    label: { cn: "雨水形象", en: "Rain Shape" },
    category: "visual",
    options: [
      { cn: "芭蕾舞者", en: "Ballerina" },
      { cn: "飞舞的蝴蝶", en: "Flying butterfly" },
      { cn: "奔跑的骏马", en: "Running steed" },
      { cn: "绽放的莲花", en: "Blooming lotus" },
      { cn: "轻盈的羽毛", en: "Light feather" },
      { cn: "灵动的音符", en: "Lively musical note" }
    ]
  },
  fruit: {
    label: { cn: "水果", en: "Fruit" },
    category: "item",
    options: [
      { cn: "猕猴桃", en: "Kiwi" },
      { cn: "橙子", en: "Orange" },
      { cn: "苹果", en: "Apple" },
      { cn: "草莓", en: "Strawberry" },
      { cn: "柠檬", en: "Lemon" },
      { cn: "葡萄", en: "Grape" },
      { cn: "芒果", en: "Mango" },
      { cn: "椰子", en: "Coconut" }
    ]
  },
  xmas_theme: {
    label: { cn: "圣诞主题", en: "Christmas Theme" },
    category: "other",
    options: [
      { cn: "抽象圣诞树", en: "an abstract Christmas Tree" },
      { cn: "圣诞雪花", en: "Christmas snowflake" },
      { cn: "驯鹿与森林", en: "Reindeer and forest" },
      { cn: "圣诞装饰球", en: "Christmas ornaments" },
      { cn: "圣诞姜饼屋", en: "Christmas gingerbread house" }
    ]
  },
  jewelry_style: {
    label: { cn: "珠宝样式", en: "Jewelry Style" },
    category: "item",
    options: [
      { cn: "精美的金色背链", en: "Fine gold back necklace" },
      { cn: "简约银色链条", en: "Minimalist silver chain" },
      { cn: "珍珠身体链", en: "Pearl body chain" },
      { cn: "钻石露背项链", en: "Diamond back drop necklace" },
      { cn: "祖母绿吊坠背链", en: "Emerald pendant back necklace" }
    ]
  },
  flower_type: {
    label: { cn: "花卉品种", en: "Flower Type" },
    category: "item",
    options: [
      { cn: "一束深红色玫瑰", en: "A bouquet of deep red roses" },
      { cn: "优雅的白色马蹄莲", en: "Elegant white calla lilies" },
      { cn: "淡粉色牡丹", en: "Pale pink peonies" },
      { cn: "名贵的深色兰花", en: "Exotic dark orchids" },
      { cn: "干枯的桉树叶", en: "Dried eucalyptus leaves" },
      { cn: "鲜艳的向日葵", en: "Vibrant sunflowers" }
    ]
  },
  character_type_pixar: {
    label: { cn: "角色模式", en: "Character Mode" },
    category: "character",
    options: [
      { cn: "单人角色：聚焦于个人生活方式", en: "Single: Focus on personal lifestyle" },
      { cn: "情侣角色：每人18件物品，用爱心符号连接，冷暖对比", en: "Couple: 18 items each, heart connectors, contrast" },
      { cn: "孕妇角色：包含孕期用品、婴儿图标及B超照片", en: "Pregnant: Includes pregnancy items, baby icons, ultrasound" },
      { cn: "亲子角色：包含成人与儿童用品，体现家庭温馨", en: "Family: Includes adult and child items, family warmth" }
    ]
  },
  theme_pixar: {
    label: { cn: "配色主题", en: "Theme & Color" },
    category: "visual",
    options: [
      { cn: "女性/时尚主题：香槟金、玫瑰金、奶油色、樱花粉", en: "Female/Fashion: Champagne Gold, Rose Gold, Cream, Cherry Pink" },
      { cn: "男性/科技主题：钢蓝色、深灰色、电光蓝、银色", en: "Male/Tech: Steel Blue, Dark Grey, Electric Blue, Silver" },
      { cn: "正式/奢华主题：纯黑、24K金、深红色、象牙白", en: "Formal/Luxury: Pure Black, 24K Gold, Deep Red, Ivory White" },
      { cn: "情侣/对比主题：冷暖色调对比", en: "Couple/Contrast: Contrast of warm and cool tones" }
    ]
  },
  item_layout_pixar: {
    label: { cn: "物品布局", en: "Item Layout" },
    category: "visual",
    options: [
      { cn: "90度直角整齐排列 (Knolling)", en: "90-degree Knolling layout" },
      { cn: "放射式构图 (Radial)", en: "Radial composition" },
      { cn: "阶梯式错落布局 (Step)", en: "Step-like staggered layout" },
      { cn: "网格对称布局 (Grid)", en: "Grid symmetrical layout" }
    ]
  },
  fashion_parts: {
    label: { cn: "时尚穿搭拆解", en: "Fashion Deconstruction" },
    category: "item",
    options: [
      { cn: "风衣拆解：翻领、肩章、腰带、袖口束带、主衣身", en: "Trench coat: Lapel, epaulets, belt, cuffs, main body" },
      { cn: "西装拆解：驳领、口袋、内衬、袖扣、垫肩", en: "Suit: Lapel, pockets, lining, cufflinks, shoulder pads" },
      { cn: "运动鞋拆解：鞋底、鞋面、鞋带、气垫、鞋垫", en: "Sneakers: Sole, upper, laces, air cushion, insole" },
      { cn: "连衣裙拆解：蕾丝边、拉链、腰部剪裁、裙摆、领口", en: "Dress: Lace trim, zipper, waist cut, hem, neckline" },
      { cn: "包袋拆解：五金锁扣、肩带、内袋、缝线细节、手柄", en: "Bag: Metal lock, strap, inner pocket, stitching, handle" }
    ]
  },
  beauty_items: {
    label: { cn: "美妆个护拆解", en: "Beauty Deconstruction" },
    category: "item",
    options: [
      { cn: "彩妆：口红（带切面）、眼影盘、粉饼、腮红刷", en: "Makeup: Lipstick (cut), eyeshadow palette, compact, blush brush" },
      { cn: "护肤：精华液瓶、面霜罐、美容仪、面膜", en: "Skincare: Serum bottle, cream jar, beauty device, mask" },
      { cn: "香氛：香水瓶（带液体折射）、香薰蜡烛、扩香器", en: "Fragrance: Perfume bottle (refraction), scented candle, diffuser" },
      { cn: "洗护：洗面奶、爽肤水、卸妆油、洁面仪", en: "Cleansing: Cleanser, toner, cleansing oil, facial device" }
    ]
  },
  digital_items: {
    label: { cn: "数码生活拆解", en: "Digital Deconstruction" },
    category: "item",
    options: [
      { cn: "手机拆解：手机壳、屏幕内容、摄像头模组、主板组件", en: "Phone: Case, screen content, camera module, motherboard" },
      { cn: "相机拆解：镜头组、机身、闪光灯、存储卡、肩带", en: "Camera: Lens set, body, flash, memory card, strap" },
      { cn: "影音：无线耳机、智能手表、平板电脑、蓝牙音箱", en: "Audio: Wireless headphones, smartwatch, tablet, speaker" },
      { cn: "办公：笔记本电脑、键盘轴体、鼠标、手绘板", en: "Office: Laptop, keyboard switches, mouse, drawing tablet" }
    ]
  },
  luxury_hobby_items: {
    label: { cn: "个人爱好/奢华", en: "Hobby & Luxury" },
    category: "item",
    options: [
      { cn: "珠宝：项链、耳环、戒指（宝石带色散效果）", en: "Jewelry: Necklace, earrings, ring (gemstone dispersion)" },
      { cn: "艺术：画笔、调色盘、素描本、颜料软管", en: "Art: Brushes, palette, sketchbook, paint tubes" },
      { cn: "生活：咖啡机、磨豆机、高档手办组件、限量书籍", en: "Life: Coffee machine, grinder, high-end figure parts, limited books" },
      { cn: "运动：网球拍、滑板、滑雪镜、运动相机、水壶", en: "Sports: Tennis racket, skateboard, ski goggles, action cam, bottle" }
    ]
  }
};

export const INITIAL_DEFAULTS = {
  role: { cn: "游戏与动漫概念美术设计大师", en: "Master of Game and Anime Concept Art" },
  subject: { cn: "女性角色", en: "Female Character" },
  character_companion: { cn: "死侍 (Deadpool)", en: "Deadpool" },
  layout_focus: { cn: "全身立绘", en: "Full-body Portrait" },
  camera_angle: { cn: "脸颊和颈部特写", en: "Cheek and neck close-up" },
  connectors: { cn: "手绘箭头或引导线", en: "Hand-drawn arrows or guide lines" },
  underwear_style: { cn: "成套的蕾丝内衣裤", en: "Matching lace lingerie set" },
  clothing: { cn: "炭灰色无袖连衣裙", en: "Charcoal grey sleeveless dress" },
  clothing_male: { cn: "剪裁合体的深蓝西装", en: "Tailored deep blue suit" },
  clothing_female: { cn: "炭灰色无袖连衣裙", en: "Charcoal grey sleeveless dress" },
  expressions: { cn: "疯狂、病娇、狂喜", en: "Crazy, Yandere, Ecstatic" },
  character_originality: { cn: "创作一个原创人物", en: "Create an original character" },
  character_groups: { cn: "中外知名侦探（包青天、狄仁杰、福尔摩斯、柯南等）", en: "Famous Detectives (Bao Zheng, Di Renjie, Sherlock Holmes, Conan, etc.)" },
  social_media: { cn: "微信朋友圈", en: "WeChat Moments" },
  texture_zoom: { cn: "凌乱感与私处汗渍", en: "Messiness and sweat stains in private areas" },
  action_detail: { cn: "带着项圈的爬行", en: "Crawling with a collar" },
  special_view: { cn: "被踩在脚下的仰视视角", en: "Low-angle view from being stepped on" },
  bag_content: { cn: "日常通勤包或手拿包", en: "Daily commuter bag or clutch" },
  cosmetics: { cn: "常用的化妆品组合", en: "Commonly used cosmetics combo" },
  private_items: { cn: "震动棒与项圈", en: "Vibrator and collar" },
  art_style: { cn: "高质量的 2D 插画风格", en: "High-quality 2D illustration style" },
  background_style: { cn: "漫画网格笔记本", en: "Manga grid notebook" },
  fashion_deconstruct: { cn: "整齐折叠的外套和精致的高跟鞋", en: "Neatly folded coat and exquisite high heels" },
  toy_companion: { cn: "Labubu艺术公仔", en: "Labubu Art Toy" },
  classic_scene: { cn: "黑客帝国", en: "The Matrix" },
  render_style: { cn: "Octane Render 和 Cinema 4D", en: "Octane Render and Cinema 4D" },
  position: { cn: "顶部中央", en: "Top Center" },
  company: { cn: "任天堂（Nintendo）", en: "Nintendo" },
  ratio: { cn: "3:4竖构图", en: "3:4 Vertical" },
  
  // Grid defaults
  grid_pose: { cn: "前景手指虚化", en: "Out-of-focus fingers in foreground" },
  
  // Legacy defaults
  lens_param: { cn: "85mm, f/1.8", en: "85mm, f/1.8" },
  lighting: { cn: "大型顶置柔光箱，轻微侧向反射光", en: "Large overhead softbox, slight side reflection" },
  sticker_core: { cn: "用户穿着甜美约会装的照片", en: "Photo of user in a sweet date outfit" },
  sticker_decor: { cn: "手绘爱心、闪光符号", en: "Hand-drawn hearts, sparkle symbols" },
  action_pose: { cn: "用手指在男人脑后比划'兔耳朵'", en: "Using fingers to make 'bunny ears' behind the man's head" },
  background_scene: { cn: "俯瞰纽约市的复仇者大厦楼顶", en: "Rooftop of Avengers Tower overlooking New York City" },
  
  // Fish Eye Urban defaults
  lens_type: { cn: "极端鱼眼镜头", en: "Extreme Fisheye Lens" },
  school_uniform: { cn: "灰色开衫和格子裙校服", en: "Grey cardigan and plaid skirt uniform" },
  urban_location: { cn: "涩谷十字路口", en: "Shibuya Crossing" },
  dynamic_action: { cn: "一只手夸张地伸向镜头前景", en: "One hand exaggeratedly reaching towards the foreground" },
  fingernail_detail: { cn: "手指甲清晰可见", en: "Fingernails clearly visible" },
  building_cluster: { cn: "扭曲的涩谷109大楼和其他建筑林立", en: "Distorted Shibuya 109 building and other forest of buildings" },
  crowd_traffic: { cn: "挤满行人和车辆", en: "Bustling traffic" },
  monster_element: { cn: "巨大的粉色和蓝色渐变卡通怪兽", en: "Giant pink and blue gradient cartoon monster" },
  monster_feature: { cn: "巨大的触手和角", en: "Giant tentacles and horns" },
  distorted_city: { cn: "扭曲的城市景观", en: "Distorted urban landscape" },
  lighting_atmosphere: { cn: "阳光明媚", en: "Sunny" },
  shadow_contrast: { cn: "光影对比强烈", en: "Strong light-shadow contrast" },
  travel_location: { cn: "西藏拉萨布达拉宫", en: "Potala Palace, Lhasa, Tibet" },
  comic_scene: { cn: "唯美的卧室", en: "Beautiful bedroom" },
  designer: { cn: "Jonathan Ive (Jony Ive)", en: "Jonathan Ive" },
  design_item: { cn: "无人机", en: "Drone" },
  rain_shape: { cn: "芭蕾舞者", en: "Ballerina" },
  art_type: { cn: "美术学", en: "Fine Arts" },
  show_name: { cn: "龙猫", en: "My Neighbor Totoro" },
  character_name: { cn: "龙猫", en: "Totoro" },
  fruit: { cn: "柠檬", en: "Lemon" },
  xmas_theme: { cn: "抽象圣诞树", en: "an abstract Christmas Tree" },
  jewelry_style: { cn: "精美的金色背链", en: "Fine gold back necklace" },
  flower_type: { cn: "一束深红色玫瑰", en: "A bouquet of deep red roses" },
  character_type_pixar: { cn: "单人角色：聚焦于个人生活方式", en: "Single: Focus on personal lifestyle" },
  theme_pixar: { cn: "女性/时尚主题：香槟金、玫瑰金、奶油色、樱花粉", en: "Female/Fashion: Champagne Gold, Rose Gold, Cream, Cherry Pink" },
  item_layout_pixar: { cn: "90度直角整齐排列 (Knolling)", en: "90-degree Knolling layout" },
  fashion_parts: { cn: "风衣拆解：翻领、肩章、腰带、袖口束带、主衣身", en: "Trench coat: Lapel, epaulets, belt, cuffs, main body" },
  beauty_items: { cn: "彩妆：口红（带切面）、眼影盘、粉饼、腮红刷", en: "Makeup: Lipstick (cut), eyeshadow palette, compact, blush brush" },
  digital_items: { cn: "手机拆解：手机壳、屏幕内容、摄像头模组、主板组件", en: "Phone: Case, screen content, camera module, motherboard" },
  luxury_hobby_items: { cn: "珠宝：项链、耳环、戒指（宝石带色散效果）", en: "Jewelry: Necklace, earrings, ring (gemstone dispersion)" },
  city_name: { cn: "京都", en: "Kyoto" },
  art_tool: { cn: "毛笔", en: "Ink Brush" },
  dominant_colors: { cn: "传统的京都红与古朴的墨黑色", en: "Traditional Kyoto red and antique ink black" },
  background_color_clean: { cn: "纯白", en: "Pure White" },
  city_glimpse_subtitle: { cn: "古韵悠长的千年古都", en: "The thousand-year-old ancient capital" },
  action_status: { cn: "玩PS5", en: "playing PS5" }
};
