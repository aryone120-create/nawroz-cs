import { useEffect, useState } from 'react'
import qrCode from '../assets/qr-code.svg'
import logo from '../assets/university-logo.png'
import { downloadWordDoc } from '../utils/wordExport'

const PW = 898   // A3 width in px at 96dpi
const PH = 1270  // A3 height in px

// bottom white stand base: 32% of height
const BASE_H = Math.round(PH * 0.32)   // ≈ 406px
// top dark display panel: the rest
const DISPLAY_H = PH - BASE_H

const BLUE      = '#0EA5E9'
const BLUE_DARK = '#0369A1'
const BLUE_GLOW = '#38BDF8'

export default function Poster() {
  const [scale, setScale] = useState(0.7)

  useEffect(() => {
    const calc = () => {
      const s = Math.min((window.innerWidth - 64) / PW, (window.innerHeight - 140) / PH)
      setScale(Math.max(0.28, Math.min(s, 1)))
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  return (
    <>
      <style>{`
        @media print {
          @page { size: 297mm 420mm; margin: 0; }
          .no-print { display: none !important; }
          html, body { margin: 0; padding: 0; background: #050D1A !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .poster-scale { transform: none !important; margin: 0 !important; width: 297mm !important; }
          .poster-bg { box-shadow: none !important; width: 297mm !important; height: 420mm !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>

      {/* controls — hidden at print time */}
      <div className="no-print" style={{ background: '#1E293B', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 16px 18px', gap: 14 }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
          <a href="/" style={{ padding: '9px 18px', background: '#0F172A', color: '#fff', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>← Website</a>
          <button onClick={() => window.print()} style={{ padding: '9px 18px', background: BLUE, color: '#fff', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>🖨 Print / Save PDF</button>
          <button onClick={downloadWordDoc} style={{ padding: '9px 18px', background: '#1D4ED8', color: '#fff', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>📄 Download Word</button>
        </div>
        <div style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.4)', fontSize: 12, textAlign: 'center' }}>
          Print → fold at the dashed line → cut the two legs → fold them back to stand the poster up.
        </div>
      </div>

      {/* poster — always visible, scales on screen, fills page at print */}
      <div style={{ background: '#1E293B', display: 'flex', justifyContent: 'center', padding: '0 16px 60px' }}>
        <div className="poster-scale" style={{ transform: `scale(${scale})`, transformOrigin: 'top center', marginBottom: PH * (scale - 1) }}>
          <PosterSheet />
        </div>
      </div>
    </>
  )
}

export function PosterSheet() {
  // leg geometry — two rectangular legs centered in the base
  const legW = 200
  const legH = BASE_H - 60   // legs don't reach the very bottom (leave a 60px footer strip)
  const gap   = 120           // gap between the two legs
  const leg1X = PW / 2 - gap / 2 - legW   // left leg left edge
  const leg2X = PW / 2 + gap / 2           // right leg left edge

  return (
    <div className="poster-bg" style={{
      width: PW, height: PH,
      fontFamily: 'Inter, sans-serif',
      boxShadow: '0 40px 120px rgba(0,0,0,0.8)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>

      {/* ══════════════════════════════
          TOP PANEL — dark, QR + text
          ══════════════════════════════ */}
      <div style={{
        height: DISPLAY_H, flexShrink: 0, position: 'relative',
        background: '#050D1A',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 40,
        overflow: 'hidden',
      }}>
        {/* glows */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 58%, rgba(14,165,233,0.24) 0%, transparent 62%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        {/* top accent bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: `linear-gradient(90deg, ${BLUE_DARK}, ${BLUE_GLOW} 50%, ${BLUE_DARK})` }} />

        {/* logo + dept name top-left */}
        <div style={{ position: 'absolute', top: 18, left: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src={logo} alt="Nawroz University" style={{ height: 48, width: 48, objectFit: 'contain', borderRadius: '50%', background: '#fff', padding: 3 }} />
          <div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 13, color: '#fff', letterSpacing: -0.2 }}>Computer Science</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: BLUE_GLOW, letterSpacing: 1.5 }}>NAWROZ UNIVERSITY · DUHOK</div>
          </div>
        </div>

        {/* sentence */}
        <div style={{
          fontFamily: "'Sora', sans-serif", fontSize: 30, fontWeight: 700,
          color: '#fff', textAlign: 'center', letterSpacing: -0.5,
          lineHeight: 1.3, maxWidth: 600, position: 'relative', padding: '0 20px',
        }}>
          Scan and discover your world in{' '}
          <span style={{ background: `linear-gradient(90deg, ${BLUE_GLOW}, ${BLUE})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Computer Science.
          </span>
        </div>

        {/* QR code */}
        <div style={{
          position: 'relative', padding: 5,
          background: `linear-gradient(135deg, ${BLUE_GLOW}, ${BLUE_DARK})`,
          borderRadius: 28,
          boxShadow: `0 0 70px rgba(56,189,248,0.5), 0 0 140px rgba(14,165,233,0.22)`,
        }}>
          <div style={{ background: '#fff', borderRadius: 23, padding: 16, display: 'flex' }}>
            <img src={qrCode} alt="QR Code" style={{ width: 430, height: 430, display: 'block' }} />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════
          FOLD LINE — cut here to separate
          ══════════════════════════════ */}
      <div style={{ position: 'relative', height: 32, background: '#fff', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, borderTop: '2px dashed rgba(14,165,233,0.55)', transform: 'translateY(-50%)' }} />
        <span style={{ position: 'absolute', left: 10, fontSize: 16, color: 'rgba(14,165,233,0.6)', lineHeight: 1, background: '#fff', paddingRight: 4 }}>✂</span>
        <span style={{ position: 'absolute', right: 10, fontSize: 16, color: 'rgba(14,165,233,0.6)', lineHeight: 1, transform: 'scaleX(-1)', background: '#fff', paddingLeft: 4 }}>✂</span>
        <span style={{ margin: '0 auto', background: '#fff', padding: '0 12px', fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: 'rgba(14,165,233,0.5)', letterSpacing: 2, textTransform: 'uppercase' }}>fold here</span>
      </div>

      {/* ══════════════════════════════
          BOTTOM BASE — white stand
          ══════════════════════════════ */}
      <div style={{
        flex: 1, background: '#fff', position: 'relative', overflow: 'hidden',
      }}>

        {/* soft dot grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(14,165,233,0.1) 1.5px, transparent 1.5px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
        {/* corner arcs */}
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 280, height: 280, borderRadius: '50%', border: '1.5px solid rgba(14,165,233,0.14)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -120, left: -120, width: 380, height: 380, borderRadius: '50%', border: '1px solid rgba(14,165,233,0.07)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -80, right: -80, width: 280, height: 280, borderRadius: '50%', border: '1.5px solid rgba(14,165,233,0.14)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -120, right: -120, width: 380, height: 380, borderRadius: '50%', border: '1px solid rgba(14,165,233,0.07)', pointerEvents: 'none' }} />

        {/* logo — centered, space above/below for future text */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={logo} alt="Nawroz University" style={{ height: 90, width: 90, objectFit: 'contain', opacity: 0.18 }} />
        </div>

        {/* ── LEG 1 (left) ── */}
        <svg style={{ position: 'absolute', left: leg1X, top: 20, width: legW, height: legH, overflow: 'visible' }}>
          <rect x="0" y="0" width={legW} height={legH}
            fill="rgba(14,165,233,0.04)"
            stroke="rgba(14,165,233,0.45)" strokeWidth="1.6"
            strokeDasharray="6 3" rx="6" />
          <line x1="0" y1="0" x2={legW} y2="0" stroke={BLUE} strokeWidth="2" strokeDasharray="8 4" />
          <text x={legW / 2} y="-5" textAnchor="middle" fontSize="13" fill="rgba(14,165,233,0.5)">✂</text>
        </svg>

        {/* ── LEG 2 (right) ── */}
        <svg style={{ position: 'absolute', left: leg2X, top: 20, width: legW, height: legH, overflow: 'visible' }}>
          <rect x="0" y="0" width={legW} height={legH}
            fill="rgba(14,165,233,0.04)"
            stroke="rgba(14,165,233,0.45)" strokeWidth="1.6"
            strokeDasharray="6 3" rx="6" />
          <line x1="0" y1="0" x2={legW} y2="0" stroke={BLUE} strokeWidth="2" strokeDasharray="8 4" />
          <text x={legW / 2} y="-5" textAnchor="middle" fontSize="13" fill="rgba(14,165,233,0.5)">✂</text>
        </svg>

        {/* ── bottom accent bar ── */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 5, background: `linear-gradient(90deg, ${BLUE_DARK}, ${BLUE_GLOW} 50%, ${BLUE_DARK})` }} />
      </div>
    </div>
  )
}
