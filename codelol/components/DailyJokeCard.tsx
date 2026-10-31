// agent-notes: { ctx: "Daily joke card with client-side shuffle and copy to clipboard", deps: ["@/lib/jokes", "framer-motion"], state: "active", last: "sato@2026-10-31" }
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRandomJoke } from '@/lib/jokes';

interface DailyJokeCardProps {
  initialJoke: string;
}

export function DailyJokeCard({ initialJoke }: DailyJokeCardProps) {
  const [currentJoke, setCurrentJoke] = useState(initialJoke);
  const [copied, setCopied] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const handleShuffle = () => {
    setIsShuffling(true);
    setTimeout(() => {
      let next = getRandomJoke();
      while (next === currentJoke && next.length > 1) {
        next = getRandomJoke();
      }
      setCurrentJoke(next);
      setIsShuffling(false);
    }, 150);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentJoke);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800/90 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-yellow-500/50 transition-all col-span-1 md:col-span-2 lg:col-span-1 shadow-xl shadow-yellow-500/5 relative overflow-hidden group backdrop-blur-xl">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500"></div>
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-yellow-400 font-extrabold uppercase tracking-widest text-xs flex items-center gap-1.5">
            <span className="text-sm">💡</span> Joke of the Day
          </span>
          <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleShuffle}
              type="button"
              className="p-1.5 rounded-lg bg-zinc-800/70 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all text-xs flex items-center gap-1"
              title="Shuffle joke"
            >
              <svg className={`w-3.5 h-3.5 ${isShuffling ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="hidden sm:inline">Shuffle</span>
            </button>
            <button
              onClick={handleCopy}
              type="button"
              className="p-1.5 rounded-lg bg-zinc-800/70 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all text-xs"
              title="Copy joke"
            >
              {copied ? '✓' : (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={currentJoke}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="text-lg sm:text-xl font-medium leading-relaxed text-zinc-100"
          >
            &quot;{currentJoke}&quot;
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-800/60">
        <span className="text-xs text-zinc-500 font-mono">dev_humor.exe</span>
        <span className="text-2xl group-hover:scale-125 transition-transform duration-300 cursor-default">😂</span>
      </div>
    </div>
  );
}
