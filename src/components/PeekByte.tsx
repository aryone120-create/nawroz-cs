import { useEffect, useRef, useState } from 'react'
import { HighEndByteSvg, type Mood } from './MouseMascot'

/* ── Peeking Byte ──
   The SAME mouse as the section mascot, peeking up from the true bottom edge
   of the screen (mobile and desktop alike) — no wall, no ledge, just cropped
   by the screen edge itself, like she's climbing up into view.
   Eyes follow the cursor; come near and she perks up. Scroll away from her
   section and she gets sad and asks you to stay. */

const display = "'Sora', sans-serif"

const WIN_H = 108        // how much of the head shows above the screen edge
const SHIFT_Y = -12      // frame the head so we crop right at the nose
const EDGE_OVERLAP = 10  // she sits slightly past the true edge so she's flush, not floating above it

export default function PeekByte() {
  const winRef = useRef<HTMLDivElement>(null)
  const wasAtSection = useRef(false)
  const sadTimer = useRef<number | undefined>(undefined)

  const [pupil, setPupil] = useState({ x: 0, y: 0 })
  const [mood, setMood] = useState<Mood>('idle')
  const [near, setNear] = useState(false)
  const [atSection, setAtSection] = useState(false)
  const [enabled, setEnabled] = useState(false)
  const [svgW, setSvgW] = useState(200)

  /* show on any screen with a bit of vertical room; size the head to fit */
  useEffect(() => {
    const check = () => {
      setEnabled(window.innerHeight > 430)
      setSvgW(window.innerWidth < 560 ? 150 : 200)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
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
      const cx = r.left + r.width / 2
      const cy = r.top + r.height * 0.42
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const angle = Math.atan2(dy, dx)
      const dist = Math.min(4.5, Math.hypot(dx, dy) * 0.015)
      setPupil({ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist })
      setNear(Math.hypot(dx, dy) < 300)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [enabled])

  if (!enabled || atSection) return null

  const goToByte = () => document.getElementById('byte')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  const peekHit = () => (e: React.MouseEvent) => { e.stopPropagation(); goToByte() }
  const headLeft = svgW < 170 ? 14 : 28

  const bubble =
    mood === 'sad' ? 'don’t make me miss you… 🥺 come join us so we can be friends 💙' :
    near ? 'over here! come see me 💙 let’s be friends →' :
    'psst… peek-a-boo! come find me 🐭 →'

  return (
    /* full-width, click-through container; only the mouse + wall catch clicks */
    <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 60, pointerEvents: 'none' }}>
      <style>{`
        @keyframes peek-rise { from { transform: translateY(30px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        @keyframes peek-bob { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-4px) } }
      `}</style>

      {/* invite bubble */}
      <div style={{
        position: 'absolute', bottom: WIN_H - EDGE_OVERLAP + 10, left: Math.max(12, headLeft - 8),
        width: 'max-content', maxWidth: 'min(236px, 82vw)',
        background: '#fff', color: '#0b1a30', padding: '11px 15px', borderRadius: 16,
        fontFamily: display, fontSize: 13.5, fontWeight: 700, lineHeight: 1.35,
        boxShadow: '0 14px 34px rgba(0,0,0,0.4)', textAlign: 'center',
        cursor: 'pointer', pointerEvents: 'auto',
      }} onClick={goToByte}>
        {bubble}
        <span style={{ position: 'absolute', left: 40, bottom: -6, width: 13, height: 13, background: '#fff', transform: 'rotate(45deg)', borderRadius: 2 }} />
      </div>

      {/* the head, flush with the true screen edge — no wall, no ledge */}
      <div ref={winRef} onClick={goToByte} style={{
        position: 'absolute', bottom: -EDGE_OVERLAP, left: headLeft, zIndex: 2,
        width: svgW, height: WIN_H, overflow: 'hidden', cursor: 'pointer', pointerEvents: 'auto',
        filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.35))',
        animation: 'peek-rise .6s cubic-bezier(.55,0,.35,1.3), peek-bob 4s ease-in-out infinite',
      }}>
        <div style={{ width: svgW, transform: `translateY(${SHIFT_Y}px)` }}>
          <HighEndByteSvg mood={mood} blink={false} cableOut={true} hit={peekHit} pupilOffset={pupil} />
        </div>
      </div>

      {/* thin invisible click-catcher along the true edge — no visible wall */}
      <div onClick={goToByte} style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 1, height: 28,
        cursor: 'pointer', pointerEvents: 'auto',
      }} />
    </div>
  )
}
