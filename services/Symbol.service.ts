'use server';

import { prisma } from '@/lib/prisma';
import { Symbol } from '@prisma/client'; 
import { revalidatePath } from 'next/cache';

export async function getSymbols(): Promise<Symbol[]> {
  const symbols = await prisma.symbol.findMany({
    orderBy: { key: 'asc' },
  });
  
  return symbols as Symbol[];
}

export async function getSymbol(id: number): Promise<Symbol | null> {
  const symbol = await prisma.symbol.findUnique({
    where: { id },
  });
  return symbol as Symbol | null;
}


export async function createSymbol(
  key: string,
  meaning: string,
  categoryId: number = 1 // fallback category
): Promise<Symbol> {
  if (!key.trim() || !meaning.trim()) {
    throw new Error('Key and meaning are required');
  }

  const existing = await prisma.symbol.findUnique({
    where: { key: key.toLowerCase().trim() },
  });

  if (existing) throw new Error('Symbol already exists');

  const symbol = await prisma.symbol.create({
    data: {
      key: key.toLowerCase().trim(),
      meaning: meaning.trim(),
      categoryId,
    },
  });

  revalidatePath('/');
  return symbol as Symbol;
}

export async function updateSymbol(
  id: number,
  key: string,
  meaning: string
): Promise<Symbol> {
  if (!key.trim() || !meaning.trim()) {
    throw new Error('Key and meaning are required');
  }

  const symbol = await prisma.symbol.update({
    where: { id },
    data: {
      key: key.toLowerCase().trim(),
      meaning: meaning.trim(),
    },
  });
  
  revalidatePath('/');
  
  return symbol as Symbol;
}

export async function deleteSymbol(id: number): Promise<void> {
  await prisma.symbol.delete({
    where: { id },
  });
  revalidatePath('/');
}

export async function searchSymbols(query: string): Promise<Symbol[]> {
  const symbols = await prisma.symbol.findMany({
    where: {
      OR: [
        { key: { contains: query, mode: 'insensitive' } },
        { meaning: { contains: query, mode: 'insensitive' } },
      ],
    },
    orderBy: { key: 'asc' },
  });
  
  return symbols as Symbol[];
}