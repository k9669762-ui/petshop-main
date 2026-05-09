'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCoverflow, EffectCards } from 'swiper/modules'
import { 
  PawPrint, Clock, MapPin, Star, Heart,
  ArrowRight, Check, Phone, Calendar, Shield,
  Sparkles, Home, Car, Pill, Play, Moon, Sun,
  Scissors, GraduationCap, ChevronRight, ChevronLeft,
  Users, Zap, Award, ThumbsUp, X
} from 'lucide-react'
import { StatsBar, AnimatedCounter } from '@/components/ui/AnimatedCounter'
import ServiceBookingModal from '@/components/ui/ServiceBookingModal'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import 'swiper/css/effect-cards'

// Service types
interface Service {
  id: string
  name: string
  description: string
  price: string
  duration: string
  icon: React.ReactNode
  features: string[]
  popular?: boolean
  image: string
  longDescription: string
}

const dogServices: Service[] = [
  {
    id: 'dog-walking',
    name: 'Dog Walking',
    description: 'Daily walks to keep your furry friend healthy and happy.',
    longDescription: 'Our professional dog walkers provide safe, enjoyable outings tailored to your dog\'s energy level and needs. We use GPS tracking so you can follow along, and send photo updates after each walk. Whether your pup needs a quick potty break or a long adventure, we\'ve got them covered.',
    price: '₹299',
    duration: '30 mins',
    icon: <PawPrint className="w-7 h-7" />,
    features: ['GPS live tracking', 'Photo & video updates', 'Flexible scheduling', 'Certified walkers', 'Weather-appropriate care', 'Potty break reports'],
    popular: true,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600',
  },
  {
    id: 'dog-daycare',
    name: 'Dog Daycare',
    description: 'A fun-filled day of play, socialization, and rest.',
    longDescription: 'Our daycare provides a safe, stimulating environment where dogs can play, socialize, and burn off energy. We group dogs by size and temperament, ensuring positive interactions. Indoor and outdoor play areas, rest periods, and optional enrichment activities included.',
    price: '₹599',
    duration: 'Full day',
    icon: <Sun className="w-7 h-7" />,
    features: ['Supervised group play', 'Size-appropriate groups', 'Nap time included', 'Meals & treats', 'Indoor/outdoor areas', 'Webcam access'],
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600',
  },
  {
    id: 'dog-boarding',
    name: 'Dog Boarding',
    description: 'Overnight stays in a loving home environment.',
    longDescription: 'When you travel, your dog stays in a vetted, loving home—not a kennel. They\'ll receive 24/7 care, daily walks, playtime, and all the attention they deserve. We match your dog with the perfect host family based on their needs and personality.',
    price: '₹999',
    duration: 'Per night',
    icon: <Home className="w-7 h-7" />,
    features: ['Home environment', '24/7 supervision', 'Daily walks included', 'Photo updates', 'Medication admin', 'Special diet accommodation'],
    popular: true,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600',
  },
  {
    id: 'dog-sitting',
    name: 'Pet Sitting',
    description: 'In-home care while you\'re away from home.',
    longDescription: 'Keep your dog comfortable in their own home while you\'re away. Our sitters visit multiple times daily for feeding, walks, playtime, and lots of love. We can also collect mail, water plants, and maintain a security presence.',
    price: '₹799',
    duration: 'Per visit',
    icon: <Heart className="w-7 h-7" />,
    features: ['In your home', 'Multiple daily visits', 'Feeding & walks', 'Mail collection', 'Plant watering', 'Security presence'],
    image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=600',
  },
  {
    id: 'dog-grooming',
    name: 'Dog Grooming',
    description: 'Full grooming services for a fresh, clean pup.',
    longDescription: 'Professional grooming to keep your dog looking and feeling their best. Services include bath, blow-dry, haircut/trim, nail clipping, ear cleaning, and teeth brushing. We use premium, pet-safe products and handle all breeds with care.',
    price: '₹699',
    duration: '1-2 hours',
    icon: <Scissors className="w-7 h-7" />,
    features: ['Bath & blow-dry', 'Breed-specific cuts', 'Nail trimming', 'Ear cleaning', 'Teeth brushing', 'De-shedding treatment'],
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600',
  },
  {
    id: 'dog-training',
    name: 'Dog Training',
    description: 'Professional training for obedience and behavior.',
    longDescription: 'Our certified trainers use positive reinforcement methods to help your dog learn commands, improve behavior, and build confidence. From basic obedience to advanced skills, we create custom programs based on your goals.',
    price: '₹1,499',
    duration: '1 hour',
    icon: <GraduationCap className="w-7 h-7" />,
    features: ['Certified trainers', 'Positive methods only', 'Custom programs', 'Progress tracking', 'Homework support', 'Behavior modification'],
    image: 'https://images.unsplash.com/photo-1558929996-da64ba858215?w=600',
  },
  {
    id: 'dog-taxi',
    name: 'Pet Taxi',
    description: 'Safe transportation to vet, groomer, or anywhere.',
    longDescription: 'Need to get your dog somewhere but can\'t drive? Our pet taxi service provides safe, comfortable transportation in AC vehicles with experienced handlers. Perfect for vet visits, grooming appointments, or airport pickups.',
    price: '₹399',
    duration: 'One way',
    icon: <Car className="w-7 h-7" />,
    features: ['AC vehicles', 'Trained handlers', 'Door-to-door', 'Secure crates', 'Real-time tracking', 'Flexible timing'],
    image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600',
  },
]

