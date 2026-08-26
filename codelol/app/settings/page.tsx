"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Settings() {
  const [humorPref, setHumorPref] = useState<'general' | 'tamil'>('general');
  const [toast, setToast] = useState('');

  const saveSettings = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('humorPref', humorPref);
    }
    setToast('Settings saved successfully!');
    setTimeout(() => setToast(''), 3000);
  };
  
  // Load preference on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('humorPref');
      if (saved === 'tamil' || saved === 'general') {
        setHumorPref(saved);
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex items-start justify-center bg-zinc-950 text-white p-8 pt-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-600 via-zinc-950 to-zinc-950" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-2xl bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800/50 rounded-3xl p-8 shadow-2xl"
      >
        <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
          Settings Profile
        </h1>

        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-zinc-300">Account Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-500 mb-1">Username</label>
                <input 
                  type="text" 
                  defaultValue="current_user"
                  className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-500 mb-1">Update Password</label>
                <input 
                  type="password" 
                  placeholder="New password"
                  className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-zinc-300">Humor Preference</h2>
            <p className="text-sm text-zinc-500 mb-4">Choose your meme flavor for victories and defeats.</p>
            
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setHumorPref('general')}
                className={`p-4 rounded-xl border text-left transition-all ${humorPref === 'general' ? 'border-blue-500 bg-blue-500/10' : 'border-zinc-800 bg-zinc-950/50 hover:border-zinc-700'}`}
              >
                <div className="font-semibold mb-1">General Meme Sense</div>
                <div className="text-sm text-zinc-500">Global Dev Memes, StackOverflow</div>
              </button>
              <button 
                onClick={() => setHumorPref('tamil')}
                className={`p-4 rounded-xl border text-left transition-all ${humorPref === 'tamil' ? 'border-emerald-500 bg-emerald-500/10' : 'border-zinc-800 bg-zinc-950/50 hover:border-zinc-700'}`}
              >
                <div className="font-semibold mb-1">Tamil Comedy Sense</div>
                <div className="text-sm text-zinc-500">Vadivelu, Goundamani, Kollywood</div>
              </button>
            </div>
          </section>

          <div className="pt-6 border-t border-zinc-800/50 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={saveSettings}
              className="bg-white text-black font-semibold px-6 py-3 rounded-xl shadow-lg shadow-white/10"
            >
              Save Changes
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Toast Notification */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: toast ? 1 : 0, y: toast ? 0 : 50 }}
        className="fixed bottom-8 right-8 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg font-medium"
      >
        {toast}
      </motion.div>
    </div>
  );
}
