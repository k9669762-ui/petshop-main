'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Search, X, TrendingUp } from 'lucide-react'
import { useUIStore } from '@/store/useUIStore'
import { searchProducts, products } from '@/lib/mockData'
import { formatPrice } from '@/lib/utils'
import { Product } from '@/types'

const trendingSearches = ['Dog Food', 'Cat Toys', 'Pet Beds', 'Treats', 'Grooming']

export default function SearchDropdown() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const { closeSearch } = useUIStore()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (query.length > 1) {
      const searchResults = searchProducts(query).slice(0, 6)
      setResults(searchResults)
    } else {
      setResults([])
    }
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query) {
      window.location.href = `/shop?search=${encodeURIComponent(query)}`
      closeSearch()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed sm:absolute inset-0 sm:inset-auto sm:top-full sm:left-0 sm:right-0 bg-white shadow-2xl sm:border-t z-50 overflow-y-auto"
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className="container-custom py-4 sm:py-6">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products..."
            className="w-full pl-11 sm:pl-14 pr-12 sm:pr-14 py-3 sm:py-4 text-base sm:text-lg border-2 border-gray-200 rounded-xl 
                       focus:outline-none focus:border-primary-500 transition-colors"
          />
          <button
            type="button"
            onClick={closeSearch}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-full active:scale-90"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </form>

        {/* Search Results */}
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6"
          >
            <h3 className="font-heading font-semibold text-gray-500 mb-4">Products</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {results.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={closeSearch}
                    className="block group"
                  >
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-2">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <p className="font-medium text-sm line-clamp-2 group-hover:text-primary-500 transition-colors">
                      {product.name}
                    </p>
                    <p className="text-primary-500 font-bold text-sm mt-1">
                      {formatPrice(product.price)}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
            <Link
              href={`/shop?search=${encodeURIComponent(query)}`}
              onClick={closeSearch}
              className="inline-block mt-4 text-primary-500 font-medium hover:underline"
            >
              View all results →
            </Link>
          </motion.div>
        )}

        {/* Trending Searches */}
        {!query && (
          <div className="mt-6">
            <h3 className="font-heading font-semibold text-gray-500 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Trending Searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-4 py-2 bg-gray-100 hover:bg-primary-100 hover:text-primary-500 
                             rounded-full text-sm font-medium transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Popular Products */}
        {!query && (
          <div className="mt-8">
            <h3 className="font-heading font-semibold text-gray-500 mb-4">Popular Products</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {products.filter(p => p.isBestSeller).slice(0, 6).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={closeSearch}
                    className="block group"
                  >
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-2">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <p className="font-medium text-sm line-clamp-2 group-hover:text-primary-500 transition-colors">
                      {product.name}
                    </p>
                    <p className="text-primary-500 font-bold text-sm mt-1">
                      {formatPrice(product.price)}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

