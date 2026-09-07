import { useEffect, useRef } from 'react'
import { profile } from '../data/content'
import Blob from './Blob'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      node.dataset.animating = String(entry.isIntersecting)
    }, { rootMargin: '200px' })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    // No overflow-hidden here: the drifting blobs can now travel far enough to reach this
    // section's own bottom edge, which clipped them in a hard, visible line right at the seam
    // with the next section. Horizontal overflow is instead contained at the page level.
    <section ref={ref} id="top" className="relative flex min-h-screen items-center justify-center px-6">
      <Blob tone="sand" drift="a" className="-left-24 top-1/3 h-96 w-96" />
      <Blob tone="forest" drift="b" className="right-0 top-10 h-72 w-72 opacity-20" />

      <div className="relative text-center">
        <h1 className="font-display text-4xl tracking-[0.35em] text-forest sm:text-5xl">
          {profile.initials}
        </h1>
        <p className="mt-6 font-display text-lg tracking-[0.15em] text-ink sm:text-xl">
          {profile.name}
        </p>
        <p className="mt-2 text-sm tracking-[0.1em] text-muted sm:text-base">{profile.role}</p>
      </div>
    </section>
  )
}
