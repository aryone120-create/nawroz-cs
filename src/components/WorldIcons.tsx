import { useEffect, useState } from 'react'

/* ══════════════════════════════════════════════════════════════════
   World icons — reconstructed to match your latest live build
   (nawroz-cs-site_10), verified by rendering it directly and diffing
   idle vs. hover DOM/SVG output.

   IMPORTANT: hover state is driven by the parent `.wcard` (the whole
   card), not by the tiny icon itself — Website.tsx tracks which card
   is hovered and passes `on` down as a prop. That way hovering
   anywhere on the card — not just the small icon — triggers the
   animation, matching the live site.
   ══════════════════════════════════════════════════════════════════ */

const B = '#0EA5E9'
const G = '#38BDF8'

type IconProps = { on: boolean }

/* ── 01 · Artificial Intelligence — dog/cat detection with a glowing brain halo ── */
export function AIIcon({ on }: IconProps) {
  return (
    <svg width="96" height="96" viewBox="0 0 64 64" style={{ overflow: 'visible', display: 'block' }}>
      <style>{`
        @keyframes box-pop { 0%{opacity:0; transform:scale(0.7)} 100%{opacity:1; transform:scale(1)} }
        @keyframes tag-fade { from{opacity:0; transform:translateY(3px)} to{opacity:1; transform:translateY(0)} }
        @keyframes scan-sweep { 0%{transform:translateY(0); opacity:.9} 85%{opacity:.7} 100%{transform:translateY(48px); opacity:0} }
      `}</style>
      {/* glowing brain halo, always faintly present, brightens on hover */}
      <g transform="translate(32,32) scale(1.18) translate(-32,-32)">
        <path d="M20,10 C14,10 10,14 10,19 C6,20 4,24 5,28 C2,30 2,35 5,38 C4,42 6,46 10,47 C10,52 14,56 20,56 C22,59 28,60 32,58 C36,60 42,59 44,56 C50,56 54,52 54,47 C58,46 60,42 59,38 C62,35 62,30 59,28 C60,24 58,20 54,19 C54,14 50,10 44,10 C41,8 35,8 32,11 C29,8 23,8 20,10 Z"
          fill="none" stroke={G} strokeWidth="1.4" opacity={on ? 0.85 : 0.38}
          style={{ filter: on ? `drop-shadow(0 0 5px ${G})` : 'none', transition: 'opacity 0.4s, filter 0.4s' }} />
        <line x1="32" y1="11" x2="32" y2="58" stroke={G} strokeWidth="1" opacity={on ? 0.6 : 0.28} style={{ transition: 'opacity 0.4s' }} />
        {[
          'M14,20 Q18,23 15,27', 'M10,32 Q15,34 11,38', 'M16,42 Q20,44 18,48',
          'M50,20 Q46,23 49,27', 'M54,32 Q49,34 53,38', 'M48,42 Q44,44 46,48',
        ].map((d, i) => (
          <path key={i} d={d} fill="none" stroke={G} strokeWidth="0.8" opacity={on ? 0.5 : 0.24} style={{ transition: 'opacity 0.4s' }} />
        ))}
      </g>
      <rect x="4" y="4" width="56" height="56" rx="7" fill="#0A1424" stroke={B} strokeWidth="1.4" />
      <line x1="7" y1="51" x2="57" y2="51" stroke={B} strokeWidth="1" opacity="0.18" />
      {/* dog silhouette */}
      <g fill="#64748B" opacity={on ? 1 : 0.55} style={{ transition: 'opacity 0.4s' }}>
        <path d="M8 40 Q5 36 7.5 33" stroke="#64748B" strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="16" cy="42" rx="8" ry="5.5" />
        <circle cx="24" cy="34" r="5" />
        <path d="M27 30 Q31.5 31.5 28.5 37 Z" />
        <ellipse cx="28.5" cy="35.5" rx="1.8" ry="1.2" />
        <line x1="12" y1="47" x2="12" y2="50.5" stroke="#64748B" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="20" y1="47.5" x2="20" y2="50.5" stroke="#64748B" strokeWidth="2.4" strokeLinecap="round" />
      </g>
      {/* cat silhouette */}
      <g fill="#64748B" opacity={on ? 1 : 0.55} style={{ transition: 'opacity 0.4s' }}>
        <path d="M55 44 Q59.5 42 57.5 36 Q56.5 33 58.5 31" stroke="#64748B" strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="47" cy="43" rx="7.5" ry="5" />
        <circle cx="40" cy="33" r="4.6" />
        <path d="M36.3 30.5 L37.6 25.2 L40 30 Z" />
        <path d="M40.2 30 L42.6 25 L44 30.5 Z" />
        <line x1="34.5" y1="33.5" x2="31" y2="32.8" stroke="#64748B" strokeWidth="0.8" />
        <line x1="34.5" y1="34.6" x2="31" y2="35" stroke="#64748B" strokeWidth="0.8" />
        <line x1="43" y1="47.5" x2="43" y2="50.5" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="50" y1="47" x2="50" y2="50.5" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" />
      </g>
      {on && (
        <>
          <rect x="5" y="5" width="54" height="3" fill={G} opacity="0.9" style={{ animation: '0.6s ease-in 0s 1 forwards scan-sweep', filter: `drop-shadow(0 0 4px ${G})` }} />
          <g style={{ animation: '0.3s cubic-bezier(.2,.8,.3,1.3) 0.55s 1 both box-pop', transformOrigin: '17px 37.5px' }}>
            <path d="M6,29 L6,25 L10,25" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" />
            <path d="M24,25 L28,25 L28,29" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" />
            <path d="M6,46 L6,50 L10,50" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" />
            <path d="M24,50 L28,50 L28,46" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" />
          </g>
          <g style={{ animation: '0.3s cubic-bezier(.2,.8,.3,1.3) 0.85s 1 both box-pop', transformOrigin: '44px 35px' }}>
            <path d="M33,24 L33,20 L37,20" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" />
            <path d="M51,20 L55,20 L55,24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" />
            <path d="M33,46 L33,50 L37,50" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" />
            <path d="M51,50 L55,50 L55,46" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" />
          </g>
          <g style={{ animation: '0.3s ease-out 0.85s 1 both tag-fade' }}>
            <rect x="6" y="14.5" width="28.8" height="6.6" rx="2" fill={G} />
            <text x="8.5" y="19.4" fontSize="4.3" fontFamily="monospace" fill="#04101f" fontWeight="bold">dog .96</text>
          </g>
          <g style={{ animation: '0.3s ease-out 1.15s 1 both tag-fade' }}>
            <rect x="32" y="7" width="28.8" height="6.6" rx="2" fill={G} />
            <text x="34.5" y="11.9" fontSize="4.3" fontFamily="monospace" fill="#04101f" fontWeight="bold">cat .98</text>
          </g>
        </>
      )}
    </svg>
  )
}

