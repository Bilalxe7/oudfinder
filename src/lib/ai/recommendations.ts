// src/lib/ai/recommendations.ts
// AI-powered fragrance recommendation engine using OpenAI

import OpenAI from 'openai'
import prisma from '@/lib/db/prisma'
import type { AIRecommendationRequest, AIRecommendationResponse } from '@/types'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const SYSTEM_PROMPT = `You are an expert fragrance consultant with deep knowledge of perfumery.
You help users discover fragrances based on their preferences, mood, or existing collection.

When recommending fragrances:
- Be specific and enthusiastic but concise
- Explain WHY each fragrance matches the user's request
- Mention key notes, accords, or occasions when relevant
- Suggest 3-5 fragrances per response
- Always return a JSON object with this exact structure:
{
  "recommendations": ["fragrance slug 1", "fragrance slug 2", ...],
  "explanation": "Brief explanation of recommendations",
  "followUpQuestions": ["question 1", "question 2"]
}

Use only real fragrance slugs in kebab-case format (e.g., "creed-aventus", "parfums-de-marly-layton").
Keep explanation under 150 words.`

export async function getAIRecommendations(
  request: AIRecommendationRequest
): Promise<AIRecommendationResponse> {
  const userContext = buildUserContext(request)

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userContext },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.7,
    max_tokens: 600,
  })

  const raw = JSON.parse(completion.choices[0].message.content ?? '{}')
  const slugs: string[] = raw.recommendations ?? []

  // Fetch actual fragrance records matching the slugs
  const fragrances = await prisma.fragrance.findMany({
    where: { slug: { in: slugs } },
    include: {
      brand: { select: { name: true, slug: true } },
      accords: { include: { accord: true }, take: 3, orderBy: { strength: 'desc' } },
    },
  })

  // Preserve order from AI response
  const ordered = slugs
    .map((slug) => fragrances.find((f) => f.slug === slug))
    .filter(Boolean) as typeof fragrances

  return {
    recommendations: ordered as never,
    explanation: raw.explanation ?? '',
    followUpQuestions: raw.followUpQuestions ?? [],
  }
}

function buildUserContext(request: AIRecommendationRequest): string {
  const parts: string[] = []

  if (request.message) {
    parts.push(`User request: "${request.message}"`)
  }

  if (request.ownedFragrances?.length) {
    parts.push(`Already owns: ${request.ownedFragrances.join(', ')}`)
  }

  if (request.favoriteNotes?.length) {
    parts.push(`Favorite notes: ${request.favoriteNotes.join(', ')}`)
  }

  if (request.occasions?.length) {
    parts.push(`Occasions: ${request.occasions.join(', ')}`)
  }

  if (request.seasons?.length) {
    parts.push(`Preferred seasons: ${request.seasons.join(', ')}`)
  }

  if (request.budget) {
    const budgetMap = {
      BUDGET: 'under €50',
      MID: '€50–150',
      PREMIUM: '€150–300',
      LUXURY: 'over €300',
    }
    parts.push(`Budget: ${budgetMap[request.budget]}`)
  }

  if (request.gender) {
    parts.push(`Preference: ${request.gender.toLowerCase()} fragrances`)
  }

  return parts.join('\n') || 'Help me find a great fragrance.'
}

// Semantic search helper — builds embedding for vector similarity (future feature)
export async function getFragranceEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  })
  return response.data[0].embedding
}
