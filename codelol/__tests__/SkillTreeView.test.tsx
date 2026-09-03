import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SkillTreeView from '../components/SkillTreeView';
import { allLessons } from '../lib/lessons';

vi.mock('framer-motion', () => {
  const React = require('react');
  const motion = new Proxy({}, {
    get: (_t: unknown, tag: string) =>
      ({ children, ...props }: Record<string, unknown>) =>
        React.createElement(tag, props, children),
  });
  return { motion, AnimatePresence: ({ children }: { children: unknown }) => children };
});

describe('SkillTreeView', () => {
  it('renders tiers correctly based on lessons', () => {
    const mockOnSelect = vi.fn();
    render(<SkillTreeView currentLevel={1} onSelectLevel={mockOnSelect} />);
    
    // Check if tiers are rendered
    expect(screen.getByText('Beginner')).toBeDefined();
    if (allLessons.some(l => l.tier === 'Intermediate')) {
      expect(screen.getByText('Intermediate')).toBeDefined();
    }
  });

  it('allows clicking on unlocked lessons and blocks locked ones', () => {
    const mockOnSelect = vi.fn();
    render(<SkillTreeView currentLevel={2} onSelectLevel={mockOnSelect} />);
    
    // Level 1 should be unlocked and clickable
    const level1Btn = screen.getByText('1').closest('button');
    expect(level1Btn).toBeDefined();
    expect(level1Btn?.disabled).toBe(false);
    fireEvent.click(level1Btn!);
    expect(mockOnSelect).toHaveBeenCalledWith(1);

    // Level 2 should be unlocked and clickable
    const level2Btn = screen.getByText('2').closest('button');
    expect(level2Btn?.disabled).toBe(false);
    fireEvent.click(level2Btn!);
    expect(mockOnSelect).toHaveBeenCalledWith(2);

    // Level 3 should be locked
    const level3Btn = screen.getByText('3').closest('button');
    expect(level3Btn?.disabled).toBe(true);
  });
});
