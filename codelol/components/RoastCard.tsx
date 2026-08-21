import { RoastMood } from '@/lib/moodToGif';
import Editor from '@monaco-editor/react';

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
    <div className="flex flex-col border border-purple-500/30 rounded-xl overflow-hidden bg-purple-950/20 shadow-lg shadow-purple-500/10 flex-1 min-h-[150px] animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-purple-900/30 border-b border-purple-500/20 p-2 px-4 flex items-center justify-between shrink-0">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
          {(!fix && !gifUrl) ? '✅ Execution Result' : '💡 Code Feedback'}
        </span>
        <div className="flex gap-4">
          {onReplayAudio && (
            <button onClick={onReplayAudio} className="text-xs text-purple-400 hover:text-purple-200 transition-colors flex items-center gap-1">
              🔊 Replay Audio
            </button>
          )}
          <button onClick={onDismiss} className="text-xs text-purple-500 hover:text-purple-300 transition-colors">Dismiss</button>
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
        {roast && (
          <p className="text-lg font-bold text-white italic text-center">
            &quot;{roast}&quot;
          </p>
        )}
        
        {gifUrl && (
          <div className="w-full rounded-lg overflow-hidden border border-purple-500/20 bg-purple-950/40 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={gifUrl} alt="Reaction GIF" className="w-full h-auto object-contain max-h-[300px]" />
          </div>
        )}
        
        {output && (
          <div className="mt-2 p-3 bg-black/50 border border-purple-500/20 rounded-lg overflow-x-auto">
            <span className="text-[10px] text-purple-400 font-mono uppercase block mb-1">Execution Output</span>
            <pre className="text-sm text-zinc-300 font-mono whitespace-pre-wrap">{output}</pre>
          </div>
        )}
        
        {fix && (
          <details className="mt-2 group">
            <summary className="text-sm text-purple-400 font-bold cursor-pointer hover:text-purple-300 mb-2 list-none flex items-center gap-2">
              <span className="group-open:rotate-90 transition-transform text-xs">▶</span>
              THE FIX
            </summary>
            <div className="border border-purple-500/20 rounded-lg overflow-hidden h-40">
              <Editor
                height="100%"
                language="javascript"
                theme="vs-dark"
                value={fix}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 12,
                  fontFamily: 'var(--font-geist-mono), monospace',
                  padding: { top: 8, bottom: 8 },
                  scrollBeyondLastLine: false,
                  roundedSelection: false,
                }}
              />
            </div>
          </details>
        )}
      </div>
    </div>
  );
}
