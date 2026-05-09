// ─────────────────────────────────────────────────────────────
// API ROUTES — Oudfinder
// All routes use Next.js App Router (Route Handlers)
// ─────────────────────────────────────────────────────────────


// ── src/app/api/fragrances/route.ts ──────────────────────────
// GET /api/fragrances?query=...&gender=...&page=1

import { NextRequest, NextResponse } from 'next/server'
import { searchFragrances } from '@/lib/db/fragrances'
import type { SearchFilters } from '@/types'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl

  const filters: SearchFilters = {
    query: searchParams.get('query') ?? undefined,
    brandSlug: searchParams.get('brand') ?? undefined,
    gender: searchParams.get('gender') as never ?? undefined,
    noteSlug: searchParams.get('note') ?? undefined,
    minRating: searchParams.get('minRating') ? Number(searchParams.get('minRating')) : undefined,
    sortBy: searchParams.get('sortBy') as never ?? 'rating',
    page: Number(searchParams.get('page') ?? 1),
    limit: Number(searchParams.get('limit') ?? 24),
    seasons: searchParams.getAll('season') as never,
    occasions: searchParams.getAll('occasion') as never,
    priceRange: searchParams.getAll('priceRange') as never,
  }

  try {
    const result = await searchFragrances(filters)
    return NextResponse.json(result)
  } catch (err) {
    console.error('[GET /api/fragrances]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


// ── src/app/api/fragrances/[slug]/route.ts ───────────────────
// GET /api/fragrances/:slug

export async function GETbySlug(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { getFragranceBySlug } = await import('@/lib/db/fragrances')

  try {
    const fragrance = await getFragranceBySlug(params.slug)
    if (!fragrance) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(fragrance)
  } catch (err) {
    console.error('[GET /api/fragrances/:slug]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


// ── src/app/api/recommendations/route.ts ─────────────────────
// POST /api/recommendations
// Body: AIRecommendationRequest

export async function POSTRecommendations(req: NextRequest) {
  const { getAIRecommendations } = await import('@/lib/ai/recommendations')

  try {
    const body = await req.json()
    const result = await getAIRecommendations(body)
    return NextResponse.json(result)
  } catch (err) {
    console.error('[POST /api/recommendations]', err)
    return NextResponse.json({ error: 'AI service unavailable' }, { status: 503 })
  }
}


// ── src/app/api/search/route.ts ───────────────────────────────
// GET /api/search?q=smoky+vanilla
// Instant search — lightweight, returns top 8 results

export async function GETSearch(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') ?? ''
  if (q.length < 2) return NextResponse.json([])

  const { default: prisma } = await import('@/lib/db/prisma')

  const results = await prisma.fragrance.findMany({
    where: {
      OR: [
        { name: { contains: q, mode: 'insensitive' } },
        { brand: { name: { contains: q, mode: 'insensitive' } } },
      ],
    },
    take: 8,
    select: {
      id: true,
      name: true,
      slug: true,
      imageUrl: true,
      brand: { select: { name: true } },
      avgRating: true,
    },
  })

  return NextResponse.json(results)
}


// ── src/app/api/trending/route.ts ─────────────────────────────
// GET /api/trending?limit=8

export async function GETTrending(req: NextRequest) {
  const limit = Number(req.nextUrl.searchParams.get('limit') ?? 8)
  const { getTrendingFragrances } = await import('@/lib/db/fragrances')

  try {
    const data = await getTrendingFragrances(limit)
    return NextResponse.json(data)
  } catch (err) {
    console.error('[GET /api/trending]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


// ── src/app/api/dupes/route.ts ────────────────────────────────
// GET /api/dupes?limit=6

export async function GETDupes(req: NextRequest) {
  const limit = Number(req.nextUrl.searchParams.get('limit') ?? 6)
  const { getTopDupes } = await import('@/lib/db/fragrances')

  try {
    const data = await getTopDupes(limit)
    return NextResponse.json(data)
  } catch (err) {
    console.error('[GET /api/dupes]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


// ── src/app/api/reviews/route.ts ──────────────────────────────
// POST /api/reviews — create a review (auth required)

export async function POSTReview(req: NextRequest) {
  const { default: prisma } = await import('@/lib/db/prisma')
  // TODO: extract session from auth (NextAuth / Supabase)
  const session = null // replace with: await getServerSession()

  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { fragranceId, rating, title, body: reviewBody, longevity, sillage, season, occasion } = body

  try {
    const review = await prisma.review.create({
      data: {
        userId: (session as { user: { id: string } }).user.id,
        fragranceId,
        rating,
        title,
        body: reviewBody,
        longevity,
        sillage,
        season,
        occasion,
      },
      include: { user: { select: { username: true, avatarUrl: true } } },
    })

    // Recalculate fragrance avg rating
    const stats = await prisma.review.aggregate({
      where: { fragranceId },
      _avg: { rating: true },
      _count: { rating: true },
    })

    await prisma.fragrance.update({
      where: { id: fragranceId },
      data: {
        avgRating: stats._avg.rating ?? 0,
        ratingCount: stats._count.rating,
      },
    })

    return NextResponse.json(review, { status: 201 })
  } catch (err) {
    console.error('[POST /api/reviews]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


// ── src/app/api/users/[username]/collection/route.ts ──────────
// GET /api/users/:username/collection

export async function GETUserCollection(
  _req: NextRequest,
  { params }: { params: { username: string } }
) {
  const { default: prisma } = await import('@/lib/db/prisma')

  try {
    const user = await prisma.user.findUnique({
      where: { username: params.username },
      include: {
        collection: {
          include: {
            fragrance: {
              include: {
                brand: true,
                accords: { include: { accord: true }, take: 3 },
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    return NextResponse.json(user.collection)
  } catch (err) {
    console.error('[GET /api/users/:username/collection]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


// ── src/app/api/community/posts/route.ts ──────────────────────
// GET /api/community/posts?category=DUPE&page=1
// POST /api/community/posts — create post (auth required)

export async function GETPosts(req: NextRequest) {
  const { default: prisma } = await import('@/lib/db/prisma')
  const category = req.nextUrl.searchParams.get('category')
  const page = Number(req.nextUrl.searchParams.get('page') ?? 1)
  const limit = 20

  const where = category ? { category: category as never } : {}

  try {
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          user: { select: { username: true, avatarUrl: true } },
          _count: { select: { comments: true, likes: true } },
        },
      }),
      prisma.post.count({ where }),
    ])

    return NextResponse.json({ posts, total, page, hasMore: page * limit < total })
  } catch (err) {
    console.error('[GET /api/community/posts]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
