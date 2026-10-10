'use client'

import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import Link from 'next/link';
import { executeCode } from '@/lib/executor';
import { useMemeSound } from '@/hooks/useMemeSound';
import { createClient } from '@/lib/supabase/client';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutList, BookOpen, AlertTriangle } from 'lucide-react';
import { pythonCurriculum } from '@/lib/python/curriculum';
import { HumorPreference, Lesson } from '@/lib/python/types';
import { Bugsy } from '@/components/Bugsy';

// Helper to flatten lessons
const allLessonsFlattened = pythonCurriculum.flatMap(ch => 
  ch.lessons.map(l => ({ chapter: ch, lesson: l }))
);

interface Props {
  initialLevelId: string;
  initialHumorPref: HumorPreference;
}

export default function LearnPagePythonClient({ initialLevelId, initialHumorPref }: Props) {
  const [currentLevelIndex, setCurrentLevelIndex] = useState<number>(() => {
    const idx = allLessonsFlattened.findIndex(l => l.lesson.id === initialLevelId);
    return idx >= 0 ? idx : 0;
  });
  
  const [humorPref, setHumorPref] = useState<HumorPreference>(initialHumorPref);
  const [learnedItemIds, setLearnedItemIds] = useState<Set<string>>(new Set());
  const [userId, setUserId] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const { data: profile } = await supabase
          .from('profiles')
          .select('humor_preference')
          .eq('id', user.id)
          .single();
        if (profile?.humor_preference) setHumorPref(profile.humor_preference);

        const { data } = await supabase
          .from('library_progress')
          .select('item_id')
          .eq('language', 'python')
          .eq('learned', true);
        if (data) {
          setLearnedItemIds(new Set(data.map(d => d.item_id)));
        }
      } else {
        const storedHumor = localStorage.getItem('guest_humor');
        if (storedHumor === 'tamil' || storedHumor === 'general') {
          setHumorPref(storedHumor);
        }
        const stored = localStorage.getItem('python_learned_items');
        if (stored) {
          try { setLearnedItemIds(new Set(JSON.parse(stored))); } catch(e) {}
        }
      }
    }
    loadData();
  }, [supabase]);

  // Unlock logic: you can access any level up to the first unlearned one
  const highestUnlockedIndex = allLessonsFlattened.findIndex(l => !learnedItemIds.has(l.lesson.id));
  const maxIndex = highestUnlockedIndex === -1 ? allLessonsFlattened.length - 1 : highestUnlockedIndex;

  const currentData = allLessonsFlattened[currentLevelIndex];
  
  if (!currentData) return <div className="p-8 text-white">Loading...</div>;

  const { chapter, lesson } = currentData;

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-zinc-950 text-zinc-50 relative">
      <LessonWorkspace 
        chapter={chapter} 
        lesson={lesson} 
        humorPref={humorPref} 
        isUnlocked={currentLevelIndex <= maxIndex}
        levelNumber={currentLevelIndex + 1}
        totalLevels={allLessonsFlattened.length}
        onPrev={() => setCurrentLevelIndex(Math.max(0, currentLevelIndex - 1))}
        onNext={() => setCurrentLevelIndex(Math.min(allLessonsFlattened.length - 1, currentLevelIndex + 1))}
        canGoNext={currentLevelIndex < maxIndex}
        canGoPrev={currentLevelIndex > 0}
        userId={userId}
        learnedItemIds={learnedItemIds}
        setLearnedItemIds={setLearnedItemIds}
      />
    </div>
  );
}

