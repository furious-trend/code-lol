import { RoastMood } from '@/lib/moodToGif';
import Editor from '@monaco-editor/react';
import { Bugsy } from './Bugsy';
import { motion } from 'framer-motion';

interface RoastCardProps {
  roast: string;
  fix: string;
  mood: RoastMood;
  gifUrl: string;
  output?: string;
  onDismiss: () => void;
  onReplayAudio?: () => void;
}

export function RoastCard({ roast, fix, gifUrl, output, onDismiss, onReplayAudio }: RoastCardProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Bugsy Avatar */}
      <div className="hidden sm:flex flex-col items-center gap-2 pt-4">
        <Bugsy size={80} mood={gifUrl ? 'laughing' : 'thinking'} />
      </div>

      {/* Speech Bubble Card */}
      <div className="relative flex flex-col border-2 border-amber-500/50 rounded-2xl overflow-hidden bg-zinc-900/90 shadow-[4px_4px_0px_0px_rgba(245,158,11,0.3)] flex-1 min-h-[150px] -rotate-1 hover:rotate-0 transition-transform duration-300 w-full">
        
        {/* Speech Bubble Tail (Desktop) */}
        <div className="absolute hidden sm:block top-8 -left-3 w-4 h-4 bg-zinc-900 border-l-2 border-t-2 border-amber-500/50 -rotate-45" />

        <div className="bg-amber-950/30 border-b-2 border-amber-500/20 p-2 px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="sm:hidden"><Bugsy size={24} mood="laughing" /></span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {(!fix && !gifUrl) ? '✅ Bugsy Says...' : '🔥 Roast Time!'}
            </span>
          </div>
          <div className="flex gap-4">
            {onReplayAudio && (
              <button onClick={onReplayAudio} className="text-xs text-amber-400 hover:text-amber-200 transition-colors flex items-center gap-1">
                🔊 Replay
              </button>
            )}
            <button onClick={onDismiss} className="text-xs text-amber-500 hover:text-amber-300 transition-colors font-bold">Dismiss</button>
          </div>
        </div>
        
        <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-5">
          {roast && (
            <p className="text-xl font-bold text-white leading-relaxed text-center">
              &quot;{roast}&quot;
            </p>
          )}
          
          {gifUrl && (
            <div className="w-full rounded-xl overflow-hidden border-2 border-amber-500/20 bg-zinc-950 flex justify-center">
              <motion.img 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={gifUrl} 
                alt="Reaction GIF" 
                className="w-full h-auto object-contain max-h-[300px]" 
              />
            </div>
          )}
          
          {output && (
            <div className="mt-2 p-3 bg-black border-2 border-amber-500/20 rounded-xl overflow-x-auto">
              <span className="text-[10px] text-amber-400 font-mono uppercase block mb-1">Execution Output</span>
              <pre className="text-sm text-zinc-300 font-mono whitespace-pre-wrap">{output}</pre>
            </div>
          )}
          
          {fix && (
            <details className="mt-2 group">
              <summary className="text-sm text-amber-400 font-bold cursor-pointer hover:text-amber-300 mb-2 list-none flex items-center gap-2 bg-amber-500/10 p-2 rounded-lg inline-flex">
                <span className="group-open:rotate-90 transition-transform text-xs">▶</span>
                SEE THE FIX
              </summary>
              <div className="border-2 border-amber-500/20 rounded-xl overflow-hidden h-48 bg-zinc-950">
                <Editor
                  height="100%"
                  language="javascript"
                  theme="vs-dark"
                  value={fix}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 13,
                    fontFamily: 'var(--font-geist-mono), monospace',
                    padding: { top: 12, bottom: 12 },
                    scrollBeyondLastLine: false,
                    roundedSelection: false,
                  }}
                />
              </div>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}
