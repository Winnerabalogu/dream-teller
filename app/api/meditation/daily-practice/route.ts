// api/meditation/daily-practice/route.ts
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import {
  getDailyMantra,
  getDailyQuote,
  getDailyMeditation,
  getDailyRitual,
  getUserProfile,
} from "@/services/meditation.service"
export const runtime = "nodejs"
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const [dailyMantra, dailyQuote, dailyMeditation, dailyRitual, userProfile] = await Promise.all([
      getDailyMantra(),
      getDailyQuote(),
      getDailyMeditation(),
      getDailyRitual(),
      getUserProfile(),
    ])

    return NextResponse.json({
      dailyMantra: {
        id: dailyMantra.id,
        text: dailyMantra.text,
        translation: dailyMantra.translation,
        category: dailyMantra.category,
        intention: dailyMantra.intention,
        pronunciation: dailyMantra.pronunciation,
        repetitions: dailyMantra.repetitions,
        bestTime: dailyMantra.bestTime,
        guide: dailyMantra.guide,
        origin: dailyMantra.origin,
      },
      dailyQuote: {
        id: dailyQuote.id,
        text: dailyQuote.text,
        author: dailyQuote.author,
        theme: dailyQuote.theme,
        insight: dailyQuote.insight,
      },
      dailyMeditation: dailyMeditation
        ? {
            id: dailyMeditation.id,
            name: dailyMeditation.name,
            type: dailyMeditation.type,
            description: dailyMeditation.description,
            duration: dailyMeditation.duration,
            difficulty: dailyMeditation.difficulty,
            benefits: dailyMeditation.benefits,
            guides: dailyMeditation.guides,
          }
        : null,
      dailyRitual: dailyRitual
        ? {
            id: dailyRitual.id,
            name: dailyRitual.name,
            type: dailyRitual.type,
            description: dailyRitual.description,
            duration: dailyRitual.duration,
            items: dailyRitual.items,
            purpose: dailyRitual.purpose,
            guides: dailyRitual.guides,
          }
        : null,
      userProfile,
    })
  } catch (error) {
    console.error("[v0] Error fetching daily practice:", error)
    return NextResponse.json({ error: "Failed to fetch daily practice" }, { status: 500 })
  }
}