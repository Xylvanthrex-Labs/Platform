import type { ReactNode } from 'react'

function Figure({
  tone = 'light',
  children,
}: {
  tone?: 'light' | 'ink'
  children: ReactNode
}) {
  return (
    <svg
      className={`figure-svg figure-svg--${tone}`}
      viewBox="0 0 600 450"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

/* 01 — a system of nodes. Three nodes are doubled: the studio family. */
function MenseriesFigure({ tone }: { tone: 'light' | 'ink' }) {
  const outer = Array.from({ length: 12 }, (_, index) => {
    const angle = (index * Math.PI) / 6
    return [300 + Math.cos(angle) * 172, 225 + Math.sin(angle) * 172] as const
  })
  const inner = Array.from({ length: 6 }, (_, index) => {
    const angle = (index * Math.PI) / 3 + Math.PI / 6
    return [300 + Math.cos(angle) * 104, 225 + Math.sin(angle) * 104] as const
  })

  return (
    <Figure tone={tone}>
      <g className="fig-rings" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.28">
        <circle cx="300" cy="225" r="172" strokeDasharray="2 8" />
        <circle cx="300" cy="225" r="104" />
        <circle cx="300" cy="225" r="58" opacity="0.7" />
      </g>
      <g stroke="currentColor" strokeWidth="1" opacity="0.4">
        {outer.map(([x, y], index) => (
          <line key={index} x1="300" y1="225" x2={x} y2={y} />
        ))}
      </g>
      <g fill="currentColor" opacity="0.72">
        {outer.map(([x, y], index) => (
          <circle key={index} cx={x} cy={y} r={index % 4 === 0 ? 4.5 : 2.6} />
        ))}
        {inner.map(([x, y], index) => (
          <circle key={index} cx={x} cy={y} r="2.2" opacity="0.6" />
        ))}
      </g>
      <g fill="none" stroke="currentColor" strokeWidth="1" opacity="0.55">
        <circle cx={outer[2][0]} cy={outer[2][1]} r="11" />
        <circle cx={outer[6][0]} cy={outer[6][1]} r="11" />
        <circle cx={outer[10][0]} cy={outer[10][1]} r="11" />
      </g>
      <circle cx="300" cy="225" r="22" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      <circle cx="300" cy="225" r="8" fill="var(--signal)" />
      <g stroke="currentColor" strokeWidth="1" opacity="0.3">
        <path d="M78 88h18M87 79v18" />
        <path d="M504 362h18M513 353v18" />
        <path d="M512 92h14M519 85v14" />
        <path d="M74 350h14M81 343v14" />
      </g>
    </Figure>
  )
}

/* 02 — stacked infrastructure. Three planes and their services. */
function CloudFigure({ tone }: { tone: 'light' | 'ink' }) {
  return (
    <Figure tone={tone}>
      <g fill="currentColor" opacity="0.22">
        {Array.from({ length: 5 }, (_, row) =>
          Array.from({ length: 7 }, (_, column) => (
            <circle key={`${row}-${column}`} cx={156 + column * 48} cy={94 + row * 64} r="1.6" />
          )),
        )}
      </g>

      <g className="fig-cloud-planes" stroke="currentColor" strokeWidth="1">
        <path d="M300 220 480 310 300 400 120 310Z" fill="var(--surface-3)" opacity="0.7" />
        <path d="M300 150 480 240 300 330 120 240Z" fill="var(--surface-3)" opacity="0.85" />
        <path d="M300 80 480 170 300 260 120 170Z" fill="var(--surface)" />
      </g>

      <g stroke="currentColor" strokeWidth="1" opacity="0.5">
        <path d="M300 160v70M300 240v70" strokeDasharray="2 6" />
      </g>

      <g fill="var(--surface-3)" stroke="currentColor" strokeWidth="1">
        <path d="M248 158 280 174 248 190 216 174Z" />
        <path d="M320 158 352 174 320 190 288 174Z" />
        <path d="M284 190 316 206 284 222 252 206Z" />
      </g>

      <g stroke="currentColor" strokeWidth="1" opacity="0.55">
        <path d="M248 190v34M320 190v34M284 222v34" strokeDasharray="2 5" />
        <circle cx="248" cy="228" r="2.5" fill="currentColor" />
        <circle cx="320" cy="228" r="2.5" fill="currentColor" />
        <circle cx="284" cy="260" r="2.5" fill="currentColor" />
      </g>

      <g stroke="currentColor" strokeWidth="1" opacity="0.28">
        <path d="M120 240v70M480 240v70M300 260v70" />
      </g>
    </Figure>
  )
}

/* 03 — a die. The grid is the design, not a decoration. */
function HardwareFigure({ tone }: { tone: 'light' | 'ink' }) {
  const cells = [
    [0, 0],
    [1, 0],
    [4, 1],
    [2, 2],
    [5, 2],
    [1, 3],
    [3, 4],
    [0, 5],
    [4, 5],
  ]
  const cell = 35.2

  return (
    <Figure tone={tone}>
      <g stroke="currentColor" strokeWidth="1" opacity="0.14">
        <path d="M300 60v330M120 225h360" />
        <circle cx="300" cy="225" r="190" />
      </g>

      <g stroke="currentColor" strokeWidth="1" opacity="0.4">
        {Array.from({ length: 6 }, (_, index) => {
          const offset = 145 + index * 30
          const pin = 220 + index * 30
          return (
            <g key={index}>
              <path d={`M190 ${offset}h-24`} />
              <path d={`M410 ${offset}h24`} />
              <path d={`M${pin} 115v-24`} />
              <path d={`M${pin} 335v24`} />
            </g>
          )
        })}
      </g>

      <rect x="190" y="115" width="220" height="220" rx="16" fill="var(--figure-fill)" stroke="currentColor" strokeWidth="1.2" />
      <rect x="208" y="133" width="184" height="184" rx="7" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />

      <g stroke="currentColor" strokeWidth="0.8" opacity="0.35">
        {Array.from({ length: 5 }, (_, index) => (
          <g key={index}>
            <path d={`M${208 + (index + 1) * cell} 133v184`} />
            <path d={`M208 ${133 + (index + 1) * cell}h184`} />
          </g>
        ))}
      </g>

      <g fill="var(--figure-fill-strong)" stroke="currentColor" strokeWidth="0.8" opacity="0.8">
        {cells.map(([column, row], index) => (
          <rect
            key={index}
            x={208 + column * cell + 3}
            y={133 + row * cell + 3}
            width={cell - 6}
            height={cell - 6}
            rx="2"
          />
        ))}
      </g>

      <rect
        className="fig-scan"
        x="210"
        y="136"
        width="180"
        height="1.5"
        rx="0.75"
        fill="var(--signal)"
        opacity="0.65"
      />

      <circle cx="300" cy="225" r="3" fill="currentColor" />
      <circle cx="300" cy="225" r="17" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35" />
    </Figure>
  )
}

/* 04 — a lattice with one short path through it. */
function PostQuantumFigure({ tone }: { tone: 'light' | 'ink' }) {
  const rows = 6
  const columns = 8
  const points: Array<readonly [number, number]> = []

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const x = 150 + column * 42 + (row % 2 === 0 ? 0 : 21)
      const y = 105 + row * 44
      points.push([x, y] as const)
    }
  }

  const path = points.filter((_, index) => [9, 11, 19, 28, 37].includes(index))

  return (
    <Figure tone={tone}>
      <g stroke="currentColor" strokeWidth="0.8" opacity="0.24">
        {points.map(([x, y], index) => {
          const column = index % columns
          const row = Math.floor(index / columns)
          return (
            <g key={index}>
              {column < columns - 1 ? <line x1={x} y1={y} x2={x + 42} y2={y} /> : null}
              {row < rows - 1 ? (
                <>
                  <line x1={x} y1={y} x2={x - 21} y2={y + 44} />
                  <line x1={x} y1={y} x2={x + 21} y2={y + 44} />
                </>
              ) : null}
            </g>
          )
        })}
      </g>

      <g fill="currentColor" opacity="0.55">
        {points.map(([x, y], index) => (
          <circle key={index} cx={x} cy={y} r="2.1" />
        ))}
      </g>

      <g className="fig-path" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d={`M${path[0][0]} ${path[0][1]} ${path.slice(1).map(([x, y]) => `L${x} ${y}`).join(' ')}`} />
      </g>

      <g fill="currentColor">
        {path.map(([x, y], index) => (
          <circle key={index} cx={x} cy={y} r="4" />
        ))}
      </g>

      <g stroke="currentColor" strokeWidth="1" opacity="0.4">
        <path d="M150 366h252" strokeDasharray="2 7" />
        <path d="M402 360v12M150 360v12" />
      </g>
    </Figure>
  )
}

/* 05 — two sources and their overlapping wavefronts. */
function QuantumFigure({ tone }: { tone: 'light' | 'ink' }) {
  const radii = [36, 72, 108, 144, 180, 216]

  return (
    <Figure tone={tone}>
      <g className="fig-waves fig-waves--left" stroke="currentColor" strokeWidth="1" opacity="0.22">
        {radii.map((radius) => (
          <circle key={`left-${radius}`} cx="208" cy="225" r={radius} fill="none" />
        ))}
      </g>
      <g className="fig-waves fig-waves--right" stroke="currentColor" strokeWidth="1" opacity="0.34">
        {radii.map((radius) => (
          <circle key={`right-${radius}`} cx="392" cy="225" r={radius} fill="none" />
        ))}
      </g>

      <g stroke="currentColor" strokeWidth="1" opacity="0.3">
        <path d="M70 225h460" strokeDasharray="2 8" />
        <path d="M120 368v14M180 368v8M240 368v14M300 368v8M360 368v14M420 368v8M480 368v14" />
      </g>

      <g fill="currentColor">
        <circle cx="208" cy="225" r="4" />
        <circle cx="392" cy="225" r="4" />
        <circle cx="300" cy="225" r="6" opacity="0.8" />
      </g>

      <g stroke="currentColor" strokeWidth="1" opacity="0.4">
        <circle cx="300" cy="225" r="18" />
        <path d="M300 199v-16M300 251v16" />
      </g>
    </Figure>
  )
}

const figures = {
  menseries: MenseriesFigure,
  cloud: CloudFigure,
  hardware: HardwareFigure,
  'post-quantum-security': PostQuantumFigure,
  'quantum-research': QuantumFigure,
} as const

export function UnitFigure({
  slug,
  tone = 'light',
}: {
  slug: string
  tone?: 'light' | 'ink'
}) {
  const FigureComponent = figures[slug as keyof typeof figures]
  if (!FigureComponent) return null
  return <FigureComponent tone={tone} />
}
