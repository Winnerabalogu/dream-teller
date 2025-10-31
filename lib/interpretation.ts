// lib/interpretation.ts - REFINED: Fuzzy matching, deduping, meta precision, seed integration
import type { Interpretation, Symbol } from "./types";

// ==================== REFINED: Cultural & Spiritual Context ====================
const CULTURAL_SYMBOLS: Record<string, Record<string, string>> = {
  nigerian: {
    kolanut: "Sacred symbol of hospitality, blessing, and spiritual cleansing. Breaking and sharing kola represents unity and divine favor.",
    nollywood: "Connection to Nigerian storytelling, dramatic expression, and cultural identity.",
    lodgeGovernor: "Authority figure in communal living, represents social dynamics and shared responsibility.",
    wrapper: "Traditional cloth representing cultural identity, femininity, and ancestral connection.",
    jollof: "Celebration, community, and cultural pride.",
  },
  spiritual: {
    virginMary: "Divine feminine, maternal protection, intercession, and spiritual guidance.",
    ghost: "Unfinished business, ancestral presence, or spiritual attachment needing resolution.",
    psychicPresence: "Spiritual awareness, sensitivity to unseen realms, or psychological boundaries.",
    latePerson: "Ancestral visitation, unresolved grief, or messages from the beyond.",
    bible: "Divine guidance, spiritual truth, and seeking higher wisdom.",
    prayer: "Connection to the divine, intention-setting, and spiritual communication.",
  }
};

// ==================== REFINED: Meta-Dream (Nested Only) ====================
const META_DREAM_INDICATORS = [
  'dream within a dream', 'dream that i dreamt', 'while dreaming also', 'still in a dream and', 'dreamt about dreaming'
]; // Stricter: Requires nesting, no false-pos on "I dreamt"

function detectMetaDream(text: string): boolean {
  const lowerText = text.toLowerCase();
  return META_DREAM_INDICATORS.some(indicator => lowerText.includes(indicator));
}

// ==================== REFINED: Emotional Intelligence (Synonym Boost) ====================
const EMOTIONAL_MARKERS = {
  joy: {
    keywords: ['happy', 'joy', 'feeling so happy', 'coordinating', 'chuckled', 'love', 'delighted', 'content'],
    intensity: ['very happy', 'so happy', 'extremely happy', 'overjoyed'],
  },
  anxiety: {
    keywords: ['afraid', 'scared', 'anxious', 'worried', 'negative', 'cursing', 'uneasy', 'dread'],
    intensity: ['terrified', 'panicking', 'overwhelmed'],
  },
  rejection: { // Boosted synonyms
    keywords: ["don't want", 'patching', 'blocking', 'refused', 'rejected', 'done with', 'no longer welcome', 'keep out', 'exclude'],
    intensity: ['desperately', 'forcefully', 'violently'],
  },
  peace: {
    keywords: ['calm', 'peaceful', 'serene', 'comfortable', 'safe', 'relaxed'],
    intensity: ['deeply peaceful', 'completely calm'],
  },
  confusion: {
    keywords: ['confused', 'strange', 'weird', 'didn\'t understand', 'baffled'],
    intensity: ['completely lost', 'utterly confused'],
  }
};

function analyzeEmotionalDepth(text: string): {
  primary: string;
  secondary: string[];
  intensity: 'mild' | 'moderate' | 'strong';
  complexity: string;
} {
  const lowerText = text.toLowerCase();
  const scores: Record<string, number> = {};
  let maxIntensity: 'mild' | 'moderate' | 'strong' = 'mild';

  Object.entries(EMOTIONAL_MARKERS).forEach(([emotion, markers]) => {
    let score = 0;
    markers.keywords.forEach(keyword => {
      if (lowerText.includes(keyword)) score += 1;
    });
    markers.intensity.forEach(intense => {
      if (lowerText.includes(intense)) {
        score += 2;
        maxIntensity = 'strong';
      }
    });
    if (score > 0) scores[emotion] = score;
  });

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primary = sorted[0]?.[0] || 'contemplative';
  const secondary = sorted.slice(1, 3).map(([emotion]) => emotion);

  if (sorted.length === 1) maxIntensity = 'mild';
  else if (sorted.length === 2) maxIntensity = 'moderate';
  else if (sorted.length >= 3) maxIntensity = 'strong';

  const complexity = sorted.length > 2 
    ? "Multiple conflicting emotions reveal deep psychological processing"
    : sorted.length === 2 
    ? "Dual emotional currents suggest internal dialogue"
    : "Single emotional tone indicates clarity of experience";

  return { primary, secondary, intensity: maxIntensity, complexity };
}

