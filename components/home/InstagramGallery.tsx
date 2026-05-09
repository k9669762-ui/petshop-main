'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'

const instagramImages = [
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
  'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400',
  'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400',
  'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?w=400',
  'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=400',
]

export default function InstagramGallery() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-pink-500 mb-4">
            <Instagram className="w-6 h-6" />
            <span className="font-semibold text-lg">@BowPaw</span>
          </div>
          <h2 className="section-title">Follow Us on Instagram</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Join our community and share your pet moments with #BowPawFamily
          </p>
        </motion.div>
      </div>

      {/* Full Width Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
        {instagramImages.map((image, index) => (
          <motion.a
            key={index}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative aspect-square overflow-hidden"
          >
            <Image
              src={image}
              alt={`Instagram post ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-pink-500/80 to-transparent 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300
                            flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.5 }}
                whileHover={{ scale: 1 }}
                className="text-white"
              >
                <Instagram className="w-10 h-10" />
              </motion.div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Follow Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-8"
      >
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 
                     text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all"
        >
          <Instagram className="w-5 h-5" />
          Follow @BowPaw
        </a>
      </motion.div>
    </section>
  )
}

