"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ArrowLeft } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/lib/store";

export default function WishlistPage() {
  const { items } = useWishlistStore();

  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/account">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-display font-bold">My Wishlist</h1>
              <p className="text-muted-foreground">{items.length} items saved</p>
            </div>
          </div>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-6">
                Save your favorite items to your wishlist.
              </p>
              <Button size="lg" asChild>
                <Link href="/shop">Browse Products</Link>
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {items.map((item, index) => (
                <ProductCard key={item.product.id} product={item.product} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}


