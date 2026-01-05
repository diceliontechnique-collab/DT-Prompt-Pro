
/* DT-PROMPT MASTER STABILITY V180.0 | SMART ACTION BAR | DICELION v500 */
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ASPECT_RATIOS, BACKGROUNDS, MOODS, ELEMENTS, TECHNICALS, LANGUAGES, TEMPLATES, AI_MODELS, PRO_ULTRA_DB, WISDOM_QUOTES, getMillionthNeuralPrompt, ANATOMY_OPTIONS, INFOGRAPHIC_OPTIONS
} from './constants';
import { PromptFormData, SavedPrompt } from './types';
import { GoogleGenAI } from "@google/genai";

const safeGetItem = (key: string, fallback: string) => {
  try { return localStorage.getItem(key) || fallback; } catch { return fallback; }
};

const UI_TRANSLATIONS: any = {
  ar: {
    dir: 'rtl',
    tabs: { 
      create: 'الرئيسية', 
      library: 'مليون برومبت', 
      anatomy: 'التشريح الذكي', 
      infographic: 'انفوجرافيك',
      history: 'السجل', 
      guide: 'دليل', 
      about: 'المطور', 
      sunlight: 'سطوع',
      settings: 'إعدادات',
      home: 'الرئيسية'
    },
    generateBtn: 'تحليل ميكرو V500 🚀',
    saveBtn: 'أرشفة المشروع',
    editBtn: 'تعديل يدوي',
    copyPromptBtn: 'نسخ البرومبت النهائي',
    history: { empty: 'السجل فارغ حالياً..', title: 'سجل محفوظات DT-Prompt' },
    copied: 'تم النسخ بنجاح!',
    saved: 'تمت الأرشفة!',
    quickCopy: 'نسخ سريع',
    editInStudio: 'تعديل في المختبر',
    promptMode: { image: 'برومبت صورة', video: 'برومبت فيديو', post: 'برومبت نص احترافي' },
    placeholders: { text: 'اكتب موضوعك هنا ليتم تحويله لبرومبت جبار...', search: 'ابحث برقم البرومبت...', anatomySearch: 'ابحث في 5000 خيار تشريح...', visualText: 'اكتب النص المراد إظهاره...', infographicSearch: 'ابحث في 5000 انفوجرافيك...' },
    labels: { 
      ratio: 'أبعاد المخرج (Ratio)', mood: 'النبرة والأسلوب الفني', bg: 'سياق المحتوى (100 خيار)', tech: 'قالب الهيكلة (100 خيار)', text: 'الموضوع الأساسي (Main Subject)',
      wisdomLabel: "حكمة اليوم للمبدع الرقمي",
      model: "محرك الذكاء المستهدف",
      elements: "العناصر الجمالية (100 خيار)",
      disableAutoText: "إلغاء النصوص التلقائية",
      visualTextLabel: "النص المرئي (Visual Typography)",
      exclusivePsychology: "برومبت سيكولوجي حصري لـ Dicelion-Technique",
      analyzeImage: "برومبت مع صورة مرجعية مرفقة",
      exportEnglish: "تصدير البرومبت باللغة الإنجليزية لنتائج أدق",
      englishLetters: "برومبت للمنصات التي لا تدعم العربية",
      quickSearch: "تصفح التخصصات الذكية (1000 خيار)",
      anatomy: "برومبت التشريح الذكي (هاردوير وتقنيات صيانة)",
      infographic: "مركز الانفوجرافيك (قوالب بصرية جاهزة)",
      neuralEngine: "تفعيل محرك DICELION v500 (Micro to Macro)"
    }
  }
};

/* V180.0 SMART ACTION BAR CSS LAYER */
const SmartActionBarLayerV180 = () => (
  <style>{`
    .action-icon-btn {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      position: relative;
    }
    .action-icon-btn:active { transform: scale(0.9); }
    .action-icon-btn .tooltip {
      position: absolute;
      bottom: -30px;
      background: #000;
      color: #fff;
      font-size: 8px;
      padding: 2px 6px;
      border-radius: 4px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s;
      white-space: nowrap;
      z-index: 100;
      font-weight: 900;
    }
    .action-icon-btn:hover .tooltip { opacity: 1; }
    .edit-active-glow {
      box-shadow: 0 0 15px rgba(56, 189, 248, 0.4) !important;
      border-color: #38bdf8 !important;
    }
    .star-active-glow {
      color: #fbbf24 !important;
      filter: drop-shadow(0 0 5px rgba(251, 191, 36, 0.6));
    }
  `}</style>
);

