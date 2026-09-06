import type { RefObject } from 'react'
import { marqueeText } from '../data/content'
import { useScrollProgress } from '../hooks/useScrollProgress'

type MarqueeProps = {
  /** Optional shared ref so other components can sync their own scroll effects to this section's arrival. */
  sectionRef?: RefObject<HTMLDivElement | null>
}

// Each span repeats the phrase this many times (just enough to fill wide screens with no gaps).
const REPEAT = 6

export default function Marquee({ sectionRef }: MarqueeProps) {
  const repeated = `${marqueeText}   `.repeat(REPEAT)
  const { ref, progress } = useScrollProgress<HTMLDivElement>(sectionRef)
  // One full span is 50% of the doubled container's width, so one phrase-length is 50%/REPEAT —
  // the whole point being a single cycle of travel, not REPEAT cycles' worth.
  const oneCyclePercent = 50 / REPEAT

  return (
    <div ref={ref} className="overflow-hidden py-10">
      <div
        className="flex w-max whitespace-nowrap"
        style={{ transform: `translateX(-${progress * oneCyclePercent}%)` }}
      >
        <span className="font-display text-6xl tracking-tight text-sand-dim sm:text-8xl">{repeated}</span>
        <span className="font-display text-6xl tracking-tight text-sand-dim sm:text-8xl" aria-hidden>
          {repeated}
        </span>
      </div>
    </div>
  )
}
