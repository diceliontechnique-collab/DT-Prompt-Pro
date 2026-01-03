
export const TEMPLATES = [
  { id: 'tech', label: 'تقنية وسيرفرات', icon: '💻' },
  { id: 'law', label: 'محاماة وقانون', icon: '⚖️' },
  { id: 'religion', label: 'وعظ وإرشاد', icon: '🌙' },
  { id: 'kids', label: 'عالم الأطفال', icon: '🧸' },
  { id: 'food', label: 'طبخ ووصفات', icon: '🍳' },
  { id: 'content', label: 'صناع محتوى', icon: '🎥' },
  { id: 'corporate', label: 'شركات عالمية', icon: '🏢' },
  { id: 'cars', label: 'سيارات ومحركات', icon: '🏎️' },
];

export const AI_MODELS = [
  'Gemini 2.5 Flash (Google)',
  'Gemini 3 Pro (Google)',
  'ChatGPT-4o (OpenAI)',
  'Midjourney v6.1',
  'Leonardo AI (Pro)',
  'Adobe Firefly (Image/Video)',
  'Stable Diffusion XL',
  'DALL-E 3 (Plus)',
  'Sora (Video Engine)',
  'Runway Gen-3 Alpha',
  'Pika Labs 2.0',
  'Kling AI (Video)',
  'Luma Dream Machine',
  'Claude 3.5 Sonnet',
  'Grok-2 (xAI)',
  'Flux.1 [Pro]',
  'Ideogram 2.0',
  'Canva Magic Media',
  'Microsoft Designer',
  'Jasper AI (Ads)'
];

export const LANGUAGES = [
  'العربية', 'English', 'Español', 'Français', 'Nederlands', 'Türkçe', 'فارسی', 'Kurdî'
];

export const ASPECT_RATIOS = ['1:1', '9:16', '16:9', '4:5', '2:3'];

export const BACKGROUNDS = [
  'تلقائي / بدون سياق محدد', 'استوديو سينمائي احترافي', 'مدينة نيون مستقبلية', 'غابة استوائية كثيفة', 
  'قصر ملكي تاريخي', 'مختبر أبحاث متطور', 'فضاء خارجي عميق', 'صحراء رملية شاسعة', 
  'محيط هادئ تحت الماء', 'مكتب فخم في ناطحة سحاب', 'خلفية تجريدية ناعمة', 'بيئة صناعية مهجورة',
  'قمة جبل جليدي', 'شارع ضيق في طوكيو ليلاً', 'مقهى باريسي كلاسيكي', 'مكتبة أثرية ضخمة',
  'كوكب غريب بنباتات مضيئة', 'محطة قطار قديمة في لندن', 'سوق شعبي مزدحم', 'فيلا عصرية على ساحل إيطاليا',
  'حقل زهور برية لا متناهي', 'سفينة فضائية مهجورة', 'تحت أنقاض مدينة غارقة', 'استوديو تصوير فوتوغرافي',
  'ملهى ليلي تحت الأرض', 'معبد قديم في الغابة', 'داخل ساعة ميكانيكية ضخمة', 'مدينة تحت سحابة دائمة',
  'حديقة يابانية هادئة', 'كواليس مسرح فخم', 'مركز قيادة عسكري سري', 'منصة نفط في وسط العاصفة',
  'قرية ريفية إنجليزية', 'قاعة محكمة مهيبة', 'مستشفى مستقبلي معقم', 'داخل منجم ألماس ساطع',
  'جزيرة استوائية منعزلة', 'سطح ناطحة سحاب باردة', 'غرفة تحكم في مفاعل نووي', 'مرصد فلكي فوق السحاب',
  'كنيسة غوطية قديمة', 'داخل مخ عصبوني رقمي', 'ملعب رياضي عملاق', 'حديقة ألعاب ملاهي مهجورة',
  'ساحة معركة ملحمية', 'معرض فنون معاصر', 'قبو نبيذ تاريخي', 'داخل محرك طائرة عملاق',
  'مخبأ تحت الأرض للحماية', 'جسر ضبابي في الصباح', 'واجهة بحرية في دبي', 'مركز بيانات (Data Center)',
  'حلبة رقص ديسكو قديمة', 'ممر طويل في فندق مسكون', 'قاعدة على سطح القمر', 'داخل غواصة حربية',
  'واحة خضراء وسط رمال ذهبية', 'حانة قراصنة قديمة', 'داخل ساعة بيج بن', 'قمة برج إيفل في المطر',
  'غابة صنوبر ضبابية', 'مدينة ألعاب مائية', 'استوديو أخبار حي', 'مصنع روبوتات حديث',
  'داخل هيكل عملاق', 'فناء منزل أندلسي', 'شارع في نيويورك وقت الغروب', 'منارة وحيدة في المحيط',
  'قاعة رقص في قصر فيرساي', 'داخل حفرة بركان نشط', 'مركب شراعي قديم', 'مدينة تحت الماء (أتلانتس)',
  'سطح قطار سريع متحرك', 'كواليس عرض أزياء', 'داخل دائرة إلكترونية', 'قاعة احتفالات عائمة',
  'حديقة صخرية (Zen Garden)', 'داخل فقاعة صابون عملاقة', 'منصة إطلاق صواريخ', 'مدينة مصنوعة من الجليد',
  'داخل كتاب مفتوح', 'سجن قديم مهجور', 'غابة من الأشجار معدنية', 'سطح محطة فضاء دولية',
  'داخل قفص اتهام', 'قاعة مؤتمرات دولية', 'مخزن بضائع عملاق', 'داخل كهف كريستالي',
  'شلالات نياجرا في الليل', 'حلبة مصارعة رومانية', 'داخل ثقب دودي (Wormhole)', 'مدينة من الكرتون',
  'داخل بيانو قديم', 'سطح جبل بركاني في كوكب آخر', 'سوق توابل مغربي', 'ممر في منجم فحم',
  'داخل مصعد زجاجي سريع', 'كوكب من الألماس', 'ساحة في بلدة إيطالية قديمة', 'بيئة الواقع الافتراضي (Metaverse)'
];

