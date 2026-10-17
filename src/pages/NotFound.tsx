import { Link } from 'react-router-dom';
import { BrandMark } from '@/components/layout/BrandMark';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useCopy } from '@/i18n/copy';
import { LANG_PATHS, useLocale } from '@/i18n/locale';

/** Unknown paths: the SPA fallback serves the shell, so this page marks itself noindex. */
export default function NotFound() {
  const copy = useCopy();
  const { lang } = useLocale();
  usePageMeta({ title: copy.notFound.title, description: copy.notFound.body, lang, noIndex: true });

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="max-w-md text-center">
        <BrandMark className="mx-auto h-14 w-14" />
        <p className="mt-6 font-en text-5xl font-bold text-lift-ink">404</p>
        <h1 className="mt-3 text-h2 text-ink">{copy.notFound.title}</h1>
        <p className="mt-3 text-ink-2">{copy.notFound.body}</p>
        <Link
          to={LANG_PATHS[lang]}
          className="mt-8 inline-flex min-h-11 items-center rounded-xl bg-accent px-5 font-bold text-accent-on hover:bg-accent-hover"
        >
          {copy.notFound.back}
        </Link>
      </div>
    </main>
  );
}
