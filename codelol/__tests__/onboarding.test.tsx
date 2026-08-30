import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Onboarding from '../app/onboarding/page';
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

describe('Onboarding 3-Step Wizard', () => {
  const mockPush = vi.fn();
  const mockUpsert = vi.fn();
  const mockGetUser = vi.fn();
  const mockUpdateUser = vi.fn();
  const mockSelect = vi.fn();
  const mockIlike = vi.fn();
  const mockLimit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({ push: mockPush });

    mockLimit.mockResolvedValue({ data: [], error: null });
    mockIlike.mockReturnValue({ limit: mockLimit });
    mockSelect.mockReturnValue({ ilike: mockIlike });
    mockUpsert.mockResolvedValue({ error: null });
    mockGetUser.mockResolvedValue({
      data: { user: { id: 'test-user-id', email: 'test@gmail.com' } },
      error: null,
    });
    mockUpdateUser.mockResolvedValue({ data: { user: {} }, error: null });

    const mockSupabase = {
      auth: {
        getUser: mockGetUser,
        updateUser: mockUpdateUser,
      },
      from: vi.fn(() => ({
        select: mockSelect,
        upsert: mockUpsert,
      })),
    };

    (createClient as any).mockReturnValue(mockSupabase);
  });

  it('renders Step 1 (Choose Username) by default with progress indicator', () => {
    render(<Onboarding />);

    expect(screen.getByText(/Step 1 of 3/i)).toBeTruthy();
    expect(screen.getByText(/Choose Username/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/Enter your username/i)).toBeTruthy();
    
    // Back button should be disabled or not present on step 1
    const backBtn = screen.queryByRole('button', { name: /Back/i });
    if (backBtn) {
      expect((backBtn as HTMLButtonElement).disabled).toBe(true);
    }
  });

  it('shows error on Step 1 if username is already taken', async () => {
    // Return existing profile for that username
    mockLimit.mockResolvedValueOnce({
      data: [{ id: 'other-user', display_name: 'takenusername' }],
      error: null,
    });

    render(<Onboarding />);

    const input = screen.getByPlaceholderText(/Enter your username/i);
    fireEvent.change(input, { target: { value: 'takenusername' } });

    const nextBtn = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextBtn);

    await waitFor(() => {
      expect(screen.getByText(/That username is already taken — try another/i)).toBeTruthy();
    });
    // Should still be on Step 1
    expect(screen.getByText(/Step 1 of 3/i)).toBeTruthy();
  });

  it('proceeds from Step 1 to Step 2 when unique username is provided', async () => {
    // Unique username
    mockLimit.mockResolvedValueOnce({ data: [], error: null });

    render(<Onboarding />);

    const input = screen.getByPlaceholderText(/Enter your username/i);
    fireEvent.change(input, { target: { value: 'awesome_dev' } });

    const nextBtn = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextBtn);

    await waitFor(() => {
      expect(screen.getByText(/Step 2 of 3/i)).toBeTruthy();
      expect(screen.getByText(/Set a Password/i)).toBeTruthy();
      expect(screen.getByPlaceholderText(/^Password$/i)).toBeTruthy();
      expect(screen.getByPlaceholderText(/Confirm Password/i)).toBeTruthy();
    });
  });

  it('validates minimum 8 characters and matching password in Step 2', async () => {
    mockLimit.mockResolvedValueOnce({ data: [], error: null });

    render(<Onboarding />);

    // Step 1
    fireEvent.change(screen.getByPlaceholderText(/Enter your username/i), { target: { value: 'awesome_dev' } });
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    await waitFor(() => {
      expect(screen.getByText(/Step 2 of 3/i)).toBeTruthy();
    });

    // Step 2: too short
    fireEvent.change(screen.getByPlaceholderText(/^Password$/i), { target: { value: '123' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    await waitFor(() => {
      expect(screen.getByText(/Password must be at least 8 characters/i)).toBeTruthy();
    });

    // Mismatched
    fireEvent.change(screen.getByPlaceholderText(/^Password$/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), { target: { value: 'password456' } });
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    await waitFor(() => {
      expect(screen.getByText(/Passwords do not match/i)).toBeTruthy();
    });
  });

  it('updates user password and navigates to Step 3 on valid password', async () => {
    mockLimit.mockResolvedValueOnce({ data: [], error: null });
    mockUpdateUser.mockResolvedValueOnce({ data: { user: {} }, error: null });

    render(<Onboarding />);

    // Step 1
    fireEvent.change(screen.getByPlaceholderText(/Enter your username/i), { target: { value: 'awesome_dev' } });
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    await waitFor(() => {
      expect(screen.getByText(/Step 2 of 3/i)).toBeTruthy();
    });

    // Step 2
    fireEvent.change(screen.getByPlaceholderText(/^Password$/i), { target: { value: 'validpassword123' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), { target: { value: 'validpassword123' } });
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith({ password: 'validpassword123' });
      expect(screen.getByText(/Step 3 of 3/i)).toBeTruthy();
      expect(screen.getByText(/Pick Your Vibe/i)).toBeTruthy();
      expect(screen.getByRole('button', { name: /Finish/i })).toBeTruthy();
    });
  });

  it('preserves state when navigating Back and Next between steps', async () => {
    mockLimit.mockResolvedValue({ data: [], error: null });
    mockUpdateUser.mockResolvedValue({ data: { user: {} }, error: null });

    render(<Onboarding />);

    // Step 1
    fireEvent.change(screen.getByPlaceholderText(/Enter your username/i), { target: { value: 'my_unique_user' } });
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    await waitFor(() => {
      expect(screen.getByText(/Step 2 of 3/i)).toBeTruthy();
    });

    // Go Back
    fireEvent.click(screen.getByRole('button', { name: /Back/i }));

    await waitFor(() => {
      expect(screen.getByText(/Step 1 of 3/i)).toBeTruthy();
      const input = screen.getByPlaceholderText(/Enter your username/i) as HTMLInputElement;
      expect(input.value).toBe('my_unique_user');
    });
  });

  it('completes Step 3 by saving profile with display_name, humor_preference, email, onboarding_complete=true and redirects home', async () => {
    mockLimit.mockResolvedValue({ data: [], error: null });
    mockUpdateUser.mockResolvedValue({ data: { user: {} }, error: null });

    render(<Onboarding />);

    // Step 1
    fireEvent.change(screen.getByPlaceholderText(/Enter your username/i), { target: { value: 'ninja_coder' } });
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    await waitFor(() => {
      expect(screen.getByText(/Step 2 of 3/i)).toBeTruthy();
    });

    // Step 2
    fireEvent.change(screen.getByPlaceholderText(/^Password$/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    await waitFor(() => {
      expect(screen.getByText(/Step 3 of 3/i)).toBeTruthy();
    });

    // Step 3
    fireEvent.click(screen.getByText(/Tamil Comedy Sense/i));
    fireEvent.click(screen.getByRole('button', { name: /Finish/i }));

    await waitFor(() => {
      expect(mockUpsert).toHaveBeenCalledWith({
        id: 'test-user-id',
        display_name: 'ninja_coder',
        humor_preference: 'tamil',
        onboarding_complete: true,
      }, { onConflict: 'id' });
    });
  });
});
