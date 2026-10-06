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


import { cIntermediateLessons } from './intermediate-c';
import { cExpertLessons } from './expert-c';
import { cInterviewLessons } from './interview-c';

import { cppIntermediateLessons } from './intermediate-cpp';
import { cppExpertLessons } from './expert-cpp';
import { cppInterviewLessons } from './interview-cpp';

import { javaIntermediateLessons } from './intermediate-java';
import { javaExpertLessons } from './expert-java';
import { javaInterviewLessons } from './interview-java';

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

export const cAllLessons: Lesson[] = [
  ...cBeginnerLessons,
  ...cIntermediateLessons,
  ...cExpertLessons,
  ...cInterviewLessons
];
export const cppAllLessons: Lesson[] = [
  ...cppBeginnerLessons,
  ...cppIntermediateLessons,
  ...cppExpertLessons,
  ...cppInterviewLessons
];
export const javaAllLessons: Lesson[] = [
  ...javaBeginnerLessons,
  ...javaIntermediateLessons,
  ...javaExpertLessons,
  ...javaInterviewLessons
];

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
      lessons: lang === 'python' ? pythonIntermediateLessons : lang === 'c' ? cIntermediateLessons : lang === 'cpp' ? cppIntermediateLessons : lang === 'java' ? javaIntermediateLessons : intermediateLessons
    },
    {
      id: 'expert',
      name: 'Expert',
      sticker: '🔴',
      lessons: lang === 'python' ? pythonExpertLessons : lang === 'c' ? cExpertLessons : lang === 'cpp' ? cppExpertLessons : lang === 'java' ? javaExpertLessons : expertLessons
    },
    {
      id: 'interview',
      name: 'Interview Prep',
      sticker: '👔',
      lessons: lang === 'python' ? pythonInterviewLessons : lang === 'c' ? cInterviewLessons : lang === 'cpp' ? cppInterviewLessons : lang === 'java' ? javaInterviewLessons : interviewLessons
    }
  ];
};

export const getAllLessons = (lang: string = 'javascript') => {
  if (lang === 'python') return pythonAllLessons;
  if (lang === 'c') return cAllLessons;
  if (lang === 'cpp') return cppAllLessons;
  if (lang === 'java') return javaAllLessons;
  return allLessons;
};

export * from './types';
