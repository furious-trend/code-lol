'use client'

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Editor from '@monaco-editor/react';
import { lessonCategories } from '@/lib/lessons';
import { useRoast } from '@/hooks/useRoast';
import { RoastCard } from '@/components/RoastCard';
import { useMemeSound } from '@/hooks/useMemeSound';
import { executeCodeInBrowser } from '@/lib/executor';

function PlaygroundContent() {
  const searchParams = useSearchParams();
  const snippetId = searchParams.get('snippet');
  
  const [language, setLanguage] = useState<string>('javascript');
  const [code, setCode] = useState('// Write your code here\nconsole.log("Hello, World!");');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [lastRunSuccess, setLastRunSuccess] = useState<boolean | null>(null);
  const { isRoasting, roastStatus, roastData, roastError, handleRoast, clearRoast } = useRoast();
  const { playMemeSound } = useMemeSound();

  useEffect(() => {
    if (snippetId) {
      let lesson = null;
      for (const category of lessonCategories) {
        const found = category.lessons.find(l => l.id.toString() === snippetId);
        if (found) {
          lesson = found;
          break;
        }
      }
      
      if (lesson) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCode(lesson.codeExample);
        setLanguage('javascript');
      }
    }
  }, [snippetId]);

  const handleRunAndRoast = async () => {

    setIsRunning(true);
    setOutput('Running...');
    clearRoast();
    
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await executeCodeInBrowser(language, code);

      if (!data.error) {
        const result = data.output || '';
        setLastRunSuccess(true);
        const finalOutput = result || 'Code ran successfully with no output.';
        setOutput(finalOutput);
        
        // Wait for roast and GIF to fully load
        await handleRoast(code, finalOutput, true, '');
        // Play audio exactly when UI updates
        playMemeSound(true);
        
      } else {
        setLastRunSuccess(false);
        const errorOutput = `Error: ${data.error}`;
        setOutput(errorOutput);
        
        // Wait for roast and GIF to fully load
        await handleRoast(code, errorOutput, false, '');
        // Play audio exactly when UI updates
        playMemeSound(false);
      }
    } catch {
      setLastRunSuccess(false);
      setOutput('Failed to execute code. Check your connection or try again later.');
      // Wait for roast and GIF to fully load
      await handleRoast(code, 'Failed to execute code.', false, '');
      // Play audio exactly when UI updates
      playMemeSound(false);
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
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-sm text-zinc-400">
            JavaScript
          </div>
          
          <button 
            onClick={handleRunAndRoast}
            disabled={isRoasting || isRunning}
            className={`flex-1 sm:flex-none bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 ${isRoasting || isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isRoasting || isRunning ? 'Cooking... 🔥' : 'Run & Roast 🔥'}
          </button>
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
            <span className="ml-4 text-xs font-mono text-zinc-500">main.js</span>
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
        <div className="lg:w-1/3 flex flex-col gap-4 h-64 lg:h-auto shrink-0">
          {isRoasting && (
            <div className="flex flex-col border border-purple-500/30 rounded-xl overflow-hidden bg-purple-950/20 shadow-lg shadow-purple-500/10 flex-1 min-h-[150px] justify-center items-center p-8">
              <div className="animate-spin text-4xl mb-4">🔥</div>
              <p className="text-purple-400 font-bold animate-pulse text-center">{roastStatus}</p>
            </div>
          )}
          
          {roastError && (
            <div className="flex flex-col border border-red-500/30 rounded-xl overflow-hidden bg-red-950/20 shadow-lg shadow-red-500/10 flex-1 min-h-[150px] justify-center items-center p-8 text-center">
              <div className="text-4xl mb-2">❌</div>
              <p className="text-red-400 font-bold mb-2">Failed to Roast</p>
              <p className="text-red-300 text-sm">{roastError}</p>
              <button 
                onClick={clearRoast}
                className="mt-4 px-4 py-2 bg-red-900/50 hover:bg-red-800/50 text-red-200 rounded-lg text-sm transition-colors"
              >
                Dismiss
              </button>
            </div>
          )}
          
           {roastData && !isRoasting && (
             <RoastCard 
               roast={roastData.roast}
               fix={roastData.fix}
               mood={roastData.mood}
               gifUrl={roastData.gifUrl}
               output={output}
               onDismiss={clearRoast}
               onReplayAudio={() => {
                 if (lastRunSuccess !== null) {
                   playMemeSound(lastRunSuccess);
                 }
               }}
             />
          )}
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
