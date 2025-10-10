// middleware.ts - Minimal version
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Only check authentication for protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const sessionToken = request.cookies.get('next-auth.session-token')?.value || 
                        request.cookies.get('__Secure-next-auth.session-token')?.value
    
    if (!sessionToken) {
      const loginUrl = new URL('/auth/signin', request.url)
      loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    // Only protect specific routes, not all
  ]
}