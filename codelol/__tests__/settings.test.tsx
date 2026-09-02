/**
 * agent-notes: { ctx: "TDD tests for settings page Supabase integration", deps: ["app/settings/page.tsx", "lib/supabase/client.ts"], state: active, last: "tara@2026-08-27" }
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Settings from '../app/settings/page';
import { createClient } from '@/lib/supabase/client';

vi.mock('lodash.debounce', () => ({
  default: vi.fn((fn) => fn),
}));

vi.mock('@/lib/supabase/client', () => ({
  createClient: vi.fn(),
}));

vi.mock('framer-motion', () => {
  const React = require('react');
  const motion = new Proxy({}, {
    get: (_t: unknown, tag: string) =>
      ({ children, ...props }: Record<string, unknown>) =>
        React.createElement(tag, props, children),
  });
  return { motion, AnimatePresence: ({ children }: { children: unknown }) => children };
});

const makeProfile = (overrides = {}) => ({
  display_name: 'testuser',
  humor_preference: 'general' as 'general' | 'tamil',
  ...overrides,
});

const makeSupabase = (profileData = makeProfile()) => {
  const mockEq = vi.fn().mockResolvedValue({ error: null });
  const mockUpdate = vi.fn().mockReturnValue({ eq: mockEq });
  const mockSingle = vi.fn().mockResolvedValue({ data: profileData, error: null });
  const mockLimit = vi.fn().mockResolvedValue({ data: [], error: null });
  const mockIlike = vi.fn().mockReturnValue({ limit: mockLimit });
  const mockSelectEq = vi.fn().mockReturnValue({ single: mockSingle });
  const mockSelect = vi.fn().mockReturnValue({ eq: mockSelectEq, ilike: mockIlike });

  return {
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: {
          user: { id: 'user-123', identities: [{ provider: 'email' }] },
        },
        error: null,
      }),
      updateUser: vi.fn().mockResolvedValue({ error: null }),
    },
    from: vi.fn(() => ({ select: mockSelect, update: mockUpdate })),
    rpc: vi.fn(),
    // expose for assertions
    _update: mockUpdate,
    _eq: mockEq,
    _single: mockSingle,
    _ilike: mockIlike,
    _ilikeLimit: mockLimit,
  };
};

describe('Settings Page — Supabase Integration', () => {
  let sb: ReturnType<typeof makeSupabase>;

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    sb = makeSupabase();
    sb.rpc = vi.fn().mockResolvedValue({ data: true, error: null });
    (createClient as ReturnType<typeof vi.fn>).mockReturnValue(sb);
  });

  // ─── Load real data on mount ───────────────────────────────────────────────

  it('loads display_name from Supabase — no hardcoded default', async () => {
    render(<Settings />);
    await waitFor(() => {
      const input = screen.getByLabelText(/username/i) as HTMLInputElement;
      expect(input.value).toBe('testuser');
    });
    expect(screen.queryByDisplayValue('current_user')).toBeNull();
  });

  it('loads humor_preference from Supabase (tamil)', async () => {
    sb = makeSupabase(makeProfile({ humor_preference: 'tamil' }));
    (createClient as ReturnType<typeof vi.fn>).mockReturnValue(sb);
    render(<Settings />);
    await waitFor(() => {
      const btn = screen.getByRole('button', { name: /tamil comedy/i });
      expect(btn.className).toMatch(/emerald/);
    });
  });

  // ─── Username update ───────────────────────────────────────────────────────

  it('calls profiles.update with new display_name on Save', async () => {
    render(<Settings />);
    await waitFor(() => screen.getByLabelText(/username/i));

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'newname' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(sb._update).toHaveBeenCalledWith(
        expect.objectContaining({ display_name: 'newname' })
      );
    });
  });

  it('debounces username uniqueness check and shows error if taken', async () => {
    sb._ilikeLimit.mockResolvedValueOnce({ data: [{ id: 'other-user' }], error: null }); // mock limit returning an existing user
    render(<Settings />);
    await waitFor(() => screen.getByLabelText(/username/i));

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'takenname' } });
    
    await waitFor(() => {
      expect(sb._ilike).toHaveBeenCalledWith('display_name', 'takenname');
      expect(screen.getByText(/Username is already taken/i)).toBeTruthy();
    }, { timeout: 2000 });
  });

  // ─── Password update ───────────────────────────────────────────────────────

  it('calls auth.updateUser with password when field filled', async () => {
    render(<Settings />);
    await waitFor(() => screen.getByPlaceholderText(/new password/i));

    fireEvent.change(screen.getByPlaceholderText(/new password/i), {
      target: { value: 'supersecret123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(sb.auth.updateUser).toHaveBeenCalledWith({ password: 'supersecret123' });
    });
  });

  it('shows password strength indicator when typing password', async () => {
    render(<Settings />);
    await waitFor(() => screen.getByPlaceholderText(/new password/i));

    fireEvent.change(screen.getByPlaceholderText(/new password/i), {
      target: { value: 'weak' },
    });
    
    expect(screen.getByText(/Weak/i)).toBeTruthy();
    expect(screen.getByTestId('strength-bar').className).toContain('bg-red-500');

    fireEvent.change(screen.getByPlaceholderText(/new password/i), {
      target: { value: 'StrongPass123!' },
    });

    expect(screen.getByText(/Strong/i)).toBeTruthy();
    expect(screen.getByTestId('strength-bar').className).toContain('bg-emerald-500');
  });

  it('does NOT call auth.updateUser when password field is empty', async () => {
    render(<Settings />);
    await waitFor(() => screen.getByLabelText(/username/i));
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    await waitFor(() => screen.getByText(/saved successfully/i));
    expect(sb.auth.updateUser).not.toHaveBeenCalled();
  });

  it('hides password field for OAuth-only users', async () => {
    sb.auth.getUser = vi.fn().mockResolvedValue({
      data: { user: { id: 'u', identities: [{ provider: 'google' }] } },
      error: null,
    });
    render(<Settings />);
    await waitFor(() => screen.getByLabelText(/username/i));
    expect(screen.queryByPlaceholderText(/new password/i)).toBeNull();
    // Shows a note about Google sign-in
    expect(screen.getByText(/google/i)).toBeTruthy();
  });

  // ─── Humor preference ─────────────────────────────────────────────────────

  it('saves humor_preference to Supabase — not localStorage', async () => {
    render(<Settings />);
    await waitFor(() => screen.getByRole('button', { name: /tamil comedy/i }));

    fireEvent.click(screen.getByRole('button', { name: /tamil comedy/i }));
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(sb._update).toHaveBeenCalledWith(
        expect.objectContaining({ humor_preference: 'tamil' })
      );
    });
    expect(localStorage.getItem('humorPref')).toBeNull();
  });

  it('updates meme preview card when humor preference is toggled', async () => {
    render(<Settings />);
    await waitFor(() => screen.getByRole('button', { name: /tamil comedy/i }));

    const previewCard = screen.getByTestId('meme-preview');
    expect(previewCard.textContent).toContain('Coffee Overdose'); // General dev humor by default

    fireEvent.click(screen.getByRole('button', { name: /tamil comedy/i }));
    await waitFor(() => {
      const updatedCard = screen.getByTestId('meme-preview');
      expect(updatedCard.textContent).toContain('Vadivelu Counters'); // Switches to Tamil humor
    });
  });

  // ─── Loading / success / error UX ─────────────────────────────────────────

  it('disables save button and shows Saving… while update is in flight', async () => {
    let resolveFn!: (v: { error: null }) => void;
    
    // We mock _update so that it returns an object containing eq,
    // which then returns the Promise.
    sb._update.mockReturnValue({
      eq: vi.fn().mockImplementation(() => {
        return new Promise<{ error: null }>(r => { resolveFn = r; });
      }),
    });

    render(<Settings />);
    await waitFor(() => screen.getByLabelText(/username/i));
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    const savingBtn = screen.getByRole('button', { name: /saving/i });
    expect(savingBtn).toBeTruthy();
    expect((savingBtn as HTMLButtonElement).disabled).toBe(true);

    await waitFor(() => expect(resolveFn).toBeDefined());
    await act(async () => { resolveFn({ error: null }); });
  });

  it('shows success toast after confirmed write', async () => {
    render(<Settings />);
    await waitFor(() => screen.getByLabelText(/username/i));
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() =>
      expect(screen.getByText(/saved successfully/i)).toBeTruthy()
    );
  });

  it('shows error toast when Supabase update fails', async () => {
    sb._update.mockReturnValue({
      eq: vi.fn().mockResolvedValue({ error: { message: 'DB write error' } }),
    });

    render(<Settings />);
    await waitFor(() => screen.getByLabelText(/username/i));
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() =>
      expect(screen.getByText(/DB write error/i)).toBeTruthy()
    );
  });
});
