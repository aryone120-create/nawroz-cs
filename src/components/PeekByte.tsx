import { useEffect, useRef, useState } from 'react'
import { HighEndByteSvg, type Mood } from './MouseMascot'
import { MASCOT_COPY } from '../mascotCopy'
import { RTL_LANGS, type Lang } from '../i18n'

/* ── Peeking Byte ──
   The same mouse as the section mascot, peeking up from the true bottom edge
   of the screen on the reading-end side (right in English, left in Kurdish/Arabic).

   Behaviour:
   - stays out of the way on the hero, so the first impression is clean
   - hides while her own section is on screen
   - her bubble shows briefly, then fades so it never permanently covers content;
     it comes back when the cursor comes near, or when you leave her section (sad)
   - can be dismissed for the rest of the visit
   - eyes follow the cursor */

const HIDE_KEY = 'peekbyte-hidden'

function readHidden() {
  try { return sessionStorage.getItem(HIDE_KEY) === '1' } catch { return false }
}
function writeHidden() {
  try { sessionStorage.setItem(HIDE_KEY, '1') } catch { /* private mode etc. — fine */ }
}

export default function PeekByte({ lang }: { lang: Lang }) {
  const c = MASCOT_COPY[lang].peek
  const rtl = RTL_LANGS.includes(lang)
  const font = rtl ? "'Noto Kufi Arabic', Tahoma, sans-serif" : "'Sora', sans-serif"

  const winRef = useRef<HTMLDivElement>(null)
  const wasAtSection = useRef(false)
  const sadTimer = useRef<number | undefined>(undefined)
  const bubbleTimer = useRef<number | undefined>(undefined)

  const [pupil, setPupil] = useState({ x: 0, y: 0 })
  const [mood, setMood] = useState<Mood>('idle')
  const [near, setNear] = useState(false)
  const [atSection, setAtSection] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const [enabled, setEnabled] = useState(false)
  const [dismissed, setDismissed] = useState(readHidden)
  const [bubbleOn, setBubbleOn] = useState(false)
  const [svgW, setSvgW] = useState(200)

  /* size to the screen; skip very short screens (landscape phones) */
  useEffect(() => {
    const check = () => {
      setEnabled(window.innerHeight > 430)
      setSvgW(window.innerWidth < 560 ? 120 : 176)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  /* only appear once the visitor has scrolled past most of the hero */
  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* hide while her section is on screen; get sad when leaving it */
  useEffect(() => {
    const el = document.getElementById('byte')
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      const vis = e.isIntersecting
      setAtSection(vis)
      if (!vis && wasAtSection.current) {
        setMood('sad')
        window.clearTimeout(sadTimer.current)
        sadTimer.current = window.setTimeout(() => setMood('idle'), 5200)
      }
      wasAtSection.current = vis
    }, { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  /* eyes track the cursor; perk up when it comes close */
  useEffect(() => {
    if (!enabled) return
    const onMove = (e: MouseEvent) => {
      const w = winRef.current
      if (!w) return
      const r = w.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height * 0.42)
      const angle = Math.atan2(dy, dx)
      const dist = Math.min(4.5, Math.hypot(dx, dy) * 0.015)
      setPupil({ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist })
      setNear(Math.hypot(dx, dy) < 260)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [enabled])

  const visible = enabled && !dismissed && pastHero && !atSection

  /* bubble: show for a few seconds whenever she (re)appears, gets sad, or the cursor comes near */
  useEffect(() => {
    if (!visible) { setBubbleOn(false); return }
    setBubbleOn(true)
    window.clearTimeout(bubbleTimer.current)
    bubbleTimer.current = window.setTimeout(() => setBubbleOn(false), mood === 'sad' ? 5200 : 4200)
    return () => window.clearTimeout(bubbleTimer.current)
  }, [visible, mood, near])

  if (!visible) return null

  const goToByte = () => document.getElementById('byte')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  const peekHit = () => (e: React.MouseEvent) => { e.stopPropagation(); goToByte() }
  const dismiss = (e: React.MouseEvent) => { e.stopPropagation(); writeHidden(); setDismissed(true) }

  const winH = Math.round(svgW * 0.54)
  const shiftY = Math.round(svgW * -0.06)
  const EDGE_OVERLAP = 8
  const inset = svgW < 150 ? 10 : 24
  /* reading-end side: right for English, left for Kurdish/Arabic */
  const side = rtl ? { left: inset } : { right: inset }
  const bubbleSide = rtl ? { left: 12 } : { right: 12 }
  const tailSide = rtl ? { left: Math.min(svgW / 2, 60) } : { right: Math.min(svgW / 2, 60) }

  const text = mood === 'sad' ? c.sad : near ? c.near : c.idle

  return (
    <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, height: 0, zIndex: 60, pointerEvents: 'none' }}>
      <style>{`
        @keyframes peek-rise { from { transform: translateY(40px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        @keyframes peek-bob { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-4px) } }
        .peek-bubble { transition: opacity .35s ease, transform .35s ease; }
        .peek-x { opacity: .55; transition: opacity .2s; }
        .peek-x:hover, .peek-x:focus-visible { opacity: 1; }
        @media (prefers-reduced-motion: reduce) { .peek-head { animation: none !important; } }
      `}</style>

      {/* invite bubble */}
      <div
        className="peek-bubble"
        role="status"
        dir={rtl ? 'rtl' : 'ltr'}
        onClick={goToByte}
        style={{
          position: 'absolute', bottom: winH - EDGE_OVERLAP + 12, ...bubbleSide,
          width: 'max-content', maxWidth: 'min(230px, 70vw)',
          background: '#fff', color: '#0b1a30', padding: '10px 30px 10px 14px', borderRadius: 14,
          ...(rtl ? { padding: '10px 14px 10px 30px' } : {}),
          fontFamily: font, fontSize: 13, fontWeight: 700, lineHeight: 1.5,
          boxShadow: '0 14px 34px rgba(0,0,0,0.4)',
          cursor: 'pointer',
          opacity: bubbleOn ? 1 : 0,
          transform: bubbleOn ? 'none' : 'translateY(6px)',
          pointerEvents: bubbleOn ? 'auto' : 'none',
        }}>
        {text}
        <button
          className="peek-x"
          onClick={dismiss}
          aria-label={c.close}
          title={c.close}
          style={{
            position: 'absolute', top: 4, ...(rtl ? { left: 4 } : { right: 4 }),
            width: 22, height: 22, border: 'none', background: 'transparent', cursor: 'pointer',
            fontSize: 15, lineHeight: 1, color: '#0b1a30', borderRadius: 6,
          }}>×</button>
        <span style={{ position: 'absolute', bottom: -6, ...tailSide, width: 12, height: 12, background: '#fff', transform: 'rotate(45deg)', borderRadius: 2 }} />
      </div>

      {/* the head, flush with the true screen edge */}
      <div
        ref={winRef}
        className="peek-head"
        onClick={goToByte}
        onMouseEnter={() => setBubbleOn(true)}
        role="button"
        aria-label={c.idle}
        style={{
          position: 'absolute', bottom: -EDGE_OVERLAP, ...side, zIndex: 2,
          width: svgW, height: winH, overflow: 'hidden', cursor: 'pointer', pointerEvents: 'auto',
          filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.35))',
          animation: 'peek-rise .6s cubic-bezier(.55,0,.35,1.3), peek-bob 4s ease-in-out .6s infinite',
        }}>
        <div style={{ width: svgW, transform: `translateY(${shiftY}px)` }}>
          <HighEndByteSvg mood={mood} blink={false} cableOut={true} hit={peekHit} pupilOffset={pupil} />
        </div>
      </div>
    </div>
  )
}
