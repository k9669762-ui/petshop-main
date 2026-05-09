"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Fish, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200); // Default width for SSR

  // Set window width on client side
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Subscribed! 🎉",
      description: "Thank you for subscribing. Check your email for exclusive offers!",
      variant: "success",
    });
    
    setEmail("");
    setIsLoading(false);
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-background to-primary/10" />
      
      {/* Animated Fish */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-20"
          animate={{ x: [0, windowWidth + 200] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Fish className="w-12 h-12 text-secondary/20" />
        </motion.div>
        <motion.div
          className="absolute top-3/4 -right-20"
          animate={{ x: [0, -(windowWidth + 200)] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
        >
          <Fish className="w-8 h-8 text-primary/20 transform scale-x-[-1]" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Exclusive Offers Inside</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Subscribe & Get <span className="text-secondary">25% Off</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Join our community of 50,000+ fish enthusiasts! Get exclusive deals, care tips, and early access to new arrivals.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12"
                required
              />
            </div>
            <Button type="submit" size="lg" variant="ocean" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Send className="w-4 h-4" />
                  </motion.div>
                  Subscribing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Subscribe
                  <Send className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-4">
            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}


