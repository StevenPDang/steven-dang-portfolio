import { useActiveSection } from '../../hooks/useActiveSection'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'experience', label: 'Experience' },
  { id: 'research', label: 'Research' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
]

export default function ResumeSidebar() {
  const activeId = useActiveSection(sections.map((s) => s.id))

  return (
    <nav className="sticky top-16 hidden h-max flex-col gap-1 lg:flex">
      <span className="mb-3 text-xs tracking-[0.2em] text-muted">ON THIS PAGE</span>
      {sections.map((section) => {
        const isActive = section.id === activeId
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
            }}
            className={`border-l-2 py-1.5 pl-4 text-sm transition-colors ${
              isActive ? 'border-forest text-forest' : 'border-forest/10 text-muted hover:text-forest'
            }`}
          >
            {section.label}
          </a>
        )
      })}
    </nav>
  )
}
