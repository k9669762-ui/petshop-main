'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules'
import { ArrowRight } from 'lucide-react'
import { collections } from '@/lib/mockData'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

export default function FeaturedCollections() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-light to-white overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary-500 font-semibold text-lg">Browse By</span>
          <h2 className="section-title mt-2">Shop Collections</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Find everything your furry friend needs in our curated collections
          </p>
        </motion.div>

        {/* Collections Carousel */}
        <Swiper
          modules={[Autoplay, EffectCoverflow, Pagination]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          autoplay={{
            delay: 5000, // 5 seconds - consistent with all carousels
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="pb-12"
        >
          {collections.map((collection, index) => (
            <SwiperSlide key={collection.id} className="px-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/shop?category=${collection.slug}`} className="block group">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-heading font-bold text-xl md:text-2xl text-white mb-1">
                        {collection.name}
                      </h3>
                      <p className="text-white/80 text-sm mb-3">
                        {collection.productCount} Products
                      </p>
                      <span className="inline-flex items-center gap-2 text-white font-semibold 
                                       group-hover:gap-4 transition-all">
                        Shop Now
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity
                                    bg-gradient-to-t from-primary-500/20 to-transparent" />
                  </div>
                </Link>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

