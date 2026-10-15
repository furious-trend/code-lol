// agent-notes: { ctx: "Authentication login page with Sign In, Sign Up tabs, Username/Email OTP, and Google OAuth", deps: ["@/lib/supabase/client", "@/components/Bugsy"], state: active, last: "sato@2026-10-15" }
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Bugsy, BugsyMood } from '@/components/Bugsy';

function getAuthErrorMessage(error: unknown): string {
  if (!error) return 'An unexpected error occurred.';
  const err = error as Record<string, unknown>;
  let msg = typeof error === 'string' ? error : (err.message as string) || (err.msg as string) || (err.error_description as string) || '';
  if (!msg || msg === '{}' || typeof msg !== 'string') {
    try {
      const str = JSON.stringify(error);
      if (str && str !== '{}') msg = str;
    } catch {
      msg = '';
    }
  }
  if (!msg || msg === '{}') {
    msg = 'Error sending verification email. Please check your Supabase SMTP configuration.';
  }
  const lower = msg.toLowerCase();
  if (lower.includes('sending confirmation email') || lower.includes('error sending')) {
    return 'Failed to deliver email. Please check your email address or SMTP configuration.';
  }
  if (lower.includes('signups not allowed') || lower.includes('user not found')) {
    return 'User does not exist. Please sign up first.';
  }
  return msg;
}

