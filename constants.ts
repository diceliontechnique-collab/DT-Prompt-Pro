
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
    { ar: 'معرض بيع هواتف ذكية Premium', en: 'Luxury smartphone showroom, minimalist glass displays, Apple-style interior' },
    { ar: 'مكتب محاماة ملكي فاخر', en: 'Royal luxury law office, mahogany furniture, legal library, soft golden lighting' },
    { ar: 'غرفة تحكم نيون مستقبلية', en: 'Futuristic neon control room, holographic displays, dark sleek aesthetic' },
    { ar: 'مدينة طوكيو في المطر ليلاً', en: 'Tokyo city street, rain reflections, neon signs, cinematic atmosphere' },
    { ar: 'منزل ريفي هادئ وقت الغروب', en: 'Peaceful countryside cottage, sunset lighting, warm orange glow' },
    { ar: 'قاعة مؤتمرات ذكاء اصطناعي', en: 'AI conference hall, massive LED screens, professional tech audience' },
    { ar: 'مختبر كيمياء حيوية سري', en: 'Secret biochemistry lab, blue liquid containers, high-tech sensors' },
    { ar: 'شاطئ جزر المالديف بمياه فيروزية', en: 'Maldives beach, turquoise water, white sand, bright tropical sun' },
    { ar: 'قصر تاريخي بلمسة كلاسيكية', en: 'Historical palace, classic architecture, marble floors, majestic pillars' },
    { ar: 'محطة فضاء تدور حول الأرض', en: 'Space station orbiting Earth, view from window, zero gravity vibe' },
    { ar: 'متجر عطور فرنسي فاخر', en: 'Luxury French perfume store, glass bottles, elegant interior lighting' },
    { ar: 'غابة استوائية بضباب خفيف', en: 'Tropical rainforest, light fog, sun rays piercing through trees' },
    { ar: 'مركز بيانات عملاق (Data Center)', en: 'Huge data center, server racks, blinking blue lights, cold atmosphere' },
    { ar: 'منصة عرض أزياء عالمية', en: 'Global fashion runway, dramatic spotlights, professional photography' },
    { ar: 'ساحة قتال أسطورية (الساموراي)', en: 'Legendary samurai battlefield, falling cherry blossoms, dramatic sky' },
    { ar: 'مطبخ شيف نجمة ميشلان', en: 'Michelin star chef kitchen, stainless steel, high-end culinary tools' },
    { ar: 'غرفة نوم سحابية خيالية', en: 'Dreamy cloud bedroom, soft textures, magical sparkles, pastel colors' },
    { ar: 'مرآب سيارات رياضية فاخرة', en: 'Luxury sports car garage, polished floor, rim lighting on cars' },
    { ar: 'مكتبة وطنية عريقة', en: 'Ancient national library, high ceilings, thousands of old books' },
    { ar: 'قمة جبال الهيمالايا المغطاة بالثلوج', en: 'Snowy Himalayan mountain peak, sharp blue sky, freezing wind effect' },
    { ar: 'مطار مستقبلي لعام 2050', en: 'Futuristic airport 2050, flying drones, transparent architecture' },
    { ar: 'ملعب كرة قدم مكتظ بالجماهير', en: 'Football stadium, cheering crowd, intense floodlights, HDR' },
    { ar: 'واحة في قلب الصحراء الكبرى', en: 'Sahara desert oasis, palm trees, clear water spring, burning sun' },
    { ar: 'متحف فنون حديثة (Minimalist)', en: 'Modern art museum, minimalist white walls, abstract sculptures' },
    { ar: 'موقع بناء ناطحة سحاب نيون', en: 'Neon skyscraper construction site, industrial futuristic vibe' },
    { ar: 'مقهى باريسي في الصباح الباكر', en: 'Early morning Parisian cafe, cobblestone street, soft sunlight' },
    { ar: 'عالم موازي تحت الماء', en: 'Parallel underwater world, bioluminescent creatures, ancient ruins' },
    { ar: 'مختبر روبوتات جراحية', en: 'Surgical robotics lab, robotic arms, sterile environment' },
    { ar: 'حديقة يابانية ببركة كوي', en: 'Japanese garden, koi pond, zen stone lanterns, peaceful' },
    { ar: 'مركز شرطة استخباراتي متطور', en: 'Intelligence police hub, digital map screens, intense blue glow' },
    { ar: 'منجم ذهب في كوكب آخر', en: 'Gold mine on another planet, alien structures, red atmosphere' },
    { ar: 'قبو نبيذ تاريخي معتق', en: 'Ancient wine cellar, wooden barrels, dim candle lighting' },
    { ar: 'محل بيع أجهزة ألعاب (Gaming)', en: 'Gaming store, RGB lighting, latest consoles, e-sports vibe' },
    { ar: 'استوديو تصوير سينمائي احترافي', en: 'Professional movie studio, green screen background, massive cameras' },
    { ar: 'غرفة نوم أطفال بطابع الفضاء', en: 'Space themed kids bedroom, star projector, rocket bed' },
    { ar: 'منصة نفط في بحر هائج', en: 'Oil rig in stormy sea, giant waves, industrial lighting' },
    { ar: 'قلعة من العصور الوسطى', en: 'Medieval castle, stone walls, torch light, epic atmosphere' },
    { ar: 'محل حلاقة رجالي كلاسيكي', en: 'Classic barbershop, leather chairs, vintage mirrors, sharp focus' },
    { ar: 'غرفة انتظار في فندق 7 نجوم', en: '7-star hotel lobby, crystal chandeliers, gold accents' },
    { ar: 'صحراء ثلجية في القطب الشمالي', en: 'Arctic snowy desert, aurora borealis in sky, freezing blue tint' },
    { ar: 'مكتب مدير تنفيذي لشركة تقنية', en: 'Tech CEO office, glass desk, city skyline view' },
    { ar: 'غرفة عمليات تداول (Trading)', en: 'Trading floor, multi-monitor setup, stock market charts' },
    { ar: 'مختبر أبحاث وراثية', en: 'Genetic research lab, DNA holographic models, scientists' },
    { ar: 'منصة إطلاق صواريخ سبيس إكس', en: 'SpaceX rocket launchpad, sunset, massive structure' },
    { ar: 'مقهى إلكتروني (Cyber Cafe)', en: 'Cyber cafe, neon tubes, futuristic computers, dark' },
    { ar: 'حديقة زهور هولندية شاسعة', en: 'Dutch tulip field, windmills, vibrant colors, clear day' },
    { ar: 'ممر مستشفى مظلم (Horror)', en: 'Dark hospital corridor, flickering lights, cinematic horror' },
    { ar: 'مخيم في غابة تحت النجوم', en: 'Forest camp, bonfire, Milky Way galaxy in sky' },
    { ar: 'موقع أثري فرعوني (الأهرامات)', en: 'Ancient Egyptian site, Pyramids, golden hour lighting' },
    { ar: 'مكتبة رقمية (Virtual Reality)', en: 'Digital library in VR, floating data particles, futuristic' },
    { ar: 'منصة مراقبة جوية', en: 'Air traffic control tower, radar screens, night view' },
    { ar: 'متجر مجوهرات الماس فاخر', en: 'Luxury diamond store, sparkling gems, elegant display' },
    { ar: 'مختبر فيزياء الجسيمات (CERN)', en: 'Particle physics lab, massive accelerators, industrial tech' },
    { ar: 'عالم سحري داخل كتاب', en: 'Magical world inside a book, glowing letters, tiny creatures' },
    { ar: 'ساحة خردة سيارات (Industrial)', en: 'Car junkyard, rusted metal, cinematic industrial aesthetic' },
    { ar: 'فناء مدرسة إسلامية عريقة', en: 'Old Islamic school courtyard, arches, Arabic calligraphy' },
    { ar: 'مزرعة ذكية داخل ناطحة سحاب', en: 'Vertical smart farm, LED growth lights, hydroponics' },
    { ar: 'غرفة تحكم بقطار فائق السرعة', en: 'High speed train cockpit, futuristic controls, blur speed view' },
    { ar: 'منزل ذكي بأسلوب المينيماليزم', en: 'Minimalist smart home, voice assistant visual cues, clean lines' },
    { ar: 'ميدان سباق خيول ملكي', en: 'Royal horse racing track, green grass, elegant crowds' },
    { ar: 'متحف التاريخ الطبيعي (ديناصورات)', en: 'Natural History Museum, T-Rex skeleton, dramatic lighting' },
    { ar: 'قاعدة عسكرية سرية تحت الجبل', en: 'Secret military base inside mountain, heavy doors, tech tanks' },
    { ar: 'محل حلويات شرقية تقليدي', en: 'Traditional Oriental sweets shop, copper trays, warm light' },
    { ar: 'غرفة موسيقى (بيانو كلاسيكي)', en: 'Music room, grand piano, dust motes in sunlight, elegant' },
    { ar: 'متجر آبل الرسمي (Store Concept)', en: 'Apple Store concept, wooden tables, minimal glass, bright' },
    { ar: 'موقع هبوط على المريخ', en: 'Mars landing site, red dust, habitat pods, Earth in sky' },
    { ar: 'مدرج روماني قديم (Colosseum)', en: 'Ancient Roman Colosseum, gladiators, cinematic sun' },
    { ar: 'مطبخ منزلي دافئ (Vlog Style)', en: 'Warm home kitchen, steam rising, cozy lighting, 4k' },
    { ar: 'منطقة حظر طيران (Military)', en: 'No-fly zone, radar dish, jet fighters in distance' },
    { ar: 'غرفة نوم مراهق (Cyberpunk)', en: 'Teenager bedroom, neon posters, RGB pc setup, messy' },
    { ar: 'ساحة مبيعات سيارات تسلا', en: 'Tesla showroom, sleek white interior, charging stations' },
    { ar: 'غرفة خياطة أزياء راقية (Couture)', en: 'High fashion sewing room, mannequins, expensive fabrics' },
    { ar: 'مختبر تجارب عطور نادرة', en: 'Rare perfume experiment lab, old glass vials, plants' },
    { ar: 'منصة يوتيوب احترافية (Gaming)', en: 'Pro YouTube gaming setup, soundproofing, ring light' },
    { ar: 'موقع تصوير تحت الماء (Scuba)', en: 'Underwater filming site, scuba divers, lighting rigs' },
    { ar: 'مدينة أطلنطس المفقودة', en: 'Lost city of Atlantis, bioluminescence, ancient tech' },
    { ar: 'سوق شعبي مغربي (بزارات)', en: 'Moroccan traditional souk, carpets, lanterns, vibrant colors' },
    { ar: 'مكتب محرر صحفي (Vintage)', en: 'Vintage news editor office, typewriters, smoke, sepia' },
    { ar: 'مرصد فلكي عملاق', en: 'Giant astronomical observatory, open dome, giant telescope' },
    { ar: 'غرفة نوم ملكية (Versailles)', en: 'Versailles royal bedroom, gold leaf, heavy curtains' },
    { ar: 'موقع هبوط مروحيات فوق ناطحة سحاب', en: 'Helipad on skyscraper roof, city lights, night' },
    { ar: 'مختبر ذكاء اصطناعي (Brain Interface)', en: 'AI Neural lab, brain models, scanning lasers' },
    { ar: 'منجم ألماس تحت الأرض', en: 'Underground diamond mine, dark tunnels, glowing crystals' },
    { ar: 'متجر دراجات نارية (Harley)', en: 'Harley Davidson style shop, leather, chrome metal' },
    { ar: 'غرفة دراسة في أكسفورد', en: 'Oxford study room, dark wood, leather books, academic' },
    { ar: 'موقع بناء جسر معلق عملاق', en: 'Giant suspension bridge construction, fog, massive cables' },
    { ar: 'حديقة حيوان مستقبلية (Holograms)', en: 'Futuristic zoo, holographic animals, digital enclosures' },
    { ar: 'مركز سبا فاخر (Zen)', en: 'Luxury spa, bamboo, hot stones, water features' },
    { ar: 'محل بيع آلات تصوير كلاسيكية', en: 'Classic camera shop, Leica, Hasselblad, vintage lenses' },
    { ar: 'غرفة تحكم بمفاعل نووي', en: 'Nuclear reactor control room, red alert lights, tech panels' },
    { ar: 'منصة حفر في القطب الجنوبي', en: 'Antarctic drilling platform, ice cores, heavy machinery' },
    { ar: 'معرض سيارات فيراري (Red Vibe)', en: 'Ferrari showroom, red walls, fast cars, sharp lighting' },
    { ar: 'غرفة انتظار في عيادة تجميل', en: 'Beauty clinic waiting room, pink aesthetic, luxury chairs' },
    { ar: 'موقع تصوير إعلان عطور (Outdoor)', en: 'Outdoor perfume ad shoot, sunset beach, professional model' },
    { ar: 'مدينة سايبربانك (Blade Runner)', en: 'Blade Runner style city, flying cars, rain, giant ads' },
    { ar: 'مختبر ابتكار مواد النانو', en: 'Nano material innovation lab, atomic scale visuals' },
    { ar: 'غرفة نوم عصرية (IKEA Style)', en: 'Modern IKEA style bedroom, clean, bright, functional' },
    { ar: 'متجر بيع أجهزة لوحية (Future)', en: 'Future tablet store, transparent screens, floating UI' }
  ],
  moods: [
    { ar: 'بدون (يدوي)', en: 'None/Manual: No preset mood, follow manual subject input only' },
    { ar: 'جذب انتباه تسويقي (Hook)', en: 'High-energy marketing hook, vibrant colors, bold lighting' },
    { ar: 'إثارة بصرية (Viral)', en: 'Viral-ready visual impact, attention-grabbing, high contrast' },
    { ar: 'هيبة ملكية (Royal)', en: 'Royal prestige, slow-paced, majestic, authoritative lighting' },
    { ar: 'غموض درامي (Noir)', en: 'Dramatic mystery, heavy shadows, film noir, suspenseful' },
    { ar: 'هدوء نفسي (Zen)', en: 'Psychological serenity, soft colors, peaceful, balanced' },
    { ar: 'طاقة مستقبلية (Cyber)', en: 'Futuristic energy, high-tech, electric, fast-paced' },
    { ar: 'حنين للماضي (Vintage)', en: 'Nostalgic, warm film grain, retro vibes, faded colors' },
    { ar: 'رعب سينمائي (Horror)', en: 'Cinematic horror, eerie, unsettling, cold tones' },
    { ar: 'بهجة طفولية (Joy)', en: 'Childlike joy, bright pastel colors, magical sparkles' },
    { ar: 'احترافية مؤسسية (Corporate)', en: 'Professional corporate trust, clean, sharp, blue/white' },
    { ar: 'فخامة مطلقة (Elite)', en: 'Absolute luxury, gold accents, elite status, slow camera' },
    { ar: 'حزن عميق (Melancholic)', en: 'Deep melancholy, blue tints, rain, emotional depth' },
    { ar: 'إثارة أكشن (Heroic)', en: 'Action intensity, epic heroic lighting, dynamic dust' },
    { ar: 'سحر خيالي (Magical)', en: 'Magical wonder, glowing particles, ethereal, dreamy' },
    { ar: 'بساطة عصرية (Minimalist)', en: 'Modern minimalism, negative space, focused, silent' },
    { ar: 'خطر وشيك (Warning)', en: 'Imminent danger, red alerts, industrial grit, tension' },
    { ar: 'جمال طبيعي (Raw)', en: 'Raw natural beauty, handheld camera, realistic textures' },
    { ar: 'فوضى إبداعية (Chaos)', en: 'Creative chaos, splashing colors, energetic movement' },
    { ar: 'رومانسية شاعرية (Poetic)', en: 'Poetic romance, soft focus, golden hour, intimate' },
    { ar: 'قوة تقنية (Machine)', en: 'Technical power, mechanical, precise, cold metallic' },
    { ar: 'دهشة واكتشاف (Discovery)', en: 'Discovery wonder, wide eyes, illuminating light source' },
    { ar: 'تمرد غاضب (Rebel)', en: 'Rebel energy, urban grit, high contrast, non-conformist' },
    { ar: 'قدسية وروحانية (Spiritual)', en: 'Sacred spirituality, light rays, peaceful, ancient' },
    { ar: 'ثقة وكاريزما (Alpha)', en: 'Alpha confidence, strong silhouette, low angle, dominant' },
    { ar: 'ذكاء حاد (Sharp)', en: 'Sharp intelligence, digital data overlay, analytical' },
    { ar: 'سرعة البرق (Speed)', en: 'Lightning speed, motion blur, kinetic, adrenaline' },
    { ar: 'تواضع وصدق (Humble)', en: 'Humble honesty, soft lighting, human connection' },
    { ar: 'تطور جيني (Evolution)', en: 'Genetic evolution, organic patterns, scientific hope' },
    { ar: 'عزلة كونية (Cosmic)', en: 'Cosmic isolation, vast space, tiny human, existential' },
    { ar: 'بريق وشهرة (Glamour)', en: 'Glamour, flashes, high fashion lighting, luxury' },
    { ar: 'انتقام قاسي (Vengeance)', en: 'Hard vengeance, red/black theme, rain, intense eyes' },
    { ar: 'أمل متجدد (Hope)', en: 'Renewed hope, sunrise, light breeze, vibrant greens' },
    { ar: 'تاريخ عريق (Ancient)', en: 'Ancient weight, sepia tones, epic scale, dusty' },
    { ar: 'عالم أحلام (Dreamy)', en: 'Dreamlike state, blurred edges, floating, surreal' },
    { ar: 'جنون الارتياب (Paranoia)', en: 'Paranoid vibe, tilted angles, distorted reflections' },
    { ar: 'انتصار حاسم (Victory)', en: 'Decisive victory, stadium lights, slow motion, epic' },
    { ar: 'حب نقي (Pure Love)', en: 'Pure love, warm embrace visual, soft focus' },
    { ar: 'سريالية غريبة (Absurd)', en: 'Absurd surrealism, dream logic, impossible physics' },
    { ar: 'برود ثلجي (Frozen)', en: 'Frozen emotion, cold blue light, static, silent' },
    { ar: 'حرارة الصيف (Scorching)', en: 'Scorching summer heat, orange tint, heat waves' },
    { ar: 'عمق المحيط (Deep Sea)', en: 'Deep sea mood, dark blue, bioluminescence, pressure' },
    { ar: 'ثورة صناعية (Steam)', en: 'Industrial steam, gears, heavy smoke, amber light' },
    { ar: 'ذكاء روبوتي (Android)', en: 'Android mood, synthetic, clean, unfeeling' },
    { ar: 'إبداع فني (Studio)', en: 'Artistic studio vibe, paint splatters, creative light' },
    { ar: 'صدمة ورعب (Shock)', en: 'Instant shock, high key flash, frozen expression' },
    { ar: 'تركيز رياضي (Athlete)', en: 'Athletic focus, sweat detail, intense breathing' },
    { ar: 'غموض الصحراء (Mirage)', en: 'Desert mystery, mirage effect, shimmering heat' },
    { ar: 'ليل هادئ (Nightfall)', en: 'Quiet nightfall, dim blue streetlights, shadows' },
    { ar: 'إلهام فكري (Thought)', en: 'Intellectual inspiration, floating equations, deep focus' },
    { ar: 'كابوس مظلم (Nightmare)', en: 'Dark nightmare, distorted faces, red/black lighting' },
    { ar: 'براءة مطلقة (Innocence)', en: 'Absolute innocence, softest lighting, light colors' },
    { ar: 'نجاح مالي (Wealth)', en: 'Financial success, expensive textures, sharp suit' },
    { ar: 'مغامرة برية (Wild)', en: 'Wild adventure, earth tones, sun flare, dusty' },
    { ar: 'هدوء المكتبة (Scholar)', en: 'Scholarly silence, dusty air, warm lamp light' },
    { ar: 'إشراق الصباح (Morning)', en: 'Morning brightness, high key, fresh, energetic' },
    { ar: 'سحر القمر (Lunar)', en: 'Lunar magic, silver light, cold shadows, ethereal' },
    { ar: 'نار مشتعلة (Inferno)', en: 'Inferno mood, orange/red, smoke, intense heat' },
    { ar: 'بساطة يابانية (Wabi-Sabi)', en: 'Wabi-sabi simplicity, rustic, natural imperfection' },
    { ar: 'تحدي وإصرار (Challenge)', en: 'Defiant challenge, clenching jaw, low angle' },
    { ar: 'صمت مطبق (Silent)', en: 'Deadly silence, static scene, high tension' },
    { ar: 'غليان بركاني (Volcanic)', en: 'Volcanic energy, glowing lava, black ash' },
    { ar: 'جنان خضراء (Eden)', en: 'Garden of Eden vibe, lush, vibrant, divine' },
    { ar: 'قسوة معدنية (Metallic)', en: 'Metallic harshness, chrome reflections, sharp' },
    { ar: 'توازن مثالي (Balance)', en: 'Perfect balance, symmetry, zen, calm' },
    { ar: 'إبداع موسيقي (Melody)', en: 'Musical melody vibe, floating notes, soft glow' },
    { ar: 'عظمة تاريخية (Monumental)', en: 'Monumental scale, giant structures, low POV' },
    { ar: 'وحدة قاتلة (Loneliness)', en: 'Deadly loneliness, wide shots, empty space' },
    { ar: 'جنون فني (Madness)', en: 'Artistic madness, wide eyes, erratic colors' },
    { ar: 'حكمة الشيوخ (Sage)', en: 'Sage wisdom, soft warm wrinkles, deep eyes' },
    { ar: 'مستقبل متآكل (Dystopian)', en: 'Dystopian decay, rusted metal, acid rain mood' },
    { ar: 'يوتوبيا مثالية (Utopian)', en: 'Perfect Utopia, white/gold city, bright, clean' },
    { ar: 'ذكاء خوارزمي (Binary)', en: 'Binary logic, code rain, digital blue' },
    { ar: 'لمسة بشرية (Human)', en: 'Warm human touch, hand detail, macro skin' },
    { ar: 'إثارة سباق (Adrenaline)', en: 'Racing adrenaline, motion blur, intense focus' },
    { ar: 'هدوء البحر (Calm Sea)', en: 'Calm sea mood, horizons, soft gradients' },
    { ar: 'عاصفة رعدية (Stormy)', en: 'Stormy mood, dark clouds, lightning flash' },
    { ar: 'نهاية العالم (End Times)', en: 'End of days, dramatic orange sky, ruins' },
    { ar: 'بداية جديدة (Genesis)', en: 'Genesis mood, egg-like shapes, soft light' },
    { ar: 'قوة الطبيعة (Elemental)', en: 'Elemental power, wind/fire/earth visuals' },
    { ar: 'إتقان يدوي (Craft)', en: 'Handcrafted precision, wood/metal textures, macro' },
    { ar: 'تجسس سري (Spy)', en: 'Secret spy mood, dark glasses, city reflections' },
    { ar: 'رومانسية نيون (Neon Soul)', en: 'Neon soul, pink/purple, cinematic rain' },
    { ar: 'ذكاء اصطناعي (Mind)', en: 'AI consciousness, glowing brain, data flow' },
    { ar: 'عظمة جبلية (Summit)', en: 'Mountain summit mood, epic wide, cold air' },
    { ar: 'رفاهية الطيران (First Class)', en: 'First class luxury, champagne, soft leather' },
    { ar: 'سرعة فائقة (Hyperspeed)', en: 'Hyperspeed mood, streaking lights, futuristic' },
    { ar: 'إيمان ويقين (Faith)', en: 'Faith and certainty, vertical light ray, peace' },
    { ar: 'تحدي الزمن (Timeless)', en: 'Timeless mood, clocks, sand, sepia/black' },
    { ar: 'سحر الغابة (Wild Magic)', en: 'Wild forest magic, glowing mushrooms, green' },
    { ar: 'قوة الإرادة (Willpower)', en: 'Pure willpower, intense stare, dramatic rim' },
    { ar: 'بساطة قروية (Rustic)', en: 'Rustic simplicity, farm life, warm sunlight' },
    { ar: 'إبداع معماري (Arch)', en: 'Architectural wonder, perfect angles, clean sky' },
    { ar: 'غموض المحيط (Abyss)', en: 'The Abyss, pitch black, single light source' },
    { ar: 'طاقة الشباب (Vibe)', en: 'Youthful energy, skate park, urban, sun' },
    { ar: 'فخامة السيارات (Auto Elite)', en: 'Auto elite, car curves, studio lighting' },
    { ar: 'أناقة فرنسية (Chic)', en: 'French chic, black/white, fashion, perfume' },
    { ar: 'غموض فضائي (Alien)', en: 'Alien mystery, strange colors, unknown tech' },
    { ar: 'تركيز علمي (Science)', en: 'Scientific focus, microscope view, precision' },
    { ar: 'فرحة العيد (Festival)', en: 'Festival joy, fireworks, colorful, bright' }
  ],
  technicals: [
    { ar: 'بدون (يدوي)', en: 'None/Manual: No preset structure, follow manual subject input only' },
    { ar: 'رندر أوكتان احترافي (Octane)', en: 'Professional Octane Render, 8K resolution, physically based rendering (PBR), raytraced global illumination, volumetric lighting' },
    { ar: 'محرك Unreal Engine 5.4', en: 'Unreal Engine 5.4, Lumen global illumination, Nanite geometry, cinematic post-processing, photorealistic real-time render' },
    { ar: 'تكوين سينمائي 35mm', en: 'Cinematic 35mm anamorphic film, f/1.8 aperture, shallow depth of field, natural film grain, Arri Alexa 65 color science' },
    { ar: 'تصوير ماكرو فائق (Macro)', en: 'Extreme macro photography, 100mm lens, sub-atomic texture detail, focus stacking, sharpest edges' },
    { ar: 'إضاءة ريمبرانت (Rembrandt)', en: 'Rembrandt lighting setup, dramatic shadows, single key light, professional studio portrait style' },
    { ar: 'رندر ريدشيفت (Redshift)', en: 'Maxon Redshift Render, GPU accelerated, complex material shaders, realistic refraction, caustics' },
    { ar: 'دقة 32K فائقة (SuperRes)', en: 'Extreme 32K resolution, highly detailed textures, no blur, crisp sharpness, professional masterpiece' },
    { ar: 'تصوير جوي (Drone POV)', en: 'Professional drone photography, 24mm wide angle, HDR, bird eye view, epic scale' },
    { ar: 'إضاءة حجمية (Volumetric)', en: 'Volumetric god rays, atmospheric haze, particles in air, dramatic light beams, cinematic depth' },
    { ar: 'أسلوب RAW فوتوغرافي', en: 'Raw unedited photo style, natural colors, high dynamic range (HDR), DSLR quality, neutral contrast' },
    { ar: 'عدسة عين السمكة (Fisheye)', en: '12mm fisheye lens, ultra-wide distortion, unique perspective, close-up impact' },
    { ar: 'رندر في-راي (V-Ray)', en: 'Chaos Group V-Ray, architectural accuracy, photorealistic materials, global illumination' },
    { ar: 'تقنية Raytracing النشطة', en: 'Real-time raytracing, perfect reflections, accurate shadows, light bounce simulation' },
    { ar: 'إضاءة نيون (Cyber Light)', en: 'Cyberpunk neon lighting, blue and magenta highlights, rim lighting, glowing accents' },
    { ar: 'تصوير بمعدل 120fps (Slow)', en: '120fps high speed footage style, fluid slow motion, motion blur, cinematic time control' },
    { ar: 'عدسة بورتريه 85mm', en: '85mm prime lens, creamy bokeh, professional portrait compression, sharp eyes' },
    { ar: 'أسلوب فوتوشوب برو (Compositing)', en: 'Professional digital compositing, layered effects, color graded in DaVinci Resolve' },
    { ar: 'محرك Arnold Render', en: 'Autodesk Arnold Render, path tracing, physically based, cinematic production quality' },
    { ar: 'إضاءة استوديو ثلاثية (3-Point)', en: 'Standard 3-point studio lighting (Key, Fill, Back), balanced look, professional commercial' },
    { ar: 'تصوير ليلي ISO عالي', en: 'Low light night photography, high ISO grain, long exposure, light trails' },
    { ar: 'تأثير تشتت الضوء (Caustics)', en: 'Optical caustics, light through glass/water, realistic refraction, complex light patterns' },
    { ar: 'أسلوب عرض (Lookbook)', en: 'High fashion lookbook style, clean studio background, professional flash lighting' },
    { ar: 'تقنية Deep Neural Texture', en: 'AI-enhanced textures, deep neural mapping, procedural generation, infinity detail' },
    { ar: 'عدسة سينمائية (Panavision)', en: 'Panavision Primo lenses, anamorphic squeeze, oval bokeh, horizontal lens flares' },
    { ar: 'إضاءة ناعمة (Softbox)', en: 'Giant softbox lighting, no harsh shadows, commercial beauty style, smooth skin' },
    { ar: 'رندر طاقة إشعاعية (Radiosity)', en: 'Advanced radiosity, perfect color bleeding, realistic light bouncing between objects' },
    { ar: 'أسلوب المخططات الهندسية', en: 'Engineering blueprint style, technical lines, orthographic view, CAD render' },
    { ar: 'تصوير بمستوى العين (Eye-Level)', en: 'Eye-level perspective, natural human POV, immersive, standard focal length' },
    { ar: 'زاوية منخفضة (Hero Angle)', en: 'Low angle shot, dramatic scale, making subjects look powerful and epic' },
    { ar: 'زاوية مرتفعة (Bird POV)', en: 'High angle bird POV, looking down, detailed environment, tactical view' },
    { ar: 'تأثير Motion Blur حركي', en: 'Strong motion blur, speed effect, kinetic energy, fast shutter simulation' },
    { ar: 'إضاءة شمس الغروب (Golden)', en: 'Golden hour natural sunlight, long shadows, warm 3000K temperature' },
    { ar: 'إضاءة زرقاء باردة (Moonlight)', en: 'Cool moonlight lighting, 8000K, deep blues, mysterious glow' },
    { ar: 'تصوير تتبع (Tracking Shot)', en: 'Cinematic tracking shot, gimbal stabilized, smooth camera movement' },
    { ar: 'أسلوب العرض ثلاثي الأبعاد', en: 'Product showcase 3D, floating on minimalist background, soft shadows' },
    { ar: 'عدسة ماكرو 1:1 دقيقة', en: '1:1 magnification macro lens, extreme sharpness on small objects' },
    { ar: 'رندر بلندر (Cycles Engine)', en: 'Blender Cycles Render, path tracing, complex nodes, realistic glass' },
    { ar: 'إضاءة كاشفة (Spotlight)', en: 'Hard spotlight, high contrast, dramatic focus, stage style' },
    { ar: 'تصوير بهاتف آيفون (Mobile POV)', en: 'iPhone 15 Pro Max style, computational photography, mobile HDR, vlog look' },
    { ar: 'أسلوب المجلات (Vogue Style)', en: 'Vogue magazine editorial lighting, high contrast, sharp fashion focus' },
    { ar: 'إضاءة طبيعية من النافذة', en: 'Natural window light, soft diffusion, domestic atmosphere, cozy' },
    { ar: 'رندر Octane الذهب والكروم', en: 'Octane render specialized for gold and chrome, high reflectivity' },
    { ar: 'تصوير بالأشعة تحت الحمراء', en: 'Infrared photography style, white leaves, surreal color palette' },
    { ar: 'أسلوب العرض البانورامي', en: 'Panoramic wide shot, 32:9 ratio style, epic landscape' },
    { ar: 'إضاءة تحت الماء (Refracted)', en: 'Underwater refracted light, caustic patterns on skin, blue tint' },
    { ar: 'عدسة تيليفوتو 200mm', en: '200mm telephoto lens, extreme compression, distant subject focus' },
    { ar: 'رندر سحابي (Cloud Render)', en: 'Volumetric cloud rendering, translucent light, fluffiness' },
    { ar: 'إضاءة شمعة (Low Key)', en: 'Single candle light, very low key, high contrast, intimate' },
    { ar: 'أسلوب تصوير الشوارع (Candid)', en: 'Candid street photography, Fujifilm film simulation, authentic' },
    { ar: 'تقنية Ray-traced Global Illum', en: 'Ray-traced global illumination, perfect color accuracy in shadows' },
    { ar: 'عدسة واسعة جداً 14mm', en: '14mm ultra-wide lens, architectural interior, grand space' },
    { ar: 'رندر محرك كورونا (Corona)', en: 'Corona Renderer, architectural masterpiece, soft realism' },
    { ar: 'إضاءة ثلجية باردة (Frost)', en: 'Frosty winter lighting, high key white, cold atmosphere' },
    { ar: 'أسلوب تصوير المنتجات (Commercial)', en: 'Commercial product photography, perfect rim lighting, no dust' },
    { ar: 'إضاءة مسرحية (Theatrical)', en: 'Theatrical stage lighting, colorful gels, dramatic silhouettes' },
    { ar: 'رندر مانترا (Houdini)', en: 'Houdini Mantra Render, complex particles, smoke, fire simulation' },
    { ar: 'تصوير بزاوية مائلة (Dutch Oak)', en: 'Dutch angle, tilted horizon, psychological tension' },
    { ar: 'إضاءة HDR عالية المدى', en: '32-bit HDR lighting, perfect highlight recovery, detailed shadows' },
    { ar: 'أسلوب تصوير الأفلام القديمة', en: '16mm vintage film, scratches, dust, nostalgic jitter' },
    { ar: 'رندر محرك العاب (Unity)', en: 'Unity Engine style, real-time shaders, game aesthetic' },
    { ar: 'إضاءة حريق (Flicker)', en: 'Flickering fire light, orange/black contrast, warm glow' },
    { ar: 'عدسة تيلت-شيفت (Tilt-Shift)', en: 'Tilt-shift lens, miniature world effect, selective focus' },
    { ar: 'رندر بلّوري (Crystalline)', en: 'Crystalline rendering, light dispersion, prism effects' },
    { ar: 'إضاءة خلفية (Backlit)', en: 'Strong backlit silhouette, glowing edges, sun flare' },
    { ar: 'أسلوب تصوير الوجوه (Portrait Pro)', en: 'Professional portrait lighting, catchlight in eyes, 85mm' },
    { ar: 'رندر محرك الكروم (Chrome)', en: 'Hyper-reflective chrome render, mirror finish, sky reflections' },
    { ar: 'إضاءة غابة (Dappled)', en: 'Dappled forest light, leaf shadows, organic patterns' },
    { ar: 'تصوير عالي السرعة (Splash)', en: 'High speed photography, liquid splash frozen in time' },
    { ar: 'رندر طبي (Molecular)', en: 'Molecular medical render, subsurface scattering, organic' },
    { ar: 'إضاءة نفق (Tunnel)', en: 'Tunnel lighting, leading lines, dark edges, central light' },
    { ar: 'عدسة بورتريه 105mm', en: '105mm macro portrait lens, sharpest eyelashes, soft skin' },
    { ar: 'رندر أوكتان للطعام (Food)', en: 'Octane render for food, subsurface scattering on ingredients' },
    { ar: 'إضاءة ضبابية (Foggy)', en: 'Heavy foggy lighting, obscured distance, light diffusion' },
    { ar: 'أسلوب تصوير معاصر (Indie)', en: 'Indie film look, teal and orange color grade, handheld' },
    { ar: 'رندر معادن (Metallic Pro)', en: 'Industrial metal render, brushed steel, realistic rust' },
    { ar: 'إضاءة مكتب (Fluorescent)', en: 'Fluorescent office lighting, cold green/white, corporate' },
    { ar: 'تصوير من منظور شخصي (POV)', en: 'First person POV, hands in frame, immersive action' },
    { ar: 'رندر جسيمات نانو (Nano)', en: 'Nano particle rendering, holographic data, complex math' },
    { ar: 'إضاءة بركانية (Lava)', en: 'Lava glow lighting, deep red/orange, harsh black shadows' },
    { ar: 'عدسة واسعة 24mm (Street)', en: '24mm wide street lens, immersive urban context' },
    { ar: 'رندر واقعي للجليد (Ice)', en: 'Realistic ice render, subsurface scattering, cracks' },
    { ar: 'إضاءة حوض سمك (Aqua)', en: 'Aquarium lighting, refracted water lines, blue/green' },
    { ar: 'تصوير وثائقي (National Geo)', en: 'National Geographic style, raw nature, sharp detail' },
    { ar: 'رندر محرك سيارات (Engine)', en: 'Automotive engine render, oil textures, chrome gears' },
    { ar: 'إضاءة فجر (Dawn)', en: 'Dawn lighting, purple/blue sky, first sun ray' },
    { ar: 'عدسة تيليفوتو 400mm (Wild)', en: '400mm wildlife lens, distant animal, sharp focus' },
    { ar: 'رندر أثاث (Interior Pro)', en: 'High-end interior render, soft shadows, fabric textures' },
    { ar: 'إضاءة ملهى ليلي (Club)', en: 'Club lighting, lasers, strobes, hazy atmosphere' },
    { ar: 'تصوير فضاء (Hubble)', en: 'Hubble telescope style, deep space, nebulae, stars' },
    { ar: 'رندر نسيج (Fabric Pro)', en: 'Ultra detailed fabric render, weave visible, silk shine' },
    { ar: 'إضاءة شاشة (Digital)', en: 'Light from screen, digital blue on face, tech vibe' },
    { ar: 'عدسة سينمائية 50mm', en: '50mm standard cinematic lens, natural perspective, f/1.2' },
    { ar: 'رندر واقعي للبشرة (Skin)', en: 'Skin shader render, pores, vellus hair, realistic SSS' },
    { ar: 'إضاءة مطر (Wet Look)', en: 'Wet surfaces, rain reflections, street lights blur' },
    { ar: 'تصوير رياضي (Action)', en: 'Sports action photography, fast shutter, sharp motion' },
    { ar: 'رندر معماري (Skyscraper)', en: 'Skyscraper render, glass reflections, city context' },
    { ar: 'إضاءة خيمة (Camp)', en: 'Tent lighting, warm orange inside, dark blue outside' },
    { ar: 'رندر ذكاء اصطناعي (Mind Pro)', en: 'Neural network render, glowing nodes, data streams' },
    { ar: 'إضاءة نيون وردي (Retro)', en: '80s retro neon lighting, pink/cyan, synthwave' }
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
