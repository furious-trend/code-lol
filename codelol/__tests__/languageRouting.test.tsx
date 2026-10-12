// agent-notes: { ctx: "TDD language routing tests for lessons and learn", deps: ["lib/lessons", "app/lessons/page", "app/learn/page"], state: active, last: "tara@2026-10-12" }
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

// Target under test #1
import { getLessonsByLanguage, allLessons } from '../lib/lessons';
import { pythonCurriculum } from '../lib/python/curriculum';

// Target under test #2
import LessonsPage from '../app/lessons/page';

// Target under test #3
import LearnPage from '../app/learn/page';

// Mocks for app/lessons/page.tsx
vi.mock('../app/lessons/PythonLessonsView', () => ({
  PythonLessonsView: () => <div data-testid="python-lessons-view">Python Lessons View</div>
}));

vi.mock('@/components/LanguageToggleBar', () => ({
  LanguageToggleBar: () => <div data-testid="language-toggle-bar" />
}));

vi.mock('@/components/Bugsy', () => ({
  Bugsy: () => <div data-testid="bugsy" />
}));

vi.mock('@/hooks/useRoast', () => ({
  useRoast: () => ({
    isRoasting: false,
    roastStatus: '',
    roastData: null,
    roastError: '',
    handleRoast: vi.fn(),
    clearRoast: vi.fn()
  })
}));

vi.mock('@/lib/supabase/client', () => ({
  createClient: vi.fn().mockReturnValue({
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: null } })
    },
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({ data: null })
        })
      })
    })
  })
}));

// Mocks for app/learn/page.tsx
vi.mock('../app/learn/LearnPagePythonClient', () => ({
  default: () => <div data-testid="learn-page-python-client">Mock LearnPagePythonClient</div>
}));

vi.mock('../app/learn/LearnPageClient', () => ({
  default: () => <div data-testid="learn-page-client">Mock LearnPageClient</div>
}));

vi.mock('next/headers', () => ({
  cookies: vi.fn().mockResolvedValue({
    get: vi.fn().mockReturnValue(undefined)
  })
}));

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'test-user-id' } } })
    },
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: {
              learning_language: 'python',
              humor_preference: 'general',
              current_level: 1,
              python_current_level: 'ch1-l1'
            }
          })
        })
      })
    })
  })
}));

describe('Language Routing TDD Test Suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('1. lib/lessons/index.ts: getLessonsByLanguage', () => {
    it("getLessonsByLanguage('python') returns Python chapters from lib/python/curriculum.ts, not JavaScript lessons", () => {
      expect(typeof getLessonsByLanguage).toBe('function');
      const chapters = getLessonsByLanguage('python');
      expect(chapters).toBeDefined();
      expect(chapters).toEqual(pythonCurriculum);
      expect(chapters).not.toEqual(allLessons);
    });
  });

  describe('2. app/lessons/page.tsx: renders PythonLessonsView when searchParams.lang === "python"', () => {
    it('renders PythonLessonsView when searchParams.lang === "python"', async () => {
      // Set window.location search to ?lang=python
      delete (window as any).location;
      window.location = new URL('http://localhost:3000/lessons?lang=python') as any;

      render(<LessonsPage />);

      await waitFor(() => {
        expect(screen.getByTestId('python-lessons-view')).toBeTruthy();
      });
    });
  });

  describe('3. app/learn/page.tsx: mounts LearnPagePythonClient when profile.learning_language === "python"', () => {
    it('mounts LearnPagePythonClient when profile.learning_language === "python"', async () => {
      const PageComponent = await LearnPage({ searchParams: Promise.resolve({}) });
      render(PageComponent);

      expect(screen.getByTestId('learn-page-python-client')).toBeTruthy();
      expect(screen.queryByTestId('learn-page-client')).toBeNull();
    });
  });
});
