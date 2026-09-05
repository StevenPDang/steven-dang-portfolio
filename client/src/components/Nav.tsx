import { Link } from 'react-router-dom'
import { profile } from '../data/content'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 sm:px-10">
      <Link to="/" className="font-display text-lg tracking-[0.2em] text-forest">
        {profile.initials}
      </Link>
      <nav className="flex items-center gap-2">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
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
    </header>
  )
}
