import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/session';
import { prisma } from '@/lib/prisma';
export const runtime = "nodejs"
export async function GET() {
  const { error, user } = await requireAuth();
  if (error) return error;

  try {
    const entries = await prisma.journalEntry.findMany({
      where: { userId: user!.id },
      orderBy: { date: 'desc' },
    });

    return NextResponse.json(entries);
  } catch (err) {
    console.error('Error fetching journal entries:', err);
    return NextResponse.json({ error: 'Failed to fetch journal entries' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { error, user } = await requireAuth();
  if (error) return error;

  try {
    const body = await request.json();
    const { title, content, mood, tags } = body;

    if (!content || !content.trim()) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const entry = await prisma.journalEntry.create({
      data: {
        userId: user!.id,
        title: title || null,
        content: content.trim(),
        mood: mood || null,
        tags: tags || [],
      },
    });

    return NextResponse.json(entry);
  } catch (err) {
    console.error('Error creating journal entry:', err);
    return NextResponse.json({ error: 'Failed to create journal entry' }, { status: 500 });
  }
}
