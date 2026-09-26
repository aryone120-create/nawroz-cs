import { useEffect, useRef, useState } from 'react'
import { HighEndByteSvg } from './ByteSvg'
import type { Mood } from './MouseMascot'
import { MASCOT_COPY } from '../mascotCopy'
import { RTL_LANGS, type Lang } from '../i18n'

/* ── Peeking Byte ──
   Pops up from the bottom edge of the screen:
   - shortly after the site opens, with a welcome line
   - then hides, and comes back every so often with another line
   - never while his own section is on screen
   - tap him (or his bubble) to jump to his section; × hides him for this visit */

const FIRST_DELAY = 1400
const SHOW_FOR = 5600
const GAP = 24000
const HIDE_KEY = 'peekbyte-hidden'

function readHidden() { try { return sessionStorage.getItem(HIDE_KEY) === '1' } catch { return false } }
function writeHidden() { try { sessionStorage.setItem(HIDE_KEY, '1') } catch { /* ignore */ } }

export default function PeekByte({ lang }: { lang: Lang }) {
  const c = MASCOT_COPY[lang].peek
  const rtl = RTL_LANGS.includes(lang)
  const font = rtl ? "'Noto Kufi Arabic', 'Noto Sans Arabic', Tahoma, sans-serif" : "'Sora', sans-serif"

  const headRef = useRef<HTMLDivElement>(null)
  const atSectionRef = useRef(false)
  const lineIdx = useRef(0)
  const timers = useRef<number[]>([])

  const [out, setOut] = useState(false)
  const [text, setText] = useState(c.welcome)
  const [mood, setMood] = useState<Mood>('happy')
  const [dismissed, setDismissed] = useState(readHidden)
  const [pupil, setPupil] = useState({ x: 0, y: 0 })
  const [w, setW] = useState(170)

  useEffect(() => {
    const size = () => setW(window.innerWidth < 560 ? 118 : 168)
    size(); window.addEventListener('resize', size)
    return () => window.removeEventListener('resize', size)
  }, [])

  /* the show / hide rhythm */
  useEffect(() => {
    if (dismissed) return
    const clear = () => { timers.current.forEach(window.clearTimeout); timers.current = [] }
    const later = (fn: () => void, ms: number) => { timers.current.push(window.setTimeout(fn, ms)) }
    const appear = (line: string, m: Mood) => {
      if (atSectionRef.current) { later(() => cycle(), 6000); return }
      setText(line); setMood(m); setOut(true)
      later(() => { setOut(false); later(() => cycle(), GAP) }, SHOW_FOR)
    }
    const cycle = () => {
      const line = c.lines[lineIdx.current % c.lines.length]
      lineIdx.current += 1
      appear(line, 'happy')
    }
    later(() => appear(c.welcome, 'surprised'), FIRST_DELAY)
    return clear
  }, [dismissed, lang]) // eslint-disable-line react-hooks/exhaustive-deps

  /* hide while his section is visible; say goodbye when you scroll away from it */
  useEffect(() => {
    const el = document.getElementById('byte'); if (!el) return
    let was = false
    const io = new IntersectionObserver(([e]) => {
      atSectionRef.current = e.isIntersecting
      if (e.isIntersecting) setOut(false)
      else if (was && !readHidden()) {
        setText(c.sad); setMood('sad'); setOut(true)
        timers.current.push(window.setTimeout(() => setOut(false), 4200))
      }
      was = e.isIntersecting
    }, { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [lang]) // eslint-disable-line react-hooks/exhaustive-deps

  /* eyes follow the mouse */
  useEffect(() => {
    const mm = (e: MouseEvent) => {
      const r = headRef.current?.getBoundingClientRect(); if (!r) return
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height * 0.4)
      const a = Math.atan2(dy, dx), d = Math.min(4.5, Math.hypot(dx, dy) * 0.015)
      setPupil({ x: Math.cos(a) * d, y: Math.sin(a) * d })
    }
    window.addEventListener('mousemove', mm)
    return () => window.removeEventListener('mousemove', mm)
  }, [])

  if (dismissed) return null

  const goToByte = () => { setOut(false); document.getElementById('byte')?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }
  const dismiss = (e: React.MouseEvent) => { e.stopPropagation(); writeHidden(); setOut(false); setDismissed(true) }

  const h = Math.round(w * 0.56)
  const inset = w < 150 ? 10 : 24
  const side = rtl ? { left: inset } : { right: inset }

  return (
    <div aria-live="polite" style={{ position: 'fixed', bottom: 0, ...side, width: w, zIndex: 60, pointerEvents: 'none' }}>
      <style>{`
        .peek-wrap { transition: transform .55s cubic-bezier(.3,1.5,.5,1); }
        .peek-bubble { transition: opacity .3s ease .25s, transform .35s cubic-bezier(.3,1.6,.5,1) .25s; }
        .peek-x { opacity: .5; transition: opacity .2s; }
        .peek-x:hover, .peek-x:focus-visible { opacity: 1; }
      `}</style>

      {/* bubble */}
      <div
        dir={rtl ? 'rtl' : 'ltr'}
        className="peek-bubble"
        onClick={goToByte}
        style={{
          position: 'absolute', bottom: h + 10, ...(rtl ? { left: 0 } : { right: 0 }),
          width: 'max-content', maxWidth: 'min(270px, 76vw)',
          background: '#fff', color: '#0b1a30', borderRadius: 16,
          padding: rtl ? '11px 14px 11px 32px' : '11px 32px 11px 14px',
          fontFamily: font, fontSize: 14, fontWeight: 700, lineHeight: 1.5,
          boxShadow: '0 14px 34px rgba(0,0,0,0.45)', cursor: 'pointer',
          opacity: out ? 1 : 0, transform: out ? 'none' : 'translateY(10px) scale(.9)',
          pointerEvents: out ? 'auto' : 'none',
        }}>
        {text}
        <button
          className="peek-x" onClick={dismiss} aria-label={c.close} title={c.close}
          style={{ position: 'absolute', top: 5, ...(rtl ? { left: 6 } : { right: 6 }), width: 22, height: 22, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 16, lineHeight: 1, color: '#0b1a30' }}
        >×</button>
        <span style={{ position: 'absolute', bottom: -6, ...(rtl ? { left: w / 2 - 6 } : { right: w / 2 - 6 }), width: 12, height: 12, background: '#fff', transform: 'rotate(45deg)', borderRadius: 2 }} />
      </div>

      {/* head, rising from the true screen edge */}
      <div style={{ position: 'relative', height: h, overflow: 'hidden' }}>
        <div
          ref={headRef}
          className="peek-wrap"
          role="button"
          aria-label={text}
          onClick={goToByte}
          style={{
            width: w, height: h + 8, cursor: 'pointer', pointerEvents: out ? 'auto' : 'none',
            transform: out ? 'translateY(8px)' : `translateY(${h + 20}px)`,
            filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.4))',
          }}>
          <div style={{ width: w, transform: `translateY(${Math.round(w * -0.06)}px)` }}>
            <HighEndByteSvg mood={mood} blink={false} cableOut={true} hit={() => () => goToByte()} pupilOffset={pupil} uid="peek" />
          </div>
        </div>
      </div>
    </div>
  )
}
