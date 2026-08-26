'use client';

import { useState, useEffect } from 'react';
import { getRandomJoke } from '@/lib/jokes';

export function AmbientJoke() {
  const [joke, setJoke] = useState<string | null>(null);

  useEffect(() => {
    // Only select the joke on the client to avoid hydration mismatch
    setJoke(getRandomJoke());
  }, []);

  if (!joke) return null;

  return (
    <footer className="w-full border-t border-zinc-900 bg-zinc-950/50 py-3 px-4 text-center mt-auto z-10">
      <p className="text-xs text-zinc-500 font-mono tracking-tight flex items-center justify-center gap-2">
        <span className="text-amber-500/70">💡</span> {joke}
      </p>
    </footer>
  );
}
