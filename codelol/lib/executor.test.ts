import { describe, it, expect, vi, beforeEach } from 'vitest';
import { executeCode } from './executor';

describe('executeCode', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it('should execute javascript code correctly', async () => {
    const result = await executeCode('javascript', 'console.log("hello js");');
    expect(result.output).toContain('hello js');
  });

  it('should execute python code by calling /api/run', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ output: 'hello python\n', error: '' })
    });
    const result = await executeCode('python', 'print("hello python")');
    expect(result.output).toContain('hello python');
    expect(global.fetch).toHaveBeenCalledWith('/api/run', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({ language: 'python', code: 'print("hello python")' })
    }));
  });

  it('should capture python errors from /api/run', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ output: '', error: 'python error' })
    });
    const result = await executeCode('python', 'raise Exception("python error")');
    expect(result.error).toContain('python error');
  });

  it('should return network errors if fetch fails', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));
    const result = await executeCode('python', 'print(1)');
    expect(result.error).toContain('Failed to execute code');
  });
});
