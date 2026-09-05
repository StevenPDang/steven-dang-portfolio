import { useEffect, useState } from 'react'
import Blob from '../components/Blob'

export default function DebugMotion() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <div className="min-h-screen bg-cream p-10 text-ink">
      <h1 className="font-display text-2xl text-forest">Motion debug</h1>

      <p className="mt-4 max-w-xl text-sm text-muted">
        This is the actual <code>Blob</code> component used in the Hero section — drifting, pulsing, and
        trailing — boxed with a grid so the movement is easy to track.
      </p>

      <p className="mt-4 rounded-md border border-forest/20 bg-sand-dim px-4 py-2 text-sm">
        <strong>prefers-reduced-motion:</strong>{' '}
        {reducedMotion ? 'REDUCE (animations are intentionally OFF)' : 'no-preference (animations should run)'}
      </p>

      <div
        className="relative mt-8 h-96 w-full max-w-2xl overflow-hidden rounded-xl border border-forest/30"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      >
        <Blob tone="sand" drift="a" className="left-16 top-16 h-32 w-32" />
        <Blob tone="forest" drift="b" className="right-16 bottom-16 h-32 w-32" />
      </div>

      <p className="mt-4 text-xs text-muted">
        Watch against the grid for ~10-15 seconds — the drift is slow (20-27s per cycle) by design; the pulse
        (~6s) and trailing echoes should be visible sooner.
      </p>
    </div>
  )
}
