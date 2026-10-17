import { BrainIcon, CloudIcon, CpuIcon, PlugsConnectedIcon } from '@phosphor-icons/react';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useCopy } from '@/i18n/copy';

/** Zipped by index with `software.tiers` (server, Jetson, ESP32). */
const TIER_ICONS = [CloudIcon, BrainIcon, CpuIcon] as const;

export function Software() {
  const { software } = useCopy();
  return (
    <section
      id="software"
      aria-labelledby="software-title"
      className="border-y border-line bg-surface py-16 md:py-24"
    >
      <Container>
        <SectionHeader
          id="software-title"
          eyebrow={software.eyebrow}
          title={software.title}
          intro={software.intro}
        />

        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {software.tiers.map((tier, index) => {
            const Icon = TIER_ICONS[index];
            return (
              <Reveal
                as="li"
                key={tier.name}
                delay={index * 70}
                className="flex flex-col rounded-2xl border border-line bg-bg"
              >
                <div className="border-b border-line p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <h3 className="text-h3 text-ink">{tier.name}</h3>
                  </div>
                  <p className="mt-3 font-en text-xs font-medium leading-relaxed text-ink-3">
                    {tier.platform}
                  </p>
                  <p className="mt-2 text-sm font-medium text-lift-ink">{tier.rate}</p>
                </div>
                <ul className="divide-y divide-line">
                  {tier.modules.map((module) => (
                    <li key={module.name} className="px-5 py-3">
                      <code className="font-mono text-[13px] font-bold text-ink" dir="ltr">
                        {module.name}
                      </code>
                      <p className="text-sm text-ink-2">{module.desc}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </ul>

        <div className="mt-12">
          <h3 className="flex items-center gap-2 text-h3 text-ink">
            <PlugsConnectedIcon size={22} aria-hidden="true" className="text-accent" />
            {software.protocolsTitle}
          </h3>
          <dl className="mt-5 grid gap-4 md:grid-cols-3">
            {software.protocols.map((protocol) => (
              <div key={protocol.name} className="rounded-2xl border border-line bg-bg p-5">
                <dt className="font-en font-bold text-ink">{protocol.name}</dt>
                <dd className="mt-2 text-sm text-ink-2">{protocol.desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
