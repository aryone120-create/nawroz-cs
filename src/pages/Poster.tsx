import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import logo from '../assets/university-logo.png'
import { downloadWordDoc } from '../utils/wordExport'

const PW = 898
const PH = 1270

const BLUE      = '#0EA5E9'
const BLUE_DARK = '#0369A1'
const BLUE_GLOW = '#38BDF8'

const subjects = [
  { icon: '🤖', name: 'Artificial Intelligence', line: 'Think. Predict. Automate.' },
  { icon: '🎮', name: 'Game Design',              line: 'Build worlds people play in.' },
  { icon: '🦾', name: 'Robotics',                 line: 'Machines that move and sense.' },
  { icon: '🌐', name: 'Web Development',          line: 'Power the internet.' },
  { icon: '📱', name: 'Mobile Apps',              line: 'A billion pockets, your idea.' },
  { icon: '🖥️', name: 'Desktop Software',        line: 'Tools the world relies on.' },
]

export default function Poster() {
  const [scale, setScale] = useState(0.7)
  const qrUrl = typeof window !== 'undefined' ? `${window.location.origin}/website` : 'https://cs.nawroz.edu.krd'

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
          html, body { margin: 0; padding: 0; background: #050D1A; }
          .poster-scale { transform: none !important; margin: 0 !important; }
          .poster-bg { box-shadow: none !important; }
        }
      `}</style>

      <div className="no-print" style={{ minHeight: '100vh', background: '#1E293B', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 16px 60px', gap: 18 }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
          <a href="/website" style={{ padding: '9px 18px', background: '#0F172A', color: '#fff', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>← Website</a>
          <button onClick={() => window.print()} style={{ padding: '9px 18px', background: BLUE, color: '#fff', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>🖨 Print / Save PDF</button>
          <button onClick={downloadWordDoc} style={{ padding: '9px 18px', background: '#1D4ED8', color: '#fff', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>📄 Download Word</button>
        </div>

        <div style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.45)', fontSize: 12, textAlign: 'center', maxWidth: 500, lineHeight: 1.6 }}>
          <strong style={{ color: 'rgba(255,255,255,0.7)' }}>To edit in Figma:</strong> click Print → Save as PDF → open Figma → File → Place Image. Or use the Word download for full text editing.
        </div>

        <div className="poster-scale" style={{ transform: `scale(${scale})`, transformOrigin: 'top center', marginBottom: PH * (scale - 1) }}>
          <PosterSheet qrUrl={qrUrl} />
        </div>
      </div>
    </>
  )
}

export function PosterSheet({ qrUrl }: { qrUrl: string }) {
  return (
    <div className="poster-bg" style={{
      width: PW, height: PH,
      background: '#050D1A',
      fontFamily: 'Inter, sans-serif',
      direction: 'ltr',
      boxShadow: '0 40px 120px rgba(0,0,0,0.8)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* ── BACKGROUND GLOWS ── */}
      {/* Large central orb */}
      <div style={{ position: 'absolute', top: 80, left: '50%', transform: 'translateX(-50%)', width: 700, height: 700, background: `radial-gradient(circle, rgba(14,165,233,0.22) 0%, rgba(14,165,233,0.06) 45%, transparent 70%)`, borderRadius: '50%', pointerEvents: 'none' }} />
      {/* Top-right secondary glow */}
      <div style={{ position: 'absolute', top: -80, right: -80, width: 360, height: 360, background: `radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 65%)`, borderRadius: '50%', pointerEvents: 'none' }} />
      {/* Bottom glow */}
      <div style={{ position: 'absolute', bottom: -60, left: '50%', transform: 'translateX(-50%)', width: 500, height: 300, background: `radial-gradient(ellipse, rgba(14,165,233,0.15) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      {/* Subtle dot grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
      {/* Horizontal scan lines - very subtle */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.012) 3px, rgba(255,255,255,0.012) 4px)', pointerEvents: 'none' }} />

      {/* ── BLUE TOP BORDER ── */}
      <div style={{ height: 6, background: `linear-gradient(90deg, ${BLUE_DARK}, ${BLUE_GLOW} 50%, ${BLUE_DARK})`, flexShrink: 0 }} />

      {/* ── HEADER ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 36px', flexShrink: 0 }}>
        <img src={logo} alt="Nawroz University" style={{ height: 62, filter: 'brightness(0) invert(1)', opacity: 0.85 }} />
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: BLUE_GLOW, fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase' }}>Nawroz University · Duhok</div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 2 }}>College of Science</div>
        </div>
      </div>

      {/* ── HERO ── */}
      <div style={{ flex: '0 0 auto', padding: '32px 36px 24px', position: 'relative' }}>
        {/* Department label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <div style={{ width: 36, height: 2, background: BLUE }} />
          <div style={{ fontSize: 12, fontWeight: 700, color: BLUE, letterSpacing: 3, textTransform: 'uppercase' }}>Department of</div>
        </div>

        {/* COMPUTER SCIENCE — the headline */}
        <div style={{ fontSize: 86, fontWeight: 900, color: '#fff', lineHeight: 0.88, letterSpacing: -3 }}>
          COMPUTER
        </div>
        <div style={{
          fontSize: 86, fontWeight: 900, lineHeight: 0.88, letterSpacing: -3, marginBottom: 28,
          background: `linear-gradient(90deg, ${BLUE_GLOW}, ${BLUE})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          SCIENCE
        </div>

        {/* Tagline */}
        <div style={{
          fontSize: 20, fontWeight: 300, color: 'rgba(255,255,255,0.75)', letterSpacing: 0.5, marginBottom: 20,
          borderLeft: `3px solid ${BLUE}`, paddingLeft: 16,
        }}>
          We have our own world.<br />
          <span style={{ fontWeight: 700, color: '#fff' }}>Come build yours.</span>
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div style={{ margin: '0 36px', height: 1, background: `linear-gradient(90deg, ${BLUE}, rgba(14,165,233,0.1))`, flexShrink: 0 }} />

      {/* ── SUBJECTS ── */}
      <div style={{ padding: '22px 36px', flexShrink: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 16 }}>
          Six worlds to master
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          {subjects.map((s, i) => (
            <div key={i} style={{
              background: 'rgba(14,165,233,0.06)',
              border: '1px solid rgba(14,165,233,0.18)',
              borderRadius: 14,
              padding: '16px 14px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* subtle glow corner */}
              <div style={{ position: 'absolute', top: -20, right: -20, width: 70, height: 70, background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', marginBottom: 5, lineHeight: 1.2 }}>{s.name}</div>
              <div style={{ fontSize: 11, color: BLUE_GLOW, fontWeight: 500 }}>{s.line}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── OUR WORLD STATEMENT ── */}
      <div style={{
        margin: '4px 36px 16px',
        padding: '18px 24px',
        background: `linear-gradient(135deg, rgba(14,165,233,0.15), rgba(3,105,161,0.08))`,
        border: `1px solid rgba(14,165,233,0.3)`,
        borderRadius: 16,
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: -30, top: '50%', transform: 'translateY(-50%)', fontSize: 100, opacity: 0.04, pointerEvents: 'none', userSelect: 'none' }}>🌐</div>
        <div style={{ fontSize: 17, fontWeight: 800, color: '#fff', marginBottom: 6 }}>
          Work from anywhere — home, office, or the other side of the world.
        </div>
        <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
          Taught by experienced professionals. Graduate ready for local companies, regional firms, or remote roles with global clients.
        </div>
      </div>

      {/* ── QR FOOTER ── */}
      <div style={{
        marginTop: 'auto',
        background: `linear-gradient(180deg, rgba(14,165,233,0.08) 0%, rgba(14,165,233,0.18) 100%)`,
        borderTop: `1px solid rgba(14,165,233,0.25)`,
        padding: '20px 36px',
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        flexShrink: 0,
      }}>
        {/* QR */}
        <div style={{ flexShrink: 0, textAlign: 'center' }}>
          <div style={{ background: '#fff', padding: 8, borderRadius: 12, display: 'inline-block', marginBottom: 8 }}>
            <QRCodeSVG value={qrUrl} size={86} fgColor="#050D1A" />
          </div>
          <div style={{ fontSize: 12, fontWeight: 800, color: BLUE_GLOW, letterSpacing: 1, textTransform: 'uppercase' }}>Join Our World</div>
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 80, background: 'rgba(14,165,233,0.25)', flexShrink: 0 }} />

        {/* Text */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', marginBottom: 6, lineHeight: 1.2 }}>
            Ready to enter<br /><span style={{ color: BLUE_GLOW }}>our world?</span>
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 10 }}>Scan · Explore · Apply</div>
          <div style={{ fontSize: 13, color: BLUE, fontWeight: 700 }}>cs.nawroz.edu.krd</div>
        </div>

        {/* Contact */}
        <div style={{ flexShrink: 0, textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 5, lineHeight: 1.8 }}>
            📍 Duhok, Kurdistan Region<br />
            📧 cs@nawroz.edu.krd<br />
            🎓 4-Year Bachelor's Degree
          </div>
        </div>
      </div>

      {/* ── BLUE BOTTOM BORDER ── */}
      <div style={{ height: 6, background: `linear-gradient(90deg, ${BLUE_DARK}, ${BLUE_GLOW} 50%, ${BLUE_DARK})`, flexShrink: 0 }} />
    </div>
  )
}
