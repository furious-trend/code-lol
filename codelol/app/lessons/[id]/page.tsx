'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { allLessons } from '@/lib/lessons';
import { useRoast } from '@/hooks/useRoast';
import { RoastCard } from '@/components/RoastCard';

export default function LessonExplanationPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  
  const lesson = allLessons.find(l => l.id === id);
  const examples = lesson?.examples || [];
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isRoasting, roastStatus, roastData, roastError, handleRoast, clearRoast } = useRoast();

  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-zinc-950 text-zinc-50 p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Lesson not found 😢</h1>
        <button onClick={() => router.push('/lessons')} className="px-6 py-2 bg-pink-600 rounded-full hover:bg-pink-500 font-bold transition-colors">
          Go Back
        </button>
      </div>
    );
  }

  const handleNext = () => {
    if (currentSlide < examples.length - 1) {
      setCurrentSlide(s => s + 1);
      clearRoast();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(s => s - 1);
      clearRoast();
    }
  };

  const currentExample = examples[currentSlide];

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] p-6 md:p-12 gap-8 bg-zinc-950 text-zinc-50 font-sans max-w-4xl mx-auto w-full">
      
      <div className="flex items-center gap-4 border-b border-zinc-800 pb-6">
        <button 
          onClick={() => router.push('/lessons')}
          className="text-zinc-400 hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-800"
          aria-label="Go back"
        >
          ←
        </button>
        <span className="text-4xl">{lesson.sticker}</span>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">{lesson.title}</h1>
          <p className="text-zinc-400 text-sm font-mono mt-1">Tier: {lesson.tier}</p>
        </div>
      </div>

      {examples.length === 0 ? (
        <div className="text-center p-12 bg-zinc-900 rounded-3xl border border-zinc-800">
          <p className="text-zinc-400 mb-4">No examples found for this lesson yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="flex items-center justify-between">
            <h2 className="text-pink-400 font-bold uppercase tracking-widest text-sm">
              Example {currentSlide + 1} of {examples.length}
            </h2>
            <div className="flex gap-2">
              {examples.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-2 h-2 rounded-full transition-all ${currentSlide === idx ? 'bg-pink-500 scale-125' : 'bg-zinc-700'}`}
                />
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-6" key={currentSlide}>
            <p className="text-xl md:text-2xl text-zinc-200 leading-relaxed font-medium animate-in fade-in duration-300">
              {currentExample.explanation}
            </p>
            
            <div className="relative group/code animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
              <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 text-sm md:text-base font-mono text-zinc-300 overflow-x-auto shadow-inner">
                <pre><code>{currentExample.code}</code></pre>
              </div>
              <button 
                onClick={() => handleRoast(currentExample.code)}
                disabled={isRoasting}
                className="absolute top-3 right-3 bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold py-2 px-4 rounded-lg opacity-90 hover:opacity-100 transition-all shadow-lg hover:shadow-pink-500/20 disabled:opacity-50"
              >
                {isRoasting ? 'Roasting...' : 'Roast this 🔥'}
              </button>
            </div>

            {/* Roast Results */}
            {(isRoasting || roastError || roastData) && (
              <div className="mt-4 pt-6 border-t border-zinc-800 animate-in fade-in slide-in-from-top-4 duration-500">
                {isRoasting && (
                  <div className="flex flex-col items-center gap-2 py-4 text-pink-400">
                    <span className="animate-pulse font-bold tracking-widest text-lg">{roastStatus} 🔥</span>
                  </div>
                )}
                {roastError && <div className="text-red-400 text-sm text-center bg-red-950/30 p-4 rounded-lg">{roastError}</div>}
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

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-800">
            <button 
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl font-bold disabled:opacity-30 transition-all flex items-center gap-2"
            >
              ← Previous
            </button>
            
            {currentSlide === examples.length - 1 ? (
              <Link 
                href={`/playground?snippet=${lesson.id}`}
                className="px-6 py-3 bg-pink-600 hover:bg-pink-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-pink-600/20 flex items-center gap-2 animate-in zoom-in duration-300"
              >
                Try It Out 🚀
              </Link>
            ) : (
              <button 
                onClick={handleNext}
                className="px-6 py-3 bg-zinc-100 hover:bg-white text-zinc-900 rounded-xl font-bold transition-all flex items-center gap-2"
              >
                Next Example →
              </button>
            )}
          </div>

        </div>
      )}
      
    </div>
  );
}
