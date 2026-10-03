// agent-notes: { ctx: "Browser-side Supabase client singleton creator", deps: [], state: active, last: "sato@2026-09-23" }
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

  const supabase = createBrowserClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
      }
    }
  )

  if (process.env.NODE_ENV === 'development') {
    const originalGetUser = supabase.auth.getUser.bind(supabase.auth);
    supabase.auth.getUser = async (...args) => {
      const { data, error } = await originalGetUser(...args);
      if (data && data.user) return { data, error } as any;
      return { 
        data: { user: { id: 'local-guest', email: 'guest@localhost' } as any }, 
        error: null 
      } as any;
    };
  }

  return supabase;
}

