'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrendingUp, Sparkles, Loader2, Cloud, Zap } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts';
import { toast } from 'sonner';

import { useDreams } from '@/hooks/useDreams';
import { usePatterns } from '@/hooks/usePatterns';

type InsightResp = {
  insights: string[];
  symbolFreq: Record<string, number>;
  themeFreq: Record<string, number>;
  sentimentTrend: { date?: string; score: number }[];
  correlations: string[];
};

export default function PatternsPage() {
  const { dreams, loading: loadingDreams } = useDreams();
  const { patterns, loading: loadingPatterns } = usePatterns();
  const [insights, setInsights] = useState<InsightResp | null>(null);
  const [fetchingInsights, setFetchingInsights] = useState(false);

  const loading = loadingDreams || loadingPatterns;

  useEffect(() => {
    let mounted = true;

    async function loadInsights() {
      setFetchingInsights(true);
      try {
        const res = await fetch('/api/insights');
        if (!res.ok) throw new Error('Failed to load insights');
        const data = await res.json();
        if (mounted) {
          setInsights(data);
          toast.success('Insights updated successfully 🌙');
        }
      } catch (err) {
        console.error('Insights fetch failed:', err);
        toast.error('Failed to load insights');
      } finally {
        if (mounted) setFetchingInsights(false);
      }
    }

    if (dreams.length >= 3) loadInsights();
    return () => {
      mounted = false;
    };
  }, [dreams.length]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
      </div>
    );
  }

  if (dreams.length < 3) {
    return (
      <div className="min-h-screen p-6 lg:p-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-12 text-center space-y-4 border border-white/10">
            <TrendingUp className="w-16 h-16 mx-auto text-purple-400" />
            <h2 className="text-3xl font-light">Not Enough Dreams Yet</h2>
            <p className="text-purple-300 text-lg">
              Record at least 3 dreams to start seeing patterns and insights.
            </p>
            <Link href="/" className="inline-block mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3 rounded-xl font-medium transition-all transform hover:scale-105">
              Record a Dream
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const totalDreams = dreams.length;
  const recurring = Object.entries(patterns.recurringSymbols || {}).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <div className="min-h-screen p-6 lg:p-12 space-y-8 relative overflow-hidden">
      {/* Background blobs */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl lg:text-5xl font-light">Your Dream Patterns</h1>
          </div>
          <p className="text-purple-300 text-lg">
            Discovered from <span className="font-medium text-purple-200">{totalDreams} dreams</span> in your journal
          </p>
        </motion.div>

        {/* Quick insights grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
            <h3 className="text-sm text-purple-300 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Top Symbols
            </h3>
            <div className="flex flex-wrap gap-2">
              {recurring.slice(0, 3).map(([s, count]) => (
                <span key={s} className="bg-purple-600/30 border border-purple-500/40 px-3 py-1 rounded-full text-sm text-purple-200">
                  {s} — {Math.round((count / totalDreams) * 100)}%
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
            <h3 className="text-sm text-purple-300 mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Summary Insight
            </h3>
            <p className="text-sm text-purple-200 leading-relaxed">
              {insights?.insights?.length
                ? insights.insights[0]
                : fetchingInsights
                ? 'Analyzing your dreams for patterns...'
                : 'No insights yet.'}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
            <h3 className="text-sm text-purple-300 mb-3">Correlations</h3>
            <ul className="text-sm text-purple-200 space-y-1">
              {insights?.correlations?.slice(0, 3).map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">→</span>
                  <span>{c}</span>
                </li>
              ))}
              {!insights && <li className="text-purple-300">Analyzing symbol-theme correlations…</li>}
            </ul>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-medium mb-4">Symbol Frequency</h3>
            {insights ? (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart
                  data={Object.entries(insights.symbolFreq).map(([k, v]) => ({
                    name: k,
                    value: v,
                  }))}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '8px' }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#7c3aed" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-60 flex items-center justify-center text-purple-300">Analyzing…</div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-medium mb-4">Emotional Journey</h3>
            {insights ? (
              <ResponsiveContainer width="100%" height={240}>
                <LineChart
                  data={insights.sentimentTrend.map((s, i) => ({
                    idx: i,
                    score: s.score,
                    date: s.date ?? `${i}`,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(d) =>
                      new Date(d).toLocaleDateString?.() ?? d
                    }
                  />
                  <YAxis domain={[-1, 1]} />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '8px' }} />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#7c3aed"
                    strokeWidth={2}
                    dot={{ r: 3, fill: '#7c3aed' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-60 flex items-center justify-center text-purple-300">Analyzing…</div>
            )}
          </motion.div>
        </div>

        {/* Recurring Symbols grid */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
          <div className="flex items-center space-x-3 mb-6">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-light">Recurring Symbols</h2>
          </div>

          {Object.keys(patterns.recurringSymbols).length === 0 ? (
            <p className="text-purple-300">
              No recurring symbols detected yet. Keep recording your dreams!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(patterns.recurringSymbols)
                .sort((a, b) => b[1] - a[1])
                .map(([symbol, count]) => {
                  const pct = Math.round((Number(count) / totalDreams) * 100);
                  return (
                    <div
                      key={symbol}
                      className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium capitalize">
                          {symbol}
                        </h3>
                        <span className="bg-purple-600/30 border border-purple-500/40 text-sm px-3 py-1 rounded-full text-purple-200">{pct}%</span>
                      </div>
                      <p className="text-sm text-purple-300">
                        Appeared in <span className="font-medium">{count}</span> of <span className="font-medium">{totalDreams}</span> dreams
                      </p>
                    </div>
                  );
                })}
            </div>
          )}
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}