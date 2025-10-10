// api/meditation/meditations/route.ts
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { getAllMeditations } from "@/services/meditation.service"
export const runtime = "nodejs"
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const meditations = await getAllMeditations()
    return NextResponse.json(meditations)
  } catch (error) {
    console.error("[v0] Error fetching meditations:", error)
    return NextResponse.json({ error: "Failed to fetch meditations" }, { status: 500 })
  }
}