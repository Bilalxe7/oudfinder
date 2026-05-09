// Generates elegant, brand-consistent SVG placeholders for perfume cards.
// No external image dependencies — guaranteed to render, always consistent.

type FamilyKey =
  | "blumig"
  | "blumig-oriental"
  | "blumig-amber"
  | "blumig-frisch"
  | "oriental"
  | "oriental-holzig"
  | "holzig"
  | "holzig-aromatisch"
  | "holzig-wuerzig"
  | "frisch"
  | "frisch-wuerzig"
  | "fougere"
  | "chypre"
  | "fruchtig"
  | "fruchtig-chypre"
  | "ledrig"
  | "gourmand"
  | "aquatisch"
  | "default";

const FAMILY_PALETTES: Record<FamilyKey, { from: string; to: string; accent: string }> = {
  "blumig":            { from: "#f6ece5", to: "#e8d4c8", accent: "#b88c7a" },
  "blumig-oriental":   { from: "#efe2da", to: "#d8c0a8", accent: "#9b7456" },
  "blumig-amber":      { from: "#f5e9d2", to: "#e3c89a", accent: "#a87a3c" },
  "blumig-frisch":     { from: "#eef0e8", to: "#dce0d0", accent: "#7d8a72" },
  "oriental":          { from: "#efdcc0", to: "#d4b384", accent: "#8b5e2a" },
  "oriental-holzig":   { from: "#e8d4b0", to: "#c8a070", accent: "#7a4a1c" },
  "holzig":            { from: "#ece2d0", to: "#cfb98e", accent: "#7d5a30" },
  "holzig-aromatisch": { from: "#e6e8df", to: "#c8ccba", accent: "#6e7560" },
  "holzig-wuerzig":    { from: "#ebdcc0", to: "#cba87a", accent: "#7d4f1f" },
  "frisch":            { from: "#e9eeec", to: "#cdd6d2", accent: "#5c726a" },
  "frisch-wuerzig":    { from: "#ece8de", to: "#d2cab7", accent: "#766a4f" },
  "fougere":           { from: "#e6ebe0", to: "#c4cdb8", accent: "#5e6e4a" },
  "chypre":            { from: "#ece4d0", to: "#cfbe96", accent: "#7c623c" },
  "fruchtig":          { from: "#f4e8d2", to: "#e2c898", accent: "#a36a30" },
  "fruchtig-chypre":   { from: "#efdcc0", to: "#d4b07a", accent: "#825030" },
  "ledrig":            { from: "#e6d5c0", to: "#bf9874", accent: "#6e3f1f" },
  "gourmand":          { from: "#f0dec5", to: "#dab891", accent: "#8b572c" },
  "aquatisch":         { from: "#e3eaee", to: "#bccad3", accent: "#4a6a7a" },
  "default":           { from: "#efe9df", to: "#d6cdbb", accent: "#7d6f5a" },
};

/** Maps a freeform "Duftfamilie" string to a known palette key. */
function familyKey(family?: string): FamilyKey {
  if (!family) return "default";
  const f = family.toLowerCase();
  if (f.includes("blumig") && f.includes("oriental")) return "blumig-oriental";
  if (f.includes("blumig") && f.includes("amber")) return "blumig-amber";
  if (f.includes("blumig") && f.includes("frisch")) return "blumig-frisch";
  if (f.includes("blumig")) return "blumig";
  if (f.includes("oriental") && f.includes("holzig")) return "oriental-holzig";
  if (f.includes("oriental")) return "oriental";
  if (f.includes("holzig") && f.includes("würz")) return "holzig-wuerzig";
  if (f.includes("holzig") && f.includes("aroma")) return "holzig-aromatisch";
  if (f.includes("holzig")) return "holzig";
  if (f.includes("frisch") && f.includes("würz")) return "frisch-wuerzig";
  if (f.includes("frisch")) return "frisch";
  if (f.includes("fougère") || f.includes("fougere")) return "fougere";
  if (f.includes("chypre") && f.includes("frucht")) return "fruchtig-chypre";
  if (f.includes("chypre")) return "chypre";
  if (f.includes("frucht")) return "fruchtig";
  if (f.includes("leder") || f.includes("ledrig")) return "ledrig";
  if (f.includes("gourmand")) return "gourmand";
  if (f.includes("aqua")) return "aquatisch";
  return "default";
}

