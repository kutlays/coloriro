import { useState, useEffect } from "react";
import { PALETTES, SEASONS } from "./palettes";
import EditorialFigure from "./EditorialFigure";
import { LOOKS } from "./looks";

const PAGE = 24;
// Freeze the daily rotation to the first completed photo campaign. Adding new
// look assets must not reshuffle the recommendation while a date is in progress.
const DAILY_CAMPAIGN_MAX_PLATE = 140;
const DAILY_CAMPAIGN_EXTRA_PLATES = new Set([222]);

function seasonForDate(date) {
  const month = date.getUTCMonth();
  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 7) return "summer";
  if (month >= 8 && month <= 10) return "autumn";
  return "winter";
}

function dailyCombination(date = new Date()) {
  const season = seasonForDate(date);
  const list = PALETTES.filter((p) => (
    p.season === season
    && (p.plate <= DAILY_CAMPAIGN_MAX_PLATE || DAILY_CAMPAIGN_EXTRA_PLATES.has(p.plate))
    && LOOKS[p.plate]?.pair
  ));
  const day = Math.floor(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
  ) / 86400000);
  return { season, palette: list[day % list.length] };
}

function PaletteCard({ p, onCopy, copied, image }) {
  const w = p.weights;
  const look = LOOKS[p.plate];
  const photo = image || look?.pair;
  return (
    <article className="wada-card">
      <div className="card-index">
        <span>PLATE</span>
        <strong>{String(p.plate).padStart(3, "0")}</strong>
      </div>

      <div className={`card-visuals ${photo ? "has-photo" : ""}`}>
        {photo ? (
          <img className="pair-photo" src={photo} alt={look?.alt || p.name} loading="lazy" />
        ) : (
          <>
            <div className="figure-panel">
              <EditorialFigure colors={p.colors} roles={p.men} kind="men" variant={p.variant} />
              <span className="figure-label">TROUSERS</span>
            </div>
            <div className="figure-panel">
              <EditorialFigure colors={p.colors} roles={p.women} kind="women" variant={p.variant} />
              <span className="figure-label">SKIRT</span>
            </div>
          </>
        )}
      </div>

      <div className="card-info">
        <div className="name-row">
          <div>
            <p className="source-label">
              {p.colors.length === 2 ? "DUO" : p.colors.length === 3 ? "TRIO" : "QUARTET"}
            </p>
            <h2>{p.name}</h2>
          </div>
          <span className="season-mark">{p.season}</span>
        </div>

        <div className="palette-strip" aria-label={`${p.name} colour palette`}>
          {p.colors.map((col, i) => (
            <button
              key={i}
              className="swatch-block"
              style={{ background: col.hex, flexGrow: w[i] }}
              onClick={() => onCopy(col.hex)}
              title={`Copy ${col.hex}`}
              aria-label={`Copy ${col.name}, ${col.hex}`}
            >
              <span>{w[i]}%</span>
            </button>
          ))}
        </div>

        <div className="colour-list">
          {p.colors.map((col, i) => (
            <button key={i} className="colour-row" onClick={() => onCopy(col.hex)}>
              <span className="mini-swatch" style={{ background: col.hex }} />
              <span className="colour-name">{col.name}</span>
              <span className="colour-hex">{copied === col.hex ? "COPIED" : col.hex}</span>
            </button>
          ))}
        </div>

        <div className="card-footer">
          <span>Suggested proportion</span>
          <span className="proportion">{w.join(" / ")}</span>
          <span className="copy-hint">CLICK A COLOUR TO COPY</span>
        </div>
      </div>
    </article>
  );
}