/* ── 02 · Game Design — controller projecting a spinning 3D cube + pyramid ── */
export function GameIcon({ on }: IconProps) {
  return (
    <svg width="96" height="96" viewBox="0 0 64 64" style={{ overflow: 'visible', display: 'block' }}>
      <style>{`
        @keyframes led-pulse { 0%,100%{opacity:.4} 50%{opacity:1} }
        @keyframes pad-btn { 0%,100%{transform:scale(1)} 50%{transform:scale(1.5)} }
        @keyframes shape-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-2px)} }
        @keyframes cube-spin { 0%{transform:scale(1,1)} 48%{transform:scale(0.15,1)} 52%{transform:scale(0.15,1)} 100%{transform:scale(1,1)} }
        @keyframes pyr-spin { 0%{transform:scale(1,1)} 48%{transform:scale(0.15,1)} 52%{transform:scale(0.15,1)} 100%{transform:scale(1,1)} }
        @keyframes beam-glow { 0%,100%{opacity:.10} 50%{opacity:.28} }
      `}</style>
      <ellipse cx="32" cy="59" rx="26" ry="2.6" fill="#000" opacity="0.3" />
      <path d="M22,46 L42,46 L36,16 L28,16 Z" fill={G} style={on ? { opacity: 0.1, animation: '1.2s ease-in-out infinite beam-glow' } : { opacity: 0.1 }} />
      <g style={on ? { transformOrigin: '32px 20px', animation: '1.4s ease-in-out 1 cube-spin' } : { transformOrigin: '32px 20px', animation: '3s ease-in-out infinite shape-float' }}>
        <path d="M25,15 L32,11 L39,15 L32,19 Z" fill="#0369A1" opacity="0.55" stroke={G} strokeWidth="1" />
        <path d="M25,15 L25,25 L32,29 L32,19 Z" fill={B} opacity="0.4" stroke={G} strokeWidth="1" />
        <path d="M39,15 L39,25 L32,29 L32,19 Z" fill="#0369A1" opacity="0.7" stroke={G} strokeWidth="1" />
      </g>
      <g transform="translate(45,23)" style={on ? { transformOrigin: '51px 27px', animation: '1.4s ease-in-out 0.15s 1 pyr-spin' } : { transformOrigin: '51px 27px', animation: '3.4s ease-in-out 0.3s infinite shape-float' }}>
        <path d="M0,8 L6,4 L12,8 L6,11 Z" fill="#0369A1" opacity="0.45" stroke={G} strokeWidth="0.9" />
        <path d="M0,8 L6,-4 L6,11 Z" fill={B} opacity="0.35" stroke={G} strokeWidth="0.9" />
        <path d="M12,8 L6,-4 L6,11 Z" fill="#0369A1" opacity="0.6" stroke={G} strokeWidth="0.9" />
      </g>
      <rect x="20" y="45" width="24" height="9" rx="2.5" fill="#0F172A" stroke={on ? G : B} strokeWidth="1.4" style={{ transition: 'stroke 0.3s' }} />
      <rect x="24" y="48" width="6" height="1.6" rx="0.8" fill={G} opacity={on ? 1 : 0.6} style={{ transition: 'opacity 0.3s' }} />
      <circle cx="40" cy="49.3" r="1.5" fill={G} style={on ? { animation: '0.5s ease-in-out infinite led-pulse' } : { opacity: 0.5 }} />
      <g transform="translate(2,49) rotate(-12)">
        <path d="M0,4 Q-1,1 2,0 L14,0 Q17,1 16,4 L14,10 Q13,12 11,11 L9,9 Q8,8 7,9 L5,11 Q3,12 2,10 Z" fill="#0F172A" stroke={on ? G : B} strokeWidth="1.3" style={{ transition: 'stroke 0.3s' }} />
        <circle cx="4" cy="5" r="1.5" fill={B} opacity={on ? 1 : 0.6} style={on ? { animation: '0.22s ease-in-out 0.1s 2 pad-btn', transformOrigin: '4px 5px' } : { transition: 'opacity 0.3s' }} />
        <circle cx="12" cy="5" r="1.5" fill="#0369A1" opacity={on ? 1 : 0.6} style={on ? { animation: '0.22s ease-in-out 0.28s 2 pad-btn', transformOrigin: '12px 5px' } : { transition: 'opacity 0.3s' }} />
      </g>
      <g transform="translate(46,49) rotate(12)">
        <path d="M0,4 Q-1,1 2,0 L14,0 Q17,1 16,4 L14,10 Q13,12 11,11 L9,9 Q8,8 7,9 L5,11 Q3,12 2,10 Z" fill="#0F172A" stroke={on ? G : B} strokeWidth="1.3" style={{ transition: 'stroke 0.3s' }} />
        <circle cx="4" cy="5" r="1.5" fill="#EF4444" opacity={on ? 1 : 0.6} style={on ? { animation: '0.22s ease-in-out 0.1s 2 pad-btn', transformOrigin: '4px 5px' } : { transition: 'opacity 0.3s' }} />
        <circle cx="12" cy="5" r="1.5" fill="#22C55E" opacity={on ? 1 : 0.6} style={on ? { animation: '0.22s ease-in-out 0.28s 2 pad-btn', transformOrigin: '12px 5px' } : { transition: 'opacity 0.3s' }} />
      </g>
    </svg>
  )
}

