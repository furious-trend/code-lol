import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FriendBell } from '../components/FriendBell';
import * as friendsLib from '../lib/friends';

vi.mock('../lib/friends', () => ({
  getPendingRequests: vi.fn(),
}));

describe('FriendBell Notification Center', () => {
  beforeEach(() => {
    vi.mocked(friendsLib.getPendingRequests).mockResolvedValue([
      { id: '1', user_id: '123', friend_id: '456', status: 'pending', created_at: '', profiles: { display_name: 'test' } }
    ]);
  });

  it('renders a pulsating neon badge when there are notifications', async () => {
    render(<FriendBell />);
    const badge = await screen.findByText('1');
    expect(badge.className).toContain('animate-pulse');
  });

  it('opens a slide-in drawer on click with match invites and updates', async () => {
    render(<FriendBell />);
    const bellIcon = await screen.findByRole('button');
    fireEvent.click(bellIcon);
    
    expect(screen.getByText(/Match Invites/i)).toBeDefined();
    expect(screen.getByText(/Milestones/i)).toBeDefined();
    expect(screen.getByText(/Updates/i)).toBeDefined();
  });
});
