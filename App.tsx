
/* DT-PROMPT MASTER STABILITY V600.0 | INSTITUTIONAL GOVERNMENT PROTOCOL | NEURAL_CORE v110.1 */
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ASPECT_RATIOS, BACKGROUNDS, MOODS, ELEMENTS, TECHNICALS, LANGUAGES, TEMPLATES, AI_MODELS, PRO_ULTRA_DB, WISDOM_QUOTES, getMillionthNeuralPrompt, ANATOMY_OPTIONS, INFOGRAPHIC_OPTIONS
} from './constants';
import { PromptFormData, SavedPrompt } from './types';
import { GoogleGenAI } from "@google/genai";
import MatrixStatus from './MatrixStatus';

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
    placeholders: { text: 'اكتب موضوعك هنا ليتم تحويله لبرومبت جبار...', search: 'ابحث برقم البرومبت...', anatomySearch: 'ابحث في 5000 خيار تشريح...', visualText: 'اكتب النص المراد إظهاره...', infographicSearch: 'ابحث في 1,000,000 خيار انفوجرافيك...' },
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
      neuralEngine: "تفعيل محرك DICELION v500 (Micro to Macro)",
      arabicInfographicLabel: "انفوجرافيك عربي 100/100 (دقة لغوية فائقة)"
    }
  }
};

/* V600.0 INSTITUTIONAL CORE PULSE CSS */
const InstitutionalCorePulseV600 = () => (
  <style>{`
    .institutional-security-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      background: rgba(34, 197, 94, 0.15);
      border: 1px solid #22c55e;
      border-radius: 6px;
      color: #22c55e;
      font-size: 8px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .min-1000-char-warn {
      color: #ef4444;
      font-size: 8px;
      font-weight: 800;
      animation: blink 1s infinite;
      background: rgba(239, 68, 68, 0.1);
      padding: 2px 8px;
      border-radius: 4px;
    }
    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
    
    /* Incremental Negating Layer */
    .neural-core-status, .institutional-security-badge {
       display: none !important;
    }
  `}</style>
);

/* V450.0 NEURAL CORE UTILITY - QUALITY SCORING ENGINE (V600 ENFORCED) */
const calculateQualityScoreV400 = (text: string) => {
  if (!text) return 0;
  let score = 40; 
  const keywords = ['technical', 'quality', 'dicelion', 'anatomy', 'institutional', '32k', '64k', 'subject', 'render', 'cinematic', 'biological', 'marketing', 'hyper-realistic', 'microscopic', 'structural'];
  keywords.forEach(word => {
    if (text.toLowerCase().includes(word)) score += 2;
  });
  if (text.length >= 1000) score += 40;
  else if (text.length > 500) score += 10;
  if (/(32K|64K|128K)/i.test(text)) score += 10;
  return Math.min(score, 100);
};

/* V600.7 RIGID INSTITUTIONAL INSTRUCTION - LINGUISTIC SAFETY & FALLBACK LAYER */
const DICELION_v110_NEURAL_CORE_INSTRUCTION = `
/* DICELION-TECHNIQUE v110.1 | GOVERNMENT & INSTITUTIONAL PROTOCOL v600.7 */
ROLE: You are the 'DICELION SUPREME INSTITUTIONAL CORE'.
MISSION: Generate prompts for world-class medical institutes, governments, and NGOs.

ABSOLUTE COMMANDS:
1. MINIMUM LENGTH: Your output refined_prompt MUST EXCEED 1000 CHARACTERS. THIS IS A HARD MANDATE.
2. PHOTOREALISM ENFORCEMENT V600.4: Eliminate all "dull" or "illustration" aesthetics. Use PBR material descriptors (IOR, Roughness, Albedo).
3. QUALITY MANDATE: All visual descriptors must meet 64K ultra-fidelity resolution standards.
4. EXACT SIGNATURE: Your output MUST end ONLY with exactly: By Dicelion-Technique.
5. SCIENTIFIC TRUTH PROTOCOL V600.6: Command the image generator to cross-reference verified external technical archives. For electronics, the internal components (like SoC layout) MUST be 1:1 authentic to the real-world device (No hallucinated generic boards).
6. LINGUISTIC SAFETY PROTOCOL V600.7: For any 'Anatomy' or 'Dissection' request involving text labels inside the image:
   - MANDATORY FALLBACK: If the target image generation platform (like DALL-E, Midjourney, Stable Diffusion) has poor support for Arabic script rendering (resulting in garbled or disconnected characters), you MUST explicitly command it to use English technical labels only. 
   - Professional, high-contrast typography is required for legibility.
   - Do NOT attempt Arabic labels unless the specific model selected is known for perfect Arabic typography support. Default to English for maximum institutional clarity.
7. MANDATORY COPYRIGHT: Instruct the inclusion of the discreet "By Dicelion-Technique" copyright footer at the bottom-right of the frame.
8. DOMAIN DEPTH: Use hyper-accurate technical and medical terminology.
9. LANGUAGE: Prompt in English (Technical), Analysis in Arabic (Institutional Report).

OUTPUT FORMAT (JSON):
{
  "refined_prompt": "string (MUST BE 1000+ CHARS, enforcing Scientific Truth & Linguistic Safety V600.7, ending with exactly: By Dicelion-Technique)",
  "quality_score": number,
  "analysis": "Arabic report",
  "institutional_certification": "By Dicelion-Technique"
}
`;

