import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function dashboardMiddleware(request: NextRequest, role: string | undefined) {
  const pathname = request.nextUrl.pathname
  
  if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard')) {
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  return null
}

function authMiddleware(request: NextRequest, accessToken: string | undefined, refreshToken: string | undefined) {
  const pathname = request.nextUrl.pathname

  if ((pathname === '/login' || pathname === '/register') && accessToken && refreshToken) {
    return NextResponse.redirect(new URL('/account', request.url))
  }
  return null
}

export function middleware(request: NextRequest) {
  const role = request.cookies.get('role')?.value
  const accessToken = request.cookies.get('access_token')?.value
  const refreshToken = request.cookies.get('refresh_token')?.value
  
  const dashboardResult = dashboardMiddleware(request, role)
  if (dashboardResult) return dashboardResult

  const authResult = authMiddleware(request, accessToken, refreshToken)
  if (authResult) return authResult

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/login',
    '/register'
  ],
}