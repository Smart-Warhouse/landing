import { useSyncExternalStore } from 'react';

/**
 * One shared theme store (so every toggle and logo agrees). Mirrored by public/theme-bootstrap.js:
 * stored 'light' | 'dark' wins; nothing stored = follow the OS, live.
 */
export const THEME_STORAGE_KEY = 'sw-theme';

type Choice = 'light' | 'dark' | null;

function readChoice(): Choice {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

function systemDark(): boolean {
  return typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false;
}

function computeDark(): boolean {
  const choice = readChoice();
  return choice ? choice === 'dark' : systemDark();
}

const listeners = new Set<() => void>();
let isDark = typeof window === 'undefined' ? false : computeDark();

function apply(next: boolean) {
  isDark = next;
  document.documentElement.classList.toggle('dark', next);
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Each subscriber watches the OS setting; `apply` is idempotent, so duplicates are harmless.
  const onSystemChange = () => {
    if (readChoice() === null) apply(systemDark());
  };
  const media =
    typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)')
      : null;
  media?.addEventListener?.('change', onSystemChange);
  return () => {
    listeners.delete(listener);
    media?.removeEventListener?.('change', onSystemChange);
  };
}

export function setTheme(next: 'light' | 'dark') {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    /* storage blocked: the choice lasts for this page view only. */
  }
  apply(next === 'dark');
}

export function useTheme() {
  const dark = useSyncExternalStore(
    subscribe,
    () => isDark,
    () => false,
  );
  return { isDark: dark, toggle: () => setTheme(dark ? 'light' : 'dark') };
}
