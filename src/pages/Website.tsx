import { useEffect, useRef, useState, type ReactNode } from 'react'
import logo from '../assets/university-logo.png'
import MouseMascot from '../components/MouseMascot'
import PeekByte from '../components/PeekByte'
import { WORLD_ICON_COMPONENTS } from '../components/WorldIcons'
import { COPY, LANG_LABELS, RTL_LANGS, WORLD_NAMES, DEPARTMENT_URL, type Lang } from '../i18n'

/* ── Palette: deep-space blue, no gold ── */
const VOID = '#050D1A'
const VOID_2 = '#081426'
const BLUE = '#0EA5E9'
const BLUE_GLOW = '#38BDF8'
const BLUE_DARK = '#0369A1'
const INK = 'rgba(255,255,255,0.62)'

const display = "'Sora', sans-serif"
const body = "'Inter', sans-serif"
const mono = "'JetBrains Mono', monospace"

/* Reveal-on-scroll */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect() } },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return { ref, shown }
}

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const { ref, shown } = useReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateY(28px)',
        transition: `opacity 0.7s cubic-bezier(.2,.7,.2,1) ${delay}s, transform 0.7s cubic-bezier(.2,.7,.2,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

export default function Website() {
  const [lang, setLang] = useState<Lang>('ku')
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [active, setActive] = useState(0)
  const [hoveredWorld, setHoveredWorld] = useState<number | null>(null)
  const [scrollY, setScrollY] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  const t = COPY[lang]
  const rtl = RTL_LANGS.includes(lang)
  const langFont = rtl ? "'Noto Kufi Arabic', 'Tahoma', sans-serif" : body

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* keep <html lang/dir> in sync so screen readers, fonts and browser UI follow the chosen language */
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = rtl ? 'rtl' : 'ltr'
  }, [lang, rtl])

  return (
    <div dir={rtl ? 'rtl' : 'ltr'} style={{ fontFamily: langFont, background: VOID, color: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
      <style>{`
        @keyframes drift { from { transform: translateY(0) } to { transform: translateY(-40px) } }
        @keyframes twinkle { 0%,100% { opacity: .25 } 50% { opacity: .9 } }
        @keyframes pulse { 0%,100% { opacity: .5; transform: scale(1) } 50% { opacity: .85; transform: scale(1.06) } }
        @keyframes orbit { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        html { scroll-behavior: smooth; }
        ::selection { background: ${BLUE}; color: #04101f; }
        .navlink { position: relative; }
        .navlink::after { content:''; position:absolute; left:12px; right:12px; bottom:2px; height:1px; background:${BLUE_GLOW}; transform:scaleX(0); transform-origin:left; transition:transform .25s; }
        .navlink:hover::after { transform:scaleX(1); }
        .wcard { transition: transform .4s cubic-bezier(.2,.7,.2,1), border-color .4s, background .4s; }
        .wcard:hover { transform: translateY(-8px); border-color: rgba(56,189,248,.55) !important; background: rgba(14,165,233,.10) !important; }
        .wcard:hover .wlong { max-height: 120px; opacity: 1; margin-top: 12px; }
        .wlong { max-height: 0; opacity: 0; overflow: hidden; transition: max-height .45s ease, opacity .35s, margin-top .35s; }
        .cta { transition: transform .2s, box-shadow .3s; }
        .cta:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(14,165,233,.45); }
        .ghost { transition: background .25s, border-color .25s; }
        .ghost:hover { background: rgba(56,189,248,.10); border-color: rgba(56,189,248,.6) !important; }
        .langbtn { transition: background .2s, color .2s; }
        .icon-tile {
          width: 96px; height: 96px; border-radius: 20px; display: flex; align-items: center; justify-content: center;
          background: linear-gradient(155deg, rgba(56,189,248,0.14), rgba(14,165,233,0.04));
          border: 1px solid rgba(56,189,248,0.22); box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
          transition: transform .35s cubic-bezier(.2,.7,.2,1), border-color .35s, background .35s;
        }
        .wcard:hover .icon-tile { transform: translateY(-4px) scale(1.04); border-color: rgba(56,189,248,0.5); background: linear-gradient(155deg, rgba(56,189,248,0.22), rgba(14,165,233,0.06)); }
        .menu-btn { display: none; }
        .mobile-menu { display: none; }
        @media (max-width: 900px) {
          .why-grid { grid-template-columns: 1fr !important; }
          .join-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 680px) {
          .nav-links { display: none !important; }
          .lang-switcher { display: none !important; }
          .nav-cta, .nav-poster { display: none !important; }
          .menu-btn { display: flex !important; }
          .mobile-menu { display: flex !important; }
        }
        @keyframes menu-drop { from { opacity: 0; transform: translateY(-10px) } to { opacity: 1; transform: none } }
        /* Touch / no-hover devices: reveal card details permanently since hover can't fire */
        @media (hover: none), (max-width: 768px) {
          .wlong { max-height: 240px !important; opacity: 1 !important; margin-top: 12px !important; }
          .wcard:hover { transform: none; }
        }
      `}</style>

      {/* ── STARFIELD ── */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        {Array.from({ length: 40 }).map((_, i) => {
          const seed = (i * 9301 + 49297) % 233280
          const x = (seed % 100)
          const y = ((seed * 7) % 100)
          const sz = 1 + (i % 3)
          return (
            <span key={i} style={{
              position: 'absolute', left: `${x}%`, top: `${y}%`, width: sz, height: sz,
              borderRadius: '50%', background: i % 4 === 0 ? BLUE_GLOW : '#fff',
              animation: `twinkle ${3 + (i % 5)}s ease-in-out ${i * 0.2}s infinite`,
            }} />
          )
        })}
      </div>

      {/* ── NAV ── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(5,13,26,0.72)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(56,189,248,0.15)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68, gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={logo} alt="Nawroz University" style={{ height: 40, width: 40, objectFit: 'contain', borderRadius: '50%', background: '#fff', padding: 3 }} />
            <div>
              <div style={{ fontFamily: display, fontWeight: 700, fontSize: 15, letterSpacing: -0.2 }}>Computer Science</div>
              <div style={{ color: BLUE_GLOW, fontFamily: mono, fontSize: 10, letterSpacing: 1 }}>NAWROZ UNIVERSITY · DUHOK</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {[[t.nav.worlds, 'worlds'], [t.nav.byte, 'byte'], [t.nav.why, 'why'], [t.nav.faq, 'faq'], [t.nav.join, 'join']].map(([l, id]) => (
                <a key={id} href={`#${id}`} className="navlink" style={{ color: 'rgba(255,255,255,0.72)', textDecoration: 'none', padding: '8px 12px', fontSize: 13.5, fontWeight: 500 }}>{l}</a>
              ))}
            </div>
            {/* language switcher */}
            <div className="lang-switcher" style={{ display: 'flex', alignItems: 'center', gap: 2, marginLeft: 8, padding: 3, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10 }}>
              {(['ku', 'ar', 'en'] as Lang[]).map((l) => (
                <button key={l} onClick={() => setLang(l)} className="langbtn" style={{
                  padding: '6px 10px', borderRadius: 7, border: 'none', cursor: 'pointer',
                  fontFamily: mono, fontSize: 11.5, fontWeight: 700,
                  background: lang === l ? BLUE : 'transparent',
                  color: lang === l ? '#04101f' : 'rgba(255,255,255,0.6)',
                }}>{LANG_LABELS[l]}</button>
              ))}
            </div>
            <a href="#join" className="cta nav-cta" style={{ marginLeft: 6, padding: '9px 16px', background: `linear-gradient(90deg, ${BLUE_DARK}, ${BLUE})`, color: '#fff', borderRadius: 10, textDecoration: 'none', fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap' }}>{t.nav.cta}</a>
            <a href="#/poster" className="ghost nav-poster" style={{ marginLeft: 6, padding: '9px 14px', background: 'transparent', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, textDecoration: 'none', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}>{t.nav.poster}</a>
            {/* mobile hamburger */}
            <button
              className="menu-btn"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              style={{
                marginLeft: 6, width: 40, height: 40, borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)',
                background: menuOpen ? 'rgba(56,189,248,0.15)' : 'transparent', cursor: 'pointer',
                flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
              }}
            >
              <span style={{ width: 18, height: 2, background: '#fff', borderRadius: 2, transition: 'transform .25s', transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none' }} />
              <span style={{ width: 18, height: 2, background: '#fff', borderRadius: 2, opacity: menuOpen ? 0 : 1, transition: 'opacity .2s' }} />
              <span style={{ width: 18, height: 2, background: '#fff', borderRadius: 2, transition: 'transform .25s', transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="mobile-menu" style={{
            flexDirection: 'column', padding: '10px 24px 20px', gap: 4,
            background: 'rgba(5,13,26,0.96)', borderTop: '1px solid rgba(56,189,248,0.15)',
            animation: 'menu-drop .22s ease',
          }}>
            {[[t.nav.worlds, 'worlds'], [t.nav.byte, 'byte'], [t.nav.why, 'why'], [t.nav.faq, 'faq'], [t.nav.join, 'join']].map(([l, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', padding: '12px 4px', fontSize: 15, fontWeight: 500, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{l}</a>
            ))}
            <a href="#/poster" onClick={() => setMenuOpen(false)} style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', padding: '12px 4px', fontSize: 14, fontWeight: 500 }}>{t.nav.poster}</a>
            <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 12, padding: 3, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, alignSelf: 'flex-start' }}>
              {(['ku', 'ar', 'en'] as Lang[]).map((l) => (
                <button key={l} onClick={() => setLang(l)} className="langbtn" style={{
                  padding: '7px 12px', borderRadius: 7, border: 'none', cursor: 'pointer',
                  fontFamily: mono, fontSize: 12, fontWeight: 700,
                  background: lang === l ? BLUE : 'transparent',
                  color: lang === l ? '#04101f' : 'rgba(255,255,255,0.6)',
                }}>{LANG_LABELS[l]}</button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', padding: '110px 24px 90px', zIndex: 1 }}>
        <div style={{ position: 'absolute', top: 40 - scrollY * 0.15, left: '50%', transform: 'translateX(-50%)', width: 820, height: 820, maxWidth: '120vw', background: 'radial-gradient(circle, rgba(14,165,233,0.20) 0%, rgba(14,165,233,0.05) 45%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        {/* orbiting ring */}
        <div style={{ position: 'absolute', top: 120, left: '50%', width: 540, height: 540, marginLeft: -270, border: '1px solid rgba(56,189,248,0.12)', borderRadius: '50%', animation: 'orbit 60s linear infinite', pointerEvents: 'none' }}>
          <span style={{ position: 'absolute', top: -4, left: '50%', width: 8, height: 8, marginLeft: -4, borderRadius: '50%', background: BLUE_GLOW, boxShadow: `0 0 16px ${BLUE_GLOW}` }} />
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', textAlign: 'center' }}>
          {/* prominent Computer Science wordmark — always visible on load, every language */}
          <div style={{
            fontFamily: mono, fontSize: 'clamp(13px, 1.6vw, 15px)', fontWeight: 800, letterSpacing: 3,
            color: BLUE_GLOW, textTransform: 'uppercase', marginBottom: 14, textShadow: `0 0 24px rgba(56,189,248,0.5)`,
          }}>
            {t.hero.kicker}
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', border: '1px solid rgba(56,189,248,0.3)', borderRadius: 50, marginBottom: 26, fontFamily: mono, fontSize: 11, letterSpacing: 1.5, color: BLUE_GLOW }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: BLUE_GLOW, animation: 'pulse 2s infinite' }} />
            {t.hero.badge}
          </div>

          <h1 style={{ fontFamily: rtl ? langFont : display, fontSize: 'clamp(40px, 6.4vw, 78px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: rtl ? 0 : -2, margin: '0 0 26px' }}>
            {t.hero.titleLine1}<br />
            <span style={{ background: `linear-gradient(90deg, ${BLUE_GLOW}, ${BLUE})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t.hero.titleLine2}</span>
          </h1>

          <p style={{ color: INK, fontSize: 'clamp(16px, 2vw, 19px)', lineHeight: 1.8, maxWidth: 600, margin: '0 auto 40px' }}>
            {t.hero.paragraph}
          </p>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#worlds" className="cta" style={{ padding: '15px 32px', background: `linear-gradient(90deg, ${BLUE_DARK}, ${BLUE})`, color: '#fff', borderRadius: 12, textDecoration: 'none', fontSize: 15, fontWeight: 700 }}>{t.hero.ctaEnter} {rtl ? '←' : '→'}</a>
            <a href="#why" className="ghost" style={{ padding: '15px 32px', background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.22)', borderRadius: 12, textDecoration: 'none', fontSize: 15, fontWeight: 600 }}>{t.hero.ctaWhy}</a>
          </div>

          {/* quiet metrics, no salary/employment */}
          <div style={{ display: 'flex', gap: 40, justifyContent: 'center', flexWrap: 'wrap', marginTop: 64 }}>
            {[['7', t.hero.stat0], ['4', t.hero.stat1], ['∞', t.hero.stat2]].map(([n, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: display, fontSize: 40, fontWeight: 800, color: BLUE_GLOW, lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: rtl ? langFont : mono, fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 8, letterSpacing: 0.5 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORLDS ── */}
      <section id="worlds" style={{ position: 'relative', zIndex: 1, padding: '80px 24px', background: `linear-gradient(180deg, transparent, ${VOID_2} 20%, ${VOID_2} 80%, transparent)` }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div style={{ fontFamily: mono, fontSize: 12, color: BLUE, letterSpacing: 2, marginBottom: 14 }}>{t.worlds.kicker}</div>
              <h2 style={{ fontFamily: rtl ? langFont : display, fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 800, letterSpacing: rtl ? 0 : -1, margin: 0 }}>{t.worlds.title}</h2>
              <p style={{ color: INK, fontSize: 16, maxWidth: 560, margin: '16px auto 0' }}>{t.worlds.subtitle}</p>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {WORLD_NAMES.map((name, i) => {
              const w = t.worlds.items[i]
              return (
                <Reveal key={i} delay={(i % 3) * 0.08}>
                  <div
                    className="wcard"
                    onMouseEnter={() => setHoveredWorld(i)}
                    onMouseLeave={() => setHoveredWorld((h) => (h === i ? null : h))}
                    onTouchStart={() => setHoveredWorld(i)}
                    style={{
                      background: 'rgba(14,165,233,0.05)', border: '1px solid rgba(56,189,248,0.18)',
                      borderRadius: 18, padding: '26px 24px', height: '100%', position: 'relative', overflow: 'hidden',
                    }}>
                    <div style={{ position: 'absolute', top: -30, right: -30, width: 110, height: 110, background: 'radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
                      <div className="icon-tile">
                        {(() => { const Icon = WORLD_ICON_COMPONENTS[i]; return <Icon on={hoveredWorld === i} /> })()}
                      </div>
                      <span style={{ fontFamily: mono, fontSize: 12, color: 'rgba(255,255,255,0.25)', marginTop: 4 }}>{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    {/* world name always English, per department decision */}
                    <div style={{ fontFamily: display, fontSize: 20, fontWeight: 700, marginBottom: 6, direction: 'ltr', textAlign: rtl ? 'right' : 'left' }}>{name}</div>
                    <div style={{ color: BLUE_GLOW, fontSize: 14, fontWeight: 500 }}>{w.line}</div>
                    <div className="wlong" style={{ color: INK, fontSize: 13.5, lineHeight: 1.65 }}>{w.long}</div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── MEET BYTE (interactive mascot) ── */}
      <section id="byte" style={{ position: 'relative', zIndex: 1, padding: '80px 24px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={{ fontFamily: mono, fontSize: 12, color: BLUE, letterSpacing: 2, marginBottom: 14 }}>{t.byte.kicker}</div>
              <h2 style={{ fontFamily: rtl ? langFont : display, fontSize: 'clamp(30px, 4.5vw, 48px)', fontWeight: 800, letterSpacing: rtl ? 0 : -1, margin: 0 }}>{t.byte.title}</h2>
              <p style={{ color: INK, fontSize: 16, maxWidth: 520, margin: '16px auto 0' }}>
                {t.byte.subtitle}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <MouseMascot />
          </Reveal>
        </div>
      </section>

      {/* ── WHY CS (interactive) ── */}
      <section id="why" style={{ position: 'relative', zIndex: 1, padding: '90px 24px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div style={{ fontFamily: mono, fontSize: 12, color: BLUE, letterSpacing: 2, marginBottom: 14 }}>{t.why.kicker}</div>
              <h2 style={{ fontFamily: rtl ? langFont : display, fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 800, letterSpacing: rtl ? 0 : -1, margin: 0 }}>{t.why.title}</h2>
            </div>
          </Reveal>

          <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 340px) 1fr', gap: 40, alignItems: 'start' }}>
            {/* selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {t.why.reasons.map((r, i) => (
                <button key={i} onClick={() => setActive(i)} style={{
                  textAlign: rtl ? 'right' : 'left', cursor: 'pointer', padding: '16px 18px', borderRadius: 14,
                  background: active === i ? 'rgba(14,165,233,0.12)' : 'transparent',
                  border: `1px solid ${active === i ? 'rgba(56,189,248,0.45)' : 'rgba(255,255,255,0.08)'}`,
                  color: '#fff', display: 'flex', gap: 14, alignItems: 'center', transition: 'all .25s',
                }}>
                  <span style={{ fontFamily: mono, fontSize: 13, color: active === i ? BLUE_GLOW : 'rgba(255,255,255,0.3)' }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ fontFamily: rtl ? langFont : display, fontSize: 16, fontWeight: 600 }}>{r.t}</span>
                </button>
              ))}
            </div>
            {/* panel */}
            <div style={{ position: 'relative', background: 'rgba(8,20,38,0.6)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 20, padding: 'clamp(26px, 4vw, 40px)', minHeight: 260, overflow: 'hidden' }}>
              <div style={{ position: 'absolute', bottom: -60, right: -60, width: 220, height: 220, background: 'radial-gradient(circle, rgba(14,165,233,0.16) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div key={active} style={{ animation: 'fadeSlide .5s ease' }}>
                <style>{`@keyframes fadeSlide { from { opacity:0; transform:translateY(14px) } to { opacity:1; transform:none } }`}</style>
                <div style={{ fontFamily: mono, fontSize: 48, fontWeight: 700, color: 'rgba(56,189,248,0.25)', lineHeight: 1 }}>{String(active + 1).padStart(2, '0')}</div>
                <h3 style={{ fontFamily: rtl ? langFont : display, fontSize: 28, fontWeight: 700, margin: '14px 0 16px', letterSpacing: rtl ? 0 : -0.5 }}>{t.why.reasons[active].t}</h3>
                <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 17, lineHeight: 1.8, margin: 0 }}>{t.why.reasons[active].d}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BORDERLESS BANNER ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '10px 24px 90px' }}>
        <Reveal>
          <div style={{
            maxWidth: 1080, margin: '0 auto', borderRadius: 24, overflow: 'hidden', position: 'relative',
            background: `linear-gradient(135deg, rgba(14,165,233,0.18), rgba(3,105,161,0.08))`,
            border: '1px solid rgba(56,189,248,0.3)', padding: '54px 48px', textAlign: 'center',
          }}>
            <div style={{ position: 'absolute', top: -80, left: '50%', marginLeft: -200, width: 400, height: 400, background: 'radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ fontSize: 44, marginBottom: 16 }}>🌍</div>
            <h2 style={{ fontFamily: rtl ? langFont : display, fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 800, letterSpacing: rtl ? 0 : -1, margin: '0 0 14px' }}>
              {t.banner.title}
            </h2>
            <p style={{ color: INK, fontSize: 17, lineHeight: 1.7, maxWidth: 620, margin: '0 auto' }}>
              {t.banner.text}
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ position: 'relative', zIndex: 1, padding: '80px 24px', background: `linear-gradient(180deg, transparent, ${VOID_2} 15%, ${VOID_2} 85%, transparent)` }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontFamily: mono, fontSize: 12, color: BLUE, letterSpacing: 2, marginBottom: 14 }}>{t.faq.kicker}</div>
              <h2 style={{ fontFamily: rtl ? langFont : display, fontSize: 'clamp(32px, 4.5vw, 48px)', fontWeight: 800, letterSpacing: rtl ? 0 : -1, margin: 0 }}>{t.faq.title}</h2>
            </div>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {t.faq.items.map((f, i) => (
              <div key={i} style={{ background: 'rgba(8,20,38,0.6)', border: `1px solid ${openFaq === i ? 'rgba(56,189,248,0.4)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 14, overflow: 'hidden', transition: 'border-color .25s' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '20px 24px', textAlign: rtl ? 'right' : 'left', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                  <span style={{ fontFamily: rtl ? langFont : display, fontSize: 16, fontWeight: 600, color: '#fff' }}>{f.q}</span>
                  <span style={{ fontSize: 24, color: BLUE_GLOW, flexShrink: 0, transition: 'transform .25s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                <div style={{ maxHeight: openFaq === i ? 260 : 0, overflow: 'hidden', transition: 'max-height .4s ease' }}>
                  <p style={{ padding: '0 24px 22px', fontSize: 15, color: INK, lineHeight: 1.8, margin: 0 }}>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHOOSE US AT ADMISSION ── */}
      <section id="join" style={{ position: 'relative', zIndex: 1, padding: '90px 24px' }}>
        <Reveal>
          <div style={{
            maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative',
            background: 'rgba(8,20,38,0.6)', border: '1px solid rgba(56,189,248,0.3)',
            borderRadius: 28, padding: 'clamp(40px, 6vw, 72px) 32px', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -90, left: '50%', marginLeft: -220, width: 440, height: 440, background: 'radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ fontFamily: mono, fontSize: 12, color: BLUE, letterSpacing: 2, marginBottom: 18, position: 'relative' }}>{t.join.kicker}</div>

            <h2 style={{ fontFamily: rtl ? langFont : display, fontSize: 'clamp(30px, 4.5vw, 52px)', fontWeight: 800, letterSpacing: rtl ? 0 : -1.2, margin: '0 0 20px', position: 'relative', lineHeight: 1.15 }}>
              {t.join.titleLine1}<br />
              <span style={{ background: `linear-gradient(90deg, ${BLUE_GLOW}, ${BLUE})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t.join.titleHighlight}</span>
            </h2>

            <p style={{ color: INK, fontSize: 'clamp(15px, 2vw, 18px)', lineHeight: 1.8, maxWidth: 560, margin: '0 auto 36px', position: 'relative' }}>
              {t.join.paragraph}
            </p>

            {/* the table marker — now links to the real department page */}
            <a
              href={DEPARTMENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 16, padding: '18px 28px', borderRadius: 18,
                background: `linear-gradient(90deg, ${BLUE_DARK}, ${BLUE})`, boxShadow: '0 12px 50px rgba(14,165,233,0.4)',
                position: 'relative', marginBottom: 18, textDecoration: 'none', color: '#fff',
              }}
            >
              <span style={{ fontSize: 30 }}>🎓</span>
              <div style={{ textAlign: rtl ? 'right' : 'left' }}>
                <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: 1, color: 'rgba(255,255,255,0.8)' }}>{t.join.tableKicker}</div>
                <div style={{ fontFamily: rtl ? langFont : display, fontSize: 19, fontWeight: 800 }}>{t.join.tableTitle}</div>
              </div>
              <span style={{ fontSize: 20, opacity: 0.85, marginInlineStart: 4 }}>↗</span>
            </a>
            <div style={{ marginBottom: 30 }}>
              <a href={DEPARTMENT_URL} target="_blank" rel="noopener noreferrer" style={{ color: BLUE_GLOW, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>{t.join.linkLabel}</a>
            </div>

            {/* quick facts */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, justifyContent: 'center', position: 'relative' }}>
              {[['🖥️', t.join.facts[0]], ['🎓', t.join.facts[1]], ['🌍', t.join.facts[2]], ['🚀', t.join.facts[3]]].map(([ic, l]) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
                  <span style={{ fontSize: 18 }}>{ic}</span>{l}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ position: 'relative', zIndex: 1, borderTop: '1px solid rgba(56,189,248,0.18)', padding: '32px 24px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={logo} alt="Nawroz University" style={{ height: 36, width: 36, objectFit: 'contain', borderRadius: '50%', background: '#fff', padding: 3 }} />
            <div>
              <div style={{ fontFamily: rtl ? langFont : display, fontWeight: 700, fontSize: 14 }}>{t.footer.deptName}</div>
              <div style={{ fontFamily: rtl ? langFont : mono, fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: 0.5 }}>{t.footer.tagline}</div>
            </div>
          </div>
          <a href={DEPARTMENT_URL} target="_blank" rel="noopener noreferrer" className="navlink" style={{ color: BLUE_GLOW, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>{t.footer.findTable}</a>
        </div>
        <div style={{ maxWidth: 1180, margin: '18px auto 0', color: 'rgba(255,255,255,0.3)', fontSize: 12, fontFamily: rtl ? langFont : mono }}>{t.footer.copyright}</div>
      </footer>

      {/* shy Byte peeking from the corner */}
      <PeekByte />
    </div>
  )
}
