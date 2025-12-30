
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  ASPECT_RATIOS, BACKGROUNDS, MOODS, ELEMENTS, TECHNICALS, LANGUAGES, SEED_DATA, TEMPLATES, AI_MODELS, PRO_CODE_DATABASE, PRO_ULTRA_DB, getMillionthNeuralPrompt 
} from './constants';
import { PromptFormData, SavedPrompt } from './types';

// قائمة اللغات المدعومة مع الهوية البصرية
const SUPPORTED_APP_LANGS = [
  { id: 'ar', name: 'العربية', flag: '🇲🇦', dir: 'rtl' },
  { id: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
  { id: 'es', name: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { id: 'fr', name: 'Français', flag: '🇫🇷', dir: 'F' },
  { id: 'tr', name: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
  { id: 'fa', name: 'فارسی', flag: '🇮🇷', dir: 'rtl' },
  { id: 'ku', name: 'Kurdî', flag: '☀️', dir: 'rtl' },
  { id: 'nl', name: 'Nederlands', flag: '🇳🇱', dir: 'ltr' }
];

// قاموس الترجمة الاحترافي الشامل للواجهات
const UI_TRANSLATIONS: any = {
  ar: {
    dir: 'rtl',
    langName: 'العربية',
    title: 'DT-Prompt',
    subtitle: 'Dicelion-Technique | Intelligent Prompt System v1.5',
    tabs: { create: 'المختبر', library: 'مليون برمبت', history: 'سجل المحفوظات', codes: 'الأكواد', appLang: 'اللغة', guide: 'دليل المستخدم', about: 'عن المطور', home: 'الرئيسية', sunlight: 'وضع السطوع' },
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
    labels: { lang: 'محرك اللغة', ratio: 'أبعاد المخرج', mood: 'نبرة الصوت والأسلوب', bg: 'سياق المحتوى والبيئة (100+)', tech: 'قالب الهيكلة الاحترافي', text: 'الموضوع الأساسي', details: 'تفاصيل الحملة', useRef: 'توليد Prompt بتقنية سيكولوجي حصري ل DT-Prompt', engOnly: 'توليد نص Prompt بالإنجليزية فقط', aiTarget: 'منصة الذكاء المستهدفة', useImgSource: 'توليد Prompt مرفق بالصورة', visualEnglish: 'توليد Prompt لمنصة لا تدعم العربية', visualEnglishDesc: 'لضمان دقة النصوص البصرية؛ أغلب الأدوات لا تدعم العربية باستثناء Nanobanana.' },
    announcement: { 
      title: 'إشعار Dicelion-Technique 🚀', 
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
      title: 'دليل المستخدم DT-Prompt', 
      subtitle: 'موسوعة هندسة الأوامر الذكية v1.5',
      intro: 'تطبيق DT-Prompt هو مختبر هندسي متكامل صُمم ليكون الجسر الرابط بين خيالك البشري وقدرة الآلة التوليدية العظمى. إليك تشريحاً دقيقاً لكل ركن في هذه الواجهة الذكية:',
      infographicTitle: 'تشريح الواجهة الذكية (Interface Map) 🗺️',
      interfaceItems: [
        { id: '01', title: 'مبدل الأنماط (Modality Selector)', desc: 'الخيار العلوي الذي يحدد العصب الرئيسي للمحرك؛ "صور" للإنتاج الفني، "فيديو" لصناعة المحتوى المتحرك، أو "منشور" لكتابة النصوص التسويقية.' },
        { id: '02', title: 'سياق المحتوى والبيئة (Contextual Environment)', desc: 'يحتوي على 100+ بيئة احترافية. اختيارك هنا يضع موضوعك في إطار واقعي (مثل: غرفة تحكم نيون أو مكتب محاماة فاخر) لرفع قيمة المخرج بصرياً.' },
        { id: '03', title: 'قالب الهيكلة الاحترافي (Technical Structure)', desc: 'حقن الأوامر بتقنيات RAW أو Octane. هذا الخيار هو المسؤول عن "جودة الخامة" والدقة التي تجعل النتيجة لا تفرق عن الحقيقة الفوتوغرافية.' },
        { id: '04', title: 'أبعاد المخرج (Output Geometry)', desc: 'تحديد النسبة الذهبية للعمل؛ 9:16 للموبايل (Reels/TikTok)، 16:9 للسينما، أو 1:1 للمنشورات الكلاسيكية.' },
        { id: '05', title: 'نبرة الصوت والأسلوب (Tone & Mood)', desc: 'إضافة "الروح" للعمل. تتوفر نبرات سيكولوجية مثل "الهيبة الملكية" أو "الجذب التسويقي" لتوجيه مشاعر المشاهد فور رؤية النتيجة.' },
        { id: '06', title: 'منصة الذكاء المستهدفة (Target AI Platform)', desc: 'تخصيص الكود البرمجي ليتوافق مع لغة المنصة المستهدفة (Midjourney، Gemini، ChatGPT) لضمان أعلى استجابة للأوامر.' },
        { id: '07', title: 'محرك اللغة (Language Engine)', desc: 'يحدد اللغة التي سيتم بها صياغة المتغيرات داخل البرومبت، مع خيار "التصدير الإنجليزي" لضمان دقة المعالجة العالمية.' },
        { id: '08', title: 'النواة الإبداعية (Subject Input)', desc: 'المكان الذي تضع فيه فكرتك الأساسية، ليقوم النظام بتغليفها بطبقات الهندسة التي اخترتها أعلاه.' }
      ],
      scientificAnalysisTitle: 'التحليل السيكولوجي الحصري لـ Dicelion-Technique 🧠',
      scientificAnalysisContent: 'عند تفعيل هذا الخيار, يقوم المحرك بـ "حقن عصبي" للبرومبت يعتمد على علم النفس المعرفي:\n\n1. المحفزات اللاواعية: إضافة كلمات مفتاحية تخاطب العقل الباطن للمشاهد (مثل: الثقة، الهيبة، أو الندرة).\n2. التوازن البصري: فرض قواعد التكوين الفني التي تريح العين وتجذب الانتباه تلقائياً.\n3. هندسة التفاصيل: التركيز على "التفاصيل الدقيقة" التي تعطي انطباعاً بالاحترافية العالية والمصداقية المطلقة.\n\nهذا الخيار ليس مجرد وصف، بل هو "بروتوكول تسويقي" يحول الصورة العادية إلى أداة جذب قوية.',
      sections: [
        { title: '01. فلسفة البرومبت (Prompt Engineering)', content: 'البرومبت هو "فن صياغة الأوامر"؛ وهو الكود الذي يفهم الذكاء الاصطناعي لإنتاج مخرجات دقيقة. DT-Prompt يتكفل عنك بهذه الهندسة المعقدة.' },
        { title: '02. بوابة المختبر: اختيار التخصص', content: 'الصور: للإنتاج الفني والسينمائية.\nالفيديو: لصناعة المحتوى المتحرك.\nالنص: لكتابة المنشورات التسويقية والسيناريوهات بأسلوب بشري مقنع.' }
      ],
      steps: {
        title: 'فائدة على طريق DT-Prompt',
        s1: '١. التفكير الاستراتيجي: حدد هدفك (بيع، توعية، أو ترفيه).',
        s2: '٢. الضبط الهندسي: اختر أبعاد المخرج والمزاج المناسب للهدف.',
        s3: '٣. التفعيل الذكي: استخدم التحليل السيكولوجي لرفع جودة التفاصيل.',
        s4: '٤. التنفيذ والأرشفة: عالج الأمر، انسخ الكود للمنصة، ثم احفظ مشروعك للأبد.'
      }
    },
    about: { 
      title: 'DicelionTechnique Services', 
      subtitle: 'Software Development & AI Strategic Solutions',
      promoText: 'رائدون في ابتكار الحلول البرمجية المتطورة والتحولات الرقمية الشاملة، تحت إشراف "إلكترو الوفاء" ونخبة من كبار الخبراء التقنيين والمدربين المعتمدين دولياً، بخبرة مهنية وميدانية رصينة تتجاوز العشرين عاماً في هندسة النظم البرمجية، وتطوير خوارزميات الذكاء الاصطناعي، وصيانة البنى التحتية للتقنيات الذكية والحواسيب.', 
      experience: 'خبرة مهنية رصينة +20 عاماً',
      features: [
        'خبير تقني ومدرب معتمد لدى كبرى المعاهد المهنية',
        'هندسة البرمجيات المتقدمة وحلول صيانة الأنظمة والحواسيب',
        'أخصائي هندسة الذكاء الاصطناعي تحليل البيانات الضخمة',
        'تصميم الهوية البصرية المتكاملة واستراتيجيات التسويق الرقمي',
        'برامج تدريبية احترافية معتمدة (أونلاين وحضورياً)',
        'تطوير الحلول التقنية والبرمجية المخصصة للمؤسسات'
      ],
      contacts: {
        whatsapp: 'تواصل مباشر عبر واتساب',
        call: 'اتصال هاتفي سريع',
        email: 'المراسلة عبر البريد الإلكتروني'
      },
      suggestion: {
        title: 'بوابة التطوير والاقتراحات',
        desc: 'رؤيتكم هي البوصلة التي توجه ابتكاراتنا؛ نرحب بكافة المقترحات لتعزيز كفاءة المنصة بما يخدم تطلعاتكم المهنية.'
      },
      followBtn: 'انضم الآن لمجتمع DicelionTechnique' 
    }
  },
  en: {
    dir: 'ltr',
    langName: 'English',
    title: 'DT-Prompt',
    subtitle: 'Dicelion-Technique | Intelligent Prompt System v1.5',
    tabs: { create: 'Laboratory', library: 'Million Prompts', history: 'History Log', codes: 'Codes', appLang: 'Language', guide: 'User Guide', about: 'Developer', home: 'Home', sunlight: 'Brightness' },
    generateBtn: 'Process Engine ✨',
    copyBtn: 'Copy',
    saveBtn: 'Save',
    editLabel: 'Pro Command Editor',
    resultActions: { copy: 'Copy', save: 'Save', edit: 'Edit', share: 'Share', delete: 'Delete' },
    history: { empty: 'Archive is empty', suggestionsTitle: 'Pro Tips 💡', suggestions: ['Add "Golden Hour" for magical lighting', 'Use "8k resolution" for max detail', 'Try blending two styles for unique results'] },
    copied: 'Copied successfully!',
    saved: 'Archived successfully!',
    promptMode: { image: 'Image Gen', video: 'Video Gen', post: 'Pro Text' },
    placeholders: { text: 'Campaign title...', search: 'Search text or Prompt ID (1 - 1,000,000)...', selectDept: 'Select from 1000 specialized departments...' },
    labels: { lang: 'Language', ratio: 'Ratio', mood: 'Tone & Style', bg: 'Context & Environment (100+)', tech: 'Structure', text: 'Subject', details: 'Details', useRef: 'Exclusive Psych DT-Prompt Tech', engOnly: 'Generate English Prompt Only', aiTarget: 'Target AI Platform', useImgSource: 'Generate Prompt with Image', visualEnglish: 'Generate Prompt for non-Arabic platforms', visualEnglishDesc: 'For text accuracy; most tools only support English visuals (except Nanobanana).' },
    announcement: { 
      title: 'Dicelion-Technique Notice 🚀', 
      skip: 'Skip', 
      fbBtn: 'Follow Official Page',
      body: 'Follow our official Facebook page for the latest free professional apps, and stay tuned for the announcement of the in-person AI course (Marketing, Coding, and Design).'
    },
    useBtn: 'APPLY',
    quickCopy: 'Quick Copy',
    editInStudio: 'Edit',
    modalityModal: {
        title: 'Select Target Modality',
        desc: 'The engine will generate a pro command based on your choice',
        image: 'Image Prompt (Art)',
        video: 'Video Prompt (Motion)',
        text: 'Post Prompt (Text)',
        cancel: 'Cancel'
    },
    guide: { 
      title: 'Guide to Master DT-Prompt', 
      subtitle: 'Strategic AI Engineering Encyclopedia v1.5',
      intro: 'DT-Prompt is a complete engineering lab designed to be the bridge between human imagination and AI. Here is a breakdown of every smart component:',
      infographicTitle: 'UI Infrastructure Architecture 🗺️',
      interfaceItems: [
        { id: '01', title: 'Modality Selector', desc: 'Sets the core neural engine: Image, Video, or Post/Text.' },
        { id: '02', title: 'Context & Environment', desc: 'Provides 100+ professional settings to frame your subject realistically.' },
        { id: '03', title: 'Technical Structure', desc: 'Injects RAW or Octane rendering techs for hyper-photorealistic quality.' },
        { id: '04', title: 'Output Geometry', desc: 'Controls the golden ratio: 9:16 for Mobile, 16:9 for Cinema, or 1:1 for Classic.' },
        { id: '05', title: 'Tone & Mood', desc: 'The "soul" of the prompt. Uses emotional triggers like "Royal Prestige" or "Corporate Trust".' },
        { id: '06', title: 'Target AI Platform', desc: 'Customizes code for Midjourney, Gemini, or ChatGPT for optimized response.' },
        { id: '07', title: 'Language Engine', desc: 'Sets internal logic language, with "English Export" for global AI accuracy.' },
        { id: '08', title: 'Subject Input', desc: 'The core seed where you plant your idea to be engineered.' }
      ],
      scientificAnalysisTitle: 'Dicelion-Technique Exclusive Psych Analysis 🧠',
      scientificAnalysisContent: 'When active, the engine performs "Neural Injection" based on cognitive psychology:\n\n1. Subconscious Triggers: Adding keywords that speak to the viewer\'s intuition (Trust, Authority).\n2. Visual Balance: Enforcing artistic rules of composition for natural attraction.\n3. Detail Engineering: Focusing on macro-textures that signal high professional credibility.\n\nThis is a "Marketing Protocol" that transforms a regular image into a powerful conversion tool.',
      sections: [
        { title: '01. Prompt Engineering Philosophy', content: 'A prompt is the "art of crafting commands". DT-Prompt handles this complexity for you.' }
      ],
      steps: {
        title: 'Benefit on the road to DT-Prompt',
        s1: '1. Strategic Thinking: Define your goal.',
        s2: '2. Engineering Adjustment: Select ratios and mood.',
        s3: '3. Smart Activation: Use Psych analysis for detail.',
        s4: '4. Execute & Archive: Save your project forever.'
      }
    },
    about: { 
      title: 'DicelionTechnique Services', 
      subtitle: 'Software Development & AI Strategic Solutions',
      promoText: 'Pioneers in innovative software solutions and digital transformation, operating under the expert supervision of "Electro Al-Wafaa" and a distinguished panel of internationally certified technical experts. With over 20 years of solid professional experience in systems engineering, AI development, and smart technology maintenance.', 
      experience: 'Over 20 Years of Solid Professional Experience',
      features: [
        'Technical Expert & Certified Instructor at Elite Institutes',
        'Advanced Software Engineering, Systems Maintenance & PC Solutions',
        'AI Engineering Specialist & Big Data Analyst',
        'Comprehensive Visual Identity & Strategic Digital Marketing',
        'Professional Certified Training (In-person & Online)',
        'Custom Technical Solutions & Systems Development for Enterprises'
      ],
      contacts: {
        whatsapp: 'Direct WhatsApp Contact',
        call: 'Quick Strategic Phone Call',
        email: 'Contact via Professional Email'
      },
      suggestion: {
        title: 'Development & Feedback Hub',
        desc: 'Your vision is our innovation compass; we welcome all suggestions to enhance our platform to perfectly meet your professional needs.'
      },
      followBtn: 'Join the Strategic DicelionTechnique Community' 
    }
  }
};

// محرك الترجمة العميقة للقوائم المنسدلة (Deep Localization Engine)
const getLocalizedOption = (val: string, lang: string) => {
  if (lang === 'ar') return val;
  let enFallback = val;
  for (const cat in SEED_DATA) {
    const found = (SEED_DATA as any)[cat].find((item: any) => item.ar === val);
    if (found) {
      enFallback = found.en.split(',')[0];
      if (lang === 'en') return enFallback;
      break;
    }
  }
  const dictionary: any = {
    ku: { '1:1': '١:١ (چوارگۆشە)', '9:16': '٩:١٦ (مۆبایل)', '16:9': '١٦:٩ (سينەما)', 'العربية': 'عەرەبي' },
    tr: { '1:1': '1:1 (Kare)', '9:16': '9:16 (Dikey)', '16:9': '16:9 (Geniş)', 'العربية': 'Arapça' }
  };
  return dictionary[lang]?.[val] || enFallback || val;
};

const App: React.FC = () => {
  const [appLang, setAppLang] = useState<string>(() => localStorage.getItem('dt_lang') || 'ar');
  const t = getT(appLang);
  const [activeTab, setActiveTab] = useState<'create' | 'library' | 'history' | 'codes' | 'appLang' | 'about' | 'guide'>('create');
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isEditable, setIsEditable] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  // حالة "وضع القراءة تحت الشمس" (Sunlight Reading Mode)
  const [isSunlightMode, setIsSunlightMode] = useState(false);
  
  // توليد قائمة الـ 1000 قسم بحث فريدة (1000 Master Categories)
  const categoriesList = useMemo(() => {
    // البدء بالأقسام الاستراتيجية المطلوبة
    const base = ['الكل', 'طب', 'طفل', 'إنفوجرافيك', 'شخص في السماء', 'تصميم 2026', 'مواقع التواصل', 'تسويق', 'فلاحة', 'فضاء', 'اقتصاد', 'سياسة', 'تكنولوجيا', 'فن', 'قانون', 'تعليم', 'صناعة', 'تخصصي', 'بزنس', 'تصميم', 'سينما', 'فيديو', 'منشورات', 'واقعي', 'صيانة', 'حرف', 'خدمات'];
    let result = [...base];
    const extraWords = ['كيمياء', 'فيزياء', 'جيولوجيا', 'أدب', 'لسانيات', 'منطق', 'سياحة', 'نقل', 'ملاحة', 'فلك', 'أحياء', 'جينات', 'روبوتات', 'برمجة', 'تشفير', 'تداول', 'استثمار', 'بورصة', 'عقارات', 'تطوع', 'أبحاث', 'إدارة', 'جودة', 'ريادة', 'أتمتة', 'تواصل', 'هوية', 'علامات', 'دعم', 'مبيعات', 'جمارك', 'قضاء', 'شرطة', 'دفاع', 'صحة', 'وقاية', 'تمريض', 'إسعاف', 'تغذية', 'يوغا', 'لياقة', 'عطور', 'صابون', 'جلود', 'ورق', 'تعدين', 'بترول', 'غاز', 'فحم', 'محاجر', 'مسارح', 'متاحف', 'مكتبات', 'نشر', 'ألعاب', 'تطوير', 'هاردوير', 'سوفتوير', 'شبكات', 'سيرفرات', 'إنترنت', 'سمارت', 'دبلوماسية', 'أحزاب', 'انتخابات', 'نقابات', 'جمعيات', 'غرف', 'ضرائب', 'تدقيق', 'محاسبة', 'تمويل', 'بنوك', 'تأمين', 'مخاطر', 'كوارث', 'أزمات', 'تخطيط', 'رؤية', 'رسالة', 'هدف', 'شغف', 'إلهام', 'تأثير', 'قيادة', 'ثقة', 'هيبة', 'وقار', 'حكمة', 'توازن', 'سلام', 'هدوء', 'سكينة', 'بهجة', 'سعادة', 'فشل', 'نجاح', 'إنجاز', 'تكريم', 'جوائز', 'مسابقات', 'ألغاز', 'أحاجي', 'خدع', 'سحر', 'سيرك', 'دبلجة', 'تعليق', 'إلقاء', 'خطابة', 'تحفيز', 'كوتشينج', 'تدريب', 'أكاديميات', 'مدارس', 'جامعات', 'مراكز', 'مختبرات', 'صيدليات', 'عيادات', 'مشافي', 'قلاع', 'حصون', 'قصور', 'أكواخ', 'فيلات', 'منتجعات', 'شاليهات', 'يخوت', 'طائرات', 'قطارات', 'بواخر', 'شاحنات', 'دراجات', 'سيارات', 'محركات', 'تروس', 'أدوات', 'ورش', 'خطوط', 'إمداد', 'لوجستيات', 'تخزين', 'تجزئة', 'جملة', 'تصدير', 'استيراد', 'مناطق', 'حرة', 'مراسم', 'بروتوكول', 'اتيكيت', 'مراسم', 'أعياد', 'مناسبات', 'أفراح', 'أحزان', 'مشاعر', 'أفكار', 'قيم', 'مبادئ', 'أخلاق', 'سلوك', 'عادات', 'تقاليد', 'فولكلور', 'تراث', 'آثار', 'أساطير', 'خرافات', 'ظواهر', 'تخاطر', 'تأمل', 'تصوف', 'مذاهب', 'أديان', 'حضارات', 'لغات', 'مخطوطات', 'برديات', 'نقوش', 'كنوز', 'غوص', 'صيد', 'رماية', 'سباحة', 'فروسية', 'هجن', 'صقارة', 'مخيمات', 'تسلق', 'تزلج', 'مظلات', 'سيرك', 'أكروبات', 'رقص', 'باليه', 'أوبرا', 'موسيقى', 'جاز', 'بوب', 'روك', 'راب', 'شعر', 'نثر', 'قصة', 'رواية', 'نقد', 'تمثيل', 'إخراج', 'تصوير', 'مكياج', 'أزياء', 'ديكور', 'إضاءة', 'صوت', 'مونتاج', 'جرافيك', 'موشن', 'أنمي', 'كوميكس', 'كارتون', 'رسم', 'تلوين', 'نحت', 'خزف', 'نسيج', 'سجاد', 'تطريز', 'حلي', 'صياغة', 'نجارة', 'حدادة', 'سباكة', 'كهرباء', 'ميكانيك', 'بناء', 'تشييد', 'تخطيط', 'مدن', 'قرى', 'واحات', 'غابات', 'بحار', 'أنهار', 'جبال', 'وديان', 'صحارى', 'جزر', 'كواكب', 'نجوم', 'مجرات', 'ثقوب', 'سدم', 'كون', 'وجود', 'زمن', 'ماضي', 'حاضر', 'مستقبل', 'ذكاء', 'حكمة', 'منطق', 'واقع', 'خيال', 'أثر', 'تغيير', 'ابتكار', 'إبداع'];
    let i = 0;
    while (result.length < 1000) {
      const word = extraWords[i % extraWords.length];
      const suffix = Math.floor(result.length / extraWords.length);
      result.push(`${word}${suffix > 0 ? ' ' + suffix : ''}`);
      i++;
    }
    return result;
  }, []);

  // إضافة التمرير التلقائي للأعلى عند تغيير التبويب
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

  // محرك البحث المليوني المطور - Virtual Deterministic Rendering Engine
  const filteredSubjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    
    // 1. البحث بالرقم (ID Search) - يغطي حتى مليون نتيجة
    const idMatch = q.match(/^\d+$/);
    if (idMatch) {
        const idNum = parseInt(idMatch[0]);
        if (idNum > 0 && idNum <= 1000000) {
            // توزيع كل 1000 برومبت لقسم معين بالترتيب
            const catIndex = Math.floor((idNum - 1) / 1000);
            const catName = categoriesList[catIndex % categoriesList.length];
            return [getMillionthNeuralPrompt(idNum, catName)];
        }
    }

    // 2. البحث النصي والفرز حسب القسم (Category Filtering)
    if (selectedCategory !== 'الكل') {
        const catOffset = categoriesList.indexOf(selectedCategory);
        const results = [];
        // توليد أول 100 برومبت لهذا القسم المحدد بأسماء وصفية حقيقية
        for (let i = 1; i <= 100; i++) {
            const promptId = (catOffset * 1000) + i;
            const prompt = getMillionthNeuralPrompt(promptId, selectedCategory);
            // تحسين منطق البحث ليشمل الاسم الوصفي الجديد
            if (!q || prompt.ar.toLowerCase().includes(q) || prompt.en.toLowerCase().includes(q)) {
                results.push(prompt);
            }
        }
        return results;
    }

    // 3. عرض البذور الأساسية (Base Seeds) عند وضع "الكل" وعدم وجود بحث
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

  const BRANDING_TAG = `/* AUTHORIZED BY DT-PROMPT V1.5 - DICELION TECHNIQUE SYSTEM */`;

  const generate = () => {
    setIsGenerating(true);
    setGeneratedPrompt('');
    setIsEditable(false);
    setTimeout(() => {
      const { aspectRatio, mainText, language, forceEnglish, targetModel, mood, background, technical, useImageAsMainSource, onlyEnglishVisuals } = formData;
      const prompt = `${BRANDING_TAG}\n[DICELION_ENGINE_V1.5]\nTARGET_PLATFORM: ${targetModel}\nASPECT_RATIO: ${aspectRatio}\nCORE_SUBJECT: ${mainText}\nTONE_MOOD: ${mood}\nENVIRONMENT: ${background}\nTECHNICAL_STRUCTURE: ${technical}\nOUTPUT_LANGUAGE: ${forceEnglish ? 'EN' : language}\nIMG_ANALYSIS_REF: ${useImageAsMainSource ? 'ACTIVE' : 'NONE'}\nVISUAL_TEXT_MODE: ${onlyEnglishVisuals ? 'ENGLISH_ONLY' : 'AUTO'}\nENGINE_STATUS: PRO_VISUAL_OPTIMIZED`;
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
      finalPrompt = `${BRANDING_TAG}\n[PRO_IMAGE_ENGINE]\nSUBJECT: ${baseTextEn}\nSCENE: Detailed realistic environment, high-end professional context, vivid atmosphere\nCAMERA: Eye-level medium shot, 85mm lens, sharp focus\nLIGHTING: Dramatic cinematic lighting, soft rim light, realistic shadows\nSTYLE: Hyper-realistic photography, 8K, Octane Render\nMOOD: Authoritative, successful, prestigious`;
    } else if (mode === 'video') {
      finalPrompt = `${BRANDING_TAG}\n[PRO_VIDEO_ENGINE]\nSUBJECT: ${baseTextEn}\nSCENE: Dynamic environment, particle effects, atmospheric depth\nCAMERA: Cinematic slow-motion pan, smooth tracking\nMOTION: Fluid 60fps movement, cinematic storytelling pace\nQUALITY: Ultra HD 4K, pro color grading`;
    } else {
      finalPrompt = `${BRANDING_TAG}\n[PRO_TEXT_ENGINE]\nالموضوع: ${baseTextAr}\nالمهمة: كتابة منشور تسويقي إبداعي بأسلوب بشري جذاب.\nالنبرة: احترافية، مقنعة، وموثوقة.`;
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
      if (navigator.share) await navigator.share({ title: 'DT-Prompt Share', text });
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

  return (
    <div className={`min-h-screen flex flex-col pt-24 pb-12 px-4 sm:px-6 ${t.dir} select-none overflow-x-hidden w-full max-w-full text-rendering-legibility ${isSunlightMode ? 'sunlight-theme' : ''}`}>
      <style>{`
        .text-rendering-legibility { text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; }
        textarea, input { -webkit-user-select: text; user-select: text; word-break: break-word; overflow-wrap: break-word; }
        .tab-active { background: #38bdf8 !important; color: #fff !important; box-shadow: 0 4px 15px rgba(56,189,248,0.3) !important; }
        .nav-fixed-top { position: fixed; top: 0; left: 0; width: 100%; z-index: 500; padding: 12px 16px; background: #0f172a; border-bottom: 1px solid rgba(255,255,255,0.12); transition: background 0.3s; pointer-events: none; min-height: 110px !important; }
        .nav-fixed-top > * { pointer-events: auto; }
        .glass-card { background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(15px); border: 1px solid rgba(255,255,255,0.08); border-radius: 1.5rem; padding: 1.5rem; position: relative; overflow: hidden; }
        
        @keyframes shimmer-bg { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .magical-glow { animation: shimmer-bg 8s infinite linear; background: linear-gradient(90deg, transparent, rgba(56,189,248,0.05), transparent); background-size: 200% 100%; }
        .floating-icon { animation: float 3s ease-in-out infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        .glow-text-shimmer { background: linear-gradient(to right, #38bdf8, #fff, #38bdf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-size: 200% auto; animation: shimmer-bg 3s linear infinite; }
        
        @keyframes pulse-fast { 0%, 100% { opacity: 0.7; transform: scale(1); } 50% { opacity: 1; transform: scale(1.05); } }
        .animate-pulse-fast { animation: pulse-fast 0.8s cubic-bezier(0.4, 0, 0.6, 1) infinite; }

        .dt-logo-container { position: relative; width: 90px; height: 90px; border-radius: 24px; background: linear-gradient(135deg, #38bdf8, #1e40af); display: flex; align-items: center; justify-content: center; font-family: 'Cairo', sans-serif; font-weight: 900; color: white; font-size: 32px; box-shadow: 0 0 30px rgba(56, 189, 248, 0.4); border: 2px solid rgba(255,255,255,0.2); }
        .library-item-card { background: rgba(15, 23, 42, 0.4); border: 1px solid rgba(255,255,255,0.05); border-radius: 2rem; display: flex; flex-direction: column; height: 100%; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(20px); z-index: 3000; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .modality-btn { width: 100%; padding: 20px; border-radius: 1.5rem; display: flex; items-center; justify-content: space-between; font-weight: 900; transition: all 0.2s; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 12px; }

        .pdf-reading-mode { max-width: 900px; margin: 0 auto; line-height: 1.8; color: #cbd5e1; font-size: 0.95rem; text-align: justify; }
        .pdf-reading-mode h2 { font-size: 1.8rem; margin-bottom: 2rem; color: #fff; text-align: center; }
        .pdf-reading-mode p { margin-bottom: 1.5rem; font-weight: 500; opacity: 0.9; color: #e2e8f0; }
        
        .category-pill { padding: 8px 18px; border-radius: 20px; font-size: 11px; font-weight: 800; white-space: nowrap; transition: all 0.2s; border: 1px solid rgba(255,255,255,0.05); background: rgba(255,255,255,0.03); color: #94a3b8; }
        .category-pill.active { background: #38bdf8; color: #fff; border-color: #38bdf8; box-shadow: 0 5px 15px rgba(56,189,248,0.3); }
        .prompt-id-badge { background: rgba(56,189,248,0.15); color: #38bdf8; padding: 2px 8px; border-radius: 6px; font-size: 9px; font-weight: 900; border: 1px solid rgba(56,189,248,0.2); }

        /* DARK THEME EXPLICIT FIXES (Default State) */
        .select-element { background-color: #1e293b !important; color: #ffffff !important; border-color: rgba(255,255,255,0.1) !important; }
        .textarea-element { background-color: #1e293b !important; color: #ffffff !important; border-color: rgba(255,255,255,0.1) !important; }
        .textarea-element::placeholder { color: rgba(255,255,255,0.4) !important; }

        /* SUNLIGHT THEME (Refined for zero distortion) */
        .sunlight-theme { background: #fdfdfd !important; color: #000000 !important; }
        .sunlight-theme .nav-fixed-top { background: #ffffff !important; border-bottom: 1px solid #e2e8f0 !important; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important; }
        .sunlight-theme .glass-ui, .sunlight-theme .glass-card { background: #ffffff !important; border: 2px solid #cbd5e1 !important; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1) !important; }
        .sunlight-theme h1, .sunlight-theme h2, .sunlight-theme h3, .sunlight-theme h4, .sunlight-theme p, .sunlight-theme span { color: #000000 !important; }
        .sunlight-theme .library-item-card { background: #f8fafc !important; border: 2px solid #e2e8f0 !important; }
        .sunlight-theme .select-element { background-color: #ffffff !important; border-color: #94a3b8 !important; color: #000000 !important; border-width: 2px !important; }
        .sunlight-theme .textarea-element { background-color: #ffffff !important; border-color: #94a3b8 !important; color: #000000 !important; border-width: 2px !important; }
        .sunlight-theme .library-dropdown { background-color: #ffffff !important; border: 2px solid #94a3b8 !important; color: #000000 !important; }
        .sunlight-theme .tab-active { background: #0284c7 !important; color: #ffffff !important; }

        .library-dropdown { width: 100%; border-radius: 1.25rem; padding: 1.15rem 1.5rem; font-size: 0.9rem; font-weight: 800; appearance: none; outline: none; transition: all 0.3s; border: 1.5px solid rgba(255,255,255,0.1); background-color: #1e293b; color: #fff; cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2338bdf8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: left 1rem center; background-size: 1.25rem; }
        
        .no-scrollbar { overflow-x: auto !important; overflow-y: visible !important; display: flex !important; gap: 18px !important; padding: 10px !important; pointer-events: auto !important; -webkit-overflow-scrolling: touch !important; position: relative !important; z-index: 600 !important; }
        .NavIcon + div { opacity: 1 !important; visibility: visible !important; transform: none !important; bottom: -32px !important; pointer-events: none !important; }
        .NavIcon + div span { background: #0ea5e9 !important; font-weight: 900 !important; text-shadow: 0 1px 2px rgba(0,0,0,0.5) !important; border: 1px solid rgba(255,255,255,0.1) !important; }

        /* BUILD SAFETY LAYER */
        .page-transition { min-height: 80vh; display: block !important; visibility: visible !important; }
        .search-bar-container { position: sticky; top: 120px; z-index: 400; background: inherit; padding-top: 10px; padding-bottom: 10px; }

        /* NEON NAVIGATION UPGRADE */
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 4s linear infinite; }
        .nav-btn-pro { transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important; }
        .nav-btn-pro:active { transform: scale(0.85) !important; transition: all 0.1s !important; }
        .neon-glow-active { box-shadow: 0 0 35px rgba(56, 189, 248, 0.8) !important; }
      `}</style>

      {showAnnouncement && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-6 animate-in fade-in duration-500">
          <div className="glass-ui p-12 rounded-[4rem] border-sky-500/40 w-full max-w-lg text-center space-y-10 shadow-[0_0_100px_rgba(56,189,248,0.3)] relative overflow-hidden">
            <div className="w-24 h-24 bg-sky-500/20 rounded-full flex items-center justify-center mx-auto text-5xl border border-sky-500/40 animate-pulse shadow-[0_0_30px_rgba(56,189,248,0.4)]">🚀</div>
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter glow-text-shimmer">{t.announcement.title}</h2>
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
                <h3 className="text-xl font-black text-white mb-2 text-center">{t.modalityModal.title}</h3>
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

      <nav className="nav-fixed-top">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-1 w-full px-2">
             <NavIcon active={activeTab === 'create'} onClick={() => setActiveTab('create')} icon="الرئيسية" label={t.tabs.home} isSunlight={isSunlightMode} />
             <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-1 flex-1 justify-around relative z-[600]">
                <NavIcon active={activeTab === 'library'} onClick={() => setActiveTab('library')} icon={<div className="flex flex-col leading-none"><span>مليون</span><span className="text-[6px] mt-0.5 opacity-80 tracking-tighter">Prompt</span></div>} label={t.tabs.library} isSunlight={isSunlightMode} />
                <NavIcon active={activeTab === 'history'} onClick={() => setActiveTab('history')} icon={<div className="flex flex-col leading-none"><span>سجل</span><span className="text-[5px] mt-0.5 opacity-80">المحفوظات</span></div>} label={t.tabs.history} isSunlight={isSunlightMode} />
                <NavIcon active={isSunlightMode} onClick={() => setIsSunlightMode(!isSunlightMode)} icon="سطوع" label={t.tabs.sunlight} isSunlight={isSunlightMode} />
                <NavIcon active={showLangSelector} onClick={() => setShowLangSelector(true)} icon="لغة" label={t.tabs.appLang} isSunlight={isSunlightMode} />
                <NavIcon active={activeTab === 'guide'} onClick={() => setActiveTab('guide')} icon={<div className="flex flex-col leading-none"><span>دليل</span><span className="text-[5px] mt-0.5 opacity-80">المستخدم</span></div>} label={t.tabs.guide} isSunlight={isSunlightMode} />
                <NavIcon active={activeTab === 'about'} onClick={() => setActiveTab('about')} icon={<div className="flex flex-col leading-none"><span>عن</span><span className="text-[5px] mt-0.5 opacity-80">المطور</span></div>} label={t.tabs.about} isSunlight={isSunlightMode} />
             </div>
        </div>
      </nav>

      <header className="pt-4 pb-8 text-center px-4 w-full">
        <h1 className={`text-3xl sm:text-4xl font-black tracking-tighter ${isSunlightMode ? 'text-sky-700' : 'text-white neon-accent'}`}>{t.title}</h1>
        <p className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] mt-2 leading-relaxed ${isSunlightMode ? 'text-slate-500' : 'text-sky-400'}`}>{t.subtitle}</p>
      </header>

      <main className="flex-grow w-full max-w-4xl mx-auto space-y-8 px-0 sm:px-4">
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
                        {formData.onlyEnglishVisuals && <p className="text-[9px] text-slate-500 px-4 leading-tight">{t.labels.visualEnglishDesc}</p>}
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

        {activeTab === 'guide' && (
          <div className="page-transition pb-32 w-full pdf-reading-mode animate-in fade-in duration-500">
            <div className="text-center space-y-4 mb-16">
              <div className="floating-icon inline-block mb-2"><span className={`text-6xl ${isSunlightMode ? 'filter grayscale brightness-50' : 'drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]'}`}>🏛️</span></div>
              <h2 className={`font-black uppercase tracking-tighter ${isSunlightMode ? 'text-slate-900' : 'glow-text-shimmer'}`}>{t.guide.title}</h2>
              <p className={`text-[11px] font-black uppercase tracking-[0.4em] opacity-80 ${isSunlightMode ? 'text-sky-700' : 'text-sky-400'}`}>{t.guide.subtitle}</p>
            </div>
            
            <div className="glass-card space-y-16 magical-glow p-12">
              <div className={`relative p-8 rounded-[2rem] border backdrop-blur-xl ${isSunlightMode ? 'bg-slate-50 border-slate-200' : 'bg-sky-500/5 border-sky-500/10'}`}>
                <p className={`font-bold leading-relaxed text-center italic ${isSunlightMode ? 'text-slate-800' : 'text-white'}`}>"{t.guide.intro}"</p>
              </div>

              <section className="space-y-8">
                 <h3 className={`font-black uppercase tracking-widest border-b pb-2 ${isSunlightMode ? 'text-sky-800 border-sky-200' : 'text-sky-400 border-sky-500/20'}`}>{t.guide.infographicTitle}</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {t.guide.interfaceItems.map((item: any) => (
                      <div key={item.id} className={`p-6 rounded-3xl flex items-start gap-5 group border ${isSunlightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/40 border-white/5'}`}>
                         <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center font-black text-sm flex-shrink-0 shadow-lg">{item.id}</div>
                         <div className="flex-1 space-y-2">
                            <h4 className={`text-sm font-black uppercase ${isSunlightMode ? 'text-slate-900' : 'text-white'}`}>{item.title}</h4>
                            <p className={`text-[12px] font-bold leading-relaxed ${isSunlightMode ? 'text-slate-600' : 'text-slate-300'}`}>{item.desc}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </section>

              <section className={`p-8 rounded-[2rem] border space-y-6 ${isSunlightMode ? 'bg-slate-100 border-slate-200' : 'bg-slate-950/40 border-sky-500/20'}`}>
                 <h3 className={`flex items-center gap-3 font-black uppercase ${isSunlightMode ? 'text-slate-900' : 'text-white'}`}><span className="text-2xl">🔬</span> {t.guide.scientificAnalysisTitle}</h3>
                 <p className={`text-[14px] font-bold leading-loose whitespace-pre-line ${isSunlightMode ? 'text-slate-700' : 'text-slate-200'}`}>{t.guide.scientificAnalysisContent}</p>
              </section>

              <div className={`space-y-12 border-t pt-12 ${isSunlightMode ? 'border-slate-200' : 'border-white/5'}`}>
                {t.guide.sections.map((sec:any, i:number) => (
                  <div key={i} className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black border ${isSunlightMode ? 'bg-slate-200 text-sky-700 border-slate-300' : 'bg-slate-800 text-sky-400 border-sky-500/20'}`}>✓</span>
                      <h4 className={`text-xl font-black uppercase tracking-wide ${isSunlightMode ? 'text-slate-900' : 'text-white'}`}>{sec.title}</h4>
                    </div>
                    <p className={`text-[14px] leading-relaxed font-bold p-6 rounded-2xl border ${isSunlightMode ? 'bg-white border-slate-200 text-slate-700' : 'bg-black/20 border-white/5 text-slate-200'}`}>{sec.content}</p>
                  </div>
                ))}
              </div>

              <div className={`p-10 rounded-[4rem] space-y-8 shadow-2xl relative overflow-hidden border ${isSunlightMode ? 'bg-sky-50 border-sky-200' : 'bg-gradient-to-br from-sky-600/20 to-sky-900/40 border-sky-500/30'}`}>
                <h4 className="text-center uppercase relative z-10 flex items-center justify-center gap-4">
                   <span className="animate-spin-slow text-xl">✨</span>
                   <span className={`text-lg font-black ${isSunlightMode ? 'text-sky-800' : 'neon-snake-flow'}`}>{t.guide.steps.title}</span>
                   <span className="animate-spin-slow text-xl">✨</span>
                </h4>
                <div className="grid grid-cols-1 gap-4 relative z-10">
                  {[t.guide.steps.s1, t.guide.steps.s2, t.guide.steps.s3, t.guide.steps.s4].map((step: any, idx: number) => (
                    <div key={idx} className={`p-5 rounded-2xl border-l-4 ${isSunlightMode ? 'bg-white border-sky-500 shadow-sm' : 'bg-black/30 border-sky-500'}`}>
                      <p className={`text-[14px] font-black tracking-tight ${isSunlightMode ? 'text-slate-800' : 'text-white'}`}>{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="page-transition pb-32 w-full pdf-reading-mode animate-in fade-in duration-500">
             <div className="glass-card p-12 magical-glow shadow-2xl rounded-[4rem] border-sky-500/30">
               <div className="mx-auto flex flex-col items-center gap-8 relative z-10 mb-12">
                 <div className="dt-logo-container floating-icon">
                    DT<span className="absolute -bottom-2 -right-2 text-3xl filter drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]">🌌</span>
                 </div>
                 <div className="text-center space-y-3">
                   <h2 className={`font-black tracking-tighter uppercase leading-tight ${isSunlightMode ? 'text-slate-900' : 'text-white glow-text-shimmer'}`}>{t.about.title}</h2>
                   <div className={`inline-block py-1.5 px-5 border rounded-full ${isSunlightMode ? 'bg-sky-100 border-sky-300' : 'bg-sky-500/10 border-sky-500/30'}`}>
                     <p className={`text-[9px] font-black uppercase tracking-[0.4em] m-0 ${isSunlightMode ? 'text-sky-800' : 'text-sky-400'}`}>{t.about.subtitle}</p>
                   </div>
                 </div>
               </div>

               <div className="space-y-12 relative z-10">
                 <div className={`relative p-10 rounded-[3rem] border shadow-inner overflow-hidden ${isSunlightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/40 border-white/5'}`}>
                   <p className={`text-[15px] leading-relaxed font-bold text-center italic m-0 ${isSunlightMode ? 'text-slate-800' : 'text-white'}`}>"{t.about.promoText}"</p>
                 </div>
                 
                 <div className="flex justify-center">
                    <div className={`py-3 px-8 rounded-full border animate-bounce-slow ${isSunlightMode ? 'bg-sky-600 text-white border-sky-700' : 'bg-sky-500/20 border-sky-500/40 text-white'}`}>
                        <span className="text-[11px] font-black uppercase tracking-[0.2em]">{t.about.experience}</span>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-start">
                   {t.about.features.map((f:string, i:number) => (
                     <div key={i} className={`p-6 rounded-[2rem] flex items-start gap-4 border transition-all ${isSunlightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/30 border-white/5'}`}>
                       <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${isSunlightMode ? 'bg-sky-100 text-sky-700' : 'bg-sky-500/10 text-sky-400'}`}>✦</span>
                       <span className={`text-[13px] font-black leading-tight mt-1 ${isSunlightMode ? 'text-slate-800' : 'text-slate-100'}`}>{f}</span>
                     </div>
                   ))}
                 </div>

                 <div className={`pt-10 border-t space-y-8 ${isSunlightMode ? 'border-slate-200' : 'border-white/5'}`}>
                   <h4 className={`text-lg font-black uppercase tracking-[0.3em] text-center ${isSunlightMode ? 'text-slate-900' : 'text-white'}`}>{appLang === 'ar' ? 'قنوات التواصل الاستراتيجي' : 'Strategic Channels'}</h4>
                   <div className="flex flex-wrap justify-center gap-4">
                      <SocialBtn href="https://wa.me/212717118180" icon="📱" label={t.about.contacts.whatsapp} color={isSunlightMode ? "bg-emerald-600 text-white" : "bg-emerald-600/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-600"} />
                      <SocialBtn href="tel:+212521177000" icon="📞" label={t.about.contacts.call} color={isSunlightMode ? "bg-blue-600 text-white" : "bg-blue-600/10 text-blue-400 border-blue-500/30 hover:bg-blue-600"} />
                      <SocialBtn href="mailto:diceliontechnique@gmail.com" icon="✉️" label={t.about.contacts.email} color={isSunlightMode ? "bg-slate-800 text-white" : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/15"} />
                   </div>
                 </div>

                 <div className={`p-10 rounded-[4rem] border space-y-6 text-center mx-2 ${isSunlightMode ? 'bg-slate-100 border-slate-300' : 'bg-slate-950/80 border-sky-500/20'}`}>
                   <h5 className={`text-lg font-black uppercase tracking-widest ${isSunlightMode ? 'text-sky-900' : 'text-sky-400'}`}>{t.about.suggestion.title}</h5>
                   <p className={`text-[13px] font-bold leading-relaxed max-w-xl mx-auto ${isSunlightMode ? 'text-slate-600' : 'text-slate-200'}`}>{t.about.suggestion.desc}</p>
                   <a href="mailto:diceliontechnique@gmail.com?subject=Strategic Feedback: DT-Prompt" className={`inline-block py-3 px-10 rounded-full text-[10px] font-black border transition-all ${isSunlightMode ? 'bg-sky-600 text-white border-sky-700 hover:bg-sky-700' : 'bg-sky-500/10 text-white border-sky-500/30 hover:bg-sky-50'}`}> {appLang === 'ar' ? 'أرسل رؤيتك الفنية الآن 📬' : 'Submit your vision now 📬'} </a>
                 </div>

                 <div className="pt-8">
                  <button onClick={() => window.open('https://web.facebook.com/alktrwalwfa', '_blank')} className={`w-full py-6 rounded-[2.5rem] font-black uppercase text-sm shadow-xl active:scale-95 border tracking-widest transition-all ${isSunlightMode ? 'bg-blue-700 text-white border-blue-800 hover:bg-blue-800' : 'bg-gradient-to-r from-blue-800 to-blue-600 text-white border-white/10'}`}> {t.about.followBtn} </button>
                 </div>
               </div>
             </div>
          </div>
        )}

        {activeTab === 'library' && (
          <div className="page-transition space-y-6 pb-32 w-full animate-in fade-in duration-500">
            <div className="search-bar-container space-y-4">
                <div className={`glass-ui h-16 rounded-full flex items-center px-8 w-full border shadow-[0_0_20px_rgba(56,189,248,0.1)] ${isSunlightMode ? 'bg-white border-slate-300' : 'bg-slate-900/60 border-sky-500/20'}`}>
                <span className="mr-4 text-slate-500">🔍</span>
                <input type="text" placeholder={t.placeholders.search} className={`flex-1 bg-transparent py-2 text-sm font-bold outline-none w-full ${isSunlightMode ? 'text-black' : 'text-white'}`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                
                <div className="w-full">
                    <select 
                      value={selectedCategory} 
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="library-dropdown"
                    >
                        {categoriesList.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full pt-4">
              {filteredSubjects.length > 0 ? filteredSubjects.map((s) => (
                <div key={s.id} className="library-item-card p-8 group relative overflow-hidden">
                  <div className="absolute top-4 left-4"><span className="prompt-id-badge">#{s.id}</span></div>
                  <div className="flex-grow space-y-3 mt-4">
                    <span className={`text-[9px] font-black uppercase tracking-widest ${isSunlightMode ? 'text-sky-600' : 'text-sky-400/60'}`}>{s.cat}</span>
                    <p className={`text-[14px] font-black leading-tight transition-colors ${isSunlightMode ? 'text-black' : 'text-white group-hover:text-sky-400'}`}>{appLang === 'ar' ? s.ar : s.en}</p>
                  </div>
                  <div className="mt-8 flex flex-col gap-2">
                    <button onClick={() => handleQuickCopyTrigger(s)} className={`w-full py-3 text-[11px] font-black border rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 ${isSunlightMode ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-white/5 text-white border-white/5 hover:bg-sky-500/20'}`}><span>📋</span> {t.quickCopy}</button>
                    <button onClick={() => handleEditTrigger(s)} className={`w-full py-3 rounded-2xl text-[11px] font-black transition-all active:scale-95 ${isSunlightMode ? 'bg-sky-600 text-white shadow-sm' : 'bg-white text-slate-950 hover:bg-sky-500 hover:text-white'}`}>{t.editInStudio}</button>
                  </div>
                </div>
              )) : (
                <div className="col-span-full text-center py-20 opacity-50 font-bold">No results found</div>
              )}
            </div>
          </div>
        )}
      </main>

      {showLangSelector && (
        <div className="fixed inset-0 z-[3000] flex items-end bg-black/70 backdrop-blur-md" onClick={() => setShowLangSelector(false)}>
           <div className={`w-full rounded-t-[3rem] p-8 space-y-4 shadow-[0_-20px_60px_rgba(56,189,248,0.2)] animate-in slide-in-from-bottom duration-300 ${isSunlightMode ? 'bg-white' : 'bg-slate-900/95 border-t border-sky-500/30'}`} onClick={e => e.stopPropagation()}>
              <h3 className={`text-lg font-black text-center mb-6 uppercase tracking-widest ${isSunlightMode ? 'text-slate-900' : 'text-white glow-text-shimmer'}`}>Select Language</h3>
              <div className="grid grid-cols-1 gap-2 max-h-[60vh] overflow-y-auto no-scrollbar">
                {SUPPORTED_APP_LANGS.map(l => (
                  <button key={l.id} onClick={() => { setAppLang(l.id); setShowLangSelector(false); }} className={`w-full p-4.5 rounded-2xl flex items-center justify-between font-bold border transition-all ${appLang === l.id ? 'bg-sky-500/20 border-sky-500/40 text-sky-400' : isSunlightMode ? 'text-slate-600 border-slate-100 hover:bg-slate-50' : 'text-slate-400 border-transparent hover:bg-white/5'}`}>
                    <span className="text-xl">{l.flag}</span><span>{l.name}</span>
                  </button>
                ))}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const SocialBtn = ({ href, icon, label, color, target = "_blank" }: any) => (
  <a href={href} target={target} className={`flex-1 min-w-[200px] px-6 py-4 rounded-3xl font-black text-[11px] uppercase flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-lg border ${color} group`}>
    <span className="text-xl group-hover:rotate-12 transition-transform">{icon}</span>{label}
  </a>
);

const ActionBtn = ({ icon, label, onClick, primary, active }: any) => (
  <button onClick={onClick} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-[9px] uppercase transition-all ActionBtn ${primary ? 'bg-sky-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.3)] primary' : active ? 'bg-sky-500/20 text-sky-400 border border-sky-500/20' : 'bg-white/5 text-slate-300 border border-white/5'}`}>
    <span className="text-xs">{icon}</span><span className="hidden sm:inline">{label}</span>
  </button>
);

const NavIcon = ({ active, icon, onClick, isSunlight, label }: any) => (
  <div className="relative group flex flex-col items-center flex-shrink-0">
    <button 
      onClick={(e) => { e.stopPropagation(); onClick(); }} 
      className={`w-14 h-14 flex items-center justify-center rounded-full transition-all duration-700 relative overflow-hidden cursor-pointer NavIcon nav-btn-pro
        ${active 
          ? isSunlight 
            ? 'bg-sky-600 text-white scale-110 shadow-[0_0_35px_rgba(2,132,199,0.5)] border-2 border-white/80 active'
            : 'bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white scale-110 shadow-[0_0_35px_rgba(56,189,248,0.9)] border-2 border-sky-400 active' 
          : isSunlight 
            ? 'bg-slate-100 text-slate-800 hover:bg-slate-200 hover:scale-110 shadow-lg border border-slate-300' 
            : 'bg-white/5 text-white hover:bg-white/10 hover:scale-110 shadow-xl border border-white/5'}`}
    >
      {/* rotating neon border layer */}
      <div className={`absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${active ? 'opacity-100' : ''}`}>
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(#38bdf8,#1e40af,transparent,transparent,#38bdf8)] animate-spin-slow"></div>
      </div>
      
      {/* Inner mask to keep solid background and fix the "blackness" issue */}
      <div className={`absolute inset-[2.5px] rounded-full z-[1] transition-all duration-500 ${active ? (isSunlight ? 'bg-sky-600' : 'bg-gradient-to-tr from-[#1e293b] to-[#334155]') : isSunlight ? 'bg-slate-100' : 'bg-[#1e293b]'}`}></div>

      <span className={`relative z-10 ${React.isValidElement(icon) ? 'w-full h-full flex items-center justify-center' : typeof icon === 'string' && icon.length > 1 ? 'text-[9px] leading-tight font-black uppercase text-center px-1' : 'text-3xl'} transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${active ? 'text-white' : isSunlight ? 'text-slate-800' : 'text-slate-200'} drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]`}>
        {icon}
      </span>
      
      {/* Glint effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out z-20 pointer-events-none"></div>
    </button>
    
    <div className="absolute -bottom-9 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none whitespace-nowrap z-[2000] scale-75 group-hover:scale-100">
      <span className={`text-[10px] font-black uppercase tracking-tighter px-3 py-1 rounded-full bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-[0_5px_15px_rgba(0,0,0,0.3)] border border-white/10`}>
        {label}
      </span>
    </div>
  </div>
);

const CheckboxItem = ({ label, checked, onChange }: any) => (
  <div className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${checked ? 'border-green-500/30 bg-green-500/5' : 'border-white/5 bg-slate-900/40'}`} onClick={onChange}>
    <span className="text-[11px] font-black text-slate-200">{label}</span>
    <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 relative overflow-hidden ${checked ? 'scale-110 shadow-[0_0_25px_rgba(34,197,94,0.6)]' : 'border-2 border-white/10 bg-white/5'}`}>
      {checked ? (<div className="w-full h-full bg-[#10b981] flex items-center justify-center border-[3px] border-[#065f46] shadow-inner"><span className="text-white text-2xl font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] relative z-10 select-none">✓</span></div>) : null}
    </div>
  </div>
);

const SelectBox = ({ label, name, options, value, onChange, appLang }: any) => (
  <div className="space-y-2 w-full px-1">
    <label className="text-[10px] font-black text-slate-500 uppercase px-1 tracking-widest">{label}</label>
    <div className="relative">
      <select name={name} value={value} onChange={onChange} className="w-full border rounded-xl px-4 py-4 text-[12.5px] font-bold outline-none appearance-none focus:border-sky-500/50 transition-all select-element">
        {options.map((o: string) => <option key={o} value={o}>{getLocalizedOption(o, appLang)}</option>)}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-30 text-[10px]">▼</div>
    </div>
  </div>
);

const InputArea = ({ label, value, onChange, placeholder }: any) => (
  <div className="space-y-2 w-full px-1">
    <label className="text-[10px] font-black text-slate-500 uppercase px-1 tracking-widest">{label}</label>
    <textarea value={value} onChange={onChange} placeholder={placeholder} className="w-full border rounded-[2.5rem] px-8 py-8 text-[13.5px] font-bold outline-none min-h-[160px] focus:border-sky-500/50 transition-all textarea-element" />
  </div>
);

const getT = (lang: string) => UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.ar;

export default App;
