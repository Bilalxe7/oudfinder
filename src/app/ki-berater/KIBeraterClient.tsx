"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Send, RotateCcw, BookOpen, ArrowRight } from "lucide-react";
import { parfums } from "@/lib/data/perfumes";
import { PerfumeCard } from "@/components/perfume/PerfumeCard";

type Message = { id: string; role: "user" | "assistant"; text: string; parfumIds?: string[] };

const quickPrompts = [
  "Warmer Winterduft für romantische Abende",
  "Frischer Sommerduft für jeden Tag",
  "Dezentes Büroparfum",
  "Luxuriöser Abendduft",
  "Günstiger Dupe für Baccarat Rouge",
  "Holziger Unisex-Duft",
];

function generateResponse(msg: string): { text: string; parfumIds: string[] } {
  const m = msg.toLowerCase();
  if (m.includes("winter") || m.includes("warm") || m.includes("dunkel"))
    return { text: "Für warme Winterdüfte empfehle ich dir:\n\n**Tom Ford Black Orchid** – Opulent, dunkel, mit schwarzer Orchidee und Patchouli. Ausgezeichnete Haltbarkeit.\n\n**Tom Ford Oud Wood** – Cremiges Oud-Holz, warm und zeitlos. Ideal für kühle Abende.", parfumIds: ["1", "7"] };
  if (m.includes("sommer") || m.includes("frisch") || m.includes("leicht"))
    return { text: "Für frische Sommerdüfte sind das meine Empfehlungen:\n\n**Dior Sauvage** – Der meistverkaufte Herrenduft. Frisch, würzig, universell.\n\n**Chanel Chance Eau Tendre** – Zart, luftig und verspielt – perfekt für warme Tage.", parfumIds: ["4", "5"] };
  if (m.includes("büro") || m.includes("buero") || m.includes("dezent"))
    return { text: "Fürs Büro empfehle ich dezente, aber elegante Düfte:\n\n**YSL Libre** – Modern-feminin, Lavendel und Vanille, angenehm präsent.\n\n**Bleu de Chanel** – Zeitlos maskulin, frisch-holzig, immer angemessen.", parfumIds: ["3", "8"] };
  if (m.includes("date") || m.includes("abend") || m.includes("romantisch"))
    return { text: "Für romantische Abende:\n\n**Baccarat Rouge 540** – Das ikonischste Parfum der letzten Jahre. Warm, strahlend, unvergesslich.\n\n**Good Girl** – Verführerisch süß mit Jasmin und Kakao im Stiletto-Flakon.", parfumIds: ["2", "9"] };
  if (m.includes("dupe") || m.includes("günstig") || m.includes("alternative"))
    return { text: "Günstige Alternativen:\n\n**Für Baccarat Rouge 540:** Armaf Club de Nuit Milestone (~30€) oder Maison Alhambra Exclusif (~25€).\n\n**Für ein gutes Preis-Leistungs-Verhältnis** empfehle ich direkt YSL Libre oder Good Girl – Premium-Qualität zu fairem Preis.", parfumIds: ["3", "9"] };
  if (m.includes("oud") || m.includes("holzig") || m.includes("oriental"))
    return { text: "Für orientalische Oud-Düfte:\n\n**Tom Ford Oud Wood** – Die eleganteste westliche Interpretation. Cremig, warm, luxuriös.\n\n**Le Labo Santal 33** – Holzig, rauchig, urban. Ein modernes Kultstück.", parfumIds: ["7", "6"] };
  return { text: "Gute Wahl! Lass mich dir helfen. Magst du Düfte eher **frisch**, **warm**, **blumig** oder **holzig**? Und für welchen Anlass suchst du – Alltag, Abend oder etwas Besonderes?", parfumIds: [] };
}

function formatText(text: string) {
  return text.split("\n").map((line, i) => (
    <p key={i} className={line === "" ? "h-2 block" : "text-sm leading-relaxed text-[#333333]"}
      dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#111111] font-semibold">$1</strong>') }}
    />
  ));
}

