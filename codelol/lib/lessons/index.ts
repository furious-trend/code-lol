import { Lesson } from './types';
import { beginnerLessons } from './beginner';
import { pythonBeginnerLessons } from './beginner-python';
import { cBeginnerLessons } from './beginner-c';
import { cppBeginnerLessons } from './beginner-cpp';
import { javaBeginnerLessons } from './beginner-java';
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
].slice(0, 65);

export const pythonAllLessons: Lesson[] = [
  ...pythonBeginnerLessons,
  ...pythonIntermediateLessons,
  ...pythonExpertLessons,
  ...pythonInterviewLessons
].slice(0, 65);

export const getLessonCategories = (lang: string = 'javascript') => {
  const getBeginner = () => {
    if (lang === 'python') return pythonBeginnerLessons;
    if (lang === 'c') return cBeginnerLessons;
    if (lang === 'cpp') return cppBeginnerLessons;
    if (lang === 'java') return javaBeginnerLessons;
    return beginnerLessons;
  };

  const isPython = lang === 'python';
  return [
    {
      id: 'beginner',
      name: 'Beginner',
      sticker: '🟢',
      lessons: getBeginner()
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
  if (lang === 'python') return pythonAllLessons;
  if (lang === 'c') return cBeginnerLessons;
  if (lang === 'cpp') return cppBeginnerLessons;
  if (lang === 'java') return javaBeginnerLessons;
  return allLessons;
};

export * from './types';
