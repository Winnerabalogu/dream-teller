'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { createReflection } from '@/services/reflection.service';
import { useRouter } from 'next/navigation';

export default function ReflectionForm({ dreamId }: { dreamId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!text.trim()) {
      toast.error('Please write something before saving.');
      return;
    }

    setIsLoading(true);
    try {
      await createReflection(dreamId, text.trim());
      toast.success('Reflection saved!');
      setText('');
      router.refresh();
    } catch (error) {
      toast.error('Failed to save reflection.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        name="reflection"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
        placeholder="Write a short reflection..."
        rows={3}
      />
      <button
        type="submit"
        disabled={isLoading}
        className={`btn-primary ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'Saving...' : 'Save Reflection'}
      </button>
    </form>
  );
}
