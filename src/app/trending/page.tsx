import { TrendingUp, Flame } from "lucide-react";
import { parfums } from "@/lib/data/perfumes";
import { PerfumeCard } from "@/components/perfume/PerfumeCard";

export const metadata = {
  title: "Trending Düfte",
  description: "Die aktuell beliebtesten Parfums in der oudfinder Community.",
};

export default function TrendingPage() {
  const trending = [...parfums].sort((a, b) => b.bewertungsAnzahl - a.bewertungsAnzahl);

  return (
    <div className="min-h-screen bg-white pt-20 pb-24 md:pb-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[11px] font-semibold text-[#9b8b73] uppercase tracking-widest mb-2">Community</p>
          <div className="flex items-center gap-3 mb-2">
            <Flame className="w-5 h-5 text-[#9b8b73]" />
            <h1 className="text-3xl font-serif font-medium text-[#111111]">Trending Düfte</h1>
          </div>
          <p className="text-sm text-[#888888]">Aktuell am beliebtesten in der oudfinder Community</p>
        </div>

        {/* Top 3 Highlight */}
        <div className="mb-3">
          <p className="text-[11px] font-semibold text-[#9b8b73] uppercase tracking-widest mb-4">Top 3 diese Woche</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {trending.slice(0, 3).map((parfum, i) => (
            <div key={parfum.id} className="relative">
              <div className="absolute -top-3 left-4 z-10">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-md ${
                  i === 0 ? "bg-[#111111] text-white" :
                  i === 1 ? "bg-[#555555] text-white" :
                  "bg-[#9b8b73] text-white"
                }`}>
                  {i + 1}
                </div>
              </div>
              <PerfumeCard parfum={parfum} variant={i === 0 ? "featured" : "default"} />
            </div>
          ))}
        </div>

        {/* Rest */}
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#f0ede8]">
          <TrendingUp className="w-4 h-4 text-[#9b8b73]" />
          <h2 className="text-sm font-semibold text-[#111111]">Alle Trending Düfte</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {trending.slice(3).map((parfum, i) => (
            <div key={parfum.id} className="relative">
              <div className="absolute top-2 left-2 z-10">
                <div className="w-6 h-6 rounded-full bg-white border border-[#e8e6e1] shadow-sm flex items-center justify-center text-[10px] font-bold text-[#888888]">
                  {i + 4}
                </div>
              </div>
              <PerfumeCard parfum={parfum} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
