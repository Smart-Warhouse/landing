import { CaretDownIcon } from '@phosphor-icons/react';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useCopy } from '@/i18n/copy';

/** Native <details>/<summary>: keyboard and screen-reader support without script. */
export function Faq() {
  const { faq } = useCopy();
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="border-t border-line bg-surface py-16 md:py-24"
    >
      <Container>
        <SectionHeader id="faq-title" eyebrow={faq.eyebrow} title={faq.title} align="center" />
        <div className="mx-auto mt-10 grid max-w-3xl gap-3">
          {faq.items.map((item) => (
            <details key={item.q} className="group rounded-2xl border border-line bg-bg">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl p-5 font-bold text-ink [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <CaretDownIcon
                  size={20}
                  aria-hidden="true"
                  className="shrink-0 text-ink-3 transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="px-5 pb-5 text-ink-2">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
