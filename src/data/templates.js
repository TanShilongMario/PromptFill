/**
 * @typedef {Object} TemplateConfig
 * @property {string} id - 唯一标识符，建议使用 'tpl_' 前缀
 * @property {string|Object} name - 模板显示名称，支持双语对象 {cn: string, en: string} 或单语言字符串
 * @property {string|Object} content - 模板内容，支持 markdown 和 {{variable}} 变量，支持双语对象 {cn: string, en: string} 或单语言字符串
 * @property {string} imageUrl - 预览缩略图 URL
 * @property {string[]} [imageUrls] - 多图预览数组
 * @property {Object[]} [source] - 参考素材数组
 * @property {string} source[].type - 素材类型 ('image' | 'video')
 * @property {string} source[].url - 素材链接
 * @property {Object} source[].label - 素材标签 {cn, en}
 * @property {Object.<string, string|Object>} selections - 默认选中的变量值 map，支持双语对象或字符串
 * @property {string[]} tags - 模板标签数组，可选值：建筑、人物、摄影、产品、图表、卡通、宠物、游戏、创意
 * @property {string|string[]} language - 模板语言，可选值：
 *   - 'cn' - 仅支持中文
 *   - 'en' - 仅支持英文
 *   - ['cn', 'en'] - 支持双语（默认值）
 * 
 * @example 双语模板
 * {
 *   id: "tpl_example",
 *   name: { cn: "示例模板", en: "Example Template" },
 *   content: { cn: "中文内容...", en: "English content..." },
 *   language: ["cn", "en"]
 * }
 * 
 * @example 单语言模板（仅中文）
 * {
 *   id: "tpl_cn_only",
 *   name: "仅中文模板",
 *   content: "中文内容...",
 *   language: "cn",
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"  ,
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"// 或 ["cn"]
 * }
 */

/**
 * 模板系统版本号，每次更新 templates.js 或 banks.js 时请更新此版本号
 */
export const SYSTEM_DATA_VERSION = "0.9.0";

/**
 * 分享功能正式环境域名（扫码导入需使用公网可访问地址）
 * 留空则自动使用当前访问地址
 */
export const PUBLIC_SHARE_URL = "https://aipromptfill.com";

export const TEMPLATE_SKETCH_REALITY_COMPARISON = {
  cn: `### 手绘速写与实景对比

刚刚画完速写，把画纸和实景放在一起拍摄，展示"看我画得多像"的效果。

**核心场景：**
一个人手持刚刚完成的速写作品，画纸旁边就是画中所描绘的真实场景。两者并排同框，形成强烈的视觉对比——左边是真实的建筑或场景，右边是手中的速写画作。画纸内容必须与实景完美对应，展现出高超的绘画技巧和观察力。

**构图布局：**
- 手绘画作：手持画纸，位于画面一侧（右侧或左侧均可），清晰展示完整的速写作品
- 真实场景：画纸旁边就是画中描绘的真实场景，两者在同一画面中
- 速写风格：采用 {{line_art_style}}，展现手绘的艺术质感
- 分离展示：画纸和实景是两个独立的部分，不是融合叠加，而是物理分离的对比展示

**视觉效果：**
- 手绘部分：清晰的线条、流畅的笔触、完整的构图，展现速写的艺术魅力
- 实景部分：真实的场景细节、自然的光影、丰富的色彩，与手绘形成呼应
- 对比效果：观众可以清楚地看到速写与实景的相似度，感受到"画得真像"的赞叹
- 整体氛围：自然真实的拍摄感，带有轻微的颗粒感和胶片质感，像是艺术家完成作品后的纪念照片

**情感表达：**
这不是融合特效，而是真实的对比展示——艺术家站在自己刚刚描绘的场景前，举起画纸与实景合影，展现对场景的观察和再现能力。`,
  en: `### Sketch to Reality Comparison

Just finished a sketch, placing the artwork alongside the real scene for a photo, showing "look how accurately I captured this" effect.

**Core Scene:**
A person holding a freshly completed sketch drawing, with the real scene depicted in the artwork visible right next to the paper. Both elements share the same frame, creating a strong visual comparison—the real building or scene on one side, the sketch drawing in hand on the other. The artwork must perfectly correspond to the actual scene, demonstrating exceptional drawing skill and observation.

**Composition Layout:**
- Hand-drawn artwork: Holding the sketch paper on one side of the frame (right or left), clearly displaying the complete sketch
- Real scene: Immediately beside the paper is the actual scene depicted in the drawing, both within the same shot
- Sketch style: Using {{line_art_style}}, showcasing the artistic quality of the hand-drawn work
- Separated display: The drawing and real scene are two independent elements, not blended or overlapped, but physically separate for comparison

**Visual Effects:**
- Sketch portion: Clear lines, fluid brushstrokes, complete composition, showcasing the artistic charm of the sketch
- Real scene portion: Authentic scene details, natural lighting, rich colors, echoing with the hand-drawn work
- Comparison effect: Viewers can clearly see the similarity between sketch and reality, feeling the amazement of "it looks just like the real thing"
- Overall atmosphere: Natural authentic photography feel, with subtle grain and film texture, like a commemorative photo after the artist completed their work

**Emotional Expression:**
This is not a fusion effect, but a genuine comparison display—the artist standing before the scene they just depicted, holding up their drawing alongside the actual view, demonstrating their power of observation and recreation.`
};

export const TEMPLATE_BRAND_CONCEPT_OBJECT = {
  cn: `### 品牌概念单品 (Brand Concept Object)
一张由 {{company}} 设计并概念化的高端、光滑的概念艺术杂志编辑照片，展示一个独特且出乎意料的功能性物品。

**1. 概念与物品 (AI 发明):**
基于 {{company}} 的设计哲学、品牌传承和材料语言，通过品牌的视角重新诠释并设计一个全新的实用单品：{{design_item}}。该物品应具有雕塑感，同时具备功能性，且绝非该品牌常规生产的服装或包袋。

**2. 材质与细节:**
该物品由 {{company}} 标志性的超优质、高触感材料制成（例如：具有岁月的异域皮革、拉丝航空级钛金属、雕刻哑光陶瓷、模制碳纤维或高科技时尚面料）。每个细节都超写实：清晰的缝线、微观材料纹理、精密刻印以及复杂的材质对比。

**3. 摄影与灯光:**
使用飞思中画幅相机配合 100mm 微距镜头拍摄。极浅的景深，焦点清晰地聚集在物品的核心细节上，背景呈现出奶油般细腻平滑的虚化效果。灯光是复杂的工作室柔光箱布光：柔和、包裹式的补光，配合精准的轮廓光，以突出轮廓和材质纹理。

**4. 环境:**
纯净、超浅的马卡龙色调（如：脱饱和薄荷绿、浅粉色或乳白色）的无缝工作室环形背景，无阴影。

**5. 布局与 UI 元素:**
- **右下角:** {{company}} 的小型、低调、单色灰色 Logo。
- **左下角:** 小型、极简的单色灰色文本描述。格式：“CONCEPT STUDY: [产品名称]. MATERIAL: [主要材质]. SS25。”字体风格类似 Manrope Regular，字间距紧凑。

**规格:**
- **画幅:** {{ratio}}`,
  en: `### Brand Concept Object
A high-end, glossy concept art magazine editorial photograph of a unique, unexpected functional object conceptualized and designed by {{company}}.

**1. The Concept & Object (AI Invention):**
Based on the design philosophy, heritage, and material vocabulary of {{company}}, reinterpret and design a novel utility product: {{design_item}}. The object should feel sculptural yet functional, and definitely NOT a standard item like clothing or bags usually produced by the brand.

**2. Materials & Details (Hyper-Premium):**
The object is constructed from ultra-premium, highly tactile materials characteristic of {{company}} (e.g., patinated exotic leather, brushed aerospace-grade titanium, sculpted matte ceramics, molded carbon fiber, or technical high-fashion textiles). Every detail is hyper-realistic: visible stitching, microscopic material grain, precision engravings, and complex texture contrasts.

**3. Photography & Lighting (Cinematic Studio):**
Shot on a medium format Phase One camera with a 100mm macro lens. Extremely shallow depth of field, with sharp focus on the hero details of the object and a creamy, smooth bokeh background. The lighting is sophisticated studio softbox lighting: gentle, enveloping fill light with precise rim lighting to accentuate contours and material textures.

**4. Environment:**
A seamless, impeccably clean studio cyclorama background in a pure, ultra-light pastel tone (e.g., desaturated mint, pale blush, or off-white), free of shadows.

**5. Layout & UI Elements (Strict Placement):**
- **Bottom Right Corner:** A small, understated, monochrome gray logo of {{company}}.
- **Bottom Left Corner:** Small, minimalist monochrome gray text. Format: "CONCEPT STUDY: [Invented Product Name]. MATERIAL: [Main Materials]. SS25." Font styled like Manrope Regular with very tight tracking.

**Specifications:**
- **Ratio:** {{ratio}}`
};

export const TEMPLATE_WOODEN_ART_XMAS = {
  cn: `### 激光切割木质层叠艺术 (Wood Art & Xmas)
一件通过激光切割工艺制作的、细节丰富的多层木质艺术品插画。

**视觉风格:**
- **工艺:** 激光切割木质面板艺术，包含大量精细的层叠结构。
- **艺术风格:** 抽象艺术，每一层都拥有不同的互补色彩。
- **主题:** 艺术品主题为 {{xmas_theme}}，融合了几何图形与丰富的材质纹理，展现大师级水准。

**摄影与呈现:**
- **风格:** 顶级产品促销摄影风格，强调深度感与木质纤维的真实触感。
- **美学:** 专业的商业摄影构图，利用光影勾勒出每一层木板的边缘，画面干净且极具格调。

**规格:**
- **画幅:** {{ratio}}`,
  en: `### Wood Art & Xmas (Laser-Cut Layered Art)
A beautiful, detailed illustration of multi-layered wooden art created by laser cutting techniques.

**Visual Style:**
- **Technique:** Laser-cut wooden panel art with numerous intricate layers and precise craftsmanship.
- **Art Style:** Abstract art where each layer features a distinct, complementary color.
- **Theme:** The artwork theme is {{xmas_theme}}, integrating geometric shapes and rich textures, showcasing maestro-level artistry.

**Photography & Presentation:**
- **Style:** Top-tier product promotion photography, emphasizing depth and the authentic tactile quality of wood.
- **Aesthetics:** Professional commercial photography composition, using light and shadow to define the edges of each wooden layer, resulting in a clean and highly stylish image.

**Specifications:**
- **Ratio:** {{ratio}}`
};

export const DEFAULT_TEMPLATE_CONTENT = {
  cn: `### Role (角色设定)
你是一位顶尖的 {{role}}，擅长制作详尽的角色设定图（Character Sheet）。你具备“像素级拆解”的能力，能够透视角色的穿着层级、捕捉微表情变化，并将与其相关的物品进行具象化还原。你特别擅长通过 {{subject}} 的私密物品、随身物件和生活细节来侧面丰满人物性格与背景故事。

### Task (任务目标)
根据用户上传或描述的主体形象，生成一张**“全景式角色深度概念分解图”**。该图片必须包含 {{layout_focus}}，并在其周围环绕展示该人物的服装分层、不同表情、核心道具、材质特写，以及极具生活气息的私密与随身物品展示。

### Visual Guidelines (视觉规范)
**1. 构图布局 (Layout):**
- **中心位 (Center):** 放置角色的 {{layout_focus}}，作为视觉锚点。
- **环绕位 (Surroundings):** 在中心人物四周空白处，有序排列拆解后的元素。
- **视觉引导 (Connectors):** 使用{{connectors}}，将周边的拆解物品与中心人物的对应部位或所属区域连接起来。

**2. 拆解内容 (Deconstruction Details):**
- **服装分层 (Clothing Layers):** 将角色的服装拆分为单品展示
- **私密内着拆解:** 独立展示角色的内层衣物，重点突出设计感与材质。例如： {{underwear_style}} （展示细节与剪裁）。
- **表情集 (Expression Sheet):** 在角落绘制 3-4 个不同的头部特写，展示不同的情绪，如： {{expressions}} 。
- **材质特写 (Texture & Zoom):** 选取关键部位进行放大特写. 例如： {{texture_zoom}} ，增加对小物件材质的描绘。
- **动作:** 绘制特殊的动作和表情，例如：{{action_detail}}，增加动作的深度刻画。
- **特殊视角:** 绘制从某种特殊场景下拍摄的特殊视角，例如：{{special_view}}

- **关联物品 (Related Items):**
 - **随身包袋与内容物:** 绘制 {{bag_content}}，并将其“打开”，展示散落在旁的物品。
 - **美妆与护理:** 展示 {{cosmetics}}。
 - **私密生活物件:** 具象化角色隐藏面的物品。根据角色性格可能包括： {{private_items}}，需以一种设计图的客观视角呈现。

**3.风格与注释 (Style & Annotations):**
- **画风:** {{art_style}}，线条干净利落。
- **背景:** {{background_style}}，营造设计手稿的氛围。
- **文字说明:** 在每个拆解元素旁模拟手写注释，简要说明材质或品牌/型号暗示。

### Workflow (执行逻辑)
1. 分析主体的核心特征、穿着风格及潜在性格。
2. 提取可拆解的一级元素（外套、鞋子、大表情）。
3. 脑补并设计二级深度元素（她内衣穿什么风格？包里装什么？独处时用什么？）。
4. 生成一张包含所有这些元素的组合图，确保透视准确，光影统一，注释清晰。
5. 使用中文，高清输出。`,
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
  cn: `### Photo Grid Composition (九宫格摄影)

**编辑场景:** 3x3网格布局，采用冷灰色无缝背景。人物（面部特征与上传图片完全一致）身穿 {{clothing}}，确保每张照片中人物形象保持一致。

**灯光设置:** {{lighting}}，营造统一而富有层次的光影效果。

**照片细节包括 (Grid Details)：**
1. {{grid_pose}}，画面风格统一，镜头参数为 {{lens_param}}；
2. {{grid_pose}}，镜头参数为 {{lens_param}}，展现不同的拍摄角度和表情；
3. {{grid_pose}}，镜头参数为 {{lens_param}}，捕捉细腻的情感表达；
4. {{grid_pose}}，镜头参数为 {{lens_param}}，利用景深营造层次感；
5. {{grid_pose}}，镜头参数为 {{lens_param}}，突出动态瞬间的生动性；
6. {{grid_pose}}，镜头参数为 {{lens_param}}，通过前景虚化增强视觉焦点；
7. {{grid_pose}}，镜头参数为 {{lens_param}}，展现优雅的姿态和放松的状态；
8. {{grid_pose}}，镜头参数为 {{lens_param}}，捕捉自然光线下的表情变化；
9. {{grid_pose}}，镜头参数为 {{lens_param}}，微距特写展现面部细节和质感。

**后期处理:** 保持原始素材的真实感，平滑对比度，适度应用柔化效果，确保整体色调统一且富有质感。`,
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
  cn: `### Photo Grid Composition (九宫格摄影出格版)

**编辑场景:** 3x3网格布局，采用冷灰色无缝背景。人物（面部特征与上传图片完全一致）身穿 {{clothing}}，确保每张照片中人物形象保持一致。

**灯光设置:** {{lighting}}，营造统一而富有层次的光影效果。

**照片细节包括 (Grid Details)：**
1. {{grid_pose}}，画面风格统一，镜头参数为 {{lens_param}}；
2. {{grid_pose}}，镜头参数为 {{lens_param}}，展现不同的拍摄角度和表情；
3. {{grid_pose}}，镜头参数为 {{lens_param}}，捕捉细腻的情感表达；
4. {{grid_pose}}，镜头参数为 {{lens_param}}，利用景深营造层次感；
5. {{grid_pose}}，镜头参数为 {{lens_param}}，突出动态瞬间的生动性；
6. {{grid_pose}}，镜头参数为 {{lens_param}}，通过前景虚化增强视觉焦点；
7. {{grid_pose}}，镜头参数为 {{lens_param}}，展现优雅的姿态和放松的状态；
8. {{grid_pose}}，镜头参数为 {{lens_param}}，捕捉自然光线下的表情变化；
9. {{grid_pose}}，镜头参数为 {{lens_param}}，微距特写展现面部细节和质感。

**后期处理:** 保持原始素材的真实感，平滑对比度，适度应用柔化效果，确保整体色调统一且富有质感。

**需要单独处理:**中央宫格的图片不局限在自己的宫格内，形成一种从中央宫格跃出画面的3D立体视觉，中央宫格人物占据图片较大面积且全身出镜，会覆盖到其他宫格，并对其他宫格形成阴影效果，营造一种裸眼3D的视觉张力`,
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
  cn: `### Fashion Illustration Moodboard (时尚插画情绪板)
一张9:16竖屏的高级时尚插画情绪板，模拟平板扫描效果。

**背景:** 纯手绘的奶油色水彩晕染纸张，带有淡淡的粉色网格。
**视觉核心:** 数张具有明显白色模切宽边和柔和投影的亮面乙烯基贴纸。

**贴纸内容:**
- **中央:** {{sticker_core}}，光线明亮。
- **左侧:** {{fashion_deconstruct}}。
- **右下角:** 关键的隐藏层贴纸：一套折叠整齐的内衣，展现细腻纹理。
- **互动元素:** 一只穿着粉色系、与用户服装呼应的 {{toy_companion}} 正趴在一个手绘对话框上。

**装饰细节:** 周围装饰着蜡笔质感的 {{sticker_decor}} 和潦草的中文书法标注OOTD。
**注意:** 画面中绝无任何人手、笔或物理桌面背景，纯粹的平面艺术插画。`,
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
  cn: `### Character Selfie (人物趣味合影)
让 {{character_companion}} 站在男人旁边，{{action_pose}}，同时对着镜头露出调皮的表情。

**背景:** 以 {{background_scene}} 为背景。

**要求:** 保持自拍构图不变，让两个角色自然地融入画面，光影统一，互动自然。`,
  en: `### Character Selfie
Have {{character_companion}} stand next to the man, {{action_pose}}, while making a playful expression at the camera.

**Background:** Set against the backdrop of {{background_scene}}.

**Requirements:** Maintain the selfie composition, integrating both characters naturally into the frame with unified lighting and natural interaction.`
};

