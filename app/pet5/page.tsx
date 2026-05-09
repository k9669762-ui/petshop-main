"use client";

import { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Search,
  Filter,
  X,
  ChevronDown,
  Star,
  Heart,
  ShoppingCart,
  Eye,
  Bird,
  Fish,
  Sparkles,
  Check,
  SlidersHorizontal,
  Grid3X3,
  LayoutGrid,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  allPet5Products,
  pet5Filters,
  Pet5Product,
  Pet5Category,
} from "@/lib/pet5Data";

// Product Card Component
function ProductCard({ product, index }: { product: Pet5Product; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [showQuickView, setShowQuickView] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.05, duration: 0.4 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm 
                   hover:shadow-xl hover:border-sky-200 transition-all duration-300"
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isBestSeller && (
              <Badge className="bg-amber-500 text-white hover:bg-amber-600 shadow-lg">
                ⭐ Best Seller
              </Badge>
            )}
            {product.isNew && (
              <Badge className="bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg">
                ✨ New Arrival
              </Badge>
            )}
            {product.originalPrice && product.price && (
              <Badge className="bg-rose-500 text-white hover:bg-rose-600 shadow-lg">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute top-3 right-3 flex flex-col gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsFavorite(!isFavorite)}
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors
                ${isFavorite ? 'bg-rose-500 text-white' : 'bg-white text-slate-600 hover:text-rose-500'}`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowQuickView(true)}
              className="w-10 h-10 rounded-full bg-white text-slate-600 hover:text-sky-500 
                        flex items-center justify-center shadow-lg transition-colors"
            >
              <Eye className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Stock Status */}
          <div className="absolute bottom-3 left-3">
            {product.inStock ? (
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                <Check className="w-3 h-3 mr-1" /> In Stock
              </Badge>
            ) : (
              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">
                Pre-Order
              </Badge>
            )}
          </div>

          {/* Category Icon */}
          <div className="absolute bottom-3 right-3">
            <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
              {product.category === 'birds' && <span className="text-xl">🦜</span>}
              {product.category === 'freshwater-fish' && <span className="text-xl">🐠</span>}
              {product.category === 'marine-fish' && <span className="text-xl">🐟</span>}
              {product.category === 'accessories' && <span className="text-xl">🔧</span>}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category & Subcategory */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-slate-400 uppercase tracking-wide">
              {product.category.replace('-', ' ')}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-sky-500 font-medium">
              {product.subcategory}
            </span>
          </div>

          {/* Name */}
          <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2 group-hover:text-sky-600 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-slate-500">
              {product.rating} ({product.reviews})
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-500 mb-3 line-clamp-2">
            {product.description}
          </p>

          {/* Variants */}
          {product.variants.length > 0 && (
            <div className="mb-3 space-y-2">
              {product.variants.slice(0, 1).map((variant) => (
                <div key={variant.name}>
                  <label className="text-xs text-slate-500 mb-1 block">{variant.name}</label>
                  <div className="flex flex-wrap gap-1">
                    {variant.options.slice(0, 4).map((option) => (
                      <button
                        key={option}
                        onClick={() => setSelectedVariants({ ...selectedVariants, [variant.name]: option })}
                        className={`text-xs px-2 py-1 rounded-full border transition-colors
                          ${selectedVariants[variant.name] === option
                            ? 'border-sky-500 bg-sky-50 text-sky-600'
                            : 'border-slate-200 hover:border-sky-300'
                          }`}
                      >
                        {option}
                      </button>
                    ))}
                    {variant.options.length > 4 && (
                      <span className="text-xs text-slate-400 px-2 py-1">
                        +{variant.options.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            {product.price ? (
              <>
                <span className="text-xl font-bold text-slate-800">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </>
            ) : (
              <span className="text-lg font-semibold text-sky-600">
                Contact for Price
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              className="flex-1 bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-500/25"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              className="border-sky-200 text-sky-600 hover:bg-sky-50"
            >
              Enquiry
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {showQuickView && (
          <QuickViewModal
            product={product}
            onClose={() => setShowQuickView(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// Quick View Modal
function QuickViewModal({
  product,
  onClose,
}: {
  product: Pet5Product;
  onClose: () => void;
}) {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
                   md:w-full md:max-w-4xl md:max-h-[90vh] bg-white rounded-3xl shadow-2xl z-50 overflow-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-slate-100 rounded-full flex items-center 
                     justify-center text-slate-600 hover:bg-slate-200 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Images */}
          <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="aspect-square rounded-2xl overflow-hidden mb-4">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 justify-center">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors
                      ${selectedImage === i ? 'border-sky-500' : 'border-transparent'}`}
                  >
                    <Image src={img} alt="" width={64} height={64} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            
            {/* Badges */}
            <div className="absolute top-8 left-8 flex flex-col gap-2">
              {product.isBestSeller && (
                <Badge className="bg-amber-500 text-white">⭐ Best Seller</Badge>
              )}
              {product.isNew && (
                <Badge className="bg-emerald-500 text-white">✨ New Arrival</Badge>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-slate-400 uppercase tracking-wide">
                {product.category.replace('-', ' ')}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-sky-500 font-medium">
                {product.subcategory}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-2">{product.name}</h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-slate-500">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              {product.price ? (
                <>
                  <span className="text-3xl font-bold text-slate-800">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-slate-400 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                      <Badge className="bg-rose-100 text-rose-600">
                        Save ₹{(product.originalPrice - product.price).toLocaleString()}
                      </Badge>
                    </>
                  )}
                </>
              ) : (
                <span className="text-2xl font-semibold text-sky-600">
                  Contact for Price
                </span>
              )}
            </div>

            <p className="text-slate-600 mb-6">{product.description}</p>

            {/* Variants */}
            {product.variants.length > 0 && (
              <div className="space-y-4 mb-6">
                {product.variants.map((variant) => (
                  <div key={variant.name}>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">
                      {variant.name}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {variant.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => setSelectedVariants({ ...selectedVariants, [variant.name]: option })}
                          className={`px-4 py-2 rounded-lg border transition-colors
                            ${selectedVariants[variant.name] === option
                              ? 'border-sky-500 bg-sky-50 text-sky-600'
                              : 'border-slate-200 hover:border-sky-300'
                            }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Specifications */}
            {product.specifications && (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-slate-700 mb-2">Specifications</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="bg-slate-50 rounded-lg p-2">
                      <span className="text-xs text-slate-500">{key}</span>
                      <p className="text-sm font-medium text-slate-700">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium text-slate-700">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-50"
                >
                  -
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-500/25"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-sky-200 text-sky-600 hover:bg-sky-50"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {product.tags.slice(0, 5).map((tag) => (
                <Badge key={tag} variant="outline" className="text-slate-500">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// Filter Sidebar Component
function FilterSidebar({
  filters,
  setFilters,
  isOpen,
  setIsOpen,
}: {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -320 }}
        animate={{ x: isOpen ? 0 : -320 }}
        className={`fixed lg:sticky top-0 left-0 h-screen lg:h-auto w-80 bg-white border-r border-slate-200 
                    z-50 lg:z-auto overflow-y-auto lg:translate-x-0 lg:block
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Category Type */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Category</h4>
            <div className="space-y-2">
              {pet5Filters.types.map((type) => (
                <label
                  key={type.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(type.id as Pet5Category)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters({ ...filters, categories: [...filters.categories, type.id as Pet5Category] });
                      } else {
                        setFilters({ ...filters, categories: filters.categories.filter((c) => c !== type.id) });
                      }
                    }}
                    className="w-4 h-4 text-sky-500 rounded border-slate-300 focus:ring-sky-500"
                  />
                  <span className="text-lg">{type.icon}</span>
                  <span className="text-sm text-slate-600">{type.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Bird Species */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Bird Species</h4>
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {pet5Filters.birdSpecies.map((species) => (
                <label
                  key={species}
                  className="flex items-center gap-2 p-1.5 rounded hover:bg-slate-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.species.includes(species)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters({ ...filters, species: [...filters.species, species] });
                      } else {
                        setFilters({ ...filters, species: filters.species.filter((s) => s !== species) });
                      }
                    }}
                    className="w-4 h-4 text-sky-500 rounded border-slate-300 focus:ring-sky-500"
                  />
                  <span className="text-sm text-slate-600">{species}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Freshwater Fish Species */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Freshwater Fish</h4>
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {pet5Filters.freshwaterSpecies.map((species) => (
                <label
                  key={species}
                  className="flex items-center gap-2 p-1.5 rounded hover:bg-slate-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.species.includes(species)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters({ ...filters, species: [...filters.species, species] });
                      } else {
                        setFilters({ ...filters, species: filters.species.filter((s) => s !== species) });
                      }
                    }}
                    className="w-4 h-4 text-sky-500 rounded border-slate-300 focus:ring-sky-500"
                  />
                  <span className="text-sm text-slate-600">{species}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Marine Fish Species */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Marine Fish</h4>
            <div className="space-y-1">
              {pet5Filters.marineSpecies.map((species) => (
                <label
                  key={species}
                  className="flex items-center gap-2 p-1.5 rounded hover:bg-slate-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.species.includes(species)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters({ ...filters, species: [...filters.species, species] });
                      } else {
                        setFilters({ ...filters, species: filters.species.filter((s) => s !== species) });
                      }
                    }}
                    className="w-4 h-4 text-sky-500 rounded border-slate-300 focus:ring-sky-500"
                  />
                  <span className="text-sm text-slate-600">{species}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Price Range</h4>
            <div className="px-2">
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => setFilters({ ...filters, priceRange: value as [number, number] })}
                min={0}
                max={100000}
                step={500}
                className="mb-4"
              />
              <div className="flex justify-between text-sm text-slate-500">
                <span>₹{filters.priceRange[0].toLocaleString()}</span>
                <span>₹{filters.priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Availability</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
                  className="w-4 h-4 text-sky-500 rounded border-slate-300 focus:ring-sky-500"
                />
                <span className="text-sm text-slate-600">In Stock Only</span>
              </label>
              <label className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.newArrivals}
                  onChange={(e) => setFilters({ ...filters, newArrivals: e.target.checked })}
                  className="w-4 h-4 text-sky-500 rounded border-slate-300 focus:ring-sky-500"
                />
                <span className="text-sm text-slate-600">New Arrivals</span>
              </label>
              <label className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.bestSellers}
                  onChange={(e) => setFilters({ ...filters, bestSellers: e.target.checked })}
                  className="w-4 h-4 text-sky-500 rounded border-slate-300 focus:ring-sky-500"
                />
                <span className="text-sm text-slate-600">Best Sellers</span>
              </label>
            </div>
          </div>

          {/* Clear Filters */}
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setFilters({
              search: '',
              categories: [],
              species: [],
              priceRange: [0, 100000],
              inStock: false,
              newArrivals: false,
              bestSellers: false,
            })}
          >
            Clear All Filters
          </Button>
        </div>
      </motion.aside>
    </>
  );
}

// Filter State Interface
interface FilterState {
  search: string;
  categories: Pet5Category[];
  species: string[];
  priceRange: [number, number];
  inStock: boolean;
  newArrivals: boolean;
  bestSellers: boolean;
}

// Main Page Component
export default function Pet5Page() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    categories: [],
    species: [],
    priceRange: [0, 100000],
    inStock: false,
    newArrivals: false,
    bestSellers: false,
  });
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = [...allPet5Products];

    // Search
    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search) ||
          p.tags.some((t) => t.toLowerCase().includes(search))
      );
    }

    // Categories
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    // Species
    if (filters.species.length > 0) {
      result = result.filter((p) => filters.species.includes(p.subcategory));
    }

    // Price Range
    result = result.filter(
      (p) =>
        p.price === null ||
        (p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1])
    );

    // Stock
    if (filters.inStock) {
      result = result.filter((p) => p.inStock);
    }

    // New Arrivals
    if (filters.newArrivals) {
      result = result.filter((p) => p.isNew);
    }

    // Best Sellers
    if (filters.bestSellers) {
      result = result.filter((p) => p.isBestSeller);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // Featured - best sellers first
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return result;
  }, [filters, sortBy]);

  // Category stats
  const categoryStats = useMemo(() => {
    return {
      birds: allPet5Products.filter((p) => p.category === 'birds').length,
      freshwater: allPet5Products.filter((p) => p.category === 'freshwater-fish').length,
      marine: allPet5Products.filter((p) => p.category === 'marine-fish').length,
      accessories: allPet5Products.filter((p) => p.category === 'accessories').length,
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-cyan-500/10 to-teal-500/10" />
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-bounce">🦜</div>
        <div className="absolute top-40 right-20 text-5xl opacity-20" style={{ animation: 'float 3s ease-in-out infinite' }}>🐠</div>
        <div className="absolute bottom-20 left-1/3 text-4xl opacity-20" style={{ animation: 'float 4s ease-in-out infinite 1s' }}>🐟</div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
            <Link href="/" className="hover:text-sky-500">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-800 font-medium">Pet5 – Birds & Fish</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="mb-4 bg-sky-100 text-sky-700 hover:bg-sky-200 px-6 py-2 text-sm font-semibold">
              🦜 Birds & 🐠 Fish Collection
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-4">
              Pet5 –{" "}
              <span className="bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
                Birds & Fish
              </span>
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              Discover our complete collection of exotic birds, freshwater fish, marine fish, and premium accessories.
            </p>

            {/* Category Stats */}
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { icon: '🦜', label: 'Birds', count: categoryStats.birds, color: 'bg-orange-100 text-orange-700' },
                { icon: '🐠', label: 'Freshwater', count: categoryStats.freshwater, color: 'bg-cyan-100 text-cyan-700' },
                { icon: '🐟', label: 'Marine', count: categoryStats.marine, color: 'bg-blue-100 text-blue-700' },
                { icon: '🔧', label: 'Accessories', count: categoryStats.accessories, color: 'bg-slate-100 text-slate-700' },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05 }}
                  className={`${stat.color} px-4 py-2 rounded-full flex items-center gap-2 cursor-pointer`}
                  onClick={() => {
                    const categoryMap: Record<string, Pet5Category> = {
                      'Birds': 'birds',
                      'Freshwater': 'freshwater-fish',
                      'Marine': 'marine-fish',
                      'Accessories': 'accessories',
                    };
                    setFilters({ ...filters, categories: [categoryMap[stat.label]] });
                  }}
                >
                  <span className="text-xl">{stat.icon}</span>
                  <span className="font-medium">{stat.label}</span>
                  <span className="bg-white/50 px-2 py-0.5 rounded-full text-sm">{stat.count}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Filter Sidebar */}
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              isOpen={sidebarOpen}
              setIsOpen={setSidebarOpen}
            />

            {/* Products Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    placeholder="Search birds, fish, accessories..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="pl-10 border-slate-200"
                  />
                </div>

                {/* Filter Button (Mobile) */}
                <Button
                  variant="outline"
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-sky-500 text-white' : 'bg-white text-slate-600'}`}
                  >
                    <LayoutGrid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('compact')}
                    className={`p-2 ${viewMode === 'compact' ? 'bg-sky-500 text-white' : 'bg-white text-slate-600'}`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                </div>

                {/* Results Count */}
                <span className="text-sm text-slate-500">
                  {filteredProducts.length} products
                </span>
              </div>

              {/* Active Filters */}
              {(filters.categories.length > 0 || filters.species.length > 0 || filters.search) && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {filters.search && (
                    <Badge variant="secondary" className="gap-1">
                      Search: {filters.search}
                      <button onClick={() => setFilters({ ...filters, search: '' })}>
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {filters.categories.map((cat) => (
                    <Badge key={cat} variant="secondary" className="gap-1">
                      {cat}
                      <button onClick={() => setFilters({ ...filters, categories: filters.categories.filter((c) => c !== cat) })}>
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                  {filters.species.map((spec) => (
                    <Badge key={spec} variant="secondary" className="gap-1">
                      {spec}
                      <button onClick={() => setFilters({ ...filters, species: filters.species.filter((s) => s !== spec) })}>
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
                }`}>
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">No products found</h3>
                  <p className="text-slate-500 mb-4">Try adjusting your filters or search terms</p>
                  <Button onClick={() => setFilters({
                    search: '',
                    categories: [],
                    species: [],
                    priceRange: [0, 100000],
                    inStock: false,
                    newArrivals: false,
                    bestSellers: false,
                  })}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

