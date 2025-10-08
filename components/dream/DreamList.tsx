// src/components/dream/DreamList.tsx
'use client';

import { useDreamContext } from '@/context/DreamContext';
import DreamCard from './DreamCard';
import { Loader2 } from 'lucide-react';

export default function DreamList() {
  const { dreams, loading } = useDreamContext();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
      </div>
    );
  }

  if (dreams.length === 0) {
    return (
      <div className="card text-center py-12">
        <p className="text-purple-300 text-lg">
          No dreams recorded yet. Start by sharing your first dream above!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {dreams.map((dream) => (
        <DreamCard key={dream.id} dream={dream} />
      ))}
    </div>
  );
}