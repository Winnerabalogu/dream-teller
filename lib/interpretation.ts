// lib/interpretation.ts
import type { Interpretation, Symbol } from "./types";


const PSYCHOLOGICAL_FRAMEWORKS = {
  jungian: [
    "This dream reveals archetypal patterns of the {archetype} at play in your psyche.",
    "Your unconscious is working with {symbol} as a representation of your {aspect}.",
    "The {theme} theme suggests a need for integration between your conscious and unconscious minds.",
    "From a Jungian perspective, this dream indicates a process of individuation through {symbol}."
  ],
  
  freudian: [
    "The manifest content of this dream masks latent desires related to {theme}.",
    "{symbol} appears as a displacement for deeper psychological conflicts about {aspect}.",
    "This dream work reveals defense mechanisms around {emotion}.",
    "The symbolism suggests unresolved conflicts from your personal history."
  ],
  
  gestalt: [
    "Every element in this dream represents an aspect of yourself - what part of you is {symbol}?",
    "The {theme} in your dream mirrors something you're avoiding in waking life.",
    "If your dream were a stage, each character represents a different part of your personality.",
    "This dream invites you to reclaim projected aspects of yourself through {symbol}."
  ],
  
  spiritual: [
    "Your soul is communicating important lessons through the imagery of {symbol}.",
    "This dream carries vibrations of {theme} that resonate with your spiritual path.",
    "The universe is speaking to you through these symbols - pay attention to {symbol}.",
    "Your higher self is guiding you toward {growth} through this nocturnal message."
  ]
} as const;

const ARCHETYPES = [
  "Hero", "Shadow", "Anima", "Animus", "Wise Old Person", "Trickster", 
  "Child", "Mother", "Father", "Mentor", "Guardian", "Companion"
] as const;

const PERSONAL_ASPECTS = [
  "inner child", "creative potential", "suppressed emotions", "hidden talents",
  "unexpressed desires", "spiritual longing", "emotional needs", "personal power",
  "vulnerability", "intuition", "wisdom", "healing capacity"
] as const;

const GROWTH_OPPORTUNITIES = [
  "emotional integration", "self-acceptance", "boundary setting", "creative expression",
  "spiritual development", "relationship healing", "career alignment", "personal authenticity",
  "inner child work", "shadow integration", "intuition development", "self-compassion"
] as const;

const EMOTIONAL_DEPTHS = {
  surface: ["immediate reaction", "initial response", "surface feeling", "conscious emotion"],
  deeper: ["underlying currents", "buried feelings", "emotional patterns", "core vulnerabilities"],
  core: ["fundamental truth", "soul-level knowing", "essential nature", "spiritual essence"]
} as const;

// Enhanced emotional tone analysis
function analyzeEmotionalTone(text: string): string {
  const emotionalIndicators = {
    positive: ['happy', 'joy', 'love', 'peace', 'beautiful', 'free', 'success', 'warm', 'fly', 'soar', 'light', 'bright', 'wonderful', 'excited', 'hope', 'dream', 'achieve', 'win', 'smile', 'laugh', 'celebration', 'triumph', 'safe', 'comfort', 'bliss', 'harmony', 'connection'],
    negative: ['scared', 'angry', 'sad', 'lost', 'dark', 'fall', 'chase', 'pain', 'die', 'drown', 'fear', 'worry', 'anxious', 'stress', 'cry', 'hurt', 'alone', 'trapped', 'helpless', 'nightmare', 'threatened', 'paralyzed', 'abandoned', 'rejected', 'failure'],
    neutral: ['walk', 'talk', 'see', 'find', 'move', 'go', 'come', 'look', 'think', 'know', 'understand', 'remember', 'forget']
  } as const;

  let positiveCount = 0;
  let negativeCount = 0;
  
  emotionalIndicators.positive.forEach(word => {
    const regex = new RegExp(`\\b${word}(s|es|ed|ing)?\\b`, 'gi');
    positiveCount += (text.match(regex) || []).length;
  });
  
  emotionalIndicators.negative.forEach(word => {
    const regex = new RegExp(`\\b${word}(s|es|ed|ing)?\\b`, 'gi');
    negativeCount += (text.match(regex) || []).length;
  });

  if (negativeCount > positiveCount * 1.5) {
    return "Anxious and reflective undertones, hinting at unresolved tensions or inner conflicts seeking gentle resolution. The emotional landscape suggests a need for self-compassion and gentle exploration of buried feelings.";
  } else if (positiveCount > negativeCount * 1.2) {
    return "Uplifting and expansive, evoking feelings of release, joy, and positive transformation. This dream carries vibrations of hope and possibility, inviting you to embrace new beginnings with confidence.";
  } else if (negativeCount > 0 && positiveCount > 0) {
    return "A complex blend of light and shadow, reflecting life's natural duality and the ongoing dance between growth and challenge. The emotional tapestry weaves together contrasting threads of experience.";
  }
  
  return "Contemplative and curious, inviting deeper self-exploration and introspection. The emotional tone suggests a quiet readiness to receive wisdom from your inner world.";
}

