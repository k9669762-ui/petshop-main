import { NextRequest, NextResponse } from 'next/server'

function parseAuth(request: NextRequest) {
  const cookie = request.cookies.get('bowpaw-auth')
  if (!cookie?.value) return null
  try {
    const parsed = JSON.parse(decodeURIComponent(cookie.value))
    if (!parsed?.state?.isAuthenticated) return null
    return parsed.state as { isAuthenticated: boolean; currentUser: { id: string; role: string } }
  } catch {
    return null
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const auth = parseAuth(request)
  const role = auth?.currentUser?.role

  // ── /admin/* ──────────────────────────────────────────────
  if (pathname.startsWith('/admin/login')) {
    if (role === 'owner') {
      return NextResponse.redirect(new URL('/owner/dashboard', request.url))
    }
    return NextResponse.next()
  }

  if (pathname.startsWith('/admin')) {
    if (role !== 'owner') {
      const url = new URL('/owner/login', request.url)
      url.searchParams.set('from', pathname)
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }

  // ── /owner/* ──────────────────────────────────────────────
  if (pathname.startsWith('/owner/login')) {
    if (role === 'owner') {
      return NextResponse.redirect(new URL('/owner/dashboard', request.url))
    }
    return NextResponse.next()
  }

  if (pathname.startsWith('/owner')) {
    if (role !== 'owner') {
      const url = new URL('/owner/login', request.url)
      url.searchParams.set('from', pathname)
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }

  // ── /auth/signin & /auth/register ─────────────────────────
  if (pathname === '/auth/signin' || pathname === '/auth/register') {
    if (auth?.isAuthenticated) {
      if (role === 'owner') return NextResponse.redirect(new URL('/owner/dashboard', request.url))
      return NextResponse.redirect(new URL('/account', request.url))
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/owner/:path*', '/auth/signin', '/auth/register'],
}
