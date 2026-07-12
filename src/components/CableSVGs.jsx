import React from 'react';

export const Yg = () => (
  <svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
    <rect width="600" height="280" fill="#08080f" />
    {[...Array(7)].map((_, t) => (
      <line key={`v${t}`} x1={t * 100} y1="0" x2={t * 100} y2="280" stroke="#ffffff06" strokeWidth="1" />
    ))}
    {[...Array(4)].map((_, t) => (
      <line key={`h${t}`} x1="0" y1={t * 70} x2="600" y2={t * 70} stroke="#ffffff06" strokeWidth="1" />
    ))}
    <ellipse cx="200" cy="155" rx="160" ry="100" fill="#ff380015" />
    <circle cx="200" cy="155" r="80" fill="#0e0e1c" stroke="#ea222218" strokeWidth="1" />
    <circle cx="200" cy="155" r="62" fill="#0a0a17" stroke="#ea222225" strokeWidth="1.5" />
    <circle cx="200" cy="155" r="44" fill="#10101e" stroke="#ea222235" strokeWidth="1.5" />
    <circle cx="200" cy="155" r="26" fill="#ea2222" opacity="0.85" />
    <circle cx="200" cy="155" r="13" fill="#08080f" />
    {[0, 60, 120, 180, 240, 300].map((e, t) => {
      const n = (e * Math.PI) / 180;
      return (
        <circle key={t} cx={200 + 33 * Math.cos(n)} cy={155 + 33 * Math.sin(n)} r="4.5" fill="#ea2222" opacity="0.55" />
      );
    })}
    <path d="M390 260 C390 215 368 192 384 158 C390 141 407 129 401 102 C418 129 424 151 412 173 C430 150 424 122 442 110 C445 138 433 160 447 182 C459 160 452 136 465 122 C470 151 460 177 475 199 C481 216 475 240 458 260Z" fill="#FF5C1A" opacity="0.95" />
    <path d="M408 260 C408 228 390 212 402 184 C407 170 421 162 416 137 C430 162 435 182 425 200 C439 182 434 158 448 145 C452 168 442 188 453 206 C459 192 455 174 465 163 C470 185 462 208 473 224 C476 237 473 252 460 260Z" fill="#FF9A20" opacity="0.85" />
    <path d="M422 260 C422 240 410 228 417 210 C421 199 431 193 427 174 C437 193 441 208 434 221 C443 208 439 192 448 182 C451 198 445 213 453 224 C455 235 452 249 443 260Z" fill="#FFDD55" opacity="0.75" />
    <rect x="0" y="143" width="110" height="24" rx="3" fill="#14141f" />
    <rect x="0" y="147" width="110" height="4" fill="#ea222230" />
    <rect x="0" y="155" width="110" height="4" fill="#ea222218" />
    <rect x="0" y="163" width="110" height="4" fill="#ea222230" />
    <rect x="464" y="78" width="116" height="28" rx="5" fill="#ea222212" stroke="#ea222228" strokeWidth="1" />
    <text x="522" y="97" textAnchor="middle" fill="#ea2222" fontSize="11" fontFamily="monospace" fontWeight="700">FIRE RATED</text>
    <text x="522" y="170" textAnchor="middle" fill="#FF5C1A" fontSize="30" fontFamily="monospace" fontWeight="700">850°C</text>
    <text x="522" y="190" textAnchor="middle" fill="#ffffff35" fontSize="10" fontFamily="sans-serif">circuit integrity</text>
    <text x="28" y="268" fill="#ffffff25" fontSize="9" fontFamily="monospace">FIRE ALARM & SURVIVAL CABLE</text>
    <text x="572" y="268" textAnchor="end" fill="#ea222255" fontSize="9" fontFamily="monospace">IEC 60331</text>
  </svg>
);

