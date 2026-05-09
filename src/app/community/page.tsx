import { Users, TrendingUp, MessageCircle, Heart, Star, Award } from "lucide-react";
import Link from "next/link";
import { parfums } from "@/lib/data/perfumes";
import { imageFor } from "@/lib/perfume-image";

const topNutzer = [
  { name: "LuxuryScents_DE", avatar: "L", bewertungen: 342, follower: 1243, badge: "🏆" },
  { name: "DuftKenner_Berlin", avatar: "D", bewertungen: 287, follower: 892, badge: "⭐" },
  { name: "ParfumAficionado", avatar: "P", bewertungen: 198, follower: 654, badge: "💎" },
  { name: "ModernePerfumistin", avatar: "M", bewertungen: 167, follower: 521, badge: "🌸" },
  { name: "UrbanNomad_HH", avatar: "U", bewertungen: 143, follower: 398, badge: "✨" },
];

const aktivitaet = [
  { nutzer: "LuxuryScents_DE", avatar: "L", aktion: "hat bewertet", duft: "Black Orchid", marke: "Tom Ford", sterne: 5, zeit: "vor 2 Std." },
  { nutzer: "ParfumAficionado", avatar: "P", aktion: "hat zur Sammlung hinzugefügt", duft: "Baccarat Rouge 540", marke: "MFK", sterne: null, zeit: "vor 3 Std." },
  { nutzer: "DuftKenner_Berlin", avatar: "D", aktion: "hat bewertet", duft: "Sauvage", marke: "Dior", sterne: 4, zeit: "vor 5 Std." },
  { nutzer: "ModernePerfumistin", avatar: "M", aktion: "hat eine Rezension geschrieben", duft: "Libre", marke: "YSL", sterne: 5, zeit: "vor 7 Std." },
];

export const metadata = {
  title: "Community",
  description: "Tausche dich mit anderen Duftliebhabern aus, teile Bewertungen und entdecke neue Favoriten.",
};

