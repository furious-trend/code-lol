'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Bugsy } from '@/components/Bugsy';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('CodeLOL Global Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 p-6 text-center text-zinc-50 font-sans">
      <Bugsy size={120} mood="dizzy" />
      <h2 className="text-4xl font-black text-red-500 mt-8 mb-4">Well, that escalated quickly.</h2>
      <p className="text-zinc-400 text-lg max-w-md mb-8">
        Our code just threw a tantrum. Bugsy is trying to sweep it under the rug, but we might need to try again.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <button 
          onClick={reset}
          className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-500/20"
        >
          Try Again
        </button>
        <Link 
          href="/"
          className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-8 rounded-full transition-all"
        >
          Flee to Home
        </Link>
      </div>
    </div>
  );
}
