import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import logo from '../assets/university-logo.png'
import MouseMascot from '../components/MouseMascot'
import PeekByte from '../components/PeekByte'
import { WORLD_ICON_COMPONENTS } from '../components/WorldIcons'
import { CapIcon, CodeIcon, CollegeIcon, ExternalIcon, GlobeIcon, LayersIcon, PhoneIcon, PinIcon, SparkIcon, WorldBadge } from '../components/LineIcons'
import {
  ADDRESS, COPY, DEPARTMENT_URL, LANG_LABELS, MAPS_URL, PHONE, PHONE_HREF, RTL_LANGS, UNIVERSITY_URL, WORLD_NAMES, type Lang,
} from '../i18n'

/* ── palette: deep-space blue ── */
const VOID = '#050D1A'
const VOID_2 = '#081426'
const BLUE = '#0EA5E9'
const GLOW = '#38BDF8'
const DEEP = '#0369A1'
const INK = 'rgba(255,255,255,0.66)'

const SORA = "'Sora', sans-serif"
const INTER = "'Inter', sans-serif"
const MONO = "'JetBrains Mono', monospace"
const KUFI = "'Noto Kufi Arabic', 'Noto Sans Arabic', Tahoma, sans-serif"
const NASKH = "'Noto Sans Arabic', 'Noto Kufi Arabic', Tahoma, sans-serif"

const LANG_KEY = 'nawroz-cs-lang'
function initialLang(): Lang {
  try {
    const v = localStorage.getItem(LANG_KEY)
    if (v === 'en' || v === 'ku' || v === 'ar') return v
  } catch { /* storage unavailable */ }
  return 'ku'
}

/* The app uses hash routing (#/poster), so plain href="#section" links would be treated as
   a route and blank the page. Every in-page link goes through this instead. */
function scrollToId(id: string) {
  if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ── reveal on scroll ── */
function useInView<T extends HTMLElement>(threshold = 0.15, once = true) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); if (once) io.disconnect() }
      else if (!once) setInView(false)
    }, { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, once])
  return { ref, inView }
}

function Reveal({ children, delay = 0, style }: { children: ReactNode; delay?: number; style?: CSSProperties }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.12)
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : 'translateY(26px)',
      transition: `opacity .7s cubic-bezier(.2,.7,.2,1) ${delay}s, transform .7s cubic-bezier(.2,.7,.2,1) ${delay}s`,
      ...style,
    }}>{children}</div>
  )
}

/* ── count-up number (keeps Kurdish digits for Kurdish) ── */
const EASTERN = '٠١٢٣٤٥٦٧٨٩'
function CountUp({ value, eastern }: { value: string; eastern: boolean }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.5)
  const western = value.replace(/[٠-٩]/g, (d) => String(EASTERN.indexOf(d)))
  const target = Number(western)
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView || Number.isNaN(target)) return
    let raf = 0
    const t0 = performance.now()
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / 1100)
      setN(Math.round(target * (1 - Math.pow(1 - k, 3))))
      if (k < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target])
  if (Number.isNaN(target)) return <span ref={ref}>{value}</span>
  const shown = eastern ? String(n).replace(/\d/g, (d) => EASTERN[+d]) : String(n)
  return <span ref={ref}>{shown}</span>
}

/* ── one world card: plays its icon animation on hover, on tap, and automatically
      when it scrolls into view (so phones see the animations too) ── */
function WorldCard({ i, name, local, text, rtl }: { i: number; name: string; local?: string; text: string; rtl: boolean }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.6, false)
  const [on, setOn] = useState(false)
  const offTimer = useRef<number | undefined>(undefined)
  const play = () => {
    window.clearTimeout(offTimer.current)
    setOn(false)
    requestAnimationFrame(() => requestAnimationFrame(() => setOn(true)))
    offTimer.current = window.setTimeout(() => setOn(false), 3600)
  }
  useEffect(() => { if (inView) play() }, [inView]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => window.clearTimeout(offTimer.current), [])
  const Icon = WORLD_ICON_COMPONENTS[i]
  return (
    <div
      ref={ref}
      className={`wcard${on ? ' playing' : ''}`}
      onMouseEnter={() => { window.clearTimeout(offTimer.current); setOn(true) }}
      onMouseLeave={() => setOn(false)}
      onClick={play}
    >
      <div className="wcard-sheen" />
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
        <div className="icon-tile"><Icon on={on} /></div>
        <span style={{ fontFamily: MONO, fontSize: 13, color: on ? GLOW : 'rgba(255,255,255,0.28)', transition: 'color .3s', marginTop: 4 }}>{String(i + 1).padStart(2, '0')}</span>
      </div>
      <div dir="ltr" style={{ fontFamily: SORA, fontSize: 20, fontWeight: 700, lineHeight: 1.3, textAlign: rtl ? 'right' : 'left' }}>{name}</div>
      {local && <div style={{ fontFamily: KUFI, fontSize: 14.5, fontWeight: 600, color: GLOW, marginTop: 4 }}>{local}</div>}
      <p style={{ color: INK, fontSize: 15, lineHeight: 1.85, margin: '12px 0 0' }}>{text}</p>
    </div>
  )
}

