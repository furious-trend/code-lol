'use client'

import { useState, useEffect, Suspense } from 'react';
import Editor from '@monaco-editor/react';
import { createClient } from '@/lib/supabase/client';
import { allLessons } from '@/lib/lessons';
import Link from 'next/link';
import { useRoast } from '@/hooks/useRoast';
import { RoastCard } from '@/components/RoastCard';
import { executeCodeInBrowser } from '@/lib/executor';
import { useMemeSound } from '@/hooks/useMemeSound';
import { saveLessonProgress } from '@/lib/progress';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import SkillTreeView from '@/components/SkillTreeView';
import CuriosityHook from '@/components/CuriosityHook';
import { Map, LayoutList } from 'lucide-react';
import { useMicroCelebration } from '@/hooks/useMicroCelebration';

function LearnPageContent() {
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [humorPref, setHumorPref] = useState<'general' | 'tamil'>('general');
  const [isInitializing, setIsInitializing] = useState(true);
  const [viewMode, setViewMode] = useState<'lesson' | 'map'>('lesson');
  const [isLoadingLevel, setIsLoadingLevel] = useState(false);
  const supabase = createClient();

  // Load progress on mount
  useEffect(() => {
    async function loadProgress() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('current_level, humor_preference')
          .eq('id', user.id)
          .single();
        if (profile?.current_level) {
          // Ensure we don't go out of bounds if they completed everything
          const maxLevel = Math.min(profile.current_level, allLessons.length);
          setCurrentLevel(Math.max(1, maxLevel));
        }
        if (profile?.humor_preference) {
          setHumorPref(profile.humor_preference);
        }
      }
      setIsInitializing(false);
    }
    loadProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isInitializing) {
    return <div className="flex h-screen items-center justify-center bg-zinc-950 text-white">Loading your progress...</div>;
  }

  const handleSelectLevel = (level: number) => {
    setIsLoadingLevel(true);
    setTimeout(() => {
      setCurrentLevel(level);
      setViewMode('lesson');
      setIsLoadingLevel(false);
    }, 1500); // 1.5s loading transition
  };

  const getTierFlavorText = (level: number) => {
    const lesson = allLessons[level - 1];
    if (!lesson) return "Loading...";
    switch(lesson.tier) {
      case 'Beginner': return "Warming up the engines...";
      case 'Intermediate': return "Things are getting interesting...";
      case 'Expert': return "Brain melting sequence initiated 🤯";
      case 'Interview': return "Advanced territory ahead 🔥";
      default: return "Loading next challenge...";
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-zinc-950 text-zinc-50 relative">
      {/* View Toggle */}
      <div className="absolute top-4 right-4 z-50 flex bg-zinc-900 border border-zinc-700 rounded-lg p-1 shadow-lg">
        <button 
          onClick={() => setViewMode('lesson')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === 'lesson' ? 'bg-[var(--color-discovery-teal)] text-black' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          <LayoutList size={16} /> Lesson
        </button>
        <button 
          onClick={() => setViewMode('map')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === 'map' ? 'bg-[var(--color-discovery-teal)] text-black' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          <Map size={16} /> Map
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isLoadingLevel ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center gap-4"
          >
            <div className="w-16 h-16 border-4 border-[var(--color-discovery-teal)] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xl font-bold text-[var(--color-discovery-teal)] animate-pulse">{getTierFlavorText(currentLevel)}</p>
          </motion.div>
        ) : viewMode === 'map' ? (
          <motion.div key="map" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="flex-1 flex flex-col h-full w-full absolute inset-0 pt-16">
            <SkillTreeView currentLevel={currentLevel} onSelectLevel={handleSelectLevel} />
          </motion.div>
        ) : (
          <motion.div key="lesson" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex-1 flex flex-col pt-12">
            <LessonView 
              currentLevel={currentLevel} 
              setCurrentLevel={handleSelectLevel} 
              humorPref={humorPref} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LessonView({ currentLevel, setCurrentLevel, humorPref }: { currentLevel: number, setCurrentLevel: (level: number) => void, humorPref: 'general' | 'tamil' }) {
  const lesson = allLessons[currentLevel - 1];
  
  // Editor & Run State
  const [code, setCode] = useState(lesson?.codeExample || '');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [hasRunSuccessfully, setHasRunSuccessfully] = useState(false);

  // Auto-roast state handled by hook
  const { isRoasting, roastStatus, roastData, roastError, handleRoast, clearRoast } = useRoast();
  const { playMemeSound } = useMemeSound();
  const [lessonGif, setLessonGif] = useState<string | null>(null);

  // Quiz State
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizState, setQuizState] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [quizGif, setQuizGif] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Tier Completion State
  const [showTierComplete, setShowTierComplete] = useState(false);

  // Micro celebrations
  const { triggerCelebration: triggerFirstRoast } = useMicroCelebration('first_roast');

  const fetchLessonGif = async (keyword: string) => {
    setLessonGif(null);
    try {
      const gifRes = await fetch(`/api/gif?keyword=${encodeURIComponent(keyword)}`);
      const gifData = await gifRes.json();
      if (gifRes.ok && gifData.url) setLessonGif(gifData.url);
    } catch {
      console.error("Failed to load lesson gif");
    }
  };

  // Reset state when lesson changes
  useEffect(() => {
    if (!lesson) return;
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCode(lesson.codeExample);
    setOutput('');
    setHasRunSuccessfully(false);
    setSelectedOption(null);
    setQuizState('idle');
    setQuizGif(null);
    setShowTierComplete(false);
    
    // Fetch context GIF for lesson
    fetchLessonGif(lesson.gifKeyword);
  }, [lesson]);

  if (!lesson) {
    return (
      <div className="flex h-screen items-center justify-center flex-col gap-6 bg-zinc-950 text-white">
        <h1 className="text-4xl font-bold">More Levels Coming Soon!</h1>
        <p className="text-zinc-400">You&apos;ve reached the end of the available content. CodeLOL is expanding!</p>
        <Link href="/" className="bg-blue-600 hover:bg-blue-500 py-2 px-6 rounded-lg font-bold">Go Home</Link>
      </div>
    );
  }

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Running...');
    clearRoast();
    
    if (lesson.topicRequirement) {
      const regex = new RegExp(lesson.topicRequirement.pattern);
      if (!regex.test(code)) {
        const errorOutput = `Error: ${lesson.topicRequirement.errorMessage}`;
        setOutput(errorOutput);
        await handleRoast(code, errorOutput, false, '', humorPref);
        playMemeSound(false, humorPref);
        setIsRunning(false);
        return;
      }
    }
    
    try {
      const data = await executeCodeInBrowser('javascript', code);
      
      if (!data.error) {
        const finalOutput = data.output || 'Code ran successfully with no output.';
        setOutput(finalOutput);
        
        await handleRoast(code, finalOutput, true, '', humorPref);
        playMemeSound(true, humorPref);
        setHasRunSuccessfully(true);
      } else {
        const errorOutput = `Error: ${data.error}`;
        setOutput(errorOutput);
        
        await handleRoast(code, errorOutput, false, '', humorPref);
        triggerFirstRoast();
        playMemeSound(false, humorPref);
      }
    } catch {
      setOutput('Failed to execute code. Check your connection.');
      await handleRoast(code, 'Failed to execute code.', false, '', humorPref);
      playMemeSound(false, humorPref);
    } finally {
      setIsRunning(false);
    }
  };

  const handleQuizAnswer = async (index: number) => {
    if (quizState === 'correct') return; // already solved
    
    setSelectedOption(index);
    const isCorrect = index === lesson.miniQuizQuestion.correctAnswerIndex;
    
    setQuizState(isCorrect ? 'correct' : 'wrong');
    setQuizGif(null);
    
    try {
      const { getResultGif } = await import('@/lib/localGifs');
      setQuizGif(getResultGif(isCorrect));
    } catch {}

    if (isCorrect) {
      if (currentLevel === 1) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
        playMemeSound(true, humorPref);
      }
      await handleLevelComplete();
    }
  };

  const handleLevelComplete = async () => {
    setIsSaving(true);
    try {
      await saveLessonProgress(currentLevel);
    } catch (e) {
      console.error("Error saving progress", e);
    } finally {
      setIsSaving(false);
    }
  };

  const nextLevel = () => {
    if (currentLevel % 25 === 0) {
      setShowTierComplete(true);
    } else {
      setCurrentLevel(currentLevel + 1);
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Beginner': return 'text-green-400 border-green-500 bg-green-950/30';
      case 'Intermediate': return 'text-blue-400 border-blue-500 bg-blue-950/30';
      case 'Expert': return 'text-red-400 border-red-500 bg-red-950/30';
      case 'Interview': return 'text-purple-400 border-purple-500 bg-purple-950/30';
      default: return 'text-zinc-400 border-zinc-500 bg-zinc-900';
    }
  };

  if (showTierComplete) {
    return (
      <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center bg-zinc-950 text-white gap-8 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 animate-bounce">
          🎉 TIER COMPLETE! 🎉
        </h1>
        <p className="text-2xl text-zinc-300">You crushed {lesson.tier}! Ready for the next challenge?</p>
        <button 
          onClick={() => { setShowTierComplete(false); setCurrentLevel(currentLevel + 1); }}
          className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 py-4 px-12 rounded-full font-bold text-xl transition-transform hover:scale-110 shadow-[0_0_40px_rgba(168,85,247,0.4)]"
        >
          Bring It On! 🚀
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 p-4 md:p-6 gap-6 font-sans w-full mx-auto overflow-y-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Level {currentLevel} of 100
          </h1>
          <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getTierColor(lesson.tier)}`}>
            {lesson.tier} 🔥
          </div>
        </div>
        <div className="text-sm font-medium text-zinc-500 flex gap-4">
          <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
          <Link href="/lessons" className="hover:text-zinc-300 transition-colors">Library</Link>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-0 flex-1">
        
        {/* Left Panel: Lesson Content */}
        <div className="lg:w-[400px] xl:w-[500px] flex flex-col gap-6 shrink-0 overflow-y-auto pr-2 custom-scrollbar">
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-50"></div>
            
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl drop-shadow-md">{lesson.sticker}</span>
              <h2 className="text-3xl font-bold">{lesson.title}</h2>
            </div>
            
            <p className="text-zinc-300 leading-relaxed text-lg mb-6">
              {humorPref === 'tamil' ? lesson.funnyExplanationTamil : lesson.funnyExplanationGeneral}
            </p>

            {lessonGif && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={lessonGif} alt="Lesson Context" className="w-full h-48 object-cover rounded-xl shadow-lg border border-zinc-700 bg-zinc-800 mb-6" />
            )}

            {/* Auto Roast Area */}
            {isRoasting && (
              <div className="bg-purple-900/20 border border-purple-500/20 rounded-xl p-4 animate-pulse flex flex-col items-center">
                <span className="text-3xl mb-2">🔥</span>
                <p className="text-purple-400 font-bold text-sm tracking-widest text-center">{roastStatus}</p>
              </div>
            )}
            
            {roastError && (
              <div className="bg-red-900/20 border border-red-500/20 rounded-xl p-4">
                <p className="text-red-400 text-sm text-center">{roastError}</p>
              </div>
            )}
            
            {roastData && !isRoasting && (
               <RoastCard 
                 roast={roastData.roast}
                 fix={roastData.fix}
                 mood={roastData.mood}
                 gifUrl={roastData.gifUrl}
                 onDismiss={clearRoast}
               />
            )}

            <CuriosityHook />
          </div>
        </div>

        {/* Right Panel: Editor, Output & Quiz */}
        <div className="flex-1 flex flex-col gap-4 h-[800px] lg:h-auto">
          
          {/* Editor Area */}
          <div className="flex flex-col flex-1 border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-900 shadow-xl min-h-[300px]">
            <div className="bg-zinc-950 border-b border-zinc-800 p-3 px-4 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <button 
                onClick={handleRun}
                disabled={isRunning}
                className={`bg-blue-600 hover:bg-blue-500 text-white font-bold py-1.5 px-6 rounded-md text-sm transition-colors flex items-center gap-2 ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isRunning ? 'Running...' : 'Run Code ▶'}
              </button>
            </div>
            <div className="flex-1 relative">
              <Editor
                height="100%"
                language="javascript"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 15,
                  fontFamily: 'var(--font-geist-mono), monospace',
                  padding: { top: 20, bottom: 20 },
                  scrollBeyondLastLine: false,
                  wordWrap: 'on'
                }}
              />
            </div>
          </div>

          {/* Console Area */}
          <div className="h-40 border border-zinc-800 rounded-2xl overflow-hidden bg-black shadow-xl shrink-0 flex flex-col">
            <div className="bg-zinc-900 border-b border-zinc-800 p-2 px-4 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Console Output</span>
            </div>
            <div className="flex-1 p-4 overflow-y-auto font-mono text-sm">
               {output ? (
                 <pre className="text-zinc-300 whitespace-pre-wrap break-words">{output}</pre>
               ) : (
                 <span className="text-zinc-600 italic">Hit &apos;Run Code&apos; to see the magic happen.</span>
               )}
            </div>
          </div>

          {/* Mini Quiz Area - Appears after successful run */}
          {hasRunSuccessfully && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl animate-in fade-in slide-in-from-bottom-8 duration-700">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">🧠</span> Time for a Mini-Quiz!
              </h3>
              <p className="text-zinc-300 font-medium mb-4 text-lg">{lesson.miniQuizQuestion.question}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {lesson.miniQuizQuestion.options.map((opt, idx) => {
                  let btnClass = "bg-zinc-950 border-zinc-800 hover:border-blue-500 text-zinc-300";
                  if (quizState !== 'idle') {
                    if (idx === lesson.miniQuizQuestion.correctAnswerIndex) {
                      btnClass = "bg-green-900/30 border-green-500 text-green-300";
                    } else if (idx === selectedOption) {
                      btnClass = "bg-red-900/30 border-red-500 text-red-300";
                    } else {
                      btnClass = "bg-zinc-950 border-zinc-800 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(idx)}
                      disabled={quizState === 'correct'}
                      className={`p-3 rounded-xl border text-left font-medium transition-all ${btnClass}`}
                    >
                      <span className="mr-3 font-bold opacity-50">{String.fromCharCode(65 + idx)}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {quizState !== 'idle' && (
                <div className="flex items-center gap-6 p-4 rounded-xl bg-zinc-950/50 border border-zinc-800/50 animate-in fade-in zoom-in duration-300">
                  {quizGif && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={quizGif} alt="Reaction" className="w-24 h-24 object-cover rounded-lg shrink-0" />
                  )}
                  <div className="flex-1">
                    {quizState === 'correct' ? (
                      <div>
                        <h4 className="text-green-400 font-bold text-lg mb-1">Nailed it! 🎉</h4>
                        <p className="text-zinc-400 text-sm mb-4">You&apos;re ready for the next challenge.</p>
                        <button 
                          onClick={nextLevel}
                          disabled={isSaving}
                          className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
                        >
                          {isSaving ? 'Saving...' : 'Next Level ➔'}
                        </button>
                      </div>
                    ) : (
                      <div>
                        <h4 className="text-red-400 font-bold text-lg mb-1">Oops, that&apos;s not it! 🤦‍♂️</h4>
                        <p className="text-zinc-400 text-sm mb-3">Try again. I believe in you!</p>
                        <button 
                          onClick={() => { setQuizState('idle'); setSelectedOption(null); setQuizGif(null); }}
                          className="bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                        >
                          Retry Quiz
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default function LearnPage() {
  return (
    <Suspense fallback={<div className="flex h-[calc(100vh-4rem)] items-center justify-center">Loading the learning experience...</div>}>
      <LearnPageContent />
    </Suspense>
  );
}
