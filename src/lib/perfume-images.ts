// ─────────────────────────────────────────────────────────────────────────
//  Real perfume image manifest
//
//  Maps perfume slugs → uploaded image extension (under /public/perfumes/).
//  This file is updated automatically by the admin UI at /admin/images
//  whenever a new image is uploaded. You can also edit it by hand.
//
//  All images currently in this manifest were sourced from Wikimedia
//  Commons under Public Domain / CC-BY / CC-BY-SA licenses. Attribution
//  is published at /credits.
// ─────────────────────────────────────────────────────────────────────────

export const perfumeImageManifest: Record<string, string> = {
  "1-million": "jpg",
  "coco-mademoiselle": "jpg",
  "jadore": "jpg",
  "no-5": "jpg",
  "santal-33": "jpg",
  "shalimar": "jpg",
};