/* ── 03 · Robotics — waves with a raised arm and a 👋 speech bubble ── */
export function RobotIcon({ on }: IconProps) {
  return (
    <svg width="96" height="96" viewBox="0 0 64 64" style={{ overflow: 'visible', display: 'block' }}>
      <style>{`
        @keyframes signal-ring { 0%{opacity:.8;transform:scale(0.4)} 100%{opacity:0;transform:scale(1.6)} }
        @keyframes bubble-pop { 0%{opacity:0; transform:scale(0.6) translateY(4px)} 100%{opacity:1; transform:scale(1) translateY(0)} }
        @keyframes wave-arm { 0%,100%{transform:rotate(0deg)} 15%{transform:rotate(-115deg)} 30%{transform:rotate(-135deg)} 45%{transform:rotate(-112deg)} 60%{transform:rotate(-135deg)} 75%{transform:rotate(-112deg)} 90%{transform:rotate(-100deg)} }
        @keyframes happy-eye { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(0.7)} }
      `}</style>
      <ellipse cx="32" cy="63" rx="18" ry="2.4" fill="#000" opacity="0.3" />
      <g style={on ? { animation: '0.3s cubic-bezier(.2,.8,.3,1.3) 0.15s 1 both bubble-pop' } : { opacity: 0 }}>
        <path d="M40,3 h17 a3,3 0 0 1 3,3 v9 a3,3 0 0 1 -3,3 h-9 l-4,4 v-4 h-4 a3,3 0 0 1 -3,-3 v-9 a3,3 0 0 1 3,-3 Z" fill={G} />
        <text x="48.5" y="12.5" fontSize="8" textAnchor="middle" fontFamily="sans-serif">👋</text>
      </g>
      {!on && [0, 0.5, 1].map((d) => (
        <circle key={d} cx="32" cy="2" r="2.5" fill="none" stroke={G} strokeWidth="1" style={{ transformOrigin: '32px 2px', animation: `1.8s ease-out ${d}s infinite signal-ring` }} />
      ))}
      <line x1="32" y1="2" x2="32" y2="10" stroke={G} strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="2" r="2.5" fill={G} />
      <rect x="17" y="10" width="30" height="20" rx="5" fill="#0F172A" stroke={on ? G : B} strokeWidth="1.8" style={{ transition: 'stroke 0.4s' }} />
      <line x1="19" y1="15" x2="19" y2="25" stroke={B} strokeWidth="1" opacity="0.4" />
      <line x1="21.5" y1="15" x2="21.5" y2="25" stroke={B} strokeWidth="1" opacity="0.4" />
      <line x1="42.5" y1="15" x2="42.5" y2="25" stroke={B} strokeWidth="1" opacity="0.4" />
      <line x1="45" y1="15" x2="45" y2="25" stroke={B} strokeWidth="1" opacity="0.4" />
      <circle cx="25" cy="20" r="4" fill={G} style={{ filter: `drop-shadow(0 0 5px ${G})`, transformOrigin: '25px 20px', ...(on ? { animation: '0.4s ease-in-out 3 happy-eye' } : {}) }} />
      <circle cx="39" cy="20" r="4" fill={G} style={{ filter: `drop-shadow(0 0 5px ${G})`, transformOrigin: '39px 20px', ...(on ? { animation: '0.4s ease-in-out 3 happy-eye' } : {}) }} />
      <rect x="19" y="32" width="26" height="18" rx="4" fill="#0F172A" stroke={on ? G : B} strokeWidth="1.8" style={{ transition: 'stroke 0.4s' }} />
      <circle cx="22" cy="35.5" r="1" fill={B} opacity="0.55" />
      <circle cx="42" cy="35.5" r="1" fill={B} opacity="0.55" />
      <rect x="27" y="37" width="10" height="4" rx="2" fill={on ? G : '#0369A1'} style={{ transition: 'fill 0.4s' }} />
      <rect x="7" y="32" width="10" height="16" rx="4" fill="#0F172A" stroke={on ? G : B} strokeWidth="1.8" style={{ transition: 'stroke 0.4s' }} />
      <g style={on ? { transformOrigin: '52px 32px', animation: '2s ease-in-out 1 wave-arm' } : { transformOrigin: '52px 32px' }}>
        <rect x="47" y="32" width="10" height="16" rx="4" fill="#0F172A" stroke={on ? G : B} strokeWidth="1.8" style={{ transition: 'stroke 0.4s' }} />
      </g>
      <rect x="21" y="52" width="9" height="12" rx="3" fill="#0F172A" stroke={B} strokeWidth="1.8" />
      <rect x="34" y="52" width="9" height="12" rx="3" fill="#0F172A" stroke={B} strokeWidth="1.8" />
    </svg>
  )
}

