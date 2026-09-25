import type { Lang } from './i18n'

/* Everything Byte (the mascot) says, in all three languages.
   Kurdish and Arabic are first drafts — to be reviewed line by line. */

export type ReactionKey =
  | 'body' | 'eyes' | 'ears' | 'nose' | 'cheek' | 'belly' | 'tail' | 'paws'
  | 'cable' | 'pet' | 'wake' | 'ram' | 'floppy' | 'hub'

export interface MascotCopy {
  intro: string
  caption: string
  buttons: { unplug: string; plug: string; ram: string; floppy: string; hub: string }
  cableBack: string
  cableRestored: string
  cableOut: string[]
  lines: Record<ReactionKey, string[]>
  peek: { idle: string; near: string; sad: string; close: string }
}

export const MASCOT_COPY: Record<Lang, MascotCopy> = {
  en: {
    intro: 'Hey! I’m Byte. Click any part of me, or feed me some hardware! 🐭⚡',
    caption: 'Click her eyes, ears, nose, cheeks, tummy, tail or paws — or feed her the hardware above.',
    buttons: { unplug: 'Unplug cable', plug: 'Plug cable back', ram: 'Feed RAM', floppy: 'Feed floppy', hub: 'Feed hub' },
    cableBack: 'Nom! Cable re-anchored at 10 Gbps 🔌✨',
    cableRestored: 'Ahhh, packet stream restored! 🔌⚡',
    cableOut: ['NOOO! Connection timeout! 😱', 'Bandwidth dropping to 0 Kbps! 🚨'],
    lines: {
      body: ['Squeak! Core dump averted. Careful! 🐭', 'Ticklish runtime exception!', '404: Poking permit not found.'],
      eyes: ['Tracking your cursor at 120 FPS! 👀', 'Scanning your git history… looks clean.'],
      ears: ['Streaming gigabit packets straight to my ears! 📡', '*ear twitch* …did someone push to main?'],
      nose: ['Boop detected! System rebooting… 🐽', '*sniff sniff* smells like fresh coffee and syntax errors.'],
      cheek: ['Blush buffer overflow! 💗', 'Aww, stop it, you’ll overheat my cache!'],
      belly: ['Careful! That’s where my SSD lives!', 'Hehe, tummy scritches = +50 morale.'],
      tail: ['Hey! That’s my 5 GHz antenna! ⚡', 'Tail-pull interrupt received. Status: annoyed.'],
      paws: ['Tiny paws, flawless refactors. 🐾', 'Ready to ship code today!'],
      cable: ['Crunchy Cat-6… 10 Gbps of pure flavour! 🔌', 'Low-latency snack of champions.'],
      pet: ['Awww 💙 Best dev partner ever.', 'Happiness level: O(1).'],
      wake: ['zzz… huh?! I was compiling in the background.', 'Waking from sleep… ready!'],
      ram: ['Squeak! Nibbled 16 GB of RAM 🐭⚡', 'Crunchy DDR5 — my favourite byte-sized snack!', 'Mmm, dual-channel flavour.'],
      floppy: ['Ooh, a vintage cracker! 1.44 MB of pure crunch. 💾', 'They don’t make snacks this crispy anymore.', 'Read-only, but so tasty.'],
      hub: ['Chewed through all 24 ports! 🌐', 'Mmm, gigabit-flavoured plastic.', 'Careful — that one was still blinking!'],
    },
    peek: {
      idle: 'Psst… peek-a-boo! Come find me 🐭',
      near: 'Over here! Come say hi 💙',
      sad: 'Leaving already? 🥺 Come back and play!',
      close: 'Hide Byte',
    },
  },

  ku: {
    intro: 'سلاڤ! ئەز بایتم 🐭 ل هەر جهەکێ من بدە، یان ئامیرەکێ بدە من بخۆم!',
    caption: 'ل چاڤ، گوه، دفن، روومەت، زک، دوو و پێیێن وێ بدە — یان ئامیرەکێ ژ سەری بدێ.',
    buttons: { unplug: 'کێبلێ دەربینە', plug: 'کێبلێ بزڤڕینە', ram: 'RAM بدێ', floppy: 'فلۆپی بدێ', hub: 'هاب بدێ' },
    cableBack: 'نەم! کێبل زڤڕی جهێ خۆ — 10 Gbps 🔌✨',
    cableRestored: 'ئاخ، ئینتەرنێت زڤڕی! 🔌⚡',
    cableOut: ['نەەە! پەیوەندی بڕا! 😱', 'خێرایی بوو سفر! 🚨'],
    lines: {
      body: ['چیق! هێدی هێدی! 🐭', 'ئای، دکەنم! خەلەتیەک د سیستەمی دا!', '404: رێپێدان بۆ دەستلێدانێ نەهاتە دیتن.'],
      eyes: ['ئەز نیشاندەرێ تە ب ١٢٠ فرەیمان دبینم! 👀', 'من سەحکرە کۆدێ تە… پاقژە!'],
      ears: ['پاکێتێن ئینتەرنێتێ راستەوخۆ دچنە گوهێن من! 📡', '*گوه دلڤن* … کێ کۆد هنارت؟'],
      nose: ['بووپ! سیستەم دیسان دەست پێ دکەت… 🐽', '*بێهن دکەت* بێهنا قەهوێ و خەلەتیێن کۆدی دهێت.'],
      cheek: ['روومەتێن من سۆر بوون! 💗', 'بەسە، دێ مێشکێ من گەرم بیت!'],
      belly: ['هێدی! SSD یا من ل ڤێرێیە!', 'هەهە، زک خراندن = +٥٠ کەیف.'],
      tail: ['هەی! ئەڤە ئەنتێنا منە یا 5GHz! ⚡', 'دوو هاتە کێشان. رەوش: ب کەرب.'],
      paws: ['پێیێن بچووک، کۆدێ بێ خەلەتی. 🐾', 'ئەز ئامادەمە ئەڤرۆ کۆدی بەلاڤ بکەم!'],
      cable: ['کێبلا Cat-6… تاما 10 Gbps! 🔌', 'خوارنا چالاکان.'],
      pet: ['ئاااخ 💙 تو باشترین هەڤالێ منی!', 'ئاستێ کەیفێ: O(1).'],
      wake: ['خخخ… هاا؟! من کۆد کۆمپایل دکر.', 'ژ خەو رابووم… ئامادەمە!'],
      ram: ['چیق! ١٦ گیگابایت RAM خوار! 🐭⚡', 'DDR5 یا کرچ — خوارنا من یا دلخواز!', 'ممم، تاما دوو-کەنالی.'],
      floppy: ['ئۆو، بسکویتەکێ کەڤن! ١.٤٤ مێگابایت کرچ. 💾', 'ئێدی خوارنێن هۆسا کرچ چێناکەن.', 'تنێ بۆ خواندنێیە، بەلێ گەلەک خۆشە.'],
      hub: ['هەمی ٢٤ پۆرت خوارن! 🌐', 'ممم، پلاستیکێ ب تاما گیگابیتێ.', 'هێدی — ئەو هێشتا ڕۆناهی ددا!'],
    },
    peek: {
      idle: 'پست… ئەز ل ڤێرێمە! وەرە من ببینە 🐭',
      near: 'ل ڤێرێ! وەرە سلاڤەکێ بکە 💙',
      sad: 'تو دچی؟ 🥺 بزڤڕە دا پێکڤە یاری بکەین!',
      close: 'بایتی ڤەشێرە',
    },
  },

  ar: {
    intro: 'مرحبًا! أنا بايت 🐭 انقر على أي جزء مني، أو أطعمني قطعة إلكترونية!',
    caption: 'انقر على عينيها، أذنيها، أنفها، خديها، بطنها، ذيلها أو كفّيها — أو أطعمها من الأعلى.',
    buttons: { unplug: 'افصل الكابل', plug: 'أعد الكابل', ram: 'أطعمها RAM', floppy: 'أطعمها قرصًا مرنًا', hub: 'أطعمها موزّعًا' },
    cableBack: 'نَم! عاد الكابل إلى مكانه — 10 Gbps 🔌✨',
    cableRestored: 'آه، عاد تدفّق البيانات! 🔌⚡',
    cableOut: ['لااا! انقطع الاتصال! 😱', 'السرعة تهبط إلى صفر! 🚨'],
    lines: {
      body: ['سكويك! على مهلك! 🐭', 'أشعر بالدغدغة! خطأ في النظام!', '404: لم يُعثر على تصريح اللمس.'],
      eyes: ['أتابع مؤشّرك بـ120 إطارًا في الثانية! 👀', 'فحصت كودك… نظيف تمامًا.'],
      ears: ['حزم البيانات تصل مباشرة إلى أذنيّ! 📡', '*ترتعش أذناها* …من رفع كودًا للتو؟'],
      nose: ['بوب! النظام يعيد التشغيل… 🐽', '*تشمّ* رائحة قهوة وأخطاء برمجية.'],
      cheek: ['احمرّ خدّاي! 💗', 'كفى، ستسخن ذاكرتي!'],
      belly: ['انتبه! هنا يعيش قرص SSD الخاص بي!', 'هههه، دغدغة البطن = +50 سعادة.'],
      tail: ['مهلًا! هذا هوائي الـ5GHz الخاص بي! ⚡', 'تم سحب الذيل. الحالة: منزعجة.'],
      paws: ['كفّان صغيران، وكود بلا أخطاء. 🐾', 'جاهزة لإطلاق الكود اليوم!'],
      cable: ['كابل Cat-6 مقرمش… بنكهة 10 Gbps! 🔌', 'وجبة الأبطال السريعة.'],
      pet: ['آااه 💙 أنت أفضل شريك برمجة!', 'مستوى السعادة: O(1).'],
      wake: ['زززز… هاه؟! كنت أترجم الكود في الخلفية.', 'استيقظت… جاهزة!'],
      ram: ['سكويك! التهمت 16 غيغابايت من الذاكرة 🐭⚡', 'DDR5 مقرمشة — وجبتي المفضّلة!', 'ممم، بنكهة القناة المزدوجة.'],
      floppy: ['أوه، بسكويت قديم! 1.44 ميغابايت من القرمشة. 💾', 'لم يعودوا يصنعون وجبات بهذه القرمشة.', 'للقراءة فقط، لكنه لذيذ جدًا.'],
      hub: ['قضمت المنافذ الـ24 كلها! 🌐', 'ممم، بلاستيك بنكهة الغيغابت.', 'انتبه — ذاك ما زال يومض!'],
    },
    peek: {
      idle: 'بسّت… أنا هنا! تعال وابحث عني 🐭',
      near: 'هنا! تعال وقل مرحبًا 💙',
      sad: 'ستغادر؟ 🥺 عد لنلعب معًا!',
      close: 'إخفاء بايت',
    },
  },
}
