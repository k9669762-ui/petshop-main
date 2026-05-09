'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import { 
  Heart, Star, Phone, Calendar, Shield, ArrowLeft, Home, Mail, Flower2, Lock, Check, X, MapPin
} from 'lucide-react'
import { StatsBar } from '@/components/ui/AnimatedCounter'
import { TestimonialsCarousel } from '@/components/ui/TestimonialsCarousel'
import ServiceBookingModal from '@/components/ui/ServiceBookingModal'

import 'swiper/css'
import 'swiper/css/pagination'

const features = [
  { icon: Home, title: 'In Your Home', desc: 'Your pet stays comfortable at home', image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=400' },
  { icon: Heart, title: 'Multiple Daily Visits', desc: 'Regular check-ins throughout the day', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400' },
  { icon: Mail, title: 'Mail Collection', desc: 'We collect your mail and packages', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400' },
  { icon: Flower2, title: 'Plant Watering', desc: 'Keep your plants healthy too', image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400' },
  { icon: Lock, title: 'Security Presence', desc: 'Home looks lived-in while you\'re away', image: 'https://images.unsplash.com/photo-1558929996-da64ba858215?w=400' },
  { icon: Shield, title: 'Daily Updates', desc: 'Photos and reports every day', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400' },
]

const packages = [
  { name: '2 Visits/Day', price: '₹799', desc: 'Morning & evening', popular: true, features: ['2 visits daily', 'Feeding & water', 'Walks (dogs)', 'Photo updates', 'Mail collection'] },
  { name: '3 Visits/Day', price: '₹999', desc: 'Morning, noon & evening', popular: false, features: ['3 visits daily', 'All basic services', 'Extra playtime', 'Plant watering', 'Video updates'] },
  { name: 'Overnight Stay', price: '₹1,499', desc: 'Sitter stays overnight', popular: false, features: ['Overnight presence', '24/7 care', 'All services', 'Security presence', 'Emergency ready'] },
]

const reviews = [
  { name: 'Suresh B.', location: 'Chennai', pet: 'Max & Bella', rating: 5, text: 'With two pets, this service was a lifesaver! They stayed happy at home while we vacationed.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
  { name: 'Kavitha R.', location: 'Madurai', pet: 'Simba', rating: 5, text: 'The overnight option gave me so much peace of mind. Simba was never alone!', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
  { name: 'Raj K.', location: 'Coimbatore', pet: 'Rocky', rating: 5, text: 'Professional service! They even watered my plants and collected my mail.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
]

export default function PetSittingPage() {
  const [selectedPackage, setSelectedPackage] = useState<typeof packages[0] | null>(null)
  const [showBooking, setShowBooking] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <section ref={heroRef} className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=1920" alt="Pet Sitting" fill className="object-cover scale-110" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/70 via-red-800/60 to-red-900/80" />
        </motion.div>

        {/* Floating Hearts */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div key={i}
              animate={{ y: [0, -30, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity }}
              className="absolute text-white/30"
              style={{ left: `${10 + i * 10}%`, top: `${20 + (i % 3) * 20}%` }}>
              <Heart className="w-6 h-6" />
            </motion.div>
          ))}
        </div>
        
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <Link href="/services" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10" />
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4">
            Pet Sitting
          </motion.h1>
          
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
            In-home care while you're away - your pet stays in their comfort zone
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowBooking(true)}
              className="px-8 py-4 bg-white text-red-600 font-bold rounded-2xl shadow-xl flex items-center gap-2">
              <Calendar className="w-5 h-5" /> Book Now
            </motion.button>
            <motion.a href="tel:+919876543210" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold rounded-2xl flex items-center gap-2">
              <Phone className="w-5 h-5" /> Call Us
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      <StatsBar
        color="red"
        stats={[
          { value: 3000, suffix: '+', label: 'Sitting Days' },
          { value: 4.9, label: 'Rating' },
          { value: 500, suffix: '+', label: 'Happy Pets' },
          { value: 100, suffix: '%', label: 'Reliable' },
        ]}
      />

      <section className="py-16 md:py-24">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-dark mb-4">What We Offer</h2>
          </motion.div>

          <Swiper modules={[Pagination, Autoplay]} pagination={{ clickable: true }} autoplay={{ delay: 3000 }}
            slidesPerView={1} spaceBetween={20} breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }} className="pb-12">
            {features.map((feature, index) => (
              <SwiperSlide key={index}>
                <motion.div whileHover={{ y: -10 }} className="bg-white rounded-3xl shadow-lg overflow-hidden h-full group">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={feature.image} alt={feature.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                      <feature.icon className="w-6 h-6 text-red-500" />
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

      <section className="py-16 md:py-24 bg-gradient-to-b from-red-50 to-white">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-dark mb-4">Sitting Packages</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: index * 0.1 }} whileHover={{ y: -10, scale: 1.02 }}
                className={`relative bg-white rounded-3xl shadow-lg overflow-hidden ${pkg.popular ? 'ring-2 ring-red-500 scale-105' : ''}`}>
                {pkg.popular && <div className="absolute top-0 left-0 right-0 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-center text-sm font-bold">⭐ Most Popular</div>}
                <div className={`p-8 ${pkg.popular ? 'pt-12' : ''}`}>
                  <h3 className="font-heading font-bold text-2xl text-dark mb-2">{pkg.name}</h3>
                  <p className="text-gray-500 mb-4">{pkg.desc}</p>
                  <div className="mb-6"><span className="font-bold text-4xl text-red-500">{pkg.price}</span><span className="text-gray-400">/day</span></div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((f, i) => <li key={i} className="flex items-center gap-3 text-gray-600"><Check className="w-5 h-5 text-green-500" />{f}</li>)}
                  </ul>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setSelectedPackage(pkg)}
                    className={`w-full py-4 rounded-xl font-bold ${pkg.popular ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                    Select Package
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsCarousel 
        testimonials={reviews} 
        title="Happy Pet Parents" 
        subtitle="Trusted in-home care for your furry friends"
        color="red" 
      />

      <section className="py-16 md:py-24 bg-gradient-to-r from-red-600 to-red-500 text-white">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4">Going on a Trip?</h2>
            <p className="text-white/90 text-lg mb-8">Let us take care of your pet at home!</p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowBooking(true)}
              className="px-10 py-4 bg-white text-red-600 font-bold rounded-2xl shadow-xl">
              <Heart className="w-5 h-5 inline mr-2" /> Book Pet Sitting
            </motion.button>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedPackage && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedPackage(null)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl z-50">
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-t-3xl flex justify-between items-center">
                <h3 className="font-heading font-bold text-2xl">{selectedPackage.name}</h3>
                <button onClick={() => setSelectedPackage(null)} className="p-2 hover:bg-white/20 rounded-full"><X className="w-6 h-6" /></button>
              </div>
              <div className="p-6">
                <div className="text-center mb-6"><span className="font-bold text-4xl text-dark">{selectedPackage.price}</span><span className="text-gray-400">/day</span></div>
                <ul className="space-y-3 mb-6">{selectedPackage.features.map((f, i) => <li key={i} className="flex items-center gap-3"><Check className="w-5 h-5 text-green-500" />{f}</li>)}</ul>
                <button onClick={() => { setSelectedPackage(null); setShowBooking(true) }} className="w-full py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-xl">Book This Package</button>
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
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 flex justify-between items-center">
                <h3 className="font-heading font-bold text-xl">Book Pet Sitting</h3>
                <button onClick={() => setShowBooking(false)} className="p-2 hover:bg-white/20 rounded-full"><X className="w-6 h-6" /></button>
              </div>
              <div className="p-6 space-y-4">
                <input type="text" placeholder="Your Name *" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                <input type="tel" placeholder="Mobile Number *" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                <input type="text" placeholder="Pet Details (Name, Type, Breed) *" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                <input type="text" placeholder="Your Address *" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-sm text-gray-600">Start Date</label><input type="date" className="w-full px-4 py-3 border border-gray-200 rounded-xl" /></div>
                  <div><label className="text-sm text-gray-600">End Date</label><input type="date" className="w-full px-4 py-3 border border-gray-200 rounded-xl" /></div>
                </div>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl">
                  <option>2 Visits/Day - ₹799/day</option>
                  <option>3 Visits/Day - ₹999/day</option>
                  <option>Overnight Stay - ₹1,499/day</option>
                </select>
                <textarea rows={3} placeholder="Special instructions, feeding schedule, medications..." className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                <button className="w-full py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-xl">Submit Booking</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`.swiper-pagination-bullet-active { background: #ef4444; width: 30px; border-radius: 5px; }`}</style>
    </div>
  )
}
