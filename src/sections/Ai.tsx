import {
  CrosshairIcon,
  EyeIcon,
  ShieldCheckIcon,
  TargetIcon,
  TreeStructureIcon,
} from '@phosphor-icons/react';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useCopy } from '@/i18n/copy';

/** Zipped by index with `ai.cards` (perception, docking, fleet allocation). */
const CARD_ICONS = [EyeIcon, CrosshairIcon, TreeStructureIcon] as const;

export function Ai() {
  const { ai } = useCopy();
  return (
    <section id="ai" aria-labelledby="ai-title" className="py-16 md:py-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <SectionHeader id="ai-title" eyebrow={ai.eyebrow} title={ai.title} intro={ai.intro} />
          <Reveal>
            <div className="rounded-2xl border border-line bg-lift-soft p-5">
              <p className="flex items-center gap-2 font-display text-xl font-bold text-ink md:text-2xl">
                <ShieldCheckIcon size={26} aria-hidden="true" className="shrink-0 text-lift-ink" />
                {ai.principle}
              </p>
              <p className="mt-2 text-sm text-ink-2">{ai.principleNote}</p>
            </div>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {ai.cards.map((card, index) => {
            const Icon = CARD_ICONS[index];
            return (
              <Reveal
                as="li"
                key={card.title}
                delay={index * 70}
                className="card flex flex-col p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-bold text-accent">
                    {card.tag}
                  </span>
                  <Icon size={26} aria-hidden="true" className="text-ink-3" />
                </div>
                <h3 className="mt-4 text-h3 text-ink">{card.title}</h3>
                <p className="mt-2 text-ink-2">{card.body}</p>
                <ul className="mt-5 grid gap-2 border-t border-line pt-4">
                  {card.targets.map((target) => (
                    <li key={target} className="flex gap-2 text-sm text-ink">
                      <TargetIcon
                        size={18}
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 text-accent"
                      />
                      <span>{target}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </ul>

        <div className="mt-14">
          <h3 className="text-h3 text-ink">{ai.journeyTitle}</h3>
          <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ai.journey.map((step, index) => (
              <Reveal
                as="li"
                key={step.title}
                delay={index * 60}
                className="relative rounded-2xl border border-line bg-surface p-4"
              >
                <span className="font-en text-sm font-bold text-lift-ink" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h4 className="mt-1 font-bold text-ink">{step.title}</h4>
                <p className="mt-1 text-sm text-ink-2">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
