import { useEffect, useRef, useState, type RefObject } from 'react'

/**
 * Progress from an element entering the viewport to its top reaching the viewport top.
 * Read the latest position once per frame, without easing that lags behind fast scrolling.
 * An optional target lets multiple components follow the same element.
 * Reduced motion renders the completed state.
 */
export function useScrollProgress<T extends HTMLElement>(target?: RefObject<T | null>) {
  const internalRef = useRef<T | null>(null)
  const ref = target ?? internalRef
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame: number | null = null

    const measure = () => {
      frame = null
      if (motionQuery.matches) {
        setProgress(1)
        return
      }
      const node = ref.current
      if (!node) return
      const viewportHeight = window.innerHeight
      const raw = (viewportHeight - node.getBoundingClientRect().top) / viewportHeight
      setProgress(Math.min(1, Math.max(0, raw)))
    }

    const scheduleMeasure = () => {
      if (frame === null) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', scheduleMeasure, { passive: true })
    window.addEventListener('resize', scheduleMeasure)
    motionQuery.addEventListener('change', scheduleMeasure)

    return () => {
      window.removeEventListener('scroll', scheduleMeasure)
      window.removeEventListener('resize', scheduleMeasure)
      motionQuery.removeEventListener('change', scheduleMeasure)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [ref])

  return { ref, progress }
}
