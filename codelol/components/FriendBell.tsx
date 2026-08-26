'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPendingRequests } from '@/lib/friends';

export function FriendBell() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchCount() {
      const pending = await getPendingRequests();
      setCount(pending.length);
    }
    fetchCount();
  }, []);

  return (
    <Link href="/friends" className="relative p-2 text-zinc-400 hover:text-white transition-colors">
      <span className="text-xl">🔔</span>
      {count > 0 && (
        <span className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}
