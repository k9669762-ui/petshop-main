'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Heart, Package, Star, Globe } from 'lucide-react'
import { stats } from '@/lib/mockData'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  heart: Heart,
  package: Package,
  star: Star,
  globe: Globe,
}

export default function StatsCounter() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Paws */}
      <motion.span
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-10 left-[5%] text-7xl opacity-20"
      >
        🐾
      </motion.span>
      <motion.span
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute bottom-10 right-[5%] text-7xl opacity-20"
      >
        🐾
      </motion.span>

      <div className="container-custom relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem key={stat.id} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatItem({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [count, setCount] = useState(0)

  const Icon = iconMap[stat.icon] || Heart

  useEffect(() => {
    if (isInView) {
      const duration = 2000 // 2 seconds
      const steps = 60
      const increment = stat.value / steps
      const stepDuration = duration / steps

      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= stat.value) {
          setCount(stat.value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, stepDuration)

      return () => clearInterval(timer)
    }
  }, [isInView, stat.value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="text-center text-white"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
        className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 bg-white/20 rounded-full 
                   flex items-center justify-center backdrop-blur-sm"
      >
        <Icon className="w-8 h-8 md:w-10 md:h-10" />
      </motion.div>
      <div className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-2">
        {count.toLocaleString()}{stat.suffix}
      </div>
      <p className="text-white/80 text-lg">{stat.label}</p>
    </motion.div>
  )
}

