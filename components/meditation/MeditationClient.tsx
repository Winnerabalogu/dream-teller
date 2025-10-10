"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { Sparkles, Heart, Sun, Moon, Flower2, Zap, Wind, Flame, BookOpen, Cable as Candle } from "lucide-react"
import { useMeditationTracking } from "@/hooks/use-meditation"
import { Mantra, Meditation, MeditationTab, Props, Quote, Ritual } from "@/lib/meditaion"
import MeditationModal from "./MeditationModal"




const categoryIcons: Record<string, React.ReactNode> = {
  Peace: <Moon className="w-5 h-5" />,
  Guidance: <Sparkles className="w-5 h-5" />,
  Wisdom: <Sun className="w-5 h-5" />,
  Love: <Heart className="w-5 h-5" />,
  Growth: <Flower2 className="w-5 h-5" />,
  Intuition: <Zap className="w-5 h-5" />,
}

const categoryColors: Record<string, string> = {
  Peace: "from-blue-500 to-indigo-500",
  Guidance: "from-purple-500 to-pink-500",
  Wisdom: "from-yellow-500 to-orange-500",
  Love: "from-pink-500 to-rose-500",
  Growth: "from-green-500 to-emerald-500",
  Intuition: "from-indigo-500 to-purple-500",
}

const elementIcons: Record<string, React.ReactNode> = {
  Fire: <Flame className="w-4 h-4" />,
  Water: <Moon className="w-4 h-4" />,
  Air: <Wind className="w-4 h-4" />,
  Earth: <Flower2 className="w-4 h-4" />,
}

