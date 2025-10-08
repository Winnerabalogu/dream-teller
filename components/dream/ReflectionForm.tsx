// components/dream/ReflectionForm.tsx
'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import { createReflection } from '@/services/reflection.service';
import { revalidatePath } from 'next/cache';

export default function ReflectionForm({ dreamId }: { dreamId: string }) {
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    const reflectionText = formData.get('reflection')?.toString() ?? '';

    if (!reflectionText.trim()) {
      toast.error('Please write something before saving.');
      return;
    }

    startTransition(async () => {
      try {
        await createReflection(dreamId, reflectionText.trim());
        toast.success('Reflection saved!');
        (document.querySelector('textarea[name="reflection"]') as HTMLTextAreaElement).value = '';        
        revalidatePath(`/dream/${dreamId}`);
      } catch (error) {
        toast.error('Failed to save reflection.');
        console.error(error);
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-3">
      <textarea
        name="reflection"
        className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white"
        placeholder="Write a short reflection..."
      />
      <button
        type="submit"
        disabled={isPending}
        className={`btn-primary ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isPending ? 'Saving...' : 'Save Reflection'}
      </button>
    </form>
  );
}
