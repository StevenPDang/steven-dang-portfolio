import { personal } from '../data/content'
import Reveal from './Reveal'
import Blob from './Blob'
import koichaLogo from '../assets/koicha/koicha-logo.png'

export default function Personal() {
  return (
    <section className="relative overflow-hidden px-6 py-28 sm:px-10 lg:py-32">
      <Blob tone="sand" className="-left-16 bottom-0 h-72 w-72" />

      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal className="mb-6 flex items-center justify-center gap-2 text-sm tracking-[0.2em] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-forest" />
          {personal.label.toUpperCase()}
        </Reveal>
        <Reveal delay={80}>
          <img src={koichaLogo} alt="Koicha" className="mx-auto h-16 w-auto sm:h-20" />
        </Reveal>
        <Reveal delay={150} as="h2" className="mt-6 font-display text-3xl text-forest sm:text-4xl">
          {personal.heading}
        </Reveal>
        <Reveal delay={250} className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted">
          {personal.body}
        </Reveal>
      </div>
    </section>
  )
}
