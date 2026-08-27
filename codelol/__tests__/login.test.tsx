import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
      div: require('react').forwardRef(({ children, ...props }: any, ref: any) => <div ref={ref} {...props}>{children}</div>),
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
  const mockSignInWithPassword = vi.fn();
  const mockSignUp = vi.fn();
  const mockSignInWithOAuth = vi.fn();
  const mockInsert = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({ push: mockPush });
    
    // Setup mock supabase client
    const mockSupabase = {
      auth: {
        signInWithPassword: mockSignInWithPassword,
        signUp: mockSignUp,
        signInWithOAuth: mockSignInWithOAuth,
      },
      from: vi.fn(() => ({
        insert: mockInsert,
      })),
    };
    (createClient as any).mockReturnValue(mockSupabase);
  });

  it('renders login mode by default with Google and Email options', () => {
    render(<Login />);
    
    // Should have Google button
    expect(screen.getByText(/Google/i)).toBeTruthy();
    
    // Should NOT have Facebook button
    expect(screen.queryByText(/Facebook/i)).toBeNull();

    // Should have Email and Password inputs
    expect(screen.getByPlaceholderText(/Email/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/Password/i)).toBeTruthy();
    
    // Should not have Username input in login mode
    expect(screen.queryByPlaceholderText(/Username/i)).toBeNull();
  });

  it('calls signInWithOAuth for Google login', async () => {
    mockSignInWithOAuth.mockResolvedValueOnce({ error: null });
    
    render(<Login />);
    
    const googleButton = screen.getByText(/Google/i);
    fireEvent.click(googleButton);
    
    expect(mockSignInWithOAuth).toHaveBeenCalledWith({
      provider: 'google',
      options: {
        redirectTo: expect.stringContaining('/auth/callback'),
      },
    });
  });

  it('calls signInWithPassword in login mode with correct fields', async () => {
    mockSignInWithPassword.mockResolvedValueOnce({ error: null });
    
    render(<Login />);
    
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });
    
    const submitButton = screen.getByRole('button', { name: /Enter Arena/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockSignInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('switches to signup mode and calls signUp and inserts profile with display_name', async () => {
    mockSignUp.mockResolvedValueOnce({ data: { user: { id: 'test-id' } }, error: null });
    mockInsert.mockResolvedValueOnce({ error: null });
    
    render(<Login />);
    
    // Switch to Signup tab
    fireEvent.click(screen.getByText('Signup'));
    
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'new@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'NewUser' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });
    
    // Select humor preference
    const tamilButton = screen.getByText(/Tamil Comedy/i);
    fireEvent.click(tamilButton);
    
    const submitButton = screen.getByRole('button', { name: /Create Profile/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith({
        email: 'new@example.com',
        password: 'password123',
      });
      expect(mockInsert).toHaveBeenCalledWith([{
        id: 'test-id',
        display_name: 'NewUser', 
        humor_preference: 'tamil',
      }]);
    });
  });
});
