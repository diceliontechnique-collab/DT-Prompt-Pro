
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

// مصفوفة الأوصاف الحقيقية والمشاهد التخصصية (The Human-Action Matrix)
const ACTION_MATRICES: any = {
  'طب': [
    'طبيب يجري عملية جراحية دقيقة بمساعدة الروبوت',
    'طبيبة تفحص مريضاً في عيادة حديثة متطورة',
    'سيارة إسعاف تنطلق في شوارع نيون مستقبلية',
    'مختبر تحاليل طبية بتقنية النانو لعام 2026',
    'طبيب أسنان يعالج مريضاً باستخدام تقنية الليزر',
    'غرفة عناية مركزة مجهزة بأجهزة تنفس رقمية',
    'صيدلي يجهز وصفة دواء في صيدلية ذكية',
    'جراح قلب يراقب شاشات مراقبة العمليات الحيوية',
    'فحص أشعة رنين مغناطيسي بدقة 8K',
    'ممرضة تقدم الرعاية لمريض في جناح ملكي'
  ],
  'طفل': [
    'طفل يلعب في حديقة خضراء واسعة تحت الشمس',
    'طفلة تدرس بتركيز عالٍ أمام حاسوب شفاف',
    'أطفال يرسمون لوحة فنية عملاقة على الجدار',
    'طفل يركب دراجة هوائية في مضمار حديث',
    'طفلة تأكل وجبة صحية بابتسامة مشرقة',
    'أطفال في مدرسة مستقبلية يتعلمون بالواقع المعزز',
    'طفل نائم بسلام في غرفة نوم بتصميم سحابي',
    'طفلة تلعب مع قطة في غرفة مشمسة',
    'أطفال في رحلة تخييم يشاهدون النجوم',
    'طفل عبقري يفكك روبوتاً صغيراً بذكاء'
  ],
  'إنفوجرافيك': [
    'مخطط انسيابي لنمو شركات الذكاء الاصطناعي 2026',
    'إحصائيات استهلاك الطاقة المتجددة في العالم',
    'رسم بياني ثلاثي الأبعاد لتحليل البيانات الضخمة',
    'إنفوجرافيك تعليمي عن دورة حياة المجرات',
    'تصميم مقارنة تقنية بين الهواتف الرائدة',
    'خريطة تفاعلية لتوزيع الثروات الرقمية',
    'مخطط هيكلي لمؤسسة عالمية بأسلوب المينيماليزم',
    'رسوم بيانية طبية توضح كفاءة اللقاحات الحديثة',
    'تصميم توضيحي لرحلة العميل في المتاجر الذكية'
  ],
  'شخص في السماء': [
    'رائد فضاء يسبح بين سدم المجرات البعيدة',
    'شخص يمشي على السحاب وقت الغروب الذهبي',
    'ملاك طائر بأجنحة نورانية في سماء أسطورية',
    'مغامر يقفز بالمظلة من قمة برج نيون',
    'شخص يتأمل الكون من نافذة محطة فضائية',
    'كيان نوري يتشكل وسط السحب الرعدية',
    'شخص يطير في سماء خيالية مليئة بالجزر الطائرة'
  ],
  'تصميم 2026': [
    'هيكل معماري سائل يتفاعل مع الضوء المحيط',
    'تصميم سيارة طائرة بانسيابية فائقة لعام 2026',
    'أزياء رقمية تتغير ألوانها حسب الحالة النفسية',
    'أثاث منزلي مطبوع ثلاثي الأبعاد بتصميم عضوي',
    'واجهة مستخدم ثلاثية الأبعاد تطفو في الهواء',
    'منتج تكنولوجي بتغليف من مادة الكروم السائل',
    'ديكور داخلي يدمج الطبيعة الحية مع التكنولوجيا'
  ],
  'فلاحة': [
    'فلاح يحرث الأرض بجرار كهربائي ذاتي القيادة',
    'حصاد محاصيل القمح في سهول شاسعة وقت الفجر',
    'نظام ري ذكي يعتمد على الذكاء الاصطناعي',
    'فلاحة تعتني بشتلات الزهور في مشتل زجاجي',
    'جني ثمار الزيتون في مزارع جبلية عريقة',
    'بيوت محمية ذكية لزراعة الفواكه الاستوائية',
    'فلاح يراقب نمو المحاصيل عبر جهاز لوحي'
  ],
  'تسويق': [
    'حملة إعلانية لمنتج فاخر في شوارع طوكيو',
    'تصميم بوستر سينمائي لفيلم أكشن عالمي',
    'واجهة متجر إلكتروني جذابة بأسلوب عصري',
    'عرض تقديمي لعلامة تجارية بأسلوب النيون',
    'تصميم غلاف مجلة عالمية للأعمال والتجارة',
    'شعار احترافي يجسد القوة والابتكار'
  ]
};

