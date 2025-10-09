/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client';
import chalk from 'chalk';

const prisma = new PrismaClient();

async function main() {
  console.log(chalk.blue('🌱 Starting dream database seeding...\n'));

  const categories = [
    { name: 'Animals & Creatures', description: 'Living beings that appear in dreams - pets, wild animals, mythical creatures.' },
    { name: 'People & Relationships', description: 'Family, friends, strangers, romantic partners, authority figures.' },
    { name: 'Places & Structures', description: 'Houses, buildings, landscapes, cities, natural environments.' },
    { name: 'Actions & Experiences', description: 'Flying, falling, running, being chased, traveling, transforming.' },
    { name: 'Emotions & States', description: 'Fear, joy, anxiety, love, anger, confusion, peace.' },
    { name: 'Objects & Items', description: 'Vehicles, tools, clothing, technology, personal belongings.' },
    { name: 'Nature & Elements', description: 'Water, fire, earth, air, weather, seasons, natural phenomena.' },
    { name: 'Body & Physical', description: 'Body parts, health, injuries, nakedness, physical transformations.' },
    { name: 'Spiritual & Mystical', description: 'Angels, demons, gods, religious symbols, supernatural events.' },
    { name: 'Life Events', description: 'Birth, death, marriage, graduation, celebrations, losses.' },
    { name: 'Colors & Symbols', description: 'Specific colors, numbers, geometric shapes, universal symbols.' },
    { name: 'Archetypes', description: 'Shadow, anima/animus, hero, mentor, trickster, wise old person.' },
  ];

  console.log(chalk.cyan('➡️  Creating categories...'));
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
  }

  console.log(chalk.green('✅ Categories created successfully!\n'));

  const categoryMap = Object.fromEntries(
    (await prisma.category.findMany()).map((c:any) => [c.name, c.id])
  );

  const symbols = [
    // ===== ANIMALS & CREATURES =====
    {
      key: 'cat',
      meaning: "Represents independence, mystery, feminine energy, and intuition. White cats may symbolize purity or spiritual guidance. A cat wanting to live with you suggests new energy or aspect of yourself seeking integration.",
      categoryId: categoryMap['Animals & Creatures'],
      keywords: ['independence', 'feminine', 'intuition', 'mystery', 'autonomy'],
      insight: "Cats in dreams often represent your relationship with independence and boundaries. Rejecting a cat may indicate setting boundaries with aspects of yourself or others that demand your energy.",
    },
    {
      key: 'dog',
      meaning: "Symbolizes loyalty, friendship, protection, and unconditional love. May represent a trusted friend or your own faithful nature.",
      categoryId: categoryMap['Animals & Creatures'],
      keywords: ['loyalty', 'friendship', 'protection', 'trust'],
      insight: "Dogs often reflect relationships or your capacity for devotion. The dog's behavior mirrors emotional dynamics in your waking life.",
    },
    {
      key: 'snake',
      meaning: "Symbol of transformation, healing, wisdom, or hidden threat. Snakes shed skin representing renewal and rebirth.",
      categoryId: categoryMap['Animals & Creatures'],
      keywords: ['transformation', 'healing', 'renewal', 'wisdom', 'threat'],
      insight: "Snakes are powerful symbols of change. They may represent transformation you're undergoing or fear of the unknown.",
    },
    {
      key: 'bird',
      meaning: "Represents freedom, perspective, spiritual messages, and transcendence. Different birds carry unique meanings.",
      categoryId: categoryMap['Animals & Creatures'],
      keywords: ['freedom', 'perspective', 'spiritual', 'flight'],
      insight: "Birds connect earth and sky, matter and spirit. They often bring messages from your higher self.",
    },
    {
      key: 'spider',
      meaning: "Represents creativity, patience, feminine power, or feeling trapped. Spiders weave intricate webs symbolizing creation or entanglement.",
      categoryId: categoryMap['Animals & Creatures'],
      keywords: ['creativity', 'patience', 'feminine-power', 'entrapment', 'weaving'],
      insight: "Spiders can represent your creative power or feelings of being caught in a situation. The web you weave may trap or support you.",
    },
    {
      key: 'horse',
      meaning: "Symbolizes personal drive, freedom, sexual energy, or raw power. The horse's color and behavior reveal your relationship with these energies.",
      categoryId: categoryMap['Animals & Creatures'],
      keywords: ['power', 'freedom', 'drive', 'energy', 'passion'],
      insight: "Horses represent untamed life force. Riding a horse shows mastery; being chased by one suggests fleeing your own power.",
    },
    {
      key: 'bear',
      meaning: "Represents strength, protection, motherhood, or hibernation. Can symbolize fierce boundaries or the need for solitude.",
      categoryId: categoryMap['Animals & Creatures'],
      keywords: ['strength', 'protection', 'solitude', 'boundaries', 'motherhood'],
      insight: "Bears embody primal strength and the protective instinct. They may call you to defend your territory or rest deeply.",
    },
    {
      key: 'fish',
      meaning: "Symbolizes unconscious thoughts, fertility, abundance, or insights emerging from the emotional depths.",
      categoryId: categoryMap['Animals & Creatures'],
      keywords: ['unconscious', 'fertility', 'abundance', 'insights', 'emotion'],
      insight: "Fish swim in the waters of emotion and the unconscious. What surfaces from the depths holds valuable insight.",
    },
    {
      key: 'wolf',
      meaning: "Represents instinct, intelligence, pack loyalty, or the wild untamed self. Can indicate threat or guidance.",
      categoryId: categoryMap['Animals & Creatures'],
      keywords: ['instinct', 'intelligence', 'loyalty', 'wild', 'predator'],
      insight: "Wolves embody primal wisdom and social bonds. They teach about belonging while honoring your wild nature.",
    },
    {
      key: 'butterfly',
      meaning: "Classic symbol of transformation, rebirth, lightness, and the soul. Represents metamorphosis and spiritual evolution.",
      categoryId: categoryMap['Animals & Creatures'],
      keywords: ['transformation', 'rebirth', 'soul', 'metamorphosis', 'beauty'],
      insight: "Butterflies emerge from darkness transformed. You may be undergoing or ready for profound personal change.",
    },

    // ===== PEOPLE & RELATIONSHIPS =====
    {
      key: 'stranger',
      meaning: "May represent unknown aspects of yourself, new opportunities, or parts of your psyche seeking recognition.",
      categoryId: categoryMap['People & Relationships'],
      keywords: ['unknown', 'potential', 'aspects', 'unfamiliar'],
      insight: "Strangers in dreams often represent unexplored parts of yourself waiting to be discovered.",
    },
    {
      key: 'mother',
      meaning: "Represents nurturing, care, feminine wisdom, or your relationship with the maternal figure. Can reflect your own nurturing capacity.",
      categoryId: categoryMap['People & Relationships'],
      keywords: ['nurturing', 'care', 'feminine', 'wisdom', 'maternal'],
      insight: "The mother figure embodies unconditional love and care. Dreams of mothers often relate to self-nurturing.",
    },
    {
      key: 'father',
      meaning: "Symbolizes authority, protection, masculine energy, structure, or guidance. Reflects your relationship with authority.",
      categoryId: categoryMap['People & Relationships'],
      keywords: ['authority', 'protection', 'masculine', 'guidance', 'structure'],
      insight: "The father represents structure and authority. These dreams often relate to power dynamics in your life.",
    },
    {
      key: 'baby',
      meaning: "Symbolizes new beginnings, vulnerability, potential, or aspects of yourself that need nurturing.",
      categoryId: categoryMap['People & Relationships'],
      keywords: ['new-beginning', 'vulnerability', 'potential', 'care'],
      insight: "Babies represent new projects, ideas, or aspects of yourself that require attention and care.",
    },
    {
      key: 'lover',
      meaning: "Represents desire, intimacy, union of opposites, or integration of masculine/feminine energies within yourself.",
      categoryId: categoryMap['People & Relationships'],
      keywords: ['desire', 'intimacy', 'union', 'integration', 'passion'],
      insight: "Dream lovers often symbolize the integration of different aspects of yourself, not literal romantic predictions.",
    },
    {
      key: 'enemy',
      meaning: "Represents inner conflict, shadow aspects, or parts of yourself you're at war with. External conflicts mirror internal ones.",
      categoryId: categoryMap['People & Relationships'],
      keywords: ['conflict', 'shadow', 'opposition', 'inner-war'],
      insight: "Your dream enemy often represents an aspect of yourself you reject or fight against. Make peace within.",
    },

    // ===== PLACES & STRUCTURES =====
    {
      key: 'house',
      meaning: "Represents the self, psyche, or current state of mind. Different rooms symbolize different aspects of your life.",
      categoryId: categoryMap['Places & Structures'],
      keywords: ['self', 'psyche', 'structure', 'foundation'],
      insight: "Your dream house mirrors your inner world. Rooms represent different aspects: attic (mind), basement (unconscious), bedroom (intimacy).",
    },
    {
      key: 'door',
      meaning: "Symbolizes opportunities, transitions, boundaries, or barriers. Open doors invite new possibilities; closed doors suggest obstacles. Patching doors represents setting boundaries.",
      categoryId: categoryMap['Places & Structures'],
      keywords: ['opportunity', 'transition', 'boundary', 'barrier'],
      insight: "Doors represent thresholds between states of being. Patching or blocking a door suggests protecting your space or preventing unwanted changes.",
    },
    {
      key: 'bridge',
      meaning: "Represents transition, connection between two states, or a journey from one phase to another.",
      categoryId: categoryMap['Places & Structures'],
      keywords: ['transition', 'connection', 'journey', 'passage'],
      insight: "Bridges symbolize moving from one state to another. The bridge's condition reflects your confidence in this transition.",
    },
    {
      key: 'path',
      meaning: "Represents your life journey, direction, or choices ahead. The path's condition reflects your clarity.",
      categoryId: categoryMap['Places & Structures'],
      keywords: ['journey', 'direction', 'choice', 'guidance'],
      insight: "Paths show your sense of direction in life. Clear paths suggest clarity; overgrown paths indicate confusion.",
    },
    {
      key: 'school',
      meaning: "Represents learning, testing, social anxiety, or unfinished lessons. Often relates to feeling judged or evaluated.",
      categoryId: categoryMap['Places & Structures'],
      keywords: ['learning', 'testing', 'anxiety', 'evaluation', 'lessons'],
      insight: "School dreams often surface when you feel tested in life or have unfinished business from your past.",
    },
    {
      key: 'hospital',
      meaning: "Symbolizes healing, sickness, vulnerability, or the need for care. May indicate emotional wounds needing attention.",
      categoryId: categoryMap['Places & Structures'],
      keywords: ['healing', 'care', 'vulnerability', 'wounds', 'recovery'],
      insight: "Hospitals point to areas of your life requiring healing. What needs mending in your emotional or spiritual body?",
    },
    {
      key: 'forest',
      meaning: "Represents the unconscious mind, mystery, growth, or feeling lost. Dark forests suggest unknown territory; light forests invite exploration.",
      categoryId: categoryMap['Places & Structures'],
      keywords: ['unconscious', 'mystery', 'growth', 'lost', 'nature'],
      insight: "Forests symbolize the wild, untamed aspects of your psyche. Getting lost invites you to find your way within.",
    },
    {
      key: 'mountain',
      meaning: "Symbolizes challenges, goals, spiritual ascent, or obstacles to overcome. The summit represents achievement.",
      categoryId: categoryMap['Places & Structures'],
      keywords: ['challenge', 'goal', 'ascent', 'obstacle', 'achievement'],
      insight: "Mountains represent the journey toward your highest self. The climb is difficult, but the view from the top is worth it.",
    },
    {
      key: 'city',
      meaning: "Represents community, complexity, social life, or feeling overwhelmed by civilization. Can indicate connection or isolation.",
      categoryId: categoryMap['Places & Structures'],
      keywords: ['community', 'complexity', 'social', 'civilization', 'connection'],
      insight: "Cities reflect your relationship with society and community. Empty cities suggest loneliness; crowded ones may indicate overwhelm.",
    },

    // ===== ACTIONS & EXPERIENCES =====
    {
      key: 'flying',
      meaning: "Represents freedom, liberation, rising above challenges, and breaking free from limitations.",
      categoryId: categoryMap['Actions & Experiences'],
      keywords: ['freedom', 'liberation', 'transcendence', 'control'],
      insight: "Flying dreams indicate empowerment and the ability to overcome obstacles. How you fly reveals your sense of control.",
    },
    {
      key: 'falling',
      meaning: "Indicates loss of control, anxiety, insecurity, or fear of failure. May reflect feeling unsupported.",
      categoryId: categoryMap['Actions & Experiences'],
      keywords: ['anxiety', 'loss', 'fear', 'insecurity'],
      insight: "Falling dreams appear when you feel out of control. They invite you to identify where you need more support.",
    },
    {
      key: 'chased',
      meaning: "Being chased represents avoiding something in waking life - a fear, responsibility, emotion, or truth.",
      categoryId: categoryMap['Actions & Experiences'],
      keywords: ['avoidance', 'fear', 'anxiety', 'pursuit'],
      insight: "What chases you often represents what you're running from in life. Turn and face it to understand its message.",
    },
    {
      key: 'adopted',
      meaning: "Represents taking on new responsibilities, accepting new aspects of self, or nurturing something/someone.",
      categoryId: categoryMap['Actions & Experiences'],
      keywords: ['responsibility', 'acceptance', 'nurturing', 'integration'],
      insight: "Adoption dreams reflect your relationship with responsibility and care. They may indicate integrating new parts of yourself.",
    },
    {
      key: 'running',
      meaning: "Can indicate fleeing from fear, racing toward goals, or feeling rushed. Context reveals whether you're escaping or pursuing.",
      categoryId: categoryMap['Actions & Experiences'],
      keywords: ['fleeing', 'pursuit', 'escape', 'urgency', 'goals'],
      insight: "Running reveals your relationship with pressure and pursuit. Are you running toward something or away from it?",
    },
    {
      key: 'drowning',
      meaning: "Represents being overwhelmed by emotions, responsibilities, or situations. Feeling unable to cope or breathe.",
      categoryId: categoryMap['Actions & Experiences'],
      keywords: ['overwhelmed', 'emotion', 'suffocation', 'helplessness'],
      insight: "Drowning symbolizes emotional overwhelm. What in your life is pulling you under? You need support to surface.",
    },
    {
      key: 'climbing',
      meaning: "Symbolizes striving, ambition, effort toward goals, or spiritual ascent. The climb's difficulty reflects your challenges.",
      categoryId: categoryMap['Actions & Experiences'],
      keywords: ['ambition', 'effort', 'ascent', 'striving', 'goals'],
      insight: "Climbing shows your determination to rise. Steep climbs indicate significant challenges; easy ones suggest progress.",
    },
    {
      key: 'driving',
      meaning: "Represents control over your life direction, autonomy, or the journey toward goals. Who drives reveals who's in control.",
      categoryId: categoryMap['Actions & Experiences'],
      keywords: ['control', 'direction', 'autonomy', 'journey', 'navigation'],
      insight: "Driving dreams show how you navigate life. Being a passenger suggests surrendering control; losing control indicates anxiety.",
    },
    {
      key: 'fighting',
      meaning: "Represents inner conflict, struggle with external forces, or defending boundaries. Reveals what you're battling.",
      categoryId: categoryMap['Actions & Experiences'],
      keywords: ['conflict', 'struggle', 'defense', 'battle', 'resistance'],
      insight: "Fighting in dreams mirrors internal or external conflicts. What part of yourself or your life are you at war with?",
    },

    // ===== EMOTIONS & STATES =====
    {
      key: 'fear',
      meaning: "Direct experience of anxiety, threat, or dread. Points to unprocessed emotions or situations you're avoiding.",
      categoryId: categoryMap['Emotions & States'],
      keywords: ['anxiety', 'threat', 'dread', 'avoidance'],
      insight: "Fear in dreams amplifies what you're afraid to face in waking life. Face it in the dream to diminish its power.",
    },
    {
      key: 'joy',
      meaning: "Represents fulfillment, alignment, or connection to your authentic self. Indicates you're on the right path.",
      categoryId: categoryMap['Emotions & States'],
      keywords: ['fulfillment', 'alignment', 'authenticity', 'happiness'],
      insight: "Joyful dreams reflect inner harmony. Notice what brings joy in the dream to understand what nourishes your soul.",
    },
    {
      key: 'paralyzed',
      meaning: "Feeling stuck, unable to move or speak. Represents powerlessness, fear, or being frozen by indecision.",
      categoryId: categoryMap['Emotions & States'],
      keywords: ['stuck', 'powerlessness', 'frozen', 'indecision', 'helplessness'],
      insight: "Paralysis in dreams points to areas of life where you feel powerless. Reclaim your voice and agency.",
    },
    {
      key: 'lost',
      meaning: "Represents confusion, lack of direction, or disconnection from your path or identity.",
      categoryId: categoryMap['Emotions & States'],
      keywords: ['confusion', 'direction', 'disconnection', 'identity'],
      insight: "Being lost invites you to find your way back to yourself. What have you strayed from?",
    },

    // ===== OBJECTS & ITEMS =====
    {
      key: 'car',
      meaning: "Symbolizes personal autonomy, life direction, and how you navigate your journey. The car's condition reflects your state.",
      categoryId: categoryMap['Objects & Items'],
      keywords: ['autonomy', 'direction', 'navigation', 'journey', 'control'],
      insight: "Cars represent how you move through life. Breaking down suggests obstacles; speeding indicates lack of control.",
    },
    {
      key: 'phone',
      meaning: "Represents communication, connection, or messages trying to reach you. Broken phones suggest communication breakdown.",
      categoryId: categoryMap['Objects & Items'],
      keywords: ['communication', 'connection', 'messages', 'technology'],
      insight: "Phones symbolize your ability to connect. Who's calling? What message are you receiving or failing to receive?",
    },
    {
      key: 'mirror',
      meaning: "Symbolizes self-reflection, identity, or how you see yourself. What the mirror shows reveals your self-perception.",
      categoryId: categoryMap['Objects & Items'],
      keywords: ['reflection', 'identity', 'self-perception', 'truth'],
      insight: "Mirrors invite honest self-examination. Distorted reflections suggest misperception; clear ones indicate self-awareness.",
    },
    {
      key: 'key',
      meaning: "Represents solutions, access, unlocking potential, or secrets. Keys open what was closed.",
      categoryId: categoryMap['Objects & Items'],
      keywords: ['solution', 'access', 'unlocking', 'secrets', 'answers'],
      insight: "Keys symbolize having the answer you need. What door or understanding are you ready to unlock?",
    },
    {
      key: 'weapon',
      meaning: "Represents defense, aggression, power, or the ability to protect yourself. Can indicate feeling threatened.",
      categoryId: categoryMap['Objects & Items'],
      keywords: ['defense', 'aggression', 'power', 'protection', 'threat'],
      insight: "Weapons point to how you defend yourself. Are you protecting boundaries or attacking out of fear?",
    },
    {
      key: 'book',
      meaning: "Symbolizes knowledge, wisdom, life story, or lessons to learn. Opening a book invites new understanding.",
      categoryId: categoryMap['Objects & Items'],
      keywords: ['knowledge', 'wisdom', 'story', 'lessons', 'learning'],
      insight: "Books contain wisdom and stories. What are you ready to learn? What chapter of your life are you writing?",
    },

    // ===== NATURE & ELEMENTS =====
    {
      key: 'water',
      meaning: "Reflects emotions, subconscious mind, and intuition. Calm water indicates peace; turbulent water shows emotional turmoil.",
      categoryId: categoryMap['Nature & Elements'],
      keywords: ['emotion', 'subconscious', 'intuition', 'flow'],
      insight: "Water is the ultimate emotional symbol. Its state mirrors your emotional landscape.",
    },
    {
      key: 'fire',
      meaning: "Represents transformation, passion, purification, or destruction. Can indicate creative energy or anger.",
      categoryId: categoryMap['Nature & Elements'],
      keywords: ['transformation', 'passion', 'purification', 'energy'],
      insight: "Fire transforms everything it touches. It can purify or destroy, depending on how it's directed.",
    },
    {
      key: 'ocean',
      meaning: "Represents the vast unconscious mind, deep emotions, or the unknown. The ocean's depth symbolizes hidden feelings.",
      categoryId: categoryMap['Nature & Elements'],
      keywords: ['unconscious', 'depth', 'mystery', 'emotion'],
      insight: "The ocean represents the depths of your psyche. What lies beneath the surface holds profound wisdom.",
    },
    {
      key: 'rain',
      meaning: "Symbolizes emotional release, cleansing, renewal, or sadness. Can represent tears or blessings from above.",
      categoryId: categoryMap['Nature & Elements'],
      keywords: ['release', 'cleansing', 'renewal', 'sadness', 'blessing'],
      insight: "Rain washes clean and nourishes growth. What emotions need release? What needs washing away?",
    },
    {
      key: 'storm',
      meaning: "Represents emotional turmoil, conflict, dramatic change, or the release of pent-up energy.",
      categoryId: categoryMap['Nature & Elements'],
      keywords: ['turmoil', 'conflict', 'change', 'release', 'chaos'],
      insight: "Storms clear the air after building pressure. What emotional storm is brewing or passing through?",
    },
    {
      key: 'sun',
      meaning: "Symbolizes consciousness, clarity, vitality, masculine energy, or enlightenment. The sun illuminates truth.",
      categoryId: categoryMap['Nature & Elements'],
      keywords: ['consciousness', 'clarity', 'vitality', 'enlightenment', 'masculine'],
      insight: "The sun represents your conscious awareness and life force. It brings light to what was hidden.",
    },
    {
      key: 'moon',
      meaning: "Represents the unconscious, feminine energy, intuition, cycles, and hidden aspects of self.",
      categoryId: categoryMap['Nature & Elements'],
      keywords: ['unconscious', 'feminine', 'intuition', 'cycles', 'mystery'],
      insight: "The moon governs tides of emotion and the hidden realms. She reveals what darkness conceals.",
    },
    {
      key: 'earth',
      meaning: "Symbolizes grounding, stability, material reality, or connection to the physical body and nature.",
      categoryId: categoryMap['Nature & Elements'],
      keywords: ['grounding', 'stability', 'material', 'nature', 'foundation'],
      insight: "Earth represents solid ground beneath your feet. Do you feel grounded or uprooted?",
    },
    {
      key: 'wind',
      meaning: "Represents change, spirit, communication, or forces beyond your control. Wind carries messages and shifts energy.",
      categoryId: categoryMap['Nature & Elements'],
      keywords: ['change', 'spirit', 'communication', 'force', 'movement'],
      insight: "Wind symbolizes invisible forces that move through your life. Which way is the wind blowing?",
    },
    {
      key: 'tree',
      meaning: "Symbolizes growth, rootedness, family lineage, or connection between earth and heaven. Trees represent life itself.",
      categoryId: categoryMap['Nature & Elements'],
      keywords: ['growth', 'roots', 'lineage', 'connection', 'life'],
      insight: "Trees bridge earth and sky, roots and branches. They represent your growth and ancestral connections.",
    },

    // ===== BODY & PHYSICAL =====
    {
      key: 'teeth',
      meaning: "Often represents concerns about appearance, aging, powerlessness, or communication issues.",
      categoryId: categoryMap['Body & Physical'],
      keywords: ['anxiety', 'appearance', 'communication', 'power'],
      insight: "Teeth dreams often relate to how you present yourself to the world and your sense of personal power.",
    },
    {
      key: 'naked',
      meaning: "Represents vulnerability, exposure, authenticity, or fear of being seen for who you truly are.",
      categoryId: categoryMap['Body & Physical'],
      keywords: ['vulnerability', 'exposure', 'authenticity', 'fear'],
      insight: "Being naked in dreams reflects fears about being exposed or judged, or a desire for authentic expression.",
    },
    {
      key: 'blood',
      meaning: "Symbolizes life force, vitality, sacrifice, or family ties. Can represent energy loss or life essence.",
      categoryId: categoryMap['Body & Physical'],
      keywords: ['vitality', 'life-force', 'sacrifice', 'family', 'energy'],
      insight: "Blood represents your essential life energy. Where is it flowing? Where is it being lost?",
    },
    {
      key: 'eyes',
      meaning: "Represent perception, awareness, insight, or how you see the world. Closed eyes suggest denial; opened ones reveal truth.",
      categoryId: categoryMap['Body & Physical'],
      keywords: ['perception', 'awareness', 'insight', 'vision', 'truth'],
      insight: "Eyes symbolize your ability to see clearly. What are you seeing or refusing to see?",
    },
    {
      key: 'hair',
      meaning: "Symbolizes strength, vitality, sensuality, or personal power. Cutting hair represents change or loss of power.",
      categoryId: categoryMap['Body & Physical'],
      keywords: ['strength', 'vitality', 'sensuality', 'power', 'identity'],
      insight: "Hair represents your personal power and identity. Changes to hair symbolize transformation of self.",
    },

    // ===== SPIRITUAL & MYSTICAL =====
    {
      key: 'angel',
      meaning: "Represents divine guidance, protection, higher self, or messages from the spiritual realm.",
      categoryId: categoryMap['Spiritual & Mystical'],
      keywords: ['divine', 'guidance', 'protection', 'spiritual', 'messages'],
      insight: "Angels bring messages from higher consciousness. You're being guided and protected.",
    },
    {
      key: 'demon',
      meaning: "Represents shadow aspects, repressed emotions, or parts of yourself you fear or deny. Inner darkness seeking integration.",
      categoryId: categoryMap['Spiritual & Mystical'],
      keywords: ['shadow', 'fear', 'repression', 'darkness', 'integration'],
      insight: "Demons symbolize rejected parts of yourself. Face them to reclaim your wholeness.",
    },
    {
      key: 'light',
      meaning: "Symbolizes consciousness, enlightenment, truth, or divine presence. Light reveals what was hidden.",
      categoryId: categoryMap['Spiritual & Mystical'],
      keywords: ['consciousness', 'enlightenment', 'truth', 'divine', 'revelation'],
      insight: "Light represents awakening and clarity. What truth is being illuminated?",
    },
    {
      key: 'darkness',
      meaning: "Represents the unconscious, unknown, mystery, or fear. Can also symbolize the void of infinite potential.",
      categoryId: categoryMap['Spiritual & Mystical'],
      keywords: ['unconscious', 'unknown', 'mystery', 'fear', 'potential'],
      insight: "Darkness is not evil—it's the realm of mystery and potential. What awaits discovery in the dark?",
    },

    // ===== LIFE EVENTS =====
    {
      key: 'death',
      meaning: "Rarely literal; usually represents endings, transformation, or letting go of old patterns.",
      categoryId: categoryMap['Life Events'],
      keywords: ['ending', 'transformation', 'change', 'release'],
      insight: "Death in dreams is about transformation. Something is ending to make way for new growth.",
    },
    {
      key: 'birth',
      meaning: "Symbolizes new beginnings, creativity, potential, or bringing something new into being.",
      categoryId: categoryMap['Life Events'],
      keywords: ['beginning', 'creativity', 'potential', 'manifestation'],
      insight: "Birth represents the emergence of something new in your life. What are you birthing into existence?",
    },
    {
      key: 'wedding',
      meaning: "Represents union, commitment, integration of opposites, or merging different aspects of self.",
      categoryId: categoryMap['Life Events'],
      keywords: ['union', 'commitment', 'integration', 'partnership'],
      insight: "Weddings symbolize sacred union. What parts of yourself are coming together in harmony?",
    },
    {
      key: 'funeral',
      meaning: "Represents mourning, closure, honoring endings, or processing loss and grief.",
      categoryId: categoryMap['Life Events'],
      keywords: ['mourning', 'closure', 'endings', 'grief', 'honoring'],
      insight: "Funerals help you honor what's ending. What needs to be mourned and released?",
    },

    // ===== COLORS & SYMBOLS =====
    {
      key: 'white',
      meaning: "Symbolizes purity, innocence, new beginnings, clarity, or spiritual truth. White animals often carry divine messages.",
      categoryId: categoryMap['Colors & Symbols'],
      keywords: ['purity', 'innocence', 'clarity', 'spiritual'],
      insight: "White represents the purest form of something. A white cat suggests pure independence or spiritual feminine energy.",
    },
    {
      key: 'black',
      meaning: "Represents the unconscious, mystery, the void, or unknown potential. Can symbolize fear or infinite possibility.",
      categoryId: categoryMap['Colors & Symbols'],
      keywords: ['unconscious', 'mystery', 'void', 'potential', 'unknown'],
      insight: "Black contains all colors—it's the fertile void of infinite potential. What emerges from the darkness?",
    },
    {
      key: 'red',
      meaning: "Symbolizes passion, anger, vitality, life force, or primal energy. Red demands attention and action.",
      categoryId: categoryMap['Colors & Symbols'],
      keywords: ['passion', 'anger', 'vitality', 'energy', 'action'],
      insight: "Red is the color of life blood and passion. What is stirring your deepest energy?",
    },
    {
      key: 'blue',
      meaning: "Represents calm, truth, communication, spiritual awareness, or emotional depth.",
      categoryId: categoryMap['Colors & Symbols'],
      keywords: ['calm', 'truth', 'communication', 'spiritual', 'depth'],
      insight: "Blue is the color of sky and ocean—vast, deep, and truthful. It invites contemplation.",
    },
    {
      key: 'green',
      meaning: "Symbolizes growth, healing, nature, heart energy, or new life. Green is the color of renewal.",
      categoryId: categoryMap['Colors & Symbols'],
      keywords: ['growth', 'healing', 'nature', 'heart', 'renewal'],
      insight: "Green represents the heart and natural growth. What is growing and healing in your life?",
    },
    {
      key: 'circle',
      meaning: "Represents wholeness, completion, cycles, unity, or the mandala of self. Circles have no beginning or end.",
      categoryId: categoryMap['Colors & Symbols'],
      keywords: ['wholeness', 'completion', 'cycles', 'unity', 'infinity'],
      insight: "Circles symbolize the eternal cycle of life and your journey toward wholeness.",
    },

    // ===== ARCHETYPES =====
    {
      key: 'shadow',
      meaning: "Represents hidden, repressed, or denied aspects of yourself. Often appears as a dark figure or threatening presence.",
      categoryId: categoryMap['Archetypes'],
      keywords: ['repression', 'unconscious', 'integration', 'denied-self'],
      insight: "The shadow holds parts of yourself you've rejected. Acknowledging it leads to wholeness and integration.",
    },
    {
      key: 'hero',
      meaning: "Represents your quest for meaning, courage, and self-actualization. The hero's journey is your journey of becoming.",
      categoryId: categoryMap['Archetypes'],
      keywords: ['quest', 'courage', 'becoming', 'transformation'],
      insight: "The hero within calls you to adventure and transformation. What dragon are you being called to face?",
    },
    {
      key: 'wise-old-person',
      meaning: "Represents inner wisdom, guidance, or your higher self. Often appears as a sage, guru, or elder.",
      categoryId: categoryMap['Archetypes'],
      keywords: ['wisdom', 'guidance', 'higher-self', 'knowledge'],
      insight: "The wise one within holds the answers you seek. Listen to this inner voice of wisdom.",
    },
    {
      key: 'trickster',
      meaning: "Represents playfulness, chaos, transformation through disruption, or challenging rigid structures.",
      categoryId: categoryMap['Archetypes'],
      keywords: ['playfulness', 'chaos', 'disruption', 'transformation'],
      insight: "The trickster breaks rules to reveal truth. Sometimes chaos is needed to shatter illusions.",
    },
  ];

  console.log(chalk.cyan('➡️  Creating dream symbols...'));
  for (const s of symbols) {
    await prisma.symbol.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    });
  }

  console.log(chalk.green(`✅ Seeded ${symbols.length} dream symbols successfully!`));
  console.log(chalk.yellow('\n🌙 Dream insight database ready.\n'));
}

main()
  .catch((e) => {
    console.error(chalk.red('❌ Seeding failed:'), e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