// Enhanced theme extraction
function extractThemes(text: string): string[] {
  const themeKeywords: Record<string, readonly string[]> = {
    'freedom': ['flying', 'bird', 'plane', 'sky', 'wind', 'soar', 'escape', 'free', 'release'],
    'anxiety': ['falling', 'teeth', 'chased', 'naked', 'spider', 'late', 'exam', 'lost', 'trapped', 'paralyzed'],
    'transformation': ['snake', 'death', 'fire', 'butterfly', 'rebirth', 'change', 'transform', 'metamorphosis'],
    'relationships': ['dog', 'cat', 'family', 'friend', 'lover', 'partner', 'mother', 'father', 'stranger'],
    'self-discovery': ['house', 'mirror', 'shadow', 'reflection', 'identity', 'naked', 'mask'],
    'spirituality': ['moon', 'sun', 'star', 'angel', 'light', 'temple', 'prayer', 'spirit', 'soul'],
    'conflict': ['fight', 'war', 'battle', 'enemy', 'weapon', 'attack', 'chase', 'argument'],
    'growth': ['pregnant', 'baby', 'seed', 'tree', 'flower', 'garden', 'plant', 'grow', 'birth'],
    'communication': ['phone', 'book', 'speak', 'voice', 'message', 'letter', 'talk', 'say'],
    'journey': ['car', 'plane', 'bridge', 'door', 'path', 'road', 'travel', 'journey', 'walk']
  } as const;

  const themes: string[] = [];
  const lowerText = text.toLowerCase();

  Object.entries(themeKeywords).forEach(([theme, keywords]) => {
    if (keywords.some(keyword => {
      const regex = new RegExp(`\\b${keyword}(s|es|ed|ing)?\\b`, 'i');
      return regex.test(lowerText);
    })) {
      themes.push(theme);
    }
  });

  return themes.length > 0 ? themes : ['introspection', 'self-awareness', 'personal-growth'];
}

// Enhanced symbol matching
function findMatchedSymbols(text: string, symbols: Symbol[]): Array<{ symbol: string; meaning: string }> {
  const lowerText = text.toLowerCase();
  
  return symbols
    .filter((s) => {
      const regex = new RegExp(`\\b${s.key}(s|es|ed|ing)?\\b`, 'i');
      return regex.test(lowerText);
    })
    .slice(0, 6) // Limit to most relevant symbols
    .map((s) => ({
      symbol: s.key.charAt(0).toUpperCase() + s.key.slice(1),
      meaning: enhanceSymbolMeaning(s.meaning, text)
    }));
}

