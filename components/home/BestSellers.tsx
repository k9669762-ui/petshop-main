'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { getBestSellers } from '@/lib/mockData'
import ProductCard from '@/components/product/ProductCard'

import 'swiper/css'
import 'swiper/css/navigation'

export default function BestSellers() {
  const swiperRef = useRef<SwiperType | null>(null)
  const products = getBestSellers().slice(0, 12)

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 text-accent-500 mb-2">
              <Trophy className="w-6 h-6" />
              <span className="font-semibold text-lg">Customer Favorites</span>
            </div>
            <h2 className="section-title">Best Sellers</h2>
            <p className="section-subtitle">
              Top-rated products loved by pet parents everywhere
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            {/* Navigation Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center
                           hover:border-primary-500 hover:text-primary-500 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center
                           hover:border-primary-500 hover:text-primary-500 transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <Link
              href="/shop?filter=bestseller"
              className="hidden md:inline-flex btn-secondary"
            >
              View All
            </Link>
          </motion.div>
        </div>

        {/* Products Carousel with negative margin effect */}
        <div className="carousel-negative">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              0: { slidesPerView: 1.3, spaceBetween: 16 },
              480: { slidesPerView: 2.2, spaceBetween: 20 },
              768: { slidesPerView: 3.2, spaceBetween: 24 },
              1024: { slidesPerView: 4.2, spaceBetween: 24 },
            }}
            className="!overflow-visible !py-4"
          >
            {products.map((product, index) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} index={index} />
            </SwiperSlide>
          ))}
          </Swiper>
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <Link href="/shop?filter=bestseller" className="btn-primary">
            <span>View All Best Sellers</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

