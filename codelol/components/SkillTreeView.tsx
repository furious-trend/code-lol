'use client';
import { motion } from 'framer-motion';
import { allLessons } from '@/lib/lessons';

export default function SkillTreeView({ 
  currentLevel, 
  onSelectLevel 
}: { 
  currentLevel: number;
  onSelectLevel: (level: number) => void;
}) {
    const tiers = ['Beginner', 'Intermediate', 'Expert', 'Interview'];
  const groupedLessons = tiers.map(tier => ({
    tier,
    lessons: allLessons.filter(l => l.tier === tier)
  })).filter(g => g.lessons.length > 0);

  const getTierColor = (tier: string, isUnlocked: boolean) => {
    if (!isUnlocked) return 'border-zinc-800 text-zinc-600 bg-zinc-900/30';
    switch (tier) {
      case 'Beginner': return 'border-green-500 text-green-400 bg-green-950/30';
      case 'Intermediate': return 'border-blue-500 text-blue-400 bg-blue-950/30';
      case 'Expert': return 'border-red-500 text-red-400 bg-red-950/30';
      case 'Interview': return 'border-purple-500 text-purple-400 bg-purple-950/30';
      default: return 'border-zinc-500 text-zinc-400 bg-zinc-900';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
      <div className="max-w-4xl mx-auto space-y-24 pb-32">
        {groupedLessons.map((group, groupIdx) => (
          <div key={group.tier} className="relative">
            {/* Tier Header */}
            <div className="sticky top-0 z-10 bg-zinc-950/80 backdrop-blur-md py-4 mb-8 text-center border-b border-zinc-800">
              <h2 className="text-3xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">
                {group.tier}
              </h2>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 relative z-0">
              {group.lessons.map((lesson, idx) => {
                const lessonLevel = allLessons.findIndex(l => l.id === lesson.id) + 1;
                const isCompleted = lessonLevel < currentLevel;
                const isCurrent = lessonLevel === currentLevel;
                const isUnlocked = lessonLevel <= currentLevel;
                // Add a glow to the very next locked level
                const isNextLocked = lessonLevel === currentLevel + 1;

                return (
                  <div key={lesson.id} className="relative group">
                    <button
                      disabled={!isUnlocked}
                      onClick={() => onSelectLevel(lessonLevel)}
                      className={`
                        w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex flex-col items-center justify-center gap-2 border-2 transition-all
                        ${getTierColor(group.tier, isUnlocked)}
                        ${isCurrent ? 'animate-pulse-glow border-[var(--color-discovery-teal)] shadow-[0_0_20px_var(--color-discovery-glow)] z-10 scale-110' : ''}
                        ${isCompleted ? 'hover:scale-105 opacity-80 cursor-pointer' : ''}
                        ${!isUnlocked ? 'opacity-40 cursor-not-allowed' : ''}
                      `}
                    >
                      <span className="text-2xl sm:text-3xl filter drop-shadow-md">
                        {isUnlocked ? lesson.sticker : '🔒'}
                      </span>
                      <span className="text-xs sm:text-sm font-bold">{lessonLevel}</span>
                    </button>

                    {/* Tooltip on hover */}
                    <div className="absolute -bottom-2 translate-y-full left-1/2 -translate-x-1/2 w-48 p-3 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 hidden sm:block">
                      <p className="text-sm font-bold text-white mb-1">{isUnlocked ? lesson.title : "Mystery Lesson"}</p>
                      {isNextLocked && (
                        <p className="text-xs text-[var(--color-discovery-teal)] italic">
                          Sneak peek: Coming up next... The concept that breaks half of beginners! 😏
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
