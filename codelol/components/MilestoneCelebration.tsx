'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bugsy } from './Bugsy';
import ReactConfetti from 'react-confetti';

interface MilestoneCelebrationProps {
  milestone: number;
  type: 'problem' | 'level';
  onDismiss: () => void;
}

export function MilestoneCelebration({ milestone, type, onDismiss }: MilestoneCelebrationProps) {
  const [windowDimension, setWindowDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {windowDimension.width > 0 && (
          <ReactConfetti
            width={windowDimension.width}
            height={windowDimension.height}
            recycle={false}
            numberOfPieces={500}
            gravity={0.2}
          />
        )}
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onDismiss}
        />
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="bg-zinc-900 border-2 border-amber-500 rounded-3xl p-8 max-w-sm w-full relative z-10 flex flex-col items-center text-center shadow-[0_0_50px_rgba(245,158,11,0.3)]"
        >
          <div className="absolute -top-16 left-1/2 -translate-x-1/2">
            <div className="bg-amber-500 rounded-full p-2 shadow-lg shadow-amber-500/50">
              <Bugsy size={100} mood="happy" />
            </div>
          </div>
          
          <h2 className="text-3xl font-black text-amber-400 mt-12 mb-2 uppercase tracking-tight">
            Milestone Reached!
          </h2>
          <p className="text-zinc-300 text-lg mb-6">
            You&apos;ve completed <span className="font-bold text-white">{milestone}</span> {type}s! Bugsy is extremely proud of you.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDismiss}
            className="w-full bg-amber-500 hover:bg-amber-400 text-amber-950 font-black py-3 px-6 rounded-full transition-colors"
          >
            Keep Being Awesome 🚀
          </motion.button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
