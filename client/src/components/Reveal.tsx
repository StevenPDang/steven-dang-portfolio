import type { ElementType, ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

type RevealProps = {
  children: ReactNode
  as?: ElementType
  delay?: number
  className?: string
}

/** Wraps content so it fades/rises into place on first scroll into view. */
export default function Reveal({ children, as: Tag = 'div', delay = 0, className = '' }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>()

  return (
    <Tag
      ref={ref}
      data-reveal={visible ? 'visible' : 'hidden'}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      className={className}
    >
      {children}
    </Tag>
  )
}
