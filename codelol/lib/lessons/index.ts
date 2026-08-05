import { Lesson } from './types';
import { beginnerLessons } from './beginner';
import { intermediateLessons } from './intermediate';
import { expertLessons } from './expert';
import { interviewLessons } from './interview';

// We export all lessons as a single sequential array.
export const allLessons: Lesson[] = [
  ...beginnerLessons,
  ...intermediateLessons,
  ...expertLessons,
  ...interviewLessons
];

export const lessonCategories = [
  {
    id: 'beginner',
    name: 'Beginner',
    sticker: '🟢',
    lessons: beginnerLessons
  },
  {
    id: 'intermediate',
    name: 'Intermediate',
    sticker: '🟡',
    lessons: intermediateLessons
  },
  {
    id: 'expert',
    name: 'Expert',
    sticker: '🔴',
    lessons: expertLessons
  },
  {
    id: 'interview',
    name: 'Interview Prep',
    sticker: '👔',
    lessons: interviewLessons
  }
];

export * from './types';
