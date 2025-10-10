/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export const runtime = "edge" // edge-compatible now

export async function middleware(req: any) {
  const token = await getToken({ req })
  const isAuth = !!token

  if (!isAuth && req.nextUrl.pathname.startsWith("/dashboard")) {
    const loginUrl = new URL("/auth/signin", req.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
