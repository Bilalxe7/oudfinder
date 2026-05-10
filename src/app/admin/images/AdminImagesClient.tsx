"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Upload,
  Check,
  AlertTriangle,
  Trash2,
  Search,
  ImageIcon,
} from "lucide-react";
import { parfums } from "@/lib/data/perfumes";
import { generatePerfumeImage } from "@/lib/perfume-image";
import { cn } from "@/lib/utils";

type ManifestState = Record<string, string>; // slug -> ext

type RowState = "idle" | "uploading" | "success" | "error";

export function AdminImagesClient() {
  const [isDev, setIsDev] = useState<boolean | null>(null);
  const [manifest, setManifest] = useState<ManifestState>({});
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"alle" | "ohne" | "mit">("alle");
  const [rowState, setRowState] = useState<
    Record<string, { state: RowState; msg?: string; bust?: number }>
  >({});

  // Load initial manifest + dev flag
  useEffect(() => {
    fetch("/api/admin/upload")
      .then((r) => r.json())
      .then((data) => {
        setIsDev(!!data.dev);
        setManifest(data.manifest ?? {});
      })
      .catch(() => setIsDev(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return parfums.filter((p) => {
      const has = !!manifest[p.slug];
      if (filter === "mit" && !has) return false;
      if (filter === "ohne" && has) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.marke.toLowerCase().includes(q) ||
        p.slug.includes(q)
      );
    });
  }, [query, filter, manifest]);

  const stats = useMemo(() => {
    const total = parfums.length;
    const withImg = Object.keys(manifest).length;
    return { total, withImg, missing: total - withImg };
  }, [manifest]);

  async function uploadFor(slug: string, file: File) {
    setRowState((s) => ({ ...s, [slug]: { state: "uploading" } }));
    const fd = new FormData();
    fd.append("slug", slug);
    fd.append("file", file);
    try {
      const r = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error ?? "Upload fehlgeschlagen");
      setManifest((m) => ({ ...m, [slug]: data.ext }));
      setRowState((s) => ({
        ...s,
        [slug]: { state: "success", bust: Date.now() },
      }));
    } catch (err) {
      setRowState((s) => ({
        ...s,
        [slug]: {
          state: "error",
          msg: err instanceof Error ? err.message : "Fehler",
        },
      }));
    }
  }

  async function removeFor(slug: string) {
    if (!confirm(`Bild für „${slug}" wirklich entfernen?`)) return;
    setRowState((s) => ({ ...s, [slug]: { state: "uploading" } }));
    const r = await fetch(`/api/admin/upload?slug=${encodeURIComponent(slug)}`, {
      method: "DELETE",
    });
    if (r.ok) {
      setManifest((m) => {
        const next = { ...m };
        delete next[slug];
        return next;
      });
      setRowState((s) => ({ ...s, [slug]: { state: "idle" } }));
    } else {
      const data = await r.json().catch(() => ({}));
      setRowState((s) => ({
        ...s,
        [slug]: { state: "error", msg: data.error ?? "Löschen fehlgeschlagen" },
      }));
    }
  }

  return (
    <div className="min-h-screen bg-[#faf8f4]" style={{ paddingTop: "4rem" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-10">
        {/* Header */}
        <header className="mb-6">
          <p className="text-[10px] font-semibold text-[#9b8b73] uppercase tracking-[0.18em] mb-2">
            Admin
          </p>
          <h1 className="text-3xl md:text-[2.4rem] font-serif font-medium text-[#111111] tracking-tight mb-2 leading-[1.1]">
            Parfum-Bilder verwalten
          </h1>
          <p className="text-sm text-[#7a756d] max-w-2xl">
            Lade echte Produktbilder hoch (WebP, JPG, PNG, AVIF). Sie werden
            in <code className="text-[12px] bg-white border border-[#ece9e3] px-1.5 py-0.5 rounded">public/perfumes/</code>
            {" "}gespeichert; Manifest <code className="text-[12px] bg-white border border-[#ece9e3] px-1.5 py-0.5 rounded">src/lib/perfume-images.ts</code>
            {" "}wird automatisch aktualisiert. Anschließend committen &amp; pushen,
            damit Vercel sie übernimmt.
          </p>
        </header>

        {/* Dev-only warning */}
        {isDev === false && (
          <div className="mb-6 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-900">
              <p className="font-semibold mb-1">Produktiv-Umgebung erkannt</p>
              <p>
                In Produktion sind Uploads deaktiviert (Vercel hat ein
                read-only Filesystem). Lade Bilder lokal mit{" "}
                <code className="bg-white border border-amber-300 px-1.5 py-0.5 rounded">
                  npm run dev
                </code>{" "}
                hoch und committe/pushe das Repo.
              </p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Stat label="Düfte gesamt" value={stats.total} />
          <Stat label="Mit Bild" value={stats.withImg} accent="green" />
          <Stat label="Fehlend" value={stats.missing} accent="warn" />
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#b8b0a4]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Suchen…"
              className="w-full pl-9 pr-3 py-2 text-sm border border-[#e4e0d7] rounded-lg bg-white focus:outline-none focus:border-[#111111]"
            />
          </div>
          <div className="flex gap-1 bg-white border border-[#e4e0d7] rounded-lg p-1">
            {(
              [
                ["alle", `Alle (${stats.total})`],
                ["ohne", `Fehlend (${stats.missing})`],
                ["mit", `Mit Bild (${stats.withImg})`],
              ] as const
            ).map(([k, l]) => (
              <button
                key={k}
                type="button"
                onClick={() => setFilter(k)}
                className={cn(
                  "text-xs px-3 py-1.5 rounded-md transition-colors",
                  filter === k
                    ? "bg-[#111111] text-white"
                    : "text-[#5a554d] hover:bg-[#f5f3ed]",
                )}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <Row
              key={p.id}
              parfum={p}
              hasImage={!!manifest[p.slug]}
              ext={manifest[p.slug]}
              state={rowState[p.slug]?.state ?? "idle"}
              errMsg={rowState[p.slug]?.msg}
              bust={rowState[p.slug]?.bust}
              onUpload={(file) => uploadFor(p.slug, file)}
              onRemove={() => removeFor(p.slug)}
              disabled={isDev === false}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-sm text-[#7a756d] py-16">
            Nichts gefunden für „{query}".
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────── Stat card ───────────────────────────
function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: "green" | "warn";
}) {
  return (
    <div className="bg-white border border-[#ece9e3] rounded-2xl p-4">
      <p className="text-[10px] font-semibold text-[#9b8b73] uppercase tracking-[0.14em] mb-1">
        {label}
      </p>
      <p
        className={cn(
          "text-2xl font-serif font-medium tabular-nums",
          accent === "green" && "text-emerald-700",
          accent === "warn" && "text-amber-700",
          !accent && "text-[#111111]",
        )}
      >
        {value}
      </p>
    </div>
  );
}

// ─────────────────────────── Row card ───────────────────────────
function Row({
  parfum,
  hasImage,
  ext,
  state,
  errMsg,
  bust,
  onUpload,
  onRemove,
  disabled,
}: {
  parfum: (typeof parfums)[number];
  hasImage: boolean;
  ext?: string;
  state: RowState;
  errMsg?: string;
  bust?: number;
  onUpload: (file: File) => void;
  onRemove: () => void;
  disabled: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const placeholder = useMemo(
    () =>
      generatePerfumeImage({
        brand: parfum.marke,
        name: parfum.name,
        family: parfum.duftfamilie,
        slug: parfum.slug,
        brandSlug: parfum.markeSlug,
      }),
    [parfum],
  );

  const realSrc = hasImage
    ? `/perfumes/${parfum.slug}.${ext}${bust ? `?v=${bust}` : ""}`
    : null;

  return (
    <div
      className={cn(
        "bg-white border border-[#ece9e3] rounded-2xl overflow-hidden flex transition-all",
        dragOver && !disabled && "border-[#111111] shadow-[0_4px_16px_rgba(20,16,8,0.10)]",
      )}
      onDragOver={(e) => {
        if (disabled) return;
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        if (disabled) return;
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) onUpload(file);
      }}
    >
      {/* Image preview */}
      <div className="relative w-28 flex-shrink-0 aspect-[3/4] bg-[#faf8f4] border-r border-[#ece9e3]">
        {realSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={realSrc}
            alt={`${parfum.marke} ${parfum.name}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={placeholder}
            alt={`${parfum.marke} ${parfum.name}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {hasImage && (
          <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md">
            <Check className="w-3 h-3" />
          </div>
        )}
      </div>

      {/* Info + controls */}
      <div className="flex-1 min-w-0 p-3.5 flex flex-col">
        <div className="flex-1">
          <p className="text-[10px] font-semibold text-[#9b8b73] uppercase tracking-[0.12em] truncate">
            {parfum.marke}
          </p>
          <p className="text-sm font-semibold text-[#111111] truncate">
            {parfum.name}
          </p>
          <p className="text-[11px] text-[#9b9389] mt-0.5 truncate">
            <code className="text-[10px] bg-[#f5f3ed] px-1 py-0.5 rounded">
              {parfum.slug}
            </code>
            {ext ? <span className="ml-1.5">.{ext}</span> : null}
          </p>
          {state === "error" && errMsg && (
            <p className="mt-1.5 text-[11px] text-rose-700">{errMsg}</p>
          )}
        </div>

        <div className="flex items-center gap-1.5 mt-2.5">
          <input
            ref={inputRef}
            type="file"
            accept="image/webp,image/jpeg,image/png,image/avif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onUpload(file);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            disabled={disabled || state === "uploading"}
            onClick={() => inputRef.current?.click()}
            className={cn(
              "flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all",
              disabled
                ? "bg-[#f5f3ed] text-[#b8b0a4] cursor-not-allowed"
                : state === "uploading"
                  ? "bg-[#3a3530] text-white"
                  : hasImage
                    ? "bg-white border border-[#e4e0d7] text-[#3a3530] hover:border-[#9b8b73]"
                    : "bg-[#111111] text-white hover:bg-[#2a2a2a]",
            )}
          >
            {state === "uploading" ? (
              <>
                <span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                lädt…
              </>
            ) : hasImage ? (
              <>
                <ImageIcon className="w-3 h-3" />
                Ersetzen
              </>
            ) : (
              <>
                <Upload className="w-3 h-3" />
                Hochladen
              </>
            )}
          </button>
          {hasImage && !disabled && (
            <button
              type="button"
              onClick={onRemove}
              disabled={state === "uploading"}
              aria-label="Bild entfernen"
              className="p-1.5 text-[#9b9389] hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

