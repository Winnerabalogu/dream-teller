import { PrismaClient } from "@prisma/client"
import chalk from "chalk"

const prisma = new PrismaClient()

const meditationData = [
  {
    name: "Mindfulness Meditation",
    type: "Mindfulness",
    description: "Cultivate present-moment awareness through breath and body observation",
    duration: 15,
    difficulty: "Beginner",
    element: "Air",
    energy: "Centering",
    signs: ["Gemini", "Libra", "Aquarius", "Virgo"], // Renamed from compatibleSigns
    benefits: ["Reduces stress", "Improves focus", "Enhances emotional regulation", "Increases self-awareness"],
  },
  {
    name: "Body Scan Meditation",
    type: "Body Scan",
    description: "Systematic attention to physical sensations throughout the body",
    duration: 20,
    difficulty: "Beginner",
    element: "Earth",
    energy: "Grounding",
    signs: ["Taurus", "Virgo", "Capricorn", "Cancer"], // Renamed
    benefits: ["Releases physical tension", "Improves body awareness", "Promotes relaxation", "Aids sleep"],
  },
  {
    name: "Loving-Kindness Meditation",
    type: "Loving-Kindness",
    description: "Cultivate compassion and love for yourself and others",
    duration: 15,
    difficulty: "Beginner",
    element: "Water",
    energy: "Heart-opening",
    signs: ["Cancer", "Pisces", "Libra", "Taurus"], // Renamed
    benefits: ["Increases compassion", "Reduces negative emotions", "Improves relationships", "Enhances well-being"],
  },
  {
    name: "Breath Awareness",
    type: "Mindfulness",
    description: "Simple yet profound practice of observing the natural breath",
    duration: 10,
    difficulty: "Beginner",
    element: "Air",
    energy: "Calming",
    signs: ["Gemini", "Libra", "Aquarius", "Cancer"], // Renamed
    benefits: ["Calms the mind", "Reduces anxiety", "Improves concentration", "Accessible anywhere"],
  },
  {
    name: "Chakra Meditation",
    type: "Energy Work",
    description: "Balance and activate the seven energy centers of the body",
    duration: 30,
    difficulty: "Intermediate",
    element: "Fire",
    energy: "Activating",
    signs: ["Aries", "Leo", "Sagittarius", "Scorpio"], // Renamed
    benefits: ["Balances energy", "Enhances vitality", "Promotes spiritual growth", "Clears blockages"],
  },
  {
    name: "Walking Meditation",
    type: "Movement",
    description: "Mindful walking practice connecting body, breath, and earth",
    duration: 20,
    difficulty: "Beginner",
    element: "Earth",
    energy: "Grounding",
    signs: ["Taurus", "Virgo", "Capricorn", "Sagittarius"], // Renamed
    benefits: ["Combines movement and mindfulness", "Grounds energy", "Improves balance", "Connects with nature"],
  },
  {
    name: "Transcendental Meditation",
    type: "Mantra",
    description: "Silent mantra repetition for deep rest and transcendence",
    duration: 20,
    difficulty: "Intermediate",
    element: "Air",
    energy: "Transcendent",
    signs: ["Aquarius", "Pisces", "Sagittarius", "Gemini"], // Renamed
    benefits: ["Deep relaxation", "Reduces stress", "Enhances creativity", "Promotes inner peace"],
  },
  {
    name: "Vipassana Insight",
    type: "Insight",
    description: "Ancient Buddhist practice of seeing things as they truly are",
    duration: 45,
    difficulty: "Advanced",
    element: "Water",
    energy: "Purifying",
    signs: ["Scorpio", "Pisces", "Capricorn", "Virgo"], // Renamed
    benefits: ["Deep self-understanding", "Purifies mind", "Develops wisdom", "Liberates from suffering"],
  },
]

