// agent-notes: { ctx: "Matcher and selector for language-specific technical bug roasts and engineering applause", deps: ["./types", "./languagePools", "./successPools"], state: active, last: "sato@2026-10-31" }

import { SupportedLanguage, HumorStyle, BugRoast, FallbackRoast } from './types';
import { languageRoastPools } from './languagePools';
import { successJokes, languageSpecificSuccess } from './successPools';

/**
 * Maps incoming compiler/runtime error text to a specific language bug roast.
 */
export function matchBugRoast(language: SupportedLanguage, errorLog: string = ''): BugRoast {
  const pool = languageRoastPools[language] || languageRoastPools.javascript;
  const log = (errorLog || '').toLowerCase();

  switch (language) {
    case 'python':
      if (/indentationerror|unindent does not match|expected an indented block/.test(log)) {
        return pool.specificErrors.IndentationError;
      }
      if (/syntaxerror.*expected ':'|expected ':'|missing colon/.test(log)) {
        return pool.specificErrors.SyntaxError;
      }
      if (/typeerror.*unsupported operand|can only concatenate|cannot concatenate.*str.*int|can't multiply sequence/.test(log)) {
        return pool.specificErrors.TypeError;
      }
      if (/indexerror|list index out of range|tuple index out of range/.test(log)) {
        return pool.specificErrors.IndexError;
      }
      if (/zerodivisionerror|division by zero/.test(log)) {
        return pool.specificErrors.ZeroDivisionError;
      }
      break;

    case 'c':
      if (/segmentation fault|core dumped|sigsegv/.test(log)) {
        return pool.specificErrors.SegmentationFault;
      }
      if (/expected ';'|missing semicolon|error: expected ';'/.test(log)) {
        return pool.specificErrors.MissingSemicolon;
      }
      if (/format.*expects argument of type|format specifies type|format specifies/.test(log)) {
        return pool.specificErrors.FormatSpecifierMismatch;
      }
      if (/is used uninitialized|uninitialized/.test(log)) {
        return pool.specificErrors.UninitializedVariable;
      }
      if (/stack smashing detected|buffer overflow|array subscript is above array bounds/.test(log)) {
        return pool.specificErrors.ArrayBufferOverflow;
      }
      break;

    case 'cpp':
      if (/undefined reference to|ld returned 1 exit status/.test(log)) {
        return pool.specificErrors.UndefinedReference;
      }
      if (/free\(\): double free|pointer being freed was not allocated|use-after-free|double free/.test(log)) {
        return pool.specificErrors.DanglingPointer;
      }
      if (/template.*error|instantiated from|no matching function for call to/.test(log)) {
        return pool.specificErrors.CrypticTemplateError;
      }
      if (/iterator not dereferencable|vector erase|iterator invalidation/.test(log)) {
        return pool.specificErrors.IteratorInvalidation;
      }
      break;

    case 'java':
      if (/nullpointerexception|npe/.test(log)) {
        return pool.specificErrors.NullPointerException;
      }
      if (/class .* is public, should be declared in a file named|class name mismatch/.test(log)) {
        return pool.specificErrors.ClassNameMismatch;
      }
      if (/main method not found in class|public static void main/.test(log)) {
        return pool.specificErrors.MissingMainMethod;
      }
      if (/arrayindexoutofboundsexception/.test(log)) {
        return pool.specificErrors.ArrayIndexOutOfBoundsException;
      }
      if (/classcastexception/.test(log)) {
        return pool.specificErrors.ClassCastException;
      }
      break;

    case 'javascript':
    default:
      if (/cannot read propert(y|ies) of undefined|cannot read propert(y|ies) of null|is undefined/.test(log)) {
        return pool.specificErrors.CannotReadUndefined;
      }
      if (/nan|is not a number/.test(log)) {
        return pool.specificErrors.AccidentalNaN;
      }
      if (/unhandledpromise|uncaught \(in promise\)|promise rejection/.test(log)) {
        return pool.specificErrors.UncaughtPromiseRejection;
      }
      if (/loose equality|type coercion|\[\] == !\[\]/.test(log)) {
        return pool.specificErrors.LooseEqualityQuirks;
      }
      break;
  }

  // Fallback to first specific error or common error
  const specificKeys = Object.keys(pool.specificErrors);
  if (specificKeys.length > 0) {
    const randomKey = specificKeys[Math.floor(Math.random() * specificKeys.length)];
    return pool.specificErrors[randomKey];
  }

  return pool.common[0];
}

/**
 * Returns string roast by language, error log, and humor style.
 */
export function getRoastByLanguageAndError(
  language: SupportedLanguage = 'javascript',
  errorLog: string = '',
  humor: HumorStyle = 'general'
): string {
  const bugRoast = matchBugRoast(language, errorLog);
  return humor === 'tamil' ? bugRoast.tamil : bugRoast.general;
}

/**
 * Returns a full FallbackRoast object by language, error log, and humor style.
 */
export function getStructuredRoast(
  language: SupportedLanguage = 'javascript',
  errorLog: string = '',
  humor: HumorStyle = 'general'
): FallbackRoast {
  const bugRoast = matchBugRoast(language, errorLog);
  const text = humor === 'tamil' ? bugRoast.tamil : bugRoast.general;

  return {
    roast: text,
    fix: bugRoast.fix || "Inspect the reported compiler or runtime error details above.",
    mood: bugRoast.mood || 'facepalm',
    gifKeyword: bugRoast.gifKeyword || (humor === 'tamil' ? 'tamil comedy confused' : 'debugging')
  };
}

/**
 * Returns string success joke by language and humor style.
 */
export function getSuccessJoke(
  language: SupportedLanguage = 'javascript',
  humor: HumorStyle = 'general'
): string {
  const specificList = languageSpecificSuccess[language];
  const useSpecific = specificList && specificList.length > 0 && Math.random() < 0.5;
  const pool = useSpecific ? specificList! : successJokes;
  const chosen = pool[Math.floor(Math.random() * pool.length)];

  return humor === 'tamil' ? chosen.tamil : chosen.general;
}

/**
 * Returns a full FallbackRoast object for success by language and humor style.
 */
export function getStructuredSuccess(
  language: SupportedLanguage = 'javascript',
  humor: HumorStyle = 'general'
): FallbackRoast {
  const specificList = languageSpecificSuccess[language];
  const useSpecific = specificList && specificList.length > 0 && Math.random() < 0.5;
  const pool = useSpecific ? specificList! : successJokes;
  const chosen = pool[Math.floor(Math.random() * pool.length)];

  return {
    roast: humor === 'tamil' ? chosen.tamil : chosen.general,
    fix: chosen.fix || "Ready for the next challenge.",
    mood: chosen.mood || 'genius',
    gifKeyword: chosen.gifKeyword || (humor === 'tamil' ? 'tamil success attitude' : 'victory')
  };
}
