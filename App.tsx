
import React, { useState, useEffect, useMemo } from 'react';
import { 
  TEMPLATES, DESIGN_TYPES, ASPECT_RATIOS, PURPOSES, STYLES, 
  FONTS, PALETTES, BACKGROUNDS, MOODS, ELEMENTS, TECHNICALS, 
  LANGUAGES, PROFESSIONAL_DESCRIPTORS, VIDEO_MOTIONS, VIDEO_DESCRIPTORS, SEED_DATA
} from './constants';
import { PromptFormData } from './types';

// الشعار الاحترافي المتطور
const DTLogo = ({ size = "md", animated = true }: { size?: "sm" | "md" | "lg", animated?: boolean }) => {
  const containerClass = size === "lg" ? "w-24 h-24 text-4xl" : size === "sm" ? "w-10 h-10 text-lg" : "w-16 h-16 text-2xl";
  return (
    <div className={`${containerClass} bg-gradient-to-br from-[#00bfff] to-[#007bff] rounded-[1.8rem] flex items-center justify-center text-white font-black shadow-[0_0_30px_rgba(0,191,255,0.4)] border border-white/20 relative overflow-hidden ${animated ? 'animate-float' : ''}`}>
      <span className="relative z-10 select-none">DT</span>
      <div className="absolute inset-0 bg-white/10 opacity-30 skew-y-[-20deg] origin-top-left"></div>
    </div>
  );
};

