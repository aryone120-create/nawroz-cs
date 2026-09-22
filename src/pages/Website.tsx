import { useEffect, useRef, useState, type ReactNode } from 'react'
import logo from '../assets/university-logo.png'
import MouseMascot from '../components/MouseMascot'
import PeekByte from '../components/PeekByte'

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

/* Six worlds — mirrors the poster exactly */
const worlds = [
  { icon: '🤖', name: 'Artificial Intelligence', line: 'Think. Predict. Automate.', long: 'Train neural networks and build systems that see, understand, and decide. The frontier everyone is racing toward — and you get there first.' },
  { icon: '🎮', name: 'Game Design', line: 'Build worlds people play in.', long: 'Design characters, physics, and universes. Turn imagination into interactive worlds that millions can step inside.' },
  { icon: '🦾', name: 'Robotics', line: 'Machines that move and sense.', long: 'Give hardware a brain. Program machines that perceive their surroundings and act on their own.' },
  { icon: '🌐', name: 'Web Development', line: 'Power the internet.', long: 'Build the platforms the world lives on. From idea to a site used across the planet in an afternoon.' },
  { icon: '📱', name: 'Mobile Apps', line: 'A billion pockets, your idea.', long: 'Ship apps that live in people’s hands every day. Your creation, everywhere they go.' },
  { icon: '🖥️', name: 'Desktop Software', line: 'Tools the world relies on.', long: 'Engineer the powerful software professionals depend on to get real work done.' },
]

const reasons = [
  { k: '01', t: 'You create, not memorize', d: 'Medicine asks you to memorize what already exists. We hand you the tools to build what doesn’t exist yet — and let you decide what the future looks like.' },
  { k: '02', t: 'Your classroom has no borders', d: 'A laptop is your lab. Study, build, and work from Duhok, from home, or from anywhere on Earth. Your world isn’t confined to one building.' },
  { k: '03', t: 'One field powers every other', d: 'Hospitals, banks, farms, films, phones — all run on code. Choose CS and you don’t compete with one industry, you become essential to all of them.' },
  { k: '04', t: 'You start building on day one', d: 'No waiting years to touch real work. From your first semester you’re making apps, games, and intelligent systems that actually run.' },
]

