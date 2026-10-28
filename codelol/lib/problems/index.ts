// agent-notes: { ctx: "Unified problems index providing multi-language module-aligned problems and legacy compatibility", deps: ["./types", "./python", "./javascript", "./c", "./cpp", "./java", "./legacy", "../lessons/unifiedTopics", "../python/curriculum"], state: active, last: "sato@2026-10-28" }

import { ModuleProblem, ChapterProblemGroup, SupportedProblemLanguage, Problem } from './types';
import { pythonModuleProblems } from './python';
import { javascriptModuleProblems } from './javascript';
import { cModuleProblems } from './c';
import { cppModuleProblems } from './cpp';
import { javaModuleProblems } from './java';
import { problems as legacyProblems } from './legacy';
import { pythonCurriculum } from '../python/curriculum';
import { getUnifiedChapters } from '../lessons/unifiedTopics';

export * from './types';
export { pythonModuleProblems, javascriptModuleProblems, cModuleProblems, cppModuleProblems, javaModuleProblems };

// Backward-compatible export for battle and leaderboard features
export const problems: Problem[] = legacyProblems;

const languageProblemMap: Record<SupportedProblemLanguage, ModuleProblem[]> = {
  python: pythonModuleProblems,
  javascript: javascriptModuleProblems,
  c: cModuleProblems,
  cpp: cppModuleProblems,
  java: javaModuleProblems,
};

export function getModuleProblems(language: string = 'python'): ModuleProblem[] {
  const langKey = (language?.toLowerCase() || 'python') as SupportedProblemLanguage;
  return languageProblemMap[langKey] || pythonModuleProblems;
}

export function getModuleProblem(id: string, language?: string): ModuleProblem | undefined {
  if (language) {
    const list = getModuleProblems(language);
    const found = list.find(p => p.id === id || p.moduleId === id);
    if (found) return found;
  }

  // Search across all languages if language is unspecified or not found in specified language
  for (const list of Object.values(languageProblemMap)) {
    const found = list.find(p => p.id === id || p.moduleId === id);
    if (found) return found;
  }

  return undefined;
}

export function getProblemsByChapter(language: string = 'python'): ChapterProblemGroup[] {
  const langKey = (language?.toLowerCase() || 'python') as SupportedProblemLanguage;
  const problemsList = getModuleProblems(langKey);

  if (langKey === 'python') {
    const tierMap: Record<string, 'beginner' | 'intermediate' | 'advanced' | 'expert'> = {
      Beginner: 'beginner',
      Intermediate: 'intermediate',
      Advanced: 'advanced',
      Expert: 'expert',
      Specialized: 'expert',
    };

    return pythonCurriculum.map(ch => {
      const chapterProblems = problemsList.filter(p => p.chapterId === ch.id);
      return {
        chapterId: ch.id,
        chapterTitle: ch.title,
        tier: tierMap[ch.tier] || 'beginner',
        problems: chapterProblems,
      };
    }).filter(group => group.problems.length > 0);
  }

  // Standard languages: JavaScript, C, C++, Java
  const unifiedChapters = getUnifiedChapters(langKey);
  const tierMap: Record<string, 'beginner' | 'intermediate' | 'advanced' | 'expert'> = {
    Beginner: 'beginner',
    Intermediate: 'intermediate',
    Advanced: 'advanced',
    Expert: 'expert',
    Interview: 'expert',
  };

  return unifiedChapters.map(ch => {
    const topicIds = new Set(ch.topics.map(t => t.id));
    const chapterProblems = problemsList.filter(
      p => p.chapterId === ch.id || topicIds.has(p.moduleId)
    );

    return {
      chapterId: ch.id,
      chapterTitle: ch.title,
      tier: (tierMap[ch.tier] || 'beginner'),
      problems: chapterProblems,
    };
  }).filter(group => group.problems.length > 0);
}

export const SUPPORTED_PROBLEM_LANGUAGES: SupportedProblemLanguage[] = [
  'javascript',
  'python',
  'c',
  'cpp',
  'java',
];

export function resolveActiveLanguage(
  urlLang?: string | null,
  profileLang?: string | null,
  localLang?: string | null
): SupportedProblemLanguage {
  const candidates = [urlLang, profileLang, localLang];
  for (const candidate of candidates) {
    if (candidate && typeof candidate === 'string') {
      const normalized = candidate.toLowerCase().trim();
      if (SUPPORTED_PROBLEM_LANGUAGES.includes(normalized as SupportedProblemLanguage)) {
        return normalized as SupportedProblemLanguage;
      }
    }
  }
  return 'python';
}

