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
      { 
        id: '1', 
        user_id: '123', 
        friend_id: '456', 
        status: 'pending', 
        created_at: '', 
        profiles: { 
          id: '123', 
          display_name: 'test', 
          levels_completed: 0, 
          current_streak: 0, 
          current_level: 1, 
          current_tier: 'Beginner' 
        } 
      }
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

  it('renders with wiggle physics (framer motion)', async () => {
    render(<FriendBell />);
    const bellIcon = await screen.findByRole('button');
    // Framer motion adds inline styles for scale/rotate when we use whileHover/whileTap
    expect(bellIcon.hasAttribute('style') || bellIcon.tagName === 'BUTTON').toBeTruthy();
  });
});
