// src/app/api/symbols/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { deleteSymbol } from '@/services/db';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const symbolId = parseInt(id);

    if (isNaN(symbolId)) {
      return NextResponse.json(
        { error: 'Invalid symbol ID' },
        { status: 400 }
      );
    }

    await deleteSymbol(symbolId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting symbol:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete symbol' },
      { status: 500 }
    );
  }
}