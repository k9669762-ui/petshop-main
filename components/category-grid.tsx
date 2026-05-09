"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Fish, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/lib/data";

const categoryIcons: Record<string, React.ReactNode> = {
  "aquarium-fish": <Fish className="w-8 h-8" />,
  "accessories": <Settings className="w-8 h-8" />,
};

export function CategoryGrid() {
  return (
    <section className="py-10 sm:py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Background decoration - hidden on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <Badge variant="secondary" className="mb-3 sm:mb-4 text-xs sm:text-sm">CATEGORIES</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold mb-3 sm:mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4">
            Premium aquarium fish and professional accessories for your pet paradise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="touch-manipulation"
            >
              <Link href={`/shop/${category.slug}`}>
                <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-card border shadow-lg active:scale-[0.98] sm:hover:shadow-2xl transition-all duration-300">
                  {/* Background Image */}
                  <div className="relative h-56 sm:h-64 md:h-80 lg:h-96 overflow-hidden bg-gray-100">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-85" />
                    
                    {/* Floating particles - hidden on mobile */}
                    <div className="absolute inset-0 overflow-hidden hidden sm:block">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-white/30 rounded-full"
                          style={{
                            left: `${20 + i * 15}%`,
                            bottom: "20%",
                          }}
                          animate={{
                            y: [-10, -60, -10],
                            opacity: [0, 0.8, 0],
                            scale: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 3,
                            delay: i * 0.5,
                            repeat: Infinity,
                          }}
                        />
                      ))}
                    </div>

                    {/* Icon with glow */}
                    <div className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2.5 sm:p-4 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl text-white">
                      {categoryIcons[category.id]}
                    </div>

                    {category.featured && (
                      <Badge className="absolute top-4 sm:top-6 left-4 sm:left-6 bg-coral shadow-lg text-xs">Featured</Badge>
                    )}

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                      <h3 
                        className="text-white font-bold text-xl sm:text-2xl md:text-3xl mb-1.5 sm:mb-2"
                        style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
                      >
                        {category.name}
                      </h3>
                      <p className="text-white/80 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 line-clamp-2">
                        {category.description}
                      </p>
                      
                      {/* Subcategories preview - fewer on mobile */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                        {category.subcategories?.slice(0, 2).map((sub) => (
                          <span
                            key={sub.slug}
                            className="text-[10px] sm:text-xs bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-white"
                          >
                            {sub.name}
                          </span>
                        ))}
                        {category.subcategories && category.subcategories.length > 2 && (
                          <span className="text-[10px] sm:text-xs bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-white">
                            +{category.subcategories.length - 2} more
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-secondary font-semibold text-sm sm:text-base">
                        <span>Explore</span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
