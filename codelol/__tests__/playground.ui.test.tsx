// agent-notes: { ctx: "UI tests for Playground draft persistence and beginner tip non-overlapping layout", deps: ["../app/playground/page", "@/lib/executor"], state: "active", last: "tara@2026-11-26" }
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PlaygroundPage from '../app/playground/page';
import * as executor from '@/lib/executor';

vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('@monaco-editor/react', () => ({
  default: ({ value, onChange }: { value: string; onChange: (val: string) => void }) => (
    <textarea
      data-testid="monaco-mock"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
  loader: {},
}));

const MOTION_PROPS = new Set(['whileHover', 'whileTap', 'transition', 'initial', 'animate', 'exit']);

vi.mock('framer-motion', () => {
  const React = require('react');
  const motion = new Proxy(
    {},
    {
      get: (_t: unknown, tag: string) =>
        ({ children, ...props }: Record<string, unknown>) => {
          const domProps = Object.fromEntries(
            Object.entries(props).filter(([key]) => !MOTION_PROPS.has(key))
          );
          return React.createElement(tag, domProps, children);
        },
    }
  );
  return { motion, AnimatePresence: ({ children }: { children: unknown }) => children };
});

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: { getUser: vi.fn().mockResolvedValue({ data: { user: null } }) },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: vi.fn().mockResolvedValue({ data: null }),
        }),
      }),
    }),
  }),
}));

vi.mock('@/hooks/useMemeSound', () => ({
  useMemeSound: () => ({ playMemeSound: vi.fn() }),
}));

vi.mock('@/hooks/useRoast', () => ({
  useRoast: () => ({
    isRoasting: false,
    roastStatus: '',
    roastData: null,
    roastError: 'Simulated roast error',
    handleRoast: vi.fn(),
    clearRoast: vi.fn(),
  }),
}));

vi.mock('@/lib/executor', () => ({
  executeCode: vi.fn(),
}));

describe('PlaygroundPage fixes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('preserves saved guest draft in localStorage when guest_lang is set', async () => {
    localStorage.setItem('guest_lang', 'javascript');
    localStorage.setItem('draft_playground_javascript', 'console.log("My saved draft");');

    render(<PlaygroundPage />);

    await waitFor(() => {
      const editor = screen.getByTestId('monaco-mock') as HTMLTextAreaElement;
      expect(editor.value).toBe('console.log("My saved draft");');
    });
  });

  it('renders Beginner Tip outside the absolute roast status overlay container so errors never overlap tips', async () => {
    (executor.executeCode as any).mockResolvedValueOnce({
      output: '',
      error: 'ReferenceError: myVar is not defined',
    });

    render(<PlaygroundPage />);
    const runBtn = screen.getByRole('button', { name: /Submit & Roast/i });
    fireEvent.click(runBtn);

    await waitFor(() => {
      expect(screen.getByText(/Undefined Variable: "myVar"/i)).toBeDefined();
    });

    const tipEl = screen.getByTestId('playground-beginner-tip');
    const roastOverlayContainer = screen.getByTestId('playground-roast-stage');
    expect(roastOverlayContainer.contains(tipEl)).toBe(false);
  });
});
