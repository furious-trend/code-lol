import { 
  getRandomFallback, 
  generalRoastFallbacks, 
  tamilRoastFallbacks, 
  generalProudFallbacks, 
  tamilProudFallbacks,
  FallbackRoast
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
  });
});
