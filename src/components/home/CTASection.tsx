import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-14 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#111111] rounded-2xl px-8 py-12 md:py-16 text-center">
          <p className="text-[11px] font-semibold text-[#9b8b73] uppercase tracking-widest mb-4">
            Kostenlos · Kein Abo
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-white mb-4 leading-snug">
            Werde Teil der Community
          </h2>
          <p className="text-sm text-[#888888] mb-8 max-w-lg mx-auto leading-relaxed">
            Registriere dich kostenlos, baue deine persönliche Duftsammlung auf und erhalte KI-gestützte Empfehlungen – auf immer gratis.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/registrieren"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#111111] text-sm font-semibold rounded-xl hover:bg-[#f5f4f1] transition-colors group"
            >
              Jetzt kostenlos registrieren
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/entdecken"
              className="inline-flex items-center justify-center px-6 py-3 border border-[#333333] text-[#888888] text-sm font-medium rounded-xl hover:border-[#555555] hover:text-white transition-all"
            >
              Erst stöbern
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
