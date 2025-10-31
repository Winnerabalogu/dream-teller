'use client';

import type { Interpretation } from '@/lib/types';
import { Sparkles, Heart, Lightbulb, Stars, Compass, BookOpen, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export interface Props { 
  interpretation: Interpretation; 
}

export default function InterpretationDisplay({ interpretation }: Props) {
  const { 
    mainThemes, 
    emotionalTone, 
    symbols, 
    personalInsight, 
    guidance,
    aiNarrative,
    jungianAnalysis,
    emotionalLayers,
    shadowWork,
    growthOpportunities,
    followUpQuestions,
    spiritualDimension 
  } = interpretation;
const [showAllSymbols, setShowAllSymbols] = useState(false);
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Comprehensive Interpretation Section */}
      <section className="card">
        <header className="flex items-center gap-3 mb-6">
          <Sparkles className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl sm:text-3xl font-light tracking-wide">Dream Interpretation</h2>
        </header>

        {/* AI Narrative Overview */}
        {aiNarrative && (
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-purple-500/20 mb-6">
            <h3 className="text-lg sm:text-xl font-medium mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Narrative Overview
            </h3>
            <p className="text-purple-200 leading-relaxed text-sm sm:text-base">{aiNarrative}</p>
          </div>
        )}

        {/* Core Elements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Main Themes */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-5 sm:p-6 border border-white/10">
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <Stars className="w-4 h-4 text-yellow-400" />
              Main Themes
            </h3>
            <div className="flex flex-wrap gap-2">
              {mainThemes.map((theme, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full bg-purple-600/30 border border-purple-500/40 text-purple-100 text-xs sm:text-sm backdrop-blur-sm"
                >
                  {theme}
                </span>
              ))}
            </div>
          </div>

          {/* Emotional Atmosphere */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-5 sm:p-6 border border-white/10">
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4 text-pink-400" />
              Emotional Atmosphere
            </h3>
            <p className="text-blue-200 leading-relaxed text-sm sm:text-base italic">{emotionalTone}</p>
          </div>

         {/* Symbols & Meanings */}
          {symbols?.length > 0 && (
            <div className="lg:col-span-2 bg-white/5 backdrop-blur-lg rounded-xl p-5 sm:p-6 border border-white/10">
              <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-400" />
                Symbols & Meanings
              </h3>
              <div className="grid gap-3">
                {symbols.slice(0, showAllSymbols ? symbols.length : 4).map((symbol, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-start sm:gap-4 bg-white/5 rounded-lg border border-white/10 p-3 hover:bg-white/10 transition-all">
                    <div className="text-purple-300 font-semibold text-sm sm:text-base mb-1 sm:mb-0">
                      {symbol.symbol}
                    </div>
                    <p className="text-purple-200 text-xs sm:text-sm leading-relaxed flex-1">
                      {symbol.meaning}
                    </p>
                  </div>
                ))}
                {symbols.length > 4 && (
                  <button
                    onClick={() => setShowAllSymbols(!showAllSymbols)}
                    className="flex items-center justify-center gap-2 text-purple-400 text-xs mt-2 hover:text-purple-300 transition-colors"
                  >
                    {showAllSymbols ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        Hide extra symbols
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        ... and {symbols.length - 4} more
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Deeper Layers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Personal Insight */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-5 sm:p-6 border border-white/10">
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-300" />
              Personal Insight
            </h3>
            <p className="text-indigo-200 leading-relaxed text-sm sm:text-base">{personalInsight}</p>
          </div>

          {/* Jungian Analysis */}
          {jungianAnalysis && (
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-5 sm:p-6 border border-white/10">
              <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                Jungian Perspective
              </h3>
              <p className="text-indigo-200 leading-relaxed text-sm sm:text-base">{jungianAnalysis}</p>
            </div>
          )}
        </div>

        {/* Emotional Layers & Shadow Work */}
        {(emotionalLayers || shadowWork) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {emotionalLayers && (
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-5 sm:p-6 border border-white/10">
                <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-pink-400" />
                  Emotional Layers
                </h3>
                <ul className="space-y-2 text-purple-200 text-sm">
                  <li><strong>Surface:</strong> {emotionalLayers.surface}</li>
                  <li><strong>Deeper:</strong> {emotionalLayers.deeper}</li>
                  <li><strong>Core:</strong> {emotionalLayers.core}</li>
                </ul>
              </div>
            )}
            {shadowWork && (
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-5 sm:p-6 border border-white/10">
                <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-red-400" />
                  Shadow Work
                </h3>
                <p className="text-purple-200 leading-relaxed text-sm sm:text-base">{shadowWork}</p>
              </div>
            )}
          </div>
        )}

        {/* Spiritual Dimension */}
        {spiritualDimension && (
          <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 backdrop-blur-lg rounded-xl p-5 sm:p-6 border border-indigo-500/20 mb-8">
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-400" />
              Spiritual Dimension
            </h3>
            <p className="text-indigo-200 leading-relaxed text-sm sm:text-base">{spiritualDimension}</p>
          </div>
        )}

        {/* Growth & Guidance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">          
         {/* Growth Opportunities */}
          {growthOpportunities && growthOpportunities.length > 0 && (
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-5 sm:p-6 border border-white/10">
              <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-green-400" />
                Growth Opportunities
              </h3>
              <ul className="space-y-2 text-purple-200 text-sm">
                {growthOpportunities.map((opp, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">→</span>
                    {opp}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Guidance */}
          <div className="bg-gradient-to-r from-purple-800/30 to-blue-800/30 backdrop-blur-lg rounded-xl p-5 sm:p-6 border border-white/20">
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <Compass className="w-4 h-4 text-yellow-300" />
              Guidance
            </h3>
            <p className="text-yellow-100 leading-relaxed text-sm sm:text-base">{guidance}</p>
          </div>
        </div>

       {/* Follow-Up Questions */}
        {followUpQuestions && followUpQuestions.length > 0 && (
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-5 sm:p-6 border border-white/10">
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-400" />
              Follow-Up Questions
            </h3>
            <ul className="space-y-3 text-purple-200 text-sm">
              {followUpQuestions.map((q, i) => (
                <li key={i} className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <p className="italic">"{q}"</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}