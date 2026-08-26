import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Login from '../app/login/page';
import Settings from '../app/settings/page';

describe('Authentication Flow', () => {
  it('renders Login page with Google and Facebook OAuth buttons', () => {
    render(<Login />);
    expect(screen.getByText(/Google/i)).toBeDefined();
    expect(screen.getByText(/Facebook/i)).toBeDefined();
  });

  it('renders Humor Selector with General and Tamil options', () => {
    render(<Login />);
    expect(screen.getByText(/General Meme Sense/i)).toBeDefined();
    expect(screen.getByText(/Tamil Comedy Sense/i)).toBeDefined();
  });
});

describe('Settings Flow', () => {
  it('renders settings interface with humor preference toggle', () => {
    render(<Settings />);
    expect(screen.getByText(/Update Password/i)).toBeDefined();
    expect(screen.getByText(/Humor Preference/i)).toBeDefined();
  });
});
