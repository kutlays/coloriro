import React from "react";

/* =====================================================================
   DINO FIGURE SYSTEM

   Two independent axes:
     kind    → "women" (skirt, sly face, long hair)
               "men"   (trousers, naive face, short hair)
     variant → look pack: hide tone, hair colour, crest, piercing

   Props: {colors, roles, kind, variant}
===================================================================== */

const BELLY_MIX = 0.14;
const LINE = "#2E2823";

export function shade(hex, amt = 0.16) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  const r = Math.max(0, Math.round(((n >> 16) & 255) * (1 - amt)));
  const g = Math.max(0, Math.round(((n >> 8) & 255) * (1 - amt)));
  const b = Math.max(0, Math.round((n & 255) * (1 - amt)));
  return `rgb(${r},${g},${b})`;
}

function lighten(hex, amt = 0.14) {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.round(((n >> 16) & 255) + 255 * amt));
  const g = Math.min(255, Math.round(((n >> 8) & 255) + 255 * amt));
  const b = Math.min(255, Math.round((n & 255) + 255 * amt));
  return `rgb(${r},${g},${b})`;
}

/* Hide tones stay low-chroma on purpose: the clothes carry the colour. */
export const VARIANTS = [
  { id: "ash",   hide: "#BFB8AA", hair: "#3A312C", crest: "ridge",  piercing: "septum",  metal: "#C9A227" },
  { id: "slate", hide: "#B3B2AE", hair: "#2B2A28", crest: "spikes", piercing: "nostril", metal: "#C9C6C0" },
  { id: "sand",  hide: "#C8BDA9", hair: "#4C4038", crest: "horns",  piercing: "none",    metal: "#C9A227" },
  { id: "taupe", hide: "#AEA79B", hair: "#6B6157", crest: "ridge",  piercing: "nostril", metal: "#C9C6C0" },
  { id: "clay",  hide: "#C2B3A6", hair: "#33302C", crest: "spikes", piercing: "septum",  metal: "#C9A227" },
  { id: "stone", hide: "#B7B5B0", hair: "#5A4F45", crest: "horns",  piercing: "septum",  metal: "#C9C6C0" },
];

function FaceSly() {
  return (
    <g>
      <path d="M64,74 q17,6 34,-1 q2,-1 3,-3" stroke={LINE} strokeWidth="1.6" fill="none"
            strokeLinecap="round" opacity="0.82" />
      <ellipse cx="70" cy="48" rx="4" ry="4.6" fill={LINE} />
      <ellipse cx="98" cy="48" rx="4" ry="4.6" fill={LINE} />
      <circle cx="71.4" cy="46.2" r="1.4" fill="#fff" opacity="0.92" />
      <circle cx="99.4" cy="46.2" r="1.4" fill="#fff" opacity="0.92" />
      <path d="M64.5,44.6 q5.2,-3.4 10.5,-0.6" stroke={LINE} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M93,40 q5,-3 10,0.4" stroke={LINE} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </g>
  );
}

function FaceNaive() {
  return (
    <g>
      <path d="M72,74 q10,4.5 20,-0.5" stroke={LINE} strokeWidth="1.6" fill="none"
            strokeLinecap="round" opacity="0.78" />
      <ellipse cx="70" cy="48.5" rx="4.9" ry="5.7" fill={LINE} />
      <ellipse cx="98" cy="48.5" rx="4.9" ry="5.7" fill={LINE} />
      <circle cx="71.8" cy="46.2" r="1.8" fill="#fff" opacity="0.95" />
      <circle cx="99.8" cy="46.2" r="1.8" fill="#fff" opacity="0.95" />
      <circle cx="68.2" cy="51.4" r="1" fill="#fff" opacity="0.7" />
      <circle cx="96.2" cy="51.4" r="1" fill="#fff" opacity="0.7" />
      <path d="M63.8,37.4 q6.4,-4.2 12.8,-0.6" stroke={LINE} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M91.4,36.8 q6.4,-3.6 12.8,0.6" stroke={LINE} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </g>
  );
}

