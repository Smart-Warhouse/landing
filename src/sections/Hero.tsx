import { InfoIcon } from '@phosphor-icons/react';
import { FleetMap } from '@/components/illustrations/FleetMap';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { DownArrow, ExternalArrow } from '@/components/ui/DirIcons';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { useCopy } from '@/i18n/copy';
import { DASHBOARD_URL } from '@/lib/site';

/** The h1 is the LCP element: it is never wrapped in Reveal. */
export function Hero() {
  const { hero } = useCopy();
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-line">
      <Container className="grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 id="hero-title" className="text-display text-ink">
            {hero.title}
          </h1>
          <p className="text-lead mt-5 max-w-2xl">{hero.pitch}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href={DASHBOARD_URL}
              variant="lift"
              size="lg"
              iconEnd={<ExternalArrow size={18} />}
            >
              {hero.ctaDashboard}
            </ButtonLink>
            <ButtonLink href="#how" variant="secondary" size="lg" iconEnd={<DownArrow size={18} />}>
              {hero.ctaHow}
            </ButtonLink>
          </div>
          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {hero.facts.map((fact) => (
              <div key={fact.label} className="rounded-xl border border-line bg-surface p-3">
                <dt className="sr-only">{fact.label}</dt>
                <dd>
                  <span className="num block font-en text-2xl font-bold text-ink" dir="ltr">
                    {fact.value}
                  </span>
                  <span className="mt-1 block text-xs leading-snug text-ink-2" aria-hidden="true">
                    {fact.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 flex items-start gap-2 text-sm text-ink-2">
            <InfoIcon size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
            <span>{hero.note}</span>
          </p>
        </div>
        <div className="rounded-3xl border border-line bg-surface p-3 sm:p-4">
          <FleetMap label={hero.figureLabel} />
        </div>
      </Container>
    </section>
  );
}