// ==================== REFINED: Advanced Theme Extraction (Fuzzy Keywords) ====================
function extractThemesAdvanced(text: string): {
  themes: string[];
  confidence: Record<string, number>;
  narrative: string;
} {
  const lowerText = text.toLowerCase();
  const themePatterns: Record<string, { keywords: string[]; weight: number }> = {
    'boundaries-autonomy': { // Fuzzy boost
      keywords: ['patching door', "don't want", 'blocking', 'closing', 'refused', 'rejected', 'fixing entrance', 'done with', 'no longer welcome'],
      weight: 0.9
    },
    'spiritual-cleansing': {
      keywords: ['kolanut', 'prayed', 'sugar', 'bathing water', 'cleanse', 'ritual', 'blessing'],
      weight: 0.95
    },
    'identity-fluidity': {
      keywords: ['i was', 'became', 'actress', 'man in this dream', 'transformed', 'embodying'],
      weight: 0.85
    },
    'ancestral-presence': {
      keywords: ['late', 'ghost', 'disappear', 'died', 'spirit'],
      weight: 0.9
    },
    'creativity-expression': {
      keywords: ['helped my creativity', 'love', 'talking', 'reading', 'interpreting'],
      weight: 0.7
    },
    'competition-achievement': {
      keywords: ['fast runners', 'collected', 'competition', 'chose the best'],
      weight: 0.75
    },
    'purification-renewal': {
      keywords: ['bathe', 'bathing', 'water', 'cleanse', 'washing'],
      weight: 0.8
    },
    'social-dynamics': {
      keywords: ['interview', 'coordinating', 'lodge governor', 'friend'],
      weight: 0.7
    },
    'sacred-feminine': {
      keywords: ['virgin mary', 'queen', 'lady', 'woman', 'mother'],
      weight: 0.85
    },
    'psychic-awareness': {
      keywords: ['psychic', 'presence', 'negative', 'felt', 'dreaming while dreaming'],
      weight: 0.9
    }
  };

  const detected: Record<string, number> = {};
  
  Object.entries(themePatterns).forEach(([theme, { keywords, weight }]) => {
    const matches = keywords.filter(keyword => lowerText.includes(keyword)).length;
    if (matches > 0) {
      detected[theme] = (matches / keywords.length) * weight;
    }
  });

  const sorted = Object.entries(detected)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  const themes = sorted.map(([theme]) => theme);
  const confidence = Object.fromEntries(sorted);

  const narrative = generateThematicNarrative(themes, confidence);

  return { themes, confidence, narrative };
}

function generateThematicNarrative(themes: string[], confidence: Record<string, number>): string {
  if (themes.length === 0) {
    return "A contemplative dream inviting deeper exploration of your inner landscape.";
  }

  const primary = themes[0];
  const narratives: Record<string, string> = {
    'boundaries-autonomy': "Your psyche is actively working through issues of personal boundaries and autonomy. The act of 'patching' or blocking entry suggests you're in a healthy phase of protecting your energy and space.",
    'spiritual-cleansing': "This dream reveals powerful spiritual work happening beneath consciousness. Ritual elements indicate your soul's desire for purification and divine connection.",
    'identity-fluidity': "Your consciousness is exploring different aspects of identity and perspective. The ability to inhabit different bodies and roles suggests psychological flexibility and growth.",
    'ancestral-presence': "The veil between worlds is thin in this dream. Ancestral energies or unresolved spiritual matters seek acknowledgment and peaceful resolution.",
    'creativity-expression': "Creative forces are actively flowing through your life. This dream affirms the importance of authentic expression and supportive relationships.",
    'competition-achievement': "Achievement and capability themes dominate. You're processing your relationship with competition, success, and personal excellence.",
    'purification-renewal': "Water and cleansing symbolism points to emotional and spiritual renewal. You're ready to wash away what no longer serves.",
    'social-dynamics': "Your relationships and social positioning are under review. Notice patterns of power, intimacy, and community connection.",
    'sacred-feminine': "Divine feminine energy is present and active. Maternal, creative, and intuitive forces seek integration and expression.",
    'psychic-awareness': "Heightened spiritual sensitivity is emerging. You're becoming more aware of subtle energies and multilayered reality."
  };

  return narratives[primary] || "A rich symbolic landscape invites deep contemplation.";
}

