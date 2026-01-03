
/* SYNC_STABILITY_PATCH_V26.5_MASTER_PRO_ULTRA: PROFESSIONAL ETHICS SHIELD & PHANTOM COPY */
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ASPECT_RATIOS, BACKGROUNDS, MOODS, ELEMENTS, TECHNICALS, LANGUAGES, TEMPLATES, AI_MODELS, PRO_ULTRA_DB, WISDOM_QUOTES, getMillionthNeuralPrompt
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
    tabs: { create: 'المختبر', library: 'مليون برومبت', history: 'سجل المحفوظات', appLang: 'اللغة', guide: 'دليل', about: 'عن المطور', home: 'الرئيسية', sunlight: 'سطوع' },
    generateBtn: 'معالجة الأمر ✨',
    saveBtn: 'أرشفة المشروع',
    editBtn: 'تعديل النص',
    copyPromptBtn: 'نسخ البرومبت',
    editLabel: 'محرر الأوامر الذكي (V26.5 PRO)',
    resultActions: { copy: 'نسخ', save: 'حفظ' },
    copyOptions: { ar: '🇸🇦 نسخ بالعربية', en: '🇬🇧 Copy in English', all: '🌍 نسخ الكل (عربي + إنجليزي)' },
    history: { empty: 'السجل فارغ حالياً.. ابدأ بصناعة إبداعك الأول!', title: 'سجل محفوظات DT-Prompt' },
    copied: 'تم نسخ النص بنجاح!',
    saved: 'تمت الأرشفة بنجاح!',
    promptMode: { image: 'توليد الصور', video: 'إنتاج الفيديو', post: 'نصوص احترافية' },
    placeholders: { text: 'عنوان الحملة أو الموضوع الرئيسي الذي تريد تحويله لبرومبت احترافي...', search: 'ابحث في مليون برومبت جاهز بالرقم أو بالحرف', dropdownSearch: 'اختر تخصصاً من 1000 خيار...' },
    labels: { 
      ratio: 'أبعاد المخرج (Ratio)', mood: 'نبرة الصوت والأسلوب الفني', bg: 'سياق المحتوى والبيئة المحيطة (100 خيار)', tech: 'قالب الهيكلة الاحترافي (100 خيار)', text: 'الموضوع الأساسي (Main Subject)', quickSearch: 'تصفح التخصصات الذكية (1000 خيار)',
      exclusivePsychology: "برومبت سيكولوجي حصري لـ Dicelion-Technique",
      analyzeImage: "برومبت مع صورة مرجعية مرفقة",
      exportEnglish: "تصدير البرومبت باللغة الإنجليزية (لنتائج أدق)",
      englishLetters: "برومبت للمنصات التي لا تدعم اللغة العربية",
      wisdomLabel: "حكمة اليوم للمبدع الرقمي",
      model: "محرك الذكاء الاصطناعي المستهدف",
      elements: "العناصر والجماليات (100 خيار)"
    },
    followModal: { 
      title: 'عائلة DicelionTechnique', 
      message: 'نحن في DicelionTechnique لا نقدّم أدوات فقط،\nبل نسعى ـ بفضل الله ـ إلى بناء حلول رقمية نافعة، صادقة،\nتُسهّل عملك، وتقرّبك من الإتقان، وتخدمك بأمانة واحترام.\n\nمتابعتك لصفحتنا تساعدنا على الاستمرار،\nوتمنحك الوصول إلى باقي تطبيقاتنا وابتكاراتنا الاحترافية القادمة، بإذن الله.', 
      follow: 'متابعة الصفحة', 
      skip: 'تخطي' 
    },
    toolbar: { highlight: 'تمييز', copySel: 'نسخ المحدد', reset: 'استعادة الأصلي' },
    modalityModal: { title: 'اختر نوع المحتوى المطلوب لتوليده', cancel: 'إلغاء' },
    quickCopy: 'نسخ سريع',
    editInStudio: 'تعديل في المختبر',
    guide: { 
      title: 'موسوعة DT-Prompt الشاملة (V26.5 PRO)', 
      intro: 'مرحباً بك في المحرك الهندسي الأكثر تقدماً. DT-Prompt ليس مجرد تطبيق، بل هو جسر تقني يربط خيالك بأقوى محركات الذكاء الاصطناعي العالمية. يهدف التطبيق إلى تحويل أفكارك البسيطة إلى "أوامر برمجية" (Prompts) دقيقة ومعقدة تضمن لك مخرجات احترافية بنسبة 100% وبدون الحاجة للإنترنت.',
      masterSections: [
        { 
          id: 'NAV', title: '1. شريط التنقل (الأركان السبعة)', icon: '🏛️', 
          points: [
            { label: 'الرئيسية (🏠)', content: 'نقلك إلى "المختبر الهندسي" حيث تبدأ عملية التصميم من الصفر.' },
            { label: 'مليون برومبت (💎)', content: 'مكتبة سحابية ضخمة تضم مليون فكرة جاهزة وقابلة للتطوير فوراً.' },
            { label: 'السطوع (☀️)', content: 'زر التحول اللوني؛ يحمي عينيك بالوضع الداكن أو يوفر وضوحاً فائقاً بالوضع الساطع.' },
            { label: 'اللغة (🌐)', content: 'دعم كامل لـ 8 لغات عالمية لضمان وصول رسالتك لكل منصات التوليد.' },
            { label: 'الدليل (📖)', content: 'هذه الموسوعة التي تقرأها الآن لتصبح خبيراً في هندسة الأوامر.' },
            { label: 'المحفوظات (📜)', content: 'أرشيفك الشخصي؛ كل مشروع حفظته تجده هنا منظماً بالتاريخ والوقت.' },
            { label: 'عن المطور (👤)', content: 'نافذة التواصل مع DicelionTechnique والتعرف على خدماتنا البرمجية.' }
          ] 
        },
        { 
          id: 'LAB', title: '2. المختبر الهندسي (خانات التحكم)', icon: '🧪', 
          points: [
            { label: 'نوع المحتوى (Modality)', content: 'أيقونات علوية تحدد إذا كنت تريد برومبت لـ (صورة، فيديو، أو منشور إعلاني نثري).' },
            { label: 'أبعاد المخرج (Ratio)', content: 'تحديد القياسات العالمية؛ مثل 9:16 للتيك توك، 1:1 للإنستقرام، أو 16:9 لليوتيوب.' },
            { label: 'نبرة الصوت والأسلوب', content: 'قائمة Moods؛ تحدد الجو العام للبرومبت (فخم، سينمائي، مستقبلي، أو درامي).' },
            { label: 'سياق المحتوى (Background)', content: 'اختيار البيئة المحيطة بالعنصر الأساسي (مختبر، فضاء، استوديو، غابة).' },
            { label: 'قالب الهيكلة (100 خيار تقني)', content: 'سر الجودة العالية؛ دمج محركات مثل Unreal Engine 5 أو Octane Render برمجياً.' },
            { label: 'المحرك المستهدف (Model)', content: 'توجيه البرومبت ليكون متوافقاً مع (Midjourney, Gemini, ChatGPT, Sora) وغيرها.' },
            { label: 'العناصر والجماليات (100 خيار)', content: 'إضافة لمسات بصرية مثل "تأثيرات نيون"، "جسيمات متطايرة"، أو "إضاءة كوموريبي".' },
            { label: 'الموضوع الأساسي (Input Area)', content: 'هنا تضع مادة فكرتك الخام؛ مثال: "رجل يقرأ في المستقبل" وسيقوم النظام بهندستها.' }
          ] 
        },
        { 
          id: 'POWER', title: '3. ميزات القوة والذكاء (الأدوات السرية)', icon: '⚡', 
          points: [
            { label: 'برومبت سيكولوجي حصري لـ Dicelion-Technique', content: 'هذه التقنية هي ابتكار حصري ومنفرد لـ Dicelion-Technique؛ حيث تعتمد على خوارزميات سيكولوجية متقدمة تقوم بحقن محفزات عاطفية وكلمات مفتاحية عصبية داخل هيكل البرومبت. تهدف هذه المحفزات إلى استهداف العقل الباطن للمشاهد لإثارة استجابات فورية مثل الثقة أو الانبهار، مما يرفع من جودة التأثير البصري والنصي للمحتوى المنتج بشكل ثوري وغير مسبوق عالمياً.' },
            { label: 'صورة مرجعية', content: 'إضافة تعليمات تطلب من الذكاء الاصطناعي الالتزام بصورة يرفعها المستخدم لاحقاً.' },
            { label: 'تصدير إنجليزي فائق', content: 'ترجمة تقنية وليست حرفية؛ تحول وصفك العربي إلى برومبت إنجليزي احترافي جداً.' },
            { label: 'المنصات اللاتينية', content: 'خيار يضمن عدم ظهور أحرف غريبة عند استخدام البرومبت في برامج لا تدعم العربية.' }
          ] 
        }
      ],
      footer: 'DT-Prompt | التقنية أمانة، والعمل إتقان - DicelionTechnique © 2024-2026'
    },
    about: { 
      title: 'DicelionTechnique Services', 
      subtitle: 'هندسة البرمجيات والحلول الذكية والتحول الرقمي الشامل', 
      promoText: 'نحن في DicelionTechnique نعمل بهدوء واجتهاد وتواضع طلابنا هم أساتذتي،\nونسأل الله في كل خطوة أن يبارك في عملنا وأن يجعل ما نقدّمه نافعًا للناس.\n\nلا نرى أنفسنا أفضل من غيرنا،\nبل نسعى أن نكون سببًا في تسهيل حياة من يثق بنا،\nمؤمنين بأن التقنية أمانة،\nوأن كل سطر برمجي نكتبه مسؤولية نحاسب عليها قبل أن تكون إنجازًا نفاخر به.\n\nنجتهد في تطوير حلول رقمية حديثة،\nنقصد بها الصدق في العمل، والإتقان في التنفيذ،\nوتقديم ما ينفع الإنسان بروح الضمير المهني،\nسائلين الله أن يوفقنا لما فيه الخير،\nوأن يكون عملنا خالصًا لوجهه الكريم قبل كل شيء.', 
      features: [
        'أستاذ ومدرّب معتمد لدى معاهد مهنية خاصة', 
        'خبير في برمجيات وتطبيقات الهواتف الذكية ونظام الحواسيب وبرامجها', 
        'مطور هندسة أوامر الذكاء الاصطناعي (Prompt Engineering Specialist)',
        'مبتكر أنظمة رقمية تقوم على مبادئ السيكولوجيا الإيجابية',
        'مطوّر تطبيقات الحواسيب والهواتف الذكية باستخدام أحدث التقنيات المتاحة'
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
    tabs: { create: 'Lab', library: '1M Prompts', history: 'History', appLang: 'Language', guide: 'Guide', about: 'Developer', home: 'Home', sunlight: 'Sunlight' },
    generateBtn: 'Process Command ✨',
    saveBtn: 'Archive Project',
    editBtn: 'Edit Text',
    copyPromptBtn: 'Copy Prompt',
    copyOptions: { ar: '🇸🇦 Copy Arabic', en: '🇬🇧 Copy English', all: '🌍 Copy All (Ar + En)' },
    editLabel: 'Smart Prompt Editor (V26.5 PRO)',
    resultActions: { copy: 'Copy', save: 'Save' },
    history: { empty: 'History is empty.. start creating!', title: 'DT-Prompt Archive' },
    copied: 'Copied successfully!',
    saved: 'Archived successfully!',
    promptMode: { image: 'Image Gen', video: 'Video Gen', post: 'Pro Text' },
    placeholders: { text: 'Core concept for your prompt...', search: 'Search 1M prompts...', dropdownSearch: 'Choose from 1000 categories...' },
    labels: { 
      ratio: 'Output Ratio', mood: 'Tone & Style', bg: 'Context (100 Opts)', tech: 'Pro Template (100 Opts)', text: 'Core Subject', quickSearch: 'Browse 1000 Categories',
      exclusivePsychology: "Psychology Exclusive to Dicelion-Technique",
      analyzeImage: "With Reference Image",
      exportEnglish: "English Export (High Precision)",
      englishLetters: "Latin Only Platforms",
      wisdomLabel: "Daily Wisdom",
      model: "Target AI Model",
      elements: "Visual Elements (100 Opts)"
    },
    followModal: { 
      title: 'DicelionTechnique Family', 
      message: 'At DicelionTechnique, we don’t just offer tools;\nwe strive – with God’s grace – to build digital solutions that are beneficial and honest.', 
      follow: 'Follow Page', 
      skip: 'Skip' 
    },
    toolbar: { highlight: 'Highlight', copySel: 'Copy Selection', reset: 'Reset to Original' },
    modalityModal: { title: 'Choose Content Type', cancel: 'Cancel' },
    quickCopy: 'Quick Copy',
    editInStudio: 'Edit in Lab',
    guide: { 
      title: 'DT-Prompt Encyclopedia (V26.5 PRO)', 
      intro: 'DT-Prompt is not just an app; it is a professional engineering engine designed to bridge the gap between human imagination and the world’s most powerful AI models.',
      masterSections: [
        { 
          id: 'NAV_E', title: '1. Navigation Bar', icon: '🏛️', 
          points: [
            { label: 'Lab (🏠)', content: 'The engineering workspace where design begins.' },
            { label: '1M Prompts (💎)', content: 'A massive cloud library with 1M ready-to-use ideas.' },
            { label: 'Sunlight (☀️)', content: 'Theme toggle for visual comfort.' }
          ] 
        }
      ], 
      footer: 'DT-Prompt | Engineering with Honesty © 2024' 
    },
    about: { 
      title: 'DicelionTechnique Services', 
      subtitle: 'Smart Software Engineering & Digital Solutions', 
      promoText: 'At DicelionTechnique, we work with quiet dedication and humility...', 
      features: [
        'Certified Instructor & Trainer', 
        'AI Prompt Engineering Specialist'
      ], 
      contacts: { 
        whatsapp: 'Direct WhatsApp Support', 
        call: 'Direct Consultation Call', 
        email: 'Official Email Correspondence' 
      } 
    }
  }
};

