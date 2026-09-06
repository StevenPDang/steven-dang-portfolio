import { useCallback, type ElementType, type ReactNode } from 'react'
import { useScrollProgress } from '../hooks/useScrollProgress'

type ScrollFadeProps = {
  children: ReactNode
  as?: ElementType
  className?: string
  /** Power-curve exponent for the opacity mapping — >1 stays low early and steepens near the end. */
  curve?: number
}

/** Opacity tied directly to scroll position — reveals as the user scrolls, rather than a one-shot transition triggered on first view. */
export default function ScrollFade({ children, as: Tag = 'div', className = '', curve = 1.5 }: ScrollFadeProps) {
  const update = useCallback((node: HTMLElement, progress: number) => {
    node.style.opacity = `${Math.pow(progress, curve)}`
  }, [curve])
  // Finish while the text is comfortably in view, including stacked tablet/mobile layouts.
  const ref = useScrollProgress(update, 0.6)

  return (
    <Tag ref={ref} data-scroll-fade className={className}>
      {children}
    </Tag>
  )
}
