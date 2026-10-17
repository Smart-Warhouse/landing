// Applies the `dark` class before first paint so there is no light flash. Mirrors src/lib/theme.ts:
// keep the storage key (sw-theme) and the "absent = follow the OS" rule in sync.
// A file rather than an inline <script> so the CSP stays script-src 'self'.
(function () {
  try {
    var stored = localStorage.getItem('sw-theme');
    var isDark =
      stored === 'dark' ||
      (stored !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', isDark);
  } catch (error) {
    /* storage or matchMedia unavailable: stay light. */
  }
})();
