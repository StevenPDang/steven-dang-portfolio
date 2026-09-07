import { useState } from 'react'
import { Link } from 'react-router-dom'
import { profile } from '../data/content'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  // HashRouter treats a bare `#about` href as a route change (there's no such
  // route, so it renders blank), so in-page section links scroll manually instead.
  const handleSectionClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault()
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-6 py-6 sm:px-10">
      <div className="flex items-center justify-between">
        <Link to="/" className="font-display text-lg tracking-[0.2em] text-forest">
          {profile.initials}
        </Link>

        {/* Full pill row — plenty of room from sm up */}
        <nav className="hidden items-center gap-2 sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleSectionClick(e, link.href)}
              className="rounded-full bg-forest px-5 py-2 text-sm tracking-wide text-cream transition-colors hover:bg-forest-light"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/resume"
            className="rounded-full border border-forest px-5 py-2 text-sm tracking-wide text-forest transition-colors hover:bg-forest hover:text-cream"
          >
            Resume
          </Link>
        </nav>

        {/* Below sm, four pills + the logo don't fit on one line — collapse to a menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-forest/30 text-forest sm:hidden"
        >
          {open ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M2 2 L14 14 M14 2 L2 14" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M2 4.5 H14 M2 8 H14 M2 11.5 H14" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <nav className="mt-4 flex flex-col gap-2 sm:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleSectionClick(e, link.href)}
              className="rounded-full bg-forest px-5 py-3 text-center text-sm tracking-wide text-cream"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/resume"
            onClick={() => setOpen(false)}
            className="rounded-full border border-forest px-5 py-3 text-center text-sm tracking-wide text-forest"
          >
            Resume
          </Link>
        </nav>
      )}
    </header>
  )
}
