export type Lang = 'en' | 'ku' | 'ar'

export const LANG_LABELS: Record<Lang, string> = { en: 'EN', ku: 'کوردی', ar: 'العربية' }
export const RTL_LANGS: Lang[] = ['ku', 'ar']

export const DEPARTMENT_URL = 'https://nawroz.edu.krd/departments/department-of-computer-science'
export const UNIVERSITY_URL = 'https://nawroz.edu.krd/'
export const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Nawroz+University'
export const PHONE = '+964 750 567 4944'
export const PHONE_HREF = 'tel:+9647505674944'
/* official address, as published on nawroz.edu.krd */
export const ADDRESS = 'Tanahi Quarter, Duhok – Kurdistan Region of Iraq · P.O. Box 77'

/* World names stay in English in every language (department decision). */
export const WORLD_NAMES = [
  'Artificial Intelligence',
  'Game Design',
  'Robotics',
  'Web Development',
  'Mobile Apps',
  'Desktop Software',
  'Network & Data Security',
]

interface WorldCopy { local?: string; text: string }
interface ReasonCopy { t: string; d: string }
interface FaqCopy { q: string; a: string }

export interface SiteCopy {
  brand: { name: string; sub: string }
  nav: { worlds: string; byte: string; why: string; faq: string; menu: string }
  hero: {
    badge: string
    wordmark: string
    title1: string
    title2: string
    paragraph: string
    ctaEnter: string
    ctaWhy: string
    stats: [string, string][]
  }
  worlds: { kicker: string; title: string; subtitle: string; items: WorldCopy[] }
  byte: { kicker: string; title: string; subtitle: string }
  why: { kicker: string; title: string; reasons: ReasonCopy[] }
  banner: { title: string; text: string }
  faq: { kicker: string; title: string; items: FaqCopy[] }
  join: {
    kicker: string; title1: string; title2: string; paragraph: string
    buttonKicker: string; buttonTitle: string; linkLabel: string
    facts: string[]
  }
  footer: {
    dept: string; sub: string; motto: string
    addressLabel: string; phoneLabel: string; websiteLabel: string
    rights: string
  }
}

