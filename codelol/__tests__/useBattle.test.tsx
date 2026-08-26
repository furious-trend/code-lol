import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import BattleLobbyPage from '../app/battle/page';
import * as battlesLib from '../lib/battles';

// Mock useRouter
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush
  })
}));

vi.mock('../lib/battles', () => ({
  createBattle: vi.fn(),
  joinBattle: vi.fn()
}));

describe('Battle Lobby Page UI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates a battle and navigates to the room', async () => {
    (battlesLib.createBattle as any).mockResolvedValue({ id: 'battle-1', room_code: 'ABCD12' });

    render(<BattleLobbyPage />);
    
    expect(screen.getByRole('heading', { name: 'Create Battle', level: 2 })).toBeTruthy();
    
    const hostBtn = screen.getByRole('button', { name: /Host Battle/i });
    fireEvent.click(hostBtn);
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/battle/ABCD12');
    });
  });

  it('joins a battle and navigates to the room', async () => {
    (battlesLib.joinBattle as any).mockResolvedValue(true);

    render(<BattleLobbyPage />);
    
    const input = screen.getByPlaceholderText('e.g. XY7Z9A');
    fireEvent.change(input, { target: { value: 'XY7Z9A' } });
    
    const joinBtn = screen.getByRole('button', { name: /Enter Arena/i });
    fireEvent.click(joinBtn);
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/battle/XY7Z9A');
    });
  });
});
