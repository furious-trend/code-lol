'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { problems, Difficulty } from '@/lib/problems';

export default function ProblemsDashboard() {
  const [activeDifficulty, setActiveDifficulty] = useState<Difficulty>('Beginner');
  const [completedProblems, setCompletedProblems] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('completedProblems');
    if (saved) {
      try {
        setCompletedProblems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse completed problems', e);
      }
    }
  }, []);

  const filteredProblems = problems.filter(p => p.difficulty === activeDifficulty);

  return (
    <div className="min-h-screen bg-zinc-950 p-6 md:p-12 font-sans selection:bg-pink-500/30">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-blue-600 mb-4 animate-in fade-in slide-in-from-top-4 duration-500">
            Solve & Conquer.
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
            Test your skills with coding challenges. Select a tier and conquer all 100 levels!
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {(["Beginner", "Intermediate", "Expert"] as const).map((diff) => (
            <button
              key={diff}
              onClick={() => setActiveDifficulty(diff)}
              className={`px-8 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 ${
                activeDifficulty === diff 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-105'
                  : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>

        {/* 100 Levels Grid */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-400 mb-6 flex items-center gap-3">
            <span className="text-3xl">🏆</span> {activeDifficulty} Map
          </h2>
          
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-3">
            {filteredProblems.map((problem, idx) => {
              const isReal = problem.title.includes('Two Sum') || 
                             problem.title.includes('Fizz Buzz') || 
                             problem.title.includes('Reverse String') || 
                             problem.title.includes('Valid Palindrome') || 
                             problem.title.includes('Fibonacci');
                             
              const isCompleted = completedProblems.includes(problem.id);
              
              // Level is unlocked if it's the first level, or if the PREVIOUS level is completed.
              const isUnlocked = idx === 0 || completedProblems.includes(filteredProblems[idx - 1].id);
              
              if (!isUnlocked) {
                return (
                  <div 
                    key={problem.id}
                    className="group relative flex flex-col items-center justify-center p-2 rounded-xl transition-all aspect-square border bg-zinc-900/50 border-zinc-800/50 opacity-60 cursor-not-allowed"
                  >
                    <span className="text-xl md:text-2xl font-black text-zinc-700">
                      {idx + 1}
                    </span>
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl drop-shadow-md">🔒</span>
                  </div>
                )
              }

              return (
                <Link 
                  href={`/problems/${problem.id}`} 
                  key={problem.id}
                  className={`group relative flex flex-col items-center justify-center p-2 rounded-xl transition-all aspect-square border ${
                    isCompleted 
                      ? 'bg-green-900/20 border-green-500/50 hover:bg-green-500/30 hover:scale-105 shadow-[0_0_15px_rgba(34,197,94,0.15)]'
                      : isReal 
                        ? 'bg-blue-900/20 border-blue-500/50 hover:bg-blue-500/30 hover:scale-105 shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
                        : 'bg-zinc-800 border-zinc-700 hover:border-blue-500/50 hover:bg-zinc-700 hover:scale-105'
                  }`}
                >
                  <span className={`text-xl md:text-2xl font-black ${
                    isCompleted ? 'text-green-400' : isReal ? 'text-blue-400' : 'text-zinc-300'
                  }`}>
                    {idx + 1}
                  </span>
                  {isCompleted ? (
                    <span className="absolute -top-2 -right-2 text-lg drop-shadow-md z-10">✅</span>
                  ) : isReal ? (
                    <span className="absolute -top-1 -right-1 text-xs">⭐</span>
                  ) : null}
                </Link>
              )
            })}
          </div>
          
          {filteredProblems.length === 0 && (
            <div className="text-center p-12 bg-zinc-900 rounded-3xl border border-zinc-800 text-zinc-400">
              No levels generated yet!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