const catServices: Service[] = [
  {
    id: 'cat-dropin',
    name: 'Drop-in Visits',
    description: 'Regular check-ins to keep your cat happy at home.',
    longDescription: 'Cats thrive in familiar surroundings. Our drop-in visits provide feeding, fresh water, litter box cleaning, playtime, and cuddles—all in the comfort of your home. We send updates after each visit so you never miss a moment.',
    price: '₹249',
    duration: '30 mins',
    icon: <Clock className="w-7 h-7" />,
    features: ['Feeding & water', 'Litter box cleaning', 'Playtime & cuddles', 'Health monitoring', 'Photo updates', 'Mail collection'],
    popular: true,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600',
  },
  {
    id: 'cat-overnight',
    name: 'Overnight Sitting',
    description: 'A sitter stays overnight for extra comfort.',
    longDescription: 'For cats who need extra attention or anxiety-prone kitties, our overnight sitters stay in your home. They provide evening and morning care, companionship, and the security of someone being there through the night.',
    price: '₹1,299',
    duration: 'Per night',
    icon: <Moon className="w-7 h-7" />,
    features: ['Overnight stay', 'Evening & morning care', 'Companionship', 'Security presence', 'Emergency response', 'Special needs care'],
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600',
  },
  {
    id: 'cat-boarding',
    name: 'Cat Boarding',
    description: 'Safe, comfortable boarding in a quiet space.',
    longDescription: 'Our cat boarding provides private, peaceful accommodations away from dogs and noise. Each cat gets their own space with climbing structures, hiding spots, and windows to watch the world. Daily play sessions and lots of love included.',
    price: '₹799',
    duration: 'Per night',
    icon: <Home className="w-7 h-7" />,
    features: ['Private suites', 'Cat-only facility', 'Climbing structures', 'Daily play sessions', 'Special diet options', 'Webcam viewing'],
    popular: true,
    image: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=600',
  },
  {
    id: 'cat-grooming',
    name: 'Cat Grooming',
    description: 'Gentle grooming tailored for feline friends.',
    longDescription: 'Our groomers specialize in handling cats with patience and care. Services include brushing, mat removal, nail trimming, ear cleaning, and sanitary trims. We work at your cat\'s pace to minimize stress.',
    price: '₹599',
    duration: '1 hour',
    icon: <Sparkles className="w-7 h-7" />,
    features: ['Gentle handling', 'Brushing & dematting', 'Nail trimming', 'Ear cleaning', 'Sanitary trim', 'Stress-free approach'],
    image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=600',
  },
  {
    id: 'cat-play',
    name: 'Play Sessions',
    description: 'Interactive play to keep your cat active.',
    longDescription: 'Keep your indoor cat mentally and physically stimulated with our play sessions. We bring engaging toys and activities designed to satisfy hunting instincts, encourage exercise, and strengthen the bond between cat and human.',
    price: '₹199',
    duration: '30 mins',
    icon: <Play className="w-7 h-7" />,
    features: ['Interactive toys', 'Mental stimulation', 'Exercise & activity', 'Bonding time', 'Laser play', 'Puzzle feeders'],
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600',
  },
  {
    id: 'cat-medication',
    name: 'Medication Admin',
    description: 'Professional medication for cats with special needs.',
    longDescription: 'If your cat needs regular medication, our trained caregivers can help. We administer oral medications, injections (subcutaneous), and topical treatments. We coordinate with your vet and keep detailed records.',
    price: '₹349',
    duration: 'Per visit',
    icon: <Pill className="w-7 h-7" />,
    features: ['Oral medication', 'Subcutaneous injections', 'Topical treatments', 'Vet coordination', 'Detailed records', 'Diabetes care'],
    image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=600',
  },
]

