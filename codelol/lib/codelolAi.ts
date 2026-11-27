// agent-notes: { ctx: "In-browser wllama AI service with lazy HF GGUF loading and OPFS caching", deps: ["@wllama/wllama", "@wllama/wllama/esm/wasm-from-cdn.js"], state: active, last: "sato@2026-11-26" }

import type { Wllama } from '@wllama/wllama';

export const DEFAULT_HF_MODEL_REPO = 'shafiqahmed0075/codelol';
export const DEFAULT_HF_MODEL_FILE = 'codelol.gguf';
const LOCAL_WASM_PATH = '/wasm/wllama.wasm';
const MIN_REQUIRED_STORAGE_BYTES = 650 * 1024 * 1024; // ~650 MiB for 521 MB model + OPFS overhead

export type AiLanguageCode = 'en' | 'ta-Latn';
export type AiModelStatus = 'idle' | 'loading' | 'ready' | 'error';
export type AiLoadStage = 'idle' | 'checking' | 'downloading' | 'initializing' | 'ready' | 'error';

export interface AiStatusSnapshot {
  status: AiModelStatus;
  stage: AiLoadStage;
  progress: number;
  loadedBytes: number;
  totalBytes: number;
  cached: boolean;
  multithreaded: boolean;
  error: string | null;
  deviceWarning: string | null;
}

export interface CodeFeedbackInput {
  lang: string;
  prog: string;
  expected?: string;
  actual?: string;
  error?: string;
  code: string;
}

export interface CodeFeedbackResult {
  condition_satisfied: boolean;
  error_type: string;
  type: 'roast' | 'praise' | 'appreciation';
  joke: string;
}

export interface LoadAiModelOptions {
  progressCallback?: (progress: { loaded: number; total: number }) => void;
}

interface CacheEntryLike {
  name: string;
  size: number;
  metadata?: {
    originalURL?: string;
    originalSize?: number;
  };
}

let activeWllama: Wllama | null = null;
let initPromise: Promise<void> | null = null;
let inferenceQueue: Promise<unknown> = Promise.resolve();

let currentSnapshot: AiStatusSnapshot = {
  status: 'idle',
  stage: 'idle',
  progress: 0,
  loadedBytes: 0,
  totalBytes: 0,
  cached: false,
  multithreaded: false,
  error: null,
  deviceWarning: null,
};

const listeners = new Set<(snapshot: AiStatusSnapshot) => void>();

function updateSnapshot(patch: Partial<AiStatusSnapshot>): void {
  currentSnapshot = {
    ...currentSnapshot,
    ...patch,
  };
  for (const listener of listeners) {
    listener(currentSnapshot);
  }
}

export function getAiStatusSnapshot(): AiStatusSnapshot {
  return currentSnapshot;
}

