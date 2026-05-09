# Oudfinder — Architecture & Setup Guide

## Overview
Oudfinder is a modern AI-powered fragrance discovery platform.
Stack: Next.js 14 · TypeScript · TailwindCSS · Prisma · PostgreSQL (Supabase) · OpenAI

---

## Folder Structure

```
oudfinder/
├── prisma/
│   ├── schema.prisma          # Full database schema
│   └── seed.ts                # Initial data seeder
│
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── page.tsx           # Homepage
│   │   ├── layout.tsx         # Root layout (nav, theme, fonts)
│   │   ├── search/page.tsx    # Search results page
│   │   ├── fragrance/
│   │   │   └── [slug]/page.tsx  # Perfume detail page (SSR)
│   │   ├── brand/
│   │   │   └── [slug]/page.tsx  # Brand page
│   │   ├── ai/page.tsx        # AI consultant chat
│   │   ├── quiz/page.tsx      # Advanced recommendation quiz
│   │   ├── community/
│   │   │   ├── page.tsx       # Forum homepage
│   │   │   └── [id]/page.tsx  # Single discussion
│   │   ├── profile/
│   │   │   └── [username]/page.tsx
│   │   ├── trending/page.tsx
│   │   ├── seasonal/page.tsx
│   │   └── api/
│   │       ├── fragrances/route.ts          # GET /api/fragrances
│   │       ├── fragrances/[slug]/route.ts   # GET /api/fragrances/:slug
│   │       ├── search/route.ts              # GET /api/search?q=
│   │       ├── recommendations/route.ts     # POST /api/recommendations
│   │       ├── trending/route.ts            # GET /api/trending
│   │       ├── dupes/route.ts               # GET /api/dupes
│   │       ├── reviews/route.ts             # POST /api/reviews
│   │       ├── community/posts/route.ts     # GET/POST /api/community/posts
│   │       ├── users/[username]/
│   │       │   ├── route.ts                 # GET /api/users/:username
│   │       │   └── collection/route.ts      # GET collection
│   │       └── auth/[...nextauth]/route.ts  # NextAuth
│   │
│   ├── components/
│   │   ├── ui/                # Base atoms (Button, Badge, Input...)
│   │   ├── fragrance/
│   │   │   ├── FragranceCard.tsx
│   │   │   ├── FragranceGrid.tsx
│   │   │   ├── NotesPyramid.tsx
│   │   │   ├── RatingBars.tsx
│   │   │   ├── AccordBadge.tsx
│   │   │   ├── PurchaseLinks.tsx
│   │   │   └── DupeCard.tsx
│   │   ├── search/
│   │   │   ├── SearchBar.tsx
│   │   │   ├── SearchFilters.tsx
│   │   │   └── SearchResults.tsx
│   │   ├── ai/
│   │   │   ├── AIChatPanel.tsx
│   │   │   └── QuizWizard.tsx
│   │   ├── community/
│   │   │   ├── PostCard.tsx
│   │   │   ├── CommentThread.tsx
│   │   │   └── NewPostForm.tsx
│   │   └── layout/
│   │       ├── Navbar.tsx
│   │       ├── BottomNav.tsx
│   │       └── ThemeToggle.tsx
│   │
│   ├── lib/
│   │   ├── db/
│   │   │   ├── prisma.ts          # Singleton client
│   │   │   └── fragrances.ts      # Query helpers
│   │   ├── ai/
│   │   │   └── recommendations.ts # OpenAI integration
│   │   ├── hooks/
│   │   │   └── index.ts           # useSearch, useDebounce, etc.
│   │   └── utils/
│   │       ├── formatters.ts      # Price, rating formatters
│   │       └── slugify.ts
│   │
│   ├── types/
│   │   └── index.ts               # All TypeScript types
│   │
│   └── styles/
│       └── globals.css            # Tailwind base + custom vars
│
├── public/                        # Static assets
├── .env.example                   # Environment variables template
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Database Schema (Key Models)

| Model              | Purpose                              |
|--------------------|--------------------------------------|
| `User`             | Auth, profile, social                |
| `Fragrance`        | Core perfume data                    |
| `Brand`            | Perfume houses                       |
| `Note`             | Individual scent notes               |
| `FragranceNote`    | Top/Heart/Base note mapping          |
| `Accord`           | Scent families (woody, floral...)    |
| `Dupe`             | Dupe relationships + match score     |
| `SimilarFragrance` | Similarity graph between fragrances  |
| `Review`           | User ratings + detailed reviews      |
| `CollectionItem`   | User's owned fragrances              |
| `WishlistItem`     | User's wishlist                      |
| `Post`             | Community forum posts                |
| `Comment`          | Threaded comments                    |
| `PurchaseLink`     | Affiliate retailer links             |

---

## API Routes

| Method | Route                              | Description                    |
|--------|------------------------------------|--------------------------------|
| GET    | /api/fragrances                    | Search & filter fragrances     |
| GET    | /api/fragrances/:slug              | Single fragrance detail        |
| GET    | /api/search?q=                     | Instant autocomplete search    |
| POST   | /api/recommendations               | AI fragrance recommendations   |
| GET    | /api/trending                      | Trending fragrances            |
| GET    | /api/dupes                         | Top dupe pairs                 |
| POST   | /api/reviews                       | Create review (auth required)  |
| GET    | /api/community/posts               | Forum posts (filterable)       |
| POST   | /api/community/posts               | Create post (auth required)    |
| GET    | /api/users/:username/collection    | User's fragrance collection    |

---

## Quick Start

### 1. Clone & install
```bash
git clone https://github.com/yourname/oudfinder
cd oudfinder
npm install
```

### 2. Set up environment
```bash
cp .env.example .env.local
# Fill in DATABASE_URL, OPENAI_API_KEY, NEXTAUTH_SECRET
```

### 3. Set up database (Supabase)
1. Create a project at supabase.com
2. Copy the connection strings into .env.local
3. Run migrations:
```bash
npm run db:generate
npm run db:push
npm run db:seed
```

### 4. Run development server
```bash
npm run dev
# → http://localhost:3000
```

---

## Deployment (Vercel)

```bash
npm install -g vercel
vercel --prod
```

Add all .env.local variables to Vercel's environment settings.
Enable Fluid Compute for AI route (cold start optimization).

---

## Scaling Notes

- Use Supabase connection pooling (Transaction mode) for serverless
- Add Redis (Upstash) for caching trending/search results
- Use Supabase Storage for fragrance bottle images
- Vector embeddings (pgvector) for semantic fragrance similarity search
- Rate limit /api/recommendations with Upstash Ratelimit

---

## Affiliate Integration

Each `PurchaseLink` record stores a retailer URL.
For affiliate tracking, append UTM or affiliate parameters:
```
https://partner.com/product?ref=oudfinder&utm_source=oudfinder
```
Recommended partners: Fragrantica Shop, Beautylish, Scentbird, Douglas DE.
