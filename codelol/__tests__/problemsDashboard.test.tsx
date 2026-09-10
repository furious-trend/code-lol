/**
 * agent-notes: { ctx: "TDD test for problems dashboard client", deps: ["app/problems/ProblemsDashboardClient.tsx"], state: active, last: "tara@2026-09-10" }
 */
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProblemsDashboardClient from '../app/problems/ProblemsDashboardClient';

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
