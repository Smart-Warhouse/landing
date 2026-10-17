type SensorTags = { lidar: string; camera: string; tof: string; estop: string };

type ForkliftIllustrationProps = {
  /** Accessible description of the drawing (role="img"). */
  label: string;
  /**
   * `sensors`: LiDAR scan plane, camera cone and the ToF slow/stop fans, with text tags.
   * `mounts`: the bare forklift with numbered mount points 1-8 (the list beside it carries the words).
   */
  variant: 'sensors' | 'mounts';
  tags?: SensorTags;
  className?: string;
};

/** Mount-point markers in the overview's numbering (3 = ToF ring appears front and rear). */
const MOUNTS: readonly { n: number; x: number; y: number }[] = [
  { n: 1, x: 247, y: 66 },
  { n: 2, x: 382, y: 196 },
  { n: 3, x: 334, y: 248 },
  { n: 3, x: 104, y: 236 },
  { n: 4, x: 176, y: 230 },
  { n: 5, x: 470, y: 254 },
  { n: 6, x: 330, y: 120 },
  { n: 7, x: 300, y: 285 },
  { n: 8, x: 136, y: 176 },
];

/**
 * Stylised side view of the modified Huina 1577 Pro in the `lift` yellow. Drawn in map coordinates
 * (forks to the right) and pinned LTR: it is a technical drawing, not text. Colours come from
 * semantic tokens through fill-/stroke- utilities, so it follows the theme.
 */
export function ForkliftIllustration({
  label,
  variant,
  tags,
  className = '',
}: ForkliftIllustrationProps) {
  const sensors = variant === 'sensors';
  return (
    <svg
      viewBox="0 0 520 340"
      role="img"
      aria-label={label}
      direction="ltr"
      className={`h-auto w-full ${className}`}
    >
      {/* ground */}
      <line x1="40" y1="316" x2="500" y2="316" className="stroke-line" strokeWidth="2" />

      {sensors ? (
        <g aria-hidden="true">
          {/* LiDAR 360° scan plane, seen edge-on */}
          <ellipse
            cx="247"
            cy="88"
            rx="215"
            ry="24"
            className="fill-none stroke-accent"
            strokeWidth="1.5"
            strokeDasharray="5 6"
          />
          <ellipse
            cx="247"
            cy="88"
            rx="130"
            ry="14"
            className="fill-none stroke-accent"
            strokeWidth="1"
            opacity="0.5"
          />
          {/* camera cone toward the pallet pocket */}
          <path d="M374 206 L512 238 L512 300 Z" className="fill-accent" opacity="0.12" />
          <path
            d="M374 206 L512 238 M374 206 L512 300"
            className="stroke-accent"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
          {/* ToF: slow fan (< 40 cm) and stop fan (< 15 cm), front and rear */}
          <path
            d="M338 262 L430 236 A 96 96 0 0 1 430 300 Z"
            className="fill-warning"
            opacity="0.18"
          />
          <path
            d="M338 262 L372 252 A 36 36 0 0 1 372 274 Z"
            className="fill-danger"
            opacity="0.35"
          />
          <path
            d="M112 240 L28 214 A 90 90 0 0 0 28 270 Z"
            className="fill-warning"
            opacity="0.18"
          />
          <path
            d="M112 240 L80 230 A 34 34 0 0 0 80 250 Z"
            className="fill-danger"
            opacity="0.35"
          />
        </g>
      ) : null}

      <g aria-hidden="true">
        {/* overhead guard */}
        <rect x="188" y="104" width="7" height="104" rx="2" className="fill-ink-2" />
        <rect x="296" y="104" width="7" height="104" rx="2" className="fill-ink-2" />
        <rect x="178" y="98" width="134" height="10" rx="3" className="fill-ink-2" />
        {/* seat */}
        <path
          d="M210 196 v-34 a8 8 0 0 1 8-8 h10 a6 6 0 0 1 6 6 v20 h18 v16 z"
          className="fill-ink-3"
        />
        {/* body: counterweight + chassis */}
        <path
          d="M116 214 Q116 196 134 196 L330 196 Q340 196 340 208 L340 284 L116 284 Z"
          className="fill-lift stroke-lift-on"
          strokeWidth="2"
        />
        <rect
          x="140"
          y="214"
          width="70"
          height="40"
          rx="6"
          className="fill-none stroke-lift-on"
          strokeWidth="1.5"
          opacity="0.5"
        />
        {/* mast + carriage + forks */}
        <rect x="342" y="76" width="10" height="226" rx="2" className="fill-ink-2" />
        <rect x="356" y="76" width="6" height="226" rx="2" className="fill-ink-3" />
        <rect x="362" y="196" width="14" height="80" rx="2" className="fill-ink-2" />
        <rect x="376" y="270" width="104" height="8" rx="2" className="fill-ink-2" />
        {/* wheels */}
        <circle cx="160" cy="288" r="26" className="fill-ink" />
        <circle cx="160" cy="288" r="10" className="fill-surface-2" />
        <circle cx="300" cy="286" r="30" className="fill-ink" />
        <circle cx="300" cy="286" r="12" className="fill-surface-2" />
        {/* LiDAR on the guard */}
        <rect x="230" y="78" width="34" height="20" rx="5" className="fill-ink" />
        <rect x="234" y="84" width="26" height="5" rx="2" className="fill-accent" />
        {/* camera on the carriage */}
        <rect x="364" y="200" width="14" height="12" rx="2" className="fill-ink" />
        <circle cx="374" cy="206" r="3" className="fill-accent" />
        {/* E-Stop at the rear */}
        <rect x="128" y="190" width="16" height="6" rx="1" className="fill-ink-2" />
        <circle cx="136" cy="187" r="7" className="fill-danger" />
        {/* ToF sensors (front under the forks, rear) */}
        <rect x="334" y="258" width="6" height="8" rx="1" className="fill-ink" />
        <rect x="112" y="236" width="6" height="8" rx="1" className="fill-ink" />
      </g>

      {sensors && tags ? (
        <g className="fill-ink-2 text-[13px] font-bold" aria-hidden="true">
          <text x="247" y="50" textAnchor="middle">
            {tags.lidar}
          </text>
          <line x1="247" y1="56" x2="247" y2="76" className="stroke-ink-3" strokeWidth="1" />
          <text x="452" y="196" textAnchor="middle">
            {tags.camera}
          </text>
          <text x="440" y="334" textAnchor="middle">
            {tags.tof}
          </text>
          <text x="84" y="170" textAnchor="middle">
            {tags.estop}
          </text>
          <line x1="100" y1="174" x2="128" y2="184" className="stroke-ink-3" strokeWidth="1" />
        </g>
      ) : null}

      {!sensors ? (
        <g aria-hidden="true">
          {MOUNTS.map((m, i) => (
            <g key={i}>
              <circle
                cx={m.x}
                cy={m.y}
                r="12"
                className="fill-accent stroke-surface"
                strokeWidth="2"
              />
              <text
                x={m.x}
                y={m.y + 4.5}
                textAnchor="middle"
                className="fill-accent-on font-en text-[13px] font-bold"
              >
                {m.n}
              </text>
            </g>
          ))}
        </g>
      ) : null}
    </svg>
  );
}
