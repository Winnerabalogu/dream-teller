'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Loader2 } from 'lucide-react';
import { searchDreams } from '@/services/db';
import { Dream } from '@/lib/types';

interface SymbolItem {
  key: string;
  meaning: string;
}

interface SearchBarProps {
  data?: SymbolItem[]; // optional for local filtering
}

export default function SearchBar({ data }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<(Dream | SymbolItem)[]>([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async (value: string) => {
    setQuery(value);

    // If local data (like symbols) is provided → use client-side filtering
    if (data) {
      if (value.trim().length < 2) {
        setResults([]);
        return;
      }

      const filtered = data.filter(
        (item) =>
          item.key.toLowerCase().includes(value.toLowerCase()) ||
          item.meaning.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
      return;
    }

    // Otherwise → async search from DB (e.g. dreams)
    if (value.trim().length < 2) {
      setResults([]);
      return;
    }

    setSearching(true);
    try {
      const dreams = await searchDreams(value);
      setResults(dreams);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Input Field */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
        {searching && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400 animate-spin" />
        )}
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={data ? 'Search symbols...' : 'Search your dreams...'}
          className="w-full pl-10 pr-12 bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400"
          disabled={searching}
        />
      </div>

      {/* Render Results */}
      {results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-xl max-h-96 overflow-y-auto z-50">
          {data ? (
            // Local symbol results
            (results as SymbolItem[]).map((item) => (
              <div
                key={item.key}
                className="block p-4 hover:bg-white/10 border-b border-white/10 last:border-0"
              >
                <p className="text-sm text-purple-200 font-medium capitalize">
                  {item.key}
                </p>
                <p className="text-xs text-purple-300/70">{item.meaning}</p>
              </div>
            ))
          ) : (
            // Dream results (with links)
            (results as Dream[]).map((dream) => (
              <Link
                key={dream.id}
                href={`/dream/${dream.id}`}
                className="block p-4 hover:bg-white/10 border-b border-white/10 last:border-0"
              >
                <p className="text-sm text-purple-200 line-clamp-2">
                  {dream.text}
                </p>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
