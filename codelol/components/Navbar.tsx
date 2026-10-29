// agent-notes: { ctx: "Navbar with localized navigation links, mobile drawer, user progress, and auth controls", deps: ["@/lib/supabase/server", "next/link"], state: active, last: "sato@2026-10-28" }
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Bugsy } from './Bugsy'
import { UserProgress } from './UserProgress'

import { Notifications } from './Notifications'
import { LanguageSwitcher } from './LanguageSwitcher'

export const navLinks = [
  { name: 'Learn', path: '/learn' },
  { name: 'Library', path: '/lessons' },
  { name: 'Problems', path: '/problems' },
  { name: 'Leaderboard', path: '/leaderboard' },
  { name: 'Battle', path: '/battle' },
  { name: 'Friends', path: '/friends' },
  { name: 'Quiz', path: '/quiz' },
  { name: 'Playground', path: '/playground' },
]

export default async function Navbar() {
  const supabase = await createClient()
  const cookieStore = await cookies()
  const cookieLang = cookieStore.get('learning_language')?.value
  const { data: { user } } = await supabase.auth.getUser()

  let activeLang = cookieLang
  if (!activeLang && user) {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('learning_language')
        .eq('id', user.id)
        .single()
      if (profile?.learning_language) {
        activeLang = profile.learning_language
      }
    } catch {
      // Non-blocking
    }
  }

  const getLocalizedPath = (basePath: string) => {
    if (activeLang && (basePath === '/learn' || basePath === '/lessons')) {
      return `${basePath}?lang=${activeLang}`
    }
    return basePath
  }

  const handleLogout = async () => {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/')
  }

  return (
    <nav className="w-full h-16 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50 flex items-center justify-between px-6">
      <div className="flex items-center gap-6">
        <Link href="/" className="font-bold text-xl text-zinc-100 tracking-tight flex items-center gap-2">
          <Bugsy size={28} mood="idle" /> CodeLOL
        </Link>
        {/* Nav links: only visible to authenticated users */}
        {user && (
          <>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-5 text-sm font-medium text-zinc-400">
              {navLinks.map((link) => (
                <Link key={link.name} href={getLocalizedPath(link.path)} className="relative group hover:text-zinc-100 transition-colors py-1">
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
                </Link>
              ))}
            </div>

            {/* Mobile Navigation Drawer */}
            <div className="md:hidden relative">
              <details className="group">
                <summary className="list-none cursor-pointer p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition-colors flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </summary>
                <div className="absolute left-0 mt-2 w-48 bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-xl shadow-2xl py-2 z-50 flex flex-col gap-1 px-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={getLocalizedPath(link.path)}
                      className="px-3 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/60 rounded-lg transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </details>
            </div>
          </>
        )}
      </div>
      <div className="flex items-center gap-4 text-zinc-300">
        {/* Widgets: only visible to authenticated users */}
        {user && <LanguageSwitcher />}
        {user && <UserProgress />}
        {user && (
          <Link href="/settings" className="text-sm hover:text-white transition-colors" title="Settings">
            ⚙️
          </Link>
        )}

        {user ? (
          <>
            <Notifications />
            <span className="text-sm hidden sm:inline-block">{user.email}</span>
            <form action={handleLogout}>
              <button className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-4 py-2 rounded transition-colors font-medium">
                Log out
              </button>
            </form>
          </>
        ) : (
          <Link href="/login" className="text-sm bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded transition-colors font-medium">
            Log in
          </Link>
        )}
      </div>
    </nav>
  )
}
