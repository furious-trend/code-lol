// agent-notes: { ctx: "Unit tests for multi-language toggle and curriculum resolution", deps: ["components/LanguageToggleBar", "lib/lessons"], state: active, last: "sato@2026-10-12" }
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LanguageToggleBar, SUPPORTED_LANGUAGES } from '../components/LanguageToggleBar';
import { getCurriculum, getAllLessons, pythonCurriculum } from '../lib/lessons';

const mockPush = vi.fn();
const mockRefresh = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
  usePathname: () => '/learn',
  useSearchParams: () => new URLSearchParams(''),
}));

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
    },
    from: () => ({
      update: () => ({ eq: vi.fn().mockResolvedValue({}) }),
    }),
  }),
}));

describe('LanguageToggleBar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    document.cookie = '';
  });

  it('renders all supported languages', () => {
    render(<LanguageToggleBar activeLanguage="javascript" />);
    SUPPORTED_LANGUAGES.forEach(lang => {
      expect(screen.getByText(lang.label)).toBeTruthy();
    });
  });

  it('highlights the active language', () => {
    render(<LanguageToggleBar activeLanguage="python" />);
    const pythonBtn = screen.getByText('Python').closest('button');
    expect(pythonBtn?.className).toContain('bg-pink-600');
  });

  it('updates cookie, localStorage, URL, and calls refresh when another language is clicked', async () => {
    const onLanguageChange = vi.fn();
    render(<LanguageToggleBar activeLanguage="javascript" onLanguageChange={onLanguageChange} />);
    
    const pythonBtn = screen.getByText('Python').closest('button');
    fireEvent.click(pythonBtn!);

    expect(onLanguageChange).toHaveBeenCalledWith('python');
    expect(document.cookie).toContain('learning_language=python');
    expect(localStorage.getItem('guest_lang')).toBe('python');
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/learn?lang=python');
      expect(mockRefresh).toHaveBeenCalled();
    });
  });
});

describe('Curriculum Resolution in lib/lessons', () => {
  it('returns pythonCurriculum when language is python', () => {
    const result = getCurriculum('python');
    expect(result.type).toBe('python');
    if (result.type === 'python') {
      expect(result.curriculum).toBe(pythonCurriculum);
      expect(result.curriculum.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('returns standard lessons when language is javascript', () => {
    const result = getCurriculum('javascript');
    expect(result.type).toBe('standard');
    if (result.type === 'standard') {
      expect(result.lessons.length).toBeGreaterThan(0);
      expect(result.categories.length).toBeGreaterThan(0);
    }
  });

  it('getAllLessons correctly routes python and other languages', () => {
    const pyLessons = getAllLessons('python');
    const jsLessons = getAllLessons('javascript');
    expect(pyLessons).not.toEqual(jsLessons);
    expect(pyLessons[0].language).toBe('python');
  });
});
