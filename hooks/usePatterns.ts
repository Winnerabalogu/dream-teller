// hooks/usePatterns.ts
'use client';

import { useState, useEffect } from 'react';

export interface PatternData {
  recurringSymbols: Record<string, number>;
  themeFrequency: Record<string, number>;
  totalDreams?: number;
  insights?: string[];
  emotionalTrend?: Array<{ date: string; tone: string }>;
  emotionalPattern?: string | null;
}

export function usePatterns() {
  const [patterns, setPatterns] = useState<PatternData>({
    recurringSymbols: {},
    themeFrequency: {},
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load pattern data from API
  const fetchPatterns = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/patterns');
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = await res.json();
      setPatterns(data);
    } catch (err) {
      console.error('Pattern fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load patterns');
    } finally {
      setLoading(false);
    }
  };

  // Auto-load when component mounts
  useEffect(() => {
    fetchPatterns();
  }, []);

  return { patterns, loading, error, refresh: fetchPatterns };
}