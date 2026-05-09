'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface CounterProps {
  end: number
  suffix?: string
  prefix?: string
  duration?: number
  decimals?: number
}

export function AnimatedCounter({ end, suffix = '', prefix = '', duration = 2, decimals = 0 }: CounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * end)
      
      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isInView, end, duration])

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString('en-IN')}{suffix}
    </span>
  )
}

interface StatItem {
  value: number
  suffix?: string
  prefix?: string
  label: string
  decimals?: number
}

interface StatsBarProps {
  stats: StatItem[]
  color?: string
  className?: string
}

export function StatsBar({ stats, color = 'primary', className = '' }: StatsBarProps) {
  const colorClasses: Record<string, string> = {
    primary: 'text-primary-500',
    orange: 'text-orange-500',
    blue: 'text-blue-500',
    pink: 'text-pink-500',
    green: 'text-green-500',
    purple: 'text-purple-500',
    indigo: 'text-indigo-500',
    red: 'text-red-500',
    yellow: 'text-yellow-500',
    rose: 'text-rose-500',
  }

  return (
    <section className={`py-6 bg-white border-b border-gray-100 -mt-10 relative z-20 mx-4 md:mx-8 rounded-2xl shadow-xl ${className}`}>
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className={`font-heading font-bold text-2xl md:text-3xl ${colorClasses[color] || colorClasses.primary}`}>
                <AnimatedCounter 
                  end={stat.value} 
                  suffix={stat.suffix} 
                  prefix={stat.prefix}
                  decimals={stat.decimals}
                />
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AnimatedCounter

