export type MeditationTab = "daily" | "quotes" | "meditations" | "mantras" | "rituals"

export interface MeditationGuide {
  id: string
  title: string
  author: string
  tradition: string
  steps: Array<{ step: number; title: string; description: string }>
  duration: number
}

export interface Meditation {
  id: string
  name: string
  type: string
  description: string
  duration: number
  difficulty: string
  element: string
  energy: string
  signs: string[]
  benefits: string[]
  guides: MeditationGuide[]
}

export interface RitualGuide {
  id: string
  title: string
  tradition: string
  steps: Array<{ step: number; title: string; description: string }>
  timing?: string
  preparation: string
  closing: string
}

export interface Ritual {
  id: string
  name: string
  type: string
  description: string
  duration: number
  element: string
  energy: string
  signs: string[]
  items: string[]
  purpose: string
  guides: RitualGuide[]
}

export interface DailyPractice {
  dailyMantra: {
    id: string
    text: string
    translation: string | null
    category: string
    intention: string
    pronunciation?: string | null
    repetitions?: number
    bestTime?: string | null
    guide?: any
    origin?: string | null
  }
  dailyQuote: {
    id: string
    text: string
    author: string
    theme: string
    insight: string
  }
  dailyMeditation: {
    id: string
    name: string
    type: string
    description: string
    duration: number
    difficulty: string
    benefits: string[]
    guides: MeditationGuide[]
  } | null
  dailyRitual: {
    id: string
    name: string
    type: string
    description: string
    duration: number
    items: string[]
    purpose: string
    guides: RitualGuide[]
  } | null
  userProfile: {
    starSign: string | null
    spiritType: string | null
    energyType: string | null
  }
}

export interface Mantra {
  id: string
  text: string
  translation: string | null
  category: string
  element: string
  energy: string
  signs: string[]
  intention: string
  pronunciation?: string | null
  repetitions?: number
  bestTime?: string | null
  guide?: any
  origin?: string | null
}

export interface Quote {
  id: string
  text: string
  author: string
  theme: string
  element: string
  energy: string
  signs: string[]
  insight: string | null
}

export interface Props {
  dailyPractice: DailyPractice
  allMantras: Mantra[]
  allQuotes: Quote[]
  allMeditations: Meditation[]
  allRituals: Ritual[]
}

