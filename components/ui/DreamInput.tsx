'use client';

import { useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';

interface DreamInputProps {
  onInterpret: (text: string) => Promise<void> | void;
  error?: string | null;
}

export default function DreamInput({ onInterpret, error }: DreamInputProps) {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setIsLoading(true);
    await onInterpret(text);
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm shadow-lg"
    >
      <textarea
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Describe your dream in detail..."
        className="w-full p-4 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-purple-400 focus:outline-none resize-none placeholder-purple-300/60"
      />

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isLoading || !text.trim()}
        className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
          isLoading
            ? 'bg-purple-400 cursor-not-allowed'
            : 'bg-purple-600 hover:bg-purple-700 active:scale-95'
        } text-white`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Interpreting...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            <span>Interpret Dream</span>
          </>
        )}
      </button>
    </form>
  );
}
