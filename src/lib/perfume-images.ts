// ─────────────────────────────────────────────────────────────────────────
//  Real perfume image manifest
//
//  Maps perfume slugs → uploaded image extension (under /public/perfumes/).
//  This file is updated automatically by the admin UI at /admin/images
//  whenever a new image is uploaded. You can also edit it by hand.
//
//  Add an entry like:
//      "baccarat-rouge-540": "webp",
//  and place the file at:
//      public/perfumes/baccarat-rouge-540.webp
//
//  The runtime checks this map first; falls back to the generated SVG
//  placeholder when the slug is missing.
// ─────────────────────────────────────────────────────────────────────────

export const perfumeImageManifest: Record<string, string> = {
  // example — uncomment after uploading public/perfumes/baccarat-rouge-540.webp
  // "baccarat-rouge-540": "webp",
};
