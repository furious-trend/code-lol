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

export type Lesson = {
  id: number;
  chapter: string;
  tier: Tier;
  title: string;
  sticker: string;
  funnyExplanationGeneral: string;
  funnyExplanationTamil: string;
  codeExample: string;
  gifKeyword: string;
  miniQuizQuestion: QuizQuestion;
  topicRequirement?: {
    pattern: string;
    errorMessage: string;
  };
  verificationChecks?: VerificationCheck[];
  examples?: LessonExample[];
};
