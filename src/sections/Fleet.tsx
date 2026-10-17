import { CheckIcon, MonitorIcon, PathIcon } from '@phosphor-icons/react';
import { FleetMap } from '@/components/illustrations/FleetMap';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { ExternalArrow } from '@/components/ui/DirIcons';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useCopy } from '@/i18n/copy';
import { DASHBOARD_URL } from '@/lib/site';

function FeatureList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-4 grid gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-ink-2">
          <CheckIcon size={18} aria-hidden="true" className="mt-1 shrink-0 text-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Fleet() {
  const { fleet } = useCopy();
  return (
    <section id="fleet" aria-labelledby="fleet-title" className="py-16 md:py-24">
      <Container>
        <SectionHeader
          id="fleet-title"
          eyebrow={fleet.eyebrow}
          title={fleet.title}
          intro={fleet.intro}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <Reveal>
            <figure className="rounded-3xl border border-line bg-surface p-3 sm:p-4">
              <FleetMap label={fleet.mapLabel} detailed />
              <figcaption>
                <ul className="flex flex-wrap gap-x-5 gap-y-2 px-2 pb-1 pt-3 text-xs text-ink-2">
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-0.5 w-5 bg-ink-3" />
                    {fleet.legend.free}
                  </li>
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-1.5 w-5 rounded-full bg-accent" />
                    {fleet.legend.locked}
                  </li>
                  <li className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-3 w-3 rounded-full border-2 border-dashed border-warning"
                    />
                    {fleet.legend.waiting}
                  </li>
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-3 w-4 rounded-sm bg-lift" />
                    {fleet.legend.robot}
                  </li>
                </ul>
              </figcaption>
            </figure>
          </Reveal>

          <div className="grid content-start gap-8">
            <div>
              <h3 className="flex items-center gap-2 text-h3 text-ink">
                <PathIcon size={22} aria-hidden="true" className="text-accent" />
                {fleet.managerTitle}
              </h3>
              <FeatureList items={fleet.manager} />
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-h3 text-ink">
                <MonitorIcon size={22} aria-hidden="true" className="text-accent" />
                {fleet.dashboardTitle}
              </h3>
              <FeatureList items={fleet.dashboard} />
            </div>
            <div>
              <ButtonLink
                href={DASHBOARD_URL}
                variant="primary"
                size="lg"
                iconEnd={<ExternalArrow size={18} />}
              >
                {fleet.cta}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
