import type { Mood } from './MouseMascot'

/* ══════════════════════════════════════════════════════════════════
   Volumetric vector mouse — shaded entirely in code, no image files.
   Shared by the section mascot and the corner peeker. ══════════════ */
export function HighEndByteSvg({
  mood, blink, cableOut, hit, pupilOffset, munching = false, full = false, uid = 'b',
}: {
  mood: Mood; blink: boolean; cableOut: boolean;
  hit: (k: any) => (e: React.MouseEvent) => void;
  pupilOffset: { x: number; y: number };
  munching?: boolean; full?: boolean; uid?: string;
}) {
  const isChewing = !cableOut && !munching && (mood === 'idle' || mood === 'happy');
  const isSleeping = mood === 'sleepy' || (blink && mood !== 'love');
  const isLove = mood === 'love' && !blink;

  const eyeInner = (
    <>
      <ellipse cx="0" cy="0" rx="17" ry="21" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
      <path d="M -16 -8 Q 0 -3 16 -8 L 16 -18 L -16 -18 Z" fill="rgba(15,23,42,0.12)" />
      <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
        <ellipse cx="0" cy="0" rx="12.5" ry="15" fill={`url(#irisGrad-${uid})`} />
        <ellipse cx="0" cy="1" rx="7" ry="8.5" fill="#020617" />
        <circle cx="-4" cy="-5" r="4.5" fill="#FFFFFF" />
        <circle cx="4" cy="5" r="2.2" fill="#FFFFFF" opacity="0.8" />
      </g>
    </>
  );

  // downturned, half-lidded, glossy eyes — droopy & pleading
  const sadEye = (left: boolean) => {
    const s = left ? 1 : -1;
    return (
      <g>
        <ellipse cx="0" cy="3" rx="15" ry="17" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        <g transform={`translate(${pupilOffset.x * 0.6}, ${3 + pupilOffset.y * 0.6})`}>
          <ellipse cx="0" cy="2" rx="11" ry="13" fill={`url(#irisGrad-${uid})`} />
          <ellipse cx="0" cy="3" rx="6" ry="7.5" fill="#020617" />
          <circle cx={-3 * s} cy="-3" r="4.5" fill="#FFFFFF" />
          <circle cx={3 * s} cy="5" r="2.4" fill="#FFFFFF" opacity="0.85" />
        </g>
        {/* droopy upper lid */}
        <path d={`M ${-17 * s} -8 Q 0 -14 ${16 * s} -2 L ${17 * s} -20 L ${-17 * s} -20 Z`} fill={`url(#headFurGrad-${uid})`} />
        <path d={`M ${-17 * s} -8 Q 0 -14 ${16 * s} -2`} fill="none" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
        {/* worried inner brow */}
        <path d={`M ${-15 * s} -16 Q ${-2 * s} -22 ${8 * s} -19`} fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      </g>
    );
  };

  return (
    <svg width="100%" height="100%" viewBox="0 0 280 290" style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id={`bodyFurGrad-${uid}`} cx="38%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#FFFFFF" /><stop offset="40%" stopColor="#F1F5F9" /><stop offset="85%" stopColor="#CBD5E1" /><stop offset="100%" stopColor="#94A3B8" />
        </radialGradient>
        <radialGradient id={`headFurGrad-${uid}`} cx="36%" cy="26%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" /><stop offset="42%" stopColor="#F8FAFC" /><stop offset="80%" stopColor="#CBD5E1" /><stop offset="100%" stopColor="#94A3B8" />
        </radialGradient>
        <radialGradient id={`bellyGrad-${uid}`} cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" /><stop offset="70%" stopColor="#F8FAFC" /><stop offset="100%" stopColor="#E2E8F0" />
        </radialGradient>
        <radialGradient id={`innerEarGrad-${uid}`} cx="44%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#FDE8EF" /><stop offset="40%" stopColor="#FBCFE8" /><stop offset="85%" stopColor="#F472B6" /><stop offset="100%" stopColor="#DB2777" />
        </radialGradient>
        <radialGradient id={`irisGrad-${uid}`} cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#38BDF8" /><stop offset="35%" stopColor="#0284C7" /><stop offset="75%" stopColor="#0F172A" /><stop offset="100%" stopColor="#020617" />
        </radialGradient>
        <linearGradient id={`cat6Grad-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38BDF8" /><stop offset="30%" stopColor="#0284C7" /><stop offset="75%" stopColor="#0369A1" /><stop offset="100%" stopColor="#075985" />
        </linearGradient>
        <radialGradient id={`tearGrad-${uid}`} cx="38%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#E0F5FF" /><stop offset="55%" stopColor="#7DD3FC" /><stop offset="100%" stopColor="#0EA5E9" />
        </radialGradient>
        <linearGradient id={`rj45PlasticGrad-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.85)" /><stop offset="40%" stopColor="rgba(226,232,240,0.6)" /><stop offset="100%" stopColor="rgba(100,116,139,0.9)" />
        </linearGradient>
        <filter id={`shadowBlur-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" /><feOffset dx="0" dy="5" />
          <feComponentTransfer><feFuncA type="linear" slope="0.3" /></feComponentTransfer>
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id={`sparkGlow-${uid}`}><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>

      {/* ground shadow */}
      <ellipse cx="140" cy="265" rx="84" ry="16" fill="rgba(11,19,43,0.2)" />

      {/* tail */}
      <g className="byte-interactable" onClick={hit('tail')} style={{ transformOrigin: '190px 225px', animation: mood === 'sleepy' ? 'none' : 'tail-sway 3.2s ease-in-out infinite' }}>
        <path d="M 186 230 C 235 240, 260 195, 235 155 C 220 130, 238 95, 252 82" fill="none" stroke="#94A3B8" strokeWidth="11" strokeLinecap="round" />
        <path d="M 186 230 C 235 240, 260 195, 235 155 C 220 130, 238 95, 252 82" fill="none" stroke={`url(#bodyFurGrad-${uid})`} strokeWidth="7.5" strokeLinecap="round" />
        <circle cx="253" cy="81" r="6" fill="#38BDF8" filter={`url(#sparkGlow-${uid})`} /><circle cx="253" cy="81" r="3" fill="#FFFFFF" />
      </g>

      {/* ears */}
      <g className="byte-interactable" onClick={hit('ears')} style={{ animation: 'ear-twitch 5s ease-in-out infinite' }}>
        <g transform="translate(85, 78) rotate(-16)"><ellipse cx="0" cy="0" rx="38" ry="42" fill={`url(#bodyFurGrad-${uid})`} stroke="#94A3B8" strokeWidth="1.5" filter={`url(#shadowBlur-${uid})`} /><ellipse cx="-1" cy="2" rx="26" ry="30" fill={`url(#innerEarGrad-${uid})`} /></g>
        <g transform="translate(195, 78) rotate(16)"><ellipse cx="0" cy="0" rx="38" ry="42" fill={`url(#bodyFurGrad-${uid})`} stroke="#94A3B8" strokeWidth="1.5" filter={`url(#shadowBlur-${uid})`} /><ellipse cx="1" cy="2" rx="26" ry="30" fill={`url(#innerEarGrad-${uid})`} /></g>
      </g>

      {/* torso & belly */}
      <g className="byte-interactable" onClick={hit('belly')} style={{ transformOrigin: '140px 240px', transform: full ? 'scale(1.1, 1.06)' : 'none', transition: 'transform .5s cubic-bezier(.3,1.6,.5,1)' }}>
        <path d="M 92 170 C 65 200, 70 252, 110 258 C 130 261, 150 261, 170 258 C 210 252, 215 200, 188 170 Z" fill={`url(#bodyFurGrad-${uid})`} stroke="#94A3B8" strokeWidth="1.2" filter={`url(#shadowBlur-${uid})`} />
        <ellipse cx="140" cy="216" rx="42" ry="36" fill={`url(#bellyGrad-${uid})`} opacity="0.95" />
      </g>

      {/* back paws */}
      <g className="byte-interactable" onClick={hit('paws')}>
        <ellipse cx="98" cy="254" rx="19" ry="11" fill={`url(#bodyFurGrad-${uid})`} stroke="#94A3B8" strokeWidth="1" /><ellipse cx="98" cy="254" rx="10" ry="6" fill={`url(#innerEarGrad-${uid})`} opacity="0.85" />
        <ellipse cx="182" cy="254" rx="19" ry="11" fill={`url(#bodyFurGrad-${uid})`} stroke="#94A3B8" strokeWidth="1" /><ellipse cx="182" cy="254" rx="10" ry="6" fill={`url(#innerEarGrad-${uid})`} opacity="0.85" />
      </g>

      {/* head */}
      <g className="byte-interactable" onClick={hit('body')}>
        <ellipse cx="140" cy="142" rx="66" ry="58" fill={`url(#headFurGrad-${uid})`} stroke="#94A3B8" strokeWidth="1.2" filter={`url(#shadowBlur-${uid})`} />
        <circle cx="94" cy="162" r="16" fill="#FB7185" opacity={isLove || munching ? 0.62 : 0.3} style={{ transition: 'opacity .3s' }} filter={`url(#shadowBlur-${uid})`} /><circle cx="186" cy="162" r="16" fill="#FB7185" opacity={isLove || munching ? 0.62 : 0.3} style={{ transition: 'opacity .3s' }} filter={`url(#shadowBlur-${uid})`} />
        <ellipse cx="140" cy="164" rx="34" ry="24" fill={`url(#bellyGrad-${uid})`} />
      </g>

      {/* eyes */}
      <g className="byte-interactable" onClick={hit('eyes')}>
        <g transform="translate(112, 134)">
          {isLove ? <path d="M -15 6 Q 0 -12 15 6" fill="none" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" /> :
           isSleeping ? <path d="M -16 2 Q 0 16 16 2" fill="none" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" /> :
           mood === 'annoyed' ? <g><path d="M -16 -8 L 14 2" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" /><ellipse cx="0" cy="5" rx="12" ry="11" fill={`url(#irisGrad-${uid})`} /><circle cx="-2" cy="3" r="3" fill="#FFFFFF" /></g> :
           mood === 'sad' ? sadEye(true) :
           <g>{eyeInner}</g>}
        </g>
        <g transform="translate(168, 134)">
          {isLove ? <path d="M -15 6 Q 0 -12 15 6" fill="none" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" /> :
           isSleeping ? <path d="M -16 2 Q 0 16 16 2" fill="none" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" /> :
           mood === 'annoyed' ? <g><path d="M 16 -8 L -14 2" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" /><ellipse cx="0" cy="5" rx="12" ry="11" fill={`url(#irisGrad-${uid})`} /><circle cx="-2" cy="3" r="3" fill="#FFFFFF" /></g> :
           mood === 'sad' ? sadEye(false) :
           <g>{eyeInner}</g>}
        </g>
        {mood === 'sad' && (
          <g transform="translate(104, 150)" style={{ transformOrigin: '104px 150px' }}>
            <g style={{ animation: 'tear-drip 2.2s ease-in infinite' }}>
              <path d="M 0 0 C -5 8, -5 13, 0 15 C 5 13, 5 8, 0 0 Z" fill={`url(#tearGrad-${uid})`} stroke="#38BDF8" strokeWidth="0.8" />
              <ellipse cx="-1.6" cy="8" rx="1.6" ry="2.4" fill="#FFFFFF" opacity="0.85" />
            </g>
          </g>
        )}
      </g>

      {/* nose & whiskers */}
      <g className="byte-interactable" onClick={hit('nose')}>
        <g stroke="#94A3B8" strokeWidth="1.6" strokeLinecap="round" opacity="0.75">
          <path d="M 104 163 C 70 157, 45 152, 35 150" /><path d="M 104 168 C 72 172, 48 178, 38 184" />
          <path d="M 176 163 C 210 157, 235 152, 245 150" /><path d="M 176 168 C 208 172, 232 178, 242 184" />
        </g>
        <path d="M 134 154 C 134 150, 146 150, 146 154 C 146 160, 140 165, 140 165 C 140 165, 134 160, 134 154 Z" fill="#FB7185" />
        <ellipse cx="138" cy="153" rx="2.5" ry="1.4" fill="#FFFFFF" opacity="0.85" />
      </g>

      {/* mouth */}
      {munching ? (
        <g style={{ transformOrigin: '140px 174px', animation: 'byte-chomp .22s ease-in-out infinite' }}>
          <ellipse cx="140" cy="175" rx="10" ry="8" fill="#9F1239" />
          <rect x="135" y="167" width="4.5" height="5" rx="1" fill="#fff" /><rect x="140.5" y="167" width="4.5" height="5" rx="1" fill="#fff" />
        </g>
       ) :
       isLove ? <path d="M 126 170 Q 140 190 154 170 Z" fill="#9F1239" stroke="#0F172A" strokeWidth="2.5" strokeLinejoin="round" /> :
       mood === 'surprised' ? <ellipse cx="140" cy="174" rx="8" ry="10" fill="#9F1239" /> :
       mood === 'annoyed' ? <path d="M 128 175 Q 140 168 152 175" fill="none" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" /> :
       mood === 'sad' ? <path d="M 128 179 Q 140 170 152 179" fill="none" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" /> :
       <path d="M 128 171 Q 140 182 152 171" fill="none" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />}

      {/* cable + connector */}
      {!cableOut && (
        <g className="byte-interactable" onClick={hit('cable')} style={{ transformOrigin: '140px 174px', animation: isChewing ? 'cable-chew 0.45s ease-in-out infinite' : 'none' }}>
          <path d="M 140 174 Q 185 180 216 232" fill="none" stroke={`url(#cat6Grad-${uid})`} strokeWidth="11" strokeLinecap="round" filter={`url(#shadowBlur-${uid})`} />
          <path d="M 140 174 Q 185 180 216 232" fill="none" stroke="#7DD3FC" strokeWidth="2.8" strokeLinecap="round" opacity="0.6" />
          {isChewing && (
            <g filter={`url(#sparkGlow-${uid})`} style={{ animation: 'spark-glow 0.8s ease-in-out infinite' }}>
              <polygon points="144,168 147,163 150,168 155,170 150,172 147,177 144,172 139,170" fill="#FDE047" /><circle cx="152" cy="164" r="1.5" fill="#38BDF8" />
            </g>
          )}
          <g transform="translate(202, 218) rotate(32)">
            <path d="M -4 2 L 6 -6 L 14 -6 L 16 16 L 4 16 Z" fill="#0369A1" stroke="#0C4A6E" strokeWidth="1" />
            <rect x="14" y="-5" width="26" height="20" rx="3" fill={`url(#rj45PlasticGrad-${uid})`} stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" filter={`url(#shadowBlur-${uid})`} />
            <path d="M 16 5 L 32 14 L 16 11 Z" fill="rgba(255,255,255,0.85)" stroke="#64748B" strokeWidth="1" />
            {[17, 20, 23, 26, 29, 32, 35].map((xPin) => <rect key={xPin} x={xPin} y="-3" width="2" height="7" rx="0.5" fill="#FDE047" />)}
          </g>
        </g>
      )}

      {/* front paws */}
      {!cableOut && (
        <g className="byte-interactable" onClick={hit('paws')}>
          <g transform="translate(122, 184)"><ellipse cx="0" cy="0" rx="11" ry="9" fill={`url(#bodyFurGrad-${uid})`} stroke="#94A3B8" strokeWidth="1" filter={`url(#shadowBlur-${uid})`} /><circle cx="-4" cy="2" r="2.2" fill={`url(#innerEarGrad-${uid})`} opacity="0.8" /><circle cx="1" cy="4" r="2.2" fill={`url(#innerEarGrad-${uid})`} opacity="0.8" /><circle cx="6" cy="2" r="2.2" fill={`url(#innerEarGrad-${uid})`} opacity="0.8" /></g>
          <g transform="translate(158, 184)"><ellipse cx="0" cy="0" rx="11" ry="9" fill={`url(#bodyFurGrad-${uid})`} stroke="#94A3B8" strokeWidth="1" filter={`url(#shadowBlur-${uid})`} /><circle cx="-5" cy="2" r="2.2" fill={`url(#innerEarGrad-${uid})`} opacity="0.8" /><circle cx="0" cy="4" r="2.2" fill={`url(#innerEarGrad-${uid})`} opacity="0.8" /><circle cx="5" cy="2" r="2.2" fill={`url(#innerEarGrad-${uid})`} opacity="0.8" /></g>
        </g>
      )}

      {/* severed cable mode → click to reconnect */}
      {cableOut && (
        <g className="byte-interactable" onClick={hit('cable')} transform="translate(160, 160)" style={{ animation: 'spark-glow 2s infinite' }}>
          <path d="M 0 0 C 30 15, 45 60, 65 80" fill="none" stroke={`url(#cat6Grad-${uid})`} strokeWidth="10" strokeLinecap="round" />
          <path d="M 0 0 L -6 -6" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" /><path d="M 0 0 L 2 -8" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="0" cy="0" r="4" fill="#FDE047" filter={`url(#sparkGlow-${uid})`} />
        </g>
      )}
    </svg>
  );
}
