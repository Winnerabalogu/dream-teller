"use client"

import useSWR from "swr"
import { useState } from "react"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useDailyPractice() {
  const { data, error, isLoading } = useSWR("/api/meditation/daily-practice", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000, // Cache for 1 minute
  })

  return {
    dailyPractice: data,
    isLoading,
    error,
  }
}

export function useMantras() {
  const { data, error, isLoading } = useSWR("/api/meditation/mantras", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 300000, // Cache for 5 minutes
  })

  return {
    mantras: data || [],
    isLoading,
    error,
  }
}

export function useQuotes() {
  const { data, error, isLoading } = useSWR("/api/meditation/quotes", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 300000, // Cache for 5 minutes
  })

  return {
    quotes: data || [],
    isLoading,
    error,
  }
}

export function useMeditations() {
  const { data, error, isLoading } = useSWR("/api/meditation/meditations", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 300000, // Cache for 5 minutes
  })

  return {
    meditations: data || [],
    isLoading,
    error,
  }
}

export function useRituals() {
  const { data, error, isLoading } = useSWR("/api/meditation/rituals", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 300000, // Cache for 5 minutes
  })

  return {
    rituals: data || [],
    isLoading,
    error,
  }
}

export function useMeditationTracking() {
  const [isTracking, setIsTracking] = useState(false)

  const trackInteraction = async (data: {
    type: "mantra" | "quote" | "meditation" | "ritual"
    itemId: string
    duration?: number
    mood?: string
    notes?: string
  }) => {
    setIsTracking(true)
    try {
      const response = await fetch("/api/meditation/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to track interaction")
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error("[v0] Error tracking interaction:", error)
      throw error
    } finally {
      setIsTracking(false)
    }
  }

  return {
    trackInteraction,
    isTracking,
  }
}

export function useMeditationInsights() {
  const { data, error, isLoading, mutate } = useSWR("/api/meditation/insights", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // Cache for 1 minute
  })

  return {
    insights: data,
    isLoading,
    error,
    refresh: mutate,
  }
}
