import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createBattle, joinBattle, startBattle, updateParticipantProgress, getBattleByRoomCode, getBattleParticipants } from '../lib/battles';
import { createClient } from '@/lib/supabase/client';

// Mock Supabase
const mockSupabaseClient = {
  from: vi.fn(),
  auth: {
    getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'test-user-id' } }, error: null })
  }
};

vi.mock('@/lib/supabase/client', () => ({
  createClient: vi.fn(() => mockSupabaseClient)
}));

describe('Battles API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('createBattle inserts a battle and returns room code', async () => {
    const mockInsert = vi.fn().mockReturnThis();
    const mockSelect = vi.fn().mockReturnThis();
    const mockEq = vi.fn().mockReturnThis();
    const mockSingle = vi.fn().mockResolvedValue({ data: { id: 'battle-1', room_code: 'ABCD' }, error: null });
    
    (mockSupabaseClient.from as any).mockImplementation((table: string) => {
      if (table === 'battles') {
        return {
          insert: mockInsert,
          select: mockSelect,
          single: mockSingle,
          eq: mockEq, // For getBattleByRoomCode called via joinBattle
          update: vi.fn()
        };
      }
      if (table === 'battle_participants') {
        return { insert: vi.fn().mockResolvedValue({ error: null }) };
      }
    });

    const res = await createBattle('problem-1', 2, 300);
    
    expect(mockSupabaseClient.from).toHaveBeenCalledWith('battles');
    expect(mockInsert).toHaveBeenCalled();
    expect(res).toEqual({ id: 'battle-1', room_code: 'ABCD' });
  });

  it('createBattle retries without language column when schema cache returns PGRST204', async () => {
    let callCount = 0;
    const mockInsert = vi.fn().mockImplementation(() => {
      callCount++;
      return {
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockImplementation(() => {
            if (callCount === 1) {
              return Promise.resolve({
                data: null,
                error: { code: 'PGRST204', message: "Could not find the 'language' column of 'battles' in the schema cache" }
              });
            }
            return Promise.resolve({
              data: { id: 'battle-legacy-1', room_code: 'WXYZ99' },
              error: null
            });
          })
        })
      };
    });

    (mockSupabaseClient.from as any).mockImplementation((table: string) => {
      if (table === 'battles') {
        return {
          insert: mockInsert,
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: { id: 'battle-legacy-1', status: 'waiting' }, error: null })
            })
          })
        };
      }
      if (table === 'battle_participants') {
        return { insert: vi.fn().mockResolvedValue({ error: null }) };
      }
    });

    const res = await createBattle('problem-1', 2, 300, 'javascript');
    
    expect(mockInsert).toHaveBeenCalledTimes(2);
    expect(mockInsert).toHaveBeenNthCalledWith(1, expect.objectContaining({ language: 'javascript' }));
    expect(mockInsert).toHaveBeenNthCalledWith(2, expect.not.objectContaining({ language: 'javascript' }));
    expect(res).toEqual({ id: 'battle-legacy-1', room_code: 'WXYZ99' });
  });

  it('joinBattle inserts a participant', async () => {
    const mockEq = vi.fn().mockReturnThis();
    const mockSingle = vi.fn().mockResolvedValue({ data: { id: 'battle-1', status: 'waiting' }, error: null });
    const mockSelect = vi.fn().mockReturnThis();
    const mockInsert = vi.fn().mockResolvedValue({ error: null });

    // First from('battles') call
    // Second from('battle_participants') call
    (mockSupabaseClient.from as any).mockImplementation((table: string) => {
      if (table === 'battles') {
        return { select: mockSelect, eq: mockEq, single: mockSingle };
      }
      if (table === 'battle_participants') {
        return { insert: mockInsert };
      }
    });

    const success = await joinBattle('ABCD');
    
    expect(success).toBe(true);
    expect(mockInsert).toHaveBeenCalledWith({
      battle_id: 'battle-1',
      user_id: 'test-user-id'
    });
  });

  it('startBattle updates status and started_at', async () => {
    const mockUpdate = vi.fn().mockReturnThis();
    const mockEq = vi.fn().mockReturnThis();
    
    (mockSupabaseClient.from as any).mockReturnValue({
      update: mockUpdate,
      eq: mockEq
    });

    // We have to mock the .eq().eq() chain. Since mockEq returns `this`, it will work if mockEq returns the same object.
    mockEq.mockReturnValue({ eq: mockEq, update: mockUpdate });

    const success = await startBattle('battle-1');
    
    expect(mockSupabaseClient.from).toHaveBeenCalledWith('battles');
    expect(mockUpdate).toHaveBeenCalledWith(expect.objectContaining({
      status: 'active',
    }));
    expect(success).toBe(true);
  });
});
