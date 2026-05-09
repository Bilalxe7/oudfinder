// ─────────────────────────────────────────────────────────────
// UI COMPONENTS — Oudfinder
// Built with TailwindCSS + shadcn/ui primitives
// ─────────────────────────────────────────────────────────────


// ── src/components/fragrance/FragranceCard.tsx ───────────────

import Link from 'next/link'
import Image from 'next/image'
import type { FragranceSummary } from '@/types'

interface Props {
  fragrance: FragranceSummary
}

export function FragranceCard({ fragrance }: Props) {
  return (
    <Link href={`/fragrance/${fragrance.slug}`}>
      <div className="group bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 hover:border-amber-400 transition-colors cursor-pointer">
        <div className="relative w-full aspect-square bg-zinc-50 dark:bg-zinc-800 rounded-xl mb-4 overflow-hidden">
          {fragrance.imageUrl ? (
            <Image
              src={fragrance.imageUrl}
              alt={fragrance.name}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-4xl">
              🖤
            </div>
          )}
        </div>

        <p className="text-[11px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">
          {fragrance.brand.name}
        </p>
        <h3 className="text-[15px] font-medium text-zinc-900 dark:text-white mb-2 leading-tight">
          {fragrance.name}
        </h3>

        <div className="flex flex-wrap gap-1 mb-3">
          {fragrance.accords.slice(0, 3).map((a) => (
            <span
              key={a.name}
              className="px-2 py-0.5 text-[11px] rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
            >
              {a.name}
            </span>
          ))}
        </div>

        {fragrance.avgRating && (
          <p className="text-[12px] text-amber-600 font-medium">
            ★ {fragrance.avgRating.toFixed(1)} · {fragrance.ratingCount.toLocaleString()} ratings
          </p>
        )}
      </div>
    </Link>
  )
}


// ── src/components/fragrance/NotesPyramid.tsx ────────────────

import type { FragranceDetail } from '@/types'

interface Props {
  notes: FragranceDetail['notes']
}

export function NotesPyramid({ notes }: Props) {
  const top = notes.filter((n) => n.position === 'TOP')
  const heart = notes.filter((n) => n.position === 'HEART')
  const base = notes.filter((n) => n.position === 'BASE')

  const Section = ({
    label,
    items,
    width,
  }: {
    label: string
    items: typeof notes
    width: string
  }) => (
    <div className={`${width} mx-auto text-center`}>
      <p className="text-[11px] uppercase tracking-widest text-zinc-400 mb-2">{label}</p>
      <div className="flex flex-wrap justify-center gap-1">
        {items.map(({ note }) => (
          <span
            key={note.slug}
            className="px-3 py-1 text-[12px] rounded-full bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border border-amber-100 dark:border-amber-900"
          >
            {note.name}
          </span>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-6 py-4">
      <Section label="top notes" items={top} width="w-2/3" />
      <Section label="heart notes" items={heart} width="w-4/5" />
      <Section label="base notes" items={base} width="w-full" />
    </div>
  )
}


// ── src/components/fragrance/RatingBars.tsx ──────────────────

interface RatingBarProps {
  label: string
  value: number // 1-5
}

function RatingBar({ label, value }: RatingBarProps) {
  const pct = (value / 5) * 100
  return (
    <div className="flex items-center gap-3">
      <span className="text-[13px] text-zinc-500 w-24 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300 w-6">
        {value}
      </span>
    </div>
  )
}

interface Props {
  longevity?: number | null
  sillage?: number | null
  projection?: number | null
}

export function RatingBars({ longevity, sillage, projection }: Props) {
  return (
    <div className="space-y-3">
      {longevity && <RatingBar label="longevity" value={longevity} />}
      {sillage && <RatingBar label="sillage" value={sillage} />}
      {projection && <RatingBar label="projection" value={projection} />}
    </div>
  )
}


// ── src/components/search/SearchBar.tsx ──────────────────────

'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useDebounce } from '@/lib/hooks/useDebounce'

export function SearchBar({ placeholder = 'Search fragrances, notes, vibes...' }: { placeholder?: string }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<{ name: string; slug: string; brand: { name: string } }[]>([])
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const debouncedQuery = useDebounce(query, 300)

  const fetchResults = useCallback(async (q: string) => {
    if (q.length < 2) { setResults([]); return }
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
    const data = await res.json()
    setResults(data)
    setOpen(true)
  }, [])

  // Trigger search when debounced query changes
  // (In real app: use useEffect([debouncedQuery]) → fetchResults)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setOpen(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full px-6 py-4 pr-20 text-[15px] border border-zinc-200 dark:border-zinc-700 rounded-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder-zinc-400 outline-none focus:border-amber-400 transition-colors"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-amber-600 hover:bg-amber-700 text-white text-[13px] font-medium px-5 py-2 rounded-full transition-colors"
        >
          Search
        </button>
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden z-50">
          {results.map((r) => (
            <button
              key={r.slug}
              type="button"
              onClick={() => { router.push(`/fragrance/${r.slug}`); setOpen(false) }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-left transition-colors"
            >
              <span className="text-[14px] font-medium text-zinc-900 dark:text-white">{r.name}</span>
              <span className="text-[12px] text-zinc-400">{r.brand.name}</span>
            </button>
          ))}
        </div>
      )}
    </form>
  )
}


// ── src/components/ai/AIChatPanel.tsx ────────────────────────

'use client'

import { useState } from 'react'
import type { AIRecommendationResponse } from '@/types'

export function AIChatPanel() {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [recs, setRecs] = useState<AIRecommendationResponse | null>(null)

  const send = async () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setInput('')
    setMessages((m) => [...m, { role: 'user', text: userMsg }])
    setLoading(true)

    try {
      const res = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      })
      const data: AIRecommendationResponse = await res.json()
      setRecs(data)
      setMessages((m) => [...m, { role: 'ai', text: data.explanation }])
    } catch {
      setMessages((m) => [...m, { role: 'ai', text: 'Something went wrong. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full max-h-[600px]">
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages.length === 0 && (
          <div className="text-center text-zinc-400 text-[14px] pt-8">
            <p className="text-2xl mb-3">✨</p>
            <p>Describe a vibe, mood, or occasion.</p>
            <p className="text-[13px] mt-1">e.g. "Something luxurious for a winter date"</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-[14px] leading-relaxed ${
                m.role === 'user'
                  ? 'bg-amber-600 text-white rounded-br-sm'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-bl-sm'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-2xl rounded-bl-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-zinc-100 dark:border-zinc-800 p-4">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Ask anything about fragrances..."
            className="flex-1 px-4 py-2.5 text-[14px] border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-900 outline-none focus:border-amber-400"
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white rounded-xl text-[14px] font-medium transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}


// ── src/components/layout/BottomNav.tsx ──────────────────────

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items = [
  { href: '/',          icon: '🏠', label: 'home'    },
  { href: '/search',    icon: '🔍', label: 'search'  },
  { href: '/ai',        icon: '✨', label: 'AI'      },
  { href: '/community', icon: '💬', label: 'forum'   },
  { href: '/profile',   icon: '👤', label: 'profile' },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex md:hidden bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 z-50 pb-safe">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex-1 flex flex-col items-center gap-1 py-2 text-[10px] ${
            pathname === item.href
              ? 'text-amber-600'
              : 'text-zinc-400 dark:text-zinc-500'
          }`}
        >
          <span className="text-base">{item.icon}</span>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  )
}
