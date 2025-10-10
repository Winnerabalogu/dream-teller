import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export async function middleware(request: Request) {
  const session = await auth()
  const isAuth = !!session?.user

  if (!isAuth && request.url.includes("/dashboard")) {
    const loginUrl = new URL("/auth/signin", request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}