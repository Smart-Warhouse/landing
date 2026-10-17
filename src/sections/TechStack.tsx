import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { STACK } from '@/content/stack';
import { useCopy } from '@/i18n/copy';

/** A compact strip: group label + tool chips. Tool names are not translated. */
export function TechStack() {
  const { stack } = useCopy();
  return (
    <section id="stack" aria-labelledby="stack-title" className="py-14 md:py-20">
      <Container>
        <Eyebrow>{stack.eyebrow}</Eyebrow>
        <h2 id="stack-title" className="text-h2 text-ink">
          {stack.title}
        </h2>
        <dl className="mt-8 grid gap-x-8 gap-y-5 md:grid-cols-2 xl:grid-cols-3">
          {stack.groups.map((label, index) => (
            <div key={label}>
              <dt className="text-sm font-bold text-ink-2">{label}</dt>
              <dd className="mt-2 flex flex-wrap gap-2" dir="ltr">
                {STACK[index].map((tool) => (
                  <span
                    key={tool}
                    className="rounded-lg border border-line bg-surface px-2.5 py-1 font-en text-xs font-medium text-ink"
                  >
                    {tool}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
