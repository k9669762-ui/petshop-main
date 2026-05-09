'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'
import { 
  ChevronLeft, ChevronRight, Star, ArrowRight, Shield, Heart, 
  Sparkles, PawPrint
} from 'lucide-react'
import { 
  petCategories, 
  dogBreeds, 
  catBreeds, 
  rabbitBreeds, 
  fishBreeds, 
  birdBreeds,
  getPopularPets,
  PetBreed 
} from '@/lib/petBreeds'
import PetCard from '@/components/pets/PetCard'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

export default function PetShowcase() {
  const popularPets = getPopularPets().slice(0, 10)

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-amber-50 via-orange-50 to-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-40 -right-40 w-80 h-80 border border-orange-200 rounded-full opacity-30"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-20 -left-20 w-60 h-60 border border-amber-200 rounded-full opacity-30"
        />
      </div>

      <div className="container-custom relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full text-sm font-medium mb-4"
          >
            <PawPrint className="w-4 h-4" />
            Find Your Perfect Companion
          </motion.span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-dark mb-4">
            Pets Available for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500"> Adoption</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            100% legal, healthy, and happy pets ready to join your loving family
          </p>
        </motion.div>

        {/* Category Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {petCategories.map((category, index) => (
            <Link key={category.id} href={`/shop?pet=${category.id}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer border border-gray-100"
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="font-medium text-gray-700">{category.name}</span>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Pets Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button className="showcase-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-xl rounded-full hidden md:flex items-center justify-center hover:bg-gray-50 transition-all -ml-6">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button className="showcase-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-xl rounded-full hidden md:flex items-center justify-center hover:bg-gray-50 transition-all -mr-6">
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1.2}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2,
              slideShadows: false,
            }}
            navigation={{
              prevEl: '.showcase-prev',
              nextEl: '.showcase-next',
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            loop={true}
            spaceBetween={20}
            breakpoints={{
              480: { slidesPerView: 1.5 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 2.5 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="showcase-carousel pb-14"
          >
            {popularPets.map((pet, index) => (
              <SwiperSlide key={pet.id}>
                <PetCard pet={pet} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              View All Pets
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 mt-12"
        >
          {[
            { icon: Shield, text: 'Health Certified' },
            { icon: Heart, text: 'Vet Checked' },
            { icon: Sparkles, text: '100% Legal' },
            { icon: Star, text: 'Premium Breeds' },
          ].map((badge, i) => (
            <div key={i} className="flex items-center gap-2 text-gray-600">
              <badge.icon className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-medium">{badge.text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .showcase-carousel .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #fed7aa;
          opacity: 1;
        }
        .showcase-carousel .swiper-pagination-bullet-active {
          background: #f97316;
          width: 28px;
          border-radius: 5px;
        }
      `}</style>
    </section>
  )
}

