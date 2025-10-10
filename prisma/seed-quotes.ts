import { PrismaClient } from "@prisma/client"
import chalk from "chalk"

const prisma = new PrismaClient()

const quoteData = [
  {
    text: "The privilege of a lifetime is to become who you truly are.",
    author: "Carl Jung",
    theme: "Self-Discovery",
    element: "Water",
    energy: "Reflective",
    signs: ["Cancer", "Scorpio", "Pisces", "Capricorn"], // Renamed from compatibleSigns
    insight: "Embracing your authentic self unlocks true fulfillment and inner peace.",
  },
  {
    text: "Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it.",
    author: "Rumi",
    theme: "Love",
    element: "Water",
    energy: "Heart-opening",
    signs: ["Cancer", "Pisces", "Libra", "Taurus"], // Renamed
    insight: "True love begins with dissolving self-imposed walls to allow connection.",
  },
  {
    text: "Be the change you wish to see in the world.",
    author: "Mahatma Gandhi",
    theme: "Action",
    element: "Fire",
    energy: "Inspiring",
    signs: ["Aries", "Leo", "Sagittarius", "Aquarius"], // Renamed
    insight: "Personal transformation inspires collective progress and harmony.",
  },
  {
    text: "The wound is the place where the Light enters you.",
    author: "Rumi",
    theme: "Healing",
    element: "Water",
    energy: "Transformative",
    signs: ["Scorpio", "Pisces", "Cancer", "Virgo"], // Renamed
    insight: "Painful experiences become portals for growth and enlightenment.",
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
    theme: "Growth",
    element: "Air",
    energy: "Optimistic",
    signs: ["Gemini", "Aquarius", "Sagittarius", "Aries"], // Renamed
    insight: "Challenges reveal hidden potentials for innovation and resilience.",
  },
  {
    text: "The only way out is through.",
    author: "Robert Frost",
    theme: "Courage",
    element: "Fire",
    energy: "Empowering",
    signs: ["Aries", "Scorpio", "Capricorn", "Leo"], // Renamed
    insight: "Facing fears head-on builds unshakeable strength and clarity.",
  },
  {
    text: "What you seek is seeking you.",
    author: "Rumi",
    theme: "Destiny",
    element: "Air",
    energy: "Mystical",
    signs: ["Pisces", "Sagittarius", "Aquarius", "Gemini"], // Renamed
    insight: "The universe aligns with your deepest desires when you trust the flow.",
  },
  {
    text: "The quieter you become, the more you can hear.",
    author: "Ram Dass",
    theme: "Stillness",
    element: "Water",
    energy: "Calming",
    signs: ["Cancer", "Pisces", "Taurus", "Virgo"], // Renamed
    insight: "Silence amplifies inner wisdom and intuitive guidance.",
  },
  {
    text: "Everything you can imagine is real.",
    author: "Pablo Picasso",
    theme: "Creativity",
    element: "Fire",
    energy: "Imaginative",
    signs: ["Leo", "Pisces", "Sagittarius", "Aquarius"], // Renamed
    insight: "Imagination bridges the gap between dreams and manifestation.",
  },
  {
    text: "The present moment is the only time over which we have dominion.",
    author: "Thích Nhất Hạnh",
    theme: "Presence",
    element: "Earth",
    energy: "Grounding",
    signs: ["Taurus", "Virgo", "Capricorn", "Cancer"], // Renamed
    insight: "Anchoring in the now frees you from past regrets and future anxieties.",
  },
  {
    text: "Your vision will become clear only when you can look into your own heart.",
    author: "Carl Jung",
    theme: "Self-Discovery",
    element: "Water",
    energy: "Introspective",
    signs: ["Scorpio", "Cancer", "Pisces", "Capricorn"], // Renamed
    insight: "Heart-centered reflection reveals your true path and purpose.",
  },
  {
    text: "Let yourself be silently drawn by the strange pull of what you really love.",
    author: "Rumi",
    theme: "Purpose",
    element: "Water",
    energy: "Magnetic",
    signs: ["Pisces", "Scorpio", "Taurus", "Libra"], // Renamed
    insight: "Passion is the compass guiding you to your soul's calling.",
  },
  {
    text: "The soul always knows what to do to heal itself. The challenge is to silence the mind.",
    author: "Caroline Myss",
    theme: "Healing",
    element: "Air",
    energy: "Peaceful",
    signs: ["Libra", "Aquarius", "Gemini", "Virgo"], // Renamed
    insight: "Quieting mental chatter allows innate healing to unfold naturally.",
  },
  {
    text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
    author: "Buddha",
    theme: "Presence",
    element: "Earth",
    energy: "Centering",
    signs: ["Taurus", "Virgo", "Capricorn", "Cancer"], // Renamed
    insight: "Mindful focus cultivates equanimity and profound awareness.",
  },
  {
    text: "The universe is not outside of you. Look inside yourself; everything that you want, you already are.",
    author: "Rumi",
    theme: "Wholeness",
    element: "Air",
    energy: "Expansive",
    signs: ["Aquarius", "Sagittarius", "Gemini", "Pisces"], // Renamed
    insight: "Inner abundance mirrors the infinite potential within all things.",
  },
  {
    text: "Your sacred space is where you can find yourself again and again.",
    author: "Joseph Campbell",
    theme: "Sanctuary",
    element: "Earth",
    energy: "Protective",
    signs: ["Cancer", "Taurus", "Virgo", "Capricorn"], // Renamed
    insight: "A personal haven nurtures reconnection with your essence.",
  },
  {
    text: "The only journey is the one within.",
    author: "Rainer Maria Rilke",
    theme: "Self-Discovery",
    element: "Water",
    energy: "Introspective",
    signs: ["Scorpio", "Pisces", "Cancer", "Capricorn"], // Renamed
    insight: "The deepest adventures lead to self-realization and liberation.",
  },
  {
    text: "When you realize nothing is lacking, the whole world belongs to you.",
    author: "Lao Tzu",
    theme: "Contentment",
    element: "Earth",
    energy: "Peaceful",
    signs: ["Taurus", "Libra", "Capricorn", "Pisces"], // Renamed
    insight: "Gratitude for what is transforms scarcity into boundless wealth.",
  },
]

async function main() {
  console.log(chalk.blue("💭 Seeding quote data...\n"))

  for (const data of quoteData) {
    await prisma.quote.upsert({
      where: {
        text_author: {
          text: data.text,
          author: data.author,
        },
      },
      update: {},
      create: data,
    })
  }

  console.log(chalk.green(`✅ Seeded ${quoteData.length} quotes!`))
  console.log(chalk.yellow("\n✨ Quote database is ready.\n"))
}

main()
  .catch((e) => {
    console.error(chalk.red("❌ Seeding failed:"), e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })