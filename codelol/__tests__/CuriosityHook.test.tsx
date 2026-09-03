import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CuriosityHook from '../components/CuriosityHook';

vi.mock('framer-motion', () => {
  const React = require('react');
  const motion = new Proxy({}, {
    get: (_t: unknown, tag: string) =>
      ({ children, ...props }: Record<string, unknown>) =>
        React.createElement(tag, props, children),
  });
  return { motion, AnimatePresence: ({ children }: { children: unknown }) => children };
});

describe('CuriosityHook', () => {
  it('renders the "Discover a Fact" button initially', () => {
    render(<CuriosityHook />);
    expect(screen.getByRole('button', { name: /Discover a Fact/i })).toBeDefined();
  });

  it('shows a trivia fact when the button is clicked', () => {
    render(<CuriosityHook />);
    const button = screen.getByRole('button', { name: /Discover a Fact/i });
    fireEvent.click(button);

    // The fact container should be visible
    expect(screen.getByText(/Did you know\?/i)).toBeDefined();
    // The close button should be visible
    expect(screen.getByRole('button', { name: '✕' })).toBeDefined();
  });

  it('hides the trivia fact when the close button is clicked', () => {
    render(<CuriosityHook />);
    
    // Open it
    fireEvent.click(screen.getByRole('button', { name: /Discover a Fact/i }));
    expect(screen.getByText(/Did you know\?/i)).toBeDefined();

    // Close it
    fireEvent.click(screen.getByRole('button', { name: '✕' }));
    
    // Button should be back
    expect(screen.getByRole('button', { name: /Discover a Fact/i })).toBeDefined();
  });
});
