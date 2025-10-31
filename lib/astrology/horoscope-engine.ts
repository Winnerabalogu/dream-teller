// src/lib/astrology/horoscope-engine.ts
import { 
  calculateTransits, 
  getMoonPhaseInfluence, 
  calculatePlanetaryAspects,
  getDayRuler,
  getDayNumerology 
} from './planetary-aspects'

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

// Enhanced theme generator with planetary transits
const generateEnhancedTheme = (
  sign: string, 
  element: string, 
  date: Date
): string => {
  const transits = calculateTransits(sign, date)
  const moonPhase = getMoonPhaseInfluence(date)
  const dayRuler = getDayRuler(date)
  
  let theme = ''
  
  // Start with moon phase influence
  theme += `${moonPhase.name} energy emphasizes ${moonPhase.influence}. `
  
  // Add major transit if present
  if (transits.length > 0) {
    const majorTransit = transits[0]
    theme += `${majorTransit.message}. `
  }
  
  // Add day ruler influence
  theme += `${dayRuler.day}'s ${dayRuler.planet} energy supports ${dayRuler.influence}.`
  
  return theme
}

// Enhanced advice with planetary aspects
const generateEnhancedAdvice = (
  sign: string,
  element: string,
  date: Date
): string => {
  const aspects = calculatePlanetaryAspects(date)
  const moonPhase = getMoonPhaseInfluence(date)
  
  let advice = moonPhase.advice + '. '
  
  // Add specific aspect advice
  const positiveAspects = aspects.filter(a => a.influence === 'positive')
  const challengingAspects = aspects.filter(a => a.influence === 'challenging')
  
  if (positiveAspects.length > 0) {
    advice += `With ${positiveAspects[0].name}, ${positiveAspects[0].description.toLowerCase()} `
  }
  
  if (challengingAspects.length > 0) {
    advice += `Navigate ${challengingAspects[0].name} by staying grounded and patient. `
  }
  
  return advice
}

// Calculate enhanced energy with all influences
const calculateEnhancedEnergy = (
  sign: string,
  element: string,
  date: Date
): number => {
  let energy = 5
  
  const transits = calculateTransits(sign, date)
  const moonPhase = getMoonPhaseInfluence(date)
  const aspects = calculatePlanetaryAspects(date)
  const dayNumerology = getDayNumerology(date)
  
  // Transit boost
  transits.forEach(transit => {
    if (transit.aspect === 'trine' || transit.aspect === 'sextile') energy += 1
    if (transit.aspect === 'conjunction') energy += 0.5
  })
  
  // Moon phase influence
  const moonPhaseValue = ['Full Moon', 'New Moon', 'First Quarter'].includes(moonPhase.name) ? 1 : 0
  energy += moonPhaseValue
  
  // Positive aspects boost
  aspects.forEach(aspect => {
    if (aspect.influence === 'positive') energy += aspect.strength
    if (aspect.influence === 'challenging') energy -= 0.5
  })
  
  // Numerology influence (certain numbers = higher energy)
  if ([1, 3, 5, 9, 11].includes(dayNumerology)) energy += 0.5
  
  return Math.min(10, Math.max(1, Math.round(energy)))
}

// Generate lucky element incorporating all factors
const generateEnhancedLucky = (
  sign: string,
  date: Date
): string => {
  const dayRuler = getDayRuler(date)
  const numerology = getDayNumerology(date)
  const moonPhase = getMoonPhaseInfluence(date)
  
  return `${dayRuler.color} (${dayRuler.planet}'s color), Number ${numerology}, during ${moonPhase.name.toLowerCase()}`
}

// Main enhanced generator
export function generateEnhancedDailyHoroscope(
  sign: string,
  baseHoroscope: BaseHoroscope,
  date: Date
): DailyReading {
  const element = baseHoroscope.element
  
  // Use enhanced calculations
  const theme = generateEnhancedTheme(sign, element, date)
  const advice = generateEnhancedAdvice(sign, element, date)
  const energyLevel = calculateEnhancedEnergy(sign, element, date)
  const luckyElement = generateEnhancedLucky(sign, date)
  
  // Generate affirmation based on energy and influences
  const moonPhase = getMoonPhaseInfluence(date)
  const affirmation = `I align with ${moonPhase.name} energy and embrace ${moonPhase.influence} with grace and wisdom.`
  
  // Focus areas from transits and moon phase
  const transits = calculateTransits(sign, date)
  const focusAreas = [
    moonPhase.influence.split(',')[0].trim(),
    transits[0]?.planet.toLowerCase() + ' themes' || 'personal growth',
    'spiritual awareness'
  ]
  
  const energyDescription = `Your energy is at ${energyLevel}/10 today. ${moonPhase.energy} is the prevailing tone. ${transits.length > 0 ? transits[0].message : 'Trust your inner guidance.'}`
  
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

// You can also export both - use basic for performance, enhanced for depth
export { generateEnhancedDailyHoroscope as generateDailyHoroscope }