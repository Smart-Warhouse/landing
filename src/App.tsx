import { Route, Routes, useLocation } from 'react-router-dom';
import { LocaleProvider } from '@/i18n/LocaleProvider';
import { langFromPath } from '@/i18n/locale';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';

/**
 * Two indexable routes: `/` (Arabic, default, RTL) and `/en` (English, LTR). Write every route with a
 * literal path attribute and list it in public/sitemap.xml (`seo.test.ts` parses this file for both).
 */
export default function App() {
  const { pathname } = useLocation();
  const fallbackLang = langFromPath(pathname);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <LocaleProvider lang="ar">
            <Home />
          </LocaleProvider>
        }
      />
      <Route
        path="/en"
        element={
          <LocaleProvider lang="en">
            <Home />
          </LocaleProvider>
        }
      />
      <Route
        path="*"
        element={
          <LocaleProvider lang={fallbackLang}>
            <NotFound />
          </LocaleProvider>
        }
      />
    </Routes>
  );
}