export const TEMPLATE_CLASSIC_SCENE = {
  cn: `### 经典场景微缩复刻

展示一个精致的、微缩 3D 卡通风格的{{classic_scene}}场景，采用清晰的 45° 俯视等轴侧视角（Isometric view）。

**核心构图：** 将主体最经典的形象突出地置于中心。自动搭配比例适宜的关键元素图标、象征性物品、迷人的小角色以及能诠释主体故事的道具。整体布局应当充满趣味且紧凑聚集，宛如一套高端的玩具盲盒套装。

**渲染与材质：** 采用{{render_style}}风格进行渲染。建模必须精细、圆润流畅且质感丰富。使用逼真的 PBR 材质：混合用于有机形态的柔和哑光粘土、用于水体/玻璃元素的光泽树脂，以及用于结构组件的光滑 PVC 材质。着重表现具有触感、“看起来手感很好”的纹理细节。

**灯光与氛围：** 采用柔和、逼真的摄影棚布光配合全局光照（Global Illumination）。利用柔和的阴影营造出温暖、舒适且充满魔力的氛围。

**布局：** 保持干净、极简的布局，使用与主体配色相协调的纯色背景。

**文字：** 在{{position}}，使用巨大的、圆润的 3D 字体醒目地展示主体名称，使其轻微悬浮于场景上方。`,
  en: `### Classic Scene Miniature Restoration
Showcase an exquisite, miniature 3D cartoon-style {{classic_scene}} scene, using a clear 45° isometric view.

**Core Composition:** Place the most classic image of the subject prominently in the center. Automatically pair it with appropriately scaled key element icons, symbolic items, charming little characters, and props that interpret the subject's story. The overall layout should be playful and tightly clustered, like a high-end toy blind box set.

**Rendering & Materials:** Render in {{render_style}} style. Modeling must be fine, rounded, smooth, and rich in texture. Use realistic PBR materials: a mix of soft matte clay for organic forms, glossy resin for water/glass elements, and smooth PVC for structural components. Focus on tactile, "looks good to touch" texture details.

**Lighting & Atmosphere:** Use soft, realistic studio lighting with Global Illumination. Utilize soft shadows to create a warm, cozy, and magical atmosphere.

**Layout:** Maintain a clean, minimalist layout with a solid color background that coordinates with the subject's color scheme.

**Text:** At {{position}}, prominently display the subject's name in giant, rounded 3D font, making it slightly float above the scene.`
};

export const TEMPLATE_CORPORATE_GROWTH = {
  cn: `### 可视化企业成长之路

**角色定义**  
你是一位企业演变建筑师 (Corporate Evolution Architect)。你的目标是创建一个超高密度、垂直堆叠的等距轴测（Isometric）3D 渲染可视化图像，展示 {{company}} 公司的技术和产品历史。通过图像展示一个企业的时间线：底部是简陋的创业故事，通过产品迭代垂直向上升起，直到现代或未来的巅峰。

**核心能力 | 关键视觉策略（rameless Tech-Lapse）：**
- **根除容器：** 严禁使用底板、边框或横截面视图。底部边缘是创业基地（车库/实验室/小办公室），无限延伸。
- **垂直时间线：** “之字形上升（Zig-Zag Ascent）”穿越创新历程。  
  - 底部（前景）：创业阶段岁月 + 第一个原型机  
  - 中部（上升中）：快速增长 / 全球扩张 / 标志性的中期产品  
  - 顶部（背景）：当前总部 / 生态系统 / 未来研发
- **集成 3D 标题：** 企业 Logo 必须渲染为巨大的、电影般的 3D 字体，矗立在前景，使用公司标志性字体/材质。

**检索与梳理：**
- 提取企业历史的几个阶段。
- 列出定义每个时代的“经典产品”。
- 劳动力演变：可视化员工与设备的变化。

**构图与光影：**  
无框架、无边界、无横截面。垂直之字形时间线，将产品代际从底部的创业阶段堆叠到未来的顶部。灯光从近现代的暖光（创业初期）过渡到干净的白/蓝 LED 光（现代科技）。环境与公司经典产品随高度演变。公司的多款经典产品以“巨物化”呈现。  
移轴摄影（Tilt-shift）与 {{render_style}}，画幅 {{ratio}}。`,
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
  cn: `发挥你的创意帮我一起脑洞，假设{{character_groups}}使用{{social_media}}，包括回复评论点赞，设计一些有趣、有反差的人物使用社交媒体互动朋友圈的场景，结合一些符合人物的大事件，有趣有梗有反差，制作一张{{social_media}}的截图，使用中文，{{ratio}}。`,
  en: `Use your creativity to brainstorm with me. Imagine {{character_groups}} using {{social_media}}, including replying, commenting, and liking. Design some fun, high-contrast scenarios of characters interacting on social media feeds, combining big events that fit the characters with humor, memes, and contrast. Create a screenshot of {{social_media}}, in English, with aspect ratio {{ratio}}.`
};

