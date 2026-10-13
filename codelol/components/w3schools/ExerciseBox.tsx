// agent-notes: { ctx: "W3Schools-style Test Yourself With Exercises mini-quiz widget", deps: [], state: active, last: "sato@2026-10-13" }
'use client';

import React, { useState } from 'react';
import { HelpCircle, CheckCircle, AlertCircle, RotateCcw } from 'lucide-react';

interface QuizData {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation?: string;
}

interface ExerciseBoxProps {
  quiz: QuizData;
  onCorrect?: () => void;
  className?: string;
}

export function ExerciseBox({ quiz, onCorrect, className = '' }: ExerciseBoxProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOption === null) return;

    const correct = selectedOption === quiz.correctAnswerIndex;
    setIsCorrect(correct);
    setSubmitted(true);

    if (correct) {
      onCorrect?.();
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <div className={`my-8 p-6 rounded-3xl border border-zinc-800 bg-zinc-900/70 shadow-xl ${className}`}>
      <div className="flex items-center gap-2 mb-4 text-emerald-400 font-bold uppercase tracking-wider text-xs sm:text-sm">
        <HelpCircle size={18} />
        <span>Test Yourself With Exercises</span>
      </div>

      <h4 className="text-base sm:text-lg font-bold text-zinc-100 mb-5 leading-snug">
        {quiz.question}
      </h4>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-2">
          {quiz.options.map((option, idx) => {
            const inputId = `quiz-opt-${idx}-${option.replace(/\s+/g, '-')}`;
            const isSelected = selectedOption === idx;

            return (
              <label
                key={option}
                htmlFor={inputId}
                className={`
                  flex items-center gap-3 p-3.5 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all
                  ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-950/20 text-white ring-1 ring-emerald-500/50'
                      : 'border-zinc-800 bg-zinc-950/60 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/60'
                  }
                `}
              >
                <input
                  type="radio"
                  id={inputId}
                  name="quiz-option"
                  value={idx}
                  checked={isSelected}
                  onChange={() => {
                    setSelectedOption(idx);
                    if (submitted) setSubmitted(false);
                  }}
                  className="w-4 h-4 text-emerald-500 accent-emerald-500 cursor-pointer"
                />
                <span className="font-mono">{option}</span>
              </label>
            );
          })}
        </div>

        {/* Feedback Banner */}
        {submitted && (
          <div
            className={`p-4 rounded-xl text-sm flex items-start gap-3 mt-4 animate-in fade-in duration-300 ${
              isCorrect
                ? 'bg-emerald-950/40 border border-emerald-500/50 text-emerald-300'
                : 'bg-rose-950/40 border border-rose-500/50 text-rose-300'
            }`}
          >
            {isCorrect ? (
              <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <p className="font-bold">
                {isCorrect ? 'Correct! 🎉' : 'Not quite! Try again.'}
              </p>
              {quiz.explanation && isCorrect && (
                <p className="text-xs text-emerald-400/80 mt-1">{quiz.explanation}</p>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-3">
          <button
            type="submit"
            disabled={selectedOption === null || (submitted && isCorrect)}
            className={`
              px-6 py-2.5 rounded-xl font-bold text-sm text-white transition-all
              ${
                selectedOption === null || (submitted && isCorrect)
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-900/30 cursor-pointer active:scale-95'
              }
            `}
          >
            Submit Answer
          </button>

          {submitted && !isCorrect && (
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-400 hover:text-zinc-200 bg-zinc-800 hover:bg-zinc-700 transition-colors"
            >
              <RotateCcw size={14} />
              <span>Retry</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
