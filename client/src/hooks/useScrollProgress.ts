import { useEffect, useRef } from 'react'

/**
 * Update a scroll effect without rendering React on every frame.
 * Cache document coordinates until layout changes; scroll frames only read scrollY.
 * endViewport is where the element's top finishes its animation (0 = viewport top).
 */
export function useScrollProgress<T extends HTMLElement>(
  update: (node: T, progress: number) => void,
  endViewport = 0,
) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame: number | null = null
    let needsMeasure = true
    let top = 0
    let height = 1
    let lastProgress = -1

    const tick = () => {
      frame = null
      if (needsMeasure) {
        top = node.getBoundingClientRect().top + window.scrollY
        height = window.innerHeight
        needsMeasure = false
      }
      const raw = (window.scrollY + height - top) / (height * (1 - endViewport))
      const progress = motionQuery.matches ? 1 : Math.min(1, Math.max(0, raw))
      if (progress !== lastProgress) {
        update(node, progress)
        lastProgress = progress
      }
    }
    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(tick)
    }
    const invalidate = () => {
      needsMeasure = true
      schedule()
    }
    const observer = new ResizeObserver(invalidate)
    observer.observe(document.body)
    observer.observe(node)
    tick()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', invalidate)
    motionQuery.addEventListener('change', schedule)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', invalidate)
      motionQuery.removeEventListener('change', schedule)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [update, endViewport])

  return ref
}
