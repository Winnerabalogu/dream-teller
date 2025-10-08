// src/app/api/insights/route.ts
import { NextResponse } from 'next/server';
import { getDreams } from '@/services/db';
import { analyzeRecurringPatterns, sentimentScore } from '@/lib/analysis';

export async function GET() {
  try {
    const dreams = await getDreams();
    const interpretations = dreams.map(d => d.interpretation);
    const analysis = analyzeRecurringPatterns(interpretations);
    const sentimentTrend = dreams.map(d => ({
      date: d.date,
      score: sentimentScore((d.interpretation.personalInsight || '') + ' ' + (d.interpretation.emotionalTone || '')),
    }));
    return NextResponse.json({ ...analysis, sentimentTrend });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}
