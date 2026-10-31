// agent-notes: { ctx: "Type definitions for language-specific bug roasts and engineering applause", deps: [], state: active, last: "sato@2026-10-31" }

export type SupportedLanguage = 'python' | 'c' | 'cpp' | 'java' | 'javascript';
export type HumorStyle = 'general' | 'tamil';

export interface BugRoast {
  errorType: string;
  general: string;
  tamil: string;
  fix?: string;
  mood?: string;
  gifKeyword?: string;
}

export interface LanguageRoastPool {
  common: BugRoast[];
  specificErrors: Record<string, BugRoast>;
}

export interface SuccessJoke {
  general: string;
  tamil: string;
  fix?: string;
  mood?: string;
  gifKeyword?: string;
}

export interface FallbackRoast {
  roast: string;
  fix: string;
  mood: string;
  gifKeyword: string;
  errorType?: 'syntax' | 'runtime' | 'logic';
}
