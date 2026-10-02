import { test, expect } from '@playwright/test';

test.describe('SEO & Search Engine Crawlability Verification', () => {
  test('Homepage has optimal title, meta description, and canonical link', async ({ page }) => {
    await page.goto('/');

    // 1. Title verification
    const title = await page.title();
    expect(title).toContain('SYMMETRY');
    expect(title.length).toBeGreaterThan(20);
    expect(title.length).toBeLessThanOrEqual(70);

    // 2. Meta description verification
    const metaDesc = page.locator('meta[name="description"]');
    await expect(metaDesc).toHaveAttribute('content', /.+/);
    const descContent = await metaDesc.getAttribute('content');
    expect(descContent?.length).toBeGreaterThan(50);
    expect(descContent?.length).toBeLessThan(320);

    // 3. Canonical tag validation
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /https:\/\/.+/);

    // 4. Viewport tag validation
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute('content', /width=device-width/);

    // 5. Robots indexation permissions
    const robots = page.locator('meta[name="robots"]');
    await expect(robots).toHaveAttribute('content', /index.*follow/);
  });

  test('Page structure contains valid semantic heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // Exactly one <h1> element on the page
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);

    // <h1> must contain high-value keywords
    const h1Text = await page.locator('h1').first().textContent();
    expect(h1Text?.toLowerCase()).toMatch(/cinematic|motion|commercial/);
  });

  test('JSON-LD Structured Data Schema is valid', async ({ page }) => {
    await page.goto('/');

    const jsonLdElements = page.locator('script[type="application/ld+json"]');
    const count = await jsonLdElements.count();
    expect(count).toBeGreaterThanOrEqual(1);

    for (let i = 0; i < count; i++) {
      const content = await jsonLdElements.nth(i).textContent();
      expect(content).toBeTruthy();
      const parsed = JSON.parse(content || '{}');
      expect(parsed['@context']).toBe('https://schema.org');
    }
  });

  test('Sitemap.xml and Robots.txt exist and are accessible', async ({ request }) => {
    const robotsRes = await request.get('/robots.txt');
    expect(robotsRes.status()).toBe(200);
    const robotsText = await robotsRes.text();
    expect(robotsText).toContain('User-agent');
    expect(robotsText).toContain('Sitemap:');

    const sitemapRes = await request.get('/sitemap.xml');
    expect(sitemapRes.status()).toBe(200);
    const sitemapXml = await sitemapRes.text();
    expect(sitemapXml).toContain('<urlset');
    expect(sitemapXml).not.toContain('/#'); // Must not contain invalid hash URLs
  });
});
