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

  const handleRoast = useCallback(async (code: string, output?: string, isSuccess?: boolean, soundUrl?: string) => {
    if (!code.trim()) {
      setRoastError('Please provide some code to roast!');
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
        body: JSON.stringify({ code, output, isSuccess }),
      });
      
      const roastResponseData = await roastRes.json();
      
      if (!roastRes.ok) {
        throw new Error(roastResponseData.error || 'Failed to connect to the roasting service.');
      }

      // 2. Fetch the corresponding GIF based on the mood
      setRoastStatus('Finding the perfect reaction...');
      
      const mood: RoastMood = roastResponseData.mood || 'facepalm';
      
      // Use the keyword provided by the LLM that relates to the joke, fallback to random if missing
      let gifKeyword = roastResponseData.gifKeyword;
      
      if (!gifKeyword) {
        // 100% Tamil GIFs only! (Movies + Famous Insta/YT Influencers)
        const tamilLegends = [
          'vadivelu',
          'santhanam',
          'seeman',
          'goundamani',
          'vivek comedy',
          'yogi babu',
          'soori',
          'gp muthu',
          'parithabangal',
          'ttf vasan',
          'madan gowri',
          'jump cuts'
        ];
        gifKeyword = tamilLegends[Math.floor(Math.random() * tamilLegends.length)];
      }
      
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

      setRoastData(finalResult);
      
    } catch (err) {
      setRoastError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
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
