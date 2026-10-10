// agent-notes: { ctx: "Client component for interactive lesson workspace and code execution", deps: ["@/lib/lessons", "@/components/RoastCard"], state: active, last: "sato@2026-09-23" }
'use client'

import { useState, useEffect } from 'react';
import Editor, { loader } from '@monaco-editor/react';
import { getAllLessons } from '@/lib/lessons';


import Link from 'next/link';
import { useRoast } from '@/hooks/useRoast';
import { RoastCard } from '@/components/RoastCard';
import { executeCode } from '@/lib/executor';
import { useMemeSound } from '@/hooks/useMemeSound';
import { saveLessonProgress } from '@/lib/progress';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import SkillTreeView from '@/components/SkillTreeView';
import { Map as MapIcon, LayoutList } from 'lucide-react';
import { useMicroCelebration } from '@/hooks/useMicroCelebration';

interface LearnPageClientProps {
  initialLevel: number;
  highestUnlockedLevel: number;
  initialHumorPref: 'general' | 'tamil';
  learningLanguage?: string;
}

export default function LearnPageClient({ initialLevel, highestUnlockedLevel, initialHumorPref, learningLanguage = 'javascript' }: LearnPageClientProps) {
  const [currentLevel, setCurrentLevel] = useState<number>(initialLevel);
  const [humorPref, setHumorPref] = useState<'general' | 'tamil'>(initialHumorPref);
  const [activeLang, setActiveLang] = useState<string>(learningLanguage);
  const [viewMode, setViewMode] = useState<'lesson' | 'map'>('lesson');
  const [isLoadingLevel, setIsLoadingLevel] = useState(false);
  
  useEffect(() => {
    // If we're a guest (initial props were defaults), read from localStorage
    const storedHumor = localStorage.getItem('guest_humor');
    if (storedHumor === 'tamil' || storedHumor === 'general') {
      setHumorPref(storedHumor);
    }
    
    const storedLang = localStorage.getItem('guest_lang');
    if (storedLang === 'python' || storedLang === 'javascript' || storedLang === 'c' || storedLang === 'cpp' || storedLang === 'java') {
      setActiveLang(storedLang);
    }
  }, []);

  const allLessons = getAllLessons(activeLang);

  const handleSelectLevel = (level: number) => {
    setIsLoadingLevel(true);
    setTimeout(() => {
      setCurrentLevel(level);
      setViewMode('lesson');
      setIsLoadingLevel(false);
    }, 1500);
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
          <MapIcon size={16} /> Map
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
              highestUnlockedLevel={highestUnlockedLevel}
              setCurrentLevel={handleSelectLevel} 
              humorPref={humorPref} 
              learningLanguage={activeLang}
              allLessons={allLessons}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LessonView({ currentLevel, highestUnlockedLevel, setCurrentLevel, humorPref, learningLanguage, allLessons }: { currentLevel: number, highestUnlockedLevel: number, setCurrentLevel: (level: number) => void, humorPref: 'general' | 'tamil', learningLanguage: string, allLessons: any[] }) {
  const lesson = allLessons[currentLevel - 1];
  
  // Editor & Run State
  const getDefaultCode = () => {
    if (learningLanguage === 'python') return '# Write your code here based on the examples!\\n';
    if (learningLanguage === 'c' || learningLanguage === 'cpp' || learningLanguage === 'java') return '// Write your code here based on the examples!\\n';
    return '// Write your code here based on the examples!\\n';
  };
  const [code, setCode] = useState(getDefaultCode());
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [hasRunSuccessfully, setHasRunSuccessfully] = useState(false);
  const [shake, setShake] = useState(false);

  // Auto-roast state handled by hook
  const { isRoasting, roastStatus, roastData, roastError, handleRoast, clearRoast } = useRoast();
  const { playMemeSound } = useMemeSound();

  const [isSaving, setIsSaving] = useState(false);
  
  // Tier Completion State
  const [showTierComplete, setShowTierComplete] = useState(false);

  // Micro celebrations
  const { triggerCelebration: triggerFirstRoast } = useMicroCelebration('first_roast');

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleLevelComplete = async () => {
    setIsSaving(true);
    try {
      await saveLessonProgress(currentLevel, learningLanguage);
    } catch (e) {
      console.error("Error saving progress", e);
    } finally {
      setIsSaving(false);
    }
  };

  // Reset state when lesson changes
  useEffect(() => {
    if (!lesson) return;
    setCode('// Write your code here based on the examples!\\n');
    setOutput('');
    setHasRunSuccessfully(false);
    setShowTierComplete(false);
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
    
    // 1. Syntax Checks
    if (lesson.verificationChecks) {
      const syntaxChecks = lesson.verificationChecks.filter((c: any) => c.type === 'requires_syntax');
      for (const check of syntaxChecks) {
        if (check.pattern) {
          // Normalize pattern to handle strict anchors and over-escaped backslashes from JSON/TS definitions
          let normalizedPattern = check.pattern.startsWith('^') ? check.pattern.slice(1) : check.pattern;
          // If the pattern was defined as \\\\w in the TS file, it evaluates to \\w in memory. Reduce it to \w.
          normalizedPattern = normalizedPattern.replace(/\\\\/g, '\\');
          
          if (!new RegExp(normalizedPattern).test(code)) {
            const errorMsg = `Check Failed: ${check.expectedMessage}`;
            setOutput(errorMsg);
            await handleRoast(code, errorMsg, false, '', humorPref);
            playMemeSound(false, humorPref);
            setHasRunSuccessfully(false);
            setIsRunning(false);
            triggerShake();
            return;
          }
        }
      }
    }

    if (lesson.topicRequirement) {
      const regex = new RegExp(lesson.topicRequirement.pattern);
      if (!regex.test(code)) {
        const errorOutput = `Error: ${lesson.topicRequirement.errorMessage}`;
        setOutput(errorOutput);
        await handleRoast(code, errorOutput, false, '', humorPref);
        playMemeSound(false, humorPref);
        setIsRunning(false);
        triggerShake();
        return;
      }
    }
    
    try {
      // 2. Instrument code for requires_call_count
      let codeToExecute = code;
      const assertions: { id: string, code: string }[] = [];
      let expectsCallCount = false;
      let expectedCallCountMsg = "";

      if (lesson.verificationChecks) {
        const callCountChecks = lesson.verificationChecks.filter((c: any) => c.type === 'requires_call_count');
        if (callCountChecks.length > 0) {
          expectsCallCount = true;
          expectedCallCountMsg = callCountChecks[0].expectedMessage;
          codeToExecute = codeToExecute.replace(/(for|while|do)\s*\(.*?\)\s*\{/g, "$&\n  globalThis.__loopCount = (globalThis.__loopCount || 0) + 1;\n");
          assertions.push({ id: 'call_count', code: 'globalThis.__loopCount > 1' });
        }
      }

      const data = await executeCode(learningLanguage, codeToExecute, assertions);
      
      if (!data.error) {
        const finalOutput = data.output || 'Code ran successfully with no output.';
        
        // 3. Output Checks
        let mismatchError = '';
        if (lesson.verificationChecks) {
          const outputChecks = lesson.verificationChecks.filter((c: any) => c.type === 'requires_output');
          for (const check of outputChecks) {
            if (check.pattern && !new RegExp(check.pattern).test(finalOutput)) {
              mismatchError = `❌ Output mismatch!\nExpected: ${check.expectedMessage}\nReceived: ${finalOutput}`;
              break;
            }
          }
        }


        if (mismatchError) {
           setOutput(mismatchError);
           await handleRoast(code, mismatchError, false, '', humorPref);
           playMemeSound(false, humorPref);
           setHasRunSuccessfully(false);
           setIsRunning(false);
           triggerShake();
           return;
        }

        // 4. Verification Results from Executor
        if (expectsCallCount && data.verificationResults) {
          const callCountResult = data.verificationResults.find((r: {id: string, passed: boolean}) => r.id === 'call_count');
          if (!callCountResult || !callCountResult.passed) {
            const errorMsg = `${finalOutput}\n\nCheck Failed: ${expectedCallCountMsg}`;
            setOutput(errorMsg);
            await handleRoast(code, errorMsg, false, '', humorPref);
            playMemeSound(false, humorPref);
            setHasRunSuccessfully(false);
            setIsRunning(false);
            triggerShake();
            return;
          }
        }

        setOutput(finalOutput);
        
        await handleRoast(code, finalOutput, true, '', humorPref);
        playMemeSound(true, humorPref);
        setHasRunSuccessfully(true);
        if (currentLevel === 1) {
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
        await handleLevelComplete();
      } else {
        const errorOutput = `Error: ${data.error}`;
        setOutput(errorOutput);
        
        await handleRoast(code, errorOutput, false, '', humorPref);
        triggerFirstRoast();
        playMemeSound(false, humorPref);
        setHasRunSuccessfully(false);
        triggerShake();
      }
    } catch {
      setOutput('Failed to execute code. Check your connection.');
      await handleRoast(code, 'Failed to execute code.', false, '', humorPref);
      playMemeSound(false, humorPref);
      setHasRunSuccessfully(false);
      triggerShake();
    } finally {
      setIsRunning(false);
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Level {currentLevel} of {allLessons.length}
          </h1>
          <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getTierColor(lesson.tier)}`}>
            {lesson.tier} 🔥
          </div>
        </div>
        <div className="flex items-center gap-2">
           <button 
             onClick={() => setCurrentLevel(Math.max(1, currentLevel - 1))}
             disabled={currentLevel === 1}
             className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-zinc-300 hover:text-white text-xs font-bold rounded-lg transition-colors border border-zinc-700"
           >
             ← Previous Level
           </button>
           <button 
             onClick={() => setCurrentLevel(Math.min(highestUnlockedLevel, currentLevel + 1))}
             disabled={currentLevel >= highestUnlockedLevel}
             className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-zinc-300 hover:text-white text-xs font-bold rounded-lg transition-colors border border-zinc-700"
           >
             Next Level →
           </button>
        </div>
        <div className="text-sm font-medium text-zinc-500 flex gap-4">
          <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
          <Link href="/lessons" className="hover:text-zinc-300 transition-colors">Library</Link>
        </div>
      </div>

      <motion.div 
        animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}} 
        transition={{ duration: 0.4 }}
        className="flex flex-col lg:flex-row gap-6 h-full min-h-0 flex-1"
      >
        <div className="lg:w-[400px] xl:w-[500px] flex flex-col gap-6 shrink-0 overflow-y-auto pr-2 custom-scrollbar">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-50"></div>
            
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl drop-shadow-md">{lesson.sticker}</span>
              <h2 className="text-3xl font-bold">{lesson.title}</h2>
            </div>
            
            {lesson.biteSized ? (
              <div className="space-y-4 mb-6">
                <p className="text-zinc-200 text-lg leading-relaxed">
                  {humorPref === 'general' && lesson.biteSized.meaningGeneral ? lesson.biteSized.meaningGeneral : lesson.biteSized.meaning}
                </p>
                {((humorPref === 'tamil' && lesson.biteSized.funnyEgTamil) || (humorPref === 'general' && (lesson.biteSized.funnyEgGeneral || lesson.biteSized.funnyEgTamil))) && (
                  <div className="bg-pink-950/20 p-4 rounded-xl border border-pink-900/50">
                    <p className="text-pink-200 italic">
                      <span className="font-bold text-pink-500 mr-2">
                        {humorPref === 'tamil' ? 'Tamil Humor:' : 'Joke:'}
                      </span>
                      {humorPref === 'general' && lesson.biteSized.funnyEgGeneral ? lesson.biteSized.funnyEgGeneral : lesson.biteSized.funnyEgTamil}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-zinc-300 leading-relaxed text-lg mb-6">
                Missing explanation data.
              </p>
            )}

            {lesson.examples && lesson.examples.length > 0 && (
              <div className="space-y-4 mb-6">
                <h3 className="font-bold text-zinc-500 uppercase tracking-widest text-xs">Examples</h3>
                {lesson.examples.map((ex: any, i: number) => (
                  <div key={i} className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                    <p className="text-zinc-400 text-sm mb-2">{ex.explanation}</p>
                    <pre className="text-blue-300 text-sm font-mono overflow-x-auto whitespace-pre-wrap"><code>{ex.code}</code></pre>
                  </div>
                ))}
              </div>
            )}
            
            <div className="space-y-4 mb-6">
               <h3 className="font-bold text-zinc-500 uppercase tracking-widest text-xs">Your Mission</h3>
               <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                 <p className="text-zinc-300 text-sm">
                   Write any program you want, as long as you use the concepts taught in this lesson!
                 </p>
                 {lesson.codeExample && (
                   <div className="mt-4 pt-4 border-t border-zinc-800">
                     <p className="text-zinc-500 text-xs uppercase mb-2 flex justify-between">
                       <span>Target Code / Hint</span>
                       <span className="text-zinc-600">(Try not to copy-paste!)</span>
                     </p>
                     <pre className="text-blue-300/80 text-sm font-mono overflow-x-auto whitespace-pre-wrap blur-[2px] hover:blur-none transition-all cursor-help"><code>{lesson.codeExample}</code></pre>
                   </div>
                 )}
               </div>
            </div>

          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4 h-[800px] lg:h-auto">
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
                language={learningLanguage === 'python' ? 'python' : 'javascript'}
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

          {(isRoasting || roastError || roastData) && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
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
            </div>
          )}

          {hasRunSuccessfully && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl animate-in fade-in slide-in-from-bottom-8 duration-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-green-400 font-bold text-xl flex items-center gap-2">
                  <span>🎉</span> Great Job! Code Executed Successfully!
                </h4>
                <p className="text-zinc-400 text-sm mt-1">You&apos;re ready for the next lesson challenge.</p>
              </div>
              <button 
                onClick={nextLevel}
                disabled={isSaving}
                className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-green-600/20 flex items-center gap-2 shrink-0 disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Next Level ➔'}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
