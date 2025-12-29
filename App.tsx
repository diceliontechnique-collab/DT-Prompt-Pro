
import React, { useState, useEffect, useMemo } from 'react';
import { 
  ASPECT_RATIOS, BACKGROUNDS, MOODS, ELEMENTS, TECHNICALS, LANGUAGES, SEED_DATA, TEMPLATES, AI_MODELS 
} from './constants';
import { PromptFormData, SavedPrompt } from './types';

// قائمة اللغات المدعومة
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
    langName: 'العربية',
    title: 'DT-Prompt Pro',
    subtitle: 'Dicelion-Technique | Intelligent Prompt System v1.5',
    tabs: { create: 'الاستوديو', library: 'المكتبة', history: 'الأرشيف', themes: 'المظهر', appLang: 'اللغة', guide: 'دليل الاستخدام', about: 'المطور' },
    generateBtn: 'معالجة الأمر ✨',
    copyBtn: 'نسخ القالب',
    pasteBtn: 'لصق خارجي',
    saveBtn: 'أرشفة المشروع',
    deleteBtn: 'إزالة',
    editLabel: 'محرر الأوامر الذكي (Pro Interface)',
    copied: 'تم نسخ النص بنجاح!',
    pasted: 'تم لصق المحتوى!',
    saved: 'تمت الأرشفة بنجاح!',
    historyEmpty: 'الأرشيف فارغ حالياً.',
    promptMode: { image: 'توليد الصور', video: 'إنتاج الفيديو', post: 'نص إحترافي' },
    placeholders: { text: 'عنوان الحملة أو الموضوع الرئيسي...', details: 'الفئة المستهدفة، الهدف من الإعلان، ومعلومات إضافية...', search: 'بحث سريع في التخصصات...' },
    labels: { lang: 'محرك اللغة', ratio: 'أبعاد المخرج', mood: 'نبرة الصوت والأسلوب', bg: 'سياق المحتوى والبيئة', tech: 'قالب الهيكلة الاحترافي', text: 'الموضوع الأساسي', details: 'تفاصيل الحملة والهدف', useRef: 'تحليل سيكولوجي 🧠', engOnly: 'تصدير إنجليزي 🇺🇸', aiTarget: 'منصة الذكاء المستهدفة', useImgSource: 'الصورة المرفقة مع برومبت 🖼️', visualEnglish: 'حروف إنجليزية حصراً 🔠', visualEnglishDesc: 'لضمان دقة النصوص داخل الصور (للمحركات التي لا تدعم العربية)' },
    useBtn: 'اعتماد',
    guide: {
        title: 'دليل إحتراف DT-Prompt Pro',
        subtitle: 'دليل المستخدم النهائي لإتقان هندسة الأوامر',
        intro: 'مرحباً بك في رحلة احتراف الذكاء الاصطناعي. هذا التطبيق ليس مجرد أداة، بل هو "مترجم ذكي" يأخذ أفكارك البسيطة ويحولها إلى لغة برمجية تفهمها أقوى العقول الاصطناعية في العالم. هذا الدليل صُمم ليكون رفيقك، يشرح لك كل زر وكل قائمة وكأنك تمسك هاتفاً ذكياً لأول مرة في حياتك.',
        navTitle: '⭐ البوصلة: شريط التنقل السفلي (أين تذهب؟)',
        navDesc: 'في أسفل الشاشة، تجد 7 أيقونات سحرية هي مفاتيح التنقل:\n1️⃣ 🏠 البيت: هو "الاستوديو" حيث تصنع أوامرك.\n2️⃣ 📚 الكتاب: هي "المكتبة" التي تحتوي على أفكار جاهزة.\n3️⃣ 📂 الملف: هو "الأرشيف" حيث تُحفظ كنوزك القديمة.\n4️⃣ 🌍 الكرة الأرضية: لتغيير لغة التطبيق بالكامل.\n5️⃣ 📖 الدليل: الصفحة التي تقرأها الآن لتتعلم.\n6️⃣ ℹ️ الدائرة: معلومات عن المطور وكيفية التواصل معه.',
        studioTitle: '🎨 الاستوديو: مختبر صناعة الجمال',
        studioDesc: 'هنا يقع السحر الحقيقي، إليك شرح الخانات:\n• الخانة الأولى (الموضوع): اكتب هنا بكلمة واحدة ما تريد رؤيته (مثلاً: قطة، سيارة، محامي).\n• الخانة الثانية (التفاصيل): صف هنا المشهد (مثلاً: تجري في الغابة، تحت المطر، يبتسم).\n• قوائم الاختيار: هي قوائم منسدلة تفتح لك خيارات مذهلة، اختر منها "بيئة المشهد" و"أبعاد الصورة" و"محرك الذكاء" الذي ستستخدمه.',
        logicTitle: '🧠 المفاتيح الذكية: خيارات المحترفين',
        logicDesc: 'هذه المربعات الصغيرة تغير "تفكير" الذكاء الاصطناعي:\n• 🧠 تحليل سيكولوجي: يجعل الذكاء يركز على المشاعر والألوان التي تؤثر في الناظر.\n• 🇺🇸 تصدير إنجليزي: يحول فكرتك العربية إلى لغة إنجليزية تقنية قوية جداً.\n• 🔠 حروف إنجليزية حصراً: خيار حيوي يمنع الذكاء من كتابة لغات غريبة داخل الصورة، ويجبره على استخدام الحروف الإنجليزية الواضحة فقط.',
        funcTitle: '🛠️ الأدوات الوظيفية: أزرار التحكم',
        funcDesc: '• ✨ معالجة الأمر: هو الزر الأكبر، اضغط عليه ليقوم التطبيق "بطبخ" الفكرة.\n• 📋 نسخ القالب: ليحفظ النص في ذاكرة الهاتف لتلصقه في برامج الرسم.\n• 💾 أرشفة المشروع: ليحفظ هذا الأمر في قائمة "الأرشيف" للعودة له لاحقاً.\n• 🗑️ إزالة: لمسح أي مشروع قديم لم تعد بحاجته.',
        stepTitle: '🚀 خطة العمل: كيف تصنع أول صورة في دقيقة؟',
        step1: 'ادخل "الاستوديو" واختر نوع المهمة (صورة أو فيديو) من الأعلى.',
        step2: 'اكتب في المربع الأول فكرتك (مثلاً: فارس عربي).',
        step3: 'اختر من القوائم "فخامة مؤسسية" و "واقعية سينمائية".',
        step4: 'فعل خيار "تصدير إنجليزي" لضمان أفضل نتيجة عالمية.',
        step5: 'اضغط "معالجة الأمر ✨" وراقب النص المذهل الذي سيظهر بالأسفل.',
        step6: 'اضغط "نسخ القالب" واذهب لأي موقع توليد صور وألصق النص هناك.',
        glossaryTitle: 'قاموس المصطلحات البسيطة 📖',
        glossaryDesc: '• برومبت (Prompt): هو "الأمر" أو "الرسالة" التي نوجهها للذكاء الاصطناعي.\n• رندر (Render): هي عملية تحويل البيانات إلى صورة مرئية نهائية.\n• أبعاد (Ratio): هي شكل الصورة، هل هي طويلة للجوال (9:16) أم مربعة (1:1).'
    },
    about: {
        title: 'Dicelion Technique®',
        subtitle: 'تطوير البرمجيات وخدمات الذكاء الاصطناعي',
        experience: 'خبرة ممتدة لأكثر من 20 سنة',
        contactTitle: 'تواصل مباشرة مع المطور',
        smartLink: 'الربط الذكي السريع - Smart Quick Connect ⚡',
        followBtn: 'متابعة الصفحة الرسمية',
        promoText: 'تابع صفحة المطور لتحصل على تحديثات تطبيقات Dicelion-Technique المجانية وتترقب الإعلان عن أقوى دورة للذكاء الاصطناعي في التصميم والإعلان والبرمجة وإنشاء المحتوى على الصفحة الرسمية.'
    },
    announcement: {
        title: 'إشعار Dicelion-Technique 🚀',
        skip: 'تخطي'
    },
    archive: {
        updateBtn: 'تحديث البيانات',
        cancelBtn: 'إلغاء التعديل',
        editBtn: 'تعديل سريع',
        openBtn: 'فتح في الاستوديو',
        editSummaryPlaceholder: 'تعديل عنوان المشروع...',
        editPromptPlaceholder: 'تعديل نص الأمر...'
    },
    status: {
        offlineReady: 'جاهز للعمل دون إنترنت',
        proVersion: 'نسخة احترافية 1.5 بدون إنترنت'
    }
  },
  en: {
    dir: 'ltr',
    langName: 'English',
    title: 'DT-Prompt Pro',
    subtitle: 'Dicelion-Technique | Intelligent Prompt System v1.5',
    tabs: { create: 'Studio', library: 'Library', history: 'Archive', themes: 'Themes', appLang: 'Langs', guide: 'User Guide', about: 'Author' },
    generateBtn: 'Process Engine ✨',
    copyBtn: 'Copy Template',
    pasteBtn: 'Paste External',
    saveBtn: 'Archive Project',
    deleteBtn: 'Delete',
    editLabel: 'Pro Command Editor',
    copied: 'Copied successfully!',
    pasted: 'Content pasted!',
    saved: 'Archived successfully!',
    historyEmpty: 'No projects found.',
    promptMode: { image: 'Image Gen', video: 'Video Gen', post: 'Pro Text' },
    placeholders: { text: 'Campaign title or subject...', details: 'Target audience, goal, extra info...', search: 'Search specialty...' },
    labels: { lang: 'Language', ratio: 'Ratio', mood: 'Tone & Style', bg: 'Content Context', tech: 'Structure Template', text: 'Core Subject', details: 'Campaign Details', useRef: 'Psych Analysis 🧠', engOnly: 'EN Only 🇺🇸', aiTarget: 'Target AI Platform', useImgSource: 'Image-Based Prompt 🖼️', visualEnglish: 'English Letters Only 🔠', visualEnglishDesc: 'Ensures text accuracy inside visuals (For engines lacking Arabic support)' },
    useBtn: 'APPLY',
    guide: {
        title: 'DT-Prompt Pro Pro-Guide',
        subtitle: 'The Ultimate Guide to Mastering Prompt Engineering',
        intro: 'Welcome to your journey into the world of AI mastery. This app is more than a tool; it\'s an "intelligent translator" that takes your simple ideas and converts them into the precise language understood by the world\'s most advanced AI engines.',
        navTitle: '⭐ The Compass: Bottom Navigation (Where to go?)',
        navDesc: 'At the bottom of your screen, 7 magic icons are your keys:\n1️⃣ 🏠 Home: The "Studio" where you create your commands.\n2️⃣ 📚 Book: The "Library" containing pre-made inspiration.\n3️⃣ 📂 Folder: The "Archive" where your saved treasures live.\n4️⃣ 🌍 Globe: Change the entire app language.\n5️⃣ 📖 Guide: This page you are reading now.\n6️⃣ ℹ️ Info: Developer info and contact links.',
        studioTitle: '🎨 Studio: The Lab of Creation',
        studioDesc: 'This is where the magic happens:\n• Box 1 (Core Subject): Write what you want to see in one word (e.g., Cat, Car).\n• Box 2 (Details): Describe the scene (e.g., running in forest, raining).\n• Selection Lists: Dropdowns for "Backgrounds", "Aspect Ratios", and "AI Models".',
        logicTitle: '🧠 Smart Switches: Pro Options',
        logicDesc: 'These small checkboxes change how the AI "thinks":\n• 🧠 Psych Analysis: Focuses on emotional resonance and color theory.\n• 🇺🇸 EN Export: Converts Arabic ideas into high-tech English technical commands.\n• 🔠 English Letters Only: Ensures text generated inside images uses only clear Latin characters.',
        funcTitle: '🛠️ Functional Tools: Control Buttons',
        funcDesc: '• ✨ Process Engine: The main button to "cook" your prompt.\n• 📋 Copy Template: Saves text to your phone\'s memory.\n• 💾 Archive: Saves the project to your history.\n• 🗑️ Delete: Removes old projects.',
        stepTitle: '🚀 Action Plan: Create your first image in 60 seconds',
        step1: 'Enter the "Studio" and choose a mode (Image/Video) from the top.',
        step2: 'Type your idea in the first box (e.g., Ancient Knight).',
        step3: 'Choose "Cinematic Movie" and "Epic Scale" from the lists.',
        step4: 'Enable "EN Only" to ensure global-quality technical output.',
        step5: 'Click "Process Engine ✨" and watch the magic text appear below.',
        step6: 'Click "Copy Template" and paste it into any AI generator app.',
        glossaryTitle: '📖 Simple Glossary',
        glossaryDesc: '• Prompt: The command or message we give to the AI.\n• Render: The process of turning data into a final visual image.\n• Aspect Ratio: The shape of the image (Portrait/Square/Landscape).'
    },
    about: {
        title: 'Dicelion Technique®',
        subtitle: 'Software Development & AI Services',
        experience: 'Extensive 20+ Years Experience',
        contactTitle: 'Contact the Developer Directly',
        smartLink: 'Smart Quick Connect ⚡',
        followBtn: 'FOLLOW ON FACEBOOK',
        promoText: 'Follow the developer page for free Dicelion-Technique app updates and stay tuned for the most powerful AI course in design, advertising, and programming.'
    },
    announcement: {
        title: 'Dicelion-Technique Notice 🚀',
        skip: 'SKIP'
    },
    archive: {
        updateBtn: 'Update Entry',
        cancelBtn: 'Cancel',
        editBtn: 'Quick Edit',
        openBtn: 'Open in Studio',
        editSummaryPlaceholder: 'Edit summary...',
        editPromptPlaceholder: 'Edit prompt text...'
    },
    status: {
        offlineReady: 'Offline Ready',
        proVersion: 'Pro v1.5 Offline'
    }
  }
};

