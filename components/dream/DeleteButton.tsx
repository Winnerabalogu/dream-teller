// src/components/dream/DeleteButton.tsx
'use client';

import { useState } from 'react';
import { deleteDream } from '@/services/db';
import { Trash2, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ dreamId }: { dreamId: string }) {
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteDream(dreamId);
      router.push('/');
    } catch (error) {
      console.error('Delete failed:', error);
      setLoading(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Trash2 className="w-4 h-4" />
              <span>Confirm Delete</span>
            </>
          )}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          className="btn-secondary"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="btn-secondary flex items-center space-x-2 text-red-400 hover:text-red-300"
    >
      <Trash2 className="w-4 h-4" />
      <span>Delete</span>
    </button>
  );
}