const guideData = [
  {
    meditationName: "Mindfulness Meditation",
    title: "Jon Kabat-Zinn's MBSR Approach", // Renamed from guideName
    tradition: "Modern Mindfulness",
    author: "Jon Kabat-Zinn", // Renamed from teacher
    preparation:
      "Find a quiet space. Sit comfortably with spine straight. Set a timer for 15 minutes. Have a cushion or chair ready.",
    steps: [  // Array of strings; will serialize to JSON
      "Settle into your seat, feeling your body's contact with the surface",
      "Close your eyes or maintain a soft downward gaze",
      "Bring attention to your breath, noticing the natural rhythm",
      "When mind wanders (and it will), gently return to the breath",
      "Observe thoughts, feelings, and sensations without judgment",
      "Continue for the full duration, being present with whatever arises",
    ],
    closing: "Slowly open your eyes. Take a moment to notice how you feel. Carry this awareness into your day.",
    tips: ["Start with 5 minutes if 15 feels too long", "Practice daily at the same time", "Be patient with yourself"], // Array for JSON
    duration: 15,  // Added to match meditation
  },
  {
    meditationName: "Mindfulness Meditation",
    title: "Thích Nhất Hạnh's Breathing Practice", // Renamed
    tradition: "Zen Buddhism",
    author: "Thích Nhất Hạnh", // Renamed
    preparation: "Sit in a comfortable position. Light incense if desired. Place hands gently in lap.",
    steps: [
      "Breathe in, say silently 'Breathing in, I know I am breathing in'",
      "Breathe out, say 'Breathing out, I know I am breathing out'",
      "Shorten to 'In' and 'Out' after a few breaths",
      "Smile gently, relaxing facial muscles",
      "If mind wanders, return with compassion, not judgment",
      "Continue with gentle awareness of each breath",
    ],
    closing: "Bow to yourself and your practice. Carry this peace with you.",
    tips: ["Smile while meditating", "Practice walking meditation between sits", "Join a sangha (community)"],
    duration: 15,
  },
  {
    meditationName: "Body Scan Meditation",
    title: "Progressive Relaxation Body Scan", // Renamed
    tradition: "Modern Mindfulness",
    author: "Various MBSR Teachers", // Renamed
    preparation:
      "Lie down on your back or sit comfortably. Ensure you won't be disturbed for 20 minutes. Use a blanket if needed.",
    steps: [
      "Start by taking three deep breaths, releasing tension",
      "Bring attention to your toes. Notice any sensations",
      "Slowly move up through feet, ankles, calves, knees",
      "Continue through thighs, hips, abdomen, chest",
      "Scan through fingers, hands, arms, shoulders, neck",
      "Finally, scan face, head, and crown",
      "Rest in full-body awareness for a few minutes",
    ],
    closing: "Wiggle fingers and toes. Stretch gently. Open eyes slowly.",
    tips: [
      "Don't try to change sensations, just observe",
      "If you fall asleep, that's okay",
      "Practice before bed for better sleep",
    ],
    duration: 20,
  },
  {
    meditationName: "Loving-Kindness Meditation",
    title: "Traditional Metta Practice", // Renamed
    tradition: "Theravada Buddhism",
    author: "Sharon Salzberg", // Renamed
    preparation: "Sit comfortably. Place hand on heart. Set intention to cultivate love and compassion.",
    steps: [
      "Begin with yourself: 'May I be happy. May I be healthy. May I be safe. May I live with ease.'",
      "Repeat these phrases, feeling them in your heart",
      "Extend to a loved one: 'May you be happy...'",
      "Extend to a neutral person (someone you barely know)",
      "Extend to a difficult person (start with mildly difficult)",
      "Finally, extend to all beings: 'May all beings be happy...'",
    ],
    closing: "Rest in the warmth of loving-kindness. Carry this compassion into the world.",
    tips: [
      "Start with yourself - you can't give what you don't have",
      "Be patient with difficult people",
      "Practice daily",
    ],
    duration: 15,
  },
  {
    meditationName: "Loving-Kindness Meditation",
    title: "Heart-Centered Metta", // Renamed
    tradition: "Tibetan Buddhism",
    author: "Pema Chödrön", // Renamed
    preparation: "Sit with spine straight. Visualize a warm light in your heart center.",
    steps: [
      "Breathe into your heart, feeling it soften and open",
      "Think of someone who loves you unconditionally",
      "Feel their love filling your heart with warmth",
      "Extend this feeling to yourself with the metta phrases",
      "Visualize the light expanding to include others",
      "Let the light grow to encompass all beings",
    ],
    closing: "Let the visualization fade. Rest in open-hearted awareness.",
    tips: [
      "Use visualization to enhance feeling",
      "If heart feels closed, be gentle",
      "Practice self-compassion first",
    ],
    duration: 15,
  },
  {
    meditationName: "Chakra Meditation",
    title: "Seven Chakra Activation", // Renamed
    tradition: "Kundalini Yoga",
    author: "Anodea Judith", // Renamed
    preparation: "Sit in lotus or easy pose. Spine straight. Have chakra chart nearby if helpful.",
    steps: [
      "Root Chakra (red): Visualize red light at base of spine. Chant 'LAM'",
      "Sacral Chakra (orange): Orange light below navel. Chant 'VAM'",
      "Solar Plexus (yellow): Yellow light at stomach. Chant 'RAM'",
      "Heart Chakra (green): Green light at chest. Chant 'YAM'",
      "Throat Chakra (blue): Blue light at throat. Chant 'HAM'",
      "Third Eye (indigo): Indigo light between brows. Chant 'OM'",
      "Crown Chakra (violet): Violet light at crown. Chant 'AH'",
    ],
    closing: "Visualize all chakras spinning in harmony. Rest in balanced energy.",
    tips: ["Spend 3-5 minutes per chakra", "Notice which chakras feel blocked", "Practice regularly for best results"],
    duration: 30,
  },
  {
    meditationName: "Walking Meditation",
    title: "Mindful Walking Practice", // Renamed
    tradition: "Zen Buddhism",
    author: "Thích Nhất Hạnh", // Renamed
    preparation: "Find a quiet path or room. Remove shoes if possible. Set intention to walk mindfully.",
    steps: [
      "Stand still, feeling your feet on the ground",
      "Begin walking very slowly, heel to toe",
      "Coordinate breath with steps: 'In, in, in. Out, out, out.'",
      "Feel each sensation: lifting, moving, placing",
      "If mind wanders, stop and breathe, then continue",
      "Walk for 20 minutes, maintaining full awareness",
    ],
    closing: "Stand still for a moment. Bow to the earth. Carry this mindfulness forward.",
    tips: ["Walk slower than feels natural", "Practice outdoors in nature when possible", "Can be done anywhere"],
    duration: 20,
  },
  {
    meditationName: "Vipassana Insight",
    title: "S.N. Goenka's Vipassana Technique", // Renamed
    tradition: "Theravada Buddhism",
    author: "S.N. Goenka", // Renamed
    preparation: "Sit in meditation posture. Commit to 45 minutes of unmoving practice. Noble silence recommended.",
    steps: [
      "Begin with anapana: observe breath at nostrils for 10 minutes",
      "Shift to body scanning: systematically observe sensations",
      "Move attention from head to toes, part by part",
      "Observe all sensations with equanimity - no craving, no aversion",
      "Notice impermanence: all sensations arise and pass",
      "If strong emotions arise, observe them as sensations",
      "Continue scanning, maintaining equanimity throughout",
    ],
    closing: "End with metta: share merit with all beings. Slowly open eyes.",
    tips: ["Attend a 10-day retreat for proper instruction", "Practice twice daily", "Equanimity is key"],
    duration: 45,
  },
]

