import {
  CloudIcon,
  CpuIcon,
  HandPalmIcon,
  ShieldCheckIcon,
  TimerIcon,
} from '@phosphor-icons/react';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useCopy } from '@/i18n/copy';

/** Zipped by index with `safety.layers` (hardware, ESP32, Jetson, server). */
const LAYER_ICONS = [HandPalmIcon, CpuIcon, ShieldCheckIcon, CloudIcon] as const;

/** Dots for the LED states; the meaning is always written beside them (colour is never the only signal). */
const LED_DOTS = ['bg-success', 'bg-lift', 'bg-danger'] as const;

/**
 * A chapter on the frozen-dark inverse surface (one of two on the page, with the final CTA).
 * Text uses the inverse-* tokens only.
 */
export function Safety() {
  const { safety } = useCopy();
  return (
    <section id="safety" aria-labelledby="safety-title" className="bg-inverse py-16 md:py-24">
      <Container>
        <SectionHeader
          id="safety-title"
          tone="inverse"
          eyebrow={safety.eyebrow}
          title={safety.title}
          intro={safety.intro}
        />

        <p className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-inverse-line bg-inverse-2 px-5 py-3 font-bold text-inverse-ink">
          <TimerIcon size={24} aria-hidden="true" className="shrink-0 text-lift" />
          <span>{safety.headline}</span>
        </p>

        <ol className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {safety.layers.map((layer, index) => {
            const Icon = LAYER_ICONS[index];
            const isHardware = index === 0;
            return (
              <Reveal
                as="li"
                key={layer.title}
                delay={index * 70}
                className="flex flex-col rounded-2xl border border-inverse-line bg-inverse-2 p-5"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      isHardware ? 'bg-danger text-inverse' : 'bg-inverse text-lift'
                    }`}
                  >
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <p className="text-sm font-bold text-inverse-ink-2">{layer.level}</p>
                </div>
                <h3 className="mt-4 text-h3 text-inverse-ink">{layer.title}</h3>
                <p className="mt-2 text-sm text-inverse-ink-2">{layer.body}</p>
                <ul className="mt-4 grid gap-2 border-t border-inverse-line pt-4">
                  {layer.rules.map((rule) => (
                    <li key={rule} className="flex gap-2 text-sm text-inverse-ink">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lift"
                      />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </ol>

        <div className="mt-10 flex flex-col gap-4 border-t border-inverse-line pt-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-bold text-inverse-ink">{safety.ledsTitle}</h3>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {safety.leds.map((led, index) => (
                <li key={led.colour} className="flex items-center gap-2 text-sm text-inverse-ink-2">
                  <span aria-hidden="true" className={`h-3 w-3 rounded-full ${LED_DOTS[index]}`} />
                  <span>
                    <span className="font-bold text-inverse-ink">{led.colour}</span>: {led.meaning}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <p className="max-w-md text-sm text-inverse-ink-2">{safety.footnote}</p>
        </div>
      </Container>
    </section>
  );
}
