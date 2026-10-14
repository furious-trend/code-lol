// agent-notes: { ctx: "Login page unit tests for OAuth and Email OTP", deps: ["@/app/login/page.tsx"], state: active, last: "tara@2026-10-13" }
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Login from '../app/login/page';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

// Mock the Next.js router
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
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

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({ push: mockPush, refresh: mockRefresh });
    
    const mockSupabase = {
      auth: {
        signInWithOAuth: mockSignInWithOAuth,
        signInWithOtp: mockSignInWithOtp,
        verifyOtp: mockVerifyOtp,
      },
    };
    (createClient as any).mockReturnValue(mockSupabase);
  });

  it('renders Google login button and email input', () => {
    render(<Login />);
    expect(screen.getByText(/Continue with Google/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/name@example.com/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /Send Code/i })).toBeTruthy();
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

  it('sends OTP when email is submitted', async () => {
    mockSignInWithOtp.mockResolvedValueOnce({ error: null });

    render(<Login />);

    const emailInput = screen.getByPlaceholderText(/name@example.com/i);
    fireEvent.change(emailInput, { target: { value: 'coder@test.com' } });

    const sendButton = screen.getByRole('button', { name: /Send Code/i });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(mockSignInWithOtp).toHaveBeenCalledWith({
        email: 'coder@test.com',
        options: {
          shouldCreateUser: true,
          emailRedirectTo: expect.stringContaining('/auth/callback'),
        },
      });
    });

    // Should now show the OTP verification screen
    expect(await screen.findByPlaceholderText(/123456/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /Verify & Sign In/i })).toBeTruthy();
  });

  it('verifies OTP code and redirects on success', async () => {
    mockSignInWithOtp.mockResolvedValueOnce({ error: null });
    mockVerifyOtp.mockResolvedValueOnce({ data: { session: {} }, error: null });

    render(<Login />);

    // Step 1: Send OTP
    const emailInput = screen.getByPlaceholderText(/name@example.com/i);
    fireEvent.change(emailInput, { target: { value: 'coder@test.com' } });
    fireEvent.click(screen.getByRole('button', { name: /Send Code/i }));

    // Step 2: Enter OTP
    const otpInput = await screen.findByPlaceholderText(/123456/i);
    fireEvent.change(otpInput, { target: { value: '654321' } });

    const verifyButton = screen.getByRole('button', { name: /Verify & Sign In/i });
    fireEvent.click(verifyButton);

    await waitFor(() => {
      expect(mockVerifyOtp).toHaveBeenCalledWith({
        email: 'coder@test.com',
        token: '654321',
        type: 'email',
      });
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('displays error if signInWithOtp fails', async () => {
    mockSignInWithOtp.mockResolvedValueOnce({ error: { message: 'Rate limit exceeded' } });

    render(<Login />);

    const emailInput = screen.getByPlaceholderText(/name@example.com/i);
    fireEvent.change(emailInput, { target: { value: 'error@test.com' } });
    fireEvent.click(screen.getByRole('button', { name: /Send Code/i }));

    await waitFor(() => {
      expect(screen.getByText(/Rate limit exceeded/i)).toBeTruthy();
    });
  });

  it('displays error if verifyOtp fails', async () => {
    mockSignInWithOtp.mockResolvedValueOnce({ error: null });
    mockVerifyOtp.mockResolvedValueOnce({ data: null, error: { message: 'Invalid token' } });

    render(<Login />);

    // Send code
    const emailInput = screen.getByPlaceholderText(/name@example.com/i);
    fireEvent.change(emailInput, { target: { value: 'coder@test.com' } });
    fireEvent.click(screen.getByRole('button', { name: /Send Code/i }));

    // Verify bad code
    const otpInput = await screen.findByPlaceholderText(/123456/i);
    fireEvent.change(otpInput, { target: { value: '000000' } });
    fireEvent.click(screen.getByRole('button', { name: /Verify & Sign In/i }));

    await waitFor(() => {
      expect(screen.getByText(/Invalid token/i)).toBeTruthy();
    });
  });
});

