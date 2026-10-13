// agent-notes: { ctx: "W3Schools-style live Try It Yourself editor with Monaco runner, terminal console, and Bugsy reactions", deps: ["@monaco-editor/react", "@/lib/executor", "@/hooks/useMemeSound", "@/hooks/useRoast", "@/components/RoastCard", "@/components/Bugsy"], state: active, last: "sato@2026-10-13" }
'use client';

import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { executeCode } from '@/lib/executor';
import { useMemeSound } from '@/hooks/useMemeSound';
import { useRoast } from '@/hooks/useRoast';
import { RoastCard } from '@/components/RoastCard';
import { Bugsy } from '@/components/Bugsy';
import { Play, RotateCcw, Copy, Check, Terminal, Sparkles, CheckCircle2 } from 'lucide-react';

interface TryItYourselfEditorProps {
  initialCode: string;
  language: string;
  expectedOutput?: string;
  humorPref?: 'general' | 'tamil';
  topicTitle?: string;
  onCodeRunSuccess?: () => void;
  className?: string;
}

const monacoLangMap: Record<string, string> = {
  python: 'python',
  javascript: 'javascript',
  c: 'c',
  cpp: 'cpp',
  java: 'java',
};

export function TryItYourselfEditor({
  initialCode,
  language,
  expectedOutput,
  humorPref = 'general',
  topicTitle,
  onCodeRunSuccess,
  className = '',
}: TryItYourselfEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [matchedExpected, setMatchedExpected] = useState<boolean | null>(null);

  const { playMemeSound } = useMemeSound();
  const { isRoasting, roastStatus, roastData, roastError, handleRoast, clearRoast } = useRoast();

  // Reset code when topic or initialCode changes
  useEffect(() => {
    setCode(initialCode);
    setOutput('');
    setError(null);
    setMatchedExpected(null);
    clearRoast();
  }, [initialCode, clearRoast]);

  const handleRun = async () => {
    setIsRunning(true);
    setError(null);
    setOutput('');
    clearRoast();

    try {
      const res = await executeCode(language, code);

      if (res.error) {
        setError(res.error);
        setOutput(res.output || '');
        playMemeSound(false, humorPref);
        await handleRoast(code, res.error, false, '', humorPref);
      } else {
        const out = res.output || '(Execution completed with no standard output)';
        setOutput(out);

        // Check if output matches expected output
        let matches = false;
        if (expectedOutput && expectedOutput.trim()) {
          const normOut = out.trim();
          const normExp = expectedOutput.trim();
          matches = normOut.includes(normExp) || normExp.includes(normOut);
          setMatchedExpected(matches);
        }

        playMemeSound(true, humorPref);
        onCodeRunSuccess?.();
      }
    } catch (err: any) {
      const msg = err?.message || 'Execution error';
      setError(msg);
      playMemeSound(false, humorPref);
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput('');
    setError(null);
    setMatchedExpected(null);
    clearRoast();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {}
  };

  return (
    <div id="try-it-yourself-section" className={`my-8 rounded-3xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl ${className}`}>
      {/* Editor Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between px-5 py-3.5 bg-zinc-900 border-b border-zinc-800/80 gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
          </div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 pl-2">
            Try It Yourself // {language.toUpperCase()}
          </span>
          {topicTitle && (
            <span className="text-xs text-zinc-500 truncate hidden md:inline-block">
              — {topicTitle}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-800/80 hover:bg-zinc-800 rounded-lg transition-colors"
            title="Copy Code"
          >
            {isCopied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            <span className="hidden sm:inline">{isCopied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-800/80 hover:bg-zinc-800 rounded-lg transition-colors"
            title="Reset Code"
          >
            <RotateCcw size={13} />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            type="button"
            onClick={handleRun}
            disabled={isRunning}
            className={`
              flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white transition-all
              ${
                isRunning
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-500 active:scale-95 shadow-lg shadow-emerald-900/40 cursor-pointer'
              }
            `}
          >
            {isRunning ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Executing...</span>
              </>
            ) : (
              <>
                <Play size={14} className="fill-white" />
                <span>Run Code ❯</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Surface */}
      <div className="h-[280px] sm:h-[320px] relative bg-zinc-950">
        <Editor
          height="100%"
          language={monacoLangMap[language.toLowerCase()] || 'javascript'}
          theme="vs-dark"
          value={code}
          onChange={(val) => setCode(val || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: 'var(--font-geist-mono), ui-monospace, monospace',
            padding: { top: 16, bottom: 16 },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            lineNumbers: 'on',
            automaticLayout: true,
          }}
        />
      </div>

      {/* Terminal Output Area */}
      <div className="border-t border-zinc-800 bg-black flex flex-col">
        <div className="px-5 py-2.5 bg-zinc-900/90 border-b border-zinc-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-zinc-400 font-mono font-medium">
            <Terminal size={14} className="text-emerald-400" />
            <span>Terminal Output</span>
          </div>

          {matchedExpected !== null && (
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              {matchedExpected ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={13} /> Output matches expected!
                </span>
              ) : (
                <span className="text-amber-400">Custom output generated</span>
              )}
            </div>
          )}
        </div>

        <div className="p-4 min-h-[100px] max-h-[220px] overflow-y-auto font-mono text-xs sm:text-sm select-text custom-scrollbar">
          {error ? (
            <pre className="text-rose-400 whitespace-pre-wrap break-words leading-relaxed">
              {error}
            </pre>
          ) : output ? (
            <pre className="text-emerald-300 whitespace-pre-wrap break-words leading-relaxed">
              {output}
            </pre>
          ) : (
            <p className="text-zinc-600 italic">
              Click &apos;Run Code ❯&apos; to execute and see real-time compiler output.
            </p>
          )}
        </div>
      </div>

      {/* Bugsy Roast / Feedback Bubble */}
      {(isRoasting || roastError || roastData) && (
        <div className="p-4 bg-zinc-900/90 border-t border-zinc-800">
          {isRoasting && (
            <div className="flex items-center gap-3 text-purple-400 text-xs font-medium animate-pulse">
              <Bugsy size={24} mood="thinking" />
              <span>{roastStatus || 'Bugsy is evaluating your code...'}</span>
            </div>
          )}
          {roastData && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <RoastCard
                roast={roastData.roast}
                fix={roastData.fix}
                mood={roastData.mood}
                gifUrl={roastData.gifUrl}
                output={output}
                onDismiss={clearRoast}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
