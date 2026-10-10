export type HumorPreference = 'tamil' | 'general';

export type Tier = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface VerificationCheck {
  description: string;
  pattern: string; // Regex pattern to check the code
  errorMessage: string;
}

export interface MiniQuiz {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface Lesson {
  id: string;
  title: string;
  explanation: string;
  codeExample: string;
  expectedOutput: string;
  verificationChecks: VerificationCheck[];
  miniQuiz: MiniQuiz;
  funnyLineGeneral: string;
  funnyLineTamil: string;
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
  lessons: Lesson[];
}