export const TEMPLATE_MAGAZINE_COVER = {
  cn: `### PROJECT GOAL | 项目目标
生成一张 9:16 旅游杂志封面级照片，以我上传的真人照片为基准，实现 100% 五官还原，呈现专业、精致、具有真实杂志质感的封面画面。

### SUBJECT | 人物设定
根据我上传人物的五官特征进行完整还原；人物置身于 {{travel_location}}，请根据这个地理位置给人物穿着符合当地此刻的实时天气、温度与季节服装逻辑；整体风格自然、优雅、有现场氛围。

### POSE & EXPRESSION | 姿态与表情
人物以杂志封面标准姿态入镜，略带从容质感；面部表情自然放松但具吸引力；
身体姿势根据场景与天气自由适配，呈现"在当地旅行中的真实状态"。

### ENVIRONMENT | 场景要求
背景呈现用户输入的地名代表性视觉线索，请根据用户输入的地理位置呈现符合当地此刻的实时天气、温度与季节场景逻辑；保持高级写实风格，不夸张、不超现实；
光线以真实自然光为主，具有现场环境的时间感。

### CAMERA & AESTHETICS | 拍摄规格
画幅比例: {{ratio}}
构图: 充分利用竖幅空间，打造"封面级"视觉中心；镜头语言: 专业摄影棚级别的清晰度与景深；肤质感可见毛孔与自然纹理（非磨皮）；整体氛围具有高级旅行杂志的真实感与美感。

### MAGAZINE DESIGN | 封面设计
版面风格现代、干净、具有国际旅行杂志氛围；
主标题、副标题、杂志图形元素可自动生成但需与人物与地点匹配；
色彩搭配高级、协调；
最终呈现接近《Vogue》《National Geographic Traveler》级别的封面气质。`,
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
  cn: `### SUBJECT | 人物主体
{{character_originality}}，从漫画分镜边框中跨步走出并打破界限。真实版本与漫画版本之间充满动态且无缝的互动。

### SETTING | 场景设定
地点：{{comic_scene}}
地板上摊开一本巨大的漫画书。

### MANGA DETAILS | 漫画细节
- **风格：** 超现实风格的黑白四格漫画
- **技法：** 正宗日式排版，网点纸效果，粗黑墨线，线条清晰利落
- **内容：** 同一个人的漫画版本被困在漫画书里面
- **对比：** 单色漫画世界与鲜艳现实世界的强烈视觉对比

### REAL LIFE VERSION | 真实版本
- **视觉质感：** 生动、色彩丰富、照片级真实感、超逼真 8K 画质
- **互动方式：** 动态地浮现于漫画表面，直接与漫画版本互动
- **情绪氛围：** 元风格 (Meta)，幽默的相遇

### TECHNICAL SPECS | 技术规格
- **画质：** 超逼真，8K 分辨率，高度细节化
- **融合效果：** 漫画线条艺术与现实摄影的无缝融合
- **画幅比例：** {{ratio}}`,
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
  cn: `### 极端鱼眼都市奇观

{{character_originality}}，用{{lens_type}}拍摄的照片，主体是一位穿着{{school_uniform}}的{{subject}}，在{{urban_location}}兴奋地跳起，{{dynamic_action}}。

**视觉焦点：**
- **前景细节：** {{fingernail_detail}}
- **背景景观：** {{building_cluster}}，街道上挤满行人和车辆
- **超现实元素：** {{monster_element}}漂浮在城市上空，{{monster_feature}}环绕着扭曲的城市景观

**整体基调：**
创造一个融合现实与奇幻的都市奇观，鱼眼镜头的畸变效果与卡通怪兽的出现形成强烈对比，营造出梦幻而充满活力的视觉冲击。`,
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
  cn: `### 目标
设计一个顶级的工业设计产品介绍页，使用极简的宣传页风格；需要深刻理解该设计师的设计理念、设计风格，并将这种设计理解完全融入到设计产品的工业设计与展示页面中

### 内容
- **设计师：** {{designer}}
- **产品：** {{design_item}}

### 画面
- **设计师介绍：**
约占整个画面非常少的部分，包括设计师的介绍（极具氛围感的头像）与设计师对于这个产品的设计思路与设计理解，以及设计师的签名。
- **画面核心内容：**
占整个画面的80%或更多用于呈现产品本身，一个完全符合设计师自己设计风格与设计方法的顶级产品设计图（一个完整的单张产品效果的呈现），基于工业成品设计成果使用不同的构图。整体配色需要与设计师的风格与产品内容完全相符
- **构图：**
最终构图：{{ratio}} 
整体排版主次分明，规整，极具格调与设计特色`,
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
  cn: `### Raindrop Art (雨滴定格艺术)

**核心表现:**
捕捉了雨滴落入水面的瞬间，雨滴打落在水面上，飞溅的水珠在空中形成一个抽象的 {{rain_shape}}。

**艺术视觉:**
水滴构成的结果相对比较概念化，更遵从水滴溅落形成的动态感，但能从动作或神态中感受到其表达的艺术视觉。画面将雨水与自然交互的微妙之美的定格艺术作品，动感与优雅交融，呈现出诗意的视觉表达。

**环境背景:**
背景是朦胧的雨景。

**规格:**
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
  cn: `### 可视化艺术成长之路

**角色定义**  
你是一位历史演变建筑师 (History Evolution Architect)。你的目标是创建一个超高密度、垂直堆叠的等距轴测（Isometric）3D 展厅渲染可视化图像，展示 {{art_type}} 的发展历史。通过展厅来展示一个里程发展的时间线：底部是简陋的发展初期，通过历史更迭迭代垂直向上升起，直到现代或未来的巅峰。

**核心能力 | 关键视觉策略（rameless Tech-Lapse）：**
- **展厅模拟：** 使用一个多层的艺术展厅承载所要表达的事物发展，层级代表时间维度的发展，每层可能存在不同的“房间”用于展示同一时代不同风格的作品
- **根除容器：** 严禁使用底板、边框或横截面视图。底部边缘是历史起源（原始社会或古代社会）
- **垂直时间线：** “之字形上升（Zig-Zag Ascent）”穿越创新历程。  
  - 底部（前景）：起源与原型  
  - 中部（上升中）：古代到现代的辉煌发展  
  - 顶部（背景）：当前的发展状态与未来的可能性
- **集成 3D 标题：** 明确的与主题相符合的标题

**检索与梳理：**
- 提取重要发展历史中的的几个阶段。
- 列出定义每个时代的“经典”。
- 工具与媒介的变化

**构图与光影：**  
等距视角的展厅视角。垂直之字形时间线，将事物发展从底部的创业阶段堆叠到未来的顶部，环境与划时代的经典作品随高度演变。多款经典产品以“巨物化”呈现。  
移轴摄影（Tilt-shift）与 {{render_style}}，画幅 {{ratio}}。`,
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
  cn: `### 窗边书桌微缩场景

展示一个在窗边书桌上的场景。

**核心内容：**
《{{show_name}}》的经典镜头微缩场景展示，采用了{{render_style}}风格，充分体现了微缩摄影的艺术表达。

**环境背景：**
背景是真实的书桌，有一些制作工具，散乱的书本，营造一种刚刚加工完这个场景的凌乱感。书桌上还有编制的图纸和原型手稿。

**窗外互动：**
窗外，真实的{{character_name}}正好奇地向内观察这个桌上的作品。

**画面规格：**
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

export const TEMPLATE_CHINESE_NEW_YEAR_POSTER = {
  cn: `### 中国新年时尚海报

一张现代时尚感的中国新年海报，融合高端时尚摄影与传统节日元素，极具视觉冲击力和艺术美感。

**核心主体：**
{{character_originality}}，面部和颈部极致特写，{{character_heroic}}骑着白马优雅而富有力量地冲向屏幕，呈现出即将跃出取景框的瞬间动态。这是一位普通的中国人，穿着精心设计的{{clothing_style_chinese}}，色彩为{{clothing_color_traditional}}，面部表情自然亲切而富有生活气息，妆容精致淡雅，发型柔美自然，颈部线条优美修长。人物嘴里轻轻叼着一个精致的中国红包，增添节日趣味和喜庆氛围。

**构图与摄影：**
- 超近距离的面部和颈部特写，人物几乎填满整个画面
- 极浅景深让背景柔化模糊，形成美丽的光斑效果
- 精准控制的动态模糊，马尾和发丝轻柔飘动，展现优雅动感
- 人物和马仿佛要跃出取景框，突破画面边界，带来强烈的视觉冲击
- 高端时尚摄影的布光技巧，完美轮廓光勾勒人物轮廓和颈部线条
- 时尚杂志级别的精修质感，皮肤光滑细腻，五官立体精致，颈部优美
- 荷兰角构图，增强现代时尚感和动态张力

**细节刻画：**
- 面部细节：完美妆容，皮肤细腻光滑，眼神明亮有神，嘴角的红包增添俏皮感
- 红包细节：精致的中国红包，金色吉祥图案，轻微反光质感
- 服装质感：高级面料质感，精致工艺细节，剪裁合体
- 马匹细节：干净整洁，皮毛健康光泽，鬃毛柔顺飘逸
- 光影效果：高级时尚布光，层次丰富，色彩精致饱满，红包上的金色图案闪烁

**背景与氛围：**
- 真实感的广袤草原背景，极具纵深感和空间感
- 天空呈现壮丽的红色夕阳，晚霞染红整个天际，营造浪漫氛围
- 夕阳的暖色调光辉洒在人物和马匹身上，形成金色轮廓光
- 背景虚化处理，草原与红色天空的交界线柔和自然
- 整体色调为温暖优雅的橙红色调，营造时尚而喜庆的视觉冲击力

**摄影风格：**
- 极具艺术吸引力的顶级时尚摄影，富士胶片魅力
- Fujicolor Velvia风格，色彩浓郁饱满，对比度适中偏柔
- 轻微的胶片颗粒质感，增添高端复古艺术气息
- 时尚杂志级景深控制，主体清晰突出，背景柔美虚化
- 光线层次丰富，暗部和亮部细节保留完整
- 具有强烈的时尚美感和视觉吸引力

**摄影规格：**
{{ratio}}
高分辨率，时尚海报级品质，Fuji胶片摄影风格`,
  en: `### Chinese New Year Fashion Poster

A modern fashionable Chinese New Year poster blending high-end fashion photography with traditional festive elements, featuring strong visual impact and artistic beauty.

**Core Subject:**
{{character_originality}}, extreme face and neck close-up. {{character_heroic}} rides a white horse elegantly yet powerfully charging towards the screen, capturing the moment of about to leap out of frame. This is an ordinary Chinese person wearing exquisitely designed {{clothing_style_chinese}} in {{clothing_color_traditional}}, with natural friendly expression full of life, delicate light makeup, soft natural grooming, and elegant slender neck. The character gently holds a refined Chinese red envelope in their mouth, adding festive fun and celebratory atmosphere.

**Composition & Photography:**
- Ultra-close face and neck shot, the character nearly fills the entire frame
- Extremely shallow depth of field makes background soft and blurred, forming beautiful bokeh effects
- Precisely controlled motion blur, mane and hair gently flowing, showing elegant dynamic
- Character and horse appear about to leap out of the frame, breaking the visual boundary with strong impact
- High-end fashion lighting techniques, perfect rim light outlining character silhouette and neck lines
- Fashion magazine grade retouched quality, smooth refined skin, sculpted facial features, elegant neck
- Dutch angle composition enhancing modern fashion sense and dynamic tension

**Detail Rendering:**
- Facial details: perfect makeup, smooth refined skin, bright expressive eyes, red envelope at corner of mouth adding playfulness
- Red envelope details: exquisite Chinese red envelope, golden auspicious patterns, subtle reflective texture
- Clothing texture: premium fabric quality, exquisite craftsmanship, tailored fit
- Horse details: clean and tidy, healthy coat sheen, smooth flowing mane
- Lighting effects: high-end fashion lighting, rich layers, exquisite vibrant colors, golden patterns on red envelope shimmering

**Background & Atmosphere:**
- Realistic vast grassland background with immense depth and spatial sense
- Magnificent red sunset sky, the afterglow dyes the entire horizon creating romantic atmosphere
- Warm sunset glow showers on the character and horse, forming golden rim light
- Background bokeh treatment, the horizon line of grassland and red sky is soft and natural
- Overall color tone is warm elegant orange-red, creating fashionable yet festive visual impact

**Photography Style:**
- Top-tier artistic fashion photography with Fuji film charm
- Fujicolor Velvia style, rich and vibrant colors, moderate soft contrast
- Subtle film grain texture adding high-end vintage artistic atmosphere
- Fashion magazine grade depth of field control, main subject sharp and prominent, background beautifully blurred
- Rich lighting layers, complete detail retention in shadows and highlights
- Strong fashion aesthetic and visual appeal

**Photography Specs:**
{{ratio}}
High resolution, fashion poster grade quality, Fuji film photography style`
};

export const TEMPLATE_JAPANESE_PRODUCT_POSTER = {
  cn: `### 日式产品海报（16:9横构图）

高级日式产品海报，16:9横构图格式，编辑级设计展示{{fruit_1}}汁皮肤包装概念，具有精致的视觉叙事：

**左侧（画布40%）：**
- **主角产品：** 一个大型{{fruit_1}}汁皮肤包装垂直展示，采用戏剧性柔和灯光，展现超写实的{{fruit_1}}果皮纹理包裹矩形容器，符合{{fruit_1}}特征质感的皮肤纹理，覆盖整个表面，具有该水果特有的自然质感、颜色和细节变化，看起来完全像真正的{{fruit_1}}果皮拉伸覆盖在包装上
- **下方：** 一个横切的新鲜{{fruit_1}}，展示符合{{fruit_1}}特征的果肉质感，展现其独特的内部结构和颜色
- **日式排版垂直对齐：** "{{fruit_1}}スキン"（{{fruit_1}}皮肤）采用优雅的细体哥特字体
- **副标题：** "果汁皮肤 / {{fruit_1}}"采用精致风格
- **小字设计理念文本（日文）**

**中央（画布30%）：**
- **大量白色负空间（间 - Ma）**
- **极简几何元素：** 精致的细线
- **浮动文字：** "天然な素材"（天然材料）
- **极简品牌标识**
- **背景中非常微妙的{{fruit_1}}特征纹理图案（低不透明度）**

**右侧（画布30%）：**
- **两个{{fruit_1}}汁皮肤包装以不同角度和高度艺术性排列**
- **一个完整的新鲜{{fruit_1}}，带有符合该水果特征的自然皮肤质感**
- **排版：** "Natural Packaging / 自然な包装"
- **标语：** "The skin is the package / 皮膚が包装である"
- **细节标注指向符合水果特征的皮肤纹理细节**

**设计原则：** 充足的留白，不对称平衡，侘寂美学，无印良品/则武编辑级极简主义
**色彩调色板：** 符合{{fruit_1}}特征的色调，纯白背景，果肉的特征颜色作为点缀
**摄影：** 柔和扩散的影棚灯光，超清晰的微距细节展现符合水果特征的纹理，照片级真实渲染
**关键：** {{fruit_1}}皮肤包装必须看起来极其真实——实际的有机纹理，完全符合该水果的自然特征，包括其特有的质感、颜色和细节，绝非塑料

16:9宽屏，高端日式产品海报，画廊级品质`,
  en: `### Premium Japanese-style Product Poster (16:9 Landscape)

Premium Japanese-style product poster in 16:9 landscape format, editorial design showcasing {{fruit_1}} juice skin packaging concept with sophisticated visual storytelling:

**LEFT SIDE (40% of canvas):**
- **Hero product:** One large {{fruit_1}} juice skin package displayed vertically with dramatic soft lighting, showing ultra-realistic {{fruit_1}} peel texture wrapped around rectangular container, skin texture that matches the characteristic features of {{fruit_1}}, covering entire surface, with natural texture, color and detail variations specific to this fruit, looks exactly like real {{fruit_1}} skin stretched over package
- **Below:** One cross-sectioned fresh {{fruit_1}} showing flesh texture that matches the characteristic features of {{fruit_1}}, displaying its unique internal structure and color
- **Japanese typography vertically aligned:** "{{fruit_1}}スキン" ({{fruit_1}} Skin) in elegant thin gothic font
- **Subtitle:** "果汁皮肤 / {{fruit_1}}" in refined style
- **Small design philosophy text in Japanese**

**CENTER (30% of canvas):**
- **Generous white negative space (Ma - 間)**
- **Minimal geometric elements:** delicate thin lines
- **Floating text:** "自然な素材" (natural materials)
- **Subtle minimalist brand mark**
- **Very subtle {{fruit_1}} characteristic texture pattern in background (low opacity)**

**RIGHT SIDE (30% of canvas):**
- **Two {{fruit_1}} juice skin packages arranged artistically at different angles and heights**
- **One whole fresh {{fruit_1}} with natural skin texture that matches the characteristic features of this fruit**
- **Typography:** "Natural Packaging / 自然な包装"
- **Tagline:** "The skin is the package / 皮膚が包装である"
- **Detail callouts pointing to skin texture details that match the fruit's characteristics**

**DESIGN PRINCIPLES:** Abundant white space, asymmetrical balance, Wabi-sabi aesthetic, Muji/Noritake editorial minimalism
**COLOR PALETTE:** tones that match {{fruit_1}} characteristics, pure white background, characteristic flesh color as accent
**PHOTOGRAPHY:** Soft diffused studio lighting, ultra-sharp macro details showing texture that matches the fruit's characteristics, photorealistic rendering
**CRITICAL:** The {{fruit_1}} skin packaging must look incredibly realistic - actual organic texture that fully matches the natural characteristics of this fruit, including its unique texture, color and details, NOT plastic

16:9 widescreen, high-end Japanese product poster, gallery quality`
};

export const TEMPLATE_LUXURY_EDITORIAL = {
  cn: `### 高级时装编辑部人像

使用上传的参考图作为同一位{{subject}}。严格保持身份：相同的面部结构、肤色、发型。无性别转换。

**姿态与构图：**
四分之三背影。背部部分朝向镜头，躯干稍微向左倾斜。头部轻轻向右转动，露出干净的侧脸。眼睛轻轻向下看或闭上。肩膀放松。露背是主要的视觉焦点。

**服装：**
{{clothing}}。深V露背，带有优雅的垂坠感。哑光面料，无光泽，无闪粉，无婚礼元素。

**配饰：**
精美小巧的耳环。{{jewelry_style}}，带有微妙的宝石细节，沿着脊柱垂下。

**花卉：**
{{flower_type}}，拿在右肩上方。花朵部分重叠肩膀，营造出层次感的时尚遮挡效果。

**摄影：**
平视或略高于肩膀高度。85mm人像镜头质感。浅景深，压缩透视。无广角畸变。

**灯光：**
{{lighting}}。主光来自左上方，照亮侧脸和上背部。微妙的补光展现皮肤纹理。非常柔和的轮廓光勾勒出裙子和花朵。低对比度，平滑的色调过渡。

**背景：**
{{background_style}}。无环境，无道具，无纹理。

**风格：**
奢侈时尚杂志美学。优雅、克制、永恒。自然精致的皮肤纹理，不过度磨皮。`,
  en: `### High-Fashion Luxury Editorial Portrait

Use the uploaded reference image as the same {{subject}}. Preserve identity strictly: same face structure, skin tone, hairstyle. No gender swap.

**POSE & COMPOSITION:**
Three-quarter back view. Back partially facing camera, torso angled slightly left. Head gently turned to the right, revealing a clean side profile. Eyes softly lowered or closed. Shoulders relaxed. The open back is the main visual focus.

**WARDROBE:**
{{clothing}}. Deep V open back with elegant drape. Matte fabric, no shine, no glitter, no bridal elements.

**ACCESSORIES:**
Small delicate earrings. {{jewelry_style}} with subtle gemstone details resting along the spine.

**FLOWERS:**
{{flower_type}} held over the right shoulder. The flowers partially overlap the shoulder, creating layered fashion blocking.

**CAMERA:**
Eye-level to slightly above shoulder height. 85mm portrait lens look. Shallow depth of field, compressed perspective. No wide-angle distortion.

**LIGHTING:**
{{lighting}}. Key light from upper-left, illuminating side face and upper back. Subtle fill light for skin texture. Very soft rim light outlining dress and flowers. Low contrast, smooth tonal transitions.

**BACKGROUND:**
{{background_style}}. No environment, no props, no texture.

**STYLE:**
Luxury fashion magazine aesthetic. Elegant, restrained, timeless. Natural refined skin texture, not over-smoothed.`
};

export const TEMPLATE_PIXAR_DECONSTRUCTION = {
  cn: `### 角色本质·艺术拆解升级版

**核心任务：** 创作一张电影级 3D {{render_style}} 风格的角色拆解海报。将 {{subject}} 转换为风格化写实的动画角色。

**📷 角色与模式：**
- **角色模式：** {{character_type_pixar}}。根据参考图高度一致还原身份、面部结构与气质。

**📷 物品布局 (Item Layout)：**
采用 {{item_layout_pixar}}，总物品数 30-36 件，围绕角色有序排列。
- **分类1：时尚穿搭 (Fashion Atelier)** - {{fashion_parts}}。要求全部分离悬浮，展现精细材质。
- **分类2：美妆个护 (Beauty Collection)** - {{beauty_items}}。展现玻璃通透感与液体折射。
- **分类3：数码生活 (Modern Essentials)** - {{digital_items}}。展现金属与玻璃的 PBR 材质。
- **分类4：个人爱好 (Luxury & Hobbies)** - {{luxury_hobby_items}}。宝石需有色散效果。

**📷 技术规格 (Technical Specs)：**
- **爆炸视图：** 使用优雅的虚线/实线连接悬浮部件，带有 01-36 的圆形编号标签。
- **设计元素：** 包含材质样本微距特写、测量标尺、属性雷达图。
- **标题设计：** 主标题 "📷 角色拆解艺术 · THE ART OF DECONSTRUCTION 📷"，副标题 "角色本质·艺术拆解 / Character Essence Unveiled"。
- **色调方案：** {{theme_pixar}}。
- **画质渲染：** 4K 分辨率，路径追踪渲染，PBR 材质流程，极致的毛发与皮肤细节。

{{ratio}}`,
  en: `### Character Essence Unveiled Upgrade Version

**CORE TASK:** Create a cinematic 3D {{render_style}} style character deconstruction poster. Transform {{subject}} into a stylized realistic animated character.

**📷 CHARACTER & MODE:**
- **Character Mode:** {{character_type_pixar}}. Strictly maintain identity, facial structure, and aura based on the reference image.

**📷 ITEM LAYOUT:**
Using {{item_layout_pixar}}, a total of 30-36 items arranged orderly around the character.
- **Category 1: Fashion Atelier** - {{fashion_parts}}. All parts suspended and separated, showing fine material textures.
- **Category 2: Beauty Collection** - {{beauty_items}}. Showing glass transparency and liquid refraction.
- **Category 3: Modern Essentials** - {{digital_items}}. Showing PBR materials of metal and glass.
- **Category 4: Luxury & Hobbies** - {{luxury_hobby_items}}. Gemstones must have dispersion effects.

**📷 TECHNICAL SPECIFICATIONS:**
- **Exploded View:** Use elegant dashed/solid lines to connect floating parts, with circular numbered tags 01-36.
- **Design Elements:** Includes macro material samples, measurement rulers, and attribute radar charts.
- **Typography:** Main title "📷 THE ART OF DECONSTRUCTION 📷", subtitle "Character Essence Unveiled".
- **Color Scheme:** {{theme_pixar}}.
- **Rendering:** 4K resolution, path-traced rendering, PBR material workflow, extreme hair and skin details.

{{ratio}}`
};

export const TEMPLATE_STREET_DIALOGUE = {
  cn: `### 街头的自我“对话”

1. **核心主题与风格：** 一张具有深刻故事性和极佳摄影质感的街头摄影人像作品，捕捉“自我对话”的哲学瞬间。采用自然光影，呈现电影级叙事感和动态模糊艺术效果。
2. **场景与背景地点：** {{building_cluster}}。时间与光影：{{lighting_atmosphere}}。光线聚焦于中心人物。氛围：忙碌、疏离，充满动态与静谧的对比。
3. **核心人物描述位置与状态：** 位于画面正中央，静止站立，神态若有所思或平静凝视镜头，与周围环境的匆忙形成鲜明对比。着装：{{clothing}}，面部与上传图片高度一致
4. **周边人群描述（关键叙事元素）身份与着装：** 所有路过行人都是核心人物的“不同自我”，身着代表其社会角色的服装：周围人物面部需要保持与上传图片的高度一致，众多不同着装的“我”在核心人物周围穿梭，周边人物快速移动，产生了较大的动态模糊，周边人物全部有移动产生的残影，极大的动态模糊和视觉残留，与核心人物的静态形成了鲜明对比，周边人物与核心人物都是一样的面孔和人物，不要添加其他无关人物，周边人物需要与核心人物有准确的前后关系。
5. **摄影技术与构图镜头与景深：** {{lens_param}}，偏向与人物特写，较大的景深。核心人物面部和上身清晰锐利，前景和背景（包括动态模糊的人群和街头环境）适度虚化。半身像为主构图：中心构图，核心人物类似半身像，处画面中心较大位置。相机视角稍稍高出人物并微微向下俯视，只有核心人物抬头看向镜头，{{ratio}}。
6. **画质与色调：** 高分辨率，细腻的胶片质感，轻微颗粒感。色调以暖橙色和深蓝色阴影为主，色彩鲜明但有层次。
7. **情绪与故事：** 传递出孤独、内省、身份多元性与内心对话的复杂情感。画面在动态中凝结了一个安静的哲学瞬间`,
  en: `### Street Self-Dialogue

1. **CORE THEME & STYLE:** A deeply storytelling street photography portrait capturing a philosophical moment of "self-dialogue." Uses natural lighting, cinematic narrative feel, and motion blur artistic effects.
2. **SCENE & BACKGROUND:** {{building_cluster}}. Time & Lighting: {{lighting_atmosphere}}. Light focused on the central character. Atmosphere: Busy, alienated, filled with contrast between dynamics and tranquility.
3. **CENTRAL CHARACTER:** Located in the center, standing still, with a pensive expression or calmly staring at the camera, forming a sharp contrast with the rush of the surrounding environment. Wardrobe: {{clothing}}, facial features highly consistent with the uploaded image.
4. **SURROUNDING CROWD (KEY NARRATIVE ELEMENT):** All passing pedestrians are "different selves" of the central character, wearing clothes representing their social roles: surrounding characters' faces must remain highly consistent with the uploaded image. Numerous "selves" in different outfits weave around the central character. Surrounding characters move rapidly, creating significant motion blur and visual trailing, contrasting with the static nature of the central character. Surrounding characters and the central character share the same face and identity—do not add irrelevant people. Surrounding characters need accurate spatial relationships (front/back) with the central character.
5. **PHOTOGRAPHY & COMPOSITION:** {{lens_param}}, leaning towards character close-up with larger depth of field. Central character's face and upper body are sharp and clear, while foreground and background (including motion-blurred crowd and street environment) are moderately blurred. Composition: Central composition, half-body style, occupying a large portion of the center. Camera angle slightly above the character looking slightly downward, only the central character looks up at the camera, {{ratio}}.
6. **QUALITY & TONE:** High resolution, delicate film texture, slight grain. Tones dominated by warm oranges and deep blue shadows, vivid but layered colors.
7. **EMOTION & STORY:** Conveys feelings of loneliness, introspection, identity multiplicity, and the complexity of inner dialogue. The image freezes a quiet philosophical moment within dynamics.`
};

export const TEMPLATE_FASHION_FOCUS = {
  cn: `### 高端时尚杂志封面 (Fashion Magazine Cover)
一张高端时尚杂志封面。人物为{{character_originality}}，气质自信前卫，身体张力强，动态姿态，直视镜头。

**视觉核心:**
- **服饰:** {{clothing}}，现代编辑感穿搭。
- **动作:** 模特双手比起“取景框”手势，仿佛与一个矩形选中框有互动，选中框覆盖脸部和肩部。
- **规则:** 只有选中框内部清晰且为自然彩色；选中框外完全灰度且强像素化（Pixelated），无任何颜色或清晰区域。

**摄影与光影:**
- **视角:** 略低机位仰拍（Low-angle shot）。
- **灯光:** 柔和漫射棚拍光。

**版式设计 (Typography):**
- **顶部:** 居中粗体大写扁宽型无衬线标题“FOCUS”，上方小字“DECEMBER 2025”；标题左下“VOL + 随机两位数”。
- **左下角:** 文字块（简短时尚自信标题、短段落、条形码）。
- **右侧:** “FASHION INTERVIEW”；右下角衬线体小号“THE EDIT”及大号“01-09的随机数字”。
- **层级:** 模特对标题有遮挡叠加，前后景关系分明，干净现代。
- **颜色:** 字体均为白色，蒙太奇风格，文字与图像形成强烈对比。

**规格:**
- **画幅:** {{ratio}}`,
  en: `### High-end Fashion Magazine Cover - FOCUS
A high-end fashion magazine cover. The character is {{character_originality}}, with a confident and avant-garde aura, strong body tension, dynamic pose, staring straight at the camera.

**Visual Core:**
- **Wardrobe:** {{clothing}}, modern editorial styling.
- **Action:** The model's hands form a "viewfinder" gesture, as if interacting with a rectangular selection box that covers the face and shoulders.
- **Rule:** Only the area inside the selection box is sharp and in natural color; the area outside the box is entirely grayscale and heavily pixelated, with no color or clear regions.

**Photography & Lighting:**
- **Angle:** Low-angle shot looking up.
- **Lighting:** Soft diffused studio lighting.

**Layout & Typography:**
- **Top:** Centered bold uppercase wide sans-serif title "FOCUS", with "DECEMBER 2025" in small text above it; "VOL + random 2 digits" at the bottom left of the title.
- **Bottom Left:** Text block (short confident fashion title, short paragraph, barcode).
- **Right:** "FASHION INTERVIEW"; "THE EDIT" in small serif font and a "random 01-09 digit" in large font at the bottom right.
- **Layering:** The model overlaps/occludes the title, creating clear depth and a clean, modern look.
- **Color:** All fonts are white, in a montage style, creating a strong contrast between text and image.

**Specifications:**
- **Aspect Ratio:** {{ratio}}`
};

export const TEMPLATE_CITY_GLIMPSE = {
  cn: `### 都市一瞥 (City Glimpse)
一种合适的艺术工具（例如：{{art_tool}}），仿佛正处于创作之中，从左下角向右上角勾勒出一条精致、优雅的曲线。

**视觉核心:**
- **笔触景观:** 笔触之中包含著名的 {{city_name_1}} 地标的微缩景观：精选的一组标志性地点，融合当地特有的历史与现代建筑、自然元素以及城市生活气息。
- **艺术风格:** 整体风格结合了 {{art_style_1}} 与学院派海报设计：多样化的笔触与痕迹营造出三维空间感，呈现出立体的微缩景观与浅浮雕质感。
- **色彩:** {{dominant_colors}} 为主色调，其间点缀传统的 {{city_name_1}} 美学元素，并与现代城市天际线相互交织。

**构图与背景:**
- **视角:** 画面为极简的俯视视角，主体笔触之外保留大面积留白。
- **背景:** 具有纹理的纸张（高质量纤维质感），色调明亮、干净、清新（例如：{{background_color_clean}}），与画面主体形成清晰对比，营造纯净感。
- **构图要求:** 绘画工具的笔尖应在笔触末端（右上角）停住，笔触之外保留干净的留白；微缩景观仅存在于笔触内部，细节密集但不显杂乱。

**大师级排版 (Typography):**
- **主标题:** “{{city_name_1}}”（与绘画风格美学相匹配的艺术字体，极具吸引力，高对比度，作为核心视觉层级）。
- **副标题:** “{{city_glimpse_subtitle}}”（在风格上与主标题及绘画肌理相互呼应的高级排版）。
- **装饰文案:** 全部采用与 {{art_style_1}} 融合的字体风格，通过分段形成节奏与层级，与主标题呼应。

**规格:**
- **画质:** 高细节度、超写实效果、HDR，以及 8K 分辨率。
- **画幅比例:** {{ratio}}`,
  en: `### City Glimpse - Urban Miniature
A suitable artistic tool (e.g., {{art_tool}}), as if in the middle of creation, sketching a delicate, elegant curve from the bottom left to the top right.

**Visual Core:**
- **Stroke Landscape:** Within the brushstroke lies a miniature landscape of famous {{city_name}} landmarks: a curated set of iconic locations, blending local history, modern architecture, natural elements, and urban life.
- **Art Style:** The overall style combines {{art_style}} with academic poster design: diverse brushstrokes and marks create a 3D sense of space, presenting a three-dimensional miniature landscape and low-relief texture.
- **Color:** {{dominant_colors}} as the dominant tones, interspersed with traditional {{city_name}} aesthetic elements and intertwined with the modern city skyline.

**Composition & Background:**
- **Perspective:** Minimalist top-down view, with large areas of negative space outside the main stroke.
- **Background:** Textured high-quality fiber paper, bright and clean tones (e.g., {{background_color_clean}}), creating a clear contrast with the main subject and fostering a sense of purity.
- **Details:** The tip of the art tool pauses at the end of the stroke (top right), with clean negative space beyond the stroke; the miniature landscape exists only inside the stroke, densely detailed but not cluttered.

**Master-level Typography:**
- **Main Title:** "{{city_name}}" in an artistic font matching the painting style aesthetics, highly attractive with high contrast as the core visual hierarchy.
- **Subtitle:** "{{city_glimpse_subtitle}}" in sophisticated typography that echoes the main title and painting texture.
- **Decorative Text:** All using font styles integrated with {{art_style}}, creating rhythm and hierarchy through segmentation, echoing the main title.

**Specifications:**
- **Quality:** High detail, hyper-realistic effect, HDR, 8K resolution.
- **Aspect Ratio:** {{ratio}}`
};

export const TEMPLATE_MULTIPLE_SELVES_INDOOR = {
  cn: `### 多个自我“对话” (室内聚会版)

**1. 核心主题与风格:** 一张具有深刻故事性和极佳摄影质感的摄影人像作品，捕捉“自我对话”的哲学瞬间。呈现电影级叙事感。

**2. 场景与背景地点:** 现代风格的住宅室内。呈现一群样貌完全一样的人在室内的不同行为，如同在一场奇幻的节日聚会。

**3. 核心人物 (视觉中心):** 位于客厅画面正中央，静止站立，神态若有所思，眼神平静地凝视镜头。这种绝对的静止与周围环境的匆忙形成鲜明对比。着装：{{clothing}}，面部特征与上传图片高度一致。

**4. 周边人群 (不同维度的自我):** 房间内还有 5 个面貌与核心人物完全一致的“自我”，他们身着不同的服装（与其当前动作匹配），正在进行以下活动：
- 人物 A 正在 {{action_status}}；
- 人物 B 正在 {{action_status}}；
- 人物 C 正在 {{action_status}}；
- 人物 D 正在 {{action_status}}；
- 人物 E 正在 {{action_status}}。
所有的人都在客厅中各司其职又互不干扰，氛围呈现出一种节日聚会般的荒诞与欢愉。

**5. 细节与构图:**
- **摄影规格:** 使用 {{lens_param}} 拍摄。核心人物面部和上身清晰锐利，前景和背景人物及物体适度虚化，营造出极佳的景深感。
- **环境细节:** 客厅墙上挂着一个精美的装饰性木雕艺术品，雕刻着“2025”字样，其中数字“5”呈现出摇摇欲坠、即将掉落的状态。

**6. 画质与色调:** 高分辨率，细腻的胶片质感，带有轻微的颗粒感。色调以温暖的橙色调（暖色光）和深蓝色阴影（对比色）为主，色彩鲜明且富有层次。

**7. 情绪与故事:** 传递出一种孤独中带着丰盈、内省中伴随身份多元性的复杂情感。画面在动态的忙碌中凝结了一个安静的哲学思考瞬间。`,
  en: `### Multiple Self-Dialogue (Indoor Party Edition)

**1. Core Theme & Style:** A storytelling photography portrait with exceptional quality, capturing a philosophical moment of "self-dialogue." It presents a cinematic narrative feel.

**2. Scene & Location:** A modern residential interior. It features a group of identical-looking people engaging in various activities within the room, resembling a fantastical holiday party.

**3. Central Character (Visual Anchor):** Located in the exact center of the living room, standing perfectly still with a pensive expression, eyes calmly staring at the camera. This absolute stillness forms a sharp contrast with the surrounding hustle. Wardrobe: {{clothing}}, facial features strictly consistent with the uploaded image.

**4. Surrounding Figures (Multiple Selves):** There are 5 other "selves" in the room, identical in appearance to the central character, wearing different outfits (matching their actions) and engaging in the following:
- Person A is {{action_status}};
- Person B is {{action_status}};
- Person C is {{action_status}};
- Person D is {{action_status}};
- Person E is {{action_status}}.
Everyone is busy with their own task in the living room without interfering with each other, creating an atmosphere of absurd holiday-like joy.

**5. Details & Composition:**
- **Photography Specs:** Shot with {{lens_param}}. The central character's face and upper body are sharp and clear, while foreground/background figures and objects are moderately blurred to create excellent depth of field.
- **Environmental Detail:** A decorative wooden carving hangs on the wall, reading "2025," where the digit "5" appears wobbly and on the verge of falling off.

**6. Quality & Tone:** High resolution, fine film texture with slight grain. The color palette is dominated by warm oranges (warm lighting) and deep blue shadows (complementary colors), providing vivid and layered colors.

**7. Emotion & Story:** Conveys a complex sense of identity multiplicity and introspection within solitude. The image freezes a quiet philosophical moment amidst dynamic activity.`
};

export const TEMPLATE_CHARACTER_SHEET_ART = {
  cn: `### 角色设定稿 (Character Sheet)
**核心内容:** 角色设定稿，基于 {{character_originality}}。

**构图:** 多角度视角 (Multiple angles)，丰富的表情变化 (Expressive facial variations)。

**媒介:** {{art_tool}}。

**背景:** {{background_style}}。

**风格:** {{draw_style}}，线条利落 (Sharp linework)。

**色彩:** 柔和淡彩色 (Soft pastel color palette)，高对比度 (High contrast)。`,
  en: `### Character Sheet
  **Core Content:** Character Sheet, based on {{character_originality}}.
  
  **Composition:** Multiple angles, expressive facial variations.
  
  **Medium:** {{art_tool}}.
  
  **Background:** {{background_style}}.
  
  **Style:** {{draw_style}}, sharp linework.
  
  **Color:** Soft pastel color palette, high contrast.`
};

export const TEMPLATE_UNDERWATER_CAUSTICS = {
  cn: `### 创意水下摄影：焦散之美 (Underwater Caustics)

**主体设定:**
使用上传图片中的人物作为{{subject}}，严格保持面部特征的一致性。
人物穿着一件{{clothing}}，由于在水下浸湿，衣物呈现出若隐若现的半透明质感。

**动作与场景:**
人物沉浸在{{underwater_color}}的透明水下，姿态舒展，微微抬头仰望上方。
身体周围环绕着许多{{creatures}}，营造出自然的生态律动感。

**光影艺术 (Caustics):**
核心视觉效果为强烈的**焦散光影（Caustics）**：阳光穿过起伏的水面，在人物的面部和衣服上投射出波动的金色光纹。
光线在水中形成明显的**丁达尔效应 (Tyndall Effect)**，光柱从水面直插水底，增强空间深度。

**氛围与画质:**
- **氛围:** 梦幻、超现实、静谧、电影质感。
- **画质:** 照片级真实，8K分辨率，极高细节，捕捉每一处水花和气泡。

**规格:**
- **画幅:** {{ratio}}`,
  en: `### Creative Underwater Photography: Beauty of Caustics

**Subject:**
Use the character from the uploaded image as {{subject}}, strictly maintaining facial consistency.
The character is wearing a {{clothing}}, which appears semi-transparent due to being wet underwater.

**Action & Scene:**
The character is immersed in {{underwater_color}}, relaxed, and looking up slightly towards the surface.
Surrounded by many {{creatures}}, creating a natural ecological flow.

**Lighting (Caustics):**
The core visual effect is strong **Caustics**: sunlight passing through the wavy water surface, casting undulating light patterns onto the character's face and clothes.
Beams of light create a distinct **Tyndall Effect**, piercing through the water to enhance spatial depth.

**Atmosphere & Quality:**
- **Aura:** Dreamy, surreal, quiet, cinematic.
- **Quality:** Photorealistic, 8K resolution, high detail, capturing every droplet and bubble.

**Specifications:**
- **Ratio:** {{ratio}}`
};

export const TEMPLATE_DAILY_SNAPSHOT = {
  cn: `### 日常生活快照 (Daily Snapshot)

**场景设定:**
{{background_scene}}。

**摄影风格:**
{{lighting}}。画面没有经过精心的构图或布光，呈现出最真实的记录感。

**人物特征:**
主体为{{subject}}，采用{{clothing}}。{{accessory_glasses}}。

**动态与构图:**
{{action_status}}。采用{{camera_angle}}。

**服饰风味:**
{{underwear_style}}。

**画幅:**
{{ratio}}`,
  en: `### Daily Snapshot

**Scene Setting:**
{{background_scene}}.

**Photography Style:**
{{lighting}}. Not carefully composed or lit, presenting an authentic sense of recording.

**Character Features:**
The subject is {{subject}}, with a {{clothing}}. {{accessory_glasses}}.

**Action & Composition:**
{{action_status}}. Using an {{camera_angle}}.

**Outfit Style:**
{{underwear_style}}.

**Aspect Ratio:**
{{ratio}}`
};

export const TEMPLATE_FINE_ART_GARDEN = {
  cn: `### 唯美艺术花园人像 (Fine-art Garden Portrait)

**核心目标:**
创作一张充满浪漫、空灵氛围的花园艺术人像。

**人物设定:**
主体为{{subject}}。她留着{{hair_style}}，神情平静内敛，带着淡淡的忧郁。{{action_status}}。她穿着{{clothing}}。

**环境与氛围:**
{{background_scene}}。画面中充满了繁茂的开花植物和柔和的绿植。{{flower_type}}，被微风捕捉到半空中的动态。

**构图与摄影:**
采用{{camera_angle}}。优雅的中心构图，极浅的景深，背景是奶油般细腻的虚化效果。使用{{lens_param}}拍摄。

**光影与色彩:**
{{lighting}}。色调以柔和的绿色、青色、淡桃色和白色为主。呈现出一种绘画般的、低饱和度的浪漫色调。

**艺术风格:**
{{role}}。追求极高的织物纹理和皮肤质感。

**画幅:**
{{ratio}}`,
  en: `### Dreamy Fine-art Garden Portrait

**Objective:**
Create a dreamy fine-art portrait with a romantic, ethereal garden atmosphere.

**Subject Details:**
The subject is {{subject}}. She has {{hair_style}}, with a calm, introspective, slightly melancholic expression. {{action_status}}. She is wearing {{clothing}}.

**Scene & Atmosphere:**
{{background_scene}}. The frame is filled with abundant flowering plants and soft greenery. {{flower_type}}, caught mid-motion by a gentle breeze.

**Composition & Photography:**
A {{camera_angle}}. Elegant, centered composition with a shallow depth of field and creamy bokeh. Shot with a {{lens_param}}.

**Lighting & Color:**
{{lighting}}. The color palette includes muted greens, soft teals, and pale peach/white accents. Painterly, desaturated, romantic tones.

**Art Direction:**
{{role}}. Ultra-detailed fabric and natural skin texture.

**Aspect Ratio:**
{{ratio}}`
};

export const TEMPLATE_SURVEILLANCE_STILL = {
  cn: `### 隐藏摄像机 / 监控画面 (Surveillance Still)

**相机设置:**
{{camera_angle}}。隐藏拍摄视角，具有{{lighting}}。

**人物主体:**
主体为{{character_originality}}。留着{{hair_style}}。{{action_status}}。她身穿{{clothing}}。

**环境背景:**
{{background_scene}}。氛围安静、私密且亲密。

**智能识别 (Overlay):**
- **脸部锁定:** 红色半透明矩形框精准锁定面部，带有交叉瞄准线。
- **局部特写:** 右上角浮动放大窗口，4倍变焦特写眼睛细节，显示抓拍的高光。
- **状态指示:** 屏幕边缘显示红点 REC 指示器及警告文本：“ALERT: SUBJECT AWARE / EYE CONTACT DETECTED”。
- **时间戳:** 角落带有复古胶片时间戳 “[REC] 23:47:32 | CAM 04 - DRESSING RM”。

**构图与氛围:**
主体位于画面中心，目光直视镜头。呈现出一种脆弱、紧张且极具临场感的瞬间。

**画幅:**
{{ratio}}`,
  en: `### Surveillance Still / Hidden Camera Footage

**Camera Settings:**
{{camera_angle}}. Hidden perspective with {{lighting}}.

**Subject:**
The subject is {{character_originality}}, with {{hair_style}}. {{action_status}}. She is wearing {{clothing}}.

**Environment:**
{{background_scene}}. The atmosphere is quiet, private, and intimate.

**Face Detection & Overlay:**
- **Face Lock:** A faint red rectangular bounding box with crosshair locked intensely on her face.
- **Zoom Inset:** Floating top-right zoom-in inset (4.0x ratio), focusing on her eyes with clear catchlight.
- **Alert Text:** "ALERT: SUBJECT AWARE / EYE CONTACT DETECTED" displayed on screen.
- **Rec Indicator:** Red 'REC' indicator and vintage timestamp "[REC] 23:47:32 | CAM 04 - DRESSING RM" in the corner.

**Composition:**
Subject centered, direct gaze into the lens. The tone is vulnerable, tense, and surprising.

**Aspect Ratio:**
{{ratio}}`
};

export const TEMPLATE_CUTE_DYNAMIC_PORTRAIT = {
  cn: `### 可爱动态人像

**房间环境**:
{{room_style_cute}}

**角色**:
20岁前半的日本女大学生。

**摄影参数**:
- 极端的地板级别低角度虫视视角
- {{lens_type}}的畸变让她看起来很巨大的构图
- {{cute_pose_dynamic}}

**服装**:
{{cute_outfit}}，随着动作自然摇摆。

**道具**:
右手拿着和房间里一样的可爱动物毛绒玩具（粉色或白色的熊或兔子），自然地轻轻遮挡裙子后面的姿势。完全看不到内衣。

**光影**:
温暖的室内照明和窗户射入的自然光，妖精灯的柔和光辉，对肌肤友好的高光。

**氛围**:
充满自信、满童心、可爱又有点性感、动态的室内肖像照。`,

  en: `### Cute Dynamic Portrait

**Room Environment**:
{{room_style_cute}}

**Character**:
Japanese female college student, early 20s.

**Photography Parameters**:
- Extreme floor-level low-angle worm's-eye view
- Composition with {{lens_type}} distortion making her appear massive
- {{cute_pose_dynamic}}

**Outfit**:
{{cute_outfit}}, swaying naturally with movement.

**Prop**:
Holding a small cute animal plushie (pink or white bear/rabbit) in right hand, naturally posing to lightly hide the back of skirt. Underwear absolutely not visible.

**Lighting**:
Warm indoor lighting and natural light from window, soft glow of fairy lights, gentle highlights on skin.

**Atmosphere**:
Confident, full of playfulness, cute yet slightly sexy, dynamic indoor portrait.

**Note**:
Copyright characters and existing anime styles are strictly prohibited.`
};

export const TEMPLATE_FITNESS_SELFIE = {
  cn: `### 健身自拍场景 (Fitness Selfie)

**核心氛围:**
一张原始真实的镜子自拍快照，在繁忙的健身房用机顶闪光灯直闪拍摄。

**主体人物:**
一位年轻漂亮的江南女子，拥有"网红"脸庞和温婉的东方魅力，呈现{{physical_state}}。她正在做{{fitness_pose}}，侧身对着镜子，手持智能手机。

**服装与外观:**
穿着{{fitness_clothing}}。头发{{sweat_appearance}}，脸颊泛红，显示刚完成运动的明显痕迹。

**面部表情:**
{{facial_expression}}

**场景细节:**
{{fitness_location}}

**拍照风格:**
{{selfie_style}}

**技术效果:**
照片具有明显的{{photo_effect}}，营造出真实、不做摆拍的日常生活氛围。

**规格:**
画幅: {{ratio}} --niji 7`,
  en: `### Fitness Selfie Scene

**Core Atmosphere:**
A raw, candid mirror selfie snapshot taken in a busy gym with an on-camera flash firing.

**Subject:**
A young pretty Chinese Jiangnan woman with a "wanghong" face and gentle Eastern charm, with {{physical_state}}. She is in a {{fitness_pose}}, turned sideways to the mirror, holding a smartphone.

**Clothing & Appearance:**
Wearing {{fitness_clothing}}. Hair is {{sweat_appearance}}, and cheeks are flushed red, showing clear signs of a recent workout.

**Facial Expression:**
{{facial_expression}}

**Scene Details:**
{{fitness_location}}

**Selfie Style:**
{{selfie_style}}

**Technical Effects:**
The photo has noticeable {{photo_effect}}, creating an authentic, unposed daily life atmosphere.

**Specifications:**
Aspect Ratio: {{ratio}} --niji 7`
};

/**
 * 微缩场景模型
 */
export const TEMPLATE_MINIATURE_MODEL = {
  cn: `### 微缩场景模型

一个微缩场景模型，展现了渺小的 {{miniature_character}} 与一个超大的 {{giant_object}} 互动的场景。

夸张的比例对比、富有表现力的姿势、电影级的光影效果。极其精细的道具、手工制作的逼真质感、微距镜头视角。

**画幅比例**：{{ratio}}`,

  en: `### Miniature Scene Model

A miniature scene model showcasing a tiny {{miniature_character}} interacting with a giant {{giant_object}}.

Exaggerated scale contrast, expressive poses, cinematic lighting. Extremely detailed props, handmade realistic textures, macro lens perspective.

**Aspect Ratio**: {{ratio}}`
};

export const TEMPLATE_POP_MART_PLUSH = {
  cn: `### Pop Mart 盲盒风格毛绒玩具壁纸

一张垂直手机壁纸，展示一群可爱的拟人化马毛绒玩具堆叠在 {{festive_archway}} 内。Pop Mart 盲盒风格，柔软毛绒质感，C4D 渲染。

高度多样化和有趣表情：{{plush_expression}}。

丰富多样的独特配饰和装饰：{{cute_accessory}}。

色彩丰富、温暖照明、超精细细节，可爱有趣的氛围。`,

  en: `### Pop Mart Blind Box Style Plush Toys Wallpaper

A vertical phone wallpaper featuring a crowded group of cute anthropomorphic horse plush toys stacked inside a {{festive_archway}}. Pop Mart blind box style, soft fuzzy fur texture, C4D render.

Highly diverse and funny expressions: {{plush_expression}}.

Wide variety of unique accessories and decorations: {{cute_accessory}}.

Colorful, warm lighting, ultra-detailed, cute and playful vibe.`
};

export const TEMPLATE_3D_ISOMETRIC_DIORAMA = {
  cn: `### 3D等距透视模型展台

一个干净、极简的3D等距透视模型展台，展示{{exhibition_type}}，特色是{{display_objects}}布置在{{pod_structure}}内，微妙的光照点缀，光滑的地板表面，柔和的摄影棚灯光，逼真的材质，圆润的边缘，微型建筑模型风格，高细节，中性背景。`,

  en: `### 3D Isometric Diorama

A clean, minimal 3D isometric diorama of a {{exhibition_type}}, featuring {{display_objects}} arranged within a {{pod_structure}}, subtle lighting accents, smooth floor surfaces, soft studio lighting, realistic materials, rounded edges, miniature architectural model style, high detail, neutral background.`
};

export const TEMPLATE_CHINESE_BRIDAL_PORTRAIT = {
  cn: `### 中国传统新娘肖像摄影

一张传统中式新娘肖像摄影作品。女性主体盘着发髻，装饰着{{bridal_hair_decoration}}，身穿{{traditional_bridal_attire}}，佩戴{{bridal_jewelry}}。

写实的人体比例，平视视角，带有纸剪装饰前景的近距离肖像。

**核心材质**：光滑缎面质感、精致纸剪纹理、光泽珍珠表面。

**光影氛围**：柔和侧光、柔和阴影、温暖优雅的传统中式喜庆氛围。

**技术参数**：50mm镜头`,

  en: `### Chinese Traditional Bridal Portrait Photography

A traditional Chinese bridal portrait photograph. A woman with an updo hairstyle adorned with {{bridal_hair_decoration}}, wearing {{traditional_bridal_attire}} and {{bridal_jewelry}}.

Realistic human proportion, eye-level perspective, close-up portrait with paper-cut decorative foreground.

**Key Materials**: Smooth satin texture, delicate paper-cut texture, glossy pearl surface.

**Lighting & Atmosphere**: Soft side lighting, soft shadows, warm and elegant traditional Chinese festive atmosphere.

**Technical Parameters**: 50mm lens`
};

export const TEMPLATE_PREMIUM_FOOD_ADVERTISING = {
  cn: `### 高端食品广告摄影

{{premium_food_subject}}，高端食品广告，白色无缝背景，高调摄影棚灯光，悬浮堆叠构图，飘浮的食品块，散落着{{ingredient_bits}}，干净极简布局，表面清晰柔和阴影，超写实，微距产品摄影，100mm镜头观感，f/8清晰焦点，微妙纹理细节，编辑商业风格，8k分辨率。`,

  en: `{{premium_food_subject}}, premium food advertising, white seamless background, high key studio lighting, floating stacked composition, levitating pieces, {{ingredient_bits}} scattered, clean minimal layout, crisp soft shadow on surface, ultra realistic, macro product photography, 100mm lens look, f/8 sharp focus, subtle texture detail, editorial commercial, 8k`
};

export const TEMPLATE_FORBIDDEN_CITY_PHOENIX = {
  cn: `### 紫禁城雪夜人形凤凰

在{{imperial_palace_scene}}中，一位"人形凤凰"化身宫殿的灵魂。她头戴{{phoenix_crown}}，身披{{flowing_garment}}，{{festive_props}}。

构图上将华丽繁复的头饰与流动的丝绸华服与身后辉煌的建筑相呼应，形成强烈的视觉共鸣。背光在漫天飞雪中极大地增强了神话般的氛围，营造出穿越时空、华美而庄严的梦幻意境。`,

  en: `### Forbidden City Snow Night Phoenix

In {{imperial_palace_scene}}, a "human phoenix" embodies the soul of the palace. She wears {{phoenix_crown}} and {{flowing_garment}}, {{festive_props}}.

The composition creates a strong visual resonance between the ornate headdress and flowing robes with the magnificent architecture behind. The backlight amidst falling snow greatly enhances the mythical atmosphere, creating a dreamlike artistic conception that transcends time and space with magnificence and solemnity.`
};

export const TEMPLATE_INTERIOR_RENDERING = {
  cn: `### 室内设计真实渲染

保持原图视角和墙体结构，生成室内 {{room_type}} 真实渲染图。进行合理的室内家具布置与材质搭配，为室内天花板、墙面、地板分别赋予材质，整体呈现 {{interior_design_style}}。房间内外均进行真实感渲染。

包括 {{furniture_set}}，材质质感逼真，{{interior_lighting}}。整体画面呈现出专业建筑摄影的光线效果，具备 {{render_quality}} 的图像细节。

**材质细节**:
- 天花板：{{ceiling_material}}
- 墙面：{{wall_material}}
- 地板：{{floor_material}}`,

  en: `### Interior Design Photorealistic Rendering

Maintaining the original perspective and wall structure, generate a realistic interior rendering of {{room_type}}. Perform reasonable interior furniture layout and material matching, assigning materials to the ceiling, walls, and floor respectively, presenting an overall {{interior_design_style}}. Both interior and exterior are rendered with realism.

Including {{furniture_set}}, with realistic material textures and {{interior_lighting}}. The overall image presents professional architectural photography lighting effects, with {{render_quality}} image details.

**Material Details**:
- Ceiling: {{ceiling_material}}
- Walls: {{wall_material}}
- Floor: {{floor_material}}`
};

export const TEMPLATE_ISOMETRIC_INTERIOR_SCENE = {
  cn: `### 等距视角室内场景

基于设计需求，创作一张isometric视角（等距轴测视角）的{{room_type}}室内场景图像，无任何透视效果，保持视角和相机位置的一致性。包括建筑的主体部分保持一致。

**房间状态**: {{room_condition}}

**设计风格**: {{interior_design_style}}

**材质细节**:
- 地面：{{floor_material}}
- 墙面：{{wall_material}}

**技术要求**: 使用3D建模的材质质感和建模软件常用的渲染效果，包括材质纹理效果、AO效果以及描边效果（根据房间状态选择是否使用）。白色背景，Blender渲染质感。`,

  en: `### Isometric Interior Scene

Based on design requirements, create an isometric perspective (orthographic axonometric view) {{room_type}} interior scene image with no perspective effects, maintaining consistency in viewing angle and camera position. The main architectural elements remain consistent.

**Room Condition**: {{room_condition}}

**Design Style**: {{interior_design_style}}

**Material Details**:
- Floor: {{floor_material}}
- Walls: {{wall_material}}

**Technical Requirements**: Use 3D modeling material textures and common rendering software effects, including material texture effects, AO effects, and outline effects (selected based on room condition). White background, Blender rendering quality.`
};

export const TEMPLATE_PRODUCT_DESIGN_SPEC = {
  cn: `### 产品设计规范图

**布局**: 垂直 3:4 画布，暖色调中性纸张背景

**上半部分 - 生活方式产品图**:

一个 {{product_category}}，放置在 {{environment_style}} 中。

**环境细节**:
- {{lighting}}，柔和但高对比度的阴影
- 微妙的混凝土或石材地面
- 有纹理的石膏墙背景
- 周围留有大量留白

**渲染风格**:
- 编辑式生活方式摄影
- 高真实感
- 暖色、柔和、高端的色调分级

**下半部分 - 技术规格面板**:

**技术绘图** (左侧和中部):
- {{drawing_style}}
- 正视图、侧视图、四分之三剖面图
- 正交投影
- 柔和的红色或深棕色细技术线
- 最小的编辑式测量标注

**材料面板** (右侧):
- 3-4 个符合产品调性的材质样本
- 方形或矩形样品
- 小型编辑式说明标签
- 技术但精致的语调

**排版风格**:
- 最小编辑式
- 微妙的说明文字，无大标题
- 柔和黑色或深棕色

**整体美学**:
- 设计目录 / 产品设计期刊氛围
- 建筑感、高端、宁静
- 避免杂乱、鲜艳颜色、重度品牌化、过度装饰的图形

**约束**:
- 不改变产品设计
- 不发明新材料
- 除非参考图中有，否则不添加徽标
- 绘图中不使用透视扭曲`,

  en: `### Product Design Specification

**Layout**: Vertical 3:4 canvas, warm neutral paper background

**Top Section - Lifestyle Product Image**:

A {{product_category}} placed in {{environment_style}}.

**Environment Details**:
- {{lighting}}, soft but high-contrast shadows
- Subtle concrete or stone flooring
- Textured plaster wall background
- Generous whitespace around product

**Rendering Style**:
- Editorial lifestyle photography
- High realism
- Warm, muted, premium color grading

**Bottom Section - Technical Specification Panel**:

**Technical Drawings** (bottom left and center):
- {{drawing_style}}
- Front view, side view, three-quarter cutaway view
- Orthographic projection
- Muted red or sepia fine technical lines
- Minimal, editorial measurement callouts

**Materials Panel** (bottom right):
- 3-4 material swatches that match the product's aesthetic
- Square or rectangular samples
- Small editorial caption labels
- Technical but refined tone

**Typography**:
- Minimal editorial
- Subtle captions, no large headlines
- Soft black or dark brown

**Overall Aesthetic**:
- Design catalog / product design journal mood
- Architectural, premium, calm
- Avoid clutter, bold colors, heavy branding, overly decorative graphics

**Constraints**:
- Do not change product design
- Do not invent new materials
- No logos unless present in reference
- No perspective distortion in drawings`
};

export const TEMPLATE_CHARACTER_LINE_ART = {
  cn: `### 人物转手绘插画

将照片转换为黑白线稿插画，钢笔墨水绘制风格。

**人物主体**: {{character_subject}}

**画面视角**: {{portrait_view}}

**艺术风格**:
- {{line_art_style}}
- 粗轮廓线，高对比度
- 干净的线条，手绘外观
- 图形小说美学

**阴影技法**: {{shading_technique}}

**背景处理**: {{background_treatment}}

**整体效果**:
- 单色素描
- 黑白线稿插图
- 漫画书风格肖像
- 极简主义，强调轮廓`,

  en: `### Convert to Character Line Art

Convert to black and white line art illustration, pen and ink drawing style.

**Character Subject**: {{character_subject}}

**Portrait View**: {{portrait_view}}

**Art Style**:
- {{line_art_style}}
- Bold outlines, high contrast
- Clean linework, hand-drawn appearance
- Graphic novel aesthetic

**Shading Technique**: {{shading_technique}}

**Background Treatment**: {{background_treatment}}

**Overall Effect**:
- Monochrome sketch
- Black and white line art illustration
- Comic book style portrait
- Minimalist, emphasizing outlines`
};

export const TEMPLATE_CLASSIC_GAME_REALISM = {
  cn: `### 经典游戏真实化

以照片级真实感重新想象经典游戏世界。

在一个图像中，以摄影方式可视化 {{classic_game}} 的角色、敌人和周围世界的真实模样。使图像尽可能保持与游戏的可识别性。

**视觉要求**:
- 照片级真实渲染
- 8位/16位游戏美学的现实诠释
- 标志性游戏元素的真实化呈现
- 保持原始游戏色彩和氛围的参考

**质量标准**:
- 高细节，电影级照明
- 真实材质和纹理
- 游戏场景的精确重建`,

  en: `### Classic Game Realism

Photorealistic reimagining of classic game worlds.

In one image, photographically visualize what the characters, enemies, and surrounding world of {{classic_game}} would look like if it was real. Make this image as recognisable to the game as possible.

**Visual Requirements**:
- Photorealistic rendering
- Realistic interpretation of 8-bit/16-bit game aesthetics
- Realistic presentation of iconic game elements
- Reference to original game colors and atmosphere

**Quality Standards**:
- High detail, cinematic lighting
- Realistic materials and textures
- Accurate reconstruction of game scenes`
};

export const TEMPLATE_SCIENCE_PAPER_MODEL = {
  cn: `### 科学发现纸雕模型

将重大科学发现解构为立体纸雕装置。

**输入**: {{scientific_discovery}}

**解构科学为3个叙事要素**:

**模型（核心装置）**:
- 识别代表理论的物理形状
- 例如：DNA → 双螺旋结构 | 相对论 → 弯曲重力网格/球体 | 微生物 → 显微细胞 | 日心说 → 太阳系

**研究者（角色）**:
- 识别关键科学家
- 例如：沃森、克里克 & 富兰克林 | 爱因斯坦 | 巴斯德 | 哥白尼

**数据（图解）**:
- 识别笔记的视觉语言
- 例如：化学键、数学公式、生物草图、轨道路径

**容器（实验日志）**:
- 目标："科学立体"模型摄影
- 物体：一本巨大的古董皮革装订日志
- 姿势：书本直立，以严格的90度角打开（L形）
- 垂直页面：作为黑板/图解墙
- 水平页面：作为实验室地板

**雕塑（纸艺理论）**:
- 构建："模型"从书本中心装订处垂直升起
- 材质：模型完全由书本自有的纸张条构成
- 细节：纸条扭曲、折叠并连接形成结构（例如DNA的扭转梯形）
- 高光：纸模型上微妙使用彩色墨水或铅笔（红、蓝、黄）以区分部分（例如碱基对或原子）

**叙事比例（科学家）**:
- 人物："研究者"的1:35比例微型人物站在水平页面上
- 服装：时代准确的服装（例如1950年代实验服、维多利亚西装、文艺复兴长袍）
- 动作：他们正在与巨大的纸模型互动——指向、用微小工具测量或持有微型剪贴板

**视觉效果**:
- 背景：模型后方的垂直页面覆盖着手绘墨水插图和与发现相关的图表
- 标题：页面顶部手写文本："[输入] 的发现"
- 前景：地面页面散布着涂写笔记、公式和签名

**输出**:
- 单张图像，1:1纵横比
- 微距摄影，"学术历史"美学
- 高纹理保真度`,

  en: `### Scientific Discovery Paper Model

Deconstruct major scientific discoveries into 3D paper sculpture installations.

**Input**: {{scientific_discovery}}

**Deconstruct the science into 3 Narrative Assets**:

**Model (The Centerpiece)**:
- Identify the physical shape that represents the theory
- Examples: DNA → A Double Helix | Relativity → A Curved Gravity Grid/Sphere | Germs → A Microscopic Cell | Heliocentrism → The Solar System

**Researchers (The Cast)**:
- Identify the key scientists involved
- Examples: Watson, Crick & Franklin | Einstein | Pasteur | Copernicus

**Data (The Diagrams)**:
- Identify the visual language of the notes
- Examples: Chemical bonds, Mathematical formulas, Biological sketches, Orbital paths

**Container (The Lab Journal)**:
- Goal: "Scientific Pop-Up" Diorama Photography
- Object: A massive, antique Leather-Bound Journal
- Pose: The book stands upright, opened at a strict 90-degree angle (L-Shape)
- Vertical Page: Acts as the blackboard/diagram wall
- Horizontal Page: Acts as the laboratory floor

**Sculpture (The Paper Theory)**:
- Construction: The "Model" rises vertically from the center gutter of the book
- Material: The model is constructed entirely from Strips of the Book's Own Paper
- Detail: The paper strips are twisted, folded, and connected to form the structure (e.g., the twisting ladder of the DNA)
- Highlight: Subtle use of Colored Ink or Pencil (Red, Blue, Yellow) on the paper model to distinguish parts (e.g., base pairs or atoms)

**Narrative Scale (The Scientists)**:
- Figures: 1:35 Scale Miniature Figures of the "Researchers" stand on the horizontal page
- Attire: Period-accurate clothing (e.g., 1950s Lab Coats, Victorian Suits, Renaissance Robes)
- The Action: They are interacting with the giant Paper Model—pointing, measuring with tiny tools, or holding miniature clipboards

**Visual**:
- Background: The vertical page behind the model is covered in Hand-Drawn Ink Illustrations and diagrams relevant to the discovery
- Title: Handwritten text at the top of the page: "The Discovery of [Input]"
- Foreground: The floor page is scattered with scribbled notes, formulas, and signatures

**Output**:
- ONE image, 1:1 Aspect Ratio
- Macro Photography, "Academic History" aesthetic
- High Texture Fidelity`
};

/**
 * 可用的模板标签
 */
export const TEMPLATE_TAGS = [
  "建筑",
  "人物",
  "摄影",
  "产品",
  "图表",
  "卡通",
  "宠物",
  "游戏",
  "创意",
  "节日",
  "动作",
  "影视",
  "纪实",
  "幻想",
  "动画",
  "武侠",
  "现代",
  "修仙"
];

export const TEMPLATE_TAVERN_FIGHT_VIDEO = {
  cn: `### 酒馆武打戏视频生成

这是一段酒馆武打戏的开头和结尾的画面，请基于这两个场景，生成一段流畅的黑衣女子与几个刺客打斗的画面。

**打斗风格：**
{{fight_style}}

**分镜与运镜要求：**
- 运用到分镜和不同视角切换，让整个画面更有节奏感和电影感
- {{camera_rhythm}}
- 开场镜头从酒馆全景推进到人物特写
- 打斗过程中穿插环境互动（桌椅翻飞、酒坛碎裂）
- 结尾镜头从近景拉远，展现战斗后的酒馆全貌

**画面氛围：**
- 昏暗的酒馆内部，烛光摇曳，光影交错
- 黑衣女子身手矫健，动作行云流水
- 刺客从暗处突袭，营造紧张压迫感
- 整体色调偏暗，关键动作瞬间用高光强调`,

  en: `### Tavern Fight Scene Video Generation

This depicts the opening and ending frames of a tavern fight scene. Based on these two scenes, generate a fluid sequence of a woman in black fighting several assassins.

**Fight Style:**
{{fight_style}}

**Storyboard & Camera Requirements:**
- Utilize storyboarding and different angle transitions to create rhythm and cinematic feel
- {{camera_rhythm}}
- Opening shot pushes from wide tavern establishing shot to character close-up
- Intersperse environmental interactions during combat (tables flipping, wine jars shattering)
- Ending shot pulls from close-up to wide, revealing the aftermath of the tavern battle

**Visual Atmosphere:**
- Dimly lit tavern interior, flickering candlelight, interplay of light and shadow
- Woman in black moves with agility, fluid and seamless combat movements
- Assassins strike from the shadows, creating tense and oppressive mood
- Overall dark tonal palette, key action moments emphasized with highlights`
};

export const TEMPLATE_ANATOMY_FIGURE_STUDY = {
  cn: `### 解剖学人物画研究 (Anatomical Figure Drawing Study)

几何人体模型分解，将人体姿态参考照片放置在左上角（小缩略图），主区域展示结构解剖素描。

**几何构造 (GEOMETRIC CONSTRUCTION):**
- 四肢（手臂、腿部、颈部）使用圆柱体形式
- 躯干、骨盆、脚部使用盒子/楔形形状
- 肩部、肘部、膝盖、手腕处使用球形关节
- 头部使用倒角立方体，并标示面部平面
- {{anatomy_teaching_style}}

**风格规格 (STYLE SPECIFICATIONS):**
- {{construction_line_color}}
- 松弛的手势线条，可见构造笔触
- 半透明的重叠形式展示深度
- 地平线标记在人物地面平面上
- 如果姿势复杂，展示同一姿势的多个观察角度

**艺术方法 (ARTISTIC APPROACH):**
- 人物画研究美学
- 教育插图质量
- 白色/米白色背景
- 手绘铅笔素描外观

**构图 (COMPOSITION):**
- 参考照片：左上角，小比例
- 几何分解：填充画布剩余的 80%
- 干净的专业布局，类似解剖学教科书`,
  en: `### Anatomical Figure Drawing Study

Geometric mannequin breakdown of human pose reference photo placed in top-left corner (small thumbnail), main area shows structural anatomy sketch.

**GEOMETRIC CONSTRUCTION:**
- Cylindrical forms for limbs (arms, legs, neck)
- Box/wedge shapes for torso, pelvis, feet
- Spherical joints at shoulders, elbows, knees, wrists
- Beveled cube for head with facial plane indication
- {{anatomy_teaching_style}}

**STYLE SPECIFICATIONS:**
- {{construction_line_color}}
- Loose gestural linework with visible construction strokes
- Semi-transparent overlapping forms showing depth
- Horizon line marked at figure's ground plane
- Multiple viewing angles of same pose if complex

**ARTISTIC APPROACH:**
- Figure drawing study aesthetic
- Educational illustration quality
- White/off-white background
- Hand-drawn pencil sketch appearance

**COMPOSITION:**
- Reference photo: top-left corner, small scale
- Geometric breakdown: fills remaining 80% of canvas
- Clean professional layout like anatomy textbook`
};

export const TEMPLATE_3X3_STORYBOARD_VIDEO = {
  cn: `使用故事板图片创建视频。

将3x3故事板图片转换为视频。`,

  en: `Create a video using storyboard images.

Convert 3x3 storyboard images into video.`
};

export const TEMPLATE_CYBERPUNK_VEHICLE_CHASE = {
  cn: `### 赛博朋克飞行器追逐视频

**电影风格**：{{sci_fi_movie_style}}，高对比度霓虹光影，IMAX电影质感，史诗级配乐感。

**视频时长**：10秒

**分镜脚本**：

[00:00-00:04] 镜头1：{{tracking_camera_shot}}
画面：{{cyberpunk_city_scene}}，夜幕降临，还在下雨。
动作：一辆{{futuristic_vehicle}}以极高速度在摩天大楼之间穿梭。
环境细节（核心测试点）：数不清的巨大全息广告牌在闪烁，霓虹灯光极其复杂地反射在湿滑的玻璃幕墙和飞行器表面。飞行器尾部拉出长长的蓝色光流轨迹。

[00:04-00:07] 镜头2：{{action_camera_shot}}
动作：飞行器为了躲避障碍物，做了一个急转弯侧滑动作。
细节：镜头非常贴近飞行器，捕捉每一个细节。

[00:07-00:10] 镜头3：拉远镜头，展现飞行器消失在霓虹闪烁的城市深处。`,

  en: `### Cyberpunk Vehicle Chase Video

**Movie Style**: {{sci_fi_movie_style}}, high contrast neon lighting, IMAX movie quality, epic soundtrack feel.

**Video Duration**: 10 seconds

**Storyboard Script**:

[00:00-00:04] Shot 1: {{tracking_camera_shot}}
Scene: {{cyberpunk_city_scene}}, night has fallen, it's raining.
Action: A {{futuristic_vehicle}} weaves through skyscrapers at extreme speed.
Environmental Details (Core Test Point): Countless giant holographic ads flickering, neon lights reflecting complexly off wet glass curtain walls and the vehicle surface. The vehicle's tail creates long blue light trails.

[00:04-00:07] Shot 2: {{action_camera_shot}}
Action: The vehicle makes a sharp banked turn to dodge obstacles.
Details: The camera is extremely close to the vehicle, capturing every detail.

[00:07-00:10] Shot 3: Pull back to reveal the vehicle disappearing into the neon-lit depths of the city.`
};

export const TEMPLATE_RAINFOREST_WATERFALL_JET = {
  cn: `### 雨林瀑布战机穿越视频

一个电影感的视频序列，开场是 {{aerial_opening_shot}} 展示延伸至地平线的广阔 {{natural_environment}}，雾气在树冠中滚动，巨大的咆哮瀑布主导着中心景观，坠入阴影深处。

镜头平滑过渡到 {{dynamic_tracking_shot}}，位置刚好在 {{military_aircraft}} 后方并略高于其上方，锁定其运动，因为它以极快的速度从高空向瀑布加速。

速度感通过湍流空气扭曲、蒸汽轨迹、引擎热浪闪烁和微妙的相机震动来强调，飞机穿过云层。

飞机快速下降，刚好掠过树梢上方，相机从后面紧密跟随，当飞机在参天大树和陡峭悬崖之间穿梭时，完美同步地倾斜和翻滚，动作精确而敏捷。

阳光在飞机机身上闪过，叶子在下方模糊，雾气和喷雾向相机涌来，仿佛被飞机的尾流拉走。

随着瀑布越来越近，咆哮声加剧，水向四面八方爆炸，水滴掠过跟踪相机。

在最后时刻，飞机急剧向上拉起，完成完美的90度垂直爬升，相机直接留在后面，因为它穿过浓雾和辐射光。

序列在飞机冲出瀑布上方时达到高潮，展现出另一侧宁静、发光的河流在原始、茂密的森林中蜿蜒的壮丽全景，平静而宏伟，与猛烈的爬升形成鲜明对比。`,

  en: `A cinematic video sequence that opens with an {{aerial_opening_shot}} of a vast {{natural_environment}} stretching to the horizon, mist rolling through the canopy as a colossal roaring waterfall dominates the center of the landscape, plunging into shadowed depths.

The camera then transitions smoothly into a {{dynamic_tracking_shot}} positioned just behind and slightly above a {{military_aircraft}}, locked onto its movement as it accelerates at extreme speed from high altitude toward the waterfall.

The sense of velocity is emphasized by turbulent air distortion, vapor trails, engine heat shimmer, and subtle camera vibration as the jet cuts through clouds.

The jet descends rapidly, skimming just above the treetops while the camera follows tightly from behind, banking and rolling in perfect sync as the aircraft weaves between towering trees and steep cliffs with precise, agile movements.

Sunlight flashes across the jet's fuselage, leaves blur past beneath it, and mist and spray rush toward the camera as if being pulled along in the jet's wake.

As the waterfall looms closer, the roar intensifies, water exploding outward on all sides while droplets streak past the tracking camera.

In the final moment, the jet pulls sharply upward into a flawless 90 degree vertical climb, the camera staying directly behind as it rockets through dense mist and radiant light.

The sequence culminates as the jet bursts above the waterfall, revealing a breathtaking wide vista of a serene, glowing river winding through untouched, lush forest on the other side, calm and majestic in striking contrast to the violent ascent.`
};

/**
 * 系统内置模板列表
 * 
 * 如何添加新模板：
 * 1. 在上方定义模板内容常量 (可选，但推荐)
 * 2. 在数组中添加一个新的配置对象
 * 3. 确保 id 唯一
 * 4. imageUrl 可以是外部链接，也可以是项目内的 import 资源
 * 5. tags 可以从 TEMPLATE_TAGS 中选择
 */
export const INITIAL_TEMPLATES_CONFIG = [
  {
    id: "tpl_default",
    name: { cn: "角色概念分解图", en: "Character Concept Sheet" },
    content: DEFAULT_TEMPLATE_CONTENT,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/08/ec433cf214faf102.jpg",
    author: "@berryxia（Berryxia.AI）",
    selections: {},
    tags: ["人物", "创意", "图表"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_photo_grid",
    name: { cn: "3x3 摄影网格", en: "3x3 Photo Grid" },
    content: TEMPLATE_PHOTO_GRID,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/08/5302794e63fa130b.jpg",
    author: "@tanshilong（MarioTan）",
    selections: {
      "clothing": { cn: "炭灰色无袖连衣裙", en: "Charcoal grey sleeveless dress" },
      "grid_pose-0": { cn: "前景手指虚化", en: "Out-of-focus fingers in foreground" },
      "grid_pose-1": { cn: "目光锁定镜头", en: "Eyes locked on camera" },
      "grid_pose-2": { cn: "单色下巴托手", en: "Monochrome hand on chin" },
      "grid_pose-3": { cn: "正面特写阴影", en: "Frontal close-up with shadows" },
      "grid_pose-4": { cn: "斜角拍摄", en: "Angled shot" },
      "grid_pose-5": { cn: "双手置于锁骨", en: "Hands on collarbones" },
      "grid_pose-6": { cn: "坐姿半身侧面", en: "Seated half-body profile" },
      "grid_pose-7": { cn: "侧面微距水滴", en: "Side macro with water drops" },
      "grid_pose-8": { cn: "回眸一笑", en: "Looking back with a smile" },
      "lens_param-0": { cn: "85mm, f/1.8", en: "85mm, f/1.8" },
      "lens_param-1": { cn: "85mm, f/2.0", en: "85mm, f/2.0" },
      "lens_param-2": { cn: "50mm, f/2.2", en: "50mm, f/2.2" },
      "lens_param-3": { cn: "50mm, f/2.5", en: "50mm, f/2.5" },
      "lens_param-4": { cn: "50mm, f/3.2", en: "50mm, f/3.2" },
      "lens_param-5": { cn: "35mm, f/4.5", en: "35mm, f/4.5" },
      "lens_param-6": { cn: "85mm, f/1.9", en: "85mm, f/1.9" },
      "lens_param-7": { cn: "50mm, f/1.8", en: "50mm, f/1.8" },
      "lens_param-8": { cn: "85mm, f/2.2", en: "85mm, f/2.2" }
    },
    tags: ["人物", "摄影"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_fashion",
    name: { cn: "时尚情绪板插画", en: "Fashion Moodboard" },
    content: TEMPLATE_FASHION_MOODBOARD,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/08/4d9f92ccb4113fdd.jpg",
    author: "@tanshilong（MarioTan）",
    selections: {},
    tags: ["人物", "创意", "卡通"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_character_selfie",
    name: { cn: "人物趣味合影", en: "Character Selfie" },
    content: TEMPLATE_CHARACTER_SELFIE,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/08/c2312d24d0f2c38e.jpeg",
    author: "@tanshilong（MarioTan）",
    selections: {},
    tags: ["人物", "创意"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_classic_scene",
    name: { cn: "经典场景微缩复刻", en: "Classic Scene Miniature" },
    content: TEMPLATE_CLASSIC_SCENE,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/10/1eac697f5a438542.jpg",
    author: "@tanshilong（MarioTan）",
    selections: {
      "classic_scene": { cn: "千与千寻", en: "Spirited Away" },
      "render_style": { cn: "Octane Render 和 Cinema 4D", en: "Octane Render and Cinema 4D" },
      "position": { cn: "顶部中央", en: "Top Center" }
    },
    tags: ["卡通", "创意", "游戏"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_corporate_growth",
    name: { cn: "可视化企业成长之路", en: "Corporate Evolution Path" },
    content: TEMPLATE_CORPORATE_GROWTH,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/10/a7e87e49c6144fdc.jpg",
    author: "@langzihan（Keng哥）",
    selections: {
      "company": { cn: "任天堂（Nintendo）", en: "Nintendo" },
      "render_style": { cn: "3D像素风格", en: "3D Pixel Art Style" },
      "ratio": { cn: "3:4竖构图", en: "3:4 Vertical" }
    },
    tags: ["建筑", "创意", "图表"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_fisheye_urban",
    name: { cn: "极端鱼眼都市奇观", en: "Fisheye Urban Wonder" },
    content: TEMPLATE_FISHEYE_URBAN,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/14/b21165a2afefaf4d.jpg",
    author: "@tanshilong（MarioTan）",
    selections: {
      "lens_type": { cn: "极端鱼眼镜头", en: "Extreme Fisheye Lens" },
      "role": { cn: "年轻女性", en: "Young woman" },
      "character_originality": { cn: "使用附图中的人物，确保结果与人物一致性", en: "Use character in attachment, ensure consistency" },
      "school_uniform": { cn: "灰色开衫和格子裙校服", en: "Grey cardigan and plaid skirt uniform" },
      "urban_location": { cn: "涩谷十字路口", en: "Shibuya Crossing" },
      "dynamic_action": { cn: "一只手夸张地伸向镜头前景", en: "One hand exaggeratedly reaching towards the foreground" },
      "fingernail_detail": { cn: "手指甲清晰可见", en: "Fingernails clearly visible" },
      "building_cluster": { cn: "扭曲的涩谷109大楼和其他建筑林立", en: "Distorted Shibuya 109 building and other forest of buildings" },
      "crowd_traffic": { cn: "挤满行人和车辆", en: "Bustling traffic" },
      "monster_element": { cn: "巨大的粉色和蓝色渐变卡通怪兽", en: "Giant pink and blue gradient cartoon monster" },
      "monster_feature": { cn: "巨大的触手和角", en: "Giant tentacles and horns" },
      "distorted_city": { cn: "扭曲的城市景观", en: "Distorted urban landscape" },
      "lighting_atmosphere": { cn: "阳光明媚", en: "Sunny" },
      "shadow_contrast": { cn: "光影对比强烈", en: "Strong light-shadow contrast" },
      "ratio": { cn: "圆形画幅", en: "Circular Aspect Ratio" },
      "render_style": { cn: "高质量的 2D 插画风格", en: "High-quality 2D illustration style" }
    },
    tags: ["摄影", "创意", "人物"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_detective_social",
    name: { cn: "历史名人的朋友圈", en: "Historical Figure's Moments" },
    content: TEMPLATE_DETECTIVE_SOCIAL,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/14/6ff892060de55ea9.jpg",
    author: "@dotey(宝玉)",
    selections: {
      "character_groups": { cn: "中国古代开国皇帝", en: "Ancient Chinese Founding Emperors" },
      "social_media": { cn: "微信朋友圈", en: "WeChat Moments" },
      "ratio": { cn: "9:16竖构图", en: "9:16 Vertical" }
    },
    tags: ["创意", "人物", "摄影"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_magazine_cover",
    name: { cn: "杂志大片", en: "Magazine Cover" },
    content: TEMPLATE_MAGAZINE_COVER,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/16/a6106f5cc6e92a74.jpg",
    imageUrls: [
      "https://s3.bmp.ovh/imgs/2025/12/16/a6106f5cc6e92a74.jpg",
      "https://s3.bmp.ovh/imgs/2025/12/16/cf8edb6f54db15bf.jpg"
    ],
    author: "@hx831126（虎小象）",
    selections: {
      "travel_location": { cn: "东北雪乡", en: "Snow Village in Northeast China" },
      "ratio": { cn: "9:16竖构图", en: "9:16 Vertical" }
    },
    tags: ["人物", "摄影", "创意"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_manga_reality",
    name: { cn: "漫画人物成真", en: "Manga to Reality" },
    content: TEMPLATE_MANGA_TO_REALITY,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/16/f5291c56ece88cd9.jpg",
    author: "PlayForge AI(@94van.AI)",
    selections: {
      "character_originality": { cn: "使用附图中的人物，确保结果与人物一致性", en: "Use character in attachment, ensure consistency" },
      "comic_scene": { cn: "唯美的卧室", en: "Beautiful bedroom" },
      "ratio": { cn: "9:16竖构图", en: "9:16 Vertical" }
    },
    tags: ["人物", "创意", "卡通"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_industrial_design",
    name: { cn: "设计大师的产品设计", en: "Industrial Design Masterpiece" },
    content: TEMPLATE_INDUSTRIAL_DESIGN,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/17/7dbe43ae66b1a78c.jpg",
    imageUrls: [
      "https://s3.bmp.ovh/imgs/2025/12/17/7dbe43ae66b1a78c.jpg",
      "https://s3.bmp.ovh/imgs/2025/12/29/e6b0964f5a9a55bd.jpg",
      "https://s3.bmp.ovh/imgs/2025/12/29/fa5b709a4df577fd.jpg"
    ],
    author: "@tanshilong（MarioTan）",
    selections: {
      "designer": { cn: "Jonathan Ive (Jony Ive)", en: "Jonathan Ive" },
      "design_item": { cn: "无人机", en: "Drone" },
      "ratio": { cn: "3:4竖构图", en: "3:4 Vertical" }
    },
    tags: ["产品", "创意", "图表"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_photo_grid_v2",
    name: { cn: "3x3 摄影网格出格版", en: "3x3 Photo Grid (Out of Box)" },
    content: TEMPLATE_PHOTO_GRID_V2,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/17/77bfd2bf7abc3eac.png",
    author: "PlayForge AI(@94van.AI)",
    selections: {
      "clothing": { cn: "炭灰色无袖连衣裙", en: "Charcoal grey sleeveless dress" },
      "grid_pose-0": { cn: "前景手指虚化", en: "Out-of-focus fingers in foreground" },
      "grid_pose-1": { cn: "目光锁定镜头", en: "Eyes locked on camera" },
      "grid_pose-2": { cn: "单色下巴托手", en: "Monochrome hand on chin" },
      "grid_pose-3": { cn: "正面特写阴影", en: "Frontal close-up with shadows" },
      "grid_pose-4": { cn: "斜角拍摄", en: "Angled shot" },
      "grid_pose-5": { cn: "双手置于锁骨", en: "Hands on collarbones" },
      "grid_pose-6": { cn: "坐姿半身侧面", en: "Seated half-body profile" },
      "grid_pose-7": { cn: "侧面微距水滴", en: "Side macro with water drops" },
      "grid_pose-8": { cn: "回眸一笑", en: "Looking back with a smile" },
      "lens_param-0": { cn: "85mm, f/1.8", en: "85mm, f/1.8" },
      "lens_param-1": { cn: "85mm, f/2.0", en: "85mm, f/2.0" },
      "lens_param-2": { cn: "50mm, f/2.2", en: "50mm, f/2.2" },
      "lens_param-3": { cn: "50mm, f/2.5", en: "50mm, f/2.5" },
      "lens_param-4": { cn: "50mm, f/3.2", en: "50mm, f/3.2" },
      "lens_param-5": { cn: "35mm, f/4.5", en: "35mm, f/4.5" },
      "lens_param-6": { cn: "85mm, f/1.9", en: "85mm, f/1.9" },
      "lens_param-7": { cn: "50mm, f/1.8", en: "50mm, f/1.8" },
      "lens_param-8": { cn: "85mm, f/2.2", en: "85mm, f/2.2" }
    },
    tags: ["人物", "摄影"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_raindrop_art",
    name: { cn: "雨滴定格艺术", en: "Raindrop Art" },
    content: TEMPLATE_RAINDROP_ART,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/19/6b6e14845635b168.jpg",
    author: "@tanshilong（MarioTan）",
    selections: {
      "rain_shape": { cn: "芭蕾舞者", en: "Ballerina" },
      "ratio": { cn: "3:4竖构图", en: "3:4 Vertical" }
    },
    tags: ["摄影", "创意"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_art_growth",
    name: { cn: "可视化艺术成长之路", en: "Artistic Evolution Path" },
    content: TEMPLATE_ART_GROWTH,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/19/47a2cbfec635a29a.jpg", 
    author: "@sundyme",
    selections: {
      "art_type": { cn: "美术学", en: "Fine Arts" },
      "render_style": { cn: "3D像素风格", en: "3D Pixel Art Style" },
      "ratio": { cn: "3:4竖构图", en: "3:4 Vertical" }
    },
    tags: ["建筑", "创意", "图表"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_miniature_desk",
    name: { cn: "窗边书桌微缩场景", en: "Window Desk Miniature" },
    content: TEMPLATE_MINIATURE_DESK,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/20/8e9c9c28b3d2cf1b.jpg",
    author: "@tanshilong（MarioTan）",
    selections: {
      "show_name": { cn: "龙猫", en: "My Neighbor Totoro" },
      "character_name": { cn: "龙猫", en: "Totoro" },
      "render_style": { cn: "毛毡与粘土", en: "Felt and Clay" },
      "ratio": { cn: "4:3横构图", en: "4:3 Horizontal" }
    },
    tags: ["摄影", "创意", "卡通"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_japanese_product_poster",
    name: { cn: "日式产品海报", en: "Japanese Product Poster" },
    content: TEMPLATE_JAPANESE_PRODUCT_POSTER,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/25/a574127d24ac34e3.png",
    author: "@berryxia（Berryxia.AI）",
    selections: {
      "fruit_1-0": { cn: "柠檬", en: "Lemon" },
      "ratio": { cn: "16:9横构图", en: "16:9 Horizontal" }
    },
    tags: ["产品", "创意", "摄影"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_luxury_editorial",
    name: { cn: "高级时装露背人像", en: "Luxury Editorial Portrait" },
    content: TEMPLATE_LUXURY_EDITORIAL,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/25/bb94a5f7b87af2ee.jpg",
    author: "@sidona",
    selections: {
      "subject": { cn: "女性", en: "Woman" },
      "clothing": { cn: "极简黑色高级定制礼服", en: "Minimalist black couture gown" },
      "background_style": { cn: "干净的纯白影棚背景", en: "Clean pure white studio background" },
      "lighting": { cn: "柔和的编辑级影棚布光", en: "Soft editorial studio lighting" },
      "ratio": { cn: "3:4竖构图", en: "3:4 Vertical" }
    },
    tags: ["人物", "摄影", "创意"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_pixar_deconstruction",
    name: { cn: "角色艺术拆解升级版", en: "Role Deconstruction" },
    content: TEMPLATE_PIXAR_DECONSTRUCTION,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/26/1931582fcfb9d1e5.png",
    author: "@berryxia（Berryxia.AI）",
    selections: {
      "render_style": { cn: "Pixar 卡通渲染", en: "Pixar Cartoon Rendering" },
      "subject": { cn: "时尚女性角色", en: "Fashionable Female Character" },
      "character_type_pixar": { cn: "单人角色：聚焦于个人生活方式", en: "Single: Focus on personal lifestyle" },
      "ratio": { cn: "16:9横构图", en: "16:9 Horizontal" }
    },
    tags: ["人物", "创意", "卡通", "图表"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_street_self_dialogue",
    name: { cn: "街头的自我对话", en: "Street Self-Dialogue" },
    content: TEMPLATE_STREET_DIALOGUE,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/25/fd3cbc98f5afa970.png",
    author: "@tanshilong（MarioTan）",
    selections: {
      "building_cluster": { cn: "纽约摩天大楼群", en: "New York skyscraper cluster" },
      "lighting_atmosphere": { cn: "夕阳余晖", en: "Sunset afterglow" },
      "clothing": { cn: "黑色修身西装", en: "Black slim-fit suit" },
      "lens_param": { cn: "85mm, f/1.8", en: "85mm, f/1.8" },
      "ratio": { cn: "3:4竖构图", en: "3:4 Vertical" }
    },
    tags: ["人物", "摄影", "创意"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_wooden_art_xmas",
    name: { cn: "木质层叠艺术", en: "Layered Wood Art" },
    content: TEMPLATE_WOODEN_ART_XMAS,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/26/3170b82b79a7801e.jpeg",
    author: "@tanshilong(MarioTan)",
    selections: {
      "xmas_theme": { cn: "抽象圣诞树", en: "an abstract Christmas Tree" },
      "ratio": { cn: "3:4竖构图", en: "3:4 Vertical" }
    },
    tags: ["产品", "创意", "摄影"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_brand_concept_object",
    name: { cn: "品牌概念单品", en: "Brand Concept Object" },
    content: TEMPLATE_BRAND_CONCEPT_OBJECT,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/27/e893bd88e9ea324b.png",
    author: "@AmirMushich",
    selections: {
      "company": { cn: "Apple", en: "Apple" },
      "design_item": { cn: "无人机", en: "Drone" },
      "ratio": { cn: "1:1", en: "1:1 Square" }
    },
    tags: ["产品", "创意", "摄影"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_fashion_focus",
    name: { cn: "高端时尚杂志封面 - FOCUS", en: "Fashion Magazine - FOCUS" },
    content: TEMPLATE_FASHION_FOCUS,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/29/ebe3e34755c3ef2e.png",
    imageUrls: [
      "https://s3.bmp.ovh/imgs/2025/12/29/ebe3e34755c3ef2e.png",
      "https://s3.bmp.ovh/imgs/2026/01/09/c5b49962fae9dfa3.jpg "
    ],
    author: "Latte(@0xbisc)",
    selections: {
      "character_originality": { cn: "使用附图中的人物，确保结果与人物一致性", en: "Use character in attachment, ensure consistency" },
      "clothing": { cn: "秋冬季顶级时尚服饰", en: "High-end autumn/winter fashion apparel" },
      "ratio": { cn: "3:4竖构图", en: "3:4 Vertical" }
    },
    tags: ["人物", "摄影", "创意"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_city_glimpse",
    name: { cn: "都市一瞥", en: "City Glimpse" },
    content: TEMPLATE_CITY_GLIMPSE,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/29/d02fe64ad317ad60.jpg", // 暂无预览图，使用占位或稍后由用户补充
    author: "阿兹特克小羊驼(@AztecaAlpaca)",
    selections: {
      "city_name": { cn: "京都", en: "Kyoto" },
      "art_style": { cn: "浮世绘 (Ukiyo-e)", en: "Ukiyo-e" },
      "art_tool": { cn: "毛笔", en: "Ink Brush" },
      "dominant_colors": { cn: "传统的京都红与古朴的墨黑色", en: "Traditional Kyoto red and antique ink black" },
      "background_color_clean": { cn: "纯白", en: "Pure White" },
      "city_glimpse_subtitle": { cn: "古韵悠长的千年古都", en: "The thousand-year-old ancient capital" },
      "ratio": { cn: "4:3横构图", en: "4:3 Horizontal" }
    },
    tags: ["建筑", "创意", "摄影"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_multiple_selves_indoor",
    name: { cn: "多个自我“对话” (室内聚会版)", en: "Multiple Self-Dialogue (Indoor Party)" },
    content: TEMPLATE_MULTIPLE_SELVES_INDOOR,
    imageUrl: "https://s3.bmp.ovh/imgs/2025/12/30/fe7893150e65cc54.jpg", 
    author: "@tanshilong(MarioTan)",
    selections: {
      "clothing": { cn: "秋冬季休闲服饰", en: "autumn/winter casual wear" },
      "action_status-0": { cn: "玩PS5", en: "playing PS5" },
      "action_status-1": { cn: "弹吉他", en: "playing the guitar" },
      "action_status-2": { cn: "在电脑前写代码", en: "coding in front of a computer" },
      "action_status-3": { cn: "拿着香蕉在画画", en: "painting with a banana" },
      "action_status-4": { cn: "穿潜水脚蹼", en: "putting on diving fins" },
      "lens_param": { cn: "85mm, f/1.8", en: "85mm, f/1.8" },
      "ratio": { cn: "3:4竖构图", en: "3:4 Vertical" }
    },
    tags: ["人物", "摄影", "创意"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_character_sheet_art",
    name: { cn: "角色设定稿", en: "Character Sheet" },
    content: TEMPLATE_CHARACTER_SHEET_ART,
    imageUrl: "https://s3.bmp.ovh/imgs/2026/01/04/d530d1e38098944e.png",
    author: "@tanshilong",
    selections: {
      "character_originality": { cn: "创作一个原创人物", en: "Create an original character" },
      "art_tool": { cn: "毛笔", en: "Ink Brush" },
      "background_style": { cn: "极简纯色背景", en: "Minimalist solid color background" },
      "draw_style": { cn: "手绘漫画风格", en: "Hand-drawn Manga Style" }
    },
    tags: ["人物", "创意"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_underwater_caustics",
    name: { cn: "水下焦散人像摄影", en: "Underwater Caustics Portrait" },
    content: TEMPLATE_UNDERWATER_CAUSTICS,
    imageUrl: "https://s41.ax1x.com/2026/01/05/pZdAL9K.jpg",
    author: "@tanshilong",
    selections: {
      "subject": { cn: "女性", en: "Woman" },
      "clothing": { cn: "白色衬衫与内衣", en: "white shirt and lingerie" },
      "underwater_color": { cn: "深青色透明水下", en: "deep teal transparent underwater" },
      "creatures": { cn: "许多银色小鱼", en: "many small silver fish" },
      "ratio": { cn: "3:4竖构图", en: "3:4 Vertical" }
    },
    tags: ["人物", "摄影", "创意"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_daily_snapshot",
    name: { cn: "日常氛围快照", en: "Daily Snapshot" },
    content: TEMPLATE_DAILY_SNAPSHOT,
    imageUrl: "https://s3.bmp.ovh/imgs/2026/01/08/599f54de89ca6198.jpg", 
    author: "underwood（@underwoodxie96）",
    selections: {
      "background_scene": { cn: "昏暗、平凡的房间，身后有一面素墙", en: "Dark, ordinary room with a plain wall behind the subject" },
      "lighting": { cn: "随意的肖像摄影，带有日常快照氛围", en: "Casual portrait photography with a daily snapshot vibe" },
      "clothing": { cn: "略显成熟的“大姐姐”时尚风格", en: "Slightly mature 'onee-san' fashion style" },
      "accessory_glasses": { cn: "戴着有轻微镜面反射的眼镜", en: "wearing glasses with mild lens reflections" },
      "action_status": { cn: "坐在沙发上，正随意地玩着手机", en: "Sitting on a sofa, casually playing on her phone" },
      "camera_angle": { cn: "上半身特写", en: "upper-body close-up" },
      "underwear_style": { cn: "“纯欲风”服饰", en: "'pure-seductive' outfit style" },
      "subject": { cn: "女性，约20岁", en: "Female, around 20 years old" },
      "ratio": { cn: "3:4竖构图", en: "3:4 Vertical" }
    },
    tags: ["人物", "摄影"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_surveillance_still",
    name: { cn: "隐藏相机监控视角", en: "Surveillance Still" },
    content: TEMPLATE_SURVEILLANCE_STILL,
    imageUrl: "https://s3.bmp.ovh/imgs/2026/01/08/ff4ac4b4171f41f5.jpg", 
    author: "@YaseenK7212",
    selections: {
      "character_originality": { cn: "年轻韩国女团偶像", en: "Young Korean female K-pop idol" },
      "hair_style": { cn: "黑色直发，垂在肩上", en: "Black straight hair, falling over shoulders" },
      "action_status": { cn: "换衣时惊讶地抬头直视镜头", en: "frozen in surprise, looking directly into the lens while changing" },
      "clothing": { cn: "半脱的灰色大号连帽衫，露出白色吊带", en: "half-removed oversized grey hoodie, revealing white camisole" },
      "background_scene": { cn: "昏暗舒适的后台更衣室或私密宿舍", en: "dimly lit, cozy backstage dressing room or private dorm room" },
      "lighting": { cn: "隐藏相机拍摄风格，Portra 400 胶片质感", en: "Hidden camera style, Portra 400 film grain aesthetic" },
      "camera_angle": { cn: "平视、略微隐藏的中景镜头", en: "eye-level, slightly hidden intimate medium shot" },
      "ratio": { cn: "3:4竖构图", en: "3:4 Vertical" }
    },
    tags: ["人物", "摄影", "创意"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_fine_art_garden",
    name: { cn: "唯美花园艺术人像", en: "Fine-art Garden Portrait" },
    content: TEMPLATE_FINE_ART_GARDEN,
    imageUrl: "https://s3.bmp.ovh/imgs/2026/01/08/d325cd6ce1727205.jpg", 
    author: "Taaruk(@Taaruk_)",
    selections: {
      "subject": { cn: "女性角色", en: "Female Character" },
      "hair_style": { cn: "短发，柔和凌乱的深色头发", en: "Short, softly tousled dark hair" },
      "action_status": { cn: "温柔地凝视着镜头，带着淡淡的忧郁", en: "Looking gently toward the camera, with a touch of melancholy" },
      "clothing": { cn: "柔和青色复古碎花连衣裙", en: "Muted teal floral dress with subtle vintage patterns" },
      "background_scene": { cn: "盛开的郁郁葱葱的花园", en: "Lush garden in full bloom" },
      "flower_type": { cn: "白色和淡桃色花瓣在空中飘落", en: "White and pale peach flower petals drifting through the air" },
      "camera_angle": { cn: "腰部以上的美术肖像", en: "Waist-up fine-art portrait" },
      "lens_param": { cn: "85mm, f/1.8", en: "85mm, f/1.8" },
      "lighting": { cn: "阴天下的柔和自然光", en: "Soft natural light under overcast sky" },
      "role": { cn: "美术摄影与电影写实风格", en: "Fine-art photography blended with cinematic realism" },
      "ratio": { cn: "2:3竖构图", en: "2:3 Vertical" }
    },
    tags: ["人物", "摄影", "创意"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_chinese_new_year_poster",
    name: { cn: "中国新年时尚海报", en: "Chinese New Year Fashion Poster" },
    content: TEMPLATE_CHINESE_NEW_YEAR_POSTER,
    imageUrl: "https://s3.bmp.ovh/imgs/2026/01/09/83205df357ad8c1c.jpg",
    author: "@tanshilong",
    selections: {
      "character_originality": { cn: "创作一个原创人物", en: "Create an original character" },
      "character_heroic": { cn: "文艺青年", en: "Artistic Youth" },
      "clothing_style_chinese": { cn: "古典红色汉服", en: "Classical red Hanfu" },
      "clothing_color_traditional": { cn: "暗红色", en: "Dark Red" },
      "ratio": { cn: "2:3竖构图", en: "2:3 Vertical" }
    },
    tags: ["创意", "人物", "时尚", "节日"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_cute_dynamic_portrait",
    name: { cn: "可爱动态人像", en: "Cute Dynamic Portrait" },
    content: TEMPLATE_CUTE_DYNAMIC_PORTRAIT,
    imageUrl: "https://s3.bmp.ovh/imgs/2026/01/10/9e64b198ccc9663a.jpg",
    author: "M7(@mi7_crypto)",
    selections: {
      "room_style_cute": { cn: "可爱粉色房间，粉彩床和墙壁，原创动物玩偶，妖精灯光，可爱海报，毛绒地毯", en: "Cute pink room, pastel pink bed and walls, original cute animal plushies, fairy lights, cute posters, fluffy rug" },
      "lens_type": { cn: "20mm 广角镜头", en: "20mm wide-angle lens" },
      "cute_pose_dynamic": { cn: "向前走时回望，从正上方自信俏皮地俯视，迷人微笑", en: "Walking forward while looking back, confidently and playfully looking down from directly above, charming smile" },
      "cute_outfit": { cn: "黑色紧身吊带连衣裙，长度到臀部，无袖，细肩带", en: "Black tight camisole dress, hip-length, sleeveless, thin straps" },
      "lighting": { cn: "温暖的室内自然光，从窗射入，柔和的妖精灯在背景中", en: "Warm indoor natural light streaming through window, soft fairy lights in background" },
      "camera_angle": { cn: "极低角度虫视，床高度", en: "Extreme low-angle worm's-eye view, bed height" }
    },
    tags: ["人物", "摄影", "创意"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_fitness_selfie",
    name: { cn: "健身自拍场景", en: "Fitness Selfie Scene" },
    content: TEMPLATE_FITNESS_SELFIE,
    imageUrl: "https://s3.bmp.ovh/imgs/2026/01/13/9413347206a80484.png",
    author: "@tanshilong",
    selections: {
      "physical_state": { cn: "健康健美的身材", en: "Healthy athletic build" },
      "fitness_pose": { cn: "半蹲姿势，侧身对镜子", en: "Half-squat pose, turned sideways to mirror" },
      "fitness_clothing": { cn: "运动裙，紧身贴身", en: "Sports skirt, tight and form-fitting" },
      "sweat_appearance": { cn: "头发凌乱湿透，汗水明显", en: "Hair disheveled and damp with sweat" },
      "facial_expression": { cn: "脸颊泛红，眼神迷离", en: "Cheeks flushed red, dreamy and slightly unfocused eyes" },
      "fitness_location": { cn: "繁忙的健身房，镜子和器械随处可见", en: "Busy gym with mirrors and equipment visible" },
      "selfie_style": { cn: "原始真实的镜子自拍", en: "Raw, authentic mirror selfie" },
      "photo_effect": { cn: "慢快门导致的运动模糊", en: "Motion blur from slow shutter speed" },
      "ratio": { cn: "3:4竖构图", en: "3:4 vertical portrait" }
    },
    tags: ["人物", "摄影", "卡通"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_miniature_model",
    name: { cn: "微缩场景模型", en: "Miniature Scene Model" },
    content: TEMPLATE_MINIATURE_MODEL,
    imageUrl: "https://s3.bmp.ovh/imgs/2026/01/16/9dae0828037cbf5d.jpg",
    author: "@aleenaamiir",
    selections: {
      "miniature_character": { cn: "消防员", en: "Firefighter" },
      "giant_object": { cn: "燃烧的火柴棍", en: "Burning Matchstick" },
      "ratio": { cn: "16:9横构图", en: "16:9 horizontal landscape" }
    },
    tags: ["创意", "产品", "摄影"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_pop_mart_plush",
    name: { cn: "马年春节毛绒玩具", en: "Pop Mart Plush Toys" },
    content: TEMPLATE_POP_MART_PLUSH,
    imageUrl: "https://s3.bmp.ovh/imgs/2026/01/17/1e75e6702b92266c.jpg",
    author: "两斤 (@0x00_Krypt)",
    selections: {
      "plush_expression": { cn: "眨眼俏皮表情", en: "winking with playful expression" },
      "cute_accessory": { cn: "针织帽", en: "beanie hats" },
      "festive_archway": { cn: "中国传统拱门", en: "traditional Chinese archway" }
    },
    tags: ["卡通", "创意", "节日"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_3d_isometric_diorama",
    name: { cn: "3D等距透视展台", en: "3D Isometric Diorama" },
    content: TEMPLATE_3D_ISOMETRIC_DIORAMA,
    imageUrl: "https://s3.bmp.ovh/imgs/2026/01/17/214fca0da3c13139.jpg",
    author: "Aleena Amir (@aleenaamiir)",
    selections: {
      "exhibition_type": { cn: "现代艺术展览", en: "modern art exhibition" },
      "display_objects": { cn: "抽象雕塑和装置艺术", en: "abstract sculptures and installation art" },
      "pod_structure": { cn: "玻璃立方体展台", en: "glass cube pod" }
    },
    tags: ["产品", "创意","建筑"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_chinese_bridal_portrait",
    name: { cn: "中式新娘肖像", en: "Chinese Bridal Portrait" },
    content: TEMPLATE_CHINESE_BRIDAL_PORTRAIT,
    imageUrl: "https://s3.bmp.ovh/imgs/2026/01/17/fa745814a2980164.jpg",
    author: "ttmouse-豆爸 (@ttmouse)",
    selections: {
      "bridal_hair_decoration": { cn: "红色纸剪花和蝴蝶装饰", en: "red paper-cut flowers and butterflies" },
      "traditional_bridal_attire": { cn: "红色缎面旗袍", en: "red satin cheongsam" },
      "bridal_jewelry": { cn: "白色珍珠首饰和小珍珠耳环", en: "white pearl jewelry and small pearl earrings" }
    },
    tags: ["人物", "摄影", "节日"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_premium_food_advertising",
    name: { cn: "高端食品广告", en: "Premium Food Advertising" },
    content: TEMPLATE_PREMIUM_FOOD_ADVERTISING,
    imageUrl: "https://s3.bmp.ovh/imgs/2026/01/17/416c81356ded66d4.jpg",
    author: "Amira Zairi (@azed_ai)",
    selections: {
      "premium_food_subject": { cn: "手工巧克力球", en: "handcrafted chocolate truffles" },
      "ingredient_bits": { cn: "可可粉和金箔碎屑", en: "cocoa powder and gold flakes" }
    },
    tags: ["产品", "摄影"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_forbidden_city_phoenix",
    name: { cn: "紫禁城雪夜凤凰", en: "Forbidden City Snow Night Phoenix" },
    content: TEMPLATE_FORBIDDEN_CITY_PHOENIX,
    imageUrl: "https://s3.bmp.ovh/imgs/2026/01/17/3665163b0de1bf93.jpg",
    author: "Sidona (@sidona)",
    selections: {
      "imperial_palace_scene": { cn: "紫禁城雪夜，飞雪飘零", en: "Forbidden City snow night with falling snowflakes" },
      "phoenix_crown": { cn: "华丽繁复的金凤冠", en: "ornate golden phoenix crown" },
      "flowing_garment": { cn: "流动的红橙色丝绸华服", en: "flowing red-orange silk robes" },
      "festive_props": { cn: "口中叼着中式红包，手中拿着展开的春节祝福", en: "holding red envelope in mouth and unfolded spring festival blessing in hand" }
    },
    tags: ["人物", "摄影", "节日", "创意"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_interior_rendering",
    name: { cn: "室内设计真实渲染", en: "Interior Design Rendering" },
    content: TEMPLATE_INTERIOR_RENDERING,
    imageUrl: "https://s3.bmp.ovh/imgs/2026/01/18/df7ed03d64db5339.jpg",
    author: "tanshilong",
    selections: {
      "room_type": { cn: "客厅", en: "Living Room" },
      "interior_design_style": { cn: "现代轻奢风格", en: "Modern Light Luxury Style" },
      "furniture_set": { cn: "沙发、地毯、茶几、电视", en: "Sofa, rug, coffee table, TV" },
      "ceiling_material": { cn: "白色乳胶漆平顶", en: "White latex flat ceiling" },
      "wall_material": { cn: "白色乳胶漆墙面", en: "White latex paint wall" },
      "floor_material": { cn: "浅灰色大理石地砖", en: "Light gray marble tile" },
      "interior_lighting": { cn: "自然光线", en: "Natural lighting" },
      "render_quality": { cn: "4K超高清分辨率", en: "4K Ultra HD resolution" }
    },
    tags: ["建筑", "创意"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_isometric_interior_scene",
    name: { cn: "等距视角室内场景", en: "Isometric Interior Scene" },
    content: TEMPLATE_ISOMETRIC_INTERIOR_SCENE,
    imageUrl: "https://s3.bmp.ovh/imgs/2026/01/19/b04fd355944cfb21.jpg",
    author: "@tanshilong",
    selections: {
      "room_type": { cn: "客厅", en: "Living Room" },
      "room_condition": { cn: "精致装修，高档材料的质感与细节", en: "Exquisitely decorated, high-end materials with refined details" },
      "interior_design_style": { cn: "现代简约风格", en: "Modern Minimalist Style" },
      "floor_material": { cn: "浅灰色岩板地面", en: "Light gray sintered stone floor" },
      "wall_material": { cn: "暖白色墙面与装饰画", en: "Warm white walls with decorative art" }
    },
    tags: ["建筑", "创意"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_product_design_spec",
    name: { cn: "产品设计规范图", en: "Product Design Specification" },
    content: TEMPLATE_PRODUCT_DESIGN_SPEC,
    imageUrl: "https://s3.bmp.ovh/2026/01/31/FNHtuBte.jpg",
    author: "Ege (@egeberkina)",
    selections: {
      "product_category": { cn: "现代椅子", en: "Modern Chair" },
      "environment_style": { cn: "极简建筑室内", en: "Minimal Architectural Interior" },
      "lighting": { cn: "自然窗光", en: "Natural window light" },
      "drawing_style": { cn: "建筑线图风格", en: "Architectural Line Drawing Style" }
    },
    tags: ["产品", "创意", "图表"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "optional_base_image"
  },
  {
    id: "tpl_character_line_art",
    name: { cn: "人物转手绘", en: "Character Line Art" },
    content: TEMPLATE_CHARACTER_LINE_ART,
    imageUrl: "https://s3.bmp.ovh/2026/01/31/GWQUDXpd.jpg",
    author: "Vigo Zhao (@VigoCreativeAI)",
    selections: {
      "character_subject": { cn: "年轻女性，长发，微笑", en: "Young woman with long hair, smiling" },
      "portrait_view": { cn: "正面肖像", en: "Front portrait" },
      "line_art_style": { cn: "钢笔墨水风格", en: "Pen and ink style" },
      "shading_technique": { cn: "极简排线阴影", en: "Minimalist cross-hatching" },
      "background_treatment": { cn: "白色背景", en: "White background" }
    },
    tags: ["人物", "创意"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "recommend_base_image"
  },
  {
    id: "tpl_classic_game_realism",
    name: { cn: "经典游戏真实化", en: "Classic Game Realism" },
    content: TEMPLATE_CLASSIC_GAME_REALISM,
    imageUrl: "https://s3.bmp.ovh/2026/01/31/sQzIztAD.jpg",
    author: "Michael Rabone (@michaelrabone)",
    selections: {
      "classic_game": { cn: "Donkey Kong (1981 街机游戏)", en: "Donkey Kong (1981 vintage arcade game)" }
    },
    tags: ["游戏", "创意", "摄影"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "no_base_image"
  },
  {
    id: "tpl_science_paper_model",
    name: { cn: "科学发现纸雕模型", en: "Scientific Discovery Paper Model" },
    content: TEMPLATE_SCIENCE_PAPER_MODEL,
    imageUrl: "https://s3.bmp.ovh/2026/01/31/gB4NpxYw.jpg",
    author: "Gadgetify (@Gdgtify)",
    selections: {
      "scientific_discovery": { cn: "DNA结构", en: "The Structure of DNA" }
    },
    tags: ["创意", "图表", "摄影"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "no_base_image"
  },
  {
    id: "tpl_anatomy_figure_study",
    name: { cn: "解剖学人物画研究", en: "Anatomical Figure Drawing Study" },
    content: TEMPLATE_ANATOMY_FIGURE_STUDY,
    imageUrl: "https://s3.bmp.ovh/2026/02/02/rcAAVlSX.jpg",
    author: "Vigo Zhao (@VigoCreativeAI)",
    selections: {
      "anatomy_teaching_style": { cn: "Proko 风格（简化几何、教学导向、清晰构造线）", en: "Proko style (simplified geometry, educational focus, clear construction lines)" },
      "construction_line_color": { cn: "紫色/紫罗兰色（主构造线）", en: "Purple/violet sketch lines (primary construction)" }
    },
    tags: ["人物", "创意", "图表"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "recommend_base_image"
  },
  {
    id: "tpl_sketch_reality_comparison",
    name: { cn: "手绘速写与实景对比", en: "Sketch to Reality Comparison" },
    content: TEMPLATE_SKETCH_REALITY_COMPARISON,
    imageUrl: "https://s3.bmp.ovh/2026/02/06/hbxQtfml.jpg",
    author: "tanshilong",
    selections: {
      "line_art_style": { cn: "铅笔素描风格", en: "Pencil sketch style" }
    },
    tags: ["建筑", "创意", "摄影"],
    language: ["cn", "en"],
    bestModel: "Nano Banana Pro",
    baseImage: "recommend_base_image",
    source: [
      { type: "image", url: "https://s3.bmp.ovh/2026/02/08/QO5X6pga.png", label: { cn: "素材图", en: "Source Image" } }
    ]
  },
  {
    id: "tpl_tavern_fight_video",
    name: { cn: "酒馆武打戏", en: "Tavern Fight Scene" },
    type: "video",
    content: TEMPLATE_TAVERN_FIGHT_VIDEO,
    imageUrl: "https://s3.bmp.ovh/2026/02/08/5cHqPlDX.jpg",
    videoUrl: "https://img.wjwj.top/2026/02/08/936f82f68088943ba501e1929a7b861c.mp4",
    author: "YangGuang (@YangGuangAI)",
    selections: {
      "fight_style": { cn: "武侠飘逸风（轻功、剑气、衣袂飘飘）", en: "Wuxia elegant style (light kung fu, sword aura, flowing robes)" },
      "camera_rhythm": { cn: "快速切换蒙太奇（多角度快速剪辑）", en: "Rapid montage cutting (multi-angle fast edits)" }
    },
    tags: ["动作", "影视", "人物", "武侠"],
    language: ["cn", "en"],
    bestModel: "Seedance 2.0",
    baseImage: "recommend_base_image",
    source: [
      { type: "image", url: "https://s3.bmp.ovh/2026/02/08/5cHqPlDX.jpg", label: { cn: "开场素材", en: "Opening Frame" } },
      { type: "image", url: "https://s3.bmp.ovh/2026/02/08/E8NQxzMI.jpg", label: { cn: "结尾素材", en: "Ending Frame" } }
    ]
  },
  {
    id: "tpl_3x3_storyboard_video",
    name: { cn: "3x3故事板创建视频", en: "3x3 Storyboard Video Creation" },
    type: "video",
    content: TEMPLATE_3X3_STORYBOARD_VIDEO,
    videoUrl: "https://img.wjwj.top/2026/02/08/c35f4592aa1a3eb23eb3d4e72fdb02ae.mov",
    imageUrl: "https://s3.bmp.ovh/2026/02/08/mM0bxzAh.jpg",
    author: "Mr.Iancu @Iancu_ai",
    selections: {},
    tags: ["创意", "设计"],
    language: ["cn", "en"],
    bestModel: "Seedance 2.0",
    baseImage: "recommend_base_image",
    source: [
      { type: "image", url: "https://s3.bmp.ovh/2026/02/08/mM0bxzAh.jpg", label: { cn: "底图素材", en: "Base Image" } }
    ]
  },
  {
    id: "tpl_cyberpunk_vehicle_chase",
    name: { cn: "赛博朋克飞行器追逐", en: "Cyberpunk Vehicle Chase" },
    type: "video",
    content: TEMPLATE_CYBERPUNK_VEHICLE_CHASE,
    videoUrl: "https://img.wjwj.top/2026/02/08/85820eabd0f51ef1d215e5012cb2c8ff.mov",
    author: "John @johnAGI168",
    selections: {
      sci_fi_movie_style: { cn: "赛博朋克美学（Cyberpunk Aesthetics）", en: "Cyberpunk Aesthetics" },
      futuristic_vehicle: { cn: "流线型反重力飞行器（Anti-gravity Vehicle）", en: "Streamlined Anti-gravity Vehicle" },
      cyberpunk_city_scene: { cn: "未来主义超级城市峡谷（Megacity Canyon）", en: "Futuristic Megacity Canyon" },
      tracking_camera_shot: { cn: "极具纵深感的广角跟拍（Wide Angle Tracking Shot）", en: "Wide Angle Tracking Shot with Deep Depth" },
      action_camera_shot: { cn: "紧张的驾驶舱视角（Cockpit View）", en: "Tense Cockpit View" }
    },
    tags: ["科幻", "动作", "影视", "游戏"],
    language: ["cn", "en"],
    bestModel: "Seedance 2.0",
    baseImage: "no_base_image"
  },
  {
    id: "tpl_rainforest_waterfall_jet",
    name: { cn: "雨林瀑布战机穿越", en: "Rainforest Waterfall Jet" },
    type: "video",
    content: TEMPLATE_RAINFOREST_WATERFALL_JET,
    videoUrl: "https://img.wjwj.top/2026/02/08/f60dcbb9a75748c8811de024ec2b5b12.mp4",
    author: "Umesh @umesh_ai",
    selections: {
      natural_environment: { cn: "古代雨林（Ancient Rainforest）", en: "Ancient Rainforest" },
      military_aircraft: { cn: "战斗机（Fighter Jet）", en: "Fighter Jet" },
      aerial_opening_shot: { cn: "史诗超广角航拍（Epic Ultra Wide Aerial Shot）", en: "Epic Ultra Wide Aerial Shot" },
      dynamic_tracking_shot: { cn: "第三人称紧密跟拍（Third-Person Tight Tracking）", en: "Third-Person Tight Tracking" }
    },
    tags: ["动作", "影视", "自然"],
    language: ["cn", "en"],
    bestModel: "Seedance 2.0",
    baseImage: "no_base_image"
  }
];