// ==================== REFINED: Cultural Context Detection ====================
function detectCulturalContext(text: string): {
  contexts: string[];
  insights: string[];
  culturalSymbols: Array<{ symbol: string; meaning: string }>;
} {
  const lowerText = text.toLowerCase();
  const contexts: string[] = [];
  const insights: string[] = [];
  const culturalSymbols: Array<{ symbol: string; meaning: string }> = [];

  // Check Nigerian cultural markers
  Object.entries(CULTURAL_SYMBOLS.nigerian).forEach(([key, meaning]) => {
    const searchKey = key.toLowerCase().replace(/([A-Z])/g, ' $1').trim();
    if (lowerText.includes(searchKey) || lowerText.includes(key.toLowerCase())) {
      if (!contexts.includes('Nigerian/West African')) {
        contexts.push('Nigerian/West African');
      }
      culturalSymbols.push({ 
        symbol: key.replace(/([A-Z])/g, ' $1').trim(), 
        meaning 
      });
    }
  });

  // Check spiritual markers
  Object.entries(CULTURAL_SYMBOLS.spiritual).forEach(([key, meaning]) => {
    const searchKey = key.toLowerCase().replace(/([A-Z])/g, ' $1').trim();
    if (lowerText.includes(searchKey) || lowerText.includes(key.toLowerCase())) {
      if (!contexts.includes('Spiritual/Religious')) {
        contexts.push('Spiritual/Religious');
      }
      culturalSymbols.push({ 
        symbol: key.replace(/([A-Z])/g, ' $1').trim(), 
        meaning 
      });
    }
  });

  // Generate insights based on detected cultural elements
  if (lowerText.includes('kolanut') || lowerText.includes('kola nut')) {
    insights.push("The kola nut ritual carries deep cultural significance - breaking it with prayer and sugar suggests blessing-work and spiritual preparation.");
  }

  if (lowerText.includes('nollywood') || lowerText.includes('tina mba')) {
    insights.push("Embodying a Nollywood actress suggests identifying with dramatic expression, cultural storytelling, and feminine power.");
  }

  if (lowerText.includes('virgin mary') || lowerText.includes('mary')) {
    insights.push("The Virgin Mary as 'Queen of Southern Souls' is a powerful personal interpretation - you're creating unique spiritual meaning.");
  }

  if (lowerText.includes('bible') || lowerText.includes('luke')) {
    insights.push("Specific biblical references (Luke 5-6) suggest spiritual guidance. Luke 6:5 relates to Sabbath wisdom and divine authority.");
  }

  if (lowerText.includes('ancient rome') || lowerText.includes('rome')) {
    contexts.push('Ancient/Classical');
    insights.push("Ancient Rome setting suggests themes of empire, competition, and historical power - you're processing ambition through classical lens.");
  }

  return { contexts, insights, culturalSymbols };
}

// ==================== REFINED: Symbol Matching with Context ====================
function findMatchedSymbolsAdvanced(
  text: string, 
  symbols: Symbol[]
): Array<{ symbol: string; meaning: string }> {
  const lowerText = text.toLowerCase();
  const words = lowerText.split(/\s+/);
  
  const matchedMap = new Map(); // Dedupe by key
  symbols.forEach(s => {
    const key = s.key.toLowerCase();
    let relevance = 0;
    
    if (lowerText.includes(key)) relevance = 1.0;
    else if (words.some(word => word.includes(key) || key.includes(word))) relevance = 0.6;
    else if (s.keywords?.some(kw => lowerText.includes(kw.toLowerCase()))) relevance = 0.4;
    
    if (relevance > 0 && !matchedMap.has(key)) {
      matchedMap.set(key, { 
        symbol: s.key.charAt(0).toUpperCase() + s.key.slice(1), 
        meaning: s.meaning + (s.insight ? ` Insight: ${s.insight}` : '') // Integrate seed insight
      });
    }
  });
  
  return Array.from(matchedMap.values()).sort((a, b) => a.symbol.localeCompare(b.symbol)).slice(0, 8);
}

// ==================== REFINED: Psychological Depth Analysis ====================
function generatePsychologicalDepth(
  themes: string[],
  emotional: ReturnType<typeof analyzeEmotionalDepth>,
  text: string
): {
  jungian: string;
  shadowWork: string;
  integration: string;
} {
  const isMetaDream = detectMetaDream(text);
  
  const jungian = isMetaDream
    ? "A dream within a dream represents the ego observing the unconscious observing itself - a rare glimpse of consciousness exploring its own depths. This meta-awareness suggests you're ready for profound psychological integration."
    : `The ${themes[0] || 'central'} theme activates archetypal energies in your psyche. Your unconscious is orchestrating these symbols to bring repressed or undeveloped aspects into conscious awareness.`;

  const shadowWork = emotional.primary === 'rejection' || emotional.primary === 'anxiety'
    ? "The rejection or anxiety in this dream points to shadow material - aspects of yourself or your life you're trying to keep out. What you resist persists. The dream invites you to examine what you're pushing away and why."
    : "Shadow elements appear subtly - notice what makes you uncomfortable or what you quickly dismiss. These carry keys to wholeness.";

  const integration = emotional.secondary.length > 1
    ? "The multiplicity of emotions suggests active integration work. You're not avoiding complexity - you're embracing the full spectrum of human experience. This is the path to psychological maturity."
    : "Clear emotional tone indicates you're processing this material cleanly. Trust the wisdom of your emotional responses.";

  return { jungian, shadowWork, integration };
}

