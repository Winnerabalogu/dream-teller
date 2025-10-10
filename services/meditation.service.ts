"use server"

import { prisma } from "@/lib/prisma"
import { getServerSession } from "@/lib/auth"
import { revalidatePath } from "next/cache"

async function getCurrentUser() {
  const session = await getServerSession()
  if (!session?.user?.email) {
    throw new Error("Not authenticated")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) {
    throw new Error("User not found")
  }

  return user
}

// Helper to transform guide steps from string[] to structured array
function transformSteps(steps: string[] | any): Array<{ step: number; title: string; description: string }> {
  if (Array.isArray(steps) && typeof steps[0] === 'string') {
    return steps.map((step: string, i: number) => ({
      step: i + 1,
      title: step,
      description: '', // Can enhance parsing if needed, e.g., split by ':' for title/desc
    }))
  }
  // If already structured (future seeds), return as-is
  return steps || []
}

// Get personalized daily mantra based on user's spiritual profile
export async function getDailyMantra() {
  const user = await getCurrentUser()

  // Get current day of year for consistent daily selection
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)

  // Build filter based on user's spiritual profile
  const where: any = {}

  if (user.spiritType) {
    where.element = user.spiritType
  }

  if (user.energyType) {
    where.energy = user.energyType
  }

  if (user.starSign) {
    where.signs = {
      has: user.starSign,
    }
  }

  // Get matching mantras
  const mantras = await prisma.mantra.findMany({
    where: Object.keys(where).length > 0 ? where : undefined,
  })

  // If no matches, get all mantras
  const allMantras = mantras.length > 0 ? mantras : await prisma.mantra.findMany()

  // Select mantra based on day of year for consistency
  const selectedMantra = allMantras[dayOfYear % allMantras.length]

  return selectedMantra
}

// Get personalized daily quote based on user's spiritual profile
export async function getDailyQuote() {
  const user = await getCurrentUser()

  // Get current day of year for consistent daily selection
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)

  // Build filter based on user's spiritual profile
  const where: any = {}

  if (user.energyType) {
    where.energy = user.energyType
  }

  if (user.starSign) {
    where.signs = {
      has: user.starSign,
    }
  }

  // Get matching quotes
  const quotes = await prisma.quote.findMany({
    where: Object.keys(where).length > 0 ? where : undefined,
  })

  // If no matches, get all quotes
  const allQuotes = quotes.length > 0 ? quotes : await prisma.quote.findMany()

  // Select quote based on day of year for consistency
  const selectedQuote = allQuotes[dayOfYear % allQuotes.length]

  return selectedQuote
}

// Get all mantras organized by category
export async function getAllMantras() {
  const mantras = await prisma.mantra.findMany({
    orderBy: { category: "asc" },
  })

  return mantras
}

// Get all quotes organized by theme
export async function getAllQuotes() {
  const quotes = await prisma.quote.findMany({
    orderBy: { theme: "asc" },
  })

  return quotes
}

// Get user's spiritual profile for personalization context
export async function getUserProfile() {
  const user = await getCurrentUser()

  return {
    starSign: user.starSign,
    spiritType: user.spiritType,
    energyType: user.energyType,
  }
}

// Track meditation interaction (for future insights)
export async function trackMeditationInteraction(data: {
  type: "mantra" | "quote" | "meditation" | "ritual"
  itemId: string
  duration?: number
  mood?: string
  notes?: string
}) {
  const user = await getCurrentUser()

  // Create a meditation log entry
  const log = await prisma.meditationLog.create({
    data: {
      userId: user.id,
      mantraId: data.type === "mantra" ? data.itemId : null,
      quoteId: data.type === "quote" ? data.itemId : null,
      meditationId: data.type === "meditation" ? data.itemId : null,
      ritualId: data.type === "ritual" ? data.itemId : null,
      duration: data.duration,
      mood: data.mood,
      notes: data.notes,
    },
  })

  console.log(`[v0] User ${user.id} interacted with ${data.type} ${data.itemId}`)

  revalidatePath("/dashboard/meditation")

  return log
}

