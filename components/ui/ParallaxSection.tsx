'use client'

import { ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  bgImage?: string
  bgColor?: string
  speed?: number
  direction?: 'up' | 'down'
  overlay?: boolean
  overlayOpacity?: number
}

export default function ParallaxSection({
  children,
  className,
  bgImage,
  bgColor,
  speed = 0.5,
  direction = 'up',
  overlay = true,
  overlayOpacity = 0.5,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' ? ['0%', `${-speed * 100}%`] : ['0%', `${speed * 100}%`]
  )

  return (
    <section
      ref={ref}
      className={cn('relative overflow-hidden', className)}
    >
      {/* Parallax Background */}
      {bgImage && (
        <motion.div
          style={{ y }}
          className="absolute inset-0 -top-[20%] -bottom-[20%]"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          {overlay && (
            <div
              className="absolute inset-0 bg-dark"
              style={{ opacity: overlayOpacity }}
            />
          )}
        </motion.div>
      )}

      {/* Solid Background */}
      {bgColor && !bgImage && (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: bgColor }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </section>
  )
}

// Wave Divider Component
export function WaveDivider({
  color = 'white',
  flip = false,
  className,
}: {
  color?: string
  flip?: boolean
  className?: string
}) {
  return (
    <div className={cn('w-full overflow-hidden', flip && 'rotate-180', className)}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-16 md:h-24"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,150.61,104.34,214.34,92.83,273.16,82.35,321.39,56.44,321.39,56.44Z"
          fill={color}
        />
      </svg>
    </div>
  )
}

// Floating Paw Prints
export function FloatingPaws({ className }: { className?: string }) {
  const paws = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: (i * 17 + 11) % 100,
    y: (i * 23 + 19) % 100,
    delay: (i % 5) * 0.8,
    duration: 5 + (i % 4) * 1.25,
    size: 20 + (i % 5) * 6,
  }))

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {paws.map((paw) => (
        <motion.span
          key={paw.id}
          initial={{ 
            x: `${paw.x}%`, 
            y: `${paw.y}%`,
            opacity: 0.1,
            scale: 1,
          }}
          animate={{
            y: [`${paw.y}%`, `${paw.y - 20}%`, `${paw.y}%`],
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: paw.duration,
            delay: paw.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute text-primary-500"
          style={{ fontSize: paw.size }}
        >
          🐾
        </motion.span>
      ))}
    </div>
  )
}

// Stats Counter
export function AnimatedCounter({
  value,
  suffix = '',
  duration = 2,
}: {
  value: number
  suffix?: string
  duration?: number
}) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {value.toLocaleString()}{suffix}
      </motion.span>
    </motion.span>
  )
}

