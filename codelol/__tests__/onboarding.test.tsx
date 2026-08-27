import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Onboarding from '../app/onboarding/page';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

// Mock the Next.js router
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

// Mock Supabase client
vi.mock('@/lib/supabase/client', () => ({
  createClient: vi.fn(),
}));

// Mock framer-motion to skip animations
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    AnimatePresence: ({ children }: any) => <>{children}</>,
    motion: {
      div: require('react').forwardRef(({ children, ...props }: any, ref: any) => <div ref={ref} {...props}>{children}</div>),
      button: require('react').forwardRef(({ children, ...props }: any, ref: any) => <button ref={ref} {...props}>{children}</button>),
      h1: require('react').forwardRef(({ children, ...props }: any, ref: any) => <h1 ref={ref} {...props}>{children}</h1>),
    },
  };
});

// Mock Bugsy
vi.mock('@/components/Bugsy', () => ({
  default: () => <div data-testid="bugsy" />
}));

describe('Onboarding Page', () => {
  const mockPush = vi.fn();
  const mockUpdate = vi.fn();
  const mockEq = vi.fn(() => ({ update: mockUpdate }));
  const mockGetUser = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({ push: mockPush });
    
    // Setup mock supabase client
    const mockSupabase = {
      auth: {
        getUser: mockGetUser,
      },
      from: vi.fn(() => ({
        update: mockUpdate,
      })),
    };
    mockUpdate.mockReturnValue({ eq: mockEq });
    
    (createClient as any).mockReturnValue(mockSupabase);
  });

  it('renders vibe selection options', async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: { id: 'test-user-id' } }, error: null });
    
    render(<Onboarding />);
    
    expect(screen.getByText(/Pick your vibe/i)).toBeTruthy();
    expect(screen.getByText(/General Meme Sense/i)).toBeTruthy();
    expect(screen.getByText(/Tamil Comedy Sense/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /Confirm/i })).toBeTruthy();
  });

  it('shows error if try to submit without selection', async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: { id: 'test-user-id' } }, error: null });
    
    render(<Onboarding />);
    
    const confirmButton = screen.getByRole('button', { name: /Confirm/i });
    fireEvent.click(confirmButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Please select a vibe/i)).toBeTruthy();
    });
  });

  it('submits selected vibe and redirects to home', async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: { id: 'test-user-id' } }, error: null });
    mockUpdate.mockReturnValueOnce({ eq: vi.fn().mockResolvedValueOnce({ error: null }) });
    
    render(<Onboarding />);
    
    // Select General vibe
    const generalButton = screen.getByText(/General Meme Sense/i);
    fireEvent.click(generalButton);
    
    const confirmButton = screen.getByRole('button', { name: /Confirm/i });
    fireEvent.click(confirmButton);
    
    await waitFor(() => {
      // should update with general
      expect(mockUpdate).toHaveBeenCalledWith({ humor_preference: 'general' });
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });
});
