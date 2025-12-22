// 詞庫與分類配置，供 App 按需引入

export const INITIAL_CATEGORIES = {
  character: { id: "character", label: "人物 (CHARACTER)", color: "blue" },
  item: { id: "item", label: "物品 (ITEM)", color: "amber" },
  action: { id: "action", label: "動作 (ACTION)", color: "rose" },
  location: { id: "location", label: "地點 (LOCATION)", color: "emerald" },
  visual: { id: "visual", label: "畫面 (VISUALS)", color: "violet" },
  other: { id: "other", label: "其他 (OTHER)", color: "slate" }
};

// --- 初始資料配置 (Updated with new banks for examples) ---
export const INITIAL_BANKS = {
  role: {
    label: "角色身分",
    category: "character",
    options: ["遊戲與動漫概念美術設計大師", "資深影視角色原畫師", "賽博龐克風格設計師", "暗黑幻想風格插畫師"]
  },
  subject: {
    label: "主體對象",
    category: "character",
    options: ["女性角色", "男性角色", "機甲少女", "怪物擬人化", "奇幻種族(精靈/惡魔)"]
  },
  character_companion: {
    label: "合影角色",
    category: "character",
    options: ["死侍 (Deadpool)", "超人 (Superman)", "愛因斯坦 (Einstein)", "神奇女俠 (Wonder Woman)", "鋼鐵俠 (Iron Man)", "皮卡丘 (Pikachu)", "哥斯拉 (Godzilla)", "初音未來 (Hatsune Miku)"]
  },
  layout_focus: {
    label: "構圖重心",
    category: "visual",
    options: ["全身立繪", "半身肖像", "動態戰鬥姿勢", "背影回眸"]
  },
  grid_pose: {
    label: "九宮格動作",
    category: "action",
    options: [
      "前景手指虛化", "目光鎖定鏡頭", "單色下巴托手", "透過模糊肩帶拍攝",
      "正面特寫陰影", "斜角拍攝", "雙手置於鎖骨", "坐姿半身側面",
      "側面微距水滴", "閉眼仰頭享受", "用手遮擋陽光", "回眸一笑", "吹泡泡糖特寫",
      "正面直視鏡頭，表情平靜，眼神清澈", "凝視鏡頭，嘴角微微上揚，展現自信",
      "專注地看著鏡頭，表情柔和，眼神溫和", "側身回望，眼神溫柔，嘴角上揚",
      "轉身回眸，長髮飄逸，笑容自然", "手輕撫下巴，表情優雅，眼神柔和",
      "單手支撐下巴，表情自然，眼神專注", "利用肩帶營造景深，焦點清晰在眼睛",
      "正在吹泡泡糖，表情可愛，眼神專注", "側面微距特寫，突出面部輪廓和細節"
    ]
  },

  camera_angle: {
    label: "拍攝角度",
    category: "visual",
    options: ["臉頰和頸部特寫", "目光鎖定鏡頭", "單色下巴托手肖像", "透過模糊的肩帶拍攝", "正面特寫，面部陰影交錯", "斜角拍攝的原始人像", "雙手置於鎖骨附近的特寫", "坐姿半身側面照", "側面微距照"]
  },
  connectors: {
    label: "視覺引導",
    category: "visual",
    options: ["手繪箭頭或引導線", "虛線連接", "彩色光束", "半透明數據線"]
  },
  underwear_style: {
    label: "私密內著拆解",
    category: "item",
    options: ["成套的蕾絲內衣褲", "運動風格純棉內衣", "極簡主義絲綢內衣", "哥德風格綁帶內衣"]
  },
  clothing: {
    label: "人物服飾",
    category: "item",
    options: ["炭灰色無袖連衣裙", "白色絲綢襯衫", "黑色修身西裝", "戰術機能風外套", "復古碎花連衣裙"]
  },
  clothing_male: {
    label: "男性服飾",
    category: "item",
    options: ["剪裁合體的深藍西裝", "復古棕色皮夾克", "戰術背心與工裝褲", "寬鬆的灰色衛衣", "白色亞麻襯衫", "黑色高領毛衣"]
  },
  clothing_female: {
    label: "女性服飾",
    category: "item",
    options: ["炭灰色無袖連衣裙", "絲綢吊帶晚禮服", "機車皮衣與短裙", "白色蕾絲襯衫", "黑色緊身連體衣", "優雅的香奈兒風套裝"]
  },
  expressions: {
    label: "表情集",
    category: "character",
    options: ["瘋狂、病嬌、狂喜", "羞澀、躲閃、紅暈", "冷漠、鄙視、高傲", "痛苦、忍耐、咬唇"]
  },
  character_originality: {
    label: "人物原創性",
    category: "character",
    options: ["創作一個原創人物", "使用附圖中的人物，確保結果與人物一致性", "對知名角色再創作"]
  },
  character_groups: {
    label: "人物組合",
    category: "character",
    options: [
      "中國古代開國皇帝",
      "漫威人物",
      "金庸古龍武俠人物",
      "三國知名人物",
      "知名軍事家（拿破崙、凱撒、曹操等）",
      "全球知名運動員",
      "中外知名偵探（包青天、狄仁傑、福爾摩斯、柯南等）",
      "動漫遊戲角色",
      "歷史名人",
      "明星藝人"
    ]
  },
  social_media: {
    label: "社交媒體",
    category: "location",
    options: [
      "臉書塗鴉牆",
      "微博",
      "Twitter(X)",
      "小紅書",
      "Instagram",
      "Facebook",
      "抖音",
      "TikTok"
    ]
  },
  texture_zoom: {
    label: "材質特寫",
    category: "visual",
    options: ["凌亂感與私處汗漬", "皮膚上的勒痕與紅印", "絲襪的抽絲細節", "皮革的光澤與磨損"]
  },
  action_detail: {
    label: "動作細節",
    category: "action",
    options: ["帶著項圈的爬行", "雙手被縛在身後的掙扎", "跪姿並展示鞋底", "拉扯領口的誘惑"]
  },
  special_view: {
    label: "特殊視角",
    category: "visual",
    options: ["被踩在腳下的仰視視角", "從門縫中偷窺的視角", "鏡子反射的背影", "監控攝像頭的俯視視角"]
  },
  bag_content: {
    label: "隨身包袋",
    category: "item",
    options: ["日常通勤包或手拿包", "戰術腿包", "可愛的毛絨背包", "透明材質的痛包"]
  },
  cosmetics: {
    label: "美妝與護理",
    category: "item",
    options: ["常用的化妝品組合", "散落的口紅與粉餅", "便攜式補妝鏡", "香水小樣與護手霜"]
  },
  private_items: {
    label: "私密生活物件",
    category: "item",
    options: ["震動棒與項圈", "手銬與眼罩", "鞭子與蠟燭", "潤滑液與安全套"]
  },
  art_style: {
    label: "畫風",
    category: "visual",
    options: ["高品質的 2D 插畫風格", "寫實厚塗風格", "賽博龐克霓虹風格", "水彩手繪風格"]
  },
  background_style: {
    label: "背景風格",
    category: "visual",
    options: ["漫畫網格筆記本", "藍圖設計稿紙", "工業風金屬背景", "極簡純色背景"]
  },
  classic_scene: {
    label: "經典場景",
    category: "location",
    options: [
      "駭客任務",
      "神隱少女",
      "瘋狂動物城（Zootopia）",
      "宅男行不行",
      "霍格華茲魔法學院",
      "侏羅紀公園叢林入口",
      "星際大戰塔圖因集市",
      "魔戒夏爾",
      "權力遊戲君臨城城牆",
      "全面啟動摺疊城市",
      "賽博龐克霓虹夜市",
      "未來城市空港樞紐"
    ]
  },
  position: {
    label: "文字位置",
    category: "location",
    options: ["頂部中央", "底部中央", "左上角偏中", "右上角偏中", "畫面中上方懸浮"]
  },
  render_style: {
    label: "渲染風格",
    category: "visual",
    options: [
      "Octane Render 和 Cinema 4D",
      "樂高積木風格",
      "Unreal Engine 5 寫實光追",
      "Pixar 卡通渲染",
      "黏土動畫質感",
      "手辦級實體渲染",
      "3D像素風格",
      "手工毛線針織風格",
      "毛線針織",
      "毛氈與黏土",
      "紙殼紙板"
    ]
  },
  show_name: {
    label: "劇名",
    category: "other",
    options: ["鐵達尼號", "龍貓", "哈利·波特", "星際穿越", "千與千尋", "復仇者聯盟"]
  },
  character_name: {
    label: "角色",
    category: "character",
    options: ["Jack and Rose", "龍貓", "哈利·波特", "庫珀", "千尋", "綠巨人", "薩諾斯", "鋼鐵俠"]
  },
  art_type: {
    label: "藝術門類",
    category: "other",
    options: ["美術學", "時尚學", "建築學", "攝影學", "雕塑藝術", "工業設計"]
  },
  company: {
    label: "公司",
    category: "location",
    options: [
      "Apple",
      "任天堂（Nintendo）",
      "SONY",
      "宜家（IKEA）"
    ]
  },
  ratio: {
    label: "畫幅比例",
    category: "visual",
    options: [
      "3:4直式構圖",
      "9:16直式構圖",
      "1:1",
      "4:3橫式構圖",
      "16:9橫式構圖",
      "圓形畫幅"
    ]
  },
  // Fashion Template additions
  fashion_deconstruct: {
    label: "穿搭解構",
    category: "item",
    options: ["整齊折疊的外套和精緻的高跟鞋", "散落的配飾與包包", "懸掛的襯衫與百褶裙", "堆疊的金屬配飾與皮帶"]
  },
  toy_companion: {
    label: "互動公仔",
    category: "item",
    options: ["Labubu藝術公仔", "暴力熊積木熊", "泡泡瑪特Molly", "復古泰迪熊", "賽博龐克機械狗"]
  },

  // Old ones preserved for compatibility or other templates
  lens_param: {
    label: "九宮格鏡頭",
    category: "visual",
    options: ["85mm, f/1.8", "85mm, f/2.0", "50mm, f/2.2", "50mm, f/2.5", "50mm, f/3.2", "35mm, f/4.5", "85mm, f/1.9", "50mm, f/1.8", "85mm, f/2.2", "50mm, f/2.0"]
  },
  lighting: {
    label: "燈光佈置",
    category: "visual",
    options: ["大型頂置柔光箱，輕微側向反射光", "自然窗光", "倫勃朗光", "賽博龐克霓虹光", "影棚硬光"]
  },
  sticker_core: {
    label: "核心貼紙",
    category: "item",
    options: ["使用者穿著甜美約會裝的照片", "復古搖滾樂隊T恤穿搭", "日系JK制服穿搭", "極簡職場通勤裝"]
  },
  sticker_decor: {
    label: "裝飾元素",
    category: "item",
    options: ["手繪愛心、閃光符號", "星星、月亮貼紙", "復古郵票與票據", "賽博故障風Glitch元素"]
  },
  action_pose: {
    label: "互動姿勢",
    category: "action",
    options: ["用手指在男人腦後比劃'兔耳朵'", "勾肩搭背比V字手勢", "互相指著對方大笑", "背靠背酷炫站姿"]
  },
  background_scene: {
    label: "背景場景",
    category: "location",
    options: ["俯瞰紐約市的復仇者大廈樓頂", "廢棄的工業倉庫", "熙熙攘攘的時代廣場", "外太空飛船內部"]
  },

  // Fish Eye Urban Template additions
  lens_type: {
    label: "鏡頭類型",
    category: "visual",
    options: ["標準鏡頭", "廣角鏡頭", "長焦鏡頭", "極端魚眼鏡頭", "移軸鏡頭", "微距鏡頭"]
  },
  school_uniform: {
    label: "校服樣式",
    category: "item",
    options: ["傳統水手服校服", "灰色開衫和格子裙校服", "英倫風百褶裙校服", "日系JK制服", "運動校服", "冬季大衣校服"]
  },
  urban_location: {
    label: "城市地點",
    category: "location",
    options: ["澀谷十字路口", "東京塔下", "時代廣場", "艾菲爾鐵塔旁", "中央公園", "北京王府井", "上海外灘", "香港維多利亞港"]
  },
  dynamic_action: {
    label: "動態動作",
    category: "action",
    options: ["一隻手誇張地伸向鏡頭前景", "雙臂張開擁抱天空", "旋轉跳躍", "奔跑前進", "蹲下撿拾", "揮手致意", "舞蹈姿勢", "比心手勢"]
  },
  fingernail_detail: {
    label: "手指甲細節",
    category: "visual",
    options: ["手指甲清晰可見", "塗有鮮豔指甲油", "自然裸色指甲", "裝飾有鑽石指甲", "漸變色指甲", "藝術圖案指甲"]
  },
  building_cluster: {
    label: "建築群",
    category: "location",
    options: ["扭曲的澀谷109大樓和其他建築林立", "紐約摩天大樓群", "巴黎古典建築", "上海現代高層建築", "東京傳統寺廟與現代建築混合", "倫敦金融城高樓"]
  },
  monster_element: {
    label: "怪獸元素",
    category: "character",
    options: ["巨大的粉色和藍色漸變卡通怪獸", "機械機器人怪獸", "神話傳說中的龍", "外星生物", "海洋深淵巨獸", "森林精靈"]
  },
  monster_feature: {
    label: "怪獸特徵",
    category: "character",
    options: ["巨大的觸手和角", "鋒利的爪子和牙齒", "多彩的翅膀", "發光的眼睛", "金屬外殼", "藤蔓植物"]
  },
  distorted_city: {
    label: "扭曲城市",
    category: "location",
    options: ["扭曲的城市景觀", "鏡面反射的城市", "夢幻泡泡中的城市", "像素化的城市", "水墨畫風格的城市", "未來科幻城市"]
  },
  lighting_atmosphere: {
    label: "燈光氛圍",
    category: "visual",
    options: ["陽光明媚", "月光皎潔", "霓虹燈閃爍", "燭光搖曳", "舞台聚光燈", "自然晨光", "夕陽餘暉", "室內暖光"]
  },
  shadow_contrast: {
    label: "陰影對比",
    category: "visual",
    options: ["光影對比強烈", "柔和的陰影", "戲劇性陰影", "無陰影平光", "輪廓光", "背光剪影"]
  },
  travel_location: {
    label: "旅遊地點",
    category: "location",
    options: [
      "西藏拉薩布達拉宮",
      "湖南林中小寨",
      "東北雪鄉",
      "老北京胡同",
      "雲南大理洱海",
      "新疆喀納斯湖",
      "四川九寨溝",
      "桂林漓江",
      "張家界天門山",
      "敦煌莫高窟",
      "內蒙古呼倫貝爾草原",
      "台灣日月潭"
    ]
  },
  comic_scene: {
    label: "漫畫場景",
    category: "location",
    options: [
      "唯美的臥室",
      "繁華的街頭",
      "溫馨的教室",
      "現代咖啡廳",
      "公園長椅",
      "圖書館角落",
      "藝術工作室",
      "屋頂天台",
      "火車站月台",
      "書店一角"
    ]
  },
  designer: {
    label: "設計師",
    category: "character",
    options: [
      "安東尼·高迪 (Antoni Gaudí)",
      "Jonathan Ive (Jony Ive)",
      "Gio Ponti",
      "迪特·拉姆斯 (Dieter Rams)",
      "菲利普·斯塔克 (Philippe Starck)",
      "原研哉 (Kenya Hara)",
      "深澤直人 (Naoto Fukasawa)",
      "扎哈·哈迪德 (Zaha Hadid)",
      "馬克·紐森 (Marc Newson)",
      "湯姆·迪克森 (Tom Dixon)",
      "賈斯珀·莫里森 (Jasper Morrison)",
      "康斯坦丁·葛切奇 (Konstantin Grcic)"
    ]
  },
  design_item: {
    label: "設計物品",
    category: "item",
    options: [
      "無人機",
      "撞球桌",
      "拖拉機",
      "機械鍵盤",
      "復古打字機",
      "單反相機",
      "掃地機器人",
      "咖啡機",
      "檯燈",
      "椅子",
      "音響系統",
      "手錶",
      "自行車",
      "電動滑板車",
      "藍牙耳機",
      "智慧音箱",
      "刮鬍刀",
      "電風扇",
      "水壺"
    ]
  },
  rain_shape: {
    label: "雨水形象",
    category: "visual",
    options: ["芭蕾舞者", "飛舞的蝴蝶", "奔跑的駿馬", "綻放的蓮花", "輕盈的羽毛", "靈動的音符"]
  }
};