/* ── 04 · Web Development — types a URL, loads, then scrolls down to reveal more ── */
export function BrowserIcon({ on }: IconProps) {
  const [text, setText] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const full = 'nawroz.'

  useEffect(() => {
    if (!on) { setText(''); setScrolled(false); return }
    let i = 0
    const t = window.setInterval(() => {
      i++
      setText(full.slice(0, i))
      if (i >= full.length) {
        window.clearInterval(t)
        window.setTimeout(() => setScrolled(true), 500)
      }
    }, 70)
    return () => window.clearInterval(t)
  }, [on])

  return (
    <svg width="96" height="96" viewBox="0 0 64 64" style={{ overflow: 'visible', display: 'block' }}>
      <style>{`
        @keyframes cur-blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes spin { to { transform: rotate(360deg) } }
      `}</style>
      <rect x="6" y="1" width="26" height="10" rx="4" fill="#1E293B" opacity="0.6" />
      <rect x="2" y="4" width="60" height="56" rx="5" fill="#0F172A" stroke={on ? G : B} strokeWidth="1.8" style={{ transition: 'stroke 0.3s' }} />
      <rect x="2" y="4" width="60" height="17" rx="5" fill="#1E293B" />
      <rect x="2" y="13" width="60" height="8" fill="#1E293B" />
      <rect x="2" y="4" width="26" height="9" rx="3" fill="#0F172A" />
      <rect x="6.5" y="7" width="4" height="4" rx="1" fill={G} opacity="0.8" />
      <rect x="13" y="8" width="12" height="2" rx="1" fill="#64748B" />
      <circle cx="10" cy="16.5" r="2.2" fill="#EF4444" />
      <circle cx="16.5" cy="16.5" r="2.2" fill="#F59E0B" />
      <circle cx="23" cy="16.5" r="2.2" fill="#22C55E" />
      <rect x="28" y="14" width="32" height="8" rx="3" fill="#050D1A" stroke={on ? G : '#334155'} strokeWidth="1.1" style={{ transition: 'stroke 0.2s' }} />
      <text x="30.5" y="19.7" fontSize="4.6" fill={G} fontFamily="monospace">{text}</text>
      {on && text.length < full.length && (
        <rect x={30.5 + text.length * 2.6} y="16" width="1.1" height="6" fill={G} style={{ animation: '0.6s step-start infinite cur-blink' }} />
      )}
      {on && text.length < full.length && (
        <g style={{ transformOrigin: '57px 18px', animation: '0.7s linear infinite spin' }}>
          <circle cx="57" cy="18" r="2.4" fill="none" stroke={G} strokeWidth="1.2" strokeDasharray="4 10" strokeLinecap="round" />
        </g>
      )}
      <defs>
        <clipPath id="browser-viewport"><rect x="4" y="23" width="56" height="35" rx="1" /></clipPath>
      </defs>
      <g clipPath="url(#browser-viewport)">
        <g style={{ transform: `translateY(${scrolled ? -48 : 0}px)`, transition: 'transform 1.1s cubic-bezier(.3,.7,.2,1)' }}>
          <rect x="7" y="27" width="50" height="3.5" rx="1.5" fill={B} opacity="0.22" />
          <rect x="7" y="34" width="38" height="3" rx="1.5" fill={B} opacity="0.14" />
          <rect x="7" y="41" width="46" height="3" rx="1.5" fill={B} opacity="0.18" />
          <rect x="7" y="48" width="30" height="3" rx="1.5" fill={B} opacity="0.10" />
          <rect x="42" y="33" width="16" height="20" rx="2" fill="#0369A1" opacity="0.25" />
          <circle cx="47" cy="39" r="2" fill={B} opacity="0.4" />
          <path d="M43 50 L47 45 L50 48 L54 43 L58 50 Z" fill={B} opacity="0.3" />
          <rect x="7" y="61" width="24" height="3" rx="1.5" fill={G} opacity="0.28" />
          <rect x="7" y="67" width="24" height="16" rx="2" fill="#0369A1" opacity="0.22" />
          <rect x="7" y="85" width="24" height="2.4" rx="1.2" fill={B} opacity="0.16" />
          <rect x="7" y="89.5" width="17" height="2.4" rx="1.2" fill={B} opacity="0.1" />
          <rect x="34" y="67" width="24" height="16" rx="2" fill="#0369A1" opacity="0.22" />
          <rect x="34" y="85" width="24" height="2.4" rx="1.2" fill={B} opacity="0.16" />
          <rect x="34" y="89.5" width="17" height="2.4" rx="1.2" fill={B} opacity="0.1" />
        </g>
      </g>
      <rect x="60.5" y="27" width="1.6" height="16" rx="0.8" fill={B} opacity="0.3" />
    </svg>
  )
}

