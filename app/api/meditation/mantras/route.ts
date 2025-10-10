// api/meditation/mantras/route.ts
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { getAllMantras } from "@/services/meditation.service"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const mantras = await getAllMantras()
    return NextResponse.json(mantras)
  } catch (error) {
    console.error("[v0] Error fetching mantras:", error)
    return NextResponse.json({ error: "Failed to fetch mantras" }, { status: 500 })
  }
}