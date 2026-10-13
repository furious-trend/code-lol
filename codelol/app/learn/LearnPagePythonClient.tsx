// agent-notes: { ctx: "Python tutorial workspace delegating to unified interactive library platform", deps: ["./UnifiedTutorialClient", "@/lib/python/curriculum", "@/lib/python/types"], state: active, last: "sato@2026-10-13" }
'use client';

import React from 'react';
import UnifiedTutorialClient from './UnifiedTutorialClient';
import { HumorPreference } from '@/lib/python/types';

interface Props {
  initialLevelId?: string;
  initialHumorPref?: HumorPreference;
}

export default function LearnPagePythonClient({
  initialLevelId = 'ch1-l1',
  initialHumorPref = 'general',
}: Props) {
  return (
    <div data-testid="learn-page-python-client" className="w-full h-full">
      <UnifiedTutorialClient
        initialLanguage="python"
        initialTopicId={initialLevelId}
        initialHumorPref={initialHumorPref}
      />
    </div>
  );
}
