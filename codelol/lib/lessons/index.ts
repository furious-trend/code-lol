import { Lesson } from './types';
import { beginnerLessons } from './beginner';
import { pythonBeginnerLessons } from './beginner-python';
import { intermediateLessons } from './intermediate';
import { pythonIntermediateLessons } from './intermediate-python';
import { expertLessons } from './expert';
import { pythonExpertLessons } from './expert-python';
import { interviewLessons } from './interview';
import { pythonInterviewLessons } from './interview-python';

// Default export (JS)
export const allLessons: Lesson[] = [
  ...beginnerLessons,
  ...intermediateLessons,
  ...expertLessons,
  ...interviewLessons
];

export const pythonAllLessons: Lesson[] = [
  ...pythonBeginnerLessons,
  ...pythonIntermediateLessons,
  ...pythonExpertLessons,
  ...pythonInterviewLessons
];

export const getLessonCategories = (lang: string = 'javascript') => {
  const isPython = lang === 'python';
  return [
    {
      id: 'beginner',
      name: 'Beginner',
      sticker: '🟢',
      lessons: isPython ? pythonBeginnerLessons : beginnerLessons
    },
    {
      id: 'intermediate',
      name: 'Intermediate',
      sticker: '🟡',
      lessons: isPython ? pythonIntermediateLessons : intermediateLessons
    },
    {
      id: 'expert',
      name: 'Expert',
      sticker: '🔴',
      lessons: isPython ? pythonExpertLessons : expertLessons
    },
    {
      id: 'interview',
      name: 'Interview Prep',
      sticker: '👔',
      lessons: isPython ? pythonInterviewLessons : interviewLessons
    }
  ];
};

export const getAllLessons = (lang: string = 'javascript') => {
  return lang === 'python' ? pythonAllLessons : allLessons;
};

export * from './types';
