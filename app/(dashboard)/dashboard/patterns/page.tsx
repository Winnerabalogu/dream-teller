'use client';

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
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
      <div className="min-h-screen p-4 sm:p-6 lg:p-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 sm:p-8 lg:p-12 text-center space-y-4 border border-white/10">
            <TrendingUp className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-purple-400" />
            <h2 className="text-2xl sm:text-3xl font-light">Not Enough Dreams Yet</h2>
            <p className="text-purple-300 text-base sm:text-lg">
              Record at least 3 dreams to start seeing patterns and insights.
            </p>
            <Link 
              href="/" 
              className="inline-block mt-4 sm:mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-3 sm:px-8 sm:py-3 rounded-xl font-medium transition-all transform hover:scale-105 text-sm sm:text-base"
            >
              Record a Dream
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const totalDreams = dreams.length;
  const recurring = Object.entries(patterns.recurringSymbols || {})
    .filter(([s]) => !s.includes('Duplicate'))
    .sort((a, b) => b[1] - a[1]);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-12 pt-20 lg:pt-12 space-y-6 sm:space-y-8 relative overflow-hidden">
      {/* Background blobs */}
      <div className="fixed inset-0 opacity-20 sm:opacity-30 pointer-events-none">
        <div className="absolute top-10 right-4 w-48 h-48 sm:w-72 sm:h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-8 left-4 w-48 h-48 sm:w-72 sm:h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-light">Your Dream Patterns</h1>
          </div>
          <p className="text-purple-300 text-sm sm:text-lg">
            Discovered from <span className="font-medium text-purple-200">{totalDreams} dreams</span> in your journal
          </p>
        </motion.div>

        {/* Quick insights grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }} 
            className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all"
          >
            <h3 className="text-xs sm:text-sm text-purple-300 mb-2 sm:mb-3 flex items-center gap-2">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              Top Symbols
            </h3>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {recurring.slice(0, 3).map(([s, count]) => (
                <span key={s} className="bg-purple-600/30 border border-purple-500/40 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm text-purple-200">
                  {s} — {Math.round((count / totalDreams) * 100)}%
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }} 
            className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all"
          >
            <h3 className="text-xs sm:text-sm text-purple-300 mb-2 sm:mb-3 flex items-center gap-2">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
              Summary Insight
            </h3>
            <p className="text-xs sm:text-sm text-purple-200 leading-relaxed line-clamp-3">
              {insights?.insights?.length
                ? insights.insights[0]
                : fetchingInsights
                ? 'Analyzing your dreams for patterns...'
                : patterns.insights?.[0] || 'No insights yet.'}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3 }} 
            className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all"
          >
            <h3 className="text-xs sm:text-sm text-purple-300 mb-2 sm:mb-3">Correlations</h3>
            <ul className="text-xs sm:text-sm text-purple-200 space-y-1">
              {insights?.correlations?.slice(0, 3).map((c, i) => (
                <li key={i} className="flex items-start gap-1 sm:gap-2 line-clamp-2">
                  <span className="text-purple-400 mt-0.5 flex-shrink-0">→</span>
                  <span className="flex-1">{c}</span>
                </li>
              )) || patterns.correlations?.slice(0, 3).map((c: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, i: Key | null | undefined) => (
                <li key={i} className="flex items-start gap-1 sm:gap-2 line-clamp-2">
                  <span className="text-purple-400 mt-0.5 flex-shrink-0">→</span>
                  <span className="flex-1">{c}</span>
                </li>
              ))}
              {!insights && !patterns.correlations?.length && <li className="text-purple-300">Analyzing symbol-theme correlations…</li>}
            </ul>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.4 }} 
            className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10"
          >
            <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Symbol Frequency</h3>
            {insights ? (
              <div className="h-48 sm:h-60 max-h-[40vh]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={Object.entries(insights.symbolFreq).map(([k, v]) => ({
                      name: k.length > 8 ? k.substring(0, 8) + '...' : k,
                      value: v,
                    }))}
                  >
                    <XAxis 
                      dataKey="name" 
                      fontSize={12}
                      stroke="#c9b086"
                      tick={{ fill: '#c9b086' }}
                    />
                    <YAxis 
                      fontSize={12}
                      stroke="#c9b086"
                      tick={{ fill: '#c9b086' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(184, 153, 104, 0.15)',
                        border: '1px solid rgba(184, 153, 104, 0.3)', 
                        borderRadius: '8px',
                        fontSize: '12px',
                        color: '#ddc9a3'
                      }}
                      cursor={{ fill: 'rgba(184, 153, 104, 0.1)' }}
                    />
                    <Bar 
                      dataKey="value" 
                      radius={[4, 4, 0, 0]} 
                      fill="#8b6f47"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-48 sm:h-60 flex items-center justify-center text-purple-300 text-sm">Analyzing…</div>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.5 }} 
            className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10"
          >
            <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Emotional Journey</h3>
            {insights ? (
              <div className="h-48 sm:h-60 max-h-[40vh]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={insights.sentimentTrend.map((s, i) => ({
                      idx: i,
                      score: s.score,
                      date: s.date ?? `${i}`,
                    }))}
                  >
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke="rgba(201, 176, 134, 0.15)" 
                    />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(d) =>
                        new Date(d).toLocaleDateString?.() ?? d
                      }
                      fontSize={12}
                      stroke="#c9b086"
                      tick={{ fill: '#c9b086' }}
                    />
                    <YAxis 
                      domain={[-1, 1]} 
                      fontSize={12}
                      stroke="#c9b086"
                      tick={{ fill: '#c9b086' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(184, 153, 104, 0.15)',
                        border: '1px solid rgba(184, 153, 104, 0.3)', 
                        borderRadius: '8px',
                        fontSize: '12px',
                        color: '#ddc9a3'
                      }}
                      cursor={{ stroke: 'rgba(184, 153, 104, 0.3)' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#8b6f47"
                      strokeWidth={2}
                      dot={{ r: 3, fill: '#8b6f47', strokeWidth: 0 }}
                      activeDot={{ r: 5, fill: '#b89968' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-48 sm:h-60 flex items-center justify-center text-purple-300 text-sm">Analyzing…</div>
            )}
          </motion.div>
        </div>

        {/* Recurring Symbols grid */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.6 }} 
          className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10"
        >
          <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
            <h2 className="text-xl sm:text-2xl font-light">Recurring Symbols</h2>
          </div>

          {Object.keys(patterns.recurringSymbols).length === 0 ? (
            <p className="text-purple-300 text-sm sm:text-base">
              No recurring symbols detected yet. Keep recording your dreams!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {Object.entries(patterns.recurringSymbols)
                .sort((a, b) => b[1] - a[1])
                .map(([symbol, count]) => {
                  const pct = Math.round((Number(count) / totalDreams) * 100);
                  return (
                    <div
                      key={symbol}
                      className="bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-sm sm:text-base font-medium capitalize">
                          {symbol}
                        </h3>
                        <span className="bg-purple-600/30 border border-purple-500/40 text-xs sm:text-sm px-2 py-1 rounded-full text-purple-200">{pct}%</span>
                      </div>
                      <p className="text-xs sm:text-sm text-purple-300">
                        Appeared in <span className="font-medium">{count}</span> of <span className="font-medium">{totalDreams}</span> dreams
                      </p>
                    </div>
                  );
                })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}