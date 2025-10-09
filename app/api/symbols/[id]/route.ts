import { NextRequest, NextResponse } from 'next/server';
import { deleteSymbol } from '@/services/db';

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await context.params;
    const id = parseInt(idStr);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid symbol ID' },
        { status: 400 }
      );
    }

    await deleteSymbol(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting symbol:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete symbol' },
      { status: 500 }
    );
  }
}