// Make symbol meanings more contextual and insightful
function enhanceSymbolMeaning(baseMeaning: string, dreamText: string): string {
  const contextualInsights = [
    "In the context of your dream, this symbol carries additional personal significance.",
    "The way this symbol appears reveals deeper layers of meaning specific to your journey.",
    "This symbol's presence suggests an important message from your unconscious mind.",
    "Consider how this symbol relates to current life circumstances for maximum insight."
  ] as const;
  
  const randomInsight = contextualInsights[Math.floor(Math.random() * contextualInsights.length)];
  return `${baseMeaning} ${randomInsight}`;
}

// Generate deep psychological insights
function generatePsychologicalInsight(themes: string[], symbols: Array<{ symbol: string; meaning: string }>, text: string): string {
  const frameworkKeys = Object.keys(PSYCHOLOGICAL_FRAMEWORKS) as Array<keyof typeof PSYCHOLOGICAL_FRAMEWORKS>;
  const framework = frameworkKeys[Math.floor(Math.random() * frameworkKeys.length)];
  
  const frameworkTemplates = PSYCHOLOGICAL_FRAMEWORKS[framework];
  const template = frameworkTemplates[Math.floor(Math.random() * frameworkTemplates.length)];
  
  const primarySymbol = symbols[0]?.symbol.toLowerCase() || 'the dream imagery';
  const primaryTheme = themes[0] || 'self-discovery';
  const randomArchetype = ARCHETYPES[Math.floor(Math.random() * ARCHETYPES.length)];
  const randomAspect = PERSONAL_ASPECTS[Math.floor(Math.random() * PERSONAL_ASPECTS.length)];
  const randomGrowth = GROWTH_OPPORTUNITIES[Math.floor(Math.random() * GROWTH_OPPORTUNITIES.length)];
  
  let insight = template
    .replace('{archetype}', randomArchetype)
    .replace('{symbol}', primarySymbol)
    .replace('{aspect}', randomAspect)
    .replace('{theme}', primaryTheme)
    .replace('{growth}', randomGrowth)
    .replace('{emotion}', analyzeEmotionalTone(text).split(' ')[0]);
  
  // Add additional depth
  const additionalInsights = [
    ` The ${primaryTheme} theme resonates with your current life phase.`,
    ` This dream invites you to explore the ${randomAspect} more consciously.`,
    ` Your unconscious mind is orchestrating this symbolism for your growth.`,
    ` The emotional tone suggests this message comes from a deep place of knowing.`
  ] as const;
  
  insight += additionalInsights[Math.floor(Math.random() * additionalInsights.length)];
  
  return insight;
}

// Generate rich narrative
function generateNarrative(text: string, themes: string[], symbols: Array<{ symbol: string; meaning: string }>): string {
  const primarySymbol = symbols[0]?.symbol || 'the imagery';
  const emotionalTone = analyzeEmotionalTone(text);
  
  const narrativeTemplates = [
    `In the landscape of your unconscious, ${primarySymbol.toLowerCase()} emerges as a central figure, weaving together threads of ${themes.join(' and ')}. ${emotionalTone} This dream tapestry invites you to explore the hidden dimensions of your psyche, where every symbol carries multiple layers of meaning waiting to be unfolded.`,
    
    `Your dream presents a powerful narrative where ${primarySymbol.toLowerCase()} serves as a key to understanding deeper psychological patterns. The themes of ${themes.join(', ')} intersect in meaningful ways, creating a rich symbolic language that speaks directly to your soul's journey. ${emotionalTone}`,
    
    `Through the veil of sleep, your unconscious mind has crafted a profound story featuring ${primarySymbol.toLowerCase()} as its protagonist. This dream bridges the worlds of ${themes.join(' and ')}, offering insights that resonate with both your personal history and spiritual path. ${emotionalTone}`
  ] as const;
  
  return narrativeTemplates[Math.floor(Math.random() * narrativeTemplates.length)];
}

