import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('POST /api/run', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.ONLINECOMPILER_API_KEY = 'test_key';
  });

  it('should return 400 for javascript', async () => {
    const req = new Request('http://localhost/api/run', {
      method: 'POST',
      body: JSON.stringify({ language: 'javascript', code: 'console.log(1)' })
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain('External execution is disabled for javascript');
  });

  it('should map python to python-3.14 and return output', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ output: 'hello python', error: '' })
    });

    const req = new Request('http://localhost/api/run', {
      method: 'POST',
      body: JSON.stringify({ language: 'python', code: 'print("hello python")' })
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    
    expect(mockFetch).toHaveBeenCalledTimes(1);
    const callArgs = mockFetch.mock.calls[0];
    expect(callArgs[0]).toBe('https://api.onlinecompiler.io/api/run-code/');
    expect(callArgs[1].headers).toHaveProperty('Authorization');
    const parsedBody = JSON.parse(callArgs[1].body);
    expect(parsedBody.compiler).toBe('python-3.14');
    expect(parsedBody.code).toBe('print("hello python")');
    expect(data.output).toBe('hello python');
  });

  it('should retry once on 429 and return friendly error if it fails again', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 429
    });

    const req = new Request('http://localhost/api/run', {
      method: 'POST',
      body: JSON.stringify({ language: 'c', code: 'test' })
    });
    
    // Mock setTimeout to speed up the test
    vi.useFakeTimers();
    const promise = POST(req);
    // Fast-forward wait time
    await vi.runAllTimersAsync();
    const res = await promise;
    vi.useRealTimers();

    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(res.status).toBe(500); // Or 429
    const data = await res.json();
    expect(data.error).toBe('Too many people compiling right now — try again in a few seconds.');
  });
  it('should timeout if it takes longer than 30 seconds', async () => {
    mockFetch.mockImplementation(async (url: any, options: any) => {
      return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          resolve({ ok: true, json: async () => ({}) });
        }, 35000);
        
        if (options?.signal) {
          options.signal.addEventListener('abort', () => {
            clearTimeout(timeoutId);
            const err = new Error('The operation was aborted');
            err.name = 'AbortError';
            reject(err);
          });
        }
      });
    });

    const req = new Request('http://localhost/api/run', {
      method: 'POST',
      body: JSON.stringify({ language: 'cpp', code: 'test' })
    });
    
    vi.useFakeTimers();
    const promise = POST(req);
    await vi.runAllTimersAsync();
    const res = await promise;
    vi.useRealTimers();

    expect(res.status).toBe(504); // or 500
    const data = await res.json();
    expect(data.error).toBe('Compilation timed out. Try simpler code.');
  });
});
