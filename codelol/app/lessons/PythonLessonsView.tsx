'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { pythonCurriculum } from '@/lib/python/curriculum';
import { Tier, Chapter, Lesson, HumorPreference } from '@/lib/python/types';

export function PythonLessonsView({ humorPref }: { humorPref: HumorPreference }) {
  const [activeTier, setActiveTier] = useState<Tier>('Beginner');
  const [learnedItems, setLearnedItems] = useState<Set<string>>(new Set());
  const supabase = createClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [localHumor, setLocalHumor] = useState<HumorPreference>(humorPref);

  useEffect(() => {
    setLocalHumor(humorPref);
  }, [humorPref]);

  useEffect(() => {
    async function loadLearned() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const { data, error } = await supabase
          .from('library_progress')
          .select('item_id')
          .eq('language', 'python')
          .eq('learned', true);
        
        if (!error && data) {
          setLearnedItems(new Set(data.map(d => d.item_id)));
        }
      } else {
        const stored = localStorage.getItem('python_learned_items');
        if (stored) {
          try {
            setLearnedItems(new Set(JSON.parse(stored)));
          } catch(e) {}
        }
      }
    }
    loadLearned();
  }, [supabase]);

  const toggleLearned = async (itemId: string) => {
    const nextLearned = new Set(learnedItems);
    let isLearned = false;
    if (nextLearned.has(itemId)) {
      nextLearned.delete(itemId);
    } else {
      nextLearned.add(itemId);
      isLearned = true;
    }
    setLearnedItems(nextLearned);

    if (userId) {
      await supabase
        .from('library_progress')
        .upsert({ user_id: userId, language: 'python', item_id: itemId, learned: isLearned, updated_at: new Date().toISOString() });
    } else {
      localStorage.setItem('python_learned_items', JSON.stringify(Array.from(nextLearned)));
    }
  };

  const filteredChapters = pythonCurriculum.filter(ch => ch.tier === activeTier);

  return (
    <div className="space-y-16">
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {(["Beginner", "Intermediate", "Advanced", "Expert", "Specialized"] as Tier[]).map((tier) => (
          <button
            key={tier}
            onClick={() => setActiveTier(tier)}
            className={`px-8 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 ${
              activeTier === tier 
                ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/25 scale-105'
                : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            {tier}
          </button>
        ))}
      </div>

      <div className="flex justify-center mb-12">
        <div className="bg-zinc-900 p-1 rounded-full inline-flex border border-zinc-800 shadow-inner">
          <button 
            onClick={() => setLocalHumor('general')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-colors ${localHumor === 'general' ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/25' : 'text-zinc-400 hover:text-white'}`}
          >
            English
          </button>
          <button 
            onClick={() => setLocalHumor('tamil')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-colors ${localHumor === 'tamil' ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/25' : 'text-zinc-400 hover:text-white'}`}
          >
            Tamil 🌶️
          </button>
        </div>
      </div>

      <div className="space-y-12">
        {filteredChapters.map(chapter => (
          <div key={chapter.id} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 overflow-hidden shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-pink-400">
                {chapter.title}
              </h2>
              <label className="flex items-center gap-3 cursor-pointer p-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 transition-colors border border-zinc-800">
                <input 
                  type="checkbox" 
                  checked={learnedItems.has(chapter.id)}
                  onChange={() => toggleLearned(chapter.id)}
                  className="w-5 h-5 rounded border-zinc-700 text-green-500 focus:ring-green-500 bg-zinc-900 cursor-pointer"
                />
                <span className={`font-medium ${learnedItems.has(chapter.id) ? 'text-green-400' : 'text-zinc-400'}`}>
                  {learnedItems.has(chapter.id) ? 'Chapter Learned ✓' : 'Mark Chapter Learned'}
                </span>
              </label>
            </div>
            
            <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 shadow-inner">
                <h4 className="text-zinc-400 font-bold uppercase text-xs mb-3">Technical Core</h4>
                <div className="flex flex-wrap gap-2">
                  {chapter.technicalCore.map(tc => (
                    <span key={tc} className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full">{tc}</span>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-950 p-6 rounded-xl border border-red-900/50 shadow-[0_0_15px_rgba(220,38,38,0.1)] space-y-4 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <h4 className="text-zinc-400 font-bold uppercase text-xs mb-1">Analogy</h4>
                  <p className="text-zinc-200">{localHumor === 'tamil' ? chapter.analogyTamil : chapter.analogyGeneral}</p>
                </div>
                <div className="relative z-10">
                  <h4 className="text-red-500 font-bold uppercase text-xs mb-1">Roast Corner 🔥</h4>
                  <p className="text-amber-200 italic">{localHumor === 'tamil' ? chapter.roastTamil : chapter.roastGeneral}</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-4">Lessons</h3>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {chapter.lessons.map(lesson => (
                <div key={lesson.id} className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-white">{lesson.title}</h4>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={learnedItems.has(lesson.id)}
                          onChange={() => toggleLearned(lesson.id)}
                          className="w-4 h-4 rounded border-zinc-700 text-green-500 focus:ring-green-500 bg-zinc-900 cursor-pointer"
                        />
                      </label>
                    </div>
                    <p className="text-zinc-400 text-sm mb-4">{lesson.explanation}</p>
                    <div className="bg-black p-3 rounded-lg border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto mb-4 shadow-inner">
                      <pre><code>{lesson.codeExample}</code></pre>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-zinc-800 flex justify-end">
                    <Link 
                      href={`/learn?language=python&level=${lesson.id}`}
                      className="bg-pink-600 hover:bg-pink-500 text-white font-bold py-2 px-6 rounded-full transition-transform hover:scale-105 active:scale-95 shadow-lg text-sm"
                    >
                      Practice this 🚀
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
