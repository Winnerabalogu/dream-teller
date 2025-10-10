// src/app/api/patterns/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import type { Interpretation } from '@/lib/types';
export const runtime = "nodejs"
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const dreams = await prisma.dream.findMany({
      where: { userId: user.id },
      orderBy: { date: 'desc' },
    });

    if (dreams.length === 0) {
      return NextResponse.json({
        totalDreams: 0,
        recurringSymbols: {},
        themeFrequency: {},
        emotionalTrend: [],
      });
    }

    const symbolCounts: Record<string, number> = {};
    const themeCounts: Record<string, number> = {};
    const emotionalScores: { date: string; tone: string }[] = [];

    dreams.forEach((dream) => {
      const interp = dream.interpretation as Interpretation | null;
      if (!interp) return;

      // Count symbols
      if (Array.isArray(interp.symbols)) {
        interp.symbols.forEach((s) => {
          const key = s.symbol?.toLowerCase() || '';
          if (key) {
            symbolCounts[key] = (symbolCounts[key] || 0) + 1;
          }
        });
      }

      // Count themes
      if (Array.isArray(interp.mainThemes)) {
        interp.mainThemes.forEach((theme: string) => {
          const key = theme.toLowerCase();
          if (key) {
            themeCounts[key] = (themeCounts[key] || 0) + 1;
          }
        });
      }

      // Track emotional tone over time
      if (interp.emotionalTone) {
        emotionalScores.push({
          date: dream.date.toISOString().split('T')[0],
          tone: interp.emotionalTone,
        });
      }
    });

    const total = dreams.length;
    const threshold = 0.2; // 20% frequency

    // Filter for recurring (20%+ frequency)
    const recurringSymbols = Object.fromEntries(
      Object.entries(symbolCounts).filter(([, count]) => count / total >= threshold)
    );

    const themeFrequency = Object.fromEntries(
      Object.entries(themeCounts).filter(([, count]) => count / total >= threshold)
    );

    // Generate insights
    const insights: string[] = [];

    Object.entries(recurringSymbols)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .forEach(([symbol, count]) => {
        const percentage = Math.round((count / total) * 100);
        insights.push(
          `"${symbol}" appears in ${percentage}% of your dreams, representing a core theme in your subconscious.`
        );
      });

    // Detect emotional patterns
    const emotionalPattern = detectEmotionalPattern(emotionalScores);

    return NextResponse.json({
      totalDreams: total,
      recurringSymbols,
      themeFrequency,
      symbolCounts,
      themeCounts,
      insights,
      emotionalTrend: emotionalScores,
      emotionalPattern,
    });
  } catch (error) {
    console.error('[Patterns API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze patterns' },
      { status: 500 }
    );
  }
}

function detectEmotionalPattern(
  emotionalScores: { date: string; tone: string }[]
): string | null {
  if (emotionalScores.length < 3) return null;

  const recentEmotions = emotionalScores
    .slice(-3)
    .map((e) => e.tone.toLowerCase());

  const hasAnxiety = recentEmotions.some(
    (e) => e.includes('anxious') || e.includes('tension') || e.includes('stress')
  );
  const hasJoy = recentEmotions.some(
    (e) => e.includes('joy') || e.includes('uplifting') || e.includes('positive')
  );
  const hasReflection = recentEmotions.some(
    (e) => e.includes('contemplative') || e.includes('introspection')
  );

  if (hasAnxiety && !hasJoy) return 'anxious';
  if (hasJoy && !hasAnxiety) return 'positive';
  if (hasAnxiety && hasJoy) return 'mixed';
  if (hasReflection) return 'reflective';

  return null;
}