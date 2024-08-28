import type { Decoded } from '@/types/auth'
import { NextResponse, type NextRequest } from 'next/server'
import { jwtDecode } from 'jwt-decode'

const protectedRoutes = ['/', '/dashboard']
const publicRoutes = ['/sign-in', '/sign-up']

export function middleware(request: NextRequest): NextResponse<unknown> {
  // Log cookies and request URL for debugging

  const token = request.cookies.get(process.env.NEXT_PUBLIC_COOKIE_NAME)

  // if (
  //   !publicRoutes.includes(request.nextUrl.pathname) &&
  //   !protectedRoutes.includes(request.nextUrl.pathname)
  // ) {
  //   return NextResponse.redirect(new URL('/sign-in', request.url))
  // }
  // Handle unauthenticated users trying to access protected routes
  if (!token && protectedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  if (!token) {
    return NextResponse.next()
  }

  try {
    const decoded = jwtDecode<Decoded>(token.value)
    const currentTime = new Date().getTime() / 1000

    // Handle expired tokens
    if (currentTime > decoded.exp) {
      console.log('Token expired, deleting cookie')
      const response = NextResponse.next()
      response.cookies.delete(process.env.NEXT_PUBLIC_COOKIE_NAME)
      return response
    }

    // Handle authenticated users trying to access public routes
    if (publicRoutes.includes(request.nextUrl.pathname)) {
      console.log('Redirecting to / because user is already authenticated')
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Handle authenticated users trying to access the homepage
    if (request.nextUrl.pathname === '/') {
      console.log(
        'Redirecting from / to /dashboard because user is already authenticated'
      )
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Allow access for authenticated users
    return NextResponse.next()
  } catch (error) {
    console.error('Error decoding token:', error)
    console.log('Deleting invalid token cookie')
    const response = NextResponse.next()
    response.cookies.delete(process.env.NEXT_PUBLIC_COOKIE_NAME)
    return response
  }
}

export const config = {
  matcher: ['/', '/sign-in', '/dashboard'],
}
