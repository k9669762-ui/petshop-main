"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ArrowLeft, Gift } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "AQUAFIRST50") {
      setDiscount(getTotal() * 0.25);
      toast({
        title: "Promo Applied! 🎉",
        description: "25% discount has been applied to your order.",
        variant: "success",
      });
    } else {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid promo code.",
        variant: "destructive",
      });
    }
  };

  const subtotal = getTotal();
  const shipping = subtotal >= 2000 ? 0 : 199;
  const total = subtotal - discount + shipping;

  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-8">
            Shopping Cart
          </h1>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven&apos;t added any products yet.
              </p>
              <Button size="lg" asChild>
                <Link href="/shop">Start Shopping</Link>
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="bg-card rounded-xl border p-4 md:p-6"
                    >
                      <div className="flex gap-4 md:gap-6">
                        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link href={`/product/${item.product.slug}`}>
                            <h3 className="font-semibold text-lg hover:text-secondary transition-colors">
                              {item.product.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground capitalize">
                            {item.product.category.replace("-", " ")}
                          </p>
                          {item.selectedVariants && Object.keys(item.selectedVariants).length > 0 && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {Object.entries(item.selectedVariants).map(([key, value]) => (
                                <span key={key}>{key}: {value} </span>
                              ))}
                            </p>
                          )}
                          <div className="flex flex-wrap items-center gap-4 mt-4">
                            <div className="flex items-center border rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="p-2 hover:bg-muted"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-4 font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="p-2 hover:bg-muted"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="flex items-center gap-1 text-coral hover:text-coral/80 text-sm"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-secondary">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatPrice(item.product.price)} each
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <div className="flex justify-between items-center pt-4">
                  <Button variant="outline" asChild>
                    <Link href="/shop">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Continue Shopping
                    </Link>
                  </Button>
                  <Button variant="ghost" onClick={clearCart} className="text-coral">
                    Clear Cart
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <div className="bg-card rounded-xl border p-6 sticky top-24">
                  <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                  {/* Promo Code */}
                  <div className="mb-6">
                    <p className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Gift className="w-4 h-4 text-secondary" />
                      Have a promo code?
                    </p>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button onClick={handleApplyPromo}>Apply</Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Try: AQUAFIRST50 for 25% off
                    </p>
                  </div>

                  <Separator className="mb-6" />

                  {/* Summary */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal ({items.length} items)</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-accent">
                        <span>Discount (25%)</span>
                        <span>-{formatPrice(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span className={shipping === 0 ? "text-accent" : ""}>
                        {shipping === 0 ? "FREE" : formatPrice(shipping)}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Free shipping on orders over ₹2,000
                      </p>
                    )}
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-secondary">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <Button size="lg" variant="ocean" className="w-full mt-6" asChild>
                    <Link href="/checkout">
                      Proceed to Checkout
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>

                  <div className="mt-6 space-y-2 text-xs text-muted-foreground">
                    <p className="flex items-center gap-2">
                      ✓ 100% Live Arrival Guarantee
                    </p>
                    <p className="flex items-center gap-2">
                      ✓ Secure Payment (Razorpay)
                    </p>
                    <p className="flex items-center gap-2">
                      ✓ COD Available (Under ₹50,000)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
