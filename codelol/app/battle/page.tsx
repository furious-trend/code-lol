'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBattle, joinBattle } from '@/lib/battles';
import { problems } from '@/lib/problems';

export default function BattleLobbyPage() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState('');
  const [selectedProblem, setSelectedProblem] = useState(problems[0].id);
  const [maxPlayers, setMaxPlayers] = useState(2);
  const [timeLimit, setTimeLimit] = useState(300); // 5 mins
  
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    setError('');

    const battle = await createBattle(selectedProblem, maxPlayers, timeLimit);
    if (battle) {
      router.push(`/battle/${battle.room_code}`);
    } else {
      setError('Failed to create battle. Make sure you are logged in.');
      setIsCreating(false);
    }
  };

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomCode.trim()) return;
    
    setIsJoining(true);
    setError('');

    const success = await joinBattle(roomCode.trim());
    if (success) {
      router.push(`/battle/${roomCode.trim().toUpperCase()}`);
    } else {
      setError('Failed to join battle. Invalid code or room is full/started.');
      setIsJoining(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-zinc-950 text-zinc-50 p-6">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Create Battle */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl flex flex-col relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 opacity-50"></div>
          <h2 className="text-3xl font-extrabold mb-6 relative text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            Create Battle
          </h2>
          
          <form onSubmit={handleCreate} className="relative flex flex-col gap-6 flex-1">
            <div>
              <label className="block text-sm font-bold text-zinc-400 mb-2">Problem</label>
              <select 
                value={selectedProblem}
                onChange={(e) => setSelectedProblem(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
              >
                {problems.map(p => (
                  <option key={p.id} value={p.id}>{p.title} ({p.difficulty})</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2">Players</label>
                <select 
                  value={maxPlayers}
                  onChange={(e) => setMaxPlayers(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value={2}>1v1 (2 Players)</option>
                  <option value={4}>Free-for-all (4 Players)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2">Time Limit</label>
                <select 
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value={180}>3 Minutes</option>
                  <option value={300}>5 Minutes</option>
                  <option value={600}>10 Minutes</option>
                </select>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <button
                type="submit"
                disabled={isCreating}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] disabled:opacity-50"
              >
                {isCreating ? 'Generating Room...' : 'Host Battle ⚔️'}
              </button>
            </div>
          </form>
        </div>

        {/* Join Battle */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl flex flex-col relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-bl from-pink-600/10 to-rose-600/10 opacity-50"></div>
          <h2 className="text-3xl font-extrabold mb-6 relative text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500">
            Join Battle
          </h2>
          
          <form onSubmit={handleJoin} className="relative flex flex-col gap-6 flex-1">
            <div className="flex-1 flex flex-col justify-center">
              <label className="block text-sm font-bold text-zinc-400 mb-4 text-center">Enter Room Code</label>
              <input 
                type="text"
                placeholder="e.g. XY7Z9A"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                maxLength={6}
                className="w-full bg-zinc-950 border-2 border-zinc-700 rounded-2xl px-6 py-6 text-4xl text-center font-black tracking-widest text-white focus:outline-none focus:border-pink-500 uppercase placeholder:text-zinc-800"
              />
            </div>

            <div className="mt-auto pt-6">
              <button
                type="submit"
                disabled={isJoining || roomCode.length < 4}
                className="w-full bg-pink-600 hover:bg-pink-500 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(219,39,119,0.3)] hover:shadow-[0_0_30px_rgba(219,39,119,0.5)] disabled:opacity-50"
              >
                {isJoining ? 'Joining...' : 'Enter Arena 🚪'}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {error && (
        <div className="mt-8 bg-red-500/20 text-red-400 px-6 py-3 rounded-xl border border-red-500/30 font-medium">
          {error}
        </div>
      )}
    </div>
  );
}
