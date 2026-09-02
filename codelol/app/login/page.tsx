'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Bugsy } from '@/components/Bugsy';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [identifier, setIdentifier] = useState(''); // username or email
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  
  const [humorPref, setHumorPref] = useState<'general' | 'tamil'>('general');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleOAuth = async (provider: 'google' | 'facebook') => {
    setLoading(true);
    setError('');
    const intentQuery = !isLogin ? '?intent=signup' : '';
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback${intentQuery}` },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: signUpError } = await supabase.auth.signUp({
      email: signupEmail.trim(),
      password: signupPassword,
      options: {
        data: {
          username: signupUsername.trim(),
          humor_preference: humorPref
        }
      }
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setTimeout(() => router.push('/'), 1000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const trimmedIdentifier = identifier.trim();

    try {
      let targetEmail = trimmedIdentifier;

      // If user typed a username (no '@'), look up email from profiles table via secure RPC
      if (!trimmedIdentifier.includes('@')) {
        const { data: email, error: rpcError } = await supabase
          .rpc('get_email_by_username', { p_username: trimmedIdentifier });

        if (rpcError || !email) {
          setError('No account found with that username');
          setLoading(false);
          return;
        }

        targetEmail = email;
      }

      // Perform login
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: targetEmail,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
      } else {
        setSuccess(true);
        setTimeout(() => router.push('/'), 1000);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setLoading(true);
    setError('');
    
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(identifier, {
      redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/reset-password`,
    });
    
    setLoading(false);
    if (resetError) {
      setError(resetError.message);
    } else {
      setResetSent(true);
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
        staggerChildren: 0.12
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
            <Bugsy mood={success ? "laughing" : "happy"} size={64} />
          </div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-emerald-400 text-center relative z-10">
            CodeLOL
          </h1>
        </motion.div>

        {/* Tab Switcher */}
        {!isForgotPassword && (
          <motion.div variants={itemVariants} className="flex bg-zinc-950/50 rounded-xl p-1 mb-8 relative border border-zinc-800/50">
            <div className="flex w-full relative z-10">
              <button
                type="button"
                onClick={() => { setIsLogin(true); setError(''); }}
                className={`flex-1 py-2.5 text-sm font-semibold transition-colors z-10 relative ${isLogin ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                {isLogin && (
                  <motion.div
                    layoutId="authTabPill"
                    className="absolute inset-0 bg-zinc-800 rounded-lg shadow-sm -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setIsLogin(false); setError(''); }}
                className={`flex-1 py-2.5 text-sm font-semibold transition-colors z-10 relative ${!isLogin ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                {!isLogin && (
                  <motion.div
                    layoutId="authTabPill"
                    className="absolute inset-0 bg-zinc-800 rounded-lg shadow-sm -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                Join Arena
              </button>
            </div>
          </motion.div>
        )}

        {/* Error notification */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              key="error"
              initial={{ opacity: 0, height: 0, y: -10 }} 
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-sm font-medium text-center mb-6"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {isForgotPassword ? (
          /* FORGOT PASSWORD VIEW */
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2 mb-6">
              <h2 className="text-xl font-bold text-zinc-100">Reset Password</h2>
              <p className="text-sm text-zinc-400">
                Enter your email and we&apos;ll send you a reset link.
              </p>
            </div>
            
            {resetSent ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl text-sm font-medium text-center">
                If an account exists with that email, a reset link has been sent.
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <motion.div variants={itemVariants}>
                  <motion.input 
                    whileFocus={{ scale: 1.01, boxShadow: "0px 0px 12px rgba(59, 130, 246, 0.3)" }}
                    type="email" 
                    placeholder="Email Address"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                    className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  />
                </motion.div>
                
                <motion.div variants={itemVariants} className="pt-2">
                  <motion.button 
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 disabled:opacity-80 relative flex items-center justify-center overflow-hidden"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Send Reset Link"
                    )}
                  </motion.button>
                </motion.div>
              </form>
            )}
            
            <div className="text-center">
              <button
                type="button"
                onClick={() => { setIsForgotPassword(false); setResetSent(false); setError(''); }}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Back to Login
              </button>
            </div>
          </motion.div>
        ) : isLogin ? (
          /* LOGIN VIEW */
          <div className="space-y-6">
            <div className="space-y-3">
              {/* Google OAuth Button */}
              <motion.div variants={itemVariants}>
                <motion.button 
                  type="button"
                  onClick={() => handleOAuth('google')}
                  disabled={loading}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(255, 255, 255, 0.15)" }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative w-full py-3 px-4 flex items-center justify-center gap-3 bg-zinc-100 text-zinc-900 rounded-xl font-bold shadow-lg shadow-zinc-100/10 transition-all disabled:opacity-50 overflow-hidden"
                >
                  <svg className="w-5 h-5 relative z-10" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="relative z-10">Continue with Google</span>
                </motion.button>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="relative flex items-center py-1">
              <div className="flex-grow border-t border-zinc-800/80"></div>
              <span className="flex-shrink-0 mx-4 text-zinc-600 text-xs font-semibold uppercase tracking-wider">or</span>
              <div className="flex-grow border-t border-zinc-800/80"></div>
            </motion.div>

            {/* Username/Email + Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div variants={itemVariants}>
                <motion.input 
                  whileFocus={{ scale: 1.01, boxShadow: "0px 0px 12px rgba(59, 130, 246, 0.3)" }}
                  id="identifier"
                  name="identifier"
                  type="text" 
                  autoComplete="username"
                  placeholder="Username or Email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.input 
                  whileFocus={{ scale: 1.01, boxShadow: "0px 0px 12px rgba(59, 130, 246, 0.3)" }}
                  id="password"
                  name="password"
                  type="password" 
                  autoComplete="current-password"
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => { setIsForgotPassword(true); setError(''); }}
                    className="text-xs text-zinc-400 hover:text-blue-400 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-2">
                <motion.button 
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.025, boxShadow: "0 0 24px rgba(6, 182, 212, 0.35)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 420, damping: 18 }}
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
                        Enter Arena
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            </form>
          </div>
        ) : (
          /* SIGNUP VIEW */
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 text-center py-4"
          >
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-zinc-100">Create your account</h2>
            </div>
            
            <div className="space-y-3">
              <motion.button 
                type="button"
                onClick={() => handleOAuth('google')}
                disabled={loading}
                whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(255, 255, 255, 0.15)" }}
                whileTap={{ scale: 0.97 }}
                className="group relative w-full py-3.5 px-4 flex items-center justify-center gap-3 bg-zinc-100 text-zinc-900 rounded-xl font-bold shadow-lg shadow-zinc-100/10 transition-all disabled:opacity-50 overflow-hidden"
              >
                <svg className="w-5 h-5 relative z-10" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="relative z-10">Continue with Google</span>
              </motion.button>
              
              <motion.button 
                type="button"
                onClick={() => handleOAuth('facebook')}
                disabled={loading}
                whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(24, 119, 242, 0.3)" }}
                whileTap={{ scale: 0.97 }}
                className="group relative w-full py-3.5 px-4 flex items-center justify-center gap-3 bg-[#1877F2] text-white rounded-xl font-bold shadow-lg shadow-[#1877F2]/20 transition-all disabled:opacity-50 overflow-hidden"
              >
                <svg className="w-5 h-5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="relative z-10">Continue with Facebook</span>
              </motion.button>
            </div>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-zinc-800/80"></div>
              <span className="flex-shrink-0 mx-4 text-zinc-600 text-xs font-semibold uppercase tracking-wider">or sign up with email</span>
              <div className="flex-grow border-t border-zinc-800/80"></div>
            </div>

            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <motion.input 
                whileFocus={{ scale: 1.01, boxShadow: "0px 0px 12px rgba(59, 130, 246, 0.3)" }}
                type="email" 
                placeholder="Email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              />
              
              <motion.input 
                whileFocus={{ scale: 1.01, boxShadow: "0px 0px 12px rgba(59, 130, 246, 0.3)" }}
                type="text" 
                placeholder="Username"
                value={signupUsername}
                onChange={(e) => setSignupUsername(e.target.value)}
                required
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              />

              <motion.input 
                whileFocus={{ scale: 1.01, boxShadow: "0px 0px 12px rgba(59, 130, 246, 0.3)" }}
                type="password" 
                placeholder="Password (min 6 chars)" 
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              />

              <div className="pt-2 pb-2">
                <p className="text-sm font-semibold text-zinc-300 text-left mb-3">Select your humor vibe:</p>
                <div className="grid grid-cols-2 gap-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setHumorPref('general')}
                    className={`cursor-pointer p-3 rounded-xl border relative transition-all ${humorPref === 'general' ? 'bg-blue-900/20 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-zinc-950/50 border-zinc-800 hover:border-zinc-700'}`}
                  >
                    {humorPref === 'general' && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-1 shadow-lg">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    )}
                    <h3 className="text-sm font-bold text-white mb-1">☕ Global Dev</h3>
                    <p className="text-[10px] text-zinc-400 leading-tight">Dev Memes, Coffee Overdose & StackOverflow Nightmares</p>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setHumorPref('tamil')}
                    className={`cursor-pointer p-3 rounded-xl border relative transition-all ${humorPref === 'tamil' ? 'bg-emerald-900/20 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-zinc-950/50 border-zinc-800 hover:border-zinc-700'}`}
                  >
                    {humorPref === 'tamil' && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 bg-emerald-500 rounded-full p-1 shadow-lg">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    )}
                    <h3 className="text-sm font-bold text-white mb-1">⚡ Tamil Sense</h3>
                    <p className="text-[10px] text-zinc-400 leading-tight">Vadivelu Counters, Goundamani Roasts & Tech Trolls</p>
                  </motion.div>
                </div>
              </div>

              <motion.button 
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.025, boxShadow: "0 0 24px rgba(6, 182, 212, 0.35)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 420, damping: 18 }}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 disabled:opacity-80 relative flex items-center justify-center overflow-hidden mt-4"
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
                      Join Arena
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
