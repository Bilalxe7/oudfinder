"use client";
import Link from "next/link";
import { useState } from "react";
import { Heart, Share2, ShoppingBag, ChevronLeft, BookmarkPlus, ThumbsUp, Clock, Wind, Sparkles } from "lucide-react";
import { Parfum, parfums } from "@/lib/data/perfumes";
import { StarRating } from "@/components/ui/StarRating";
import { PerfumeCard } from "@/components/perfume/PerfumeCard";
import { imageFor } from "@/lib/perfume-image";
import { cn } from "@/lib/utils";

const jahreszeichenEmoji: Record<string, string> = { fruehling: "🌸 Frühling", sommer: "☀️ Sommer", herbst: "🍂 Herbst", winter: "❄️ Winter" };
const anlassLabel: Record<string, string> = { alltag: "Alltag", abend: "Abend", buero: "Büro", date: "Date", sport: "Sport", besonder: "Besondere Anlässe" };

function ScaleBar({ label, value, max = 10 }: { label: string; value: number; max?: number }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs text-[#666666]">{label}</span>
        <span className="text-xs font-semibold text-[#111111]">{value}/{max}</span>
      </div>
      <div className="h-1.5 bg-[#f0ede8] rounded-full overflow-hidden">
        <div className="h-full bg-[#9b8b73] rounded-full transition-all duration-500" style={{ width: `${(value / max) * 100}%` }} />
      </div>
    </div>
  );
}

