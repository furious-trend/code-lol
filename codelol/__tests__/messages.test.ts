import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendMessage, getMessages, markAsRead } from '../lib/messages';

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

describe('Messages API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sendMessage inserts a message into the messages table', async () => {
    const mockInsert = vi.fn().mockResolvedValue({ error: null });
    const client = createClient();
    (client.from as any).mockReturnValue({
      insert: mockInsert,
    });

    const success = await sendMessage('friend-123', 'Hello!');
    
    expect(client.from).toHaveBeenCalledWith('messages');
    expect(mockInsert).toHaveBeenCalledWith({
      sender_id: 'test-user-id',
      receiver_id: 'friend-123',
      content: 'Hello!',
      read: false
    });
    expect(success).toBe(true);
  });

  it('getMessages fetches messages between current user and friend', async () => {
    const mockSelect = vi.fn().mockReturnThis();
    const mockOr = vi.fn().mockReturnThis();
    const mockOrder = vi.fn().mockResolvedValue({ data: [{ id: 'msg-1' }], error: null });
    
    const client = createClient();
    (client.from as any).mockReturnValue({
      select: mockSelect,
      or: mockOr,
      order: mockOrder
    });

    // Simplify the chain mock for testing purposes
    mockSelect.mockReturnValue({
      or: vi.fn().mockReturnValue({
        order: mockOrder
      })
    });

    const msgs = await getMessages('friend-123');
    expect(msgs).toEqual([{ id: 'msg-1' }]);
  });
});