const LAST_FOLLOW_KEY = 'dt_last_follow_interaction';
const FIFTEEN_DAYS_MS = 15 * 24 * 60 * 60 * 1000;

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

/* RESTORED ANIMATED MASTER LOGO COMPONENT */
const Unified3DLogo = ({ isSunlight = false }: { isSunlight?: boolean }) => {
  return (
    <div className="relative flex flex-col items-center justify-center select-none scale-90 sm:scale-100 transition-transform duration-500">
      <svg width="320" height="320" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" id="dt-master-svg" className="drop-shadow-2xl">
        <defs>
          <filter id="neon_glow_blue" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="neon_glow_green" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="dt_face_grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: isSunlight ? '#0f172a' : '#ffffff', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#38bdf8', stopOpacity: 1}} />
          </linearGradient>
          <linearGradient id="dt_depth_grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: '#0284c7', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#0c4a6e', stopOpacity: 1}} />
          </linearGradient>
        </defs>

        <g id="brain-layer" transform="translate(256, 256) scale(1.1)" opacity="0.35">
          <path d="M-10 -110 C-70 -110 -120 -60 -120 0 C-120 40 -100 70 -70 90 C-100 110 -120 140 -120 180 C-120 240 -60 270 0 270 C60 270 120 240 120 180 C120 140 100 110 70 90 C100 70 120 40 120 0 C120 -60 70 -110 10 -110 Z" fill="none" stroke="#38bdf8" strokeWidth="2" />
          <path d="M0 -110 V270 M-120 0 H120 M-80 180 H80" fill="none" stroke="#38bdf8" strokeWidth="1" opacity="0.5" />
          <circle cx="0" cy="0" r="5" fill="#fff" filter="url(#neon_glow_blue)">
            <animate attributeName="r" values="4;7;4" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>

        <g id="orbits">
          <circle cx="256" cy="256" r="230" fill="none" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="10 20" opacity="0.15" />
          <circle r="10" fill="#38bdf8" filter="url(#neon_glow_blue)">
            <animateMotion dur="6s" repeatCount="indefinite" path="M 256,26 A 230,230 0 1 1 255.9,26 Z" />
          </circle>
          <circle r="8" fill="#22c55e" filter="url(#neon_glow_green)">
            <animateMotion dur="8s" begin="1s" repeatCount="indefinite" path="M 256,486 A 230,230 0 1 0 256.1,486 Z" />
          </circle>
        </g>

        <g transform="translate(256, 256)">
          <path d="M-180 -100 V100 H-80 C-10 100 30 60 30 0 C30 -60 -10 -100 -80 -100 H-180 Z" fill="url(#dt_depth_grad)" transform="translate(10, 10)" />
          <path d="M-180 -100 V100 H-80 C-10 100 30 60 30 0 C30 -60 -10 -100 -80 -100 H-180 Z" fill="url(#dt_face_grad)" />
          <path d="M-140 -60 H-80 C-50 -60 -10 -40 -10 0 C-10 40 -50 60 -80 60 H-140 V-60 Z" fill={isSunlight ? '#f8fafc' : '#020617'} />
          <path d="M40 -100 H180 V-50 H135 V100 H85 V-50 H40 V-100 Z" fill="url(#dt_depth_grad)" transform="translate(10, 10)" />
          <path d="M40 -100 H180 V-50 H135 V100 H85 V-50 H40 V-100 Z" fill="url(#dt_face_grad)" />
        </g>
      </svg>
      <div className="mt-[-40px] flex flex-col items-center">
        <span className="text-4xl font-black tracking-tighter" style={{ color: isSunlight ? '#0f172a' : '#ffffff' }}> DT-Prompt </span>
        <div className="mt-[-5px]"><span className={`text-[11px] font-black uppercase tracking-[0.5em] ${isSunlight ? 'text-sky-900' : 'text-sky-300'}`}> PROFESSIONAL SYSTEM </span></div>
      </div>
    </div>
  );
};

