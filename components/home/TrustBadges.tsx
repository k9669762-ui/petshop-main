'use client'

import { motion } from 'framer-motion'
import { Truck, Shield, RefreshCcw, HeadphonesIcon } from 'lucide-react'

const badges = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $50',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% secure checkout',
  },
  {
    icon: RefreshCcw,
    title: 'Easy Returns',
    description: '30-day return policy',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Dedicated support team',
  },
]

export default function TrustBadges() {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-14 h-14 bg-gradient-to-br from-primary-100 to-secondary-100 
                           rounded-2xl flex items-center justify-center mb-3
                           group-hover:shadow-lg transition-shadow"
              >
                <badge.icon className="w-7 h-7 text-primary-500" />
              </motion.div>
              <h3 className="font-heading font-bold text-dark">{badge.title}</h3>
              <p className="text-sm text-gray-500">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

