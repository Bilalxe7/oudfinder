import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { parfums } from "@/lib/data/perfumes";
import { StarRating } from "@/components/ui/StarRating";
import { imageFor } from "@/lib/perfume-image";

export function DuftDesMonats() {
  // Editor-curated highlight — Tom Ford Tobacco Vanille
  const duft = parfums.find((p) => p.slug === "tobacco-vanille") ?? parfums[1];

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 bg-[#faf8f4] border-t border-[#ece9e3]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-0 rounded-[28px] overflow-hidden border border-[#ece9e3] bg-white shadow-[0_8px_32px_rgba(20,16,8,0.06)]">
          {/* Image — full height */}
          <div className="relative min-h-[320px] md:min-h-[520px] overflow-hidden">
            <img
              src={imageFor(duft, "banner")}
              alt={`${duft.marke} ${duft.name}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-5 left-5">
              <span className="text-[10px] font-semibold text-[#5a4d3a] bg-white/90 backdrop-blur-sm border border-white/60 px-2.5 py-1 rounded-full tracking-[0.12em] uppercase">
                Redaktionsempfehlung
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center">
            <p className="text-[10px] font-semibold text-[#9b8b73] uppercase tracking-[0.18em] mb-4">
              Duft des Monats
            </p>
            <p className="text-xs font-semibold text-[#9b8b73] uppercase tracking-[0.14em] mb-2">
              {duft.marke}
            </p>
            <h3 className="text-3xl md:text-[2.4rem] font-serif font-medium text-[#111111] mb-4 leading-[1.1]">
              {duft.name}
            </h3>

            <StarRating
              rating={duft.gesamtBewertung}
              size="sm"
              showNumber
              count={duft.bewertungsAnzahl}
              className="mb-6"
            />

            <p className="text-[15px] text-[#5a554d] leading-relaxed mb-7 max-w-md">
              {duft.kurzBeschreibung}. {duft.beschreibung.split(". ")[0]}.
            </p>

            {/* Fragrance notes */}
            <div className="flex flex-wrap gap-1.5 mb-8">
              {duft.noten.slice(0, 6).map((n) => (
                <span
                  key={n.name}
                  className="text-xs text-[#5a554d] bg-[#f5f3ed] border border-[#ece9e3] px-2.5 py-1 rounded-full"
                >
                  {n.name}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link
                href={`/duft/${duft.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111111] text-white text-sm font-medium rounded-xl hover:bg-[#2a2a2a] transition-colors group"
              >
                Rezension lesen
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <span className="text-sm text-[#9b9389] tabular-nums">
                ab {duft.preisVon}€
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
