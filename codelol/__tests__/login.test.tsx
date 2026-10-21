// agent-notes: { ctx: "Login page unit tests for Sign In, Sign Up, and OTP verification", deps: ["@/app/login/page.tsx"], state: active, last: "tara@2026-10-14" }
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Login from '../app/login/page';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

// Mock the Next.js router
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(() => ({
    get: vi.fn((key: string) => (key === 'next' ? '/' : null)),
  })),
}));

// Mock Supabase client
vi.mock('@/lib/supabase/client', () => ({
  createClient: vi.fn(),
}));

// Mock framer-motion to skip animations
vi.mock('framer-motion', () => {
  const React = require('react');
  const motion = new Proxy({}, {
    get: (_t: unknown, tag: string) =>
      ({ children, ...props }: Record<string, unknown>) =>
        React.createElement(tag, props, children),
  });
  return { motion, AnimatePresence: ({ children }: { children: unknown }) => children };
});

// Mock Bugsy
vi.mock('@/components/Bugsy', () => ({
  Bugsy: () => <div data-testid="bugsy" />
}));

describe('Login Page', () => {
  const mockPush = vi.fn();
  const mockRefresh = vi.fn();
  const mockSignInWithOAuth = vi.fn();
  const mockSignInWithOtp = vi.fn();
  const mockVerifyOtp = vi.fn();
  let mockProfileQueryResult: any = null;

  beforeEach(() => {
    vi.clearAllMocks();
    mockProfileQueryResult = null;
    (useRouter as any).mockReturnValue({ push: mockPush, refresh: mockRefresh });
    
    const mockSupabase = {
      auth: {
        signInWithOAuth: mockSignInWithOAuth,
        signInWithOtp: mockSignInWithOtp,
        verifyOtp: mockVerifyOtp,
      },
      from: vi.fn(() => ({
        select: vi.fn(() => ({
          ilike: vi.fn(() => ({
            maybeSingle: vi.fn().mockImplementation(() => Promise.resolve({ data: mockProfileQueryResult, error: null })),
          })),
          or: vi.fn(() => ({
            maybeSingle: vi.fn().mockImplementation(() => Promise.resolve({ data: mockProfileQueryResult, error: null })),
          })),
        })),
      })),
    };
    (createClient as any).mockReturnValue(mockSupabase);
  });

  it('renders Sign In tab by default with Google button and identifier input', () => {
    render(<Login />);
    expect(screen.getByRole('button', { name: /^Sign In$/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /^Sign Up$/i })).toBeTruthy();
    expect(screen.getByPlaceholderText(/name@example.com or username/i)).toBeTruthy();
    expect(screen.getByText(/Continue with Google/i)).toBeTruthy();
  });

  it('switches between Sign In and Sign Up tabs', () => {
    render(<Login />);
    const signUpTab = screen.getByRole('button', { name: /^Sign Up$/i });
    fireEvent.click(signUpTab);

    expect(screen.getByPlaceholderText(/name@example.com/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/coolcoder123/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeTruthy();
  });

  it('shows error if username does not exist', async () => {
    mockProfileQueryResult = null;

    render(<Login />);
    const input = screen.getByPlaceholderText(/name@example.com or username/i);
    // Use a username (no '@') — triggers profiles DB lookup
    fireEvent.change(input, { target: { value: 'unknownuser' } });
    fireEvent.click(screen.getByRole('button', { name: /Send Login Code/i }));

    await waitFor(() => {
      expect(screen.getByText(/User does not exist. Please sign up first./i)).toBeTruthy();
    });
    expect(mockSignInWithOtp).not.toHaveBeenCalled();
  });

  it('shows error if email user does not exist (Supabase auth rejects)', async () => {
    mockSignInWithOtp.mockResolvedValueOnce({
      error: { message: 'Signups not allowed for otp' }
    });

    render(<Login />);
    const input = screen.getByPlaceholderText(/name@example.com or username/i);
    fireEvent.change(input, { target: { value: 'nonexistent@test.com' } });
    fireEvent.click(screen.getByRole('button', { name: /Send Login Code/i }));

    await waitFor(() => {
      expect(screen.getByText(/User does not exist. Please sign up first./i)).toBeTruthy();
    });
  });

  it('signs in existing user and sends OTP with shouldCreateUser: false', async () => {
    mockProfileQueryResult = { id: 'user-123', email: 'existing@test.com' };
    mockSignInWithOtp.mockResolvedValueOnce({ error: null });

    render(<Login />);
    const input = screen.getByPlaceholderText(/name@example.com or username/i);
    fireEvent.change(input, { target: { value: 'existing@test.com' } });
    fireEvent.click(screen.getByRole('button', { name: /Send Login Code/i }));

    await waitFor(() => {
      expect(mockSignInWithOtp).toHaveBeenCalledWith({
        email: 'existing@test.com',
        options: {
          shouldCreateUser: false,
          emailRedirectTo: expect.stringContaining('/auth/callback'),
        },
      });
    });

    // Should transition to OTP screen
    expect(await screen.findByPlaceholderText(/12345678/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /Verify & Sign In/i })).toBeTruthy();
  });

  it('shows error if user tries to sign up with an email that already exists', async () => {
    mockProfileQueryResult = { id: 'user-123', email: 'taken@test.com' };

    render(<Login />);
    // Switch to Sign Up tab
    fireEvent.click(screen.getByRole('button', { name: /^Sign Up$/i }));

    const emailInput = screen.getByPlaceholderText(/name@example.com/i);
    fireEvent.change(emailInput, { target: { value: 'taken@test.com' } });
    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

    await waitFor(() => {
      expect(screen.getByText(/An account with this email already exists. Please sign in./i)).toBeTruthy();
    });
    expect(mockSignInWithOtp).not.toHaveBeenCalled();
  });

  it('signs up new user with shouldCreateUser: true', async () => {
    mockProfileQueryResult = null;
    mockSignInWithOtp.mockResolvedValueOnce({ error: null });

    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: /^Sign Up$/i }));

    const emailInput = screen.getByPlaceholderText(/name@example.com/i);
    fireEvent.change(emailInput, { target: { value: 'newuser@test.com' } });

    const usernameInput = screen.getByPlaceholderText(/coolcoder123/i);
    fireEvent.change(usernameInput, { target: { value: 'myuser' } });

    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

    await waitFor(() => {
      expect(mockSignInWithOtp).toHaveBeenCalledWith({
        email: 'newuser@test.com',
        options: {
          shouldCreateUser: true,
          data: { username: 'myuser' },
          emailRedirectTo: expect.stringContaining('/auth/callback?intent=signup'),
        },
      });
    });

    expect(await screen.findByPlaceholderText(/12345678/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /Verify & Create Account/i })).toBeTruthy();
  });

  it('verifies OTP code and redirects on success', async () => {
    mockProfileQueryResult = { id: 'user-123', email: 'coder@test.com' };
    mockSignInWithOtp.mockResolvedValueOnce({ error: null });
    mockVerifyOtp.mockResolvedValueOnce({ data: { session: {} }, error: null });

    render(<Login />);

    // Sign in
    const input = screen.getByPlaceholderText(/name@example.com or username/i);
    fireEvent.change(input, { target: { value: 'coder@test.com' } });
    fireEvent.click(screen.getByRole('button', { name: /Send Login Code/i }));

    // Verify OTP
    const otpInput = await screen.findByPlaceholderText(/12345678/i);
    fireEvent.change(otpInput, { target: { value: '12345678' } });
    fireEvent.click(screen.getByRole('button', { name: /Verify & Sign In/i }));

    await waitFor(() => {
      expect(mockVerifyOtp).toHaveBeenCalledWith({
        email: 'coder@test.com',
        token: '12345678',
        type: 'email',
      });
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('calls signInWithOAuth for Google login', async () => {
    mockSignInWithOAuth.mockResolvedValueOnce({ error: null });
    
    render(<Login />);
    
    const googleButton = screen.getByText(/Continue with Google/i);
    fireEvent.click(googleButton);
    
    expect(mockSignInWithOAuth).toHaveBeenCalledWith({
      provider: 'google',
      options: {
        redirectTo: expect.stringContaining('/auth/callback'),
      },
    });
  });
});
