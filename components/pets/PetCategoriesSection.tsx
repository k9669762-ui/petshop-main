'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'
import { ChevronLeft, ChevronRight, Star, Shield, Truck, Award } from 'lucide-react'
import { 
  petCategories, 
  dogBreeds, 
  catBreeds, 
  rabbitBreeds, 
  fishBreeds, 
  birdBreeds,
  PetBreed 
} from '@/lib/petBreeds'
import PetCard from './PetCard'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

interface PetCategoriesSectionProps {
  showTitle?: boolean
  maxPetsPerCategory?: number
}

export default function PetCategoriesSection({ 
  showTitle = true, 
  maxPetsPerCategory = 8 
}: PetCategoriesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('dogs')

  const getPetsByCategory = (category: string): PetBreed[] => {
    switch (category) {
      case 'dogs': return dogBreeds.slice(0, maxPetsPerCategory)
      case 'cats': return catBreeds.slice(0, maxPetsPerCategory)
      case 'rabbits': return rabbitBreeds.slice(0, maxPetsPerCategory)
      case 'fish': return fishBreeds.slice(0, maxPetsPerCategory)
      case 'birds': return birdBreeds.slice(0, maxPetsPerCategory)
      default: return dogBreeds.slice(0, maxPetsPerCategory)
    }
  }

  const currentPets = getPetsByCategory(activeCategory)
  const currentCategory = petCategories.find(c => c.id === activeCategory)

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        {showTitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-4"
            >
              <Shield className="w-4 h-4" />
              100% Legal • No Restrictions
            </motion.span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-dark mb-3 sm:mb-4">
              Most Popular Pet Breeds
              <span className="block text-primary-500">in India 2025</span>
            </h2>
            <p className="text-gray-500 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Fully allowed, healthy, and happy pets ready to join your family
            </p>
          </motion.div>
        )}

        {/* Category Tabs */}
        <div className="mb-8 sm:mb-12">
          <div className="flex justify-center">
            <div className="inline-flex flex-wrap justify-center gap-2 sm:gap-3 p-2 bg-gray-100 rounded-2xl sm:rounded-3xl">
              {petCategories.map((category, index) => (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-medium transition-all text-xs sm:text-sm ${
                    activeCategory === category.id
                      ? 'bg-white text-dark shadow-lg'
                      : 'text-gray-600 hover:text-dark hover:bg-white/50'
                  }`}
                >
                  <span className="text-lg sm:text-2xl">{category.icon}</span>
                  <span className="hidden sm:inline">{category.name}</span>
                  {activeCategory === category.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white rounded-xl sm:rounded-2xl shadow-lg -z-10"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Category Description */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center mt-4 sm:mt-6"
            >
              <p className="text-gray-500 text-sm sm:text-base">
                {currentCategory?.description} • {currentPets.length} breeds available
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pets Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button className={`pets-prev-${activeCategory} absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white shadow-xl rounded-full hidden md:flex items-center justify-center hover:bg-gray-50 transition-all -ml-4 sm:-ml-6`}>
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>
          <button className={`pets-next-${activeCategory} absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white shadow-xl rounded-full hidden md:flex items-center justify-center hover:bg-gray-50 transition-all -mr-4 sm:-mr-6`}>
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation={{
                  prevEl: `.pets-prev-${activeCategory}`,
                  nextEl: `.pets-next-${activeCategory}`,
                }}
                pagination={{ clickable: true, dynamicBullets: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                grabCursor={true}
                loop={currentPets.length > 3}
                spaceBetween={16}
                slidesPerView={1.2}
                centeredSlides={false}
                breakpoints={{
                  480: { slidesPerView: 1.5, spaceBetween: 16 },
                  640: { slidesPerView: 2, spaceBetween: 20 },
                  768: { slidesPerView: 2.5, spaceBetween: 24 },
                  1024: { slidesPerView: 3, spaceBetween: 24 },
                  1280: { slidesPerView: 4, spaceBetween: 24 },
                }}
                className="pets-carousel pb-12 sm:pb-16"
              >
                {currentPets.map((pet, index) => (
                  <SwiperSlide key={pet.id}>
                    <PetCard pet={pet} index={index} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
        >
          {[
            { icon: Shield, title: 'Health Certified', desc: 'Vet-checked pets' },
            { icon: Truck, title: 'Safe Delivery', desc: 'Across Tamil Nadu' },
            { icon: Star, title: '4.9 Rating', desc: '2000+ happy families' },
            { icon: Award, title: '100% Legal', desc: 'All breeds allowed' },
          ].map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-md"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <badge.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500" />
              </div>
              <div>
                <h4 className="font-semibold text-dark text-xs sm:text-sm">{badge.title}</h4>
                <p className="text-[10px] sm:text-xs text-gray-500">{badge.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .pets-carousel .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #cbd5e1;
          opacity: 1;
        }
        .pets-carousel .swiper-pagination-bullet-active {
          background: #3b82f6;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  )
}