/** Returns a CSS background gradient string for a given fragrance family. */
export function getFamilyGradient(family?: string): string {
  const p = FAMILY_PALETTES[familyKey(family)];
  return `linear-gradient(135deg, ${p.from} 0%, ${p.to} 100%)`;
}

/** Returns the accent color (used for fine details on placeholders). */
export function getFamilyAccent(family?: string): string {
  return FAMILY_PALETTES[familyKey(family)].accent;
}

/** Encodes SVG content for use in a data URI. */
function encodeSvg(svg: string): string {
  return (
    "data:image/svg+xml;charset=utf-8," +
    encodeURIComponent(svg.replace(/\s+/g, " ").trim())
  );
}

/**
 * Generates an editorial-style placeholder image for a perfume.
 * Renders: family-tinted gradient background + minimalist bottle silhouette
 * + subtle brand monogram.
 */
export function generatePerfumeImage(opts: {
  brand: string;
  name: string;
  family?: string;
  width?: number;
  height?: number;
}): string {
  const { brand, name, family, width = 600, height = 800 } = opts;
  const palette = FAMILY_PALETTES[familyKey(family)];

  // Brand monogram (first letter of each significant word, max 2 chars)
  const monogram = brand
    .split(/\s+/)
    .filter((w) => w.length > 1 && !/^(de|du|la|le|el|of|the|by|&)$/i.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  // Center coordinates
  const cx = width / 2;
  const bottleW = width * 0.36;
  const bottleH = height * 0.5;
  const bottleX = cx - bottleW / 2;
  const bottleY = height * 0.22;
  const capW = bottleW * 0.42;
  const capH = bottleH * 0.12;
  const capX = cx - capW / 2;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${palette.from}"/>
      <stop offset="100%" stop-color="${palette.to}"/>
    </linearGradient>
    <linearGradient id="bottle" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${palette.accent}" stop-opacity="0.18"/>
      <stop offset="50%" stop-color="${palette.accent}" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="${palette.accent}" stop-opacity="0.18"/>
    </linearGradient>
    <linearGradient id="liquid" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${palette.accent}" stop-opacity="0.0"/>
      <stop offset="100%" stop-color="${palette.accent}" stop-opacity="0.32"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <text x="${cx}" y="${height * 0.92}" text-anchor="middle"
    font-family="Georgia, 'Playfair Display', serif"
    font-size="${width * 0.085}"
    fill="${palette.accent}" fill-opacity="0.10"
    font-weight="500"
    letter-spacing="0.08em">${monogram}</text>
  <g>
    <rect x="${capX}" y="${bottleY - capH}" width="${capW}" height="${capH}"
      rx="${capH * 0.18}" fill="url(#bottle)"/>
    <rect x="${capX + capW * 0.15}" y="${bottleY - capH * 0.4}" width="${capW * 0.7}" height="${capH * 0.18}"
      fill="${palette.accent}" fill-opacity="0.20"/>
    <rect x="${bottleX}" y="${bottleY}" width="${bottleW}" height="${bottleH}"
      rx="${bottleW * 0.06}" fill="url(#bottle)"/>
    <rect x="${bottleX}" y="${bottleY + bottleH * 0.45}" width="${bottleW}" height="${bottleH * 0.55}"
      rx="${bottleW * 0.06}" fill="url(#liquid)"/>
    <rect x="${bottleX + bottleW * 0.18}" y="${bottleY + bottleH * 0.55}" width="${bottleW * 0.64}" height="${bottleH * 0.22}"
      fill="${palette.accent}" fill-opacity="0.06" stroke="${palette.accent}" stroke-opacity="0.15" stroke-width="0.8"/>
  </g>
</svg>`;
  return encodeSvg(svg);
}

/**
 * Wider banner-format image for hero / featured sections.
 */
export function generatePerfumeBanner(opts: {
  brand: string;
  name: string;
  family?: string;
}): string {
  return generatePerfumeImage({ ...opts, width: 1200, height: 800 });
}

/**
 * Convenience wrapper used everywhere a perfume image is needed.
 * Accepts the perfume object and returns a guaranteed-to-render data URI.
 */
export function imageFor(parfum: {
  marke: string;
  name: string;
  duftfamilie?: string;
}, size: "card" | "banner" = "card"): string {
  if (size === "banner") {
    return generatePerfumeBanner({
      brand: parfum.marke,
      name: parfum.name,
      family: parfum.duftfamilie,
    });
  }
  return generatePerfumeImage({
    brand: parfum.marke,
    name: parfum.name,
    family: parfum.duftfamilie,
  });
}
