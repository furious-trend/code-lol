import { getPendingRequests, getFriends } from '@/lib/friends';
import FriendsPageClient from './FriendsPageClient';
import { Suspense } from 'react';
import Loading from './loading';

export default async function FriendsPage() {
  const [pending, accepted] = await Promise.all([
    getPendingRequests(),
    getFriends()
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <FriendsPageClient 
        initialPendingRequests={pending} 
        initialFriends={accepted} 
      />
    </Suspense>
  );
}
