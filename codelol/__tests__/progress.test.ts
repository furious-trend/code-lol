import { describe, it, expect, vi, beforeEach } from 'vitest';
import { saveProblemCompletion } from '../lib/progress';
import { createClient } from '../lib/supabase/client';

vi.mock('../lib/supabase/client', () => {
  const upsertMock = vi.fn().mockResolvedValue({ error: null });
  const selectMock = vi.fn().mockResolvedValue({ data: { user: { id: 'user123' } }, error: null });
  const eqMock = vi.fn().mockReturnValue({ single: vi.fn().mockResolvedValue({ data: { rank_points: 100 } }) });
  
  return {
    createClient: vi.fn(() => ({
      auth: {
        getUser: selectMock
      },
      from: vi.fn(() => ({
        upsert: upsertMock,
        select: vi.fn(() => ({
          eq: eqMock
        }))
      }))
    }))
  };
});

describe('saveProblemCompletion', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should accept solve_time_ms, time_complexity, space_complexity and points_awarded', async () => {
    const supabase = createClient();
    const upsertMock = (supabase.from('problem_completions') as any).upsert;

    await saveProblemCompletion('prob_1', {
      solveTimeMs: 45000,
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      pointsAwarded: 150
    });

    // Expect upsert to have been called with the new fields
    expect(upsertMock).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: 'user123',
        problem_id: 'prob_1',
        solve_time_ms: 45000,
        time_complexity: 'O(N)',
        space_complexity: 'O(1)',
        points_awarded: 150
      }),
      { onConflict: 'user_id, problem_id' }
    );
  });
});
