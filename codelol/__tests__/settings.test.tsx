/**
 * agent-notes: { ctx: "TDD tests for settings page Supabase integration", deps: ["app/settings/page.tsx", "lib/supabase/client.ts"], state: active, last: "tara@2026-08-27" }
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Settings from '../app/settings/page';
import { createClient } from '@/lib/supabase/client';

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
  const mockSelectEq = vi.fn().mockReturnValue({ single: mockSingle });
  const mockSelect = vi.fn().mockReturnValue({ eq: mockSelectEq });

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
    // expose for assertions
    _update: mockUpdate,
    _eq: mockEq,
    _single: mockSingle,
  };
};

describe('Settings Page — Supabase Integration', () => {
  let sb: ReturnType<typeof makeSupabase>;

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    sb = makeSupabase();
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

  // ─── Loading / success / error UX ─────────────────────────────────────────

  it('disables save button and shows Saving… while update is in flight', async () => {
    let resolveFn!: (v: { error: null }) => void;
    sb._update.mockReturnValue({
      eq: vi.fn().mockImplementation(
        () => new Promise<{ error: null }>(r => { resolveFn = r; })
      ),
    });

    render(<Settings />);
    await waitFor(() => screen.getByLabelText(/username/i));
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    const savingBtn = screen.getByRole('button', { name: /saving/i });
    expect(savingBtn).toBeTruthy();
    expect((savingBtn as HTMLButtonElement).disabled).toBe(true);

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
