'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

interface LoadingScreenProps {
  /** Show the loader (controlled) */
  isLoading?: boolean
  /** Show video in the loader */
  showVideo?: boolean
  /** Minimum time to show loader (ms) */
  minDuration?: number
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'full'
  /** Show progress bar */
  showProgress?: boolean
  /** Custom message */
  message?: string
}

export function LoadingScreen({
  isLoading = true,
  showVideo = true,
  minDuration = 2000,
  size = 'full',
  showProgress = true,
  message = 'Loading...'
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const rainbowColors = ['#FF6B6B', '#FF9F43', '#FECA57', '#48DBFB', '#0ABDE3', '#1DD1A1']
  const aquaColors = ['#00D2D3', '#01A3A4', '#0097A7', '#00838F']

  // Progress timer
  useEffect(() => {
    if (!showProgress) return

    const startTime = Date.now()
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / minDuration) * 100, 100)
      setProgress(newProgress)

      if (newProgress < 100) {
        requestAnimationFrame(updateProgress)
      }
    }

    requestAnimationFrame(updateProgress)
  }, [minDuration, showProgress])

  // Video handlers
  const handleVideoLoad = useCallback(() => {
    setVideoLoaded(true)
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  const handleVideoError = useCallback(() => {
    setVideoError(true)
  }, [])

  // Size classes
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    full: 'fixed inset-0'
  }

  const videoSizes = {
    sm: 'w-[120px]',
    md: 'w-[180px]',
    lg: 'w-[260px]',
    full: 'w-[320px] sm:w-[400px]'
  }

  const textSizes = {
    sm: 'text-xl sm:text-2xl',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-3xl sm:text-4xl',
    full: 'text-4xl sm:text-5xl md:text-6xl'
  }

  const subTextSizes = {
    sm: 'text-sm',
    md: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl',
    full: 'text-xl sm:text-2xl md:text-3xl'
  }

  if (!isLoading) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`${sizeClasses[size]} z-[9999] flex flex-col items-center justify-center bg-white overflow-hidden ${size === 'full' ? '' : 'rounded-2xl shadow-xl'}`}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0ea5e9 1px, transparent 0)`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      {/* Floating bubbles */}
      {size === 'full' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`bubble-${i}`}
              className="absolute rounded-full"
              style={{
                width: 6 + i * 3,
                height: 6 + i * 3,
                left: `${12 + i * 14}%`,
                bottom: -15,
                background: 'radial-gradient(circle at 30% 30%, rgba(14, 165, 233, 0.35), rgba(14, 165, 233, 0.1))',
              }}
              animate={{
                y: [0, -700],
                x: [0, Math.sin(i * 0.6) * 15, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 6 + i * 0.4,
                delay: i * 0.6,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        
        {/* Video */}
        {showVideo && (
          <motion.div 
            className={`relative ${videoSizes[size]} aspect-video mb-4 sm:mb-6 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl shadow-cyan-500/20`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {/* Video Loading State */}
            {!videoLoaded && !videoError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-50 to-white">
                <motion.div
                  className="w-8 h-8 sm:w-10 sm:h-10 border-3 border-cyan-200 border-t-cyan-500 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              </div>
            )}

            {/* Video */}
            {!videoError && (
              <video
                ref={videoRef}
                src="/videos/rianbow loader bird.mp4"
                muted
                loop
                playsInline
                autoPlay
                preload="auto"
                onLoadedData={handleVideoLoad}
                onError={handleVideoError}
                className={`w-full h-full object-cover transition-opacity duration-400 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
            )}

            {/* Fallback */}
            {videoError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-100 to-teal-50">
                <motion.div 
                  className="text-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-4xl sm:text-5xl">🐦🐟</span>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}

        {/* Brand Name */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {/* RINBOW */}
          <div className="flex items-center justify-center mb-0.5">
            {['R', 'i', 'n', 'b', 'o', 'w'].map((letter, i) => (
              <motion.span
                key={`r-${i}`}
                className={`font-heading font-extrabold ${textSizes[size]}`}
                style={{ color: rainbowColors[i] }}
                initial={{ opacity: 0, y: 20, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: 0.4 + i * 0.06,
                  duration: 0.35,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* AQUA */}
          <div className="flex items-center justify-center">
            {['A', 'q', 'u', 'a'].map((letter, i) => (
              <motion.span
                key={`a-${i}`}
                className={`font-heading font-bold ${subTextSizes[size]} tracking-[0.15em]`}
                style={{ color: aquaColors[i] }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.85 + i * 0.06,
                  duration: 0.25,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Progress Bar */}
        {showProgress && (
          <motion.div 
            className="w-full max-w-[200px] sm:max-w-[260px] h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden mt-4 sm:mt-5"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ 
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #FF6B6B, #FF9F43, #FECA57, #48DBFB, #0ABDE3, #1DD1A1)',
              }}
            />
          </motion.div>
        )}

        {/* Message */}
        <motion.p
          className="text-gray-400 text-xs sm:text-sm mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {message}
        </motion.p>

        {/* Bouncing creatures */}
        <motion.div
          className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {['🐠', '🐦', '🐟', '🦜', '🐡'].map((item, i) => (
            <motion.span
              key={i}
              className="text-sm sm:text-lg"
              style={{ opacity: 0.65 }}
              animate={{ y: [-3, 3, -3] }}
              transition={{
                duration: 0.65,
                repeat: Infinity,
                delay: i * 0.1,
                ease: 'easeInOut',
              }}
            >
              {item}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Powered by - only for full size */}
      {size === 'full' && (
        <motion.a
          href="https://www.thisaitech.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 sm:bottom-4 text-gray-300 text-[10px] sm:text-xs hover:text-cyan-400 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Powered by ThisAI Technologies
        </motion.a>
      )}
    </motion.div>
  )
}

export default LoadingScreen

