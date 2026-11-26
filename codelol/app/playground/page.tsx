// agent-notes: { ctx: "Interactive multi-language Playground with drafts, beginner error tips, and AI roasts", deps: ["@monaco-editor/react", "@/lib/executor", "@/lib/beginnerErrors", "@/hooks/useRoast"], state: "active", last: "sato@2026-11-26" }
'use client'

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { getAllLessons } from '@/lib/lessons/index';


import { useRoast } from '@/hooks/useRoast';
import { RoastCard } from '@/components/RoastCard';
import { Bugsy } from '@/components/Bugsy';
import { useMemeSound } from '@/hooks/useMemeSound';
import { executeCode } from '@/lib/executor';
import { getRandomLoadingMessage, getRandomEmptyMessage } from '@/lib/funnyCopy';
import { createClient } from '@/lib/supabase/client';
import { translateBeginnerError } from '@/lib/beginnerErrors';

const STARTER_CODE: Record<string, string> = {
  javascript: '// Write your code here\nconsole.log("Hello, World!");',
  python: '# Write your code here\nprint("Hello, World!")',
  c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
  cpp: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}',
  java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}'
};

const FILE_EXT: Record<string, string> = {
  javascript: 'main.js',
  python: 'main.py',
  c: 'main.c',
  cpp: 'main.cpp',
  java: 'Main.java'
};

/** Returns saved localStorage draft for the given language or falls back to its starter template. */
function resolvePlaygroundCode(lang: string): string {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(`draft_playground_${lang}`);
      if (saved && saved.trim().length > 0) return saved;
    } catch {}
  }
  return STARTER_CODE[lang] || STARTER_CODE['javascript'];
}

