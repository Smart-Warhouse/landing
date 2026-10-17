/** The SW·Fleet mark: a lift-yellow forklift on the accent tile. Same yellow in both themes. */
export function BrandMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className} direction="ltr">
      <rect width="64" height="64" rx="14" className="fill-accent" />
      <path d="M14 42V24a4 4 0 0 1 4-4h12l6 10h4v12z" className="fill-lift" />
      <rect x="44" y="12" width="4" height="34" rx="1" className="fill-accent-on" />
      <rect x="44" y="42" width="14" height="4" rx="1" className="fill-accent-on" />
      <circle cx="21" cy="46" r="5" className="fill-ink stroke-accent-on" strokeWidth="2" />
      <circle cx="35" cy="46" r="5" className="fill-ink stroke-accent-on" strokeWidth="2" />
      <circle cx="24" cy="16" r="3" className="fill-accent-on" />
    </svg>
  );
}
