import { Dream, DreamPattern } from '@/lib/types';
export { interpretDreamLocally as interpretDreamLocally } from '@/lib/interpretation';
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
    
    // mainThemes is now string[]
    dream.interpretation.mainThemes.forEach((t: string) => {
      const key = t.toLowerCase();
      themeCounts[key] = (themeCounts[key] || 0) + 1;
    });
  });

  const total = dreams.length;
  const threshold = 0.2;

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