const testimonials = [
  {
    name: 'Priya Krishnan',
    location: 'Chennai',
    pet: 'Max (Golden Retriever)',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    content: 'BowPaw\'s dog walking service is amazing! Max gets so excited when he sees the walker. The GPS tracking gives me peace of mind.',
    rating: 5,
  },
  {
    name: 'Karthik Selvam',
    location: 'Coimbatore',
    pet: 'Whiskers (Persian Cat)',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    content: 'The drop-in visits are perfect for Whiskers. She\'s much happier staying home, and the sitters send the cutest photos!',
    rating: 5,
  },
  {
    name: 'Anitha Rajan',
    location: 'Madurai',
    pet: 'Bruno (Labrador)',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    content: 'Used the boarding service for a week. Bruno was treated like family. He came back happy and well-cared for!',
    rating: 5,
  },
  {
    name: 'Vijay Moorthy',
    location: 'Tiruchirappalli',
    pet: 'Luna (Indie)',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    content: 'The training sessions transformed Luna! She now follows commands and is much more confident. Highly recommend!',
    rating: 5,
  },
]

const stats = [
  { value: '10,000+', label: 'Happy Pets', icon: Heart },
  { value: '500+', label: 'Verified Caregivers', icon: Users },
  { value: '4.9', label: 'Average Rating', icon: Star },
  { value: '50,000+', label: 'Services Completed', icon: Award },
]

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<'dogs' | 'cats'>('dogs')
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [showBooking, setShowBooking] = useState(false)
  const [bookingService, setBookingService] = useState<Service | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

  const services = activeTab === 'dogs' ? dogServices : catServices

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div 
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1920"
            alt="Happy pets"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/80 via-primary-800/70 to-primary-900/90" />
        </motion.div>

        {/* Floating Paw Prints */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100 }}
              animate={{ 
                opacity: [0, 0.3, 0],
                y: [-20, -200],
                x: Math.sin(i) * 50
              }}
              transition={{
                duration: 4 + (i % 4) * 0.5,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              className="absolute text-white"
              style={{
                left: `${5 + i * 7}%`,
                bottom: '10%',
              }}
            >
              <PawPrint className="w-8 h-8 md:w-12 md:h-12" />
            </motion.div>
          ))}
        </div>

        {/* Hero Content */}
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/20"
          >
            <Shield className="w-5 h-5 text-yellow-400" />
            <span className="text-sm md:text-base font-medium">Trusted by 10,000+ Pet Parents in Tamil Nadu</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight"
          >
            Premium Pet Care
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
              Services
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto"
          >
            Professional, loving care for your furry family members. 
            Book trusted pet sitters, walkers, and groomers near you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <motion.button
              onClick={() => {
                setBookingService(services[0])
                setShowBooking(true)
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-primary-600 font-bold rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              Book a Service
            </motion.button>
            <motion.a
              href="tel:+919876543210"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold rounded-xl sm:rounded-2xl hover:bg-white/20 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="sm:hidden">Call Us</span>
              <span className="hidden sm:inline">+91 98765 43210</span>
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

      {/* Stats Section with Animated Counters */}
      <section className="py-8 bg-white border-b border-gray-100 -mt-16 relative z-20">
        <div className="container-custom">
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { value: 10000, suffix: '+', label: 'Happy Pets', icon: Heart },
                { value: 500, suffix: '+', label: 'Verified Caregivers', icon: Users },
                { value: 4.9, suffix: '', label: 'Average Rating', icon: Star },
                { value: 50000, suffix: '+', label: 'Services Completed', icon: Award },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 md:w-7 md:h-7 text-primary-500" />
                  </div>
                  <div className="font-heading font-bold text-2xl md:text-3xl text-dark">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pet Type Tabs */}
      <section className="py-16 md:py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-dark mb-4">
              Choose Your Pet Type
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              We offer specialized services for dogs and cats. Select your pet to see available services.
            </p>
          </motion.div>

          {/* Animated Tabs */}
          <div className="flex justify-center mb-12">
            <motion.div 
              className="inline-flex bg-gray-100 rounded-3xl p-2 relative"
              layout
            >
              <button
                onClick={() => setActiveTab('dogs')}
                className={`relative z-10 flex items-center gap-3 px-6 sm:px-10 py-4 sm:py-5 rounded-2xl font-semibold transition-all ${
                  activeTab === 'dogs' ? 'text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="text-2xl sm:text-4xl">🐶</span>
                <span className="text-lg sm:text-xl">Dogs</span>
              </button>
              <button
                onClick={() => setActiveTab('cats')}
                className={`relative z-10 flex items-center gap-3 px-6 sm:px-10 py-4 sm:py-5 rounded-2xl font-semibold transition-all ${
                  activeTab === 'cats' ? 'text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="text-2xl sm:text-4xl">🐱</span>
                <span className="text-lg sm:text-xl">Cats</span>
              </button>
              
              {/* Animated Background */}
              <motion.div
                layout
                className={`absolute top-2 bottom-2 rounded-2xl shadow-lg ${
                  activeTab === 'dogs' ? 'bg-primary-500' : 'bg-purple-500'
                }`}
                style={{
                  left: activeTab === 'dogs' ? '8px' : '50%',
                  right: activeTab === 'dogs' ? '50%' : '8px',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            </motion.div>
          </div>

          {/* Services Carousel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Navigation Buttons */}
              <button className="services-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center hover:bg-gray-50 transition-all -ml-4 md:-ml-6 hidden md:flex">
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <button className="services-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center hover:bg-gray-50 transition-all -mr-4 md:-mr-6 hidden md:flex">
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>

              <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={1.2}
                loop={true}
                speed={800}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 50,
                  depth: 150,
                  modifier: 1.5,
                  slideShadows: false,
                }}
                navigation={{
                  prevEl: '.services-prev',
                  nextEl: '.services-next',
                }}
                pagination={{ clickable: true, dynamicBullets: true }}
                autoplay={{ 
                  delay: 3000, 
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true 
                }}
                breakpoints={{
                  640: { slidesPerView: 1.5, spaceBetween: 20 },
                  768: { slidesPerView: 2, spaceBetween: 30 },
                  1024: { slidesPerView: 2.5, spaceBetween: 30 },
                  1280: { slidesPerView: 3, spaceBetween: 40 },
                }}
                className="services-carousel pb-16"
              >
                {services.map((service, index) => (
                  <SwiperSlide key={service.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group mx-2 my-4 ${
                        service.popular ? 'ring-2 ring-offset-4 ring-primary-500' : ''
                      }`}
                    >
                      {/* Popular Badge */}
                      {service.popular && (
                        <div className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          Most Popular
                        </div>
                      )}

                      {/* Service Image with Parallax */}
                      <div className="relative h-48 sm:h-56 overflow-hidden">
                        <Image
                          src={service.image}
                          alt={service.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        
                        {/* Price Tag */}
                        <div className="absolute bottom-4 right-4 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg">
                          <span className="font-bold text-xl text-dark">{service.price}</span>
                          <span className="text-gray-500 text-sm">/{service.duration}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                            activeTab === 'dogs' 
                              ? 'bg-primary-100 text-primary-500' 
                              : 'bg-purple-100 text-purple-500'
                          }`}>
                            {service.icon}
                          </div>
                          <div>
                            <h3 className="font-heading font-bold text-xl text-dark mb-1">
                              {service.name}
                            </h3>
                            <div className="flex items-center gap-1 text-yellow-500">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-current" />
                              ))}
                              <span className="text-sm text-gray-500 ml-1">(4.9)</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                          {service.description}
                        </p>

                        {/* Features Preview */}
                        <div className="flex flex-wrap gap-2 mb-5">
                          {service.features.slice(0, 3).map((feature, i) => (
                            <span 
                              key={i} 
                              className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                          {service.features.length > 3 && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              +{service.features.length - 3} more
                            </span>
                          )}
                        </div>

                        {/* CTA Button */}
                        <button
                          onClick={() => setSelectedService(service)}
                          className={`w-full py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                            activeTab === 'dogs'
                              ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-lg hover:shadow-primary-500/30'
                              : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/30'
                          }`}
                        >
                          View Details
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          </AnimatePresence>

          {/* Auto-scroll indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-2 mt-6 text-gray-400"
          >
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronRight className="w-4 h-4" />
            </motion.div>
            <span className="text-sm">Auto-scrolling • Swipe to explore</span>
            <motion.div
              animate={{ x: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Services Quick Access Carousel */}
      <section className="py-12 bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h3 className="font-heading font-bold text-2xl md:text-3xl text-dark">Quick Book Popular Services</h3>
              <p className="text-gray-500">Click to book instantly</p>
            </div>
            <div className="flex gap-2">
              <button className="quick-prev w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button className="quick-next w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </motion.div>

          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{ prevEl: '.quick-prev', nextEl: '.quick-next' }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            slidesPerView={2}
            spaceBetween={16}
            loop={true}
            speed={600}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
              1280: { slidesPerView: 6 },
            }}
            className="quick-services-carousel"
          >
            {[
              { name: 'Dog Walking', icon: PawPrint, price: '₹299', color: 'from-blue-500 to-blue-600', href: '/services/dog-walking' },
              { name: 'Pet Sitting', icon: Heart, price: '₹799', color: 'from-red-500 to-red-600', href: '/services/pet-sitting' },
              { name: 'Dog Grooming', icon: Scissors, price: '₹699', color: 'from-pink-500 to-pink-600', href: '/services/dog-grooming' },
              { name: 'Dog Training', icon: GraduationCap, price: '₹1,499', color: 'from-green-500 to-green-600', href: '/services/dog-training' },
              { name: 'Cat Visits', icon: Clock, price: '₹249', color: 'from-purple-500 to-purple-600', href: '/services/cat-visits' },
              { name: 'Dog Boarding', icon: Home, price: '₹999', color: 'from-orange-500 to-orange-600', href: '/services/dog-boarding' },
              { name: 'Pet Taxi', icon: Car, price: '₹399', color: 'from-yellow-500 to-yellow-600', href: '/services/pet-taxi' },
              { name: 'Cat Grooming', icon: Sparkles, price: '₹599', color: 'from-rose-500 to-rose-600', href: '/services/cat-grooming' },
            ].map((item, i) => (
              <SwiperSlide key={i}>
                <Link href={item.href}>
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all text-center cursor-pointer group"
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="font-semibold text-dark text-sm mb-1">{item.name}</h4>
                    <p className="text-xs text-primary-500 font-bold">{item.price}</p>
                  </motion.div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Testimonials with Parallax */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-100 to-white relative overflow-hidden">
        {/* Parallax Background Elements */}
        <motion.div
          initial={{ y: 0 }}
          whileInView={{ y: -50 }}
          viewport={{ once: true }}
          className="absolute top-20 left-10 opacity-10"
        >
          <PawPrint className="w-40 h-40 text-primary-500" />
        </motion.div>
        <motion.div
          initial={{ y: 0 }}
          whileInView={{ y: 50 }}
          viewport={{ once: true }}
          className="absolute bottom-20 right-10 opacity-10"
        >
          <Heart className="w-32 h-32 text-red-500" />
        </motion.div>

        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-dark mb-4">
              What Pet Parents Say
            </h2>
            <p className="text-gray-500 text-lg">
              Join thousands of happy customers across Tamil Nadu
            </p>
          </motion.div>

          <div className="relative">
            {/* Navigation */}
            <div className="hidden md:flex justify-center gap-4 mb-8">
              <button className="testimonial-prev w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all">
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <button className="testimonial-next w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all">
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation={{ prevEl: '.testimonial-prev', nextEl: '.testimonial-next' }}
              pagination={{ clickable: true, dynamicBullets: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              grabCursor={true}
              loop={true}
              speed={700}
              slidesPerView={1}
              spaceBetween={30}
              centeredSlides={true}
              breakpoints={{
                768: { slidesPerView: 2, centeredSlides: false },
                1024: { slidesPerView: 3, centeredSlides: false },
              }}
              className="testimonials-carousel pb-12"
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-3xl shadow-xl p-8 text-center h-full"
                  >
                    <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-primary-100">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex justify-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6 italic line-clamp-3">"{testimonial.content}"</p>
                    <h4 className="font-heading font-bold text-dark">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.pet}</p>
                    <p className="text-sm text-primary-500 flex items-center justify-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {testimonial.location}
                    </p>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Service Areas - Scrolling Carousel */}
      <section className="py-16 md:py-20 overflow-hidden">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-4">
              Available Across Tamil Nadu
            </h2>
            <p className="text-gray-500">
              Serving pet parents in major cities and expanding
            </p>
          </motion.div>
        </div>

        {/* Infinite scrolling cities */}
        <div className="relative">
          <div className="flex animate-scroll-left">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-4 px-2">
                {['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Erode', 'Vellore', 'Thanjavur', 'Dindigul', 'Thoothukudi', 'Nagercoil', 'Karur', 'Hosur'].map((city, i) => (
                  <motion.div
                    key={`${setIndex}-${city}`}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="px-6 py-3 bg-white rounded-2xl shadow-md border border-gray-100 flex items-center gap-2 hover:shadow-lg hover:border-primary-200 transition-all cursor-default whitespace-nowrap"
                  >
                    <MapPin className="w-4 h-4 text-primary-500" />
                    <span className="font-medium text-gray-700">{city}</span>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Second row - opposite direction */}
        <div className="relative mt-4">
          <div className="flex animate-scroll-right">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-4 px-2">
                {['Kanchipuram', 'Cuddalore', 'Tirupur', 'Villupuram', 'Nagapattinam', 'Pudukkottai', 'Ramanathapuram', 'Sivaganga', 'Virudhunagar', 'Krishnagiri', 'Dharmapuri', 'Namakkal', 'Perambalur', 'Ariyalur'].map((city, i) => (
                  <motion.div
                    key={`${setIndex}-${city}`}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="px-6 py-3 bg-white rounded-2xl shadow-md border border-gray-100 flex items-center gap-2 hover:shadow-lg hover:border-primary-200 transition-all cursor-default whitespace-nowrap"
                  >
                    <MapPin className="w-4 h-4 text-secondary-500" />
                    <span className="font-medium text-gray-700">{city}</span>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Carousel */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-dark mb-4">
              Why Choose BowPaw?
            </h2>
            <p className="text-gray-500 text-lg">
              Premium care backed by trust and technology
            </p>
          </motion.div>

          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={true}
            speed={600}
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="why-choose-carousel pb-12"
          >
            {[
              { icon: Shield, title: 'Verified Caregivers', desc: 'Background-checked and trained professionals', color: 'bg-blue-500' },
              { icon: Clock, title: 'Real-time Updates', desc: 'GPS tracking and photo updates', color: 'bg-green-500' },
              { icon: Heart, title: '100% Satisfaction', desc: 'Money-back guarantee on all services', color: 'bg-red-500' },
              { icon: Award, title: 'Top Rated', desc: '4.9 average rating from 10,000+ reviews', color: 'bg-yellow-500' },
              { icon: Phone, title: '24/7 Support', desc: 'Always here when you need us', color: 'bg-purple-500' },
              { icon: Zap, title: 'Instant Booking', desc: 'Book in under 60 seconds', color: 'bg-orange-500' },
            ].map((item, i) => (
              <SwiperSlide key={i}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-gray-50 rounded-3xl p-8 text-center h-full"
                >
                  <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-dark mb-2">{item.title}</h3>
                  <p className="text-gray-500">{item.desc}</p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${(i * 17 + 13) % 100}%`,
                top: `${(i * 29 + 7) % 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 2 + (i % 4) * 0.5,
                repeat: Infinity,
                delay: (i % 5) * 0.2,
              }}
            />
          ))}
        </div>

        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6"
            >
              <PawPrint className="w-10 h-10" />
            </motion.div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
              Ready to Book?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Give your pet the premium care they deserve. Book now and get 10% off your first service!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <motion.button
                onClick={() => {
                  setBookingService(services[0])
                  setShowBooking(true)
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-white text-primary-600 font-bold rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                Book Now
              </motion.button>
              <motion.a
                href="tel:+919876543210"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold rounded-xl sm:rounded-2xl hover:bg-white/30 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                Call Us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="fixed inset-2 sm:inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 
                         md:w-full md:max-w-2xl md:max-h-[90vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl z-50 
                         overflow-hidden flex flex-col max-h-[calc(100vh-1rem)] sm:max-h-[calc(100vh-2rem)]"
            >
              {/* Modal Header with Image */}
              <div className="relative h-40 sm:h-48 md:h-64 flex-shrink-0">
                <Image
                  src={selectedService.image}
                  alt={selectedService.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Service Info */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      activeTab === 'dogs' ? 'bg-primary-500' : 'bg-purple-500'
                    } text-white`}>
                      {selectedService.icon}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-2xl text-white">
                        {selectedService.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <span className="text-white/80 text-sm">4.9 (500+ reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6 pb-4 border-b border-gray-100">
                  <div>
                    <span className="text-gray-500 text-xs sm:text-sm">Starting from</span>
                    <div className="font-bold text-2xl sm:text-3xl text-dark">{selectedService.price}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-500 text-xs sm:text-sm">Duration</span>
                    <div className="font-semibold text-dark text-sm sm:text-base">{selectedService.duration}</div>
                  </div>
                </div>

                <div className="mb-4 sm:mb-6">
                  <h4 className="font-heading font-semibold text-base sm:text-lg text-dark mb-2 sm:mb-3">About This Service</h4>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{selectedService.longDescription}</p>
                </div>

                <div className="mb-4 sm:mb-6">
                  <h4 className="font-heading font-semibold text-base sm:text-lg text-dark mb-2 sm:mb-3">What's Included</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {selectedService.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 rounded-xl">
                        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          activeTab === 'dogs' ? 'bg-primary-100 text-primary-500' : 'bg-purple-100 text-purple-500'
                        }`}>
                          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                        <span className="text-gray-700 text-xs sm:text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-3 sm:gap-4 p-3 sm:p-4 bg-green-50 rounded-xl mb-4 sm:mb-6">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-green-700 text-xs sm:text-sm">
                    <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Verified Caregivers
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-green-700 text-xs sm:text-sm">
                    <ThumbsUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    100% Satisfaction
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-6 border-t border-gray-100 flex gap-2 sm:gap-3 flex-shrink-0">
                <a href="tel:+919876543210" className="flex-1">
                  <button className="w-full py-3 sm:py-4 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Call to Book</span>
                    <span className="sm:hidden">Call</span>
                  </button>
                </a>
                <button
                  onClick={() => {
                    setBookingService(selectedService)
                    setSelectedService(null)
                    setShowBooking(true)
                  }}
                  className={`flex-1 py-3 sm:py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 text-sm sm:text-base ${
                    activeTab === 'dogs' 
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 hover:shadow-lg hover:shadow-primary-500/30' 
                      : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:shadow-lg hover:shadow-purple-500/30'
                  } transition-all`}
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  Book Now
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Service Booking Modal */}
      <ServiceBookingModal
        isOpen={showBooking}
        onClose={() => {
          setShowBooking(false)
          setBookingService(null)
        }}
        serviceName={bookingService?.name || 'Service'}
        servicePrice={bookingService?.price || '₹299'}
        serviceIcon={bookingService?.icon}
        themeColor={activeTab === 'dogs' ? 'primary' : 'purple'}
      />

      {/* Custom Styles for Swiper */}
      <style jsx global>{`
        .services-carousel .swiper-pagination-bullet,
        .testimonials-carousel .swiper-pagination-bullet,
        .why-choose-carousel .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #cbd5e1;
          opacity: 1;
          transition: all 0.3s ease;
        }
        .services-carousel .swiper-pagination-bullet-active,
        .testimonials-carousel .swiper-pagination-bullet-active,
        .why-choose-carousel .swiper-pagination-bullet-active {
          background: #3b82f6;
          width: 30px;
          border-radius: 5px;
        }
        .services-carousel .swiper-slide {
          transition: all 0.5s ease;
        }
        .services-carousel .swiper-slide-active {
          transform: scale(1.02);
        }
        .testimonials-carousel .swiper-slide {
          height: auto;
        }

        /* Infinite scroll animations */
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }
        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