/* ── 05 · Mobile Apps — taps an app open fullscreen, then swipes up to close ── */
export function PhoneIcon({ on }: IconProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!on) { setOpen(false); return }
    const t = window.setTimeout(() => setOpen(true), 300)
    return () => window.clearTimeout(t)
  }, [on])

  const grid = [
    ['#3B82F6', '#8B5CF6', '#EF4444'],
    ['#22C55E', '#F59E0B', '#EC4899'],
    ['#06B6D4', '#F97316', '#84CC16'],
  ]
  return (
    <svg width="96" height="96" viewBox="0 0 64 64" style={{ overflow: 'visible', display: 'block' }}>
      <style>{`@keyframes swipe-hint { 0%{transform:translateY(0); opacity:0} 30%{opacity:.8} 100%{transform:translateY(-10px); opacity:0} }`}</style>
      <ellipse cx="32" cy="63" rx="14" ry="1.8" fill="#000" opacity="0.3" />
      <rect x="13" y="2" width="38" height="60" rx="8" fill="#0F172A" stroke={on ? G : B} strokeWidth="1.8" style={{ transition: 'stroke 0.3s' }} />
      <rect x="16" y="8" width="32" height="48" rx="4" fill="#050D1A" />
      <text x="18.5" y="12.2" fontSize="3.4" fill="#fff" fontFamily="sans-serif" opacity="0.85">9:41</text>
      <rect x="38" y="9.3" width="2.6" height="2" rx="0.5" fill="#fff" opacity="0.7" />
      <rect x="41" y="9" width="2.6" height="2.3" rx="0.5" fill="#fff" opacity="0.8" />
      <rect x="44" y="8.6" width="2.6" height="2.7" rx="0.5" fill="#fff" opacity="0.9" />
      <rect x="43.5" y="9.5" width="4" height="2" rx="0.7" fill="none" stroke="#fff" strokeWidth="0.5" opacity="0.7" />
      <circle cx="32" cy="5.5" r="1.8" fill="#1E293B" />
      <defs>
        <clipPath id="phone-screen"><rect x="16" y="8" width="32" height="48" rx="4" /></clipPath>
      </defs>
      <g clipPath="url(#phone-screen)">
        {/* home grid */}
        <g style={{ opacity: open ? 0 : 1, transform: open ? 'scale(0.92)' : 'none', transformOrigin: '33px 29px', transition: 'opacity 0.3s, transform 0.3s' }}>
          {grid.map((row, ri) => row.map((c, ci) => (
            <g key={`${ri}-${ci}`}>
              <rect x={19 + ci * 10} y={15 + ri * 10} width="8" height="8" rx="2.5" fill={c} opacity="0.92" />
              <rect x={20.3 + ci * 10} y={16.3 + ri * 10} width="5.4" height="2" rx="1" fill="#fff" opacity="0.28" />
              {ri === 0 && ci === 1 && <><circle cx="36.5" cy="15.5" r="1.8" fill="#EF4444" /><text x="36.5" y="16.4" fontSize="2.4" fill="#fff" textAnchor="middle" fontFamily="sans-serif">3</text></>}
            </g>
          )))}
          <rect x="18" y="49" width="28" height="5" rx="2" fill="#1E293B" />
          <circle cx="25" cy="51.5" r="2.5" fill="#3B82F6" opacity="0.9" />
          <circle cx="32" cy="51.5" r="2.5" fill="#22C55E" opacity="0.9" />
          <circle cx="39" cy="51.5" r="2.5" fill="#06B6D4" opacity="0.9" />
        </g>
        {/* opened app */}
        <g style={{ opacity: open ? 1 : 0, transformOrigin: '33px 29px', transition: 'transform 0.35s cubic-bezier(.2,.8,.3,1.2), opacity 0.25s' }}>
          <rect x="16" y="8" width="32" height="48" fill="#0B1220" />
          <rect x="16" y="8" width="32" height="9" fill="#F59E0B" opacity="0.9" />
          <path d="M19.5 12.5 L21.5 10.5 M19.5 12.5 L21.5 14.5" fill="none" stroke="#fff" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
          <rect x="26" y="11.5" width="12" height="2" rx="1" fill="#fff" opacity="0.85" />
          {[22, 30, 38, 46].map((y) => (
            <g key={y}>
              <rect x="19" y={y} width="6" height="6" rx="1.5" fill="#F59E0B" opacity="0.3" />
              <rect x="27" y={y + 1} width="18" height="2" rx="1" fill="#fff" opacity="0.22" />
              <rect x="27" y={y + 4.5} width="12" height="1.6" rx="0.8" fill="#fff" opacity="0.12" />
            </g>
          ))}
          {open && (
            <g style={{ animation: '0.9s ease-out 0.55s 1 swipe-hint' }}>
              <rect x="29" y="50" width="6" height="9" rx="3" fill="none" stroke="#fff" strokeWidth="1" opacity="0.8" />
              <line x1="32" y1="53" x2="32" y2="55.5" stroke="#fff" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
            </g>
          )}
        </g>
      </g>
      <path d="M18 8 L24 8 L19 56 L16 56 Z" fill="#fff" opacity="0.03" />
      <rect x="26" y="57" width="12" height="2" rx="1" fill={B} opacity="0.35" />
    </svg>
  )
}

