// src/lib/astrology/enhanced-horoscope-engine.ts

interface BaseHoroscope {
  sign: string
  element: string
  rulingPlanet: string
  traits: string[]
  strength: string
  challenge: string
  todayTheme: string
  advice: string
  luckyNumber: number
  bestTime: string
}

interface DailyReading {
  theme: string
  advice: string
  affirmation: string
  energyLevel: number
  energyDescription: string
  focusAreas: string[]
  luckyElement: string
}

// Planetary positions (simplified - using day of year as cycles)
const getPlanetaryInfluence = (date: Date) => {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000)
  const dayOfWeek = date.getDay()
  const moonPhase = (dayOfYear % 29.5) / 29.5 // Approximate lunar cycle
  
  return {
    mars: (dayOfYear % 687) / 687, // Mars cycle ~687 days
    venus: (dayOfYear % 225) / 225, // Venus cycle ~225 days
    mercury: (dayOfYear % 88) / 88, // Mercury cycle ~88 days
    jupiter: (dayOfYear % 4333) / 4333, // Jupiter cycle ~12 years
    saturn: (dayOfYear % 10759) / 10759, // Saturn cycle ~29 years
    moonPhase,
    dayOfWeek,
  }
}

// Calculate energy level based on element and planetary positions
const calculateEnergyLevel = (element: string, planets: ReturnType<typeof getPlanetaryInfluence>): number => {
  let energy = 5 // Base energy

  // Fire signs get energy from Mars and Sun (day of week)
  if (element === 'Fire') {
    energy += planets.mars > 0.7 ? 2 : planets.mars > 0.4 ? 1 : 0
    energy += [0, 6].includes(planets.dayOfWeek) ? 1 : 0 // Weekend boost
  }

  // Earth signs get energy from Saturn and Venus
  if (element === 'Earth') {
    energy += planets.saturn > 0.6 ? 2 : 1
    energy += planets.venus > 0.5 ? 1 : 0
  }

  // Air signs get energy from Mercury
  if (element === 'Air') {
    energy += planets.mercury > 0.6 ? 2 : planets.mercury > 0.3 ? 1 : 0
    energy += [1, 3, 5].includes(planets.dayOfWeek) ? 1 : 0 // Weekday boost
  }

  // Water signs get energy from Moon phases
  if (element === 'Water') {
    const phase = planets.moonPhase
    // Higher energy during new moon (0-0.1) and full moon (0.45-0.55)
    if (phase < 0.1 || (phase > 0.45 && phase < 0.55)) {
      energy += 2
    } else if (phase < 0.25 || phase > 0.75) {
      energy += 1
    }
  }

  // Jupiter influence (expansion, luck)
  if (planets.jupiter > 0.8) energy += 1

  return Math.min(10, Math.max(1, energy))
}

// Generate themes based on planetary aspects
const generateTheme = (sign: string, element: string, planets: ReturnType<typeof getPlanetaryInfluence>): string => {
  const themes: Record<string, string[]> = {
    Fire: [
      "Your warrior spirit ignites opportunities today. Take bold action on what matters most.",
      "Creative fire burns bright. Channel your passion into meaningful projects.",
      "Leadership calls. Your courage inspires others to follow their own path.",
      "Adventure beckons. Trust your instincts and embrace the unknown.",
      "Your enthusiasm is contagious. Spark positive change in your community.",
    ],
    Earth: [
      "Grounding energy supports practical progress. Build something lasting today.",
      "Your steady presence brings stability to chaos. Trust your foundation.",
      "Material matters align favorably. Focus on tangible results and security.",
      "Nature's wisdom speaks through you. Honor your body's needs and rhythms.",
      "Patience and persistence create miracles. Trust the process unfolding.",
    ],
    Air: [
      "Mental clarity illuminates new perspectives. Your ideas have wings today.",
      "Communication flows effortlessly. Share your truth with others.",
      "Curiosity leads to breakthrough insights. Ask the questions others avoid.",
      "Social connections sparkle with potential. Network and collaborate freely.",
      "Your wit and wisdom create bridges. Unite different viewpoints today.",
    ],
    Water: [
      "Emotional depth reveals hidden truths. Trust your intuitive knowing.",
      "Healing waters flow through your interactions. Offer compassion freely.",
      "Dreams and reality merge. Pay attention to symbolic messages today.",
      "Your empathy is your superpower. Feel deeply, but protect your energy.",
      "Creative imagination opens mystical portals. Express your inner world.",
    ],
  }

  const elementThemes = themes[element] || themes.Fire
  const dayIndex = Math.floor(planets.moonPhase * elementThemes.length)
  return elementThemes[dayIndex]
}

