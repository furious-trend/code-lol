export type Tier = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type QuizTopic = {
  id: string;
  title: string;
  tier: Tier;
  icon: string;
  color: string;
  questions: QuizQuestion[];
};
