import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/session';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error, user } = await requireAuth();
  if (error) return error;

  try {
    const { id } = await params;

    await prisma.journalEntry.delete({
      where: {
        id,
        userId: user!.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error deleting journal entry:', err);
    return NextResponse.json({ error: 'Failed to delete journal entry' }, { status: 500 });
  }
}
