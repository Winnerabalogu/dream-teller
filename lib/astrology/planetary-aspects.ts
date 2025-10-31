// src/lib/astrology/planetary-aspects.ts
// This module calculates planetary relationships and their influences

interface PlanetaryAspect {
  name: string
  influence: 'positive' | 'neutral' | 'challenging'
  strength: number // 0-1
  description: string
}

interface TransitInfluence {
  planet: string
  sign: string
  aspect: 'conjunction' | 'trine' | 'square' | 'opposition' | 'sextile'
  message: string
}

// Calculate which planets are in favorable positions for each sign
export const calculateTransits = (sign: string, date: Date): TransitInfluence[] => {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000)
  const transits: TransitInfluence[] = []
  
  // Sign groupings
  const fireSign = ['Aries', 'Leo', 'Sagittarius'].includes(sign)
  const earthSigns = ['Taurus', 'Virgo', 'Capricorn'].includes(sign)
  const airSigns = ['Gemini', 'Libra', 'Aquarius'].includes(sign)
  const waterSigns = ['Cancer', 'Scorpio', 'Pisces'].includes(sign)
  
  // Mars influence (action, energy)
  const marsPosition = (dayOfYear % 687) / 687
  if (fireSign && marsPosition > 0.7) {
    transits.push({
      planet: 'Mars',
      sign,
      aspect: 'trine',
      message: 'Mars energizes your sign, amplifying courage and initiative'
    })
  }
  
  // Venus influence (love, harmony, values)
  const venusPosition = (dayOfYear % 225) / 225
  if ((earthSigns || waterSigns) && venusPosition > 0.6) {
    transits.push({
      planet: 'Venus',
      sign,
      aspect: 'trine',
      message: 'Venus graces your sign with beauty, harmony, and magnetic charm'
    })
  }
  
  // Mercury influence (communication, thinking)
  const mercuryPosition = (dayOfYear % 88) / 88
  if ((airSigns || earthSigns) && mercuryPosition > 0.5) {
    transits.push({
      planet: 'Mercury',
      sign,
      aspect: 'sextile',
      message: 'Mercury sharpens your mind and enhances all forms of communication'
    })
  }
  
  // Jupiter influence (expansion, luck)
  const jupiterPosition = (dayOfYear % 4333) / 4333
  if (jupiterPosition > 0.85) {
    transits.push({
      planet: 'Jupiter',
      sign,
      aspect: 'conjunction',
      message: 'Jupiter brings expansion, optimism, and fortunate opportunities'
    })
  }
  
  // Saturn influence (discipline, structure)
  const saturnPosition = (dayOfYear % 10759) / 10759
  if (earthSigns && saturnPosition > 0.75) {
    transits.push({
      planet: 'Saturn',
      sign,
      aspect: 'trine',
      message: 'Saturn supports your goals with discipline and long-term vision'
    })
  } else if (saturnPosition < 0.15) {
    transits.push({
      planet: 'Saturn',
      sign,
      aspect: 'square',
      message: 'Saturn challenges you to build stronger foundations through effort'
    })
  }
  
  return transits
}

