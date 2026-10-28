/**
 * agent-notes: { ctx: "TDD test for problems dashboard client", deps: ["app/problems/ProblemsDashboardClient.tsx"], state: active, last: "tara@2026-09-10" }
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProblemsDashboardClient from '../app/problems/ProblemsDashboardClient';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));

vi.mock('lucide-react', () => {
  const Icon = () => <span data-testid="icon" />;
  return {
    CheckCircle2: Icon,
    Circle: Icon,
    BookOpen: Icon,
    Code2: Icon,
    Trophy: Icon,
    ArrowRight: Icon,
    Sparkles: Icon,
  };
});

vi.mock('@/lib/problems', () => ({
  resolveActiveLanguage: () => 'python',
  getProblemsByChapter: (lang: string) => [
    {
      chapterId: 'ch1',
      chapterTitle: 'Syntax Basics',
      tier: 'beginner',
      problems: [
        {
          id: 'two-sum',
          moduleId: 'ch1-l1',
          chapterId: 'ch1',
          language: lang,
          tier: 'beginner',
          title: 'Two Sum',
          description: 'Solve two sum',
          starterCode: 'def two_sum(): pass',
          testHarness: '===TEST_RESULTS===',
          hints: { english: 'hint', tamilRoast: 'roast' },
        },
      ],
    },
    {
      chapterId: 'ch2',
      chapterTitle: 'Intermediate Topics',
      tier: 'intermediate',
      problems: [
        {
          id: 'reverse-string',
          moduleId: 'ch2-l1',
          chapterId: 'ch2',
          language: lang,
          tier: 'intermediate',
          title: 'Reverse String',
          description: 'Reverse a string',
          starterCode: 'def reverse(): pass',
          testHarness: '===TEST_RESULTS===',
          hints: { english: 'hint', tamilRoast: 'roast' },
        },
      ],
    },
  ],
}));

describe('ProblemsDashboardClient', () => {
  it('renders with initial completed problems and handles difficulty toggle', () => {
    const completedProblems = ['two-sum'];
    render(<ProblemsDashboardClient initialCompletedProblems={completedProblems} />);
    
    expect(screen.getByText('Solve & Conquer.')).toBeTruthy();
    
    const intBtn = screen.getByText('Intermediate');
    fireEvent.click(intBtn);
    
    expect(screen.getByText(/Intermediate Map/)).toBeTruthy();
  });
});
