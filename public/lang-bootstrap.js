// Sets <html lang/dir> from the URL before first paint (mirrors src/i18n/locale.ts: `/en` = English,
// everything else = Arabic). If a visitor lands on `/` but chose English last time (sw-lang = en),
// send them to `/en` before anything renders. The URL always wins once you are on a language route.
(function () {
  try {
    var path = window.location.pathname.replace(/\/+$/, '');
    var isEn = path === '/en' || path.indexOf('/en/') === 0;
    if (!isEn && path === '' && localStorage.getItem('sw-lang') === 'en') {
      window.location.replace('/en' + window.location.hash);
      return;
    }
    document.documentElement.lang = isEn ? 'en' : 'ar';
    document.documentElement.dir = isEn ? 'ltr' : 'rtl';
  } catch (error) {
    /* storage unavailable: keep the Arabic defaults from index.html. */
  }
})();
