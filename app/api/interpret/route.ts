import { NextRequest, NextResponse } from 'next/server';
import { createDream } from '@/services/db';
import { CreateDreamInputSchema } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = CreateDreamInputSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.format() },
        { status: 400 }
      );
    }

    // Create FormData from validated input
    const formData = new FormData();
    formData.append('text', validation.data.text);

    const dream = await createDream(formData);
    return NextResponse.json(dream);
  } catch (error) {
    console.error('Interpretation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to interpret dream' },
      { status: 500 }
    );
  }
}