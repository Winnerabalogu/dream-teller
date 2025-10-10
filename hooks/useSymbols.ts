// hooks/useSymbols.ts
'use client';

import { useState, useEffect } from 'react';
import { Symbol } from '@/lib/types';
import { toast } from 'sonner';

export function useSymbols() {
  const [symbols, setSymbols] = useState<Symbol[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSymbols = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/symbols');

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

  const deleteSymbol = async (id: number) => {
    try {
      const res = await fetch(`/api/symbols/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete symbol');
      }

      toast.success('Symbol deleted successfully');
      await fetchSymbols();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete symbol');
      console.error('Error deleting symbol:', err);
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
    deleteSymbol,
  };
}