'use client';

import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import useSWR from 'swr';
import { toast } from 'sonner';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function TopInsights() {
  const { data } = useSWR('/api/insights', fetcher, { refreshInterval: 1000 * 60 * 5 });
  const [last, setLast] = useState<string | null>(null);

  useEffect(() => {
    if (!data) return;
    const main = data.insights?.[0] ?? null;
    if (main && main !== last) {
      setLast(main);
      toast.info(`New insight: ${main}`);
      console.info('New insight:', main);
    }
  }, [data, last]);

  if (!data || !data.insights?.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex items-center space-x-3 bg-gradient-to-r from-purple-700 to-blue-600 text-white p-3 rounded-2xl shadow-lg">
        <Sparkles className="w-5 h-5" />
        <div className="text-sm max-w-xs truncate">{data.insights[0]}</div>
      </div>
    </div>
  );
}
