// src/app/api/interpret/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { interpretDreamLocally } from '@/lib/interpretation';
import { getSymbols } from '@/services/db';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
export const runtime = "nodejs"
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { text } = body;

    if (!text || typeof text !== 'string' || !text.trim()) {
      return NextResponse.json(
        { error: 'Dream text is required' },
        { status: 400 }
      );
    }

    // Get user's personal symbols
    const symbols = await getSymbols();

    // Use local interpretation (fast & reliable)
    const interpretation = interpretDreamLocally(text, symbols);

    // Store dream with interpretation
    const dream = await prisma.dream.create({
      data: {
        userId: user.id,
        text,
        interpretation: interpretation as unknown as Prisma.InputJsonValue,
        date: new Date(),
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

    return NextResponse.json({
      id: dream.id,
      interpretation,
    });
  } catch (error) {
    console.error('[Interpret API] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to interpret dream' },
      { status: 500 }
    );
  }
}