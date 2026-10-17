import {
  CheckCircleIcon,
  MagnifyingGlassIcon,
  RepeatIcon,
  TrafficSignIcon,
} from '@phosphor-icons/react';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useCopy } from '@/i18n/copy';

/** Zipped by index with `problem.pains`. */
const PAIN_ICONS = [RepeatIcon, TrafficSignIcon, MagnifyingGlassIcon] as const;

export function ProblemIdea() {
  const { problem } = useCopy();
  return (
    <section id="problem" aria-labelledby="problem-title" className="py-16 md:py-24">
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeader
            id="problem-title"
            eyebrow={problem.eyebrow}
            title={problem.title}
            intro={problem.intro}
          />
          <ul className="mt-8 grid gap-5">
            {problem.pains.map((pain, index) => {
              const Icon = PAIN_ICONS[index];
              return (
                <Reveal as="li" key={pain.title} delay={index * 70} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-ink-2">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-h3 text-ink">{pain.title}</h3>
                    <p className="mt-1 text-ink-2">{pain.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>

        <Reveal className="self-center">
          <figure className="rounded-3xl border border-line bg-surface p-6 md:p-8">
            <figcaption className="inline-flex rounded-full bg-lift px-3 py-1 text-sm font-bold text-lift-on">
              {problem.ideaLabel}
            </figcaption>
            <blockquote className="mt-5 font-display text-xl font-bold leading-relaxed text-ink md:text-2xl">
              {problem.idea}
            </blockquote>
            <ul className="mt-6 grid gap-3 border-t border-line pt-6">
              {problem.ideaPoints.map((point) => (
                <li key={point} className="flex gap-3 text-ink-2">
                  <CheckCircleIcon size={22} aria-hidden="true" className="shrink-0 text-accent" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
