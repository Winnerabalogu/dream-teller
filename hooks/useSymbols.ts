'use client';

import { useState, useEffect } from 'react';
import { Symbol } from '@/lib/types';

export function useSymbols() {
  const [symbols, setSymbols] = useState<Symbol[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSymbols = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/symbols', { cache: 'no-store' });
      
      if (!res.ok) {
        throw new Error('Failed to fetch symbols');
      }
      
      const data = await res.json();
      setSymbols(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching symbols:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSymbols();
  }, []);

  return {
    symbols,
    loading,
    error,
    refetch: fetchSymbols,
  };
}