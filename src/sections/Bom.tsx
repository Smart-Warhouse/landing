import { InfoIcon } from '@phosphor-icons/react';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { BOM_GROUPS_IQD, BOM_TOTAL_IQD, FLEET_SIZE, formatIqd } from '@/content/bom';
import { useCopy } from '@/i18n/copy';

/** Bar fills, one per group (decorative; every amount is also written as text). */
const BAR_FILLS = ['bg-accent', 'bg-lift', 'bg-info', 'bg-success', 'bg-warning'] as const;

export function Bom() {
  const { bom } = useCopy();
  const max = Math.max(...BOM_GROUPS_IQD);
  return (
    <section
      id="bom"
      aria-labelledby="bom-title"
      className="border-y border-line bg-surface py-16 md:py-24"
    >
      <Container>
        <SectionHeader id="bom-title" eyebrow={bom.eyebrow} title={bom.title} intro={bom.intro} />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          <Reveal>
            <figure className="rounded-2xl border border-line bg-bg p-5 sm:p-6">
              <figcaption className="sr-only">{bom.chartLabel}</figcaption>
              <ul className="grid gap-5">
                {bom.groups.map((group, index) => {
                  const amount = BOM_GROUPS_IQD[index];
                  return (
                    <li key={group.name}>
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="font-bold text-ink">{group.name}</span>
                        <span className="num shrink-0 font-en text-sm font-bold text-ink">
                          {formatIqd(amount)} {bom.currency}
                        </span>
                      </div>
                      <div
                        className="mt-2 h-2.5 overflow-hidden rounded-full bg-surface-2"
                        aria-hidden="true"
                      >
                        <div
                          className={`h-full rounded-full ${BAR_FILLS[index]}`}
                          style={{ width: `${Math.max(2, (amount / max) * 100)}%` }}
                        />
                      </div>
                      <p className="mt-1.5 text-xs text-ink-3">{group.items}</p>
                    </li>
                  );
                })}
              </ul>
            </figure>
          </Reveal>

          <div className="grid content-start gap-4">
            <div className="rounded-2xl bg-accent p-6 text-accent-on">
              <p className="text-sm font-bold">{bom.totalLabel}</p>
              <p className="num mt-1 font-en text-3xl font-bold">
                {formatIqd(BOM_TOTAL_IQD)} <span className="text-lg">{bom.currency}</span>
              </p>
              <p className="mt-2 text-sm">{bom.shareNote}</p>
            </div>
            <div className="rounded-2xl border border-line bg-bg p-6">
              <p className="text-sm font-bold text-ink-2">{bom.fleetLabel}</p>
              <p className="num mt-1 font-en text-2xl font-bold text-ink">
                ≈ {formatIqd(BOM_TOTAL_IQD * FLEET_SIZE)}{' '}
                <span className="text-base">{bom.currency}</span>
              </p>
              <p className="mt-1 text-sm text-ink-3">{bom.fleetNote}</p>
            </div>
            <p className="flex items-start gap-2 text-sm text-ink-2">
              <InfoIcon size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
              <span>{bom.excluded}</span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