export function subscribeAiStatus(listener: (snapshot: AiStatusSnapshot) => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getConfiguredHfModel(): { repo: string; file: string } {
  const repo = process.env.NEXT_PUBLIC_HF_MODEL_REPO?.trim() || DEFAULT_HF_MODEL_REPO;
  const file = process.env.NEXT_PUBLIC_HF_MODEL_FILE?.trim() || DEFAULT_HF_MODEL_FILE;
  return { repo, file };
}

export function normalizeAiLang(lang?: string | null): AiLanguageCode {
  const normalized = (lang ?? '').trim().toLowerCase();
  if (
    normalized === 'tamil' ||
    normalized === 'ta-latn' ||
    normalized === 'ta' ||
    normalized === 'tanglish'
  ) {
    return 'ta-Latn';
  }
  return 'en';
}

export function normalizeAiProg(prog?: string | null): string {
  const normalized = (prog ?? '').trim().toLowerCase();
  switch (normalized) {
    case 'py':
    case 'python':
      return 'python';
    case 'js':
    case 'javascript':
      return 'javascript';
    case 'c++':
    case 'cpp':
      return 'cpp';
    case 'c':
      return 'c';
    case 'java':
      return 'java';
    default:
      return normalized || 'javascript';
  }
}

export function isLowMemoryDevice(): boolean {
  if (typeof navigator === 'undefined') {
    return false;
  }
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  return typeof mem === 'number' && Number.isFinite(mem) && mem < 4;
}

function findMatchingCacheEntry(
  entries: CacheEntryLike[],
  repo: string,
  file: string
): CacheEntryLike | undefined {
  const expectedUrl = `https://huggingface.co/${repo}/resolve/main/${file}`;
  return entries.find((entry) => {
    if (!entry || typeof entry.size !== 'number' || entry.size <= 0) {
      return false;
    }
    const origSize = entry.metadata?.originalSize;
    if (typeof origSize === 'number' && origSize > 0 && entry.size !== origSize) {
      return false;
    }
    const origUrl = entry.metadata?.originalURL;
    if (origUrl === expectedUrl) {
      return true;
    }
    return (
      entry.name.endsWith(`_${file}`) &&
      (!origUrl || origUrl.includes(`/${repo}/`))
    );
  });
}

async function getMatchingCacheEntry(
  CacheManagerCtor?: typeof import('@wllama/wllama').CacheManager
): Promise<CacheEntryLike | undefined> {
  if (typeof window === 'undefined') {
    return undefined;
  }
  try {
    const CacheManager = CacheManagerCtor ?? (await import('@wllama/wllama')).CacheManager;
    const cacheManager = activeWllama?.cacheManager ?? new CacheManager();
    const entries = (await cacheManager.list()) as CacheEntryLike[];
    if (!Array.isArray(entries)) {
      return undefined;
    }
    const { repo, file } = getConfiguredHfModel();
    return findMatchingCacheEntry(entries, repo, file);
  } catch {
    return undefined;
  }
}

export async function isAiModelCached(): Promise<boolean> {
  const entry = await getMatchingCacheEntry();
  const cached = Boolean(entry);
  if (currentSnapshot.cached !== cached) {
    updateSnapshot({ cached });
  }
  return cached;
}

function classifyLoadError(err: unknown): {
  isAuthError: boolean;
  isQuotaError: boolean;
  friendlyMessage: string;
} {
  const message = err instanceof Error ? err.message : String(err);
  const name = err instanceof Error ? err.name : '';

  if (name === 'QuotaExceededError' || /quota/i.test(message)) {
    return {
      isAuthError: false,
      isQuotaError: true,
      friendlyMessage:
        'Browser storage quota exceeded (~650 MiB needed to cache AI weights locally). Using instant server roasts instead.',
    };
  }

  if (/\b(401|403)\b|unauthorized|forbidden/i.test(message)) {
    return {
      isAuthError: true,
      isQuotaError: false,
      friendlyMessage:
        'Hugging Face model repo is currently private or returns 401/403 access denied. Using instant server roasts until public.',
    };
  }

  return {
    isAuthError: false,
    isQuotaError: false,
    friendlyMessage: message || 'Failed to initialize in-browser AI model. Using instant server roasts.',
  };
}

async function ensureStorageAvailable(isAlreadyCached: boolean): Promise<void> {
  if (isAlreadyCached || typeof navigator === 'undefined' || !navigator.storage?.estimate) {
    return;
  }
  try {
    const estimate = await navigator.storage.estimate();
    if (typeof estimate.quota === 'number' && typeof estimate.usage === 'number') {
      const available = estimate.quota - estimate.usage;
      if (available < MIN_REQUIRED_STORAGE_BYTES) {
        throw new Error(
          'Insufficient browser storage space (~650 MiB required to cache Roast AI locally). Using instant server roasts instead.'
        );
      }
    }
  } catch (err) {
    if (err instanceof Error && /insufficient browser storage/i.test(err.message)) {
      throw err;
    }
    // Ignore browser privacy errors from navigator.storage.estimate()
  }
}

function getPreferredThreadCount(): { isolated: boolean; nThreads: number } {
  if (typeof window === 'undefined') {
    return { isolated: false, nThreads: 1 };
  }
  const isolated = Boolean(window.crossOriginIsolated);
  if (!isolated) {
    return { isolated: false, nThreads: 1 };
  }
  const cores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4;
  return {
    isolated: true,
    nThreads: Math.min(4, Math.max(2, cores)),
  };
}

function isLikelyWasmAssetError(err: unknown): boolean {
  const message = err instanceof Error ? err.message : String(err);
  return /wasm|worker|pathConfig|compile|instantiate/i.test(message);
}

export async function loadAiModel(options?: LoadAiModelOptions): Promise<void> {
  if (typeof window === 'undefined') {
    return;
  }

  if (activeWllama && activeWllama.isModelLoaded() && currentSnapshot.status === 'ready') {
    return;
  }

  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    const lowMemWarning = isLowMemoryDevice()
      ? 'Low device memory detected (<4 GB RAM). Local AI inference may feel slower; instant server roasts remain active.'
      : null;

    updateSnapshot({
      status: 'loading',
      stage: 'checking',
      progress: 0,
      loadedBytes: 0,
      totalBytes: 0,
      error: null,
      deviceWarning: lowMemWarning,
    });

    try {
      const [{ Wllama, CacheManager }, { default: WasmFromCDN }] = await Promise.all([
        import('@wllama/wllama'),
        import('@wllama/wllama/esm/wasm-from-cdn.js'),
      ]);
      const cachedEntry = await getMatchingCacheEntry(CacheManager);
      await ensureStorageAvailable(Boolean(cachedEntry));

      const { repo, file } = getConfiguredHfModel();
      const { isolated, nThreads } = getPreferredThreadCount();

      const loadParams = {
        n_ctx: 1024,
        jinja: true,
        n_threads: nThreads,
        useCache: true,
        progressCallback: ({ loaded, total }: { loaded: number; total: number }) => {
          const progress = total > 0 ? Math.min(100, Math.round((loaded / total) * 100)) : 0;
          updateSnapshot({
            status: 'loading',
            stage: total > 0 && loaded >= total ? 'initializing' : 'downloading',
            progress,
            loadedBytes: loaded,
            totalBytes: total,
          });
          options?.progressCallback?.({ loaded, total });
        },
      };

      const attemptLoadWithWasm = async (wasmConfig: { default: string }): Promise<Wllama> => {
        const instance = new Wllama(wasmConfig, {
          allowOffline: true,
          suppressNativeLog: true,
        });

        try {
          await instance.loadModelFromHF({ repo, file }, loadParams);
          return instance;
        } catch (hfErr) {
          const classified = classifyLoadError(hfErr);
          if (classified.isAuthError || classified.isQuotaError) {
            await instance.exit().catch(() => undefined);
            throw new Error(classified.friendlyMessage, { cause: hfErr });
          }

          if (cachedEntry?.metadata?.originalURL && !isLikelyWasmAssetError(hfErr)) {
            await instance.loadModelFromUrl(cachedEntry.metadata.originalURL, loadParams);
            return instance;
          }

          await instance.exit().catch(() => undefined);
          throw hfErr;
        }
      };

      let loadedInstance: Wllama;
      try {
        loadedInstance = await attemptLoadWithWasm({ default: LOCAL_WASM_PATH });
      } catch (localErr) {
        const classified = classifyLoadError(localErr);
        if (classified.isAuthError || classified.isQuotaError || !WasmFromCDN?.default) {
          throw localErr;
        }
        // Fallback to CDN WASM assets if local /wasm/wllama.wasm could not initialize
        loadedInstance = await attemptLoadWithWasm(WasmFromCDN);
      }

      activeWllama = loadedInstance;
      const runtimeMultithread =
        (typeof loadedInstance.isMultithread === 'function' && loadedInstance.isMultithread()) ||
        (isolated && nThreads > 1);

      updateSnapshot({
        status: 'ready',
        stage: 'ready',
        progress: 100,
        cached: true,
        multithreaded: runtimeMultithread,
        error: null,
        deviceWarning: lowMemWarning,
      });
    } catch (err) {
      activeWllama = null;
      const { friendlyMessage } = classifyLoadError(err);
      updateSnapshot({
        status: 'error',
        stage: 'error',
        error: friendlyMessage,
      });
      throw new Error(friendlyMessage, { cause: err });
    } finally {
      initPromise = null;
    }
  })();

  return initPromise;
}

