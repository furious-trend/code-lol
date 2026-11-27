// agent-notes: { ctx: "Tests for AiRoastControls component and RoastCard language prop", deps: ["@/components/AiRoastControls", "@/components/RoastCard", "@/lib/codelolAi"], state: active, last: "tara@2026-11-26" }
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';

// Mock codelolAi
const mockGetAiStatusSnapshot = vi.fn();
const mockSubscribeAiStatus = vi.fn();
const mockLoadAiModel = vi.fn();
const mockDisposeAiModel = vi.fn();
const mockClearAiModelCache = vi.fn();
const mockIsAiModelCached = vi.fn();

vi.mock('@/lib/codelolAi', () => ({
  getAiStatusSnapshot: mockGetAiStatusSnapshot,
  subscribeAiStatus: mockSubscribeAiStatus,
  loadAiModel: mockLoadAiModel,
  disposeAiModel: mockDisposeAiModel,
  clearAiModelCache: mockClearAiModelCache,
  isAiModelCached: mockIsAiModelCached,
}));

// Monaco Editor mock
vi.mock('@monaco-editor/react', () => ({
  default: ({ language }: { language?: string }) => (
    <div data-testid="monaco-editor" data-language={language} />
  ),
}));

// Framer motion mock
vi.mock('framer-motion', () => ({
  motion: {
    img: ({ src, alt, ...rest }: React.ImgHTMLAttributes<HTMLImageElement>) => (
      <img src={src} alt={alt} {...rest} />
    ),
    div: ({ children, ...rest }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...rest}>{children}</div>
    ),
  },
}));

// Bugsy mock
vi.mock('@/components/Bugsy', () => ({
  Bugsy: () => <div data-testid="bugsy" />,
}));

// localGifs mock
vi.mock('@/lib/localGifs', () => ({
  getResultGif: vi.fn().mockReturnValue('/gifs/test.gif'),
}));

const idleSnapshot = {
  status: 'idle' as const,
  stage: 'idle' as const,
  progress: 0,
  loadedBytes: 0,
  totalBytes: 0,
  cached: false,
  multithreaded: false,
  error: null,
  deviceWarning: null,
};

const loadingSnapshot = {
  ...idleSnapshot,
  status: 'loading' as const,
  stage: 'downloading' as const,
  progress: 45,
  loadedBytes: 45 * 1024 * 1024,
  totalBytes: 100 * 1024 * 1024,
};

const readySnapshot = {
  ...idleSnapshot,
  status: 'ready' as const,
  stage: 'ready' as const,
  progress: 100,
};

const readyCachedSnapshot = {
  ...readySnapshot,
  cached: true,
};

const errorSnapshot = {
  ...idleSnapshot,
  status: 'error' as const,
  stage: 'error' as const,
  error: 'Network error',
};