export const MOODS = [
  'Prestigious, Authoritative and Royal', 'Ethereal, Spiritual and Divine', 'Energetic, Vibrant and Viral', 
  'Calm, Zen and Minimalist Serenity', 'Dramatic, Noir and Suspenseful', 'Futuristic, High-Tech and Innovative', 
  'Luxury, High-end Corporate Excellence', 'Nostalgic, Warm and Poetic', 'Heroic, Epic and Monumental'
];

export const TECHNICALS = [
  'تلقائي / بدون قالب محدد', 'Octane Render, Sub-surface scattering, physically based rendering (PBR)', 
  'Unreal Engine 5.4, Lumen lighting, Nanite geometry, cinematic post-processing', 
  'High Dynamic Range (HDR), meticulous texture detail, shallow depth of field', 
  'Volumetric atmospheric depth, god rays, 32k super-resolution, RAW photo quality', 
  'Physically accurate light bounce, anamorphic lens flares, film grain 35mm',
  'Dynamic fluid simulation, particle system cloud rendering, sharp focus stacking',
  'Ray-traced reflections, global illumination, path tracing, spectral rendering',
  'ZBrush hyper-detail, displacement mapping, vector displacement',
  'Photogrammetry scan, mega-scans texture integration, 16k atlas',
  'Advanced cell shading, hand-drawn aesthetic, high-fidelity ink outlines',
  'V-Ray production render, unbiased engine, light cache optimization',
  'Redshift GPU acceleration, motion blur, depth of field bokeh prime',
  'Cycles render engine, denoiser node, composite layering, EXR output',
  'Houdini pyro simulation, vellum constraints, procedural shattering',
  'Substance Painter procedural wear, micro-surface imperfections, grunge maps',
  'Anisotropic highlights, metallic workflow, roughness variations',
  'Subsurface scattering (SSS), human skin shader, transmissive mapping',
  'Cloth simulation, Marvelous Designer integration, micro-thread detail',
  'Hair groom simulation, XGen tech, strands rendering, physics-based wind',
  'Point cloud visualization, LiDAR precision, data-driven aesthetics',
  'Glitch art processing, digital artifacting, datamoshing simulation',
  'Infrared photography simulation, thermal color mapping, heat signature',
  'Long exposure, motion trails, light painting, star-burst effect',
  'Macro lens focus, 100mm f/2.8 detail, microscopic surface capture',
  'Split-toning, cross-processing, film stock emulation (Kodak/Fuji)',
  'Achromatic minimalism, high contrast black and white, silver halide grain',
  'Cyberpunk aesthetic, neon saturation, rain-slicked surfaces',
  'Steam-punk mechanical detail, copper brass patina, gear-driven logic',
  'Biomechanical architecture, HR Giger inspired textures, organic-metal hybrid',
  'Retrofuturism, 1950s sci-fi aesthetic, mid-century modern curves',
  'Low-poly art, isometric projection, faceted shading, vibrant palette',
  'Voxel-based environment, digital brick geometry, sandbox aesthetic',
  'Watercolor wash effect, pigment dispersion, paper texture simulation',
  'Oil painting Impasto technique, thick brush strokes, canvas weave',
  'Gothic cathedral lighting, stained glass refraction, dust motes',
  'Cybernetic neural networks, glowing fiber optics, data stream lines',
  'Interdimensional fracture, space-time warping, gravity distortion',
  'Micro-electronics macro, circuit board traces, glowing resistors',
  'Nebula gas cloud rendering, cosmic dust, stellar nursery lighting',
  'Quantum field visualization, particle-wave duality, subatomic paths',
  'DNA helix structure, microscopic biological render, glowing enzymes',
  'Crystal lattice refraction, caustics, internal reflections',
  'Liquid metal fluidity, mercury surface, high reflectivity',
  'Magma and volcanic ash, heat haze, glowing embers, smoke simulation',
  'Underwater bioluminescence, caustic light rays, floating plankton',
  'Snow and frost shaders, subsurface ice scattering, glittering flakes',
  'Desert sand dunes, ripple patterns, heat distortion, golden hour',
  'Jungle density, sunlight filtering (Komorebi), leaf transparency',
  'Urban industrial decay, rusted iron, cracked concrete, moss growth',
  'Ancient stone carving, weathered marble, ancient script engravings',
  'Baroque gold gilding, ornate carvings, velvet shadows',
  'Bauhaus geometric functionalism, primary color accents',
  'Art Deco luxury, gold leaf inlays, streamlined chrome',
  'Minimalist Scandinavian design, natural wood grain, soft lighting',
  'Brutalist concrete geometry, massive scale, shadow play',
  'Surrealist liquid clocks, melting geometry, impossible perspective',
  'Cubist multi-perspective, fragmented forms, non-linear space',
  'Pop art halftone dots, bold outlines, vibrant flat colors',
  'Street art graffiti, spray paint drips, concrete texture',
  'Vector line art, clean strokes, professional logo aesthetic',
  'ASCII art simulation, digital code rain, terminal font rendering',
  'Thermographic heat map, rainbow gradients, temperature scale',
  'X-ray transparency, skeletal visibility, inner mechanism view',
  'Holographic scanline, flickering projection, blue tint glow',
  'Blueprint drafting style, technical annotations, white lines on blue',
  'Pencil sketch cross-hatching, graphite texture, smudged edges',
  'Charcoal drawing, deep blacks, dusty texture, expressive strokes',
  'Ukiyo-e woodblock print style, flat planes of color, bold lines',
  'Stained glass mosaic, lead lines, prismatic color diffusion',
  'Tapestry weave, textile texture, historical woven narrative',
  'Ancient papyrus scroll, weathered edges, ink bleed',
  'Cuneiform clay tablet, pressed wedge marks, ancient lighting',
  'Cave painting style, ochre pigments, primitive handprints',
  'Fresco plaster wall painting, muted tones, matte finish',
  'Terracotta clay sculpture, hand-molded marks, earthy tones',
  'Origami folded paper, sharp creases, paper weight texture',
  'Quilling paper art, coiled strips, intricate paper scrolls',
  'Glass blowing art, fluid glass forms, trapped bubbles',
  'Ice sculpture, translucent carving, melting droplets',
  'Sand sculpture, granular texture, fragile coastal lighting',
  'Lego brick construction, plastic material, modular geometry',
  'Etch-a-sketch line art, continuous silver line, red frame',
  'Spirograph mathematical curves, repetitive geometric patterns',
  'Kaleidoscope symmetry, mirrored fractals, prismatic explosion',
  'Shadow puppet theater, silhouetted forms, backlight screen',
  'Stained wood inlay (Marquetry), contrasting wood grains',
  'Intaglio printmaking, fine engraved lines, ink plate pressure',
  'Lithographic stone print, subtle texture, classic illustration',
  'Screen printing, ink layering, slightly offset registration',
  'Cyanotype sun print, deep Prussian blue, white silhouettes',
  'Daguerreotype metallic sheen, antique portrait lighting',
  'Polaroid instant film, chemical borders, faded vintage tones',
  'Disposable camera flash, high contrast, red-eye effect',
  'Fisheye lens distortion, 180-degree view, spherical warp',
  'Tilt-shift miniature effect, selective blur, toy-like scale',
  'Double exposure, overlapping narratives, ghostly transparency',
  'Infrared color swap, pink foliage, black sky, surreal light',
  'Light field photography, refocusable depth, plenoptic data',
  'Hyperspectral imaging, non-visible light data, scientific aesthetic',
  'Satellite view imagery, top-down perspective, high altitude detail'
];

