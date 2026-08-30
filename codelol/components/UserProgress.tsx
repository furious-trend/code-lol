'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function UserProgress() {
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const xpNeeded = level * 100; // 100 XP per level
  const progressPercent = Math.min(100, Math.max(0, (xp / xpNeeded) * 100));

  useEffect(() => {
    // Read from local storage to sync across tabs and avoid SSR mismatch
    const syncProgress = () => {
      const profileStr = localStorage.getItem('userProfile');
      const profile = profileStr ? JSON.parse(profileStr) : { levels_completed: 0 };
      
      const problemsStr = localStorage.getItem('completedProblems');
      const problems = problemsStr ? JSON.parse(problemsStr) : [];
      
      const totalActivities = (profile.levels_completed || 0) + problems.length;
      const totalXp = totalActivities * 25; // 25 XP per activity
      
      // Calculate level based on XP (Level N needs N*100 XP total)
      // e.g. 100XP = Lvl 2. 300XP = Lvl 3. 600XP = Lvl 4.
      let currentLvl = 1;
      let xpThreshold = 100;
      let remainingXp = totalXp;
      
      while (remainingXp >= xpThreshold) {
        remainingXp -= xpThreshold;
        currentLvl++;
        xpThreshold = currentLvl * 100;
      }
      
      setLevel(currentLvl);
      setXp(remainingXp);
      setStreak(profile.current_streak || 0);
    };

    syncProgress();
    
    // Listen for storage events (from other tabs) and custom events
    window.addEventListener('storage', syncProgress);
    window.addEventListener('codelol-progress-update', syncProgress);
    
    // Polling fallback just in case
    const interval = setInterval(syncProgress, 2000);
    
    return () => {
      window.removeEventListener('storage', syncProgress);
      window.removeEventListener('codelol-progress-update', syncProgress);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-full py-1 px-3 hidden sm:flex">
      {streak > 0 && (
        <div className="flex items-center gap-1 text-amber-500 font-bold text-xs" title={`${streak} day streak!`}>
          <span>🔥</span>
          <span>{streak}</span>
        </div>
      )}
      <div className="flex items-center justify-center bg-gradient-to-br from-amber-400 to-amber-600 w-6 h-6 rounded-full text-zinc-950 font-black text-xs shadow-[0_0_10px_rgba(245,158,11,0.5)]">
        {level}
      </div>
      <div className="flex flex-col w-24 gap-1">
        <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
          <span>XP</span>
          <span>{xp}/{xpNeeded}</span>
        </div>
        <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-amber-500 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
