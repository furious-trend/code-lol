import { QuizTopic } from './quizzes/types';
import { beginner1Topics } from './quizzes/beginner1';
import { beginner2Topics } from './quizzes/beginner2';
import { intermediateTopics } from './quizzes/intermediate';
import { advancedTopics } from './quizzes/advanced';
import { expertTopics } from './quizzes/expert';

// Export types for use in components
export * from './quizzes/types';

// Merge all topic dictionaries into one massive source of truth
export const quizzes: Record<string, QuizTopic> = {
  ...beginner1Topics,
  ...beginner2Topics,
  ...intermediateTopics,
  ...advancedTopics,
  ...expertTopics,
};
