'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, EffectCoverflow, FreeMode } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { 
  ChevronRight, 
  Heart, 
  ShoppingCart, 
  Eye, 
  Star, 
  Sparkles
} from 'lucide-react'
import { useCartStore, useWishlistStore, Product } from '@/lib/store'
import { formatPrice, getDiscountPercentage, cn } from '@/lib/utils'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import 'swiper/css/free-mode'

// ==================== TYPES ====================
type CarouselVariant = 'standard' | 'coverflow' | 'smooth' | 'minimal'

interface ProductCarouselProps {
  products: Product[]
  variant?: CarouselVariant
  title?: string
  subtitle?: string
  showPagination?: boolean
  autoplay?: boolean
  autoplayDelay?: number
  loop?: boolean
  className?: string
  showViewAll?: boolean
  viewAllLink?: string
  accentColor?: 'primary' | 'secondary' | 'coral' | 'accent'
}

// ==================== COLOR MAPPING ====================
const accentColors = {
  primary: {
    bg: 'from-sky-50 via-white to-cyan-50',
    text: 'text-sky-600',
    button: 'bg-sky-500 hover:bg-sky-600 text-white',
    bullet: '#0ea5e9'
  },
  secondary: {
    bg: 'from-orange-50 via-white to-amber-50',
    text: 'text-orange-600',
    button: 'bg-orange-500 hover:bg-orange-600 text-white',
    bullet: '#f97316'
  },
  coral: {
    bg: 'from-red-50 via-white to-orange-50',
    text: 'text-red-500',
    button: 'bg-red-500 hover:bg-red-600 text-white',
    bullet: '#ef4444'
  },
  accent: {
    bg: 'from-emerald-50 via-white to-teal-50',
    text: 'text-emerald-600',
    button: 'bg-emerald-500 hover:bg-emerald-600 text-white',
    bullet: '#10b981'
  }
}

