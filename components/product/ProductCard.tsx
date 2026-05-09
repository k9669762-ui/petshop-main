'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react'
import { Product } from '@/types'
import { useCartStore } from '@/store/useCartStore'
import { useWishlistStore } from '@/store/useWishlistStore'
import { useUIStore } from '@/store/useUIStore'
import { formatPrice, calculateDiscount, cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  index?: number
  variant?: 'default' | 'compact' | 'horizontal'
}

export default function ProductCard({ product, index = 0, variant = 'default' }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { addItem, isInCart } = useCartStore()
  const { toggleItem, isInWishlist } = useWishlistStore()
  const { openQuickView } = useUIStore()

  const inCart = isInCart(product.id)
  const inWishlist = isInWishlist(product.id)
  const discount = product.compareAtPrice 
    ? calculateDiscount(product.price, product.compareAtPrice) 
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleItem(product)
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    openQuickView(product.id)
  }

  if (variant === 'horizontal') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className="card card-hover flex gap-4 p-4"
      >
        <Link href={`/product/${product.slug}`} className="relative w-32 h-32 flex-shrink-0">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
          {discount > 0 && (
            <span className="absolute top-2 left-2 badge badge-sale">
              -{discount}%
            </span>
          )}
        </Link>
        <div className="flex-1 min-w-0">
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-heading font-semibold text-dark hover:text-primary-500 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-gray-500 mt-1">{product.category}</p>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'w-4 h-4',
                  i < Math.floor(product.rating)
                    ? 'fill-accent-500 text-accent-500'
                    : 'text-gray-300'
                )}
              />
            ))}
            <span className="text-sm text-gray-500 ml-1">({product.reviewCount})</span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-primary-500">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="btn-primary py-2 px-4 text-sm"
            >
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setTimeout(() => setIsHovered(false), 2000)}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group perspective"
    >
      <div className="card overflow-hidden shadow-parallax sm:tilt-3d">
        {/* Image Container */}
        <Link href={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={cn(
              'object-cover transition-transform duration-500',
              isHovered && 'scale-110'
            )}
          />
          
          {/* Second Image on Hover - Hidden on mobile for performance */}
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={product.name}
              fill
              className={cn(
                'object-cover absolute inset-0 transition-opacity duration-500 hidden sm:block',
                isHovered ? 'opacity-100' : 'opacity-0'
              )}
            />
          )}

          {/* Badges */}
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1.5 sm:gap-2">
            {discount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="badge badge-sale text-[10px] sm:text-xs px-1.5 sm:px-2.5"
              >
                -{discount}%
              </motion.span>
            )}
            {product.isNewArrival && (
              <span className="badge badge-new text-[10px] sm:text-xs px-1.5 sm:px-2.5">New</span>
            )}
            {product.isBestSeller && (
              <span className="badge badge-bestseller text-[10px] sm:text-xs px-1.5 sm:px-2.5">Best Seller</span>
            )}
          </div>

          {/* Quick Actions - Always visible on mobile, hover on desktop */}
          <div
            className={cn(
              'absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-col gap-1.5 sm:gap-2 transition-opacity',
              'sm:opacity-0 sm:group-hover:opacity-100',
              isHovered ? 'opacity-100' : 'opacity-100 sm:opacity-0'
            )}
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleToggleWishlist}
              className={cn(
                'w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-lg flex items-center justify-center transition-colors active:scale-90',
                inWishlist ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
              )}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={cn('w-4 h-4 sm:w-5 sm:h-5', inWishlist && 'fill-current')} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleQuickView}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-lg flex items-center justify-center 
                         text-gray-600 hover:text-primary-500 transition-colors active:scale-90 hidden sm:flex"
              aria-label="Quick view"
            >
              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>

          {/* Add to Cart Button - Always visible at bottom on mobile */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 hidden sm:block"
          >
            <button
              onClick={handleAddToCart}
              className={cn(
                'w-full py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all',
                'flex items-center justify-center gap-1.5 sm:gap-2',
                inCart
                  ? 'bg-secondary-500 text-white'
                  : 'bg-white text-dark hover:bg-primary-500 hover:text-white'
              )}
            >
              <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {inCart ? 'In Cart' : 'Add to Cart'}
            </button>
          </motion.div>
        </Link>

        {/* Product Info */}
        <div className="p-3 sm:p-4">
          <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mb-0.5 sm:mb-1">
            {product.brand}
          </p>
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-heading font-semibold text-sm sm:text-base text-dark hover:text-primary-500 
                           transition-colors line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]">
              {product.name}
            </h3>
          </Link>
          
          {/* Rating */}
          <div className="flex items-center gap-0.5 sm:gap-1 mt-1.5 sm:mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'w-3 h-3 sm:w-4 sm:h-4',
                  i < Math.floor(product.rating)
                    ? 'fill-accent-500 text-accent-500'
                    : 'text-gray-300'
                )}
              />
            ))}
            <span className="text-[10px] sm:text-xs text-gray-500 ml-1">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between gap-2 mt-2 sm:mt-3">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-bold text-base sm:text-lg text-primary-500">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-xs sm:text-sm text-gray-400 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
            {/* Mobile Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={cn(
                'sm:hidden p-2 rounded-lg transition-all active:scale-90',
                inCart
                  ? 'bg-secondary-500 text-white'
                  : 'bg-primary-500 text-white'
              )}
              aria-label={inCart ? 'In Cart' : 'Add to Cart'}
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

