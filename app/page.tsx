"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { CategoryGrid } from "@/components/category-grid";
import { Testimonials } from "@/components/testimonials";
import { BlogPreview } from "@/components/blog-preview";
import { Newsletter } from "@/components/newsletter";
import ProductCarousel from "@/components/ui/ProductCarousel";
import { TamilNaduDeliveryCarousel } from "@/components/tamil-nadu-delivery";
import { products } from "@/lib/data";

export default function HomePage() {
  // Get filtered products for carousels
  const newArrivals = products.filter(p => p.isNew === true);
  const featuredProducts = products.filter(p => p.isFeatured === true);
  const accessories = products.filter(p => p.category === "accessories");

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* New Arrivals */}
      <ProductCarousel
        products={newArrivals.slice(0, 12)}
        variant="smooth"
        title="✨ New Arrivals"
        subtitle="Fresh drops just for you"
        showViewAll
        viewAllLink="/shop?filter=new"
        accentColor="secondary"
        autoplayDelay={5000}
      />

      {/* Categories */}
      <CategoryGrid />

      {/* Tamil Nadu Delivery Carousel */}
      <TamilNaduDeliveryCarousel />

      {/* Testimonials */}
      <Testimonials />

      {/* Bestsellers */}
      <ProductCarousel
        products={featuredProducts.slice(0, 10)}
        variant="smooth"
        title="🏆 Bestsellers"
        subtitle="Most loved by our customers"
        showViewAll
        viewAllLink="/shop?filter=featured"
        accentColor="coral"
        autoplayDelay={5000}
      />

      {/* Aquarium Accessories */}
      <ProductCarousel
        products={accessories.slice(0, 8)}
        variant="smooth"
        title="🎯 Premium Accessories"
        subtitle="Professional-grade equipment for your setup"
        showViewAll
        viewAllLink="/shop/accessories"
        accentColor="primary"
        autoplayDelay={5000}
      />

      {/* Blog Preview */}
      <BlogPreview />

      {/* Newsletter */}
      <Newsletter />

      <Footer />
    </main>
  );
}
