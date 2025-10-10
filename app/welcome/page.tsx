"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Moon, Sun, Sunrise, CloudMoon, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import StunningAiLoader from "@/components/ui/stunning-ai-loader"

interface UserProfile {
  id: string
  name: string
  email: string
  starSign?: string
  spiritType?: string
  energyType?: string
  birthDate?: string
}

const morningMessages = {
  early: [
    "You're up early. The world is quiet right now—perfect for reflection.",
    "Dawn is breaking. What dreams did the night bring you?",
    "The early morning is calling. How did you sleep?",
  ],
  morning: [
    "Good morning. Ready to dive into your dreams?",
    "What memories from the night are still with you?",
    "A new day begins. Did anything interesting happen while you were asleep?",
  ],
  afternoon: [
    "Afternoon. Sometimes the best dreams come back to us during the day.",
    "Still thinking about your dreams from last night?",
    "How are you doing? Any dreams on your mind?",
  ],
  evening: [
    "Evening is here. Time to prepare for sleep and reflection.",
    "As the day winds down, what have you noticed about yourself?",
    "Evening light. What will tonight bring?",
  ],
  night: [
    "The night is deep. Are you journaling before sleep?",
    "Late night thoughts. Capturing dreams as they fade?",
    "The quiet hours. Perfect for dream reflection.",
  ],
}

export default function WelcomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [selectedMessage, setSelectedMessage] = useState("")
  const [step, setStep] = useState(0)
  const [userChoice, setUserChoice] = useState<string>("")
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (session?.user?.email) {
        try {
          const res = await fetch("/api/user/profile")
          if (res.ok) {
            const profile = await res.json()
            setUserProfile(profile)
          }
        } catch (error) {
          console.error("Failed to fetch profile:", error)
        }
      }
      setIsLoading(false)
    }

    const timer = setTimeout(() => {
      fetchUserProfile()
    }, 1500)

    return () => clearTimeout(timer)
  }, [session])

  useEffect(() => {
    const getTimeOfDay = () => {
      const hour = new Date().getHours()
      if (hour >= 5 && hour < 8) return "early"
      if (hour >= 8 && hour < 12) return "morning"
      if (hour >= 12 && hour < 17) return "afternoon"
      if (hour >= 17 && hour < 21) return "evening"
      return "night"
    }

    const timeOfDay = getTimeOfDay()
    const messages = morningMessages[timeOfDay as keyof typeof morningMessages]
    setSelectedMessage(messages[Math.floor(Math.random() * messages.length)])
  }, [])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12)
      return { icon: <Sunrise className="w-10 h-10 md:w-12 md:h-12" />, text: "Good morning" }
    if (hour >= 12 && hour < 17) return { icon: <Sun className="w-10 h-10 md:w-12 md:h-12" />, text: "Good afternoon" }
    if (hour >= 17 && hour < 21)
      return { icon: <CloudMoon className="w-10 h-10 md:w-12 md:h-12" />, text: "Good evening" }
    return { icon: <Moon className="w-16 h-16 md:w-20 md:h-20 text-amber-200/80" />, text: "Good night" }
  }

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push("/")
  }

  const handleNavigate = (destination: string) => {
    router.push(destination)
  }

  const greeting = getGreeting()

  if (isLoading) {
    return <StunningAiLoader />
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-950 to-rose-950">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-amber-200 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px]" />

      {/* Logout button */}
      <motion.button
        onClick={handleLogout}
        className="absolute top-6 right-6 z-20 flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <LogOut className="w-4 h-4" />
        <span>Sign out</span>
      </motion.button>

      <AnimatePresence mode="wait">
        <motion.div
          key="welcome"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative z-10 flex items-center justify-center min-h-screen px-6 py-12"
        >
          <div className="max-w-3xl w-full text-center space-y-12 md:space-y-16">
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="flex justify-center text-amber-200/80">{greeting.icon}</div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight">
                {greeting.text},{" "}
                <span className="font-normal bg-gradient-to-r from-amber-200 via-rose-200 to-purple-200 bg-clip-text text-transparent">
                  {userProfile?.name || "there"}
                </span>
              </h1>
            </motion.div>

            {/* Personalized message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="space-y-8"
            >
              <p className="text-xl md:text-2xl lg:text-3xl text-slate-200 font-light leading-relaxed max-w-2xl mx-auto">
                {selectedMessage}
              </p>

              {/* Context-aware options */}
              {step === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4"
                >
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => {
                        setUserChoice("journal")
                        setStep(1)
                      }}
                      className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500/90 to-rose-500/90 hover:from-amber-500 hover:to-rose-500 text-white font-normal px-10 py-5 rounded-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl text-lg"
                    >
                      Add a dream
                    </button>
                    <button
                      onClick={() => {
                        setUserChoice("interpret")
                        setStep(1)
                      }}
                      className="inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-normal px-10 py-5 rounded-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] text-lg backdrop-blur-sm"
                    >
                      Interpret a dream
                    </button>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => handleNavigate("/dashboard")}
                      className="text-slate-400 hover:text-slate-300 text-sm font-light transition-colors"
                    >
                      View your journal
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Follow-up based on choice */}
              {step === 1 && userChoice === "journal" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6"
                >
                  <p className="text-lg text-slate-300 font-light italic">
                    A fresh page is waiting. Write whatever comes to mind—there&apos;s no right way to capture a dream.
                  </p>
                  <button
                    onClick={() => handleNavigate("/dashboard")}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500/90 to-rose-500/90 hover:from-amber-500 hover:to-rose-500 text-white font-normal px-10 py-5 rounded-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl text-lg"
                  >
                    Start journaling
                  </button>
                </motion.div>
              )}

              {step === 1 && userChoice === "interpret" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6"
                >
                  <p className="text-lg text-slate-300 font-light italic">
                    Let&apos;s explore what your subconscious is trying to tell you. What dream is on your mind?
                  </p>
                  <button
                    onClick={() => handleNavigate("/dashboard")}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500/90 to-rose-500/90 hover:from-amber-500 hover:to-rose-500 text-white font-normal px-10 py-5 rounded-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl text-lg"
                  >
                    Interpret now
                  </button>
                </motion.div>
              )}
            </motion.div>

            {/* Spiritual profile hint */}
            {userProfile && !userProfile.starSign && step === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-slate-400 text-sm font-light"
              >
                <p>
                  Complete your spiritual profile to get more personalized insights.{" "}
                  <button
                    onClick={() => handleNavigate("/dashboard/profile")}
                    className="text-amber-300 hover:text-amber-200 transition-colors"
                  >
                    Set it up
                  </button>
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}