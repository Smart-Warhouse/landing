import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { DownArrow, ExternalArrow } from '@/components/ui/DirIcons';
import { Reveal } from '@/components/ui/Reveal';
import { useCopy } from '@/i18n/copy';
import { DASHBOARD_URL } from '@/lib/site';

/** Closing band on the frozen-dark inverse surface (the second and last inverse chapter). */
export function FinalCta() {
  const { cta } = useCopy();
  return (
    <section aria-labelledby="cta-title" className="bg-inverse py-16 md:py-20">
      <Container>
        <Reveal className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 id="cta-title" className="text-h2 text-inverse-ink">
              {cta.title}
            </h2>
            <p className="mt-3 text-lg text-inverse-ink-2">{cta.body}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink
              href={DASHBOARD_URL}
              variant="lift"
              size="lg"
              iconEnd={<ExternalArrow size={18} />}
            >
              {cta.primary}
            </ButtonLink>
            <ButtonLink href="#how" variant="inverse" size="lg" iconEnd={<DownArrow size={18} />}>
              {cta.secondary}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
