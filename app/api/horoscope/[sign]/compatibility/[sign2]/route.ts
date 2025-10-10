
// src/app/api/horoscope/[sign]/compatibility/[sign2]/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ sign: string; sign2: string }> }
) {
  try {
    const { sign, sign2 } = await params

    const horoscope = await prisma.horoscope.findUnique({
      where: { sign },
      select: { compatibleSigns: true },
    })

    if (!horoscope) {
      return NextResponse.json(
        { error: "Horoscope not found" },
        { status: 404 }
      )
    }

    const compatible = horoscope.compatibleSigns.includes(sign2)

    return NextResponse.json({
      compatible,
      strength: compatible
        ? `${sign} and ${sign2} flow well together`
        : `${sign} and ${sign2} have different energies to learn from`,
    })
  } catch (error) {
    console.error("Compatibility check error:", error)
    return NextResponse.json(
      { error: "Failed to check compatibility" },
      { status: 500 }
    )
  }
}