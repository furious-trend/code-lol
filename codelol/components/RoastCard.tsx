import { RoastMood } from '@/lib/moodToGif';
import Editor from '@monaco-editor/react';

interface RoastCardProps {
  roast: string;
  fix: string;
  mood: RoastMood;
  gifUrl: string;
  onDismiss: () => void;
}

export function RoastCard({ roast, fix, gifUrl, onDismiss }: RoastCardProps) {
  return (
    <div className="flex flex-col border border-purple-500/30 rounded-xl overflow-hidden bg-purple-950/20 shadow-lg shadow-purple-500/10 flex-1 min-h-[150px] animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-purple-900/30 border-b border-purple-500/20 p-2 px-4 flex items-center justify-between shrink-0">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-400">🔥 Code Roast</span>
        <button onClick={onDismiss} className="text-xs text-purple-500 hover:text-purple-300 transition-colors">Dismiss</button>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
        {gifUrl && (
          <div className="w-full rounded-lg overflow-hidden border border-purple-500/20 bg-purple-950/40 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={gifUrl} alt="Reaction GIF" className="w-full h-auto object-contain max-h-[300px]" />
          </div>
        )}
        
        <div className="text-purple-100 text-lg font-medium leading-relaxed italic">
          &quot;{roast}&quot;
        </div>
        
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
