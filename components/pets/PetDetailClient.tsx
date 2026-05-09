'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Thumbs, FreeMode, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { 
  Heart, Star, Check, ArrowLeft, Phone, Calendar, Shield, 
  MapPin, Truck, Award, Share2, MessageCircle, ChevronLeft, 
  ChevronRight, PawPrint, Sparkles, Clock, Users, Info,
  CheckCircle, AlertCircle, X
} from 'lucide-react'
import { allPets, getPetsByCategory, PetBreed } from '@/lib/petBreeds'
import { useWishlistStore } from '@/store/useWishlistStore'
import PetCard from '@/components/pets/PetCard'
import ServiceBookingModal from '@/components/ui/ServiceBookingModal'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import 'swiper/css/free-mode'

const badgeColors: Record<string, string> = {
  'Popular': 'bg-gradient-to-r from-blue-500 to-blue-600',
  'Best for India': 'bg-gradient-to-r from-orange-500 to-amber-500',
  'Easy Care': 'bg-gradient-to-r from-green-500 to-emerald-500',
  'Rare': 'bg-gradient-to-r from-purple-500 to-pink-500',
  'Family Friendly': 'bg-gradient-to-r from-rose-500 to-pink-500',
}

// Pet care info based on category
const petCareInfo: Record<string, { diet: string[]; habitat: string[]; health: string[]; lifespan: string }> = {
  dogs: {
    diet: ['High-quality dog food', 'Fresh water always', 'Treats in moderation', 'No chocolate or grapes'],
    habitat: ['Indoor/Outdoor space', 'Comfortable bed', 'Exercise area', 'Climate control in summer'],
    health: ['Regular vet checkups', 'Vaccinations on schedule', 'Deworming every 3 months', 'Grooming as needed'],
    lifespan: '10-15 years'
  },
  cats: {
    diet: ['Premium cat food', 'Fresh water daily', 'Occasional wet food', 'No onions or garlic'],
    habitat: ['Indoor recommended', 'Litter box', 'Scratching post', 'Climbing spaces'],
    health: ['Annual vet visits', 'Core vaccinations', 'Dental care', 'Flea prevention'],
    lifespan: '12-18 years'
  },
  rabbits: {
    diet: ['Timothy hay (unlimited)', 'Fresh vegetables', 'Pellets in moderation', 'Fresh water'],
    habitat: ['Spacious hutch/cage', 'Exercise pen', 'Hiding spots', 'Cool temperature'],
    health: ['Vet checkup annually', 'Nail trimming', 'Teeth check', 'Spay/neuter recommended'],
    lifespan: '8-12 years'
  },
  fish: {
    diet: ['Species-appropriate food', 'Feed 1-2 times daily', 'Don\'t overfeed', 'Variety of foods'],
    habitat: ['Appropriate tank size', 'Filter system', 'Heater if tropical', 'Regular water changes'],
    health: ['Monitor water quality', 'Watch for disease signs', 'Quarantine new fish', 'Proper pH levels'],
    lifespan: '2-10 years (varies)'
  },
  birds: {
    diet: ['Seed mix or pellets', 'Fresh fruits/vegetables', 'Cuttlebone for calcium', 'Fresh water daily'],
    habitat: ['Spacious cage', 'Perches variety', 'Toys for enrichment', 'Away from drafts'],
    health: ['Annual avian vet visit', 'Wing/nail trimming', 'Watch droppings', 'Social interaction'],
    lifespan: '5-50 years (varies)'
  }
}

interface PetDetailClientProps {
  petId: string
}