export default function CommunityPage() {
  const recentReviews = parfums
    .filter((p) => p.bewertungen.length > 0)
    .flatMap((p) => p.bewertungen.map((b) => ({ ...b, parfum: p })));

  return (
    <div className="min-h-screen bg-white pt-20 pb-24 md:pb-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[11px] font-semibold text-[#9b8b73] uppercase tracking-widest mb-2">Mitglieder</p>
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-[#9b8b73]" />
            <h1 className="text-3xl font-serif font-medium text-[#111111]">Duftliebhaber vereint</h1>
          </div>
          <p className="text-sm text-[#888888] max-w-xl">
            Teile Bewertungen, baue deine Sammlung auf und entdecke Düfte durch die Augen anderer Parfum-Enthusiasten.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Users, value: "500.000+", label: "Mitglieder" },
            { icon: Star, value: "2 Mio+", label: "Bewertungen" },
            { icon: MessageCircle, value: "450.000+", label: "Kommentare" },
            { icon: Heart, value: "8 Mio+", label: "Favoriten" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="bg-[#faf9f7] border border-[#e8e6e1] rounded-2xl p-5 text-center">
              <Icon className="w-4 h-4 text-[#9b8b73] mx-auto mb-2" />
              <p className="text-xl font-semibold text-[#111111]">{value}</p>
              <p className="text-xs text-[#888888] mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Activity Feed */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-sm font-semibold text-[#111111] flex items-center gap-2 pb-3 border-b border-[#f0ede8]">
              <TrendingUp className="w-4 h-4 text-[#9b8b73]" />
              Aktuelle Aktivitäten
            </h2>

            {aktivitaet.map((a, i) => (
              <div key={i} className="bg-white border border-[#e8e6e1] rounded-2xl p-4 flex items-center gap-4 hover:shadow-card transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#f0ede8] flex-shrink-0 flex items-center justify-center text-[#8b7355] font-bold text-sm">
                  {a.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#555555]">
                    <span className="font-semibold text-[#111111]">{a.nutzer}</span>
                    {" "}{a.aktion}{" "}
                    <Link href={`/entdecken?q=${a.duft}`} className="text-[#9b8b73] hover:text-[#7d7060] font-medium transition-colors">
                      {a.duft}
                    </Link>
                    <span className="text-[#aaaaaa]"> · {a.marke}</span>
                  </p>
                  {a.sterne && (
                    <div className="flex items-center gap-0.5 mt-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3 h-3 ${s <= a.sterne! ? "text-[#f59e0b] fill-[#f59e0b]" : "text-[#e8e6e1]"}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-xs text-[#aaaaaa] flex-shrink-0">{a.zeit}</span>
              </div>
            ))}

            {/* Latest Reviews */}
            <h2 className="text-sm font-semibold text-[#111111] flex items-center gap-2 pt-4 pb-3 border-b border-[#f0ede8]">
              <MessageCircle className="w-4 h-4 text-[#9b8b73]" />
              Neueste Rezensionen
            </h2>

            {recentReviews.slice(0, 5).map((review) => (
              <div key={review.id} className="bg-white border border-[#e8e6e1] rounded-2xl p-5 hover:shadow-card transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-[#f0ede8] flex items-center justify-center text-[#8b7355] font-bold text-sm flex-shrink-0">
                    {review.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#111111]">{review.nutzername}</p>
                    <p className="text-xs text-[#aaaaaa]">
                      zu{" "}
                      <Link
                        href={`/duft/${review.parfum.slug}`}
                        className="text-[#9b8b73] hover:text-[#7d7060] transition-colors"
                      >
                        {review.parfum.name}
                      </Link>{" "}
                      · {new Date(review.datum).toLocaleDateString("de-DE")}
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3 h-3 ${s <= review.sterne ? "text-[#f59e0b] fill-[#f59e0b]" : "text-[#e8e6e1]"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-[#555555] leading-relaxed">{review.kommentar}</p>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#f0ede8]">
                  <button className="text-xs text-[#aaaaaa] hover:text-[#555555] flex items-center gap-1 transition-colors">
                    <Heart className="w-3 h-3" />
                    {review.helpful} hilfreich
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Nutzer */}
            <div className="bg-white border border-[#e8e6e1] rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-[#111111] flex items-center gap-2 mb-4">
                <Award className="w-4 h-4 text-[#9b8b73]" />
                Top Community-Mitglieder
              </h3>
              <div className="space-y-3">
                {topNutzer.map((nutzer, i) => (
                  <div key={nutzer.name} className="flex items-center gap-3">
                    <span className="text-xs text-[#aaaaaa] w-4 text-right tabular-nums">{i + 1}</span>
                    <div className="w-8 h-8 rounded-xl bg-[#f0ede8] flex items-center justify-center text-[#8b7355] font-bold text-xs flex-shrink-0">
                      {nutzer.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#111111] truncate">
                        {nutzer.badge} {nutzer.name}
                      </p>
                      <p className="text-xs text-[#aaaaaa]">
                        {nutzer.bewertungen} Bewertungen
                      </p>
                    </div>
                    <button className="text-xs font-medium text-[#9b8b73] hover:text-[#7d7060] transition-colors flex-shrink-0">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending diese Woche */}
            <div className="bg-white border border-[#e8e6e1] rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-[#111111] flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-[#9b8b73]" />
                Diese Woche trending
              </h3>
              <div className="space-y-3">
                {parfums.filter((p) => p.trending).slice(0, 4).map((p, i) => (
                  <Link key={p.id} href={`/duft/${p.slug}`}>
                    <div className="flex items-center gap-3 hover:bg-[#faf9f7] rounded-xl p-2 -mx-2 transition-all group">
                      <span className="text-xs font-bold text-[#9b8b73] w-4 tabular-nums">#{i + 1}</span>
                      <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 bg-[#f5f3f0]">
                        <img src={imageFor(p)} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-[#111111] truncate group-hover:text-[#333333]">{p.name}</p>
                        <p className="text-xs text-[#aaaaaa]">{p.marke}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Join CTA */}
            <div className="bg-[#111111] rounded-2xl p-5 text-center">
              <p className="text-2xl mb-3">🌸</p>
              <h3 className="text-sm font-semibold text-white mb-1">Werde Mitglied</h3>
              <p className="text-xs text-white/50 mb-4 leading-relaxed">
                Bewerte Düfte, baue deine Sammlung auf
              </p>
              <Link href="/registrieren">
                <button className="w-full py-2.5 rounded-xl bg-white text-[#111111] text-sm font-medium hover:bg-[#f5f3f0] transition-colors">
                  Kostenlos registrieren
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
