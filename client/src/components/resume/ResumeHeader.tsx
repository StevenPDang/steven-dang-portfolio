import { Link } from 'react-router-dom'
import { profile } from '../../data/content'
import { resumeMeta } from '../../data/resume'
import RelationalDiagram from './RelationalDiagram'

export default function ResumeHeader() {
  return (
    <header className="relative overflow-hidden border-b border-forest/10 px-6 pb-16 pt-14 sm:px-10 lg:px-16">
      <RelationalDiagram />

      {/* pointer-events-none so this text column's invisible full-width box doesn't sit on top of
          the interactive diagram to its right — interactive children opt back in individually. */}
      <div className="relative z-10 pointer-events-none">
        <Link to="/" className="pointer-events-auto text-sm text-muted transition-colors hover:text-forest">
          ← Steven Dang
        </Link>

        <div className="mt-6 text-xs tracking-[0.15em] text-muted">
          LAST UPDATED {resumeMeta.lastUpdated.toUpperCase()}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {resumeMeta.tags.map((tag, index) => (
            <span
              key={tag}
              className={
                index === 0
                  ? 'rounded-md bg-forest px-3 py-1 text-xs tracking-wide text-cream'
                  : 'rounded-md bg-sand-dim px-3 py-1 text-xs tracking-wide text-forest'
              }
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="mt-6 font-display text-4xl leading-tight text-forest sm:text-5xl lg:text-6xl">
          {resumeMeta.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <div className="mt-8 text-lg text-ink">{resumeMeta.name}</div>
        <div className="mt-1 text-sm text-muted">{resumeMeta.affiliation}</div>

        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <a
            href={`mailto:${profile.email}`}
            className="pointer-events-auto rounded-full bg-forest px-5 py-2 text-cream transition-colors hover:bg-forest-light"
          >
            {profile.email}
          </a>
          {profile.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="pointer-events-auto rounded-full border border-forest/30 px-5 py-2 text-forest transition-colors hover:border-forest"
            >
              {social.label}
            </a>
          ))}
          <a
            href={`tel:${resumeMeta.phone.replace(/[^\d+]/g, '')}`}
            className="pointer-events-auto rounded-full border border-forest/30 px-5 py-2 text-forest transition-colors hover:border-forest"
          >
            {resumeMeta.phone}
          </a>
          <a
            href={resumeMeta.pdfHref}
            download
            className="pointer-events-auto rounded-full border border-forest/30 px-5 py-2 text-forest transition-colors hover:border-forest"
          >
            Download PDF
          </a>
        </div>
      </div>
    </header>
  )
}
