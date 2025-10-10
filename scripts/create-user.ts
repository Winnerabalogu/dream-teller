import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Creating user...');

  const hashedPassword = await hash('password123', 12);

  const user = await prisma.user.upsert({
    where: { email: 'aeterna@dream.com' },
    update: {
      password: hashedPassword,
    },
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

  console.log('✅ User created/updated:');
  console.log('   📧 Email:', user.email);
  console.log('   👤 Name:', user.name);
  console.log('   🔑 Password: password123');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
