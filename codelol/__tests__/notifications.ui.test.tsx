// agent-notes: { ctx: "Unit tests for Notifications component showing sender username", deps: ["../components/Notifications", "@/lib/friends", "@/lib/supabase/client"], state: active, last: "sato@2026-10-13" }
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Notifications } from '../components/Notifications';
import * as friendsLib from '../lib/friends';

const mockNotifications = [
  {
    id: 'notif-1',
    user_id: 'current-user-id',
    type: 'friend_request',
    title: 'New Friend Request',
    payload: { friend_id: 'sender-user-123' },
    is_read: false,
    created_at: new Date().toISOString()
  }
];

const mockProfiles = [
  {
    id: 'sender-user-123',
    display_name: 'CoderMaster99'
  }
];

const mockChannel = {
  on: vi.fn().mockReturnThis(),
  subscribe: vi.fn().mockReturnThis()
};

const mockSupabaseClient = {
  auth: {
    getUser: vi.fn().mockResolvedValue({
      data: { user: { id: 'current-user-id' } },
      error: null
    })
  },
  from: vi.fn((table: string) => {
    if (table === 'notifications') {
      return {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({ data: mockNotifications, error: null }),
        update: vi.fn().mockReturnValue({ eq: vi.fn().mockResolvedValue({ error: null }) })
      };
    }
    if (table === 'profiles') {
      return {
        select: vi.fn().mockReturnThis(),
        in: vi.fn().mockResolvedValue({ data: mockProfiles, error: null })
      };
    }
    if (table === 'friendships') {
      return {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        maybeSingle: vi.fn().mockResolvedValue({ data: { id: 'friendship-req-1' }, error: null })
      };
    }
    return {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis()
    };
  }),
  channel: vi.fn(() => mockChannel),
  removeChannel: vi.fn()
};

vi.mock('@/lib/supabase/client', () => ({
  createClient: vi.fn(() => mockSupabaseClient)
}));

vi.mock('../lib/friends', () => ({
  acceptFriendRequest: vi.fn().mockResolvedValue(true)
}));

describe('Notifications Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays friend request notification with the sender username', async () => {
    render(<Notifications />);

    // Click bell icon to open notifications
    const bellBtn = screen.getByRole('button');
    fireEvent.click(bellBtn);

    // Wait for the notification text to show the sender username
    await waitFor(() => {
      expect(screen.getByText('Friend request from CoderMaster99')).toBeDefined();
    });
  });

  it('allows accepting friend request directly from notification', async () => {
    render(<Notifications />);

    const bellBtn = screen.getByRole('button');
    fireEvent.click(bellBtn);

    const acceptBtn = await screen.findByRole('button', { name: /accept/i });
    fireEvent.click(acceptBtn);

    await waitFor(() => {
      expect(friendsLib.acceptFriendRequest).toHaveBeenCalledWith('friendship-req-1');
    });
  });
});
