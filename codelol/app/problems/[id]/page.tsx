// agent-notes: { ctx: "Problem solver page with solution gating, progressive hints, forfeit XP handling, and roast feedback", deps: ["@/lib/problems", "@/lib/executor", "@/lib/progress", "@/components/Bugsy"], state: active, last: "sato@2026-10-30" }
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { problems, getModuleProblem, resolveActiveLanguage, ModuleProblem, getProblemSolution } from '@/lib/problems';
import { useRoast } from '@/hooks/useRoast';
import { RoastCard } from '@/components/RoastCard';
import { useMemeSound } from '@/hooks/useMemeSound';
import { executeCode } from '@/lib/executor';
import { saveProblemCompletion } from '@/lib/progress';
import { getRandomLoadingMessage, getRandomSuccessMessage, getRandomNudgeMessage } from '@/lib/funnyCopy';
import { MilestoneCelebration } from '@/components/MilestoneCelebration';
import { Bugsy } from '@/components/Bugsy';
import ReactMarkdown from 'react-markdown';
import { createClient } from '@/lib/supabase/client';
import confetti from 'canvas-confetti';
import { getResultGif } from '@/lib/localGifs';

function getSearchParam(key: string): string | null {
  if (typeof window !== 'undefined' && window.location && window.location.search) {
    try {
      return new URLSearchParams(window.location.search).get(key);
    } catch {
      return null;
    }
  }
  return null;
}

const getTimestamp = () => Date.now();

