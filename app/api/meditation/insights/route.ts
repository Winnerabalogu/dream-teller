import { NextResponse } from "next/server"
import { getMeditationInsights } from "@/services/meditation.service"
export const runtime = "nodejs"
export async function GET() {
  try {
    const insights = await getMeditationInsights()
    return NextResponse.json(insights)
  } catch (error) {
    console.error("[v0] Error fetching meditation insights:", error)
    return NextResponse.json({ error: "Failed to fetch insights" }, { status: 500 })
  }
}
