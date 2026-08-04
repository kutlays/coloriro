import { useState, useEffect } from "react";
import {
  PALETTES,
  SEASONS,
  WEIGHTS,
  MANNEQUIN,
  MANNEQUIN_DARK,
} from "./palettes";

function Figure({ colors, roles, kind }) {
  const c = (i) => colors[i].hex;
  const top = c(roles.top);
  const bottom = c(roles.bottom);
  const shoes = c(roles.shoes);
  const detail = c(roles.detail);

  if (kind === "men") {
    return (
      <svg viewBox="0 0 120 224" className="fig" role="img" aria-label="Men's outfit">
        <circle cx="60" cy="24" r="13" fill={MANNEQUIN} />
        <rect x="54" y="34" width="12" height="10" fill={MANNEQUIN_DARK} />
        <path d="M37,112 L83,112 L80,192 L66,192 L60,136 L54,192 L40,192 Z" fill={bottom} />
        <path d="M40,190 L54,190 L54,202 Q54,206 49,206 L35,206 Q32,204 32,200 L33,196 Z" fill={shoes} />
        <path d="M66,190 L80,190 L79,196 L87,200 Q90,202 88,205 L72,205 Q66,205 66,200 Z" fill={shoes} />
        <path d="M38,42 Q60,35 82,42 L96,50 L91,96 L83,93 L83,116 L37,116 L37,93 L29,96 L24,50 Z" fill={top} />
        <path d="M52,40 L60,52 L68,40 L64,37 L60,44 L56,37 Z" fill={detail} />
        <rect x="37" y="110" width="46" height="6" fill={detail} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 224" className="fig" role="img" aria-label="Women's outfit">
      <circle cx="60" cy="24" r="12" fill={MANNEQUIN} />
      <rect x="55" y="33" width="10" height="10" fill={MANNEQUIN_DARK} />
      <path d="M49,158 L56,158 L55,190 L48,190 Z" fill={MANNEQUIN} />
      <path d="M64,158 L71,158 L72,190 L65,190 Z" fill={MANNEQUIN} />
      <path d="M46,188 L56,188 L56,198 Q56,202 51,202 L42,202 Q39,200 40,196 Z" fill={shoes} />
      <path d="M64,188 L74,188 L78,196 Q79,200 76,202 L67,202 Q64,202 64,198 Z" fill={shoes} />
      <path d="M40,104 L80,104 L91,160 L29,160 Z" fill={bottom} />
      <path d="M40,42 Q60,35 80,42 L93,50 L88,88 L81,85 L81,110 L39,110 L39,85 L32,88 L27,50 Z" fill={top} />
      <path d="M47,41 L73,41 L70,54 L50,54 Z" fill={detail} />
      <path d="M88,96 L104,96 L106,124 L86,124 Z" fill={detail} />
      <path d="M91,96 Q96,84 101,96" fill="none" stroke={detail} strokeWidth="2.5" />
    </svg>
  );
}

function PaletteCard({ p, onCopy, copied }) {
  return (
    <article className="card">
      <header className="card-head">
        <span className="num">{String(p.n).padStart(2, "0")}</span>
        <h2 className="pname">{p.name}</h2>
      </header>

      <div className="bar" aria-hidden="true">
        {p.colors.map((col, i) => (
          <span key={i} style={{ background: col.hex, flexGrow: WEIGHTS[i] }} />
        ))}
      </div>
      <p className="barlabel">Suggested proportion · {WEIGHTS.join(" / ")}</p>

      <div className="chips">
        {p.colors.map((col, i) => (
          <button
            key={i}
            className="chip"
            onClick={() => onCopy(col.hex)}
            title={`Copy ${col.hex}`}
          >
            <span className="dot" style={{ background: col.hex }} />
            <span className="chiptext">
              <span className="cname">{col.name}</span>
              <span className="chex">{copied === col.hex ? "copied" : col.hex}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="figs">
        <div className="figbox">
          <Figure colors={p.colors} roles={p.men} kind="men" />
          <span className="figlabel">Men</span>
        </div>
        <div className="figbox">
          <Figure colors={p.colors} roles={p.women} kind="women" />
          <span className="figlabel">Women</span>
        </div>
      </div>

      <p className="note">{p.note}</p>
    </article>
  );
}

export default function App() {
  const [season, setSeason] = useState("summer");
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(null), 1200);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = (hex) => {
    try {
      navigator.clipboard.writeText(hex);
    } catch {
      /* clipboard unavailable — the swatch still shows the value */
    }
    setCopied(hex);
  };

  const list = PALETTES.filter((p) => p.season === season);
  const current = SEASONS.find((s) => s.id === season);

  return (
    <div className="wrap">
      <div className="inner">
        <div className="masthead">
          <p className="eyebrow">Colour combinations for getting dressed</p>
          <h1 className="title">
            Four Seasons,
            <br />
            Twenty-four Palettes
          </h1>
          <p className="sub">
            Every palette shown against neutral grey, the way colour is judged, and worn
            two ways. Tap any swatch to copy its hex.
          </p>
        </div>

        <nav className="tabs" aria-label="Season">
          {SEASONS.map((s) => (
            <button
              key={s.id}
              className="tab"
              aria-pressed={season === s.id}
              onClick={() => setSeason(s.id)}
            >
              {s.label}
            </button>
          ))}
          <span className="months">{current.months}</span>
        </nav>

        <div className="grid">
          {list.map((p) => (
            <PaletteCard key={p.n} p={p} onCopy={copy} copied={copied} />
          ))}
        </div>

        <p className="foot">
          Season here means time of year, not skin tone.
          <br />
          Proportions are a starting point, not a rule — 40 / 30 / 18 / 12.
        </p>
      </div>
    </div>
  );
}
