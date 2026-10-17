/**
 * TODO(domain): replace with the real public origin before publishing. It is repeated in
 * index.html, public/robots.txt and public/sitemap.xml; `seo.test.ts` keeps all four in sync.
 */
export const SITE_ORIGIN = 'https://sw-fleet.example';

export function siteUrl(path: string): string {
  return `${SITE_ORIGIN}${path === '/' ? '/' : path}`;
}

/**
 * Where "Open dashboard" points. Baked in at build time from VITE_DASHBOARD_URL (Dockerfile build
 * arg); defaults to the dashboard's local dev server. Only http(s) URLs are accepted.
 */
export function dashboardUrl(raw: string | undefined = import.meta.env.VITE_DASHBOARD_URL): string {
  const fallback = 'http://localhost:5173/';
  if (!raw) return fallback;
  try {
    const url = new URL(raw);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : fallback;
  } catch {
    return fallback;
  }
}

export const DASHBOARD_URL = dashboardUrl();
