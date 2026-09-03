'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

const TRIVIA = [
  "The first computer bug was an actual real-life moth found inside a Harvard Mark II computer in 1947.",
  "JavaScript was created in just 10 days in 1995 by Brendan Eich.",
  "The word 'algorithm' is named after a Persian mathematician, Al-Khwarizmi.",
  "Python is named after the British comedy troupe 'Monty Python', not the snake.",
  "C is often called the mother of all programming languages.",
  "The first domain name ever registered was Symbolics.com on March 15, 1985.",
  "Margaret Hamilton's code for the Apollo 11 mission was stacked so high it was taller than her.",
  "Nintendo began as a playing card company in 1889, long before video games.",
  "The first computer mouse, invented in 1964 by Doug Engelbart, was made of wood.",
  "HTML is not a programming language; it's a markup language."
];

export default function CuriosityHook() {
  const [isVisible, setIsVisible] = useState(false);
  const [triviaIndex, setTriviaIndex] = useState(0);

  return (
    <div className="my-8">
      {!isVisible ? (
        <button 
          onClick={() => {
            setTriviaIndex(Math.floor(Math.random() * TRIVIA.length));
            setIsVisible(true);
          }}
          className="group flex items-center justify-center w-full py-4 text-[var(--color-discovery-teal)] hover:text-white transition-colors"
        >
          <div className="flex items-center gap-2 px-6 py-2 rounded-full border border-[var(--color-discovery-teal)]/30 group-hover:border-[var(--color-discovery-teal)] group-hover:bg-[var(--color-discovery-teal)]/10 transition-all shadow-[0_0_15px_rgba(0,229,255,0.1)] group-hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]">
            <Lightbulb size={18} className="animate-pulse" />
            <span className="text-sm font-medium tracking-wide uppercase">Discover a Fact</span>
          </div>
        </button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative overflow-hidden rounded-xl border border-[var(--color-discovery-teal)]/50 bg-[#141426] p-6 shadow-[0_0_30px_rgba(0,229,255,0.15)]"
          >
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-[var(--color-discovery-teal)] opacity-10 rounded-full blur-3xl"></div>
            
            <div className="flex items-start gap-4 relative z-10">
              <div className="flex-shrink-0 bg-[var(--color-discovery-teal)]/20 p-3 rounded-full text-[var(--color-discovery-teal)] shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                <Lightbulb size={24} />
              </div>
              <div className="flex-1">
                <h4 className="text-[var(--color-discovery-teal)] text-xs font-bold uppercase tracking-wider mb-2">Did you know?</h4>
                <p className="text-gray-300 font-medium leading-relaxed">
                  {TRIVIA[triviaIndex]}
                </p>
              </div>
              <button 
                onClick={() => setIsVisible(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
