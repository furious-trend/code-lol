// agent-notes: { ctx: "Multi-language lessons index providing allLessons, curriculum, and categories", deps: ["./types", "../python/curriculum"], state: active, last: "sato@2026-10-12" }
import { Lesson, Tier } from "./types";
import { pythonCurriculum } from "../python/curriculum";
export { pythonCurriculum };

import { beginnerLessons } from "./beginner";
import { intermediateLessons } from "./intermediate";
import { expertLessons } from "./expert";
import { interviewLessons } from "./interview";

import { pythonBeginnerLessons } from "./beginner-python";
import { pythonIntermediateLessons } from "./intermediate-python";
import { pythonExpertLessons } from "./expert-python";
import { pythonInterviewLessons } from "./interview-python";

import { cBeginnerLessons } from "./beginner-c";
import { cIntermediateLessons } from "./intermediate-c";
import { cExpertLessons } from "./expert-c";
import { cInterviewLessons } from "./interview-c";

import { cppBeginnerLessons } from "./beginner-cpp";
import { cppIntermediateLessons } from "./intermediate-cpp";
import { cppExpertLessons } from "./expert-cpp";
import { cppInterviewLessons } from "./interview-cpp";

import { javaBeginnerLessons } from "./beginner-java";
import { javaIntermediateLessons } from "./intermediate-java";
import { javaExpertLessons } from "./expert-java";
import { javaInterviewLessons } from "./interview-java";

// Default export (JS)
export const allLessons: Lesson[] = [
  ...beginnerLessons,
  ...intermediateLessons,
  ...expertLessons,
  ...interviewLessons
].slice(0, 65);

export const pythonAllLessons: Lesson[] = pythonCurriculum.flatMap((chapter, chIdx) =>
  chapter.lessons.map((lesson, lIdx) => {
    const id = (chIdx + 1) * 100 + (lIdx + 1);
    const tierMap: Record<string, Tier> = {
      "Beginner": "Beginner",
      "Intermediate": "Intermediate",
      "Advanced": "Expert",
      "Expert": "Expert",
      "Specialized": "Interview"
    };
    return {
      id,
      language: "python",
      chapter: chapter.title,
      tier: tierMap[chapter.tier] || "Beginner",
      title: lesson.title,
      sticker: "🐍",
      biteSized: {
        meaning: lesson.explanation,
        meaningGeneral: lesson.englishExplanation || lesson.explanation,
        funnyEgTamil: lesson.tamilRoast || lesson.funnyLineTamil,
        funnyEgGeneral: lesson.funnyLineGeneral
      },
      codeExample: lesson.codeExample,
      expectedOutput: lesson.expectedOutput,
      gifKeyword: "python coding",
      miniQuizQuestion: {
        question: lesson.miniQuiz.question,
        options: lesson.miniQuiz.options,
        correctAnswerIndex: lesson.miniQuiz.answerIndex ?? lesson.miniQuiz.correctAnswerIndex
      },
      verificationChecks: lesson.verificationChecks.map(vc => ({
        type: "requires_syntax" as const,
        pattern: vc.pattern,
        expectedMessage: vc.errorMessage || vc.description
      })),
      workoutSteps: [
        {
          stepNumber: 1,
          title: lesson.title,
          explanation: lesson.explanation,
          code: lesson.codeExample,
          lineExplanation: lesson.funnyLineGeneral || "",
          memeNote: lesson.funnyLineTamil || "",
          proudGeneral: lesson.proudSuccessGeneral || "",
          proudTamil: lesson.proudSuccessTamil || "",
          practicePrompt: lesson.practicePrompt || ""
        }
      ]
    };
  })
);

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

export {
  beginnerLessons,
  intermediateLessons,
  expertLessons,
  interviewLessons,
  pythonBeginnerLessons,
  pythonIntermediateLessons,
  pythonExpertLessons,
  pythonInterviewLessons,
  cBeginnerLessons,
  cIntermediateLessons,
  cExpertLessons,
  cInterviewLessons,
  cppBeginnerLessons,
  cppIntermediateLessons,
  cppExpertLessons,
  cppInterviewLessons,
  javaBeginnerLessons,
  javaIntermediateLessons,
  javaExpertLessons,
  javaInterviewLessons
};

export const getLessonCategories = (lang: string = 'javascript') => {
  if (lang === 'python') {
    return [
      {
        id: 'beginner',
        name: 'Beginner',
        sticker: '🟢',
        lessons: pythonAllLessons.filter(l => l.tier === 'Beginner')
      },
      {
        id: 'intermediate',
        name: 'Intermediate',
        sticker: '🟡',
        lessons: pythonAllLessons.filter(l => l.tier === 'Intermediate')
      },
      {
        id: 'expert',
        name: 'Expert',
        sticker: '🔴',
        lessons: pythonAllLessons.filter(l => l.tier === 'Expert')
      },
      {
        id: 'interview',
        name: 'Interview Prep',
        sticker: '👔',
        lessons: pythonAllLessons.filter(l => l.tier === 'Interview')
      }
    ];
  }

  const getBeginner = () => {
    if (lang === 'c') return cBeginnerLessons;
    if (lang === 'cpp') return cppBeginnerLessons;
    if (lang === 'java') return javaBeginnerLessons;
    return beginnerLessons;
  };

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
      lessons: lang === 'c' ? cIntermediateLessons : lang === 'cpp' ? cppIntermediateLessons : lang === 'java' ? javaIntermediateLessons : intermediateLessons
    },
    {
      id: 'expert',
      name: 'Expert',
      sticker: '🔴',
      lessons: lang === 'c' ? cExpertLessons : lang === 'cpp' ? cppExpertLessons : lang === 'java' ? javaExpertLessons : expertLessons
    },
    {
      id: 'interview',
      name: 'Interview Prep',
      sticker: '👔',
      lessons: lang === 'c' ? cInterviewLessons : lang === 'cpp' ? cppInterviewLessons : lang === 'java' ? javaInterviewLessons : interviewLessons
    }
  ];
};

export const getAllLessons = (lang: string = "javascript") => {
  if (lang === "python") return pythonAllLessons;
  if (lang === "c") return cAllLessons;
  if (lang === "cpp") return cppAllLessons;
  if (lang === "java") return javaAllLessons;
  return allLessons;
};

export const getCurriculum = (lang: string = "javascript") => {
  if (lang === "python") {
    return {
      type: "python" as const,
      curriculum: pythonCurriculum,
      lessons: pythonAllLessons
    };
  }
  return {
    type: "standard" as const,
    lessons: getAllLessons(lang),
    categories: getLessonCategories(lang)
  };
};

export const getLessonsForLanguage = (lang: string = "javascript") => {
  return getAllLessons(lang);
};

export const getLessonsByLanguage = (lang: string = "javascript") => {
  if (lang === "python") return pythonCurriculum;
  return getAllLessons(lang);
};

export * from "./types";

