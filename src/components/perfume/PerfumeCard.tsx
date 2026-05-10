"use client";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Parfum } from "@/lib/data/perfumes";
import { StarRating } from "@/components/ui/StarRating";
import { PerfumeImage } from "@/components/perfume/PerfumeImage";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface PerfumeCardProps {
  parfum: Parfum;
  variant?: "default" | "compact" | "horizontal" | "featured";
  className?: string;
  rank?: number;
  /** Pass `true` for above-the-fold cards (eager-load real images) */
  priority?: boolean;
}

export function PerfumeCard({
  parfum,
  variant = "default",
  className,
  rank,
}: PerfumeCardProps) {
  const [liked, setLiked] = useState(false);

  // ─────────────────────────── COMPACT ───────────────────────────
  if (variant === "compact") {
    return (
      <Link href={`/duft/${parfum.slug}`} className="block">
        <div
          className={cn(
            "group bg-white border border-[#ece9e3] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#d8d2c8] hover:shadow-[0_6px_24px_rgba(20,16,8,0.08)] hover:-translate-y-0.5",
            className,
          )}
        >
          <div className="relative aspect-square overflow-hidden">
            <PerfumeImage parfum={parfum} className="group-hover:scale-[1.04]" />
          </div>
          <div className="p-3">
            <p className="text-[10px] text-[#9b8b73] font-semibold uppercase tracking-[0.12em] truncate">
              {parfum.marke}
            </p>
            <p className="text-sm font-medium text-[#111111] mt-0.5 truncate leading-snug">
              {parfum.name}
            </p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <StarRating rating={parfum.gesamtBewertung} size="xs" />
              <span className="text-[11px] text-[#aaaaaa]">{parfum.gesamtBewertung.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // ─────────────────────────── HORIZONTAL ───────────────────────────
  if (variant === "horizontal") {
    return (
      <Link href={`/duft/${parfum.slug}`} className="block">
        <div
          className={cn(
            "group flex gap-3 bg-white border border-[#ece9e3] rounded-xl p-3 hover:border-[#d8d2c8] hover:shadow-[0_4px_16px_rgba(20,16,8,0.06)] transition-all",
            className,
          )}
        >
          <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
            <PerfumeImage parfum={parfum} />
          </div>
          <div className="flex-1 min-w-0 py-0.5">
            <p className="text-[10px] text-[#9b8b73] font-semibold uppercase tracking-[0.12em]">
              {parfum.marke}
            </p>
            <p className="text-sm font-medium text-[#111111] mt-0.5 truncate">{parfum.name}</p>
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={parfum.gesamtBewertung} size="xs" />
              <span className="text-[11px] text-[#aaaaaa]">{parfum.preisVon}€</span>
            </div>
          </div>
          {rank && (
            <span className="text-xs font-semibold text-[#cccccc] self-start mt-1 tabular-nums">
              #{rank}
            </span>
          )}
        </div>
      </Link>
    );
  }

  // ─────────────────────────── FEATURED ───────────────────────────
  if (variant === "featured") {
    return (
      <Link href={`/duft/${parfum.slug}`} className="block">
        <div
          className={cn(
            "group relative bg-white border border-[#ece9e3] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#d8d2c8] hover:shadow-[0_10px_32px_rgba(20,16,8,0.10)] hover:-translate-y-0.5",
            className,
          )}
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <PerfumeImage parfum={parfum} className="group-hover:scale-[1.04]" />
          </div>
          <div className="p-5">
            <p className="text-[10px] text-[#9b8b73] font-semibold uppercase tracking-[0.14em] mb-1.5">
              {parfum.marke}
            </p>
            <h3 className="text-lg font-serif font-medium text-[#111111] leading-snug mb-1.5 truncate">
              {parfum.name}
            </h3>
            <p className="text-sm text-[#888888] line-clamp-2 mb-4 leading-relaxed">
              {parfum.kurzBeschreibung}
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-[#f4f2ed]">
              <StarRating
                rating={parfum.gesamtBewertung}
                size="sm"
                showNumber
                count={parfum.bewertungsAnzahl}
              />
              <span className="text-sm font-semibold text-[#111111] tabular-nums">
                {parfum.preisVon}€
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // ─────────────────────────── DEFAULT (PORTRAIT PRODUCT CARD) ───────────────────────────
  return (
    <div
      className={cn(
        "group relative bg-white border border-[#ece9e3] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#d8d2c8] hover:shadow-[0_10px_28px_rgba(20,16,8,0.09)] hover:-translate-y-0.5",
        className,
      )}
    >
      {/* Heart toggle */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setLiked(!liked);
        }}
        aria-label={liked ? "Aus Favoriten entfernen" : "Zu Favoriten hinzufügen"}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm border border-[#ece9e3] flex items-center justify-center hover:border-[#c4bfb6] transition-all shadow-[0_2px_8px_rgba(20,16,8,0.06)]"
      >
        <Heart
          className={cn(
            "w-3.5 h-3.5 transition-colors",
            liked ? "fill-rose-500 text-rose-500" : "text-[#bbbbbb]",
          )}
        />
      </button>

      {parfum.editorChoice && (
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[10px] font-semibold text-[#8b7355] bg-white/95 backdrop-blur-sm border border-[#e8dcc8] px-2 py-0.5 rounded-md shadow-[0_2px_8px_rgba(20,16,8,0.05)] tracking-wide">
            Editor&apos;s Choice
          </span>
        </div>
      )}

      <Link href={`/duft/${parfum.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden">
          <PerfumeImage parfum={parfum} className="group-hover:scale-[1.04]" />
        </div>

        <div className="p-3.5 sm:p-4">
          <p className="text-[10px] font-semibold text-[#9b8b73] uppercase tracking-[0.14em] mb-1 truncate">
            {parfum.marke}
          </p>
          <h3 className="text-sm font-semibold text-[#111111] leading-snug mb-2.5 truncate">
            {parfum.name}
          </h3>
          <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-[#f4f2ed]">
            <StarRating rating={parfum.gesamtBewertung} size="xs" showNumber />
            <span className="text-sm font-semibold text-[#111111] flex-shrink-0 tabular-nums">
              {parfum.preisVon}€
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