/* ── 06 · Desktop Software — cursor moves down, clicks taskbar, windows cascade open ── */
export function DesktopIcon({ on }: IconProps) {
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    if (!on) { setClicked(false); return }
    const t = window.setTimeout(() => setClicked(true), 550)
    return () => window.clearTimeout(t)
  }, [on])

  const wins = [
    { x: 7, y: 8, w: 34, h: 22, c: B, origin: '24px 19px' },
    { x: 13, y: 14, w: 32, h: 20, c: '#8B5CF6', origin: '29px 24px' },
    { x: 19, y: 20, w: 30, h: 18, c: '#10B981', origin: '34px 29px' },
  ]
  return (
    <svg width="96" height="87" viewBox="0 0 64 58" style={{ overflow: 'visible', display: 'block' }}>
      <style>{`
        @keyframes win-open { from{transform:scale(0.4);opacity:0} to{transform:scale(1);opacity:1} }
        @keyframes cursor-move { 0%{ transform:translate(58px,52px); opacity:0 } 15%{ opacity:1 } 55%{ transform:translate(8.5px,36.5px); opacity:1 } 100%{ transform:translate(8.5px,36.5px); opacity:0 } }
        @keyframes click-ping { 0%{ transform:scale(0.3); opacity:0.8 } 100%{ transform:scale(2.2); opacity:0 } }
      `}</style>
      <rect x="2" y="2" width="60" height="40" rx="5" fill="#0F172A" stroke={on ? G : B} strokeWidth="1.8" style={{ transition: 'stroke 0.3s' }} />
      <circle cx="32" cy="40" r="0.9" fill={G} opacity="0.8" />
      <rect x="5" y="5" width="54" height="34" rx="3" fill="#050D1A" />
      {clicked && wins.map((w, i) => (
        <g key={i} style={{ animation: '0.22s ease-out win-open', transformOrigin: w.origin }}>
          <rect x={w.x} y={w.y} width={w.w} height={w.h} rx="3" fill="#0A1628" stroke={w.c} strokeWidth="1.5" />
          <rect x={w.x} y={w.y} width={w.w} height="6" rx="2" fill={w.c} opacity="0.25" />
          <circle cx={w.x + 3.5} cy={w.y + 3} r="1.3" fill="#EF4444" />
          <circle cx={w.x + 7} cy={w.y + 3} r="1.3" fill="#F59E0B" />
          <circle cx={w.x + 10.5} cy={w.y + 3} r="1.3" fill="#22C55E" />
          <rect x={w.x + 3} y={w.y + 9.5} width={w.w - 8} height="1.8" rx="1" fill={w.c} opacity="0.35" />
          <rect x={w.x + 3} y={w.y + 13} width={w.w - 14} height="1.8" rx="1" fill={w.c} opacity="0.2" />
          <rect x={w.x + 3} y={w.y + 16.5} width={w.w - 10} height="1.8" rx="1" fill={w.c} opacity="0.15" />
        </g>
      ))}
      <rect x="5" y="34" width="54" height="5" fill="#0B1A2E" />
      <rect x="7" y="35.2" width="3.4" height="2.6" rx="0.6" fill={B} opacity={on ? 1 : 0.6} style={{ transition: 'opacity 0.3s' }} />
      <rect x="11.5" y="35.2" width="3.4" height="2.6" rx="0.6" fill="#8B5CF6" opacity={on ? 1 : 0.6} style={{ transition: 'opacity 0.3s' }} />
      <rect x="16" y="35.2" width="3.4" height="2.6" rx="0.6" fill="#10B981" opacity={on ? 1 : 0.6} style={{ transition: 'opacity 0.3s' }} />
      <text x="57" y="37.4" fontSize="2.6" fill="#94A3B8" textAnchor="end" fontFamily="monospace">9:41</text>
      <rect x="27" y="42" width="10" height="5" rx="2" fill="#1E293B" />
      <rect x="19" y="47" width="26" height="3" rx="1.5" fill="#1E293B" stroke={B} strokeWidth="1" />
      {on && !clicked && (
        <g style={{ animation: '0.55s ease-out forwards cursor-move' }}>
          <path d="M0,0 L0,9 L2.3,7 L4,10.5 L5.4,9.8 L3.8,6.3 L6.5,6.2 Z" fill="#fff" stroke="#0A1424" strokeWidth="0.4" />
        </g>
      )}
      {clicked && (
        <circle cx="8.5" cy="36.5" r="1.5" fill="none" stroke={G} strokeWidth="1" style={{ transformOrigin: '8.5px 36.5px', animation: '0.4s ease-out click-ping' }} />
      )}
    </svg>
  )
}

