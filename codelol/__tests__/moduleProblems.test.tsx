// agent-notes: { ctx: "TDD unit tests for language filtering, module mapping, and 3-step completion logic", deps: ["@/lib/problems", "@/lib/progress"], state: active, last: "tara@2026-10-28" }
import { describe, it, expect } from 'vitest';
import {
  getModuleProblems,
  getModuleProblem,
  getProblemsByChapter,
  resolveActiveLanguage,
  problems as legacyProblems,
  SupportedProblemLanguage,
  ModuleProblem,
} from '@/lib/problems';
import {
  isModuleComplete,
  getModuleCompletionStatus,
  ModuleCompletionStatus,
} from '@/lib/progress';

describe('1. Multi-Language Filtering for Problems', () => {
  const supportedLanguages: SupportedProblemLanguage[] = [
    'javascript',
    'python',
    'c',
    'cpp',
    'java',
  ];

  describe('resolveActiveLanguage', () => {
    it('prioritizes URL query parameter over profile and local storage', () => {
      const resolved = resolveActiveLanguage('python', 'javascript', 'c');
      expect(resolved).toBe('python');
    });

    it('falls back to authenticated profile learning_language when URL param is missing', () => {
      const resolved = resolveActiveLanguage(null, 'c', 'javascript');
      expect(resolved).toBe('c');
    });

    it('falls back to guest local storage language when URL param and profile are missing', () => {
      const resolved = resolveActiveLanguage(null, null, 'java');
      expect(resolved).toBe('java');
    });

    it('defaults to python when all sources are missing or null', () => {
      const resolved = resolveActiveLanguage(null, null, null);
      expect(resolved).toBe('python');
    });

    it('normalizes uppercase and mixed-case language inputs', () => {
      expect(resolveActiveLanguage('JAVASCRIPT')).toBe('javascript');
      expect(resolveActiveLanguage('Python')).toBe('python');
      expect(resolveActiveLanguage('CPP')).toBe('cpp');
    });

    it('ignores unsupported languages and falls back gracefully', () => {
      // url param 'rust' is unsupported, fall back to profile 'c'
      expect(resolveActiveLanguage('rust', 'c', 'python')).toBe('c');
      // all unsupported fall back to default 'python'
      expect(resolveActiveLanguage('ruby', 'php', 'swift')).toBe('python');
    });
  });

  describe('getModuleProblems language isolation', () => {
    it('returns problems strictly filtered to each of the 5 supported languages', () => {
      for (const lang of supportedLanguages) {
        const problemsList = getModuleProblems(lang);
        expect(Array.isArray(problemsList)).toBe(true);
        expect(problemsList.length).toBeGreaterThan(0);

        // Verify isolation: every single challenge in the list must match the requested language
        for (const prob of problemsList) {
          expect(prob.language).toBe(lang);
        }
      }
    });

    it('defaults to python if an unsupported language string is passed', () => {
      const fallbackList = getModuleProblems('unsupported_lang');
      expect(Array.isArray(fallbackList)).toBe(true);
      expect(fallbackList.length).toBeGreaterThan(0);
      expect(fallbackList[0].language).toBe('python');
    });
  });
});

