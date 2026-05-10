import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, mkdir, unlink, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

// Allowed image extensions (lower-case, without dot)
const ALLOWED_EXT = new Set(["webp", "jpg", "jpeg", "png", "avif"]);
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

// Project paths
const PUBLIC_DIR = path.join(process.cwd(), "public", "perfumes");
const MANIFEST_PATH = path.join(
  process.cwd(),
  "src",
  "lib",
  "perfume-images.ts",
);

function isDev() {
  return process.env.NODE_ENV !== "production";
}

function safeSlug(s: string): string | null {
  // slugs are lowercase letters/numbers/dashes only
  if (!/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(s)) return null;
  return s;
}

async function readManifest(): Promise<Record<string, string>> {
  const src = await readFile(MANIFEST_PATH, "utf8");
  // Extract the object literal between { and };
  const match = src.match(/Record<string,\s*string>\s*=\s*({[\s\S]*?});/);
  if (!match) return {};
  try {
    // The manifest entries use "key": "value", with line comments allowed.
    // Strip comments + trailing commas before JSON.parse.
    const cleaned = match[1]
      .replace(/\/\/.*$/gm, "")
      .replace(/,\s*}/g, "}");
    return JSON.parse(cleaned);
  } catch {
    return {};
  }
}

async function writeManifest(data: Record<string, string>): Promise<void> {
  const sortedKeys = Object.keys(data).sort();
  const entries = sortedKeys
    .map((k) => `  "${k}": "${data[k]}",`)
    .join("\n");
  const file = `// ─────────────────────────────────────────────────────────────────────────
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
${entries}
};
`;
  await writeFile(MANIFEST_PATH, file, "utf8");
}

// ─────────────────── POST: upload image ───────────────────
export async function POST(req: NextRequest) {
  if (!isDev()) {
    return NextResponse.json(
      {
        error:
          "Uploads sind nur im Dev-Modus möglich. In Produktion: Datei manuell in public/perfumes/ ablegen, perfume-images.ts ergänzen, committen, pushen.",
      },
      { status: 403 },
    );
  }

  try {
    const form = await req.formData();
    const file = form.get("file");
    const rawSlug = form.get("slug");
    if (!(file instanceof File))
      return NextResponse.json({ error: "file fehlt" }, { status: 400 });
    if (typeof rawSlug !== "string")
      return NextResponse.json({ error: "slug fehlt" }, { status: 400 });
    const slug = safeSlug(rawSlug);
    if (!slug)
      return NextResponse.json(
        { error: "ungültiger slug" },
        { status: 400 },
      );

    if (file.size > MAX_BYTES)
      return NextResponse.json(
        { error: `Datei größer als ${MAX_BYTES / 1024 / 1024} MB` },
        { status: 413 },
      );

    // Determine extension
    const filename = (file.name || "").toLowerCase();
    const ext = filename.includes(".") ? filename.split(".").pop()! : "";
    const normalisedExt = ext === "jpeg" ? "jpg" : ext;
    if (!ALLOWED_EXT.has(normalisedExt))
      return NextResponse.json(
        { error: "Nur WebP, JPG, PNG oder AVIF erlaubt" },
        { status: 400 },
      );

    // Ensure target dir
    if (!existsSync(PUBLIC_DIR)) await mkdir(PUBLIC_DIR, { recursive: true });

    // Remove any pre-existing file for this slug (different ext)
    const existing = await readdir(PUBLIC_DIR);
    await Promise.all(
      existing
        .filter((f) => f.startsWith(`${slug}.`) && f !== `${slug}.${normalisedExt}`)
        .map((f) => unlink(path.join(PUBLIC_DIR, f)).catch(() => {})),
    );

    const buf = Buffer.from(await file.arrayBuffer());
    const dest = path.join(PUBLIC_DIR, `${slug}.${normalisedExt}`);
    await writeFile(dest, buf);

    // Update manifest
    const manifest = await readManifest();
    manifest[slug] = normalisedExt;
    await writeManifest(manifest);

    return NextResponse.json({
      ok: true,
      slug,
      ext: normalisedExt,
      path: `/perfumes/${slug}.${normalisedExt}`,
      size: file.size,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Upload fehlgeschlagen" },
      { status: 500 },
    );
  }
}

// ─────────────────── DELETE: remove uploaded image ───────────────────
export async function DELETE(req: NextRequest) {
  if (!isDev()) {
    return NextResponse.json(
      { error: "Nur im Dev-Modus" },
      { status: 403 },
    );
  }
  const { searchParams } = new URL(req.url);
  const rawSlug = searchParams.get("slug");
  if (typeof rawSlug !== "string")
    return NextResponse.json({ error: "slug fehlt" }, { status: 400 });
  const slug = safeSlug(rawSlug);
  if (!slug)
    return NextResponse.json({ error: "ungültiger slug" }, { status: 400 });

  try {
    if (existsSync(PUBLIC_DIR)) {
      const existing = await readdir(PUBLIC_DIR);
      await Promise.all(
        existing
          .filter((f) => f.startsWith(`${slug}.`))
          .map((f) => unlink(path.join(PUBLIC_DIR, f)).catch(() => {})),
      );
    }
    const manifest = await readManifest();
    delete manifest[slug];
    await writeManifest(manifest);
    return NextResponse.json({ ok: true, slug });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Löschen fehlgeschlagen" },
      { status: 500 },
    );
  }
}

// ─────────────────── GET: list state ───────────────────
export async function GET() {
  const manifest = await readManifest().catch(() => ({}));
  return NextResponse.json({ dev: isDev(), manifest });
}