function NotePyramid({ noten }: { noten: Parfum["noten"] }) {
  const sektionen = [
    { title: "Kopfnoten", sub: "Erster Eindruck (0–30 Min.)", notes: noten.filter(n => n.kategorie === "kopf"), icon: "✨" },
    { title: "Herznoten", sub: "Das Herzstück (30 Min.–2 Std.)", notes: noten.filter(n => n.kategorie === "herz"), icon: "🌸" },
    { title: "Basisnoten", sub: "Der bleibende Eindruck (2–8 Std.)", notes: noten.filter(n => n.kategorie === "basis"), icon: "🌳" },
  ];
  return (
    <div className="space-y-3">
      {sektionen.map((s) => (
        <div key={s.title} className="border border-[#e8e6e1] rounded-xl p-4 bg-[#faf9f7]">
          <div className="flex items-center gap-2 mb-3">
            <span>{s.icon}</span>
            <div>
              <p className="text-sm font-semibold text-[#111111]">{s.title}</p>
              <p className="text-xs text-[#aaaaaa]">{s.sub}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {s.notes.map((note) => (
              <div key={note.name} className="flex items-center gap-1.5 bg-white border border-[#e8e6e1] px-3 py-1.5 rounded-full">
                {note.farbe && <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: note.farbe }} />}
                <span className="text-xs text-[#444444]">{note.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function DuftDetailClient({ parfum }: { parfum: Parfum }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState<"info" | "bewertungen" | "dupes">("info");
  const aehnliche = parfums.filter(p => parfum.aehnliche.includes(p.id));
  const dupes = parfums.filter(p => parfum.dupes.includes(p.id));

  return (
    <div className="min-h-screen bg-white pt-14 pb-24 md:pb-8">
      {/* Hero image */}
      <div className="relative h-64 md:h-[420px] overflow-hidden">
        <img src={imageFor(parfum, "banner")} alt={`${parfum.marke} ${parfum.name}`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />

        {/* Back */}
        <div className="absolute top-4 left-4 sm:left-8">
          <Link href="/entdecken" className="inline-flex items-center gap-1.5 text-xs font-medium text-[#555555] hover:text-[#111111] bg-white/90 border border-[#e8e6e1] px-3 py-1.5 rounded-lg transition-all backdrop-blur-sm">
            <ChevronLeft className="w-3.5 h-3.5" /> Zurück
          </Link>
        </div>

        {/* Actions */}
        <div className="absolute top-4 right-4 sm:right-8 flex gap-2">
          {[
            { icon: Share2, label: "Teilen", action: () => {} },
            { icon: Heart, label: liked ? "Gemerkt" : "Merken", action: () => setLiked(!liked), active: liked },
            { icon: BookmarkPlus, label: "Sammlung", action: () => setSaved(!saved), active: saved },
          ].map((btn) => (
            <button
              key={btn.label}
              onClick={btn.action}
              className="flex items-center gap-1.5 text-xs font-medium text-[#555555] hover:text-[#111111] bg-white/90 border border-[#e8e6e1] px-3 py-1.5 rounded-lg transition-all backdrop-blur-sm"
            >
              <btn.icon className={cn("w-3.5 h-3.5", btn.active && "fill-rose-500 text-rose-500")} />
              <span className="hidden sm:block">{btn.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-12 relative z-10">
        {/* Top metadata */}
        <div className="mb-8">
          {parfum.editorChoice && (
            <span className="inline-block text-[11px] font-semibold text-[#8b7355] bg-[#faf5ed] border border-[#e8dcc8] px-2.5 py-1 rounded-md mb-3">
              Editor's Choice
            </span>
          )}
          <p className="text-sm font-semibold text-[#9b8b73] uppercase tracking-wide mb-1">{parfum.marke}</p>
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-[#111111] mb-2">{parfum.name}</h1>
          <p className="text-base text-[#666666] mb-4">{parfum.kurzBeschreibung}</p>

          <div className="flex flex-wrap items-center gap-4">
            <StarRating rating={parfum.gesamtBewertung} size="md" showNumber count={parfum.bewertungsAnzahl} />
            <span className="text-sm text-[#aaaaaa]">·</span>
            <span className="text-sm text-[#666666]">{parfum.duftfamilie}</span>
            <span className="text-sm text-[#aaaaaa]">·</span>
            <span className="text-sm text-[#666666]">{parfum.jahr}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main */}
          <div className="lg:col-span-2">
            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { icon: "⭐", label: "Bewertung", value: parfum.gesamtBewertung.toFixed(1) + "/5" },
                { icon: "⏱", label: "Haltbarkeit", value: parfum.haltbarkeit + "/10" },
                { icon: "💨", label: "Sillage", value: parfum.sillage + "/10" },
              ].map((s) => (
                <div key={s.label} className="text-center border border-[#e8e6e1] rounded-xl py-4 bg-white">
                  <p className="text-lg mb-1">{s.icon}</p>
                  <p className="text-base font-semibold text-[#111111]">{s.value}</p>
                  <p className="text-xs text-[#aaaaaa] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#e8e6e1] mb-7 gap-0">
              {(["info", "bewertungen", "dupes"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "px-4 py-2.5 text-sm font-medium border-b-2 transition-all -mb-px mr-2",
                    tab === t ? "border-[#111111] text-[#111111]" : "border-transparent text-[#888888] hover:text-[#555555]"
                  )}
                >
                  {t === "info" ? "Info" : t === "bewertungen" ? `Bewertungen (${parfum.bewertungsAnzahl.toLocaleString("de-DE")})` : "Dupes"}
                </button>
              ))}
            </div>

            {tab === "info" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-base font-semibold text-[#111111] mb-3">Über diesen Duft</h2>
                  <p className="text-sm text-[#555555] leading-relaxed">{parfum.beschreibung}</p>
                </div>

                {/* KI Summary */}
                <div className="bg-[#faf9f7] border border-[#e8e6e1] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-[#9b8b73]" />
                    <span className="text-xs font-semibold text-[#9b8b73] uppercase tracking-wide">KI-Zusammenfassung</span>
                  </div>
                  <p className="text-sm text-[#555555] leading-relaxed">
                    {parfum.name} passt ideal für {parfum.anlaesse.map(a => anlassLabel[a]).join(", ")} und entfaltet sich am besten
                    in {parfum.jahreszeiten.map(j => jahreszeichenEmoji[j]).join(", ")}. Die {parfum.haltbarkeit >= 8 ? "ausgezeichnete" : "gute"} Haltbarkeit
                    macht ihn zu einem verlässlichen Begleiter.
                  </p>
                </div>

                <div>
                  <h2 className="text-base font-semibold text-[#111111] mb-4">Duftnoten</h2>
                  <NotePyramid noten={parfum.noten} />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-[#111111] mb-4">Eigenschaften</h2>
                  <div className="space-y-4">
                    <ScaleBar label="Haltbarkeit" value={parfum.haltbarkeit} />
                    <ScaleBar label="Sillage (Schweif)" value={parfum.sillage} />
                  </div>
                </div>

                <div>
                  <h2 className="text-base font-semibold text-[#111111] mb-3">Details</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { label: "Duftfamilie", value: parfum.duftfamilie },
                      { label: "Parfumeur", value: parfum.parfumeur },
                      { label: "Jahr", value: parfum.jahr.toString() },
                      { label: "Geschlecht", value: { damen: "Damen", herren: "Herren", unisex: "Unisex" }[parfum.geschlecht] },
                      { label: "Jahreszeiten", value: parfum.jahreszeiten.map(j => jahreszeichenEmoji[j]).join(", ") },
                      { label: "Flakon", value: parfum.flakon },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-[#faf9f7] border border-[#f0ede8] rounded-lg p-3">
                        <p className="text-[11px] text-[#aaaaaa] mb-0.5">{label}</p>
                        <p className="text-xs font-medium text-[#333333] leading-snug">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <p className="text-[11px] font-semibold text-[#aaaaaa] uppercase tracking-wide mb-2">Tags</p>
                  <div className="flex flex-wrap gap-1.5">
                    {parfum.tags.map(tag => (
                      <Link key={tag} href={`/entdecken?q=${encodeURIComponent(tag)}`}
                        className="text-xs text-[#666666] border border-[#e8e6e1] px-2.5 py-1 rounded-full hover:border-[#9b8b73] hover:text-[#555555] transition-all bg-white">
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === "bewertungen" && (
              <div className="space-y-4">
                {parfum.bewertungen.length > 0 ? parfum.bewertungen.map(bew => (
                  <div key={bew.id} className="border border-[#e8e6e1] rounded-xl p-5 bg-white">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#ede9e3] flex items-center justify-center text-sm font-semibold text-[#8b7355]">
                          {bew.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#111111]">{bew.nutzername}</p>
                          <p className="text-xs text-[#aaaaaa]">{new Date(bew.datum).toLocaleDateString("de-DE")}</p>
                        </div>
                      </div>
                      <StarRating rating={bew.sterne} size="xs" />
                    </div>
                    <p className="text-sm text-[#555555] leading-relaxed mb-3">{bew.kommentar}</p>
                    <div className="flex items-center gap-4 pt-3 border-t border-[#f5f4f1]">
                      <span className="text-xs text-[#aaaaaa] flex items-center gap-1"><Clock className="w-3 h-3" /> Haltbarkeit: {bew.haltbarkeit}/10</span>
                      <span className="text-xs text-[#aaaaaa] flex items-center gap-1"><Wind className="w-3 h-3" /> Sillage: {bew.sillage}/10</span>
                      <button className="ml-auto text-xs text-[#aaaaaa] hover:text-[#555555] flex items-center gap-1 transition-colors">
                        <ThumbsUp className="w-3 h-3" /> {bew.helpful} hilfreich
                      </button>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-14 border border-[#e8e6e1] rounded-xl">
                    <p className="text-3xl mb-3">⭐</p>
                    <p className="text-sm text-[#888888]">Noch keine Bewertungen</p>
                  </div>
                )}
              </div>
            )}

            {tab === "dupes" && (
              <div>
                <div className="bg-[#faf9f7] border border-[#e8e6e1] rounded-xl p-4 mb-5">
                  <p className="text-xs font-semibold text-[#9b8b73] mb-1">Was sind Dupes?</p>
                  <p className="text-sm text-[#666666]">Günstigere Parfums, die einem Original ähneln – ideale Alternativen zum kleinen Preis.</p>
                </div>
                {dupes.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">{dupes.map(d => <PerfumeCard key={d.id} parfum={d} />)}</div>
                ) : (
                  <div className="text-center py-14 border border-[#e8e6e1] rounded-xl">
                    <p className="text-sm text-[#888888]">Noch keine bekannten Dupes</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Kaufbox */}
            <div className="border border-[#e8e6e1] rounded-xl p-5 bg-white sticky top-20">
              <p className="text-xs text-[#aaaaaa] mb-1">Preis ab</p>
              <p className="text-2xl font-semibold text-[#111111] mb-1">{parfum.preisVon}€</p>
              <p className="text-xs text-[#aaaaaa] mb-4">bei {parfum.kaufLinks[0]?.shop}</p>

              <div className="space-y-2 mb-4">
                {parfum.kaufLinks.map(link => (
                  <a key={link.shop} href={link.url}
                    className="flex items-center justify-between px-3.5 py-2.5 border border-[#e8e6e1] rounded-lg hover:border-[#c4b8a4] transition-all group bg-[#faf9f7]">
                    <span className="text-sm font-medium text-[#333333]">{link.shop}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#111111]">{link.preis}€</span>
                      <ShoppingBag className="w-3.5 h-3.5 text-[#aaaaaa] group-hover:text-[#555555] transition-colors" />
                    </div>
                  </a>
                ))}
              </div>

              <p className="text-[10px] text-[#cccccc] mb-3">* Affiliate-Links</p>

              <div className="flex gap-2">
                <button onClick={() => setLiked(!liked)} className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium border border-[#e8e6e1] py-2 rounded-lg hover:border-[#c4c0bb] hover:bg-[#faf9f7] transition-all">
                  <Heart className={cn("w-3.5 h-3.5", liked && "fill-rose-500 text-rose-500")} />
                  Merken
                </button>
                <button onClick={() => setSaved(!saved)} className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium border border-[#e8e6e1] py-2 rounded-lg hover:border-[#c4c0bb] hover:bg-[#faf9f7] transition-all">
                  <BookmarkPlus className="w-3.5 h-3.5" />
                  Sammlung
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar */}
        {aehnliche.length > 0 && (
          <div className="mt-14">
            <h2 className="text-xl font-serif font-medium text-[#111111] mb-6">Ähnliche Düfte</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {aehnliche.map(d => <PerfumeCard key={d.id} parfum={d} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
