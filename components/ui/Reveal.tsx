'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  once?: boolean
}

export function Reveal({ children, delay = 0, y = 16, className, once = true }: RevealProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Staggered container: children get sequential reveal via index-based delay. */
export function RevealGroup({
  children,
  className,
  step = 0.07,
  base = 0,
}: {
  children: ReactNode[]
  className?: string
  step?: number
  base?: number
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Reveal key={i} delay={base + i * step}>
          {child}
        </Reveal>
      ))}
    </div>
  )
}
