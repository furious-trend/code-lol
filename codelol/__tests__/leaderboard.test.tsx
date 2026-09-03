import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Leaderboard from '../app/leaderboard/page';
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

describe('Leaderboard Page', () => {
  const mockSelect = vi.fn();
  const mockOrder = vi.fn();
  const mockLimit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    const mockSupabase = {
      from: vi.fn().mockReturnValue({
        select: mockSelect.mockReturnValue({
          order: mockOrder.mockReturnValue({
            limit: mockLimit,
          })
        })
      }),
    };
    (createClient as any).mockReturnValue(mockSupabase);
  });

  it('shows loading state initially', () => {
    mockLimit.mockResolvedValueOnce({ data: [], error: null });
    render(<Leaderboard />);
    expect(screen.getByTestId('leaderboard-loading')).toBeDefined();
  });

  it('renders a list of users successfully', async () => {
    const mockUsers = [
      { id: '1', display_name: 'Alice', rank_points: 1200 },
      { id: '2', display_name: 'Bob', rank_points: 950 },
    ];
    mockLimit.mockResolvedValueOnce({ data: mockUsers, error: null });

    render(<Leaderboard />);

    await waitFor(() => {
      expect(screen.queryByTestId('leaderboard-loading')).toBeNull();
    });

    expect(screen.getByText('Alice')).toBeDefined();
    expect(screen.getByText('1200')).toBeDefined();
    expect(screen.getByText('Bob')).toBeDefined();
    expect(screen.getByText('950')).toBeDefined();
  });

  it('shows empty state when no users exist', async () => {
    mockLimit.mockResolvedValueOnce({ data: [], error: null });

    render(<Leaderboard />);

    await waitFor(() => {
      expect(screen.getByText(/No players found/i)).toBeDefined();
    });
  });

  it('shows error message if fetch fails', async () => {
    mockLimit.mockResolvedValueOnce({ data: null, error: { message: 'Database connection failed' } });

    render(<Leaderboard />);

    await waitFor(() => {
      expect(screen.getByText(/Database connection failed/i)).toBeDefined();
    });
  });
});
