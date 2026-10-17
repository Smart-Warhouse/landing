import { useState } from 'react';
import { ListIcon, XIcon } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { BrandMark } from '@/components/layout/BrandMark';
import { ButtonLink } from '@/components/ui/Button';
import { ExternalArrow } from '@/components/ui/DirIcons';
import { LanguageSwitch } from '@/components/ui/LanguageSwitch';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useCopy } from '@/i18n/copy';
import { LANG_PATHS, useLocale } from '@/i18n/locale';
import { DASHBOARD_URL } from '@/lib/site';

export function SiteHeader() {
  const copy = useCopy();
  const { lang } = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <div className="mx-auto flex h-16 w-full max-w-content items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          to={LANG_PATHS[lang]}
          aria-label={copy.header.homeLabel}
          className="flex items-center gap-2.5 rounded-lg"
        >
          <BrandMark />
          <span className="font-bold text-ink">{copy.header.brand}</span>
          <span className="hidden font-en text-xs font-bold text-ink-3 sm:inline" dir="ltr">
            SW·Fleet
          </span>
        </Link>

        <nav aria-label={copy.header.navLabel} className="ms-auto hidden xl:block">
          <ul className="flex items-center gap-1">
            {copy.header.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ms-auto flex items-center gap-2 xl:ms-2">
          <div className="hidden sm:block">
            <LanguageSwitch />
          </div>
          <ThemeToggle />
          <div className="hidden md:block">
            <ButtonLink href={DASHBOARD_URL} variant="primary" iconEnd={<ExternalArrow />}>
              {copy.header.openDashboard}
            </ButtonLink>
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface text-ink xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? copy.header.menuClose : copy.header.menuOpen}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <XIcon size={20} aria-hidden="true" />
            ) : (
              <ListIcon size={20} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-menu" className="border-t border-line bg-bg xl:hidden">
          <nav
            aria-label={copy.header.navLabel}
            className="mx-auto max-w-content px-4 py-3 sm:px-6"
          >
            <ul className="grid gap-1">
              {copy.header.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 font-medium text-ink hover:bg-surface-2"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-line pt-3">
              <div className="sm:hidden">
                <LanguageSwitch />
              </div>
              <div className="md:hidden">
                <ButtonLink href={DASHBOARD_URL} variant="primary" iconEnd={<ExternalArrow />}>
                  {copy.header.openDashboard}
                </ButtonLink>
              </div>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