export default function ProblemSolverPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const queryLang = getSearchParam('lang') || getSearchParam('language');


  const [activeLang, setActiveLang] = useState<string>(() => {
    const localGuest = typeof window !== 'undefined' ? localStorage.getItem('guest_lang') : null;
    if (typeof resolveActiveLanguage === 'function') {
      return resolveActiveLanguage(queryLang, null, localGuest);
    }
    return queryLang || 'javascript';
  });

  const moduleProb = typeof getModuleProblem === 'function' ? getModuleProblem(id, activeLang) : undefined;
  const problem = moduleProb || problems.find((p: any) => p.id === id);
  
  // Find next problem in the same category
  const categoryProblems = problems.filter((p: any) => p?.difficulty === (problem as any)?.difficulty || (problem as any)?.tier);
  const catIdx = categoryProblems.findIndex((p: any) => p.id === problem?.id);
  const nextProblem = catIdx !== -1 && catIdx < categoryProblems.length - 1 ? categoryProblems[catIdx + 1] : null;

  const [code, setCode] = useState(problem?.starterCode || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<{passed: number, total: number, log: string[]} | null>(null);
  const [rawOutput, setRawOutput] = useState('');
  const [quizAnswered, setQuizAnswered] = useState<number | null>(null);
  const [loadingMsg, setLoadingMsg] = useState('⏳ Compiling... please wait');
  const [successMsg, setSuccessMsg] = useState('🎉 Accepted! All tests passed.');
  const [nudgeMsg, setNudgeMsg] = useState('One more? Bugsy dares you 😏');
  
  const [showMilestone, setShowMilestone] = useState(false);
  const [milestoneData, setMilestoneData] = useState<{milestone: number, type: 'problem' | 'level'} | null>(null);
  
  // Gating & Progressive Hints State
  const [isSolved, setIsSolved] = useState(false);
  const [isForfeited, setIsForfeited] = useState(false);
  const [showForfeitModal, setShowForfeitModal] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [showHint2, setShowHint2] = useState(false);
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'problem' | 'solution'>('problem');
  const [copiedSolution, setCopiedSolution] = useState(false);

  const { isRoasting, roastStatus, roastData, roastError, handleRoast, clearRoast } = useRoast();
  const { playMemeSound } = useMemeSound();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const supabaseRef = useRef<ReturnType<typeof createClient> | null>(null);
  if (!supabaseRef.current) {
    supabaseRef.current = createClient();
  }
  const supabase = supabaseRef.current;
  const [humorPref, setHumorPref] = useState<'general' | 'tamil'>('general');
  const [learningLanguage, setLearningLanguage] = useState<string>('javascript');
  const [isLessonRead, setIsLessonRead] = useState(false);

  const hints = (problem as any)?.hints;
  const moduleId = (problem as any)?.moduleId;
  const chapterId = (problem as any)?.chapterId;

  const refSolution = problem ? getProblemSolution(problem, activeLang) : {
    code: '// Reference solution',
    explanation: 'Solve this challenge to unlock the breakdown.',
    syntaxClue: 'Check parameter types and return requirements.'
  };

  // Reset state when switching between problems
  useEffect(() => {
    setIsSolved(false);
    setIsForfeited(false);
    setActiveWorkspaceTab('problem');
    setShowHints(false);
    setShowHint2(false);
    setShowForfeitModal(false);
    setTestResults(null);
    setRawOutput('');
    clearRoast();
  }, [id]);

  useEffect(() => {
    let isCancelled = false;

    async function loadPref() {
      const actualProbId = activeLang === 'python' ? `${id}-python` : id;
      const { data: { user } } = await supabase.auth.getUser();
      if (isCancelled) return;

      if (user) {
        if (user.id === 'local-guest') {
          const storedHumor = localStorage.getItem('guest_humor');
          if (storedHumor === 'tamil' || storedHumor === 'general') setHumorPref(storedHumor);
          const storedLang = localStorage.getItem('guest_lang');
          if (storedLang && ['python', 'javascript', 'c', 'cpp', 'java'].includes(storedLang) && !queryLang) {
            setLearningLanguage(storedLang);
            setActiveLang(storedLang);
          }
          if (moduleId) {
            const guestTopics = localStorage.getItem(`learned_topics_${activeLang}`);
            if (guestTopics && JSON.parse(guestTopics).includes(moduleId)) {
              setIsLessonRead(true);
            }
          }
          // Check local completion / forfeit
          const localKey = activeLang === 'python' ? 'completedProblems_python' : 'completedProblems';
          const saved = localStorage.getItem(localKey);
          const completed = saved ? JSON.parse(saved) : [];
          const forfeitedRaw = localStorage.getItem('forfeitedProblems');
          const forfeited = forfeitedRaw ? JSON.parse(forfeitedRaw) : [];
          if (!isCancelled) {
            if (completed.includes(id) || completed.includes(actualProbId)) {
              setIsSolved(true);
            } else if (forfeited.includes(id) || forfeited.includes(actualProbId)) {
              setIsForfeited(true);
            }
          }
        } else {
          const { data: profile } = await supabase
            .from('profiles')
            .select('humor_preference, learning_language')
            .eq('id', user.id)
            .single();
          if (isCancelled) return;
          if (profile?.humor_preference) {
            setHumorPref(profile.humor_preference);
          }
          if (profile?.learning_language && !queryLang) {
            setLearningLanguage(profile.learning_language);
            setActiveLang(profile.learning_language);
          }
          if (moduleId) {
            const { data: prog } = await supabase
              .from('library_progress')
              .select('learned')
              .eq('user_id', user.id)
              .eq('item_id', moduleId)
              .eq('learned', true)
              .maybeSingle();
            if (isCancelled) return;
            if (prog?.learned) setIsLessonRead(true);
          }

          // Check problem completion in Supabase
          try {
            const { data: comp } = await supabase
              .from('problem_completions')
              .select('problem_id, points_awarded')
              .eq('user_id', user.id)
              .in('problem_id', [id, actualProbId])
              .maybeSingle();

            if (isCancelled) return;

            if (comp) {
              if (comp.points_awarded === 0) {
                setIsForfeited(true);
              } else {
                setIsSolved(true);
              }
            } else {
              // Local fallback for offline/guest sync
              const localKey = activeLang === 'python' ? 'completedProblems_python' : 'completedProblems';
              const saved = localStorage.getItem(localKey);
              const completed = saved ? JSON.parse(saved) : [];
              const forfeitedRaw = localStorage.getItem('forfeitedProblems');
              const forfeited = forfeitedRaw ? JSON.parse(forfeitedRaw) : [];
              if (completed.includes(id) || completed.includes(actualProbId)) {
                setIsSolved(true);
              } else if (forfeited.includes(id) || forfeited.includes(actualProbId)) {
                setIsForfeited(true);
              }
            }
          } catch {
            // Non-blocking
          }
        }
      }
    }
    loadPref();

    return () => {
      isCancelled = true;
    };
  }, [supabase, activeLang, moduleId, queryLang, id]);

  // Sync state if problem loads
  useEffect(() => {
    if (problem) {
      if (activeLang === 'python' && problem.starterCodePython) {
        setCode(problem.starterCodePython);
      } else if (activeLang === 'c' && problem.starterCodeC) {
        setCode(problem.starterCodeC);
      } else if (activeLang === 'cpp' && problem.starterCodeCpp) {
        setCode(problem.starterCodeCpp);
      } else if (activeLang === 'java' && problem.starterCodeJava) {
        setCode(problem.starterCodeJava);
      } else {
        setCode(problem.starterCode);
      }
    }
  }, [problem, activeLang]);

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
    if (!startTimeRef.current) {
      startTimeRef.current = Date.now();
    }
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

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!startTimeRef.current) {
      startTimeRef.current = Date.now();
    }
    setCode(e.target.value);
  };

  const handleProblemSuccess = async (output: string) => {
    // Automatically unlock the solution
    setIsSolved(true);

    // Calculate solve time
    const solveTimeMs = startTimeRef.current ? getTimestamp() - startTimeRef.current : 0;
    
    // Check milestone before save
    const savedBefore = localStorage.getItem('completedProblems');
    const completedBefore = savedBefore ? JSON.parse(savedBefore) : [];
    const isNew = !completedBefore.includes(problem.id);
    
    // Fetch AI complexity estimation
    let timeComplexity = 'O(?)';
    let spaceComplexity = 'O(?)';
    try {
      const res = await fetch('/api/analyze-complexity', {
        method: 'POST',
        body: JSON.stringify({ code, language: activeLang })
      });
      if (res.ok) {
        const complexity = await res.json();
        timeComplexity = complexity.timeComplexity;
        spaceComplexity = complexity.spaceComplexity;
      }
    } catch (err) {
      console.error('Error fetching complexity:', err);
    }

    // Save completion via helper
    await saveProblemCompletion(problem.id, {
      solveTimeMs,
      timeComplexity,
      spaceComplexity,
      pointsAwarded: 100 // Fixed base points for now
    }, activeLang);
    
    if (isNew && (completedBefore.length + 1) % 5 === 0) {
      setMilestoneData({
        milestone: completedBefore.length + 1,
        type: 'problem'
      });
      setShowMilestone(true);
    }
    
    if (isLessonRead) {
      setSuccessMsg("🏆 Module Complete! Both lesson read & challenge conquered!");
    } else if (moduleId) {
      setSuccessMsg("🎉 Accepted! Next: Read the curriculum lesson to 100% finish this module!");
    } else {
      setSuccessMsg(getRandomSuccessMessage());
    }
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
    handleRoast(code, output, true, playedSound, humorPref);
  };

  const handleConfirmForfeit = async () => {
    setIsForfeited(true);
    setShowForfeitModal(false);
    setActiveWorkspaceTab('solution');

    // Save completion with 0 points awarded so no XP is added
    await saveProblemCompletion(problem.id, {
      pointsAwarded: 0,
      solveTimeMs: 0,
      timeComplexity: 'N/A',
      spaceComplexity: 'N/A'
    }, activeLang);

    try {
      const forfeitedRaw = localStorage.getItem('forfeitedProblems');
      const forfeited = forfeitedRaw ? JSON.parse(forfeitedRaw) : [];
      if (!forfeited.includes(problem.id)) {
        forfeited.push(problem.id);
        localStorage.setItem('forfeitedProblems', JSON.stringify(forfeited));
      }
    } catch {}
  };

  const handleCopySolution = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(refSolution.code);
      setCopiedSolution(true);
      setTimeout(() => setCopiedSolution(false), 2000);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setLoadingMsg(getRandomLoadingMessage());
    setTestResults(null);
    setRawOutput('');
    clearRoast();

    const expectedOutput = (problem as any)?.expectedOutput;
    const isScriptProblem = expectedOutput !== undefined && expectedOutput !== null;

    let testSuite = '';

    if (isScriptProblem) {
      testSuite = code;
    } else {
      let functionName = 'solution';
      if (activeLang === 'python') {
         const funcNameMatch = (problem.starterCodePython || problem.starterCode).match(/def\s+([a-zA-Z0-9_]+)/);
         if (funcNameMatch) functionName = funcNameMatch[1];
      } else {
         const funcNameMatch = problem.starterCode.match(/function\s+([a-zA-Z0-9_]+)/);
         if (funcNameMatch) functionName = funcNameMatch[1];
      }

      if ((problem as any)?.testHarness) {
        testSuite = (problem as any).testHarness.replace("{{USER_CODE}}", code);
      } else if (activeLang === 'python' || activeLang === 'javascript') {
        if (activeLang === 'python') {
          testSuite = `
${code}

import json
_tc = json.loads('${JSON.stringify(problem.testCases || []).replace(/'/g, "\\'")}')
_passed = 0
_log = []

for i, tc in enumerate(_tc):
    try:
        if '${functionName}' not in globals():
            _log.append("Test " + str(i+1) + ": ERROR (Function '${functionName}' not found. Did you rename it or change its definition?)")
            continue
            
        fn = globals()['${functionName}']
        result = fn(*tc['input'])
        
        if result == tc['expected']:
            _passed += 1
            _log.append("Test " + str(i+1) + ": PASS")
        else:
            _log.append("Test " + str(i+1) + ": FAIL (Expected " + json.dumps(tc['expected']) + ", got " + json.dumps(result) + ")")
    except Exception as e:
        _log.append("Test " + str(i+1) + ": ERROR (" + str(e) + ")")

print('===TEST_RESULTS===')
print(json.dumps({'passed': _passed, 'total': len(_tc), 'log': _log}))
`;
        } else {
          testSuite = `
${code}

const _tc = ${JSON.stringify(problem.testCases || [])};
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
        }
      } else if (activeLang === "c" && problem.testHarnessC) {
        testSuite = problem.testHarnessC.replace("{{USER_CODE}}", code);
      } else if (activeLang === "cpp" && problem.testHarnessCpp) {
        testSuite = problem.testHarnessCpp.replace("{{USER_CODE}}", code);
      } else if (activeLang === "java" && problem.testHarnessJava) {
        testSuite = problem.testHarnessJava.replace("{{USER_CODE}}", code.replace(/public\s+class\s+Main/g, "class UserMain").replace(/public\s+static\s+void\s+main/g, "public static void user_main"));
      } else {
        setRawOutput("Sorry, " + activeLang.toUpperCase() + " is not fully supported for this specific problem yet (missing test harness). Try JavaScript or Python!");
        setLoadingMsg("Unsupported Language");
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const data = await executeCode(activeLang, testSuite);
      
      const isGenericFailure = Boolean(
        (data.error && data.error.toLowerCase().includes('code execution failed')) ||
        (data.output && data.output.toLowerCase().includes('code execution failed'))
      );

      if (isGenericFailure) {
        const friendlyError = "Check for missing quotes, missing colons (:), or indentation errors!";
        setRawOutput(friendlyError);
        const playedSound = playMemeSound(false, humorPref);
        handleRoast(code, friendlyError, false, playedSound, humorPref);
        setIsSubmitting(false);
        return;
      }

      if (data.error) {
        setRawOutput("Execution Error:\n" + data.error);
        const playedSound = playMemeSound(false, humorPref);
        handleRoast(code, "Execution Error:\n" + data.error, false, playedSound, humorPref);
        setIsSubmitting(false);
        return;
      }

      if (isScriptProblem) {
        const userStdout = (data.output || '').trim();
        const targetOutput = String(expectedOutput).trim();

        if (userStdout === targetOutput) {
          const parsedResults = {
            passed: 1,
            total: 1,
            log: [`Output matched expected: "${targetOutput}"`]
          };
          setTestResults(parsedResults);
          await handleProblemSuccess(data.output || targetOutput);
          setIsSubmitting(false);
          return;
        } else {
          const parsedResults = {
            passed: 0,
            total: 1,
            log: [
              `Expected output: "${targetOutput}"`,
              `Your output: "${userStdout}"`
            ]
          };
          setTestResults(parsedResults);
          const playedSound = playMemeSound(false, humorPref);
          handleRoast(code, `Expected output: "${targetOutput}", Got: "${userStdout}"`, false, playedSound, humorPref);
          setIsSubmitting(false);
          return;
        }
      }
      
      const outputLines = data.output.split('\n');
      
      // Parse the output to find our test results
      const resultsIdx = outputLines.findIndex((l: string) => l.trim() === '===TEST_RESULTS===');
      const jsonLine = resultsIdx !== -1
        ? outputLines.slice(resultsIdx + 1).find((l: string) => l.trim().length > 0)
        : null;

      if (jsonLine) {
        try {
          const parsedResults = JSON.parse(jsonLine);
          setTestResults(parsedResults);
          
          if (parsedResults.passed === parsedResults.total) {
            await handleProblemSuccess(data.output);
          } else {
            const playedSound = playMemeSound(false, humorPref);
            // Automatically trigger the roast (meme/joke) on test failure
            handleRoast(code, data.output, false, playedSound, humorPref);
          }
          setIsSubmitting(false);
          return;
        } catch (parseErr) {
          console.error("Failed to parse test results JSON:", parseErr);
        }
      }
      
      if (activeLang !== 'javascript' && activeLang !== 'python') {
        // Fallback for execution without ===TEST_RESULTS===
        setRawOutput(data.output || "Code ran successfully with no output.");
        setSuccessMsg("Executed Successfully!");
        setTestResults({ passed: 1, total: 1, log: ["Execution Output:", ...(data.output || "No output").split('\n')] });
        
        // Wait for roast and GIF to fully load
        const playedSound = playMemeSound(true, humorPref);
        handleRoast(code, data.output || "Code ran successfully with no output.", true, playedSound, humorPref);
        
        setIsSubmitting(false);
        return;
      }
      setRawOutput(data.output || "Execution completed with no test results.");

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
            <div className="flex items-center justify-between mb-4">
              <Link href={`/problems?lang=${activeLang}`} className="text-zinc-500 hover:text-blue-400 inline-block font-medium transition-colors text-sm">
                ← Back to Problems ({activeLang.toUpperCase()})
              </Link>
              {moduleId && (
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono font-bold">
                    Module {moduleId}
                  </span>
                  <Link
                    href={`/lessons?lang=${activeLang}&topic=${moduleId}`}
                    className="text-xs text-zinc-400 hover:text-blue-400 flex items-center gap-1 transition-colors font-medium"
                  >
                    <span>Curriculum Lesson 📖</span>
                    {isLessonRead ? <span className="text-green-400">✅</span> : <span className="text-zinc-500">○</span>}
                  </Link>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-4 mt-2">
              <h1 className="text-3xl font-bold">{problem.title}</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${badgeColor}`}>
                {(problem as any).difficulty || (problem as any).tier}
              </span>
              <select 
                value={activeLang}
                onChange={async (e) => {
                  const newLang = e.target.value;
                  // Set new starter code based on selection if available
                  if (newLang === 'python' && problem.starterCodePython) {
                    setCode(problem.starterCodePython);
                  } else if (newLang === 'javascript') {
                    setCode(problem.starterCode);
                  } else if (newLang === 'c' && problem.starterCodeC) {
                    setCode(problem.starterCodeC);
                  } else if (newLang === 'cpp' && problem.starterCodeCpp) {
                    setCode(problem.starterCodeCpp);
                  } else if (newLang === 'java' && problem.starterCodeJava) {
                    setCode(problem.starterCodeJava);
                  } else {
                    // Fallback
                    const starters: Record<string, string> = {
                      c: '#include <stdio.h>\n\nint main() {\n    // Write your code here\n    return 0;\n}',
                      cpp: '#include <iostream>\n\nint main() {\n    // Write your code here\n    return 0;\n}',
                      java: 'public class Main {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}'
                    };
                    setCode(starters[newLang] || '');
                  }
                  setActiveLang(newLang);
                  
                  // Sync globally so if they click Learn or Lessons, it loads the correct language!
                  const { data: { user } } = await supabase.auth.getUser();
                  if (user && user.id !== 'local-guest') {
                    await supabase.from('profiles').update({ learning_language: newLang }).eq('id', user.id);
                  } else {
                    localStorage.setItem('guest_lang', newLang);
                  }
                  router.refresh();
                }}
                className="bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-sm text-zinc-400 focus:outline-none focus:border-blue-500 cursor-pointer ml-auto"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="c">C</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
              </select>
            </div>

            {/* Left Panel Tabs: Description vs Solution */}
            <div className="flex items-center gap-6 mt-4 border-b border-zinc-800">
              <button
                type="button"
                onClick={() => setActiveWorkspaceTab('problem')}
                className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
                  activeWorkspaceTab === 'problem'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <span>📝 Problem Description</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveWorkspaceTab('solution')}
                className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
                  activeWorkspaceTab === 'solution'
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <span>{isSolved ? '🔓 Solution & Breakdown' : isForfeited ? '🏳️ Solution (Forfeited)' : '🔒 Official Solution'}</span>
                {isSolved && (
                  <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-bold">
                    PASSED
                  </span>
                )}
                {isForfeited && !isSolved && (
                  <span className="bg-amber-500/20 text-amber-400 text-[10px] px-2 py-0.5 rounded-full font-bold">
                    0 XP
                  </span>
                )}
              </button>
            </div>

          </div>

          {activeWorkspaceTab === 'problem' ? (
            <>
              <div className="prose prose-invert max-w-none">
                {formatDescription(problem.description)}
              </div>

              {/* Progressive Hints Section */}
              <div className="mt-6 p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 backdrop-blur">
                <button
                  onClick={() => setShowHints(!showHints)}
                  type="button"
                  className="flex items-center justify-between w-full font-bold text-sm text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">💡 Progressive Hints</span>
                  <span className="text-xs text-zinc-500 font-semibold">{showHints ? 'Hide Hints' : 'Reveal Hints'}</span>
                </button>
                {showHints && (
                  <div className="mt-4 space-y-4 text-xs sm:text-sm text-zinc-300 animate-in fade-in duration-200">
                    <div className="p-3 rounded-lg bg-zinc-950/70 border border-zinc-800">
                      <p className="font-semibold text-yellow-400 mb-1 flex items-center gap-1.5">
                        <span>🔍</span> Hint 1: Gentle Nudge (Logic Concept)
                      </p>
                      <p className="text-zinc-300 leading-relaxed">{hints?.english || "Break the task down into sequential steps."}</p>
                    </div>

                    {/* Hint 2: Syntax Clue */}
                    <div className="p-3 rounded-lg bg-zinc-950/70 border border-zinc-800">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-blue-400 flex items-center gap-1.5">
                          <span>⌨️</span> Hint 2: Syntax Clue ({activeLang.toUpperCase()})
                        </p>
                        {!showHint2 && (
                          <button
                            type="button"
                            onClick={() => setShowHint2(true)}
                            className="text-[11px] font-bold text-blue-400 hover:text-blue-300 underline cursor-pointer"
                          >
                            Reveal Syntax Clue
                          </button>
                        )}
                      </div>
                      {showHint2 ? (
                        <p className="text-zinc-300 mt-2 font-mono text-xs bg-zinc-900 p-2 rounded border border-zinc-800">
                          {refSolution.syntaxClue}
                        </p>
                      ) : (
                        <p className="text-zinc-500 text-xs mt-1 italic">Click above if you need the exact function or operator syntax.</p>
                      )}
                    </div>

                    {hints?.tamilRoast && (
                      <div className="p-3 rounded-lg bg-pink-950/30 border border-pink-500/20 text-pink-300 font-medium">
                        <p className="font-bold text-pink-400 mb-1">Bugsy&apos;s Tamil Roast 🌶️:</p>
                        <p>{hints.tamilRoast}</p>
                      </div>
                    )}

                    {!isSolved && !isForfeited && (
                      <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between">
                        <span className="text-[11px] text-zinc-500">Still stuck after hints?</span>
                        <button
                          type="button"
                          onClick={() => setShowForfeitModal(true)}
                          className="text-[11px] font-bold text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                        >
                          🏳️ Give up & reveal solution (0 XP)
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Solution Status Bar (Only shown after solve or forfeit) */}
              {(isSolved || isForfeited) && (
                <div className="mt-6 p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{isSolved ? '🔓' : '🏳️'}</span>
                    <div>
                      <p className="text-sm font-bold text-zinc-200">
                        {isSolved ? 'Official Solution Unlocked!' : 'Solution Revealed (Forfeited)'}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {isSolved ? 'Compare your algorithm with the reference solution.' : 'Reviewed with 0 XP awarded.'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveWorkspaceTab('solution')}
                    className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-300 transition-colors"
                  >
                    View Solution →
                  </button>
                </div>
              )}

              {problem.miniQuizQuestion && (
                <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg mb-4">
                  <h3 className="text-xl font-bold text-pink-400 mb-4 flex items-center gap-2">
                    <span>🧠</span> Quick Brain Check
                  </h3>
                  <p className="text-zinc-200 text-lg mb-6">{problem.miniQuizQuestion.question}</p>
                  <div className="flex flex-col gap-3">
                    {problem.miniQuizQuestion.options.map((opt: string, idx: number) => {
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
                          src={getResultGif(true, humorPref)} 
                          alt="Success GIF" 
                          className="w-64 rounded-xl border border-green-500/30 shadow-[0_0_30px_rgba(74,222,128,0.2)]"
                        />
                      )}

                      {quizAnswered !== problem.miniQuizQuestion.correctAnswerIndex && (
                        <img 
                          src={getResultGif(false, humorPref)} 
                          alt="Fail GIF" 
                          className="w-64 rounded-xl border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.2)]"
                        />
                      )}
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            /* Solution Workspace View */
            <div className="py-2 space-y-6">
              {!isSolved && !isForfeited ? (
                /* Locked Solution Card */
                <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur text-center flex flex-col items-center my-4 shadow-xl">
                  <div className="w-16 h-16 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-3xl mb-4 shadow-xl">
                    🔒
                  </div>
                  <h3 className="text-xl font-bold text-zinc-100">Solution Locked</h3>
                  <p className="text-sm text-zinc-400 mt-2 max-w-md">
                    Pass all test cases to unlock the official solution and breakdown.
                  </p>

                    <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveWorkspaceTab('problem')}
                        className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shadow-lg shadow-blue-500/20"
                      >
                        ← Back to Challenge
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowForfeitModal(true)}
                        className="px-5 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-bold text-xs transition-colors"
                      >
                        🏳️ I Give Up (Reveal Solution)
                      </button>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-3">
                      ⚠️ Giving up will reveal the code immediately, but awards 0 XP for this challenge.
                    </p>
                </div>
              ) : (
                /* Unlocked Solution Display */
                <div className="space-y-6 animate-in fade-in duration-300">
                  {isSolved ? (
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold flex items-center gap-3">
                      <span className="text-2xl">🏆</span>
                      <div>
                        <p className="font-bold">Challenge Passed! Compare your approach with the reference solution.</p>
                        <p className="text-xs text-emerald-400/80 mt-0.5">Full XP awarded. Study the breakdown below to optimize your solution.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-semibold flex items-center gap-3">
                      <span className="text-2xl">🏳️</span>
                      <div>
                        <p className="font-bold">Challenge Forfeited (0 XP Awarded).</p>
                        <p className="text-xs text-amber-400/80 mt-0.5">Study the official solution and breakdown, then try solving similar problems without peeking!</p>
                      </div>
                    </div>
                  )}

                  {/* Reference Code Box */}
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 overflow-hidden shadow-2xl">
                    <div className="px-5 py-3 border-b border-zinc-800 bg-zinc-950/80 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                        <span className="font-mono text-xs font-bold text-zinc-300">
                          Official Reference Solution ({activeLang.toUpperCase()})
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopySolution}
                        className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono font-medium transition-colors flex items-center gap-1.5"
                      >
                        <span>{copiedSolution ? '✅' : '📋'}</span>
                        <span>{copiedSolution ? 'Copied!' : 'Copy Code'}</span>
                      </button>
                    </div>

                    <pre className="p-5 font-mono text-sm text-emerald-300/90 overflow-x-auto leading-relaxed bg-zinc-950/90">
                      <code>{refSolution.code}</code>
                    </pre>
                  </div>

                  {/* Breakdown Explanation */}
                  <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur">
                    <h4 className="text-base font-bold text-zinc-200 mb-3 flex items-center gap-2">
                      <span>💡</span> Logic Breakdown & Approach
                    </h4>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {refSolution.explanation}
                    </p>
                  </div>
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
            <h3 className="font-bold text-zinc-400 font-mono text-xs">
              {activeLang === 'python' ? 'main.py' : activeLang === 'c' ? 'main.c' : activeLang === 'cpp' ? 'main.cpp' : activeLang === 'java' ? 'Main.java' : 'index.js'}
            </h3>
            <div className="flex gap-3">
              <motion.button 
                whileHover={{ scale: 1.025, boxShadow: "0 0 24px rgba(6, 182, 212, 0.35)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 420, damping: 18 }}
                onClick={handleSubmit}
                disabled={isSubmitting || isRoasting}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-xl text-sm transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting || isRoasting ? '⏳ Compiling... please wait' : 'Submit & Roast 🚀🔥'}
              </motion.button>
            </div>
          </div>
          
          <textarea
            ref={textareaRef}
            value={code}
            onChange={handleCodeChange}
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
          
          {(isRoasting || roastError || roastData) && (
            <div className="mt-6 pt-6 border-t border-zinc-800 animate-in fade-in slide-in-from-top-4 duration-500">
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
        </div>
      </div>
    </div>
    
    {/* Forfeit Confirmation Modal */}
    <AnimatePresence>
      {showForfeitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-lg rounded-3xl bg-zinc-900 border border-zinc-800 p-6 md:p-8 shadow-2xl relative text-center flex flex-col items-center"
          >
            <div className="mb-4">
              <Bugsy mood="dizzy" size={64} />
            </div>

            <h3 className="text-2xl font-black text-white">Wait! Give Up Already? 🏳️</h3>

            {/* Humor Quote */}
            <div className="my-5 p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 text-sm leading-relaxed w-full">
              {humorPref === 'tamil' ? (
                <p className="text-pink-300 font-medium italic">
                  &ldquo;Enna thala, 2 nimishathula surrender aayitiya? Exam hall-la bit adikkura maari solution-ah paaka poriya? Appa kattina fees-ku konjam kooda yosikka maatiya da?!&rdquo;
                </p>
              ) : (
                <p className="text-amber-300 font-medium italic">
                  &ldquo;Giving up already? StackOverflow is weeping. Revealing the solution will forfeit XP for this challenge.&rdquo;
                </p>
              )}
            </div>

            <p className="text-xs text-zinc-400 mb-6">
              Revealing the solution will mark this challenge as completed, but with <strong className="text-red-400">0 XP</strong> added to your profile and leaderboard ranking.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              <button
                type="button"
                onClick={() => setShowForfeitModal(false)}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-sm transition-colors"
              >
                Never Mind, I&apos;ll Keep Trying! 💪
              </button>
              <button
                type="button"
                onClick={handleConfirmForfeit}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-colors shadow-lg shadow-red-600/20"
              >
                Yes, Show Solution (0 XP) 🏳️
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>

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
