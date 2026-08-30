import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ResetPassword from '../app/reset-password/page';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

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

describe('Reset Password Page', () => {
  const mockPush = vi.fn();
  const mockUpdateUser = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({ push: mockPush });

    const mockSupabase = {
      auth: {
        updateUser: mockUpdateUser,
      },
    };
    (createClient as any).mockReturnValue(mockSupabase);
  });

  it('renders reset password form with password and confirm password inputs', () => {
    render(<ResetPassword />);

    expect(screen.getByText(/Reset Password/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/^New Password$/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/Confirm New Password/i)).toBeTruthy();
  });

  it('validates password length and match', async () => {
    render(<ResetPassword />);

    fireEvent.change(screen.getByPlaceholderText(/^New Password$/i), { target: { value: 'short' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm New Password/i), { target: { value: 'short' } });
    fireEvent.click(screen.getByRole('button', { name: /Update Password/i }));

    await waitFor(() => {
      expect(screen.getByText(/Password must be at least 8 characters/i)).toBeTruthy();
    });

    fireEvent.change(screen.getByPlaceholderText(/^New Password$/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm New Password/i), { target: { value: 'different123' } });
    fireEvent.click(screen.getByRole('button', { name: /Update Password/i }));

    await waitFor(() => {
      expect(screen.getByText(/Passwords do not match/i)).toBeTruthy();
    });
  });

  it('calls updateUser and redirects to /login on success', async () => {
    mockUpdateUser.mockResolvedValueOnce({ data: { user: {} }, error: null });

    render(<ResetPassword />);

    fireEvent.change(screen.getByPlaceholderText(/^New Password$/i), { target: { value: 'newSecurePassword123' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm New Password/i), { target: { value: 'newSecurePassword123' } });
    fireEvent.click(screen.getByRole('button', { name: /Update Password/i }));

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith({ password: 'newSecurePassword123' });
      expect(screen.getByText(/Password updated successfully/i)).toBeTruthy();
    });
  });
});
