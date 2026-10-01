/**
 * agent-notes: { ctx: "TDD tests for learn page client", deps: ["app/learn/LearnPageClient.tsx"], state: active, last: "tara@2026-09-10" }
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import LearnPageClient from '../app/learn/LearnPageClient';

vi.mock('@/lib/supabase/client', () => ({
  createClient: vi.fn(),
}));

vi.mock('@/hooks/useRoast', () => ({
  useRoast: () => ({
    isRoasting: false,
    roastStatus: '',
    roastData: null,
    roastError: '',
    handleRoast: vi.fn(),
    clearRoast: vi.fn(),
  }),
}));

vi.mock('@/hooks/useMemeSound', () => ({
  useMemeSound: () => ({
    playMemeSound: vi.fn(),
  }),
}));

vi.mock('@/hooks/useMicroCelebration', () => ({
  useMicroCelebration: () => ({
    triggerCelebration: vi.fn(),
  }),
}));

vi.mock('@monaco-editor/react', () => ({
  default: () => <div data-testid="monaco-editor" />,
}));

describe('LearnPageClient', () => {
  it('loads level from props immediately', () => {
    render(<LearnPageClient initialLevel={3} highestUnlockedLevel={5} initialHumorPref="general" />);
    expect(screen.getByText(/Level 3 of 100/i)).toBeTruthy();
  });

  it('allows navigating to next level if unlocked', () => {
    render(<LearnPageClient initialLevel={3} highestUnlockedLevel={5} initialHumorPref="general" />);
    const nextBtn = screen.getByText(/Next Level →/i) as HTMLButtonElement;
    expect(nextBtn.disabled).toBe(false);
  });

  it('disables next level button if at highest unlocked level', () => {
    render(<LearnPageClient initialLevel={5} highestUnlockedLevel={5} initialHumorPref="general" />);
    const nextBtn = screen.getByText(/Next Level →/i) as HTMLButtonElement;
    expect(nextBtn.disabled).toBe(true);
  });

  it('disables previous level button on level 1', () => {
    render(<LearnPageClient initialLevel={1} highestUnlockedLevel={5} initialHumorPref="general" />);
    const prevBtn = screen.getByText(/← Previous Level/i) as HTMLButtonElement;
    expect(prevBtn.disabled).toBe(true);
  });
});
