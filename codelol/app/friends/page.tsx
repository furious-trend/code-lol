// agent-notes: { ctx: "Friends page server component with authenticated Supabase data fetching", deps: ["@/lib/friends", "@/lib/supabase/server", "./FriendsPageClient"], state: active, last: "sato@2026-10-13" }
import { getPendingRequests, getFriends, getOutgoingRequests } from '@/lib/friends';
import FriendsPageClient from './FriendsPageClient';
import { Suspense } from 'react';
import Loading from './loading';
import { createClient } from '@/lib/supabase/server';

export default async function FriendsPage() {
  const supabase = await createClient();
  const [pending, accepted, outgoing] = await Promise.all([
    getPendingRequests(supabase),
    getFriends(supabase),
    getOutgoingRequests(supabase)
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <FriendsPageClient 
        initialPendingRequests={pending} 
        initialFriends={accepted}
        initialOutgoingRequests={outgoing}
      />
    </Suspense>
  );
}