function HeritagePage() {
  return (
    <>
      <header className="site-header">
        <div className="brand">
          <a className="brand-name brand-link" href="/">COLORIRO</a>
          <div className="brand-tag">Colour combinations<br />for getting dressed</div>
        </div>
        <nav className="header-links" aria-label="History page">
          <a href="/">Palettes</a>
          <a href="/#today">Today&apos;s Pick</a>
          <a href="/#book">The Book</a>
          <a href="/#about">About</a>
        </nav>
      </header>

      <main className="heritage-page">
        <section className="heritage" aria-labelledby="heritage-title">
          <div className="heritage-inner">
            <a className="heritage-back" href="/">← Back to the colour combinations</a>
            <div className="heritage-lead">
              <div>
                <p className="heritage-kicker">The source · 和田三造</p>
                <h1 className="heritage-title" id="heritage-title">
                  A painter who made colour practical.
                </h1>
                <p className="heritage-copy">
                  Sanzo Wada (1883–1967) worked across painting, teaching, fashion, kimono,
                  theatre and film. His colour research treated combinations as a usable
                  design language. Published in 1933–34, <em>Haishoku Sōkan</em> gathered
                  the 348 combinations that form Coloriro&apos;s foundation.
                </p>
              </div>
              <div className="heritage-study" aria-hidden="true">
                <p className="heritage-study-label">A study in relationship</p>
                <div className="heritage-bars">
                  <span className="heritage-bar" />
                  <span className="heritage-bar" />
                  <span className="heritage-bar" />
                  <span className="heritage-bar" />
                </div>
                <div className="heritage-study-note">
                  <span>Colour · proportion · rhythm</span>
                  <span>昭和八年</span>
                </div>
              </div>
            </div>

            <div className="heritage-timeline" aria-label="Sanzo Wada timeline">
              <article className="heritage-moment">
                <span className="heritage-year">1883</span>
                <h2>An interdisciplinary eye</h2>
                <p>Wada was born in Japan and developed a practice spanning fine art, clothing, stage and screen.</p>
              </article>
              <article className="heritage-moment">
                <span className="heritage-year">1927</span>
                <h2>Colour as shared knowledge</h2>
                <p>He founded the Japan Standard Color Association, now the Japan Color Research Institute.</p>
              </article>
              <article className="heritage-moment">
                <span className="heritage-year">1933–34</span>
                <h2><em>Haishoku Sōkan</em></h2>
                <p>Wada published a pioneering Japanese collection of colour combinations: the source of these 348 plates.</p>
              </article>
              <article className="heritage-moment">
                <span className="heritage-year">1954–58</span>
                <h2>International recognition</h2>
                <p>His costume work for <em>Gate of Hell</em> won an Academy Award; Japan later named him a Person of Cultural Merit.</p>
              </article>
            </div>

            <div className="heritage-credit">
              <div className="heritage-credit-block">
                <h2>What belongs to Wada</h2>
                <p>The original colour relationships, historic colour names and the 348 combinations themselves.</p>
              </div>
              <div className="heritage-credit-block">
                <h2>What Coloriro adds</h2>
                <p>Outfit photography, garment placement, suggested proportions, seasonal organization and the daily rotation. Digital HEX values approximate printed colour.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <strong>Coloriro presents Sanzo Wada&apos;s combinations as contemporary wardrobe studies.</strong>
        <br />
        <a href="/">Return to all 348 colour combinations</a>
      </footer>
    </>
  );
}

