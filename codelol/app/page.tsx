import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getJokeOfTheDay } from "@/lib/jokes";
import { Bugsy } from "@/components/Bugsy";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Try to fetch profile data, default to 0 if it fails or doesn't exist yet
  let currentStreak = 0;
  let levelsCompleted = 0;

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('current_streak, levels_completed')
      .eq('id', user.id)
      .single();
      
    if (profile) {
      currentStreak = profile.current_streak || 0;
      levelsCompleted = profile.levels_completed || 0;
    }
  }

  const joke = getJokeOfTheDay();

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] p-6 md:p-12 gap-12 text-zinc-50 font-sans relative">
      {/* Iconic Funny Transparent Background (Home Page Only) */}
      <div className="fixed bottom-0 right-10 z-[0] opacity-10 pointer-events-none w-[300px] md:w-[600px] mix-blend-screen">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="https://media.tenor.com/Yw_A_J8u9T0AAAAi/bongo-cat-transparent.gif" 
          alt="Funny Transparent Background" 
          className="w-full h-auto drop-shadow-2xl"
        />
      </div>
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center mt-8 gap-6">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
          CodeLOL
        </h1>
        <p className="text-xl md:text-2xl text-zinc-400 font-medium max-w-xl">
          Learn to code with a smile. Laugh at bugs, master the logic.
        </p>
        <Link 
          href="/problems" 
          className="mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-bold py-4 px-10 rounded-full transition-transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(59,130,246,0.3)] text-xl flex items-center gap-2"
        >
          Start Solving Problems 🚀
        </Link>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
        
        {/* Joke of the Day Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-between hover:border-yellow-500/50 transition-colors col-span-1 md:col-span-2 lg:col-span-1 shadow-lg shadow-yellow-500/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
          <div>
            <h3 className="text-yellow-400 font-bold uppercase tracking-wider text-sm mb-4">Joke of the Day</h3>
            <p className="text-xl font-medium leading-relaxed">
              &quot;{joke}&quot;
            </p>
          </div>
          <div className="text-4xl mt-6">😂</div>
        </div>

        {/* User Progress Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-lg col-span-1 md:col-span-2 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-cyan-500"></div>
          {user ? (
            <div className="h-full flex flex-col justify-center gap-6">
              <h3 className="text-blue-400 font-bold uppercase tracking-wider text-sm">Your Progress</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-950 rounded-2xl p-6 flex flex-col items-center justify-center border border-zinc-800 relative group overflow-hidden">
                  <div className={`absolute -bottom-4 -right-4 transition-transform duration-500 ${currentStreak >= 7 ? 'scale-125' : 'scale-100 group-hover:scale-110'}`}>
                    <Bugsy size={80} mood={currentStreak >= 7 ? 'happy' : (currentStreak > 0 ? 'laughing' : 'thinking')} />
                  </div>
                  <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-red-500 z-10">
                    {currentStreak}
                  </span>
                  <span className="text-zinc-400 font-medium mt-2 z-10 flex items-center gap-1">
                    Day Streak {currentStreak > 0 && <span className="animate-pulse">🔥</span>}
                  </span>
                </div>
                <div className="bg-zinc-950 rounded-2xl p-6 flex flex-col items-center justify-center border border-zinc-800">
                  <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-emerald-500">
                    {levelsCompleted}
                  </span>
                  <span className="text-zinc-400 font-medium mt-2">Levels Beat 🏆</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center gap-6 py-6">
              <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center text-3xl mb-2">
                🔒
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Save Your Progress</h3>
                <p className="text-zinc-400 max-w-md mx-auto">
                  Don&apos;t lose your streak! Sign up to track your learning, earn badges, and compete with friends.
                </p>
              </div>
              <Link 
                href="/login" 
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 active:scale-95"
              >
                Sign up now
              </Link>
            </div>
          )}
        </div>

      </div>

      {/* Navigation Links Grid */}
      <section className="w-full max-w-6xl mx-auto mt-8 mb-16">
        <h2 className="text-2xl font-bold mb-6 px-2">Where to next?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Link href="/learn" className="group relative bg-zinc-900 border border-zinc-800 rounded-3xl p-6 overflow-hidden transition-all hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/10">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-yellow-500/20 transition-all"></div>
            <div className="text-3xl mb-4">🧠</div>
            <h3 className="text-xl font-bold mb-2">Learn</h3>
            <p className="text-sm text-zinc-400">Guides to master coding.</p>
          </Link>

          <Link href="/lessons" className="group relative bg-zinc-900 border border-zinc-800 rounded-3xl p-6 overflow-hidden transition-all hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-500/10">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl group-hover:bg-pink-500/20 transition-all"></div>
            <div className="text-3xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-2">Lessons</h3>
            <p className="text-sm text-zinc-400">Step-by-step guides to master coding concepts.</p>
          </Link>
          
          <Link href="/problems" className="group relative bg-zinc-900 border border-zinc-800 rounded-3xl p-6 overflow-hidden transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
            <div className="text-3xl mb-4">💻</div>
            <h3 className="text-xl font-bold mb-2">Problems</h3>
            <p className="text-sm text-zinc-400">LeetCode-style coding challenges to test your logic.</p>
          </Link>
          
          <Link href="/playground" className="group relative bg-zinc-900 border border-zinc-800 rounded-3xl p-6 overflow-hidden transition-all hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition-all"></div>
            <div className="text-3xl mb-4">🧪</div>
            <h3 className="text-xl font-bold mb-2">Playground</h3>
            <p className="text-sm text-zinc-400">Experiment with code in our interactive editor.</p>
          </Link>
          
          <Link href="/quiz" className="group relative bg-zinc-900 border border-zinc-800 rounded-3xl p-6 overflow-hidden transition-all hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2">Quiz Zone</h3>
            <p className="text-sm text-zinc-400">Test your knowledge and earn XP.</p>
          </Link>
          
          <Link href="/projects" className="group relative bg-zinc-900 border border-zinc-800 rounded-3xl p-6 overflow-hidden transition-all hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all"></div>
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-2">Projects</h3>
            <p className="text-sm text-zinc-400">Build real-world applications from scratch.</p>
          </Link>
        </div>
      </section>

    </div>
  );
}
