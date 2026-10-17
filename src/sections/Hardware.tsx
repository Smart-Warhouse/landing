import { ForkliftIllustration } from '@/components/illustrations/ForkliftIllustration';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useCopy } from '@/i18n/copy';

export function Hardware() {
  const { hardware } = useCopy();
  return (
    <section id="hardware" aria-labelledby="hardware-title" className="py-16 md:py-24">
      <Container>
        <SectionHeader
          id="hardware-title"
          eyebrow={hardware.eyebrow}
          title={hardware.title}
          intro={hardware.intro}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div>
            <Reveal>
              <figure className="rounded-3xl border border-line bg-surface p-4 sm:p-6">
                <ForkliftIllustration variant="mounts" label={hardware.figureLabel} />
              </figure>
            </Reveal>
            <dl className="mt-5 grid gap-3 sm:grid-cols-3">
              {hardware.facts.map((fact) => (
                <div key={fact.label} className="rounded-xl border border-line bg-surface p-4">
                  <dt className="text-caption">{fact.label}</dt>
                  <dd className="num mt-1 font-bold text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <ol className="grid content-start gap-3">
            {hardware.points.map((point, index) => (
              <Reveal
                as="li"
                key={point.title}
                delay={index * 50}
                className="flex gap-4 rounded-2xl border border-line bg-surface p-4"
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent font-en text-sm font-bold text-accent-on"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="font-bold text-ink">
                    <span className="sr-only">{index + 1}. </span>
                    {point.title}
                    <span className="font-medium text-ink-3"> · {point.place}</span>
                  </h3>
                  <p className="mt-0.5 text-sm text-ink-2">{point.why}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
