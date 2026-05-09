// src/lib/db/fragrances.ts
// All fragrance-related database queries

import prisma from './prisma'
import type { SearchFilters } from '@/types'

export async function getFragranceBySlug(slug: string) {
  return prisma.fragrance.findUnique({
    where: { slug },
    include: {
      brand: true,
      notes: { include: { note: true }, orderBy: { position: 'asc' } },
      accords: { include: { accord: true }, orderBy: { strength: 'desc' } },
      seasons: true,
      occasions: true,
      reviews: {
        include: { user: { select: { username: true, avatarUrl: true } } },
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
      purchaseLinks: { orderBy: { priceEur: 'asc' } },
      dupesAs: {
        include: {
          dupe: {
            include: { brand: true, accords: { include: { accord: true } } },
          },
        },
        orderBy: { matchScore: 'desc' },
        take: 6,
      },
      similarA: {
        include: {
          fragB: {
            include: { brand: true, accords: { include: { accord: true } } },
          },
        },
        orderBy: { score: 'desc' },
        take: 8,
      },
    },
  })
}

export async function searchFragrances(filters: SearchFilters) {
  const {
    query,
    brandSlug,
    gender,
    seasons,
    occasions,
    noteSlug,
    priceRange,
    minRating,
    sortBy = 'rating',
    page = 1,
    limit = 24,
  } = filters

  const where: Record<string, unknown> = {}

  if (query) {
    where.OR = [
      { name: { contains: query, mode: 'insensitive' } },
      { brand: { name: { contains: query, mode: 'insensitive' } } },
      { description: { contains: query, mode: 'insensitive' } },
    ]
  }

  if (brandSlug) where.brand = { slug: brandSlug }
  if (gender) where.gender = gender
  if (priceRange?.length) where.priceRange = { in: priceRange }
  if (minRating) where.avgRating = { gte: minRating }

  if (seasons?.length) {
    where.seasons = { some: { season: { in: seasons } } }
  }

  if (occasions?.length) {
    where.occasions = { some: { occasion: { in: occasions } } }
  }

  if (noteSlug) {
    where.notes = { some: { note: { slug: noteSlug } } }
  }

  const orderBy =
    sortBy === 'trending'
      ? { ratingCount: 'desc' as const }
      : sortBy === 'newest'
      ? { createdAt: 'desc' as const }
      : sortBy === 'name'
      ? { name: 'asc' as const }
      : { avgRating: 'desc' as const }

  const [data, total] = await Promise.all([
    prisma.fragrance.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        brand: { select: { name: true, slug: true } },
        accords: { include: { accord: true }, take: 3, orderBy: { strength: 'desc' } },
      },
    }),
    prisma.fragrance.count({ where }),
  ])

  return { data, total, page, limit, hasMore: page * limit < total }
}

export async function getTrendingFragrances(limit = 8) {
  return prisma.fragrance.findMany({
    orderBy: { ratingCount: 'desc' },
    take: limit,
    include: {
      brand: { select: { name: true, slug: true } },
      accords: { include: { accord: true }, take: 3, orderBy: { strength: 'desc' } },
    },
  })
}

export async function getFragrancesByseason(season: string, limit = 8) {
  return prisma.fragrance.findMany({
    where: { seasons: { some: { season: season as never } } },
    orderBy: { avgRating: 'desc' },
    take: limit,
    include: {
      brand: { select: { name: true, slug: true } },
      accords: { include: { accord: true }, take: 3 },
    },
  })
}

export async function getTopDupes(limit = 6) {
  return prisma.dupe.findMany({
    orderBy: { matchScore: 'desc' },
    take: limit,
    include: {
      original: { include: { brand: true } },
      dupe: { include: { brand: true } },
    },
  })
}
