
/* SYNC_STABILITY_PATCH_V8.6: REVERT TO PREVIOUS LANGUAGE ICON */
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  ASPECT_RATIOS, BACKGROUNDS, MOODS, ELEMENTS, TECHNICALS, LANGUAGES, SEED_DATA, TEMPLATES, AI_MODELS, PRO_CODE_DATABASE, PRO_ULTRA_DB, getMillionthNeuralPrompt, WISDOM_QUOTES 
} from './constants';
import { PromptFormData, SavedPrompt } from './types';

// مكوّن الشعار الموحد المتطور (The Single Animated AI Core Logo)
const Unified3DLogo = ({ size = "w-24 h-24", isSunlight = false, animated = true }: { size?: string, isSunlight?: boolean, animated?: boolean }) => (
  <div className={`relative ${size} flex items-center justify-center ${animated && !isSunlight ? 'neon-logo-animated' : ''}`}>
    <img 
      src="icon.svg" 
      alt="DT Intelligence Core" 
      className={`w-full h-full object-contain transition-all duration-700 ${isSunlight ? 'brightness-[0.2] contrast-[1.5]' : 'brightness-110'}`}
      onError={(e: any) => {
        e.target.style.display = 'none';
        e.target.parentElement.innerHTML = `<div class="text-4xl font-black ${isSunlight ? 'text-slate-900' : 'text-sky-400'}">DT</div>`;
      }}
    />
  </div>
);

const sanitizeInput = (text: string): string => {
  return text.replace(/[<>]/g, "").trim();
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
    langName: 'العربية',
    title: 'DT',
    subtitle: '', 
    tabs: { create: 'المختبر', library: 'مليون برمبت', history: 'سجل المحفوظات', codes: 'الأكواد', appLang: 'اللغة', guide: 'دليل', about: 'عن المطور', home: 'الرئيسية', sunlight: 'سطوع' },
    generateBtn: 'معالجة الأمر ✨',
    copyBtn: 'نسخ القالب',
    saveBtn: 'أرشفة المشروع',
    editLabel: 'محرر الأوامر الذكي (PRO INTERFACE)',
    resultActions: { copy: 'نسخ', save: 'حفظ', edit: 'تعديل', share: 'مشاركة', delete: 'حذف' },
    history: { empty: 'السجل فارغ حالياً', suggestionsTitle: 'نصائح الاحتراف 💡', suggestions: ['أضف "Golden Hour" لإضاءة ساحرة', 'استخدم "8k resolution" لأقصى دقة', 'جرب دمج أسلوبين مختلفين للنتائج'] },
    copied: 'تم نسخ النص بنجاح!',
    saved: 'تمت الأرشفة بنجاح في الذاكرة الرقمية!',
    promptMode: { image: 'توليد الصور', video: 'إنتاج الفيديو', post: 'نص إحترافي' },
    placeholders: { text: 'عنوان الحملة أو الموضوع الرئيسي...', search: 'ابحث بنص أو برقم البرومبت (1 - 1,000,000)...', selectDept: 'اختر من بين 1000 قسم بحث متخصص...' },
    labels: { lang: 'محرك اللغة', ratio: 'أبعاد المخرج', mood: 'نبرة الصوت والأسلوب', bg: 'سياق المحتوى والبيئة (100+)', tech: 'قالب الهيكلة الاحترافي', text: 'الموضوع الأساسي', details: 'تفاصيل الحملة', useRef: 'توليد Prompt بتقنية سيكولوجي حصري لـ DT', engOnly: 'توليد نص Prompt بالإنجليزية فقط', aiTarget: 'منصة الذكاء المستهدفة', useImgSource: 'توليد Prompt مرفق بالصورة', visualEnglish: 'توليد Prompt لمنصة لا تدعم العربية', visualEnglishDesc: 'لضمان دقة النصوص البصرية؛ أغلب الأدوات لا تدعم العربية باستثناء Nanobanana.' },
    announcement: { 
      title: 'DT', 
      skip: 'تخطي', 
      fbBtn: 'متابعة الصفحة الرسمية',
      body: 'تابع صفحتنا الرسمية على فيسبوك للتوصل بأحدث التطبيقات الاحترافية المجانية، وترقب موعد الإعلان عن الدورة الحضورية في الذكاء الاصطناعي (التسويق، البرمجة، والتصميم).'
    },
    useBtn: 'اعتماد',
    quickCopy: 'نسخ سريع',
    editInStudio: 'تعديل',
    modalityModal: {
        title: 'حدد نوع البرومبت المستهدف',
        desc: 'سيقوم المحرك بتوليد كود احترافي بناءً على اختيارك',
        image: 'برومبت صور (Art)',
        video: 'برومبت فيديو (Motion)',
        text: 'برومبت منشور (Text)',
        cancel: 'إلغاء'
    },
    guide: { 
      title: 'دليل إستخدام DT', 
      subtitle: '',
      intro: 'مرحباً بك في تجربة DT. هذا الدليل يوجّهك لاستكشاف أدوات ومزايا التطبيق باحترافية، ويمنحك الوصول إلى مليون برومبت جاهز لتحقيق أفضل النتائج بسرعة، من أجل احتراف استعمال الذكاء الاصطناعي.',
      masterSections: [
        {
          id: 'STEP1',
          title: '1. شريط الأدوات العلوي (Global Controls)',
          icon: '🛠️',
          points: [
            { label: 'الرئيسية (🏠)', content: 'تعيدك لمختبر صناعة الأوامر في أي وقت.' },
            { label: 'مليون Prompt (💎)', content: 'محيط من الأفكار الجاهزة؛ يمكنك البحث برقم (مثلاً 5000) للحصول على فكرة فريدة.' },
            { label: 'السجل (📜)', content: 'خزنة مشاريعك؛ هنا تجد كل ما قمت بحفظه سابقاً للنسخ أو التعديل.' },
            { label: 'سطوع (☀️)', content: 'يحمي عينيك عبر التبديل بين الوضع المظلم والساطع.' },
            { label: 'الموسوعة (📖)', content: 'هذا الكتاب الذي تقرأه الآن لتعلم خفايا النظام.' }
          ]
        },
        {
          id: 'STEP2',
          title: '2. مختبر الأوامر (The Creative Lab)',
          icon: '🧪',
          points: [
            { label: 'مبدل الأنماط (Mode)', content: 'اختر (صور) للفن البصري، (فيديو) للتحريك، أو (منشور) لكتابة نصوص تسويقية بذكاء.' },
            { label: 'الموضوع الأساسي', content: 'اكتب هنا "جوهر" ما تريد رؤيته (مثال: أسد يرتدي نظارة شمسية).' },
            { label: 'أبعاد المخرج', content: 'حدد شكل الصورة؛ (9:16) للستوري، (16:9) لليوتيوب، (1:1) للإنستقرام.' }
          ]
        },
        {
          id: 'STEP3',
          title: '3. القوائم المنسدلة (Precision Settings)',
          icon: '⚙️',
          points: [
            { label: 'نبرة الصوت (Mood)', content: 'تحدد "روح" العمل؛ اختر "هيبة ملكية" للفخامة أو "جذب تسويقي" لزيادة المبيعات.' },
            { label: 'البيئة والسياق (Background)', content: 'تضع فكرتك في مكان محدد؛ "طوكيو في المطر" أو "مكتبة عريقة".' },
            { label: 'القالب التقني (Technical)', content: 'يحدد جودة الرندر؛ (Octane) للإضاءة الواقعية، (RAW) للصور الطبيعية الخام.' }
          ]
        },
        {
          id: 'STEP4',
          title: '4. التفعيلات الذكية (Neural Toggles)',
          icon: '⚡',
          points: [
            { label: 'سيكولوجي DT', content: 'تقنية حصرية تحقن كلمات سرية تخاطب مشاعر المشاهد وتزيد جاذبية الصورة.' },
            { label: 'تصدير بالإنجليزية', content: 'يحول فكرتك للإنجليزية فوراً لأن الذكاء الاصطناعي العالمي يفهمها بدقة أعلى.' },
            { label: 'دعم المنصات البصرية', content: 'يضمن أن النصوص المكتوبة داخل الصور تظهر بشكل صحيح ومنسق، متجاوزاً عيوب بعض أدوات الذكاء الاصطناعي.' }
          ]
        },
        {
          id: 'STEP5',
          title: '5. زر المعالجة والحفظ (Output Engine)',
          icon: '✨',
          points: [
            { label: 'معالجة الأمر', content: 'الضغط عليه يدمج كل اختياراتك في كود هندسي واحد متكامل.' },
            { label: 'الأرشفة (💾)', content: 'بعد ظهور الكود، اضغط حفظ ليذهب لسجلك الخاص ولا تفقده أبداً.' },
            { label: 'نسخ/مشاركة', content: 'أزرار سريعة لأخذ الكود ولصقه في Midjourney أو Gemini فوراً.' }
          ]
        }
      ],
      footer: 'هذا الدليل تم صياغته بكل أمانة لضمان نجاحكم. DicelionTechnique | 2024-2026'
    },
    about: { 
      title: 'DicelionTechnique Services', 
      subtitle: 'Software Development & AI Strategic Solutions',
      promoText: 'بسم الله، وبفضلٍ من الله ومنته، نسعى لخدمتكم بكل أمانة وإخلاص. رائدون في ابتكار الحلول البرمجية المتطورة والتحولات الرقمية الشاملة، بخبرةٍ ميدانية رصينة تتجاوز العشرين عاماً. نؤمن بأن العلم رحلة تبدأ بالتواضع وتنتهي بالنفع العام، وما توفيقي إلا بالله عليه توكلت وإليه أنيب.', 
      experience: 'عشرون عاماً من السعي في مناكب العلم والتقنية +20',
      features: [
        'خادمكم التقني ومدرب معتمد لدى كبرى المعاهد المهنية',
        'هندسة البرمجيات بصدق وأمانة وحلول الأنظمة المتكاملة',
        'أخصائي هندسة الذكاء الاصطناعي برؤية إنسانية عميقة',
        'تصميم الهويات البصرية التي تعكس جوهر القوة والجمال',
        'برامج تدريبية احترافية (أونلاين وحضورياً) لنشر المعرفة',
        'تطوير حلول برمجية مخصصة تبتغي وجه الجودة والرضا'
      ],
      contacts: {
        whatsapp: 'تواصل مباشر (واتساب)',
        call: 'اتصال هاتفي (سريع)',
        email: 'مراسلة (البريد الإلكتروني)'
      },
      suggestion: {
        title: 'بوابة القلوب المفتوحة والاقتراحات',
        desc: 'رؤيتكم هي البوصلة التي توجه ابتكاراتنا؛ نرحب بكافة المقترحات لتعزيز كفاءة المنصة بما يخدم تطلعاتكم، فالمؤمن مرآة أخيه.'
      },
      followBtn: 'انضم لمجتمع DicelionTechnique المبارك' 
    }
  }
};

