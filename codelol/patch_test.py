import sys

filename = "__tests__/fallbackRoasts.test.ts"
with open(filename, "r") as f:
    content = f.read()

# Replace imports
old_import = """import { 
  getRandomFallback, 
  generalRoastFallbacks, 
  tamilRoastFallbacks, 
  generalProudFallbacks, 
  tamilProudFallbacks 
} from '../lib/fallbackRoasts';"""
new_import = """import { 
  getRandomFallback, 
  generalRoastFallbacks, 
  tamilRoastFallbacks, 
  generalProudFallbacks, 
  tamilProudFallbacks,
  FallbackRoast
} from '../lib/fallbackRoasts';"""
content = content.replace(old_import, new_import)

old_test_end = """    it('defaults to general if humorPref is missing or invalid', () => {
      const resultFalse = getRandomFallback(false, 'invalid' as any);
      expect(generalRoastFallbacks).toContainEqual(resultFalse);
      
      const resultTrue = getRandomFallback(true, 'invalid' as any);
      expect(generalProudFallbacks).toContainEqual(resultTrue);
    });
  });
});"""

new_test_end = """    it('defaults to general if humorPref is missing or invalid', () => {
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
});"""

content = content.replace(old_test_end, new_test_end)

with open(filename, "w") as f:
    f.write(content)

print("Test Patched")
