// agent-notes: { ctx: "Unit tests for /api/run route covering auth, body bounds, rate limiting, and execution", deps: ["@/app/api/run/route"], state: active, last: "tara@2026-10-16" }
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { POST } from '../app/api/run/route';
import { createClient } from '@/lib/supabase/server';
import { checkUserRateLimit } from '@/lib/userRateLimit';

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}));

vi.mock('@/lib/userRateLimit', () => ({
  checkUserRateLimit: vi.fn(),
}));

describe('/api/run route', () => {
  const originalEnv = process.env.ONLINECOMPILER_API_KEY;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.ONLINECOMPILER_API_KEY = 'test-api-key';
  });

  afterEach(() => {
    process.env.ONLINECOMPILER_API_KEY = originalEnv;
  });

  const createRequest = (body: any) => {
    return new Request('http://localhost:3000/api/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  };

  it('returns 401 when user is not authenticated', async () => {
    (createClient as any).mockResolvedValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: null }, error: new Error('No session') }),
      },
    });

    const req = createRequest({ language: 'python', code: 'print(1)' });
    const res = await POST(req);

    expect(res.status).toBe(401);
    const data = await res.json();
    expect(data.error).toContain('Unauthorized');
  });

  it('returns 400 when language is javascript indicating client-side execution', async () => {
    (createClient as any).mockResolvedValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'user-123' } }, error: null }),
      },
    });

    const req = createRequest({ language: 'javascript', code: 'console.log(1)' });
    const res = await POST(req);

    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain('JavaScript must execute client-side in the browser');
  });

  it('returns 400 when language is missing or unsupported', async () => {
    (createClient as any).mockResolvedValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'user-123' } }, error: null }),
      },
    });

    const req = createRequest({ language: 'brainfuck', code: '+++++' });
    const res = await POST(req);

    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain('not supported');
  });

  it('returns 400 when code exceeds 20,000 character limit', async () => {
    (createClient as any).mockResolvedValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'user-123' } }, error: null }),
      },
    });

    const longCode = 'a'.repeat(20005);
    const req = createRequest({ language: 'python', code: longCode });
    const res = await POST(req);

    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain('exceeds maximum allowed size');
  });

  it('returns 429 when rate limit is exceeded', async () => {
    (createClient as any).mockResolvedValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'user-123' } }, error: null }),
      },
    });
    (checkUserRateLimit as any).mockResolvedValue({
      allowed: false,
      error: 'Rate limit exceeded 🐢',
    });

    const req = createRequest({ language: 'python', code: 'print("hello")' });
    const res = await POST(req);

    expect(res.status).toBe(429);
    const data = await res.json();
    expect(data.error).toContain('Rate limit exceeded');
  });

  it('calls OnlineCompiler API and returns output when authorized and within bounds', async () => {
    (createClient as any).mockResolvedValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'user-123' } }, error: null }),
      },
    });
    (checkUserRateLimit as any).mockResolvedValue({ allowed: true });

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue({ output: 'Hello World\n', error: '' }),
    });
    global.fetch = mockFetch;

    const req = createRequest({ language: 'python', code: 'print("Hello World")' });
    const res = await POST(req);

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.output).toBe('Hello World\n');
  });
});
