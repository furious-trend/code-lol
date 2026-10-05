import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
          });
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
      global: {
        fetch: (url, options) => {
          return fetch(url, { ...options, cache: 'no-store' });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url = request.nextUrl.clone();
  const path = url.pathname;

  // Unprotected routes: public pages and API
  const isPublicRoute = path === '/' || path.startsWith('/login') || path.startsWith('/auth/callback') || path.startsWith('/api/');
  
  if (!user && !isPublicRoute) {
    // Unauthenticated user trying to access a protected route
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (user) {
    // If authenticated, check if onboarded
    const { data: profile } = await supabase
      .from('profiles')
      .select('onboarding_complete')
      .eq('id', user.id)
      .single();

    const isOnboarded = profile?.onboarding_complete;

    // Fully authenticated users shouldn't see the login page
    if (path.startsWith('/login')) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }

    // Un-onboarded users must go to /onboarding
    if (!isOnboarded && !path.startsWith('/onboarding') && !path.startsWith('/api/') && !path.startsWith('/auth/callback')) {
      url.pathname = '/onboarding';
      return NextResponse.redirect(url);
    }

    // Onboarded users shouldn't go back to /onboarding
    if (isOnboarded && path.startsWith('/onboarding')) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
