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

// Helper: Analyze patterns across multiple interpretations with intelligent pattern detection
export function analyzeRecurringPatterns(interpretations: Interpretation[]) {
  if (interpretations.length === 0) {
    return {
      insights: [],
      symbolFreq: {},
      themeFreq: {},
      correlations: [],
      trends: [],
      emotionalPattern: null,
    };
  }

  const symbolFreq: Record<string, number> = {};
  const themeFreq: Record<string, number> = {};
  const symbolThemeMap: Record<string, Record<string, number>> = {};
  const insights: string[] = [];
  const trends: string[] = [];

  // Build frequency maps and correlations
  interpretations.forEach(interp => {
    interp.symbols.forEach(s => {
      const symbolKey = s.symbol.toLowerCase();
      symbolFreq[symbolKey] = (symbolFreq[symbolKey] || 0) + 1;

      // Track which themes appear with which symbols
      if (!symbolThemeMap[symbolKey]) {
        symbolThemeMap[symbolKey] = {};
      }
      interp.mainThemes.forEach(theme => {
        const themeKey = theme.toLowerCase();
        symbolThemeMap[symbolKey][themeKey] = (symbolThemeMap[symbolKey][themeKey] || 0) + 1;
      });
    });

    interp.mainThemes.forEach(t => {
      themeFreq[t.toLowerCase()] = (themeFreq[t.toLowerCase()] || 0) + 1;
    });
  });

  const total = interpretations.length;

  // Analyze symbol patterns with different thresholds
  const sortedSymbols = Object.entries(symbolFreq).sort((a, b) => b[1] - a[1]);

  // Very frequent symbols (>30%)
  const dominantSymbols = sortedSymbols.filter(([, count]) => count / total >= 0.3);
  if (dominantSymbols.length > 0) {
    dominantSymbols.forEach(([symbol, count]) => {
      const percentage = Math.round((count / total) * 100);
      insights.push(
        `"${symbol}" is a dominant symbol, appearing in ${percentage}% of your dreams. This represents a core theme in your subconscious mind.`
      );
    });
  }

  // Moderately recurring symbols (15-30%)
  const recurringSymbols = sortedSymbols.filter(([, count]) => {
    const freq = count / total;
    return freq >= 0.15 && freq < 0.3;
  });
  if (recurringSymbols.length > 0 && interpretations.length >= 5) {
    const symbolList = recurringSymbols.slice(0, 3).map(([s]) => s).join(', ');
    insights.push(
      `Recurring symbols include: ${symbolList}. These patterns suggest developing themes worth exploring.`
    );
  }

  // Emerging patterns (appearing 2-3 times in recent dreams)
  if (interpretations.length >= 5) {
    const recentSymbols: Record<string, number> = {};
    interpretations.slice(-5).forEach(interp => {
      interp.symbols.forEach(s => {
        const key = s.symbol.toLowerCase();
        recentSymbols[key] = (recentSymbols[key] || 0) + 1;
      });
    });

    const emergingSymbols = Object.entries(recentSymbols)
      .filter(([symbol, count]) => count >= 2 && (!symbolFreq[symbol] || symbolFreq[symbol] <= count + 1))
      .map(([symbol]) => symbol);

    if (emergingSymbols.length > 0) {
      trends.push(
        `Emerging pattern: ${emergingSymbols.slice(0, 3).join(', ')} appearing in recent dreams, indicating new developments.`
      );
    }
  }

  // Analyze theme patterns
  const sortedThemes = Object.entries(themeFreq).sort((a, b) => b[1] - a[1]);
  const dominantTheme = sortedThemes[0];

  if (dominantTheme && dominantTheme[1] / total >= 0.4) {
    insights.push(
      `The theme of "${dominantTheme[0]}" dominates (${Math.round((dominantTheme[1] / total) * 100)}%), suggesting focused attention is needed in this area.`
    );
  }

  // Find meaningful symbol-theme correlations
  const correlations: string[] = [];
  Object.entries(symbolThemeMap)
    .filter(([symbol]) => symbolFreq[symbol] >= 2)
    .slice(0, 5)
    .forEach(([symbol, themes]) => {
      const strongestTheme = Object.entries(themes)
        .sort((a, b) => b[1] - a[1])[0];

      if (strongestTheme) {
        const coOccurrence = strongestTheme[1];
        const symbolTotal = symbolFreq[symbol];

        // Only report strong correlations (>60% co-occurrence)
        if (coOccurrence / symbolTotal >= 0.6) {
          correlations.push(
            `"${symbol}" correlates with ${strongestTheme[0]} (${Math.round((coOccurrence / symbolTotal) * 100)}%)`
          );
        }
      }
    });

  // Analyze emotional patterns
  let emotionalPattern = null;
  if (interpretations.length >= 3) {
    const recentEmotions = interpretations.slice(-3).map(i => i.emotionalTone.toLowerCase());
    const hasAnxiety = recentEmotions.some(e => e.includes('anxious') || e.includes('tension'));
    const hasJoy = recentEmotions.some(e => e.includes('joy') || e.includes('uplifting'));

    if (hasAnxiety && !hasJoy) {
      emotionalPattern = 'anxious';
      trends.push('Recent dreams show heightened anxiety. Consider stress management practices.');
    } else if (hasJoy && !hasAnxiety) {
      emotionalPattern = 'positive';
      trends.push('Recent dreams reflect positive emotional states and growth.');
    } else if (hasAnxiety && hasJoy) {
      emotionalPattern = 'mixed';
      trends.push('Dreams show emotional complexity, balancing growth with challenges.');
    }
  }

  // Detect symbol evolution
  if (interpretations.length >= 6) {
    const earlySymbols = new Set<string>();
    const lateSymbols = new Set<string>();
    const splitPoint = Math.floor(interpretations.length / 2);

    interpretations.slice(0, splitPoint).forEach(interp => {
      interp.symbols.forEach(s => earlySymbols.add(s.symbol.toLowerCase()));
    });

    interpretations.slice(splitPoint).forEach(interp => {
      interp.symbols.forEach(s => lateSymbols.add(s.symbol.toLowerCase()));
    });

    const newSymbols = Array.from(lateSymbols).filter(s => !earlySymbols.has(s));
    if (newSymbols.length > 0) {
      trends.push(
        `New symbols: ${newSymbols.slice(0, 3).join(', ')} — representing evolving inner themes.`
      );
    }
  }

  return {
    insights,
    symbolFreq,
    themeFreq,
    correlations,
    trends,
    emotionalPattern,
  };
}

// Sentiment scoring for trend analysis
export function sentimentScore(text: string): number {
  const posCount = countWordMatches(text, POSITIVE_WORDS);
  const negCount = countWordMatches(text, NEGATIVE_WORDS);

  if (posCount + negCount === 0) return 0;
  return (posCount - negCount) / (posCount + negCount);
}