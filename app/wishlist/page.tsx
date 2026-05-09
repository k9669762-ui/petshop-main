'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Heart, ShoppingCart, Trash2, Star, ArrowRight, 
  Share2, ShoppingBag, PawPrint, X, Package, 
  Check, AlertCircle, Loader2
} from 'lucide-react'
import { useWishlistStore } from '@/store/useWishlistStore'
import { useCartStore } from '@/store/useCartStore'
import { useAuthStore } from '@/store/useAuthStore'
import { formatPrice } from '@/lib/utils'
import { Product } from '@/types'

export default function WishlistPage() {
  const router = useRouter()
  const { items, removeItem, clearWishlist } = useWishlistStore()
  const { addItem: addToCart, openCart } = useCartStore()
  const { isAuthenticated, currentUser, createOrder } = useAuthStore()
  
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [isOrdering, setIsOrdering] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    openCart()
  }

  const handleRemove = (id: string) => {
    setRemovingId(id)
    setTimeout(() => {
      removeItem(id)
      setRemovingId(null)
      setSelectedItems(prev => prev.filter(i => i !== id))
    }, 300)
  }

  const handleAddAllToCart = () => {
    items.forEach(item => {
      addToCart(item.product)
    })
    openCart()
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My BowPaw Wishlist',
          text: `Check out my wishlist with ${items.length} items!`,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    }
  }

  const toggleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(items.map(i => i.product.id))
    }
  }

  const getSelectedItems = () => {
    return items.filter(item => selectedItems.includes(item.product.id))
  }

  const getSelectedTotal = () => {
    return getSelectedItems().reduce((sum, item) => sum + item.product.price, 0)
  }

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    if (selectedItems.length === 0) {
      return
    }

    setShowOrderModal(true)
  }

  const handleConfirmOrder = async () => {
    if (!currentUser || !currentUser.address) {
      router.push('/account')
      return
    }

    setIsOrdering(true)

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 1500))

    const selectedProducts = getSelectedItems()
    const subtotal = getSelectedTotal()
    const shipping = subtotal > 2000 ? 0 : 99
    const tax = Math.round(subtotal * 0.09)
    const total = subtotal + shipping + tax

    const order = createOrder({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email || '',
      userPhone: `+91 ${currentUser.mobile}`,
      items: selectedProducts.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.images[0],
        price: item.product.price,
        quantity: 1,
      })),
      subtotal,
      shipping,
      tax,
      total,
      status: 'pending',
      shippingAddress: currentUser.address,
      paymentMethod: 'COD',
      paymentStatus: 'pending',
    })

    // Remove ordered items from wishlist
    selectedProducts.forEach(item => removeItem(item.product.id))
    setSelectedItems([])
    
    setOrderId(order.id)
    setIsOrdering(false)
    setOrderSuccess(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Background Paw Prints */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-5">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              transform: `rotate(${-30 + i * 20}deg)`,
            }}
          >
            <PawPrint className="w-24 h-24 text-primary-500" />
          </div>
        ))}
      </div>

      <div className="container-custom relative">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <h1 className="font-heading font-bold text-3xl md:text-4xl text-dark flex items-center gap-3">
                <Heart className="w-8 h-8 text-red-500 fill-red-500" />
                My Wishlist
              </h1>
              <p className="text-gray-500 mt-1">
                {items.length} {items.length === 1 ? 'item' : 'items'} saved for later
              </p>
            </div>

            {items.length > 0 && (
              <div className="flex items-center gap-3 flex-wrap">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleShare}
                  className="px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddAllToCart}
                  className="px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add All to Cart
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Empty State */}
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-red-400" />
            </div>
            <h2 className="font-heading font-bold text-2xl text-dark mb-3">
              Your Wishlist is Empty
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Start adding items you love to your wishlist! Browse our collection and click the heart icon to save products for later.
            </p>
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-xl transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
                Start Shopping
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Select All & Buy Selected */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm p-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedItems.length === items.length && items.length > 0}
                  onChange={toggleSelectAll}
                  className="w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                />
                <span className="font-medium text-gray-700">
                  {selectedItems.length === items.length ? 'Deselect All' : 'Select All'}
                </span>
                {selectedItems.length > 0 && (
                  <span className="text-sm text-gray-500">
                    ({selectedItems.length} selected)
                  </span>
                )}
              </label>

              {selectedItems.length > 0 && (
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Selected Total</p>
                    <p className="font-bold text-lg text-primary-500">{formatPrice(getSelectedTotal())}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBuyNow}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow-lg shadow-green-500/30 hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    <Package className="w-5 h-5" />
                    Buy Now ({selectedItems.length})
                  </motion.button>
                </div>
              )}
            </motion.div>

            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {items.map((item, index) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: removingId === item.product.id ? 0 : 1, 
                      y: 0,
                      scale: removingId === item.product.id ? 0.8 : 1,
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.05 }}
                    className={`bg-white rounded-2xl shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-300 ${
                      selectedItems.includes(item.product.id) ? 'ring-2 ring-primary-500' : ''
                    }`}
                  >
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      {/* Checkbox */}
                      <div className="absolute top-3 left-3 z-10">
                        <label className="cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.product.id)}
                            onChange={() => toggleSelectItem(item.product.id)}
                            className="w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500 bg-white/90 backdrop-blur-sm"
                          />
                        </label>
                      </div>

                      <Link href={`/product/${item.product.slug}`}>
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </Link>

                      {/* Remove Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRemove(item.product.id)}
                        className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors group/btn"
                      >
                        <X className="w-5 h-5 text-gray-500 group-hover/btn:text-red-500 transition-colors" />
                      </motion.button>

                      {/* Sale Badge */}
                      {item.product.isOnSale && item.product.compareAtPrice && (
                        <div className="absolute bottom-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-lg">
                          {Math.round((1 - item.product.price / item.product.compareAtPrice) * 100)}% OFF
                        </div>
                      )}

                      {/* Heart Icon */}
                      <div className="absolute bottom-3 right-3">
                        <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
                          <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <Link href={`/product/${item.product.slug}`}>
                        <h3 className="font-medium text-dark hover:text-primary-500 transition-colors line-clamp-2 mb-2">
                          {item.product.name}
                        </h3>
                      </Link>

                      {/* Rating */}
                      {item.product.rating > 0 && (
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(item.product.rating)
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-200'
                              }`}
                            />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">
                            ({item.product.reviewCount})
                          </span>
                        </div>
                      )}

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="font-bold text-lg text-primary-500">
                          {formatPrice(item.product.price)}
                        </span>
                        {item.product.compareAtPrice && item.product.compareAtPrice > item.product.price && (
                          <span className="text-sm text-gray-400 line-through">
                            {formatPrice(item.product.compareAtPrice)}
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAddToCart(item.product)}
                          className="flex-1 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-md shadow-primary-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Cart
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setSelectedItems([item.product.id])
                            setShowOrderModal(true)
                          }}
                          className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow-md shadow-green-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                          <Package className="w-4 h-4" />
                          Buy
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Clear All */}
            {items.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-12 text-center"
              >
                <button
                  onClick={clearWishlist}
                  className="inline-flex items-center gap-2 px-6 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Wishlist
                </button>
              </motion.div>
            )}

            {/* Continue Shopping */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-center"
            >
              <Link href="/shop">
                <button className="inline-flex items-center gap-2 text-primary-500 font-medium hover:underline">
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Continue Shopping
                </button>
              </Link>
            </motion.div>
          </>
        )}
      </div>

      {/* Order Confirmation Modal */}
      <AnimatePresence>
        {showOrderModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isOrdering && !orderSuccess && setShowOrderModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
            >
              {orderSuccess ? (
                // Success State
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Check className="w-10 h-10 text-green-500" />
                  </motion.div>
                  <h2 className="font-heading font-bold text-2xl text-dark mb-2">
                    Order Placed! 🎉
                  </h2>
                  <p className="text-gray-500 mb-4">
                    Your order has been placed successfully.
                  </p>
                  <p className="text-sm text-gray-600 bg-gray-50 rounded-lg px-4 py-2 mb-6">
                    Order ID: <span className="font-mono font-bold text-primary-500">{orderId}</span>
                  </p>
                  <div className="flex gap-3">
                    <Link href="/account" className="flex-1">
                      <button className="w-full py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors">
                        View Orders
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        setShowOrderModal(false)
                        setOrderSuccess(false)
                        setOrderId(null)
                      }}
                      className="flex-1 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              ) : (
                // Confirmation State
                <>
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="font-heading font-bold text-xl flex items-center gap-2">
                      <Package className="w-6 h-6 text-green-500" />
                      Confirm Order
                    </h2>
                  </div>

                  <div className="p-6 max-h-[50vh] overflow-y-auto">
                    {!isAuthenticated ? (
                      <div className="text-center py-8">
                        <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">Please login to place an order</p>
                        <Link href="/login">
                          <button className="px-6 py-2 bg-primary-500 text-white rounded-xl">
                            Login
                          </button>
                        </Link>
                      </div>
                    ) : !currentUser?.address ? (
                      <div className="text-center py-8">
                        <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">Please add your delivery address first</p>
                        <Link href="/account">
                          <button className="px-6 py-2 bg-primary-500 text-white rounded-xl">
                            Add Address
                          </button>
                        </Link>
                      </div>
                    ) : (
                      <>
                        {/* Selected Items */}
                        <div className="space-y-3 mb-6">
                          {getSelectedItems().map(item => (
                            <div key={item.product.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                              <div className="w-16 h-16 rounded-lg overflow-hidden relative flex-shrink-0">
                                <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm line-clamp-1">{item.product.name}</p>
                                <p className="text-primary-500 font-bold">{formatPrice(item.product.price)}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Delivery Address */}
                        <div className="bg-gray-50 rounded-xl p-4 mb-6">
                          <p className="text-sm font-medium text-gray-700 mb-2">Deliver to:</p>
                          <p className="text-sm text-gray-600">
                            {currentUser.name}<br />
                            {currentUser.address.addressLine1}<br />
                            {currentUser.address.area}, {currentUser.address.city}<br />
                            {currentUser.address.district}, {currentUser.address.state} - {currentUser.address.pincode}
                          </p>
                        </div>

                        {/* Order Summary */}
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal ({selectedItems.length} items)</span>
                            <span>{formatPrice(getSelectedTotal())}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Shipping</span>
                            <span>{getSelectedTotal() > 2000 ? 'Free' : formatPrice(99)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Tax (9%)</span>
                            <span>{formatPrice(Math.round(getSelectedTotal() * 0.09))}</span>
                          </div>
                          <div className="flex justify-between font-bold text-lg pt-2 border-t">
                            <span>Total</span>
                            <span className="text-primary-500">
                              {formatPrice(
                                getSelectedTotal() + 
                                (getSelectedTotal() > 2000 ? 0 : 99) + 
                                Math.round(getSelectedTotal() * 0.09)
                              )}
                            </span>
                          </div>
                        </div>

                        {/* Payment Method */}
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                          <p className="text-sm text-yellow-700">
                            💰 Payment Method: <strong>Cash on Delivery (COD)</strong>
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  {isAuthenticated && currentUser?.address && (
                    <div className="p-6 border-t border-gray-100 flex gap-3">
                      <button
                        onClick={() => setShowOrderModal(false)}
                        disabled={isOrdering}
                        className="flex-1 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleConfirmOrder}
                        disabled={isOrdering}
                        className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isOrdering ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Check className="w-5 h-5" />
                            Place Order
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
