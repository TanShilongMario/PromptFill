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
{
  "cn": "现代地铁车厢",
  "en": "a modern subway carriage"
},
      { cn: "游戏与动漫概念美术设计大师", en: "Master of Game and Anime Concept Art" },
      { cn: "资深影视角色原画师", en: "Senior Film Character Concept Artist" },
      { cn: "赛博朋克风格设计师", en: "Cyberpunk Style Designer" },
      { cn: "暗黑幻想风格插画师", en: "Dark Fantasy Style Illustrator" },
      { cn: "美术摄影与电影写实风格", en: "Fine-art photography blended with cinematic realism" }
    ]
  },
  subject: {
    label: { cn: "主体对象", en: "Subject" },
    category: "character",
    options: [
{
  "cn": "年轻男子",
  "en": "young man"
},
      { cn: "女性角色", en: "Female Character" },
      { cn: "男性角色", en: "Male Character" },
      { cn: "机甲少女", en: "Mecha Girl" },
      { cn: "怪物拟人化", en: "Monster Anthropomorphism" },
      { cn: "奇幻种族(精灵/恶魔)", en: "Fantasy Race (Elf/Demon)" },
      { cn: "女性，约20岁", en: "Female, around 20 years old" },
      { cn: "年轻韩国女团偶像", en: "Young Korean female K-pop idol" }
    ]
  },
  hair_style: {
    label: { cn: "发型样式", en: "Hair Style" },
    category: "character",
    options: [
{
  "cn": "银白长发",
  "en": "long silver-white hair"
},
{
  "cn": "辫子",
  "en": "braided hair"
},
{
  "cn": "短棕发",
  "en": "short brown hair"
},
{
  "cn": "波浪状金发",
  "en": "wavy blonde hair"
},
{
  "cn": "丰盈的浅棕色长发",
  "en": "long, voluminous curly light-brown hair"
},
{
  "cn": "湿漉漉的深色卷发",
  "en": "wet, curly dark hair"
},
{
  "cn": "深色直发",
  "en": "straight dark hair"
},
{
  "cn": "丝绸柔顺发",
  "en": "silk press"
},
{
  "cn": "长长的微乱黑发",
  "en": "long slightly messy dark hair"
},
{
  "cn": "双马尾",
  "en": "twin tails"
},
{
  "cn": "柔和短波波头短发造型",
  "en": "soft, short wavy bob haircut"
},
{
  "cn": "长发",
  "en": "long hair"
},
      { cn: "短发，柔和凌乱的深色头发", en: "Short, softly tousled dark hair" },
      { cn: "深色波浪长发", en: "Dark wavy long hair" },
      { cn: "黑色直发，垂在肩上", en: "Black straight hair, falling over shoulders" },
      { cn: "浅金色卷发", en: "Light blonde curly hair" },
      { cn: "高马尾辫", en: "High ponytail" }
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
      { cn: "侧面微距照", en: "Side macro shot" },
      { cn: "上半身特写", en: "upper-body close-up" },
      { cn: "平视、略微隐藏的中景镜头", en: "eye-level, slightly hidden intimate medium shot" },
      { cn: "腰部以上的美术肖像", en: "Waist-up fine-art portrait" }
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
    label: { cn: "时尚内着设计", en: "Innerwear Style" },
    category: "item",
    options: [
      { cn: "简约舒适棉质内衣", en: "Simple and comfortable cotton innerwear" },
      { cn: "运动风格透气内衣", en: "Athletic style breathable innerwear" },
      { cn: "极简主义无痕内衣", en: "Minimalist seamless innerwear" },
      { cn: "时尚剪裁内搭", en: "Fashionable cut inner layers" },
      { cn: "“纯美风”服饰", en: "'pure-aesthetic' outfit style" }
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
      { cn: "复古碎花连衣裙", en: "Vintage floral print dress" },
      { cn: "略显成熟的“大姐姐”时尚风格", en: "Slightly mature 'onee-san' fashion style" },
      { cn: "柔和青色复古碎花连衣裙", en: "Muted teal floral dress with subtle vintage patterns" }
    ]
  },
  accessory_glasses: {
    label: { cn: "眼镜配饰", en: "Glasses" },
    category: "item",
    options: [
{
  "cn": "复古圆框眼镜",
  "en": "Vintage round glasses"
},
{
  "cn": "圆形蓝色反光太阳镜",
  "en": "round blue reflective sunglasses"
},
{
  "cn": "黑色方形眼镜",
  "en": "black rectangular glasses"
},
      { cn: "戴着有轻微镜面反射的眼镜", en: "wearing glasses with mild lens reflections" },
      { cn: "戴着时尚的太阳镜", en: "wearing stylish sunglasses" },
      { cn: "戴着黑框近视眼镜", en: "wearing black-rimmed glasses" },
      { cn: "不戴眼镜", en: "no glasses" }
    ]
  },
  clothing_male: {
    label: { cn: "男性服饰", en: "Male Clothing" },
    category: "item",
    options: [
{
  "cn": "黑色T恤与白色长袖内搭",
  "en": "a black T-shirt over a white long-sleeve shirt"
},
{
  "cn": "天蓝色针织毛衣与米色工装裤",
  "en": "a sky-blue knit sweater and beige cargo trousers"
},
{
  "cn": "黑色西装外套内搭白色T恤",
  "en": "a black blazer over a white t-shirt"
},
{
  "cn": "深色纹理高领毛衣和牛仔裤",
  "en": "a dark textured turtleneck sweater and jeans"
},
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
{
  "cn": "酒红色粗针织毛衣",
  "en": "a burgundy chunky-knit sweater"
},
{
  "cn": "红色长风衣",
  "en": "a long red trench coat"
},
{
  "cn": "短款棕色麂皮夹克",
  "en": "cropped brown suede jacket"
},
{
  "cn": "合身的黑色长袖短款上衣",
  "en": "a fitted black long-sleeve crop top"
},
{
  "cn": "淡紫色连衣裙",
  "en": "pale lilac dress"
},
{
  "cn": "超大号白色纽扣衬衫",
  "en": "oversized white button-up shirt"
},
{
  "cn": "简约、修身的白色长袖服装",
  "en": "simple, form-fitting white long-sleeve outfit"
},
      { cn: "炭灰色无袖连衣裙", en: "Charcoal grey sleeveless dress" },
      { cn: "丝绸吊带晚礼服", en: "Silk slip evening gown" },
      { cn: "机车皮衣与短裙", en: "Biker leather jacket and short skirt" },
      { cn: "白色蕾丝衬衫", en: "White lace blouse" },
      { cn: "黑色紧身连体衣", en: "Black tight bodysuit" },
      { cn: "优雅的香奈儿风套装", en: "Elegant Chanel-style suit" },
      { cn: "半脱的灰色大号连帽衫，露出白色吊带", en: "half-removed oversized grey hoodie, revealing white camisole" }
    ]
  },
  expressions: {
    label: { cn: "表情集", en: "Expressions" },
    category: "character",
    options: [
{
  "cn": "神情坚定",
  "en": "a determined expression"
},
{
  "cn": "快乐、自信的表情",
  "en": "a joyful, confident expression"
},
{
  "cn": "平静，略显疏离",
  "en": "calm, slightly distant"
},
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
      { cn: "丝滑感", en: "Silkiness" },
      { cn: "精细的皮肤纹理", en: "Fine skin texture" },
      { cn: "丝袜的抽丝细节", en: "Snagged details on silk stockings" },
      { cn: "皮革的光泽与磨损", en: "Luster and wear on leather" }
    ]
  },
  action_detail: {
    label: { cn: "动作细节", en: "Action Detail" },
    category: "action",
    options: [
      { cn: "优雅的行走姿态", en: "Elegant walking posture" },
      { cn: "自信的站立", en: "Confident standing" },
      { cn: "开怀大笑", en: "Laughing out loud" },
      { cn: "专注的眼神", en: "Focused gaze" }
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
{
  "cn": "黑色皮革手袋",
  "en": "a black leather handbag"
},
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
    label: { cn: "品质生活好物", en: "Quality Life Items" },
    category: "item",
    options: [
      { cn: "香薰加湿器", en: "Aroma Diffuser" },
      { cn: "降噪耳机", en: "Noise-cancelling Headphones" },
      { cn: "复古黑胶唱片机", en: "Vintage Vinyl Player" },
      { cn: "智能运动手表", en: "Smart Sports Watch" }
    ]
  },
  city_name: {
    label: { cn: "城市/国家", en: "City/Country" },
    category: "location",
    options: [
      { cn: "里约热内卢", en: "Rio de Janeiro" },
      { cn: "广州", en: "Guangzhou" },
      { cn: "上海", en: "Shanghai" },
      { cn: "北京", en: "Beijing" },
      { cn: "深圳", en: "Shenzhen" },
      { cn: "杭州", en: "Hangzhou" },
      { cn: "成都", en: "Chengdu" },
      { cn: "西安", en: "Xi'an" },
      { cn: "重庆", en: "Chongqing" },
      { cn: "南京", en: "Nanjing" },
      { cn: "苏州", en: "Suzhou" },
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
{
  "cn": "丝网印刷质感",
  "en": "screen print texture"
},
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
{
  "cn": "Bichon Shop",
  "en": "Bichon Shop"
},
{
  "cn": "Chronicle",
  "en": "Chronicle"
},
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
{
  "cn": "孙悟空",
  "en": "Sun Wukong"
},
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
{
  "cn": "NUBELLA",
  "en": "NUBELLA"
},
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
{
  "cn": "彩虹般的蓝色、光芒四射的红色、金黄色和柔和的白色",
  "en": "iridescent blues, radiant reds, golden yellows, and soft whites"
},
{
  "cn": "橙色",
  "en": "orange"
},
{
  "cn": "中国红、青蓝、鎏金",
  "en": "Chinese red, cyan blue, and gilded gold"
},
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
{
  "cn": "纯绿色背景",
  "en": "a pure green background"
},
{
  "cn": "纯白色背景",
  "en": "A pure white background"
},
{
  "cn": "干净的白色背景",
  "en": "clean white background"
},
{
  "cn": "暖芥末黄",
  "en": "warm mustard yellow"
},
{
  "cn": "纯净黑色背景",
  "en": "Pure black background"
},
{
  "cn": "白色背景",
  "en": "white background"
},
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
      { cn: "圆形画幅", en: "Circular Aspect Ratio" },
      { cn: "2:3竖构图", en: "2:3 Vertical" }
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
{
  "cn": "85mm",
  "en": "85mm"
},
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
      { cn: "影棚硬光", en: "Studio hard light" },
      { cn: "随意的肖像摄影，带有日常快照氛围", en: "Casual portrait photography with a daily snapshot vibe" },
      { cn: "隐藏相机拍摄风格，Portra 400 胶片质感", en: "Hidden camera style, Portra 400 film grain aesthetic" },
      { cn: "阴天下的柔和自然光", en: "Soft natural light under overcast sky" }
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
      { cn: "外太空飞船内部", en: "Inside a space-age spaceship" },
      { cn: "昏暗、平凡的房间，身后有一面素墙", en: "Dark, ordinary room with a plain wall behind the subject" },
      { cn: "昏暗舒适的后台更衣室或私密宿舍", en: "dimly lit, cozy backstage dressing room or private dorm room" },
      { cn: "盛开的郁郁葱葱的花园", en: "Lush garden in full bloom" }
    ]
  },

  // 视频分镜-影视色调
  video_color_tone: {
    label: { cn: "影视色调", en: "Cinematic Color Tone" },
    category: "visual",
    options: [
      { cn: "冷蓝调，暗部发青（如《银翼杀手2049》）", en: "Cool blue tones, teal shadows (Blade Runner 2049 style)" },
      { cn: "暖橙调，黄金时刻质感（如《疯狂的麦克斯》）", en: "Warm orange tones, golden hour feel (Mad Max: Fury Road style)" },
      { cn: "高对比青橙撞色（Teal & Orange）", en: "High-contrast teal and orange color grading" },
      { cn: "低饱和灰绿调，胶片颗粒感（如《拯救大兵瑞恩》）", en: "Desaturated olive-green tones, film grain (Saving Private Ryan style)" },
      { cn: "霓虹紫粉调，高饱和赛博感", en: "Neon purple-pink, high-saturation cyberpunk feel" },
      { cn: "黑白高反差，黑色电影风格（Film Noir）", en: "High-contrast black and white, Film Noir style" },
      { cn: "莫兰迪低饱和柔和调", en: "Morandi muted pastel tones" },
      { cn: "日系清透过曝暖调", en: "Japanese overexposed warm pastel tones" }
    ]
  },

  // 视频分镜-影视风格
  video_art_style: {
    label: { cn: "影视风格", en: "Cinematic Style" },
    category: "visual",
    options: [
      { cn: "好莱坞大片质感（高成本电影感）", en: "Hollywood blockbuster cinematic quality" },
      { cn: "独立电影纪实风格（手持、自然光）", en: "Indie film documentary style (handheld, natural lighting)" },
      { cn: "日本动画电影风格（如新海诚）", en: "Japanese anime film style (Makoto Shinkai)" },
      { cn: "港片黄金时代（暗色、霓虹、快节奏）", en: "Hong Kong golden era (dark, neon, fast-paced)" },
      { cn: "韩式影视风格（高级感、低饱和）", en: "Korean drama cinematic style (premium, desaturated)" },
      { cn: "复古录像带 VHS 风格", en: "Retro VHS tape aesthetic" },
      { cn: "MV 风格（快速剪辑、视觉冲击）", en: "Music video style (fast cuts, visual impact)" },
      { cn: "游戏 CG 过场动画风格", en: "Game CG cutscene style" }
    ]
  },

  // 视频分镜-场景类型
  scene_type: {
    label: { cn: "场景类型", en: "Scene Type" },
    category: "location",
    options: [
      { cn: "古代酒馆内部，烛光摇曳", en: "Ancient tavern interior, candlelight flickering" },
      { cn: "未来都市霓虹街巷", en: "Futuristic neon-lit urban alley" },
      { cn: "雪山之巅，云海翻涌", en: "Snow-capped mountain peak, sea of clouds" },
      { cn: "废弃太空站走廊，红灯闪烁", en: "Abandoned space station corridor, red lights flashing" },
      { cn: "深夜雨中的日本街道", en: "Rainy Japanese street at night" },
      { cn: "战场废墟，硝烟弥漫", en: "Battlefield ruins, smoke-filled" },
      { cn: "热带雨林深处，瀑布飞流", en: "Deep tropical rainforest, cascading waterfall" },
      { cn: "赛博朋克地下酒吧", en: "Cyberpunk underground bar" }
    ]
  },

  // Fish Eye Urban Template additions
  lens_type: {
    label: { cn: "镜头类型", en: "Lens Type" },
    category: "visual",
    options: [
{
  "cn": "低角度广角镜头",
  "en": "low-angle wide-angle shot"
},
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
{
  "cn": "喧嚣的城市街头",
  "en": "a bustling city street"
},
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
      { cn: "在修剪巨大的室内绿植", en: "trimming a giant indoor plant" },
      { cn: "正在阅读书籍", en: "reading a book" },
      { cn: "整理衣领时自信地看向镜头", en: "looking confidently into the lens while adjusting collar" },
      { cn: "温柔地凝视着镜头，带着淡淡的忧郁", en: "Looking gently toward the camera, with a touch of melancholy" }
    ]
  },
  draw_style: {
    label: { cn: "绘画风格", en: "Drawing Style" },
    category: "visual",
    options: [
{
  "cn": "水粉与蜡笔混合笔触",
  "en": "mixed gouache and wax-crayon strokes"
},
      { cn: "手绘漫画风格", en: "Hand-drawn Manga Style" },
      { cn: "Disney手绘草稿风格", en: "Disney Hand-drawn Sketch Style" },
      { cn: "吉卜力手绘风格", en: "Ghibli Hand-drawn Style" },
      { cn: "美式漫画风格", en: "American Comic Style" }
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
{
  "cn": "穷奇",
  "en": "Qiongqi"
},
{
  "cn": "巨龙",
  "en": "dragon"
},
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
{
  "cn": "卡帕多奇亚石谷",
  "en": "Cappadocia rock valleys"
},
{
  "cn": "城市咖啡馆",
  "en": "an urban café"
},
{
  "cn": "主题乐园商业街",
  "en": "a theme-park shopping street"
},
{
  "cn": "热带海岛",
  "en": "a tropical island"
},
{
  "cn": "阳光山城",
  "en": "a sunny hillside town"
},
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
{
  "cn": "芒果",
  "en": "mango"
},
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
{
  "cn": "极简珠宝",
  "en": "minimal jewelry"
},
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
      { cn: "鲜艳的向日葵", en: "Vibrant sunflowers" },
      { cn: "白色和淡桃色花瓣在空中飘落", en: "White and pale peach flower petals drifting through the air" }
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
{
  "cn": "围巾、手袋、衬衫和半裙",
  "en": "a scarf, handbag, shirt and skirt"
},
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
{
  "cn": "银色笔记本电脑",
  "en": "a silver laptop"
},
      { cn: "手机拆解：手机壳、屏幕内容、摄像头模组、主板组件", en: "Phone: Case, screen content, camera module, motherboard" },
      { cn: "相机拆解：镜头组、机身、闪光灯、存储卡、肩带", en: "Camera: Lens set, body, flash, memory card, strap" },
      { cn: "影音：无线耳机、智能手表、平板电脑、蓝牙音箱", en: "Audio: Wireless headphones, smartwatch, tablet, speaker" },
      { cn: "办公：笔记本电脑、键盘轴体、鼠标、手绘板", en: "Office: Laptop, keyboard switches, mouse, drawing tablet" }
    ]
  },
  underwater_color: {
    label: { cn: "水下色调", en: "Underwater Color" },
    category: "location",
    options: [
      { cn: "深青色透明水下", en: "deep teal transparent underwater" },
      { cn: "晶莹剔透的浅蓝色", en: "crystal clear light blue" },
      { cn: "神秘的深海蓝", en: "mysterious deep sea blue" },
      { cn: "梦幻的翡翠绿", en: "dreamy emerald green" }
    ]
  },
  creatures: {
    label: { cn: "伴随生物", en: "Creatures" },
    category: "character",
    options: [
{
  "cn": "大王具足虫",
  "en": "a giant isopod"
},
{
  "cn": "大口黑鲈",
  "en": "a largemouth bass"
},
      { cn: "许多银色小鱼", en: "many small silver fish" },
      { cn: "发光的水母", en: "glowing jellyfish" },
      { cn: "五彩斑斓的热带鱼", en: "colorful tropical fish" },
      { cn: "巨大的蓝鲸(背景)", en: "a giant blue whale in the background" }
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
  },
  // 新年海报相关词库
  clothing_style_chinese: {
    label: { cn: "中式服饰风格", en: "Chinese Clothing Style" },
    category: "item",
    options: [
      { cn: "传统暗红色中式长袍", en: "Traditional dark red Chinese robe" },
      { cn: "古典红色汉服", en: "Classical red Hanfu" },
      { cn: "传统金色龙袍", en: "Traditional golden dragon robe" },
      { cn: "深紫色唐装", en: "Deep purple Tang suit" },
      { cn: "宝蓝色旗袍", en: "Sapphire blue Qipao" },
      { cn: "墨绿色传统长衫", en: "Dark green traditional long gown" },
      { cn: "朱红色将军战袍", en: "Vermilion general's battle robe" },
      { cn: "紫金色锦缎华服", en: "Purple-gold brocade noble attire" }
    ]
  },
  clothing_color_traditional: {
    label: { cn: "传统服装颜色", en: "Traditional Clothing Color" },
    category: "visual",
    options: [
{
  "cn": "淡冰蓝色",
  "en": "pale ice blue"
},
      { cn: "暗红色", en: "Dark Red" },
      { cn: "朱红色", en: "Vermilion" },
      { cn: "宝蓝色", en: "Sapphire Blue" },
      { cn: "金黄色", en: "Golden Yellow" },
      { cn: "紫金色", en: "Purple Gold" },
      { cn: "墨绿色", en: "Dark Green" },
      { cn: "深紫色", en: "Deep Purple" },
      { cn: "玄黑色", en: "Mystic Black" }
    ]
  },
  year_number: {
    label: { cn: "年份", en: "Year" },
    category: "other",
    options: [
      { cn: "2025", en: "2025" },
      { cn: "2026", en: "2026" },
      { cn: "2027", en: "2027" },
      { cn: "2028", en: "2028" },
      { cn: "2029", en: "2029" },
      { cn: "2030", en: "2030" }
    ]
  },
  greeting_new_year: {
    label: { cn: "新年祝福语", en: "New Year Greeting" },
    category: "other",
    options: [
      { cn: "马到成功", en: "Immediate Success" },
      { cn: "龙马精神", en: "Vigorous Spirit" },
      { cn: "马不停蹄", en: "Unremitting Efforts" },
      { cn: "一马当先", en: "Take the Lead" },
      { cn: "龙腾虎跃", en: "Dragon Soaring and Tiger Leaping" },
      { cn: "新年快乐", en: "Happy New Year" },
      { cn: "万事如意", en: "May All Go Well" },
      { cn: "恭喜发财", en: "Wishing You Prosperity" }
    ]
  },
  background_color_festive: {
    label: { cn: "节日背景颜色", en: "Festive Background Color" },
    category: "visual",
    options: [
      { cn: "红色背景", en: "Red background" },
      { cn: "金色背景", en: "Gold background" },
      { cn: "红金渐变背景", en: "Red-gold gradient background" },
      { cn: "深红背景", en: "Deep red background" },
      { cn: "朱红背景", en: "Vermilion background" },
      { cn: "暖橙红背景", en: "Warm orange-red background" }
    ]
  },
  // 社交媒体背景颜色（用于社交卡片模板）
  social_bg_color: {
    label: { cn: "社交媒体背景色", en: "Social Media Background Color" },
    category: "visual",
    options: [
      { cn: "粉色和勃艮第红", en: "pink and burgundy" },
      { cn: "薄荷绿和珊瑚色", en: "mint green and coral" },
      { cn: "淡紫色和薰衣草色", en: "lavender and lilac" },
      { cn: "天蓝色和白色", en: "sky blue and white" },
      { cn: "金色和奶油色", en: "gold and cream" },
      { cn: "黑色和霓虹粉", en: "black and neon pink" },
      { cn: "橙色和青色渐变", en: "orange and cyan gradient" },
      { cn: "绿色和黄色搭配", en: "green and yellow combo" },
      { cn: "蓝色和紫色混搭", en: "blue and purple mix" },
      { cn: "红色和金色搭配", en: "red and gold combo" }
    ]
  },
  // 社交媒体用户名（用于社交卡片模板）
  social_profile_name: {
    label: { cn: "社交媒体用户名", en: "Social Media Profile Name" },
    category: "other",
    options: [
      { cn: "@RealMe+", en: "@RealMe+" },
      { cn: "@PromptFill", en: "@PromptFill" },
      { cn: "@CreativeAI", en: "@CreativeAI" },
      { cn: "@ArtLover", en: "@ArtLover" },
      { cn: "@DesignPro", en: "@DesignPro" },
      { cn: "@VisualArtist", en: "@VisualArtist" },
      { cn: "@PhotoMaster", en: "@PhotoMaster" },
      { cn: "@StudioX", en: "@StudioX" },
      { cn: "@CreativeMind", en: "@CreativeMind" },
      { cn: "@DigitalCreator", en: "@DigitalCreator" }
    ]
  },
  // 人物类型（用于社交卡片模板）
  character_type: {
    label: { cn: "人物类型", en: "Character Type" },
    category: "character",
    options: [
      { cn: "女性", en: "woman" },
      { cn: "男性", en: "man" },
      { cn: "女孩", en: "girl" },
      { cn: "男孩", en: "boy" },
      { cn: "少女", en: "teenage girl" },
      { cn: "少年", en: "teenage boy" },
      { cn: "儿童", en: "child" },
      { cn: "婴儿", en: "baby" },
      { cn: "老人", en: "elderly person" },
      { cn: "年轻人", en: "young person" }
    ]
  },
  // 装扮材质（用于地铁玩偶装扮模板）
  costume_material: {
    label: { cn: "装扮材质", en: "Costume Material" },
    category: "item",
    options: [
{
  "cn": "粗麻布",
  "en": "coarse linen"
},
      { cn: "羊毛", en: "wool" },
      { cn: "毛绒", en: "plush" },
      { cn: "棉质", en: "cotton" },
      { cn: "丝绸", en: "silk" },
      { cn: "天鹅绒", en: "velvet" },
      { cn: "人造毛皮", en: "faux fur" },
      { cn: "缎面", en: "satin" },
      { cn: "牛仔布", en: "denim" },
      { cn: "针织面料", en: "knit fabric" },
      { cn: "亚麻", en: "linen" }
    ]
  },
  // 地铁装扮类型（用于地铁玩偶装扮模板）
  subway_costume: {
    label: { cn: "地铁装扮类型", en: "Subway Costume Type" },
    category: "character",
    options: [
      { cn: "粉色羊毛兔子装扮", en: "Pink wool rabbit costume" },
      { cn: "黄色小鸡装扮", en: "Yellow chick costume" },
      { cn: "棕色泰迪熊装扮", en: "Brown teddy bear costume" },
      { cn: "白色熊猫装扮", en: "White panda costume" },
      { cn: "橙色狐狸装扮", en: "Orange fox costume" },
      { cn: "灰色猫咪装扮", en: "Grey cat costume" },
      { cn: "蓝色河马装扮", en: "Blue hippo costume" },
      { cn: "绿色恐龙装扮", en: "Green dinosaur costume" },
      { cn: "紫色独角兽装扮", en: "Purple unicorn costume" },
      { cn: "彩虹色小马装扮", en: "Rainbow pony costume" }
    ]
  },
  // 车厢类型（用于地铁玩偶装扮模板）
  location: {
    label: { cn: "车厢类型", en: "Carriage Type" },
    category: "location",
    options: [
      { cn: "日本地铁", en: "Japanese subway" },
      { cn: "韩国地铁", en: "Korean subway" },
      { cn: "北京地铁", en: "Beijing subway" },
      { cn: "上海地铁", en: "Shanghai subway" },
      { cn: "伦敦地铁", en: "London Underground" },
      { cn: "纽约地铁", en: "New York subway" },
      { cn: "巴黎地铁", en: "Paris Metro" },
      { cn: "轻轨车厢", en: "Light rail carriage" },
      { cn: "高铁车厢", en: "High-speed rail carriage" },
      { cn: "普通列车车厢", en: "Regular train carriage" }
    ]
  },
  // 头饰配饰（用于地铁玩偶装扮模板）
  accessory: {
    label: { cn: "头饰配饰", en: "Head Accessory" },
    category: "item",
    options: [
{
  "cn": "小花束",
  "en": "a small bouquet"
},
      { cn: "粉色花朵发夹", en: "pink flower hair clip" },
      { cn: "蓝色蝴蝶结", en: "blue butterfly bow" },
      { cn: "红色发带", en: "red hair band" },
      { cn: "小皇冠", en: "small crown" },
      { cn: "猫咪耳朵", en: "cat ears" },
      { cn: "兔耳朵", en: "rabbit ears" },
      { cn: "发箍", en: "headband" },
      { cn: "鸭舌帽", en: "baseball cap" },
      { cn: "针织帽", en: "beanie hat" },
      { cn: "耳机", en: "headphones" }
    ]
  },
  character_heroic: {
    label: { cn: "人物类型", en: "Character Type" },
    category: "character",
    options: [
      { cn: "年轻学生", en: "Young Student" },
      { cn: "都市白领", en: "Urban Professional" },
      { cn: "文艺青年", en: "Artistic Youth" },
      { cn: "普通上班族", en: "Office Worker" },
      { cn: "威武将军", en: "Mighty General" },
      { cn: "英勇武者", en: "Brave Warrior" },
      { cn: "传奇英雄", en: "Legendary Hero" },
      { cn: "武侠高手", en: "Martial Arts Master" }
    ]
  },
  room_style_cute: {
    label: { cn: "可爱房间风格", en: "Cute Room Style" },
    category: "location",
    options: [
{
  "cn": "温馨游戏房",
  "en": "a cozy gaming room"
},
      { cn: "可爱粉色房间，粉彩床和墙壁，原创动物玩偶，妖精灯光，可爱海报，毛绒地毯", en: "Cute pink room, pastel pink bed and walls, original cute animal plushies, fairy lights, cute posters, fluffy rug" },
      { cn: "简约白色房间，白色家具，绿植，自然光，木质地板", en: "Minimalist white room, white furniture, plants, natural light, wooden floor" },
      { cn: "复古粉色房间，复古家具，丝绒窗帘，古典装饰，温暖氛围", en: "Vintage pink room, vintage furniture, velvet curtains, classic decor, warm atmosphere" },
      { cn: "梦幻紫色房间，紫色床单，星星灯串，梦幻壁纸，柔软地毯", en: "Dreamy purple room, purple sheets, star lights, dreamy wallpaper, soft carpet" },
      { cn: "清新蓝色房间，蓝色床品，海洋装饰，贝壳元素，清爽感觉", en: "Fresh blue room, blue bedding, ocean decor, shell elements, refreshing feel" },
      { cn: "温暖橙色房间，橙色家具，阳光充足，活力装饰，舒适地毯", en: "Warm orange room, orange furniture, abundant sunlight, energetic decor, cozy rug" },
      { cn: "北欧风格房间，灰色床品，简约设计，自然材质，柔和灯光", en: "Nordic style room, grey bedding, minimalist design, natural materials, soft lighting" },
      { cn: "日式和风房间，榻榻米，纸灯笼，竹子装饰，禅意氛围", en: "Japanese style room, tatami, paper lanterns, bamboo decor, zen atmosphere" }
    ]
  },
  cute_outfit: {
    label: { cn: "可爱服装", en: "Cute Outfit" },
    category: "item",
    options: [
{
  "cn": "粉色偶像裙",
  "en": "a pink idol dress"
},
{
  "cn": "黄色针织背心",
  "en": "a yellow knitted vest"
},
      { cn: "黑色紧身吊带连衣裙，长度到臀部，无袖，细肩带", en: "Black tight camisole dress, hip-length, sleeveless, thin straps" },
      { cn: "白色蕾丝连衣裙，及膝长度，短袖，优雅设计", en: "White lace dress, knee-length, short sleeves, elegant design" },
      { cn: "粉色学院风制服，百褶裙，领结，长袖衬衫", en: "Pink school uniform, pleated skirt, bow tie, long-sleeved shirt" },
      { cn: "蓝色吊带裙，A字型，及膝长度，夏天风格", en: "Blue spaghetti strap dress, A-line, knee-length, summer style" },
      { cn: "红色紧身连衣裙，高领，长袖，修身设计", en: "Red tight dress, high neck, long sleeves, slim-fit design" },
      { cn: "黄色背带裤裙，可爱风格，短款，休闲设计", en: "Yellow overall dress, cute style, short length, casual design" },
      { cn: "紫色睡裙，丝绸材质，吊带，舒适款", en: "Purple nightgown, silk material, spaghetti straps, comfortable style" },
      { cn: "格子图案连衣裙，英伦风格，及膝，长袖", en: "Plaid dress, British style, knee-length, long sleeves" }
    ]
  },
  product_category: {
    label: { cn: "产品类别", en: "Product Category" },
    category: "item",
    options: [
      { cn: "现代椅子", en: "Modern Chair" },
      { cn: "智能手表", en: "Smart Watch" },
      { cn: "高端耳机", en: "Premium Headphones" },
      { cn: "设计师台灯", en: "Designer Lamp" },
      { cn: "陶瓷器皿", en: "Ceramic Ware" },
      { cn: "玻璃花瓶", en: "Glass Vase" },
      { cn: "皮革包袋", en: "Leather Bag" },
      { cn: "便携音箱", en: "Portable Speaker" }
    ]
  },
  // 饮料产品专用词库
  drink_product: {
    label: { cn: "饮料产品", en: "Drink Product" },
    category: "item",
    options: [
{
  "cn": "冰抹茶拿铁",
  "en": "an iced matcha latte"
},
{
  "cn": "一瓶玻璃瓶装汽水",
  "en": "a glass bottle of soda"
},
      { cn: "芬达软饮料罐", en: "Fanta softdrink can" },
      { cn: "可口可乐罐", en: "Coca-Cola can" },
      { cn: "百事可乐罐", en: "Pepsi cola can" },
      { cn: "雪碧汽水罐", en: "Sprite soda can" },
      { cn: "红牛能量饮料罐", en: "Red Bull energy drink can" },
      { cn: "啤酒罐", en: "Beer can" },
      { cn: "橙汁瓶", en: "Orange juice bottle" },
      { cn: "运动饮料瓶", en: "Sports drink bottle" }
    ]
  },
  drink_action: {
    label: { cn: "饮料动态", en: "Drink Action" },
    category: "action",
    options: [
      { cn: "爆炸，橙子从罐中涌出", en: "exploding with oranges bursting from the can" },
      { cn: "喷溅，水珠四处飞散", en: "splashing with water droplets flying everywhere" },
      { cn: "溢出，液体从罐口流下", en: "overflowing with liquid pouring from the rim" },
      { cn: "旋转，形成漩涡效果", en: "spinning creating a swirling vortex effect" },
      { cn: "静止摆放，表面凝结水珠", en: "stationary with condensation droplets on surface" },
      { cn: "被打开，罐盖飞起", en: "being opened with tab flying off" },
      { cn: "被挤压，变形扭曲", en: "being crushed and deformed" },
      { cn: "悬浮在空中，周围有气泡", en: "floating in air surrounded by bubbles" }
    ]
  },
  drink_background: {
    label: { cn: "饮料拍摄背景", en: "Drink Photography Background" },
    category: "visual",
    options: [
      { cn: "橙色背景", en: "orange background" },
      { cn: "蓝色背景", en: "blue background" },
      { cn: "红色背景", en: "red background" },
      { cn: "渐变橙色背景", en: "gradient orange background" },
      { cn: "渐变蓝绿色背景", en: "gradient teal background" },
      { cn: "纯白色背景", en: "pure white background" },
      { cn: "纯黑色背景", en: "pure black background" },
      { cn: "模糊的城市背景", en: "blurred city background" }
    ]
  },
  drink_camera_angle: {
    label: { cn: "饮料拍摄角度", en: "Drink Camera Angle" },
    category: "visual",
    options: [
      { cn: "高角度俯拍橙汁旋转形成的圆弧", en: "high angle overhead shot capturing the swirling arc of orange juice" },
      { cn: "低角度英雄镜头", en: "low angle heroic shot" },
      { cn: "平视正面镜头", en: "eye-level front shot" },
      { cn: "侧面45度镜头", en: "45-degree side angle shot" },
      { cn: "微距特写镜头", en: "macro close-up shot" },
      { cn: "鸟瞰俯视镜头", en: "bird's eye overhead shot" }
    ]
  },
  // 护肤品广告专用词库
  skincare_product: {
    label: { cn: "护肤品产品", en: "Skincare Product" },
    category: "item",
    options: [
      { cn: "精华滴管瓶", en: "serum dropper bottle" },
      { cn: "面霜罐", en: "cream jar" },
      { cn: "化妆水瓶", en: "toner bottle" },
      { cn: "安瓶", en: "ampoule" },
      { cn: "精华液瓶", en: "essence bottle" },
      { cn: "眼霜罐", en: "eye cream jar" },
      { cn: "防晒霜瓶", en: "sunscreen bottle" },
      { cn: "身体乳瓶", en: "body lotion bottle" }
    ]
  },
  skincare_color: {
    label: { cn: "护肤品颜色", en: "Skincare Product Color" },
    category: "visual",
    options: [
      { cn: "粉桃色", en: "pink-peach colored" },
      { cn: "淡粉色", en: "light pink colored" },
      { cn: "透明金色", en: "transparent golden colored" },
      { cn: "淡紫色", en: "light lavender colored" },
      { cn: "薄荷绿色", en: "mint green colored" },
      { cn: "透明无色", en: "clear transparent colored" },
      { cn: "玫瑰粉色", en: "rose pink colored" },
      { cn: "琥珀色", en: "amber colored" }
    ]
  },
  fantasy_character_pose: {
    label: { cn: "奇幻人物姿态", en: "Fantasy Character Pose" },
    category: "action",
    options: [
      { cn: "坐在瓶盖上", en: "sitting on the bottle cap" },
      { cn: "漂浮在瓶身旁边", en: "floating beside the bottle" },
      { cn: "倚靠在瓶身上", en: "leaning against the bottle" },
      { cn: "站在瓶盖边缘", en: "standing on the edge of the cap" },
      { cn: "躺在瓶身上", en: "lying on top of the bottle" },
      { cn: "围绕瓶子飞舞", en: "dancing around the bottle" },
      { cn: "坐在漂浮的水果上", en: "sitting on floating fruits" },
      { cn: "悬停在瓶子上方", en: "hovering above the bottle" }
    ]
  },
  fantasy_floating_elements: {
    label: { cn: "奇幻漂浮元素", en: "Fantasy Floating Elements" },
    category: "item",
    options: [
      { cn: "成熟桃子和桃子切片", en: "ripe peaches and peach slices" },
      { cn: "玫瑰花瓣和花蕾", en: "rose petals and buds" },
      { cn: "闪亮泡泡和星星", en: "sparkling bubbles and stars" },
      { cn: "羽毛和丝绸飘带", en: "feathers and silk ribbons" },
      { cn: "水果切片和浆果", en: "fruit slices and berries" },
      { cn: "水珠和冰晶", en: "water droplets and ice crystals" },
      { cn: "发光光点和火花", en: "glowing light dots and sparkles" },
      { cn: "云朵和彩虹碎片", en: "clouds and rainbow fragments" }
    ]
  },
  fantasy_sky_background: {
    label: { cn: "奇幻天空背景", en: "Fantasy Sky Background" },
    category: "location",
    options: [
      { cn: "明亮清澈的蓝天", en: "bright clear blue sky" },
      { cn: "柔和粉色日落天空", en: "soft pink sunset sky" },
      { cn: "梦幻紫色星空", en: "dreamy purple starry sky" },
      { cn: "温暖金色日出天空", en: "warm golden sunrise sky" },
      { cn: "柔和云层天空", en: "soft cloudy sky" },
      { cn: "渐变橙粉色天空", en: "gradient orange-pink sky" },
      { cn: "雾蒙蒙的晨空", en: "misty morning sky" },
      { cn: "绚丽极光天空", en: "colorful aurora sky" }
    ]
  },
  pastel_color_palette: {
    label: { cn: "粉彩色调搭配", en: "Pastel Color Palette" },
    category: "visual",
    options: [
      { cn: "粉桃色和天蓝色", en: "pastel peach and sky blue" },
      { cn: "淡紫色和粉色", en: "lavender and pink" },
      { cn: "薄荷绿和黄色", en: "mint green and yellow" },
      { cn: "玫瑰色和金色", en: "rose and gold" },
      { cn: "天蓝色和白色", en: "sky blue and white" },
      { cn: "珊瑚色和青色", en: "coral and teal" },
      { cn: "薰衣草色和奶油色", en: "lavender and cream" },
      { cn: "粉色和灰色", en: "pink and grey" }
    ]
  },
  fantasy_dress_style: {
    label: { cn: "奇幻连衣裙风格", en: "Fantasy Dress Style" },
    category: "item",
    options: [
      { cn: "优雅飘逸的连衣裙", en: "elegant flowing dress" },
      { cn: "薄纱仙女裙", en: "tulle fairy dress" },
      { cn: "丝绸礼服裙", en: "silk evening gown" },
      { cn: "雪纺长裙", en: "chiffon long dress" },
      { cn: "蕾丝花边裙", en: "lace dress" },
      { cn: "花瓣裙", en: "petal dress" },
      { cn: "闪亮亮片裙", en: "sparkling sequin dress" },
      { cn: "羽毛装饰裙", en: "feather-trimmed dress" }
    ]
  },
  environment_style: {
    label: { cn: "环境风格", en: "Environment Style" },
    category: "location",
    options: [
      { cn: "极简建筑室内", en: "Minimal Architectural Interior" },
      { cn: "现代工业空间", en: "Modern Industrial Space" },
      { cn: "北欧风格房间", en: "Nordic Style Room" },
      { cn: "现代主义画廊", en: "Modern Gallery" },
      { cn: "高端工作室", en: "Premium Studio" },
      { cn: "极简主义住宅", en: "Minimalist Residence" },
      { cn: "建筑摄影棚", en: "Architectural Studio" },
      { cn: "设计展廊", en: "Design Showcase" }
    ]
  },
  primary_material: {
    label: { cn: "主要材质", en: "Primary Material" },
    category: "item",
    options: [
{
  "cn": "古铜与黄铜",
  "en": "antique bronze and brass"
},
      { cn: "木材", en: "Wood" },
      { cn: "金属", en: "Metal" },
      { cn: "皮革", en: "Leather" },
      { cn: "玻璃", en: "Glass" },
      { cn: "塑料", en: "Plastic" },
      { cn: "织物", en: "Fabric" },
      { cn: "陶瓷", en: "Ceramic" },
      { cn: "石材", en: "Stone" }
    ]
  },
  drawing_style: {
    label: { cn: "绘图风格", en: "Drawing Style" },
    category: "visual",
    options: [
      { cn: "建筑线图风格", en: "Architectural Line Drawing Style" },
      { cn: "技术正交绘图", en: "Technical Orthographic Drawing" },
      { cn: "工程制图风格", en: "Engineering Drawing Style" },
      { cn: "工业设计草图", en: "Industrial Design Sketch" },
      { cn: "建筑剖面图", en: "Architectural Section Drawing" },
      { cn: "产品技术图纸", en: "Product Technical Drawing" }
    ]
  },
  character_subject: {
    label: { cn: "人物主体", en: "Character Subject" },
    category: "character",
    options: [
{
  "cn": "一位欧洲成年人",
  "en": "a European adult"
},
{
  "cn": "穿礼服的中年男士",
  "en": "a middle-aged man in an evening gown"
},
      { cn: "年轻女性，长发，微笑", en: "Young woman with long hair, smiling" },
      { cn: "成熟男性，短发，严肃表情", en: "Mature man with short hair, serious expression" },
      { cn: "青少年，活泼开朗", en: "Teenager, lively and cheerful" },
      { cn: "儿童，天真可爱", en: "Child, innocent and cute" },
      { cn: "老人，慈祥温和", en: "Elderly person, kind and gentle" },
      { cn: "时尚女性，精致妆容", en: "Fashionable woman with exquisite makeup" },
      { cn: "商务男士，西装革履", en: "Business man in suit and tie" },
      { cn: "运动型人物，充满活力", en: "Athletic person, full of energy" }
    ]
  },
  portrait_view: {
    label: { cn: "画面视角", en: "Portrait View" },
    category: "visual",
    options: [
{
  "cn": "半身正面",
  "en": "frontal half-body view"
},
      { cn: "正面肖像", en: "Front portrait" },
      { cn: "侧面肖像", en: "Side profile portrait" },
      { cn: "半身像", en: "Half-body shot" },
      { cn: "全身像", en: "Full-body shot" },
      { cn: "四分之三侧面", en: "Three-quarter view" },
      { cn: "仰视角度", en: "Low-angle shot" },
      { cn: "俯视角度", en: "High-angle shot" },
      { cn: "特写头像", en: "Close-up headshot" }
    ]
  },
  line_art_style: {
    label: { cn: "线稿风格", en: "Line Art Style" },
    category: "visual",
    options: [
{
  "cn": "清晰的黑色墨线",
  "en": "clean black ink lines"
},
      { cn: "钢笔墨水风格", en: "Pen and ink style" },
      { cn: "铅笔素描风格", en: "Pencil sketch style" },
      { cn: "炭笔粗犷风格", en: "Charcoal bold style" },
      { cn: "墨水笔绘风格", en: "Ink pen drawing style" },
      { cn: "漫画线条风格", en: "Manga line style" },
      { cn: "钢笔淡彩风格", en: "Pen and wash style" },
      { cn: "蚀刻版画风格", en: "Etching print style" },
      { cn: "钢笔速写风格", en: "Pen sketch style" }
    ]
  },
  shading_technique: {
    label: { cn: "阴影技法", en: "Shading Technique" },
    category: "visual",
    options: [
      { cn: "极简排线阴影", en: "Minimalist cross-hatching" },
      { cn: "点画阴影", en: "Stippling shading" },
      { cn: "平涂阴影", en: "Flat shading" },
      { cn: "细致排线", en: "Detailed cross-hatching" },
      { cn: "粗线条阴影", en: "Bold line shading" },
      { cn: "渐变阴影", en: "Gradient shading" },
      { cn: "无阴影，纯轮廓", en: "No shading, outline only" },
      { cn: "漫画风格阴影", en: "Comic style shading" }
    ]
  },
  background_treatment: {
    label: { cn: "背景处理", en: "Background Treatment" },
    category: "location",
    options: [
      { cn: "白色背景", en: "White background" },
      { cn: "浅灰背景", en: "Light gray background" },
      { cn: "简单几何背景", en: "Simple geometric background" },
      { cn: "抽象线条背景", en: "Abstract line background" },
      { cn: "漫画速度线", en: "Manga speed lines" },
      { cn: "点状纹理背景", en: "Dotted texture background" },
      { cn: "无背景，透明", en: "No background, transparent" },
      { cn: "深色背景", en: "Dark background" }
    ]
  },
  classic_game: {
    label: { cn: "经典游戏", en: "Classic Game" },
    category: "other",
    options: [
      { cn: "Donkey Kong (1981 街机游戏)", en: "Donkey Kong (1981 vintage arcade game)" },
      { cn: "超级马里奥兄弟 (1985)", en: "Super Mario Bros (1985)" },
      { cn: "塞尔达传说 (1986)", en: "The Legend of Zelda (1986)" },
      { cn: "吃豆人 (1980 街机游戏)", en: "Pac-Man (1980 arcade game)" },
      { cn: "太空侵略者 (1978)", en: "Space Invaders (1978)" },
      { cn: "俄罗斯方块 (1984)", en: "Tetris (1984)" },
      { cn: "魂斗罗 (1987)", en: "Contra (1987)" },
      { cn: "街头霸王 II (1991)", en: "Street Fighter II (1991)" },
      { cn: "刺猬索尼克 (1991)", en: "Sonic the Hedgehog (1991)" },
      { cn: "恶魔城 (1986)", en: "Castlevania (1986)" },
      { cn: "洛克人 (1987)", en: "Mega Man (1987)" },
      { cn: "马里奥赛车 (1992)", en: "Mario Kart (1992)" },
      { cn: "口袋妖怪 红/蓝 (1996)", en: "Pokémon Red/Blue (1996)" },
      { cn: "星之卡比 (1992)", en: "Kirby's Dream Land (1992)" },
      { cn: " chrono trigger (1995)", en: "Chrono Trigger (1995)" },
      { cn: "最终幻想 VI (1994)", en: "Final Fantasy VI (1994)" }
    ]
  },
  scientific_discovery: {
    label: { cn: "科学发现", en: "Scientific Discovery" },
    category: "other",
    options: [
      { cn: "DNA结构", en: "The Structure of DNA" },
      { cn: "相对论", en: "The Theory of Relativity" },
      { cn: "微生物理论", en: "The Germ Theory" },
      { cn: "日心说", en: "Heliocentrism" },
      { cn: "进化论", en: "The Theory of Evolution" },
      { cn: "万有引力", en: "The Law of Universal Gravitation" },
      { cn: "电磁理论", en: "Electromagnetic Theory" },
      { cn: "元素周期表", en: "The Periodic Table of Elements" },
      { cn: "量子力学", en: "Quantum Mechanics" },
      { cn: "原子结构", en: "The Atomic Structure" },
      { cn: "光的波动说", en: "The Wave Theory of Light" },
      { cn: "大陆漂移说", en: "Continental Drift" },
      { cn: "疫苗接种", en: "Vaccination" },
      { cn: "血液循环", en: "Blood Circulation" },
      { cn: "苯环结构", en: "The Structure of Benzene" },
      { cn: "双螺旋发现", en: "The Double Helix Discovery" }
    ]
  },
  cute_pose_dynamic: {
    label: { cn: "可爱动态姿势", en: "Cute Dynamic Pose" },
    category: "action",
    options: [
      { cn: "向前走时回望，从正上方自信俏皮地俯视，迷人微笑", en: "Walking forward while looking back, confidently and playfully looking down from directly above, charming smile" },
      { cn: "坐在床边，双腿交叉，手玩头发，温柔微笑", en: "Sitting on bed edge, legs crossed, playing with hair, gentle smile" },
      { cn: "站立姿势，手放在臀部，自信直视镜头", en: "Standing pose, hands on hips, confidently looking at camera" },
      { cn: "躺在床上，侧身支撑头部，俏皮表情", en: "Lying on bed, propping head with hand, playful expression" },
      { cn: "跪坐姿势，双手放在膝盖上，无辜表情", en: "Kneeling pose, hands on knees, innocent expression" },
      { cn: "靠着墙站立，一只脚抬起，酷酷的表情", en: "Leaning against wall, one foot raised, cool expression" },
      { cn: "坐在地板上，双腿伸直，看书，专注表情", en: "Sitting on floor, legs extended, reading book, focused expression" },
      { cn: "跳跃姿势，双手举起，快乐笑容，动态感", en: "Jumping pose, hands raised, happy smile, dynamic feel" }
    ]
  },
  fitness_location: {
    label: { cn: "健身场景", en: "Fitness Location" },
    category: "location",
    options: [
      { cn: "繁忙的健身房，镜子和器械随处可见", en: "Busy gym with mirrors and equipment visible" },
      { cn: "现代健身房，有氧区和力量区", en: "Modern gym with cardio and weight areas" },
      { cn: "瑜伽教室，木地板和镜子", en: "Yoga studio with wooden floor and mirrors" },
      { cn: "家庭健身区，简洁整洁", en: "Home workout area, clean and organized" },
      { cn: "户外跑步机平台，城市天际线背景", en: "Outdoor treadmill platform with city skyline" }
    ]
  },
  fitness_pose: {
    label: { cn: "健身姿势", en: "Fitness Pose" },
    category: "action",
    options: [
      { cn: "半蹲姿势，侧身对镜子", en: "Half-squat pose, turned sideways to mirror" },
      { cn: "站立伸展，手臂高举", en: "Standing stretch with arms raised" },
      { cn: "平板支撑姿势，侧视镜头", en: "Plank pose, side view to camera" },
      { cn: "弓步姿势，肌肉紧绷", en: "Lunge pose, muscles tensed" },
      { cn: "哑铃推举，专注表情", en: "Dumbbell press, focused expression" },
      { cn: "瑜伽树式姿势，单腿站立", en: "Yoga tree pose, standing on one leg" },
      { cn: "深蹲底部姿势，大腿发力", en: "Bottom of squat position, leg muscles engaged" },
      { cn: "壶铃摆动，动态姿态", en: "Kettlebell swing, dynamic pose" }
    ]
  },
  fitness_clothing: {
    label: { cn: "健身服装", en: "Fitness Clothing" },
    category: "item",
    options: [
      { cn: "运动裙，紧身贴身", en: "Sports skirt, tight and form-fitting" },
      { cn: "运动短裤和运动背心", en: "Athletic shorts and sports bra" },
      { cn: "紧身瑜伽裤和运动上衣", en: "Tight yoga leggings and athletic top" },
      { cn: "运动套装，舒适透气", en: "Athletic set, comfortable and breathable" },
      { cn: "健身连衣裙，时尚运动风", en: "Fitness dress, sporty and stylish" },
      { cn: "骑行短裤和运动内衣", en: "Cycling shorts and sports bra" },
      { cn: "压缩衣和运动长裤", en: "Compression shirt and athletic pants" },
      { cn: "无袖运动背心和紧身裤", en: "Sleeveless sports tank and tight pants" }
    ]
  },
  selfie_style: {
    label: { cn: "自拍风格", en: "Selfie Style" },
    category: "visual",
    options: [
      { cn: "原始真实的镜子自拍", en: "Raw, authentic mirror selfie" },
      { cn: "随意的生活抓拍", en: "Candid daily life snapshot" },
      { cn: "自然不做摆拍", en: "Natural, unposed shot" },
      { cn: "日常生活氛围", en: "Authentic daily life atmosphere" },
      { cn: "真实记录瞬间", en: "Genuine moment captured" }
    ]
  },
  photo_effect: {
    label: { cn: "拍照效果", en: "Photo Effect" },
    category: "visual",
    options: [
{
  "cn": "细腻胶片颗粒",
  "en": "fine film grain"
},
      { cn: "机顶闪光灯直闪", en: "On-camera flash firing" },
      { cn: "慢快门导致的运动模糊", en: "Motion blur from slow shutter speed" },
      { cn: "明显的胶片颗粒感", en: "Noticeable film grain" },
      { cn: "自然光线柔和", en: "Soft natural lighting" },
      { cn: "高对比度戏剧光影", en: "High contrast dramatic lighting" },
      { cn: "轻微镜头眩光", en: "Slight lens flare" },
      { cn: "浅景深背景虚化", en: "Shallow depth of field, background blur" },
      { cn: "暗角效果", en: "Vignette effect" }
    ]
  },
  physical_state: {
    label: { cn: "身体状态", en: "Physical State" },
    category: "character",
    options: [
      { cn: "健康健美的身材", en: "Healthy athletic build" },
      { cn: "身材苗条紧致", en: "Slim and toned physique" },
      { cn: "肌肉线条分明", en: "Defined muscle lines" },
      { cn: "自然匀称的体型", en: "Natural balanced physique" },
      { cn: "柔韧灵活的身体", en: "Flexible and agile body" },
      { cn: "力量感十足的肌肉", en: "Powerful muscular build" }
    ]
  },
  sweat_appearance: {
    label: { cn: "汗水状态", en: "Sweat Appearance" },
    category: "character",
    options: [
      { cn: "头发凌乱湿透，汗水明显", en: "Hair disheveled and damp with sweat" },
      { cn: "皮肤微微出汗，光泽感", en: "Skin slightly sweaty, glossy look" },
      { cn: "汗珠挂在额头和鼻尖", en: "Sweat beads on forehead and nose tip" },
      { cn: "后背汗水浸湿衣物", en: "Back sweat soaking through clothes" },
      { cn: "汗水顺着脸颊流下", en: "Sweat streaming down cheeks" },
      { cn: "轻微运动出汗痕迹", en: "Light exercise sweat traces" }
    ]
  },
  facial_expression: {
    label: { cn: "面部表情", en: "Facial Expression" },
    category: "character",
    options: [
      { cn: "脸颊泛红，眼神迷离", en: "Cheeks flushed red, dreamy and slightly unfocused eyes" },
      { cn: "专注严肃的表情", en: "Focused and serious expression" },
      { cn: "笑容自然灿烂", en: "Natural and bright smile" },
      { cn: "咬牙坚持的神情", en: "Gritted teeth, determined look" },
      { cn: "平静放松的面容", en: "Calm and relaxed face" },
      { cn: "眼神坚定有力", en: "Firm and powerful gaze" },
      { cn: "运动后的满足表情", en: "Post-exercise satisfied expression" },
      { cn: "略带疲惫但充满成就感", en: "Slightly tired but accomplished look" }
    ]
  },
  // ===== 微缩模型系列（新增） =====
  miniature_character: {
    label: { cn: "微缩人物角色", en: "Miniature Character" },
    category: "character",
    options: [
      { cn: "消防员", en: "Firefighter" },
      { cn: "短跑运动员", en: "Sprinter" },
      { cn: "园丁", en: "Gardener" },
      { cn: "厨师", en: "Chef" },
      { cn: "建筑工人", en: "Construction Worker" },
      { cn: "医生", en: "Doctor" },
      { cn: "探险家", en: "Explorer" },
      { cn: "骑士", en: "Knight" },
      { cn: "忍者", en: "Ninja" },
      { cn: "宇航员", en: "Astronaut" },
      { cn: "警察", en: "Police Officer" },
      { cn: "画家", en: "Painter" }
    ]
  },
  giant_object: {
    label: { cn: "巨型日常物品", en: "Giant Everyday Object" },
    category: "item",
    options: [
      { cn: "燃烧的火柴棍", en: "Burning Matchstick" },
      { cn: "CD唱片", en: "CD Disc" },
      { cn: "咖啡杯", en: "Coffee Mug" },
      { cn: "铅笔", en: "Pencil" },
      { cn: "书本", en: "Book" },
      { cn: "订书机", en: "Stapler" },
      { cn: "回形针", en: "Paperclip" },
      { cn: "骰子", en: "Dice" },
      { cn: "台灯", en: "Desk Lamp" },
      { cn: "闹钟", en: "Alarm Clock" },
      { cn: "牙刷", en: "Toothbrush" },
      { cn: "遥控器", en: "Remote Control" },
      { cn: "橡皮擦", en: "Eraser" },
      { cn: "网球", en: "Tennis Ball" },
      { cn: "鸡蛋", en: "Egg" }
    ]
  },
  miniature_action: {
    label: { cn: "微缩动作", en: "Miniature Action" },
    category: "action",
    options: [
      { cn: "攀爬巨型物体", en: "Climbing the giant object" },
      { cn: "奋力推开", en: "Pushing with great effort" },
      { cn: "高举过头", en: "Lifting overhead" },
      { cn: "跳跃躲避", en: "Jumping to dodge" },
      { cn: "拉拽挣扎", en: "Pulling and struggling" },
      { cn: "冲锋撞击", en: "Charging and colliding" },
      { cn: "支撑抵抗", en: "Bracing and resisting" },
      { cn: "滑下奔跑", en: "Sliding down and running" },
      { cn: "跨越障碍", en: "Leaping over obstacle" },
      { cn: "紧抱不放", en: "Holding on tight" },
      { cn: "挥拳攻击", en: "Punching" },
      { cn: "蜷缩防御", en: "Crouching defensively" }
    ]
  },
  // ==================== Pop Mart Plush Toys Template ====================
  plush_expression: {
    label: { cn: "毛绒玩具表情", en: "Plush Toy Expression" },
    category: "character",
    options: [
      { cn: "眨眼俏皮表情", en: "winking with playful expression" },
      { cn: "张嘴大笑表情", en: "laughing out loud with open mouth" },
      { cn: "惊讶表情", en: "shocked face" },
      { cn: "困倦表情", en: "sleepy face" },
      { cn: "暴躁表情", en: "grumpy face" },
      { cn: "吐舌头表情", en: "tongue sticking out" },
      { cn: "调皮微笑", en: "playful smirks" },
      { cn: "无辜大眼表情", en: "innocent big eyes" },
      { cn: "害羞脸红表情", en: "shy blushing face" },
      { cn: "呆萌茫然表情", en: "dazed confused expression" }
    ]
  },
  cute_accessory: {
    label: { cn: "可爱配饰", en: "Cute Accessory" },
    category: "item",
    options: [
{
  "cn": "小围巾",
  "en": "a small scarf"
},
      { cn: "针织帽", en: "beanie hats" },
      { cn: "耳机", en: "headphones" },
      { cn: "派对锥形帽", en: "party cone hats" },
      { cn: "唐朝传统帽子", en: "traditional Tang dynasty hats" },
      { cn: "滑雪镜", en: "ski goggles" },
      { cn: " funky star-shaped glasses", en: "funky star-shaped glasses" },
      { cn: "厚围巾", en: "thick scarves" },
      { cn: "蝴蝶结", en: "bow ties" },
      { cn: "手持幸运币", en: "holding small lucky coins" },
      { cn: "小皇冠", en: "small crowns" },
      { cn: "蝴蝶结发夹", en: "bow hair clips" },
      { cn: "小铃铛项圈", en: "small bell collar" }
    ]
  },
  festive_archway: {
    label: { cn: "节日拱门场景", en: "Festive Archway Scene" },
    category: "location",
    options: [
      { cn: "中国传统拱门", en: "traditional Chinese archway" },
      { cn: "春节红灯笼拱门", en: "Chinese New Year red lantern archway" },
      { cn: "金色装饰拱门", en: "golden decorative archway" },
      { cn: "樱花拱门", en: "cherry blossom archway" },
      { cn: "彩灯装饰拱门", en: "festive light decorated archway" },
      { cn: "复古雕花拱门", en: "vintage carved archway" },
      { cn: "现代简约拱门", en: "modern minimalist archway" },
      { cn: "童话糖果拱门", en: "fairytale candy archway" }
    ]
  },
  // ==================== 3D Isometric Diorama Template ====================
  exhibition_type: {
    label: { cn: "展览类型", en: "Exhibition Type" },
    category: "location",
    options: [
      { cn: "现代艺术展览", en: "modern art exhibition" },
      { cn: "产品设计展", en: "product design showcase" },
      { cn: "博物馆收藏展", en: "museum collection display" },
      { cn: "科技创新展", en: "technology innovation exhibition" },
      { cn: "时尚珠宝展", en: "fashion jewelry exhibition" },
      { cn: "古董文物展", en: "antique artifacts exhibition" },
      { cn: "玩具收藏展", en: "toy collection display" },
      { cn: "植物园艺展", en: "botanical garden exhibition" },
      { cn: "摄影作品展", en: "photography portfolio show" },
      { cn: "概念设计展", en: "concept design exhibition" }
    ]
  },
  display_objects: {
    label: { cn: "展示物体", en: "Display Objects" },
    category: "item",
    options: [
      { cn: "抽象雕塑和装置艺术", en: "abstract sculptures and installation art" },
      { cn: "电子产品原型和设备", en: "electronic product prototypes and gadgets" },
      { cn: "古代文物和历史遗物", en: "ancient artifacts and historical relics" },
      { cn: "未来科技设备和机器人", en: "futuristic tech devices and robots" },
      { cn: "精致珠宝和宝石", en: "exquisite jewelry and gemstones" },
      { cn: "限量版玩具和手办", en: "limited edition toys and figurines" },
      { cn: "多肉植物和盆景", en: "succulent plants and bonsai" },
      { cn: "装裱照片和艺术品", en: "framed photos and artwork" },
      { cn: "概念汽车和交通工具", en: "concept cars and vehicles" },
      { cn: "家具和家居设计", en: "furniture and home decor" }
    ]
  },
  pod_structure: {
    label: { cn: "展台结构", en: "Pod Structure" },
    category: "location",
    options: [
      { cn: "玻璃立方体展台", en: "glass cube pod" },
      { cn: "开放式圆形平台", en: "open circular platform" },
      { cn: "悬浮展示台", en: "floating display podium" },
      { cn: "多层阶梯展架", en: "multi-tiered stepped display" },
      { cn: "嵌入式壁龛展示", en: "recessed niche display" },
      { cn: "透明圆柱体展柜", en: "transparent cylindrical showcase" },
      { cn: "L型转角展台", en: "L-shaped corner podium" },
      { cn: "模块化组合展架", en: "modular interconnected display units" },
      { cn: "旋转展示台", en: "rotating turntable display" },
      { cn: "嵌入式地面展示窗", en: "recessed floor showcase window" }
    ]
  },
  // ==================== Chinese Traditional Bridal Portrait Template ====================
  bridal_hair_decoration: {
    label: { cn: "新娘发饰", en: "Bridal Hair Decoration" },
    category: "item",
    options: [
      { cn: "红色纸剪花和蝴蝶装饰", en: "red paper-cut flowers and butterflies" },
      { cn: "金色凤冠和珍珠流苏", en: "golden phoenix coronet with pearl tassels" },
      { cn: "红色绒花装饰", en: "red velvet flower ornaments" },
      { cn: "传统银饰发簪", en: "traditional silver hairpins" },
      { cn: "玉石发钗和红花", en: "jade hairpin with red flowers" },
      { cn: "珍珠发网和小巧皇冠", en: "pearl hair net with small crown" },
      { cn: "红色绸带和铃铛", en: "red silk ribbons with bells" },
      { cn: "梅花纸剪装饰", en: "plum blossom paper-cut decorations" },
      { cn: "金色步摇晃动发饰", en: "golden buyao swaying hair ornament" },
      { cn: "绣花发带和玉簪", en: "embroidered headband with jade hairpin" }
    ]
  },
  traditional_bridal_attire: {
    label: { cn: "传统新娘服饰", en: "Traditional Bridal Attire" },
    category: "item",
    options: [
      { cn: "红色缎面旗袍", en: "red satin cheongsam" },
      { cn: "红色绣花裙褂", en: "red embroidered wedding gown" },
      { cn: "传统凤冠霞帔", en: "traditional phoenix coronet and robe" },
      { cn: "红色汉服婚服", en: "red Hanfu wedding dress" },
      { cn: "金色刺绣旗袍", en: "gold-embroidered cheongsam" },
      { cn: "红色龙凤呈祥褂", en: "red dragon-phoenix auspicious gown" },
      { cn: "锦缎旗袍配披肩", en: "brocade cheongsam with shawl" },
      { cn: "传统大红喜服", en: "traditional grand red wedding attire" },
      { cn: "红色蕾丝边旗袍", en: "red lace-trimmed cheongsam" },
      { cn: "苏绣旗袍礼服", en: "Suzhou embroidery cheongsam gown" }
    ]
  },
  bridal_jewelry: {
    label: { cn: "新娘首饰", en: "Bridal Jewelry" },
    category: "item",
    options: [
      { cn: "白色珍珠首饰和小珍珠耳环", en: "white pearl jewelry and small pearl earrings" },
      { cn: "黄金项链和耳环套装", en: "gold necklace and earrings set" },
      { cn: "玉石手镯和吊坠", en: "jade bracelet and pendant" },
      { cn: "红宝石项链和耳饰", en: "ruby necklace and ear ornaments" },
      { cn: "传统银饰手镯和项链", en: "traditional silver bracelet and necklace" },
      { cn: "珍珠项链和钻石耳钉", en: "pearl necklace and diamond studs" },
      { cn: "翡翠耳环和项链", en: "emerald earrings and necklace" },
      { cn: "黄金凤形胸针", en: "golden phoenix-shaped brooch" },
      { cn: "珍珠发饰和项链套装", en: "pearl hair ornaments and necklace set" },
      { cn: "红珊瑚手串和耳坠", en: "red coral bracelet and drop earrings" }
    ]
  },
  // ==================== Premium Food Advertising Template ====================
  premium_food_subject: {
    label: { cn: "高端食品主体", en: "Premium Food Subject" },
    category: "item",
    options: [
{
  "cn": "奶香海鲜杯面",
  "en": "creamy seafood cup noodles"
},
{
  "cn": "烤鲭鱼定食",
  "en": "a grilled mackerel set meal"
},
{
  "cn": "芝士汉堡",
  "en": "a cheeseburger"
},
      { cn: "手工巧克力球", en: "handcrafted chocolate truffles" },
      { cn: "新鲜浆果塔", en: "fresh berry tartlets" },
      { cn: "精致马卡龙", en: "delicate macarons" },
      { cn: "日式和果子", en: "Japanese wagashi sweets" },
      { cn: "手工冰淇淋球", en: "artisanal ice cream scoops" },
      { cn: "精致法式糕点", en: "elegant French pastries" },
      { cn: "新鲜寿司拼盘", en: "fresh sushi platter" },
      { cn: "手工意面卷", en: "handmade pasta bundles" },
      { cn: "精致杯子蛋糕", en: "gourmet cupcakes" },
      { cn: "新鲜牛油果片", en: "fresh avocado slices" },
      { cn: "手工奶酪球", en: "artisanal cheese balls" },
      { cn: "精致水果塔", en: "elegant fruit tarts" }
    ]
  },
  ingredient_bits: {
    label: { cn: "配料碎屑装饰", en: "Ingredient Bits" },
    category: "item",
    options: [
      { cn: "可可粉和金箔碎屑", en: "cocoa powder and gold flakes" },
      { cn: "新鲜薄荷叶和柠檬皮屑", en: "fresh mint leaves and lemon zest" },
      { cn: "烤坚果碎和海盐", en: "toasted nut crumbs and sea salt" },
      { cn: "芝麻和葱花碎", en: "sesame seeds and scallion bits" },
      { cn: "抹茶粉和红豆碎", en: "matcha powder and red bean bits" },
      { cn: "香草籽和糖粉", en: "vanilla bean specks and powdered sugar" },
      { cn: "辣椒粉和青柠碎", en: "chili powder and lime zest" },
      { cn: "罗勒叶和帕尔马干酪碎", en: "basil leaves and parmesan crisps" },
      { cn: "肉桂粉和橙皮屑", en: "cinnamon powder and orange zest" },
      { cn: "椰丝和芒果碎", en: "shredded coconut and mango bits" },
      { cn: "新鲜香草和橄榄油飞溅", en: "fresh herbs and olive oil splashes" },
      { cn: "食用花卉和花粉", en: "edible flowers and pollen" }
    ]
  },
  // ==================== Forbidden City Phoenix Portrait Template ====================
  imperial_palace_scene: {
    label: { cn: "皇家宫殿场景", en: "Imperial Palace Scene" },
    category: "location",
    options: [
      { cn: "紫禁城雪夜，飞雪飘零", en: "Forbidden City snow night with falling snowflakes" },
      { cn: "颐和园黄昏，夕阳余晖", en: "Summer Palace at dusk with golden sunset" },
      { cn: "天坛清晨，薄雾缭绕", en: "Temple of Heaven at dawn with misty atmosphere" },
      { cn: "故宫午门，春节灯火", en: "Forbidden City Meridian Gate with festival lights" },
      { cn: "圆明园遗址，月光洒落", en: "Old Summer Palace ruins under moonlight" },
      { cn: "北海公园白塔，冬雪纷飞", en: "Beihai Park White Pagoda in winter snow" },
      { cn: "天安门城楼，黎明曙光", en: "Tiananmen Gate at dawn break" },
      { cn: "雍和宫，香火缭绕", en: "Yonghe Temple with incense smoke rising" },
      { cn: "沈阳故宫，秋叶飘落", en: "Shenyang Imperial Palace with autumn leaves" },
      { cn: "承德避暑山庄，夏日荷花", en: "Chengde Mountain Resort with summer lotus" }
    ]
  },
  phoenix_crown: {
    label: { cn: "凤冠发饰", en: "Phoenix Crown" },
    category: "item",
    options: [
      { cn: "华丽繁复的金凤冠", en: "ornate golden phoenix crown" },
      { cn: "珍珠点缀的凤冠", en: "pearl-embellished phoenix crown" },
      { cn: "红宝石凤凰发钗", en: "ruby phoenix hairpin" },
      { cn: "翡翠流苏凤冠", en: "jade tassel phoenix crown" },
      { cn: "金龙戏珠发饰", en: "golden dragon playing with pearl hairpiece" },
      { cn: "彩凤朝阳头饰", en: "colorful phoenix facing sun headpiece" },
      { cn: "宝石镶嵌的凤冠", en: "gemstone-encrusted phoenix crown" },
      { cn: "金丝编织的凤簪", en: "gold-woven phoenix hairpin" },
      { cn: "珊瑚与珍珠凤冠", en: "coral and pearl phoenix crown" },
      { cn: "传统步摇发饰", en: "traditional buyao swaying hair ornament" }
    ]
  },
  flowing_garment: {
    label: { cn: "流动华服", en: "Flowing Garment" },
    category: "item",
    options: [
      { cn: "流动的红橙色丝绸华服", en: "flowing red-orange silk robes" },
      { cn: "飘逸的紫色纱衣", en: "flowing purple silk gauze" },
      { cn: "金色刺绣锦缎长袍", en: "gold-embroidered brocade robes" },
      { cn: "红色霞帔凤冠霞帔", en: "red xiapei royal cape" },
      { cn: "白色汉服仙气飘飘", en: "white Hanfu with ethereal vibe" },
      { cn: "蓝色渐变云纹华服", en: "blue gradient cloud-pattern robes" },
      { cn: "粉色樱花主题长裙", en: "pink cherry blossom themed gown" },
      { cn: "绿色翡翠质感丝绸", en: "green jade-like silk robes" },
      { cn: "黑色绣金龙纹长袍", en: "black dragon-embroidered robes" },
      { cn: "彩色羽衣霓裳", en: "colorful feather rainbow gown" }
    ]
  },
  festive_props: {
    label: { cn: "节日道具", en: "Festive Props" },
    category: "item",
    options: [
      { cn: "口中叼着中式红包，手中拿着展开的春节祝福", en: "holding red envelope in mouth and unfolded spring festival blessing in hand" },
      { cn: "手持灯笼，提着福字挂件", en: "holding lantern with Fu character ornament" },
      { cn: "拿着春联，提着鞭炮串", en: "holding spring couplet and firecracker string" },
      { cn: "捧着元宝托盘，拿着金算盘", en: "holding gold ingot tray and golden abacus" },
      { cn: "手提花灯，拿着梅花枝", en: "carrying flower lantern and plum blossom branch" },
      { cn: "拿着福字牌，手捧如意", en: "holding Fu character plaque and jade ruyi scepter" },
      { cn: "手持红包袋，提着中国结", en: "holding red envelope bag and Chinese knot" },
      { cn: "拿着糖葫芦，提着饺子篮", en: "holding candied hawthorn and dumpling basket" },
      { cn: "手捧酒杯，拿着梅花扇", en: "holding wine cup and plum blossom fan" },
      { cn: "手持鞭炮，拿着福字窗花", en: "holding firecrackers and Fu character paper cutting" }
    ]
  },

  // ==================== 室内设计词库 ====================

  room_type: {
    label: { cn: "室内空间类型", en: "Room Type" },
    category: "location",
    options: [
      { cn: "客厅", en: "Living Room" },
      { cn: "卧室", en: "Bedroom" },
      { cn: "厨房", en: "Kitchen" },
      { cn: "浴室", en: "Bathroom" },
      { cn: "书房", en: "Study Room" },
      { cn: "餐厅", en: "Dining Room" },
      { cn: "办公室", en: "Office" },
      { cn: "阳台", en: "Balcony" },
      { cn: "娱乐室", en: "Entertainment Room" },
      { cn: "衣帽间", en: "Walk-in Closet" }
    ]
  },

  interior_design_style: {
    label: { cn: "室内设计风格", en: "Interior Design Style" },
    category: "visual",
    options: [
{
  "cn": "古典画廊风格",
  "en": "classical gallery style"
},
      { cn: "现代轻奢风格", en: "Modern Light Luxury Style" },
      { cn: "北欧简约风格", en: "Nordic Minimalist Style" },
      { cn: "工业风格", en: "Industrial Style" },
      { cn: "新中式风格", en: "New Chinese Style" },
      { cn: "现代简约风格", en: "Modern Minimalist Style" },
      { cn: "美式乡村风格", en: "American Country Style" },
      { cn: "欧式古典风格", en: "European Classical Style" },
      { cn: "日式和风风格", en: "Japanese Style" },
      { cn: "波普艺术风格", en: "Pop Art Style" },
      { cn: "复古怀旧风格", en: "Vintage Retro Style" },
      { cn: "地中海风格", en: "Mediterranean Style" },
      { cn: "极简主义风格", en: "Minimalism Style" }
    ]
  },

  furniture_set: {
    label: { cn: "家具组合", en: "Furniture Set" },
    category: "item",
    options: [
{
  "cn": "沙发、茶几和落地灯",
  "en": "a sofa, coffee table and floor lamp"
},
      { cn: "沙发、地毯、茶几、电视", en: "Sofa, rug, coffee table, TV" },
      { cn: "双人床、床头柜、台灯、衣柜", en: "Double bed, nightstand, lamp, wardrobe" },
      { cn: "餐桌、餐椅、吊灯、餐具柜", en: "Dining table, chairs, pendant light, sideboard" },
      { cn: "办公桌、办公椅、书架、台灯", en: "Desk, office chair, bookshelf, desk lamp" },
      { cn: "沙发组合、茶几、电视柜、落地灯", en: "Sofa set, coffee table, TV cabinet, floor lamp" },
      { cn: "浴缸、洗手台、马桶、浴室柜", en: "Bathtub, vanity, toilet, bathroom cabinet" },
      { cn: "灶台、橱柜、冰箱、餐桌", en: "Stove, cabinets, refrigerator, dining table" },
      { cn: "懒人沙发、茶几、落地灯、书架", en: "Bean bag, coffee table, floor lamp, bookshelf" }
    ]
  },

  ceiling_material: {
    label: { cn: "天花板材质", en: "Ceiling Material" },
    category: "visual",
    options: [
      { cn: "白色乳胶漆平顶", en: "White latex flat ceiling" },
      { cn: "石膏线装饰吊顶", en: "Gypsum molding decorative ceiling" },
      { cn: "木质格栅吊顶", en: "Wooden grid ceiling" },
      { cn: "简约跌级吊顶", en: "Minimalist stepped ceiling" },
      { cn: "金属铝扣板吊顶", en: "Metal aluminum ceiling" },
      { cn: "原木色木质天花板", en: "Natural wood ceiling" },
      { cn: "艺术涂料质感天花", en: "Artistic paint texture ceiling" },
      { cn: "镜面玻璃吊顶", en: "Mirrored glass ceiling" },
      { cn: "布艺软包吊顶", en: "Fabric upholstered ceiling" },
      { cn: "裸露混凝土顶面", en: "Exposed concrete ceiling" }
    ]
  },

  wall_material: {
    label: { cn: "墙面材质", en: "Wall Material" },
    category: "visual",
    options: [
{
  "cn": "风化混凝土",
  "en": "weathered concrete"
},
{
  "cn": "暖灰色混凝土墙",
  "en": "a warm gray concrete wall"
},
      { cn: "白色乳胶漆墙面", en: "White latex paint wall" },
      { cn: "暖白色墙面与装饰画", en: "Warm white walls with decorative art" },
      { cn: "浅灰色艺术涂料", en: "Light gray artistic paint" },
      { cn: "原木色木饰面板", en: "Natural wood veneer panel" },
      { cn: "大理石纹理墙面", en: "Marble texture wall" },
      { cn: "文化石装饰墙", en: "Cultural stone decorative wall" },
      { cn: "浅色木纹壁纸", en: "Light wood grain wallpaper" },
      { cn: "浅灰色硅藻泥墙面", en: "Light gray diatom mud wall" },
      { cn: "白色护墙板", en: "White wainscoting panel" },
      { cn: "暖色瓷砖墙面", en: "Warm color ceramic tile wall" },
      { cn: "裸露红砖墙面", en: "Exposed red brick wall" }
    ]
  },

  floor_material: {
    label: { cn: "地板材质", en: "Floor Material" },
    category: "visual",
    options: [
{
  "cn": "浅色木地板",
  "en": "pale wood flooring"
},
      { cn: "浅灰色大理石地砖", en: "Light gray marble tile" },
      { cn: "浅灰色岩板地面", en: "Light gray sintered stone floor" },
      { cn: "暖色实木复合地板", en: "Warm engineered wood flooring" },
      { cn: "浅橡色强化地板", en: "Light oak laminate flooring" },
      { cn: "深灰色大理石地面", en: "Dark gray marble floor" },
      { cn: "原木色实木地板", en: "Natural wood solid floor" },
      { cn: "米色抛光砖", en: "Beige polished tile" },
      { cn: "浅灰色仿古砖", en: "Light gray antique brick tile" },
      { cn: "深色地毯铺地", en: "Dark carpet flooring" },
      { cn: "水磨石地面", en: "Terrazzo flooring" },
      { cn: "混凝土抛光地面", en: "Polished concrete floor" }
    ]
  },

  interior_lighting: {
    label: { cn: "室内光线效果", en: "Interior Lighting" },
    category: "visual",
    options: [
{
  "cn": "温暖的自然窗光",
  "en": "warm natural window light"
},
      { cn: "自然光线", en: "Natural lighting" },
      { cn: "暖色调柔和灯光", en: "Warm soft lighting" },
      { cn: "冷色调明亮灯光", en: "Cool bright lighting" },
      { cn: "专业建筑摄影光线", en: "Professional architectural photography lighting" },
      { cn: "侧面窗户自然光", en: "Side window natural light" },
      { cn: "柔和漫射光线", en: "Soft diffused lighting" },
      { cn: "戏剧性光影对比", en: "Dramatic light and shadow contrast" },
      { cn: "黄金时刻阳光", en: "Golden hour sunlight" },
      { cn: "多云天柔和光线", en: "Overcast soft lighting" },
      { cn: "夜晚温馨灯光", en: "Cozy evening lighting" }
    ]
  },

  render_quality: {
    label: { cn: "渲染质量", en: "Render Quality" },
    category: "other",
    options: [
      { cn: "4K超高清分辨率", en: "4K Ultra HD resolution" },
      { cn: "8K超高清分辨率", en: "8K Ultra HD resolution" },
      { cn: "照片级真实渲染", en: "Photorealistic rendering" },
      { cn: "电影级渲染质量", en: "Cinematic rendering quality" },
      { cn: "高清细节", en: "High definition details" },
      { cn: "超精细纹理细节", en: "Ultra-fine texture details" },
      { cn: "真实光影渲染", en: "Realistic lighting rendering" },
      { cn: "专业建筑渲染", en: "Professional architectural rendering" }
    ]
  },

  room_condition: {
    label: { cn: "房间状态", en: "Room Condition" },
    category: "location",
    options: [
      { cn: "精致装修，高档材料的质感与细节", en: "Exquisitely decorated, high-end materials with refined details" },
      { cn: "毛坯房，裸露的混凝土表面，未完工的状态", en: "Unfinished rough room, exposed concrete surfaces, incomplete state" },
      { cn: "脏乱破旧，杂乱的布置与陈旧材质表达", en: "Dirty and dilapidated, cluttered layout with worn materials" },
      { cn: "简约整洁，现代都市风格", en: "Minimalist and tidy, modern urban style" },
      { cn: "豪华高档，奢华装修与精致装饰", en: "Luxurious high-end, opulent decoration with exquisite ornaments" },
      { cn: "温馨舒适，充满生活气息", en: "Cozy and comfortable, full of life atmosphere" },
      { cn: "工业风，裸露管线与原始材质", en: "Industrial style, exposed pipes and raw materials" },
      { cn: "极简主义，留白空间与极少装饰", en: "Minimalist, negative space with minimal decoration" }
    ]
  },
  anatomy_teaching_style: {
    label: { cn: "解剖教学风格", en: "Anatomy Teaching Style" },
    category: "visual",
    options: [
      { cn: "Proko 风格（简化几何、教学导向、清晰构造线）", en: "Proko style (simplified geometry, educational focus, clear construction lines)" },
      { cn: "Hampton 风格（构造线、体块分析、结构化方法）", en: "Hampton style (construction lines, form analysis, structural approach)" },
      { cn: "Vilppu 风格（手势素描、流畅线条、动态感）", en: "Vilppu style (gesture drawing, flowing lines, dynamic feeling)" },
      { cn: "Bammes 风格（德国解剖学、精确构造、科学方法）", en: "Bammes style (German anatomy, precise construction, scientific method)" },
      { cn: "Loomis 风格（经典比例、标准人体、结构化）", en: "Loomis style (classic proportions, standard human figure, structured)" },
      { cn: "Bridgman 风格（体块分析、建筑感、厚重体积）", en: "Bridgman style (mass analysis, architectural feel, heavy volume)" },
      { cn: "Hogarth 风格（动态夸张、戏剧性线条、肌肉强调）", en: "Hogarth style (dynamic exaggeration, dramatic lines, muscle emphasis)" },
      { cn: "医学解剖学教材风格（精确、科学、详细标注）", en: "Medical anatomy textbook style (precise, scientific, detailed labels)" }
    ]
  },
  construction_line_color: {
    label: { cn: "构造线颜色", en: "Construction Line Color" },
    category: "visual",
    options: [
      { cn: "紫色/紫罗兰色（主构造线）", en: "Purple/violet sketch lines (primary construction)" },
      { cn: "青色/绿松石色（方向指引线）", en: "Cyan/turquoise directional guidelines" },
      { cn: "蓝色（专业构造线）", en: "Blue professional construction lines" },
      { cn: "红色（强调高亮线）", en: "Red accent highlight lines" },
      { cn: "橙色（活力高亮线）", en: "Orange energetic highlight lines" },
      { cn: "绿色（辅助参考线）", en: "Green auxiliary reference lines" },
      { cn: "多色混合（紫/青/蓝组合）", en: "Multi-color combination (purple/cyan/blue mix)" }
    ]
  },

  // 视频打斗风格词库
  fight_style: {
    label: { cn: "打斗风格", en: "Fight Style" },
    category: "action",
    options: [
      { cn: "武侠飘逸风（轻功、剑气、衣袂飘飘）", en: "Wuxia elegant style (light kung fu, sword aura, flowing robes)" },
      { cn: "硬派写实格斗（拳拳到肉、真实打击感）", en: "Hardcore realistic combat (hard-hitting, raw impact)" },
      { cn: "暗杀潜行风（迅捷暗杀、一击致命）", en: "Stealth assassination style (swift kills, one-hit lethal)" },
      { cn: "港片动作风（成龙式、环境互动、幽默打斗）", en: "Hong Kong action style (Jackie Chan-esque, environmental interaction, comedic)" },
      { cn: "日式剑戟风（拔刀术、一刀流、静与动的对比）", en: "Japanese chambara style (iaijutsu, single-stroke, contrast of stillness and motion)" },
      { cn: "现代近身格斗（综合格斗、枪械近战混合）", en: "Modern close-quarters combat (MMA, gun-fu hybrid)" },
      { cn: "魔幻战斗风（元素法术、能量冲击波）", en: "Fantasy combat style (elemental magic, energy shockwaves)" }
    ]
  },

  // 镜头节奏词库
  camera_rhythm: {
    label: { cn: "镜头节奏", en: "Camera Rhythm" },
    category: "visual",
    options: [
      { cn: "快速切换蒙太奇（多角度快速剪辑）", en: "Rapid montage cutting (multi-angle fast edits)" },
      { cn: "长镜头一镜到底（沉浸式跟随拍摄）", en: "Long take single shot (immersive follow-through)" },
      { cn: "慢动作特写穿插（关键瞬间减速）", en: "Slow-motion close-up intercuts (key moment deceleration)" },
      { cn: "环绕旋转跟拍（360度围绕主角运镜）", en: "Orbiting tracking shot (360° rotation around subject)" },
      { cn: "推拉变焦节奏（紧张感逐步递进）", en: "Push-pull zoom rhythm (gradually building tension)" },
      { cn: "稳定器跟拍配合手持晃动（动静结合）", en: "Stabilized tracking mixed with handheld shake (dynamic contrast)" }
    ]
  },

  // 科幻电影风格词库
  sci_fi_movie_style: {
    label: { cn: "科幻电影风格", en: "Sci-Fi Movie Style" },
    category: "visual",
    options: [
      { cn: "好莱坞科幻大片（Hollywood Sci-Fi Blockbuster）", en: "Hollywood Sci-Fi Blockbuster" },
      { cn: "赛博朋克美学（Cyberpunk Aesthetics）", en: "Cyberpunk Aesthetics" },
      { cn: "末日废土风格（Post-Apocalyptic Wasteland）", en: "Post-Apocalyptic Wasteland" },
      { cn: "太空歌剧史诗（Space Opera Epic）", en: "Space Opera Epic" },
      { cn: "反乌托邦未来（Dystopian Future）", en: "Dystopian Future" },
      { cn: "硬核科幻写实（Hard Sci-Fi Realism）", en: "Hard Sci-Fi Realism" },
      { cn: "日本动漫未来风（Japanese Anime Future）", en: "Japanese Anime Future" },
      { cn: "复古未来主义（Retro-Futurism）", en: "Retro-Futurism" }
    ]
  },

  // 未来载具词库
  futuristic_vehicle: {
    label: { cn: "未来载具", en: "Futuristic Vehicle" },
    category: "item",
    options: [
      { cn: "流线型反重力飞行器（Anti-gravity Vehicle）", en: "Streamlined Anti-gravity Vehicle" },
      { cn: "太空战斗机（Space Fighter）", en: "Space Fighter" },
      { cn: "磁悬浮超跑（Magnetic Levitation Sports Car）", en: "Magnetic Levitation Sports Car" },
      { cn: "重型运输飞船（Heavy Cargo Spaceship）", en: "Heavy Cargo Spaceship" },
      { cn: "单兵飞行装甲（Single-Person Flight Armor）", en: "Single-Person Flight Armor" },
      { cn: "悬浮摩托车（Hover Motorcycle）", en: "Hover Motorcycle" },
      { cn: "隐形侦察机（Stealth Reconnaissance Craft）", en: "Stealth Reconnaissance Craft" },
      { cn: "量子穿梭机（Quantum Shuttle）", en: "Quantum Shuttle" }
    ]
  },

  // 赛博朋克城市场景词库
  cyberpunk_city_scene: {
    label: { cn: "赛博朋克城市场景", en: "Cyberpunk City Scene" },
    category: "location",
    options: [
      { cn: "未来主义超级城市峡谷（Megacity Canyon）", en: "Futuristic Megacity Canyon" },
      { cn: "多层立体浮空城市（Multi-tier Floating City）", en: "Multi-tier Floating City" },
      { cn: "地下霓虹城寨（Underground Neon Town）", en: "Underground Neon Town" },
      { cn: "轨道空间站都市（Orbital Space Station City）", en: "Orbital Space Station City" },
      { cn: "废弃工业废土城（Abandoned Industrial Wasteland City）", en: "Abandoned Industrial Wasteland City" },
      { cn: "海底透明穹顶城市（Underwater Dome City）", en: "Underwater Dome City" },
      { cn: "云端天空之城（Cloud Sky City）", en: "Cloud Sky City" },
      { cn: "数字虚拟矩阵都市（Digital Virtual Matrix City）", en: "Digital Virtual Matrix City" }
    ]
  },

  // 跟拍镜头类型词库
  tracking_camera_shot: {
    label: { cn: "跟拍镜头类型", en: "Tracking Camera Shot" },
    category: "visual",
    options: [
      { cn: "极具纵深感的广角跟拍（Wide Angle Tracking Shot）", en: "Wide Angle Tracking Shot with Deep Depth" },
      { cn: "俯瞰追踪拍摄（Overhead Tracking Shot）", en: "Overhead Tracking Shot" },
      { cn: "侧面平行跟随（Side Parallel Follow）", en: "Side Parallel Follow" },
      { cn: "斜向45度跟拍（Diagonal 45° Tracking）", en: "Diagonal 45° Tracking" },
      { cn: "螺旋上升环绕（Spiral Ascent Orbit）", en: "Spiral Ascent Orbit" },
      { cn: "低空掠过跟拍（Low Altitude Sweep）", en: "Low Altitude Sweep" },
      { cn: "穿越障碍跟拍（Obstacle Weaving Shot）", en: "Obstacle Weaving Shot" },
      { cn: "远景缩放跟拍（Dolly Zoom Tracking）", en: "Dolly Zoom Tracking" }
    ]
  },

  // 动作镜头类型词库
  action_camera_shot: {
    label: { cn: "动作镜头类型", en: "Action Camera Shot" },
    category: "visual",
    options: [
      { cn: "紧张的驾驶舱视角（Cockpit View）", en: "Tense Cockpit View" },
      { cn: "紧凑跟拍（Tight Action Shot）", en: "Tight Action Shot" },
      { cn: "第一人称视角（First-Person POV）", en: "First-Person POV" },
      { cn: "动作 GoPro 附着视角（Action GoPro Mount）", en: "Action GoPro Mount" },
      { cn: "急速甩镜头（Whip Pan Transition）", en: "Whip Pan Transition" },
      { cn: "慢动作特写（Slow-Motion Close-Up）", en: "Slow-Motion Close-Up" },
      { cn: "动态震动镜头（Dynamic Camera Shake）", en: "Dynamic Camera Shake" },
      { cn: "多角度快速切换（Multi-Angle Quick Cut）", en: "Multi-Angle Quick Cut" }
    ]
  },

  // 自然环境类型词库
  natural_environment: {
    label: { cn: "自然环境类型", en: "Natural Environment Type" },
    category: "location",
    options: [
{
  "cn": "雾气弥漫的荒原",
  "en": "a misty wasteland"
},
{
  "cn": "雾气弥漫的群山",
  "en": "misty mountains"
},
      { cn: "古代雨林（Ancient Rainforest）", en: "Ancient Rainforest" },
      { cn: "雪山峡谷（Snow Mountain Canyon）", en: "Snow Mountain Canyon" },
      { cn: "沙漠绿洲（Desert Oasis）", en: "Desert Oasis" },
      { cn: "冰川峡谷（Glacier Canyon）", en: "Glacier Canyon" },
      { cn: "火山熔岩地带（Volcanic Lava Zone）", en: "Volcanic Lava Zone" },
      { cn: "热带群岛（Tropical Archipelago）", en: "Tropical Archipelago" },
      { cn: "大峡谷（Grand Canyon）", en: "Grand Canyon" },
      { cn: "北极冰原（Arctic Ice Field）", en: "Arctic Ice Field" }
    ]
  },

  // 军用飞行器词库
  military_aircraft: {
    label: { cn: "军用飞行器", en: "Military Aircraft" },
    category: "item",
    options: [
      { cn: "战斗机（Fighter Jet）", en: "Fighter Jet" },
      { cn: "隐形战机（Stealth Fighter）", en: "Stealth Fighter" },
      { cn: "攻击机（Attack Aircraft）", en: "Attack Aircraft" },
      { cn: "侦察机（Reconnaissance Plane）", en: "Reconnaissance Plane" },
      { cn: "轰炸机（Bomber）", en: "Bomber" },
      { cn: "垂直起降战机（VTOL Aircraft）", en: "VTOL Aircraft" },
      { cn: "无人战斗机（UCAV）", en: "UCAV" },
      { cn: "超音速截击机（Supersonic Interceptor）", en: "Supersonic Interceptor" }
    ]
  },

  // 航拍开场镜头词库
  aerial_opening_shot: {
    label: { cn: "航拍开场镜头", en: "Aerial Opening Shot" },
    category: "visual",
    options: [
      { cn: "史诗超广角航拍（Epic Ultra Wide Aerial Shot）", en: "Epic Ultra Wide Aerial Shot" },
      { cn: "俯瞰全景（Overhead Panoramic View）", en: "Overhead Panoramic View" },
      { cn: "侧面横扫（Lateral Sweep）", en: "Lateral Sweep" },
      { cn: "垂直俯冲（Vertical Dive）", en: "Vertical Dive" },
      { cn: "环绕旋转（Orbiting Rotation）", en: "Orbiting Rotation" },
      { cn: "平推向前（Straight Push Forward）", en: "Straight Push Forward" },
      { cn: "斜角俯冲（Diagonal Dive）", en: "Diagonal Dive" },
      { cn: "高角度俯瞰（High Angle Overlook）", en: "High Angle Overlook" }
    ]
  },

  // 动态跟拍风格词库
  dynamic_tracking_shot: {
    label: { cn: "动态跟拍风格", en: "Dynamic Tracking Shot Style" },
    category: "visual",
    options: [
      { cn: "第三人称紧密跟拍（Third-Person Tight Tracking）", en: "Third-Person Tight Tracking" },
      { cn: "第一人称视角（First-Person POV）", en: "First-Person POV" },
      { cn: "侧面跟随（Side Follow）", en: "Side Follow" },
      { cn: "头顶俯视跟踪（Top-Down Tracking）", en: "Top-Down Tracking" },
      { cn: "斜后方45度跟拍（45-Degree Rear Tracking）", en: "45-Degree Rear Tracking" },
      { cn: "动态环绕跟拍（Dynamic Orbit Tracking）", en: "Dynamic Orbit Tracking" },
      { cn: "分离镜头（Split Shot）", en: "Split Shot" },
      { cn: "震动跟拍（Shaky Tracking）", en: "Shaky Tracking" }
    ]
  },
  // 角色设计表专用词库
  character_animal: {
    label: { cn: "动物角色类型", en: "Animal Character Type" },
    category: "character",
    options: [
{
  "cn": "小熊",
  "en": "a little bear"
},
{
  "cn": "比熊犬",
  "en": "a Bichon Frise"
},
      { cn: "小兔子", en: "Little Bunny" },
      { cn: "小熊", en: "Little Bear" },
      { cn: "小猫", en: "Little Kitten" },
      { cn: "小狗", en: "Little Puppy" },
      { cn: "小狐狸", en: "Little Fox" },
      { cn: "小松鼠", en: "Little Squirrel" },
      { cn: "小刺猬", en: "Little Hedgehog" },
      { cn: "小鸟", en: "Little Bird" },
      { cn: "小老鼠", en: "Little Mouse" },
      { cn: "小龙", en: "Little Dragon" }
    ]
  },
  fur_color: {
    label: { cn: "毛色/主色调", en: "Fur Color / Main Color" },
    category: "character",
    options: [
{
  "cn": "暖焦糖棕色",
  "en": "warm caramel brown"
},
      { cn: "柔和温暖的粉彩黄色", en: "Soft warm pastel yellow" },
      { cn: "纯白色", en: "Pure white" },
      { cn: "浅棕色", en: "Light brown" },
      { cn: "奶油色", en: "Creamy white" },
      { cn: "粉彩粉色", en: "Pastel pink" },
      { cn: "粉彩蓝色", en: "Pastel blue" },
      { cn: "粉彩绿色", en: "Pastel green" },
      { cn: "浅灰色", en: "Light gray" },
      { cn: "橙黄色", en: "Orange-yellow" },
      { cn: "浅紫色", en: "Light purple" }
    ]
  },
  body_description: {
    label: { cn: "身体特征", en: "Body Features" },
    category: "character",
    options: [
      { cn: "大圆头和小椭圆身体", en: "Large round head and small oval body" },
      { cn: "圆润可爱的身体", en: "Round and cute body" },
      { cn: "小巧玲珑的身体", en: "Small and delicate body" },
      { cn: "胖乎乎的身体", en: "Chubby body" },
      { cn: "纤细优雅的身体", en: "Slender and elegant body" },
      { cn: "方方正正的身体", en: "Square and sturdy body" },
      { cn: "修长的身体", en: "Elongated body" },
      { cn: "紧凑的身体", en: "Compact body" }
    ]
  },
  character_accessories: {
    label: { cn: "服装配饰", en: "Accessories" },
    category: "item",
    options: [
{
  "cn": "念珠与布袋",
  "en": "prayer beads and a cloth pouch"
},
      { cn: "小红橙色探险家围巾和棕色小挎包", en: "Small red-orange adventurer scarf and tiny brown satchel" },
      { cn: "蓝色小领结", en: "Small blue bow tie" },
      { cn: "红色小领巾", en: "Small red neckerchief" },
      { cn: "粉色蝴蝶结", en: "Pink bow" },
      { cn: "小帽子", en: "Small hat" },
      { cn: "小背包", en: "Small backpack" },
      { cn: "围裙", en: "Apron" },
      { cn: "小斗篷", en: "Small cape" },
      { cn: "眼镜", en: "Glasses" },
      { cn: "无配饰", en: "No accessories" }
    ]
  },
  character_persona: {
    label: { cn: "角色定位", en: "Character Persona" },
    category: "character",
    options: [
      { cn: "可爱的奇幻探险家", en: "Cute fantasy explorer" },
      { cn: "小小魔法师", en: "Little wizard" },
      { cn: "勇敢的小骑士", en: "Brave little knight" },
      { cn: "好奇的小探险家", en: "Curious little explorer" },
      { cn: "温柔的小护士", en: "Gentle little nurse" },
      { cn: "调皮的小淘气", en: "Playful little mischief" },
      { cn: "聪明的小学者", en: "Smart little scholar" },
      { cn: "善良的小帮手", en: "Kind little helper" },
      { cn: "小小厨师", en: "Little chef" },
      { cn: "小小艺术家", en: "Little artist" }
    ]
  },
  design_sheet_type: {
    label: { cn: "设计表类型", en: "Design Sheet Type" },
    category: "other",
    options: [
      { cn: "角色转身表（character turnaround sheet）", en: "Character turnaround sheet" },
      { cn: "表情表（expression sheet）", en: "Expression sheet" },
      { cn: "姿势表（pose sheet）", en: "Pose sheet" },
      { cn: "完整角色设定表（full character model sheet）", en: "Full character model sheet" },
      { cn: "动作参考表（action reference sheet）", en: "Action reference sheet" },
      { cn: "色彩设计表（color design sheet）", en: "Color design sheet" }
    ]
  },
  // 漫画页面专用词库（精简版）
  comic_subject: {
    label: { cn: "漫画主体", en: "Comic Subject" },
    category: "character",
    options: [
      { cn: "两个潜行的忍者", en: "two stealthy ninjas" },
      { cn: "两个武士", en: "two samurai warriors" },
      { cn: "两个盗贼", en: "two thieves" },
      { cn: "两个刺客", en: "two assassins" },
      { cn: "两个剑客", en: "two swordsmen" },
      { cn: "两个侦探", en: "two detectives" },
      { cn: "两个间谍", en: "two spies" }
    ]
  },
  comic_location: {
    label: { cn: "场景地点", en: "Location" },
    category: "location",
    options: [
{
  "cn": "大学校园",
  "en": "a university campus"
},
{
  "cn": "未来公寓",
  "en": "a futuristic apartment"
},
{
  "cn": "古老城堡",
  "en": "an ancient castle"
},
{
  "cn": "日式庭院",
  "en": "a Japanese courtyard"
},
{
  "cn": "日本神社祭典",
  "en": "a Japanese shrine festival"
},
{
  "cn": "安静的城市街角",
  "en": "a quiet city corner"
},
      { cn: "古日本寺庙", en: "ancient Japanese temple" },
      { cn: "城堡", en: "castle" },
      { cn: "宫殿", en: "palace" },
      { cn: "武士道场", en: "samurai dojo" },
      { cn: "忍者村落", en: "ninja village" },
      { cn: "森林神社", en: "forest shrine" },
      { cn: "山顶古堡", en: "mountain fortress" }
    ]
  },
  comic_time: {
    label: { cn: "时间", en: "Time of Day" },
    category: "visual",
    options: [
      { cn: "夜晚", en: "night" },
      { cn: "黎明", en: "dawn" },
      { cn: "黄昏", en: "dusk" },
      { cn: "午夜", en: "midnight" },
      { cn: "月圆之夜", en: "full moon night" },
      { cn: "暴雨之夜", en: "stormy night" }
    ]
  },
  comic_art_style: {
    label: { cn: "漫画风格", en: "Comic Art Style" },
    category: "visual",
    options: [
      { cn: "传统黑白漫画风格", en: "traditional black and white manga style" },
      { cn: "现代彩漫风格", en: "modern colored manga style" },
      { cn: "水墨漫画风格", en: "ink wash manga style" },
      { cn: "美式漫画风格", en: "American comic book style" },
      { cn: "复古印刷风格", en: "vintage print style" },
      { cn: "素描手绘风格", en: "sketchy hand-drawn style" }
    ]
  },

  // ========== 创意容器模板词库 ==========
  container_type: {
    label: { cn: "容器类型", en: "Container Type" },
    category: "item",
    options: [
      { cn: "750ml玻璃酒瓶", en: "750ml glass wine bottle" },
      { cn: "500ml透明玻璃水瓶", en: "500ml clear glass water bottle" },
      { cn: "1升玻璃罐", en: "1 liter glass jar" },
      { cn: "玻璃香水瓶", en: "glass perfume bottle" },
      { cn: "球形玻璃容器", en: "spherical glass vessel" },
      { cn: "透明玻璃烧杯", en: "transparent glass beaker" },
      { cn: "复古玻璃灯泡", en: "vintage glass light bulb" },
      { cn: "柱形玻璃花瓶", en: "cylindrical glass vase" },
      { cn: "玻璃试管", en: "glass test tube" },
      { cn: "透明玻璃球", en: "transparent glass sphere" }
    ]
  },

  view_type: {
    label: { cn: "视图类型", en: "View Type" },
    category: "visual",
    options: [
      { cn: "横截面视图", en: "cross-section view" },
      { cn: "透视图", en: "transparent view" },
      { cn: "剖面图", en: "cutaway view" },
      { cn: "侧视图", en: "side view" },
      { cn: "俯视图", en: "top-down view" },
      { cn: "内部视角", en: "interior view" },
      { cn: "透明剖视图", en: "see-through section view" },
      { cn: "微观视角", en: "microscopic view" }
    ]
  },

  landscape_location: {
    label: { cn: "景观地点", en: "Landscape Location" },
    category: "location",
    options: [
{
  "cn": "高山湖泊",
  "en": "an alpine lake"
},
      { cn: "特兰西瓦尼亚葡萄园", en: "Transylvania vineyard" },
      { cn: "托斯卡纳向日葵田", en: "Tuscan sunflower field" },
      { cn: "京都竹林", en: "Kyoto bamboo forest" },
      { cn: "瑞士阿尔卑斯山村", en: "Swiss Alpine village" },
      { cn: "普罗旺斯薰衣草田", en: "Provence lavender field" },
      { cn: "挪威峡湾", en: "Norwegian fjord" },
      { cn: "撒哈拉沙漠绿洲", en: "Sahara desert oasis" },
      { cn: "亚马逊雨林", en: "Amazon rainforest" },
      { cn: "中国水墨山水", en: "Chinese ink landscape" },
      { cn: "日本樱花山谷", en: "Japanese cherry blossom valley" }
    ]
  },

  landscape_features: {
    label: { cn: "景观特征", en: "Landscape Features" },
    category: "location",
    options: [
      { cn: "起伏山丘、整齐葡萄架、土路、小农舍", en: "rolling hills, neat vine rows, dirt paths, small farmhouse" },
      { cn: "连绵山脉、松树林、石板路、山间小屋", en: "mountain ranges, pine forests, stone paths, mountain cabins" },
      { cn: "竹林小径、石灯笼、溪流、茶屋", en: "bamboo paths, stone lanterns, streams, tea house" },
      { cn: "金色花海、柏树路、农庄、稻草人", en: "golden flower fields, cypress roads, farmhouses, scarecrows" },
      { cn: "紫色花田、石墙、薰衣草农舍、蜜蜂", en: "purple flower fields, stone walls, lavender farmhouses, bees" },
      { cn: "瀑布、峭壁、渔村、渔船", en: "waterfalls, cliffs, fishing villages, fishing boats" },
      { cn: "棕榈树、水池、棕榈叶小屋、沙漠狐狸", en: "palm trees, water pools, palm leaf huts, desert foxes" },
      { cn: "热带雨林、藤蔓、树屋、鹦鹉", en: "rainforest, vines, treehouses, parrots" },
      { cn: "山峰、云雾、古松、寺庙", en: "mountain peaks, clouds, ancient pines, temple" },
      { cn: "樱花树、神社、木桥、狐狸雕像", en: "cherry blossom trees, shrine, wooden bridge, fox statues" }
    ]
  },

  lighting_time: {
    label: { cn: "时间光照", en: "Lighting Time" },
    category: "visual",
    options: [
      { cn: "清晨阳光", en: "morning sunlight" },
      { cn: "午后金色阳光", en: "afternoon golden sunlight" },
      { cn: "日落霞光", en: "sunset glow" },
      { cn: "正午明亮阳光", en: "midday bright sunlight" },
      { cn: "黎明柔光", en: "dawn soft light" },
      { cn: "黄昏暮光", en: "dusk twilight" },
      { cn: "月光", en: "moonlight" },
      { cn: "多云漫射光", en: "overcast diffused light" }
    ]
  },

  detail_level: {
    label: { cn: "细节程度", en: "Detail Level" },
    category: "visual",
    options: [
{
  "cn": "细节丰富",
  "en": "rich in details"
},
      { cn: "复杂细节", en: "intricate details" },
      { cn: "超精细细节", en: "ultra-fine details" },
      { cn: "微观细节", en: "microscopic details" },
      { cn: "精致纹理", en: "refined textures" },
      { cn: "写实细节", en: "realistic details" },
      { cn: "极简细节", en: "minimalist details" }
    ]
  },

  glass_effect: {
    label: { cn: "玻璃效果", en: "Glass Effect" },
    category: "visual",
    options: [
      { cn: "真实玻璃反射", en: "realistic glass reflections" },
      { cn: "水晶般透明", en: "crystal clear transparency" },
      { cn: "玻璃折射效果", en: "glass refraction effects" },
      { cn: "彩虹色反光", en: "iridescent reflections" },
      { cn: "磨砂玻璃质感", en: "frosted glass texture" },
      { cn: "厚重玻璃边缘", en: "thick glass edges" },
      { cn: "玻璃高光", en: "glass highlights" },
      { cn: "透明玻璃效果", en: "transparent glass effects" }
    ]
  },

  background_type: {
    label: { cn: "背景类型", en: "Background Type" },
    category: "visual",
    options: [
      { cn: "工作室背景", en: "studio background" },
      { cn: "极简纯色背景", en: "minimalist solid color background" },
      { cn: "渐变背景", en: "gradient background" },
      { cn: "白色背景", en: "white background" },
      { cn: "深色背景", en: "dark background" },
      { cn: "模糊自然背景", en: "blurred natural background" },
      { cn: "纹理背景", en: "textured background" },
      { cn: "无缝背景", en: "seamless background" }
    ]
  },

  museum_theme: {
    label: { cn: "博物馆主题", en: "Museum Theme" },
    category: "other",
    options: [
      { cn: "明制汉服", en: "Ming Dynasty Hanfu" },
      { cn: "唐代官服", en: "Tang Dynasty Official Robe" },
      { cn: "宋代文人便服", en: "Song Dynasty Scholar Casual Wear" },
      { cn: "清代朝服", en: "Qing Dynasty Court Attire" },
      { cn: "汉代曲裾深衣", en: "Han Dynasty Quju Shenyi Robe" },
      { cn: "中国古代甲胄", en: "Ancient Chinese Armor" },
      { cn: "斗栱（木构建筑构件）", en: "Dougong Timber Bracket" },
      { cn: "景泰蓝掐丝珐琅", en: "Cloisonné Enamel Craftsmanship" },
      { cn: "宋代汝窑青瓷", en: "Song Dynasty Ru Ware Celadon" },
      { cn: "敦煌供养人服饰", en: "Dunhuang Donor Figure Attire" },
      { cn: "传统云纹锦缎织物", en: "Traditional Cloud Pattern Brocade" },
      { cn: "清代满族女性旗装", en: "Qing Dynasty Manchu Women's Qi Attire" },
      { cn: "古代玉器与纹饰体系", en: "Ancient Jade and Decorative Pattern System" },
      { cn: "明式木质家具结构", en: "Ming Style Wooden Furniture Structure" }
    ]
  },

  ad_regional_style: {
    label: { cn: "广告地域风格", en: "Ad Regional Style" },
    category: "other",
    options: [
      { cn: "中式广告", en: "Chinese advertisements" },
      { cn: "日式广告", en: "Japanese advertisements" },
      { cn: "韩式广告", en: "Korean advertisements" },
      { cn: "意大利广告", en: "Italian advertisements" },
      { cn: "法式广告", en: "French advertisements" },
      { cn: "美式广告", en: "American advertisements" },
      { cn: "北欧风广告", en: "Nordic-style advertisements" },
      { cn: "港式复古广告", en: "Hong Kong retro-style advertisements" }
    ]
  },

  city_landmarks: {
    label: { cn: "对应地标", en: "City Landmarks" },
    category: "location",
    options: [
      { cn: "珠江新城双塔、猎德大桥、白云山轮廓、岭南骑楼", en: "Zhujiang New Town twin towers, Liede Bridge, Baiyun Mountain silhouette, Lingnan arcade buildings" },
      { cn: "外滩、东方明珠、陆家嘴天际线、石库门", en: "The Bund, Oriental Pearl Tower, Lujiazui skyline, Shikumen" },
      { cn: "故宫角楼、国贸CBD、胡同灰瓦、天坛剪影", en: "Forbidden City corner towers, Guomao CBD, hutong grey tiles, Temple of Heaven silhouette" },
      { cn: "平安金融中心、深圳湾大桥、莲花山、滨海天际线", en: "Ping An IFC, Shenzhen Bay Bridge, Lianhuashan, coastal skyline" },
      { cn: "雷峰塔、三潭印月、钱江新城、南宋御街", en: "Leifeng Pagoda, Three Pools Mirroring the Moon, Qianjiang New Town, Southern Song Imperial Street" },
      { cn: "九眼桥、太古里、青城山轮廓、锦江夜色", en: "Jiuyan Bridge, Taikoo Li, Qingcheng Mountain silhouette, Jinjiang River night" },
      { cn: "大雁塔、城墙、钟楼、大唐不夜城", en: "Giant Wild Goose Pagoda, city wall, Bell Tower, Datang Everbright City" },
      { cn: "洪崖洞、长江索道、两江交汇、山城夜景", en: "Hongya Cave, Yangtze River cableway, two rivers merge, mountain city night view" },
      { cn: "紫峰大厦、长江大桥、中山陵、秦淮河", en: "Zifeng Tower, Nanjing Yangtze River Bridge, Sun Yat-sen Mausoleum, Qinhuai River" },
      { cn: "苏州园林亭台、东方之门、古运河、平江路", en: "Suzhou classical garden pavilions, Gate of the Orient, ancient canal, Pingjiang Road" }
    ]
  },

  poster_texture_style: {
    label: { cn: "纹理样式", en: "Texture Style" },
    category: "visual",
    options: [
      { cn: "大面积留白 + 淡宣纸肌理", en: "Generous negative space with light rice-paper grain" },
      { cn: "绢本淡纹 + 柔和丝感", en: "Subtle silk-scroll weave with soft sheen" },
      { cn: "微颗粒岩彩 + 手工纸触感", en: "Fine mineral pigment grain with handmade paper tactility" },
      { cn: "祥云水纹浮雕烫金质感", en: "Embossed auspicious clouds and water ripples with gold-foil hot-stamp feel" },
      { cn: "云纹锦缎肌理 + 低调光泽", en: "Brocade cloud pattern texture with understated luster" },
      { cn: "冰裂釉纹 + 清透层次", en: "Crackle-glaze pattern with clear layered depth" }
    ]
  },

  classical_poem: {
    label: { cn: "经典诗词篇目", en: "Classical Poem" },
    category: "other",
    options: [
      { cn: "春夜喜雨", en: "A Welcome Rain on a Spring Night" },
      { cn: "静夜思", en: "Quiet Night Thoughts" },
      { cn: "登鹳雀楼", en: "On the Stork Tower" },
      { cn: "悯农（其一）", en: "Pity the Farmers (Part One)" },
      { cn: "咏鹅", en: "Ode to the Goose" },
      { cn: "望庐山瀑布", en: "Gazing at the Waterfall on Mount Lu" },
      { cn: "江雪", en: "River Snow" },
      { cn: "赠汪伦", en: "To Wang Lun" },
      { cn: "游子吟", en: "Song of the Wandering Son" },
      { cn: "回乡偶书", en: "Homecoming" },
      { cn: "敕勒歌", en: "Song of Chile" },
      { cn: "早发白帝城", en: "Early Departure from Baidi City" },
      { cn: "枫桥夜泊", en: "Mooring at Maple Bridge by Night" },
      { cn: "清明", en: "Qingming" },
      { cn: "黄鹤楼送孟浩然之广陵", en: "Seeing Meng Haoran Off at Yellow Crane Tower" }
    ]
  },

  app_icon_category: {
    label: { cn: "APP 品类", en: "App Category" },
    category: "other",
    options: [
      { cn: "运动类APP", en: "Sports app" },
      { cn: "医疗健康", en: "Health & medical" },
      { cn: "本地生活", en: "Local services" },
      { cn: "金融理财", en: "Finance & wealth" },
      { cn: "教育学习", en: "Education" },
      { cn: "社交娱乐", en: "Social & entertainment" },
      { cn: "电商购物", en: "E-commerce" },
      { cn: "出行导航", en: "Travel & navigation" }
    ]
  },

  collab_theme_a: {
    label: { cn: "联名主题 A（文学/童话 IP）", en: "Collab Theme A (Story IP)" },
    category: "other",
    options: [
      { cn: "小王子", en: "The Little Prince" },
      { cn: "龙猫", en: "My Neighbor Totoro" },
      { cn: "千与千寻", en: "Spirited Away" },
      { cn: "哈利·波特", en: "Harry Potter" },
      { cn: "魔戒", en: "The Lord of the Rings" },
      { cn: "小王子（原版插画风格）", en: "Le Petit Prince (original illustration style)" },
      { cn: "爱丽丝梦游仙境", en: "Alice in Wonderland" },
      { cn: "彼得·潘", en: "Peter Pan" }
    ]
  },

  collab_theme_b: {
    label: { cn: "联名主题 B（科技/航天/科幻）", en: "Collab Theme B (Tech / Space / Sci-Fi)" },
    category: "other",
    options: [
      { cn: "SpaceX", en: "SpaceX" },
      { cn: "NASA", en: "NASA" },
      { cn: "中国航天", en: "China National Space Administration (CNSA)" },
      { cn: "欧洲航天局 (ESA)", en: "European Space Agency (ESA)" },
      { cn: "Blue Origin", en: "Blue Origin" },
      { cn: "星际迷航", en: "Star Trek" },
      { cn: "星球大战", en: "Star Wars" },
      { cn: "国际空间站", en: "International Space Station" }
    ]
  },

  card_game_collection: {
    label: { cn: "卡牌集主题", en: "Card Collection Theme" },
    category: "other",
    options: [
      { cn: "中国古代诗人", en: "Ancient Chinese poets" },
      { cn: "水浒英雄", en: "Water Margin heroes" },
      { cn: "三国人物", en: "Three Kingdoms characters" },
      { cn: "西游记人物", en: "Journey to the West characters" },
      { cn: "唐宋名家", en: "Tang and Song masters" },
      { cn: "仙侠武侠名士", en: "Wuxia and immortal heroes" },
      { cn: "封神演义人物", en: "Investiture of the Gods characters" }
    ]
  },

  ancient_celebrity: {
    label: { cn: "古代名人", en: "Historical Figure" },
    category: "character",
    options: [
      { cn: "苏轼", en: "Su Shi" },
      { cn: "李白", en: "Li Bai" },
      { cn: "杜甫", en: "Du Fu" },
      { cn: "王羲之", en: "Wang Xizhi" },
      { cn: "李清照", en: "Li Qingzhao" },
      { cn: "陆游", en: "Lu You" },
      { cn: "辛弃疾", en: "Xin Qiji" },
      { cn: "王维", en: "Wang Wei" },
      { cn: "白居易", en: "Bai Juyi" },
      { cn: "欧阳修", en: "Ouyang Xiu" },
      { cn: "陶渊明", en: "Tao Yuanming" }
    ]
  },

  heritage_building: {
    label: { cn: "中式地标建筑", en: "Chinese Heritage Building" },
    category: "location",
    options: [
      { cn: "天坛", en: "Temple of Heaven" },
      { cn: "故宫（紫禁城）", en: "Forbidden City" },
      { cn: "颐和园", en: "Summer Palace" },
      { cn: "大雁塔", en: "Giant Wild Goose Pagoda" },
      { cn: "布达拉宫", en: "Potala Palace" },
      { cn: "拙政园", en: "Humble Administrator's Garden" },
      { cn: "黄鹤楼", en: "Yellow Crane Tower" },
      { cn: "岳阳楼", en: "Yueyang Tower" },
      { cn: "滕王阁", en: "Tengwang Pavilion" },
      { cn: "应县木塔", en: "Ying County Wooden Pagoda" },
      { cn: "悬空寺", en: "Hanging Temple" }
    ]
  },

  retro_device_theme: {
    label: { cn: "老式设备品类", en: "Vintage Device Category" },
    category: "item",
    options: [
      { cn: "老式电子设备", en: "vintage electronic devices" },
      { cn: "老式家用电器", en: "vintage home appliances" },
      { cn: "老式影音设备", en: "vintage audio and video equipment" },
      { cn: "老式通讯设备", en: "vintage communication devices" },
      { cn: "老式计算机与存储介质", en: "vintage computers and storage media" },
      { cn: "80-90年代数码产品", en: "1980s–90s digital gadgets" }
    ]
  },

  utility_app_category: {
    label: { cn: "App 种类", en: "App Category" },
    category: "other",
    options: [
      { cn: "植物照顾养护记录", en: "plant care and maintenance tracker" },
      { cn: "运动健身打卡", en: "workout and fitness check-in" },
      { cn: "饮水与饮食记录", en: "water intake and meal logging" },
      { cn: "睡眠与作息管理", en: "sleep and daily routine" },
      { cn: "习惯养成打卡", en: "habit tracking" },
      { cn: "读书笔记与书单", en: "reading notes and book list" },
      { cn: "宠物喂养与健康", en: "pet feeding and health log" },
      { cn: "家庭记账与预算", en: "household budgeting" }
    ]
  },

  subject_product: {
    label: { cn: "主题产品", en: "Subject Product" },
    category: "item",
    options: [
{
  "cn": "香水瓶",
  "en": "a perfume bottle"
},
      { cn: "草莓苏打水", en: "Strawberry Soda" },
      { cn: "榴莲冰淇淋", en: "Durian Ice Cream" },
      { cn: "西柚香水", en: "Grapefruit Perfume" },
      { cn: "抹茶拿铁", en: "Matcha Latte" },
      { cn: "胶原蛋白面霜", en: "Collagen Face Cream" },
      { cn: "燕麦奶", en: "Oat Milk" },
      { cn: "蓝莓味口香糖", en: "Blueberry Gum" },
      { cn: "薄荷香膏", en: "Peppermint Balm" },
      { cn: "青苹果味能量饮料", en: "Green Apple Energy Drink" },
      { cn: "薰衣草香薰蜡烛", en: "Lavender Scented Candle" },
      { cn: "龙井茶", en: "Longjing Tea" }
    ]
  },

  apple_style_product: {
    label: { cn: "苹果风产品", en: "Apple Style Product" },
    category: "item",
    options: [
{
  "cn": "无线耳机",
  "en": "wireless earbuds"
},
      { cn: "3.5寸软盘", en: "3.5-inch Floppy Disk" },
      { cn: "磁带", en: "Cassette Tape" },
      { cn: "复古打字机", en: "Retro Typewriter" },
      { cn: "胶卷相机", en: "Film Camera" },
      { cn: "留声机", en: "Gramophone" },
      { cn: "复古游戏机", en: "Retro Game Console" }
    ]
  },

  layout_style_bento: {
    label: { cn: "Bento 布局风格", en: "Bento Layout Style" },
    category: "visual",
    options: [
      { cn: "BentoCard", en: "BentoCard" },
      { cn: "模块化布局", en: "Modular Layout" },
      { cn: "极简网格", en: "Minimalist Grid" },
      { cn: "磁贴设计", en: "Tile Design" }
    ]
  },

  arch_building_name: {
    label: { cn: "建筑名称", en: "Building Name" },
    category: "location",
    options: [
      { cn: "古根海姆博物馆", en: "Solomon R. Guggenheim Museum" },
      { cn: "蓬皮杜艺术中心", en: "Centre Pompidou" },
      { cn: "悉尼歌剧院", en: "Sydney Opera House" },
      { cn: "央视总部大楼（大裤衩）", en: "CCTV Headquarters" },
      { cn: "流水别墅", en: "Fallingwater" },
      { cn: "北京大兴国际机场", en: "Beijing Daxing International Airport" },
      { cn: "上海中心大厦", en: "Shanghai Tower" },
      { cn: "卢浮宫玻璃金字塔", en: "Louvre Pyramid" },
      { cn: "圣家堂", en: "Sagrada Família" },
      { cn: "国家体育场（鸟巢）", en: "Beijing National Stadium (Bird's Nest)" }
    ]
  },

  lego_typography_theme: {
    label: { cn: "海报主题", en: "Poster Theme" },
    category: "other",
    options: [
      { cn: "AI时代的玩具", en: "Toys in the Age of AI" },
      { cn: "算法与童年", en: "Algorithms and Childhood" },
      { cn: "云端造梦工厂", en: "Cloud Dream Factory" },
      { cn: "模块化好奇心", en: "Modular Curiosity" },
      { cn: "数字孪生游乐场", en: "Digital Twin Playground" },
      { cn: "创造力拼装指南", en: "Creativity Assembly Guide" },
      { cn: "人机共玩的未来", en: "Human–Machine Co-Play Futures" },
      { cn: "像素与颗粒的对话", en: "Dialogue of Pixels and Grains" },
      { cn: "温柔的智能体", en: "Gentle Intelligent Agents" },
      { cn: "造物者的积木箱", en: "The Creator's Brick Box" }
    ]
  },

  sport_luxe_ensemble: {
    label: { cn: "运动奢潮造型", en: "Sport-Luxe Outfit" },
    category: "item",
    options: [
      {
        cn: "带有庞大袖子的超大白色极简连帽衫，光滑半透明的降落伞裤，厚重的白橙相间运动鞋",
        en: "oversized minimalist white hoodie with enormous voluminous sleeves, glossy semi-transparent parachute pants, chunky white-and-orange sneakers"
      },
      {
        cn: "哑光黑色技术感风衣式连帽外套，炭灰色机能束脚裤，银灰厚底跑鞋",
        en: "matte black tech-shell hooded windbreaker, charcoal gray technical cinched pants, silver-gray chunky running shoes"
      },
      {
        cn: "珍珠白带反光条的短款面包羽绒服，雾面深蓝阔腿尼龙裤，荧光绿鞋带机能鞋",
        en: "pearl-white short puffer with reflective stripes, matte navy wide nylon pants, tech sneakers with neon green laces"
      },
      {
        cn: "冰灰半透明叠穿长袖与雕塑感抹胸，金属银高腰运动短裙，黑白熊猫配色限量球鞋",
        en: "icy gray layered sheer long sleeves with sculptural bandeau, metallic silver high-waist sport skirt, black-and-white panda limited sneakers"
      },
      {
        cn: "燕麦色垂坠卫衣与可充气感绗缝马甲，浅香槟降落伞裤，奶油白厚底训练鞋",
        en: "oatmeal draped sweatshirt with quilted inflatable-feel vest, champagne parachute pants, cream chunky trainers"
      },
      {
        cn: "电光丁香紫短款防风夹克，黑曜石漆光 Legging，透明气垫厚底鞋",
        en: "electric lilac cropped windbreaker, obsidian glossy leggings, transparent air-cushion platform sneakers"
      },
      {
        cn: "赤陶红单肩解构剪裁卫衣，沙色半透明叠层长裤，做旧米白复古跑鞋",
        en: "terracotta one-shoulder deconstructed sweatshirt, sand-toned sheer layered trousers, distressed off-white retro runners"
      },
      {
        cn: "钴蓝无缝压胶冲锋衣，石墨黑阔腿裤，霓虹粉细节的高帮篮球鞋",
        en: "cobalt blue seam-taped shell jacket, graphite black wide-leg pants, high-top basketball shoes with neon pink accents"
      }
    ]
  },

  beauty_editorial_look: {
    label: { cn: "妆发与配饰", en: "Hair & Beauty" },
    category: "character",
    options: [
      {
        cn: "时尚凌乱的盘发发型，金色抢眼耳环，柔和自然的妆容",
        en: "fashionably messy updo bun, bold statement gold earrings, soft natural makeup"
      },
      {
        cn: "湿发感低马尾，细长银质耳线，清透裸感底妆与裸色唇",
        en: "sleek wet-look low ponytail, slim silver ear threads, glass-skin nude base and nude lips"
      },
      {
        cn: "锋利中分直发，几何亚克力耳环，哑光烟棕眼妆与克制修容",
        en: "sharp center-part straight hair, geometric acrylic earrings, matte smoked-brown eye makeup with restrained contour"
      },
      {
        cn: "慵懒半扎高发髻，珍珠耳钉，雾面蜜桃腮红与微光高光",
        en: "lazy half-up topknot, pearl studs, matte peach blush with subtle highlight"
      },
      {
        cn: "超短精灵剪层次发，环形金属耳饰，冷调 rose 裸妆",
        en: "layered pixie crop, hoop metal jewelry, cool-toned rose nude makeup"
      },
      {
        cn: "蓬松高颅顶低盘发，水晶吊坠耳环，健康光泽感肤色与淡烟熏",
        en: "full low bun with lifted root volume, crystal drop earrings, healthy luminous skin with soft smoky eyes"
      },
      {
        cn: "紧束光滑马尾，粗链条耳骨夹，干净锋利眉形与正红唇",
        en: "slick tight ponytail, chunky chain ear cuff, crisp brows with classic red lips"
      },
      {
        cn: "侧分波浪长发，单颗水滴钻耳饰，暖调香槟眼影",
        en: "side-parted soft waves, single teardrop crystal earring, warm champagne eyeshadow"
      }
    ]
  },

  inflatable_studio_backdrop: {
    label: { cn: "充气装置与背景", en: "Inflatable Set & Backdrop" },
    category: "visual",
    options: [
      {
        cn: "大型抽象光滑红粉色有机3D充气软体形状的平滑中性米色渐变背景",
        en: "large abstract smooth red-pink organic 3D inflatable soft shapes on a smooth neutral beige gradient backdrop"
      },
      {
        cn: "淡薰衣草与电紫双色有机充气雕塑，冷雾灰无缝影棚渐变",
        en: "lavender and electric purple organic inflatable sculptures with a cool fog-gray seamless studio gradient"
      },
      {
        cn: "薄荷绿与青玉色透明感充气管道交织，浅海蓝到乳白的纵向渐变",
        en: "mint and jade translucent inflatable tubes interwoven, seafoam-to-cream vertical gradient"
      },
      {
        cn: "沙金色沙丘状充气体与镜面反射地台，暖白柔光雾背景",
        en: "sand-gold dune-like inflatables on a reflective stage, warm white hazy studio background"
      },
      {
        cn: "炭黑与铬银的未来感堆叠充气块，暗角压暗的高级灰场域",
        en: "stacked charcoal-and-chrome futuristic inflatable blocks, premium gray field with subtle vignette"
      },
      {
        cn: "珊瑚橘与玫瑰粉碎形充气花瓣团簇，柔粉腮红式渐变天空",
        en: "coral and blush fragmented inflatable petal clusters, soft rose-blush gradient sky"
      },
      {
        cn: "半透明乳胶感月白充气环与拱门，极浅珍珠灰环境",
        en: "semi-opaque latex-like moon-white inflatable rings and arches, ultra-light pearl-gray environment"
      }
    ]
  },

  hero_typography_word: {
    label: { cn: "身后主标题字", en: "Hero Type Word" },
    category: "other",
    options: [
{
  "cn": "纵有疾风起",
  "en": "纵有疾风起"
},
      { cn: "just", en: "just" },
      { cn: "RUN", en: "RUN" },
      { cn: "AIR", en: "AIR" },
      { cn: "FLOW", en: "FLOW" },
      { cn: "VOID", en: "VOID" },
      { cn: "RISE", en: "RISE" },
      { cn: "PULSE", en: "PULSE" },
      { cn: "SHIFT", en: "SHIFT" }
    ]
  },

  campaign_brand_word: {
    label: { cn: "品牌主视觉词", en: "Campaign Brand Word" },
    category: "other",
    options: [
      { cn: "STRIDE", en: "STRIDE" },
      { cn: "DRIFT", en: "DRIFT" },
      { cn: "APEX", en: "APEX" },
      { cn: "LUMEN", en: "LUMEN" },
      { cn: "FORGE", en: "FORGE" },
      { cn: "PRISM", en: "PRISM" },
      { cn: "ECHO", en: "ECHO" },
      { cn: "VAULT", en: "VAULT" }
    ]
  },

  model_styling_outfit: {
    label: { cn: "模特着装", en: "Model Outfit" },
    category: "character",
    options: [
      {
        cn: "身穿全身白色超宽松运动套装",
        en: "in an all-white oversized sweatsuit"
      },
      {
        cn: "身穿燕麦灰与纯白拼色宽松卫衣套装",
        en: "in an oatmeal-gray and pure white tonal oversized hoodie and sweatpants set"
      },
      {
        cn: "身穿黑色极简收腰运动夹克与同色阔腿运动裤",
        en: "in a black minimalist cropped track jacket with matching wide-leg sweatpants"
      },
      {
        cn: "身穿薄荷绿短款防风外套与乳白色宽松慢跑裤",
        en: "in a mint cropped windbreaker with cream oversized joggers"
      },
      {
        cn: "身穿海军蓝丝绒质感运动卫衣与侧边条纹裤",
        en: "in a navy plush velour sweatshirt with side-stripe athletic pants"
      },
      {
        cn: "身穿珍珠白解构剪裁拉链上衣与收口运动裤",
        en: "in a pearl-white deconstructed zip sweatshirt with cuffed sweatpants"
      },
      {
        cn: "身穿沙色工装感连帽马甲叠穿白色长袖内搭与阔腿裤",
        en: "in a sand utility hoodie vest layered over a white long-sleeve and wide cargo sweats"
      },
      {
        cn: "身穿电光丁香紫哑光运动连体衣外罩廓形白衬衫",
        en: "in a lilac matte athletic jumpsuit layered under an oversized crisp white shirt"
      }
    ]
  },

  studio_set_floor: {
    label: { cn: "影棚与地面", en: "Studio Backdrop & Floor" },
    category: "visual",
    options: [
      {
        cn: "浅蓝色影棚背景，带有高光反射的光滑亮面地面",
        en: "Light blue studio background with reflective glossy floor"
      },
      {
        cn: "冰川灰渐变无缝背景，湿润感镜面地面反射鞋与人物轮廓",
        en: "Ice-gray gradient seamless backdrop, wet-look mirrored floor reflecting the sneaker silhouette"
      },
      {
        cn: "柔和的雾粉到乳白渐变，半哑光釉面地面",
        en: "Soft blush-to-cream gradient, semi-gloss enamel studio floor"
      },
      {
        cn: "深炭黑无底穴式影棚，高抛光黑曜石地板",
        en: "deep charcoal infinite black studio void, polished obsidian-black floor"
      },
      {
        cn: "冷薄荷绿单色背景与轻微雾化地面高光",
        en: "cool mint monochrome cyclorama with subtle haze and floor highlights"
      },
      {
        cn: "暖沙色柔光环境与浅琥珀色打蜡地面",
        en: "warm sand-toned soft light with lightly amber-waxed glossy floorboards"
      },
      {
        cn: "纯白无限延伸背景与漆光地面，边缘微冷蓝遮光",
        en: "pure white infinity cyc with lacquered floor, faint cool-blue falloff at edges"
      }
    ]
  },

  advert_campaign_tagline: {
    label: { cn: "底部广告标语", en: "Campaign Tagline" },
    category: "other",
    options: [
{
  "cn": "BOSTON, A CITY OF RIVER, MEMORY, AND INVENTION",
  "en": "BOSTON, A CITY OF RIVER, MEMORY, AND INVENTION"
},
{
  "cn": "凌晨两点还在排队的那家",
  "en": "the one with a queue even at 2 AM"
},
{
  "cn": "AI PRESENTATION PLATFORM",
  "en": "AI PRESENTATION PLATFORM"
},
      {
        cn: "Walk into your next chapter.",
        en: "Walk into your next chapter."
      },
      {
        cn: "Step outside the timeline.",
        en: "Step outside the timeline."
      },
      {
        cn: "Lace up. Level up.",
        en: "Lace up. Level up."
      },
      {
        cn: "Momentum is your birthright.",
        en: "Momentum is your birthright."
      },
      {
        cn: "Soft landing. Loud statement.",
        en: "Soft landing. Loud statement."
      },
      {
        cn: "Where comfort meets ambition.",
        en: "Where comfort meets ambition."
      },
      {
        cn: "未来从脚下开始。",
        en: "Your future begins at your feet."
      },
      {
        cn: "把下一步走成主场。",
        en: "Make your next step your spotlight."
      }
    ]
  },

  iconic_architecture: {
    label: { cn: "知名建筑", en: "Iconic Architecture" },
    category: "location",
    options: [
      { cn: "范斯沃斯住宅（密斯·凡·德罗）", en: "Farnsworth House (Mies van der Rohe)" },
      { cn: "萨伏伊别墅（勒·柯布西耶）", en: "Villa Savoye (Le Corbusier)" },
      { cn: "流水别墅（赖特）", en: "Fallingwater (Frank Lloyd Wright)" },
      { cn: "悉尼歌剧院（乌松）", en: "Sydney Opera House (Jørn Utzon)" },
      { cn: "金贝尔美术馆（路易·康）", en: "Kimbell Art Museum (Louis Kahn)" },
      { cn: "巴特罗之家（高迪）", en: "Casa Batlló (Antoni Gaudí)" },
      { cn: "光之教堂（安藤忠雄）", en: "Church of the Light (Tadao Ando)" },
      { cn: "古根海姆博物馆纽约馆（赖特）", en: "Solomon R. Guggenheim Museum (Frank Lloyd Wright)" },
      { cn: "国家美术馆东馆（贝聿铭）", en: "National Gallery East Building (I. M. Pei)" },
      { cn: "耶鲁大学英国艺术中心（路易·康）", en: "Yale Center for British Art (Louis Kahn)" },
      { cn: "毕尔巴鄂古根海姆博物馆（弗兰克·盖里）", en: "Guggenheim Museum Bilbao (Frank Gehry)" },
      { cn: "巴塞罗那德国馆（密斯·凡·德罗）", en: "Barcelona Pavilion (Mies van der Rohe)" },
      { cn: "朗香教堂（勒·柯布西耶）", en: "Notre Dame du Haut Chapel, Ronchamp (Le Corbusier)" },
      { cn: "香港中银大厦（贝聿铭）", en: "Bank of China Tower Hong Kong (I. M. Pei)" },
      { cn: "伦敦劳埃德大厦（理查·罗杰斯）", en: "Lloyd's Building, London (Richard Rogers)" }
    ]
  },

  poster_art_style: {
    label: { cn: "海报风格", en: "Poster Aesthetic" },
    category: "visual",
    options: [
      { cn: "极简主义", en: "minimalist" },
      { cn: "构成主义倾向", en: "constructivist-leaning" },
      { cn: "新客观与理性排版", en: "Neo-objective rational layout" },
      { cn: "粗野诗意", en: "brutalist-poetic" },
      { cn: "日本物派式克制", en: "Mono-ha-inspired restraint" },
      { cn: "国际式纯粹派", en: "International Style purism" },
      { cn: "当代展览图录风", en: "contemporary exhibition catalogue" },
      { cn: "博物馆级收藏纸质感", en: "museum-grade archival sheet aesthetic" },
      { cn: "包豪斯工坊海报气质", en: "Bauhaus workshop poster temperament" },
      { cn: "晚期现代肃穆感", en: "late-modern solemn typography" }
    ]
  },

  casual_mirror_outfit: {
    label: { cn: "镜子自拍穿搭与配饰", en: "Mirror Outfit & Accessories" },
    category: "character",
    options: [
{
  "cn": "随意的灰色居家服",
  "en": "casual gray loungewear"
},
      {
        cn: "穿着全套黑色的休闲装，斜挎着一个包，头上戴着太阳镜",
        en: "wearing an all-black relaxed casual outfit with a crossbody bag and sunglasses perched on her head"
      },
      {
        cn: "身穿燕麦米色针织套装与同色棒球帽，肩背迷你链条包",
        en: "wearing an oatmeal knit co-ord set with a tonal baseball cap and a mini chain-strap shoulder bag"
      },
      {
        cn: "炭灰工装夹克配黑色骑行短裤，腰间斜挎亮色尼龙小包，头戴猫眼墨镜",
        en: "charcoal utility jacket over black bike shorts with a neon nylon crossbody and cat-eye sunglasses on her head"
      },
      {
        cn: "白色宽松衬衫半扎进高腰牛仔裤，草编托特包与肩挂耳机",
        en: "billowy white shirt half-tucked into high-waist jeans with a woven tote slung overhead and wired headphones draped around her shoulders"
      },
      {
        cn: "短款羽绒背心叠穿连帽卫衣，束脚慢跑裤与地面色系运动鞋",
        en: "cropped puffer layered over hoodie with cinched joggers and earth-tone trainers"
      },
      {
        cn: "丝绒运动套装与同色渔夫帽，透明框眼镜推高在发际",
        en: "matching velour tracksuit with a bucket hat and crystal-clear framed glasses resting on top of her head"
      },
      {
        cn: "淡紫短款针织开衫与百褶迷你裙，斜挎马鞍包与蝴蝶结发夹",
        en: "lilac cropped cardigan with pleated mini skirt, saddle crossbody, and satin bow clips"
      },
      {
        cn: "黑皮革飞行员夹克内搭白T恤，阔腿牛仔与厚底短靴",
        en: "black faux-leather aviator jacket over a white tee, wide-leg denim, and chunky Chelsea boots"
      }
    ]
  },

  chibi_clone_manner: {
    label: { cn: "Q版迷你自己", en: "Chibi Clone Behavior" },
    category: "character",
    options: [
      {
        cn: "摆出各种俏皮的姿势（跳跃、坐着、比耶、喝珍珠奶茶），有着明亮闪亮的大眼睛和柔和的卡通风格",
        en: "striking playful poses (jumping, sitting, peace sign, sipping bubble tea) with bright sparkling eyes and a soft cartoon look"
      },
      {
        cn: "有的在自拍连拍、有的在抱枕头打滚、有的在举咖啡杯干杯",
        en: "some snapping selfies, others hugging cushions mid-roll, one toasting tiny coffee cups toward the viewer"
      },
      {
        cn: "手拉手转圈、比爱心、倒立踢腿，眼珠高光像糖果釉",
        en: "hand-in-hand spins, forming heart hands, cheeky cartwheels—eyes glazed like candy-coated highlights"
      },
      {
        cn: "围成一排做鬼脸、敬礼、比心，发丝像棉花糖云朵",
        en: "queued up making silly faces, saluting, throwing finger hearts—hair tufts sculpted like pastel cotton candy"
      },
      {
        cn: "蹲在肩膀上当导航精灵、指路、举牌写「today mood」",
        en: "perched on shoulders like sprites pointing directions and holding handwritten Today Mood signs"
      },
      {
        cn: "打迷你太极、敷面膜、踮脚挂画，像在帮忙布置房间",
        en: "mini tai-chi gestures, masking together, stretching on tiptoes to hang frames as if staging the apartment"
      },
      {
        cn: "踩在沙发沿走平衡木、端着迷你甜品塔、仰头大笑",
        en: "balancing along sofa edges balancing like beams, hauling tiny dessert tiers, giggling upwards with open mouths"
      },
      {
        cn: "戴同款迷你墨镜排成V字编队，像在拍女团封面",
        en: "lining up in mirrored micro-sunglasses in a V formation like a idol group key visual"
      }
    ]
  },

  cozy_mirror_room: {
    label: { cn: "镜面房间陈设", en: "Mirror Room Set" },
    category: "location",
    options: [
      {
        cn: "背景包括一盆盆栽、木桌、中性色调的装饰和带框艺术品",
        en: "The background includes a potted plant, a wooden table, neutral-toned décor, and framed artwork"
      },
      {
        cn: "落地镜旁有藤编置物架、米色地毯与陶瓷花瓶里的干芦苇",
        en: "Floor-length mirror framed by wicker shelving, oatmeal rug, and dried pampas in a ceramic vase"
      },
      {
        cn: "浅橡木置物板、黄铜壁灯抽象画与小型琴叶榕",
        en: "floating oak shelving, brushed brass sconces beside abstract lithographs, and a compact fiddle-leaf fig"
      },
      {
        cn: "白色石膏雕塑、哑光灰墙面与半透明亚麻窗帘透出柔光",
        en: "plaster objet on plinths, matte grey walls with sheer linen curtain diffusing daylight"
      },
      {
        cn: "窗边阅读角：堆叠画报、玻璃杯里的冰咖啡与米色针织披毯",
        en: "window reading nook with stacked magazines, iced coffee sweating in a ribbed glass, and a knit throw"
      },
      {
        cn: "洞洞板上挂耳机与小盆栽，桌面上香薰蜡烛与速写本",
        en: "pegboard with headphones clipped beside mini succulents, desk scented candle and charcoal sketch pads"
      },
      {
        cn: "哑光黑金属框镜子、碳化木边几与单色摄影挂画",
        en: "dark metal mirror frame beside char-stained wood side table with monochrome photographic prints"
      },
      {
        cn: "软陶花瓶、沙丘色微水泥墙面与悬浮式 LED 灯带",
        en: "soft clay vases, dunes-toned micro-ceiling walls, recessed LED ribbons washing the alcove evenly"
      }
    ]
  },

  selfie_render_blend: {
    label: { cn: "光影与混搭画风", en: "Light & Hybrid Style" },
    category: "visual",
    options: [
      {
        cn: "柔和的自然光线，舒适的氛围美学，白色的涂鸦闪光和爱心，现实主义与可爱的3D卡通风格的混合，高细节",
        en: "Soft natural light, cozy lifestyle aesthetic, white doodled sparkles and hearts, hybrid of photorealism and cute 3D cartoon, highly detailed"
      },
      {
        cn: "南向窗柔和的晨雾漫射光，微尘颗粒与手绘星星贴纸叠在前景",
        en: "hazy southern window morning light with visible dust motes layered under hand-painted star decals in foreground"
      },
      {
        cn: "胶片感颗粒、暖调高键曝光，霓虹粉手写涂鸦却只出现在Q版身上",
        en: "fine film grain with warm high-key exposure, neon-pink handwritten doodles constrained to chibi sprites only"
      },
      {
        cn: "黄金时刻侧光拉出清晰轮廓线，粉笔质感的爱心沿着镜框飞舞",
        en: "golden-hour side rays carving crisp contours, chalk-textured hearts fluttering along the mirror frame edges"
      },
      {
        cn: "柔和的顶光+环形补光，让真人肤质干净，Q版则呈搪瓷釉面高光",
        en: "soft top light plus faint ring-fill keeping skin immaculate while chibi forms read enamel-gloss highlighted"
      },
      {
        cn: "阴天漫射平顶光，水彩晕染的闪光点悬浮在空中",
        en: "flat overcast diffuser lighting with watercolor-bleeded sparkle motes drifting mid-air"
      },
      {
        cn: "低对比冷暖平衡，景深微浅仅突出镜面中心，贴纸风月亮与云朵点缀角落",
        en: "low-contrast balanced cool-warm grading, shallow DOF favoring lens center mirror with sticker moons drifting in corners"
      }
    ]
  },

  street_film_photography: {
    label: { cn: "摄影风格", en: "Photography Style" },
    category: "visual",
    options: [
      {
        cn: "90年代经典街拍质感，FujiFilm 胶片感：细腻颗粒、略褪色与柔和对比，阴天漫射自然光",
        en: "1990s classic street-snap feel with Fujifilm texture—fine grain, gentle fade, soft contrast, diffused overcast daylight"
      },
      {
        cn: "FujiFilm Superia / 400 彩负：略带品红与奶黄中间调，街头快照的即兴取景感",
        en: "Fujifilm Superia / 400 color negative—slight magenta lift with milky midtones, candid snapshot framing"
      },
      {
        cn: "Kodak Gold 200 暖调颗粒，高光柔软、阴影轻绿，略带哈气的阴天伦敦氛围",
        en: "Kodak Gold 200 warmth with grain, soft highlights, subtle green shadows misty London mood"
      },
      {
        cn: "Ilford HP5 黑白街拍：粗颗粒、高宽容度，强调结构与雨后沥青反光",
        en: "Ilford HP5 black-and-white street: bold grain, wide latitude, accentuating structure and wet asphalt sheen"
      },
      {
        cn: "90年代幻灯片正片质感：略过曝天空、边缘暗角、铬与玻璃的高光锐边",
        en: "1990s slide-film look: slightly blown skies, natural vignetting, crisp specular edges on chrome and glass"
      },
      {
        cn: "康泰时 T* 镜头的轻微柔焦高光与纵向色差，像相册里翻出来的旅行底片",
        en: "Contax T* soft highlight bloom with mild longitudinal CA, like a travel frame from a photo album"
      },
      {
        cn: "新闻纪实 135 彩负：中性灰场、低饱和但保留乐高原色，人物与车流略动感模糊",
        en: "Editorial 135 color negative—neutral gray field, desaturated ambience yet LEGO primaries pop, mild motion blur on traffic"
      },
      {
        cn: "金调偏光日出侧逆光，长阴影，电影感青橙分离（保持胶片颗粒）",
        en: "golden-hour side backlight with long shadows, cinematic teal-orange split while retaining analog grain"
      }
    ]
  },

  editorial_cover_theme: {
    label: { cn: "封面主题", en: "Cover Theme" },
    category: "other",
    options: [
      { cn: "前端部署工程师", en: "Front-end Deployment Engineer" },
      { cn: "提示词工程师", en: "Prompt Engineer" },
      { cn: "独立开发者", en: "Indie Developer" },
      { cn: "AI 产品经理", en: "AI Product Manager" },
      { cn: "远程办公", en: "Remote Work" },
      { cn: "知识库", en: "Knowledge Base" },
      { cn: "数字游民", en: "Digital Nomad" },
      { cn: "开源维护者", en: "Open Source Maintainer" },
      { cn: "数据隐私", en: "Data Privacy" },
      { cn: "创作者经济", en: "Creator Economy" },
      { cn: "算法推荐", en: "Algorithmic Feeds" },
      { cn: "屏幕疲劳", en: "Screen Fatigue" },
      { cn: "代码审查", en: "Code Review" },
      { cn: "侧边项目", en: "Side Project" }
    ]
  },

  editorial_cover_subtitle: {
    label: { cn: "封面副标题", en: "Cover Subtitle" },
    category: "other",
    options: [
      { cn: "自动判断（可留空）", en: "Auto (leave empty if unneeded)" },
      { cn: "从零开始，掌握核心技能", en: "From zero, master the core skills" },
      { cn: "人在用科技做什么", en: "What people do with technology" },
      { cn: "一次时代错位", en: "One anachronism" },
      { cn: "从想法到上线", en: "From idea to launch" },
      { cn: "属于今天的独立杂志", en: "An independent magazine of today" },
      { cn: "把抽象变成可触碰的事", en: "Make the abstract tangible" },
      { cn: "今天才会发生的话题", en: "A topic that could only happen today" }
    ]
  },

  editorial_cover_ratio: {
    label: { cn: "封面画幅", en: "Cover Ratio" },
    category: "visual",
    options: [
      { cn: "自动", en: "Auto" },
      { cn: "3:4", en: "3:4" },
      { cn: "4:5", en: "4:5" },
      { cn: "9:16", en: "9:16" },
      { cn: "1:1", en: "1:1" },
      { cn: "16:9", en: "16:9" },
      { cn: "5:2", en: "5:2" },
      { cn: "3:1", en: "3:1" }
    ]
  },

  editorial_cover_cast: {
    label: { cn: "人物设定", en: "Cast" },
    category: "character",
    options: [
      { cn: "自动判断", en: "Auto" },
      { cn: "女性", en: "Female" },
      { cn: "男性", en: "Male" },
      { cn: "一男一女", en: "One woman and one man" },
      { cn: "双女性", en: "Two women" },
      { cn: "双男性", en: "Two men" },
      { cn: "工程师", en: "Engineer" },
      { cn: "编辑 / 学者", en: "Editor / Scholar" },
      { cn: "工作搭档", en: "Work partners" },
      { cn: "三人以内小群像", en: "Small group of three or fewer" }
    ]
  },

  editorial_cover_emotion: {
    label: { cn: "情感倾向", en: "Emotional Tone" },
    category: "visual",
    options: [
      { cn: "自动判断", en: "Auto" },
      { cn: "温暖", en: "Warm" },
      { cn: "治愈", en: "Healing" },
      { cn: "理性", en: "Rational" },
      { cn: "克制", en: "Restrained" },
      { cn: "浪漫", en: "Romantic" },
      { cn: "神秘", en: "Mysterious" },
      { cn: "怪诞", en: "Uncanny" },
      { cn: "冷峻", en: "Austere" },
      { cn: "幽默", en: "Humorous" },
      { cn: "戏剧化", en: "Dramatic" }
    ]
  },

  memory_core: {
    label: { cn: "记忆核心", en: "Memory Core" },
    category: "visual",
    options: [
      { cn: "自动判断", en: "Auto" },
      { cn: "自动提炼物件、人物关系、动作、空间或光线", en: "Auto-extract objects, relations, action, space, or light" },
      { cn: "窗边暮色", en: "Dusk by the window" },
      { cn: "室内与窗外的冷暖交界", en: "Warm interior meeting cool outdoor light" },
      { cn: "桌面上的生活痕迹", en: "Traces of life on the table" },
      { cn: "独处时的光线", en: "Light in a moment of solitude" },
      { cn: "物件与空间的距离", en: "Distance between objects and space" },
      { cn: "天气渗进室内", en: "Weather seeping indoors" },
      { cn: "人物未在场的生活现场", en: "A lived scene with no one present" },
      { cn: "旅途中的片刻停顿", en: "A pause on the road" }
    ]
  },

  preserved_elements: {
    label: { cn: "重点保留", en: "Preserved Elements" },
    category: "visual",
    options: [
      { cn: "主要物件、空间结构与色彩关系", en: "Key objects, spatial structure, and color relationships" },
      { cn: "窗框、桌面与窗外景色", en: "Window frame, tabletop, and the view outside" },
      { cn: "前景物件与背景光线", en: "Foreground objects and background light" },
      { cn: "家具布局与强调色", en: "Furniture layout and the accent color" },
      { cn: "人物轮廓与环境色温", en: "Figure silhouette and environmental color temperature" },
      { cn: "冷色窗外与暖色室内", en: "Cool exterior against a warm interior" },
      { cn: "植物、桌面与建筑轮廓", en: "Plant, tabletop, and architectural outline" }
    ]
  },

  abstraction_level: {
    label: { cn: "抽象程度", en: "Abstraction Level" },
    category: "visual",
    options: [
      { cn: "高度抽象但关系可辨", en: "Highly abstract, relationships still readable" },
      { cn: "中度抽象，主体仍然清晰", en: "Moderate abstraction, subject still clear" },
      { cn: "高度抽象，仅保留动作与关系", en: "High abstraction, keep only action and relations" },
      { cn: "极度抽象，只留下色彩与空间节奏", en: "Extreme abstraction, only color and spatial rhythm remain" },
      { cn: "局部抽象，人物比环境更清晰", en: "Partial abstraction, figure clearer than environment" },
      { cn: "局部抽象，环境比人物更清晰", en: "Partial abstraction, environment clearer than figure" }
    ]
  },

  block_language: {
    label: { cn: "色块语言", en: "Block Language" },
    category: "visual",
    options: [
      { cn: "柔和大色域与少量锐利几何切面", en: "Soft large color fields with a few sharp geometric cuts" },
      { cn: "柔和、圆润、相互覆盖的有机色块", en: "Soft, rounded, overlapping organic blocks" },
      { cn: "大面积平涂色块与锐利几何切面", en: "Large flat fields with sharp geometric facets" },
      { cn: "具有纸张撕裂边缘的不规则色块", en: "Irregular blocks with torn-paper edges" },
      { cn: "半透明色层与轻微套印错位", en: "Translucent layers with slight print misregistration" },
      { cn: "极少量巨大色块与细小视觉锚点", en: "A few huge blocks with tiny visual anchors" },
      { cn: "流动色域与突然中断的硬边", en: "Flowing fields interrupted by sudden hard edges" },
      { cn: "类似丝网印刷的有限色块", en: "Limited blocks like screen printing" },
      { cn: "类似剪纸拼贴的扁平色块", en: "Flat blocks like paper-cut collage" }
    ]
  },

  color_strategy: {
    label: { cn: "色彩策略", en: "Color Strategy" },
    category: "visual",
    options: [
      { cn: "从原图提取2–4种低饱和主色，并保留一个鲜明强调色", en: "Pull 2–4 low-saturation primaries from the photo, keep one vivid accent" },
      { cn: "从原图提取2–4种低饱和专色", en: "Extract 2–4 low-saturation spot colors from the photo" },
      { cn: "从原图提取2–4种主色并降低饱和度", en: "Extract 2–4 main colors from the photo and desaturate them" },
      { cn: "保留原图冷暖关系，减少中间色", en: "Keep the photo's warm/cool split, reduce midtones" },
      { cn: "单色体系加一个高饱和强调色", en: "A monochrome system plus one high-saturation accent" },
      { cn: "两组互补色形成视觉张力", en: "Two complementary pairs for visual tension" },
      { cn: "使用偏灰的大地色与少量亮色", en: "Grayed earth tones with a little bright color" },
      { cn: "将原图转换成低饱和复古印刷色", en: "Convert the photo into low-saturation vintage print colors" },
      { cn: "保留最鲜明的服装颜色，其余转为中性色", en: "Keep the strongest garment color, turn the rest neutral" },
      { cn: "根据照片情绪重新组织色彩，但不改变冷暖基调", en: "Reorganize color by mood without changing the warm/cool key" }
    ]
  },

  aspect_ratio: {
    label: { cn: "输出比例", en: "Aspect Ratio" },
    category: "visual",
    options: [
{
  "cn": "16:9",
  "en": "16:9"
},
      { cn: "3:4", en: "3:4" },
      { cn: "4:5", en: "4:5" },
      { cn: "9:16", en: "9:16" },
      { cn: "1:1", en: "1:1" },
      { cn: "2:3", en: "2:3" },
      { cn: "4:3", en: "4:3" }
    ]
  },

  main_text: {
    label: { cn: "主文字", en: "Main Text" },
    category: "other",
    options: [
{
  "cn": "今天也试试新方法吧。",
  "en": "Let us try something new today."
},
{
  "cn": "文字让想象发生。",
  "en": "Words make imagination happen."
},
{
  "cn": "天空出现未知信号",
  "en": "Unknown signal in the sky"
},
{
  "cn": "现烤华夫饼",
  "en": "Freshly Baked Waffles"
},
{
  "cn": "赤壁之战",
  "en": "Battle of Red Cliffs"
},
{
  "cn": "东方美学",
  "en": "东方美学"
},
{
  "cn": "家庭厨房笔记",
  "en": "Family Kitchen Notes"
},
{
  "cn": "月曜日の奇跡",
  "en": "月曜日の奇跡"
},
{
  "cn": "周末旅行计划",
  "en": "Weekend travel plan"
},
{
  "cn": "仙踪长卷",
  "en": "仙踪长卷"
},
      { cn: "根据原图内容生成2–6字的简约短语", en: "Generate a 2–6 character spare phrase from the photo" },
      { cn: "窗边", en: "Windowside" },
      { cn: "暮色", en: "Dusk" },
      { cn: "室内", en: "Indoors" },
      { cn: "停顿", en: "Pause" },
      { cn: "留白", en: "Whitespace" },
      { cn: "不写主文字", en: "No main text" }
    ]
  },

  supporting_text: {
    label: { cn: "辅助文字", en: "Supporting Text" },
    category: "other",
    options: [
{
  "cn": "原来还能这样！",
  "en": "I never thought of that!"
},
{
  "cn": "咖啡套餐 38元",
  "en": "Coffee Set 38 CNY"
},
{
  "cn": "六个故事，六种世界",
  "en": "Six stories, six worlds"
},
      { cn: "根据画面生成一句克制、具体的记忆描述，也可以省略", en: "A restrained, specific memory line from the picture, or omit" },
      { cn: "蓝色落进室内", en: "Blue falls indoors" },
      { cn: "光线停在桌面上", en: "Light rests on the table" },
      { cn: "窗外还未完全天黑", en: "Outside is not fully dark yet" },
      { cn: "省略辅助文字", en: "Omit supporting text" }
    ]
  },

  text_language: {
    label: { cn: "文字语言", en: "Text Language" },
    category: "other",
    options: [
      { cn: "跟随用户使用的语言", en: "Follow the user's language" },
      { cn: "优先英文；若图像具有明确地域语言，则使用对应语言", en: "English first; use a regional language if the image clearly belongs to one" },
      { cn: "中文", en: "Chinese" },
      { cn: "英文", en: "English" },
      { cn: "中英对照", en: "Chinese and English" }
    ]
  },

  display_mode: {
    label: { cn: "呈现方式", en: "Display Mode" },
    category: "visual",
    options: [
      { cn: "原图在上，抽象色块转译在下", en: "Photo on top, abstract translation below" },
      { cn: "抽象作品为主体，原图以胶带固定在角落", en: "Abstract as the main work, photo taped in a corner" },
      { cn: "只展示抽象转译结果", en: "Show only the abstract translation" },
      { cn: "原图与转译结果左右对照", en: "Photo and translation side by side" },
      { cn: "原图作为小型档案缩略图嵌入留白区", en: "Photo as a small archival thumbnail in the white space" },
      { cn: "抽象色块局部越过边界，与原图发生连接", en: "Abstract blocks cross the boundary and meet the photo" }
    ]
  },

  exhibition_theme: {
    label: { cn: "展览主题", en: "Exhibition Theme" },
    category: "other",
    options: [
      { cn: "根据照片生成2–8字的含蓄主题", en: "A 2–8 character understated theme from the photo" },
      { cn: "静置的声音", en: "Sound at rest" },
      { cn: "窗边", en: "Windowside" },
      { cn: "未完成的傍晚", en: "An unfinished evening" },
      { cn: "墙上的乐器", en: "Instruments on the wall" },
      { cn: "室内光线", en: "Indoor light" },
      { cn: "停放的日常", en: "Daily life at rest" },
      { cn: "负形记忆", en: "Negative-space memory" }
    ]
  },

  description: {
    label: { cn: "说明文字", en: "Caption" },
    category: "other",
    options: [
      { cn: "根据画面真实内容生成一句简短描述", en: "One short caption from what the picture actually shows" },
      { cn: "弦乐器、百叶窗与傍晚光线", en: "String instruments, blinds, and evening light" },
      { cn: "窗框、桌面与窗外景色", en: "Window frame, tabletop, and the view outside" },
      { cn: "物件停在原处", en: "Objects left where they were" },
      { cn: "墙上的轮廓与前景的暗部", en: "Wall silhouettes and a dark foreground" },
      { cn: "省略说明文字", en: "Omit the caption" }
    ]
  },

  translation_mode: {
    label: { cn: "转译方式", en: "Translation Mode" },
    category: "visual",
    options: [
      { cn: "抽象重制", en: "Abstract remake" },
      { cn: "剪影重组", en: "Silhouette recomposition" },
      { cn: "专色套印", en: "Spot-color overprint" },
      { cn: "几何切片", en: "Geometric slices" },
      { cn: "负形与缺失", en: "Negative space and omission" },
      { cn: "排线与网点", en: "Hatching and halftone" },
      { cn: "比例放大局部", en: "Scaled-up fragments" },
      { cn: "概念化重绘", en: "Conceptual redraw" }
    ]
  },

  translation_focus: {
    label: { cn: "转译重点", en: "Translation Focus" },
    category: "visual",
    options: [
      { cn: "自动选择3–5个最具识别度的元素", en: "Auto-select 3–5 of the most recognizable elements" },
      { cn: "轮廓、方向与色彩", en: "Contour, direction, and color" },
      { cn: "物件剪影与空间节奏", en: "Object silhouettes and spatial rhythm" },
      { cn: "材质、比例与负形", en: "Material, proportion, and negative space" },
      { cn: "光线方向与主色块", en: "Light direction and main color fields" },
      { cn: "前景暗部与墙上物件", en: "Foreground darks and objects on the wall" }
    ]
  },

  serial_code: {
    label: { cn: "抽象编号", en: "Serial Code" },
    category: "other",
    options: [
{
  "cn": "COAST 77",
  "en": "COAST 77"
},
      { cn: "NO. 02", en: "NO. 02" },
      { cn: "NO. 01", en: "NO. 01" },
      { cn: "NO. 03", en: "NO. 03" },
      { cn: "NO. 07", en: "NO. 07" },
      { cn: "NO. 11", en: "NO. 11" },
      { cn: "ARCHIVE 04", en: "ARCHIVE 04" },
      { cn: "不显示编号", en: "No serial" }
    ]
  },

  album_title: {
    label: { cn: "专辑名称", en: "Album Title" },
    category: "other",
    options: [
      { cn: "根据图像核心生成2–5个英文单词", en: "2–5 English words from the image’s core" },
      { cn: "VERMILION RAIN", en: "VERMILION RAIN" },
      { cn: "FOREST STUDY", en: "FOREST STUDY" },
      { cn: "BLUE HOUR", en: "BLUE HOUR" },
      { cn: "WINDOW LIGHT", en: "WINDOW LIGHT" },
      { cn: "STATIC SOUND", en: "STATIC SOUND" },
      { cn: "EVENING ROOM", en: "EVENING ROOM" }
    ]
  },

  album_note: {
    label: { cn: "注释文字", en: "Album Note" },
    category: "other",
    options: [
      { cn: "根据画面生成一句简短英文描述", en: "One short English line from the picture" },
      { cn: "雨の鳥居", en: "雨の鳥居" },
      { cn: "FOREST STUDY 01", en: "FOREST STUDY 01" },
      { cn: "Rain on vermilion timber", en: "Rain on vermilion timber" },
      { cn: "Indoor light at rest", en: "Indoor light at rest" },
      { cn: "省略注释", en: "Omit the note" }
    ]
  },

  catalog_code: {
    label: { cn: "目录编号", en: "Catalog Code" },
    category: "other",
    options: [
      { cn: "自动生成简洁的虚构编号", en: "Auto-generate a short fictional catalog code" },
      { cn: "FOREST STUDY 01", en: "FOREST STUDY 01" },
      { cn: "ARC-02", en: "ARC-02" },
      { cn: "CAT 1973", en: "CAT 1973" },
      { cn: "SIDE A / 01", en: "SIDE A / 01" },
      { cn: "VM-04", en: "VM-04" },
      { cn: "不显示编号", en: "No catalog code" }
    ]
  },

  cover_style: {
    label: { cn: "封面风格", en: "Cover Style" },
    category: "visual",
    options: [
      { cn: "70年代现代主义专辑设计", en: "1970s modernist album design" },
      { cn: "丝网印刷专色几何", en: "Screen-print spot-color geometry" },
      { cn: "摄影拼贴与局部剪影", en: "Photo collage with partial silhouettes" },
      { cn: "瑞士国际主义排版", en: "Swiss international typography" },
      { cn: "日本现代主义海报", en: "Japanese modernist poster" },
      { cn: "光学折射与叠印", en: "Optical refraction and overprint" },
      { cn: "极简单色加强调色", en: "Minimal monochrome plus one accent" }
    ]
  },
  "fruit_cut": {
    "label": {
      "cn": "水果切法",
      "en": "Fruit Cut"
    },
    "category": "item",
    "options": [
      {
        "cn": "对半切开的果实",
        "en": "a halved fruit"
      },
      {
        "cn": "一片横切片",
        "en": "a cross-sectional slice"
      },
      {
        "cn": "一块楔形果瓣",
        "en": "a fruit wedge"
      },
      {
        "cn": "数块果肉丁",
        "en": "diced fruit"
      },
      {
        "cn": "一条果皮",
        "en": "a strip of peel"
      }
    ]
  },
  "enamel_metal": {
    "label": {
      "cn": "珐琅金属边",
      "en": "Enamel Metal Trim"
    },
    "category": "visual",
    "options": [
      {
        "cn": "抛光金色",
        "en": "polished gold"
      },
      {
        "cn": "拉丝银色",
        "en": "brushed silver"
      },
      {
        "cn": "温暖黄铜色",
        "en": "warm brass"
      },
      {
        "cn": "玫瑰金色",
        "en": "rose gold"
      },
      {
        "cn": "古铜色",
        "en": "antique bronze"
      }
    ]
  },
  "badge_backdrop": {
    "label": {
      "cn": "徽章衬底",
      "en": "Badge Backdrop"
    },
    "category": "visual",
    "options": [
      {
        "cn": "深海军蓝粗亚麻布",
        "en": "dark navy coarse linen"
      },
      {
        "cn": "米白棉布",
        "en": "ivory cotton"
      },
      {
        "cn": "炭灰羊毛毡",
        "en": "charcoal wool felt"
      },
      {
        "cn": "深绿帆布",
        "en": "forest-green canvas"
      },
      {
        "cn": "浅棕牛皮纸",
        "en": "light brown kraft paper"
      }
    ]
  },
  "future_city_motif": {
    "label": {
      "cn": "未来城市主景",
      "en": "Future City Motif"
    },
    "category": "location",
    "options": [
      {
        "cn": "环形建筑与蜿蜒高架步道",
        "en": "ring-shaped buildings and winding elevated paths"
      },
      {
        "cn": "层叠空中花园与悬浮阶梯",
        "en": "layered sky gardens and floating stairs"
      },
      {
        "cn": "巨型拱门与曲线街道",
        "en": "monumental arches and curved streets"
      },
      {
        "cn": "海边白色塔群与空中桥梁",
        "en": "white coastal towers and aerial bridges"
      },
      {
        "cn": "沙漠穹顶与螺旋道路",
        "en": "desert domes and spiral roads"
      }
    ]
  },
  "poster_muted_palette": {
    "label": {
      "cn": "编辑海报配色",
      "en": "Editorial Poster Palette"
    },
    "category": "visual",
    "options": [
      {
        "cn": "奶油白、鼠尾草绿与灰蓝",
        "en": "cream, sage green and dusty blue"
      },
      {
        "cn": "沙色、陶土红与淡青",
        "en": "sand, terracotta and pale cyan"
      },
      {
        "cn": "浅粉、酒红与暖灰",
        "en": "blush, burgundy and warm gray"
      },
      {
        "cn": "杏黄、橄榄绿与象牙白",
        "en": "apricot, olive and ivory"
      },
      {
        "cn": "雾紫、藏蓝与米白",
        "en": "misty lilac, navy and off-white"
      }
    ]
  },
  "citrus_campaign_fruit": {
    "label": {
      "cn": "柑橘广告主角",
      "en": "Campaign Citrus"
    },
    "category": "item",
    "options": [
      {
        "cn": "柠檬",
        "en": "lemon"
      },
      {
        "cn": "青柠",
        "en": "lime"
      },
      {
        "cn": "橙子",
        "en": "orange"
      },
      {
        "cn": "血橙",
        "en": "blood orange"
      },
      {
        "cn": "葡萄柚",
        "en": "grapefruit"
      }
    ]
  },
  "fictional_drink_brand": {
    "label": {
      "cn": "虚构饮料品牌",
      "en": "Fictional Drink Brand"
    },
    "category": "other",
    "options": [
{
  "cn": "夏柑SODA",
  "en": "Summer Citrus SODA"
},
      {
        "cn": "LIMORA",
        "en": "LIMORA"
      },
      {
        "cn": "ZESTIVA",
        "en": "ZESTIVA"
      },
      {
        "cn": "CITRILO",
        "en": "CITRILO"
      },
      {
        "cn": "SUNORA",
        "en": "SUNORA"
      },
      {
        "cn": "FIZZELLE",
        "en": "FIZZELLE"
      }
    ]
  },
  "travel_country": {
    "label": {
      "cn": "旅行国家",
      "en": "Travel Country"
    },
    "category": "location",
    "options": [
      {
        "cn": "意大利",
        "en": "Italy"
      },
      {
        "cn": "日本",
        "en": "Japan"
      },
      {
        "cn": "法国",
        "en": "France"
      },
      {
        "cn": "希腊",
        "en": "Greece"
      },
      {
        "cn": "中国",
        "en": "China"
      }
    ]
  },
  "glass_frame_shape": {
    "label": {
      "cn": "玻璃展框形状",
      "en": "Glass Frame Shape"
    },
    "category": "item",
    "options": [
      {
        "cn": "拱形玻璃展框",
        "en": "arched glass display"
      },
      {
        "cn": "圆角矩形水晶展框",
        "en": "rounded rectangular crystal frame"
      },
      {
        "cn": "圆形玻璃展框",
        "en": "circular glass frame"
      },
      {
        "cn": "尖拱玻璃展框",
        "en": "pointed-arch glass display"
      },
      {
        "cn": "阶梯轮廓水晶展框",
        "en": "stepped crystal frame"
      }
    ]
  },
  "astronaut_break": {
    "label": {
      "cn": "宇航员休息动作",
      "en": "Astronaut Break"
    },
    "category": "action",
    "options": [
      {
        "cn": "手捧冒着热气的小杯子",
        "en": "holding a small steaming mug"
      },
      {
        "cn": "翻阅一本小小的航行日志",
        "en": "reading a small flight journal"
      },
      {
        "cn": "用铅笔绘制地球速写",
        "en": "sketching Earth with a pencil"
      },
      {
        "cn": "双手轻放膝上仰望地球",
        "en": "resting hands on knees and gazing at Earth"
      },
      {
        "cn": "怀抱一束小花",
        "en": "holding a small bouquet"
      }
    ]
  },
  "apparel_ink_palette": {
    "label": {
      "cn": "服饰丝印配色",
      "en": "Apparel Ink Palette"
    },
    "category": "visual",
    "options": [
      {
        "cn": "深海军蓝底，浅蓝与白色油墨",
        "en": "navy fabric with pale blue and white ink"
      },
      {
        "cn": "黑色底，银灰与白色油墨",
        "en": "black fabric with silver gray and white ink"
      },
      {
        "cn": "墨绿底，米白与浅绿油墨",
        "en": "forest-green fabric with ivory and pale green ink"
      },
      {
        "cn": "酒红底，浅粉与奶油色油墨",
        "en": "burgundy fabric with pale pink and cream ink"
      },
      {
        "cn": "炭灰底，浅黄与白色油墨",
        "en": "charcoal fabric with pale yellow and white ink"
      }
    ]
  },
  "perfume_floral_set": {
    "label": {
      "cn": "香水花材搭配",
      "en": "Perfume Floral Set"
    },
    "category": "item",
    "options": [
{
  "cn": "白色花朵与绿叶",
  "en": "white flowers and green leaves"
},
      {
        "cn": "薄荷绿玫瑰与浅绿叶片",
        "en": "mint-green roses and pale green leaves"
      },
      {
        "cn": "白玫瑰与桉树叶",
        "en": "white roses and eucalyptus"
      },
      {
        "cn": "浅粉牡丹与细蕨叶",
        "en": "blush peonies and fine fern leaves"
      },
      {
        "cn": "淡紫兰花与银叶植物",
        "en": "pale lavender orchids and silver foliage"
      },
      {
        "cn": "奶油色马蹄莲与鼠尾草",
        "en": "cream calla lilies and sage"
      }
    ]
  },
  "summer_cup_fruit": {
    "label": {
      "cn": "冰饮果肉",
      "en": "Iced Drink Fruit"
    },
    "category": "item",
    "options": [
      {
        "cn": "红色草莓果肉",
        "en": "red strawberry pieces"
      },
      {
        "cn": "金黄芒果果肉",
        "en": "golden mango pieces"
      },
      {
        "cn": "鲜绿猕猴桃果肉",
        "en": "bright green kiwi pieces"
      },
      {
        "cn": "橙色蜜桃果肉",
        "en": "orange peach pieces"
      },
      {
        "cn": "红色西瓜果肉",
        "en": "red watermelon pieces"
      }
    ]
  },
  "eye_color": {
    "label": {
      "cn": "瞳孔颜色",
      "en": "Eye Color"
    },
    "category": "character",
    "options": [
      {
        "cn": "绿色",
        "en": "green"
      },
      {
        "cn": "琥珀色",
        "en": "amber"
      },
      {
        "cn": "深棕色",
        "en": "dark brown"
      },
      {
        "cn": "灰蓝色",
        "en": "gray-blue"
      },
      {
        "cn": "紫色",
        "en": "violet"
      },
      {
        "cn": "紫色",
        "en": "purple"
      }
    ]
  },
  "fantasy_weapon": {
    "label": {
      "cn": "奇幻兵器",
      "en": "Fantasy Weapon"
    },
    "category": "item",
    "options": [
      {
        "cn": "中世纪长剑",
        "en": "medieval sword"
      },
      {
        "cn": "符文长剑",
        "en": "runic longsword"
      },
      {
        "cn": "银色战斧",
        "en": "silver battle axe"
      },
      {
        "cn": "寒铁长矛",
        "en": "cold-iron spear"
      },
      {
        "cn": "双手巨剑",
        "en": "two-handed greatsword"
      }
    ]
  },
  "paper_cut_finish": {
    "label": {
      "cn": "剪纸纸面材质",
      "en": "Paper-Cut Finish"
    },
    "category": "visual",
    "options": [
      {
        "cn": "金属箔或光泽纸",
        "en": "metallic foil or glossy paper"
      },
      {
        "cn": "哑光金色艺术纸",
        "en": "matte gold art paper"
      },
      {
        "cn": "银色珠光卡纸",
        "en": "silver pearlescent card"
      },
      {
        "cn": "暖白纹理纸",
        "en": "warm white textured paper"
      },
      {
        "cn": "铜色压纹纸",
        "en": "copper embossed paper"
      }
    ]
  },
  "vintage_car": {
    "label": {
      "cn": "复古车辆",
      "en": "Vintage Car"
    },
    "category": "item",
    "options": [
      {
        "cn": "经典1960年代白色汽车",
        "en": "classic 1960s white car"
      },
      {
        "cn": "奶油色复古敞篷车",
        "en": "cream vintage convertible"
      },
      {
        "cn": "红色小型旅行车",
        "en": "red compact touring car"
      },
      {
        "cn": "浅蓝经典双门轿车",
        "en": "pale blue classic coupe"
      },
      {
        "cn": "黄色复古小巴",
        "en": "yellow vintage minibus"
      }
    ]
  },
  "note_pen": {
    "label": {
      "cn": "笔记书写工具",
      "en": "Note-Taking Pen"
    },
    "category": "item",
    "options": [
      {
        "cn": "黑色圆珠笔",
        "en": "black ballpoint pen"
      },
      {
        "cn": "蓝色圆珠笔",
        "en": "blue ballpoint pen"
      },
      {
        "cn": "黑色钢笔",
        "en": "black fountain pen"
      },
      {
        "cn": "深棕色细头笔",
        "en": "dark brown fineliner"
      },
      {
        "cn": "石墨铅笔",
        "en": "graphite pencil"
      }
    ]
  },
  "cosmic_creature": {
    "label": {
      "cn": "星云巨兽",
      "en": "Cosmic Creature"
    },
    "category": "character",
    "options": [
      {
        "cn": "锦鲤",
        "en": "koi"
      },
      {
        "cn": "鲸鱼",
        "en": "whale"
      },
      {
        "cn": "蝠鲼",
        "en": "manta ray"
      },
      {
        "cn": "海龟",
        "en": "sea turtle"
      },
      {
        "cn": "金鱼",
        "en": "goldfish"
      }
    ]
  },
  "constellation_theme": {
    "label": {
      "cn": "星座主题",
      "en": "Constellation Theme"
    },
    "category": "other",
    "options": [
      {
        "cn": "射手座",
        "en": "Sagittarius"
      },
      {
        "cn": "白羊座",
        "en": "Aries"
      },
      {
        "cn": "金牛座",
        "en": "Taurus"
      },
      {
        "cn": "狮子座",
        "en": "Leo"
      },
      {
        "cn": "天蝎座",
        "en": "Scorpio"
      },
      {
        "cn": "双鱼座",
        "en": "Pisces"
      }
    ]
  },
  "classical_ensemble": {
    "label": {
      "cn": "古典人物群像",
      "en": "Classical Ensemble"
    },
    "category": "character",
    "options": [
      {
        "cn": "八仙",
        "en": "the Eight Immortals"
      },
      {
        "cn": "竹林七贤",
        "en": "the Seven Sages of the Bamboo Grove"
      },
      {
        "cn": "唐宋八大家",
        "en": "the Eight Great Prose Masters of the Tang and Song"
      },
      {
        "cn": "四大天王",
        "en": "the Four Heavenly Kings"
      },
      {
        "cn": "三国五虎将",
        "en": "the Five Tiger Generals of the Three Kingdoms"
      }
    ]
  },
  "illustration_subject": {
    "label": {
      "cn": "插画主题",
      "en": "Illustration Subject"
    },
    "category": "other",
    "options": [
      {
        "cn": "散步的猫咪",
        "en": "a strolling cat"
      },
      {
        "cn": "忙碌的咖啡师",
        "en": "a busy barista"
      },
      {
        "cn": "带着相机的旅行者",
        "en": "a traveler carrying a camera"
      },
      {
        "cn": "修理星星的机器人",
        "en": "a robot repairing stars"
      },
      {
        "cn": "骑自行车的狐狸",
        "en": "a fox riding a bicycle"
      }
    ]
  },
  "artwork_signature": {
    "label": {
      "cn": "画面署名",
      "en": "Artwork Signature"
    },
    "category": "other",
    "options": [
      {
        "cn": "STUDIO",
        "en": "STUDIO"
      },
      {
        "cn": "FIELD NOTES",
        "en": "FIELD NOTES"
      },
      {
        "cn": "ART LAB",
        "en": "ART LAB"
      },
      {
        "cn": "MY COLLECTION",
        "en": "MY COLLECTION"
      },
      {
        "cn": "SKETCHBOOK",
        "en": "SKETCHBOOK"
      },
      {
        "cn": "@LIYUE",
        "en": "@LIYUE"
      },
      {
        "cn": "voxcat",
        "en": "voxcat"
      }
    ]
  },
  "recipe_page_layout": {
    "label": {
      "cn": "食谱版式",
      "en": "Recipe Layout"
    },
    "category": "visual",
    "options": [
      {
        "cn": "杂志双页跨页",
        "en": "a magazine double-page spread"
      },
      {
        "cn": "单页步骤卡",
        "en": "a single-page step card"
      },
      {
        "cn": "上下分栏食谱页",
        "en": "a recipe page with top and bottom sections"
      },
      {
        "cn": "三栏烹饪指南",
        "en": "a three-column cooking guide"
      },
      {
        "cn": "手账式食谱页",
        "en": "a journal-style recipe page"
      }
    ]
  },
  "snack_subject": {
    "label": {
      "cn": "零食主体",
      "en": "Snack Subject"
    },
    "category": "item",
    "options": [
      {
        "cn": "夹心威化饼干",
        "en": "a filled wafer biscuit"
      },
      {
        "cn": "巧克力棒",
        "en": "a chocolate bar"
      },
      {
        "cn": "坚果能量棒",
        "en": "a nut energy bar"
      },
      {
        "cn": "夹心曲奇",
        "en": "a sandwich cookie"
      },
      {
        "cn": "爆米花",
        "en": "popcorn"
      }
    ]
  },
  "flower_field_species": {
    "label": {
      "cn": "花田品种",
      "en": "Flower Field Species"
    },
    "category": "location",
    "options": [
      {
        "cn": "薰衣草",
        "en": "lavender"
      },
      {
        "cn": "雏菊",
        "en": "daisy"
      },
      {
        "cn": "波斯菊",
        "en": "cosmos"
      },
      {
        "cn": "油菜花",
        "en": "rapeseed blossom"
      },
      {
        "cn": "向日葵",
        "en": "sunflower"
      }
    ]
  },
  "rpg_item_theme": {
    "label": {
      "cn": "奇幻道具主题",
      "en": "Fantasy Item Theme"
    },
    "category": "other",
    "options": [
      {
        "cn": "经典中世纪奇幻",
        "en": "classic medieval fantasy"
      },
      {
        "cn": "森林精灵王国",
        "en": "a woodland elven kingdom"
      },
      {
        "cn": "冰霜魔法王国",
        "en": "a frost-magic kingdom"
      },
      {
        "cn": "沙漠古代文明",
        "en": "an ancient desert civilization"
      },
      {
        "cn": "海洋冒险王国",
        "en": "an ocean-adventure kingdom"
      }
    ]
  },
  "mecha_heavy_weapon": {
    "label": {
      "cn": "机甲肩载装备",
      "en": "Mecha Shoulder Equipment"
    },
    "category": "item",
    "options": [
      {
        "cn": "巨型轨道炮",
        "en": "massive rail cannon"
      },
      {
        "cn": "重型电磁炮",
        "en": "heavy electromagnetic cannon"
      },
      {
        "cn": "长管等离子炮",
        "en": "long-barreled plasma cannon"
      },
      {
        "cn": "肩载激光炮",
        "en": "shoulder-mounted laser cannon"
      },
      {
        "cn": "大型侦察传感器",
        "en": "large reconnaissance sensor"
      }
    ]
  },
  "portrait_mood": {
    "label": {
      "cn": "人像情绪",
      "en": "Portrait Mood"
    },
    "category": "character",
    "options": [
      {
        "cn": "安静从容",
        "en": "quiet and composed"
      },
      {
        "cn": "温暖微笑",
        "en": "a warm smile"
      },
      {
        "cn": "自信坚定",
        "en": "confident and determined"
      },
      {
        "cn": "若有所思",
        "en": "thoughtful"
      },
      {
        "cn": "轻松俏皮",
        "en": "relaxed and playful"
      }
    ]
  },
  "editorial_palette": {
    "label": {
      "cn": "编辑配色",
      "en": "Editorial Palette"
    },
    "category": "visual",
    "options": [
      {
        "cn": "钴蓝与琥珀金",
        "en": "cobalt blue and amber gold"
      },
      {
        "cn": "奶油白与鼠尾草绿",
        "en": "cream and sage green"
      },
      {
        "cn": "酒红与暖米色",
        "en": "burgundy and warm beige"
      },
      {
        "cn": "黑色与朱红",
        "en": "black and vermilion"
      },
      {
        "cn": "淡粉与薰衣草紫",
        "en": "blush pink and lavender"
      },
      {
        "cn": "银灰与电光蓝",
        "en": "silver gray and electric blue"
      }
    ]
  },
  "studio_brand": {
    "label": {
      "cn": "虚构品牌名称",
      "en": "Fictional Brand Name"
    },
    "category": "other",
    "options": [
      {
        "cn": "AURELIA",
        "en": "AURELIA"
      },
      {
        "cn": "NOVA STUDIO",
        "en": "NOVA STUDIO"
      },
      {
        "cn": "LUMEN",
        "en": "LUMEN"
      },
      {
        "cn": "MORNING CLUB",
        "en": "MORNING CLUB"
      },
      {
        "cn": "ATELIER N",
        "en": "ATELIER N"
      }
    ]
  },
  "poster_headline": {
    "label": {
      "cn": "海报标题短句",
      "en": "Poster Headline"
    },
    "category": "other",
    "options": [
      {
        "cn": "新的旅程",
        "en": "A NEW JOURNEY"
      },
      {
        "cn": "微光时刻",
        "en": "MOMENTS OF LIGHT"
      },
      {
        "cn": "保持好奇",
        "en": "STAY CURIOUS"
      },
      {
        "cn": "向阳而生",
        "en": "GROW TOWARD THE SUN"
      },
      {
        "cn": "日常奇迹",
        "en": "EVERYDAY MAGIC"
      }
    ]
  },
  "sprite_action": {
    "label": {
      "cn": "精灵动作主题",
      "en": "Sprite Action"
    },
    "category": "action",
    "options": [
      {
        "cn": "待机与招手",
        "en": "idle and waving"
      },
      {
        "cn": "行走与回头",
        "en": "walking and looking back"
      },
      {
        "cn": "蓄力与挥击",
        "en": "charging and striking"
      },
      {
        "cn": "跳跃与落地",
        "en": "jumping and landing"
      },
      {
        "cn": "庆祝与鞠躬",
        "en": "celebrating and bowing"
      }
    ]
  },
  "anime_outfit": {
    "label": {
      "cn": "动漫角色服装",
      "en": "Anime Outfit"
    },
    "category": "item",
    "options": [
      {
        "cn": "蓝白学院制服",
        "en": "a blue-and-white academy uniform"
      },
      {
        "cn": "黑色哥特礼裙",
        "en": "a black Gothic dress"
      },
      {
        "cn": "红黑街头夹克",
        "en": "a red-and-black street jacket"
      },
      {
        "cn": "白银轻甲",
        "en": "white-and-silver light armor"
      },
      {
        "cn": "浅色和服",
        "en": "a pale kimono"
      },
      {
        "cn": "粉色偶像裙",
        "en": "a pink idol dress"
      }
    ]
  },
  "comic_cast": {
    "label": {
      "cn": "漫画人物组合",
      "en": "Comic Cast"
    },
    "category": "character",
    "options": [
      {
        "cn": "一对青年朋友",
        "en": "two young adult friends"
      },
      {
        "cn": "两位咖啡师",
        "en": "two baristas"
      },
      {
        "cn": "一对成年旅行者",
        "en": "two adult travelers"
      },
      {
        "cn": "一对音乐人",
        "en": "two musicians"
      },
      {
        "cn": "两位大学同学",
        "en": "two university classmates"
      }
    ]
  },
  "art_paper": {
    "label": {
      "cn": "绘画纸张",
      "en": "Art Paper"
    },
    "category": "visual",
    "options": [
      {
        "cn": "暖白水彩纸",
        "en": "warm white watercolor paper"
      },
      {
        "cn": "浅棕再生纸",
        "en": "light brown recycled paper"
      },
      {
        "cn": "象牙白棉纸",
        "en": "ivory cotton paper"
      },
      {
        "cn": "米色素描纸",
        "en": "beige sketch paper"
      },
      {
        "cn": "灰白粗纹纸",
        "en": "off-white textured paper"
      }
    ]
  },
  "product_stage": {
    "label": {
      "cn": "产品陈列台",
      "en": "Product Stage"
    },
    "category": "location",
    "options": [
      {
        "cn": "暖米色大理石台",
        "en": "a warm beige marble plinth"
      },
      {
        "cn": "深色火山岩台",
        "en": "a dark volcanic stone plinth"
      },
      {
        "cn": "光洁的白色台面",
        "en": "a polished white tabletop"
      },
      {
        "cn": "原木展示台",
        "en": "a natural wood display stand"
      },
      {
        "cn": "透明亚克力台",
        "en": "a clear acrylic plinth"
      }
    ]
  },
  "botanical_accent": {
    "label": {
      "cn": "植物点缀",
      "en": "Botanical Accent"
    },
    "category": "item",
    "options": [
      {
        "cn": "白色小花与绿藤",
        "en": "small white flowers and green vines"
      },
      {
        "cn": "粉色雏菊",
        "en": "pink daisies"
      },
      {
        "cn": "向日葵",
        "en": "sunflowers"
      },
      {
        "cn": "紫色兰花",
        "en": "purple orchids"
      },
      {
        "cn": "橄榄枝",
        "en": "olive branches"
      },
      {
        "cn": "樱花",
        "en": "cherry blossoms"
      }
    ]
  },
  "surprise_box": {
    "label": {
      "cn": "惊喜盒子",
      "en": "Surprise Box"
    },
    "category": "item",
    "options": [
      {
        "cn": "系蝴蝶结的礼物盒",
        "en": "a gift box tied with a bow"
      },
      {
        "cn": "带星星图案的礼物盒",
        "en": "a star-patterned gift box"
      },
      {
        "cn": "圆形礼物盒",
        "en": "a round gift box"
      },
      {
        "cn": "木质玩具箱",
        "en": "a wooden toy chest"
      },
      {
        "cn": "马戏团惊喜盒",
        "en": "a circus jack-in-the-box"
      }
    ]
  },
  "surprise_character": {
    "label": {
      "cn": "惊喜角色",
      "en": "Surprise Character"
    },
    "category": "character",
    "options": [
      {
        "cn": "白色小鬼",
        "en": "a little white ghost"
      },
      {
        "cn": "圆滚滚的小猫",
        "en": "a round little kitten"
      },
      {
        "cn": "软萌小兔子",
        "en": "a cute little bunny"
      },
      {
        "cn": "黄色小星星",
        "en": "a little yellow star"
      },
      {
        "cn": "迷你小恐龙",
        "en": "a miniature dinosaur"
      }
    ]
  },
  "surprise_reveal_action": {
    "label": {
      "cn": "出场动作",
      "en": "Reveal Action"
    },
    "category": "action",
    "options": [
      {
        "cn": "跳出来",
        "en": "jumps out"
      },
      {
        "cn": "弹出来后挥手",
        "en": "pops out and waves"
      },
      {
        "cn": "旋转着跳出来",
        "en": "spins as it jumps out"
      },
      {
        "cn": "探出头后眨眼",
        "en": "peeks out and blinks"
      },
      {
        "cn": "蹦出来后开心摇摆",
        "en": "bounces out and sways happily"
      }
    ]
  },
  "elastic_motion_feedback": {
    "label": {
      "cn": "弹性反馈",
      "en": "Elastic Motion"
    },
    "category": "action",
    "options": [
      {
        "cn": "果冻或弹簧般的力学反馈",
        "en": "jelly-like or spring-like physical feedback"
      },
      {
        "cn": "柔软的挤压与拉伸",
        "en": "soft squash and stretch"
      },
      {
        "cn": "轻快的弹跳与回弹",
        "en": "snappy bouncing and spring-back"
      },
      {
        "cn": "缓慢蓄力后快速弹出",
        "en": "slow anticipation followed by a quick pop"
      },
      {
        "cn": "布偶般的轻柔晃动",
        "en": "gentle plush-toy wobbling"
      }
    ]
  },
  "peek_reaction_action": {
    "label": {
      "cn": "探头动作",
      "en": "Peeking Action"
    },
    "category": "action",
    "options": [
      {
        "cn": "从门后探头",
        "en": "peek out from behind a door"
      },
      {
        "cn": "从门后探头并眨眼",
        "en": "peek out from behind a door and blink"
      },
      {
        "cn": "从门后探头并挥爪",
        "en": "peek out from behind a door and wave a paw"
      },
      {
        "cn": "从窗边探头",
        "en": "peek out from beside a window"
      },
      {
        "cn": "从桌子下方探头",
        "en": "peek out from under a table"
      }
    ]
  },
  "reaction_bubble_text": {
    "label": {
      "cn": "表情包气泡文字",
      "en": "Reaction Bubble Text"
    },
    "category": "other",
    "options": [
      {
        "cn": "叫我干啥？",
        "en": "What do you need me for?"
      },
      {
        "cn": "找我有事？",
        "en": "Need something?"
      },
      {
        "cn": "我来啦！",
        "en": "Here I am!"
      },
      {
        "cn": "偷偷看看",
        "en": "Just taking a peek"
      },
      {
        "cn": "谁在叫我？",
        "en": "Who’s calling me?"
      }
    ]
  },
  "like_hand_style": {
    "label": {
      "cn": "点赞小手造型",
      "en": "Tapping Hand Style"
    },
    "category": "item",
    "options": [
      {
        "cn": "3D 形态的小手",
        "en": "a small 3D hand"
      },
      {
        "cn": "圆润的白手套小手",
        "en": "a rounded white-gloved hand"
      },
      {
        "cn": "软糖质感的小手",
        "en": "a gummy-textured hand"
      },
      {
        "cn": "迷你机器人手",
        "en": "a miniature robot hand"
      },
      {
        "cn": "黏土质感的小手",
        "en": "a clay-textured hand"
      }
    ]
  },
  "like_heart_color": {
    "label": {
      "cn": "爱心描边与填充色",
      "en": "Heart Outline and Fill Color"
    },
    "category": "visual",
    "options": [
      {
        "cn": "红色",
        "en": "red"
      },
      {
        "cn": "珊瑚橙",
        "en": "coral orange"
      },
      {
        "cn": "樱花粉",
        "en": "cherry-blossom pink"
      },
      {
        "cn": "薰衣草紫",
        "en": "lavender purple"
      },
      {
        "cn": "金黄色",
        "en": "golden yellow"
      }
    ]
  },
  "like_thanks_text": {
    "label": {
      "cn": "点赞感谢文案",
      "en": "Like Thank-You Text"
    },
    "category": "other",
    "options": [
      {
        "cn": "感谢点赞～",
        "en": "Thanks for the like!"
      },
      {
        "cn": "谢谢支持～",
        "en": "Thanks for your support!"
      },
      {
        "cn": "收到你的喜欢啦！",
        "en": "Your like made my day!"
      },
      {
        "cn": "给你一个小心心～",
        "en": "Sending you a little heart!"
      },
      {
        "cn": "比心感谢！",
        "en": "A heart to say thanks!"
      }
    ]
  },
  "noise_cancel_headphones": {
    "label": {
      "cn": "降噪耳机造型",
      "en": "Noise-Canceling Headphones"
    },
    "category": "item",
    "options": [
      {
        "cn": "银白色头戴式降噪耳机",
        "en": "silver-white over-ear noise-canceling headphones"
      },
      {
        "cn": "哑光黑色头戴式降噪耳机",
        "en": "matte black over-ear noise-canceling headphones"
      },
      {
        "cn": "深空灰金属头戴式降噪耳机",
        "en": "space-gray metal over-ear noise-canceling headphones"
      },
      {
        "cn": "奶油白色头戴式降噪耳机",
        "en": "cream-white over-ear noise-canceling headphones"
      },
      {
        "cn": "冰蓝色头戴式降噪耳机",
        "en": "ice-blue over-ear noise-canceling headphones"
      }
    ]
  },
  "noise_cancel_headline": {
    "label": {
      "cn": "降噪广告标题",
      "en": "Noise-Canceling Headline"
    },
    "category": "other",
    "options": [
      {
        "cn": "极致降噪",
        "en": "Ultimate Noise Cancellation"
      },
      {
        "cn": "一戴，世界安静",
        "en": "Put Them On. Tune the World Out."
      },
      {
        "cn": "喧嚣之外",
        "en": "Beyond the Noise"
      },
      {
        "cn": "只听见自己",
        "en": "Hear Yourself"
      },
      {
        "cn": "让世界静下来",
        "en": "Quiet the World"
      }
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
  underwear_style: { cn: "简约舒适棉质内衣", en: "Simple and comfortable cotton innerwear" },
  clothing: { cn: "炭灰色无袖连衣裙", en: "Charcoal grey sleeveless dress" },
  clothing_male: { cn: "剪裁合体的深蓝西装", en: "Tailored deep blue suit" },
  clothing_female: { cn: "炭灰色无袖连衣裙", en: "Charcoal grey sleeveless dress" },
  expressions: { cn: "疯狂、病娇、狂喜", en: "Crazy, Yandere, Ecstatic" },
  character_originality: { cn: "创作一个原创人物", en: "Create an original character" },
  character_groups: { cn: "中外知名侦探（包青天、狄仁杰、福尔摩斯、柯南等）", en: "Famous Detectives (Bao Zheng, Di Renjie, Sherlock Holmes, Conan, etc.)" },
  social_media: { cn: "微信朋友圈", en: "WeChat Moments" },
  texture_zoom: { cn: "精细的皮肤纹理", en: "Fine skin texture" },
  action_detail: { cn: "自信的站立", en: "Confident standing" },
  special_view: { cn: "背影回眸", en: "Back view reflected in a mirror" },
  bag_content: { cn: "日常通勤包或手拿包", en: "Daily commuter bag or clutch" },
  cosmetics: { cn: "常用的化妆品组合", en: "Commonly used cosmetics combo" },
  private_items: { cn: "智能运动手表", en: "Smart Sports Watch" },
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
  underwater_color: { cn: "深青色透明水下", en: "deep teal transparent underwater" },
  creatures: { cn: "许多银色小鱼", en: "many small silver fish" },
  city_name: { cn: "京都", en: "Kyoto" },
  art_tool: { cn: "毛笔", en: "Ink Brush" },
  dominant_colors: { cn: "传统的京都红与古朴的墨黑色", en: "Traditional Kyoto red and antique ink black" },
  background_color_clean: { cn: "纯白", en: "Pure White" },
  city_glimpse_subtitle: { cn: "古韵悠长的千年古都", en: "The thousand-year-old ancient capital" },
  action_status: { cn: "玩PS5", en: "playing PS5" },
  draw_style: { cn: "手绘漫画风格", en: "Hand-drawn Manga Style" },
  hair_style: { cn: "短发，柔和凌乱的深色头发", en: "Short, softly tousled dark hair" },
  accessory_glasses: { cn: "戴着有轻微镜面反射的眼镜", en: "wearing glasses with mild lens reflections" },
  // 新年海报默认值
  clothing_style_chinese: { cn: "古典红色汉服", en: "Classical red Hanfu" },
  clothing_color_traditional: { cn: "暗红色", en: "Dark Red" },
  year_number: { cn: "2026", en: "2026" },
  greeting_new_year: { cn: "马到成功", en: "Immediate Success" },
  background_color_festive: { cn: "红色背景", en: "Red background" },
  character_heroic: { cn: "文艺青年", en: "Artistic Youth" },
  // 可爱动态姿势默认值
  room_style_cute: { cn: "可爱粉色房间，粉彩床和墙壁，原创动物玩偶，妖精灯光，可爱海报，毛绒地毯", en: "Cute pink room, pastel pink bed and walls, original cute animal plushies, fairy lights, cute posters, fluffy rug" },
  cute_outfit: { cn: "黑色紧身吊带连衣裙，长度到臀部，无袖，细肩带", en: "Black tight camisole dress, hip-length, sleeveless, thin straps" },
  cute_pose_dynamic: { cn: "向前走时回望，从正上方自信俏皮地俯视，迷人微笑", en: "Walking forward while looking back, confidently and playfully looking down from directly above, charming smile" },

  // 产品设计规范图默认值
  product_category: { cn: "现代椅子", en: "Modern Chair" },
  environment_style: { cn: "极简建筑室内", en: "Minimal Architectural Interior" },
  drawing_style: { cn: "建筑线图风格", en: "Architectural Line Drawing Style" },

  // 人物转手绘默认值
  character_subject: { cn: "年轻女性，长发，微笑", en: "Young woman with long hair, smiling" },
  portrait_view: { cn: "正面肖像", en: "Front portrait" },
  line_art_style: { cn: "钢笔墨水风格", en: "Pen and ink style" },
  shading_technique: { cn: "极简排线阴影", en: "Minimalist cross-hatching" },
  background_treatment: { cn: "白色背景", en: "White background" },

  // 经典游戏真实化默认值
  classic_game: { cn: "Donkey Kong (1981 街机游戏)", en: "Donkey Kong (1981 vintage arcade game)" },

  // 科学发现纸雕模型默认值
  scientific_discovery: { cn: "DNA结构", en: "The Structure of DNA" },

  // 健身自拍场景默认值
  fitness_location: { cn: "繁忙的健身房，镜子和器械随处可见", en: "Busy gym with mirrors and equipment visible" },
  fitness_pose: { cn: "半蹲姿势，侧身对镜子", en: "Half-squat pose, turned sideways to mirror" },
  fitness_clothing: { cn: "运动裙，紧身贴身", en: "Sports skirt, tight and form-fitting" },
  selfie_style: { cn: "原始真实的镜子自拍", en: "Raw, authentic mirror selfie" },
  photo_effect: { cn: "机顶闪光灯直闪", en: "On-camera flash firing" },
  physical_state: { cn: "健康健美的身材", en: "Healthy athletic build" },
  sweat_appearance: { cn: "头发凌乱湿透，汗水明显", en: "Hair disheveled and damp with sweat" },
  facial_expression: { cn: "脸颊泛红，眼神迷离", en: "Cheeks flushed red, dreamy and slightly unfocused eyes" },
  // 微缩模型系列默认值
  miniature_character: { cn: "消防员", en: "Firefighter" },
  giant_object: { cn: "燃烧的火柴棍", en: "Burning Matchstick" },
  // Pop Mart 毛绒玩具默认值
  plush_expression: { cn: "眨眼俏皮表情", en: "winking with playful expression" },
  cute_accessory: { cn: "针织帽", en: "beanie hats" },
  festive_archway: { cn: "中国传统拱门", en: "traditional Chinese archway" },
  // 3D等距透视展台默认值
  exhibition_type: { cn: "现代艺术展览", en: "modern art exhibition" },
  display_objects: { cn: "抽象雕塑和装置艺术", en: "abstract sculptures and installation art" },
  pod_structure: { cn: "玻璃立方体展台", en: "glass cube pod" },
  // 中国传统新娘肖像默认值
  bridal_hair_decoration: { cn: "红色纸剪花和蝴蝶装饰", en: "red paper-cut flowers and butterflies" },
  traditional_bridal_attire: { cn: "红色缎面旗袍", en: "red satin cheongsam" },
  bridal_jewelry: { cn: "白色珍珠首饰和小珍珠耳环", en: "white pearl jewelry and small pearl earrings" },
  // 高端食品广告默认值
  premium_food_subject: { cn: "手工巧克力球", en: "handcrafted chocolate truffles" },
  ingredient_bits: { cn: "可可粉和金箔碎屑", en: "cocoa powder and gold flakes" },
  // 紫禁城雪夜人形凤凰默认值
  imperial_palace_scene: { cn: "紫禁城雪夜", en: "Forbidden City snow night" },
  phoenix_crown: { cn: "华丽繁复的金凤冠", en: "ornate golden phoenix crown" },
  flowing_garment: { cn: "流动的红橙色丝绸华服", en: "flowing red-orange silk robes" },
  festive_props: { cn: "口中叼着中式红包，手中拿着展开的春节祝福", en: "holding red envelope in mouth and unfolded spring festival blessing in hand" },
  // 室内设计默认值
  room_type: { cn: "客厅", en: "Living Room" },
  interior_design_style: { cn: "现代轻奢风格", en: "Modern Light Luxury Style" },
  furniture_set: { cn: "沙发、地毯、茶几、电视", en: "Sofa, rug, coffee table, TV" },
  ceiling_material: { cn: "白色乳胶漆平顶", en: "White latex flat ceiling" },
  wall_material: { cn: "白色乳胶漆墙面", en: "White latex paint wall" },
  floor_material: { cn: "浅灰色大理石地砖", en: "Light gray marble tile" },
  interior_lighting: { cn: "自然光线", en: "Natural lighting" },
  render_quality: { cn: "4K超高清分辨率", en: "4K Ultra HD resolution" },
  room_condition: { cn: "精致装修，高档材料的质感与细节", en: "Exquisitely decorated, high-end materials with refined details" },
  // 解剖学人物画默认值
  anatomy_teaching_style: { cn: "Proko 风格（简化几何、教学导向、清晰构造线）", en: "Proko style (simplified geometry, educational focus, clear construction lines)" },
  construction_line_color: { cn: "紫色/紫罗兰色（主构造线）", en: "Purple/violet sketch lines (primary construction)" },
  // 视频分镜-影视色调默认值
  video_color_tone: { cn: "冷蓝调，暗部发青（如《银翼杀手2049》）", en: "Cool blue tones, teal shadows (Blade Runner 2049 style)" },
  // 视频分镜-影视风格默认值
  video_art_style: { cn: "好莱坞大片质感（高成本电影感）", en: "Hollywood blockbuster cinematic quality" },
  // 视频分镜-场景类型默认值
  scene_type: { cn: "古代酒馆内部，烛光摇曳", en: "Ancient tavern interior, candlelight flickering" },
  // 酒馆武打戏视频默认值
  fight_style: { cn: "武侠飘逸风（轻功、剑气、衣袂飘飘）", en: "Wuxia elegant style (light kung fu, sword aura, flowing robes)" },
  camera_rhythm: { cn: "快速切换蒙太奇（多角度快速剪辑）", en: "Rapid montage cutting (multi-angle fast edits)" },
  // 赛博朋克飞行器视频默认值
  sci_fi_movie_style: { cn: "赛博朋克美学（Cyberpunk Aesthetics）", en: "Cyberpunk Aesthetics" },
  futuristic_vehicle: { cn: "流线型反重力飞行器（Anti-gravity Vehicle）", en: "Streamlined Anti-gravity Vehicle" },
  cyberpunk_city_scene: { cn: "未来主义超级城市峡谷（Megacity Canyon）", en: "Futuristic Megacity Canyon" },
  tracking_camera_shot: { cn: "极具纵深感的广角跟拍（Wide Angle Tracking Shot）", en: "Wide Angle Tracking Shot with Deep Depth" },
  action_camera_shot: { cn: "紧张的驾驶舱视角（Cockpit View）", en: "Tense Cockpit View" },
  // 雨林瀑布战机穿越视频默认值
  natural_environment: { cn: "古代雨林（Ancient Rainforest）", en: "Ancient Rainforest" },
  military_aircraft: { cn: "战斗机（Fighter Jet）", en: "Fighter Jet" },
  aerial_opening_shot: { cn: "史诗超广角航拍（Epic Ultra Wide Aerial Shot）", en: "Epic Ultra Wide Aerial Shot" },
  dynamic_tracking_shot: { cn: "第三人称紧密跟拍（Third-Person Tight Tracking）", en: "Third-Person Tight Tracking" },
  // 社交卡片模板默认值
  social_bg_color: { cn: "粉色和勃艮第红", en: "pink and burgundy" },
  social_profile_name: { cn: "@RealMe+", en: "@RealMe+" },
  character_type: { cn: "女性", en: "woman" },
  // 地铁玩偶装扮模板默认值
  costume_material: { cn: "羊毛", en: "wool" },
  subway_costume: { cn: "粉色羊毛兔子装扮", en: "Pink wool rabbit costume" },
  location: { cn: "日本地铁", en: "Japanese subway" },
  accessory: { cn: "粉色花朵发夹", en: "pink flower hair clip" },
  // 饮料产品模板默认值
  drink_product: { cn: "芬达软饮料罐", en: "Fanta softdrink can" },
  drink_action: { cn: "爆炸，橙子从罐中涌出", en: "exploding with oranges bursting from the can" },
  drink_background: { cn: "橙色背景", en: "orange background" },
  drink_camera_angle: { cn: "高角度俯拍橙汁旋转形成的圆弧", en: "high angle overhead shot capturing the swirling arc of orange juice" },
  // 护肤品广告模板默认值
  skincare_product: { cn: "精华滴管瓶", en: "serum dropper bottle" },
  skincare_color: { cn: "粉桃色", en: "pink-peach colored" },
  fantasy_character_pose: { cn: "坐在瓶盖上", en: "sitting on the bottle cap" },
  fantasy_dress_style: { cn: "优雅飘逸的连衣裙", en: "elegant flowing dress" },
  fantasy_floating_elements: { cn: "成熟桃子和桃子切片", en: "ripe peaches and peach slices" },
  fantasy_sky_background: { cn: "明亮清澈的蓝天", en: "bright clear blue sky" },
  pastel_color_palette: { cn: "粉桃色和天蓝色", en: "pastel peach and sky blue" },
  // 角色设计表模板默认值
  character_animal: { cn: "小兔子", en: "Little Bunny" },
  fur_color: { cn: "柔和温暖的粉彩黄色", en: "Soft warm pastel yellow" },
  body_description: { cn: "大圆头和小椭圆身体", en: "Large round head and small oval body" },
  character_accessories: { cn: "小红橙色探险家围巾和棕色小挎包", en: "Small red-orange adventurer scarf and tiny brown satchel" },
  character_persona: { cn: "可爱的奇幻探险家", en: "Cute fantasy explorer" },
  design_sheet_type: { cn: "角色转身表（character turnaround sheet）", en: "Character turnaround sheet" },
  // 漫画页面模板默认值
  comic_subject: { cn: "两个潜行的忍者", en: "two stealthy ninjas" },
  comic_location: { cn: "古日本寺庙", en: "ancient Japanese temple" },
  comic_time: { cn: "夜晚", en: "night" },
  comic_art_style: { cn: "传统黑白漫画风格", en: "traditional black and white manga style" },
  // 创意容器模板默认值
  container_type: { cn: "750ml玻璃酒瓶", en: "750ml glass wine bottle" },
  view_type: { cn: "横截面视图", en: "cross-section view" },
  landscape_location: { cn: "特兰西瓦尼亚葡萄园", en: "Transylvania vineyard" },
  landscape_features: { cn: "起伏山丘、整齐葡萄架、土路、小农舍", en: "rolling hills, neat vine rows, dirt paths, small farmhouse" },
  lighting_time: { cn: "清晨阳光", en: "morning sunlight" },
  detail_level: { cn: "复杂细节", en: "intricate details" },
  glass_effect: { cn: "真实玻璃反射", en: "realistic glass reflections" },
  background_type: { cn: "工作室背景", en: "studio background" },
  // 博物馆图鉴信息图模板默认值
  museum_theme: { cn: "明制汉服", en: "Ming Dynasty Hanfu" },
  ad_regional_style: { cn: "中式广告", en: "Chinese advertisements" },
  city_landmarks: {
    cn: "珠江新城双塔、猎德大桥、白云山轮廓、岭南骑楼",
    en: "Zhujiang New Town twin towers, Liede Bridge, Baiyun Mountain silhouette, Lingnan arcade buildings"
  },
  poster_texture_style: { cn: "大面积留白 + 淡宣纸肌理", en: "Generous negative space with light rice-paper grain" },
  classical_poem: { cn: "春夜喜雨", en: "A Welcome Rain on a Spring Night" },
  app_icon_category: { cn: "运动类APP", en: "Sports app" },
  collab_theme_a: { cn: "小王子", en: "The Little Prince" },
  collab_theme_b: { cn: "SpaceX", en: "SpaceX" },
  card_game_collection: { cn: "中国古代诗人", en: "Ancient Chinese poets" },
  ancient_celebrity: { cn: "苏轼", en: "Su Shi" },
  heritage_building: { cn: "天坛", en: "Temple of Heaven" },
  retro_device_theme: { cn: "老式电子设备", en: "vintage electronic devices" },
  utility_app_category: { cn: "植物照顾养护记录", en: "plant care and maintenance tracker" },
  subject_product: { cn: "草莓苏打水", en: "Strawberry Soda" },
  apple_style_product: { cn: "3.5寸软盘", en: "3.5-inch Floppy Disk" },
  layout_style_bento: { cn: "BentoCard", en: "BentoCard" },
  arch_building_name: { cn: "古根海姆博物馆", en: "Solomon R. Guggenheim Museum" },
  lego_typography_theme: { cn: "AI时代的玩具", en: "Toys in the Age of AI" },
  sport_luxe_ensemble: {
    cn: "带有庞大袖子的超大白色极简连帽衫，光滑半透明的降落伞裤，厚重的白橙相间运动鞋",
    en: "oversized minimalist white hoodie with enormous voluminous sleeves, glossy semi-transparent parachute pants, chunky white-and-orange sneakers"
  },
  beauty_editorial_look: {
    cn: "时尚凌乱的盘发发型，金色抢眼耳环，柔和自然的妆容",
    en: "fashionably messy updo bun, bold statement gold earrings, soft natural makeup"
  },
  inflatable_studio_backdrop: {
    cn: "大型抽象光滑红粉色有机3D充气软体形状的平滑中性米色渐变背景",
    en: "large abstract smooth red-pink organic 3D inflatable soft shapes on a smooth neutral beige gradient backdrop"
  },
  hero_typography_word: { cn: "just", en: "just" },
  campaign_brand_word: { cn: "APEX", en: "APEX" },
  model_styling_outfit: {
    cn: "身穿薄荷绿短款防风外套与乳白色宽松慢跑裤",
    en: "in a mint cropped windbreaker with cream oversized joggers"
  },
  studio_set_floor: {
    cn: "暖沙色柔光环境与浅琥珀色打蜡地面",
    en: "warm sand-toned soft light with lightly amber-waxed glossy floorboards"
  },
  advert_campaign_tagline: {
    cn: "Where comfort meets ambition.",
    en: "Where comfort meets ambition."
  },
  iconic_architecture: {
    cn: "范斯沃斯住宅（密斯·凡·德罗）",
    en: "Farnsworth House (Mies van der Rohe)"
  },
  poster_art_style: { cn: "极简主义", en: "minimalist" },
  casual_mirror_outfit: {
    cn: "穿着全套黑色的休闲装，斜挎着一个包，头上戴着太阳镜",
    en: "wearing an all-black relaxed casual outfit with a crossbody bag and sunglasses perched on her head"
  },
  chibi_clone_manner: {
    cn: "摆出各种俏皮的姿势（跳跃、坐着、比耶、喝珍珠奶茶），有着明亮闪亮的大眼睛和柔和的卡通风格",
    en: "striking playful poses (jumping, sitting, peace sign, sipping bubble tea) with bright sparkling eyes and a soft cartoon look"
  },
  cozy_mirror_room: {
    cn: "背景包括一盆盆栽、木桌、中性色调的装饰和带框艺术品",
    en: "The background includes a potted plant, a wooden table, neutral-toned décor, and framed artwork"
  },
  selfie_render_blend: {
    cn: "柔和的自然光线，舒适的氛围美学，白色的涂鸦闪光和爱心，现实主义与可爱的3D卡通风格的混合，高细节",
    en: "Soft natural light, cozy lifestyle aesthetic, white doodled sparkles and hearts, hybrid of photorealism and cute 3D cartoon, highly detailed"
  },
  street_film_photography: {
    cn: "90年代经典街拍质感，FujiFilm 胶片感：细腻颗粒、略褪色与柔和对比，阴天漫射自然光",
    en: "1990s classic street-snap feel with Fujifilm texture—fine grain, gentle fade, soft contrast, diffused overcast daylight"
  },
  editorial_cover_theme: { cn: "前端部署工程师", en: "Front-end Deployment Engineer" },
  editorial_cover_subtitle: { cn: "从零开始，掌握核心技能", en: "From zero, master the core skills" },
  editorial_cover_ratio: { cn: "3:4", en: "3:4" },
  editorial_cover_cast: { cn: "男性", en: "Male" },
  editorial_cover_emotion: { cn: "理性", en: "Rational" },
  memory_core: { cn: "自动判断", en: "Auto" },
  preserved_elements: { cn: "主要物件、空间结构与色彩关系", en: "Key objects, spatial structure, and color relationships" },
  abstraction_level: { cn: "高度抽象但关系可辨", en: "Highly abstract, relationships still readable" },
  block_language: { cn: "柔和大色域与少量锐利几何切面", en: "Soft large color fields with a few sharp geometric cuts" },
  color_strategy: { cn: "从原图提取2–4种低饱和主色，并保留一个鲜明强调色", en: "Pull 2–4 low-saturation primaries from the photo, keep one vivid accent" },
  aspect_ratio: { cn: "3:4", en: "3:4" },
  main_text: { cn: "根据原图内容生成2–6字的简约短语", en: "Generate a 2–6 character spare phrase from the photo" },
  supporting_text: { cn: "根据画面生成一句克制、具体的记忆描述，也可以省略", en: "A restrained, specific memory line from the picture, or omit" },
  text_language: { cn: "跟随用户使用的语言", en: "Follow the user's language" },
  display_mode: { cn: "原图在上，抽象色块转译在下", en: "Photo on top, abstract translation below" },
  exhibition_theme: { cn: "根据照片生成2–8字的含蓄主题", en: "A 2–8 character understated theme from the photo" },
  description: { cn: "根据画面真实内容生成一句简短描述", en: "One short caption from what the picture actually shows" },
  translation_mode: { cn: "抽象重制", en: "Abstract remake" },
  translation_focus: { cn: "自动选择3–5个最具识别度的元素", en: "Auto-select 3–5 of the most recognizable elements" },
  serial_code: { cn: "NO. 02", en: "NO. 02" },
  album_title: { cn: "根据图像核心生成2–5个英文单词", en: "2–5 English words from the image’s core" },
  album_note: { cn: "根据画面生成一句简短英文描述", en: "One short English line from the picture" },
  catalog_code: { cn: "自动生成简洁的虚构编号", en: "Auto-generate a short fictional catalog code" },
  cover_style: { cn: "70年代现代主义专辑设计", en: "1970s modernist album design" },
  "fruit_cut": {
    "cn": "对半切开的果实",
    "en": "a halved fruit"
  },
  "enamel_metal": {
    "cn": "抛光金色",
    "en": "polished gold"
  },
  "badge_backdrop": {
    "cn": "深海军蓝粗亚麻布",
    "en": "dark navy coarse linen"
  },
  "future_city_motif": {
    "cn": "环形建筑与蜿蜒高架步道",
    "en": "ring-shaped buildings and winding elevated paths"
  },
  "poster_muted_palette": {
    "cn": "奶油白、鼠尾草绿与灰蓝",
    "en": "cream, sage green and dusty blue"
  },
  "citrus_campaign_fruit": {
    "cn": "柠檬",
    "en": "lemon"
  },
  "fictional_drink_brand": {
    "cn": "LIMORA",
    "en": "LIMORA"
  },
  "travel_country": {
    "cn": "意大利",
    "en": "Italy"
  },
  "glass_frame_shape": {
    "cn": "拱形玻璃展框",
    "en": "arched glass display"
  },
  "astronaut_break": {
    "cn": "手捧冒着热气的小杯子",
    "en": "holding a small steaming mug"
  },
  "apparel_ink_palette": {
    "cn": "深海军蓝底，浅蓝与白色油墨",
    "en": "navy fabric with pale blue and white ink"
  },
  "perfume_floral_set": {
    "cn": "薄荷绿玫瑰与浅绿叶片",
    "en": "mint-green roses and pale green leaves"
  },
  "summer_cup_fruit": {
    "cn": "红色草莓果肉",
    "en": "red strawberry pieces"
  },
  "eye_color": {
    "cn": "绿色",
    "en": "green"
  },
  "fantasy_weapon": {
    "cn": "中世纪长剑",
    "en": "medieval sword"
  },
  "paper_cut_finish": {
    "cn": "金属箔或光泽纸",
    "en": "metallic foil or glossy paper"
  },
  "vintage_car": {
    "cn": "经典1960年代白色汽车",
    "en": "classic 1960s white car"
  },
  "note_pen": {
    "cn": "黑色圆珠笔",
    "en": "black ballpoint pen"
  },
  "cosmic_creature": {
    "cn": "锦鲤",
    "en": "koi"
  },
  "constellation_theme": {
    "cn": "射手座",
    "en": "Sagittarius"
  },
  "classical_ensemble": {
    "cn": "八仙",
    "en": "the Eight Immortals"
  },
  "illustration_subject": {
    "cn": "散步的猫咪",
    "en": "a strolling cat"
  },
  "artwork_signature": {
    "cn": "STUDIO",
    "en": "STUDIO"
  },
  "recipe_page_layout": {
    "cn": "杂志双页跨页",
    "en": "a magazine double-page spread"
  },
  "snack_subject": {
    "cn": "夹心威化饼干",
    "en": "a filled wafer biscuit"
  },
  "flower_field_species": {
    "cn": "薰衣草",
    "en": "lavender"
  },
  "rpg_item_theme": {
    "cn": "经典中世纪奇幻",
    "en": "classic medieval fantasy"
  },
  "mecha_heavy_weapon": {
    "cn": "巨型轨道炮",
    "en": "massive rail cannon"
  },
  "portrait_mood": {
    "cn": "安静从容",
    "en": "quiet and composed"
  },
  "editorial_palette": {
    "cn": "钴蓝与琥珀金",
    "en": "cobalt blue and amber gold"
  },
  "studio_brand": {
    "cn": "AURELIA",
    "en": "AURELIA"
  },
  "poster_headline": {
    "cn": "新的旅程",
    "en": "A NEW JOURNEY"
  },
  "sprite_action": {
    "cn": "待机与招手",
    "en": "idle and waving"
  },
  "anime_outfit": {
    "cn": "蓝白学院制服",
    "en": "a blue-and-white academy uniform"
  },
  "comic_cast": {
    "cn": "一对青年朋友",
    "en": "two young adult friends"
  },
  "art_paper": {
    "cn": "暖白水彩纸",
    "en": "warm white watercolor paper"
  },
  "product_stage": {
    "cn": "暖米色大理石台",
    "en": "a warm beige marble plinth"
  },
  "botanical_accent": {
    "cn": "白色小花与绿藤",
    "en": "small white flowers and green vines"
  },
  "surprise_box": {
    "cn": "系蝴蝶结的礼物盒",
    "en": "a gift box tied with a bow"
  },
  "surprise_character": {
    "cn": "白色小鬼",
    "en": "a little white ghost"
  },
  "surprise_reveal_action": {
    "cn": "跳出来",
    "en": "jumps out"
  },
  "elastic_motion_feedback": {
    "cn": "果冻或弹簧般的力学反馈",
    "en": "jelly-like or spring-like physical feedback"
  },
  "peek_reaction_action": {
    "cn": "从门后探头",
    "en": "peek out from behind a door"
  },
  "reaction_bubble_text": {
    "cn": "叫我干啥？",
    "en": "What do you need me for?"
  },
  "like_hand_style": {
    "cn": "3D 形态的小手",
    "en": "a small 3D hand"
  },
  "like_heart_color": {
    "cn": "红色",
    "en": "red"
  },
  "like_thanks_text": {
    "cn": "感谢点赞～",
    "en": "Thanks for the like!"
  },
  "noise_cancel_headphones": {
    "cn": "银白色头戴式降噪耳机",
    "en": "silver-white over-ear noise-canceling headphones"
  },
  "noise_cancel_headline": {
    "cn": "极致降噪",
    "en": "Ultimate Noise Cancellation"
  }
};

