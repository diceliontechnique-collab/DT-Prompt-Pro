
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

/* NEURAL MILLION MATRIX ASSETS */
const SUBJECT_MODIFIERS = ['ملكي', 'مستقبلي', 'سينمائي', 'مجهري', 'عملاق', 'تجريدي', 'واقعي', 'كلاسيكي', 'سحري', 'رقمي'];
const ACTION_SCENES = ['في وسط عاصفة نيون', 'تحت أضواء مجرة بعيدة', 'في مختبر سري تحت الأرض', 'في قلب مدينة ضائعة', 'فوق سحاب من الكريستال'];
const QUALITY_HINTS = ['بإضاءة HDR مذهلة', 'بأنوار سينمائية', 'بدقة 32K فائقة', 'بمحرك Unreal Engine 5', 'بتفاصيل مجهرية دقيقة'];

export const ANATOMY_OPTIONS = (() => {
  const list = ["تلقائي / بدون تشريح محدد"];
  for(let i=0; i<1000; i++) {
    const isTech = i % 2 === 0;
    const p = isTech ? "تشريح هاردوير" : "تشريح طبي";
    const s = isTech ? "مكونات الكترونية" : "أنسجة حيوية";
    list.push(`${p} لـ ${s} إصدار #${i} (V40.0 PRO)`);
  }
  return list;
})();

export const VARIABLE_INSPIRATIONS: Record<string, string[]> = {
  'CENTRAL_SUBJECT': [
    'A majestic mechanical phoenix rising from digital ashes',
    'An ancient cyborg warrior in a garden of glowing lotus',
    'A hyper-detailed portrait of a celestial queen with starlight skin',
    'A futuristic lofi-styled explorer on a purple desert planet',
    'A professional architectural marvel of a floating crystal library'
  ],
  'MOOD/ATMOSPHERE': [
    'a deeply melancholic yet hopeful cyberpunk sunset',
    'a chaotic and high-energy multidimensional explosion',
    'a pristine and silent laboratory of infinite knowledge'
  ]
};

export const getMillionthNeuralPrompt = (id: number, topic: string) => {
    const safeId = Math.abs(id);
    const mod = SUBJECT_MODIFIERS[safeId % SUBJECT_MODIFIERS.length];
    const scene = ACTION_SCENES[safeId % ACTION_SCENES.length];
    const hint = QUALITY_HINTS[safeId % QUALITY_HINTS.length];
    
    const arTitle = `${mod} لـ ${topic} ${scene} ${hint} (برومبت رقم #${safeId})`;
    const fullPrompt = `[DT-PROMPT NEURAL ENGINE v40.0 | ID: ${safeId}]\n` +
      `SUBJECT: ${mod} ${topic}\n` +
      `SCENE: ${scene}\n` +
      `QUALITY: ${hint}\n` +
      `TECHNICAL: ${TECHNICALS[safeId % TECHNICALS.length]}\n` +
      `NARRATIVE: A world-class professional representation of ${topic} at scale 1,000,000.`;
      
    return { ar: arTitle, en: fullPrompt, cat: topic, id: safeId };
};

/* THE MILLION SEARCH FACTORY - SYNTHESIZING UNIQUE RESULTS */
export const PRO_ULTRA_DB = (() => {
  const items = [];
  const pro_cats = ['زواج', 'هاتف', 'تسويق', 'طب', 'تقنية', 'قانون', 'أزياء', 'فضاء', 'هندسة', 'عقارات', 'سيارات', 'طبيعة'];
  // Initial seeding for common terms
  for (let i = 1; i <= 1000; i++) {
    const cat = pro_cats[i % pro_cats.length];
    items.push({
      ar: `برومبت إبداعي لـ ${cat} - المسار المليوني #${i}`,
      en: `Professional AI prompt for ${cat}. Millionth synthesis version ${i}.`,
      cat: cat,
      id: i 
    });
  }
  return items;
})();

export const ELEMENTS = ['بدون إضافات', 'تأثيرات ضوئية نيون', 'جسيمات متطايرة', 'أشكال هندسية مقدسة'];
export const WISDOM_QUOTES = ["التقوى رأس كل خير.", "ذكر الله حياة للقلب.", "من أصلح سريرته أصلح الله علانيته."];
export const NEURAL_FACTORY_ASSETS = {
  styles: ['Hyper-realistic 8K Cinema 4D', 'Surrealist Dreamscapes'],
  humanHooks: ['An awe-inspiring scene', 'A breathtakingly detailed masterpiece'],
  perspectives: ['Extreme close-up', 'Cinematic wide-angle']
};
