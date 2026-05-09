"use client";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X, SlidersHorizontal, ChevronDown } from "lucide-react";
import {
  parfums,
  duftfamilien,
  Parfum,
  getTrendingParfums,
} from "@/lib/data/perfumes";
import { PerfumeCard } from "@/components/perfume/PerfumeCard";
import { cn } from "@/lib/utils";

// ─────────────────── Filter option metadata ───────────────────
type Geschlecht = "" | "damen" | "herren" | "unisex";
type Anlass = "" | "alltag" | "abend" | "buero" | "date" | "sport" | "besonder";
type Preis = "" | "budget" | "mittel" | "premium" | "luxus";
type Jahreszeit = "fruehling" | "sommer" | "herbst" | "winter";
type SortKey =
  | "beliebt"
  | "bewertung"
  | "neu"
  | "preis-asc"
  | "preis-desc";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "beliebt", label: "Trending" },
  { value: "bewertung", label: "Beste Bewertung" },
  { value: "neu", label: "Neueste" },
  { value: "preis-asc", label: "Preis aufsteigend" },
  { value: "preis-desc", label: "Preis absteigend" },
];

const geschlechtOptions: { value: Geschlecht; label: string }[] = [
  { value: "", label: "Alle" },
  { value: "damen", label: "Damen" },
  { value: "herren", label: "Herren" },
  { value: "unisex", label: "Unisex" },
];

const anlassOptions: { value: Anlass; label: string }[] = [
  { value: "", label: "Alle" },
  { value: "alltag", label: "Alltag" },
  { value: "buero", label: "Büro" },
  { value: "date", label: "Date" },
  { value: "abend", label: "Abend" },
  { value: "sport", label: "Sport" },
  { value: "besonder", label: "Besondere Anlässe" },
];

const preisOptions: { value: Preis; label: string }[] = [
  { value: "", label: "Alle Preise" },
  { value: "budget", label: "Bis 50 €" },
  { value: "mittel", label: "50–100 €" },
  { value: "premium", label: "100–250 €" },
  { value: "luxus", label: "250 € +" },
];

const jahreszeitOptions: { value: Jahreszeit; label: string }[] = [
  { value: "fruehling", label: "Frühling" },
  { value: "sommer", label: "Sommer" },
  { value: "herbst", label: "Herbst" },
  { value: "winter", label: "Winter" },
];

// ─────────────────── Skeleton card ───────────────────
function SkeletonCard() {
  return (
    <div className="bg-white border border-[#ece9e3] rounded-2xl overflow-hidden">
      <div
        className="aspect-[3/4] bg-gradient-to-br from-[#f4f1ea] to-[#e8e3d9] animate-pulse"
        aria-hidden
      />
      <div className="p-3.5 sm:p-4 space-y-2.5">
        <div className="h-2.5 w-1/3 rounded-full bg-[#ece9e3] animate-pulse" />
        <div className="h-3.5 w-2/3 rounded-full bg-[#ece9e3] animate-pulse" />
        <div className="pt-2.5 border-t border-[#f4f2ed] flex justify-between">
          <div className="h-3 w-16 rounded-full bg-[#f0ece5] animate-pulse" />
          <div className="h-3 w-10 rounded-full bg-[#f0ece5] animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

// ─────────────────── Filter button ───────────────────
function FilterPill({
  active,
  onClick,
  label,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "text-xs px-3 py-1.5 rounded-full border transition-all whitespace-nowrap",
        active
          ? "bg-[#111111] text-white border-[#111111]"
          : "bg-white text-[#5a554d] border-[#e4e0d7] hover:border-[#9b8b73] hover:text-[#111111]",
      )}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {label}
    </button>
  );
}

