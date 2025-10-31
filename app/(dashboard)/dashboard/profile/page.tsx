// app/dashboard/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { User, Star, Zap, Calendar, Loader2, Save, Sparkles, Sun, Heart, AlertCircle, Lightbulb, TrendingUp, Target, Flame } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useHoroscope } from '@/hooks/useHoroscope';

interface UserProfile {
  id: string;
  name?: string;
  email?: string;
  starSign?: string;
  spiritType?: string;
  energyType?: string;
  birthDate?: string;
}

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showHoroscope, setShowHoroscope] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    starSign: '',
    spiritType: '',
    energyType: '',
    birthDate: '',
  });

  const { horoscope, dailyReading, loading: horoscopeLoading, dailyGuidance, spiritualInsights, isOptimalTime } = useHoroscope(formData.starSign);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/user/profile');
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const profile = await response.json();
        setUserProfile(profile);
        setFormData({
          name: profile.name || '',
          email: profile.email || '',
          starSign: profile.starSign || '',
          spiritType: profile.spiritType || '',
          energyType: profile.energyType || '',
          birthDate: profile.birthDate ? new Date(profile.birthDate).toISOString().split('T')[0] : '',
        });
      } catch (error) {
        console.error(error);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchProfile();
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedProfile = await response.json();
      setUserProfile(updatedProfile);
      await update();
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const starSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  const spiritTypes = ['Fire', 'Water', 'Earth', 'Air'];
  const energyTypes = ['Calm', 'Active', 'Balanced', 'Intuitive', 'Analytical'];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-purple-300">Please sign in to view your profile.</p>
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

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <User className="w-10 h-10 text-purple-400" />
            <h1 className="text-5xl lg:text-6xl font-light text-gradient">Your Profile</h1>
            <Sparkles className="w-10 h-10 text-blue-300" />
          </div>
          <p className="text-purple-300 text-lg max-w-2xl mx-auto">
            Personalize your spiritual journey
          </p>
        </motion.div>

        {/* Profile Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 lg:p-8 border border-white/10 space-y-6"
        >
          {/* Basic Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-light text-purple-200 flex items-center gap-2">
              <User className="w-6 h-6" />
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-purple-300">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-purple-300">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white/50 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Spiritual Profile */}
          <div className="space-y-6 pt-6 border-t border-white/10">
            <h2 className="text-2xl font-light text-purple-200 flex items-center gap-2">
              <Star className="w-6 h-6" />
              Spiritual Profile
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-purple-300">Birth Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-purple-300">Star Sign</label>
                <select
                  value={formData.starSign}
                  onChange={(e) => setFormData({ ...formData, starSign: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-400 transition-colors"
                >
                  <option value="">Select your sign</option>
                  {starSigns.map((sign) => (
                    <option key={sign} value={sign}>
                      {sign}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-purple-300">Spirit Type</label>
                <select
                  value={formData.spiritType}
                  onChange={(e) => setFormData({ ...formData, spiritType: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-400 transition-colors"
                >
                  <option value="">Select spirit type</option>
                  {spiritTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-purple-300">Energy Type</label>
                <select
                  value={formData.energyType}
                  onChange={(e) => setFormData({ ...formData, energyType: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-400 transition-colors"
                >
                  <option value="">Select energy type</option>
                  {energyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </motion.form>

        {/* Daily Horoscope Section */}
        {horoscope && formData.starSign && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <button
              onClick={() => setShowHoroscope(!showHoroscope)}
              className="w-full bg-gradient-to-r from-amber-500/20 to-rose-500/20 hover:from-amber-500/30 hover:to-rose-500/30 backdrop-blur-lg rounded-2xl p-6 border border-amber-500/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sun className="w-6 h-6 text-amber-300" />
                  <div className="text-left">
                    <h3 className="text-xl font-light text-amber-100">
                      Your {formData.starSign} Reading for {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </h3>
                    {dailyReading && (
                      <p className="text-sm text-amber-300/70 mt-1">✨ Fresh insights for today</p>
                    )}
                  </div>
                </div>
                <span className="text-amber-300 text-2xl">{showHoroscope ? '▼' : '▶'}</span>
              </div>
            </button>

            {showHoroscope && (
              horoscopeLoading ? (
                <div className="flex justify-center items-center p-12">
                  <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
                </div>
              ) : dailyReading && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 space-y-6"
                >
                  {/* Energy Level */}
                  {dailyGuidance?.energyLevel && (
                    <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-lg p-4 border border-green-400/30">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-green-300 text-sm font-medium flex items-center gap-2">
                          <Flame className="w-4 h-4" /> Today&apos;s Energy Level
                        </p>
                        <span className="text-2xl font-bold text-green-200">{dailyGuidance.energyLevel}/10</span>
                      </div>
                      <p className="text-white text-sm leading-relaxed">{dailyGuidance.energyDescription}</p>
                    </div>
                  )}

                  {/* Daily Affirmation */}
                  {dailyGuidance?.affirmation && (
                    <div className="bg-gradient-to-r from-pink-600/20 to-purple-600/20 rounded-lg p-6 border border-pink-400/30 text-center">
                      <p className="text-pink-300 text-xs mb-3 uppercase tracking-wide">Today&apos;s Affirmation</p>
                      <p className="text-white text-lg font-light italic leading-relaxed">&ldquo;{dailyGuidance.affirmation}&rdquo;</p>
                    </div>
                  )}

                  {/* Sign Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <p className="text-purple-300 text-sm mb-1">Ruling Planet</p>
                      <p className="text-white font-medium">{horoscope.rulingPlanet}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <p className="text-purple-300 text-sm mb-1">Element</p>
                      <p className="text-white font-medium">{horoscope.element}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <p className="text-purple-300 text-sm mb-1">Lucky Element</p>
                      <p className="text-white font-medium">{dailyGuidance?.luckyElement || horoscope.luckyNumber}</p>
                    </div>
                  </div>

                  {/* Focus Areas */}
                  {dailyGuidance?.focusAreas && dailyGuidance.focusAreas.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-purple-300 text-sm flex items-center gap-2">
                        <Target className="w-4 h-4" /> Focus Areas for Today
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {dailyGuidance.focusAreas.map((area, idx) => (
                          <div key={idx} className="bg-purple-500/20 rounded-lg p-3 text-center border border-purple-400/30">
                            <p className="text-purple-100 text-sm font-medium">{area}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Today's Theme */}
                  {dailyGuidance && (
                    <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-4 border border-purple-400/30">
                      <p className="text-purple-300 text-sm mb-2 flex items-center gap-2">
                        <Sun className="w-4 h-4" /> Today&apos;s Theme
                      </p>
                      <p className="text-white leading-relaxed">{dailyGuidance.theme}</p>
                    </div>
                  )}

                  {/* Advice */}
                  {dailyGuidance && (
                    <div className="bg-gradient-to-r from-amber-600/20 to-rose-600/20 rounded-lg p-4 border border-amber-400/30">
                      <p className="text-amber-300 text-sm mb-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" /> Today&apos;s Guidance
                      </p>
                      <p className="text-white leading-relaxed">{dailyGuidance.advice}</p>
                    </div>
                  )}

                  {/* Traits */}
                  <div className="space-y-2">
                    <p className="text-purple-300 text-sm flex items-center gap-2">
                      <Heart className="w-4 h-4" /> Your Core Traits
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {horoscope.traits.map((trait) => (
                        <span key={trait} className="px-4 py-2 bg-purple-500/20 rounded-full text-purple-200 text-sm border border-purple-400/30">
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Strength & Challenge */}
                  {spiritualInsights && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-lg p-4 border border-green-400/30">
                        <p className="text-green-300 text-sm mb-2 font-medium flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" /> Your Strength
                        </p>
                        <p className="text-white text-sm leading-relaxed">{spiritualInsights.strength}</p>
                      </div>
                      <div className="bg-gradient-to-r from-orange-600/20 to-yellow-600/20 rounded-lg p-4 border border-orange-400/30">
                        <p className="text-orange-300 text-sm mb-2 font-medium">Challenge to Embrace</p>
                        <p className="text-white text-sm leading-relaxed">{spiritualInsights.challenge}</p>
                      </div>
                    </div>
                  )}

                  {/* Spiritual Wisdom */}
                  {spiritualInsights && (
                    <div className="space-y-4 pt-4 border-t border-white/10">
                      <h4 className="text-purple-200 font-light flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-yellow-300" /> Spiritual Wisdom
                      </h4>
                      
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <p className="text-purple-300 text-xs mb-2">Life Lesson</p>
                        <p className="text-white text-sm leading-relaxed">{spiritualInsights.lifeLesson}</p>
                      </div>

                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <p className="text-purple-300 text-xs mb-2">Spiritual Gift</p>
                        <p className="text-white text-sm leading-relaxed">{spiritualInsights.spiritualGift}</p>
                      </div>

                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <p className="text-purple-300 text-xs mb-2">Shadow Aspect to Integrate</p>
                        <p className="text-white text-sm leading-relaxed">{spiritualInsights.shadowAspect}</p>
                      </div>
                    </div>
                  )}

                  {/* Best Time & Optimal Status */}
                  {dailyGuidance && (
                    <div className="text-center pt-4 border-t border-white/10 space-y-2">
                      <p className="text-purple-300 text-sm">
                        ✨ Best Time for Intentions: <span className="text-amber-300 font-medium">{dailyGuidance.bestTime}</span>
                      </p>
                      {isOptimalTime && (
                        <p className="text-green-300 text-sm font-light">🌟 It&apos;s your optimal time right now!</p>
                      )}
                    </div>
                  )}
                </motion.div>
              )
            )}
          </motion.div>
        )}

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            {
              icon: <Star className="w-5 h-5" />,
              title: 'Star Sign',
              desc: 'Influences dream symbolism and themes',
            },
            {
              icon: <Zap className="w-5 h-5" />,
              title: 'Spirit Type',
              desc: 'Reflects your elemental nature',
            },
            {
              icon: <Sparkles className="w-5 h-5" />,
              title: 'Energy Type',
              desc: 'Affects dream patterns and intensity',
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-purple-500/20 rounded-lg text-purple-300">
                  {card.icon}
                </div>
                <h3 className="font-medium text-purple-100">{card.title}</h3>
              </div>
              <p className="text-purple-300 text-sm">{card.desc}</p>
            </div>
          ))}
        </motion.div>
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
      `}</style>
    </div>
  );
}