'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Bugsy } from '@/components/Bugsy';

export default function Onboarding() {
  const [humorPref, setHumorPref] = useState<'general' | 'tamil' | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleConfirm = async () => {
    if (!humorPref) {
      setError('Please select a vibe');
      return;
    }
    
    setLoading(true);
    setError('');
    
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      setError('User not found. Please log in again.');
      setLoading(false);
      return;
    }

    // Try to update existing profile, or insert if missing
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({ 
        id: user.id, 
        humor_preference: humorPref 
      }, { onConflict: 'id' });

    if (profileError) {
      setError(profileError.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setTimeout(() => router.push('/'), 1500); // 1.5s delay for celebratory moment
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const, staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white overflow-hidden p-4 relative">
      <motion.div 
        className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-zinc-950 to-zinc-950"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-zinc-900/60 backdrop-blur-2xl border border-zinc-800/50 shadow-2xl"
      >
        <motion.div variants={itemVariants} className="flex flex-col items-center mb-8 relative">
          <div className="absolute -top-14 -left-8 z-20">
            <Bugsy mood={success ? "laughing" : "happy"} size={64} />
          </div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 text-center relative z-10">
            Pick Your Vibe
          </h1>
          <p className="text-zinc-400 mt-3 text-sm text-center font-medium">
            How do you want your CodeLOL experience?
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4 mb-8">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                key="error"
                initial={{ opacity: 0, height: 0, y: -10 }} 
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-sm font-medium text-center mb-4"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 gap-4">
            <button 
              type="button"
              onClick={() => { setHumorPref('general'); setError(''); }}
              className={`p-5 rounded-xl border transition-all text-left flex items-center justify-between ${humorPref === 'general' ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.2)]' : 'border-zinc-800 bg-zinc-950/50 text-zinc-400 hover:border-zinc-700'}`}
            >
              <div>
                <div className={`text-lg font-bold mb-1 ${humorPref === 'general' ? 'text-indigo-400' : 'text-zinc-300'}`}>General Meme Sense</div>
                <div className="text-sm opacity-70">Global Dev Memes & Tech Humor</div>
              </div>
              {humorPref === 'general' && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-5 h-5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
              )}
            </button>
            <button 
              type="button"
              onClick={() => { setHumorPref('tamil'); setError(''); }}
              className={`p-5 rounded-xl border transition-all text-left flex items-center justify-between ${humorPref === 'tamil' ? 'border-purple-500 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.2)]' : 'border-zinc-800 bg-zinc-950/50 text-zinc-400 hover:border-zinc-700'}`}
            >
              <div>
                <div className={`text-lg font-bold mb-1 ${humorPref === 'tamil' ? 'text-purple-400' : 'text-zinc-300'}`}>Tamil Comedy Sense</div>
                <div className="text-sm opacity-70">Kollywood & Local References</div>
              </div>
              {humorPref === 'tamil' && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-5 h-5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
              )}
            </button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.button 
            onClick={handleConfirm}
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold shadow-lg shadow-purple-500/20 disabled:opacity-80 relative flex items-center justify-center overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"
                />
              ) : success ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2"
                >
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">Ready!</span>
                </motion.div>
              ) : (
                <motion.span
                  key="text"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-lg"
                >
                  Continue
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
        
        {/* Celebratory confetti/particles on success */}
        <AnimatePresence>
          {success && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden rounded-3xl"
            >
              {[...Array(24)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: 0, y: 0, 
                    scale: 0,
                    opacity: 1
                  }}
                  animate={{ 
                    x: (Math.random() - 0.5) * 500, 
                    y: (Math.random() - 0.5) * 500,
                    scale: Math.random() * 1.5 + 0.5,
                    opacity: 0,
                    rotate: Math.random() * 360
                  }}
                  transition={{ 
                    duration: 1.5 + Math.random(), 
                    ease: "easeOut" 
                  }}
                  className={`absolute w-3 h-3 rounded-sm ${['bg-indigo-500', 'bg-purple-500', 'bg-blue-400', 'bg-pink-400'][Math.floor(Math.random() * 4)]}`}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
