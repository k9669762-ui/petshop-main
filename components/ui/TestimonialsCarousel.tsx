'use client'

import { useId } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'
import { Star, MapPin, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

export interface Testimonial {
  name: string
  location: string
  pet: string
  rating: number
  text: string
  image: string
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[]
  title?: string
  subtitle?: string
  color?: string
  className?: string
}

const colorClasses: Record<string, { bg: string; text: string; bullet: string }> = {
  primary: { bg: 'bg-primary-50', text: 'text-primary-500', bullet: '#3b82f6' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-500', bullet: '#f97316' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-500', bullet: '#3b82f6' },
  pink: { bg: 'bg-pink-50', text: 'text-pink-500', bullet: '#ec4899' },
  green: { bg: 'bg-green-50', text: 'text-green-500', bullet: '#22c55e' },
  yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', bullet: '#eab308' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-500', bullet: '#a855f7' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-500', bullet: '#6366f1' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-500', bullet: '#f43f5e' },
  red: { bg: 'bg-red-50', text: 'text-red-500', bullet: '#ef4444' },
}

export function TestimonialsCarousel({ 
  testimonials, 
  title = 'What Pet Parents Say',
  subtitle = 'Real stories from happy customers',
  color = 'primary',
  className = ''
}: TestimonialsCarouselProps) {
  const colors = colorClasses[color] || colorClasses.primary
  const uniqueId = useId().replace(/:/g, '')

  // Double testimonials for better loop
  const allTestimonials = [...testimonials, ...testimonials]

  return (
    <section className={`py-16 md:py-24 ${colors.bg} ${className}`}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-dark mb-4">
            {title}
          </h2>
          <p className="text-gray-500 text-lg">{subtitle}</p>
        </motion.div>

        <div className="relative">
          {/* Navigation Buttons */}
          <div className="hidden md:flex justify-center gap-4 mb-8">
            <button 
              className={`testimonials-prev-${uniqueId} w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all hover:scale-110`}
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button 
              className={`testimonials-next-${uniqueId} w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all hover:scale-110`}
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2,
              slideShadows: false,
            }}
            navigation={{
              prevEl: `.testimonials-prev-${uniqueId}`,
              nextEl: `.testimonials-next-${uniqueId}`,
            }}
            pagination={{ 
              clickable: true, 
              dynamicBullets: true,
            }}
            autoplay={{ 
              delay: 5000, // 5 seconds - consistent with all carousels
              disableOnInteraction: false, 
              pauseOnMouseEnter: true 
            }}
            loop={true}
            speed={700}
            slidesPerView={1}
            spaceBetween={30}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="testimonials-swiper pb-14"
          >
            {allTestimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all h-full relative overflow-hidden"
                >
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4 opacity-10">
                    <Quote className="w-16 h-16 text-gray-400" />
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-600 mb-6 italic leading-relaxed line-clamp-4">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full overflow-hidden ring-4 ring-gray-100">
                        <Image 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          width={56} 
                          height={56} 
                          className="object-cover w-full h-full" 
                        />
                      </div>
                      {/* Verified Badge */}
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-dark">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.pet}</p>
                      <p className={`text-xs ${colors.text} flex items-center gap-1 mt-0.5`}>
                        <MapPin className="w-3 h-3" />
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Mobile swipe hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex md:hidden items-center justify-center gap-2 mt-4 text-gray-400"
          >
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.div>
            <span className="text-xs">Swipe for more</span>
            <motion.div
              animate={{ x: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronRight className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .testimonials-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #cbd5e1;
          opacity: 1;
          transition: all 0.3s ease;
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          background: ${colors.bullet};
          width: 30px;
          border-radius: 5px;
        }
        .testimonials-swiper .swiper-slide {
          height: auto;
        }
      `}</style>
    </section>
  )
}

export default TestimonialsCarousel