// Generate advice based on challenges and current influences
const generateAdvice = (sign: string, element: string, planets: ReturnType<typeof getPlanetaryInfluence>): string => {
  const adviceTemplates: Record<string, string[]> = {
    Fire: [
      "Balance your intensity with moments of rest. Even flames need air to breathe.",
      "Channel your passion into focused action rather than scattered impulses.",
      "Lead with inspiration, not domination. Your fire should warm, not burn.",
      "Take calculated risks today. Your courage is strongest when grounded.",
      "Express your authenticity boldly, but listen to others' perspectives too.",
    ],
    Earth: [
      "Stay flexible within your structure. Adapt without losing your foundation.",
      "Your practical wisdom serves others. Share your grounded perspective.",
      "Focus on quality over quantity in all endeavors today.",
      "Physical movement grounds your energy. Take time to move your body.",
      "Trust your senses. What feels right in your body is often the wisest choice.",
    ],
    Air: [
      "Ground your brilliant ideas in practical action. Theory needs application.",
      "Listen as deeply as you speak. True wisdom includes others' voices.",
      "Your scattered energy needs focus. Choose one priority and dive deep.",
      "Breath connects mind and body. Pause to breathe consciously throughout the day.",
      "Curiosity without judgment opens doors. Approach everything with fresh eyes.",
    ],
    Water: [
      "Set emotional boundaries even as you stay open. Protect your sensitivity.",
      "Your feelings are valid, but not all require immediate expression. Discern timing.",
      "Trust your intuition while staying grounded in reality. Balance both realms.",
      "Release what no longer serves through tears, art, or ritual. Let it flow.",
      "Your compassion heals, but self-care comes first. Fill your own cup today.",
    ],
  }

  const adviceList = adviceTemplates[element] || adviceTemplates.Fire
  const index = (Math.floor(planets.venus * 100) + Math.floor(planets.mercury * 100)) % adviceList.length
  return adviceList[index]
}

// Generate affirmations
const generateAffirmation = (sign: string, element: string, planets: ReturnType<typeof getPlanetaryInfluence>): string => {
  const affirmations: Record<string, string[]> = {
    Fire: [
      "I channel my passion into purposeful action that uplifts myself and others.",
      "My courage opens doors that fear keeps closed. I move forward boldly.",
      "I am a spark of divine creativity, igniting positive transformation.",
      "My authentic self-expression inspires others to shine their own light.",
      "I lead with heart and act with wisdom. My fire serves the greater good.",
    ],
    Earth: [
      "I am grounded in my body, rooted in reality, and growing toward my highest good.",
      "My steady presence creates safety and stability for myself and others.",
      "I build my dreams with patience, persistence, and practical wisdom.",
      "I trust the natural timing of my life. Everything unfolds perfectly.",
      "My connection to Earth nourishes my spirit and grounds my energy.",
    ],
    Air: [
      "My mind is clear, my thoughts are focused, and my words create positive change.",
      "I balance intellectual brilliance with emotional wisdom and practical action.",
      "My curiosity connects me to infinite possibilities and deeper understanding.",
      "I communicate my truth with clarity, kindness, and conscious intention.",
      "My ideas take flight and manifest through aligned, grounded action.",
    ],
    Water: [
      "I flow with life's currents while honoring my emotional truth and intuitive wisdom.",
      "My sensitivity is my strength. I feel deeply and love courageously.",
      "I trust my intuition completely. My inner knowing guides me perfectly.",
      "I release what no longer serves me with grace, making space for new blessings.",
      "My compassion heals the world, beginning with tender care for myself.",
    ],
  }

  const affirmationList = affirmations[element] || affirmations.Fire
  const index = Math.floor((planets.moonPhase + planets.jupiter) * affirmationList.length) % affirmationList.length
  return affirmationList[index]
}

// Generate focus areas
const generateFocusAreas = (element: string, planets: ReturnType<typeof getPlanetaryInfluence>): string[] => {
  const allAreas: Record<string, string[]> = {
    Fire: ['Career/Ambition', 'Physical Activity', 'Creative Projects', 'Leadership', 'Personal Goals', 'Adventure', 'Self-Expression', 'Confidence Building'],
    Earth: ['Finances', 'Health/Body', 'Home/Family', 'Practical Skills', 'Nature Connection', 'Stability', 'Building/Creating', 'Sensory Pleasures'],
    Air: ['Communication', 'Learning', 'Social Networks', 'Mental Clarity', 'Writing/Ideas', 'Technology', 'Teaching', 'Intellectual Pursuits'],
    Water: ['Emotions', 'Relationships', 'Intuition', 'Healing', 'Spiritual Practice', 'Creativity', 'Dreams', 'Compassion/Service'],
  }

  const areas = allAreas[element] || allAreas.Fire
  const selectedAreas: string[] = []
  
  // Select 3 areas based on planetary influences
  const indices = [
    Math.floor(planets.mars * areas.length),
    Math.floor(planets.venus * areas.length),
    Math.floor(planets.mercury * areas.length),
  ].filter((v, i, a) => a.indexOf(v) === i) // Ensure unique
  
  indices.slice(0, 3).forEach(i => selectedAreas.push(areas[i]))
  
  // If we need more, add based on moon phase
  while (selectedAreas.length < 3) {
    const index = Math.floor(planets.moonPhase * areas.length)
    if (!selectedAreas.includes(areas[index])) {
      selectedAreas.push(areas[index])
    }
  }

  return selectedAreas
}

