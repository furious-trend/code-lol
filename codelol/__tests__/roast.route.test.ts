import { POST } from '../app/api/roast/route';
import { checkRateLimit, checkGuestRateLimit } from '../lib/rateLimit';
import { createClient } from '@/lib/supabase/server';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock dependencies
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn().mockResolvedValue({
    rpc: vi.fn().mockResolvedValue({ data: true, error: null }),
  }),
}));

vi.mock('../lib/rateLimit', () => ({
  checkRateLimit: vi.fn(() => ({ success: true, allowed: true })),
  checkGuestRateLimit: vi.fn(() => ({ success: true, allowed: true })),
}));

describe('/api/roast route', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const createRequest = (body: any) => {
    return new Request('http://localhost:3000/api/roast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });
  };

  it('uses general fallback by default for errors', async () => {
    const request = createRequest({ code: 'console.log(', output: 'SyntaxError', isSuccess: false });
    const response = await POST(request);
    
    expect(response.status).toBe(200);
    const data = await response.json();
    
    expect(data).toHaveProperty('roast');
    expect(data).toHaveProperty('fix');
    expect(data).toHaveProperty('mood');
  });

  it('uses Tamil fallback when humorPref=tamil for errors', async () => {
    const request = createRequest({ code: 'console.log(', output: 'SyntaxError', isSuccess: false, humorPref: 'tamil' });
    const response = await POST(request);
    
    expect(response.status).toBe(200);
    const data = await response.json();
    
    expect(data).toHaveProperty('roast');
    expect(data).toHaveProperty('fix');
    expect(data).toHaveProperty('mood');
  });

  it('selects language-specific technical roast when language is provided', async () => {
    const request = createRequest({
      code: 'def foo():\nprint("hi")',
      output: 'IndentationError: expected an indented block',
      isSuccess: false,
      humorPref: 'tamil',
      language: 'python'
    });
    const response = await POST(request);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.roast).toContain('Indentation-la oru edathula 2 space');
  });

  it('selects engineering applause when isSuccess=true with language', async () => {
    const request = createRequest({
      code: 'int main() { return 0; }',
      output: 'Success',
      isSuccess: true,
      humorPref: 'general',
      language: 'c'
    });
    const response = await POST(request);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('roast');
    expect(typeof data.roast).toBe('string');
  });

  it('returns 429 when rate limit is exceeded with friendly error message', async () => {
    (checkRateLimit as any).mockReturnValueOnce({
      success: false,
      allowed: false,
      error: 'Slow down! Too many requests, try again in a minute 🐢',
    });

    const request = createRequest({
      code: 'console.log("flood")',
      output: '',
      isSuccess: false,
    });
    const response = await POST(request);
    expect(response.status).toBe(429);
    const data = await response.json();
    expect(data.error).toBe('Slow down! Too many requests, try again in a minute 🐢');
  });

  it('uses checkGuestRateLimit and succeeds for unauthenticated guest users under limit', async () => {
    (createClient as any).mockResolvedValueOnce({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: null }, error: null }),
      },
      rpc: vi.fn().mockResolvedValue({ data: false, error: null }),
    });
    (checkGuestRateLimit as any).mockReturnValueOnce({ success: true, allowed: true });

    const request = new Request('http://localhost:3000/api/roast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '203.0.113.1' },
      body: JSON.stringify({ code: 'console.log("hi")', output: 'hi', isSuccess: true, language: 'javascript' }),
    });
    const response = await POST(request);
    expect(response.status).toBe(200);
    expect(checkGuestRateLimit).toHaveBeenCalledWith('roast:203.0.113.1', 20, 60_000);
  });

  it('returns 429 when guest rate limit is exceeded', async () => {
    (createClient as any).mockResolvedValueOnce({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: null }, error: null }),
      },
      rpc: vi.fn().mockResolvedValue({ data: false, error: null }),
    });
    (checkGuestRateLimit as any).mockReturnValueOnce({
      success: false,
      allowed: false,
      error: 'Slow down! Too many requests, try again in a minute 🐢',
    });

    const request = new Request('http://localhost:3000/api/roast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: 'console.log("hi")', output: 'hi', isSuccess: true }),
    });
    const response = await POST(request);
    expect(response.status).toBe(429);
  });
});
