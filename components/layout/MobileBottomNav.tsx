'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  Search,
  Heart,
  ShoppingCart,
  User,
  Grid3X3,
  Fish
} from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'
import { useWishlistStore } from '@/store/useWishlistStore'
import { useUIStore } from '@/store/useUIStore'
import { useAuthStore } from '@/store/useAuthStore'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Shop', href: '/shop', icon: Grid3X3 },
  { name: 'Search', href: '#search', icon: Search, action: 'search' },
  { name: 'Wishlist', href: '#wishlist', icon: Heart, action: 'wishlist' },
  { name: 'Cart', href: '#cart', icon: ShoppingCart, action: 'cart' },
]

export default function MobileBottomNav() {
  const pathname = usePathname() ?? '/'
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  
  const { getItemCount: getCartCount, openCart } = useCartStore()
  const { getItemCount: getWishlistCount, openWishlist } = useWishlistStore()
  const { toggleSearch } = useUIStore()
  const { isAuthenticated } = useAuthStore()

  const cartCount = getCartCount()
  const wishlistCount = getWishlistCount()

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY < 100) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const handleItemClick = (item: typeof navItems[0]) => {
    if (item.action === 'cart') {
      openCart()
    } else if (item.action === 'wishlist') {
      openWishlist()
    } else if (item.action === 'search') {
      toggleSearch()
    }
  }

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100 shadow-2xl"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <div className="flex items-center justify-around px-2 py-2">
            {navItems.map((item) => {
              const isItemActive = isActive(item.href)
              const Icon = item.icon
              
              const content = (
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    'flex flex-col items-center justify-center py-2 px-4 rounded-2xl transition-all relative',
                    isItemActive 
                      ? 'bg-primary-50 text-primary-500' 
                      : 'text-gray-500 hover:text-primary-500'
                  )}
                >
                  <div className="relative">
                    <Icon className={cn(
                      'w-6 h-6 transition-all',
                      isItemActive && 'scale-110'
                    )} />
                    
                    {/* Badge for cart */}
                    {item.action === 'cart' && cartCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-primary-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                      >
                        {cartCount > 9 ? '9+' : cartCount}
                      </motion.span>
                    )}
                    
                    {/* Badge for wishlist */}
                    {item.action === 'wishlist' && wishlistCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                      >
                        {wishlistCount > 9 ? '9+' : wishlistCount}
                      </motion.span>
                    )}
                  </div>
                  
                  <span className={cn(
                    'text-[10px] font-medium mt-1 transition-all',
                    isItemActive ? 'text-primary-500' : 'text-gray-400'
                  )}>
                    {item.name}
                  </span>
                  
                  {/* Active indicator */}
                  {isItemActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full"
                    />
                  )}
                </motion.div>
              )
              
              if (item.action) {
                return (
                  <button
                    key={item.name}
                    onClick={() => handleItemClick(item)}
                    className="flex-1 flex items-center justify-center touch-feedback"
                  >
                    {content}
                  </button>
                )
              }
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex-1 flex items-center justify-center touch-feedback"
                >
                  {content}
                </Link>
              )
            })}
          </div>
          
          {/* Floating fish accent */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute -top-6 left-1/2 -translate-x-1/2"
          >
            <Link href="/shop?category=live-fish">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30"
              >
                <Fish className="w-7 h-7 text-white" />
              </motion.div>
            </Link>
          </motion.div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