describe('2. Module-Aligned Problem Structure (lib/problems/)', () => {
  const supportedLanguages: SupportedProblemLanguage[] = [
    'javascript',
    'python',
    'c',
    'cpp',
    'java',
  ];

  it('ensures every challenge matches the ModuleProblem schema exactly', () => {
    for (const lang of supportedLanguages) {
      const problemsList = getModuleProblems(lang);
      for (const p of problemsList) {
        // IDs and module/chapter hierarchy mapping
        expect(p.id).toBeDefined();
        expect(typeof p.id).toBe('string');
        expect(p.id.length).toBeGreaterThan(0);

        expect(p.moduleId).toBeDefined();
        expect(typeof p.moduleId).toBe('string');
        expect(p.moduleId.length).toBeGreaterThan(0);

        expect(p.chapterId).toBeDefined();
        expect(typeof p.chapterId).toBe('string');
        expect(p.chapterId.length).toBeGreaterThan(0);

        // Language & Tier
        expect(p.language).toBe(lang);
        expect(['beginner', 'intermediate', 'advanced', 'expert']).toContain(p.tier);

        // Title and description
        expect(typeof p.title).toBe('string');
        expect(p.title.length).toBeGreaterThan(0);
        expect(typeof p.description).toBe('string');
        expect(p.description.length).toBeGreaterThan(0);

        // Starter code and hidden test harness
        expect(typeof p.starterCode).toBe('string');
        expect(p.starterCode.length).toBeGreaterThan(0);
        expect(typeof p.testHarness).toBe('string');
        expect(p.testHarness).toContain('===TEST_RESULTS===');

        // Bilingual hints: English + Tamil Roast
        expect(p.hints).toBeDefined();
        expect(typeof p.hints.english).toBe('string');
        expect(p.hints.english.length).toBeGreaterThan(0);
        expect(typeof p.hints.tamilRoast).toBe('string');
        expect(p.hints.tamilRoast.length).toBeGreaterThan(0);
      }
    }
  });

  it('retrieves an individual problem by ID and language', () => {
    const pyProblems = getModuleProblems('python');
    const firstPy = pyProblems[0];
    const found = getModuleProblem(firstPy.id, 'python');
    expect(found).toBeDefined();
    expect(found?.id).toBe(firstPy.id);
    expect(found?.moduleId).toBe(firstPy.moduleId);
  });

  it('retrieves an individual problem by its curriculum moduleId', () => {
    const jsProblems = getModuleProblems('javascript');
    const firstJs = jsProblems[0];
    const found = getModuleProblem(firstJs.moduleId, 'javascript');
    expect(found).toBeDefined();
    expect(found?.id).toBe(firstJs.id);
  });

  it('groups challenges according to curriculum chapter hierarchy', () => {
    for (const lang of supportedLanguages) {
      const chapterGroups = getProblemsByChapter(lang);
      expect(Array.isArray(chapterGroups)).toBe(true);
      expect(chapterGroups.length).toBeGreaterThan(0);

      for (const group of chapterGroups) {
        expect(group.chapterId).toBeDefined();
        expect(typeof group.chapterId).toBe('string');
        expect(group.chapterTitle).toBeDefined();
        expect(typeof group.chapterTitle).toBe('string');
        expect(['beginner', 'intermediate', 'advanced', 'expert']).toContain(group.tier);
        expect(Array.isArray(group.problems)).toBe(true);
        expect(group.problems.length).toBeGreaterThan(0);

        // Every problem inside the group must belong to this chapter or its modules
        for (const prob of group.problems) {
          expect(prob.language).toBe(lang);
        }
      }
    }
  });

  it('preserves backwards-compatibility with legacy problems export for battle and leaderboard', () => {
    expect(Array.isArray(legacyProblems)).toBe(true);
    expect(legacyProblems.length).toBeGreaterThan(0);
    expect(legacyProblems[0]).toHaveProperty('id');
    expect(legacyProblems[0]).toHaveProperty('title');
    expect(legacyProblems[0]).toHaveProperty('starterCode');
  });
});

describe('3. Three-Step / Dual-Gate Module Completion Logic', () => {
  const moduleId = 'ch1-l1';
  const problemId = 'py-ch1-l1';
  const language = 'python';

  describe('getModuleCompletionStatus', () => {
    it('returns "not_started" when neither the lesson is read nor the challenge is solved', () => {
      const learnedTopics = new Set<string>();
      const solvedProblems = new Set<string>();

      const status: ModuleCompletionStatus = getModuleCompletionStatus(
        moduleId,
        problemId,
        language,
        learnedTopics,
        solvedProblems
      );
      expect(status).toBe('not_started');
    });

    it('returns "lesson_read" when the library lesson is read but the coding challenge is pending', () => {
      const learnedTopics = new Set<string>([moduleId]);
      const solvedProblems = new Set<string>();

      const status: ModuleCompletionStatus = getModuleCompletionStatus(
        moduleId,
        problemId,
        language,
        learnedTopics,
        solvedProblems
      );
      expect(status).toBe('lesson_read');
    });

    it('returns "challenge_solved" when the coding challenge is solved but the library lesson is unread', () => {
      const learnedTopics = new Set<string>();
      const solvedProblems = new Set<string>([problemId]);

      const status: ModuleCompletionStatus = getModuleCompletionStatus(
        moduleId,
        problemId,
        language,
        learnedTopics,
        solvedProblems
      );
      expect(status).toBe('challenge_solved');
    });

    it('returns "completed" (100% mastery) when BOTH the lesson is read and coding challenge is solved', () => {
      const learnedTopics = new Set<string>([moduleId]);
      const solvedProblems = new Set<string>([problemId]);

      const status: ModuleCompletionStatus = getModuleCompletionStatus(
        moduleId,
        problemId,
        language,
        learnedTopics,
        solvedProblems
      );
      expect(status).toBe('completed');
    });

    it('handles language suffix variations in solved problem IDs', () => {
      const learnedTopics = new Set<string>([moduleId]);
      // Suffix variation: e.g. 'py-ch1-l1-python'
      const solvedWithSuffix = new Set<string>([`${problemId}-${language}`]);

      const status = getModuleCompletionStatus(
        moduleId,
        problemId,
        language,
        learnedTopics,
        solvedWithSuffix
      );
      expect(status).toBe('completed');
    });
  });

  describe('isModuleComplete boolean helper', () => {
    it('returns true ONLY when status is completed (both gates passed)', () => {
      const learnedTopics = new Set<string>([moduleId]);
      const solvedProblems = new Set<string>([problemId]);

      // Both true -> true
      expect(isModuleComplete(moduleId, problemId, language, learnedTopics, solvedProblems)).toBe(true);

      // Lesson only -> false
      expect(isModuleComplete(moduleId, problemId, language, learnedTopics, new Set())).toBe(false);

      // Challenge only -> false
      expect(isModuleComplete(moduleId, problemId, language, new Set(), solvedProblems)).toBe(false);

      // Neither -> false
      expect(isModuleComplete(moduleId, problemId, language, new Set(), new Set())).toBe(false);
    });
  });
});

