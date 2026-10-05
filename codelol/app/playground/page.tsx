'use client'

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Editor, { loader } from '@monaco-editor/react';
import { getAllLessons } from '@/lib/lessons/index';


import { useRoast } from '@/hooks/useRoast';
import { RoastCard } from '@/components/RoastCard';
import { Bugsy } from '@/components/Bugsy';
import { useMemeSound } from '@/hooks/useMemeSound';
import { executeCode } from '@/lib/executor';
import { getRandomLoadingMessage, getRandomEmptyMessage } from '@/lib/funnyCopy';
import { createClient } from '@/lib/supabase/client';

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

function PlaygroundContent() {
  const searchParams = useSearchParams();
  const snippetId = searchParams.get('snippet');
  
  const [language, setLanguage] = useState<string>('javascript');
  const [code, setCode] = useState(STARTER_CODE['javascript']);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [lastRunSuccess, setLastRunSuccess] = useState<boolean | null>(null);
  const [loadingMsg, setLoadingMsg] = useState("Cooking... 🔥");
  const [emptyMsg, setEmptyMsg] = useState("Run your code to see results and get roasted!");
  const { isRoasting, roastStatus, roastData, roastError, handleRoast, clearRoast } = useRoast();
  const { playMemeSound } = useMemeSound();
  const supabase = createClient();
  const [humorPref, setHumorPref] = useState<'general' | 'tamil'>('general');
  const [learningLanguage, setLearningLanguage] = useState<string>('javascript');

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
            setCode(STARTER_CODE[profile.learning_language] || STARTER_CODE['javascript']);
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
            setCode(STARTER_CODE[storedLang] || STARTER_CODE['javascript']);
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
        await handleRoast(code, finalOutput, true, '', humorPref);
        // Play audio exactly when UI updates
        playMemeSound(true, humorPref);
        
      } else {
        setLastRunSuccess(false);
        const errorOutput = `Error: ${data.error}`;
        setOutput(errorOutput);
        
        // Wait for roast and GIF to fully load
        await handleRoast(code, errorOutput, false, '', humorPref);
        // Play audio exactly when UI updates
        playMemeSound(false, humorPref);
      }
    } catch {
      setLastRunSuccess(false);
      setOutput('Failed to execute code. Check your connection or try again later.');
      // Wait for roast and GIF to fully load
      await handleRoast(code, 'Failed to execute code.', false, '', humorPref);
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
              
              // Only replace if the user hasn't edited the starter code of the old language
              if (STARTER_CODE[language] === code) {
                setCode(STARTER_CODE[newLang] || STARTER_CODE['javascript']);
              }
              
              setLanguage(newLang);
              setLearningLanguage(newLang);
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

      {/* Main Workspace */}
      <div className="flex flex-col lg:flex-row gap-4 h-full min-h-0">
        
        {/* Editor Area */}
        <div className="flex-1 border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900 shadow-lg flex flex-col min-h-[300px]">
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
              onChange={(value) => setCode(value || '')}
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
        <div className="lg:w-1/3 flex flex-col gap-4 h-64 lg:h-auto shrink-0 relative">
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
  );
}

export default function PlaygroundPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-[calc(100vh-4rem)]">Loading playground...</div>}>
      <PlaygroundContent />
    </Suspense>
  );
}
