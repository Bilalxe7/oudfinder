"use client";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function AnmeldenPage() {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-xl bg-[#111111] flex items-center justify-center">
              <span className="text-white text-sm font-semibold">o</span>
            </div>
            <span className="font-semibold text-[#111111] text-lg">oudfinder</span>
          </Link>
          <h1 className="text-2xl font-serif font-medium text-[#111111] mb-1">Willkommen zurück</h1>
          <p className="text-sm text-[#888888]">Melde dich in deinem Konto an</p>
        </div>

        <div className="bg-white border border-[#e8e6e1] rounded-2xl p-6 shadow-card space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#555555] mb-1.5">E-Mail-Adresse</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaaaaa]" />
              <input type="email" placeholder="deine@email.de"
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-[#e8e6e1] rounded-xl bg-white text-[#111111] placeholder-[#aaaaaa] focus:outline-none focus:border-[#111111] transition-colors" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-medium text-[#555555]">Passwort</label>
              <Link href="#" className="text-xs text-[#9b8b73] hover:text-[#7d7060] transition-colors">Vergessen?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaaaaa]" />
              <input type={showPass ? "text" : "password"} placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 text-sm border border-[#e8e6e1] rounded-xl bg-white text-[#111111] placeholder-[#aaaaaa] focus:outline-none focus:border-[#111111] transition-colors" />
              <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaaaaa] hover:text-[#555555]">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button className="w-full py-2.5 bg-[#111111] text-white text-sm font-medium rounded-xl hover:bg-[#333333] transition-colors">
            Anmelden
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#f0ede8]" /></div>
            <div className="relative flex justify-center"><span className="text-xs text-[#aaaaaa] bg-white px-3">oder</span></div>
          </div>

          <button className="w-full py-2.5 bg-white text-[#333333] text-sm font-medium rounded-xl border border-[#e8e6e1] hover:border-[#c4c0bb] hover:bg-[#faf9f7] transition-all flex items-center justify-center gap-2">
            <span className="text-base">G</span> Mit Google anmelden
          </button>
        </div>

        <p className="text-center text-sm text-[#888888] mt-5">
          Noch kein Konto?{" "}
          <Link href="/registrieren" className="font-medium text-[#111111] hover:text-[#555555] transition-colors">
            Kostenlos registrieren
          </Link>
        </p>
      </div>
    </div>
  );
}
