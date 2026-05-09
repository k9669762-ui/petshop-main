'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'
import { 
  PawPrint, Clock, MapPin, Star, Check, Phone, Calendar, 
  Shield, ArrowLeft, Users, Zap, Navigation as NavIcon, Camera,
  X, ChevronLeft, ChevronRight, Heart, Award
} from 'lucide-react'
import { StatsBar } from '@/components/ui/AnimatedCounter'
import { TestimonialsCarousel } from '@/components/ui/TestimonialsCarousel'
import ServiceBookingModal from '@/components/ui/ServiceBookingModal'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

const features = [
  { icon: NavIcon, title: 'GPS Live Tracking', desc: 'Follow your dog\'s walk in real-time on the app', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400' },
  { icon: Camera, title: 'Photo Updates', desc: 'Receive photos and videos during and after walks', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400' },
  { icon: Clock, title: 'Flexible Scheduling', desc: 'Book recurring or one-time walks anytime', image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=400' },
  { icon: Shield, title: 'Certified Walkers', desc: 'Background-checked, trained professionals', image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400' },
  { icon: Users, title: 'Solo or Group Walks', desc: 'Choose based on your dog\'s preference', image: 'https://images.unsplash.com/photo-1558929996-da64ba858215?w=400' },
  { icon: Zap, title: 'Potty Break Reports', desc: 'Detailed activity updates after each walk', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400' },
]

const packages = [
  { name: '30 Min Walk', price: '₹299', desc: 'Quick potty break & stretch', popular: false, features: ['Basic walk', 'Potty break', 'Water provided'] },
  { name: '45 Min Walk', price: '₹399', desc: 'Standard exercise walk', popular: true, features: ['Extended walk', 'Play time', 'Photo updates', 'GPS tracking'] },
  { name: '60 Min Adventure', price: '₹499', desc: 'Extended exploration walk', popular: false, features: ['Long adventure', 'Multiple stops', 'Video updates', 'Treats included'] },
]

const reviews = [
  { name: 'Priya Krishnan', location: 'Chennai', pet: 'Max (Golden Retriever)', rating: 5, text: 'Max loves his daily walks! The GPS tracking gives me peace of mind at work.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
  { name: 'Vijay Moorthy', location: 'Coimbatore', pet: 'Bruno (Labrador)', rating: 5, text: 'Professional and reliable. Bruno gets so excited when the walker arrives!', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
  { name: 'Anitha Rajan', location: 'Madurai', pet: 'Rocky (Beagle)', rating: 5, text: 'The photo updates are adorable. Best service for busy pet parents!', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
  { name: 'Karthik Selvam', location: 'Tiruchirappalli', pet: 'Charlie (Pug)', rating: 5, text: 'Charlie has lost weight and is so much happier with regular walks. Thank you!', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
]

const gallery = [
  'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600',
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600',
  'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600',
  'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=600',
  'https://images.unsplash.com/photo-1558929996-da64ba858215?w=600',
]

export default function DogWalkingPage() {
  const [selectedPackage, setSelectedPackage] = useState<typeof packages[0] | null>(null)
  const [showBooking, setShowBooking] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Parallax Hero */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1920"
            alt="Dog Walking"
            fill
            className="object-cover scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/70 via-primary-800/60 to-primary-900/80" />
        </motion.div>

        {/* Floating Paw Prints */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [-20, -100],
                opacity: [0, 0.3, 0],
                rotate: [0, 360]
              }}
              transition={{
                duration: 4 + (i % 4) * 0.5,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              className="absolute text-white"
              style={{ left: `${10 + i * 10}%`, bottom: '20%' }}
            >
              <PawPrint className="w-6 h-6 md:w-8 md:h-8" />
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
            <PawPrint className="w-10 h-10" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4"
          >
            Dog Walking
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8"
          >
            Daily walks to keep your furry friend healthy, happy, and well-exercised
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
              className="px-8 py-4 bg-white text-primary-600 font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
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

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-3 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <StatsBar
        color="primary"
        stats={[
          { value: 5000, suffix: '+', label: 'Walks Completed' },
          { value: 4.9, label: 'Average Rating' },
          { value: 200, suffix: '+', label: 'Happy Dogs' },
          { value: 50, suffix: '+', label: 'Certified Walkers' },
        ]}
      />

      {/* Features Carousel with Parallax Cards */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-dark mb-4">
              What's Included
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Every walk comes packed with features to keep your dog happy and you informed
            </p>
          </motion.div>

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
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2.5 },
              1280: { slidesPerView: 3 },
            }}
            className="features-carousel pb-12"
          >
            {features.map((feature, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, rotateY: 5 }}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden mx-2 my-4 group"
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
                        <feature.icon className="w-6 h-6 text-primary-500" />
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

      {/* Pricing Cards with Parallax */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-100 to-white relative overflow-hidden">
        {/* Parallax Background */}
        <motion.div
          initial={{ y: 0 }}
          whileInView={{ y: -50 }}
          viewport={{ once: true }}
          className="absolute top-20 right-10 opacity-5"
        >
          <PawPrint className="w-64 h-64 text-primary-500" />
        </motion.div>

        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-dark mb-4">
              Choose Your Package
            </h2>
            <p className="text-gray-500 text-lg">
              Select the perfect walk duration for your dog's needs
            </p>
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
                  pkg.popular ? 'ring-2 ring-primary-500 scale-105' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-0 right-0 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-center text-sm font-bold">
                    ⭐ Most Popular
                  </div>
                )}
                <div className={`p-8 ${pkg.popular ? 'pt-12' : ''}`}>
                  <h3 className="font-heading font-bold text-2xl text-dark mb-2">{pkg.name}</h3>
                  <p className="text-gray-500 mb-4">{pkg.desc}</p>
                  <div className="mb-6">
                    <span className="font-bold text-4xl text-primary-500">{pkg.price}</span>
                    <span className="text-gray-400">/walk</span>
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
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
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

      {/* Gallery Carousel */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-dark mb-4">
              Happy Dogs on Walks
            </h2>
          </motion.div>

          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: '.gallery-prev',
              nextEl: '.gallery-next',
            }}
            autoplay={{ delay: 2500 }}
            slidesPerView={1.5}
            spaceBetween={20}
            centeredSlides={true}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 2.5 },
              1024: { slidesPerView: 3.5 },
            }}
            className="gallery-carousel"
          >
            {gallery.map((img, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative aspect-square rounded-3xl overflow-hidden shadow-lg"
                >
                  <Image src={img} alt={`Gallery ${index + 1}`} fill className="object-cover" />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex justify-center gap-4 mt-8">
            <button className="gallery-prev w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button className="gallery-next w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Reviews Carousel */}
      <TestimonialsCarousel 
        testimonials={reviews} 
        title="What Pet Parents Say" 
        subtitle="Real reviews from happy dog owners"
        color="primary" 
      />

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary-600 to-primary-500 text-white relative overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-20 -right-20 w-64 h-64 border border-white/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-32 -left-32 w-96 h-96 border border-white/10 rounded-full"
        />

        <div className="container-custom relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
              Ready to Book a Walk?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Give your dog the exercise and adventure they deserve. Book your first walk today!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowBooking(true)}
                className="px-10 py-4 bg-white text-primary-600 font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Book Now
              </motion.button>
              <motion.a
                href="tel:+919876543210"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold rounded-2xl hover:bg-white/30 transition-all flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                +91 98765 43210
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Package Selection Popup - Responsive */}
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
              className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 
                         sm:w-full sm:max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl z-50 
                         overflow-hidden flex flex-col max-h-[calc(100vh-2rem)] sm:max-h-[90vh]"
            >
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4 sm:p-6 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-xl sm:text-2xl">{selectedPackage.name}</h3>
                    <p className="text-white/80 text-sm">{selectedPackage.desc}</p>
                  </div>
                  <button onClick={() => setSelectedPackage(null)} className="p-2 hover:bg-white/20 rounded-full">
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
              </div>
              <div className="p-4 sm:p-6 overflow-y-auto flex-1">
                <div className="text-center mb-4 sm:mb-6">
                  <span className="font-bold text-3xl sm:text-4xl text-dark">{selectedPackage.price}</span>
                  <span className="text-gray-400">/walk</span>
                </div>
                <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  {selectedPackage.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-600 text-sm sm:text-base">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="space-y-2 sm:space-y-3">
                  <button
                    onClick={() => {
                      setSelectedPackage(null)
                      setShowBooking(true)
                    }}
                    className="w-full py-3 sm:py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-xl shadow-lg text-sm sm:text-base"
                  >
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                    Book This Package
                  </button>
                  <a href="tel:+919876543210" className="block w-full py-3 sm:py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl text-center hover:bg-gray-50 text-sm sm:text-base">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                    Call to Book
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Responsive Booking Modal */}
      <ServiceBookingModal
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
        serviceName="Dog Walking"
        servicePrice="₹299"
        serviceIcon={<PawPrint className="w-6 h-6" />}
        themeColor="primary"
        packages={packages.map(pkg => ({
          name: pkg.name,
          price: pkg.price,
          duration: pkg.desc,
          features: pkg.features,
          popular: pkg.popular,
        }))}
      />

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .features-carousel .swiper-pagination-bullet,
        .reviews-carousel .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #cbd5e1;
          opacity: 1;
        }
        .features-carousel .swiper-pagination-bullet-active,
        .reviews-carousel .swiper-pagination-bullet-active {
          background: #3b82f6;
          width: 30px;
          border-radius: 5px;
        }
      `}</style>
    </div>
  )
}
