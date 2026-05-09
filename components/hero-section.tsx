"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Shield, Truck, Fish, Bird, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";


const heroSlides = [
  {
    title: "Premium Aquarium Fish",
    subtitle: "🐠 Exotic & Cloned Specimens",
    description: "Discover our stunning collection of premium cloned fish, tropical species, and rare exotic breeds. Every fish is carefully selected for perfect genetics and vibrant colors.",
    cta: "Explore Fish",
    link: "/shop/aquarium-fish",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920",
    badge: "🧬 CLONED FISH",
  },
  {
    title: "Exotic Birds Collection",
    subtitle: "🦜 Beautiful Feathered Friends",
    description: "From colorful parrots to melodious canaries, find your perfect winged companion. Hand-raised with love and expert care for a healthy, happy pet.",
    cta: "Shop Birds",
    link: "/shop/birds",
    image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=1920",
    badge: "🐦 BIRDS",
  },
  {
    title: "Arowana & Discus",
    subtitle: "👑 The Kings of Aquarium",
    description: "Own the most prestigious aquarium fish. Our cloned Asian Arowanas and Blue Diamond Discus feature championship genetics and breathtaking beauty.",
    cta: "View Premium",
    link: "/shop/aquarium-fish/cloned-fish",
    image: "https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=1920",
    badge: "✨ PREMIUM",
  },
  {
    title: "Complete Pet Care",
    subtitle: "🏠 Everything Your Pet Needs",
    description: "Aquariums, cages, food, accessories, and more. Get professional-grade equipment and supplies for happy, healthy pets.",
    cta: "Shop All",
    link: "/shop",
    image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=1920",
    badge: "🛒 FULL RANGE",
  },
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // 5 seconds autoplay - consistent with all carousels
    return () => clearInterval(interval);
  }, []);

  const slide = heroSlides[currentIndex];

  return (
    <section className="relative w-full min-h-[60vh] sm:min-h-[70vh] md:h-[85vh] overflow-hidden">
      {/* Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.image})` }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Gradient overlay - stronger on mobile for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/98 via-white/90 to-white/50 sm:from-white/95 sm:via-white/85 sm:to-white/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/70 sm:to-white/60" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 h-full flex items-center pt-4 pb-24 sm:pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl w-full"
          >
            <Badge className="mb-3 sm:mb-4 bg-sky-500 text-white hover:bg-sky-600 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm shadow-lg shadow-sky-500/25">
              {slide.badge}
            </Badge>
            
            <h2 className="text-base sm:text-lg md:text-xl text-sky-600 font-semibold mb-1 sm:mb-2">
              {slide.subtitle}
            </h2>
            
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-3 sm:mb-4 leading-tight text-slate-800">
              {slide.title}
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-slate-600 mb-5 sm:mb-8 max-w-xl line-clamp-3 sm:line-clamp-none">
              {slide.description}
            </p>
            
            {/* Buttons - Hidden on mobile (see globals.css .hero-buttons) */}
            <div className="hero-buttons flex">
              <Button asChild className="group bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 text-sm shadow-lg shadow-sky-500/25 h-11 rounded-xl">
                <Link href={slide.link}>
                  {slide.cta}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Indicators - Hidden on mobile, visible on tablet+ */}
      <div className="hero-indicators absolute bottom-14 sm:bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 hidden sm:flex items-center gap-1.5 z-20 bg-white/25 backdrop-blur-sm px-3 py-1.5 rounded-full">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 touch-manipulation ${
              i === currentIndex 
                ? "h-2 w-8 bg-sky-500 shadow-sm shadow-sky-500/50" 
                : "h-2 w-2 bg-slate-400/50 hover:bg-slate-500 active:scale-110"
            }`}
          />
        ))}
      </div>

      {/* Bottom Features Bar - Scrolling Marquee */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 overflow-hidden shadow-lg safe-area-bottom">
        <div className="py-2.5 sm:py-3 md:py-4">
          <motion.div
            className="flex items-center gap-6 sm:gap-8 md:gap-12 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {/* First set */}
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base font-medium px-3 sm:px-4 md:px-6 text-slate-700">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-emerald-500 flex-shrink-0" />
              <span>Live Arrival Guarantee</span>
            </div>
            <span className="text-sky-400 text-lg sm:text-xl md:text-2xl">•</span>
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base font-medium px-3 sm:px-4 md:px-6 text-slate-700">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-sky-500 flex-shrink-0" />
              <span>Fast Delivery</span>
            </div>
            <span className="text-sky-400 text-lg sm:text-xl md:text-2xl">•</span>
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base font-medium px-3 sm:px-4 md:px-6 text-slate-700">
              <Fish className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-cyan-500 flex-shrink-0" />
              <span>Premium Fish</span>
            </div>
            <span className="text-sky-400 text-lg sm:text-xl md:text-2xl">•</span>
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base font-medium px-3 sm:px-4 md:px-6 text-slate-700">
              <Bird className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-orange-500 flex-shrink-0" />
              <span>Exotic Birds</span>
            </div>
            <span className="text-sky-400 text-lg sm:text-xl md:text-2xl">•</span>
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base font-medium px-3 sm:px-4 md:px-6 text-slate-700">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-500 flex-shrink-0" />
              <span>Expert Care</span>
            </div>
            <span className="text-sky-400 text-lg sm:text-xl md:text-2xl">•</span>
            
            {/* Duplicate set for seamless loop */}
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base font-medium px-3 sm:px-4 md:px-6 text-slate-700">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-emerald-500 flex-shrink-0" />
              <span>Live Arrival Guarantee</span>
            </div>
            <span className="text-sky-400 text-lg sm:text-xl md:text-2xl">•</span>
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base font-medium px-3 sm:px-4 md:px-6 text-slate-700">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-sky-500 flex-shrink-0" />
              <span>Fast Delivery</span>
            </div>
            <span className="text-sky-400 text-lg sm:text-xl md:text-2xl">•</span>
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base font-medium px-3 sm:px-4 md:px-6 text-slate-700">
              <Fish className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-cyan-500 flex-shrink-0" />
              <span>Premium Fish</span>
            </div>
            <span className="text-sky-400 text-lg sm:text-xl md:text-2xl">•</span>
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base font-medium px-3 sm:px-4 md:px-6 text-slate-700">
              <Bird className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-orange-500 flex-shrink-0" />
              <span>Exotic Birds</span>
            </div>
            <span className="text-sky-400 text-lg sm:text-xl md:text-2xl">•</span>
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base font-medium px-3 sm:px-4 md:px-6 text-slate-700">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-500 flex-shrink-0" />
              <span>Expert Care</span>
            </div>
            <span className="text-sky-400 text-lg sm:text-xl md:text-2xl">•</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
