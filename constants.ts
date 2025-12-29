
export const TEMPLATES = [
  { id: 'product', label: 'إعلان لمنتج', icon: '📦' },
  { id: 'real_estate', label: 'عقارات وفلل', icon: '🏠' },
  { id: 'food', label: 'مطاعم وأغذية', icon: '🍔' },
  { id: 'fashion', label: 'أزياء وموضة', icon: '👗' },
  { id: 'cars', label: 'سيارات ومحركات', icon: '🏎️' },
  { id: 'edu', label: 'منشور تعليمي', icon: '📚' },
  { id: 'story', label: 'ستوري تفاعلي', icon: '📱' },
  { id: 'crypto', label: 'عملات وتقنية', icon: '🪙' },
];

export const LANGUAGES = [
  'العربية (فصحى)', 'العربية (مغربي)', 'العربية (جزائري)', 'العربية (مصري)', 'العربية (خليجي)', 'الإنجليزية (English)', 'الفرنسية (Français)'
];

export const DESIGN_TYPES = [
  'منشور إنستقرام (1:1)', 
  'تيك توك / ريلز (9:16)', 
  'يوتيوب (16:9)', 
  'غلاف لينكد إن', 
  'إعلان فيسبوك',
  'سناب شات آرت'
];

export const ASPECT_RATIOS = ['1:1', '9:16', '16:9', '4:5', '2:3'];
export const PURPOSES = ['بيع مباشر', 'بناء براند', 'قصة سينمائية', 'دراما وتوعية', 'كوميدي ساخر'];

