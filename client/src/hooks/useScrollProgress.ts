import { useEffect, useRef, useState, type RefObject } from 'react'

/**
 * Tracks scroll progress toward an element: 0 while its top is still at the bottom of the
 * viewport (about to arrive), 1 once its top has traveled all the way to the top of the
 * viewport — scrubbed over one full viewport-height of scrolling regardless of the element's
 * own size, so short elements (a single line of text, say) still animate across the whole
 * transition instead of a tiny scroll burst.
 *
 * The raw scroll position is only ever a target: the returned value eases toward it every
 * animation frame, so a single fast scroll gesture (one wheel flick, a trackpad swipe) still
 * plays out smoothly instead of snapping straight to wherever the scroll landed. Returns a
 * static 0 for prefers-reduced-motion.
 *
 * Pass `target` to measure a different element than the one this hook's `ref` gets attached
 * to — lets several components share one synced timeline (e.g. reveal some text exactly as
 * some other, unrelated element arrives at the top of the viewport).
 */
export function useScrollProgress<T extends HTMLElement>(smoothing = 0.012, target?: RefObject<T | null>) {
  const internalRef = useRef<T | null>(null)
  const ref = target ?? internalRef
  const [progress, setProgress] = useState(0)
  const targetProgressRef = useRef(0)
  const displayRef = useRef(0)

  useEffect(() => {
    const computeTarget = () => {
      const node = ref.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const raw = (viewportHeight - rect.top) / viewportHeight
      targetProgressRef.current = Math.min(1, Math.max(0, raw))
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      computeTarget()
      setProgress(targetProgressRef.current)
      return
    }

    computeTarget()

    let rafId: number
    const tick = () => {
      // Re-measure every frame (not just on scroll) so a late-attaching target ref, or one
      // that moves for reasons other than scrolling, still gets picked up.
      computeTarget()
      const delta = targetProgressRef.current - displayRef.current
      displayRef.current += Math.abs(delta) < 0.0005 ? delta : delta * smoothing
      setProgress(displayRef.current)
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('scroll', computeTarget, { passive: true })
    window.addEventListener('resize', computeTarget)
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', computeTarget)
      window.removeEventListener('resize', computeTarget)
      cancelAnimationFrame(rafId)
    }
  }, [smoothing, ref])

  return { ref, progress }
}