export const Zg = () => (
  <svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
    <rect width="600" height="280" fill="#08080f" />
    {[...Array(7)].map((_, t) => (
      <line key={`v${t}`} x1={t * 100} y1="0" x2={t * 100} y2="280" stroke="#ffffff06" strokeWidth="1" />
    ))}
    {[...Array(4)].map((_, t) => (
      <line key={`h${t}`} x1="0" y1={t * 70} x2="600" y2={t * 70} stroke="#ffffff06" strokeWidth="1" />
    ))}
    <ellipse cx="300" cy="145" rx="230" ry="95" fill="#b8621015" />
    {[
      { cx: 180, cy: 135, r: 60 },
      { cx: 300, cy: 150, r: 52 },
      { cx: 408, cy: 135, r: 45 }
    ].map((e, t) => (
      <g key={t}>
        <circle cx={e.cx} cy={e.cy} r={e.r} fill="#0d0d1a" stroke="#b8621025" strokeWidth="1.5" />
        <circle cx={e.cx} cy={e.cy} r={e.r - 12} fill="#12121e" stroke="#ea222218" strokeWidth="1" />
        <circle cx={e.cx} cy={e.cy} r={e.r - 24} fill="#b86210" opacity="0.85" />
        <circle cx={e.cx} cy={e.cy} r={e.r - 34} fill="#d4822a" opacity="0.9" />
        {[0, 51, 102, 153, 204, 255, 306].map((n, r) => {
          const i = (n * Math.PI) / 180;
          return (
            <circle key={r} cx={e.cx + (e.r - 30) * Math.cos(i)} cy={e.cy + (e.r - 30) * Math.sin(i)} r="3" fill="#e8a060" opacity="0.65" />
          );
        })}
      </g>
    ))}
    <rect x="0" y="200" width="600" height="16" rx="3" fill="#14141f" />
    <rect x="0" y="204" width="600" height="3" fill="#b8621035" />
    <rect x="0" y="209" width="600" height="3" fill="#b8621018" />
    <rect x="0" y="214" width="600" height="3" fill="#b8621035" />
    <rect x="18" y="22" width="150" height="28" rx="5" fill="#b8621012" stroke="#b8621028" strokeWidth="1" />
    <text x="93" y="41" textAnchor="middle" fill="#d4822a" fontSize="11" fontFamily="monospace" fontWeight="700">COPPER CONDUCTOR</text>
    <text x="510" y="76" textAnchor="middle" fill="#ea2222" fontSize="28" fontFamily="monospace" fontWeight="700">99.9%</text>
    <text x="510" y="96" textAnchor="middle" fill="#ffffff35" fontSize="10" fontFamily="sans-serif">purity grade</text>
    <text x="510" y="128" textAnchor="middle" fill="#d4822a" fontSize="24" fontFamily="monospace" fontWeight="700">58 MS/m</text>
    <text x="510" y="148" textAnchor="middle" fill="#ffffff35" fontSize="10" fontFamily="sans-serif">conductivity</text>
    <text x="28" y="268" fill="#ffffff25" fontSize="9" fontFamily="monospace">INSTRUMENTATION & CONTROL CABLE</text>
    <text x="572" y="268" textAnchor="end" fill="#ea222255" fontSize="9" fontFamily="monospace">IS 1554</text>
  </svg>
);

export const Kg = () => (
  <svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
    <rect width="600" height="280" fill="#08080f" />
    {[...Array(7)].map((_, t) => (
      <line key={`v${t}`} x1={t * 100} y1="0" x2={t * 100} y2="280" stroke="#ffffff06" strokeWidth="1" />
    ))}
    {[...Array(4)].map((_, t) => (
      <line key={`h${t}`} x1="0" y1={t * 70} x2="600" y2={t * 70} stroke="#ffffff06" strokeWidth="1" />
    ))}
    <ellipse cx="300" cy="145" rx="230" ry="95" fill="#2a6fd415" />
    <g>
      <circle cx="220" cy="142" r="88" fill="#0d0d1a" stroke="#8a8a9a30" strokeWidth="1.5" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((e, t) => {
        const n = (e * Math.PI) / 180,
          r = 78;
        return (
          <circle key={t} cx={220 + r * Math.cos(n)} cy={142 + r * Math.sin(n)} r="6.5" fill="#9a9aac" stroke="#08080f" strokeWidth="1.5" />
        );
      })}
      <circle cx="220" cy="142" r="62" fill="#12121e" stroke="#2a6fd428" strokeWidth="1" />
      <circle cx="220" cy="142" r="50" fill="#1a1a2c" stroke="#2a6fd435" strokeWidth="1" />
      <circle cx="220" cy="142" r="38" fill="#2a6fd4" opacity="0.85" />
      <circle cx="220" cy="142" r="26" fill="#d4822a" opacity="0.92" />
      {[0, 51, 102, 153, 204, 255, 306].map((e, t) => {
        const n = (e * Math.PI) / 180;
        return (
          <circle key={t} cx={220 + 20 * Math.cos(n)} cy={142 + 20 * Math.sin(n)} r="3" fill="#f0b060" opacity="0.7" />
        );
      })}
    </g>
    <path d="M 420 90 L 398 148 L 418 148 L 402 200 L 448 132 L 424 132 Z" fill="none" stroke="#2a6fd4" strokeWidth="2.5" strokeLinejoin="round" opacity="0.8" />
    <rect x="0" y="200" width="600" height="16" rx="3" fill="#14141f" />
    <rect x="0" y="204" width="600" height="3" fill="#2a6fd435" />
    <rect x="0" y="209" width="600" height="3" fill="#2a6fd418" />
    <rect x="0" y="214" width="600" height="3" fill="#2a6fd435" />
    <rect x="18" y="22" width="168" height="28" rx="5" fill="#2a6fd412" stroke="#2a6fd428" strokeWidth="1" />
    <text x="102" y="41" textAnchor="middle" fill="#6fa4e8" fontSize="11" fontFamily="monospace" fontWeight="700">LT & HT POWER CABLE</text>
    <text x="510" y="76" textAnchor="middle" fill="#2a6fd4" fontSize="26" fontFamily="monospace" fontWeight="700">33 kV</text>
    <text x="510" y="96" textAnchor="middle" fill="#ffffff35" fontSize="10" fontFamily="sans-serif">max HT grade</text>
    <text x="510" y="128" textAnchor="middle" fill="#d4822a" fontSize="24" fontFamily="monospace" fontWeight="700">90°C</text>
    <text x="510" y="148" textAnchor="middle" fill="#ffffff35" fontSize="10" fontFamily="sans-serif">XLPE rated</text>
    <text x="28" y="268" fill="#ffffff25" fontSize="9" fontFamily="monospace">XLPE ARMOURED POWER CABLE</text>
    <text x="572" y="268" textAnchor="end" fill="#2a6fd455" fontSize="9" fontFamily="monospace">IS 7098</text>
  </svg>
);