export const SEED_DATA = {
  subjects: [
    { ar: 'سيارة رياضية نيون', en: 'Neon sports car', cat: 'سيارات' },
    { ar: 'عطر ملكي فاخر', en: 'Luxury royal perfume', cat: 'منتجات' },
    { ar: 'بيتزا إيطالية ساخنة', en: 'Hot Italian pizza', cat: 'طعام' },
    { ar: 'فيلا مودرن زجاجية', en: 'Modern glass villa', cat: 'عقارات' },
    { ar: 'ساعة يد ذهبية', en: 'Golden wristwatch', cat: 'إكسسوارات' },
    { ar: 'قهوة اسبريسو صخرية', en: 'Espresso coffee on rocks', cat: 'مشروبات' },
    { ar: 'هاتف مستقبلي شفاف', en: 'Futuristic transparent phone', cat: 'تقنية' },
    { ar: 'حقيبة جلدية كلاسيك', en: 'Classic leather bag', cat: 'أزياء' },
    { ar: 'منتجع صحي استوائي', en: 'Tropical spa resort', cat: 'سياحة' },
    { ar: 'رائد فضاء في غابة', en: 'Astronaut in a forest', cat: 'خيال' },
    { ar: 'حذاء رياضي طائر', en: 'Floating sneakers', cat: 'أزياء' },
    { ar: 'آيس كريم ملون', en: 'Colorful ice cream', cat: 'طعام' },
    { ar: 'مكتب عمل منزلي نيون', en: 'Neon home office setup', cat: 'تقنية' },
    { ar: 'خاتم ألماس متوهج', en: 'Glowing diamond ring', cat: 'مجوهرات' },
    { ar: 'درون تصوير سينمائي', en: 'Cinematic camera drone', cat: 'تقنية' }
  ],
  styles: [
    { ar: 'واقعي فائق الدقة', en: 'Hyper-Realistic' },
    { ar: 'سايبر بانك مستقبلي', en: 'Cyberpunk 2077' },
    { ar: 'بسيط (زن هادئ)', en: 'Minimalist Zen' },
    { ar: 'فيلم كلاسيكي 35 ملم', en: 'Vintage Film 35mm' },
    { ar: 'لوحة زيتية فنية', en: 'Oil Painting Art' },
    { ar: 'أنيميشن بيكسار 3D', en: '3D Pixar Animation' },
    { ar: 'موضة (مجلة فوغ)', en: 'Vogue Editorial' },
    { ar: 'تصميم معماري هندسي', en: 'Architectural Digest' },
    { ar: 'ستيم بانك (بخاري)', en: 'Steampunk Aesthetic' },
    { ar: 'نمط سينث ويف 80s', en: 'Synthwave Style' },
    { ar: 'قوطي مظلم', en: 'Gothic Dark' },
    { ar: 'حلم خيالي أثيري', en: 'Ethereal Dreamy' },
    { ar: 'فن فيكتور مسطح', en: 'Vector Flat Art' },
    { ar: 'تعريض مزدوج فني', en: 'Double Exposure' },
    { ar: 'تصوير ماكرو دقيق', en: 'Macro Photography' },
    { ar: 'نمط منخفض المضلعات', en: 'Low Poly Art' },
    { ar: 'ألوان مائية حالمة', en: 'Watercolor Style' },
    { ar: 'بوب آرت (وارهول)', en: 'Pop Art Warhol' },
    { ar: 'فن جليتش (تشويش)', en: 'Glitch Art' }
  ],
  lighting: [
    { ar: 'إضاءة الغروب الذهبية', en: 'Golden Hour Sunset' },
    { ar: 'إضاءة استوديو ناعمة', en: 'Soft Studio Softbox' },
    { ar: 'إضاءة درامية حادة', en: 'Dramatic Rim Light' },
    { ar: 'ضباب إضاءة حجمي', en: 'Volumetric Foggy Light' },
    { ar: 'نيون ليلي متوهج', en: 'Neon Night Glow' },
    { ar: 'ضوء شمس طبيعي', en: 'Natural Sunlight Shadows' },
    { ar: 'إضاءة حيوية مشعة', en: 'Bioluminescent Light' },
    { ar: 'دفء ضوء الشموع', en: 'Candlelight Warmth' },
    { ar: 'سينمائي عالي التباين', en: 'Cinematic High Contrast' }
  ],
  backgrounds: [
    { ar: 'رخام داكن فاخر', en: 'Dark Marble Table' },
    { ar: 'مدينة حديثة مضببة', en: 'Modern Cityscape Blur' },
    { ar: 'جبال ثلجية شاهقة', en: 'Snowy Mountains' },
    { ar: 'شاطئ استوائي ساحر', en: 'Tropical Beach Palm Trees' },
    { ar: 'تدرج لوني تجريدي', en: 'Abstract Gradient Wall' },
    { ar: 'ديكور محل راقي', en: 'Luxury Boutique Interior' },
    { ar: 'سديم ومجرات فضائية', en: 'Space Nebula Galaxy' },
    { ar: 'حديقة زن يابانية', en: 'Zen Garden Surface' },
    { ar: 'شارع مدينة ممطر', en: 'Cybercity Rain Street' }
  ],
  moods: [
    { ar: 'فخامة ملكية', en: 'Luxurious Royal' },
    { ar: 'غموض وتشويق', en: 'Mysterious' },
    { ar: 'طاقة وحيوية', en: 'Energetic' },
    { ar: 'دافئ ومريح', en: 'Cozy & Warm' },
    { ar: 'نظيف واحترافي', en: 'Professional Clean' }
  ],
  elements: [
    { ar: 'موديل بشري', en: 'Human Model' },
    { ar: 'أجسام طائرة', en: 'Floating Objects' },
    { ar: 'غبار وجزيئات ضوئية', en: 'Particles & Dust' },
    { ar: 'توهج عدسة سينمائي', en: 'Lens Flare' },
    { ar: 'ضبابية حركة سريعة', en: 'Motion Blur' }
  ],
  technicals: [
    { ar: 'محرك انريل 5', en: 'Unreal Engine 5' },
    { ar: 'رندر أوكتان احترافي', en: 'Octane Render' },
    { ar: 'تتبع أشعة واقعي', en: 'Ray Tracing' },
    { ar: 'دقة 8k فائقة', en: '8k Photorealistic' },
    { ar: 'عدسة متوسطة المدى', en: 'Medium Format Lens' }
  ]
};

export const STYLES = SEED_DATA.styles.map(s => s.ar);
export const FONTS = ['خط كوفي ثقيل', 'خط ديواني فني', 'خط حديث مودرن', 'خط عريض', 'خط أنيق'];
export const PALETTES = ['ذهبي وأسود', 'نيون أزرق ووردي', 'ألوان ترابية', 'باستيل ناعم', 'ألوان حيوية'];
export const BACKGROUNDS = SEED_DATA.backgrounds.map(b => b.ar);
export const MOODS = SEED_DATA.moods.map(m => m.ar);
export const ELEMENTS = SEED_DATA.elements.map(e => e.ar);
export const TECHNICALS = SEED_DATA.technicals.map(t => t.ar);

export const VIDEO_MOTIONS = ['زوم داخلي بطيء', 'لقطة مدارية', 'درون من الأعلى', 'تحريك سريع لليسار', 'لقطة سينمائية ثابتة'];

export const PROFESSIONAL_DESCRIPTORS = [
  "unreal engine 5", "hyper-detailed", "8k", "photorealistic", "soft studio lighting",
  "volumetric fog", "depth of field", "bokeh", "anamorphic lens flare", "masterpiece",
  "highly intricate", "sharp focus", "global illumination", "subsurface scattering", "vibrant"
];

export const VIDEO_DESCRIPTORS = ["fluid motion", "highly stable", "no flicker", "realistic", "slow motion 60fps"];
