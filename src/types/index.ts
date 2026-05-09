// src/types/index.ts
// Central type definitions for Oudfinder

export type Gender = 'MASCULINE' | 'FEMININE' | 'UNISEX'
export type Season = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER'
export type Occasion = 'DAILY' | 'OFFICE' | 'DATE' | 'FORMAL' | 'CASUAL' | 'SPORT' | 'EVENING' | 'SPECIAL'
export type NotePosition = 'TOP' | 'HEART' | 'BASE'
export type PriceRange = 'BUDGET' | 'MID' | 'PREMIUM' | 'LUXURY'
export type Concentration = 'EDC' | 'EDT' | 'EDP' | 'PARFUM' | 'EXTRAIT'
export type PostCategory = 'RECOMMENDATION' | 'DISCUSSION' | 'DUPE' | 'REVIEW' | 'NEWS' | 'QUESTION'

export interface FragranceSummary {
  id: string
  name: string
  slug: string
  brand: { name: string; slug: string }
  imageUrl: string | null
  gender: Gender
  avgRating: number | null
  ratingCount: number
  accords: { name: string; color?: string | null }[]
  priceRange: PriceRange | null
}

export interface FragranceDetail extends FragranceSummary {
  perfumer: string | null
  releaseYear: number | null
  description: string | null
  aiSummary: string | null
  concentration: Concentration | null
  longevity: number | null
  sillage: number | null
  projection: number | null
  notes: {
    position: NotePosition
    note: { name: string; slug: string; family: string }
  }[]
  seasons: Season[]
  occasions: Occasion[]
  reviews: ReviewSummary[]
  similar: FragranceSummary[]
  dupes: DupeSummary[]
  purchaseLinks: PurchaseLink[]
}

export interface Note {
  id: string
  name: string
  slug: string
  family: string
}

export interface ReviewSummary {
  id: string
  user: { username: string; avatarUrl: string | null }
  rating: number
  title: string | null
  body: string
  longevity: number | null
  sillage: number | null
  likeCount: number
  createdAt: string
}

export interface DupeSummary {
  id: string
  dupe: FragranceSummary
  matchScore: number
  savingEur: number | null
  notes: string | null
}

export interface PurchaseLink {
  id: string
  retailer: string
  url: string
  priceEur: number | null
  inStock: boolean
  isBestDeal: boolean
}

export interface UserProfile {
  id: string
  username: string
  displayName: string | null
  avatarUrl: string | null
  bio: string | null
  followerCount: number
  followingCount: number
  collectionCount: number
}

export interface PostSummary {
  id: string
  user: { username: string; avatarUrl: string | null }
  title: string
  body: string
  category: PostCategory
  tags: string[]
  commentCount: number
  likeCount: number
  createdAt: string
}

export interface SearchFilters {
  query?: string
  brandSlug?: string
  gender?: Gender
  seasons?: Season[]
  occasions?: Occasion[]
  noteSlug?: string
  accordSlug?: string
  priceRange?: PriceRange[]
  minRating?: number
  concentration?: Concentration
  sortBy?: 'rating' | 'trending' | 'newest' | 'name'
  page?: number
  limit?: number
}

export interface AIRecommendationRequest {
  message?: string           // free-text chat
  ownedFragrances?: string[] // fragrance IDs
  favoriteNotes?: string[]   // note slugs
  occasions?: Occasion[]
  seasons?: Season[]
  budget?: PriceRange
  gender?: Gender
}

export interface AIRecommendationResponse {
  recommendations: FragranceSummary[]
  explanation: string
  followUpQuestions?: string[]
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}
