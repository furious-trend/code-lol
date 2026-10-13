// agent-notes: { ctx: "Interactive Library left navigation sidebar with topic filtering and chapter trees in hyper-violet theme", deps: ["@/lib/lessons/unifiedTopics"], state: active, last: "sato@2026-10-13" }
'use client';

import React, { useState, useMemo } from 'react';
import { UnifiedTopic } from '@/lib/lessons/unifiedTopics';
import { Search, X, CheckCircle2, ChevronDown, ChevronRight, BookOpen } from 'lucide-react';

interface LibrarySidebarProps {
  language: string;
  topics: UnifiedTopic[];
  activeTopicId: string;
  onSelectTopic: (topicId: string) => void;
  learnedTopicIds: Set<string>;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  className?: string;
}

const languageTitles: Record<string, { title: string; icon: string }> = {
  python: { title: 'Python Library', icon: '🐍' },
  javascript: { title: 'JavaScript Library', icon: '🟨' },
  c: { title: 'C Library', icon: '⚡' },
  cpp: { title: 'C++ Library', icon: '🔷' },
  java: { title: 'Java Library', icon: '☕' },
};

export function LibrarySidebar({
  language,
  topics,
  activeTopicId,
  onSelectTopic,
  learnedTopicIds,
  isOpenMobile = false,
  onCloseMobile,
  className = '',
}: LibrarySidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedChapters, setCollapsedChapters] = useState<Record<string, boolean>>({});

  const langInfo = languageTitles[language.toLowerCase()] || {
    title: `${language.toUpperCase()} Library`,
    icon: '💻',
  };

  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return topics;
    const query = searchQuery.toLowerCase();
    return topics.filter(
      (t) =>
        t.title.toLowerCase().includes(query) ||
        t.chapter.toLowerCase().includes(query) ||
        t.tier.toLowerCase().includes(query)
    );
  }, [topics, searchQuery]);

  const groupedChapters = useMemo(() => {
    const map = new Map<string, { title: string; tier: string; topics: UnifiedTopic[] }>();
    filteredTopics.forEach((topic) => {
      if (!map.has(topic.chapter)) {
        map.set(topic.chapter, {
          title: topic.chapter,
          tier: topic.tier,
          topics: [],
        });
      }
      map.get(topic.chapter)!.topics.push(topic);
    });
    return Array.from(map.values());
  }, [filteredTopics]);

  const toggleChapter = (chapterTitle: string) => {
    setCollapsedChapters((prev) => ({
      ...prev,
      [chapterTitle]: !prev[chapterTitle],
    }));
  };

  return (
    <aside
      className={`
        w-72 sm:w-80 flex-shrink-0 bg-zinc-950/95 border-r border-zinc-800/80 flex flex-col h-[calc(100vh-4rem)] sticky top-16 z-30 transition-all duration-300
        ${isOpenMobile ? 'fixed inset-y-0 left-0 top-16 z-50 flex shadow-2xl' : 'hidden md:flex'}
        ${className}
      `}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-zinc-800/80 bg-zinc-900/60 backdrop-blur">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 font-bold text-zinc-100 text-base tracking-tight">
            <span className="text-xl">{langInfo.icon}</span>
            <span className="bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent">
              {langInfo.title}
            </span>
          </div>
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="md:hidden text-zinc-400 hover:text-white p-1 rounded-md"
              aria-label="Close navigation"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter library topics..."
            className="w-full pl-9 pr-8 py-1.5 text-xs sm:text-sm bg-zinc-900/90 border border-zinc-800 rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              aria-label="Clear filter"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Chapters & Topics List */}
      <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-4 custom-scrollbar text-sm">
        {groupedChapters.length === 0 ? (
          <div className="p-6 text-center text-zinc-500 text-xs">
            No topics found matching &quot;{searchQuery}&quot;
          </div>
        ) : (
          groupedChapters.map((chapter) => {
            const isCollapsed = collapsedChapters[chapter.title] && !searchQuery;
            return (
              <div key={chapter.title} className="space-y-1">
                <button
                  type="button"
                  onClick={() => toggleChapter(chapter.title)}
                  className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-violet-300 hover:bg-violet-950/20 rounded-lg transition-colors group text-left"
                >
                  <span className="truncate pr-2">{chapter.title}</span>
                  <span className="text-zinc-600 group-hover:text-violet-400 transition-colors">
                    {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                  </span>
                </button>

                {!isCollapsed && (
                  <ul className="space-y-0.5 pl-1">
                    {chapter.topics.map((topic) => {
                      const isActive = topic.id === activeTopicId;
                      const isLearned = learnedTopicIds.has(topic.id);

                      return (
                        <li key={topic.id}>
                          <button
                            type="button"
                            onClick={() => {
                              onSelectTopic(topic.id);
                              onCloseMobile?.();
                            }}
                            className={`
                              w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs md:text-sm font-medium transition-all text-left
                              ${
                                isActive
                                  ? 'bg-violet-600/20 text-violet-300 font-semibold border-l-4 border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.2)]'
                                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/80 border-l-4 border-transparent'
                              }
                            `}
                          >
                            <span className="truncate flex items-center gap-2">
                              <span className="text-xs opacity-75">{topic.sticker}</span>
                              <span className="truncate">{topic.title}</span>
                            </span>

                            {isLearned && (
                              <span
                                data-testid={`learned-${topic.id}`}
                                className="flex-shrink-0 text-cyan-400 ml-1.5 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                                title="Completed"
                              >
                                <CheckCircle2 size={13} className="fill-cyan-500/20" />
                              </span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer Stats */}
      <div className="p-3 border-t border-zinc-900 bg-zinc-950/80 text-xs text-zinc-500 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <BookOpen size={14} className="text-violet-400" />
          <span>{topics.length} topics</span>
        </span>
        <span className="text-cyan-400 font-medium">
          {learnedTopicIds.size} completed
        </span>
      </div>
    </aside>
  );
}
