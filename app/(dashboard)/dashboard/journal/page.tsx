'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { BookOpen, Plus, Search, Loader2, Smile, Frown, Meh, Heart, Sparkles, Calendar, Tag } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface JournalEntry {
  id: string;
  title?: string;
  content: string;
  mood?: string;
  tags: string[];
  date: string;
  createdAt: string;
}

const moods = [
  { value: 'happy', label: 'Happy', icon: Smile, color: 'text-yellow-400' },
  { value: 'sad', label: 'Sad', icon: Frown, color: 'text-blue-400' },
  { value: 'peaceful', label: 'Peaceful', icon: Heart, color: 'text-green-400' },
  { value: 'anxious', label: 'Anxious', icon: Meh, color: 'text-orange-400' },
  { value: 'grateful', label: 'Grateful', icon: Sparkles, color: 'text-purple-400' },
];

export default function JournalPage() {
  const { data: session } = useSession();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [saving, setSaving] = useState(false);

  // New entry form
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/journal');
      if (response.ok) {
        const data = await response.json();
        setEntries(data);
      }
    } catch (error) {
      console.error('Error fetching journal entries:', error);
      toast.error('Failed to load journal entries');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error('Please write something in your journal');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim() || undefined,
          content: content.trim(),
          mood: selectedMood || undefined,
          tags,
        }),
      });

      if (!response.ok) throw new Error('Failed to save entry');

      toast.success('Journal entry saved!');
      resetForm();
      setShowNewEntry(false);
      await fetchEntries();
    } catch (error) {
      console.error(error);
      toast.error('Failed to save journal entry');
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setSelectedMood('');
    setTags([]);
    setTagInput('');
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleDeleteEntry = async (id: string) => {
    if (!confirm('Delete this journal entry?')) return;

    try {
      const response = await fetch(`/api/journal/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete entry');

      toast.success('Entry deleted');
      await fetchEntries();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete entry');
    }
  };

  const filteredEntries = entries.filter((entry) =>
    entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 lg:p-12 pt-20 lg:pt-12 relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <BookOpen className="w-10 h-10 text-purple-400" />
            <h1 className="text-5xl lg:text-6xl font-light text-gradient">Dream Journal</h1>
            <Sparkles className="w-10 h-10 text-blue-300" />
          </div>
          <p className="text-purple-300 text-lg max-w-2xl mx-auto">
            Capture your thoughts, feelings, and reflections
          </p>
        </motion.div>

        {/* Actions Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-between"
        >
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search journal entries..."
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition-colors"
            />
          </div>

          {/* New Entry Button */}
          <button
            onClick={() => setShowNewEntry(!showNewEntry)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg transition-all font-medium whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            New Entry
          </button>
        </motion.div>

        {/* New Entry Form */}
        <AnimatePresence>
          {showNewEntry && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSubmit}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 lg:p-8 border border-white/10 space-y-6 overflow-hidden"
            >
              <h2 className="text-2xl font-light text-purple-200">New Journal Entry</h2>

              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm text-purple-300">Title (Optional)</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your entry a title..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition-colors"
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <label className="text-sm text-purple-300">What&apos;s on your mind?</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your thoughts, feelings, or reflections..."
                  rows={8}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition-colors resize-none"
                  required
                />
              </div>

              {/* Mood Selection */}
              <div className="space-y-2">
                <label className="text-sm text-purple-300">How are you feeling?</label>
                <div className="flex flex-wrap gap-3">
                  {moods.map((mood) => {
                    const Icon = mood.icon;
                    return (
                      <button
                        key={mood.value}
                        type="button"
                        onClick={() => setSelectedMood(mood.value === selectedMood ? '' : mood.value)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                          selectedMood === mood.value
                            ? 'bg-purple-600/30 border-purple-400'
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${mood.color}`} />
                        <span className="text-sm">{mood.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <label className="text-sm text-purple-300">Tags</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    placeholder="Add a tag..."
                    className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
                  >
                    Add
                  </button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 hover:text-purple-100"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowNewEntry(false);
                  }}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg transition-all font-medium disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Entry'
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Entries Grid */}
        <div className="space-y-4">
          <div className="text-purple-300">
            {filteredEntries.length} {filteredEntries.length === 1 ? 'entry' : 'entries'}
          </div>

          {filteredEntries.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-12 text-center border border-white/10"
            >
              <BookOpen className="w-16 h-16 mx-auto text-purple-400 opacity-50 mb-4" />
              <h3 className="text-2xl font-light mb-2">No journal entries yet</h3>
              <p className="text-purple-300 text-lg mb-6">Start writing to capture your thoughts and feelings</p>
              <button
                onClick={() => setShowNewEntry(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg transition-all font-medium"
              >
                <Plus className="w-5 h-5" />
                Create First Entry
              </button>
            </motion.div>
          ) : (
            <div className="grid gap-4">
              {filteredEntries.map((entry, index) => {
                const mood = moods.find((m) => m.value === entry.mood);
                const MoodIcon = mood?.icon;

                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        {entry.title && (
                          <h3 className="text-xl font-medium text-purple-100 mb-2">{entry.title}</h3>
                        )}
                        <div className="flex items-center gap-4 text-sm text-purple-300">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(entry.date).toLocaleDateString()}
                          </div>
                          {mood && MoodIcon && (
                            <div className="flex items-center gap-1">
                              <MoodIcon className={`w-4 h-4 ${mood.color}`} />
                              {mood.label}
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="opacity-0 group-hover:opacity-100 text-red-300 hover:text-red-200 transition-all text-sm"
                      >
                        Delete
                      </button>
                    </div>

                    <p className="text-purple-200 leading-relaxed mb-4 whitespace-pre-wrap">{entry.content}</p>

                    {entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {entry.tags.map((tag) => (
                          <span
                            key={tag}
                            className="flex items-center gap-1 px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
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
      `}</style>
    </div>
  );
}
