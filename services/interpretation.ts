import { Interpretation, Symbol } from '@/lib/types';

const positiveWords = [
  'happy', 'joy', 'love', 'peace', 'beautiful', 'free', 'success', 
  'warm', 'fly', 'soar', 'light', 'bright', 'wonderful', 'excited', 
  'hope', 'dream', 'achieve', 'win', 'smile', 'laugh'
];

const negativeWords = [
  'scared', 'angry', 'sad', 'lost', 'dark', 'fall', 'chase', 
  'pain', 'die', 'drown', 'fear', 'worry', 'anxious', 'stress', 
  'cry', 'hurt', 'alone', 'trapped', 'helpless', 'nightmare'
];

const themesMap: Record<string, string[]> = {
  freedom: ['flying', 'bird', 'plane', 'sky', 'wind', 'soar'],
  anxiety: ['falling', 'teeth', 'chased', 'naked', 'spider', 'late', 'exam', 'test', 'lost'],
  transformation: ['snake', 'death', 'dying', 'fire', 'losinghair', 'butterfly', 'rebirth'],
  emotions: ['water', 'drowning', 'ocean', 'baby', 'flower', 'cry', 'storm'],
  self: ['house', 'stranger', 'shadow', 'anima', 'animus', 'self', 'persona', 'mirror'],
  relationships: ['dog', 'cat', 'ex', 'infidelity', 'pregnant', 'family', 'friend'],
  journey: ['car', 'plane', 'bridge', 'door', 'path', 'road', 'travel'],
  communication: ['phone', 'book', 'speak', 'voice', 'message', 'letter'],
  spirituality: ['moon', 'sun', 'star', 'angel', 'light', 'temple', 'prayer'],
  conflict: ['fight', 'war', 'battle', 'intruder', 'enemy', 'weapon'],
  growth: ['pregnant', 'baby', 'seed', 'tree', 'flower', 'garden'],
  material: ['money', 'food', 'house', 'car', 'gold', 'treasure']
};

export function interpretDream(text: string, symbols: Symbol[]): Interpretation {
  const lowerText = text.toLowerCase();
  
  // Match symbols with fuzzy matching (handles plurals and verb forms)
  const matchedSymbols = symbols
    .filter((s: Symbol) => {
      const regex = new RegExp(`\\b${s.key}(s?)(ing|ed)?\\b`, 'i');
      return regex.test(lowerText);
    })
    .slice(0, 6)
    .map((s: Symbol) => ({
      symbol: s.key.charAt(0).toUpperCase() + s.key.slice(1),
      meaning: s.meaning,
    }));

  // Identify main themes based on symbol clusters
  const mainThemes = Object.keys(themesMap)
    .filter((theme) =>
      themesMap[theme].some((key) => {
        const regex = new RegExp(`\\b${key}(s?)(ing|ed)?\\b`, 'i');
        return regex.test(lowerText);
      })
    )
    .slice(0, 4);

  // If no themes found, add a default
  if (mainThemes.length === 0) {
    mainThemes.push('exploration');
  }

  // Analyze emotional tone
  const posCount = positiveWords.filter((word) => lowerText.includes(word)).length;
  const negCount = negativeWords.filter((word) => lowerText.includes(word)).length;

  let emotionalTone: string;
  if (negCount > posCount * 1.5) {
    emotionalTone = 'Anxious undertones, hinting at unresolved tensions or inner conflicts seeking resolution.';
  } else if (posCount > negCount * 1.2) {
    emotionalTone = 'Uplifting and hopeful, evoking feelings of release, joy, and positive transformation.';
  } else if (negCount > 0 && posCount > 0) {
    emotionalTone = 'A complex blend of light and shadow, reflecting life\'s natural duality and growth.';
  } else {
    emotionalTone = 'A blend of curiosity and introspection, inviting deeper self-exploration.';
  }

  // Generate personal insight
  let personalInsight: string;
  if (matchedSymbols.length > 0) {
    const primarySymbol = matchedSymbols[0];
    personalInsight = `Your subconscious spotlights ${primarySymbol.symbol.toLowerCase()}, which resonates with ${primarySymbol.meaning.toLowerCase()}. This connects to patterns and rhythms currently unfolding in your waking life, offering a window into your deeper emotional landscape.`;
  } else {
    personalInsight = 'This dream invites gentle self-exploration, revealing subtle patterns and whispers from your inner world. Even without clear symbols, the emotional texture of your dream holds meaningful insights about your current journey.';
  }

  // Generate guidance
  let guidance: string;
  if (matchedSymbols.length > 0) {
    const primarySymbol = matchedSymbols[0].symbol.toLowerCase();
    guidance = `Take time to ponder how ${primarySymbol} appears in your daily life. Consider journaling about this symbol and what it means to you personally. Welcome its wisdom with self-compassion and curiosity, allowing insights to emerge naturally.`;
  } else {
    guidance = 'Pause for quiet reflection or meditation to attune to these inner whispers. Trust your intuition and allow yourself space to process what this dream might be communicating. Sometimes the most profound insights arrive in stillness.';
  }

  // Enhance guidance based on themes
  if (mainThemes.includes('anxiety')) {
    guidance += ' If feelings of anxiety arise, remember they are invitations to address what needs attention in your life. Consider grounding practices like deep breathing or nature walks.';
  } else if (mainThemes.includes('transformation')) {
    guidance += ' Embrace this period of change with patience and trust. Transformation, though sometimes uncomfortable, leads to growth and renewal.';
  }

  return {
    mainThemes,
    emotionalTone,
    symbols: matchedSymbols,
    personalInsight,
    guidance,
  };
}

export function analyzeRecurringPatterns(interpretations: Interpretation[]): string[] {
  if (interpretations.length < 3) return [];

  const insights: string[] = [];
  const symbolFreq: Record<string, number> = {};
  const themeFreq: Record<string, number> = {};

  interpretations.forEach((interp) => {
    interp.symbols.forEach((s) => {
      symbolFreq[s.symbol.toLowerCase()] = (symbolFreq[s.symbol.toLowerCase()] || 0) + 1;
    });
    interp.mainThemes.forEach((t) => {
      themeFreq[t.toLowerCase()] = (themeFreq[t.toLowerCase()] || 0) + 1;
    });
  });

  const total = interpretations.length;
  
  // Find most recurring symbol
  const topSymbol = Object.entries(symbolFreq).sort((a, b) => b[1] - a[1])[0];
  if (topSymbol && topSymbol[1] / total > 0.3) {
    insights.push(`The symbol "${topSymbol[0]}" appears in ${Math.round((topSymbol[1] / total) * 100)}% of your dreams, suggesting it holds significant meaning in your subconscious.`);
  }

  // Find dominant theme
  const topTheme = Object.entries(themeFreq).sort((a, b) => b[1] - a[1])[0];
  if (topTheme && topTheme[1] / total > 0.4) {
    insights.push(`The theme of "${topTheme[0]}" dominates your dream landscape, indicating this area may be calling for your attention.`);
  }

  return insights;
}