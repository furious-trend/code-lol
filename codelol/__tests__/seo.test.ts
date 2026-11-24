import { describe, it, expect } from 'vitest';
import robots from '@/app/robots';
import sitemap from '@/app/sitemap';

describe('SEO metadata routes', () => {
  it('generates standard robots.txt metadata', () => {
    const robotsData = robots();
    expect(robotsData).toBeDefined();
    expect(robotsData.rules).toBeDefined();
    expect(robotsData.sitemap).toContain('/sitemap.xml');
  });

  it('generates XML sitemap entries for public pages', () => {
    const sitemapData = sitemap();
    expect(Array.isArray(sitemapData)).toBe(true);
    expect(sitemapData.length).toBeGreaterThan(5);

    const urls = sitemapData.map(entry => entry.url);
    expect(urls.some(u => u.endsWith('/learn'))).toBe(true);
    expect(urls.some(u => u.endsWith('/problems'))).toBe(true);
    expect(urls.some(u => u.endsWith('/playground'))).toBe(true);
  });
});
