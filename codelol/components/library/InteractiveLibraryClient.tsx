// agent-notes: { ctx: "Interactive Library client combining sidebar, live compiler, and exercises in hyper-violet theme", deps: ["@/lib/lessons/unifiedTopics", "./LibrarySidebar", "./LibraryHeader", "./LiveExampleCard", "./InteractiveCompiler", "./PracticeExercise", "@/lib/supabase/client"], state: active, last: "sato@2026-10-13" }
'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { getUnifiedTopics, UnifiedTopic, SupportedTutorialLanguage } from '@/lib/lessons/unifiedTopics';
import { LibrarySidebar } from './LibrarySidebar';
import { LibraryHeader } from './LibraryHeader';
import { LiveExampleCard } from './LiveExampleCard';
import { InteractiveCompiler } from './InteractiveCompiler';
import { PracticeExercise } from './PracticeExercise';
import { Bugsy } from '@/components/Bugsy';
import { createClient } from '@/lib/supabase/client';
import confetti from 'canvas-confetti';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle, Flame } from 'lucide-react';

interface InteractiveLibraryClientProps {
  initialLanguage?: string;
  initialTopicId?: string;
  initialHumorPref?: 'general' | 'tamil';
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

export default function InteractiveLibraryClient({
  initialLanguage = 'python',
  initialTopicId,
  initialHumorPref = 'general',
}: InteractiveLibraryClientProps) {
  const supabase = createClient();

  const [activeLang, setActiveLang] = useState<SupportedTutorialLanguage>(() => {
    const p = getSearchParam('lang') || initialLanguage;
    return (['python', 'javascript', 'c', 'cpp', 'java'].includes(p) ? p : 'python') as SupportedTutorialLanguage;
  });

  const [humorPref, setHumorPref] = useState<'general' | 'tamil'>(initialHumorPref);
  const [learnedTopicIds, setLearnedTopicIds] = useState<Set<string>>(new Set());
  const [userId, setUserId] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const topics = useMemo(() => getUnifiedTopics(activeLang), [activeLang]);

  const [activeTopicId, setActiveTopicId] = useState<string>(() => {
    const requestedTopic = getSearchParam('topic') || getSearchParam('level') || initialTopicId;
    if (requestedTopic) {
      const match = topics.find((t) => t.id === requestedTopic || String(t.numericId) === requestedTopic);
      if (match) return match.id;
    }
    return topics[0]?.id || '1';
  });

  useEffect(() => {
    const currentMatches = topics.some((t) => t.id === activeTopicId);
    if (!currentMatches && topics.length > 0) {
      setActiveTopicId(topics[0].id);
    }
  }, [topics, activeTopicId]);

  useEffect(() => {
    async function loadUserData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user && user.id !== 'local-guest') {
          setUserId(user.id);
          const { data: profile } = await supabase
            .from('profiles')
            .select('humor_preference, learning_language')
            .eq('id', user.id)
            .single();

          if (profile?.humor_preference) {
            setHumorPref(profile.humor_preference);
          }

          const { data: progress } = await supabase
            .from('library_progress')
            .select('item_id')
            .eq('language', activeLang)
            .eq('learned', true);

          if (progress) {
            setLearnedTopicIds(new Set(progress.map((p) => p.item_id)));
          }
        } else {
          const storedHumor = localStorage.getItem('guest_humor');
          if (storedHumor === 'tamil' || storedHumor === 'general') {
            setHumorPref(storedHumor);
          }
          const storedLearned = localStorage.getItem(`learned_topics_${activeLang}`);
          if (storedLearned) {
            try {
              setLearnedTopicIds(new Set(JSON.parse(storedLearned)));
            } catch {}
          }
        }
      } catch {}
    }

