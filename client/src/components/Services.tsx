import { services } from '../data/content'
import Reveal from './Reveal'

export default function Services() {
  return (
    <section className="relative px-6 py-28 sm:px-10 lg:py-36">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-16 flex items-center gap-2 text-sm tracking-[0.2em] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-forest" />
          WHAT I DO
        </Reveal>

        <div className="divide-y divide-forest/10">
          {services.map((service, index) => (
            <Reveal
              key={service.title}
              delay={index * 100}
              className="grid gap-3 py-10 sm:grid-cols-[80px_1fr_2fr] sm:items-baseline sm:gap-8"
            >
              <span className="font-display text-sm text-muted">{service.label}</span>
              <h3 className="font-display text-2xl text-forest sm:text-3xl">{service.title}</h3>
              <p className="text-sm leading-relaxed text-muted sm:text-base">{service.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
