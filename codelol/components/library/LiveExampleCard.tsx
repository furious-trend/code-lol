// agent-notes: { ctx: "Live Example Card with syntax container and Try It Live button in hyper-violet theme", deps: [], state: active, last: "sato@2026-10-13" }
'use client';

import React, { useState } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';

interface LiveExampleCardProps {
  title?: string;
  explanation?: string;
  code: string;
  language?: string;
  onTryItYourself: () => void;
}

export function LiveExampleCard({
  title = 'Example Program',
  explanation,
  code,
  language = 'python',
  onTryItYourself,
}: LiveExampleCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="my-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 shadow-xl overflow-hidden transition-all hover:border-violet-500/40">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800/80 bg-zinc-900/90">
        <h3 className="font-bold text-base text-zinc-100 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-violet-500 inline-block shadow-[0_0_8px_rgba(139,92,246,0.6)] animate-pulse"></span>
          <span>{title}</span>
        </h3>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-zinc-400 hover:text-zinc-200 bg-zinc-800/70 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
            title="Copy Code"
          >
            {copied ? <Check size={13} className="text-cyan-400" /> : <Copy size={13} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Explanation */}
      {explanation && (
        <div className="px-5 pt-3 pb-2 text-sm text-zinc-400 font-normal leading-relaxed border-b border-zinc-800/40">
          {explanation}
        </div>
      )}

      {/* Code Container */}
      <div className="p-4 bg-zinc-950 font-mono text-xs sm:text-sm text-cyan-300 overflow-x-auto whitespace-pre leading-relaxed select-text border-b border-zinc-800/60">
        {code}
      </div>

      {/* Footer with "Try It Live »" Button */}
      <div className="px-5 py-3.5 bg-zinc-900/90 flex items-center justify-between">
        <span className="text-xs text-zinc-500 font-mono hidden sm:inline-block">
          Run or edit live in the interactive compiler
        </span>
        <button
          type="button"
          onClick={onTryItYourself}
          className="ml-auto inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 active:scale-95 shadow-lg shadow-violet-900/40 border border-violet-400/20 transition-all cursor-pointer"
        >
          <span>Try It Live</span>
          <span className="text-base font-black">»</span>
        </button>
      </div>
    </div>
  );
}
