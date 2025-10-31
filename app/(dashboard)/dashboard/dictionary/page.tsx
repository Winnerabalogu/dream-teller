'use client';

import { useSymbols } from '@/hooks/useSymbols';
import { useState, useMemo } from 'react';
import { BookOpen, Search, Loader2, Sparkles, Cloud } from 'lucide-react';
import debounce from 'lodash.debounce';
import { motion } from 'framer-motion';

function highlight(text: string, query: string) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-purple-600/30 text-purple-100">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function DictionaryPage() {
  const { symbols, loading } = useSymbols();
  const [query, setQuery] = useState('');
  const [q, setQ] = useState('');

  const debounced = useMemo(() => debounce((val: string) => setQ(val), 250), []);
  const onChange = (v: string) => {
    setQuery(v);
    debounced(v);
  };

  const filtered = symbols.filter(s => 
    s.key.toLowerCase().includes(q.toLowerCase()) || s.meaning.toLowerCase().includes(q.toLowerCase())
  );

  // group by first letter
  const groups = filtered.reduce<Record<string, typeof filtered>>((acc, s) => {
    const k = s.key.charAt(0).toUpperCase();
    acc[k] = acc[k] || [];
    acc[k].push(s);
    return acc;
  }, {});

  const random = symbols.length ? symbols[Math.floor(Math.random() * symbols.length)] : null;

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
    </div>
  );

  return (
    <div className="min-h-screen p-4 lg:p-12 pt-20 lg:pt-12 relative overflow-hidden">
      {/* Background blobs */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <BookOpen className="w-10 h-10 text-purple-400" />
            <h1 className="text-5xl lg:text-6xl font-light text-gradient">Dream Dictionary</h1>
            <Cloud className="w-10 h-10 text-blue-300" />
          </div>
          <p className="text-purple-300 text-lg max-w-2xl mx-auto">Explore meanings behind symbols in your dreams.</p>
        </div>

        {/* Search Card */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 max-w-2xl mx-auto w-full">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
            <input 
              value={query} 
              onChange={(e) => onChange(e.target.value)} 
              placeholder="Search symbols or meanings..." 
              className="w-full pl-12 pr-4 py-3 bg-transparent outline-none text-white placeholder-purple-300/50 text-lg"
            />
          </div>
        </motion.div>

        {/* Random Symbol */}
        {random && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-purple-800/30 to-blue-800/30 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-2xl mx-auto w-full"
          >
            <h4 className="text-sm text-purple-300 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Symbol of the Day
            </h4>
            <div className="flex items-start space-x-4">
              <div className="bg-purple-500/20 p-3 rounded-lg text-purple-300 font-medium text-lg flex-shrink-0">
                {random.key}
              </div>
              <p className="text-purple-200 text-lg leading-relaxed">{random.meaning}</p>
            </div>
          </motion.div>
        )}

        {/* Result count */}
        <div className="text-center text-purple-300 animate-fade-in">
          <p className="text-lg">{filtered.length} {filtered.length === 1 ? 'symbol' : 'symbols'} found</p>
        </div>

        {/* Dictionary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.keys(groups).sort().map((letter, letterIdx) => (
            <motion.section 
              key={letter} 
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: letterIdx * 0.05 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-purple-500/30 flex items-center justify-center">
                  <span className="text-sm font-medium text-purple-300">{letter}</span>
                </div>
                <h5 className="text-sm text-purple-300 font-medium opacity-70">{groups[letter].length} item{groups[letter].length !== 1 ? 's' : ''}</h5>
              </div>
              {groups[letter].map((symbol, i) => (
                <motion.div 
                  key={symbol.id} 
                  className="bg-white/5 backdrop-blur-lg hover:bg-white/10 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all group cursor-pointer"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: letterIdx * 0.05 + i * 0.03 }}
                >
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="bg-purple-500/20 p-2 rounded-lg group-hover:bg-purple-500/30 transition-all flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-purple-300" />
                    </div>
                    <h3 className="text-lg font-medium capitalize flex-1 text-purple-100">{symbol.key}</h3>
                  </div>
                  <p className="text-purple-200 leading-relaxed text-sm">
                    {highlight(symbol.meaning, q)}
                  </p>
                </motion.div>
              ))}
            </motion.section>
          ))}
        </div>

        {/* No results state */}
        {filtered.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-12 text-center border border-white/10"
          >
            <Search className="w-16 h-16 mx-auto text-purple-400 opacity-50 mb-4" />
            <h3 className="text-2xl font-light mb-2">No symbols found</h3>
            <p className="text-purple-300 text-lg">Try a different search term</p>
          </motion.div>
        )}
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

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}