export default function Website() {
  const [lang, setLangState] = useState<Lang>(initialLang)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const t = COPY[lang]
  const rtl = RTL_LANGS.includes(lang)
  const head = rtl ? KUFI : SORA
  const bodyFont = rtl ? NASKH : INTER

  const setLang = (l: Lang) => {
    setLangState(l)
    try { localStorage.setItem(LANG_KEY, l) } catch { /* ignore */ }
  }

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = rtl ? 'rtl' : 'ltr'
    document.title = `${t.brand.name} — ${t.brand.sub}`
  }, [lang, rtl, t.brand.name, t.brand.sub])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* close the menu first, then scroll once layout has settled */
  const go = (id: string) => {
    setMenuOpen(false)
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToId(id)))
  }

  /* small label above each section title */
  const kicker = (extra: CSSProperties = {}): CSSProperties => (rtl
    ? { fontFamily: KUFI, fontSize: 14, fontWeight: 600, color: BLUE, ...extra }
    : { fontFamily: MONO, fontSize: 12.5, letterSpacing: 2, textTransform: 'uppercase', color: BLUE, ...extra })
  const h2: CSSProperties = { fontFamily: head, fontSize: 'clamp(28px, 4.4vw, 50px)', fontWeight: 800, letterSpacing: rtl ? 0 : -1, lineHeight: rtl ? 1.5 : 1.15, margin: 0 }

  const navItems: [string, string][] = [['worlds', t.nav.worlds], ['byte', t.nav.byte], ['why', t.nav.why], ['faq', t.nav.faq]]
  const langs: Lang[] = ['ku', 'ar', 'en']

  const whyIcons = [<CodeIcon size={26} key="a" />, <GlobeIcon size={26} key="b" />, <LayersIcon size={26} key="c" />, <SparkIcon size={26} key="d" />]
  const factIcons = [<CollegeIcon key="a" />, <CapIcon key="b" />, <GlobeIcon key="c" />, <SparkIcon key="d" />]

  return (
    <div id="top" dir={rtl ? 'rtl' : 'ltr'} lang={lang} style={{ fontFamily: bodyFont, background: VOID, color: '#fff', minHeight: '100vh', overflowX: 'clip' }}>
      <style>{`
        @keyframes twinkle { 0%,100% { opacity: .25 } 50% { opacity: .9 } }
        @keyframes pulse { 0%,100% { opacity: .5; transform: scale(1) } 50% { opacity: .9; transform: scale(1.25) } }
        @keyframes orbit { to { transform: rotate(360deg) } }
        @keyframes shimmer { 0% { background-position: 0% 50% } 100% { background-position: 200% 50% } }
        @keyframes caret { 0%,49% { opacity: 1 } 50%,100% { opacity: 0 } }
        @keyframes type-in-ltr { from { clip-path: inset(0 100% 0 0) } to { clip-path: inset(0 0 0 0) } }
        @keyframes type-in-rtl { from { clip-path: inset(0 0 0 100%) } to { clip-path: inset(0 0 0 0) } }
        @keyframes token-float { 0%,100% { transform: translateY(0) rotate(var(--rot)) } 50% { transform: translateY(-14px) rotate(var(--rot)) } }
        @keyframes grid-move { from { background-position: 0 0 } to { background-position: 0 48px } }
        @keyframes fade-up { from { opacity: 0; transform: translateY(18px) } to { opacity: 1; transform: none } }
        @keyframes sheen { from { transform: translateX(-120%) skewX(-18deg) } to { transform: translateX(260%) skewX(-18deg) } }
        @keyframes menu-drop { from { opacity: 0; transform: translateY(-8px) } to { opacity: 1; transform: none } }

        html { scroll-behavior: smooth; }
        body { margin: 0; background: ${VOID}; }
        section[id] { scroll-margin-top: 72px; }
        ::selection { background: ${BLUE}; color: #04101f; }
        a, button { -webkit-tap-highlight-color: transparent; }
        a:focus-visible, button:focus-visible, .wcard:focus-visible { outline: 2px solid ${GLOW}; outline-offset: 3px; }

        .navlink { position: relative; background: none; border: none; cursor: pointer; color: rgba(255,255,255,.75); padding: 8px 12px; font-size: 14px; font-weight: 500; font-family: inherit; transition: color .2s; }
        .navlink:hover { color: #fff; }
        .navlink::after { content: ''; position: absolute; inset-inline: 12px; bottom: 3px; height: 2px; border-radius: 2px; background: ${GLOW}; transform: scaleX(0); transition: transform .25s; }
        .navlink:hover::after { transform: scaleX(1); }

        .btn-primary { display: inline-flex; align-items: center; gap: 10px; padding: 15px 30px; border: none; cursor: pointer; border-radius: 14px; color: #fff; font-size: 16px; font-weight: 700; font-family: inherit; background: linear-gradient(90deg, ${DEEP}, ${BLUE}); box-shadow: 0 10px 30px rgba(14,165,233,.35); transition: transform .2s, box-shadow .3s; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 44px rgba(14,165,233,.5); }
        .btn-ghost { display: inline-flex; align-items: center; padding: 15px 30px; cursor: pointer; border-radius: 14px; color: #fff; font-size: 16px; font-weight: 600; font-family: inherit; background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.22); transition: background .25s, border-color .25s; }
        .btn-ghost:hover { background: rgba(56,189,248,.1); border-color: rgba(56,189,248,.6); }

        .langbtn { border: none; cursor: pointer; border-radius: 8px; transition: background .2s, color .2s; }

        .wordmark-glow { display: inline-block; filter: drop-shadow(0 0 26px rgba(56,189,248,.4)); }
        /* gradient text + typing reveal must live on the SAME element, or the text paints transparent */
        .wordmark {
          display: inline-block; position: relative; font-weight: 800; padding: 0 .04em;
          background: linear-gradient(90deg, #E0F2FE 0%, ${GLOW} 25%, ${BLUE} 45%, #A5F3FC 60%, ${GLOW} 80%, #E0F2FE 100%);
          background-size: 200% 100%; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent;
          animation: shimmer 6s linear infinite, ${rtl ? 'type-in-rtl' : 'type-in-ltr'} 1.2s steps(16, end) .2s both;
        }
        /* blinking cursor glued to the last letter (a pseudo-element can never wrap onto its own line) */
        .wordmark::after { content: ''; display: inline-block; width: .08em; height: .82em; margin-inline-start: .07em; vertical-align: -.04em; background: ${GLOW}; border-radius: 3px; box-shadow: 0 0 16px ${GLOW}; animation: caret 1s step-end infinite; }

        .token { position: absolute; font-family: ${MONO}; font-weight: 700; color: rgba(56,189,248,.28); animation: token-float 7s ease-in-out infinite; pointer-events: none; user-select: none; }

        .wcard { position: relative; overflow: hidden; height: 100%; box-sizing: border-box; cursor: pointer; padding: 26px 24px 28px; border-radius: 20px; background: rgba(14,165,233,.05); border: 1px solid rgba(56,189,248,.18); transition: transform .4s cubic-bezier(.2,.7,.2,1), border-color .4s, background .4s, box-shadow .4s; }
        .wcard:hover, .wcard.playing { border-color: rgba(56,189,248,.55); background: rgba(14,165,233,.10); box-shadow: 0 18px 50px rgba(2,132,199,.18); }
        @media (hover: hover) { .wcard:hover { transform: translateY(-6px); } }
        .wcard-sheen { position: absolute; top: 0; bottom: 0; left: 0; width: 40%; background: linear-gradient(90deg, transparent, rgba(125,211,252,.12), transparent); transform: translateX(-120%) skewX(-18deg); pointer-events: none; }
        .wcard.playing .wcard-sheen { animation: sheen 1.1s ease-out; }
        .icon-tile { direction: ltr; width: 96px; height: 96px; border-radius: 22px; display: flex; align-items: center; justify-content: center; background: linear-gradient(155deg, rgba(56,189,248,.15), rgba(14,165,233,.04)); border: 1px solid rgba(56,189,248,.24); box-shadow: inset 0 1px 0 rgba(255,255,255,.06); transition: transform .35s cubic-bezier(.2,.7,.2,1), border-color .35s, box-shadow .35s; }
        .wcard:hover .icon-tile, .wcard.playing .icon-tile { transform: scale(1.05); border-color: rgba(56,189,248,.55); box-shadow: 0 0 30px rgba(56,189,248,.25), inset 0 1px 0 rgba(255,255,255,.08); }
        .worlds-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 18px; }

        .why-card { position: relative; height: 100%; box-sizing: border-box; padding: 28px 26px; border-radius: 20px; background: linear-gradient(160deg, rgba(14,165,233,.09), rgba(8,20,38,.6)); border: 1px solid rgba(56,189,248,.18); transition: transform .35s, border-color .35s; overflow: hidden; }
        .why-card:hover { transform: translateY(-5px); border-color: rgba(56,189,248,.5); }
        .why-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }

        .faq-item { border-radius: 16px; overflow: hidden; background: rgba(8,20,38,.6); transition: border-color .25s; }
        .faq-q { width: 100%; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 20px 22px; font-family: inherit; }

        .fact { display: flex; align-items: center; gap: 10px; font-size: 14.5px; color: rgba(255,255,255,.85); }
        .fact-ic { display: inline-flex; width: 36px; height: 36px; flex-shrink: 0; border-radius: 11px; align-items: center; justify-content: center; background: rgba(56,189,248,.1); border: 1px solid rgba(56,189,248,.22); }
        .facts { display: grid; grid-template-columns: repeat(2, minmax(0, max-content)); justify-content: center; gap: 14px 30px; }

        .foot-link { color: rgba(255,255,255,.72); text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: color .2s; }
        .foot-link:hover { color: ${GLOW}; }

        .nav-links, .lang-switch { display: flex; }
        .menu-btn { display: none; }
        @media (max-width: 860px) {
          .nav-links, .lang-switch { display: none; }
          .menu-btn { display: inline-flex; }
          .why-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 560px) {
          .worlds-grid { grid-template-columns: 1fr; }
          .facts { grid-template-columns: 1fr; justify-content: start; }
          .btn-primary, .btn-ghost { width: 100%; justify-content: center; box-sizing: border-box; }
          .hero-stats { gap: 10px !important; }
          .token { display: none; }
          .token.keep { display: block; }
        }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          *, *::before, *::after { animation-duration: .001s !important; animation-iteration-count: 1 !important; transition-duration: .001s !important; }
        }
      `}</style>

      {/* ── BACKGROUND: dots + stars ── */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        {Array.from({ length: 36 }).map((_, i) => {
          const seed = (i * 9301 + 49297) % 233280
          return <span key={i} style={{ position: 'absolute', left: `${seed % 100}%`, top: `${(seed * 7) % 100}%`, width: 1 + (i % 3), height: 1 + (i % 3), borderRadius: '50%', background: i % 4 === 0 ? GLOW : '#fff', animation: `twinkle ${3 + (i % 5)}s ease-in-out ${i * 0.2}s infinite` }} />
        })}
      </div>

      {/* ── NAV ── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: scrolled || menuOpen ? 'rgba(5,13,26,0.86)' : 'rgba(5,13,26,0.4)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: `1px solid ${scrolled ? 'rgba(56,189,248,0.18)' : 'transparent'}`, transition: 'background .3s, border-color .3s' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', height: 66, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <button onClick={() => go('top')} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none', cursor: 'pointer', color: '#fff', padding: 0, textAlign: 'start' }} aria-label={t.brand.name}>
            <img src={logo} alt="" style={{ height: 42, width: 42, objectFit: 'contain', borderRadius: '50%', background: '#fff', padding: 3, flexShrink: 0 }} />
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.25 }}>
              <span style={{ fontFamily: head, fontWeight: 800, fontSize: 15.5 }}>{t.brand.name}</span>
              <span style={{ fontFamily: rtl ? KUFI : MONO, fontSize: rtl ? 12 : 10.5, letterSpacing: rtl ? 0 : 1, color: GLOW, textTransform: rtl ? 'none' : 'uppercase' }}>{t.brand.sub}</span>
            </span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div className="nav-links" style={{ alignItems: 'center' }}>
              {navItems.map(([id, label]) => <button key={id} className="navlink" onClick={() => go(id)}>{label}</button>)}
            </div>
            <div className="lang-switch" role="group" aria-label="Language" style={{ alignItems: 'center', gap: 2, marginInlineStart: 8, padding: 3, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 11 }}>
              {langs.map((l) => (
                <button key={l} lang={l} className="langbtn" aria-pressed={lang === l} onClick={() => setLang(l)} style={{ padding: '6px 11px', fontFamily: l === 'en' ? MONO : KUFI, fontSize: l === 'en' ? 12 : 13, fontWeight: 700, background: lang === l ? BLUE : 'transparent', color: lang === l ? '#04101f' : 'rgba(255,255,255,0.65)' }}>{LANG_LABELS[l]}</button>
              ))}
            </div>
            <button className="menu-btn" onClick={() => setMenuOpen((v) => !v)} aria-label={t.nav.menu} aria-expanded={menuOpen} style={{ width: 44, height: 44, borderRadius: 12, border: '1px solid rgba(255,255,255,0.16)', background: menuOpen ? 'rgba(56,189,248,0.15)' : 'transparent', cursor: 'pointer', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
              {[0, 1, 2].map((k) => <span key={k} style={{ width: 18, height: 2, background: '#fff', borderRadius: 2, transition: 'transform .25s, opacity .2s', transform: menuOpen ? (k === 0 ? 'translateY(7px) rotate(45deg)' : k === 2 ? 'translateY(-7px) rotate(-45deg)' : 'none') : 'none', opacity: menuOpen && k === 1 ? 0 : 1 }} />)}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, padding: '6px 20px 20px', background: 'rgba(5,13,26,0.97)', borderTop: '1px solid rgba(56,189,248,0.15)', borderBottom: '1px solid rgba(56,189,248,0.2)', boxShadow: '0 20px 40px rgba(0,0,0,.5)', animation: 'menu-drop .22s ease' }}>
            {navItems.map(([id, label]) => (
              <button key={id} onClick={() => go(id)} style={{ display: 'block', width: '100%', textAlign: 'start', background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.88)', padding: '15px 4px', fontSize: 16, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>{label}</button>
            ))}
            <div role="group" aria-label="Language" style={{ display: 'flex', gap: 6, marginTop: 16 }}>
              {langs.map((l) => (
                <button key={l} lang={l} className="langbtn" aria-pressed={lang === l} onClick={() => { setLang(l); setMenuOpen(false) }} style={{ flex: 1, padding: '11px 0', fontFamily: l === 'en' ? MONO : KUFI, fontSize: 14, fontWeight: 700, background: lang === l ? BLUE : 'rgba(255,255,255,0.06)', color: lang === l ? '#04101f' : 'rgba(255,255,255,0.75)' }}>{LANG_LABELS[l]}</button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: 'clamp(56px, 10vw, 110px) 20px clamp(70px, 9vw, 100px)', overflow: 'hidden' }}>
        {/* glow, orbit rings, moving grid floor */}
        <div aria-hidden style={{ position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)', width: 900, height: 900, maxWidth: '140vw', background: 'radial-gradient(circle, rgba(14,165,233,0.22) 0%, rgba(14,165,233,0.05) 45%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div aria-hidden style={{ position: 'absolute', top: 40, left: '50%', width: 'min(620px, 92vw)', aspectRatio: '1', transform: 'translateX(-50%)', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(56,189,248,0.14)', borderRadius: '50%', animation: 'orbit 50s linear infinite' }}>
            <span style={{ position: 'absolute', top: -4, left: '50%', width: 8, height: 8, marginLeft: -4, borderRadius: '50%', background: GLOW, boxShadow: `0 0 16px ${GLOW}` }} />
          </div>
          <div style={{ position: 'absolute', inset: '14%', border: '1px dashed rgba(56,189,248,0.10)', borderRadius: '50%', animation: 'orbit 80s linear infinite reverse' }}>
            <span style={{ position: 'absolute', bottom: -3, left: '30%', width: 6, height: 6, borderRadius: '50%', background: '#A5F3FC', boxShadow: '0 0 12px #A5F3FC' }} />
          </div>
        </div>
        <div aria-hidden style={{ position: 'absolute', left: '-20%', right: '-20%', bottom: -40, height: 260, perspective: 420, pointerEvents: 'none', maskImage: 'linear-gradient(to top, black 10%, transparent 90%)', WebkitMaskImage: 'linear-gradient(to top, black 10%, transparent 90%)' }}>
          <div style={{ position: 'absolute', inset: 0, transform: 'rotateX(62deg)', transformOrigin: 'bottom', backgroundImage: 'linear-gradient(rgba(56,189,248,.22) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,.22) 1px, transparent 1px)', backgroundSize: '48px 48px', animation: 'grid-move 2.4s linear infinite' }} />
        </div>

        {/* floating code tokens */}
        {([
          ['</>', '8%', '18%', 26, '-8deg', 0, true], ['{ }', '86%', '14%', 24, '10deg', 1.2, true], ['01', '12%', '62%', 20, '6deg', 2.1, false],
          ['AI', '84%', '58%', 22, '-6deg', 0.6, false], ['#', '4%', '40%', 26, '12deg', 1.7, false], ['( )', '92%', '36%', 20, '-12deg', 2.6, false],
        ] as [string, string, string, number, string, number, boolean][]).map(([s, x, y, fs, rot, d, keep], k) => (
          <span key={k} aria-hidden className={`token${keep ? ' keep' : ''}`} style={{ left: x, top: y, fontSize: fs, ['--rot' as string]: rot, animationDelay: `${d}s` }}>{s}</span>
        ))}

        <div style={{ maxWidth: 940, margin: '0 auto', position: 'relative', textAlign: 'center' }}>
          {/* badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '7px 16px', border: '1px solid rgba(56,189,248,0.35)', background: 'rgba(14,165,233,0.08)', borderRadius: 50, marginBottom: 'clamp(18px, 3vw, 26px)', fontFamily: rtl ? KUFI : INTER, fontSize: rtl ? 13.5 : 13, fontWeight: 600, color: '#BAE6FD', animation: 'fade-up .7s ease both' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: GLOW, boxShadow: `0 0 10px ${GLOW}`, animation: 'pulse 2s infinite' }} />
            {t.hero.badge}
          </div>

          {/* the big "Computer Science" wordmark */}
          <h1 style={{ margin: 0, lineHeight: rtl ? 1.45 : 1.05 }}>
            <span className="wordmark-glow">
              <span className="wordmark" style={{ fontFamily: head, fontSize: rtl ? 'clamp(42px, 10vw, 112px)' : 'clamp(44px, 9vw, 106px)', letterSpacing: rtl ? 0 : -3 }}>{t.hero.wordmark}</span>
            </span>
          </h1>

          {/* the attractive sentence */}
          <p style={{ fontFamily: head, fontSize: 'clamp(21px, 3.6vw, 38px)', fontWeight: 700, lineHeight: rtl ? 1.7 : 1.3, letterSpacing: rtl ? 0 : -0.5, margin: 'clamp(10px, 2vw, 18px) auto 0', maxWidth: 760, textWrap: 'balance', animation: 'fade-up .8s ease .5s both' }}>
            {t.hero.title1}{' '}
            <span style={{ color: GLOW }}>{t.hero.title2}</span>
          </p>

          <p style={{ color: INK, fontSize: 'clamp(15.5px, 1.9vw, 18px)', lineHeight: 1.95, maxWidth: 640, margin: '20px auto 34px', animation: 'fade-up .8s ease .7s both' }}>
            {t.hero.paragraph}
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', animation: 'fade-up .8s ease .85s both' }}>
            <button className="btn-primary" onClick={() => go('worlds')}>{t.hero.ctaEnter} <span aria-hidden>{rtl ? '←' : '→'}</span></button>
            <button className="btn-ghost" onClick={() => go('why')}>{t.hero.ctaWhy}</button>
          </div>

          {/* numbers */}
          <div className="hero-stats" style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(12px, 6vw, 56px)', marginTop: 'clamp(44px, 7vw, 64px)' }}>
            {t.hero.stats.map(([n, label]) => (
              <div key={label} style={{ flex: '0 1 180px', textAlign: 'center' }}>
                <div style={{ fontFamily: SORA, fontSize: 'clamp(34px, 5vw, 46px)', fontWeight: 800, color: GLOW, lineHeight: 1, textShadow: '0 0 24px rgba(56,189,248,.4)' }}>
                  <CountUp value={n} eastern={lang === 'ku'} />
                </div>
                <div style={{ fontFamily: rtl ? KUFI : INTER, fontSize: 'clamp(12px, 1.5vw, 14px)', color: 'rgba(255,255,255,0.6)', marginTop: 10, lineHeight: 1.6 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEVEN WORLDS ── */}
      <section id="worlds" style={{ position: 'relative', zIndex: 1, padding: 'clamp(60px, 8vw, 90px) 20px', background: `linear-gradient(180deg, transparent, ${VOID_2} 15%, ${VOID_2} 85%, transparent)` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(34px, 5vw, 54px)' }}>
              <div style={kicker({ marginBottom: 12 })}>{t.worlds.kicker}</div>
              <h2 style={h2}>{t.worlds.title}</h2>
              <p style={{ color: INK, fontSize: 16, lineHeight: 1.9, maxWidth: 600, margin: '14px auto 0' }}>{t.worlds.subtitle}</p>
            </div>
          </Reveal>
          <div className="worlds-grid">
            {WORLD_NAMES.map((name, i) => (
              <Reveal key={i} delay={(i % 3) * 0.07} style={{ height: '100%' }}>
                <WorldCard i={i} name={name} local={t.worlds.items[i].local} text={t.worlds.items[i].text} rtl={rtl} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BYTE ── */}
      <section id="byte" style={{ position: 'relative', zIndex: 1, padding: 'clamp(60px, 8vw, 90px) 20px' }}>
        <div aria-hidden style={{ position: 'absolute', top: '30%', left: '50%', width: 600, height: 600, maxWidth: '120vw', transform: 'translateX(-50%)', background: 'radial-gradient(circle, rgba(56,189,248,0.12), transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={kicker({ marginBottom: 12 })}>{t.byte.kicker}</div>
              <h2 style={h2}>{t.byte.title}</h2>
              <p style={{ color: INK, fontSize: 16, lineHeight: 1.9, maxWidth: 520, margin: '14px auto 0' }}>{t.byte.subtitle}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ paddingTop: 84 }}><MouseMascot lang={lang} /></div>
          </Reveal>
        </div>
      </section>

      {/* ── WHY CS ── */}
      <section id="why" style={{ position: 'relative', zIndex: 1, padding: 'clamp(60px, 8vw, 90px) 20px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(30px, 5vw, 48px)' }}>
              <div style={kicker({ marginBottom: 12 })}>{t.why.kicker}</div>
              <h2 style={h2}>{t.why.title}</h2>
            </div>
          </Reveal>
          <div className="why-grid">
            {t.why.reasons.map((r, i) => (
              <Reveal key={i} delay={(i % 2) * 0.08} style={{ height: '100%' }}>
                <div className="why-card">
                  <div aria-hidden style={{ position: 'absolute', top: -50, insetInlineEnd: -50, width: 160, height: 160, background: 'radial-gradient(circle, rgba(56,189,248,0.16), transparent 70%)' }} />
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                    <span style={{ display: 'inline-flex', width: 54, height: 54, borderRadius: 16, alignItems: 'center', justifyContent: 'center', background: 'rgba(56,189,248,0.12)', border: '1px solid rgba(56,189,248,0.3)' }}>{whyIcons[i]}</span>
                    <span style={{ fontFamily: MONO, fontSize: 30, fontWeight: 700, color: 'rgba(56,189,248,0.22)' }}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 style={{ fontFamily: head, fontSize: 21, fontWeight: 700, margin: '0 0 10px', lineHeight: 1.5 }}>{r.t}</h3>
                  <p style={{ color: INK, fontSize: 15.5, lineHeight: 1.9, margin: 0 }}>{r.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BANNER ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '0 20px clamp(60px, 8vw, 90px)' }}>
        <Reveal>
          <div style={{ maxWidth: 1080, margin: '0 auto', borderRadius: 26, overflow: 'hidden', position: 'relative', background: 'linear-gradient(135deg, rgba(14,165,233,0.18), rgba(3,105,161,0.07))', border: '1px solid rgba(56,189,248,0.3)', padding: 'clamp(36px, 6vw, 56px) clamp(22px, 5vw, 48px)', textAlign: 'center' }}>
            <div aria-hidden style={{ position: 'absolute', top: -120, left: '50%', width: 460, height: 460, marginLeft: -230, background: 'radial-gradient(circle, rgba(56,189,248,0.18), transparent 70%)' }} />
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14, position: 'relative' }}><WorldBadge size={76} /></div>
            <h2 style={{ ...h2, fontSize: 'clamp(24px, 3.4vw, 38px)', position: 'relative' }}>{t.banner.title}</h2>
            <p style={{ color: INK, fontSize: 16.5, lineHeight: 1.9, maxWidth: 640, margin: '14px auto 0', position: 'relative' }}>{t.banner.text}</p>
          </div>
        </Reveal>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ position: 'relative', zIndex: 1, padding: 'clamp(60px, 8vw, 90px) 20px', background: `linear-gradient(180deg, transparent, ${VOID_2} 15%, ${VOID_2} 85%, transparent)` }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(28px, 5vw, 44px)' }}>
              <div style={kicker({ marginBottom: 12 })}>{t.faq.kicker}</div>
              <h2 style={h2}>{t.faq.title}</h2>
            </div>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {t.faq.items.map((f, i) => {
              const open = openFaq === i
              return (
                <div key={i} className="faq-item" style={{ border: `1px solid ${open ? 'rgba(56,189,248,0.45)' : 'rgba(255,255,255,0.09)'}` }}>
                  <button className="faq-q" onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open} style={{ textAlign: 'start' }}>
                    <span style={{ fontFamily: head, fontSize: 16.5, fontWeight: 600, color: '#fff', lineHeight: 1.6 }}>{f.q}</span>
                    <span aria-hidden style={{ flexShrink: 0, width: 30, height: 30, borderRadius: 10, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: open ? BLUE : 'rgba(56,189,248,0.12)', color: open ? '#04101f' : GLOW, fontSize: 20, fontWeight: 700, transition: 'transform .3s, background .3s', transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
                  </button>
                  <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows .4s ease' }}>
                    <div style={{ overflow: 'hidden' }}>
                      <p style={{ padding: '0 22px 22px', margin: 0, fontSize: 15.5, color: INK, lineHeight: 1.95 }}>{f.a}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── COME SAY HELLO ── */}
      <section id="join" style={{ position: 'relative', zIndex: 1, padding: 'clamp(60px, 8vw, 90px) 20px' }}>
        <Reveal>
          <div style={{ maxWidth: 920, margin: '0 auto', textAlign: 'center', position: 'relative', background: 'rgba(8,20,38,0.65)', border: '1px solid rgba(56,189,248,0.3)', borderRadius: 28, padding: 'clamp(36px, 6vw, 68px) clamp(20px, 4vw, 40px)', overflow: 'hidden' }}>
            <div aria-hidden style={{ position: 'absolute', top: -120, left: '50%', width: 480, height: 480, marginLeft: -240, background: 'radial-gradient(circle, rgba(56,189,248,0.18), transparent 70%)' }} />
            <div style={kicker({ marginBottom: 16, position: 'relative' })}>{t.join.kicker}</div>
            <h2 style={{ ...h2, position: 'relative', margin: '0 0 18px' }}>
              {t.join.title1}<br />
              <span style={{ background: `linear-gradient(90deg, ${GLOW}, ${BLUE})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t.join.title2}</span>
            </h2>
            <p style={{ color: INK, fontSize: 'clamp(15px, 1.9vw, 17px)', lineHeight: 1.95, maxWidth: 600, margin: '0 auto 32px', position: 'relative' }}>{t.join.paragraph}</p>

            <a href={DEPARTMENT_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ position: 'relative', padding: '16px 22px', borderRadius: 18, gap: 14, textDecoration: 'none', maxWidth: '100%', boxSizing: 'border-box', boxShadow: '0 12px 50px rgba(14,165,233,0.4)' }}>
              <span style={{ display: 'inline-flex', width: 46, height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.15)', flexShrink: 0 }}><CapIcon size={25} color="#fff" /></span>
              <span style={{ display: 'flex', flexDirection: 'column', textAlign: 'start', gap: 3, minWidth: 0 }}>
                <span style={{ fontSize: 12.5, fontWeight: 500, color: 'rgba(255,255,255,0.85)', fontFamily: rtl ? KUFI : INTER }}>{t.join.buttonKicker}</span>
                <span style={{ fontSize: 'clamp(15px, 2vw, 18px)', fontWeight: 800, fontFamily: head, lineHeight: 1.45 }}>{t.join.buttonTitle}</span>
              </span>
              <span style={{ display: 'inline-flex', flexShrink: 0, opacity: 0.9 }}><ExternalIcon size={20} flip={rtl} /></span>
            </a>
            <div style={{ margin: '16px 0 34px', position: 'relative' }}>
              <a href={DEPARTMENT_URL} target="_blank" rel="noopener noreferrer" style={{ color: GLOW, fontSize: 14.5, fontWeight: 600, textDecoration: 'none' }}>{t.join.linkLabel}</a>
            </div>

            <div className="facts" style={{ position: 'relative' }}>
              {t.join.facts.map((f, i) => (
                <div key={f} className="fact"><span className="fact-ic">{factIcons[i]}</span>{f}</div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ position: 'relative', zIndex: 1, borderTop: '1px solid rgba(56,189,248,0.18)', background: 'rgba(3,8,18,0.6)', padding: 'clamp(36px, 5vw, 52px) 20px 28px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
          <div>
            <a href={DEPARTMENT_URL} target="_blank" rel="noopener noreferrer" className="foot-link" style={{ gap: 14, color: '#fff' }}>
              <img src={logo} alt="Nawroz University" style={{ height: 50, width: 50, objectFit: 'contain', borderRadius: '50%', background: '#fff', padding: 3 }} />
              <span style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ fontFamily: head, fontWeight: 800, fontSize: 17, display: 'inline-flex', alignItems: 'center', gap: 6 }}>{t.footer.dept} <ExternalIcon size={14} color={GLOW} flip={rtl} /></span>
                <span style={{ fontFamily: rtl ? KUFI : INTER, fontSize: 12.5, color: 'rgba(255,255,255,0.55)' }}>{t.footer.sub}</span>
              </span>
            </a>
            <p style={{ fontFamily: head, fontSize: 15, fontWeight: 600, color: GLOW, margin: '18px 0 0', lineHeight: 1.7 }}>{t.footer.motto}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 14 }}>
            <a className="foot-link" href={MAPS_URL} target="_blank" rel="noopener noreferrer" style={{ alignItems: 'flex-start' }}>
              <PinIcon /><span><span style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{t.footer.addressLabel}</span><span dir="ltr" style={{ unicodeBidi: 'isolate' }}>{ADDRESS}</span></span>
            </a>
            <a className="foot-link" href={PHONE_HREF}>
              <PhoneIcon /><span><span style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{t.footer.phoneLabel}</span><span dir="ltr" style={{ unicodeBidi: 'isolate' }}>{PHONE}</span></span>
            </a>
            <a className="foot-link" href={UNIVERSITY_URL} target="_blank" rel="noopener noreferrer">
              <GlobeIcon size={18} /><span><span style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{t.footer.websiteLabel}</span><span dir="ltr">nawroz.edu.krd</span></span>
            </a>
          </div>
        </div>
        <div style={{ maxWidth: 1200, margin: '32px auto 0', paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, fontSize: 12.5, color: 'rgba(255,255,255,0.45)', fontFamily: rtl ? KUFI : INTER }}>
          <span>{t.footer.rights}</span>
          <button onClick={() => go('top')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.55)', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12.5, padding: 0 }} aria-label="Top">↑ {t.brand.name}</button>
        </div>
      </footer>

      <PeekByte lang={lang} />
    </div>
  )
}