const faqs = [
  { q: 'Do I need coding experience to start?', a: 'None at all. We start from zero. What we look for is curiosity and the willingness to build — the rest, we teach you, step by step.' },
  { q: 'What language are courses taught in?', a: 'Courses are taught in Kurdish and English. Programming is naturally an English-literate craft, and we build that skill with you as you go — a lasting advantage in itself.' },
  { q: 'How is this different from the medical programs?', a: 'Different worlds entirely. CS is about creating and inventing rather than memorizing. It is a four-year Bachelor’s degree, and your work is not tied to a single place or profession.' },
  { q: 'Who teaches the courses?', a: 'Experienced professionals who have built real software and systems — people who bring the practice of the field, not only its theory, into the room.' },
  { q: 'What can I actually build here?', a: 'AI models, video games, robots, websites, mobile apps, and desktop software. Six worlds, one department — you choose which to master.' },
]

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
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [active, setActive] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ fontFamily: body, background: VOID, color: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
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
        @media (max-width: 900px) {
          .why-grid { grid-template-columns: 1fr !important; }
          .join-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 680px) {
          .nav-links { display: none !important; }
        }
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
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={logo} alt="Nawroz University" style={{ height: 40, width: 40, objectFit: 'contain', borderRadius: '50%', background: '#fff', padding: 3 }} />
            <div>
              <div style={{ fontFamily: display, fontWeight: 700, fontSize: 15, letterSpacing: -0.2 }}>Computer Science</div>
              <div style={{ color: BLUE_GLOW, fontFamily: mono, fontSize: 10, letterSpacing: 1 }}>NAWROZ UNIVERSITY · DUHOK</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {[['Worlds', 'worlds'], ['Byte', 'byte'], ['Why CS', 'why'], ['FAQ', 'faq'], ['Find Us', 'join']].map(([l, id]) => (
                <a key={id} href={`#${id}`} className="navlink" style={{ color: 'rgba(255,255,255,0.72)', textDecoration: 'none', padding: '8px 12px', fontSize: 13.5, fontWeight: 500 }}>{l}</a>
              ))}
            </div>
            <a href="#join" className="cta" style={{ marginLeft: 10, padding: '9px 16px', background: `linear-gradient(90deg, ${BLUE_DARK}, ${BLUE})`, color: '#fff', borderRadius: 10, textDecoration: 'none', fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap' }}>Find Our Table</a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', padding: '110px 24px 90px', zIndex: 1 }}>
        <div style={{ position: 'absolute', top: 40 - scrollY * 0.15, left: '50%', transform: 'translateX(-50%)', width: 820, height: 820, maxWidth: '120vw', background: 'radial-gradient(circle, rgba(14,165,233,0.20) 0%, rgba(14,165,233,0.05) 45%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        {/* orbiting ring */}
        <div style={{ position: 'absolute', top: 120, left: '50%', width: 540, height: 540, marginLeft: -270, border: '1px solid rgba(56,189,248,0.12)', borderRadius: '50%', animation: 'orbit 60s linear infinite', pointerEvents: 'none' }}>
          <span style={{ position: 'absolute', top: -4, left: '50%', width: 8, height: 8, marginLeft: -4, borderRadius: '50%', background: BLUE_GLOW, boxShadow: `0 0 16px ${BLUE_GLOW}` }} />
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Noto Kufi Arabic', sans-serif", direction: 'rtl', color: BLUE_GLOW, fontSize: 20, fontWeight: 700, marginBottom: 22, opacity: 0.9 }}>
            جیهانا خۆ بنیات بکە
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', border: '1px solid rgba(56,189,248,0.3)', borderRadius: 50, marginBottom: 26, fontFamily: mono, fontSize: 11, letterSpacing: 1.5, color: BLUE_GLOW }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: BLUE_GLOW, animation: 'pulse 2s infinite' }} />
            WELCOME TO THE DIGITAL WORLD
          </div>

          <h1 style={{ fontFamily: display, fontSize: 'clamp(44px, 7vw, 84px)', fontWeight: 800, lineHeight: 0.98, letterSpacing: -2, margin: '0 0 26px' }}>
            We have a world of our own.<br />
            <span style={{ background: `linear-gradient(90deg, ${BLUE_GLOW}, ${BLUE})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Come build yours inside it.</span>
          </h1>

          <p style={{ color: INK, fontSize: 'clamp(16px, 2vw, 19px)', lineHeight: 1.7, maxWidth: 600, margin: '0 auto 40px' }}>
            Ours is the digital world — and here you don’t just enter it, you carve out your own place within it. While others memorize what already exists, you’ll create what doesn’t: artificial intelligence, games, robots, and the software that runs the planet.
          </p>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#worlds" className="cta" style={{ padding: '15px 32px', background: `linear-gradient(90deg, ${BLUE_DARK}, ${BLUE})`, color: '#fff', borderRadius: 12, textDecoration: 'none', fontSize: 15, fontWeight: 700 }}>Enter our world →</a>
            <a href="#why" className="ghost" style={{ padding: '15px 32px', background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.22)', borderRadius: 12, textDecoration: 'none', fontSize: 15, fontWeight: 600 }}>Why choose CS</a>
          </div>

          {/* quiet metrics, no salary/employment */}
          <div style={{ display: 'flex', gap: 40, justifyContent: 'center', flexWrap: 'wrap', marginTop: 64 }}>
            {[['6', 'worlds to master'], ['4', 'year Bachelor’s degree'], ['∞', 'places you can work from']].map(([n, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: display, fontSize: 40, fontWeight: 800, color: BLUE_GLOW, lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: mono, fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 8, letterSpacing: 0.5 }}>{l}</div>
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
              <div style={{ fontFamily: mono, fontSize: 12, color: BLUE, letterSpacing: 2, marginBottom: 14 }}>// WHAT YOU’LL LEARN</div>
              <h2 style={{ fontFamily: display, fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 800, letterSpacing: -1, margin: 0 }}>Six worlds. You’ll explore them all.</h2>
              <p style={{ color: INK, fontSize: 16, maxWidth: 560, margin: '16px auto 0' }}>These aren’t separate tracks to choose between — every Computer Science student learns all six. One degree, six ways to build.</p>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {worlds.map((w, i) => (
              <Reveal key={i} delay={(i % 3) * 0.08}>
                <div className="wcard" style={{
                  background: 'rgba(14,165,233,0.05)', border: '1px solid rgba(56,189,248,0.18)',
                  borderRadius: 18, padding: '26px 24px', height: '100%', position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{ position: 'absolute', top: -30, right: -30, width: 110, height: 110, background: 'radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <span style={{ fontSize: 40 }}>{w.icon}</span>
                    <span style={{ fontFamily: mono, fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div style={{ fontFamily: display, fontSize: 20, fontWeight: 700, marginBottom: 6 }}>{w.name}</div>
                  <div style={{ color: BLUE_GLOW, fontSize: 14, fontWeight: 500 }}>{w.line}</div>
                  <div className="wlong" style={{ color: INK, fontSize: 13.5, lineHeight: 1.65 }}>{w.long}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEET BYTE (interactive mascot) ── */}
      <section id="byte" style={{ position: 'relative', zIndex: 1, padding: '80px 24px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={{ fontFamily: mono, fontSize: 12, color: BLUE, letterSpacing: 2, marginBottom: 14 }}>// MEET THE DEPARTMENT</div>
              <h2 style={{ fontFamily: display, fontSize: 'clamp(30px, 4.5vw, 48px)', fontWeight: 800, letterSpacing: -1, margin: 0 }}>This is Byte. 🐭</h2>
              <p style={{ color: INK, fontSize: 16, maxWidth: 520, margin: '16px auto 0' }}>
                Our little mascot runs on network cables and pure curiosity — just like us. Go on, bother her a little.
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
              <div style={{ fontFamily: mono, fontSize: 12, color: BLUE, letterSpacing: 2, marginBottom: 14 }}>// WHY THIS, NOT THAT</div>
              <h2 style={{ fontFamily: display, fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 800, letterSpacing: -1, margin: 0 }}>Four reasons to build instead of memorize.</h2>
            </div>
          </Reveal>

          <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 340px) 1fr', gap: 40, alignItems: 'start' }}>
            {/* selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {reasons.map((r, i) => (
                <button key={i} onClick={() => setActive(i)} style={{
                  textAlign: 'left', cursor: 'pointer', padding: '16px 18px', borderRadius: 14,
                  background: active === i ? 'rgba(14,165,233,0.12)' : 'transparent',
                  border: `1px solid ${active === i ? 'rgba(56,189,248,0.45)' : 'rgba(255,255,255,0.08)'}`,
                  color: '#fff', display: 'flex', gap: 14, alignItems: 'center', transition: 'all .25s',
                }}>
                  <span style={{ fontFamily: mono, fontSize: 13, color: active === i ? BLUE_GLOW : 'rgba(255,255,255,0.3)' }}>{r.k}</span>
                  <span style={{ fontFamily: display, fontSize: 16, fontWeight: 600 }}>{r.t}</span>
                </button>
              ))}
            </div>
            {/* panel */}
            <div style={{ position: 'relative', background: 'rgba(8,20,38,0.6)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 20, padding: 'clamp(26px, 4vw, 40px)', minHeight: 260, overflow: 'hidden' }}>
              <div style={{ position: 'absolute', bottom: -60, right: -60, width: 220, height: 220, background: 'radial-gradient(circle, rgba(14,165,233,0.16) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div key={active} style={{ animation: 'fadeSlide .5s ease' }}>
                <style>{`@keyframes fadeSlide { from { opacity:0; transform:translateY(14px) } to { opacity:1; transform:none } }`}</style>
                <div style={{ fontFamily: mono, fontSize: 48, fontWeight: 700, color: 'rgba(56,189,248,0.25)', lineHeight: 1 }}>{reasons[active].k}</div>
                <h3 style={{ fontFamily: display, fontSize: 28, fontWeight: 700, margin: '14px 0 16px', letterSpacing: -0.5 }}>{reasons[active].t}</h3>
                <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 17, lineHeight: 1.75, margin: 0 }}>{reasons[active].d}</p>
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
            <h2 style={{ fontFamily: display, fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 800, letterSpacing: -1, margin: '0 0 14px' }}>
              Your classroom has no walls. Your career has no map.
            </h2>
            <p style={{ color: INK, fontSize: 17, lineHeight: 1.7, maxWidth: 620, margin: '0 auto' }}>
              Build from Duhok, from home, or from the other side of the world. In our world, where you are never decides what you can create.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ position: 'relative', zIndex: 1, padding: '80px 24px', background: `linear-gradient(180deg, transparent, ${VOID_2} 15%, ${VOID_2} 85%, transparent)` }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontFamily: mono, fontSize: 12, color: BLUE, letterSpacing: 2, marginBottom: 14 }}>// BEFORE YOU DECIDE</div>
              <h2 style={{ fontFamily: display, fontSize: 'clamp(32px, 4.5vw, 48px)', fontWeight: 800, letterSpacing: -1, margin: 0 }}>Questions, answered.</h2>
            </div>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ background: 'rgba(8,20,38,0.6)', border: `1px solid ${openFaq === i ? 'rgba(56,189,248,0.4)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 14, overflow: 'hidden', transition: 'border-color .25s' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '20px 24px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                  <span style={{ fontFamily: display, fontSize: 16, fontWeight: 600, color: '#fff' }}>{f.q}</span>
                  <span style={{ fontSize: 24, color: BLUE_GLOW, flexShrink: 0, transition: 'transform .25s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                <div style={{ maxHeight: openFaq === i ? 240 : 0, overflow: 'hidden', transition: 'max-height .4s ease' }}>
                  <p style={{ padding: '0 24px 22px', fontSize: 15, color: INK, lineHeight: 1.75, margin: 0 }}>{f.a}</p>
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

            <div style={{ fontFamily: mono, fontSize: 12, color: BLUE, letterSpacing: 2, marginBottom: 18, position: 'relative' }}>// COME SAY HELLO</div>

            <h2 style={{ fontFamily: display, fontSize: 'clamp(30px, 4.5vw, 52px)', fontWeight: 800, letterSpacing: -1.2, margin: '0 0 20px', position: 'relative', lineHeight: 1.05 }}>
              Let’s build your future,<br />
              <span style={{ background: `linear-gradient(90deg, ${BLUE_GLOW}, ${BLUE})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>together.</span>
            </h2>

            <p style={{ color: INK, fontSize: 'clamp(15px, 2vw, 18px)', lineHeight: 1.75, maxWidth: 560, margin: '0 auto 36px', position: 'relative' }}>
              Behind this table is a family that codes, creates, and dreams as one. Bring your curiosity — we’ll bring the tools, the mentors, and a place where you truly belong. Your world in Computer Science begins the moment you say hello.
            </p>

            {/* the table marker */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16, padding: '18px 28px', borderRadius: 18, background: `linear-gradient(90deg, ${BLUE_DARK}, ${BLUE})`, boxShadow: '0 12px 50px rgba(14,165,233,0.4)', position: 'relative', marginBottom: 40 }}>
              <span style={{ fontSize: 30 }}>🎓</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: 1, color: 'rgba(255,255,255,0.8)' }}>FIND US AT ADMISSION</div>
                <div style={{ fontFamily: display, fontSize: 19, fontWeight: 800 }}>The Computer Science table</div>
              </div>
            </div>

            {/* quick facts */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, justifyContent: 'center', position: 'relative' }}>
              {[['🖥️', 'College of Science'], ['🎓', '4-Year Bachelor’s Degree'], ['🌍', 'Build from anywhere'], ['🚀', 'No experience needed']].map(([ic, l]) => (
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
              <div style={{ fontFamily: display, fontWeight: 700, fontSize: 14 }}>Dept. of Computer Science</div>
              <div style={{ fontFamily: mono, fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: 0.5 }}>NAWROZ UNIVERSITY · COLLEGE OF SCIENCE · DUHOK</div>
            </div>
          </div>
          <a href="#join" className="navlink" style={{ color: BLUE_GLOW, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Find Our Table →</a>
        </div>
        <div style={{ maxWidth: 1180, margin: '18px auto 0', color: 'rgba(255,255,255,0.3)', fontSize: 12, fontFamily: mono }}>© 2025 Nawroz University · We have a world of our own — come build yours inside it.</div>
      </footer>

      {/* shy Byte peeking from the corner */}
      <PeekByte />
    </div>
  )
}
