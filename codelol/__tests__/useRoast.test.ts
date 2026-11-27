// agent-notes: { ctx: "Tests for useRoast hook: API roast dispatch and AI-first fallback integration", deps: ["@/hooks/useRoast", "@/lib/codelolAi"], state: active, last: "tara@2026-11-26" }
import { renderHook, act } from '@testing-library/react';
import { useRoast } from '../hooks/useRoast';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('useRoast', () => {
  let fetchMock: any;

  beforeEach(() => {
    // Ensure AI is idle so existing tests always fall through to /api/roast
    mockGetAiStatusSnapshot.mockReturnValue({ status: 'idle' });
    fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          roast: 'Test roast',
          fix: 'Test fix',
          mood: 'facepalm',
        }),
      })
    );
    global.fetch = fetchMock;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('passes humorPref to the API request', async () => {
    const { result } = renderHook(() => useRoast());

    await act(async () => {
      await result.current.handleRoast('console.log(', 'error', false, '', 'tamil');
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const fetchArgs = fetchMock.mock.calls[0];
    expect(fetchArgs[0]).toBe('/api/roast');
    
    const body = JSON.parse(fetchArgs[1].body);
    expect(body.humorPref).toBe('tamil');
  });

  it('defaults to general humorPref if not provided', async () => {
    const { result } = renderHook(() => useRoast());

    await act(async () => {
      await result.current.handleRoast('console.log(', 'error', false, '');
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const fetchArgs = fetchMock.mock.calls[0];
    const body = JSON.parse(fetchArgs[1].body);
    expect(body.humorPref).toBe('general');
  });
});

// ─── AI Integration Tests ────────────────────────────────────────────────────

const { mockGetAiStatusSnapshot, mockGetCodeFeedback, mockSubscribeAiStatus } = vi.hoisted(() => ({
  mockGetAiStatusSnapshot: vi.fn(),
  mockGetCodeFeedback: vi.fn(),
  mockSubscribeAiStatus: vi.fn(),
}));

vi.mock('@/lib/codelolAi', () => ({
  getAiStatusSnapshot: mockGetAiStatusSnapshot,
  getCodeFeedback: mockGetCodeFeedback,
  subscribeAiStatus: mockSubscribeAiStatus,
  loadAiModel: vi.fn(),
  disposeAiModel: vi.fn(),
  clearAiModelCache: vi.fn(),
  isAiModelCached: vi.fn().mockResolvedValue(false),
  normalizeAiLang: vi.fn((l: string) => l),
  normalizeAiProg: vi.fn((p: string) => p),
}));

vi.mock('@/lib/localGifs', () => ({
  getResultGif: vi.fn().mockReturnValue('/gifs/test.gif'),
}));

describe('useRoast AI integration', () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            roast: 'Server roast',
            fix: 'Server fix',
            mood: 'facepalm',
          }),
      })
    );
    global.fetch = fetchMock as unknown as typeof fetch;
    mockSubscribeAiStatus.mockReturnValue(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('calls /api/roast when AI status is idle (not ready)', async () => {
    mockGetAiStatusSnapshot.mockReturnValue({ status: 'idle' });

    const { result } = renderHook(() => useRoast());

    await act(async () => {
      await result.current.handleRoast('code', 'output', false, '', 'general');
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toBe('/api/roast');
    expect(mockGetCodeFeedback).not.toHaveBeenCalled();
  });

  it('calls /api/roast when AI status is loading (not ready)', async () => {
    mockGetAiStatusSnapshot.mockReturnValue({ status: 'loading' });

    const { result } = renderHook(() => useRoast());

    await act(async () => {
      await result.current.handleRoast('code', 'output', false, '', 'general');
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(mockGetCodeFeedback).not.toHaveBeenCalled();
  });

  it('calls getCodeFeedback and sets roastData.roast from joke when AI is ready', async () => {
    mockGetAiStatusSnapshot.mockReturnValue({ status: 'ready' });
    mockGetCodeFeedback.mockResolvedValue({
      condition_satisfied: false,
      error_type: 'SyntaxError',
      type: 'roast',
      joke: 'Bracket-ae maranthutte da!',
    });

    const { result } = renderHook(() => useRoast());

    await act(async () => {
      await result.current.handleRoast('bad code', 'error output', false, '', 'tamil', 'python');
    });

    expect(mockGetCodeFeedback).toHaveBeenCalledWith(
      expect.objectContaining({ code: 'bad code', prog: 'python' })
    );
    expect(fetchMock).not.toHaveBeenCalled();
    expect(result.current.roastData?.roast).toBe('Bracket-ae maranthutte da!');
  });

  it('falls back to /api/roast if getCodeFeedback throws', async () => {
    mockGetAiStatusSnapshot.mockReturnValue({ status: 'ready' });
    mockGetCodeFeedback.mockRejectedValue(new Error('wllama crashed'));

    const { result } = renderHook(() => useRoast());

    await act(async () => {
      await result.current.handleRoast('code', 'output', false, '', 'general');
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(result.current.roastData?.roast).toBe('Server roast');
  });

  it('stale run guard: only second concurrent result is applied to roastData', async () => {
    mockGetAiStatusSnapshot.mockReturnValue({ status: 'idle' });

    let resolveFirst!: () => void;
    let resolveSecond!: () => void;
    const firstFetch = new Promise<Response>((resolve) => {
      resolveFirst = () =>
        resolve({
          ok: true,
          json: async () => ({ roast: 'First roast', fix: '', mood: 'facepalm' }),
        } as Response);
    });
    const secondFetch = new Promise<Response>((resolve) => {
      resolveSecond = () =>
        resolve({
          ok: true,
          json: async () => ({ roast: 'Second roast', fix: '', mood: 'facepalm' }),
        } as Response);
    });

    fetchMock
      .mockReturnValueOnce(firstFetch)
      .mockReturnValueOnce(secondFetch);

    const { result } = renderHook(() => useRoast());

    // Start both concurrently
    let p1!: Promise<void>;
    let p2!: Promise<void>;
    act(() => {
      p1 = result.current.handleRoast('code1', '', false, '', 'general');
      p2 = result.current.handleRoast('code2', '', false, '', 'general');
    });

    // Resolve second first, then first (simulating out-of-order responses)
    resolveSecond();
    await act(async () => {
      await p2;
    });

    resolveFirst();
    await act(async () => {
      await p1;
    });

    // Only second result should be applied (stale guard discards first)
    expect(result.current.roastData?.roast).toBe('Second roast');
  });
});
