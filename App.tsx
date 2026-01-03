
/* SYNC_STABILITY_PATCH_V31.0_MASTER_PRO_ULTRA: INSTANT RESPONSE PROTOCOL & NEURAL SEARCH EMPOWERMENT */
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
    tabs: { create: 'المختبر', library: 'مليون برومبت', history: 'سجل المحفوظات', appLang: 'اللغة', guide: 'دليل', about: 'عن المطور', home: 'الرئيسية', sunlight: 'سطوع' },
    generateBtn: 'معالجة الأمر ✨',
    saveBtn: 'أرشفة المشروع',
    editBtn: 'تعديل النص',
    copyPromptBtn: 'نسخ البرومبت',
    editLabel: 'محرر الأوامر الذكي (V31.0 PRO)',
    resultActions: { copy: 'نسخ', save: 'حفظ' },
    copyOptions: { ar: '🇸🇦 نسخ بالعربية', en: '🇬🇧 Copy in English', all: '🌍 نسخ الكل (عربي + إنجليزي)' },
    history: { empty: 'السجل فارغ حالياً.. ابدأ بصناعة إبداعك الأول!', title: 'سجل محفوظات DT-Prompt' },
    copied: 'تم نسخ البرومبت الوظيفي بنجاح!',
    saved: 'تمت الأرشفة بنجاح!',
    promptMode: { image: 'توليد الصور', video: 'إنتاج الفيديو', post: 'نصوص احترافية' },
    placeholders: { text: 'عنوان الحملة أو الموضوع الرئيسي الذي تريد تحويله لبرومبت احترافي...', search: 'ابحث في مليون برومبت جاهز بالرقم أو بالحرف', dropdownSearch: 'اختر تخصصاً من 1000 خيار...', visualText: 'اكتب النص الذي تريده أن يظهر (أو اتركه فارغاً للصمت التام)' },
    labels: { 
      ratio: 'أبعاد المخرج (Ratio)', mood: 'نبرة الصوت والأسلوب الفني', bg: 'سياق المحتوى والبيئة المحيطة (100 خيار)', tech: 'قالب الهيكلة الاحترافي (100 خيار)', text: 'الموضوع الأساسي (Main Subject)', quickSearch: 'تصفح التخصصات الذكية (1000 خيار)',
      exclusivePsychology: "برومبت سيكولوجي حصري لـ Dicelion-Technique",
      analyzeImage: "برومبت مع صورة مرجعية مرفقة",
      exportEnglish: "تصدير البرومبت باللغة الإنجليزية (لنتائج أدق)",
      englishLetters: "برومبت للمنصات التي لا تدعم اللغة العربية",
      wisdomLabel: "حكمة اليوم للمبدع الرقمي",
      model: "محرك الذكاء الاصطناعي المستهدف",
      elements: "العناصر والجماليات (100 خيار)",
      disableAutoText: "إلغاء النصوص التلقائية (Clean Visuals)",
      visualTextLabel: "النص المخصص على الصورة/الفيديو",
      anatomy: "Prompt التشريح الذكي حصري لـ Dicelion-Technique"
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
    inspiration: {
      title: 'سحابة الإلهام (Inspiration Cloud)',
      tip: 'اختر مقترحاً لتعلم أسرار هندسة الأوامر:'
    },
    guide: { 
      title: 'موسوعة DT-Prompt الشاملة (V31.0 PRO)', 
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
        }
      ],
      footer: 'DT-Prompt | التقنية أمانة، والعمل إتقان - DicelionTechnique © 2024-2026'
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

