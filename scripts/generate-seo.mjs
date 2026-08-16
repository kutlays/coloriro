import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { PALETTES } from "../src/palettes.js";
import { LOOKS } from "../src/looks.js";
import { palettePath, paletteSlug } from "../src/paletteUrls.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = resolve(ROOT, "dist");
const SITE = "https://coloriro.com";

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeXml(value) {
  return escapeHtml(value).replaceAll("'", "&apos;");
}

function replaceTag(html, selector, value) {
  const attribute = selector.startsWith("og:") ? "property" : "name";
  const pattern = new RegExp(
    `<meta\\s+${attribute}=["']${selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'][^>]*>`,
    "i",
  );
  const tag = `<meta ${attribute}="${selector}" content="${escapeHtml(value)}" />`;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace("</head>", `  ${tag}\n  </head>`);
}

function paletteHtml(template, palette) {
  const look = LOOKS[palette.plate];
  const path = palettePath(palette);
  const canonical = `${SITE}${path}`;
  const image = `${SITE}${look?.pair || "/looks/plate-001.jpg"}`;
  const colours = palette.colors.map((colour) => colour.name).join(", ");
  const title = `${palette.name} outfit palette · Coloriro Plate ${String(palette.plate).padStart(3, "0")}`;
  const description = `${palette.name}: a ${palette.season} outfit colour combination from Sanzo Wada, with ${colours}, suggested proportions and copyable HEX values.`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: palette.name,
    description,
    image,
    url: canonical,
    artform: "Colour combination and outfit study",
    creator: { "@type": "Person", name: "Sanzo Wada" },
    provider: { "@type": "Organization", name: "Coloriro", url: SITE },
  };

  let html = template.replace(
    /<!-- SEO_START -->[\s\S]*?<!-- SEO_END -->/,
    `<!-- SEO_START -->\n    <title>${escapeHtml(title)}</title>\n    <meta name="description" content="${escapeHtml(description)}" />\n    <link rel="canonical" href="${canonical}" />\n    <!-- SEO_END -->`,
  );
  html = replaceTag(html, "og:title", title);
  html = replaceTag(html, "og:description", description);
  html = replaceTag(html, "og:url", canonical);
  html = replaceTag(html, "og:image", image);
  html = replaceTag(html, "og:image:alt", look?.alt || palette.name);
  html = replaceTag(html, "twitter:title", title);
  html = replaceTag(html, "twitter:description", description);
  html = replaceTag(html, "twitter:image", image);
  html = html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`,
  );
  return html;
}

const template = await readFile(resolve(DIST, "index.html"), "utf8");
const paletteDirectory = resolve(DIST, "palette");
await mkdir(paletteDirectory, { recursive: true });

for (const palette of PALETTES) {
  await writeFile(
    resolve(paletteDirectory, `${paletteSlug(palette)}.html`),
    paletteHtml(template, palette),
  );
}

const historyTitle = "Sanzo Wada and the history behind Coloriro";
const historyDescription = "Discover Sanzo Wada, Haishoku Sōkan and the Japanese colour research behind Coloriro's 348 wardrobe combinations.";
let historyHtml = template.replace(
  /<!-- SEO_START -->[\s\S]*?<!-- SEO_END -->/,
  `<!-- SEO_START -->\n    <title>${historyTitle}</title>\n    <meta name="description" content="${historyDescription}" />\n    <link rel="canonical" href="${SITE}/history" />\n    <!-- SEO_END -->`,
);
historyHtml = replaceTag(historyHtml, "og:title", historyTitle);
historyHtml = replaceTag(historyHtml, "og:description", historyDescription);
historyHtml = replaceTag(historyHtml, "og:url", `${SITE}/history`);
historyHtml = replaceTag(historyHtml, "twitter:title", historyTitle);
historyHtml = replaceTag(historyHtml, "twitter:description", historyDescription);
await writeFile(resolve(DIST, "history.html"), historyHtml);

const sitemapEntries = [
  { path: "/", image: null, title: null },
  { path: "/history", image: null, title: null },
  ...PALETTES.map((palette) => ({
    path: palettePath(palette),
    image: LOOKS[palette.plate]?.pair || null,
    title: LOOKS[palette.plate]?.alt || palette.name,
  })),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sitemapEntries.map((entry) => `  <url>
    <loc>${escapeXml(`${SITE}${entry.path}`)}</loc>${entry.image ? `
    <image:image>
      <image:loc>${escapeXml(`${SITE}${entry.image}`)}</image:loc>
      <image:title>${escapeXml(entry.title)}</image:title>
    </image:image>` : ""}
  </url>`).join("\n")}
</urlset>
`;
await writeFile(resolve(DIST, "sitemap.xml"), sitemap);
await writeFile(
  resolve(DIST, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`,
);

console.log(`Generated ${PALETTES.length} palette pages, history metadata, sitemap.xml and robots.txt.`);
