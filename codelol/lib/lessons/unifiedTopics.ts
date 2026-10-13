// agent-notes: { ctx: "Data adapter normalizing all 5 language curricula into unified W3Schools topic and chapter trees", deps: ["./index", "../python/curriculum"], state: active, last: "sato@2026-10-13" }
import { pythonCurriculum } from '../python/curriculum';
import {
  allLessons as jsLessons,
  cAllLessons,
  cppAllLessons,
  javaAllLessons,
} from './index';

export type SupportedTutorialLanguage = 'python' | 'javascript' | 'c' | 'cpp' | 'java';

export interface UnifiedTopic {
  id: string;
  numericId?: number;
  language: SupportedTutorialLanguage;
  chapter: string;
  tier: 'Beginner' | 'Intermediate' | 'Expert' | 'Interview';
  title: string;
  sticker: string;
  explanation: string;
  explanationTamil?: string;
  funnyLineGeneral?: string;
  funnyLineTamil?: string;
  codeExample: string;
  expectedOutput: string;
  examples?: Array<{ title?: string; explanation: string; code: string }>;
  miniQuiz?: {
    question: string;
    options: string[];
    correctAnswerIndex: number;
    explanation?: string;
  };
  verificationChecks?: Array<{ type: string; pattern?: string; expectedMessage: string }>;
}

export interface UnifiedChapter {
  id: string;
  title: string;
  tier: 'Beginner' | 'Intermediate' | 'Expert' | 'Interview';
  topics: UnifiedTopic[];
}

const tierMap: Record<string, 'Beginner' | 'Intermediate' | 'Expert' | 'Interview'> = {
  Beginner: 'Beginner',
  Intermediate: 'Intermediate',
  Advanced: 'Expert',
  Expert: 'Expert',
  Specialized: 'Interview',
  Interview: 'Interview',
};

export function getUnifiedTopics(language: string): UnifiedTopic[] {
  const lang = (language?.toLowerCase() || 'javascript') as SupportedTutorialLanguage;

  if (lang === 'python') {
    return pythonCurriculum.flatMap((ch, chIdx) =>
      ch.lessons.map((lesson, lIdx) => {
        const correctIdx =
          lesson.miniQuiz?.correctAnswerIndex ??
          lesson.miniQuiz?.answerIndex ??
          0;

        return {
          id: lesson.id || `ch${chIdx + 1}-l${lIdx + 1}`,
          numericId: (chIdx + 1) * 100 + (lIdx + 1),
          language: 'python',
          chapter: ch.title,
          tier: tierMap[ch.tier] || 'Beginner',
          title: lesson.title,
          sticker: '🐍',
          explanation: lesson.englishExplanation || lesson.explanation || '',
          explanationTamil: lesson.explanation || '',
          funnyLineGeneral: lesson.funnyLineGeneral || '',
          funnyLineTamil: lesson.funnyLineTamil || lesson.tamilRoast || '',
          codeExample: lesson.codeExample || 'print("Hello from Python!")',
          expectedOutput: lesson.expectedOutput || '',
          examples: [
            {
              title: lesson.title,
              explanation: lesson.englishExplanation || lesson.explanation || '',
              code: lesson.codeExample || '',
            },
          ],
          miniQuiz: lesson.miniQuiz
            ? {
                question: lesson.miniQuiz.question,
                options: lesson.miniQuiz.options || [],
                correctAnswerIndex: correctIdx,
                explanation: lesson.englishExplanation || '',
              }
            : undefined,
          verificationChecks: lesson.verificationChecks?.map((vc) => ({
            type: 'requires_syntax',
            pattern: vc.pattern,
            expectedMessage: vc.errorMessage || vc.description,
          })),
        };
      })
    );
  }

  // Standard lessons
  const rawLessons =
    lang === 'c'
      ? cAllLessons
      : lang === 'cpp'
      ? cppAllLessons
      : lang === 'java'
      ? javaAllLessons
      : jsLessons;

  const stickerMap: Record<SupportedTutorialLanguage, string> = {
    python: '🐍',
    javascript: '🟨',
    c: '⚡',
    cpp: '🔷',
    java: '☕',
  };

  return rawLessons.map((l) => ({
    id: String(l.id),
    numericId: l.id,
    language: lang,
    chapter: l.chapter || `${l.tier} Essentials`,
    tier: (tierMap[l.tier] || 'Beginner') as 'Beginner' | 'Intermediate' | 'Expert' | 'Interview',
    title: l.title,
    sticker: l.sticker || stickerMap[lang],
    explanation: l.biteSized?.meaningGeneral || l.biteSized?.meaning || '',
    explanationTamil: l.biteSized?.meaning || '',
    funnyLineGeneral: l.biteSized?.funnyEgGeneral || '',
    funnyLineTamil: l.biteSized?.funnyEgTamil || '',
    codeExample: l.codeExample,
    expectedOutput:
      typeof l.expectedOutput === 'string'
        ? l.expectedOutput
        : l.expectedOutput instanceof RegExp
        ? l.expectedOutput.source
        : '',
    examples: l.examples || [
      {
        title: l.title,
        explanation: l.biteSized?.meaningGeneral || l.biteSized?.meaning || '',
        code: l.codeExample,
      },
    ],
    miniQuiz: l.miniQuizQuestion
      ? {
          question: l.miniQuizQuestion.question,
          options: l.miniQuizQuestion.options,
          correctAnswerIndex: l.miniQuizQuestion.correctAnswerIndex,
        }
      : undefined,
    verificationChecks: l.verificationChecks?.map((vc) => ({
      type: vc.type,
      pattern: vc.pattern,
      expectedMessage: vc.expectedMessage,
    })),
  }));
}

export function getUnifiedChapters(language: string): UnifiedChapter[] {
  const topics = getUnifiedTopics(language);
  const chapterMap = new Map<string, UnifiedChapter>();

  topics.forEach((topic) => {
    if (!chapterMap.has(topic.chapter)) {
      chapterMap.set(topic.chapter, {
        id: topic.chapter.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: topic.chapter,
        tier: topic.tier,
        topics: [],
      });
    }
    chapterMap.get(topic.chapter)!.topics.push(topic);
  });

  return Array.from(chapterMap.values());
}
