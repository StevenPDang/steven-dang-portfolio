import type { RefObject } from 'react'
import { statement, timeline } from '../data/content'
import Reveal from './Reveal'
import ScrollFade from './ScrollFade'
import Blob from './Blob'

type AboutProps = {
  /** The marquee section's ref — the intro text finishes fading in exactly as it arrives at the top of the viewport. */
  marqueeRef: RefObject<HTMLDivElement | null>
}

export default function About({ marqueeRef }: AboutProps) {
  return (
    <section id="about" className="relative px-6 py-28 sm:px-10 lg:py-36">
      <Blob tone="sand" className="right-0 top-0 h-80 w-80" />

      <div className="relative mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:gap-20">
        <ScrollFade
          as="h2"
          targetRef={marqueeRef}
          className="font-display text-3xl leading-snug text-forest sm:text-4xl lg:text-5xl"
        >
          {statement.heading.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </ScrollFade>

        <ScrollFade targetRef={marqueeRef} className="space-y-5 text-base leading-relaxed text-ink sm:text-lg">
          {statement.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </ScrollFade>
      </div>

      <div className="relative mx-auto mt-24 max-w-5xl">
        <Reveal className="mb-10 flex items-center gap-2 text-sm tracking-[0.2em] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-forest" />
          TIMELINE
        </Reveal>

        <div className="divide-y divide-forest/10">
          {timeline.map((item, index) => (
            <Reveal
              key={`${item.year}-${item.title}`}
              delay={index * 80}
              className="grid gap-2 py-8 sm:grid-cols-[120px_1fr] sm:gap-8"
            >
              <span className="font-display text-lg text-muted">{item.year}</span>
              <div>
                <p className="font-display text-lg text-forest">{item.title}</p>
                <p className="mt-1 text-sm text-muted sm:text-base">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