export default function MeditationClient({ dailyPractice, allMantras, allQuotes, allMeditations, allRituals }: Props) {
  const [activeTab, setActiveTab] = useState<MeditationTab>("daily")
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null)

  // Modal state
  const [modalContent, setModalContent] = useState<Mantra | Quote | Meditation | Ritual | null>(null)
  const [modalType, setModalType] = useState<"mantra" | "quote" | "meditation" | "ritual">("mantra")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { trackInteraction } = useMeditationTracking()

  const { dailyMantra, dailyQuote, dailyMeditation, dailyRitual, userProfile } = dailyPractice

  // Track quote only once using ref to prevent infinite API calls
  const trackedQuoteRef = useRef<string | null>(null)

  useEffect(() => {
    if (dailyQuote?.id && trackedQuoteRef.current !== dailyQuote.id) {
      trackedQuoteRef.current = dailyQuote.id
      trackInteraction({
        type: "quote",
        itemId: dailyQuote.id,
      }).catch((error) => {
        console.error("[v0] Failed to track quote interaction:", error)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dailyQuote?.id])
  
  const handleMantraClick = async (mantraId: string) => {
    const mantra = allMantras.find(m => m.id === mantraId)
    if (mantra) {
      setModalContent(mantra)
      setModalType("mantra")
      setIsModalOpen(true)
    }

    // Track the interaction
    try {
      await trackInteraction({
        type: "mantra",
        itemId: mantraId,
      })
    } catch (error) {
      console.error("[v0] Failed to track mantra interaction:", error)
    }
  }

  const handleMeditationClick = async (meditationId: string) => {
    const meditation = allMeditations.find(m => m.id === meditationId)
    if (meditation) {
      setModalContent(meditation)
      setModalType("meditation")
      setIsModalOpen(true)
    }

    // Track the interaction
    try {
      await trackInteraction({
        type: "meditation",
        itemId: meditationId,
      })
    } catch (error) {
      console.error("[v0] Failed to track meditation interaction:", error)
    }
  }

  const handleQuoteClick = async (quoteId: string) => {
    const quote = allQuotes.find(q => q.id === quoteId)
    if (quote) {
      setModalContent(quote)
      setModalType("quote")
      setIsModalOpen(true)
    }

    // Track the interaction
    try {
      await trackInteraction({
        type: "quote",
        itemId: quoteId,
      })
    } catch (error) {
      console.error("[v0] Failed to track quote interaction:", error)
    }
  }

  const handleRitualClick = async (ritualId: string) => {
    const ritual = allRituals.find(r => r.id === ritualId)
    if (ritual) {
      setModalContent(ritual)
      setModalType("ritual")
      setIsModalOpen(true)
    }

    // Track the interaction
    try {
      await trackInteraction({
        type: "ritual",
        itemId: ritualId,
      })
    } catch (error) {
      console.error("[v0] Failed to track ritual interaction:", error)
    }
  }

  // Group mantras by category
  const mantrasByCategory = allMantras.reduce(
    (acc, mantra) => {
      if (!acc[mantra.category]) acc[mantra.category] = []
      acc[mantra.category].push(mantra)
      return acc
    },
    {} as Record<string, Mantra[]>,
  )

  // Group quotes by theme
  const quotesByTheme = allQuotes.reduce(
    (acc, quote) => {
      if (!acc[quote.theme]) acc[quote.theme] = []
      acc[quote.theme].push(quote)
      return acc
    },
    {} as Record<string, Quote[]>,
  )

  // Group meditations by type
  const meditationsByType = allMeditations.reduce(
    (acc, meditation) => {
      if (!acc[meditation.type]) acc[meditation.type] = []
      acc[meditation.type].push(meditation)
      return acc
    },
    {} as Record<string, Meditation[]>,
  )

  // Group rituals by type
  const ritualsByType = allRituals.reduce(
    (acc, ritual) => {
      if (!acc[ritual.type]) acc[ritual.type] = []
      acc[ritual.type].push(ritual)
      return acc
    },
    {} as Record<string, Ritual[]>,
  )

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8 overflow-x-hidden w-full">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <header className="text-center mb-6 sm:mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 animate-pulse" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-gradient">Sacred Practice</h1>
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 animate-pulse" />
          </div>
          <p className="text-purple-200 text-sm sm:text-base lg:text-lg font-light opacity-90 max-w-2xl mx-auto px-2">
            Personalized meditations, mantras, and rituals tailored to your spiritual journey
          </p>
          {userProfile.starSign && (
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-purple-300 flex-wrap">
              <span>Your Profile:</span>
              <span className="px-3 py-1 bg-purple-500/20 rounded-full">{userProfile.starSign}</span>
              {userProfile.spiritType && (
                <span className="px-3 py-1 bg-blue-500/20 rounded-full flex items-center gap-1">
                  {elementIcons[userProfile.spiritType]}
                  {userProfile.spiritType}
                </span>
              )}
              {userProfile.energyType && (
                <span className="px-3 py-1 bg-indigo-500/20 rounded-full">{userProfile.energyType}</span>
              )}
            </div>
          )}
        </header>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 sm:mb-6 bg-white/5 backdrop-blur-lg rounded-xl p-2 border border-white/10 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveTab("daily")}
            className={`flex-1 min-w-fit py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition-all font-medium text-sm sm:text-base ${
              activeTab === "daily"
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                : "text-purple-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <div className="flex items-center justify-center gap-1 sm:gap-2">
              <Sun className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Today</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("meditations")}
            className={`flex-1 min-w-fit py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition-all font-medium text-sm sm:text-base ${
              activeTab === "meditations"
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                : "text-purple-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <div className="flex items-center justify-center gap-1 sm:gap-2">
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Meditations</span>
              <span className="xs:hidden">Meditate</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("mantras")}
            className={`flex-1 min-w-fit py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition-all font-medium text-sm sm:text-base ${
              activeTab === "mantras"
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                : "text-purple-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <div className="flex items-center justify-center gap-1 sm:gap-2">
              <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Mantras</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("rituals")}
            className={`flex-1 min-w-fit py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition-all font-medium text-sm sm:text-base ${
              activeTab === "rituals"
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                : "text-purple-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <div className="flex items-center justify-center gap-1 sm:gap-2">
              <Candle className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Rituals</span>
            </div>
          </button>
        </div>

        {/* Daily Practice Tab */}
        {activeTab === "daily" && (
          <div className="space-y-6 animate-fade-in">
            {/* Daily Meditation */}
            {dailyMeditation && (
              <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs font-medium text-indigo-300 uppercase tracking-wide">
                        Today&apos;s Meditation
                      </span>
                      <span className="text-xs text-indigo-400 bg-indigo-500/20 px-2 py-1 rounded-full">
                        {dailyMeditation.type}
                      </span>
                      <span className="text-xs text-purple-400 bg-purple-500/20 px-2 py-1 rounded-full">
                        {dailyMeditation.difficulty}
                      </span>
                      <span className="text-xs text-blue-400 bg-blue-500/20 px-2 py-1 rounded-full">
                        {dailyMeditation.duration} min
                      </span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-light text-white mb-3">{dailyMeditation.name}</h2>
                    <p className="text-purple-200 mb-4 leading-relaxed">{dailyMeditation.description}</p>
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-purple-300 mb-2">Benefits:</h4>
                      <div className="flex flex-wrap gap-2">
                        {dailyMeditation.benefits.map((benefit, i) => (
                          <span key={i} className="text-xs text-green-300 bg-green-500/20 px-3 py-1 rounded-full">
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                    {dailyMeditation.guides.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <h4 className="text-sm font-medium text-purple-300 mb-3">
                          Guided Practices ({dailyMeditation.guides.length})
                        </h4>
                        <div className="space-y-3">
                          {dailyMeditation.guides.map((guide) => (
                            <div key={guide.id} className="bg-white/5 rounded-lg p-4">
                              <button
                                onClick={() => setExpandedGuide(expandedGuide === guide.id ? null : guide.id)}
                                className="w-full text-left"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="text-purple-100 font-medium">{guide.title}</h5>
                                  <span className="text-xs text-purple-400">{guide.duration} min</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-purple-400">
                                  <span>{guide.author}</span>
                                  <span>•</span>
                                  <span>{guide.tradition}</span>
                                </div>
                              </button>
                              {expandedGuide === guide.id && (
                                <div className="mt-4 space-y-3 animate-fade-in">
                                  {guide.steps.map((step) => (
                                    <div key={step.step} className="flex gap-3">
                                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center text-xs text-purple-200">
                                        {step.step}
                                      </div>
                                      <div>
                                        <h6 className="text-sm font-medium text-purple-200 mb-1">{step.title}</h6>
                                        <p className="text-sm text-purple-300 leading-relaxed">{step.description}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Daily Mantra */}
            <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="flex items-start gap-3 mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${categoryColors[dailyMantra.category]}`}>
                  {categoryIcons[dailyMantra.category]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs font-medium text-purple-300 uppercase tracking-wide">Today&apos;s Mantra</span>
                    <span className="text-xs text-purple-400 bg-purple-500/20 px-2 py-1 rounded-full">
                      {dailyMantra.category}
                    </span>
                    {dailyMantra.origin && (
                      <span className="text-xs text-blue-400 bg-blue-500/20 px-2 py-1 rounded-full">
                        {dailyMantra.origin}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-light text-white mb-2 leading-relaxed">
                    {dailyMantra.text}
                  </h2>
                  {dailyMantra.translation && <p className="text-purple-200 italic mb-3">{dailyMantra.translation}</p>}
                  {dailyMantra.pronunciation && (
                    <p className="text-sm text-purple-300 mb-3">
                      <span className="font-medium">Pronunciation:</span> {dailyMantra.pronunciation}
                    </p>
                  )}
                  <p className="text-purple-300 text-sm leading-relaxed mb-3">{dailyMantra.intention}</p>
                  <div className="flex items-center gap-4 text-xs text-purple-400">
                    {dailyMantra.repetitions && <span>Repeat {dailyMantra.repetitions}x</span>}
                    {dailyMantra.bestTime && (
                      <>
                        <span>•</span>
                        <span>Best time: {dailyMantra.bestTime}</span>
                      </>
                    )}
                  </div>
                  {dailyMantra.guide && Array.isArray(dailyMantra.guide) && dailyMantra.guide.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <h4 className="text-sm font-medium text-purple-300 mb-3">Practice Guide</h4>
                      <div className="space-y-2">
                        {dailyMantra.guide.map((step, i: number) => (
                          <div key={i} className="flex gap-2 text-sm text-purple-300">
                            <span className="text-purple-400">{i + 1}.</span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Daily Quote */}
            <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="flex items-start gap-3">
                <Sun className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-yellow-200 uppercase tracking-wide">
                      Today&apos;s Inspiration
                    </span>
                    <span className="text-xs text-yellow-400 bg-yellow-500/20 px-2 py-1 rounded-full">
                      {dailyQuote.theme}
                    </span>
                  </div>
                  <p className="text-purple-100 text-xl lg:text-2xl font-light italic mb-4 leading-relaxed">
                    &quot;{dailyQuote.text}&quot;
                  </p>
                  <p className="text-purple-300 font-medium mb-4">— {dailyQuote.author}</p>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-sm text-purple-300 leading-relaxed">{dailyQuote.insight}</p>
                  </div>
                  {/* <button onClick={() => handleQuoteView(dailyQuote.id)} className="sr-only">Track Quote View</button> */}
                </div>
              </div>
            </div>

            {/* Daily Ritual */}
            {dailyRitual && (
              <div className="bg-gradient-to-br from-pink-600/20 to-purple-600/20 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500">
                    <Candle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs font-medium text-pink-300 uppercase tracking-wide">Today&apos;s Ritual</span>
                      <span className="text-xs text-pink-400 bg-pink-500/20 px-2 py-1 rounded-full">
                        {dailyRitual.type}
                      </span>
                      <span className="text-xs text-purple-400 bg-purple-500/20 px-2 py-1 rounded-full">
                        {dailyRitual.duration} min
                      </span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-light text-white mb-3">{dailyRitual.name}</h2>
                    <p className="text-purple-200 mb-4 leading-relaxed">{dailyRitual.description}</p>
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-purple-300 mb-2">Purpose:</h4>
                      <p className="text-sm text-purple-300 leading-relaxed">{dailyRitual.purpose}</p>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-purple-300 mb-2">Items Needed:</h4>
                      <div className="flex flex-wrap gap-2">
                        {dailyRitual.items.map((item, i) => (
                          <span key={i} className="text-xs text-pink-300 bg-pink-500/20 px-3 py-1 rounded-full">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    {dailyRitual.guides.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <h4 className="text-sm font-medium text-purple-300 mb-3">
                          Ritual Guides ({dailyRitual.guides.length})
                        </h4>
                        <div className="space-y-3">
                          {dailyRitual.guides.map((guide) => (
                            <div key={guide.id} className="bg-white/5 rounded-lg p-4">
                              <button
                                onClick={() => setExpandedGuide(expandedGuide === guide.id ? null : guide.id)}
                                className="w-full text-left"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="text-purple-100 font-medium">{guide.title}</h5>
                                  {guide.timing && <span className="text-xs text-purple-400">{guide.timing}</span>}
                                </div>
                                <p className="text-xs text-purple-400">{guide.tradition}</p>
                              </button>
                              {expandedGuide === guide.id && (
                                <div className="mt-4 space-y-4 animate-fade-in">
                                  <div>
                                    <h6 className="text-sm font-medium text-purple-200 mb-2">Preparation</h6>
                                    <p className="text-sm text-purple-300 leading-relaxed">{guide.preparation}</p>
                                  </div>
                                  <div>
                                    <h6 className="text-sm font-medium text-purple-200 mb-3">Steps</h6>
                                    <div className="space-y-3">
                                      {guide.steps.map((step) => (
                                        <div key={step.step} className="flex gap-3">
                                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-500/30 flex items-center justify-center text-xs text-pink-200">
                                            {step.step}
                                          </div>
                                          <div>
                                            <h6 className="text-sm font-medium text-purple-200 mb-1">{step.title}</h6>
                                            <p className="text-sm text-purple-300 leading-relaxed">
                                              {step.description}
                                            </p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <h6 className="text-sm font-medium text-purple-200 mb-2">Closing</h6>
                                    <p className="text-sm text-purple-300 leading-relaxed">{guide.closing}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
          {activeTab === "quotes" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="mb-6">
                    <h2 className="text-2xl font-light text-purple-100 mb-2">Inspirational Quotes Library</h2>
                    <p className="text-purple-300 text-sm">
                      Timeless wisdom organized by theme. Click to reflect deeper.
                    </p>
                  </div>

                  {Object.entries(quotesByTheme).map(([theme, quotes]) => (
                    <div key={theme}>
                      <h3 className="text-xl font-light text-purple-200 mb-3 flex items-center gap-2">
                        <Sun className="w-5 h-5 text-yellow-400" />
                        {theme}
                      </h3>
                      <div className={`grid gap-4 mb-6 ${quotes.length === 1 ? 'grid-cols-1' : 'sm:grid-cols-2'}`}>
                        {quotes.map((quote) => (
                          <button
                            key={quote.id}
                            onClick={() => handleQuoteClick(quote.id)}
                            className="text-left bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-yellow-400/50 transition-all hover:scale-[1.02] hover:bg-white/10"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                {quote.element && (
                                  <span className="text-xs text-purple-400 bg-purple-500/20 px-2 py-1 rounded-full flex items-center gap-1">
                                    {elementIcons[quote.element]}
                                    {quote.element}
                                  </span>
                                )}
                                <span className="text-xs text-blue-400 bg-blue-500/20 px-2 py-1 rounded-full">
                                  {quote.energy}
                                </span>
                              </div>
                            </div>
                            <p className="text-lg font-light leading-relaxed mb-2 italic text-purple-100">
                              &quot;{quote.text}&quot;
                            </p>
                            <p className="text-sm text-purple-300">— {quote.author}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
        {/* Meditations Tab */}
        {activeTab === "meditations" && (
          <div className="space-y-6 animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-light text-purple-100 mb-2">Meditation Library</h2>
              <p className="text-purple-300 text-sm">
                Explore different meditation practices with expert guides from various spiritual traditions.
              </p>
            </div>

            {Object.entries(meditationsByType).map(([type, meditations]) => (
              <div key={type}>
                <h3 className="text-xl font-light text-purple-200 mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-400" />
                  {type}
                </h3>
                <div className={`grid gap-4 mb-6 ${meditations.length === 1 ? 'grid-cols-1' : 'sm:grid-cols-2'}`}>
                  {meditations.map((meditation) => (
                    <div
                      key={meditation.id}
                      className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-lg font-medium text-purple-100">{meditation.name}</h4>
                        <div className="flex flex-col gap-1 items-end">
                          <span className="text-xs text-indigo-400 bg-indigo-500/20 px-2 py-1 rounded-full">
                            {meditation.difficulty}
                          </span>
                          <span className="text-xs text-blue-400 bg-blue-500/20 px-2 py-1 rounded-full">
                            {meditation.duration} min
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-purple-300 mb-4 leading-relaxed">{meditation.description}</p>
                      <div className="mb-4">
                        <h5 className="text-xs font-medium text-purple-400 mb-2">Benefits:</h5>
                        <div className="flex flex-wrap gap-1">
                          {meditation.benefits.slice(0, 3).map((benefit, i) => (
                            <span key={i} className="text-xs text-green-300 bg-green-500/20 px-2 py-1 rounded">
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => handleMeditationClick(meditation.id)}
                        className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                      >
                        View Full Details →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* All Mantras Tab */}
        {activeTab === "mantras" && (
          <div className="space-y-6 animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-light text-purple-100 mb-2">Sacred Mantras Library</h2>
              <p className="text-purple-300 text-sm">
                Explore all mantras organized by intention. Click to focus your meditation.
              </p>
            </div>

            {Object.entries(mantrasByCategory).map(([category, mantras]) => (
              <div key={category}>
                <h3 className="text-xl font-light text-purple-200 mb-3 flex items-center gap-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${categoryColors[category]}`}>
                    {categoryIcons[category]}
                  </div>
                  {category}
                </h3>
                <div className={`grid gap-4 mb-6 ${mantras.length === 1 ? 'grid-cols-1' : 'sm:grid-cols-2'}`}>
                  {mantras.map((mantra) => (
                    <button
                      key={mantra.id}
                      onClick={() => handleMantraClick(mantra.id)}
                      className="text-left bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-purple-400/50 transition-all hover:scale-[1.02] hover:bg-white/10"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {mantra.element && (
                            <span className="text-xs text-purple-400 bg-purple-500/20 px-2 py-1 rounded-full flex items-center gap-1">
                              {elementIcons[mantra.element]}
                              {mantra.element}
                            </span>
                          )}
                          <span className="text-xs text-blue-400 bg-blue-500/20 px-2 py-1 rounded-full">
                            {mantra.energy}
                          </span>
                        </div>
                      </div>
                      <p className="text-lg font-light leading-relaxed mb-2 text-purple-100">
                        {mantra.text}
                      </p>
                      {mantra.translation && (
                        <p className="text-sm text-purple-300 italic">{mantra.translation}</p>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Rituals Tab */}
        {activeTab === "rituals" && (
          <div className="space-y-6 animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-light text-purple-100 mb-2">Sacred Rituals</h2>
              <p className="text-purple-300 text-sm">
                Ceremonial practices to mark important moments and deepen your spiritual connection.
              </p>
            </div>

            {Object.entries(ritualsByType).map(([type, rituals]) => (
              <div key={type}>
                <h3 className="text-xl font-light text-purple-200 mb-3 flex items-center gap-2">
                  <Candle className="w-5 h-5 text-pink-400" />
                  {type}
                </h3>
                <div className={`grid gap-4 mb-6 ${rituals.length === 1 ? 'grid-cols-1' : 'sm:grid-cols-2'}`}>
                  {rituals.map((ritual) => (
                    <div
                      key={ritual.id}
                      className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-lg font-medium text-purple-100">{ritual.name}</h4>
                        <span className="text-xs text-pink-400 bg-pink-500/20 px-2 py-1 rounded-full">
                          {ritual.duration} min
                        </span>
                      </div>
                      <p className="text-sm text-purple-300 mb-4 leading-relaxed">{ritual.description}</p>
                      <div className="mb-4">
                        <h5 className="text-xs font-medium text-purple-400 mb-2">Purpose:</h5>
                        <p className="text-xs text-purple-300 leading-relaxed">{ritual.purpose}</p>
                      </div>
                      <div className="mb-4">
                        <h5 className="text-xs font-medium text-purple-400 mb-2">Items Needed:</h5>
                        <div className="flex flex-wrap gap-1">
                          {ritual.items.slice(0, 4).map((item, i) => (
                            <span key={i} className="text-xs text-pink-300 bg-pink-500/20 px-2 py-1 rounded">
                              {item}
                            </span>
                          ))}
                          {ritual.items.length > 4 && (
                            <span className="text-xs text-pink-400">+{ritual.items.length - 4} more</span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRitualClick(ritual.id)}
                        className="text-sm text-pink-400 hover:text-pink-300 transition-colors font-medium"
                      >
                        View Full Details →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <MeditationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={modalContent}
        type={modalType}
      />
    </div>
  )
}
