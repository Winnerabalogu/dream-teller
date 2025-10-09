'use server';

import { prisma } from '@/lib/prisma';
import { Dream, Symbol, Interpretation } from '@/lib/types';
import { interpretDreamLocally } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';

export async function createDream(formData: FormData) {
  const text = formData.get('text') as string;
  if (!text.trim()) throw new Error('Dream text required');

  const symbols = await prisma.symbol.findMany();
  const typedSymbols = symbols as Symbol[];
  const interpretation = interpretDreamLocally(text, typedSymbols);

  const dream = await prisma.dream.create({
    data: {
      text,
      interpretation: interpretation as unknown as Prisma.InputJsonValue,
    },
    select: {
      id: true,
      date: true,
      text: true,
      interpretation: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  revalidatePath('/');
  return dream as unknown as Dream;
}

export async function deleteDream(id: string) {
  await prisma.dream.delete({ where: { id } });
  revalidatePath('/');
}

export async function getDream(id: string) {
  const dream = await prisma.dream.findUnique({
    where: { id },
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

export async function getDreams() {
  const dreams = await prisma.dream.findMany({
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

export async function searchDreams(query: string): Promise<Dream[]> {
  if (query.length < 2) return [];

  const dreams = await prisma.dream.findMany({
    where: {
      text: {
        contains: query,
        mode: 'insensitive',
      },
    },
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
  const dreams = await getDreams();
  const symbols = await getSymbols();
  return { dreams, symbols };
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
