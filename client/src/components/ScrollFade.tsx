import type { ElementType, ReactNode, RefObject } from 'react'
import { useScrollProgress } from '../hooks/useScrollProgress'

type ScrollFadeProps = {
  children: ReactNode
  as?: ElementType
  className?: string
  /** Power-curve exponent for the opacity mapping — >1 stays low early and steepens near the end. */
  curve?: number
  /** Sync to another element's scroll arrival instead of this one's own position. */
  targetRef?: RefObject<HTMLElement | null>
}

/** Opacity tied directly to scroll position — reveals as the user scrolls, rather than a one-shot transition triggered on first view. */
export default function ScrollFade({ children, as: Tag = 'div', className = '', curve = 2.5, targetRef }: ScrollFadeProps) {
  const { ref, progress } = useScrollProgress<HTMLElement>(0.012, targetRef)
  const opacity = Math.pow(progress, curve)

  return (
    <Tag ref={targetRef ? undefined : ref} className={className} style={{ opacity }}>
      {children}
    </Tag>
  )
}
