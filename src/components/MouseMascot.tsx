import { useEffect, useRef, useState, type ReactNode } from 'react';

const display = "'Sora', -apple-system, sans-serif";

const SIZE = 260;

export type Mood = 'idle' | 'happy' | 'love' | 'annoyed' | 'surprised' | 'sleepy' | 'sad';

const R: Record<string, { mood: Mood; lines: string[] }> = {
  body: { mood: 'annoyed', lines: ['Squeak! Core dump averted. Careful! 🐭', 'Ticklish runtime exception!', '404: Poking permit not found.'] },
  eyes: { mood: 'surprised', lines: ['Tracking your cursor with 120 FPS precision! 👀', 'Scanning your git history… looks clean.'] },
  ears: { mood: 'happy', lines: ['Streaming gigabit packets straight to my ears! 📡', '*ear twitch* …did someone push to main?'] },
  nose: { mood: 'surprised', lines: ['Boop detected! System rebooting… 🐽', '*sniff sniff* smells like fresh coffee and syntax errors.'] },
  cheek: { mood: 'love', lines: ['Blush buffer overflow! 💗', 'Aww, stop it, you’ll overheat my cache!'] },
  belly: { mood: 'love', lines: ['Careful! That’s where the high-speed NVMe lives!', 'Hehe, tummy scritches = +50 morale.'] },
  tail: { mood: 'annoyed', lines: ['Hey! That’s my high-gain 5GHz antenna! ⚡', 'Tail-pull interrupt received! Status: annoyed.'] },
  paws: { mood: 'happy', lines: ['Tiny paws, flawless refactors. 🐾', 'Ready to ship production code today!'] },
  cable: { mood: 'happy', lines: ['Crunchy Cat-6… 10 Gbps of pure flavour! 🔌', 'Low-latency snack of champions.'] },
  pet: { mood: 'love', lines: ['Awww 💙 Petting loop initialised! Best dev partner ever.', 'Happiness level: O(1).'] },
  wake: { mood: 'surprised', lines: ['zzz… huh?! I was compiling in the background.', 'Waking from sleep state… ready!'] },
  ram: { mood: 'happy', lines: ['Squeak! Nibbled +16GB of raw bandwidth 🐭⚡', 'Crunchy DDR5 — my favourite byte-sized snack!', 'Mmm, dual-channel flavour.'] },
  floppy: { mood: 'love', lines: ['Ooh, a vintage cracker! 1.44MB of pure crunch. 🐭💾', 'They don’t make snacks this crispy anymore.', 'Read-only, but so tasty.'] },
  hub: { mood: 'surprised', lines: ['Chewed clean through 24 ports of uplink! 🐭🌐', 'Mmm, gigabit-flavoured plastic.', 'Careful — that one was still blinking!'] },
};

function pick(arr: string[]) { return arr[Math.floor(Math.random() * arr.length)]; }

