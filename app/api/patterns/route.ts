import { NextResponse } from 'next/server';
import { getDreams } from '@/services/db';
import type { Dream } from '@/lib/types';

// Utility to find frequency of items in an array
function countOccurrences(items: string[]): Record<string, number> {
  return items.reduce((acc, item) => {
    const key = item.trim().toLowerCase();
    if (!key) return acc;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

// Identify recurring symbols (20%+ frequency threshold)
function findRecurringSymbols(dreams: Dream[]) {
  const allSymbols: string[] = [];

  for (const dream of dreams) {
    if (dream.interpretation?.symbols && Array.isArray(dream.interpretation.symbols)) {
      // Extract symbol names from {symbol, meaning} objects
      const symbolNames = dream.interpretation.symbols.map(s => s.symbol);
      allSymbols.push(...symbolNames);
    }
  }

  const counts = countOccurrences(allSymbols);
  const recurring = Object.fromEntries(
    Object.entries(counts).filter(([_, count]) => count >= dreams.length * 0.2)
  );

  return recurring;
}

// Identify dominant emotional or thematic patterns
function findThemes(dreams: Dream[]) {
  const themes: string[] = [];

  for (const dream of dreams) {
    if (dream.interpretation?.mainThemes && Array.isArray(dream.interpretation.mainThemes)) {
      themes.push(...dream.interpretation.mainThemes);
    }
  }

  return countOccurrences(themes);
}

export async function GET() {
  try {
    const dreams = await getDreams();

    if (!dreams.length) {
      return NextResponse.json({
        recurringSymbols: {},
        themeFrequency: {},
      });
    }

    const recurringSymbols = findRecurringSymbols(dreams);
    const themeFrequency = findThemes(dreams);

    return NextResponse.json({ recurringSymbols, themeFrequency });
  } catch (error) {
    console.error('Error generating patterns:', error);
    return NextResponse.json(
      { error: 'Failed to analyze patterns' },
      { status: 500 }
    );
  }
}
