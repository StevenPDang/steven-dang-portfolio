type BlobProps = {
  className?: string
  tone?: 'sand' | 'forest'
  /** Omit for a plain static accent; pass 'a' | 'b' for the drifting/pulsing/trailing Hero variant. */
  drift?: 'a' | 'b'
}

// Staggered copies of the same drift animation, phase-shifted backward in time so they trail
// behind the main shape's current position — a cheap CSS-only motion trail. Only the lead
// copy pulses; the trailing echoes stay static aside from following the shared drift path.
// Delays are a small fraction of the ~11-13s drift cycle so echoes read as "just behind"
// rather than scattered to an unrelated point in the loop.
const TRAIL = [
  { delay: 0, opacity: 1, scale: 1, pulse: true },
  { delay: -0.8, opacity: 0.55, scale: 0.82, pulse: false },
  { delay: -1.6, opacity: 0.25, scale: 0.64, pulse: false },
]

/** Soft blurred gradient accent, positioned via className. Optionally drifts, pulses, and trails. */
export default function Blob({ className = '', tone = 'sand', drift }: BlobProps) {
  const gradient =
    tone === 'sand'
      ? 'bg-gradient-to-br from-sand via-sand-dim to-transparent'
      : 'bg-gradient-to-br from-forest-light via-forest to-transparent'

  if (!drift) {
    return (
      <div
        aria-hidden
        className={`pointer-events-none absolute rounded-full blur-3xl opacity-50 ${gradient} ${className}`}
      />
    )
  }

  const driftClass = drift === 'a' ? 'animate-drift-a' : 'animate-drift-b'

  return (
    <div aria-hidden className={`pointer-events-none absolute ${className}`}>
      {TRAIL.map((echo, i) => (
        <div key={i} className={`absolute inset-0 ${driftClass}`} style={{ animationDelay: `${echo.delay}s` }}>
          <div
            className={`h-full w-full rounded-full blur-2xl ${gradient} ${echo.pulse ? 'animate-pulse-glow' : ''}`}
            style={{ opacity: 0.55 * echo.opacity, ...(echo.pulse ? {} : { transform: `scale(${echo.scale})` }) }}
          />
        </div>
      ))}
    </div>
  )
}
