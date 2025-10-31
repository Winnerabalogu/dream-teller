'use client';

import { useState, useEffect } from 'react';
import { History, Database, Edit3, Sparkles, Plus, Cloud, Zap, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { useDreams } from '@/hooks/useDreams';
import { useSymbols } from '@/hooks/useSymbols';
import DreamInput from '@/components/ui/DreamInput';
import InterpretationDisplay from '@/components/dream/InterpretationDisplay'; // UPDATED: Use comprehensive Display everywhere
import ExportImport from '@/components/dream/ExportImport';
import DictionaryModal from '@/components/modals/DictionaryModal';
import Tabs from '@/components/layout/Tabs';
import SearchBar from '@/components/dream/SearchBar';
import type { Tab } from '@/components/layout/Tabs';
import type { Interpretation as InterpretationType } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [interpretation, setInterpretation] = useState<InterpretationType | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showDictionaryModal, setShowDictionaryModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'patterns' | 'input' | 'history' | 'dictionary'>('input');
  const [expandedDreams, setExpandedDreams] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const { dreams, refetch: refetchDreams, patterns, loading: dreamsLoading } = useDreams();
  const { symbols, refetch: refetchSymbols, deleteSymbol } = useSymbols();

  // Persist tab in localStorage
  useEffect(() => {
    const saved = localStorage.getItem('activeTab');
    if (saved) setActiveTab(saved as any);
  }, []);
  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (interpretation) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [interpretation]);

  const handleInterpret = async (text: string) => {
    if (!text.trim()) return;
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/interpret', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to interpret dream');
      }

      const data = await response.json();
      setInterpretation(data.interpretation);

      // Refetch dreams to update history
      await refetchDreams();
    } catch (err) {
      console.error(err);
      setError('Interpretation hiccup—add more details!');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDreamExpansion = (dreamId: string) => {
    const newExpanded = new Set(expandedDreams);
    if (newExpanded.has(dreamId)) {
      newExpanded.delete(dreamId);
    } else {
      newExpanded.add(dreamId);
    }
    setExpandedDreams(newExpanded);
  };

  const tabs = [
    { id: 'input', label: 'Interpret', icon: Sparkles },
    { id: 'history', label: 'History', icon: History },
    { id: 'patterns', label: 'Patterns', icon: Database },
    { id: 'dictionary', label: 'Dictionary', icon: Edit3 },
  ] as const satisfies Tab<'patterns' | 'input' | 'history' | 'dictionary'>[];

  const loading = dreamsLoading || isLoading;

  return (
    <div className="min-h-screen pt-12 lg:pt-4 pb-8 sm:pb-12">
      {/* Global Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
        </div>
      )}

      {/* Content */}
      
        <div className="max-w-4xl mx-auto px-3 sm:px-6 pb-8 sm:pb-16">
          {/* Header */}
        <header className="text-center mb-4 sm:mb-8 lg:mb-12 pt-2 sm:pt-6 lg:pt-8 animate-fade-in">  {/* Reduced mb/pt */}
  <div className="flex items-center justify-center gap-1.5 sm:gap-3 mb-1.5 sm:mb-3 lg:mb-4">  {/* Tighter gap */}
    <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-purple-300 animate-pulse" />  {/* Smaller base icon */}
    <h1 className="text-xl sm:text-3xl lg:text-5xl xl:text-6xl font-light tracking-tight text-gradient">  {/* Smaller base title */}
      Aeterna&apos;s Journal
    </h1>
    <Cloud className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-300 animate-pulse" />
  </div>
  <p className="text-purple-200 text-sm lg:text-base xl:text-lg font-light opacity-90 max-w-2xl mx-auto px-0 sm:px-4 hyphens-auto leading-relaxed">  {/* text-sm base, no px on mobile, added leading */}
    Explore your subconscious mind. Discover hidden patterns. Unlock personal insights.
  </p>
        </header>

          {/* Tabs */}
          <div className="mb-8 sm:mb-10">
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>

         {activeTab === 'input' && (
      <div className="flex justify-center space-x-2 sm:space-x-4 mb-4 sm:mb-6">  {/* Tighter space-x */}
        <ExportImport />
      </div>
          )}

          {/* Tab Content */}
          {activeTab === 'input' && (
            <>
              <DreamInput onInterpret={handleInterpret} error={error} isLoading={isLoading} />
              {interpretation && (
                <div className={`space-y-4 sm:space-y-6 transition-all mt-6 sm:mt-8 ${isAnimating ? 'animate-fade-in' : ''}`}>
                  <InterpretationDisplay interpretation={interpretation} /> {/* UPDATED: Use comprehensive Display */}
                </div>
              )}

              {/* Info Cards */}
              {!interpretation && (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mt-6 sm:mt-10 lg:mt-12 animate-slide-up">  {/* Reduced gap/mt */}
                    {[
                    { icon: <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />, title: 'Instant Insights', desc: 'AI-powered dream analysis' },
                    { icon: <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />, title: 'Symbol Dictionary', desc: 'Personal interpretation library' },
                    { icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" />, title: 'Pattern Recognition', desc: 'Track recurring themes' },
                 ].map((card, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-lg rounded-lg sm:rounded-2xl p-3 sm:p-6 border border-white/10 hover:border-white/20 transition-all hover:bg-white/10 group cursor-pointer" 
                >
                  <div className="flex items-center gap-1.5 sm:gap-3 mb-1.5 sm:mb-3">  {/* Tighter gap */}
                    <div className="p-1 sm:p-2 bg-purple-500/20 rounded-md group-hover:bg-purple-500/30 transition-colors">  {/* Smaller rounded */}
                      <div className="text-purple-300 text-xs sm:text-base">{card.icon}</div>  {/* text-xs for icon container */}
                    </div>
                    <h3 className="font-medium text-purple-100 text-xs sm:text-base">{card.title}</h3>  {/* text-xs base */}
                  </div>
                  <p className="text-purple-300 text-xs font-light leading-relaxed">{card.desc}</p>  {/* Added leading */}
                </div>
              ))}
            </div>
              )}
            </>
          )}

          {activeTab === 'history' && (
            <section className="space-y-3 sm:space-y-4 animate-fade-in">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="text-xl sm:text-2xl font-light">
                  Dream History ({dreams.length})
                </h2>
                {dreams.length > 0 && (
                  <button
                    onClick={() => {
                      if (expandedDreams.size === dreams.length) {
                        setExpandedDreams(new Set());
                      } else {
                        setExpandedDreams(new Set(dreams.map(d => d.id)));
                      }
                    }}
                    className="text-xs sm:text-sm text-purple-300 hover:text-purple-200 transition-colors"
                  >
                    {expandedDreams.size === dreams.length ? 'Collapse All' : 'Expand All'}
                  </button>
                )}
              </div>
              {dreams.length === 0 ? (
                <div className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center border border-white/10">
                  <History className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-purple-400 mb-3 sm:mb-4" />
                  <p className="text-purple-300 text-sm sm:text-base">No dreams yet—start interpreting!</p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                 {dreams.map((dream) => {
  const isExpanded = expandedDreams.has(dream.id);
  return (
    <article
      key={dream.id}
      className="bg-white/5 backdrop-blur-lg rounded-lg p-3 sm:p-6 border border-white/10 hover:bg-white/10 transition-all" 
    >
      <div className="flex items-start justify-between gap-1.5 mb-2 sm:mb-3">  {/* Tighter gap */}
        <div className="text-xs text-purple-300">  {/* Dropped sm: for consistency */}
          {new Date(dream.date).toLocaleDateString()}
        </div>
        <button
          onClick={() => toggleDreamExpansion(dream.id)}
          className="flex items-center justify-center gap-1 text-blue-300 hover:text-blue-200 transition-colors text-xs min-w-[32px] min-h-[32px] rounded-full"
          

        >
          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}  {/* Dropped sm: icons, uniform size */}
        </button>
      </div>

      <p className="text-purple-200 mb-2 sm:mb-4 italic text-sm leading-relaxed line-clamp-3 sm:line-clamp-none">  {/* Shorter clamp on mobile, added leading */}
        {isExpanded ? dream.text : `${dream.text.substring(0, 60)}${dream.text.length > 60 ? '...' : ''}`}
      </p>

      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-white/10 animate-fade-in">  {/* Reduced mt/pt */}
          <h4 className="text-xs sm:text-base font-medium text-purple-300 mb-2">Interpretation</h4>  {/* text-xs base */}
          <div className="text-indigo-200 text-sm leading-relaxed line-clamp-4 sm:line-clamp-none">  {/* Clamp to fit mobile */}
            <InterpretationDisplay interpretation={dream.interpretation as InterpretationType} /> {/* UPDATED: Use comprehensive Display */}
          </div>
        </div>
      )}
    </article>
  );
                  })}
                </div>
              )}
            </section>
          )}
          {activeTab === 'patterns' && (
            <section className="space-y-4 sm:space-y-6 animate-fade-in">
              <h2 className="text-xl sm:text-2xl font-light mb-3 sm:mb-4">Subconscious Patterns</h2>
              {dreams.length < 2 ? (
                <div className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center border border-white/10">
                  <Database className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-purple-400 mb-3 sm:mb-4" />
                  <p className="text-purple-300 text-sm sm:text-base">Record 2+ dreams to spot patterns.</p>
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
                    <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                      Recurring Symbols
                    </h3>
                    {Object.entries(patterns.recurringSymbols).length === 0 ? (
                      <p className="text-purple-300 text-sm sm:text-base text-center py-4">
                        No recurring symbols yet. Keep recording dreams!
                      </p>
                    ) : (
                      <ul className="space-y-2 sm:space-y-3">
                        {Object.entries(patterns.recurringSymbols).map(([sym, count]) => {
                          const percentage = Math.round((Number(count) / dreams.length) * 100);
                          return (
                           <li key={sym} className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-purple-200 py-1.5 sm:py-3 border-b border-white/10 last:border-0 gap-2 sm:gap-0"> 
  <div className="flex items-center gap-2 w-full sm:w-auto">  {/* Full width on mobile */}
    <span className="font-medium capitalize text-sm">{sym}</span>  {/* Dropped sm: */}
  </div>
  <div className="flex items-center justify-between sm:justify-normal gap-2 sm:gap-3 w-full sm:w-auto">  {/* justify-between on mobile for centering */}
    <div className="w-12 sm:w-24 h-2 bg-white/10 rounded-full overflow-hidden flex-1 sm:flex-none">  {/* Smaller w, flex-1 on mobile */}
      <div 
        className="h-full bg-gradient-to-r from-purple-500 to-blue-400 rounded-full"
        style={{ width: `${percentage}%` }}
      />
    </div>
    <span className="text-blue-300 text-xs text-right flex-shrink-0 min-w-[2rem]">  {/* Smaller min-w, no sm: */}
      {percentage}%
    </span>
  </div>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </section>
          )}

          {activeTab === 'dictionary' && (
            <section className="space-y-4 sm:space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <h2 className="text-xl sm:text-2xl font-light">
                  Symbol Dictionary ({symbols.length})
                </h2>
                <button
                  onClick={() => setShowDictionaryModal(true)}
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-4 py-2 sm:py-2 rounded-lg transition-all font-medium text-sm sm:text-base w-full sm:w-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add / Edit Symbols</span>
                </button>
              </div>

              <div className="max-w-xl mx-auto w-full">
                <SearchBar />
              </div>

              {symbols.length === 0 ? (
                <div className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center border border-white/10">
                  <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-purple-400 mb-3 sm:mb-4" />
                  <p className="text-purple-300 text-sm sm:text-base mb-4">No symbols in your dictionary yet.</p>
                <button
                      onClick={() => setShowDictionaryModal(true)}
                      className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-3 py-2.5 sm:py-2 rounded-lg transition-all font-medium text-xs sm:text-base w-full sm:w-auto min-h-[44px]"  
                    >
                    Add Your First Symbol
                  </button>
                </div>
              ) : (
                <div className="grid gap-2 sm:gap-4 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto scrollbar-hide">  {/* Shorter max-h on mobile */}
                  {symbols.map((symbol) => (
                    <div
                      key={symbol.id}
                      className="bg-white/5 backdrop-blur-lg rounded-lg p-2.5 sm:p-4 border border-white/10 hover:bg-white/10 transition-all flex flex-col gap-2 sm:gap-4" 
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-purple-300 capitalize text-xs sm:text-base mb-1">  {/* text-xs base */}
                          {symbol.key}
                        </h4>
                        <p className="text-purple-200 text-xs sm:text-sm leading-relaxed line-clamp-2">  {/* Uniform clamp-2 for mobile fit */}
                          {symbol.meaning}
                        </p>
                      </div>
                      <button
                        className="text-red-300 hover:text-red-400 transition text-xs w-full sm:w-auto py-1.5 sm:py-1 rounded border border-red-500/30 hover:border-red-500/50 min-h-[36px]"  
                        onClick={async () => {
                          if (confirm(`Delete "${symbol.key}" from your dictionary?`)) {
                            await deleteSymbol(symbol.id);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {showDictionaryModal && (
                <DictionaryModal onClose={() => setShowDictionaryModal(false)} />
              )}
            </section>
          )}
        </div>
      </div>
  );
}