export default function PetDetailClient({ petId }: PetDetailClientProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const [showEnquiry, setShowEnquiry] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'care' | 'health'>('overview')
  const heroRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  
  const { toggleItem, isInWishlist } = useWishlistStore()
  
  // Find the pet
  const pet = allPets.find(p => p.id === petId)
  
  if (!pet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <span className="text-6xl mb-4 block">🐾</span>
          <h1 className="font-heading font-bold text-2xl text-dark mb-2">Pet Not Found</h1>
          <p className="text-gray-500 mb-6">The pet you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/shop">
            <button className="btn-primary">Browse All Pets</button>
          </Link>
        </div>
      </div>
    )
  }

  const isWishlisted = isInWishlist(pet.id)
  const relatedPets = getPetsByCategory(pet.category).filter(p => p.id !== pet.id).slice(0, 4)
  const careInfo = petCareInfo[pet.category]
  
  // Use gallery images from pet data if available, otherwise generate defaults
  const galleryImages = pet.gallery && pet.gallery.length > 0 
    ? pet.gallery 
    : [
        pet.image,
        pet.image.replace('w=600', 'w=800'),
        'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600',
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600',
      ]

  const discount = pet.originalPrice 
    ? Math.round(((parseFloat(pet.originalPrice.replace('₹', '').replace(',', '')) - parseFloat(pet.price.replace('₹', '').replace(',', ''))) / parseFloat(pet.originalPrice.replace('₹', '').replace(',', ''))) * 100)
    : 0

  const handleWishlist = () => {
    // Create a Product-compatible object for the wishlist
    const productFromPet = {
      id: pet.id,
      name: pet.name,
      slug: pet.id,
      description: pet.description,
      shortDescription: pet.description.slice(0, 100),
      price: parseFloat(pet.price.replace('₹', '').replace(',', '')),
      compareAtPrice: pet.originalPrice ? parseFloat(pet.originalPrice.replace('₹', '').replace(',', '')) : undefined,
      category: pet.category,
      tags: pet.features,
      images: pet.gallery || [pet.image],
      variants: [],
      reviews: [],
      rating: pet.rating,
      reviewCount: pet.reviews,
      stock: pet.inStock ? 10 : 0,
      sku: `PET-${pet.id}`,
      brand: 'BowPaw',
      isFeatured: pet.badge === 'Popular',
      isNewArrival: false,
      isBestSeller: pet.badge === 'Best for India',
      isOnSale: !!pet.originalPrice,
      petType: pet.category === 'dogs' ? 'dog' : pet.category === 'cats' ? 'cat' : 'all' as const,
      createdAt: new Date().toISOString(),
    }
    toggleItem(productFromPet as any)
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `${pet.name} - BowPaw`,
        text: `Check out this adorable ${pet.name} on BowPaw!`,
        url: window.location.href,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container-custom py-3 sm:py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 overflow-x-auto">
            <Link href="/" className="hover:text-primary-500 whitespace-nowrap">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-primary-500 whitespace-nowrap">Pets</Link>
            <span>/</span>
            <span className="capitalize whitespace-nowrap">{pet.category}</span>
            <span>/</span>
            <span className="text-dark font-medium truncate">{pet.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-6 sm:py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Left: Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image Slider */}
            <div className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg">
              {/* Badges */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 flex flex-col gap-2">
                {pet.badge && (
                  <span className={`px-3 py-1.5 ${badgeColors[pet.badge]} text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1`}>
                    <Sparkles className="w-3 h-3" />
                    {pet.badge}
                  </span>
                )}
                {discount > 0 && (
                  <span className="px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                    -{discount}% OFF
                  </span>
                )}
              </div>

              {/* Wishlist & Share */}
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 flex flex-col gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleWishlist}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
                    isWishlisted 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white text-gray-700 hover:bg-red-500 hover:text-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 sm:w-6 sm:h-6 ${isWishlisted ? 'fill-current' : ''}`} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleShare}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50"
                >
                  <Share2 className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                </motion.button>
              </div>

              <Swiper
                modules={[Navigation, Pagination, Thumbs, Autoplay]}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                navigation={{
                  prevEl: '.gallery-prev',
                  nextEl: '.gallery-next',
                }}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                className="aspect-square"
              >
                {galleryImages.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative aspect-square">
                      <Image
                        src={img}
                        alt={`${pet.name} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation */}
              <button className="gallery-prev absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white">
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
              </button>
              <button className="gallery-next absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white">
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
              </button>
            </div>

            {/* Thumbnail Slider */}
            <Swiper
              modules={[FreeMode, Thumbs]}
              onSwiper={setThumbsSwiper}
              spaceBetween={12}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              className="thumbs-swiper"
            >
              {galleryImages.map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary-500 transition-all">
                    <Image
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          {/* Right: Pet Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Category & Name */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs sm:text-sm font-medium text-primary-500 uppercase tracking-wider capitalize">
                  {pet.category}
                </span>
                {pet.inStock ? (
                  <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    Available
                  </span>
                ) : (
                  <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
                    Out of Stock
                  </span>
                )}
              </div>
              <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-dark mb-3">
                {pet.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        i < Math.floor(pet.rating) ? 'text-yellow-400 fill-current' : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {pet.rating} ({pet.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-4 sm:p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-bold text-3xl sm:text-4xl text-dark">{pet.price}</span>
                {pet.originalPrice && (
                  <>
                    <span className="text-lg sm:text-xl text-gray-400 line-through">{pet.originalPrice}</span>
                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                      Save {discount}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Price includes health certificate & first vaccination
              </p>
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-600 leading-relaxed">{pet.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-dark mb-3">Key Features</h3>
              <div className="flex flex-wrap gap-2">
                {pet.features.map((feature, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 text-gray-700 text-sm rounded-xl"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <Clock className="w-5 h-5 text-primary-500 mb-2" />
                <p className="text-xs text-gray-500">Lifespan</p>
                <p className="font-semibold text-dark text-sm">{careInfo.lifespan}</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <Users className="w-5 h-5 text-primary-500 mb-2" />
                <p className="text-xs text-gray-500">Family Friendly</p>
                <p className="font-semibold text-dark text-sm">Yes</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowEnquiry(true)}
                disabled={!pet.inStock}
                className="flex-1 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-xl 
                           shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Calendar className="w-5 h-5" />
                Enquire Now
              </motion.button>
              <motion.a
                href="tel:+919876543210"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-4 border-2 border-gray-200 text-gray-700 font-bold rounded-xl 
                           hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call Us
              </motion.a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
              {[
                { icon: Shield, text: 'Health Certified' },
                { icon: Truck, text: 'Safe Delivery' },
                { icon: Award, text: '100% Legal' },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                  <badge.icon className="w-4 h-4 text-green-500" />
                  {badge.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12 sm:mt-16">
          {/* Tab Headers */}
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit mx-auto mb-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'care', label: 'Care Guide' },
              { id: 'health', label: 'Health Info' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-dark shadow-md'
                    : 'text-gray-600 hover:text-dark'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg"
            >
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-heading font-bold text-xl text-dark mb-4">About {pet.name}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {pet.description} This {pet.category === 'dogs' ? 'breed' : pet.category === 'cats' ? 'breed' : 'pet'} is 
                      known for being {pet.features.slice(0, 2).join(' and ').toLowerCase()}. 
                      Perfect for {pet.badge === 'Family Friendly' ? 'families with children' : 'all pet lovers'}.
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-dark mb-3">Why Choose {pet.name}?</h4>
                      <ul className="space-y-2">
                        {pet.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-gray-600">
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark mb-3">Included with Purchase</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-gray-600">
                          <Check className="w-4 h-4 text-green-500" />
                          Health certificate from vet
                        </li>
                        <li className="flex items-center gap-2 text-gray-600">
                          <Check className="w-4 h-4 text-green-500" />
                          First vaccination record
                        </li>
                        <li className="flex items-center gap-2 text-gray-600">
                          <Check className="w-4 h-4 text-green-500" />
                          Care guide booklet
                        </li>
                        <li className="flex items-center gap-2 text-gray-600">
                          <Check className="w-4 h-4 text-green-500" />
                          7-day health guarantee
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'care' && (
                <div className="space-y-6">
                  <h3 className="font-heading font-bold text-xl text-dark mb-4">Care Guide for {pet.name}</h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="bg-orange-50 rounded-2xl p-5">
                      <h4 className="font-semibold text-dark mb-3 flex items-center gap-2">
                        <span className="text-2xl">🍽️</span> Diet & Nutrition
                      </h4>
                      <ul className="space-y-2">
                        {careInfo.diet.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                            <Check className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-blue-50 rounded-2xl p-5">
                      <h4 className="font-semibold text-dark mb-3 flex items-center gap-2">
                        <span className="text-2xl">🏠</span> Habitat & Environment
                      </h4>
                      <ul className="space-y-2">
                        {careInfo.habitat.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                            <Check className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'health' && (
                <div className="space-y-6">
                  <h3 className="font-heading font-bold text-xl text-dark mb-4">Health Information</h3>
                  <div className="bg-green-50 rounded-2xl p-5">
                    <h4 className="font-semibold text-dark mb-3 flex items-center gap-2">
                      <span className="text-2xl">💚</span> Health Care Tips
                    </h4>
                    <ul className="space-y-2">
                      {careInfo.health.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-purple-50 rounded-2xl p-5">
                    <h4 className="font-semibold text-dark mb-3 flex items-center gap-2">
                      <span className="text-2xl">⏰</span> Expected Lifespan
                    </h4>
                    <p className="text-gray-600">
                      With proper care, a {pet.name} can live approximately <strong>{careInfo.lifespan}</strong>. 
                      Regular vet checkups and a healthy diet are key to longevity.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Related Pets */}
        {relatedPets.length > 0 && (
          <section className="mt-12 sm:mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-dark">
                Similar {pet.category.charAt(0).toUpperCase() + pet.category.slice(1)}
              </h2>
              <Link href={`/shop?pet=${pet.category}`}>
                <button className="text-primary-500 font-medium hover:underline flex items-center gap-1">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedPets.map((relatedPet, index) => (
                <PetCard key={relatedPet.id} pet={relatedPet} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Enquiry Modal */}
      <ServiceBookingModal
        isOpen={showEnquiry}
        onClose={() => setShowEnquiry(false)}
        serviceName={`${pet.name} Enquiry`}
        servicePrice={pet.price}
        serviceIcon={<PawPrint className="w-6 h-6" />}
        themeColor="primary"
      />

      {/* Custom Styles */}
      <style jsx global>{`
        .thumbs-swiper .swiper-slide-thumb-active {
          border-color: #3b82f6 !important;
        }
      `}</style>
    </div>
  )
}

