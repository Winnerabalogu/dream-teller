// app/api/interpret/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createDream } from '@/services/db';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const dream = await createDream(formData);
    return NextResponse.json(dream);
  } catch (error) {
    console.error('Interpretation error:', error);
    return NextResponse.json(
      { error: 'Failed to interpret dream' },
      { status: 500 }
    );
  }
}