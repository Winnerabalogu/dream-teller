// src/hooks/useHoroscope.ts
"use client"

import { useEffect, useState } from "react"

interface HoroscopeData {
  sign: string
  element: string
  rulingPlanet: string
  traits: string[]
  strength: string
  challenge: string
  compatibleSigns: string[]
  todayTheme: string
  advice: string
  luckyNumber: number
  bestTime: string
  lifeLesson: string
  shadowAspect: string
  spiritualGift: string
}

interface DailyReading {
  theme: string
  advice: string
  affirmation: string
  energyLevel: number
  energyDescription: string
  focusAreas: string[]
  luckyElement: string
  date: string
}

interface SpiritualInsights {
  lifeLesson: string
  shadowAspect: string
  spiritualGift: string
  strength: string
  challenge: string
}

interface DailyGuidance {
  theme: string
  advice: string
  luckyNumber: number
  bestTime: string
  affirmation?: string
  energyLevel?: number
  energyDescription?: string
  focusAreas?: string[]
  luckyElement?: string
}

interface UseHoroscopeReturn {
  horoscope: HoroscopeData | null
  dailyReading: DailyReading | null
  loading: boolean
  error: string | null
  spiritualInsights: SpiritualInsights | null
  dailyGuidance: DailyGuidance | null
  isOptimalTime: boolean
  compatibility: (sign2: string) => Promise<{ compatible: boolean; strength: string }>
}

export function useHoroscope(sign?: string): UseHoroscopeReturn {
  const [horoscope, setHoroscope] = useState<HoroscopeData | null>(null)
  const [dailyReading, setDailyReading] = useState<DailyReading | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [spiritualInsights, setSpiritualInsights] = useState<SpiritualInsights | null>(null)
  const [dailyGuidance, setDailyGuidance] = useState<DailyGuidance | null>(null)
  const [isOptimalTime, setIsOptimalTime] = useState(false)

  useEffect(() => {
    if (!sign) {
      setHoroscope(null)
      setDailyReading(null)
      setSpiritualInsights(null)
      setDailyGuidance(null)
      setIsOptimalTime(false)
      return
    }

    const fetchHoroscope = async () => {
      setLoading(true)
      setError(null)

      try {
        // Fetch base horoscope
        const baseResponse = await fetch(`/api/horoscope/${sign}`)
        if (!baseResponse.ok) {
          throw new Error("Horoscope not found for this sign")
        }
        const baseData: HoroscopeData = await baseResponse.json()
        setHoroscope(baseData)

        // Fetch daily reading
        const dailyResponse = await fetch(`/api/horoscope/${sign}/daily`)
        if (!dailyResponse.ok) {
          throw new Error("Failed to fetch daily reading")
        }
        const dailyData: DailyReading = await dailyResponse.json()
        setDailyReading(dailyData)

        // Extract spiritual insights
        setSpiritualInsights({
          lifeLesson: baseData.lifeLesson,
          shadowAspect: baseData.shadowAspect,
          spiritualGift: baseData.spiritualGift,
          strength: baseData.strength,
          challenge: baseData.challenge,
        })

        // Combine base and daily guidance
        setDailyGuidance({
          theme: dailyData.theme,
          advice: dailyData.advice,
          luckyNumber: baseData.luckyNumber,
          bestTime: baseData.bestTime,
          affirmation: dailyData.affirmation,
          energyLevel: dailyData.energyLevel,
          energyDescription: dailyData.energyDescription,
          focusAreas: dailyData.focusAreas,
          luckyElement: dailyData.luckyElement,
        })

        // Check if current time is optimal
        const currentHour = new Date().getHours()
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
        setIsOptimalTime(range ? currentHour >= range[0] && currentHour < range[1] : false)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch horoscope")
      } finally {
        setLoading(false)
      }
    }

    fetchHoroscope()
  }, [sign])

  const compatibility = async (sign2: string) => {
    if (!sign) return { compatible: false, strength: "" }

    try {
      const response = await fetch(`/api/horoscope/${sign}/compatibility/${sign2}`)
      if (!response.ok) {
        return { compatible: false, strength: "" }
      }

      return await response.json()
    } catch {
      return { compatible: false, strength: "" }
    }
  }

  return {
    horoscope,
    dailyReading,
    loading,
    error,
    spiritualInsights,
    dailyGuidance,
    isOptimalTime,
    compatibility,
  }
}