import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export function AISection() {
  return (
    <section className="py-20 px-4 sm:px-6 border-t border-[#f0ede8]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left */}
          <div>
            <p className="text-[10px] font-semibold text-[#9b8b73] uppercase tracking-[0.15em] mb-4">
              KI-Berater
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#111111] mb-5 leading-[1.15]">
              Dein persönlicher
              <br />Duft-Berater
            </h2>
            <p className="text-[15px] text-[#666666] leading-relaxed mb-8 max-w-sm">
              Beschreibe Stimmung, Anlass oder Lieblingsparfums – der KI-Berater findet Düfte, die wirklich zu dir passen. Kostenlos und sofort.
            </p>
            <div className="flex items-center gap-3">
              <Link href="/ki-berater" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111111] text-white text-sm font-medium rounded-xl hover:bg-[#2a2a2a] transition-colors group">
                <Sparkles className="w-4 h-4" />
                KI-Chat öffnen
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/ki-berater/quiz" className="text-sm font-medium text-[#555555] hover:text-[#111111] transition-colors inline-flex items-center gap-1 group">
                Duft-Quiz starten
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right: Chat Preview */}
          <div className="bg-white rounded-3xl border border-[#e8e6e1] shadow-[0_8px_40px_rgba(0,0,0,0.07)] overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[#f0ede8]">
              <div className="w-8 h-8 rounded-xl bg-[#111111] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#111111]">oudfinder KI</p>
                <p className="text-xs text-[#22c55e] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] inline-block" />
                  Online
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="p-5 space-y-4 min-h-[200px]">
              <div className="flex justify-end">
                <div className="max-w-[78%] bg-[#111111] rounded-2xl rounded-tr-sm px-4 py-3 text-sm text-white leading-relaxed">
                  Ich suche einen warmen Winterduft für romantische Abende.
                </div>
              </div>
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#111111] flex-shrink-0 flex items-center justify-center mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="max-w-[85%] bg-[#faf9f7] border border-[#f0ede8] rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-[#333333] leading-relaxed">
                  Perfekt! Ich empfehle <strong className="text-[#111111]">Tom Ford Black Orchid</strong> – dunkel, sinnlich, sehr langlebig. Oder <strong className="text-[#111111]">Baccarat Rouge 540</strong> – warm, ikonisch, unvergesslich.
                </div>
              </div>
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#111111] flex-shrink-0 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-[#faf9f7] border border-[#f0ede8] rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1">
                    {[0,1,2].map(i => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#cccccc] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="px-5 pb-5">
              <Link href="/ki-berater" className="flex items-center justify-between w-full border border-[#e8e6e1] rounded-xl px-4 py-3 text-sm text-[#bbbbbb] hover:border-[#c4c0bb] hover:text-[#888888] transition-all bg-[#faf9f7] group">
                <span>Schreibe eine Nachricht...</span>
                <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
