import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Bugsy } from './Bugsy'
import { UserProgress } from './UserProgress'

import { FriendBell } from './FriendBell'

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

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
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
          {[
            { name: 'Learn', path: '/learn' },
            { name: 'Library', path: '/lessons' },
            { name: 'Problems', path: '/problems' },
            { name: 'Battle', path: '/battle' },
            { name: 'Friends', path: '/friends' },
            { name: 'Quiz', path: '/quiz' },
            { name: 'Playground', path: '/playground' },
            { name: 'Projects', path: '/projects' },
          ].map((link) => (
            <Link key={link.name} href={link.path} className="relative group hover:text-zinc-100 transition-colors py-1">
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4 text-zinc-300">
        <UserProgress />
        
        {user ? (
          <>
            <FriendBell />
            <Link href="/settings" className="text-sm hover:text-white transition-colors" title="Settings">
              ⚙️
            </Link>
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
