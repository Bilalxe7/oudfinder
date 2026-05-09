// src/lib/hooks/index.ts
// Custom React hooks for Oudfinder

import { useState, useEffect, useRef, useCallback } from 'react'
import type { SearchFilters, FragranceSummary, PaginatedResponse } from '@/types'

// ── useDebounce ───────────────────────────────────────────────
export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}

// ── useSearch ─────────────────────────────────────────────────
export function useSearch(initialFilters: SearchFilters = {}) {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters)
  const [results, setResults] = useState<PaginatedResponse<FragranceSummary> | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const debouncedQuery = useDebounce(filters.query, 400)

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (debouncedQuery) params.set('query', debouncedQuery)
      if (filters.gender) params.set('gender', filters.gender)
      if (filters.sortBy) params.set('sortBy', filters.sortBy)
      if (filters.page) params.set('page', String(filters.page))
      filters.seasons?.forEach((s) => params.append('season', s))
      filters.occasions?.forEach((o) => params.append('occasion', o))

      try {
        const res = await fetch(`/api/fragrances?${params}`)
        if (!res.ok) throw new Error('Search failed')
        const data = await res.json()
        setResults(data)
      } catch {
        setError('Something went wrong. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    run()
  }, [debouncedQuery, filters.gender, filters.sortBy, filters.page, filters.seasons, filters.occasions])

  const updateFilter = useCallback(<K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: key !== 'page' ? 1 : prev.page }))
  }, [])

  return { filters, results, loading, error, updateFilter, setFilters }
}

// ── useCollection ─────────────────────────────────────────────
export function useCollection(username: string) {
  const [collection, setCollection] = useState<FragranceSummary[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!username) return

    const run = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/users/${username}/collection`)
        const data = await res.json()
        setCollection(data)
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [username])

  return { collection, loading }
}

// ── useIntersectionObserver (infinite scroll) ─────────────────
export function useIntersectionObserver(callback: () => void) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) callback() },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [callback])

  return ref
}

// ── useLocalStorage ───────────────────────────────────────────
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initial
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initial
    } catch {
      return initial
    }
  })

  const set = useCallback((v: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const next = typeof v === 'function' ? (v as (prev: T) => T)(prev) : v
      window.localStorage.setItem(key, JSON.stringify(next))
      return next
    })
  }, [key])

  return [value, set] as const
}
