// lib/interpretation.ts
import { Interpretation, Symbol } from '@/lib/types';

// Expanded word lists for better analysis
const POSITIVE_WORDS = [
  'happy', 'joy', 'love', 'peace', 'beautiful', 'free', 'success',
  'warm', 'fly', 'soar', 'light', 'bright', 'wonderful', 'excited',
  'hope', 'dream', 'achieve', 'win', 'smile', 'laugh', 'celebration',
  'triumph', 'safe', 'comfort', 'bliss', 'harmony', 'connection'
];

const NEGATIVE_WORDS = [
  'scared', 'angry', 'sad', 'lost', 'dark', 'fall', 'chase',
  'pain', 'die', 'drown', 'fear', 'worry', 'anxious', 'stress',
  'cry', 'hurt', 'alone', 'trapped', 'helpless', 'nightmare',
  'threatened', 'paralyzed', 'abandoned', 'rejected', 'failure'
];

const THEMES_MAP: Record<string, string[]> = {
  freedom: ['flying', 'bird', 'plane', 'sky', 'wind', 'soar', 'escape', 'freedom'],
  anxiety: ['falling', 'teeth', 'chased', 'naked', 'spider', 'late', 'exam', 'test', 'lost', 'unprepared'],
  transformation: ['snake', 'death', 'dying', 'fire', 'losing hair', 'butterfly', 'rebirth', 'metamorphosis', 'change'],
  emotions: ['water', 'drowning', 'ocean', 'baby', 'flower', 'cry', 'storm', 'rain', 'flood'],
  self: ['house', 'stranger', 'shadow', 'anima', 'animus', 'self', 'persona', 'mirror', 'reflection'],
  relationships: ['dog', 'cat', 'ex', 'infidelity', 'pregnant', 'family', 'friend', 'lover', 'partner'],
  journey: ['car', 'plane', 'bridge', 'door', 'path', 'road', 'travel', 'destination', 'journey'],
  communication: ['phone', 'book', 'speak', 'voice', 'message', 'letter', 'language', 'words'],
  spirituality: ['moon', 'sun', 'star', 'angel', 'light', 'temple', 'prayer', 'sacred', 'divine'],
  conflict: ['fight', 'war', 'battle', 'intruder', 'enemy', 'weapon', 'attack', 'invasion'],
  growth: ['pregnant', 'baby', 'seed', 'tree', 'flower', 'garden', 'plant', 'bloom'],
  material: ['money', 'food', 'house', 'car', 'gold', 'treasure', 'wealth', 'possession']
};

// Helper: Count word occurrences
function countWordMatches(text: string, words: string[]): number {
  const lowerText = text.toLowerCase();
  return words.filter(word => {
    const regex = new RegExp(`\\b${word}(s|es|ed|ing)?\\b`, 'i');
    return regex.test(lowerText);
  }).length;
}

// Helper: Extract themes
function extractThemes(text: string): string[] {
  const themes = Object.entries(THEMES_MAP)
    .filter(([_, keywords]) =>
      keywords.some(keyword => {
        const regex = new RegExp(`\\b${keyword}(s|es|ed|ing)?\\b`, 'i');
        return regex.test(text.toLowerCase());
      })
    )
    .map(([theme]) => theme);

  return themes.length > 0 ? themes : ['introspection'];
}

// Helper: Find matched symbols
function findMatchedSymbols(text: string, symbols: Symbol[]): { symbol: string; meaning: string }[] {
  const lowerText = text.toLowerCase();

  return symbols
    .filter(s => {
      const regex = new RegExp(`\\b${s.key}(s|es|ed|ing)?\\b`, 'i');
      return regex.test(lowerText);
    })
    .slice(0, 8)
    .map(s => ({
      symbol: s.key.charAt(0).toUpperCase() + s.key.slice(1),
      meaning: s.meaning || 'A meaningful element in your subconscious.',
    }));
}

// Helper: Analyze emotional tone
function analyzeEmotionalTone(text: string): string {
  const posCount = countWordMatches(text, POSITIVE_WORDS);
  const negCount = countWordMatches(text, NEGATIVE_WORDS);

  if (negCount > posCount * 1.5) {
    return 'Anxious and reflective undertones, hinting at unresolved tensions or inner conflicts seeking gentle resolution.';
  } else if (posCount > negCount * 1.2) {
    return 'Uplifting and expansive, evoking feelings of release, joy, and positive transformation.';
  } else if (negCount > 0 && posCount > 0) {
    return 'A complex blend of light and shadow, reflecting life\'s natural duality and the ongoing dance between growth and challenge.';
  }
  return 'Contemplative and curious, inviting deeper self-exploration and introspection.';
}