// Generate emotional layers
function generateEmotionalLayers(text: string): { surface: string; deeper: string; core: string } {
  const surface = EMOTIONAL_DEPTHS.surface[Math.floor(Math.random() * EMOTIONAL_DEPTHS.surface.length)];
  const deeper = EMOTIONAL_DEPTHS.deeper[Math.floor(Math.random() * EMOTIONAL_DEPTHS.deeper.length)];
  const core = EMOTIONAL_DEPTHS.core[Math.floor(Math.random() * EMOTIONAL_DEPTHS.core.length)];
  
  return {
    surface: `The ${surface} to the dream events`,
    deeper: `${deeper} that shape your emotional landscape`,
    core: `A ${core} seeking expression through this dream`
  };
}

// Generate growth opportunities
function generateGrowthOpportunities(themes: string[]): string[] {
  const baseOpportunities = [
    "Practice mindful awareness of your emotional responses",
    "Explore journaling to uncover deeper patterns",
    "Consider meditation to connect with your inner wisdom",
    "Engage in creative expression to process unconscious material"
  ] as const;
  
  const themeSpecific = themes.map(theme => 
    `Focus on ${theme} in your personal development work`
  );
  
  return [...baseOpportunities, ...themeSpecific].slice(0, 4);
}

// Generate follow-up questions
function generateFollowUpQuestions(symbols: Array<{ symbol: string; meaning: string }>): string[] {
  const primarySymbol = symbols[0]?.symbol || 'the main symbol';
  
  return [
    `What emotions did ${primarySymbol.toLowerCase()} evoke in you?`,
    `How does this dream connect to current life circumstances?`,
    `What part of yourself might be represented in this dream?`,
    `What action could honor the wisdom this dream offers?`
  ];
}

// Enhanced guidance generation
function generateGuidance(symbols: Array<{ symbol: string; meaning: string }>, themes: string[]): string {
  const primarySymbol = symbols[0]?.symbol || 'the symbols';
  const primaryTheme = themes[0] || 'self-discovery';
  
  const guidanceTemplates = [
    `Sit quietly with the imagery of ${primarySymbol.toLowerCase()}. Allow its meaning to unfold naturally through meditation or journaling. The theme of ${primaryTheme} invites conscious attention in your daily life.`,
    
    `Create a small ritual to honor this dream's wisdom. You might draw ${primarySymbol.toLowerCase()}, write about it, or simply reflect on its personal significance. The ${primaryTheme} energy wants integration.`,
    
    `Pay attention to how ${primarySymbol.toLowerCase()} appears in your waking life over the next few days. Synchronicities may reveal deeper layers of meaning related to ${primaryTheme}.`
  ] as const;
  
  return guidanceTemplates[Math.floor(Math.random() * guidanceTemplates.length)];
}

// Generate Jungian analysis
function generateJungianAnalysis(symbols: Array<{ symbol: string; meaning: string }>, themes: string[]): string {
  const archetype = ARCHETYPES[Math.floor(Math.random() * ARCHETYPES.length)];
  const symbol = symbols[0]?.symbol || 'the central symbol';
  
  return `From a Jungian perspective, ${symbol.toLowerCase()} represents an encounter with the ${archetype.toLowerCase()} archetype. This suggests a process of individuation where you're integrating unconscious material into conscious awareness. The collective unconscious is speaking through these universal symbols.`;
}

// Generate shadow work insights
function generateShadowWork(symbols: Array<{ symbol: string; meaning: string }>): string {
  const symbol = symbols[0]?.symbol || 'these symbols';
  
  return `The appearance of ${symbol.toLowerCase()} may point to shadow aspects seeking integration. These could represent qualities you've disowned or hidden from yourself. Embracing these parts leads to greater wholeness and self-understanding.`;
}

// Generate spiritual dimension
function generateSpiritualDimension(themes: string[]): string {
  const theme = themes[0] || 'your spiritual path';
  
  return `On a spiritual level, this dream carries vibrations of soul evolution. The ${theme} theme resonates with your higher purpose and the unfolding of your divine blueprint. Trust the wisdom emerging from your deepest self.`;
}