export default function ByteMascot() {
  const [mood, setMood] = useState<Mood>('idle');
  const [speech, setSpeech] = useState<string | null>('Hey! I’m Byte. Click any part of me, or pet me! 🐭⚡');
  const [cableOut, setCableOut] = useState(false);
  const [tamed, setTamed] = useState(false);
  const [blink, setBlink] = useState(false);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });

  const boxRef = useRef<HTMLDivElement>(null);
  const moodTimer = useRef<number | undefined>(undefined);
  const speechTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const t = window.setInterval(() => {
      if (mood === 'idle' || mood === 'happy') { setBlink(true); window.setTimeout(() => setBlink(false), 140); }
    }, 3800);
    return () => window.clearInterval(t);
  }, [mood]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!boxRef.current) return;
      const r = boxRef.current.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const angle = Math.atan2(dy, dx);
      const dist = Math.min(4.5, Math.hypot(dx, dy) * 0.015);
      setPupilOffset({ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const nudge = (m: Mood, text: string) => {
    setMood(m); setSpeech(text);
    window.clearTimeout(moodTimer.current); window.clearTimeout(speechTimer.current);
    speechTimer.current = window.setTimeout(() => setSpeech(null), 3800);
    moodTimer.current = window.setTimeout(() => setMood(tamed ? 'happy' : 'idle'), 3200);
  };

  const react = (key: keyof typeof R) => {
    if (mood === 'sleepy' && key !== 'body') { nudge(R.wake.mood, pick(R.wake.lines)); return; }
    const r = R[key]; nudge(r.mood, pick(r.lines));
    setTamed(true);
  };

  const hit = (key: keyof typeof R) => (e: React.MouseEvent) => {
    e.stopPropagation();
    if (key === 'cable' && cableOut) { setCableOut(false); nudge('happy', 'Nom! Cable re-anchored at 10 Gbps 🔌✨'); return; }
    react(key);
  };

  const pullCable = () => {
    if (cableOut) { setCableOut(false); nudge('happy', 'Ahhh, packet stream restored! 🔌⚡'); }
    else { setCableOut(true); nudge('surprised', pick(['NOOO! Connection timeout! 😱', 'Bandwidth dropping to 0 Kbps! 🚨'])); }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
      <style>{`
        @keyframes byte-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-7px) } }
        @keyframes tail-sway { 0%,100% { transform: rotate(0) } 50% { transform: rotate(9deg) } }
        @keyframes cable-chew { 0%,100% { transform: translateY(0) rotate(0) } 50% { transform: translateY(2px) rotate(-1.5deg) } }
        @keyframes ear-twitch { 0%,92%,100% { transform: rotate(0) } 95% { transform: rotate(-4deg) } 97% { transform: rotate(2deg) } }
        @keyframes spark-glow { 0%,100% { opacity: 0.3; transform: scale(0.9) } 50% { opacity: 1; transform: scale(1.15) } }
        @keyframes tear-drip { 0% { opacity: 0; transform: translateY(0) scale(.6) } 25% { opacity: 1 } 100% { opacity: 0; transform: translateY(22px) scale(1) } }
        .byte-action-btn { background: rgba(8,20,38,0.75); border: 1px solid rgba(56,189,248,0.28); color: #F8FAFC; font-family: ${display}; font-size: 13px; font-weight: 600; padding: 10px 15px; border-radius: 12px; display: inline-flex; align-items: center; gap: 8px; cursor: pointer; transition: all 0.2s ease; }
        .byte-action-btn:hover { background: rgba(2,132,199,0.85); transform: translateY(-2px); box-shadow: 0 8px 22px rgba(2,132,199,0.4); }
        .byte-interactable { cursor: pointer; transition: filter 0.15s ease; }
        .byte-interactable:hover { filter: drop-shadow(0 0 6px rgba(56,189,248,0.6)); }
      `}</style>

      {/* mouse + speech */}
      <div ref={boxRef} style={{ position: 'relative', width: SIZE, height: SIZE }}>
        {speech && (
          <div style={{
            position: 'absolute', top: -12, left: '50%', transform: 'translate(-50%,-100%)',
            width: 'max-content', maxWidth: 250,
            background: 'linear-gradient(135deg, rgba(15,23,42,0.96), rgba(30,41,59,0.92))',
            backdropFilter: 'blur(10px)', border: '1px solid rgba(56,189,248,0.4)', color: '#F0F9FF',
            padding: '12px 16px', borderRadius: 16, fontFamily: display, fontSize: 13.5, lineHeight: 1.45,
            fontWeight: 500, boxShadow: '0 16px 36px rgba(0,0,0,0.35)', pointerEvents: 'none', zIndex: 10,
          }}>
            {speech}
            <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: 10, height: 10, background: 'rgba(15,23,42,0.96)', borderRight: '1px solid rgba(56,189,248,0.4)', borderBottom: '1px solid rgba(56,189,248,0.4)' }} />
          </div>
        )}
        <div style={{ width: SIZE, height: SIZE, userSelect: 'none', animation: mood === 'sleepy' ? 'none' : 'byte-float 3.6s ease-in-out infinite' }}>
          <HighEndByteSvg mood={mood} blink={blink} cableOut={cableOut} hit={hit} pupilOffset={pupilOffset} />
        </div>
      </div>

      {/* controls — hardware snacks Byte can nibble on */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
        {(
          [
            { icon: cableOut ? <PlugIcon /> : <CableIcon />, label: cableOut ? 'Plug cable back' : 'Unseat cable', action: pullCable },
            { icon: <RamIcon />, label: 'Snack: RAM stick', action: () => react('ram') },
            { icon: <FloppyIcon />, label: 'Snack: Floppy disk', action: () => react('floppy') },
            { icon: <HubIcon />, label: 'Snack: Network hub', action: () => react('hub') },
          ] as { icon: ReactNode; label: string; action: () => void }[]
        ).map(({ icon, label, action }) => (
          <button key={label} onClick={action} className="byte-action-btn">
            <span style={{ display: 'inline-flex', width: 16, height: 16 }}>{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>
      <div style={{ fontFamily: display, fontSize: 12, color: 'rgba(255,255,255,0.42)', textAlign: 'center' }}>
        click her eyes, ears, nose, cheeks, tummy, tail, paws — or feed her the hardware below 🐭
      </div>
    </div>
  );
}

/* ── tiny line-icons for the snack buttons, matching the site's blue palette ── */
function CableIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
      <path d="M4 6 Q13 10 20 18" stroke="#7DD3FC" strokeWidth="2.4" strokeLinecap="round" />
      <rect x="17" y="14" width="6" height="6" rx="1" fill="#38BDF8" />
    </svg>
  )
}
function PlugIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
      <path d="M4 6 Q13 10 18 16" stroke="#F87171" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="1 4" />
    </svg>
  )
}
function RamIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
      <rect x="3" y="4" width="18" height="12" rx="1.5" fill="none" stroke="#7DD3FC" strokeWidth="1.6" />
      <rect x="5.5" y="6.5" width="2.4" height="4.5" fill="#38BDF8" />
      <rect x="9.5" y="6.5" width="2.4" height="4.5" fill="#38BDF8" />
      <rect x="13.5" y="6.5" width="2.4" height="4.5" fill="#38BDF8" />
      <rect x="17.5" y="6.5" width="1.6" height="4.5" fill="#38BDF8" />
      {[4, 6, 8, 10, 12, 14, 16, 18, 20].map((x) => <rect key={x} x={x} y="16" width="1" height="3" fill="#94A3B8" />)}
    </svg>
  )
}
function FloppyIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
      <path d="M4 4h13l3 3v13H4z" fill="none" stroke="#7DD3FC" strokeWidth="1.6" strokeLinejoin="round" />
      <rect x="7.5" y="4" width="7" height="6" fill="#38BDF8" />
      <rect x="7" y="14" width="10" height="6" rx="0.5" fill="none" stroke="#94A3B8" strokeWidth="1.2" />
    </svg>
  )
}
function HubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
      <rect x="3" y="8" width="18" height="8" rx="1.5" fill="none" stroke="#7DD3FC" strokeWidth="1.6" />
      {[6, 9.5, 13, 16.5].map((x, i) => <circle key={x} cx={x} cy="12" r="1" fill={i % 2 === 0 ? '#34D399' : '#38BDF8'} />)}
      <path d="M8 8V5M14 8V5" stroke="#94A3B8" strokeWidth="1.2" />
    </svg>
  )
}

