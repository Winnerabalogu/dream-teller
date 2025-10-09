/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { History, Database, Edit3, Sparkles, Plus, Cloud, Zap, BookOpen } from 'lucide-react';
import { useDreams } from '@/hooks/useDreams';
import { useSymbols } from '@/hooks/useSymbols';
import { interpretDreamLocally } from '@/lib/utils';
import DreamInput from '@/components/ui/DreamInput';
import Interpretation from '@/components/dream/Interpretation';
import ExportImport from '@/components/dream/ExportImport';
import DictionaryModal from '@/components/modals/DictionaryModal';
import Tabs from '@/components/ui/Tabs';
import SearchBar from '@/components/dream/SearchBar';
import type { Tab } from '@/components/ui/Tabs';

export default function Home() {
  const [interpretation, setInterpretation] = useState<any>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showDictionaryModal, setShowDictionaryModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'patterns' | 'input' | 'history' | 'dictionary'>('input');

  const { dreams, refetch: refetchDreams, patterns } = useDreams();
  const { symbols, refetch: refetchSymbols, deleteSymbol } = useSymbols();

  useEffect(() => {
    if (interpretation) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interpretation]);

  const handleInterpret = async (text: string) => {
    if (!text.trim()) return;
    setError(null);

    try {
      // Interpret dream locally first
      const interp = interpretDreamLocally(text, symbols);
      setInterpretation(interp);

      // Save to database
      const formData = new FormData();
      formData.append('text', text);

      const response = await fetch('/api/interpret', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to save dream');
      }

      // Refetch dreams to update history
      await refetchDreams();
    } catch (err) {
      console.error(err);
      setError('Interpretation hiccup—add more details!');
    }
  };

  const tabs = [
    { id: 'input', label: 'Interpret', icon: Sparkles },
    { id: 'history', label: 'History', icon: History },
    { id: 'patterns', label: 'Patterns', icon: Database },
    { id: 'dictionary', label: 'Dictionary', icon: Edit3 },
  ] as const satisfies Tab<'patterns' | 'input' | 'history' | 'dictionary'>[];

  return (
    <div className="min-h-screen relative overflow-hidden">
      
         {/* Floating clouds */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
        <div className="cloud cloud-4"></div>
        <div className="cloud cloud-5"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        
        <div className="max-w-4xl mx-auto px-6 pb-16">
          {/* Header */}
          <header className="text-center mb-12 pt-8 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-purple-300 animate-pulse" />
              <h1 className="text-5xl md:text-6xl font-light tracking-tight text-gradient">
                Dream Tale
              </h1>
              <Cloud className="w-8 h-8 text-blue-300 animate-pulse" />
            </div>
            <p className="text-purple-200 text-lg md:text-xl font-light opacity-90 max-w-2xl mx-auto">
              Explore your subconscious mind. Discover hidden patterns. Unlock personal insights.
            </p>
          </header>

          {/* Tabs */}
          <div className="mb-8">
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>

          {/* Export/Import */}
          {activeTab === 'input' && (
            <div className="flex justify-center space-x-4 mb-6">
              <ExportImport />
            </div>
          )}

          {/* Tab Content */}
          {activeTab === 'input' && (
            <>
              <DreamInput onInterpret={handleInterpret} error={error} />
              {interpretation && (
                <div className={`space-y-6 transition-all mt-8 ${isAnimating ? 'animate-fade-in' : ''}`}>
                  <Interpretation interpretation={interpretation} />
                </div>
              )}

              {/* Info Cards */}
              {!interpretation && (
                <div className="grid md:grid-cols-3 gap-4 mt-12 animate-slide-up">
                  {[
                    { icon: <Sparkles className="w-5 h-5" />, title: 'Instant Insights', desc: 'AI-powered dream analysis' },
                    { icon: <BookOpen className="w-5 h-5" />, title: 'Symbol Dictionary', desc: 'Personal interpretation library' },
                    { icon: <Zap className="w-5 h-5" />, title: 'Pattern Recognition', desc: 'Track recurring themes' },
                  ].map((card, i) => (
                    <div
                      key={i}
                      className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all hover:bg-white/10 group cursor-pointer"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                          <div className="text-purple-300">{card.icon}</div>
                        </div>
                        <h3 className="font-medium text-purple-100">{card.title}</h3>
                      </div>
                      <p className="text-purple-300 text-sm font-light">{card.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'history' && (
            <section className="space-y-4 animate-fade-in">
              <h2 className="text-2xl font-light mb-4">
                Dream History ({dreams.length})
              </h2>
              {dreams.length === 0 ? (
                <div className="card text-center py-12">
                  <p className="text-purple-300">No dreams yet—start interpreting!</p>
                </div>
              ) : (
                dreams.map((dream) => (
                  <article
                    key={dream.id}
                    className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <div className="text-sm text-purple-300 mb-2">
                      {new Date(dream.date).toLocaleDateString()}
                    </div>
                    <p className="text-purple-200 mb-3 italic">
                      &quot;{dream.text.substring(0, 100)}&hellip;&quot;
                    </p>
                    <details className="text-sm">
                      <summary className="cursor-pointer text-blue-300 hover:text-blue-200">
                        View Interpretation
                      </summary>
                      <div className="mt-2 text-indigo-200">
                        <Interpretation interpretation={dream.interpretation} />
                      </div>
                    </details>
                  </article>
                ))
              )}
            </section>
          )}

          {activeTab === 'patterns' && (
            <section className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-light mb-4">Subconscious Patterns</h2>
              {dreams.length < 2 ? (
                <div className="card text-center py-12">
                  <p className="text-purple-300">Record 2+ dreams to spot patterns.</p>
                </div>
              ) : (
                <>
                  <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl mb-4">Recurring Symbols (20%+ frequency)</h3>
                    <ul className="space-y-2">
                      {Object.entries(patterns.recurringSymbols).map(([sym, count]) => (
                        <li key={sym} className="flex justify-between text-purple-200 py-2 border-b border-white/10 last:border-0">
                          <span className="font-medium capitalize">{sym}</span>
                          <span className="text-blue-300">
                            {Math.round((Number(count) / dreams.length) * 100)}% ({Number(count)}x)
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl mb-4">Dominant Themes</h3>
                    <ul className="space-y-2">
                      {Object.entries(patterns.themeFrequency).map(([theme, count]) => (
                        <li key={theme} className="flex justify-between text-purple-200 py-2 border-b border-white/10 last:border-0">
                          <span className="font-medium capitalize">{theme}</span>
                          <span className="text-blue-300">
                            {Math.round((Number(count) / dreams.length) * 100)}%
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </section>
          )}

          {activeTab === 'dictionary' && (
            <section className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-light">
                  Symbol Dictionary ({symbols.length})
                </h2>
                <button
                  onClick={() => setShowDictionaryModal(true)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-4 py-2 rounded-lg transition-all font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add / Edit</span>
                </button>
              </div>

              {/* Integrated live search */}
              <div className="max-w-xl mx-auto">
                <SearchBar />
              </div>

              {/* Scrollable list */}
              <div className="grid gap-4 max-h-[500px] overflow-y-auto scrollbar-hide">
                {symbols.map((symbol) => (
                  <div
                    key={symbol.id}
                    className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all flex justify-between items-start"
                  >
                    <div>
                      <h4 className="font-medium text-purple-300 capitalize">{symbol.key}</h4>
                      <p className="text-purple-200 text-sm leading-relaxed">{symbol.meaning}</p>
                    </div>
                    <button
                      className="text-red-300 hover:text-red-400 transition"
                      onClick={async () => {
                        if (confirm(`Delete "${symbol.key}"?`)) {
                          await deleteSymbol(symbol.id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>

              {showDictionaryModal && (
                <DictionaryModal onClose={() => setShowDictionaryModal(false)} />
              )}
            </section>
          )}
        </div>
      </div>

      <style jsx>{`
        .text-gradient {
          background: linear-gradient(135deg, #c4b5fd 0%, #93c5fd 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

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

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}