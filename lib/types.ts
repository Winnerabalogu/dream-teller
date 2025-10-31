// lib/types.ts
export interface Interpretation {
  mainThemes: string[];
  emotionalTone: string;
  symbols: Array<{
    symbol: string;
    meaning: string;
  }>;
  personalInsight: string;
  guidance: string;
  aiNarrative?: string;
  jungianAnalysis?: string;
  emotionalLayers?: {
    surface: string;
    deeper: string;
    core: string;
  };
  archetypes?: string[];
  shadowWork?: string;
  growthOpportunities?: string[];
  followUpQuestions?: string[];
  spiritualDimension?: string;
}
export interface Dream {
  id: string;
  date: Date;
  text: string;
  interpretation: Interpretation;
  createdAt: Date;
  updatedAt: Date;
  userId?: string;
}

export interface Symbol {
  id: number;
  key: string;
  meaning: string;
  insight?: string | null;
  keywords: string[];
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  symbols?: Symbol[];
}

export interface DreamPattern {
  recurringSymbols: Record<string, number>;
  themeFrequency: Record<string, number>;
}

export interface Reflection {
  id: string;
  dreamId: string;
  text: string;
  createdAt: Date;
}

export interface User {
  id: string;
  name?: string;
  email: string;
  emailVerified?: Date;
  password: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Spiritual Profile
  starSign?: string;
  spiritType?: string;
  energyType?: string;
  birthDate?: Date;
}
export interface JournalEntry {
  id: string;
  userId: string;
  title?: string;
  content: string;
  mood?: string;
  tags: string[];
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}
export interface Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
}
export interface Session {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
}
export interface HoroscopeData {
  id: string
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
export interface SpiritualInsights {
  lifeLesson: string
  shadowAspect: string
  spiritualGift: string
  strength: string
  challenge: string
}
export interface DailyGuidance {
  theme: string
  advice: string
  luckyNumber: number
  bestTime: string
}

export interface HoroscopeData {
  id: string
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

export interface UseHoroscopeReturn {
  horoscope: HoroscopeData | null
  loading: boolean
  error: string | null
  spiritualInsights: SpiritualInsights | null
  dailyGuidance: DailyGuidance | null
  isOptimalTime: boolean
  compatibility: (sign2: string) => Promise<{ compatible: boolean; strength: string }>
}