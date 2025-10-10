// src/services/horoscope.service.ts

import { prisma } from "@/lib/prisma"
import { HoroscopeData } from "@/lib/types"



export class HoroscopeService {
  // Get horoscope for a specific sign
  static async getBySign(sign: string): Promise<HoroscopeData | null> {
    return prisma.horoscope.findUnique({
      where: { sign },
    })
  }

  // Get all horoscopes
  static async getAll(): Promise<HoroscopeData[]> {
    return prisma.horoscope.findMany({
      orderBy: { sign: "asc" },
    })
  }

  // Check compatibility between two signs
  static async checkCompatibility(sign1: string, sign2: string): Promise<{
    compatible: boolean
    strength: string
  }> {
    const horoscope = await this.getBySign(sign1)
    if (!horoscope) return { compatible: false, strength: "" }

    const compatible = horoscope.compatibleSigns.includes(sign2)
    return {
      compatible,
      strength: compatible
        ? `${sign1} and ${sign2} flow well together`
        : `${sign1} and ${sign2} have different energies to learn from`,
    }
  }

  // Get all compatible signs for a given sign
  static async getCompatibilities(sign: string): Promise<string[]> {
    const horoscope = await this.getBySign(sign)
    return horoscope?.compatibleSigns || []
  }

  // Get personalized daily guidance
  static async getDailyGuidance(sign: string): Promise<{
    theme: string
    advice: string
    luckyNumber: number
    bestTime: string
  } | null> {
    const horoscope = await this.getBySign(sign)
    if (!horoscope) return null

    return {
      theme: horoscope.todayTheme,
      advice: horoscope.advice,
      luckyNumber: horoscope.luckyNumber,
      bestTime: horoscope.bestTime,
    }
  }

  // Get deep spiritual insights
  static async getSpiritualInsights(sign: string): Promise<{
    lifeLesson: string
    shadowAspect: string
    spiritualGift: string
    strength: string
    challenge: string
  } | null> {
    const horoscope = await this.getBySign(sign)
    if (!horoscope) return null

    return {
      lifeLesson: horoscope.lifeLesson,
      shadowAspect: horoscope.shadowAspect,
      spiritualGift: horoscope.spiritualGift,
      strength: horoscope.strength,
      challenge: horoscope.challenge,
    }
  }

  // Get all traits for a sign
  static async getTraits(sign: string): Promise<string[]> {
    const horoscope = await this.getBySign(sign)
    return horoscope?.traits || []
  }

  // Check if a person should do something based on their sign's best time
  static isOptimalTime(sign: string, hour: number): boolean {
    const timeRanges: Record<string, [number, number]> = {
      Aries: [5, 7],
      Taurus: [10, 12],
      Gemini: [12, 14],
      Cancer: [18, 20],
      Leo: [13, 15],
      Virgo: [7, 9],
      Libra: [14, 16],
      Scorpio: [20, 22],
      Sagittarius: [16, 18],
      Capricorn: [6, 8],
      Aquarius: [22, 24],
      Pisces: [19, 21],
    }

    const range = timeRanges[sign]
    return range && hour >= range[0] && hour < range[1]
  }
}
