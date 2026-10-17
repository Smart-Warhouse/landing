import { FlaskIcon } from '@phosphor-icons/react';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useCopy } from '@/i18n/copy';

/** Non-functional targets (NFR-01..07). Every value is labelled as a target; none is a result. */
export function Specs() {
  const { specs } = useCopy();
  return (
    <section
      id="specs"
      aria-labelledby="specs-title"
      className="border-y border-line bg-surface py-16 md:py-24"
    >
      <Container>
        <SectionHeader
          id="specs-title"
          eyebrow={specs.eyebrow}
          title={specs.title}
          intro={specs.intro}
        />

        <Reveal className="mt-10">
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[40rem] border-collapse text-start">
              <caption className="sr-only">{specs.title}</caption>
              <thead className="bg-surface-2 text-sm text-ink-2">
                <tr>
                  <th scope="col" className="px-4 py-3 text-start font-bold">
                    {specs.cols.metric}
                  </th>
                  <th scope="col" className="px-4 py-3 text-start font-bold">
                    {specs.cols.target}
                  </th>
                  <th scope="col" className="px-4 py-3 text-start font-bold">
                    {specs.cols.test}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line bg-bg">
                {specs.rows.map((row) => (
                  <tr key={row.id}>
                    <th scope="row" className="px-4 py-4 text-start font-medium text-ink">
                      <span className="block font-en text-xs font-bold text-ink-3" dir="ltr">
                        {row.id}
                      </span>
                      {row.metric}
                    </th>
                    <td className="px-4 py-4">
                      <span className="num inline-flex rounded-lg bg-accent-soft px-2.5 py-1 font-bold text-accent">
                        {row.target}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-ink-2">
                      <span className="block font-en text-xs font-bold text-ink" dir="ltr">
                        {row.test}
                      </span>
                      {row.method}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <p className="mt-5 flex max-w-3xl items-start gap-2 text-sm text-ink-2">
          <FlaskIcon size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
          <span>{specs.footnote}</span>
        </p>
      </Container>
    </section>
  );
}
