'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function InitialLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 250 : 900
    const startTime = Date.now()
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(newProgress)

      if (newProgress < 100) {
        requestAnimationFrame(updateProgress)
      } else {
        setTimeout(() => setIsLoading(false), 120)
      }
    }

    requestAnimationFrame(updateProgress)
  }, [])

  // Auto-play video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  const rainbowColors = ['#FF6B6B', '#FF9F43', '#FECA57', '#48DBFB', '#0ABDE3', '#1DD1A1']
  const aquaColors = ['#00D2D3', '#01A3A4', '#0097A7', '#00838F']

  return (
    <>
      {children}
      
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white overflow-hidden"
          >
            {/* Background Video */}
            <div className="absolute inset-0 overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: 0.15 }}
              >
                <source src="/videos/rinbow-loader-bird.mp4" type="video/mp4" />
              </video>
              {/* White overlay for better text readability */}
              <div className="absolute inset-0 bg-white/60" />
            </div>

            {/* Center Content */}
            <div className="relative z-10 flex flex-col items-center justify-center">

              {/* RINBOW */}
              <motion.div 
                className="flex items-center justify-center mb-1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                {['R', 'i', 'n', 'b', 'o', 'w'].map((letter, i) => (
                  <motion.span
                    key={i}
                    className="font-bold text-3xl sm:text-4xl md:text-5xl drop-shadow-sm"
                    style={{ color: rainbowColors[i] }}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.div>

              {/* AQUA */}
              <motion.div 
                className="flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {['A', 'q', 'u', 'a'].map((letter, i) => (
                  <motion.span
                    key={i}
                    className="font-semibold text-lg sm:text-xl md:text-2xl tracking-[0.2em]"
                    style={{ color: aquaColors[i] }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.05 }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.div>

              {/* Tagline */}
              <motion.p
                className="text-gray-400 text-xs sm:text-sm mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Your Premium Pet Paradise
              </motion.p>

              {/* Progress Bar with Parrot */}
              <motion.div 
                className="relative w-48 sm:w-56 mt-5"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.5 }}
              >
                {/* Flying Parrot that sits on progress bar */}
                <motion.div
                  className="absolute -top-6 sm:-top-7 z-10"
                  style={{ 
                    left: `calc(${Math.min(progress, 95)}% - 12px)`,
                    transition: 'left 0.1s linear'
                  }}
                  initial={{ opacity: 0, y: -30, x: -50 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    x: 0,
                    rotate: progress < 100 ? [0, -5, 5, 0] : 0
                  }}
                  transition={{ 
                    opacity: { delay: 0.3, duration: 0.3 },
                    y: { delay: 0.3, duration: 0.5, type: 'spring', bounce: 0.4 },
                    x: { delay: 0.3, duration: 0.5 },
                    rotate: { duration: 0.5, repeat: Infinity, ease: 'easeInOut' }
                  }}
                >
                  <span className="text-xl sm:text-2xl drop-shadow-md" style={{ display: 'inline-block' }}>
                    🦜
                  </span>
                  {/* Wing flap effect */}
                  {progress < 100 && (
                    <motion.span
                      className="absolute -right-1 top-1 text-xs opacity-50"
                      animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.8, 1.1, 0.8] }}
                      transition={{ duration: 0.3, repeat: Infinity }}
                    >
                      ✨
                    </motion.span>
                  )}
                </motion.div>

                {/* Progress Bar Line (Branch) */}
                <div className="h-2 bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 rounded-full shadow-inner border border-amber-300/50">
                  <div
                    className="h-full rounded-full relative"
                    style={{ 
                      width: `${progress}%`,
                      background: 'linear-gradient(90deg, #FF6B6B, #FF9F43, #FECA57, #48DBFB, #0ABDE3, #1DD1A1)',
                      transition: 'width 0.1s linear',
                      boxShadow: '0 0 10px rgba(14, 165, 233, 0.4)'
                    }}
                  />
                </div>

                {/* Little leaves on the branch */}
                <div className="absolute -left-2 top-0 text-[8px] opacity-60">🌿</div>
                <div className="absolute -right-2 top-0 text-[8px] opacity-60 scale-x-[-1]">🌿</div>
              </motion.div>

              <motion.p 
                className="text-gray-400 text-xs mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {Math.round(progress)}%
              </motion.p>

              {/* Flying birds in background */}
              <motion.div 
                className="flex items-center gap-3 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                {['🐠', '🐦', '🐟', '🦅', '🐡'].map((emoji, i) => (
                  <motion.span
                    key={i}
                    className="text-base sm:text-lg"
                    animate={{ 
                      y: [0, -6, 0],
                      x: emoji === '🐦' || emoji === '🦅' ? [0, 3, 0] : 0
                    }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Footer */}
            <motion.a
              href="https://www.thisaitech.com/"
              target="_blank"
              rel="noopener noreferrer" 
              className="absolute bottom-3 text-gray-300 text-[10px] sm:text-xs hover:text-cyan-400 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              Powered by ThisAI Technologies
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
