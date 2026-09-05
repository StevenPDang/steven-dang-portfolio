import ResumeHeader from '../components/resume/ResumeHeader'
import ResumeSidebar from '../components/resume/ResumeSidebar'
import ResumeSection from '../components/resume/ResumeSection'
import ResumeHighlights from '../components/resume/ResumeHighlights'
import ResumeFooter from '../components/resume/ResumeFooter'
import { projects } from '../data/content'
import { overview, experience, research, education, skills } from '../data/resume'
import koichaIcon from '../assets/koicha/koicha-icon.png'

export default function Resume() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <ResumeHeader />

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[200px_1fr] lg:px-16">
        <ResumeSidebar />

        <div className="max-w-3xl">
          <ResumeSection id="overview" title="Overview">
            <p className="leading-relaxed">{overview}</p>
            <ResumeHighlights />
          </ResumeSection>

          <ResumeSection id="experience" title="Experience">
            {experience.map((job) => (
              <div key={job.role}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="flex items-center gap-2 font-display text-lg text-forest">
                    {job.org === 'Koicha LLC' && <img src={koichaIcon} alt="" className="h-5 w-5" />}
                    {job.role} · {job.org}
                  </h3>
                  <span className="text-sm text-muted">{job.dates}</span>
                </div>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink/90">
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </ResumeSection>

          <ResumeSection id="research" title="Research">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-lg text-forest">{research.title}</h3>
              <span className="text-sm text-muted">{research.dates}</span>
            </div>
            <p className="text-sm text-muted">{research.org}</p>
            <p className="leading-relaxed">{research.description}</p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink/90">
              {research.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </ResumeSection>

          <ResumeSection id="projects" title="Projects">
            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.title}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg text-forest">{project.title}</h3>
                    <span className="text-xs tracking-[0.15em] text-muted">{project.tag.toUpperCase()}</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{project.description}</p>
                </div>
              ))}
            </div>
          </ResumeSection>

          <ResumeSection id="education" title="Education">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-lg text-forest">{education.school}</h3>
              <span className="text-sm text-muted">{education.dates}</span>
            </div>
            <p className="text-sm text-muted">{education.degree}</p>
            {education.details.length > 0 && (
              <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink/90">
                {education.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            )}
          </ResumeSection>

          <ResumeSection id="skills" title="Skills">
            <div className="grid gap-8 sm:grid-cols-3">
              {skills.map((group) => (
                <div key={group.category}>
                  <h3 className="text-sm tracking-[0.15em] text-forest">{group.category.toUpperCase()}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="rounded-full bg-sand-dim px-3 py-1 text-xs text-forest">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ResumeSection>
        </div>
      </div>

      <ResumeFooter />
    </div>
  )
}