/* V165.0 NEURAL BLACKOUT CSS LAYER */
const NeuralBlackoutLayerV165 = () => (
  <style>{`
    .btn-neural-loading:disabled {
      background-color: #000000 !important;
      border: 1.5px solid #00ff41 !important;
      box-shadow: inset 0 0 15px rgba(0, 255, 65, 0.4), 0 0 25px rgba(0, 255, 65, 0.2) !important;
      transition: all 0.2s ease-in-out !important;
    }
  `}</style>
);

/* V167.0 MATRIX 3-LINE LOADER LAYER */
const MatrixLoaderLayerV167 = () => (
  <style>{`
    .matrix-line-v3 {
      text-shadow: 0 0 5px #00ff41;
      animation: matrix-pulse 1.5s infinite alternate;
      font-family: 'Courier New', monospace !important;
      color: #00ff41 !important;
      font-size: 8px !important;
      line-height: 1.3 !important;
      letter-spacing: 2px !important;
      white-space: nowrap !important;
      overflow: hidden !important;
    }
    @keyframes matrix-pulse {
      from { opacity: 0.3; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }
  `}</style>
);

/* V164.0 LOGO INSTITUTIONAL HARMONY LAYER */
const LogoInstitutionalHarmonyLayerV164 = () => (
  <style>{`
    .logo-container-v2 {
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: flex-start !important;
      margin-top: 20px !important;
      margin-bottom: 20px !important;
      padding: 0 !important;
      gap: 0 !important;
      height: auto !important;
      min-height: 250px !important;
    }
    .logo-container-v2 svg {
      margin-top: 0 !important;
      margin-bottom: 10px !important;
      display: block !important;
      transform: scale(0.85) !important;
      overflow: visible !important;
    }
    .logo-container-v2 .text-center {
      margin-top: 0 !important; 
      margin-bottom: 0 !important;
      transform: none !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      width: 100% !important;
    }
    .logo-container-v2 h1 {
      margin: 0 !important;
      padding: 0 !important;
      line-height: 1 !important;
      font-size: 2.25rem !important;
    }
    [data-theme="light"] .logo-container-v2 h1 {
      color: #0f172a !important;
    }
    [data-theme="dark"] .logo-container-v2 h1 {
      color: #ffffff !important;
    }
    .red-laser-beam {
      display: none !important;
    }
  `}</style>
);

const VisualEquilibriumCorrectionLayer = () => (
  <style>{`
    .logo-container-v2 {
      margin-top: -85px !important;
      margin-bottom: -100px !important; 
      transform: scale(0.72) !important;
      opacity: 1 !important;
      visibility: visible !important;
      z-index: 50 !important;
      min-height: 180px !important;
      overflow: visible !important;
      display: flex !important;
    }
    .app-content-wrapper {
      padding-top: calc(105px + var(--safe-top)) !important;
    }
  `}</style>
);

const IncrementalVisualClarityLayer = () => (
  <style>{`
    *, .glass-ui, .ai-orb, body, #root, main, nav, footer, button, select, textarea, input {
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      filter: none !important;
      text-shadow: none !important;
      box-shadow: none !important;
    }
    [data-theme="dark"], [data-theme="light"] {
      --card-bg: var(--nav-bg);
    }
    .neural-badge { background: linear-gradient(90deg, #38bdf8, #22c55e); color: white; padding: 2px 8px; border-radius: 4px; font-size: 8px; font-weight: 900; text-transform: uppercase; margin-bottom: 4px; display: inline-block; }
    .quality-bar { height: 4px; background: #e2e8f0; border-radius: 2px; overflow: hidden; margin-top: 4px; }
    .quality-fill { height: 100%; transition: width 1s ease; }
    .neural-processing-node { border-right: 2px solid #38bdf8; padding-right: 8px; margin-bottom: 4px; animation: pulse 2s infinite; border-radius: 0 4px 4px 0; background: rgba(56, 189, 248, 0.05); }
  `}</style>
);

