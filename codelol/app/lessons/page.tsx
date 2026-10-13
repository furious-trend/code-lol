// agent-notes: { ctx: "Interactive Library hub combining sidebar index, content, and live compiler in hyper-violet theme", deps: ["./PythonLessonsView", "@/components/library/InteractiveLibraryClient", "@/lib/supabase/client"], state: active, last: "sato@2026-10-13" }
'use client';

import { useState, useEffect, Suspense } from 'react';
import { createClient } from '@/lib/supabase/client';
import { PythonLessonsView } from './PythonLessonsView';
import InteractiveLibraryClient from '@/components/library/InteractiveLibraryClient';
import { HumorPreference } from '@/lib/python/types';

function LessonsPageContent() {
  const [learningLanguage, setLearningLanguage] = useState<string>('python');
  const [humorPref, setHumorPref] = useState<HumorPreference>('general');
  const supabase = createClient();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location && window.location.search) {
      const params = new URLSearchParams(window.location.search);
      const requestedLang = params.get('lang') || params.get('language');
      if (requestedLang && ['python', 'javascript', 'c', 'cpp', 'java'].includes(requestedLang)) {
        setLearningLanguage(requestedLang);
      }
    }

    async function loadPref() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user && user.id !== 'local-guest') {
          const { data: profile } = await supabase
            .from('profiles')
            .select('humor_preference, learning_language')
            .eq('id', user.id)
            .single();

          if (profile?.humor_preference) {
            setHumorPref(profile.humor_preference as HumorPreference);
          }
          if (
            profile?.learning_language &&
            (!window.location.search || !new URLSearchParams(window.location.search).get('lang'))
          ) {
            setLearningLanguage(profile.learning_language);
          }
        } else {
          const storedHumor = localStorage.getItem('guest_humor');
          if (storedHumor === 'tamil' || storedHumor === 'general') {
            setHumorPref(storedHumor as HumorPreference);
          }
          const storedLang = localStorage.getItem('guest_lang');
          if (
            storedLang &&
            ['python', 'javascript', 'c', 'cpp', 'java'].includes(storedLang) &&
            (!window.location.search || !new URLSearchParams(window.location.search).get('lang'))
          ) {
            setLearningLanguage(storedLang);
          }
        }
      } catch {}
    }
    loadPref();
  }, [supabase]);

  return (
    <div className="min-h-screen bg-zinc-950">
      {learningLanguage === 'python' ? (
        <PythonLessonsView humorPref={humorPref} />
      ) : (
        <InteractiveLibraryClient
          initialLanguage={learningLanguage}
          initialHumorPref={humorPref}
        />
      )}
    </div>
  );
}

export default function LessonsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-950 p-6 md:p-12 font-sans flex items-center justify-center">
          <div className="text-zinc-500 font-bold animate-pulse">Loading Library...</div>
        </div>
      }
    >
      <LessonsPageContent />
    </Suspense>
  );
}
