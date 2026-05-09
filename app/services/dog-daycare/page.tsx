'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCards } from 'swiper/modules'
import { 
  Sun, Clock, MapPin, Star, Check, Phone, Calendar, 
  Shield, ArrowLeft, Users, Play, Coffee, Eye, X, ChevronLeft, ChevronRight
} from 'lucide-react'
import { StatsBar } from '@/components/ui/AnimatedCounter'
import { TestimonialsCarousel } from '@/components/ui/TestimonialsCarousel'
import ServiceBookingModal from '@/components/ui/ServiceBookingModal'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-cards'

const features = [
  { icon: Users, title: 'Supervised Play', desc: 'Trained staff monitors all activities', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400' },
  { icon: Play, title: 'Indoor/Outdoor Areas', desc: 'Safe spaces for all weather', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400' },
  { icon: Coffee, title: 'Rest Periods', desc: 'Scheduled nap times for recharge', image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=400' },
  { icon: Eye, title: 'Webcam Access', desc: 'Watch your pup anytime', image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400' },
  { icon: Shield, title: 'Size Groups', desc: 'Dogs grouped by size & temperament', image: 'https://images.unsplash.com/photo-1558929996-da64ba858215?w=400' },
  { icon: Sun, title: 'Enrichment Activities', desc: 'Mental stimulation games', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400' },
]

const packages = [
  { name: 'Half Day', price: '₹399', desc: 'Up to 5 hours', popular: false, features: ['5 hours care', 'Group play', 'Snack provided'] },
  { name: 'Full Day', price: '₹599', desc: 'Up to 10 hours', popular: true, features: ['10 hours care', 'Lunch included', 'Webcam access', 'Report card'] },
  { name: 'Monthly Pass', price: '₹9,999', desc: '20 full days', popular: false, features: ['20 full days', 'Priority booking', 'Free transport', 'Grooming discount'] },
]

const reviews = [
  { name: 'Deepa Sundar', location: 'Chennai', pet: 'Buddy (Beagle)', rating: 5, text: 'Buddy has made so many friends at daycare! He sleeps so well after a day of play.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
  { name: 'Ravi Kumar', location: 'Madurai', pet: 'Lucy (Shih Tzu)', rating: 5, text: 'The webcam feature is amazing - I can check on Lucy anytime during work!', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
  { name: 'Meera Nair', location: 'Coimbatore', pet: 'Duke (Husky)', rating: 5, text: 'Professional staff and clean facility. Duke loves going there!', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
]

export default function DogDaycarePage() {
  const [selectedPackage, setSelectedPackage] = useState<typeof packages[0] | null>(null)
  const [showBooking, setShowBooking] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Parallax Hero */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1920"
            alt="Dog Daycare"
            fill
            className="object-cover scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-orange-900/70 via-orange-800/60 to-orange-900/80" />
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [-10, 10], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3 + i, repeat: Infinity, repeatType: 'reverse' }}
              className="absolute text-white/20"
              style={{ left: `${10 + i * 12}%`, top: `${20 + (i % 3) * 20}%` }}
            >
              <Sun className="w-8 h-8 md:w-12 md:h-12" />
            </motion.div>
          ))}
        </div>
        
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <Link href="/services" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
          
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6"
          >
            <Sun className="w-10 h-10" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4"
          >
            Dog Daycare
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8"
          >
            A fun-filled day of play, socialization, and rest for your furry friend
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowBooking(true)}
              className="px-8 py-4 bg-white text-orange-600 font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Book Now
            </motion.button>
            <motion.a
              href="tel:+919876543210"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold rounded-2xl hover:bg-white/30 transition-all flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Us
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <StatsBar
        color="orange"
        stats={[
          { value: 10000, suffix: '+', label: 'Days of Fun' },
          { value: 4.9, label: 'Average Rating' },
          { value: 500, suffix: '+', label: 'Happy Dogs' },
          { value: 24, suffix: '/7', label: 'Webcam Access' },
        ]}
      />

      {/* Features Carousel */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-dark mb-4">
              What We Offer
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Everything your dog needs for a perfect day
            </p>
          </motion.div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="features-carousel pb-12"
          >
            {features.map((feature, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  whileHover={{ y: -10, rotateY: 5 }}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden h-full group"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                        <feature.icon className="w-6 h-6 text-orange-500" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading font-bold text-xl text-dark mb-2">{feature.title}</h3>
                    <p className="text-gray-500">{feature.desc}</p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-orange-50 to-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-dark mb-4">
              Choose Your Plan
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative bg-white rounded-3xl shadow-lg overflow-hidden ${
                  pkg.popular ? 'ring-2 ring-orange-500 scale-105' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-0 right-0 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center text-sm font-bold">
                    ⭐ Most Popular
                  </div>
                )}
                <div className={`p-8 ${pkg.popular ? 'pt-12' : ''}`}>
                  <h3 className="font-heading font-bold text-2xl text-dark mb-2">{pkg.name}</h3>
                  <p className="text-gray-500 mb-4">{pkg.desc}</p>
                  <div className="mb-6">
                    <span className="font-bold text-4xl text-orange-500">{pkg.price}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-600">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`w-full py-4 rounded-xl font-bold transition-all ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Select Package
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <TestimonialsCarousel 
        testimonials={reviews} 
        title="Happy Pet Parents" 
        subtitle="See why dogs love our daycare"
        color="orange" 
      />

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
              Ready for a Trial Day?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Book a trial day and see why dogs love our daycare!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowBooking(true)}
              className="px-10 py-4 bg-white text-orange-600 font-bold rounded-2xl shadow-xl"
            >
              <Calendar className="w-5 h-5 inline mr-2" />
              Book Trial Day
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Modals */}
      <AnimatePresence>
        {selectedPackage && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPackage(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl z-50"
            >
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-2xl">{selectedPackage.name}</h3>
                  <button onClick={() => setSelectedPackage(null)} className="p-2 hover:bg-white/20 rounded-full">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="text-center mb-6">
                  <span className="font-bold text-4xl text-dark">{selectedPackage.price}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {selectedPackage.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3"><Check className="w-5 h-5 text-green-500" />{f}</li>
                  ))}
                </ul>
                <button
                  onClick={() => { setSelectedPackage(null); setShowBooking(true) }}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl"
                >
                  Book This Package
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBooking && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBooking(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-3xl shadow-2xl z-50 max-h-[90vh] overflow-y-auto"
            >
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-xl">Book Daycare</h3>
                  <button onClick={() => setShowBooking(false)} className="p-2 hover:bg-white/20 rounded-full">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <input type="text" placeholder="Your Name *" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                <input type="tel" placeholder="Mobile Number *" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                <input type="text" placeholder="Dog's Name *" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                <input type="date" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl">
                  <option>Half Day (Morning)</option>
                  <option>Half Day (Afternoon)</option>
                  <option>Full Day</option>
                </select>
                <textarea rows={3} placeholder="Special requirements..." className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                <button className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl">
                  Submit Booking
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .features-carousel .swiper-pagination-bullet-active {
          background: #f97316;
          width: 30px;
          border-radius: 5px;
        }
      `}</style>
    </div>
  )
}
