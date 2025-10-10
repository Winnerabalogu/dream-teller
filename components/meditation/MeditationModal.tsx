"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Sparkles, Heart, BookOpen, Cable as Candle, Sun } from "lucide-react"
import type { Mantra, Quote, Meditation, Ritual } from "@/lib/meditaion"

interface MeditationModalProps {
  isOpen: boolean
  onClose: () => void
  content: Mantra | Quote | Meditation | Ritual | null
  type: "mantra" | "quote" | "meditation" | "ritual"
}

export default function MeditationModal({ isOpen, onClose, content, type }: MeditationModalProps) {
  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!content) return null

  const getIcon = () => {
    switch (type) {
      case "mantra":
        return <Heart className="w-6 h-6" />
      case "quote":
        return <Sun className="w-6 h-6" />
      case "meditation":
        return <BookOpen className="w-6 h-6" />
      case "ritual":
        return <Candle className="w-6 h-6" />
    }
  }

  const getGradient = () => {
    switch (type) {
      case "mantra":
        return "from-purple-600 to-pink-600"
      case "quote":
        return "from-yellow-600 to-orange-600"
      case "meditation":
        return "from-indigo-600 to-purple-600"
      case "ritual":
        return "from-pink-600 to-purple-600"
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-3xl max-h-[85vh] overflow-y-auto pointer-events-auto"
            >
              <div className="relative bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl">
                {/* Pulsating glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl opacity-20 blur-xl animate-pulse" />

                <div className="relative p-8">
                  {/* Close button */}
                  <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors group"
                  >
                    <X className="w-5 h-5 text-white/70 group-hover:text-white" />
                  </button>

                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className={`p-4 rounded-2xl bg-gradient-to-br ${getGradient()} shadow-lg`}
                    >
                      {getIcon()}
                    </motion.div>
                    <div className="flex-1">
                      <span className="text-xs font-medium text-purple-300 uppercase tracking-wide">
                        {type}
                      </span>
                    </div>
                  </div>

                  {/* Content based on type */}
                  {type === "mantra" && "text" in content && (
                    <div className="space-y-6">
                      <h2 className="text-3xl lg:text-4xl font-light text-white leading-relaxed">
                        {content.text}
                      </h2>
                      {"translation" in content && content.translation && (
                        <p className="text-xl text-purple-200 italic">{content.translation}</p>
                      )}
                      {"pronunciation" in content && content.pronunciation && (
                        <div className="bg-white/5 rounded-xl p-4">
                          <span className="text-sm font-medium text-purple-300">Pronunciation:</span>
                          <p className="text-lg text-purple-100 mt-1">{content.pronunciation}</p>
                        </div>
                      )}
                      {"intention" in content && content.intention && (
                        <div className="bg-white/5 rounded-xl p-4">
                          <span className="text-sm font-medium text-purple-300">Intention:</span>
                          <p className="text-purple-100 leading-relaxed mt-2">{content.intention}</p>
                        </div>
                      )}
                      {"repetitions" in content && content.repetitions && (
                        <div className="flex items-center gap-4 text-sm text-purple-300">
                          <span>Repeat {content.repetitions}x</span>
                          {"bestTime" in content && content.bestTime && (
                            <>
                              <span>•</span>
                              <span>Best time: {content.bestTime}</span>
                            </>
                          )}
                        </div>
                      )}
                      {"guide" in content && Array.isArray(content.guide) && content.guide.length > 0 && (
                        <div className="bg-white/5 rounded-xl p-4 space-y-3">
                          <h4 className="text-sm font-medium text-purple-300">Practice Guide</h4>
                          {content.guide.map((step: string, i: number) => (
                            <div key={i} className="flex gap-3">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center text-xs text-purple-200">
                                {i + 1}
                              </span>
                              <p className="text-purple-200">{step}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {type === "quote" && "text" in content && (
                    <div className="space-y-6">
                      <p className="text-2xl lg:text-3xl font-light text-white italic leading-relaxed">
                        &quot;{content.text}&quot;
                      </p>
                      {"author" in content && (
                        <p className="text-xl text-purple-200 font-medium">— {content.author}</p>
                      )}
                      {"insight" in content && content.insight && (
                        <div className="bg-white/5 rounded-xl p-6">
                          <p className="text-purple-100 leading-relaxed text-lg">{content.insight}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {type === "meditation" && "name" in content && (
                    <div className="space-y-6">
                      <h2 className="text-3xl lg:text-4xl font-light text-white">{content.name}</h2>
                      {"description" in content && (
                        <p className="text-lg text-purple-200 leading-relaxed">{content.description}</p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {"type" in content && (
                          <span className="text-xs text-indigo-300 bg-indigo-500/20 px-3 py-1 rounded-full">
                            {content.type}
                          </span>
                        )}
                        {"difficulty" in content && (
                          <span className="text-xs text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full">
                            {content.difficulty}
                          </span>
                        )}
                        {"duration" in content && (
                          <span className="text-xs text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full">
                            {content.duration} min
                          </span>
                        )}
                      </div>
                      {"benefits" in content && Array.isArray(content.benefits) && content.benefits.length > 0 && (
                        <div className="bg-white/5 rounded-xl p-4">
                          <h4 className="text-sm font-medium text-purple-300 mb-3">Benefits:</h4>
                          <div className="flex flex-wrap gap-2">
                            {content.benefits.map((benefit: string, i: number) => (
                              <span key={i} className="text-sm text-green-300 bg-green-500/20 px-3 py-1 rounded-full">
                                {benefit}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {"guides" in content && Array.isArray(content.guides) && content.guides.length > 0 && (
                        <div className="bg-white/5 rounded-xl p-4 space-y-4">
                          <h4 className="text-sm font-medium text-purple-300">
                            Guided Practices ({content.guides.length})
                          </h4>
                          {content.guides.map((guide: any) => (
                            <div key={guide.id} className="bg-white/5 rounded-lg p-4 space-y-3">
                              <div className="flex items-center justify-between">
                                <h5 className="text-lg text-purple-100 font-medium">{guide.title}</h5>
                                <span className="text-sm text-purple-400">{guide.duration} min</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-purple-400">
                                <span>{guide.author}</span>
                                <span>•</span>
                                <span>{guide.tradition}</span>
                              </div>
                              {guide.steps && (
                                <div className="space-y-2 pt-2">
                                  {guide.steps.map((step: any) => (
                                    <div key={step.step} className="flex gap-3">
                                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/30 flex items-center justify-center text-xs text-indigo-200">
                                        {step.step}
                                      </span>
                                      <div>
                                        <p className="text-sm font-medium text-purple-200">{step.title}</p>
                                        <p className="text-sm text-purple-300">{step.description}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {type === "ritual" && "name" in content && (
                    <div className="space-y-6">
                      <h2 className="text-3xl lg:text-4xl font-light text-white">{content.name}</h2>
                      {"description" in content && (
                        <p className="text-lg text-purple-200 leading-relaxed">{content.description}</p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {"type" in content && (
                          <span className="text-xs text-pink-300 bg-pink-500/20 px-3 py-1 rounded-full">
                            {content.type}
                          </span>
                        )}
                        {"duration" in content && (
                          <span className="text-xs text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full">
                            {content.duration} min
                          </span>
                        )}
                      </div>
                      {"purpose" in content && content.purpose && (
                        <div className="bg-white/5 rounded-xl p-4">
                          <h4 className="text-sm font-medium text-purple-300 mb-2">Purpose:</h4>
                          <p className="text-purple-100 leading-relaxed">{content.purpose}</p>
                        </div>
                      )}
                      {"items" in content && Array.isArray(content.items) && content.items.length > 0 && (
                        <div className="bg-white/5 rounded-xl p-4">
                          <h4 className="text-sm font-medium text-purple-300 mb-3">Items Needed:</h4>
                          <div className="flex flex-wrap gap-2">
                            {content.items.map((item: string, i: number) => (
                              <span key={i} className="text-sm text-pink-300 bg-pink-500/20 px-3 py-1 rounded-full">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {"guides" in content && Array.isArray(content.guides) && content.guides.length > 0 && (
                        <div className="bg-white/5 rounded-xl p-4 space-y-4">
                          <h4 className="text-sm font-medium text-purple-300">
                            Ritual Guides ({content.guides.length})
                          </h4>
                          {content.guides.map((guide: any) => (
                            <div key={guide.id} className="bg-white/5 rounded-lg p-4 space-y-3">
                              <div className="flex items-center justify-between">
                                <h5 className="text-lg text-purple-100 font-medium">{guide.title}</h5>
                                {guide.timing && <span className="text-sm text-purple-400">{guide.timing}</span>}
                              </div>
                              <p className="text-sm text-purple-400">{guide.tradition}</p>
                              {guide.preparation && (
                                <div>
                                  <h6 className="text-sm font-medium text-purple-200 mb-1">Preparation:</h6>
                                  <p className="text-sm text-purple-300 leading-relaxed">{guide.preparation}</p>
                                </div>
                              )}
                              {guide.steps && (
                                <div>
                                  <h6 className="text-sm font-medium text-purple-200 mb-2">Steps:</h6>
                                  <div className="space-y-2">
                                    {guide.steps.map((step: any) => (
                                      <div key={step.step} className="flex gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-500/30 flex items-center justify-center text-xs text-pink-200">
                                          {step.step}
                                        </span>
                                        <div>
                                          <p className="text-sm font-medium text-purple-200">{step.title}</p>
                                          <p className="text-sm text-purple-300">{step.description}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {guide.closing && (
                                <div>
                                  <h6 className="text-sm font-medium text-purple-200 mb-1">Closing:</h6>
                                  <p className="text-sm text-purple-300 leading-relaxed">{guide.closing}</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Decorative sparkles */}
                  <div className="absolute top-10 right-20 text-purple-400 opacity-30">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-8 h-8" />
                    </motion.div>
                  </div>
                  <div className="absolute bottom-10 left-20 text-pink-400 opacity-30">
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-6 h-6" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
