import Link from "next/link";
import { BookOpen, Clock, ArrowRight } from "lucide-react";

const artikel = [
  {
    slug: "duftnoten-verstehen",
    titel: "Duftnoten verstehen: Kopf, Herz und Basis",
    beschreibung: "Eine vollständige Anleitung, wie Parfums aufgebaut sind und was Kopf-, Herz- und Basisnoten bedeuten.",
    kategorie: "Grundlagen",
    lesezeit: "5 Min.",
    bild: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80",
    datum: "2025-05-01",
  },
  {
    slug: "parfum-haltbarkeit-steigern",
    titel: "So hält dein Parfum länger – 8 bewährte Tipps",
    beschreibung: "Lerne die besten Tricks, wie du die Haltbarkeit deines Parfums maximierst und den ganzen Tag nach deinem Lieblingsduft riechst.",
    kategorie: "Tipps & Tricks",
    lesezeit: "4 Min.",
    bild: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80",
    datum: "2025-04-25",
  },
  {
    slug: "oud-guide",
    titel: "Der ultimative Oud-Guide: Alles über das flüssige Gold",
    beschreibung: "Was ist Oud? Woher kommt es? Warum ist es so teuer? Und welche Oud-Düfte sind die besten? Alle Antworten hier.",
    kategorie: "Duftfamilien",
    lesezeit: "8 Min.",
    bild: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80",
    datum: "2025-04-18",
  },
  {
    slug: "nische-vs-designer",
    titel: "Nischen-Parfum vs. Designer-Duft: Was ist besser?",
    beschreibung: "Ein ehrlicher Vergleich zwischen Nischenhäusern und großen Designermarken – mit Empfehlungen für jedes Budget.",
    kategorie: "Guide",
    lesezeit: "6 Min.",
    bild: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&q=80",
    datum: "2025-04-10",
  },
  {
    slug: "parfum-fuer-maenner",
    titel: "Die 10 besten Herrenperfums 2025",
    beschreibung: "Von frisch bis intensiv – die absoluten Highlights für Männer in diesem Jahr.",
    kategorie: "Top-Listen",
    lesezeit: "7 Min.",
    bild: "https://images.unsplash.com/photo-1600612253971-f3e8b8b73b3c?w=600&q=80",
    datum: "2025-04-05",
  },
  {
    slug: "sommer-dufte-2025",
    titel: "Die schönsten Sommerdüfte 2025",
    beschreibung: "Frisch, leicht und strahlend – diese Parfums sind perfekt für heiße Sommertage und entspannte Sommerabende.",
    kategorie: "Seasonal",
    lesezeit: "5 Min.",
    bild: "https://images.unsplash.com/photo-1583467875263-d50c6c287660?w=600&q=80",
    datum: "2025-03-28",
  },
];

const kategorien = ["Alle", "Grundlagen", "Tipps & Tricks", "Duftfamilien", "Guide", "Top-Listen", "Seasonal"];

export const metadata = {
  title: "Duft-Ratgeber",
  description: "Guides, Tipps und Hintergrundartikel rund um Parfum und Duftnoten.",
};

export default function RatgeberPage() {
  const hauptArtikel = artikel[0];
  const restArtikel = artikel.slice(1);

  return (
    <div className="min-h-screen bg-white pt-20 pb-24 md:pb-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[11px] font-semibold text-[#9b8b73] uppercase tracking-widest mb-2">Wissen</p>
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-5 h-5 text-[#9b8b73]" />
            <h1 className="text-3xl font-serif font-medium text-[#111111]">Duft-Ratgeber</h1>
          </div>
          <p className="text-sm text-[#888888]">Guides und Tipps für Parfum-Enthusiasten</p>
        </div>

        {/* Kategorien */}
        <div className="flex gap-2 mb-8 scroll-row pb-2">
          {kategorien.map((k, i) => (
            <button
              key={k}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm border transition-all ${
                i === 0
                  ? "bg-[#111111] text-white border-[#111111]"
                  : "border-[#e8e6e1] text-[#555555] hover:border-[#c4c0bb] hover:text-[#111111] bg-white"
              }`}
            >
              {k}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        <Link href={`/ratgeber/${hauptArtikel.slug}`}>
          <div className="relative rounded-2xl overflow-hidden mb-10 border border-[#e8e6e1] group cursor-pointer hover:shadow-card-lg transition-all">
            <div className="h-72 md:h-96 overflow-hidden">
              <img
                src={hauptArtikel.bild}
                alt={hauptArtikel.titel}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/20 text-white backdrop-blur-sm border border-white/20">
                  {hauptArtikel.kategorie}
                </span>
                <span className="text-xs text-white/70 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {hauptArtikel.lesezeit}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-medium text-white mb-2 max-w-2xl">
                {hauptArtikel.titel}
              </h2>
              <p className="text-white/70 text-sm max-w-xl mb-4 hidden md:block">
                {hauptArtikel.beschreibung}
              </p>
              <span className="inline-flex items-center gap-2 text-white text-sm font-medium group/btn">
                Artikel lesen
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </Link>

        {/* Article Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restArtikel.map((a) => (
            <Link key={a.slug} href={`/ratgeber/${a.slug}`}>
              <div className="group bg-white rounded-2xl overflow-hidden border border-[#e8e6e1] hover:shadow-card-lg transition-all hover:-translate-y-0.5">
                <div className="h-44 overflow-hidden bg-[#f5f3f0]">
                  <img
                    src={a.bild}
                    alt={a.titel}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#f5f3f0] text-[#9b8b73] border border-[#e8e6e1]">
                      {a.kategorie}
                    </span>
                    <span className="text-xs text-[#aaaaaa] flex items-center gap-0.5">
                      <Clock className="w-3 h-3" />
                      {a.lesezeit}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-[#111111] leading-snug mb-2 group-hover:text-[#333333]">
                    {a.titel}
                  </h3>
                  <p className="text-xs text-[#888888] line-clamp-2 leading-relaxed">{a.beschreibung}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-[#9b8b73] group-hover:text-[#7d7060] transition-colors">
                    Lesen <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
