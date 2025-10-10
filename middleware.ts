export { auth as middleware } from "@/lib/auth"

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - auth pages (signin, register)
     * - welcome page (onboarding)
     * - homepage (landing page)
     *
     * Only protect /dashboard/* routes
     */
    '/dashboard/:path*',
  ],
}