export async function disposeAiModel(): Promise<void> {
  initPromise = null;
  const instance = activeWllama;
  activeWllama = null;

  if (instance) {
    await instance.exit().catch(() => undefined);
  }

  updateSnapshot({
    status: 'idle',
    stage: 'idle',
    progress: 0,
    loadedBytes: 0,
    totalBytes: 0,
    multithreaded: false,
    error: null,
  });
}

export async function clearAiModelCache(): Promise<void> {
  await disposeAiModel();
  if (typeof window !== 'undefined') {
    try {
      const { CacheManager } = await import('@wllama/wllama');
      const cacheManager = new CacheManager();
      await cacheManager.clear();
    } catch {
      // Ignore cache clear failure if OPFS is unavailable
    }
  }
  updateSnapshot({ cached: false });
}

function sanitizePromptValue(value: string, maxLength: number): string {
  const flattened = value.replace(/\r?\n+/g, ' ').replace(/\s+/g, ' ').trim();
  if (flattened.length <= maxLength) {
    return flattened;
  }
  return flattened.slice(0, maxLength);
}

function stripThinkAndFences(raw: string): string {
  if (/<think\b/i.test(raw) && !/<\/think>/i.test(raw)) {
    throw new Error('Model generation truncated inside <think> block');
  }

  return raw
    .replace(/<think\b[^>]*>[\s\S]*?<\/think>/gi, '')
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();
}

