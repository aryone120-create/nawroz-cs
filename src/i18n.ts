export type Lang = 'en' | 'ku' | 'ar'

export const LANG_LABELS: Record<Lang, string> = { en: 'EN', ku: 'کوردی', ar: 'العربية' }
export const RTL_LANGS: Lang[] = ['ku', 'ar']

/* World names are intentionally kept in English across all languages. */
export const WORLD_NAMES = [
  'Artificial Intelligence',
  'Game Design',
  'Robotics',
  'Web Development',
  'Mobile Apps',
  'Desktop Software',
  'Network & Data Security',
]

interface WorldCopy { line: string; long: string }
interface ReasonCopy { t: string; d: string }
interface FaqCopy { q: string; a: string }

export interface SiteCopy {
  nav: { worlds: string; byte: string; why: string; faq: string; join: string; cta: string; poster: string }
  hero: {
    kicker: string
    titleLine1: string
    titleLine2: string
    paragraph: string
    ctaEnter: string
    ctaWhy: string
    stat0: string; stat1: string; stat2: string
    badge: string
  }
  worlds: { kicker: string; title: string; subtitle: string; items: WorldCopy[] }
  byte: { kicker: string; title: string; subtitle: string }
  why: { kicker: string; title: string; reasons: ReasonCopy[] }
  banner: { title: string; text: string }
  faq: { kicker: string; title: string; items: FaqCopy[] }
  join: {
    kicker: string; titleLine1: string; titleHighlight: string; paragraph: string
    tableKicker: string; tableTitle: string; linkLabel: string
    facts: string[]
  }
  footer: { deptName: string; tagline: string; findTable: string; copyright: string }
}

