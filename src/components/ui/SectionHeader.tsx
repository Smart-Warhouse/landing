import { Eyebrow } from '@/components/ui/Eyebrow';

type SectionHeaderProps = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: 'default' | 'inverse';
  align?: 'start' | 'center';
};

/** Eyebrow + h2 + intro. The h2 id labels the section (`aria-labelledby`). */
export function SectionHeader({
  id,
  eyebrow,
  title,
  intro,
  tone = 'default',
  align = 'start',
}: SectionHeaderProps) {
  const inverse = tone === 'inverse';
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2 id={id} className={`text-h2 ${inverse ? 'text-inverse-ink' : 'text-ink'}`}>
        {title}
      </h2>
      {intro ? (
        <p
          className={`mt-4 text-lg leading-relaxed ${inverse ? 'text-inverse-ink-2' : 'text-ink-2'}`}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
