"use client";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "muted" | "warm" | "outline";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-[#111111] text-white",
  muted: "bg-[#f0ede8] text-[#666666]",
  warm: "bg-[#f0ebe3] text-[#8b7355]",
  outline: "border border-[#e8e6e1] text-[#777777]",
};

export function Badge({ children, variant = "muted", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
