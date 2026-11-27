// agent-notes: { ctx: "Tests for InteractiveCompiler AI-integration: non-blocking run, handleRoast wiring", deps: ["@/components/library/InteractiveCompiler", "@/hooks/useRoast", "@/hooks/useMemeSound", "@/lib/executor"], state: active, last: "tara@2026-11-26" }
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';

// Mock useRoast
const mockHandleRoast = vi.fn();
const mockClearRoast = vi.fn();
vi.mock('@/hooks/useRoast', () => ({
  useRoast: () => ({
    isRoasting: false,
    roastStatus: '',
    roastData: null,
    roastError: null,
    handleRoast: mockHandleRoast,
    clearRoast: mockClearRoast,
  }),
}));

// Mock useMemeSound
const mockPlayMemeSound = vi.fn();
vi.mock('@/hooks/useMemeSound', () => ({
  useMemeSound: () => ({ playMemeSound: mockPlayMemeSound }),
}));

// Mock executor
const mockExecuteCode = vi.fn();
vi.mock('@/lib/executor', () => ({
  executeCode: mockExecuteCode,
}));

// Monaco Editor mock
vi.mock('@monaco-editor/react', () => ({
  default: ({ onChange, value }: { onChange?: (v: string) => void; value?: string }) => (
    <textarea
      data-testid="monaco-editor"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    />
  ),
}));

// Framer motion mock
vi.mock('framer-motion', () => ({
  motion: {
    img: ({ src, alt, ...rest }: React.ImgHTMLAttributes<HTMLImageElement>) => (
      <img src={src} alt={alt} {...rest} />
    ),
  },
}));

// Bugsy mock
vi.mock('@/components/Bugsy', () => ({
  Bugsy: () => <div data-testid="bugsy" />,
}));

// RoastCard mock
vi.mock('@/components/RoastCard', () => ({
  RoastCard: () => <div data-testid="roast-card" />,
}));

// beginnerErrors mock
vi.mock('@/lib/beginnerErrors', () => ({
  translateBeginnerError: () => null,
}));

// AiRoastControls mock
vi.mock('@/components/AiRoastControls', () => ({
  AiRoastControls: () => <div data-testid="ai-roast-controls" />,
}));

describe('InteractiveCompiler AI integration', () => {
  beforeEach(() => {
    mockExecuteCode.mockResolvedValue({ output: 'Hello World', error: null });
    mockHandleRoast.mockResolvedValue(undefined);
    mockPlayMemeSound.mockReturnValue(undefined);
    mockClearRoast.mockReturnValue(undefined);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('calls playMemeSound immediately without waiting for handleRoast to complete', async () => {
    // handleRoast takes a long time
    let resolveHandleRoast!: () => void;
    mockHandleRoast.mockImplementation(
      () => new Promise<void>((resolve) => { resolveHandleRoast = resolve; })
    );

    const { InteractiveCompiler } = await import('@/components/library/InteractiveCompiler');
    render(
      <InteractiveCompiler
        initialCode="console.log('hi')"
        language="javascript"
        expectedOutput="Hello World"
        humorPref="general"
      />
    );

    const runBtn = screen.getByRole('button', { name: /run code/i });
    fireEvent.click(runBtn);

    // playMemeSound should be called without waiting for handleRoast
    await waitFor(() => {
      expect(mockPlayMemeSound).toHaveBeenCalled();
    });

    // handleRoast was called (might still be pending)
    expect(mockHandleRoast).toHaveBeenCalled();

    // Resolve so test cleans up
    resolveHandleRoast?.();
  });

  it('passes expected, actual, and error info to handleRoast on failure', async () => {
    mockExecuteCode.mockResolvedValue({ output: '', error: 'SyntaxError: Unexpected token' });

    const { InteractiveCompiler } = await import('@/components/library/InteractiveCompiler');
    render(
      <InteractiveCompiler
        initialCode="console.log("
        language="javascript"
        expectedOutput="Hello"
        humorPref="general"
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /run code/i }));

    await waitFor(() => {
      expect(mockHandleRoast).toHaveBeenCalledWith(
        expect.any(String),   // code
        expect.any(String),   // error/output message
        false,                // isSuccess
        '',                   // soundUrl
        'general',            // humorPref
        'javascript'          // language
      );
    });
  });

  it('passes isSuccess=true to handleRoast when output matches expected', async () => {
    mockExecuteCode.mockResolvedValue({ output: 'Hello World', error: null });

    const { InteractiveCompiler } = await import('@/components/library/InteractiveCompiler');
    render(
      <InteractiveCompiler
        initialCode="print('Hello World')"
        language="python"
        expectedOutput="Hello World"
        humorPref="general"
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /run code/i }));

    await waitFor(() => {
      expect(mockHandleRoast).toHaveBeenCalledWith(
        expect.any(String),
        'Hello World',
        true,                // isSuccess = true when output matches
        expect.any(String),
        'general',
        'python'
      );
    });
  });
});
