// lib/types.ts - FIXED
export interface Interpretation {
  mainThemes: string[];
  emotionalTone: string;
  symbols: { symbol: string; meaning: string }[];
  personalInsight: string;
  guidance: string;
}

export interface Dream {
  id: string;
  date: Date;
  text: string;
  interpretation: Interpretation;
  createdAt: Date;
  updatedAt: Date;
}

export interface Symbol {
  id: number;
  key: string;
  meaning: string;
  insight?: string | null; // FIX: Match Prisma's nullable insight
  keywords?: string[];
  categoryId?: number;
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

export interface ExportData {
  dreams: Dream[];
  symbols: Symbol[];
  exportDate: string;
  version: string;
}

export interface Reflection {
  id: string;
  dreamId: string;
  text: string;
  createdAt: Date;
}
