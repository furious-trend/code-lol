// agent-notes: { ctx: "Instant multi-language switcher bar for lessons and arena", deps: ["@/lib/supabase/client"], state: active, last: "sato@2026-10-12" }
'use client';

import { Suspense } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export const SUPPORTED_LANGUAGES = [
  { id: 'javascript', label: 'JavaScript', icon: '🟨' },
  { id: 'python', label: 'Python', icon: '🐍' },
  { id: 'c', label: 'C', icon: '⚡' },
  { id: 'cpp', label: 'C++', icon: '🔷' },
  { id: 'java', label: 'Java', icon: '☕' },
] as const;

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]['id'];

function setClientLanguageCookie(lang: string) {
  if (typeof document !== 'undefined') {
    document.cookie = `learning_language=${lang}; path=/; max-age=31536000; SameSite=Lax`;
  }
}

function setClientLanguageStorage(lang: string) {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('guest_lang', lang);
  }
}

interface LanguageToggleBarProps {
  activeLanguage: string;
  onLanguageChange?: (lang: string) => void;
  className?: string;
}

function LanguageToggleBarInner({ activeLanguage, onLanguageChange, className = '' }: LanguageToggleBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const handleSelect = async (lang: string) => {
    if (lang === activeLanguage) return;

    onLanguageChange?.(lang);

    // 1. Client cookie for Server Components (e.g., /learn)
    setClientLanguageCookie(lang);

    // 2. Local storage for client guest preference
    setClientLanguageStorage(lang);

    // 3. Supabase profile update if authenticated
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && user.id !== 'local-guest') {
        await supabase.from('profiles').update({ learning_language: lang }).eq('id', user.id);
      }
    } catch {
      // Non-blocking for unauthenticated or local guest users
    }

    // 4. Update URL searchParams
    const params = new URLSearchParams(searchParams ? searchParams.toString() : '');
    params.set('lang', lang);
    params.delete('language');

    // Remove python-specific level ID when switching away from python, or vice versa
    const currentLevel = params.get('level');
    if (lang !== 'python' && currentLevel && currentLevel.startsWith('ch')) {
      params.delete('level');
    } else if (lang === 'python' && currentLevel && /^\d+$/.test(currentLevel)) {
      params.delete('level');
    }

    const query = params.toString();
    const targetUrl = query ? `${pathname}?${query}` : pathname;
    router.push(targetUrl);
    router.refresh();
  };

  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 py-2 px-3 bg-zinc-900/80 backdrop-blur border border-zinc-800 rounded-2xl ${className}`}>
      <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider mr-1 hidden sm:inline-block">Track:</span>
      <div className="flex flex-wrap items-center gap-1.5">
        {SUPPORTED_LANGUAGES.map((item) => {
          const isActive = activeLanguage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              type="button"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30 scale-105'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function LanguageToggleBar(props: LanguageToggleBarProps) {
  return (
    <Suspense
      fallback={
        <div className={`flex flex-wrap items-center justify-center gap-2 py-2 px-3 bg-zinc-900/80 backdrop-blur border border-zinc-800 rounded-2xl ${props.className || ''}`}>
          <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider mr-1 hidden sm:inline-block">Track:</span>
          <div className="flex flex-wrap items-center gap-1.5 opacity-60">
            {SUPPORTED_LANGUAGES.map((item) => (
              <div key={item.id} className="px-3 py-1.5 rounded-xl text-xs md:text-sm font-bold text-zinc-400">
                <span>{item.icon}</span> <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <LanguageToggleBarInner {...props} />
    </Suspense>
  );
}
