'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';

interface UserScore {
  id: string;
  display_name: string;
  rank_points: number;
}

export default function Leaderboard() {
  const [users, setUsers] = useState<UserScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const supabase = createClient();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, display_name, rank_points')
        .order('rank_points', { ascending: false })
        .limit(100);

      if (error) {
        setError(error.message);
      } else {
        setUsers(data || []);
      }
      setLoading(false);
    };

    fetchLeaderboard();
  }, [supabase]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-8 text-center uppercase tracking-widest filter drop-shadow-lg">
          Arena Leaderboard
        </h1>

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
          ) : users.length === 0 ? (
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
              {users.map((user, index) => (
                <motion.div 
                  key={user.id} 
                  variants={itemVariants}
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
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
