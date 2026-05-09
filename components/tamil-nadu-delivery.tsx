"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { 
  Truck, 
  MapPin, 
  Clock, 
  Package, 
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Tamil Nadu Districts with delivery info
const tamilNaduDistricts = [
  { name: "Chennai", deliveryTime: "Same Day", icon: "🏙️", popular: true },
  { name: "Coimbatore", deliveryTime: "1-2 Days", icon: "🏭", popular: true },
  { name: "Madurai", deliveryTime: "1-2 Days", icon: "🛕", popular: true },
  { name: "Tiruchirappalli", deliveryTime: "2-3 Days", icon: "🏛️", popular: false },
  { name: "Salem", deliveryTime: "2-3 Days", icon: "⛰️", popular: false },
  { name: "Tirunelveli", deliveryTime: "2-3 Days", icon: "🌴", popular: false },
  { name: "Erode", deliveryTime: "2-3 Days", icon: "🌾", popular: false },
  { name: "Vellore", deliveryTime: "1-2 Days", icon: "🏰", popular: false },
  { name: "Thoothukudi", deliveryTime: "2-3 Days", icon: "⚓", popular: false },
  { name: "Thanjavur", deliveryTime: "2-3 Days", icon: "🛕", popular: true },
  { name: "Dindigul", deliveryTime: "2-3 Days", icon: "🏔️", popular: false },
  { name: "Kanchipuram", deliveryTime: "1 Day", icon: "🛕", popular: true },
  { name: "Tirupur", deliveryTime: "1-2 Days", icon: "👕", popular: true },
  { name: "Nagercoil", deliveryTime: "3-4 Days", icon: "🌊", popular: false },
  { name: "Cuddalore", deliveryTime: "2-3 Days", icon: "🏖️", popular: false },
  { name: "Karur", deliveryTime: "2-3 Days", icon: "🧵", popular: false },
  { name: "Sivakasi", deliveryTime: "2-3 Days", icon: "🎆", popular: false },
  { name: "Namakkal", deliveryTime: "2-3 Days", icon: "🥚", popular: false },
  { name: "Hosur", deliveryTime: "1 Day", icon: "🏭", popular: true },
  { name: "Kumbakonam", deliveryTime: "2-3 Days", icon: "🛕", popular: false },
  { name: "Rajapalayam", deliveryTime: "3-4 Days", icon: "🌿", popular: false },
  { name: "Pudukkottai", deliveryTime: "2-3 Days", icon: "🏛️", popular: false },
  { name: "Ambur", deliveryTime: "2-3 Days", icon: "👞", popular: false },
  { name: "Pollachi", deliveryTime: "2-3 Days", icon: "🥥", popular: false },
];

// Delivery highlights
const deliveryHighlights = [
  {
    title: "Fast Dispatch",
    description: "Orders dispatched within 24 hours",
    icon: Package,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    title: "Live Fish Care",
    description: "Special oxygen-packed shipping",
    icon: Sparkles,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
  },
  {
    title: "Track Order",
    description: "Real-time tracking available",
    icon: MapPin,
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    title: "Safe Delivery",
    description: "100% live arrival guarantee",
    icon: CheckCircle2,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
];

export function TamilNaduDeliveryCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section className="py-10 sm:py-16 bg-gradient-to-br from-orange-50 via-white to-green-50 relative overflow-hidden">
      {/* Tamil Nadu Border Pattern */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-white to-green-600" />
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-green-600 via-white to-orange-500" />
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 text-6xl opacity-10 hidden md:block">🛕</div>
      <div className="absolute bottom-10 right-10 text-6xl opacity-10 hidden md:block">🐟</div>

      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <Badge className="mb-3 bg-gradient-to-r from-orange-500 to-green-600 text-white">
            🚚 DELIVERY ACROSS TAMIL NADU
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            We Deliver to <span className="text-orange-500">All Districts</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Safe and fast delivery of live fish & birds to every corner of Tamil Nadu with special care packaging
          </p>
        </motion.div>

        {/* Delivery Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
          {deliveryHighlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${item.bgColor} rounded-xl p-3 sm:p-4 text-center`}
            >
              <div className={`${item.color} mx-auto mb-2`}>
                <item.icon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto" />
              </div>
              <h3 className="font-semibold text-xs sm:text-sm text-gray-800">{item.title}</h3>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-1">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Districts Carousel */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={12}
            slidesPerView={2}
            autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true, dynamicBullets: true }}
            loop={true}
            breakpoints={{
              480: { slidesPerView: 3, spaceBetween: 16 },
              640: { slidesPerView: 4, spaceBetween: 16 },
              768: { slidesPerView: 5, spaceBetween: 20 },
              1024: { slidesPerView: 6, spaceBetween: 20 },
              1280: { slidesPerView: 8, spaceBetween: 20 },
            }}
            onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
            className="!pb-12"
            style={{ 
              '--swiper-pagination-color': '#f97316',
              '--swiper-pagination-bullet-inactive-color': '#d1d5db'
            } as React.CSSProperties}
          >
            {tamilNaduDistricts.map((district, index) => (
              <SwiperSlide key={district.name}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.02 }}
                  className="relative"
                >
                  <div className={`
                    bg-white rounded-xl p-3 sm:p-4 text-center shadow-sm border
                    hover:shadow-lg hover:border-orange-200 transition-all duration-300
                    ${district.popular ? 'ring-2 ring-orange-200' : ''}
                  `}>
                    {district.popular && (
                      <div className="absolute -top-2 -right-2">
                        <Badge className="bg-orange-500 text-white text-[8px] px-1.5 py-0.5">
                          Popular
                        </Badge>
                      </div>
                    )}
                    <span className="text-2xl sm:text-3xl mb-2 block">{district.icon}</span>
                    <h4 className="font-semibold text-xs sm:text-sm text-gray-800 mb-1 truncate">
                      {district.name}
                    </h4>
                    <div className="flex items-center justify-center gap-1 text-[10px] sm:text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{district.deliveryTime}</span>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Dispatch Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-12 bg-gradient-to-r from-orange-500 to-green-600 rounded-2xl p-4 sm:p-6 text-white"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-white/20 rounded-full">
                <Truck className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div>
                <h3 className="font-bold text-lg sm:text-xl">Free Shipping on Orders Above ₹2000</h3>
                <p className="text-white/80 text-xs sm:text-sm">Special care packaging for live fish & birds</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-semibold">100% Live Arrival Guaranteed</span>
            </div>
          </div>
        </motion.div>

        {/* Tamil Nadu Map Hint */}
        <div className="mt-6 text-center">
          <p className="text-xs sm:text-sm text-gray-500">
            🗺️ Delivering to <span className="font-semibold text-orange-600">38 Districts</span> across Tamil Nadu
          </p>
        </div>
      </div>
    </section>
  );
}

