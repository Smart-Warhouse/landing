import { describe, expect, it } from 'vitest';
import appSource from '@/App.tsx?raw';
import indexHtml from '../../index.html?raw';
import robots from '../../public/robots.txt?raw';
import sitemap from '../../public/sitemap.xml?raw';
import headers from '../../docker/security-headers.inc.template?raw';
import nginx from '../../docker/nginx.conf.template?raw';
import { SITE_ORIGIN, dashboardUrl } from '@/lib/site';

describe('SEO files', () => {
  it('lists every indexable route in the sitemap', () => {
    const routes = [...appSource.matchAll(/<Route\s+path="([^"]+)"/g)]
      .map((m) => m[1])
      .filter((p) => p !== '*');
    expect(routes).toEqual(['/', '/en']);
    const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(locs).toEqual(routes.map((r) => `${SITE_ORIGIN}${r}`));
  });

  it('uses the same origin in index.html, robots.txt and the sitemap', () => {
    expect(robots).toContain(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`);
    expect(indexHtml).toContain(`<link rel="canonical" href="${SITE_ORIGIN}/" />`);
    for (const m of sitemap.matchAll(/href="([^"]+)"/g))
      expect(m[1].startsWith(SITE_ORIGIN)).toBe(true);
  });

  it('ships an Arabic RTL shell with no inline scripts', () => {
    expect(indexHtml).toContain('<html lang="ar" dir="rtl">');
    const scripts = [...indexHtml.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)];
    expect(scripts.length).toBeGreaterThan(0);
    for (const [, attrs, body] of scripts) {
      expect(attrs).toMatch(/src="/);
      expect(body.trim()).toBe('');
    }
    expect(indexHtml).not.toMatch(/fonts\.googleapis|cdn\.|https:\/\/(?!sw-fleet\.example)/);
  });
});

describe('serving layer', () => {
  it('sends a strict CSP: self-only scripts, styles and fonts, no network, no framing', () => {
    const csp = headers.match(/Content-Security-Policy "([^"]+)"/)?.[1] ?? '';
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("script-src 'self';");
    expect(csp).toContain("style-src 'self';");
    expect(csp).toContain("font-src 'self'");
    expect(csp).toContain("connect-src 'none'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).not.toContain('unsafe-inline');
    expect(csp).not.toContain('unsafe-eval');
  });

  it('includes the security headers in every location that adds its own headers', () => {
    const locations = nginx.split(/\n\s*location /).slice(1);
    for (const block of locations) {
      if (block.includes('add_header')) expect(block).toContain('security-headers.inc');
    }
  });
});

describe('dashboard URL', () => {
  it('accepts http(s) URLs and falls back to the local dashboard otherwise', () => {
    expect(dashboardUrl(undefined)).toBe('http://localhost:5173/');
    expect(dashboardUrl('https://dash.example.com')).toBe('https://dash.example.com/');
    expect(dashboardUrl('javascript:alert(1)')).toBe('http://localhost:5173/');
    expect(dashboardUrl('not a url')).toBe('http://localhost:5173/');
  });
});
