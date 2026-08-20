'use client'

import { useState } from 'react';
import { quizzes, QuizQuestion } from '@/lib/quizzes';
import { createClient } from '@/lib/supabase/client';
import { useMemeSound } from '@/hooks/useMemeSound';

export default function QuizPage() {
  const [topic, setTopic] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const supabase = createClient();

  const handleStart = (selectedTopic: string) => {
    setTopic(selectedTopic);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setGifUrl(null);
    setIsFinished(false);
    setScore(0);
  };

  const currentQuiz = topic ? quizzes[topic] : [];
  const currentQuestion = currentQuiz[currentQuestionIndex];

  const { playMemeSound } = useMemeSound();

  const handleOptionClick = async (index: number) => {
    if (isAnswered) return;
    
    setSelectedOption(index);
    setIsAnswered(true);
    
    const isCorrect = index === currentQuestion.correctIndex;
    if (isCorrect) setScore(s => s + 1);

    const tamilFailKeywords = [
      'vadivelu facepalm',
      'santhanam crying',
      'goundamani comedy',
      'vivek comedy',
      'tamil actor fail',
      'vadivelu crying',
      'vadivelu nesamani'
    ];

    const keyword = isCorrect 
      ? 'tamil comedy success' 
      : tamilFailKeywords[Math.floor(Math.random() * tamilFailKeywords.length)];
      
    // Play the sound immediately
    playMemeSound(isCorrect);
    try {
      const res = await fetch(`/api/gif?keyword=${encodeURIComponent(keyword)}`);
      const data = await res.json();
      if (res.ok && data.url) {
        setGifUrl(data.url);
      } else {
        setGifUrl('error');
      }
    } catch (e) {
      console.error('Failed to fetch GIF');
      setGifUrl('error');
    }
  };

  const handleNext = async () => {
    if (currentQuestionIndex < currentQuiz.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setGifUrl(null);
    } else {
      setIsFinished(true);
      await completeQuiz();
    }
  };

  const completeQuiz = async () => {
    setIsSaving(true);
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      let currentLevels = 0;
      let currentStreak = 0;

      if (user && !authError) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('levels_completed, current_streak')
          .eq('id', user.id)
          .single();

        currentLevels = profile?.levels_completed || 0;
        currentStreak = profile?.current_streak || 0;

        const { error: upsertError } = await supabase.from('profiles').upsert({
          id: user.id,
          levels_completed: currentLevels + 1,
          current_streak: currentStreak + 1,
        });

        if (upsertError) {
          console.error('Error saving to Supabase:', upsertError.message || JSON.stringify(upsertError) || upsertError);
        }
      } else {
        const local = JSON.parse(localStorage.getItem('userProfile') || '{"levels_completed":0,"current_streak":0}');
        currentLevels = local.levels_completed || 0;
        currentStreak = local.current_streak || 0;
      }

      // Always update local storage as a fallback
      localStorage.setItem('userProfile', JSON.stringify({
        levels_completed: currentLevels + 1,
        current_streak: currentStreak + 1
      }));

    } catch (err: any) {
      console.error('Unexpected error saving progress:', err.message || err);
    } finally {
      setIsSaving(false);
    }
  };

  if (!topic) {
    const topicMeta: Record<string, { icon: string, color: string }> = {
      variables: { icon: '📦', color: 'hover:border-purple-500' },
      loops: { icon: '🔁', color: 'hover:border-pink-500' },
      arrays: { icon: '📚', color: 'hover:border-blue-500' },
      functions: { icon: '⚙️', color: 'hover:border-green-500' },
      conditionals: { icon: '🔀', color: 'hover:border-yellow-500' },
      objects: { icon: '🏗️', color: 'hover:border-orange-500' },
      dom: { icon: '🌐', color: 'hover:border-teal-500' },
      promises: { icon: '🤝', color: 'hover:border-indigo-500' },
      events: { icon: '⚡', color: 'hover:border-red-500' },
      classes: { icon: '🏛️', color: 'hover:border-cyan-500' },
    };

    return (
      <div className="flex flex-col min-h-[calc(100vh-4rem)] p-6 items-center justify-center gap-8 bg-zinc-950 text-zinc-50 font-sans">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Quiz Zone</h1>
          <p className="text-zinc-400 text-lg">Select a topic to test your knowledge.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl">
          {Object.keys(quizzes).map((quizTopic) => {
            const meta = topicMeta[quizTopic] || { icon: '📝', color: 'hover:border-gray-500' };
            return (
              <button 
                key={quizTopic}
                onClick={() => handleStart(quizTopic)}
                className={`bg-zinc-900 border border-zinc-800 ${meta.color} rounded-2xl p-8 transition-all hover:scale-105 shadow-lg flex flex-col items-center gap-4 w-48 sm:w-64`}
              >
                <span className="text-6xl">{meta.icon}</span>
                <span className="text-xl font-bold capitalize">{quizTopic}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex flex-col min-h-[calc(100vh-4rem)] p-6 items-center justify-center gap-8 bg-zinc-950 text-zinc-50 font-sans">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-md w-full text-center shadow-xl">
          <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Quiz Complete!</h2>
          <div className="text-6xl mb-6">{score >= 4 ? '🏆' : '😅'}</div>
          <p className="text-2xl font-medium mb-2">You scored {score} / {currentQuiz.length}</p>
          <p className="text-zinc-400 mb-8">
            {score === 5 ? "Perfect score! You're a coding wizard." : "Keep practicing, you'll get it next time!"}
          </p>
          {isSaving ? (
            <p className="text-zinc-500 animate-pulse">Saving your progress...</p>
          ) : (
            <button 
              onClick={() => setTopic(null)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full transition-colors w-full"
            >
              Back to Topics
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] p-4 md:p-8 items-center bg-zinc-950 text-zinc-50 font-sans">
      
      <div className="w-full max-w-2xl mb-8 flex justify-between items-center">
        <span className="text-zinc-400 font-bold uppercase tracking-wider text-sm">
          Topic: <span className="text-white capitalize">{topic}</span>
        </span>
        <span className="text-zinc-400 font-bold text-sm">
          Question {currentQuestionIndex + 1} of {currentQuiz.length}
        </span>
      </div>

      <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-10 shadow-xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-tight">
          {currentQuestion.question}
        </h2>
        
        <div className="flex flex-col gap-4">
          {currentQuestion.options.map((option, idx) => {
            let buttonClass = "bg-zinc-950 border border-zinc-800 hover:border-blue-500 hover:bg-zinc-800";
            
            if (isAnswered) {
              if (idx === currentQuestion.correctIndex) {
                buttonClass = "bg-green-900/40 border border-green-500 text-green-100";
              } else if (idx === selectedOption) {
                buttonClass = "bg-red-900/40 border border-red-500 text-red-100";
              } else {
                buttonClass = "bg-zinc-950 border border-zinc-800 opacity-50";
              }
            }

            return (
              <button 
                key={idx}
                onClick={() => handleOptionClick(idx)}
                disabled={isAnswered}
                className={`p-4 rounded-xl text-left transition-all ${buttonClass}`}
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold text-zinc-400 shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="font-medium text-lg">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="mt-8 pt-8 border-t border-zinc-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              {gifUrl === 'error' ? (
                <div className="w-48 h-48 bg-zinc-800 rounded-xl flex items-center justify-center shrink-0 border border-zinc-700">
                   <span className="text-4xl">{selectedOption === currentQuestion.correctIndex ? '🎉' : '🤦'}</span>
                </div>
              ) : gifUrl ? (
                <img src={gifUrl} alt="Reaction GIF" className="w-48 h-48 object-cover rounded-xl shadow-lg shrink-0 bg-zinc-800" />
              ) : (
                <div className="w-48 h-48 bg-zinc-800 rounded-xl flex items-center justify-center shrink-0">
                  <span className="animate-pulse">Loading GIF...</span>
                </div>
              )}
              
              <div className="flex-1 flex flex-col justify-center">
                <h3 className={`text-2xl font-bold mb-2 ${selectedOption === currentQuestion.correctIndex ? 'text-green-400' : 'text-red-400'}`}>
                  {selectedOption === currentQuestion.correctIndex ? 'Nailed it!' : 'Oops, not quite.'}
                </h3>
                <p className="text-zinc-300 mb-6 leading-relaxed">
                  {currentQuestion.explanation}
                </p>
                <button 
                  onClick={handleNext}
                  className="bg-white hover:bg-zinc-200 text-zinc-950 font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 active:scale-95 sm:self-start"
                >
                  {currentQuestionIndex < currentQuiz.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