export const Jg = () => (
  <svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
    <rect width="600" height="280" fill="#08080f" />
    {[...Array(7)].map((_, t) => (
      <line key={`v${t}`} x1={t * 100} y1="0" x2={t * 100} y2="280" stroke="#ffffff06" strokeWidth="1" />
    ))}
    {[...Array(4)].map((_, t) => (
      <line key={`h${t}`} x1="0" y1={t * 70} x2="600" y2={t * 70} stroke="#ffffff06" strokeWidth="1" />
    ))}
    <ellipse cx="300" cy="145" rx="230" ry="95" fill="#e8b02015" />
    <g opacity="0.9">
      <rect x="90" y="90" width="150" height="104" rx="4" fill="#12121e" stroke="#e8b02030" strokeWidth="1.5" />
      {[0, 1, 2].map((e) =>
        [0, 1, 2, 3].map((t) => (
          <rect key={`${e}-${t}`} x={98 + t * 34} y={98 + e * 32} width="28" height="26" fill="#1a1a2c" stroke="#e8b02020" strokeWidth="1" />
        ))
      )}
      <line x1="90" y1="90" x2="240" y2="194" stroke="#e8b02015" strokeWidth="1" />
    </g>
    <g>
      <circle cx="392" cy="118" r="30" fill="#e8b020" opacity="0.9" />
      <circle cx="392" cy="118" r="42" fill="none" stroke="#e8b02035" strokeWidth="1.5" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((e, t) => {
        const n = (e * Math.PI) / 180,
          r = 392 + 48 * Math.cos(n),
          i = 118 + 48 * Math.sin(n),
          o = 392 + 60 * Math.cos(n),
          a = 118 + 60 * Math.sin(n);
        return (
          <line key={t} x1={r} y1={i} x2={o} y2={a} stroke="#e8b02050" strokeWidth="2" strokeLinecap="round" />
        );
      })}
    </g>
    <path d="M 165 194 C 165 220, 300 220, 330 200" fill="none" stroke="#1a1a2c" strokeWidth="14" strokeLinecap="round" />
    <path d="M 165 194 C 165 220, 300 220, 330 200" fill="none" stroke="#d4822a" strokeWidth="5" strokeLinecap="round" opacity="0.85" />
    <path d="M 165 194 C 165 220, 300 220, 330 200" fill="none" stroke="#f0b060" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 7" opacity="0.6" />
    <rect x="0" y="200" width="600" height="16" rx="3" fill="#14141f" />
    <rect x="0" y="204" width="600" height="3" fill="#e8b02035" />
    <rect x="0" y="209" width="600" height="3" fill="#e8b02018" />
    <rect x="0" y="214" width="600" height="3" fill="#e8b02035" />
    <rect x="18" y="22" width="140" height="28" rx="5" fill="#e8b02012" stroke="#e8b02028" strokeWidth="1" />
    <text x="88" y="41" textAnchor="middle" fill="#e8b020" fontSize="11" fontFamily="monospace" fontWeight="700">SOLAR DC CABLE</text>
    <text x="510" y="76" textAnchor="middle" fill="#e8b020" fontSize="26" fontFamily="monospace" fontWeight="700">1.5 kV</text>
    <text x="510" y="96" textAnchor="middle" fill="#ffffff35" fontSize="10" fontFamily="sans-serif">DC rated</text>
    <text x="510" y="128" textAnchor="middle" fill="#d4822a" fontSize="24" fontFamily="monospace" fontWeight="700">25 YRS</text>
    <text x="510" y="148" textAnchor="middle" fill="#ffffff35" fontSize="10" fontFamily="sans-serif">design life</text>
    <text x="28" y="268" fill="#ffffff25" fontSize="9" fontFamily="monospace">XLPO PHOTOVOLTAIC CABLE</text>
    <text x="572" y="268" textAnchor="end" fill="#e8b02055" fontSize="9" fontFamily="monospace">IEC 62930</text>
  </svg>
);
