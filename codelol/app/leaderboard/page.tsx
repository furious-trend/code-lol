'use client';

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
      const { data, error } = await supabase
        .from('profiles')
        .select('id, display_name, rank_points')
        .order('rank_points', { ascending: false })
        .limit(100);

      if (isMounted) {
        if (error) setError(error.message);
        else setGlobalUsers(data || []);
        setLoading(false);
      }
    };

    const fetchProblem = async () => {
      setLoading(true);
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

      if (isMounted) {
        if (error) setError(error.message);
        else setProblemCompletions((data as any) || []);
        setLoading(false);
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
    const channel = supabase.channel('leaderboard-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => {
        if (activeTab === 'global') {
          // Re-fetch global on any profile change (points updated)
          supabase
            .from('profiles')
            .select('id, display_name, rank_points')
            .order('rank_points', { ascending: false })
            .limit(100)
            .then(({ data }) => setGlobalUsers(data || []));
        }
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'problem_completions' }, () => {
        if (activeTab === 'problem') {
          // Re-fetch problem completions
          supabase
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
            .limit(100)
            .then(({ data }) => setProblemCompletions((data as any) || []));
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-8 text-center uppercase tracking-widest filter drop-shadow-lg">
          Arena Leaderboard
        </h1>
        
        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('global')}
            className={`px-8 py-3 rounded-full font-bold transition-all ${
              activeTab === 'global' ? 'bg-amber-500 text-zinc-950 shadow-[0_0_20px_rgba(245,158,11,0.4)]' : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            Global
          </button>
          <button 
            onClick={() => setActiveTab('problem')}
            className={`px-8 py-3 rounded-full font-bold transition-all ${
              activeTab === 'problem' ? 'bg-amber-500 text-zinc-950 shadow-[0_0_20px_rgba(245,158,11,0.4)]' : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            Per-Problem
          </button>
        </div>

        {activeTab === 'problem' && (
          <div className="mb-8 flex justify-center">
            <select
              value={selectedProblemId}
              onChange={(e) => setSelectedProblemId(e.target.value)}
              className="bg-zinc-900 border border-zinc-700 text-white font-bold py-3 px-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none shadow-lg text-center"
            >
              {problems.map(p => (
                <option key={p.id} value={p.id}>{p.title} ({p.difficulty})</option>
              ))}
            </select>
          </div>
        )}

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center py-20"
              data-testid="leaderboard-loading"
            >
              <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
            </motion.div>
          ) : error ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/10 border border-red-500/30 p-6 rounded-2xl text-center"
            >
              <p className="text-red-400 font-bold">{error}</p>
            </motion.div>
          ) : (activeTab === 'global' ? globalUsers.length === 0 : problemCompletions.length === 0) ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-zinc-900/50 border border-zinc-800 p-12 rounded-3xl text-center"
            >
              <p className="text-zinc-500 text-lg font-medium">No players found. The arena is empty.</p>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              {activeTab === 'global' ? (
                globalUsers.map((user, index) => (
                  <motion.div 
                    key={user.id} 
                    variants={itemVariants}
                    layoutId={user.id}
                    className={`flex items-center justify-between p-6 rounded-2xl border transition-all hover:scale-[1.01] ${
                      index === 0 ? 'bg-amber-500/10 border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.15)]' :
                      index === 1 ? 'bg-zinc-300/10 border-zinc-400/50' :
                      index === 2 ? 'bg-orange-700/10 border-orange-700/50' :
                      'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-6">
                      <div className={`text-2xl font-black ${
                        index === 0 ? 'text-amber-400' :
                        index === 1 ? 'text-zinc-300' :
                        index === 2 ? 'text-orange-600' :
                        'text-zinc-600'
                      }`}>
                        #{index + 1}
                      </div>
                      <div className="text-xl font-bold text-white">
                        {user.display_name}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                        {user.rank_points || 0}
                      </span>
                      <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Points</span>
                    </div>
                  </motion.div>
                ))
              ) : (
                problemCompletions.map((comp, index) => (
                  <motion.div 
                    key={comp.user_id} 
                    variants={itemVariants}
                    layoutId={comp.user_id}
                    className={`flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl border transition-all gap-4 ${
                      index === 0 ? 'bg-amber-500/10 border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.15)]' :
                      'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-6 w-full md:w-auto">
                      <div className={`text-2xl font-black ${
                        index === 0 ? 'text-amber-400' : 'text-zinc-600'
                      }`}>
                        #{index + 1}
                      </div>
                      <div className="text-xl font-bold text-white">
                        {comp.profiles?.display_name || 'Unknown User'}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-6 w-full md:w-auto md:justify-end">
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-amber-400">
                          {comp.solve_time_ms ? (comp.solve_time_ms / 1000).toFixed(1) + 's' : 'N/A'}
                        </span>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Time</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-blue-400">
                          {comp.time_complexity || 'O(?)'} time
                        </span>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Complexity</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-emerald-400">
                          {comp.points_awarded || 0}
                        </span>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Score</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