const DTMasterLogoV2 = ({ isSunlight = false }: { isSunlight?: boolean }) => {
  return (
    <div className="logo-container-v2 relative select-none">
      <svg width="220" height="220" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="animate-logo-shake">
        <defs>
          <linearGradient id="metal_v2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: isSunlight ? '#1e293b' : '#ffffff', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#38bdf8', stopOpacity: 1}} />
          </linearGradient>
        </defs>
        <g id="orbits-v2">
          <circle cx="256" cy="256" r="230" fill="none" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="10 20" opacity="0.1" />
          {[6, 8, 10, 12, 14, 7, 9, 11, 13, 15, 17, 19].map((dur, i) => (
            <circle key={i} r={i % 2 === 0 ? "5" : "3"} fill={i % 2 === 0 ? "#38bdf8" : "#22c55e"} opacity="0.6">
              <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={i % 2 === 0 ? "M 256,46 A 210,210 0 1 1 255.9,46 Z" : "M 256,46 A 210,210 0 1 0 256.1,46 Z"} />
            </circle>
          ))}
        </g>
        <g transform="translate(256, 256)">
          <path d="M-170 -90 V90 H-80 C-10 90 30 50 30 0 C30 -50 -10 -90 -80 -90 H-170 Z" fill="url(#metal_v2)" stroke="#38bdf8" strokeWidth="2" />
          <path d="M-135 -55 H-80 C-55 -55 -15 -35 -15 0 C-15 35 -55 55 -80 55 H-135 V-55 Z" fill={isSunlight ? '#f8fafc' : '#020617'} />
          <path d="M40 -90 H170 V-45 H125 V90 H80 V-45 H40 V-90 Z" fill="url(#metal_v2)" stroke="#38bdf8" strokeWidth="2" />
        </g>
      </svg>
      <div className="text-center">
        <h1 className="text-4xl font-black tracking-tighter" style={{ color: isSunlight ? '#0f172a' : '#ffffff' }}>DT-Prompt</h1>
        <div className="text-[11px] font-black uppercase tracking-[0.4em] text-sky-500">DICELION ENGINE v500 ULTIMATE</div>
      </div>
    </div>
  );
};

const DICELION_v500_INSTRUCTION = `
/* DICELION OFFLINE MICRO TO MACRO PROMPT ENGINE v500 */
ROLE: أنت محرك تحسين برمبت أوفلاين مدمج. مهمتك تحويل جملة المستخدم القصيرة إلى برمبت تنفيذي مفصل بدقة مؤسسية.
PIPELINE الإلزامي: [READ], [INTENT EXTRACTION], [GAP ANALYSIS], [STRUCTURE BUILD], [DOMAIN ENRICHMENT], [MULTI DRAFT], [INTERNAL SCORING], [AUTO LOOP].
يجب أن ينتهي كل برمبت بـ 'By DICELION'.
تنسيق JSON المخرج: { "original_prompt": "...", "refined_prompt": "...", "prompt_type": "...", "quality_score": 95, "analysis": "Arabic report" }.
`;

