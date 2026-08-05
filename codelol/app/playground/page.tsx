'use client'

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Editor from '@monaco-editor/react';
import { lessonCategories } from '@/lib/lessons';
import { useRoast } from '@/hooks/useRoast';
import { RoastCard } from '@/components/RoastCard';

function PlaygroundContent() {
  const searchParams = useSearchParams();
  const snippetId = searchParams.get('snippet');
  
  const [language, setLanguage] = useState<string>('javascript');
  const [code, setCode] = useState('// Write your code here\nconsole.log("Hello, World!");');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const { isRoasting, roastStatus, roastData, roastError, handleRoast, clearRoast } = useRoast();

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
        setCode(lesson.codeExample);
        setLanguage('javascript');
      }
    }
  }, [snippetId]);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Running...');
    
    try {
      const res = await fetch('/api/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language, code }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        let result = data.output || '';
        if (data.error) {
          result += (result ? '\n' : '') + 'Error:\n' + data.error;
        }
        setOutput(result || 'Code ran successfully with no output.');
      } else {
        setOutput(`Error: ${data.error}\n${data.details ? JSON.stringify(data.details, null, 2) : ''}`);
      }
    } catch {
      setOutput('Failed to execute code. Check your connection or try again later.');
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
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="javascript">JavaScript (Node.js)</option>
            <option value="python">Python</option>
            <option value="typescript">TypeScript</option>
            <option value="java">Java</option>
            <option value="c">C</option>
            <option value="c++">C++</option>
            <option value="csharp">C#</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
            <option value="ruby">Ruby</option>
            <option value="php">PHP</option>
            <option value="kotlin">Kotlin</option>
            <option value="swift">Swift</option>
            <option value="bash">Bash</option>
            <option value="sqlite">SQL (SQLite)</option>
          </select>
          
          <button 
            onClick={handleRun}
            disabled={isRunning || isRoasting}
            className={`flex-1 sm:flex-none bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isRunning ? 'Running...' : 'Run Code'}
            {!isRunning && <span>▶</span>}
          </button>
          
          <button 
            onClick={() => handleRoast(code)}
            disabled={isRoasting || isRunning}
            className={`flex-1 sm:flex-none bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 ${isRoasting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isRoasting ? 'Roasting...' : 'Roast My Code'}
            {!isRoasting && <span className="text-xl">🔥</span>}
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
            <span className="ml-4 text-xs font-mono text-zinc-500">main.{language === 'python' ? 'py' : 'js'}</span>
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
          <div className="flex flex-col border border-zinc-800 rounded-xl overflow-hidden bg-black shadow-lg flex-1 min-h-[150px]">
             <div className="bg-zinc-900 border-b border-zinc-800 p-2 px-4 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Console Output</span>
              <button onClick={() => setOutput('')} className="text-xs text-zinc-500 hover:text-zinc-300">Clear</button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto font-mono text-sm">
               {output ? (
                 <pre className="text-zinc-300 whitespace-pre-wrap break-words">{output}</pre>
               ) : (
                 <span className="text-zinc-600 italic">No output yet. Click &apos;Run Code&apos; to execute.</span>
               )}
            </div>
          </div>
          
          {isRoasting && (
            <div className="flex flex-col border border-purple-500/30 rounded-xl overflow-hidden bg-purple-950/20 shadow-lg shadow-purple-500/10 flex-1 min-h-[150px] justify-center items-center p-8">
              <span className="text-4xl animate-bounce mb-4">🔥</span>
              <span className="text-purple-300 font-medium animate-pulse">{roastStatus}</span>
            </div>
          )}
          
          {roastError && (
            <div className="flex flex-col border border-red-500/30 rounded-xl overflow-hidden bg-red-950/20 p-4">
              <span className="text-red-400">Error: {roastError}</span>
              <button onClick={clearRoast} className="mt-2 text-xs text-red-500 hover:text-red-300 self-start">Dismiss</button>
            </div>
          )}
          
          {roastData && (
            <RoastCard 
              roast={roastData.roast}
              fix={roastData.fix}
              mood={roastData.mood}
              gifUrl={roastData.gifUrl}
              onDismiss={clearRoast}
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
