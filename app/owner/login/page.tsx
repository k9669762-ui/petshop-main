"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Lock, 
  Eye, 
  EyeOff,
  Fish,
  ArrowRight,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

export default function OwnerLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple authentication (in production, use proper auth)
    // Default credentials: admin / admin123
    if (formData.username === "admin" && formData.password === "admin123") {
      // Store auth in localStorage (use proper auth in production)
      localStorage.setItem("ownerAuth", "true");
      toast({
        title: "Welcome, Owner! 👋",
        description: "Redirecting to dashboard...",
      });
      setTimeout(() => {
        router.push("/owner/dashboard");
      }, 1000);
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, #0ea5e9 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-xl">
              <Fish className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-white">
                Rainbow Aqua
              </h1>
              <p className="text-xs text-white/60">Owner Dashboard</p>
            </div>
          </div>

          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 mb-6 text-white/60">
            <Shield className="w-4 h-4" />
            <span className="text-sm">Secure Admin Access</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <Label htmlFor="username" className="text-white/80 text-sm">Username</Label>
              <div className="relative mt-1.5">
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-white/80 text-sm">Password</Label>
              <div className="relative mt-1.5">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 pr-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Signing In...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Access Dashboard
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-3 bg-white/5 rounded-lg border border-white/10">
            <p className="text-xs text-white/50 text-center mb-2">Demo Credentials:</p>
            <div className="flex justify-center gap-4 text-xs">
              <span className="text-cyan-400">Username: admin</span>
              <span className="text-cyan-400">Password: admin123</span>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-white/50 hover:text-white/80 transition-colors">
              ← Back to Store
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

