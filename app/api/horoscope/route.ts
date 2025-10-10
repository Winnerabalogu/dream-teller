
// src/app/api/horoscope/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const horoscopes = await prisma.horoscope.findMany({
      orderBy: { sign: "asc" },
    })

    return NextResponse.json(horoscopes)
  } catch (error) {
    console.error("Horoscopes fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch horoscopes" },
      { status: 500 }
    )
  }
}