const App: React.FC = () => {
  const [formData, setFormData] = useState<PromptFormData>({
    promptMode: 'image',
    template: 'product',
    designType: DESIGN_TYPES[0],
    aspectRatio: ASPECT_RATIOS[0],
    purpose: PURPOSES[0],
    style: STYLES[0],
    font: FONTS[0],
    palette: PALETTES[0],
    background: BACKGROUNDS[0],
    mood: MOODS[0],
    elements: ELEMENTS[0],
    technical: TECHNICALS[0],
    personType: 'Default',
    language: LANGUAGES[0],
    customDetails: '',
    mainText: '',
    mainTextPos: 'وسط',
    secondaryText: '',
    secondaryTextPos: 'أسفل النص الرئيسي',
    videoMotion: VIDEO_MOTIONS[0]
  });

  const [generatedPrompts, setGeneratedPrompts] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'create' | 'library' | 'howTo' | 'about'>('create');
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const getEnValue = (arValue: string, category: 'styles' | 'backgrounds' | 'lighting' | 'moods' | 'elements' | 'technicals') => {
    const found = (SEED_DATA as any)[category].find((item: any) => item.ar === arValue);
    return found ? found.en : arValue;
  };

  const dynamicLibraryResults = useMemo(() => {
    if (activeTab !== 'library') return [];
    const q = searchQuery.toLowerCase().trim();
    const results: any[] = [];
    const matchedSubjects = q === '' 
      ? [...SEED_DATA.subjects].sort(() => 0.5 - Math.random())
      : SEED_DATA.subjects.filter(s => 
          s.ar.includes(q) || s.en.toLowerCase().includes(q) || s.cat.includes(q)
        );

    for (const subject of matchedSubjects) {
      if (results.length >= 500) break;
      for (const styleObj of SEED_DATA.styles.slice(0, 5)) {
        if (results.length >= 500) break;
        const light = SEED_DATA.lighting[(subject.en.length) % SEED_DATA.lighting.length].en;
        results.push({
          title: `${subject.ar} (${styleObj.ar})`,
          category: subject.cat,
          prompt: `${subject.en}, in ${styleObj.en} style, ${light} lighting, photorealistic 8k, highly detailed masterpiece.`
        });
      }
    }
    return q === '' ? results.slice(0, 40) : results.slice(0, 500);
  }, [searchQuery, activeTab]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const constructPrompt = () => {
    const { promptMode, aspectRatio, style, background, mood, elements, technical, mainText, customDetails, language } = formData;
    const styleEn = getEnValue(style, 'styles');
    const bgEn = getEnValue(background, 'backgrounds');
    const moodEn = getEnValue(mood, 'moods');
    const elementsEn = getEnValue(elements, 'elements');
    const techEn = getEnValue(technical, 'technicals');
    const randDesc = [...PROFESSIONAL_DESCRIPTORS].sort(() => 0.5 - Math.random()).slice(0, 4).join(", ");
    
    return `### DT-ENGINE-PROMPT ###\nMODE: ${promptMode.toUpperCase()}\nRATIO: ${aspectRatio}\nSTYLE: ${styleEn}\nSCENE: ${bgEn}, ${moodEn}, ${elementsEn}\nTECH: ${techEn}, ${randDesc}\nTEXT: "${mainText || 'BRAND'}" (${language})\nDETAILS: ${customDetails}`;
  };

  const generateVersions = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedPrompts([constructPrompt()]);
      setIsGenerating(false);
      setTimeout(() => {
        const el = document.getElementById('results');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 800);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // استخدام تنبيه بسيط متوافق مع أندرويد
    alert('تم نسخ الكود بنجاح! 🦁');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* هيدر سينمائي عائم */}
      <header className="fixed top-0 left-0 w-full z-[100] p-4 pointer-events-none">
        <div className="max-w-5xl mx-auto glass rounded-[2rem] px-5 py-3 flex items-center justify-between shadow-2xl pointer-events-auto border-white/10">
          <div className="flex items-center gap-3">
            <DTLogo size="sm" animated={false} />
            <div className="flex flex-col">
              <span className="font-black text-white text-sm neon-text-blue tracking-tighter uppercase leading-none">DT-PROMPT</span>
              <span className="text-[7px] font-bold text-blue-400 uppercase tracking-[0.2em] mt-1 opacity-80">v3.5 Offline Engine</span>
            </div>
          </div>

          <nav className="flex bg-black/40 p-1 rounded-full border border-white/5 gap-1 shadow-inner">
            {[
              { id: 'create', icon: '🪄' },
              { id: 'library', icon: '📚' },
              { id: 'howTo', icon: '📖' },
              { id: 'about', icon: '🦁' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all active:scale-90 ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {tab.icon}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="flex-grow pt-28 px-4 pb-24 max-w-5xl mx-auto w-full">
        
        {/* واجهة التوليد */}
        {activeTab === 'create' && (
          <div className="space-y-8 animate-slide-up">
            <div className="text-center space-y-2 mb-6">
               <div className="flex justify-center mb-4"><DTLogo size="lg" /></div>
               <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter">هندسة <span className="text-blue-500 neon-text-blue">الإبداع</span></h1>
               <p className="text-slate-400 text-[10px] font-bold tracking-[0.3em] uppercase opacity-70">Professional AI Prompt Engineering</p>
            </div>

            <div className="flex justify-center">
              <div className="bg-[#001224]/80 backdrop-blur-xl p-1.5 rounded-[1.8rem] border border-blue-500/20 flex w-full max-w-sm shadow-xl">
                {['image', 'video', 'post'].map(m => (
                  <button key={m} onClick={() => setFormData(p => ({ ...p, promptMode: m as any }))} className={`flex-1 py-3 rounded-[1.4rem] font-black text-[9px] transition-all flex items-center justify-center gap-1.5 ${formData.promptMode === m ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500'}`}>
                    {m === 'image' ? '🖼️ صورة' : m === 'video' ? '🎬 فيديو' : '📝 منشور'}
                  </button>
                ))}
              </div>
            </div>

            <section className="glass p-7 rounded-[2.5rem] border border-white/10 space-y-6 shadow-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <SelectBox label="اللغة" name="language" options={LANGUAGES} value={formData.language} onChange={handleInputChange} />
                <SelectBox label="الأسلوب الفني" name="style" options={STYLES} value={formData.style} onChange={handleInputChange} />
                <SelectBox label="نسبة العرض" name="aspectRatio" options={ASPECT_RATIOS} value={formData.aspectRatio} onChange={handleInputChange} />
                <SelectBox label="المزاج" name="mood" options={MOODS} value={formData.mood} onChange={handleInputChange} />
                <SelectBox label="الخلفية" name="background" options={BACKGROUNDS} value={formData.background} onChange={handleInputChange} />
                <SelectBox label="المحرك" name="technical" options={TECHNICALS} value={formData.technical} onChange={handleInputChange} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
                <InputArea label="النص المطلوب" name="mainText" value={formData.mainText} onChange={handleInputChange} placeholder="اسم علامتك التجارية..." />
                <InputArea label="وصف إضافي حر" name="customDetails" value={formData.customDetails} onChange={handleInputChange} placeholder="تخيل مشهدك بدقة..." />
              </div>
            </section>

            <button 
              onClick={generateVersions} 
              disabled={isGenerating}
              className={`group relative w-full py-5 rounded-[1.8rem] font-black shadow-2xl transition-all overflow-hidden active:scale-95 ${isGenerating ? 'opacity-70 cursor-wait' : ''}`}
            >
               <div className="absolute inset-0 bg-blue-600"></div>
               <span className="relative z-10 text-white text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                 {isGenerating ? '⏳ جاري المعالجة...' : '🚀 توليد البرومت'}
               </span>
            </button>

            {generatedPrompts.map((p, i) => (
              <div key={i} id="results" className="glass p-7 rounded-[2rem] border border-blue-400/30 shadow-2xl animate-slide-up">
                <div className="flex justify-between items-center mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-blue-400 font-black text-[9px] uppercase tracking-[0.2em]">DT Result Ready</span>
                  </div>
                  <button onClick={() => copyToClipboard(p)} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl text-[10px] font-black transition-all active:scale-90">نسخ 📋</button>
                </div>
                <pre className="text-blue-100 text-[10px] font-mono whitespace-pre-wrap bg-black/50 p-5 rounded-2xl border border-white/5 leading-relaxed selectable">{p}</pre>
              </div>
            ))}
          </div>
        )}

        {/* واجهة المكتبة */}
        {activeTab === 'library' && (
          <div className="space-y-6 animate-slide-up">
            <div className="glass p-5 rounded-[2rem] border border-blue-500/20">
              <input 
                type="text" 
                placeholder="بحث في المكتبة..." 
                className="w-full bg-[#000a1a] border border-white/5 rounded-xl px-5 py-4 text-sm font-bold focus:border-blue-500 outline-none text-white transition-all shadow-inner"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {dynamicLibraryResults.map((item, idx) => (
                <div key={idx} className="glass p-5 rounded-[1.8rem] border border-white/5 flex flex-col justify-between hover:border-blue-500/30 transition-all">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                        <span className="bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-lg text-[8px] font-black border border-blue-500/10 uppercase">{item.category}</span>
                        <button onClick={() => copyToClipboard(item.prompt)} className="text-blue-500 text-[9px] font-black">نسخ</button>
                    </div>
                    <h4 className="font-black text-white text-[12px] mb-2">{item.title}</h4>
                    <p className="text-[9px] text-slate-500 italic line-clamp-2 bg-black/30 p-3 rounded-xl selectable">{item.prompt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* واجهة التعليمات */}
        {activeTab === 'howTo' && (
          <div className="animate-slide-up space-y-8">
            <div className="glass p-8 rounded-[2.5rem] border border-blue-500/20 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 blur-[80px] rounded-full"></div>
                <h2 className="text-3xl font-black text-white mb-8 text-center neon-text-blue">دليل الاستخدام</h2>
                <div className="space-y-10 text-slate-300">
                  <section className="space-y-4">
                    <h3 className="text-xl font-black text-blue-400">ما هو DT-Prompt؟</h3>
                    <p className="text-sm font-bold leading-relaxed">هو محرك ذكي متخصص في تحويل أفكارك البسيطة باللغة العربية إلى أكواد "برومبت" احترافية تفهمها أقوى أنظمة الذكاء الاصطناعي العالمية. التطبيق يعمل بدون إنترنت تماماً لضمان خصوصيتك وسرعة عملك.</p>
                  </section>
                  <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                      { t: "1. اختيار النمط", d: "حدد ما إذا كنت تريد صورة، فيديو، أم منشور." },
                      { t: "2. الضبط الفني", d: "اختر الأسلوب، الإضاءة، والمزاج من القوائم." },
                      { t: "3. الوصف الإضافي", d: "أضف أي تفاصيل خيالية تريدها في خانة الوصف." },
                      { t: "4. التوليد", d: "اضغط زر التوليد ثم انسخ الكود للمحرك العالمي." }
                    ].map((s, i) => (
                      <div key={i} className="p-5 bg-black/40 rounded-2xl border border-white/5">
                        <h4 className="text-blue-400 font-black mb-1">{s.t}</h4>
                        <p className="text-[11px] font-bold opacity-80">{s.d}</p>
                      </div>
                    ))}
                  </section>
                </div>
            </div>
          </div>
        )}

        {/* واجهة المطور - مطابقة للبانر بنسبة 100% */}
        {activeTab === 'about' && (
          <div className="animate-slide-up space-y-8">
             <div className="glass p-8 md:p-12 rounded-[3.5rem] border border-blue-500/30 relative overflow-hidden bg-gradient-to-br from-[#001c44] to-black shadow-2xl">
                {/* خلفية تقنية خفيفة */}
                <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
                  <div className="grid grid-cols-8 gap-4 p-5">
                    {[...Array(32)].map((_, i) => <div key={i} className="w-10 h-10 border border-blue-400 rotate-45"></div>)}
                  </div>
                </div>

                {/* الهوية الرئيسية */}
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 mb-12">
                   <div className="flex-shrink-0"><DTLogo size="lg" /></div>
                   <div className="text-center md:text-right">
                      <h2 className="text-4xl md:text-6xl font-black text-white neon-text-blue tracking-tighter mb-2">DicelionTechnique</h2>
                      <h3 className="text-xl md:text-2xl font-bold text-blue-300">Software Development Services</h3>
                      <div className="h-1 w-24 bg-blue-600 mx-auto md:mr-0 rounded-full mt-3"></div>
                   </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                   {/* الخدمات - أيقونات ونصوص مطابقة للبانر */}
                   <div className="space-y-3 relative z-10">
                      {[
                        { icon: "🛡️", t: "Expert Instructor at Vocational Institutes" },
                        { icon: "📱", t: "Software, Mobile, PC Solutions Development" },
                        { icon: "🤖", t: "AI specialist in data analysis & intelligent solutions" },
                        { icon: "🎨", t: "Professional Design and Marketing Service" },
                        { icon: "🎓", t: "Online & In-person Professional Training Programs" }
                      ].map((s, i) => (
                        <div key={i} className="flex items-center gap-4 bg-blue-600/10 p-4 rounded-2xl border border-white/5 hover:border-blue-400/30 transition-all">
                           <span className="text-xl">{s.icon}</span>
                           <span className="text-[11px] md:text-xs font-black text-slate-200">{s.t}</span>
                        </div>
                      ))}
                   </div>

                   {/* قسم الخبرة السداسي والوصف */}
                   <div className="flex flex-col justify-center items-center md:items-end text-center md:text-right relative z-10">
                      <div className="bg-blue-600 px-8 py-6 rounded-[2.5rem] shadow-[0_0_25px_rgba(0,191,255,0.4)] border border-white/20 transform rotate-[-2deg] mb-6">
                         <div className="text-white font-black text-[9px] uppercase tracking-widest mb-1 opacity-80">Extensive</div>
                         <div className="text-4xl font-black text-white">20+ Years</div>
                         <div className="text-white/90 font-bold text-[9px] uppercase tracking-widest mt-1">Professional Experience</div>
                      </div>
                      
                      {/* عرض الصور التخيلي السداسي كما في البانر */}
                      <div className="flex gap-2 mb-6">
                         <div className="w-12 h-14 hex-shape opacity-40"></div>
                         <div className="w-12 h-14 hex-shape"></div>
                         <div className="w-12 h-14 hex-shape opacity-60"></div>
                      </div>

                      <p className="text-slate-400 text-[11px] font-bold leading-relaxed max-w-sm">
                        نحن في DicelionTechnique نكرس خبرتنا الطويلة في مجال البرمجيات والذكاء الاصطناعي لتقديم حلول تقنية ذكية وبرامج تدريبية احترافية تواكب المستقبل.
                      </p>
                   </div>
                </div>

                {/* معلومات الاتصال المباشرة */}
                <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                   <div className="bg-black/30 p-4 rounded-2xl border border-white/5 flex flex-col gap-1 items-center md:items-start">
                      <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest">Support Lines</span>
                      <div className="flex gap-4">
                        <a href="tel:+212717118180" className="text-sm font-black text-white hover:text-blue-400">+212 717 118 180</a>
                        <a href="tel:+212521177000" className="text-sm font-black text-white hover:text-blue-400">+212 521 177 000</a>
                      </div>
                   </div>
                   <div className="bg-black/30 p-4 rounded-2xl border border-white/5 flex flex-col gap-1 items-center md:items-start">
                      <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest">Official Email</span>
                      <a href="mailto:diceliontechnique@gmail.com" className="text-sm font-black text-white hover:text-blue-400">diceliontechnique@gmail.com</a>
                   </div>
                </div>
             </div>

             {/* السوشيال ميديا */}
             <div className="flex flex-col items-center gap-6">
                <a href="https://web.facebook.com/alktrwalwfa" target="_blank" className="bg-[#1877F2] text-white px-10 py-4 rounded-full font-black text-xs shadow-xl hover:scale-105 active:scale-95 transition-all">
                  تابعنا على فيسبوك 🔵
                </a>
                <div className="text-[8px] font-black text-slate-700 tracking-[0.5em] uppercase text-center leading-loose">
                   DICELION TECHNIQUE SOFTWARE SOLUTIONS<br/>GSM PRO CERTIFIED &copy; 2024
                </div>
             </div>
          </div>
        )}
      </main>

      {/* شريط سفلي جمالي */}
      <footer className="mt-auto py-8 text-center opacity-10 pointer-events-none">
        <span className="text-[7px] font-black tracking-[0.6em] uppercase">Built for Excellence by DicelionTechnique</span>
      </footer>
    </div>
  );
};

const SelectBox = ({ label, name, options, value, onChange }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">{label}</label>
    <div className="relative">
        <select 
          name={name} 
          value={value} 
          onChange={onChange} 
          className="w-full bg-[#000d1a]/80 border border-white/10 rounded-xl px-4 py-3 text-[10px] font-bold text-blue-100 outline-none appearance-none input-neon"
        >
          {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
        </select>
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-30 text-[8px]">▼</div>
    </div>
  </div>
);

const InputArea = ({ label, name, value, onChange, placeholder = "" }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">{label}</label>
    <textarea 
        name={name} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder}
        className="bg-[#000d1a]/80 border border-white/10 rounded-2xl px-5 py-4 text-[10px] font-bold text-blue-100 outline-none min-h-[100px] transition-all placeholder:text-slate-800 input-neon shadow-inner" 
    />
  </div>
);

export default App;
