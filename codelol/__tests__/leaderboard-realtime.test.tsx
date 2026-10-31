// agent-notes: { ctx: "Tests for leaderboard realtime updates, problem switching, and fallback querying", deps: ["../app/leaderboard/page", "../lib/supabase/client"], state: "active", last: "sato@2026-10-31" }
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Leaderboard from '../app/leaderboard/page';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { createClient } from '../lib/supabase/client';
import { problems } from '../lib/problems';

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion') as any;
  return {
    ...actual,
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

const { onMock, subscribeMock, removeChannelMock, eqMock, inMock } = vi.hoisted(() => ({
  onMock: vi.fn().mockReturnThis(),
  subscribeMock: vi.fn().mockReturnThis(),
  removeChannelMock: vi.fn(),
  eqMock: vi.fn(),
  inMock: vi.fn().mockResolvedValue({
    data: [{ id: 'u2', display_name: 'FallbackUser' }],
    error: null
  })
}));

vi.mock('../lib/supabase/client', () => {
  const mockClient = {
    from: vi.fn((table) => {
      if (table === 'problem_completions') {
        return {
          select: vi.fn(() => ({
            eq: vi.fn(() => ({
              order: vi.fn(() => ({
                limit: eqMock
              }))
            }))
          }))
        };
      }
      return {
        select: vi.fn(() => ({
          order: vi.fn(() => ({
            limit: vi.fn().mockResolvedValue({
              data: [{ id: '1', display_name: 'GlobalWinner', rank_points: 9999 }],
              error: null
            })
          })),
          in: inMock
        })),
        order: vi.fn().mockReturnThis(),
        limit: vi.fn().mockResolvedValue({
          data: [{ id: '1', display_name: 'GlobalWinner', rank_points: 9999 }],
          error: null
        })
      };
    }),
    channel: vi.fn(() => ({
      on: onMock,
      subscribe: subscribeMock
    })),
    removeChannel: removeChannelMock
  };

  return {
    createClient: vi.fn(() => mockClient)
  };
});

describe('Leaderboard Realtime & Tabs', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    eqMock.mockResolvedValue({
      data: [{
        user_id: 'u1',
        problem_id: 'p1',
        solve_time_ms: 15000,
        time_complexity: 'O(1)',
        space_complexity: 'O(1)',
        points_awarded: 100,
        profiles: { display_name: 'TestUser' }
      }],
      error: null
    });
  });

  it('renders Global leaderboard by default and switches to Per-Problem', async () => {
    render(<Leaderboard />);
    
    // Default should show GlobalWinner
    await waitFor(() => {
      expect(screen.getByText('GlobalWinner')).toBeDefined();
    });

    // Switch to Per-Problem tab
    const problemTab = screen.getByText('Per-Problem');
    fireEvent.click(problemTab);

    // Should render a dropdown for problems and show the specific user
    await waitFor(() => {
      expect(screen.getByText('TestUser')).toBeDefined();
      expect(screen.getByText('15.0s')).toBeDefined(); // solve time
      expect(screen.getByText('O(1) time')).toBeDefined(); // time complexity
    });
  });

  it('falls back gracefully to separate profile queries when relation join fails', async () => {
    eqMock
      .mockResolvedValueOnce({
        data: null,
        error: { message: "Could not find a relationship between 'problem_completions' and 'profiles' in the schema cache" }
      })
      .mockResolvedValueOnce({
        data: [{
          user_id: 'u2',
          problem_id: 'p1',
          solve_time_ms: 8000,
          time_complexity: 'O(log n)',
          space_complexity: 'O(1)',
          points_awarded: 120,
        }],
        error: null
      });

    render(<Leaderboard />);

    await waitFor(() => {
      expect(screen.getByText('GlobalWinner')).toBeDefined();
    });

    const problemTab = screen.getByText('Per-Problem');
    fireEvent.click(problemTab);

    await waitFor(() => {
      expect(screen.getByText('FallbackUser')).toBeDefined();
      expect(screen.getByText('8.0s')).toBeDefined();
      expect(screen.getByText('O(log n) time')).toBeDefined();
    });
  });
});
