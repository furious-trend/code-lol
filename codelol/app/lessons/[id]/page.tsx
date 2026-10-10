// agent-notes: { ctx: "Individual lesson deep-dive explanation page with interactive concepts and code", deps: ["@/lib/lessons", "@/components/RoastCard"], state: active, last: "sato@2026-09-23" }
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { allLessons } from '@/lib/lessons';
import { useRoast } from '@/hooks/useRoast';
import { RoastCard } from '@/components/RoastCard';
import { useMemeSound } from '@/hooks/useMemeSound';


export default function LessonExplanationPage() {
  const params = useParams();
  const router = useRouter();
  const idParam = params.id as string;
  const numericId = Number(idParam);
  
  const [humorPref, setHumorPref] = useState<'general' | 'tamil'>('general');
  const [learningLanguage, setLearningLanguage] = useState<string>('javascript');
  const [isLangLoaded, setIsLangLoaded] = useState(false);
  const [lesson, setLesson] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isPython = isNaN(numericId);
  const examples = isPython && lesson ? [
    {
      title: lesson.title,
      explanation: lesson.explanation,
      code: lesson.codeExample,
      lineExplanation: lesson.funnyLineGeneral || "",
      memeNote: lesson.funnyLineTamil || ""
    }
  ] : (lesson?.workoutSteps || lesson?.examples || lesson?.lessons || []);
  const hasWorkoutSteps = !!lesson?.workoutSteps || isPython;
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isRoasting, roastStatus, roastData, roastError, handleRoast, clearRoast } = useRoast();
  const { playMemeSound } = useMemeSound();
  const supabase = createClient();

  useEffect(() => {
    async function loadPref() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        if (user.id === 'local-guest') {
          const storedHumor = localStorage.getItem('guest_humor');
          if (storedHumor === 'tamil' || storedHumor === 'general') setHumorPref(storedHumor);
          const storedLang = localStorage.getItem('guest_lang');
          if (storedLang === 'python' || storedLang === 'javascript') setLearningLanguage(storedLang);
        } else {
          const { data: profile } = await supabase
            .from('profiles')
            .select('humor_preference, learning_language')
            .eq('id', user.id)
            .single();
          if (profile?.humor_preference) {
            setHumorPref(profile.humor_preference);
          }
          if (profile?.learning_language) {
            setLearningLanguage(profile.learning_language);
          }
        }
      }
      setIsLangLoaded(true);
    }
    loadPref();
  }, [supabase]);

  useEffect(() => {
    if (!isLangLoaded) return;
    setIsLoading(true);
    if (isNaN(numericId)) {
      // It's a string ID, must be Python
      if (learningLanguage !== 'python') {
        router.push('/lessons');
        return;
      }
      import('@/lib/python/curriculum').then(module => {
        const curriculum = module.pythonCurriculum;
        let foundLesson = null;
        for (const chapter of curriculum) {
          const l = chapter.lessons.find((l: any) => l.id === idParam);
          if (l) {
            foundLesson = { ...l, chapter: chapter.title };
            break;
          }
        }
        setLesson(foundLesson);
        setIsLoading(false);
      });
    } else {
      // It's a numeric ID, search JS, C, C++, Java
      if (learningLanguage === 'python') {
        router.push('/lessons');
        return;
      }
      import('@/lib/lessons').then(module => {
        const foundLesson = 
          module.allLessons.find(l => l.id === numericId) ||
          module.cAllLessons.find(l => l.id === numericId) ||
          module.cppAllLessons.find(l => l.id === numericId) ||
          module.javaAllLessons.find(l => l.id === numericId);
          
        setLesson(foundLesson);
        setIsLoading(false);
      });
    }
  }, [idParam, numericId, learningLanguage, router, isLangLoaded]);

  const handleExplain = async (code: string) => {
    if (!code) return;
    await handleRoast(code, undefined, undefined, undefined, humorPref);
    playMemeSound(false, humorPref); // Play meme sound when roast finishes
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-zinc-950 text-zinc-50 p-6 text-center">
        <div className="animate-spin text-4xl mb-4">⚙️</div>
        <h1 className="text-2xl font-bold text-zinc-400">Loading lesson...</h1>
      </div>
    );
  }

  if (!lesson && !isLoading) {
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
      router.push(isPython ? `/learn?language=python&level=${lesson.id}` : `/learn?level=${lesson.id}`);
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

            {currentSlide === 0 && lesson.biteSized && (
              <div className="mb-8 space-y-6">
                <div className="p-6 bg-zinc-950/50 rounded-2xl border border-zinc-800 border-dashed">
                  <h3 className="text-xl font-bold text-white mb-2">Meaning</h3>
                  <p className="text-zinc-300 leading-relaxed">
                    {humorPref === 'general' && lesson.biteSized.meaningGeneral ? lesson.biteSized.meaningGeneral : lesson.biteSized.meaning}
                  </p>
                </div>
                {((humorPref === 'tamil' && lesson.biteSized.funnyEgTamil) || (humorPref === 'general' && (lesson.biteSized.funnyEgGeneral || lesson.biteSized.funnyEgTamil))) && (
                  <div className="p-6 bg-pink-950/20 rounded-2xl border border-pink-900/50">
                    <h3 className="text-lg font-bold text-pink-400 mb-2">Funny Eg ({humorPref === 'tamil' ? 'Tamil' : 'General'})</h3>
                    <p className="text-pink-200/90 leading-relaxed italic">
                      &quot;{humorPref === 'general' && lesson.biteSized.funnyEgGeneral ? lesson.biteSized.funnyEgGeneral : lesson.biteSized.funnyEgTamil}&quot;
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {currentSlide === 0 && !lesson.biteSized && lesson.deepConcept && (
              <div className="mb-8 space-y-6">
                <div className="p-6 bg-zinc-950/50 rounded-2xl border border-zinc-800 border-dashed">
                  <h3 className="text-xl font-bold text-white mb-2">What is it?</h3>
                  <p className="text-zinc-300 leading-relaxed">{lesson.deepConcept.whatIsIt}</p>
                </div>
                <div className="p-6 bg-zinc-950/50 rounded-2xl border border-zinc-800 border-dashed">
                  <h3 className="text-xl font-bold text-white mb-2">Under the Hood</h3>
                  <p className="text-zinc-300 leading-relaxed">{lesson.deepConcept.underTheHood}</p>
                </div>
              </div>
            )}
            
            {currentSlide === 0 && !lesson.biteSized && lesson.humor && lesson.humor[humorPref] && (
              <div className="mb-8 space-y-6">
                <div className="p-6 bg-pink-950/20 rounded-2xl border border-pink-900/50">
                  <h3 className="text-lg font-bold text-pink-400 mb-2">Analogy ({humorPref === 'tamil' ? 'Tamil' : 'General'})</h3>
                  <p className="text-pink-200/90 leading-relaxed italic">&quot;{lesson.humor[humorPref].analogy}&quot;</p>
                  {lesson.humor[humorPref].punchline && (
                    <p className="text-pink-300 mt-2 font-bold">{lesson.humor[humorPref].punchline}</p>
                  )}
                </div>
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={`exp-${currentSlide}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {hasWorkoutSteps ? (
                  <>
                    <h2 className="text-xl font-bold mb-4 text-white">{currentExample?.title || "Workout Step"}</h2>
                    <p className="text-lg text-zinc-300 leading-relaxed font-medium">
                      {currentExample?.lineExplanation}
                    </p>
                    {currentExample?.memeNote && (
                      <p className="mt-4 text-sm text-yellow-400 italic font-mono">
                        Note: {currentExample.memeNote}
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-bold mb-4 text-white">The Concept</h2>
                    <p className="text-lg text-zinc-300 leading-relaxed font-medium">
                      {currentExample?.explanation || "No explanation provided for this example."}
                    </p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
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
            
            <AnimatePresence mode="wait">
              <motion.div
                key={`code-${currentSlide}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative group/code delay-100"
              >
                <div className="bg-[#0c0c0c] p-6 rounded-2xl border border-zinc-800 font-mono text-sm md:text-base text-zinc-300 overflow-x-auto shadow-inner shadow-black/50">
                  <pre><code>{currentExample?.code || "// No code available"}</code></pre>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleExplain(currentExample?.code || "")}
                  disabled={isRoasting || !currentExample?.code}
                  className="absolute top-4 right-4 bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold py-2 px-4 rounded-xl opacity-90 hover:opacity-100 transition-colors shadow-lg hover:shadow-pink-500/20 disabled:opacity-50"
                >
                  {isRoasting ? 'Thinking...' : 'Explain this 🤔'}
                </motion.button>
              </motion.div>
            </AnimatePresence>

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
                       onReplayAudio={() => playMemeSound(false, humorPref)}
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
              {examples.map((_: any, idx: number) => (
                <div 
                  key={idx} 
                  className={`w-2 h-2 rounded-full transition-all ${currentSlide === idx ? 'bg-pink-500 scale-125' : 'bg-zinc-800'}`}
                />
              ))}
            </div>

            {currentSlide === examples.length - 1 ? (
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="w-full sm:w-auto px-8 py-3 bg-pink-600 hover:bg-pink-500 text-white rounded-full font-bold transition-colors shadow-lg shadow-pink-600/20 flex items-center justify-center gap-3 animate-in zoom-in duration-300 group"
              >
                <span>Code It Now</span>
                <span className="group-hover:translate-x-1 transition-transform">🚀</span>
              </motion.button>
            ) : (
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="w-full sm:w-auto px-8 py-3 bg-zinc-100 hover:bg-white text-zinc-900 rounded-full font-bold transition-colors flex items-center justify-center gap-2 group"
              >
                <span>Turn Page</span>
                <span className="group-hover:translate-x-1 transition-transform">➔</span>
              </motion.button>
            )}
          </div>
          
        </div>
        
      </div>
      
    </div>
  );
}

