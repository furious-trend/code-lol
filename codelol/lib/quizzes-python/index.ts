import { QuizTopic } from '../quizzes/types';
import { pythonBeginnerTopics } from './beginner';

// Export types for use in components
export * from '../quizzes/types';

// Merge all topic dictionaries into one massive source of truth
export const pythonQuizzes: Record<string, QuizTopic> = {
  ...pythonBeginnerTopics,
  // Add intermediate, advanced, expert here later
};
