import { ReactNode } from "react";

export function LegalPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white pb-24 md:pb-16" style={{ paddingTop: "4rem" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <p className="text-[10px] font-semibold text-[#9b8b73] uppercase tracking-[0.18em] mb-2">
          {eyebrow}
        </p>
        <h1 className="text-3xl md:text-[2.4rem] font-serif font-medium text-[#111111] tracking-tight mb-2 leading-[1.1]">
          {title}
        </h1>
        {updated && (
          <p className="text-xs text-[#9b9389] mb-10">
            Letzte Aktualisierung: {updated}
          </p>
        )}
        <article className="legal-prose">{children}</article>
      </div>
    </div>
  );
}
