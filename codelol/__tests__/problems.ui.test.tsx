import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProblemSolverPage from '../app/problems/[id]/page';
import React from 'react';
import * as executor from '@/lib/executor';

// Mock confetti
vi.mock('canvas-confetti', () => ({
  default: vi.fn()
}));

// Mock Supabase
vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: { getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'u1' } } }) },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: vi.fn().mockResolvedValue({ data: { humor_preference: 'general' } })
        })
      }),
      upsert: vi.fn().mockResolvedValue({ error: null })
    })
  })
}));

// Mock global fetch for complexity API call
global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: async () => ({ timeComplexity: "O(n)", spaceComplexity: "O(1)" })
});

// Mock problems
vi.mock('@/lib/problems', () => ({
  problems: [
    {
      id: 'two-sum',
      title: 'Two Sum',
      difficulty: 'Beginner',
      description: 'Find two numbers.',
      starterCode: 'function twoSum(nums, target) {}',
      testCases: []
    }
  ],
  resolveActiveLanguage: vi.fn().mockReturnValue('javascript'),
  getModuleProblem: vi.fn(),
  getProblemsByChapter: vi.fn().mockReturnValue([]),
}));

// Mock hooks
vi.mock('@/hooks/useRoast', () => ({
  useRoast: () => ({
    isRoasting: false,
    roastStatus: '',
    roastData: null,
    roastError: null,
    handleRoast: vi.fn(),
    clearRoast: vi.fn()
  })
}));
vi.mock('@/hooks/useMemeSound', () => ({
  useMemeSound: () => ({ playMemeSound: vi.fn() })
}));

// Mock Next.js routing
vi.mock('next/navigation', () => ({
  useParams: () => ({ id: 'two-sum' }), // assume two-sum exists in lib/problems
  useRouter: () => ({ push: vi.fn() })
}));

// Mock Framer motion
vi.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: {
      button: require('react').forwardRef(({ children, whileHover, whileTap, ...props }: any, ref: any) => <button ref={ref} {...props}>{children}</button>),
      div: require('react').forwardRef(({ children, animate, transition, ...props }: any, ref: any) => (
        <div ref={ref} data-testid="motion-div" data-animate={JSON.stringify(animate)} {...props}>{children}</div>
      ))
    },
    AnimatePresence: ({ children }: any) => <div>{children}</div>
  };
});

// Spy on executeCode
vi.spyOn(executor, 'executeCode');

describe('ProblemSolverPage - Execution Feedback', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('triggers failure shake and red pulse on failed execution', async () => {
    (executor.executeCode as any).mockResolvedValueOnce({
      output: '===TEST_RESULTS===\n{"passed": 0, "total": 1, "log": ["Test 1: FAIL"]}',
      error: null
    });

    render(<ProblemSolverPage />);
    const submitBtn = screen.getByText(/Submit & Roast/i);
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Failed: 0 \/ 1 tests passed/i)).toBeDefined();
    });

    // Editor should have the shake animation and red pulse border
    const editorWrapper = screen.getByTestId('editor-wrapper');
    expect(editorWrapper.getAttribute('data-animate')).toContain('-8,8');
    expect(editorWrapper.className).toContain('shadow-[0_0_15px_rgba(239,68,68,0.5)]');
  });

  it('triggers neon green aura on success', async () => {
    (executor.executeCode as any).mockResolvedValueOnce({
      output: '===TEST_RESULTS===\n{"passed": 1, "total": 1, "log": ["Test 1: PASS"]}',
      error: null
    });

    render(<ProblemSolverPage />);
    const submitBtn = screen.getByText(/Submit & Roast/i);
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Test 1: PASS/i)).toBeDefined();
    });

    // Terminal output should have the neon green aura
    const terminalWrapper = screen.getByTestId('terminal-wrapper');
    expect(terminalWrapper.className).toContain('shadow-[inset_0_0_20px_rgba(34,197,94,0.3)]');
  });

  it('runs beginner script problem with expectedOutput and passes without test harness when stdout matches', async () => {
    const { getModuleProblem } = await import('@/lib/problems');
    (getModuleProblem as any).mockReturnValueOnce({
      id: 'hello-world',
      title: 'Hello World',
      starterCode: 'print("Hello World")',
      expectedOutput: 'Hello World',
    });

    (executor.executeCode as any).mockResolvedValueOnce({
      output: 'Hello World\n',
      error: null
    });

    render(<ProblemSolverPage />);
    const submitBtn = screen.getByText(/Submit & Roast/i);
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Output matched expected: "Hello World"/i)).toBeDefined();
    });

    // Verify executeCode was called with raw user code, not wrapped in test harness
    expect(executor.executeCode).toHaveBeenCalledWith('javascript', 'print("Hello World")');
  });

  it('fails beginner script problem when stdout does not match expectedOutput', async () => {
    const { getModuleProblem } = await import('@/lib/problems');
    (getModuleProblem as any).mockReturnValueOnce({
      id: 'hello-world',
      title: 'Hello World',
      starterCode: 'print("Goodbye World")',
      expectedOutput: 'Hello World',
    });

    (executor.executeCode as any).mockResolvedValueOnce({
      output: 'Goodbye World\n',
      error: null
    });

    render(<ProblemSolverPage />);
    const submitBtn = screen.getByText(/Submit & Roast/i);
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Failed: 0 \/ 1 tests passed/i)).toBeDefined();
      expect(screen.getByText(/Expected output: "Hello World"/i)).toBeDefined();
      expect(screen.getByText(/Your output: "Goodbye World"/i)).toBeDefined();
    });
  });

  it('handles OnlineCompiler generic failure error with friendly roast message in output box', async () => {
    (executor.executeCode as any).mockResolvedValueOnce({
      output: 'Internal error: code execution failed',
      error: null
    });

    render(<ProblemSolverPage />);
    const submitBtn = screen.getByText(/Submit & Roast/i);
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Check for missing quotes, missing colons \(:\), or indentation errors!/i)).toBeDefined();
    });
  });

  it('handles OnlineCompiler generic failure in error field with friendly roast message in output box', async () => {
    (executor.executeCode as any).mockResolvedValueOnce({
      output: '',
      error: 'code execution failed'
    });

    render(<ProblemSolverPage />);
    const submitBtn = screen.getByText(/Submit & Roast/i);
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Check for missing quotes, missing colons \(:\), or indentation errors!/i)).toBeDefined();
    });
  });
});

