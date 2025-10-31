/* eslint-disable @typescript-eslint/no-require-imports */
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
    { name: 'Cultural & Traditional', description: 'Cultural practices, traditional symbols, indigenous wisdom.' },
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
      meaning: "Represents independence, mystery, feminine energy, and intuition. White cats may symbolize purity or spiritual guidance. A cat wanting to live with you suggests new energy or aspect of yourself seeking integration, while rejecting a cat indicates healthy boundary-setting.",
      categoryId: categoryMap['Animals & Creatures'],
      keywords: ['independence', 'feminine', 'intuition', 'mystery', 'autonomy', 'boundaries', 'white', 'feline', 'pet'], // + synonyms
      insight: "Cats often mirror your intuitive side—gentle persistence suggests untapped feminine wisdom.",
    },
    {
      key: 'dog',
      meaning: "Symbolizes loyalty, friendship, protection, and unconditional love. May represent a trusted friend or your own faithful nature.",
      categoryId: categoryMap['Animals & Creatures'],
      keywords: ['loyalty', 'friendship', 'protection', 'trust', 'faithful', 'companion'],
      insight: "Dogs often reflect relationships or your capacity for devotion. The dog's behavior mirrors emotional dynamics in your waking life.",
    },
    {
      key: 'snake',
      meaning: "Symbol of transformation, healing, wisdom, or hidden threat. Snakes shed skin representing renewal and rebirth.",
      categoryId: categoryMap['Animals & Creatures'],
      keywords: ['transformation', 'healing', 'renewal', 'wisdom', 'threat', 'serpent', 'shedding'],
      insight: "Snakes are powerful symbols of change. They may represent transformation you're undergoing or fear of the unknown.",
    },
    {
      key: 'bird',
      meaning: "Represents freedom, perspective, spiritual messages, and transcendence. Different birds carry unique meanings.",
      categoryId: categoryMap['Animals & Creatures'],
      keywords: ['freedom', 'perspective', 'spiritual', 'flight', 'wings', 'soaring'],
      insight: "Birds connect earth and sky, matter and spirit. They often bring messages from your higher self.",
    },

    // ===== PEOPLE & RELATIONSHIPS =====
    {
      key: 'stranger',
      meaning: "May represent unknown aspects of yourself, new opportunities, or parts of your psyche seeking recognition.",
      categoryId: categoryMap['People & Relationships'],
      keywords: ['unknown', 'potential', 'aspects', 'unfamiliar', 'foreigner', 'newcomer'],
      insight: "Strangers in dreams often represent unexplored parts of yourself waiting to be discovered.",
    },
    {
      key: 'mother',
      meaning: "Represents nurturing, care, feminine wisdom, or your relationship with the maternal figure. Can reflect your own nurturing capacity.",
      categoryId: categoryMap['People & Relationships'],
      keywords: ['nurturing', 'care', 'feminine', 'wisdom', 'maternal', 'mom', 'caretaker'],
      insight: "The mother figure embodies unconditional love and care. Dreams of mothers often relate to self-nurturing.",
    },
    {
      key: 'father',
      meaning: "Symbolizes authority, protection, masculine energy, structure, or guidance. Reflects your relationship with authority. Cursing a father figure may represent releasing old patterns or rejecting oppressive authority.",
      categoryId: categoryMap['People & Relationships'],
      keywords: ['authority', 'protection', 'masculine', 'guidance', 'structure', 'conflict', 'dad', 'patriarch'],
      insight: "The father represents structure and authority. Dreams of cursing or confronting a father figure often indicate breaking free from limiting beliefs or oppressive patterns.",
    },
    {
      key: 'boyfriend',
      meaning: "Represents romantic relationship, partnership, support, or your animus (inner masculine). Dream interviews suggest examining the relationship with curiosity.",
      categoryId: categoryMap['People & Relationships'],
      keywords: ['romance', 'partnership', 'support', 'masculine', 'interview', 'creativity', 'partner', 'lover'],
      insight: "Dreams about partners often reveal what you value most in relationships. Loving someone for supporting your creativity shows you prioritize growth and expression.",
    },
    {
      key: 'actress',
      meaning: "Represents performance, identity, dramatic expression, and taking on roles. Nigerian actresses like Tina Mba carry cultural significance and storytelling power.",
      categoryId: categoryMap['People & Relationships'],
      keywords: ['performance', 'identity', 'expression', 'nollywood', 'dramatic', 'cultural', 'role', 'performer'],
      insight: "Becoming an actress in a dream suggests exploring different aspects of identity or stepping into a more expressive, performative role in life.",
    },
    {
      key: 'deceased',
      meaning: "Represents ancestral presence, unfinished business, messages from beyond, or unresolved grief. Visitations carry spiritual significance.",
      categoryId: categoryMap['People & Relationships'],
      keywords: ['ancestor', 'spirit', 'grief', 'visitation', 'message', 'late', 'passed', 'ghostly'],
      insight: "Dreams of deceased people, especially neighbors or relatives, often bring messages or indicate spiritual activity. Their appearance and actions hold meaning.",
    },

    // ===== PLACES & STRUCTURES =====
    {
      key: 'house',
      meaning: "Represents the self, psyche, or current state of mind. Different rooms symbolize different aspects of your life.",
      categoryId: categoryMap['Places & Structures'],
      keywords: ['self', 'psyche', 'structure', 'foundation', 'home', 'dwelling'],
      insight: "Your dream house mirrors your inner world. Rooms represent different aspects: attic (mind), basement (unconscious), bedroom (intimacy).",
    },
    {
      key: 'door',
      meaning: "Symbolizes opportunities, transitions, boundaries, or barriers. Patching doors represents setting boundaries and protecting your space from unwanted energy or influences.",
      categoryId: categoryMap['Places & Structures'],
      keywords: ['opportunity', 'transition', 'boundary', 'barrier', 'protection', 'patching', 'entrance', 'threshold'],
      insight: "Doors represent thresholds between states of being. Patching or blocking a door shows active boundary-work - you're choosing what enters your life.",
    },
    {
      key: 'bathroom',
      meaning: "Represents cleansing, privacy, release, and self-care. Choosing the best bathroom suggests self-worth and selecting what's right for you.",
      categoryId: categoryMap['Places & Structures'],
      keywords: ['cleansing', 'privacy', 'release', 'bathing', 'purification', 'washroom', 'toilet'],
      insight: "Bathrooms are sacred spaces of purification and release. Dreams of bathing often indicate emotional or spiritual cleansing.",
    },
    {
      key: 'lodge',
      meaning: "Represents communal living, shared space, student life, or social dynamics. Lodge governors symbolize informal authority.",
      categoryId: categoryMap['Places & Structures'],
      keywords: ['communal', 'shared', 'social', 'authority', 'governor', 'community', 'dorm', 'residence'],
      insight: "Lodge dreams reflect your relationship with community and shared responsibility. Informal social interactions reveal comfort with authority.",
    },
    {
      key: 'ancient-rome',
      meaning: "Represents classical power, historical context, competition, empire, and ambition through an ancient lens.",
      categoryId: categoryMap['Places & Structures'],
      keywords: ['ancient', 'classical', 'competition', 'empire', 'history', 'running', 'roman', 'coliseum'],
      insight: "Ancient Rome settings suggest processing themes of power, achievement, and competition through archetypal historical imagery.",
    },

    // ===== ACTIONS & EXPERIENCES =====
    {
      key: 'bathing',
      meaning: "Symbolizes purification, cleansing, renewal, and washing away old energy. Ritual bathing with kolanut and sugar represents spiritual cleansing.",
      categoryId: categoryMap['Actions & Experiences'],
      keywords: ['cleansing', 'purification', 'renewal', 'ritual', 'water', 'washing', 'shower', 'soak'],
      insight: "Bathing dreams indicate emotional or spiritual cleansing. Ritual elements like kolanut water suggest deep cultural and spiritual purification work.",
    },
    {
      key: 'running',
      meaning: "Can indicate competition, pursuing goals, collecting items, or demonstrating capability. Context reveals whether you're competing or fleeing.",
      categoryId: categoryMap['Actions & Experiences'],
      keywords: ['competition', 'pursuit', 'collecting', 'speed', 'capability', 'racing', 'jogging', 'chase'],
      insight: "Running in competitive contexts shows your relationship with achievement and capability. Fast running suggests confidence in your abilities.",
    },
    {
      key: 'reading',
      meaning: "Symbolizes seeking wisdom, studying scripture, learning lessons, or spiritual guidance. Reading with others suggests shared spiritual journey.",
      categoryId: categoryMap['Actions & Experiences'],
      keywords: ['wisdom', 'learning', 'scripture', 'bible', 'study', 'spiritual', 'book', 'text'],
      insight: "Reading dreams indicate seeking knowledge or guidance. Biblical reading suggests looking for divine direction or spiritual truth.",
    },
    {
      key: 'coordinating',
      meaning: "Represents leadership, organizing others, taking charge, and feeling capable. Often accompanied by joy and confidence.",
      categoryId: categoryMap['Actions & Experiences'],
      keywords: ['leadership', 'organizing', 'capable', 'directing', 'managing', 'leading', 'planning'],
      insight: "Coordinating others in dreams reveals your leadership abilities and comfort with responsibility. Joy while coordinating shows natural leadership.",
    },
    {
      key: 'cursing',
      meaning: "Represents releasing anger, breaking free from oppression, rejecting negative patterns, or speaking truth to power.",
      categoryId: categoryMap['Actions & Experiences'],
      keywords: ['anger', 'release', 'rejection', 'liberation', 'speaking-out', 'swearing', 'profanity'],
      insight: "Cursing someone in a dream often represents releasing pent-up anger or rejecting their influence. It's a form of boundary-setting and liberation.",
    },
    {
      key: 'interview',
      meaning: "Represents examination, curiosity, questioning relationships, or seeking to understand deeper dynamics.",
      categoryId: categoryMap['Actions & Experiences'],
      keywords: ['questioning', 'curiosity', 'examination', 'understanding', 'relationship', 'query', 'probe'],
      insight: "Interviewing someone in a dream suggests examining that relationship or aspect of yourself with detached curiosity.",
    },
    {
      key: 'fetching-water',
      meaning: "Represents gathering resources, emotional labor, community service, or connecting with life's essentials. Barefoot walking shows groundedness.",
      categoryId: categoryMap['Actions & Experiences'],
      keywords: ['gathering', 'resources', 'community', 'service', 'barefoot', 'grounded', 'drawing', 'carrying'],
      insight: "Fetching water barefoot combines practical service with spiritual grounding. Feeling happy while doing this shows joy in simple, essential acts.",
    },

    // ===== SPIRITUAL & MYSTICAL =====
    {
      key: 'virgin-mary',
      meaning: "Represents divine feminine, maternal protection, spiritual intercession, and sacred guidance. Personal interpretations hold power.",
      categoryId: categoryMap['Spiritual & Mystical'],
      keywords: ['divine', 'feminine', 'maternal', 'sacred', 'queen', 'spiritual', 'mary', 'madonna'],
      insight: "The Virgin Mary appears as a powerful spiritual symbol. Interpreting her as 'Queen of Southern Souls' shows personal spiritual creativity and unique understanding.",
    },
    {
      key: 'ghost',
      meaning: "Represents spiritual entities, unfinished business, or souls that haven't moved on. Marriage to ghosts indicates spiritual attachment.",
      categoryId: categoryMap['Spiritual & Mystical'],
      keywords: ['spirit', 'entity', 'attachment', 'unfinished', 'supernatural', 'phantom', 'specter'],
      insight: "Ghost dreams often indicate spiritual attachments or unresolved connections. Marrying a ghost suggests a deep spiritual bond needing cleansing.",
    },
    {
      key: 'psychic-presence',
      meaning: "Represents spiritual sensitivity, unseen forces, energy awareness, or encounters with non-physical entities. Can be positive or negative.",
      categoryId: categoryMap['Spiritual & Mystical'],
      keywords: ['psychic', 'energy', 'sensitivity', 'unseen', 'spiritual', 'awareness', 'vibe', 'aura'],
      insight: "Feeling a psychic presence indicates heightened spiritual sensitivity. Negative presences suggest energy you need to clear or protect against.",
    },
    {
      key: 'bible',
      meaning: "Represents divine guidance, spiritual truth, sacred text, and seeking wisdom from higher sources. Specific chapters carry meaning.",
      categoryId: categoryMap['Spiritual & Mystical'],
      keywords: ['scripture', 'guidance', 'divine', 'wisdom', 'luke', 'spiritual', 'holy book', 'verse'],
      insight: "Biblical references in dreams suggest seeking spiritual guidance. Luke 6:5 specifically addresses divine authority and Sabbath wisdom.",
    },
    {
      key: 'prayer',
      meaning: "Represents spiritual communication, intention-setting, blessing work, and connection with the divine.",
      categoryId: categoryMap['Spiritual & Mystical'],
      keywords: ['spiritual', 'blessing', 'intention', 'divine', 'communication', 'invoke', 'supplicate'],
      insight: "Prayer in dreams indicates active spiritual work. Praying with kolanut represents cultural and spiritual blessing practices.",
    },

    // ===== CULTURAL & TRADITIONAL =====
    {
      key: 'kolanut',
      meaning: "Sacred Nigerian symbol of hospitality, blessing, spiritual cleansing, and divine favor. Breaking and sharing kola represents unity. Praying with kolanut and adding sugar amplifies blessing work.",
      categoryId: categoryMap['Cultural & Traditional'],
      keywords: ['blessing', 'sacred', 'ritual', 'nigerian', 'spiritual', 'cleansing', 'prayer', 'sugar', 'kola', 'nut'],
      insight: "Kolanut rituals are powerful cultural and spiritual practices. Breaking it, praying over it, adding sugar, and using it in bath water represents deep blessing and purification work.",
    },
    {
      key: 'nollywood',
      meaning: "Represents Nigerian cinema, cultural storytelling, dramatic expression, and identifying with cultural narratives and icons.",
      categoryId: categoryMap['Cultural & Traditional'],
      keywords: ['nigerian', 'cinema', 'cultural', 'storytelling', 'actress', 'expression', 'film', 'drama'],
      insight: "Nollywood dreams connect you to cultural identity and dramatic expression. Embodying a Nollywood actress suggests embracing cultural storytelling power.",
    },
    {
      key: 'cctv-camera',
      meaning: "Represents being watched, surveillance, accountability, or witnesses to your actions. Can indicate self-consciousness.",
      categoryId: categoryMap['Objects & Items'],
      keywords: ['watching', 'surveillance', 'witness', 'accountability', 'observed', 'security', 'monitor'],
      insight: "CCTV cameras in dreams suggest feeling watched or accountable. Cursing someone in front of a camera indicates not caring who witnesses your truth.",
    },

    // ===== NATURE & ELEMENTS =====
    {
      key: 'water',
      meaning: "Reflects emotions, subconscious mind, and intuition. Water bodies can be spoken to, representing communication with emotions. Bathing water with ritual items brings spiritual cleansing.",
      categoryId: categoryMap['Nature & Elements'],
      keywords: ['emotion', 'subconscious', 'intuition', 'cleansing', 'bathing', 'ritual', 'flow', 'stream'],
      insight: "Water is the ultimate emotional and spiritual symbol. Speaking to water or using it ritually shows deep spiritual intelligence and emotional awareness.",
    },

    // ===== OBJECTS & ITEMS =====
    {
      key: 'stainless-plate',
      meaning: "Represents collecting rewards, gathering resources, durability, and success in competition. Metal plates suggest lasting value.",
      categoryId: categoryMap['Objects & Items'],
      keywords: ['reward', 'collection', 'durability', 'success', 'prize', 'metal', 'dish'],
      insight: "Collecting a stainless plate in competition suggests gathering lasting rewards and demonstrating capability.",
    },
    {
      key: 'phone',
      meaning: "Represents communication, connection, shared experiences, or messages. Watching things together suggests intimacy.",
      categoryId: categoryMap['Objects & Items'],
      keywords: ['communication', 'connection', 'sharing', 'intimacy', 'technology', 'mobile', 'call'],
      insight: "Phones in dreams symbolize connection. Watching something together on a phone represents shared interests and intimate moments.",
    },

    // ===== COLORS & SYMBOLS =====
    {
      key: 'white',
      meaning: "Symbolizes purity, innocence, new beginnings, clarity, or spiritual truth. White animals often carry divine messages or represent pure spiritual qualities.",
      categoryId: categoryMap['Colors & Symbols'],
      keywords: ['purity', 'innocence', 'clarity', 'spiritual', 'divine', 'blank', 'light'],
      insight: "White represents the purest form of something. A white cat suggests pure independence, spiritual feminine energy, or divine feminine guidance seeking your attention.",
    },
    {
      key: 'sugar',
      meaning: "Represents sweetness, blessing amplification, making things palatable, and enhancing spiritual work. Adding sugar to ritual items increases their positive power.",
      categoryId: categoryMap['Colors & Symbols'],
      keywords: ['sweetness', 'blessing', 'amplification', 'enhancement', 'positive', 'sweet', 'granulated'],
      insight: "Sugar in spiritual contexts amplifies blessings. Adding it to kolanut or bath water sweetens and strengthens the ritual's positive effects.",
    },

    // ===== EMOTIONS & STATES =====
    {
      key: 'happy',
      meaning: "Direct experience of joy, fulfillment, and alignment. Feeling happy while performing tasks shows natural fit and soul satisfaction.",
      categoryId: categoryMap['Emotions & States'],
      keywords: ['joy', 'fulfillment', 'alignment', 'satisfaction', 'contentment', 'glad', 'pleased'],
      insight: "Happiness in dreams reveals what truly fulfills you. Notice what activities bring joy - these point to your authentic path.",
    },
    {
      key: 'afraid',
      meaning: "Direct experience of fear, threat, or dread. Being collectively afraid indicates shared awareness of spiritual or psychological reality.",
      categoryId: categoryMap['Emotions & States'],
      keywords: ['fear', 'threat', 'collective', 'awareness', 'dread', 'scare', 'panic'],
      insight: "Fear in dreams amplifies what you're afraid to face. Shared fear with others suggests collective acknowledgment of spiritual truths.",
    },

    // ===== ARCHETYPES =====
    {
      key: 'shadow',
      meaning: "Represents hidden, repressed, or denied aspects of yourself. Often appears as a dark figure or threatening presence.",
      categoryId: categoryMap['Archetypes'],
      keywords: ['repression', 'unconscious', 'integration', 'denied-self', 'dark', 'hidden'],
      insight: "The shadow holds parts of yourself you've rejected. Acknowledging it leads to wholeness and integration.",
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

  // Seed default user
  console.log(chalk.cyan('\n➡️  Creating default user...'));
  const bcrypt = require('bcryptjs');
  const hashedPassword = await bcrypt.hash('password123', 12);

  await prisma.user.upsert({
    where: { email: 'aeterna@dream.com' },
    update: {},
    create: {
      email: 'aeterna@dream.com',
      password: hashedPassword,
      name: 'Aeterna',
      starSign: 'Pisces',
      spiritType: 'Water',
      energyType: 'Intuitive',
      birthDate: new Date('1990-03-15'),
    },
  });

  console.log(chalk.green('✅ Default user created successfully!'));
  console.log(chalk.blue('   📧 Email: aeterna@dream.com'));
  console.log(chalk.blue('   🔑 Password: password123'));
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