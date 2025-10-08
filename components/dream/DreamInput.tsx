/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Sparkles } from 'lucide-react';
import { createDream } from '@/services/dream.service';
import { useDreamContext } from '@/context/DreamContext';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function DreamInput() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { refetchAll } = useDreamContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      setError('Please describe your dream');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const dream = await createDream(text);
      await refetchAll();
      router.push(`/dream/${dream.id}`);
      setText('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to interpret dream');
      console.error('Error creating dream:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit(e as any);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card animate-fade-in">
      <div className="mb-6">
        <label className="block text-purple-200 mb-3 text-lg font-light">
          Describe your dream...
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="E.g., I was flying over a vast ocean when suddenly I noticed a bridge appearing in the mist. As I got closer, I could see people I knew waiting on the other side... ☁️"
          className="w-full h-48 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all duration-300 resize-none"
          disabled={isLoading}
        />
        <p className="text-purple-300 text-xs mt-2">
          💡 Tip: Press Ctrl+Enter (Cmd+Enter on Mac) to submit
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || !text.trim()}
        className={`w-full py-4 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
          isLoading || !text.trim()
            ? 'bg-purple-800/50 cursor-not-allowed opacity-50'
            : 'btn-primary'
        }`}
      >
        {isLoading ? (
          <>
           <LoadingSpinner/>
            <span>Interpreting your dream...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            <span>Interpret Dream</span>
          </>
        )}
      </button>

      {!isLoading && text.trim() && (
        
        <p className="text-purple-300 text-xs text-center mt-3">
          Your interpretation will be ready in moments ✨
        </p>
      )}
    </form>
  );
}