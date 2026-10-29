import { describe, it, expect, vi, beforeEach } from 'vitest';
import { executeCode, createSandboxIframe } from './executor';

describe('executeCode', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it('should execute javascript code in browser sandbox without calling /api/run', async () => {
    const result = await executeCode('javascript', 'console.log("hello js");');
    expect(result.output).toBe('hello js');
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('proves new Function is not invoked directly in parent document window', async () => {
    const appendSpy = vi.spyOn(document.body, 'appendChild');
    const iframe = createSandboxIframe();
    expect(iframe.tagName).toBe('IFRAME');
    expect(iframe.getAttribute('sandbox')).toBe('allow-scripts');
    expect(iframe.getAttribute('sandbox')).not.toContain('allow-same-origin');

    const result = await executeCode('javascript', 'console.log("sandboxed");');
    expect(result.output).toBe('sandboxed');
    expect(appendSpy).toHaveBeenCalled();
  });

  it('executes javascript assertions in sandbox', async () => {
    const result = await executeCode('javascript', 'const a = 10; const b = 20;', [
      { id: '1', code: 'a + b === 30' },
      { id: '2', code: 'a === 99' }
    ]);
    expect(result.verificationResults).toEqual([
      { id: '1', passed: true },
      { id: '2', passed: false }
    ]);
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

  it('should return network errors if fetch fails for non-JS', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));
    const result = await executeCode('python', 'print(1)');
    expect(result.error).toContain('Failed to execute code');
  });
});
