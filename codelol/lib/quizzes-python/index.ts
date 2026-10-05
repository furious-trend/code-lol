import { QuizTopic } from '../quizzes/types';
import { pythonBeginnerTopics } from './beginner';

import { pythonIntermediateTopics } from './intermediate';
import { pythonAdvancedTopics } from './advanced';
import { pythonExpertTopics } from './expert';

// Export types for use in components
export * from '../quizzes/types';

// Merge all topic dictionaries into one massive source of truth
export const pythonQuizzes: Record<string, QuizTopic> = {
  ...pythonBeginnerTopics,
  ...pythonIntermediateTopics,
  ...pythonAdvancedTopics,
  ...pythonExpertTopics,
};
