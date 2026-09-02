'use client';

import { useState, useEffect, useCallback } from 'react';
import { searchUsers, sendFriendRequest, acceptFriendRequest, getPendingRequests, getFriends, Profile, FriendRequest } from '@/lib/friends';
import Link from 'next/link';
import debounce from 'lodash.debounce';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export default function FriendsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Profile[]>([]);
  const [pendingRequests, setPendingRequests] = useState<FriendRequest[]>([]);
  const [friends, setFriends] = useState<FriendRequest[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [requestStatus, setRequestStatus] = useState<Record<string, 'sent' | 'failed' | null>>({});

  useEffect(() => {
    loadFriendsData();
  }, []);

  const loadFriendsData = async () => {
    const [pending, accepted] = await Promise.all([
      getPendingRequests(),
      getFriends()
    ]);
    setPendingRequests(pending);
    setFriends(accepted);
  };

  const executeSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    const results = await searchUsers(query);
    setSearchResults(results);
    setIsSearching(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((query: string) => executeSearch(query), 500),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleSendRequest = async (userId: string) => {
    const success = await sendFriendRequest(userId);
    setRequestStatus(prev => ({ ...prev, [userId]: success ? 'sent' : 'failed' }));
    if (success) setTimeout(() => setRequestStatus(prev => ({ ...prev, [userId]: null })), 3000);
  };

  const handleAcceptRequest = async (requestId: string) => {
    const success = await acceptFriendRequest(requestId);
    if (success) {
      loadFriendsData();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-50 font-sans p-6 md:p-12">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Friends
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Search & Pending */}
          <div className="space-y-8">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold mb-4">Find Friends</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search for friends by name..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="flex-1 bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              {searchResults.length > 0 && (
                <div className="mt-6 space-y-4">
                  {searchResults.map((user) => (
                    <TiltCard key={user.id} user={user} requestStatus={requestStatus[user.id]} onSendRequest={handleSendRequest} />
                  ))}
                </div>
              )}
            </div>

            {pendingRequests.length > 0 && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl border-t-4 border-t-orange-500">
                <h2 className="text-2xl font-bold mb-4 text-orange-400">Friend Requests</h2>
                <div className="space-y-4">
                  {pendingRequests.map((req) => (
                    <div key={req.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-zinc-950 p-4 rounded-xl border border-zinc-800 gap-4">
                      <span className="font-bold">{req.profiles?.display_name || 'Someone'} wants to be friends!</span>
                      <button
                        onClick={() => handleAcceptRequest(req.id)}
                        className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg font-bold w-full sm:w-auto"
                      >
                        Accept
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Friends List */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Your Friends</h2>
            
            {friends.length === 0 ? (
              <div className="text-center py-12 text-zinc-500">
                <div className="text-6xl mb-4">😿</div>
                <p>You have no friends yet.</p>
                <p className="text-sm">Use the search to find someone!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {friends.map((f) => (
                  <div key={f.id} className="flex items-center justify-between bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                    <div className="flex flex-col">
                      <span className="font-bold text-lg">{f.profiles?.display_name || 'Friend'}</span>
                      <span className="text-xs text-zinc-500">Level {f.profiles?.current_level || 1} • {f.profiles?.current_tier || 'Beginner'}</span>
                    </div>
                    <Link
                      href="/messages"
                      className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl font-bold transition-colors"
                    >
                      Message
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TiltCard({ user, requestStatus, onSendRequest }: { user: Profile, requestStatus?: 'sent' | 'failed' | null, onSendRequest: (id: string) => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      data-testid={`profile-card-${user.id}`}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="flex items-center justify-between bg-zinc-950 p-4 rounded-xl border border-zinc-800 shadow-xl"
    >
      <span className="font-bold text-white transform" style={{ transform: "translateZ(30px)" }}>
        {user.display_name || 'Unknown Coder'}
      </span>
      <div className="flex flex-col items-end gap-1" style={{ transform: "translateZ(40px)" }}>
        <button
          onClick={() => onSendRequest(user.id)}
          disabled={requestStatus === 'sent'}
          className={`text-sm font-bold disabled:opacity-50 text-white px-3 py-1 rounded-lg shadow-lg transition-all ${
            requestStatus === 'sent' ? 'bg-zinc-700 text-zinc-300' : 'bg-cyan-500 hover:bg-cyan-400 shadow-cyan-500/50 cyan'
          }`}
        >
          {requestStatus === 'sent' ? 'Sent ✓' : 'Add Friend'}
        </button>
        {requestStatus === 'failed' && (
          <span className="text-xs text-red-400">Failed to send</span>
        )}
      </div>
    </motion.div>
  );
}
