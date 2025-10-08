'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Dream, Symbol, DreamPattern } from '@/lib/types';
import { computePatterns } from '@/lib/utils';

interface DreamContextType {
  dreams: Dream[];
  symbols: Symbol[];
  patterns: DreamPattern;
  loading: boolean;
  refetchDreams: () => Promise<void>;
  refetchSymbols: () => Promise<void>;
  refetchAll: () => Promise<void>;
}

const DreamContext = createContext<DreamContextType | undefined>(undefined);

export function DreamProvider({ children }: { children: ReactNode }) {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [symbols, setSymbols] = useState<Symbol[]>([]);
  const [loading, setLoading] = useState(true);
  const [patterns, setPatterns] = useState<DreamPattern>({
    recurringSymbols: {},
    themeFrequency: {},
  });

  const fetchDreams = async () => {
    try {
      const res = await fetch('/api/dreams', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setDreams(data);
        setPatterns(computePatterns(data));
      }
    } catch (error) {
      console.error('Error fetching dreams:', error);
    }
  };

  const fetchSymbols = async () => {
    try {
      const res = await fetch('/api/symbols', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setSymbols(data);
      }
    } catch (error) {
      console.error('Error fetching symbols:', error);
    }
  };

  const refetchAll = async () => {
    setLoading(true);
    await Promise.all([fetchDreams(), fetchSymbols()]);
    setLoading(false);
  };

  useEffect(() => {
    refetchAll();
  }, []);

  const value: DreamContextType = {
    dreams,
    symbols,
    patterns,
    loading,
    refetchDreams: fetchDreams,
    refetchSymbols: fetchSymbols,
    refetchAll,
  };

  return <DreamContext.Provider value={value}>{children}</DreamContext.Provider>;
}

export function useDreamContext() {
  const context = useContext(DreamContext);
  if (!context) {
    throw new Error('useDreamContext must be used within DreamProvider');
  }
  return context;
}