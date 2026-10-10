'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export function LanguageSwitcher() {
  const [activeLang, setActiveLang] = useState<string>('javascript');
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function loadLang() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && user.id !== 'local-guest') {
        const { data } = await supabase
          .from('profiles')
          .select('learning_language')
          .eq('id', user.id)
          .single();
        if (data?.learning_language) {
          setActiveLang(data.learning_language);
        }
      } else {
        const stored = localStorage.getItem('guest_lang');
        if (stored) setActiveLang(stored);
      }
    }
    loadLang();
  }, [supabase]);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setActiveLang(newLang);
    
    const { data: { user } } = await supabase.auth.getUser();
    if (user && user.id !== 'local-guest') {
      await supabase.from('profiles').update({ learning_language: newLang }).eq('id', user.id);
    } else {
      localStorage.setItem('guest_lang', newLang);
    }
    
    // Refresh current page to apply new language
    router.refresh();
    
    // Quick reload just to ensure all client states drop and remount with new language
    window.location.reload();
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
