'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import { getNewArrivals } from '@/lib/mockData'
import ProductCard from '@/components/product/ProductCard'

export default function NewArrivals() {
  const products = getNewArrivals().slice(0, 8)

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-secondary-100 text-secondary-600 
                          px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">Fresh Drops</span>
          </div>
          <h2 className="section-title">New Arrivals</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Be the first to discover our latest products for your beloved pets
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/shop?filter=new">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary group"
            >
              <span>Explore All New Arrivals</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

