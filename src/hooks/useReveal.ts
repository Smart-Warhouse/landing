import { useEffect, useRef, useState } from 'react';

/**
 * Whether this visitor gets entrance motion at all. Decided in JS (not a global reduced-motion CSS
 * block) so reduced-motion visitors never receive the animation class or a stagger delay that would
 * hold content invisible.
 */
function shouldAnimate(): boolean {
  if (typeof window === 'undefined') return false;
  if (typeof IntersectionObserver === 'undefined') return false;
  if (typeof window.matchMedia !== 'function') return true;
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Reveals an element the first time it scrolls into view, once. Anyone who cannot or should not
 * animate gets `isRevealed: true` immediately: the fallback is "visible", never "invisible".
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [animates] = useState(shouldAnimate);
  const [isRevealed, setIsRevealed] = useState(!animates);

  useEffect(() => {
    if (!animates) return undefined;
    const element = ref.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // `bottom <= 0`: the element is already above the viewport (an anchor jump skipped it).
          // Reveal it, or it would stay at opacity 0 forever.
          if (!entry.isIntersecting && entry.boundingClientRect.bottom > 0) continue;
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      // threshold 0: a fractional threshold never fires for elements taller than the viewport.
      { threshold: 0, rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [animates]);

  return { ref, isRevealed, animates };
}
