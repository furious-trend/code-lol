import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../app/login/page';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

// Mock Supabase Client
vi.mock('@/lib/supabase/client', () => ({
  createClient: vi.fn(),
}));

// Mock Bugsy
vi.mock('@/components/Bugsy', () => ({
  Bugsy: () => <div data-testid="bugsy" />
}));

// Mock framer-motion
vi.mock('framer-motion', () => {
  const React = require('react');
  const motion = new Proxy({}, {
    get: (_t: unknown, tag: string) =>
      ({ children, ...props }: Record<string, unknown>) =>
        React.createElement(tag, props, children),
  });
  return { motion, AnimatePresence: ({ children }: { children: unknown }) => children };
});

describe('Authentication Flow Integration', () => {
  const mockSignInWithPassword = vi.fn();
  const mockSignInWithOAuth = vi.fn();
  const mockPush = vi.fn();
  const mockFrom = { 
    select: vi.fn().mockReturnValue({
      ilike: vi.fn().mockReturnValue({
        limit: vi.fn().mockResolvedValue({ data: [{ email: 'user@example.com' }], error: null })
      }),
      eq: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({ data: { display_name: 'test', humor_preference: 'general' }, error: null })
      })
    })
  };
  const mockSupabase = {
    auth: {
      signInWithPassword: mockSignInWithPassword,
      signInWithOAuth: mockSignInWithOAuth,
      getUser: vi.fn().mockResolvedValue({
        data: { user: { id: 'user-123', email: 'user@example.com' } },
        error: null,
      }),
    },
    from: vi.fn(() => mockFrom),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (createClient as any).mockReturnValue(mockSupabase);
    (useRouter as any).mockReturnValue({ push: mockPush });
  });

  it('renders Login mode with Username/Email and Password by default', () => {
    render(<Login />);
    expect(screen.getByPlaceholderText(/Username or Email/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/Password/i)).toBeDefined();
  });

  it('renders Signup mode with Google OAuth only', () => {
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: 'Signup' }));
    expect(screen.getByText(/Continue with Google/i)).toBeDefined();
    expect(screen.getByText(/We'll get you set up in a few quick steps/i)).toBeDefined();
  });

  it('calls signInWithOAuth for Google', async () => {
    mockSignInWithOAuth.mockResolvedValueOnce({ error: null });
    render(<Login />);
    fireEvent.click(screen.getByText(/Continue with Google/i));
    expect(mockSignInWithOAuth).toHaveBeenCalledWith({
      provider: 'google',
      options: expect.objectContaining({ redirectTo: expect.any(String) }),
    });
  });

  it('submits login with email and password, redirects to / on success', async () => {
    mockSignInWithPassword.mockResolvedValueOnce({ data: { user: {} }, error: null });
    
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText(/Username or Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Enter Arena/i }));
    
    expect(mockSignInWithPassword).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' });
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/');
    }, { timeout: 2000 });
  });

  it('shows error message if login fails', async () => {
    mockSignInWithPassword.mockResolvedValueOnce({ data: { user: null }, error: { message: 'Invalid credentials' } });
    
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText(/Username or Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: /Enter Arena/i }));
    
    const errorMessage = await screen.findByText(/Invalid credentials/i);
    expect(errorMessage).toBeDefined();
  });
});
