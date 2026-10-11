// agent-notes: { ctx: "TypeScript types for Python 20-chapter master curriculum", deps: [], state: active, last: "sato@2026-10-11" }
export type HumorPreference = 'tamil' | 'general';

export type Tier = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Specialized';

export interface PythonLesson {
  id: string;
  chapterId: string;
  title: string;
  tier: 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'specialized';
  technicalCore: string[];
  englishExplanation: string;
  tamilRoast: string;
  codeExample: string;
  expectedOutput: string;
  verificationChecks: string[];
  miniQuiz: { question: string; options: string[]; answerIndex: number };
}

export interface VerificationCheck {
  description: string;
  pattern: string; // Regex pattern to check the code
  errorMessage: string;
}

export interface MiniQuiz {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  answerIndex?: number;
}

export interface Lesson {
  id: string;
  chapterId?: string;
  title: string;
  explanation: string;
  englishExplanation?: string;
  codeExample: string;
  expectedOutput: string;
  verificationChecks: VerificationCheck[];
  miniQuiz: MiniQuiz;
  funnyLineGeneral: string;
  funnyLineTamil: string;
  tamilRoast?: string;
  practicePrompt?: string;
  proudSuccessGeneral?: string;
  proudSuccessTamil?: string;
}

export interface Chapter {
  id: string;
  title: string;
  tier: Tier;
  technicalCore: string[];
  analogyGeneral: string;
  analogyTamil: string;
  roastGeneral: string;
  roastTamil: string;
  proudSuccessGeneral?: string;
  proudSuccessTamil?: string;
  lessons: Lesson[];
}