const calculateQualityScoreV500 = (prompt: string): number => {
  let score = 55;
  if (prompt.length > 800) score += 20;
  if (prompt.includes("By DICELION")) score += 5;
  if (/(64K|hyper-realistic|PBR|photogrammetry|volumetric)/i.test(prompt)) score += 10;
  return Math.min(score, 100);
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'library' | 'anatomy' | 'infographic' | 'history' | 'about' | 'guide' | 'settings'>('create');
  const [isSunlightMode, setIsSunlightMode] = useState(() => safeGetItem('dt_sunlight', 'true') === 'true');
  const [isGenerating, setIsGenerating] = useState(false);
  const [useNeuralEngine, setUseNeuralEngine] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [anatomySearch, setAnatomySearch] = useState('');
  const [infographicSearch, setInfographicSearch] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [refinedPrompt, setRefinedPrompt] = useState('');
  const [isRefinedEditing, setIsRefinedEditing] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [analysisReport, setAnalysisReport] = useState('');
  const [qualityScore, setQualityScore] = useState(0);
  const [history, setHistory] = useState<SavedPrompt[]>(() => JSON.parse(safeGetItem('dt_history', '[]')));
  
  const t = UI_TRANSLATIONS.ar;

  useEffect(() => {
    localStorage.setItem('dt_sunlight', isSunlightMode.toString());
    document.documentElement.setAttribute('data-theme', isSunlightMode ? 'light' : 'dark');
  }, [isSunlightMode]);

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
    if (!formData.mainText && formData.anatomyType === "بدون") return;
    setIsGenerating(true);
    setGeneratedPrompt("");
    setRefinedPrompt("");
    setAnalysisReport("");
    setIsRefinedEditing(false);
    setIsStarred(false);

    const isAnatomy = formData.anatomyType !== "بدون";
    const baseSubject = isAnatomy ? formData.anatomyType : formData.mainText;
    const coreStructure = `Subject: ${baseSubject}, Mode: ${formData.promptMode}, Tech: ${formData.technical}`;
    setGeneratedPrompt(coreStructure);

    if (useNeuralEngine) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
        const v500_Response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `DICELION v500: "${coreStructure}". Score must exceed 90.`,
          config: { systemInstruction: DICELION_v500_INSTRUCTION, responseMimeType: "application/json" }
        });

        const v500_Data = JSON.parse(v500_Response.text || "{}");
        const finalRefined = v500_Data.refined_prompt || v500_Data.refinedPrompt || coreStructure;
        const finalScore = v500_Data.quality_score || calculateQualityScoreV500(finalRefined);

        setRefinedPrompt(finalRefined);
        setQualityScore(finalScore);
        setAnalysisReport(v500_Data.analysis || "تحليل v500 مكتمل.");
      } catch (err) {
        setRefinedPrompt(coreStructure);
        setQualityScore(calculateQualityScoreV500(coreStructure));
      }
    } else {
      setRefinedPrompt(coreStructure);
      setQualityScore(calculateQualityScoreV500(coreStructure));
    }
    setIsGenerating(false);
  };

  const saveToHistory = () => {
    if (!generatedPrompt) return;
    const newSaved: SavedPrompt = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      fullPrompt: generatedPrompt,
      summary: formData.mainText || formData.anatomyType,
      refinedPrompt: refinedPrompt,
      qualityScore: qualityScore,
      analysisReport: analysisReport
    };
    const newHistory = [newSaved, ...history];
    setHistory(newHistory);
    localStorage.setItem('dt_history', JSON.stringify(newHistory));
    alert(t.saved);
  };

  const performCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert(t.copied);
  };

  const performShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'DT-Prompt Output',
          text: refinedPrompt,
        });
      } catch (err) { console.debug('Share cancelled'); }
    } else {
      performCopy(refinedPrompt);
      alert('المشاركة غير مدعومة في متصفحك، تم نسخ النص بدلاً من ذلك.');
    }
  };

  const filteredLibrary = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return PRO_ULTRA_DB.filter(s => s.ar.toLowerCase().includes(q)).slice(0, 100);
  }, [searchQuery]);

  const filteredAnatomy = useMemo(() => {
    const q = anatomySearch.toLowerCase();
    return ANATOMY_OPTIONS.filter((s, i) => i > 0 && s.toLowerCase().includes(q)).slice(0, 100);
  }, [anatomySearch]);

  const filteredInfographic = useMemo(() => {
    const q = infographicSearch.toLowerCase();
    return INFOGRAPHIC_OPTIONS.filter((s, i) => i > 0 && s.toLowerCase().includes(q)).slice(0, 100);
  }, [infographicSearch]);

  const anatomyDropdownOptions = useMemo(() => ANATOMY_OPTIONS.slice(0, 1001), []);
  const infographicDropdownOptions = useMemo(() => INFOGRAPHIC_OPTIONS.slice(0, 1001), []);

  return (
    <div className={`min-h-screen flex flex-col w-full rtl`}>
      <IncrementalVisualClarityLayer />
      <VisualEquilibriumCorrectionLayer />
      <NeuralBlackoutLayerV165 />
      <MatrixLoaderLayerV167 />
      <SmartActionBarLayerV180 />
      
      <nav className="nav-fixed-top glass-ui shadow-lg">
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-4 sm:gap-12 w-full px-4 sm:px-6">
             <NavIcon active={activeTab === 'create'} onClick={() => setActiveTab('create')} icon="🏠" label={t.tabs.home} />
             <NavIcon active={activeTab === 'anatomy'} onClick={() => setActiveTab('anatomy')} icon="🧬" label={t.tabs.anatomy} />
             <NavIcon active={activeTab === 'infographic'} onClick={() => setActiveTab('infographic')} icon="📊" label={t.tabs.infographic} />
             <NavIcon active={activeTab === 'library'} onClick={() => setActiveTab('library')} icon="💎" label={t.tabs.library} />
             <NavIcon active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon="⚙️" label={t.tabs.settings} />
        </div>
      </nav>

      <main className="app-content-wrapper pb-32">
        <DTMasterLogoV2 isSunlight={isSunlightMode} />

        {activeTab === 'create' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex justify-center gap-8 py-4 border-b border-white/5">
              <button onClick={() => setFormData(p=>({...p, promptMode: 'image'}))} className={`flex flex-col items-center gap-2 transition-all ${formData.promptMode === 'image' ? 'text-sky-500 scale-110' : 'opacity-30'}`}>
                <span className="text-3xl">🖼️</span>
                <span className="text-[10px] font-black uppercase">{t.promptMode.image}</span>
              </button>
              <button onClick={() => setFormData(p=>({...p, promptMode: 'video'}))} className={`flex flex-col items-center gap-2 transition-all ${formData.promptMode === 'video' ? 'text-sky-500 scale-110' : 'opacity-30'}`}>
                <span className="text-3xl">🎬</span>
                <span className="text-[10px] font-black uppercase">{t.promptMode.video}</span>
              </button>
              <button onClick={() => setFormData(p=>({...p, promptMode: 'post'}))} className={`flex flex-col items-center gap-2 transition-all ${formData.promptMode === 'post' ? 'text-sky-500 scale-110' : 'opacity-30'}`}>
                <span className="text-3xl">📝</span>
                <span className="text-[10px] font-black uppercase">{t.promptMode.post}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-ui p-6 rounded-[2.5rem] space-y-4 shadow-xl">
                  <SelectBox label={t.labels.ratio} options={ASPECT_RATIOS} value={formData.aspectRatio} onChange={(e:any) => setFormData(p=>({...p, aspectRatio: e.target.value}))} />
                  <SelectBox label={t.labels.mood} options={MOODS} value={formData.mood} onChange={(e:any) => setFormData(p=>({...p, mood: e.target.value}))} />
                  <SelectBox label={t.labels.bg} options={BACKGROUNDS} value={formData.background} onChange={(e:any) => setFormData(p=>({...p, background: e.target.value}))} />
                  <div className={`p-6 rounded-3xl text-center border shadow-inner ${isSunlightMode ? 'bg-sky-50/50 border-sky-100' : 'bg-sky-950/20 border-sky-900/50'}`}>
                    <span className="text-[9px] font-black text-sky-500 uppercase block mb-2">{t.labels.wisdomLabel}</span>
                    <p className="text-xs font-bold italic">"{WISDOM_QUOTES[Math.floor(Math.random()*WISDOM_QUOTES.length)]}"</p>
                  </div>
              </div>

              <div className="glass-ui p-6 rounded-[2.5rem] space-y-4 shadow-xl">
                  <SelectBox label={t.labels.elements} options={ELEMENTS} value={formData.elements} onChange={(e:any) => setFormData(p=>({...p, elements: e.target.value}))} />
                  <SelectBox label={t.labels.tech} options={TECHNICALS} value={formData.technical} onChange={(e:any) => setFormData(p=>({...p, technical: e.target.value}))} />
                  <SelectBox label={t.labels.model} options={AI_MODELS} value={formData.targetModel} onChange={(e:any) => setFormData(p=>({...p, targetModel: e.target.value}))} />
                  <div className="pt-2 grid grid-cols-1 gap-2">
                    <CheckBox label={t.labels.neuralEngine} checked={useNeuralEngine} onChange={(e:any) => setUseNeuralEngine(e.target.checked)} />
                    <CheckBox label={t.labels.exclusivePsychology} checked={formData.exclusivePsychology} onChange={(e:any) => setFormData(p=>({...p, exclusivePsychology: e.target.checked}))} />
                    <CheckBox label={t.labels.analyzeImage} checked={formData.useReferenceImage} onChange={(e:any) => setFormData(p=>({...p, useReferenceImage: e.target.checked}))} />
                  </div>
              </div>
            </div>

            <div className="glass-ui p-6 rounded-[3rem] space-y-4 shadow-2xl border-sky-500/20">
              <button onClick={generate} disabled={isGenerating} className="btn-neural-loading relative w-full py-5 rounded-full font-black uppercase bg-sky-600 text-white shadow-2xl hover:bg-sky-500 transition-all flex items-center justify-center min-h-[70px] overflow-hidden">
                {isGenerating ? <HackerAnalyzerLoader /> : t.generateBtn}
              </button>
              <InputArea label={t.labels.text} value={formData.mainText} onChange={(e:any) => setFormData(p=>({...p, mainText: e.target.value}))} placeholder={t.placeholders.text} />
            </div>

            {(generatedPrompt || refinedPrompt) && (
              <div className="space-y-6 animate-in slide-in-from-bottom">
                 {refinedPrompt && (
                   <div className="glass-ui p-8 rounded-[3rem] border-emerald-500/30 shadow-2xl v500-output-container">
                     <div className="flex items-center justify-between mb-4">
                        <div className="neural-badge">v500 MASTERPIECE OUTPUT</div>
                        <div className="flex flex-col items-end">
                           <div className="text-[10px] font-black text-emerald-500 uppercase">QUALITY SCORE: {qualityScore}%</div>
                           <div className="quality-bar w-32"><div className="quality-fill bg-emerald-500" style={{ width: `${qualityScore}%` }} /></div>
                        </div>
                     </div>
                     
                     <div className="flex items-center gap-2 mb-4 bg-black/5 p-2 rounded-2xl border border-white/5">
                        <button onClick={() => performCopy(refinedPrompt)} className="flex-1 py-5 bg-emerald-600 text-white rounded-[1.25rem] font-black shadow-lg hover:bg-emerald-500 transform active:scale-95 transition-all">نسخ البرومبت المطور V500</button>
                        
                        <div className="flex gap-1">
                          <div onClick={() => setIsRefinedEditing(!isRefinedEditing)} className={`action-icon-btn glass-ui ${isRefinedEditing ? 'edit-active-glow' : ''}`}>
                            <span className="text-lg">✍️</span>
                            <span className="tooltip">تعديل</span>
                          </div>
                          <div onClick={performShare} className="action-icon-btn glass-ui">
                            <span className="text-lg">🔗</span>
                            <span className="tooltip">مشاركة</span>
                          </div>
                          <div onClick={() => setIsStarred(!isStarred)} className={`action-icon-btn glass-ui ${isStarred ? 'star-active-glow' : ''}`}>
                            <span className="text-lg">{isStarred ? '⭐' : '☆'}</span>
                            <span className="tooltip">تمييز</span>
                          </div>
                          <div onClick={saveToHistory} className="action-icon-btn glass-ui">
                            <span className="text-lg">💾</span>
                            <span className="tooltip">حفظ</span>
                          </div>
                        </div>
                     </div>

                     {isRefinedEditing ? (
                        <textarea 
                          value={refinedPrompt} 
                          onChange={(e) => setRefinedPrompt(e.target.value)}
                          className="w-full h-[450px] p-7 rounded-[2rem] text-[12px] font-mono leading-relaxed bg-black/30 border border-sky-500/30 text-emerald-400 outline-none resize-none scrollbar-hide"
                        />
                     ) : (
                       <div className="p-7 rounded-[2rem] text-[12px] font-mono leading-relaxed bg-black/20 border h-[450px] overflow-y-auto whitespace-pre-wrap text-emerald-400 scrollbar-hide">
                         {refinedPrompt}
                       </div>
                     )}
                   </div>
                 )}
                 <div className="glass-ui p-8 rounded-[3rem] opacity-70">
                    <div className="text-[9px] font-black uppercase text-sky-500 mb-2">MICRO CORE INPUT</div>
                    <div className={`p-7 rounded-[2rem] text-[11px] font-mono leading-relaxed bg-black/10 border h-[150px] overflow-y-auto whitespace-pre-wrap`}>
                      {generatedPrompt}
                    </div>
                 </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'anatomy' && (
          <div className="space-y-6 animate-in fade-in">
             <div className="glass-ui p-8 rounded-[3rem] shadow-2xl space-y-6 text-center border-t-4 border-sky-500">
               <div className="space-y-2">
                  <span className="text-5xl drop-shadow-lg">🧬</span>
                  <h2 className="text-2xl font-black text-sky-500 uppercase tracking-tight">مركز التشريح الذكي</h2>
                  <p className="text-[10px] font-bold opacity-50 uppercase tracking-[0.2em]">هندسة مجهرية لـ 5000 تخصص</p>
               </div>
               <div className="pt-6 border-t border-white/5 space-y-4">
                 <SelectBox label="تصفح التخصصات (1000 خيار)" options={anatomyDropdownOptions} value={formData.anatomyType} onChange={(e:any) => { setFormData(p=>({...p, anatomyType: e.target.value})); setAnatomySearch(e.target.value); }} />
                 <div className="h-14 rounded-full flex items-center px-6 border border-white/10 bg-black/5">
                    <span className="mr-2 opacity-50">🔍</span>
                    <input type="text" placeholder={t.placeholders.anatomySearch} className="bg-transparent flex-1 outline-none font-bold text-sm text-[var(--input-text)]" value={anatomySearch} onChange={(e) => setAnatomySearch(e.target.value)} />
                 </div>
               </div>
               <button onClick={() => setActiveTab('create')} className="w-full py-5 bg-sky-600 text-white rounded-full font-black uppercase shadow-2xl hover:bg-sky-500 transition-all flex items-center justify-center gap-3 active:scale-95">
                  <span>اعتماد التخصص والتوجه للمختبر</span>
                  <span className="text-xl">🚀</span>
               </button>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredAnatomy.map((s, idx) => (
                   <div key={idx} className="p-7 glass-ui rounded-[2.5rem] flex flex-col border-sky-500/5 hover:border-sky-500/20 transition-all group shadow-sm">
                      <span className="text-[9px] font-black uppercase text-sky-500 mb-2">تخصص مجهري | #{s.split(' – ')[0]}</span>
                      <p className="text-[13px] font-bold flex-grow mb-6 leading-relaxed line-clamp-3">{s.split(' – ')[1] || s}</p>
                      <button onClick={() => { setFormData(p => ({...p, anatomyType: s})); setActiveTab('create'); }} className="w-full py-4 bg-sky-600 text-white rounded-[1.25rem] font-black text-xs uppercase shadow-lg hover:bg-sky-500 transition-all">{t.editInStudio}</button>
                   </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'infographic' && (
          <div className="space-y-6 animate-in fade-in">
             <div className="glass-ui p-8 rounded-[3rem] shadow-2xl space-y-6 text-center border-t-4 border-emerald-500">
               <div className="space-y-2">
                  <span className="text-5xl drop-shadow-lg">📊</span>
                  <h2 className="text-2xl font-black text-emerald-500 uppercase tracking-tight">مركز الانفوجرافيك</h2>
                  <p className="text-[10px] font-bold opacity-50 uppercase tracking-[0.2em]">هندسة بصرية لـ 5000 قالب انفوجرافيك</p>
               </div>
               <div className="pt-6 border-t border-white/5 space-y-4">
                 <SelectBox label="تصفح القوالب (1000 خيار)" options={infographicDropdownOptions} value={formData.mainText} onChange={(e:any) => { setFormData(p=>({...p, mainText: e.target.value})); setInfographicSearch(e.target.value); }} />
                 <div className="h-14 rounded-full flex items-center px-6 border border-white/10 bg-black/5">
                    <span className="mr-2 opacity-50">🔍</span>
                    <input type="text" placeholder={t.placeholders.infographicSearch} className="bg-transparent flex-1 outline-none font-bold text-sm text-[var(--input-text)]" value={infographicSearch} onChange={(e) => setInfographicSearch(e.target.value)} />
                 </div>
               </div>
               <button onClick={() => setActiveTab('create')} className="w-full py-5 bg-emerald-600 text-white rounded-full font-black uppercase shadow-2xl hover:bg-emerald-500 transition-all flex items-center justify-center gap-3 active:scale-95">
                  <span>اعتماد القالب والتوجه للمختبر</span>
                  <span className="text-xl">🎨</span>
               </button>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredInfographic.map((s, idx) => (
                   <div key={idx} className="p-7 glass-ui rounded-[2.5rem] flex flex-col border-emerald-500/5 hover:border-emerald-500/20 transition-all group shadow-sm">
                      <span className="text-[9px] font-black uppercase text-emerald-500 mb-2">قالب انفوجرافيك | #{s.split(' – ')[0]}</span>
                      <p className="text-[13px] font-bold flex-grow mb-6 leading-relaxed line-clamp-3">{s.split(' – ')[1] || s}</p>
                      <button onClick={() => { setFormData(p => ({...p, mainText: s})); setActiveTab('create'); }} className="w-full py-4 bg-emerald-600 text-white rounded-[1.25rem] font-black text-xs uppercase shadow-lg hover:bg-emerald-500 transition-all">{t.editInStudio}</button>
                   </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'library' && (
          <div className="space-y-6 animate-in fade-in">
             <div className="glass-ui p-6 rounded-[2.5rem] shadow-sm space-y-4">
               <SelectBox label="تصفح التخصصات المليونية" options={PRO_ULTRA_DB.map(i => i.ar)} value={searchQuery} onChange={(e: any) => setSearchQuery(e.target.value)} />
               <input type="text" placeholder={t.placeholders.search} className="w-full h-14 bg-transparent outline-none font-bold px-4 border-b border-white/10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredLibrary.map((s, idx) => (
                   <div key={idx} className="p-7 glass-ui rounded-[2.5rem] flex flex-col hover:border-sky-500/20 transition-all">
                      <span className="text-[9px] font-black uppercase text-sky-500 mb-2">#{s.id} | {s.cat}</span>
                      <p className="text-[13px] font-bold flex-grow mb-6">{s.ar}</p>
                      <button onClick={() => { setFormData(p => ({...p, mainText: s.ar})); setActiveTab('create'); }} className="w-full py-4 bg-sky-600 text-white rounded-[1.25rem] font-black text-xs uppercase shadow-md">{t.editInStudio}</button>
                   </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-6 animate-in fade-in text-center">
            <h3 className="text-xl font-black text-sky-500 uppercase tracking-widest">{t.history.title}</h3>
            {history.length === 0 ? <p className="opacity-50">{t.history.empty}</p> : history.map(h => (
              <div key={h.id} className="p-6 glass-ui rounded-[2rem] mb-4 text-start shadow-md border-white/5">
                 <div className="flex justify-between items-start mb-2">
                   <span className="text-[10px] text-sky-500 font-bold">{h.date}</span>
                   {h.qualityScore && <span className="neural-badge">SCORE: {h.qualityScore}%</span>}
                 </div>
                 <p className="text-sm font-bold truncate mb-3">{h.summary}</p>
                 <div className="flex gap-3">
                   <button onClick={() => performCopy(h.refinedPrompt || h.fullPrompt)} className="flex-1 py-3 bg-emerald-600/10 text-emerald-400 rounded-xl font-black text-[9px] uppercase border border-emerald-500/20">نسخ المحسن (v500)</button>
                   <button onClick={() => performCopy(h.fullPrompt)} className="flex-1 py-3 bg-sky-600/10 text-sky-400 rounded-xl font-black text-[9px] uppercase border border-sky-500/20">نسخ الأساسي</button>
                 </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="space-y-6 animate-in fade-in p-8 glass-ui rounded-[3rem] text-start">
             <h2 className="text-2xl font-black text-sky-500 mb-4">دليل الاستخدام الفني</h2>
             <p className="opacity-70 leading-relaxed font-bold">DT-Prompt هو محرك هندسي متقدم لتوليد الأوامر البرمجية بدقة استثنائية باستخدام تقنية v500 Micro-to-Macro.</p>
             <button onClick={() => setActiveTab('settings')} className="mt-8 text-sky-500 font-black text-xs uppercase flex items-center gap-2">← العودة للإعدادات</button>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-6 animate-in fade-in p-8 glass-ui rounded-[3rem] text-center">
             <div className="w-24 h-24 bg-sky-500 rounded-full mx-auto flex items-center justify-center text-white text-3xl mb-4">👤</div>
             <h2 className="text-2xl font-black text-sky-500">Dicelion-Technique</h2>
             <p className="font-bold">هندسة الحلول الرقمية والتحول الذكي</p>
             <button onClick={() => setActiveTab('settings')} className="mt-8 text-sky-500 font-black text-xs uppercase flex items-center gap-2 justify-center">← العودة للإعدادات</button>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6 animate-in fade-in p-2">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={() => setIsSunlightMode(!isSunlightMode)} className="glass-ui p-8 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 hover:border-sky-500 transition-all shadow-lg">
                   <span className="text-4xl">{isSunlightMode ? '🌑' : '☀️'}</span>
                   <span className="font-black text-xs uppercase tracking-tight">{isSunlightMode ? 'تفعيل الوضع الداكن' : 'تفعيل الوضع الساطع'}</span>
                </button>
                <button onClick={() => setActiveTab('history')} className="glass-ui p-8 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 hover:border-sky-500 transition-all shadow-lg">
                   <span className="text-4xl">📜</span>
                   <span className="font-black text-xs uppercase tracking-tight">سجل المحفوظات</span>
                </button>
                <button onClick={() => setActiveTab('guide')} className="glass-ui p-8 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 hover:border-sky-500 transition-all shadow-lg">
                   <span className="text-4xl">📖</span>
                   <span className="font-black text-xs uppercase tracking-tight">دليل الاستخدام</span>
                </button>
                <button onClick={() => setActiveTab('about')} className="glass-ui p-8 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 hover:border-sky-500 transition-all shadow-lg">
                   <span className="text-4xl">👤</span>
                   <span className="font-black text-xs uppercase tracking-tight">عن المطور</span>
                </button>
             </div>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 w-full glass-ui p-4 text-center z-50">
        <span className="text-[8px] font-black opacity-30 uppercase tracking-[0.4em]">Dicelion OFFLINE v180.0 | SMART ACTION BAR | SECURE_STABILITY</span>
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
  <label className="flex items-center gap-3 p-4 rounded-2xl glass-ui cursor-pointer group hover:bg-white/5 transition-all">
    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${checked ? 'bg-sky-500 border-sky-400' : 'border-white/10'}`}>
       {checked && <span className="text-white text-[10px]">✓</span>}
    </div>
    <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
    <span className={`text-[10px] font-bold ${checked ? 'text-sky-500' : 'opacity-50'}`}>{label}</span>
  </label>
);

const InputArea = ({ label, value, onChange, placeholder, height = "h-36" }: any) => (
  <div className="space-y-1 w-full text-start">
    {label && <label className="text-[9px] font-black text-sky-500 uppercase px-1">{label}</label>}
    <textarea value={value} onChange={onChange} placeholder={placeholder} className={`w-full ${height} textarea-element outline-none resize-none leading-relaxed shadow-inner`} />
  </div>
);

const NavIcon = ({ active, icon, onClick, label }: any) => (
  <div className="flex flex-col items-center">
    <button onClick={onClick} className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full transition-all duration-300 ${active ? 'bg-sky-500 text-white scale-110 shadow-lg' : 'bg-white/5 opacity-50'}`}><span className="text-lg sm:text-xl">{icon}</span></button>
    <span className={`mt-1 text-[7px] sm:text-[8px] font-black uppercase ${active ? 'text-sky-500' : 'opacity-30'}`}>{label}</span>
  </div>
);

const HackerAnalyzerLoader = () => {
  const [matrixLines, setMatrixLines] = useState<string[]>(["", "", ""]);
  useEffect(() => {
    const int = setInterval(() => {
      const newLines = [0, 1, 2].map(() => {
        let l = "";
        for (let i = 0; i < 48; i++) {
          l += Math.floor(Math.random() * 10);
        }
        return l;
      });
      setMatrixLines(newLines);
    }, 65);
    return () => clearInterval(int);
  }, []);
  return (
    <div className="absolute inset-0 bg-black flex flex-col items-center justify-center p-2">
      {matrixLines.map((line, idx) => (
        <div key={idx} className="matrix-line-v3">
          {line}
        </div>
      ))}
    </div>
  );
};

export default App;