// Calculate moon phase influence
export const getMoonPhaseInfluence = (date: Date) => {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000)
  const phase = (dayOfYear % 29.5) / 29.5
  
  // New Moon (0-0.125)
  if (phase < 0.125) {
    return {
      name: 'New Moon',
      influence: 'planting seeds, new beginnings, setting intentions',
      energy: 'introspective and initiating',
      advice: 'Perfect time to start new projects and set clear intentions'
    }
  }
  
  // Waxing Crescent (0.125-0.25)
  if (phase < 0.25) {
    return {
      name: 'Waxing Crescent',
      influence: 'growth, courage, momentum building',
      energy: 'gathering and building',
      advice: 'Take action on your intentions with courage and commitment'
    }
  }
  
  // First Quarter (0.25-0.375)
  if (phase < 0.375) {
    return {
      name: 'First Quarter',
      influence: 'challenges, decisions, commitment',
      energy: 'dynamic and testing',
      advice: 'Push through obstacles and make important decisions'
    }
  }
  
  // Waxing Gibbous (0.375-0.5)
  if (phase < 0.5) {
    return {
      name: 'Waxing Gibbous',
      influence: 'refinement, adjustment, preparation',
      energy: 'analyzing and perfecting',
      advice: 'Refine your approach and prepare for culmination'
    }
  }
  
  // Full Moon (0.5-0.625)
  if (phase < 0.625) {
    return {
      name: 'Full Moon',
      influence: 'illumination, completion, celebration',
      energy: 'heightened and revealing',
      advice: 'Celebrate achievements and release what no longer serves'
    }
  }
  
  // Waning Gibbous (0.625-0.75)
  if (phase < 0.75) {
    return {
      name: 'Waning Gibbous',
      influence: 'gratitude, sharing, teaching',
      energy: 'distributing and sharing',
      advice: 'Share your wisdom and give thanks for your blessings'
    }
  }
  
  // Last Quarter (0.75-0.875)
  if (phase < 0.875) {
    return {
      name: 'Last Quarter',
      influence: 'release, forgiveness, letting go',
      energy: 'releasing and clearing',
      advice: 'Release old patterns and forgive yourself and others'
    }
  }
  
  // Waning Crescent (0.875-1.0)
  return {
    name: 'Waning Crescent',
    influence: 'rest, reflection, surrender',
    energy: 'quiet and restorative',
    advice: 'Rest deeply and reflect on the cycle coming to completion'
  }
}

// Calculate aspects between planets
export const calculatePlanetaryAspects = (date: Date): PlanetaryAspect[] => {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000)
  const aspects: PlanetaryAspect[] = []
  
  const mars = (dayOfYear % 687) / 687
  const venus = (dayOfYear % 225) / 225
  const mercury = (dayOfYear % 88) / 88
  const jupiter = (dayOfYear % 4333) / 4333
  
  // Mars-Venus aspect
  const marsVenusDiff = Math.abs(mars - venus)
  if (marsVenusDiff < 0.1 || marsVenusDiff > 0.9) {
    aspects.push({
      name: 'Mars-Venus Harmony',
      influence: 'positive',
      strength: 0.8,
      description: 'Passion and harmony unite. Romance, creativity, and magnetism flow naturally.'
    })
  }
  
  // Mercury-Jupiter aspect
  const mercuryJupiterDiff = Math.abs(mercury - jupiter)
  if (mercuryJupiterDiff < 0.15) {
    aspects.push({
      name: 'Mercury-Jupiter Expansion',
      influence: 'positive',
      strength: 0.9,
      description: 'Communication expands possibilities. Teaching, learning, and wisdom flow.'
    })
  }
  
  // Mars square (challenging aspect)
  if (mars > 0.65 && mars < 0.75) {
    aspects.push({
      name: 'Mars Challenge',
      influence: 'challenging',
      strength: 0.7,
      description: 'Tension creates growth. Channel frustration into productive action.'
    })
  }
  
  return aspects
}

// Get day-of-week planetary ruler
export const getDayRuler = (date: Date) => {
  const days = [
    { day: 'Sunday', planet: 'Sun', influence: 'vitality, leadership, self-expression', color: 'Gold' },
    { day: 'Monday', planet: 'Moon', influence: 'emotions, intuition, nurturing', color: 'Silver' },
    { day: 'Tuesday', planet: 'Mars', influence: 'action, courage, assertion', color: 'Red' },
    { day: 'Wednesday', planet: 'Mercury', influence: 'communication, learning, adaptability', color: 'Orange' },
    { day: 'Thursday', planet: 'Jupiter', influence: 'expansion, wisdom, abundance', color: 'Purple' },
    { day: 'Friday', planet: 'Venus', influence: 'love, beauty, harmony', color: 'Green' },
    { day: 'Saturday', planet: 'Saturn', influence: 'structure, discipline, mastery', color: 'Black' },
  ]
  
  return days[date.getDay()]
}

// Get numerological day number
export const getDayNumerology = (date: Date): number => {
  const day = date.getDate()
  // Reduce to single digit (except master numbers 11, 22, 33)
  let sum = day
  while (sum > 33 && (sum !== 11 && sum !== 22 && sum !== 33)) {
    sum = sum.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0)
  }
  return sum
}