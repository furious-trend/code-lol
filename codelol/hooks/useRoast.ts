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
  
  // Cache to store roast results based on the code string
  const [roastCache, setRoastCache] = useState<Record<string, RoastResult>>({});

  const clearRoast = () => {
    setRoastData(null);
    setRoastError('');
  };

  const handleRoast = useCallback(async (code: string) => {
    if (!code.trim()) {
      setRoastError('Please provide some code to roast!');
      return;
    }

    if (roastCache[code]) {
      // Use cached version
      setRoastData(roastCache[code]);
      setRoastError('');
      return;
    }

    setIsRoasting(true);
    setRoastError('');
    setRoastData(null);
    setRoastStatus('Cooking up a roast... 🔥');
    
    try {
      // 1. Fetch the roast from Gemini
      const roastRes = await fetch('/api/roast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
      
      const roastResponseData = await roastRes.json();
      
      if (!roastRes.ok) {
        throw new Error(roastResponseData.error || 'Failed to connect to the roasting service.');
      }

      // 2. Fetch the corresponding GIF based on the mood
      setRoastStatus('Finding the perfect reaction...');
      
      const mood: RoastMood = roastResponseData.mood || 'facepalm';
      const gifKeyword = moodToGifKeyword[mood] || 'coding funny';
      
      const gifRes = await fetch(`/api/gif?keyword=${encodeURIComponent(gifKeyword)}`, {
        method: 'GET'
      });

      const gifResponseData = await gifRes.json();
      
      if (!gifRes.ok) {
        throw new Error(gifResponseData.error || 'Failed to fetch reaction GIF.');
      }

      const finalResult: RoastResult = {
        roast: roastResponseData.roast,
        fix: roastResponseData.fix,
        mood: mood,
        gifUrl: gifResponseData.url
      };

      // 3. Cache and set result
      setRoastCache(prev => ({ ...prev, [code]: finalResult }));
      setRoastData(finalResult);
      
    } catch (err) {
      setRoastError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsRoasting(false);
      setRoastStatus('');
    }
  }, [roastCache]);

  return {
    isRoasting,
    roastStatus,
    roastData,
    roastError,
    handleRoast,
    clearRoast
  };
}
