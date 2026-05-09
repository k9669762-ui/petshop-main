'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Parallax } from 'react-scroll-parallax'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function PromoBanner() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Image with Parallax */}
      <Parallax speed={-20} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1920"
          alt="Happy dog"
          fill
          className="object-cover scale-125"
        />
      </Parallax>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-transparent" />

      {/* Floating Elements */}
      <motion.span
        animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
        className="absolute top-20 right-[20%] text-6xl opacity-30"
      >
        🦴
      </motion.span>
      <motion.span
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 7 }}
        className="absolute bottom-20 right-[30%] text-5xl opacity-30"
      >
        🎾
      </motion.span>

      <div className="container-custom relative">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-secondary-500/20 backdrop-blur-sm 
                       text-secondary-400 px-4 py-2 rounded-full mb-6"
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">Limited Time Offer</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4"
          >
            Get 25% Off Your First Order!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-lg md:text-xl mb-8"
          >
            Use code <span className="font-bold text-secondary-400">PAWFIRST25</span> at checkout. 
            Valid for new customers across India!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg group"
              >
                <span>Start Shopping</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

