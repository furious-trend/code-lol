import { 
  getRandomFallback, 
  generalRoastFallbacks, 
  tamilRoastFallbacks, 
  generalProudFallbacks, 
  tamilProudFallbacks,
  FallbackRoast,
  getRoastByLanguageAndError,
  getSuccessJoke,
  languageRoastPools
} from '../lib/fallbackRoasts';
import { describe, it, expect } from 'vitest';

describe('fallbackRoasts', () => {
  it('should have 4 distinct arrays', () => {
    expect(Array.isArray(generalRoastFallbacks)).toBe(true);
    expect(Array.isArray(tamilRoastFallbacks)).toBe(true);
    expect(Array.isArray(generalProudFallbacks)).toBe(true);
    expect(Array.isArray(tamilProudFallbacks)).toBe(true);
    
    expect(generalRoastFallbacks.length).toBeGreaterThan(0);
    expect(tamilRoastFallbacks.length).toBeGreaterThan(0);
    expect(generalProudFallbacks.length).toBeGreaterThan(0);
    expect(tamilProudFallbacks.length).toBe(30); // Expected exactly 30 specific fallbacks
    expect(tamilProudFallbacks.some(f => f.roast.includes("Bloody sweet... output vandhuruchu da!"))).toBe(true);
  });

  describe('getRandomFallback', () => {
    it('returns from generalRoastFallbacks when isSuccess=false and humorPref=general', () => {
      const result = getRandomFallback(false, 'general');
      expect(generalRoastFallbacks).toContainEqual(result);
    });

    it('returns from tamilRoastFallbacks when isSuccess=false and humorPref=tamil', () => {
      const result = getRandomFallback(false, 'tamil');
      expect(tamilRoastFallbacks).toContainEqual(result);
    });

    it('returns from generalProudFallbacks when isSuccess=true and humorPref=general', () => {
      const result = getRandomFallback(true, 'general');
      expect(generalProudFallbacks).toContainEqual(result);
    });

    it('returns from tamilProudFallbacks when isSuccess=true and humorPref=tamil', () => {
      const result = getRandomFallback(true, 'tamil');
      expect(tamilProudFallbacks).toContainEqual(result);
    });
    
    it('defaults to general if humorPref is missing or invalid', () => {
      const resultFalse = getRandomFallback(false, 'invalid' as any);
      expect(generalRoastFallbacks).toContainEqual(resultFalse);
      
      const resultTrue = getRandomFallback(true, 'invalid' as any);
      expect(generalProudFallbacks).toContainEqual(resultTrue);
    });

    it('returns a syntax error roast if errorType is syntax', () => {
      const result = getRandomFallback(false, 'tamil', 'syntax');
      expect(result.errorType).toBe('syntax');
      expect(tamilRoastFallbacks).toContainEqual(result);
    });

    it('returns a runtime error roast if errorType is runtime', () => {
      const result = getRandomFallback(false, 'tamil', 'runtime');
      expect(result.errorType).toBe('runtime');
      expect(tamilRoastFallbacks).toContainEqual(result);
    });

    it('returns a logic error roast if errorType is logic', () => {
      const result = getRandomFallback(false, 'tamil', 'logic');
      expect(result.errorType).toBe('logic');
      expect(tamilRoastFallbacks).toContainEqual(result);
    });

    it('delegates to language-specific pool when language is provided', () => {
      const pyRoast = getRandomFallback(false, 'tamil', undefined, 'python', 'IndentationError: unexpected indent');
      expect(pyRoast.roast).toContain('Indentation-la oru edathula 2 space');

      const success = getRandomFallback(true, 'general', undefined, 'c');
      expect(typeof success.roast).toBe('string');
      expect(success.roast.length).toBeGreaterThan(10);
    });
  });

  describe('getRoastByLanguageAndError (Technical Error Matching)', () => {
    it('matches Python IndentationError and SyntaxError accurately', () => {
      const indentEn = getRoastByLanguageAndError('python', 'IndentationError: unindent does not match', 'general');
      expect(indentEn).toBe(languageRoastPools.python.specificErrors.IndentationError.general);

      const colonTa = getRoastByLanguageAndError('python', 'SyntaxError: expected \':\'', 'tamil');
      expect(colonTa).toBe(languageRoastPools.python.specificErrors.SyntaxError.tamil);

      const typeTa = getRoastByLanguageAndError('python', 'TypeError: can only concatenate str to str', 'tamil');
      expect(typeTa).toBe(languageRoastPools.python.specificErrors.TypeError.tamil);

      const indexEn = getRoastByLanguageAndError('python', 'IndexError: list index out of range', 'general');
      expect(indexEn).toBe(languageRoastPools.python.specificErrors.IndexError.general);

      const zeroTa = getRoastByLanguageAndError('python', 'ZeroDivisionError: division by zero', 'tamil');
      expect(zeroTa).toBe(languageRoastPools.python.specificErrors.ZeroDivisionError.tamil);
    });

    it('matches C Segmentation Fault and Buffer Overflow', () => {
      const segEn = getRoastByLanguageAndError('c', 'Segmentation fault (core dumped)', 'general');
      expect(segEn).toBe(languageRoastPools.c.specificErrors.SegmentationFault.general);

      const semiTa = getRoastByLanguageAndError('c', 'error: expected \';\' before return', 'tamil');
      expect(semiTa).toBe(languageRoastPools.c.specificErrors.MissingSemicolon.tamil);

      const stackTa = getRoastByLanguageAndError('c', '*** stack smashing detected ***', 'tamil');
      expect(stackTa).toBe(languageRoastPools.c.specificErrors.ArrayBufferOverflow.tamil);
    });

    it('matches C++ Undefined Reference and Dangling Pointer', () => {
      const linkEn = getRoastByLanguageAndError('cpp', 'undefined reference to `solve()` ld returned 1 exit status', 'general');
      expect(linkEn).toBe(languageRoastPools.cpp.specificErrors.UndefinedReference.general);

      const freeTa = getRoastByLanguageAndError('cpp', 'free(): double free detected in tcache 2', 'tamil');
      expect(freeTa).toBe(languageRoastPools.cpp.specificErrors.DanglingPointer.tamil);
    });

    it('matches Java NullPointerException and Missing Main Method', () => {
      const npeTa = getRoastByLanguageAndError('java', 'java.lang.NullPointerException at Main.run', 'tamil');
      expect(npeTa).toBe(languageRoastPools.java.specificErrors.NullPointerException.tamil);

      const mainEn = getRoastByLanguageAndError('java', 'Main method not found in class Main', 'general');
      expect(mainEn).toBe(languageRoastPools.java.specificErrors.MissingMainMethod.general);
    });

    it('matches JavaScript Cannot read properties of undefined and Accidental NaN', () => {
      const undefTa = getRoastByLanguageAndError('javascript', 'TypeError: Cannot read properties of undefined (reading \'map\')', 'tamil');
      expect(undefTa).toBe(languageRoastPools.javascript.specificErrors.CannotReadUndefined.tamil);

      const nanEn = getRoastByLanguageAndError('javascript', 'Result was NaN', 'general');
      expect(nanEn).toBe(languageRoastPools.javascript.specificErrors.AccidentalNaN.general);
    });
  });

  describe('getSuccessJoke', () => {
    it('returns engineering applause lines in general and tamil', () => {
      const en = getSuccessJoke('python', 'general');
      expect(typeof en).toBe('string');
      expect(en.length).toBeGreaterThan(15);

      const ta = getSuccessJoke('cpp', 'tamil');
      expect(typeof ta).toBe('string');
      expect(ta.length).toBeGreaterThan(15);
    });
  });
});
