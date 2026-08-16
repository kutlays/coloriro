export function paletteSlug(palette) {
  const name = palette.name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

  return `${String(palette.plate).padStart(3, "0")}-${name}`;
}

export function palettePath(palette) {
  return `/palette/${paletteSlug(palette)}`;
}

export function palettePlateFromPath(pathname) {
  const match = pathname.match(/^\/palette\/(\d{1,3})(?:-[^/]+)?\/?$/);
  return match ? Number(match[1]) : null;
}
