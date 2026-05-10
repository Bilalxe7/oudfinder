"use client";
import Link from "next/link";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { parfums } from "@/lib/data/perfumes";
import { StarRating } from "@/components/ui/StarRating";
import { imageFor } from "@/lib/perfume-image";
import { PerfumeImage } from "@/components/perfume/PerfumeImage";

const suggestions = ["Oud", "Tom Ford", "Frisch", "Vanille", "Rose", "Sommer"];

export function HeroSection() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof parfums>([]);
  const router = useRouter();

  const featured =
    parfums.find((p) => p.slug === "baccarat-rouge-540") ?? parfums[0];

  const handleChange = (v: string) => {
    setQuery(v);
    if (v.length > 1) {
      const q = v.toLowerCase();
      setResults(
        parfums
          .filter(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              p.marke.toLowerCase().includes(q),
          )
          .slice(0, 5),
      );
    } else {
      setResults([]);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/entdecken?q=${encodeURIComponent(query)}`);
  };

  return (
    <section
      className="w-full overflow-hidden"
      style={{ paddingTop: "4rem" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex flex-col md:flex-row md:items-center md:gap-14 lg:gap-20"
          style={{ padding: "2rem 0 3rem" }}
        >
          {/* ───────── Left: editorial copy ───────── */}
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold text-[#9b8b73] uppercase tracking-[0.18em] mb-5">
              Parfum entdecken &amp; vergleichen
            </p>

            <h1 className="font-serif text-[#111111] tracking-tight mb-5 font-medium">
              <span className="block text-[2rem] sm:text-5xl lg:text-[3.4rem] leading-[1.05]">
                Finde den Duft,
              </span>
              <span className="block text-[2rem] sm:text-5xl lg:text-[3.4rem] leading-[1.05] text-[#a8a098] italic">
                der zu dir gehört
              </span>
            </h1>

            <p className="text-[15px] text-[#7a756d] mb-7 leading-relaxed max-w-md">
              Kuratierte Parfum-Datenbank, ehrliche Redaktion und ein
              KI-Berater, der zu dir passende Düfte vorschlägt — kostenlos.
            </p>

            {/* ───── Search ───── */}
            <div className="relative mb-5 max-w-xl">
              <form onSubmit={submit}>
                <div className="flex items-center bg-white border border-[#d8d2c8] rounded-2xl shadow-[0_2px_12px_rgba(20,16,8,0.05)] hover:border-[#b5ada1] focus-within:border-[#111111] focus-within:shadow-[0_4px_20px_rgba(20,16,8,0.10)] transition-all duration-200">
                  <Search className="w-4 h-4 text-[#b8b0a4] ml-4 flex-shrink-0" />
                  <input
                    value={query}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder="Duft, Marke oder Duftnote …"
                    className="flex-1 min-w-0 text-sm text-[#111111] placeholder-[#b8b0a4] px-3 py-3.5 bg-transparent focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="mr-1.5 px-5 py-2 bg-[#111111] text-white text-sm font-medium rounded-xl hover:bg-[#2a2a2a] transition-colors flex-shrink-0"
                  >
                    Suchen
                  </button>
                </div>
              </form>

              {results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#ece9e3] rounded-2xl shadow-[0_8px_32px_rgba(20,16,8,0.10)] overflow-hidden z-30">
                  {results.map((p) => (
                    <Link
                      key={p.id}
                      href={`/duft/${p.slug}`}
                      onClick={() => {
                        setQuery("");
                        setResults([]);
                      }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-[#faf8f4] transition-colors border-b border-[#f4f2ed] last:border-0"
                    >
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#f5f4f1] flex-shrink-0">
                        <img
                          src={imageFor(p)}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-[#111111] truncate">
                          {p.name}
                        </p>
                        <p className="text-xs text-[#9b8b73]">
                          {p.marke} · {p.duftfamilie}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-[#111111] flex-shrink-0 tabular-nums">
                        {p.preisVon}€
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* ───── Quick tags ───── */}
            <div className="flex flex-wrap gap-2 mb-7 max-w-xl">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() =>
                    router.push(`/entdecken?q=${encodeURIComponent(s)}`)
                  }
                  className="text-xs text-[#7a756d] border border-[#e4e0d7] px-3 py-1.5 rounded-full hover:border-[#9b8b73] hover:text-[#3a3530] transition-all bg-white"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* ───── Trust strip ───── */}
            <div className="flex flex-wrap items-center gap-x-7 gap-y-1.5 text-sm border-t border-[#ece9e3] pt-5 max-w-xl">
              <span>
                <span className="font-semibold text-[#111111]">Redaktionell kuratiert</span>
              </span>
              <span>
                <span className="font-semibold text-[#111111]">KI-Empfehlungen</span>
              </span>
              <span className="font-semibold text-[#9b8b73]">
                100 % kostenlos
              </span>
            </div>
          </div>

          {/* ───────── Right: featured perfume image (desktop only) ───────── */}
          <div className="hidden md:block flex-shrink-0 w-[340px] lg:w-[400px] xl:w-[440px]">
            <div className="relative">
              <Link href={`/duft/${featured.slug}`} className="block">
                <div
                  className="relative rounded-[28px] overflow-hidden group cursor-pointer shadow-[0_20px_60px_rgba(20,16,8,0.14)]"
                  style={{ height: "520px" }}
                >
                  <PerfumeImage
                    parfum={featured}
                    scale="banner"
                    priority
                    sizes="(min-width: 1280px) 440px, (min-width: 1024px) 400px, 340px"
                    className="group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                  <div className="absolute top-5 left-5">
                    <span className="text-[10px] font-semibold text-white bg-white/15 backdrop-blur-md border border-white/25 px-2.5 py-1 rounded-full tracking-wide">
                      Ikone der Saison
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-[10px] font-semibold text-white/70 uppercase tracking-[0.16em] mb-1">
                      {featured.marke}
                    </p>
                    <p className="text-2xl font-serif font-medium text-white mb-3 leading-tight">
                      {featured.name}
                    </p>
                    <div className="flex items-center justify-between">
                      <StarRating
                        rating={featured.gesamtBewertung}
                        size="sm"
                        showNumber
                      />
                      <span className="text-sm font-semibold text-white tabular-nums">
                        ab {featured.preisVon}€
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Floating KI card */}
              <div className="absolute -left-8 bottom-20 bg-white rounded-2xl shadow-[0_10px_32px_rgba(20,16,8,0.14)] border border-[#ece9e3] p-3.5 w-48">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#111111] flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#111111]">
                      KI-Berater
                    </p>
                    <p className="text-[10px] text-[#22c55e] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] inline-block" />
                      Jetzt verfügbar
                    </p>
                  </div>
                </div>
                <Link
                  href="/ki-berater"
                  className="flex items-center justify-between text-xs font-medium text-[#3a3530] hover:text-[#111111] transition-colors group/link"
                >
                  Chat starten
                  <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