/* ══════════════════════════════════════════════════════════════════
   Volumetric vector mouse — shaded entirely in code, no image files.
   Shared by the section mascot and the corner peeker. ══════════════ */
export function HighEndByteSvg({
  mood, blink, cableOut, hit, pupilOffset,
}: {
  mood: Mood; blink: boolean; cableOut: boolean;
  hit: (k: any) => (e: React.MouseEvent) => void;
  pupilOffset: { x: number; y: number };
}) {
  const isChewing = !cableOut && (mood === 'idle' || mood === 'happy');
  const isSleeping = mood === 'sleepy' || blink;

  const eyeInner = (
    <>
      <ellipse cx="0" cy="0" rx="17" ry="21" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
      <path d="M -16 -8 Q 0 -3 16 -8 L 16 -18 L -16 -18 Z" fill="rgba(15,23,42,0.12)" />
      <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
        <ellipse cx="0" cy="0" rx="12.5" ry="15" fill="url(#irisGrad)" />
        <ellipse cx="0" cy="1" rx="7" ry="8.5" fill="#020617" />
        <circle cx="-4" cy="-5" r="4.5" fill="#FFFFFF" />
        <circle cx="4" cy="5" r="2.2" fill="#FFFFFF" opacity="0.8" />
      </g>
    </>
  );

  // downturned, half-lidded, glossy eyes — droopy & pleading
  const sadEye = (left: boolean) => {
    const s = left ? 1 : -1;
    return (
      <g>
        <ellipse cx="0" cy="3" rx="15" ry="17" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        <g transform={`translate(${pupilOffset.x * 0.6}, ${3 + pupilOffset.y * 0.6})`}>
          <ellipse cx="0" cy="2" rx="11" ry="13" fill="url(#irisGrad)" />
          <ellipse cx="0" cy="3" rx="6" ry="7.5" fill="#020617" />
          <circle cx={-3 * s} cy="-3" r="4.5" fill="#FFFFFF" />
          <circle cx={3 * s} cy="5" r="2.4" fill="#FFFFFF" opacity="0.85" />
        </g>
        {/* droopy upper lid */}
        <path d={`M ${-17 * s} -8 Q 0 -14 ${16 * s} -2 L ${17 * s} -20 L ${-17 * s} -20 Z`} fill="url(#headFurGrad)" />
        <path d={`M ${-17 * s} -8 Q 0 -14 ${16 * s} -2`} fill="none" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
        {/* worried inner brow */}
        <path d={`M ${-15 * s} -16 Q ${-2 * s} -22 ${8 * s} -19`} fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      </g>
    );
  };

  return (
    <svg width="100%" height="100%" viewBox="0 0 280 290" style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id="bodyFurGrad" cx="38%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#FFFFFF" /><stop offset="40%" stopColor="#F1F5F9" /><stop offset="85%" stopColor="#CBD5E1" /><stop offset="100%" stopColor="#94A3B8" />
        </radialGradient>
        <radialGradient id="headFurGrad" cx="36%" cy="26%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" /><stop offset="42%" stopColor="#F8FAFC" /><stop offset="80%" stopColor="#CBD5E1" /><stop offset="100%" stopColor="#94A3B8" />
        </radialGradient>
        <radialGradient id="bellyGrad" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" /><stop offset="70%" stopColor="#F8FAFC" /><stop offset="100%" stopColor="#E2E8F0" />
        </radialGradient>
        <radialGradient id="innerEarGrad" cx="44%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#FDE8EF" /><stop offset="40%" stopColor="#FBCFE8" /><stop offset="85%" stopColor="#F472B6" /><stop offset="100%" stopColor="#DB2777" />
        </radialGradient>
        <radialGradient id="irisGrad" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#38BDF8" /><stop offset="35%" stopColor="#0284C7" /><stop offset="75%" stopColor="#0F172A" /><stop offset="100%" stopColor="#020617" />
        </radialGradient>
        <linearGradient id="cat6Grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38BDF8" /><stop offset="30%" stopColor="#0284C7" /><stop offset="75%" stopColor="#0369A1" /><stop offset="100%" stopColor="#075985" />
        </linearGradient>
        <radialGradient id="tearGrad" cx="38%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#E0F5FF" /><stop offset="55%" stopColor="#7DD3FC" /><stop offset="100%" stopColor="#0EA5E9" />
        </radialGradient>
        <linearGradient id="rj45PlasticGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.85)" /><stop offset="40%" stopColor="rgba(226,232,240,0.6)" /><stop offset="100%" stopColor="rgba(100,116,139,0.9)" />
        </linearGradient>
        <filter id="shadowBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" /><feOffset dx="0" dy="5" />
          <feComponentTransfer><feFuncA type="linear" slope="0.3" /></feComponentTransfer>
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="sparkGlow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>

      {/* ground shadow */}
      <ellipse cx="140" cy="265" rx="84" ry="16" fill="rgba(11,19,43,0.2)" />

      {/* tail */}
      <g className="byte-interactable" onClick={hit('tail')} style={{ transformOrigin: '190px 225px', animation: mood === 'sleepy' ? 'none' : 'tail-sway 3.2s ease-in-out infinite' }}>
        <path d="M 186 230 C 235 240, 260 195, 235 155 C 220 130, 238 95, 252 82" fill="none" stroke="#94A3B8" strokeWidth="11" strokeLinecap="round" />
        <path d="M 186 230 C 235 240, 260 195, 235 155 C 220 130, 238 95, 252 82" fill="none" stroke="url(#bodyFurGrad)" strokeWidth="7.5" strokeLinecap="round" />
        <circle cx="253" cy="81" r="6" fill="#38BDF8" filter="url(#sparkGlow)" /><circle cx="253" cy="81" r="3" fill="#FFFFFF" />
      </g>

      {/* ears */}
      <g className="byte-interactable" onClick={hit('ears')} style={{ animation: 'ear-twitch 5s ease-in-out infinite' }}>
        <g transform="translate(85, 78) rotate(-16)"><ellipse cx="0" cy="0" rx="38" ry="42" fill="url(#bodyFurGrad)" stroke="#94A3B8" strokeWidth="1.5" filter="url(#shadowBlur)" /><ellipse cx="-1" cy="2" rx="26" ry="30" fill="url(#innerEarGrad)" /></g>
        <g transform="translate(195, 78) rotate(16)"><ellipse cx="0" cy="0" rx="38" ry="42" fill="url(#bodyFurGrad)" stroke="#94A3B8" strokeWidth="1.5" filter="url(#shadowBlur)" /><ellipse cx="1" cy="2" rx="26" ry="30" fill="url(#innerEarGrad)" /></g>
      </g>

      {/* torso & belly */}
      <g className="byte-interactable" onClick={hit('belly')}>
        <path d="M 92 170 C 65 200, 70 252, 110 258 C 130 261, 150 261, 170 258 C 210 252, 215 200, 188 170 Z" fill="url(#bodyFurGrad)" stroke="#94A3B8" strokeWidth="1.2" filter="url(#shadowBlur)" />
        <ellipse cx="140" cy="216" rx="42" ry="36" fill="url(#bellyGrad)" opacity="0.95" />
      </g>

      {/* back paws */}
      <g className="byte-interactable" onClick={hit('paws')}>
        <ellipse cx="98" cy="254" rx="19" ry="11" fill="url(#bodyFurGrad)" stroke="#94A3B8" strokeWidth="1" /><ellipse cx="98" cy="254" rx="10" ry="6" fill="url(#innerEarGrad)" opacity="0.85" />
        <ellipse cx="182" cy="254" rx="19" ry="11" fill="url(#bodyFurGrad)" stroke="#94A3B8" strokeWidth="1" /><ellipse cx="182" cy="254" rx="10" ry="6" fill="url(#innerEarGrad)" opacity="0.85" />
      </g>

      {/* head */}
      <g className="byte-interactable" onClick={hit('body')}>
        <ellipse cx="140" cy="142" rx="66" ry="58" fill="url(#headFurGrad)" stroke="#94A3B8" strokeWidth="1.2" filter="url(#shadowBlur)" />
        <circle cx="94" cy="162" r="16" fill="#FB7185" opacity="0.3" filter="url(#shadowBlur)" /><circle cx="186" cy="162" r="16" fill="#FB7185" opacity="0.3" filter="url(#shadowBlur)" />
        <ellipse cx="140" cy="164" rx="34" ry="24" fill="url(#bellyGrad)" />
      </g>

      {/* eyes */}
      <g className="byte-interactable" onClick={hit('eyes')}>
        <g transform="translate(112, 134)">
          {isSleeping ? <path d="M -16 2 Q 0 16 16 2" fill="none" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" /> :
           mood === 'annoyed' ? <g><path d="M -16 -8 L 14 2" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" /><ellipse cx="0" cy="5" rx="12" ry="11" fill="url(#irisGrad)" /><circle cx="-2" cy="3" r="3" fill="#FFFFFF" /></g> :
           mood === 'sad' ? sadEye(true) :
           <g>{eyeInner}</g>}
        </g>
        <g transform="translate(168, 134)">
          {isSleeping ? <path d="M -16 2 Q 0 16 16 2" fill="none" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" /> :
           mood === 'annoyed' ? <g><path d="M 16 -8 L -14 2" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" /><ellipse cx="0" cy="5" rx="12" ry="11" fill="url(#irisGrad)" /><circle cx="-2" cy="3" r="3" fill="#FFFFFF" /></g> :
           mood === 'sad' ? sadEye(false) :
           <g>{eyeInner}</g>}
        </g>
        {mood === 'sad' && (
          <g transform="translate(104, 150)" style={{ transformOrigin: '104px 150px' }}>
            <g style={{ animation: 'tear-drip 2.2s ease-in infinite' }}>
              <path d="M 0 0 C -5 8, -5 13, 0 15 C 5 13, 5 8, 0 0 Z" fill="url(#tearGrad)" stroke="#38BDF8" strokeWidth="0.8" />
              <ellipse cx="-1.6" cy="8" rx="1.6" ry="2.4" fill="#FFFFFF" opacity="0.85" />
            </g>
          </g>
        )}
      </g>

      {/* nose & whiskers */}
      <g className="byte-interactable" onClick={hit('nose')}>
        <g stroke="#94A3B8" strokeWidth="1.6" strokeLinecap="round" opacity="0.75">
          <path d="M 104 163 C 70 157, 45 152, 35 150" /><path d="M 104 168 C 72 172, 48 178, 38 184" />
          <path d="M 176 163 C 210 157, 235 152, 245 150" /><path d="M 176 168 C 208 172, 232 178, 242 184" />
        </g>
        <path d="M 134 154 C 134 150, 146 150, 146 154 C 146 160, 140 165, 140 165 C 140 165, 134 160, 134 154 Z" fill="#FB7185" />
        <ellipse cx="138" cy="153" rx="2.5" ry="1.4" fill="#FFFFFF" opacity="0.85" />
      </g>

      {/* mouth */}
      {mood === 'surprised' ? <ellipse cx="140" cy="174" rx="8" ry="10" fill="#9F1239" /> :
       mood === 'annoyed' ? <path d="M 128 175 Q 140 168 152 175" fill="none" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" /> :
       mood === 'sad' ? <path d="M 128 179 Q 140 170 152 179" fill="none" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" /> :
       <path d="M 128 171 Q 140 182 152 171" fill="none" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />}

      {/* cable + connector */}
      {!cableOut && (
        <g className="byte-interactable" onClick={hit('cable')} style={{ transformOrigin: '140px 174px', animation: isChewing ? 'cable-chew 0.45s ease-in-out infinite' : 'none' }}>
          <path d="M 140 174 Q 185 180 216 232" fill="none" stroke="url(#cat6Grad)" strokeWidth="11" strokeLinecap="round" filter="url(#shadowBlur)" />
          <path d="M 140 174 Q 185 180 216 232" fill="none" stroke="#7DD3FC" strokeWidth="2.8" strokeLinecap="round" opacity="0.6" />
          {isChewing && (
            <g filter="url(#sparkGlow)" style={{ animation: 'spark-glow 0.8s ease-in-out infinite' }}>
              <polygon points="144,168 147,163 150,168 155,170 150,172 147,177 144,172 139,170" fill="#FDE047" /><circle cx="152" cy="164" r="1.5" fill="#38BDF8" />
            </g>
          )}
          <g transform="translate(202, 218) rotate(32)">
            <path d="M -4 2 L 6 -6 L 14 -6 L 16 16 L 4 16 Z" fill="#0369A1" stroke="#0C4A6E" strokeWidth="1" />
            <rect x="14" y="-5" width="26" height="20" rx="3" fill="url(#rj45PlasticGrad)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" filter="url(#shadowBlur)" />
            <path d="M 16 5 L 32 14 L 16 11 Z" fill="rgba(255,255,255,0.85)" stroke="#64748B" strokeWidth="1" />
            {[17, 20, 23, 26, 29, 32, 35].map((xPin) => <rect key={xPin} x={xPin} y="-3" width="2" height="7" rx="0.5" fill="#FDE047" />)}
          </g>
        </g>
      )}

      {/* front paws */}
      {!cableOut && (
        <g className="byte-interactable" onClick={hit('paws')}>
          <g transform="translate(122, 184)"><ellipse cx="0" cy="0" rx="11" ry="9" fill="url(#bodyFurGrad)" stroke="#94A3B8" strokeWidth="1" filter="url(#shadowBlur)" /><circle cx="-4" cy="2" r="2.2" fill="url(#innerEarGrad)" opacity="0.8" /><circle cx="1" cy="4" r="2.2" fill="url(#innerEarGrad)" opacity="0.8" /><circle cx="6" cy="2" r="2.2" fill="url(#innerEarGrad)" opacity="0.8" /></g>
          <g transform="translate(158, 184)"><ellipse cx="0" cy="0" rx="11" ry="9" fill="url(#bodyFurGrad)" stroke="#94A3B8" strokeWidth="1" filter="url(#shadowBlur)" /><circle cx="-5" cy="2" r="2.2" fill="url(#innerEarGrad)" opacity="0.8" /><circle cx="0" cy="4" r="2.2" fill="url(#innerEarGrad)" opacity="0.8" /><circle cx="5" cy="2" r="2.2" fill="url(#innerEarGrad)" opacity="0.8" /></g>
        </g>
      )}

      {/* severed cable mode → click to reconnect */}
      {cableOut && (
        <g className="byte-interactable" onClick={hit('cable')} transform="translate(160, 160)" style={{ animation: 'spark-glow 2s infinite' }}>
          <path d="M 0 0 C 30 15, 45 60, 65 80" fill="none" stroke="url(#cat6Grad)" strokeWidth="10" strokeLinecap="round" />
          <path d="M 0 0 L -6 -6" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" /><path d="M 0 0 L 2 -8" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="0" cy="0" r="4" fill="#FDE047" filter="url(#sparkGlow)" />
        </g>
      )}
    </svg>
  );
}
