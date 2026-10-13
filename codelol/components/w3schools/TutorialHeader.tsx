// agent-notes: { ctx: "Top tutorial header bar with language track selector, progress stats, and humor toggle", deps: [], state: active, last: "sato@2026-10-13" }
'use client';

import React from 'react';
import { Menu, Sparkles, BookOpen } from 'lucide-react';

export const TUTORIAL_LANGUAGES = [
  { id: 'python', label: 'Python', icon: '🐍' },
  { id: 'javascript', label: 'JavaScript', icon: '🟨' },
  { id: 'c', label: 'C', icon: '⚡' },
  { id: 'cpp', label: 'C++', icon: '🔷' },
  { id: 'java', label: 'Java', icon: '☕' },
] as const;

interface TutorialHeaderProps {
  activeLanguage: string;
  onLanguageChange: (lang: string) => void;
  humorPref: 'general' | 'tamil';
  onHumorPrefChange: (pref: 'general' | 'tamil') => void;
  completedCount: number;
  totalCount: number;
  onToggleMobileSidebar: () => void;
  className?: string;
}

export function TutorialHeader({
  activeLanguage,
  onLanguageChange,
  humorPref,
  onHumorPrefChange,
  completedCount,
  totalCount,
  onToggleMobileSidebar,
  className = '',
}: TutorialHeaderProps) {
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <header className={`w-full bg-zinc-950/90 backdrop-blur border-b border-zinc-800/80 sticky top-16 z-20 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 ${className}`}>
      {/* Left: Mobile Index Button + Language Tracks */}
      <div className="flex items-center gap-2 overflow-x-auto max-w-full py-0.5 custom-scrollbar">
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-300 hover:text-white flex-shrink-0"
          aria-label="Toggle tutorial index menu"
        >
          <Menu size={15} />
          <span>Index</span>
        </button>

        <div className="flex items-center gap-1.5 flex-nowrap">
          {TUTORIAL_LANGUAGES.map((lang) => {
            const isActive = activeLanguage === lang.id;
            return (
              <button
                key={lang.id}
                type="button"
                onClick={() => onLanguageChange(lang.id)}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex-shrink-0
                  ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40 scale-102 ring-1 ring-emerald-400/50'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 bg-zinc-900/50 border border-zinc-800/60'
                  }
                `}
              >
                <span>{lang.icon}</span>
                <span>{lang.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: Humor Selector & Progress Counter */}
      <div className="flex items-center gap-3 ml-auto flex-shrink-0">
        {/* Humor Toggle */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-0.5 flex items-center text-xs">
          <button
            type="button"
            onClick={() => onHumorPrefChange('general')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
              humorPref === 'general'
                ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => onHumorPrefChange('tamil')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
              humorPref === 'tamil'
                ? 'bg-pink-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Tamil 🌶️
          </button>
        </div>

        {/* Progress pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-zinc-900/60 border border-zinc-800/80 rounded-xl text-xs text-zinc-400">
          <BookOpen size={13} className="text-emerald-400" />
          <span>
            {completedCount}/{totalCount} ({percent}%)
          </span>
        </div>
      </div>
    </header>
  );
}
