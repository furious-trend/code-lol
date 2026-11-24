import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { ResumeLearningBanner } from '@/components/ResumeLearningBanner';

describe('ResumeLearningBanner', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders nothing when no item is stored in localStorage', () => {
    const { container } = render(<ResumeLearningBanner />);
    expect(container.firstChild).toBeNull();
  });

  it('renders resume link when topic is saved in localStorage', () => {
    localStorage.setItem(
      'codelol_last_visited_topic',
      JSON.stringify({
        id: 'ch1-l1',
        title: 'Variables & Constants',
        language: 'javascript',
        url: '/learn?lang=javascript&topic=ch1-l1',
      })
    );

    render(<ResumeLearningBanner />);
    expect(screen.getByText('Variables & Constants')).toBeDefined();
    expect(screen.getByText(/Continue where you left off/i)).toBeDefined();
    const link = screen.getByRole('link', { name: /Resume learning: Variables & Constants/i });
    expect(link.getAttribute('href')).toBe('/learn?lang=javascript&topic=ch1-l1');
  });

  it('renders resume link when problem is saved in localStorage', () => {
    localStorage.setItem(
      'codelol_last_visited_problem',
      JSON.stringify({
        id: 'say-hello-to-js',
        title: 'Say Hello to JavaScript',
        language: 'javascript',
        url: '/problems/say-hello-to-js?lang=javascript',
      })
    );

    render(<ResumeLearningBanner />);
    expect(screen.getByText('Say Hello to JavaScript')).toBeDefined();
    const link = screen.getByRole('link', { name: /Resume learning: Say Hello to JavaScript/i });
    expect(link.getAttribute('href')).toBe('/problems/say-hello-to-js?lang=javascript');
  });
});
