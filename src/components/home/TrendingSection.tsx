import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTrendingParfums } from "@/lib/data/perfumes";
import { PerfumeCard } from "@/components/perfume/PerfumeCard";

export function TrendingSection() {
  // Show top 8 on homepage. "Alle ansehen" link routes to /trending for the full list.
  const trending = getTrendingParfums().slice(0, 8);

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 border-t border-[#ece9e3]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <div>
            <p className="text-[10px] font-semibold text-[#9b8b73] uppercase tracking-[0.18em] mb-2">
              Diese Woche beliebt
            </p>
            <h2 className="text-2xl md:text-3xl font-serif font-medium text-[#111111] tracking-tight">
              Trending Düfte
            </h2>
          </div>
          <Link
            href="/trending"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[#7a756d] hover:text-[#111111] transition-colors group"
          >
            Alle ansehen
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {trending.map((parfum) => (
            <PerfumeCard key={parfum.id} parfum={parfum} />
          ))}
        </div>

        <div className="mt-8 sm:hidden text-center">
          <Link
            href="/trending"
            className="text-sm font-medium text-[#3a3530] hover:text-[#111111] inline-flex items-center gap-1.5 transition-colors"
          >
            Alle ansehen <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
