import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import { useCopy } from '@/i18n/copy';
import { useTheme } from '@/lib/theme';

export function ThemeToggle() {
  const copy = useCopy();
  const { isDark, toggle } = useTheme();
  const label = isDark ? copy.header.themeToLight : copy.header.themeToDark;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
    >
      {isDark ? (
        <SunIcon size={20} aria-hidden="true" />
      ) : (
        <MoonIcon size={20} aria-hidden="true" />
      )}
    </button>
  );
}
