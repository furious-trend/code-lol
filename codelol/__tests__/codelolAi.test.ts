// agent-notes: { ctx: "Unit tests for browser wllama AI inference service", deps: ["@/lib/codelolAi", "@wllama/wllama"], state: active, last: "tara@2026-11-26" }
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const mocks = vi.hoisted(() => {
  const state = {
    lastPathConfig: null as unknown,
    wllamaCtorBehavior: null as ((pathConfig: unknown, wllamaConfig?: unknown) => void) | null,
  };

  const cacheManager = {
    list: vi.fn<
      () => Promise<
        Array<{
          name: string;
          size: number;
          metadata: { originalURL: string; originalSize: number; etag: string };
        }>
      >
    >(),
    clear: vi.fn<() => Promise<void>>(),
    open: vi.fn(),
    getSize: vi.fn(),
    getMetadata: vi.fn(),
    getNameFromURL: vi.fn(),
    download: vi.fn(),
    delete: vi.fn(),
  };

  const loadModelFromHF = vi.fn();
  const loadModelFromUrl = vi.fn();
  const createChatCompletion = vi.fn();
  const exit = vi.fn();
  const isModelLoaded = vi.fn(() => true);
  const isMultithread = vi.fn(() => false);
  const getNumThreads = vi.fn(() => 1);
  const wllamaConstructorSpy = vi.fn();

  class MockWllama {
    cacheManager = cacheManager;
    modelManager = {
      clear: cacheManager.clear,
      getModels: vi.fn(async () => []),
    };
    loadModelFromHF = loadModelFromHF;
    loadModelFromUrl = loadModelFromUrl;
    createChatCompletion = createChatCompletion;
    exit = exit;
    isModelLoaded = isModelLoaded;
    isMultithread = isMultithread;
    getNumThreads = getNumThreads;

    constructor(pathConfig: unknown, wllamaConfig?: unknown) {
      state.lastPathConfig = pathConfig;
      wllamaConstructorSpy(pathConfig, wllamaConfig);
      if (state.wllamaCtorBehavior) {
        state.wllamaCtorBehavior(pathConfig, wllamaConfig);
      }
    }
  }

  class MockCacheManager {
    list = cacheManager.list;
    clear = cacheManager.clear;
    open = cacheManager.open;
    getSize = cacheManager.getSize;
    getMetadata = cacheManager.getMetadata;
    getNameFromURL = cacheManager.getNameFromURL;
    download = cacheManager.download;
    delete = cacheManager.delete;
  }

  class MockWllamaError extends Error {
    type: string;
    constructor(message: string, type: string = 'unknown_error') {
      super(message);
      this.name = 'WllamaError';
      this.type = type;
    }
  }

  return {
    state,
    cacheManager,
    loadModelFromHF,
    loadModelFromUrl,
    createChatCompletion,
    exit,
    isModelLoaded,
    isMultithread,
    getNumThreads,
    wllamaConstructorSpy,
    MockWllama,
    MockCacheManager,
    MockWllamaError,
    wasmFromCdn: {
      default: 'https://cdn.jsdelivr.net/npm/@wllama/wllama@4.0.0/esm/wasm/wllama.wasm',
    },
    wasmCompatFromCdn: {
      wasm: 'https://cdn.jsdelivr.net/npm/@wllama/wllama-compat@4.0.0/wasm/wllama.wasm',
    },
  };
});

vi.mock('@wllama/wllama', () => ({
  Wllama: mocks.MockWllama,
  CacheManager: mocks.MockCacheManager,
  WllamaError: mocks.MockWllamaError,
  LoggerWithoutDebug: { ...console, debug: () => {} },
}));

vi.mock('@wllama/wllama/esm/wasm-from-cdn.js', () => ({
  default: mocks.wasmFromCdn,
  WasmCompatFromCDN: mocks.wasmCompatFromCdn,
}));

