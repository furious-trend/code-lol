// agent-notes: { ctx: "Battle lobby page with cyber-arcade split cards for hosting and joining battles", deps: ["@/lib/battles", "@/lib/problems"], state: "active", last: "sato@2026-10-31" }
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
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    setError('');

    const battle = await createBattle(selectedProblem, maxPlayers, timeLimit, selectedLanguage);
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
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-zinc-950 text-zinc-50 p-4 md:p-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Badge */}
      <div className="text-center mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
          <span>⚔️</span> Realtime Multiplayer Arena
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 tracking-tight">
          Battle Arena
        </h1>
        <p className="text-zinc-400 text-sm md:text-base mt-2 max-w-md mx-auto">
          Challenge friends or rivals to real-time speed coding face-offs with live test progress.
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        
        {/* Create Battle */}
        <div className="bg-zinc-900/80 border border-indigo-500/30 hover:border-indigo-500/60 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col relative overflow-hidden group transition-all backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-6 relative">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-lg shadow-[0_0_15px_rgba(99,102,241,0.3)]">
              🛡️
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">
                Create Battle
              </h2>
              <p className="text-xs text-zinc-400">Configure rules and host an arena</p>
            </div>
          </div>
          
          <form onSubmit={handleCreate} className="relative flex flex-col gap-5 flex-1">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Problem Challenge</label>
              <select 
                value={selectedProblem}
                onChange={(e) => setSelectedProblem(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700/80 rounded-xl px-4 py-3 text-white font-medium text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              >
                {problems.map(p => (
                  <option key={p.id} value={p.id}>{p.title} ({p.difficulty})</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Language</label>
                <select 
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700/80 rounded-xl px-3 py-2.5 text-white font-medium text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                >
                  <option value="javascript">JavaScript (JS)</option>
                  <option value="python">Python 3</option>
                  <option value="c">C (GCC)</option>
                  <option value="cpp">C++ (G++)</option>
                  <option value="java">Java 17</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Players</label>
                <select 
                  value={maxPlayers}
                  onChange={(e) => setMaxPlayers(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-700/80 rounded-xl px-3 py-2.5 text-white font-medium text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                >
                  <option value={2}>Duel (1v1)</option>
                  <option value={4}>Rumble (4 Players)</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Time Limit</label>
              <select 
                value={timeLimit}
                onChange={(e) => setTimeLimit(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-700/80 rounded-xl px-4 py-2.5 text-white font-medium text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value={180}>⚡ 3 Minutes (Blitz)</option>
                <option value={300}>⏱️ 5 Minutes (Standard)</option>
                <option value={600}>🧠 10 Minutes (Deep Think)</option>
              </select>
            </div>

            <div className="mt-auto pt-4">
              <button
                type="submit"
                disabled={isCreating}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white py-3.5 rounded-xl font-bold text-base transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] disabled:opacity-50 active:scale-95"
              >
                {isCreating ? 'Generating Room...' : 'Host Battle ⚔️'}
              </button>
            </div>
          </form>
        </div>

        {/* Join Battle */}
        <div className="bg-zinc-900/80 border border-pink-500/30 hover:border-pink-500/60 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col relative overflow-hidden group transition-all backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl group-hover:bg-pink-500/20 transition-all pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-6 relative">
            <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-lg shadow-[0_0_15px_rgba(219,39,119,0.3)]">
              🚪
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">
                Join Arena
              </h2>
              <p className="text-xs text-zinc-400">Enter a code to jump into battle</p>
            </div>
          </div>
          
          <form onSubmit={handleJoin} className="relative flex flex-col gap-6 flex-1">
            <div className="flex-1 flex flex-col justify-center">
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3 text-center">Room Code</label>
              <input 
                type="text"
                placeholder="e.g. XY7Z9A"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                maxLength={6}
                className="w-full bg-zinc-950 border-2 border-zinc-700/80 rounded-2xl px-4 py-5 text-3xl md:text-4xl text-center font-black tracking-[0.25em] text-pink-300 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 uppercase placeholder:text-zinc-800 transition-all"
              />
              <span className="text-[11px] text-zinc-500 text-center mt-2 font-mono">6-character lobby code</span>
            </div>

            <div className="mt-auto pt-4">
              <button
                type="submit"
                disabled={isJoining || roomCode.length < 4}
                className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white py-3.5 rounded-xl font-bold text-base transition-all shadow-[0_0_20px_rgba(219,39,119,0.3)] hover:shadow-[0_0_30px_rgba(219,39,119,0.5)] disabled:opacity-50 active:scale-95"
              >
                {isJoining ? 'Joining Room...' : 'Enter Arena 🚀'}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {error && (
        <div className="mt-6 bg-red-500/10 text-red-400 px-6 py-3 rounded-xl border border-red-500/30 font-medium text-sm flex items-center gap-2">
          <span>⚠️</span> {error}
        </div>
      )}
    </div>
  );
}