// ==================== MAIN INTERPRETATION ENGINE ====================
export function interpretDreamLocally(text: string, symbols: Symbol[]): Interpretation {
  if (!text.trim()) {
    throw new Error("Dream text cannot be empty");
  }

  // Core analysis
  const emotional = analyzeEmotionalDepth(text);
  const thematic = extractThemesAdvanced(text);
  const cultural = detectCulturalContext(text);
  const matchedSymbols = findMatchedSymbolsAdvanced(text, symbols);
  const psychological = generatePsychologicalDepth(thematic.themes, emotional, text);
  const isMetaDream = detectMetaDream(text);

  // Combine cultural symbols with matched symbols (deduped)
  const allSymbolsMap = new Map();
  [...cultural.culturalSymbols, ...matchedSymbols].forEach(s => {
    const key = s.symbol.toLowerCase();
    if (!allSymbolsMap.has(key)) allSymbolsMap.set(key, s);
  });
  const allSymbols = Array.from(allSymbolsMap.values()).slice(0, 10);

  // Build emotional tone description
  const emotionalTone = `${emotional.intensity.charAt(0).toUpperCase() + emotional.intensity.slice(1)} ${emotional.primary} energy${emotional.secondary.length > 0 ? ` with undertones of ${emotional.secondary.join(' and ')}` : ''}. ${emotional.complexity}`;

  // Generate narrative
  const aiNarrative = [
    thematic.narrative,
    cultural.insights.length > 0 ? cultural.insights[0] : '',
    isMetaDream ? "The meta-dream structure adds profound depth - you're witnessing your own consciousness at work." : ''
  ].filter(Boolean).join(' ');

  // Personal insight combining everything
  const personalInsight = `${psychological.jungian} ${thematic.confidence[thematic.themes[0]] > 0.8 ? 'This theme appears with remarkable clarity.' : ''} ${cultural.insights.slice(1).join(' ')}`.trim();

  // Guidance
  const guidance = generateContextualGuidance(thematic.themes, emotional, cultural.contexts);

  // Spiritual dimension
  const spiritualDimension = cultural.contexts.includes('Spiritual/Religious') || cultural.contexts.includes('Nigerian/West African')
    ? "Strong spiritual and cultural currents flow through this dream. Honor the wisdom of your traditions while forging your own unique spiritual path."
    : "Even without overt spiritual symbols, this dream carries soul-level wisdom. What feels sacred in this experience?";

  const interpretation: Interpretation = {
    mainThemes: thematic.themes,
    emotionalTone,
    symbols: allSymbols,
    personalInsight,
    guidance,
    aiNarrative,
    jungianAnalysis: psychological.jungian,
    emotionalLayers: {
      surface: `${emotional.primary} as the immediate emotional response`,
      deeper: psychological.shadowWork,
      core: psychological.integration
    },
    shadowWork: psychological.shadowWork,
    growthOpportunities: generateGrowthOpportunities(thematic.themes, emotional),
    followUpQuestions: generateFollowUpQuestions(thematic.themes, allSymbols, emotional),
    spiritualDimension
  };

  return interpretation;
}

function generateContextualGuidance(
  themes: string[],
  emotional: ReturnType<typeof analyzeEmotionalDepth>,
  contexts: string[]
): string {
  const primary = themes[0];
  
  const guidanceMap: Record<string, string> = {
    'boundaries-autonomy': "Honor your need for boundaries. Journal about what you're protecting and why. This is healthy self-preservation.",
    'spiritual-cleansing': "Consider creating a personal cleansing ritual. Light a candle, take a mindful bath, or pray with intention. Your soul is calling for purification.",
    'identity-fluidity': "Explore different aspects of yourself through creative expression. Try writing from different perspectives or embodying different energies.",
    'ancestral-presence': "Light a candle for ancestors or those who've passed. Speak aloud what needs to be said. Create closure where needed.",
    'creativity-expression': "Feed your creative fire. What project or expression has been calling you? Support from loved ones amplifies creative power.",
    'psychic-awareness': "Ground yourself daily. Your sensitivity is increasing - protect your energy field with intention and boundaries."
  };

  let guidance = guidanceMap[primary] || "Sit with this dream's imagery. Let it speak to you without forcing meaning.";

  if (contexts.includes('Nigerian/West African')) {
    guidance += " Your cultural practices hold deep wisdom - trust indigenous spiritual technologies.";
  }

  if (emotional.intensity === 'strong') {
    guidance += " The emotional intensity signals importance - don't dismiss what feels overwhelming.";
  }

  return guidance;
}

