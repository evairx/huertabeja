import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decodeJwt } from 'jose'
import { getSupabaseClient } from './libs/supabase'

/** ---- Helpers ---- **/

function generateCartId() {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)

  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

function clearAuthCookies(response: NextResponse) {
  response.cookies.delete('sid')
  response.cookies.delete('rid')
  return response
}

function ensureCartCookie(request: NextRequest, response: NextResponse) {
  if (!request.cookies.get('cart') && !response.cookies.get('cart')) {
    response.cookies.set('cart', generateCartId(), {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    })
  }
  return response
}

/** ---- Middlewares ---- **/

async function tokenRefresher(request: NextRequest, refreshToken?: string, accessToken?: string) {
  if (!refreshToken || accessToken) return null

  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken })

    if (error || !data.session) {
      const res = NextResponse.redirect(new URL('/account/login', request.url))
      return clearAuthCookies(res)
    }

    const res = NextResponse.next()
    res.cookies.set('sid', data.session.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    })
    res.cookies.set('rid', data.session.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    })

    return res
  } catch (err) {
    console.error('Error refrescando token:', err)
    const res = NextResponse.redirect(new URL('/account/login', request.url))
    return clearAuthCookies(res)
  }
}

async function dashboardMiddleware(request: NextRequest, accessToken?: string) {
  const { pathname } = request.nextUrl
  if (!pathname.startsWith('/dashboard')) return null

  if (!accessToken) {
    const res = NextResponse.redirect(new URL('/', request.url))
    return clearAuthCookies(res)
  }

  try {
    const { sub: idUser } = await decodeJwt(accessToken)
    if (!idUser) {
      const res = NextResponse.redirect(new URL('/account/login', request.url))
      return clearAuthCookies(res)
    }

    const supabase = getSupabaseClient()
    const { data, error } = await supabase.rpc('user_access_panel', { p_user_id: idUser })

    if (error || !data) {
      return NextResponse.redirect(new URL('/account', request.url))
    }

    return null
  } catch {
    const res = NextResponse.redirect(new URL('/account/login', request.url))
    return clearAuthCookies(res)
  }
}

function authMiddleware(request: NextRequest, accessToken?: string, refreshToken?: string) {
  const pathname = request.nextUrl.pathname
  const isAuthRoute = ['/account/login', '/account/register', '/account/login/callback'].includes(pathname)

  if (isAuthRoute && (accessToken || refreshToken)) {
    return NextResponse.redirect(new URL('/account', request.url))
  }
  return null
}

function accountMiddleware(request: NextRequest, refreshToken?: string) {
  const { pathname } = request.nextUrl
  const publicPaths = ['/account/login', '/account/register', '/account/reset-password']

  if (pathname.startsWith('/account') && !publicPaths.some(p => pathname.startsWith(p)) && !refreshToken) {
    const res = NextResponse.redirect(new URL('/account/login', request.url))
    return clearAuthCookies(res)
  }
  return null
}

function paymentNotPage(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname === '/account/payment' || pathname === '/account/payment/') {
    return NextResponse.redirect(new URL('/account/payment/manage', request.url))
  }
  return null
}

/** ---- Main Middleware ---- **/

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('sid')?.value
  const refreshToken = request.cookies.get('rid')?.value

  // Orden lógico de ejecución
  const checks = [
    () => dashboardMiddleware(request, accessToken),
    () => authMiddleware(request, accessToken, refreshToken),
    () => accountMiddleware(request, refreshToken),
    () => paymentNotPage(request),
    () => tokenRefresher(request, refreshToken, accessToken),
  ]

  for (const check of checks) {
    const result = await check()
    if (result) return result
  }

  let response = NextResponse.next()
  response = ensureCartCookie(request, response)
  response.headers.set('x-current-path', request.nextUrl.pathname)

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|account/login/callback).*)',
  ],
}
