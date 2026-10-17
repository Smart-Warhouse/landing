import { createContext, useContext } from 'react';
import type { Lang } from '@/i18n/copy/types';

export type { Lang };

/** Mirrored by public/lang-bootstrap.js: keep the key and the path rule in sync. */
export const LANG_STORAGE_KEY = 'sw-lang';

export const LANG_PATHS: Record<Lang, string> = { ar: '/', en: '/en' };

export function langFromPath(pathname: string): Lang {
  const path = pathname.replace(/\/+$/, '');
  return path === '/en' || path.startsWith('/en/') ? 'en' : 'ar';
}

export function dirOf(lang: Lang): 'rtl' | 'ltr' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}

export function storeLang(lang: Lang): void {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    /* storage blocked: the URL still carries the language. */
  }
}

export const LocaleContext = createContext<Lang>('ar');

export function useLocale(): { lang: Lang; dir: 'rtl' | 'ltr'; isRtl: boolean } {
  const lang = useContext(LocaleContext);
  return { lang, dir: dirOf(lang), isRtl: lang === 'ar' };
}
