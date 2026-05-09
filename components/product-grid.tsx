"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./product-card";
import { products } from "@/lib/data";
import { Product } from "@/lib/store";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ProductGridProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  filter?: (product: Product) => boolean;
  limit?: number;
  showViewAll?: boolean;
  viewAllLink?: string;
  columns?: 2 | 3 | 4 | 5;
}

export function ProductGrid({
  title = "Featured Products",
  subtitle,
  badge = "SHOP",
  filter,
  limit = 8,
  showViewAll = true,
  viewAllLink = "/shop",
  columns = 4,
}: ProductGridProps) {
  const filteredProducts = filter
    ? products.filter(filter).slice(0, limit)
    : products.slice(0, limit);

  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <Badge variant="secondary" className="mb-4">{badge}</Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              {title}
            </h2>
            {subtitle && (
              <p className="text-muted-foreground mt-2 max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
          {showViewAll && (
            <Button variant="outline" asChild>
              <Link href={viewAllLink} className="group">
                View All
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          )}
        </motion.div>

        <div className={`grid ${gridCols[columns]} gap-4 md:gap-6`}>
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
