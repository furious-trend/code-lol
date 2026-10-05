import { describe, it, expect, vi } from 'vitest';
import { analyzeComplexity } from '../lib/complexityAnalyzer';

// Mock the Gemini API client globally
export const mockGenerateContent = vi.fn().mockResolvedValue({
  text: JSON.stringify({
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)"
  })
});

vi.mock('@google/genai', () => {
  return {
    GoogleGenAI: function(this: any) {
      this.models = { generateContent: mockGenerateContent };
    }
  };
});

describe('analyzeComplexity', () => {
  it('should parse valid JSON from the Gemini response and extract time/space complexity', async () => {
    const code = `
      function findMax(arr) {
        let max = arr[0];
        for (let i = 1; i < arr.length; i++) {
          if (arr[i] > max) max = arr[i];
        }
        return max;
      }
    `;
    const result = analyzeComplexity(code);
    expect(result).toEqual({
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    });
  });

  it('should return O(1) for empty code as fallback', () => {
    const code = ``;
    const result = analyzeComplexity(code);
    expect(result).toEqual({
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)"
    });
  });
});