// Main interpretation function - local only, but feels incredibly intelligent
export function interpretDreamLocally(text: string, symbols: Symbol[]): Interpretation {
  if (!text.trim()) {
    throw new Error("Dream text cannot be empty");
  }

  const mainThemes = extractThemes(text);
  const matchedSymbols = findMatchedSymbols(text, symbols);
  const emotionalTone = analyzeEmotionalTone(text);

  const interpretation: Interpretation = {
    mainThemes,
    emotionalTone,
    symbols: matchedSymbols,
    personalInsight: generatePsychologicalInsight(mainThemes, matchedSymbols, text),
    guidance: generateGuidance(matchedSymbols, mainThemes),
    aiNarrative: generateNarrative(text, mainThemes, matchedSymbols),
    jungianAnalysis: generateJungianAnalysis(matchedSymbols, mainThemes),
    emotionalLayers: generateEmotionalLayers(text),
    shadowWork: generateShadowWork(matchedSymbols),
    growthOpportunities: generateGrowthOpportunities(mainThemes),
    followUpQuestions: generateFollowUpQuestions(matchedSymbols),
    spiritualDimension: generateSpiritualDimension(mainThemes)
  };

  return interpretation;
}

// Pattern analysis for multiple dreams
export function analyzeRecurringPatterns(interpretations: Interpretation[]): {
  insights: string[];
  symbolFreq: Record<string, number>;
  themeFreq: Record<string, number>;
  correlations: string[];
  trends: string[];
  emotionalPattern: string | null;
} {
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
  const insights: string[] = [];
  const trends: string[] = [];

  interpretations.forEach((interp) => {
    interp.symbols.forEach((s) => {
      const symbolKey = s.symbol.toLowerCase();
      symbolFreq[symbolKey] = (symbolFreq[symbolKey] || 0) + 1;
    });

    interp.mainThemes.forEach((t: string) => {
      themeFreq[t.toLowerCase()] = (themeFreq[t.toLowerCase()] || 0) + 1;
    });
  });

  const total = interpretations.length;

  // Analyze recurring symbols (20%+ frequency)
  const recurringSymbols = Object.entries(symbolFreq)
    .filter(([, count]) => count / total >= 0.2)
    .sort((a, b) => b[1] - a[1]);

  if (recurringSymbols.length > 0) {
    recurringSymbols.forEach(([symbol, count]) => {
      const percentage = Math.round((count / total) * 100);
      insights.push(
        `"${symbol}" appears in ${percentage}% of your dreams, representing a core theme in your subconscious.`,
      );
    });
  }

  // Analyze dominant themes
  const sortedThemes = Object.entries(themeFreq).sort((a, b) => b[1] - a[1]);
  const dominantTheme = sortedThemes[0];

  if (dominantTheme && dominantTheme[1] / total >= 0.4) {
    insights.push(
      `The theme of "${dominantTheme[0]}" dominates (${Math.round((dominantTheme[1] / total) * 100)}%), suggesting this area needs attention.`,
    );
  }

  // Detect emotional patterns
  let emotionalPattern: string | null = null;
  if (interpretations.length >= 3) {
    const recentEmotions = interpretations.slice(-3).map((i) => i.emotionalTone.toLowerCase());
    const hasAnxiety = recentEmotions.some((e) => e.includes("anxious") || e.includes("tension"));
    const hasJoy = recentEmotions.some((e) => e.includes("joy") || e.includes("uplifting"));

    if (hasAnxiety && !hasJoy) {
      emotionalPattern = "anxious";
      trends.push("Recent dreams show heightened anxiety. Consider stress management practices.");
    } else if (hasJoy && !hasAnxiety) {
      emotionalPattern = "positive";
      trends.push("Recent dreams reflect positive emotional states and growth.");
    } else if (hasAnxiety && hasJoy) {
      emotionalPattern = "mixed";
      trends.push("Dreams show emotional complexity, balancing growth with challenges.");
    }
  }

  return {
    insights,
    symbolFreq,
    themeFreq,
    correlations: [],
    trends,
    emotionalPattern,
  };
}