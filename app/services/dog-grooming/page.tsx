'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { 
  Scissors, Star, Check, Phone, Calendar, Shield, ArrowLeft, Droplets, Sparkles, Wind, X, MapPin
} from 'lucide-react'
import { StatsBar } from '@/components/ui/AnimatedCounter'
import { TestimonialsCarousel } from '@/components/ui/TestimonialsCarousel'
import ServiceBookingModal from '@/components/ui/ServiceBookingModal'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const features = [
  { icon: Droplets, title: 'Bath & Blow-dry', desc: 'Premium shampoo and conditioning', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400' },
  { icon: Scissors, title: 'Breed-specific Cuts', desc: 'Professional styling for all breeds', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400' },
  { icon: Sparkles, title: 'Nail Trimming', desc: 'Careful nail care and filing', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400' },
  { icon: Wind, title: 'Ear Cleaning', desc: 'Gentle ear cleaning and check', image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=400' },
  { icon: Sparkles, title: 'Teeth Brushing', desc: 'Dental hygiene care', image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400' },
  { icon: Shield, title: 'De-shedding', desc: 'Reduce shedding by up to 90%', image: 'https://images.unsplash.com/photo-1558929996-da64ba858215?w=400' },
]

const packages = [
  { name: 'Basic Bath', price: '₹499', desc: 'Bath, dry, brush & nail trim', popular: false, features: ['Bath & dry', 'Brushing', 'Nail trim', 'Ear cleaning'] },
  { name: 'Full Grooming', price: '₹699', desc: 'Bath + haircut + full service', popular: true, features: ['Everything in Basic', 'Haircut/styling', 'Teeth brushing', 'Cologne spray'] },
  { name: 'Luxury Spa', price: '₹999', desc: 'Full groom + spa treatments', popular: false, features: ['Everything in Full', 'Deep conditioning', 'Paw massage', 'Premium products', 'Bandana'] },
]

const reviews = [
  { name: 'Sneha Reddy', location: 'Chennai', pet: 'Simba (Golden)', rating: 5, text: 'Simba looks like a show dog after every grooming! Amazing work!', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
  { name: 'Mohan Das', location: 'Salem', pet: 'Cookie (Poodle)', rating: 5, text: 'The groomers are so patient with Cookie. She actually enjoys her spa days now!', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
  { name: 'Priyanka S.', location: 'Madurai', pet: 'Thor (Husky)', rating: 5, text: 'Thor\'s de-shedding treatment has saved our furniture! Highly recommend.', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
]

const beforeAfter = [
  { before: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400', after: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400' },
  { before: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=400', after: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400' },
  { before: 'https://images.unsplash.com/photo-1558929996-da64ba858215?w=400', after: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400' },
]

export default function DogGroomingPage() {
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
          <Image src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=1920" alt="Dog Grooming" fill className="object-cover scale-110" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-pink-900/70 via-pink-800/60 to-pink-900/80" />
        </motion.div>

        {/* Sparkle effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div key={i}
              animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              className="absolute"
              style={{ left: `${(i * 19 + 11) % 100}%`, top: `${(i * 31 + 5) % 100}%` }}>
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>
          ))}
        </div>
        
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <Link href="/services" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Scissors className="w-10 h-10" />
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4">
            Dog Grooming
          </motion.h1>
          
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Professional grooming to keep your dog looking and feeling their best
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowBooking(true)}
              className="px-8 py-4 bg-white text-pink-600 font-bold rounded-2xl shadow-xl flex items-center gap-2">
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
        color="pink"
        stats={[
          { value: 3000, suffix: '+', label: 'Dogs Groomed' },
          { value: 4.9, label: 'Rating' },
          { value: 15, suffix: '+', label: 'Expert Groomers' },
          { value: 100, suffix: '%', label: 'Happy Pups' },
        ]}
      />

      {/* Services Carousel */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-dark mb-4">Our Grooming Services</h2>
            <p className="text-gray-500 text-lg">From basic baths to luxury spa treatments</p>
          </motion.div>

          <Swiper modules={[Navigation, Pagination, Autoplay]} pagination={{ clickable: true }} autoplay={{ delay: 3000 }}
            slidesPerView={1} spaceBetween={20} breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }} className="pb-12">
            {features.map((feature, index) => (
              <SwiperSlide key={index}>
                <motion.div whileHover={{ y: -10 }} className="bg-white rounded-3xl shadow-lg overflow-hidden h-full group">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={feature.image} alt={feature.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                      <feature.icon className="w-6 h-6 text-pink-500" />
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

      {/* Before/After Gallery */}
      <section className="py-16 md:py-24 bg-pink-50">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-dark mb-4">Transformations ✨</h2>
            <p className="text-gray-500 text-lg">See the amazing before & after results</p>
          </motion.div>

          <Swiper modules={[Autoplay]} autoplay={{ delay: 3000 }} slidesPerView={1} spaceBetween={20}
            breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}>
            {beforeAfter.map((item, i) => (
              <SwiperSlide key={i}>
                <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-3xl overflow-hidden shadow-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <div className="relative aspect-square rounded-2xl overflow-hidden">
                        <Image src={item.before} alt="Before" fill className="object-cover" />
                      </div>
                      <span className="absolute bottom-2 left-2 bg-gray-900/80 text-white text-xs px-2 py-1 rounded-full">Before</span>
                    </div>
                    <div className="relative">
                      <div className="relative aspect-square rounded-2xl overflow-hidden">
                        <Image src={item.after} alt="After" fill className="object-cover" />
                      </div>
                      <span className="absolute bottom-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">After ✨</span>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-dark mb-4">Grooming Packages</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: index * 0.1 }} whileHover={{ y: -10, scale: 1.02 }}
                className={`relative bg-white rounded-3xl shadow-lg overflow-hidden ${pkg.popular ? 'ring-2 ring-pink-500 scale-105' : ''}`}>
                {pkg.popular && <div className="absolute top-0 left-0 right-0 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white text-center text-sm font-bold">⭐ Most Popular</div>}
                <div className={`p-8 ${pkg.popular ? 'pt-12' : ''}`}>
                  <h3 className="font-heading font-bold text-2xl text-dark mb-2">{pkg.name}</h3>
                  <p className="text-gray-500 mb-4">{pkg.desc}</p>
                  <div className="mb-6"><span className="font-bold text-4xl text-pink-500">{pkg.price}</span></div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((f, i) => <li key={i} className="flex items-center gap-3 text-gray-600"><Check className="w-5 h-5 text-green-500" />{f}</li>)}
                  </ul>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setSelectedPackage(pkg)}
                    className={`w-full py-4 rounded-xl font-bold ${pkg.popular ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
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
        title="Happy Clients" 
        subtitle="See the beautiful transformations"
        color="pink" 
      />

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-pink-600 to-pink-500 text-white">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4">Pamper Your Pup Today!</h2>
            <p className="text-white/90 text-lg mb-8">Book a grooming session and see the transformation</p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowBooking(true)}
              className="px-10 py-4 bg-white text-pink-600 font-bold rounded-2xl shadow-xl">
              <Calendar className="w-5 h-5 inline mr-2" /> Book Grooming
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
              <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-6 rounded-t-3xl flex justify-between items-center">
                <h3 className="font-heading font-bold text-2xl">{selectedPackage.name}</h3>
                <button onClick={() => setSelectedPackage(null)} className="p-2 hover:bg-white/20 rounded-full"><X className="w-6 h-6" /></button>
              </div>
              <div className="p-6">
                <div className="text-center mb-6"><span className="font-bold text-4xl text-dark">{selectedPackage.price}</span></div>
                <ul className="space-y-3 mb-6">{selectedPackage.features.map((f, i) => <li key={i} className="flex items-center gap-3"><Check className="w-5 h-5 text-green-500" />{f}</li>)}</ul>
                <button onClick={() => { setSelectedPackage(null); setShowBooking(true) }} className="w-full py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold rounded-xl">Book This Package</button>
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
              <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-6 flex justify-between items-center">
                <h3 className="font-heading font-bold text-xl">Book Grooming</h3>
                <button onClick={() => setShowBooking(false)} className="p-2 hover:bg-white/20 rounded-full"><X className="w-6 h-6" /></button>
              </div>
              <div className="p-6 space-y-4">
                <input type="text" placeholder="Your Name *" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                <input type="tel" placeholder="Mobile Number *" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                <input type="text" placeholder="Dog's Name & Breed *" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                <input type="date" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl">
                  <option>Basic Bath - ₹499</option>
                  <option>Full Grooming - ₹699</option>
                  <option>Luxury Spa - ₹999</option>
                </select>
                <textarea rows={3} placeholder="Special requests..." className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                <button className="w-full py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold rounded-xl">Submit Booking</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`.swiper-pagination-bullet-active { background: #ec4899; width: 30px; border-radius: 5px; }`}</style>
    </div>
  )
}
