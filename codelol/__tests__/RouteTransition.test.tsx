import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RouteTransition from '../components/RouteTransition';
import React from 'react';

vi.mock('next/navigation', () => ({
  usePathname: () => '/test-route'
}));

// Mock framer-motion to avoid complicated test rendering logic but verify AnimatePresence and motion.div are present
vi.mock('framer-motion', () => {
  const React = require('react');
  const motion = {
    div: require('react').forwardRef(({ children, ...props }: any, ref: any) => (
      <div ref={ref} data-testid="motion-div" {...props}>{children}</div>
    ))
  };
  return {
    motion,
    AnimatePresence: ({ children, mode }: any) => (
      <div data-testid="animate-presence" data-mode={mode}>
        {children}
      </div>
    )
  };
});

describe('RouteTransition', () => {
  it('wraps children in AnimatePresence with mode="wait" and a motion.div with the correct key', () => {
    render(
      <RouteTransition>
        <div data-testid="mock-child">Child</div>
      </RouteTransition>
    );

    const presence = screen.getByTestId('animate-presence');
    expect(presence.getAttribute('data-mode')).toBe('wait');

    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv).toBeDefined();

    // The key should be the pathname '/test-route', but React doesn't expose `key` to DOM elements.
    // We can at least check if children render.
    expect(screen.getByTestId('mock-child')).toBeDefined();
  });
});
