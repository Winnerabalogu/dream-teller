/* eslint-disable @typescript-eslint/no-explicit-any */
// components/admin/SymbolAdminClient.tsx - FIXED
'use client';

import { useState } from 'react';
import type { Symbol as SymbolType } from '@/lib/types';
import { Plus, Edit3, Trash } from 'lucide-react';

export default function SymbolAdminClient({
  initialSymbols,
}: {
  initialSymbols: SymbolType[];
}) {
  const [symbols, setSymbols] = useState<SymbolType[]>(initialSymbols);
  const [editing, setEditing] = useState<SymbolType | null>(null);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(false);

  const createSymbol = async (key: string, meaning: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/symbols', {
        method: 'POST',
        body: JSON.stringify({ key, meaning }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (res.ok) {
        setSymbols((prev) => [data, ...prev]);
        setCreating(false);
      } else {
        alert(data?.error || 'Create failed');
      }
    } finally {
      setLoading(false);
    }
  };

  // FIX: updateSymbol expects number ID
  const updateSymbol = async (id: number, key: string, meaning: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/symbols', {
        method: 'PUT',
        body: JSON.stringify({ id, key, meaning }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (res.ok) {
        // FIX: Compare number to number
        setSymbols((prev) => prev.map((s) => (s.id === id ? data : s)));
        setEditing(null);
      } else {
        alert(data?.error || 'Update failed');
      }
    } finally {
      setLoading(false);
    }
  };

  // FIX: deleteSymbol expects number ID
  const deleteSymbol = async (id: number) => {
    if (!confirm('Delete this symbol?')) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/symbols?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        // FIX: Compare number to number
        setSymbols((prev) => prev.filter((s) => s.id !== id));
      } else {
        const data = await res.json();
        alert(data?.error || 'Delete failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-purple-300">
          Manage dream symbol entries
        </div>
        <div>
          <button
            onClick={() => setCreating(true)}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create</span>
          </button>
        </div>
      </div>

      {/* Create form */}
      {creating && (
        <SymbolForm
          onCancel={() => setCreating(false)}
          onSave={createSymbol}
          loading={loading}
        />
      )}

      {/* Edit form */}
      {editing && (
        <SymbolForm
          initial={editing}
          onCancel={() => setEditing(null)}
          // FIX: Pass number ID to updateSymbol
          onSave={(k, m) => updateSymbol(editing.id, k, m)}
          loading={loading}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {symbols.map((s) => (
          <div key={s.id} className="card p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium capitalize">{s.key}</h3>
                <p className="text-sm text-purple-300">{s.meaning}</p>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <button
                  onClick={() => setEditing(s)}
                  className="text-sm text-purple-300 hover:text-white"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                {/* FIX: Pass number ID to deleteSymbol */}
                <button
                  onClick={() => deleteSymbol(s.id)}
                  className="text-sm text-red-400 hover:text-red-500"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SymbolForm({
  initial,
  onSave,
  onCancel,
  loading,
}: {
  initial?: any;
  onSave: (k: string, m: string) => void;
  onCancel: () => void;
  loading?: boolean;
}) {
  const [key, setKey] = useState(initial?.key ?? '');
  const [meaning, setMeaning] = useState(initial?.meaning ?? '');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(key, meaning);
      }}
      className="card p-4"
    >
      <div className="space-y-3">
        <input
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="key (e.g. flying)"
          className="w-full p-2 rounded bg-white/5 border border-white/10"
        />
        <textarea
          value={meaning}
          onChange={(e) => setMeaning(e.target.value)}
          placeholder="meaning"
          className="w-full p-2 rounded bg-white/5 border border-white/10"
        />
        <div className="flex items-center space-x-2">
          <button type="submit" disabled={loading} className="btn-primary">
            Save
          </button>
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}