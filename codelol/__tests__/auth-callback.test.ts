import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from '../app/auth/callback/route';
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

// Mock Next.js NextResponse
vi.mock('next/server', () => {
  return {
    NextResponse: {
      redirect: vi.fn((url) => ({ status: 302, url })),
    },
  };
});

// Mock Supabase Server Client
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}));

describe('Auth Callback Route', () => {
  const mockExchangeCodeForSession = vi.fn();
  const mockSingle = vi.fn();
  const mockEq = vi.fn(() => ({ single: mockSingle }));
  const mockSelect = vi.fn(() => ({ eq: mockEq }));

  beforeEach(() => {
    vi.clearAllMocks();

    const mockSupabase = {
      auth: {
        exchangeCodeForSession: mockExchangeCodeForSession,
      },
      from: vi.fn(() => ({
        select: mockSelect,
      })),
    };

    (createClient as any).mockResolvedValue(mockSupabase);
  });

  it('redirects to /onboarding for a brand new Google user (no humor_preference)', async () => {
    // Setup code exchange success
    mockExchangeCodeForSession.mockResolvedValueOnce({
      error: null,
      data: { session: { user: { id: 'new-user-id' } } },
    });

    // Setup profile query to return no humor_preference
    mockSingle.mockResolvedValueOnce({
      data: { humor_preference: null },
      error: null,
    });

    const request = new Request('http://localhost:3000/auth/callback?code=mock-code&next=/');
    const response = await GET(request);

    expect(mockExchangeCodeForSession).toHaveBeenCalledWith('mock-code');
    expect(NextResponse.redirect).toHaveBeenCalledWith('http://localhost:3000/onboarding');
  });

  it('redirects to the next param (or home) for returning user (has humor_preference)', async () => {
    // Setup code exchange success
    mockExchangeCodeForSession.mockResolvedValueOnce({
      error: null,
      data: { session: { user: { id: 'returning-user-id' } } },
    });

    // Setup profile query to return an existing humor_preference
    mockSingle.mockResolvedValueOnce({
      data: { humor_preference: 'tamil' },
      error: null,
    });

    const request = new Request('http://localhost:3000/auth/callback?code=mock-code&next=/dashboard');
    const response = await GET(request);

    expect(mockExchangeCodeForSession).toHaveBeenCalledWith('mock-code');
    expect(NextResponse.redirect).toHaveBeenCalledWith('http://localhost:3000/dashboard');
  });

  it('redirects to auth-code-error if code exchange fails', async () => {
    // Setup code exchange failure
    mockExchangeCodeForSession.mockResolvedValueOnce({
      error: new Error('Invalid code'),
    });

    const request = new Request('http://localhost:3000/auth/callback?code=mock-code');
    const response = await GET(request);

    expect(NextResponse.redirect).toHaveBeenCalledWith('http://localhost:3000/auth/auth-code-error');
  });
});
