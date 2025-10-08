// src/app/api/dreams/route.ts
import { NextResponse } from 'next/server';
import { getDreams } from '@/services/db';

export async function GET() {
  try {
    const dreams = await getDreams();
    return NextResponse.json(dreams);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dreams' },
      { status: 500 }
    );
  }
}