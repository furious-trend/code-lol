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
  const mockSignInWithPassword = vi.fn();
  const mockSignInWithOAuth = vi.fn();
  const mockRpc = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({ push: mockPush });
    
    mockRpc.mockResolvedValue({ data: null, error: null });

    const mockSupabase = {
      auth: {
        signInWithPassword: mockSignInWithPassword,
        signInWithOAuth: mockSignInWithOAuth,
      },
      rpc: mockRpc,
    };
    (createClient as any).mockReturnValue(mockSupabase);
  });

  it('renders login tab by default with Username or Email and Password fields, plus Google login and Forgot Password link', () => {
    render(<Login />);
    
    expect(screen.getByText(/Continue with Google/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/Username or Email/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/Password/i)).toBeTruthy();
    expect(screen.getByText(/Forgot password\?/i)).toBeTruthy();
  });

  it('renders signup tab with Google and Facebook OAuth, username, password, and Humor Selector', () => {
    render(<Login />);
    
    // Switch to Signup tab
    fireEvent.click(screen.getByRole('button', { name: /Join Arena/i }));
    
    expect(screen.getByText(/Continue with Google/i)).toBeTruthy();
    expect(screen.getByText(/Continue with Facebook/i)).toBeTruthy();
    
    // Should show input fields in signup tab now
    expect(screen.getByPlaceholderText(/Username/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/Password/i)).toBeTruthy();

    // Should show Humor Selector cards
    expect(screen.getByText(/Global Dev/i)).toBeTruthy();
    expect(screen.getByText(/Tamil Sense/i)).toBeTruthy();
  });

  it('calls signInWithOAuth for Google signup/login', async () => {
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

  it('logs in with email directly when input contains @', async () => {
    mockSignInWithPassword.mockResolvedValueOnce({ error: null, data: { user: { id: 'u1' } } });
    
    render(<Login />);
    
    fireEvent.change(screen.getByPlaceholderText(/Username or Email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'secretpass' } });
    
    const submitButton = screen.getByRole('button', { name: /Enter Arena/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockSignInWithPassword).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'secretpass',
      });
      expect(mockPush).toHaveBeenCalledWith('/');
    }, { timeout: 2000 });
  });

  it('looks up email by username when input does NOT contain @ and logs in with found email', async () => {
    // Mock rpc query finding the user
    mockRpc.mockResolvedValueOnce({
      data: 'resolved@example.com',
      error: null,
    });
    mockSignInWithPassword.mockResolvedValueOnce({ error: null, data: { user: { id: 'u2' } } });

    render(<Login />);
    
    fireEvent.change(screen.getByPlaceholderText(/Username or Email/i), { target: { value: 'testdev' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'secretpass' } });
    
    const submitButton = screen.getByRole('button', { name: /Enter Arena/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockRpc).toHaveBeenCalledWith('get_email_by_username', { p_username: 'testdev' });
      expect(mockSignInWithPassword).toHaveBeenCalledWith({
        email: 'resolved@example.com',
        password: 'secretpass',
      });
      expect(mockPush).toHaveBeenCalledWith('/');
    }, { timeout: 2000 });
  });

  it('shows error if username is not found in profiles', async () => {
    // Mock rpc query returning null
    mockRpc.mockResolvedValueOnce({
      data: null,
      error: null,
    });

    render(<Login />);
    
    fireEvent.change(screen.getByPlaceholderText(/Username or Email/i), { target: { value: 'nonexistentuser' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'secretpass' } });
    
    const submitButton = screen.getByRole('button', { name: /Enter Arena/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/No account found with that username/i)).toBeTruthy();
      expect(mockSignInWithPassword).not.toHaveBeenCalled();
    });
  });

  it('calls signUp with email, password, and humor_preference when submitting signup form', async () => {
    const mockSignUp = vi.fn().mockResolvedValue({ error: null });
    (createClient as any).mockReturnValue({
      auth: {
        signInWithPassword: mockSignInWithPassword,
        signInWithOAuth: mockSignInWithOAuth,
        signUp: mockSignUp,
      },
      rpc: mockRpc,
    });

    render(<Login />);
    
    // Switch to Signup tab
    fireEvent.click(screen.getByRole('button', { name: /Join Arena/i }));
    
    // Select Tamil Sense humor
    fireEvent.click(screen.getByText(/Tamil Sense/i));
    
    // Fill form
    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'new@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'securepass123' } });
    
    // Submit
    const submitButtons = screen.getAllByRole('button', { name: /Join Arena/i });
    const submitButton = submitButtons[submitButtons.length - 1]; // The actual submit button is the last one
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith({
        email: 'new@example.com',
        password: 'securepass123',
        options: {
          data: {
            username: 'newuser',
            humor_preference: 'tamil'
          }
        }
      });
    });
  });
});
