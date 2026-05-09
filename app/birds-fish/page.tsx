'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { 
  Filter, X, ChevronDown, ChevronUp, Star, Heart, ShoppingCart, 
  Eye, Sparkles, Award, SlidersHorizontal, Grid3X3, LayoutList, ArrowUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { birdsAndFishProducts, birdSpecies, freshwaterFishSpecies, marineFishSpecies } from '@/lib/birdsAndFishData'
import { useCartStore, useWishlistStore } from '@/lib/store'
import { formatPrice, getDiscountPercentage, cn } from '@/lib/utils'
import { toast } from '@/components/ui/use-toast'

export default function BirdsAndFishPage() {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('featured')
  const [showScrollTop, setShowScrollTop] = useState(false)
  
  // Filter states
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedBirdSpecies, setSelectedBirdSpecies] = useState<string[]>([])
  const [selectedFreshwaterSpecies, setSelectedFreshwaterSpecies] = useState<string[]>([])
  const [selectedMarineSpecies, setSelectedMarineSpecies] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [inStockOnly, setInStockOnly] = useState(false)
  const [newArrivalsOnly, setNewArrivalsOnly] = useState(false)
  
  // Expandable filter sections
  const [expandedSections, setExpandedSections] = useState({
    type: true,
    birdSpecies: false,
    freshwaterSpecies: false,
    marineSpecies: false,
    price: true,
    availability: true
  })

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Track scroll position for scroll-to-top button
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setShowScrollTop(window.scrollY > 400)
    })
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (selectedTypes.length > 0) count += selectedTypes.length
    if (inStockOnly) count++
    if (newArrivalsOnly) count++
    if (priceRange[0] > 0 || priceRange[1] < 100000) count++
    return count
  }, [selectedTypes, inStockOnly, newArrivalsOnly, priceRange])

  // Filter products
  const filteredProducts = useMemo(() => {
    let products = [...birdsAndFishProducts]

    // Filter by type
    if (selectedTypes.length > 0) {
      products = products.filter(p => {
        if (selectedTypes.includes('birds') && p.subcategory === 'birds') return true
        if (selectedTypes.includes('freshwater') && p.subcategory === 'freshwater-fish') return true
        if (selectedTypes.includes('marine') && p.subcategory === 'marine-fish') return true
        if (selectedTypes.includes('accessories') && p.subcategory === 'fish-accessories') return true
        return false
      })
    }

    // Filter by price
    products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Filter by stock
    if (inStockOnly) {
      products = products.filter(p => p.inStock)
    }

    // Filter by new arrivals
    if (newArrivalsOnly) {
      products = products.filter(p => p.isNew)
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        products.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case 'rating':
        products.sort((a, b) => b.rating - a.rating)
        break
      default:
        products.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
    }

    return products
  }, [selectedTypes, priceRange, inStockOnly, newArrivalsOnly, sortBy])

  const clearFilters = () => {
    setSelectedTypes([])
    setSelectedBirdSpecies([])
    setSelectedFreshwaterSpecies([])
    setSelectedMarineSpecies([])
    setPriceRange([0, 100000])
    setInStockOnly(false)
    setNewArrivalsOnly(false)
  }

  const FilterSection = ({ title, expanded, onToggle, children }: { 
    title: string, expanded: boolean, onToggle: () => void, children: React.ReactNode 
  }) => (
    <div className="border-b border-gray-100 py-3 sm:py-4">
      <button 
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left font-semibold text-gray-800 min-h-[44px] touch-manipulation"
      >
        {title}
        {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-3 space-y-1">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  const FilterSidebar = ({ onClose }: { onClose?: () => void }) => (
    <div className="space-y-1">
      {/* Type Filter */}
      <FilterSection title="Type" expanded={expandedSections.type} onToggle={() => toggleSection('type')}>
        {[
          { id: 'birds', label: '🐦 Birds' },
          { id: 'freshwater', label: '🐟 Freshwater Fish' },
          { id: 'marine', label: '🌊 Marine Fish' },
          { id: 'accessories', label: '🎯 Accessories' },
        ].map(type => (
          <label key={type.id} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 active:bg-gray-100 p-2.5 sm:p-2 rounded-lg touch-manipulation min-h-[44px]">
            <Checkbox
              checked={selectedTypes.includes(type.id)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedTypes([...selectedTypes, type.id])
                } else {
                  setSelectedTypes(selectedTypes.filter(t => t !== type.id))
                }
              }}
              className="w-5 h-5 sm:w-4 sm:h-4"
            />
            <span className="text-sm sm:text-sm">{type.label}</span>
          </label>
        ))}
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range" expanded={expandedSections.price} onToggle={() => toggleSection('price')}>
        <div className="px-1 py-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={0}
            max={100000}
            step={500}
            className="my-4"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span className="font-medium">{formatPrice(priceRange[0])}</span>
            <span className="font-medium">{formatPrice(priceRange[1])}</span>
          </div>
        </div>
      </FilterSection>

      {/* Availability */}
      <FilterSection title="Availability" expanded={expandedSections.availability} onToggle={() => toggleSection('availability')}>
        <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 active:bg-gray-100 p-2.5 sm:p-2 rounded-lg touch-manipulation min-h-[44px]">
          <Checkbox checked={inStockOnly} onCheckedChange={(checked) => setInStockOnly(!!checked)} className="w-5 h-5 sm:w-4 sm:h-4" />
          <span className="text-sm">In Stock Only</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 active:bg-gray-100 p-2.5 sm:p-2 rounded-lg touch-manipulation min-h-[44px]">
          <Checkbox checked={newArrivalsOnly} onCheckedChange={(checked) => setNewArrivalsOnly(!!checked)} className="w-5 h-5 sm:w-4 sm:h-4" />
          <span className="text-sm flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            New Arrivals
          </span>
        </label>
      </FilterSection>

      {/* Clear & Apply Buttons */}
      <div className="pt-4 space-y-2">
        <Button variant="outline" className="w-full h-11 text-sm" onClick={clearFilters}>
          Clear All Filters
        </Button>
        {onClose && (
          <Button className="w-full h-11 text-sm bg-gradient-to-r from-cyan-500 to-teal-500" onClick={onClose}>
            Show {filteredProducts.length} Products
          </Button>
        )}
      </div>
    </div>
  )

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section - Mobile Optimized */}
      <section className="relative bg-gradient-to-r from-cyan-600 via-teal-500 to-emerald-500 text-white py-10 sm:py-14 md:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/20" />
          {/* Decorative elements - hidden on very small screens, scaled down on mobile */}
          <div className="hidden sm:block absolute top-6 left-4 sm:top-10 sm:left-10 text-3xl sm:text-5xl md:text-6xl opacity-20">🐦</div>
          <div className="hidden sm:block absolute top-12 right-4 sm:top-20 sm:right-20 text-3xl sm:text-4xl md:text-5xl opacity-20">🐟</div>
          <div className="hidden sm:block absolute bottom-6 left-1/4 text-2xl sm:text-3xl md:text-4xl opacity-20">🐠</div>
          <div className="hidden sm:block absolute bottom-12 right-1/3 text-3xl sm:text-4xl md:text-5xl opacity-20">🦜</div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="bg-white/20 text-white mb-3 sm:mb-4 text-xs sm:text-sm px-3 py-1">New Category</Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4">
              🐦 Birds & Fish 🐟
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-4 sm:mb-6 px-2 leading-relaxed">
              Discover our premium collection of beautiful birds and exotic fish. 
              <span className="hidden sm:inline"> From colorful Budgies to majestic African Greys, vibrant Bettas to stunning Discus.</span>
            </p>
            {/* Mobile-optimized badges grid */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 sm:gap-3">
              <Badge className="bg-white text-cyan-700 px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm justify-center">11 Bird Species</Badge>
              <Badge className="bg-white text-cyan-700 px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm justify-center">14 Freshwater</Badge>
              <Badge className="bg-white text-cyan-700 px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm justify-center">5 Marine Fish</Badge>
              <Badge className="bg-white text-cyan-700 px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm justify-center">13 Accessories</Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-4 sm:py-6 md:py-8 lg:py-12">
        <div className="container mx-auto px-3 sm:px-4">
          {/* Mobile Sticky Filter Bar */}
          <div className="lg:hidden sticky top-14 sm:top-16 z-30 -mx-3 sm:-mx-4 px-3 sm:px-4 py-2.5 bg-white/95 backdrop-blur-md border-b shadow-sm mb-4">
            <div className="flex items-center justify-between gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 h-10 text-xs sm:text-sm relative"
                onClick={() => setMobileFilterOpen(true)}
              >
                <Filter className="w-4 h-4 mr-1.5" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-cyan-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
              
              <div className="flex border rounded-lg overflow-hidden bg-white">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn("p-2.5 touch-manipulation", viewMode === 'grid' ? 'bg-cyan-500 text-white' : 'bg-white text-gray-600')}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn("p-2.5 touch-manipulation", viewMode === 'list' ? 'bg-cyan-500 text-white' : 'bg-white text-gray-600')}
                >
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-lg px-2 sm:px-3 py-2 text-xs sm:text-sm bg-white h-10 flex-1 max-w-[140px] touch-manipulation"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Low to High</option>
                <option value="price-high">High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
            
            {/* Products count - mobile */}
            <p className="text-xs text-gray-500 mt-2 text-center">
              Showing <span className="font-semibold text-gray-700">{filteredProducts.length}</span> products
            </p>
          </div>

          {/* Desktop Top Bar */}
          <div className="hidden lg:flex justify-between items-center gap-4 mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
            </p>
            
            <div className="flex items-center gap-3">
              <div className="flex border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn("p-2", viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white')}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn("p-2", viewMode === 'list' ? 'bg-primary text-white' : 'bg-white')}
                >
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm bg-white"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          <div className="flex gap-6 lg:gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm p-5 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5" />
                    Filters
                  </h3>
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="text-xs">{activeFiltersCount} active</Badge>
                  )}
                </div>
                <FilterSidebar />
              </div>
            </aside>

            {/* Products Grid - Mobile Optimized */}
            <div className="flex-1 min-w-0">
              <div className={cn(
                "grid gap-3 sm:gap-4 md:gap-5 lg:gap-6",
                viewMode === 'grid' 
                  ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4" 
                  : "grid-cols-1"
              )}>
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} viewMode={viewMode} />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12 sm:py-16">
                  <div className="text-4xl sm:text-5xl mb-4">🔍</div>
                  <p className="text-gray-500 text-base sm:text-lg mb-4">No products found matching your filters.</p>
                  <Button variant="outline" className="h-11" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filter Drawer - Full Screen on Mobile */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 lg:hidden backdrop-blur-sm"
              onClick={() => setMobileFilterOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-[85vw] max-w-sm bg-white z-50 overflow-y-auto lg:hidden shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-4 border-b">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge className="bg-cyan-500 text-white text-xs ml-1">{activeFiltersCount}</Badge>
                  )}
                </h3>
                <button 
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full touch-manipulation"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Filter Content */}
              <div className="p-4 pb-8">
                <FilterSidebar onClose={() => setMobileFilterOpen(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button - Mobile */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-20 sm:bottom-8 right-4 sm:right-6 z-40 w-12 h-12 bg-cyan-500 text-white rounded-full shadow-lg flex items-center justify-center touch-manipulation active:scale-95 transition-transform"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  )
}

// Product Card Component - Mobile Optimized
function ProductCard({ product, index, viewMode }: { product: any, index: number, viewMode: 'grid' | 'list' }) {
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
  const isBestSeller = product.tags?.includes('best-seller')
  const isNewArrival = product.isNew || product.tags?.includes('new-arrival')

  // List View - Mobile Optimized
  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: Math.min(index * 0.02, 0.3) }}
      >
        <Link href={`/product/${product.slug}`}>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden flex hover:shadow-lg transition-shadow active:bg-gray-50 touch-manipulation">
            {/* Image - Responsive sizing */}
            <div className="relative w-24 h-24 sm:w-36 sm:h-36 md:w-44 md:h-44 flex-shrink-0 bg-gray-100">
              <Image 
                src={product.images[0]} 
                alt={product.name} 
                fill 
                sizes="(max-width: 640px) 96px, (max-width: 768px) 144px, 176px"
                className="object-cover object-center"
              />
              {/* Compact badges for mobile list view */}
              <div className="absolute top-1 left-1 flex flex-col gap-0.5">
                {isBestSeller && (
                  <Badge className="bg-amber-500 text-white text-[10px] sm:text-xs px-1.5 py-0.5">
                    <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5" />
                    <span className="hidden sm:inline">Best Seller</span>
                    <span className="sm:hidden">Best</span>
                  </Badge>
                )}
                {isNewArrival && (
                  <Badge className="bg-emerald-500 text-white text-[10px] sm:text-xs px-1.5 py-0.5">
                    <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5" />New
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Content - Responsive */}
            <div className="p-2.5 sm:p-3 md:p-4 flex-1 flex flex-col justify-between min-w-0">
              <div>
                <p className="text-[10px] sm:text-xs text-gray-500 uppercase mb-0.5 truncate">{product.subcategory?.replace('-', ' ')}</p>
                <h3 className="font-semibold text-xs sm:text-sm md:text-base mb-1 line-clamp-2 leading-snug">{product.name}</h3>
                <p className="text-gray-600 text-[10px] sm:text-xs md:text-sm line-clamp-2 mb-1 hidden sm:block">{product.description}</p>
                
                {/* Rating - Compact on mobile */}
                <div className="flex items-center gap-0.5 mb-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn("w-2.5 h-2.5 sm:w-3.5 sm:h-3.5", i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200")} />
                    ))}
                  </div>
                  <span className="text-[10px] sm:text-xs text-gray-500 ml-0.5">({product.reviews})</span>
                </div>
              </div>
              
              {/* Price & Actions */}
              <div className="flex items-center justify-between gap-2 mt-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                  <span className="text-sm sm:text-base md:text-lg font-bold text-primary">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-[10px] sm:text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                  )}
                </div>
                <div className="flex gap-1.5 sm:gap-2">
                  <Button size="sm" onClick={handleAddToCart} className="h-7 sm:h-8 px-2 sm:px-3 text-xs">
                    <ShoppingCart className="w-3.5 h-3.5 sm:mr-1" />
                    <span className="hidden sm:inline">Add</span>
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleWishlist} className="h-7 sm:h-8 w-7 sm:w-8 p-0">
                    <Heart className={cn("w-3.5 h-3.5", isInWishlist(product.id) && "fill-red-500 text-red-500")} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  // Grid View - Mobile Optimized
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: Math.min(index * 0.02, 0.3) }}
    >
      <Link href={`/product/${product.slug}`}>
        <div 
          className="bg-white rounded-lg sm:rounded-xl shadow-sm overflow-hidden hover:shadow-xl active:shadow-md transition-all duration-300 h-full flex flex-col group touch-manipulation"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image - Responsive aspect ratio */}
          <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-gray-100">
            <Image 
              src={product.images[0]} 
              alt={product.name} 
              fill 
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 33vw, 25vw"
              className={cn("object-cover object-center transition-transform duration-500", isHovered && "scale-105")} 
            />
            
            {/* Badges - Compact on mobile */}
            <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 flex flex-col gap-0.5 sm:gap-1">
              {isBestSeller && (
                <Badge className="bg-amber-500 text-white text-[9px] sm:text-xs px-1 sm:px-1.5 py-0.5">
                  <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5" />
                  <span className="hidden xs:inline">Best</span>
                </Badge>
              )}
              {isNewArrival && (
                <Badge className="bg-emerald-500 text-white text-[9px] sm:text-xs px-1 sm:px-1.5 py-0.5">
                  <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5" />New
                </Badge>
              )}
              {discount > 0 && (
                <Badge className="bg-red-500 text-white text-[9px] sm:text-xs px-1 sm:px-1.5 py-0.5">-{discount}%</Badge>
              )}
            </div>

            {/* Wishlist - Larger touch target */}
            <button
              onClick={handleWishlist}
              className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 p-1.5 sm:p-2 bg-white/90 rounded-full shadow-md active:scale-95 transition-transform touch-manipulation"
            >
              <Heart className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4", isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-600")} />
            </button>

            {/* Quick Actions - Desktop only hover */}
            <motion.div 
              className="hidden sm:block absolute inset-x-0 bottom-0 p-2 sm:p-3 bg-gradient-to-t from-black/70 to-transparent"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            >
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 bg-white text-black hover:bg-gray-100 h-8 text-xs" onClick={handleAddToCart}>
                  <ShoppingCart className="w-3.5 h-3.5 mr-1" />Add
                </Button>
                <Button size="sm" variant="outline" className="bg-white/20 border-white text-white h-8 w-8 p-0">
                  <Eye className="w-3.5 h-3.5" />
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Content - Compact on mobile */}
          <div className="p-2.5 sm:p-3 md:p-4 flex-1 flex flex-col">
            <p className="text-[10px] sm:text-xs text-gray-500 uppercase mb-0.5 truncate">{product.subcategory?.replace('-', ' ')}</p>
            <h3 className="font-medium sm:font-semibold text-xs sm:text-sm line-clamp-2 group-hover:text-primary transition-colors flex-1 leading-snug">
              {product.name}
            </h3>
            
            {/* Rating - Smaller on mobile */}
            <div className="flex items-center gap-0.5 mt-1.5 sm:mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn("w-2.5 h-2.5 sm:w-3 sm:h-3", i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200")} />
                ))}
              </div>
              <span className="text-[10px] sm:text-xs text-gray-500 ml-0.5">({product.reviews})</span>
            </div>

            {/* Variants - Hide on very small screens */}
            {product.variants && product.variants.length > 0 && (
              <p className="text-[10px] sm:text-xs text-cyan-600 mt-0.5 sm:mt-1 truncate">
                {product.variants[0].options.length} variants
              </p>
            )}

            {/* Price - Responsive */}
            <div className="flex items-baseline gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
              <span className="text-sm sm:text-base md:text-lg font-bold text-primary">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-[10px] sm:text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            {/* Stock & Add to Cart - Mobile optimized */}
            <div className="flex items-center justify-between mt-1.5 sm:mt-2">
              <p className={cn("text-[10px] sm:text-xs flex items-center gap-1", product.inStock ? "text-green-600" : "text-red-500")}>
                <span className={cn("w-1.5 h-1.5 rounded-full", product.inStock ? "bg-green-500" : "bg-red-500")} />
                <span className="hidden xs:inline">{product.inStock ? "In Stock" : "Out of Stock"}</span>
                <span className="xs:hidden">{product.inStock ? "Stock" : "Out"}</span>
              </p>
              
              {/* Mobile Add to Cart Button - Always visible */}
              <button
                onClick={handleAddToCart}
                className="sm:hidden flex items-center justify-center w-7 h-7 bg-cyan-500 text-white rounded-full shadow active:scale-95 transition-transform touch-manipulation"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