export async function getMeditationInsights() {
  const user = await getCurrentUser()

  // Get all user's meditation logs
  const logs = await prisma.meditationLog.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
    take: 30, // Last 30 interactions
  })

  // Calculate insights
  const totalSessions = logs.length
  const mantraCount = logs.filter((log) => log.mantraId).length
  const quoteCount = logs.filter((log) => log.quoteId).length
  const meditationCount = logs.filter((log) => log.meditationId).length
  const ritualCount = logs.filter((log) => log.ritualId).length

  // Calculate average duration for sessions with duration
  const sessionsWithDuration = logs.filter((log) => log.duration)
  const avgDuration =
    sessionsWithDuration.length > 0
      ? sessionsWithDuration.reduce((sum, log) => sum + (log.duration || 0), 0) / sessionsWithDuration.length
      : 0

  // Get most common mood
  const moodCounts = logs.reduce(
    (acc, log) => {
      if (log.mood) {
        acc[log.mood] = (acc[log.mood] || 0) + 1
      }
      return acc
    },
    {} as Record<string, number>,
  )

  const mostCommonMood =
    Object.keys(moodCounts).length > 0 ? Object.entries(moodCounts).sort(([, a], [, b]) => b - a)[0][0] : null

  // Get streak (consecutive days with at least one session)
  let currentStreak = 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const sortedLogs = logs.sort((a, b) => b.date.getTime() - a.date.getTime())
  const uniqueDates = [...new Set(sortedLogs.map((log) => log.date.toDateString()))]

  for (let i = 0; i < uniqueDates.length; i++) {
    const logDate = new Date(uniqueDates[i])
    logDate.setHours(0, 0, 0, 0)
    const expectedDate = new Date(today)
    expectedDate.setDate(today.getDate() - i)

    if (logDate.getTime() === expectedDate.getTime()) {
      currentStreak++
    } else {
      break
    }
  }

  return {
    totalSessions,
    mantraCount,
    quoteCount,
    meditationCount,
    ritualCount,
    avgDuration: Math.round(avgDuration),
    mostCommonMood,
    currentStreak,
    recentLogs: logs.slice(0, 5),
  }
}

// Get daily meditation based on user's spiritual profile
export async function getDailyMeditation() {
  const user = await getCurrentUser()
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)

  const where: any = {}
  if (user.spiritType) where.element = user.spiritType
  if (user.energyType) where.energy = user.energyType
  if (user.starSign) {
    where.signs = { has: user.starSign }
  }

  const meditations = await prisma.meditation.findMany({
    where: Object.keys(where).length > 0 ? where : undefined,
    include: { guides: true },
  })

  const allMeditations =
    meditations.length > 0 ? meditations : await prisma.meditation.findMany({ include: { guides: true } })
  const selected = allMeditations[dayOfYear % allMeditations.length]

  // Transform steps
  return {
    ...selected,
    guides: selected.guides.map(g => ({
      ...g,
      steps: transformSteps(g.steps),
    })),
  }
}

// Get daily ritual based on user's spiritual profile
export async function getDailyRitual() {
  const user = await getCurrentUser()
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)

  const where: any = {}
  if (user.spiritType) where.element = user.spiritType
  if (user.energyType) where.energy = user.energyType
  if (user.starSign) {
    where.signs = { has: user.starSign }
  }

  const rituals = await prisma.ritual.findMany({
    where: Object.keys(where).length > 0 ? where : undefined,
    include: { guides: true },
  })

  const allRituals = rituals.length > 0 ? rituals : await prisma.ritual.findMany({ include: { guides: true } })
  const selected = allRituals[dayOfYear % allRituals.length]

  // Transform steps
  return {
    ...selected,
    guides: selected.guides.map(g => ({
      ...g,
      steps: transformSteps(g.steps),
    })),
  }
}

// Get all meditations organized by type
export async function getAllMeditations() {
  const meditations = await prisma.meditation.findMany({
    include: { guides: true },
    orderBy: { type: "asc" },
  })

  // Transform steps
  return meditations.map(m => ({
    ...m,
    guides: m.guides.map(g => ({
      ...g,
      steps: transformSteps(g.steps),
    })),
  }))
}

// Get all rituals organized by type
export async function getAllRituals() {
  const rituals = await prisma.ritual.findMany({
    include: { guides: true },
    orderBy: { type: "asc" },
  })

  // Transform steps
  return rituals.map(r => ({
    ...r,
    guides: r.guides.map(g => ({
      ...g,
      steps: transformSteps(g.steps),
    })),
  }))
}