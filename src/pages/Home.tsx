import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useScrollToHash } from '@/hooks/useScrollToHash';
import { useCopy } from '@/i18n/copy';
import { LANG_PATHS, useLocale } from '@/i18n/locale';
import { Ai } from '@/sections/Ai';
import { Bom } from '@/sections/Bom';
import { Faq } from '@/sections/Faq';
import { FinalCta } from '@/sections/FinalCta';
import { Fleet } from '@/sections/Fleet';
import { Hardware } from '@/sections/Hardware';
import { Hero } from '@/sections/Hero';
import { HowItWorks } from '@/sections/HowItWorks';
import { Plan } from '@/sections/Plan';
import { ProblemIdea } from '@/sections/ProblemIdea';
import { Safety } from '@/sections/Safety';
import { Software } from '@/sections/Software';
import { Specs } from '@/sections/Specs';
import { TechStack } from '@/sections/TechStack';

export default function Home() {
  const copy = useCopy();
  const { lang } = useLocale();
  usePageMeta({
    title: copy.meta.title,
    description: copy.meta.description,
    lang,
    path: LANG_PATHS[lang],
  });
  useScrollToHash();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-on"
      >
        {copy.common.skipLink}
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <ProblemIdea />
        <HowItWorks />
        <Hardware />
        <Software />
        <Ai />
        <Safety />
        <Fleet />
        <Specs />
        <Plan />
        <Bom />
        <TechStack />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