export default function App() {
  const [season, setSeason] = useState("summer");
  const [copied, setCopied] = useState(null);
  const [shown, setShown] = useState(PAGE);
  const [todayLookIndex, setTodayLookIndex] = useState(0);
  const today = dailyCombination();
  const todayLook = LOOKS[today.palette.plate];
  const todayLookOptions = todayLook?.variants || [todayLook?.pair].filter(Boolean);
  const todayLookImage = todayLookOptions[todayLookIndex] || todayLook?.pair;

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(null), 1200);
    return () => clearTimeout(t);
  }, [copied]);

  useEffect(() => {
    setShown(PAGE);
  }, [season]);

  useEffect(() => {
    setTodayLookIndex(0);
  }, [today.palette.plate]);

  const copy = async (hex) => {
    try {
      await navigator.clipboard.writeText(hex);
    } catch {
      /* clipboard unavailable on non-secure origins */
    }
    setCopied(hex);
  };

  const randomiseTodayLook = () => {
    if (todayLookOptions.length < 2) return;
    setTodayLookIndex((current) => {
      const candidate = Math.floor(Math.random() * (todayLookOptions.length - 1));
      return candidate >= current ? candidate + 1 : candidate;
    });
  };

  const list = PALETTES.filter((p) => p.season === season);
  const visible = list.slice(0, shown);
  const current = SEASONS.find((s) => s.id === season);
  const todaySeason = SEASONS.find((s) => s.id === today.season);

  return (
    <div className="coloriro-app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@400;500;600&display=swap');

        :root {
          --paper: #f3eee4;
          --paper-deep: #e8dfd0;
          --ink: #26221d;
          --muted: #766f64;
          --line: rgba(38,34,29,.17);
          --accent: #9b2f22;
          --card: #eee8dc;
        }

        * { box-sizing: border-box; }
        .coloriro-app {
          min-height: 100vh;
          color: var(--ink);
          background:
            radial-gradient(circle at 12% 8%, rgba(255,255,255,.7), transparent 28%),
            radial-gradient(circle at 88% 20%, rgba(255,255,255,.45), transparent 24%),
            linear-gradient(rgba(70,50,30,.025) 1px, transparent 1px),
            var(--paper);
          background-size: auto, auto, 100% 5px, auto;
          font-family: 'DM Sans', system-ui, sans-serif;
        }

        .site-header {
          display: flex; align-items: center; justify-content: space-between;
          gap: 32px; padding: 22px clamp(22px, 4vw, 64px);
          border-bottom: 1px solid var(--line);
          position: sticky; top: 0; z-index: 10;
          background: rgba(243,238,228,.92); backdrop-filter: blur(12px);
        }
        .brand { display: flex; align-items: baseline; gap: 28px; }
        .brand-name { font-family: 'Playfair Display', Georgia, serif; font-size: clamp(28px, 3vw, 42px); letter-spacing: .18em; line-height: 1; }
        .brand-link { color: inherit; text-decoration: none; }
        .brand-tag { max-width: 170px; font-size: 10px; line-height: 1.5; letter-spacing: .16em; text-transform: uppercase; }
        .header-links { display: flex; gap: 28px; font-size: 10px; letter-spacing: .13em; text-transform: uppercase; }
        .header-links a { color: inherit; text-decoration: none; }

        .hero { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(260px, .75fr); min-height: 390px; border-bottom: 1px solid var(--line); }
        .hero-copy { padding: clamp(50px, 8vw, 105px) clamp(28px, 7vw, 110px); position: relative; }
        .vertical-jp { position: absolute; left: 22px; top: 48px; writing-mode: vertical-rl; font-family: Georgia, serif; color: var(--accent); font-size: 13px; letter-spacing: .22em; }
        .kicker { font-size: 10px; letter-spacing: .19em; text-transform: uppercase; color: var(--muted); margin: 0 0 18px; }
        .hero h1 { margin: 0; max-width: 760px; font-family: 'Playfair Display', Georgia, serif; font-size: clamp(42px, 6vw, 82px); font-weight: 400; line-height: .98; letter-spacing: -.025em; }
        .hero h1 em { font-weight: 400; }
        .hero-intro { max-width: 580px; margin: 28px 0 0; font-family: Georgia, serif; font-size: 17px; line-height: 1.7; color: #4c463e; }
        .hero-source { margin-top: 34px; display: flex; align-items: center; gap: 12px; font-size: 10px; letter-spacing: .13em; text-transform: uppercase; }
        .seal { color: var(--accent); border: 1px solid var(--accent); width: 28px; height: 28px; display: grid; place-items: center; font-family: serif; }

        .hero-art {
          position: relative; min-height: 390px; overflow: hidden;
          background: linear-gradient(135deg, #e2d6c5, #c7b79e);
        }
        .hero-art::before {
          content: '配色'; position: absolute; top: 30px; right: 32px;
          font-family: serif; font-size: 28px; color: rgba(55,45,35,.35);
          writing-mode: vertical-rl;
        }
        .hero-art::after {
          content: ''; position: absolute; inset: 9% 10% 0 20%;
          border-radius: 55% 45% 0 0;
          background:
            radial-gradient(ellipse at 52% 18%, #d9bba0 0 7%, transparent 7.5%),
            linear-gradient(135deg, transparent 0 22%, #293d43 22% 42%, #bdad85 42% 62%, #a85a43 62% 79%, #26353b 79%);
          opacity: .88;
          filter: saturate(.82);
          transform: rotate(-2deg);
        }

        .heritage { border-bottom: 1px solid var(--line); background: rgba(232,223,208,.45); scroll-margin-top: 88px; }
        .heritage-inner { max-width: 1400px; margin: 0 auto; padding: clamp(54px, 7vw, 96px) clamp(24px, 6vw, 90px); }
        .heritage-page .heritage { min-height: calc(100vh - 90px); border-bottom: 0; }
        .heritage-back { display: inline-block; margin-bottom: clamp(38px, 6vw, 72px); color: var(--muted); font-size: 9px; letter-spacing: .15em; text-decoration: none; text-transform: uppercase; }
        .heritage-back:hover { color: var(--accent); }
        .heritage-lead { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(300px, .85fr); gap: clamp(42px, 7vw, 100px); align-items: center; }
        .heritage-kicker { margin: 0 0 14px; color: var(--accent); font-size: 9px; letter-spacing: .22em; text-transform: uppercase; }
        .heritage-title { max-width: 780px; margin: 0; font: clamp(36px, 4.6vw, 64px)/1.04 'Playfair Display', Georgia, serif; font-weight: 400; letter-spacing: -.02em; }
        .heritage-copy { max-width: 700px; margin: 24px 0 0; color: #4c463e; font: 16px/1.75 Georgia, serif; }
        .heritage-copy em { color: var(--ink); }
        .heritage-study { position: relative; min-height: 280px; padding: 28px; border: 1px solid var(--line); background: #e7dece; overflow: hidden; }
        .heritage-study::after { content: '配色総鑑'; position: absolute; right: 23px; top: 22px; color: rgba(38,34,29,.35); font: 13px Georgia, serif; letter-spacing: .2em; writing-mode: vertical-rl; }
        .heritage-study-label { margin: 0 0 24px; color: var(--muted); font-size: 8px; letter-spacing: .2em; text-transform: uppercase; }
        .heritage-bars { display: grid; height: 154px; grid-template-columns: 38fr 24fr 21fr 17fr; align-items: end; gap: 8px; padding-right: 40px; }
        .heritage-bar { min-height: 58px; border: 1px solid rgba(38,34,29,.12); }
        .heritage-bar:nth-child(1) { height: 100%; background: #1c4286; }
        .heritage-bar:nth-child(2) { height: 74%; background: #dd4027; }
        .heritage-bar:nth-child(3) { height: 88%; background: #b2b73e; }
        .heritage-bar:nth-child(4) { height: 58%; background: #f8b6ba; }
        .heritage-study-note { display: flex; justify-content: space-between; gap: 18px; margin-top: 14px; color: var(--muted); font-size: 8px; letter-spacing: .13em; text-transform: uppercase; }
        .heritage-timeline { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: clamp(45px, 6vw, 76px); border-top: 1px solid var(--line); border-left: 1px solid var(--line); }
        .heritage-moment { min-height: 190px; padding: 24px 22px; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        .heritage-year { display: block; margin-bottom: 18px; color: var(--accent); font: 24px 'Playfair Display', Georgia, serif; }
        .heritage-moment h2 { margin: 0 0 10px; font: 16px 'Playfair Display', Georgia, serif; font-weight: 500; }
        .heritage-moment p { margin: 0; color: var(--muted); font: 12px/1.65 Georgia, serif; }
        .heritage-credit { display: grid; grid-template-columns: 1fr 1fr; margin-top: 34px; border: 1px solid var(--line); background: rgba(243,238,228,.55); }
        .heritage-credit-block { padding: 25px 28px; }
        .heritage-credit-block + .heritage-credit-block { border-left: 1px solid var(--line); }
        .heritage-credit h2 { margin: 0 0 10px; font-size: 9px; letter-spacing: .18em; text-transform: uppercase; }
        .heritage-credit p { margin: 0; color: var(--muted); font: 13px/1.65 Georgia, serif; }

        .catalog { display: grid; grid-template-columns: 210px 1fr; max-width: 1600px; margin: 0 auto; }
        .season-nav { border-right: 1px solid var(--line); padding: 40px 28px; }
        .season-title { font-size: 9px; letter-spacing: .2em; text-transform: uppercase; color: var(--muted); margin-bottom: 30px; }
        .season-button { display: grid; grid-template-columns: 28px 1fr; gap: 10px; width: 100%; border: 0; background: none; padding: 15px 0; text-align: left; color: var(--muted); cursor: pointer; }
        .season-button.active { color: var(--accent); }
        .season-icon { font-family: Georgia, serif; font-size: 19px; }
        .season-label { font-family: Georgia, serif; font-size: 15px; }
        .season-months { display: block; margin-top: 4px; font: 9px 'DM Sans', sans-serif; letter-spacing: .1em; }
        .season-rule { height: 1px; background: var(--line); margin: 32px 0; }
        .book-copy { font-family: Georgia, serif; color: var(--muted); font-size: 12px; line-height: 1.65; }
        .book-copy strong { display: block; color: var(--ink); font-family: 'DM Sans', sans-serif; font-size: 9px; letter-spacing: .18em; text-transform: uppercase; margin-bottom: 10px; }

        .palette-area { padding: 36px clamp(22px, 3vw, 48px) 60px; }
        .today-section { margin-bottom: 48px; padding-bottom: 48px; border-bottom: 1px solid var(--line); }
        .today-head { display: flex; align-items: end; justify-content: space-between; gap: 24px; margin-bottom: 20px; }
        .today-kicker { margin: 0 0 7px; color: var(--accent); font-size: 8px; letter-spacing: .2em; text-transform: uppercase; }
        .today-title { margin: 0; font: 31px 'Playfair Display', Georgia, serif; font-weight: 400; }
        .today-note { max-width: 310px; margin: 0; color: var(--muted); font: 12px/1.6 Georgia, serif; text-align: right; }
        .today-card { max-width: 760px; }
        .today-look-controls { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-top: 12px; padding: 14px 16px; border: 1px solid rgba(38,34,29,.12); background: rgba(255,255,255,.22); }
        .today-look-kicker { margin: 0 0 4px; color: var(--accent); font-size: 8px; letter-spacing: .18em; text-transform: uppercase; }
        .today-look-note { margin: 0; color: var(--muted); font: 12px/1.45 Georgia, serif; }
        .today-look-button { flex: 0 0 auto; border: 1px solid var(--line); background: var(--paper); color: var(--ink); padding: 10px 14px; cursor: pointer; font: 9px 'DM Sans', sans-serif; letter-spacing: .12em; text-transform: uppercase; transition: background .2s ease, color .2s ease; }
        .today-look-button:hover:not(:disabled) { background: var(--ink); color: var(--paper); }
        .today-look-button:disabled { cursor: default; opacity: .45; }
        .catalog-head { display: flex; align-items: end; justify-content: space-between; gap: 20px; margin-bottom: 24px; }
        .catalog-count { font-family: 'Playfair Display', Georgia, serif; font-size: 23px; }
        .catalog-count span { font: 10px 'DM Sans', sans-serif; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); }
        .view-note { font-size: 9px; letter-spacing: .15em; text-transform: uppercase; color: var(--muted); }
        .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }

        .wada-card { background: rgba(239,233,221,.86); border: 1px solid rgba(38,34,29,.12); box-shadow: 0 12px 30px rgba(57,42,28,.06); overflow: hidden; transition: transform .25s ease, box-shadow .25s ease; }
        .wada-card:hover { transform: translateY(-3px); box-shadow: 0 18px 40px rgba(57,42,28,.11); }
        .card-index { display: flex; justify-content: space-between; align-items: baseline; padding: 15px 18px 10px; }
        .card-index span { font-size: 8px; letter-spacing: .2em; }
        .card-index strong { font: 25px 'Playfair Display', Georgia, serif; font-weight: 400; }
        .card-visuals { display: grid; grid-template-columns: 1fr 1fr; height: 300px; background: #d7d1c7; }
        .card-visuals.has-photo { height: auto; aspect-ratio: 4 / 3; }
        .pair-photo { display: block; grid-column: 1 / -1; width: 100%; height: 100%; object-fit: cover; object-position: center 38%; }
        .figure-panel { position: relative; min-width: 0; overflow: hidden; display: flex; align-items: flex-end; justify-content: center; background: linear-gradient(145deg, #ddd8cf, #c9c4bb); }
        .figure-panel + .figure-panel { border-left: 1px solid rgba(38,34,29,.1); background: linear-gradient(145deg, #d2ccc1, #e2ddd4); }
        .figure-panel > *:first-child { width: 100%; height: 100%; }
        .figure-label { position: absolute; left: 13px; bottom: 12px; font-size: 8px; letter-spacing: .18em; background: rgba(243,238,228,.82); padding: 5px 7px; }

        .card-info { padding: 18px; }
        .name-row { display: flex; justify-content: space-between; gap: 15px; align-items: start; margin-bottom: 15px; }
        .source-label { margin: 0 0 5px; color: var(--muted); font-size: 8px; letter-spacing: .18em; }
        .name-row h2 { margin: 0; font: 23px 'Playfair Display', Georgia, serif; font-weight: 500; }
        .season-mark { color: var(--accent); font-size: 8px; letter-spacing: .15em; text-transform: uppercase; }

        .palette-strip { display: flex; height: 72px; border: 1px solid rgba(38,34,29,.1); }
        .swatch-block { min-width: 0; border: 0; border-right: 1px solid rgba(243,238,228,.7); position: relative; cursor: pointer; padding: 0; }
        .swatch-block:last-child { border-right: 0; }
        .swatch-block span { position: absolute; bottom: 7px; left: 8px; font-size: 8px; color: rgba(255,255,255,.88); text-shadow: 0 1px 2px rgba(0,0,0,.35); }

        .colour-list { margin-top: 9px; }
        .colour-row { width: 100%; display: grid; grid-template-columns: 15px 1fr auto; gap: 9px; align-items: center; padding: 7px 0; border: 0; border-bottom: 1px solid rgba(38,34,29,.09); background: none; color: var(--ink); cursor: pointer; text-align: left; }
        .mini-swatch { width: 12px; height: 12px; border-radius: 50%; box-shadow: inset 0 0 0 1px rgba(0,0,0,.08); }
        .colour-name { font: 12px Georgia, serif; }
        .colour-hex { font-size: 8px; letter-spacing: .08em; color: var(--muted); }
        .card-footer { display: flex; align-items: center; gap: 8px; padding-top: 13px; font-size: 8px; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); }
        .proportion { color: var(--ink); }
        .copy-hint { margin-left: auto; opacity: .65; }

        .more-row { display: flex; justify-content: center; padding: 38px 0 4px; }
        .more-button { background: none; border: 1px solid var(--line); color: var(--ink); font: 10px 'DM Sans', sans-serif; letter-spacing: .18em; text-transform: uppercase; padding: 14px 30px; cursor: pointer; transition: background .2s ease; }
        .more-button:hover { background: rgba(38,34,29,.05); }

        .site-footer { max-width: 1200px; margin: 0 auto; padding: 30px 24px 55px; text-align: center; border-top: 1px solid var(--line); font: 13px Georgia, serif; color: var(--muted); line-height: 1.7; }
        .site-footer strong { color: var(--ink); font-weight: 400; }
        .site-footer a { color: inherit; }

        @media (max-width: 1000px) {
          .heritage-lead { grid-template-columns: 1fr; }
          .heritage-study { max-width: 650px; }
          .heritage-timeline { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .catalog { grid-template-columns: 1fr; }
          .season-nav { border-right: 0; border-bottom: 1px solid var(--line); padding: 18px 22px; display: flex; gap: 8px; overflow-x: auto; align-items: center; }
          .season-title, .season-rule, .book-copy { display: none; }
          .season-button { width: auto; min-width: 120px; padding: 10px 12px; }
        }
        @media (max-width: 760px) {
          .header-links { display: none; }
          .brand { gap: 15px; }
          .hero { grid-template-columns: 1fr; }
          .hero-copy { padding: 55px 28px 40px 52px; }
          .hero-art { min-height: 250px; }
          .grid { grid-template-columns: 1fr; }
          .card-visuals { height: 290px; }
          .today-head { align-items: start; flex-direction: column; gap: 9px; }
          .today-note { text-align: left; }
          .heritage-credit { grid-template-columns: 1fr; }
          .heritage-credit-block + .heritage-credit-block { border-left: 0; border-top: 1px solid var(--line); }
        }
        @media (max-width: 480px) {
          .brand-tag { display: none; }
          .palette-area { padding-inline: 14px; }
          .card-visuals { height: 250px; }
          .card-footer { flex-wrap: wrap; }
          .copy-hint { width: 100%; margin-left: 0; }
          .today-look-controls { align-items: stretch; flex-direction: column; }
          .today-look-button { width: 100%; }
          .heritage-timeline { grid-template-columns: 1fr; }
          .heritage-moment { min-height: 0; }
          .heritage-study { min-height: 240px; padding: 22px; }
          .heritage-bars { height: 130px; padding-right: 30px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .wada-card { transition: none; }
          .wada-card:hover { transform: none; }
        }
      `}</style>

      {window.location.pathname === "/history" ? (
        <HeritagePage />
      ) : (
        <>
      <header className="site-header">
        <div className="brand">
          <div className="brand-name">COLORIRO</div>
          <div className="brand-tag">Colour combinations<br />for getting dressed</div>
        </div>
        <nav className="header-links" aria-label="Primary">
          <a href="/history">Wada Sanzo</a>
          <a href="#today">Today's Pick</a>
          <a href="#book">The Book</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <section className="hero" id="wada">
        <div className="hero-copy">
          <div className="vertical-jp">配色総鑑　昭和八年</div>
          <p className="kicker">From a 1930s Japanese colour book</p>
          <h1>Colour, <em>made</em><br />wearable.</h1>
          <p className="hero-intro">
            All 348 colour combinations from Sanzo Wada's <em>A Dictionary of Color
            Combinations</em>, each one worn two ways. Wada's pairings are unchanged — what
            we add is where each colour sits on the body, and in what proportion.
          </p>
          <div className="hero-source">
            <span className="seal">和</span>
            <span>Haishoku Sōkan · Sanzo Wada · 1933–34</span>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true" />
      </section>

      <main className="catalog" id="book">
        <aside className="season-nav">
          <div className="season-title">Season</div>
          {SEASONS.map((s, index) => (
            <button
              key={s.id}
              className={`season-button ${season === s.id ? "active" : ""}`}
              aria-pressed={season === s.id}
              onClick={() => setSeason(s.id)}
            >
              <span className="season-icon">{["花", "日", "葉", "雪"][index] || "·"}</span>
              <span>
                <span className="season-label">{s.label}</span>
                <span className="season-months">{s.months}</span>
              </span>
            </button>
          ))}
          <div className="season-rule" />
          <div className="book-copy">
            <strong>About the seasons</strong>
            <p>
              Wada did not group his combinations by season. We sort them by lightness and
              warmth — an editorial choice, not his.
            </p>
            <p>Season means time of year, not skin tone. Proportions are starting points.</p>
          </div>
        </aside>

        <section className="palette-area">
          <section className="today-section" id="today" aria-labelledby="today-title">
            <div className="today-head">
              <div>
                <p className="today-kicker">A daily colour suggestion</p>
                <h2 className="today-title" id="today-title">Today's Combination</h2>
              </div>
              <p className="today-note">
                One {todaySeason?.label.toLowerCase()} combination, selected for this date.
                It stays here all day and changes at midnight UTC.
              </p>
            </div>
            <div className="today-card">
              <PaletteCard
                p={today.palette}
                onCopy={copy}
                copied={copied}
                image={todayLookImage}
              />
              <div className="today-look-controls" aria-live="polite">
                <div>
                  <p className="today-look-kicker">
                    Photographic outfit {todayLookIndex + 1} of {todayLookOptions.length}
                  </p>
                  <p className="today-look-note">
                    The models change clothes; today&apos;s palette stays the same.
                  </p>
                </div>
                <button
                  className="today-look-button"
                  type="button"
                  onClick={randomiseTodayLook}
                  disabled={todayLookOptions.length < 2}
                >
                  Try another outfit
                </button>
              </div>
            </div>
          </section>

          <div className="catalog-head">
            <div className="catalog-count">
              {list.length} combinations <span>· {current?.label}</span>
            </div>
            <div className="view-note">Tap any colour to copy its HEX value</div>
          </div>

          <div className="grid">
            {visible.map((p) => (
              <PaletteCard key={p.plate} p={p} onCopy={copy} copied={copied} />
            ))}
          </div>

          {shown < list.length && (
            <div className="more-row">
              <button className="more-button" onClick={() => setShown((n) => n + PAGE)}>
                Show more · {list.length - shown} remaining
              </button>
            </div>
          )}
        </section>
      </main>

      <footer className="site-footer" id="about">
        <strong>
          348 combinations from Sanzo Wada's Haishoku Sōkan (1933–34), published in English as
          A Dictionary of Color Combinations.
        </strong>
        <br />
        Colour data from the open-source{" "}
        <a href="https://github.com/mattdesl/dictionary-of-colour-combinations">
          dictionary-of-colour-combinations
        </a>{" "}
        dataset (MIT), converted from the book's CMYK values — approximations of the printed
        plates, not exact matches.
        <br />
        Garment roles, proportions and season grouping are ours, not Wada's.
      </footer>
        </>
      )}
    </div>
  );
}
