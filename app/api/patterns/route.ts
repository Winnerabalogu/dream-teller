/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/patterns/route.ts
import { NextResponse } from 'next/server';
import { getDreams } from '@/services/db';

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
function findRecurringSymbols(dreams: { text: string; interpretation: any }[]) {
  const allSymbols: string[] = [];

  for (const dream of dreams) {
    if (dream.interpretation?.symbols) {
      allSymbols.push(...dream.interpretation.symbols);
    }
  }

  const counts = countOccurrences(allSymbols);
  const recurring = Object.fromEntries(
    Object.entries(counts).filter(([_, count]) => count >= dreams.length * 0.2)
  );

  return recurring;
}

// Identify dominant emotional or thematic patterns
function findThemes(dreams: { interpretation: any }[]) {
  const themes: string[] = [];

  for (const dream of dreams) {
    if (dream.interpretation?.themes) {
      themes.push(...dream.interpretation.themes);
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