export function computeCompilerTruth(
  expected: string | undefined,
  actual: string | undefined,
  error: string | undefined
): boolean {
  const normalizedError =
    !error || error.trim() === '' || error.trim().toLowerCase() === 'none' ? 'None' : error.trim();
  if (normalizedError !== 'None') {
    return false;
  }

  const trimmedExpected = (expected ?? '').trim();
  if (!trimmedExpected || trimmedExpected.toUpperCase() === 'N/A') {
    return true;
  }

  return (actual ?? '').trim() === trimmedExpected;
}

export async function getCodeFeedback(input: CodeFeedbackInput): Promise<CodeFeedbackResult> {
  const executeInference = async (): Promise<CodeFeedbackResult> => {
    if (!activeWllama || !activeWllama.isModelLoaded() || currentSnapshot.status !== 'ready') {
      throw new Error('In-browser AI model is not loaded yet');
    }

    const lang = normalizeAiLang(input.lang);
    const prog = normalizeAiProg(input.prog);
    const rawExpected = (input.expected ?? '').trim();
    const isFreeRun = !rawExpected || rawExpected.toUpperCase() === 'N/A';
    const expectedField = isFreeRun ? 'N/A' : sanitizePromptValue(rawExpected, 250);

    const rawActual = input.actual ?? '';
    const actualField = rawActual.trim() === '' ? 'None' : sanitizePromptValue(rawActual, 250);

    const rawError = (input.error ?? '').trim();
    const errorField =
      !rawError || rawError.toLowerCase() === 'none'
        ? 'None'
        : sanitizePromptValue(rawError, 250);

    const codeField = sanitizePromptValue(input.code ?? '', 600) || '(empty)';

    const response = await activeWllama.createChatCompletion({
      messages: [
        { role: 'system', content: 'CODELOL_VERIFIER_V2' },
        {
          role: 'user',
          content: `lang:${lang} | prog:${prog} | expected:${expectedField} | actual:${actualField} | error:${errorField} | code:${codeField}`,
        },
      ],
      max_tokens: 70,
      temperature: 0.7,
      top_p: 0.8,
      top_k: 20,
      response_format: { type: 'json_object' },
      chat_template_kwargs: { enable_thinking: false },
    });

    const rawContent = response?.choices?.[0]?.message?.content;
    if (typeof rawContent !== 'string' || !rawContent.trim()) {
      throw new Error('Local AI returned empty completion');
    }

    const cleaned = stripThinkAndFences(rawContent);
    const startIdx = cleaned.indexOf('{');
    const endIdx = cleaned.lastIndexOf('}');
    if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
      throw new Error('Local AI response did not contain a valid JSON object');
    }

    const parsed = JSON.parse(cleaned.slice(startIdx, endIdx + 1)) as Record<string, unknown>;
    const joke = typeof parsed.joke === 'string' ? parsed.joke.trim() : '';
    if (!joke) {
      throw new Error('Local AI JSON missing required joke field');
    }

    const truth = computeCompilerTruth(input.expected, input.actual, input.error);
    const rawType = typeof parsed.type === 'string' ? parsed.type.trim().toLowerCase() : '';
    const resolvedType: CodeFeedbackResult['type'] = truth
      ? rawType === 'appreciation' || rawType === 'praise'
        ? rawType
        : 'praise'
      : 'roast';

    const rawErrorType =
      typeof parsed.error_type === 'string' ? parsed.error_type.trim() : '';
    const resolvedErrorType = truth
      ? 'None'
      : rawErrorType && rawErrorType !== 'None'
        ? rawErrorType
        : 'LogicError';

    return {
      condition_satisfied: truth,
      error_type: resolvedErrorType,
      type: resolvedType,
      joke,
    };
  };

  const queued = inferenceQueue.then(executeInference, executeInference);
  inferenceQueue = queued.then(
    () => undefined,
    () => undefined
  );
  return queued;
}
