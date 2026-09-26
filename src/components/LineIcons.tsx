/* Small line icons in the site's blue palette — used instead of emoji so every
   device renders them identically and they match the custom world icons. */

type P = { size?: number; color?: string }
const base = (size: number) => ({ width: size, height: size, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true as const })

export function GlobeIcon({ size = 20, color = '#38BDF8' }: P) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth="1.6" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.6 2.8 3.9 5.8 3.9 9s-1.3 6.2-3.9 9c-2.6-2.8-3.9-5.8-3.9-9S9.4 5.8 12 3z" />
    </svg>
  )
}

export function CapIcon({ size = 20, color = '#38BDF8' }: P) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
      <path d="M2 9l10-5 10 5-10 5L2 9z" />
      <path d="M6 11v4.5c0 1.4 2.7 3 6 3s6-1.6 6-3V11" />
      <path d="M22 9v5" />
    </svg>
  )
}

export function CollegeIcon({ size = 20, color = '#38BDF8' }: P) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
      <path d="M3 9.5L12 4l9 5.5" />
      <path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8" />
      <path d="M3 20.5h18" />
    </svg>
  )
}

export function SparkIcon({ size = 20, color = '#38BDF8' }: P) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M12 8.5l1.2 2.3 2.3 1.2-2.3 1.2L12 15.5l-1.2-2.3L8.5 12l2.3-1.2z" fill={color} fillOpacity=".25" />
    </svg>
  )
}

export function ExternalIcon({ size = 18, color = '#fff', flip = false }: P & { flip?: boolean }) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={flip ? { transform: 'scaleX(-1)' } : undefined}>
      <path d="M14 4h6v6" />
      <path d="M20 4l-9 9" />
      <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
  )
}

/* bigger illustrated globe for the banner: orbit ring + a few "connection" dots */
export function WorldBadge({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden>
      <style>{`@keyframes wb-spin{to{transform:rotate(360deg)}}`}</style>
      <circle cx="32" cy="32" r="20" fill="rgba(14,165,233,0.12)" stroke="#38BDF8" strokeWidth="1.6" />
      <path d="M12 32h40M32 12c5.5 5.6 8.2 12.3 8.2 20S37.5 46.4 32 52c-5.5-5.6-8.2-12.3-8.2-20S26.5 17.6 32 12z" stroke="#38BDF8" strokeWidth="1.3" opacity=".75" />
      <path d="M15 23h34M15 41h34" stroke="#38BDF8" strokeWidth="1" opacity=".4" />
      <g style={{ transformOrigin: '32px 32px', animation: 'wb-spin 18s linear infinite' }}>
        <ellipse cx="32" cy="32" rx="29" ry="10" stroke="#0EA5E9" strokeWidth="1" strokeDasharray="2 4" transform="rotate(-20 32 32)" />
        <circle cx="5" cy="40" r="2.2" fill="#38BDF8" />
        <circle cx="59" cy="24" r="2.2" fill="#38BDF8" />
      </g>
    </svg>
  )
}

export function CodeIcon({ size = 20, color = '#38BDF8' }: P) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 4.5l-3 15" />
    </svg>
  )
}

export function LayersIcon({ size = 20, color = '#38BDF8' }: P) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" opacity=".7" />
      <path d="M3 17.5l9 5 9-5" opacity=".4" />
    </svg>
  )
}

export function PinIcon({ size = 18, color = '#38BDF8' }: P) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  )
}

export function PhoneIcon({ size = 18, color = '#38BDF8' }: P) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  )
}
