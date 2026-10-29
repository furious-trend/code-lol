// agent-notes: { ctx: "TypeScript types and interfaces for module-aligned multi-language problems with reference solutions and hints", deps: [], state: active, last: "sato@2026-10-29" }

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
  solution?: string; // Reference solution code
  solutionExplanation?: string; // Step-by-step logic breakdown
  testHarness?: string; // Hidden assertions appending ===TEST_RESULTS=== (optional for script problems)
  expectedOutput?: string; // Expected stdout for beginner script challenges
  hints: {
    english: string;
    tamilRoast: string;
    syntaxClue?: string;
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
  solution?: string;
  solutionExplanation?: string;
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
    syntaxClue?: string;
  };
  tier?: ProblemTier;
  expectedOutput?: string;
}

export interface ChapterProblemGroup {
  chapterId: string;
  chapterTitle: string;
  tier: ProblemTier;
  problems: ModuleProblem[];
}
