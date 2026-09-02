import { useState, useCallback } from 'react';
import { RoastMood, moodToGifKeyword } from '@/lib/moodToGif';

interface RoastResult {
  roast: string;
  fix: string;
  mood: RoastMood;
  gifUrl: string;
}

export function useRoast() {
  const [isRoasting, setIsRoasting] = useState(false);
  const [roastStatus, setRoastStatus] = useState<string>('');
  const [roastData, setRoastData] = useState<RoastResult | null>(null);
  const [roastError, setRoastError] = useState<string>('');
  


  const clearRoast = () => {
    setRoastData(null);
    setRoastError('');
  };

  const handleRoast = useCallback(async (code: string, output?: string, isSuccess?: boolean, soundUrl?: string, humorPref: 'general' | 'tamil' = 'general') => {
    if (!code.trim()) {
      setRoastError('Please provide some code to roast!');
      return;
    }

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
      // 1. Fetch the roast from Gemini
      const roastRes = await fetch('/api/roast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, output, isSuccess, humorPref }),
      });
      
      const roastResponseData = await roastRes.json();
      
      if (!roastRes.ok) {
        throw new Error(roastResponseData.error || 'Failed to connect to the roasting service.');
      }

      // 2. Assign a local GIF based on success/failure
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
        gifUrl: gifUrl
      };

      setRoastData(finalResult);
      
    } catch (err) {
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