async function main() {
  console.log(chalk.blue("🧘 Seeding meditation data...\n"))

  // Seed meditations
  for (const data of meditationData) {
    await prisma.meditation.upsert({
      where: { name: data.name },
      update: {},
      create: data,
    })
  }

  console.log(chalk.green(`✅ Seeded ${meditationData.length} meditations!`))

  // Seed guides
  for (const guide of guideData) {
    const meditation = await prisma.meditation.findUnique({
      where: { name: guide.meditationName },
    })

    if (meditation) {
      await prisma.meditationGuide.upsert({
        where: {
          meditationId_title: {  // Updated to match schema
            meditationId: meditation.id,
            title: guide.title,
          },
        },
        update: {},
        create: {
          meditationId: meditation.id,
          title: guide.title,
          author: guide.author,
          tradition: guide.tradition,
          preparation: guide.preparation,
          steps: guide.steps,
          closing: guide.closing,
          tips: guide.tips,
          duration: guide.duration,
        },
      })
    }
  }

  console.log(chalk.green(`✅ Seeded ${guideData.length} meditation guides!`))
  console.log(chalk.yellow("\n🧘‍♀️ Meditation database is ready.\n"))
}

main()
  .catch((e) => {
    console.error(chalk.red("❌ Seeding failed:"), e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })