'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { problems } from '@/lib/problems';
import { useRoast } from '@/hooks/useRoast';
import { RoastCard } from '@/components/RoastCard';

export default function ProblemSolverPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const problem = problems.find(p => p.id === id);
  
  // Find next problem in the same category
  const categoryProblems = problems.filter(p => p?.difficulty === problem?.difficulty);
  const catIdx = categoryProblems.findIndex(p => p.id === problem?.id);
  const nextProblem = catIdx !== -1 && catIdx < categoryProblems.length - 1 ? categoryProblems[catIdx + 1] : null;
  
  const [code, setCode] = useState(problem?.starterCode || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<{passed: number, total: number, log: string[]} | null>(null);
  const [rawOutput, setRawOutput] = useState('');
  const [quizAnswered, setQuizAnswered] = useState<number | null>(null);
  
  const { isRoasting, roastStatus, roastData, roastError, handleRoast, clearRoast } = useRoast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync state if problem loads
  useEffect(() => {
    if (problem) {
      setCode(problem.starterCode);
    }
  }, [problem]);

  if (!problem) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-zinc-950 text-zinc-50 p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Problem not found 😢</h1>
        <button onClick={() => router.push('/problems')} className="px-6 py-2 bg-blue-600 rounded-full hover:bg-blue-500 font-bold transition-colors">
          Go Back
        </button>
      </div>
    );
  }

  // Basic markdown parser for description
  const formatDescription = (text: string) => {
    // Basic bold
    let html = text.replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>');
    // Basic code blocks
    html = html.replace(/```([\\s\\S]*?)```/g, '<pre class="bg-zinc-900 p-4 rounded-xl border border-zinc-800 my-4 text-sm font-mono overflow-x-auto"><code>$1</code></pre>');
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="bg-zinc-800 text-pink-400 px-1 py-0.5 rounded">$1</code>');
    // Newlines to <br/> outside of pre blocks (simplified approach: just map paragraphs)
    const paragraphs = html.split('\\n\\n').map((p, i) => `<p key="${i}" class="mb-4">${p.replace(/\\n/g, '<br/>')}</p>`).join('');
    
    return <div dangerouslySetInnerHTML={{ __html: paragraphs }} className="text-zinc-300 leading-relaxed" />;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newValue = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newValue);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  const handleSubmit = async () => {
    if (!code.trim()) return;
    setIsSubmitting(true);
    setTestResults(null);
    setRawOutput('');
    clearRoast();

    // Extract function name from starter code to call it dynamically
    const funcNameMatch = problem.starterCode.match(/function\\s+([a-zA-Z0-9_]+)/);
    const functionName = funcNameMatch ? funcNameMatch[1] : 'solution';

    // Inject hidden testing logic
    const testSuite = `
${code}

const _tc = ${JSON.stringify(problem.testCases)};
let _passed = 0;
let _log = [];

for (let i = 0; i < _tc.length; i++) {
  try {
    const result = eval('${functionName}(...' + JSON.stringify(_tc[i].input) + ')');
    if (JSON.stringify(result) === JSON.stringify(_tc[i].expected)) {
      _passed++;
      _log.push('Test ' + (i+1) + ': PASS');
    } else {
      _log.push('Test ' + (i+1) + ': FAIL (Expected ' + JSON.stringify(_tc[i].expected) + ', got ' + JSON.stringify(result) + ')');
    }
  } catch(e) {
    _log.push('Test ' + (i+1) + ': ERROR (' + e.message + ')');
  }
}
console.log('===TEST_RESULTS===');
console.log(JSON.stringify({ passed: _passed, total: _tc.length, log: _log }));
`;

    try {
      const res = await fetch('/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: 'javascript', code: testSuite })
      });
      
      const data = await res.json();
      const outputLines = data.output.split('\\n');
      
      // Parse the output to find our test results
      const resultsIdx = outputLines.findIndex((l: string) => l === '===TEST_RESULTS===');
      
      if (resultsIdx !== -1 && outputLines[resultsIdx + 1]) {
        try {
          const parsedResults = JSON.parse(outputLines[resultsIdx + 1]);
          setTestResults(parsedResults);
          
          if (parsedResults.passed === parsedResults.total) {
            // Save completion to local storage
            const saved = localStorage.getItem('completedProblems');
            const completed = saved ? JSON.parse(saved) : [];
            if (!completed.includes(problem.id)) {
              completed.push(problem.id);
              localStorage.setItem('completedProblems', JSON.stringify(completed));
            }
          }
          
        } catch (e) {
          setRawOutput("Failed to parse test results.\\n" + data.output);
        }
      } else {
        // Syntax error or runtime error before our tests could even run
        setRawOutput("Execution Error:\\n" + data.output);
      }
    } catch (err) {
      setRawOutput("Network Error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  let badgeColor = "text-green-400 bg-green-400/10 border-green-400/20";
  if (problem.difficulty === "Intermediate") badgeColor = "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
  if (problem.difficulty === "Expert") badgeColor = "text-red-400 bg-red-400/10 border-red-400/20";

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)] bg-zinc-950 text-zinc-50 font-sans">
      
      {/* Left Panel: Problem Description */}
      <div className="w-full lg:w-1/2 p-6 md:p-10 lg:border-r border-zinc-800 lg:overflow-y-auto lg:max-h-[calc(100vh-4rem)]">
        <div className="mb-6 pb-6 border-b border-zinc-800">
          <Link href="/problems" className="text-zinc-500 hover:text-blue-400 mb-6 inline-block font-medium transition-colors">
            ← Back to Problems
          </Link>
          <div className="flex items-center gap-4 mt-2">
            <h1 className="text-3xl font-bold">{problem.title}</h1>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${badgeColor}`}>
              {problem.difficulty}
            </span>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          {formatDescription(problem.description)}
        </div>

        {problem.miniQuizQuestion && (
          <div className="mt-12 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-pink-400 mb-4 flex items-center gap-2">
              <span>🧠</span> Quick Brain Check
            </h3>
            <p className="text-zinc-200 text-lg mb-6">{problem.miniQuizQuestion.question}</p>
            <div className="flex flex-col gap-3">
              {problem.miniQuizQuestion.options.map((opt, idx) => {
                const isCorrect = idx === problem.miniQuizQuestion!.correctAnswerIndex;
                const isSelected = quizAnswered === idx;
                
                let btnClass = "bg-zinc-800 hover:bg-zinc-700 text-zinc-300";
                if (quizAnswered !== null) {
                  if (isCorrect) btnClass = "bg-green-600/20 text-green-400 border-green-500/50";
                  else if (isSelected && !isCorrect) btnClass = "bg-red-600/20 text-red-400 border-red-500/50";
                  else btnClass = "bg-zinc-950 text-zinc-600 opacity-50 border-zinc-900";
                }

                return (
                  <button
                    key={idx}
                    disabled={quizAnswered !== null}
                    onClick={() => setQuizAnswered(idx)}
                    className={`text-left font-medium py-3 px-5 rounded-xl transition-all border border-transparent ${btnClass} ${quizAnswered === null ? 'hover:scale-[1.02]' : ''}`}
                  >
                    {opt} {quizAnswered !== null && isCorrect && "✅"}
                    {quizAnswered !== null && isSelected && !isCorrect && "❌"}
                  </button>
                );
              })}
            </div>
            
            {quizAnswered !== null && (
              <div className="mt-6 text-center animate-in fade-in slide-in-from-bottom-2 duration-300 flex flex-col items-center gap-4">
                <p className={`text-xl font-black tracking-wide ${quizAnswered === problem.miniQuizQuestion.correctAnswerIndex ? 'text-green-400 uppercase' : 'text-red-500 uppercase'}`}>
                  {quizAnswered === problem.miniQuizQuestion.correctAnswerIndex 
                    ? "BIG BRAIN ENERGY! 🧠 Now go run that code!" 
                    : "Faaaaaaah! 🤬 Are you even trying?! Bro literally just guessed! 🗑️"}
                </p>
                
                {quizAnswered === problem.miniQuizQuestion.correctAnswerIndex && (
                  <img 
                    src="https://media.giphy.com/media/d3mlE7uhX8KFgEmY/giphy.gif" 
                    alt="Roll Safe Big Brain" 
                    className="w-64 rounded-xl border border-green-500/30 shadow-[0_0_30px_rgba(74,222,128,0.2)]"
                  />
                )}

                {quizAnswered !== problem.miniQuizQuestion.correctAnswerIndex && (
                  <img 
                    src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3N2c2t3NXl3ZW9xNXY0amw0cjBpeTNwaDZtcXZrOTZ2NXF1aHM3bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/h36vh423PiV9K/giphy.gif" 
                    alt="Gordon Ramsay Disappointed" 
                    className="w-64 rounded-xl border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.2)]"
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Panel: Editor & Output */}
      <div className="w-full lg:w-1/2 flex flex-col h-auto lg:h-[calc(100vh-4rem)]">
        
        {/* Editor Area */}
        <div className="flex-1 flex flex-col p-6 bg-zinc-900 border-b border-zinc-800">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-zinc-400">Solution.js</h3>
            <div className="flex gap-3">
              <button 
                onClick={() => handleRoast(code)}
                disabled={isRoasting}
                className="bg-pink-600 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded-xl text-sm transition-transform active:scale-95 disabled:opacity-50"
              >
                {isRoasting ? 'Roasting...' : 'Roast this 🔥'}
              </button>
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-xl text-sm transition-transform active:scale-95 shadow-lg shadow-blue-500/20 flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? 'Running...' : 'Submit 🚀'}
              </button>
            </div>
          </div>
          
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            className="flex-1 w-full bg-zinc-950 text-zinc-300 font-mono p-6 rounded-2xl border border-zinc-800 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 resize-none shadow-inner"
          />
        </div>

        {/* Output Panel */}
        <div className="h-64 lg:h-1/3 bg-zinc-950 p-6 overflow-y-auto">
          <h3 className="font-bold text-zinc-500 mb-4 uppercase tracking-wider text-xs">Test Results</h3>
          
          {(isRoasting || roastError || roastData) && (
            <div className="mb-6 pb-6 border-b border-zinc-800 animate-in fade-in slide-in-from-top-4 duration-500">
              {isRoasting && (
                <div className="flex flex-col items-center gap-2 py-2 text-pink-400">
                  <span className="animate-pulse font-bold tracking-widest">{roastStatus} 🔥</span>
                </div>
              )}
              {roastError && <div className="text-red-400 text-sm">{roastError}</div>}
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

          {testResults ? (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className={`text-xl font-bold flex flex-col md:flex-row md:items-center justify-between gap-4 ${testResults.passed === testResults.total ? 'text-green-400' : 'text-red-400'}`}>
                <div>
                  {testResults.passed === testResults.total 
                    ? '🎉 Accepted! All tests passed.' 
                    : `❌ Failed: ${testResults.passed} / ${testResults.total} tests passed.`}
                </div>
                {testResults.passed === testResults.total && nextProblem && (
                  <Link 
                    href={`/problems/${nextProblem.id}`}
                    className="bg-green-600 hover:bg-green-500 text-white text-sm py-2 px-6 rounded-full transition-transform active:scale-95 shadow-lg shadow-green-500/20 text-center"
                  >
                    Next Level ➡️
                  </Link>
                )}
              </div>
              <ul className="space-y-2">
                {testResults.log.map((l, i) => (
                  <li key={i} className={`font-mono text-sm p-3 rounded-lg border ${l.includes('PASS') ? 'bg-green-400/5 border-green-500/20 text-green-300' : 'bg-red-400/5 border-red-500/20 text-red-300'}`}>
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          ) : rawOutput ? (
            <div className="text-red-400 font-mono text-sm whitespace-pre-wrap bg-red-400/5 border border-red-500/20 p-4 rounded-xl">
              {rawOutput}
            </div>
          ) : (
            <div className="text-zinc-600 italic">
              Run your code to see the test results here.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