export function KIBeraterClient() {
  const [messages, setMessages] = useState<Message[]>([{
    id: "welcome",
    role: "assistant",
    text: "Hallo! Ich bin dein persönlicher Duft-Berater.\n\nBeschreibe mir deinen Wunschduft – Stimmung, Anlass, Lieblingsparfums oder wie er riechen soll. Ich finde die passenden Empfehlungen für dich.",
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async (text = input) => {
    if (!text.trim() || loading) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), role: "user", text: text.trim() }]);
    setInput("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 1100));
    const res = generateResponse(text);
    setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", text: res.text, parfumIds: res.parfumIds }]);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white pt-14 pb-24 md:pb-8">
      {/* Header */}
      <div className="border-b border-[#f0ede8] bg-[#faf9f7] px-4 sm:px-6 py-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-serif font-medium text-[#111111] mb-0.5">KI-Duftberater</h1>
            <p className="text-sm text-[#888888]">Beschreibe deine Wünsche – ich finde deinen Duft</p>
          </div>
          <div className="flex gap-2">
            <Link href="/ki-berater/quiz" className="flex items-center gap-1.5 text-xs font-medium text-[#555555] border border-[#e8e6e1] px-3 py-2 rounded-lg hover:border-[#c4c0bb] hover:text-[#111111] transition-all bg-white">
              <BookOpen className="w-3.5 h-3.5" /> Quiz
            </Link>
            <button onClick={() => { setMessages([{ id: "w2", role: "assistant", text: "Hallo! Wie kann ich dir helfen?" }]); setInput(""); }} className="flex items-center gap-1.5 text-xs font-medium text-[#555555] border border-[#e8e6e1] px-3 py-2 rounded-lg hover:border-[#c4c0bb] transition-all bg-white">
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        {/* Quick prompts */}
        {messages.length <= 1 && (
          <div className="mb-7">
            <p className="text-[11px] font-semibold text-[#aaaaaa] uppercase tracking-wider mb-3">Schnellstart</p>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map(p => (
                <button key={p} onClick={() => send(p)} className="text-xs text-[#555555] bg-white border border-[#e8e6e1] px-3.5 py-2 rounded-full hover:border-[#9b8b73] hover:text-[#333333] transition-all">
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="space-y-5 mb-6">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-3`}>
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-lg bg-[#111111] flex-shrink-0 flex items-center justify-center mt-1">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={`max-w-[85%] ${msg.role === "user" ? "max-w-[70%]" : "w-full"}`}>
                <div className={`px-4 py-3.5 rounded-2xl ${
                  msg.role === "user"
                    ? "bg-[#111111] text-white rounded-tr-sm"
                    : "bg-[#faf9f7] border border-[#e8e6e1] rounded-tl-sm"
                }`}>
                  {msg.role === "user"
                    ? <p className="text-sm text-white leading-relaxed">{msg.text}</p>
                    : <div className="space-y-1">{formatText(msg.text)}</div>
                  }
                </div>
                {msg.parfumIds && msg.parfumIds.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {parfums.filter(p => msg.parfumIds!.includes(p.id)).map(p => (
                      <PerfumeCard key={p.id} parfum={p} variant="compact" />
                    ))}
                  </div>
                )}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-[#f0ede8] flex-shrink-0 flex items-center justify-center text-xs font-semibold text-[#8b7355] mt-1">Du</div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#111111] flex-shrink-0 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="bg-[#faf9f7] border border-[#e8e6e1] rounded-2xl rounded-tl-sm px-4 py-3.5">
                <div className="flex gap-1.5">
                  {[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#cccccc] animate-bounce" style={{ animationDelay: `${i*0.15}s` }} />)}
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div className="sticky bottom-20 md:bottom-4 bg-white border border-[#d0cdc8] rounded-2xl shadow-card-md p-3 focus-within:border-[#111111] transition-all">
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Beschreibe deinen Wunschduft..."
              rows={1}
              className="flex-1 text-sm text-[#111111] placeholder-[#aaaaaa] bg-transparent focus:outline-none resize-none leading-relaxed pt-0.5"
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || loading}
              className="w-9 h-9 rounded-xl bg-[#111111] text-white flex items-center justify-center hover:bg-[#333333] disabled:opacity-30 transition-all flex-shrink-0 self-end"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-[#cccccc] mt-2">Enter zum Senden · Shift+Enter für neue Zeile</p>
        </div>
      </div>
    </div>
  );
}
