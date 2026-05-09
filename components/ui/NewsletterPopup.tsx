'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Gift } from 'lucide-react'
import { useUIStore } from '@/store/useUIStore'

export default function NewsletterPopup() {
  const { isNewsletterOpen, hideNewsletter, hasSeenNewsletter, setHasSeenNewsletter } = useUIStore()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  // Show popup on exit intent (desktop) or after 10 seconds
  useEffect(() => {
    if (hasSeenNewsletter) return

    const timeout = setTimeout(() => {
      useUIStore.getState().showNewsletter()
    }, 10000)

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        useUIStore.getState().showNewsletter()
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      clearTimeout(timeout)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [hasSeenNewsletter])

  const handleClose = () => {
    hideNewsletter()
    setHasSeenNewsletter()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setTimeout(() => {
        handleClose()
        setSubmitted(false)
        setEmail('')
      }, 2000)
    }
  }

  return (
    <AnimatePresence>
      {isNewsletterOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Popup - Mobile Bottom Sheet / Desktop Center Modal */}
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 
                       w-full sm:w-[90%] sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl z-[60] overflow-hidden
                       max-h-[90vh] sm:max-h-none"
            style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
          >
            {/* Mobile Drag Handle */}
            <div className="sm:hidden flex justify-center pt-3 pb-1">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 bg-gray-100 sm:bg-white/80 backdrop-blur-sm rounded-full 
                         shadow hover:bg-gray-200 transition-colors z-10 active:scale-90"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Image Side - Mobile Mini Header */}
              <div className="sm:hidden bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-4 text-white">
                <div className="flex items-center gap-3">
                  <motion.span 
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-4xl"
                  >
                    🐾
                  </motion.span>
                  <div>
                    <h3 className="font-heading font-bold text-lg">Join Our Pack!</h3>
                    <p className="text-white/80 text-xs">
                      Exclusive deals & pet care tips
                    </p>
                  </div>
                </div>
              </div>

              {/* Desktop Image Side */}
              <div className="hidden md:block relative bg-gradient-to-br from-primary-500 to-secondary-500">
                <div className="absolute inset-0 flex items-center justify-center text-white p-8">
                  <div className="text-center">
                    <motion.span 
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="text-7xl block mb-4"
                    >
                      🐾
                    </motion.span>
                    <h3 className="font-heading font-bold text-2xl mb-2">Join Our Pack!</h3>
                    <p className="text-white/80 text-sm">
                      Get exclusive deals, pet care tips, and more delivered to your inbox.
                    </p>
                  </div>
                </div>
                {/* Decorative Elements */}
                <motion.span
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute top-4 left-4 text-3xl opacity-50"
                >
                  🦴
                </motion.span>
                <motion.span
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  className="absolute bottom-4 right-4 text-3xl opacity-50"
                >
                  🎾
                </motion.span>
              </div>

              {/* Form Side */}
              <div className="p-5 sm:p-8">
                {!submitted ? (
                  <>
                    <div className="hidden sm:flex items-center gap-2 text-primary-500 mb-4">
                      <Gift className="w-6 h-6" />
                      <span className="font-semibold">Special Offer</span>
                    </div>

                    <h2 className="font-heading font-bold text-xl sm:text-2xl md:text-3xl text-dark mb-2">
                      Get 15% Off 🎁
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
                      Subscribe to our newsletter and get <span className="font-bold text-primary-500">15% off</span> your first order!
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          required
                          className="w-full pl-12 pr-4 py-3.5 sm:py-3 text-base border-2 border-gray-200 rounded-xl
                                     focus:outline-none focus:border-primary-500 transition-colors"
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full btn-primary py-3.5 sm:py-3 text-base active:scale-[0.98]"
                      >
                        <span>Claim My 15% Off</span>
                      </motion.button>
                    </form>

                    <p className="text-[10px] sm:text-xs text-gray-500 text-center mt-3 sm:mt-4">
                      By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
                    </p>

                    <button
                      onClick={handleClose}
                      className="w-full mt-3 sm:mt-4 py-2 text-sm text-gray-500 hover:text-gray-700 active:scale-[0.98]"
                    >
                      No thanks, I&apos;ll pay full price
                    </button>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 sm:py-8"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: 2, duration: 0.3 }}
                      className="text-5xl sm:text-6xl block mb-4"
                    >
                      🎉
                    </motion.span>
                    <h3 className="font-heading font-bold text-xl sm:text-2xl text-dark mb-2">
                      You&apos;re In!
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Check your email for your discount code.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