// Main interpretation function
export function interpretDream(text: string, symbols: Symbol[]): Interpretation {
  if (!text.trim()) {
    throw new Error('Dream text cannot be empty');
  }

  const mainThemes = extractThemes(text);
  const matchedSymbols = findMatchedSymbols(text, symbols);
  const emotionalTone = analyzeEmotionalTone(text);

  // Generate personal insight
  let personalInsight: string;
  if (matchedSymbols.length > 0) {
    const topSymbol = matchedSymbols[0];
    personalInsight = `Your subconscious highlights ${topSymbol.symbol.toLowerCase()}, symbolizing ${topSymbol.meaning.toLowerCase()}. This connects to patterns currently unfolding in your life, revealing deeper emotional landscapes and hidden wisdom.`;
  } else {
    personalInsight = 'This dream invites gentle self-exploration, revealing subtle patterns from your inner world. Even without clear symbols, the emotional texture holds meaningful insights about your current journey and growth.';
  }

  // Generate guidance
  let guidance: string;
  if (matchedSymbols.length > 0) {
    const topSymbol = matchedSymbols[0].symbol.toLowerCase();
    guidance = `Reflect on how ${topSymbol} appears in your waking life. Journal about what it means to you personally. Approach this symbol with curiosity and self-compassion, allowing insights to unfold naturally.`;
  } else {
    guidance = 'Create space for quiet reflection or meditation. Trust your intuition and honor what arises. Sometimes the most profound insights emerge through stillness and patience.';
  }

  // Enhance guidance based on themes
  if (mainThemes.includes('anxiety')) {
    guidance += ' Remember: anxiety invites you to address what needs attention. Ground yourself through breathwork, nature walks, or journaling.';
  } else if (mainThemes.includes('transformation')) {
    guidance += ' Embrace this season of change with trust. Transformation, though sometimes uncomfortable, is the gateway to renewal and growth.';
  } else if (mainThemes.includes('spirituality')) {
    guidance += ' This dream carries spiritual significance. Explore its meaning through meditation, prayer, or meaningful ritual.';
  }

  return {
    mainThemes,
    emotionalTone,
    symbols: matchedSymbols,
    personalInsight,
    guidance,
  };
}

// Helper: Analyze patterns across multiple interpretations
export function analyzeRecurringPatterns(interpretations: Interpretation[]) {
  if (interpretations.length < 3) {
    return {
      insights: [],
      symbolFreq: {},
      themeFreq: {},
      correlations: [],
    };
  }

  const symbolFreq: Record<string, number> = {};
  const themeFreq: Record<string, number> = {};
  const insights: string[] = [];

  interpretations.forEach(interp => {
    interp.symbols.forEach(s => {
      const key = s.symbol.toLowerCase();
      symbolFreq[key] = (symbolFreq[key] || 0) + 1;
    });
    interp.mainThemes.forEach(t => {
      themeFreq[t.toLowerCase()] = (themeFreq[t.toLowerCase()] || 0) + 1;
    });
  });

  const total = interpretations.length;

  // Find top symbol
  const topSymbol = Object.entries(symbolFreq).sort((a, b) => b[1] - a[1])[0];
  if (topSymbol && topSymbol[1] / total >= 0.3) {
    insights.push(
      `"${topSymbol[0]}" appears in ${Math.round((topSymbol[1] / total) * 100)}% of your dreams. This recurring symbol holds significant meaning in your subconscious.`
    );
  }

  // Find dominant theme
  const topTheme = Object.entries(themeFreq).sort((a, b) => b[1] - a[1])[0];
  if (topTheme && topTheme[1] / total >= 0.4) {
    insights.push(
      `The theme of "${topTheme[0]}" dominates your dream landscape, suggesting this area deserves your attention and reflection.`
    );
  }

  // Find correlations
  const correlations: string[] = [];
  Object.entries(symbolFreq)
    .filter(([_, count]) => count >= 2)
    .slice(0, 3)
    .forEach(([symbol]) => {
      const relatedTheme = Object.entries(themeFreq).sort((a, b) => b[1] - a[1])[0];
      if (relatedTheme) {
        correlations.push(`${symbol} often appears alongside themes of ${relatedTheme[0]}`);
      }
    });

  return {
    insights,
    symbolFreq,
    themeFreq,
    correlations,
  };
}

// Sentiment scoring for trend analysis
export function sentimentScore(text: string): number {
  const posCount = countWordMatches(text, POSITIVE_WORDS);
  const negCount = countWordMatches(text, NEGATIVE_WORDS);

  if (posCount + negCount === 0) return 0;
  return (posCount - negCount) / (posCount + negCount);
}