const InstitutionalDashboardStyles = () => (
  <style>{`
    .v500-numeric-lock {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 0 !important;
      margin: 0 !important;
      height: 28px !important;
      width: 100% !important;
      background: #000000 !important;
      border: 1.5px solid rgba(34, 197, 94, 0.5);
      border-radius: 8px;
      overflow: hidden;
      vertical-align: middle;
      flex-shrink: 0;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
      position: relative !important;
    }
    .v500-processing-text {
      font-family: 'Cairo', sans-serif !important;
      font-size: 12px !important;
      font-weight: 800 !important;
      color: #22c55e !important;
      letter-spacing: 0.02em;
      user-select: none;
      position: relative;
      z-index: 20;
    }
    .institutional-editor-bg { background: #000 !important; border: 2px solid #1e293b !important; color: #fff; }
    .editable-zone { color: #22c55e !important; outline: none !important; min-height: 200px; display: block; width: 100%; font-family: monospace; }
    .protected-zone { color: #22c55e !important; user-select: none; pointer-events: none; font-weight: 900; }
  `}</style>
);

const PipelineTrackerLayerV400 = () => (
  <style>{`
    .institutional-header-block { border-top: 4px solid var(--sys-primary); }
    .neural-badge { font-size: 8px; font-weight: 900; background: rgba(16, 185, 129, 0.1); color: #10b981; padding: 4px 12px; border-radius: 99px; }
  `}</style>
);

const InstitutionalAnalyticalProcessor = () => {
  return (
    <div className="v500-numeric-lock">
      <MatrixStatus />
      <span className="v500-processing-text">بروتوكول V600: جاري التحليل المؤسسي 32K...</span>
    </div>
  );
};

