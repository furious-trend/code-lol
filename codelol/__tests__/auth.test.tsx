import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../app/login/page';
import Settings from '../app/settings/page';
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

describe('Authentication Flow', () => {
  const mockSignInWithPassword = vi.fn();
  const mockSignUp = vi.fn();
  const mockSignInWithOAuth = vi.fn();
  const mockPush = vi.fn();
  const mockFrom = { 
    insert: vi.fn().mockResolvedValue({ error: null }),
    select: vi.fn().mockReturnValue({
      eq: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({ data: { display_name: 'test', humor_preference: 'general' }, error: null })
      })
    })
  };
  const mockSupabase = {
    auth: {
      signInWithPassword: mockSignInWithPassword,
      signUp: mockSignUp,
      signInWithOAuth: mockSignInWithOAuth,
      getUser: vi.fn().mockResolvedValue({
        data: { user: { id: 'user-123', identities: [{ provider: 'email' }] } },
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

  it('renders Login mode with Email and Password by default', () => {
    render(<Login />);
    expect(screen.getByPlaceholderText(/Email/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/Password/i)).toBeDefined();
    expect(screen.queryByPlaceholderText(/Username/i)).toBeNull(); // Shouldn't be in Login mode
  });

  it('renders Signup mode with Email, Username, and Password when Signup tab clicked', () => {
    render(<Login />);
    fireEvent.click(screen.getByText('Signup'));
    expect(screen.getByPlaceholderText(/Email/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/Username/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/Password/i)).toBeDefined();
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
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Enter Arena/i }));
    
    expect(mockSignInWithPassword).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' });
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/');
    }, { timeout: 2000 });
  });

  it('submits signup, creates profile, and redirects on success', async () => {
    mockSignUp.mockResolvedValueOnce({ data: { user: { id: 'user-123' } }, error: null });
    
    render(<Login />);
    fireEvent.click(screen.getByText('Signup'));
    
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'new@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'NewUser' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });
    
    // Select Tamil humor
    fireEvent.click(screen.getByText(/Tamil Comedy/i));
    
    fireEvent.click(screen.getByRole('button', { name: /Create Profile/i }));
    
    expect(mockSignUp).toHaveBeenCalledWith({ email: 'new@example.com', password: 'password123' });
    
    await waitFor(() => {
      expect(mockSupabase.from).toHaveBeenCalledWith('profiles');
      expect(mockFrom.insert).toHaveBeenCalledWith([{
        id: 'user-123',
        display_name: 'NewUser',
        humor_preference: 'tamil'
      }]);
      expect(mockPush).toHaveBeenCalledWith('/');
    }, { timeout: 2000 });
  });

  it('shows error message if login fails', async () => {
    mockSignInWithPassword.mockResolvedValueOnce({ data: { user: null }, error: { message: 'Invalid credentials' } });
    
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: /Enter Arena/i }));
    
    const errorMessage = await screen.findByText(/Invalid credentials/i);
    expect(errorMessage).toBeDefined();
  });
});

describe('Settings Flow', () => {
  it('renders settings interface with humor preference toggle', async () => {
    render(<Settings />);
    await waitFor(() => {
      expect(screen.getByText(/Update Password/i)).toBeDefined();
      expect(screen.getByText(/Humor Preference/i)).toBeDefined();
    });
  });
});
