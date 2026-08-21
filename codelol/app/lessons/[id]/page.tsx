'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { allLessons } from '@/lib/lessons';
import { useRoast } from '@/hooks/useRoast';
import { RoastCard } from '@/components/RoastCard';
import { useMemeSound } from '@/hooks/useMemeSound';

export default function LessonExplanationPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  
  const lesson = allLessons.find(l => l.id === id);
  const examples = lesson?.examples || [];
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isRoasting, roastStatus, roastData, roastError, handleRoast, clearRoast } = useRoast();
  const { playMemeSound } = useMemeSound();

  const handleExplain = async (code: string) => {
    if (!code) return;
    await handleRoast(code);
    playMemeSound(false); // Play meme sound when roast finishes
  };

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
    } else {
      // Auto-transition to the execution page
      router.push(`/playground?snippet=${lesson.id}`);
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
    <div className="min-h-[calc(100vh-4rem)] bg-zinc-950 text-zinc-50 p-4 md:p-8 flex flex-col items-center justify-center">
      
      {/* Book Container */}
      <div className="w-full max-w-6xl bg-zinc-900 border-4 border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row relative">
        
        {/* Book Binding/Gutter effect */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-8 -ml-4 bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 border-x border-zinc-800/50 shadow-inner z-10 pointer-events-none"></div>

        {/* LEFT PAGE: Concept & Jokes */}
        <div className="w-full lg:w-1/2 flex flex-col p-8 md:p-12 bg-zinc-900 border-b lg:border-b-0 lg:border-r border-zinc-800/50 min-h-[500px]">
          
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-8">
              <button 
                onClick={() => router.push('/lessons')}
                className="text-zinc-400 hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-800 bg-zinc-950/50 border border-zinc-800"
                aria-label="Go back"
              >
                ←
              </button>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{lesson.sticker}</span>
                <div>
                  <h1 className="text-2xl md:text-3xl font-black text-pink-400">{lesson.title}</h1>
                  <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mt-1">Chapter {lesson.chapter} • Page {currentSlide + 1}</p>
                </div>
              </div>
            </div>

            {currentSlide === 0 && (
              <div className="mb-8 p-6 bg-zinc-950/50 rounded-2xl border border-zinc-800 border-dashed">
                <p className="text-lg text-zinc-300 italic">
                  &quot;{lesson.funnyExplanation}&quot;
                </p>
              </div>
            )}

            <div className="animate-in fade-in duration-500" key={`exp-${currentSlide}`}>
              <h2 className="text-xl font-bold mb-4 text-white">The Concept</h2>
              <p className="text-lg text-zinc-300 leading-relaxed font-medium">
                {currentExample?.explanation || "No explanation provided for this example."}
              </p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-zinc-800/50 flex justify-between items-center lg:justify-start">
            <button 
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full font-bold disabled:opacity-30 transition-all flex items-center gap-2"
            >
              ← Prev Page
            </button>
            <div className="lg:hidden text-zinc-500 text-sm font-mono">
              {currentSlide + 1} / {examples.length}
            </div>
          </div>
        </div>

        {/* RIGHT PAGE: Code & Execution */}
        <div className="w-full lg:w-1/2 flex flex-col p-8 md:p-12 bg-zinc-950 relative min-h-[500px]">
          
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-6 text-zinc-100 flex items-center gap-2">
              <span className="text-pink-500">{"</>"}</span> The Code
            </h2>
            
            <div className="relative group/code animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100" key={`code-${currentSlide}`}>
              <div className="bg-[#0c0c0c] p-6 rounded-2xl border border-zinc-800 font-mono text-sm md:text-base text-zinc-300 overflow-x-auto shadow-inner shadow-black/50">
                <pre><code>{currentExample?.code || "// No code available"}</code></pre>
              </div>
              <button 
                onClick={() => handleExplain(currentExample?.code || "")}
                disabled={isRoasting || !currentExample?.code}
                className="absolute top-4 right-4 bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold py-2 px-4 rounded-xl opacity-90 hover:opacity-100 transition-all shadow-lg hover:shadow-pink-500/20 disabled:opacity-50"
              >
                {isRoasting ? 'Thinking...' : 'Explain this 🤔'}
              </button>
            </div>

            {/* Roast Results */}
            {(isRoasting || roastError || roastData) && (
              <div className="mt-6 animate-in fade-in slide-in-from-top-4 duration-500">
                {isRoasting && (
                  <div className="flex justify-center py-4 text-pink-400">
                    <span className="animate-pulse font-bold tracking-widest text-lg">{roastStatus} 🔥</span>
                  </div>
                )}
                {roastError && <div className="text-red-400 text-sm text-center bg-red-950/30 p-4 rounded-xl border border-red-900/50">{roastError}</div>}
                {roastData && !isRoasting && (
                   <div className="scale-95 origin-top">
                     <RoastCard 
                       roast={roastData.roast}
                       fix={roastData.fix}
                       mood={roastData.mood}
                       gifUrl={roastData.gifUrl}
                       onDismiss={() => clearRoast()}
                       onReplayAudio={() => playMemeSound(false)}
                     />
                   </div>
                )}
              </div>
            )}
          </div>

          {/* Right Page Footer (Next/Execution) */}
          <div className="mt-8 pt-6 border-t border-zinc-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Desktop page indicator */}
            <div className="hidden lg:flex gap-2">
              {examples.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-2 h-2 rounded-full transition-all ${currentSlide === idx ? 'bg-pink-500 scale-125' : 'bg-zinc-800'}`}
                />
              ))}
            </div>

            {currentSlide === examples.length - 1 ? (
              <button 
                onClick={handleNext}
                className="w-full sm:w-auto px-8 py-3 bg-pink-600 hover:bg-pink-500 text-white rounded-full font-bold transition-all shadow-lg shadow-pink-600/20 flex items-center justify-center gap-3 animate-in zoom-in duration-300 group"
              >
                <span>Code It Now</span>
                <span className="group-hover:translate-x-1 transition-transform">🚀</span>
              </button>
            ) : (
              <button 
                onClick={handleNext}
                className="w-full sm:w-auto px-8 py-3 bg-zinc-100 hover:bg-white text-zinc-900 rounded-full font-bold transition-all flex items-center justify-center gap-2 group"
              >
                <span>Turn Page</span>
                <span className="group-hover:translate-x-1 transition-transform">➔</span>
              </button>
            )}
          </div>
          
        </div>
        
      </div>
      
    </div>
  );
}

