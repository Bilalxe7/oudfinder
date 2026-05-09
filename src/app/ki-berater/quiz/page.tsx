"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, RotateCcw } from "lucide-react";
import { parfums } from "@/lib/data/perfumes";
import { PerfumeCard } from "@/components/perfume/PerfumeCard";
import { cn } from "@/lib/utils";

const questions = [
  { id: "geschlecht", question: "Für wen suchst du einen Duft?", options: [
    { value: "damen", label: "Für mich", sub: "Damen", emoji: "👩" },
    { value: "herren", label: "Für mich", sub: "Herren", emoji: "👨" },
    { value: "unisex", label: "Unisex", sub: "Kein Unterschied", emoji: "✨" },
    { value: "geschenk", label: "Als Geschenk", sub: "Für jemand anderen", emoji: "🎁" },
  ]},
  { id: "anlass", question: "Für welchen Anlass?", options: [
    { value: "alltag", label: "Alltag & Büro", sub: "Täglich", emoji: "☀️" },
    { value: "abend", label: "Abend", sub: "Ausgehen & Dinner", emoji: "🌙" },
    { value: "date", label: "Date", sub: "Romantisch", emoji: "💕" },
    { value: "urlaub", label: "Urlaub", sub: "Reisen & Sommer", emoji: "✈️" },
  ]},
  { id: "jahreszeit", question: "Für welche Jahreszeit?", options: [
    { value: "fruehling", label: "Frühling", sub: "Blumig & frisch", emoji: "🌸" },
    { value: "sommer", label: "Sommer", sub: "Leicht & sonnig", emoji: "☀️" },
    { value: "herbst", label: "Herbst", sub: "Würzig & warm", emoji: "🍂" },
    { value: "winter", label: "Winter", sub: "Intensiv & warm", emoji: "❄️" },
  ]},
  { id: "charakter", question: "Wie soll der Duft sein?", options: [
    { value: "frisch", label: "Frisch & leicht", sub: "Luftig, clean", emoji: "💧" },
    { value: "warm", label: "Warm & sinnlich", sub: "Verführerisch", emoji: "🔥" },
    { value: "blumig", label: "Blumig", sub: "Feminin & zart", emoji: "🌺" },
    { value: "holzig", label: "Holzig & würzig", sub: "Geerdet", emoji: "🌲" },
  ]},
  { id: "intensitaet", question: "Wie intensiv soll er sein?", options: [
    { value: "dezent", label: "Sehr dezent", sub: "Fast unsichtbar", emoji: "🌿" },
    { value: "mittel", label: "Angenehm", sub: "Spürbar, nicht aufdringlich", emoji: "✨" },
    { value: "intensiv", label: "Intensiv", sub: "Auffällig", emoji: "💥" },
    { value: "statement", label: "Statement", sub: "Unverwechselbar", emoji: "👑" },
  ]},
  { id: "budget", question: "Dein Budget?", options: [
    { value: "budget", label: "Bis 50€", sub: "Einstiegsklasse", emoji: "💰" },
    { value: "mittel", label: "50–100€", sub: "Gutes Mittelfeld", emoji: "💳" },
    { value: "premium", label: "100–250€", sub: "Premium", emoji: "💎" },
    { value: "luxus", label: "250€+", sub: "Luxus & Nische", emoji: "👑" },
  ]},
];

