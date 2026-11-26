// agent-notes: { ctx: "Tests for Next.js App Router robots and sitemap SEO metadata routes", deps: ["@/app/robots", "@/app/sitemap"], state: "active", last: "tara@2026-11-26" }
import { describe, it, expect, afterEach } from 'vitest';
import robots from '@/app/robots';
import sitemap from '@/app/sitemap';

describe('SEO metadata routes', () => {
  const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  afterEach(() => {
    if (originalSiteUrl === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
    }
  });

  it('generates standard robots.txt metadata using Vercel production URL fallback', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    const robotsData = robots();
    expect(robotsData).toBeDefined();
    expect(robotsData.rules).toBeDefined();
    expect(robotsData.sitemap).toBe('https://code-lol-three.vercel.app/sitemap.xml');
  });

  it('generates XML sitemap entries using Vercel production URL fallback and respects NEXT_PUBLIC_SITE_URL', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    const defaultSitemap = sitemap();
    expect(Array.isArray(defaultSitemap)).toBe(true);
    expect(defaultSitemap.length).toBeGreaterThan(5);
    expect(defaultSitemap[0].url).toBe('https://code-lol-three.vercel.app');

    process.env.NEXT_PUBLIC_SITE_URL = 'https://custom.codelol.dev';
    const customSitemap = sitemap();
    const urls = customSitemap.map(entry => entry.url);
    expect(urls.some(u => u === 'https://custom.codelol.dev/learn')).toBe(true);
    expect(urls.some(u => u === 'https://custom.codelol.dev/problems')).toBe(true);
    expect(urls.some(u => u === 'https://custom.codelol.dev/playground')).toBe(true);
  });
});
