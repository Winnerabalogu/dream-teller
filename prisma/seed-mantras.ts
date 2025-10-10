import { PrismaClient } from "@prisma/client"
import chalk from "chalk"

const prisma = new PrismaClient()

const mantraData = [
  {
    text: "Om Shanti Shanti Shanti",
    translation: "Peace, Peace, Peace",
    category: "Peace",
    element: "Water",
    energy: "Calming",
    signs: ["Cancer", "Pisces", "Scorpio", "Taurus"],
    intention: "Inner peace and tranquility",
    guide:
      "Sit comfortably with your spine straight. Close your eyes and take three deep breaths. Begin chanting 'Om Shanti' slowly, feeling the vibration in your chest. Repeat for 5-10 minutes, allowing peace to wash over you with each repetition.",
  },
  {
    text: "Om Gam Ganapataye Namaha",
    translation: "I bow to Ganesha, remover of obstacles",
    category: "Guidance",
    element: "Earth",
    energy: "Grounding",
    signs: ["Taurus", "Virgo", "Capricorn", "Cancer"],
    intention: "Removing obstacles and new beginnings",
    guide:
      "Light a candle or incense. Visualize Ganesha, the elephant-headed deity. Chant this mantra 108 times (use mala beads if available) while focusing on any obstacles you wish to overcome. Feel them dissolving with each repetition.",
  },
  {
    text: "Om Namah Shivaya",
    translation: "I bow to Shiva, the inner self",
    category: "Wisdom",
    element: "Fire",
    energy: "Transformative",
    signs: ["Aries", "Leo", "Sagittarius", "Scorpio"],
    intention: "Transformation and inner awakening",
    guide:
      "Sit in meditation posture. Focus on your third eye (between eyebrows). Chant slowly, feeling the vibration move from your root to crown chakra. This mantra awakens inner consciousness and burns away illusions.",
  },
  {
    text: "Lokah Samastah Sukhino Bhavantu",
    translation: "May all beings everywhere be happy and free",
    category: "Love",
    element: "Air",
    energy: "Expansive",
    signs: ["Gemini", "Libra", "Aquarius", "Pisces"],
    intention: "Universal love and compassion",
    guide:
      "Place your hands over your heart. Breathe deeply and feel your heart expanding. Chant this mantra while visualizing all beings bathed in golden light. Send love to yourself, loved ones, strangers, and even those you find difficult.",
  },
  {
    text: "Om Mani Padme Hum",
    translation: "The jewel is in the lotus",
    category: "Wisdom",
    element: "Water",
    energy: "Purifying",
    signs: ["Cancer", "Scorpio", "Pisces", "Virgo"],
    intention: "Compassion and purification",
    guide:
      "This Tibetan Buddhist mantra purifies negative karma. Chant while visualizing a lotus flower in your heart, opening petal by petal. Each repetition purifies body, speech, and mind. Practice with genuine compassion for all beings.",
  },
  {
    text: "So Hum",
    translation: "I am That",
    category: "Peace",
    element: "Air",
    energy: "Centering",
    signs: ["Gemini", "Libra", "Aquarius", "Sagittarius"],
    intention: "Unity with the universe",
    guide:
      "Breathe naturally. On the inhale, silently say 'So'. On the exhale, say 'Hum'. This is the natural sound of breath. Practice for 10-20 minutes, merging your awareness with the rhythm of life itself.",
  },
  {
    text: "Om Tare Tuttare Ture Soha",
    translation: "Homage to Tara, swift liberator",
    category: "Guidance",
    element: "Fire",
    energy: "Protective",
    signs: ["Aries", "Leo", "Sagittarius", "Capricorn"],
    intention: "Protection and swift action",
    guide:
      "Invoke Green Tara, the female Buddha of compassionate action. Chant when facing fears or obstacles. Visualize her green light surrounding you, offering protection and courage. Feel her swift energy removing barriers.",
  },
  {
    text: "Aham Prema",
    translation: "I am Divine Love",
    category: "Love",
    element: "Water",
    energy: "Heart-opening",
    signs: ["Cancer", "Pisces", "Scorpio", "Libra"],
    intention: "Self-love and divine connection",
    guide:
      "Place both hands on your heart. Breathe into your heart space. Chant 'Aham Prema' feeling divine love flowing through you. This mantra awakens the truth that you are made of love itself.",
  },
  {
    text: "Om Aim Saraswatyai Namaha",
    translation: "I bow to Saraswati, goddess of wisdom",
    category: "Wisdom",
    element: "Air",
    energy: "Illuminating",
    signs: ["Gemini", "Virgo", "Aquarius", "Sagittarius"],
    intention: "Creativity and learning",
    guide:
      "Chant before studying, creating, or seeking clarity. Visualize Saraswati with her veena (instrument), books, and white swan. Feel wisdom and creativity flowing through you. Excellent for students and artists.",
  },
  {
    text: "Om Shreem Mahalakshmiyei Namaha",
    translation: "I bow to the great Lakshmi",
    category: "Growth",
    element: "Earth",
    energy: "Abundant",
    signs: ["Taurus", "Virgo", "Capricorn", "Leo"],
    intention: "Abundance and prosperity",
    guide:
      "Chant on Fridays or during new moon. Visualize golden light and lotus flowers. This mantra invokes material and spiritual abundance. Practice with gratitude for what you already have while opening to receive more.",
  },
  {
    text: "Gate Gate Paragate Parasamgate Bodhi Svaha",
    translation: "Gone, gone, gone beyond, gone altogether beyond, awakening, hail!",
    category: "Wisdom",
    element: "Fire",
    energy: "Transcendent",
    signs: ["Aries", "Sagittarius", "Aquarius", "Scorpio"],
    intention: "Spiritual awakening and liberation",
    guide:
      "From the Heart Sutra, this mantra represents the journey to enlightenment. Chant slowly, contemplating the nature of emptiness and form. Each 'gate' represents a stage of letting go and transcendence.",
  },
  {
    text: "Om Namo Bhagavate Vasudevaya",
    translation: "I bow to Lord Krishna, the divine within all",
    category: "Love",
    element: "Air",
    energy: "Devotional",
    signs: ["Gemini", "Libra", "Aquarius", "Pisces"],
    intention: "Divine love and devotion",
    guide:
      "This mantra opens the heart to divine love. Chant with devotion, visualizing Krishna's blue form or simply divine presence. Feel unconditional love flowing through you. Practice with bhakti (devotion).",
  },
  {
    text: "Om Dum Durgayei Namaha",
    translation: "I bow to Durga, the invincible",
    category: "Guidance",
    element: "Fire",
    energy: "Empowering",
    signs: ["Aries", "Leo", "Sagittarius", "Scorpio"],
    intention: "Inner strength and protection",
    guide:
      "Invoke Durga when you need courage and strength. Visualize her riding a tiger, holding weapons of transformation. Chant powerfully, feeling her fierce protective energy. This mantra destroys negative forces.",
  },
  {
    text: "Sat Nam",
    translation: "Truth is my identity",
    category: "Peace",
    element: "Earth",
    energy: "Grounding",
    signs: ["Taurus", "Virgo", "Capricorn", "Cancer"],
    intention: "Living in truth and authenticity",
    guide:
      "From Kundalini yoga tradition. Chant 'Sat' (long) on inhale, 'Nam' (short) on exhale. This mantra aligns you with your true nature. Practice daily to strengthen your connection to truth.",
  },
  {
    text: "Om Hrim Shrim Klim Parameshwari Swaha",
    translation: "Salutations to the supreme goddess",
    category: "Growth",
    element: "Fire",
    energy: "Transformative",
    signs: ["Aries", "Leo", "Sagittarius", "Capricorn"],
    intention: "Spiritual growth and divine feminine power",
    guide:
      "This powerful mantra invokes the divine feminine in all her forms. Chant during meditation or ritual. Feel the creative, nurturing, and fierce aspects of the goddess awakening within you.",
  },
  {
    text: "Om Gum Ganapatayei Namaha",
    translation: "I bow to Ganesha, the remover of obstacles",
    category: "Guidance",
    element: "Earth",
    energy: "Clearing",
    signs: ["Taurus", "Virgo", "Capricorn", "Scorpio"],
    intention: "Clearing path and new ventures",
    guide:
      "Chant before starting new projects or when feeling stuck. Visualize Ganesha's large ears (listening) and small mouth (speaking less). Feel obstacles melting away. Offer sweets or fruit as you chant.",
  },
  {
    text: "Aham Brahmasmi",
    translation: "I am the universe",
    category: "Wisdom",
    element: "Air",
    energy: "Expansive",
    signs: ["Gemini", "Libra", "Aquarius", "Sagittarius"],
    intention: "Unity consciousness and self-realization",
    guide:
      "One of the four great Vedantic statements. Chant in deep meditation. Contemplate the meaning: you are not separate from the universe but are the universe experiencing itself. Feel boundaries dissolving.",
  },
  {
    text: "Om Shri Hanumate Namaha",
    translation: "I bow to Hanuman, the devoted servant",
    category: "Growth",
    element: "Fire",
    energy: "Strengthening",
    signs: ["Aries", "Leo", "Sagittarius", "Capricorn"],
    intention: "Courage, strength, and devotion",
    guide:
      "Hanuman represents selfless service and superhuman strength. Chant when you need physical or mental strength. Visualize his monkey form leaping across oceans. Feel limitless energy and devotion arising.",
  },
]

async function main() {
  console.log(chalk.blue("🕉️  Seeding mantra data...\n"))

  for (const data of mantraData) {
    await prisma.mantra.upsert({
      where: { text: data.text },
      update: {},
      create: data,
    })
  }

  console.log(chalk.green(`✅ Seeded ${mantraData.length} mantras!`))
  console.log(chalk.yellow("\n🙏 Mantra database is ready.\n"))
}

main()
  .catch((e) => {
    console.error(chalk.red("❌ Seeding failed:"), e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
