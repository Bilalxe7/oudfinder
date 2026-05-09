"use client";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X, SlidersHorizontal, ChevronDown } from "lucide-react";
import { parfums, Parfum } from "@/lib/data/perfumes";
import { PerfumeCard } from "@/components/perfume/PerfumeCard";
import { cn } from "@/lib/utils";

const sortOptions = [
  { value: "beliebt", label: "Beliebteste" },
  { value: "bewertung", label: "Beste Bewertung" },
  { value: "neu", label: "Neueste" },
  { value: "preis-asc", label: "Günstigste" },
  { value: "preis-desc", label: "Teuerste" },
];

const geschlechtOptions = ["", "damen", "herren", "unisex"] as const;
const geschlechtLabels: Record<string, string> = { "": "Alle", damen: "Damen", herren: "Herren", unisex: "Unisex" };
const preisOptions = ["", "budget", "mittel", "premium", "luxus"] as const;
const preisLabels: Record<string, string> = { "": "Alle Preise", budget: "Bis 50€", mittel: "50–100€", premium: "100–250€", luxus: "250€+" };
const jahreszeiten = [
  { value: "fruehling", label: "Frühling" },
  { value: "sommer", label: "Sommer" },
  { value: "herbst", label: "Herbst" },
  { value: "winter", label: "Winter" },
];

export function EntdeckenClient() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [sortBy, setSortBy] = useState("beliebt");
  const [geschlecht, setGeschlecht] = useState("");
  const [preis, setPreis] = useState("");
  const [selectedJahreszeiten, setSelectedJahreszeiten] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleJahreszeit = (j: string) =>
    setSelectedJahreszeiten((prev) => prev.includes(j) ? prev.filter((x) => x !== j) : [...prev, j]);

  const filtered = useMemo(() => {
    let result = [...parfums];
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.marke.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q)) || p.duftfamilie.toLowerCase().includes(q) ||
          p.noten.some((n) => n.name.toLowerCase().includes(q))
      );
    }
    if (geschlecht) result = result.filter((p) => p.geschlecht === geschlecht);
    if (preis) result = result.filter((p) => p.preisRange === preis);
    if (selectedJahreszeiten.length > 0) {
      result = result.filter((p) => selectedJahreszeiten.some((j) => p.jahreszeiten.includes(j as Parfum["jahreszeiten"][0])));
    }
    switch (sortBy) {
      case "bewertung": result.sort((a, b) => b.gesamtBewertung - a.gesamtBewertung); break;
      case "neu": result.sort((a, b) => b.jahr - a.jahr); break;
      case "preis-asc": result.sort((a, b) => a.preisVon - b.preisVon); break;
      case "preis-desc": result.sort((a, b) => b.preisVon - a.preisVon); break;
      default: result.sort((a, b) => b.bewertungsAnzahl - a.bewertungsAnzahl);
    }
    return result;
  }, [query, sortBy, geschlecht, preis, selectedJahreszeiten]);

  const hasFilters = !!geschlecht || !!preis || selectedJahreszeiten.length > 0;

  const FilterBtn = ({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) => (
    <button
      onClick={onClick}
      className={cn(
        "text-xs px-3 py-1.5 rounded-lg border transition-all",
        active
          ? "bg-[#111111] text-white border-[#111111]"
          : "bg-white text-[#555555] border-[#e8e6e1] hover:border-[#c4c0bb] hover:text-[#111111]"
      )}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-white pt-14 pb-24 md:pb-8">
      {/* Page Header */}
      <div className="border-b border-[#f0ede8] bg-[#faf9f7] px-4 sm:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-serif font-medium text-[#111111] mb-1">Düfte entdecken</h1>
          <p className="text-sm text-[#888888]">
            {filtered.length} Düfte{query ? ` für „${query}"` : ""}
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-14 z-20 bg-white border-b border-[#e8e6e1] px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#aaaaaa]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Suchen..."
              className="w-full pl-9 pr-8 py-2 text-sm border border-[#e8e6e1] rounded-lg bg-white placeholder-[#aaaaaa] text-[#111111] focus:outline-none focus:border-[#111111] transition-colors"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#aaaaaa] hover:text-[#555555]">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 text-sm border border-[#e8e6e1] rounded-lg bg-white text-[#333333] focus:outline-none focus:border-[#111111] cursor-pointer"
            >
              {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#aaaaaa] pointer-events-none" />
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={cn(
              "flex items-center gap-2 text-sm px-3.5 py-2 border rounded-lg transition-all",
              filtersOpen || hasFilters
                ? "bg-[#111111] text-white border-[#111111]"
                : "bg-white text-[#555555] border-[#e8e6e1] hover:border-[#c4c0bb]"
            )}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filter
            {hasFilters && !filtersOpen && <span className="w-1.5 h-1.5 rounded-full bg-[#9b8b73]" />}
          </button>

          {hasFilters && (
            <button
              onClick={() => { setGeschlecht(""); setPreis(""); setSelectedJahreszeiten([]); }}
              className="text-xs text-[#999999] hover:text-[#555555] flex items-center gap-1 transition-colors"
            >
              <X className="w-3 h-3" /> Zurücksetzen
            </button>
          )}
        </div>

        {/* Filter Panel */}
        {filtersOpen && (
          <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-[#f0ede8]">
            <div className="grid sm:grid-cols-3 gap-5">
              <div>
                <p className="text-[11px] font-semibold text-[#aaaaaa] uppercase tracking-wider mb-2">Geschlecht</p>
                <div className="flex flex-wrap gap-1.5">
                  {geschlechtOptions.map((g) => (
                    <FilterBtn key={g} active={geschlecht === g} onClick={() => setGeschlecht(g)} label={geschlechtLabels[g]} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-[#aaaaaa] uppercase tracking-wider mb-2">Preisklasse</p>
                <div className="flex flex-wrap gap-1.5">
                  {preisOptions.map((p) => (
                    <FilterBtn key={p} active={preis === p} onClick={() => setPreis(p)} label={preisLabels[p]} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-[#aaaaaa] uppercase tracking-wider mb-2">Jahreszeit</p>
                <div className="flex flex-wrap gap-1.5">
                  {jahreszeiten.map((j) => (
                    <FilterBtn key={j.value} active={selectedJahreszeiten.includes(j.value)} onClick={() => toggleJahreszeit(j.value)} label={j.label} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">🔍</p>
            <h3 className="text-lg font-semibold text-[#111111] mb-2">Keine Düfte gefunden</h3>
            <p className="text-sm text-[#888888] mb-5">Versuche andere Begriffe oder setze die Filter zurück</p>
            <button
              onClick={() => { setQuery(""); setGeschlecht(""); setPreis(""); setSelectedJahreszeiten([]); }}
              className="text-sm font-medium text-[#111111] border border-[#d0cdc8] px-4 py-2 rounded-lg hover:bg-[#faf9f7] transition-colors"
            >
              Filter zurücksetzen
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((parfum) => (
              <PerfumeCard key={parfum.id} parfum={parfum} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
