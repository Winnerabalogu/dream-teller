// hooks/useDreams.ts
'use client';

import useSWR from 'swr';
import { Dream, DreamPattern } from '@/lib/types';
import { computePatterns } from '@/lib/utils';

const fetcher = (url: string) => fetch(url).then((r) => {
  if (!r.ok) throw new Error('Fetch failed');
  return r.json();
});

export function useDreams() {
  const { data, error, mutate } = useSWR<Dream[]>('/api/dreams', fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 0,
  });

  const dreams = data ?? [];
  const loading = !data && !error;
  const patterns: DreamPattern = computePatterns(dreams);

  async function refetch() {
    await mutate();
  }

  return {
    dreams,
    loading,
    error: error ? (error as Error).message : null,
    refetch,
    patterns,
  };
}