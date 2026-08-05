import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

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
      <Link href="/" className="font-bold text-xl text-zinc-100 tracking-tight">CodeLOL</Link>
      <div className="flex items-center gap-4 text-zinc-300">
        {user ? (
          <>
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
