'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'
import { 
  Home, Clock, MapPin, Star, Check, Phone, Calendar, 
  Shield, ArrowLeft, Heart, Camera, Moon, Utensils, X
} from 'lucide-react'
import { StatsBar } from '@/components/ui/AnimatedCounter'
import { TestimonialsCarousel } from '@/components/ui/TestimonialsCarousel'
import ServiceBookingModal from '@/components/ui/ServiceBookingModal'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

const features = [
  { icon: Home, title: 'Home Environment', desc: 'Cozy stay in a real home, not a kennel', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400' },
  { icon: Moon, title: '24/7 Supervision', desc: 'Round-the-clock care and attention', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400' },
  { icon: Heart, title: 'Daily Walks', desc: 'Multiple walks included each day', image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400' },
  { icon: Camera, title: 'Photo Updates', desc: 'Regular photos and videos', image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=400' },
  { icon: Utensils, title: 'Meals Included', desc: 'Premium food or bring your own', image: 'https://images.unsplash.com/photo-1558929996-da64ba858215?w=400' },
  { icon: Shield, title: 'Medication Admin', desc: 'We can give medications if needed', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400' },
]

const packages = [
  { name: 'Standard Boarding', price: '₹999', desc: 'Per night', popular: true, features: ['Overnight stay', '2 walks daily', 'Meals included', 'Photo updates'] },
  { name: 'Premium Suite', price: '₹1,499', desc: 'Per night', popular: false, features: ['Private room', '3 walks daily', 'Extra playtime', 'Video calls', 'Bedtime treats'] },
  { name: 'Weekly Stay', price: '₹5,999', desc: '7 nights (Save ₹994!)', popular: false, features: ['All premium features', 'Grooming included', 'Transport', 'Priority support'] },
]

const reviews = [
  { name: 'Arun Prakash', location: 'Chennai', pet: 'Oscar (German Shepherd)', rating: 5, text: 'Oscar was so happy and well-cared for during our vacation. The photos made us feel connected!', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
  { name: 'Lakshmi Devi', location: 'Trichy', pet: 'Muffin (Pomeranian)', rating: 5, text: 'Best boarding experience! Muffin was treated like family. Will definitely book again.', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
  { name: 'Suresh K.', location: 'Coimbatore', pet: 'Zeus (Rottweiler)', rating: 5, text: 'Professional and caring. Zeus came back happy and healthy after 2 weeks!', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
]

export default function DogBoardingPage() {
  const [selectedPackage, setSelectedPackage] = useState<typeof packages[0] | null>(null)
  const [showBooking, setShowBooking] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Parallax Hero */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1920" alt="Dog Boarding" fill className="object-cover scale-110" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-800/60 to-blue-900/80" />
        </motion.div>

        {/* Stars/Moon effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
              transition={{ duration: 2 + (i % 4) * 0.5, repeat: Infinity, delay: i * 0.2 }}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{ left: `${(i * 17 + 9) % 100}%`, top: `${(i * 11 + 6) % 50}%` }}
            />
          ))}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-20 right-20 text-yellow-200"
          >
            <Moon className="w-16 h-16 md:w-24 md:h-24" />
          </motion.div>
        </div>
        
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <Link href="/services" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Home className="w-10 h-10" />
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4">
            Dog Boarding
          </motion.h1>
          
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Overnight stays in a loving home environment while you're away
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowBooking(true)}
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl shadow-xl flex items-center gap-2">
              <Calendar className="w-5 h-5" /> Book Now
            </motion.button>
            <motion.a href="tel:+919876543210" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold rounded-2xl flex items-center gap-2">
              <Phone className="w-5 h-5" /> Call Us
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <StatsBar
        color="blue"
        stats={[
          { value: 500, suffix: '+', label: 'Happy Stays' },
          { value: 4.9, label: 'Rating' },
          { value: 100, suffix: '%', label: 'Safe Returns' },
          { value: 24, suffix: '/7', label: 'Care' },
        ]}
      />

      {/* Features Carousel */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-dark mb-4">What's Included</h2>
            <p className="text-gray-500 text-lg">Your dog will feel right at home</p>
          </motion.div>

          <Swiper modules={[Navigation, Pagination, Autoplay, EffectCoverflow]} effect="coverflow" grabCursor centeredSlides
            slidesPerView={1.2} coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 2, slideShadows: false }}
            pagination={{ clickable: true }} autoplay={{ delay: 3000 }}
            breakpoints={{ 640: { slidesPerView: 1.5 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 2.5 } }}
            className="pb-12">
            {features.map((feature, index) => (
              <SwiperSlide key={index}>
                <motion.div whileHover={{ y: -10 }} className="bg-white rounded-3xl shadow-lg overflow-hidden mx-2 my-4 group">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={feature.image} alt={feature.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                      <feature.icon className="w-6 h-6 text-blue-500" />
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
      <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-dark mb-4">Choose Your Stay</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: index * 0.1 }} whileHover={{ y: -10, scale: 1.02 }}
                className={`relative bg-white rounded-3xl shadow-lg overflow-hidden ${pkg.popular ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
                {pkg.popular && <div className="absolute top-0 left-0 right-0 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center text-sm font-bold">⭐ Most Popular</div>}
                <div className={`p-8 ${pkg.popular ? 'pt-12' : ''}`}>
                  <h3 className="font-heading font-bold text-2xl text-dark mb-2">{pkg.name}</h3>
                  <p className="text-gray-500 mb-4">{pkg.desc}</p>
                  <div className="mb-6"><span className="font-bold text-4xl text-blue-500">{pkg.price}</span></div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((f, i) => <li key={i} className="flex items-center gap-3 text-gray-600"><Check className="w-5 h-5 text-green-500" />{f}</li>)}
                  </ul>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setSelectedPackage(pkg)}
                    className={`w-full py-4 rounded-xl font-bold ${pkg.popular ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
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
        subtitle="Trusted overnight care for your furry family"
        color="blue" 
      />

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4">Planning a Trip?</h2>
            <p className="text-white/90 text-lg mb-8">Book your dog's vacation stay today!</p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowBooking(true)}
              className="px-10 py-4 bg-white text-blue-600 font-bold rounded-2xl shadow-xl">
              <Calendar className="w-5 h-5 inline mr-2" /> Book Now
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Modals */}
      <AnimatePresence>
        {selectedPackage && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedPackage(null)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl z-50">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-t-3xl flex justify-between items-center">
                <h3 className="font-heading font-bold text-2xl">{selectedPackage.name}</h3>
                <button onClick={() => setSelectedPackage(null)} className="p-2 hover:bg-white/20 rounded-full"><X className="w-6 h-6" /></button>
              </div>
              <div className="p-6">
                <div className="text-center mb-6"><span className="font-bold text-4xl text-dark">{selectedPackage.price}</span></div>
                <ul className="space-y-3 mb-6">{selectedPackage.features.map((f, i) => <li key={i} className="flex items-center gap-3"><Check className="w-5 h-5 text-green-500" />{f}</li>)}</ul>
                <button onClick={() => { setSelectedPackage(null); setShowBooking(true) }} className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl">Book This Package</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBooking && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowBooking(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-3xl shadow-2xl z-50 max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 flex justify-between items-center">
                <h3 className="font-heading font-bold text-xl">Book Boarding</h3>
                <button onClick={() => setShowBooking(false)} className="p-2 hover:bg-white/20 rounded-full"><X className="w-6 h-6" /></button>
              </div>
              <div className="p-6 space-y-4">
                <input type="text" placeholder="Your Name *" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                <input type="tel" placeholder="Mobile Number *" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                <input type="text" placeholder="Dog's Name *" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-sm text-gray-600">Check-in</label><input type="date" className="w-full px-4 py-3 border border-gray-200 rounded-xl" /></div>
                  <div><label className="text-sm text-gray-600">Check-out</label><input type="date" className="w-full px-4 py-3 border border-gray-200 rounded-xl" /></div>
                </div>
                <textarea rows={3} placeholder="Special requirements..." className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                <button className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl">Submit Booking</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`.swiper-pagination-bullet-active { background: #3b82f6; width: 30px; border-radius: 5px; }`}</style>
    </div>
  )
}
