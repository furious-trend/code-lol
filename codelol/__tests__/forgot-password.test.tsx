import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ForgotPassword from '../app/forgot-password/page';
import { createClient } from '@/lib/supabase/client';

// Mock Supabase client
vi.mock('@/lib/supabase/client', () => ({
  createClient: vi.fn(),
}));

// Mock framer-motion
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

describe('Forgot Password Page', () => {
  const mockResetPasswordForEmail = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    const mockSupabase = {
      auth: {
        resetPasswordForEmail: mockResetPasswordForEmail,
      },
    };
    (createClient as any).mockReturnValue(mockSupabase);
  });

  it('renders forgot password form with email input and submit button', () => {
    render(<ForgotPassword />);

    expect(screen.getByText(/Forgot Password/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /Send Reset Link/i })).toBeTruthy();
  });

  it('calls resetPasswordForEmail and shows generic confirmation message on submit', async () => {
    mockResetPasswordForEmail.mockResolvedValueOnce({ error: null });

    render(<ForgotPassword />);

    const input = screen.getByPlaceholderText(/Enter your email/i);
    fireEvent.change(input, { target: { value: 'user@example.com' } });

    const submitBtn = screen.getByRole('button', { name: /Send Reset Link/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockResetPasswordForEmail).toHaveBeenCalledWith('user@example.com', {
        redirectTo: expect.stringContaining('/reset-password'),
      });
      expect(screen.getByText(/If an account exists with that email, a reset link has been sent/i)).toBeTruthy();
    });
  });
});
