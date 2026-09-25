// agent-notes: { ctx: "Supabase session refresh helper for proxy/middleware", deps: [], state: active, last: "sato@2026-09-23" }
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return supabaseResponse
  }

  try {
    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookieOptions: {
          secure: process.env.NODE_ENV === 'production',
        },
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    // refreshing the auth token
    const { data: { user } } = await supabase.auth.getUser()

    const pathname = request.nextUrl.pathname
    const isLogin = pathname === '/login'
    const isAuthCallback = pathname.startsWith('/auth') || pathname.startsWith('/api/auth')
    const isOnboarding = pathname === '/onboarding'

    if (!user) {
      // If no session exists, redirect everything to /login except the allowed public paths
      if (!isLogin && !isAuthCallback && !isOnboarding) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
      }
    } else {
      // User is logged in, check if onboarding is complete
      const { data: profile } = await supabase
        .from('profiles')
        .select('onboarding_complete')
        .eq('id', user.id)
        .single()

      const onboardingComplete = profile?.onboarding_complete

      if (!onboardingComplete) {
        // Enforce onboarding for logged-in users who haven't finished it
        if (!isOnboarding && !isAuthCallback) {
          const url = request.nextUrl.clone()
          url.pathname = '/onboarding'
          return NextResponse.redirect(url)
        }
      } else {
        // Onboarding is complete, don't let them back into /login or /onboarding
        if (isLogin || isOnboarding) {
          const url = request.nextUrl.clone()
          url.pathname = '/'
          return NextResponse.redirect(url)
        }
      }
    }
  } catch (err) {
    console.error('Middleware updateSession warning:', err)
  }

  return supabaseResponse
}

