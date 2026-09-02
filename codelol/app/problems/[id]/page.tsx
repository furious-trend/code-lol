'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { problems } from '@/lib/problems';
import { useRoast } from '@/hooks/useRoast';
import { RoastCard } from '@/components/RoastCard';
import { useMemeSound } from '@/hooks/useMemeSound';
import { executeCodeInBrowser } from '@/lib/executor';
import { saveProblemCompletion } from '@/lib/progress';
import { getRandomLoadingMessage, getRandomSuccessMessage, getRandomNudgeMessage } from '@/lib/funnyCopy';
import { MilestoneCelebration } from '@/components/MilestoneCelebration';
import ReactMarkdown from 'react-markdown';
import { createClient } from '@/lib/supabase/client';
import confetti from 'canvas-confetti';

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
  const [loadingMsg, setLoadingMsg] = useState('Evaluating... ⏳');
  const [successMsg, setSuccessMsg] = useState('🎉 Accepted! All tests passed.');
  const [nudgeMsg, setNudgeMsg] = useState('One more? Bugsy dares you 😏');
  
  const [showMilestone, setShowMilestone] = useState(false);
  const [milestoneData, setMilestoneData] = useState<{milestone: number, type: 'problem' | 'level'} | null>(null);
  
  const { isRoasting, roastStatus, roastData, roastError, handleRoast, clearRoast } = useRoast();
  const { playMemeSound } = useMemeSound();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const supabase = createClient();
  const [humorPref, setHumorPref] = useState<'general' | 'tamil'>('general');

  useEffect(() => {
    async function loadPref() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('humor_preference')
          .eq('id', user.id)
          .single();
        if (profile?.humor_preference) {
          setHumorPref(profile.humor_preference);
        }
      }
    }
    loadPref();
  }, [supabase]);

  // Sync state if problem loads
  useEffect(() => {
    if (problem) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
    return (
      <ReactMarkdown
        components={{
          strong: ({node, ...props}) => <strong {...props} />,
          pre: ({node, ...props}) => (
            <pre className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 my-4 text-sm font-mono overflow-x-auto" {...props} />
          ),
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          code: ({node, className, children, ...props}: unknown & { node?: unknown, className?: string, children?: React.ReactNode }) => {
            const isBlock = /language-(\w+)/.test(className || '') || String(children).includes('\n');
            return isBlock ? (
              <code className={className} {...(props as any)}>
                {children}
              </code>
            ) : (
              <code className="bg-zinc-800 text-pink-400 px-1 py-0.5 rounded" {...props}>
                {children}
              </code>
            );
          },
          p: ({node, ...props}) => <p className="mb-4 text-zinc-300 leading-relaxed" {...props} />
        }}
      >
        {text}
      </ReactMarkdown>
    );
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
    setIsSubmitting(true);
    setLoadingMsg(getRandomLoadingMessage());
    setTestResults(null);
    setRawOutput('');
    clearRoast();

    // Extract function name from starter code to call it dynamically
    const funcNameMatch = problem.starterCode.match(/function\s+([a-zA-Z0-9_]+)/);
    const functionName = funcNameMatch ? funcNameMatch[1] : 'solution';

    // Inject hidden testing logic
    const testSuite = `
${code}

const _tc = ${JSON.stringify(problem.testCases)};
let _passed = 0;
let _log = [];

(async () => {
  for (let i = 0; i < _tc.length; i++) {
    try {
      let fn;
      try {
        fn = eval('typeof ' + '${functionName}' + " !== 'undefined' ? " + '${functionName}' + ' : undefined');
      } catch(e) {
        fn = undefined;
      }
      if (typeof fn !== 'function') {
        _log.push('Test ' + (i+1) + ': ERROR (Function \\'${functionName}\\' not found. Did you rename it or change its definition?)');
        continue;
      }
      
      // Catch asynchronous hangs with a 2-second timeout
      const result = await Promise.race([
        Promise.resolve(fn(..._tc[i].input)),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Test case timed out (async hang)')), 2000))
      ]);
      
      if (result === undefined) {
        _log.push('Test ' + (i+1) + ': FAIL (No return value detected. Did you forget to use \\'return\\'?)');
        continue;
      }
      
      if (JSON.stringify(result) === JSON.stringify(_tc[i].expected)) {
        _passed++;
        _log.push('Test ' + (i+1) + ': PASS');
      } else {
        _log.push('Test ' + (i+1) + ': FAIL (Expected ' + JSON.stringify(_tc[i].expected) + ', got ' + JSON.stringify(result) + ')');
      }
    } catch(e) {
      if (e instanceof ReferenceError && e.message.includes('${functionName}')) {
        _log.push('Test ' + (i+1) + ': ERROR (Function \\'${functionName}\\' not found. Ensure you did not rename the function!)');
      } else {
        _log.push('Test ' + (i+1) + ': ERROR (' + e.message + ')');
      }
    }
  }
  console.log('===TEST_RESULTS===');
  console.log(JSON.stringify({ passed: _passed, total: _tc.length, log: _log }));
})();
`;

    try {
      const data = await executeCodeInBrowser('javascript', testSuite);
      
      if (data.error) {
        setRawOutput("Execution Error:\n" + data.error);
        const playedSound = playMemeSound(false, humorPref);
        handleRoast(code, "Execution Error:\n" + data.error, false, playedSound, humorPref);
        setIsSubmitting(false);
        return;
      }
      
      const outputLines = data.output.split('\n');
      
      // Parse the output to find our test results
      const resultsIdx = outputLines.findIndex((l: string) => l === '===TEST_RESULTS===');
      
      if (resultsIdx !== -1 && outputLines[resultsIdx + 1]) {
        try {
          const parsedResults = JSON.parse(outputLines[resultsIdx + 1]);
          setTestResults(parsedResults);
          
          if (parsedResults.passed === parsedResults.total) {
            // Check milestone before save
            const savedBefore = localStorage.getItem('completedProblems');
            const completedBefore = savedBefore ? JSON.parse(savedBefore) : [];
            const isNew = !completedBefore.includes(problem.id);
            
            // Save completion via helper
            await saveProblemCompletion(problem.id);
            
            if (isNew && (completedBefore.length + 1) % 5 === 0) {
              setMilestoneData({
                milestone: completedBefore.length + 1,
                type: 'problem'
              });
              setShowMilestone(true);
            }
            
            setSuccessMsg(getRandomSuccessMessage());
            setNudgeMsg(getRandomNudgeMessage());
            const playedSound = playMemeSound(true, humorPref);
            
            // Trigger confetti
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#10b981', '#22c55e', '#34d399']
            });
            
            // Trigger the happy roast (meme/joke) on success
            handleRoast(code, data.output, true, playedSound, humorPref);
          } else {
            const playedSound = playMemeSound(false, humorPref);
            // Automatically trigger the roast (meme/joke) on test failure
            handleRoast(code, data.output, false, playedSound, humorPref);
          }
          
        } catch (e) {
          setRawOutput("Failed to parse test results.\n" + data.output);
          const playedSound = playMemeSound(false, humorPref);
          handleRoast(code, "Failed to parse test results.\n" + data.output, false, playedSound, humorPref);
        }
      } else {
        // Syntax error or runtime error before our tests could even run
        setRawOutput("Execution Error:\n" + data.output);
        const playedSound = playMemeSound(false, humorPref);
        handleRoast(code, "Execution Error:\n" + data.output, false, playedSound, humorPref);
      }
    } catch (err) {
      setRawOutput("Network Error. Please try again.");
      const playedSound = playMemeSound(false, humorPref);
      handleRoast(code, "Network Error. Please try again.", false, playedSound, humorPref);
    } finally {
      setIsSubmitting(false);
    }
  };

  let badgeColor = "text-green-400 bg-green-400/10 border-green-400/20";
  if (problem.difficulty === "Intermediate") badgeColor = "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
  if (problem.difficulty === "Expert") badgeColor = "text-red-400 bg-red-400/10 border-red-400/20";

  return (
    <>
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)] bg-zinc-950 text-zinc-50 font-sans">
      {/* Left Panel: Problem Description & Editor */}
      <div className="w-full lg:w-1/2 flex flex-col h-auto lg:h-[calc(100vh-4rem)] lg:border-r border-zinc-800">
        
        {/* Problem Description Area (Scrollable) */}
        <div className="flex-1 p-6 md:p-10 overflow-y-auto">
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
            <div className="mt-12 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg mb-4">
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
                    <motion.button
                      key={idx}
                      disabled={quizAnswered !== null}
                      onClick={() => setQuizAnswered(idx)}
                      animate={
                        quizAnswered !== null
                          ? isSelected
                            ? isCorrect
                              ? { scale: [1, 1.1, 1], transition: { duration: 0.3 } }
                              : { x: [-10, 10, -10, 10, 0], transition: { duration: 0.4 } }
                            : {}
                          : {}
                      }
                      className={`text-left font-medium py-3 px-5 rounded-xl transition-all border border-transparent ${btnClass} ${quizAnswered === null ? 'hover:scale-[1.02]' : ''}`}
                    >
                      {opt} {quizAnswered !== null && isCorrect && "✅"}
                      {quizAnswered !== null && isSelected && !isCorrect && "❌"}
                    </motion.button>
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
        
        {/* Editor Area (Fixed bottom height) */}
        <motion.div 
          data-testid="editor-wrapper"
          animate={
            testResults && testResults.passed !== testResults.total 
              ? { x: [-8, 8, -6, 6, -3, 3, 0] } 
              : { x: 0 }
          }
          transition={{ duration: 0.35 }}
          className={`h-96 flex flex-col p-6 bg-zinc-900 border-t shrink-0 transition-shadow duration-300 ${
            testResults && testResults.passed !== testResults.total 
              ? 'shadow-[0_0_15px_rgba(239,68,68,0.5)] border-red-500/50' 
              : 'border-zinc-800'
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-zinc-400">Solution.js</h3>
            <div className="flex gap-3">
              <motion.button 
                whileHover={{ scale: 1.025, boxShadow: "0 0 24px rgba(6, 182, 212, 0.35)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 420, damping: 18 }}
                onClick={handleSubmit}
                disabled={isSubmitting || isRoasting}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-xl text-sm transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting || isRoasting ? 'Evaluating... ⏳' : 'Submit & Roast 🚀🔥'}
              </motion.button>
            </div>
          </div>
          
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            className="flex-1 w-full bg-zinc-950 text-zinc-300 font-mono p-4 rounded-2xl border border-zinc-800 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 resize-none shadow-inner"
          />
        </motion.div>
      </div>

      {/* Right Panel: Output & Roast */}
      <div className="w-full lg:w-1/2 flex flex-col h-auto lg:h-[calc(100vh-4rem)]">
        
        {/* Output Panel (Takes full height) */}
        <div 
          data-testid="terminal-wrapper"
          className={`flex-1 bg-zinc-950 p-6 md:p-10 overflow-y-auto transition-shadow duration-500 ${
            testResults && testResults.passed === testResults.total 
              ? 'shadow-[inset_0_0_20px_rgba(34,197,94,0.3)] border border-green-500/30' 
              : ''
          }`}
        >
          <h3 className="font-bold text-zinc-500 mb-6 uppercase tracking-wider text-sm border-b border-zinc-800 pb-2">Execution Output & Roast</h3>
          
          {(isRoasting || roastError || roastData) && (
            <div className="mb-6 pb-6 border-b border-zinc-800 animate-in fade-in slide-in-from-top-4 duration-500">
              {isRoasting && (
                <div className="flex flex-col items-center gap-2 py-4 text-pink-400">
                  <span className="animate-pulse font-bold tracking-widest text-lg">{roastStatus === 'Roasting...' ? loadingMsg : roastStatus} 🔥</span>
                </div>
              )}
              {roastError && <div className="text-red-400 text-sm p-4 bg-red-500/10 rounded-lg">{roastError}</div>}
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
              <div className={`text-xl font-bold flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg ${testResults.passed === testResults.total ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                <div>
                  {testResults.passed === testResults.total 
                    ? successMsg 
                    : `❌ Failed: ${testResults.passed} / ${testResults.total} tests passed.`}
                </div>
                {testResults.passed === testResults.total && nextProblem && (
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs text-green-500/70 font-bold uppercase tracking-wider">{nudgeMsg}</span>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link 
                        href={`/problems/${nextProblem.id}`}
                        className="bg-green-600 hover:bg-green-500 text-white text-sm py-2 px-6 rounded-full shadow-lg shadow-green-500/20 text-center inline-block"
                      >
                        Next Level ➡️
                      </Link>
                    </motion.div>
                  </div>
                )}
              </div>
              <ul className="space-y-2 mt-4">
                {testResults.log.map((l, i) => (
                  <li key={i} className={`font-mono text-sm p-3 rounded-lg border ${l.includes('PASS') ? 'bg-green-400/5 border-green-500/20 text-green-300' : 'bg-red-400/5 border-red-500/20 text-red-300'}`}>
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          ) : rawOutput ? (
            <div className="text-red-400 font-mono text-sm whitespace-pre-wrap bg-red-400/5 border border-red-500/20 p-6 rounded-xl">
              {rawOutput}
            </div>
          ) : (
            <div className="text-zinc-600 italic p-6 bg-zinc-900/50 rounded-xl text-center">
              Run your code to see the test results and roast here!
            </div>
          )}
        </div>
      </div>
    </div>
    
    {showMilestone && milestoneData && (
      <MilestoneCelebration
        milestone={milestoneData.milestone}
        type={milestoneData.type}
        onDismiss={() => setShowMilestone(false)}
      />
    )}
    </>
  );
}
