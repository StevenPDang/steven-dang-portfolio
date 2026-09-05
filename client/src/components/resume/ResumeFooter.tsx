import { Link } from 'react-router-dom'
import { profile } from '../../data/content'
import { resumeMeta } from '../../data/resume'

export default function ResumeFooter() {
  return (
    <footer className="mt-10 bg-forest px-6 py-16 text-cream sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-3">
        <div>
          <div className="font-display text-lg">{profile.name}</div>
          <p className="mt-2 text-sm text-cream/70">{profile.role}</p>
        </div>

        <div>
          <span className="text-xs tracking-[0.2em] text-cream/50">CONTACT</span>
          <div className="mt-3 flex flex-col gap-1 text-sm">
            <a href={`mailto:${profile.email}`} className="hover:underline">
              {profile.email}
            </a>
            <a href={`tel:${resumeMeta.phone.replace(/[^\d+]/g, '')}`} className="hover:underline">
              {resumeMeta.phone}
            </a>
            {profile.socials.map((social) => (
              <a key={social.label} href={social.href} className="hover:underline">
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <span className="text-xs tracking-[0.2em] text-cream/50">ELSEWHERE</span>
          <div className="mt-3 flex flex-col gap-1 text-sm">
            <Link to="/" className="hover:underline">
              Portfolio home
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-5xl border-t border-cream/10 pt-6 text-xs text-cream/50">
        © {new Date().getFullYear()} {profile.name}
      </div>
    </footer>
  )
}
