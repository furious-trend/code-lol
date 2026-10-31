// agent-notes: { ctx: "Home page with hero terminal preview, interactive joke shuffle, streak card, and 7-card cyber grid", deps: ["@/lib/supabase/server", "@/lib/jokes", "@/components/Bugsy", "@/components/WelcomeToast", "@/components/DailyJokeCard", "@/components/HeroTerminalPreview"], state: "active", last: "sato@2026-10-31" }
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getJokeOfTheDay } from "@/lib/jokes";
import { Bugsy } from "@/components/Bugsy";
import { WelcomeToast } from "@/components/WelcomeToast";
import { DailyJokeCard } from "@/components/DailyJokeCard";
import { HeroTerminalPreview } from "@/components/HeroTerminalPreview";

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
    <div className="flex flex-col min-h-[calc(100vh-4rem)] p-4 sm:p-6 md:p-12 gap-12 text-zinc-50 font-sans relative">
      <WelcomeToast />
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
      <section className="flex flex-col items-center justify-center text-center mt-4 sm:mt-8 gap-6 z-10 max-w-5xl mx-auto">
        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-purple-500/10 border border-purple-500/30 text-purple-300">
            ⚡ 5 Languages: Python, JS, C, C++, Java
          </span>
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-pink-500/10 border border-pink-500/30 text-pink-300">
            🎭 Dual-Humor: Dev Sarcasm & Kollywood Roasts
          </span>
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-500/10 border border-blue-500/30 text-blue-300">
            ⚔️ Live 1v1 Multiplayer Battles
          </span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-400">
          CodeLOL
        </h1>
        <p className="text-lg sm:text-2xl text-zinc-400 font-medium max-w-2xl leading-relaxed">
          Learn to code with a smile. Laugh at bugs, survive AI roasts, and master programming logic.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <Link 
            href="/problems" 
            className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold py-4 px-8 sm:px-10 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_35px_rgba(59,130,246,0.35)] text-lg sm:text-xl flex items-center gap-2.5"
          >
            Start Solving Problems 🚀
          </Link>
          <Link 
            href="/battle" 
            className="bg-zinc-900/90 hover:bg-zinc-800/90 border border-zinc-700/80 hover:border-red-500/50 text-white font-bold py-4 px-8 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-950/20 text-lg flex items-center gap-2"
          >
            Enter Battle Arena ⚔️
          </Link>
        </div>

        {/* Interactive Terminal Demo Preview */}
        <div className="w-full mt-4">
          <HeroTerminalPreview />
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto z-10">
        
        {/* Joke of the Day Card with Interactive Shuffle */}
        <DailyJokeCard initialJoke={joke} />

        {/* User Progress Card */}
        <div className="bg-zinc-900/90 border border-zinc-800/90 rounded-3xl p-6 sm:p-8 shadow-xl col-span-1 md:col-span-2 relative overflow-hidden backdrop-blur-xl group hover:border-zinc-700 transition-all">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400"></div>
          <div className="h-full flex flex-col justify-center gap-6">
            <div className="flex items-center justify-between">
              <h3 className="text-blue-400 font-extrabold uppercase tracking-widest text-xs flex items-center gap-1.5">
                <span>📊</span> Your Progress Hub
              </h3>
              <span className="text-xs text-zinc-500 font-mono">Synced live</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-950/80 rounded-2xl p-6 flex flex-col items-center justify-center border border-zinc-800 relative group overflow-hidden shadow-inner">
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
              <div className="bg-zinc-950/80 rounded-2xl p-6 flex flex-col items-center justify-center border border-zinc-800 shadow-inner">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-emerald-500">
                  {levelsCompleted}
                </span>
                <span className="text-zinc-400 font-medium mt-2">Levels Beat 🏆</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Navigation Links Grid */}
      <section className="w-full max-w-6xl mx-auto mt-4 mb-16 z-10">
        <div className="flex items-center justify-between mb-6 px-2">
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
            <span>🚀</span> Where to next?
          </h2>
          <span className="text-xs font-mono text-zinc-500">Select an arcade mode</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          <Link href="/learn" className="group relative bg-zinc-900/80 border border-zinc-800/80 rounded-3xl p-5 overflow-hidden transition-all hover:border-yellow-500/60 hover:shadow-xl hover:shadow-yellow-500/10 hover:-translate-y-1 backdrop-blur-xl">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-yellow-500/20 transition-all"></div>
            <div className="text-3xl mb-3">🧠</div>
            <h3 className="text-lg font-bold mb-1 group-hover:text-yellow-400 transition-colors">Learn</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">Guides to master coding.</p>
          </Link>

          <Link href="/lessons" className="group relative bg-zinc-900/80 border border-zinc-800/80 rounded-3xl p-5 overflow-hidden transition-all hover:border-pink-500/60 hover:shadow-xl hover:shadow-pink-500/10 hover:-translate-y-1 backdrop-blur-xl">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl group-hover:bg-pink-500/20 transition-all"></div>
            <div className="text-3xl mb-3">📚</div>
            <h3 className="text-lg font-bold mb-1 group-hover:text-pink-400 transition-colors">Lessons</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">Step-by-step guides to master coding concepts.</p>
          </Link>
          
          <Link href="/problems" className="group relative bg-zinc-900/80 border border-zinc-800/80 rounded-3xl p-5 overflow-hidden transition-all hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 backdrop-blur-xl">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
            <div className="text-3xl mb-3">💻</div>
            <h3 className="text-lg font-bold mb-1 group-hover:text-blue-400 transition-colors">Problems</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">LeetCode-style coding challenges to test your logic.</p>
          </Link>

          <Link href="/battle" className="group relative bg-zinc-900/80 border border-zinc-800/80 rounded-3xl p-5 overflow-hidden transition-all hover:border-red-500/60 hover:shadow-xl hover:shadow-red-500/10 hover:-translate-y-1 backdrop-blur-xl">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition-all"></div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl">⚔️</span>
              <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-400">1v1</span>
            </div>
            <h3 className="text-lg font-bold mb-1 group-hover:text-red-400 transition-colors">Battle</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">1v1 multiplayer live coding showdowns.</p>
          </Link>

          <Link href="/leaderboard" className="group relative bg-zinc-900/80 border border-zinc-800/80 rounded-3xl p-5 overflow-hidden transition-all hover:border-amber-500/60 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1 backdrop-blur-xl">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all"></div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl">🏆</span>
              <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400">TOP</span>
            </div>
            <h3 className="text-lg font-bold mb-1 group-hover:text-amber-400 transition-colors">Ranks</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">Global and per-problem competitive leaderboards.</p>
          </Link>
          
          <Link href="/quiz" className="group relative bg-zinc-900/80 border border-zinc-800/80 rounded-3xl p-5 overflow-hidden transition-all hover:border-purple-500/60 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 backdrop-blur-xl">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl">🎯</span>
              <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-400">+XP</span>
            </div>
            <h3 className="text-lg font-bold mb-1 group-hover:text-purple-400 transition-colors">Quiz Zone</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">Test your knowledge and earn XP.</p>
          </Link>

          <Link href="/playground" className="group relative bg-zinc-900/80 border border-zinc-800/80 rounded-3xl p-5 overflow-hidden transition-all hover:border-green-500/60 hover:shadow-xl hover:shadow-green-500/10 hover:-translate-y-1 backdrop-blur-xl">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition-all"></div>
            <div className="text-3xl mb-3">🧪</div>
            <h3 className="text-lg font-bold mb-1 group-hover:text-green-400 transition-colors">Playground</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">Experiment with code in our interactive editor.</p>
          </Link>
        </div>
      </section>

    </div>
  );
}