const BASE_ANATOMY = [
  "تشريح قلب الإنسان (مقطع عرضي)", "الجهاز الهضمي للبقرة (تفكيكي)", "هيكل عظمي لطائر الجارح", "تشريح عين السمكة",
  "الجهاز العصبي للقط", "دماغ الإنسان (مناطق وظيفية)", "تشريح جلد الإنسان", "هيكل الحوت الأزرق", "محرك V8 انفجاري",
  "ناقل الحركة الأوتوماتيكي", "مبنى سكني (هيكل خرساني)", "iPhone 16 Pro Max (تفكيكي)", "ثلاجة سامسونج (دورة التبريد)",
  "شاشة OLED (طبقات)", "كاميرا DSLR (عدسات)", "صاروخ Falcon 9", "بدلة رائد فضاء", "جزيء الإنسولين", "بيانو (أوتار)",
  "ساعة ميكانيكية (تروس)", "طائرة بدون طيار (مكونات)", "روبوت صناعي", "محرك بحث جوجل (بنية منطقية)"
];

const CATS = ["طبي", "ميكانيكي", "إلكتروني", "فضائي", "معماري", "طبيعي", "جزيئي", "فني", "يومي"];
const MODS = ["تفكيكي انفجاري", "مقطع عرضي دقيق", "طبقات شفافة", "هيكل داخلي", "مخطط هندسي", "تحليل نانوي"];

