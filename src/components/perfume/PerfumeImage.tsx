"use client";
import Image from "next/image";
import { Parfum } from "@/lib/data/perfumes";
import { hasRealImage, imageFor, realImageFor } from "@/lib/perfume-image";
import { cn } from "@/lib/utils";

type Props = {
  parfum: Pick<Parfum, "name" | "marke" | "slug" | "markeSlug" | "duftfamilie">;
  /** "card" → 600×800 SVG, "banner" → 1200×800 SVG */
  scale?: "card" | "banner";
  className?: string;
  /** Set to true for above-the-fold images (hero, featured) */
  priority?: boolean;
  /** Tailwind-friendly sizes attribute for Next.js Image */
  sizes?: string;
};

/**
 * Single source of truth for rendering a perfume image.
 * - Uses Next.js <Image> for real product photos: automatic WebP/AVIF,
 *   responsive sizing, lazy loading by default
 * - Falls back to an inline SVG (data URI) with brand-specific bottle
 *   silhouette + monogram when no real image is available
 * - Image is positioned absolute and fills the parent (which must be
 *   `relative` and have explicit dimensions / aspect-ratio)
 */
export function PerfumeImage({
  parfum,
  scale = "card",
  className,
  priority = false,
  sizes = "(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: Props) {
  const isReal = hasRealImage(parfum.slug);

  if (isReal && parfum.slug) {
    const src = realImageFor(parfum.slug)!;
    return (
      <Image
        src={src}
        alt={`${parfum.marke} ${parfum.name}`}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover transition-transform duration-700", className)}
      />
    );
  }

  // SVG fallback — always renders, never broken
  const src = imageFor(parfum, scale);
  return (
    <img
      src={src}
      alt={`${parfum.marke} ${parfum.name}`}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={cn(
        "absolute inset-0 w-full h-full object-cover transition-transform duration-700",
        className,
      )}
    />
  );
}
