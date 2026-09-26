import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { MASCOT_COPY, type ReactionKey } from '../mascotCopy'
import { RTL_LANGS, type Lang } from '../i18n'
import { HighEndByteSvg } from './ByteSvg'

export { HighEndByteSvg }
export type Mood = 'idle' | 'happy' | 'love' | 'annoyed' | 'surprised' | 'sleepy' | 'sad'

const SIZE = 260
const MOUTH = { x: 140 / 280, y: 174 / 290 } // mouth position inside the mascot box (fraction)
const SLEEP_AFTER = 22000
const FULL_AT = 5

const MOODS: Record<ReactionKey, Mood> = {
  body: 'happy', eyes: 'surprised', ears: 'happy', nose: 'surprised', belly: 'love', tail: 'annoyed', paws: 'happy',
  cable: 'happy', pet: 'love', wake: 'surprised', ram: 'love', floppy: 'love', hub: 'love', full: 'surprised',
}

type Snack = 'ram' | 'floppy' | 'hub'
const SNACK_GAIN: Record<Snack, string> = { ram: '+16 GB', floppy: '+1.44 MB', hub: '+24 ports' }

type Particle = { id: number; x: number; y: number; kind: 'crumb' | 'heart' | 'gain' | 'spark' | 'z'; dx: number; dy: number; r: number; text?: string; color?: string }
type Flyer = { id: number; snack: Snack; fx: number; fy: number; tx: number; ty: number }

let pid = 1
function pick<T>(arr: T[]) { return arr[Math.floor(Math.random() * arr.length)] }

