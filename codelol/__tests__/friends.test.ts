import { describe, it, expect, vi, beforeEach } from 'vitest';
import { searchUsers, sendFriendRequest, acceptFriendRequest, getPendingRequests, getFriends } from '../lib/friends';

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

import { createClient } from '@/lib/supabase/client';

describe('Friends API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('searchUsers searches profiles by display_name', async () => {
    const mockSelect = vi.fn().mockReturnThis();
    const mockIlike = vi.fn().mockReturnThis();
    const mockLimit = vi.fn().mockResolvedValue({ data: [{ id: '1', display_name: 'Bugsy' }], error: null });
    
    const client = createClient();
    (client.from as any).mockReturnValue({
      select: mockSelect,
      ilike: mockIlike,
      limit: mockLimit,
    });

    const res = await searchUsers('Bugsy');
    expect(client.from).toHaveBeenCalledWith('profiles');
    expect(res).toEqual([{ id: '1', display_name: 'Bugsy' }]);
  });

  it('sendFriendRequest inserts into friends table', async () => {
    const mockInsert = vi.fn().mockResolvedValue({ error: null });
    const client = createClient();
    (client.from as any).mockReturnValue({
      insert: mockInsert,
    });

    const success = await sendFriendRequest('friend-123');
    expect(client.from).toHaveBeenCalledWith('friends');
    expect(mockInsert).toHaveBeenCalledWith({
      user_id: 'test-user-id',
      friend_id: 'friend-123',
      status: 'pending'
    });
    expect(success).toBe(true);
  });
});
