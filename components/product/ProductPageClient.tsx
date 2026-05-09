"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Shield,
  Truck,
  Star,
  Share2,
  ChevronRight,
  Check,
  Fish,
  AlertCircle,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { products } from "@/lib/data";
import { birdsAndFishProducts } from "@/lib/birdsAndFishData";
import { formatPrice, getDiscountPercentage } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

// Combine all products
const allProducts = [...products, ...birdsAndFishProducts];

interface ProductPageClientProps {
  slug: string;
}

export default function ProductPageClient({ slug }: ProductPageClientProps) {
  const product = allProducts.find((p) => p.slug === slug);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  const { addItem, toggleCart } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

  if (!product) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <Button asChild className="mt-4">
            <Link href="/shop">Back to Shop</Link>
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  const discount = product.originalPrice
    ? getDiscountPercentage(product.originalPrice, product.price)
    : 0;

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariants);
    toast({
      title: "Added to Cart! 🛒",
      description: `${product.name} x${quantity} has been added to your cart.`,
    });
    toggleCart();
  };

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast({ title: "Removed from Wishlist" });
    } else {
      addToWishlist(product);
      toast({ title: "Added to Wishlist! ❤️" });
    }
  };

  const handleVariantChange = (name: string, value: string) => {
    setSelectedVariants((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-muted/30 py-3">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/shop" className="hover:text-primary">Shop</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/shop/${product.category}`} className="hover:text-primary capitalize">
              {product.category.replace("-", " ")}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100"
              >
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  priority
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && <Badge variant="new">NEW</Badge>}
                  {discount > 0 && <Badge variant="coral">-{discount}%</Badge>}
                  {product.subcategory === "cloned-fish" && (
                    <Badge variant="secondary">🧬 CLONED</Badge>
                  )}
                </div>
                <button
                  onClick={handleWishlist}
                  className="absolute top-4 right-4 p-3 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isInWishlist(product.id) ? "fill-coral text-coral" : ""
                    }`}
                  />
                </button>
              </motion.div>
              
              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors bg-gray-100 ${
                        selectedImage === i ? "border-secondary" : "border-transparent"
                      }`}
                    >
                      <Image 
                        src={img} 
                        alt="" 
                        fill 
                        sizes="80px"
                        className="object-cover object-center"
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="space-y-6">
                {/* Title & Rating */}
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                    {product.category.replace("-", " ")}
                    {product.subcategory && ` / ${product.subcategory.replace("-", " ")}`}
                  </p>
                  <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">
                        ({product.reviews} reviews)
                      </span>
                    </div>
                    <button className="text-muted-foreground hover:text-primary">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-secondary">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {discount > 0 && (
                    <Badge variant="coral">Save {discount}%</Badge>
                  )}
                </div>

                {/* Short Description */}
                <p className="text-muted-foreground">{product.description}</p>

                {/* Variants */}
                {product.variants?.map((variant) => (
                  <div key={variant.name}>
                    <p className="font-medium mb-2">{variant.name}</p>
                    <div className="flex flex-wrap gap-2">
                      {variant.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleVariantChange(variant.name, option)}
                          className={`px-4 py-2 rounded-lg border transition-colors ${
                            selectedVariants[variant.name] === option
                              ? "border-secondary bg-secondary/10 text-secondary"
                              : "hover:border-muted-foreground"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Quantity */}
                <div>
                  <p className="font-medium mb-2">Quantity</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 hover:bg-muted"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-6 font-medium">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-3 hover:bg-muted"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className={`text-sm ${product.inStock ? "text-accent" : "text-coral"}`}>
                      {product.inStock ? "✓ In Stock" : "Out of Stock"}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    size="xl"
                    variant="ocean"
                    className="flex-1"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    size="xl"
                    variant="coral"
                    className="flex-1"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    Buy Now
                  </Button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Shield className="w-5 h-5 text-accent" />
                    <span className="text-sm">Live Arrival Guarantee</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Truck className="w-5 h-5 text-secondary" />
                    <span className="text-sm">Overnight Shipping</span>
                  </div>
                </div>

                {/* Promo */}
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-center">
                  <p className="text-sm">
                    Use code <span className="font-bold text-accent">AQUAFIRST50</span> for 25% off!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-8 md:py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="care">Care Guide</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <div className="bg-card rounded-xl p-6 border">
                <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
                {product.tags && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {product.tags.map((tag) => (
                      <Badge key={tag} variant="outline">#{tag}</Badge>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="care" className="mt-6">
              <div className="bg-card rounded-xl p-6 border">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Fish className="w-5 h-5 text-secondary" />
                  Care Guide
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.careGuide || "Detailed care guide coming soon. Contact us for specific care requirements."}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="specs" className="mt-6">
              <div className="bg-card rounded-xl p-6 border">
                <h3 className="text-xl font-semibold mb-4">Specifications</h3>
                {product.specifications ? (
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between p-3 bg-muted/50 rounded-lg">
                        <dt className="font-medium">{key}</dt>
                        <dd className="text-muted-foreground">{value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="text-muted-foreground">No specifications available.</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <div className="bg-card rounded-xl p-6 border space-y-4">
                <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <p className="font-medium">100% Live Arrival Guarantee</p>
                      <p className="text-sm text-muted-foreground">
                        If any fish arrives DOA, we'll replace it or refund you completely.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <p className="font-medium">Overnight Express Shipping</p>
                      <p className="text-sm text-muted-foreground">
                        Insulated packaging with oxygen-infused water and heat/cold packs.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-coral mt-0.5" />
                    <div>
                      <p className="font-medium">Health Waiver Required</p>
                      <p className="text-sm text-muted-foreground">
                        A health waiver must be signed for live fish orders. You'll receive this at checkout.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}

