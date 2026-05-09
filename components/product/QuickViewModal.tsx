'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, Heart, ShoppingCart, Star, Check } from 'lucide-react'
import { useUIStore } from '@/store/useUIStore'
import { useCartStore } from '@/store/useCartStore'
import { useWishlistStore } from '@/store/useWishlistStore'
import { getProductById } from '@/lib/mockData'
import { formatPrice, calculateDiscount, cn } from '@/lib/utils'
import { Product, ProductVariant } from '@/types'

export default function QuickViewModal() {
  const { quickViewProduct, closeQuickView } = useUIStore()
  const { addItem: addToCart } = useCartStore()
  const { toggleItem, isInWishlist } = useWishlistStore()
  
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (quickViewProduct) {
      const p = getProductById(quickViewProduct.id)
      setProduct(p || null)
      setSelectedVariant(p?.variants[0] || null)
      setQuantity(1)
      setSelectedImage(0)
      setAdded(false)
    }
  }, [quickViewProduct])

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeQuickView()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [closeQuickView])

  // Prevent body scroll
  useEffect(() => {
    if (quickViewProduct) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [quickViewProduct])

  if (!product) return null

  const inWishlist = isInWishlist(product.id)
  const discount = product.compareAtPrice 
    ? calculateDiscount(product.price, product.compareAtPrice) 
    : 0
  const currentPrice = selectedVariant?.price || product.price

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant || undefined)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <AnimatePresence>
      {quickViewProduct && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeQuickView}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-0 sm:inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 
                       md:max-w-4xl md:w-full md:max-h-[85vh] bg-white sm:rounded-2xl shadow-2xl z-50 
                       flex flex-col overflow-hidden"
            style={{ 
              paddingTop: 'env(safe-area-inset-top, 0px)',
              paddingBottom: 'env(safe-area-inset-bottom, 0px)' 
            }}
          >
            {/* Close Button */}
            <button
              onClick={closeQuickView}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full 
                         shadow-lg hover:bg-gray-100 transition-colors z-10 active:scale-90"
              style={{ marginTop: 'env(safe-area-inset-top, 0px)' }}
              aria-label="Close"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <div className="flex-1 overflow-y-auto">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Images */}
                <div className="relative bg-gray-100 p-4">
                  {/* Main Image */}
                  <div className="relative aspect-square rounded-xl overflow-hidden">
                    <Image
                      src={product.images[selectedImage]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    {discount > 0 && (
                      <span className="absolute top-3 left-3 badge badge-sale text-sm">
                        -{discount}%
                      </span>
                    )}
                  </div>

                  {/* Thumbnails */}
                  {product.images.length > 1 && (
                    <div className="flex gap-2 mt-4 justify-center">
                      {product.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={cn(
                            'relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all',
                            selectedImage === index
                              ? 'border-primary-500 ring-2 ring-primary-200'
                              : 'border-transparent hover:border-gray-300'
                          )}
                        >
                          <Image
                            src={image}
                            alt={`${product.name} ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6 flex flex-col">
                  {/* Brand & Category */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <span className="font-semibold">{product.brand}</span>
                    <span>•</span>
                    <span>{product.category}</span>
                  </div>

                  {/* Title */}
                  <h2 className="font-heading font-bold text-2xl text-dark mb-2">
                    {product.name}
                  </h2>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'w-5 h-5',
                            i < Math.floor(product.rating)
                              ? 'fill-accent-500 text-accent-500'
                              : 'text-gray-300'
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      ({product.reviewCount} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-bold text-primary-500">
                      {formatPrice(currentPrice)}
                    </span>
                    {product.compareAtPrice && (
                      <span className="text-xl text-gray-400 line-through">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                    )}
                  </div>

                  {/* Short Description */}
                  <p className="text-gray-600 mb-6">{product.shortDescription}</p>

                  {/* Variants */}
                  {product.variants.length > 0 && (
                    <div className="mb-6">
                      <label className="block text-sm font-semibold mb-2">
                        Select Option
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {product.variants.map((variant) => (
                          <button
                            key={variant.id}
                            onClick={() => setSelectedVariant(variant)}
                            className={cn(
                              'px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all',
                              selectedVariant?.id === variant.id
                                ? 'border-primary-500 bg-primary-50 text-primary-500'
                                : 'border-gray-200 hover:border-gray-300'
                            )}
                          >
                            {variant.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2">Quantity</label>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border-2 border-gray-200 rounded-xl">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="p-3 hover:bg-gray-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                        <span className="w-12 text-center font-semibold text-lg">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="p-3 hover:bg-gray-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                      <span className="text-sm text-gray-500">
                        {product.stock} in stock
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-auto">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToCart}
                      className={cn(
                        'flex-1 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all',
                        added
                          ? 'bg-secondary-500 text-white'
                          : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg'
                      )}
                    >
                      {added ? (
                        <>
                          <Check className="w-5 h-5" />
                          Added to Cart!
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5" />
                          Add to Cart
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleItem(product)}
                      className={cn(
                        'p-4 rounded-xl border-2 transition-all',
                        inWishlist
                          ? 'border-red-500 bg-red-50 text-red-500'
                          : 'border-gray-200 hover:border-red-500 hover:text-red-500'
                      )}
                      aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <Heart className={cn('w-6 h-6', inWishlist && 'fill-current')} />
                    </motion.button>
                  </div>

                  {/* View Full Details Link */}
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={closeQuickView}
                    className="mt-4 text-center text-primary-500 font-medium hover:underline"
                  >
                    View Full Details →
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