export const ANATOMY_OPTIONS = (() => {
  const list = ["تلقائي / بدون تشريح محدد"];
  list.push(...BASE_ANATOMY);
  for(let i=0; i<950; i++) {
    const cat = CATS[i % CATS.length];
    const mod = MODS[i % MODS.length];
    list.push(`تشريح ${cat} متقدم: ${mod} رقم #${100+i} (By Dicelion-Technique)`);
  }
  return list.slice(0, 1000);
})();

export const VARIABLE_INSPIRATIONS: Record<string, string[]> = {
  'CENTRAL SUBJECT': [
    'A majestic mechanical phoenix rising from digital ashes',
    'An ancient cyborg warrior in a garden of glowing lotus',
    'A hyper-detailed portrait of a celestial queen with starlight skin',
    'A futuristic lofi-styled explorer on a purple desert planet',
    'A professional architectural marvel of a floating crystal library'
  ],
  'SECONDARY ELEMENT/MATERIAL': [
    'flowing liquid iridium and bioluminescent coral',
    'fractured obsidian and threads of pure solar energy',
    'translucent holographic silk and floating data nodes',
    'ancient weathered marble fused with advanced nanotechnology',
    'shimmering particles of stardust and ethereal smoke'
  ],
  'MOOD/ATMOSPHERE': [
    'a deeply melancholic yet hopeful cyberpunk sunset',
    'a chaotic and high-energy multidimensional explosion',
    'a pristine and silent laboratory of infinite knowledge',
    'a mystical and fog-drenched ancient forgotten temple',
    'a luxurious and prestigious royal court of the future'
  ],
  'SPECIFIC ART STYLE': [
    'Surrealist Dali-inspired clockwork mechanisms',
    'Cinematic film noir with high-contrast chiaroscuro',
    'Studio Ghibli aesthetic with ultra-fine digital detail',
    'Vibrant synthwave neon saturation and 80s aesthetics',
    'Minimalist Bauhaus architecture with bold primary accents'
  ],
  'TEXTURE DETAILS': [
    'microscopic etching on carbon-fiber plates',
    'velvety iridescent surface of a butterfly wing',
    'the gritty and rusted iron of an old steam-engine',
    'smooth and reflective liquid mercury ripples',
    'the intricate patterns of a neural network circuit board'
  ],
  'LIGHTING CONDITIONS': [
    'golden hour sunlight filtering through Komorebi leaves',
    'harsh blue bioluminescent glow from an unknown source',
    'dramatic rim lighting with deep cinematic shadows',
    'ethereal volumetric rays from a shattered crystal roof',
    'soft and warm candlelight in a dark majestic hall'
  ],
  'SCENERY/SETTING': [
    'a floating island above a sea of neon clouds',
    'the interior of a quantum-driven space station',
    'a hidden grotto inside a hollowed-out asteroid',
    'a street in neo-Tokyo during a perpetual rainstorm',
    'an infinite desert of white sand and black sun'
  ],
  'ATMOSPHERIC EFFECTS': [
    'swirling embers and drifting cosmic dust',
    'heavy volumetric fog and glowing particles',
    'electrical storm arcs and static distortions',
    'soft cherry blossom petals caught in a breeze',
    'raining data streams and digital glitches'
  ],
  'TECHNICAL SPECIFICATIONS/ENGINE': [
    'Unreal Engine 5.4 Nanite and Lumen technology',
    'Octane Render with sub-surface scattering (SSS)',
    'Phase One XF IQ4 medium format 150MP precision',
    'Ray-traced path tracing with infinite bounce lighting',
    'Fujifilm 400H color science and organic film grain'
  ],
  'CENTRAL_SUBJECT': [
    'A majestic mechanical phoenix rising from digital ashes',
    'An ancient cyborg warrior in a garden of glowing lotus',
    'A hyper-detailed portrait of a celestial queen with starlight skin',
    'A futuristic lofi-styled explorer on a purple desert planet',
    'A professional architectural marvel of a floating crystal library'
  ]
};

