import type { ReactNode, Ref } from 'react';
import { useReveal } from '@/hooks/useReveal';

type RevealElement = 'div' | 'li' | 'article';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Render as the list item itself so lists keep valid markup. */
  as?: RevealElement;
  /** Stagger offset in ms; keep steps around 70 ms. */
  delay?: number;
};

/**
 * The only entrance motion on the site: a 12px lift and fade over 600 ms, once. Never wrap the LCP
 * headline in it. Reduced-motion visitors (and browsers without IntersectionObserver) get the
 * children rendered plainly, with no animation class and no opacity gate.
 */
export function Reveal({ children, className = '', as = 'div', delay = 0 }: RevealProps) {
  const { ref, isRevealed, animates } = useReveal<HTMLElement>();
  const Element = as;

  if (!animates) return <Element className={className}>{children}</Element>;

  return (
    <Element
      ref={ref as Ref<never>}
      className={`${isRevealed ? 'animate-fade-up' : 'opacity-0'} ${className}`}
      style={isRevealed && delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Element>
  );
}
