'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Swiper as SwiperType } from 'swiper'
import { testimonials } from '@/lib/mockData'
import { cn } from '@/lib/utils'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

export default function Testimonials() {
  const swiperRef = useRef<SwiperType | null>(null)

  return (
    <section className="py-16 md:py-24 bg-dark text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 paw-bg" />
      </div>

      {/* Floating Elements */}
      <motion.span
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-20 left-[10%] text-6xl opacity-10"
      >
        🐾
      </motion.span>
      <motion.span
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute bottom-20 right-[10%] text-6xl opacity-10"
      >
        🐾
      </motion.span>

      <div className="container-custom relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-secondary-400 font-semibold text-lg">Happy Pet Parents</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-2">
            What Our Customers Say
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Real stories from pet parents who trust BowPaw for their furry family members
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            autoplay={{
              delay: 5000, // 5 seconds - consistent with all carousels
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-white/30',
              bulletActiveClass: '!bg-secondary-400 !w-8',
            }}
            className="pb-16"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12"
                >
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    {/* Pet Image */}
                    <div className="relative flex-shrink-0">
                      <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden">
                        <Image
                          src={testimonial.petImage}
                          alt={testimonial.petName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {/* Pet Name Badge */}
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 
                                      bg-gradient-to-r from-primary-500 to-secondary-500 
                                      px-4 py-1 rounded-full text-sm font-semibold">
                        🐾 {testimonial.petName}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                      {/* Quote Icon */}
                      <Quote className="w-10 h-10 text-secondary-400 mb-4 mx-auto md:mx-0" />

                      {/* Rating */}
                      <div className="flex justify-center md:justify-start gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              'w-5 h-5',
                              i < testimonial.rating
                                ? 'fill-accent-400 text-accent-400'
                                : 'text-gray-600'
                            )}
                          />
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="text-xl md:text-2xl text-white/90 mb-6 leading-relaxed">
                        &ldquo;{testimonial.content}&rdquo;
                      </blockquote>

                      {/* Author */}
                      <div className="flex items-center gap-4 justify-center md:justify-start">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-white">{testimonial.name}</p>
                          <p className="text-sm text-gray-400">{testimonial.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10
                       w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full 
                       flex items-center justify-center hover:bg-white/20 transition-colors
                       hidden lg:flex"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10
                       w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full 
                       flex items-center justify-center hover:bg-white/20 transition-colors
                       hidden lg:flex"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}