function Crest({ type, fill }) {
  if (type === "spikes")
    return (
      <g fill={fill}>
        <path d="M70,30 L74,14 L79,29 Z" />
        <path d="M80,29 L85,10 L90,29 Z" />
        <path d="M91,29 L96,15 L99,30 Z" />
      </g>
    );
  if (type === "horns")
    return (
      <g fill={fill}>
        <path d="M66,32 C62,22 64,16 69,15 C71,20 71,27 72,31 Z" />
        <path d="M102,32 C106,22 104,16 99,15 C97,20 97,27 96,31 Z" />
      </g>
    );
  return <path d="M74,28 C78,14 90,14 94,28 C90,22 78,22 74,28 Z" fill={fill} />;
}

function Piercing({ type, metal }) {
  if (type === "septum")
    return (
      <g>
        <circle cx="84" cy="79" r="4.6" fill="none" stroke={metal} strokeWidth="2" />
        <circle cx="84" cy="74.6" r="1.1" fill={metal} />
      </g>
    );
  if (type === "nostril")
    return (
      <g>
        <circle cx="66.6" cy="66.6" r="1.8" fill={metal} />
        <circle cx="66.6" cy="66.6" r="1.8" fill="none" stroke={shade(metal, 0.3)} strokeWidth="0.6" />
      </g>
    );
  return null;
}

