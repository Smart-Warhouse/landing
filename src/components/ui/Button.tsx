import type { ReactNode } from 'react';
import { useCopy } from '@/i18n/copy';

type Variant = 'primary' | 'lift' | 'secondary' | 'inverse';
type Size = 'md' | 'lg';

// Complete literal class strings (Tailwind JIT). Each fill pairs with its own foreground token.
const VARIANTS: Record<Variant, string> = {
  primary: 'bg-accent text-accent-on hover:bg-accent-hover',
  lift: 'bg-lift text-lift-on hover:brightness-105 active:brightness-95',
  secondary: 'border border-line bg-surface text-ink hover:bg-surface-2',
  inverse: 'border border-inverse-line text-inverse-ink hover:bg-inverse-2',
};

const SIZES: Record<Size, string> = {
  md: 'min-h-11 px-4 text-sm',
  lg: 'min-h-12 px-6 text-base',
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Leading/trailing icon (already sized, aria-hidden). */
  icon?: ReactNode;
  iconEnd?: ReactNode;
};

/**
 * Link styled as a button. In-page anchors (`#id`) and site paths (`/…`) stay in the tab; anything
 * else (the dashboard URL) opens a new tab with noopener and an announced hint.
 */
export function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconEnd,
}: ButtonLinkProps) {
  const copy = useCopy();
  const external = !href.startsWith('#') && !href.startsWith('/');
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-colors ${VARIANTS[variant]} ${SIZES[size]}`}
    >
      {icon}
      <span>{children}</span>
      {iconEnd}
      {external ? <span className="sr-only">{copy.common.newTab}</span> : null}
    </a>
  );
}
