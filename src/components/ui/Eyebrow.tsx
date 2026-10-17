import type { ReactNode } from 'react';

type Tone = 'default' | 'inverse';

const TONES: Record<Tone, { text: string; dot: string }> = {
  default: { text: 'text-accent', dot: 'bg-lift' },
  inverse: { text: 'text-inverse-ink-2', dot: 'bg-lift' },
};

/** Small label above a section heading, with the lift-yellow signature dot. */
export function Eyebrow({ children, tone = 'default' }: { children: ReactNode; tone?: Tone }) {
  const t = TONES[tone];
  return (
    <p className={`mb-3 inline-flex items-center gap-2 text-sm font-bold ${t.text}`}>
      <span aria-hidden="true" className={`h-2 w-2 rounded-full ${t.dot}`} />
      {children}
    </p>
  );
}