export function Figure({ colors, roles, kind, variant = 0 }) {
  const v = VARIANTS[variant % VARIANTS.length];
  const HIDE = v.hide;
  const HIDE_SHADE = shade(HIDE, 0.12);
  const BELLY = lighten(HIDE, BELLY_MIX);

  const top = colors[roles.top].hex;
  const bottom = colors[roles.bottom].hex;
  const shoes = colors[roles.shoes].hex;
  const detail = colors[roles.detail].hex;
  const skirt = kind === "women";
  const hairShade = shade(v.hair, 0.28);

  return (
    <svg viewBox="0 0 170 300" className="fig" role="img"
         aria-label={skirt ? "Skirt look" : "Trouser look"}>
      <path d="M62,188 C42,196 24,192 15,175 C10,166 18,157 26,161 C32,164 31,173 25,174 C33,186 48,188 60,180 Z"
            fill={HIDE_SHADE} />

      {skirt && (
        <>
          <path d="M50,46 C50,21 64,11 84,11 C104,11 118,21 118,46 L122,132 C122,140 113,142 109,134 L105,60 L63,60 L59,134 C55,142 46,140 46,132 Z"
                fill={v.hair} />
          <path d="M105,60 L109,134 C113,142 122,140 122,132 L118,46 C118,30 112,20 101,15 C109,24 111,36 111,50 Z"
                fill={hairShade} />
        </>
      )}

      <path d="M60,186 C52,196 51,220 57,240 L75,240 C77,220 74,196 70,186 Z" fill={HIDE} />
      <path d="M100,186 C108,196 109,220 103,240 L85,240 C83,220 86,196 90,186 Z" fill={HIDE} />
      <path d="M92,186 C96,196 98,220 96,240 L103,240 C109,220 108,196 100,186 Z" fill={HIDE_SHADE} />

      <path d="M57,236 h18 l-2,32 h-16 Z" fill={HIDE} />
      <path d="M85,236 h18 l2,32 h-16 Z" fill={HIDE} />
      <path d="M97,236 h6 l2,32 h-6 Z" fill={HIDE_SHADE} />

      <path d="M50,262 h26 v13 c0,6 -5,9 -12,9 h-16 c-5,0 -8,-3 -6,-8 Z" fill={shoes} />
      <path d="M84,262 h26 l8,14 c2,5 -1,8 -6,8 h-16 c-7,0 -12,-3 -12,-9 Z" fill={shoes} />
      <path d="M96,262 h14 l8,14 c2,5 -1,8 -6,8 h-10 Z" fill={shade(shoes)} />

      <path d="M66,110 C50,120 42,140 42,161 C42,180 52,193 68,196 L100,196 C116,193 126,180 126,161 C126,140 118,120 102,110 Z"
            fill={HIDE} />
      <ellipse cx="84" cy="163" rx="26" ry="30" fill={BELLY} />
      <path d="M102,110 C118,120 126,140 126,161 C126,180 116,193 100,196 L88,196 C104,190 112,178 112,160 C112,139 108,120 96,111 Z"
            fill={HIDE_SHADE} />

      <path d="M44,146 C34,150 30,160 34,167 C36,171 41,171 42,167 C39,161 41,153 48,150 Z" fill={HIDE} />
      <path d="M124,146 C134,150 138,160 134,167 C132,171 127,171 126,167 C129,161 127,153 120,150 Z" fill={HIDE_SHADE} />

      {skirt ? (
        <>
          <path d="M50,178 h68 l16,54 h-100 Z" fill={bottom} />
          <path d="M92,178 h26 l16,54 h-30 Z" fill={shade(bottom)} />
        </>
      ) : (
        <>
          <path d="M50,178 h68 l-13,72 h-20 l-4.5,-46 l-4.5,46 h-20 Z" fill={bottom} />
          <path d="M92,178 h26 l-13,72 h-20 l3,-40 Z" fill={shade(bottom)} />
        </>
      )}

      <path d="M84,100 L104,108 C118,114 126,130 128,148 L130,176 L118,179 L118,190 L50,190 L50,179 L38,176 L40,148 C42,130 50,114 64,108 Z"
            fill={top} />
      <path d="M104,108 C118,114 126,130 128,148 L130,176 L118,179 L118,190 L92,190 L96,124 Z"
            fill={shade(top)} />

      <path d="M50,182 h68 v9 h-68 Z" fill={detail} />
      <path d="M92,182 h26 v9 h-26 Z" fill={shade(detail)} />

      <path d="M72,74 h24 l6,38 h-36 Z" fill={HIDE} />
      <path d="M88,74 h8 l6,38 h-10 Z" fill={HIDE_SHADE} />

      <path d="M64,104 q20,12 40,0 l4,10 q-24,14 -48,0 Z" fill={detail} />
      <path d="M100,106 l8,8 l-4,10 l-9,-8 Z" fill={shade(detail)} />

      <path d="M84,26 C102,26 114,38 114,54 C114,62 111,69 106,74 L62,74 C57,69 54,62 54,54 C54,38 66,26 84,26 Z"
            fill={HIDE} />
      <path d="M96,27 C108,32 114,42 114,54 C114,62 111,69 106,74 L92,74 C99,69 102,62 102,53 C102,42 100,32 96,27 Z"
            fill={HIDE_SHADE} />

      <Crest type={v.crest} fill={HIDE_SHADE} />

      {skirt ? (
        <path d="M55,45 C57,26 68,17.5 84,17.5 C100,17.5 111,26 113,45 C108,32 99,28 90,32 C84,35 73,34 68,30 C62.5,26 57,34.5 55,45 Z"
              fill={v.hair} />
      ) : (
        <path d="M56,45 C57.5,28 68,20 84,20 C100,20 110.5,28 112,45 C108,34 99,30.5 91,33 C84.5,35 74.5,34 69.5,31 C64.5,28.4 57.5,35 56,45 Z"
              fill={v.hair} />
      )}

      <path d="M64,58 C57,58 53,63 53,69 C53,76 59,80 67,80 L101,80 C109,80 115,76 115,69 C115,63 111,58 104,58 Z"
            fill={HIDE} />
      <path d="M96,58 C107,58 115,62 115,69 C115,76 109,80 101,80 L90,80 C99,78 104,74 104,68 C104,63 101,59 96,58 Z"
            fill={HIDE_SHADE} />
      <ellipse cx="70" cy="66" rx="2.6" ry="2" fill={LINE} opacity="0.6" />
      <ellipse cx="98" cy="66" rx="2.6" ry="2" fill={LINE} opacity="0.6" />

      {skirt ? <FaceSly /> : <FaceNaive />}
      <Piercing type={v.piercing} metal={v.metal} />
    </svg>
  );
}