export const COPY: Record<Lang, SiteCopy> = {
  en: {
    nav: { worlds: 'Worlds', byte: 'Byte', why: 'Why CS', faq: 'FAQ', join: 'Find Us', cta: 'Find Our Table', poster: '🖨 Poster' },
    hero: {
      kicker: '// COMPUTER SCIENCE',
      badge: 'WELCOME TO THE DIGITAL WORLD',
      titleLine1: 'We have a world of our own.',
      titleLine2: 'Come build yours inside it.',
      paragraph: 'Ours is the digital world — and here you don’t just enter it, you carve out your own place within it. You’ll create what doesn’t exist yet: artificial intelligence, games, robots, and the software that runs the world.',
      ctaEnter: 'Enter our world',
      ctaWhy: 'Why choose CS',
      stat0: 'worlds to master', stat1: 'year Bachelor’s degree', stat2: 'places you can work from',
    },
    worlds: {
      kicker: '// WHAT YOU’LL LEARN',
      title: 'Seven worlds. You’ll explore them all.',
      subtitle: 'These aren’t separate tracks to choose between — every Computer Science student learns them all. One degree, seven ways to build.',
      items: [
        { line: 'Think. Predict. Automate.', long: 'Train neural networks and build systems that see, understand, and decide. The frontier everyone is racing toward — and you get there first.' },
        { line: 'Build worlds people play in.', long: 'Design characters, physics, and universes. Turn imagination into interactive worlds that millions can step inside.' },
        { line: 'Machines that move and sense.', long: 'Give hardware a brain. Program machines that perceive their surroundings and act on their own.' },
        { line: 'Power the internet.', long: 'Build the platforms the world lives on. From idea to a site used across the planet in an afternoon.' },
        { line: 'A billion pockets, your idea.', long: 'Ship apps that live in people’s hands every day. Your creation, everywhere they go.' },
        { line: 'Tools the world relies on.', long: 'Engineer the powerful software professionals depend on to get real work done.' },
        { line: 'Defend what matters.', long: 'Protect networks, systems, and data from real threats. Learn to think like an attacker so you can build like a defender.' },
      ],
    },
    byte: {
      kicker: '// MEET THE DEPARTMENT',
      title: 'This is Byte. 🐭',
      subtitle: 'Our little mascot runs on network cables and pure curiosity — just like us. Go on, bother her a little.',
    },
    why: {
      kicker: '// WHY COMPUTER SCIENCE',
      title: 'Four reasons to build instead of memorize.',
      reasons: [
        { t: 'You create, not memorize', d: 'Many fields ask you to memorize what already exists. Computer Science hands you the tools to build what doesn’t exist yet — and lets you decide what the future looks like.' },
        { t: 'Your classroom has no borders', d: 'A laptop is your lab. Study, build, and work from Duhok, from home, or from anywhere on Earth. Your world isn’t confined to one building.' },
        { t: 'One field powers every other', d: 'Nearly every industry today runs on code. Choose Computer Science and you don’t tie your future to one field — you become essential to all of them.' },
        { t: 'You start building on day one', d: 'No waiting years to touch real work. From your first semester you’re making apps, games, and intelligent systems that actually run.' },
      ],
    },
    banner: {
      title: 'Your classroom has no walls. Your career has no map.',
      text: 'Build from Duhok, from home, or from the other side of the world. In our world, where you are never decides what you can create.',
    },
    faq: {
      kicker: '// BEFORE YOU DECIDE',
      title: 'Questions, answered.',
      items: [
        { q: 'Do I need coding experience to start?', a: 'None at all. We start from zero. What we look for is curiosity and the willingness to build — the rest, we teach you, step by step.' },
        { q: 'What language are courses taught in?', a: 'Courses are taught in Kurdish and English. Programming is naturally an English-literate craft, and we build that skill with you as you go — a lasting advantage in itself.' },
        { q: 'How is this different from other majors?', a: 'Computer Science is about creating and inventing rather than memorizing information. It’s a four-year Bachelor’s degree, and your work is not tied to a single place or profession.' },
        { q: 'Who teaches the courses?', a: 'Experienced professionals who have built real software and systems — people who bring the practice of the field, not only its theory, into the room.' },
        { q: 'What can I actually build here?', a: 'AI models, video games, robots, websites, mobile apps, network security systems, and desktop software. Seven worlds, one department — you choose which to master.' },
      ],
    },
    join: {
      kicker: '// COME SAY HELLO',
      titleLine1: 'Let’s build your future,',
      titleHighlight: 'together.',
      paragraph: 'Behind this table is a family that codes, creates, and dreams as one. Bring your curiosity — we’ll bring the tools, the mentors, and a place where you truly belong. Your world in Computer Science begins the moment you say hello.',
      tableKicker: 'OPENS NAWROZ.EDU.KRD IN A NEW TAB ↗',
      tableTitle: 'Visit the official Computer Science department website',
      linkLabel: 'Or open the department page directly ↗',
      facts: ['College of Science', '4-Year Bachelor’s Degree', 'Build from anywhere', 'No experience needed'],
    },
    footer: {
      deptName: 'Dept. of Computer Science',
      tagline: 'NAWROZ UNIVERSITY · COLLEGE OF SCIENCE · DUHOK',
      findTable: 'Find Our Table →',
      copyright: '© 2026 Nawroz University · We have a world of our own — come build yours inside it.',
    },
  },

  ku: {
    nav: { worlds: 'جیهان', byte: 'بایت', why: 'بۆچی زانستا کۆمپیوتەرێ', faq: 'پرسیارێن گشتی', join: 'پەیوەندی', cta: 'مێزا مە بدۆزەرەوە', poster: '🖨 پۆستەر' },
    hero: {
      kicker: '// زانستا کۆمپیوتەرێ',
      badge: 'بەخێرهاتن بۆ جیهانا دیجیتالی',
      titleLine1: 'ئەم جیهانەکا خۆیا هەینە.',
      titleLine2: 'وەرە، یا خۆ لناڤ ئاڤا بکە.',
      paragraph: 'ئەڈە جیهانا دیجیتالییا مەیە — لێرێ تو تنێ ناچیتە ناڤێ، بەلکو شوینەکێ بۆ خۆ دروست دکەی. تو دێ ئەوێ چێبکەی کو هێشتا نینن: ژیریا دەستکرد، یاری، رۆبۆت، و نەرمامارا کو جیهانێ دبەزینێ.',
      ctaEnter: 'بچۆرە ناڤ جیهانێ',
      ctaWhy: 'بۆچی زانستا کۆمپیوتەرێ',
      stat0: 'جیهان بۆ فێربوونێ', stat1: 'ساڵێن بەکالۆریۆس', stat2: 'شوین بۆ خەبات',
    },
    worlds: {
      kicker: '// ئەوێ تو دێ فێر ببی',
      title: 'حەفت جیهان. تو دێ هەمیان بگەڕی.',
      subtitle: 'ئەڈ نە ڕێکێن جودان یێن هەلبژارتنێ نن — هەر قوتابییەکێ زانستا کۆمپیوتەرێ هەمیان فێر دبیت. یەک بروانامە، حەفت ڕێکێن ئاڤاکرنێ.',
      items: [
        { line: 'بیر بکە. پێشبینی بکە. ئۆتۆماتیک بکە.', long: 'تۆڕێن نۆرۆنی ئاڤا بکە و سیستەمان دروست بکە یێن دبینن، تێدگەهن و بریار ددەن. سنووری کو هەمی بەرەڤ دچن — و تو یێ پێشین دگەهیژیتێ.' },
        { line: 'جیهانان ئاڤا بکە یێن مرۆڤ تێدا یاری دکەن.', long: 'کارەکتەران، فیزیک، و جیهانان دیزاین بکە. خەیاڵێ بگهورە جیهانەکا ئینتراکتیڤ کو ملیۆنان دشێن بچنە ناڤێ.' },
        { line: 'ئامیرێن کو دخوزن و هەست دکەن.', long: 'مێژییەکێ بدە ئامیران. ئامیران پرۆگرام بکە کو دەڤدورا خۆ هەست پێ بکەن و بخۆڤە کار بکەن.' },
        { line: 'هێزا ئینتەرنێتێ بدە.', long: 'پلاتفۆرمان کو جیهان لسەر دژی ئاڤا بکە. ژ بیرۆکەکێ بۆ مالپەڕەکێ کو دگەل جیهانی تێدا کار دهێتە کرن، ب یەک نێڤرۆ.' },
        { line: 'ملیارەک جێب، بیرۆکا تە.', long: 'ئەپلیکەسیۆنان دەربخە یێن یەر هەر روژ دناڤ دەستێن مرۆڤان دژین. دروستکرنا تە، هەر شوینێ ئەو دچن.' },
        { line: 'ئامرازێن جیهان پشتی پێ دبەستیت.', long: 'نەرمامارا بهێز ئاڤا بکە یا کارمەندێن پیشەیی پشتی پێ دبەستن بۆ کارەکێ راستەقینە.' },
        { line: 'بپاریزە ئەوێ گرنگە.', long: 'تۆڕ، سیستەم، و داتایان ژ هەڕەشێن راستەقینە بپارێزە. فێر ببە کو وەک هێرشکەرەکی بیر بکەی، بۆ ئەوێ کو وەک پاریزەرەکی ئاڤا بکەی.' },
      ],
    },
    byte: {
      kicker: '// ناسینا بەشێ',
      title: 'ئەڤێ بایتە. 🐭',
      subtitle: 'مۆسکەکا مە یا بچووک ب کابلێن تۆڕێ و ب کنجوسیا خاڵس دخەبتێت — وەکی مە. وەرێ، کەمێک هەراسانی بکە.',
    },
    why: {
      kicker: '// بۆچی زانستا کۆمپیوتەرێ',
      title: 'چار هۆکار بۆ ئاڤاکرنێ، دەورەن ژبیرکرنێ.',
      reasons: [
        { t: 'تو ئاڤا دکەی، نە ژبیر دکەی', d: 'پترین بواران داخوازی دکەن کو تو ئەوێ هەیە ژبیر بکەی. زانستا کۆمپیوتەرێ ئامرازان ددەتە تە بۆ ئاڤاکرنا ئەوێ هێشتا نینە — و دهێلیتە تو بریار بدەی داهاتوو ب چ رەنگی یێ.' },
        { t: 'قوتابخانا تە سنوور نینن', d: 'کۆمپیوتەرەکا تە یا لاپتۆپ لابۆراتووارا تەیە. لدهۆکێ، ماڵا خۆ، یان هەر شوینێ سەر ئەرد فێربە و خەبات بکە. جیهانا تە ب یەک بینایی سنووردار نینە.' },
        { t: 'یەک بوار هێزا هەمیان دیت', d: 'نزیکی هەمی پیشەیێن ئەڤرۆیی ب کۆدی دخەبتن. زانستا کۆمپیوتەرێ هەلبژێرە و داهاتویا خۆ ب یەک بواری ڤە گرێ نەدە — تو بۆ هەمی بوارا پێدڤی دبی.' },
        { t: 'ژ روژا یەکێ ڤە دەست ب ئاڤاکرنێ دکەی', d: 'پێدڤی ب چاڤەرێکرنا ساڵان نینە بۆ دەستنیشانکرنا کارەکێ راستەقینە. ژ سیمێستەرا یەکێ ڤە تو ئەپلیکەسیۆن، یاری، و سیستەمێن زیرەک ئاڤا دکەی کو ڕاستەقینە کار دکەن.' },
      ],
    },
    banner: {
      title: 'قوتابخانا تە دیوار نینن. پیشەیا تە نەخشە نینن.',
      text: 'ژ دهۆکێ، ماڵا خۆ، یان ژ کەنارێ دی یێ جیهانێ ئاڤا بکە. ل جیهانا مە، شوینێ تو لێی یی، بریار نادەت ئەوێ تو دشێی چێ بکەی.',
    },
    faq: {
      kicker: '// بەری بریارا خۆ بدەی',
      title: 'پرسیار، ب بەرسڤ.',
      items: [
        { q: 'ئایا پێدڤیم ب ئەزموونا پرۆگرامکرنێ هەیە بۆ دەستپێکرنێ؟', a: 'نەخێر، هیچ. ئەم ژ سفرێ دەست پێ دکەین. ئەوێ ئەم لێ دگەرین کنجوسی و خوازیارییە بۆ ئاڤاکرنێ — یا مایی، ئەم گاڤ ب گاڤ فێری تە دکەین.' },
        { q: 'وانە ب چ زمانی تێن وتنێ؟', a: 'وانە ب کوردی و ئینگلیزی تێن وتنێ. پرۆگرامکرن ب سروشتی پیشەیەکە کو خواندنا ئینگلیزی پێدڤییە، و ئەم ڤێ لێهاتنێ پێکڤە دگەل تە ئاڤا دکەین — بریاردانەکا مایندە ب خۆ خۆیە.' },
        { q: 'ئەڤ ژ بوارێن دی چاوا جودایە؟', a: 'زانستا کۆمپیوتەرێ دەربارەی ئاڤاکرن و داهێنانێیە، نە ژبیرکرنا زانیاریان. بروانامەیەکا چار ساڵی یا بەکالۆریۆسە، و کارێ تە ب یەک شوین یان پیشەیێ ڤە گرێدایی نینە.' },
        { q: 'کێ وانان دبێژیت؟', a: 'پسپۆرێن ئەزموونداری کو نەرمامار و سیستەمێن راستەقینە ئاڤا کرینە — کەسێن کو پراکتیزا بوارێ، نە تنێ تیۆرا وی، دئینن ژوورێ.' },
        { q: 'ب راستی دشێم چ لێرێ ئاڤا بکەم؟', a: 'مۆدێلێن ژیریا دەستکرد، یاری، رۆبۆت، مالپەڕ، ئەپلیکەسیۆنێن مۆبایل، سیستەمێن پاراستنا تۆڕێ، و نەرمامارا سەرمیزێ. حەفت جیهان، یەک بەش — تو هەلبژێرە کیجارا فێر ببی.' },
      ],
    },
    join: {
      kicker: '// وەرە، سلاڤ لێ بکە',
      titleLine1: 'ئەم داهاتویا تە پێکڤە ئاڤا دکەین،',
      titleHighlight: 'بەردەوام.',
      paragraph: 'پشتی دڤێ مێزێ خێزانەکە یا کۆد دنڤیسیت، دروست دکەت، و وەکی یەک خەون دبینیت. کنجوسیا خۆ بینە — ئەم ئامراز، مامۆستا، و شوینەکێ کو تو یێ لێی ب راستی دبی بەشەک، دئینین. جیهانا تە یا زانستا کۆمپیوتەرێ دەستپێ دکەت هەر گاڤا تو سلاڤێـ دکەی.',
      tableKicker: 'ماڵپەڕا nawroz.edu.krd د تابەکێ نوی دا ڤەدکەت ↗',
      tableTitle: 'سەردانا ماڵپەڕا فەرمی یا بەشێ زانستا کۆمپیوتەرێ بکە',
      linkLabel: 'یان پەڕەیا بەشی ڕاستەوخۆ ڤەکە ↗',
      facts: ['کۆلێژا زانستێ', 'بروانامەیا بەکالۆریۆس ٤ ساڵان', 'ژ هەر شوینێ ئاڤا بکە', 'پێدڤی ب ئەزموونێ نینە'],
    },
    footer: {
      deptName: 'بەشێ زانستا کۆمپیوتەرێ',
      tagline: 'NAWROZ UNIVERSITY · کۆلێژا زانستێ · دهۆک',
      findTable: 'مێزا مە بدۆزەرەوە →',
      copyright: '© ٢٠٢٦ Nawroz University · ئەم جیهانەکا خۆیا هەینە — وەرە یا خۆ ئاڤا بکە.',
    },
  },

  ar: {
    nav: { worlds: 'عوالم', byte: 'بايت', why: 'لماذا علوم الحاسوب', faq: 'الأسئلة الشائعة', join: 'تواصل معنا', cta: 'ابحث عن طاولتنا', poster: '🖨 ملصق' },
    hero: {
      kicker: '// علوم الحاسوب',
      badge: 'مرحبًا بك في العالم الرقمي',
      titleLine1: 'لدينا عالمنا الخاص.',
      titleLine2: 'تعال وابنِ عالمك بداخله.',
      paragraph: 'هذا عالمنا الرقمي — وهنا لا تكتفي بدخوله، بل تصنع مكانك الخاص فيه. ستبني ما لم يوجد بعد: الذكاء الاصطناعي، الألعاب، الروبوتات، والبرمجيات التي تُشغّل العالم.',
      ctaEnter: 'ادخل عالمنا',
      ctaWhy: 'لماذا تختار علوم الحاسوب',
      stat0: 'عوالم لإتقانها', stat1: 'سنوات بكالوريوس', stat2: 'أماكن يمكنك العمل منها',
    },
    worlds: {
      kicker: '// ماذا ستتعلم',
      title: 'سبعة عوالم. ستكتشفها جميعًا.',
      subtitle: 'هذه ليست مسارات منفصلة تختار بينها — كل طالب في علوم الحاسوب يدرسها جميعًا. شهادة واحدة، وسبع طرق للبناء.',
      items: [
        { line: 'فكّر. توقّع. شغّل تلقائيًا.', long: 'درّب شبكات عصبية وابنِ أنظمة ترى وتفهم وتقرر. الحدود التي يتسابق إليها الجميع — وستكون أول من يصل.' },
        { line: 'ابنِ عوالم يلعب الناس بداخلها.', long: 'صمّم الشخصيات والفيزياء والعوالم. حوّل خيالك إلى عوالم تفاعلية يمكن لملايين الأشخاص الدخول إليها.' },
        { line: 'آلات تتحرك وتستشعر.', long: 'امنح الأجهزة عقلًا. برمج آلات تدرك محيطها وتتصرف من تلقاء نفسها.' },
        { line: 'شغّل الإنترنت.', long: 'ابنِ المنصات التي يعيش عليها العالم. من فكرة إلى موقع يستخدمه الناس حول العالم خلال يوم واحد.' },
        { line: 'مليار جيب، وفكرتك بداخله.', long: 'أطلق تطبيقات يستخدمها الناس يوميًا. إبداعك، أينما ذهبوا.' },
        { line: 'أدوات يعتمد عليها العالم.', long: 'صمّم البرمجيات القوية التي يعتمد عليها المحترفون لإنجاز عملهم الفعلي.' },
        { line: 'احمِ ما يهم.', long: 'احمِ الشبكات والأنظمة والبيانات من تهديدات حقيقية. تعلّم أن تفكر كمهاجم لتبني كمدافع.' },
      ],
    },
    byte: {
      kicker: '// تعرّف على القسم',
      title: 'هذه بايت. 🐭',
      subtitle: 'تعمل رفيقتنا الصغيرة بكابلات الشبكة وفضول خالص — تمامًا مثلنا. هيا، أزعجيها قليلًا.',
    },
    why: {
      kicker: '// لماذا علوم الحاسوب',
      title: 'أربعة أسباب لتبني بدلًا من أن تحفظ.',
      reasons: [
        { t: 'أنت تبني، لا تحفظ', d: 'تطلب منك مجالات كثيرة حفظ ما هو موجود بالفعل. تمنحك علوم الحاسوب أدوات بناء ما لا يزال غير موجود — وتترك لك القرار في شكل المستقبل.' },
        { t: 'صفك بلا حدود', d: 'حاسوبك المحمول هو مختبرك. ادرس وابنِ واعمل من دهوك، من المنزل، أو من أي مكان على الأرض. عالمك ليس محصورًا داخل مبنى واحد.' },
        { t: 'مجال واحد يُشغّل كل المجالات الأخرى', d: 'كل الصناعات تقريبًا تعمل بالكود اليوم. اختر علوم الحاسوب ولن تربط مستقبلك بمجال واحد — بل تصبح ضروريًا لها جميعًا.' },
        { t: 'تبدأ البناء من اليوم الأول', d: 'لا داعي للانتظار سنوات لتلمس عملاً حقيقيًا. منذ فصلك الدراسي الأول تصنع تطبيقات وألعابًا وأنظمة ذكية تعمل فعليًا.' },
      ],
    },
    banner: {
      title: 'صفّك بلا جدران. مسارك المهني بلا خريطة.',
      text: 'ابنِ من دهوك، من المنزل، أو من الطرف الآخر من العالم. في عالمنا، مكانك لا يقرر أبدًا ما يمكنك صنعه.',
    },
    faq: {
      kicker: '// قبل أن تقرر',
      title: 'أسئلة، وأجوبتها.',
      items: [
        { q: 'هل أحتاج إلى خبرة برمجية لأبدأ؟', a: 'لا، إطلاقًا. نبدأ من الصفر. ما نبحث عنه هو الفضول والرغبة في البناء — والباقي نعلّمك إياه خطوة بخطوة.' },
        { q: 'بأي لغة تُدرّس المواد؟', a: 'تُدرّس المواد بالكردية والإنجليزية. البرمجة بطبيعتها مهنة تتطلّب إلمامًا بالإنجليزية، ونبني هذه المهارة معك خطوة بخطوة — وهي ميزة تبقى معك دائمًا.' },
        { q: 'كيف يختلف هذا عن التخصصات الأخرى؟', a: 'علوم الحاسوب تتمحور حول الإبداع والابتكار لا الحفظ. إنها شهادة بكالوريوس مدتها أربع سنوات، وعملك غير مرتبط بمكان أو مهنة واحدة.' },
        { q: 'من يقوم بتدريس المواد؟', a: 'محترفون ذوو خبرة بنوا برمجيات وأنظمة حقيقية — أشخاص يجلبون ممارسة المجال، لا نظريته فقط، إلى الصف.' },
        { q: 'ما الذي يمكنني بناؤه هنا فعليًا؟', a: 'نماذج ذكاء اصطناعي، ألعاب فيديو، روبوتات، مواقع إلكترونية، تطبيقات جوال، أنظمة حماية شبكات، وبرمجيات مكتبية. سبعة عوالم، قسم واحد — تختار أيها تتقن.' },
      ],
    },
    join: {
      kicker: '// تعال وقل مرحبًا',
      titleLine1: 'لنبنِ مستقبلك،',
      titleHighlight: 'معًا.',
      paragraph: 'خلف هذه الطاولة عائلة تكتب الكود وتبدع وتحلم كواحد. أحضر فضولك — سنحضر الأدوات والموجّهين ومكانًا تنتمي إليه فعلًا. يبدأ عالمك في علوم الحاسوب لحظة أن تقول مرحبًا.',
      tableKicker: 'يفتح nawroz.edu.krd في علامة تبويب جديدة ↗',
      tableTitle: 'زيارة الموقع الرسمي لقسم علوم الحاسوب',
      linkLabel: 'أو افتح صفحة القسم مباشرة ↗',
      facts: ['كلية العلوم', 'شهادة بكالوريوس 4 سنوات', 'ابنِ من أي مكان', 'لا حاجة لخبرة سابقة'],
    },
    footer: {
      deptName: 'قسم علوم الحاسوب',
      tagline: 'NAWROZ UNIVERSITY · كلية العلوم · دهوك',
      findTable: 'ابحث عن طاولتنا →',
      copyright: '© 2026 Nawroz University · لدينا عالمنا الخاص — تعال وابنِ عالمك بداخله.',
    },
  },
}

export const DEPARTMENT_URL = 'https://nawroz.edu.krd/departments/department-of-computer-science'
