'use client';

import { useState, useEffect } from 'react';
import { getPendingRequests } from '@/lib/friends';
import { motion, AnimatePresence } from 'framer-motion';

export function FriendBell() {
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    async function fetchCount() {
      try {
        const pending = await getPendingRequests();
        setCount(pending.length);
      } catch (err) {
        setCount(0);
      }
    }
    fetchCount();

    const syncStreak = () => {
      const profileStr = localStorage.getItem('userProfile');
      if (profileStr) {
        try {
          const profile = JSON.parse(profileStr);
          setStreak(profile.current_streak || 0);
        } catch (e) {}
      }
    };
    syncStreak();
    window.addEventListener('storage', syncStreak);
    window.addEventListener('codelol-progress-update', syncStreak);

    return () => {
      window.removeEventListener('storage', syncStreak);
      window.removeEventListener('codelol-progress-update', syncStreak);
    };
  }, []);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-zinc-400 hover:text-white transition-colors outline-none"
      >
        <span className="text-xl">🔔</span>
        {count > 0 && (
          <span className="absolute top-0 right-0 bg-purple-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.8)] animate-pulse">
            {count}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-zinc-900/90 backdrop-blur-xl border border-zinc-700/50 rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            <div className="p-4 border-b border-zinc-800/50">
              <h3 className="font-bold text-white">Notification Center</h3>
            </div>
            <div className="max-h-96 overflow-y-auto p-4 space-y-6">
              
              {/* Match Invites Section */}
              <section>
                <h4 className="text-xs uppercase font-bold text-zinc-500 mb-2">Match Invites</h4>
                {count > 0 ? (
                  <div className="bg-zinc-800/50 p-3 rounded-xl border border-zinc-700/30 mb-2">
                    <p className="text-sm font-medium text-white mb-2">New Battle Invite!</p>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-green-500 hover:bg-green-400 text-white text-xs font-bold py-1.5 rounded-lg transition-colors">Accept</button>
                      <button className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white text-xs font-bold py-1.5 rounded-lg transition-colors">Decline</button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-zinc-500">No new invites</p>
                )}
              </section>

              {/* Milestones Section */}
              <section>
                <h4 className="text-xs uppercase font-bold text-zinc-500 mb-2">Milestones</h4>
                <div className="bg-gradient-to-r from-orange-500/20 to-pink-500/20 p-3 rounded-xl border border-orange-500/30">
                  <p className="text-sm font-medium text-orange-200">
                    🔥 {streak > 0 ? `${streak} Day Streak!` : "No Active Streak"}
                  </p>
                  <p className="text-xs text-orange-200/70 mt-1">
                    {streak > 0 
                      ? `Keep coding to reach ${Math.ceil((streak + 1) / 5) * 5} days!`
                      : "Complete a lesson or problem to start your streak!"}
                  </p>
                </div>
              </section>

              {/* Updates Section */}
              <section>
                <h4 className="text-xs uppercase font-bold text-zinc-500 mb-2">Updates</h4>
                <div className="bg-zinc-800/30 p-3 rounded-xl border border-zinc-700/30">
                  <p className="text-sm font-medium text-zinc-300">v1.0.0 is live</p>
                  <p className="text-xs text-zinc-500 mt-1">Welcome to CodeLOL.</p>
                </div>
              </section>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
