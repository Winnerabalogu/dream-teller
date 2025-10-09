'use client';

import { useState } from 'react';
import { updateSymbol } from '@/services/db';
import type { Symbol } from '@/lib/types';
import { useSymbols } from '@/hooks/useSymbols';

interface Props {
  onClose: () => void;
}

export default function DictionaryModal({ onClose }: Props) {
  const { symbols, refetch, deleteSymbol } = useSymbols(); 
  const [editId, setEditId] = useState<number | null>(null);
  const [key, setKey] = useState('');
  const [meaning, setMeaning] = useState('');

  const handleSave = async () => {
    if (!key || !meaning) return;
    // Pass editId (number) or undefined for new symbols
    await updateSymbol(editId ?? undefined, key, meaning);
    refetch();
    resetForm();
  };

  const handleDelete = async (id: number) => {
    if (confirm('Delete this symbol?')) {
      await deleteSymbol(id);
      refetch();
    }
  };

  const handleEdit = (symbol: Symbol) => {
    setEditId(symbol.id);
    setKey(symbol.key);
    setMeaning(symbol.meaning);
  };

  const resetForm = () => {
    setEditId(null);
    setKey('');
    setMeaning('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 w-96 max-h-96 overflow-y-auto border border-white/20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl">Dictionary</h2>
          <button onClick={onClose} className="text-gray-300 hover:text-white">
            ×
          </button>
        </div>
        <input
          placeholder="Symbol"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="w-full mb-2 p-2 bg-white/5 border rounded text-white"
        />
        <textarea
          placeholder="Meaning"
          value={meaning}
          onChange={(e) => setMeaning(e.target.value)}
          className="w-full mb-2 p-2 bg-white/5 border rounded text-white h-20"
        />
        <button onClick={handleSave} className="bg-purple-600 px-4 py-2 rounded mb-4 w-full">
          {editId ? 'Update' : 'Add'} Symbol
        </button>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {symbols.map((s) => (
            <div
              key={s.id}
              className="flex justify-between items-center p-2 bg-white/5 rounded"
            >
              <span className="text-sm">
                {s.key}: {s.meaning.substring(0, 50)}...
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(s)}
                  className="text-blue-300 hover:text-blue-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="text-red-300 hover:text-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}