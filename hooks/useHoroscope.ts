// src/hooks/useHoroscope.ts
"use client"

import { UseHoroscopeReturn, HoroscopeData, SpiritualInsights, DailyGuidance } from "@/lib/types"
import { useEffect, useState } from "react"

export function useHoroscope(sign?: string): UseHoroscopeReturn {
  const [horoscope, setHoroscope] = useState<HoroscopeData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [spiritualInsights, setSpiritualInsights] = useState<SpiritualInsights | null>(null)
  const [dailyGuidance, setDailyGuidance] = useState<DailyGuidance | null>(null)
  const [isOptimalTime, setIsOptimalTime] = useState(false)

  useEffect(() => {
    if (!sign) {
      setHoroscope(null)
      setSpiritualInsights(null)
      setDailyGuidance(null)
      setIsOptimalTime(false)
      return
    }

    const fetchHoroscope = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/horoscope/${sign}`)
        if (!response.ok) {
          throw new Error("Horoscope not found for this sign")
        }

        const data: HoroscopeData = await response.json()
        setHoroscope(data)

        // Extract spiritual insights
        setSpiritualInsights({
          lifeLesson: data.lifeLesson,
          shadowAspect: data.shadowAspect,
          spiritualGift: data.spiritualGift,
          strength: data.strength,
          challenge: data.challenge,
        })

        // Extract daily guidance
        setDailyGuidance({
          theme: data.todayTheme,
          advice: data.advice,
          luckyNumber: data.luckyNumber,
          bestTime: data.bestTime,
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
    loading,
    error,
    spiritualInsights,
    dailyGuidance,
    isOptimalTime,
    compatibility,
  }
}