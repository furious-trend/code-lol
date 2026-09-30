import { Lesson } from './types';
import { beginnerLessons } from './beginner';
import { pythonBeginnerLessons } from './beginner-python';
import { intermediateLessons } from './intermediate';
import { expertLessons } from './expert';
import { interviewLessons } from './interview';

// Default export (JS)
export const allLessons: Lesson[] = [
  ...beginnerLessons,
  ...intermediateLessons,
  ...expertLessons,
  ...interviewLessons
];

export const pythonAllLessons: Lesson[] = [
  ...pythonBeginnerLessons,
  ...intermediateLessons,
  ...expertLessons,
  ...interviewLessons
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
      lessons: intermediateLessons // TODO: Translate these
    },
    {
      id: 'expert',
      name: 'Expert',
      sticker: '🔴',
      lessons: expertLessons // TODO: Translate these
    },
    {
      id: 'interview',
      name: 'Interview Prep',
      sticker: '👔',
      lessons: interviewLessons // TODO: Translate these
    }
  ];
};

export const getAllLessons = (lang: string = 'javascript') => {
  return lang === 'python' ? pythonAllLessons : allLessons;
};

export * from './types';
