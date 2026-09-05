import { projects } from '../data/content'
import Reveal from './Reveal'

export default function Projects() {
  return (
    <section id="work" className="relative bg-cream-dim px-6 py-28 sm:px-10 lg:py-36">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-16 flex items-center gap-2 text-sm tracking-[0.2em] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-forest" />
          SELECTED WORK
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 100}>
              <a
                href={project.href}
                className="group block h-full rounded-3xl border border-forest/10 bg-cream p-8 transition-colors hover:border-forest/30"
              >
                <span className="text-xs tracking-[0.2em] text-muted">{project.tag}</span>
                <h3 className="mt-4 font-display text-2xl text-forest">{project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm text-forest transition-transform group-hover:translate-x-1">
                  View project →
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
