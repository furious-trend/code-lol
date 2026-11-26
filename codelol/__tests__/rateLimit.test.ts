import { describe, it, expect, vi, beforeEach } from 'vitest';
import { checkRateLimit, checkGuestRateLimit, RATE_LIMIT_ERROR } from '../lib/rateLimit';
import { createClient } from '@/lib/supabase/server';

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}));

describe('Supabase checkRateLimit', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns success: true when RPC returns true', async () => {
    const mockRpc = vi.fn().mockResolvedValue({ data: true, error: null });
    const mockSupabase = { rpc: mockRpc };

    const result = await checkRateLimit(mockSupabase, '/api/run', 10, 60);

    expect(result.allowed).toBe(true);
    expect(result.success).toBe(true);
    expect(mockRpc).toHaveBeenCalledWith('check_rate_limit', {
      p_route: '/api/run',
      p_max: 10,
      p_window_seconds: 60,
    });
  });

  it('returns success: false and friendly error message when RPC returns false', async () => {
    const mockRpc = vi.fn().mockResolvedValue({ data: false, error: null });
    const mockSupabase = { rpc: mockRpc };

    const result = await checkRateLimit(mockSupabase, '/api/roast', 10, 60);

    expect(result.allowed).toBe(false);
    expect(result.success).toBe(false);
    expect(result.error).toBe(RATE_LIMIT_ERROR);
    expect(result.error).toContain('Slow down! Too many requests, try again in a minute 🐢');
  });

  it('returns success: false and friendly error message when RPC returns an error', async () => {
    const mockRpc = vi.fn().mockResolvedValue({ data: null, error: new Error('DB error') });
    const mockSupabase = { rpc: mockRpc };

    const result = await checkRateLimit(mockSupabase, '/api/run', 10, 60);

    expect(result.allowed).toBe(false);
    expect(result.success).toBe(false);
    expect(result.error).toBe(RATE_LIMIT_ERROR);
  });

  it('creates client when route string is passed without client', async () => {
    const mockRpc = vi.fn().mockResolvedValue({ data: true, error: null });
    (createClient as any).mockResolvedValue({ rpc: mockRpc });

    const result = await checkRateLimit('/api/roast', 10, 60);

    expect(result.allowed).toBe(true);
    expect(result.success).toBe(true);
    expect(createClient).toHaveBeenCalled();
    expect(mockRpc).toHaveBeenCalledWith('check_rate_limit', {
      p_route: '/api/roast',
      p_max: 10,
      p_window_seconds: 60,
    });
  });
});

describe('checkGuestRateLimit (in-memory guest throttling)', () => {
  it('allows guest requests up to maxRequests and blocks when exceeded', () => {
    const key = `guest-test-${Date.now()}-${Math.random()}`;
    expect(checkGuestRateLimit(key, 2, 60_000).allowed).toBe(true);
    expect(checkGuestRateLimit(key, 2, 60_000).allowed).toBe(true);

    const blocked = checkGuestRateLimit(key, 2, 60_000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.success).toBe(false);
    expect(blocked.error).toBe(RATE_LIMIT_ERROR);
  });

  it('resets guest bucket once window expires', () => {
    vi.useFakeTimers();
    try {
      const key = 'guest-window-reset';
      expect(checkGuestRateLimit(key, 1, 1000).allowed).toBe(true);
      expect(checkGuestRateLimit(key, 1, 1000).allowed).toBe(false);

      vi.advanceTimersByTime(1100);
      expect(checkGuestRateLimit(key, 1, 1000).allowed).toBe(true);
    } finally {
      vi.useRealTimers();
    }
  });
});
