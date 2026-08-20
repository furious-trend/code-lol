'use client'

import { useState } from 'react';
import Link from 'next/link';

type Project = {
  id: string;
  title: string;
  description: string;
  concepts: string;
  color: string;
};

const projects: Project[] = [
  {
    id: 'excuse-generator',
    title: 'The Elite Excuse Generator 🗣️',
    description: 'Need to get out of a meeting? Build an app that generates random, highly specific, and questionable excuses on demand.',
    concepts: 'Arrays, String Concatenation, Functions',
    color: 'from-orange-500 to-amber-500'
  },
  {
    id: 'fashion-critic',
    title: 'Brutal Fashion Critic 👗',
    description: 'A website that asks what you are wearing today and responds with randomized, passive-aggressive judgments about your choices.',
    concepts: 'Conditionals (If/Else), Math.random(), React State',
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'passive-aggressive-todo',
    title: 'Passive-Aggressive To-Do List 📝',
    description: 'A to-do list that slowly turns red and starts insulting you the longer a task stays uncompleted.',
    concepts: 'State Management, Timers/Intervals, CSS Dynamic Classes',
    color: 'from-red-500 to-red-700'
  },
  {
    id: 'virtual-pet-rock',
    title: 'Virtual Pet Rock 🪨',
    description: 'It doesn\'t move. It doesn\'t eat. You just click a button to log that you "looked" at it. Ultimate low maintenance.',
    concepts: 'Button Click Events, Simple State Updates',
    color: 'from-slate-500 to-zinc-600'
  },
  {
    id: 'pet-conspiracy',
    title: 'Is My Cat Plotting Against Me? 🐈',
    description: 'A quiz app that takes yes/no inputs about your cat\'s recent behavior and definitively proves they are evil.',
    concepts: 'Forms, Boolean Logic, Accumulators',
    color: 'from-indigo-500 to-purple-600'
  }
];

import { useRoast } from '@/hooks/useRoast';
import { RoastCard } from '@/components/RoastCard';
import { useMemeSound } from '@/hooks/useMemeSound';

function ProjectCard({ project }: { project: Project }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isRoasting, roastStatus, roastData, roastError, handleRoast, clearRoast } = useRoast();
  const { playMemeSound } = useMemeSound();

  const handleExpand = async () => {
    if (isExpanded) {
      setIsExpanded(false);
      return;
    }
    
    setIsExpanded(true);
    
    // Cache check
    if (roastData || isRoasting) return;

    // Crafting a pseudo-code string to roast the project idea itself
    const pseudoCode = `// Project Idea: ${project.title}\n// ${project.description}\n// Concepts: ${project.concepts}\n// TODO: Actually write the code.`;
    await handleRoast(pseudoCode);
    playMemeSound(false);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 flex flex-col relative overflow-hidden group shadow-lg transition-transform hover:-translate-y-1">
      <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${project.color}`}></div>
      
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div className="flex-1 pl-4 cursor-pointer" onClick={handleExpand}>
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-bold group-hover:text-purple-400 transition-colors">{project.title}</h2>
            <span className="text-zinc-500 bg-zinc-800 rounded-full w-8 h-8 flex items-center justify-center shrink-0 ml-4 group-hover:bg-purple-500 group-hover:text-white transition-colors">
              {isExpanded ? '▲' : '▼'}
            </span>
          </div>
          
          <p className="text-zinc-300 leading-relaxed mb-4">
            {project.description}
          </p>
          <div className="inline-flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-full px-4 py-2 text-sm">
            <span className="font-bold text-zinc-500 uppercase tracking-wider text-xs">Teaches:</span>
            <span className="text-zinc-300 font-mono">{project.concepts}</span>
          </div>
        </div>

        <div className="w-full md:w-auto shrink-0 flex items-center justify-center pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-zinc-800 md:pl-6 pl-4">
          <Link href={`/playground`} className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-6 rounded-full transition-colors whitespace-nowrap text-sm border border-zinc-700">
            Build in Playground
          </Link>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-zinc-800 pl-4 animate-in fade-in slide-in-from-top-4 duration-500">
          {isRoasting && (
            <div className="flex items-center gap-6">
              <div className="w-32 h-32 bg-zinc-800 rounded-xl animate-pulse shrink-0 flex items-center justify-center">
                <span className="text-3xl">🔥</span>
              </div>
              <div className="text-purple-400 font-bold animate-pulse tracking-widest">
                {roastStatus}
              </div>
            </div>
          )}
          
          {roastError && (
            <div className="text-red-400 text-sm">{roastError}</div>
          )}
          
          {roastData && !isRoasting && (
             <RoastCard 
               roast={roastData.roast}
               fix={roastData.fix}
               mood={roastData.mood}
               gifUrl={roastData.gifUrl}
               onDismiss={() => { setIsExpanded(false); clearRoast(); }}
               onReplayAudio={() => playMemeSound(false)}
             />
          )}
        </div>
      )}
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] p-6 md:p-12 gap-12 bg-zinc-950 text-zinc-50 font-sans">
      
      <section className="flex flex-col items-center justify-center text-center mt-8 gap-4">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-pink-500">
          Silly Projects
        </h1>
        <p className="text-xl text-zinc-400 font-medium max-w-2xl">
          The best way to learn is by building things you actually want to show your friends. Here are some terrible ideas to get you started!
        </p>
      </section>

      <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 mb-16">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      
    </div>
  );
}