export const NEURAL_FACTORY_ASSETS = {
  styles: [
    'Hyper-realistic 8K Cinema 4D with ray-traced global illumination', 
    'Surrealist Dreamscapes v2026 - Masterpiece digital art', 
    'Professional Infographic Vector - Clean corporate minimalism', 
    'Cinematic Street Photography - Leica M11, 35mm f/1.4 aesthetic', 
    'Advanced Neural Render - Quantum light refraction, ethereal glow', 
    'Epic Fantasy Oil Painting - Rembrandt lighting, rich textures', 
    'Concept Art Masterpiece - High-end environmental storytelling',
    '3D Isometric Illustration - Vibrant gradient shading, studio light',
    'Vogue Editorial Fashion Style - Dramatic high contrast, sharp focus'
  ],
  humanHooks: [
    'An awe-inspiring scene capturing the essence of',
    'A breathtakingly detailed masterpiece showcasing',
    'A high-end cinematic narrative of',
    'A prestigious visual representation of',
    'An artistic exploration into the world of'
  ],
  perspectives: [
    'Extreme close-up shot focusing on the soul of the subject',
    'Cinematic wide-angle aerial drone POV, epic scale environment',
    'Professional eye-level portrait, 85mm prime lens compression',
    'Dynamic low-angle "Hero" perspective, making the subject look monumental',
    'Architectural orthographic view, clean lines and perfect symmetry'
  ]
};

const ACTION_MATRICES: any = {
  'زواج': ['حفل زفاف ملكي فخم', 'أناقة العروس', 'هيبة العريس'],
  'هاتف': ['هاتف مستقبلي شفاف', 'تصميم أيقوني', 'تكنولوجيا الغد'],
  'طب': ['جراح الواقع المعزز', 'أيقونة الرعاية', 'معجزة العلم']
};

export const getMillionthNeuralPrompt = (id: number, topic: string) => {
    const f = NEURAL_FACTORY_ASSETS;
    const safeId = Math.abs(id);
    const style = f.styles[safeId % f.styles.length];
    const tech = TECHNICALS[(safeId + 7) % TECHNICALS.length];
    const mood = MOODS[(safeId + 13) % MOODS.length];
    const hook = f.humanHooks[safeId % f.humanHooks.length];
    const view = f.perspectives[(safeId + 3) % f.perspectives.length];
    
    const arTitle = `إبداع هندسي وفني يجسد عالم ${topic} (برومبت رقم #${id})`;
    const fullPrompt = `[DT-PROMPT NEURAL ENGINE v31.0 | ID: ${id}]\n` +
      `SUBJECT: ${topic}\n` +
      `STYLE: ${style}\n` +
      `TECHNICAL: ${tech}\n` +
      `MOOD: ${mood}\n` +
      `HOOK: ${hook} ${topic}\n` +
      `VIEW: ${view}\n` +
      `NARRATIVE: A world-class professional representation of ${topic} with cinematic depth.`;
      
    return { ar: arTitle, en: fullPrompt, cat: topic, id };
};