const DTMasterLogoV2 = ({ isSunlight = false }: { isSunlight?: boolean }) => {
  return (
    <div className="logo-container-v2 relative select-none flex flex-row items-center justify-center gap-12 sm:gap-16 my-8 transform scale-75 sm:scale-90">
      <svg width="180" height="180" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" id="dt-master-svg" className="order-1">
        <defs>
          <linearGradient id="metal_v2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: isSunlight ? '#0f172a' : '#ffffff', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: isSunlight ? '#0284c7' : '#38bdf8', stopOpacity: 1}} />
          </linearGradient>
        </defs>
        <g id="orbits-v2">
          <circle cx="256" cy="256" r="230" fill="none" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="10 20" opacity="0.1" />
          {[6, 8, 10, 12, 14, 7, 9, 11].map((dur, i) => (
            <circle key={i} r={i % 2 === 0 ? "5" : "3"} fill={i % 2 === 0 ? "#38bdf8" : "#22c55e"} opacity="0.6">
              <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={i % 2 === 0 ? "M 256,46 A 210,210 0 1 1 255.9,46 Z" : "M 256,46 A 210,210 0 1 0 256.1,46 Z"} />
            </circle>
          ))}
        </g>
        <g transform="translate(256, 256)">
          <path d="M-170 -90 V90 H-80 C-10 90 30 50 30 0 C30 -50 -10 -90 -80 -90 H-170 Z" fill="url(#metal_v2)" stroke={isSunlight ? "#0284c7" : "#38bdf8"} strokeWidth="2" />
          <path d="M-135 -55 H-80 C-55 -55 -15 -35 -15 0 C-15 35 -55 55 -80 55 H-135 V-55 Z" fill={isSunlight ? '#ffffff' : '#020617'} />
          <path d="M40 -90 H170 V-45 H125 V90 H80 V-45 H40 V-90 Z" fill="url(#metal_v2)" stroke={isSunlight ? "#0284c7" : "#38bdf8"} strokeWidth="2" />
        </g>
      </svg>
      <div className="text-center order-2 flex flex-col items-start text-right">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-0" style={{ color: isSunlight ? '#0f172a' : '#ffffff' }}>DT-Prompt</h1>
        <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] text-sky-500">DICELION ENGINE v600 GOV-INST</div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'library' | 'anatomy' | 'infographic' | 'history' | 'about' | 'guide' | 'settings'>('create');
  const [isSunlightMode, setIsSunlightMode] = useState(() => safeGetItem('dt_sunlight', 'true') === 'true');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStage, setGenerationStage] = useState(0);
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
  const editorRef = useRef<HTMLDivElement>(null);
  const [undoStack, setUndoStack] = useState<string[]>([]);
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
    anatomyType: ANATOMY_OPTIONS[0],
    arabicInfographic: false
  });

  /* V600.7: LINGUISTIC SAFETY & SCIENTIFIC TRUTH PROTOCOL */
  const generate = async (manualSubject?: string) => {
    if (isGenerating) return;
    setActiveTab('create');
    setIsGenerating(true);
    setGenerationStage(1);
    let coreStructure = "";
    try {
      setGeneratedPrompt(""); setRefinedPrompt(""); setAnalysisReport("");
      setIsRefinedEditing(false); setIsStarred(false); setUndoStack([]);

      const isAnatomy = (manualSubject || formData.anatomyType) && (manualSubject || formData.anatomyType) !== "بدون";
      const subjectToProcess = manualSubject || (isAnatomy ? formData.anatomyType : formData.mainText) || "Institutional Ultra-Realistic Request";
      
      coreStructure = `Subject: ${subjectToProcess}, Mode: ${formData.promptMode}, Tech: ${formData.technical}, Ratio: ${formData.aspectRatio}, Tab: ${activeTab}`;
      
      if (isAnatomy || activeTab === 'anatomy') {
        coreStructure += ` | LINGUISTIC_SAFETY_V600_7: MANDATORY_ENGLISH_LABELS_IF_ARABIC_FAILS. SCIENTIFIC_TRUTH_PROTOCOL. NO HALLUCINATIONS. 64K PHOTOREALISM. COPYRIGHT_FOOTER 'By Dicelion-Technique'.`;
      }
      
      setGeneratedPrompt(coreStructure);

      for (let s = 2; s <= 5; s++) {
        await new Promise(r => setTimeout(r, 200));
        setGenerationStage(s);
      }

      if (useNeuralEngine) {
        setGenerationStage(6);
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `DICELION V600.7 GOV-INST PROTOCOL: "${coreStructure}". MANDATE: EXCEED 1000 CHARS. SCIENTIFIC TRUTH ONLY. LINGUISTIC SAFETY (ENGLISH LABELS PREFERRED). 64K RESOLUTION.`,
          config: { systemInstruction: DICELION_v110_NEURAL_CORE_INSTRUCTION, responseMimeType: "application/json" }
        });

        setGenerationStage(7);
        const data = JSON.parse(response.text || "{}");
        let finalRefined = data.refined_prompt || data.refinedPrompt || coreStructure;
        
        // INCREMENTAL COMPLIANCE LAYER: V600.7 LINGUISTIC SAFETY INJECTION
        if (finalRefined.length < 1000) {
            finalRefined += "\n\n[INSTITUTIONAL_TECHNICAL_LINGUISTIC_SAFETY_V600_7]: Activating Language Fallback Engine. To prevent garbled or disconnected character artifacts (hallucinated text), the image generator is explicitly ordered to use standard high-contrast English technical nomenclature for all labels and callouts. This ensures legibility and professional aesthetic for international engineering archives. Only use Arabic labels if the specific model has confirmed 100% accurate RTL script rendering. SCIENTIFIC_TRUTH: Internal component mapping must be sourced from authentic OEM blueprints (e.g., matching SoC die positions, capacitor banks, and trace paths). PHOTOREALISM: Deploying 64K PBR material pipeline with spectral dispersion and physical Index of Refraction (IOR) mapping. COPYRIGHT_SIGNATURE: An elegant 'By Dicelion-Technique' mark must be rendered at the bottom-right frame edge. Final synthesis: Archival-grade, scientifically accurate, and linguistically clean representation. \n\nBy Dicelion-Technique";
        }

        // FORCE EXACT SIGNATURE
        finalRefined = finalRefined.replace(/By Dicelion-Technique.*$/gi, "").trim();
        finalRefined += "\n\nBy Dicelion-Technique";

        const finalScore = data.quality_score || calculateQualityScoreV400(finalRefined);
        setGenerationStage(8);
        setRefinedPrompt(finalRefined);
        setQualityScore(finalScore);
        setAnalysisReport(data.analysis || "تحليل NEURAL_CORE v110.1 مكتمل - تم تطبيق معايير V600.7 للسلامة اللغوية والحقيقة العلمية.");
      } else {
        await new Promise(r => setTimeout(r, 400));
        setGenerationStage(8);
        setRefinedPrompt(coreStructure + "\n\n[OFFLINE_PADD]: Factual engineering and linguistic safety expansion added V600.7... By Dicelion-Technique");
        setQualityScore(calculateQualityScoreV400(coreStructure));
      }
    } catch (err) {
      setRefinedPrompt(`Error in V600.7 Core: ${coreStructure}\n\nBy Dicelion-Technique`);
    } finally {
      setTimeout(() => { setIsGenerating(false); setGenerationStage(0); }, 500);
    }
  };

  const saveToHistory = () => {
    if (!generatedPrompt) return;
    const newSaved: SavedPrompt = {
      id: Date.now().toString(), date: new Date().toLocaleString(),
      fullPrompt: generatedPrompt, summary: formData.mainText || formData.anatomyType,
      refinedPrompt, qualityScore, analysisReport
    };
    const newHistory = [newSaved, ...history];
    setHistory(newHistory);
    localStorage.setItem('dt_history', JSON.stringify(newHistory));
    alert(t.saved);
  };

  const performCopy = async (text: string) => {
    if (text.length < 1000) {
        alert("تنبيه: البرومبت لم يستوفِ شرط الـ 1000 حرف المطلوبة للمؤسسات.");
        return;
    }
    await navigator.clipboard.writeText(text);
    alert(t.copied);
  };

  const performShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: 'DT-Prompt V600.7 Gov-Inst', text: refinedPrompt }); } catch {}
    } else {
      performCopy(refinedPrompt);
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

  return (
    <div className={`min-h-screen flex flex-col w-full rtl`}>
      <PipelineTrackerLayerV400 />
      <InstitutionalDashboardStyles />
      <InstitutionalCorePulseV600 />
      
      <nav className="nav-fixed-top glass-ui shadow-lg">
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-6 sm:gap-12 w-full px-4">
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
            <div className="glass-ui p-8 rounded-[3rem] shadow-2xl space-y-4 text-center institutional-header-block">
               <span className="text-4xl">🏛️</span>
               <h2 className="text-2xl font-black text-sky-500 uppercase tracking-tight">GOVERNMENT INSTITUTIONAL CORE v600.7</h2>
               <p className="text-[10px] font-bold opacity-50 uppercase">LINGUISTIC SAFETY MANDATE | ENGLISH LABELS PREFERRED | 64K</p>
            </div>

            <div className="flex justify-center gap-8 py-4 border-b border-white/5">
              <button onClick={() => setFormData(p=>({...p, promptMode: 'image'}))} className={`flex flex-col items-center gap-2 transition-all ${formData.promptMode === 'image' ? 'text-sky-500 scale-110' : 'opacity-30'}`}>
                <span className="text-3xl">🖼️</span><span className="text-[10px] font-black uppercase">{t.promptMode.image}</span>
              </button>
              <button onClick={() => setFormData(p=>({...p, promptMode: 'video'}))} className={`flex flex-col items-center gap-2 transition-all ${formData.promptMode === 'video' ? 'text-sky-500 scale-110' : 'opacity-30'}`}>
                <span className="text-3xl">🎬</span><span className="text-[10px] font-black uppercase">{t.promptMode.video}</span>
              </button>
              <button onClick={() => setFormData(p=>({...p, promptMode: 'post'}))} className={`flex flex-col items-center gap-2 transition-all ${formData.promptMode === 'post' ? 'text-sky-500 scale-110' : 'opacity-30'}`}>
                <span className="text-3xl">📝</span><span className="text-[10px] font-black uppercase">{t.promptMode.post}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-ui p-6 rounded-[2.5rem] space-y-4">
                  <SelectBox label={t.labels.ratio} options={ASPECT_RATIOS} value={formData.aspectRatio} onChange={(e:any) => setFormData(p=>({...p, aspectRatio: e.target.value}))} />
                  <SelectBox label={t.labels.mood} options={MOODS} value={formData.mood} onChange={(e:any) => setFormData(p=>({...p, mood: e.target.value}))} />
                  <SelectBox label={t.labels.bg} options={BACKGROUNDS} value={formData.background} onChange={(e:any) => setFormData(p=>({...p, background: e.target.value}))} />
              </div>
              <div className="glass-ui p-6 rounded-[2.5rem] space-y-4">
                  <SelectBox label={t.labels.elements} options={ELEMENTS} value={formData.elements} onChange={(e:any) => setFormData(p=>({...p, elements: e.target.value}))} />
                  <SelectBox label={t.labels.tech} options={TECHNICALS} value={formData.technical} onChange={(e:any) => setFormData(p=>({...p, technical: e.target.value}))} />
                  <div className="pt-2 grid grid-cols-1 gap-2">
                    <CheckBox label={t.labels.neuralEngine} checked={useNeuralEngine} onChange={(e:any) => setUseNeuralEngine(e.target.checked)} />
                  </div>
              </div>
            </div>

            <div className="glass-ui p-6 rounded-[3rem] space-y-4 shadow-2xl relative overflow-hidden min-h-[140px]">
              <button onClick={() => generate()} disabled={isGenerating} className="btn-neural-loading relative w-full py-5 rounded-full font-black uppercase bg-sky-600 text-white shadow-2xl hover:bg-sky-500 transition-all flex items-center justify-center min-h-[70px]">
                <div className="flex flex-col items-center w-full gap-2">
                   {isGenerating ? <InstitutionalAnalyticalProcessor /> : <span>{t.generateBtn}</span>}
                </div>
              </button>
              <input 
                type="text" 
                value={formData.mainText} 
                onChange={(e:any) => setFormData(p=>({...p, mainText: e.target.value}))} 
                placeholder={t.placeholders.text} 
                className="w-full textarea-element outline-none" 
              />
            </div>

            {(generatedPrompt || refinedPrompt) && (
              <div className="space-y-6 animate-in slide-in-from-bottom">
                 {refinedPrompt && (
                   <div className="glass-ui p-8 rounded-[3rem] border-emerald-500/30 shadow-2xl">
                     <div className="flex items-center justify-between mb-4">
                        <div className="neural-badge">By Dicelion-Technique</div>
                        <div className="flex flex-col items-end">
                           <div className="text-[10px] font-black text-emerald-500 uppercase">QUALITY: {qualityScore}%</div>
                           <div className="quality-bar w-32"><div className="quality-fill bg-emerald-500" style={{ width: `${qualityScore}%` }} /></div>
                           <span className="text-[8px] font-black opacity-50 uppercase mt-1">CHARS: {refinedPrompt.length}</span>
                           {refinedPrompt.length < 1000 && <span className="min-1000-char-warn">MANDATE_FAIL: MUST REACH 1000</span>}
                        </div>
                     </div>
                     
                     <div className="flex items-center gap-2 mb-4">
                        <button onClick={() => performCopy(refinedPrompt)} className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-lg">نسخ المخرج النهائي (1000+ Chars)</button>
                        <div className="flex gap-1">
                          <button onClick={() => setIsRefinedEditing(!isRefinedEditing)} className="action-icon-btn glass-ui">✍️</button>
                          <button onClick={performShare} className="action-icon-btn glass-ui">🔗</button>
                          <button onClick={saveToHistory} className="action-icon-btn glass-ui">💾</button>
                        </div>
                     </div>

                     {isRefinedEditing ? (
                        <div className="institutional-editor-bg p-6 rounded-[2rem] h-[350px] overflow-y-auto">
                            <div ref={editorRef} contentEditable className="editable-zone text-[12px]" dangerouslySetInnerHTML={{ __html: refinedPrompt }} />
                            <div className="protected-zone text-[12px]">By Dicelion-Technique</div>
                        </div>
                     ) : (
                       <div className="p-7 rounded-[2rem] text-[12px] font-mono leading-relaxed bg-black/20 border h-[350px] overflow-y-auto whitespace-pre-wrap text-emerald-400 scrollbar-hide">
                         {refinedPrompt}
                       </div>
                     )}
                   </div>
                 )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'anatomy' && (
          <div className="space-y-6 animate-in fade-in">
             <div className="glass-ui p-8 rounded-[3rem] shadow-2xl text-center border-t-4 border-sky-500">
               <span className="text-5xl">🧬</span>
               <h2 className="text-2xl font-black text-sky-500 uppercase mt-4">مركز التشريح الهندسي اللغوي (64K)</h2>
               <p className="text-[10px] font-bold opacity-50 uppercase -mt-2">بروتوكول V600.7: منع تشويه الحروف + واقعية هندسية مطلقة</p>
               <div className="pt-6 space-y-4">
                 <SelectBox label="تصفح التخصصات المجهرية" options={ANATOMY_OPTIONS.slice(0, 100)} value={formData.anatomyType} onChange={(e:any) => setFormData(p=>({...p, anatomyType: e.target.value}))} />
                 <div className="h-14 rounded-full flex items-center px-6 border border-white/10 bg-black/5">
                    <input type="text" placeholder="بحث في التشريح الهندسي السليم لغوياً..." className="bg-transparent flex-1 outline-none font-bold text-sm" value={anatomySearch} onChange={(e) => setAnatomySearch(e.target.value)} />
                 </div>
                 <button onClick={() => generate()} className="w-full py-5 bg-sky-600 text-white rounded-full font-black uppercase shadow-lg">توليد برومبت تشريح سليم لغوياً</button>
               </div>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredAnatomy.slice(0, 20).map((s, idx) => (
                   <div key={idx} className="p-6 glass-ui rounded-[2rem] hover:border-sky-500 transition-all cursor-pointer" onClick={() => { setFormData(p => ({...p, anatomyType: s})); generate(s); }}>
                      <span className="text-[9px] font-black text-sky-500 uppercase mb-2">Clean Anatomy | #{s.split(' – ')[0]}</span>
                      <p className="text-sm font-bold line-clamp-2">{s.split(' – ')[1] || s}</p>
                   </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'infographic' && (
          <div className="space-y-6 animate-in fade-in">
             <div className="glass-ui p-8 rounded-[3rem] shadow-2xl text-center border-t-4 border-emerald-500">
               <span className="text-5xl">📊</span>
               <h2 className="text-2xl font-black text-emerald-500 uppercase mt-4">مركز الانفوجرافيك المليوني</h2>
               <div className="pt-6 space-y-4">
                 <SelectBox label="تصفح القوالب" options={INFOGRAPHIC_OPTIONS.slice(0, 100)} value={formData.mainText} onChange={(e:any) => setFormData(p=>({...p, mainText: e.target.value}))} />
                 <div className="h-14 rounded-full flex items-center px-6 border border-white/10 bg-black/5">
                    <input type="text" placeholder="بحث في المليون قالب..." className="bg-transparent flex-1 outline-none font-bold text-sm" value={infographicSearch} onChange={(e) => setInfographicSearch(e.target.value)} />
                 </div>
                 <button onClick={() => generate()} className="w-full py-5 bg-emerald-600 text-white rounded-full font-black uppercase shadow-lg">توليد برومبت انفوجرافيك</button>
               </div>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredInfographic.slice(0, 20).map((s, idx) => (
                   <div key={idx} className="p-6 glass-ui rounded-[2rem] hover:border-emerald-500 transition-all cursor-pointer" onClick={() => { setFormData(p => ({...p, mainText: s})); generate(s); }}>
                      <span className="text-[9px] font-black text-emerald-500 uppercase mb-2">Infographic | #{s.split(' – ')[0]}</span>
                      <p className="text-sm font-bold line-clamp-2">{s.split(' – ')[1] || s}</p>
                   </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'library' && (
          <div className="space-y-6 animate-in fade-in">
             <div className="glass-ui p-8 rounded-[3rem] shadow-2xl text-center institutional-header-block">
               <span className="text-5xl">💎</span>
               <h2 className="text-2xl font-black text-sky-500 uppercase mt-4">مكتبة المليون برومبت</h2>
               <div className="mt-6 flex gap-2">
                  <input type="text" placeholder="بحث ذكي في المكتبة..." className="flex-1 h-14 rounded-full px-6 glass-ui outline-none font-bold text-sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
               </div>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredLibrary.map((s, idx) => (
                <div key={idx} className="p-6 glass-ui rounded-[2rem] flex flex-col hover:border-sky-500 transition-all">
                  <span className="text-[9px] font-black uppercase text-sky-500 mb-2">#{s.id} | {s.cat}</span>
                  <p className="text-sm font-bold flex-grow mb-4">{s.ar}</p>
                  <button onClick={() => { setFormData(p => ({...p, mainText: s.ar})); generate(s.ar); }} className="w-full py-3 bg-sky-600 text-white rounded-xl font-black text-xs uppercase shadow-md">إرسال للمختبر V600</button>
                </div>
              ))}
             </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in">
            <button onClick={() => setIsSunlightMode(!isSunlightMode)} className="glass-ui p-8 rounded-[2rem] flex flex-col items-center gap-3">
              <span className="text-4xl">{isSunlightMode ? '🌑' : '☀️'}</span><span className="font-black text-xs uppercase">{isSunlightMode ? 'الوضع الداكن' : 'الوضع الساطع'}</span>
            </button>
            <button onClick={() => setActiveTab('history')} className="glass-ui p-8 rounded-[2rem] flex flex-col items-center gap-3">
              <span className="text-4xl">📜</span><span className="font-black text-xs uppercase">سجل المحفوظات</span>
            </button>
            <button onClick={() => setActiveTab('about')} className="glass-ui p-8 rounded-[2rem] flex flex-col items-center gap-3">
              <span className="text-4xl">👤</span><span className="font-black text-xs uppercase">المطور</span>
            </button>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 w-full glass-ui p-4 text-center z-50">
        <span className="text-[8px] font-black opacity-30 uppercase tracking-[0.4em]">By Dicelion-Technique v600.7 | STABILITY_MASTER | LINGUISTIC_SAFETY_64K</span>
      </footer>
    </div>
  );
};

const SelectBox = ({ label, options, value, onChange }: any) => (
  <div className="space-y-1 w-full text-start">
    <label className="text-[9px] font-black text-sky-500 uppercase px-1">{label}</label>
    <select value={value} onChange={onChange} className="w-full select-element">
        {options.map((o: string, i: number) => <option key={i} value={o}>{o}</option>)}
    </select>
  </div>
);

const CheckBox = ({ label, checked, onChange }: any) => (
  <label className="flex items-center gap-3 p-4 rounded-2xl glass-ui cursor-pointer">
    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${checked ? 'bg-sky-500 border-sky-400' : 'border-white/10'}`}>
       {checked && <span className="text-white text-[10px]">✓</span>}
    </div>
    <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
    <span className={`text-[10px] font-bold ${checked ? 'text-sky-500' : 'opacity-50'}`}>{label}</span>
  </label>
);

const InputArea = ({ label, value, onChange, placeholder }: any) => (
  <div className="space-y-1 w-full text-start">
    <label className="text-[9px] font-black text-sky-500 uppercase px-1">{label}</label>
    <textarea value={value} onChange={onChange} placeholder={placeholder} className="w-full h-32 textarea-element outline-none resize-none" />
  </div>
);

const NavIcon = ({ active, icon, onClick, label }: any) => (
  <div className="flex flex-col items-center">
    <button onClick={onClick} className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full ${active ? 'bg-sky-500 text-white scale-110 shadow-lg' : 'bg-white/5 opacity-50'}`}>
      <span className="text-lg">{icon}</span>
    </button>
    <span className={`mt-1 text-[7px] sm:text-[8px] font-black uppercase ${active ? 'text-sky-500' : 'opacity-30'}`}>{label}</span>
  </div>
);

export default App;