export const COPY: Record<Lang, SiteCopy> = {
  /* ─────────────────────────── ENGLISH ─────────────────────────── */
  en: {
    brand: { name: 'Computer Science', sub: 'Nawroz University' },
    nav: { worlds: 'Worlds', byte: 'Byte', why: 'Why CS', faq: 'FAQ', menu: 'Menu' },
    hero: {
      badge: 'Welcome to Your Digital Future.',
      wordmark: 'Computer Science',
      title1: 'Build your own world',
      title2: 'in the digital universe.',
      paragraph: 'You use apps, play games, and surf the web every day. But what if you could create them yourself? Here, you don’t just use technology — you build it. From smart AI to amazing games and robots, your journey starts now.',
      ctaEnter: 'Step into the world',
      ctaWhy: 'Why Computer Science?',
      stats: [['7', 'Amazing worlds to explore'], ['4', 'Years to master them'], ['∞', 'Endless career opportunities']],
    },
    worlds: {
      kicker: '// What you will learn',
      title: 'Seven worlds. You get to explore them all.',
      subtitle: 'You don’t have to choose just one path. Every Computer Science student learns the secrets behind all of them.',
      items: [
        { text: 'Teach computers to think and learn. Be part of the future of tech.' },
        { text: 'Don’t just play games — build them. Create characters and worlds for millions to enjoy.' },
        { text: 'Bring machines to life. Program robots that move, act, and help people.' },
        { text: 'Build the internet. Create websites that anyone, anywhere can use.' },
        { text: 'Have a great app idea? Learn how to build it and put it in everyone’s pocket.' },
        { text: 'Create powerful computer programs that businesses rely on every day to get real work done.' },
        { text: 'Become a digital defender. Learn how hackers think so you can protect important data.' },
      ],
    },
    byte: {
      kicker: '// Meet the Mascot',
      title: 'This is Byte! 🐭',
      subtitle: 'Our little campus mouse who loves tech just as much as we do. Go ahead, play with him!',
    },
    why: {
      kicker: '// Why Computer Science',
      title: 'Four reasons to choose Computer Science',
      reasons: [
        { t: 'You create things', d: 'Here you build new things: apps, games, and programs. The future is made by people like you.' },
        { t: 'Work from anywhere', d: 'All you need is a laptop. You can study and work from home, or from anywhere in the world.' },
        { t: 'Every field needs you', d: 'Almost every company today runs on computers and software. Computer Science opens the door to all of them.' },
        { t: 'Build from day one', d: 'From your very first semester, you write your own programs and see them come to life.' },
      ],
    },
    banner: {
      title: 'Your university has no walls. Your career has no borders.',
      text: 'Build from Duhok, from your home, or from the other side of the world. In our world, where you are doesn’t dictate what you can create.',
    },
    faq: {
      kicker: '// Before You Decide',
      title: 'Questions & Answers',
      items: [
        { q: 'Do I need programming experience to start?', a: 'Not at all! Our program is designed for everyone, including complete beginners. We start from the fundamentals and guide you step by step to build your skills.' },
        { q: 'What languages are classes taught in?', a: 'Classes are taught in Kurdish and English. Programming is naturally an English-dependent field, and we will help you build your English proficiency alongside your coding skills — a major advantage for your future career.' },
        { q: 'How is this different from other fields?', a: 'Computer Science empowers you to create solutions from scratch. It is a unique blend of logic, creativity, and problem-solving, offering you the freedom to work globally and shape the digital future.' },
        { q: 'Who teaches the classes?', a: 'You will be guided by dedicated academics and experienced tech professionals who are passionate about mentoring the next generation of innovators and developers.' },
        { q: 'What can I really build here?', a: 'The possibilities are endless. You will learn to build mobile apps, complex websites, software systems, and even explore artificial intelligence to solve real-world problems.' },
      ],
    },
    join: {
      kicker: '// Come in, say hello',
      title1: 'We are building your future together,',
      title2: 'Continuously.',
      paragraph: 'Behind this desk is a family that codes, creates, and dreams together. Bring your curiosity — we will provide the tools, the mentors, and a community where you truly belong. Your Computer Science journey begins the moment you say hello.',
      buttonKicker: 'Open nawroz.edu.krd in a new tab ↗',
      buttonTitle: 'Visit the official Computer Science Department website',
      linkLabel: 'Or open the department page directly ↗',
      facts: ['College of Science', '4-Year Bachelor’s Degree', 'Build from anywhere', 'No prior experience required'],
    },
    footer: {
      dept: 'Computer Science Department',
      sub: 'Nawroz University · College of Science',
      motto: 'Stop just playing the game. Start building it.',
      addressLabel: 'Address',
      phoneLabel: 'Phone',
      websiteLabel: 'University website',
      rights: '© 2026 Department of Computer Science, Nawroz University. All rights reserved.',
    },
  },

  /* ─────────────────────────── KURDISH (Badini) ─────────────────────────── */
  ku: {
    brand: { name: 'زانستێن کۆمپیوتەری', sub: 'زانکۆیا نەورۆز' },
    nav: { worlds: 'جیهان', byte: 'بایت', why: 'بۆچی زانستێن کۆمپیوتەری', faq: 'پرسیار و بەرسڤ', menu: 'لیست' },
    hero: {
      badge: 'ب خێرهاتی بۆ داهاتوویێ تە یێ دیجیتاڵی.',
      wordmark: 'زانستێن کۆمپیوتەری',
      title1: 'جیهانا خۆ ئاڤا بکە',
      title2: 'د گەردوونا دیجیتاڵی دا.',
      paragraph: 'تو هەر ڕۆژ ئەپلیکەیشنان بکار دئینی، یاریان دکەی و دچیتە د ناڤ ئینتەرنێتێ دا. لێ چ دبی ئەگەر تو ب خۆ وان دروست بکەی؟ ل ڤێرە، تو ب تنێ تەکنۆلۆژیایێ بکار نائینی — بەلکو تو وێ ئاڤا دکەی. ژ ژیرییا دەستکرد تا یاری و ڕۆبۆتێن سەرنجڕاکێش، گەشتا تە ل ڤێرە دەست پێ دکەت.',
      ctaEnter: 'بچە ناڤ جیهانێ',
      ctaWhy: 'بۆچی زانستێن کۆمپیوتەری؟',
      stats: [['٧', 'جیهانێن مەزن بۆ دیتنێ'], ['٤', 'ساڵ بۆ فێربوونێ'], ['∞', 'دەرفەتێن کاری یێن بێ سنور']],
    },
    worlds: {
      kicker: '// ئەو تشتێ تو دێ فێر بی',
      title: 'حەفت جیهان. تو دێ د هەمیان دا گەڕیی.',
      subtitle: 'پێدڤی ناکەت بتنێ ئێک ڕێک هەلبژێری. هەر قوتابییەکێ زانستێن کۆمپیوتەری دێ فێری نهێنیێن هەمیان بیت.',
      items: [
        { local: 'ژیرییا دەستکرد', text: 'کۆمپیوتەری فێر بکە کا چاوا هزر بکەت و فێر ببیت. ببە پارچەیەک ژ داهاتوویێ تەکنۆلۆژیایێ.' },
        { local: 'دیزاینکرنا یاریان', text: 'ب تنێ یاریێ نەکە — بەلکو یاریان دروست بکە. کارەکتەر و جیهانان ئاڤا بکە کو ملیۆنان کەس حەز ژێ بکەن.' },
        { local: 'ڕۆبۆتیک', text: 'گیانی بکە ب بەر ئامیران دا. ڕۆبۆتان پرۆگرام بکە بۆ وێ چەندێ بکارن ب لڤن و هاریکاریا مرۆڤان بکەن.' },
        { local: 'گەشەپێدانا وێبسایتان', text: 'ئینتەرنێتێ ئاڤا بکە. ماڵپەڕان دروست بکە کو هەر کەسەک ل هەر جهەکێ بشێت بکاربینیت.' },
        { local: 'ئەپلیکەیشنێن مۆبایلێ', text: 'بیرۆکەیەکا باش بۆ ئەپەکێ تە هەیە؟ فێر ببە کا چاوا دروست بکەی و بگەهینیە دەستێ هەمی کەسان.' },
        { local: 'سۆفتوێرێن کۆمپیوتەری', text: 'پرۆگرامێن ب هێز یێن کۆمپیوتەری دروست بکە کو کۆمپانی هەر ڕۆژ بۆ کارێن خۆ پشت پێ دبەستن.' },
        { local: 'ئاساییشا داتا و تۆڕان', text: 'ببە پارێزەرێ دیجیتاڵی. فێر ببە کا هاککەر چاوا هزر دکەن بۆ وێ چەندێ داتایێن گرنگ بپارێزی.' },
      ],
    },
    byte: {
      kicker: '// ناساندنا بەشی',
      title: 'ئەڤە بایتە (Byte)! 🐭',
      subtitle: 'مشکێ مە یێ بچووک یێ کۆلیژێ کو ڕێک وەکی مە حەز ژ تەکنۆلۆژیایێ دکەت. وەرە، کێمەکێ یاریێ پێ بکە!',
    },
    why: {
      kicker: '// بۆچی زانستێن کۆمپیوتەری',
      title: 'چار هۆکار بۆ هەلبژارتنا زانستێن کۆمپیوتەری',
      reasons: [
        { t: 'تو تشتان دروست دکەی', d: 'ل ڤێرە تو تشتێن نوی ئاڤا دکەی: ئەپلیکەیشن، یاری و پرۆگرام. داهاتوو ب دەستێن کەسێن وەکی تە دهێتە دروستکرن.' },
        { t: 'ژ هەر جهەکێ کار بکە', d: 'ب تنێ لاپتۆپەک پێدڤییە. تو دشێی ژ ماڵا خۆ یان ژ هەر جهەکێ جیهانێ بخوینی و کار بکەی.' },
        { t: 'هەمی بوار پێدڤی ب تە نە', d: 'نێزیکی هەمی کۆمپانی ئەڤرۆ ب کۆمپیوتەر و سۆفتوێران کار دکەن. زانستێن کۆمپیوتەری دەرگەهێ هەمیان ل بەر تە ڤەدکەت.' },
        { t: 'ژ ڕۆژا ئێکێ دەست پێ دکەی', d: 'هەر ژ سیمەستەرا ئێکێ، تو دێ پرۆگرامێن خۆ نڤیسی و ببینی کا چاوا کار دکەن.' },
      ],
    },
    banner: {
      title: 'زانکۆیا تە ب دیواران نەهاتیە سنوردارکرن. پیشەیێ تە چو سنور نینن.',
      text: 'ژ دهۆکێ، ژ ماڵا خۆ، یان ژ هەر جهەکێ دی یێ جیهانێ دەست پێ بکە. ل جیهانا مە، ئەو جهێ تو لێ دژی، نابیتە ڕێگر ل هەمبەر وێ چەندێ کا تو دشێی چ دروست بکەی.',
    },
    faq: {
      kicker: '// بەری بڕیارێ بدەی',
      title: 'پرسیار و بەرسڤ',
      items: [
        { q: 'ئایا بۆ دەستپێکرنێ پێدڤی ب ئەزموونا پرۆگرامکرنێ هەیە؟', a: 'نەخێر ب چو ڕەنگان! پرۆگرامێ مە ب شێوەیەکێ هاتیە داڕشتن کو بۆ کەسێن دەستپێکەر ژی گونجای بیت. ئەم دێ ژ بنەمایان دەست پێ کەین و قۆناغ ب قۆناغ هاریکاریا تە کەین بۆ پێشخستنا شیانێن تە.' },
        { q: 'وانە ب چ زمانەکی دهێنە گوتن؟', a: 'وانە ب زمانێن کوردی و ئینگلیزی دهێنە گوتن. پرۆگرامکرن ب سروشتێ خۆ پیشەیەکە کو پێدڤی ب زمانێ ئینگلیزییە، و ئەم دێ پێکڤە هاریکاریا تە کەین بۆ ئاڤاکرنا ڤێ شیانێ ل دەڤ تە — کو ئەڤە ژی ب خۆ دەستکەفتەکا مەزنە بۆ کارێ تە یێ پاشەڕۆژێ.' },
        { q: 'ئەڤ بەشە چاوا ژ بوارێن دی جوداترە؟', a: 'زانستێن کۆمپیوتەری شیانێ ددەتە تە کو چارەسەریان ژ سفرێ دروست بکەی. ئەڤ بوارە تێکەلەیەکە ژ لۆژیک و داهێنانێ، و دەرفەتێ ددەتە تە کو ل سەر ئاستێ جیهانێ کار بکەی و داهاتوویێ دیجیتاڵی ئاڤا بکەی.' },
        { q: 'کێ وانەیان دبێژیت؟', a: 'دێ ژ لایێ مامۆستایێن ئەکادیمی و شارەزایێن بوارێ تەکنۆلۆژیایێ ڤە هێیە ڕێنماییکرن، کو ب حەزەکا مەزنڤە کار دکەن بۆ پێگەهاندنا نەوەیێ نوی یێ داهێنەر و گەشەپێدەران.' },
        { q: 'ل ڤێرە ب ڕاستی دشێم چ دروست بکەم؟', a: 'بێ سنورە. تو دێ فێر بی کا چاوا ئەپلیکەیشنێن مۆبایلێ، وێبسایتێن پێشکەفتی، سیستەمێن سۆفتوێرێ، و تەنانەت ژیرییا دەستکرد دروست بکەی بۆ چارەسەرکرنا کێشەیێن جیهانا ڕاستەقینە.' },
      ],
    },
    join: {
      kicker: '// وەرە، سلاڤەکێ بکە',
      title1: 'ئەم دێ پاشەڕۆژا تە پێکڤە ئاڤا کەین،',
      title2: 'بەردەوام...',
      paragraph: 'ل پشت ڤێ مێزێ، خێزانەکا مەزن هەیە کو کۆدان دنڤیسیت، داهێنانان دکەت و پێکڤە خەونان دبینیت. مەرەق و حەزێن خۆ دگەل خۆ بینە — ئەم ژی دێ ئامراز، مامۆستا و ژینگەهەکا گونجای بۆ تە دابین کەین کو ب ڕاستی هەست بکەی تو پارچەیەکی ژ ڤێ خێزانێ. جیهانا تە یا زانستێن کۆمپیوتەری هەر ژ ئێکەم سلاڤا تە دەست پێ دکەت.',
      buttonKicker: 'ماڵپەڕێ nawroz.edu.krd د پەنجەرەیەکا نوی دا ڤەدە ↗',
      buttonTitle: 'سەردانا ماڵپەڕێ فەرمی یێ پشکا زانستێن کۆمپیوتەری بکە',
      linkLabel: 'یان ڕاستەوخۆ پەڕەیێ بەشی ڤەدە ↗',
      facts: ['کۆلیژا زانستێ', 'بڕوانامەیا بەکالۆریۆس بۆ ماوێ ٤ ساڵان', 'ژ هەر جهەکێ بی دەست پێ بکە', 'پێدڤی ب چو ئەزموونێن پێشوەخت نینە'],
    },
    footer: {
      dept: 'پشکا زانستێن کۆمپیوتەری',
      sub: 'زانکۆیا نەورۆز (NAWROZ UNIVERSITY) · کۆلیژا زانستێ',
      motto: 'ب تنێ یاریێ نەکە. دەست ب دروستکرنا وێ بکە.',
      addressLabel: 'ناڤنیشان',
      phoneLabel: 'تەلەفۆن',
      websiteLabel: 'ماڵپەڕێ زانکۆیێ',
      rights: '© ٢٠٢٦ پشکا زانستێن کۆمپیوتەری، زانکۆیا نەورۆز. هەمی ماف پاراستینە.',
    },
  },

  /* ─────────────────────────── ARABIC ─────────────────────────── */
  ar: {
    brand: { name: 'علوم الحاسوب', sub: 'جامعة نوروز' },
    nav: { worlds: 'العوالم', byte: 'بايت', why: 'لماذا علوم الحاسوب', faq: 'أسئلة وأجوبة', menu: 'القائمة' },
    hero: {
      badge: 'مرحباً بك في مستقبلك الرقمي.',
      wordmark: 'علوم الحاسوب',
      title1: 'ابنِ عالمك الخاص',
      title2: 'في الكون الرقمي.',
      paragraph: 'أنت تستخدم التطبيقات وتلعب الألعاب وتتصفح الإنترنت كل يوم. ولكن ماذا لو تمكنت من صناعتها بنفسك؟ هنا، أنت لا تستهلك التكنولوجيا فقط — بل تبنيها. من الذكاء الاصطناعي إلى الألعاب والروبوتات المذهلة، رحلتك تبدأ الآن.',
      ctaEnter: 'ادخل إلى العالم',
      ctaWhy: 'لماذا علوم الحاسوب؟',
      stats: [['7', 'عوالم رائعة لتستكشفها'], ['4', 'سنوات لتتعلمها'], ['∞', 'فرص عمل لا حصر لها']],
    },
    worlds: {
      kicker: '// ما الذي ستتعلمه',
      title: 'سبعة عوالم. ستستكشفها جميعاً.',
      subtitle: 'لست مضطراً لاختيار مسار واحد فقط. كل طالب في علوم الحاسوب سيتعلم الأسرار وراءها جميعاً.',
      items: [
        { local: 'الذكاء الاصطناعي', text: 'علّم أجهزة الكمبيوتر كيف تفكر وتتعلم. كن جزءاً من مستقبل التكنولوجيا.' },
        { local: 'تصميم الألعاب', text: 'لا تكتفِ بلعب الألعاب — بل اصنعها. صمم شخصيات وعوالم يستمتع بها الملايين.' },
        { local: 'الروبوتات', text: 'ابعث الحياة في الآلات. برمج روبوتات تتحرك وتساعد الناس في حياتهم.' },
        { local: 'تطوير الويب', text: 'ابنِ الإنترنت. صمم مواقع إلكترونية يمكن لأي شخص في العالم استخدامها بسهولة.' },
        { local: 'تطبيقات الهواتف', text: 'هل لديك فكرة رائعة لتطبيق؟ تعلم كيف تبنيه وتجعله في متناول الجميع.' },
        { local: 'برمجيات الكمبيوتر', text: 'اصنع برامج قوية تعتمد عليها الشركات والمؤسسات يومياً لإنجاز أعمالها.' },
        { local: 'أمن الشبكات والبيانات', text: 'كن حارساً رقمياً. تعلم كيف يفكر المخترقون (الهاكرز) لتتمكن من حماية البيانات المهمة.' },
      ],
    },
    byte: {
      kicker: '// تعرف على القسم',
      title: 'هذا بايت (Byte)! 🐭',
      subtitle: 'فأر جامعتنا الصغير الذي يعشق التكنولوجيا مثلنا تماماً. تفضل، العب معه قليلاً!',
    },
    why: {
      kicker: '// لماذا علوم الحاسوب',
      title: 'أربعة أسباب لاختيار علوم الحاسوب',
      reasons: [
        { t: 'أنت تصنع الأشياء', d: 'هنا تبني أشياء جديدة: تطبيقات وألعاباً وبرامج. المستقبل يصنعه أشخاص مثلك.' },
        { t: 'اعمل من أي مكان', d: 'كل ما تحتاجه هو حاسوب محمول. يمكنك الدراسة والعمل من منزلك، أو من أي مكان في العالم.' },
        { t: 'كل المجالات تحتاجك', d: 'تعمل معظم الشركات اليوم بالحواسيب والبرمجيات. علوم الحاسوب تفتح لك الباب إليها جميعاً.' },
        { t: 'ابدأ البناء من اليوم الأول', d: 'منذ فصلك الدراسي الأول، ستكتب برامجك بنفسك وتراها تعمل أمامك.' },
      ],
    },
    banner: {
      title: 'جامعتك لا تحدها جدران. ومسيرتك المهنية بلا حدود.',
      text: 'ابدأ من دهوك، من منزلك، أو من أي مكان آخر في العالم. في عالمنا، المكان الذي تتواجد فيه لا يحدد ما يمكنك بناؤه.',
    },
    faq: {
      kicker: '// قبل أن تقرر',
      title: 'أسئلة وأجوبة',
      items: [
        { q: 'هل أحتاج إلى خبرة سابقة في البرمجة للبدء؟', a: 'لا على الإطلاق! تم تصميم برنامجنا ليناسب الجميع، بما في ذلك المبتدئين تماماً. نحن نبدأ معك من الأساسيات ونرشدك خطوة بخطوة لتطوير مهاراتك.' },
        { q: 'بأي لغة تُدرس المحاضرات؟', a: 'تُدرس المحاضرات باللغتين الكردية والإنجليزية. بطبيعتها، البرمجة مجال يعتمد على اللغة الإنجليزية، وسنعمل معاً على مساعدتك في بناء مهارتك فيها إلى جانب مهاراتك البرمجية — وهذا في حد ذاته ميزة كبرى لمستقبلك المهني.' },
        { q: 'كيف يختلف هذا التخصص عن المجالات الأخرى؟', a: 'علوم الحاسوب تمنحك القدرة على ابتكار الحلول من الصفر. إنه مزيج فريد بين المنطق، الإبداع، وحل المشكلات، مما يوفر لك حرية العمل على مستوى عالمي والمساهمة في صياغة المستقبل الرقمي.' },
        { q: 'من هم الأساتذة الذين يدرسون في هذا القسم؟', a: 'سيقوم بتوجيهك نخبة من الأكاديميين والمحترفين ذوي الخبرة في مجال التكنولوجيا، الذين يكرسون جهودهم بشغف لإعداد الجيل القادم من المبدعين والمطورين.' },
        { q: 'ما الذي يمكنني حقاً بناؤه هنا؟', a: 'الاحتمالات لا حصر لها. ستتعلم كيفية برمجة تطبيقات الهواتف، مواقع الويب المتقدمة، أنظمة البرمجيات، وحتى استكشاف الذكاء الاصطناعي لحل مشاكل واقعية.' },
      ],
    },
    join: {
      kicker: '// تفضل، وألقِ التحية',
      title1: 'سنبني مستقبلك معاً،',
      title2: 'بخطوات مستمرة.',
      paragraph: 'خلف هذا المكتب، توجد عائلة تكتب الأكواد، تبتكر، وتحلم معاً. أحضر فضولك وشغفك معك — ونحن سنوفر لك الأدوات، والأساتذة، والمجتمع الذي ستشعر فيه حقاً بالانتماء. رحلتك في عالم علوم الحاسوب تبدأ من أول إلقاء تحية.',
      buttonKicker: 'افتح موقع nawroz.edu.krd في نافذة جديدة ↗',
      buttonTitle: 'تفضل بزيارة الموقع الرسمي لقسم علوم الحاسوب',
      linkLabel: 'أو افتح صفحة القسم مباشرة ↗',
      facts: ['كلية العلوم', 'درجة البكالوريوس لمدة 4 سنوات', 'ابدأ البناء من أي مكان', 'لا يشترط وجود خبرة سابقة'],
    },
    footer: {
      dept: 'قسم علوم الحاسوب',
      sub: 'جامعة نوروز (NAWROZ UNIVERSITY) · كلية العلوم',
      motto: 'لا تكتفِ باللعب. ابدأ في بناء اللعبة.',
      addressLabel: 'العنوان',
      phoneLabel: 'الهاتف',
      websiteLabel: 'موقع الجامعة',
      rights: '© 2026 قسم علوم الحاسوب، جامعة نوروز. جميع الحقوق محفوظة.',
    },
  },
}
