"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

export function LoadingScreen() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const rainbowColors = ['#FF6B6B', '#FF9F43', '#FECA57', '#48DBFB', '#0ABDE3', '#1DD1A1'];
  const rinbowLetters = ['R', 'i', 'n', 'b', 'o', 'w'];
  const aquaLetters = ['A', 'q', 'u', 'a'];
  const aquaColors = ['#00D2D3', '#01A3A4', '#0097A7', '#00838F'];
  const fishEmojis = ['🐠', '🐟', '🐡', '🦈', '🐳', '🐬'];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.6 }}
    >
      {/* Soft gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0, 210, 211, 0.08) 0%, transparent 70%)',
        }}
      />

      {/* Floating fish */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {fishEmojis.map((fish, i) => (
          <motion.div
            key={`fish-${i}`}
            className="absolute text-3xl md:text-4xl"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              opacity: [0, 0.6, 0],
              x: [0, Math.sin(i) * 40, 0],
              y: [0, Math.cos(i) * 30, 0],
              rotate: [0, i % 2 === 0 ? 20 : -20, 0],
            }}
            transition={{
              duration: 4,
              delay: i * 0.4,
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
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full bg-gradient-to-br from-cyan-200/60 to-cyan-400/40"
            style={{
              width: 10 + (i % 5) * 3,
              height: 10 + (i % 5) * 3,
              left: `${(i * 19 + 7) % 100}%`,
              bottom: '-20px',
              boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.8)',
            }}
            animate={{
              y: [0, '-115vh'],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 4 + (i % 4) * 0.6,
              delay: i * 0.3,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Video Loader */}
      <motion.div
        className="relative z-10 mb-6"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div 
          className="w-56 h-56 md:w-72 md:h-72 bg-white rounded-3xl overflow-hidden"
          style={{
            boxShadow: '0 20px 60px rgba(0, 210, 211, 0.25), 0 10px 30px rgba(0, 0, 0, 0.1)',
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
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            border: '3px solid transparent',
            background: 'linear-gradient(white, white) padding-box, linear-gradient(90deg, #FF6B6B, #FF9F43, #FECA57, #48DBFB, #0ABDE3, #1DD1A1) border-box',
          }}
        />

        {/* Orbiting fish */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 pointer-events-none"
        >
          {['🐠', '🐟', '🐡'].map((fish, i) => (
            <motion.span
              key={i}
              className="absolute text-2xl"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${i * 120}deg) translateY(-120px) translateX(-50%)`,
              }}
            >
              {fish}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Brand name */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-center mb-1">
          {rinbowLetters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.07 }}
              className="font-heading font-extrabold text-4xl md:text-5xl"
              style={{
                color: rainbowColors[i],
                textShadow: `0 2px 10px ${rainbowColors[i]}40`,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
        <div className="flex items-center justify-center">
          {aquaLetters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + i * 0.08 }}
              className="font-heading font-bold text-2xl md:text-3xl tracking-widest"
              style={{
                color: aquaColors[i],
                textShadow: `0 2px 8px ${aquaColors[i]}30`,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        <motion.p
          className="text-gray-500 text-sm md:text-base mt-3 flex items-center gap-2 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span>🐠</span>
          <span>Your Premium Pet Paradise</span>
          <span>🐟</span>
        </motion.p>

        {/* Loading bar */}
        <motion.div
          className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden mx-auto mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            boxShadow: '0 2px 10px rgba(0, 210, 211, 0.2)',
          }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #FF6B6B, #FF9F43, #FECA57, #48DBFB, #0ABDE3, #1DD1A1)',
            }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.1, duration: 1.3, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Powered by ThisAI */}
      <motion.div
        className="absolute bottom-6 flex items-center gap-2 text-gray-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          🐠
        </motion.span>
        <span className="text-xs font-medium">Powered by ThisAI Technologies</span>
        <motion.span
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          🐟
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
