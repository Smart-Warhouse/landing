import { BrainIcon, CloudIcon, CpuIcon, GearSixIcon, HandPalmIcon } from '@phosphor-icons/react';
import { ForkliftIllustration } from '@/components/illustrations/ForkliftIllustration';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useCopy } from '@/i18n/copy';

/** Zipped by index with `how.layers` (server, Jetson, ESP32, hardware). */
const LAYER_ICONS = [CloudIcon, BrainIcon, CpuIcon, GearSixIcon] as const;

export function HowItWorks() {
  const { how } = useCopy();
  return (
    <section
      id="how"
      aria-labelledby="how-title"
      className="border-y border-line bg-surface py-16 md:py-24"
    >
      <Container>
        <SectionHeader id="how-title" eyebrow={how.eyebrow} title={how.title} intro={how.intro} />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-14">
          {/* The stack, top (server) to bottom (hardware), with the link between each pair. */}
          <ol className="grid">
            {how.layers.map((layer, index) => {
              const Icon = LAYER_ICONS[index];
              const link = index < how.links.length ? how.links[index] : null;
              return (
                <Reveal as="li" key={layer.name} delay={index * 70}>
                  <div className="flex gap-4 rounded-2xl border border-line bg-bg p-5">
                    <div className="flex flex-col items-center gap-2">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-on">
                        <Icon size={24} aria-hidden="true" />
                      </span>
                      <span className="font-en text-xs font-bold text-ink-3" aria-hidden="true">
                        {4 - index}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-h3 text-ink">
                        {layer.name}{' '}
                        <span className="font-medium text-lift-ink">· {layer.nickname}</span>
                      </h3>
                      <p className="mt-1 text-ink-2">{layer.body}</p>
                      <p className="mt-3 break-words font-en text-xs font-medium leading-relaxed text-ink-3">
                        {layer.stack}
                      </p>
                    </div>
                  </div>
                  {link ? (
                    <div className="flex items-center gap-3 py-2 ps-10">
                      <span aria-hidden="true" className="h-8 w-0.5 bg-line" />
                      <span className="rounded-full border border-line bg-surface px-3 py-0.5 font-en text-xs font-bold text-ink-2">
                        {link}
                      </span>
                    </div>
                  ) : null}
                </Reveal>
              );
            })}
          </ol>

          <div className="lg:sticky lg:top-24">
            <Reveal>
              <figure className="rounded-3xl border border-line bg-bg p-4 sm:p-6">
                <ForkliftIllustration
                  variant="sensors"
                  label={how.figureLabel}
                  tags={how.figureTags}
                />
                <figcaption className="mt-3 text-sm text-ink-2">{how.figureCaption}</figcaption>
              </figure>
            </Reveal>
            <Reveal className="mt-5">
              <div className="flex gap-4 rounded-2xl border border-line bg-danger-soft p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-danger text-surface">
                  <HandPalmIcon size={22} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-h3 text-ink">{how.estop.title}</h3>
                  <p className="mt-1 text-ink-2">{how.estop.body}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
