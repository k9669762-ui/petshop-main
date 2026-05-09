'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs, FreeMode } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { 
  Heart, 
  ShoppingCart, 
  Minus, 
  Plus, 
  Star, 
  Truck, 
  Shield, 
  RefreshCcw,
  Check,
  ChevronRight,
  Share2
} from 'lucide-react'
import { getProductBySlug, products } from '@/lib/mockData'
import { useCartStore } from '@/store/useCartStore'
import { useWishlistStore } from '@/store/useWishlistStore'
import { formatPrice, calculateDiscount, cn } from '@/lib/utils'
import ProductCard from '@/components/product/ProductCard'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import 'swiper/css/free-mode'

interface ProductDetailClientProps {
  slug: string
}

export default function ProductDetailClient({ slug }: ProductDetailClientProps) {
  const product = getProductBySlug(slug)
  
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0] || null)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [added, setAdded] = useState(false)
  
  const { addItem: addToCart } = useCartStore()
  const { toggleItem, isInWishlist } = useWishlistStore()

  // Get related products
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4)

  // Get recently viewed (mock)
  const recentlyViewed = products
    .filter(p => p.id !== product?.id)
    .slice(0, 4)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl mb-4 block">😿</span>
          <h1 className="font-heading font-bold text-2xl mb-2">Product Not Found</h1>
          <p className="text-gray-500 mb-4">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/shop" className="btn-primary">
            <span>Back to Shop</span>
          </Link>
        </div>
      </div>
    )
  }

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
    <div className="min-h-screen bg-light">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary-500">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/shop" className="hover:text-primary-500">Shop</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/shop?category=${product.category}`} className="hover:text-primary-500">
              {product.category}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-dark font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <Swiper
              modules={[Navigation, Thumbs]}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              navigation
              className="aspect-square rounded-2xl overflow-hidden bg-white"
            >
              {product.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-full">
                    <Image
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    {discount > 0 && index === 0 && (
                      <span className="absolute top-4 left-4 badge badge-sale text-lg px-4 py-1">
                        -{discount}% OFF
                      </span>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <Swiper
                onSwiper={setThumbsSwiper}
                modules={[FreeMode, Thumbs]}
                spaceBetween={12}
                slidesPerView={4}
                freeMode
                watchSlidesProgress
                className="!px-1"
              >
                {product.images.map((image, index) => (
                  <SwiperSlide key={index} className="cursor-pointer">
                    <div className="relative aspect-square rounded-lg overflow-hidden border-2 
                                    border-transparent hover:border-primary-500 transition-colors">
                      <Image
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Brand */}
            <p className="text-primary-500 font-semibold">{product.brand}</p>

            {/* Title */}
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-dark">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
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
              <span className="text-gray-600">
                {product.rating.toFixed(1)} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-primary-500">
                {formatPrice(currentPrice)}
              </span>
              {product.compareAtPrice && (
                <span className="text-xl text-gray-400 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
              {discount > 0 && (
                <span className="badge badge-sale">Save {discount}%</span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-gray-600 text-lg leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Variants */}
            {product.variants.length > 0 && (
              <div>
                <label className="block font-semibold mb-3">Select Option</label>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={cn(
                        'px-5 py-3 rounded-xl border-2 font-medium transition-all',
                        selectedVariant?.id === variant.id
                          ? 'border-primary-500 bg-primary-50 text-primary-500'
                          : 'border-gray-200 hover:border-gray-300'
                      )}
                    >
                      {variant.name}
                      {variant.price !== product.price && (
                        <span className="ml-2 text-sm">
                          ({formatPrice(variant.price)})
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block font-semibold mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-200 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-16 text-center font-semibold text-lg">
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
                <span className="text-gray-500">
                  {product.stock > 10 
                    ? `${product.stock} in stock` 
                    : product.stock > 0 
                    ? <span className="text-orange-500">Only {product.stock} left!</span>
                    : <span className="text-red-500">Out of stock</span>
                  }
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={cn(
                  'flex-1 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all text-lg',
                  added
                    ? 'bg-secondary-500 text-white'
                    : product.stock === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg'
                )}
              >
                {added ? (
                  <>
                    <Check className="w-6 h-6" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-6 h-6" />
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
              <button
                className="p-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all"
                aria-label="Share product"
              >
                <Share2 className="w-6 h-6" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="w-8 h-8 mx-auto text-primary-500 mb-2" />
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-gray-500">Orders over ₹500</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto text-primary-500 mb-2" />
                <p className="text-sm font-medium">Secure Payment</p>
                <p className="text-xs text-gray-500">100% Protected</p>
              </div>
              <div className="text-center">
                <RefreshCcw className="w-8 h-8 mx-auto text-primary-500 mb-2" />
                <p className="text-sm font-medium">Easy Returns</p>
                <p className="text-xs text-gray-500">30-Day Policy</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="border-b">
            <div className="flex gap-8">
              {['description', 'reviews', 'shipping'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'py-4 font-semibold capitalize border-b-2 transition-colors',
                    activeTab === tab
                      ? 'border-primary-500 text-primary-500'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  )}
                >
                  {tab}
                  {tab === 'reviews' && ` (${product.reviewCount})`}
                </button>
              ))}
            </div>
          </div>

          <div className="py-8">
            <AnimatePresence mode="wait">
              {activeTab === 'description' && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="prose prose-lg max-w-none"
                >
                  <p>{product.description}</p>
                  {product.specifications && (
                    <>
                      <h3>Specifications</h3>
                      <table>
                        <tbody>
                          {Object.entries(product.specifications).map(([key, value]) => (
                            <tr key={key}>
                              <td className="font-semibold">{key}</td>
                              <td>{value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {product.reviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-semibold">{review.author}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    'w-4 h-4',
                                    i < Math.floor(review.rating)
                                      ? 'fill-accent-500 text-accent-500'
                                      : 'text-gray-300'
                                  )}
                                />
                              ))}
                            </div>
                            {review.verified && (
                              <span className="text-xs bg-secondary-100 text-secondary-600 px-2 py-0.5 rounded">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 className="font-semibold mb-2">{review.title}</h4>
                      <p className="text-gray-600">{review.content}</p>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'shipping' && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="prose prose-lg max-w-none"
                >
                  <h3>Shipping Information</h3>
                  <ul>
                    <li>Free standard shipping on orders over ₹500</li>
                    <li>Express shipping available for ₹99</li>
                    <li>Standard delivery: 3-5 business days</li>
                    <li>Express delivery: 1-2 business days</li>
                  </ul>
                  <h3>Return Policy</h3>
                  <p>
                    We offer a 30-day hassle-free return policy. If you&apos;re not satisfied 
                    with your purchase, you can return it for a full refund or exchange.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="section-title mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p, index) => (
              <ProductCard key={p.id} product={p} index={index} />
            ))}
          </div>
        </div>

        {/* Recently Viewed */}
        <div className="mt-16">
          <h2 className="section-title mb-8">Recently Viewed</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentlyViewed.map((p, index) => (
              <ProductCard key={p.id} product={p} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

