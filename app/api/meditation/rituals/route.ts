// api/meditation/rituals/route.ts
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { getAllRituals } from "@/services/meditation.service"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const rituals = await getAllRituals()
    return NextResponse.json(rituals)
  } catch (error) {
    console.error("[v0] Error fetching rituals:", error)
    return NextResponse.json({ error: "Failed to fetch rituals" }, { status: 500 })
  }
}