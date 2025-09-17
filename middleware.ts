import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|login|signup|auth/callback).*)',
  ],
}

export async function middleware(request: NextRequest) {
  // Skip middleware for static files and auth routes
  if (
    request.nextUrl.pathname.startsWith('/_next/') ||
    request.nextUrl.pathname.startsWith('/favicon.ico') ||
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/signup') ||
    request.nextUrl.pathname.startsWith('/auth/')
  ) {
    return NextResponse.next()
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            request.cookies.set({
              name,
              value,
              ...options,
            })
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            response.cookies.set({
              name,
              value,
              ...options,
              path: '/',
              sameSite: 'lax',
            })
          },
          remove(name: string, options: any) {
            request.cookies.set({
              name,
              value: '',
              ...options,
            })
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            response.cookies.set({
              name,
              value: '',
              ...options,
              path: '/',
              maxAge: 0,
            })
          },
        },
      }
    )

    // Get the user's session
    const { data: { user }, error } = await supabase.auth.getUser()
    
    // If we're on the home page and user is logged in, let them through
    if (request.nextUrl.pathname === '/' && user) {
      return response
    }
    
    // Define public routes that don't require authentication
    const publicRoutes = ['/', '/about', '/terms', '/test-cart']
    const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname)
    
    // If it's a public route, continue
    if (isPublicRoute) {
      return response
    }
    
    // If user is not authenticated and trying to access protected route
    if (!user) {
      console.log('[MIDDLEWARE] No user session found, redirecting to login')
      const redirectUrl = new URL('/login', request.url)
      redirectUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    return response
  } catch (error) {
    console.error('Middleware error:', error)
    // In case of error, redirect to home
    return NextResponse.redirect(new URL('/', request.url))
  }
}