const SpiritualDeveloperHeader = ({ t, isSunlight }: any) => (
  <div className="relative w-full py-12 px-6 overflow-hidden rounded-[3rem] border border-white/5 bg-slate-900/40 mb-12 shadow-2xl">
     <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexGrid" width="50" height="43.3" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
              <path d="M25 0L50 14.4V43.3L25 57.7L0 43.3V14.4L25 0Z" fill="none" stroke="#38bdf8" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexGrid)" />
        </svg>
     </div>
     <div className="relative z-10 flex flex-col items-center text-center gap-6">
        <div className="space-y-2">
           <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-sky-500/10 border border-sky-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400">{t.about.subtitle}</span>
           </div>
        </div>
        <p className={`max-w-2xl text-[14px] leading-loose font-bold italic opacity-90 ${isSunlight ? 'text-slate-700' : 'text-slate-200'}`}>
           "{t.about.promoText}"
        </p>
     </div>
  </div>
);

const App: React.FC = () => {
  const [appLang, setAppLang] = useState<string>(() => localStorage.getItem('dt_lang') || 'ar');
  const t = getT(appLang);
  const [activeTab, setActiveTab] = useState<'create' | 'library' | 'history' | 'codes' | 'appLang' | 'about' | 'guide'>('create');
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isEditable, setIsEditable] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [isSunlightMode, setIsSunlightMode] = useState(false);
  
  const isSunlight = isSunlightMode; 

  useEffect(() => {
    const targets = [
      'تحت إشراف "إلكترو الوفاء" ونخبة من كبار الخبراء التقنيين، ',
      'تحت إشراف \'إلكترو الوفاء\' ونخبة من كبار الخبراء التقنيين، ',
      'under Electro Al-Wafaa supervision, '
    ];
    
    const purgeTextInDOM = () => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
      let node;
      while(node = walker.nextNode()) {
        targets.forEach(target => {
          if (node.textContent?.includes(target)) {
            node.textContent = node.textContent.replace(target, '');
          }
        });
      }
    };

    purgeTextInDOM();
    const observer = new MutationObserver(purgeTextInDOM);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [activeTab]);

  const categoriesList = useMemo(() => {
    const base = ['الكل', 'طب', 'طفل', 'إنفوجرافيك', 'شخص في السماء', 'تصميم 2026', 'مواقع التواصل', 'تسويق', 'فلاحة', 'فضاء', 'اقتصاد', 'سياسة', 'تكنولوجيا', 'فن', 'قانون', 'تعليم', 'صناعة', 'تخصصي', 'بزنس', 'تصميم', 'سينما', 'فيديو', 'منشورات', 'واقعي', 'صيانة', 'حرف', 'خدمات'];
    let result = [...base];
    const extraWords = ['كيمياء', 'فيزياء', 'جيولوجيا', 'أدب', 'لسانيات', 'منطق', 'سياحة', 'نقل', 'ملاحة', 'فلك', 'أحياء', 'جينات', 'روبوتات', 'برمجة', 'تشفير', 'تداول', 'استثمار', 'بورصة', 'عقارات', 'تطوع', 'أبحاث', 'إدارة', 'جودة', 'ريادة', 'أتمتة', 'تواصل', 'هوية', 'علامات', 'دعم', 'مبيعات', 'جمارك', 'قضاء', 'شرطة', 'دفاع', 'صحة', 'وقاية', 'تمريض', 'إسعاف', 'تغذية', 'يوغا', 'لياقة', 'عطور', 'صابون', 'جلود', 'ورق', 'تعدين', 'بترول', 'غاز', 'فحم', 'محاجر', 'مسارح', 'متاحف', 'مكتبات', 'نشر', 'ألعاب', 'تطوير', 'هاردوير', 'سوفتوير', 'شبكات', 'سيرفرات', 'إنترنت', 'سمارت', 'دبلوماسية', 'أحزاب', 'انتخابات', 'نقابات', 'جمعيات', 'غرف', 'ضرائب', 'تدقيق', 'محاسبة', 'تمويل', 'بنوك', 'تأمين', 'مخاطر', 'كوارث', 'أزمات', 'تخطيط', 'رؤية', 'رسالة', 'هدف', 'شغف', 'إلهام', 'تأثير', 'قيادة', 'ثقة', 'هيبة', 'وقار', 'حكمة', 'توازن', 'سلام', 'هدوء', 'سكينة', 'بهجة', 'سعادة', 'فشل', 'نجاح', 'إنجاز', 'تكريم', 'جوائز', 'مسابقات', 'ألغاز', 'أحاجي', 'خدع', 'سحر', 'سيرك', 'دبلجة', 'تعليق', 'إلقاء', 'خطابة', 'تحفيز', 'كوتشينج', 'تدريب', 'أكاديميات', 'مدارس', 'جامعات', 'مراكز', 'مختبرات', 'صيدليات', 'عيادات', 'مشافي', 'قلاع', 'حصون', 'قصور', 'أكواخ', 'فيلات', 'منتجعات', 'شاليهات', 'يخوت', 'طائرات', 'قطارات', 'بواخر', 'شاحنات', 'دراجات', 'سيارات', 'محركات', 'تروس', 'أدوات', 'ورش', 'خطوط', 'إمداد', 'لوجستيات', 'تخجين', 'تجزئة', 'جملة', 'تصدير', 'استيراد', 'مناطق', 'حرة', 'مراسم', 'بروتوكول', 'اتيكيت', 'مراسم', 'أعياد', 'مناسبات', 'أفراح', 'أحزان', 'مشاعر', 'أفكار', 'قيم', 'مبادئ', 'أخلاق', 'سلوك', 'عادات', 'تقاليد', 'فولكلور', 'تراث', 'آثار', 'أساطير', 'خرافات', 'ظواهر', 'تخاطر', 'تأمل', 'تصوف', 'مذاهب', 'أديان', 'حضارات', 'لغات', 'مخطوطات', 'برديات', 'نقوش', 'كنوز', 'غوص', 'صيد', 'رماية', 'سباحة', 'فروسية', 'هجن', 'صقارة', 'مخيمات', 'تسلّق', 'تزلّج', 'مظلات', 'سيرك', 'أكروبات', 'رقص', 'باليه', 'أوبرا', 'موسيقى', 'جاز', 'بوب', 'روك', 'راب', 'شعر', 'نثر', 'قصة', 'رواية', 'نقد', 'تمثيل', 'إخراخ', 'تصوير', 'مكياج', 'أزياء', 'ديكور', 'إضاءة', 'صوت', 'مونتاج', 'جرافيك', 'موشن', 'أنمي', 'كوميكس', 'كارتون', 'رسم', 'تلوين', 'نحت', 'خزف', 'نسيج', 'سجاد', 'تطريز', 'حلي', 'صياغة', 'نجارة', 'حدادة', 'سباكة', 'كهرباء', 'ميكانيك', 'بناء', 'تشييد', 'تخطيط', 'مدن', 'قرى', 'واحات', 'غابات', 'بحار', 'أنهار', 'جبال', 'وديان', 'صحارى', 'جزر', 'كواكب', 'نجوم', 'مجرات', 'ثقوب', 'سدم', 'كون', 'وجود', 'زمن', 'ماضي', 'حاضر', 'مستقبل', 'ذكاء', 'حكمة', 'منطق', 'واقع', 'خيال', 'أثر', 'تغيير', 'ابتكار', 'إبداع'];
    let i = 0;
    while (result.length < 1000) {
      const word = extraWords[i % extraWords.length];
      const suffix = Math.floor(result.length / extraWords.length);
      result.push(`${word}${suffix > 0 ? ' ' + suffix : ''}`);
      i++;
    }
    return result;
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>(() => {
    try {
      const saved = localStorage.getItem('dt_history');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [showLangSelector, setShowLangSelector] = useState(false);
  const [modalityModal, setModalityModal] = useState<{show: boolean, subject: any, type: 'copy'|'edit'}>({show: false, subject: null, type: 'copy'});

  useEffect(() => {
    const lastShown = localStorage.getItem('dt_last_announcement_v1.5');
    const now = Date.now();
    const cycle = 15 * 24 * 60 * 60 * 1000;
    if (!lastShown || (now - parseInt(lastShown)) > cycle) {
        setShowAnnouncement(true);
    }
  }, []);

  const closeAnnouncement = () => {
    localStorage.setItem('dt_last_announcement_v1.5', Date.now().toString());
    setShowAnnouncement(false);
  };

  const [formData, setFormData] = useState<PromptFormData>({
    promptMode: 'image', template: TEMPLATES[0].id, designType: '', aspectRatio: ASPECT_RATIOS[0], purpose: '',
    style: '', font: '', palette: '', background: BACKGROUNDS[0], mood: MOODS[0],
    elements: ELEMENTS[0], technical: TECHNICALS[0], personType: 'Default', language: LANGUAGES[0],
    customDetails: '', mainText: '', mainTextPos: 'وسط', secondaryText: '', secondaryTextPos: '', videoMotion: '',
    useReferenceImage: false, forceEnglish: false, targetModel: AI_MODELS[0], useImageAsMainSource: false,
    onlyEnglishVisuals: false
  });

  const filteredSubjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const idMatch = q.match(/^\d+$/);
    if (idMatch) {
        const idNum = parseInt(idMatch[0]);
        if (idNum > 0 && idNum <= 1000000) {
            const catIndex = Math.floor((idNum - 1) / 1000);
            const catName = categoriesList[catIndex % categoriesList.length];
            return [getMillionthNeuralPrompt(idNum, catName)];
        }
    }
    if (selectedCategory !== 'الكل') {
        const catOffset = Math.max(0, categoriesList.indexOf(selectedCategory));
        const results = [];
        for (let i = 1; i <= 100; i++) {
            const promptId = (catOffset * 1000) + i;
            const prompt = getMillionthNeuralPrompt(promptId, selectedCategory);
            if (!q || prompt.ar.toLowerCase().includes(q) || prompt.en.toLowerCase().includes(q)) {
                results.push(prompt);
            }
        }
        return results;
    }
    let base = PRO_ULTRA_DB.map((p, i) => ({ ...p, id: i + 1 }));
    if (!q) return base.slice(0, 50);
    return base.filter(s => s.ar.toLowerCase().includes(q) || s.en.toLowerCase().includes(q) || s.cat.toLowerCase().includes(q)).slice(0, 50);
  }, [searchQuery, selectedCategory, categoriesList]);

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = appLang;
    localStorage.setItem('dt_lang', appLang);
    localStorage.setItem('dt_history', JSON.stringify(savedPrompts));
  }, [appLang, t.dir, savedPrompts]);

  const BRANDING_TAG = `/* BRAND SEAL: DT V8.3 - NEON MASTER */`;

  const generate = () => {
    setIsGenerating(true);
    setGeneratedPrompt('');
    setIsEditable(false);
    setTimeout(() => {
      const { aspectRatio, mainText, language, forceEnglish, targetModel, mood, background, technical, useImageAsMainSource, onlyEnglishVisuals } = formData;
      const safeMainText = sanitizeInput(mainText);
      const prompt = `${BRANDING_TAG}\n[ENGINE_V8.3_STABLE]\nCORE_BRAND: DT NEON\nTARGET: ${targetModel}\nRATIO: ${aspectRatio}\nSUBJECT: ${safeMainText}\nMOOD: ${mood}\nENV: ${background}\nTECH: ${technical}\nLANG: ${forceEnglish ? 'EN' : language}\nSTATUS: NEON_CORE_ACTIVE`;
      setGeneratedPrompt(prompt);
      setIsGenerating(false);
      setTimeout(() => {
        const resView = document.getElementById('result-view');
        if (resView) resView.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }, 800);
  };

  const archivePrompt = useCallback(() => {
    if (!generatedPrompt || generatedPrompt.trim() === "") return;
    const newEntry: SavedPrompt = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      fullPrompt: generatedPrompt,
      summary: formData.mainText || (appLang === 'ar' ? 'مشروع بدون عنوان' : 'Untitled Project')
    };
    setSavedPrompts(prev => [newEntry, ...prev]);
    alert(t.saved);
  }, [generatedPrompt, formData.mainText, appLang, t.saved]);

  const handleQuickCopyTrigger = (subject: any) => setModalityModal({ show: true, subject, type: 'copy' });
  const handleEditTrigger = (subject: any) => setModalityModal({ show: true, subject, type: 'edit' });

  const executeModalityAction = (mode: 'image' | 'video' | 'post') => {
    const { subject, type } = modalityModal;
    const baseTextAr = subject.ar;
    const baseTextEn = subject.en;
    let finalPrompt = '';
    if (mode === 'image') {
      finalPrompt = `${BRANDING_TAG}\n[DT_IMAGE_CORE]\nSUBJECT: ${baseTextEn}\nSCENE: Detailed NEON AI Core environment\nSTYLE: Hyper-realistic 8K photo\nMOOD: Authoritative, successful`;
    } else if (mode === 'video') {
      finalPrompt = `${BRANDING_TAG}\n[DT_VIDEO_CORE]\nSUBJECT: ${baseTextEn}\nSCENE: Dynamic atmospheric neon depth\nMOTION: Fluid cinematic 60fps movement\nQUALITY: Ultra HD 4K`;
    } else {
      finalPrompt = `${BRANDING_TAG}\n[DT_TEXT_CORE]\nالموضوع: ${baseTextAr}\nالمهمة: كتابة منشور تسويقي إبداعي.\nالنبرة: احترافية، مقنعة.`;
    }
    
    if (type === 'copy') {
      navigator.clipboard.writeText(finalPrompt);
      alert(t.copied);
    } else {
      setFormData(prev => ({ ...prev, mainText: baseTextAr, promptMode: mode }));
      setGeneratedPrompt(finalPrompt);
      setActiveTab('create');
    }
    setModalityModal({ show: false, subject: null, type: 'copy' });
  };

  const shareContent = async (text: string) => {
    try {
      if (navigator.share) await navigator.share({ title: 'DT Share', text });
      else { navigator.clipboard.writeText(text); alert(t.copied); }
    } catch (err) { console.error(err); }
  };

  const deleteFromArchive = (id: string) => {
    if (confirm(appLang === 'ar' ? 'هل أنت متأكد من الحذف؟' : 'Are you sure?')) {
      setSavedPrompts(prev => prev.filter(p => p.id !== id));
    }
  };

  const editFromArchive = (prompt: SavedPrompt) => {
    setGeneratedPrompt(prompt.fullPrompt);
    setFormData(prev => ({ ...prev, mainText: prompt.summary }));
    setActiveTab('create');
  };

  const WisdomCard: React.FC<{ appLang: string, isSunlight: boolean }> = ({ appLang, isSunlight }) => {
    const [index, setIndex] = useState(0);
    const [phase, setPhase] = useState<'hidden' | 'visible' | 'initial'>('initial');
  
    useEffect(() => {
      const initialDelay = setTimeout(() => { setPhase('visible'); }, 2000);
      return () => clearTimeout(initialDelay);
    }, []);
  
    useEffect(() => {
      if (phase === 'initial') return;
      if (phase === 'visible') {
        const timer = setTimeout(() => { setPhase('hidden'); }, 7000); 
        return () => clearTimeout(timer);
      } else if (phase === 'hidden') {
        const timer = setTimeout(() => {
          setIndex((prev) => (prev + 1) % WISDOM_QUOTES.length);
          setPhase('visible');
        }, 3000); 
        return () => clearTimeout(timer);
      }
    }, [phase]);
  
    return (
      <div className="h-[120px] w-full flex items-center justify-center">
          <div className={`w-full overflow-hidden transition-all duration-1000 transform 
            ${phase === 'visible' ? 'opacity-100 scale-100 blur-none' : 'opacity-0 scale-95 blur-md'}`}>
            <div className={`relative p-6 rounded-[2.5rem] border-2 shadow-2xl flex flex-col items-center justify-center text-center gap-2 overflow-hidden group min-h-[110px] 
              ${isSunlight ? 'bg-white border-sky-600 text-sky-900 shadow-sky-200' : 'bg-slate-900/80 border-sky-400 text-white shadow-[0_0_30px_rgba(56,189,248,0.2)]'}`}>
              <div className={`absolute inset-0 opacity-50 ${isSunlight ? 'bg-gradient-to-tr from-sky-50/50 to-transparent' : 'bg-gradient-to-tr from-sky-500/10 via-transparent to-blue-500/10'}`}></div>
              <p className={`text-[13.5px] font-black leading-relaxed px-2 transition-all duration-700 glow-text-shimmer ${isSunlight ? '!text-sky-900 !bg-none !-webkit-text-fill-color-inherit' : 'text-white'}`}>
                {WISDOM_QUOTES[index]}
              </p>
            </div>
          </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen flex flex-col pt-24 pb-12 px-4 sm:px-6 ${t.dir} select-none overflow-x-hidden w-full max-w-full text-rendering-legibility ${isSunlightMode ? 'sunlight-theme' : ''}`}>
      
      {activeTab === 'create' && !isSunlightMode && <div className="active-gradient-layer animate-in fade-in duration-1000"></div>}

      {showAnnouncement && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-6 animate-in fade-in duration-500">
          <div className="glass-ui p-12 rounded-[4rem] border-sky-500/40 w-full max-lg text-center space-y-10 shadow-[0_0_100px_rgba(56,189,248,0.3)] relative overflow-hidden">
            <div className="mx-auto flex justify-center">
                <Unified3DLogo size="w-32 h-32" />
            </div>
            <div className="space-y-4">
              <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5"><p className="text-[13.5px] text-slate-200 font-bold leading-relaxed italic">"{t.announcement.body}"</p></div>
            </div>
            <div className="flex flex-col gap-4">
              <button onClick={() => window.open('https://web.facebook.com/alktrwalwfa', '_blank')} className="w-full py-5 bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-3xl font-black text-sm uppercase flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-transform"><span>🔗</span> {t.announcement.fbBtn}</button>
              <button onClick={closeAnnouncement} className="w-full py-4 bg-white/5 text-slate-400 rounded-3xl font-black text-[11px] uppercase tracking-widest"> {t.announcement.skip} </button>
            </div>
          </div>
        </div>
      )}

      {modalityModal.show && (
        <div className="modal-overlay" onClick={() => setModalityModal({ show: false, subject: null, type: 'copy' })}>
            <div className="modal-content animate-in zoom-in duration-300 glass-card p-10 max-w-md w-full" onClick={e => e.stopPropagation()}>
                <p className="text-slate-400 text-[11px] font-bold mb-8 text-center">{t.modalityModal.desc}</p>
                <div className="space-y-3">
                    <button onClick={() => executeModalityAction('image')} className="modality-btn bg-white/5 text-slate-200"><span>🖼️ {t.modalityModal.image}</span><span className="text-sky-500">→</span></button>
                    <button onClick={() => executeModalityAction('video')} className="modality-btn bg-white/5 text-slate-200"><span>🎥 {t.modalityModal.video}</span><span className="text-sky-500">→</span></button>
                    <button onClick={() => executeModalityAction('post')} className="modality-btn bg-white/5 text-slate-200"><span>✍️ {t.modalityModal.text}</span><span className="text-sky-500">→</span></button>
                    <button onClick={() => setModalityModal({ show: false, subject: null, type: 'copy' })} className="w-full py-4 text-slate-500 font-black text-[10px] uppercase mt-4">{t.modalityModal.cancel}</button>
                </div>
            </div>
        </div>
      )}

      <nav className={`nav-fixed-top ${isSunlightMode ? 'sunlight-theme' : ''}`}>
        <div className="max-w-xl mx-auto flex items-center justify-center gap-4 w-full px-4 overflow-visible">
             <NavIcon active={activeTab === 'create'} onClick={() => setActiveTab('create')} icon="الرئيسية" label={t.tabs.home} isSunlight={isSunlightMode} />
             <div className="flex items-center gap-4 py-1 flex-1 justify-around relative z-[600] overflow-visible">
                <NavIcon active={activeTab === 'library'} onClick={() => setActiveTab('library')} icon="مليون" label={t.tabs.library} isSunlight={isSunlightMode} />
                <NavIcon active={activeTab === 'history'} onClick={() => setActiveTab('history')} icon="سجل" label={t.tabs.history} isSunlight={isSunlightMode} />
                <NavIcon active={isSunlightMode} onClick={() => setIsSunlightMode(!isSunlightMode)} icon="سطوع" label={t.tabs.sunlight} isSunlight={isSunlightMode} />
                <NavIcon 
                  active={showLangSelector} 
                  onClick={() => setShowLangSelector(true)} 
                  icon={
                    <div className={`flex flex-col items-center justify-center w-full h-full p-1 rounded-xl transition-all border lang-selector-nav ${isSunlightMode ? 'bg-white border-slate-200' : 'bg-slate-800/40 border-white/5'}`}>
                      <span className="text-[12px]">{SUPPORTED_APP_LANGS.find(l=>l.id===appLang)?.flag}</span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[8px] font-black uppercase">{appLang}</span>
                        <span className="text-[7px] text-sky-400 animate-pulse">▼</span>
                      </div>
                    </div>
                  } 
                  label={t.tabs.appLang} 
                  isSunlight={isSunlightMode} 
                />
                <NavIcon active={activeTab === 'guide'} onClick={() => setActiveTab('guide')} icon="دليل" label={t.tabs.guide} isSunlight={isSunlightMode} />
                <NavIcon active={activeTab === 'about'} onClick={() => setActiveTab('about')} icon="عن" label={t.tabs.about} isSunlight={isSunlightMode} />
             </div>
        </div>
      </nav>

      <header className={`pb-8 text-center px-4 w-full relative z-20 ${isSunlightMode ? 'mt-8' : 'mt-4'}`}>
        <div className="flex justify-center mb-8">
           {/* MASTER UNIFIED LOGO IN HEADER - THE ONLY ONE */}
           <div className={`p-1 rounded-[2.5rem] transition-all duration-700 ${isSunlightMode ? 'scale-105' : 'bg-slate-800 shadow-2xl scale-110'}`}>
              <div className={`w-full h-full rounded-[2.2rem] overflow-hidden flex items-center justify-center border-2 ${isSunlightMode ? 'border-transparent' : 'bg-slate-950 border-white/5'}`}>
                 <Unified3DLogo size="w-32 h-32" isSunlight={isSunlightMode} animated={true} />
              </div>
           </div>
        </div>
        <p className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] mt-2 leading-relaxed ${isSunlightMode ? 'text-slate-500' : 'text-sky-400'}`}>{t.subtitle}</p>
      </header>

      <main className={`flex-grow w-full max-w-4xl mx-auto space-y-8 px-0 sm:px-4 main-app-container relative z-10 ${activeTab === 'about' ? 'spiritual-about-active' : ''}`}>
        {activeTab === 'create' && (
          <div className="page-transition space-y-8 w-full animate-in fade-in duration-500">
            <nav className={`glass-ui p-1.5 rounded-2xl flex gap-1 w-full overflow-hidden shadow-2xl ${isSunlightMode ? 'bg-slate-100 !border-slate-300' : ''}`}>
              {['image', 'video', 'post'].map(m => (
                <button key={m} onClick={() => setFormData(p => ({ ...p, promptMode: m as any }))} className={`flex-1 py-3.5 rounded-xl font-black text-[10px] uppercase transition-all ${formData.promptMode === m ? 'tab-active' : isSunlightMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {(t.promptMode as any)[m]}
                </button>
              ))}
            </nav>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className="glass-ui p-6 rounded-[2rem] space-y-6 w-full shadow-lg">
                <SelectBox label={t.labels.ratio} name="aspectRatio" options={ASPECT_RATIOS} value={formData.aspectRatio} onChange={(e:any) => setFormData(p=>({...p, aspectRatio: e.target.value}))} appLang={appLang} />
                <SelectBox label={t.labels.mood} name="mood" options={MOODS} value={formData.mood} onChange={(e:any) => setFormData(p=>({...p, mood: e.target.value}))} appLang={appLang} />
                <SelectBox label={t.labels.aiTarget} name="targetModel" options={AI_MODELS} value={formData.targetModel} onChange={(e:any) => setFormData(p=>({...p, targetModel: e.target.value}))} appLang={appLang} />
                <SelectBox label={t.labels.lang} name="language" options={LANGUAGES} value={formData.language} onChange={(e:any) => setFormData(p=>({...p, language: e.target.value}))} appLang={appLang} />
                <WisdomCard appLang={appLang} isSunlight={isSunlightMode} />
              </div>
              <div className="glass-ui p-6 rounded-[2rem] space-y-6 w-full shadow-lg">
                <SelectBox label={t.labels.bg} name="background" options={BACKGROUNDS} value={formData.background} onChange={(e:any) => setFormData(p=>({...p, background: e.target.value}))} appLang={appLang} />
                <SelectBox label={t.labels.tech} name="technical" options={TECHNICALS} value={formData.technical} onChange={(e:any) => setFormData(p=>({...p, technical: e.target.value}))} appLang={appLang} />
                <div className="grid grid-cols-1 gap-4">
                    <CheckboxItem label={t.labels.useRef} checked={formData.useReferenceImage} onChange={() => setFormData(p=>({...p, useReferenceImage: !p.useReferenceImage}))} />
                    <CheckboxItem label={t.labels.useImgSource} checked={formData.useImageAsMainSource} onChange={() => setFormData(p=>({...p, useImageAsMainSource: !p.useImageAsMainSource}))} />
                    <CheckboxItem label={t.labels.engOnly} checked={formData.forceEnglish} onChange={() => setFormData(p=>({...p, forceEnglish: !p.forceEnglish}))} />
                    <div className="space-y-2">
                        <CheckboxItem label={t.labels.visualEnglish} checked={formData.onlyEnglishVisuals} onChange={() => setFormData(p=>({...p, onlyEnglishVisuals: !p.onlyEnglishVisuals}))} />
                    </div>
                </div>
              </div>
            </div>
            <div className="glass-ui p-6 rounded-[2.5rem] space-y-6 w-full shadow-xl">
              <InputArea label={t.labels.text} name="mainText" value={formData.mainText} onChange={(e:any) => setFormData(p=>({...p, mainText: e.target.value}))} placeholder={t.placeholders.text} />
              <button onClick={generate} disabled={isGenerating} className={`w-full py-5 rounded-full font-black text-sm uppercase tracking-widest active:scale-95 transition-all shadow-xl ${isSunlightMode ? 'bg-sky-700 text-white hover:bg-sky-800' : 'bg-white text-slate-950 hover:bg-sky-500 hover:text-white'}`}>
                 {isGenerating ? '⏳ Processing' : '✨ ' + t.generateBtn}
              </button>
            </div>
            {generatedPrompt && (
              <section id="result-view" className="glass-ui p-8 rounded-[2.5rem] border-sky-500/20 w-full space-y-6 relative overflow-hidden">
                <div className="flex flex-wrap justify-between items-center gap-4 border-b border-white/5 pb-4">
                  <h3 className={`text-[10px] font-black uppercase tracking-widest ${isSunlightMode ? 'text-sky-700' : 'text-sky-400'}`}>{t.editLabel}</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <ActionBtn icon="📝" label={t.resultActions.edit} onClick={() => setIsEditable(!isEditable)} active={isEditable} />
                    <ActionBtn icon="📋" label={t.resultActions.copy} onClick={() => { navigator.clipboard.writeText(generatedPrompt); alert(t.copied); }} primary />
                    <ActionBtn icon="💾" label={t.resultActions.save} onClick={archivePrompt} />
                    <ActionBtn icon="🔗" label={t.resultActions.share} onClick={() => shareContent(generatedPrompt)} />
                  </div>
                </div>
                <textarea value={generatedPrompt} onChange={(e) => setGeneratedPrompt(e.target.value)} readOnly={!isEditable} className={`w-full p-6 rounded-2xl text-[12px] font-mono min-h-[200px] no-scrollbar border transition-all ${isSunlightMode ? 'bg-white border-slate-300 text-slate-900' : 'bg-black/40 border-transparent text-slate-300'} ${isEditable ? 'border-sky-500/40' : ''} textarea-element`} />
              </section>
            )}
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="page-transition pb-32 w-full animate-in fade-in duration-500 guide-content-wrapper relative opacity-100 visible">
            <div className="text-center space-y-8 mb-12">
            </div>
            <div className="glass-card book-shadow space-y-16 p-8 sm:p-14 relative overflow-hidden bg-gradient-to-b from-slate-900/80 to-black/95">
                <div className="text-center max-w-2xl mx-auto space-y-6">
                   <div className="w-16 h-1 bg-sky-500/60 mx-auto rounded-full"></div>
                   <p className={`text-lg font-bold leading-relaxed italic ${isSunlightMode ? 'text-slate-800' : 'text-slate-100'}`}>"{t.guide.intro}"</p>
                   <div className="w-16 h-1 bg-sky-500/60 mx-auto rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 gap-12">
                   {t.guide.masterSections && t.guide.masterSections.map((section: any) => (
                     <div key={section.id} className="space-y-6 p-1 border-b border-white/10 pb-8 opacity-100 visible flex flex-col">
                        <div className="flex items-center gap-5">
                           <span className="w-16 h-16 rounded-3xl bg-slate-900 text-4xl flex items-center justify-center border border-sky-500/40 shadow-xl">{section.icon}</span>
                           <h3 className={`text-xl font-black ${isSunlightMode ? 'text-sky-900' : 'text-sky-400'}`}>{section.title}</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                           {section.points.map((point: any, idx: number) => (
                             <div key={idx} className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-sky-500/10 transition-all group">
                                <span className="inline-block px-3 py-1 rounded-full bg-sky-600 text-white text-[9px] font-black mb-3 uppercase">{point.label}</span>
                                <p className={`text-[13.5px] leading-loose font-bold ${isSunlightMode ? 'text-slate-700' : 'text-slate-200'}`}>{point.content}</p>
                             </div>
                           ))}
                        </div>
                     </div>
                   ))}
                </div>
                <div className="pt-16 border-t border-white/10 text-center space-y-6">
                   <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-80 text-slate-100">{t.guide.footer}</p>
                </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="page-transition space-y-8 pb-32 w-full animate-in slide-in-from-bottom duration-500">
            <div className="text-center">
              <h2 className="text-2xl font-black uppercase tracking-tighter">{t.tabs.history}</h2>
              <p className="text-slate-500 text-[10px] uppercase font-bold mt-2">{savedPrompts.length} Saved Entries</p>
            </div>
            {savedPrompts.length === 0 ? (
              <div className="glass-ui p-12 rounded-[3rem] text-center space-y-4">
                <span className="text-5xl opacity-20">📭</span>
                <p className="text-slate-400 font-bold">{t.history.empty}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {savedPrompts.map(prompt => (
                  <div key={prompt.id} className="glass-ui p-6 rounded-[2.5rem] space-y-4 hover:border-sky-500/30 transition-all group">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h4 className="font-black text-sm">{prompt.summary}</h4>
                        <span className="text-[9px] text-slate-500 font-bold">{prompt.date}</span>
                      </div>
                      <button onClick={() => deleteFromArchive(prompt.id)} className="w-8 h-8 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">🗑️</button>
                    </div>
                    <p className={`text-[11px] font-mono p-4 rounded-xl line-clamp-2 ${isSunlightMode ? 'bg-slate-100 text-slate-600' : 'bg-black/30 text-slate-400'}`}>{prompt.fullPrompt}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                       <ActionBtn icon="📋" label={t.resultActions.copy} onClick={() => { navigator.clipboard.writeText(prompt.fullPrompt); alert(t.copied); }} />
                       <ActionBtn icon="📝" label={t.resultActions.edit} onClick={() => editFromArchive(prompt)} />
                       <ActionBtn icon="🔗" label={t.resultActions.share} onClick={() => shareContent(prompt.fullPrompt)} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'about' && (
          <div className="page-transition pb-32 w-full pdf-reading-mode animate-in fade-in duration-500">
             <div className="spiritual-about-container space-y-8">
                <SpiritualDeveloperHeader t={t} isSunlight={isSunlightMode} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="glass-card p-10 space-y-6 border-l-4 border-sky-500/50">
                      <div className="flex items-center gap-4">
                        <h3 className={`text-xl font-black ${isSunlightMode ? 'text-slate-900' : 'text-white'}`}>رسالة السعي</h3>
                      </div>
                      <div className="space-y-4 text-start">
                         {t.about.features.map((f: string, i: number) => (
                           <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 transition-all hover:bg-sky-500/10 group">
                              <span className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-black text-xs shrink-0">★</span>
                              <span className={`text-[13px] font-bold leading-relaxed ${isSunlight ? 'text-slate-800' : 'text-slate-100'}`}>{f}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                   <div className="space-y-6">
                      <div className="glass-card p-10 space-y-8 bg-gradient-to-br from-slate-900 to-sky-950/40">
                         <div className="text-center space-y-2"><span className="text-[10px] font-black uppercase tracking-[0.5em] text-sky-500">قنوات الاتصال</span><h4 className="text-lg font-black text-white">طرق الوصول المباشر</h4></div>
                         <div className="flex flex-col gap-4">
                            <SocialBtn href="https://wa.me/212717118180" icon="📱" label={t.about.contacts.whatsapp} color="bg-emerald-600 text-white" />
                            <SocialBtn href="tel:+212521177000" icon="📞" label={t.about.contacts.call} color="bg-blue-600 text-white" />
                            <SocialBtn href="mailto:diceliontechnique@gmail.com" icon="✉️" label={t.about.contacts.email} color="bg-slate-800 text-white" />
                         </div>
                      </div>
                      <div className="p-8 rounded-[2.5rem] border-2 border-dashed border-sky-500/30 text-center space-y-4">
                         <h5 className="text-sm font-black text-sky-400 uppercase tracking-widest">{t.about.suggestion.title}</h5>
                         <p className="text-[12px] font-bold opacity-70 leading-relaxed italic">"{t.about.suggestion.desc}"</p>
                         <button onClick={() => window.open('https://web.facebook.com/alktrwalwfa', '_blank')} className="w-full py-5 rounded-2xl bg-gradient-to-r from-blue-800 to-blue-600 text-white font-black text-[12px] uppercase tracking-widest"> {t.about.followBtn} </button>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'library' && (
          <div className="library-tab-wrapper page-transition space-y-6 pb-32 w-full animate-in fade-in duration-500">
            <div className="search-bar-container space-y-4">
                <div className={`glass-ui h-16 rounded-full flex items-center px-8 w-full border shadow-[0_0_20px_rgba(56,189,248,0.1)] ${isSunlightMode ? 'bg-white border-slate-300' : 'bg-slate-900/60 border-sky-500/20'}`}>
                <span className="mr-4 text-slate-500">🔍</span>
                <input type="text" placeholder={t.placeholders.search} className={`flex-1 bg-transparent py-2 text-sm font-bold outline-none w-full ${isSunlightMode ? 'text-black' : 'text-white'}`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <div className="w-full">
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="library-dropdown select-element" >
                        {categoriesList.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full pt-4">
              {filteredSubjects.map((s) => (
                <div key={s.id} className="library-item-card p-8 group relative overflow-hidden">
                  <div className="absolute top-4 left-4"><span className="prompt-id-badge">#{s.id}</span></div>
                  <div className="flex-grow space-y-3 mt-4">
                    <span className={`text-[9px] font-black uppercase tracking-widest ${isSunlightMode ? 'text-sky-600' : 'text-sky-400/60'}`}>{s.cat}</span>
                    <p className={`text-[14px] font-black leading-tight ${isSunlightMode ? 'text-black' : 'text-white group-hover:text-sky-400'}`}>{appLang === 'ar' ? s.ar : s.en}</p>
                  </div>
                  <div className="mt-8 flex flex-col gap-2">
                    <button onClick={() => handleQuickCopyTrigger(s)} className={`w-full py-3 text-[11px] font-black border rounded-2xl transition-all ${isSunlightMode ? 'bg-slate-100 text-slate-700' : 'bg-white/5 text-white border-white/5'}`}><span>📋</span> {t.quickCopy}</button>
                    <button onClick={() => handleEditTrigger(s)} className={`w-full py-3 rounded-2xl text-[11px] font-black ${isSunlightMode ? 'bg-sky-600 text-white' : 'bg-white text-slate-950'}`}>{t.editInStudio}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {showLangSelector && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/80 backdrop-blur-xl px-6" onClick={() => setShowLangSelector(false)}>
           <div className="dropdown-list-container dropdown-scrollbar animate-in zoom-in duration-300" onClick={e => e.stopPropagation()}>
              <h3 className={`text-sm font-black text-center py-6 border-b border-white/10 uppercase tracking-widest ${isSunlightMode ? 'text-slate-900 bg-white' : 'text-sky-400 bg-slate-900/50'}`}>Select Language</h3>
              <div className="max-h-[60vh] overflow-y-auto">
                {SUPPORTED_APP_LANGS.map(l => (
                  <button key={l.id} onClick={() => { setAppLang(l.id); setShowLangSelector(false); }} className={`dropdown-item ${appLang === l.id ? 'active' : ''}`}>
                    <span>{l.name}</span><span className="text-xl">{l.flag}</span>
                  </button>
                ))}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const SocialBtn = ({ href, icon, label, color }: any) => (
  <a href={href} target="_blank" className={`px-6 py-4 rounded-3xl font-black text-[11px] uppercase flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-lg border ${color}`}>
    <span className="text-xl">{icon}</span>{label}
  </a>
);

const ActionBtn = ({ icon, label, onClick, primary, active }: any) => (
  <button onClick={onClick} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-[9px] uppercase ActionBtn ${primary ? 'bg-sky-500 text-white' : active ? 'bg-sky-500/20 text-sky-400 border border-sky-500/20' : 'bg-white/5 text-slate-300 border border-white/5'}`}>
    <span className="text-xs">{icon}</span><span className="hidden sm:inline">{label}</span>
  </button>
);

const NavIcon = ({ active, icon, onClick, isSunlight, label }: any) => (
  <div className="relative group flex flex-col items-center flex-shrink-0 overflow-visible">
    <button onClick={(e) => { e.stopPropagation(); onClick(); }} className={`w-14 h-14 flex items-center justify-center rounded-full transition-all duration-700 relative overflow-hidden NavIcon ${active ? isSunlight ? 'bg-sky-600 text-white scale-110 shadow-lg border-2 border-white' : 'bg-slate-800 text-white scale-110 shadow-[0_0_35px_rgba(56,189,248,0.3)] border-2 border-sky-400' : isSunlight ? 'bg-slate-100 text-slate-800 border border-slate-300' : 'bg-white/5 text-white border border-white/5'}`} >
      <div className={`absolute inset-[2.5px] rounded-full z-[1] transition-all duration-100 ${active ? (isSunlight ? 'bg-sky-600' : 'bg-slate-900') : isSunlight ? 'bg-slate-100' : 'bg-slate-900'}`}></div>
      <span className={`relative z-10 ${typeof icon !== 'string' ? '' : icon.length > 1 ? 'text-[11px] leading-tight font-black uppercase text-center px-1' : 'text-3xl'} ${active ? 'text-white' : isSunlight ? 'text-slate-800' : 'text-slate-200'}`}>
        {icon}
      </span>
    </button>
    <div className="absolute -bottom-9 opacity-0 group-hover:opacity-100 transition-all duration-100 whitespace-nowrap z-[2000] pointer-events-none">
      <span className="text-[10px] font-black uppercase px-3 py-1 rounded-full bg-sky-600 text-white shadow-xl">{label}</span>
    </div>
  </div>
);

const CheckboxItem = ({ label, checked, onChange }: any) => (
  <div className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer ${checked ? 'border-green-500/30 bg-green-500/5' : 'border-white/5 bg-slate-900/40'}`} onClick={onChange}>
    <span className="text-[11px] font-black text-slate-200">{label}</span>
    <div className={`w-6 h-6 rounded-full border-2 transition-all ${checked ? 'bg-green-500 border-green-500' : 'border-white/10'}`}>
      {checked && <span className="text-white text-xs flex justify-center mt-0.5">✓</span>}
    </div>
  </div>
);

const getLocalizedOptionInternal = (val: string, lang: string) => {
  if (lang === 'ar') return val;
  for (const key in SEED_DATA) {
    const list = (SEED_DATA as any)[key];
    if (Array.isArray(list)) {
      const found = list.find((item: any) => item && item.ar === val);
      if (found && found.en) return found.en;
    }
  }
  return val;
};

const SelectBox = ({ label, name, options, value, onChange, appLang }: any) => (
  <div className="space-y-2 w-full px-1">
    <label className="text-[10px] font-black text-slate-500 uppercase px-1 tracking-widest">{label}</label>
    <select name={name} value={value} onChange={onChange} className="w-full border rounded-xl px-4 py-4 text-[12.5px] font-bold select-element">
      {options.map((o: string) => <option key={o} value={o}>{getLocalizedOptionInternal(o, appLang)}</option>)}
    </select>
  </div>
);

const InputArea = ({ label, value, onChange, placeholder }: any) => (
  <div className="space-y-2 w-full px-1">
    <label className="text-[10px] font-black text-slate-500 uppercase px-1 tracking-widest">{label}</label>
    <textarea value={value} onChange={onChange} placeholder={placeholder} className="w-full border rounded-[2.5rem] px-8 py-8 text-[13.5px] font-bold outline-none min-h-[160px] textarea-element" />
  </div>
);

const getT = (lang: string) => UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.ar;

export default App;
/* FINAL_BUILD_PRODUCTION_MASTER_SEAL: V8.6_RESTORED_PREVIOUS_UI_STATE */