function generateGrowthOpportunities(
  themes: string[],
  emotional: ReturnType<typeof analyzeEmotionalDepth>
): string[] {
  const opportunities: string[] = [
    "Practice naming your emotions as they arise throughout the day",
    "Create a dream journal specifically for recurring symbols and themes",
    "Explore the cultural or spiritual traditions referenced in your dreams"
  ];

  if (themes.includes('boundaries-autonomy')) {
    opportunities.push("Work on assertiveness and boundary-setting in waking life");
  }

  if (themes.includes('spiritual-cleansing')) {
    opportunities.push("Develop a regular spiritual or cleansing practice");
  }

  if (emotional.secondary.length > 1) {
    opportunities.push("Practice holding space for conflicting emotions without judgment");
  }

  return opportunities.slice(0, 4);
}

function generateFollowUpQuestions(
  themes: string[],
  symbols: Array<{ symbol: string; meaning: string }>,
  emotional: ReturnType<typeof analyzeEmotionalDepth>
): string[] {
  const questions: string[] = [];

  if (symbols.length > 0) {
    questions.push(`What does ${symbols[0].symbol.toLowerCase()} represent in your current life situation?`);
  }

  questions.push(`The ${emotional.primary} emotion - where else in your life are you feeling this?`);

  if (themes.includes('boundaries-autonomy')) {
    questions.push("What or who are you protecting yourself from right now?");
  }

  if (themes.includes('spiritual-cleansing') || themes.includes('ancestral-presence')) {
    questions.push("What spiritual or ancestral wisdom is seeking expression through you?");
  }

  questions.push("If this dream were a message from your wisest self, what would it be saying?");

  return questions.slice(0, 4);
}
export function analyzeRecurringPatterns(interpretations: Interpretation[]): {
  insights: string[];
  symbolFreq: Record<string, number>;
  themeFreq: Record<string, number>;
  correlations: string[];
  trends: string[];
  emotionalPattern: string | null;
} {
  if (!interpretations || interpretations.length === 0) { // FIXED: Null-safety
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

  interpretations.forEach((interp) => {
    interp.symbols.forEach((s) => {
      const key = s.symbol.toLowerCase();
      symbolFreq[key] = (symbolFreq[key] || 0) + 1;
    });

    interp.mainThemes.forEach((t: string) => {
      themeFreq[t] = (themeFreq[t] || 0) + 1;
    });
  });

  const total = interpretations.length;
  const insights: string[] = [];

  // Symbol analysis
  Object.entries(symbolFreq)
    .filter(([, count]) => count / total >= 0.2)
    .sort((a, b) => b[1] - a[1])
    .forEach(([symbol, count]) => {
      const pct = Math.round((count / total) * 100);
      insights.push(`"${symbol}" appears in ${pct}% of dreams - this is a core psychological motif for you`);
    });

  // Theme analysis
  const dominantTheme = Object.entries(themeFreq).sort((a, b) => b[1] - a[1])[0];
  if (dominantTheme && dominantTheme[1] / total >= 0.3) {
    insights.push(`${dominantTheme[0]} is a dominant life theme requiring conscious attention`);
  }

  // FIXED: Simple correlations (no void chain—build array first)
  const correlations: string[] = [];
  const symbolEntries = Object.entries(symbolFreq);
  const themeEntries = Object.entries(themeFreq);
  for (let i = 0; i < symbolEntries.length && correlations.length < 3; i++) { // Cap early
    const [symbol, symCount] = symbolEntries[i];
    for (let j = 0; j < themeEntries.length && correlations.length < 3; j++) {
      const [theme, themeCount] = themeEntries[j];
      if (symCount / total > 0.1 && themeCount / total > 0.1) {
        correlations.push(`${symbol} often co-occurs with ${theme}`);
      }
    }
  }

  return {
    insights,
    symbolFreq,
    themeFreq,
    correlations,
    trends: [], // Placeholder for future
    emotionalPattern: null
  };
}