"use client";

/**
 * agent-notes: { ctx: "Settings page — fully wired to Supabase", deps: ["lib/supabase/client.ts"], state: active, last: "sato@2026-08-27" }
 */

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

type HumorPref = 'general' | 'tamil';

type Toast = { type: 'success' | 'error'; msg: string } | null;

export default function Settings() {
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [humorPref, setHumorPref] = useState<HumorPref>('general');
  const [isPasswordUser, setIsPasswordUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // ── Load real profile on mount ──────────────────────────────────────────────
  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setIsLoading(false); return; }

      setUserId(user.id);
      // Check if user has an email/password identity (vs OAuth-only)
      const hasEmailIdentity = user.identities?.some(
        (id: { provider: string }) => id.provider === 'email'
      ) ?? false;
      setIsPasswordUser(hasEmailIdentity);

      const { data: profile } = await supabase
        .from('profiles')
        .select('display_name, humor_preference')
        .eq('id', user.id)
        .single();

      if (profile) {
        setDisplayName(profile.display_name ?? '');
        if (profile.humor_preference === 'tamil' || profile.humor_preference === 'general') {
          setHumorPref(profile.humor_preference);
        }
      }
      setIsLoading(false);
    }
    loadProfile();
  }, []);

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

    // Always update profile (display_name + humor_preference together)
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ display_name: trimmedName, humor_preference: humorPref })
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

    // Update password only if field is non-empty and user has email identity
    if (password && isPasswordUser) {
      const { error: pwError } = await supabase.auth.updateUser({ password });
      if (pwError) {
        setToast({ type: 'error', msg: pwError.message });
        setIsSaving(false);
        return;
      }
    }

    setToast({ type: 'success', msg: 'Settings saved successfully!' });
    setPassword(''); // clear password field after save
    setIsSaving(false);
    setTimeout(() => setToast(null), 4000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-400">
        Loading profile…
      </div>
    );
  }

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
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Password — only shown for email/password accounts */}
              {isPasswordUser ? (
                <div>
                  <label htmlFor="settings-password" className="block text-sm text-zinc-500 mb-1">
                    Update Password
                  </label>
                  <input
                    id="settings-password"
                    type="password"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              ) : (
                <p className="text-sm text-zinc-600 italic">
                  Password change is not available for Google sign-in accounts.
                </p>
              )}
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
