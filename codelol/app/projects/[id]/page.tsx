// agent-notes: { ctx: "Detail page for mini projects with verifier and code editor", deps: ["@/lib/projectVerifier", "@/components/CodeEditor"], state: active, last: "agent@2026-10-01" }
'use client'

import { useState, useEffect } from 'react';
import { checkRequirement, Requirement, VerificationResult } from '@/lib/projectVerifier';
import Editor from '@monaco-editor/react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

// Mocked project data with requirements
const projectsData: Record<string, { title: string, description: string, requirements: Requirement[], starterCode: string }> = {
  'virtual-pet-rock': {
    title: 'Virtual Pet Rock 🪨',
    description: 'It doesn\'t move. It doesn\'t eat. You just click a button to log that you "looked" at it. Ultimate low maintenance.',
    starterCode: `// Virtual Pet Rock
// 1. Create a div with id "rock"
// 2. Create a function "feedPet"

document.body.innerHTML = \`
  <div id="rock">🪨</div>
\`;
`,
    requirements: [
      { id: 'req-1', description: 'Create an element with id "rock"', check_type: 'dom_element_exists', check_code: '#rock' },
      { id: 'req-2', description: 'Define a feedPet function', check_type: 'function_exists', check_code: 'feedPet' }
    ]
  },
  'passive-aggressive-todo': {
    title: 'Passive-Aggressive To-Do List 📝',
    description: 'A to-do list that slowly turns red and starts insulting you the longer a task stays uncompleted.',
    starterCode: `// To-Do List
function addTodo() {}
`,
    requirements: [
      { id: 'req-1', description: 'Define addTodo function', check_type: 'function_exists', check_code: 'addTodo' }
    ]
  },
  'fashion-critic': {
    title: 'Brutal Fashion Critic 👗',
    description: 'A website that asks what you are wearing today and responds with randomized, passive-aggressive judgments about your choices.',
    starterCode: `function judge() { return "Terrible"; }`,
    requirements: [
      { id: 'req-1', description: 'Define judge function', check_type: 'function_exists', check_code: 'judge' }
    ]
  },
  'excuse-generator': {
    title: 'The Elite Excuse Generator 🗣️',
    description: 'Need to get out of a meeting? Build an app that generates random, highly specific, and questionable excuses on demand.',
    starterCode: `function generateExcuse() {}`,
    requirements: [
      { id: 'req-1', description: 'Define generateExcuse function', check_type: 'function_exists', check_code: 'generateExcuse' }
    ]
  },
  'pet-conspiracy': {
    title: 'Is My Cat Plotting Against Me? 🐈',
    description: 'A quiz app that takes yes/no inputs about your cat\'s recent behavior and definitively proves they are evil.',
    starterCode: `function analyzeCat() {}`,
    requirements: [
      { id: 'req-1', description: 'Define analyzeCat function', check_type: 'function_exists', check_code: 'analyzeCat' }
    ]
  }
};

export default function ProjectDetail() {
  const params = useParams();
  const projectId = params.id as string;
  const project = projectsData[projectId];

  const [code, setCode] = useState(project?.starterCode || '// Write your code here');
  const [results, setResults] = useState<Record<string, VerificationResult>>({});
  const [isVerifying, setIsVerifying] = useState(false);

  if (!project) {
    return <div className="p-12 text-center text-zinc-400">Project not found.</div>;
  }

  const handleVerify = async () => {
    setIsVerifying(true);
    const newResults: Record<string, VerificationResult> = {};
    for (const req of project.requirements) {
      newResults[req.id] = await checkRequirement(code, req);
    }
    setResults(newResults);
    setIsVerifying(false);
  };

  const completedCount = Object.values(results).filter(r => r.passed).length;
  const allPassed = completedCount === project.requirements.length && project.requirements.length > 0;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-zinc-950 text-zinc-50 font-sans p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-500">{project.title}</h1>
          <p className="text-zinc-400 mt-1">{project.description}</p>
        </div>
        <button 
          onClick={handleVerify}
          disabled={isVerifying}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-full transition-colors disabled:opacity-50"
        >
          {isVerifying ? 'Checking...' : 'Check My Work'}
        </button>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        <div className="flex-1 flex flex-col bg-black border border-zinc-800 rounded-2xl overflow-hidden">
          <div className="flex-1">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 16,
                padding: { top: 16 },
                scrollBeyondLastLine: false,
              }}
            />
          </div>
        </div>

        <div className="w-80 flex flex-col gap-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col">
            <h2 className="text-xl font-bold mb-4">Requirements</h2>
            
            <div className="w-full bg-zinc-800 h-2 rounded-full mb-6 overflow-hidden">
              <motion.div 
                className="h-full bg-green-500"
                initial={{ width: 0 }}
                animate={{ width: `${(completedCount / project.requirements.length) * 100}%` }}
              />
            </div>

            <div className="space-y-4">
              {project.requirements.map(req => {
                const res = results[req.id];
                const passed = res?.passed;
                return (
                  <div key={req.id} className={`p-4 rounded-xl border ${passed ? 'bg-green-500/10 border-green-500/30' : 'bg-zinc-800/50 border-zinc-700'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${passed ? 'bg-green-500 text-black' : 'bg-zinc-700 text-zinc-400'}`}>
                        {passed ? '✓' : ''}
                      </div>
                      <p className={`text-sm font-medium ${passed ? 'text-green-400' : 'text-zinc-300'}`}>{req.description}</p>
                    </div>
                    {res?.message && !passed && (
                      <p className="mt-2 text-xs text-red-400 font-mono bg-red-400/10 p-2 rounded">{res.message}</p>
                    )}
                  </div>
                );
              })}
            </div>
            
            {allPassed && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-4 bg-purple-500/20 border border-purple-500/50 rounded-xl text-center"
              >
                <p className="text-purple-300 font-bold mb-2">🎉 Project Complete!</p>
                <button className="bg-purple-500 hover:bg-purple-400 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors">
                  Submit Project
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
