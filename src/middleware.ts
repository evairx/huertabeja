import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decodeJwt } from 'jose';
import { getSupabaseClient } from './libs/supabase';

async function tokenRefresher(request: NextRequest, refreshToken: string | undefined, accessToken: string | undefined) {
  if (!refreshToken) return null

  if (accessToken) return null

  try {
    const supabase = getSupabaseClient()

    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    })

    if (error || !data.session) {
      return NextResponse.redirect(new URL('/account/login', request.url))
    }

    const newAccess = data.session.access_token
    const newRefresh = data.session.refresh_token

    const response = NextResponse.next()

    response.cookies.set('access_token', newAccess, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    })
    response.cookies.set('refresh_token', newRefresh, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    })

    return response
  } catch (err) {
    console.error('Error refrescando token:', err)
    return NextResponse.redirect(new URL('/account/login', request.url))
  }
}

async function dashboardMiddleware(request: NextRequest, accessToken: string | undefined) {
  const pathname = request.nextUrl.pathname

  if (!pathname.startsWith('/dashboard')) {
    return null
  }

  if (!accessToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  try {
    const jwtdecode = await decodeJwt(accessToken)
    const idUser = jwtdecode.sub

    if (!idUser) {
      return NextResponse.redirect(new URL('/account/login', request.url))
    }

    const supabase = getSupabaseClient()
    const { data, error } = await supabase.rpc('user_access_panel', { p_user_id: idUser })

    if (error || !data) {
      return NextResponse.redirect(new URL('/account', request.url))
    }

    return null

  } catch (error) {
    return NextResponse.redirect(new URL('/account/login', request.url))
  }
}

function authMiddleware(request: NextRequest, accessToken: string | undefined, refreshToken: string | undefined) {
  const pathname = request.nextUrl.pathname

  if ((pathname === '/account/login' || pathname === '/account/register') && (accessToken || refreshToken)) {
    return NextResponse.redirect(new URL('/account', request.url))
  }
  return null
}

function accountMiddleware(request: NextRequest, refresh_token: string | undefined) {
  const pathname = request.nextUrl.pathname

  const publicPaths = [
    '/account/login',
    '/account/register',
    '/account/reset-password',
  ]

  const isAccountRoute = pathname.startsWith('/account')
  const isPublicRoute = publicPaths.some(path => pathname.startsWith(path))

  if (isAccountRoute && !isPublicRoute && !refresh_token) {
    return NextResponse.redirect(new URL('/account/login', request.url))
  }

  return null
}

function paymenthNotPage(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (pathname === '/account/payment' || pathname === '/account/payment/') {
    return NextResponse.redirect(new URL('/account/payment/manage', request.url))
  }
}

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value
  const refreshToken = request.cookies.get('refresh_token')?.value

  const dashboardResult = await dashboardMiddleware(request, accessToken)
  if (dashboardResult) return dashboardResult

  const authResult = authMiddleware(request, accessToken, refreshToken)
  if (authResult) return authResult

  const accountResult = accountMiddleware(request, refreshToken)
  if (accountResult) return accountResult

  const paymentNotResult = paymenthNotPage(request)
  if (paymentNotResult) return paymentNotResult

  const refreshResult = await tokenRefresher(request, refreshToken, accessToken)
  if (refreshResult) return refreshResult

  const response = NextResponse.next();
  response.headers.set('x-current-path', request.nextUrl.pathname);

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}