// api/meditation/track/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { trackMeditationInteraction } from "@/services/meditation.service"

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { type, itemId, duration, mood, notes } = body

    if (!type || !itemId) {
      return NextResponse.json({ error: "Missing required fields: type and itemId" }, { status: 400 })
    }

    const log = await trackMeditationInteraction({
      type,
      itemId,
      duration,
      mood,
      notes,
    })

    return NextResponse.json({ success: true, log })
  } catch (error) {
    console.error("[v0] Error tracking meditation interaction:", error)
    return NextResponse.json({ error: "Failed to track interaction" }, { status: 500 })
  }
}