const Unified3DLogo = ({ isSunlight = false }: { isSunlight?: boolean }) => {
  return (
    <div className="relative flex flex-col items-center justify-center select-none scale-90 sm:scale-100 transition-transform duration-500">
      <svg width="320" height="320" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" id="dt-master-svg" className="drop-shadow-2xl">
        <defs>
          <linearGradient id="dt_face_grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: isSunlight ? '#0f172a' : '#ffffff', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#38bdf8', stopOpacity: 1}} />
          </linearGradient>
        </defs>
        <g transform="translate(256, 256)">
          <path d="M-180 -100 V100 H-80 C-10 100 30 60 30 0 C30 -60 -10 -100 -80 -100 H-180 Z" fill="url(#dt_face_grad)" />
          <path d="M-140 -60 H-80 C-50 -60 -10 -40 -10 0 C-10 40 -50 60 -80 60 H-140 V-60 Z" fill={isSunlight ? '#f8fafc' : '#020617'} />
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

const HackerAnalyzerLoader = ({ isSunlight }: { isSunlight: boolean }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none bg-black/60 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-xs font-black text-white uppercase tracking-widest animate-pulse">جاري تحليل الأكواد البرمجية (V31.0)</span>
      </div>
    </div>
  );
};

const executeSystemCopy = (text: string): Promise<boolean> => {
    let finalPayload = `/* DICELION-TECHNIQUE MASTER PAYLOAD v31.0 | AUTHENTICATED_CORE */\n` + text;
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

    await new Promise(r => setTimeout(r, 1500));

    const finalOutput = `/* MASTER ARCHITECTURE | v31.0 | DICELION-TECHNIQUE */\nDicelionTechnique: TOPIC: ${formData.anatomyType !== ANATOMY_OPTIONS[0] ? formData.anatomyType : formData.mainText}\nDicelionTechnique: PRECISION: K64_ULTRADENSE\nDicelionTechnique: ETHICS_PROTOCOL: ACTIVE\n\n======================\nPROMPT CONSTRUCTION LAYER\n======================\n[CENTRAL_SUBJECT]: { core: "${formData.anatomyType !== ANATOMY_OPTIONS[0] ? formData.anatomyType : formData.mainText}", engineering: "${formData.technical}" }\n[ATMOSPHERIC_DATA]: { context: "${formData.background}", emotion: "${formData.mood}", lighting: "Cinematic God-Rays" }\n[RENDER_CORE]: { engine: "Unreal Engine 5.4 / Octane", resolution: "Ultra-High 64K", details: "${formData.elements}" }\n\n======================\nProfessional Engineering by Dicelion-Technique\n======================`;
    setOriginalPrompt(finalOutput);
    setGeneratedPrompt(finalOutput);
    setIsGenerating(false);
  };

  const performRealCopy = async (text: string) => {
    const success = await executeSystemCopy(text);
    if (success) alert(t.copied);
  };

  /* FIXED: INSTANT RESPONSE PROTOCOL - SINGLE TAP ACTIVATION (V31.0) */
  const handleBracketInteraction = (e: React.PointerEvent | React.MouseEvent, variableName: string, bracketId: number) => {
    if (!isEditing) return;
    e.preventDefault();
    e.stopPropagation();
    
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    
    setMenuPos({ 
        top: rect.top + window.scrollY - 10, 
        left: Math.min(rect.left + window.scrollX, window.innerWidth - 300) 
    });
    
    // Neural Toggle: If clicking same bracket, close it. Else open it.
    setActiveBracket(prev => (prev?.index === bracketId ? null : { name: variableName, index: bracketId }));
  };

  const handleInspirationSelect = (suggestion: string) => {
    if (!activeBracket || !generatedPrompt) return;
    const regex = /(\[.*?\])/g;
    let currentMatchIndex = 0;
    const newPrompt = generatedPrompt.replace(regex, (match) => {
        if (currentMatchIndex === activeBracket.index) {
            currentMatchIndex++;
            return `[${suggestion}]`;
        }
        currentMatchIndex++;
        return match;
    });
    setGeneratedPrompt(newPrompt);
    setActiveBracket(null);
  };

  const parsePromptToJSX = (text: string, editMode: boolean) => {
    if (!text) return null;
    const regex = /(\[.*?\])|(\/\*.*?\*\/|DicelionTechnique:.*)/g;
    const parts = text.split(regex);
    let bracketCounter = 0;

    return parts.map((part, i) => {
      if (!part) return null;
      if (part.startsWith('[') && part.endsWith(']')) {
        const currentId = bracketCounter++;
        const variableName = part.replace(/[\[\]\*\*]/g, '').trim().toUpperCase();
        return (
          <span 
            key={i} 
            contentEditable={editMode} 
            suppressContentEditableWarning 
            onClick={(e) => handleBracketInteraction(e, variableName, currentId)}
            className={`text-emerald-500 font-black mx-1 border-b-2 border-emerald-500/20 bg-emerald-500/5 px-1 rounded transition-all outline-none cursor-help hover:bg-emerald-500/20 active:scale-95`}
          >
            {part}
          </span>
        );
      }
      if (part.startsWith('/*') || part.includes('DicelionTechnique:')) {
        return <span key={i} contentEditable={false} className="text-sky-400 font-mono italic opacity-60 text-[10px] block my-0.5">{part}</span>;
      }
      return <span key={i} contentEditable={false} className="text-rose-500 font-bold">{part}</span>;
    });
  };

  const filteredLibrary = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return PRO_ULTRA_DB.slice(0, 50);
    return PRO_ULTRA_DB.filter(s => 
      s.ar.toLowerCase().includes(q) || s.en.toLowerCase().includes(q) || s.cat.toLowerCase().includes(q) || s.id.toString().includes(q)
    ).slice(0, 100);
  }, [searchQuery]);

  return (
    <div className={`min-h-screen flex flex-col w-full ${t.dir}`}>
      {/* FOCAL DIMMING OVERLAY (V31.0) */}
      {activeBracket && <div className="fixed inset-0 bg-black/20 z-[25000] backdrop-blur-[2px]" onClick={() => setActiveBracket(null)}></div>}
      
      <nav className="nav-fixed-top glass-ui shadow-lg">
        <div className="max-w-xl mx-auto flex items-center justify-between w-full px-4">
             <NavIcon active={activeTab === 'create'} onClick={() => setActiveTab('create')} icon="🏠" label={t.tabs.home} />
             <NavIcon active={activeTab === 'library'} onClick={() => setActiveTab('library')} icon="💎" label={t.tabs.library} />
             <NavIcon active={isSunlightMode} onClick={() => setIsSunlightMode(!isSunlightMode)} icon="☀️" label={t.tabs.sunlight} />
             <NavIcon active={activeTab === 'guide'} onClick={() => setActiveTab('guide')} icon="📖" label={t.tabs.guide} />
             <NavIcon active={activeTab === 'history'} onClick={() => setActiveTab('history')} icon="📜" label={t.tabs.history} />
        </div>
      </nav>
      <header className="flex justify-center mb-6 mt-4"><Unified3DLogo isSunlight={isSunlightMode} /></header>
      <main className="pb-32">
        {activeTab === 'create' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-ui p-6 rounded-[2.5rem] space-y-4 shadow-sm">
                  <SelectBox label={t.labels.ratio} options={ASPECT_RATIOS} value={formData.aspectRatio} onChange={(e:any) => setFormData(p=>({...p, aspectRatio: e.target.value}))} />
                  <SelectBox label={t.labels.bg} options={BACKGROUNDS} value={formData.background} onChange={(e:any) => setFormData(p=>({...p, background: e.target.value}))} />
                  <WisdomBox isSunlight={isSunlightMode} label={t.labels.wisdomLabel} />
              </div>
              <div className="glass-ui p-6 rounded-[2.5rem] space-y-4 shadow-sm">
                  <div className="space-y-1">
                      <label className="text-[9px] font-black text-sky-500 uppercase px-1">{t.labels.anatomy}</label>
                      <select value={formData.anatomyType} onChange={(e:any) => setFormData(p=>({...p, anatomyType: e.target.value}))} className="w-full select-element outline-none cursor-pointer">
                          {ANATOMY_OPTIONS.map((o, i) => <option key={i} value={o}>{o}</option>)}
                      </select>
                  </div>
                  <SelectBox label={t.labels.tech} options={TECHNICALS} value={formData.technical} onChange={(e:any) => setFormData(p=>({...p, technical: e.target.value}))} />
                  <CheckBox label={t.labels.exclusivePsychology} checked={formData.exclusivePsychology} onChange={(e:any) => setFormData(p=>({...p, exclusivePsychology: e.target.checked}))} />
              </div>
            </div>
            <div className="glass-ui p-6 rounded-[3rem] space-y-4 shadow-md">
              <InputArea label={t.labels.text} value={formData.mainText} onChange={(e:any) => setFormData(p=>({...p, mainText: e.target.value}))} placeholder={t.placeholders.text} />
              <button onClick={generate} disabled={isGenerating} className={`relative overflow-hidden w-full py-5 rounded-full font-black uppercase shadow-xl transition-all bg-sky-600 text-white ${isGenerating ? 'bg-black' : 'hover:bg-sky-500 scale-[1.01]'}`}>
                {isGenerating ? <HackerAnalyzerLoader isSunlight={isSunlightMode} /> : t.generateBtn}
              </button>
            </div>
            
            {/* V31.0: NEURAL INSPIRATION CLOUD - ASCENDING PORTAL */}
            {activeBracket && isEditing && (
                <div 
                    className="fixed z-[30000] max-w-[280px] w-full transform -translate-y-full animate-in zoom-in slide-in-from-bottom-5 duration-300"
                    style={{ top: `${menuPos.top}px`, left: `${menuPos.left}px` }}
                >
                   <div className="glass-ui p-5 rounded-[2rem] border-emerald-500/60 shadow-2xl space-y-3">
                       <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <h4 className="text-[10px] font-black text-emerald-400 uppercase">{activeBracket.name}</h4>
                          <button onClick={() => setActiveBracket(null)} className="text-[9px] font-bold text-rose-400">إغلاق</button>
                       </div>
                       <div className="flex flex-col gap-1.5">
                          {(VARIABLE_INSPIRATIONS[activeBracket.name] || [
                            'Luxury futuristic aesthetics with clean lines',
                            'Highly detailed cybernetic textures',
                            'Ethereal light beams from multiple sources'
                          ]).slice(0, 5).map((suggestion, idx) => (
                            <button 
                                key={idx} 
                                onClick={() => handleInspirationSelect(suggestion)}
                                className="text-start p-3 glass-ui rounded-xl hover:bg-emerald-500/10 transition-all text-[10px] font-bold leading-tight"
                            >
                               ✦ {suggestion}
                            </button>
                          ))}
                       </div>
                   </div>
                </div>
            )}

            {generatedPrompt && (
              <div className="glass-ui p-8 rounded-[3rem] space-y-4 animate-in slide-in-from-bottom border-sky-500/20">
                 <div className="flex justify-between items-center px-2">
                    <h4 className="text-[10px] font-black text-sky-500 uppercase tracking-widest">{t.editLabel}</h4>
                    <span className="text-[8px] font-black opacity-40 uppercase">V31.0 MASTER CORE</span>
                 </div>
                 <div ref={editorRef} className={`p-7 dt-editor-dark-layer rounded-[2rem] text-[13px] font-mono leading-relaxed overflow-hidden border shadow-inner min-h-[150px] outline-none ${isEditing ? 'is-editing ring-2 ring-sky-500/50' : 'is-viewing border-white/5'}`}>
                   {parsePromptToJSX(generatedPrompt, isEditing)}
                 </div>
                 <div className="flex gap-2">
                    <button onClick={() => performRealCopy(editorRef.current?.innerText || generatedPrompt)} className="flex-1 py-4 bg-sky-600 text-white rounded-2xl font-black text-xs uppercase shadow-lg">{t.copyPromptBtn}</button>
                    <button onClick={() => setIsEditing(!isEditing)} className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase shadow-lg transition-all ${isEditing ? 'bg-emerald-600 text-white' : 'glass-ui text-sky-400'}`}>
                        {isEditing ? '✓ حفظ التعديل' : t.editBtn}
                    </button>
                 </div>
                 <div className="text-center pt-2"><span className="text-[8px] font-black opacity-30 uppercase tracking-[0.4em]">DicelionTechnique MASTER CORE v31.0</span></div>
              </div>
            )}
          </div>
        )}
        {activeTab === 'library' && (
          <div className="space-y-6 pb-12 animate-in fade-in">
             <div className="glass-ui h-14 rounded-full flex items-center px-6 shadow-sm">
                <span className="mr-2 opacity-50">🔍</span>
                <input type="text" placeholder={t.placeholders.search} className="bg-transparent flex-1 outline-none font-bold text-sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredLibrary.map((s, idx) => (
                   <div key={idx} className="p-6 glass-ui rounded-[2rem] flex flex-col shadow-sm border-sky-500/5 hover:border-sky-500/20 transition-all">
                      <span className="text-[8px] font-black uppercase text-sky-500 mb-1">{s.cat} | #{s.id}</span>
                      <p className="text-[12px] font-bold leading-tight flex-grow">{s.ar}</p>
                      <button onClick={() => { setFormData(p => ({...p, mainText: s.en})); setActiveTab('create'); }} className="mt-4 py-2 bg-sky-600/10 text-sky-500 rounded-xl text-[10px] font-black uppercase">{t.editInStudio}</button>
                   </div>
                ))}
             </div>
          </div>
        )}
      </main>
      <footer className="fixed bottom-0 w-full glass-ui p-3 text-center border-t border-white/5 pointer-events-none z-[10000]">
        <span className="text-[8px] font-black opacity-20 uppercase tracking-[0.5em]">DicelionTechnique Master Core System V31.0</span>
      </footer>
    </div>
  );
};

const SelectBox = ({ label, options, value, onChange }: any) => (
  <div className="space-y-1 w-full text-start">
    <label className="text-[9px] font-black text-sky-500 uppercase px-1">{label}</label>
    <select value={value} onChange={onChange} className="w-full select-element outline-none cursor-pointer">
        {options.map((o: string, i: number) => <option key={i} value={o}>{o}</option>)}
    </select>
  </div>
);

const CheckBox = ({ label, checked, onChange }: any) => (
  <label className="flex items-center gap-3 p-4 rounded-2xl glass-ui cursor-pointer hover:bg-white/5 transition-all">
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
    <button onClick={onClick} className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${active ? 'bg-sky-500 text-white shadow-lg scale-110' : 'bg-white/5 text-slate-400 border border-white/10'}`}><span className="text-xl">{icon}</span></button>
    <span className={`mt-1 text-[8px] font-black uppercase tracking-tighter ${active ? 'text-sky-500 opacity-100' : 'opacity-40'}`}>{label}</span>
  </div>
);

export default App;
