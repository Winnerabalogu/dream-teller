import MeditationClient from "@/components/meditation/MeditationClient"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import {
  getDailyMantra,
  getDailyQuote,
  getDailyMeditation,
  getDailyRitual,
  getUserProfile,
  getAllMantras,
  getAllQuotes,
  getAllMeditations,
  getAllRituals,
} from "@/services/meditation.service"

export default async function MeditationPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/auth/signin")
  }

  try {
    const [dailyMantra, dailyQuote, dailyMeditation, dailyRitual, userProfile, mantras, quotes, meditations, rituals] =
      await Promise.all([
        getDailyMantra(),
        getDailyQuote(),
        getDailyMeditation(),
        getDailyRitual(),
        getUserProfile(),
        getAllMantras(),
        getAllQuotes(),
        getAllMeditations(),
        getAllRituals(),
      ])

    const dailyPractice = {
      dailyMantra,
      dailyQuote,
      dailyMeditation,
      dailyRitual,
      userProfile,
    }

    return (
      <MeditationClient
        dailyPractice={dailyPractice}
        allMantras={mantras}
        allQuotes={quotes}
        allMeditations={meditations}
        allRituals={rituals}
      />
    )
  } catch (error) {
    console.error("[Meditation Page] Error loading content:", error)
    return (
      <div className="flex min-h-screen items-center justify-center p-4 pt-20">
        <div className="text-center space-y-4">
          <p className="text-purple-300 text-lg">Unable to load meditation content.</p>
          <p className="text-purple-400 text-sm">Please try refreshing the page.</p>
        </div>
      </div>
    )
  }
}
