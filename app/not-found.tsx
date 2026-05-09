"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Fish, Home, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NotFound() {
  const [query, setQuery] = useState("");

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    window.location.href = `/shop?search=${encodeURIComponent(trimmedQuery)}`;
  };

  return (
    <main className="min-h-screen flex flex-col">
      <section className="flex-1 flex items-center justify-center py-12 relative overflow-hidden">
        {/* Underwater Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-teal-500/5 to-white" />

        {/* Animated Bubbles - using CSS animation instead of window */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-teal-500/20 rounded-full"
              style={{
                left: `${(i * 7) % 100}%`,
                bottom: "-20px",
              }}
              animate={{
                y: [0, -1000],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 6 + (i % 5),
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Animated Fish */}
        <motion.div
          className="absolute"
          style={{ top: "20%" }}
          animate={{
            x: [-100, 2000],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Fish className="w-12 h-12 text-orange-500/30" />
        </motion.div>
        <motion.div
          className="absolute"
          style={{ top: "60%" }}
          animate={{
            x: [2000, -100],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 5,
          }}
        >
          <Fish className="w-8 h-8 text-teal-500/30 transform scale-x-[-1]" />
        </motion.div>

        {/* Content */}
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            {/* 404 Text */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <h1 className="text-[120px] md:text-[180px] font-bold text-teal-500/20 leading-none">
                404
              </h1>
            </motion.div>

            {/* Fish Icon */}
            <motion.div
              className="relative -mt-16 mb-8"
              animate={{ rotate: [-5, 5, -5], y: [-3, 3, -3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="inline-block bg-teal-500/10 p-6 rounded-full">
                <Fish className="w-16 h-16 text-teal-500" />
              </div>
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Lost at Sea?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Oops! Looks like this fish swam away. The page you&apos;re looking for
              doesn&apos;t exist or has been moved to a new tank.
            </p>

            {/* Search */}
            <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search for products..."
                  className="pl-12 pr-24 h-12"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2"
                >
                  Search
                </Button>
              </div>
            </form>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white" asChild>
                <Link href="/">
                  <Home className="w-5 h-5 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/shop">
                  Browse Shop
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Helpful Links */}
            <div className="mt-12 pt-8 border-t">
              <p className="text-sm text-gray-500 mb-4">
                Here are some helpful links instead:
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Link href="/shop?category=live-fish" className="text-teal-500 hover:underline">
                  Live Fish
                </Link>
                <Link href="/shop" className="text-teal-500 hover:underline">
                  All Products
                </Link>
                <Link href="/blog" className="text-teal-500 hover:underline">
                  Blog
                </Link>
                <Link href="/contact" className="text-teal-500 hover:underline">
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
