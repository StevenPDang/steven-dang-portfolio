import { profile } from '../data/content'
import Reveal from './Reveal'

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative mt-10 overflow-hidden rounded-t-[3rem] bg-forest px-6 py-24 text-cream sm:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-4xl">
        <Reveal className="font-display text-3xl tracking-wide sm:text-4xl">Contact Info</Reveal>
        <Reveal delay={100} className="mt-4 max-w-xl text-cream/70">
          You can reach me here!
        </Reveal>

        <Reveal delay={200} className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-cream px-8 py-3 text-sm tracking-wide text-forest transition-opacity hover:opacity-90"
          >
            {profile.email}
          </a>
          {profile.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="rounded-full border border-cream/30 px-8 py-3 text-sm tracking-wide text-cream transition-colors hover:border-cream"
            >
              {social.label}
            </a>
          ))}
        </Reveal>

        <Reveal delay={300} className="mt-6 text-sm tracking-[0.1em] text-cream/50">
          {profile.location}
        </Reveal>

        <div className="mt-24 flex flex-col gap-4 border-t border-cream/10 pt-8 text-xs tracking-[0.15em] text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <div className="flex gap-6">
            {profile.socials.map((social) => (
              <a key={social.label} href={social.href} className="hover:text-cream">
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
