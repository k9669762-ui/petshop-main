'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PageLoaderProps {
  onLoadComplete?: () => void
}

export default function PageLoader({ onLoadComplete }: PageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const rainbowColors = ['#FF6B6B', '#FF9F43', '#FECA57', '#48DBFB', '#0ABDE3', '#1DD1A1']
  const rinbowLetters = ['R', 'i', 'n', 'b', 'o', 'w']
  const aquaLetters = ['A', 'q', 'u', 'a']
  const aquaColors = ['#00D2D3', '#01A3A4', '#0097A7', '#00838F']

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsLoading(false)
            onLoadComplete?.()
          }, 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(interval)
  }, [onLoadComplete])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
        >
          {/* Soft gradient */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0, 210, 211, 0.08) 0%, transparent 70%)',
            }}
          />

          {/* Floating fish */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {['🐠', '🐟', '🐡', '🦈', '🐳', '🐬'].map((fish, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl md:text-3xl"
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{
                  opacity: [0, 0.5, 0],
                  x: [0, Math.sin(i) * 30, 0],
                  y: [0, Math.cos(i) * 20, 0],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {fish}
              </motion.div>
            ))}
          </div>

          {/* Bubbles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gradient-to-br from-cyan-200/50 to-cyan-400/30"
                style={{
                  width: 8 + (i % 5) * 3,
                  height: 8 + (i % 5) * 3,
                  left: `${(i * 17 + 9) % 100}%`,
                  bottom: '-15px',
                  boxShadow: 'inset 1px 1px 3px rgba(255,255,255,0.8)',
                }}
                animate={{
                  y: [0, '-110vh'],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 3 + (i % 4) * 0.5,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>

          {/* Video Loader */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col items-center"
          >
            <div 
              className="w-40 h-40 md:w-52 md:h-52 bg-white rounded-2xl overflow-hidden"
              style={{
                boxShadow: '0 15px 50px rgba(0, 210, 211, 0.2), 0 8px 25px rgba(0, 0, 0, 0.08)',
              }}
            >
              <video
                ref={videoRef}
                src="/videos/rinbow-loader.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain"
              />
            </div>

            {/* Rainbow border */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                border: '2px solid transparent',
                background: 'linear-gradient(white, white) padding-box, linear-gradient(90deg, #FF6B6B, #FF9F43, #FECA57, #48DBFB, #0ABDE3, #1DD1A1) border-box',
              }}
            />

            {/* Orbiting fish */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 pointer-events-none"
            >
              {['🐠', '🐟'].map((fish, i) => (
                <motion.span
                  key={i}
                  className="absolute text-xl"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${i * 180}deg) translateY(-85px) translateX(-50%)`,
                  }}
                >
                  {fish}
                </motion.span>
              ))}
            </motion.div>

            {/* Brand Name */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-5 text-center"
            >
              <div className="flex items-center justify-center">
                {rinbowLetters.map((letter, i) => (
                  <span
                    key={i}
                    className="font-heading font-extrabold text-3xl md:text-4xl"
                    style={{
                      color: rainbowColors[i],
                      textShadow: `0 2px 8px ${rainbowColors[i]}30`,
                    }}
                  >
                    {letter}
                  </span>
                ))}
                <span className="mx-1" />
                {aquaLetters.map((letter, i) => (
                  <span
                    key={i}
                    className="font-heading font-bold text-3xl md:text-4xl tracking-wide"
                    style={{
                      color: aquaColors[i],
                      textShadow: `0 2px 8px ${aquaColors[i]}30`,
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-500 mt-2 text-sm flex items-center gap-1"
            >
              <span>🐠</span>
              <span>Your Premium Pet Paradise</span>
              <span>🐟</span>
            </motion.p>

            {/* Progress Bar */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 200, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-5 h-2 bg-gray-100 rounded-full overflow-hidden"
              style={{
                boxShadow: '0 2px 8px rgba(0, 210, 211, 0.15)',
              }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ 
                  width: `${Math.min(progress, 100)}%`,
                  background: 'linear-gradient(90deg, #FF6B6B, #FF9F43, #FECA57, #48DBFB, #0ABDE3, #1DD1A1)',
                }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>

            {/* Loading Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-gray-400 text-sm mt-3"
            >
              Loading... {Math.min(Math.round(progress), 100)}%
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Simple loading spinner
export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <motion.div
        className="relative w-16 h-16"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      >
        {['🐠', '🐟', '🐡', '🦈'].map((fish, i) => (
          <motion.span
            key={i}
            className="absolute text-xl"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 90}deg) translateY(-28px) translateX(-50%)`,
            }}
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            {fish}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}