describe('AiRoastControls', () => {
  beforeEach(() => {
    mockGetAiStatusSnapshot.mockReturnValue(idleSnapshot);
    mockSubscribeAiStatus.mockReturnValue(() => {}); // returns unsubscribe fn
    mockIsAiModelCached.mockResolvedValue(false);
    mockLoadAiModel.mockResolvedValue(undefined);
    mockDisposeAiModel.mockResolvedValue(undefined);
    mockClearAiModelCache.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders "Enable AI Roast Mode" button in idle state', async () => {
    const { AiRoastControls } = await import('@/components/AiRoastControls');
    render(
      <AiRoastControls
        humorPref="general"
        onHumorPrefChange={vi.fn()}
      />
    );
    expect(screen.getByRole('button', { name: /enable ai roast mode/i })).toBeInTheDocument();
  });

  it('does NOT call loadAiModel on mount', async () => {
    const { AiRoastControls } = await import('@/components/AiRoastControls');
    render(
      <AiRoastControls
        humorPref="general"
        onHumorPrefChange={vi.fn()}
      />
    );
    expect(mockLoadAiModel).not.toHaveBeenCalled();
  });

  it('clicking "Enable AI Roast Mode" calls loadAiModel()', async () => {
    const { AiRoastControls } = await import('@/components/AiRoastControls');
    render(
      <AiRoastControls
        humorPref="general"
        onHumorPrefChange={vi.fn()}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /enable ai roast mode/i }));
    expect(mockLoadAiModel).toHaveBeenCalledTimes(1);
  });

  it('shows progressbar with aria-valuenow when loading', async () => {
    // Subscribe callback captures listener, we test the rendered output with loading snapshot
    mockGetAiStatusSnapshot.mockReturnValue(loadingSnapshot);
    let capturedListener: ((snapshot: typeof loadingSnapshot) => void) | null = null;
    mockSubscribeAiStatus.mockImplementation((listener: (s: typeof loadingSnapshot) => void) => {
      capturedListener = listener;
      return () => {};
    });

    const { AiRoastControls } = await import('@/components/AiRoastControls');
    render(
      <AiRoastControls
        humorPref="general"
        onHumorPrefChange={vi.fn()}
      />
    );

    // The component should use the initial snapshot from getAiStatusSnapshot
    await waitFor(() => {
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toBeInTheDocument();
      expect(progressbar).toHaveAttribute('aria-valuenow', '45');
    });

    expect(screen.getByText(/Loading Roast AI: 45%/i)).toBeInTheDocument();
  });

  it('shows "Clear Cached AI Model" button when cached is true', async () => {
    mockGetAiStatusSnapshot.mockReturnValue(readyCachedSnapshot);

    const { AiRoastControls } = await import('@/components/AiRoastControls');
    render(
      <AiRoastControls
        humorPref="general"
        onHumorPrefChange={vi.fn()}
      />
    );

    const clearBtn = screen.getByRole('button', { name: /clear cached ai model/i });
    expect(clearBtn).toBeInTheDocument();
    fireEvent.click(clearBtn);
    expect(mockClearAiModelCache).toHaveBeenCalledTimes(1);
  });

  it('shows error message and retry button on error state', async () => {
    mockGetAiStatusSnapshot.mockReturnValue(errorSnapshot);

    const { AiRoastControls } = await import('@/components/AiRoastControls');
    render(
      <AiRoastControls
        humorPref="general"
        onHumorPrefChange={vi.fn()}
      />
    );

    expect(screen.getByText(/network error/i)).toBeInTheDocument();
    const retryBtn = screen.getByRole('button', { name: /retry/i });
    expect(retryBtn).toBeInTheDocument();
    fireEvent.click(retryBtn);
    await waitFor(() => {
      expect(mockDisposeAiModel).toHaveBeenCalled();
      expect(mockLoadAiModel).toHaveBeenCalled();
    });
  });

  it('renders English and Tanglish toggle buttons and calls onHumorPrefChange', async () => {
    const onHumorPrefChange = vi.fn();
    const { AiRoastControls } = await import('@/components/AiRoastControls');
    render(
      <AiRoastControls
        humorPref="general"
        onHumorPrefChange={onHumorPrefChange}
      />
    );

    const tanglishBtn = screen.getByRole('button', { name: /tanglish/i });
    const englishBtn = screen.getByRole('button', { name: /english/i });
    expect(tanglishBtn).toBeInTheDocument();
    expect(englishBtn).toBeInTheDocument();

    fireEvent.click(tanglishBtn);
    expect(onHumorPrefChange).toHaveBeenCalledWith('tamil');

    fireEvent.click(englishBtn);
    expect(onHumorPrefChange).toHaveBeenCalledWith('general');
  });
});

describe('RoastCard language prop', () => {
  it('passes language prop to Monaco Editor', async () => {
    const { RoastCard } = await import('@/components/RoastCard');
    render(
      <RoastCard
        roast="Oops!"
        fix="const x = 1;"
        mood="facepalm"
        gifUrl=""
        language="python"
        onDismiss={vi.fn()}
      />
    );

    const editor = screen.getByTestId('monaco-editor');
    expect(editor).toHaveAttribute('data-language', 'python');
  });

  it('defaults Monaco Editor to javascript when language not provided', async () => {
    const { RoastCard } = await import('@/components/RoastCard');
    render(
      <RoastCard
        roast="Oops!"
        fix="const x = 1;"
        mood="facepalm"
        gifUrl=""
        onDismiss={vi.fn()}
      />
    );

    const editor = screen.getByTestId('monaco-editor');
    expect(editor).toHaveAttribute('data-language', 'javascript');
  });
});
