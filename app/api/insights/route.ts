import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { analyzeRecurringPatterns } from '@/lib/interpretation';
import type { Interpretation } from '@/lib/types';
export const runtime = "nodejs"
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const dreams = await prisma.dream.findMany({
      where: { userId: user.id },
      orderBy: { date: 'desc' },
    });

    if (dreams.length < 2) {
      return NextResponse.json({
        insights: ['Record more dreams to unlock deeper pattern insights.'],
        symbolFreq: {},
        themeFreq: {},
        sentimentTrend: [],
        correlations: [],
      });
    }

    // Extract interpretations
    const interpretations = dreams
      .map((d) => d.interpretation as Interpretation | null)
      .filter((i): i is Interpretation => i !== null);

    if (interpretations.length === 0) {
      return NextResponse.json({
        insights: ['No interpretations found yet.'],
        symbolFreq: {},
        themeFreq: {},
        sentimentTrend: [],
        correlations: [],
      });
    }

    // Use pattern analysis
    const patterns = analyzeRecurringPatterns(interpretations);

    // Build sentiment trend
    const sentimentTrend = dreams.map((dream) => {
      const interp = dream.interpretation as Interpretation | null;
      const score = calculateSentimentScore(interp?.emotionalTone || '');

      return {
        date: dream.date.toISOString().split('T')[0],
        score,
      };
    });

    // Detect symbol-theme correlations
    const correlations = detectCorrelations(interpretations);

    return NextResponse.json({
      insights: patterns.insights,
      symbolFreq: patterns.symbolFreq,
      themeFreq: patterns.themeFreq,
      sentimentTrend: sentimentTrend.reverse(),
      correlations,
      trends: patterns.trends,
      emotionalPattern: patterns.emotionalPattern,
    });
  } catch (error) {
    console.error('[Insights API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate insights' },
      { status: 500 }
    );
  }
}

function calculateSentimentScore(emotionalTone: string): number {
  const tone = emotionalTone.toLowerCase();

  // Positive indicators: +1
  if (
    tone.includes('uplifting') ||
    tone.includes('joy') ||
    tone.includes('positive') ||
    tone.includes('expansive') ||
    tone.includes('release')
  ) {
    return 0.8;
  }

  // Mixed/balanced: 0
  if (tone.includes('blend') || tone.includes('duality') || tone.includes('balance')) {
    return 0;
  }

  // Negative indicators: -1
  if (
    tone.includes('anxious') ||
    tone.includes('tension') ||
    tone.includes('stress') ||
    tone.includes('conflict')
  ) {
    return -0.8;
  }

  // Neutral/reflective: -0.2
  return -0.2;
}

function detectCorrelations(interpretations: Interpretation[]): string[] {
  const correlations: string[] = [];

  if (interpretations.length < 3) return correlations;

  // Map themes to symbols
  const themeToSymbols: Record<string, Set<string>> = {};
  const symbolToThemes: Record<string, Set<string>> = {};

  interpretations.forEach((interp) => {
    // mainThemes is now string[]
    interp.mainThemes.forEach((theme: string) => {
      if (!themeToSymbols[theme]) {
        themeToSymbols[theme] = new Set();
      }
      interp.symbols.forEach((s) => {
        themeToSymbols[theme].add(s.symbol.toLowerCase());
        if (!symbolToThemes[s.symbol.toLowerCase()]) {
          symbolToThemes[s.symbol.toLowerCase()] = new Set();
        }
        symbolToThemes[s.symbol.toLowerCase()].add(theme);
      });
    });
  });

  // Find strong correlations (symbols appearing with same themes)
  Object.entries(symbolToThemes).forEach(([symbol, themes]) => {
    if (themes.size >= 2) {
      const themeList = Array.from(themes).slice(0, 2).join(' and ');
      correlations.push(
        `${symbol.charAt(0).toUpperCase()}${symbol.slice(1)} frequently appears with ${themeList} themes`
      );
    }
  });

  // Limit to top correlations
  return correlations.slice(0, 5);
}