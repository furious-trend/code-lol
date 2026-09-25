import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Login from '../app/login/page';
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
      div: require('react').forwardRef(({ children, layoutId, ...props }: any, ref: any) => <div ref={ref} data-layoutid={layoutId} {...props}>{children}</div>),
      button: require('react').forwardRef(({ children, ...props }: any, ref: any) => <button ref={ref} {...props}>{children}</button>),
      input: require('react').forwardRef(({ ...props }: any, ref: any) => <input ref={ref} {...props} />),
      span: require('react').forwardRef(({ children, ...props }: any, ref: any) => <span ref={ref} {...props}>{children}</span>),
      svg: require('react').forwardRef(({ children, ...props }: any, ref: any) => <svg ref={ref} {...props}>{children}</svg>),
    },
  };
});

// Mock Bugsy
vi.mock('@/components/Bugsy', () => ({
  Bugsy: () => <div data-testid="bugsy" />
}));

describe('Login Page', () => {
  const mockPush = vi.fn();
  const mockSignInWithOAuth = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({ push: mockPush });
    
    const mockSupabase = {
      auth: {
        signInWithOAuth: mockSignInWithOAuth,
      },
    };
    (createClient as any).mockReturnValue(mockSupabase);
  });

  it('renders Google login button', () => {
    render(<Login />);
    expect(screen.getByText(/Continue with Google/i)).toBeTruthy();
  });

  it('calls signInWithOAuth for Google login', async () => {
    mockSignInWithOAuth.mockResolvedValueOnce({ error: null });
    
    render(<Login />);
    
    const googleButton = screen.getByText(/Continue with Google/i);
    fireEvent.click(googleButton);
    
    expect(mockSignInWithOAuth).toHaveBeenCalledWith({
      provider: 'google',
      options: {
        redirectTo: expect.stringContaining('/auth/callback'),
      },
    });
  });
});
