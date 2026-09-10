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
    render(<LearnPageClient initialLevel={3} initialHumorPref="general" />);
    expect(screen.getByText(/Level 3 of 100/i)).toBeTruthy();
  });
});
