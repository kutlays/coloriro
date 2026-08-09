import React from "react";

/**
 * Editorial fashion figure for Coloriro.
 *
 * The component intentionally keeps the palette data dynamic:
 * - colors: [{ hex, name }, ...]
 * - roles: optional role/index map from the original palette data
 * - kind: "men" | "women"
 * - variant: optional silhouette variant
 *
 * It is drawn as SVG rather than using stock imagery so the historical
 * Wada colour combinations remain the visual source of truth.
 */

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

function getHex(colors, index, fallback) {
  return colors?.[index]?.hex || fallback;
}

function resolveRoles(colors, roles) {
  // Supports common data shapes without requiring changes to palettes.js.
  if (Array.isArray(roles)) {
    return roles.map((r, i) => {
      if (typeof r === "number") return clamp(r, 0, Math.max(colors.length - 1, 0));
      if (typeof r === "string") {
        const found = colors.findIndex(
          c => c.name?.toLowerCase() === r.toLowerCase() ||
               c.hex?.toLowerCase() === r.toLowerCase()
        );
        return found >= 0 ? found : i % Math.max(colors.length, 1);
      }
      return i % Math.max(colors.length, 1);
    });
  }

  if (roles && typeof roles === "object") {
    return [
      roles.outer ?? roles.jacket ?? roles.top ?? 0,
      roles.top ?? roles.shirt ?? 1,
      roles.bottom ?? roles.trousers ?? roles.skirt ?? 2,
      roles.detail ?? roles.accent ?? roles.accessory ?? 3,
      roles.shoes ?? roles.bottom ?? 0,
    ].map(n => typeof n === "number" ? clamp(n, 0, Math.max(colors.length - 1, 0)) : 0);
  }

  return [0, 1, 2, 3, 0].map(n => n % Math.max(colors.length, 1));
}

