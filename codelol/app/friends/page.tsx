'use client';

import { useState, useEffect } from 'react';
import { searchUsers, sendFriendRequest, acceptFriendRequest, getPendingRequests, getFriends, Profile, FriendRequest } from '@/lib/friends';
import Link from 'next/link';

export default function FriendsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Profile[]>([]);
  const [pendingRequests, setPendingRequests] = useState<FriendRequest[]>([]);
  const [friends, setFriends] = useState<FriendRequest[]>([]);
  const [isSearching, setIsSearching] = useState(false);

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

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    const results = await searchUsers(searchQuery);
    setSearchResults(results);
    setIsSearching(false);
  };

  const handleSendRequest = async (userId: string) => {
    const success = await sendFriendRequest(userId);
    if (success) {
      alert('Friend request sent!');
    } else {
      alert('Failed to send request.');
    }
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
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search for friends by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                />
                <button
                  type="submit"
                  disabled={isSearching}
                  className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-xl font-bold transition-colors"
                >
                  Search
                </button>
              </form>

              {searchResults.length > 0 && (
                <div className="mt-6 space-y-4">
                  {searchResults.map((user) => (
                    <div key={user.id} className="flex items-center justify-between bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                      <span className="font-bold">{user.display_name || 'Unknown Coder'}</span>
                      <button
                        onClick={() => handleSendRequest(user.id)}
                        className="text-sm bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1 rounded-lg"
                      >
                        Add Friend
                      </button>
                    </div>
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
