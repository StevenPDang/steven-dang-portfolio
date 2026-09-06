import { marqueeText } from '../data/content'
import { useScrollProgress } from '../hooks/useScrollProgress'

// Each span repeats the phrase this many times (just enough to fill wide screens with no gaps).
const REPEAT = 6

function updateMarquee(node: HTMLDivElement, progress: number) {
  node.style.setProperty('--marquee-offset', `${-progress * (50 / REPEAT)}%`)
}

export default function Marquee() {
  const repeated = `${marqueeText}   `.repeat(REPEAT)
  const ref = useScrollProgress(updateMarquee)

  return (
    <div ref={ref} className="overflow-hidden py-10">
      <div
        className="flex w-max whitespace-nowrap"
        style={{ transform: 'translateX(var(--marquee-offset, 0%))' }}
      >
        <span className="font-display text-6xl tracking-tight text-sand-dim sm:text-8xl">{repeated}</span>
        <span className="font-display text-6xl tracking-tight text-sand-dim sm:text-8xl" aria-hidden>
          {repeated}
        </span>
      </div>
    </div>
  )
}
