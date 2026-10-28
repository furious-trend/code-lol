// agent-notes: { ctx: "TypeScript types and interfaces for module-aligned multi-language problems", deps: [], state: active, last: "sato@2026-10-28" }

export type SupportedProblemLanguage = 'javascript' | 'python' | 'c' | 'cpp' | 'java';

export type ProblemTier = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Expert';

export interface TestCase {
  input: unknown[];
  expected: unknown;
}

export interface ModuleProblem {
  id: string;
  moduleId: string;
  chapterId: string;
  language: SupportedProblemLanguage;
  tier: ProblemTier;
  title: string;
  description: string;
  starterCode: string;
  testHarness: string; // Hidden assertions appending ===TEST_RESULTS===
  hints: {
    english: string;
    tamilRoast: string;
  };
  // Optional compatibility properties for legacy consumers
  difficulty?: Difficulty;
  level?: string;
  starterCodePython?: string;
  starterCodeC?: string;
  starterCodeCpp?: string;
  starterCodeJava?: string;
  testHarnessC?: string;
  testHarnessCpp?: string;
  testHarnessJava?: string;
  testCases?: TestCase[];
  miniQuizQuestion?: {
    question: string;
    options: string[];
    correctAnswerIndex: number;
  };
}

export interface Problem {
  id: string;
  title: string;
  level: string;
  difficulty: Difficulty;
  description: string;
  starterCode: string;
  starterCodePython?: string;
  starterCodeC?: string;
  starterCodeCpp?: string;
  starterCodeJava?: string;
  testHarnessC?: string;
  testHarnessCpp?: string;
  testHarnessJava?: string;
  testCases: TestCase[];
  miniQuizQuestion?: {
    question: string;
    options: string[];
    correctAnswerIndex: number;
  };
  moduleId?: string;
  chapterId?: string;
  hints?: {
    english: string;
    tamilRoast: string;
  };
  tier?: ProblemTier;
}

export interface ChapterProblemGroup {
  chapterId: string;
  chapterTitle: string;
  tier: ProblemTier;
  problems: ModuleProblem[];
}
