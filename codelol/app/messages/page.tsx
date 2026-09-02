'use client';

import { useState, useEffect, useRef } from 'react';
import { getFriends, FriendRequest } from '@/lib/friends';
import { useMessages } from '@/hooks/useMessages';
import { Bugsy } from '@/components/Bugsy';
import { createClient } from '@/lib/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';

export default function MessagesPage() {
  const [friends, setFriends] = useState<FriendRequest[]>([]);
  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const { messages, loading, send } = useMessages(selectedFriendId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadInitial() {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setCurrentUserId(data.user.id);
      }
      const accepted = await getFriends();
      setFriends(accepted);
    }
    loadInitial();
  }, []);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    const textToSend = inputText;
    setInputText(''); // optimistic clear
    
    const success = await send(textToSend);
    if (!success) {
      setInputText(textToSend); // restore if failed
      alert('Failed to send message');
    }
  };

  const selectedFriend = friends.find(f => f.profiles?.id === selectedFriendId)?.profiles;

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-50 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto w-full h-[calc(100vh-8rem)] flex flex-col">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
          Messages
        </h1>

        <div className="flex flex-1 overflow-hidden bg-zinc-900 border border-zinc-800 rounded-3xl shadow-xl">
          {/* Left Sidebar: Friends List */}
          <div className="w-1/3 md:w-1/4 border-r border-zinc-800 flex flex-col bg-zinc-950/50">
            <div className="p-4 border-b border-zinc-800">
              <h2 className="font-bold text-lg">Conversations</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              {friends.length === 0 ? (
                <div className="p-6 text-center text-zinc-500 text-sm">
                  No friends yet. Add some on the Friends page!
                </div>
              ) : (
                friends.map((f) => {
                  const profile = f.profiles;
                  if (!profile) return null;
                  const isSelected = selectedFriendId === profile.id;
                  
                  return (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFriendId(profile.id)}
                      className={`w-full text-left p-4 border-b border-zinc-800/50 transition-colors flex items-center gap-3 ${
                        isSelected ? 'bg-zinc-800/50' : 'hover:bg-zinc-800/30'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-indigo-900 flex items-center justify-center font-bold text-indigo-300">
                        {profile.display_name?.charAt(0).toUpperCase() || '?'}
                      </div>
                      <div className="hidden sm:block overflow-hidden">
                        <div className="font-bold truncate">{profile.display_name || 'Unknown'}</div>
                        <div className="text-xs text-zinc-500 truncate">Lvl {profile.current_level}</div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Panel: Chat Thread */}
          <div className="flex-1 flex flex-col bg-zinc-900">
            {!selectedFriendId ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-zinc-500">
                <Bugsy size={120} mood="idle" />
                <h3 className="text-xl font-bold mt-6 mb-2 text-zinc-300">No conversation selected</h3>
                <p>Select a friend from the sidebar to start chatting!</p>
              </div>
            ) : (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-900 flex items-center justify-center font-bold text-indigo-300">
                      {selectedFriend?.display_name?.charAt(0).toUpperCase() || '?'}
                    </div>
                    <h2 className="font-bold text-lg">{selectedFriend?.display_name || 'Friend'}</h2>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(234, 179, 8, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-xl transition-all shadow-lg flex items-center gap-2"
                  >
                    <span>⚡</span> Challenge to Battle
                  </motion.button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {loading && messages.length === 0 ? (
                    <div className="flex justify-center p-4">
                      <span className="animate-pulse text-zinc-500">Loading messages...</span>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-zinc-500">
                      <p>Say hi to {selectedFriend?.display_name || 'your friend'}!</p>
                    </div>
                  ) : (
                    <AnimatePresence>
                      {messages.map((msg) => {
                        const isMe = msg.sender_id === currentUserId;
                        return (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 15, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[70%] p-3 rounded-2xl ${
                                isMe 
                                  ? 'bg-indigo-600 text-white rounded-br-none' 
                                  : 'bg-zinc-800 text-zinc-200 rounded-bl-none'
                              }`}
                            >
                              <p className="break-words">{msg.content}</p>
                              <div className={`text-[10px] mt-1 ${isMe ? 'text-indigo-200' : 'text-zinc-500'}`}>
                                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-zinc-950 border-t border-zinc-800">
                  <form onSubmit={handleSend} className="flex gap-2">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder={`Message ${selectedFriend?.display_name || '...'}`}
                      className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      type="submit"
                      disabled={!inputText.trim()}
                      className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-bold transition-colors"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
