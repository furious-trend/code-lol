'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Bugsy } from '@/components/Bugsy';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [humorPref, setHumorPref] = useState<'general' | 'tamil' | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleOAuth = async (provider: 'google') => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${location.origin}/auth/callback` },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (isLogin) {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
      } else {
        setSuccess(true);
        setTimeout(() => router.push('/'), 1000);
      }
    } else {
      if (!username.trim()) {
        setError('Username is required for signup');
        setLoading(false);
        return;
      }
      if (!humorPref) {
        setError('Please select a vibe');
        setLoading(false);
        return;
      }
      
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
      } else if (data.user) {
        // Create profile
        const { error: profileError } = await supabase.from('profiles').insert([{
          id: data.user.id,
          display_name: username,
          humor_preference: humorPref
        }]);

        if (profileError) {
          setError(profileError.message);
          setLoading(false);
        } else {
          setSuccess(true);
          setTimeout(() => router.push('/'), 1000);
        }
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white overflow-hidden p-4 relative">
      <motion.div 
        className="absolute inset-0 z-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-zinc-950 to-zinc-950"
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
            <Bugsy mood="happy" size={64} />
          </div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-emerald-400 text-center relative z-10">
            CodeLOL
          </h1>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div variants={itemVariants} className="flex bg-zinc-950/50 rounded-xl p-1 mb-8 relative border border-zinc-800/50">
          <div className="flex w-full relative z-10">
            <button
              type="button"
              onClick={() => { setIsLogin(true); setError(''); }}
              className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${isLogin ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => { setIsLogin(false); setError(''); }}
              className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${!isLogin ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Signup
            </button>
          </div>
          <motion.div 
            className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-zinc-800 rounded-lg shadow-sm z-0"
            animate={{ left: isLogin ? '4px' : 'calc(50%)' }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
          />
        </motion.div>

        {/* Social Buttons */}
        <motion.div variants={itemVariants} className="space-y-4 mb-6">
          <motion.button 
            type="button"
            onClick={() => handleOAuth('google')}
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="group relative w-full py-3 px-4 flex items-center justify-center gap-3 bg-zinc-100 text-zinc-900 rounded-xl font-bold shadow-lg shadow-zinc-100/10 transition-all disabled:opacity-50 overflow-hidden"
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full"
              whileHover={{ translateX: "100%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            <svg className="w-5 h-5 relative z-10" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="relative z-10">Continue with Google</span>
          </motion.button>
        </motion.div>

        <motion.div variants={itemVariants} className="relative flex items-center py-4">
          <div className="flex-grow border-t border-zinc-800/80"></div>
          <span className="flex-shrink-0 mx-4 text-zinc-600 text-xs font-semibold uppercase tracking-wider">or email</span>
          <div className="flex-grow border-t border-zinc-800/80"></div>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                key="error"
                initial={{ opacity: 0, height: 0, y: -10 }} 
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-sm font-medium text-center"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="popLayout">
            <motion.div key="email" layout variants={itemVariants}>
              <motion.input 
                whileFocus={{ scale: 1.01, boxShadow: "0px 0px 12px rgba(59, 130, 246, 0.3)" }}
                type="email" 
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              />
            </motion.div>

            {!isLogin && (
              <motion.div 
                key="username"
                layout
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden pt-4"
              >
                <motion.input 
                  whileFocus={{ scale: 1.01, boxShadow: "0px 0px 12px rgba(59, 130, 246, 0.3)" }}
                  type="text" 
                  placeholder="Username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required={!isLogin}
                  className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
              </motion.div>
            )}

            <motion.div key="password" layout variants={itemVariants} className="pt-4">
              <motion.input 
                whileFocus={{ scale: 1.01, boxShadow: "0px 0px 12px rgba(59, 130, 246, 0.3)" }}
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              />
            </motion.div>
            
            {!isLogin && (
              <motion.div 
                key="humor"
                layout
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="pt-4 space-y-3 overflow-hidden"
              >
                <p className="text-sm text-zinc-400 font-medium ml-1">Select your vibe:</p>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    type="button"
                    onClick={() => setHumorPref('general')}
                    className={`p-3 rounded-xl border transition-all text-left ${humorPref === 'general' ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.15)]' : 'border-zinc-800 bg-zinc-950/50 text-zinc-400 hover:border-zinc-700'}`}
                  >
                    <div className={`text-sm font-bold mb-1 ${humorPref === 'general' ? 'text-blue-400' : ''}`}>General Meme</div>
                    <div className="text-xs opacity-70">Global Dev Humor</div>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setHumorPref('tamil')}
                    className={`p-3 rounded-xl border transition-all text-left ${humorPref === 'tamil' ? 'border-emerald-500 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.15)]' : 'border-zinc-800 bg-zinc-950/50 text-zinc-400 hover:border-zinc-700'}`}
                  >
                    <div className={`text-sm font-bold mb-1 ${humorPref === 'tamil' ? 'text-emerald-400' : ''}`}>Tamil Comedy</div>
                    <div className="text-xs opacity-70">Kollywood Sense</div>
                  </button>
                </div>
              </motion.div>
            )}

            <motion.div key="submit" layout variants={itemVariants} className="pt-6">
              <motion.button 
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 disabled:opacity-80 relative flex items-center justify-center overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div 
                      key="loading"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
                    />
                  ) : success ? (
                    <motion.svg 
                      key="success"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-6 h-6 text-white" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </motion.svg>
                  ) : (
                    <motion.span
                      key="text"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {isLogin ? 'Enter Arena' : 'Create Profile'}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </form>
      </motion.div>
    </div>
  );
}
