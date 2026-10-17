import { ArrowsSplitIcon, SealCheckIcon } from '@phosphor-icons/react';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useCopy } from '@/i18n/copy';

export function Plan() {
  const { plan } = useCopy();
  return (
    <section id="plan" aria-labelledby="plan-title" className="py-16 md:py-24">
      <Container>
        <SectionHeader
          id="plan-title"
          eyebrow={plan.eyebrow}
          title={plan.title}
          intro={plan.intro}
        />

        <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {plan.phases.map((phase, index) => (
            <Reveal as="li" key={phase.title} delay={index * 60} className="card flex flex-col p-6">
              <p className="text-sm font-bold text-lift-ink">
                {plan.phaseLabel} <span className="font-en">{index + 1}</span>
              </p>
              <h3 className="mt-1 text-h3 text-ink">{phase.title}</h3>
              <p className="mt-2 flex-1 text-ink-2">{phase.body}</p>
              <p className="mt-5 flex items-center gap-2 rounded-xl bg-surface-2 px-3 py-2 text-sm">
                <SealCheckIcon size={18} aria-hidden="true" className="shrink-0 text-accent" />
                <span className="text-ink-2">{plan.gateLabel}:</span>
                <span className="num font-en font-bold text-ink" dir="ltr">
                  {phase.gate}
                </span>
              </p>
            </Reveal>
          ))}
        </ol>

        <p className="mt-6 flex max-w-3xl items-start gap-2 text-sm text-ink-2">
          <ArrowsSplitIcon size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
          <span>{plan.parallelNote}</span>
        </p>
      </Container>
    </section>
  );
}