function shade(hex, amount = -0.12) {
  if (!hex || !/^#([0-9a-f]{6})$/i.test(hex)) return hex;
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const f = amount >= 0 ? 1 + amount : 1 + amount;
  return `rgb(${clamp(Math.round(r * f), 0, 255)}, ${clamp(Math.round(g * f), 0, 255)}, ${clamp(Math.round(b * f), 0, 255)})`;
}

function Figure({ colors = [], roles, kind = "women", variant = 0 }) {
  const [outerI, topI, bottomI, accentI, shoesI] = resolveRoles(colors, roles);

  const outer = getHex(colors, outerI, "#7B756B");
  const top = getHex(colors, topI, "#E9E1D3");
  const bottom = getHex(colors, bottomI, "#4B4A45");
  const accent = getHex(colors, accentI, "#A75A42");
  const shoes = getHex(colors, shoesI, "#282522");

  const id = `fig-${kind}-${variant}-${outerI}-${topI}-${bottomI}-${shoesI}`;
  const darkOuter = shade(outer, -0.18);
  const darkBottom = shade(bottom, -0.16);
  const skin = "#D7AE91";
  const skinShadow = "#B9856B";
  const hair = kind === "women" ? "#282522" : "#302B27";

  const woman = kind === "women";

  return (
    <svg
      className="coloriro-figure"
      viewBox="0 0 320 470"
      role="img"
      aria-label={`${kind === "women" ? "Women's" : "Men's"} outfit using the palette colours`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={`${id}-paper`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F0ECE3" />
          <stop offset="1" stopColor="#E5DED1" />
        </linearGradient>
        <linearGradient id={`${id}-outer`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={outer} />
          <stop offset="1" stopColor={darkOuter} />
        </linearGradient>
        <linearGradient id={`${id}-bottom`} x1="0" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor={bottom} />
          <stop offset="1" stopColor={darkBottom} />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-30%" y="-20%" width="160%" height="170%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {/* Quiet studio / paper field */}
      <rect width="320" height="470" rx="3" fill={`url(#${id}-paper)`} />
      <ellipse
        cx="160"
        cy="446"
        rx="74"
        ry="10"
        fill="#6D6559"
        opacity=".16"
        filter={`url(#${id}-shadow)`}
      />

      {/* Head */}
      <ellipse cx="160" cy="82" rx={woman ? 29 : 31} ry="35" fill={skin} />
      <path
        d={woman
          ? "M130 83 C126 44 145 26 165 29 C191 31 198 52 190 83 C181 62 174 58 158 57 C148 58 140 67 130 83Z"
          : "M128 75 C126 43 144 27 163 28 C185 29 196 45 192 71 C183 54 173 49 159 49 C146 50 137 60 128 75Z"
        }
        fill={hair}
      />
      {woman && (
        <path
          d="M133 73 C127 92 132 110 145 116 C141 101 141 91 144 80Z
             M187 72 C194 91 190 108 177 116 C181 100 180 91 176 79Z"
          fill={hair}
        />
      )}
      <path d="M153 84 Q160 87 167 84" stroke={skinShadow} strokeWidth="2" fill="none" opacity=".65" />

      {/* Neck */}
      <path d="M149 107 L149 130 Q160 137 171 130 L171 106" fill={skin} />

      {woman ? (
        <>
          {/* Blouse / top */}
          <path
            d="M149 119 L119 136 L104 201 Q126 214 142 206 L160 192 L178 206 Q195 213 216 201 L201 136 L171 119
               L160 138 Z"
            fill={top}
          />
          {/* Collar */}
          <path d="M149 119 L160 140 L171 119 L166 112 L160 126 L154 112Z" fill={accent} opacity=".92" />
          {/* Waist belt */}
          <path d="M111 190 Q160 202 209 190 L209 203 Q160 216 111 203Z" fill={accent} opacity=".88" />
          {/* Skirt */}
          <path
            d="M113 201 Q160 214 207 201 L226 370 Q160 390 94 370Z"
            fill={`url(#${id}-bottom)`}
          />
          <path d="M130 216 L125 360 M160 219 L160 375 M190 216 L195 360" stroke="#FFFFFF" strokeOpacity=".14" strokeWidth="2" />
          {/* Arms */}
          <path d="M119 139 Q102 168 105 218 Q108 231 118 227 Q126 222 122 208 L130 160Z" fill={top} />
          <path d="M201 139 Q218 168 215 218 Q212 231 202 227 Q194 222 198 208 L190 160Z" fill={top} />
          <circle cx="112" cy="226" r="7" fill={skin} />
          <circle cx="208" cy="226" r="7" fill={skin} />
          {/* Shoes */}
          <path d="M108 370 Q123 366 137 373 L132 387 L101 387 Q98 379 108 370Z" fill={shoes} />
          <path d="M183 373 Q198 366 212 370 Q222 379 219 387 L188 387Z" fill={shoes} />
        </>
      ) : (
        <>
          {/* Shirt */}
          <path
            d="M149 119 L119 134 L105 206 Q129 218 145 208 L160 190 L175 208 Q192 218 215 206 L201 134 L171 119 L160 138Z"
            fill={top}
          />
          {/* Shirt placket */}
          <path d="M158 139 L162 139 L162 193 L158 193Z" fill={accent} opacity=".85" />
          <circle cx="160" cy="151" r="2.5" fill="#F4EEE3" />
          <circle cx="160" cy="166" r="2.5" fill="#F4EEE3" />
          <circle cx="160" cy="181" r="2.5" fill="#F4EEE3" />
          {/* Trousers */}
          <path
            d="M112 203 Q160 214 208 203 L199 374 Q183 383 165 376 L160 277 L154 376 Q136 383 121 374Z"
            fill={`url(#${id}-bottom)`}
          />
          <path d="M159 216 L160 276" stroke="#FFFFFF" strokeOpacity=".18" strokeWidth="2" />
          {/* Outer jacket */}
          <path
            d="M118 134 L93 151 L83 217 Q98 225 110 216 L122 169 L127 203 Q160 214 193 203 L198 169 L210 216 Q222 225 237 217 L227 151 L202 134 L176 121 L160 140 L144 121Z"
            fill={`url(#${id}-outer)`}
            opacity=".96"
          />
          <path d="M144 121 L160 141 L176 121 L171 116 L160 132 L149 116Z" fill={accent} opacity=".9" />
          {/* Arms / hands */}
          <path d="M94 153 Q79 190 82 226 Q85 237 96 232 Q103 228 101 215 L110 171Z" fill={outer} />
          <path d="M226 153 Q241 190 238 226 Q235 237 224 232 Q217 228 219 215 L210 171Z" fill={outer} />
          <circle cx="91" cy="231" r="7" fill={skin} />
          <circle cx="229" cy="231" r="7" fill={skin} />
          {/* Shoes */}
          <path d="M109 373 Q126 367 143 376 L139 390 L100 390 Q98 381 109 373Z" fill={shoes} />
          <path d="M177 376 Q194 367 211 373 Q222 381 220 390 L181 390Z" fill={shoes} />
        </>
      )}

      {/* Small editorial crop mark */}
      <path d="M20 30 H39 M20 30 V49" stroke="#2B2722" strokeWidth="1" opacity=".25" />
      <path d="M281 440 H300 M300 421 V440" stroke="#2B2722" strokeWidth="1" opacity=".25" />
    </svg>
  );
}

export { Figure };
export default Figure;
