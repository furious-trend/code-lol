// agent-notes: { ctx: "Custom hook for dispatching code roasts via AI-first path with /api/roast server fallback", deps: ["@/lib/moodToGif", "@/lib/codelolAi", "@/lib/localGifs"], state: active, last: "sato@2026-11-26" }
import { useState, useCallback, useRef } from 'react';
import { RoastMood } from '@/lib/moodToGif';
import { getAiStatusSnapshot, getCodeFeedback, normalizeAiLang, normalizeAiProg } from '@/lib/codelolAi';

export interface RoastResult {
  roast: string;
  fix: string;
  mood: RoastMood;
  gifUrl: string;
  source?: 'browser-ai' | 'server-fallback';
  verdict?: 'roast' | 'praise';
}

export function useRoast() {
  const [isRoasting, setIsRoasting] = useState(false);
  const [roastStatus, setRoastStatus] = useState<string>('');
  const [roastData, setRoastData] = useState<RoastResult | null>(null);
  const [roastError, setRoastError] = useState<string>('');

  // Monotonic run-id for stale-result guard
  const runIdRef = useRef(0);

  const clearRoast = () => {
    setRoastData(null);
    setRoastError('');
  };

  const handleRoast = useCallback(async (
    code: string,
    output?: string,
    isSuccess?: boolean,
    soundUrl?: string,
    humorPref: 'general' | 'tamil' = 'general',
    language?: string
  ) => {
    if (!code.trim()) {
      setRoastError('Please provide some code to roast!');
      return;
    }

    const myRunId = ++runIdRef.current;

    setRoastError('');
    setRoastData(null);
    setRoastStatus('Roasting your code... 🔥');

    let isDone = false;
    const timeoutId = setTimeout(() => {
      if (!isDone) {
        setIsRoasting(true);
      }
    }, 500);

    try {
      const aiSnap = getAiStatusSnapshot();
      const useAi = aiSnap.status === 'ready';

      if (useAi) {
        try {
          const feedback = await getCodeFeedback({
            lang: normalizeAiLang(humorPref === 'tamil' ? 'ta-Latn' : 'en'),
            prog: normalizeAiProg(language ?? 'javascript'),
            expected: 'N/A',
            actual: output ?? '',
            error: output ?? '',
            code,
          });

          if (runIdRef.current !== myRunId) return; // stale

          let gifUrl = '';
          try {
            const { getResultGif } = await import('@/lib/localGifs');
            gifUrl = getResultGif(!!isSuccess, humorPref);
          } catch { /* ignore */ }

          setRoastData({
            roast: feedback.joke,
            fix: '',
            mood: feedback.type === 'roast' ? 'facepalm' : 'happy',
            gifUrl,
            source: 'browser-ai',
            verdict: feedback.condition_satisfied ? 'praise' : 'roast',
          });
          return;
        } catch {
          // AI failed — fall through to server
        }
      }

      // Server fallback path
      const roastRes = await fetch('/api/roast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, output, isSuccess, humorPref, language }),
      });

      const roastResponseData = await roastRes.json();

      if (!roastRes.ok) {
        if (roastRes.status === 429) {
          // Graceful client-side fallback when server /api/roast is rate-limited
          const { getRandomFallback } = await import('@/lib/fallbackRoasts');
          const { getResultGif } = await import('@/lib/localGifs');
          const localFallback = getRandomFallback(!!isSuccess, humorPref, undefined, language as any, output);
          if (runIdRef.current !== myRunId) return;
          setRoastData({
            roast: localFallback.roast,
            fix: localFallback.fix,
            mood: (localFallback.mood as RoastMood) || 'facepalm',
            gifUrl: getResultGif(!!isSuccess, humorPref),
            source: 'server-fallback',
          });
          return;
        }
        throw new Error(roastResponseData.error || 'Failed to connect to the roasting service.');
      }

      if (runIdRef.current !== myRunId) return; // stale

      const mood: RoastMood = roastResponseData.mood || 'facepalm';
      let gifUrl = '';
      try {
        const { getResultGif } = await import('@/lib/localGifs');
        gifUrl = getResultGif(!!isSuccess, humorPref);
      } catch (err) {
        console.error('Failed to load local gif:', err);
      }

      const finalResult: RoastResult = {
        roast: roastResponseData.roast,
        fix: roastResponseData.fix,
        mood: mood,
        gifUrl: gifUrl,
        source: 'server-fallback',
      };

      setRoastData(finalResult);

    } catch (err) {
      if (runIdRef.current !== myRunId) return;
      setRoastError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      isDone = true;
      clearTimeout(timeoutId);
      setIsRoasting(false);
      setRoastStatus('');
    }
  }, []);

  return {
    isRoasting,
    roastStatus,
    roastData,
    roastError,
    handleRoast,
    clearRoast
  };
}
