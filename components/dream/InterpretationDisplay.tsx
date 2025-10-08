'use client';

import { Interpretation } from '@/lib/types';
import { Sparkles, Heart, Lightbulb, Stars } from 'lucide-react';

interface Props {
  interpretation: Interpretation;
}

export default function InterpretationDisplay({ interpretation }: Props) {
  const { mainThemes, emotionalTone, symbols, personalInsight, guidance } = interpretation;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Main Themes */}
      <section
        className="card animate-slide-up"
        style={{ animationDelay: '0.05s' }}
      >
        <header className="flex items-center space-x-3 mb-4">
          <Stars className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl lg:text-2xl font-light">Main Themes</h2>
        </header>
        <div className="flex flex-wrap gap-3">
          {mainThemes.map((theme, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full bg-purple-600/30 border border-purple-500/40 text-purple-200 text-sm lg:text-base backdrop-blur-sm transition-all hover:scale-[1.05]"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {theme}
            </span>
          ))}
        </div>
      </section>

      {/* Emotional Tone */}
      <section
        className="card animate-slide-up"
        style={{ animationDelay: '0.15s' }}
      >
        <header className="flex items-center space-x-3 mb-4">
          <Heart className="w-6 h-6 text-pink-400" />
          <h2 className="text-xl lg:text-2xl font-light">Emotional Atmosphere</h2>
        </header>
        <p className="text-blue-200 leading-relaxed text-base lg:text-lg">
          {emotionalTone}
        </p>
      </section>

      {/* Symbols */}
      {symbols.length > 0 && (
        <section
          className="card animate-slide-up"
          style={{ animationDelay: '0.25s' }}
        >
          <header className="flex items-center space-x-3 mb-4">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl lg:text-2xl font-light">Symbols</h2>
          </header>
          <div className="grid gap-4">
            {symbols.map((symbol, i) => (
              <div
                key={i}
                className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="bg-purple-500/20 p-3 rounded-lg flex-shrink-0 text-purple-300 font-medium">
                  {symbol.symbol}
                </div>
                <p className="text-purple-200 flex-1 text-sm lg:text-base leading-relaxed">
                  {symbol.meaning}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Personal Insight */}
      <section
        className="card animate-slide-up"
        style={{ animationDelay: '0.35s' }}
      >
        <header className="flex items-center space-x-3 mb-4">
          <Lightbulb className="w-6 h-6 text-yellow-300" />
          <h2 className="text-xl lg:text-2xl font-light">Personal Insight</h2>
        </header>
        <p className="text-indigo-200 leading-relaxed text-base lg:text-lg">
          {personalInsight}
        </p>
      </section>

      {/* Guidance */}
      <section
        className="bg-gradient-to-r from-purple-800/30 to-blue-800/30 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20 animate-slide-up"
        style={{ animationDelay: '0.45s' }}
      >
        <header className="flex items-center space-x-3 mb-4">
          <div className="bg-yellow-400/20 p-2 rounded-lg">
            <Sparkles className="w-6 h-6 text-yellow-300" />
          </div>
          <h2 className="text-xl lg:text-2xl font-light">Guidance</h2>
        </header>
        <p className="text-yellow-100 leading-relaxed text-base lg:text-lg">
          {guidance}
        </p>
      </section>
    </div>
  );
}
