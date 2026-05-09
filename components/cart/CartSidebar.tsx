'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, ShoppingBag, Trash2, Gift } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'
import { formatPrice } from '@/lib/utils'

export default function CartSidebar() {
  const { 
    items, 
    isOpen, 
    closeCart, 
    removeItem, 
    updateQuantity,
    getSubtotal,
    getShipping,
    getTotal,
    getItemCount,
  } = useCartStore()

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [closeCart])

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const subtotal = getSubtotal()
  const shipping = getShipping()
  const total = getTotal()
  const itemCount = getItemCount()
  const freeShippingThreshold = 50 // This will be converted to ₹4,150 in display
  const progressToFreeShipping = Math.min((subtotal / freeShippingThreshold) * 100, 100)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:max-w-md bg-white shadow-2xl z-50 flex flex-col"
            style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10"
              style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), 1rem)' }}
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500" />
                <h2 className="font-heading font-bold text-lg sm:text-xl">Your Cart</h2>
                <span className="bg-primary-100 text-primary-500 text-xs sm:text-sm font-semibold px-2 py-0.5 rounded-full">
                  {itemCount}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-90"
                aria-label="Close cart"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            {subtotal > 0 && subtotal < freeShippingThreshold && (
              <div className="p-4 bg-gradient-to-r from-primary-50 to-secondary-50">
                <p className="text-sm text-gray-600 mb-2">
                  Add <span className="font-bold text-primary-500">{formatPrice(freeShippingThreshold - subtotal)}</span> more for FREE shipping! 🚚
                </p>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressToFreeShipping}%` }}
                    className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                  />
                </div>
              </div>
            )}
            {subtotal >= freeShippingThreshold && (
              <div className="p-4 bg-secondary-50 text-secondary-700 text-sm font-medium text-center">
                🎉 You&apos;ve unlocked FREE shipping!
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 10 }}
                    className="text-6xl mb-4"
                  >
                    🛒
                  </motion.div>
                  <h3 className="font-heading font-bold text-xl mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-6">Looks like you haven&apos;t added any items yet</p>
                  <Link href="/shop" onClick={closeCart}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-primary"
                    >
                      <span>Start Shopping</span>
                    </motion.button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={`${item.product.id}-${item.variant?.id || 'default'}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-4 p-3 bg-gray-50 rounded-xl"
                    >
                      {/* Product Image */}
                      <Link 
                        href={`/product/${item.product.slug}`}
                        onClick={closeCart}
                        className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden"
                      >
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link 
                          href={`/product/${item.product.slug}`}
                          onClick={closeCart}
                          className="font-semibold text-sm line-clamp-2 hover:text-primary-500 transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        {item.variant && (
                          <p className="text-xs text-gray-500 mt-0.5">
                            {item.variant.name}
                          </p>
                        )}
                        <p className="font-bold text-primary-500 mt-1">
                          {formatPrice(item.variant?.price || item.product.price)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1 bg-white rounded-lg border">
                            <button
                              onClick={() => updateQuantity(
                                item.product.id, 
                                item.quantity - 1,
                                item.variant?.id
                              )}
                              className="p-1.5 hover:bg-gray-100 rounded-l-lg transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center text-sm font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(
                                item.product.id, 
                                item.quantity + 1,
                                item.variant?.id
                              )}
                              className="p-1.5 hover:bg-gray-100 rounded-r-lg transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id, item.variant?.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t p-4 space-y-4">
                {/* Gift Wrap Option */}
                <label className="flex items-center gap-3 p-3 bg-accent-50 rounded-xl cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-accent-300 text-accent-500" />
                  <Gift className="w-5 h-5 text-accent-500" />
                  <div className="flex-1">
                    <span className="font-medium text-sm">Add gift wrap</span>
                    <span className="text-xs text-gray-500 ml-2">+$4.99</span>
                  </div>
                </label>

                {/* Order Summary */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className={shipping === 0 ? 'text-secondary-500 font-semibold' : 'font-semibold'}>
                      {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-primary-500">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/cart" onClick={closeCart}>
                    <button className="w-full btn-secondary py-3">
                      View Cart
                    </button>
                  </Link>
                  <Link href="/checkout" onClick={closeCart}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full btn-primary py-3"
                    >
                      <span>Checkout</span>
                    </motion.button>
                  </Link>
                </div>

                <p className="text-xs text-center text-gray-500">
                  🔒 Secure checkout powered by Stripe
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

