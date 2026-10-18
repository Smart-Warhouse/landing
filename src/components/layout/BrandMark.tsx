/**
 * SW·Fleet symbol — approved brand kit "Concept 01: Lane Route" (docs/brand/logo/symbol.svg), drawn with theme
 * tokens so it matches the kit's standard (light) and reversed (dark) variants: roof + left bay = ink, storage
 * bays = accent, route = forklift yellow in both themes. The route node centre stays white, as in the kit.
 */
export function BrandMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" aria-hidden="true" className={className} direction="ltr">
      <path
        className="fill-ink"
        d="M82 53 L129 25 L224 81 L224 156 L195 156 L195 97 L129 59 L103 77 Q90 72 82 53 Z"
      />
      <path className="fill-ink" d="M66 66 L66 115 L58 120 L58 196 L28 208 L28 91 Z" />
      <path className="fill-accent" d="M84 174 L123 174 Q127 174 127 178 L127 197 L84 197 Z" />
      <path
        className="fill-accent"
        d="M161 108 Q161 103 166 103 L179 103 Q184 103 184 108 L184 224 L161 224 Z"
      />
      <rect className="fill-accent" x="189" y="165" width="43" height="59" rx="10" />
      <circle className="fill-accent-on" cx="211" cy="182" r="5.5" />
      <path
        className="stroke-lift"
        d="M81 60 L81 102 Q81 116 96 124 L139 144 Q150 150 150 162 L150 193 Q150 208 134 208 L57 208 Q43 208 34 224"
        fill="none"
        strokeWidth="19"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle className="fill-lift" cx="29" cy="229" r="20" />
      <circle cx="29" cy="229" r="7" fill="#fff" />
    </svg>
  );
}
