import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Onboarding from '../app/onboarding/page';
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

describe('Onboarding Page', () => {
  const mockPush = vi.fn();
  const mockUpsert = vi.fn();
  const mockGetUser = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({ push: mockPush });
    
    mockUpsert.mockResolvedValue({ error: null });

    // Setup mock supabase client
    const mockSupabase = {
      auth: {
        getUser: mockGetUser,
      },
      from: vi.fn(() => ({
        upsert: mockUpsert,
      })),
    };
    
    (createClient as any).mockReturnValue(mockSupabase);
  });

  it('renders vibe selection options', async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: { id: 'test-user-id' } }, error: null });
    
    render(<Onboarding />);
    
    expect(screen.getByText(/Pick Your Vibe/i)).toBeTruthy();
    expect(screen.getByText(/General Meme Sense/i)).toBeTruthy();
    expect(screen.getByText(/Tamil Comedy Sense/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /Continue/i })).toBeTruthy();
  });

  it('shows error if try to submit without selection', async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: { id: 'test-user-id' } }, error: null });
    
    render(<Onboarding />);
    
    const continueButton = screen.getByRole('button', { name: /Continue/i });
    fireEvent.click(continueButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Please select a vibe/i)).toBeTruthy();
    });
  });

  it('submits selected vibe and redirects to home', async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: { id: 'test-user-id' } }, error: null });
    
    render(<Onboarding />);
    
    // Select General vibe
    const generalButton = screen.getByText(/General Meme Sense/i);
    fireEvent.click(generalButton);
    
    const continueButton = screen.getByRole('button', { name: /Continue/i });
    fireEvent.click(continueButton);
    
    await waitFor(() => {
      // should upsert with general
      expect(mockUpsert).toHaveBeenCalledWith(
        { id: 'test-user-id', humor_preference: 'general' },
        { onConflict: 'id' }
      );
    });
  });
});
