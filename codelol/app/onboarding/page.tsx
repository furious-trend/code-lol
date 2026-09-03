'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Bugsy } from '@/components/Bugsy';

function calculatePasswordStrength(pass: string): { score: number; label: string; color: string } {
  if (!pass) return { score: 0, label: '', color: 'bg-zinc-700' };
  let score = 0;
  if (pass.length >= 8) score += 1;
  if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
  if (/\d/.test(pass)) score += 1;
  if (/[^A-Za-z0-9]/.test(pass)) score += 1;

  if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-red-500' };
  if (score === 2 || score === 3) return { score: 2, label: 'Medium', color: 'bg-amber-500' };
  return { score: 3, label: 'Strong', color: 'bg-emerald-500' };
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

// Deterministic confetti particles for celebratory animation
const CONFETTI_PARTICLES = Array.from({ length: 24 }, (_, i) => {
  const angle = (i / 24) * 2 * Math.PI;
  const distance = 120 + (i % 6) * 35;
  const colors = ['bg-indigo-500', 'bg-purple-500', 'bg-blue-400', 'bg-pink-400'];
  return {
    id: i,
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    scale: 0.8 + (i % 4) * 0.3,
    rotate: (i * 45) % 360,
    duration: 1.2 + (i % 5) * 0.2,
    color: colors[i % colors.length],
  };
});

export default function Onboarding() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [direction, setDirection] = useState(1);

  // Step 1 State
  const [username, setUsername] = useState('');
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);

  // Step 2 State
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Step 3 State
  const [humorPref, setHumorPref] = useState<'general' | 'tamil' | null>(null);

  // General State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  const strength = calculatePasswordStrength(password);

  // Check username availability
  const checkUsernameUniqueness = async (name: string): Promise<boolean> => {
    const trimmed = name.trim();
    if (!trimmed) {
      setIsUsernameAvailable(null);
      return false;
    }

    setCheckingUsername(true);
    setError('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error: queryError } = await supabase
        .from('profiles')
        .select('id, display_name')
        .ilike('display_name', trimmed)
        .limit(1);

      if (queryError) {
        console.error('Error checking username:', queryError);
        setCheckingUsername(false);
        return false;
      }

      // If matches another user's profile
      const isTaken = data && data.length > 0 && (!user || data[0].id !== user.id);
      const available = !isTaken;
      setIsUsernameAvailable(available);

      if (!available) {
        setError('That username is already taken — try another');
      }

      setCheckingUsername(false);
      return available;
    } catch (err: unknown) {
      console.error('Check username error:', err);
      setCheckingUsername(false);
      return false;
    }
  };

  const handleStep1Next = async () => {
    const trimmed = username.trim();
    if (!trimmed) {
      setError('Please enter a username');
      return;
    }

    const available = await checkUsernameUniqueness(trimmed);
    if (!available) {
      return;
    }

    setError('');
    setDirection(1);
    setStep(2);
  };

  const handleStep2Next = async () => {
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      setDirection(1);
      setStep(3);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to update password';
      setError(message);
      setLoading(false);
    }
  };

  const handleStep3Finish = async () => {
    if (!humorPref) {
      setError('Please select a vibe');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        setError('User not found. Please log in again.');
        setLoading(false);
        return;
      }

      // Final Supabase update saving all onboarding information
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          display_name: username.trim(),
          humor_preference: humorPref,
          onboarding_complete: true,
        }, { onConflict: 'id' });

      if (profileError) {
        if (profileError.code === '23505') {
          setError('That username was just taken, try another');
          setStep(1);
          setDirection(-1);
        } else {
          setError(profileError.message);
        }
        setLoading(false);
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push('/');
        }, 1500);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to complete setup';
      setError(message);
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setError('');
      setDirection(-1);
      setStep((prev) => (prev - 1) as 1 | 2 | 3);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const }
    }
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
        {/* Top Header with Bugsy and Progress */}
        <div className="flex flex-col items-center mb-6 relative">
          <div className="absolute -top-14 -left-8 z-20">
            <Bugsy mood={success ? "laughing" : step === 3 ? "happy" : "idle"} size={64} />
          </div>

          <div className="flex items-center justify-between w-full px-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Step {step} of 3
            </span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === step
                      ? 'w-6 bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]'
                      : i < step
                      ? 'w-2 bg-emerald-500'
                      : 'w-2 bg-zinc-800'
                  }`}
                />
              ))}
            </div>
          </div>

          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 text-center">
            {step === 1 ? 'Choose Username' : step === 2 ? 'Set a Password' : 'Pick Your Vibe'}
          </h1>
          <p className="text-zinc-400 mt-1 text-xs text-center font-medium">
            {step === 1
              ? 'This is how other coders will see you in arenas'
              : step === 2
              ? 'Enables you to log in via username/email + password'
              : 'Choose the humor style that fits you best'}
          </p>
        </div>

        {/* Inline Error Message */}
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

        {/* Step Wizard Content */}
        <div className="relative overflow-hidden min-h-[220px]">
          <AnimatePresence mode="wait" custom={direction}>
            {step === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="space-y-4 pt-2"
              >
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider ml-1">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setIsUsernameAvailable(null);
                        setError('');
                      }}
                      onBlur={() => {
                        if (username.trim()) {
                          checkUsernameUniqueness(username);
                        }
                      }}
                      required
                      className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3.5 pr-11 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                    />
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center">
                      {checkingUsername ? (
                        <div className="w-5 h-5 border-2 border-indigo-400/30 border-t-indigo-400 rounded-full animate-spin" />
                      ) : isUsernameAvailable === true ? (
                        <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : isUsernameAvailable === false ? (
                        <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      ) : null}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="space-y-4 pt-1"
              >
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider ml-1">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  />
                  {password && (
                    <div className="pt-1">
                      <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                        <span>Strength</span>
                        <span className="font-semibold text-zinc-300">{strength.label}</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden flex gap-1">
                        <motion.div
                          className={`h-full rounded-full transition-all duration-300 ${
                            strength.score >= 1 ? strength.color : 'bg-transparent'
                          }`}
                          style={{ width: '33.3%' }}
                        />
                        <motion.div
                          className={`h-full rounded-full transition-all duration-300 ${
                            strength.score >= 2 ? strength.color : 'bg-transparent'
                          }`}
                          style={{ width: '33.3%' }}
                        />
                        <motion.div
                          className={`h-full rounded-full transition-all duration-300 ${
                            strength.score >= 3 ? strength.color : 'bg-transparent'
                          }`}
                          style={{ width: '33.3%' }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider ml-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="space-y-3 pt-1"
              >
                <button 
                  type="button"
                  onClick={() => { setHumorPref('general'); setError(''); }}
                  className={`p-4 rounded-xl border transition-all text-left flex items-center justify-between w-full ${humorPref === 'general' ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.2)]' : 'border-zinc-800 bg-zinc-950/50 text-zinc-400 hover:border-zinc-700'}`}
                >
                  <div>
                    <div className={`text-base font-bold mb-0.5 ${humorPref === 'general' ? 'text-indigo-400' : 'text-zinc-300'}`}>General Meme Sense</div>
                    <div className="text-xs opacity-70">Global Dev Memes & Tech Humor</div>
                  </div>
                  {humorPref === 'general' && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-4 h-4 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                  )}
                </button>
                <button 
                  type="button"
                  onClick={() => { setHumorPref('tamil'); setError(''); }}
                  className={`p-4 rounded-xl border transition-all text-left flex items-center justify-between w-full ${humorPref === 'tamil' ? 'border-purple-500 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.2)]' : 'border-zinc-800 bg-zinc-950/50 text-zinc-400 hover:border-zinc-700'}`}
                >
                  <div>
                    <div className={`text-base font-bold mb-0.5 ${humorPref === 'tamil' ? 'text-purple-400' : 'text-zinc-300'}`}>Tamil Comedy Sense</div>
                    <div className="text-xs opacity-70">Kollywood & Local References</div>
                  </div>
                  {humorPref === 'tamil' && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation Buttons */}
        <div className="flex items-center gap-3 pt-6">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1 || loading}
            className={`px-5 h-12 rounded-xl border border-zinc-800 text-sm font-semibold transition-all ${
              step === 1 ? 'opacity-40 cursor-not-allowed text-zinc-600' : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            Back
          </button>

          <motion.button
            type="button"
            onClick={step === 1 ? handleStep1Next : step === 2 ? handleStep2Next : handleStep3Finish}
            disabled={loading || checkingUsername}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold shadow-lg shadow-purple-500/20 disabled:opacity-70 flex items-center justify-center transition-all overflow-hidden"
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
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2"
                >
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Ready!</span>
                </motion.div>
              ) : (
                <motion.span
                  key="label"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  {step === 3 ? 'Finish' : 'Next'}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Celebratory particles on success */}
        <AnimatePresence>
          {success && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden rounded-3xl"
            >
              {CONFETTI_PARTICLES.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                  animate={{ 
                    x: p.x, 
                    y: p.y,
                    scale: p.scale,
                    opacity: 0,
                    rotate: p.rotate
                  }}
                  transition={{ duration: p.duration, ease: "easeOut" }}
                  className={`absolute w-3 h-3 rounded-sm ${p.color}`}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