import {
  DEFAULT_HF_MODEL_REPO,
  DEFAULT_HF_MODEL_FILE,
  normalizeAiLang,
  normalizeAiProg,
  getAiStatusSnapshot,
  subscribeAiStatus,
  isAiModelCached,
  isLowMemoryDevice,
  loadAiModel,
  disposeAiModel,
  clearAiModelCache,
  getCodeFeedback,
} from '@/lib/codelolAi';

interface PropertyBackup {
  target: object;
  key: PropertyKey;
  descriptor: PropertyDescriptor | undefined;
}

const propertyBackups: PropertyBackup[] = [];

function overrideProp(target: object, key: PropertyKey, value: unknown): void {
  const existing = propertyBackups.find((b) => b.target === target && b.key === key);
  if (!existing) {
    propertyBackups.push({
      target,
      key,
      descriptor: Object.getOwnPropertyDescriptor(target, key),
    });
  }
  Object.defineProperty(target, key, {
    value,
    configurable: true,
    writable: true,
  });
}

function restoreProps(): void {
  while (propertyBackups.length > 0) {
    const backup = propertyBackups.pop()!;
    if (backup.descriptor) {
      Object.defineProperty(backup.target, backup.key, backup.descriptor);
    } else {
      delete (backup.target as Record<PropertyKey, unknown>)[backup.key];
    }
  }
}

function makeCachedEntry(
  repo: string = 'shafiqahmed0075/codelol',
  file: string = 'codelol.gguf',
  size: number = 521_000_000
) {
  return {
    name: `sha1hash_${file}`,
    size,
    metadata: {
      originalURL: `https://huggingface.co/${repo}/resolve/main/${file}`,
      originalSize: size,
      etag: '"mock-etag"',
    },
  };
}

function makeChatResponse(content: string) {
  return {
    id: 'chatcmpl-test',
    object: 'chat.completion',
    created: 1_700_000_000,
    model: 'codelol.gguf',
    choices: [
      {
        index: 0,
        message: { role: 'assistant', content },
        finish_reason: 'stop',
        logprobs: null,
      },
    ],
    usage: { prompt_tokens: 20, completion_tokens: 20, total_tokens: 40 },
  };
}