export default function ByteMascot({ lang }: { lang: Lang }) {
  const c = MASCOT_COPY[lang]
  const rtl = RTL_LANGS.includes(lang)
  const font = rtl ? "'Noto Kufi Arabic', 'Noto Sans Arabic', Tahoma, sans-serif" : "'Sora', sans-serif"

  const rootRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const moodTimer = useRef<number | undefined>(undefined)
  const speechTimer = useRef<number | undefined>(undefined)
  const idleTimer = useRef<number | undefined>(undefined)
  const petDist = useRef(0)
  const petLast = useRef<{ x: number; y: number } | null>(null)
  const pressing = useRef(false)

  const [mood, setMood] = useState<Mood>('idle')
  const [speech, setSpeech] = useState<string | null>(c.intro)
  const [cableOut, setCableOut] = useState(false)
  const [blink, setBlink] = useState(false)
  const [pupil, setPupil] = useState({ x: 0, y: 0 })
  const [munching, setMunching] = useState(false)
  const [fed, setFed] = useState(0)
  const [particles, setParticles] = useState<Particle[]>([])
  const [flyers, setFlyers] = useState<Flyer[]>([])
  const [bounce, setBounce] = useState(0)

  /* restart greeting when the language changes */
  useEffect(() => { setSpeech(c.intro) }, [lang]) // eslint-disable-line react-hooks/exhaustive-deps

  /* blinking */
  useEffect(() => {
    const t = window.setInterval(() => { setBlink(true); window.setTimeout(() => setBlink(false), 140) }, 3600)
    return () => window.clearInterval(t)
  }, [])

  /* falls asleep when nobody plays with him */
  const poke = useCallback(() => {
    window.clearTimeout(idleTimer.current)
    idleTimer.current = window.setTimeout(() => {
      setMood('sleepy'); setSpeech(null)
    }, SLEEP_AFTER)
  }, [])
  useEffect(() => { poke(); return () => window.clearTimeout(idleTimer.current) }, [poke])

  /* floating Zzz while asleep */
  useEffect(() => {
    if (mood !== 'sleepy') return
    const t = window.setInterval(() => {
      const m = mouthPoint(); if (!m) return
      burst(m.x + 40, m.y - 90, 'z', 1, { text: 'z' })
    }, 1100)
    return () => window.clearInterval(t)
  }, [mood]) // eslint-disable-line react-hooks/exhaustive-deps

  /* eyes follow mouse and finger */
  useEffect(() => {
    const look = (x: number, y: number) => {
      const r = boxRef.current?.getBoundingClientRect(); if (!r) return
      const dx = x - (r.left + r.width / 2), dy = y - (r.top + r.height / 2)
      const a = Math.atan2(dy, dx), d = Math.min(4.5, Math.hypot(dx, dy) * 0.015)
      setPupil({ x: Math.cos(a) * d, y: Math.sin(a) * d })
    }
    const mm = (e: MouseEvent) => look(e.clientX, e.clientY)
    const tm = (e: TouchEvent) => { const t = e.touches[0]; if (t) look(t.clientX, t.clientY) }
    window.addEventListener('mousemove', mm)
    window.addEventListener('touchmove', tm, { passive: true })
    return () => { window.removeEventListener('mousemove', mm); window.removeEventListener('touchmove', tm) }
  }, [])

  /* ── helpers ── */
  const local = (clientX: number, clientY: number) => {
    const r = rootRef.current!.getBoundingClientRect()
    return { x: clientX - r.left, y: clientY - r.top }
  }
  const mouthPoint = () => {
    const b = boxRef.current?.getBoundingClientRect(); if (!b || !rootRef.current) return null
    return local(b.left + b.width * MOUTH.x, b.top + b.height * MOUTH.y)
  }
  const burst = (x: number, y: number, kind: Particle['kind'], n: number, extra: Partial<Particle> = {}) => {
    const colors = ['#38BDF8', '#FDE047', '#F472B6', '#34D399', '#A78BFA']
    const ps: Particle[] = Array.from({ length: n }, () => ({
      id: pid++, x, y, kind,
      dx: kind === 'crumb' ? (Math.random() - 0.5) * 120 : kind === 'z' ? 18 : (Math.random() - 0.5) * 50,
      dy: kind === 'crumb' ? 20 + Math.random() * 60 : -(50 + Math.random() * 50),
      r: (Math.random() - 0.5) * 360,
      color: pick(colors),
      ...extra,
    }))
    setParticles((p) => [...p, ...ps])
    window.setTimeout(() => setParticles((p) => p.filter((q) => !ps.includes(q))), 1500)
  }
  const say = (m: Mood, text: string | null, ms = 3400) => {
    setMood(m)
    window.clearTimeout(moodTimer.current); window.clearTimeout(speechTimer.current)
    if (text) { setSpeech(text); speechTimer.current = window.setTimeout(() => setSpeech(null), ms) }
    moodTimer.current = window.setTimeout(() => setMood('happy'), 3000)
    setBounce((b) => b + 1)
    poke()
  }
  const react = (key: ReactionKey) => {
    if (mood === 'sleepy') { say('surprised', pick(c.lines.wake)); return }
    say(MOODS[key], pick(c.lines[key]))
  }

  /* tapping a body part: reaction + a little sparkle where you tapped */
  const hit = (key: ReactionKey) => (e: React.MouseEvent) => {
    e.stopPropagation()
    const p = local(e.clientX, e.clientY)
    burst(p.x, p.y, key === 'belly' || key === 'pet' ? 'heart' : 'spark', 5)
    if (key === 'cable' && cableOut) { plugIn(); return }
    react(key)
  }

  const plugIn = () => { setCableOut(false); say('happy', c.cableBack) }
  const toggleCable = () => {
    if (cableOut) { plugIn(); return }
    setCableOut(true); say('sad', c.cableOut)
    const m = mouthPoint(); if (m) burst(m.x + 30, m.y + 10, 'spark', 8)
  }

  /* feeding: the snack flies from the button into his mouth */
  const feed = (snack: Snack, e: React.MouseEvent<HTMLButtonElement>) => {
    const m = mouthPoint(); if (!m) return
    if (mood === 'sleepy') say('surprised', pick(c.lines.wake))
    const b = e.currentTarget.getBoundingClientRect()
    const f = local(b.left + b.width / 2, b.top + b.height / 2)
    setFlyers((fl) => [...fl, { id: pid++, snack, fx: f.x, fy: f.y, tx: m.x, ty: m.y }])
    poke()
  }
  const landed = (fl: Flyer) => {
    setFlyers((all) => all.filter((x) => x.id !== fl.id))
    burst(fl.tx, fl.ty, 'crumb', 10)
    burst(fl.tx + 70, fl.ty - 60, 'gain', 1, { text: SNACK_GAIN[fl.snack], dx: 10, dy: -70 })
    burst(fl.tx, fl.ty - 20, 'heart', 3)
    setMunching(true)
    window.setTimeout(() => setMunching(false), 1300)
    setFed((n) => {
      const next = n + 1
      if (next >= FULL_AT) {
        say('surprised', pick(c.lines.full), 3800)
        window.setTimeout(() => setFed(0), 9000)
      } else {
        say('love', pick(c.lines[fl.snack]))
      }
      return next
    })
  }

  /* petting: drag across him (finger or mouse button held) */
  const petMove = (x: number, y: number) => {
    const last = petLast.current
    petLast.current = { x, y }
    if (!last) return
    petDist.current += Math.hypot(x - last.x, y - last.y)
    if (petDist.current > 70) {
      petDist.current = 0
      const p = local(x, y)
      burst(p.x, p.y - 10, 'heart', 1)
      if (mood !== 'love') say('love', pick(c.lines.pet))
      else poke()
    }
  }

  const full = fed >= FULL_AT

  return (
    <div ref={rootRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
      <style>{`
        @keyframes byte-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-7px) } }
        @keyframes byte-bounce { 0% { transform: scale(1,1) } 30% { transform: scale(1.06,.94) } 55% { transform: scale(.97,1.04) translateY(-8px) } 100% { transform: scale(1,1) } }
        @keyframes byte-munch { 0%,100% { transform: translateY(0) rotate(0) } 25% { transform: translateY(3px) rotate(-2deg) } 75% { transform: translateY(3px) rotate(2deg) } }
        @keyframes byte-chomp { 0%,100% { transform: scaleY(1) } 50% { transform: scaleY(.35) } }
        @keyframes tail-sway { 0%,100% { transform: rotate(0) } 50% { transform: rotate(9deg) } }
        @keyframes cable-chew { 0%,100% { transform: translateY(0) rotate(0) } 50% { transform: translateY(2px) rotate(-1.5deg) } }
        @keyframes ear-twitch { 0%,92%,100% { transform: rotate(0) } 95% { transform: rotate(-4deg) } 97% { transform: rotate(2deg) } }
        @keyframes spark-glow { 0%,100% { opacity: 0.3; transform: scale(0.9) } 50% { opacity: 1; transform: scale(1.15) } }
        @keyframes tear-drip { 0% { opacity: 0; transform: translateY(0) scale(.6) } 25% { opacity: 1 } 100% { opacity: 0; transform: translateY(22px) scale(1) } }
        @keyframes bubble-in { from { opacity: 0; transform: translate(-50%, -90%) scale(.85) } to { opacity: 1; transform: translate(-50%, -100%) scale(1) } }
        @keyframes pt-fly { 0% { opacity: 0; transform: translate(-50%,-50%) scale(.4) } 15% { opacity: 1 } 100% { opacity: 0; transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) rotate(var(--r)) scale(1) } }
        @keyframes pt-rise { 0% { opacity: 0; transform: translate(-50%,-50%) scale(.6) } 20% { opacity: 1; transform: translate(-50%,-70%) scale(1.1) } 100% { opacity: 0; transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(1) } }
        .snack-btn { position: relative; background: linear-gradient(160deg, rgba(14,165,233,0.14), rgba(8,20,38,0.85)); border: 1px solid rgba(56,189,248,0.3); color: #F8FAFC; font-family: ${font}; font-size: 14px; font-weight: 700; padding: 12px 14px; border-radius: 16px; display: flex; flex-direction: column; align-items: center; gap: 6px; cursor: pointer; transition: transform .2s cubic-bezier(.3,1.6,.5,1), box-shadow .25s, border-color .25s; -webkit-tap-highlight-color: transparent; min-width: 0; }
        .snack-btn:hover { transform: translateY(-3px); border-color: rgba(56,189,248,.7); box-shadow: 0 10px 28px rgba(2,132,199,.35); }
        .snack-btn:active { transform: scale(.94); }
        .snack-btn .snack-art { height: 40px; display: flex; align-items: center; justify-content: center; transition: transform .25s cubic-bezier(.3,1.6,.5,1); }
        .snack-btn:hover .snack-art { transform: rotate(-8deg) scale(1.1); }
        .byte-interactable { cursor: pointer; transition: filter 0.15s ease; }
        .byte-interactable:hover { filter: drop-shadow(0 0 6px rgba(56,189,248,0.6)); }
        .snack-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; width: min(560px, 100%); }
        @media (max-width: 560px) { .snack-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
      `}</style>

      {/* mascot stage */}
      <div
        ref={boxRef}
        style={{ position: 'relative', width: SIZE, height: SIZE, touchAction: 'pan-y' }}
        onPointerDown={(e) => { pressing.current = true; petLast.current = { x: e.clientX, y: e.clientY }; petDist.current = 0 }}
        onPointerUp={() => { pressing.current = false; petLast.current = null }}
        onPointerLeave={() => { pressing.current = false; petLast.current = null }}
        onPointerMove={(e) => { if (pressing.current || e.pointerType === 'touch') petMove(e.clientX, e.clientY) }}
      >
        {/* soft glow floor */}
        <div style={{ position: 'absolute', left: '50%', bottom: -6, width: 220, height: 40, marginLeft: -110, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(56,189,248,0.28), transparent)', pointerEvents: 'none' }} />
        {speech && (
          <div key={speech} dir={rtl ? 'rtl' : 'ltr'} style={{
            position: 'absolute', top: -14, left: '50%', transform: 'translate(-50%,-100%)',
            width: 'max-content', maxWidth: 'min(280px, 86vw)',
            background: '#fff', color: '#0b1a30',
            padding: '11px 16px', borderRadius: 18, fontFamily: font, fontSize: 14.5, lineHeight: 1.55, textAlign: 'center',
            fontWeight: 700, boxShadow: '0 16px 36px rgba(0,0,0,0.35)', pointerEvents: 'none', zIndex: 10,
            animation: 'bubble-in .28s cubic-bezier(.3,1.6,.5,1)',
          }}>
            {speech}
            <div style={{ position: 'absolute', bottom: -6, left: '50%', marginLeft: -6, width: 12, height: 12, background: '#fff', transform: 'rotate(45deg)', borderRadius: 2 }} />
          </div>
        )}
        <div key={bounce} style={{ width: SIZE, height: SIZE, userSelect: 'none', animation: munching ? 'byte-munch .22s ease-in-out infinite' : 'byte-bounce .45s ease-out' }}>
          <div style={{ width: '100%', height: '100%', animation: mood === 'sleepy' || munching ? 'none' : 'byte-float 3.6s ease-in-out infinite' }}>
            <HighEndByteSvg mood={mood} blink={blink} cableOut={cableOut} hit={hit} pupilOffset={pupil} munching={munching} full={full} uid="main" />
          </div>
        </div>
      </div>

      {/* snack tray */}
      <div className="snack-grid">
        {([
          { key: 'cable', art: cableOut ? <PlugArt /> : <CableArt />, label: cableOut ? c.buttons.plug : c.buttons.unplug, onClick: () => toggleCable() },
          { key: 'ram', art: <RamArt />, label: c.buttons.ram, onClick: (e: React.MouseEvent<HTMLButtonElement>) => feed('ram', e) },
          { key: 'floppy', art: <FloppyArt />, label: c.buttons.floppy, onClick: (e: React.MouseEvent<HTMLButtonElement>) => feed('floppy', e) },
          { key: 'hub', art: <HubArt />, label: c.buttons.hub, onClick: (e: React.MouseEvent<HTMLButtonElement>) => feed('hub', e) },
        ] as { key: string; art: ReactNode; label: string; onClick: (e: React.MouseEvent<HTMLButtonElement>) => void }[]).map((b) => (
          <button key={b.key} className="snack-btn" onClick={b.onClick} aria-label={b.label}>
            <span className="snack-art">{b.art}</span>
            <span style={{ lineHeight: 1.3, textAlign: 'center' }}>{b.label}</span>
          </button>
        ))}
      </div>
      <div dir={rtl ? 'rtl' : 'ltr'} style={{ fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.55)', textAlign: 'center', maxWidth: 460, lineHeight: 1.8 }}>
        {c.caption}
      </div>

      {/* flying snacks + particles (above everything in this section) */}
      <div aria-hidden dir="ltr" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 20 }}>
        {flyers.map((f) => <FlyingSnack key={f.id} f={f} onDone={() => landed(f)} />)}
        {particles.map((p) => (
          <span key={p.id} style={{
            position: 'absolute', left: p.x, top: p.y,
            ['--dx' as string]: `${p.dx}px`, ['--dy' as string]: `${p.dy}px`, ['--r' as string]: `${p.r}deg`,
            animation: `${p.kind === 'crumb' || p.kind === 'spark' ? 'pt-fly' : 'pt-rise'} ${p.kind === 'gain' ? 1.4 : 1.1}s ease-out forwards`,
            ...(p.kind === 'crumb' ? { width: 6, height: 6, borderRadius: 1.5, background: p.color } :
              p.kind === 'spark' ? { width: 7, height: 7, borderRadius: '50%', background: p.color, boxShadow: `0 0 10px ${p.color}` } :
              p.kind === 'heart' ? { fontSize: 20 } :
              p.kind === 'z' ? { fontSize: 20, fontWeight: 800, color: '#7DD3FC', fontFamily: "'Sora', sans-serif" } :
              { fontSize: 15, fontWeight: 800, color: '#FDE047', fontFamily: "'JetBrains Mono', monospace", textShadow: '0 2px 10px rgba(0,0,0,.6)', whiteSpace: 'nowrap' }),
          }}>{p.kind === 'heart' ? '💙' : p.text ?? ''}</span>
        ))}
      </div>
    </div>
  )
}

/* a snack flying in an arc from its button into Byte's mouth */
function FlyingSnack({ f, onDone }: { f: Flyer; onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const midX = (f.fx + f.tx) / 2, midY = Math.min(f.fy, f.ty) - 110
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const a = el.animate([
      { transform: `translate(${f.fx}px, ${f.fy}px) translate(-50%,-50%) scale(.9) rotate(0deg)` },
      { transform: `translate(${midX}px, ${midY}px) translate(-50%,-50%) scale(1.35) rotate(-160deg)`, offset: 0.55 },
      { transform: `translate(${f.tx}px, ${f.ty}px) translate(-50%,-50%) scale(.25) rotate(-340deg)`, opacity: 0.9 },
    ], { duration: reduce ? 1 : 780, easing: 'cubic-bezier(.35,.1,.35,1)', fill: 'forwards' })
    a.onfinish = onDone
    return () => a.cancel()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  const Art = f.snack === 'ram' ? RamArt : f.snack === 'floppy' ? FloppyArt : HubArt
  return <div ref={ref} style={{ position: 'absolute', left: 0, top: 0, filter: 'drop-shadow(0 8px 14px rgba(0,0,0,.5))' }}><Art big /></div>
}

/* ── snack art: real little hardware pieces ── */
function RamArt({ big = false }: { big?: boolean }) {
  const w = big ? 74 : 58
  return (
    <svg width={w} height={w * 0.45} viewBox="0 0 74 33" aria-hidden>
      <rect x="1" y="1" width="72" height="24" rx="2" fill="#065F46" stroke="#34D399" strokeWidth="1.2" />
      {[6, 21, 36, 51].map((x) => <rect key={x} x={x} y="5" width="12" height="12" rx="1" fill="#0F172A" stroke="#475569" strokeWidth=".6" />)}
      <rect x="4" y="19" width="66" height="2" fill="#10B981" opacity=".6" />
      {Array.from({ length: 16 }).map((_, i) => <rect key={i} x={4 + i * 4.2} y="25" width="2.6" height="7" fill="#FBBF24" />)}
      <rect x="35" y="25" width="4" height="8" fill="#050D1A" />
    </svg>
  )
}
function FloppyArt({ big = false }: { big?: boolean }) {
  const s = big ? 52 : 38
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" aria-hidden>
      <path d="M3 3h29l5 5v29H3z" fill="#1D4ED8" stroke="#93C5FD" strokeWidth="1.2" strokeLinejoin="round" />
      <rect x="10" y="3" width="18" height="12" fill="#CBD5E1" /><rect x="22" y="5" width="4" height="8" fill="#1E293B" />
      <rect x="8" y="21" width="24" height="16" rx="1" fill="#F8FAFC" />
      <path d="M11 26h18M11 30h14" stroke="#94A3B8" strokeWidth="1.2" />
    </svg>
  )
}
function HubArt({ big = false }: { big?: boolean }) {
  const w = big ? 76 : 60
  return (
    <svg width={w} height={w * 0.45} viewBox="0 0 76 34" aria-hidden>
      <rect x="1" y="6" width="74" height="24" rx="4" fill="#1E293B" stroke="#7DD3FC" strokeWidth="1.2" />
      {[8, 22, 36, 50].map((x) => <rect key={x} x={x} y="13" width="11" height="9" rx="1" fill="#020617" stroke="#475569" strokeWidth=".6" />)}
      {[13, 27, 41, 55].map((x, i) => <circle key={x} cx={x} cy="26.5" r="1.5" fill={i % 2 ? '#FBBF24' : '#34D399'} />)}
      <path d="M16 6V1M60 6V1" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <circle cx="68" cy="12" r="1.8" fill="#38BDF8" />
    </svg>
  )
}
function CableArt() {
  return (
    <svg width="52" height="36" viewBox="0 0 52 36" aria-hidden>
      <path d="M2 8 Q22 8 30 22" stroke="#0284C7" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M2 8 Q22 8 30 22" stroke="#7DD3FC" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity=".6" />
      <g transform="translate(27 17) rotate(35)">
        <rect x="0" y="0" width="18" height="13" rx="2" fill="rgba(226,232,240,.9)" stroke="#fff" />
        {[2, 5, 8, 11, 14].map((x) => <rect key={x} x={x} y="1.5" width="1.6" height="5" fill="#FDE047" />)}
      </g>
    </svg>
  )
}
function PlugArt() {
  return (
    <svg width="52" height="36" viewBox="0 0 52 36" aria-hidden>
      <path d="M2 8 Q22 8 30 22" stroke="#0284C7" strokeWidth="5" fill="none" strokeLinecap="round" strokeDasharray="3 5" />
      <circle cx="36" cy="24" r="7" fill="none" stroke="#34D399" strokeWidth="2" />
      <path d="M36 20v8M32 24h8" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
