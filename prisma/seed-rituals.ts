import { PrismaClient } from "@prisma/client"
import chalk from "chalk"

const prisma = new PrismaClient()

const ritualData = [
  {
    name: "Morning Sun Salutation",
    type: "Morning",
    description: "Greet the day with gratitude and set intentions",
    duration: 15,
    element: "Fire",
    energy: "Energizing",
    signs: ["Aries", "Leo", "Sagittarius", "Gemini"], // Renamed from compatibleSigns
    items: ["Yoga mat", "Candle (optional)", "Journal"], // Renamed from materials
    purpose: "To energize the body and mind for the day ahead, aligning with solar energy at sunrise.",
  },
  {
    name: "Evening Release Ceremony",
    type: "Evening",
    description: "Release the day's burdens and prepare for rest",
    duration: 20,
    element: "Water",
    energy: "Calming",
    signs: ["Cancer", "Pisces", "Scorpio", "Taurus"], // Renamed
    items: ["Candle", "Bowl of water", "Journal", "Sage or incense"], // Renamed
    purpose: "To let go of daily stresses and invite restorative sleep, ideally from sunset to bedtime.",
  },
  {
    name: "New Moon Intention Setting",
    type: "Moon Phase",
    description: "Plant seeds of intention during the new moon",
    duration: 30,
    element: "Earth",
    energy: "Manifesting",
    signs: ["Taurus", "Virgo", "Capricorn", "Cancer"], // Renamed
    items: ["Candle", "Journal", "Crystals", "Incense"], // Renamed
    purpose: "To set clear intentions for growth and manifestation during the new moon's potent energy.",
  },
  {
    name: "Full Moon Release",
    type: "Moon Phase",
    description: "Release what no longer serves under the full moon",
    duration: 30,
    element: "Water",
    energy: "Releasing",
    signs: ["Cancer", "Scorpio", "Pisces", "Libra"], // Renamed
    items: ["Candle", "Paper", "Fire-safe bowl", "Water"], // Renamed
    purpose: "To purge outdated patterns and make space for renewal under the full moon's illuminating light.",
  },
  {
    name: "Seasonal Equinox Balance",
    type: "Seasonal",
    description: "Honor the balance of light and dark at equinox",
    duration: 45,
    element: "Air",
    energy: "Balancing",
    signs: ["Libra", "Aquarius", "Gemini", "Virgo"], // Renamed
    items: ["White and black candles", "Seasonal flowers", "Offerings"], // Renamed
    purpose: "To cultivate equilibrium in life during the equinox's equal day and night.",
  },
  {
    name: "Winter Solstice Rebirth",
    type: "Seasonal",
    description: "Celebrate the return of light on the longest night",
    duration: 60,
    element: "Fire",
    energy: "Transformative",
    signs: ["Capricorn", "Aries", "Leo", "Scorpio"], // Renamed
    items: ["Many candles", "Evergreen branches", "Journal", "Warm drink"], // Renamed
    purpose: "To honor endings and invite renewal as light returns on the winter solstice evening.",
  },
]

