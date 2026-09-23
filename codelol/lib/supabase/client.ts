// agent-notes: { ctx: "Browser-side Supabase client singleton creator", deps: [], state: active, last: "sato@2026-09-23" }
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
      }
    }
  )
}

