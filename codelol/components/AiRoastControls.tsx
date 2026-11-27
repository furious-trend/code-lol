// agent-notes: { ctx: "AI Roast Controls: lazy-load toggle, progress bar, cached/error states, language toggle", deps: ["@/lib/codelolAi"], state: active, last: "dani@2026-11-27" }
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  getAiStatusSnapshot,
  subscribeAiStatus,
  loadAiModel,
  disposeAiModel,
  clearAiModelCache,
  isAiModelCached,
  type AiStatusSnapshot,
} from '@/lib/codelolAi';

export interface AiRoastControlsProps {
  humorPref: 'general' | 'tamil';
  onHumorPrefChange: (pref: 'general' | 'tamil') => void;
  language?: string;
}

export function AiRoastControls({ humorPref, onHumorPrefChange, language: _language }: AiRoastControlsProps) {
  const [snapshot, setSnapshot] = useState<AiStatusSnapshot>(() => getAiStatusSnapshot());
  const [isCached, setIsCached] = useState(() => getAiStatusSnapshot().cached);

  useEffect(() => {
    // Check cache status once on mount
    isAiModelCached().then(setIsCached).catch(() => setIsCached(false));

    // Subscribe to status changes
    const unsubscribe = subscribeAiStatus((snap) => {
      setSnapshot(snap);
      if (snap.cached) setIsCached(true);
    });
    return unsubscribe;
  }, []);

  const handleEnable = useCallback(() => {
    loadAiModel().catch(() => {/* error reflected via subscribeAiStatus */});
  }, []);

  const handleRetry = useCallback(async () => {
    await disposeAiModel().catch(() => {});
    loadAiModel().catch(() => {});
  }, []);

  const handleClearCache = useCallback(() => {
    clearAiModelCache().then(() => setIsCached(false)).catch(() => {});
  }, []);

  const { status, progress, error } = snapshot;

  return (
    <div className="flex flex-col gap-2 p-3 rounded-xl bg-zinc-900/80 border border-purple-500/20 text-xs">
      {/* Language toggle — always visible */}
      <div className="flex items-center gap-2" role="group" aria-label="Humor language">
        {/* Critical fix: aria-hidden on decorative emoji (Dani #6) */}
        <span className="text-zinc-400 font-medium shrink-0">
          <span aria-hidden="true">🌐 </span>Language:
        </span>
        <button
          type="button"
          aria-pressed={humorPref === 'general'}
          onClick={() => onHumorPrefChange('general')}
          className={`px-2 py-0.5 rounded-md border transition-colors ${
            humorPref === 'general'
              ? 'bg-purple-700 border-purple-500 text-white'
              : 'border-zinc-600 text-zinc-400 hover:border-purple-400 hover:text-purple-300'
          }`}
        >
          English (en)
        </button>
        <button
          type="button"
          aria-pressed={humorPref === 'tamil'}
          onClick={() => onHumorPrefChange('tamil')}
          className={`px-2 py-0.5 rounded-md border transition-colors ${
            humorPref === 'tamil'
              ? 'bg-amber-700 border-amber-500 text-white'
              : 'border-zinc-600 text-zinc-400 hover:border-amber-400 hover:text-amber-300'
          }`}
        >
          Tanglish (ta-Latn)
        </button>
      </div>

      {/*
        Critical fix #2 (Dani): aria-live="polite" so screen readers announce
        status transitions (idle→loading→ready→error) without manual focus moves.
      */}
      <div aria-live="polite" aria-atomic="true" className="flex flex-col gap-1.5">
        {status === 'idle' && (
          <button
            type="button"
            onClick={handleEnable}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-900/40 border border-purple-500/40 text-purple-300 hover:bg-purple-800/50 hover:text-purple-100 transition-colors font-medium"
          >
            {/* Critical fix: aria-hidden on decorative emoji (Dani #7) */}
            <span aria-hidden="true">🧠</span> Enable AI Roast Mode
            <span className="text-zinc-500 font-normal text-[10px]">(~521 MB, cached after first load)</span>
          </button>
        )}

        {status === 'loading' && (
          <div className="flex flex-col gap-1.5">
            {/*
              Critical fix #1 (Dani): <progress> has implicit role=progressbar.
              Remove explicit role to avoid double-role AT confusion.
            */}
            <progress
              aria-label="Loading AI model"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              value={progress}
              max={100}
              className="w-full h-1.5 rounded-full accent-purple-500"
            />
            <span className="text-purple-300">
              Loading Roast AI: {progress}% — cached locally after first load
            </span>
          </div>
        )}

        {status === 'ready' && (
          <div className="flex items-center gap-2 text-green-400">
            <span><span aria-hidden="true">✅ </span>AI Roast Mode active</span>
            {isCached && (
              <button
                type="button"
                onClick={handleClearCache}
                className="ml-auto px-2 py-0.5 rounded border border-zinc-600 text-zinc-400 hover:border-rose-400 hover:text-rose-300 transition-colors"
              >
                Clear Cached AI Model
              </button>
            )}
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-center gap-2 text-rose-400">
            <span><span aria-hidden="true">⚠️ </span>{error || 'Failed to load AI model'}</span>
            <button
              type="button"
              onClick={handleRetry}
              className="ml-auto px-2 py-0.5 rounded border border-zinc-600 text-zinc-400 hover:border-purple-400 hover:text-purple-300 transition-colors"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
