'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useBattle } from '@/hooks/useBattle';
import { startBattle, updateParticipantProgress, finishBattle } from '@/lib/battles';
import { problems } from '@/lib/problems';
import { executeCodeInBrowser } from '@/lib/executor';
import { Bugsy } from '@/components/Bugsy';
import Link from 'next/link';
import Confetti from 'react-confetti';

export default function BattleRoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomCode = params.room_code as string;
  
  const { battle, participants, loading, currentUserId } = useBattle(roomCode);
  
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [rawOutput, setRawOutput] = useState('');
  const [testResults, setTestResults] = useState<{passed: number, total: number, log: string[]} | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const problem = battle ? problems.find(p => p.id === battle.problem_id) : null;
  const isHost = battle?.created_by === currentUserId;
  const myParticipantRecord = participants.find(p => p.user_id === currentUserId);
  const allFinished = participants.length > 0 && participants.every(p => p.finished);

  // Sync starter code
  useEffect(() => {
    if (problem && !code && !myParticipantRecord?.submission_code) {
      setCode(problem.starterCode);
    } else if (myParticipantRecord?.submission_code && !code) {
      setCode(myParticipantRecord.submission_code);
    }
  }, [problem, myParticipantRecord, code]);

  // Timer logic
  useEffect(() => {
    if (battle?.status === 'active' && battle.started_at) {
      const interval = setInterval(() => {
        const startedAt = new Date(battle.started_at!).getTime();
        const now = Date.now();
        const elapsedSeconds = Math.floor((now - startedAt) / 1000);
        const remaining = battle.time_limit_seconds - elapsedSeconds;
        
        if (remaining <= 0) {
          setTimeRemaining(0);
          clearInterval(interval);
          if (isHost && battle.status !== 'finished') {
            finishBattle(battle.id);
          }
        } else {
          setTimeRemaining(remaining);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [battle?.status, battle?.started_at, battle?.time_limit_seconds, isHost, battle?.id]);

  // Check if everyone finished
  useEffect(() => {
    if (battle?.status === 'active' && allFinished && isHost) {
      finishBattle(battle.id);
    }
  }, [allFinished, battle?.status, isHost, battle?.id]);

  // Rank players for results
  const rankedParticipants = [...participants].sort((a, b) => {
    if (a.passed_tests !== b.passed_tests) {
      return b.passed_tests - a.passed_tests; // Most passed first
    }
    // Tie breaker on time
    if (a.solved_at && b.solved_at) {
      return new Date(a.solved_at).getTime() - new Date(b.solved_at).getTime(); // Fastest first
    }
    if (a.solved_at) return -1;
    if (b.solved_at) return 1;
    return 0;
  });

  const winner = rankedParticipants[0];
  const iAmWinner = winner?.user_id === currentUserId && winner?.passed_tests === problem?.testCases.length;

  useEffect(() => {
    if (battle?.status === 'finished' && iAmWinner) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [battle?.status, iAmWinner]);

  const handleStart = async () => {
    if (!battle) return;
    await startBattle(battle.id);
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
    if (!battle || !problem) return;
    setIsSubmitting(true);
    setRawOutput('');
    setTestResults(null);

    const funcNameMatch = problem.starterCode.match(/function\s+([a-zA-Z0-9_]+)/);
    const functionName = funcNameMatch ? funcNameMatch[1] : 'solution';

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
        _log.push('Test ' + (i+1) + ': ERROR (Function \\'${functionName}\\' not found)');
        continue;
      }
      
      const result = await Promise.race([
        Promise.resolve(fn(..._tc[i].input)),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Test case timed out (async hang)')), 2000))
      ]);
      
      if (result === undefined) {
        _log.push('Test ' + (i+1) + ': FAIL (No return value detected)');
        continue;
      }
      
      if (JSON.stringify(result) === JSON.stringify(_tc[i].expected)) {
        _passed++;
        _log.push('Test ' + (i+1) + ': PASS');
      } else {
        _log.push('Test ' + (i+1) + ': FAIL');
      }
    } catch(e) {
      _log.push('Test ' + (i+1) + ': ERROR (' + e.message + ')');
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
        await updateParticipantProgress(battle.id, 0, problem!.testCases.length, code, false);
        setIsSubmitting(false);
        return;
      }
      
      const outputLines = data.output.split('\n');
      const resultsIdx = outputLines.findIndex((l: string) => l === '===TEST_RESULTS===');
      
      if (resultsIdx !== -1 && outputLines[resultsIdx + 1]) {
        try {
          const parsedResults = JSON.parse(outputLines[resultsIdx + 1]);
          setTestResults(parsedResults);
          
          const isFinished = parsedResults.passed === parsedResults.total;
          const solvedAt = isFinished ? new Date().toISOString() : undefined;
          
          await updateParticipantProgress(battle.id, parsedResults.passed, problem!.testCases.length, code, isFinished, solvedAt);
          
        } catch (e) {
          setRawOutput("Failed to parse test results.\n" + data.output);
        }
      } else {
        setRawOutput("Execution Error:\n" + data.output);
        await updateParticipantProgress(battle.id, 0, problem!.testCases.length, code, false);
      }
    } catch (err) {
      setRawOutput("Network Error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return '--:--';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (loading && !battle) {
    return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">Loading...</div>;
  }

  if (!battle) {
    return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white text-2xl font-bold">Battle not found 😢</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-zinc-50 font-sans overflow-hidden">
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}
      
      {/* Header */}
      <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-6 shrink-0 bg-zinc-950/80 backdrop-blur z-10">
        <div className="flex items-center gap-4">
          <Link href="/battle" className="text-zinc-500 hover:text-white transition-colors">
            ← Leave
          </Link>
          <div className="h-6 w-px bg-zinc-800"></div>
          <h1 className="font-bold text-lg">Room: <span className="text-indigo-400 font-mono">{battle.room_code}</span></h1>
        </div>
        
        {battle.status === 'active' && (
          <div className={`text-2xl font-black font-mono tracking-wider ${timeRemaining !== null && timeRemaining <= 60 ? 'text-red-500 animate-pulse' : 'text-zinc-100'}`}>
            {formatTime(timeRemaining)}
          </div>
        )}

        <div className="text-sm text-zinc-400 font-medium bg-zinc-900 px-4 py-2 rounded-full border border-zinc-800">
          {problem?.title}
        </div>
      </header>

      {/* WAITING STATE */}
      {battle.status === 'waiting' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950 to-zinc-950 pointer-events-none"></div>
          
          <div className="z-10 flex flex-col items-center text-center max-w-2xl w-full">
            <h2 className="text-4xl md:text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-purple-500 tracking-tight">
              Waiting for combatants...
            </h2>
            <p className="text-zinc-400 text-lg mb-12">Share room code <strong className="text-white font-mono bg-zinc-800 px-2 py-1 rounded">{battle.room_code}</strong> with your friends to join.</p>
            
            <div className="grid grid-cols-2 md:flex md:justify-center gap-6 mb-16 w-full">
              {Array.from({ length: battle.max_players }).map((_, i) => {
                const p = participants[i];
                return (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    key={p?.id || `empty-${i}`} 
                    className={`w-32 h-40 rounded-2xl border-2 flex flex-col items-center justify-center p-4 gap-3 ${
                      p ? 'bg-indigo-900/20 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.2)]' : 'bg-zinc-900/50 border-zinc-800 border-dashed'
                    }`}
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl ${
                      p ? 'bg-indigo-600 text-white' : 'bg-zinc-800 text-zinc-600'
                    }`}>
                      {p?.profiles?.display_name?.charAt(0).toUpperCase() || '?'}
                    </div>
                    <div className="font-bold text-sm text-center truncate w-full text-zinc-300">
                      {p?.profiles?.display_name || 'Waiting...'}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {isHost ? (
              <button
                onClick={handleStart}
                disabled={participants.length < 2}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-12 py-4 rounded-full font-black text-xl shadow-[0_0_30px_rgba(79,70,229,0.4)] transition-all hover:scale-105"
              >
                Start Battle ⚔️
              </button>
            ) : (
              <div className="text-zinc-500 font-medium animate-pulse">
                Waiting for host to start...
              </div>
            )}
          </div>
        </div>
      )}

      {/* ACTIVE STATE */}
      {battle.status === 'active' && (
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Editor & Output (Left 3/4) */}
          <div className="w-full md:w-3/4 flex flex-col border-r border-zinc-800">
            {/* Editor */}
            <div className="flex-1 flex flex-col bg-zinc-950 p-4 relative">
              {myParticipantRecord?.finished && (
                <div className="absolute inset-0 z-20 bg-zinc-950/80 backdrop-blur-sm flex flex-col items-center justify-center">
                  <Bugsy size={100} mood="happy" />
                  <h3 className="text-3xl font-black mt-6 mb-2 text-green-400 shadow-green-500/50 drop-shadow-lg">You finished!</h3>
                  <p className="text-zinc-300 font-medium">Waiting for others or time to run out...</p>
                </div>
              )}
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Editor</span>
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting || myParticipantRecord?.finished}
                  className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
                >
                  {isSubmitting ? 'Running...' : 'Submit Code 🚀'}
                </button>
              </div>
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                disabled={myParticipantRecord?.finished}
                className="flex-1 w-full bg-[#0d0d12] text-zinc-300 font-mono p-4 rounded-xl border border-zinc-800 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 resize-none shadow-inner"
              />
            </div>

            {/* Output Console */}
            <div className="h-1/3 bg-zinc-900 border-t border-zinc-800 p-4 overflow-y-auto">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Console</span>
              {testResults ? (
                <div className="space-y-2 font-mono text-sm">
                  <div className={`font-bold mb-2 ${testResults.passed === testResults.total ? 'text-green-400' : 'text-red-400'}`}>
                    Tests Passed: {testResults.passed} / {testResults.total}
                  </div>
                  {testResults.log.map((l, i) => (
                    <div key={i} className={l.includes('PASS') ? 'text-green-300/80' : 'text-red-300/80'}>{l}</div>
                  ))}
                </div>
              ) : rawOutput ? (
                <div className="text-red-400 font-mono text-sm whitespace-pre-wrap">{rawOutput}</div>
              ) : (
                <div className="text-zinc-600 font-mono text-sm italic">Run code to see output...</div>
              )}
            </div>
          </div>

          {/* Leaderboard Sidebar (Right 1/4) */}
          <div className="w-full md:w-1/4 bg-zinc-950 p-4 overflow-y-auto">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 block">Live Leaderboard</span>
            <div className="flex flex-col gap-3">
              {participants.map(p => {
                const totalTests = problem?.testCases.length || 1;
                const progressPct = (p.passed_tests / totalTests) * 100;
                const isMe = p.user_id === currentUserId;
                
                return (
                  <div key={p.id} className={`p-4 rounded-xl border ${isMe ? 'bg-indigo-900/10 border-indigo-500/30' : 'bg-zinc-900 border-zinc-800'}`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-sm truncate pr-2">
                        {p.profiles?.display_name || 'Unknown'} {isMe && '(You)'}
                      </span>
                      <span className="text-xs font-bold text-zinc-400 bg-zinc-950 px-2 py-1 rounded">
                        {p.passed_tests} / {totalTests}
                      </span>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 rounded-full ${p.finished ? 'bg-green-500' : 'bg-indigo-500'}`}
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                    
                    <div className="mt-2 text-xs font-medium flex justify-between">
                      {p.finished ? (
                        <span className="text-green-400 flex items-center gap-1">Finished ✅</span>
                      ) : (
                        <span className="text-indigo-400/70 flex items-center gap-1 animate-pulse">Coding... 👨‍💻</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Problem</span>
              <p className="text-sm text-zinc-300">{problem?.title}</p>
            </div>
          </div>
        </div>
      )}

      {/* FINISHED STATE */}
      {battle.status === 'finished' && (
        <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center p-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-zinc-950 pointer-events-none"></div>
          
          <div className="z-10 flex flex-col items-center max-w-3xl w-full">
            <h2 className="text-5xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 uppercase tracking-widest drop-shadow-lg">
              Match Over
            </h2>

            <div className="w-full bg-zinc-900/80 backdrop-blur border border-zinc-800 p-8 rounded-3xl shadow-2xl mb-8 flex flex-col gap-4">
              {rankedParticipants.map((p, index) => {
                const totalTests = problem?.testCases.length || 1;
                const isWinner = index === 0 && p.passed_tests > 0; // Must pass at least 1 test to "win"
                const isMe = p.user_id === currentUserId;
                
                return (
                  <div key={p.id} className={`flex items-center gap-4 p-4 rounded-2xl border ${
                    isWinner ? 'bg-yellow-500/10 border-yellow-500/50 scale-[1.02] shadow-[0_0_20px_rgba(234,179,8,0.2)]' 
                    : isMe ? 'bg-indigo-900/20 border-indigo-500/30' 
                    : 'bg-zinc-950 border-zinc-800'
                  } transition-all`}>
                    
                    <div className={`text-2xl font-black w-8 text-center ${isWinner ? 'text-yellow-400' : 'text-zinc-500'}`}>
                      #{index + 1}
                    </div>
                    
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${
                      isWinner ? 'bg-yellow-500 text-yellow-950' : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {p.profiles?.display_name?.charAt(0).toUpperCase() || '?'}
                    </div>
                    
                    <div className="flex-1">
                      <div className={`font-bold text-lg ${isWinner ? 'text-yellow-400' : 'text-zinc-200'}`}>
                        {p.profiles?.display_name} {isMe && '(You)'} {isWinner && '👑'}
                      </div>
                      <div className="text-xs text-zinc-500">
                        Level {p.profiles?.current_level}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`font-black text-xl ${p.passed_tests === totalTests ? 'text-green-400' : 'text-zinc-400'}`}>
                        {p.passed_tests} / {totalTests}
                      </div>
                      <div className="text-xs text-zinc-500 font-mono">
                        {p.solved_at ? new Date(p.solved_at).toLocaleTimeString([], {minute: '2-digit', second: '2-digit'}) : 'DNF'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 text-left max-w-2xl w-full mb-8">
              <Bugsy size={80} mood={iAmWinner ? 'happy' : 'idle'} />
              <div>
                <h3 className="font-bold text-xl mb-1 text-white">
                  {iAmWinner ? "Flawless victory! 🏆" : "Tough break, kid. 🩹"}
                </h3>
                <p className="text-zinc-400">
                  {iAmWinner 
                    ? "Your code was faster than light and cleaner than my freshly detailed shell. Well done!" 
                    : "Hey, second place is just the first loser. Dust yourself off and try again. Your code looked like spaghetti anyway."}
                </p>
              </div>
            </div>

            <button
              onClick={() => router.push('/battle')}
              className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-3 rounded-full font-bold transition-colors"
            >
              Back to Lobby / Rematch
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