// الأفعال والمواضيع العامة للأقسام غير المحددة
const GENERAL_ACTIONS = [
  'يقوم بالعمل ببراعة', 'في بيئة عمل احترافية', 'يستخدم أحدث التقنيات', 'بتصميم فريد ومبتكر',
  'في مشهد سينمائي مهيب', 'بتفاصيل بصرية مذهلة', 'بأسلوب فني معاصر', 'يجسد الإبداع والجمال',
  'في لحظة تاريخية خالدة', 'بتقنية تصوير فائقة الدقة'
];

export const NEURAL_FACTORY_ASSETS = {
  styles: [
    'Hyper-realistic 8K Cinema 4D', 'Surrealist Dreamscapes v2026', 'Professional Infographic Vector', 
    'Cinematic Street Photography', 'Minimalist UI/UX Design', 'Epic Fantasy Oil Painting', 
    'Quantum Render Engine v2', 'Abstract Expressionism 2026', 'Magical Realism Style', 
    'Advanced Blueprint Engineering', 'Cyberpunk Neon Aesthetic', 'Royal Islamic Calligraphy',
    '3D Isometric Illustration', 'Studio Ghibli Anime Aesthetic', 'Vogue Editorial Style',
    'Macro Photography Texture', 'Glassmorphism Digital Art'
  ],
  techs: [
    'Octane Render, Raytraced shadows', 'Unreal Engine 5.4, Lumen Lighting', 'Sub-atomic texture detail, f/1.4', 
    'Global Illumination, 32k resolution', 'Deep Neural Texturing v3', 'Holographic Projection mapping', 
    'Quantum Post-processing', 'Anamorphic lens flares, raw photo', 'Physically Based Rendering (PBR)',
    'Dynamic fluid simulation', 'Particle system cloud rendering'
  ],
  moods: [
    'Prestigious & Authoritative', 'Ethereal & Spiritual', 'Energetic Viral Hook', 
    'Calm Zen Serenity', 'Dramatic Suspense Noir', 'Futuristic Innovation', 
    'Joyful Childlike Wonder', 'Luxury High-end Corporate', 'Melancholic Cinematic Depth',
    'Vibrant Neon Glow', 'Sophisticated Minimalist'
  ],
  categorySpecifics: {
    'إنفوجرافيك': 'Clear data flow diagrams, futuristic UI elements, flat color palettes, corporate font styling, vector clarity',
    'شخص في السماء': 'Celestial walking, cloud textures, divine sun rays, ethereal wings, gravity-defying pose, majestic atmosphere',
    'تصميم 2026': 'Post-modern digital structures, bio-morphic shapes, iridescent liquid metal textures, quantum light refraction',
    'مواقع التواصل': 'High engagement visual, eye-catching thumbnail style, social media optimized composition, trending influencer aesthetic',
    'تسويق': 'Product-focused dramatic lighting, brand identity integration, professional commercial photography, persuasive visual story',
    'طب': 'Sterile clinical aesthetic, high-tech diagnostic HUD, molecular visualization, professional medical empathy'
  }
};

export const SEED_DATA = {
  subjects: [
    { ar: 'فني إصلاح مذربورد هواتف محترف', en: 'Professional smartphone motherboard repair, microscope soldering, electronic components', cat: 'صيانة' },
    { ar: 'خبير بيع هواتف ذكية أونلاين', en: 'E-commerce mobile seller, professional product showcase, luxury smartphone store', cat: 'تجارة' },
    { ar: 'محامي جنائي في قاعة المحكمة', en: 'Criminal defense lawyer in courtroom, prestigious judge background', cat: 'قانون' },
    { ar: 'جراح قلب في غرفة عمليات متطورة', en: 'Heart surgeon in operating room, high-tech medical equipment, blue light', cat: 'طب' },
    { ar: 'داعية إسلامي في برنامج تلفزيوني', en: 'Islamic scholar in TV studio, modern library, peaceful lighting', cat: 'محتوى' },
    { ar: 'مدير متجر إكسسوارات هواتف', en: 'Mobile accessories store manager, aesthetic display, premium branding', cat: 'تجارة' },
    { ar: 'شيف حلويات يزين كعكة فنية', en: 'Pastry chef decorating an artistic cake, gourmet kitchen, sharp focus', cat: 'فن' },
    { ar: 'فني تركيب أنظمة طاقة شمسية', en: 'Solar energy system installer on rooftop, professional gear, sunny day', cat: 'بناء' },
    { ar: 'مصمم جرافيك واجهات مستخدم', en: 'UI/UX Graphic designer, creative workspace, multiple monitors, neon blue light', cat: 'تقنية' },
    { ar: 'طبيب أسنان في عيادة مودرن', en: 'Dentist in modern clinic, high-end dental chair, medical aesthetic', cat: 'طب' }
  ],
  styles: [
    { ar: 'واقعية فوتوغرافية (Clean)', en: 'Ultra-realistic high-definition photography, sharp focus, natural textures' },
    { ar: 'واقعية سينمائية (Movie)', en: 'Cinematic film look, anamorphic lens flares, dramatic atmosphere, 35mm film grain' },
    { ar: 'ثلاثي أبعاد إعلاني (C4D)', en: 'Premium 3D render, Cinema 4D style, smooth glossy surfaces, colorful lighting' }
  ],
  backgrounds: [
    { ar: 'بدون (يدوي)', en: 'None/Manual: No specific background, follow manual subject input only' },
    { ar: 'مختبر إصلاح ميكروسكوبي للهواتف', en: 'High-tech smartphone repair lab, microscopic soldering station, precision tools' },
    { ar: 'معرض بيع هواتف ذكية Premium', en: 'Luxury smartphone showroom, minimalist glass displays, Apple-style interior' }
  ],
  moods: [
    { ar: 'بدون (يدوي)', en: 'None/Manual: No preset mood, follow manual subject input only' },
    { ar: 'جذب انتباه تسويقي (Hook)', en: 'High-energy marketing hook, vibrant colors, bold lighting' },
    { ar: 'إثارة بصرية (Viral)', en: 'Viral-ready visual impact, attention-grabbing, high contrast' }
  ],
  technicals: [
    { ar: 'بدون (يدوي)', en: 'None/Manual: No preset structure, follow manual subject input only' },
    { ar: 'رندر أوكتان احترافي (Octane)', en: 'Professional Octane Render, 8K resolution, physically based rendering (PBR), raytraced global illumination, volumetric lighting' }
  ],
  elements: [
    { ar: 'تركيز على الوجه', en: 'Extreme close-up on face, emotional detail, sharp eyes' },
    { ar: 'تكوين متماثل', en: 'Symmetrical composition, perfectly centered, balanced' }
  ]
};

