import { getDream, getDreams } from '@/services/db';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar } from 'lucide-react';
import ReflectionForm from '@/components/dream/ReflectionForm';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import DeleteButton from '@/components/dream/DeleteButton';
import InterpretationDisplay from '@/components/dream/InterpretationDisplay';
import { getReflectionsForDream } from '@/services/reflection.service';

export default async function DreamPage({ params }: { params: Promise<{ id:string, userId: string }> }) {
  const { userId, id } = await params;
  const dream = await getDream(id,userId);
  if (!dream) return notFound();
  const reflections = await getReflectionsForDream(dream.id);
  
  const all = await getDreams(userId);
  const idx = all.findIndex(d => d.id === dream.id);
  const prev = all[idx+1] ?? null;
  const next = all[idx-1] ?? null;

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-12 pt-20 lg:pt-12">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        {/* Navigation - stacked on mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link href="/" className="btn-secondary flex items-center space-x-2 self-start">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm sm:text-base">Back to Journal</span>
          </Link>

          <div className="flex items-center space-x-2 sm:space-x-4 self-end sm:self-auto">
            {prev && (
              <Link href={`/dream/${prev.id}`} className="text-purple-300 hover:underline text-sm sm:text-base">
                ← Previous
              </Link>
            )}
            {next && (
              <Link href={`/dream/${next.id}`} className="text-purple-300 hover:underline text-sm sm:text-base">
                Next →
              </Link>
            )}
            <DeleteButton dreamId={dream.id} />
          </div>
        </div>

        {/* Dream content */}
        <div className="card space-y-3 sm:space-y-4">
          <div className="flex items-center space-x-2 text-purple-300">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">{formatDate(dream.date)}</span>
          </div>
          <div className="prose prose-invert max-w-none">
            <p className="text-base sm:text-lg leading-relaxed text-blue-100">{dream.text}</p>
          </div>
        </div>

        <InterpretationDisplay interpretation={dream.interpretation} />

        {/* Reflection section */}
        <div className="card">
          <h3 className="text-base sm:text-lg font-medium mb-2">Reflect</h3>
          <p className="text-xs sm:text-sm text-purple-300 mb-3">
            What in your waking life could be connected to this dream?
          </p>

          <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
            {reflections.length === 0 ? (
              <p className="text-xs sm:text-sm text-purple-300 italic">No reflections yet — write one below.</p>
            ) : (
              reflections.map((r) => (
                <div key={r.id} className="bg-white/5 p-2 sm:p-3 rounded-lg border border-white/10">
                  <div className="text-xs text-purple-300 mb-1">
                    {new Date(r.createdAt).toLocaleString()}
                  </div>
                  <div className="text-purple-200 text-sm sm:text-base">{r.text}</div>
                </div>
              ))
            )}
          </div>

          <ReflectionForm dreamId={dream.id} />
        </div>
      </div>
    </div>
  );
}