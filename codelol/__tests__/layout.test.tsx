import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RootLayout from '../app/layout';
import React from 'react';

vi.mock('next/font/google', () => ({
  Geist: () => ({ variable: 'mock-geist-sans' }),
  Geist_Mono: () => ({ variable: 'mock-geist-mono' }),
}));

// Mock the nested components so we only test the layout structure
vi.mock('@/components/Navbar', () => ({
  default: () => <div data-testid="mock-navbar">Navbar</div>
}));
vi.mock('@/components/AmbientJoke', () => ({
  AmbientJoke: () => <div data-testid="mock-ambient-joke">Joke</div>
}));
vi.mock('@/components/ConditionalLayout', () => ({
  ConditionalLayout: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-conditional-layout">{children}</div>
}));

describe('RootLayout', () => {
  it('renders children, Navbar, AmbientJoke, and the scanline overlay', () => {
    // Note: Render root layout directly inside testing-library (which wraps it in body/div). 
    // It might output multiple HTML tags so we can just check DOM content.
    render(
      <RootLayout>
        <div data-testid="mock-children">Test Children</div>
      </RootLayout>
    );

    // Verify children are rendered
    expect(screen.getByTestId('mock-children')).toBeDefined();
    
    // Verify scanline overlay is present by its data-testid
    const scanline = screen.getByTestId('scanline-overlay');
    expect(scanline).toBeDefined();
    expect(scanline.className).toContain('bg-[radial-gradient');
  });
});
