import { Interpretation, Dream,DreamPattern, Symbol } from '@/lib/types';
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatDateShort(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

export function computePatterns(dreams: Dream[]): DreamPattern {
  if (dreams.length < 2) {
    return { recurringSymbols: {}, themeFrequency: {} };
  }

  const symbolCounts: Record<string, number> = {};
  const themeCounts: Record<string, number> = {};

  dreams.forEach((dream) => {
    dream.interpretation.symbols.forEach((s) => {
      const key = s.symbol.toLowerCase();
      symbolCounts[key] = (symbolCounts[key] || 0) + 1;
    });
    dream.interpretation.mainThemes.forEach((t) => {
      const key = t.toLowerCase();
      themeCounts[key] = (themeCounts[key] || 0) + 1;
    });
  });

  const total = dreams.length;
  const threshold = 0.2; // 20% frequency

  return {
    recurringSymbols: Object.fromEntries(
      Object.entries(symbolCounts).filter(([_, count]) => count / total >= threshold)
    ),
    themeFrequency: Object.fromEntries(
      Object.entries(themeCounts).filter(([_, count]) => count / total >= threshold)
    ),
  };
}

export function calculatePercentage(count: number, total: number): number {
  return Math.round((count / total) * 100);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}


export const interpretDreamLocally = (text: string, symbols: Symbol[]): Interpretation => {
  const lowerText = text.toLowerCase();
  const positiveWords = ['happy', 'joy', 'love', 'peace', 'beautiful', 'free', 'success', 'warm', 'fly', 'soar'];
  const negativeWords = ['scared', 'angry', 'sad', 'lost', 'dark', 'fall', 'chase', 'pain', 'die', 'drown'];

  // Fuzzy match
  const matchedSymbols = symbols
    .filter((s: Symbol) => new RegExp(`\\b${s.key}(s?)(ing|ed)?\\b`, 'i').test(lowerText))
    .slice(0, 6)
    .map((s: Symbol) => ({ symbol: s.key.charAt(0).toUpperCase() + s.key.slice(1), meaning: s.meaning }));

  // Themes map
  const themesMap = {
    freedom: ['flying', 'bird', 'plane'],
    anxiety: ['falling', 'teeth', 'chased', 'naked', 'spider', 'late', 'exam'],
    transformation: ['snake', 'death', 'dying', 'fires', 'losinghair'],
    emotions: ['water', 'drowning', 'baby', 'flowers'],
    self: ['house', 'stranger', 'shadow', 'anima', 'animus', 'self', 'persona'],
    relationships: ['dog', 'cat', 'ex', 'infidelity', 'pregnant'],
    daily: ['car', 'money', 'phone', 'book', 'food']
  };
  const mainThemes = Object.keys(themesMap).filter(theme =>
    themesMap[theme as keyof typeof themesMap].some(key => new RegExp(`\\b${key}(s?)(ing|ed)?\\b`, 'i').test(lowerText))
  ).slice(0, 4);

  // Sentiment
  const posCount = positiveWords.filter(w => lowerText.includes(w)).length;
  const negCount = negativeWords.filter(w => lowerText.includes(w)).length;
  let emotionalTone = 'A blend of curiosity and introspection.';
  if (negCount > posCount * 1.5) emotionalTone = 'Anxious undertones, hinting at unresolved tensions.';
  else if (posCount > negCount) emotionalTone = 'Uplifting, evoking hope and release.';

  const insight = matchedSymbols.length
    ? `Your subconscious spotlights ${matchedSymbols[0].symbol}, echoing ${matchedSymbols[0].meaning.toLowerCase()}. This ties to your life's current rhythms.`
    : "This dream nudges gentle self-exploration, unveiling subtle patterns.";

  const guidance = matchedSymbols.length
    ? `Ponder ${matchedSymbols[0].symbol.toLowerCase()} in your day—journal it for clarity. Welcome its wisdom with self-compassion.`
    : "Pause for reflection, maybe meditate, to attune to these inner whispers.";

  return { mainThemes, emotionalTone, symbols: matchedSymbols, personalInsight: insight, guidance };
};

