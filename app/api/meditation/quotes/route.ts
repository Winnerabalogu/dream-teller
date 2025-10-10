// api/meditation/quotes/route.ts
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { getAllQuotes } from "@/services/meditation.service"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const quotes = await getAllQuotes()
    return NextResponse.json(quotes)
  } catch (error) {
    console.error("[v0] Error fetching quotes:", error)
    return NextResponse.json({ error: "Failed to fetch quotes" }, { status: 500 })
  }
}