// Generate lucky element
const generateLuckyElement = (sign: string, planets: ReturnType<typeof getPlanetaryInfluence>): string => {
  const colors = ['Crimson Red', 'Emerald Green', 'Sapphire Blue', 'Golden Yellow', 'Royal Purple', 'Silver White', 'Deep Orange', 'Turquoise', 'Rose Pink', 'Forest Green']
  const times = ['Dawn (5-7 AM)', 'Morning (8-10 AM)', 'Midday (11 AM-1 PM)', 'Afternoon (2-4 PM)', 'Dusk (5-7 PM)', 'Evening (7-9 PM)', 'Night (9-11 PM)']
  const numbers = [1, 2, 3, 5, 7, 8, 9, 11, 22, 33]
  
  const typeSelector = (planets.venus + planets.jupiter) % 3
  
  if (typeSelector < 1) {
    return colors[Math.floor(planets.mars * colors.length)]
  } else if (typeSelector < 2) {
    return `Number ${numbers[Math.floor(planets.mercury * numbers.length)]}`
  } else {
    return times[Math.floor(planets.moonPhase * times.length)]
  }
}

// Energy description generator
const generateEnergyDescription = (energyLevel: number, element: string): string => {
  if (energyLevel >= 8) {
    const descriptions = {
      Fire: "Your energy blazes bright today. You have abundant vitality and motivation to tackle ambitious goals.",
      Earth: "Steady, powerful energy flows through you. Your endurance and focus are at peak levels.",
      Air: "Mental energy sparks brilliantly. Your mind is sharp, quick, and ready for intellectual challenges.",
      Water: "Emotional and intuitive energy runs deep and strong. You're highly attuned and receptive.",
    }
    return descriptions[element as keyof typeof descriptions] || descriptions.Fire
  } else if (energyLevel >= 6) {
    const descriptions = {
      Fire: "Good energy levels support your initiatives. Pace yourself for sustainable momentum.",
      Earth: "Solid, dependable energy grounds your efforts. You have what you need to progress steadily.",
      Air: "Balanced mental energy allows clear thinking and effective communication throughout the day.",
      Water: "Your emotional energy is balanced and flowing. You can navigate feelings with grace.",
    }
    return descriptions[element as keyof typeof descriptions] || descriptions.Fire
  } else if (energyLevel >= 4) {
    const descriptions = {
      Fire: "Energy is moderate today. Choose your battles wisely and conserve for what truly matters.",
      Earth: "Energy is stable but not abundant. Focus on essential tasks and avoid overextension.",
      Air: "Mental energy needs conscious management. Take breaks to maintain clarity and focus.",
      Water: "Emotional energy feels quieter. Use this time for reflection rather than intense activity.",
    }
    return descriptions[element as keyof typeof descriptions] || descriptions.Fire
  } else {
    const descriptions = {
      Fire: "Energy is low. This is a day for rest, reflection, and gentle self-care. Don't push.",
      Earth: "Your body calls for deep rest. Honor this need and tend to basic comforts and stability.",
      Air: "Mental fog or fatigue suggests need for rest. Be gentle with yourself and minimize stimulation.",
      Water: "Emotional energy is depleted. Retreat, nurture yourself, and let others support you.",
    }
    return descriptions[element as keyof typeof descriptions] || descriptions.Fire
  }
}

// Main horoscope generation function
export function generateDailyHoroscope(
  sign: string,
  baseHoroscope: BaseHoroscope,
  date: Date
): DailyReading {
  const planets = getPlanetaryInfluence(date)
  const element = baseHoroscope.element
  
  const energyLevel = calculateEnergyLevel(element, planets)
  const theme = generateTheme(sign, element, planets)
  const advice = generateAdvice(sign, element, planets)
  const affirmation = generateAffirmation(sign, element, planets)
  const focusAreas = generateFocusAreas(element, planets)
  const luckyElement = generateLuckyElement(sign, planets)
  const energyDescription = generateEnergyDescription(energyLevel, element)

  return {
    theme,
    advice,
    affirmation,
    energyLevel,
    energyDescription,
    focusAreas,
    luckyElement,
  }
}