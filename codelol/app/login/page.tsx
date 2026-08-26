"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [humorPref, setHumorPref] = useState<'general' | 'tamil'>('general');

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white overflow-hidden p-4 relative">
      <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-zinc-950 to-zinc-950" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 shadow-2xl"
      >
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 text-center mb-8">
          CodeLOL
        </h1>

        {/* Tab Switcher */}
        <div className="flex bg-zinc-800/50 rounded-lg p-1 mb-8 relative">
          <div className="flex w-full relative z-10">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${isLogin ? 'text-white' : 'text-zinc-400'}`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${!isLogin ? 'text-white' : 'text-zinc-400'}`}
            >
              Signup
            </button>
          </div>
          <motion.div 
            className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-blue-600 rounded-md z-0"
            animate={{ left: isLogin ? '4px' : 'calc(50%)' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Social Buttons */}
        <div className="space-y-4 mb-8">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className="w-full py-3 px-4 flex items-center justify-center gap-3 bg-white text-zinc-900 rounded-xl font-semibold shadow-lg shadow-white/10 border border-white/20 transition-shadow"
          >
            Google
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className="w-full py-3 px-4 flex items-center justify-center gap-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/20 border border-blue-500/50"
          >
            Facebook
          </motion.button>
        </div>

        <div className="relative flex items-center py-5">
          <div className="flex-grow border-t border-zinc-800"></div>
          <span className="flex-shrink-0 mx-4 text-zinc-500 text-sm">or</span>
          <div className="flex-grow border-t border-zinc-800"></div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Username" 
            className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="pt-2 space-y-3 overflow-hidden"
          >
            <p className="text-sm text-zinc-400 font-medium">Select your vibe:</p>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setHumorPref('general')}
                className={`p-3 rounded-xl border transition-all ${humorPref === 'general' ? 'border-blue-500 bg-blue-500/10' : 'border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600'}`}
              >
                <div className="text-sm font-semibold mb-1">General Meme Sense</div>
                <div className="text-xs opacity-70">Global Dev Memes, StackOverflow</div>
              </button>
              <button 
                onClick={() => setHumorPref('tamil')}
                className={`p-3 rounded-xl border transition-all ${humorPref === 'tamil' ? 'border-emerald-500 bg-emerald-500/10' : 'border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600'}`}
              >
                <div className="text-sm font-semibold mb-1">Tamil Comedy Sense</div>
                <div className="text-xs opacity-70">Vadivelu, Goundamani, Kollywood</div>
              </button>
            </div>
          </motion.div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 py-3 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20"
          >
            {isLogin ? 'Enter Arena' : 'Create Profile'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
