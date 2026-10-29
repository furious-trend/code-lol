// agent-notes: { ctx: "Problems dashboard client with multi-language selector, chapter hierarchy, and dual-gate completion", deps: ["@/lib/problems", "@/lib/progress", "@/lib/supabase/client"], state: active, last: "sato@2026-10-28" }
'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Link from 'next/link';
import {
  getProblemsByChapter,
  resolveActiveLanguage,
  SupportedProblemLanguage,
  ChapterProblemGroup,
  ModuleProblem,
} from '@/lib/problems';
import { isModuleComplete, getModuleCompletionStatus } from '@/lib/progress';
import { CheckCircle2, Circle, Code2, Trophy, ArrowRight, Sparkles } from 'lucide-react';

function setLanguageCookie(lang: string) {
  if (typeof document !== 'undefined') {
    document.cookie = `learning_language=${lang}; path=/; max-age=31536000; SameSite=Lax`;
  }
}

function getSearchParam(key: string): string | null {
  if (typeof window !== 'undefined' && window.location && window.location.search) {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get(key);
    } catch {
      return null;
    }
  }
  return null;
}

export const PROBLEM_LANGUAGES = [
  { id: 'javascript', label: 'JavaScript', icon: '🟨' },
  { id: 'python', label: 'Python', icon: '🐍' },
  { id: 'c', label: 'C', icon: '⚡' },
  { id: 'cpp', label: 'C++', icon: '🔷' },
  { id: 'java', label: 'Java', icon: '☕' },
] as const;

const EMPTY_STRING_ARRAY: string[] = [];

interface ProblemsDashboardClientProps {
  initialLanguage?: string;
  initialCompletedProblems: string[];
  initialLearnedTopics?: string[];
}