function getRecommendations(answers: Record<string, string>) {
  const charToFamilie: Record<string, string[]> = {
    frisch: ["Frisch", "Blumig-Frisch", "Holzig-Aromatisch"],
    warm: ["Oriental", "Blumig-Oriental", "Orientalisch-Holzig"],
    blumig: ["Blumig", "Blumig-Frisch", "Blumig-Amber"],
    holzig: ["Holzig", "Holzig-Aromatisch", "Holzig-Würzig"],
  };
  let result = [...parfums];
  const familien = charToFamilie[answers.charakter] || [];
  if (familien.length > 0) result = result.filter(p => familien.some(f => p.duftfamilie.toLowerCase().includes(f.toLowerCase())));
  if (answers.geschlecht === "damen") result = result.filter(p => p.geschlecht === "damen" || p.geschlecht === "unisex");
  else if (answers.geschlecht === "herren") result = result.filter(p => p.geschlecht === "herren" || p.geschlecht === "unisex");
  if (answers.budget) { const bf = result.filter(p => p.preisRange === answers.budget); if (bf.length > 0) result = bf; }
  if (result.length === 0) result = parfums.slice(0, 4);
  return result.slice(0, 4);
}

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const q = questions[step];
  const isLast = step === questions.length - 1;

  const pick = (val: string) => {
    const next = { ...answers, [q.id]: val };
    setAnswers(next);
    if (isLast) setTimeout(() => setDone(true), 250);
    else setTimeout(() => setStep(s => s + 1), 250);
  };

  const reset = () => { setStep(0); setAnswers({}); setDone(false); };

  if (done) {
    const recs = getRecommendations(answers);
    return (
      <div className="min-h-screen bg-white pt-24 pb-24 md:pb-8 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] font-semibold text-[#9b8b73] uppercase tracking-widest mb-3">Dein Ergebnis</p>
            <h1 className="text-2xl font-serif font-medium text-[#111111] mb-2">Deine Duft-Empfehlungen</h1>
            <p className="text-sm text-[#888888]">Basierend auf deinen Antworten haben wir diese Düfte für dich ausgewählt</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {recs.map((p, i) => (
              <div key={p.id} className={i === 0 ? "col-span-2 sm:col-span-1" : ""}>
                {i === 0 && <p className="text-[11px] font-semibold text-[#9b8b73] uppercase tracking-widest mb-2">Beste Empfehlung</p>}
                <PerfumeCard parfum={p} variant={i === 0 ? "featured" : "default"} />
              </div>
            ))}
          </div>
          <div className="flex gap-3 justify-center">
            <button onClick={reset} className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#e8e6e1] text-sm font-medium text-[#555555] rounded-xl hover:border-[#c4c0bb] hover:text-[#111111] transition-all">
              <RotateCcw className="w-4 h-4" /> Quiz wiederholen
            </button>
            <Link href="/ki-berater" className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#111111] text-white text-sm font-medium rounded-xl hover:bg-[#333333] transition-colors">
              KI-Chat öffnen
            </Link>
            <Link href="/entdecken" className="inline-flex items-center px-4 py-2.5 border border-[#e8e6e1] text-sm font-medium text-[#555555] rounded-xl hover:border-[#c4c0bb] transition-all">
              Alle Düfte
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20 pb-24 md:pb-8 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {step > 0
            ? <button onClick={() => setStep(s => s - 1)} className="flex items-center gap-1 text-sm text-[#888888] hover:text-[#111111] transition-colors"><ChevronLeft className="w-4 h-4" /> Zurück</button>
            : <Link href="/ki-berater" className="flex items-center gap-1 text-sm text-[#888888] hover:text-[#111111] transition-colors"><ChevronLeft className="w-4 h-4" /> KI-Berater</Link>
          }
          <span className="text-xs font-medium text-[#aaaaaa]">{step + 1} / {questions.length}</span>
        </div>

        {/* Progress */}
        <div className="h-1 bg-[#f0ede8] rounded-full mb-10 overflow-hidden">
          <div className="h-full bg-[#111111] rounded-full transition-all duration-400" style={{ width: `${((step) / questions.length) * 100}%` }} />
        </div>

        <h2 className="text-xl font-serif font-medium text-[#111111] mb-7 text-center">{q.question}</h2>

        <div className="grid grid-cols-2 gap-3">
          {q.options.map(opt => (
            <button
              key={opt.value}
              onClick={() => pick(opt.value)}
              className={cn(
                "text-left p-5 rounded-2xl border transition-all duration-150 hover:scale-[1.01] active:scale-[0.99] group",
                answers[q.id] === opt.value
                  ? "bg-[#111111] border-[#111111]"
                  : "bg-white border-[#e8e6e1] hover:border-[#c4b8a4] hover:shadow-card"
              )}
            >
              <span className="text-2xl block mb-3">{opt.emoji}</span>
              <p className={cn("text-sm font-semibold leading-snug", answers[q.id] === opt.value ? "text-white" : "text-[#111111]")}>{opt.label}</p>
              <p className={cn("text-xs mt-0.5", answers[q.id] === opt.value ? "text-white/60" : "text-[#aaaaaa]")}>{opt.sub}</p>
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-[#cccccc] mt-8">Wähle eine Option zum Fortfahren</p>
      </div>
    </div>
  );
}
