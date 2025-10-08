'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  History, 
  Database, 
  Edit3, 
  Download, 
  Upload, 
  Sparkles,
  Menu,
  X 
} from 'lucide-react';
import { useDreamContext } from '@/context/DreamContext';
import DreamCard from '../dream/DreamCard';
import DictionaryModal from '../modals/DictionaryModal';
import { exportDreamsData } from '@/services/dream.service';

export default function Sidebar() {
  const { dreams, patterns, loading } = useDreamContext();
  const [showDictionary, setShowDictionary] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleExport = async () => {
    try {
      const data = await exportDreamsData();
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dream-guide-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export data');
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      const res = await fetch('/api/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Import failed');
      
      alert('Data imported successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Import failed:', error);
      alert('Failed to import data. Please check the file format.');
    }
  };

  const topRecurringSymbol = Object.entries(patterns.recurringSymbols)
    .sort((a, b) => b[1] - a[1])[0];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-purple-600 p-2 rounded-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-indigo-950 to-purple-900 backdrop-blur-lg border-r border-white/20 p-6 overflow-y-auto z-40 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 scrollbar-hide`}
      >
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="flex items-center space-x-2 text-2xl font-light text-gradient">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <span>Dream Tale</span>
          </Link>
          <p className="text-purple-300 text-sm mt-2">Your personal dream journal</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 mb-6">
          <Link
            href="/"
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
              pathname === '/' ? 'bg-purple-600' : 'hover:bg-white/10'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span>Interpret Dream</span>
          </Link>
          <Link
            href="/patterns"
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
              pathname === '/patterns' ? 'bg-purple-600' : 'hover:bg-white/10'
            }`}
          >
            <Database className="w-5 h-5" />
            <span>Patterns</span>
          </Link>
          <button
            onClick={() => setShowDictionary(true)}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-all w-full text-left"
          >
            <Edit3 className="w-5 h-5" />
            <span>Dictionary</span>
          </button>
        </nav>

        {/* Export/Import */}
        <div className="space-y-2 mb-6 pb-6 border-b border-white/20">
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 text-sm text-purple-300 hover:text-white p-2 rounded w-full text-left transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </button>
          <label className="flex items-center space-x-2 text-sm text-purple-300 hover:text-white p-2 rounded w-full cursor-pointer transition-all">
            <Upload className="w-4 h-4" />
            <span>Import Data</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>

        {/* Dream History */}
        <div className="mb-6">
          <h2 className="text-lg font-light mb-3 flex items-center space-x-2 text-purple-200">
            <History className="w-5 h-5" />
            <span>Your Dreams ({dreams.length})</span>
          </h2>
          {loading ? (
            <div className="text-purple-300 text-sm">Loading...</div>
          ) : dreams.length === 0 ? (
            <p className="text-purple-300 text-sm italic">
              No dreams yet. Start by interpreting your first dream!
            </p>
          ) : (
            <div className="space-y-2">
              {dreams.slice(0, 10).map((dream) => (
                <DreamCard key={dream.id} dream={dream} onClick={() => setIsOpen(false)} />
              ))}
              {dreams.length > 10 && (
                <p className="text-purple-300 text-xs text-center pt-2">
                  +{dreams.length - 10} more dreams
                </p>
              )}
            </div>
          )}
        </div>

        {/* Pattern Insight */}
        {topRecurringSymbol && (
          <div className="mt-4 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30">
            <p className="text-xs font-medium text-yellow-200 mb-1">✨ Pattern Insight</p>
            <p className="text-sm text-yellow-100">
              <span className="font-medium capitalize">{topRecurringSymbol[0]}</span> appears
              frequently in your dreams, appearing {topRecurringSymbol[1]} times.
            </p>
          </div>
        )}
      </aside>

      {/* Dictionary Modal */}
      {showDictionary && <DictionaryModal onClose={() => setShowDictionary(false)} />}

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}