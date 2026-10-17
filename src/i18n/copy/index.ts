import { useLocale } from '@/i18n/locale';
import { ar } from '@/i18n/copy/ar';
import { en } from '@/i18n/copy/en';
import type { SiteCopy } from '@/i18n/copy/types';

export const COPY: Record<'ar' | 'en', SiteCopy> = { ar, en };

/** Every visible string on the page, in the reader's language. */
export function useCopy(): SiteCopy {
  const { lang } = useLocale();
  return COPY[lang];
}

export type { SiteCopy };