export default function Login() {
  const router = useRouter();
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Sign In State (Username or Email)
  const [signInIdentifier, setSignInIdentifier] = useState('');

  // Sign Up State (Email & Optional Username)
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpUsername, setSignUpUsername] = useState('');

  // OTP Verification State
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [activeEmail, setActiveEmail] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  const supabase = createClient();

  const handleOAuth = async (provider: 'google') => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback` },
    });
    if (error) {
      setError(getAuthErrorMessage(error));
      setLoading(false);
    }
  };

  const handleSignIn = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const identifier = signInIdentifier.trim();
    if (!identifier) {
      setError('Please enter your email or username.');
      return;
    }

    setLoading(true);
    setError('');
    setInfoMessage('');

    let targetEmail = identifier;

    // Check if the input is a username (no '@') or an email
    if (!identifier.includes('@')) {
      // Look up email by username or display_name
      try {
        const { data: profile, error: profileErr } = await supabase
          .from('profiles')
          .select('email, id')
          .or(`username.ilike.${identifier},display_name.ilike.${identifier}`)
          .maybeSingle();

        if (profileErr || !profile || !profile.email) {
          setError('User does not exist. Please sign up first.');
          setLoading(false);
          return;
        }
        targetEmail = profile.email;
      } catch {
        setError('User does not exist. Please sign up first.');
        setLoading(false);
        return;
      }
    } else {
      // Check if user exists before signing in
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('id, email')
          .ilike('email', identifier)
          .maybeSingle();

        if (!profile) {
          setError('User does not exist. Please sign up first.');
          setLoading(false);
          return;
        }
      } catch {
        // Fallback to Supabase auth check below
      }
    }

    // Attempt Sign In with OTP (shouldCreateUser: false prevents creating new accounts on Sign In)
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email: targetEmail,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`,
      },
    });

    if (otpError) {
      setError(getAuthErrorMessage(otpError));
      setLoading(false);
    } else {
      setActiveEmail(targetEmail);
      setOtpSent(true);
      setInfoMessage(`We sent a 6-digit login code to ${targetEmail}`);
      setLoading(false);
    }
  };

  const handleSignUp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const email = signUpEmail.trim();
    const username = signUpUsername.trim();

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setError('');
    setInfoMessage('');

    // Check if an account already exists with this email
    try {
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .ilike('email', email)
        .maybeSingle();

      if (existingProfile) {
        setError('An account with this email already exists. Please sign in.');
        setLoading(false);
        return;
      }
    } catch {
      // Continue
    }

    // Check if username is already taken (if provided)
    if (username) {
      try {
        const { data: existingUsername } = await supabase
          .from('profiles')
          .select('id')
          .ilike('username', username)
          .maybeSingle();

        if (existingUsername) {
          setError('This username is already taken. Please choose another.');
          setLoading(false);
          return;
        }
      } catch {
        // Continue
      }
    }

    // Sign up with OTP (shouldCreateUser: true creates account)
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        data: username ? { username } : undefined,
        emailRedirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback?intent=signup`,
      },
    });

    if (otpError) {
      setError(getAuthErrorMessage(otpError));
      setLoading(false);
    } else {
      setActiveEmail(email);
      setOtpSent(true);
      setInfoMessage(`We sent a 6-digit verification code to ${email}`);
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!otp.trim()) {
      setError('Please enter the verification code.');
      return;
    }

    setLoading(true);
    setError('');

    const { error: verifyError } = await supabase.auth.verifyOtp({
      email: activeEmail,
      token: otp.trim(),
      type: 'email',
    });

    if (verifyError) {
      setError(getAuthErrorMessage(verifyError));
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      router.push('/');
      router.refresh();
    }
  };

  const handleReset = () => {
    setOtpSent(false);
    setOtp('');
    setError('');
    setInfoMessage('');
  };

  const bugsyMood: BugsyMood = success
    ? 'laughing'
    : error
    ? 'dizzy'
    : loading
    ? 'thinking'
    : otpSent
    ? 'happy'
    : 'idle';

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        staggerChildren: 0.08
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
        className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-zinc-900/70 backdrop-blur-2xl border border-zinc-800/60 shadow-2xl"
      >
        <motion.div variants={itemVariants} className="flex flex-col items-center mb-6 relative">
          <div className="absolute -top-14 -left-8 z-20">
            <Bugsy mood={bugsyMood} size={64} />
          </div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-teal-300 to-emerald-400 text-center relative z-10">
            CodeLOL
          </h1>
          <p className="text-xs text-zinc-400 mt-1 font-medium">
            {otpSent 
              ? 'Check your email for the 6-digit code' 
              : tab === 'signin' 
                ? 'Welcome back! Sign in to continue' 
                : 'Create an account to start coding & laughing'}
          </p>
        </motion.div>

        {/* Tab Switcher (Only visible before OTP is sent) */}
        {!otpSent && (
          <motion.div variants={itemVariants} className="flex p-1 mb-6 bg-zinc-950/80 rounded-xl border border-zinc-800/80 relative">
            <button
              type="button"
              onClick={() => { setTab('signin'); setError(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all relative z-10 ${
                tab === 'signin' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Sign In
              {tab === 'signin' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg -z-10 shadow-md"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
            <button
              type="button"
              onClick={() => { setTab('signup'); setError(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all relative z-10 ${
                tab === 'signup' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Sign Up
              {tab === 'signup' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg -z-10 shadow-md"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          </motion.div>
        )}

        {/* Status notifications */}
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

          {infoMessage && !error && (
            <motion.div 
              key="info"
              initial={{ opacity: 0, height: 0, y: -10 }} 
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3 rounded-xl text-sm font-medium text-center mb-4"
            >
              {infoMessage}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-6">
          {!otpSent ? (
            <>
              {tab === 'signin' ? (
                /* ================= SIGN IN TAB ================= */
                <motion.form variants={itemVariants} onSubmit={handleSignIn} className="space-y-3">
                  <div>
                    <label htmlFor="signin-id" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Username or Email
                    </label>
                    <input
                      id="signin-id"
                      type="text"
                      value={signInIdentifier}
                      onChange={(e) => setSignInIdentifier(e.target.value)}
                      placeholder="name@example.com or username"
                      disabled={loading}
                      required
                      className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all disabled:opacity-50"
                    />
                  </div>

                  <motion.button 
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 px-4 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50 text-sm"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Send Login Code</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                /* ================= SIGN UP TAB ================= */
                <motion.form variants={itemVariants} onSubmit={handleSignUp} className="space-y-3">
                  <div>
                    <label htmlFor="signup-email" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="signup-email"
                      type="email"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      placeholder="name@example.com"
                      disabled={loading}
                      required
                      className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label htmlFor="signup-username" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Username <span className="text-zinc-500 lowercase">(optional)</span>
                    </label>
                    <input
                      id="signup-username"
                      type="text"
                      value={signUpUsername}
                      onChange={(e) => setSignUpUsername(e.target.value)}
                      placeholder="coolcoder123"
                      disabled={loading}
                      className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all disabled:opacity-50"
                    />
                  </div>

                  <motion.button 
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 px-4 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-600/20 transition-all disabled:opacity-50 text-sm"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Create Account</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}

              {/* Divider */}
              <motion.div variants={itemVariants} className="relative flex items-center justify-center">
                <div className="border-t border-zinc-800 w-full" />
                <span className="bg-zinc-900 px-3 text-[11px] uppercase tracking-wider text-zinc-500 font-semibold absolute rounded-full">
                  or
                </span>
              </motion.div>

              {/* Google OAuth Button */}
              <motion.div variants={itemVariants}>
                <motion.button 
                  type="button"
                  onClick={() => handleOAuth('google')}
                  disabled={loading}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(255, 255, 255, 0.15)" }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative w-full py-3 px-4 flex items-center justify-center gap-3 bg-zinc-100 text-zinc-900 rounded-xl font-bold shadow-lg shadow-zinc-100/10 transition-all disabled:opacity-50 overflow-hidden text-sm"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-zinc-900/30 border-t-zinc-900 rounded-full animate-spin relative z-10" />
                  ) : (
                    <svg className="w-5 h-5 relative z-10" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  )}
                  <span className="relative z-10">
                    {loading ? 'Redirecting...' : 'Continue with Google'}
                  </span>
                </motion.button>
              </motion.div>
            </>
          ) : (
            /* ================= STEP 2: VERIFY OTP FORM ================= */
            <motion.form variants={itemVariants} onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-3 flex items-center justify-between text-xs">
                <span className="text-zinc-300 truncate max-w-[220px]">
                  Sent to <strong className="text-white">{activeEmail}</strong>
                </span>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors underline"
                >
                  Change
                </button>
              </div>

              <div>
                <label htmlFor="otp" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                  6-Digit OTP Code
                </label>
                <input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="123456"
                  disabled={loading}
                  autoFocus
                  required
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3.5 text-center text-2xl font-mono font-bold tracking-[0.4em] text-zinc-100 placeholder-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all disabled:opacity-50"
                />
              </div>

              <motion.button 
                type="submit"
                disabled={loading || otp.trim().length === 0}
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-600/20 transition-all disabled:opacity-50 text-sm"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  tab === 'signup' ? 'Verify & Create Account' : 'Verify & Sign In'
                )}
              </motion.button>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={() => tab === 'signup' ? handleSignUp() : handleSignIn()}
                  disabled={loading}
                  className="text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  Didn&apos;t receive code? <span className="text-emerald-400 font-semibold underline">Resend</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
