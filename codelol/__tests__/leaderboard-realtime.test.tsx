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

vi.mock('../lib/supabase/client', () => {
  const onMock = vi.fn().mockReturnThis();
  const subscribeMock = vi.fn().mockReturnThis();
  const removeChannelMock = vi.fn();
  
  const selectMock = vi.fn().mockReturnThis();
  const orderMock = vi.fn().mockReturnThis();
  const limitMock = vi.fn().mockReturnThis();
  const eqMock = vi.fn().mockResolvedValue({
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
        select: selectMock,
        order: orderMock,
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
});
