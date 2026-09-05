import { highlights } from '../../data/resume'

export default function ResumeHighlights() {
  return (
    <div className="grid grid-cols-2 gap-6 border-t border-forest/10 pt-8 sm:grid-cols-4">
      {highlights.map((item) => (
        <div key={item.label}>
          <div className="font-display text-xl text-forest sm:text-2xl">{item.value}</div>
          <div className="mt-1 text-sm text-muted">{item.label}</div>
        </div>
      ))}
    </div>
  )
}
