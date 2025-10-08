/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDream, getDreams } from '@/services/db';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar } from 'lucide-react';
import ReflectionForm from '@/components/dream/ReflectionForm';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import DeleteButton from '@/components/dream/DeleteButton';
import {  JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, Suspense } from 'react';
import { getReflectionsForDream } from '@/services/reflection.service';

const InterpretationDisplay = dynamic(() => import('@/components/dream/InterpretationDisplay'), { ssr: false });

export default async function DreamPage({ params }: { params: { id: string } }) {
  const dream = await getDream(params.id);
  if (!dream) return notFound();
  const reflections = await getReflectionsForDream(dream.id);
  // find previous and next
  const all = await getDreams();
  const idx = all.findIndex(d => d.id === dream.id);
  const prev = all[idx+1] ?? null;
  const next = all[idx-1] ?? null;

  return (
    <div className="min-h-screen p-6 lg:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="btn-secondary flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Journal</span>
          </Link>

          <div className="flex items-center space-x-2">
            {prev && <Link href={`/dream/${prev.id}`} className="text-purple-300 hover:underline">← Previous</Link>}
            {next && <Link href={`/dream/${next.id}`} className="text-purple-300 hover:underline">Next →</Link>}
            <DeleteButton dreamId={dream.id} />
          </div>
        </div>

        <div className="card space-y-4">
          <div className="flex items-center space-x-2 text-purple-300">
            <Calendar className="w-5 h-5" />
            <span>{formatDate(dream.date)}</span>
          </div>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg leading-relaxed text-blue-100">{dream.text}</p>
          </div>
        </div>

        <Suspense fallback={<div className="text-purple-300">Loading interpretation…</div>}>
          <InterpretationDisplay interpretation={dream.interpretation} />
        </Suspense>

        {/* Reflect prompt */}
       <div className="card">
          <h3 className="text-lg font-medium mb-2">Reflect</h3>
          <p className="text-sm text-purple-300 mb-3">
            What in your waking life could be connected to this dream?
          </p>

          <div className="space-y-3 mb-4">
            {reflections.length === 0 ? (
              <p className="text-sm text-purple-300 italic">No reflections yet — write one below.</p>
            ) : (
              reflections.map((r: { id: Key | null | undefined; createdAt: string | number | Date; text: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
                <div key={r.id} className="bg-white/5 p-3 rounded-lg border border-white/10">
                  <div className="text-xs text-purple-300 mb-1">
                    {new Date(r.createdAt).toLocaleString()}
                  </div>
                  <div className="text-purple-200">{r.text}</div>
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