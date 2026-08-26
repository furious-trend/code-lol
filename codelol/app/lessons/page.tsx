'use client'

import { useState } from 'react';
import Link from 'next/link';
import { allLessons, Lesson, Tier } from '@/lib/lessons';
import { useRoast } from '@/hooks/useRoast';
import { RoastCard } from '@/components/RoastCard';
import { Bugsy } from '@/components/Bugsy';

function LessonCard({ lesson }: { lesson: Lesson }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState<number | null>(null);
  const { isRoasting, roastStatus, roastData, roastError, handleRoast, clearRoast } = useRoast();

  const handleExpand = () => {
    if (!isExpanded) {
      setCurrentSlide(0);
      setQuizAnswered(null);
      clearRoast();
    }
    setIsExpanded(!isExpanded);
  };

  const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, 1));
  const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-between hover:border-pink-500/50 transition-colors shadow-lg relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="mb-6">
        <div 
          className="flex items-center justify-between cursor-pointer group/header"
          onClick={handleExpand}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">{lesson.sticker}</span>
            <h3 className="text-2xl font-bold group-hover/header:text-pink-400 transition-colors">{lesson.title}</h3>
          </div>
          <span className="text-zinc-500 bg-zinc-800 rounded-full w-8 h-8 flex items-center justify-center group-hover/header:bg-pink-500 group-hover/header:text-white transition-colors">
            {isExpanded ? '▲' : '▼'}
          </span>
        </div>
        
        {/* Expanded Carousel Area */}
        {isExpanded ? (
          <div className="mt-4 animate-in fade-in slide-in-from-top-4 duration-500 flex flex-col min-h-[250px]">
            
            {/* Slide 0: The Concept */}
            {currentSlide === 0 && (
              <div className="flex-1 flex flex-col justify-center animate-in fade-in duration-300">
                <h4 className="text-pink-400 font-bold mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                  <span>📖</span> Step 1: The Concept
                </h4>
                <p className="text-zinc-200 text-lg leading-relaxed bg-zinc-950/50 p-6 rounded-xl border border-zinc-800/50 shadow-inner">
                  {lesson.funnyExplanation}
                </p>
              </div>
            )}

            {/* Slide 1: The Code */}
            {currentSlide === 1 && (
              <div className="flex-1 flex flex-col justify-center animate-in fade-in duration-300">
                <h4 className="text-pink-400 font-bold mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                  <span>💻</span> Step 2: See It In Action
                </h4>
                <div className="relative group/code">
                  <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-sm font-mono text-zinc-400 overflow-x-auto shadow-inner">
                    <pre><code>{lesson.codeExample}</code></pre>
                  </div>
                  <button 
                    onClick={() => handleRoast(lesson.codeExample)}
                    disabled={isRoasting}
                    className="absolute top-2 right-2 bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold py-1 px-3 rounded-lg opacity-80 hover:opacity-100 transition-opacity disabled:opacity-50"
                  >
                    {isRoasting ? 'Thinking...' : 'Explain this 🤔'}
                  </button>
                </div>

                {/* Roast Results */}
                {(isRoasting || roastError || roastData) && (
                  <div className="mt-4 pt-4 border-t border-zinc-800 animate-in fade-in slide-in-from-top-4 duration-500">
                    {isRoasting && (
                      <div className="flex flex-col items-center gap-4 py-6 text-amber-400">
                        <Bugsy size={64} mood="dizzy" />
                        <span className="animate-pulse font-bold tracking-widest">{roastStatus}</span>
                      </div>
                    )}
                    {roastError && <div className="text-red-400 text-sm">{roastError}</div>}
                    {roastData && !isRoasting && (
                       <RoastCard 
                         roast={roastData.roast}
                         fix={roastData.fix}
                         mood={roastData.mood}
                         gifUrl={roastData.gifUrl}
                         onDismiss={() => clearRoast()}
                       />
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Slide Navigation controls */}
            <div className="mt-8 flex items-center justify-between border-t border-zinc-800 pt-4">
              <button 
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="px-4 py-2 text-sm font-bold text-zinc-400 hover:text-white disabled:opacity-30 transition-colors flex items-center gap-2"
              >
                ← Back
              </button>
              
              <div className="flex gap-2">
                {[0, 1].map(dot => (
                  <div 
                    key={dot} 
                    className={`w-2 h-2 rounded-full transition-colors ${currentSlide === dot ? 'bg-pink-500' : 'bg-zinc-700'}`}
                  />
                ))}
              </div>

              <button 
                onClick={nextSlide}
                disabled={currentSlide === 1}
                className="px-4 py-2 text-sm font-bold text-zinc-400 hover:text-white disabled:opacity-30 transition-colors flex items-center gap-2"
              >
                Next →
              </button>
            </div>
          </div>
        ) : (
          /* Collapsed state preview */
          <div>
            <p className="text-zinc-400 leading-relaxed line-clamp-2">
              {lesson.funnyExplanation}
            </p>
            <div className="mt-4 text-pink-500 text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
              Click to start learning <span>→</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4 mt-4">
        <Link 
          href={`/lessons/${lesson.id}`}
          className={`flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold py-3 px-6 rounded-full transition-transform text-center flex items-center justify-center gap-2 ${isExpanded ? 'hover:scale-105 active:scale-95' : 'opacity-80 hover:opacity-100'}`}
        >
          Learn In Depth 📚
        </Link>
        <Link 
          href={`/playground?snippet=${lesson.id}`}
          className={`flex-1 bg-zinc-100 hover:bg-white text-zinc-950 font-bold py-3 px-6 rounded-full transition-transform text-center flex items-center justify-center gap-2 ${isExpanded ? 'hover:scale-105 active:scale-95' : 'opacity-80 hover:opacity-100'}`}
        >
          Try It Out <span className="text-xl">🚀</span>
        </Link>
      </div>
    </div>
  );
}

export default function LessonsPage() {
  const [activeTier, setActiveTier] = useState<Tier>('Beginner');

  const filteredLessons = allLessons.filter(lesson => lesson.tier === activeTier);

  // Group lessons by chapter
  const groupedLessons = filteredLessons.reduce((acc, lesson) => {
    if (!acc[lesson.chapter]) {
      acc[lesson.chapter] = [];
    }
    acc[lesson.chapter].push(lesson);
    return acc;
  }, {} as Record<string, typeof filteredLessons>);

  // Sort chapters numerically if they contain "Chapter X"
  const sortedChapters = Object.keys(groupedLessons).sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)?.[0] || '0');
    const numB = parseInt(b.match(/\d+/)?.[0] || '0');
    return numA - numB;
  });

  return (
    <div className="min-h-screen bg-zinc-950 p-6 md:p-12 font-sans selection:bg-pink-500/30">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-purple-600 mb-4 animate-in fade-in slide-in-from-top-4 duration-500">
            Learn To Code, Without The Boring Parts.
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
            Select your skill level and get roasted while you learn.
          </p>
        </header>

        {/* Tier Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {(["Beginner", "Intermediate", "Expert", "Interview"] as Tier[]).map((tier) => (
            <button
              key={tier}
              onClick={() => setActiveTier(tier)}
              className={`px-8 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 ${
                activeTier === tier 
                  ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/25 scale-105'
                  : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>

        {/* Chapters and Lessons Grid */}
        <div className="space-y-16">
          {sortedChapters.map((chapterName, idx) => (
            <div 
              key={chapterName} 
              className="animate-in fade-in slide-in-from-bottom-4 duration-500" 
              style={{ animationDelay: `${Math.min(idx * 100, 500)}ms` }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-pink-400 mb-6 border-b border-zinc-800 pb-2">
                {chapterName}
              </h2>
              <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                {groupedLessons[chapterName].map(lesson => (
                  <LessonCard key={lesson.id} lesson={lesson} />
                ))}
              </div>
            </div>
          ))}
          
          {sortedChapters.length === 0 && (
            <div className="text-center p-12 bg-zinc-900 rounded-3xl border border-zinc-800 text-zinc-400">
              No lessons available in this tier yet. Check back soon!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
