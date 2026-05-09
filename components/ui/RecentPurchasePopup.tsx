'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, MapPin } from 'lucide-react'
import { products } from '@/lib/mockData'
import { formatPrice } from '@/lib/utils'

const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
  'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
  'Chandigarh', 'Kochi', 'Gurgaon', 'Noida', 'Indore',
  'Bhopal', 'Nagpur', 'Surat', 'Vadodara', 'Coimbatore'
]

const firstNames = [
  'Priya', 'Rahul', 'Ananya', 'Vikram', 'Sneha', 'Arjun', 'Kavya', 'Aditya',
  'Neha', 'Rohan', 'Pooja', 'Amit', 'Divya', 'Karan', 'Meera', 'Varun',
  'Anjali', 'Siddharth', 'Riya', 'Akash', 'Nisha', 'Deepak', 'Shreya', 'Manish'
]

export default function RecentPurchasePopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [purchase, setPurchase] = useState<{
    product: typeof products[0]
    buyer: string
    city: string
    timeAgo: string
  } | null>(null)

  useEffect(() => {
    // Show first popup after 15 seconds
    const initialTimeout = setTimeout(() => {
      showRandomPurchase()
    }, 15000)

    // Then show every 30-60 seconds
    const interval = setInterval(() => {
      const randomDelay = 30000 + Math.random() * 30000
      setTimeout(showRandomPurchase, randomDelay)
    }, 60000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [])

  const showRandomPurchase = () => {
    const randomProduct = products[Math.floor(Math.random() * products.length)]
    const randomCity = cities[Math.floor(Math.random() * cities.length)]
    const randomName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const timeAgo = Math.floor(Math.random() * 5) + 1

    setPurchase({
      product: randomProduct,
      buyer: randomName,
      city: randomCity,
      timeAgo: `${timeAgo} minute${timeAgo > 1 ? 's' : ''} ago`
    })
    setIsVisible(true)

    // Auto hide after 5 seconds
    setTimeout(() => {
      setIsVisible(false)
    }, 5000)
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!purchase) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className="fixed bottom-4 left-4 z-40 max-w-sm"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>

            <div className="flex gap-3 p-3">
              {/* Product Image */}
              <Link href={`/product/${purchase.product.slug}`} onClick={handleClose}>
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={purchase.product.images[0]}
                    alt={purchase.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                  <ShoppingBag className="w-3 h-3" />
                  <span>Someone just bought this!</span>
                </div>
                <Link 
                  href={`/product/${purchase.product.slug}`} 
                  onClick={handleClose}
                  className="font-semibold text-sm text-dark hover:text-primary-500 
                             transition-colors line-clamp-1"
                >
                  {purchase.product.name}
                </Link>
                <div className="flex items-center gap-2 mt-1 text-xs">
                  <span className="flex items-center gap-1 text-gray-500">
                    <MapPin className="w-3 h-3" />
                    {purchase.buyer} in {purchase.city}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{purchase.timeAgo}</p>
              </div>
            </div>

            {/* Progress bar for auto-close */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 5, ease: 'linear' }}
              className="h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