/* ── 07 · Network & Data Security — device glyphs, more packets, ambient ring ── */
export function NetworkIcon({ on }: IconProps) {
  const nodes = [
    { cx: 32, cy: 12, r: 6, delay: 0 },
    { cx: 10, cy: 22, r: 4.2, delay: 0.4 },
    { cx: 54, cy: 22, r: 4.2, delay: 0.5 },
    { cx: 10, cy: 40, r: 4.2, delay: 0.1 },
    { cx: 54, cy: 40, r: 4.2, delay: 0.3 },
    { cx: 32, cy: 52, r: 4.2, delay: 0.2 },
  ]
  const edges = [
    { x1: 32, y1: 12, x2: 10, y2: 22, delay: 0 },
    { x1: 32, y1: 12, x2: 54, y2: 22, delay: 0.12 },
    { x1: 32, y1: 12, x2: 32, y2: 52, delay: 0.24 },
    { x1: 10, y1: 22, x2: 10, y2: 40, delay: 0.36 },
    { x1: 54, y1: 22, x2: 54, y2: 40, delay: 0.48 },
    { x1: 10, y1: 40, x2: 32, y2: 52, delay: 0.6 },
    { x1: 32, y1: 52, x2: 54, y2: 40, delay: 0.72 },
  ]
  return (
    <svg width="96" height="96" viewBox="0 0 64 64" style={{ overflow: 'visible', display: 'block' }}>
      <style>{`
        @keyframes net-edge { 0%{stroke-opacity:.15;stroke-width:1} 45%{stroke-opacity:1;stroke-width:2.2;stroke:${G}} 100%{stroke-opacity:.15;stroke-width:1} }
        @keyframes net-node { 0%,100%{fill:#0369A1} 45%{fill:${G}} }
        @keyframes radar-ring { 0%{opacity:.35;transform:scale(0.3)} 100%{opacity:0;transform:scale(1)} }
        @keyframes globe-spin { to { transform: rotate(360deg) } }
        @keyframes packet { 0%{offset-distance:0%; opacity:0} 8%{opacity:1} 92%{opacity:1} 100%{offset-distance:100%; opacity:0} }
      `}</style>
      {/* slow ambient ring — always on, even at rest, so the icon feels alive */}
      <circle cx="32" cy="32" r="29" fill="none" stroke={B} strokeWidth="0.7" strokeDasharray="1.5 4" opacity="0.22" style={{ transformOrigin: '32px 32px', animation: '14s linear infinite globe-spin' }} />
      {on && [0, 0.25, 0.5].map((d) => (
        <circle key={d} cx="32" cy="12" r="26" fill="none" stroke={G} strokeWidth="1" style={{ transformOrigin: '32px 12px', animation: `1.6s ease-out ${d}s infinite radar-ring` }} />
      ))}
      {edges.map((e, i) => (
        <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke="#0369A1" strokeWidth="1.3" strokeOpacity="0.22"
          style={on ? { animation: `0.55s ease-in-out ${e.delay}s forwards net-edge` } : {}} />
      ))}
      {on && (
        <>
          <circle r="1.6" fill="#fff" style={{ offsetPath: "path('M 10 22 L 32 12')", animation: '1.1s ease-in-out 0.1s packet' } as React.CSSProperties} />
          <circle r="1.6" fill="#fff" style={{ offsetPath: "path('M 32 12 L 54 22')", animation: '1.1s ease-in-out 0.5s packet' } as React.CSSProperties} />
          <circle r="1.6" fill="#fff" style={{ offsetPath: "path('M 10 40 L 32 52')", animation: '1s ease-in-out 0.75s packet' } as React.CSSProperties} />
          <circle r="1.6" fill="#fff" style={{ offsetPath: "path('M 32 52 L 54 40')", animation: '1s ease-in-out 0.95s packet' } as React.CSSProperties} />
        </>
      )}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.cx} cy={n.cy} r={n.r} fill={on ? G : '#0369A1'} stroke={G} strokeWidth="1.6"
          style={on ? { animation: `0.55s ease-in-out ${n.delay}s forwards net-node` } : { transition: 'fill 0.3s' }} />
      ))}
      {/* laptop / phone / server glyphs on the three bottom outer nodes */}
      <g fill="#04101f">
        <rect x="7.2" y="38.2" width="5.6" height="3" rx="0.5" />
        <rect x="6.6" y="41.2" width="6.8" height="1" rx="0.5" />
        <rect x="30.4" y="49" width="3.2" height="6" rx="0.9" />
        <rect x="51.2" y="37.1" width="5.6" height="5.8" rx="0.6" />
      </g>
      <circle cx="52.6" cy="38.5" r="0.55" fill={G} />
      <circle cx="52.6" cy="40.1" r="0.55" fill={G} />
      <circle cx="52.6" cy="41.7" r="0.55" fill={G} />
      <g transform="translate(27.8, -3.5)">
        <path d="M4.2 0 L8.4 1.6 V5.2 C8.4 8 6.4 9.8 4.2 10.6 C2 9.8 0 8 0 5.2 V1.6 Z" fill="#0A1424" stroke={on ? G : B} strokeWidth="1" style={{ transition: 'stroke 0.4s' }} />
        <path d="M2.1 5.1 L3.6 6.6 L6.4 3.4" fill="none" stroke={on ? G : B} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.4s' }} />
      </g>
    </svg>
  )
}

export const WORLD_ICON_COMPONENTS = [AIIcon, GameIcon, RobotIcon, BrowserIcon, PhoneIcon, DesktopIcon, NetworkIcon]