function PlaygroundContent() {
  const searchParams = useSearchParams();
  const snippetId = searchParams.get('snippet');
  
  const [language, setLanguage] = useState<string>('javascript');
  const [code, setCode] = useState(() => resolvePlaygroundCode('javascript'));
  const [output, setOutput] = useState('');
  const [mobileTab, setMobileTab] = useState<'editor' | 'output'>('editor');
  const [isRunning, setIsRunning] = useState(false);
  const [lastRunSuccess, setLastRunSuccess] = useState<boolean | null>(null);
  const [loadingMsg, setLoadingMsg] = useState("Cooking... 🔥");
  const [emptyMsg, setEmptyMsg] = useState("Run your code to see results and get roasted!");
  const { isRoasting, roastStatus, roastData, roastError, handleRoast, clearRoast } = useRoast();
  const { playMemeSound } = useMemeSound();
  const [humorPref, setHumorPref] = useState<'general' | 'tamil'>('general');
  const [learningLanguage, setLearningLanguage] = useState<string>('javascript');

  const beginnerTip = translateBeginnerError(output || roastError, language);

  const handleResetCode = () => {
    const defaultCode = STARTER_CODE[language] || STARTER_CODE['javascript'];
    setCode(defaultCode);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(`draft_playground_${language}`);
      } catch {}
    }
    setOutput('');
    clearRoast();
  };

  useEffect(() => {
    async function loadPref() {
      const supabaseClient = createClient();
      const { data: { user } } = await supabaseClient.auth.getUser();
      if (user) {
        const { data: profile } = await supabaseClient
          .from('profiles')
          .select('humor_preference, learning_language')
          .eq('id', user.id)
          .single();
        if (profile?.humor_preference) {
          setHumorPref(profile.humor_preference as 'general' | 'tamil');
        }
        if (profile?.learning_language) {
          setLearningLanguage(profile.learning_language);
          if (!snippetId) {
            setLanguage(profile.learning_language);
            setCode(resolvePlaygroundCode(profile.learning_language));
          }
        }
      } else {
        // Handle guest user preferences from localStorage
        const storedHumor = localStorage.getItem('guest_humor');
        if (storedHumor === 'tamil' || storedHumor === 'general') {
          setHumorPref(storedHumor);
        }
        const storedLang = localStorage.getItem('guest_lang');
        if (storedLang) {
          setLearningLanguage(storedLang);
          if (!snippetId) {
            setLanguage(storedLang);
            setCode(resolvePlaygroundCode(storedLang));
          }
        }
      }
    }
    loadPref();
  }, [snippetId]);

  useEffect(() => {
    setEmptyMsg(getRandomEmptyMessage());
  }, []);

  useEffect(() => {
    if (snippetId) {
      let lesson = null;
      const lessons = getAllLessons(learningLanguage);
      const found = lessons.find(l => l.id.toString() === snippetId);
      if (found) {
        lesson = found;
      }
      
      if (lesson) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCode(lesson.codeExample);
        setLanguage(learningLanguage);
      }
    }
  }, [snippetId, learningLanguage]);

  const handleRunAndRoast = async () => {
    setMobileTab('output');
    setIsRunning(true);
    setLoadingMsg(getRandomLoadingMessage());
    setOutput('Running...');
    clearRoast();
    
    try {
       
      const data = await executeCode(language, code);

      if (!data.error) {
        const result = data.output || '';
        setLastRunSuccess(true);
        const finalOutput = result || 'Code ran successfully with no output.';
        setOutput(finalOutput);
        
        // Wait for roast and GIF to fully load
        await handleRoast(code, finalOutput, true, '', humorPref, language);
        // Play audio exactly when UI updates
        playMemeSound(true, humorPref);
        
      } else {
        setLastRunSuccess(false);
        const errorOutput = `Error: ${data.error}`;
        setOutput(errorOutput);
        
        // Wait for roast and GIF to fully load
        await handleRoast(code, errorOutput, false, '', humorPref, language);
        // Play audio exactly when UI updates
        playMemeSound(false, humorPref);
      }
    } catch {
      setLastRunSuccess(false);
      setOutput('Failed to execute code. Check your connection or try again later.');
      // Wait for roast and GIF to fully load
      await handleRoast(code, 'Failed to execute code.', false, '', humorPref, language);
      // Play audio exactly when UI updates
      playMemeSound(false, humorPref);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] p-4 md:p-8 gap-4 bg-zinc-950 text-zinc-50 font-sans w-full max-w-7xl mx-auto">
      
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Code Playground</h1>
          <p className="text-zinc-400 text-sm">Write, run, and experiment with your code.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <select 
            value={language}
            onChange={(e) => {
              const newLang = e.target.value;
              setLanguage(newLang);
              setLearningLanguage(newLang);
              setCode(resolvePlaygroundCode(newLang));
            }}
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-sm text-zinc-400 focus:outline-none focus:border-purple-500 cursor-pointer"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>
          
          <select 
            value={humorPref}
            onChange={async (e) => {
              const val = e.target.value as 'general' | 'tamil';
              setHumorPref(val);
              localStorage.setItem('guest_humor', val);
              const supabaseClient = createClient();
              const { data: { user } } = await supabaseClient.auth.getUser();
              if (user) {
                await supabaseClient.from('profiles').update({ humor_preference: val }).eq('id', user.id);
              }
            }}
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-sm text-zinc-400 focus:outline-none focus:border-purple-500 cursor-pointer"
          >
            <option value="general">General Humor</option>
            <option value="tamil">Tamil Humor</option>
          </select>
          
          <button
            type="button"
            onClick={handleResetCode}
            className="p-2 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors text-xs sm:text-sm font-semibold flex items-center gap-1.5 cursor-pointer active:scale-95"
            title="Reset code back to original template"
            aria-label="Reset code to default"
          >
            <span>↺</span>
            <span>Reset</span>
          </button>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRunAndRoast}
            disabled={isRoasting || isRunning}
            className={`flex-1 sm:flex-none bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 ${isRoasting || isRunning ? 'opacity-50 cursor-not-allowed' : 'shadow-lg shadow-purple-600/30'}`}
          >
            {isRoasting || isRunning ? '⏳ Compiling... please wait' : 'Submit & Roast 🚀🔥'}
          </motion.button>
        </div>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="flex lg:hidden bg-zinc-900 border border-zinc-800 rounded-xl p-1 gap-1 shrink-0">
        <button
          type="button"
          onClick={() => setMobileTab('editor')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            mobileTab === 'editor'
              ? 'bg-purple-600 text-white shadow'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
          aria-label="Switch to Code Editor"
        >
          <span>💻 Code Editor</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('output')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            mobileTab === 'output'
              ? 'bg-purple-600 text-white shadow'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
          aria-label="Switch to Output and Roast"
        >
          <span>⚡ Output & Roast</span>
          {(output || roastData || isRoasting) && (
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          )}
        </button>
      </div>

      {/* Main Workspace */}
      <div className="flex flex-col lg:flex-row gap-4 h-full min-h-0">
        
        {/* Editor Area */}
        <div className={`flex-1 border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900 shadow-lg flex-col min-h-[300px] ${mobileTab === 'editor' ? 'flex' : 'hidden lg:flex'}`}>
          <div className="bg-zinc-900 border-b border-zinc-800 p-2 px-4 flex items-center">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <span className="ml-4 text-xs font-mono text-zinc-500">{FILE_EXT[language] || 'main.js'}</span>
          </div>
          <div className="flex-1 relative">
            <Editor
              height="100%"
              language={language}
              theme="vs-dark"
              value={code}
              onChange={(value) => {
                const val = value || '';
                setCode(val);
                if (typeof window !== 'undefined') {
                  try {
                    localStorage.setItem(`draft_playground_${language}`, val);
                  } catch {}
                }
              }}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: 'var(--font-geist-mono), monospace',
                padding: { top: 16, bottom: 16 },
                scrollBeyondLastLine: false,
                roundedSelection: false,
              }}
            />
          </div>
        </div>

        {/* Output Console Area */}
        <div className={`lg:w-1/3 flex-col gap-4 h-full lg:h-auto shrink-0 ${mobileTab === 'output' ? 'flex min-h-[300px]' : 'hidden lg:flex'}`}>
          {/* Beginner Friendly Guidance Tip */}
          {beginnerTip && (
            <div data-testid="playground-beginner-tip" className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2.5 shadow-sm shrink-0">
              <span className="text-base flex-shrink-0">💡</span>
              <div>
                <p className="font-extrabold text-amber-300 uppercase tracking-wider">{beginnerTip.title}</p>
                <p className="text-zinc-200 mt-0.5 leading-relaxed">{beginnerTip.hint}</p>
              </div>
            </div>
          )}
          <div data-testid="playground-roast-stage" className="relative flex-1 min-h-[200px]">
          <AnimatePresence mode="wait">
            {isRoasting && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col border border-purple-500/30 rounded-xl overflow-hidden bg-purple-950/20 shadow-lg shadow-purple-500/10 flex-1 min-h-[150px] justify-center items-center p-8 absolute inset-0"
              >
                <Bugsy size={80} mood="dizzy" />
                <p className="text-amber-400 font-bold animate-pulse text-center mt-4">{roastStatus === 'Roasting...' ? loadingMsg : roastStatus}</p>
              </motion.div>
            )}
            
            {roastError && (
              <motion.div 
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col border border-red-500/30 rounded-xl overflow-hidden bg-red-950/20 shadow-lg shadow-red-500/10 flex-1 min-h-[150px] justify-center items-center p-8 text-center absolute inset-0 z-10"
              >
                <div className="text-4xl mb-2">❌</div>
                <p className="text-red-400 font-bold mb-2">Failed to Roast</p>
                <p className="text-red-300 text-sm">{roastError}</p>
                <button 
                  onClick={clearRoast}
                  className="mt-4 px-4 py-2 bg-red-900/50 hover:bg-red-800/50 text-red-200 rounded-lg text-sm transition-colors"
                >
                  Dismiss
                </button>
              </motion.div>
            )}
            
            {roastData && !isRoasting && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full flex-1"
              >
                <RoastCard 
                  roast={roastData.roast}
                  fix={roastData.fix}
                  mood={roastData.mood}
                  gifUrl={roastData.gifUrl}
                  output={output}
                  onDismiss={clearRoast}
                  onReplayAudio={() => {
                    if (lastRunSuccess !== null) {
                      playMemeSound(lastRunSuccess, humorPref);
                    }
                  }}
                />
              </motion.div>
            )}

            {!roastData && !isRoasting && !roastError && (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col border-2 border-dashed border-zinc-800 rounded-xl flex-1 min-h-[150px] justify-center items-center p-8 text-center text-zinc-500 absolute inset-0"
              >
                <Bugsy size={64} mood="thinking" className="opacity-50 mb-4" />
                <p>{emptyMsg}</p>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default function PlaygroundPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-[calc(100vh-4rem)]">Loading playground...</div>}>
      <PlaygroundContent />
    </Suspense>
  );
}
