// agent-notes: { ctx: "Hero terminal preview demonstrating code execution with AI roasts and meme reactions", deps: ["framer-motion", "@/components/Bugsy"], state: "active", last: "sato@2026-10-31" }
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bugsy } from './Bugsy';

interface CodeSnippet {
  lang: string;
  code: string;
  output: string;
  roastEnglish: string;
  roastTamil: string;
}

const SNIPPETS: CodeSnippet[] = [
  {
    lang: 'Python 🐍',
    code: 'result = "42" + 8\nprint(result)',
    output: 'TypeError: can only concatenate str to str, not int',
    roastEnglish: "Python doesn't do sloppy implicit coercion. Cast your types explicitly!",
    roastTamil: "String-aiyum integer-aiyum direct-ah koota paakura? Type cast pannu thala!"
  },
  {
    lang: 'C ⚡',
    code: 'int *ptr = NULL;\n*ptr = 100;',
    output: 'Segmentation fault (core dumped)',
    roastEnglish: "You touched OS kernel memory and got politely kicked out to desktop.",
    roastTamil: "Memory boundary-ah thaandi pakkaathu veetu bedroom kulla kaiya vitta OS thurathidum!"
  },
  {
    lang: 'JavaScript 🟨',
    code: 'console.log([] + {});\nconsole.log({} + []);',
    output: '[object Object]\n0',
    roastEnglish: "JavaScript type coercion: where math goes to rethink its life choices.",
    roastTamil: "Array-aiyum Object-aiyum add panna idhu dhaan nadakkum... JS logic-ae vera level!"
  }
];

export function HeroTerminalPreview() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [humorMode, setHumorMode] = useState<'english' | 'tamil'>('tamil');
  const snippet = SNIPPETS[activeIdx];

  return (
    <div className="w-full max-w-2xl mx-auto rounded-3xl bg-zinc-950/90 border border-zinc-800/90 shadow-2xl shadow-purple-950/30 overflow-hidden backdrop-blur-xl group hover:border-zinc-700 transition-all text-left">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/80 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="text-xs font-mono text-zinc-400 ml-2">codelol_sandbox.sh</span>
        </div>

        {/* Language Tabs */}
        <div className="flex items-center gap-1">
          {SNIPPETS.map((s, idx) => (
            <button
              key={s.lang}
              onClick={() => setActiveIdx(idx)}
              type="button"
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeIdx === idx
                  ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/40'
              }`}
            >
              {s.lang.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-5 font-mono text-xs sm:text-sm">
        <div className="text-zinc-400 mb-1">// 1. Write buggy code:</div>
        <pre className="text-pink-400 bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/60 overflow-x-auto">
          <code>{snippet.code}</code>
        </pre>

        <div className="mt-3 text-red-400/90 flex items-center gap-1.5 font-bold">
          <span className="animate-pulse">❌</span> Output: {snippet.output}
        </div>

        {/* Bugsy AI Roast Reaction Box */}
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-pink-950/30 to-amber-950/20 border border-purple-500/30 flex items-start gap-3.5">
          <div className="shrink-0 pt-0.5">
            <Bugsy size={36} mood="laughing" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-purple-400">
                Bugsy AI Roast 🔥
              </span>
              <button
                onClick={() => setHumorMode(humorMode === 'english' ? 'tamil' : 'english')}
                type="button"
                className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-900 border border-purple-500/40 text-purple-300 font-bold hover:bg-purple-950 transition-colors"
              >
                {humorMode === 'english' ? 'Switch to Tamil 🎭' : 'Switch to English 🌐'}
              </button>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={`${snippet.lang}-${humorMode}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="text-xs sm:text-sm text-zinc-200 italic font-sans font-medium"
              >
                &quot;{humorMode === 'english' ? snippet.roastEnglish : snippet.roastTamil}&quot;
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

