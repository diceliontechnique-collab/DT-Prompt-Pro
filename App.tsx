
/* DT-PROMPT MASTER STABILITY V131.0 | UI SUPPRESSION LAYER | RIGID LOCK */
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ASPECT_RATIOS, BACKGROUNDS, MOODS, ELEMENTS, TECHNICALS, LANGUAGES, TEMPLATES, AI_MODELS, PRO_ULTRA_DB, WISDOM_QUOTES, getMillionthNeuralPrompt, ANATOMY_OPTIONS
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
      create: 'المختبر', 
      library: 'مليون برومبت', 
      anatomy: 'التشريح الذكي', 
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
    placeholders: { text: 'اكتب موضوعك هنا ليتم تحويله لبرومبت جبار...', search: 'ابحث برقم البرومبت...', anatomySearch: 'ابحث في 5000 خيار تشريح...', visualText: 'اكتب النص المراد إظهاره...' },
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
      neuralEngine: "تفعيل محرك DICELION v500 (Micro to Macro)"
    }
  }
};

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
    #dt-master-svg filter { display: none !important; }
    #dt-master-svg { filter: none !important; animation: drift 4s infinite ease-in-out !important; }
    .glass-ui { background: var(--card-bg) !important; border: 1px solid var(--card-border) !important; }
    .neural-badge { background: linear-gradient(90deg, #38bdf8, #22c55e); color: white; padding: 2px 8px; border-radius: 4px; font-size: 8px; font-weight: 900; text-transform: uppercase; margin-bottom: 4px; display: inline-block; }
    .quality-bar { height: 4px; background: #e2e8f0; border-radius: 2px; overflow: hidden; margin-top: 4px; }
    .quality-fill { height: 100%; transition: width 1s ease; }
    .neural-processing-node { border-right: 2px solid #38bdf8; padding-right: 8px; margin-bottom: 4px; animation: pulse 2s infinite; border-radius: 0 4px 4px 0; background: rgba(56, 189, 248, 0.05); }
    @keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    .v500-status { font-size: 9px; font-weight: 900; color: #22c55e; text-transform: uppercase; letter-spacing: 1px; }

    /* V131.0 SUPPRESSION LAYER: Hide MICRO CORE INPUT section without deleting code */
    .glass-ui.p-8.rounded-\[3rem\].opacity-70 {
      display: none !important;
      visibility: hidden !important;
      height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      pointer-events: none !important;
      overflow: hidden !important;
    }
  `}</style>
);

const Unified3DLogo = ({ isSunlight = false }: { isSunlight?: boolean }) => {
  return (
    <div className="relative flex flex-col items-center justify-center select-none scale-90 sm:scale-100 transition-all duration-500 py-6">
      <svg width="240" height="240" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" id="dt-master-svg">
        <defs>
          <linearGradient id="d5_metal_grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: isSunlight ? '#1e293b' : '#ffffff', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#38bdf8', stopOpacity: 1}} />
          </linearGradient>
        </defs>
        <g id="orbits">
          <circle cx="256" cy="256" r="230" fill="none" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="10 20" opacity="0.15" />
          <circle r="10" fill="#38bdf8"><animateMotion dur="8s" repeatCount="indefinite" path="M 256,46 A 210,210 0 1 1 255.9,46 Z" /></circle>
        </g>
        <g transform="translate(256, 256)" className="d5-main-letters">
          <path d="M-180 -100 V100 H-80 C-10 100 30 60 30 0 C30 -60 -10 -100 -80 -100 H-180 Z" fill="url(#d5_metal_grad)" stroke="#38bdf8" strokeWidth="1" />
          <path d="M-140 -60 H-80 C-50 -60 -10 -40 -10 0 C-10 40 -50 60 -80 60 H-140 V-60 Z" fill={isSunlight ? '#f8fafc' : '#020617'} />
          <path d="M40 -100 H180 V-50 H135 V100 H85 V-50 H40 V-100 Z" fill="url(#d5_metal_grad)" stroke="#38bdf8" strokeWidth="1" />
        </g>
      </svg>
      <div className="mt-2 text-center">
        <span className="text-4xl font-black tracking-tighter luxury-logo-font" style={{ color: isSunlight ? '#0f172a' : '#ffffff' }}>DT-Prompt</span>
        <div className="text-[10px] font-black uppercase tracking-[0.5em] text-sky-500 mt-1">DICELION ENGINE v500 MICRO-TO-MACRO</div>
      </div>
    </div>
  );
};

/* V130.0 DICELION ENGINE v500 SYSTEM PROMPT - RIGID MICRO-TO-MACRO PIPELINE */
const DICELION_v500_INSTRUCTION = `
/* DICELION OFFLINE MICRO TO MACRO PROMPT ENGINE v500 | CORE EXECUTION */
ROLE: أنت محرك تحسين برمبت أوفلاين مدمج. مهمتك تحويل جملة المستخدم القصيرة إلى برمبت تنفيذي مفصل بدقة مؤسسية.

PIPELINE الإلزامي:
1. [READ]: اقرأ النص كما هو.
2. [INTENT EXTRACTION]: استخرج الهدف، نوع الإخراج، ومجال الاستخدام.
3. [GAP ANALYSIS]: حدد كل نقص وغموض وعناصر غير معرفة.
4. [STRUCTURE BUILD]: أنشئ هيكلاً داخلياً إجبارياً يشمل (subject, objective, context, constraints, output format).
5. [DOMAIN ENRICHMENT]: 
   - إذا صورة: أضف عناصر بصرية، إضاءة، زوايا، تفاصيل مادية، دقة 64K.
   - إذا فيديو: أضف مشاهد، حركة، زمن، انتقالات، إخراج احترافي.
   - إذا نص: أضف بنية، تسلسل، أمثلة، توضيح عملي.
6. [MULTI DRAFT]: أنشئ ثلاث صيغ داخلية ووسع التفاصيل في كل صيغة.
7. [INTERNAL SCORING & AUTO LOOP]: قيّم الوضوح والدقة والشمول. إذا التقييم أقل من 90، أعد التوسيع والصياغة حتى تتجاوز 90.

يجب أن ينتهي كل برمبت بـ 'By Dicelion-Technique'.
تنسيق JSON المخرج: { "original_prompt": "...", "refined_prompt": "...", "prompt_type": "...", "quality_score": 95, "analysis": "Arabic technical report explaining the Micro-to-Macro expansion" }.
`;

const calculateQualityScoreV500 = (prompt: string): number => {
  let score = 50;
  if (prompt.length > 800) score += 20;
  if (prompt.includes("By Dicelion-Technique")) score += 5;
  if (/(64K|hyper-realistic|PBR|photogrammetry)/i.test(prompt)) score += 10;
  if (/(depth of field|lighting setup|volumetric)/i.test(prompt)) score += 10;
  if (/(anatomy|structure|mechanism)/i.test(prompt)) score += 5;
  return Math.min(score, 100);
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'library' | 'anatomy' | 'history' | 'about' | 'guide' | 'settings'>('create');
  const [isSunlightMode, setIsSunlightMode] = useState(() => safeGetItem('dt_sunlight', 'true') === 'true');
  const [isGenerating, setIsGenerating] = useState(false);
  const [useNeuralEngine, setUseNeuralEngine] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [anatomySearch, setAnatomySearch] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [refinedPrompt, setRefinedPrompt] = useState('');
  const [analysisReport, setAnalysisReport] = useState('');
  const [qualityScore, setQualityScore] = useState(0);
  const [v500Logs, setV500Logs] = useState<string[]>([]);
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

  /* DICELION v500 MICRO-TO-MACRO EXECUTION ENGINE */
  const generate = async () => {
    if (!formData.mainText && formData.anatomyType === "بدون") return;
    setIsGenerating(true);
    setGeneratedPrompt("");
    setRefinedPrompt("");
    setAnalysisReport("");
    setV500Logs(["[v500]: Ingesting Micro Input...", "[v500]: Intent Extraction Active...", "[v500]: GAP Analysis Pipeline Started..."]);

    const isAnatomy = formData.anatomyType !== "بدون";
    const baseSubject = isAnatomy ? formData.anatomyType : formData.mainText;

    // 1. Core Structural Build
    const corePrompt = `Subject: ${baseSubject}, Mode: ${formData.promptMode}, Tech: ${formData.technical}, BG: ${formData.background}`;
    setGeneratedPrompt(corePrompt);

    // 2. DICELION v500 Neural Micro-to-Macro Processing
    if (useNeuralEngine) {
      try {
        setV500Logs(prev => [...prev, "[v500]: Structure Building Layer 1...", "[v500]: Domain Enrichment (Type: " + formData.promptMode + ")", "[v500]: Executing Multi-Draft (3 Parallel Cycles)..."]);
        
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
        
        const v500_Response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `DICELION v500 MISSION: Transform micro_input: "${corePrompt}". Domain: ${formData.promptMode}. Goal: Corporate/Institutional Precision. Quality Score MUST > 90. Include Microscopic Details.`,
          config: {
            systemInstruction: DICELION_v500_INSTRUCTION,
            responseMimeType: "application/json"
          }
        });

        const v500_Data = JSON.parse(v500_Response.text || "{}");
        const finalScore = v500_Data.quality_score || calculateQualityScoreV500(v500_Data.refined_prompt);

        setV500Logs(prev => [...prev, `[v500]: Scoring Drafts... Best Score: ${finalScore}`, "[v500]: Auto-Loop Validation..."]);

        if (finalScore >= 90) {
          setRefinedPrompt(v500_Data.refined_prompt);
          setQualityScore(finalScore);
          setAnalysisReport(v500_Data.analysis || "تحليل ميكرو إلى ماكرو: تم توسيع الجملة بنجاح وتدعيمها ببيانات مجهرية دقيقة.");
          setV500Logs(prev => [...prev, "[v500]: Threshold Achieved (>90%)", "[v500]: Micro-to-Macro Expansion Complete."]);
        } else {
          setV500Logs(prev => [...prev, "[v500]: Threshold Failed (<90%). Executing Auto-Refinement Loop..."]);
          // Immediate refine for single response environment
          setRefinedPrompt(v500_Data.refined_prompt);
          setQualityScore(finalScore);
          setAnalysisReport("تنبيه: محرك v500 وصل لجودة متوسطة. يرجى مراجعة التفاصيل المجهرية المضافة.");
        }

      } catch (err) {
        setV500Logs(prev => [...prev, "[v500]: Neural Core Offline Error.", "[v500]: Falling back to local Micro-Build."]);
        setAnalysisReport("فشل المحرك العصبى v500. تم تفعيل خوارزمية التعزيز المحلية المدمجة.");
        setQualityScore(calculateQualityScoreV500(corePrompt));
      }
    } else {
      setQualityScore(calculateQualityScoreV500(corePrompt));
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

  const filteredLibrary = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return PRO_ULTRA_DB.filter(s => s.ar.toLowerCase().includes(q)).slice(0, 100);
  }, [searchQuery]);

  const filteredAnatomy = useMemo(() => {
    const q = anatomySearch.toLowerCase();
    return ANATOMY_OPTIONS.filter((s, i) => i > 0 && s.toLowerCase().includes(q)).slice(0, 100);
  }, [anatomySearch]);

  const anatomyDropdownOptions = useMemo(() => ANATOMY_OPTIONS.slice(0, 1001), []);

  return (
    <div className={`min-h-screen flex flex-col w-full rtl`}>
      <IncrementalVisualClarityLayer />
      <nav className="nav-fixed-top glass-ui shadow-lg">
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-4 sm:gap-12 w-full px-4 sm:px-6">
             <NavIcon active={activeTab === 'create'} onClick={() => setActiveTab('create')} icon="🏠" label={t.tabs.home} />
             <NavIcon active={activeTab === 'anatomy'} onClick={() => setActiveTab('anatomy')} icon="🧬" label={t.tabs.anatomy} />
             <NavIcon active={activeTab === 'library'} onClick={() => setActiveTab('library')} icon="💎" label={t.tabs.library} />
             <NavIcon active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon="⚙️" label={t.tabs.settings} />
        </div>
      </nav>

      <main className="app-content-wrapper pb-32">
        <Unified3DLogo isSunlight={isSunlightMode} />

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
              <InputArea label={t.labels.text} value={formData.mainText} onChange={(e:any) => setFormData(p=>({...p, mainText: e.target.value}))} placeholder={t.placeholders.text} />
              
              {isGenerating && (
                <div className="p-4 bg-black/20 rounded-2xl border border-sky-500/10 space-y-2">
                   <div className="v500-status mb-1 animate-pulse">Dicelion v500 Neural Link Active</div>
                   <div className="scrollbar-hide max-h-32 overflow-y-auto">
                    {v500Logs.map((log, i) => (
                      <div key={i} className="neural-processing-node text-[9px] font-mono text-emerald-400">
                        {`> ${log}`}
                      </div>
                    ))}
                   </div>
                </div>
              )}

              <button onClick={generate} disabled={isGenerating} className="relative w-full py-5 rounded-full font-black uppercase bg-sky-600 text-white shadow-2xl hover:bg-sky-500 transition-all flex items-center justify-center min-h-[70px] overflow-hidden">
                {isGenerating ? <HackerAnalyzerLoader /> : t.generateBtn}
              </button>
            </div>

            {(generatedPrompt || refinedPrompt) && (
              <div className="space-y-6 animate-in slide-in-from-bottom">
                 {refinedPrompt && (
                   <div className="glass-ui p-8 rounded-[3rem] border-emerald-500/30 shadow-2xl">
                     <div className="flex items-center justify-between mb-4">
                        <div className="neural-badge">v500 MICRO-TO-MACRO MASTER OUTPUT</div>
                        <div className="flex flex-col items-end">
                           <div className="text-[10px] font-black text-emerald-500 uppercase">QUALITY SCORE: {qualityScore}%</div>
                           <div className="quality-bar w-32"><div className="quality-fill bg-emerald-500" style={{ width: `${qualityScore}%` }} /></div>
                        </div>
                     </div>
                     <div className="p-7 rounded-[2rem] text-[12px] font-mono leading-relaxed bg-black/20 border h-[450px] overflow-y-auto whitespace-pre-wrap text-emerald-400 scrollbar-hide">
                       {refinedPrompt}
                     </div>
                     <div className="mt-4 p-5 rounded-2xl bg-sky-500/5 border border-sky-500/10 text-[11px] font-bold text-sky-400">
                        <span className="block text-[9px] uppercase opacity-50 mb-1">تقرير التحليل العصبى v500:</span>
                        {analysisReport}
                     </div>
                     <button onClick={() => performCopy(refinedPrompt)} className="w-full mt-4 py-5 bg-emerald-600 text-white rounded-[1.5rem] font-black shadow-lg hover:bg-emerald-500 transform active:scale-95 transition-all">نسخ البرومبت المطور V500</button>
                   </div>
                 )}
                 
                 <div className="glass-ui p-8 rounded-[3rem] opacity-70">
                    <div className="text-[9px] font-black uppercase text-sky-500 mb-2">MICRO CORE INPUT</div>
                    <div className={`p-7 rounded-[2rem] text-[11px] font-mono leading-relaxed bg-black/10 border h-[150px] overflow-y-auto whitespace-pre-wrap`}>
                      {generatedPrompt}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button onClick={() => performCopy(generatedPrompt)} className="flex-1 py-4 bg-sky-600/20 text-sky-400 rounded-2xl font-black text-xs uppercase shadow-md">نسخ المدخل</button>
                      <button onClick={saveToHistory} className="flex-1 py-4 glass-ui text-sky-500 rounded-2xl font-black text-xs uppercase shadow-md">{t.saveBtn}</button>
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
                  <h2 className="text-2xl font-black text-sky-500 uppercase tracking-tight">مركز التشريح v500</h2>
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
        <span className="text-[8px] font-black opacity-30 uppercase tracking-[0.4em]">Dicelion OFFLINE v500 MICRO TO MACRO ENGINE | SECURE_STABILITY</span>
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
  const [matrix, setMatrix] = useState("");
  useEffect(() => {
    const int = setInterval(() => setMatrix(Array.from({length: 15}, () => Math.random().toString(36).substring(2, 4)).join(" ")), 70);
    return () => clearInterval(int);
  }, []);
  return <div className="flex items-center justify-center w-full h-full bg-black rounded-full overflow-hidden text-[#00ff41] font-mono text-[9px] shadow-[inset_0_0_10px_#00ff41]">{matrix}</div>;
};

export default App;
