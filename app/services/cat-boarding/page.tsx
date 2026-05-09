'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import { 
  Home, Star, Phone, Calendar, Shield, ArrowLeft, Eye, Play, Utensils, Volume2, Check, X, MapPin
} from 'lucide-react'
import { StatsBar } from '@/components/ui/AnimatedCounter'
import { TestimonialsCarousel } from '@/components/ui/TestimonialsCarousel'
import ServiceBookingModal from '@/components/ui/ServiceBookingModal'

import 'swiper/css'
import 'swiper/css/pagination'

const features = [
  { icon: Home, title: 'Private Suites', desc: 'Your cat\'s own cozy space', image: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400' },
  { icon: Volume2, title: 'Cat-Only Facility', desc: 'No dogs, peaceful environment', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400' },
  { icon: Play, title: 'Climbing Structures', desc: 'Vertical play spaces', image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400' },
  { icon: Eye, title: 'Webcam Viewing', desc: 'Watch your cat anytime', image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400' },
  { icon: Utensils, title: 'Special Diets', desc: 'We accommodate all diets', image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400' },
  { icon: Shield, title: 'Daily Play Sessions', desc: 'Interactive playtime included', image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400' },
]

const packages = [
  { name: 'Standard Suite', price: '₹799', desc: 'Per night', popular: true, features: ['Private room', 'Daily play', 'Fresh meals', 'Litter service'] },
  { name: 'Deluxe Suite', price: '₹1,099', desc: 'Per night', popular: false, features: ['Larger space', 'Extra play time', 'Window view', 'Webcam access', 'Premium food'] },
  { name: 'Weekly Stay', price: '₹4,999', desc: '7 nights (Save ₹594!)', popular: false, features: ['All deluxe features', 'Grooming included', 'Photo diary', 'VIP treatment'] },
]

const reviews = [
  { name: 'Shalini M.', location: 'Chennai', pet: 'Mochi', rating: 5, text: 'Mochi was so relaxed here! The cat-only environment made all the difference.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
  { name: 'Ravi K.', location: 'Madurai', pet: 'Shadow', rating: 5, text: 'Loved watching Shadow on the webcam! He was playing and enjoying himself.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
  { name: 'Meera S.', location: 'Coimbatore', pet: 'Cleo', rating: 5, text: 'The climbing structures were a hit! Cleo didn\'t want to leave.', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
]

export default function CatBoardingPage() {
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
          <Image src="https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=1920" alt="Cat Boarding" fill className="object-cover scale-110" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/70 via-indigo-800/60 to-indigo-900/80" />
        </motion.div>
        
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <Link href="/services" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Home className="w-10 h-10" />
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4">
            Cat Boarding
          </motion.h1>
          
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Safe, comfortable boarding in a peaceful, cat-only environment
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowBooking(true)}
              className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-2xl shadow-xl flex items-center gap-2">
              <Calendar className="w-5 h-5" /> Book Stay
            </motion.button>
            <motion.a href="tel:+919876543210" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold rounded-2xl flex items-center gap-2">
              <Phone className="w-5 h-5" /> Call Us
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      <StatsBar
        color="indigo"
        stats={[
          { value: 250, suffix: '+', label: 'Happy Stays' },
          { value: 4.9, label: 'Rating' },
          { value: 100, suffix: '%', label: 'Cat-Only' },
          { value: 24, suffix: '/7', label: 'Webcam' },
        ]}
      />

      <section className="py-16 md:py-24">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-dark mb-4">Our Facilities</h2>
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
                      <feature.icon className="w-6 h-6 text-indigo-500" />
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

      <section className="py-16 md:py-24 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-dark mb-4">Boarding Packages</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: index * 0.1 }} whileHover={{ y: -10, scale: 1.02 }}
                className={`relative bg-white rounded-3xl shadow-lg overflow-hidden ${pkg.popular ? 'ring-2 ring-indigo-500 scale-105' : ''}`}>
                {pkg.popular && <div className="absolute top-0 left-0 right-0 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-center text-sm font-bold">⭐ Most Popular</div>}
                <div className={`p-8 ${pkg.popular ? 'pt-12' : ''}`}>
                  <h3 className="font-heading font-bold text-2xl text-dark mb-2">{pkg.name}</h3>
                  <p className="text-gray-500 mb-4">{pkg.desc}</p>
                  <div className="mb-6"><span className="font-bold text-4xl text-indigo-500">{pkg.price}</span></div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((f, i) => <li key={i} className="flex items-center gap-3 text-gray-600"><Check className="w-5 h-5 text-green-500" />{f}</li>)}
                  </ul>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setSelectedPackage(pkg)}
                    className={`w-full py-4 rounded-xl font-bold ${pkg.popular ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
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
        title="Happy Cat Parents" 
        subtitle="Peaceful stays, happy cats"
        color="indigo" 
      />

      <section className="py-16 md:py-24 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4">Book Your Cat's Stay</h2>
            <p className="text-white/90 text-lg mb-8">A peaceful vacation for your feline friend!</p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowBooking(true)}
              className="px-10 py-4 bg-white text-indigo-600 font-bold rounded-2xl shadow-xl">
              <Calendar className="w-5 h-5 inline mr-2" /> Book Now
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
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-6 rounded-t-3xl flex justify-between items-center">
                <h3 className="font-heading font-bold text-2xl">{selectedPackage.name}</h3>
                <button onClick={() => setSelectedPackage(null)} className="p-2 hover:bg-white/20 rounded-full"><X className="w-6 h-6" /></button>
              </div>
              <div className="p-6">
                <div className="text-center mb-6"><span className="font-bold text-4xl text-dark">{selectedPackage.price}</span></div>
                <ul className="space-y-3 mb-6">{selectedPackage.features.map((f, i) => <li key={i} className="flex items-center gap-3"><Check className="w-5 h-5 text-green-500" />{f}</li>)}</ul>
                <button onClick={() => { setSelectedPackage(null); setShowBooking(true) }} className="w-full py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-bold rounded-xl">Book This Package</button>
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
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-6 flex justify-between items-center">
                <h3 className="font-heading font-bold text-xl">Book Cat Boarding</h3>
                <button onClick={() => setShowBooking(false)} className="p-2 hover:bg-white/20 rounded-full"><X className="w-6 h-6" /></button>
              </div>
              <div className="p-6 space-y-4">
                <input type="text" placeholder="Your Name *" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                <input type="tel" placeholder="Mobile Number *" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                <input type="text" placeholder="Cat's Name & Breed *" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-sm text-gray-600">Check-in</label><input type="date" className="w-full px-4 py-3 border border-gray-200 rounded-xl" /></div>
                  <div><label className="text-sm text-gray-600">Check-out</label><input type="date" className="w-full px-4 py-3 border border-gray-200 rounded-xl" /></div>
                </div>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl">
                  <option>Standard Suite - ₹799/night</option>
                  <option>Deluxe Suite - ₹1,099/night</option>
                  <option>Weekly Stay - ₹4,999</option>
                </select>
                <textarea rows={3} placeholder="Special requirements, diet, medications..." className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                <button className="w-full py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-bold rounded-xl">Submit Booking</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`.swiper-pagination-bullet-active { background: #6366f1; width: 30px; border-radius: 5px; }`}</style>
    </div>
  )
}