export const PRO_ULTRA_DB = (() => {
  const items = [];
  const pro_cats = ['زواج', 'هاتف', 'تسويق', 'طب', 'تقنية', 'قانون', 'أزياء', 'فضاء', 'هندسة'];
  for (let i = 1; i <= 500; i++) {
    const cat = pro_cats[i % pro_cats.length];
    items.push({
      ar: `برومبت تخصصي في ${cat} - الإصدار 31.0`,
      en: `Professional AI prompt for ${cat}. Detailed textures and masterpiece lighting.`,
      cat: cat,
      id: i 
    });
  }
  return items;
})();

export const ELEMENTS = [
  'بدون إضافات', 'تأثيرات ضوئية نيون', 'جسيمات متطايرة', 'أشكال هندسية مقدسة', 'عناصر طبيعية ونباتات', 'ضباب وجو غامض',
  'برق وكهرباء زرقاء', 'سحب ركامية مهيبة', 'انعكاسات مائية', 'جزيئات غبار ذهبية', 'خطوط بيانات رقمية', 'شرارات نارية متطايرة',
  'بتلات زهور تتساقط', 'أوراق شجر خريفية', 'بلورات ثلج متجمدة', 'فقاعات هواء تحت الماء', 'تموجات مغناطيسية', 'خيوط ليزر دقيقة',
  'أدخنة ملونة متداخلة', 'نجوم وشهب في السماء', 'أحجار كريمة عائمة', 'سائل معدني منصهر', 'خيوط عنكبوت بقطرات ندى', 'ريش طيور ملون',
  'أجنحة شفافة براقة', 'دوائر سحرية مضيئة', 'برديات قديمة عائمة', 'عملات ذهبية متناثرة', 'جذور شجر متشعبة', 'أزهار فسفورية',
  'غبار كوني متوهج', 'رماد بركاني يتساقط', 'موجات صوتية مرئية', 'شيفرات برمجية عائمة', 'أيقونات تكنولوجية مصغرة', 'تروس ميكانيكية معقدة',
  'ساعات رملية عائمة', 'خرائط قديمة متمزقة', 'بوصلات ذهبية', 'مفاتيح أثرية صدئة', 'حقائب سفر كلاسيكية', 'كتب قديمة مفتوحة',
  'ريش كتابة وحبر سائل', 'شواهد قبور مهجورة', 'تماثيل رخامية محطمة', 'أعمدة كلاسيكية مهدمة', 'بقايا سفن فضائية', 'روبوتات صغيرة فضولية',
  'طائرات ورقية ملونة', 'بالونات هواء ساخن', 'سفن شراعية في الأفق', 'منارات بحرية ساطعة', 'قلاع في السحاب', 'جسور معلقة مهيبة',
  'شلالات مياه منحدرة', 'براكين نشطة هادئة', 'أقمار متعددة في السماء', 'ثقوب سوداء غامضة', 'بوابات زمنية دائرية', 'دوامات طاقة أرجوانية',
  'ألياف بصرية متوهجة', 'مكعبات زجاجية عاكسة', 'أهرامات طاقة زرقاء', 'عناصر كيميائية عائمة', 'جزيئات الحمض الآن أي (DNA)', 'خلايا عصبية متصلة',
  'أدمغة اصطناعية مضيئة', 'قلوب ميكانيكية نابضة', 'عيون إلكترونية تراقب', 'أطراف صناعية متطورة', 'رقاقات إلكترونية دقيقة', 'أقراص ليزر عاكسة',
  'أشرطة سينمائية قديمة', 'صور بولارويد معلقة', 'آلات كاتبة كلاسيكية', 'هواتف قرصية قديمة', 'أسطوانات موسيقى عائمة', 'آلات موسيقية ذهبية',
  'أقنعة مسرحية درامية', 'ريش نعام فخم', 'أقمشة حريرية طائرة', 'ستائر مخملية حمراء', 'سجاد شرقي معقد', 'فوانيس زيتية مشتعلة',
  'شموع تذوب ببطء', 'بخور ودخان متصاعد', 'أواني فخارية مزخرفة', 'سيوف وخناجر مرصعة', 'دروع فرسان لامعة', 'خوذات مقاتلين قدامى',
  'نبال وسهام متطايرة', 'دروع طاقة شفافة', 'رصاصات في حركة بطيئة', 'انفجارات لونية (Holi)', 'بقع حبر تجريدية', 'دهانات زيتية سائلة',
  'منحوتات جليدية حادة', 'تكوينات صخرية غريبة', 'كهوف مليئة بالكريستال', 'نباتات مفترسة خيالية'
];

