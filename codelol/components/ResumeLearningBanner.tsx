// agent-notes: { ctx: "Dynamic resume learning banner rendering last-visited topic or problem from localStorage", deps: ["lucide-react", "next/link"], state: active, last: "antigravity@2026-11-24" }
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

interface LastVisitedItem {
  id: string;
  title: string;
  chapter?: string;
  language: string;
  url: string;
}

export function ResumeLearningBanner() {
  const [lastItem, setLastItem] = useState<LastVisitedItem | null>(null);

  useEffect(() => {
    try {
      const savedTopic = localStorage.getItem('codelol_last_visited_topic');
      if (savedTopic) {
        const parsed = JSON.parse(savedTopic);
        if (parsed && parsed.url && parsed.title) {
          setLastItem(parsed);
          return;
        }
      }
      const savedProblem = localStorage.getItem('codelol_last_visited_problem');
      if (savedProblem) {
        const parsed = JSON.parse(savedProblem);
        if (parsed && parsed.url && parsed.title) {
          setLastItem(parsed);
        }
      }
    } catch {}
  }, []);

  if (!lastItem) return null;

  return (
    <div className="w-full max-w-2xl mx-auto px-2 animate-in fade-in slide-in-from-top-3 duration-500">
      <Link
        href={lastItem.url}
        className="group flex items-center justify-between gap-3 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-violet-950/70 via-zinc-900/90 to-indigo-950/70 border border-violet-500/40 hover:border-violet-400 text-zinc-100 shadow-lg shadow-violet-950/30 transition-all hover:scale-[1.01] hover:shadow-violet-900/40 cursor-pointer"
        aria-label={`Resume learning: ${lastItem.title}`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-violet-600/20 border border-violet-500/40 flex items-center justify-center text-violet-400 shrink-0 group-hover:scale-110 transition-transform">
            <Sparkles size={18} className="text-violet-400" />
          </div>
          <div className="text-left truncate">
            <div className="text-[11px] font-mono uppercase tracking-wider text-violet-400 font-bold flex items-center gap-1.5">
              <span>Continue where you left off</span>
              <span className="text-zinc-500">•</span>
              <span className="text-zinc-300 font-semibold">{lastItem.language.toUpperCase()}</span>
            </div>
            <div className="text-sm font-bold text-white truncate group-hover:text-violet-200 transition-colors">
              {lastItem.title}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-violet-400 group-hover:text-violet-300 shrink-0">
          <span className="hidden sm:inline">Resume</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </div>
  );
}
