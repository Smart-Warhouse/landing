import { useEffect, type ReactNode } from 'react';
import { LocaleContext, dirOf, type Lang } from '@/i18n/locale';

/** Provides the route's language and keeps <html lang/dir> in step with it. */
export function LocaleProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dirOf(lang);
  }, [lang]);

  return <LocaleContext.Provider value={lang}>{children}</LocaleContext.Provider>;
}
