"use client";
import Link from "next/link";
import { Mail, Lock, User, Check } from "lucide-react";

const vorteile = [
  "Persönliche Duftsammlung verwalten",
  "Bewertungen schreiben & lesen",
  "KI-Empfehlungen erhalten",
  "Community-Features nutzen",
  "Wunschlisten erstellen",
  "Für immer kostenlos",
];

export default function RegistrierenPage() {
  return (
    <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-3xl grid md:grid-cols-2 gap-8 items-start">
        {/* Left */}
        <div className="hidden md:block pt-4">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-xl bg-[#111111] flex items-center justify-center">
              <span className="text-white text-sm font-semibold">o</span>
            </div>
            <span className="font-semibold text-[#111111] text-lg">oudfinder</span>
          </Link>
          <p className="text-[11px] font-semibold text-[#9b8b73] uppercase tracking-widest mb-2">Kostenlos · Für immer</p>
          <h1 className="text-2xl font-serif font-medium text-[#111111] mb-4 leading-snug">
            Starte deine Duft-Reise
          </h1>
          <p className="text-sm text-[#777777] mb-7 leading-relaxed">
            Werde Teil der größten deutschen Parfum-Community und entdecke Düfte, die wirklich zu dir passen.
          </p>
          <div className="space-y-3">
            {vorteile.map(v => (
              <div key={v} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border border-[#d0c8bc] flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-[#9b8b73]" />
                </div>
                <span className="text-sm text-[#555555]">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div>
          <div className="text-center mb-6 md:hidden">
            <h1 className="text-2xl font-serif font-medium text-[#111111] mb-1">Kostenlos registrieren</h1>
            <p className="text-sm text-[#888888]">Starte deine Duft-Reise</p>
          </div>

          <div className="bg-white border border-[#e8e6e1] rounded-2xl p-6 shadow-card space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#555555] mb-1.5">Benutzername</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaaaaa]" />
                <input type="text" placeholder="DeinDuftname"
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-[#e8e6e1] rounded-xl bg-white text-[#111111] placeholder-[#aaaaaa] focus:outline-none focus:border-[#111111] transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#555555] mb-1.5">E-Mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaaaaa]" />
                <input type="email" placeholder="deine@email.de"
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-[#e8e6e1] rounded-xl bg-white text-[#111111] placeholder-[#aaaaaa] focus:outline-none focus:border-[#111111] transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#555555] mb-1.5">Passwort</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaaaaa]" />
                <input type="password" placeholder="Mindestens 8 Zeichen"
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-[#e8e6e1] rounded-xl bg-white text-[#111111] placeholder-[#aaaaaa] focus:outline-none focus:border-[#111111] transition-colors" />
              </div>
            </div>

            <p className="text-xs text-[#aaaaaa]">
              Mit der Registrierung stimmst du den{" "}
              <Link href="/agb" className="text-[#9b8b73] hover:text-[#7d7060]">AGB</Link>
              {" "}und der{" "}
              <Link href="/datenschutz" className="text-[#9b8b73] hover:text-[#7d7060]">Datenschutzerklärung</Link>
              {" "}zu.
            </p>

            <button className="w-full py-2.5 bg-[#111111] text-white text-sm font-medium rounded-xl hover:bg-[#333333] transition-colors">
              Kostenlos registrieren
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#f0ede8]" /></div>
              <div className="relative flex justify-center"><span className="text-xs text-[#aaaaaa] bg-white px-3">oder</span></div>
            </div>

            <button className="w-full py-2.5 bg-white text-[#333333] text-sm font-medium rounded-xl border border-[#e8e6e1] hover:border-[#c4c0bb] hover:bg-[#faf9f7] transition-all flex items-center justify-center gap-2">
              <span className="text-base">G</span> Mit Google registrieren
            </button>
          </div>

          <p className="text-center text-sm text-[#888888] mt-5">
            Bereits Mitglied?{" "}
            <Link href="/anmelden" className="font-medium text-[#111111] hover:text-[#555555] transition-colors">
              Anmelden
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
