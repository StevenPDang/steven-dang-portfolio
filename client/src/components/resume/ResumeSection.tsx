import type { ReactNode } from 'react'

type ResumeSectionProps = {
  id: string
  title: string
  children: ReactNode
}

export default function ResumeSection({ id, title, children }: ResumeSectionProps) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-forest/10 py-14 first:border-t-0 first:pt-0">
      <h2 className="font-display text-2xl text-forest sm:text-3xl">{title}</h2>
      <div className="mt-6 space-y-6 text-ink">{children}</div>
    </section>
  )
}
