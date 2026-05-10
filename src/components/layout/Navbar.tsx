"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Search, Menu, X, Sparkles, Home, Compass, Users, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { parfums } from "@/lib/data/perfumes";
import { imageFor } from "@/lib/perfume-image";

const navLinks = [
  { href: "/entdecken", label: "Entdecken" },
  { href: "/ki-berater", label: "KI-Berater" },
  { href: "/community", label: "Community" },
  { href: "/ratgeber", label: "Ratgeber" },
];

const mobileNavLinks = [
  { href: "/", label: "Start", icon: Home },
  { href: "/entdecken", label: "Entdecken", icon: Compass },
  { href: "/ki-berater", label: "KI", icon: Sparkles },
  { href: "/community", label: "Community", icon: Users },
  { href: "/ratgeber", label: "Ratgeber", icon: BookOpen },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof parfums>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (query.length > 1) {
      const q = query.toLowerCase();
      setResults(
        parfums.filter(p =>
          p.name.toLowerCase().includes(q) ||
          p.marke.toLowerCase().includes(q) ||
          p.tags.some(t => t.includes(q))
        ).slice(0, 5)
      );
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setQuery("");
        setResults([]);
      }
    };
    if (searchOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [searchOpen]);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  const closeSearch = () => { setSearchOpen(false); setQuery(""); setResults([]); };

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm transition-all duration-200",
        scrolled ? "border-b border-[#e8e6e1] shadow-[0_1px_8px_rgba(0,0,0,0.04)]" : "border-b border-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-8 h-8 rounded-xl bg-[#111111] flex items-center justify-center">
                <span className="text-white text-sm font-semibold tracking-tight">o</span>
              </div>
              <span className="font-semibold text-[#111111] text-[15px] tracking-tight">
                oudfinder
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3.5 py-2 rounded-lg text-sm transition-all duration-150",
                    pathname === link.href || pathname.startsWith(link.href + "/")
                      ? "text-[#111111] font-medium bg-[#f5f4f1]"
                      : "text-[#777777] font-medium hover:text-[#111111] hover:bg-[#f5f4f1]"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Search — hidden on the homepage at scroll-top
                 (the hero already has a big, prominent search bar).
                 Appears as soon as the user scrolls past the hero. */}
              <div
                ref={searchRef}
                className={cn(
                  "relative",
                  pathname === "/" && !scrolled && "hidden",
                )}
              >
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className={cn(
                    "flex items-center gap-2 h-8 rounded-lg border text-sm transition-all",
                    searchOpen
                      ? "hidden"
                      : "px-3 border-[#e4e2de] text-[#999999] hover:border-[#c4c0bb] hover:text-[#111111] bg-[#faf9f7]"
                  )}
                >
                  <Search className="w-3.5 h-3.5" />
                  <span className="hidden sm:block text-xs text-[#aaaaaa]">Suchen...</span>
                </button>

                {searchOpen && (
                  <div className="absolute right-0 top-0 w-72 sm:w-80">
                    <div className="flex items-center h-8 border border-[#111111] rounded-lg bg-white px-3 gap-2 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
                      <Search className="w-3.5 h-3.5 text-[#aaaaaa] flex-shrink-0" />
                      <input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Escape") closeSearch();
                          if (e.key === "Enter" && query.trim()) {
                            window.location.href = `/entdecken?q=${encodeURIComponent(query)}`;
                            closeSearch();
                          }
                        }}
                        placeholder="Duft oder Marke suchen..."
                        className="flex-1 text-sm text-[#111111] placeholder-[#bbbbbb] bg-transparent focus:outline-none"
                      />
                      <button onClick={closeSearch} className="text-[#bbbbbb] hover:text-[#111111] transition-colors">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {results.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#e8e6e1] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] overflow-hidden">
                        {results.map((p) => (
                          <Link
                            key={p.id}
                            href={`/duft/${p.slug}`}
                            onClick={closeSearch}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-[#faf9f7] transition-colors border-b border-[#f5f4f1] last:border-0"
                          >
                            <div className="w-9 h-9 rounded-xl overflow-hidden bg-[#f5f4f1] flex-shrink-0">
                              <img src={imageFor(p)} alt={p.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-[#111111] truncate">{p.name}</p>
                              <p className="text-xs text-[#999999]">{p.marke}</p>
                            </div>
                            <span className="text-xs font-semibold text-[#555555] flex-shrink-0">ab {p.preisVon}€</span>
                          </Link>
                        ))}
                        <Link
                          href={`/entdecken?q=${encodeURIComponent(query)}`}
                          onClick={closeSearch}
                          className="block px-4 py-2.5 text-xs text-[#9b8b73] font-medium hover:bg-[#faf9f7] transition-colors text-center"
                        >
                          Alle Ergebnisse anzeigen →
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <Link
                href="/anmelden"
                className="hidden md:block text-sm font-medium text-[#777777] hover:text-[#111111] px-3 py-1.5 transition-colors"
              >
                Anmelden
              </Link>
              <Link
                href="/registrieren"
                className="hidden md:block text-sm font-medium text-white bg-[#111111] hover:bg-[#2a2a2a] px-4 py-1.5 rounded-lg transition-colors"
              >
                Registrieren
              </Link>

              <button
                className="md:hidden p-2 text-[#666666] hover:text-[#111111] transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#f0ede8] bg-white">
            <div className="px-4 py-4 space-y-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                    pathname === link.href
                      ? "text-[#111111] bg-[#f5f4f1]"
                      : "text-[#666666] hover:text-[#111111] hover:bg-[#faf9f7]"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-[#f0ede8] mt-3 flex gap-2">
                <Link
                  href="/anmelden"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center text-sm font-medium text-[#555555] border border-[#e8e6e1] py-2.5 rounded-xl hover:bg-[#faf9f7] transition-colors"
                >
                  Anmelden
                </Link>
                <Link
                  href="/registrieren"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center text-sm font-medium text-white bg-[#111111] py-2.5 rounded-xl hover:bg-[#2a2a2a] transition-colors"
                >
                  Registrieren
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 mobile-nav bg-white/95 backdrop-blur-sm border-t border-[#e8e6e1]">
        <div className="flex items-center justify-around px-1 py-2">
          {mobileNavLinks.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all min-w-0",
                  active ? "text-[#111111]" : "text-[#cccccc]"
                )}
              >
                <link.icon className="w-5 h-5" strokeWidth={active ? 2 : 1.5} />
                <span className="text-[10px] font-medium truncate">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
