import { useEffect } from 'react';
import { LANG_PATHS, type Lang } from '@/i18n/locale';
import { siteUrl } from '@/lib/site';

type PageMeta = {
  title: string;
  description: string;
  lang: Lang;
  /** Path of this page in this language, e.g. `/` or `/en`. Omit for pages that must not be indexed. */
  path?: string;
  noIndex?: boolean;
};

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement('link');
    document.head.appendChild(el);
  }
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
}

/** Title, description, canonical, hreflang alternates, Open Graph and robots for the current page. */
export function usePageMeta({ title, description, lang, path, noIndex = false }: PageMeta) {
  useEffect(() => {
    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:locale', lang === 'ar' ? 'ar_IQ' : 'en_US');
    upsertMeta('property', 'og:locale:alternate', lang === 'ar' ? 'en_US' : 'ar_IQ');
    upsertMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');
    if (path) {
      const url = siteUrl(path);
      upsertMeta('property', 'og:url', url);
      upsertLink('link[rel="canonical"]', { rel: 'canonical', href: url });
      upsertLink('link[rel="alternate"][hreflang="ar"]', {
        rel: 'alternate',
        hreflang: 'ar',
        href: siteUrl(LANG_PATHS.ar),
      });
      upsertLink('link[rel="alternate"][hreflang="en"]', {
        rel: 'alternate',
        hreflang: 'en',
        href: siteUrl(LANG_PATHS.en),
      });
    }
  }, [title, description, lang, path, noIndex]);
}