// ─────────────────── Section helper ───────────────────
function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold text-[#9b8b73] uppercase tracking-[0.16em] mb-2.5">
        {title}
      </p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

// ─────────────────── Page ───────────────────
export function EntdeckenClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Parse initial state from URL
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [sortBy, setSortBy] = useState<SortKey>(
    () => (searchParams.get("sort") as SortKey) || "beliebt",
  );
  const [familie, setFamilie] = useState(
    () => searchParams.get("familie") ?? "",
  );
  const [geschlecht, setGeschlecht] = useState<Geschlecht>(
    () => (searchParams.get("geschlecht") as Geschlecht) || "",
  );
  const [anlass, setAnlass] = useState<Anlass>(
    () => (searchParams.get("anlass") as Anlass) || "",
  );
  const [preis, setPreis] = useState<Preis>(
    () => (searchParams.get("preis") as Preis) || "",
  );
  const [selectedJahreszeiten, setSelectedJahreszeiten] = useState<Jahreszeit[]>(
    () => {
      const raw = searchParams.get("jahreszeit");
      if (!raw) return [];
      return raw
        .split(",")
        .filter((j): j is Jahreszeit =>
          ["fruehling", "sommer", "herbst", "winter"].includes(j),
        );
    },
  );
  const [filtersOpen, setFiltersOpen] = useState(false);

  // First-mount loading state — shows skeleton grid for a frame
  // so users get visual feedback that data is being prepared.
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setIsInitialLoading(false), 250);
    return () => clearTimeout(t);
  }, []);

  // Sync state → URL (so links are shareable, back/forward works)
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (sortBy !== "beliebt") params.set("sort", sortBy);
    if (familie) params.set("familie", familie);
    if (geschlecht) params.set("geschlecht", geschlecht);
    if (anlass) params.set("anlass", anlass);
    if (preis) params.set("preis", preis);
    if (selectedJahreszeiten.length)
      params.set("jahreszeit", selectedJahreszeiten.join(","));

    const qs = params.toString();
    const url = qs ? `${pathname}?${qs}` : pathname;
    // replace (not push) so the browser history isn't polluted by typing
    router.replace(url, { scroll: false });
  }, [
    query,
    sortBy,
    familie,
    geschlecht,
    anlass,
    preis,
    selectedJahreszeiten,
    pathname,
    router,
  ]);

  const toggleJahreszeit = (j: Jahreszeit) =>
    setSelectedJahreszeiten((prev) =>
      prev.includes(j) ? prev.filter((x) => x !== j) : [...prev, j],
    );

  const filtered = useMemo<Parfum[]>(() => {
    let result = [...parfums];

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.marke.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q)) ||
          p.duftfamilie.toLowerCase().includes(q) ||
          p.noten.some((n) => n.name.toLowerCase().includes(q)),
      );
    }
    if (familie) {
      const f = familie.toLowerCase();
      result = result.filter((p) => p.duftfamilie.toLowerCase().includes(f));
    }
    if (geschlecht) result = result.filter((p) => p.geschlecht === geschlecht);
    if (anlass) result = result.filter((p) => p.anlaesse.includes(anlass));
    if (preis) result = result.filter((p) => p.preisRange === preis);
    if (selectedJahreszeiten.length > 0) {
      result = result.filter((p) =>
        selectedJahreszeiten.some((j) => p.jahreszeiten.includes(j)),
      );
    }

    switch (sortBy) {
      case "bewertung":
        result.sort((a, b) => b.gesamtBewertung - a.gesamtBewertung);
        break;
      case "neu":
        result.sort((a, b) => b.jahr - a.jahr);
        break;
      case "preis-asc":
        result.sort((a, b) => a.preisVon - b.preisVon);
        break;
      case "preis-desc":
        result.sort((a, b) => b.preisVon - a.preisVon);
        break;
      default:
        result.sort((a, b) => b.bewertungsAnzahl - a.bewertungsAnzahl);
    }
    return result;
  }, [query, sortBy, familie, geschlecht, anlass, preis, selectedJahreszeiten]);

  // Active filter chips for visibility above the grid
  type Chip = { key: string; label: string; remove: () => void };
  const activeChips: Chip[] = useMemo(() => {
    const chips: Chip[] = [];
    if (familie) {
      const fam = duftfamilien.find((f) => f.id === familie);
      chips.push({
        key: "familie",
        label: fam ? `${fam.icon} ${fam.name}` : familie,
        remove: () => setFamilie(""),
      });
    }
    if (geschlecht)
      chips.push({
        key: "geschlecht",
        label:
          geschlechtOptions.find((g) => g.value === geschlecht)?.label ??
          geschlecht,
        remove: () => setGeschlecht(""),
      });
    if (anlass)
      chips.push({
        key: "anlass",
        label:
          anlassOptions.find((a) => a.value === anlass)?.label ?? anlass,
        remove: () => setAnlass(""),
      });
    if (preis)
      chips.push({
        key: "preis",
        label: preisOptions.find((p) => p.value === preis)?.label ?? preis,
        remove: () => setPreis(""),
      });
    selectedJahreszeiten.forEach((j) => {
      const opt = jahreszeitOptions.find((x) => x.value === j);
      chips.push({
        key: `jz-${j}`,
        label: opt?.label ?? j,
        remove: () => toggleJahreszeit(j),
      });
    });
    return chips;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [familie, geschlecht, anlass, preis, selectedJahreszeiten]);

  const hasActiveFilters = activeChips.length > 0;

  const resetAll = () => {
    setQuery("");
    setFamilie("");
    setGeschlecht("");
    setAnlass("");
    setPreis("");
    setSelectedJahreszeiten([]);
    setSortBy("beliebt");
  };

  // Suggestions when no results: top trending, fallback to top rated
  const suggestions = useMemo(() => {
    const trending = getTrendingParfums().slice(0, 6);
    if (trending.length >= 6) return trending;
    return [...parfums]
      .sort((a, b) => b.gesamtBewertung - a.gesamtBewertung)
      .slice(0, 6);
  }, []);

  // ─────────────────────────── Render ───────────────────────────
  return (
    <div className="min-h-screen bg-white pb-24 md:pb-12" style={{ paddingTop: "4rem" }}>
      {/* Page header */}
      <div className="border-b border-[#ece9e3] bg-[#faf8f4] px-4 sm:px-6 py-8 md:py-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] font-semibold text-[#9b8b73] uppercase tracking-[0.18em] mb-2">
            Katalog
          </p>
          <h1 className="text-3xl md:text-[2.4rem] font-serif font-medium text-[#111111] tracking-tight mb-2 leading-[1.1]">
            Düfte entdecken
          </h1>
          <p className="text-sm text-[#7a756d]">
            {isInitialLoading ? (
              <span className="inline-block h-3 w-32 rounded-full bg-[#ece9e3] animate-pulse" />
            ) : (
              <>
                {filtered.length}{" "}
                {filtered.length === 1 ? "Duft" : "Düfte"}
                {query ? <> für „{query}"</> : null}
              </>
            )}
          </p>
        </div>
      </div>

      {/* Sticky toolbar */}
      <div className="sticky top-16 z-20 bg-white/95 backdrop-blur-sm border-b border-[#ece9e3] px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2.5 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-[180px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#b8b0a4]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Duft, Marke, Note …"
              className="w-full pl-9 pr-8 py-2 text-sm border border-[#e4e0d7] rounded-lg bg-white placeholder-[#b8b0a4] text-[#111111] focus:outline-none focus:border-[#111111] transition-colors"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Suche leeren"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#b8b0a4] hover:text-[#3a3530]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="appearance-none pl-3 pr-8 py-2 text-sm border border-[#e4e0d7] rounded-lg bg-white text-[#3a3530] focus:outline-none focus:border-[#111111] cursor-pointer"
              aria-label="Sortierung"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#b8b0a4] pointer-events-none" />
          </div>

          {/* Filter toggle */}
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            className={cn(
              "flex items-center gap-2 text-sm px-3.5 py-2 border rounded-lg transition-all",
              filtersOpen || hasActiveFilters
                ? "bg-[#111111] text-white border-[#111111]"
                : "bg-white text-[#3a3530] border-[#e4e0d7] hover:border-[#9b8b73]",
            )}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filter
            {hasActiveFilters && (
              <span className="text-[10px] font-semibold rounded-full bg-white text-[#111111] px-1.5 py-px tabular-nums">
                {activeChips.length}
              </span>
            )}
          </button>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetAll}
              className="text-xs text-[#9b9389] hover:text-[#3a3530] flex items-center gap-1 transition-colors"
            >
              <X className="w-3 h-3" /> Zurücksetzen
            </button>
          )}
        </div>

        {/* Filter panel */}
        {filtersOpen && (
          <div className="max-w-7xl mx-auto mt-4 pt-4 border-t border-[#f4f2ed]">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
              <FilterSection title="Duftfamilie">
                <FilterPill
                  active={familie === ""}
                  onClick={() => setFamilie("")}
                  label="Alle"
                />
                {duftfamilien.map((f) => (
                  <FilterPill
                    key={f.id}
                    active={familie === f.id}
                    onClick={() => setFamilie(familie === f.id ? "" : f.id)}
                    label={f.name}
                    icon={f.icon}
                  />
                ))}
              </FilterSection>

              <FilterSection title="Geschlecht">
                {geschlechtOptions.map((g) => (
                  <FilterPill
                    key={g.value || "all-g"}
                    active={geschlecht === g.value}
                    onClick={() => setGeschlecht(g.value)}
                    label={g.label}
                  />
                ))}
              </FilterSection>

              <FilterSection title="Anlass">
                {anlassOptions.map((a) => (
                  <FilterPill
                    key={a.value || "all-a"}
                    active={anlass === a.value}
                    onClick={() => setAnlass(a.value)}
                    label={a.label}
                  />
                ))}
              </FilterSection>

              <FilterSection title="Jahreszeit">
                {jahreszeitOptions.map((j) => (
                  <FilterPill
                    key={j.value}
                    active={selectedJahreszeiten.includes(j.value)}
                    onClick={() => toggleJahreszeit(j.value)}
                    label={j.label}
                  />
                ))}
              </FilterSection>

              <FilterSection title="Preisspanne">
                {preisOptions.map((p) => (
                  <FilterPill
                    key={p.value || "all-p"}
                    active={preis === p.value}
                    onClick={() => setPreis(p.value)}
                    label={p.label}
                  />
                ))}
              </FilterSection>
            </div>
          </div>
        )}
      </div>

      {/* Active filter chips */}
      {hasActiveFilters && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 -mb-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold text-[#9b8b73] uppercase tracking-[0.14em] mr-1">
              Aktiv:
            </span>
            {activeChips.map((chip) => (
              <button
                key={chip.key}
                type="button"
                onClick={chip.remove}
                className="inline-flex items-center gap-1.5 text-xs text-[#3a3530] bg-[#f5f3ed] border border-[#ece9e3] hover:border-[#9b8b73] hover:bg-white px-2.5 py-1 rounded-full transition-all group"
                aria-label={`Filter „${chip.label}" entfernen`}
              >
                <span>{chip.label}</span>
                <X className="w-3 h-3 text-[#b8b0a4] group-hover:text-[#3a3530]" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results / Skeleton / Empty */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {isInitialLoading ? (
          <SkeletonGrid />
        ) : filtered.length === 0 ? (
          <NoResults
            query={query}
            onReset={resetAll}
            suggestions={suggestions}
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
            {filtered.map((parfum) => (
              <PerfumeCard key={parfum.id} parfum={parfum} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────── No-results state ───────────────────
function NoResults({
  query,
  onReset,
  suggestions,
}: {
  query: string;
  onReset: () => void;
  suggestions: Parfum[];
}) {
  return (
    <div className="space-y-12">
      <div className="text-center pt-8 pb-2">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#f5f3ed] border border-[#ece9e3] mb-5">
          <Search className="w-5 h-5 text-[#9b8b73]" />
        </div>
        <h3 className="text-xl font-serif font-medium text-[#111111] mb-2">
          Keine Düfte gefunden
        </h3>
        <p className="text-sm text-[#7a756d] max-w-md mx-auto mb-6">
          {query ? (
            <>
              Für „<span className="font-medium text-[#3a3530]">{query}</span>"
              haben wir leider keine passenden Düfte. Probiere andere Begriffe
              oder lockere die Filter.
            </>
          ) : (
            <>
              Mit deiner Filter-Kombination haben wir nichts gefunden. Setze
              einzelne Filter zurück oder starte neu.
            </>
          )}
        </p>
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-medium text-white bg-[#111111] hover:bg-[#2a2a2a] px-5 py-2.5 rounded-xl transition-colors"
        >
          Alle Filter zurücksetzen
        </button>
      </div>

      <div>
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="text-[10px] font-semibold text-[#9b8b73] uppercase tracking-[0.16em] mb-1">
              Vielleicht stattdessen
            </p>
            <h4 className="text-lg font-serif font-medium text-[#111111]">
              Beliebte Düfte aus dem Katalog
            </h4>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {suggestions.map((parfum) => (
            <PerfumeCard key={parfum.id} parfum={parfum} variant="compact" />
          ))}
        </div>
      </div>
    </div>
  );
}
