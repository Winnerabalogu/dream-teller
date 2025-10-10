'use client';

import type { Interpretation } from '@/lib/types';

export interface Props { interpretation: Interpretation; }

export default function Interpretation({ interpretation }: Props) {
  const { mainThemes, emotionalTone, symbols, personalInsight, guidance } = interpretation;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Main Themes */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
        <h2 className="text-2xl font-light mb-4">Main Themes</h2>
        <div className="flex flex-wrap gap-3">
          {mainThemes.map((theme: string, i: number) => (
            <span key={i} className="bg-purple-500/30 px-4 py-2 rounded-full text-purple-200 border border-purple-400/30">
              {theme}
            </span>
          ))}
        </div>
      </div>

      {/* Emotional Tone */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
        <h2 className="text-2xl font-light mb-4">Emotional Atmosphere</h2>
        <p className="text-blue-200 leading-relaxed">{emotionalTone}</p>
      </div>

      {/* Symbols */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
        <h2 className="text-2xl font-light mb-4">Symbols</h2>
        <div className="grid gap-4">
          {symbols.map((symbol, i) => (
            <div key={i} className="flex items-start space-x-4">
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <span className="text-purple-300 font-medium">{symbol.symbol}</span>
              </div>
              <p className="text-purple-200 flex-1">{symbol.meaning}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Insight */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
        <h2 className="text-2xl font-light mb-4">Personal Insight</h2>
        <p className="text-indigo-200 leading-relaxed text-lg">{personalInsight}</p>
      </div>

      {/* Guidance */}
      <div className="bg-gradient-to-r from-purple-800/30 to-blue-800/30 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
        <h2 className="text-2xl font-light mb-4">Guidance</h2>
        <p className="text-yellow-100 leading-relaxed">{guidance}</p>
      </div>
    </div>
  );
}