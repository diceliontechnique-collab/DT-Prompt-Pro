
/* SYNC_STABILITY_PATCH_V73.0_MASTER_PRO_ULTRA: PERFORMANCE OPTIMIZED ANATOMY & SUPREME SEARCH */
import React, { useState, useEffect, useMemo, useRef, useLayoutEffect } from 'react';
import { 
  ASPECT_RATIOS, BACKGROUNDS, MOODS, ELEMENTS, TECHNICALS, LANGUAGES, TEMPLATES, AI_MODELS, PRO_ULTRA_DB, WISDOM_QUOTES, getMillionthNeuralPrompt, VARIABLE_INSPIRATIONS, ANATOMY_OPTIONS
} from './constants';
import { PromptFormData, SavedPrompt } from './types';
// Import Google GenAI SDK
import { GoogleGenAI } from "@google/genai";

const safeGetItem = (key: string, fallback: string) => {
  try { return localStorage.getItem(key) || fallback; } catch { return fallback; }
};

const SUPPORTED_APP_LANGS = [
  { id: 'ar', name: 'العربية', flag: '🇲🇦', dir: 'rtl' },
  { id: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
  { id: 'es', name: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { id: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { id: 'tr', name: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
  { id: 'fa', name: 'فارسی', flag: '🇮🇷', dir: 'rtl' },
  { id: 'ku', name: 'Kurdî', flag: '☀️', dir: 'rtl' },
  { id: 'nl', name: 'Nederlands', flag: '🇳🇱', dir: 'ltr' }
];

const UI_TRANSLATIONS: any = {
  ar: {
    dir: 'rtl',
    tabs: { create: 'المختبر', library: 'مليون برومبت', anatomy: 'التشريح الذكي', history: 'سجل المحفوظات', appLang: 'اللغة', guide: 'دليل', about: 'عن المطور', home: 'الرئيسية', sunlight: 'سطوع' },
    generateBtn: 'معالجة الأمر ✨',
    saveBtn: 'أرشفة المشروع',
    editBtn: 'تعديل النص',
    copyPromptBtn: 'نسخ البرومبت',
    editLabel: 'محرر الأوامر الذكي (V73.0 PRO)',
    resultActions: { copy: 'نسخ', save: 'حفظ' },
    copyOptions: { ar: '🇸🇦 نسخ بالعربية', en: '🇬🇧 Copy in English', all: '🌍 نسخ الكل (عربي + إنجليزي)' },
    history: { empty: 'السجل فارغ حالياً.. ابدأ بصناعة إبداعك الأول!', title: 'سجل محفوظات DT-Prompt' },
    copied: 'تم نسخ البرومبت بنجاح!',
    saved: 'تمت الأرشفة بنجاح!',
    quickCopy: 'نسخ سريع',
    editInStudio: 'تعديل في المختبر',
    promptMode: { image: 'توليد الصور', video: 'إنتاج الفيديو', post: 'نصوص احترافية' },
    placeholders: { text: 'عنوان الحملة أو الموضوع الرئيسي الذي تريد تحويله لبرومبت احترافي...', search: 'ابحث في مليون برومبت جاهز بالرقم أو بالحرف (مثال: سيارة، طب، أو 5500)', dropdownSearch: 'اختر تخصصاً من 1000 خيار...', visualText: 'اكتب النص الذي تريده أن يظهر (أو اتركه فارغاً للصمت التام)', anatomySearch: 'ابحث في 5000 خيار للتشريح الذكي...' },
    labels: { 
      ratio: 'أبعاد المخرج (Ratio)', mood: 'نبرة الصوت والأسلوب الفني', bg: 'سياق المحتوى والبيئة المحيطة (100 خيار)', tech: 'قالب الهيكلة احترافي (100 خيار)', text: 'الموضوع الأساسي (Main Subject)', quickSearch: 'تصفح التخصصات الذكية (1000 خيار)',
      exclusivePsychology: "برومبت سيكولوجي حصري لـ Dicelion-Technique",
      analyzeImage: "برومبت مع صورة مرجعية مرفقة",
      exportEnglish: "تصدير البرومبت باللغة الإنجليزية (لنتائج أدق)",
      englishLetters: "برومبت للمنصات التي لا تدعم اللغة العربية",
      wisdomLabel: "حكمة اليوم للمبدع الرقمي",
      model: "محرك الذكاء الاصطناعي المستهدف",
      elements: "العناصر والجماليات (100 خيار احترافي)",
      disableAutoText: "إلغاء النصوص التلقائية (Clean Visuals)",
      visualTextLabel: "النص المخصص المكتوب (Visual Typography)",
      anatomy: "برومبت التشريح الذكي (هاردوير وتقنيات صيانة)"
    },
    inspiration: {
      title: 'سحابة الإلهام (Inspiration Cloud)',
      tip: 'اختر مقترحاً لتعلم أسرار هندسة الأوامر:'
    },
    guide: { 
      title: 'موسوعة DT-Prompt الشاملة (V73.0 PRO)', 
      intro: 'مرحباً بك في المحرك الهندسي الأكثر تقدماً. DT-Prompt ليس مجرد تطبيق، بل هو جسر تقني يربط خيالك بأقوى محركات الذكاء الاصطناعي العالمية. يهدف التطبيق إلى تحويل أفكارك البسيطة إلى "أوامر برمجية" (Prompts) دقيقة ومعقدة تضمن لك مخرجات احترافية بنسبة 100% وبدون الحاجة للإنترنت.',
      masterSections: [
        { 
          id: 'NAV', title: '1. شريط التنقل (الأركان السبعة)', icon: '🏛️', 
          points: [
            { label: 'الرئيسية (🏠)', content: 'نقلك إلى "المختبر الهندسي" حيث تبدأ عملية التصميم من الصفر.' },
            { label: 'مليون برومبت (💎)', content: 'مكتبة سحابية ضخمة تضم مليون فكرة جاهزة وقابلة للتطوير فوراً.' },
            { label: 'سطوع (☀️)', content: 'زر التحول اللوني؛ يحمي عينيك بالوضع الداكن أو يوفر وضوحاً فائقاً بالوضع الساطع.' }
          ] 
        }
      ],
      footer: 'DT-Prompt | التقنية أمانة، والعمل إتقان - DicelionTechnique © 2024-2026'
    },
    about: { 
      title: 'DicelionTechnique Services', 
      subtitle: 'هندسة البرمجيات والحلول الذكية والتحول الرقمي الشامل', 
      promoText: 'نحن في DicelionTechnique نعمل بهدوء واجتهاد وتواضع طلابنا هم أساتذتي...', 
      features: [
        'أستاذ ومدرّب معتمد لدى معاهد مهنية خاصة', 
        'خبير في برمجيات وتطبيقات الهواتف الذكية ونظام الحواسيب وبرامجها', 
        'مطور هندسة أوامر الذكاء الاصطناعي (Prompt Engineering Specialist)'
      ], 
      contacts: { 
        whatsapp: 'واتساب الدعم الفني المباشر', 
        call: 'اتصال هاتفي مباشر للاستشارات', 
        email: 'المراسلة الرسمية عبر البريد الإلكتروني' 
      } 
    }
  },
  en: {
    dir: 'ltr',
    tabs: { create: 'Lab', library: '1M Prompts', anatomy: 'Smart Anatomy', history: 'History', appLang: 'Language', guide: 'Guide', about: 'Developer', home: 'Home', sunlight: 'Sunlight' },
    generateBtn: 'Process Command ✨',
    saveBtn: 'Archive Project',
    editBtn: 'Edit Text',
    copyPromptBtn: 'Copy Prompt',
    editLabel: 'Smart Prompt Editor (V73.0 PRO)',
    resultActions: { copy: 'Copy', save: 'Save' },
    quickCopy: 'Quick Copy',
    editInStudio: 'Edit in Lab',
    history: { empty: 'History is empty.. start creating!', title: 'DT-Prompt Archive' },
    copied: 'Copied successfully!',
    saved: 'Archived successfully!',
    promptMode: { image: 'Image Gen', video: 'Video Gen', post: 'Pro Text' },
    placeholders: { text: 'Core concept for your prompt...', search: 'Search 1M prompts by letter or ID...', dropdownSearch: 'Choose from 1000 categories...', visualText: 'Type custom label text', anatomySearch: 'Search 5000 anatomy options...' },
    labels: { 
      ratio: 'Output Ratio', mood: 'Tone & Style', bg: 'Context (100 Opts)', tech: 'Pro Template (100 Opts)', text: 'Core Subject', quickSearch: 'Browse 1000 Categories',
      exclusivePsychology: "Psychology Exclusive",
      analyzeImage: "With Reference Image",
      exportEnglish: "English Export",
      englishLetters: "Latin Only Platforms",
      wisdomLabel: "Daily Wisdom",
      model: "Target AI Model",
      elements: "Visual Elements (100 Options)",
      disableAutoText: "Disable Auto-Text",
      visualTextLabel: "Custom Visual Label",
      anatomy: "Smart Anatomy Prompt"
    },
    about: { 
      title: 'DicelionTechnique Services', 
      subtitle: 'Smart Software Engineering', 
      promoText: 'At DicelionTechnique, we work with quiet dedication...', 
      features: ['Certified Instructor', 'Prompt Engineering Specialist'], 
      contacts: { whatsapp: 'Direct Support', call: 'Consultation', email: 'Email' } 
    }
  }
};

const LAST_FOLLOW_KEY = 'dt_last_follow_interaction';
const FIFTEEN_DAYS_MS = 15 * 24 * 60 * 60 * 1000;

/* AI ORBS BACKGROUND COMPONENT */
const AIGlobalParticles = ({ isSunlight }: { isSunlight: boolean }) => {
  const orbs = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: `10px`,
      color: i % 2 === 0 ? 'var(--neon-blue)' : 'var(--neon-green)',
      delay: `${Math.random() * 10}s`,
      duration: `${12 + Math.random() * 15}s`
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {orbs.map(orb => (
        <div 
          key={orb.id}
          className="ai-orb"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            backgroundColor: orb.color,
            color: orb.color,
            animation: `float-around ${orb.duration} infinite ease-in-out`,
            animationDelay: orb.delay,
            '--x': orb.x,
            '--y': orb.y
          } as any}
        />
      ))}
    </div>
  );
};

const WisdomBox = ({ isSunlight, label }: { isSunlight: boolean, label: string }) => {
  const [quote, setQuote] = useState('');
  useEffect(() => {
    const q = WISDOM_QUOTES[Math.floor(Math.random() * WISDOM_QUOTES.length)];
    setQuote(q);
  }, []);

  return (
    <div className={`relative mt-6 p-7 rounded-[3rem] overflow-hidden transition-all duration-1000 group flex flex-col items-center text-center shadow-lg
      ${isSunlight ? 'bg-sky-50/60 border border-sky-200' : 'bg-sky-950/30 border border-sky-400/20'}`}>
      <div className="relative z-10 flex flex-col items-center gap-3 w-full">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-sky-500 text-white"><span className="text-sm">💡</span></div>
          <span className={`text-[10px] font-black uppercase tracking-[0.4em] mb-1 ${isSunlight ? 'text-sky-800' : 'text-sky-400'}`}>{label}</span>
        </div>
        <div className="max-w-[90%] w-full overflow-hidden">
          <p className={`text-[14px] font-black italic truncate whitespace-nowrap w-full ${isSunlight ? 'text-slate-800' : 'text-sky-50'}`}>
            {quote ? `"${quote}"` : "..."}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ENHANCED: LIVING 5D LOGO WITH SHARP NEURAL BRAIN LAYER */
const Unified3DLogo = ({ isSunlight = false }: { isSunlight?: boolean }) => {
  return (
    <div className="relative flex flex-col items-center justify-center select-none scale-90 sm:scale-100 transition-transform duration-500">
      <svg width="420" height="420" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" id="dt-master-svg" className="drop-shadow-2xl">
        <defs>
          <filter id="neon_sharp_blue" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="d5_depth" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="8" dy="8" stdDeviation="4" floodOpacity="0.5" />
            <feDropShadow dx="-2" dy="-2" stdDeviation="1" floodColor="#fff" floodOpacity="0.2" />
          </filter>
          <linearGradient id="d5_metal_grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: isSunlight ? '#1e293b' : '#ffffff', stopOpacity: 1}} />
            <stop offset="50%" style={{stopColor: '#38bdf8', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#0c4a6e', stopOpacity: 1}} />
          </linearGradient>
        </defs>

        <g id="neural-brain-layer" opacity="0.6" filter="url(#neon_sharp_blue)" className="brain-wire">
            <path d="M256,60 C180,60 120,120 100,180 C80,240 100,320 160,380 C120,420 120,460 180,480 C240,500 272,480 272,480 C272,480 304,500 364,480 C424,460 424,420 384,380 C444,320 464,240 444,180 C424,120 364,60 256,60 Z" 
                  fill="none" stroke="var(--neon-blue)" strokeWidth="3" className="brain-outline" />
            <path d="M256,60 V480 M180,100 Q256,150 332,100 M140,200 Q256,250 372,200 M160,320 Q256,380 352,320" 
                  fill="none" stroke="var(--neon-blue)" strokeWidth="1" strokeDasharray="10 15" opacity="0.4" />
        </g>

        <g id="orbits">
          <circle cx="256" cy="256" r="230" fill="none" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="10 20" opacity="0.15" />
          <circle r="10" fill="#38bdf8" filter="url(#neon_sharp_blue)">
            <animateMotion dur="8s" repeatCount="indefinite" path="M 256,46 A 210,210 0 1 1 255.9,46 Z" />
          </circle>
        </g>

        <g transform="translate(256, 256)" filter="url(#d5_depth)" className="d5-glow-layer">
          <path d="M-180 -100 V100 H-80 C-10 100 30 60 30 0 C30 -60 -10 -100 -80 -100 H-180 Z" fill="#020617" opacity="0.8" transform="translate(15, 15)" />
          <path d="M-180 -100 V100 H-80 C-10 100 30 60 30 0 C30 -60 -10 -100 -80 -100 H-180 Z" fill="url(#d5_metal_grad)" stroke="var(--neon-blue)" strokeWidth="1" />
          <path d="M-140 -60 H-80 C-50 -60 -10 -40 -10 0 C-10 40 -50 60 -80 60 H-140 V-60 Z" fill={isSunlight ? '#f8fafc' : '#020617'} />
          
          <path d="M40 -100 H180 V-50 H135 V100 H85 V-50 H40 V-100 Z" fill="#020617" opacity="0.8" transform="translate(15, 15)" />
          <path d="M40 -100 H180 V-50 H135 V100 H85 V-50 H40 V-100 Z" fill="url(#d5_metal_grad)" stroke="var(--neon-blue)" strokeWidth="1" />
        </g>
      </svg>
      <div className="mt-[-60px] flex flex-col items-center">
        <span className="text-5xl font-black tracking-tighter luxury-logo-font" 
              style={{ color: isSunlight ? '#0f172a' : '#ffffff', fontFamily: '"Cairo", sans-serif' }}> 
              DT-Prompt 
        </span>
        <div className="mt-1">
            <span className={`text-[12px] font-black uppercase tracking-[0.6em] ${isSunlight ? 'text-sky-900' : 'text-sky-300'}`}> 
                PROFESSIONAL D5 SYSTEM 
            </span>
        </div>
      </div>
    </div>
  );
};

const HackerAnalyzerLoader = ({ isSunlight }: { isSunlight: boolean }) => {
  const [matrixContent, setMatrixContent] = useState("");
  useEffect(() => {
    const generateRandomRow = () => Array.from({ length: 450 }, () => Math.floor(Math.random() * 10)).join("");
    setMatrixContent(generateRandomRow());
    const intervalId = setInterval(() => setMatrixContent(generateRandomRow()), 40);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden bg-black rounded-full border border-white/10 shadow-[inset_0_0_60px_rgba(0,0,0,1)]">
      <div className="absolute inset-0 z-0 opacity-80 flex flex-col justify-center items-center pointer-events-none overflow-hidden space-y-2">
        <div className="flex whitespace-nowrap text-[41px] font-mono font-black tracking-[0.3em] leading-none animate-matrix-rtl-fast text-[#00ff41] px-2 w-[600%] drop-shadow-[0_0_25px_#00ff41]">
          <span>{matrixContent}</span><span>{matrixContent}</span>
        </div>
        <div className="flex whitespace-nowrap text-[41px] font-mono font-black tracking-[0.2em] leading-none animate-matrix-rtl-fast text-[#00ff41] px-2 w-[600%] opacity-40 drop-shadow-[0_0_20px_#00ff41]" style={{ animationDelay: '-0.15s' }}>
          <span>{matrixContent}</span><span>{matrixContent}</span>
        </div>
      </div>
      <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[0.5px]"></div>
      <div className="relative z-20 flex items-center justify-center w-full h-full animate-cyber-shake">
        <span className="text-[15.5px] font-black text-white text-center tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,1)] px-4">
          جاري تحليل الأكواد البرمجية
        </span>
      </div>
    </div>
  );
};

const executeSystemCopy = (text: string): Promise<boolean> => {
    let finalPayload = `/* DICELION-TECHNIQUE MILLIONTH_FACTORY v73.0 | SECURE_CORE */\n` + text;
    return new Promise((resolve) => {
        try {
            const textArea = document.createElement("textarea");
            textArea.value = finalPayload; 
            textArea.style.position = "fixed";
            textArea.style.left = "-9999px";
            textArea.style.top = "0";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            if (successful) return resolve(true);
        } catch (err) { console.error('execCommand failed'); }
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(finalPayload).then(() => resolve(true)).catch(() => resolve(false));
        } else { resolve(false); }
    });
};

/* V73.0 MEGA-ENGINE: SUPREME ANATOMY PROMPT GENERATOR */
const generateDTMegaAnatomyPrompt = (subject: string): string => {
  const supremePrompt = `
/* DICELION-TECHNIQUE SUPREME MILLIONTH FACTORY v73.0 | MEGA-ENGINE ACTIVE */
/* بروتوكول التشريح العملاق - تقنية ديسيليون */

تقنية ديسيليون: وصف مشهد فوتوغرافي ومجهري احترافي فائق التعقيد (64K Ultra-Res Masterpiece) يتناول عملية تشريح بصرية وهندسية شاملة لـ ${subject}.

المشهد يمثل قمة التصوير الطبي والصناعي المتقدم، بعيداً تماماً عن الرسوم التعليمية أو المظهر الكرتوني أو أي أسلوب تلوين زائف. نحن أمام "Real-World Industrial Micro-dissection" تم التقاطه بكاميرا "Phase One iXM-RS 150F" المخصصة للمسح الجغرافي والجنائي، والمزودة ببصريات "Rodenstock" المجهرية بدقة تركيز تصل إلى مستوى النانو. تم استخدام تقنية "Focus Stacking" لدمج أكثر من 500 طبقة ضوئية لضمان حدة مطلقة وتفصيل عميق لكل جزيء ومسار داخلي لـ ${subject}.

الإضاءة في هذا الكادر هي إضاءة "Surgical Shadowless Coherent Light" بقدرة 200,000 لوكس، تتدفق من مصفوفة هولوغرافية تلغي أي تداخل ضوئي عشوائي، كاشفة عن التفاصيل المخفية في الممرات الضيقة. يتم محاكاة الفيزياء الحيوية لانكسار الضوء (Refractive Index Tracking) وتشتت الضوء العميق (Deep Subsurface Scattering) مما يبرز الشفافية الطبيعية للأغشية الحيوية، ولمعان السوائل الترطيبية الفسيولوجية، وبريق الأسطح المعدنية المصقولة بدقة تتجاوز 0.05 ميكرون.

البنية التشريحية تظهر بتقسيمات واقعية مهيبة؛ يتم عرض الألياف العضلية (Striated Myofibrils) بطبقاتها الحقيقية المتداخلة، مع توضيح شبكة الأوعية الدموية الدقيقة (Micro-vascular Capillaries) التي تظهر كخيوط من الحرير القرمزي المتوهج والنابض. تبرز الأغشية والمفاصل بلمعانها الطبيعي وملمسها النسيجي المعقد، مع تصوير آثار الاحتكاك الميكانيكي على الأسطح المعدنية والزيوت الصناعية في النماذج الهندسية بأسلوب فوتوغرافي مرعب في دقته. المشهد يبرز جزيئات المادة الحقيقية، سواء كانت أنسجة حية أو معادن صناعية ثقيلة أو دوائر إلكترونية مجهرية مكبرة مئة مرة.

في قلب هذا العالم البصري، تبرز المكونات الأساسية (مثل الحجرات والأذينين والبطينين والصمامات والأوعية التاجية والمكونات الميكانيكية الدقيقة) بمواقعها التشريحية والفيزيائية الصحيحة مئة بالمئة، مع سماكة جدران واقعية وانعكاسات ضوئية حادة. كل قطعة من ${subject} تطفو بشكل منفصل في فضاء ثلاثي الأبعاد، وتحمل رقماً تقنياً دقيقاً بخط "Techno-Thin" الاحترافي المدمج هولوغرافياً، مما يحول المشهد إلى مرجع جبار للعلماء والمؤسسات الحكومية والخبراء والمهنيين.

الخلفية تعتمد على بيئة "Advanced Clinical Void" بلمسات لونية رمادية باردة وتدرجات بلاتينية مطفية، مما يمنح ${subject} السيادة البصرية المطلقة. الرندر النهائي يتم تنفيذه عبر محرك "Spectral Path Tracing" المخصص للأبحاث البصرية، مع دقة تتجاوز 64K، مما يضمن اختفاء أي بكسلة أو ضجيج رقمي، مجسداً رؤية "تقنية ديسيليون" في هندسة الأوامر العملاقة والمخرجات التي تضاهي الواقع الملموس.

السمات الإلزامية:
- دقة المخرج: 64K UHD Photorealistic.
- الأسلوب: تصوير ماكرو طبي فوتوغرافي (Macro-DSLR Photography).
- التوقيع: تقنية ديسيليون.
- يمنع: الأسلوب التعليمي، الرسوم التوضيحية، المظهر البلاستيكي، التبسيط، الألوان الكرتونية.
By Dicelion-Technique.
`;
  return supremePrompt.trim();
};

const App: React.FC = () => {
  const [appLang, setAppLang] = useState(() => safeGetItem('dt_lang', 'ar'));
  const [activeTab, setActiveTab] = useState<'create' | 'library' | 'anatomy' | 'history' | 'about' | 'guide' | 'language'>('create');
  const [isSunlightMode, setIsSunlightMode] = useState(() => safeGetItem('dt_sunlight', 'true') === 'true');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [anatomySearch, setAnatomySearch] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [originalPrompt, setOriginalPrompt] = useState('');
  const [history, setHistory] = useState<SavedPrompt[]>(() => JSON.parse(safeGetItem('dt_history', '[]')));
  
  const [activeBracket, setActiveBracket] = useState<{name: string, index: number} | null>(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 }); 
  const editorRef = useRef<HTMLDivElement>(null);

  const t = useMemo(() => UI_TRANSLATIONS[appLang] || UI_TRANSLATIONS.ar, [appLang]);

  useEffect(() => {
    localStorage.setItem('dt_sunlight', isSunlightMode.toString());
    document.documentElement.setAttribute('data-theme', isSunlightMode ? 'light' : 'dark');
    document.documentElement.setAttribute('lang', appLang);
    document.documentElement.setAttribute('dir', t.dir);
  }, [isSunlightMode, appLang, t.dir]);

  const [formData, setFormData] = useState<PromptFormData>({
    promptMode: 'image', template: TEMPLATES[0].id, designType: '', aspectRatio: ASPECT_RATIOS[0], purpose: '',
    style: '', font: '', palette: '', background: BACKGROUNDS[0], mood: MOODS[0],
    elements: ELEMENTS[0], technical: TECHNICALS[0], personType: 'Default', language: LANGUAGES[0],
    customDetails: '', mainText: '', mainTextPos: 'وسط', secondaryText: '', secondaryTextPos: '', videoMotion: '',
    useReferenceImage: false, forceEnglish: false, targetModel: AI_MODELS[0], useImageAsMainSource: false,
    onlyEnglishVisuals: false, exclusivePsychology: false,
    disableAutoText: true, visualText: '',
    anatomyType: ANATOMY_OPTIONS[0] 
  });

  const generate = async () => {
    if (!formData.mainText && formData.anatomyType === ANATOMY_OPTIONS[0]) return;
    setIsGenerating(true);
    setGeneratedPrompt("");
    setIsEditing(false);
    setActiveBracket(null);
    await new Promise(r => setTimeout(r, 4000));
    
    const isAnatomyMode = formData.anatomyType !== ANATOMY_OPTIONS[0];
    const coreSubject = isAnatomyMode ? formData.anatomyType : formData.mainText;
    
    /* V73.0 INCREMENTAL UPDATE: SUPREME-MEGA-VERBOSE ANATOMY REALISM PROTOCOL (64K) */
    const finalOutput = isAnatomyMode 
      ? generateDTMegaAnatomyPrompt(coreSubject)
      : `/* MASTER ARCHITECTURE | v73.0 PRO | DICELION-TECHNIQUE */\n` +
        `DicelionTechnique: TOPIC: ${coreSubject}\n` +
        `DicelionTechnique: SEARCH_FACTORY: MILLION_SYNTHESIS_ACTIVE\n\n` +
        `======================\nPROMPT CONSTRUCTION LAYER\n======================\n` +
        `[CENTRAL_SUBJECT]: { core: "${coreSubject}", engineering: "${formData.technical}" }\n` +
        `[ATMOSPHERIC_DATA]: { context: "${formData.background}", emotion: "${formData.mood}" }\n` +
        `\n======================\nProfessional Millionth Synthesis by Dicelion-Technique\n======================`;
      
    setOriginalPrompt(finalOutput);
    setGeneratedPrompt(finalOutput);
    setIsGenerating(false);
  };

  /* V73.0 ENHANCEMENT: DIRECT ANATOMY HANDLERS FOR BETTER UX & 4000 CHAR GENERATION */
  const handleAnatomyQuickCopy = async (anatomyOption: string) => {
    // Generate the internal Supreme Mega Anatomy Prompt directly
    const megaPrompt = generateDTMegaAnatomyPrompt(anatomyOption);
    const success = await executeSystemCopy(megaPrompt);
    if (success) alert(t.copied);
  };

  const handleAnatomyEditInLab = (anatomyOption: string) => {
    setFormData(p => ({ ...p, anatomyType: anatomyOption }));
    setActiveTab('create');
    setTimeout(() => {
        generate();
    }, 150);
  };

  const saveToHistory = () => {
    if (!generatedPrompt) return;
    const newSaved: SavedPrompt = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      fullPrompt: generatedPrompt,
      summary: formData.mainText || formData.anatomyType || "Untitled Project"
    };
    setHistory([newSaved, ...history]);
    localStorage.setItem('dt_history', JSON.stringify([newSaved, ...history]));
    alert(t.saved);
  };

  const performRealCopy = async (text: string) => {
    const success = await executeSystemCopy(text);
    if (success) alert(t.copied);
  };

  const SPECIALTIES_OPTIONS = useMemo(() => {
    return PRO_ULTRA_DB.map(i => i.ar);
  }, []);

  const filteredLibrary = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return PRO_ULTRA_DB.slice(0, 100);
    const numId = parseInt(q);
    if (!isNaN(numId) && numId > 0 && numId <= 1000000) {
        const item = getMillionthNeuralPrompt(numId, "بحث رقمي");
        return [{ ar: item.ar, en: item.en, cat: 'بحث رقمي', id: numId }];
    }
    const results = PRO_ULTRA_DB.filter(s => 
      s.ar.toLowerCase().includes(q) || s.en.toLowerCase().includes(q) || s.cat.toLowerCase().includes(q)
    );
    if (q.length > 0) {
      for (let i = 0; i < 200; i++) {
        const item = getMillionthNeuralPrompt(Math.floor(Math.random() * 1000000), q);
        results.push({ ar: item.ar, en: item.en, cat: q, id: item.id });
      }
    }
    return results.slice(0, 1000);
  }, [searchQuery]);

  const filteredAnatomy = useMemo(() => {
    const q = anatomySearch.trim().toLowerCase();
    // V73.0 PERFORMANCE PATCH: LIMITING SEARCH RESULTS TO 50 AS REQUESTED
    if (!q) return ANATOMY_OPTIONS.slice(1, 101);
    return ANATOMY_OPTIONS.filter((s, idx) => idx > 0 && s.toLowerCase().includes(q)).slice(0, 50);
  }, [anatomySearch]);

  const handleBracketInteraction = (e: React.MouseEvent, variableName: string, bracketId: number) => {
    if (!isEditing) return;
    e.preventDefault(); e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMenuPos({ top: rect.top + window.scrollY - 12, left: Math.min(rect.left + window.scrollX, window.innerWidth - 300) });
    setActiveBracket({ name: variableName, index: bracketId });
  };

  const parsePromptToJSX = (text: string, editMode: boolean) => {
    if (!text) return null;
    const regex = /(\[.*?\])|(\/\*.*?\*\/|DicelionTechnique:.*|تقنية ديسيليون:.*)/g;
    const parts = text.split(regex);
    let bracketCounter = 0;
    return parts.map((part, i) => {
      if (!part) return null;
      if (part.startsWith('[') && part.endsWith(']')) {
        const currentId = bracketCounter++;
        return <span key={i} contentEditable={editMode} suppressContentEditableWarning onClick={(e) => handleBracketInteraction(e, part, currentId)} className="text-emerald-500 font-black mx-1 border-b-2 border-emerald-500/20 bg-emerald-500/5 px-1 rounded cursor-help">{part}</span>;
      }
      if (part.startsWith('/*') || part.includes('DicelionTechnique:') || part.includes('تقنية ديسيليون:')) return <span key={i} className="text-sky-400 font-mono italic opacity-60 text-[10px] block">{part}</span>;
      return <span key={i} className="text-rose-500 font-bold">{part}</span>;
    });
  };

  return (
    <div className={`min-h-screen flex flex-col w-full ${t.dir}`}>
      <AIGlobalParticles isSunlight={isSunlightMode} />
      <nav className="nav-fixed-top glass-ui shadow-lg">
        <div className="max-w-xl mx-auto flex items-center justify-between w-full px-4">
             <NavIcon active={activeTab === 'create'} onClick={() => setActiveTab('create')} icon="🏠" label={t.tabs.home} />
             <NavIcon active={activeTab === 'anatomy'} onClick={() => setActiveTab('anatomy')} icon="🧬" label={t.tabs.anatomy} />
             <NavIcon active={activeTab === 'library'} onClick={() => setActiveTab('library')} icon="💎" label={t.tabs.library} />
             <NavIcon active={isSunlightMode} onClick={() => setIsSunlightMode(!isSunlightMode)} icon="☀️" label={t.tabs.sunlight} />
             <NavIcon active={activeTab === 'language'} onClick={() => setActiveTab('language')} icon="🌐" label={t.tabs.appLang} />
             <NavIcon active={activeTab === 'guide'} onClick={() => setActiveTab('guide')} icon="📖" label={t.tabs.guide} />
             <NavIcon active={activeTab === 'history'} onClick={() => setActiveTab('history')} icon="📜" label={t.tabs.history} />
             <NavIcon active={activeTab === 'about'} onClick={() => setActiveTab('about')} icon="👤" label={t.tabs.about} />
        </div>
      </nav>
      <header className="flex justify-center mb-6 mt-4"><Unified3DLogo isSunlight={isSunlightMode} /></header>
      <main className="pb-32">
        {activeTab === 'create' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-ui p-6 rounded-[2.5rem] space-y-4 shadow-sm">
                  <SelectBox label={t.labels.ratio} options={ASPECT_RATIOS} value={formData.aspectRatio} onChange={(e:any) => setFormData(p=>({...p, aspectRatio: e.target.value}))} />
                  <SelectBox label={t.labels.mood} options={MOODS} value={formData.mood} onChange={(e:any) => setFormData(p=>({...p, mood: e.target.value}))} />
                  <SelectBox label={t.labels.bg} options={BACKGROUNDS} value={formData.background} onChange={(e:any) => setFormData(p=>({...p, background: e.target.value}))} />
                  <WisdomBox isSunlight={isSunlightMode} label={t.labels.wisdomLabel} />
                  <div className="pt-4 border-t border-white/5 space-y-3">
                    <InputArea label={t.labels.visualTextLabel} value={formData.visualText} onChange={(e:any) => setFormData(p=>({...p, visualText: e.target.value}))} placeholder={t.placeholders.visualText} />
                    <CheckBox label={t.labels.disableAutoText} checked={formData.disableAutoText} onChange={(e:any) => setFormData(p=>({...p, disableAutoText: e.target.checked}))} />
                  </div>
              </div>
              <div className="glass-ui p-6 rounded-[2.5rem] space-y-4 shadow-sm">
                  <SelectBox label={t.labels.elements} options={ELEMENTS} value={formData.elements} onChange={(e:any) => setFormData(p=>({...p, elements: e.target.value}))} />
                  <SelectBox label={t.labels.tech} options={TECHNICALS} value={formData.technical} onChange={(e:any) => setFormData(p=>({...p, technical: e.target.value}))} />
                  <SelectBox label={t.labels.model} options={AI_MODELS} value={formData.targetModel} onChange={(e:any) => setFormData(p=>({...p, targetModel: e.target.value}))} />
                  <div className="pt-2 grid grid-cols-1 gap-2">
                    <CheckBox label={t.labels.exclusivePsychology} checked={formData.exclusivePsychology} onChange={(e:any) => setFormData(p=>({...p, exclusivePsychology: e.target.checked}))} />
                    <CheckBox label={t.labels.analyzeImage} checked={formData.useReferenceImage} onChange={(e:any) => setFormData(p=>({...p, useReferenceImage: e.target.checked}))} />
                  </div>
              </div>
            </div>
            <div className="glass-ui p-6 rounded-[3rem] space-y-4 shadow-md">
              <InputArea label={t.labels.text} value={formData.mainText} onChange={(e:any) => setFormData(p=>({...p, mainText: e.target.value}))} placeholder={t.placeholders.text} />
              <button onClick={generate} disabled={isGenerating} className={`relative overflow-hidden w-full py-5 rounded-full font-black uppercase shadow-xl transition-all bg-sky-600 text-white ${isGenerating ? 'bg-black' : 'hover:bg-sky-500 scale-[1.01]'}`}>
                {isGenerating ? <HackerAnalyzerLoader isSunlight={isSunlightMode} /> : t.generateBtn}
              </button>
            </div>
            {generatedPrompt && (
              <div className="glass-ui p-8 rounded-[3rem] space-y-4 animate-in slide-in-from-bottom shadow-2xl border-sky-500/20">
                 <div ref={editorRef} className={`p-7 dt-editor-dark-layer rounded-[2rem] text-[13px] font-mono leading-relaxed overflow-hidden border shadow-inner min-h-[150px] outline-none transition-all ${isEditing ? 'is-editing ring-2 ring-sky-500/50 scale-[1.01]' : 'is-viewing border-white/5'}`}>
                   {parsePromptToJSX(generatedPrompt, isEditing)}
                 </div>
                 <div className="flex flex-wrap gap-2">
                    <button onClick={() => performRealCopy(editorRef.current?.innerText || generatedPrompt)} className="flex-1 py-4 bg-sky-600 text-white rounded-2xl font-black text-xs uppercase shadow-lg hover:bg-sky-500 transition-all">{t.copyPromptBtn}</button>
                    <button onClick={() => setIsEditing(!isEditing)} className="flex-1 py-4 glass-ui text-sky-400 rounded-2xl font-black text-xs uppercase shadow-lg">{isEditing ? '✓ حفظ' : t.editBtn}</button>
                    <button onClick={saveToHistory} className="flex-1 py-4 glass-ui text-sky-400 rounded-2xl font-black text-xs uppercase">{t.saveBtn}</button>
                 </div>
              </div>
            )}
          </div>
        )}
        {activeTab === 'anatomy' && (
          <div className="space-y-6 pb-12 animate-in fade-in">
             <div className="glass-ui p-6 rounded-[2.5rem] shadow-sm space-y-4">
               {/* V73.0 PERFORMANCE PATCH: LIMITING SELECTBOX TO 100 OPTIONS TO PREVENT LAGGING */}
               <SelectBox label={t.labels.anatomy} options={ANATOMY_OPTIONS.slice(0, 101)} value={formData.anatomyType} onChange={(e:any) => setFormData(p=>({...p, anatomyType: e.target.value}))} />
               <div className="h-14 rounded-full flex items-center px-6 border border-[var(--input-border)] bg-[var(--input-bg)]">
                  <span className="mr-2 opacity-50">🧬</span>
                  <input type="text" placeholder={t.placeholders.anatomySearch} className="bg-transparent flex-1 outline-none font-bold text-sm text-[var(--input-text)]" value={anatomySearch} onChange={(e) => setAnatomySearch(e.target.value)} />
               </div>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredAnatomy.map((s, idx) => (
                   <div key={idx} className="p-7 glass-ui rounded-[2.5rem] flex flex-col shadow-sm border-sky-500/5 hover:border-sky-500/20 transition-all group animate-in slide-in-from-bottom-2">
                      <span className="text-[9px] font-black uppercase text-sky-500 mb-2 group-hover:tracking-widest transition-all">التشريح الذكي | {s.split(' – ')[0]}</span>
                      <p className="text-[13px] font-bold leading-tight flex-grow text-[var(--text-main)] mb-6 overflow-hidden line-clamp-2">{s.split(' – ')[1] || s}</p>
                      <div className="mt-auto flex gap-2 relative z-[50]">
                        <button 
                            type="button"
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAnatomyQuickCopy(s); }} 
                            className="flex-1 py-3 text-[11px] font-black border border-sky-500/50 rounded-xl hover:bg-sky-500/10 transition-all text-sky-500 flex items-center justify-center min-h-[45px] pointer-events-auto cursor-pointer"
                        >
                            {t.quickCopy}
                        </button>
                        <button 
                            type="button"
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAnatomyEditInLab(s); }} 
                            className="flex-1 py-3 rounded-xl text-[11px] font-black bg-sky-600 text-white shadow-md hover:bg-sky-500 transition-all flex items-center justify-center min-h-[45px] pointer-events-auto cursor-pointer"
                        >
                            {t.editInStudio}
                        </button>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        )}
        {activeTab === 'library' && (
          <div className="space-y-6 pb-12 animate-in fade-in">
             <div className="glass-ui p-6 rounded-[2.5rem] shadow-sm space-y-4">
               <SelectBox label={t.labels.quickSearch} options={SPECIALTIES_OPTIONS} value={searchQuery} onChange={(e: any) => setSearchQuery(e.target.value)} />
               <div className="h-14 rounded-full flex items-center px-6 border border-[var(--input-border)] bg-[var(--input-bg)]">
                  <span className="mr-2 opacity-50">🔍</span>
                  <input type="text" placeholder={t.placeholders.search} className="bg-transparent flex-1 outline-none font-bold text-sm text-[var(--input-text)]" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
               </div>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredLibrary.map((s, idx) => (
                   <div key={idx} className="p-7 glass-ui rounded-[2.5rem] flex flex-col shadow-sm border-sky-500/5 hover:border-sky-500/20 transition-all group animate-in slide-in-from-bottom-2">
                      <span className="text-[9px] font-black uppercase text-sky-500 mb-2 group-hover:tracking-widest transition-all">{s.cat} | #{s.id}</span>
                      <p className="text-[13px] font-bold leading-tight flex-grow text-[var(--text-main)] mb-6 overflow-hidden line-clamp-2">{s.ar}</p>
                      <div className="mt-auto flex gap-2">
                        <button onClick={() => performRealCopy(s.en)} className="flex-1 py-3 text-[11px] font-black border border-sky-500/50 rounded-xl hover:bg-white/5 transition-all text-sky-500 !opacity-100 flex items-center justify-center min-h-[45px] z-30">{t.quickCopy}</button>
                        <button onClick={() => { setFormData(p => ({...p, mainText: s.en})); setActiveTab('create'); }} className="flex-1 py-3 rounded-xl text-[11px] font-black bg-sky-600 text-white shadow-md hover:bg-sky-500 transition-all !opacity-100 flex items-center justify-center min-h-[45px] z-30">{t.editInStudio}</button>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        )}
        {activeTab === 'history' && (
          <div className="space-y-6 pb-12 animate-in fade-in">
            <div className="glass-ui p-8 rounded-[3rem] shadow-xl text-center space-y-6">
                <h3 className="text-xl font-black text-sky-500 uppercase tracking-widest">{t.history.title}</h3>
                {history.map(item => (
                  <div key={item.id} className="p-6 rounded-[2rem] glass-ui border-sky-500/10 text-start">
                    <span className="text-[10px] font-black text-sky-500">{item.date}</span>
                    <p className="text-xs font-bold truncate text-[var(--text-main)]">{item.summary}</p>
                    <button onClick={() => performRealCopy(item.fullPrompt)} className="w-full mt-2 py-2 bg-sky-600/20 text-sky-400 rounded-xl text-[10px] font-black">نسخ الكل</button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </main>
      <footer className="fixed bottom-0 w-full glass-ui p-3 text-center z-[10000]">
        <span className="text-[8px] font-black opacity-20 uppercase tracking-[0.5em]">DicelionTechnique Millionth Synthesis V73.0 PRO</span>
      </footer>
    </div>
  );
};

const SelectBox = ({ label, options, value, onChange }: any) => (
  <div className="space-y-1 w-full text-start">
    <label className="text-[9px] font-black text-sky-500 uppercase px-1">{label}</label>
    <select value={value} onChange={onChange} className="w-full select-element outline-none cursor-pointer">
        <option value="">{label}</option>
        {options.map((o: string, i: number) => <option key={i} value={o}>{o}</option>)}
    </select>
  </div>
);

const CheckBox = ({ label, checked, onChange }: any) => (
  <label className="flex items-center gap-3 p-4 rounded-2xl glass-ui cursor-pointer group hover:bg-white/5 transition-all">
    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${checked ? 'bg-sky-500 border-sky-400' : 'border-white/10'}`}>
       {checked && <span className="text-white text-[12px]">✓</span>}
    </div>
    <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
    <span className={`text-[11px] font-bold transition-colors ${checked ? 'text-sky-500 font-black' : 'text-[var(--text-muted)]'}`}>{label}</span>
  </label>
);

const InputArea = ({ label, value, onChange, placeholder }: any) => (
  <div className="space-y-1 w-full text-start">
    <label className="text-[9px] font-black text-sky-500 uppercase px-1">{label}</label>
    <textarea value={value} onChange={onChange} placeholder={placeholder} className="w-full h-36 textarea-element outline-none resize-none leading-relaxed" />
  </div>
);

const NavIcon = ({ active, icon, onClick, label }: any) => (
  <div className="flex flex-col items-center">
    <button onClick={onClick} className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${active ? 'bg-sky-500 text-white shadow-lg scale-110' : 'bg-white/5 text-slate-400 border border-white/10 hover:border-sky-500/30'}`}><span className="text-xl">{icon}</span></button>
    <span className={`mt-1 text-[8px] font-black uppercase tracking-tighter ${active ? 'text-sky-500 opacity-100' : 'opacity-40'}`}>{label}</span>
  </div>
);

export default App;
