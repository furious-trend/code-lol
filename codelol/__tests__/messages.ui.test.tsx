import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MessagesPage from '../app/messages/page';
import * as friendsLib from '../lib/friends';
import * as useMessagesModule from '../hooks/useMessages';
import { createClient } from '@/lib/supabase/client';

// We mock getFriends, useMessages, and createClient
vi.mock('../lib/friends', () => ({
  getFriends: vi.fn()
}));

vi.mock('../hooks/useMessages', () => ({
  useMessages: vi.fn()
}));

vi.mock('@/lib/supabase/client', () => ({
  createClient: vi.fn(() => ({
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'test-user-id' } }, error: null })
    }
  }))
}));

describe('Messages Page UI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Messages page with empty inbox state when no friend selected', async () => {
    (friendsLib.getFriends as any).mockResolvedValue([
      { id: '1', friend_id: 'friend-1', profiles: { id: 'friend-1', display_name: 'Bugsy' } }
    ]);
    (useMessagesModule.useMessages as any).mockReturnValue({
      messages: [],
      loading: false,
      send: vi.fn()
    });

    render(<MessagesPage />);
    
    // Check heading
    expect(screen.getByRole('heading', { name: 'Messages', level: 1 })).toBeTruthy();
    
    // Verify Bugsy empty state shows when no friend selected
    await waitFor(() => {
      expect(screen.getByText(/Select a friend from the sidebar to start chatting/i)).toBeTruthy();
    });

    // Check friend is in the list
    expect(screen.getByText('Bugsy')).toBeTruthy();
  });

  it('clicking a friend opens chat thread and displays messages', async () => {
    (friendsLib.getFriends as any).mockResolvedValue([
      { id: '1', friend_id: 'friend-1', profiles: { id: 'friend-1', display_name: 'Bugsy' } }
    ]);
    (useMessagesModule.useMessages as any).mockReturnValue({
      messages: [
        { id: 'msg-1', sender_id: 'friend-1', receiver_id: 'test-user-id', content: 'Hey!', created_at: new Date().toISOString() }
      ],
      loading: false,
      send: vi.fn()
    });

    render(<MessagesPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Bugsy')).toBeTruthy();
    });

    // Click the friend
    fireEvent.click(screen.getByText('Bugsy'));

    // Chat thread should now be open
    await waitFor(() => {
      expect(screen.getByText('Hey!')).toBeTruthy();
      expect(screen.getByRole('button', { name: /⚡ Challenge to Battle/i })).toBeTruthy();
      
      // Since we added framer-motion, the message bubble should be wrapped in an element with inline styles or be a motion.div
      const msgBubble = screen.getByText('Hey!').closest('div[style]');
      expect(msgBubble).toBeTruthy(); // This verifies framer-motion is applied
    });
  });
});