// توليد تلقائي للغات الأخرى (ES, FR, TR, FA, KU, NL) بالاعتماد على EN أو AR
['es', 'fr', 'tr', 'fa', 'ku', 'nl'].forEach(langCode => {
  const isRtl = ['fa', 'ku'].includes(langCode);
  const base = isRtl ? 'ar' : 'en';
  UI_TRANSLATIONS[langCode] = JSON.parse(JSON.stringify(UI_TRANSLATIONS[base]));
  UI_TRANSLATIONS[langCode].dir = isRtl ? 'rtl' : 'ltr';
  UI_TRANSLATIONS[langCode].langName = SUPPORTED_APP_LANGS.find(l => l.id === langCode)?.name;
});

const getT = (lang: string) => UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.ar;

const App: React.FC = () => {
  const [appLang, setAppLang] = useState<string>(() => localStorage.getItem('dt_lang') || 'ar');
  const t = getT(appLang);
  const [activeTab, setActiveTab] = useState<'create' | 'library' | 'history' | 'themes' | 'appLang' | 'about' | 'guide'>('create');
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>(() => {
    try {
      const saved = localStorage.getItem('dt_history');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Storage load error", e);
      return [];
    }
  });

  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [showLangSelector, setShowLangSelector] = useState(false);

  const [editingPromptId, setEditingPromptId] = useState<string | null>(null);
  const [editSummary, setEditSummary] = useState('');
  const [editFullPrompt, setEditFullPrompt] = useState('');

  // ميزة الحماية البرمجية المستمرة - Integrity Guard Layer
  const [isSystemLocked, setIsSystemLocked] = useState(false);

  useEffect(() => {
    const checkIntegrity = () => {
      const auth1 = "DT-Prompt Pro";
      const auth2 = "Dicelion-Technique";
      const auth3 = "+212717118180";
      
      const checkAr = UI_TRANSLATIONS.ar;
      const checkEn = UI_TRANSLATIONS.en;

      const isTitleSafe = checkAr.title === auth1 && checkEn.title === auth1;
      const isSubtitleSafe = checkAr.subtitle.includes(auth2) && checkEn.subtitle.includes(auth2);
      const isContactSafe = checkAr.about.promoText.includes(auth2) && checkAr.about.smartLink.includes('Smart');
      
      // التحقق من الثوابت والترجمات
      if (!isTitleSafe || !isSubtitleSafe || !isContactSafe) {
        setIsSystemLocked(true);
      }
    };
    checkIntegrity();
  }, []);

  const [formData, setFormData] = useState<PromptFormData>({
    promptMode: 'image', template: TEMPLATES[0].id, designType: '', aspectRatio: ASPECT_RATIOS[0], purpose: '',
    style: '', font: '', palette: '', background: BACKGROUNDS[0], mood: MOODS[0],
    elements: ELEMENTS[0], technical: TECHNICALS[0], personType: 'Default', language: LANGUAGES[0],
    customDetails: '', mainText: '', mainTextPos: 'وسط', secondaryText: '', secondaryTextPos: '', videoMotion: '',
    useReferenceImage: false, forceEnglish: false, targetModel: AI_MODELS[0], useImageAsMainSource: false,
    onlyEnglishVisuals: false
  });

  const filteredSubjects = useMemo(() => {
    if (!searchQuery.trim()) return SEED_DATA.subjects;
    const q = searchQuery.toLowerCase();
    return SEED_DATA.subjects.filter(s => 
      s.ar.toLowerCase().includes(q) || 
      s.en.toLowerCase().includes(q) || 
      s.cat.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = appLang;
    localStorage.setItem('dt_lang', appLang);
    localStorage.setItem('dt_history', JSON.stringify(savedPrompts));
  }, [appLang, t.dir, savedPrompts]);

  useEffect(() => {
    const lastSeen = localStorage.getItem('dt_last_promo_seen');
    const now = Date.now();
    const FIFTEEN_DAYS_MS = 15 * 24 * 60 * 60 * 1000;
    
    if (!lastSeen || (now - parseInt(lastSeen) >= FIFTEEN_DAYS_MS)) {
      setShowAnnouncement(true);
    }
  }, []);

  const handleCloseAnnouncement = () => {
    localStorage.setItem('dt_last_promo_seen', Date.now().toString());
    setShowAnnouncement(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, type, value } = e.target as any;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value 
    }));
  };

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        alert(t.copied);
      } else {
        // Fallback for non-secure contexts or older WebViews
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          alert(t.copied);
        } catch (err) {
          console.error('Fallback copy failed', err);
        }
        document.body.removeChild(textArea);
      }
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  const generate = () => {
    setIsGenerating(true);
    setGeneratedPrompt('');
    setTimeout(() => {
      const { promptMode, aspectRatio, background, mood, technical, mainText, customDetails, language, useReferenceImage, forceEnglish, targetModel, useImageAsMainSource, onlyEnglishVisuals } = formData;
      const findEn = (val: string, cat: string) => (SEED_DATA as any)[cat]?.find((i: any) => i.ar === val)?.en || val;
      
      let prompt = '';
      
      const imageSourceLogic = useImageAsMainSource 
        ? `[PRIMARY_VISUAL_SOURCE_MODE]\n- SCENE_EXTRACTION: Strictly derive environment from reference image.\n- OBJECT_RECOGNITION: Maintain background elements from source.\n- MODIFICATION: Update scene based on: ${mainText}.\n`
        : '';

      const psychOverlay = useReferenceImage 
        ? `[PSYCHOLOGICAL_ANALYSIS_V4.0_ENHANCED]\n- VISUAL_COHESION: Sync palette with reference metadata.\n- COMPOSITION_BIAS: Match reference's focal depth.\n- EMOTIONAL_RESONANCE: Amplify mood with ${mood} triggers.\n`
        : `[PSYCH_OVERLAY]: Standard behavioral triggers.\n`;

      const visualTextInstruction = onlyEnglishVisuals 
        ? `[VISUAL_TEXT_STRICT_MODE]\n- CHARACTERS: Only use English alphabet for text visible inside the scene.\n- ARABIC_SUPPORT_BYPASS: Avoid non-Latin symbols to ensure text integrity.\n`
        : '';

      if (promptMode === 'post') {
        prompt = `[DICELION_COPYWRITING_PRO_V4.0]\nTARGET: ${targetModel}\nSTRATEGY: ${mood}\nCONTEXT: ${useImageAsMainSource ? 'Image' : findEn(background, 'backgrounds')}\nMESSAGE: ${mainText}\n${imageSourceLogic}${psychOverlay}${visualTextInstruction}\nLANG: ${forceEnglish ? 'EN' : language}\n[ID: ${Date.now()}]`;
      } else {
        prompt = `[DICELION_VISUAL_ENGINE_V4.0]\nTARGET: ${targetModel}\nFRAME: ${aspectRatio} | MODE: ${promptMode}\nSUBJECT: ${mainText}\nBG: ${useImageAsMainSource ? 'Cloned' : findEn(background, 'backgrounds')}\nTECH: ${findEn(technical, 'technicals')}\nMOOD: ${findEn(mood, 'moods')}\n${imageSourceLogic}${psychOverlay}${visualTextInstruction}\n[ID: ${Date.now()}]`;
      }

      setGeneratedPrompt(prompt);
      setIsGenerating(false);
      setTimeout(() => document.getElementById('result-view')?.scrollIntoView({ behavior: 'smooth' }), 300);
    }, 800);
  };

  const updateSavedPrompt = (id: string) => {
    setSavedPrompts(prev => prev.map(p => 
      p.id === id ? { ...p, summary: editSummary, fullPrompt: editFullPrompt } : p
    ));
    setEditingPromptId(null);
    alert(appLang === 'ar' ? 'تم تحديث المشروع!' : 'Project updated!');
  };

  return (
    <div className={`min-h-screen flex flex-col pb-44 px-4 sm:px-8 ${t.dir} select-none`}>
      <style>{`
        @keyframes riseUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .announcement-rise {
          animation: riseUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .lang-item-hover:hover {
          background: rgba(56, 189, 248, 0.1);
          border-color: rgba(56, 189, 248, 0.3);
        }
        .rtl .lang-item-hover:hover { transform: translateX(-8px); }
        .ltr .lang-item-hover:hover { transform: translateX(8px); }
        .page-transition {
            animation: fadeIn 0.4s ease-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        textarea, input { select-text: auto; -webkit-user-select: text; user-select: text; }
        .system-lock-screen {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: #000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2rem;
          color: #fff;
        }
      `}</style>

      {/* شاشة الأمان في حال التلاعب بالبيانات */}
      {isSystemLocked && (
        <div className="system-lock-screen page-transition">
          <div className="text-8xl mb-8 animate-pulse">🔒</div>
          <h2 className="text-3xl font-black mb-4 text-red-500">تحذير أمني: خرق سلامة التطبيق</h2>
          <p className="text-xl font-bold mb-8 leading-relaxed max-w-lg">
            عذراً، تم اكتشاف محاولة حذف أو تعديل بيانات الهوية الأساسية الخاصة بالمطور أو اسم التطبيق. 
            تطبيق <span className="text-sky-400">DT-Prompt Pro</span> محمي برمجياً من قبل <span className="text-sky-400">Dicelion-Technique</span>.
            <br/><br/>
            يرجى عدم العبث بالقيم الأصلية للتطبيق لضمان استمرارية عمله.
          </p>
          <div className="p-6 glass-ui rounded-3xl border border-red-500/30">
            <p className="text-xs opacity-50 uppercase tracking-widest font-black">Dicelion-Technique Integrity Guard v1.5</p>
          </div>
        </div>
      )}

      <header className="pt-16 pb-12 text-center space-y-3">
        <h1 className="text-4xl font-black text-white tracking-tighter sm:text-5xl neon-accent drop-shadow-lg">{t.title}</h1>
        <p className="text-[12px] font-bold text-sky-400 uppercase tracking-[0.4em] opacity-80">{t.subtitle}</p>
        <div className="flex justify-center gap-4 pt-2">
            <span className="px-6 py-1 bg-sky-500/10 border border-sky-500/20 rounded-full text-[10px] font-black text-sky-400 uppercase tracking-widest">{t.status.proVersion}</span>
        </div>
      </header>

      <main className="flex-grow max-w-6xl mx-auto w-full">
        {activeTab === 'create' && (
          <div className="page-transition space-y-12">
            <nav className="glass-ui p-2 rounded-2xl flex gap-1 max-w-lg mx-auto overflow-hidden">
              {['image', 'video', 'post'].map(m => (
                <button key={m} onClick={() => setFormData(p => ({ ...p, promptMode: m as any }))} className={`flex-1 py-4 rounded-xl font-bold text-[10px] sm:text-[11px] uppercase transition-all duration-300 ${formData.promptMode === m ? 'bg-sky-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>
                  {(t.promptMode as any)[m]}
                </button>
              ))}
            </nav>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="glass-ui p-8 rounded-[2.5rem] space-y-8">
                <SelectBox label={t.labels.lang} name="language" options={LANGUAGES} value={formData.language} onChange={handleInputChange} />
                <SelectBox label={t.labels.ratio} name="aspectRatio" options={ASPECT_RATIOS} value={formData.aspectRatio} onChange={handleInputChange} />
                <div className="space-y-8">
                    <SelectBox label={t.labels.mood} name="mood" options={MOODS} value={formData.mood} onChange={handleInputChange} />
                    <div className="pt-2">
                        <CheckboxItem 
                          label={t.labels.visualEnglish} 
                          name="onlyEnglishVisuals" 
                          checked={formData.onlyEnglishVisuals} 
                          onChange={handleInputChange} 
                          activeColor="border-purple-500 bg-purple-500/10" 
                        />
                        <p className="mt-2 px-3 text-[10px] font-bold text-slate-500 leading-relaxed italic">
                           {t.labels.visualEnglishDesc}
                        </p>
                    </div>
                </div>
              </div>
              <div className="glass-ui p-8 rounded-[2.5rem] space-y-8">
                <SelectBox label={t.labels.bg} name="background" options={BACKGROUNDS} value={formData.background} onChange={handleInputChange} />
                <SelectBox label={t.labels.tech} name="technical" options={TECHNICALS} value={formData.technical} onChange={handleInputChange} />
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <CheckboxItem label={t.labels.useRef} name="useReferenceImage" checked={formData.useReferenceImage} onChange={handleInputChange} activeColor="border-sky-500 bg-sky-500/10" />
                    <CheckboxItem label={t.labels.engOnly} name="forceEnglish" checked={formData.forceEnglish} onChange={handleInputChange} activeColor="border-blue-400 bg-blue-400/10" />
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <CheckboxItem label={t.labels.useImgSource} name="useImageAsMainSource" checked={formData.useImageAsMainSource} onChange={handleInputChange} activeColor="border-emerald-500 bg-emerald-500/10" />
                  </div>
                  <div className="pt-2">
                    <SelectBox label={t.labels.aiTarget} name="targetModel" options={AI_MODELS} value={formData.targetModel} onChange={handleInputChange} className="!bg-slate-900/80 border-sky-500/20 shadow-[0_0_15px_rgba(56,189,248,0.05)]" />
                  </div>
                </div>
              </div>
            </section>

            <section className="glass-ui p-8 rounded-[3rem] grid grid-cols-1 md:grid-cols-2 gap-8">
              <InputArea label={t.labels.text} name="mainText" value={formData.mainText} onChange={handleInputChange} placeholder={t.placeholders.text} />
              <InputArea label={t.labels.details} name="customDetails" value={formData.customDetails} onChange={handleInputChange} placeholder={t.placeholders.details} />
            </section>

            <div className="flex justify-center py-4">
              <button onClick={generate} disabled={isGenerating} aria-label={t.generateBtn} className={`px-20 py-6 rounded-full font-black text-sm uppercase tracking-widest flex items-center gap-4 transition-all duration-500 shadow-2xl active:scale-95 btn-hover ${isGenerating ? 'bg-slate-800 opacity-50' : 'bg-white text-slate-950 hover:bg-sky-500 hover:text-white'}`}>
                 {isGenerating ? <span className="animate-spin text-xl">⏳</span> : <span className="text-xl">✨</span>}
                 {isGenerating ? (appLang === 'ar' ? 'جارِ المعالجة...' : 'Processing...') : t.generateBtn}
              </button>
            </div>

            {generatedPrompt && (
              <section id="result-view" className="page-transition glass-ui p-10 rounded-[3.5rem] border-sky-500/20">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 border-b border-white/5 pb-6">
                  <h3 className="text-sm font-black text-sky-400 uppercase tracking-widest">{t.editLabel}</h3>
                  <div className="flex flex-wrap gap-3">
                    <ActionButton label={t.copyBtn} icon="📋" onClick={() => copyToClipboard(generatedPrompt)} color="bg-white/5 text-slate-200 border border-white/10" />
                    <ActionButton label={t.saveBtn} icon="💾" onClick={() => {
                        const newPrompt: SavedPrompt = { id: Date.now().toString(), date: new Date().toLocaleString(), fullPrompt: generatedPrompt, summary: formData.mainText || 'New Project' };
                        setSavedPrompts([newPrompt, ...savedPrompts]);
                        alert(t.saved);
                    }} color="bg-sky-500/10 text-sky-400 border border-sky-500/20" />
                  </div>
                </div>
                <textarea value={generatedPrompt} onChange={(e) => setGeneratedPrompt(e.target.value)} className="w-full p-8 bg-black/40 rounded-[2rem] text-[13px] font-mono min-h-[250px] border border-white/5 outline-none text-slate-300 leading-relaxed no-scrollbar focus:border-sky-500/40 transition-all" />
              </section>
            )}
          </div>
        )}

        {activeTab === 'library' && (
          <div className="page-transition space-y-10">
            <div className="glass-ui h-24 rounded-full flex items-center px-10 bg-slate-900/60 focus-within:border-sky-500/40 transition-all group">
              <span className="text-2xl ml-6 opacity-30 group-focus-within:opacity-100 transition-opacity">🔍</span>
              <input type="text" placeholder={t.placeholders.search} className="flex-1 bg-transparent py-4 text-sm font-bold outline-none text-white placeholder:opacity-20" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-40">
              {filteredSubjects.length > 0 ? filteredSubjects.map((s, i) => (
                <div key={i} className="glass-ui p-8 rounded-[2.5rem] flex flex-col justify-between h-64 hover:border-sky-500/40 transition-all bg-slate-900/40 group hover:bg-slate-900/60">
                  <div className="space-y-4">
                    <span className="px-3 py-1 bg-sky-500/10 text-sky-400 text-[10px] font-black rounded-lg tracking-widest uppercase border border-sky-500/20">{s.cat}</span>
                    <p className="text-[17px] font-bold leading-tight text-slate-100 group-hover:text-white transition-colors">{appLang === 'ar' ? s.ar : s.en}</p>
                  </div>
                  <button onClick={() => { setFormData(p => ({ ...p, customDetails: s.en, mainText: s.ar })); setActiveTab('create'); }} className="w-full py-4 bg-white/5 hover:bg-sky-500 hover:text-white rounded-xl text-[11px] font-black transition-all">
                    {t.useBtn}
                  </button>
                </div>
              )) : (
                <div className="col-span-full py-20 text-center opacity-30 font-bold text-lg">{appLang === 'ar' ? 'لم يتم العثور على نتائج' : 'No results found'}</div>
              )}
            </section>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="page-transition space-y-8 pb-40 max-w-3xl mx-auto">
            {savedPrompts.length > 0 ? savedPrompts.map(p => (
              <div key={p.id} className="glass-ui p-8 rounded-[2.5rem] bg-slate-900/40 flex flex-col gap-6 border border-white/5">
                <div className="flex justify-between items-center opacity-40">
                  <span className="text-[10px] font-bold tracking-widest uppercase">{p.date}</span>
                  <button onClick={() => setSavedPrompts(s => s.filter(x => x.id !== p.id))} className="text-red-400/80 hover:text-red-400 text-[11px] font-black">{t.deleteBtn}</button>
                </div>

                {editingPromptId === p.id ? (
                  <div className="space-y-4 page-transition">
                    <input 
                      type="text" 
                      value={editSummary} 
                      onChange={e => setEditSummary(e.target.value)} 
                      placeholder={t.archive.editSummaryPlaceholder}
                      className="w-full bg-black/40 border border-sky-500/30 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-sky-500"
                    />
                    <textarea 
                      value={editFullPrompt} 
                      onChange={e => setEditFullPrompt(e.target.value)}
                      placeholder={t.archive.editPromptPlaceholder}
                      className="w-full bg-black/40 border border-sky-500/30 rounded-xl px-4 py-3 text-[12px] text-slate-300 outline-none focus:border-sky-500 min-h-[150px] font-mono no-scrollbar"
                    />
                    <div className="flex gap-2">
                       <button onClick={() => updateSavedPrompt(p.id)} className="flex-1 py-3 bg-sky-500 text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:brightness-110">{t.archive.updateBtn}</button>
                       <button onClick={() => setEditingPromptId(null)} className="px-6 py-3 bg-white/5 text-slate-400 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-white/10">{t.archive.cancelBtn}</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h4 className="font-bold text-lg text-white">{p.summary}</h4>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => { setGeneratedPrompt(p.fullPrompt); setActiveTab('create'); }} className="flex-1 min-w-[120px] py-4 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-xl text-[11px] font-black hover:bg-sky-500 hover:text-white transition-all uppercase tracking-tight">{t.archive.openBtn}</button>
                      <button onClick={() => { setEditingPromptId(p.id); setEditSummary(p.summary); setEditFullPrompt(p.fullPrompt); }} className="flex-1 min-w-[120px] py-4 bg-white/5 text-slate-300 border border-white/5 rounded-xl text-[11px] font-black hover:bg-white/10 transition-all uppercase tracking-tight">{t.archive.editBtn}</button>
                      <button onClick={() => copyToClipboard(p.fullPrompt)} className="px-6 py-4 bg-white/5 rounded-xl text-xl hover:bg-white/10 transition-colors">📋</button>
                    </div>
                  </>
                )}
              </div>
            )) : (
              <div className="py-24 text-center glass-ui rounded-[3rem] opacity-30 font-bold">{t.historyEmpty}</div>
            )}
          </div>
        )}

        {activeTab === 'guide' && (
          <div className={`page-transition space-y-12 max-w-5xl mx-auto pb-44 ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            <section className="glass-ui p-12 rounded-[3.5rem] space-y-8 bg-gradient-to-br from-slate-900/80 to-sky-900/20 border border-sky-500/20 relative overflow-hidden shadow-[0_0_50px_rgba(56,189,248,0.1)]">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent"></div>
              <div className="flex items-center gap-6">
                 <div className="w-20 h-20 bg-sky-500/20 rounded-3xl flex items-center justify-center text-4xl shadow-inner border border-sky-500/30">📖</div>
                 <div>
                   <h2 className="text-4xl font-black text-white tracking-tight">{t.guide.title}</h2>
                   <p className="text-sky-400 font-bold text-sm uppercase tracking-widest mt-2">{t.guide.subtitle}</p>
                 </div>
              </div>
              <div className="p-6 bg-black/40 rounded-3xl border border-white/5">
                <p className="text-slate-200 leading-relaxed text-lg font-bold">{t.guide.intro}</p>
              </div>
            </section>

            <section className="glass-ui p-12 rounded-[3.5rem] space-y-10 border-white/5">
              <h3 className="text-2xl font-black text-sky-400 border-b border-sky-500/20 pb-4 flex items-center gap-3">
                <span className="w-3 h-3 bg-sky-500 rounded-full animate-pulse"></span>
                {t.guide.navTitle}
              </h3>
              <div className="p-6 bg-white/5 rounded-3xl mb-4 border border-white/5">
                 <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">{t.guide.navDesc}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-200">
                <DetailedGuideItem icon="🏠" title={t.tabs.create} desc={appLang === 'ar' ? 'هذه هي ورشة العمل الأساسية.' : 'This is the main creative workshop.'} />
                <DetailedGuideItem icon="📚" title={t.tabs.library} desc={appLang === 'ar' ? 'خزانة المعرفة الجاهزة.' : 'Ready-to-use knowledge base.'} />
                <DetailedGuideItem icon="📂" title={t.tabs.history} desc={appLang === 'ar' ? 'ذاكرة مشاريعك الخاصة.' : 'Memory of your own projects.'} />
                <DetailedGuideItem icon="🌍" title={t.tabs.appLang} desc={appLang === 'ar' ? 'تغيير لغة واجهة التطبيق.' : 'Change the app interface language.'} />
              </div>
            </section>

            <section className="glass-ui p-12 rounded-[3.5rem] space-y-12 border-white/5 bg-slate-950/20">
              <h3 className="text-2xl font-black text-sky-400 border-b border-sky-500/20 pb-4">{t.guide.studioTitle}</h3>
              <div className="p-6 bg-white/5 rounded-3xl mb-4 border border-white/5">
                 <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">{t.guide.studioDesc}</p>
              </div>
              <div className="space-y-6">
                  <h4 className="text-xl font-black text-white flex items-center gap-3 pr-4 border-r-4 border-sky-500 px-4">
                    {appLang === 'ar' ? 'أوضاع التوليد' : 'Generation Modes'}:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                      <h5 className="font-black text-white mb-2">{t.promptMode.image}</h5>
                      <p className="text-xs text-slate-300 leading-relaxed">{appLang === 'ar' ? 'يستخدم لصناعة أوامر الرسم.' : 'Used for creating drawing commands.'}</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                      <h5 className="font-black text-white mb-2">{t.promptMode.video}</h5>
                      <p className="text-xs text-slate-300 leading-relaxed">{appLang === 'ar' ? 'يضيف كلمات حركية للأمر.' : 'Adds motion keywords to the prompt.'}</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                      <h5 className="font-black text-white mb-2">{t.promptMode.post}</h5>
                      <p className="text-xs text-slate-300 leading-relaxed">{appLang === 'ar' ? 'يحول التطبيق إلى مسوق محترف.' : 'Turns the app into a pro marketer.'}</p>
                    </div>
                  </div>
              </div>
            </section>

            <section className="glass-ui p-12 rounded-[3.5rem] space-y-10 border-white/5">
              <h3 className="text-2xl font-black text-sky-400 border-b border-sky-500/20 pb-4">{t.guide.logicTitle}</h3>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                 <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">{t.guide.logicDesc}</p>
              </div>
            </section>

            <section className="glass-ui p-12 rounded-[3.5rem] space-y-10 border-white/5">
              <h3 className="text-2xl font-black text-sky-400 border-b border-sky-500/20 pb-4">{t.guide.funcTitle}</h3>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                 <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">{t.guide.funcDesc}</p>
              </div>
            </section>

            <section className="glass-ui p-12 rounded-[3.5rem] space-y-10 border-sky-500/10 bg-gradient-to-tr from-sky-900/10 to-transparent">
              <h3 className="text-2xl font-black text-white text-center">{t.guide.stepTitle}</h3>
              <div className="space-y-6">
                <StepItem num="1" title={appLang === 'ar' ? 'اختيار الوضع' : 'Choose Mode'} desc={t.guide.step1} />
                <StepItem num="2" title={appLang === 'ar' ? 'كتابة الفكرة' : 'Write Idea'} desc={t.guide.step2} />
                <StepItem num="3" title={appLang === 'ar' ? 'تحديد المكان' : 'Choose Background'} desc={t.guide.step3} />
                <StepItem num="4" title={appLang === 'ar' ? 'تحديد الشعور' : 'Set Mood'} desc={t.guide.step4} />
                <StepItem num="5" title={appLang === 'ar' ? 'الضغط على السحر' : 'Magic Click'} desc={t.guide.step5} />
                <StepItem num="6" title={appLang === 'ar' ? 'استخدام النتيجة' : 'Use Result'} desc={t.guide.step6} />
              </div>
            </section>

            <section className="glass-ui p-12 rounded-[3.5rem] space-y-10 border-white/5">
              <h3 className="text-2xl font-black text-sky-400 border-b border-sky-500/20 pb-4">{t.guide.glossaryTitle}</h3>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                 <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">{t.guide.glossaryDesc}</p>
              </div>
            </section>

            <footer className="text-center py-10 opacity-30 font-black text-[10px] uppercase tracking-[0.5em] space-y-2">
              <div>{t.subtitle}</div>
              <div>DESIGNED FOR BEGINNERS, BUILT FOR PROS</div>
            </footer>
          </div>
        )}

        {activeTab === 'about' && (
          <div className={`page-transition space-y-12 max-w-5xl mx-auto pb-44 ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            <section className="glass-ui p-12 rounded-[4rem] relative overflow-hidden group border-white/10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 blur-[100px] -mr-32 -mt-32"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="w-48 h-48 rounded-full bg-white flex items-center justify-center shadow-2xl border-4 border-sky-500/50 group-hover:scale-110 transition-transform duration-500 relative p-1 overflow-hidden">
                   <div className="flex flex-col items-center justify-center text-center">
                     <span className="text-[10px] font-black text-sky-600 tracking-tighter absolute top-8">DICELION TECHNIQUE</span>
                     <span className="text-7xl font-black text-sky-500 leading-none mt-2">GSM</span>
                     <span className="text-3xl font-black text-sky-400 leading-none -mt-1 ml-12">F</span>
                   </div>
                </div>
                <div className="flex-1 space-y-4 text-center md:text-right">
                  <h2 className="text-4xl font-black text-white tracking-tight">{t.about.title}</h2>
                  <p className="text-sky-400 font-black text-sm uppercase tracking-[0.3em]">{t.about.subtitle}</p>
                  <div className="inline-block px-6 py-2 bg-sky-500/20 text-sky-300 rounded-full text-xs font-black border border-sky-500/30">
                    {t.about.experience}
                  </div>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AboutCard icon="👨‍🏫" title={appLang === 'ar' ? 'كبير مدربين معتمد' : 'Senior Certified Trainer'} desc={appLang === 'ar' ? 'خبير تدريس في المعاهد المهنية.' : 'Teaching expert in professional institutes.'} color="sky" />
              <AboutCard icon="💻" title={appLang === 'ar' ? 'تطوير البرمجيات' : 'Software Development'} desc={appLang === 'ar' ? 'حلول برمجية متكاملة.' : 'Full integrated software solutions.'} color="blue" />
              <AboutCard icon="🧠" title={appLang === 'ar' ? 'أخصائي ذكاء اصطناعي' : 'AI Specialist'} desc={appLang === 'ar' ? 'خبير في تحليل البيانات.' : 'Expert in data analysis.'} color="indigo" />
            </section>

            <section className="glass-ui p-12 rounded-[4rem] space-y-10 border-sky-500/20 bg-gradient-to-bl from-slate-900/60 to-sky-950/40">
              <div className="space-y-6 text-center">
                <h3 className="text-2xl font-black text-white">{t.about.contactTitle}</h3>
                <div className="p-8 rounded-[3rem] bg-black/40 border border-sky-500/10 space-y-8">
                   <p className="text-sky-400 font-black text-[10px] uppercase tracking-[0.4em]">{t.about.smartLink}</p>
                   <nav className="flex flex-wrap justify-center gap-6">
                    <ContactBtn icon="📞" label={appLang === 'ar' ? 'اتصال مباشر' : 'Direct Call'} href="tel:+212717118180" sub="717118180" />
                    <ContactBtn icon="💬" label={appLang === 'ar' ? 'واتساب' : 'WhatsApp'} href="https://wa.me/212717118180" sub="WhatsApp Chat" color="emerald" />
                    <ContactBtn icon="✉️" label={appLang === 'ar' ? 'بريد إلكتروني' : 'Email'} href="mailto:diceliontechnique@gmail.com" sub="Email Support" />
                  </nav>
                </div>
              </div>
              <div className="p-8 rounded-[3rem] bg-white/5 border border-white/10 space-y-6 relative overflow-hidden text-center">
                <p className="text-slate-200 leading-relaxed font-bold relative z-10 text-lg">{t.about.promoText}</p>
                <div className="flex justify-center relative z-10">
                  <a href="https://web.facebook.com/alktrwalwfa" target="_blank" rel="noreferrer" className="px-10 py-5 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-full font-black text-sm flex items-center gap-4 shadow-xl active:scale-95 transition-all">
                    <span>{t.about.followBtn}</span>
                    <span className="text-2xl">🔗</span>
                  </a>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      <nav className="fixed bottom-8 left-0 w-full px-6 z-[300] pointer-events-none">
        <div className="max-w-2xl mx-auto h-22 glass-ui rounded-full flex items-center justify-between px-6 pointer-events-auto border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-1 w-full justify-between">
             <button onClick={() => { setActiveTab('create'); generate(); }} disabled={isGenerating} aria-label="Home/Generate" className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl transition-all duration-500 active:scale-90 ${isGenerating ? 'bg-slate-700 opacity-50' : 'bg-sky-500 text-white shadow-[0_5px_25px_rgba(14,165,233,0.4)]'}`}>
                <span className={isGenerating ? 'animate-spin' : ''}>{isGenerating ? '⏳' : '🏠'}</span>
              </button>
              <div className="h-10 w-[1px] bg-white/10 mx-2"></div>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                <NavIcon active={activeTab === 'library'} onClick={() => setActiveTab('library')} icon="📚" color="green" />
                <NavIcon active={activeTab === 'history'} onClick={() => setActiveTab('history')} icon="📂" color="blue" />
                <NavIcon active={showLangSelector} onClick={() => setShowLangSelector(!showLangSelector)} icon="🌍" color="slate" />
                <NavIcon active={activeTab === 'guide'} onClick={() => setActiveTab('guide')} icon="📖" color="sky" />
                <NavIcon active={activeTab === 'about'} onClick={() => setActiveTab('about')} icon="ℹ️" color="slate" />
              </div>
          </div>
        </div>
      </nav>

      {showLangSelector && (
        <div className="fixed inset-0 z-[1001] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/60 backdrop-blur-md page-transition" onClick={() => setShowLangSelector(false)}>
          <div className="glass-ui w-full max-w-sm rounded-t-[3rem] sm:rounded-[3rem] p-10 space-y-8 announcement-rise border-t border-sky-500/30" onClick={e => e.stopPropagation()}>
            <header className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className="text-xl font-black text-white">{appLang === 'ar' ? 'اختر لغة التطبيق' : 'Select App Language'}</h3>
              <button onClick={() => setShowLangSelector(false)} className="text-2xl opacity-50">✕</button>
            </header>
            <div className="space-y-2 max-h-[60vh] overflow-y-auto no-scrollbar">
              {SUPPORTED_APP_LANGS.map(lang => (
                <button 
                  key={lang.id} 
                  onClick={() => { setAppLang(lang.id); setShowLangSelector(false); }}
                  className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all border lang-item-hover ${appLang === lang.id ? 'bg-sky-500/20 border-sky-500/50 text-white shadow-lg' : 'bg-white/5 border-transparent text-slate-300'}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="font-bold text-sm">{lang.name}</span>
                  </div>
                  {appLang === lang.id && <span className="text-sky-400 font-black">✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showAnnouncement && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-black/85 backdrop-blur-xl page-transition">
          <div className="glass-ui max-w-lg w-full p-10 rounded-[3rem] border-sky-500/30 text-center space-y-8 announcement-rise shadow-[0_0_100px_rgba(56,189,248,0.1)]">
            <div className="w-24 h-24 bg-gradient-to-tr from-sky-600 to-sky-400 rounded-full flex items-center justify-center mx-auto text-5xl shadow-2xl animate-pulse">📢</div>
            <h2 className="text-2xl font-black text-white tracking-tight">{t.announcement.title}</h2>
            <p className="text-slate-200 leading-relaxed font-bold text-lg">{t.about.promoText}</p>
            <div className="flex flex-col gap-4">
              <a href="https://web.facebook.com/alktrwalwfa" target="_blank" rel="noreferrer" onClick={handleCloseAnnouncement} className="w-full py-5 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-full font-black text-sm flex items-center justify-center gap-4 shadow-2xl transition-all active:scale-95 border border-white/10">
                <span>{t.about.followBtn}</span>
                <span className="text-2xl">🔗</span>
              </a>
              <button onClick={handleCloseAnnouncement} className="text-slate-500 hover:text-white text-[11px] font-black uppercase tracking-[0.3em] transition-colors pt-2">{t.announcement.skip}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DetailedGuideItem = ({ icon, title, desc }: any) => (
  <article className="flex gap-6 p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-white/10 hover:border-sky-500/20 transition-all group shadow-md">
    <span className="text-4xl group-hover:scale-125 transition-transform duration-300">{icon}</span>
    <div className="space-y-2">
      <h4 className="font-black text-white text-lg">{title}</h4>
      <p className="text-xs text-slate-400 leading-relaxed font-bold">{desc}</p>
    </div>
  </article>
);

const StepItem = ({ num, title, desc }: any) => (
  <div className="flex items-center gap-6 p-5 bg-black/30 rounded-2xl border border-white/5 group hover:border-sky-500/30 transition-all">
    <div className="w-12 h-12 bg-sky-500 text-white rounded-full flex items-center justify-center font-black text-lg shadow-[0_0_15px_rgba(56,189,248,0.4)]">{num}</div>
    <div className="flex-1">
      <h5 className="font-black text-white">{title}</h5>
      <p className="text-[10px] text-slate-400 font-bold">{desc}</p>
    </div>
  </div>
);

const AboutCard = ({ icon, title, desc, color }: any) => {
  const colorMap: any = {
    sky: 'border-sky-500/20 bg-sky-500/5',
    blue: 'border-blue-500/20 bg-blue-500/5',
    indigo: 'border-indigo-500/20 bg-indigo-500/5'
  };
  return (
    <article className={`p-8 rounded-[3rem] border flex flex-col gap-4 glass-ui hover:-translate-y-2 transition-all duration-500 ${colorMap[color] || ''}`}>
      <span className="text-4xl">{icon}</span>
      <h4 className="font-black text-white text-lg">{title}</h4>
      <p className="text-slate-400 text-xs leading-relaxed font-bold">{desc}</p>
    </article>
  );
};

const ContactBtn = ({ icon, label, href, sub, color }: any) => {
  const colorMap: any = {
    emerald: 'hover:border-emerald-500/40 hover:bg-emerald-500/10',
    default: 'hover:border-sky-500/40 hover:bg-white/10'
  };
  return (
    <a href={href} className={`px-6 py-5 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center gap-2 transition-all active:scale-95 min-w-[130px] flex-1 ${colorMap[color || 'default']}`}>
      <span className="text-3xl">{icon}</span>
      <div className="text-center">
        <span className="text-[12px] font-black text-slate-100 block">{label}</span>
        {sub && <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter opacity-60">{sub}</span>}
      </div>
    </a>
  );
};

const NavIcon = ({ active, icon, onClick, color }: any) => {
    const colors: any = { sky: 'text-sky-400 bg-sky-500/10', green: 'text-emerald-400 bg-emerald-500/10', blue: 'text-blue-400 bg-blue-500/10', slate: 'text-slate-300 bg-slate-500/10' };
    return (
        <button onClick={onClick} className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 min-w-[3rem] ${active ? colors[color || 'sky'] + ' scale-110 shadow-inner' : 'opacity-40 hover:opacity-100 hover:bg-white/5'}`}>
            <span className="text-2xl">{icon}</span>
        </button>
    );
};

const CheckboxItem = ({ label, name, checked, onChange, activeColor }: any) => (
    <div className={`p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${checked ? activeColor : 'border-white/5 bg-slate-900/60 hover:border-white/20'}`} onClick={() => onChange({ target: { name, type: 'checkbox', checked: !checked } } as any)}>
        <span className="text-[12px] font-bold text-slate-300 group-hover:text-white transition-colors">{label}</span>
        <div className={`w-6 h-6 rounded flex items-center justify-center transition-all ${checked ? 'bg-current shadow-[0_0_10px_currentColor]' : 'border-2 border-white/10'}`}>
            {checked && <span className="text-white text-[11px] font-black">✓</span>}
        </div>
    </div>
);

const ActionButton = ({ icon, label, onClick, color }: any) => (
  <button onClick={onClick} className={`flex items-center gap-3 px-6 py-4 rounded-xl font-bold text-[11px] uppercase transition-all hover:brightness-125 active:scale-95 btn-hover ${color}`}>
    <span className="text-xl">{icon}</span>
    <span>{label}</span>
  </button>
);

const SelectBox = ({ label, name, options, value, onChange, className }: any) => (
  <div className={`space-y-4 ${className || ''}`}>
    <label className="text-[12px] font-black text-slate-500 uppercase px-2 tracking-widest opacity-80">{label}</label>
    <div className="relative">
      <select name={name} value={value} onChange={onChange} className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-6 py-5 text-[13px] font-bold text-slate-100 outline-none appearance-none cursor-pointer focus:border-sky-500/40 transition-all hover:bg-slate-950/80">
        {options.map((o: string) => <option key={o} value={o} className="bg-slate-900">{o}</option>)}
      </select>
    </div>
  </div>
);

const InputArea = ({ label, name, value, onChange, placeholder }: any) => (
  <div className="space-y-4">
    <label className="text-[12px] font-black text-slate-500 uppercase px-2 tracking-widest opacity-80">{label}</label>
    <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} className="w-full bg-slate-950/60 border border-white/5 rounded-[2.5rem] px-8 py-8 text-[13px] font-bold text-slate-100 outline-none min-h-[160px] resize-none focus:border-sky-500/40 transition-all no-scrollbar hover:bg-slate-950/80 leading-relaxed" />
  </div>
);

export default App;
