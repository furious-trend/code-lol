import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'
  const intent = searchParams.get('intent')

  if (code) {
    const supabase = await createClient()
    const { error, data: sessionData } = await supabase.auth.exchangeCodeForSession(code)
    const user = sessionData?.user ?? (sessionData as any)?.session?.user
    
    if (!error && user) {
      // Check user profile for onboarding_complete status
      const { data: profile } = await supabase
        .from('profiles')
        .select('onboarding_complete, humor_preference')
        .eq('id', user.id)
        .single()

      if (!profile || !profile.onboarding_complete) {
        return NextResponse.redirect(`${origin}/onboarding`)
      }

      if (intent === 'signup') {
        return NextResponse.redirect(`${origin}/?toast=welcome-back`)
      }

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
