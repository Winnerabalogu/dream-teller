// src/app/api/symbols/route.ts
import { NextResponse } from 'next/server';
import { getSymbols } from '@/services/db';

export async function GET() {
  try {
    const symbols = await getSymbols();
    return NextResponse.json(symbols);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch symbols' },
      { status: 500 }
    );
  }
}