function LessonWorkspace({ 
  chapter, lesson, humorPref, isUnlocked, levelNumber, totalLevels, 
  onPrev, onNext, canGoNext, canGoPrev, userId, learnedItemIds, setLearnedItemIds 
}: any) {
  const [code, setCode] = useState(lesson.codeExample);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  
  const [resultState, setResultState] = useState<'idle' | 'success' | 'fail' | 'quiz' | 'passed'>('idle');
  const [jokeText, setJokeText] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const supabase = createClient();
  const { playMemeSound } = useMemeSound();
  
  // Reset when lesson changes
  useEffect(() => {
    setCode(lesson.codeExample);
    setOutput('');
    setResultState('idle');
    setJokeText('');
    setSelectedAnswer(null);
  }, [lesson]);

  const markLearned = async () => {
    const nextSet = new Set(learnedItemIds);
    nextSet.add(lesson.id);
    setLearnedItemIds(nextSet);

    if (userId) {
      await supabase.from('library_progress').upsert({
        user_id: userId,
        language: 'python',
        item_id: lesson.id,
        learned: true,
        updated_at: new Date().toISOString()
      });
    } else {
      localStorage.setItem('python_learned_items', JSON.stringify(Array.from(nextSet)));
    }
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Running...');
    setResultState('idle');
    
    // Regex checks
    let hasCheckFailed = false;
    if (lesson.verificationChecks) {
      for (const check of lesson.verificationChecks) {
        let pat = check.pattern.startsWith('^') ? check.pattern.slice(1) : check.pattern;
        pat = pat.replace(/\\\\/g, '\\');
        if (!new RegExp(pat).test(code)) {
          const err = `Check Failed: ${check.errorMessage || 'Code does not match required pattern.'}`;
          setOutput(err);
          setResultState('fail');
          setJokeText(humorPref === 'tamil' ? (lesson.funnyLineTamil || chapter.roastTamil) : (lesson.funnyLineGeneral || chapter.roastGeneral));
          playMemeSound(false, humorPref);
          setIsRunning(false);
          return;
        }
      }
    }

    try {
      const data = await executeCode('python-3.14', code, []);
      if (data.error) {
        setOutput(`Error: ${data.error}`);
        setResultState('fail');
        setJokeText(humorPref === 'tamil' ? (lesson.funnyLineTamil || chapter.roastTamil) : (lesson.funnyLineGeneral || chapter.roastGeneral));
        playMemeSound(false, humorPref);
      } else {
        const finalOutput = data.output || 'Code ran successfully.';
        
        let mismatchError = '';
        // If there were output matching rules, you could test them here, but the Python content just gives "expectedOutput"
        if (lesson.expectedOutput) {
          if (finalOutput.trim() !== lesson.expectedOutput.trim()) {
            mismatchError = `❌ Output mismatch!\nExpected: ${lesson.expectedOutput}\nReceived: ${finalOutput}`;
          }
        }

        if (mismatchError) {
          setOutput(mismatchError);
          setResultState('fail');
          setJokeText(humorPref === 'tamil' ? (lesson.funnyLineTamil || chapter.roastTamil) : (lesson.funnyLineGeneral || chapter.roastGeneral));
          playMemeSound(false, humorPref);
        } else {
          setOutput(finalOutput);
          setResultState('quiz');
        }
      }
    } catch (e) {
      setOutput('Execution failed (Network/Server error).');
      setResultState('fail');
    } finally {
      setIsRunning(false);
    }
  };

  const handleQuizAnswer = async (index: number) => {
    setSelectedAnswer(index);
    if (index === lesson.miniQuiz.correctAnswerIndex) {
      setResultState('passed');
      
      const proudLinesTamil = ["Vera level thala! 🔥", "Mass pa nee! 🚀", "Semma! Gethu panra!", "Pichutee po! 🎉"];
      const proudLinesGeneral = ["Nailed it! 🚀", "You're on fire! 🔥", "Legendary!", "Flawless victory! 🏆"];
      const proudPool = humorPref === 'tamil' ? proudLinesTamil : proudLinesGeneral;
      const proudLine = proudPool[Math.floor(Math.random() * proudPool.length)];
      
      setJokeText(proudLine);
      playMemeSound(true, humorPref);
      confetti({ particleCount: 100, spread: 70 });
      await markLearned();
    } else {
      setResultState('fail');
      setJokeText(humorPref === 'tamil' ? (lesson.funnyLineTamil || chapter.roastTamil) : (lesson.funnyLineGeneral || chapter.roastGeneral));
      playMemeSound(false, humorPref);
    }
  };

  if (!isUnlocked) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
          <AlertTriangle size={48} className="text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Level Locked 🔒</h2>
          <p className="text-zinc-400">Complete the previous lessons to unlock this one.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 p-4 md:p-6 gap-6 w-full mx-auto overflow-y-auto">
      <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-pink-400">Level {levelNumber} / {totalLevels}</h1>
          <h2 className="text-zinc-300 text-lg">{chapter.title} - {lesson.title}</h2>
        </div>
        <div className="flex items-center gap-2">
           <button onClick={onPrev} disabled={!canGoPrev} className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 rounded-lg text-sm font-bold">← Prev</button>
           <button onClick={onNext} disabled={!canGoNext} className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 rounded-lg text-sm font-bold">Next →</button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-0 flex-1">
        {/* Left Column: Instructions */}
        <div className="lg:w-[400px] flex flex-col gap-6 shrink-0 overflow-y-auto pr-2">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl">
             <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><BookOpen size={20} className="text-pink-400" /> Explanation</h3>
             <p className="text-zinc-300 leading-relaxed">{lesson.explanation}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl">
             <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4">Requirements</h3>
             <ul className="list-disc pl-5 space-y-2 text-zinc-300 text-sm">
                {lesson.verificationChecks?.map((c: any, i: number) => (
                  <li key={i}>{c.description || c.errorMessage}</li>
                ))}
             </ul>
          </div>
        </div>

        {/* Middle Column: Editor */}
        <div className="flex-1 flex flex-col gap-4 min-h-[500px]">
          <div className="flex flex-col flex-1 border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-900 shadow-xl">
            <div className="bg-zinc-950 border-b border-zinc-800 p-3 px-4 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Editor</span>
              <button onClick={handleRun} disabled={isRunning} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-1.5 px-6 rounded-md text-sm">
                {isRunning ? 'Running...' : 'Run Code ▶'}
              </button>
            </div>
            <div className="flex-1 relative">
              <Editor
                height="100%" language="python" theme="vs-dark" value={code} onChange={(v) => setCode(v || '')}
                options={{ minimap: { enabled: false }, fontSize: 15, fontFamily: 'var(--font-geist-mono), monospace' }}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Output & Result */}
        <div className="lg:w-[350px] flex flex-col gap-4">
          <div className="h-48 border border-zinc-800 rounded-2xl overflow-hidden bg-black shadow-xl flex flex-col">
            <div className="bg-zinc-900 border-b border-zinc-800 p-2 px-4"><span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Output</span></div>
            <div className="flex-1 p-4 overflow-y-auto font-mono text-sm">
               {output ? <pre className="text-zinc-300 whitespace-pre-wrap">{output}</pre> : <span className="text-zinc-600 italic">Hit Run to test.</span>}
            </div>
          </div>

          {resultState !== 'idle' && (
            <div className={`p-6 rounded-2xl border ${resultState === 'passed' ? 'bg-green-950/30 border-green-500/50' : resultState === 'quiz' ? 'bg-blue-950/30 border-blue-500/50' : 'bg-red-950/30 border-red-500/50'} animate-in fade-in slide-in-from-bottom-4 flex flex-col items-center text-center`}>
              
              {resultState === 'quiz' ? (
                <div className="w-full text-left">
                  <h4 className="text-lg font-bold text-blue-400 mb-2">Quiz Time! 🧠</h4>
                  <p className="text-zinc-200 mb-4">{lesson.miniQuiz.question}</p>
                  <div className="flex flex-col gap-2">
                    {lesson.miniQuiz.options.map((opt: string, i: number) => (
                      <button 
                        key={i} 
                        onClick={() => handleQuizAnswer(i)}
                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-sm text-left transition-colors border border-zinc-700"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <span className="text-4xl mb-4">{resultState === 'passed' ? '🎉' : '💀'}</span>
                  <p className={`font-bold italic text-lg ${resultState === 'passed' ? 'text-green-400' : 'text-red-400'}`}>
                    {jokeText}
                  </p>
                  {resultState === 'fail' && (
                    <div className="mt-4 pt-4 border-t border-red-900/50 w-full flex flex-col items-center gap-2">
                      <p className="text-xs text-red-300 uppercase tracking-widest font-bold">Try Again!</p>
                      {selectedAnswer !== null && (
                         <button onClick={() => {setResultState('quiz'); setSelectedAnswer(null);}} className="text-blue-400 text-sm underline mt-2">Back to Quiz</button>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