export default function ProblemsDashboardClient({
  initialLanguage = 'python',
  initialCompletedProblems = EMPTY_STRING_ARRAY,
  initialLearnedTopics = EMPTY_STRING_ARRAY,
}: ProblemsDashboardClientProps) {
  // 1. Language Resolution
  const [activeLanguage, setActiveLanguage] = useState<SupportedProblemLanguage>(() => {
    const urlLang = getSearchParam('lang') || getSearchParam('language');
    const localGuest = typeof window !== 'undefined' ? localStorage.getItem('guest_lang') : null;
    return resolveActiveLanguage(urlLang, initialLanguage, localGuest);
  });

  const [activeDifficulty, setActiveDifficulty] = useState<'All' | 'Beginner' | 'Intermediate' | 'Expert'>('Beginner');
  const [completedProblems, setCompletedProblems] = useState<Set<string>>(new Set(initialCompletedProblems));
  const [learnedTopics, setLearnedTopics] = useState<Set<string>>(new Set(initialLearnedTopics));

  const initialCompletedRef = useRef(initialCompletedProblems);
  const initialLearnedRef = useRef(initialLearnedTopics);
  useEffect(() => {
    initialCompletedRef.current = initialCompletedProblems;
    initialLearnedRef.current = initialLearnedTopics;
  }, [initialCompletedProblems, initialLearnedTopics]);

  // Sync with local storage and progress events
  const refreshLocalState = useCallback((lang: string) => {
    try {
      // Completed problems sync
      const probKey = lang === 'python' ? 'completedProblems_python' : 'completedProblems';
      const savedProbs = typeof window !== 'undefined' ? localStorage.getItem(probKey) : null;
      const combinedProbs = new Set<string>(initialCompletedRef.current);
      if (savedProbs) {
        JSON.parse(savedProbs).forEach((p: string) => combinedProbs.add(p));
      }
      setCompletedProblems(combinedProbs);

      // Learned topics sync
      const topicKey = `learned_topics_${lang}`;
      const savedTopics = typeof window !== 'undefined' ? localStorage.getItem(topicKey) : null;
      const combinedTopics = new Set<string>(initialLearnedRef.current);
      if (savedTopics) {
        JSON.parse(savedTopics).forEach((t: string) => combinedTopics.add(t));
      }
      setLearnedTopics(combinedTopics);
    } catch {}
  }, []);

  useEffect(() => {
    refreshLocalState(activeLanguage);
    const handleProgressUpdate = () => refreshLocalState(activeLanguage);
    window.addEventListener('codelol-progress-update', handleProgressUpdate);
    return () => window.removeEventListener('codelol-progress-update', handleProgressUpdate);
  }, [activeLanguage, refreshLocalState]);

  // Handle language switch without full page reloads
  const handleLanguageChange = async (lang: SupportedProblemLanguage) => {
    if (lang === activeLanguage) return;
    setActiveLanguage(lang);
    refreshLocalState(lang);

    // 1. Client storage & cookies
    if (typeof window !== 'undefined') {
      localStorage.setItem('guest_lang', lang);
      setLanguageCookie(lang);
    }

    // 2. URL query param update without full reload
    const params = new URLSearchParams(window.location.search);
    params.set('lang', lang);
    params.delete('language');
    if (typeof window !== 'undefined') {
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, '', newUrl);
    }

    // 3. Persist to Supabase if authenticated
    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user && user.id !== 'local-guest') {
        await supabase.from('profiles').update({ learning_language: lang }).eq('id', user.id);
      }
    } catch {}
  };

  // Chapter hierarchy grouped for active language
  const chapterGroups = useMemo<ChapterProblemGroup[]>(() => {
    return getProblemsByChapter(activeLanguage);
  }, [activeLanguage]);

  // Filtered by selected difficulty
  const filteredGroups = useMemo(() => {
    if (activeDifficulty === 'All') return chapterGroups;
    const diffLower = activeDifficulty.toLowerCase();
    return chapterGroups.filter(
      (g) => g.tier === diffLower || (diffLower === 'expert' && g.tier === 'advanced')
    );
  }, [chapterGroups, activeDifficulty]);

  // Overall Stats
  const stats = useMemo(() => {
    let totalModules = 0;
    let completedModules = 0;
    let solvedChallenges = 0;
    let readLessons = 0;

    chapterGroups.forEach((group) => {
      group.problems.forEach((prob: ModuleProblem) => {
        totalModules++;
        const isRead = learnedTopics.has(prob.moduleId);
        const isSolved =
          completedProblems.has(prob.id) ||
          completedProblems.has(`${prob.id}-${activeLanguage}`) ||
          completedProblems.has(prob.id.replace(`-${activeLanguage}`, ''));

        if (isRead) readLessons++;
        if (isSolved) solvedChallenges++;
        if (isRead && isSolved) completedModules++;
      });
    });

    const percent = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
    return { totalModules, completedModules, solvedChallenges, readLessons, percent };
  }, [chapterGroups, learnedTopics, completedProblems, activeLanguage]);

  return (
    <div className="min-h-screen bg-zinc-950 p-4 sm:p-6 md:p-12 font-sans selection:bg-pink-500/30 text-zinc-100">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <header className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-violet-500/20 text-xs font-bold text-violet-400">
            <Sparkles size={14} /> Curriculum-Aligned Coding Challenges
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-green-400 via-cyan-400 to-blue-600 animate-in fade-in slide-in-from-top-4 duration-500">
            Solve & Conquer.
          </h1>
          <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto">
            Test your programming powers. Conquer challenges aligned with your curriculum and achieve 100% module mastery!
          </p>
        </header>

        {/* Multi-Language Selector Bar */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-zinc-900/90 backdrop-blur border border-zinc-800 rounded-2xl shadow-xl">
            <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider px-2 hidden sm:inline-block">
              Language:
            </span>
            {PROBLEM_LANGUAGES.map((lang) => {
              const isActive = activeLanguage === lang.id;
              return (
                <button
                  key={lang.id}
                  onClick={() => handleLanguageChange(lang.id)}
                  type="button"
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30 scale-105 ring-1 ring-blue-400/50'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80 bg-zinc-900/50 border border-zinc-800/40'
                  }`}
                >
                  <span className="text-base">{lang.icon}</span>
                  <span>{lang.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stats & Dual-Gate Progress Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 sm:p-6 backdrop-blur">
          <div className="flex flex-col gap-1">
            <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">Module Mastery</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-amber-400">{stats.completedModules}</span>
              <span className="text-zinc-500 text-sm font-medium">/ {stats.totalModules}</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-1 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-400 to-yellow-500 h-full transition-all duration-500 rounded-full"
                style={{ width: `${stats.percent}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">Lessons Read</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-blue-400">{stats.readLessons}</span>
              <span className="text-zinc-500 text-sm font-medium">/ {stats.totalModules}</span>
            </div>
            <span className="text-zinc-500 text-xs">Library topics studied</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">Challenges Solved</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-green-400">{stats.solvedChallenges}</span>
              <span className="text-zinc-500 text-sm font-medium">/ {stats.totalModules}</span>
            </div>
            <span className="text-zinc-500 text-xs">Code harnesses passed</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">Complete Ratio</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-purple-400">{stats.percent}%</span>
            </div>
            <span className="text-zinc-500 text-xs">Both lesson & challenge done</span>
          </div>
        </div>

        {/* Tier / Difficulty Filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          {(['All', 'Beginner', 'Intermediate', 'Expert'] as const).map((diff) => (
            <button
              key={diff}
              onClick={() => setActiveDifficulty(diff)}
              className={`px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm md:text-base transition-all duration-300 cursor-pointer ${
                activeDifficulty === diff
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-105'
                  : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>

        {/* Curriculum Hierarchy Chapter Grid */}
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h2 className="text-xl md:text-2xl font-bold text-blue-400 flex items-center gap-2">
              <Trophy size={24} className="text-yellow-400" />
              <span>{activeDifficulty} Map</span>
              <span className="text-sm font-normal text-zinc-500">
                ({filteredGroups.length} Chapters in {activeLanguage.toUpperCase()})
              </span>
            </h2>
          </div>

          {filteredGroups.length === 0 ? (
            <div className="text-center p-12 bg-zinc-900/50 rounded-3xl border border-zinc-800 text-zinc-400">
              No challenges match this tier filter for {activeLanguage.toUpperCase()}.
            </div>
          ) : (
            <div className="space-y-6">
              {filteredGroups.map((group) => {
                const chapterTotal = group.problems.length;
                const chapterCompleted = group.problems.filter((p: ModuleProblem) =>
                  isModuleComplete(p.moduleId, p.id, activeLanguage, learnedTopics, completedProblems)
                ).length;
                const isChapterDone = chapterTotal > 0 && chapterCompleted === chapterTotal;

                return (
                  <div
                    key={group.chapterId}
                    className={`rounded-2xl border transition-all p-5 bg-zinc-900/40 backdrop-blur ${
                      isChapterDone
                        ? 'border-green-500/40 shadow-lg shadow-green-500/5'
                        : 'border-zinc-800/80 hover:border-zinc-700'
                    }`}
                  >
                    {/* Chapter Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-zinc-800/60">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">
                          {group.tier === 'beginner'
                            ? '🟢'
                            : group.tier === 'intermediate'
                            ? '🟡'
                            : '🔴'}
                        </span>
                        <div>
                          <h3 className="font-bold text-base sm:text-lg text-zinc-100">{group.chapterTitle}</h3>
                          <span className="text-xs uppercase tracking-wider text-zinc-500 font-bold">
                            {group.tier} Tier
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-semibold">
                        <span
                          className={`px-2.5 py-1 rounded-full border ${
                            isChapterDone
                              ? 'bg-green-500/20 text-green-400 border-green-500/30'
                              : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                          }`}
                        >
                          {chapterCompleted}/{chapterTotal} Modules Complete
                        </span>
                      </div>
                    </div>

                    {/* Module Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {group.problems.map((problem: ModuleProblem) => {
                        const status = getModuleCompletionStatus(
                          problem.moduleId,
                          problem.id,
                          activeLanguage,
                          learnedTopics,
                          completedProblems
                        );
                        const isFullyDone = status === 'completed';
                        const isSolved = status === 'challenge_solved';
                        const isRead = status === 'lesson_read';

                        return (
                          <div
                            key={problem.id}
                            className={`flex flex-col justify-between p-4 rounded-xl border transition-all ${
                              isFullyDone
                                ? 'bg-amber-950/20 border-amber-500/40 shadow-md shadow-amber-500/5'
                                : isSolved
                                ? 'bg-green-950/20 border-green-500/30'
                                : isRead
                                ? 'bg-blue-950/20 border-blue-500/30'
                                : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                            }`}
                          >
                            <div className="space-y-2">
                              {/* Top Indicators */}
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-mono text-zinc-500 text-[11px]">
                                  {problem.moduleId}
                                </span>

                                {isFullyDone ? (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 text-[11px]">
                                    <Trophy size={11} /> 100% Complete
                                  </span>
                                ) : isSolved ? (
                                  <span className="text-green-400 font-bold text-[11px]">
                                    Challenge Done
                                  </span>
                                ) : isRead ? (
                                  <span className="text-blue-400 font-bold text-[11px]">
                                    Lesson Read
                                  </span>
                                ) : (
                                  <span className="text-zinc-500 font-medium text-[11px]">
                                    Not Started
                                  </span>
                                )}
                              </div>

                              {/* Title */}
                              <h4 className="font-bold text-sm text-zinc-100 line-clamp-1">
                                {problem.title}
                              </h4>
                              <p className="text-xs text-zinc-400 line-clamp-2">
                                {problem.description.replace(/```[\s\S]*?```/g, '').trim()}
                              </p>
                            </div>

                            {/* Dual Gate Status & Actions */}
                            <div className="mt-4 pt-3 border-t border-zinc-800/60 space-y-2">
                              <div className="flex items-center justify-between text-xs">
                                {/* Lesson Read Status */}
                                <Link
                                  href={`/lessons?lang=${activeLanguage}&topic=${problem.moduleId}`}
                                  className={`flex items-center gap-1.5 transition-colors ${
                                    isRead ? 'text-blue-400 hover:text-blue-300' : 'text-zinc-500 hover:text-zinc-300'
                                  }`}
                                  title="Read lesson on Library"
                                >
                                  {isRead ? <CheckCircle2 size={13} /> : <Circle size={13} />}
                                  <span>Lesson 📖</span>
                                </Link>

                                {/* Challenge Solved Status */}
                                <Link
                                  href={`/problems/${problem.id}?lang=${activeLanguage}`}
                                  className={`flex items-center gap-1.5 transition-colors ${
                                    isSolved ? 'text-green-400 hover:text-green-300' : 'text-zinc-500 hover:text-zinc-300'
                                  }`}
                                  title="Solve coding challenge"
                                >
                                  {isSolved ? <CheckCircle2 size={13} /> : <Circle size={13} />}
                                  <span>Challenge 💻</span>
                                </Link>
                              </div>

                              {/* Action Button */}
                              <Link
                                href={`/problems/${problem.id}?lang=${activeLanguage}`}
                                className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                                  isFullyDone
                                    ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                                    : isSolved && !isRead
                                    ? 'bg-blue-600/90 hover:bg-blue-500 text-white shadow-sm'
                                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20'
                                }`}
                              >
                                {isFullyDone ? (
                                  <>Practice Again <ArrowRight size={13} /></>
                                ) : isSolved && !isRead ? (
                                  <>Finish Module by Reading 📖</>
                                ) : (
                                  <>Solve Challenge <Code2 size={13} /></>
                                )}
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