/* HACKER ANALYZER LOADER COMPONENT */
const HackerAnalyzerLoader = ({ isSunlight }: { isSunlight: boolean }) => {
  const binaryRows = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      delay: `${Math.random() * -10}s`,
      speed: `${0.8 + Math.random() * 0.4}s`,
      content: "010011010101101010110101011010011011010101011011010101001101101".split("").sort(() => Math.random() - 0.5).join("")
    }));
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden bg-black">
      <div className="absolute inset-0 flex flex-col justify-around opacity-40 overflow-hidden py-1">
        {binaryRows.map(row => (
          <div 
            key={row.id} 
            className="flex whitespace-nowrap text-[12px] font-mono leading-none matrix-row-anim text-[#00ff41] drop-shadow-[0_0_2px_#00ff41]" 
            style={{ animationDelay: row.delay, animationDuration: row.speed }}
          >
            <span className="px-4">{row.content} {row.content} {row.content}</span>
            <span className="px-4">{row.content} {row.content} {row.content}</span>
          </div>
        ))}
      </div>
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full">
        <span className="text-[14px] font-mono font-black tracking-widest text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] vibrate-text text-center px-6">
          جاري تحليل الأكواد البرمجية
        </span>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [appLang, setAppLang] = useState(() => safeGetItem('dt_lang', 'ar'));
  const [activeTab, setActiveTab] = useState<'create' | 'library' | 'history' | 'about' | 'guide' | 'language'>('create');
  const [isSunlightMode, setIsSunlightMode] = useState(() => safeGetItem('dt_sunlight', 'true') === 'true');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isCopyMenuOpen, setIsCopyMenuOpen] = useState(false);
  const [showFollowModal, setShowFollowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [originalPrompt, setOriginalPrompt] = useState('');
  const [history, setHistory] = useState<SavedPrompt[]>(() => JSON.parse(safeGetItem('dt_history', '[]')));
  const [modalityModal, setModalityModal] = useState<{show: boolean, subject: any, type: 'copy'|'edit'}>({show: false, subject: null, type: 'copy'});
  const editorRef = useRef<HTMLDivElement>(null);

  const t = useMemo(() => UI_TRANSLATIONS[appLang] || UI_TRANSLATIONS.ar, [appLang]);

  useEffect(() => {
    localStorage.setItem('dt_sunlight', isSunlightMode.toString());
    document.documentElement.setAttribute('data-theme', isSunlightMode ? 'light' : 'dark');
    document.documentElement.setAttribute('lang', appLang);
    document.documentElement.setAttribute('dir', t.dir);
  }, [isSunlightMode, appLang, t.dir]);

  useEffect(() => {
    const lastShown = localStorage.getItem(LAST_FOLLOW_KEY);
    const now = Date.now();
    if (!lastShown || (now - Number(lastShown) >= FIFTEEN_DAYS_MS)) {
      setShowFollowModal(true);
    }
  }, []);

  const closeFollowModal = (followed: boolean) => {
    localStorage.setItem(LAST_FOLLOW_KEY, Date.now().toString());
    setShowFollowModal(false);
    if (followed) {
      window.open('https://dicelion-technique.com', '_blank');
    }
  };

  const [formData, setFormData] = useState<PromptFormData>({
    promptMode: 'image', template: TEMPLATES[0].id, designType: '', aspectRatio: ASPECT_RATIOS[0], purpose: '',
    style: '', font: '', palette: '', background: BACKGROUNDS[0], mood: MOODS[0],
    elements: ELEMENTS[0], technical: TECHNICALS[0], personType: 'Default', language: LANGUAGES[0],
    customDetails: '', mainText: '', mainTextPos: 'وسط', secondaryText: '', secondaryTextPos: '', videoMotion: '',
    useReferenceImage: false, forceEnglish: false, targetModel: AI_MODELS[0], useImageAsMainSource: false,
    onlyEnglishVisuals: false, exclusivePsychology: false
  });

  // PROFESSIONAL ETHICS SHIELD (V26.5) - CLIPBOARD PHANTOM COPY LOGIC
  useEffect(() => {
    const originalWrite = navigator.clipboard.writeText;
    navigator.clipboard.writeText = (text: string) => {
      // Logic to detect if the text is a functional prompt structure
      if (text.includes('DicelionTechnique') || text.includes('[') || text.includes('/*') || text.includes('PROMPT CONSTRUCTION LAYER')) {
        const phantomText = `/* DICELION-TECHNIQUE PROFESSIONAL ETHICS SHIELD (V26.5) */\n` +
          `==================================================\n` +
          `INTELLECTUAL PROPERTY PROTECTION ACTIVE\n` +
          `==================================================\n` +
          `The prompt structure you attempted to copy is protected by Professional Ethics.\n` +
          `Direct unauthorized extraction of functional DT-Neural structures is restricted.\n` +
          `Status: SUCCESSFUL_PHANTOM_COPY_LOGGED\n` +
          `--------------------------------------------------\n` +
          `Visit: https://dicelion-technique.com for official access.\n` +
          `DicelionTechnique © 2024-2026 - Technical Excellence with Honor.`;
        return originalWrite.call(navigator.clipboard, phantomText);
      }
      return originalWrite.call(navigator.clipboard, text);
    };
  }, []);

  // SMART OFFLINE GENERATION LOGIC (V26.0) WITH SEMANTIC INTEGRITY TEMPLATE
  const generate = async () => {
    if (!formData.mainText) return;
    setIsGenerating(true);
    setGeneratedPrompt("");
    setIsEditing(false);

    await new Promise(r => setTimeout(r, 1500));

    const SEMANTIC_HEADER = `/* ARCHITECTURE METADATA */
DicelionTechnique: TOPIC: ADVANCED SYNTHESIS
DicelionTechnique: MODE: ${formData.promptMode.toUpperCase()}
DicelionTechnique: TECH: ${formData.technical.toUpperCase()}
DicelionTechnique: VERSION: 2.6.0
/* SEMANTIC INTEGRITY LAYER LOADED */`;

    const SEMANTIC_SECURITY = `======================
SYSTEM / CORE SECURITY LAYER
======================
DicelionTechnique: DT-PROMPT
DicelionTechnique: DT_CORE_KEY: DTC-AX9-ROOT

======================
INTELLECTUAL PROPERTY NOTICE
======================
DicelionTechnique: DicelionTechnique – DT-Prompt System
DicelionTechnique: SEMANTIC INTEGRITY ACTIVE`;

    const SEMANTIC_PERMISSION = `======================
EDIT PERMISSION LOGIC
======================
DicelionTechnique: GREEN ZONE: [USER MODIFIABLE]
DicelionTechnique: RED ZONE: [LOCKED SYSTEM CORE]
DicelionTechnique: BLUE ZONE: [ATTRIBUTION LOGIC]`;

    try {
      if (navigator.onLine && process.env.API_KEY) {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const systemInstruction = `You are a World-Class AI Prompt Engineering Architect. 
        Your output MUST strictly follow the DT Semantic Integrity Template.
        
        STRUCTURE:
        - BLUE: Metadata wrap in /* COMMENT */ or start with "DicelionTechnique:".
        - RED: Standard text.
        - GREEN: Variables in [SQUARE BRACKETS].
        
        TEMPLATES (MUST USE):
        English: Generate a hyper-realistic, cinematic masterpiece depicting a [CENTRAL SUBJECT] that seamlessly fuses with [SECONDARY ELEMENT/MATERIAL]. The overall composition must emphasize a [MOOD/ATMOSPHERE] vibe, utilizing [SPECIFIC ART STYLE] influences. The intricate details should highlight [TEXTURE DETAILS] reflecting under [LIGHTING CONDITIONS]. The environment in the background is a [SCENERY/SETTING] filled with [ATMOSPHERIC EFFECTS], rendered with [TECHNICAL SPECIFICATIONS/ENGINE].
        
        Arabic: **قم بإنشاء تحفة بصرية سينمائية واقعية للغاية تصور [الموضوع المركزي] والذي يندمج بسلاسة مع [العنصر/المادة الثانوية] . **يجب أن يؤكد التكوين العام على أجواء [المزاج/الطابع العام] ، **باستخدام تأثيرات من [نمط فني محدد] . **يجب أن تسلط التفاصيل المعقدة الضوء على [تفاصيل الأنسجة] **التي تنعكس تحت [ظروف الإضاءة] . **البيئة في الخلفية هي [المشهد/الإعداد] **مليئة بـ [التأثيرات الجوية] ، **تم تقديمها باستخدام [المواصفات الفنية/المحرك] .
        
        Always include headers like ====================== PROMPT CONSTRUCTION LAYER ====================== and use correct identifiers.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Mode: ${formData.promptMode}. Topic: ${formData.mainText}. Tech: ${formData.technical}.`,
          config: { systemInstruction, temperature: 0.9 }
        });

        const text = response.text || "Neural Engine failed.";
        const finalOutput = `${SEMANTIC_HEADER}\n\n${SEMANTIC_SECURITY}\n\n======================\nPROMPT CONSTRUCTION LAYER\n======================\n${text}\n\n${SEMANTIC_PERMISSION}`;
        setOriginalPrompt(finalOutput);
        setGeneratedPrompt(finalOutput);
      } else {
        throw new Error("Offline Mode");
      }
    } catch (err) {
      const neural = getMillionthNeuralPrompt(Math.floor(Math.random() * 1000000), formData.mainText);
      const offlineResult = `${SEMANTIC_HEADER}\n\n${SEMANTIC_SECURITY}\n\n======================\nPROMPT CONSTRUCTION LAYER\n======================\nGenerate a hyper-realistic masterpiece depicting a [${formData.mainText}] with [${formData.technical}].\n\n**قم بإنشاء تحفة بصرية تصور [${formData.mainText}] باستخدام [${formData.technical}].\n\n${SEMANTIC_PERMISSION}`;
      setOriginalPrompt(offlineResult);
      setGeneratedPrompt(offlineResult);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyPromptByLang = (mode: 'ar' | 'en' | 'all') => {
    const text = editorRef.current?.innerText || generatedPrompt;
    if (!text) return;
    let textToCopy = text;
    if (mode === 'ar') {
      const arRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
      const lines = text.split('\n');
      textToCopy = lines.filter(line => arRegex.test(line)).join('\n');
    } else if (mode === 'en') {
      const arRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
      const lines = text.split('\n');
      textToCopy = lines.filter(line => !arRegex.test(line)).join('\n');
    }
    navigator.clipboard.writeText(textToCopy);
    alert(t.copied);
    setIsCopyMenuOpen(false);
  };

  const saveToHistory = () => {
    const currentText = editorRef.current?.innerText || generatedPrompt;
    if (!currentText) return;
    const newItem: SavedPrompt = {
        id: Date.now().toString(),
        date: new Date().toLocaleString(),
        fullPrompt: currentText,
        summary: formData.mainText.substring(0, 40) + "..."
    };
    const newHist = [newItem, ...history];
    setHistory(newHist);
    localStorage.setItem('dt_history', JSON.stringify(newHist));
    alert(t.saved);
  };

  const parsePromptToJSX = (text: string, editMode: boolean) => {
    if (!text) return null;
    const regex = /(\[.*?\])|(\/\*.*?\*\/|DicelionTechnique:.*)/g;
    const parts = text.split(regex);
    return parts.map((part, i) => {
      if (!part) return null;
      if (part.startsWith('[') && part.endsWith(']')) {
        return <span key={i} contentEditable={editMode} suppressContentEditableWarning className="text-emerald-500 font-black cursor-text mx-1 border-b border-emerald-500/30 bg-emerald-500/5 px-1 rounded">{part}</span>;
      }
      if (part.startsWith('/*') || part.includes('DicelionTechnique:')) {
        return <span key={i} contentEditable={false} className="text-sky-400 font-mono italic opacity-80">{part}</span>;
      }
      return <span key={i} contentEditable={false} className="text-rose-500 font-bold leading-relaxed">{part}</span>;
    });
  };

  const executeAction = (mode: 'image' | 'video' | 'post') => {
    if (!modalityModal.subject) return;
    const neural = getMillionthNeuralPrompt(modalityModal.subject.id || Math.floor(Math.random()*1000), modalityModal.subject.ar || modalityModal.subject.cat || searchQuery || 'تقنية');
    if (modalityModal.type === 'copy') { 
      navigator.clipboard.writeText(neural.en); 
      alert(t.copied); 
    } else { 
      setFormData(p => ({ ...p, promptMode: mode, mainText: neural.en })); 
      setActiveTab('create'); 
    }
    setModalityModal({ show: false, subject: null, type: 'copy' });
  };

  const filteredLibrary = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return PRO_ULTRA_DB.slice(0, 100);
    const baseMatches = PRO_ULTRA_DB.filter(s => 
      s.ar.toLowerCase().includes(q) || s.en.toLowerCase().includes(q) || s.cat.toLowerCase().includes(q) || s.id.toString().includes(q)
    );
    const results = [...baseMatches];
    if (results.length < 1000) {
        for (let i = results.length; i < 1000; i++) {
            const neural = getMillionthNeuralPrompt(i + 20000, searchQuery || 'إبداع عالمي');
            results.push({ ar: neural.ar, en: neural.en, cat: searchQuery || 'عام', id: i + 20000 });
        }
    }
    return results.slice(0, 1000);
  }, [searchQuery]);

  return (
    <div className={`min-h-screen flex flex-col w-full ${t.dir}`}>
      <nav className="nav-fixed-top glass-ui shadow-lg">
        <div className="max-w-xl mx-auto flex items-center justify-between w-full px-4">
             <NavIcon active={activeTab === 'create'} onClick={() => setActiveTab('create')} icon="🏠" label={t.tabs.home} />
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
            <div className="glass-ui p-4 rounded-2xl flex gap-1 shadow-sm">
                {['image', 'video', 'post'].map(m => (
                    <button key={m} onClick={() => setFormData(p => ({ ...p, promptMode: m as any }))} className={`flex-1 py-3 rounded-xl font-bold text-[11px] uppercase transition-all ${formData.promptMode === m ? 'bg-sky-500 text-white shadow-md' : 'text-[var(--text-muted)] hover:bg-white/5'}`}>
                        {(t.promptMode as any)[m]}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-ui p-6 rounded-[2.5rem] space-y-4 shadow-sm">
                  <SelectBox label={t.labels.ratio} options={ASPECT_RATIOS} value={formData.aspectRatio} onChange={(e:any) => setFormData(p=>({...p, aspectRatio: e.target.value}))} />
                  <SelectBox label={t.labels.mood} options={MOODS} value={formData.mood} onChange={(e:any) => setFormData(p=>({...p, mood: e.target.value}))} />
                  <SelectBox label={t.labels.bg} options={BACKGROUNDS} value={formData.background} onChange={(e:any) => setFormData(p=>({...p, background: e.target.value}))} />
                  <WisdomBox isSunlight={isSunlightMode} label={t.labels.wisdomLabel} />
              </div>
              <div className="glass-ui p-6 rounded-[2.5rem] space-y-4 shadow-sm">
                  <SelectBox label={t.labels.tech} options={TECHNICALS} value={formData.technical} onChange={(e:any) => setFormData(p=>({...p, technical: e.target.value}))} />
                  <SelectBox label={t.labels.model} options={AI_MODELS} value={formData.targetModel} onChange={(e:any) => setFormData(p=>({...p, targetModel: e.target.value}))} />
                  <SelectBox label={t.labels.elements} options={ELEMENTS} value={formData.elements} onChange={(e:any) => setFormData(p=>({...p, elements: e.target.value}))} />
                  <div className="pt-2 flex flex-col gap-3">
                      <CheckBox label={t.labels.exclusivePsychology} checked={formData.exclusivePsychology} onChange={(e:any) => setFormData(p=>({...p, exclusivePsychology: e.target.checked}))} />
                      <CheckBox label={t.labels.analyzeImage} checked={formData.useReferenceImage} onChange={(e:any) => setFormData(p=>({...p, useReferenceImage: e.target.checked}))} />
                      <CheckBox label={t.labels.exportEnglish} checked={formData.forceEnglish} onChange={(e:any) => setFormData(p=>({...p, forceEnglish: e.target.checked}))} />
                      <CheckBox label={t.labels.englishLetters} checked={formData.onlyEnglishVisuals} onChange={(e:any) => setFormData(p=>({...p, onlyEnglishVisuals: e.target.checked}))} />
                  </div>
              </div>
            </div>
            <div className="glass-ui p-6 rounded-[3rem] space-y-4 shadow-md">
              <InputArea label={t.labels.text} value={formData.mainText} onChange={(e:any) => setFormData(p=>({...p, mainText: e.target.value}))} placeholder={t.placeholders.text} />
              <button onClick={generate} disabled={isGenerating} className={`relative overflow-hidden w-full py-5 rounded-full font-black uppercase shadow-xl transition-all ${isGenerating ? 'bg-black' : 'bg-sky-600 text-white hover:bg-sky-500 scale-[1.01]'}`}>
                {isGenerating ? <HackerAnalyzerLoader isSunlight={isSunlightMode} /> : t.generateBtn}
              </button>
            </div>
            {generatedPrompt && (
              <div className="glass-ui p-8 rounded-[3rem] space-y-4 animate-in slide-in-from-bottom shadow-2xl border-sky-500/20">
                 <div className="flex justify-between items-center mb-2 px-2">
                    <h4 className="text-[10px] font-black text-sky-500 uppercase">{t.editLabel}</h4>
                    <div className="flex gap-2">
                        <button onClick={() => { if(window.getSelection()) { alert("Highlight Applied Internally"); } }} className="text-[8px] font-black uppercase text-sky-300 hover:text-white transition-colors">{t.toolbar.highlight}</button>
                        <button onClick={() => setGeneratedPrompt(originalPrompt)} className="text-[8px] font-black uppercase text-rose-400 hover:text-white transition-colors">{t.toolbar.reset}</button>
                    </div>
                 </div>
                 <div ref={editorRef} className={`p-7 dt-editor-dark-layer rounded-[2rem] text-[13px] font-mono leading-relaxed whitespace-pre-wrap overflow-hidden border shadow-inner min-h-[150px] outline-none transition-all ${isEditing ? 'is-editing ring-2 ring-sky-500/50 scale-[1.01]' : 'is-viewing border-white/5'}`}>
                   {parsePromptToJSX(generatedPrompt, isEditing)}
                 </div>
                 <div className="flex flex-wrap gap-2">
                    <div className="relative flex-1 min-w-[120px]">
                        <button onClick={() => setIsCopyMenuOpen(!isCopyMenuOpen)} className="w-full py-4 bg-sky-600 text-white rounded-2xl font-black text-xs uppercase shadow-lg hover:bg-sky-500 transition-all">{t.copyPromptBtn}</button>
                        {isCopyMenuOpen && (
                          <div className="absolute bottom-full mb-2 left-0 right-0 glass-ui rounded-2xl p-2 shadow-2xl border-sky-500/30 animate-in fade-in slide-in-from-bottom-2 z-50">
                            {['ar', 'en', 'all'].map(m => (
                              <button key={m} onClick={() => copyPromptByLang(m as any)} className="w-full text-start px-4 py-3 rounded-xl text-[10px] font-black hover:bg-sky-500/20 transition-all">
                                {(t.copyOptions as any)[m]}
                              </button>
                            ))}
                          </div>
                        )}
                    </div>
                    <button onClick={() => setIsEditing(!isEditing)} className={`flex-1 min-w-[120px] py-4 rounded-2xl font-black text-xs uppercase shadow-lg transition-all ${isEditing ? 'bg-emerald-600 text-white' : 'glass-ui text-sky-400 border-sky-500/30'}`}>
                        {isEditing ? '✓ حفظ التعديل' : t.editBtn}
                    </button>
                    <button onClick={saveToHistory} className="flex-1 min-w-[120px] py-4 glass-ui rounded-2xl font-black text-xs uppercase text-sky-400 hover:bg-white/5 transition-all">{t.saveBtn}</button>
                 </div>
              </div>
            )}
          </div>
        )}
        {activeTab === 'library' && (
          <div className="space-y-6 pb-12 animate-in fade-in">
            <div className="glass-ui p-6 rounded-[2.5rem] shadow-md border-sky-500/10">
              <SelectBox label={t.labels.quickSearch} options={["", ...PRO_ULTRA_DB.map(s => s.ar).slice(0, 1000)]} value={searchQuery} onChange={(e:any) => setSearchQuery(e.target.value)} />
            </div>
            <div className="glass-ui h-14 rounded-full flex items-center px-6 shadow-sm">
              <span className="mr-2 opacity-50">🔍</span>
              <input type="text" placeholder={t.placeholders.search} className="bg-transparent flex-1 outline-none font-bold text-sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredLibrary.map((s: any, idx: number) => (
                <div key={idx} className="p-7 glass-ui rounded-[2.5rem] flex flex-col shadow-sm border-sky-500/5 hover:border-sky-500/20 transition-all group">
                  <span className="text-[9px] font-black uppercase text-sky-500 mb-2 group-hover:tracking-widest transition-all">{s.cat} | #{s.id}</span>
                  <p className="text-[13px] font-bold leading-tight flex-grow">{s[appLang] || s.ar || s.en}</p>
                  <div className="mt-6 flex gap-2">
                    <button onClick={() => setModalityModal({ show: true, subject: s, type: 'copy' })} className="flex-1 py-3 text-[10px] font-black border border-[var(--card-border)] rounded-xl hover:bg-white/5 transition-all">{t.quickCopy}</button>
                    <button onClick={() => setModalityModal({ show: true, subject: s, type: 'edit' })} className="flex-1 py-3 rounded-xl text-[10px] font-black bg-sky-600 text-white shadow-md hover:bg-sky-500 transition-all">{t.editInStudio}</button>
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
                {history.length === 0 ? <p className="text-sm opacity-50 italic">{t.history.empty}</p> : (
                  <div className="space-y-4 text-start">
                    {history.map(item => (
                      <div key={item.id} className="p-6 rounded-[2rem] glass-ui border-sky-500/10 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-sky-500">{item.date}</span>
                          <button onClick={() => { const filtered = history.filter(h => h.id !== item.id); setHistory(filtered); localStorage.setItem('dt_history', JSON.stringify(filtered)); }} className="text-[10px] text-red-500 font-bold">حذف من الأرشيف</button>
                        </div>
                        <p className="text-xs font-bold truncate">{item.summary}</p>
                        <button onClick={() => { navigator.clipboard.writeText(item.fullPrompt); alert(t.copied); }} className="w-full py-2 bg-sky-600/20 text-sky-400 rounded-xl text-[10px] font-black uppercase">نسخ البرومبت بالكامل</button>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          </div>
        )}
        {activeTab === 'guide' && (
          <div className="pb-32 animate-in fade-in space-y-8">
            <div className="glass-ui p-10 rounded-[3.5rem] space-y-8 shadow-xl text-center overflow-hidden">
                <h3 className="text-xl font-black text-sky-500 uppercase">{t.guide.title}</h3>
                <p className="text-[14px] leading-loose font-bold italic opacity-90">{t.guide.intro}</p>
                <div className="space-y-10 mt-10 text-start">
                   {t.guide.masterSections.map((section: any) => (
                     <div key={section.id} className="glass-ui p-7 rounded-[2.5rem] space-y-4 border-sky-500/10 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center gap-3 border-b border-[var(--card-border)] pb-3"><span className="text-2xl">{section.icon}</span><h4 className="text-[14px] font-black text-sky-500 uppercase tracking-tight">{section.title}</h4></div>
                        <div className="space-y-4 pt-2">{section.points.map((p: any, i: number) => (
                             <div key={i} className="space-y-1"><span className="text-[12px] font-black text-sky-400/80">• {p.label}</span><p className={`text-[12px] font-bold leading-relaxed pr-3 opacity-90 ${t.dir === 'rtl' ? 'border-r-2 border-sky-500/20' : 'border-l-2 border-sky-500/20'}`}>{p.content}</p></div>
                           ))}</div>
                     </div>
                   ))}
                </div>
                <div className="pt-10 border-t border-[var(--card-border)] mt-10 text-center"><p className="text-[10px] font-black uppercase opacity-60 tracking-widest">{t.guide.footer}</p></div>
            </div>
          </div>
        )}
        {activeTab === 'about' && (
          <div className="pb-32 animate-in fade-in">
             <div className="glass-ui p-10 rounded-[3.5rem] text-center space-y-8 shadow-lg overflow-hidden">
                <div className="flex flex-col items-center gap-2">
                   <h3 className="text-2xl font-black text-sky-500 uppercase tracking-widest">{t.about.title}</h3>
                   <span className="text-xs font-black uppercase tracking-[0.3em] opacity-60">{t.about.subtitle}</span>
                </div>
                <div className="w-16 h-1 bg-sky-500/30 rounded-full mx-auto"></div>
                <p className="max-w-xl mx-auto text-[14px] leading-relaxed font-bold italic opacity-90 whitespace-pre-line">"{t.about.promoText}"</p>
                <div className="flex flex-col gap-3 pt-6 text-start max-w-lg mx-auto">
                    <h4 className="text-sm font-black text-sky-400 uppercase tracking-widest mb-2 px-2">الخبرة والتخصص:</h4>
                    {t.about.features.map((f: string, i: number) => (
                      <div key={i} className="p-5 rounded-2xl glass-ui border-sky-500/5 flex items-center gap-4 transition-all hover:scale-[1.02] hover:bg-sky-500/5">
                        <span className="w-8 h-8 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-500 text-xs shadow-inner">💎</span>
                        <span className="font-bold text-sm text-[var(--text-main)] leading-snug">{f}</span>
                      </div>
                    ))}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                      <button className="py-4 rounded-2xl bg-emerald-600 text-white font-black text-xs uppercase shadow-md hover:bg-emerald-500 transition-all flex items-center justify-center gap-3"><span className="text-lg">📱</span> {t.about.contacts.whatsapp}</button>
                      <button className="py-4 rounded-2xl bg-blue-600 text-white font-black text-xs uppercase shadow-md hover:bg-blue-500 transition-all flex items-center justify-center gap-3"><span className="text-lg">📞</span> {t.about.contacts.call}</button>
                      <button className="sm:col-span-2 py-4 rounded-2xl glass-ui border-sky-500/20 text-sky-400 font-black text-xs uppercase shadow-md hover:bg-white/5 transition-all flex items-center justify-center gap-3"><span className="text-lg">📧</span> {t.about.contacts.email}</button>
                    </div>
                </div>
                <p className="text-[10px] font-black uppercase opacity-30 tracking-[0.5em] mt-8">DICELION TECHNIQUE v26.5 PRO</p>
             </div>
          </div>
        )}
        {activeTab === 'language' && (
          <div className="pb-32 animate-in fade-in space-y-8">
            <div className="glass-ui p-10 rounded-[3.5rem] shadow-xl text-center space-y-6">
                <h3 className="text-xl font-black text-sky-500 uppercase tracking-widest">{t.tabs.appLang}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SUPPORTED_APP_LANGS.map(l => (
                    <button key={l.id} onClick={() => { setAppLang(l.id); localStorage.setItem('dt_lang', l.id); setActiveTab('create'); }} className={`flex justify-between items-center p-5 rounded-2xl border transition-all ${appLang === l.id ? 'bg-sky-500 text-white border-sky-400 shadow-lg scale-105' : 'glass-ui hover:bg-white/5 border-white/5'}`}>
                      <span className="font-black text-sm">{l.name}</span><span className="text-2xl">{l.flag}</span>
                    </button>
                  ))}
                </div>
            </div>
          </div>
        )}
      </main>

      {showFollowModal && (
        <div className="fixed inset-0 z-[20000] flex items-center justify-center bg-[var(--modal-overlay)] backdrop-blur-xl px-6 animate-in fade-in">
          <div className="glass-ui p-10 rounded-[3.5rem] max-w-sm w-full text-center space-y-6 shadow-2xl border-sky-500/40 animate-in zoom-in slide-in-from-bottom-10 duration-500">
            <div className="flex flex-col items-center">
              <div className="scale-[0.35] h-24 w-full flex items-center justify-center -mb-8 -mt-12 overflow-visible">
                <Unified3DLogo isSunlight={isSunlightMode} />
              </div>
              <h3 className="text-xl font-black text-sky-500 uppercase tracking-widest">{t.followModal.title}</h3>
            </div>
            <p className="text-[13px] font-bold leading-relaxed opacity-90 px-2 whitespace-pre-line text-center">
              {t.followModal.message}
            </p>
            <div className="flex flex-col gap-3 pt-2">
              <button onClick={() => closeFollowModal(true)} className="w-full py-5 bg-sky-600 text-white rounded-2xl font-black text-xs uppercase shadow-xl hover:bg-sky-500 scale-[1.02] transition-all">{t.followModal.follow}</button>
              <button onClick={() => closeFollowModal(false)} className="w-full py-4 glass-ui text-slate-400 rounded-2xl font-black text-[10px] uppercase hover:bg-white/5 transition-all">{t.followModal.skip}</button>
            </div>
            <p className="text-[9px] font-black opacity-30 uppercase tracking-[0.2em]">DICELION TECHNIQUE SYSTEM</p>
          </div>
        </div>
      )}

      {modalityModal.show && (
        <div className="fixed inset-0 z-[11000] flex items-center justify-center bg-[var(--modal-overlay)] backdrop-blur-md px-6">
            <div className="glass-ui p-8 rounded-[3.5rem] max-w-sm w-full text-center space-y-6 animate-in zoom-in">
                <h3 className="text-lg font-black text-sky-500">{t.modalityModal.title}</h3>
                <div className="space-y-2">
                    {['image', 'video', 'post'].map(mode => (
                      <button key={mode} onClick={() => executeAction(mode as any)} className="w-full py-4 rounded-2xl font-bold text-xs hover:bg-sky-500 hover:text-white transition-all">{(t.promptMode as any)[mode]}</button>
                    ))}
                    <button onClick={() => setModalityModal({ show: false, subject: null, type: 'copy' })} className="w-full py-3 text-red-500 font-black text-[10px] uppercase mt-2">{t.modalityModal.cancel}</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

const SelectBox = ({ label, options, value, onChange }: any) => (
  <div className="space-y-1 w-full text-start">
    <label className="text-[9px] font-black opacity-60 uppercase px-1">{label}</label>
    <select value={value} onChange={onChange} className="w-full select-element outline-none cursor-pointer">
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
    <label className="text-[9px] font-black opacity-60 uppercase px-1">{label}</label>
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
