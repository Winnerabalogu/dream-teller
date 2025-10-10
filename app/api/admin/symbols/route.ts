/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import {
  updateSymbol as updateSymbolSvc,
  getSymbols,
} from '@/services/db';
import {
  createSymbol as createSymbolSvc,
  deleteSymbol as deleteSymbolSvc,
} from '@/services/Symbol.service';
export const runtime = "nodejs"
export async function GET() {
  try {
    const symbols = await getSymbols();
    return NextResponse.json(symbols);
  } catch (err) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const symbol = await createSymbolSvc(body.key, body.meaning);
    return NextResponse.json(symbol);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to create' },
      { status: 400 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const symbol = await updateSymbolSvc(body.id, body.key, body.meaning);
    return NextResponse.json(symbol);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to update' },
      { status: 400 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const idParam = url.searchParams.get('id');
    if (!idParam) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }
    // FIX: Parse string to number
    const id = parseInt(idParam, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid id format' },
        { status: 400 }
      );
    }
    await deleteSymbolSvc(id);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to delete' },
      { status: 500 }
    );
  }
}