const ritualGuideData = [
  {
    ritualName: "Morning Sun Salutation",
    title: "Yogic Sun Greeting", // Renamed from guideName
    tradition: "Hatha Yoga",
    preparation: "Wake before sunrise if possible. Drink water. Face east. Roll out your mat.",
    steps: [  // Array of strings; will serialize to JSON
      "Stand in mountain pose, hands at heart center",
      "Inhale, raise arms overhead, gaze up",
      "Exhale, fold forward, hands to earth",
      "Inhale, halfway lift, lengthen spine",
      "Exhale, step back to plank, lower down",
      "Inhale, cobra or upward dog",
      "Exhale, downward facing dog, hold for 5 breaths",
      "Step forward, fold, rise up with arms overhead",
      "Exhale, hands to heart. Repeat 3-5 times",
      "Sit in meditation for 5 minutes",
      "Journal your intentions for the day",
    ],
    closing: "Bow to the sun. Carry this energy into your day.",
    tips: ["Move with your breath", "Modify poses as needed", "Practice daily for best results"], // Array for JSON
  },
  {
    ritualName: "Evening Release Ceremony",
    title: "Water Release Ritual", // Renamed
    tradition: "Eclectic Spiritual",
    preparation: "Dim lights. Light a candle. Fill a bowl with water. Have journal ready.",
    steps: [
      "Sit comfortably before your candle and water bowl",
      "Take three deep breaths, releasing the day",
      "Journal about what you're ready to release",
      "Read each item aloud to the candle flame",
      "Dip your fingers in water, touch your forehead, heart, and belly",
      "Say: 'I release what no longer serves me'",
      "Visualize burdens dissolving into the water",
      "Pour the water outside, returning it to earth",
      "Light sage or incense to cleanse your space",
      "Sit in meditation for 5 minutes",
    ],
    closing: "Blow out the candle. Rest in the peace of release.",
    tips: [
      "Do this nightly for a week to establish the practice",
      "Be specific about what you're releasing",
      "Follow with gratitude practice",
    ],
  },
  {
    ritualName: "New Moon Intention Setting",
    title: "Manifestation Ritual", // Renamed
    tradition: "Modern Witchcraft",
    preparation:
      "Cleanse your space with sage. Set up altar with candle, crystals, and journal. Take a ritual bath if possible.",
    steps: [
      "Cast a circle by walking clockwise around your space",
      "Light your candle, saying: 'I welcome new beginnings'",
      "Sit in meditation, connecting with your desires",
      "Write your intentions in present tense: 'I am...'",
      "Read each intention aloud with conviction",
      "Hold crystals while visualizing intentions manifesting",
      "Place intentions under your pillow or on altar",
      "Thank the moon and the universe",
      "Close the circle by walking counterclockwise",
    ],
    closing: "Let the candle burn down safely. Trust the process.",
    tips: ["Be specific and positive", "Limit to 3-5 intentions", "Revisit at full moon"],
  },
  {
    ritualName: "Full Moon Release",
    title: "Fire Release Ceremony", // Renamed
    tradition: "Shamanic Practice",
    preparation: "Go outside if possible. Have fire-safe bowl, paper, pen, and water ready. Light a candle.",
    steps: [
      "Stand or sit under the full moon",
      "Gaze at the moon, feeling her powerful energy",
      "Write what you're releasing on paper",
      "Read each item aloud to the moon",
      "Safely burn the paper in the bowl",
      "Watch the smoke carry your releases to the sky",
      "Say: 'I release you with love and gratitude'",
      "Pour water over the ashes, completing the release",
      "Bury the ashes in the earth",
      "Sit in meditation, feeling lighter",
    ],
    closing: "Thank the moon. Walk away without looking back.",
    tips: ["Practice fire safety", "Release with gratitude, not anger", "Follow with self-care"],
  },
  {
    ritualName: "Seasonal Equinox Balance",
    title: "Light and Dark Balance", // Renamed
    tradition: "Pagan/Wiccan",
    preparation:
      "Create an altar with white candle (light) and black candle (dark). Add seasonal items. Cleanse space.",
    steps: [
      "Cast a circle, calling in the four directions",
      "Light the black candle: 'I honor the darkness'",
      "Light the white candle: 'I honor the light'",
      "Sit between them, feeling the balance",
      "Reflect on what you're releasing (dark) and inviting (light)",
      "Journal about balance in your life",
      "Make an offering to the earth (flowers, herbs, food)",
      "Thank the elements and directions",
      "Close the circle",
    ],
    closing: "Let candles burn down. Carry balance forward.",
    tips: ["Honor both light and shadow", "Celebrate with seasonal foods", "Practice twice yearly"],
  },
  {
    ritualName: "Winter Solstice Rebirth",
    title: "Return of the Light", // Renamed
    tradition: "Celtic/Druidic",
    preparation:
      "Gather many candles, evergreen branches, and journal. Create a cozy sacred space. Fast from sunrise to ritual if able.",
    steps: [
      "Begin in darkness with all candles unlit",
      "Sit in the dark, honoring the longest night",
      "Reflect on what has died this year",
      "Journal your gratitude for endings",
      "At midnight (or your chosen time), light one candle",
      "Say: 'The light returns. I am reborn.'",
      "Light more candles, one for each intention",
      "Speak your intentions for the coming year",
      "Decorate with evergreens, symbols of eternal life",
      "Feast on warm foods and drinks",
      "Stay awake until dawn if possible",
    ],
    closing: "Greet the sunrise. Welcome the returning light.",
    tips: ["Invite friends for a solstice vigil", "Make it a yearly tradition", "Keep a solstice journal"],
  },
]

async function main() {
  console.log(chalk.blue("🕯️  Seeding ritual data...\n"))

  // Seed rituals
  for (const data of ritualData) {
    await prisma.ritual.upsert({
      where: { name: data.name },
      update: {},
      create: data,
    })
  }

  console.log(chalk.green(`✅ Seeded ${ritualData.length} rituals!`))

  // Seed ritual guides
  for (const guide of ritualGuideData) {
    const ritual = await prisma.ritual.findUnique({
      where: { name: guide.ritualName },
    })

    if (ritual) {
      await prisma.ritualGuide.upsert({
        where: {
          ritualId_title: {  // Updated to match schema
            ritualId: ritual.id,
            title: guide.title,
          },
        },
        update: {},
        create: {
          ritualId: ritual.id,
          title: guide.title,
          tradition: guide.tradition,
          preparation: guide.preparation,
          steps: guide.steps,
          closing: guide.closing,
          tips: guide.tips,
        },
      })
    }
  }

  console.log(chalk.green(`✅ Seeded ${ritualGuideData.length} ritual guides!`))
  console.log(chalk.yellow("\n🌙 Ritual database is ready.\n"))
}

main()
  .catch((e) => {
    console.error(chalk.red("❌ Seeding failed:"), e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })