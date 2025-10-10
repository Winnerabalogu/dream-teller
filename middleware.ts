// middleware.ts - Minimal version
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Remove or comment out all auth logic for now
  return NextResponse.next()
}

export const config = {
  matcher: [] // Empty matcher = no protection
}