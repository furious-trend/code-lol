export type Tier = "Beginner" | "Intermediate" | "Advanced" | "Expert" | "Interview";

export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswerIndex: number;
};

export type LessonExample = {
  explanation: string;
  code: string;
};

export type Lesson = {
  id: number;
  chapter: string;
  tier: Tier;
  title: string;
  sticker: string;
  funnyExplanation: string;
  codeExample: string;
  gifKeyword: string;
  miniQuizQuestion: QuizQuestion;
  examples?: LessonExample[];
};
