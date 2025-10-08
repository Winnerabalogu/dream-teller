/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { prisma } from '@/lib/prisma';
import { Dream, Symbol } from '@/lib/types';
import { interpretDream, analyzeRecurringPatterns, sentimentScore } from '@/lib/interpretation';
import { revalidatePath } from 'next/cache';

/**
 * Create a new dream with local interpretation
 */
export async function createDream(text: string): Promise<Dream> {
  try {
    if (!text.trim()) {
      throw new Error('Dream text is required');
    }

    // Get all symbols for interpretation context
    const symbols = await prisma.symbol.findMany();
    const typedSymbols = symbols as Symbol[];

    // Generate interpretation locally
    const interpretation = interpretDream(text, typedSymbols);

    // Save to database
    const dream = await prisma.dream.create({
      data: {
        text: text.trim(),
        interpretation: interpretation as any,
      },
    });

    // Revalidate cache
    revalidatePath('/');
    revalidatePath('/patterns');

    return dream as unknown as Dream;
  } catch (error) {
    console.error('Error creating dream:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to create dream');
  }
}

/**
 * Fetch all dreams ordered by date
 */
export async function getDreams(): Promise<Dream[]> {
  try {
    const dreams = await prisma.dream.findMany({
      orderBy: { date: 'desc' },
    });

    return dreams as unknown as Dream[];
  } catch (error) {
    console.error('Error fetching dreams:', error);
    throw new Error('Failed to fetch dreams');
  }
}

/**
 * Fetch a single dream by ID
 */
export async function getDream(id: string): Promise<Dream | null> {
  try {
    const dream = await prisma.dream.findUnique({
      where: { id },
    });

    return dream as unknown as Dream | null;
  } catch (error) {
    console.error('Error fetching dream:', error);
    throw new Error('Failed to fetch dream');
  }
}

/**
 * Delete a dream by ID
 */
export async function deleteDream(id: string): Promise<void> {
  try {
    await prisma.dream.delete({
      where: { id },
    });

    revalidatePath('/');
    revalidatePath('/patterns');
  } catch (error) {
    console.error('Error deleting dream:', error);
    throw new Error('Failed to delete dream');
  }
}

/**
 * Search dreams by text or themes
 */
export async function searchDreams(query: string): Promise<Dream[]> {
  try {
    if (query.length < 2) {
      return [];
    }

    const dreams = await prisma.dream.findMany({
      where: {
        text: {
          contains: query,
          mode: 'insensitive',
        },
      },
      orderBy: { date: 'desc' },
    });

    return dreams as unknown as Dream[];
  } catch (error) {
    console.error('Error searching dreams:', error);
    throw new Error('Failed to search dreams');
  }
}

/**
 * Get all symbols (for interpretation context)
 */
export async function getSymbols(): Promise<Symbol[]> {
  try {
    const symbols = await prisma.symbol.findMany({
      orderBy: { key: 'asc' },
    });

    return symbols as Symbol[];
  } catch (error) {
    console.error('Error fetching symbols:', error);
    throw new Error('Failed to fetch symbols');
  }
}

/**
 * Export all dreams and symbols as JSON
 */
export async function exportDreamsData() {
  try {
    const dreams = await getDreams();
    const symbols = await getSymbols();

    return {
      dreams,
      symbols,
      exportDate: new Date().toISOString(),
      version: '1.0',
      metadata: {
        dreamCount: dreams.length,
        symbolCount: symbols.length,
      },
    };
  } catch (error) {
    console.error('Error exporting data:', error);
    throw new Error('Failed to export data');
  }
}

/**
 * Import dreams and symbols from exported JSON
 */
export async function importDreamsData(data: {
  dreams?: Dream[];
  symbols?: Symbol[];
}): Promise<{ success: boolean; imported: { dreams: number; symbols: number } }> {
  try {
    let dreamCount = 0;
    let symbolCount = 0;

    // Import dreams
    if (data.dreams && Array.isArray(data.dreams)) {
      for (const dream of data.dreams) {
        try {
          // Check if dream already exists
          const existing = await prisma.dream.findUnique({
            where: { id: dream.id },
          });

          if (!existing) {
            await prisma.dream.create({
              data: {
                id: dream.id,
                text: dream.text,
                date: new Date(dream.date),
                interpretation: dream.interpretation as any,
                createdAt: new Date(dream.createdAt),
                updatedAt: new Date(dream.updatedAt),
              },
            });
            dreamCount++;
          }
        } catch (err) {
          console.warn(`Failed to import dream ${dream.id}:`, err);
        }
      }
    }

    // Import symbols
    if (data.symbols && Array.isArray(data.symbols)) {
      for (const symbol of data.symbols) {
        try {
          // Ensure category exists
          let categoryId = symbol.categoryId || 1;
          const categoryExists = await prisma.category.findUnique({
            where: { id: categoryId },
          });

          if (!categoryExists) {
            const defaultCategory = await prisma.category.findFirst();
            if (defaultCategory) {
              categoryId = defaultCategory.id;
            }
          }

          // Upsert symbol
          await prisma.symbol.upsert({
            where: { key: symbol.key },
            update: {
              meaning: symbol.meaning,
              insight: symbol.insight,
            },
            create: {
              key: symbol.key,
              meaning: symbol.meaning,
              insight: symbol.insight,
              keywords: symbol.keywords || [],
              categoryId,
            },
          });
          symbolCount++;
        } catch (err) {
          console.warn(`Failed to import symbol ${symbol.key}:`, err);
        }
      }
    }

    revalidatePath('/');
    revalidatePath('/patterns');

    return {
      success: true,
      imported: { dreams: dreamCount, symbols: symbolCount },
    };
  } catch (error) {
    console.error('Error importing data:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to import data'
    );
  }
}

/**
 * Get insights and patterns from dreams
 */
export async function getDreamInsights() {
  try {
    const dreams = await getDreams();
    const interpretations = dreams.map(d => d.interpretation);

    const analysis = analyzeRecurringPatterns(interpretations);
    const sentimentTrend = dreams.map(d => ({
      date: d.date,
      score: sentimentScore(
        (d.interpretation?.personalInsight || '') +
        ' ' +
        (d.interpretation?.emotionalTone || '')
      ),
    }));

    return {
      ...analysis,
      sentimentTrend,
    };
  } catch (error) {
    console.error('Error getting insights:', error);
    throw new Error('Failed to get insights');
  }
}