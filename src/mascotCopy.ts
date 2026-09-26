import type { Lang } from './i18n'

/* Everything Byte (the mascot) says. Kept short and simple on purpose. */

export type ReactionKey =
  | 'body' | 'eyes' | 'ears' | 'nose' | 'belly' | 'tail' | 'paws'
  | 'cable' | 'pet' | 'wake' | 'ram' | 'floppy' | 'hub' | 'full'

export interface MascotCopy {
  intro: string
  caption: string
  buttons: { unplug: string; plug: string; ram: string; floppy: string; hub: string }
  cableBack: string
  cableOut: string
  lines: Record<ReactionKey, string[]>
  /* the little Byte that peeks from the screen edge */
  peek: { welcome: string; lines: string[]; sad: string; close: string }
}

export const MASCOT_COPY: Record<Lang, MascotCopy> = {
  en: {
    intro: 'Hi! I’m Byte 🐭 Tap me, or feed me something!',
    caption: 'Click on his eyes, ears, nose, cheeks, belly, tail, and feet — or choose a device from above!',
    buttons: { unplug: 'Unplug the cable', plug: 'Plug the cable in', ram: 'Give RAM', floppy: 'Give Floppy', hub: 'Give Hub' },
    cableBack: 'Yay, I’m online again! 🔌',
    cableOut: 'Oh no! No internet! 😱',
    lines: {
      body: ['Hey, that tickles! 😆', 'Squeak!'],
      eyes: ['I see you! 👀', 'Blink blink!'],
      ears: ['I can hear the Wi-Fi! 📡', 'My ears are listening!'],
      nose: ['Boop! 🐽', 'Sniff sniff… I smell code!'],
      belly: ['Hehe, my tummy! 😄', 'I’m a little hungry…'],
      tail: ['Hey, not my tail! ⚡', 'That’s my antenna!'],
      paws: ['High five! 🐾', 'Tiny paws, big ideas!'],
      cable: ['Yum, my favourite cable! 🔌'],
      pet: ['Aww, I love you! 💙', 'More, please! 🥰'],
      wake: ['Huh? I was sleeping! 😴'],
      ram: ['Yummy RAM! Now I’m faster! ⚡', 'Crunchy memory! 😋'],
      floppy: ['An old snack! Still tasty 💾', 'Crunch crunch! 😋'],
      hub: ['So many ports! Yum! 🌐', 'Crunchy cables! 😋'],
      full: ['I’m full! Burp! 😳', 'No more, my tummy is full! 🤭'],
    },
    peek: {
      welcome: 'Oh, you came! Come see me 🐭',
      lines: ['Right here! Come say hello 💙', 'Psst… come play with me! 🐭', 'I’m hungry… feed me some RAM! 😋'],
      sad: 'Leaving already? Come back soon! 🥺',
      close: 'Hide Byte',
    },
  },

  ku: {
    intro: 'سلاڤ! ئەز بایتم 🐭 کلیکێ ل من بکە، یان تشتەکێ بدە من!',
    caption: 'کلیکێ ل سەر چاڤ، گوهـ، دفن، ڕوومەت، زک، دوڤ و پێیێن وی بکە — یان ئامیرەکێ ژ سەری هەلبژێرە!',
    buttons: { unplug: 'کێبڵی ژێ ڤەکە', plug: 'کێبڵی گرێ بدە', ram: 'RAMێ بدێ', floppy: 'فلۆپی بدێ', hub: 'هەب (Hub) بدێ' },
    cableBack: 'یەی، ئینتەرنێت زڤڕی! 🔌',
    cableOut: 'ئای! ئینتەرنێت نەما! 😱',
    lines: {
      body: ['هەی، دکەنم! 😆', 'چیق!'],
      eyes: ['ئەز تە دبینم! 👀'],
      ears: ['ئەز گوهـ ل وایفایێ دبم! 📡'],
      nose: ['بووپ! 🐽'],
      belly: ['هەهە، زکێ من! 😄', 'ئەز کێمەکێ برسی مە…'],
      tail: ['هەی، دوڤا من نە! ⚡'],
      paws: ['پێنج! 🐾'],
      cable: ['کێبلا من یا خۆش! 🔌'],
      pet: ['ئاخ، ئەز حەز ژ تە دکەم! 💙', 'هێشتا! 🥰'],
      wake: ['هاا؟ ئەز نڤستی بووم! 😴'],
      ram: ['RAM یا خۆش! نوکە ئەز خێراترم! ⚡', 'تامخۆشە! 😋'],
      floppy: ['خوارنەکا کەڤنە، لێ خۆشە! 💾', 'کرچ کرچ! 😋'],
      hub: ['گەلەک پۆرت! تامخۆشە! 🌐', 'کرچ کرچ! 😋'],
      full: ['ئەز تێر بووم! 😳', 'بەسە، زکێ من تژی بوو! 🤭'],
    },
    peek: {
      welcome: 'ئۆی، تو هاتی! وەرە من ببینە 🐭',
      lines: ['ل ڤێرێ! وەرە سلاڤەکێ بکە 💙', 'پست… وەرە دگەل من یاریێ بکە! 🐭', 'ئەز برسی مە… RAMەکێ بدە من! 😋'],
      sad: 'تو دچی؟ زوو بزڤڕە! 🥺',
      close: 'بایتی ڤەشێرە',
    },
  },

  ar: {
    intro: 'مرحباً! أنا بايت 🐭 اضغط عليّ، أو أطعمني شيئاً!',
    caption: 'اضغط على عينيه، أذنيه، أنفه، خديه، بطنه، ذيله وقدميه — أو اختر جهازاً من الأعلى!',
    buttons: { unplug: 'افصل الكابل', plug: 'أعد توصيل الكابل', ram: 'أعطه RAM', floppy: 'أعطه Floppy', hub: 'أعطه Hub' },
    cableBack: 'رائع، عاد الإنترنت! 🔌',
    cableOut: 'أوه لا! انقطع الإنترنت! 😱',
    lines: {
      body: ['هيه، هذا يدغدغ! 😆', 'سكويك!'],
      eyes: ['أنا أراك! 👀'],
      ears: ['أسمع الواي فاي! 📡'],
      nose: ['بوب! 🐽'],
      belly: ['هههه، بطني! 😄', 'أنا جائع قليلاً…'],
      tail: ['هيه، ليس ذيلي! ⚡'],
      paws: ['كفّك! 🐾'],
      cable: ['كابلي المفضل! 🔌'],
      pet: ['آه، أحبك! 💙', 'المزيد من فضلك! 🥰'],
      wake: ['هاه؟ كنت نائماً! 😴'],
      ram: ['ذاكرة لذيذة! أصبحت أسرع! ⚡', 'لذيذ! 😋'],
      floppy: ['وجبة قديمة، لكنها لذيذة! 💾', 'قرمشة قرمشة! 😋'],
      hub: ['منافذ كثيرة! لذيذ! 🌐', 'قرمشة! 😋'],
      full: ['شبعت! 😳', 'يكفي، بطني ممتلئ! 🤭'],
    },
    peek: {
      welcome: 'أوه، لقد أتيت! تعال وشاهدني 🐭',
      lines: ['هنا! تفضل وألقِ التحية 💙', 'بسّت… تعال والعب معي! 🐭', 'أنا جائع… أعطني بعض RAM! 😋'],
      sad: 'ستغادر؟ عد قريباً! 🥺',
      close: 'إخفاء بايت',
    },
  },
}
