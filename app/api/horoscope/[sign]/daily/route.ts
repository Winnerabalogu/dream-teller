// src/app/api/horoscope/[sign]/daily/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { generateDailyHoroscope } from "@/lib/astrology/horoscope-engine"

export const runtime = "nodejs"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ sign: string }> }
) {
  try {
    const { sign } = await params
    const today = new Date().toISOString().split('T')[0]

    // Check if we already have today's reading
    const existingReading = await prisma.dailyHoroscope.findUnique({
      where: {
        sign_date: {
          sign,
          date: today,
        },
      },
    })

    if (existingReading) {
      return NextResponse.json(existingReading)
    }

    // Get the base horoscope data
    const baseHoroscope = await prisma.horoscope.findUnique({
      where: { sign },
    })

    if (!baseHoroscope) {
      return NextResponse.json(
        { error: "Horoscope not found" },
        { status: 404 }
      )
    }

    // Generate daily reading using our astrological engine
    const dailyReading = generateDailyHoroscope(sign, baseHoroscope, new Date())

    // Save to database
    const savedReading = await prisma.dailyHoroscope.create({
      data: {
        sign,
        date: today,
        theme: dailyReading.theme,
        advice: dailyReading.advice,
        affirmation: dailyReading.affirmation,
        energyLevel: dailyReading.energyLevel,
        energyDescription: dailyReading.energyDescription,
        focusAreas: dailyReading.focusAreas,
        luckyElement: dailyReading.luckyElement,
      },
    })

    return NextResponse.json(savedReading)
  } catch (error) {
    console.error("Daily horoscope generation error:", error)
    return NextResponse.json(
      { error: "Failed to generate daily horoscope" },
      { status: 500 }
    )
  }
}