// ==================== PRODUCT CARD ====================
function ProductCard({ product, className }: { product: Product; className?: string }) {
  const { addItem } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    toast({ title: "Added to Cart! 🛒", description: `${product.name} has been added.` })
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const discount = product.originalPrice ? getDiscountPercentage(product.originalPrice, product.price) : 0

  return (
    <Link href={`/product/${product.slug}`} className={cn("block h-full select-none touch-manipulation", className)} draggable={false}>
      <div 
        className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100 h-full flex flex-col shadow-sm hover:shadow-xl active:scale-[0.98] transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 480px) 80vw, (max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={cn("object-cover object-center transition-transform duration-500", isHovered && "scale-105")}
            draggable={false}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />

          {/* Badges */}
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1.5 sm:gap-2 z-10">
            {product.isNew && (
              <Badge className="bg-primary text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5">
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />NEW
              </Badge>
            )}
            {discount > 0 && (
              <Badge className="bg-red-500 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5">-{discount}%</Badge>
            )}
          </div>

          {/* Wishlist - larger touch target on mobile */}
          <button
            onClick={handleWishlist}
            className="absolute top-2 sm:top-3 right-2 sm:right-3 p-2.5 sm:p-2 bg-white/90 rounded-full shadow-md z-10 hover:scale-110 active:scale-95 transition-transform"
          >
            <Heart className={cn("w-4 h-4 sm:w-4 sm:h-4", isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-600")} />
          </button>

          {/* Quick Actions - hidden on mobile, shown on hover for desktop */}
          <motion.div 
            className="absolute inset-x-0 bottom-0 p-2 sm:p-3 bg-gradient-to-t from-black/70 to-transparent hidden sm:block"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex gap-2">
              <Button size="sm" className="flex-1 bg-white text-black hover:bg-gray-100 text-xs sm:text-sm h-8 sm:h-9" onClick={handleAddToCart}>
                <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />Add
              </Button>
              <Button size="sm" variant="outline" className="bg-white/20 border-white text-white hover:bg-white/30 h-8 sm:h-9">
                <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Button>
            </div>
          </motion.div>

          {/* Mobile Add to Cart Button - visible only on mobile */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-2 right-2 p-2 bg-primary text-white rounded-full shadow-lg z-10 sm:hidden active:scale-95 transition-transform"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 flex-1 flex flex-col">
          <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mb-0.5 sm:mb-1">
            {product.category.replace("-", " ")}
          </p>
          <h3 className="font-semibold text-xs sm:text-sm line-clamp-2 group-hover:text-primary transition-colors flex-1">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-0.5 sm:gap-1 mt-1.5 sm:mt-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={cn("w-2.5 h-2.5 sm:w-3 sm:h-3", i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200")} />
            ))}
            <span className="text-[10px] sm:text-xs text-gray-500 ml-0.5 sm:ml-1">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
            <span className="text-base sm:text-lg font-bold text-primary">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs sm:text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          {/* Stock */}
          <p className={cn("text-[10px] sm:text-xs mt-1.5 sm:mt-2 flex items-center gap-1", product.inStock ? "text-green-600" : "text-red-500")}>
            <span className={cn("w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full", product.inStock ? "bg-green-500" : "bg-red-500")} />
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>
        </div>
      </div>
    </Link>
  )
}

// ==================== SMOOTH CAROUSEL ====================
function SmoothCarousel({ products, accentColor, showPagination, autoplayDelay, loop }: {
  products: Product[]
  accentColor: keyof typeof accentColors
  showPagination: boolean
  autoplayDelay: number
  loop: boolean
}) {
  const colors = accentColors[accentColor]
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex gap-4 overflow-hidden">
        {products.slice(0, 4).map((product) => (
          <div key={product.id} className="flex-shrink-0 w-[280px]">
            <div className="bg-gray-100 rounded-2xl aspect-square animate-pulse" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-100 rounded animate-pulse" />
              <div className="h-4 bg-gray-100 rounded w-2/3 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <Swiper
      modules={[Pagination, Autoplay, FreeMode]}
      spaceBetween={16}
      slidesPerView={1.2}
      freeMode={{ enabled: true, momentum: true, momentumRatio: 0.5 }}
      grabCursor={true}
      autoplay={{ delay: autoplayDelay, disableOnInteraction: false, pauseOnMouseEnter: true }}
      pagination={showPagination ? { clickable: true, dynamicBullets: true } : false}
      loop={loop && products.length > 4}
      breakpoints={{
        400: { slidesPerView: 1.5, spaceBetween: 16 },
        500: { slidesPerView: 2, spaceBetween: 16 },
        640: { slidesPerView: 2.5, spaceBetween: 20 },
        768: { slidesPerView: 3, spaceBetween: 20 },
        1024: { slidesPerView: 4, spaceBetween: 24 },
        1280: { slidesPerView: 4.5, spaceBetween: 24 },
      }}
      className="!pb-12"
      style={{ '--swiper-pagination-color': colors.bullet, '--swiper-pagination-bullet-inactive-color': '#d1d5db' } as React.CSSProperties}
    >
      {products.map((product, index) => (
        <SwiperSlide key={product.id} className="!h-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="h-full"
          >
            <ProductCard product={product} />
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

// ==================== COVERFLOW CAROUSEL ====================
function CoverflowCarousel({ products, accentColor, autoplayDelay, loop }: {
  products: Product[]
  accentColor: keyof typeof accentColors
  autoplayDelay: number
  loop: boolean
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const colors = accentColors[accentColor]
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-[300px] bg-gray-100 rounded-2xl aspect-[4/5] animate-pulse" />
      </div>
    )
  }

  return (
    <div className="py-4">
      <Swiper
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1.3}
        coverflowEffect={{ rotate: 0, stretch: 0, depth: 150, modifier: 2, slideShadows: false }}
        autoplay={{ delay: autoplayDelay, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true, dynamicBullets: true }}
        loop={loop && products.length > 3}
        breakpoints={{
          500: { slidesPerView: 1.5 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 2.5 },
          1280: { slidesPerView: 3 },
        }}
        className="!pb-12"
        style={{ '--swiper-pagination-color': colors.bullet, '--swiper-pagination-bullet-inactive-color': '#d1d5db' } as React.CSSProperties}
      >
        {products.map((product, index) => (
          <SwiperSlide key={product.id}>
            <motion.div
              animate={{ scale: index === activeIndex ? 1 : 0.9, opacity: index === activeIndex ? 1 : 0.6 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

// ==================== MINIMAL CAROUSEL ====================
function MinimalCarousel({ products, accentColor, autoplayDelay }: {
  products: Product[]
  accentColor: keyof typeof accentColors
  autoplayDelay: number
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const colors = accentColors[accentColor]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length)
    }, autoplayDelay)
    return () => clearInterval(interval)
  }, [products.length, autoplayDelay])

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          {products.map((product) => (
            <div key={product.id} className="w-full flex-shrink-0 px-4 sm:w-1/2 md:w-1/3 lg:w-1/4">
              <ProductCard product={product} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentIndex ? `w-6 ${colors.button}` : "bg-gray-300 hover:bg-gray-400"
            )}
          />
        ))}
      </div>
    </div>
  )
}

// ==================== MAIN COMPONENT ====================
export default function ProductCarousel({
  products,
  variant = 'smooth',
  title,
  subtitle,
  showPagination = true,
  autoplay = true,
  autoplayDelay = 5000,
  loop = true,
  className,
  showViewAll = false,
  viewAllLink = '/shop',
  accentColor = 'primary'
}: ProductCarouselProps) {
  const colors = accentColors[accentColor]

  if (!products || products.length === 0) return null

  return (
    <section className={cn("py-10 md:py-16 overflow-hidden", `bg-gradient-to-br ${colors.bg}`, className)}>
      <div className="container mx-auto px-4">
        {/* Header */}
        {(title || subtitle || showViewAll) && (
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              {title && <h2 className="text-2xl md:text-3xl font-bold mb-1">{title}</h2>}
              {subtitle && <p className="text-gray-500">{subtitle}</p>}
            </motion.div>

            {showViewAll && (
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <Link href={viewAllLink}>
                  <Button variant="outline" size="sm" className="group">
                    View All
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>
        )}

        {/* Carousel */}
        {(variant === 'smooth' || variant === 'standard') && (
          <SmoothCarousel
            products={products}
            accentColor={accentColor}
            showPagination={showPagination}
            autoplayDelay={autoplayDelay}
            loop={loop}
          />
        )}

        {variant === 'coverflow' && (
          <CoverflowCarousel
            products={products}
            accentColor={accentColor}
            autoplayDelay={autoplayDelay}
            loop={loop}
          />
        )}

        {variant === 'minimal' && (
          <MinimalCarousel
            products={products}
            accentColor={accentColor}
            autoplayDelay={autoplayDelay}
          />
        )}
      </div>
    </section>
  )
}

export type { CarouselVariant, ProductCarouselProps }