export const INITIAL_DEFAULTS = {
  role: "遊戲與動漫概念美術設計大師",
  subject: "女性角色",
  character_companion: "死侍 (Deadpool)",
  layout_focus: "全身立繪",
  camera_angle: "臉頰和頸部特寫",
  connectors: "手繪箭頭或引導線",
  underwear_style: "成套的蕾絲內衣褲",
  clothing: "炭灰色無袖連衣裙",
  clothing_male: "剪裁合體的深藍西裝",
  clothing_female: "炭灰色無袖連衣裙",
  expressions: "瘋狂、病嬌、狂喜",
  character_originality: "創作一個原創人物",
  character_groups: "中外知名偵探（包青天、狄仁傑、福爾摩斯、柯南等）",
  social_media: "臉書塗鴉牆",
  texture_zoom: "凌亂感與私處汗漬",
  action_detail: "帶著項圈的爬行",
  special_view: "被踩在腳下的仰視視角",
  bag_content: "日常通勤包或手拿包",
  cosmetics: "常用的化妝品組合",
  private_items: "震動棒與項圈",
  art_style: "高品質的 2D 插畫風格",
  background_style: "漫畫網格筆記本",
  fashion_deconstruct: "整齊折疊的外套和精緻的高跟鞋",
  toy_companion: "Labubu藝術公仔",
  classic_scene: "駭客任務",
  render_style: "Octane Render 和 Cinema 4D",
  position: "頂部中央",
  company: "任天堂（Nintendo）",
  ratio: "3:4直式構圖",

  // Grid defaults
  grid_pose: "前景手指虛化",

  // Legacy defaults
  lens_param: "85mm, f/1.8",
  lighting: "大型頂置柔光箱，輕微側向反射光",
  sticker_core: "使用者穿著甜美約會裝的照片",
  sticker_decor: "手繪愛心、閃光符號",
  action_pose: "用手指在男人腦後比劃'兔耳朵'",
  background_scene: "俯瞰紐約市的復仇者大廈樓頂",

  // Fish Eye Urban defaults
  lens_type: "極端魚眼鏡頭",
  school_uniform: "灰色開衫和格子裙校服",
  urban_location: "澀谷十字路口",
  dynamic_action: "一隻手誇張地伸向鏡頭前景",
  fingernail_detail: "手指甲清晰可見",
  building_cluster: "扭曲的澀谷109大樓和其他建築林立",
  crowd_traffic: "擠滿行人和車輛",
  monster_element: "巨大的粉色和藍色漸變卡通怪獸",
  monster_feature: "巨大的觸手和角",
  distorted_city: "扭曲的城市景觀",
  lighting_atmosphere: "陽光明媚",
  shadow_contrast: "光影對比強烈",
  travel_location: "西藏拉薩布達拉宮",
  comic_scene: "唯美的臥室",
  designer: "Jonathan Ive (Jony Ive)",
  design_item: "無人機",
  rain_shape: "芭蕾舞者",
  art_type: "美術學",
  show_name: "龍貓",
  character_name: "龍貓"
};

