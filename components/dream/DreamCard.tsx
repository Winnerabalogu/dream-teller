'use client';

import Link from 'next/link';
import { Dream } from '@/lib/types';
import { Calendar } from 'lucide-react';
import { formatDateShort, truncateText } from '@/lib/utils';

interface Props {
  dream: Dream;
  onClick?: () => void;
}

export default function DreamCard({ dream, onClick }: Props) {
  return (
    <Link
      href={`/dream/${dream.id}`}
      onClick={onClick}
      className="block p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all border border-white/10 hover:border-purple-400/30"
    >
      <div className="flex items-center space-x-2 text-xs text-purple-300 mb-2">
        <Calendar className="w-3 h-3" />
        <span>{formatDateShort(dream.date)}</span>
      </div>
      <p className="text-purple-200 text-sm leading-relaxed mb-2">
        &ldquo;{truncateText(dream.text, 70)}&rdquo;
      </p>
      {dream.interpretation.mainThemes.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {dream.interpretation.mainThemes.slice(0, 2).map((theme, idx) => (
            <span
              key={idx}
              className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full"
            >
              {theme}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}