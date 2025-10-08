/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client';
import chalk from 'chalk';

const prisma = new PrismaClient();

async function main() {
  console.log(chalk.blue('🌱 Starting dream database seeding...\n'));

  const categories = [
    { name: 'Common Dreams', description: 'Typical dream symbols experienced by most people.' },
    { name: 'Jungian Archetypes', description: 'Psychological symbols representing the unconscious mind.' },
    { name: 'Emotional Symbols', description: 'Dream elements that reflect emotional states or energy shifts.' },
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
    {
      key: 'flying',
      meaning:
        "Represents independence, freedom, or transcending limitations. May signal a desire to rise above life's challenges or express creativity.",
      categoryId: categoryMap['Common Dreams'],
      keywords: ['freedom', 'creativity', 'flight', 'control'],
      insight:
        "Psychologically, flying reflects empowerment and control. Spiritually, it may symbolize ascension or awakening.",
    },
    {
      key: 'falling',
      meaning:
        "Indicates anxiety, insecurity, or a loss of control in waking life. Often reflects fear of failure or instability.",
      categoryId: categoryMap['Emotional Symbols'],
      keywords: ['anxiety', 'loss', 'fear', 'instability'],
      insight:
        "Falling dreams appear when the dreamer feels unsupported or disconnected. They remind you to regain balance and trust the process.",
    },
    {
      key: 'shadow',
      meaning:
        "Embodies hidden or repressed aspects of yourself that you may fear or deny.",
      categoryId: categoryMap['Jungian Archetypes'],
      keywords: ['self', 'unconscious', 'repression', 'fear'],
      insight:
        "Carl Jung described the shadow as the unacknowledged self. Meeting your shadow in dreams is a step toward personal growth and integration.",
    },
    {
      key: 'snake',
      meaning:
        "Symbol of transformation, healing, or deceit. A common sign of deep change, renewal, or hidden threat.",
      categoryId: categoryMap['Common Dreams'],
      keywords: ['transformation', 'healing', 'deceit', 'energy'],
      insight:
        "Snakes shed their skin — a symbol of renewal. This dream may call you to embrace change or face hidden fears.",
    },
    {
      key: 'water',
      meaning:
        "Reflects emotions, intuition, and the subconscious mind. Calm water suggests peace; turbulent water implies emotional struggle.",
      categoryId: categoryMap['Emotional Symbols'],
      keywords: ['emotion', 'intuition', 'flow', 'subconscious'],
      insight:
        "Water is the symbol of life and feeling. It mirrors your inner state — clarity brings peace, chaos reveals resistance.",
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
