export type Tier = "Beginner" | "Intermediate" | "Expert" | "Interview";

export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswerIndex: number;
};

export type LessonExample = {
  explanation: string;
  code: string;
};

export type VerificationCheck = {
  type: "requires_syntax" | "requires_output" | "requires_call_count";
  pattern?: string;
  expectedMessage: string;
};

export interface BiteSizedHumor {
  meaning: string;
  meaningGeneral?: string;
  funnyEgTamil: string;
  funnyEgGeneral?: string;
}

export interface WorkoutStep {
  stepNumber: number;
  title: string;
  code: string;
  lineExplanation: string;
  memeNote?: string;
}

export type Lesson = {
  id: number;
  chapter: string;
  tier: Tier;
  title: string;
  sticker: string;
  biteSized: BiteSizedHumor;
  codeExample: string;
  workoutSteps?: WorkoutStep[];
  expectedOutput?: string | RegExp;
  gifKeyword: string;
  miniQuizQuestion: QuizQuestion;
  topicRequirement?: {
    pattern: string;
    errorMessage: string;
  };
  verificationChecks?: VerificationCheck[];
  examples?: LessonExample[];
};