    loadUserData();
  }, [supabase, activeLang]);

  const activeIndex = useMemo(() => {
    const idx = topics.findIndex((t) => t.id === activeTopicId);
    return idx >= 0 ? idx : 0;
  }, [topics, activeTopicId]);

  const activeTopic = topics[activeIndex] || topics[0];
  const prevTopic = activeIndex > 0 ? topics[activeIndex - 1] : null;
  const nextTopic = activeIndex < topics.length - 1 ? topics[activeIndex + 1] : null;

  const handleSelectTopic = useCallback(
    (topicId: string) => {
      setActiveTopicId(topicId);
      const url = new URL(window.location.href);
      url.searchParams.set('lang', activeLang);
      url.searchParams.set('topic', topicId);
      window.history.pushState({}, '', url.toString());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [activeLang]
  );

  const handleSelectLanguage = (lang: string) => {
    const newLang = lang as SupportedTutorialLanguage;
    setActiveLang(newLang);

    if (typeof document !== 'undefined') {
      document.cookie = `learning_language=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('guest_lang', newLang);
    }

    const nextTopics = getUnifiedTopics(newLang);
    const firstId = nextTopics[0]?.id || '1';
    setActiveTopicId(firstId);

    const url = new URL(window.location.href);
    url.searchParams.set('lang', newLang);
    url.searchParams.set('topic', firstId);
    url.searchParams.delete('level');
    window.history.pushState({}, '', url.toString());
  };

  const handleToggleLearned = async (topicId: string) => {
    const nextSet = new Set(learnedTopicIds);
    let isLearned = false;

    if (nextSet.has(topicId)) {
      nextSet.delete(topicId);
    } else {
      nextSet.add(topicId);
      isLearned = true;
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
    }

    setLearnedTopicIds(nextSet);

    if (userId) {
      await supabase.from('library_progress').upsert({
        user_id: userId,
        language: activeLang,
        item_id: topicId,
        learned: isLearned,
        updated_at: new Date().toISOString(),
      });
    } else {
      localStorage.setItem(`learned_topics_${activeLang}`, JSON.stringify(Array.from(nextSet)));
    }
  };

  const handleScrollToCompiler = () => {
    const el = document.getElementById('interactive-compiler-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!activeTopic) {
    return <div className="p-12 text-center text-zinc-400">Loading library content...</div>;
  }

  const isCurrentLearned = learnedTopicIds.has(activeTopic.id);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100">
      {/* Top Header */}
      <LibraryHeader
        activeLanguage={activeLang}
        onLanguageChange={handleSelectLanguage}
        humorPref={humorPref}
        onHumorPrefChange={setHumorPref}
        completedCount={learnedTopicIds.size}
        totalCount={topics.length}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      />

      {/* Main Layout: Left Sidebar + Center Reading Stage */}
      <div className="flex flex-1 max-w-7xl w-full mx-auto">
        <LibrarySidebar
          language={activeLang}
          topics={topics}
          activeTopicId={activeTopic.id}
          onSelectTopic={handleSelectTopic}
          learnedTopicIds={learnedTopicIds}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        <main className="flex-1 min-w-0 px-4 sm:px-8 py-8 max-w-4xl mx-auto">
          {/* Breadcrumbs & Previous/Next Buttons */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-zinc-800/80 gap-3">
            <div className="text-xs sm:text-sm text-zinc-400 truncate">
              <span className="text-violet-400 font-bold uppercase tracking-wider">{activeLang}</span>
              <span className="mx-2 text-zinc-600">/</span>
              <span className="text-zinc-400">{activeTopic.chapter}</span>
              <span className="mx-2 text-zinc-600">/</span>
              <span className="text-zinc-200 font-medium">{activeTopic.title}</span>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => prevTopic && handleSelectTopic(prevTopic.id)}
                disabled={!prevTopic}
                className={`
                  inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all
                  ${
                    prevTopic
                      ? 'bg-zinc-900 border border-zinc-800 text-zinc-200 hover:bg-zinc-800 hover:text-white cursor-pointer'
                      : 'opacity-40 text-zinc-600 cursor-not-allowed border border-transparent'
                  }
                `}
              >
                <ChevronLeft size={16} />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <button
                type="button"
                onClick={() => nextTopic && handleSelectTopic(nextTopic.id)}
                disabled={!nextTopic}
                className={`
                  inline-flex items-center gap-1 px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all
                  ${
                    nextTopic
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 shadow-md shadow-violet-950/40 border border-violet-400/20 cursor-pointer active:scale-95'
                      : 'opacity-40 text-zinc-600 cursor-not-allowed'
                  }
                `}
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Lesson Header */}
          <article className="space-y-8">
            <header className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-violet-500/10 text-violet-300 border border-violet-500/30">
                  <span>{activeTopic.sticker}</span>
                  <span>{activeTopic.tier} Tier</span>
                </span>

                <button
                  type="button"
                  onClick={() => handleToggleLearned(activeTopic.id)}
                  className={`
                    flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer
                    ${
                      isCurrentLearned
                        ? 'bg-violet-600/20 text-violet-300 border border-violet-500/40 shadow-sm'
                        : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                    }
                  `}
                >
                  {isCurrentLearned ? (
                    <>
                      <CheckCircle2 size={14} className="text-cyan-400" />
                      <span>Learned ✓</span>
                    </>
                  ) : (
                    <>
                      <Circle size={14} className="text-zinc-500" />
                      <span>Mark as Learned</span>
                    </>
                  )}
                </button>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight flex items-center gap-3">
                <span>{activeTopic.title}</span>
              </h1>
            </header>

            {/* Concept Explanation */}
            <section className="space-y-4">
              <div className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800/80 shadow-sm">
                {humorPref === 'tamil' && activeTopic.explanationTamil
                  ? activeTopic.explanationTamil
                  : activeTopic.explanation}
              </div>

              {/* Bugsy Meme / Humor Card */}
              {((humorPref === 'tamil' && activeTopic.funnyLineTamil) ||
                (humorPref === 'general' && (activeTopic.funnyLineGeneral || activeTopic.funnyLineTamil))) && (
                <div className="p-4 rounded-2xl border border-pink-500/30 bg-gradient-to-r from-pink-950/30 to-purple-950/20 flex items-start gap-3 shadow-md">
                  <div className="flex-shrink-0 pt-0.5">
                    <Bugsy size={28} mood="happy" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                      <Flame size={13} />
                      {humorPref === 'tamil' ? 'CodeLOL Tamil Roast' : 'Bugsy’s Funny Note'}
                    </span>
                    <p className="text-pink-200 text-sm italic font-medium">
                      &quot;{humorPref === 'tamil' ? activeTopic.funnyLineTamil : activeTopic.funnyLineGeneral || activeTopic.funnyLineTamil}&quot;
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* Live Example Card */}
            <section>
              <LiveExampleCard
                title={`${activeTopic.title} Example`}
                explanation={`Run this example to see how ${activeTopic.title} executes in ${activeLang.toUpperCase()}.`}
                code={activeTopic.codeExample}
                language={activeLang}
                onTryItYourself={handleScrollToCompiler}
              />
            </section>

            {/* Live Interactive Compiler */}
            <section>
              <InteractiveCompiler
                initialCode={activeTopic.codeExample}
                language={activeLang}
                expectedOutput={activeTopic.expectedOutput}
                humorPref={humorPref}
                topicTitle={activeTopic.title}
                onCodeRunSuccess={() => {
                  if (!learnedTopicIds.has(activeTopic.id)) {
                    handleToggleLearned(activeTopic.id);
                  }
                }}
              />
            </section>

            {/* Practice Exercises */}
            {activeTopic.miniQuiz && (
              <section>
                <PracticeExercise
                  quiz={activeTopic.miniQuiz}
                  onCorrect={() => {
                    if (!learnedTopicIds.has(activeTopic.id)) {
                      handleToggleLearned(activeTopic.id);
                    }
                  }}
                />
              </section>
            )}

            {/* Bottom Navigation */}
            <footer className="pt-8 mt-12 border-t border-zinc-800/80 flex items-center justify-between gap-4">
              {prevTopic ? (
                <button
                  type="button"
                  onClick={() => handleSelectTopic(prevTopic.id)}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-sm font-bold text-zinc-200 transition-all cursor-pointer"
                >
                  <ChevronLeft size={18} />
                  <span>❮ {prevTopic.title}</span>
                </button>
              ) : (
                <div />
              )}

              {nextTopic && (
                <button
                  type="button"
                  onClick={() => handleSelectTopic(nextTopic.id)}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-950/40 text-sm font-bold text-white transition-all cursor-pointer active:scale-95 ml-auto border border-violet-400/20"
                >
                  <span>{nextTopic.title} ❯</span>
                  <ChevronRight size={18} />
                </button>
              )}
            </footer>
          </article>
        </main>
      </div>
    </div>
  );
}
