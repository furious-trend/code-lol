// agent-notes: { ctx: "Navbar with localized navigation links, animated mobile drawer, user progress, and auth controls", deps: ["@/lib/supabase/server", "next/link", "@/components/NavbarClientLinks"], state: active, last: "sato@2026-10-31" }
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Bugsy } from './Bugsy'
import { UserProgress } from './UserProgress'
import { Notifications } from './Notifications'
import { LanguageSwitcher } from './LanguageSwitcher'
import { NavbarClientLinks } from './NavbarClientLinks'

export const navLinks = [
  { name: 'Learn', path: '/learn' },
  { name: 'Library', path: '/lessons' },
  { name: 'Problems', path: '/problems' },
  { name: 'Battle', path: '/battle' },
  { name: 'Leaderboard', path: '/leaderboard' },
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

  const handleLogout = async () => {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/')
  }

  return (
    <nav className="w-full h-16 border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-xl sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 shadow-sm">
      <div className="flex items-center gap-6">
        <Link href="/" className="font-extrabold text-xl tracking-tight flex items-center gap-2.5 group">
          <div className="p-1 rounded-xl bg-purple-500/10 border border-purple-500/30 group-hover:border-purple-400 transition-colors shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Bugsy size={26} mood="idle" />
          </div>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 font-black">
            CodeLOL
          </span>
        </Link>
        {/* Nav links: only visible to authenticated users */}
        {user && <NavbarClientLinks navLinks={navLinks} activeLang={activeLang} />}
      </div>
      <div className="flex items-center gap-3 sm:gap-4 text-zinc-300">
        {/* Widgets: only visible to authenticated users */}
        {user && <LanguageSwitcher />}
        {user && <UserProgress />}
        {user && (
          <Link 
            href="/settings" 
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 border border-transparent hover:border-zinc-800 transition-all text-sm" 
            title="Settings"
          >
            ⚙️
          </Link>
        )}

        {user ? (
          <>
            <Notifications />
            <span className="text-xs font-semibold text-zinc-400 hidden xl:inline-block max-w-[160px] truncate">{user.email}</span>
            <form action={handleLogout}>
              <button className="text-xs sm:text-sm bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 px-3.5 py-1.5 rounded-xl transition-all font-semibold hover:border-zinc-700">
                Log out
              </button>
            </form>
          </>
        ) : (
          <Link href="/login" className="text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-4 py-2 rounded-xl transition-all shadow-md shadow-blue-600/20 active:scale-95">
            Log in
          </Link>
        )}
      </div>
    </nav>
  )
}
