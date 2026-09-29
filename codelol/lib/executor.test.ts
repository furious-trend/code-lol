import { describe, it, expect } from 'vitest';
import { executeCodeInBrowser } from './executor';

describe('executeCodeInBrowser', () => {
  it('should execute javascript code correctly', async () => {
    const result = await executeCodeInBrowser('javascript', 'console.log("hello js");');
    expect(result.output).toContain('hello js');
  });

  it('should execute python code correctly using pyodide', async () => {
    // This will initially fail because python is not implemented
    const result = await executeCodeInBrowser('python', 'print("hello python")');
    expect(result.output).toContain('hello python');
  });

  it('should capture python errors', async () => {
    const result = await executeCodeInBrowser('python', 'raise Exception("python error")');
    expect(result.error).toContain('python error');
  });
});
