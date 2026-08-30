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

  it('redirects to /onboarding for a brand new Google user (no profile found)', async () => {
    mockExchangeCodeForSession.mockResolvedValueOnce({
      error: null,
      data: { session: { user: { id: 'new-user-id', email: 'new@gmail.com' } } },
    });

    mockSingle.mockResolvedValueOnce({
      data: null,
      error: { message: 'Not found' },
    });

    const request = new Request('http://localhost:3000/auth/callback?code=mock-code&next=/');
    await GET(request);

    expect(mockExchangeCodeForSession).toHaveBeenCalledWith('mock-code');
    expect(NextResponse.redirect).toHaveBeenCalledWith('http://localhost:3000/onboarding');
  });

  it('redirects to /onboarding for a user with onboarding_complete = false', async () => {
    mockExchangeCodeForSession.mockResolvedValueOnce({
      error: null,
      data: { session: { user: { id: 'incomplete-user-id', email: 'incomplete@gmail.com' } } },
    });

    mockSingle.mockResolvedValueOnce({
      data: { onboarding_complete: false },
      error: null,
    });

    const request = new Request('http://localhost:3000/auth/callback?code=mock-code&next=/');
    await GET(request);

    expect(mockExchangeCodeForSession).toHaveBeenCalledWith('mock-code');
    expect(NextResponse.redirect).toHaveBeenCalledWith('http://localhost:3000/onboarding');
  });

  it('redirects to the next param (or home) for returning user with onboarding_complete = true', async () => {
    mockExchangeCodeForSession.mockResolvedValueOnce({
      error: null,
      data: { session: { user: { id: 'returning-user-id', email: 'user@gmail.com' } } },
    });

    mockSingle.mockResolvedValueOnce({
      data: { onboarding_complete: true },
      error: null,
    });

    const request = new Request('http://localhost:3000/auth/callback?code=mock-code&next=/dashboard');
    await GET(request);

    expect(mockExchangeCodeForSession).toHaveBeenCalledWith('mock-code');
    expect(NextResponse.redirect).toHaveBeenCalledWith('http://localhost:3000/dashboard');
  });

  it('redirects to auth-code-error if code exchange fails', async () => {
    mockExchangeCodeForSession.mockResolvedValueOnce({
      error: new Error('Invalid code'),
    });

    const request = new Request('http://localhost:3000/auth/callback?code=mock-code');
    await GET(request);

    expect(NextResponse.redirect).toHaveBeenCalledWith('http://localhost:3000/auth/auth-code-error');
  });
});
