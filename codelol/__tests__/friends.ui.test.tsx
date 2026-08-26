import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FriendsPage from '../app/friends/page';
import * as friendsLib from '../lib/friends';

vi.mock('../lib/friends', () => ({
  searchUsers: vi.fn(),
  sendFriendRequest: vi.fn(),
  acceptFriendRequest: vi.fn(),
  getPendingRequests: vi.fn(),
  getFriends: vi.fn()
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
    
    const searchBtn = screen.getByRole('button', { name: /Search/i });
    fireEvent.click(searchBtn);
    
    await waitFor(() => {
      expect(screen.getByText('Bugsy')).toBeTruthy();
    });
  });
});
