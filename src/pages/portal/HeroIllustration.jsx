/**
 * トップのメインビジュアル。
 * 「紙の申請書」→「AIのハンコ（朱印）」→「確認済みのデジタル記録」という流れを1枚の絵で表す。
 */
export function HeroIllustration() {
  return (
    <svg className="hero-art" viewBox="0 0 520 440" role="img" aria-label="紙の申請書をAIが読み取り、確認済みのデジタル記録になるイメージ">
      <defs>
        <linearGradient id="paper" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fffdf8" />
          <stop offset="1" stopColor="#f3eee3" />
        </linearGradient>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#0b1530" floodOpacity="0.35" />
        </filter>
        <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill="#ffffff" opacity="0.18" />
        </pattern>
      </defs>

      <rect x="30" y="20" width="460" height="400" rx="28" fill="url(#dots)" />

      {/* 紙の申請書 */}
      <g transform="rotate(-7 150 210)" filter="url(#soft)">
        <rect x="52" y="70" width="196" height="262" rx="10" fill="url(#paper)" />
        <path d="M218 70 h30 v30 z" fill="#e6dfcf" />
        <text x="76" y="110" fontSize="15" fontWeight="700" fill="#2b2f3a">転入届</text>
        <rect x="76" y="124" width="58" height="3" rx="1.5" fill="#d9482f" opacity="0.7" />
        {[150, 176, 202, 228, 254].map((y, i) => (
          <g key={y}>
            <rect x="76" y={y} width="44" height="8" rx="4" fill="#c9c2b2" />
            <rect x="128" y={y} width={[86, 70, 92, 60, 80][i]} height="8" rx="4" fill="#8f8a7e" opacity="0.55" />
          </g>
        ))}
        <path d="M80 296 c12 -10 22 8 34 -2 s20 -8 30 2" stroke="#3a3f4d" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      </g>

      {/* 読み取りの流れ */}
      <path d="M262 214 C 300 214, 300 214, 330 214" stroke="#ffffff" strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" opacity="0.8" fill="none" className="flow-line" />

      {/* AIの朱印 */}
      <g transform="translate(262 150)">
        <circle cx="0" cy="0" r="38" fill="#e8552e" />
        <circle cx="0" cy="0" r="31" fill="none" stroke="#fff4ef" strokeWidth="2.5" />
        <text x="0" y="8" textAnchor="middle" fontSize="22" fontWeight="900" fill="#fff4ef" fontFamily="Inter, sans-serif">AI</text>
      </g>

      {/* 確認済みのデジタル記録 */}
      <g filter="url(#soft)">
        <rect x="320" y="118" width="172" height="212" rx="16" fill="#ffffff" />
        <rect x="320" y="118" width="172" height="40" rx="16" fill="#14213d" />
        <rect x="320" y="142" width="172" height="16" fill="#14213d" />
        <circle cx="340" cy="138" r="4" fill="#e8552e" />
        <text x="352" y="143" fontSize="13" fontWeight="700" fill="#ffffff">審査結果</text>
        {[184, 216, 248, 280].map((y, i) => (
          <g key={y}>
            <circle cx="346" cy={y} r="10" fill={i === 3 ? "#fde9e3" : "#e3f3ec"} />
            {i === 3 ? (
              <path d={`M341 ${y} h10`} stroke="#d9482f" strokeWidth="2.6" strokeLinecap="round" />
            ) : (
              <path d={`M341 ${y} l3.5 3.5 l6.5 -7`} stroke="#178a68" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            )}
            <rect x="364" y={y - 5} width={[96, 78, 104, 70][i]} height="10" rx="5" fill="#d7dbe4" />
          </g>
        ))}
        <rect x="336" y="304" width="140" height="12" rx="6" fill="#eef1f6" />
      </g>

      {/* 吹き出しの小さなラベル */}
      <g className="float-a">
        <rect x="300" y="44" width="160" height="40" rx="20" fill="#ffffff" />
        <circle cx="322" cy="64" r="9" fill="#e3f3ec" />
        <path d="M318 64 l3 3 l5.5 -6" stroke="#178a68" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="338" y="69" fontSize="13" fontWeight="700" fill="#14213d">読み取り完了</text>
      </g>
      <g className="float-b">
        <rect x="60" y="356" width="196" height="40" rx="20" fill="#ffffff" />
        <circle cx="82" cy="376" r="9" fill="#fde9e3" />
        <text x="82" y="380.5" textAnchor="middle" fontSize="11" fontWeight="900" fill="#d9482f">!</text>
        <text x="98" y="381" fontSize="13" fontWeight="700" fill="#14213d">住所の不一致を検出</text>
      </g>
      <g className="float-c">
        <rect x="350" y="352" width="132" height="40" rx="20" fill="#e8552e" />
        <text x="416" y="377" textAnchor="middle" fontSize="13" fontWeight="700" fill="#ffffff">職員が最終確認</text>
      </g>
    </svg>
  );
}
