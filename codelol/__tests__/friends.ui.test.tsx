import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import FriendsPage from '../app/friends/page';
import * as friendsLib from '../lib/friends';

vi.mock('../lib/friends', () => ({
  searchUsers: vi.fn(),
  sendFriendRequest: vi.fn(),
  acceptFriendRequest: vi.fn(),
  getPendingRequests: vi.fn(),
  getFriends: vi.fn()
}));

vi.mock('lodash.debounce', () => ({
  default: vi.fn((fn) => fn),
}));

describe('Friends Page UI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (friendsLib.getPendingRequests as any).mockResolvedValue([]);
    (friendsLib.getFriends as any).mockResolvedValue([]);
  });

  it('renders Friends page and allows searching', async () => {
    (friendsLib.searchUsers as any).mockResolvedValue([{ id: '1', display_name: 'Bugsy' }]);
    
    render(<FriendsPage />);
    
    expect(screen.getByRole('heading', { name: 'Friends', level: 1 })).toBeTruthy();
    
    const searchInput = screen.getByPlaceholderText(/Search for friends/i);
    fireEvent.change(searchInput, { target: { value: 'Bug' } });
    
    await waitFor(() => {
      expect(screen.getByText('Bugsy')).toBeTruthy();
      expect(friendsLib.searchUsers).toHaveBeenCalledWith('Bug');
    });
  });

  it('renders 3D tilt hover profile cards and relationship state buttons', async () => {
    (friendsLib.searchUsers as any).mockResolvedValue([{ id: '1', display_name: 'Bugsy' }]);
    
    render(<FriendsPage />);
    const searchInput = screen.getByPlaceholderText(/Search for friends/i);
    fireEvent.change(searchInput, { target: { value: 'Bug' } });

    await waitFor(() => {
      const card = screen.getByTestId('profile-card-1');
      expect(card).toBeTruthy();
      // Ensure relationship buttons are there (e.g. Add Friend, which is Cyan)
      const btn = screen.getByRole('button', { name: /Add Friend/i });
      expect(btn.className).toContain('cyan'); // dynamic relationship state button cyan
    });
  });
});
