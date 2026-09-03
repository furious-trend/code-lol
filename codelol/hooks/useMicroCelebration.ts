'use client';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

export function useMicroCelebration(featureKey: string) {
  const [hasCelebrated, setHasCelebrated] = useState(true);

  useEffect(() => {
    const key = `codelol_celebrated_${featureKey}`;
    const didCelebrate = localStorage.getItem(key) === 'true';
    setHasCelebrated(didCelebrate);
  }, [featureKey]);

  const triggerCelebration = () => {
    if (hasCelebrated) return;
    
    confetti({
      particleCount: 50,
      spread: 40,
      origin: { y: 0.8 },
      colors: ['#00E5FF', '#a855f7', '#f59e0b']
    });

    localStorage.setItem(`codelol_celebrated_${featureKey}`, 'true');
    setHasCelebrated(true);
  };

  return { triggerCelebration, hasCelebrated };
}
