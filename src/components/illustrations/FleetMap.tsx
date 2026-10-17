type FleetMapProps = {
  label: string;
  /** Detailed: node ids, the planned path and the waiting halo are emphasised (Fleet section). */
  detailed?: boolean;
  className?: string;
};

const LANE_Y = [118, 228] as const;
const NODE_X = [60, 175, 290, 395, 500] as const;
const VERTICAL_X = [60, 290, 500] as const;

/** Top-down forklift glyph, nose (forks) pointing to +x before rotation. */
function Forklift({
  x,
  y,
  angle,
  carrying = false,
}: {
  x: number;
  y: number;
  angle: number;
  carrying?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      {carrying ? (
        <rect
          x="11"
          y="-10"
          width="18"
          height="20"
          rx="2"
          className="fill-lift-soft stroke-lift-ink"
          strokeWidth="1.5"
        />
      ) : null}
      <rect x="10" y="-7" width="16" height="3" rx="1" className="fill-ink-2" />
      <rect x="10" y="4" width="16" height="3" rx="1" className="fill-ink-2" />
      <rect
        x="-16"
        y="-10"
        width="27"
        height="20"
        rx="5"
        className="fill-lift stroke-lift-on"
        strokeWidth="1.5"
      />
      <circle cx="-3" cy="0" r="4" className="fill-ink" />
    </g>
  );
}

/**
 * Stylised top-down warehouse: racks, a lane graph (nodes + segments), one segment reserved by a
 * moving forklift, a second forklift waiting for it, a third heading to the inbound dock.
 * Map coordinates are always LTR (x grows to the right), whatever the page direction.
 */
export function FleetMap({ label, detailed = false, className = '' }: FleetMapProps) {
  return (
    <svg
      viewBox="0 0 560 360"
      role="img"
      aria-label={label}
      direction="ltr"
      className={`h-auto w-full ${className}`}
    >
      <g aria-hidden="true">
        {/* floor */}
        <rect
          x="8"
          y="8"
          width="544"
          height="344"
          rx="18"
          className="fill-surface-2 stroke-line"
          strokeWidth="2"
        />

        {/* racks with pallets */}
        {[40, 150].map((y) =>
          [
            [90, 170],
            [320, 150],
          ].map(([x, w]) => (
            <g key={`${x}-${y}`}>
              <rect
                x={x}
                y={y}
                width={w}
                height="42"
                rx="6"
                className="fill-surface stroke-line"
                strokeWidth="2"
              />
              {Array.from({ length: Math.floor((w - 10) / 30) }, (_, i) => (
                <rect
                  key={i}
                  x={x + 8 + i * 30}
                  y={y + 9}
                  width="22"
                  height="24"
                  rx="3"
                  className={
                    (i + y / 10) % 3 === 0 ? 'fill-surface-2' : 'fill-lift-soft stroke-lift-ink'
                  }
                  strokeWidth="1"
                />
              ))}
            </g>
          )),
        )}

        {/* zones: inbound dock, charging bays, outbound dock */}
        <rect
          x="90"
          y="270"
          width="120"
          height="58"
          rx="8"
          className="fill-none stroke-ink-3"
          strokeWidth="1.5"
          strokeDasharray="6 5"
        />
        {[250, 284, 318].map((x) => (
          <rect
            key={x}
            x={x}
            y="276"
            width="26"
            height="46"
            rx="5"
            className="fill-info-soft stroke-info"
            strokeWidth="1.2"
          />
        ))}
        <rect
          x="380"
          y="270"
          width="120"
          height="58"
          rx="8"
          className="fill-none stroke-ink-3"
          strokeWidth="1.5"
          strokeDasharray="6 5"
        />
        <text
          x="150"
          y="304"
          textAnchor="middle"
          className="fill-ink-3 font-en text-[12px] font-bold"
        >
          IN
        </text>
        <text
          x="440"
          y="304"
          textAnchor="middle"
          className="fill-ink-3 font-en text-[12px] font-bold"
        >
          OUT
        </text>

        {/* lane graph: segments */}
        {LANE_Y.map((y) => (
          <line
            key={y}
            x1={NODE_X[0]}
            y1={y}
            x2={NODE_X[4]}
            y2={y}
            className="stroke-ink-3"
            strokeWidth="2"
            opacity="0.6"
          />
        ))}
        {VERTICAL_X.map((x) => (
          <line
            key={x}
            x1={x}
            y1={LANE_Y[0]}
            x2={x}
            y2={LANE_Y[1]}
            className="stroke-ink-3"
            strokeWidth="2"
            opacity="0.6"
          />
        ))}

        {/* reserved segment N2-N3 */}
        <line
          x1="175"
          y1="118"
          x2="290"
          y2="118"
          className="stroke-accent"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* planned path of the moving forklift */}
        <path
          d="M290 118 L290 228 L395 228"
          className="fill-none stroke-accent"
          strokeWidth="2.5"
          strokeDasharray="6 6"
          opacity={detailed ? 1 : 0.7}
        />

        {/* nodes */}
        {LANE_Y.map((y, row) =>
          NODE_X.map((x, col) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r="6" className="fill-surface stroke-ink-2" strokeWidth="2" />
              {detailed ? (
                <text
                  x={x}
                  y={y - 12}
                  textAnchor="middle"
                  className="fill-ink-3 font-en text-[11px] font-bold"
                >
                  {`N${row * 5 + col + 1}`}
                </text>
              ) : null}
            </g>
          )),
        )}

        {/* waiting halo */}
        <circle
          cx="395"
          cy="118"
          r="24"
          className="fill-none stroke-warning"
          strokeWidth="2"
          strokeDasharray="4 4"
        />

        <Forklift x={232} y={118} angle={0} carrying />
        <Forklift x={395} y={118} angle={180} />
        <Forklift x={118} y={228} angle={180} />
      </g>
    </svg>
  );
}