export const STYLES = SEED_DATA.styles.map(s => s.ar);
export const BACKGROUNDS = SEED_DATA.backgrounds.map(b => b.ar);
export const MOODS = SEED_DATA.moods.map(m => m.ar);
export const ELEMENTS = SEED_DATA.elements.map(e => e.ar);
export const TECHNICALS = SEED_DATA.technicals.map(t => t.ar);

export const PRO_CODE_DATABASE = [
  { id: '1', title: 'هيكل تطبيق React عالمي', lang: 'JavaScript', category: 'Web', code: 'import React from "react";\nimport ReactDOM from "react-dom/client";\n\nconst App = () => (\n  <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">\n    <h1 className="text-4xl font-black neon-pulse">DT-PRO SYSTEM ONLINE</h1>\n  </div>\n);\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);', complexity: 'Pro' }
];

export const PRO_ULTRA_DB = [
    ...SEED_DATA.subjects,
    { ar: 'إنفوجرافيك ذكي (Smart Infographic)', en: 'Professional data visualization infographic, futuristic charts, flat vector art, clean professional typography, 8k business presentation', cat: 'إنفوجرافيك' },
    { ar: 'شخص في السماء (Sky Person)', en: 'Surreal cinematic shot of a person walking on clouds in the sky, celestial lighting, ethereal atmosphere, dreamlike visuals, masterpiece composition', cat: 'شخص في السماء' },
    { ar: 'تصميم فني مستقبل 2026 (Art 2026)', en: 'Hyper-futuristic abstract sculpture design trending in 2026, iridescent textures, holographic refractions, quantum render style, avant-garde digital art', cat: 'تصميم 2026' }
];

// محرك الـ مليون برومبت النوروني المطور (Neural Mapping Engine v4.0)
export const getMillionthNeuralPrompt = (id: number, category: string) => {
    const factory = NEURAL_FACTORY_ASSETS;
    const style = factory.styles[id % factory.styles.length];
    const tech = factory.techs[(id + 7) % factory.techs.length];
    const mood = factory.moods[(id + 13) % factory.moods.length];
    const spec = (factory.categorySpecifics as any)[category] || 'Professional execution with extreme attention to material detail, atmospheric depth, and perfect composition.';

    // استخراج الفعل الوصفي بناءً على القسم
    let descriptiveTitle = '';
    const actions = ACTION_MATRICES[category] || ACTION_MATRICES[category.includes('طفل') ? 'طفل' : ''] || GENERAL_ACTIONS;
    descriptiveTitle = actions[id % actions.length];

    const arTitle = `برومبت #${id} - ${descriptiveTitle}`;
    const enPrompt = `[DT_PROMPT_ENGINE_LOG: ID_${id}] 
CORE SUBJECT: Descriptive High-End execution of ${category}. 
SCENE DESCRIPTION: ${descriptiveTitle} (Translated context).
SPECIFICATION: ${spec}
ART STYLE: ${style}
TECHNICAL STACK: ${tech}
TONE: ${mood}
ENVIRONMENT: 2026 AI Architecture Optimized. Global illumination, sub-atomic textures, volumetric atmospheric depth. 32k Super Resolution Render.`;

    return { ar: arTitle, en: enPrompt, cat: category, id };
};
