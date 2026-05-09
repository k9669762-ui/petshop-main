'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart, Star, Eye, Check, Sparkles } from 'lucide-react'
import { PetBreed } from '@/lib/petBreeds'
import { useCartStore } from '@/store/useCartStore'
import { useWishlistStore } from '@/store/useWishlistStore'

interface PetCardProps {
  pet: PetBreed
  index?: number
}

const badgeColors = {
  'Popular': 'bg-gradient-to-r from-blue-500 to-blue-600',
  'Best for India': 'bg-gradient-to-r from-orange-500 to-amber-500',
  'Easy Care': 'bg-gradient-to-r from-green-500 to-emerald-500',
  'Rare': 'bg-gradient-to-r from-purple-500 to-pink-500',
  'Family Friendly': 'bg-gradient-to-r from-rose-500 to-pink-500',
}

export default function PetCard({ pet, index = 0 }: PetCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  const { addItem } = useCartStore()
  const { toggleItem, isInWishlist } = useWishlistStore()
  
  const isWishlisted = isInWishlist(pet.id)

  // Create a Product-compatible object from PetBreed
  const createProductFromPet = () => ({
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
  })

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(createProductFromPet() as any, 1)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleItem(createProductFromPet() as any)
  }

  const discount = pet.originalPrice 
    ? Math.round(((parseFloat(pet.originalPrice.replace('₹', '').replace(',', '')) - parseFloat(pet.price.replace('₹', '').replace(',', ''))) / parseFloat(pet.originalPrice.replace('₹', '').replace(',', ''))) * 100)
    : 0

  return (
    <Link href={`/pets/${pet.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.3 }}
        whileHover={{ y: -8 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
      >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={imageError ? '/images/placeholder-pet.jpg' : pet.image}
          alt={pet.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          onError={() => setImageError(true)}
        />

        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
        />

        {/* Badges */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1.5 sm:gap-2">
          {pet.badge && (
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 ${badgeColors[pet.badge]} text-white text-[10px] sm:text-xs font-bold rounded-full shadow-lg flex items-center gap-1`}
            >
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              {pet.badge}
            </motion.span>
          )}
          {discount > 0 && (
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="px-2 sm:px-3 py-1 sm:py-1.5 bg-red-500 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-lg"
            >
              -{discount}% OFF
            </motion.span>
          )}
        </div>

        {/* Wishlist Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleWishlist}
          className={`absolute top-2 sm:top-3 right-2 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all shadow-lg ${
            isWishlisted 
              ? 'bg-red-500 text-white' 
              : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-red-500 hover:text-white'
          }`}
        >
          <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isWishlisted ? 'fill-current' : ''}`} />
        </motion.button>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex gap-2"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="flex-1 py-2 sm:py-2.5 bg-white text-gray-900 font-semibold rounded-xl shadow-lg hover:bg-primary-500 hover:text-white transition-colors flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
          >
            <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Enquire</span>
          </motion.button>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 py-2 sm:py-2.5 bg-primary-500 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-600 transition-colors flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
          >
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">View</span>
          </motion.div>
        </motion.div>

        {/* Stock Status */}
        {!pet.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="px-4 py-2 bg-white/90 text-gray-900 font-bold rounded-full text-sm">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 md:p-5">
        {/* Category */}
        <span className="text-[10px] sm:text-xs font-medium text-primary-500 uppercase tracking-wider">
          {pet.category}
        </span>

        {/* Name */}
        <h3 className="font-heading font-bold text-sm sm:text-base md:text-lg text-dark mt-1 line-clamp-1 group-hover:text-primary-500 transition-colors">
          {pet.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1.5 sm:mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                  i < Math.floor(pet.rating) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] sm:text-xs text-gray-500">
            ({pet.reviews})
          </span>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-500 mt-1.5 sm:mt-2 line-clamp-2">
          {pet.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-1 mt-2 sm:mt-3">
          {pet.features.slice(0, 2).map((feature, i) => (
            <span
              key={i}
              className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-600 text-[9px] sm:text-xs rounded-full flex items-center gap-0.5 sm:gap-1"
            >
              <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-500" />
              {feature}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
          <div>
            <span className="font-bold text-lg sm:text-xl md:text-2xl text-dark">
              {pet.price}
            </span>
            {pet.originalPrice && (
              <span className="text-xs sm:text-sm text-gray-400 line-through ml-1.5 sm:ml-2">
                {pet.originalPrice}
              </span>
            )}
          </div>
          {pet.inStock && (
            <span className="text-[10px] sm:text-xs text-green-500 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse" />
              Available
            </span>
          )}
        </div>
      </div>
      </motion.div>
    </Link>
  )
}

