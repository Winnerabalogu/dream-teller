// src/services/reflection.service.ts
import { prisma } from '@/lib/prisma';
import type { Reflection } from '@/lib/types';

export async function createReflection(dreamId: string, text: string) {
  return prisma.reflection.create({
    data: { dreamId, text },
  });
}

export async function getReflectionsForDream(dreamId: string) {
  return prisma.reflection.findMany({
    where: { dreamId },
    orderBy: { createdAt: 'desc' },
  });
}
