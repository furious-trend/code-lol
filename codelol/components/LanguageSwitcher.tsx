// agent-notes: { ctx: "Global language dropdown switcher with cookie and query sync", deps: ["@/lib/supabase/client"], state: active, last: "sato@2026-10-12" }
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

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

export function LanguageSwitcher() {
  const [activeLang, setActiveLang] = useState<string>('javascript');
  const supabase = createClient();

  useEffect(() => {
    async function loadLang() {
      const searchParams = new URLSearchParams(window.location.search);
      const queryLang = searchParams.get('lang') || searchParams.get('language');
      if (queryLang && ['javascript', 'python', 'c', 'cpp', 'java'].includes(queryLang)) {
        setActiveLang(queryLang);
        return;
      }

      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user && user.id !== 'local-guest') {
          const { data } = await supabase
            .from('profiles')
            .select('learning_language')
            .eq('id', user.id)
            .single();
          if (data?.learning_language) {
            setActiveLang(data.learning_language);
            return;
          }
        }
      } catch {
        // Fall back to local storage
      }

      const stored = localStorage.getItem('guest_lang');
      if (stored) setActiveLang(stored);
    }
    loadLang();
  }, [supabase]);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setActiveLang(newLang);
    
    // 1. Synchronize cookie for Server Components
    setClientLanguageCookie(newLang);

    // 2. Local storage for client guest preference
    setClientLanguageStorage(newLang);

    // 3. Supabase profile update if authenticated
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && user.id !== 'local-guest') {
        await supabase.from('profiles').update({ learning_language: newLang }).eq('id', user.id);
      }
    } catch {
      // Non-blocking
    }
    
    // 4. Update URL with searchParams
    const url = new URL(window.location.href);
    url.searchParams.set('lang', newLang);
    url.searchParams.delete('language');

    // Clean incompatible level params between python and multi-lang
    const currentLevel = url.searchParams.get('level');
    if (newLang !== 'python' && currentLevel && currentLevel.startsWith('ch')) {
      url.searchParams.delete('level');
    } else if (newLang === 'python' && currentLevel && /^\d+$/.test(currentLevel)) {
      url.searchParams.delete('level');
    }

    window.location.href = url.toString();
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-zinc-500 text-xs uppercase tracking-widest font-bold hidden md:inline-block">Lang:</span>
      <select 
        value={activeLang}
        onChange={handleChange}
        className="bg-zinc-900 border border-zinc-700 rounded-lg py-1 px-2 text-sm text-zinc-300 focus:outline-none focus:border-pink-500 cursor-pointer"
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="c">C</option>
        <option value="cpp">C++</option>
        <option value="java">Java</option>
      </select>
    </div>
  );
}
