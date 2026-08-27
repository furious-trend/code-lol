import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { error, data: sessionData } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && sessionData.user) {
      // Check user profile for humor_preference
      const { data: profile } = await supabase
        .from('profiles')
        .select('humor_preference')
        .eq('id', sessionData.user.id)
        .single()

      if (!profile?.humor_preference) {
        return NextResponse.redirect(`${origin}/onboarding`)
      }
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // return the user to an error page with some instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
