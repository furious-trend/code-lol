// agent-notes: { ctx: "Tests for route-scoped COOP/COEP isolation headers parity", deps: ["../next.config", "../vercel.json"], state: active, last: "tara@2026-11-26" }
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import nextConfig from '../next.config';

interface HeaderEntry {
  key: string;
  value: string;
}

interface HeaderRule {
  source: string;
  headers: HeaderEntry[];
}

interface VercelConfigShape {
  headers?: HeaderRule[];
}

function escapeRegex(segment: string): string {
  return segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function sourceToRegex(source: string): RegExp {
  if (source === '/') {
    return /^\/$/;
  }

  if (source.startsWith('/(')) {
    return new RegExp(`^${source}$`);
  }

  const segments = source.split('/').filter(Boolean);
  let pattern = '';

  for (const segment of segments) {
    if (segment.startsWith(':') && segment.endsWith('*')) {
      pattern += '(?:/.*)?';
    } else if (segment.startsWith(':') && segment.endsWith('+')) {
      pattern += '/.+';
    } else if (segment.startsWith(':')) {
      pattern += '/[^/]+';
    } else if (segment === '*') {
      pattern += '/.*';
    } else if (segment.startsWith('(') && segment.endsWith(')')) {
      pattern += `/${segment}`;
    } else {
      pattern += `/${escapeRegex(segment)}`;
    }
  }

  return new RegExp(`^${pattern}$`);
}

function getHeadersForPath(rules: HeaderRule[], pathname: string): Record<string, string> {
  const merged: Record<string, string> = {};
  for (const rule of rules) {
    if (sourceToRegex(rule.source).test(pathname)) {
      for (const h of rule.headers) {
        merged[h.key.toLowerCase()] = h.value;
      }
    }
  }
  return merged;
}

function extractCoopCoepRules(rules: HeaderRule[]) {
  const coopKey = 'cross-origin-opener-policy';
  const coepKey = 'cross-origin-embedder-policy';

  return rules
    .map((rule) => ({
      source: rule.source,
      headers: rule.headers
        .filter((h) => {
          const lower = h.key.toLowerCase();
          return lower === coopKey || lower === coepKey;
        })
        .map((h) => ({ key: h.key.toLowerCase(), value: h.value }))
        .sort((a, b) => a.key.localeCompare(b.key)),
    }))
    .filter((rule) => rule.headers.length > 0)
    .sort((a, b) => a.source.localeCompare(b.source));
}

function readVercelConfig(): VercelConfigShape {
  const vercelPath = path.resolve(__dirname, '../vercel.json');
  return JSON.parse(fs.readFileSync(vercelPath, 'utf-8')) as VercelConfigShape;
}

const WORKSPACE_SAMPLE_PATHS = [
  '/problems/two-sum',
  '/problems/python/hello-world',
  '/playground',
  '/learn',
];

const EXCLUDED_PATHS = [
  '/',
  '/login',
  '/auth/callback',
  '/api/roast',
  '/api/run',
  '/battle',
  '/settings',
  '/onboarding',
];

describe('Route-scoped COOP/COEP cross-origin isolation headers', () => {
  it('configures COOP same-origin and COEP credentialless for coding workspaces in next.config.ts', async () => {
    expect(typeof nextConfig.headers).toBe('function');
    const rules = (await nextConfig.headers!()) as HeaderRule[];
    expect(Array.isArray(rules)).toBe(true);
    expect(rules.length).toBeGreaterThan(0);

    for (const workspacePath of WORKSPACE_SAMPLE_PATHS) {
      const headers = getHeadersForPath(rules, workspacePath);
      expect(headers['cross-origin-opener-policy']).toBe('same-origin');
      expect(headers['cross-origin-embedder-policy']).toBe('credentialless');
    }

    const sources = extractCoopCoepRules(rules).map((r) => r.source);
    expect(sources).toContain('/problems/:path*');
    expect(sources.some((s) => s === '/playground' || s === '/playground/:path*')).toBe(true);
    expect(sources.some((s) => s === '/learn' || s === '/learn/:path*')).toBe(true);
  });

  it('configures COOP same-origin and COEP credentialless for coding workspaces in vercel.json', () => {
    const vercelConfig = readVercelConfig();
    expect(Array.isArray(vercelConfig.headers)).toBe(true);
    const rules = vercelConfig.headers ?? [];
    expect(rules.length).toBeGreaterThan(0);

    for (const workspacePath of WORKSPACE_SAMPLE_PATHS) {
      const headers = getHeadersForPath(rules, workspacePath);
      expect(headers['cross-origin-opener-policy']).toBe('same-origin');
      expect(headers['cross-origin-embedder-policy']).toBe('credentialless');
    }

    const sources = extractCoopCoepRules(rules).map((r) => r.source);
    expect(sources).toContain('/problems/:path*');
    expect(sources.some((s) => s === '/playground' || s === '/playground/:path*')).toBe(true);
    expect(sources.some((s) => s === '/learn' || s === '/learn/:path*')).toBe(true);
  });

  it('does NOT configure COOP or COEP on /, /login, /auth/callback, /api/:path*, or other non-workspace routes', async () => {
    const nextRules =
      typeof nextConfig.headers === 'function' ? ((await nextConfig.headers()) as HeaderRule[]) : [];
    const vercelRules = readVercelConfig().headers ?? [];

    expect(nextRules.length).toBeGreaterThan(0);
    expect(vercelRules.length).toBeGreaterThan(0);

    for (const excludedPath of EXCLUDED_PATHS) {
      const nextHeaders = getHeadersForPath(nextRules, excludedPath);
      expect(nextHeaders['cross-origin-opener-policy']).toBeUndefined();
      expect(nextHeaders['cross-origin-embedder-policy']).toBeUndefined();

      const vercelHeaders = getHeadersForPath(vercelRules, excludedPath);
      expect(vercelHeaders['cross-origin-opener-policy']).toBeUndefined();
      expect(vercelHeaders['cross-origin-embedder-policy']).toBeUndefined();
    }
  });

  it('maintains strict parity between next.config.ts headers() and vercel.json headers', async () => {
    expect(typeof nextConfig.headers).toBe('function');
    const nextRules = (await nextConfig.headers!()) as HeaderRule[];
    const vercelRules = readVercelConfig().headers ?? [];

    const normalizedNext = extractCoopCoepRules(nextRules);
    const normalizedVercel = extractCoopCoepRules(vercelRules);

    expect(normalizedNext.length).toBeGreaterThan(0);
    expect(normalizedNext).toEqual(normalizedVercel);

    for (const rule of normalizedNext) {
      expect(rule.headers).toEqual([
        { key: 'cross-origin-embedder-policy', value: 'credentialless' },
        { key: 'cross-origin-opener-policy', value: 'same-origin' },
      ]);
    }
  });
});
