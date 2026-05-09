"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export function CartDrawer({ children }: { children: ReactNode }) {
  const { items, isOpen, toggleCart, setCartOpen, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();

  return (
    <Sheet open={isOpen} onOpenChange={setCartOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Your Cart ({items.length} items)
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4"
            >
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </motion.div>
            <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-4">
              Looks like you haven&apos;t added any fish to your cart yet!
            </p>
            <Button onClick={toggleCart} asChild>
              <Link href="/shop">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-4 p-4 bg-muted/50 rounded-xl"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
                      <p className="text-sm text-secondary font-semibold mt-1">
                        {formatPrice(item.product.price)}
                      </p>
                      {item.selectedVariants && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {Object.entries(item.selectedVariants).map(([key, value]) => (
                            <span key={key}>{key}: {value} </span>
                          ))}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-muted"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-3 text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-muted"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-1 text-coral hover:bg-coral/10 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="border-t pt-4 space-y-4">
              {/* Promo Code */}
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 text-center">
                <p className="text-sm">
                  Use code <span className="font-bold text-accent">AQUAFIRST50</span> for 25% off!
                </p>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(getTotal())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className="text-accent">Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-secondary">{formatPrice(getTotal())}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button onClick={toggleCart} asChild className="w-full" variant="ocean" size="lg">
                  <Link href="/checkout" className="flex items-center gap-2">
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button onClick={toggleCart} variant="outline" className="w-full" asChild>
                  <Link href="/cart">View Cart</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}


