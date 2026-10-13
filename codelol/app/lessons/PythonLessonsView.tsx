// agent-notes: { ctx: "Python library view mounting interactive library compiler and sidebar in hyper-violet theme", deps: ["@/components/library/InteractiveLibraryClient", "@/lib/python/types"], state: active, last: "sato@2026-10-13" }
'use client';

import React from 'react';
import InteractiveLibraryClient from '@/components/library/InteractiveLibraryClient';
import { HumorPreference } from '@/lib/python/types';

export function PythonLessonsView({ humorPref }: { humorPref: HumorPreference }) {
  return (
    <div data-testid="python-lessons-view" className="w-full h-full">
      <InteractiveLibraryClient initialLanguage="python" initialHumorPref={humorPref} />
    </div>
  );
}