export const WISDOM_QUOTES = [
  "التقوى رأس كل خير.", "ذكر الله حياة للقلب.", "الغفلة موت بطيء.", "الاستغفار يمحو آثار الذنوب.", "التوبة الصادقة لا تؤجَّل.",
  "من ضيّع وقته خسر عمره.", "الدنيا دار ابتلاء لا بقاء.", "الآخرة دار جزاء لا عمل.", "القرآن نور لا يخبو.", "هجر القرآن ظلمة للقلب.",
  "السنة سفينة النجاة.", "الصلاة عماد الدين.", "من أصلح سريرته أصلح الله علانيته.", "الذكر حصن من الشيطان.", "الذنوب تقسي القلوب.",
  "الطاعة تشرح الصدور.", "الموت أقرب مما نتصور.", "القبر أول منازل الآخرة.", "طول الأمل يفسد العمل.", "صحبة الصالحين نعمة.",
  "صحبة السوء نقمة.", "بر الوالدين باب من أبواب الجنة.", "العقوق سبب لمحق البركة.", "الغيبة تأكل الحسنات.", "النميمة تفسد القلوب.",
  "الصدق طريق النجاة.", "الكذب بداية السقوط.", "الإخلاص سر القبول.", "الرياء يهدم العمل.", "الدعاء عبادة عظيمة.",
  "القناعة غنى لا يفنى.", "الطمع فقر دائم.", "الصبر مفتاح الفرج.", "الشكر سبب للزيادة.", "الذكر القليل الدائم خير من الكثير المنقطع.",
  "المعصية ظلمة في القلب.", "الطاعة نور في الوجه.", "من راقب الله نجا.", "من نسي الحساب أساء العمل.", "حسن الخلق أثقل الميزان.",
  "التواضع يرفع القدر.", "الكبر سبب الهلاك.", "القلب السليم رأس المال.", "المال بلا تقوى فتنة.", "العلم بلا عمل حجة على صاحبه.",
  "العمل بلا نية هباء.", "الاستقامة أعظم كرامة.", "الثبات نعمة عظيمة.", "الفتن تمتحن القلوب.", "السلامة في لزوم السنة.",
  "ذكر الموت يزهد في الدنيا.", "حب الدنيا أصل كل خطيئة.", "الزهد راحة للقلب.", "الغفلة أول طريق الخسارة.", "التفريط في الصلاة خذلان.",
  "المحافة على الصلاة نجاة.", "قيام الليل شرف المؤمن.", "الصدقة تطفئ الخطيئة.", "البخل يمحق الرزق.", "التوبة تمحو ما قبلها.",
  "من لازم الاستغفار فُرج عنه.", "الذكر جلاء للقلوب.", "القرآن شفاء ورحمة.", "من تدبر القرآن اهتدى.", "العمل الصالح زاد الآخرة.",
  "النية الصالحة تبارك العمل.", "من خاف الله أمّنه.", "من اتقى الله كفاه.", "القلب الفارغ يملؤه الباطل.", "كثرة الذنوب تحجب التوفيق.",
  "التوفيق من الله وحده.", "من صدق مع الله صدقه الله.", "مجالس الذكر حياة.", "مجالس الغفلة هلاك.", "الصالحون زينة الدنيا.",
  "ذكر الله يطرد الهم.", "الغيبة تفسد الصيام.", "حفظ اللسان نجاة.", "كثرة الكلام قلة وقار.", "الصمت حكمة.",
  "التقوى سبب الفلاح.", "الاستقامة دليل الصدق.", "الذكر بعد الذنب توبة.", "الإصرار على الذنب هلاك.", "القلب إذا صلح صلح الجسد.",
  "فساد القلب أصل كل فساد.", "الدعاء سلاح المؤمن.", "ترك الدعاء حرمان.", "الإيمان يزيد بالطاعة.", "الإيمان ينقص بالمعصية.",
  "من عرف الله أحبه.", "محبة الله غاية الغايات.", "الإخلاص أثمن من العمل الكثير.", "العمل القليل مع صدق خير من الكثير بلا إخلاص.", "الاستغفار راحة للنفس.",
  "الذكر أنس للوحدة.", "القبر إما روضة أو حفرة.", "الحساب حق لا مفر منه.", "الجنة سلعة غالية.", "النار عذاب مقيم.",
  "الوقت هو الحياة.", "من ضيّع وقته ضيّع نفسه.", "الطاعة تحتاج صبرًا.", "المعصية تحتاج ندمًا.", "العبد بين نعمة وابتلاء.",
  "الشكر يحفظ النعم.", "المعصية تزيل النعم.", "الذكر نور في الطريق.", "الغفلة ظلمة في المسير.", "من لازم باب الله فُتح له.",
  "من طرق باب الخلق خُذل.", "الرضا كنز لا يفنى.", "السخط شقاء دائم.", "التفكر عبادة.", "قلة التفكر قسوة.",
  "الدنيا قصيرة مهما طالت.", "الآخرة باقية لا تزول.", "العمل للآخرة فوز.", "الانشغال بالدنيا خسارة.", "الإحسان أعلى مراتب الدين.",
  "مراقبة الله أصل الإحسان.", "من استحضر الموت جدّ في العمل.", "نسيان الموت غفلة.", "القلب إذا صلح صلح الجسد.", "الثبات هبة من الله.",
  "الفتن تميز الصادق.", "الصادق لا يضرّه البلاء.", "الصبر عند الصدمة الأولى.", "الجزع لا يرد قضاء.", "التسليم راحة للقلب.",
  "العمل الصالح نور في القبر.", "المعصية وحشة في القبر.", "من عاش على شيء مات عليه.", "من مات على شيء بُعث عليه.", "التوبة قبل الغرغرة.",
  "العمل قبل الفوات.", "لا تغتر بالصحة.", "لا تأمن طول العمر.", "التقوى وصية الله للأولين والآخرين.", "الذكر خير ما تعمر به الأوقات.",
  "الغفلة أسوأ ما تقتل به الساعات.", "من حفظ حدوده حفظه الله.", "التعدي سبب الهلاك.", "الصلاة نور ونجاة.", "ترك الصلاة خسارة عظيمة.",
  "القرآن ربيع القلوب.", "السنة ميزان الأعمال.", "العمل بالسنة أمان.", "البدعة ضلال.", "النجاة في الاتباع.",
  "القلب إذا تعلق بالله استراح.", "التعلق بالدنيا تعب.", "الإيمان أمان.", "المعصية خوف وقلق.", "حسن الظن بالله عبادة.",
  "سوء الظن بالله خطيئة.", "الذكر بعد الطاعة شكر.", "الذكر بعد الذنب توبة.", "من لازم التقوى سعد.", "من أعرض عنها شقي.",
  "العبد ضعيف بلا ربه.", "القوة في الاعتماد على الله.", "الذكر حياة في الحياة.", "الغفلة موت في الحياة.", "العلم يهدي للعمل.",
  "العمل يصدق العلم.", "من عمل بما علم أورثه الله علمًا.", "الإخلاص يبارك القليل.", "الرياء يفسد الكثير.", "الصدقة برهان الإيمان.",
  "الشح علامة ضعف اليقين.", "المعروف لا يضيع.", "الإحسان يعود على صاحبه.", "من زرع خيرًا حصد خيرًا.", "من زرع شرًا ندم.",
  "الذكر جليس صالح.", "الغفلة جليس سوء.", "العبد فقير إلى ربه دائمًا.", "الغنى الحقيقي غنى القلب.", "من رضي بالله كفاه.",
  "من طلب رضا الناس سخط.", "النجاة في صدق التوحيد.", "الشرك أعظم الظلم.", "التوحيد أصل النجاة.", "التقوى خير لباس.",
  "الذكر خير زاد.", "الطاعة حياة.", "المعصية سم قاتل.", "من جد وجد.", "من صدق نجا.",
  "لا خير في قلب بلا ذكر.", "ولا في عمل بلا إخلاص.", "الاستقامة أثمن من الكرامة.", "الفتنة تفضح القلوب.", "العبد بين خوف ورجاء.",
  "الخوف يمنع المعصية.", "الرجاء يحفز الطاعة.", "الاعتدال طريق النجاة.", "الغلو سبب الهلاك.", "خير ما تختم به يومك ذكر الله."
];
