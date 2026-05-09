'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface MegaMenuCategory {
  name: string
  items: { name: string; href: string }[]
}

interface MegaMenuProps {
  categories: MegaMenuCategory[]
}

export default function MegaMenu({ categories }: MegaMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-1/2 -translate-x-1/2 w-screen max-w-4xl mt-2"
    >
      <div className="bg-white rounded-2xl shadow-2xl p-6 mx-4">
        <div className="grid grid-cols-4 gap-6">
          {/* Categories */}
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <h3 className="font-heading font-bold text-dark mb-3">
                {category.name}
              </h3>
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-600 hover:text-primary-500 transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative rounded-xl overflow-hidden"
          >
            <div className="aspect-square relative">
              <Image
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400"
                alt="Shop our collection"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="font-heading font-bold text-lg">New Collection</p>
                <p className="text-sm opacity-90">Shop Now →</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

