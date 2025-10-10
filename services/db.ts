'use server';

import { prisma } from '@/lib/prisma';
import { Dream, Symbol } from '@/lib/types';
import { interpretDreamLocally } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';
import { getServerSession } from '@/lib/auth';

async function getCurrentUser() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    throw new Error('Not authenticated');
  }
  
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  
  if (!user) {
    throw new Error('User not found');
  }
  
  return user;
}
// services/db.ts - Update the createDream function
export async function createDream(formData: FormData) {
  const text = formData.get('text') as string;
  if (!text.trim()) throw new Error('Dream text required');

  const user = await getCurrentUser();
  const symbols = await prisma.symbol.findMany();
  
  // Use the enhanced local interpretation
  const interpretation = interpretDreamLocally(text, symbols as Symbol[]);

  const dream = await prisma.dream.create({
    data: {
      text,
      userId: user.id,
      interpretation: interpretation as unknown as Prisma.InputJsonValue,
    },
    select: {
      id: true,
      date: true,
      text: true,
      interpretation: true,
      createdAt: true,
      updatedAt: true,
      userId: true,
    },
  });

  revalidatePath('/');
  return dream as unknown as Dream;
}
export async function deleteDream(id: string) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    throw new Error('Not authenticated');
  }
  
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  
  if (!user) {
    throw new Error('User not found');
  }

  return prisma.dream.delete({
    where: { id, userId: user.id },
  });
}
export async function getDream(id: string, userId: string) {
  const dream = await prisma.dream.findFirst({
    where: { id, userId },
    select: {
      id: true,
      date: true,
      text: true,
      interpretation: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return dream as unknown as Dream | null;
}

export async function getDreams(userId: string) {
  const dreams = await prisma.dream.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
    select: {
      id: true,
      date: true,
      text: true,
      interpretation: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return dreams as unknown as Dream[];
}

export async function searchDreams(query: string) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    throw new Error('Not authenticated');
  }
  
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  
  if (!user) {
    throw new Error('User not found');
  }

  return prisma.dream.findMany({
    where: {
      userId: user.id,
      text: {
        contains: query,
        mode: 'insensitive',
      },
    },
    orderBy: { date: 'desc' },
    take: 10,
  });
}
// FIX: updateSymbol now expects number ID (or undefined for new symbols)
export async function updateSymbol(
  id: number | undefined,
  key: string,
  meaning: string
) {
  if (!id) {
    // Create new symbol
    return prisma.symbol.create({
      data: { key, meaning, categoryId: 1 }, // Provide default categoryId
    });
  }
  // Update existing symbol
  return prisma.symbol.update({
    where: { id },
    data: { key, meaning },
  });
}

export async function getSymbols() {
  const symbols = await prisma.symbol.findMany();
  return symbols as Symbol[];
}

export async function exportDreamsData() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    throw new Error('Not authenticated');
  }
  
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  
  if (!user) {
    throw new Error('User not found');
  }

  const [dreams, symbols] = await Promise.all([
    prisma.dream.findMany({
      where: { userId: user.id },
      orderBy: { date: 'desc' },
    }),
    prisma.symbol.findMany({
      where: { userId:user.id },
    }),
  ]);

  return {
    dreams: dreams.map(d => ({
      ...d,
      date: d.date.toISOString(),
    })),
    symbols,
    exportDate: new Date().toISOString(),
    version: '1.0',
  };
}
export async function importDreamsData(data: {
  dreams: Dream[];
  symbols: Symbol[];
}) {
  // Upsert symbols
  for (const symbol of data.symbols) {
    await prisma.symbol.upsert({
      where: { id: symbol.id },
      update: {
        key: symbol.key,
        meaning: symbol.meaning,
        insight: symbol.insight ?? null,
      },
      create: {
        id: symbol.id,
        key: symbol.key,
        meaning: symbol.meaning,
        insight: symbol.insight ?? null,
        keywords: symbol.keywords ?? [],
        categoryId: symbol.categoryId ?? 1,
      },
    });
  }

  // Upsert dreams
  for (const dream of data.dreams) {
    await prisma.dream.upsert({
      where: { id: dream.id },
      update: {
        text: dream.text,
        interpretation: dream.interpretation as unknown as Prisma.InputJsonValue,
      },
      create: {
        id: dream.id,
        text: dream.text,
        interpretation: dream.interpretation as unknown as Prisma.InputJsonValue,
        date: dream.date,
      },
    });
  }

  revalidatePath('/');
}

export async function deleteSymbol(id: number) {
  await prisma.symbol.delete({ where: { id } });
  revalidatePath('/');
}