describe('codelolAi', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    mocks.state.lastPathConfig = null;
    mocks.state.wllamaCtorBehavior = null;
    mocks.cacheManager.list.mockResolvedValue([]);
    mocks.cacheManager.clear.mockResolvedValue(undefined);
    mocks.loadModelFromHF.mockResolvedValue(undefined);
    mocks.loadModelFromUrl.mockResolvedValue(undefined);
    mocks.exit.mockResolvedValue(undefined);
    mocks.isModelLoaded.mockReturnValue(true);

    overrideProp(window, 'crossOriginIsolated', false);
    overrideProp(window.navigator, 'deviceMemory', 8);
    overrideProp(window.navigator, 'hardwareConcurrency', 8);
    overrideProp(window.navigator, 'storage', {
      estimate: vi.fn().mockResolvedValue({
        quota: 2 * 1024 * 1024 * 1024,
        usage: 100 * 1024 * 1024,
      }),
    });

    await disposeAiModel();
  });

  afterEach(async () => {
    await disposeAiModel();
    restoreProps();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  describe('constants and normalizers', () => {
    it('exports expected public Hugging Face model defaults', () => {
      expect(DEFAULT_HF_MODEL_REPO).toBe('shafiqahmed0075/codelol');
      expect(DEFAULT_HF_MODEL_FILE).toBe('codelol.gguf');
    });

    it('normalizes humor/language inputs to en or ta-Latn', () => {
      expect(normalizeAiLang('tamil')).toBe('ta-Latn');
      expect(normalizeAiLang('ta-Latn')).toBe('ta-Latn');
      expect(normalizeAiLang('  TA-LATN ')).toBe('ta-Latn');
      expect(normalizeAiLang('ta')).toBe('ta-Latn');
      expect(normalizeAiLang('tanglish')).toBe('ta-Latn');
      expect(normalizeAiLang('general')).toBe('en');
      expect(normalizeAiLang('en')).toBe('en');
      expect(normalizeAiLang('english')).toBe('en');
      expect(normalizeAiLang('')).toBe('en');
      expect(normalizeAiLang(undefined)).toBe('en');
    });

    it('normalizes programming language aliases cleanly', () => {
      expect(normalizeAiProg('python')).toBe('python');
      expect(normalizeAiProg('PYTHON')).toBe('python');
      expect(normalizeAiProg('py')).toBe('python');
      expect(normalizeAiProg('javascript')).toBe('javascript');
      expect(normalizeAiProg('js')).toBe('javascript');
      expect(normalizeAiProg('cpp')).toBe('cpp');
      expect(normalizeAiProg('c++')).toBe('cpp');
      expect(normalizeAiProg('c')).toBe('c');
      expect(normalizeAiProg('java')).toBe('java');
      const fallback = normalizeAiProg(undefined);
      expect(typeof fallback).toBe('string');
      expect(fallback.length).toBeGreaterThan(0);
    });
  });

  describe('SSR safety and lazy loading', () => {
    it('imports without crashing or instantiating Wllama when window and navigator are undefined', async () => {
      vi.resetModules();
      vi.stubGlobal('window', undefined);
      vi.stubGlobal('navigator', undefined);

      const ssrModule = await import('@/lib/codelolAi');
      expect(mocks.wllamaConstructorSpy).not.toHaveBeenCalled();
      expect(ssrModule.isLowMemoryDevice()).toBe(false);
      await expect(ssrModule.isAiModelCached()).resolves.toBe(false);
      expect(ssrModule.getAiStatusSnapshot()).toMatchObject({
        status: 'idle',
        progress: 0,
        error: null,
      });

      await ssrModule.loadAiModel().catch(() => undefined);
      expect(mocks.loadModelFromHF).not.toHaveBeenCalled();
      await ssrModule.disposeAiModel();
    });
  });

  describe('device memory and storage guards', () => {
    it('detects low-memory devices when navigator.deviceMemory < 4', () => {
      overrideProp(window.navigator, 'deviceMemory', 2);
      expect(isLowMemoryDevice()).toBe(true);

      overrideProp(window.navigator, 'deviceMemory', 4);
      expect(isLowMemoryDevice()).toBe(false);

      overrideProp(window.navigator, 'deviceMemory', undefined);
      expect(isLowMemoryDevice()).toBe(false);
    });

    it('sets deviceWarning in snapshot when navigator.deviceMemory < 4', async () => {
      overrideProp(window.navigator, 'deviceMemory', 2);
      await loadAiModel().catch(() => undefined);

      expect(getAiStatusSnapshot().deviceWarning).toBeTruthy();
    });

    it('clears/omits deviceWarning when navigator.deviceMemory >= 4', async () => {
      overrideProp(window.navigator, 'deviceMemory', 8);
      await loadAiModel();

      expect(getAiStatusSnapshot().deviceWarning).toBeFalsy();
    });

    it('surfaces friendly storage error without downloading when uncached and free storage < 650 MiB', async () => {
      mocks.cacheManager.list.mockResolvedValue([]);
      overrideProp(window.navigator, 'storage', {
        estimate: vi.fn().mockResolvedValue({
          quota: 700 * 1024 * 1024,
          usage: 100 * 1024 * 1024, // 600 MiB free (< 650 MiB)
        }),
      });

      await loadAiModel().catch(() => undefined);

      expect(mocks.loadModelFromHF).not.toHaveBeenCalled();
      const snapshot = getAiStatusSnapshot();
      expect(snapshot.status).toBe('error');
      expect(snapshot.error).toMatch(/storage|space|650/i);
    });

    it('allows loading when free storage < 650 MiB if the model is already cached', async () => {
      mocks.cacheManager.list.mockResolvedValue([makeCachedEntry()]);
      overrideProp(window.navigator, 'storage', {
        estimate: vi.fn().mockResolvedValue({
          quota: 600 * 1024 * 1024,
          usage: 550 * 1024 * 1024, // 50 MiB free, already cached
        }),
      });

      await loadAiModel();

      expect(mocks.loadModelFromHF).toHaveBeenCalledTimes(1);
      expect(getAiStatusSnapshot().status).toBe('ready');
    });

    it('handles QuotaExceededError gracefully with a friendly error message', async () => {
      const quotaErr = Object.assign(new Error('Storage quota exceeded'), {
        name: 'QuotaExceededError',
      });
      mocks.loadModelFromHF.mockRejectedValueOnce(quotaErr);

      await loadAiModel().catch(() => undefined);

      const snapshot = getAiStatusSnapshot();
      expect(snapshot.status).toBe('error');
      expect(snapshot.error).toMatch(/storage|quota|private/i);
    });

    it('degrades gracefully when navigator.storage is unavailable', async () => {
      overrideProp(window.navigator, 'storage', undefined);

      await loadAiModel();

      expect(mocks.loadModelFromHF).toHaveBeenCalledTimes(1);
      expect(getAiStatusSnapshot().status).toBe('ready');
    });
  });

  describe('model loading, WASM fallback, threading, and single-flight', () => {
    it('loads default HF model with self-hosted WASM and n_threads=1 when not crossOriginIsolated', async () => {
      overrideProp(window, 'crossOriginIsolated', false);

      await loadAiModel();

      expect(mocks.wllamaConstructorSpy).toHaveBeenCalledWith(
        { default: '/wasm/wllama.wasm' },
        expect.anything()
      );
      expect(mocks.loadModelFromHF).toHaveBeenCalledWith(
        expect.objectContaining({
          repo: DEFAULT_HF_MODEL_REPO,
          file: DEFAULT_HF_MODEL_FILE,
        }),
        expect.objectContaining({
          n_ctx: 1024,
          jinja: true,
          n_threads: 1,
          useCache: true,
          progressCallback: expect.any(Function),
        })
      );

      const hfOptions = mocks.loadModelFromHF.mock.calls[0][0] as Record<string, unknown>;
      expect(hfOptions.hfToken).toBeUndefined();

      expect(getAiStatusSnapshot()).toMatchObject({
        status: 'ready',
        multithreaded: false,
        error: null,
      });
    });

    it('uses n_threads > 1 and reports multithreaded=true when crossOriginIsolated is true', async () => {
      overrideProp(window, 'crossOriginIsolated', true);
      overrideProp(window.navigator, 'hardwareConcurrency', 8);

      await loadAiModel();

      const params = mocks.loadModelFromHF.mock.calls[0][1] as { n_threads: number };
      expect(params.n_threads).toBeGreaterThan(1);
      expect(getAiStatusSnapshot().multithreaded).toBe(true);
    });

    it('reads NEXT_PUBLIC_HF_MODEL_REPO and NEXT_PUBLIC_HF_MODEL_FILE overrides', async () => {
      vi.resetModules();
      vi.stubEnv('NEXT_PUBLIC_HF_MODEL_REPO', 'custom-org/custom-codelol');
      vi.stubEnv('NEXT_PUBLIC_HF_MODEL_FILE', 'custom-q4.gguf');

      const freshAi = await import('@/lib/codelolAi');
      try {
        await freshAi.loadAiModel();
        expect(mocks.loadModelFromHF).toHaveBeenCalledWith(
          expect.objectContaining({
            repo: 'custom-org/custom-codelol',
            file: 'custom-q4.gguf',
          }),
          expect.objectContaining({
            n_ctx: 1024,
            jinja: true,
            useCache: true,
          })
        );
      } finally {
        await freshAi.disposeAiModel();
      }
    });

    it('falls back to WasmFromCDN when local /wasm/wllama.wasm initialization throws', async () => {
      mocks.loadModelFromHF.mockImplementation(async () => {
        const cfg = mocks.state.lastPathConfig as { default?: string } | null;
        if (cfg?.default === '/wasm/wllama.wasm') {
          throw new Error('Failed to fetch /wasm/wllama.wasm');
        }
      });

      await loadAiModel();

      expect(mocks.wllamaConstructorSpy).toHaveBeenCalledTimes(2);
      expect(mocks.wllamaConstructorSpy.mock.calls[0][0]).toEqual({
        default: '/wasm/wllama.wasm',
      });
      expect(mocks.wllamaConstructorSpy.mock.calls[1][0]).toEqual(mocks.wasmFromCdn);
      expect(getAiStatusSnapshot().status).toBe('ready');
    });

    it('transitions to error status if both local WASM and WasmFromCDN fail', async () => {
      mocks.loadModelFromHF.mockRejectedValue(new Error('WASM initialization failed'));

      await loadAiModel().catch(() => undefined);

      const snapshot = getAiStatusSnapshot();
      expect(snapshot.status).toBe('error');
      expect(snapshot.error).toBeTruthy();
    });

    it('deduplicates concurrent loadAiModel calls (single-flight)', async () => {
      let resolveLoad!: () => void;
      mocks.loadModelFromHF.mockImplementationOnce(
        () =>
          new Promise<void>((resolve) => {
            resolveLoad = resolve;
          })
      );

      const first = loadAiModel();
      const second = loadAiModel();

      await vi.waitFor(() => {
        expect(mocks.loadModelFromHF).toHaveBeenCalledTimes(1);
      });

      resolveLoad();
      await Promise.all([first, second]);
      expect(getAiStatusSnapshot().status).toBe('ready');

      // Calling again when already ready does not re-download
      await loadAiModel();
      expect(mocks.loadModelFromHF).toHaveBeenCalledTimes(1);
    });
  });

  describe('status snapshot, subscriptions, and progress tracking', () => {
    it('publishes loading progress and ready updates to subscribers until unsubscribed', async () => {
      const snapshots: Array<ReturnType<typeof getAiStatusSnapshot>> = [];
      const unsubscribe = subscribeAiStatus((snap) => {
        snapshots.push(snap);
      });

      mocks.loadModelFromHF.mockImplementationOnce(async (_hf, params) => {
        params.progressCallback({ loaded: 0, total: 0 });
        params.progressCallback({ loaded: 250, total: 1000 });
        params.progressCallback({ loaded: 1000, total: 1000 });
      });

      await loadAiModel();

      const progressSnap = snapshots.find((s) => s.loadedBytes === 250);
      expect(progressSnap).toMatchObject({
        status: 'loading',
        loadedBytes: 250,
        totalBytes: 1000,
        progress: 25,
      });

      const zeroTotalSnap = snapshots.find((s) => s.totalBytes === 0 && s.status === 'loading');
      if (zeroTotalSnap) {
        expect(Number.isFinite(zeroTotalSnap.progress)).toBe(true);
      }

      expect(getAiStatusSnapshot()).toMatchObject({
        status: 'ready',
        progress: 100,
      });

      const countBeforeUnsub = snapshots.length;
      unsubscribe();
      await disposeAiModel();
      expect(snapshots.length).toBe(countBeforeUnsub);
    });
  });

  describe('caching, offline repeat loads, and 401/403 repo errors', () => {
    it('reports cache status accurately via isAiModelCached()', async () => {
      mocks.cacheManager.list.mockResolvedValueOnce([]);
      await expect(isAiModelCached()).resolves.toBe(false);

      mocks.cacheManager.list.mockResolvedValueOnce([makeCachedEntry()]);
      await expect(isAiModelCached()).resolves.toBe(true);

      mocks.cacheManager.list.mockResolvedValueOnce([
        makeCachedEntry('someone/else', 'other-model.gguf', 500_000_000),
      ]);
      await expect(isAiModelCached()).resolves.toBe(false);

      mocks.cacheManager.list.mockResolvedValueOnce([
        makeCachedEntry('shafiqahmed0075/codelol', 'codelol.gguf', 0),
      ]);
      await expect(isAiModelCached()).resolves.toBe(false);

      mocks.cacheManager.list.mockRejectedValueOnce(new Error('OPFS unavailable'));
      await expect(isAiModelCached()).resolves.toBe(false);
    });

    it('surfaces a friendly error for HTTP 401 or 403 private repo failures', async () => {
      mocks.loadModelFromHF.mockRejectedValueOnce(
        new Error('HF API error (401): Unauthorized')
      );

      await loadAiModel().catch(() => undefined);

      let snapshot = getAiStatusSnapshot();
      expect(snapshot.status).toBe('error');
      expect(snapshot.error).toMatch(/401|403|private|unauthorized|access|repo/i);

      await disposeAiModel();
      mocks.loadModelFromHF.mockRejectedValueOnce(
        new Error('Failed to fetch model: HTTP 403')
      );

      await loadAiModel().catch(() => undefined);

      snapshot = getAiStatusSnapshot();
      expect(snapshot.status).toBe('error');
      expect(snapshot.error).toMatch(/401|403|private|forbidden|access|repo/i);
    });

    it('falls back to loadModelFromUrl for offline repeat loads when model exists in cacheManager.list()', async () => {
      const cached = makeCachedEntry();
      mocks.cacheManager.list.mockResolvedValue([cached]);
      mocks.loadModelFromHF.mockRejectedValueOnce(new TypeError('Failed to fetch'));

      await loadAiModel();

      expect(mocks.loadModelFromUrl).toHaveBeenCalledTimes(1);
      const [urlArg, urlParams] = mocks.loadModelFromUrl.mock.calls[0];
      const resolvedUrl =
        typeof urlArg === 'string' ? urlArg : (urlArg as { url?: string })?.url;
      expect(resolvedUrl).toBe(cached.metadata.originalURL);
      expect(urlParams).toMatchObject({
        n_ctx: 1024,
        jinja: true,
        useCache: true,
      });
      expect(getAiStatusSnapshot()).toMatchObject({
        status: 'ready',
        cached: true,
        error: null,
      });
    });
  });

  describe('disposeAiModel and clearAiModelCache', () => {
    it('unloads active model via wllama.exit(), resets status, and is idempotent', async () => {
      await loadAiModel();
      expect(getAiStatusSnapshot().status).toBe('ready');

      await disposeAiModel();
      expect(mocks.exit).toHaveBeenCalledTimes(1);
      expect(getAiStatusSnapshot()).toMatchObject({
        status: 'idle',
        progress: 0,
        loadedBytes: 0,
        totalBytes: 0,
        error: null,
      });

      // Safe to call repeatedly when already disposed
      await expect(disposeAiModel()).resolves.toBeUndefined();
    });

    it('clears cached weights via cacheManager.clear() and marks cached=false', async () => {
      mocks.cacheManager.list.mockResolvedValue([makeCachedEntry()]);
      await loadAiModel();

      await clearAiModelCache();

      expect(mocks.cacheManager.clear).toHaveBeenCalledTimes(1);
      expect(getAiStatusSnapshot().cached).toBe(false);
    });
  });

  describe('getCodeFeedback', () => {
    it('rejects when called before model is loaded', async () => {
      await expect(
        getCodeFeedback({
          lang: 'en',
          prog: 'python',
          expected: '42',
          actual: '42',
          error: '',
          code: 'print(42)',
        })
      ).rejects.toThrow();
    });

    it('invokes createChatCompletion with CODELOL_VERIFIER_V2 prompt and exact sampling config', async () => {
      await loadAiModel();
      mocks.createChatCompletion.mockResolvedValueOnce(
        makeChatResponse(
          JSON.stringify({
            condition_satisfied: true,
            error_type: 'None',
            type: 'praise',
            joke: 'Clean print da machi!',
          })
        )
      );

      const feedback = await getCodeFeedback({
        lang: 'tamil',
        prog: 'py',
        expected: '42',
        actual: '42',
        error: '',
        code: 'print(42)',
      });

      expect(mocks.createChatCompletion).toHaveBeenCalledWith(
        expect.objectContaining({
          messages: [
            { role: 'system', content: 'CODELOL_VERIFIER_V2' },
            {
              role: 'user',
              content:
                'lang:ta-Latn | prog:python | expected:42 | actual:42 | error:None | code:print(42)',
            },
          ],
          max_tokens: 70,
          temperature: 0.7,
          top_p: 0.8,
          top_k: 20,
          response_format: { type: 'json_object' },
          chat_template_kwargs: { enable_thinking: false },
        })
      );

      expect(feedback).toMatchObject({
        condition_satisfied: true,
        error_type: 'None',
        type: 'praise',
        joke: 'Clean print da machi!',
      });
    });

    it('strips <think>...</think> blocks and markdown code fences before parsing JSON', async () => {
      await loadAiModel();
      mocks.createChatCompletion.mockResolvedValueOnce(
        makeChatResponse(
          '<think>Checking syntax...\n{"ignore": true}</think>\n```json\n{"condition_satisfied":false,"error_type":"SyntaxError","type":"roast","joke":"Bracket enga da?"}\n```'
        )
      );

      const feedback = await getCodeFeedback({
        lang: 'ta-Latn',
        prog: 'js',
        expected: 'N/A',
        actual: '',
        error: 'SyntaxError: Unexpected end of input',
        code: 'console.log(',
      });

      expect(feedback).toMatchObject({
        condition_satisfied: false,
        error_type: 'SyntaxError',
        type: 'roast',
        joke: 'Bracket enga da?',
      });
    });

    it('enforces compiler truth override when expected output matches (overrides false -> true)', async () => {
      await loadAiModel();
      mocks.createChatCompletion.mockResolvedValueOnce(
        makeChatResponse(
          JSON.stringify({
            condition_satisfied: false,
            error_type: 'LogicError',
            type: 'roast',
            joke: 'Nice output, compiler agrees even if I panicked.',
          })
        )
      );

      const feedback = await getCodeFeedback({
        lang: 'en',
        prog: 'python',
        expected: 'Hello\n',
        actual: '  Hello  ',
        error: 'None',
        code: 'print("Hello")',
      });

      expect(feedback.condition_satisfied).toBe(true);
    });

    it('enforces compiler truth override when expected output mismatches (overrides true -> false)', async () => {
      await loadAiModel();
      mocks.createChatCompletion.mockResolvedValueOnce(
        makeChatResponse(
          JSON.stringify({
            condition_satisfied: true,
            error_type: 'None',
            type: 'praise',
            joke: 'Looks fine!',
          })
        )
      );

      const feedback = await getCodeFeedback({
        lang: 'en',
        prog: 'javascript',
        expected: '10',
        actual: '9',
        error: '',
        code: 'console.log(9)',
      });

      expect(feedback.condition_satisfied).toBe(false);
    });

    it('enforces compiler truth override when execution error exists even if stdout matches expected', async () => {
      await loadAiModel();
      mocks.createChatCompletion.mockResolvedValueOnce(
        makeChatResponse(
          JSON.stringify({
            condition_satisfied: true,
            error_type: 'None',
            type: 'praise',
            joke: 'Great!',
          })
        )
      );

      const feedback = await getCodeFeedback({
        lang: 'en',
        prog: 'c',
        expected: '5',
        actual: '5',
        error: 'Segmentation fault',
        code: 'int main() { return 0; }',
      });

      expect(feedback.condition_satisfied).toBe(false);
    });

    it('enforces compiler truth override in free-run mode (expected="N/A" or empty)', async () => {
      await loadAiModel();

      // Free-run success: model claims false -> overridden to true
      mocks.createChatCompletion.mockResolvedValueOnce(
        makeChatResponse(
          JSON.stringify({
            condition_satisfied: false,
            error_type: 'Unknown',
            type: 'roast',
            joke: 'It actually ran!',
          })
        )
      );
      const freeRunPass = await getCodeFeedback({
        lang: 'en',
        prog: 'javascript',
        expected: 'N/A',
        actual: 'hi',
        error: '',
        code: 'console.log("hi")',
      });
      expect(freeRunPass.condition_satisfied).toBe(true);

      // Free-run with empty expected and error="None" -> overridden to true
      mocks.createChatCompletion.mockResolvedValueOnce(
        makeChatResponse(
          JSON.stringify({
            condition_satisfied: false,
            error_type: 'None',
            type: 'praise',
            joke: 'No errors!',
          })
        )
      );
      const emptyExpectedPass = await getCodeFeedback({
        lang: 'en',
        prog: 'python',
        expected: '',
        actual: '',
        error: 'None',
        code: 'x = 1',
      });
      expect(emptyExpectedPass.condition_satisfied).toBe(true);

      // Free-run error: model claims true -> overridden to false
      mocks.createChatCompletion.mockResolvedValueOnce(
        makeChatResponse(
          JSON.stringify({
            condition_satisfied: true,
            error_type: 'None',
            type: 'praise',
            joke: 'Solid attempt!',
          })
        )
      );
      const freeRunFail = await getCodeFeedback({
        lang: 'en',
        prog: 'python',
        expected: 'N/A',
        actual: '',
        error: 'NameError: name x is not defined',
        code: 'print(x)',
      });
      expect(freeRunFail.condition_satisfied).toBe(false);
    });

    it('rejects cleanly on malformed JSON, unclosed <think>, empty joke, or empty choices', async () => {
      await loadAiModel();

      mocks.createChatCompletion.mockResolvedValueOnce(
        makeChatResponse('{"condition_satisfied": false, "joke": "truncated')
      );
      await expect(
        getCodeFeedback({
          lang: 'en',
          prog: 'python',
          expected: 'N/A',
          actual: '',
          error: 'SyntaxError',
          code: 'print(',
        })
      ).rejects.toThrow();

      mocks.createChatCompletion.mockResolvedValueOnce(
        makeChatResponse('<think>Still reasoning when max_tokens hit')
      );
      await expect(
        getCodeFeedback({
          lang: 'en',
          prog: 'python',
          expected: 'N/A',
          actual: '',
          error: 'SyntaxError',
          code: 'print(',
        })
      ).rejects.toThrow();

      mocks.createChatCompletion.mockResolvedValueOnce(
        makeChatResponse(
          JSON.stringify({
            condition_satisfied: false,
            error_type: 'SyntaxError',
            type: 'roast',
            joke: '   ',
          })
        )
      );
      await expect(
        getCodeFeedback({
          lang: 'en',
          prog: 'python',
          expected: 'N/A',
          actual: '',
          error: 'SyntaxError',
          code: 'print(',
        })
      ).rejects.toThrow();

      mocks.createChatCompletion.mockResolvedValueOnce({
        id: 'empty',
        object: 'chat.completion',
        created: 0,
        model: 'codelol.gguf',
        choices: [],
        usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
      });
      await expect(
        getCodeFeedback({
          lang: 'en',
          prog: 'python',
          expected: 'N/A',
          actual: '',
          error: 'SyntaxError',
          code: 'print(',
        })
      ).rejects.toThrow();
    });
  });
});
