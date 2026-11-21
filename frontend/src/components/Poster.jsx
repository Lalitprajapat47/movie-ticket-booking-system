const W = '#fff', Y = '#ffd166'
const ART = {
  1: () => <>
    <circle cx="100" cy="115" r="46" fill={Y} opacity=".92" />
    {[172, 182, 196, 214].map(y => <line key={y} x1="0" x2="200" y1={y} y2={y} stroke={W} opacity=".3" />)}
    {[[0, 140, 22, 40], [24, 118, 18, 62], [44, 150, 26, 30], [72, 160, 30, 20], [130, 130, 20, 50], [152, 104, 16, 76], [170, 145, 30, 35]].map((r, i) => <rect key={i} x={r[0]} y={r[1]} width={r[2]} height={r[3]} fill="#0b0820" opacity=".88" />)}
    {[[30, 40], [160, 55], [120, 30], [60, 80], [180, 100]].map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="1.6" fill={W} />)}
  </>,
  2: () => <>
    <path d="M55 200 V125 a45 45 0 0 1 90 0 V200Z" fill={W} opacity=".14" stroke={W} strokeOpacity=".6" strokeWidth="2" />
    <path d="M70 200 V130 a30 30 0 0 1 60 0 V200Z" fill="#000" opacity=".25" />
    <path d="M100 160 C58 118 88 84 100 112 C112 84 142 118 100 160Z" fill="#ff6b8b" />
    {[[30, 50], [170, 70], [150, 30], [45, 110]].map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="4" fill={Y} opacity=".8" />)}
  </>,
  3: () => <>
    <polygon points="100,0 35,240 165,240" fill={W} opacity=".13" />
    <rect x="86" y="80" width="28" height="56" rx="14" fill="#f1f1f1" />
    {[96, 106, 116].map(y => <line key={y} x1="88" x2="112" y1={y - 10} y2={y - 10} stroke="#999" />)}
    <path d="M78 118 a22 22 0 0 0 44 0" stroke="#f1f1f1" strokeWidth="4" fill="none" />
    <line x1="100" y1="140" x2="100" y2="195" stroke="#f1f1f1" strokeWidth="4" />
    <ellipse cx="100" cy="198" rx="30" ry="6" fill="#f1f1f1" />
    {[[40, 40], [160, 50], [150, 110], [48, 120]].map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="5" fill={Y} opacity=".85" />)}
  </>,
  4: () => <>
    <circle cx="135" cy="70" r="30" fill="#f5e6c8" opacity=".9" />
    <circle cx="100" cy="135" r="42" fill="#0a0a0f" stroke={W} strokeWidth="3" />
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1="100" x2="100" y1="97" y2={i % 3 ? 101 : 105} stroke={W} transform={`rotate(${i * 30} 100 135)`} />)}
    <line x1="100" y1="135" x2="100" y2="105" stroke="#e11d48" strokeWidth="3" />
    <line x1="100" y1="135" x2="116" y2="120" stroke={W} strokeWidth="3" />
    <ellipse cx="60" cy="215" rx="90" ry="14" fill={W} opacity=".08" /><ellipse cx="150" cy="235" rx="90" ry="14" fill={W} opacity=".08" />
  </>,
  5: () => <>
    <polygon points="70,40 98,88 70,140 42,88" fill={W} opacity=".9" /><path d="M70 40 V140 M42 88 H98" stroke="#0369a1" strokeOpacity=".4" />
    <path d="M70 140 q-15 25 0 45 t0 45" stroke={W} fill="none" strokeWidth="2" />
    <polygon points="140,100 160,132 140,168 120,132" fill={Y} /><path d="M140 168 q12 20 0 40 t0 40" stroke={Y} fill="none" strokeWidth="2" />
    {[[30, 180], [165, 40], [100, 210]].map((p, i) => <ellipse key={i} cx={p[0]} cy={p[1]} rx="22" ry="7" fill={W} opacity=".3" />)}
  </>,
  6: () => <>
    <circle cx="100" cy="90" r="40" fill="#f97316" opacity=".6" />
    <polygon points="88,150 112,150 200,300 0,300" fill="#0b0b0b" opacity=".7" />
    {[160, 185, 220].map((y, i) => <rect key={y} x="97" y={y} width="6" height={8 + i * 6} fill={W} opacity=".8" />)}
    {[185, 198, 211].map((y, i) => <line key={y} x1={10 + i * 10} x2={60 + i * 5} y1={y} y2={y} stroke={W} opacity=".6" strokeWidth="2" />)}
    <path d="M70 195 l14 -18 h46 l16 18 h12 v18 H62 v-18Z" fill="#111" stroke="#ef4444" strokeWidth="2" />
    <circle cx="88" cy="213" r="9" fill="#000" stroke={W} /><circle cx="146" cy="213" r="9" fill="#000" stroke={W} />
    <circle cx="170" cy="198" r="4" fill={Y} />
  </>,
  7: () => <>
    <circle cx="100" cy="100" r="36" fill={Y} opacity=".9" />
    <ellipse cx="60" cy="60" rx="34" ry="10" fill={W} opacity=".35" /><ellipse cx="145" cy="45" rx="30" ry="9" fill={W} opacity=".3" />
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={15 + i * 17} y1="60" x2={5 + i * 17} y2="130" stroke={W} opacity=".3" />)}
    <path d="M0 170 Q25 152 50 170 T100 170 T150 170 T200 170 V300 H0Z" fill={W} opacity=".18" />
    <path d="M0 195 Q25 177 50 195 T100 195 T150 195 T200 195 V300 H0Z" fill="#000" opacity=".2" />
  </>,
  8: () => <>
    <circle cx="100" cy="120" r="74" fill="none" stroke={W} opacity=".4" strokeWidth="3" />
    <circle cx="100" cy="120" r="56" fill={W} opacity=".08" stroke={W} strokeOpacity=".5" />
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1="100" x2="100" y1="68" y2="78" stroke={W} strokeWidth="2" transform={`rotate(${i * 30} 100 120)`} />)}
    <circle cx="100" cy="120" r="22" fill="#06b6d4" opacity=".7" /><line x1="100" y1="120" x2="124" y2="104" stroke={W} strokeWidth="4" strokeLinecap="round" />
    <circle cx="100" cy="120" r="5" fill={W} />
  </>,
  9: () => <>
    {Array.from({ length: 11 }, (_, i) => <circle key={i} cx={15 + i * 17} cy={30 + Math.sin(i / 1.6) * 14} r="6" fill={i % 2 ? '#f97316' : Y} />)}
    <circle cx="84" cy="130" r="32" fill="none" stroke={Y} strokeWidth="7" /><circle cx="116" cy="130" r="32" fill="none" stroke="#fff" strokeWidth="7" opacity=".85" />
    <polygon points="100,70 112,84 100,98 88,84" fill="#ff6b8b" />
    <path d="M30 220 q70 -40 140 0" stroke={Y} fill="none" strokeWidth="3" strokeDasharray="2 6" strokeLinecap="round" />
  </>,
  10: () => <>
    <ellipse cx="60" cy="40" rx="70" ry="28" fill="#0f172a" opacity=".75" /><ellipse cx="150" cy="30" rx="70" ry="30" fill="#0f172a" opacity=".85" />
    <polygon points="108,50 84,118 102,118 90,168 128,98 108,98 122,50" fill={Y} />
    {Array.from({ length: 14 }, (_, i) => <line key={i} x1={10 + i * 14} y1="90" x2={2 + i * 14} y2="150" stroke={W} opacity=".28" />)}
    <polygon points="0,190 200,190 200,300 0,300" fill="#1e293b" opacity=".85" />
    {[25, 60, 95, 130, 165].map(x => <line key={x} x1={x} x2={x} y1="190" y2="300" stroke={W} opacity=".12" />)}
  </>,
}
export default function Poster({ m }) {
  if (m.img) return <img className="art" src={m.img} alt="" loading="lazy" />
  const [a, b] = m.bg.match(/#[0-9a-f]{6}/gi), id = 'g' + m.id
  return (
    <svg className="art" viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient>
        <linearGradient id={id + 'f'} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".75" /></linearGradient>
      </defs>
      <rect width="200" height="300" fill={`url(#${id})`} />
      {ART[m.id]?.()}
      <rect y="170" width="200" height="130" fill={`url(#${id}f)`} />
    </svg>
  )
}
