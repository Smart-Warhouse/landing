import { TranslateIcon } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { useCopy } from '@/i18n/copy';
import { LANG_PATHS, storeLang, useLocale } from '@/i18n/locale';

/** Links to the same page in the other language and remembers the choice. */
export function LanguageSwitch() {
  const copy = useCopy();
  const { lang } = useLocale();
  const other = lang === 'ar' ? 'en' : 'ar';
  return (
    <Link
      to={LANG_PATHS[other]}
      onClick={() => storeLang(other)}
      lang={other}
      hrefLang={other}
      aria-label={copy.header.switchLangAria}
      className="inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-3 text-sm font-bold text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
    >
      <TranslateIcon size={18} aria-hidden="true" />
      <span>{copy.header.switchLang}</span>
    </Link>
  );
}
