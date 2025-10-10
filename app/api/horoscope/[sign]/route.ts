// src/app/api/horoscope/[sign]/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ sign: string }> }
) {
  try {
    const { sign } = await params

    const horoscope = await prisma.horoscope.findUnique({
      where: { sign },
    })

    if (!horoscope) {
      return NextResponse.json(
        { error: "Horoscope not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(horoscope)
  } catch (error) {
    console.error("Horoscope fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch horoscope" },
      { status: 500 }
    )
  }
}
