"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import debounce from "lodash.debounce";

type HumorPref = 'general' | 'tamil';

type Toast = { type: 'success' | 'error'; msg: string } | null;

interface ProfileData {
  display_name?: string | null;
  humor_preference?: string | null;
  learning_language?: string | null;
}

interface SettingsPageClientProps {
  initialProfile: ProfileData;
  userId: string;
}

export default function SettingsPageClient({ initialProfile, userId }: SettingsPageClientProps) {
  const [displayName, setDisplayName] = useState(initialProfile.display_name ?? '');
  
  const initialHumorPref = (initialProfile.humor_preference === 'tamil' || initialProfile.humor_preference === 'general') 
    ? initialProfile.humor_preference as HumorPref 
    : 'general';
    
  const [humorPref, setHumorPref] = useState<HumorPref>(initialHumorPref);
  const [langPref, setLangPref] = useState<'javascript' | 'python' | 'c' | 'cpp' | 'java'>(
    (initialProfile.learning_language as 'javascript' | 'python' | 'c' | 'cpp' | 'java') || 'javascript'
  );
  
  const [soundMuted, setSoundMuted] = useState(false);
  const [soundVolume, setSoundVolume] = useState(1.0);
  
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const [usernameError, setUsernameError] = useState<string>('');

  useEffect(() => {
    // Read local audio settings
    const storedMuted = localStorage.getItem('sound_muted');
    if (storedMuted !== null) setSoundMuted(storedMuted === 'true');
    
    const storedVolume = localStorage.getItem('sound_volume');
    if (storedVolume !== null) setSoundVolume(parseFloat(storedVolume));

    // If local guest, try to read profile from localStorage
    if (userId === 'local-guest') {
      const storedHumor = localStorage.getItem('guest_humor');
      if (storedHumor === 'tamil' || storedHumor === 'general') setHumorPref(storedHumor);
      
      const storedLang = localStorage.getItem('guest_lang');
      if (storedLang === 'python' || storedLang === 'javascript' || storedLang === 'c' || storedLang === 'cpp' || storedLang === 'java') {
        setLangPref(storedLang as any);
      }

      const storedName = localStorage.getItem('guest_name');
      if (storedName) setDisplayName(storedName);
    }
  }, [userId]);

  const checkUsername = async (name: string, uid: string) => {
    if (!name.trim()) {
      setUsernameError('');
      return;
    }
    const supabase = createClient();
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('id')
      .ilike('display_name', name.trim())
      .limit(1);

    const isTaken = existingUser && existingUser.length > 0 && existingUser[0].id !== uid;
    if (isTaken) {
      setUsernameError('Username is already taken');
    } else {
      setUsernameError('');
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedCheckUsername = useCallback(
    // eslint-disable-next-line react-hooks/use-memo
    debounce((name: string, uid: string) => checkUsername(name, uid), 500),
    []
  );

  const handleUsernameChange = (val: string) => {
    setDisplayName(val);
    if (userId) debouncedCheckUsername(val, userId);
  };

  // ── Save all changes to Supabase ───────────────────────────────────────────
  const saveSettings = async () => {
    if (!userId) return;
    setIsSaving(true);
    setToast(null);

    const supabase = createClient();
    const trimmedName = displayName.trim();

    if (!trimmedName) {
      setToast({ type: 'error', msg: 'Username cannot be empty' });
      setIsSaving(false);
      return;
    }

    if (userId === 'local-guest') {
      // Just save local settings
      localStorage.setItem('sound_muted', String(soundMuted));
      localStorage.setItem('sound_volume', String(soundVolume));
      localStorage.setItem('guest_humor', humorPref);
      localStorage.setItem('guest_lang', langPref);
      localStorage.setItem('guest_name', trimmedName);
      setToast({ type: 'success', msg: 'Local settings saved! (Profile partially stored for guest)' });
      setIsSaving(false);
      setTimeout(() => setToast(null), 4000);
      return;
    }

    // Check if username is already taken by someone else
    const { data: existingUser, error: checkError } = await supabase
      .from('profiles')
      .select('id')
      .ilike('display_name', trimmedName)
      .limit(1);

    if (checkError) {
      setToast({ type: 'error', msg: 'Error checking username availability' });
      setIsSaving(false);
      return;
    }

    const isTaken = existingUser && existingUser.length > 0 && existingUser[0].id !== userId;
    if (isTaken) {
      setToast({ type: 'error', msg: 'That username is already taken — try another' });
      setIsSaving(false);
      return;
    }

    // Always update profile (display_name + humor_preference + learning_language together)
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ display_name: trimmedName, humor_preference: humorPref, learning_language: langPref })
      .eq('id', userId);

    if (profileError) {
      if (profileError.code === '23505') {
        setToast({ type: 'error', msg: 'That username is already taken — try another' });
      } else {
        setToast({ type: 'error', msg: profileError.message });
      }
      setIsSaving(false);
      return;
    }

    // Save audio settings to local storage
    localStorage.setItem('sound_muted', String(soundMuted));
    localStorage.setItem('sound_volume', String(soundVolume));

    setToast({ type: 'success', msg: 'Settings saved successfully!' });
    setIsSaving(false);
    setTimeout(() => setToast(null), 4000);
  };

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
          {/* ── Account Details ──────────────────────────────────────── */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-zinc-300">Account Details</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="settings-username" className="block text-sm text-zinc-500 mb-1">
                  Username
                </label>
                <input
                  id="settings-username"
                  type="text"
                  value={displayName}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                  className={`w-full bg-zinc-950/50 border rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${usernameError ? 'border-red-500' : 'border-zinc-800'}`}
                />
                {usernameError && (
                  <p className="text-red-500 text-xs mt-1">{usernameError}</p>
                )}
              </div>
            </div>
          </section>

          {/* ── Humor Preference ─────────────────────────────────────── */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-zinc-300">Humor Preference</h2>
            <p className="text-sm text-zinc-500 mb-4">Choose your meme flavor for victories and defeats.</p>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setHumorPref('general')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  humorPref === 'general'
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-zinc-800 bg-zinc-950/50 hover:border-zinc-700'
                }`}
              >
                <div className="font-semibold mb-1">General Meme Sense</div>
                <div className="text-sm text-zinc-500">Global Dev Memes, StackOverflow</div>
              </button>
              <button
                onClick={() => setHumorPref('tamil')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  humorPref === 'tamil'
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : 'border-zinc-800 bg-zinc-950/50 hover:border-zinc-700'
                }`}
              >
                <div className="font-semibold mb-1">Tamil Comedy Sense</div>
                <div className="text-sm text-zinc-500">Vadivelu, Goundamani, Kollywood</div>
              </button>
            </div>
            
            <div className="mt-4 p-4 rounded-xl border border-zinc-800/50 bg-zinc-950/80">
              <h3 className="text-sm font-semibold text-zinc-400 mb-2">Live Meme Preview</h3>
              <AnimatePresence mode="wait">
                <motion.div
                  key={humorPref}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-zinc-300 italic"
                  data-testid="meme-preview"
                >
                  {humorPref === 'general' ? 
                    '"Coffee Overdose: My code works, I have no idea why." - General Dev Humor' : 
                    '"Vadivelu Counters: Enna da idhu, code ah idhu?" - Tamil Tech Trolls'
                  }
                </motion.div>
              </AnimatePresence>
            </div>
          </section>

          {/* ── Language Preference ─────────────────────────────────────── */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-zinc-300">Learning Language</h2>
            <p className="text-sm text-zinc-500 mb-4">Choose the primary language you want to learn and battle in.</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <button
                onClick={() => setLangPref('javascript')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  langPref === 'javascript'
                    ? 'border-yellow-500 bg-yellow-500/10'
                    : 'border-zinc-800 bg-zinc-950/50 hover:border-zinc-700'
                }`}
              >
                <div className="font-semibold mb-1">JavaScript</div>
                <div className="text-sm text-zinc-500">The language of the web</div>
              </button>
              <button
                onClick={() => setLangPref('python')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  langPref === 'python'
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-zinc-800 bg-zinc-950/50 hover:border-zinc-700'
                }`}
              >
                <div className="font-semibold mb-1">Python</div>
                <div className="text-sm text-zinc-500">Data, AI, and simplicity</div>
              </button>
              <button
                onClick={() => setLangPref('c')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  langPref === 'c'
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-zinc-800 bg-zinc-950/50 hover:border-zinc-700'
                }`}
              >
                <div className="font-semibold mb-1">C</div>
                <div className="text-sm text-zinc-500">Memory & Systems</div>
              </button>
              <button
                onClick={() => setLangPref('cpp')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  langPref === 'cpp'
                    ? 'border-cyan-500 bg-cyan-500/10'
                    : 'border-zinc-800 bg-zinc-950/50 hover:border-zinc-700'
                }`}
              >
                <div className="font-semibold mb-1">C++</div>
                <div className="text-sm text-zinc-500">Games & Performance</div>
              </button>
              <button
                onClick={() => setLangPref('java')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  langPref === 'java'
                    ? 'border-red-500 bg-red-500/10'
                    : 'border-zinc-800 bg-zinc-950/50 hover:border-zinc-700'
                }`}
              >
                <div className="font-semibold mb-1">Java</div>
                <div className="text-sm text-zinc-500">Enterprise & Android</div>
              </button>
            </div>
          </section>

          {/* ── Audio Settings ─────────────────────────────────────── */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-zinc-300">Audio Settings</h2>
            <p className="text-sm text-zinc-500 mb-4">Control the volume of memes and celebrations.</p>

            <div className="space-y-4 p-4 rounded-xl border border-zinc-800/50 bg-zinc-950/80">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">Mute Sound</div>
                  <div className="text-sm text-zinc-500">Disable all meme and celebration sounds</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={soundMuted} onChange={(e) => setSoundMuted(e.target.checked)} />
                  <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>

              {!soundMuted && (
                <div>
                  <div className="flex justify-between mb-2 mt-4">
                    <label htmlFor="volume-slider" className="text-sm font-semibold text-zinc-300">Volume</label>
                    <span className="text-sm text-zinc-400">{Math.round(soundVolume * 100)}%</span>
                  </div>
                  <input 
                    id="volume-slider" 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.05" 
                    value={soundVolume}
                    onChange={(e) => setSoundVolume(parseFloat(e.target.value))}
                    className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-emerald-500" 
                  />
                </div>
              )}
            </div>
          </section>

          {/* ── Save Button ──────────────────────────────────────────── */}
          <div className="pt-6 border-t border-zinc-800/50 flex justify-end">
            <motion.button
              whileHover={isSaving ? {} : { scale: 1.05 }}
              whileTap={isSaving ? {} : { scale: 0.95 }}
              onClick={saveSettings}
              disabled={isSaving}
              className="bg-white text-black font-semibold px-6 py-3 rounded-xl shadow-lg shadow-white/10 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
            >
              {isSaving ? 'Saving…' : 'Save Changes'}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* ── Toast Notification ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: toast ? 1 : 0, y: toast ? 0 : 50 }}
        className={`fixed bottom-8 right-8 px-6 py-3 rounded-xl shadow-lg font-medium text-white ${
          toast?.type === 'error' ? 'bg-red-500' : 'bg-emerald-500'
        }`}
        role="status"
        aria-live="polite"
      >
        {toast?.msg ?? ''}
      </motion.div>
    </div>
  );
}
