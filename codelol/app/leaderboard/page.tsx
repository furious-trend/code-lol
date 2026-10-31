'use client';
// agent-notes: { ctx: "Leaderboard page for global and per-problem rankings with fallback querying", deps: ["@/lib/supabase/client", "@/lib/problems", "framer-motion"], state: "active", last: "sato@2026-10-31" }

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { problems } from '@/lib/problems';

interface GlobalUserScore {
  id: string;
  display_name: string;
  rank_points: number;
}

interface ProblemCompletion {
  user_id: string;
  problem_id: string;
  solve_time_ms: number;
  time_complexity: string;
  space_complexity: string;
  points_awarded: number;
  profiles: { display_name: string };
}

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState<'global' | 'problem'>('global');
  const [selectedProblemId, setSelectedProblemId] = useState<string>(problems[0]?.id || '');
  
  const [globalUsers, setGlobalUsers] = useState<GlobalUserScore[]>([]);
  const [problemCompletions, setProblemCompletions] = useState<ProblemCompletion[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const supabase = createClient();

  useEffect(() => {
    let isMounted = true;
    
    const fetchGlobal = async () => {
      setLoading(true);
      setError('');
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, display_name, rank_points')
          .order('rank_points', { ascending: false })
          .limit(100);

        if (isMounted) {
          if (error) setError(error.message);
          else setGlobalUsers(data || []);
        }
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const fetchProblem = async () => {
      setLoading(true);
      setError('');
      try {
        const { data, error } = await supabase
          .from('problem_completions')
          .select(`
            user_id,
            problem_id,
            solve_time_ms,
            time_complexity,
            space_complexity,
            points_awarded,
            profiles ( display_name )
          `)
          .eq('problem_id', selectedProblemId)
          .order('points_awarded', { ascending: false })
          .limit(100);

        if (!error && data) {
          if (isMounted) setProblemCompletions((data as any) || []);
          return;
        }

        // Resilient fallback: If PostgREST relationship join or solve_time_ms column failed
        if (error) {
          let completionsRes: any = await supabase
            .from('problem_completions')
            .select('user_id, problem_id, solve_time_ms, time_complexity, space_complexity, points_awarded')
            .eq('problem_id', selectedProblemId)
            .order('points_awarded', { ascending: false })
            .limit(100);

          if (completionsRes.error) {
            completionsRes = await supabase
              .from('problem_completions')
              .select('user_id, problem_id, time_complexity, space_complexity, points_awarded')
              .eq('problem_id', selectedProblemId)
              .order('points_awarded', { ascending: false })
              .limit(100);
          }

          if (!completionsRes.error && completionsRes.data) {
            const rawCompletions = completionsRes.data as any[];
            const userIds = Array.from(new Set(rawCompletions.map(c => c.user_id).filter(Boolean)));
            const profileMap: Record<string, string> = {};

            if (userIds.length > 0) {
              const { data: profs } = await supabase
                .from('profiles')
                .select('id, display_name')
                .in('id', userIds);

              if (profs) {
                profs.forEach((p: any) => {
                  profileMap[p.id] = p.display_name;
                });
              }
            }

            const formatted = rawCompletions.map(c => ({
              ...c,
              solve_time_ms: c.solve_time_ms ?? 0,
              profiles: { display_name: profileMap[c.user_id] || 'Unknown User' }
            }));

            if (isMounted) {
              setProblemCompletions(formatted);
              return;
            }
          }

          if (isMounted) setError(error.message);
        }
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (activeTab === 'global') {
      fetchGlobal();
    } else {
      fetchProblem();
    }

    return () => { isMounted = false; };
  }, [activeTab, selectedProblemId, supabase]);

  // Realtime subscriptions
  useEffect(() => {
    const fetchGlobalData = () => {
      supabase
        .from('profiles')
        .select('id, display_name, rank_points')
        .order('rank_points', { ascending: false })
        .limit(100)
        .then(({ data }) => {
          if (data) setGlobalUsers(data);
        });
    };

    const fetchProblemData = async () => {
      const { data, error } = await supabase
        .from('problem_completions')
        .select(`
          user_id,
          problem_id,
          solve_time_ms,
          time_complexity,
          space_complexity,
          points_awarded,
          profiles ( display_name )
        `)
        .eq('problem_id', selectedProblemId)
        .order('points_awarded', { ascending: false })
        .limit(100);

      if (!error && data) {
        setProblemCompletions((data as any) || []);
        return;
      }

      // Fallback
      let completionsRes: any = await supabase
        .from('problem_completions')
        .select('user_id, problem_id, solve_time_ms, time_complexity, space_complexity, points_awarded')
        .eq('problem_id', selectedProblemId)
        .order('points_awarded', { ascending: false })
        .limit(100);

      if (completionsRes.error) {
        completionsRes = await supabase
          .from('problem_completions')
          .select('user_id, problem_id, time_complexity, space_complexity, points_awarded')
          .eq('problem_id', selectedProblemId)
          .order('points_awarded', { ascending: false })
          .limit(100);
      }

      if (!completionsRes.error && completionsRes.data) {
        const rawCompletions = completionsRes.data as any[];
        const userIds = Array.from(new Set(rawCompletions.map(c => c.user_id).filter(Boolean)));
        const profileMap: Record<string, string> = {};

        if (userIds.length > 0) {
          const { data: profs } = await supabase
            .from('profiles')
            .select('id, display_name')
            .in('id', userIds);

          if (profs) {
            profs.forEach((p: any) => {
              profileMap[p.id] = p.display_name;
            });
          }
        }

        const formatted = rawCompletions.map(c => ({
          ...c,
          solve_time_ms: c.solve_time_ms ?? 0,
          profiles: { display_name: profileMap[c.user_id] || 'Unknown User' }
        }));

        setProblemCompletions(formatted);
      }
    };

    const channel = supabase.channel('leaderboard-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => {
        if (activeTab === 'global') {
          fetchGlobalData();
        }
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'problem_completions' }, () => {
        if (activeTab === 'problem') {
          fetchProblemData();
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeTab, selectedProblemId, supabase]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-4 py-12 relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[300px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <span>🏆</span> Hall of Champions
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 uppercase tracking-widest filter drop-shadow-md">
            Arena Leaderboard
          </h1>
          <p className="text-zinc-400 text-sm md:text-base mt-2 max-w-lg mx-auto">
            Battle through algorithmic gauntlets, outpace rival developers, and ascend the developer pantheon.
          </p>
        </div>
        
        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-10">
          <button 
            onClick={() => setActiveTab('global')}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all text-sm uppercase tracking-wider ${
              activeTab === 'global' 
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-950 shadow-[0_0_25px_rgba(245,158,11,0.4)] scale-105' 
                : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <span>🌐</span> Global
          </button>
          <button 
            onClick={() => setActiveTab('problem')}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all text-sm uppercase tracking-wider ${
              activeTab === 'problem' 
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-950 shadow-[0_0_25px_rgba(245,158,11,0.4)] scale-105' 
                : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <span>⚔️</span> Per-Problem
          </button>
        </div>

        {activeTab === 'problem' && (
          <div className="mb-10 flex flex-col items-center gap-2">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Select Challenge Arena</label>
            <div className="relative">
              <select
                value={selectedProblemId}
                onChange={(e) => setSelectedProblemId(e.target.value)}
                className="bg-zinc-900/90 border border-zinc-700 text-white font-bold py-3 px-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none shadow-xl text-center pr-10 cursor-pointer"
              >
                {problems.map(p => (
                  <option key={p.id} value={p.id}>{p.title} ({p.difficulty})</option>
                ))}
              </select>
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 text-xs">▼</span>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col justify-center items-center py-24 gap-4"
              data-testid="leaderboard-loading"
            >
              <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-400 rounded-full animate-spin" />
              <p className="text-zinc-500 text-xs uppercase tracking-widest font-mono">Loading rankings...</p>
            </motion.div>
          ) : error ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/10 border border-red-500/30 p-8 rounded-2xl text-center max-w-md mx-auto"
            >
              <span className="text-3xl mb-2 block">⚠️</span>
              <p className="text-red-400 font-bold">{error}</p>
            </motion.div>
          ) : (activeTab === 'global' ? globalUsers.length === 0 : problemCompletions.length === 0) ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-zinc-900/50 border border-zinc-800/80 p-16 rounded-3xl text-center max-w-lg mx-auto"
            >
              <span className="text-4xl mb-3 block">👾</span>
              <p className="text-zinc-400 text-lg font-medium">No players found. The arena is empty.</p>
              <p className="text-zinc-600 text-xs mt-1">Be the first to solve a challenge and crown the podium!</p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {/* Podium View for Global when >= 3 users */}
              {activeTab === 'global' && globalUsers.length >= 3 && (
                <div className="grid grid-cols-3 gap-3 md:gap-6 items-end pt-8 pb-4 max-w-2xl mx-auto">
                  {/* Silver - 2nd Place */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col items-center bg-gradient-to-b from-slate-700/20 to-zinc-900/90 border border-slate-400/40 rounded-2xl p-4 md:p-6 text-center relative group hover:border-slate-300 transition-all shadow-[0_4px_25px_rgba(148,163,184,0.1)]"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-400/20 border border-slate-300 flex items-center justify-center text-xl md:text-2xl mb-2 shadow-[0_0_15px_rgba(203,213,225,0.4)]">
                      🥈
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-300">#2 Rank</span>
                    <h3 className="font-bold text-white text-sm md:text-lg truncate max-w-full mt-1">
                      {globalUsers[1].display_name}
                    </h3>
                    <div className="mt-2 text-slate-200 font-black text-base md:text-xl">
                      {globalUsers[1].rank_points || 0}
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400">Points</span>
                  </motion.div>

                  {/* Gold - 1st Place (Elevated) */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center bg-gradient-to-b from-amber-500/25 to-zinc-900/90 border-2 border-amber-400/60 rounded-2xl p-5 md:p-8 text-center relative -translate-y-4 shadow-[0_0_35px_rgba(245,158,11,0.25)] group hover:border-amber-300 transition-all"
                  >
                    <div className="absolute -top-3.5 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-zinc-950 text-[10px] font-black uppercase tracking-widest shadow-md">
                      Champion
                    </div>
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-amber-400/20 border-2 border-amber-300 flex items-center justify-center text-2xl md:text-3xl mb-2 shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                      👑
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-amber-400">#1 Rank</span>
                    <h3 className="font-extrabold text-white text-base md:text-xl truncate max-w-full mt-1">
                      {globalUsers[0].display_name}
                    </h3>
                    <div className="mt-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400 font-black text-xl md:text-3xl">
                      {globalUsers[0].rank_points || 0}
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-500/80">Points</span>
                  </motion.div>

                  {/* Bronze - 3rd Place */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center bg-gradient-to-b from-orange-900/20 to-zinc-900/90 border border-orange-700/40 rounded-2xl p-4 md:p-6 text-center relative group hover:border-orange-600 transition-all shadow-[0_4px_25px_rgba(194,65,12,0.1)]"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-orange-700/20 border border-orange-600 flex items-center justify-center text-xl md:text-2xl mb-2 shadow-[0_0_15px_rgba(234,88,12,0.3)]">
                      🥉
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-orange-400">#3 Rank</span>
                    <h3 className="font-bold text-white text-sm md:text-lg truncate max-w-full mt-1">
                      {globalUsers[2].display_name}
                    </h3>
                    <div className="mt-2 text-orange-200 font-black text-base md:text-xl">
                      {globalUsers[2].rank_points || 0}
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400">Points</span>
                  </motion.div>
                </div>
              )}

              {/* List items (all items when <3, or rank #4+ when >=3) */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-3"
              >
                {activeTab === 'global' ? (
                  (globalUsers.length >= 3 ? globalUsers.slice(3) : globalUsers).map((user, idx) => {
                    const actualRank = globalUsers.length >= 3 ? idx + 4 : idx + 1;
                    return (
                      <motion.div 
                        key={user.id} 
                        variants={itemVariants}
                        className={`flex items-center justify-between p-5 rounded-2xl border transition-all hover:scale-[1.01] ${
                          actualRank === 1 ? 'bg-amber-500/10 border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.15)]' :
                          actualRank === 2 ? 'bg-zinc-300/10 border-zinc-400/50 shadow-[0_0_20px_rgba(203,213,225,0.1)]' :
                          actualRank === 3 ? 'bg-orange-700/10 border-orange-700/50' :
                          'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-center gap-4 md:gap-6">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-base ${
                            actualRank === 1 ? 'bg-amber-400/20 text-amber-400 border border-amber-400/40' :
                            actualRank === 2 ? 'bg-slate-400/20 text-slate-300 border border-slate-400/40' :
                            actualRank === 3 ? 'bg-orange-700/20 text-orange-400 border border-orange-700/40' :
                            'bg-zinc-800 text-zinc-400 border border-zinc-700'
                          }`}>
                            #{actualRank}
                          </div>
                          <div className="text-base md:text-lg font-bold text-white tracking-wide">
                            {user.display_name}
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end">
                          <span className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400">
                            {user.rank_points || 0}
                          </span>
                          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Points</span>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  problemCompletions.map((comp, index) => (
                    <motion.div 
                      key={comp.user_id} 
                      variants={itemVariants}
                      className={`flex flex-col md:flex-row items-start md:items-center justify-between p-5 rounded-2xl border transition-all gap-4 ${
                        index === 0 ? 'bg-amber-500/10 border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.15)]' :
                        index === 1 ? 'bg-slate-400/10 border-slate-400/40' :
                        index === 2 ? 'bg-orange-700/10 border-orange-700/40' :
                        'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-base ${
                          index === 0 ? 'bg-amber-400/20 text-amber-400 border border-amber-400/40' :
                          index === 1 ? 'bg-slate-400/20 text-slate-300 border border-slate-400/40' :
                          index === 2 ? 'bg-orange-700/20 text-orange-400 border border-orange-700/40' :
                          'bg-zinc-800 text-zinc-500 border border-zinc-700'
                        }`}>
                          #{index + 1}
                        </div>
                        <div className="text-base md:text-lg font-bold text-white tracking-wide">
                          {comp.profiles?.display_name || 'Unknown User'}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-6 w-full md:w-auto md:justify-end">
                        <div className="flex flex-col">
                          <span className="text-base md:text-lg font-bold text-amber-400">
                            {comp.solve_time_ms ? (comp.solve_time_ms / 1000).toFixed(1) + 's' : 'N/A'}
                          </span>
                          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Time</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-base md:text-lg font-bold text-blue-400">
                            {comp.time_complexity || 'O(?)'} time
                          </span>
                          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Complexity</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-base md:text-lg font-bold text-emerald-400">
                            {comp.points_awarded || 0}
                          </span>
                          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Score</span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
